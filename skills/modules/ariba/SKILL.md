---
name: ariba
description: Use when working with SAP Ariba — Ariba Network, Guided Buying, Sourcing, Contracts, Supplier Lifecycle Management, Supplier Risk Management, Procurement, Invoice Management, integration with S/4HANA via CIG, catalog management, or Ariba APIs.
---

# SAP Ariba

This skill enforces correct Ariba implementation practices, ensuring that CIG integration is tested end-to-end before go-live, approval workflows are never bypassed, and supplier qualification is completed before sourcing events — because an unqualified supplier pool produces unqualified sourcing results.

## Content Routing

| Topic | Section |
|-------|---------|
| Ariba Network | Ariba Network |
| Guided Buying | Guided Buying |
| Strategic Sourcing | Sourcing |
| Contract management | Contract Management |
| Supplier management | Supplier Lifecycle and Risk Management |
| Invoice management | Invoice Management |
| S/4HANA integration (CIG) | Integration with S/4HANA |
| Ariba APIs | Ariba APIs |
| Catalog management | Catalog Management |

## Iron Laws

1. **ALWAYS TEST CIG INTEGRATION END-TO-END BEFORE GO-LIVE.** The Cloud Integration Gateway (CIG) connects S/4HANA procurement to Ariba. Master data sync (suppliers, materials, purchase orgs), purchase order transmission, and invoice posting must be tested with real transaction volumes. CIG failures at go-live mean purchase orders do not reach suppliers.
2. **NEVER BYPASS APPROVAL WORKFLOWS.** Ariba approval workflows enforce procurement policy. Every bypass — whether through admin override, threshold manipulation, or process workaround — creates an audit finding. Procurement without approval is unauthorized spending.
3. **ALWAYS CONFIGURE SUPPLIER QUALIFICATION BEFORE SOURCING EVENTS.** A sourcing event (RFP/RFQ/auction) with unqualified suppliers wastes effort. Suppliers must be qualified (certificates, financial standing, compliance) before being invited to bid. Qualification is a gate, not a formality.
4. **NEVER GO LIVE WITHOUT CONTENT COMPLIANCE RULES.** Content compliance (catalog vs. non-catalog, preferred vs. non-preferred) drives maverick spending reduction. Without compliance rules, users route all purchases through free-text non-catalog — defeating the purpose of Ariba.
5. **ALWAYS VALIDATE TAX AND PAYMENT TERMS IN INVOICE MANAGEMENT.** Invoice matching failures caused by incorrect tax configuration or mismatched payment terms create supplier payment delays and AP operational overhead. Validate tax codes and payment terms mapping between Ariba and S/4HANA before go-live.

## Ariba Network

### What It Is
The Ariba Network is a B2B trading network connecting buyers and suppliers for purchase order transmission, invoice receipt, and supply chain collaboration.

### Key Capabilities
| Capability | Description |
|------------|-------------|
| PO Transmission | Buyer sends POs to suppliers via Ariba Network (cXML/EDI) |
| Invoice Processing | Suppliers submit invoices electronically (PO-based or non-PO) |
| Order Confirmation | Suppliers confirm/reject POs, provide ship dates |
| Ship Notice (ASN) | Suppliers send advance ship notices for receiving |
| Payment Status | Suppliers view payment status and early payment offers |

### Supplier Enablement
Critical success factor. Suppliers must register on Ariba Network, set up transaction rules, and test document exchange. Plan for 60-90 day supplier enablement program for top 80% of spend suppliers.

## Guided Buying

### Purpose
Simplified purchasing experience for casual (non-procurement) users. Consumer-grade shopping experience backed by procurement policies.

### Key Features
| Feature | Description |
|---------|-------------|
| Catalog search | Unified search across punchout and hosted catalogs |
| Guided forms | Category-specific request forms with smart defaulting |
| Policy enforcement | Automatic routing based on category, amount, cost center |
| Preferred supplier steering | Direct users to contracted suppliers with visual indicators |
| Mobile experience | Mobile-responsive for on-the-go purchasing |

