---
name: fi
description: Use when working with SAP Financial Accounting (FI) — General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Bank Accounting, period-end close, or S/4HANA Finance Universal Journal in any implementation, migration, or support context.
---

# SAP Financial Accounting (FI)

This skill enforces correct FI configuration, posting discipline, and period-end close execution. In S/4HANA, FI operates on the Universal Journal (ACDOCA), which merges FI and CO into a single line-item table — architectural decisions made here ripple across the entire financial landscape.

## Content Routing

| Topic | Section |
|-------|---------|
| Universal Journal / ACDOCA | Key Concepts |
| General Ledger posting | Iron Laws + Transaction Codes |
| Accounts Payable / Receivable | Subledger Accounting |
| Asset Accounting | Asset Accounting |
| Period-end close | Period-End Close Activities |
| Integration with CO / MM / SD | Integration Points |

## Iron Laws

1. **NEVER POST DIRECTLY TO CUSTOMER OR VENDOR RECONCILIATION ACCOUNTS.** Reconciliation accounts (set in the customer/vendor master) are updated exclusively through subledger postings. Direct GL postings to reconciliation accounts bypass subledger synchronization and destroy audit traceability. Use FB01 for GL-only postings; use subledger transactions (FB60, FB70, MIRO) for customer and vendor activity.
2. **ALWAYS RECONCILE SUBLEDGER TO GL AT PERIOD-END.** AP, AR, and AA subledgers must be reconciled to the corresponding GL reconciliation accounts before period close is confirmed. Use FBL1N/FBL3N/FBL5N line item reports alongside balance reports. An unreconciled subledger is an audit deficiency.
3. **NEVER SKIP FOREIGN CURRENCY VALUATION AT PERIOD-END.** Open items and balances in foreign currency must be revalued to the period-end exchange rate using FAGL_FC_VAL (new GL) before financial statements are issued. Skipping valuation understates or overstates assets, liabilities, and P&L — a GAAP/IFRS violation.
4. **ALWAYS USE DOCUMENT SPLITTING FOR SEGMENT REPORTING.** If the client requires P&L or balance sheet by segment or profit center, document splitting must be configured in the new GL. Passive splitting is insufficient for balance sheet items — active splitting rules must be defined per business transaction variant. Retrofitting document splitting after go-live is a project in itself.
5. **NEVER CLOSE A POSTING PERIOD WITHOUT COMPLETING GR/IR CLEARING.** Uninvoiced goods receipts and unreceived invoices sitting in the GR/IR clearing account (transaction F.13 or MR11) must be reviewed and cleared. Uncleaned GR/IR distorts both balance sheet and P&L and creates audit exposure.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Post directly to a reconciliation account in FB01 | "It's just a GL account like any other" | Reconciliation accounts are locked for direct posting by SAP design; the posting will reject or, if forced, break subledger balance | Always post through the relevant subledger transaction (FB60, FB70, MIRO, F-92); never override the reconciliation account field flag |
| Skip foreign currency valuation "because the amounts are small" | "FX differences are immaterial" | GAAP/IFRS require balance sheet FX revaluation regardless of materiality; auditors flag missing valuation as a control failure | FAGL_FC_VAL must run every period-end; materiality is the auditor's call, not the system team's |
| Use BSEG for reporting queries in S/4HANA | "BSEG has always had the line-item data" | In S/4HANA, BSEG is a compatibility view over ACDOCA; direct BSEG queries without ACDOCA awareness produce incomplete results at scale | Use CDS views I_JournalEntry / I_JournalEntryItem or query ACDOCA directly with correct index fields |
| Configure document splitting passively and call it done | "Passive splitting covers most cases" | Passive splitting only works for items that inherit characteristics; balance sheet accounts (bank, GR/IR) require active splitting rules or remain unassigned | Define splitting rules for every business transaction variant relevant to segment or profit center balance sheets |
| Run F110 payment run without a payment proposal review | "We've done this before, it's routine" | F110 payment proposals include any open item matching the selection criteria — including items on payment block or with incorrect bank details | Always display and check the payment proposal (F110 → Edit Proposal) before the payment run is executed; treat it as a mandatory review step |
| Delay asset depreciation posting until year-end | "We'll catch up in December" | Depreciation underposts assets throughout the year, distorts monthly P&L, and creates large one-time charges that management and auditors will question | Run AFAB (depreciation run) every period; if missed, use repeat run for the specific period before closing |

## Red Flags

Watch for these in your own reasoning — each signals an Iron Law violation:

