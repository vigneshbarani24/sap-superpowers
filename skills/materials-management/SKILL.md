---
name: materials-management
description: Use when working with SAP Materials Management (MM) — procurement, inventory management, invoice verification, MRP, or material master. Provides process flows, key tcodes, and SAP references.
---

# SAP Materials Management (MM)

Reference skill for SAP MM -- procurement, inventory, invoice verification, MRP, and material master.

## Content Routing

| If the user asks about... | Jump to section |
|---------------------------|-----------------|
| Org structure, plant, purchasing org | Organizational Structure |
| Purchase requisition, PO, RFQ, sourcing | Procurement Process |
| Material types, views, MRP views | Material Master |
| Goods receipt, goods issue, transfers, movement types | Inventory Management |
| MIRO, invoice posting, 3-way match | Invoice Verification |
| MRP run, lot sizing, planning strategies | MRP |
| Stock reports, purchase order reports | Reporting |
| S/4HANA migration, Fiori apps, BP | S/4HANA Changes |

## 1. Organizational Structure

| Element | Purpose | Example |
|---------|---------|---------|
| **Client** | Highest organizational level | 100 |
| **Company Code** | Legal entity for financial accounting | 1000 |
| **Plant** | Manufacturing or distribution facility | 1000 |
| **Storage Location** | Physical subdivision of plant inventory | 0001 |
| **Purchasing Organization** | Procures materials for one or more plants | 1000 |
| **Purchasing Group** | Buyer or group of buyers responsible for procurement | 001 |

Key assignments: Purchasing Organization -> Company Code -> Plant -> Storage Location. A purchasing organization can be assigned at plant level (plant-specific) or company code level (cross-plant).

## 2. Procurement Process

```
PR (ME51N) -> RFQ (ME41) -> Quotation (ME47) -> PO (ME21N) -> GR (MIGO 101) -> IR (MIRO)
```

| Step | Tcode | Description |
|------|-------|-------------|
| Purchase Requisition | ME51N | Internal request to procure material or service |
| RFQ | ME41 | Request for Quotation sent to vendors |
| Quotation Comparison | ME49 | Price comparison across vendor quotations |
| Source Determination | ME05 | Assign source of supply via source list or info records |
| Purchase Order | ME21N | Commitment to vendor; triggers procurement |
| Goods Receipt | MIGO (mvt 101) | Receive material into plant/storage location |
| Invoice Receipt | MIRO | Post vendor invoice against PO and GR |
| Payment | F-53 / F110 | Vendor payment (FI process) |

**Source determination priority:** Quota arrangement -> Source list -> Outline agreements -> Info records.

## 3. Material Master

### Material Types

| Type | Key | Description |
|------|-----|-------------|
| Raw Material | ROH | Input materials for production |
| Finished Good | FERT | Produced goods for sale |
| Semi-Finished | HALB | Intermediate products |
| Trading Good | HAWA | Purchased and resold without modification |
| Operating Supplies | HIBE | Consumables not directly in production |
| Services | DIEN | External services |

### Key Views

| View | Org Level | Purpose |
|------|-----------|---------|
| Basic Data | Client | Description, UoM, material group |
| Purchasing | Plant / POrg | Purchasing group, order unit, tolerance |
| MRP 1-4 | Plant | MRP type, lot size, reorder point, safety stock |
| Accounting | Plant / Valuation Area | Price control (S/V), moving average, standard price |
| Storage | Plant / SLoc | Storage conditions, bin |
| Sales | Sales Org / Dist Channel | Delivering plant, tax classification |

**Industry sectors** determine which views are available: Plant engineering (A), Chemical (C), Mechanical (M), Pharma (P), Retail (R), etc.

## 4. Inventory Management

### Goods Movement Types

| Mvt Type | Description | Reversal |
|----------|-------------|----------|
| 101 | Goods receipt for PO | 102 |
| 103 | GR into blocked stock | 104 |
| 201 | Goods issue to cost center | 202 |
| 261 | Goods issue for production order | 262 |
| 301 | Transfer posting plant to plant (1-step) | 302 |
| 309 | Transfer posting material to material | 310 |
| 311 | Transfer posting SLoc to SLoc (1-step) | 312 |
| 501 | GR without PO (free goods) | 502 |

### Stock Types

| Type | Description |
|------|-------------|
| Unrestricted-use | Available for consumption or sale |
| Blocked | Held for quality or other issues |
| Quality Inspection | Pending quality decision |
| In Transit | Between two plants (2-step transfer) |
| Consignment | Vendor-owned stock at customer plant |

Key tcode: **MMBE** (stock overview), **MB52** (warehouse stocks).

## 5. Invoice Verification

**Tcode:** MIRO (post invoice), MIR4 (display), MIR6 (invoice overview).

### 3-Way Match

