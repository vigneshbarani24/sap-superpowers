# SPRO Configuration: Warehouse Management (WM)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Warehouse Number | SPRO > Enterprise Structure > Definition > Logistics Execution > Define, copy, delete Warehouse Number | T300 | Top-level WM org unit; a physical warehouse complex with storage types |
| Assign Warehouse Number to Plant/Storage Location | SPRO > Enterprise Structure > Assignment > Logistics Execution > Assign Warehouse Number to Plant/Storage Location | T320 | Links WM warehouse to MM plant and storage location for inventory integration |
| Storage Type | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Storage Type | T301 | Functional area within warehouse (high rack, block storage, goods receipt zone, picking area, staging) |
| Storage Section | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Storage Sections | T301S | Subdivision of storage type by material characteristics (fast-moving, slow-moving, hazardous) |
| Storage Bin Type | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Storage Bin Types | T340D | Physical dimensions and capacity of bins (pallet, half-pallet, small bin) |
| Quant Management | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Quant Management | T300 (QUANT) | Controls whether quantities are tracked at bin level with batch, stock category, and special stock |

### Movement Types and Transfer Orders
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| WM Movement Types | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Define Movement Types | T333 | WM-specific movement types; mapped from MM movement types (e.g., MM 101 triggers WM 101) |
| Reference Movement Types | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Define Reference Movement Types | T333R | Links MM movement types to WM movement types for automatic transfer order creation |
| Transfer Order Types | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Define Transfer Order Types | T333T | Controls print, confirmation requirement, and destination storage type for TO creation |
| 2-Step Movement | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Define 2-Step Movements | T333 (2STEP) | Interim storage type for staged movements (pick-to-staging, staging-to-GI area) |
| Automatic Transfer Order Creation | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Automatic TO Creation > Define Settings | T340D (AUTO_TO) | Background job triggers for auto-TO from transfer requirements (delivery, posting change) |
| Confirmation Requirements | SPRO > Logistics Execution > Warehouse Management > Activities > Transfers > Define Confirmation Requirements | T333 (CONFIRM) | Mandatory or optional confirmation; partial confirmation handling and difference posting |

### Putaway Strategies
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Putaway Strategy | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Putaway Strategies | T301 (LGPLA_STRAT) | A (next empty bin), B (open storage), C (addition to existing stock), F (fixed bin), I (bulk storage), P (pallet storage) |
| Storage Type Search | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Storage Type Search | T310 | Sequence of storage types to search for putaway; fallback logic when primary type is full |
| Putaway Near Picking Bin | SPRO > Logistics Execution > Warehouse Management > Strategies > Activate Putaway Near Picking Bin | T301 (NEAR_PICK) | Places reserve stock close to fixed picking bin for faster replenishment |
| Hazardous Material Check | SPRO > Logistics Execution > Warehouse Management > Strategies > Hazardous Material > Activate Hazardous Material Check | T300 (HAZMAT) | Prevents incompatible hazardous materials from being stored in the same bin or section |
| Capacity Check | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Capacity Check | T301 (CAP_CHECK) | Checks bin weight, volume, or quantity capacity before putaway confirmation |
| Maximum Bin Quantity | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Maximum Bin Quantity | LQUA | Controls maximum quant count or total quantity per storage bin |

### Picking Strategies
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Picking Strategy | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Stock Removal Strategies | T301 (LGPLA_STRAT_R) | A (FIFO), B (LIFO), C (partial quantities first), F (fixed bin), L (large/small quantities), P (shelf life FEFO) |
| Stock Removal for Fixed Bins | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Stock Removal for Fixed Bins | T301 (FIX_BIN_PICK) | Primary pick from fixed bin; replenishment trigger when quantity drops below minimum |
| Replenishment Control | SPRO > Logistics Execution > Warehouse Management > Activities > Stock Replenishment > Define Replenishment Control | T301R | Minimum/maximum quantities, replenishment lead time, and trigger method (planned, urgent) |
| Wave Picks | SPRO > Logistics Execution > Warehouse Management > Activities > Wave Picks > Define Wave Pick Profiles | T340W | Groups transfer orders into waves for batch processing; time-based or delivery-based grouping |
| Pick Point Determination | SPRO > Logistics Execution > Warehouse Management > Strategies > Define Pick Point Determination | T311 | Routes warehouse workers through optimal pick paths based on bin coordinates |

### Inventory and Stock Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Physical Inventory Procedures | SPRO > Logistics Execution > Warehouse Management > Activities > Physical Inventory > Define Physical Inventory Procedures | T340P | Annual inventory, continuous inventory, cycle counting — WM-level physical inventory |
| Stock Comparison (WM-MM) | SPRO > Logistics Execution > Warehouse Management > Activities > Inventory > Differences > Define Settings for Stock Comparison | T340D (STOCK_COMP) | Reconciliation between WM bin-level stock and MM storage location stock |
| Posting Change Types | SPRO > Logistics Execution > Warehouse Management > Activities > Posting Changes > Define Posting Change Types | T333P | Quality to unrestricted, blocked to unrestricted — stock status changes within WM |
| Batch Management in WM | SPRO > Logistics Execution > Warehouse Management > Master Data > Batch > Define Batch Management | T340B | Batch determination at WM level; batch split handling in transfer orders |
| Special Stocks | SPRO > Logistics Execution > Warehouse Management > Master Data > Define Special Stock Indicators | T340S | Vendor consignment (K), customer consignment (W), project stock (Q) — handling in WM |

## Critical Configuration Dependencies

1. **Warehouse Number** must be assigned to Plant and Storage Location before WM processes can run
2. **Storage Types** must be defined before storage sections, bins, and strategies can reference them
3. **MM Movement Types** must be mapped to WM Reference Movement Types before inventory movements trigger transfer orders
4. **Putaway Strategies** must be assigned to storage types before transfer orders can determine destination bins
5. **Picking Strategies** must be assigned to storage types before stock removal transfer orders can find source bins
6. **Storage Bin master data** must be created (manually or via batch) before putaway and picking TO creation works
7. **Lean WM vs. Full WM** decision must be made at implementation start — significantly different configuration scope
8. **Replenishment control** must be configured for fixed bin picking to work without constant stockouts

## Common Configuration Mistakes

1. **Storage type search sequence gaps** — Not defining fallback storage types in the search sequence, causing putaway transfer orders to fail when the primary storage type is full.
2. **Movement type mapping incomplete** — Missing reference movement type entries for custom MM movement types, so WM transfer requirements are not created automatically.
3. **Capacity check misconfiguration** — Enabling capacity checks without maintaining bin dimensions and maximum weights in storage bin master data, causing all putaway TOs to fail capacity validation.
4. **FIFO/FEFO strategy without batch management** — Configuring shelf-life-based (FEFO) or FIFO picking strategies without activating batch management for the materials, making the strategy ineffective.
5. **WM-MM stock discrepancies** — Not running regular stock comparisons (LX23) between WM and MM, allowing bin-level inventory to drift from storage location inventory due to unconfirmed transfer orders or posting errors.
