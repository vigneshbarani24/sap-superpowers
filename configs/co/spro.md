# SPRO Configuration: Controlling (CO)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Controlling Area | SPRO > Controlling > General Controlling > Organization > Maintain Controlling Area | TKA01 | Top-level CO org unit; can span multiple company codes with same chart of accounts and fiscal year |
| Assign Company Code to Controlling Area | SPRO > Controlling > General Controlling > Organization > Maintain Controlling Area > Assignment of company code(s) | TKA02 | Links FI company codes to CO controlling area for cost/revenue flow |
| Number Ranges for CO Documents | SPRO > Controlling > General Controlling > Organization > Maintain Number Ranges for Controlling Documents | NRIV (RK_BELEG) | Internal number ranges for CO postings per controlling area and fiscal year |
| Maintain Controlling Area Settings | SPRO > Controlling > General Controlling > Organization > Maintain Controlling Area | TKA01 (CCA_CTR) | Currency type, fiscal year variant, assignment control (1:1 or 1:many company codes) |
| Versions | SPRO > Controlling > General Controlling > Organization > Maintain Versions | TKA09 | Version 0 (actual), version 1+ (plan); controls plan/actual data segregation |

### Cost Element Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Primary Cost Elements | SPRO > Controlling > Cost Element Accounting > Master Data > Cost Elements > Create Primary Cost Elements Automatically | CSKA / CSKB | Category 1 (primary costs), 11 (revenue), 12 (sales deduction) — mirrors G/L accounts |
| Secondary Cost Elements | SPRO > Controlling > Cost Element Accounting > Master Data > Cost Elements > Create Secondary Cost Elements | CSKA | Category 21 (internal settlement), 41 (overhead), 42 (assessment), 43 (internal activity allocation) |
| Cost Element Groups | SPRO > Controlling > Cost Element Accounting > Master Data > Cost Element Groups > Create Cost Element Groups | SETHEADER / SETNODE | Hierarchical grouping for reporting and allocations (personnel costs, material costs, overhead) |
| Default Account Assignment | SPRO > Controlling > Cost Element Accounting > Master Data > Cost Elements > Define Default Account Assignments | TKA3Z | Automatic CO account assignment for primary postings without explicit cost object |
| Cost Element Categories | SPRO > Controlling > Cost Element Accounting > Master Data > Cost Elements > Create Primary Cost Elements Automatically | CSKA (KAINT) | In S/4HANA, cost elements are G/L account attributes — no separate master data maintenance |

### Cost Center Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Cost Center Categories | SPRO > Controlling > Cost Center Accounting > Master Data > Cost Centers > Define Cost Center Categories | CSKS / TKA05 | H (overhead), E (production), F (R&D), V (sales), L (logistics) — controls allowed activity types |
| Standard Hierarchy | SPRO > Controlling > Cost Center Accounting > Master Data > Cost Centers > Define Standard Hierarchy | SETHEADER | Mandatory tree structure; every cost center must belong to exactly one node |
| Cost Center Groups | SPRO > Controlling > Cost Center Accounting > Master Data > Cost Center Groups > Create Cost Center Groups | SETHEADER / SETNODE | Additional groupings beyond standard hierarchy for flexible reporting |
| Activity Types | SPRO > Controlling > Cost Center Accounting > Master Data > Activity Types > Define Activity Types | CSLA | 1 (manual), 2 (indirect), 3 (manual/indirect) — labor hours, machine hours, units of measure |
| Activity Type Groups | SPRO > Controlling > Cost Center Accounting > Master Data > Activity Types > Create Activity Type Groups | SETHEADER | Groups activity types for planning and allocation cycles |
| Statistical Key Figures | SPRO > Controlling > Cost Center Accounting > Master Data > Statistical Key Figures > Define Statistical Key Figures | TKA06 | Headcount, square meters, kilowatts — tracing factors for assessment and distribution |
| Planning Layout | SPRO > Controlling > Cost Center Accounting > Planning > Define Planning Layout | T811F | Column structure for manual cost center planning (KP06 transaction) |

### Internal Orders
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Order Types | SPRO > Controlling > Internal Orders > Order Master Data > Define Order Types | T003O | Overhead orders, investment orders, accrual orders — controls settlement, budgeting, and status management |
| Number Ranges for Orders | SPRO > Controlling > Internal Orders > Order Master Data > Define Number Ranges for Orders | NRIV (OR_ORDER) | Internal/external ranges per order type |
| Settlement Profile | SPRO > Controlling > Internal Orders > Actual Postings > Settlement > Create Settlement Profiles | TKA09 / T8NA | Controls settlement receivers (cost center, G/L, asset, WBS), allocation structure, and document types |
| Planning Profile | SPRO > Controlling > Internal Orders > Planning > Define Planning Profile | T811P | Controls which cost elements can be planned on internal orders and the planning layout |
| Budget Profile | SPRO > Controlling > Internal Orders > Budgeting and Availability Control > Define Budget Profile | T003O (BUDGET_PROFILE) | Enables budget management and availability control; tolerance percentages for warnings and errors |
| Status Management | SPRO > Controlling > Internal Orders > Order Master Data > Define Status Management | TJ30 | User status profiles for custom workflow (e.g., Approved, In Progress, Closed) |
| Allocation Structure | SPRO > Controlling > Internal Orders > Actual Postings > Settlement > Define Allocation Structure | TKAS | Maps source cost elements to settlement cost elements and receiver types |

