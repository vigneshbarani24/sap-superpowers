---
name: mm
description: Use when working with SAP Materials Management (MM) — procurement (procure-to-pay), material master, vendor/business partner master, source determination, inventory management, invoice verification, MRP, or any MM configuration in S/4HANA or ECC.
---

# SAP Materials Management (MM)

This skill enforces correct MM configuration, procurement discipline, and inventory accuracy. Every procurement transaction depends on complete master data — incomplete material masters, missing info records, or bypassed three-way match create downstream failures in FI, CO, and PP that are expensive to unwind.

## Content Routing

| Topic | Section |
|-------|---------|
| Procure-to-pay process | Procure-to-Pay (P2P) |
| Material master data | Material Master Data |
| Vendor / Business Partner master | Vendor Master |
| Source determination | Source Determination |
| Inventory management | Inventory Management |
| Invoice verification (MIRO) | Invoice Verification |
| MRP (Material Requirements Planning) | MRP |
| Integration with FI / PP / SD / EWM | Integration Points |

## Iron Laws

1. **NEVER SKIP THREE-WAY MATCH VERIFICATION.** Every vendor invoice (MIRO) must be matched against the purchase order (price, quantity, conditions) and the goods receipt (quantity, delivery date) before payment is approved. Bypassing three-way match — even for "trusted" vendors or urgent payments — removes the fundamental financial control against overpayment, duplicate payment, and fraud.
2. **ALWAYS COMPLETE REQUIRED MATERIAL MASTER VIEWS BEFORE PROCUREMENT BEGINS.** A material master missing the Purchasing view, MRP view, or Accounting view will block purchase order creation, MRP planning, or goods receipt valuation respectively. Incomplete material master data is the most common root cause of procurement failures in go-live.
3. **NEVER CREATE A PURCHASE ORDER WITHOUT SOURCE DETERMINATION OR DOCUMENTED JUSTIFICATION.** Purchase orders should reference a contract, scheduling agreement, source list, or quota arrangement. An undocumented PO without a source bypasses purchasing controls, makes price validation impossible, and creates audit findings.
4. **ALWAYS RUN MRP WITH VERIFIED MASTER DATA.** MRP (MD01/MD02) reads BOM, routing, purchasing info records, and planning parameters. Running MRP with incomplete or incorrect master data generates thousands of incorrect procurement proposals that take hours to correct manually. Verify master data completeness before any MRP run in production.
5. **NEVER POST A GOODS RECEIPT WITHOUT REFERENCE TO A PURCHASE ORDER.** Unplanned goods receipts (free GR without PO reference) bypass all purchasing controls including price, quantity, and vendor validation. Always post GR via MIGO with reference to the PO (movement type 101).

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Post a manual FI invoice instead of using MIRO for a PO-referenced purchase | "It's faster and gets the payment out today" | Manual FI posting does not clear the GR/IR clearing account; the PO remains open; three-way match is bypassed; quantity and price tolerances are not checked | Always use MIRO for PO-referenced invoices; use FB60 only for non-PO invoices with a documented exception |
| Create a material master with only the Basic Data view | "We only need it for display purposes right now" | A material with only Basic Data cannot be ordered (missing Purchasing view), planned (missing MRP view), or received into stock (missing Accounting/Valuation view) | Define which views are required for the intended business process before creating the material master; create all required views in one session |
| Skip the source list and create POs directly from PRs | "The buyer knows which vendor to use" | Source determination (source list, quota arrangement, contract) enables automatic source assignment in MRP, enforces preferred vendor agreements, and simplifies PO creation at scale | Maintain source lists (ME01) for all regularly procured materials; define quota arrangements for multi-source procurement |
| Run MRP (MD01) without first checking the planning file (MD21) | "MRP always runs correctly" | If the planning file has inconsistencies (materials with change indicators not cleared), MRP produces incorrect results silently | Check MD21 (planning file entries) and resolve inconsistencies; run MDRE (planning file reconstruction) if needed before MRP |
| Approve invoice price tolerance exceptions without reviewing the PO | "The system allowed it within tolerance" | Within-tolerance exceptions are automatic — but tolerances can mask systematic pricing errors (wrong condition type, missing rebate deduction) that accumulate significantly over time | Review all tolerance exceptions in the invoice verification log; investigate systemic patterns, not just individual invoices |
| Use a single material master price control type (S = standard) for all materials | "Standard price is simpler" | Moving average price (V) is mandatory for materials without a standard cost estimate (raw materials, trading goods). Using standard price for these requires maintaining correct standard prices manually — a control risk | Use standard price (S) for finished and semifinished goods with product costing; use moving average price (V) for raw materials, trading goods, and purchased parts without standard cost estimates |

