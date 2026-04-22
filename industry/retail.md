# Industry: Retail

## Business Characteristics
- High-volume, low-margin transactions
- Omnichannel operations (stores, e-commerce, marketplace)
- Seasonal demand with rapid assortment changes
- Complex pricing (promotions, markdowns, loyalty, coupons)
- Real-time inventory visibility across channels

## Key SAP Modules
| Module | Retail-Specific Features |
|--------|------------------------|
| **MM** | Article master (vs. material), assortment management, listing/exclusion |
| **SD** | POS integration, returns handling, omnichannel order fulfillment |
| **EWM** | Store replenishment, cross-docking, pick-pack-ship |
| **FI** | Revenue recognition across channels, POS settlement, gift card accounting |
| **CO** | Margin analysis by store/channel/category, promotional cost allocation |
| **Analytics** | Demand sensing, sell-through analysis, basket analysis |

## Master Data Specifics
- **Articles vs. Materials:** Retail uses Articles (WART) with generic articles, variants (size/color), and prepacked articles
- **Sites:** Stores are plants with distribution chain (sales org + distribution channel)
- **Assortments:** Module listing — which articles are available at which stores
- **Pricing:** Condition technique with promotional pricing, markdown cadences, loyalty integration

## Key Processes
1. **Merchandise planning** → Assortment → Allocation → Replenishment
2. **Purchase order → Goods receipt → Invoice verification** (high volume, EDI-heavy)
3. **POS integration → Sales posting → Revenue recognition** (daily, automated)
4. **Returns processing** (in-store, online, cross-channel)
5. **Markdown optimization** → End-of-season clearance → Write-off

## Common Customizations
- POS middleware integration (GK, NCR, Oracle Retail)
- Loyalty program integration (custom BAPI/RFC interfaces)
- Omnichannel order management (SAP CAR / SAP Commerce)
- Vendor-managed inventory (VMI) with EDI 852/867
- Category management with planogram integration

## SAP Industry Solutions
- SAP S/4HANA Retail (formerly SAP Retail)
- SAP Customer Activity Repository (CAR)
- SAP Omnichannel POS
- SAP Commerce Cloud

## Compliance & Regulatory
- PCI-DSS (payment card data)
- Consumer protection / right of return
- Country-specific receipt requirements
- GDPR for loyalty program data
