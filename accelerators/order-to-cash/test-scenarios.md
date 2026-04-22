# Order-to-Cash — Pre-Built Test Scenarios

## Test Coverage Summary

| Category | Scenarios | Priority |
|----------|----------|----------|
| Happy Path | 8 | P1 — Must pass |
| Negative / Error | 6 | P1 — Must pass |
| Edge Cases | 8 | P2 — Should pass |
| Integration | 5 | P1 — Must pass |
| Performance | 3 | P3 — Nice to have |
| **Total** | **30** | |

## Happy Path Scenarios (P1)

| ID | Scenario | Steps | Expected Result |
|----|----------|-------|----------------|
| TC-HP-01 | Standard order → delivery → billing | VA01 (OR, 3 items) → VL01N → VL02N (GI) → VF01 | Invoice created, FI document posted, revenue + receivable posted |
| TC-HP-02 | Quotation → order with reference | VA21 → VA01 with ref to quotation | All pricing/text copied. Quotation status updated. |
| TC-HP-03 | Partial delivery (2 of 3 items available) | VA01 → VL01N (partial) → VL02N (GI) → VF01 | Partial delivery billed. Remaining items on backorder. |
| TC-HP-04 | Credit memo with reference to invoice | VA01 (CR) ref invoice → VF01 | Credit memo posted. Customer account credited. |
| TC-HP-05 | Return order with return delivery | VA01 (RE) → VL01N (LR) → VL02N (GR) → VF01 (credit) | Stock returned. Credit memo posted. |
| TC-HP-06 | Cash payment application | F-28 against open invoice | Invoice cleared. Payment difference within tolerance. |
| TC-HP-07 | Dunning run on overdue invoices | F150 → Execute dunning | Dunning notices generated for overdue items at correct levels |
| TC-HP-08 | Free-of-charge delivery (samples) | VA01 (item category TANN) → VL01N → VL02N | Delivery created, no billing, goods issue posted |

## Negative / Error Scenarios (P1)

| ID | Scenario | Steps | Expected Result |
|----|----------|-------|----------------|
| TC-NE-01 | Credit block at order entry | VA01 for customer exceeding credit limit | Order saved with credit block. Delivery blocked until release. |
| TC-NE-02 | ATP failure (out of stock) | VA01 for material with zero stock, no replenishment | Delivery date pushed. Backorder processing triggered. |
| TC-NE-03 | Pricing error (missing condition record) | VA01 for material without condition records | Incomplete order. Error message in incompletion log. |
| TC-NE-04 | Billing block on delivery | Delivery with billing block → VF04 | Billing not created. Item remains in billing due list. |
| TC-NE-05 | Payment posting to wrong customer | F-28 with incorrect customer number | Error or warning. Payment not cleared against wrong invoices. |
| TC-NE-06 | Goods issue reversal | VL09 reverse goods issue after billing | GI reversed. Stock restored. Billing document reversed if applicable. |

## Edge Cases (P2)

| ID | Scenario | Steps | Expected Result |
|----|----------|-------|----------------|
| TC-EC-01 | Split delivery across plants | VA01 with items from different plants | Separate deliveries per plant. Each billed individually. |
| TC-EC-02 | Multi-currency order (foreign currency) | VA01 in USD for EUR-based company | Currency conversion at document rate. FI posting in both currencies. |
| TC-EC-03 | Intercompany sale | VA01 selling company ≠ delivering company | Intercompany billing created automatically. Two FI postings. |
| TC-EC-04 | Third-party order (drop ship) | VA01 item category TAS → ME21N auto PO | PO created to vendor. Vendor delivers to customer. |
| TC-EC-05 | Consignment fill-up and issue | VF01 consignment fill → VKE1 consignment issue | Stock at customer moves from consignment to sold. |
| TC-EC-06 | Batch-managed material with FIFO | VA01 → VL01N (batch determination FIFO) | Oldest batch assigned first. |
| TC-EC-07 | Zero-value invoice (free goods) | VA01 with 100% discount condition | Delivery and billing created. FI posting with zero net value. |
| TC-EC-08 | Retroactive pricing change | VA05 mass update after condition change | Orders repriced. Billing adjustment or credit/debit memo. |

## Integration Scenarios (P1)

| ID | Scenario | Integration | Expected Result |
|----|----------|-------------|----------------|
| TC-IN-01 | Order to FI posting | SD → FI | Billing creates FI document. Revenue account + receivable correct. |
| TC-IN-02 | Order to CO-PA | SD → CO | CO-PA document created at billing with margin analysis. |
| TC-IN-03 | Goods issue to inventory | SD → MM | Stock reduced. COGS posted. Material document created. |
| TC-IN-04 | MTO order triggers production | SD → PP | Requirements transferred. Planned/production order created. |
| TC-IN-05 | Order to bank statement clearing | SD → FI → Bank | Payment clears receivable. Bank reconciliation matches. |

## Performance Scenarios (P3)

| ID | Scenario | Volume | Threshold |
|----|----------|--------|-----------|
| TC-PF-01 | Mass order creation | 1,000 orders via BAPI | < 30 minutes batch time |
| TC-PF-02 | Billing due list processing | 5,000 deliveries | < 45 minutes batch time |
| TC-PF-03 | Dunning run | 50,000 customer items | < 60 minutes batch time |