### Configuration Areas
- Category hierarchy (UNSPSC-based recommended)
- Buying policies per category (catalog-only, form-based, approval-required)
- Tile configuration for landing page
- Supplier steering rules (preferred, approved, restricted)

## Sourcing

### Event Types
| Event | Use Case |
|-------|----------|
| RFI (Request for Information) | Supplier discovery and pre-qualification |
| RFP (Request for Proposal) | Complex sourcing with weighted evaluation criteria |
| RFQ (Request for Quotation) | Price-focused sourcing for commodity items |
| Reverse Auction | Real-time competitive bidding for price reduction |
| Forward Auction | Sell-side auction for surplus or asset disposal |

### Sourcing Process
1. Create sourcing project with scope, timeline, evaluation criteria
2. Qualify and invite suppliers (from Supplier Lifecycle Management)
3. Publish sourcing event with documentation and requirements
4. Supplier response period (proposals, bids, clarification Q&A)
5. Evaluation — weighted scoring, total cost of ownership analysis
6. Award — notification and contract creation
7. Project close — savings tracking and documentation

### Key Configuration
- Evaluation templates with scoring criteria and weights
- Content areas (pricing, technical, commercial, compliance)
- Approval rules for award decisions
- Integration with Contract Management for auto-contract creation

## Contract Management

### Contract Types
| Type | Description |
|------|-------------|
| Buying agreement | Framework contract with pricing and terms for procurement |
| Selling agreement | Customer-facing terms (less common in procurement context) |
| Internal contract | Non-procurement legal agreements |

### Contract Lifecycle
Draft -> Review/Negotiate -> Approval -> Execute (signature) -> Active -> Amend -> Expire/Renew.

### Key Features
- Clause library management with legal-approved language
- Version tracking and redline comparison
- Auto-renewal and expiration alerts
- Compliance monitoring against contract terms
- Integration with procurement — contract prices flow to purchase orders

## Supplier Lifecycle and Risk Management

### Supplier Lifecycle Management (SLM)
| Phase | Activities |
|-------|-----------|
| Registration | Supplier self-registration portal, basic information collection |
| Qualification | Certificates, financial data, compliance questionnaires |
| Approval | Internal approval workflow for supplier activation |
| Management | Performance scorecards, periodic re-qualification |
| Offboarding | Supplier deactivation, blocked status in procurement |

### Supplier Risk Management (SRM)
- **Financial risk:** D&B credit scores, financial statement analysis
- **Compliance risk:** Sanctions screening, regulatory compliance
- **Operational risk:** Supply chain disruption indicators
- **ESG risk:** Environmental, social, governance scoring
- **Continuous monitoring:** Alert-based risk notifications for portfolio suppliers

### Qualification Questionnaires
Modular questionnaire templates: General (all suppliers), Category-specific (manufacturing, services, IT), Region-specific (EU GDPR, US SOX). Auto-scoring with configurable pass/fail thresholds.

## Invoice Management

### Invoice Types
| Type | Flow |
|------|------|
| PO-based invoice | Matched against purchase order and goods receipt (3-way match) |
| Non-PO invoice | Routed through approval workflow without PO reference |
| Credit memo | Supplier-initiated credit against previous invoice |
| Evaluated receipt settlement (ERS) | Auto-invoice on goods receipt — no supplier invoice needed |

### Processing Flow
1. Supplier submits invoice via Ariba Network (cXML) or email/scan (with Ariba Invoice Automation)
2. Ariba validates header data (supplier, currency, payment terms)
3. Line-level matching against PO and goods receipt
4. Tolerance check (price, quantity, tax amount)
5. Exception routing for out-of-tolerance items
6. Approval workflow for non-PO invoices
7. Posting to S/4HANA FI-AP via CIG

### Invoice Automation
Ariba Invoice Automation (AIA) captures paper/PDF invoices via OCR, converts to electronic format, and routes into standard Ariba invoice processing.

## Catalog Management

### Catalog Types
| Type | Description |
|------|-------------|
| Hosted catalog | Supplier catalog uploaded to Ariba (CIF/BMEcat format) |
| Punchout catalog | User redirected to supplier website, cart returned to Ariba (cXML punchout) |
| Contract catalog | Auto-generated from contract management pricing |

