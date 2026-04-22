# Industry: Food & Beverage

## Business Characteristics
- Short shelf life with strict FIFO/FEFO management
- Catch weight (variable weight/quantity) products
- Seasonal production with agricultural input variability
- Complex labeling (allergens, nutritional facts, origin)
- Cold chain / temperature-sensitive distribution

## Key SAP Modules
| Module | F&B-Specific Features |
|--------|----------------------|
| **PP** | Process manufacturing, recipe management, co-/by-product handling |
| **MM** | Catch weight management, batch with shelf life, seasonal procurement |
| **QM** | HACCP integration, microbiological testing, allergen management |
| **WM/EWM** | FEFO picking, temperature zone management, batch-restricted storage |
| **SD** | Shelf life checks at delivery, route planning for perishables |
| **CO** | Joint/by-product costing, yield variance analysis |

## Master Data Specifics
- **Catch Weight:** Dual UoM (order in cases, price by kg), variable tare weight
- **Batch:** Shelf life dates (production, best-before, expiry), country of origin, organic certification
- **Recipe/BOM:** Process orders with variable yield, co-products and by-products
- **Quality:** HACCP control points mapped to inspection lots, allergen matrix

## Key Processes
1. **Agricultural procurement → Quality check → Storage → Production → Packaging → Distribution**
2. **Recipe management:** Formulation → Batch sizing → Process order → Yield recording → Co-product allocation
3. **FEFO:** First-Expired-First-Out picking across temperature zones
4. **Recall:** Batch trace from finished product back to raw material supplier (within 4 hours per EU requirement)
5. **Labeling:** Automated label generation with allergen declarations, nutritional values, country-specific formats

## Common Customizations
- Catch weight handling (dual UoM, pricing by actual weight)
- Batch traceability across production stages (forward/backward trace)
- HACCP integration with process order confirmation
- Label management system integration
- DSD (Direct Store Delivery) with proof of delivery
- Promotional pricing for seasonal products

## SAP Industry Solutions
- SAP S/4HANA for Consumer Products
- SAP Recipe Development
- SAP Environment, Health, and Safety (EHS)

## Compliance & Regulatory
- FSMA (Food Safety Modernization Act — US)
- EU Regulation 178/2002 (food traceability)
- HACCP / HARPC food safety plans
- Allergen labeling (EU 1169/2011, FDA FALCPA)
- Organic / fair trade certification tracking
- Country-specific nutritional labeling formats
