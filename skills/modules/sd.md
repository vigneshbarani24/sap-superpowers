---
name: sd
description: Use when working with SAP Sales and Distribution (SD) — order-to-cash, customer master, pricing (condition technique), availability check (ATP), credit management, shipping, billing, revenue recognition, or any SD configuration in S/4HANA or ECC.
---

# SAP Sales and Distribution (SD)

This skill enforces correct SD configuration, pricing discipline, and order-to-cash integrity. In S/4HANA, credit management is redesigned (SAP Credit Management via FSCM), ATP integrates with Advanced ATP (aATP) on BTP, and output management moves to BRF+. Every SD design decision has a downstream financial impact in FI and a physical impact in logistics.

## Content Routing

| Topic | Section |
|-------|---------|
| Order-to-cash process | Order-to-Cash (O2C) |
| Customer master / Business Partner | Customer Master |
| Pricing and condition technique | Pricing |
| Availability check (ATP) | Availability Check |
| Credit management | Credit Management |
| Shipping and transportation | Shipping |
| Billing and revenue recognition | Billing |
| Integration with FI / MM / PP / LE | Integration Points |

## Iron Laws

1. **NEVER SKIP CREDIT CHECK FOR NEW CUSTOMERS.** Every new customer must have a credit limit defined before their first sales order is processed. A customer without a credit limit receives the system default (often unlimited or zero) — either creates uncollectable receivables or blocks all orders. Credit limits must be set by the credit department, not defaulted from system configuration.
2. **ALWAYS VERIFY PRICING PROCEDURE DETERMINATION IN NEW SALES SCENARIOS.** Pricing procedure determination depends on sales area (sales org + distribution channel + division), customer pricing procedure (from customer master), and document pricing procedure (from order type). When introducing a new sales org, order type, or customer segment, verify that the correct pricing procedure is assigned (OVKK) and test with a real order before go-live.
3. **NEVER MANUALLY OVERRIDE ATP RESULTS WITHOUT DOCUMENTATION.** ATP (availability check) exists to make honest delivery date commitments. Manual overrides — confirming a line item that ATP cannot confirm — create delivery shortfalls, customer escalations, and inventory mismatches. Any override must be documented with a business reason and approved by supply chain.
4. **NEVER RELEASE A BILLING DOCUMENT TO ACCOUNTING WITHOUT REVIEWING ACCOUNT DETERMINATION.** Billing document release (VF02 → Release to Accounting) posts to FI. Incorrect account determination (VKOA) posts revenue to the wrong GL account, which requires manual FI correction and creates audit findings. Verify VKOA account determination for each new billing document type and sales/customer combination in the configuration system before go-live.
5. **ALWAYS USE THE CONDITION TECHNIQUE FOR PRICING — NEVER HARDCODE PRICES IN USER EXITS.** Prices, discounts, surcharges, and taxes must be maintained as condition records (VK11) and accessed via the pricing procedure. Hardcoded prices in VOFM routines or user exits bypass condition record validity periods, approval workflows, and audit trails — and require a transport for every price change.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Set customer credit limit to zero or blank and "fix it later" | "We'll update credit limits during data migration" | Zero credit limit blocks all orders at credit check; blank may default to unlimited — both are dangerous at go-live | Credit limit data must be in scope for cutover; credit management team must load limits before the first orders are processed |
| Create a new order type and copy pricing from an existing one without reviewing procedure assignment | "Copy always brings the right settings" | Transaction copy (VOV8) copies document pricing procedure, but OVKK condition table entries must be separately maintained for the new order type | After creating a new order type, always verify OVKK assignments with a test order before releasing to users |
| Manually change the confirmed ATP quantity in a sales order line item | "The warehouse said the stock is there" | Verbal warehouse confirmations bypass the ATP system logic; if ATP cannot confirm, the stock is already committed elsewhere or below safety stock | Raise a formal ATP override request; document the business reason; let supply chain release the block in the system rather than overriding quantities manually |
| Configure output (forms, emails) using NACE/condition records in S/4HANA | "NACE works and we know it" | SAP's strategic output management in S/4HANA uses BRF+ and the Output Management framework; NACE is in maintenance mode. New implementations should use the new framework or a documented exception is required | For new S/4HANA implementations, use output management via BRF+ (transaction BRF+) and the Application Job framework for print/email outputs |
| Leave revenue recognition configuration at default for all billing types | "Standard billing always works" | Revenue recognition rules differ by business model: immediate recognition for standard products, deferred recognition for services, milestone billing for projects. Default configuration posts everything to revenue immediately — violates IFRS 15 for multi-element arrangements | Define revenue recognition method per item category (VOV7) in line with the contract type; engage Finance to confirm IFRS 15 treatment for each billing scenario |
| Use the same pricing procedure for all sales organizations | "Pricing is the same group-wide" | Even if prices are identical, different sales orgs may have different tax procedures, currency requirements, or discount authorities. A shared procedure creates a change-control problem when any single sales org needs a deviation | Define sales-org-specific pricing procedures where business rules differ; use shared condition types within separate procedures where pricing logic is truly identical |

