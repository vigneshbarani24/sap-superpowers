---
name: pp
description: Use when working with SAP Production Planning (PP) — MRP, production orders, BOMs, routings, capacity planning, shop floor control, PP-PI for process industries, or S/4HANA embedded PP/DS and MRP Live.
---

# SAP Production Planning (PP)

Governs the full planning-to-production cycle: demand management through MRP execution to shop floor confirmation. Every PP action is only as good as the master data behind it — BOM and routing integrity are non-negotiable preconditions.

## Content Routing

| Topic | Section |
|-------|---------|
| MRP execution and troubleshooting | Iron Laws + MRP Reference |
| BOM and routing master data | Key Concepts + Transaction Codes |
| Shop floor / order management | Shop Floor Reference |
| Capacity planning | Transaction Codes |
| S/4HANA MRP Live / PP/DS | Key Concepts |
| Key database tables | Key Tables |

## Iron Laws

1. **NEVER RUN MRP WITHOUT VERIFYING BOM AND ROUTING MASTER DATA.** Garbage-in, garbage-out is absolute in MRP. A BOM with a wrong quantity or an invalid routing operation produces planned orders that cannot be executed. Run `CS07` (BOM where-used) and verify routing status in `CA03` before any MRP run in a live system.
2. **ALWAYS CHECK BOM AND ROUTING CONSISTENCY BEFORE PRODUCTION ORDER CREATION.** Use `CO02` availability check and `OPJK` order-type configuration to enforce automatic BOM/routing validation. Creating an order against inconsistent master data generates component shortages and time mismatches that cascade into delivery failures.
3. **NEVER CONFIRM PRODUCTION WITHOUT VERIFYING COMPONENT AVAILABILITY.** CO11N confirmations post goods issues implicitly (with backflushing). Confirming without available stock creates negative stock or fails goods movement — both corrupt inventory integrity. Always run `CO24` (missing parts list) before final confirmation.
4. **ALWAYS MAINTAIN MRP CONTROLLERS AND PLANNING PARAMETERS BEFORE GOING LIVE.** MRP controller (MRP area), lot-sizing procedure, planning horizon, and opening period are plant-specific master data. Incorrect parameters produce either explosion of planned orders or complete silence where shortages exist.
5. **NEVER USE TOTAL MRP (MD01) IN PRODUCTION WITHOUT SCOPE-OF-PLANNING CONTROLS.** MD01 re-plans the entire plant. In a live system with thousands of materials, an uncontrolled MD01 run can overwrite manual schedule adjustments and create massive rescheduling exceptions. Use MD01N (MRP Live) or MD02 for targeted runs.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Run MD01 to "refresh the plan" in production | "Total MRP catches everything" | Overwrites manually fixed schedules; floods MRP controllers with exceptions; may take hours | Use MD01N with scope-of-planning limited to relevant materials/MRP areas |
| Create a production order without checking BOM validity | "The BOM was created last week, it should be fine" | Alternative BOMs, usage/validity date issues, or missing items produce incorrect component reservations | Always run `CS03` validity check and `CO02` component overview before order release |
| Backflush all components for speed | "Backflushing simplifies shop floor" | Backflushing masks real consumption; negative stock goes undetected until month-end; unreliable for high-value components | Restrict backflushing to low-value, bulk components; use goods issue (261 movement) for controlled components |
| Skip routing and use only BOM for lead time | "We know how long production takes" | Without routing, capacity planning (CM01) has no data; scheduling produces unreliable dates | Maintain routings with operation times in `CA01`; even simplified routings are better than none |
| Use planning strategy 10 (MTS) for all materials | "We always produce to stock" | Strategy 10 consumes against planned independent requirements only; customer orders don't reduce plan without strategy 40 or 50 | Map demand strategy to business model: 10 for pure MTS, 20 for MTO, 40/50 for mixed |
| Ignore MRP exception messages | "There are always thousands of exceptions" | Exception messages 10 (new), 20 (reschedule in), 30 (reschedule out) represent real planning gaps | Filter exceptions by priority using MD06; resolve reschedule exceptions before confirming delivery commitments |
| Confirm partial quantities without TECO | "We'll finish the rest tomorrow" | Open production orders accumulate WIP; settlements fail at period-end if orders stay open with zero remaining quantity | Set final confirmation flag in CO11N or issue TECO (CO02 → Technically Complete) when order is done |

## Red Flags

Watch for these in your own reasoning — each signals a planning or data integrity risk:

- "Let's just run MRP and see what happens..." → MRP must be preceded by master data validation. MRP is diagnostic, not experimental.
- "The BOM is probably correct..." → BOM correctness must be verified with `CS03` — assumptions in MRP produce real procurement and production failures.
- "We'll confirm and fix the stock later..." → Negative stock from incorrect confirmation corrupts inventory valuation and MRP signals simultaneously.
- "Capacity planning can come later, just schedule the orders..." → Scheduling without capacity produces a plan the shop floor cannot execute; delivery dates become fiction.
- "Exception messages are noise in our system..." → Unreviewed exceptions are signals of real gaps. A reschedule-out exception on a purchased component means a late delivery you haven't escalated yet.
- "PP-PI is just PP with a different name..." → PP-PI (process orders, process instructions, PI sheets) has distinct master data (resources, master recipes) and confirmation logic — treat it separately.

