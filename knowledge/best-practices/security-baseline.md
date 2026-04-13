# SAP Security Baseline — Reference Guide

**Last Updated:** 2026-04-12
**Applies To:** SAP NetWeaver ABAP 7.40+, S/4HANA On-Premise, SAP HANA DB, SAP BTP
**Referenced By:** skills/security-grc, skills/system-admin, skills/s4hana-migration
**Source:** SAP Security Baseline Template (SAP Note 2622660), SAP Security Guide

> **Principle:** Defense in depth. Every layer — OS, database, ABAP, network, identity — must have its own controls. No single control is sufficient.

---

## 1. Login and Password Policy Parameters

Set in RZ10 (instance or default profile). Apply to ALL systems including DEV.

| Parameter | Recommended Value | Minimum Required | Description |
|-----------|-----------------|-----------------|-------------|
| `login/fails_to_user_lock` | 5 | 5 | Lock user after N failed attempts |
| `login/failed_user_auto_unlock` | 1 | 1 | Auto-unlock at midnight (0 = never unlock) |
| `login/min_password_lng` | 12 | 8 | Minimum password length |
| `login/password_expiration_time` | 90 | 180 | Days until password expires (0 = never) |
| `login/password_history_size` | 10 | 5 | Number of previous passwords blocked for reuse |
| `login/password_max_idle_initial` | 14 | 30 | Days before initial password expires if unused |
| `login/password_max_idle_productive` | 180 | 365 | Days before productive password expires if unused |
| `login/no_automatic_user_sapstar` | 1 | 1 | Prevent SAP* re-creation with default password |
| `login/disable_multi_gui_login` | 2 | — | 0=allow, 1=warn, 2=block multiple logins |
| `rdisp/gui_auto_logout` | 3600 | 7200 | Auto-logout after N seconds idle (3600 = 1 hour) |
| `login/show_detailed_errors` | 0 | 0 | Hide detailed login errors from end user |
| `icm/accept_remote_trace_level` | 0 | 0 | Prevent remote trace activation |

---

## 2. Default User Lockdown

These users exist in every SAP system by default and must be secured immediately after installation.

| User ID | Type | Required Action | Profile |
|---------|------|----------------|---------|
| SAP* | Dialog | Lock immediately; set strong password (64 char random); never use in production | SAP_ALL (implicit) |
| DDIC | Dialog | Lock in all clients except 000 during upgrades; set strong password | SAP_ALL (implicit in 000) |
| EARLYWATCH | Dialog | Lock in all clients; used only for service sessions (SolMan handles this now) | SAP_ALL |
| SAPCPIC | Communication | Lock if not used for CPI-C; replace with named RFC user | — |
| TMSADM | System | Transport management — set strong password; restrict to STMS-only authorizations | — |
| WF-BATCH | System | Workflow batch user — change default password; restrict to workflow authorizations only | — |

**Validation check** (run monthly via RSUSR002):
```
Transaction RSUSR002:
- Filter: Valid Users with Profile SAP_ALL or SAP_NEW
- Filter: Users not locked
- Expected result: Zero rows in production
```

---

## 3. RFC Security — Unified Connectivity (UCON)

**SAP Note:** 2159710

UCON controls which RFC function modules can be called by external systems. Mandatory for SAP Security Baseline compliance.

### RFC Destination Hardening (SM59)

| Setting | Required Value | Rationale |
|---------|---------------|-----------|
| Logon Method | Current User or Named User (not stored password where possible) | Prevent credential sharing |
| Connection type 3 (ABAP-ABAP) | Use trusted RFC where SAP-to-SAP | Avoid password-based RFC |
| Type H (HTTP) destinations | HTTPS only; validate certificate | Prevent MITM |
| `login/accept_sso2_ticket` | 0 in untrusted landscapes | Disable SSO ticket acceptance |
| SMGW: `gw/sec_info` | File configured with trusted systems list | Prevent unauthorized gateway connections |
| SMGW: `gw/reg_info` | File configured; restrict program IDs | Block unauthorized registered programs |

