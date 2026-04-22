---
name: ewm
description: Use when working with SAP Extended Warehouse Management — warehouse structure design, inbound/outbound processes, wave management, task and resource management, slotting, labor management, yard management, RF framework, VAS, or embedded EWM in S/4HANA.
---

# SAP Extended Warehouse Management (EWM)

This skill enforces correct EWM implementation practices, ensuring that warehouse structure is designed before process configuration begins, RF device testing includes actual hardware validation, and warehouse processes are mapped to physical reality — not configured from templates disconnected from the warehouse floor.

## Content Routing

| Topic | Section |
|-------|---------|
| Warehouse structure design | Warehouse Structure |
| Inbound/outbound processes | Inbound Process / Outbound Process |
| Wave management | Wave Management |
| Task and resource management | Task and Resource Management |
| RF framework | RF Framework |
| VAS and deconsolidation | Value-Added Services |
| Yard management | Yard Management |
| Embedded EWM | Embedded EWM in S/4HANA |
| Integration points | Integration Points |

## Iron Laws

1. **ALWAYS DESIGN WAREHOUSE STRUCTURE BEFORE PROCESS CONFIGURATION.** Storage types, sections, bins, activity areas, and work centers define the physical-to-logical mapping. Process configuration (putaway, picking, goods issue) depends entirely on this structure. Configuring processes without finalized structure means rework.
2. **NEVER SKIP RF DEVICE TESTING WITH ACTUAL HARDWARE.** RF transactions behave differently on handheld scanners than on desktop emulators. Screen rendering, barcode scanning speed, network latency, and ergonomics MUST be validated on the actual devices warehouse workers will use. Emulator-only testing is not testing.
3. **NEVER CONFIGURE PUTAWAY STRATEGIES WITHOUT WAREHOUSE WALK-THROUGH.** Putaway rules that look correct in SPRO fail when the warehouse has physical constraints — aisle widths, weight limits, temperature zones, forklift turning radius. Walk the floor before configuring.
4. **ALWAYS MAP PROCESS STEPS TO WAREHOUSE DOCUMENT FLOW.** EWM documents (inbound delivery -> warehouse task -> warehouse order -> posting change) must be understood end-to-end. Configuring one step without understanding the full document flow creates process gaps.
5. **NEVER GO LIVE WITHOUT CYCLE COUNT STRATEGY.** Inventory accuracy degrades from day one without systematic cycle counting. Configure cycle count strategy and bin status management before go-live, not after the first stock discrepancy.

## Warehouse Structure

### Hierarchy
```
Warehouse Number (top level — e.g., WH01)
└── Storage Type (logical area — e.g., High Rack, Floor, Shipping)
    └── Storage Section (subdivision — e.g., Fast Movers, Slow Movers)
        └── Storage Bin (physical location — e.g., 01-01-01)
```

### Key Structure Elements
| Element | Description | Config Path |
|---------|-------------|-------------|
| Warehouse Number | Top-level organizational unit | EWM > Master Data > Warehouse Structure |
| Storage Type | Logical division (high rack, block, floor, staging) | EWM > Master Data > Define Storage Types |
| Storage Section | Sub-division within storage type (temperature, velocity) | EWM > Master Data > Define Storage Sections |
| Storage Bin | Physical location with capacity, weight, dimension limits | /SCWM/BIN or Fiori: Manage Storage Bins |
| Activity Area | Groups bins for wave/task management | EWM > Master Data > Define Activity Areas |
| Work Center | Physical work area for packing, VAS, staging | EWM > Master Data > Define Work Centers |
| Aisle | Physical aisle for resource optimization | Part of bin coordinate definition |

### Bin Coordinate System
Standard format: Aisle-Rack-Level (e.g., 01-05-03 = Aisle 1, Rack 5, Level 3). Configure in: /SCWM/BIN. Supports X/Y/Z coordinates for optimized picking routes.

## Inbound Process

