---
name: co
description: Use when working with SAP Controlling (CO) — Cost Element Accounting, Cost Center Accounting, Internal Orders, Profit Center Accounting, CO-PA, Product Costing, Material Ledger, or period-end allocation cycles in any S/4HANA or ECC implementation.
---

# SAP Controlling (CO)

This skill enforces correct CO configuration, allocation design, and period-end close discipline. In S/4HANA, CO and FI share the Universal Journal (ACDOCA), eliminating the classic CO-FI reconciliation — but all cost object assignments, settlement rules, and allocation cycles must still be correct from the first posting.

## Content Routing

| Topic | Section |
|-------|---------|
| Cost Center Accounting | Cost Center Accounting |
| Internal Orders | Internal Orders |
| Profit Center Accounting | Profit Center Accounting |
| CO-PA (Profitability Analysis) | Profitability Analysis (CO-PA) |
| Product Costing | Product Costing |
| Material Ledger / Actual Costing | Material Ledger |
| Period-end allocations | Period-End Close Activities |
| Integration with FI / PP / PS | Integration Points |

## Iron Laws

1. **ALWAYS MAINTAIN SETTLEMENT RULES FOR STATISTICAL AND REAL ORDERS.** Every internal order with real postings must have a settlement rule defined before costs are posted. Settlement rules determine where costs land (cost center, GL account, profitability segment). An order without a settlement rule will block period-end settlement and prevent CO close.
2. **NEVER SKIP CO-FI RECONCILIATION AT PERIOD CLOSE IN ECC.** In ECC, CO and FI maintain separate ledgers; the reconciliation ledger (transaction KALC) must be run to ensure CO postings between company codes are reflected in FI. Skipping this creates inter-company imbalances that auditors will find. (In S/4HANA this step is eliminated — but confirm the system version before skipping it.)
3. **ALWAYS REVIEW ALLOCATION CYCLES BEFORE PERIOD-END RUN.** Assessment (KSU5) and distribution (KSV5) cycles must be reviewed for correct senders, receivers, tracing factors, and period assignments before the production run. A misonfigured cycle posts incorrect allocations to hundreds of cost objects — reversing and rerunning is a full day of work and requires period reopening.
4. **NEVER MIX STATISTICAL AND REAL POSTINGS ON THE SAME COST OBJECT WITHOUT CLEAR DESIGN.** Statistical orders and WBS elements carry costs for reporting only — costs must simultaneously be posted to a real cost object. Treating a statistical object as real (or vice versa) misrepresents cost flows and breaks settlement.
5. **ALWAYS COMPLETE PRODUCT COST ESTIMATES BEFORE THE STANDARD PRICE VALIDITY PERIOD.** Cost estimates (CK11N/CK40N) must be marked and released before the period they apply to. A missing or incorrect standard price causes all production order variances to be distorted and makes material ledger actual costing unreliable.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip settlement rule definition for "temporary" internal orders | "It's just for tracking, we'll settle it manually" | KO88 (order settlement) will fail at period-end without a settlement rule; period close is blocked | Define settlement rules at order creation; use default rules per order type where applicable (OKO7) |
| Run allocation cycles (KSU5/KSV5) in production without a test run | "We've done this cycle before" | Tracing factor data changes every period (headcount, activity quantities, machine hours); a stale cycle posts wrong amounts | Always execute the cycle with Test Run flag first; review output before posting |
| Use CO-PA costing-based and account-based interchangeably | "Both show profitability data" | Costing-based CO-PA uses value fields (not GL accounts) and cannot be reconciled to FI without a reconciliation report; account-based CO-PA reconciles directly to FI and is the S/4HANA strategic approach | In S/4HANA, account-based CO-PA is the default and recommended approach; design value fields in costing-based only if legacy reporting requires it |
| Release a cost estimate with incorrect overhead rates | "We'll adjust the variance at period-end" | Incorrect standard prices distort WIP, variance, and inventory valuations for the entire period; material ledger actual costing will not correct for a wrong standard | Verify activity prices (KSBT) and overhead rates (KZP2) before releasing cost estimates via CK40N |
| Manually adjust allocation results directly in GL rather than correcting the cycle | "It's faster to just post a journal" | Manual GL corrections bypass CO, leaving CO and FI out of sync (in ECC); creates unexplained variances in cost center reports | Correct the cycle configuration, reverse the incorrect run (KSU2/KSV2), and rerun the corrected cycle |
| Create profit centers without a profit center hierarchy | "We only have a few profit centers for now" | Profit center standard hierarchy is mandatory for CO reporting and CO-PA; adding it later requires retroactive restructuring of posted data | Define the standard hierarchy (KCH1) before creating any profit centers; plan for the full org structure up front |

