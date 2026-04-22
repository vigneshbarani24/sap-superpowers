---
name: security-grc
description: Use when designing SAP authorization concepts, building or reviewing roles, analyzing SoD conflicts, implementing GRC Access Control (ARA/ARM/EAM/BRM), configuring Firefighter access, auditing security logs, or securing BTP with XSUAA and IAS.
---

# SAP Security and GRC

Governs all SAP authorization design, role management, segregation of duties (SoD), and GRC Access Control implementation. Authorization gaps create fraud exposure. SoD violations create audit findings. Neither is acceptable in a controlled system.

## Content Routing

| Topic | Section |
|-------|---------|
| Role design and authorization objects | Iron Laws + Key Concepts |
| SoD conflict identification | Key Concepts + Rationalization Table |
| GRC Access Control (ARA/ARM/EAM/BRM) | Key Concepts |
| Firefighter / emergency access | Key Concepts + Red Flags |
| Security audit log | Transaction Codes |
| BTP / XSUAA / IAS security | Integration Points |

## Iron Laws

1. **NEVER ASSIGN SAP_ALL OR SAP_NEW IN PRODUCTION — EVER.** SAP_ALL grants unrestricted access to every object in the system. It is not a temporary workaround, not a "we'll fix it later" measure, and not acceptable even for administrators. Any user with SAP_ALL in production is an uncontrolled risk and an automatic audit finding. Use dedicated administrator roles with documented scope.
2. **ALWAYS CHECK SOD BEFORE ANY ROLE ASSIGNMENT.** Every role assignment — new user, new role for existing user, or temporary access — must be analyzed for Segregation of Duties conflicts before the access is granted. Post-grant SoD remediation is expensive and incomplete. SAP GRC ARA or equivalent must be the gate, not the afterthought.
3. **NEVER SKIP AUTHORIZATION CHECKS IN CUSTOM ABAP CODE.** Custom programs that skip `AUTHORITY-CHECK` statements create uncontrolled access paths invisible to role-based security. Every custom transaction, report, and function that accesses sensitive data or changes business documents must implement `AUTHORITY-CHECK OBJECT` with appropriate field values and handle `SY-SUBRC <> 0`.
4. **ALWAYS USE DERIVED ROLES FOR ORGANIZATIONAL LEVEL RESTRICTIONS.** Parent roles define the functional scope (which tcodes, which auth objects). Derived roles inherit the parent's profile and add organization-level field values (company code, plant, sales org). Never manually set org-level values in the parent role — this makes the role un-derivable and forces duplication.
5. **NEVER ALLOW FIREFIGHTER ACCESS WITHOUT LOGGING AND REVIEW.** Emergency access (Firefighter / EAM) must generate a complete audit trail: session log, transaction log, system log correlation. Every Firefighter session must have a post-access review by the control owner within the organization's defined review period (typically 24–72 hours). Unreviewed Firefighter logs are an audit deficiency equivalent to no controls.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Assign SAP_ALL to a developer in production "temporarily" | "They just need access for this one fix" | SAP_ALL has no audit trail for specific actions; it bypasses every authorization check; "temporary" access persists indefinitely without formal revocation | Assign Firefighter ID via EAM with time-boxed access and session logging; revoke immediately after the task |
| Create a single role with all tcodes for "super users" | "Power users need broad access" | Broad roles accumulate SoD conflicts; audit finds every user with the role in violation; remediation forces rebuild of all affected user access | Design roles by business function, not by user convenience; use GRC BRM to model business roles from compliant single roles |
| Skip SU24 maintenance for custom tcodes | "SU24 is optional, the auth check works anyway" | Without SU24 entries, PFCG role maintenance doesn't propose the correct auth objects; admins manually add objects and create gaps or over-permissions | Maintain SU24 for every custom tcode at development time; include in ABAP development DoD |
| Use a test user with SAP_ALL to "prove" an access issue | "It's just for debugging the authorization problem" | SAP_ALL users in production are visible in SM20 audit log; they create evidence of uncontrolled access that auditors will flag regardless of stated intent | Use SU53 to capture the exact failed auth object; use SU22/SU24 trace (auth trace via ST01 or /SDF/GRF_TRACE) to identify missing objects |
| Grant vendor create AND payment authorization to the same user | "Our team is small, everyone does everything" | Vendor create + payment execution is a textbook SoD conflict; a single user can create a fraudulent vendor and pay them; this is a critical SoD risk in every compliance framework (SOX, ISO, GDPR) | Compensating controls (dual approval workflow, automated payment monitor) are required if the SoD cannot be segregated due to team size; document the risk acceptance |
| Remove existing roles and reassign from scratch to "clean up" | "Their access is messy, easier to start over" | Removing all roles locks the user out immediately; re-assignment without SoD check creates new violations | Use GRC ARM (Access Request Management) for any access change; ARM enforces SoD simulation before provisioning |
| Set auth field values to '*' (wildcard) across the board | "Wildcards are simpler to maintain" | Wildcard fields bypass organizational restrictions; a CO user with `BUKRS = *` can post to every company code — including those outside their responsibility | Set specific organizational values for all restriction fields; use derived roles to maintain values by org level |

