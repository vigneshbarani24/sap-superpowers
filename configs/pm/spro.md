# SPRO Configuration: Plant Maintenance (PM)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Maintenance Plant | SPRO > Enterprise Structure > Definition > Plant Maintenance > Define Maintenance Plant | T001W (INGRP) | Plant where maintenance work is performed; shares definition with logistics plant |
| Maintenance Planning Plant | SPRO > Enterprise Structure > Assignment > Plant Maintenance > Assign Maintenance Planning Plant to Maintenance Plant | T001W (IWERK) | Plant responsible for planning maintenance for one or more maintenance plants |
| Maintenance Work Centers | SPRO > Plant Maintenance > Maintenance Processing > Basic Settings > Work Centers > Define Work Center Categories | T429 | PM work center categories (e.g., 0008 for maintenance); links to cost center and capacity |
| Planner Group | SPRO > Plant Maintenance > Maintenance Processing > Basic Settings > General > Define Planner Groups | T024I | Groups maintenance planners; used for authorization and work order selection |
| Catalog Profile | SPRO > Plant Maintenance > Maintenance Processing > Basic Settings > Catalogs > Define Catalog Profile | T356 | Links damage, cause, activity, and object part catalogs to notification types |

### Technical Objects
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Equipment Categories | SPRO > Plant Maintenance > Technical Objects > Equipment > Define Equipment Categories | T370 | M (machine), P (production resource), V (vehicle), T (test equipment) — controls fields and views |
| Functional Location Categories | SPRO > Plant Maintenance > Technical Objects > Functional Locations > Define Structure Indicators | T370F | Hierarchical structure indicator and label format (e.g., PLANT-AREA-LINE-STATION) |
| Object Types | SPRO > Plant Maintenance > Technical Objects > General > Define Object Types | T370 (EQTYP) | Classifies equipment for reporting and authorization |
| ABC Indicator | SPRO > Plant Maintenance > Technical Objects > General > Define ABC Indicators | T370A | Criticality ranking (A = critical, B = important, C = standard) for maintenance priority |
| Measuring Points and Counters | SPRO > Plant Maintenance > Technical Objects > Measuring Points and Counters > Define Measuring Point Categories | T370M | Temperature, pressure, operating hours — basis for condition-based maintenance |
| Object Information Key | SPRO > Plant Maintenance > Technical Objects > General > Define Object Information Keys | T370 | Controls which info fields appear on technical object master records |
| Serial Number Profile | SPRO > Plant Maintenance > Technical Objects > Equipment > Define Serial Number Profiles | T370S | Links serial number management to equipment category; controls serialization behavior |

### Maintenance Notifications
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Notification Types | SPRO > Plant Maintenance > Maintenance Processing > Notifications > Notification Types > Define Notification Types | T353 | M1 (malfunction), M2 (maintenance request), M3 (activity report) — controls screen layout and workflow |
| Catalog Types | SPRO > Plant Maintenance > Maintenance Processing > Notifications > Notification Types > Define Catalog Types | T356I | B (damage codes), C (cause codes), 5 (activity codes), A (object part codes) |
| Code Groups and Codes | SPRO > Plant Maintenance > Maintenance Processing > Notifications > Notification Types > Define Code Groups and Codes | QPCT / QPCD | Hierarchical coding for damage types, causes, and repair activities |
| Response and Completion Monitoring | SPRO > Plant Maintenance > Maintenance Processing > Notifications > Response Monitoring > Define Priority Types | T356P | Links notification priority to response time and escalation profiles |
| Partner Determination | SPRO > Plant Maintenance > Maintenance Processing > Notifications > Partner Determination > Define Partner Determination Procedure | TPAR | Responsible person, coordinator, reported by — roles on notifications |

