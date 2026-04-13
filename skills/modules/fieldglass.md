---
name: fieldglass
description: Use when working with SAP Fieldglass — contingent workforce management, services procurement, Statement of Work (SOW), worker management lifecycle, rate card management, approval workflows, VMS reporting, or Fieldglass integration with S/4HANA.
---

# SAP Fieldglass

This skill enforces correct Fieldglass implementation practices, ensuring that rate cards are defined before worker onboarding, compliance validation is never skipped for contingent workers, and the VMS platform is configured to provide actual workforce visibility — not just transactional processing.

## Content Routing

| Topic | Section |
|-------|---------|
| Contingent workforce management | Contingent Workforce Management |
| Services procurement (SOW) | Services Procurement |
| Worker lifecycle | Worker Management Lifecycle |
| Rate card management | Rate Card Management |
| Approval workflows | Approval Workflows |
| Integration with S/4HANA | Integration with S/4HANA |
| Compliance management | Compliance Management |
| Reporting and analytics | VMS Reporting and Analytics |

## Iron Laws

1. **ALWAYS DEFINE RATE CARDS BEFORE WORKER ONBOARDING.** A contingent worker created without an approved rate card has no cost basis. Managers approve workers without knowing the cost impact. Rate cards with job category, location, and tenure-based rates must be established and supplier-acknowledged before any worker request is created.
2. **NEVER SKIP COMPLIANCE VALIDATION FOR CONTINGENT WORKERS.** Contingent workers require different compliance checks than employees — co-employment risk, tax classification (W-2 vs. 1099 / IR35), work authorization, background checks, client-specific certifications. Skipping compliance creates legal and financial liability.
3. **ALWAYS ENFORCE MAXIMUM TENURE POLICIES.** Contingent workers without tenure limits create co-employment risk. Configure maximum engagement durations by job category and jurisdiction. The system must alert and escalate when workers approach tenure limits.
4. **NEVER ALLOW DIRECT SOW CREATION WITHOUT SCOPING.** A Statement of Work without defined deliverables, milestones, acceptance criteria, and not-to-exceed amounts is a blank check. SOW creation must require scope documentation before supplier engagement.
5. **ALWAYS RECONCILE TIMESHEETS AGAINST RATE CARDS.** Timesheet approval without rate card validation means paying unapproved rates. The system must automatically apply the correct rate card to time entries and flag discrepancies.

## Contingent Workforce Management

### What Fieldglass Does
SAP Fieldglass is a Vendor Management System (VMS) that manages the full lifecycle of contingent (non-employee) workers and services procurement through external suppliers.

### Key Concepts
| Concept | Description |
|---------|-------------|
| Job Posting | Request for a contingent worker with job category, skills, location, duration |
| Worker | Individual contingent resource with profile, assignment, and compliance status |
| Supplier | Staffing agency or consulting firm providing workers |
| Rate Card | Approved bill rates by job category, location, and experience level |
| Engagement | Active assignment linking worker, supplier, cost center, and rate |
| Timesheet | Weekly/biweekly time entry for hours worked and billing |

### Job Posting Process
1. Hiring manager creates job posting with requirements (job category, skills, location, start date)
2. System applies rate card to determine budget and bill rate range
3. Approval workflow routes based on cost/category thresholds
4. Approved posting distributed to qualified suppliers
5. Suppliers submit candidate profiles
6. Manager reviews, interviews, selects candidate
7. Worker onboarding initiated (compliance checks, system access)

## Services Procurement

### Statement of Work (SOW)
SOW manages project-based or deliverable-based engagements where you pay for outcomes, not hours.

### SOW Structure
| Element | Description |
|---------|-------------|
| Scope of Work | Detailed description of deliverables and activities |
| Milestones | Payment-triggering events with acceptance criteria |
| Not-to-Exceed (NTE) | Maximum budget cap for the engagement |
| Payment Terms | Milestone-based, time-and-materials, or fixed-price |
| Deliverable Acceptance | Formal sign-off process for each milestone |
| Change Orders | Amendment process for scope/budget changes |