### Document Flow
```
ERP Inbound Delivery (VL31N/VL32N)
  → EWM Inbound Delivery Notification
    → Goods Receipt (physical receiving)
      → Putaway Warehouse Task (system-directed or manual)
        → Warehouse Order (groups tasks for execution)
          → Task Confirmation (RF or Fiori)
            → Posting Change (inventory update)
```

### Putaway Strategies
| Strategy | Description | Use Case |
|----------|-------------|----------|
| Fixed bin | Material always goes to assigned bin | High-volume, fast-moving items |
| Next empty bin | System finds nearest empty bin | General purpose |
| Addition to stock | Putaway to bin already containing same material | Consolidation |
| Bulk/pick split | Split between bulk storage and forward pick area | Replenishment model |
| Storage section determination | Rule-based section assignment | Temperature, hazmat, velocity |

### Key Transactions
| Transaction | Purpose |
|-------------|---------|
| /SCWM/PRDI | Process inbound delivery |
| /SCWM/GR | Goods receipt |
| /SCWM/WHO | Warehouse order monitor |
| /SCWM/MON | Warehouse management monitor |

## Outbound Process

### Document Flow
```
ERP Outbound Delivery (VL01N/VL02N)
  → EWM Outbound Delivery Order
    → Wave Assignment (manual or auto)
      → Warehouse Task Creation (picking)
        → Warehouse Order (groups tasks by route/resource)
          → Pick Confirmation (RF scan)
            → Packing (if required)
              → Goods Issue (staging and loading)
                → Posting Change → POD (Proof of Delivery)
```

### Picking Strategies
| Strategy | Use Case |
|----------|----------|
| FIFO (First In First Out) | Perishables, shelf-life managed products |
| LIFO (Last In First Out) | Non-perishable bulk items |
| FEFO (First Expired First Out) | Pharma, food — batch-managed with expiry |
| Optimized picking | System-optimized route through warehouse |
| Pick by voice | Voice-directed picking integration |

## Wave Management

Waves group outbound delivery orders for coordinated processing.

### Wave Types
- **Manual wave:** User creates and assigns deliveries
- **Automatic wave:** Rule-based assignment by route, shipping point, priority, wave cut-off time
- **Cross-docking wave:** Direct flow-through without putaway

### Wave Processing Steps
1. Wave creation (manual or automatic) — /SCWM/WAVE
2. Delivery assignment to wave
3. Wave release — triggers warehouse task creation
4. Warehouse order creation — groups tasks for execution
5. Execution (picking, packing, staging)
6. Wave completion

## Task and Resource Management

### Warehouse Tasks
Created automatically during putaway/picking. Types: Putaway, Pick, Replenishment, Internal movement, Posting change.

### Warehouse Orders
Group multiple warehouse tasks for assignment to a resource. Sorting criteria: Activity area, aisle optimization, priority, task type.

### Resource Management
| Concept | Description |
|---------|-------------|
| Resource | Physical worker or equipment (forklift, pallet jack) |
| Resource Type | Category (picker, forklift driver, packer) |
| Queue | Task assignment pool for resource types |
| Capacity | Tasks per resource per time period |

### Labor Management
Optional module for productivity tracking. Measures: Planned vs. actual task times, worker productivity rates, engineered labor standards.

## RF Framework

### RF Transaction Design
- Screen-based UI for handheld scanners (Telnet or browser-based)
- Navigation: Menu -> Function -> Verification scan -> Confirmation
- Key RF transactions: Putaway, Pick, Count, Goods Receipt, Replenishment

### Key RF Configuration
| Transaction | Purpose |
|-------------|---------|
| /SCWM/RFUI | RF UI configuration |
| /SCWM/RF | RF environment setup |

### RF Best Practices
1. **Minimize keystrokes** — scan-driven workflow, not manual entry
2. **Immediate error feedback** — validation on every scan step
3. **Offline capability** — handle network interruptions gracefully
4. **Test on target devices** — screen size, resolution, scan speed
5. **User-specific profiles** — language, default warehouse, activity area