## Red Flags

Watch for these in your own reasoning — each signals an Iron Law violation:

- "This internal order doesn't need a settlement rule yet..." → Settlement rules are required before the first cost posting. Define them now or KO88 will block period-end.
- "The allocation cycle hasn't changed, I'll skip the test run..." → Tracing factor inputs (headcount, machine hours) change every period. Test run is always required.
- "I'll use the same CO-PA approach from the old ECC system..." → In S/4HANA, account-based CO-PA is strategic. Confirm whether costing-based CO-PA is still needed before designing value fields.
- "We'll skip reconciliation ledger this period, it rarely has differences..." → In ECC, KALC is a mandatory close step when cross-company CO postings exist. Skipping it creates FI imbalances.
- "The standard price looks approximately right, we can release it..." → Approximately right standard prices compound into large variances. Verify all cost components (material, activity, overhead) before releasing with CK40N.
- "Let me post a manual adjustment directly to the cost center..." → If the root cause is an incorrect allocation cycle, fix the cycle — manual adjustments hide the problem and accumulate as unexplained differences.

<HARD-GATE>
Before advising on CO configuration or period-end activities: confirm the system version (ECC or S/4HANA) and whether account-based CO-PA or costing-based CO-PA (or both) is active. Confirm whether Material Ledger with actual costing is enabled. These three flags change nearly every CO design decision — do not advise without them.
</HARD-GATE>

## Key Concepts

- **Universal Journal (ACDOCA):** In S/4HANA, all CO postings write to ACDOCA alongside FI postings. The classic CO reconciliation ledger (KALC) is not needed — CO and FI are always in sync. Cost objects (cost center, order, WBS, profitability segment) appear as columns in every ACDOCA line item.
- **Cost Elements:** In S/4HANA, cost elements are merged into the GL account master (FS00). Separate cost element master data (KA01) no longer exists in S/4HANA — GL accounts with a cost element category are automatically cost elements.
- **Assessment vs. Distribution:** Assessment (KSU5) transfers costs using a secondary cost element, obscuring the original cost nature. Distribution (KSV5) retains the original primary cost element. Use distribution when cost transparency is required; use assessment when only the allocated total matters.
- **CO-PA (Account-Based):** Profitability segments stored in ACDOCA with GL accounts as the measure — fully reconciles to FI. The S/4HANA standard approach.
- **CO-PA (Costing-Based):** Profitability segments stored in CE1XXXX tables with value fields — not directly reconcilable to FI. Legacy approach; still available in S/4HANA but not strategic.
- **Material Ledger / Actual Costing:** Captures actual costs of materials through the production process. Produces an actual cost for each material at period-end (CKMLCP). Mandatory if actual-cost inventory valuation is required.
- **Activity Types:** Define services produced by cost centers (machine hours, labor hours). Activity prices (KP26/KSBT) are used to value production order operations.

## Transaction Codes

| Transaction | Purpose |
|-------------|---------|
| KS01 / KS02 | Create / change cost center |
| KA01 / KA02 | Create / change cost element (ECC only; use FS00 in S/4HANA) |
| KP06 | Enter cost center planning (manual) |
| KP26 | Enter activity type planning (price planning) |
| KSBT | Display / execute activity price calculation |
| KSB1 | Cost center actual line items |
| KSU5 | Execute assessment cycle |
| KSV5 | Execute distribution cycle |
| KSU2 / KSV2 | Reverse assessment / distribution cycle |
| KB21N | Enter direct activity allocation |
| KO01 / KO02 | Create / change internal order |
| KO88 | Settle internal order |
| KE30 | Execute CO-PA report (costing-based) |
| KE24 | CO-PA line items |
| CK11N | Create single-level material cost estimate |
| CK40N | Create cost estimate with quantity structure (production) |
| CK24 | Mark and release cost estimate |
| CKMLCP | Cockpit for material ledger actual costing |
| 1KEI / 1KE4 | Transfer SD billing / FI documents to CO-PA |

## Key Tables and CDS Views

| Object | Type | Description |
|--------|------|-------------|
| ACDOCA | Table | Universal Journal — primary CO data store in S/4HANA |
| COEP | Table | CO object line items (ECC; compatibility view in S/4HANA) |
| COSS / COSP | Table | CO object summary (actual/plan by period) |
| CSKS / CSKT | Table | Cost center master / text |
| AUFK | Table | Internal order master data |
| CE1XXXX | Table | CO-PA costing-based line items (XXXX = operating concern) |
| KEKO / KEPH | Table | Product costing header / cost components |
| MLHD / MLIT | Table | Material ledger document header / items |
| I_CostCenter | CDS | Released VDM — cost center master |
| I_ProfitCenter | CDS | Released VDM — profit center master |
| I_CostCenterActualLineItem | CDS | Released VDM — cost center actual line items |
| C_PROFITCENTERACTUALQ | CDS | Consumption VDM — profit center actual query (analytical apps) |
| I_InternalOrder | CDS | Released VDM — internal order master |

