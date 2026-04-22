# Order-to-Cash Process Flow

## Standard Process (10 Steps)

```
[1] INQUIRY          Customer requests pricing/availability
     │                VA11 — Create Inquiry
     ▼
[2] QUOTATION        Formal price offer with validity period
     │                VA21 — Create Quotation
     ▼
[3] SALES ORDER      Customer commits — order created with pricing, ATP, credit check
     │                VA01 — Create Sales Order
     │                ├── Pricing determination (condition technique)
     │                ├── Availability check (ATP)
     │                ├── Credit check (automatic or manual block)
     │                └── Delivery scheduling (route → transit time → delivery date)
     ▼
[4] DELIVERY         Pick, pack, prepare for shipment
     │                VL01N — Create Outbound Delivery
     │                ├── Pick (transfer order from EWM or LT03 from WM)
     │                ├── Pack (HU management or manual)
     │                └── Load (shipment creation if TM active)
     ▼
[5] GOODS ISSUE      Inventory reduced, COGS posted
     │                VL02N — Post Goods Issue
     │                ├── Stock reduced (MSEG/MATDOC)
     │                ├── Accounting: Dr COGS / Cr Inventory
     │                └── Delivery status updated
     ▼
[6] BILLING          Invoice created from delivery or order
     │                VF01 — Create Billing Document
     │                ├── Pricing transferred from order
     │                ├── Tax calculated
     │                ├── Revenue posted: Dr Receivable / Cr Revenue
     │                └── Output triggered (invoice PDF/EDI)
     ▼
[7] ACCOUNTS         Invoice posted to customer account
     RECEIVABLE       FI document created automatically from billing
     │
     ▼
[8] PAYMENT          Customer pays against invoice
     │                F-28 — Post Incoming Payment
     │                ├── Partial payment handling
     │                ├── Payment differences (tolerance / residual items)
     │                └── Cash application (automatic or manual)
     ▼
[9] DUNNING          Overdue payment reminder process
     │                F150 — Dunning Run
     │                ├── Dunning levels (1-4 typically)
     │                ├── Dunning procedure per customer
     │                └── Output: dunning letter
     ▼
[10] CLOSING         Revenue recognition, accruals, reporting
                      Period-end: accrued revenue, provision for bad debt
```

## Decision Points

| Decision | Criteria | Path A | Path B |
|----------|---------|--------|--------|
| Skip inquiry/quotation? | Repeat customer, known pricing | Yes → Start at Sales Order | No → Start at Inquiry |
| Credit block? | Credit limit exceeded or score | Release → Continue delivery | Block → Hold for review |
| Make-to-stock vs. Make-to-order? | Item category, MRP type | MTS → ATP from stock | MTO → trigger production |
| Delivery split? | Multiple plants, partial availability | Single delivery | Split by plant/date |
| Billing type? | Milestone, delivery-based, periodic | Standard → per delivery | Other → per contract terms |
| Returns? | Customer initiates return | Create return order (RE) → return delivery → credit memo |

## Integration Points

| Integration | From | To | Trigger |
|-------------|------|----|---------|
| FI posting | Billing | FI | Automatic on billing release |
| CO-PA | Billing | CO | Margin analysis at billing |
| Inventory | Goods Issue | MM | Stock reduction at GI |
| Credit | Order creation | FI-AR | Credit check at order save |
| Production | Sales Order | PP | MTO/MTS requirement transfer |
| Shipping | Delivery | TM | Shipment creation from delivery |
| Warehouse | Delivery | EWM/WM | Pick request from delivery |

## Customization Notes

**Standard (pre-configured in accelerator):**
- Document types: OR (standard order), RE (return), CR (credit memo), DR (debit memo)
- Item categories: TAN (standard), TANN (free of charge), TAX (text)
- Pricing procedure: RVAA01 (standard) with common condition types
- Delivery type: LF (standard), LR (return)
- Billing type: F2 (invoice), RE (credit memo), G2 (debit memo)

**Client-specific (needs input):**
- [ ] Custom pricing conditions beyond standard
- [ ] Credit management rules and limits
- [ ] Specific partner functions and determinations
- [ ] Output formats (PDF layout, EDI formats)
- [ ] Revenue recognition rules (IFRS 15 specifics)
- [ ] Intercompany billing configuration
