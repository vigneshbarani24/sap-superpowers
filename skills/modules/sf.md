---
name: sf
description: Use when working with SAP SuccessFactors — Employee Central, Recruiting, Onboarding, Performance & Goals, Compensation, Learning, Succession Planning, Workforce Analytics, Employee Central Payroll, RBP, MDF, integration with S/4HANA HCM, or OData APIs.
---

# SAP SuccessFactors (SF)

This skill enforces correct SuccessFactors implementation practices, ensuring that Role-Based Permissions are designed before configuration begins, integration testing with payroll is never skipped, and data privacy regulations are embedded in every configuration decision — not bolted on afterward.

## Content Routing

| Topic | Section |
|-------|---------|
| Employee Central (core HR) | Employee Central |
| Recruiting and Onboarding | Talent Management Modules |
| Performance, Compensation, Succession | Talent Management Modules |
| Workforce Analytics | Workforce Analytics and Reporting |
| Integration with S/4HANA | Integration Architecture |
| RBP and security | Role-Based Permissions |
| MDF and business rules | Metadata Framework (MDF) |
| Employee Central Payroll | Employee Central Payroll |

## Iron Laws

1. **ALWAYS DESIGN RBP MODEL BEFORE CONFIGURATION.** Role-Based Permissions (RBP) is the security foundation. Configuring Employee Central objects, workflows, or business rules without a finalized permission model means you will retrofit security — and retrofitting RBP is 3x more expensive than designing it first.
2. **NEVER SKIP INTEGRATION TESTING WITH PAYROLL.** Employee Central Payroll replication depends on data consistency between EC and ECP. A field mapping that works in isolation will fail when payroll runs process thousands of records with edge cases. Full-cycle payroll testing is mandatory.
3. **ALWAYS CONSIDER GDPR/DATA PRIVACY IN CONFIGURATION.** Every Employee Central field, custom MDF object, and reporting artifact must be evaluated for data privacy impact. Personal data fields require retention rules, consent management, and data subject access request (DSAR) procedures. This is not optional in EU deployments.
4. **NEVER CONFIGURE MDF OBJECTS WITHOUT ASSOCIATION DESIGN.** MDF objects linked by associations form the data model backbone. Adding associations after go-live requires data migration. Design the complete object model with all associations before building individual objects.
5. **ALWAYS VALIDATE BUSINESS RULES IN SEQUENCE.** SuccessFactors business rules execute in a defined sequence. A rule that works in isolation may conflict with another rule at a different priority. Test the full rule chain, not individual rules.

## Employee Central

### Core Data Model
- **Person:** Biographical data, personal information, national ID
- **Employment:** Job information, compensation, pay components, organizational assignments
- **Organizational Structure:** Legal entity, business unit, department, division, location, cost center, pay group
- **Position Management:** Optional — positions as organizational objects vs. headcount-based

### Key Configuration Areas
| Area | Description |
|------|-------------|
| Corporate Data Model (HRIS) | Foundation XML defining all EC objects, fields, visibility, editability |
| Picklists | Centralized value lists — Foundation picklists (org-wide) vs. HRIS picklists (per-object) |
| Workflows | Approval routing for hire, termination, data changes — rule-based or position-based |
| Event Reasons | Categorize employment events (hire, rehire, transfer, promotion, termination) |
| MDF Business Rules | Triggered on save, on-init, on-change — field defaulting, validation, derivation |

### Critical Transactions
- Manage Employee: Central UI for all employment data changes
- Manage Organization: Create/maintain org structure
- Position Management: Position-based org design (if enabled)
- Employee Import: Mass data load via CSV templates

## Metadata Framework (MDF)

MDF is the extensibility engine. All custom objects, fields, and business logic in SuccessFactors are MDF-based.

### MDF Object Design
- **Generic Objects (GOs):** Custom data entities (e.g., vehicle assignment, loan tracking)
- **Associations:** Relationships between MDF objects (1:1, 1:N, N:N via association objects)
- **Effective Dating:** Start/end date controls for time-dependent data
- **Propagation:** Field values flowing from one object to another via rules

### Business Rules Engine
| Rule Type | Trigger | Use Case |
|-----------|---------|----------|
| onChange | Field value changes | Derive cost center from department |
| onSave | Record save event | Validate mandatory fields |
| onInit | Record creation | Default values for new hires |
| Workflow | Approval routing | Dynamic approver determination |

## Role-Based Permissions (RBP)

### Permission Architecture
- **Permission Roles:** Define access — which users (target population) can see/edit which data
- **Permission Groups:** Define populations — who is subject to the role's access rules
- **Permission Categories:** Employee Data, User (MDF), Manage Documents, Reports, Admin
- **Granted-by/Target-by:** Target population dynamic rules (department, division, custom field)

### RBP Design Principles
1. Start with the **least privilege** model — deny all, grant explicitly
2. Design **permission groups** around organizational structure (legal entity, business unit)
3. Separate **HR admin**, **manager**, **employee self-service**, and **recruiter** roles minimum
4. Use **IP restriction** for admin roles
5. **Field-level permissions** on sensitive data (compensation, national ID, medical data)

## Talent Management Modules