- "I'll just post to that account directly in FB01..." → Check whether it is a reconciliation account. If it is, use the subledger path.
- "Foreign currency revaluation can run next month to catch up..." → FAGL_FC_VAL must run before period-end financial statements are produced. Period-end sequencing is not optional.
- "Let me query BSEG for the line items..." → In S/4HANA, use ACDOCA or the released CDS views I_JournalEntry / I_OperationalAcctgDocItem instead.
- "Document splitting is configured — passive splitting is on..." → Confirm active splitting rules exist for balance sheet business transaction variants. Passive alone is insufficient.
- "The GR/IR balance will clear itself next month..." → GR/IR aging must be reviewed and acted upon before period close. Items older than 30 days need investigation.
- "We can skip the payment proposal review this time..." → Payment proposal review is a financial control. Skipping it exposes the company to duplicate payments and fraud.

<HARD-GATE>
Before advising on any FI period-end activity or posting configuration: confirm the system version (ECC or S/4HANA), whether new GL with document splitting is active, and which fiscal year variant and posting period variant applies. Do not propose period-end sequences or posting logic without these confirmations — ECC and S/4HANA close steps differ materially, especially for asset accounting (FY2 vs. new asset accounting).
</HARD-GATE>

## Key Concepts

- **Universal Journal (ACDOCA):** S/4HANA single source of truth for FI and CO line items. Replaces BSEG+COEP+FAGLFLEXA with one table. Contains company code, ledger, account, cost object, profitability segment in every line.
- **New GL:** Parallel ledgers, document splitting, segment reporting, non-leading ledger postings. Mandatory in S/4HANA.
- **Document Splitting:** Active (rule-based) and passive (inheritance-based) splitting of accounting documents by characteristic (segment, profit center). Required for segment-level balance sheets.
- **Central Finance (CFIN):** Real-time replication of FI postings from source systems into a central S/4HANA system via SLT/AIF. Enables group-level reporting without full migration.
- **GR/IR Clearing Account:** Intermediate account between goods receipt (MM) and invoice receipt (FI). Must be monitored and cleared at period-end via F.13 or MR11.
- **Parallel Accounting:** Multiple ledgers (leading + non-leading) to support different accounting standards (IFRS + local GAAP) simultaneously in one system.

## Transaction Codes

| Transaction | Purpose |
|-------------|---------|
| FB01 | Post general document (GL postings) |
| F-02 | Enter GL account posting (extended screen) |
| FB60 | Enter vendor invoice |
| FB70 | Enter customer invoice |
| F110 | Automatic payment run (AP) |
| F.13 | Automatic clearing (GR/IR, open items) |
| FAGL_FC_VAL | Foreign currency valuation (new GL) |
| AFAB | Depreciation run (Asset Accounting) |
| MIRO | Logistics invoice verification (MM-FI interface) |
| FBL1N | Vendor line item display |
| FBL3N | GL account line item display |
| FBL5N | Customer line item display |
| S_ALR_87012172 | Vendor balance in local currency |
| S_ALR_87012197 | Customer balance in local currency |
| S_ALR_87012284 | GL account balances |
| F.07 | Balance carryforward (AR/AP) |
| FAGLGVTR | Balance carryforward (new GL) |
| OB52 | Maintain posting periods |
| FS00 | GL account master data |
| FK01 / XK01 | Vendor master / BP vendor role |
| FD01 / XD01 | Customer master / BP customer role |

## Key Tables and CDS Views

| Object | Type | Description |
|--------|------|-------------|
| ACDOCA | Table | Universal Journal line items (S/4HANA) |
| BKPF | Table | Accounting document header |
| BSEG | Table | Accounting document line items (ECC; compatibility view in S/4HANA) |
| FAGLFLEXA | Table | New GL flexible ledger line items (ECC) |
| SKA1 / SKB1 | Table | GL account master (chart of accounts / company code) |
| LFB1 / KNB1 | Table | Vendor / customer company code data |
| ANLA / ANLZ | Table | Asset master / asset time-dependent data |
| I_JournalEntry | CDS | Released VDM — journal entry header |
| I_JournalEntryItem | CDS | Released VDM — journal entry line items |
| I_OperationalAcctgDocItem | CDS | Released VDM — operational accounting document items |
| I_GLAccountLineItem | CDS | Released VDM — GL line items for analytical consumption |
| C_GLLINEITEMQ | CDS | Consumption VDM — GL line item query (analytical apps) |
| C_TRIALBALANCE | CDS | Consumption VDM — trial balance |

## Advanced Topics

### ACDOCA Key Fields

