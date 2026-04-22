# SPRO Configuration: Materials Management (MM)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Plant | SPRO > Enterprise Structure > Definition > Logistics - General > Define, copy, delete, check plant | T001W | Central org unit for logistics; drives MRP, inventory, and procurement |
| Storage Location | SPRO > Enterprise Structure > Definition > Materials Management > Maintain storage location | T001L | Sub-division of plant for inventory management |
| Purchasing Organization | SPRO > Enterprise Structure > Definition > Materials Management > Maintain purchasing organization | T024E | Org unit responsible for procurement; can be cross-plant or plant-specific |
| Purchasing Group | SPRO > Enterprise Structure > Definition > Materials Management > Maintain purchasing group | T024 | Buyer group within purchasing org; used for reporting and workflow |
| Assign Plant to Company Code | SPRO > Enterprise Structure > Assignment > Logistics - General > Assign plant to company code | T001K | Links plant to FI company code for valuation and accounting |
| Assign Purchasing Org to Company Code | SPRO > Enterprise Structure > Assignment > Materials Management > Assign purchasing organization to company code | T024E (BUKRS) | Determines which company code a PO posts against |
| Assign Purchasing Org to Plant | SPRO > Enterprise Structure > Assignment > Materials Management > Assign purchasing organization to plant | T024W | Links plant-level procurement to a purchasing organization |
| Valuation Area | SPRO > Enterprise Structure > Definition > Logistics - General > Define valuation area | T001K | Set to plant level (standard); determines material valuation granularity |

### Purchasing
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Document Types (PO) | SPRO > Materials Management > Purchasing > Purchase Order > Define Document Types | T161 | NB (standard PO), FO (framework order), UB (stock transport order), ZNBX (custom) |
| Document Types (PR) | SPRO > Materials Management > Purchasing > Purchase Requisition > Define Document Types | T161 | NB (standard PR); controls screening, field selection, and number ranges |
| Release Strategy (PO) | SPRO > Materials Management > Purchasing > Purchase Order > Release Procedure for Purchase Orders > Define Release Procedure | T16FS / T16FD | Classification-based approval workflow; release codes, groups, and strategies |
| Release Strategy (PR) | SPRO > Materials Management > Purchasing > Purchase Requisition > Release Procedure > Procedure with Classification | T16FS / T16FD | PR approval using characteristics (value, plant, material group, account assignment) |
| Purchasing Info Records | SPRO > Materials Management > Purchasing > Conditions > Define Price Determination Process | T683 (M) | Condition-based pricing for procurement; maps to vendor/material combinations |
| Source Determination | SPRO > Materials Management > Purchasing > Source Determination > Define Source Determination | T024E (AUTO_SOURCE) | Source list, quota arrangement, and contract-based automatic sourcing |
| Account Assignment Categories | SPRO > Materials Management > Purchasing > Account Assignment > Maintain Account Assignment Categories | T163K | K (cost center), P (project/WBS), A (asset), F (production order) — drives FI posting |
| Item Categories | SPRO > Materials Management > Purchasing > Account Assignment > Define Item Categories | T163 | Standard, consignment, subcontracting, third-party, service — controls GR/IR behavior |

### Inventory Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Movement Types | SPRO > Materials Management > Inventory Management and Physical Inventory > Goods Receipt > Define Movement Types | T156 | 101 (GR to stock), 201 (GI to cost center), 301 (stock transfer), 561 (initial entry) |
| Number Ranges for Material Documents | SPRO > Materials Management > Inventory Management and Physical Inventory > Number Assignment > Define Number Assignment for Material Documents | NRIV (MATERIALBEL) | Internal/external number ranges for MBLNR |
| Goods Receipt Tolerances | SPRO > Materials Management > Inventory Management and Physical Inventory > Goods Receipt > Set Tolerance Limits | T156C / T169G | Over/under delivery tolerances per movement type and plant |
| Reservation Management | SPRO > Materials Management > Inventory Management and Physical Inventory > Reservation > Define Default Values | T159L | Controls reservation behavior, automatic GI, and movement type defaults |
| Physical Inventory Procedures | SPRO > Materials Management > Inventory Management and Physical Inventory > Physical Inventory > Define Physical Inventory Procedures | T159C | Annual, continuous, cycle counting, and sample-based inventory methods |
| Split Valuation | SPRO > Materials Management > Valuation and Account Assignment > Split Valuation > Configure Split Valuation | T149D | Allows multiple valuation prices for one material (batch, origin, quality) |