## Cost Center Accounting

### Planning (KP06, KP26)
- Plan primary costs by cost center and cost element for each version (plan version 0 = operative plan)
- Plan activity output quantities (KP26) to enable activity price calculation (KSBT)
- Lock plans after approval to prevent unauthorized changes

### Actual Postings
- Primary costs flow from FI postings with cost center assignment
- Secondary costs flow via activity allocation (KB21N), assessment (KSU5), or distribution (KSV5)
- Repostings via KB11N (cost center) for corrections

### Variance Analysis
- Plan vs. actual comparison via S_ALR_87013611 or KSB1 drill-down
- Explain variances before allocations to downstream objects

## Profitability Analysis (CO-PA)

### Account-Based CO-PA (S/4HANA Standard)
- Revenue and cost of goods sold posted directly via ACDOCA with profitability segment characteristics
- Characteristics: customer, material, sales org, division, profit center, segment
- Fully reconciled to FI at all times — no reconciliation report needed

### Costing-Based CO-PA (Legacy / Optional)
- Parallel line items in CE1XXXX tables
- Value fields aggregate multiple GL accounts into business-meaningful buckets
- Period-end transfer of SD billing conditions via 1KEI

## Product Costing

### Standard Cost Estimate (CK11N / CK40N)
1. Define costing variant (PPC1 for standard)
2. Explode BOM and routing to determine quantity structure
3. Value with standard prices, activity rates, and overhead rates
4. Mark for the new period (CK24 — mark step)
5. Release at period start (CK24 — release step)
6. Standard price updated in material master accounting view

### Period-End Costing Steps
- WIP calculation (KKAX/KKAO) for open production orders
- Variance calculation (KKS1/KKS2) for partially or fully delivered orders
- Settlement of production orders (CO88) to move variances to stock or P&L

## Material Ledger

- Captures actual costs through multi-level where-used (raw material → semifinished → finished)
- Actual cost calculation (CKMLCP) runs at period-end after all actual postings are complete
- Actual price replaces standard price for inventory valuation (if actual costing is active)
- Prerequisites: all production orders settled, all purchase order price differences posted

## Period-End Close Activities

Recommended CO close sequence:

1. Confirm all actual activity allocations entered (KB21N)
2. Repost any misallocated costs (KB11N)
3. Run assessment and distribution cycles (KSU5/KSV5) — test run first
4. Settle internal orders (KO88)
5. Settle production orders — WIP, variance, CO88 (PP integration)
6. Settle projects (CJ88) if PS is active
7. Run CO-PA actual postings / transfer (1KEI for costing-based CO-PA)
8. Material ledger actual costing (CKMLCP) if active
9. In ECC only: CO-FI reconciliation (KALC)
10. Lock CO period

## Integration Points

| Module | Integration Description |
|--------|------------------------|
| FI | In S/4HANA, FI and CO share ACDOCA — every FI posting with a cost object simultaneously updates CO. In ECC, reconciliation ledger (KALC) bridges cross-company CO postings back to FI. |
| PP | Production orders collect actual costs (material, activity, overhead). Period-end: WIP (KKAO), variance (KKS2), settlement (CO88) close the cost loop back to CO-PA or cost center. |
| PS | Project WBS elements and networks act as CO cost objects. Project costs settle to CO-PA or cost centers via CJ88. |
| SD | SD billing conditions (revenue, discounts, surcharges) transfer to CO-PA via 1KEI (costing-based) or directly via ACDOCA (account-based). Profitability segments are determined from sales order characteristics. |
| MM | Purchase order price differences and material price variances flow to CO via material ledger. Goods receipt valuation differences post to price difference accounts in FI and CO simultaneously. |

## Best Practices

1. **Define a CO document type strategy** — use consistent document types for manual allocations, settlements, and repostings to simplify auditing.
2. **Version control for planning** — use multiple plan versions (version 0 for operative, version 1 for budget, version 2 for rolling forecast) rather than overwriting plan data.
3. **Maintain a cost center hierarchy** that mirrors the organizational reporting structure — changing the hierarchy retroactively invalidates historical reports.
4. **Use statistical key figures (SKF) as allocation bases** — headcount, floor space, and IT users are stable, auditable tracing factors. Avoid percentage-based splits unless no better basis exists.
5. **Archive CO documents** regularly — COEP (ECC) and ACDOCA (S/4HANA) grow with every posting; archiving closed fiscal years is essential for system performance.