| Field | Type | Description |
|-------|------|-------------|
| RBUKRS | CHAR(4) | Company Code |
| RYEAR | NUMC(4) | Fiscal Year |
| DOCNR | CHAR(10) | Accounting Document Number |
| BUZEI | NUMC(6) | Line Item Number |
| BELNR | CHAR(10) | Reference Document Number |
| BLDAT | DATS | Document Date |
| BUDAT | DATS | Posting Date |
| WAERS | CUKY | Document Currency |
| HWAER | CUKY | Company Code Currency |
| RACCT | CHAR(10) | G/L Account |
| RCNTR | CHAR(10) | Cost Center |
| RORDER | CHAR(12) | Internal Order |
| KTOPL | CHAR(4) | Chart of Accounts |
| WRBTR | CURR | Amount in Document Currency |
| DMBTR | CURR | Amount in Company Code Currency |
| HKONT | CHAR(10) | General Ledger Account |
| LIFNR | CHAR(10) | Vendor/Account Number |
| KUNNR | CHAR(10) | Customer Number |
| SEGMENT | CHAR(10) | Segment for Segmental Reporting |
| RASSC | CHAR(6) | Trading Partner |

### Released CDS Views (Extended)

| CDS View | Purpose |
|----------|---------|
| I_JournalEntry | Universal Journal header |
| I_JournalEntryItem | Universal Journal line items |
| I_OperationalAcctgDocItem | Operational accounting items |
| I_Customer | Customer master data |
| I_Supplier | Supplier master data |
| I_GLAccount | G/L account master |
| I_BusinessPartner | Business Partner (unified customer/vendor) |
| I_BankAccount | Bank account master |
| I_ExchangeRate | Currency exchange rates |
| I_CostCenter | Cost center master |
| I_ProfitCenter | Profit center master |
| I_Segment | Segment master |
| I_FixedAsset | Fixed asset master |
| I_FunctionalArea | Functional area master |
| I_CompanyCode | Company code master |
| I_FinancialDocumentTypeText | Document type descriptions |

### Parallel Accounting
Multiple accounting principles (IFRS, local GAAP, US GAAP) handled via the ledger approach:
- **Leading ledger (0L)** typically IFRS for consolidation
- **Non-leading ledgers** for local statutory reporting
- **Extension ledgers** for management adjustments in S/4HANA
- Configuration in FINSC_LEDGER. Each posting automatically flows to all active ledgers with their accounting principle.

## Subledger Accounting

### Accounts Payable (FI-AP)
- Vendor invoices posted via FB60 (manual) or MIRO (logistics-integrated)
- Three-way match in MIRO: PO quantity/price vs. goods receipt vs. invoice
- Payment run via F110: define payment method, bank account, and due date selection
- Aging analysis via S_ALR_87012172; open item clearing via F-44

### Accounts Receivable (FI-AR)
- Customer invoices generated from SD billing (VF01) or posted manually via FB70
- Credit management integrated in S/4HANA (no longer a separate FI-AR credit module)
- Dunning via F150; cash application via F-28 or automatic clearing F.13

### Asset Accounting (FI-AA)
- Asset master in AS01; acquisitions via F-90 or integrated from MM
- Depreciation run AFAB — must be executed every posting period
- Year-end close: AJRW (fiscal year change), AJAB (year-end closing)
- New Asset Accounting (S/4HANA): depreciation posted in real-time to ACDOCA; no separate AA reconciliation account posting run needed

## Period-End Close Activities

Recommended sequence (FI close):

1. Goods receipt / invoice receipt cutoff and GR/IR review (F.13, MR11)
2. Foreign currency valuation — open items and balances (FAGL_FC_VAL)
3. Depreciation run (AFAB)
4. Accruals and deferrals (FBS1 / recurring entries)
5. Intercompany reconciliation
6. Regrouping of receivables/payables (F101)
7. Balance sheet adjustments and manual journal entries
8. Subledger to GL reconciliation (FBL1N/FBL5N vs. FS10N)
9. Period lock (OB52)
10. Balance carryforward at year-end (FAGLGVTR, F.07)

## Real-World Scenarios

### Year-End Close Sequence
1. Open new period (OB52)
2. Foreign currency valuation (FAGL_FC_VAL)
3. GR/IR clearing (F.19)
4. Auto clearing (F.13)
5. Asset depreciation run (AFAB)
6. Asset fiscal year change (AJRW)
7. Asset fiscal year close (AJAB)
8. Balance carryforward (FAGLGVTR)
9. Reconcile CO to FI (FAGLCOFITRANSFER)
Typical duration: 5-10 business days