## Red Flags

Watch for these in your own reasoning — each signals an Iron Law violation:

- "We can create the PO now and add the source list later..." → Source determination should precede PO creation in a controlled procurement environment. Retroactive source lists do not control already-created POs.
- "Let's post the GR without a PO reference and match it up later..." → Movement type 501 (GR without reference) bypasses all PO controls. Use 101 with PO reference unless a documented exception process exists.
- "MIRO is taking too long — let's just post an FI invoice..." → MIRO is not optional for PO-referenced invoices. FI-only posting leaves the PO and GR/IR account in an incorrect state.
- "The material master only needs Basic Data and Purchasing for now..." → MRP will fail to plan it; valuation will fail at GR; invoicing will fail at MIRO. Define all required views from the start.
- "MRP ran last week, let's reuse those results..." → MRP results must be regenerated after any master data change, BOM update, or demand change. Stale MRP results cause procurement of wrong quantities.
- "This vendor doesn't have an info record but we know the price..." → Without a purchasing info record, MIRO price tolerance checks have no reference price. Create the info record (ME11) before the PO.

<HARD-GATE>
Before advising on MM configuration or procurement process design: confirm the system version (ECC or S/4HANA), whether Extended Warehouse Management (EWM) is deployed (replacing WM), and whether the Business Partner model is active (mandatory in S/4HANA — vendor master managed via BP transaction, not MK01). These flags change master data transactions, inventory management behavior, and integration architecture significantly.
</HARD-GATE>

## Key Concepts

- **Procure-to-Pay (P2P):** The end-to-end procurement process: Purchase Requisition → RFQ (optional) → Purchase Order → Goods Receipt → Invoice Verification → Payment.
- **Material Master:** Central master data object with views by organizational level. Key views: Basic Data 1/2, Purchasing, MRP 1–4, Accounting 1/2, Costing 1/2, Storage, Warehouse.
- **Business Partner (BP):** In S/4HANA, vendors are managed as Business Partners with role FLVN01 (vendor) via transaction BP. Classic vendor transactions (MK01, XK01) are deprecated.
- **Purchasing Info Record (ME11):** Defines vendor-material relationship: price, conditions, delivery time, tolerance. Required for automated price proposals in PO and three-way match in MIRO.
- **Source List (ME01):** Defines valid supply sources for a material in a plant. MRP uses source list for automatic source determination in planned order conversion.
- **GR/IR Clearing Account:** GL account that records the liability between goods receipt (debit stock, credit GR/IR) and invoice receipt (debit GR/IR, credit vendor). Must balance at period-end.
- **Movement Types:** Control how stock quantities and values are updated. Key types: 101 (GR vs. PO), 201 (GI to cost center), 261 (GI to production order), 301 (stock transfer), 501 (GR without reference — restricted use).
- **MRP (Material Requirements Planning):** Calculates net requirements from gross demand minus available stock and supply, and creates procurement proposals (planned orders, purchase requisitions).

## Transaction Codes

| Transaction | Purpose |
|-------------|---------|
| ME21N / ME22N / ME23N | Create / change / display purchase order |
| ME51N / ME52N | Create / change purchase requisition |
| ME11 / ME12 | Create / change purchasing info record |
| ME01 / ME03 | Create / display source list |
| ME31K / ME32K | Create / change contract |
| ME31L / ME32L | Create / change scheduling agreement |
| MIGO | Goods receipt, goods issue, transfer posting |
| MIRO | Logistics invoice verification |
| MR11 | Maintain GR/IR clearing account |
| MD01 / MD02 | MRP run (total / individual, regenerative) |
| MD04 | Stock/requirements list (MRP situation) |
| MD21 | Planning file entries (MRP) |
| MMBE | Stock overview (multi-level) |
| MB52 | Warehouse stocks of material |
| MM60 | Inventory turnover |
| MI01 / MI04 / MI07 | Create / enter / post physical inventory |
| BP | Business Partner master (S/4HANA) |
| MK01 / XK01 | Create vendor (ECC — deprecated in S/4HANA) |
| MKVZ | Vendor list / evaluation |