<HARD-GATE>
Before any MRP run or production order creation: confirm BOM status (valid, correct usage/plant), routing status (released, valid work centers), and planning parameters (MRP type, lot size, planning horizon) are correct for the target plant and material. Do not execute MRP or create production orders until master data validity is confirmed.
</HARD-GATE>

## Key Concepts

- **Planning Hierarchy:** SOP (rough-cut) → Demand Management (PIR via MD61) → MRP (MD01/MD02) → Planned Orders → Production Orders / Process Orders.
- **BOM (Bill of Materials):** Multi-level component list maintained in CS01/CS02/CS03. BOM usage 1 = Production. Alternative BOMs selected by lot-size range or selection method.
- **Routing:** Operation sequence with work centers, standard values (setup, machine, labor times). CA01/CA02/CA03. Used for scheduling and capacity planning.
- **Work Centers:** CR01/CR02. Contain capacity category, available capacity formula, costing data. Foundation of capacity planning (CM01/CM25).
- **MRP Types:** PD (MRP), VB (reorder point), VM (automatic reorder), ND (no planning). Set at MRP1 view of material master.
- **Lot-Sizing Procedures:** EX (lot-for-lot), FX (fixed lot), HB (replenishment up to max), MB (monthly), EX is clean-core standard for MTO.
- **MRP Live (MD01N):** S/4HANA embedded MRP on HANA — runs in-memory, dramatically faster than classic MRP, supports parallel processing. Replaces MD01 for most scenarios.
- **Embedded PP/DS:** Advanced planning within S/4HANA (no separate APO). Handles finite scheduling, pegging, and optimization for complex environments.
- **pMRP (Predictive MRP):** S/4HANA feature that pre-calculates MRP impact before execution — shows exceptions without changing the database.
- **PP-PI:** Process industries variant using master recipes (C201), resources (CRC1), and process orders (COR1/COR6N). PI sheets drive shop floor execution.

## Transaction Codes

| TCode | Purpose |
|-------|---------|
| CS01 / CS02 / CS03 | Create / Change / Display BOM |
| CS07 | BOM usage (where-used) |
| CA01 / CA02 / CA03 | Create / Change / Display Routing |
| CR01 / CR02 / CR03 | Create / Change / Display Work Center |
| MD61 | Create Planned Independent Requirements (PIR) |
| MD01 | Total MRP run (classic) |
| MD01N | MRP Live (S/4HANA) |
| MD02 | Single-item, multi-level MRP |
| MD03 | Single-item, single-level MRP |
| MD04 | Stock/Requirements List (planning situation) |
| MD06 | MRP exception messages (collective) |
| MD07 | Current stock/requirements (collective display) |
| CO01 | Create Production Order |
| CO02 | Change Production Order |
| CO03 | Display Production Order |
| CO11N | Production Order Confirmation (time ticket) |
| CO15 | Production Order Confirmation (simplified) |
| COOIS | Production Order Information System |
| CO24 | Missing Parts List |
| CO13 | Cancel Confirmation |
| CM01 | Capacity Planning — Work Center View |
| CM25 | Order-based Capacity Planning |
| COR1 / COR6N | Create / Confirm Process Order (PP-PI) |

## Key Database Tables

| Table | Content |
|-------|---------|
| AFKO | Production Order Header |
| AFPO | Production Order Item |
| AFVC | Production Order Operations |
| RESB | Component Reservations (from prod orders) |
| STKO | BOM Header |
| STPO | BOM Items |
| PLKO | Routing Header |
| PLPO | Routing Operations |
| PLAP | Work Center Assignments to Operations |
| MARA / MARC | Material Master General / Plant Data |
| MDVM | MRP Planning File Entry |

## Integration Points

- **MM (Materials Management):** MRP generates purchase requisitions for externally procured components. GR (movement 101) against production orders via MIGO. Component availability check reads MM stock.
- **CO (Controlling):** Production orders are CO objects (order type PP01). Actual costs posted via confirmations and GI; settled to cost object (cost center / product cost collector) at period-end via KO88/CO88.
- **QM (Quality Management):** In-process inspection triggered at routing operation level (control key QM01). Inspection lots created automatically; results recording blocks order confirmation until lot is accepted.
- **PM (Plant Maintenance):** Work center downtime from PM maintenance orders reduces available capacity in CM01. Equipment master linked to work centers.
- **SD (Sales and Delivery):** Make-to-order (strategy 20) links sales order line items directly to production orders via pegging. Delivery scheduling uses production lead time from routing.

## Production Scenarios