### Catalog Governance
- Content approval workflow before catalog publication
- Price validation against contracted rates
- Category mapping to UNSPSC or custom taxonomy
- Catalog update cycle management (quarterly recommended)

## Integration with S/4HANA

### Cloud Integration Gateway (CIG)
CIG is the standard integration middleware between S/4HANA and Ariba.

### Integration Scenarios
| Scenario | Direction | Data |
|----------|-----------|------|
| Supplier master sync | S/4HANA -> Ariba | Vendor master, bank details |
| Purchase org sync | S/4HANA -> Ariba | Company code, purchase org, plant |
| Material master sync | S/4HANA -> Ariba | Material master for catalog reference |
| Purchase order | Ariba -> S/4HANA | PO creation/change from Ariba requisition |
| Goods receipt | S/4HANA -> Ariba | GR confirmation for 3-way matching |
| Invoice posting | Ariba -> S/4HANA | Approved invoice posted to FI-AP |
| Payment status | S/4HANA -> Ariba | Payment run results for supplier visibility |

### CIG Configuration
- Activate integration scenarios in CIG admin
- Map organizational data (company code, purchase org, plant)
- Configure master data filters (which suppliers/materials replicate)
- Set up error handling and monitoring (CIG cockpit)
- Schedule master data sync jobs

## Ariba APIs

### API Types
| API | Protocol | Use Case |
|-----|----------|----------|
| Procurement API | REST/JSON | Requisition, PO, receipt operations |
| Sourcing API | REST/JSON | Sourcing project and event management |
| Contract API | REST/JSON | Contract workspace operations |
| Supplier API | REST/JSON | Supplier registration and qualification |
| Analytical reporting | REST | Report extract and data download |
| cXML | XML | Punchout, PO, invoice document exchange |

### Authentication
OAuth 2.0 with application key and shared secret. Realm-specific endpoints. Rate limits vary by API and subscription tier.

## Best Practices

1. **Invest in supplier enablement** — Ariba ROI depends on supplier adoption; plan a formal enablement program
2. **Configure content compliance rules before go-live** — drive catalog adoption from day one
3. **Use UNSPSC for category taxonomy** — industry standard enables benchmarking and analytics
4. **Implement 3-way matching** — PO, GR, invoice matching is the foundation of AP controls
5. **Monitor CIG integration daily** — failed messages mean missing POs or invoices; set up alerting

## Anti-Patterns

- Going live on Ariba without supplier enablement (suppliers cannot transact = system unused)
- Using Ariba for all procurement without considering direct material vs. indirect material fit
- Skipping CIG integration testing with realistic data volumes (works with 10 POs, fails with 10,000)
- Configuring approval workflows without involving procurement policy owners
- Ignoring catalog management — without maintained catalogs, users submit free-text requisitions

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct Ariba module identified for the scenario (Buying, Sourcing, Contracts, SLM, Invoicing)
- [ ] Integration architecture defined (CIG configuration, data flow direction, error handling)
- [ ] Supplier enablement impact assessed (which suppliers need to transact on Ariba Network)
- [ ] Approval workflow design validated against procurement policy
- [ ] Content compliance and catalog strategy addressed
- [ ] Tax, payment terms, and currency configuration verified for invoice scenarios

**Evidence required:** Specific Ariba module features, CIG integration scenarios, cXML document types, and approval workflow rules — not generic procurement descriptions.

## Next Skill

After completing this skill, invoke:
- `mm` — When S/4HANA procurement master data or purchasing process questions arise
- `fi` — When invoice posting, payment processing, or accrual questions arise
- `integration-suite` — When CPI/BTP middleware for Ariba integration is needed

## Cross-References

- `mm` — S/4HANA purchasing, material master, vendor master
- `fi` — Accounts payable, invoice posting, payment runs
- `sd` — Sell-side Ariba Network for sales order integration
- `integration-suite` — CPI for custom Ariba integrations beyond CIG
- `fieldglass` — External workforce procurement (complementary to Ariba goods/services)
