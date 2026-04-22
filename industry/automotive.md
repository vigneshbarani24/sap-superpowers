# Industry: Automotive

## Business Characteristics
- Complex multi-tier supply chain (OEM → Tier 1 → Tier 2 → Tier 3)
- Just-in-Time / Just-in-Sequence (JIT/JIS) delivery
- Engineering change management across product lifecycle
- Regulatory compliance (emissions, safety, recall management)
- Long product lifecycles with variant configuration

## Key SAP Modules
| Module | Automotive-Specific Features |
|--------|----------------------------|
| **PP** | Repetitive manufacturing, Kanban, JIT/JIS calls, sequenced production |
| **MM** | Consignment, VMI, scheduling agreements with JIT delivery schedules |
| **SD** | Vehicle Management System (VMS), dealer management, variant config |
| **QM** | PPAP, APQP, SPC integration, 8D problem resolution |
| **PM** | Predictive maintenance for production lines, TPM integration |
| **CO** | Product cost by order, cost object hierarchy, activity-based costing |

## Master Data Specifics
- **Vehicle Order:** Complex variant configuration with option dependencies
- **BOM:** Engineering BOM → Manufacturing BOM with effectivity dates
- **Routing:** Line-balanced operations with takt time management
- **Supplier:** JIT-capable classification, EDI maturity levels, quality ratings

## Key Processes
1. **Vehicle order → Configuration → BOM explosion → Sequencing → Production → Delivery**
2. **JIT/JIS:** Call-off → Sequencing → Delivery to line-side → Backflush
3. **Engineering Change Management:** ECO → BOM effectivity → Phase-in/Phase-out
4. **Quality:** Incoming inspection → SPC → PPAP → Supplier scorecards
5. **Recall management:** VIN identification → Dealer notification → Repair tracking

## Common Customizations
- EDI 830/862 (forecast/JIT schedules), EDIFACT DELFOR/DELJIT
- Packaging management (returnable containers, empties tracking)
- VIN tracking from order to delivery
- Engineering change effectivity (serial number / date-based)
- Self-billing / evaluated receipt settlement (ERS)

## SAP Industry Solutions
- SAP S/4HANA for Automotive (IS-Auto)
- SAP Vehicle Management System
- SAP Engineering Control Center

## Compliance & Regulatory
- IATF 16949 quality management system
- REACH / RoHS substance compliance
- IMDS (International Material Data System)
- Emissions regulations (EPA, Euro standards)
- Recall and safety reporting (NHTSA, EU type approval)
