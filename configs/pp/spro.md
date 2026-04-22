# SPRO Configuration: Production Planning (PP)

## Key Configuration Areas

### Enterprise Structure and General Settings
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Plant (Production) | SPRO > Enterprise Structure > Definition > Logistics - General > Define, copy, delete, check plant | T001W | Production plant; must be assigned to company code and MRP area |
| MRP Area | SPRO > Production > Material Requirements Planning > MRP Areas > Define MRP Areas | T460A | Plant-level or storage-location-level MRP; enables sub-plant planning granularity |
| Production Scheduler Profile | SPRO > Production > Shop Floor Control > Operations > Scheduling > Define Scheduling Parameters | T399X | Defines scheduling type (forward/backward), reduction levels, and finite scheduling settings |
| MRP Group | SPRO > Production > Material Requirements Planning > MRP Groups > Carry Out Overall Maintenance of MRP Groups | T399X / T438M | Groups materials with similar planning parameters; overrides plant-level MRP defaults |
| MRP Controller | SPRO > Production > Material Requirements Planning > Master Data > Define MRP Controllers | T024D | Planner responsible for a set of materials; used for selection in MRP runs |

### Bill of Materials (BOM)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| BOM Usage | SPRO > Production > Basic Data > Bill of Material > General Data > Define BOM Usages | T416 | 1 (production), 2 (engineering), 3 (costing), 5 (plant maintenance) — controls where BOM is used |
| Item Categories | SPRO > Production > Basic Data > Bill of Material > General Data > Define Item Categories | T418 | L (stock item), N (non-stock), T (text), R (variable-size item), D (document) |
| BOM Status | SPRO > Production > Basic Data > Bill of Material > General Data > Define BOM Status | T415 | 01 (active), 02 (inactive), 03 (released) — controls BOM explosion in MRP and costing |
| Change Master | SPRO > Production > Basic Data > Bill of Material > Engineering Change Management > Define Change Master Types | AENR | Engineering change number types; controls effectivity (date, serial, parameter) |
| Alternative BOM Determination | SPRO > Production > Basic Data > Bill of Material > General Data > Define Alternative Determination | TC04 | Rules for selecting which alternative BOM to use based on lot size range |
| Material Provision Indicator | SPRO > Production > Basic Data > Bill of Material > Item Data > Define Material Provision Indicator | T416 (BEESSION) | Controls how components are staged: stock transfer, direct procurement, or subcontracting |

### Work Centers and Routing
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Work Center Categories | SPRO > Production > Basic Data > Work Center > General Data > Define Work Center Categories | T429 | 0001 (machine), 0002 (labor), 0003 (plant) — controls fields, formulas, and cost center assignment |
| Control Keys | SPRO > Production > Basic Data > Routing > General Data > Define Control Key | T430 | PP01 (production), PP02 (no costing), PP03 (milestone) — controls scheduling, costing, confirmation |
| Formulas for Scheduling | SPRO > Production > Basic Data > Work Center > Scheduling > Define Formulas | T430 / TC24 | SAP_01 to SAP_09 — standard time formulas: setup + (machine * lot size) + teardown |
| Capacity Categories | SPRO > Production > Capacity Planning > Available Capacity > Define Capacity Categories | T409 | 001 (machine), 002 (labor), 003 (energy) — types of capacity for planning and leveling |
| Routing Groups | SPRO > Production > Basic Data > Routing > General Data > Define Task List Types | PLKO (PLNTY) | N (routing), R (reference operation set), Q (inspection plan), S (maintenance task list) |
| Standard Value Keys | SPRO > Production > Basic Data > Work Center > General Data > Define Standard Value Key | T428 | SAP1 (setup, machine, labor), SAP2 (processing only) — activity type linkage |

### Material Requirements Planning (MRP)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| MRP Types | SPRO > Production > Material Requirements Planning > MRP Types > Define MRP Types | T399D | PD (MRP), VB (reorder point), VV (forecast-based), ND (no planning) — controls planning logic |
| Lot Sizing Procedures | SPRO > Production > Material Requirements Planning > Lot Size > Define Lot Sizing Procedures | T438 | EX (lot-for-lot), FX (fixed lot), TB (daily), WB (weekly), MB (monthly), PB (period) |
| Scheduling Margin Key | SPRO > Production > Material Requirements Planning > Scheduling > Define Scheduling Margin Key | T430 (FHORI) | Float before/after production, opening period — buffers for goods receipt and release |
| Planning Strategies | SPRO > Production > Material Requirements Planning > Demand Management > Planned Independent Requirements > Define Planning Strategy | T436 | 10 (make-to-stock), 20 (make-to-order), 40 (planning with final assembly), 70 (planning at assembly level) |
| Strategy Group | SPRO > Production > Material Requirements Planning > Demand Management > Planned Independent Requirements > Define Strategy Group | T436M | Combines planning strategies; assigned in material master MRP3 view |
| Procurement Type | SPRO > Production > Material Requirements Planning > Master Data > Check Procurement Type | T399X | E (in-house), F (external), X (both) — determines whether MRP creates planned orders or purchase requisitions |
| Planning File Entry | SPRO > Production > Material Requirements Planning > Planning > Define Planning File Entry | MDFD | Controls which materials are included in next MRP run; net change or regenerative |