### Overhead Cost Controlling (Allocations)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Assessment Cycle | SPRO > Controlling > Cost Center Accounting > Actual Postings > Period-End Closing > Assessment > Define Assessment | AUAK / COBRA | Allocates costs from sender to receiver cost centers using secondary cost elements and statistical key figures |
| Distribution Cycle | SPRO > Controlling > Cost Center Accounting > Actual Postings > Period-End Closing > Distribution > Define Distribution | AUAK / COBRA | Allocates original (primary) cost elements from sender to receiver; preserves cost element detail |
| Overhead Cost Rates | SPRO > Controlling > Cost Center Accounting > Actual Postings > Period-End Closing > Overhead Calculation > Define Overhead Cost Rates | T683V (KZ) | Percentage or quantity-based surcharges applied to production orders, internal orders, or WBS elements |
| Template Allocation | SPRO > Controlling > Cost Center Accounting > Actual Postings > Period-End Closing > Template Allocation > Define Template | CPT3 | Environment-based allocation using formulas and functions; replaces simple cycle-based allocation |
| Actual Activity Price Calculation | SPRO > Controlling > Cost Center Accounting > Actual Postings > Period-End Closing > Activity Allocation > Revaluation of Activity Allocation at Actual Prices | TKA01 (PRICE_IND) | Splits cost center costs by activity type and calculates actual rate per unit |

### Profitability Analysis (CO-PA)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Operating Concern | SPRO > Controlling > Profitability Analysis > Structures > Define Operating Concern | TKA01 / TKEB | Top-level CO-PA structure; defines characteristics and value fields |
| Characteristics | SPRO > Controlling > Profitability Analysis > Structures > Define Operating Concern > Maintain Characteristics | TKEB | Customer, product, region, sales channel — dimensions for profitability reporting |
| Value Fields | SPRO > Controlling > Profitability Analysis > Structures > Define Operating Concern > Maintain Value Fields | TKEV | Revenue, COGS, discounts, freight — monetary measures in costing-based CO-PA |
| Assignment of Value Fields | SPRO > Controlling > Profitability Analysis > Flows of Actual Values > Transfer of Billing Documents > Assign Value Fields | KE4I / COPA_MAP | Maps SD condition types to CO-PA value fields for automatic flow from billing |
| Top-Down Distribution | SPRO > Controlling > Profitability Analysis > Planning > Define Top-Down Distribution | KEVU | Allocates planned values from higher to lower characteristic combinations |
| Profitability Report | SPRO > Controlling > Profitability Analysis > Information System > Define Profitability Reports | T8RA | Report layout, row/column definitions, and characteristic drill-down paths |

## Critical Configuration Dependencies

1. **Chart of Accounts** must be identical across all company codes assigned to one controlling area (or use alternative chart of accounts)
2. **Fiscal Year Variant** must be the same for all company codes in one controlling area
3. **Controlling Area** must be created and assigned to Company Code before any CO master data or postings
4. **Primary Cost Elements** must correspond to G/L accounts in FI (in S/4HANA they are attributes of the G/L account)
5. **Standard Hierarchy** must be defined before cost centers can be created
6. **Activity Types** must be created and assigned to cost centers before activity allocation or production order costing
7. **Operating Concern** must be created and activated before CO-PA data can flow from SD billing
8. **Settlement Profile and Allocation Structure** must be configured before internal orders or production orders can be settled

## Common Configuration Mistakes

1. **Controlling area currency mismatch** — Setting the controlling area currency different from the company code currency without understanding the implications for parallel valuation and reporting.
2. **Missing secondary cost elements** — Forgetting to create secondary cost elements for assessment (category 42) or settlement (category 21), causing allocation cycle errors.
3. **Standard hierarchy incomplete** — Not assigning all cost centers to the standard hierarchy, or creating orphan nodes, which causes reporting gaps and period-end closing errors.
4. **CO-PA value field assignment gaps** — Not mapping all relevant SD condition types to CO-PA value fields, resulting in incomplete profitability data (e.g., freight or surcharges missing from margin analysis).
5. **Settlement rule errors** — Internal orders missing settlement rules or using wrong allocation structures, causing period-end settlement (KO88) to fail with "No settlement rule" or "No valid receiver" errors.
