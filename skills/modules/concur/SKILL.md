---
name: concur
description: Use when working with SAP Concur — Concur Expense, Concur Travel, Concur Invoice, Concur Request, expense policy configuration, receipt management, travel booking, approval workflows, integration with S/4HANA FI, audit rules, or compliance monitoring.
---

# SAP Concur

This skill enforces correct Concur implementation practices, ensuring that audit rules are configured before go-live, expense policies are fully defined for all categories, and integration posting to FI is validated with every expense type — because an expense report that posts incorrectly to the general ledger is worse than one that does not post at all.

## Content Routing

| Topic | Section |
|-------|---------|
| Concur Expense | Concur Expense |
| Concur Travel | Concur Travel |
| Concur Invoice | Concur Invoice |
| Concur Request (pre-approval) | Concur Request |
| Expense policy configuration | Expense Policy Configuration |
| Receipt management | Receipt Management |
| Approval workflows | Approval Workflows |
| Integration with S/4HANA FI | Integration with S/4HANA |
| Audit rules and compliance | Audit Rules and Compliance |
| Concur APIs | Concur APIs |

## Iron Laws

1. **ALWAYS CONFIGURE AUDIT RULES BEFORE GO-LIVE.** Audit rules are the automated policy enforcement layer. Going live without audit rules means every expense is trusted at face value. Configure duplicate detection, receipt requirement thresholds, per diem limits, and policy violation flags before the first expense report is submitted.
2. **NEVER SKIP POLICY CONFIGURATION FOR EXPENSE CATEGORIES.** Every expense type (meals, lodging, mileage, airfare, ground transport, entertainment) needs explicit policy limits, receipt requirements, and approval routing. An undefined expense category is an uncontrolled spending category.
3. **ALWAYS TEST INTEGRATION POSTING TO FI WITH ALL EXPENSE TYPES.** Each expense type maps to a different GL account, cost center, and possibly WBS element or internal order. Test every expense type end-to-end: expense creation -> approval -> extraction -> SAE posting -> FI document verification. One missing mapping means that expense type fails in production.
4. **NEVER ALLOW EXPENSE SUBMISSION WITHOUT RECEIPT FOR AMOUNTS ABOVE THRESHOLD.** Receipt-less expense claims above the configured threshold (commonly $25-$75 per jurisdiction) are audit red flags. Configure receipt-required thresholds per expense type and enforce them with hard stops, not warnings.
5. **ALWAYS CONFIGURE DELEGATION RULES FOR APPROVERS.** Approvers travel, get sick, and go on vacation. Without delegation rules, expense reports queue indefinitely. Configure delegation, escalation timeouts, and backup approvers for every approval step.

## Concur Expense

### Core Capabilities
| Feature | Description |
|---------|-------------|
| Expense entry | Manual entry, receipt capture (OCR), credit card import |
| Receipt management | ExpenseIt OCR, e-receipts from vendors, receipt store |
| Policy enforcement | Real-time policy checks on entry, warnings and hard stops |
| Approval routing | Manager approval, finance review, compliance audit |
| Reimbursement | Payment via payroll, direct deposit, or check |
| Reporting | Spend analytics, compliance dashboards, trend analysis |

### Expense Report Flow
```
Expense Creation (manual/OCR/card import)
  → Itemization (detail breakdowns for lodging, meals)
  → Allocation (cost center, project, WBS element)
  → Submission (employee submits)
    → Approval (manager + additional approvers per policy)
      → Audit (automated rules + manual sampling)
        → Extraction (Standard Accounting Extract - SAE)
          → FI Posting (via integration to S/4HANA)
            → Reimbursement (payment processing)
```

### Expense Types Configuration
| Type | Typical Policy | GL Account Example |
|------|---------------|-------------------|
| Airfare | Advance booking requirement, class restrictions | 6300xx — Travel Air |
| Lodging | Per diem or actual with cap per city | 6301xx — Travel Lodging |
| Meals | Per diem by location or actual with daily cap | 6302xx — Meals & Entertainment |
| Mileage | IRS rate / HMRC rate, distance calculation | 6303xx — Mileage |
| Car Rental | Pre-approval required, size restrictions | 6304xx — Car Rental |
| Entertainment | Attendee list required, client name mandatory | 6310xx — Entertainment |
| Parking/Tolls | Receipt required above threshold | 6305xx — Parking |
| Internet/Phone | Business justification required | 6320xx — Communication |

## Concur Travel

### Booking Capabilities
| Channel | Description |
|---------|-------------|
| Online booking tool | Concur-embedded booking for air, hotel, car, rail |
| Travel agent | GDS-connected agency for complex itineraries |
| TripLink | Captures bookings made outside Concur (direct with vendor) |
| Mobile | Full booking capability on Concur mobile app |

