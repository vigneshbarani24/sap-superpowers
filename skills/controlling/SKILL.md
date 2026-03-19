---
name: controlling
description: Use when working with SAP Controlling (CO) — cost centers, internal orders, profitability analysis, product costing, or CO period-end. Provides config patterns, key tcodes, and SAP references.
---

# SAP Controlling (CO) Reference Skill

## Content Routing

| Topic | Section |
|---|---|
| Controlling area, cost center hierarchy | 1. CO Organizational Structure |
| Primary / secondary cost elements, G/L integration | 2. Cost Element Accounting |
| Cost center types, planning, allocations | 3. Cost Center Accounting |
| Order types, settlement, budgeting | 4. Internal Orders |
| CO-PA costing-based vs account-based, margin analysis | 5. Profitability Analysis |
| Cost estimates, material ledger, actual costing | 6. Product Costing |
| Allocation cycles, settlement, variance calc | 7. Period-End Closing |
| Key tcodes quick-reference | Key Transactions |
| Universal journal, margin analysis | S/4HANA Changes |

---

## 1. CO Organizational Structure

- **Controlling Area (KOKRS):** Top-level CO org unit. Assigned to one or more company codes. In S/4HANA, the controlling area must equal the company code's operating concern currency.
- **Cost Center Hierarchy (Standard Hierarchy):** Every cost center must belong to exactly one node in the standard hierarchy. The root node is defined when creating the controlling area (tcode **OKKP**).
- **Operating Concern:** Required for CO-PA. Defines characteristics and value fields used in profitability reporting.

Key configuration path: `SPRO > Controlling > General Controlling > Organization`

---

## 2. Cost Element Accounting

- **Primary Cost Elements:** Mirror G/L expense/revenue accounts. Created in category 1 (primary costs), 11 (revenue), 12 (sales deductions).
- **Secondary Cost Elements:** Exist only in CO. Categories include 21 (internal settlement), 31 (order/project results analysis), 41 (overhead), 42 (assessment), 43 (internal activity allocation).
- **S/4HANA change:** No separate cost element master. Any G/L account with an account type that maps to CO (cost/revenue) automatically functions as a cost element. Table CSKA/CSKB replaced by SKA1/SKB1 attributes.

Config path: `SPRO > Controlling > Cost Element Accounting`

---

## 3. Cost Center Accounting (CO-OM-CCA)

### Cost Center Types

| Category | Meaning |
|---|---|
| H | Production |
| F | R&D |
| V | Sales & Distribution |
| E | Administration |
| L | Logistics |

### Planning

- **Manual planning (KP06):** Enter planned costs per cost element per period.
- **Activity type planning (KP26):** Plan activity quantities and rates.
- **Statistical key figures (KP46):** Drivers for allocations (headcount, sq. meters).

### Allocations

- **Assessment (KSU5):** Transfers primary and secondary costs using assessment cost element (cat 42). Original cost element detail is lost on the receiver.
- **Distribution (KSV5):** Transfers only primary costs and preserves the original cost element on the receiver.
- **Indirect Activity Allocation (KSC5):** Allocates activity quantities based on statistical key figures.

---

## 4. Internal Orders (CO-OM-OPA)

- **Order Types (KOT2):** Control number ranges, settlement profiles, planning profiles, and status management. Common types: overhead cost orders, investment orders, accrual orders.
- **Settlement Rules (KO02 > Settlement Rule tab):** Define receivers (cost center, G/L account, asset, WBS element, profitability segment) and distribution rules (percentage, equivalence number, amount).
- **Settlement Profile:** Determines valid receiver types, document type, and allocation structure.
- **Budgeting (KO22):** Original budget, supplements, returns, transfers. Budget availability control triggers warnings or errors when purchase orders or invoices exceed budget.

---

## 5. Profitability Analysis (CO-PA)

### Costing-Based CO-PA (ECC)

- Uses **value fields** mapped from SD conditions, CO allocations, and cost estimates.
- Highly flexible reporting but data stored outside the G/L — reconciliation effort required.
- Key config: operating concern (KEA0), value field assignment (KE4I), PA transfer structure (KEI1).

### Account-Based CO-PA

- Uses cost elements (accounts) as the value axis. Fully reconciled with FI since postings hit the G/L.
- Less flexible characteristic derivation than costing-based.

### S/4HANA: Margin Analysis

- Combines the best of both: account-based posting to the universal journal **plus** real-time characteristic derivation and value-field-style reporting.
- Costing-based CO-PA is still available but SAP recommends migration to margin analysis.
- CDS views `I_ProfitabilitySegment` and `C_ProfitabilityAnalysis` replace legacy reports.