## Value-Added Services

VAS processing for kitting, labeling, assembly, quality checks during warehouse processing.

### VAS Order Types
- **Kitting:** Combine multiple materials into a kit
- **Labeling:** Customer-specific labeling requirements
- **Assembly:** Light assembly operations in warehouse
- **Quality inspection:** Warehouse-level quality checks

### Configuration
Work center assignment, VAS activity types, VAS order processing (/SCWM/VAS). Integration with work center capacity planning.

## Yard Management

Physical yard (truck dock) management integrated with warehouse inbound/outbound.

### Key Concepts
- **Yard:** Physical area with defined parking spots and dock doors
- **Vehicle:** Truck/trailer tracked in yard with check-in/check-out
- **Dock door assignment:** Link dock doors to storage types for directed loading
- **Yard task:** Move vehicle between yard spots, assign to dock

### Transactions
| Transaction | Purpose |
|-------------|---------|
| /SCWM/YM | Yard management cockpit |
| /SCWM/YDOOR | Dock door management |

## Embedded EWM in S/4HANA

### Deployment Options
| Option | Description |
|--------|-------------|
| Embedded EWM | EWM runs within S/4HANA — same database, simplified integration |
| Decentralized EWM | Separate EWM system connected via RFC/CIF — independent scaling |

### Embedded EWM Key Differences
- No separate warehouse number assignment needed (uses plant)
- Simplified integration — no qRFC/CIF middleware
- Shared material master — no product master replication
- Same Fiori launchpad for logistics and warehouse users
- Limited to one warehouse per plant (in standard)

### Fiori Apps for EWM
| App ID | App Name |
|--------|----------|
| F1985 | Manage Warehouse Tasks |
| F2178 | Monitor Warehouse |
| F5350 | Manage Stock in Warehouse |
| F5570 | Process Inbound Delivery |
| F5572 | Process Outbound Delivery |

## Integration Points

| Integration | Description |
|-------------|-------------|
| EWM-MM | Goods receipt/issue posting, stock transfers, material master sync |
| EWM-SD | Outbound delivery processing, picking confirmation, PGI |
| EWM-PP | Production supply (staging), kanban integration |
| EWM-QM | Quality inspection during inbound, sampling |
| EWM-TM | Freight order to delivery linkage, dock scheduling |
| EWM-MES | Manufacturing execution system integration for production supply |

## Key Tables

| Table | Description |
|-------|-------------|
| /SCWM/LAGP | Storage bin master |
| /SCWM/QUANT | Warehouse stock (quant level) |
| /SCWM/ORDIM_O | Warehouse task (open) |
| /SCWM/ORDIM_C | Warehouse task (confirmed) |
| /SCWM/WHO | Warehouse order header |
| /SCWM/AQUA | Available stock |
| /SCWM/T_DOOR | Dock door master |

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Warehouse structure context confirmed (warehouse number, storage types, bin configuration)
- [ ] Process flow mapped end-to-end (document flow from ERP trigger to posting change)
- [ ] Correct strategy identified (putaway/picking strategy with business justification)
- [ ] RF requirements addressed where applicable (device type, screen design, offline handling)
- [ ] Integration impacts stated (which ERP modules are affected by the EWM process)
- [ ] Embedded vs. decentralized deployment context clarified

**Evidence required:** Specific EWM transactions, storage type configurations, strategy names, and document flow steps — not generic warehouse descriptions.

## Next Skill

After completing this skill, invoke:
- `mm` — When material management or procurement questions arise from warehouse processes
- `sd` — When outbound delivery or shipping integration is the focus
- `tm` — When transportation planning connects to warehouse shipping

## Cross-References

- `mm` — Goods receipt/issue, stock transfers, material master
- `sd` — Outbound delivery processing, shipping point configuration
- `pp` — Production supply, kanban, staging areas
- `tm` — Transportation planning, freight order linkage
- `qm` — Quality inspection during warehouse receipt