### Travel Policy Enforcement
- Fare class restrictions (economy for domestic, business for 6+ hour flights)
- Hotel rate caps by city tier
- Advance booking requirements (14-day, 21-day advance purchase savings)
- Preferred vendor steering (negotiated corporate rates)
- Out-of-policy justification and approval requirements

### Travel Configuration
- Define travel policies per employee group (executive, staff, intern)
- Configure preferred vendor lists and corporate rate programs
- Set up pre-trip approval rules (Concur Request integration)
- Enable TripLink for capturing out-of-channel bookings

## Concur Request

### Pre-Approval Process
Concur Request enables pre-trip or pre-purchase approval before expenses are incurred.

### Use Cases
- Travel pre-approval (required for international travel, executive travel)
- Conference attendance approval
- Large purchase pre-authorization
- Budget availability check before commitment

### Request Flow
1. Employee creates request with estimated costs, dates, purpose
2. System checks budget availability (if integrated)
3. Approval workflow routes based on amount, category, destination
4. Approved request links to subsequent expense report for reconciliation

## Concur Invoice

### AP Automation
Concur Invoice (formerly Invoice Professional) automates the accounts payable process for non-PO invoices and payment requests.

### Key Features
| Feature | Description |
|---------|-------------|
| Invoice capture | OCR/AI extraction from email, scan, or supplier portal |
| Coding | GL account, cost center, project allocation |
| Approval routing | Amount-based and category-based workflows |
| Payment | Pay via Concur Pay (check, ACH, virtual card) |
| Vendor management | Vendor profile, bank details, tax ID (W-9/W-8) |

### Invoice vs. Expense
| Aspect | Concur Expense | Concur Invoice |
|--------|---------------|----------------|
| Payer | Employee (reimbursed) | Company (direct payment) |
| Use case | T&E spending | Vendor invoices, subscriptions |
| Receipts | Employee captures | Supplier submits |
| Approval | Manager + policy | Budget owner + AP |

## Receipt Management

### ExpenseIt (OCR)
- Employee photographs receipt with mobile app
- AI/OCR extracts: vendor name, date, amount, currency, expense type
- Auto-creates expense entry with extracted data
- Employee reviews and submits (correction if needed)

### E-Receipts
Direct electronic receipt from vendors (airlines, hotels, car rental, ride-share). Automatically matched to credit card transactions. No manual entry or paper receipt needed.

### Receipt Store
Cloud storage for all receipts. Linked to expense entries. Audit trail with timestamp and source (photo, email, e-receipt). Configurable retention period.

## Approval Workflows

### Approval Chain Configuration
| Level | Approver | Logic |
|-------|----------|-------|
| Level 1 | Direct manager | Employee's reporting hierarchy |
| Level 2 | Cost center owner | When expense allocated to different cost center |
| Level 3 | Finance reviewer | Amount threshold trigger (e.g., >$5,000) |
| Level 4 | Compliance audit | Random sampling + rule-triggered review |

### Workflow Rules
- **Amount-based:** Additional approval above threshold
- **Category-based:** Entertainment requires department head
- **Exception-based:** Out-of-policy items route to additional approver
- **Delegation:** Configurable absence delegation with time boundaries
- **Escalation:** Auto-escalation if approval pending beyond SLA (e.g., 5 business days)

## Expense Policy Configuration

### Policy Elements
| Element | Description |
|---------|-------------|
| Expense types | Define categories with GL mapping, receipt rules, limits |
| Spending limits | Per-transaction and per-day caps by category and location |
| Receipt requirements | Threshold amounts requiring receipt attachment |
| Per diem rates | Location-based daily allowances (GSA/HMRC rates) |
| Mileage rates | Per-mile/km rates with annual updates |
| Attendee rules | Entertainment requires attendee list with names and business purpose |
| Cash advance | Rules for advance request, reconciliation, and return |
| Personal car usage | Mileage rates, distance calculation method (Google Maps) |

### Multi-Country Considerations
- Per diem rates vary by country and city (GSA for US, HMRC for UK, custom for others)
- Tax reclaim rules (VAT recovery in EU requires itemized receipts)
- Currency handling (exchange rate source, conversion date)
- Local compliance requirements (Nota Fiscal in Brazil, Fapiao in China)

## Audit Rules and Compliance