### Foreign Currency Valuation
Monthly FCV process to revalue open items and balance sheet accounts in foreign currency:
- Run FAGL_FC_VAL (new GL) or FAGL_FCV (S/4HANA)
- Valuation methods: lowest value, strict lowest, mean rate
- Exchange rate types: M (standard), B (bank buying), G (bank selling)
- Reversal configuration: automatic on first day of new period
- Configuration: valuation area + valuation method + posting rules

### Intercompany Settlement
Intercompany posting and reconciliation:
- Auto-reverse postings (reversed in receiving company code)
- Auto-settle (IC billing)
- FBIC for intercompany reconciliation
- Elimination entries via Group Reporting
- Segment reporting via document splitting

### Tax Reporting
Tax determination and reporting:
- Tax code configuration (FTXP) — tax type, tax percentage
- Jurisdiction codes for US tax
- Tax on sales/purchases report (S_ALR_87012357)
- Advance return for tax (RFUMSV00)
- Electronic tax filing via ASE/XML

### Group Reporting / Consolidation
- ACDOCU table for consolidation data
- SAP Group Reporting (replaces BCS)
- Validation rules for consolidated data
- Consolidation units mapped to company codes
- Intercompany elimination at group level

## Integration Points

| Module | Integration Description |
|--------|------------------------|
| CO | Cost allocation: primary cost postings from FI flow to CO cost objects (cost centers, orders) via real-time integration in ACDOCA. CO-FI reconciliation eliminated in S/4HANA (single journal). |
| MM | Invoice verification: MIRO posts vendor invoice in FI-AP and performs three-way match against PO and GR. GR generates material and accounting documents simultaneously. |
| SD | Revenue recognition: billing documents (VF01/VF02) generate FI accounting documents via account determination (VKOA). Revenue posting and customer AR updated in the same document. |
| AA | Asset postings: acquisitions, retirements, and depreciation all post to ACDOCA. AA subledger values must reconcile to GL reconciliation accounts at period-end. |
| PS | Project-related costs settle to CO objects and post to FI via settlement (CJ88). WBS element cost postings visible in ACDOCA with project assignment. |

## Best Practices

1. **Use document types deliberately** — SA (GL), KR (vendor invoice), DR (customer invoice), AA (asset) — document type controls posting behavior, number ranges, and reversal rules.
2. **Define tolerance groups** for users and accounts — prevents accidental large postings from clearing automatically.
3. **Implement substitution and validation rules** — enforce business rules at posting time, not in downstream reports.
4. **Use recurring entries (FBD1) for predictable accruals** — reduces manual posting errors and ensures consistency.
5. **Archive regularly** — ACDOCA grows rapidly; implement data archiving for closed fiscal years to maintain system performance.

## Common Issues and Gotchas

- **Document splitting not configured correctly** — Segment reporting fails, balance sheet can't be drawn per segment
- **GR/IR account reconciliation** — Complex due to timing differences; requires monthly F.19 run
- **Balance carryforward timing** — Must run FAGLGVTR for each company code and ledger; missing runs cause opening balance errors
- **Asset accounting migration** — Classic AA to new AA is one-way; requires careful data preparation
- **Parallel currency setup errors** — Wrong currency type assignment leads to incorrect parallel ledger values; fix requires reposting

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Posting logic reviewed — no direct postings to reconciliation accounts
- [ ] Period-end sequence confirmed and all mandatory steps included (FX valuation, depreciation, GR/IR clearing)
- [ ] Subledger-to-GL reconciliation confirmed for AP, AR, and AA before period lock
- [ ] Document splitting configuration reviewed if segment or profit center balance sheets are required
- [ ] Correct table/CDS view used for any S/4HANA query (ACDOCA / I_JournalEntryItem, not raw BSEG)
- [ ] System version (ECC vs S/4HANA) and new GL activation confirmed before any configuration advice

**Evidence required:** Transaction code outputs or configuration screenshots showing posting period status, document splitting rules, and FX valuation run log — not generic FI descriptions.

## Next Skill

After completing FI work, invoke:
- `co` — For cost allocation, profit center accounting, and CO-FI reconciliation
- `mm` — For invoice verification (MIRO), GR/IR clearing, and procurement integration
- `sd` — For billing document account determination and revenue posting
- `verification-before-completion` — Before closing any FI deliverable

## Related Skills

- `co` — Controlling: cost centers, profit centers, internal orders, CO-PA
- `mm` — Materials Management: invoice verification, GR/IR, procurement postings
- `sd` — Sales and Distribution: billing, revenue recognition, customer AR
- `analytics` — FI reporting: trial balance CDS views, journal entry analytics, SAC financial stories
- `abap-cloud` — Custom FI enhancements using RAP, CDS, BAdIs