## Red Flags

Watch for these in your own reasoning — each signals an authorization design or control failure:

- "SAP_ALL is just for the admin, it's fine..." → Iron Law 1. No user in production has a legitimate need for SAP_ALL. Full stop.
- "We'll do the SoD analysis after go-live..." → Post-go-live SoD remediation requires removing live user access. It causes business disruption and is never fully completed. SoD is a go-live gate, not a post-go-live task.
- "The developer can just use their own user for the production fix..." → Developer access in production without Firefighter logging is both a control failure and an audit finding. Use EAM-managed Firefighter IDs.
- "Let me just copy this user's roles to the new user..." → Role copying bypasses SoD simulation and transfers existing SoD violations to the new user. Always use GRC ARM or SoD-aware provisioning.
- "This custom report doesn't need an auth check, it's read-only..." → Read-only access to payroll, pricing conditions, or vendor master is equally sensitive. All custom programs accessing sensitive data require `AUTHORITY-CHECK`.
- "Firefighter logs are reviewed quarterly..." → Quarterly review of emergency access logs is insufficient for most compliance frameworks. Review must occur within the period defined by policy — typically within 72 hours of each session.

<HARD-GATE>
Before any role assignment or access provisioning: run SoD simulation in GRC ARA (or equivalent) and confirm zero critical violations. Before any role design begins: confirm the authorization concept document exists, defines organizational levels, and has been approved by the business process owner and security team. Do not assign roles or create authorization profiles without these confirmations.
</HARD-GATE>

## Key Concepts

### Authorization Architecture
- **Authorization Object:** The atomic unit of access control. Contains up to 10 fields (e.g., `S_TCODE` has field `TCD`; `F_BKPF_BUK` has fields `ACTVT` and `BUKRS`).
- **Authorization Profile:** A collection of authorization objects and their field values. Generated automatically by PFCG from role definition.
- **Single Role:** Functional access unit. Contains tcode assignments and authorization object/field values. Managed in PFCG.
- **Composite Role:** A container of single roles. Assigned to users for access packages. The composite role itself has no profile — it inherits from member single roles.
- **Derived Role:** Inherits profile structure (auth objects and tcodes) from a parent single role; overrides organizational field values (plant, company code, etc.). Enables scalable org-level access management.

### Key Authorization Objects

| Object | Purpose | Key Fields |
|--------|---------|------------|
| `S_TCODE` | Transaction code access | `TCD` |
| `S_TABU_DIS` | Table display authorization | `DICBERCLS`, `ACTVT` |
| `S_DEVELOP` | ABAP development objects | `DEVCLASS`, `OBJTYPE`, `ACTVT` |
| `F_BKPF_BUK` | FI document by company code | `BUKRS`, `ACTVT` |
| `F_BKPF_KOA` | FI document by account type | `KOART`, `ACTVT` |
| `M_BEST_BSA` | Purchase order document type | `BSART`, `ACTVT` |
| `V_VBAK_AAT` | Sales order type | `AUART`, `ACTVT` |
| `P_ORGIN` | HR master data | `INFTY`, `SUBTY`, `AUTHC`, `PERSA`, `PERSG`, `PERSK`, `VDSK1` |
| `B_USERSTAT` | BOR object status | `BOTYPE`, `ACTVT` |

### SoD — Common Critical Conflicts

| Conflict | Risk |
|----------|------|
| Vendor master create (`FK01`) + Payment run execute (`F110`) | Fraudulent vendor payment |
| Purchase order create (`ME21N`) + Goods receipt post (`MIGO` MvT 101) | Self-authorization of procurement |
| Customer master create (`FD01`) + Cash receipts post (`F-28`) | Receivables manipulation |
| GL journal entry post (`FB50`) + GL account master change (`FS00`) | Uncontrolled journal posting |
| User create/modify (`SU01`) + Role assignment | Privilege escalation |
| Payroll run (`PC00_MXX_*`) + Payroll master change (`PA30`) | Ghost employee and unauthorized pay |

### GRC Access Control Components
- **ARA (Access Risk Analysis):** Ruleset-based SoD analysis. Runs against user/role assignments. Produces risk reports by user, role, or org level. Core tool for audit evidence.
- **ARM (Access Request Management):** Workflow-driven provisioning portal. Enforces SoD simulation before role assignment. Integrates with ITSM for approval routing.
- **EAM (Emergency Access Management):** Firefighter framework. Assigns time-limited elevated access via Firefighter IDs; generates session logs; triggers post-access review workflow.
- **BRM (Business Role Management):** Designs and maintains business roles (composite role equivalents) mapped from compliant single roles. Business-language role catalog linked to technical SAP roles.

### Firefighter / Emergency Access
- **Firefighter ID:** Shared privileged user (type System or Service) assigned via EAM to a named controller for a defined time window. Never use personal user IDs for emergency access.
- **Session Logging:** EAM captures tcode usage, transaction volume, and timestamps. Correlate with SM20 (security audit log) for complete trail.
- **Review Process:** EAM triggers reviewer workflow post-session. Reviewer confirms business justification; unexplained activity escalates to security team. Log retention per policy (typically 12 months minimum).