### Material Valuation
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Valuation Class | SPRO > Materials Management > Valuation and Account Assignment > Account Determination > Account Determination Without Wizard > Define Valuation Classes | T025 | Groups materials for automatic G/L account determination (3000 = raw, 7900 = trading) |
| Account Determination (Automatic Posting) | SPRO > Materials Management > Valuation and Account Assignment > Account Determination > Account Determination Without Wizard > Configure Automatic Postings | T030 | OBYC transaction; maps movement type + valuation class to G/L accounts (BSX, GBB, WRX, PRD) |
| Price Control | SPRO > Materials Management > Valuation and Account Assignment > Material Master > Define Price Control | T149 | V (moving average) vs. S (standard price) — impacts variance handling |
| Material Ledger | SPRO > Materials Management > Valuation and Account Assignment > Material Ledger > Activate Material Ledger | T001K (ML_ACTIVE) | Mandatory in S/4HANA; enables actual costing and parallel valuation |
| Valuation Grouping Code | SPRO > Materials Management > Valuation and Account Assignment > Account Determination > Account Determination Without Wizard > Group Together Valuation Areas | T001K (BWMOD) | Groups plants that share the same G/L account determination rules |

### Invoice Verification
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Tolerance Limits for Invoice Verification | SPRO > Materials Management > Logistics Invoice Verification > Invoice Block > Set Tolerance Limits | T169G | Price variance, quantity variance, and total amount tolerance per company code |
| Maintain Default Values | SPRO > Materials Management > Logistics Invoice Verification > Incoming Invoice > Maintain Default Values for Tax Codes | T169V | Default tax codes and posting settings for MIRO |
| Blocking Reasons | SPRO > Materials Management > Logistics Invoice Verification > Invoice Block > Define Blocking Reasons | T169B | R (price), M (quantity), W (quality) — stochastic or mandatory blocks |
| GR/IR Account Maintenance | SPRO > Materials Management > Logistics Invoice Verification > GR/IR Account Maintenance > Maintain GR/IR Clearing Account | T030 (WRX) | Transit account between goods receipt and invoice receipt |
| Evaluated Receipt Settlement (ERS) | SPRO > Materials Management > Logistics Invoice Verification > Evaluated Receipt Settlement (ERS) > Maintain ERS Settings | T169P | Auto-creates invoices at GR; requires vendor/PO item flagged for ERS |

### Material Master
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Material Types | SPRO > Logistics - General > Material Master > Basic Settings > Material Types > Define Attributes of Material Types | T134 | ROH (raw), HALB (semi-finished), FERT (finished), HIBE (operating supplies), DIEN (service) |
| Number Ranges for Materials | SPRO > Logistics - General > Material Master > Basic Settings > Material Types > Define Number Ranges for Each Material Type | NRIV (MATERIALNR) | Internal (auto) or external (manual) numbering per material type |
| Material Groups | SPRO > Logistics - General > Material Master > Settings for Key Fields > Define Material Groups | T023 | Grouping for reporting, sourcing, and account assignment |
| Field Selection | SPRO > Logistics - General > Material Master > Field Selection > Maintain Field Selection for Data Screens | T130F | Controls which fields are required, optional, suppressed, or display-only per transaction/material type |
| Material Status | SPRO > Logistics - General > Material Master > Basic Settings > Define Material Statuses | T141 | Cross-plant and plant-level status; blocks procurement, production, or sales |

## Critical Configuration Dependencies

1. **Company Code** (FI) must exist before Plants can be assigned
2. **Valuation Area = Plant** must be set at go-live and cannot be changed afterward — this is a one-time decision
3. **Chart of Accounts** must be assigned to Company Code before Account Determination (OBYC/T030) can be configured
4. **Valuation Classes** must exist before automatic account determination rules reference them
5. **Material Types** must be defined before Material Master records can be created
6. **Purchasing Organization** must be assigned to both Company Code and Plant before POs can be created
7. **Release Strategies** require classification system setup (classes, characteristics, and values) before strategy assignment
8. **Account Assignment Categories** must be configured before non-stock PO items can post correctly to FI/CO

## Common Configuration Mistakes

1. **OBYC account determination gaps** — Missing entries in automatic posting configuration (transaction OBYC) for specific movement type + valuation class combinations. Results in "No account found" errors at goods movement.
2. **Valuation area set to company code instead of plant** — In S/4HANA this is always plant level, but in ECC choosing company code level is irreversible and limits inventory granularity.
3. **Release strategy classification errors** — Characteristics not properly assigned to the release class, or OR/AND logic in release prerequisites configured incorrectly, causing approvals to be skipped or stuck.
4. **Tolerance limits too tight or too loose** — Invoice verification tolerances (T169G) not aligned with business requirements, causing excessive blocks or allowing significant variances to pass.
5. **Missing GR/IR clearing account** — Not configuring the WRX account key in OBYC, leading to posting errors when goods receipts and invoices are processed at different times.
