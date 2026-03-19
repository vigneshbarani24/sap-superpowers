---
name: plant-maintenance
description: Use when working with SAP Plant Maintenance (PM) — equipment, functional locations, maintenance planning, work orders, or preventive maintenance. Provides process flows, key tcodes, and SAP references.
---

# SAP Plant Maintenance (PM) Reference Skill

## Content Routing

| Topic                              | Section                            |
|------------------------------------|------------------------------------|
| Org structure, plants, work centers | PM Organizational Structure       |
| Equipment, functional locations    | Technical Objects                  |
| Task lists, maintenance plans      | Maintenance Planning              |
| Work orders, confirmations         | Work Order Management             |
| Notification types, catalogs       | Notifications                     |
| Time/performance/condition-based   | Preventive Maintenance            |
| PM reports and analytics           | Reporting                         |
| Key transactions                   | Key Transaction Codes             |
| S/4HANA and Fiori                  | S/4HANA Changes                   |
| Official docs and notes            | SAP Help Portal Links & SAP Notes |

---

## 1. PM Organizational Structure

### Maintenance Plant
- The plant where the technical object is physically installed.
- Controls which work center and planning group are available.

### Planning Plant
- The plant responsible for planning and scheduling maintenance work.
- Can differ from maintenance plant in central-planning scenarios.
- Determines MRP area for spare-part procurement on work orders.

### Maintenance Work Centers (IR01 / IR02 / IR03)
- Represent teams, workshops, or crews that execute maintenance tasks.
- Carry capacity data, costing info, and scheduling parameters.
- Linked to a cost center for settlement of maintenance costs.

---

## 2. Technical Objects

### Equipment (IE01 / IE02 / IE03)
- Individual physical assets tracked with a unique equipment number.
- Fields: category, manufacturer, model, serial number, construction date, ABC indicator.
- Can be installed at a functional location or stand-alone.

### Functional Locations (IL01 / IL02 / IL03)
- Hierarchical representation of where maintenance is performed (e.g., Building > Floor > Line).
- Structure indicator defines the hierarchy format (e.g., `AAA-BB-CCC`).
- Equipment installed into functional locations via **IE02** or **IL02**.
- Inherits organizational data downward (plant, cost center, business area).

### Serial Numbers (IQ01 / IQ02 / IQ03)
- Link a material number to an equipment master via serialization profile.
- Enable traceability of individual items through goods movements and work orders.

### BOM for Equipment / Functional Location (IB01)
- Lists spare parts and assemblies required for a technical object.
- Referenced automatically when creating work orders for component planning.

---

## 3. Maintenance Planning

### Maintenance Plans (IP01 / IP02 / IP03)
- Define **what** should be done and **when** it should recur.
- Types: single-cycle plan (one interval), strategy plan (multiple cycles).
- Scheduling parameters: cycle length, offset, call horizon, scheduling period, tolerance.

### Task Lists (IA01 / IA02 / IA03)
- Standard sequences of maintenance operations (like a routing in PP).
- Types: equipment task list, functional-location task list, general task list.
- Each operation carries a work center, duration, planned work, and component list.

### Scheduling & Call Objects (IP10)
- **IP10** schedules maintenance plans (deadline monitoring).
- Generates **call objects** (orders or notifications) when due date falls within call horizon.
- Shift factors and completion-requirement flags control next-date calculation.

---

## 4. Work Order Management

### Order Types (IW31 / IW32 / IW33)
- Common types: **PM01** (corrective), **PM02** (preventive), **PM03** (refurbishment).
- Each type controls number range, settlement rule, planning profile, and status management.

### Planning & Scheduling
- Assign operations, work centers, durations, and planned costs.
- Add components (from BOM or manually); create reservations or purchase requisitions.
- **Basic dates**: manually entered. **Scheduled dates**: calculated from work center capacity.
- Use **IW38** (order list) with layout variants for dispatching views.

### Execution
- Goods issue of spare parts posts against the order (movement type 261).
- External services confirmed via service entry sheets (ML81N).

### Confirmation (IW41 / IW42 / IW45)
- **IW41** -- single-order time confirmation. **IW42** -- collective confirmation.
- **IW45** -- overall completion confirmation.
- Triggers actual cost postings; sets status PCNF (partial) or CNF (confirmed).

---

## 5. Notifications

### Notification Types (IW21 / IW22 / IW23)
- **M1** -- Malfunction report: unplanned breakdown or defect.
- **M2** -- Activity report: record completed ad-hoc work.
- **M3** -- Maintenance request: request from operations for planned work.

