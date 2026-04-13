---
name: pm
description: Use when working with SAP Plant Maintenance, equipment management, maintenance orders, notifications, preventive/corrective/predictive maintenance, functional locations, task lists, measuring points, or S/4HANA Asset Management.
---

# SAP Plant Maintenance (PM)

This skill enforces correct usage of SAP Plant Maintenance processes, ensuring that equipment hierarchies are maintained before work orders are created, notifications are never skipped for unplanned maintenance, and maintenance planning follows structured preventive strategies rather than reactive firefighting.

## Content Routing

| Topic | Section |
|-------|---------|
| Maintenance process types | Maintenance Process Types |
| Equipment and functional locations | Technical Object Hierarchy |
| Work order management | Work Order Management |
| Notifications | Maintenance Notifications |
| Preventive maintenance planning | Preventive Maintenance Planning |
| Key tables and data model | Key Tables and CDS Views |
| Integration points | Integration Points |
| S/4HANA changes | S/4HANA Asset Management |

## Iron Laws

1. **ALWAYS MAINTAIN EQUIPMENT HIERARCHY BEFORE WORK ORDERS.** A work order without a properly classified equipment record in a functional location hierarchy is an orphan. Orphan work orders cannot be analyzed for failure patterns, cost trends, or replacement decisions. No equipment master = no work order.
2. **NEVER SKIP NOTIFICATION FOR UNPLANNED MAINTENANCE.** Every corrective maintenance activity MUST begin with a notification (IW21). Skipping the notification means the failure is unrecorded — no failure analysis, no pattern detection, no basis for shifting to preventive maintenance.
3. **NEVER CREATE TASK LISTS WITHOUT OPERATION DURATIONS.** A task list (IA05) without realistic time estimates per operation produces meaningless capacity planning. Every operation needs planned duration based on historical actuals, not guesses.
4. **ALWAYS ASSIGN COST COLLECTORS BEFORE RELEASING WORK ORDERS.** A released work order without a settlement rule or cost center assignment creates unallocated maintenance costs. Finance discovers these during period-end close — too late to correct accurately.
5. **MEASURING POINTS DRIVE PREDICTIVE MAINTENANCE.** If equipment has measuring points defined but no measurement documents are recorded, the entire predictive maintenance strategy collapses. Enforce measurement recording discipline.

## Maintenance Process Types

### Corrective Maintenance (Breakdown)
Reactive response to equipment failure. Flow: Notification (IW21) -> Work Order (IW31) -> Planning -> Execution -> Confirmation (IW42) -> Technical Completion (IW32).

### Preventive Maintenance (Time-Based)
Scheduled maintenance at fixed intervals. Flow: Maintenance Plan (IP01) -> Scheduling (IP10) -> Auto-generated Work Orders -> Execution -> Confirmation. Uses single-cycle or strategy plans.

### Predictive Maintenance (Condition-Based)
Triggered by measurement readings exceeding thresholds. Flow: Measurement Document (IK11) -> Threshold breach triggers notification -> Work Order -> Execution. Requires measuring points (IK01) and counter-based plans.

### Refurbishment
Repair of repairable spares. Flow: Refurbishment Order (IW81) -> Remove defective part -> Repair -> Return to stock. Integrates with MM for goods movements.

## Technical Object Hierarchy

### Functional Locations (IL01/IL02/IL03)
Represent physical locations where equipment can be installed. Structure: Plant -> Building -> Floor -> Room -> Position. Table: IFLO (TPLNR = functional location number).

### Equipment Masters (IE01/IE02/IE03)
Individual physical assets tracked for maintenance history. Table: EQUI (EQUNR = equipment number). Equipment is installed at functional locations. Serial number integration with MM material masters.

### Bills of Material (IB01)
Equipment BOMs define spare parts for each piece of equipment. Critical for automatic spare parts reservations on work orders.

## Work Order Management

| Transaction | Purpose |
|-------------|---------|
| IW31 | Create maintenance order |
| IW32 | Change maintenance order |
| IW33 | Display maintenance order |
| IW38 | List of maintenance orders |
| IW39 | List of orders (multi-level) |
| IW42 | Overall confirmation of order |
| IW41 | Individual confirmation |

### Order Types
PM01 (Corrective), PM02 (Preventive), PM03 (Refurbishment), PM04 (Calibration). Custom order types inherit from these.

### Order Lifecycle
Created -> Released (triggers material reservations, capacity scheduling) -> Partially Confirmed -> Fully Confirmed -> Technically Completed (TECO) -> Business Completed.

## Maintenance Notifications

| Transaction | Purpose |
|-------------|---------|
| IW21 | Create notification |
| IW22 | Change notification |
| IW23 | Display notification |
| IW28 | List of notifications |
| IW29 | List of notifications (multi-level) |

### Notification Types
M1 (Malfunction Report), M2 (Maintenance Request), M3 (Activity Report). Notifications capture: damage details (catalog profile), cause codes, activities performed.

### Catalog Profiles
Configure code groups and codes for: Object Parts, Damage Types, Cause Codes, Activity Types. SPRO path: Plant Maintenance > Maintenance Processing > Catalogs.

## Preventive Maintenance Planning

### Maintenance Plans (IP01/IP02)
- **Single Cycle Plan:** Fixed interval (e.g., every 90 days).
- **Strategy Plan:** Multiple maintenance packages at different intervals (e.g., daily checks, weekly lubrication, monthly inspection, annual overhaul) using maintenance strategy (IP11).
- **Multiple Counter Plan:** Triggered by multiple measuring point readings.

