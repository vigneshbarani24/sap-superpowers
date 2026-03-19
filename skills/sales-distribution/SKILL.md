---
name: sales-distribution
description: Use when working with SAP Sales & Distribution (SD) — order management, pricing, availability check, billing, shipping, or output management. Provides process flows, key tcodes, and SAP references.
---

# SAP Sales & Distribution (SD)

End-to-end reference for SAP SD processes, configuration, and S/4HANA changes.

## Content Routing

| If the question involves … | Jump to |
|---|---|
| Org structure, enterprise structure | §1 Organizational Structure |
| Order lifecycle, sales documents | §2 Order-to-Cash Process |
| Condition records, pricing logic | §3 Pricing |
| Stock check, ATP, backorders | §4 Availability Check |
| Delivery, picking, goods issue | §5 Shipping & Delivery |
| Invoice, credit/debit memo | §6 Billing |
| Print output, email, EDI | §7 Output Management |
| Key transaction codes | §8 Key Transactions |
| S/4HANA migration differences | §9 S/4HANA Changes |

---

## §1 Organizational Structure

SD org units are assigned in Enterprise Structure (SPRO) and control document determination, pricing, and reporting.

| Org Unit | Purpose | Example |
|---|---|---|
| **Sales Organization** | Highest SD unit; owns sales documents and conditions | 1000 – Domestic Sales |
| **Distribution Channel** | Route to market | 10 – Direct, 20 – Wholesale |
| **Division** | Product grouping within a sales org | 01 – Pumps, 02 – Lighting |
| **Sales Area** | Combination of Sales Org + Dist. Channel + Division | 1000/10/01 |
| **Sales Office** | Regional office | New York, London |
| **Sales Group** | Team of sales reps within an office | Team A |
| **Shipping Point** | Origin for outbound delivery (Logistics Execution) | SP01 – Warehouse East |
| **Plant** | Delivering plant assigned to sales org/dist. channel | 1000 |

Assignment path: Sales Org → Company Code; Plant → Sales Org / Dist. Channel.

---

## §2 Order-to-Cash Process

```
Inquiry (VA11) → Quotation (VA21) → Sales Order (VA01)
    → Delivery (VL01N) → Goods Issue (VL02N)
        → Billing (VF01) → Accounting (FI posting)
            → Payment (F-28 / incoming payment)
```

| Step | Doc Type | Key Fields | Notes |
|---|---|---|---|
| Inquiry | IN | Sold-to, material, qty | Non-binding; no ATP |
| Quotation | QT | Validity dates, pricing | Binding offer; reference for order |
| Sales Order | OR | Schedule lines, delivery date | Triggers ATP, pricing, credit check |
| Delivery | LF | Picking, packing, GI date | Created from order via VL01N or delivery due list (VL04) |
| Goods Issue | GI posting | Movement type 601 | Reduces inventory, creates accounting doc |
| Billing | F2 (invoice) | Billing date, payer | Created from delivery or order; posts to FI |
| Payment | Incoming payment | Clearing against open AR | F-28 or automatic via F110 |

Copy control (VTAA, VTLA, VTFA) governs how data flows between document types.

---

## §3 Pricing

Pricing uses the **Condition Technique**: Access Sequence → Condition Type → Condition Table → Pricing Procedure.

| Concept | Description |
|---|---|
| **Condition Type** | Defines a price element (PR00 = Price, K004 = Material Discount, MWST = Tax) |
| **Access Sequence** | Ordered list of condition tables searched for a condition record |
| **Condition Table** | Key combination (e.g., Sales Org / Material) stored in KOMK/KOMP |
| **Pricing Procedure** | Sequence of condition types applied to a document; assigned via Sales Area + Doc Pricing Proc + Customer Pricing Proc |
| **Condition Record** | Master data entry (VK11/VK12) with amount, validity, scales |

Determination chain: **Sales Area + Doc Pricing Procedure + Customer Pricing Procedure → Pricing Procedure** (V/08).

Important config transactions: V/05 (condition types), V/06 (pricing procedures), V/07 (access sequences).

---

## §4 Availability Check

| Concept | Description |
|---|---|
| **ATP Check** | Available-to-Promise; compares requirements against receipts (stock, POs, production orders) |
| **Checking Rule** | Controls which business transaction triggers the check (A = sales order, B = delivery) |
| **Checking Group** | Material master setting (MRP 3 view) that activates the check |
| **Scope of Check** | Combination of checking group + checking rule; defines which supply/demand elements are included |
| **Replenishment Lead Time** | Used when no ATP quantity exists; check looks forward by this time |
| **Transfer of Requirements** | Schedule line category determines if requirement is passed to MRP (e.g., CP creates requirement) |

Config path: SPRO → Sales and Distribution → Basic Functions → Availability Check.

Transaction **CO06** displays ATP situation; **MD04** shows MRP stock/requirements list.

---

## §5 Shipping & Delivery

| Element | Details |
|---|---|
| **Delivery Type** | LF (standard), LR (return), NL (replenishment) |
| **Shipping Point Determination** | Based on shipping condition (customer) + loading group (material) + delivering plant |
| **Route Determination** | Country/zone of departure + country/zone of destination + shipping condition + transport group |
| **Picking** | Warehouse-managed (WM/EWM) or lean WM; transfer order created via LT03 |
| **Packing** | Handling units (HU); pack materials into shipping units via VL02N packing tab or HU01 |
| **Goods Issue** | Posts movement type 601; triggers inventory reduction, COGS posting, and billing relevance |
| **Transportation** | Shipment document (VT01N); groups deliveries by route, carrier, and dates |
| **Proof of Delivery (POD)** | Confirms quantities received by customer; updates delivery (VLPOD) |

