---
name: financial-accounting
description: Use when working with SAP Financial Accounting (FI) — general ledger, accounts payable/receivable, asset accounting, bank accounting, or closing operations. Provides config patterns, key tcodes, and SAP references.
---

# SAP Financial Accounting (FI)

Reference skill for SAP FI configuration, processes, and S/4HANA changes.

## Content Routing

| Keyword / Question Pattern | Jump To |
|---|---|
| company code, business area, profit center, segment | Organizational Structure |
| general ledger, GL, universal journal, ACDOCA, chart of accounts | General Ledger |
| vendor, AP, invoice, payment run, F110 | Accounts Payable |
| customer, AR, billing, dunning, credit management | Accounts Receivable |
| asset, depreciation, FIAA, capitalization | Asset Accounting |
| house bank, bank statement, lockbox, EBS | Bank Accounting |
| closing, period-end, foreign currency, accrual, reconciliation | Period-End Closing |
| S/4HANA, migration, universal journal, business partner | S/4HANA Changes |

---

## 1. FI Organizational Structure

| Element | Definition | Config Path |
|---|---|---|
| **Company Code** | Smallest unit for which a complete set of accounts is maintained | SPRO > Enterprise Structure > Definition > Financial Accounting > Edit, Copy, Delete, Check Company Code |
| **Business Area** | Cross-company-code area for internal reporting (optional in S/4HANA) | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Business Area |
| **Profit Center** | Management-oriented organizational unit for internal P&L | SPRO > Controlling > Profit Center Accounting > Master Data > Define Profit Center |
| **Segment** | Entity-level reporting dimension (IFRS 8 / ASC 280), derived from profit center | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Segment |

Key rule: every FI posting must reference exactly one company code. Profit center and segment are mandatory in S/4HANA universal journal entries.

---

## 2. General Ledger

### Universal Journal (S/4HANA)

In S/4HANA the general ledger is stored in a single table **ACDOCA** (Universal Journal). This replaces the classic tables GLT0, BSEG, BSIS/BSAS, FAGLFLEXA, and COEP. All FI, CO, ML, and AA line items exist in one row.

### Chart of Accounts & Account Groups

| Object | Purpose | Key TCode |
|---|---|---|
| Chart of Accounts | Master list of GL account numbers | OB13 |
| Operating CoA | Assigned to company code for daily postings | OB62 |
| Group CoA | Corporate consolidation mapping | OB13 |
| Account Group | Controls number range and field status of GL master | OBD4 |

### Document Types & Number Ranges

| Doc Type | Usage | Default |
|---|---|---|
| SA | GL account posting | General journal |
| KR | Vendor invoice | AP |
| DR | Customer invoice | AR |
| AB | Clearing document | Clearing |
| AA | Asset posting | Asset Accounting |

Configure via OBA7 (document types) and FBN1 (number ranges).

---

## 3. Accounts Payable

### Vendor Master

In S/4HANA, vendor master is replaced by **Business Partner** (BP role FLVN00). Migration from LFA1/LFB1 to BUT000/BUT0BK is mandatory. Use tcode **BP** instead of XK01/FK01.

### Invoice Processing

| Step | TCode | Notes |
|---|---|---|
| Post vendor invoice | FB60 / MIRO | FB60 for FI-only; MIRO for MM-integrated (logistics invoice verification) |
| Park invoice | FV60 | Saves without updating vendor balance |
| Invoice list | FBL1N | Vendor line item report |

### Automatic Payment Program (F110)

F110 executes payment runs across company codes. Configuration steps:

1. **Payment methods per country** — SPRO > FBZP, tab "Pmt methods in country"
2. **Payment methods per company code** — FBZP, tab "Pmt methods in company code"
3. **Bank determination** — FBZP, tab "Bank determination"
4. **House bank assignment** — Link payment method to house bank and account

Run sequence: Parameters > Proposal > Schedule > Payment run > Printout.

---

## 4. Accounts Receivable

### Customer Master

S/4HANA uses **Business Partner** (BP role FLCU00), replacing KNA1/KNB1. Use tcode **BP** instead of XD01/FD01.

### Billing Integration

SD billing documents (VF01) post automatically to AR via account determination (VKOA). Revenue and receivable accounts are derived from condition types and account keys.

### Dunning (F150)

| Config Step | Path |
|---|---|
| Define dunning procedure | SPRO > FBMP |
| Dunning levels (1-9) | Set days in arrears, interest, fees per level |
| Dunning per company code | Assign procedure to customer master |

### Credit Management

S/4HANA provides **SAP Credit Management (FIN-FSCM-CR)** as a decoupled component with real-time credit exposure checks via integration with SD and FI-AR.

| TCode | Purpose |
|---|---|
| UKM_MAIN | Credit management cockpit (S/4HANA) |
| FD32 | Classic credit master (ECC) |
| F.31 | Credit overview |

---

## 5. Asset Accounting

### Asset Master

Create via AS01 (or via Fiori app F2723). Each asset has a **main asset number** and optional **sub-number**. Asset class (OAOA) controls number range, depreciation terms, and account determination.