## Key Tables and CDS Views

| Object | Type | Description |
|--------|------|-------------|
| EKKO | Table | Purchase order header |
| EKPO | Table | Purchase order items |
| EBAN | Table | Purchase requisition items |
| EKET | Table | PO delivery schedule lines |
| EINA / EINE | Table | Purchasing info record general / purchasing org data |
| MSEG | Table | Material document line items (goods movements) |
| MKPF | Table | Material document header |
| RSEG | Table | Invoice document line items (MIRO) |
| RBKP | Table | Invoice document header (MIRO) |
| MARA / MARC / MARD | Table | Material master general / plant / storage location |
| MBEW | Table | Material valuation (per plant) |
| I_PurchaseOrder | CDS | Released VDM — purchase order header |
| I_PurchaseOrderItem | CDS | Released VDM — purchase order items |
| I_PurchaseRequisitionItem | CDS | Released VDM — purchase requisition items |
| I_MaterialDocumentItem | CDS | Released VDM — goods movement line items |
| I_SupplierInvoiceItemAPI01 | CDS | Released VDM — supplier invoice items |
| C_PURCHASEORDERITEMQ | CDS | Consumption VDM — PO analytics |

## Procure-to-Pay (P2P)

### Standard P2P Flow
1. **Purchase Requisition (ME51N):** Internal demand signal — generated manually or by MRP
2. **Source Determination:** Assign vendor from source list, contract, or quota arrangement
3. **RFQ / Quotation (ME41/ME47):** Optional — competitive bidding for non-contracted items
4. **Purchase Order (ME21N):** Legal commitment to vendor; references PR and source
5. **Goods Receipt (MIGO, MT 101):** Physical receipt; debits stock, credits GR/IR account
6. **Invoice Verification (MIRO):** Three-way match; debits GR/IR, credits vendor payable
7. **Payment (F110):** AP payment run clears vendor open items

### Three-Way Match Logic (MIRO)
- **Price match:** Invoice price vs. PO conditions — tolerance checked per tolerance key
- **Quantity match:** Invoice quantity vs. GR quantity — over/under delivery tolerance
- **If within tolerance:** Invoice posts automatically
- **If outside tolerance:** Invoice blocked for payment; requires approval workflow (MRBR release)

## Material Master Data

### Required Views by Business Process
| Business Process | Minimum Required Views |
|-----------------|----------------------|
| Purchasing only | Basic Data 1, Purchasing |
| MRP / Planning | + MRP 1, MRP 2 |
| Goods receipt / inventory | + Accounting 1 (valuation) |
| Production | + MRP 3, MRP 4, Work Scheduling |
| Product costing | + Costing 1, Costing 2 |

### Valuation Classes and Price Control
- Valuation class links material type to GL accounts (automatic account determination)
- Price control S (standard) — recommended for finished/semifinished goods with product costing
- Price control V (moving average) — recommended for raw materials and trading goods

## MRP

### MRP Run Types
| Parameter | MD01 | MD02 |
|-----------|------|------|
| Scope | All materials in plant (total MRP) | Single material or BOM explosion |
| Processing key | NEUPL (regenerative) / NETCH (net change) | Material-specific |
| Use case | Period-end full planning run | Ad-hoc demand changes, new materials |

### MRP Parameters (MRP 1 View)
- **MRP type:** PD (MRP), VB (reorder point), ND (no MRP)
- **Lot size:** EX (exact), WB (weekly), MB (monthly), FX (fixed)
- **Safety stock:** Buffer against demand/supply uncertainty
- **Reorder point:** Triggers procurement when stock falls below threshold (VB type only)

### MD04 — Stock/Requirements List
Real-time view of supply and demand situation for a material. Shows: opening stock, planned orders, purchase requisitions, purchase orders, sales orders, production orders, planned independent requirements.

## Inventory Management

### Physical Inventory
1. Create inventory document (MI01) — freezes book inventory
2. Count physical stock
3. Enter count results (MI04)
4. Post inventory differences (MI07) — adjusts book inventory to physical count