### Key Planning Transactions
| Transaction | Purpose |
|-------------|---------|
| IP01 | Create maintenance plan |
| IP02 | Change maintenance plan |
| IP10 | Schedule maintenance plan (generate calls) |
| IP30 | Deadline monitoring (mass scheduling) |
| IP11 | Create maintenance strategy |
| IA05 | Create task list |

### Task Lists (IA01/IA05)
Define standard operations for maintenance activities. Types: Equipment task list (IA01), Functional location task list (IA11), General maintenance task list (IA05). Include operations, sub-operations, material components, and PRTs (Production Resources/Tools).

## Measuring Points and Counters

| Transaction | Purpose |
|-------------|---------|
| IK01 | Create measuring point |
| IK11 | Create measurement document |
| IK07 | List of measuring points |
| IK17 | List of measurement documents |

Measuring points: Temperature, pressure, vibration, operating hours. Counter overflow handling (IK08). Threshold values trigger maintenance notifications automatically.

## Key Tables and CDS Views

| Table | Description |
|-------|-------------|
| IFLO | Functional location master |
| IFLOT | Functional location text |
| EQUI | Equipment master |
| EQKT | Equipment text |
| AUFK | Order master data |
| AFKO | Order header (production/maintenance) |
| AFVC | Order operations |
| AFVV | Operation quantities/dates |
| QMEL | Notification header |
| QMFE | Notification items |
| QMUR | Notification causes |
| QMMA | Notification activities |
| MPOS | Maintenance plan items |
| MPLA | Maintenance plan header |
| IMRG | Measurement documents |
| IMPTT | Measuring point table |

### S/4HANA CDS Views
- I_MaintenanceOrder, I_MaintenanceNotification, I_Equipment, I_FunctionalLocation
- C_MaintOrderFS (Fiori analytical), C_MaintNotifOverviewPage

## Integration Points

| Integration | Description | Key Config |
|-------------|-------------|------------|
| PM-MM | Spare parts reservation on work orders, goods issue (MIGO 261), goods receipt for refurbishment | Material BOM on equipment, storage location config |
| PM-CO | Cost collection on maintenance orders, settlement to cost centers/assets | Settlement rules (KO8G), order type cost element assignment |
| PM-PP | Maintenance during production scheduling, production resource/tool integration | Capacity planning integration, order type category |
| PM-FI-AA | Asset linkage to equipment, capitalization of maintenance | Asset master linked to equipment via serial number |
| PM-PS | Maintenance projects using WBS elements | Network activities for complex overhauls |
| PM-QM | Quality notifications from maintenance findings | Notification type integration |

## S/4HANA Asset Management

Key changes in S/4HANA:
- **Fiori Apps:** Maintain Functional Location (F2828), Maintain Equipment (F2827), Manage Maintenance Orders, Manage Maintenance Notifications, Monitor Maintenance Costs.
- **Simplified Data Model:** AFKO/AFVC/AFVV still used but supplemented by CDS views.
- **Embedded Analytics:** Real-time maintenance KPIs — MTBF (Mean Time Between Failures), MTTR (Mean Time To Repair), maintenance cost ratios.
- **Mobile Maintenance:** SAP Asset Manager for offline-capable mobile work order execution.
- **Predictive Maintenance via SAP PdMS:** Integration with IoT sensor data for machine-learning-based failure prediction.

## Best Practices

1. **Structure functional locations to mirror physical reality** — not organizational structure. Locations are physical; cost centers are organizational.
2. **Standardize catalog profiles** across plants — inconsistent damage/cause codes make cross-plant failure analysis impossible.
3. **Use strategy plans over single-cycle plans** — strategy plans consolidate multiple maintenance activities, reducing equipment downtime.
4. **Record ALL measurement documents** — gaps in measurement history break condition-based maintenance triggers.
5. **Set up automatic goods movements** — configure backflushing for common consumables to reduce manual goods issue transactions.

## Anti-Patterns

- Creating work orders directly without notifications for breakdown maintenance (loses failure history)
- Using free-text descriptions instead of catalog codes for damage/cause (cannot analyze trends)
- Skipping technical completion (TECO) — leaves orders open indefinitely, distorts WIP reporting
- Maintaining equipment BOMs in MM instead of PM — disconnects spare parts from maintenance context
- Running IP10 without checking scheduling parameters — generates hundreds of unwanted call objects

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct transaction codes cited for the specific PM scenario
- [ ] Equipment hierarchy context confirmed (functional location -> equipment -> BOM)
- [ ] Appropriate maintenance process type identified (corrective/preventive/predictive)
- [ ] Integration impacts stated (MM for spare parts, CO for costs, PP if production-relevant)
- [ ] S/4HANA vs ECC differences noted where applicable
- [ ] Table names and CDS views cited are verified against the scenario

**Evidence required:** Specific transaction codes, table names, and configuration paths — not generic descriptions.

## Next Skill

After completing this skill, invoke:
- `mm` — When spare parts procurement or inventory management questions arise
- `co` — When maintenance cost analysis or settlement questions arise
- `pp` — When production-maintenance scheduling conflicts need resolution

## Cross-References

- `mm` — Spare parts management, goods movements for maintenance
- `co` — Maintenance cost collection, settlement, cost center reporting
- `pp` — Production scheduling integration, PRTs
- `qm` — Quality notifications from maintenance findings
- `testing-strategy` — Maintenance scenario test planning