### Depreciation

| Area | Purpose |
|---|---|
| 01 | Book depreciation (local GAAP) |
| 15 | Tax depreciation (country-specific) |
| 20 | Cost-accounting depreciation |

Depreciation keys (AFAMS) define method (straight-line, declining balance, units-of-production). Depreciation run: **AFAB** (periodic) or **AFAR** (repeat/restart).

### Common Asset Transactions

| TCode | Transaction |
|---|---|
| ABZON | Acquisition with vendor |
| ABAVN | Retirement with revenue |
| ABUMN | Inter-company transfer |
| AIAB | Investment support |

### Period-End for Assets

Run AFAB monthly. ASKB posts asset values to GL (only in ECC; in S/4HANA, real-time integration posts via ACDOCA automatically).

---

## 6. Bank Accounting

### House Banks

Configure house banks in FI12 (or SPRO > Bank Accounting > Bank Accounts). Each house bank has one or more **account IDs** linked to GL accounts.

### Electronic Bank Statement (EBS)

| Step | TCode / Config |
|---|---|
| Define EBS format (MT940, BAI2, CAMT.053) | SPRO > FEBA_BANK_STATEMENT |
| Import statement | FF_5 / FEBP |
| Post-processing / matching | FEBA / FEBAN |
| Manual bank statement | FF67 |

Automatic matching rules (interpretation algorithms) are configured to clear open items, post bank charges, and handle sub-transactions.

---

## 7. Period-End Closing

### Closing Cockpit

Use tcode **CLOS** (S/4HANA) or Fiori app **Manage Closing Tasks (F1603)** to orchestrate closing activities across modules.

### Key Closing Activities

| Activity | TCode | Purpose |
|---|---|---|
| Foreign currency valuation | FAGL_FC_VAL | Revalue open items and GL balances at closing rate |
| GR/IR clearing | F.13 / MR11 | Clear goods-receipt/invoice-receipt differences |
| Accrual posting | FBS1 / ACAC | Reverse accruals; ACAC for accrual engine |
| Reconciliation (FI-CO) | FAGLF03 | Reconcile FI ledger with CO postings |
| Financial statement version | OB58 | Define BS/PL hierarchy for reporting |
| Balance carryforward | FAGLGVTR | Carry GL balances to new fiscal year |
| Open/close posting periods | OB52 | Control which periods allow postings |

---

## Key Transactions Reference

| TCode | Description |
|---|---|
| FB01 | Post general document |
| FB50 | GL account posting (enjoy) |
| FB60 | Vendor invoice (enjoy) |
| FB70 | Customer invoice (enjoy) |
| F110 | Automatic payment program |
| F150 | Dunning run |
| FAGL_FC_VAL | Foreign currency valuation |
| FAGLGVTR | Balance carryforward |
| FAGLB03 | GL account line items |
| FBL1N / FBL5N | Vendor / Customer line items |
| AFAB | Depreciation run |
| FF_5 | Import electronic bank statement |
| S_ALR_87012078 | Vendor balance audit trail |
| S_ALR_87012082 | Customer balance audit trail |
| S_ALR_87012284 | GL account balances |
| S_ALR_87011990 | Balance sheet |

---

## S/4HANA Changes Summary

| Area | ECC | S/4HANA |
|---|---|---|
| Data model | GLT0, BSEG, FAGLFLEXA, COEP, ANLA | ACDOCA (universal journal), ACDOCP (plan), ACDOCT (CO totals) |
| Vendor/Customer master | KNA1/LFA1 + KNB1/LFB1 | Business Partner (BUT000, BP role FLVN00/FLCU00) |
| Asset Accounting | Separate asset tables (ANLC, ANLP) | Integrated into ACDOCA; real-time depreciation posting |
| Credit Management | FD32 / classic VKM1 | SAP Credit Management (UKM_MAIN) |
| New GL / Document Splitting | Activated separately | Always active; ledger-based approach default |
| Reporting | Classic ALV reports (S_ALR_8*) | Fiori analytical apps, CDS views (I_GLAccountLineItem, I_OperationalAcctgDocItem) |

---

## SAP Help Portal Links

- [Financial Accounting in SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e1e4a72d40e3a4b923b3e47aef32) — Central FI documentation for S/4HANA on-premise.
- [Universal Journal (ACDOCA)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/30a238ae9cf940e89e60adb0b1943c6f) — Technical details on the universal journal data model and migration.

## SAP Notes

| Note | Topic |
|---|---|
| [2220843](https://me.sap.com/notes/2220843) | S/4HANA Finance: Simplification list — comprehensive list of changed/removed functionality in FI |
| [2333025](https://me.sap.com/notes/2333025) | Customer/Vendor Integration (CVI): Business Partner migration best practices |
| [2398846](https://me.sap.com/notes/2398846) | FAGL_FC_VAL: Foreign currency valuation corrections and enhancements in S/4HANA |
| [3019423](https://me.sap.com/notes/3019423) | Asset Accounting: Real-time integration in S/4HANA — known issues and fixes |
