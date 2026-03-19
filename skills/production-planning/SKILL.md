---
name: production-planning
description: Use when working with SAP Production Planning (PP) — BOM, routing, work centers, MRP, production orders, or shop floor control. Provides process flows, key tcodes, and SAP references.
---

# SAP Production Planning (PP) Reference

## Content Routing

| Topic | Section |
|---|---|
| Org structure, plant, MRP area | [PP Organizational Structure](#1-pp-organizational-structure) |
| BOM, routing, work center master data | [Master Data](#2-master-data) |
| MRP run, planning strategies, lot sizing | [Material Requirements Planning](#3-material-requirements-planning-mrp) |
| Order creation, scheduling, confirmation | [Production Orders](#4-production-orders) |
| Operations, backflushing, goods movement | [Shop Floor Control](#5-shop-floor-control) |
| Capacity evaluation and leveling | [Capacity Planning](#6-capacity-planning) |
| Order lists, stock overview, reports | [Reporting](#7-reporting) |
| Key tcodes quick-reference | [Key Transactions](#key-transactions-table) |
| S/4HANA-specific changes | [S/4HANA Changes](#s4hana-changes) |

---

## 1. PP Organizational Structure

Production Planning operates within these organizational levels:

- **Plant** -- Central organizational unit for production. Each plant has its own MRP run, BOM, and routing data.
- **Production Scheduling Profile** -- Controls scheduling parameters (lead-time scheduling, capacity planning profile) assigned at plant or order-type level.
- **MRP Area** -- Subdivides a plant for independent MRP runs. Can represent a storage location, subcontractor, or plant area. Configured in transaction `OMHA`.
- **Production Line / Work Center hierarchy** -- Groups work centers for capacity evaluation and scheduling.

Key config: Plant definition via `SPRO > Enterprise Structure > Definition > Logistics - General > Define Plant`; MRP Area via `SPRO > Production > MRP > MRP Areas`.

## 2. Master Data

### Bill of Materials (BOM)
| TCode | Description |
|---|---|
| CS01 | Create BOM |
| CS02 | Change BOM |
| CS03 | Display BOM |
| CS12 | Multi-level BOM explosion |

A BOM defines the list of components and quantities needed to manufacture a finished or semi-finished product. Key fields: BOM usage (1 = production), item category (L = stock, T = text), and validity dates.

### Routings
| TCode | Description |
|---|---|
| CA01 | Create routing |
| CA02 | Change routing |
| CA03 | Display routing |

Routings describe the sequence of operations and the work centers where they are performed. Each operation carries standard values (setup, machine, labor time) used for scheduling and costing.

### Work Centers
| TCode | Description |
|---|---|
| CR01 | Create work center |
| CR02 | Change work center |
| CR03 | Display work center |

Work centers represent machines, production lines, or labor pools. They hold capacity data, scheduling formulas, costing information, and are linked to cost centers.

### Production Versions
Defined in the material master (MRP 4 view), a production version links a specific BOM and routing combination to a plant. It controls which BOM alternative and routing group/counter the system selects during planning and order creation.

## 3. Material Requirements Planning (MRP)

### Planning Strategies
- **10 -- Make-to-Stock (MTS):** Production driven by forecast (planned independent requirements via MD61).
- **20 -- Make-to-Order (MTO):** Production triggered by individual sales orders.
- **40 -- Planning with Final Assembly:** Planned at finished-good level; assembly triggered by sales order.
- **70 -- Planning at Assembly Level:** Components planned independently.

### MRP Types
- **PD** -- MRP (standard, reacts to every requirement change).
- **VB** -- Reorder point planning (consumption-based).
- **VM** -- Forecast-based planning.
- **VV** -- Forecast with reorder point.

### Lot-Sizing Procedures
- **EX** -- Lot-for-lot (exact requirement quantity).
- **FX** -- Fixed lot size.
- **WB** -- Weekly lot size.
- **TB** -- Daily lot size.
- **DY** -- Dynamic lot sizing (period-based optimization).

### MRP Run
| TCode | Description |
|---|---|
| MD01 | Total MRP run (single plant, online) |
| MDBT | MRP run in background (batch job) |
| MD02 | Single-item MRP |
| MD04 | Stock/Requirements List -- primary tool for analyzing MRP results |
| MD05 | Individual MRP list |

The MRP run (MD01/MDBT) evaluates net requirements, explodes BOMs, creates planned orders, and generates purchase requisitions. Use MD04 to review supply-demand situation per material.

## 4. Production Orders

### Order Types
Defined in `SPRO > Production > Shop Floor Control > Master Data > Order`. Common types: **PP01** (standard production order), **PP02** (process order). Custom types for rework, refurbishment, etc.

### Order Lifecycle
1. **Create** (CO01) -- from planned order conversion or manual entry.
2. **Release** (CO02 with status REL) -- enables goods issue and confirmations.
3. **Print** (CO02 or mass via COHV) -- shop papers for the floor.
4. **Goods Issue** (MIGO / MB1A, mvt type 261) -- issue components to the order.
5. **Confirmation** (CO11N single / CO15 with GR) -- report actual quantities and activity times.
6. **Goods Receipt** (MIGO, mvt type 101) -- receive finished product into stock.
7. **Technical Complete** (CO02, status TECO) -- closes the order for planning; remaining reservations and capacity loads are removed.
8. **Business Close / Settlement** (CO02 / KO88) -- settles variances to CO-PA or cost center.

### Scheduling
- **Forward scheduling** -- calculates end date from a start date.
- **Backward scheduling** -- calculates start date from the required end date (default for MRP). Scheduling uses operation times from the routing and formulas from the work center.

## 5. Shop Floor Control

### Operations and Milestones
Each production order contains operations copied from the routing. Milestones can trigger automatic goods movements or confirmations at specific operations.

### Backflushing
When enabled on a component or operation, the system automatically posts goods issue (mvt 261) at confirmation time, eliminating manual staging. Configure on the material master (MRP 2 view: Backflush indicator) or at the operation level.

### Goods Movements
| Movement Type | Description |
|---|---|
| 261 | Goods issue to production order |
| 262 | Reversal of 261 |
| 101 | Goods receipt from production |
| 102 | Reversal of 101 |

## 6. Capacity Planning

| TCode | Description |
|---|---|
| CM01 | Capacity planning -- work center view |
| CM25 | Capacity planning -- order view (dispatching) |
| CM07 | Capacity leveling (tabular) |
| CM50 | Capacity evaluation (graphical) |

### Finite vs. Infinite Scheduling
- **Infinite scheduling** (default) -- schedules operations without checking available capacity. Overloads are visible in capacity evaluation but not resolved automatically.
- **Finite scheduling** -- respects available capacity and shifts operations to available time slots. Activated in the scheduling profile or via PP/DS in S/4HANA.

### Capacity Leveling
Use CM07 or the planning table to manually or semi-automatically reassign operations to resolve overloads. Dispatching strategies (e.g., earliest start, latest end) assist in automated leveling.

## 7. Reporting

| TCode | Purpose |
|---|---|
| COOIS | Order Information System -- flexible list of production orders with multiple selection criteria |
| MD04 | Stock/Requirements List -- real-time supply/demand per material |
| CO03 | Display production order (single order detail) |
| MF42N | Kanban board (for repetitive manufacturing) |
| KOB1 | Order-related cost line items |
| S076 | Capacity planning standard overview |

---

## Key Transactions Table

| TCode | Description | Area |
|---|---|---|
| CS01/02/03 | Create/Change/Display BOM | Master Data |
| CA01/02/03 | Create/Change/Display Routing | Master Data |
| CR01/02/03 | Create/Change/Display Work Center | Master Data |
| MD01 / MDBT | MRP Run (online / background) | MRP |
| MD02 | Single-item MRP | MRP |
| MD04 | Stock/Requirements List | MRP |
| MD61 | Create Planned Independent Requirements | Demand Mgmt |
| CO01 | Create Production Order | Production |
| CO02 | Change Production Order | Production |
| CO11N | Confirm Production Order (single) | Confirmation |
| CO15 | Confirm and auto-GR | Confirmation |
| MIGO | Goods Movement (issue/receipt) | Inventory |
| CM01 | Capacity Planning (work center) | Capacity |
| CM25 | Capacity Dispatching (order) | Capacity |
| COOIS | Order Information System | Reporting |
| COHV | Mass Processing of Orders | Utilities |
| KO88 | Order Settlement | Closing |

---

## S/4HANA Changes

### Embedded PP/DS
S/4HANA embeds the Advanced Planning & Scheduling (PP/DS) engine -- previously part of SAP APO -- directly into the core system. This enables finite scheduling, pegging, and detailed sequencing without a separate APO installation.

### Fiori Apps for Production
| Fiori App ID | App Name | Purpose |
|---|---|---|
| F0842A | Monitor Production Orders | Real-time order overview dashboard |
| F1984 | Schedule Production Orders | Interactive scheduling |
| F2723 | Manage Production Orders | Create, change, release orders |
| F3823 | MRP Cockpit | Review and process MRP results |
| F0396 | Display Stock/Requirements List | MD04 equivalent in Fiori |

### Other Enhancements
- **Predictive MRP** -- ML-assisted exception handling in the MRP cockpit.
- **Simplified data model** -- AUFK/AFKO/AFPO tables remain but reporting shifts to CDS views (e.g., `I_ProductionOrderTP`).

---

## SAP References

### SAP Help Portal
- [SAP S/4HANA Production Planning - Product Documentation](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f77f13c1daee42dabff3fec22906f1e2)
- [Material Requirements Planning (MRP) in SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c98ed3b4e6c241a3a1e2a76ec3899601)

### SAP Notes
- **SAP Note 2268041** -- PP/DS Integration in SAP S/4HANA: scope, limitations, and migration guidance.
- **SAP Note 2363505** -- MRP Live performance optimization and configuration recommendations for S/4HANA.
- **SAP Note 2593948** -- Fiori apps for manufacturing: launchpad configuration and required roles.