Delivery due list (**VL04**) is the mass-processing workhorse for creating deliveries from open orders.

---

## §6 Billing

| Element | Details |
|---|---|
| **Billing Type** | F2 (invoice), G2 (credit memo), L2 (debit memo), S1 (cancellation), F8 (pro forma) |
| **Billing Due List** | VF04 — mass billing based on billing date, sold-to, or other criteria |
| **Invoice Split** | Controlled by copy control split criteria (e.g., different payers, incoterms, payment terms trigger separate invoices) |
| **Account Determination** | VKOA — maps Cond. Type + Chart of Accts + Acct Key → GL account |
| **Revenue Recognition** | Event-based or time-based; controlled via revenue recognition keys in the material master; in S/4HANA use IFRS 15 via RAR |
| **Rebate Processing** | Condition type BO01–BO05; settlement via VBO1; requires rebate agreement (VB01) |
| **Intercompany Billing** | IV (intercompany invoice) created automatically when delivering plant belongs to a different company code |

---

## §7 Output Management

### Classic Output (ECC / Compatibility Mode)
- Config via **NACE** (application V1 = sales, V2 = shipping, V3 = billing).
- Output types (e.g., BA00 = Order Confirmation) determined by condition technique.
- Medium: 1 = Print, 5 = EDI, 7 = SAPscript fax, 8 = SAP Smart Forms / Adobe Forms.

### S/4HANA Output Management Framework
- Replaces NACE for new implementations on S/4HANA.
- Uses **BRF+** (Business Rule Framework) for output determination.
- Output types managed in app **Maintain Output Rules** (Fiori).
- Supports Adobe Forms, email, EDI via output parameter determination.
- Post-processing framework (PPF) remains for some logistics scenarios.

Migration note: Classic NACE still works in S/4HANA (compatibility), but SAP recommends the new framework for greenfield projects.

---

## §8 Key Transactions

| TCode | Description | Area |
|---|---|---|
| VA01 / VA02 / VA03 | Create / Change / Display Sales Order | Order |
| VA11 / VA21 | Create Inquiry / Quotation | Pre-sales |
| VL01N / VL02N / VL03N | Create / Change / Display Delivery | Shipping |
| VL04 | Delivery Due List (mass create deliveries) | Shipping |
| VT01N / VT02N | Create / Change Shipment | Transportation |
| VF01 / VF02 / VF03 | Create / Change / Display Billing Doc | Billing |
| VF04 | Billing Due List | Billing |
| VK11 / VK12 / VK13 | Create / Change / Display Condition Record | Pricing |
| V/06 | Maintain Pricing Procedure | Pricing Config |
| V/08 | Pricing Procedure Determination | Pricing Config |
| VKOA | Revenue Account Determination | Billing Config |
| VB01 / VBO1 | Create Rebate Agreement / Settle Rebates | Rebates |
| CO06 | ATP Overview | Availability |
| NACE | Output Control (classic) | Output |
| ME21N | Create Purchase Order (3rd-party / STO) | Procurement |

---

## §9 S/4HANA Changes

| Area | ECC | S/4HANA |
|---|---|---|
| **Business Partner** | Separate customer (XD01) and vendor (XK01) masters | Unified Business Partner (BP); CVI synchronization |
| **Credit Management** | FD32, classic credit check | SAP Credit Management (UKM); Fiori apps, real-time scoring |
| **Advanced ATP (aATP)** | Basic ATP only | Product allocation, backorder processing, supply protection via aATP add-on |
| **Output Management** | NACE + condition-based output | BRF+ based output management framework; Fiori apps |
| **Simplified Data Model** | VBAK/VBAP/VBEP + multiple index tables | Index tables removed; CDS views replace ALV reports |
| **Condition Contract** | Rebates via VB01 | Condition Contract Management for rebates and settlements |
| **Billing** | VF01 classic | Billing engine unchanged; integration with RAR for IFRS 15 revenue recognition |
| **Fiori Apps** | GUI transactions | Manage Sales Orders (F1814), Create Sales Orders (F5765), and 200+ SD Fiori apps |

---

## References

### SAP Help Portal
- [SD Sales Processing (S/4HANA 2023)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a72e4b4b4b4a8f4b4e5c6d3b7c0e/4d9b7a6f3e6e4a0e9f0b0c1d2e3f4a5b.html) — Master reference for sales document types, copy control, and incompletion.
- [Output Management in S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/output-management) — BRF+ output determination, form templates, and channel configuration.

### SAP Notes
- **SAP Note 2220005** — Simplification list for S/4HANA (SD-relevant changes including removed transactions and table changes).
- **SAP Note 2267308** — Business Partner approach: customer/vendor integration (CVI) setup and migration guide.
- **SAP Note 1680410** — Advanced ATP (aATP) integration with SD: configuration and troubleshooting.
- **SAP Note 2408073** — S/4HANA Output Management: migration from classic NACE to BRF+ framework.