### Make-to-Stock Discrete Manufacturing
Forecast-driven production of standard goods:
- Planning strategy 10
- Demand from forecast or sales forecast
- MRP generates planned orders (MD02)
- Convert to production orders (CO40 or manual CO01)
- Release order (CO02) generates reservations, capacity requirements
- Confirmation (CO11N) on shop floor — partial or final
- Goods receipt of finished product (MvT 101) — often automatic on final confirmation
- Order settlement at period-end (KO88)

### Make-to-Order Production
Customer-order-driven production:
- Planning strategy 20
- Sales order with requirement class 040 (MTO)
- Individual requirements, no consumption of stock
- Production order valuated to sales order item (valuation M)
- Settlement to sales order at completion
- Cost estimate per sales order

### Repetitive Manufacturing
High-volume line production:
- Line/cell production, period-based
- Master data: REM profile on material master MRP 4 view
- Planning table (MF50) for daily/weekly quantities
- Run schedule quantity (RSQ) planned
- Backflush at completion (MFBF) — auto consumes components
- Reduced paperwork, no production order per unit

### Process Manufacturing (PP-PI)
Recipe-driven, batch-oriented industries (chemicals, pharma):
- Master recipe (C201) replaces BOM + routing
- Process order (COR1)
- Control recipe (CO60) sent to PI-PCS
- Electronic batch record (EBR)
- Batch management integration
- Phase-based operations

## Capacity Planning Examples

- **Work center definition (CR02)** — Capacity category (001 machine, 002 labor), pooled capacity for shared resources
- **Capacity evaluation (CM01)** — Load vs. available per work center, per day/week/month
- **Capacity leveling (CM21)** — Graphical Gantt chart, drag to reschedule
- **Constraint-based scheduling** — Finite scheduling considers capacity limits; infinite ignores
- **PP/DS integration** — Advanced scheduling via SAP Advanced Planning; optimizer, heuristics

## Predictive MRP (pMRP)

S/4HANA 1909+ replaces classic MRP with HANA-native predictive capabilities:
- **vs Classic MRP**: pMRP uses HANA for in-memory processing; can simulate capacity scenarios
- **Forecast integration**: Pulls demand from IBP (Integrated Business Planning) or embedded forecasting
- **Simulation**: "What if" capacity scenarios before committing to production plan
- **IBP integration**: Two-way flow of supply plan, demand signal, capacity constraints
- **Run via MRP Live (MD01N)**: Single transaction replaces MD01/MD02/MD03

## Shop Floor Scenarios

### Confirmation Types
- **Partial confirmation** — Report progress mid-operation
- **Final confirmation** — Operation complete, triggers next operation
- **Automatic confirmation** — PP-MII integration, no manual entry
- **Milestone confirmation** — Only at defined milestones

### Backflush Configuration
- Enabled on material master or routing operation
- Auto-consumes components (MvT 261) based on BOM
- Timing: at confirmation or at final confirmation
- Inverse posting for over/under consumption

### Common Goods Movements
| MvT | Description |
|-----|-------------|
| 101 | GR of finished product |
| 261 | Goods issue to production order |
| 262 | Reversal of 261 |
| 122 | Return to vendor (from production) |
| 531 | By-product receipt |
| 543 | Subcontracting consumption |

### Yield and Scrap
- Yield posting on confirmation (default)
- Scrap separate line (MvT 261 to scrap cost center)
- Yield % tracking by production order
- Operation scrap vs assembly scrap

### Rework
- Rework order as subordinate to original
- Separate component list
- Settlement back to original order or scrap

## Common PP Issues

- **BOM without routing** → Capacity planning fails; always maintain both
- **MRP controller missing on material master** → Material excluded from MRP run; assign MRP controller in MRP 1 view
- **Planning strategy mismatch** → MTS strategy on MTO material causes wrong demand handling
- **PP/DS optimizer not licensed** → Falls back to heuristic scheduling; verify license
- **Material master inconsistency across plants** → Extend views properly; use MM17 for mass maintenance

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] BOM verified in CS03: valid dates, correct plant/usage, all component quantities confirmed
- [ ] Routing verified in CA03: operations released, work centers assigned, standard values maintained
- [ ] MRP run executed with correct scope (MD01N or MD02); planning file entries reviewed in MD04
- [ ] Exception messages reviewed in MD06; reschedule and shortage exceptions resolved or documented
- [ ] Production orders created with availability check passed; missing parts list (CO24) is clear
- [ ] Confirmations posted in CO11N with correct quantities; no negative stock resulting

**Evidence required:** MD04 screenshot showing net requirements covered; CO11N confirmation posted without error; COOIS showing order status REL or TECO.

## Next Skill

After PP planning and execution tasks: `verification-before-completion`
For quality inspection integration: `qm`
For cost settlement and variance analysis: `fi` or `co`

## Related Skills

- `mm` — Procurement of components, GR/GI movements
- `qm` — In-process and goods-receipt inspection
- `pm` — Work center capacity integration with maintenance
- `fi` — Production order settlement and WIP valuation
- `development-workflow` — Custom MRP enhancements and user exits