### SOW vs. Contingent Worker
| Aspect | Contingent Worker | SOW |
|--------|-------------------|-----|
| Payment basis | Hourly/daily rate | Milestone or fixed price |
| Management | Direct supervision by manager | Managed by supplier |
| Compliance | Individual worker-level | Engagement-level |
| Co-employment risk | Higher (direct supervision) | Lower (supplier-managed) |
| Tracking | Timesheets | Milestone completion |

## Worker Management Lifecycle

### Lifecycle Stages
```
Request → Sourcing → Selection → Onboarding → Active → Extension/Offboarding
```

### Stage Details
| Stage | Activities | System Actions |
|-------|-----------|----------------|
| Request | Job posting creation, requirements definition | Rate card application, approval routing |
| Sourcing | Supplier distribution, candidate submission | Candidate tracking, interview scheduling |
| Selection | Manager review, interview, selection | Offer creation, compliance trigger |
| Onboarding | Background check, compliance docs, system access | Compliance workflow, integration trigger |
| Active | Time entry, expense claims, performance feedback | Timesheet approval, invoice generation |
| Extension | Tenure check, rate review, re-approval | Tenure alert, rate card revalidation |
| Offboarding | Assignment end, system access revoke, final invoice | Offboarding workflow, compliance close |

### Revision Process
Worker revisions (rate change, end date extension, cost center change) follow separate approval workflows with re-validation of rate cards and budget availability.

## Rate Card Management

### Rate Card Structure
| Element | Description |
|---------|-------------|
| Job Category | Hierarchical classification (IT > Developer > Java Developer) |
| Location | Geographic rate differentiation (country, region, city) |
| Experience Level | Junior, mid, senior tiers with rate ranges |
| Bill Rate | Amount paid to supplier (includes markup) |
| Pay Rate | Amount supplier pays worker (bill rate minus markup) |
| Markup Percentage | Supplier fee, negotiated per supplier or category |
| Overtime Rate | Multiplier for hours beyond standard (1.5x, 2x) |

### Rate Card Governance
- Annual rate card review cycle aligned with budget planning
- Market benchmarking (Fieldglass Intelligence for rate benchmarking)
- Supplier-specific rate negotiations vs. standard rate cards
- Rate card exceptions require additional approval level
- Historical rate tracking for trend analysis

## Approval Workflows

### Approval Types
| Trigger | Routing Logic |
|---------|---------------|
| Job posting creation | Cost threshold, job category, department |
| Worker selection | Rate vs. rate card, total engagement cost |
| Timesheet approval | Manager approval, cost center owner |
| Invoice approval | Amount threshold, PO reference |
| SOW creation | Total value, category, department head |
| SOW milestone | Deliverable acceptance by designated reviewer |
| Worker extension | Tenure policy check, rate card revalidation |
| Rate exception | Deviation from rate card requires procurement approval |

### Delegation
Configurable delegation rules for approver absence. Delegation by role, by individual, with time-bounded delegation periods.

## Compliance Management

### Compliance Areas
| Area | Requirements |
|------|-------------|
| Worker classification | Independent contractor vs. employee (IRS 1099/W-2, UK IR35) |
| Work authorization | Visa status, right-to-work documentation |
| Background checks | Criminal, credit, education verification |
| Certifications | Industry-specific (safety, security clearance, professional license) |
| Insurance | Worker's compensation, professional liability (supplier-level) |
| Tenure management | Maximum engagement duration by jurisdiction |
| Data privacy | GDPR/CCPA compliance for worker personal data |

### Co-Employment Risk Mitigation
- Do not provide Fieldglass workers with company email addresses
- Use supplier (not client) benefits and policies
- Performance management through supplier, not direct client feedback
- Clear distinction between employee and contingent worker processes
- Tenure limits enforced by system, not by manager discretion

## Integration with S/4HANA