## Costing Scenarios

### Product Cost by Period (Make-to-Stock)
Standard manufacturing, period-based costing:
- Cost object: Product Cost Collector (PCC) or Production Order
- Variance calculation at period end (KKS1)
- Settlement to COGS or stock accounts (CO88)
- Standard vs actual cost comparison

### Product Cost by Order (Engineer-to-Order)
Complex, one-off production:
- Cost object: Production order
- WIP (Work in Process) calculation monthly (KKAO)
- Variance analysis (KKO0)
- Settlement to sales order or profitability segment (KO88)

### Product Cost by Sales Order (Make-to-Order)
Customer-specific with cost visibility:
- Cost object: Sales order item
- Sales order settlement at billing
- Revenue recognition methods: time-based, delivery-based, milestone-based
- Customer-specific cost estimate (CK11N with sales order)

### Service Costing
Professional services, internal service provision:
- Service order as cost collector (KSBT)
- Time recording captures labor
- Material consumption via reservations
- Settlement to profitability segment or customer cost object

## Allocation Cycle Examples

### IT Cost Center Distribution
- Cycle: IT_DIST (monthly)
- Senders: IT cost centers (cost elements: primary costs)
- Receivers: All cost centers (tracing factor: headcount)
- Method: Distribution (keeps primary cost element)
- Tcode: KSV1 (create), KSV5 (execute)

### Manufacturing Overhead Assessment
- Cycle: MFG_ASSESS (monthly)
- Senders: Service cost centers
- Receivers: Production cost centers (SKF: machine hours)
- Method: Assessment (uses secondary cost element 990100)
- Tcode: KSU1 (create), KSU5 (execute)

### Admin Overhead to Profit Centers
- Cycle: ADMIN_PC (monthly)
- Senders: Admin cost centers
- Receivers: Profit centers (SKF: revenue)
- Method: Profit center allocation

## Product Costing Examples

### Standard Cost Estimate with Quantity Structure (CK11N)
Uses BOM + routing automatically:
- Costing variant (PPC1 standard, 0PPC1 material cost est)
- Valuation variant: determines strategy for material prices, activity prices
- Cost component structure splits cost: Material, Labor, Machine, Overhead
- Runs: CK11N (single), CK40N (mass)
- Release to update std price: CK24

### Standard Cost Estimate without Quantity Structure (KKPAN)
Manual entry when no BOM/routing:
- Enter cost component view directly
- Used for purchased materials or simplified products
- Updates material master std price

### Cost Component Split
Layered view of total cost:
- Layer 1: Raw materials (auto from BOM)
- Layer 2: Direct labor (from routing)
- Layer 3: Machine time (from routing)
- Layer 4: Overhead (from costing sheet)
- Useful for sourcing decisions, transfer pricing

### Mixed Costing
Multiple procurement alternatives weighted:
- Production order + purchased material
- Mix ratios define portions (e.g., 70% make, 30% buy)
- Final std cost is weighted average

## Common CO Issues

- **CO-FI reconciliation at period close** — Run FAGLCOFITRANSFER; imbalances prevent period close
- **Missing settlement rules** — Blocks period-end; run KSR1 to identify orders without rules
- **Allocation cycle circular references** — Cost center A assesses to B, B to A; detected via cycle validation
- **Statistical vs real postings** — Statistical orders don't carry real cost; don't settle
- **CO area vs controlling area vs company code** — Must align: CCode → CO Area (1:N or N:1), report at the right level

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Settlement rules confirmed for all internal orders with real postings before period-end
- [ ] Allocation cycles (assessment/distribution) reviewed and test-run executed before production run
- [ ] CO-PA type confirmed (account-based vs. costing-based) and design decisions aligned
- [ ] Product cost estimates marked and released before the applicable validity period
- [ ] System version confirmed (ECC or S/4HANA) and CO-FI reconciliation step included/excluded accordingly
- [ ] Material ledger actual costing prerequisites met (all orders settled) if ML is active

**Evidence required:** KSU5/KSV5 test run output, settlement rule list (KOK5 or order list), CK40N cost estimate status — not generic CO descriptions.

## Next Skill

After completing CO work, invoke:
- `fi` — For FI period-end close, GL posting verification, and subledger reconciliation
- `verification-before-completion` — Before closing any CO deliverable

## Related Skills

- `fi` — Financial Accounting: GL postings, period-end close, ACDOCA structure
- `mm` — Materials Management: purchase price variances, material ledger inputs
- `sd` — Sales and Distribution: CO-PA revenue postings, billing-to-COPA transfer
- `analytics` — CO reporting: profit center analytics, cost center actuals CDS views
- `abap-cloud` — Custom CO enhancements, CDS views for CO reporting, BAdI implementations