### Maintenance Orders
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Order Types | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Functions and Settings for Order Types > Define Order Types | T003O | PM01 (corrective), PM02 (preventive), PM03 (refurbishment), PM04 (calibration) |
| Number Ranges for Orders | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Functions and Settings for Order Types > Define Number Ranges | NRIV (OR_ORDER) | Internal number ranges per PM order type |
| Settlement Profile | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Settlement > Define Settlement Profile | T8NA | Settlement receivers (cost center, asset, internal order), allocation structure, and PA transfer |
| Maintenance Activity Types | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > General Data > Define Maintenance Activity Types | T353 (ILART) | 001 (inspection), 002 (repair), 003 (overhaul) — groups work for reporting and analysis |
| Scheduling Parameters | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Scheduling > Define Scheduling Parameters | T399X | Scheduling type, capacity requirements, dispatching profile |
| Goods Movement Settings | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Goods Movements > Define Movement Types | T156 | 261 (GI to PM order), 262 (reversal), 101 (return to stock) — component consumption |
| Commitment Management | SPRO > Plant Maintenance > Maintenance Processing > Maintenance Orders > Commitment Management > Activate Commitment Management | TKA01 | Tracks commitments (PR/PO) against PM order budget for cost control |

### Preventive Maintenance
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Maintenance Plan Categories | SPRO > Plant Maintenance > Preventive Maintenance > Maintenance Planning > Define Maintenance Plan Categories | T399I | Time-based, performance-based (counter), multiple counter — controls scheduling logic |
| Maintenance Plan Types | SPRO > Plant Maintenance > Preventive Maintenance > Maintenance Planning > Define Maintenance Plan Types | T399I (PTYPE) | Single-cycle, strategy plan, multiple counter plan — determines scheduling behavior |
| Maintenance Strategies | SPRO > Plant Maintenance > Preventive Maintenance > Maintenance Planning > Define Maintenance Strategies | T390 | Packages of maintenance cycles (e.g., 3-month, 6-month, annual) with call objects |
| Scheduling Indicators | SPRO > Plant Maintenance > Preventive Maintenance > Maintenance Planning > Define Scheduling Indicators | T390S | Time-based (calendar), performance-based (counter), factory calendar-based |
| Call Objects | SPRO > Plant Maintenance > Preventive Maintenance > Maintenance Planning > Define Call Objects | T399I | Maintenance order, service entry sheet, notification — what the plan creates when due |
| Task List Types | SPRO > Plant Maintenance > Preventive Maintenance > Task Lists > Define Task List Types | PLKO (PLNTY) | A (equipment task list), T (functional location task list), S (general maintenance task list) |

## Critical Configuration Dependencies

1. **Maintenance Plant** must be defined and assigned to company code before any PM master data creation
2. **Functional Location structure indicator** must be defined before functional location hierarchy can be built — structure format is difficult to change later
3. **Catalog Profiles** must be configured before notifications can capture damage/cause/activity codes
4. **Work Centers** must be assigned to cost centers in CO before PM orders can calculate costs
5. **Order Types** must reference valid settlement profiles before period-end settlement works
6. **Maintenance Strategies** must be defined before strategy-based maintenance plans can be created
7. **Planner Groups** must be set up before maintenance plans and orders can be assigned to planners
8. **Measuring Point categories** must exist before counters can be attached to equipment for condition-based maintenance

## Common Configuration Mistakes

1. **Functional location structure too rigid** — Defining a structure indicator with too few levels or a mask that does not accommodate future plant expansions, requiring re-creation of the entire FL hierarchy.
2. **Catalog profile not assigned to notification type** — Creating custom notification types without linking the catalog profile, so users cannot enter damage codes, cause codes, or activity codes.
3. **Maintenance strategy cycle sets incorrect** — Defining maintenance packages that overlap or skip intervals, causing preventive maintenance calls to be generated at wrong intervals or missed entirely.
4. **Missing settlement rules on PM orders** — Not configuring default settlement receivers in the order type, requiring manual settlement rule entry on every order and causing CJ88/KO88 failures at period-end.
5. **Equipment not assigned to functional location** — Creating equipment records without FL assignment, losing the hierarchical maintenance history and making it impossible to analyze failure patterns by location.
