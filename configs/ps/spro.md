# SPRO Configuration: Project System (PS)

## Key Configuration Areas

### Project Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Project Profile | SPRO > Project System > Structures > Operative Structures > Work Breakdown Structure > Create Project Profile | TCPS1 | Controls project coding mask, status management, planning method, and organizational defaults |
| Project Coding Mask | SPRO > Project System > Structures > Operative Structures > Work Breakdown Structure > Project Coding Mask > Define Project Coding Mask | TCPS2 | Defines the format of WBS element IDs (e.g., P-xxxx-xxx-xx); max 24 characters |
| WBS Element Types | SPRO > Project System > Structures > Operative Structures > Work Breakdown Structure > Create Special Characters for WBS Elements | TCPS3 | Separator characters (hyphen, period) and edit masks for WBS numbering |
| Network Types | SPRO > Project System > Structures > Operative Structures > Network > Define Network Types | TCNV | Controls scheduling parameters, costing, settlement rules, and organizational default values |
| Activity Types (Network) | SPRO > Project System > Structures > Operative Structures > Network > Define Activity Types | T003P | Internally processed, externally processed, service, cost activity, general cost activity |
| Milestone Usage | SPRO > Project System > Structures > Operative Structures > Network > Maintain Milestones > Define Milestone Usage | T464 | Billing, results analysis, progress tracking — controls what milestones trigger |

### Budget Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Budget Profile | SPRO > Project System > Costs > Budget > Define Budget Profile | BPJA / TCBU | Controls budget structure (annual/overall), currency, distribution rules, and budget type |
| Availability Control | SPRO > Project System > Costs > Budget > Define Tolerance Limits for Availability Control | TCBP | Tolerance percentages for action (warning, error, email) when budget is exceeded |
| Budget Update Profile | SPRO > Project System > Costs > Budget > Define Update Profile | TCBU2 | Controls which value categories (commitment, actual, plan) are checked against budget |
| Release Procedure | SPRO > Project System > Costs > Budget > Define Release Procedure | TCBR | Controls whether budget is released top-down, bottom-up, or element-by-element |
| Supplement Procedure | SPRO > Project System > Costs > Budget > Define Supplement Procedure | TCBU3 | Rules for budget supplements (returns, transfers) and required authorization |

### Scheduling
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Scheduling Profile | SPRO > Project System > Dates > Scheduling > Define Scheduling Profile | T350 | Forward/backward scheduling, reduction strategy, float handling |
| Factory Calendar | SPRO > SAP NetWeaver > General Settings > Maintain Calendar | TFACS | Working days, holidays, plant-specific calendar — drives scheduling calculations |
| Scheduling Parameters | SPRO > Project System > Dates > Scheduling > Define Scheduling Parameters for Network Activities | T350A | Duration type (work days, calendar days), scheduling type, and constraint handling |
| Network Scheduling | SPRO > Project System > Dates > Scheduling > Define Parameters for Network Scheduling | TCNV (SCHED) | CPM calculation, float computation, critical path determination |
| Time Profile | SPRO > Project System > Dates > Define Time Profiles | T350T | Groups scheduling parameters for quick assignment to project profiles |
| Reduction Strategy | SPRO > Project System > Dates > Scheduling > Define Reduction Strategy | T399D | Strategy for compressing schedule when dates overlap (reduce float, reduce activity duration) |

### Revenue and Earnings
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Results Analysis Key | SPRO > Project System > Revenues and Earnings > Automatic and Periodic Allocations > Results Analysis > Create Results Analysis Keys | TKA08 | Assigns RA method to WBS/network; cost-based, revenue-based, or quantity-based |
| Results Analysis Version | SPRO > Project System > Revenues and Earnings > Automatic and Periodic Allocations > Results Analysis > Define Results Analysis Versions | TKAVS | Controls valuation method, cost of sales vs. total cost, and posting rules |
| Valuation Method for Results Analysis | SPRO > Project System > Revenues and Earnings > Automatic and Periodic Allocations > Results Analysis > Define Valuation Methods | TKA08 (EAMETH) | Revenue-based POC, cost-based POC, completed-contract — drives WIP and reserve calculations |
| Settlement Profile | SPRO > Project System > Revenues and Earnings > Automatic and Periodic Allocations > Settlement > Create Settlement Profile | TKA09 / TKAPS | Defines settlement receivers (G/L, cost center, asset, profitability segment), allocation structure, and document types |
| Billing Plan Profile | SPRO > Project System > Revenues and Earnings > Automatic and Periodic Allocations > Define Billing Plan Profile | TFPLA | Milestone billing, periodic billing, date-based billing plan configuration |