## Red Flags

Watch for these in your own reasoning — each signals an Iron Law violation:

- "The customer doesn't have a credit limit yet, but let's process the first order..." → Stop. Define the credit limit first. The first order for a new customer is exactly when credit controls matter most.
- "The pricing came out wrong but we can fix it in billing..." → Pricing errors in the sales order propagate to delivery and billing. Fix the root cause (condition record or procedure assignment) in the order before progression.
- "ATP said we can't confirm, but the customer needs it — just override it..." → Document the override with a business reason and escalate to supply chain. Undocumented ATP overrides create fulfillment failures and inventory discrepancies.
- "Account determination is probably fine — it worked for the last order type..." → Account determination (VKOA) must be verified for every new combination of billing type, sales org, and account assignment group. Silent misconfiguration posts to incorrect GL accounts.
- "Let's hardcode the 5% discount in the user exit, just for this customer..." → Hardcoded pricing in exits has no audit trail, no validity period, and requires a transport to change. Use a customer-specific condition record (VK11) instead.
- "We can set up output management using NACE — it's what everyone knows..." → For new S/4HANA implementations, evaluate the new output management framework. Defaulting to NACE creates technical debt and requires migration later.

<HARD-GATE>
Before advising on SD configuration or pricing design: confirm the system version (ECC or S/4HANA), whether Advanced ATP (aATP) on BTP is deployed or classic ATP in APO/S/4HANA is used, and whether SAP Credit Management (FSCM) or classic SD credit management is active. These flags change the configuration transactions, integration architecture, and monitoring tools significantly.
</HARD-GATE>

## Key Concepts

- **Order-to-Cash (O2C):** End-to-end SD process: Inquiry → Quotation → Sales Order → Delivery → Goods Issue → Billing → Accounting Document → Payment Collection.
- **Condition Technique:** The universal SAP pricing framework. Pricing procedure = sequence of condition types. Each condition type accesses condition records via condition tables. Determines not just price but also taxes, freight, cash discounts, and rebates.
- **ATP (Available-to-Promise):** Checks whether requested quantity can be delivered on the requested date based on available stock and planned supply/demand. Classic ATP runs in S/4HANA; Advanced ATP (aATP) runs on BTP for complex backorder processing.
- **Business Partner (BP):** In S/4HANA, customers are managed as Business Partners with role FLCU01 (customer) via transaction BP. Classic customer transactions (FD01, XD01) are deprecated.
- **Pricing Procedure Determination:** Three-way key: Sales Area (SOrg + DChan + Div) + Customer Pricing Procedure (field in customer master) + Document Pricing Procedure (field in order type) → resolves to a pricing procedure via OVKK.
- **Account Determination (VKOA):** Maps billing document line items to GL accounts based on: application (V for SD), condition type (KOFI/KOFK), sales org, customer account assignment group, material account assignment group, account key.
- **Revenue Recognition (IFRS 15):** Performance obligation-based revenue recognition. Simple deliveries recognize revenue at goods issue; services and subscriptions may require deferral to contract accounts receivable and revenue recognition (RAR — Revenue Accounting and Reporting).

## Transaction Codes