### UCON — Whitelist Approach

```
Phase 1 (Logging): Enable UCON logging for 30 days — record all RFC calls
Phase 2 (Analysis): Review UCON Communication Assembly (UCONCOCKPIT)
Phase 3 (Enforcement): Switch to enforcement mode — block uncatalogued RFC calls
Phase 4 (Maintenance): Add new FMs via change request process only
```

---

## 4. Segregation of Duties (SoD) — Top 20 Critical Conflicts

These SoD conflicts represent the highest financial fraud risk. Zero tolerance in production.

| # | Conflict Name | Access A | Access B | Risk |
|---|--------------|----------|---------|------|
| 1 | Create and Post Vendor Invoice | MIRO (MM-IV) | MIR7 park + post own parked | Fictitious invoice payment |
| 2 | Maintain Vendor Master + Post Payment | XK01/MK01 (via BP) | F110 payment run | Redirect payments to fraudulent vendor |
| 3 | Create Sales Order + Create Billing | VA01 | VF01 | Revenue manipulation without delivery |
| 4 | Maintain Customer Master + Post Cash | BP (customer) | F-28 incoming payment | Payment misappropriation |
| 5 | Maintain G/L Accounts + Post Journal | FS00 | FB50 / F-02 | Undetected manual journal manipulation |
| 6 | User Admin + Role Maintenance | SU01 | PFCG | Self-grant of any access |
| 7 | ABAP Debug + Change Mode | S_ABAP_DEBUGG with ACTVT=02 | SE38 change (in prod) | Debug-and-replace data bypass |
| 8 | Transport Import to Production + Developer | STMS import | SE38 development | Self-promotion of code to production |
| 9 | Payroll Processing + Payroll Master | HR payroll run | PA30 infotype 0008/0014 | Ghost employee / salary manipulation |
| 10 | Purchase Order Creation + Goods Receipt | ME21N | MIGO GR | Two-way match bypass |
| 11 | Purchase Requisition + PO Approval | ME51N | ME28 approval | Self-approval of own requisition |
| 12 | Bank Master Maintenance + Payment Run | FI12 bank master | F110 | Redirect bank payments |
| 13 | Asset Creation + Asset Disposal | AS01 | ABAVN | Asset disposal without oversight |
| 14 | Inventory Adjustment + Goods Issue | MI07 count post | MB1A goods issue | Inventory theft concealment |
| 15 | Maintain Condition Records + Billing | VK11 | VF01 | Self-grant of pricing discounts |
| 16 | MM Config Changes + Goods Receipt | SPRO (tolerance keys) | MIGO | Bypass three-way match |
| 17 | Credit Limit Maintenance + Sales Order | FD32 (or FSCM-CR) | VA01 | Approve own customer orders over limit |
| 18 | Tax Code Configuration + Tax Posting | FTXP | FB60/MIRO | Under-report tax liability |
| 19 | Maintain Basis Profiles + Execute Batch | RZ10 / SM19 | SM36 | Schedule unauthorized batch jobs |
| 20 | Execute Program SE38 + Table SE16N Change | SE38 ACTVT=16 | SE16N edit flag | Direct table manipulation |

---

## 5. Audit Log Configuration (SM20 / SAL)

### Security Audit Log (SM19 / RSAU_CONFIG in S/4HANA)

Configure at minimum:

| Event Class | Events | Capture In |
|-------------|--------|-----------|
| Logon events | Successful and failed logons | All systems |
| RFC/HTTP calls | Failed RFC authorization checks | PRD + QAS |
| Transaction starts | All dialog transactions started | PRD |
| Authorization failures | Failed authorization checks (S_ABAP_DEBUGG, S_USER_GRP) | All systems |
| User master changes | SU01 create/lock/unlock/password change | All systems |
| Role/profile changes | PFCG changes | All systems |
| Background job submission | SM36 sensitive job submissions | PRD |