### Key Movement Types Reference
| MT | Description | Effect |
|----|-------------|--------|
| 101 | GR for PO | + unrestricted stock, - GR/IR |
| 201 | GI to cost center | - unrestricted stock, + cost center expense |
| 261 | GI to production order | - unrestricted stock, + production order |
| 301 | Plant-to-plant stock transfer | - sending plant, + receiving plant |
| 551 | Scrapping | - unrestricted stock, + scrap expense |

## Integration Points

| Module | Integration Description |
|--------|------------------------|
| FI | Goods receipt posts to stock account and GR/IR clearing (automatic account determination via OBYC). Invoice verification (MIRO) clears GR/IR and posts to vendor payable. Price differences post to price difference account or update moving average price. |
| PP | MRP-generated planned orders drive production. Goods issues to production orders (MT 261) consume stock. Production order completion (MT 101 from PP) posts finished goods to stock. |
| SD | Intercompany procurement: SD sales order in selling company triggers MM purchase order in supplying company. Delivery and billing flow between company codes. Goods issue for SD delivery uses MT 601. |
| EWM / WM | Physical stock managed in Extended Warehouse Management. MM posts logical goods movement; EWM/WM handles physical warehouse tasks (put-away, picking, transfer orders). |
| CO | Purchase price variances on standard-priced materials post to price difference accounts in CO. Activity allocation for warehouse operations can be linked to MM movements via internal orders. |

## Best Practices

1. **Maintain purchasing info records proactively** — they are the price reference for POs, MIRO tolerance checks, and vendor comparison reports.
2. **Use outline agreements (contracts/scheduling agreements)** for repeat procurement — reduces PO creation effort and enforces negotiated prices.
3. **Configure tolerance keys** (OMR6) aligned with business risk appetite — too tight creates excessive blocking; too loose loses the control value.
4. **Implement evaluated receipt settlement (ERS)** for high-volume, trusted vendors — system auto-creates MIRO from GR without paper invoice; eliminates invoice processing overhead.
5. **Monitor GR/IR clearing account aging weekly** — items older than 30 days indicate process failures (GR posted, invoice not received, or vice versa) that require resolution before period close.

## Procurement Scenarios

### Standard Procurement (PR → PO → GR → IR)
Complete P2P flow:
- PR creation (ME51N), account assignment (cost center/asset/order)
- RFQ optional (ME41) for new materials
- PO creation (ME21N), release strategy approval
- Goods receipt (MIGO, movement type 101) posts to stock + GR/IR clearing
- Invoice verification (MIRO), three-way match: PO qty = GR qty = IR qty
- Document types: NB (standard), FO (framework), UB (stock transfer)

### Contract Release Order
Outline agreements with release orders:
- Value contract (ME31K) — e.g., "€500,000 for Q1 services"
- Quantity contract — e.g., "10,000 units of material X"
- Scheduling agreement (ME31L) with delivery schedule
- Release order references the contract, tracks consumption against target
- No re-approval per release once contract approved

### Third-Party Order
Direct vendor-to-customer delivery (no inventory touch):
- Sales order with item category TAS
- Schedule line category CS triggers PR automatically
- PR converted to PO with shipping address = customer
- Vendor ships directly to customer, sends ASN
- IR creates vendor payable; customer invoice from SD billing
- No goods movement in MM

### Consignment
Vendor-owned stock held at buyer's plant:
- Consignment info record (ME11) with consignment conditions
- Consignment PO (ME21N, item category K)
- Goods receipt (MIGO, MvT 101) — stock held as K (consignment)
- Consumption triggers KB movement (consignment to plant stock) + liability
- Monthly settlement (MRKO) generates vendor invoice

### Subcontracting
Vendor processes buyer-provided components:
- BOM for subcontracted material (CS01)
- PO with item category L (subcontracting)
- Provide components: MB1B movement type 541 (transfer to vendor stock O)
- GR of finished material: MIGO 101 auto-consumes components (MvT 543)
- Three-way match on PO value (service fee, not material value)

## Release Strategy Configuration

Release strategies control procurement approval workflow:
- **Release group** — document class (M3 for PR, M1 for PO)
- **Release code** — approver role (K1 = Dept Head, K2 = Plant Manager)
- **Release indicator** — effect of release (can change, locked, etc.)
- **Release prerequisite** — sequence of approvals

