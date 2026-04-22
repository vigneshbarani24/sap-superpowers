# SPRO Configuration: Transportation Management (TM)

## Key Configuration Areas

### Organizational Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Transportation Planning Point | SPRO > Enterprise Structure > Definition > Logistics Execution > Define, copy, delete Transportation Planning Point | TTPLN | Org unit responsible for shipment planning and carrier selection |
| Assign Transportation Planning Point to Plant | SPRO > Enterprise Structure > Assignment > Logistics Execution > Assign Transportation Planning Point to Plant | T320T | Links TM planning point to logistics plant for route determination |
| Shipping Point (for TM Integration) | SPRO > Enterprise Structure > Definition > Logistics Execution > Define, copy, delete, check shipping point | TVST | Shipping point drives initial transportation planning from delivery documents |
| Transportation Service Agent | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Define Transportation Service Agents | LFA1 (carrier vendor) | Vendor master with carrier role; defines freight forwarders and carriers |
| Organizational Unit (S/4HANA TM) | SPRO > Transportation Management > Transportation Management > Master Data > Organizational Management > Define Organizational Units | /SCMTMS/TOR_ORG | S/4HANA embedded TM organizational units for planning and execution |

### Routes and Transportation Zones
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Transportation Zones | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Define Transportation Zones | TZONE | Geographic zones for route determination; assigned to ship-to addresses |
| Route Determination | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Routes > Define Routes and Route Stages | TVRO | Departure zone + destination zone = route; controls transit time and shipping conditions |
| Route Stages | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Routes > Define Route Stages | TVROW | Intermediate stops and legs within a route (pickup > hub > delivery) |
| Route Schedule | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Routes > Maintain Route Schedules | TVROW (SCHED) | Fixed departure days, cutoff times, and transit durations per route |
| Automatic Route Determination | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Routes > Define Route Determination | TVROTA | Conditions for automatic route assignment: shipping condition + departure zone + transport zone |
| Transportation Connection Points | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Define Transportation Connection Points | TVCON | Hub locations, cross-dock points, and consolidation centers in multi-leg routes |

### Shipment Types and Processing
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Shipment Types | SPRO > Logistics Execution > Transportation > Shipments > Define Shipment Types | V56 / TSHPT | 0001 (individual), 0002 (collective), 0003 (subsequent) — controls processing and cost calculation |
| Shipment Cost Types | SPRO > Logistics Execution > Transportation > Shipment Costs > Shipment Cost Types > Define Shipment Cost Types | T5T7 | Freight, insurance, handling, customs — cost category for shipment cost calculation |
| Shipment Cost Calculation | SPRO > Logistics Execution > Transportation > Shipment Costs > Pricing > Pricing Control > Define Condition Types | T685 (TM) | Condition-based freight pricing: weight scale, distance, zone-to-zone, flat rate |
| Pricing Procedure (Freight) | SPRO > Logistics Execution > Transportation > Shipment Costs > Pricing > Pricing Control > Define and Assign Pricing Procedures | T683 (TM) | Sequence of freight condition types for calculating total shipment cost |
| Shipment Number Ranges | SPRO > Logistics Execution > Transportation > Shipments > Define Number Ranges for Shipments | NRIV (LE_SHP) | Internal/external number ranges per shipment type |
| Shipment Stages | SPRO > Logistics Execution > Transportation > Shipments > Define Shipment Stages | TSHPS | Pickup, main carriage, delivery — legs within a shipment document |

### Freight Order Management (S/4HANA TM)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Freight Order Types | SPRO > Transportation Management > Transportation Management > Freight Order Management > Define Freight Order Types | /SCMTMS/TOR_TYPE | Controls planning profile, execution parameters, and settlement for freight orders |
| Transportation Planning Profile | SPRO > Transportation Management > Transportation Management > Planning > Define Planning Profiles | /SCMTMS/PLAN_PROF | Selection, optimization, and consolidation rules for freight planning |
| Carrier Selection | SPRO > Transportation Management > Transportation Management > Carrier Selection > Define Carrier Selection Profile | /SCMTMS/CARRIER | Preferred carriers, tendering sequence, and capacity constraints |
| Freight Unit Building Rules | SPRO > Transportation Management > Transportation Management > Freight Order Management > Define Freight Unit Building Rules | /SCMTMS/FU_RULE | Groups deliveries into freight units based on route, weight, volume, and compatibility |
| Charge Calculation | SPRO > Transportation Management > Transportation Management > Charge Calculation > Define Charge Calculation Sheets | /SCMTMS/CHRG_CALC | Rate tables, surcharges, and freight cost calculation rules for TM freight orders |
| Event Management Integration | SPRO > Transportation Management > Transportation Management > Freight Visibility > Define Event Profiles | /SCMTMS/EVENT | Shipment tracking events (departed, arrived, POD) for real-time visibility |

### Freight Settlement and Posting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Settlement Profile | SPRO > Logistics Execution > Transportation > Shipment Costs > Settlement > Define Settlement Profile | T5T8 | Controls automatic vendor invoice creation from shipment cost documents |
| Account Assignment for Freight | SPRO > Logistics Execution > Transportation > Shipment Costs > Settlement > Define Account Assignment | T5T8A | G/L accounts for freight cost posting; accrual accounts for freight provisions |
| Freight Cost Condition Transfer | SPRO > Logistics Execution > Transportation > Shipment Costs > Settlement > Define Condition Transfer | T5T8C | Maps freight condition types to FI document line items for settlement posting |
| Carrier Invoice Verification | SPRO > Logistics Execution > Transportation > Shipment Costs > Settlement > Define Invoice Verification | T5T8I | Tolerance limits and matching rules for carrier invoice vs. calculated freight cost |
| Accrual for Freight Costs | SPRO > Logistics Execution > Transportation > Shipment Costs > Settlement > Define Accrual Parameters | T5T8P | Period-end accrual posting for freight costs not yet invoiced by carriers |

## Critical Configuration Dependencies

1. **Transportation Zones** must be defined and assigned to customer/vendor addresses before route determination works
2. **Routes** must be configured before deliveries can be assigned to shipments with correct transit times
3. **Shipping Point** must exist and be linked to plant before outbound delivery triggers transportation planning
4. **Carrier vendors** must be created with transportation-relevant master data before shipment cost calculation
5. **Pricing Procedures** for freight must be complete (condition tables > access sequences > condition types > procedure) before shipment cost documents calculate
6. **Settlement Profile** must be configured before freight costs can post to FI as vendor invoices
7. **S/4HANA TM** requires separate activation and licensing; classic LE-TRA shipments and S/4 TM freight orders are different configuration streams
8. **Route Determination** depends on shipping conditions (SD) + departure zone (plant) + transportation zone (customer) — all three must be maintained

## Common Configuration Mistakes

1. **Transportation zone not maintained on customer/plant master** — Route determination fails silently because departure or destination zone is blank, so no route is proposed on the delivery.
2. **Shipment cost pricing procedure incomplete** — Missing condition types or access sequences in the freight pricing procedure, resulting in zero freight costs or incorrect rate application.
3. **Mixing classic LE-TRA and S/4HANA TM** — Attempting to use both classic shipment documents and TM freight orders for the same business process, creating duplicate transportation documents and cost postings.
4. **Route stages not maintained** — Defining routes without route stages for multi-leg transportation, so transit time calculation and shipment tracking milestones do not work correctly.
5. **Freight settlement account assignment missing** — Not configuring the G/L account determination for freight cost posting, causing settlement documents to fail with posting errors when carrier invoices are processed.