| Transaction | Purpose |
|-------------|---------|
| VA01 / VA02 / VA03 | Create / change / display sales order |
| VA11 / VA21 | Create inquiry / quotation |
| VL01N / VL02N | Create / change outbound delivery |
| VL10 | Delivery due list (create deliveries in batch) |
| VF01 / VF02 / VF03 | Create / change / display billing document |
| VF04 | Billing due list |
| VK11 / VK12 / VK13 | Create / change / display condition records |
| V/06 | Pricing procedure configuration |
| V/08 | Pricing procedure detail / condition type assignment |
| OVKK | Pricing procedure determination (sales area + customer/doc PP) |
| VKOA | Account determination (revenue GL account assignment) |
| VD01 / XD01 | Create customer (ECC — deprecated in S/4HANA) |
| BP | Business Partner master (S/4HANA) |
| FD32 | Customer credit master (credit limit, credit group) |
| VKM1 / VKM3 | Released / blocked sales orders (credit) |
| CO09 | Availability overview (ATP) |
| VOV8 | Sales document type configuration |
| VOV7 | Item category configuration |
| VTLA | Delivery item category determination |
| VTFA | Billing document determination |

## Key Tables and CDS Views

| Object | Type | Description |
|--------|------|-------------|
| VBAK | Table | Sales document header |
| VBAP | Table | Sales document items |
| VBEP | Table | Sales document schedule lines |
| VBFA | Table | Sales document flow (predecessor/successor chain) |
| LIKP | Table | Delivery header |
| LIPS | Table | Delivery items |
| VBRK | Table | Billing document header |
| VBRP | Table | Billing document items |
| KONV | Table | Condition records per document (pricing at document level) |
| KONP / KONH | Table | Condition record item / header (master condition records) |
| KNVV | Table | Customer sales area data |
| KNA1 / KNB1 | Table | Customer general data / company code data |
| I_SalesOrder | CDS | Released VDM — sales order header |
| I_SalesOrderItem | CDS | Released VDM — sales order items |
| I_OutboundDeliveryItem | CDS | Released VDM — outbound delivery items |
| I_BillingDocumentItem | CDS | Released VDM — billing document items |
| C_SALESORDERITEMQ | CDS | Consumption VDM — sales order analytics |

## Order-to-Cash (O2C)

### Standard O2C Flow
1. **Sales Order (VA01):** Customer request confirmed with pricing, ATP, and credit check
2. **Delivery (VL01N):** Pick list generated; warehouse picks and packs
3. **Goods Issue (VL02N):** Stock reduced (MM movement type 601); delivery costs posted
4. **Billing (VF01/VF04):** Invoice created; accounting document posted to FI (revenue + customer AR)
5. **Payment:** Customer pays; AR cleared via F-28 or automatic clearing

### Document Flow (VBFA)
Every SD document links to its predecessors and successors via VBFA. Use VA03 → Environment → Display Document Flow to trace an order through delivery, goods issue, billing, and accounting document. Essential for debugging incomplete O2C chains.

## Pricing

### Condition Technique Architecture
- **Condition type:** Defines behavior (percentage vs. fixed amount, mandatory vs. optional, statistical)
- **Access sequence:** Ordered list of condition tables to search for a valid condition record
- **Condition table:** Combination of key fields (e.g., customer + material, price list + material group)
- **Pricing procedure:** Ordered sequence of condition types with subtotals, requirements, and calculation routines

### Key Standard Condition Types
| Condition Type | Description |
|---------------|-------------|
| PR00 | Base price |
| K004 | Material discount (absolute) |
| K005 | Customer/material discount |
| K007 | Customer discount (%) |
| KF00 | Freight surcharge |
| MWST | Tax (output tax) |
| SKTO | Cash discount |
| RB00 | Rebate (condition basis) |

### Condition Record Maintenance (VK11)
- Always set validity periods — open-ended condition records cannot be mass-expired
- Use release procedures for large discount approvals (pricing condition authorization)
- Use simulation (VA01 with test pricing) to verify new condition records before activating in production

## Availability Check

### ATP Configuration
- **Checking group** (material master, Sales/Gen. Plant Data view): controls which supply/demand elements are included
- **Checking rule** (per sales document type): controls the scope of the ATP check (order, delivery, backorder)
- **Availability overview (CO09):** Shows confirmed quantities, missing quantities, and planned supply for a material/plant

### Classic ATP vs. Advanced ATP (aATP)
| Feature | Classic ATP (S/4HANA) | Advanced ATP (BTP) |
|---------|----------------------|-------------------|
| Backorder processing | Basic | Automated, rule-based |
| Capable-to-promise | Not included | Included |
| Multi-step confirmation | No | Yes |
| Deployment | On-stack | Side-car on BTP |

## Credit Management