### Automated Audit Rules
| Rule | Description |
|------|-------------|
| Duplicate detection | Same amount, date, vendor across expense reports |
| Receipt required | Flag entries above threshold without receipt |
| Per diem exceeded | Amount exceeds location-based per diem rate |
| Weekend/holiday | Expenses claimed on non-business days |
| Policy limit exceeded | Amount exceeds category spending cap |
| Itemization required | Hotel folios must be itemized (room, tax, incidentals) |
| Attendee required | Entertainment without attendee list |
| Circular distance | Mileage claim end point same as start point |

### Compliance Monitoring
- Random audit sampling (configurable percentage)
- Risk-based audit targeting (employees with prior violations)
- Compliance dashboard for finance team visibility
- Exception reports with aging (unresolved violations)

## Integration with S/4HANA

### Standard Accounting Extract (SAE)
The SAE is the standard extract format that moves approved expense data from Concur to the ERP for posting.

### Integration Architecture
| Component | Description |
|-----------|-------------|
| SAE Extract | Scheduled extract of approved reports from Concur |
| Integration middleware | CPI/BTP or Concur connector for S/4HANA |
| FI Posting | Create FI documents (vendor invoice or GL posting) |
| Cost allocation | Cost center, internal order, WBS element from expense coding |
| Employee mapping | Concur user -> S/4HANA employee/vendor number |
| Payment | Reimbursement via S/4HANA FI-AP payment run or payroll |

### Key Mapping Requirements
- Expense type -> GL account determination
- Concur policy -> S/4HANA company code
- Cost center/project codes -> S/4HANA cost objects
- Tax codes -> S/4HANA tax code for input tax reclaim
- Currency -> Exchange rate type and conversion logic
- Employee -> S/4HANA vendor master (employee vendor type CPD or named)

### Integration Testing Checklist
1. Test every expense type posts to correct GL account
2. Test multi-currency reports with exchange rate conversion
3. Test cost allocation split across multiple cost centers
4. Test tax code mapping for VAT-eligible expenses
5. Test cash advance reconciliation and clearing
6. Test rejection and return flows (reversed postings)
7. Test with realistic report volumes (batch performance)

## Concur APIs

### Key APIs
| API | Use Case |
|-----|----------|
| Expense v4 | Create, read, update expense reports and entries |
| Request v4 | Pre-approval request management |
| Invoice v3 | Invoice capture and processing |
| User v1 | User provisioning and profile management |
| List v4 | Manage custom lists (cost centers, projects) |
| Travel Profile v2 | Travel preferences and loyalty programs |

### Authentication
OAuth 2.0 with Company JWT and User JWT. Scopes control API access level. Rate limits apply per API endpoint.

## Best Practices

1. **Configure audit rules before go-live** — first batch of expense reports will establish behavioral norms
2. **Use ExpenseIt** — OCR reduces manual entry errors and accelerates submission
3. **Integrate credit card feeds** — auto-match transactions reduce duplicate claims
4. **Set up e-receipts** — hotel chains, airlines, and ride-share provide automatic receipts
5. **Review per diem rates annually** — rates change; outdated rates create policy violations
6. **Train employees on mobile app** — real-time receipt capture prevents lost receipt claims

## Anti-Patterns

- Going live without audit rules (first 90 days establish spending behavior patterns)
- Configuring expense types without GL account mapping (extraction fails for unmapped types)
- Allowing receipt-optional for all categories (weakens compliance posture)
- Skipping multi-currency testing (exchange rate issues surface only with international expenses)
- Implementing Concur without delegation rules (approver absence blocks reimbursement)

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct Concur module identified (Expense, Travel, Invoice, Request)
- [ ] Expense policy rules defined for all relevant categories
- [ ] Audit rules configured (duplicate detection, receipt requirements, limits)
- [ ] Approval workflow validated (routing, delegation, escalation)
- [ ] Integration with S/4HANA FI mapped (GL accounts, cost objects, tax codes, payment)
- [ ] Multi-country requirements addressed if applicable (per diem, VAT, currency)

**Evidence required:** Specific policy rules, audit rule configurations, GL account mappings, and integration test scenarios — not generic T&E descriptions.

## Next Skill

After completing this skill, invoke:
- `fi` — When GL account mapping, payment processing, or tax code configuration is the focus
- `integration-suite` — When CPI middleware for Concur-S/4HANA integration is needed
- `co` — When cost center allocation or internal order posting from expenses is the focus

## Cross-References

- `fi` — GL account determination, accounts payable, payment runs
- `co` — Cost center accounting, internal orders, WBS element allocation
- `integration-suite` — CPI for Concur integration middleware
- `sf` — Employee data synchronization for user provisioning
- `ariba` — Complementary: Ariba for procurement, Concur for T&E