### Standard Connectors
| Integration | Direction | Data |
|-------------|-----------|------|
| Cost center sync | S/4HANA -> Fieldglass | Organizational structure for cost allocation |
| Supplier master | S/4HANA -> Fieldglass | Vendor master for supplier registration |
| Purchase order | Fieldglass -> S/4HANA | PO creation for approved engagements |
| Goods receipt (service) | Fieldglass -> S/4HANA | Service entry sheet from timesheet approval |
| Invoice | Fieldglass -> S/4HANA | Consolidated invoice for AP processing |
| Payment status | S/4HANA -> Fieldglass | Payment confirmation for supplier visibility |

### Integration Architecture
- **Standard connector:** Pre-built integration using Fieldglass APIs and S/4HANA IDocs/BAPIs
- **SAP CPI/BTP:** Middleware for custom mapping or additional validation logic
- **File-based:** CSV/SFTP for legacy ERP integration (not recommended for S/4HANA)

### Key Configuration
- Map Fieldglass company codes to S/4HANA company codes
- Define purchase order type and document category for Fieldglass POs
- Configure service entry sheet automation (auto-GR on timesheet approval)
- Set up GL account determination for contingent labor costs
- Define cost element mapping for cost center reporting

## VMS Reporting and Analytics

### Standard Reports
| Report | Description |
|--------|-------------|
| Spend Analysis | Total contingent spend by category, supplier, location |
| Headcount Report | Active contingent workers by department, cost center |
| Tenure Report | Workers approaching or exceeding tenure limits |
| Rate Compliance | Actual rates vs. rate card compliance |
| Supplier Performance | Fill rate, time-to-fill, quality scores by supplier |
| Savings Report | Negotiated savings vs. market rates |
| Compliance Dashboard | Background check status, certification expiry |

### Fieldglass Intelligence
Anonymized benchmarking data from Fieldglass network. Rate benchmarking by job category and geography. Fill rate benchmarking against industry peers.

## Best Practices

1. **Start with rate card definition** — rates are the foundation; everything else depends on approved rates
2. **Enable supplier self-service** — suppliers manage their own profiles, workers, and invoices
3. **Configure compliance workflows per jurisdiction** — US/UK/EU have different worker classification rules
4. **Use SOW for deliverable-based engagements** — do not force hourly billing on project work
5. **Integrate with S/4HANA from day one** — manual PO and invoice reconciliation defeats VMS purpose
6. **Train hiring managers** — Fieldglass adoption depends on manager compliance, not procurement enforcement

## Anti-Patterns

- Allowing worker creation without approved rate cards (uncontrolled spend)
- Using Fieldglass only for time capture without compliance features (misses primary VMS value)
- Skipping supplier enablement (suppliers who cannot use the portal revert to email/phone)
- Configuring approval workflows without involving HR/legal for co-employment guidance
- Running Fieldglass disconnected from ERP (creates duplicate data entry for AP and cost accounting)

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct Fieldglass module identified (contingent worker, SOW, or both)
- [ ] Rate card structure defined for the scenario (job categories, locations, rate tiers)
- [ ] Compliance requirements mapped by jurisdiction (worker classification, background checks)
- [ ] Approval workflow design validated against procurement and HR policies
- [ ] Integration architecture defined (connector type, data flows, error handling)
- [ ] Co-employment risk mitigation measures addressed

**Evidence required:** Specific Fieldglass configuration areas, rate card structures, compliance workflows, and integration patterns — not generic VMS descriptions.

## Next Skill

After completing this skill, invoke:
- `mm` — When purchase order creation or service procurement in S/4HANA is the focus
- `fi` — When invoice processing, cost allocation, or payment questions arise
- `ariba` — When goods/services procurement complements contingent workforce management

## Cross-References

- `mm` — Purchase order creation, service entry sheets, vendor master
- `fi` — Invoice posting, cost center accounting, payment runs
- `ariba` — Goods and services procurement (complementary to Fieldglass contingent workforce)
- `sf` — Employee Central for employee vs. contingent worker distinction
- `security-grc` — Access governance for contingent worker system access