### Security Audit Log
- **SM20:** Displays security audit log entries. Filter by user, event class, date. Event classes: logon/logoff, failed logon, auth failures, user master changes, RFC calls.
- **SAL (Security Audit Log configuration):** SM19 configures which events are logged per client. Minimum production configuration: all failed auth checks, all user master changes, all Firefighter logons.
- **RFC Security (UCON):** Unified Connectivity — controls which RFC function modules can be called from which RFC destinations. Phased activation model: logging phase (observe) → evaluation phase (identify blocklist) → enforcement phase (block unlisted calls).

### CDS Access Control (DCL)
- **DCL (Data Control Language):** ABAP CDS layer for row-level access restrictions. Define access conditions in `.dcl` files; referenced by `@AccessControl.authorizationCheck: #CHECK` annotation.
- **Access Control Object:** `PFCG`-managed object used in DCL conditions to filter CDS result sets based on user's authorization field values. Essential for RAP-based applications.

### BTP Security
- **XSUAA (Extended Services for User Account and Authentication):** OAuth 2.0 authorization server on BTP. Issues JWTs for BTP application access. Scopes and role collections map to application privileges.
- **IAS (Identity Authentication Service):** SAP's cloud identity provider. Acts as IdP for BTP and S/4HANA Cloud. Supports SAML 2.0 and OIDC federation to corporate IdPs (Azure AD, ADFS).
- **Role Collections:** BTP equivalent of composite roles. Aggregate roles from one or more applications; assigned to users or user groups in IAS.
- **Principal Propagation:** Mechanism to pass the BTP user identity through to backend SAP systems (S/4HANA, HANA) via SNC or OAuth token exchange. Avoids service user sharing.

## Transaction Codes

| TCode | Purpose |
|-------|---------|
| PFCG | Role Maintenance (Profile Generator) |
| SU01 | User Maintenance |
| SU10 | Mass User Maintenance |
| SU53 | Failed Authorization Check Analysis |
| SU22 | Auth Objects per Application |
| SU24 | Auth Object Check Indicators per TCode |
| SU25 | Upgrade preparation for SU24 |
| ST01 | System Trace (authorization trace) |
| SM19 | Security Audit Log Configuration |
| SM20 | Security Audit Log Display |
| SUIM | User Information System (role/user reports) |
| RSUSR002 | Users by authorization values (report) |
| GRC_ARA | GRC Access Risk Analysis (launchpad) |
| /GRCPI/GRIA_ARA | GRC ARA via PFCG-integrated analysis |
| NWBC | NetWeaver Business Client (GRC ARM access) |

## Integration Points

- **HR (SuccessFactors / HCM):** Employee master drives GRC ARM provisioning. Joiners/movers/leavers process triggers ARM requests. P_ORGIN authorization object controls HR infotype access.
- **ITSM (ServiceNow, Jira):** GRC ARM integrates for approval workflows. Security incidents involving auth failures are raised from SM20 events.
- **Cloud ALM:** Security alert monitoring integration. Auth-related alerts (repeated logon failures, SAP_ALL assignments) can trigger Cloud ALM incidents.
- **S/4HANA Cloud:** Uses business roles (BTP-style role collections at the application layer) rather than PFCG roles. Authorization concept for Public Cloud is predefined; extensibility is restricted to key-user apps only.
- **BTP / XSUAA / IAS:** Role collections in BTP subaccounts federated to IAS user groups. Changes to IAS corporate IdP federation affect all BTP and S/4HANA Cloud user access simultaneously.

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Authorization concept document exists and is approved: org levels defined, role naming convention established, SoD ruleset selected
- [ ] All roles built via PFCG: no manual profile edits, derived roles used for org level variants
- [ ] SoD simulation run in GRC ARA for every user affected by access change: zero critical violations, documented risk acceptance for any medium violations
- [ ] SU24 maintained for all custom tcodes: auth objects proposed correctly in PFCG
- [ ] Custom ABAP programs verified to contain `AUTHORITY-CHECK` with correct objects and field values
- [ ] Firefighter access configured in EAM: session logging active, reviewer assigned, post-access review workflow tested
- [ ] SM19 security audit log configured for production: failed auths, user master changes, and FF logons captured

**Evidence required:** GRC ARA risk report showing clean SoD result; PFCG role transport in production; SM20 audit log confirming security events are being captured.

## Next Skill

After security design or GRC implementation: `verification-before-completion`
For Basis-level user administration and system controls: `system-admin`
For BTP authorization and XSUAA setup: `btp`

## Related Skills

- `system-admin` — User management, SU01/SU10, Basis-level controls
- `btp` — XSUAA, IAS, role collections, principal propagation
- `abap-cloud` — Authority-check in custom ABAP, CDS access control (DCL)
- `development-workflow` — Including security reviews in ABAP development lifecycle