| Document | Checks |
|----------|--------|
| Purchase Order | Price, quantity ordered |
| Goods Receipt | Quantity received |
| Invoice | Vendor billed amount |

The system compares all three. Variances outside configured tolerances trigger blocks.

### Tolerance Keys

| Key | Description |
|-----|-------------|
| PP | Price variance |
| AP | Amount percentage |
| AN | Amount absolute |
| BD | Small differences (auto-accepted) |
| DW | Quantity variance (GR-based IV) |

Configure tolerances via **OMR6**. Blocked invoices are released via **MRBR**.

### GR/IR Clearing

Account GR/IR (WRX) is balanced when both GR and IR are posted. Use **MR11** to clear open GR/IR balances at period-end.

## 6. MRP (Material Requirements Planning)

### MRP Types

| Type | Description |
|------|-------------|
| PD | MRP (deterministic, based on requirements) |
| VB | Reorder point planning (consumption-based) |
| VV | Forecast-based planning |
| ND | No planning |

### Lot Sizing

| Procedure | Key | Logic |
|-----------|-----|-------|
| Lot-for-lot | EX | Order exactly what is needed |
| Fixed lot size | FX | Always order a fixed quantity |
| Period lot size | (various) | Group requirements by day/week/month |

### Planning Strategies

| Strategy | Number | Use Case |
|----------|--------|----------|
| Make-to-stock | 10 | Standard finished goods |
| Make-to-order | 20 | Customer-specific production |
| Planning with final assembly | 40 | Assemble on demand |
| Consumption-based | 52 | Reorder point with forecast |

**MRP Run:** Execute via **MD01** (single-item) or **MDBT** (background MRP run for plant). Review results in **MD04** (stock/requirements list).

## 7. Reporting

| Tcode | Report | Description |
|-------|--------|-------------|
| ME2M | POs by material | Purchase order line items filtered by material |
| ME2N | POs by PO number | Purchase order monitor |
| ME5A | Purchase requisitions | List of PRs with status |
| MB52 | Warehouse stocks | Stock values by plant/SLoc/batch |
| MMBE | Stock overview | Multi-level stock view per material |
| MC.9 | Inventory analysis | INVCO: inventory turnover, slow movers |
| MD04 | Stock/requirements list | MRP element list for a material |
| ME80FN | Purchasing reporting | Flexible PO analysis |

## Key Transactions Table

| Tcode | Description | Area |
|-------|-------------|------|
| ME51N | Create purchase requisition | Procurement |
| ME21N | Create purchase order | Procurement |
| ME41 | Create RFQ | Procurement |
| ME31K | Create contract | Procurement |
| ME11 | Create purchasing info record | Master Data |
| MM01 | Create material master | Master Data |
| MM02 | Change material master | Master Data |
| MIGO | Goods movement (all types) | Inventory |
| MIRO | Enter incoming invoice | Invoice Verification |
| MRBR | Release blocked invoices | Invoice Verification |
| MR11 | GR/IR clearing | Invoice Verification |
| MD01 | MRP single-item run | MRP |
| MDBT | MRP background run | MRP |
| MD04 | Stock/requirements list | MRP |
| OMSY | Movement type configuration | Customizing |

## S/4HANA Changes

| Area | ECC | S/4HANA |
|------|-----|---------|
| Vendor Master | LFA1/LFB1 (XK01) | Business Partner (BP) with supplier role |
| Stock Tables | MARD, MCHB, MKOL, etc. | Simplified to MATDOC (single document table), MARA/MARC retained |
| Material Doc | MKPF + MSEG | Single table MATDOC |
| Fiori Procurement | ME21N (GUI) | F0842A (Manage Purchase Orders), F1943 (Create Purchase Requisition) |
| Fiori Inventory | MIGO (GUI) | F2513 (Post Goods Receipt), F3893 (Manage Stock) |
| MRP | MD01/MDBT | MRP Live (MD01N) with ppMRP for parallel processing |
| Central Procurement | N/A | SAP Ariba / Central Procurement hub |

**Key Fiori apps:** Manage Purchase Orders (F0842A), Monitor Purchase Order Items (F0344), Track Purchase Order (F2886).

## References

### SAP Help Portal
- [MM - Procurement overview](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f77bab507aea40c5adab8048071a5a9e) -- S/4HANA procurement documentation
- [Inventory Management](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/818045b01a3b4adabd0add2fcdc2e5e2) -- Goods movements and stock management

### SAP Notes
- **SAP Note 2267308** -- Simplification list for S/4HANA (MM-relevant changes to stock tables and material documents)
- **SAP Note 2340562** -- MRP Live: prerequisites, setup, and performance tuning for MD01N
- **SAP Note 1750631** -- Business Partner approach: vendor migration from LFA1 to BP