### S/4HANA Credit Management (FSCM)
- Credit accounts managed in FSCM (transaction UKM_MIGRN for migration from classic)
- Credit limit check triggered at sales order save and delivery creation
- Credit exposure: open orders + open deliveries + open billing + open AR
- Blocked orders released via UKM_MY_DCREQ or VKM1/VKM3

### Credit Check Flow
1. Sales order saved → credit check runs against FSCM credit account
2. If exposure > limit → order blocked (delivery block B1 or credit block)
3. Credit controller reviews and releases (VKM3) or rejects
4. Released order proceeds to delivery creation

## Shipping

### Delivery Creation
- Automatic: VL10 delivery due list (scheduled job) — creates deliveries for all due orders
- Manual: VL01N — creates delivery for a specific sales order
- Delivery type determined from sales order type (VTLA)

### Shipping Points and Routes
- Shipping point determined from: delivering plant + shipping condition (customer) + loading group (material)
- Route determined from: departure zone + shipping condition + transportation group + destination country/zone
- Routes drive freight cost calculation and transportation planning

## Billing

### Billing Document Types
| Document Type | Use Case |
|--------------|----------|
| F2 | Standard invoice (goods delivery) |
| F1 | Order-related billing (services, configurable) |
| RE | Credit memo (returns) |
| G2 | Credit memo request outcome |
| L2 | Debit memo |
| IV | Intercompany invoice |

### Account Determination (VKOA)
Revenue posting determined by condition type KOFI (for accounts without CO object) or KOFK (for accounts with CO object — cost of goods sold). Account assignment depends on:
- Sales organization
- Customer account assignment group (KNVV-KTGRD)
- Material account assignment group (MARC-KTGRM)
- Account key from pricing procedure (e.g., ERL for revenue, ERS for sales deductions)

### Revenue Recognition
- Standard delivery-based: revenue recognized at goods issue (IFRS 15 point-in-time)
- Service/subscription: deferred to contract — requires RAR (Revenue Accounting and Reporting)
- Milestone billing: partial recognition based on delivery milestones defined in the billing plan

## Integration Points

| Module | Integration Description |
|--------|------------------------|
| FI | Billing document release posts to FI: debit customer AR (reconciliation account), credit revenue GL (via VKOA). Payment terms from customer master flow to billing document and determine due date for AR aging. |
| MM | Goods issue for outbound delivery (MT 601) reduces inventory in MM and posts COGS in FI. ATP check reads MM stock and open POs/production orders. Intercompany scenarios trigger MM purchase order in the supplying company. |
| PP | Make-to-order (MTO): sales order triggers production order creation (special procurement key 52). ATP in MTO checks production order confirmation, not warehouse stock. |
| LE | Shipping and transportation management: delivery documents drive warehouse tasks in WM/EWM. Transportation management (TM) handles carrier selection, freight booking, and freight cost settlement. |
| CO | Sales order items can be cost objects (valuated sales order stock in MTO). Profitability Analysis (CO-PA) receives revenue, cost of goods sold, and pricing conditions from billing via account-based posting to ACDOCA. |

## Best Practices

1. **Define a naming convention for condition types** — prefix by category (K = customer discounts, Z = custom, RB = rebates) to keep the pricing procedure readable and maintainable.
2. **Use copy control (VTLA, VTFA) deliberately** — copy rules between order types, delivery types, and billing types control which fields are copied and which are re-determined. Incorrect copy control is a frequent source of pricing and account determination errors.
3. **Implement output condition records in VV31** for all required output types — do not rely on default outputs. Define output per sales org, distribution channel, and customer group.
4. **Test the full O2C cycle in the quality system** for every new sales area, customer group, or pricing procedure before go-live — not just the sales order, but delivery, GI, billing, and accounting document.
5. **Monitor the VF04 billing due list daily** — unprocessed billing documents represent unbilled revenue. Aged items on the billing due list indicate process failures that finance needs to investigate.

## OTC Scenarios

### Standard Order (OR)
Complete order-to-cash:
- Inquiry (IN) → Quotation (QT) → Sales Order (OR) → Delivery (LF) → Billing (F2)
- Tcodes: VA11 inquiry, VA21 quotation, VA01 order, VL01N delivery, VF01 billing
- Item categories: TAN (standard), TAP (pricing line)
- Schedule line category: CP (confirmed goods issue)
- ATP runs on order save; credit check optional per customer