---

## 6. Product Costing (CO-PC)

### Cost Estimate (CK11N / CK40N)

1. **Costing variant** controls BOM explosion, activity price determination, overhead calculation.
2. **Quantity structure:** BOM + routing (or recipe in PP-PI).
3. **Valuation:** Material prices from material master, activity prices from cost center planning.
4. **Mark and release (CK24):** Standard price update on the material master.

### Material Ledger (CKMLCP)

- Captures price and exchange-rate differences at material level.
- **Actual costing (ML):** Revalues inventory at actual prices at period end, rolling up differences through the BOM.
- In S/4HANA, the material ledger is **mandatory** and always active.

---

## 7. Period-End Closing

| Step | Tcode | Purpose |
|---|---|---|
| Repost CO line items | KB61 | Correct mispostings |
| Overhead calculation | KGI2 / CO43 | Apply overhead rates to orders/WBS |
| Template allocation | CPAA | Activity-based costing driver allocation |
| Assessment cycle | KSU5 | Allocate cost center costs to receivers |
| Distribution cycle | KSV5 | Distribute primary costs preserving cost elements |
| Activity price revaluation | MFN1 / KSII | Revalue at actual activity prices |
| WIP calculation | KKAO | Calculate work in process for production orders |
| Variance calculation | KKS1 / KKS2 | Production order / product cost collector variances |
| Settlement | KO88 / CO88 | Settle orders, projects, cost objects to receivers |
| CO-PA reclassification | KEG5 | Adjust CO-PA postings |
| Profit center update | 1KEK | EC-PCA periodic transfer (ECC only) |

---

## Key Transactions

| Tcode | Description |
|---|---|
| KS01 / KS02 / KS03 | Create / Change / Display cost center |
| KSH1 / KSH2 | Create / Change cost center group |
| KA01 / KA02 | Create / Change cost element (ECC) |
| KP06 | Plan cost/activity input for cost centers |
| KP26 | Plan activity output / price for cost centers |
| KSU5 | Execute assessment cycle |
| KSV5 | Execute distribution cycle |
| KO01 / KO02 | Create / Change internal order |
| KO22 | Budget internal order |
| KO88 | Settle internal order |
| KEA0 | Maintain operating concern |
| KE30 | Execute CO-PA report |
| KE24 | Display CO-PA line items |
| CK11N | Create cost estimate with quantity structure |
| CK24 | Mark / Release standard cost estimate |
| CK40N | Costing run |
| CKMLCP | Material ledger cockpit (actual costing) |
| S_ALR_87013611 | Cost centers — actual/plan/variance |
| OKKP | Maintain controlling area |

---

## S/4HANA Changes

1. **Universal Journal (ACDOCA):** All CO postings land in a single table alongside FI. Tables COEP, COBK, COSP, COSS are compatibility views — no longer the source of truth.
2. **Cost elements merged into G/L:** Tables CSKA/CSKB deprecated. Cost element attributes maintained via the G/L account master (FS00, account type configuration).
3. **Margin Analysis replaces costing-based CO-PA:** Account-based CO-PA is the strategic direction. Margin analysis adds real-time profitability characteristics to every journal entry.
4. **Material Ledger always active:** Actual costing cockpit is the default for inventory valuation at actual prices.
5. **Embedded analytics:** CDS views (e.g., `C_ControllingAreaStdHierarchy`, `I_CostCenter`, `C_ProfitabilityAnalysis`) replace legacy ALV reports.
6. **Fiori apps replace SAP GUI:** "Manage Cost Centers" (F2722), "Manage Internal Orders" (F2584), "Cost Center — Plan/Actual" (F0996A).

---

## References

### SAP Help Portal

- [Controlling (CO) — SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON_PREMISE/saphelp_s4hana/en-US/4a815f3ee0431cd3e10000000a42189b/frameset.htm) — Central CO documentation hub.
- [Margin Analysis in SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON_PREMISE/saphelp_s4hana/en-US/e5ae5c727e6e1014a7e5f618c48d1d7d/frameset.htm) — Configuration and migration guide.

### SAP Notes

- **SAP Note 2267308** — CO-PA: Migration to account-based profitability analysis in S/4HANA.
- **SAP Note 2282636** — Cost element master: Changes in S/4HANA (G/L account integration).
- **SAP Note 2644202** — Material Ledger mandatory activation in S/4HANA.
