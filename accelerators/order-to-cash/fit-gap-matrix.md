# Order-to-Cash — Pre-Built Fit/Gap Matrix

## Summary

| Classification | Count | % |
|---------------|-------|---|
| Fit (SAP standard) | 18 | 72% |
| Gap — Config | 4 | 16% |
| Gap — Enhancement | 2 | 8% |
| Gap — Development | 1 | 4% |
| **Total** | **25** | **100%** |

## Fit/Gap Detail

### Sales Order Management

| # | Requirement | Fit/Gap | Resolution | Effort |
|---|------------|---------|-----------|--------|
| O2C-01 | Create standard sales orders with multiple line items | **Fit** | Standard VA01 with doc type OR | — |
| O2C-02 | Copy from quotation to sales order | **Fit** | Standard copy control V → C | — |
| O2C-03 | Automatic pricing from master data conditions | **Fit** | Condition technique with pricing procedure | — |
| O2C-04 | ATP check at order entry | **Fit** | Availability check (checking group + checking rule) | — |
| O2C-05 | Automatic credit check at order save | **Fit** | SAP Credit Management (UKM) or classic FD32 | — |
| O2C-06 | Custom approval workflow for orders above threshold | **Gap — Config** | BRF+ business rules for order approval | S |
| O2C-07 | Customer-specific product catalog / pricing | **Gap — Config** | Customer-material info records + condition contracts | M |

### Delivery & Shipping

| # | Requirement | Fit/Gap | Resolution | Effort |
|---|------------|---------|-----------|--------|
| O2C-08 | Create outbound delivery from sales order | **Fit** | Standard VL01N, automatic or manual | — |
| O2C-09 | Pick, pack, goods issue process | **Fit** | WM/EWM integration, HU management | — |
| O2C-10 | Partial delivery (deliver available, backorder rest) | **Fit** | Delivery group, partial delivery indicator on schedule line | — |
| O2C-11 | Batch determination at delivery | **Fit** | Batch search strategy (OMCG) | — |
| O2C-12 | Carrier selection and shipment planning | **Gap — Config** | TM integration or basic shipment (VT01N) | M |
| O2C-13 | Proof of delivery capture | **Gap — Enhancement** | BAdI for POD confirmation, mobile integration | M |

### Billing & Revenue

| # | Requirement | Fit/Gap | Resolution | Effort |
|---|------------|---------|-----------|--------|
| O2C-14 | Invoice creation from delivery (delivery-based billing) | **Fit** | Standard VF01, billing due list VF04 | — |
| O2C-15 | Credit memo / debit memo processing | **Fit** | Standard doc types G2/L2 with reference to invoice | — |
| O2C-16 | Tax determination per country / region | **Fit** | Tax procedure with jurisdiction codes | — |
| O2C-17 | Revenue recognition (IFRS 15) | **Fit** | SAP Revenue Accounting (RAR) or classic event-based | — |
| O2C-18 | Intercompany billing (cross-company sales) | **Gap — Config** | Intercompany pricing, billing type IV | M |
| O2C-19 | Rebate/retrospective discount agreements | **Gap — Enhancement** | Condition contract management or custom rebate | L |

### Payment & Dunning

| # | Requirement | Fit/Gap | Resolution | Effort |
|---|------------|---------|-----------|--------|
| O2C-20 | Incoming payment processing | **Fit** | F-28 manual, F110 automatic payment clearing | — |
| O2C-21 | Automatic cash application from bank statement | **Fit** | Electronic bank statement + auto-matching rules | — |
| O2C-22 | Payment differences and tolerance handling | **Fit** | Tolerance groups (OBA4), reason codes | — |
| O2C-23 | Dunning process (4 levels) | **Fit** | Dunning procedure with escalation levels | — |
| O2C-24 | Customer account balance and aging reports | **Fit** | Standard FI reports (S_ALR_87012172) or Fiori apps | — |

### Reporting & Analytics

| # | Requirement | Fit/Gap | Resolution | Effort |
|---|------------|---------|-----------|--------|
| O2C-25 | Custom O2C dashboard with KPIs (DSO, OTIF, order backlog) | **Gap — Development** | CDS views + Fiori analytical list page or SAC story | L |

## Known Industry Variations

**[RETAIL]** Add: POS integration, markdown pricing, loyalty discounts, high-volume returns
**[AUTOMOTIVE]** Add: Scheduling agreements, JIT delivery, consignment stock, self-billing
**[PHARMA]** Add: Serialization at delivery, sample management, batch traceability, CoA with invoice
**[F&B]** Add: Catch weight pricing, shelf life check at delivery, FEFO picking

## Client-Specific Gaps (To Be Discovered)

| # | Area | Question for Client |
|---|------|-------------------|
| C-01 | Pricing | Any pricing models beyond standard condition technique? (e.g., formula-based, real-time market pricing) |
| C-02 | Credit | Specific credit scoring model or third-party integration? |
| C-03 | Output | Specific invoice formats, EDI requirements, e-invoicing mandates? |
| C-04 | Returns | Specific return policies, restocking fees, quality inspection on return? |
| C-05 | Integration | External systems for order capture (e-commerce, EDI, portal)? |