**Retention:** Minimum 12 months online; 7 years archived (regulatory compliance).

**Monitoring:** Configure SAP ALM or SIEM integration to alert on:
- Logon outside business hours from privileged users
- SAP* or DDIC logon (should never occur in PRD)
- > 10 authorization failures from one user in 5 minutes
- Debug-and-replace (S_ABAP_DEBUGG ACTVT=02) usage in PRD

---

## 6. HANA Database Security

### User Privilege Minimization

```sql
-- Never grant to application users:
GRANT SYSTEM PRIVILEGE TO <user>;  -- BLOCKED
GRANT SELECT ON SCHEMA _SYS_REPO TO <user>;  -- BLOCKED

-- Application user minimum grants:
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA <app_schema> TO <app_user>;
-- Read-only reporting user:
GRANT SELECT ON SCHEMA <app_schema> TO <report_user>;
```

### HANA Encryption Settings

| Layer | Setting | Required |
|-------|---------|---------|
| Data-at-rest | HANA Data Volume Encryption | Enable in PRD and BCP |
| In-transit | TLS 1.2+ for all HANA connections | Enforce — disable TLS 1.0/1.1 |
| Backup encryption | Encrypted backup with BACKINT or file system encryption | Enable for all system types |
| Audit log | HANA audit policy active | Enable for PRD |

### HANA Audit Policy (minimum)

```sql
CREATE AUDIT POLICY sap_baseline_audit
  AUDITING SUCCESSFUL
    CONNECT, DISCONNECT,
    ALTER USER, CREATE USER, DROP USER,
    GRANT PRIVILEGE, REVOKE PRIVILEGE,
    SELECT ON _SYS_REPO.ACTIVE_OBJECT
  LEVEL INFO;

ALTER AUDIT POLICY sap_baseline_audit ENABLE;
```

---

## 7. BTP Security — XSUAA and IAS

### BTP Authentication Controls

| Control | Implementation | Requirement |
|---------|---------------|-------------|
| Identity Provider | SAP Identity Authentication Service (IAS) | Mandatory for production BTP |
| MFA | Enforced via IAS risk policy for all BTP cockpit access | Mandatory |
| XSUAA Scopes | Minimum required scopes per microservice | Zero unused scopes |
| API Keys | Never — use OAuth 2.0 client credentials | API keys prohibited |
| Service Binding | Bind service instances to app — never share credentials | Per-app binding |
| Destination Security | Use certificate-based auth for S/4HANA connectivity | Password auth deprecated |

### XSUAA Role Design

```json
{
  "role-template": "SalesViewer",
  "description": "Read-only access to sales data",
  "scope-references": ["$XSAPPNAME.SalesRead"],
  "attribute-references": []
}
```

Rules:
- One role collection per job function (not per person)
- Never assign role template directly — always via role collection
- Review role collection assignments quarterly
- Remove immediately on offboarding (< 1 business day SLA)

---

## 8. Security Checklist — Go-Live Gate

Before go-live, validate all items:

- [ ] login/* parameters set per baseline (RZ10, instance profile, default profile)
- [ ] SAP*, DDIC, EARLYWATCH locked in all clients
- [ ] No user with SAP_ALL in production
- [ ] UCON enforcement mode active (or documented exception)
- [ ] RFC destinations reviewed — no stored passwords for internal connections
- [ ] Security Audit Log (SAL) active with minimum event classes
- [ ] HANA data-at-rest encryption enabled
- [ ] HANA TLS 1.2+ enforced
- [ ] HANA audit policy active
- [ ] GRC Access Control SoD ruleset applied (top 20 conflicts at minimum)
- [ ] All SoD conflicts documented with risk acceptance or mitigating controls
- [ ] Privileged access (basis team) uses named users — no shared admin accounts
- [ ] Emergency access (firefighter) process documented and tested (GRC EAM or manual log)
- [ ] BTP: IAS connected; MFA enforced; no API keys
- [ ] Password for all system users (TMSADM, WF-BATCH) changed from default