### Production Orders
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Order Types | SPRO > Production > Shop Floor Control > Master Data > Order > Define Order Types | T003O / T399X | PP01 (standard production), PP02 (process order), PP03 (rework) — controls settlement, costing, status |
| Order Type-Dependent Parameters | SPRO > Production > Shop Floor Control > Master Data > Order > Define Order Type-Dependent Parameters | T399X | Scheduling type, costing variant, capacity requirements, availability check, settlement |
| Confirmation Parameters | SPRO > Production > Shop Floor Control > Operations > Confirmation > Define Confirmation Parameters | T399X (RUECK) | Milestone confirmation, backflush, auto goods movements, variance calculation at confirmation |
| Movement Types for Goods Movements | SPRO > Production > Shop Floor Control > Goods Movements > Define Movement Types for Goods Movements | T156 | 261 (GI to order), 262 (reversal), 101 (GR from production), 531 (by-product receipt) |
| Goods Receipt Tolerances | SPRO > Production > Shop Floor Control > Goods Movements > Define Tolerances for Goods Receipts | T159L | Overdelivery/underdelivery percentages for production order GR |
| Automatic Goods Movements | SPRO > Production > Shop Floor Control > Goods Movements > Automatic Goods Movement > Define Control for Automatic Goods Movements | T159L | Backflushing at operation confirmation; automatic GR at final confirmation |

### Product Costing
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Costing Variant | SPRO > Controlling > Product Cost Controlling > Product Cost Planning > Material Cost Estimate with Quantity Structure > Define Costing Variants | TCKH3 | PPC1 (standard), PPC3 (current) — controls costing type, valuation variant, date control, quantity structure |
| Valuation Variant | SPRO > Controlling > Product Cost Controlling > Product Cost Planning > Material Cost Estimate with Quantity Structure > Define Valuation Variants | TCKH4 | Strategy for material prices (standard price, planned price 1, moving average) |
| Cost Component Structure | SPRO > Controlling > Product Cost Controlling > Product Cost Planning > Material Cost Estimate with Quantity Structure > Define Cost Component Structure | TCKH1 | Splits product cost into components (material, labor, overhead, subcontracting, external) |
| Overhead Calculation | SPRO > Controlling > Product Cost Controlling > Product Cost Planning > Material Cost Estimate with Quantity Structure > Define Overhead | TCKH5 | Percentage-based overhead on material or production cost elements |
| Transfer Control | SPRO > Controlling > Product Cost Controlling > Product Cost Planning > Material Cost Estimate with Quantity Structure > Define Transfer Control | TCKHT | Controls which cost estimate is used for material valuation (standard cost estimate marking and release) |

## Critical Configuration Dependencies

1. **Plant and Storage Location** must exist before any PP master data (material master, BOM, routing)
2. **Work Centers** must be assigned to cost centers with activity types before routings can calculate costs
3. **BOMs and Routings** must be maintained before MRP can generate planned orders with correct quantities and dates
4. **MRP Controller** must be defined and assigned in material master before MRP run includes the material
5. **Planning Strategies** must align with material type and MRP type — make-to-stock vs. make-to-order drives fundamentally different planning behavior
6. **Costing Variant** references valuation variant, which references cost component structure — these must be built bottom-up
7. **Order Types** must be configured before production orders can be created, and settlement profiles must be assigned before period-end closing
8. **Activity Types and Prices** in CO must be maintained for work center cost centers before production order costing works

## Common Configuration Mistakes

1. **MRP type and planning strategy mismatch** — Using make-to-stock strategy (10) with an MRP type that does not support planned independent requirements, or vice versa, causing MRP to produce unexpected results.
2. **Work center formula errors** — Incorrect standard value keys or formulas in work centers, leading to wrong scheduling durations and costing values in production orders.
3. **Backflush misconfiguration** — Enabling backflush on components that require batch management or serial number tracking, causing goods issue failures at confirmation.
4. **Scheduling parameters not maintained** — Missing factory calendar assignment, shift sequences, or capacity definitions on work centers, causing production orders to schedule with zero or infinite duration.
5. **Cost component structure incomplete** — Not defining cost component splits for all relevant cost elements, causing product cost estimates to show all costs in a single bucket instead of meaningful breakdown.