### Status Management and Authorization
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| System Status | SPRO > Project System > Structures > Operative Structures > Status Management > Define System Status | TJ02 | CRTD (created), REL (released), TECO (technically complete), CLSD (closed) — SAP-delivered |
| User Status Profile | SPRO > Project System > Structures > Operative Structures > Status Management > Define User Status Profile | TJ30 | Custom statuses (Approved, On Hold, Archived) with allowed/forbidden business transactions |
| Status Selection Profile | SPRO > Project System > Structures > Operative Structures > Status Management > Define Status Selection Profile | TJ31 | Initial status and status transition rules for project lifecycle |
| Authorization Profiles | SPRO > Project System > Structures > Authorization > Define Authorization Profiles | T499A | Object-based authorization for project creation, budget release, and status changes |
| Project Type | SPRO > Project System > Structures > Operative Structures > Work Breakdown Structure > Define Project Types | T499A | Grouping for reporting and authorization; drives default project profile |

### Integration Settings
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| PS-FI Integration | SPRO > Project System > Costs > Automatic and Periodic Allocations > Settlement > Maintain Allocation Structure | TKAS | Maps PS cost elements to FI G/L accounts at settlement |
| PS-MM Integration | SPRO > Project System > Material > Define Account Assignment for Network Activities | T163K | Account assignment category P (project) for purchase requisitions and purchase orders |
| PS-CO Integration | SPRO > Project System > Costs > Define Cost Planning Profile | T496A | Plan version, costing variant, and valuation settings for WBS-level planning |
| PS-HR Integration | SPRO > Project System > Dates > Capacity > Define Capacity Requirements | T350C | Links network activities to HR capacity planning and CATS time recording |
| PS-SD Integration | SPRO > Project System > Revenues and Earnings > Define SD Document Types for Billing | T003O / TVFK | Links billing plan to SD billing document types for customer project invoicing |

## Critical Configuration Dependencies

1. **Controlling Area** must be configured in CO before PS project profiles can reference it
2. **Project Coding Mask** must be defined before any WBS elements can be created — format cannot be changed after first project creation
3. **Project Profile** must be created before projects; it drives almost all default behavior
4. **Budget Profile** must be assigned to project profile before budget management is available
5. **Results Analysis Keys** must be assigned to WBS elements before period-end RA runs (transaction KKA2)
6. **Settlement Profile** must be configured with valid allocation structures before settlement (CJ88) can execute
7. **Network Types** must reference valid controlling area, plant, and MRP settings for scheduling and costing to work
8. **Billing Plan Profile** must be linked to SD billing types before milestone billing generates SD billing documents

## Common Configuration Mistakes

1. **Project coding mask too restrictive** — Defining a mask that is too short or has insufficient levels, then discovering mid-project that the hierarchy needs more depth. The mask cannot be changed after projects exist.
2. **Results Analysis configuration incomplete** — Missing RA version, valuation method, or posting rules, causing period-end WIP/reserve calculations to fail or produce incorrect financial results.
3. **Budget availability control too strict** — Setting tolerance limits that block all postings when budget is only slightly exceeded, creating operational bottlenecks during project execution.
4. **Settlement rule missing or incomplete** — WBS elements without settlement rules or with rules that do not cover all cost element groups, causing CJ88 settlement to post partial amounts or fail.
5. **Network scheduling without factory calendar** — Not assigning a valid factory calendar to the plant or scheduling profile, causing CPM calculations to schedule activities on weekends and holidays.