### Catalogs
- Catalog profiles group code groups and codes for structured defect recording.
- Types: **B** (damage), **C** (cause), **5** (activity), **A** (object part).
- Configured in **QS41** and assigned via notification type customizing.

### Status Flow
- Outstanding > In Process > Order Created > Completed.
- Partner determination assigns reported-by, person responsible, and coordinator.

---

## 6. Preventive Maintenance

### Time-Based
- Fixed calendar intervals (e.g., every 6 months). Ideal for regulatory inspections.

### Performance-Based
- Triggered by counter readings (e.g., every 10,000 hours). Counters via **IK01**; readings via **IK11**.

### Condition-Based
- Triggered when measurement readings cross a threshold (e.g., vibration > 5 mm/s).
- Measuring points with upper/lower limits auto-generate notifications or orders.

### Maintenance Strategies (IP11)
- Group multiple cycles (e.g., 3-month minor service, 12-month major overhaul).
- Scheduling indicator controls reaction to early or late completion.

---

## 7. Reporting

| TCode   | Description                                        |
|---------|----------------------------------------------------|
| **IW39** | Order list -- filter by date, status, order type   |
| **IW69** | Notification list -- breakdown analysis            |
| **IW28** | Notification list by notification type             |
| **IW49** | Confirmation list for completed work               |
| **MCJB** | PM Information System -- MTBF / MTTR analysis      |
| **MCI5** | Breakdown analysis by equipment / func. location   |
| **IP24** | Maintenance plan scheduling overview               |

PMIS (Plant Maintenance Information System) provides LIS-based analytics via structures S061 (object), S062 (breakdown), S063 (order). Access via **MCJB**.

---

## Key Transaction Codes

| TCode | Purpose                          | TCode | Purpose                          |
|-------|----------------------------------|-------|----------------------------------|
| IE01  | Create equipment                 | IW21  | Create PM notification           |
| IL01  | Create functional location       | IW31  | Create PM order                  |
| IH01  | Display structure list           | IW38  | Change/display order list        |
| IA01  | Create maintenance task list     | IW41  | Enter time confirmation          |
| IP01  | Create maintenance plan          | IK01  | Create measuring point           |
| IP10  | Schedule maintenance plan        | IR01  | Create work center (PM)          |
| IP11  | Create maintenance strategy      | IB01  | Create maintenance BOM           |

---

## S/4HANA Changes

### Fiori Apps for Plant Maintenance
- **Maintain Equipment (F2672)** -- replaces IE02.
- **Maintain Functional Location (F2707)** -- replaces IL02.
- **Monitor Maintenance Plans (F2645)** -- replaces IP24 with graphical timeline.
- **Manage Maintenance Notifications (F1570)** -- unified notification worklist.
- **Manage Maintenance Orders (F1571)** -- order planning, scheduling, and release.
- **Confirm Maintenance Orders (F3929)** -- mobile-friendly confirmation.

### Integration with Asset Management (FI-AA)
- Equipment linked directly to a fixed asset; order settlement posts to the asset for capitalization.
- Fiori **Asset Viewer** enables cross-module drill-down from asset to maintenance history.

### Technical Improvements
- **Simplified data model**: merged AFIH/AFKO order tables for faster reporting.
- **Embedded analytics**: CDS views `I_MaintOrder` and `I_MaintNotification` for real-time reporting.
- **SAP Intelligent Asset Management**: optional add-on for predictive maintenance and digital twin.

---

## SAP Help Portal Links

1. **SAP S/4HANA Plant Maintenance**: <https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/latest/plant-maintenance>
2. **Maintenance Processing Overview**: <https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/latest/maintenance-processing>

---

## Relevant SAP Notes

| SAP Note    | Title                                            | Relevance                                                  |
|-------------|--------------------------------------------------|------------------------------------------------------------|
| **2319153** | S/4HANA PM -- Simplification List                | Functional changes, deprecated tcodes, new Fiori apps.     |
| **1955066** | PM/CS Order: Collective Note for Corrections     | Key corrections for order processing; check before reporting bugs. |
| **2741980** | Maintenance Plan Scheduling -- Known Issues       | Scheduling anomalies, call-object generation fixes.        |
| **3089075** | Fiori: Manage Maintenance Orders -- Corrections  | Bug fixes for the Fiori maintenance order app.             |

---

## Quick Decision Guide

```
Unplanned failure? --> Notification IW21 (M1) --> Urgent? Order IW31 : Queue in backlog
Planned recurring? --> Calendar-based: IP01 | Counter-based: IP01+IK01 | Condition: IK01 w/ limits
```
