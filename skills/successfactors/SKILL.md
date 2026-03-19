---
name: successfactors
description: Use when working with SAP SuccessFactors — Employee Central, recruiting, learning, performance, compensation, or S/4HANA integration. Provides module overview, integration patterns, and SAP references.
---

# SAP SuccessFactors Reference Skill

## Content Routing

| Topic                              | Section                                |
|------------------------------------|----------------------------------------|
| Module landscape & capabilities    | SuccessFactors Module Overview         |
| Core HR & org management           | Employee Central                       |
| Payroll processing & replication   | Employee Central Payroll (ECP)         |
| S/4HANA & on-premise connectivity  | Integration with S/4HANA              |
| End-to-end data flow scenarios     | Common Integration Scenarios           |
| Business rules, MDF, permissions   | Configuration Patterns                 |
| Rollout planning & data migration  | Implementation Approach                |
| Admin tools & portals              | Key Tools & URLs                       |
| Official docs & SAP Notes          | SAP Help Portal Links & SAP Notes      |

---

## 1. SuccessFactors Module Overview

SAP SuccessFactors is a cloud HCM suite. Modules are licensed individually but share a common platform (BizX).

| Module                        | Purpose                                                        |
|-------------------------------|----------------------------------------------------------------|
| **Employee Central (EC)**     | Core HR, org structure, position management, global benefits   |
| **Recruiting (RCM/RMK)**     | Requisition management, candidate experience, offer management |
| **Onboarding 2.0**           | New-hire portal, compliance forms, task workflows              |
| **Learning (LMS)**           | Course catalog, curricula, certifications, compliance training |
| **Performance & Goals**      | Goal plans, continuous PM, 360 reviews, calibration            |
| **Compensation**             | Salary planning, bonus plans, long-term incentive planning     |
| **Succession & Development** | Talent pools, succession org charts, development goals         |
| **Workforce Analytics (WFA)**| Embedded reporting, Story reports, workforce planning          |

All modules share **People Profile**, **Role-Based Permissions (RBP)**, and **MDF** (Metadata Framework) as platform services.

---

## 2. Employee Central

Employee Central is the digital core of SuccessFactors and the system of record for people data.

### Core HR Data Model
- **Person** -- biographical data, national ID, addresses (country-specific).
- **Employment** -- job information, compensation info, pay component groups.
- **Job Information** record: company, business unit, division, department, location, job classification, pay grade.
- Effective-dated: every change creates a new record with an effective start date.

### Organizational Structure
- Foundation Objects: **Company, Business Unit, Division, Department, Location, Pay Group, Cost Center**.
- These are configured via **MDF** (generic objects with picklists and associations).
- Propagation rules control how changes cascade (e.g., department rename updates all employees).

### Position Management
- Optional layer between job and person. Enables head-count control and vacancy tracking.
- Position inherits defaults (job classification, cost center) and pushes them to the incumbent.
- Right-to-return and concurrent employment supported.

### Time Off & Time Tracking
- Time-off types (vacation, sick, parental) configured per country/group.
- Accrual rules, carry-forward, and payout policies.
- Time sheet (optional) for project-based time entry; integrates with ECP or third-party payroll.

### Payroll Integration
- EC feeds personal, job, compensation, and time data to a payroll system.
- Supported targets: Employee Central Payroll (ECP), third-party payroll via APIs or flat files.

---

## 3. Employee Central Payroll (ECP)

ECP is SAP's cloud payroll engine running on an SAP HCM system managed by SAP.

### Integration with Employee Central
- **Replication**: EC data replicates to ECP via **Point-to-Point (PTP)** replication or **API-based** replication.
- PTP uses pre-delivered mapping; customization via **Replication Rules** in EC and **BAdIs** in ECP.
- Key infotypes populated: IT0000 (Actions), IT0001 (Org Assignment), IT0002 (Personal Data), IT0008 (Basic Pay), IT2001 (Absences).

### Payroll Processing
- Standard SAP payroll schema (country-specific) runs in the ECP environment.
- Payroll Control Center (PCC) for monitoring, alerts, and simulations.
- Off-cycle payroll for ad-hoc payments, terminations, bonuses.

### Retroactive Calculations
- Retro triggered when EC changes arrive with a past effective date.
- Earliest retro date controlled per employee; deep-retro limits avoid performance issues.
- Delta postings sent to finance (S/4HANA FI or third-party GL) after retro run.

---

## 4. Integration with S/4HANA

### HCM Master Data Replication
- Cost center, company code, and org-unit data can replicate **from S/4HANA to EC** (foundation object sync).
- Employee master data replicates **from EC to S/4HANA** for finance (vendor/customer for expense management) or plant maintenance (person responsible).

### SAP Integration Add-On for SuccessFactors
- ABAP add-on installed on the on-premise or S/4HANA system.
- Provides middleware-like mapping, error handling, and monitoring (transaction `HRSFI_COCKPIT`).
- Supports employee replication and cost center replication out of the box.