Typical PR release strategy by value:
| PR Value | Approvers Required |
|----------|-------------------|
| < €1,000 | None (auto-release) |
| €1,000 - €10,000 | Department Head |
| €10,000 - €100,000 | Dept Head + Plant Manager |
| > €100,000 | All above + Finance Director |

Configuration: OMGS (characteristic values), OMGQ (classification). Assignments via PFCG role.

## Material Master Views Detail

| View | Purpose | Required For |
|------|---------|-------------|
| Basic Data 1 | General attributes, base UoM | All materials |
| Basic Data 2 | Additional descriptions | All materials |
| Purchasing | Purchasing group, order unit | Procured materials |
| Purchase Order Text | Free text shown on PO | Optional |
| Foreign Trade | Export/import commodity code | International |
| MRP 1 | MRP type, controller, lot-sizing | MRP-relevant |
| MRP 2 | Procurement type, scheduling margins | MRP-relevant |
| MRP 3 | Forecasting, planning strategy | MRP-relevant |
| MRP 4 | BOM selection, repetitive mfg | Production |
| Forecasting | Forecast models, history | Deterministic |
| Work Scheduling | Production scheduler | Made-in-house |
| Plant Data/Storage | Storage conditions, temperature | All materials |
| Warehouse Management | Bin, storage type | WM/EWM managed |
| Accounting 1 | Valuation class, price control | All valuated |
| Accounting 2 | Standard price, moving avg | All valuated |
| Costing 1 | Costing variant, lot size | Product costing |
| Costing 2 | Cost component split | Product costing |

## MRP Parameters Reference

| Parameter | Option | Meaning |
|-----------|--------|---------|
| MRP Type | PD | Deterministic MRP |
| MRP Type | VB | Manual reorder point |
| MRP Type | V1 | Automatic reorder point |
| Lot-Sizing | EX | Lot-for-lot (exact) |
| Lot-Sizing | FX | Fixed lot size |
| Lot-Sizing | WB | Weekly lot |
| Planning Strategy | 10 | Make-to-stock |
| Planning Strategy | 20 | Make-to-order |
| Planning Strategy | 40 | Planning with final assembly |
| Planning Strategy | 52 | Planning without final assembly |
| Safety Stock | Quantity | Buffer against variability |
| Reorder Point | Quantity | Replenishment trigger |

## Common MM Issues

- **Material ledger activation is irreversible** — Changes costing/valuation approach; evaluate carefully before turning on
- **Batch management activation is one-way** — Cannot be deactivated once active; impacts all processes
- **Split valuation complications** — Multiple valuation types per material multiplies config complexity
- **Source list mandatory (OME5)** — If mandatory, PO creation blocked without a valid source; check OME5 config
- **Output determination failures** — Check NAST table for output status, MN04 for condition records, MN21 for output type config

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Material master views confirmed complete for all intended business processes before procurement begins
- [ ] Three-way match configuration reviewed — tolerance keys, blocking reasons, and release workflow confirmed
- [ ] Purchase orders reference source determination (contract, source list, or documented exception)
- [ ] MRP master data (BOM, routing, info record, planning parameters) verified complete before MRP run
- [ ] GR/IR clearing account monitoring process defined and assigned to an owner for period-end
- [ ] Business Partner model confirmed active in S/4HANA (BP transaction) vs. ECC (MK01/XK01)

**Evidence required:** Material master view list, MIRO tolerance key configuration, MD04 stock/requirements list showing correct MRP output — not generic MM descriptions.

## Next Skill

After completing MM work, invoke:
- `fi` — For GR/IR clearing, invoice posting to FI, and period-end close
- `co` — For purchase price variances, material ledger, and cost object assignments
- `verification-before-completion` — Before closing any MM deliverable

## Related Skills

- `fi` — Financial Accounting: GR/IR clearing, invoice verification postings, AP payment
- `co` — Controlling: purchase price variances, material ledger, production order costs
- `sd` — Sales and Distribution: intercompany procurement, goods issue for delivery
- `ewm` — Extended Warehouse Management: physical goods movements, put-away, picking
- `analytics` — MM reporting: purchase order analytics, inventory analysis CDS views
- `abap-cloud` — Custom MM enhancements: BAdIs for pricing, output, and GR processing
