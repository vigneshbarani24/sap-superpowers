---
name: sap-security-grc
description: Use when working with SAP authorization concepts, role design, Segregation of Duties, GRC, or compliance requirements. Provides role patterns, SoD rules, and SAP references.
---

# SAP Security & GRC Reference

Authoritative reference for SAP authorization design, Segregation of Duties, GRC Access Control, and audit compliance.

## Content Routing

| Topic | Section |
|---|---|
| Auth objects, profiles, user master | [Authorization Concept](#authorization-concept) |
| Single / composite / derived roles | [Role Design Patterns](#role-design-patterns) |
| PFCG, SU01, SU53, SUIM, etc. | [Key Transactions](#key-transactions) |
| SoD conflicts, risk matrix | [Segregation of Duties](#segregation-of-duties-sod) |
| Access risk analysis, firefighter, BRM | [GRC Access Control](#grc-access-control) |
| Firefighter / emergency access | [Emergency Access Procedure](#emergency-access-firefighter-procedure) |
| Audit log, change docs, SM20 | [Audit & Compliance](#audit--compliance) |

---

## Authorization Concept

SAP authorization is built on four layers:

1. **Authorization Objects** -- Logical groupings of up to 10 authorization fields (e.g., `S_TCODE`, `F_BKPF_BUK`, `M_BEST_EKO`). Each object gates a specific business action.
2. **Authorization Profiles** -- Generated containers that bundle authorization object instances. Maintained automatically by PFCG; manual profile editing is discouraged.
3. **Roles** -- The primary administrative unit. A role maps menu entries (transactions, apps) to the authorization objects required to execute them. Roles are built in PFCG.
4. **User Master Records** -- Stored in tables `USR02`/`USR04`. Each user is assigned one or more roles. The authorization buffer is built at logon from all assigned roles.

**Authorization check flow:** Program calls `AUTHORITY-CHECK OBJECT` -> kernel reads the user buffer -> grants or denies access.

---

## Role Design Patterns

### Single Roles
Atomic units of access. One single role should cover one coherent job function (e.g., "AP Invoice Entry").

### Composite Roles
Group multiple single roles under one umbrella for easier assignment. Composite roles carry no authorizations of their own.

### Derived Roles
Inherit the menu and authorization template from a master role; only organizational-level values (company code, plant, purchasing org) differ. Use derived roles to scale a role design across org units without duplication.

### Naming Convention (recommended)

```
Z:<Module>:<Type>:<Description>
```

| Token | Values | Example |
|---|---|---|
| Module | FI, MM, SD, HR, BC, GRC | `Z:FI:S:AP_INVOICE_ENTRY` |
| Type | S = single, C = composite, D = derived | `Z:MM:D:PO_CREATE_PLANT1000` |

---

## Key Transactions

| TCode | Name | Purpose |
|---|---|---|
| **PFCG** | Role Maintenance | Create, change, generate roles and profiles |
| **SU01** | User Maintenance | Create/modify user master records and role assignments |
| **SU53** | Authorization Check Analysis | Display last failed authorization check for a user |
| **SUIM** | User Information System | Report on users, roles, profiles, authorization objects |
| **SU24** | Auth Object / TCode Mapping | Maintain which auth objects are checked per transaction |
| **SU25** | Auth Object Upgrade Tool | Upgrade SU24 data after SAP release or enhancement pack |
| **SU10** | Mass User Maintenance | Lock/unlock, assign roles in bulk |
| **SM20** | Security Audit Log | Review security-relevant events (logon failures, RFC calls) |
| **SM19** | Security Audit Configuration | Configure audit log filters and event classes |
| **RSUSRAUTH** | Auth Trace (S/4HANA) | Evaluate SU24 authorization trace results |

---

## Segregation of Duties (SoD)

### Concept
SoD requires that no single user can perform two or more conflicting steps in a business process. The goal is to prevent fraud and unintentional errors by enforcing four-eyes (or more) principles.

### Common SoD Conflicts

| # | Function A | Function B | Risk Description |
|---|---|---|---|
| 1 | Create Vendor (XK01/BP) | Post Vendor Invoice (FB60/MIRO) | User creates a fictitious vendor and pays invoices to it |
| 2 | Create Purchase Order (ME21N) | Goods Receipt (MIGO) | User orders goods and confirms receipt without independent check |
| 3 | Maintain Customer Master (XD01/BP) | Process Credit Memo (FB75) | User creates a shell customer and issues credit refunds |
| 4 | Maintain GL Master (FS00) | Post Journal Entry (FB50) | User creates accounts and posts fraudulent entries |
| 5 | Maintain Employee Master (PA30) | Run Payroll (PC00_M99) | User inflates salary data and runs payroll |
| 6 | Create Sales Order (VA01) | Release Billing (VF01) | User generates fictitious sales and triggers billing |
| 7 | User Administration (SU01) | Role Maintenance (PFCG) | User grants themselves elevated access |

### Mitigation Controls
When a conflict cannot be eliminated, apply mitigating controls:

- **Detective reports** -- Schedule periodic SUIM reports to flag users holding conflicting access.
- **Workflow approvals** -- Require a second approver for the sensitive transaction (e.g., invoice release strategy).
- **Monitoring** -- Use SAP GRC Access Control continuous monitoring or custom audit extracts.
- **Time-limited access** -- Grant one side of the conflict only via firefighter (emergency access).

---

## GRC Access Control

SAP GRC Access Control (part of SAP S/4HANA Cloud for governance, risk, and compliance) provides three core capabilities:

### 1. Access Risk Analysis (ARA)
- Maintains a rule set mapping authorization objects to business functions.
- Runs risk analysis at user, role, or request level.
- Reports SoD violations, critical access, and critical roles.
- Simulation mode lets you test "what-if" before assigning a role.

### 2. Emergency Access Management (EAM / Firefighter)
- Provides time-boxed, audited super-user access.
- Every action performed under a firefighter ID is logged and sent to the controller (owner) for review.
- See [Emergency Access Procedure](#emergency-access-firefighter-procedure) below.

### 3. Business Role Management (BRM)
- Central repository for role definitions tied to business processes.
- Supports role lifecycle: request -> design -> test -> approve -> provision.
- Integrates with ARA so new roles are risk-checked before activation.

---

## Emergency Access (Firefighter) Procedure

1. **Request** -- User submits an emergency access request in GRC (or via pre-approved assignment). Justification is mandatory.
2. **Approval** -- The firefighter ID owner or manager approves; the system logs the approval.
3. **Logon** -- User logs on with the firefighter ID (centralized approach) or their own ID receives temporary elevated roles (decentralized approach).
4. **Execution** -- All actions are recorded via SM20 audit log and change documents.
5. **Log Review** -- The assigned controller receives an automatic log report and must confirm or escalate within the defined SLA.
6. **Closure** -- Access is revoked automatically at session end or time expiry.

**Best practices:**
- Limit firefighter session duration (e.g., 4 hours max).
- Require reason codes mapped to incident tickets.
- Store logs for at least 2 audit cycles.

---

## Audit & Compliance

### Audit Trail Sources
| Source | Description |
|---|---|
| **Change Documents** (RSSCD100) | Tracks field-level changes to master data and documents |
| **Table Logging** (SE16 + SCU3) | Records changes to customizing and critical tables (requires `rec/client` parameter) |
| **Security Audit Log** (SM20/SM21) | Captures logon attempts, RFC calls, transaction starts, authority failures |
| **Application Logs** (SLG1) | Stores structured messages from batch jobs and interfaces |
| **Read Access Logging** (SRALMANAGER) | Logs read events on sensitive data (required for GDPR in some scenarios) |

### Security Audit Log (SM20)
- Configure filters in SM19 by user, transaction, event class (dialog logon, RFC, authority check).
- Critical events to monitor: successful/failed logon, RFC function calls, transaction starts for SU01/PFCG/SE16.
- In S/4HANA, the Security Audit Log supports a persistent kernel-based log that survives system restarts.

### Compliance Checklist
- [ ] All roles generated with current profile (`PFCG` -> Utilities -> Generate)
- [ ] No users hold `SAP_ALL` or `SAP_NEW` in production
- [ ] SoD rule set reviewed and updated at least annually
- [ ] Firefighter logs reviewed within defined SLA
- [ ] Security Audit Log active for all production clients
- [ ] Critical table logging enabled (`rec/client` parameter set)
- [ ] Dormant users locked after 90 days (report `RSUSR200`)

---

## SAP References

### SAP Help Portal
- [SAP Authorization Concept](https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP/4b2f13acc9d84e138ab2e5daca3d1d5c) -- Comprehensive guide to authorization objects, roles, and profiles.
- [SAP GRC Access Control](https://help.sap.com/docs/SAP_ACCESS_CONTROL) -- Product documentation for Access Risk Analysis, EAM, and BRM.

### SAP Notes
| Note | Title | Relevance |
|---|---|---|
| **1703803** | SU25: Upgrade of authorization defaults | Procedure for upgrading SU24 check indicator data after system upgrades or enhancement packs. |
| **2078663** | S/4HANA: Authorization concept changes | Documents new or changed authorization objects in S/4HANA compared to ECC. Essential for migration projects. |
| **1854561** | Security Audit Log configuration recommendations | Best-practice filter settings and performance considerations for SM19/SM20. |
| **2191612** | GRC 12.0: Access Risk Analysis rule set delivery | Describes SAP-delivered SoD rule sets and how to import or update them. |