### Recruiting (RCM/RMK)
- Requisition management, candidate pipeline, offer management
- Integration with Employee Central for internal candidates and position sync
- Recruiting Marketing (RMK) for career site, talent community

### Onboarding 2.0
- Pre-day-1 activities, document collection, equipment provisioning
- Integration with EC hire event triggers onboarding process
- Custom panels and compliance document management

### Performance & Goals (PMGM)
- Goal plan templates, cascading goals, continuous performance management
- Calibration sessions, performance forms, 360 reviews
- Integration with Compensation (performance-based pay decisions)

### Compensation
- Compensation plan sheets, merit/bonus/equity planning
- Budget pools, guidelines, proration rules
- Integration with EC pay components for statement generation

### Succession & Development
- Succession org charts, talent pools, talent cards
- Development goals linked to learning activities
- Matrix grid (performance vs. potential)

### Learning (LMS)
- Learning assignments, curricula, certifications
- Content management (SCORM, xAPI)
- Compliance training with auto-assignment rules

## Employee Central Payroll

ECP runs SAP HCM Payroll in a cloud-hosted environment replicated from Employee Central.

### Replication
- EC -> ECP via PTP (Point-to-Point) replication using integration center or middleware
- Employee master data, org assignments, pay components map to SAP payroll infotypes
- Critical mapping: EC Pay Components -> ECP Wage Types (IT0008/IT0014/IT0015)

### Payroll Processing
- Payroll control record, retroactive accounting, off-cycle payroll
- Posting to FI via symbolic accounts (same as on-premise HCM Payroll)
- Third-party remittance for benefits, garnishments, tax authorities

## Integration Architecture

### S/4HANA Core Hybrid Model
SuccessFactors as cloud HR + S/4HANA for finance/logistics. Key integrations:

| Integration | Direction | Middleware | Data |
|-------------|-----------|------------|------|
| EC -> S/4 Cost Center | EC -> S/4HANA | CPI/BTP | Cost center replication |
| EC -> FI Payroll Posting | ECP -> S/4HANA FI | Standard posting | Payroll results to GL |
| EC -> S/4 Employee Master | EC -> S/4HANA | CPI | Business partner/employee |
| S/4 Org Structure -> EC | S/4HANA -> EC | CPI | Company code, cost center sync |

### Integration Center
Native SuccessFactors tool for building integrations. Supports: OData, SFTP, SOAP. Templates available for common scenarios. Scheduled or event-triggered execution.

### OData APIs
- Entity-based REST APIs for all EC and MDF objects
- $filter, $expand, $select, $orderby query options
- Rate limits: 600 requests per minute per company instance (subject to change)
- Compound Employee API (v2): Batch read of employee data across entities

## Workforce Analytics and Reporting

| Tool | Use Case |
|------|----------|
| Story Reports | Ad-hoc and scheduled reporting with drag-and-drop builder |
| People Analytics (Workforce Analytics) | Pre-built workforce metrics, trends, benchmarking |
| Report Center | Central report library with sharing and scheduling |
| Online Report Designer (ORD) | Legacy detailed reporting (being deprecated) |

### Key Metrics
Headcount, turnover rate, time-to-fill, compa-ratio, span of control, diversity ratios, absence rate, learning completion rate.

## Best Practices

1. **Implement Employee Central first** — it is the foundation for all other modules
2. **Use Provisioning sparingly** — most admin config is now in Admin Center; Provisioning is for platform-level settings
3. **Version control business rules** — export rule definitions before changes; no native versioning
4. **Test with realistic data volumes** — performance degrades with large org structures and complex rules
5. **Plan picklist governance** — uncontrolled picklist proliferation creates reporting inconsistencies

## Anti-Patterns

- Configuring modules without a finalized RBP model (security retrofit is extremely expensive)
- Using direct OData writes for mass data changes instead of Employee Import (bypasses business rules)
- Skipping ECP parallel payroll runs (differences in production are discovered too late)
- Building custom MDF objects when standard objects exist (e.g., custom absence type object vs. Time Off)
- Ignoring data privacy assessment for custom fields containing personal data

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct SuccessFactors module and feature identified for the scenario
- [ ] RBP implications addressed (who can see/edit the data in question)
- [ ] Integration dependencies stated (EC<->ECP, EC<->S/4HANA, third-party)
- [ ] Data privacy considerations noted where personal data is involved
- [ ] MDF configuration approach validated (object design, associations, rules)
- [ ] API references include correct OData entity names and known limitations

**Evidence required:** Specific module features, configuration areas, API entity names, and integration patterns — not generic SuccessFactors overviews.

## Next Skill

After completing this skill, invoke:
- `fi` — When payroll posting or cost center integration questions arise
- `integration-suite` — When CPI middleware configuration for EC integration is needed
- `analytics` — When workforce analytics or SAC integration is required

## Cross-References

- `fi` — Payroll posting integration, cost center replication
- `integration-suite` — CPI-based integration between EC and S/4HANA
- `analytics` — SAP Analytics Cloud for workforce planning and BI
- `security-grc` — Authorization concept alignment between SF RBP and S/4HANA roles
- `change-management` — Organizational change management for SuccessFactors rollout