### Consignment Process
Stock at customer location:
- **Fill-up (KB)**: VA01 with order type KB, delivery to customer consignment stock
- **Issue (KE)**: Customer consumes, order type KE triggers billing
- Special stock indicator W (customer consignment)
- Item categories: KBN (fill-up), KEN (issue)
- Inventory visibility: MB58 reports consignment stock

### Returns Processing
Customer returns workflow:
- Return order (RE) referencing original billing doc
- Item category REN (returnable)
- Return delivery (LR) with MvT 651 (returns from customer)
- Credit memo (G2) after QA verification
- FSCM credit memo request for refunds
- Partial returns supported

### Intercompany Sales
Cross-company billing:
- IV (intercompany billing) document type
- Pricing procedure RVAA01 with IV00 condition
- Internal customer representing receiving company
- Stock transfer order (STO) for physical movement
- Two-step billing: IG (intercompany GI) then IV (intercompany invoice)

### Make-to-Order
Customer-specific production:
- Item category TAK (make-to-order)
- Requirement class 201 (MTO with individual requirements)
- Production order tied to sales order item
- Valuation M (based on sales order)
- Cost estimate per sales order
- Settlement at billing

## Pricing Configuration Examples

Standard pricing procedure RVAA01:
| Condition | Type | Purpose |
|-----------|------|---------|
| PR00 | Price | Base material price |
| K004 | Discount | Material discount |
| K005 | Discount | Customer/material discount |
| K007 | Discount | Customer discount |
| KF00 | Freight | Freight charge |
| MWST | Tax | Output tax |

Creating condition records:
- VK11 with scales for quantity-based pricing
- VK12 for edit, VK13 for display
- Validity dates mandatory
- Free goods: VBN1 (create) — e.g., "buy 10 get 1 free"
- Rebate agreements: VBO1 (classic), S/4HANA uses Settlement Management

## Output Determination Examples

| Output Type | Purpose | Media |
|-------------|---------|-------|
| BA00 | Order confirmation | Print/email |
| BA01 | Order change | Print/email |
| LD00 | Delivery note | Print |
| LP00 | Packing list | Print |
| RD00 | Invoice | Print/email |
| ORDRSP | Order response | EDI/IDoc |
| DESADV | Advance ship notice | EDI/IDoc |
| INVOIC | Invoice | EDI/IDoc |

Troubleshooting: Check NAST table for output status, VA02 → Extras → Output for processing log.

## Common SD Issues

- **Copy control chain breaks** — VTFL (delivery→billing), VTFA (order→billing), VTLA (order→delivery) configuration errors block process flow
- **Pricing procedure determination failure** — Sales area + customer PP + document PP combination must match in OVKK
- **ATP slow on large orders** — Use Advanced ATP (aATP) in S/4HANA; consider check groups, scope of check
- **Credit block handling** — FSCM credit management releases via V.23 or automated workflow
- **Intercompany billing reconciliation** — FBIC for reconciliation, FI-CO mapping critical

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Pricing procedure determination verified for all new sales area / order type combinations (OVKK)
- [ ] Account determination tested for all billing types and revenue categories (VKOA simulation)
- [ ] Credit limits confirmed loaded for all active customers before go-live
- [ ] ATP configuration reviewed — checking group, checking rule, and scope aligned to business requirements
- [ ] Full O2C cycle tested in quality system: VA01 → VL01N → PGI → VF01 → accounting document
- [ ] S/4HANA-specific items confirmed: BP for customers, SAP Credit Management (FSCM), output management approach

**Evidence required:** Pricing procedure determination table (OVKK), test order document flow (VBFA), billing accounting document with GL account assignment — not generic SD descriptions.

## Next Skill

After completing SD work, invoke:
- `fi` — For billing account determination, customer AR, and revenue posting verification
- `mm` — For ATP, goods issue, and intercompany procurement flows
- `verification-before-completion` — Before closing any SD deliverable

## Related Skills

- `fi` — Financial Accounting: billing-to-accounting posting, customer AR management, revenue GL accounts
- `co` — Controlling: CO-PA profitability postings, sales order as cost object (MTO)
- `mm` — Materials Management: ATP stock check, goods issue for delivery, intercompany PO
- `ewm` — Extended Warehouse Management: picking, packing, and goods issue integration
- `analytics` — SD reporting: sales order analytics, billing analytics, CO-PA profitability CDS views
- `abap-cloud` — Custom SD enhancements: pricing routines, output BAdIs, user exits in RAP