### CPI / Integration Suite Middleware Patterns
- **SAP Integration Suite (CPI)** is the strategic middleware for SF integrations.
- Pre-delivered integration packages on SAP Business Accelerator Hub (api.sap.com).
- Recommended for compound integrations (e.g., EC + Concur + S/4HANA).
- CPI iFlows handle mapping, error handling, retry, and logging centrally.

---

## 5. Common Integration Scenarios

| Scenario                            | Source | Target     | Mechanism                                  |
|-------------------------------------|--------|------------|--------------------------------------------|
| Cost center replication             | S/4    | EC         | Integration Add-On or CPI iFlow            |
| Employee replication to finance     | EC     | S/4 FI     | Integration Add-On (HRSFI)                 |
| EC to ECP payroll replication       | EC     | ECP        | PTP replication (standard)                 |
| Payroll posting to GL               | ECP    | S/4 FI     | Payroll posting run + CPI or direct RFC    |
| Recruiting to Onboarding            | RCM    | Onboarding | Native (same platform, configuration only) |
| Learning completions to Performance | LMS    | PM         | Native event-driven or API                 |
| Workforce data to Analytics         | EC     | WFA        | Embedded (shared data store)               |

---

## 6. Configuration Patterns

### Business Rules
- Rule engine used across EC and Talent modules. Types: base object rules (onChange, onSave, onInit), assignment rules, workflow rules.
- Common uses: default values on hire, validate pay changes, derive cost center from department.
- Defined in **Admin Center > Configure Business Rules**.

### MDF (Metadata Framework) Objects
- Generic object framework replacing legacy XML-based configuration.
- Custom MDF objects for country-specific fields, custom entities, and foundation extensions.
- Associations, validations, picklists, and event derivations configured in **Manage Business Configuration**.

### Role-Based Permissions (RBP)
- Three layers: **Permission Roles** (who), **Permission Groups** (target population), **Permissions** (what).
- Granted via rules (e.g., all managers see their direct reports' compensation).
- Sensitive fields (national ID, salary) require explicit grants.
- Always test with **Admin Center > Permission Test Tool**.

### Workflows
- Approval and notification workflows per event (hire, promotion, termination, compensation change).
- Support for dynamic approvers (e.g., matrix manager, HR partner via role lookup).
- Workflow contributors for additional data entry during a transaction.

---

## 7. Implementation Approach

### Module Sequencing
1. **Employee Central** first -- establishes the people data foundation.
2. **Employee Central Payroll** in parallel or immediately after EC (payroll parallel run needs months).
3. **Talent modules** (Performance, Compensation, Recruiting) can run in parallel once EC is live.
4. **Learning, Onboarding, Succession** often phase 2, leveraging EC data.

### Data Migration
- Templates provided per module (CSV format, loaded via Import Employee Data).
- Recommended: migrate current-record plus last 1--3 history records for continuity.
- Validate with **Data Import Audit Report** and automated test scripts.

### Parallel Payroll
- Run legacy and ECP payrolls side by side for 3--6 cycles.
- Compare net pay, taxes, deductions via reconciliation reports.
- Go-live only after deltas are within an agreed tolerance (typically < 0.01%).

---

## Key Tools & URLs

| Tool                    | Purpose                                              |
|-------------------------|------------------------------------------------------|
| **Provisioning**        | Company-level settings, module activation, SSO config (SAP-only access) |
| **Admin Center**        | Day-to-day configuration: business rules, MDF, RBP, workflows |
| **Integration Center**  | Build and schedule OData/SFTP-based integrations without code |
| **Intelligent Services**| Event-driven integration triggers (hire, termination, data change) |
| **SAP Cloud ALM**       | Project management, test management, monitoring for SF implementations |
| **Instance Refresh**    | Copy production data to test/staging (scheduled via SAP support) |

---

## SAP Help Portal Links & SAP Notes

### SAP Help Portal
- [SAP SuccessFactors Employee Central](https://help.sap.com/docs/SAP_SUCCESSFACTORS_EMPLOYEE_CENTRAL) -- configuration guides, data model reference, API documentation.
- [SAP SuccessFactors Integration with SAP ERP/S4HANA](https://help.sap.com/docs/SAP_SUCCESSFACTORS_INTEGRATION) -- integration add-on setup, CPI content, replication guides.
- [SAP SuccessFactors Platform](https://help.sap.com/docs/SAP_SUCCESSFACTORS_PLATFORM) -- RBP, MDF, business rules, Intelligent Services.

### SAP Notes
- **SAP Note 2569702** -- Integration Add-On for SuccessFactors: installation and configuration guide.
- **SAP Note 3038303** -- Employee Central Payroll: supported countries and feature scope per release.
- **SAP Note 2078498** -- SuccessFactors integration best practices and known issues.
