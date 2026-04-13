---
name: system-admin
description: Use when performing SAP Basis or system administration tasks — transport management, user administration, background jobs, system monitoring, HANA administration, support pack maintenance, or system landscape management across DEV/QAS/PRD.
---

# SAP Basis / System Administration

Governs all SAP system administration activities. The landscape is the foundation everything else runs on — changes to production without proper controls, untested transports, and unmonitored systems create outages that are 100% preventable.

## Content Routing

| Topic | Section |
|-------|---------|
| Transport management | Iron Laws + Transaction Codes |
| User and authorization management | Key Concepts + Transaction Codes |
| System monitoring and dumps | Transaction Codes + Red Flags |
| Performance analysis | Key Concepts + Transaction Codes |
| Support pack / upgrade procedures | Key Concepts |
| HANA administration | Key Concepts |

## Iron Laws

1. **NEVER CHANGE PRODUCTION WITHOUT CHANGE MANAGEMENT APPROVAL.** Every change to a production system — transport import, manual configuration, kernel patch, support pack, user role change — requires a documented change request approved through the organization's change management process (Cloud ALM, Solution Manager, or equivalent). "Emergency" changes require emergency change procedures, not bypassing controls.
2. **ALWAYS CHECK SYSTEM LOGS BEFORE AND AFTER MAINTENANCE WINDOWS.** SM21 (system log) and ST22 (ABAP dumps) must be reviewed immediately before a maintenance window starts (to establish baseline) and within 30 minutes of completion. New dumps or log errors post-maintenance are caused by the maintenance — don't assume otherwise.
3. **NEVER DELETE TRANSPORTS FROM THE IMPORT QUEUE WITHOUT DOCUMENTATION.** Removing a transport from STMS import queue permanently excludes it from the landscape unless re-imported manually. Deleting without documentation makes the gap impossible to detect in future audits or when troubleshooting missing functionality.
4. **ALWAYS VERIFY BUFFER CONSISTENCY AFTER SUPPORT PACK APPLICATION.** Support packs modify ABAP repository objects, DDIC, and customizing. After application, run `/SDF/CDPOS_REORG` or use RSBC_BUFFER_CONSISTENCY to check buffer states. Inconsistent buffers after patching cause intermittent transaction failures that appear unrelated to the patch.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Import a transport directly to production to "save time" | "It's a small config change, we tested it manually" | Untested transports — even small ones — cause inconsistencies; they bypass QAS regression; they're undocumented and unauditable | Every transport must follow DEV → QAS → PRD. For emergencies: import to QAS first, get sign-off, import to PRD same day |
| Create an RFC destination in production without a transport | "RFC destinations can't be transported anyway" | Manual production changes are invisible to future teams; RFC destinations with embedded credentials are a security exposure | Use SM59 transport flag where available; document all manual prod changes in the change request |
| Schedule a background job in production without SM36 job documentation | "The business asked me to add this job today" | Undocumented jobs cause confusion, duplicate scheduling, and collision with existing job chains | Define the job in SM36 with proper job class, schedule, and owner; document in the ITSM ticket |
| Skip STMS transport route verification after landscape change | "The routes were set up when we built the system" | Landscape changes (new client, new system addition) invalidate existing routes; broken routes cause silent non-delivery of transports | After any landscape change, run `STMS → Overview → Transport Routes` and verify consistency check passes |
| Restart a crashed work process via SM50 without investigating the dump | "The process is back, problem solved" | The dump in ST22 contains the root cause; restarting without reading it means the same crash recurs | Always capture the ST22 dump before restarting; open an OSS message if the dump is SAP code |
| Apply support packs in production without a rollback plan | "We've applied packs before without issues" | SPAM has no automatic rollback for already-applied packs; partially applied packs leave the system in an inconsistent state | Pre-patch: document current kernel/SP level, take HANA snapshot, confirm backup completed. Define rollback procedure before starting. |
| Unlock a user with SU01 in production to "fix a login issue" | "The user is locked and has a meeting now" | Production user unlocks without investigation mask repeated authentication failures, brute-force attempts, or incorrect logon data | Check SM20 (security audit log) for lock reason before unlocking; correct root cause (password reset via SSPR if available) |

## Red Flags

Watch for these in your own reasoning — each signals a controls or stability risk:

- "I'll just make this change directly in production..." → Stop. Raise a change request. No exceptions regardless of urgency — escalate through emergency change procedure.
- "The transport queue is getting long, let me clean it up..." → Do not delete transports without explicit approval. Long queues are a process problem, not a technical one.
- "The system is slow, let me restart the dispatcher..." → A dispatcher restart is a last resort that drops all active sessions. Investigate via SM50/SM66 and ST22 first.
- "ST22 shows old dumps, nothing new..." → Check the date filter. Old unresolved dumps in ST22 indicate recurring issues that were never root-caused.
- "I'll set the user's password directly in SU01..." → In SSO landscapes, manual password resets bypass identity provider sync. Confirm the authentication method (SU01 → Logon Data tab) before touching the password.
- "Let me increase the work process count to fix the bottleneck..." → Work process count is bounded by hardware and license. Check SM50 utilization pattern first — more processes rarely fix the real problem.

<HARD-GATE>
Before any production system change: confirm a change request exists and is approved, a rollback procedure is documented, affected users/business processes have been notified, and a post-change verification plan is defined. Do not proceed with any production change without these four items confirmed in writing.
</HARD-GATE>

## Key Concepts

### System Landscape
- **Three-system landscape:** DEV (development and customizing), QAS (testing and integration), PRD (production). Changes flow DEV → QAS → PRD via STMS transport management.
- **Client:** Logical separation within an SAP system. Clients share hardware but have independent application data. Client 000 (SAP default), 001 (copy template), customer clients (e.g., 100, 200).
- **Client Settings (SCC4):** Controls client changeability (modifiable, not modifiable), cross-client object changes, and client role (production, test, customizing). Production client must be set to "Not Modifiable."

### Transport Management (STMS)
- **Transport Request Types:** Workbench requests (SE01 — cross-client, repository objects), Customizing requests (SE09 — client-specific settings).
- **Transport Route:** Defines which systems receive transports from which sources. Configured in STMS → Transport Routes.
- **Import Queue:** Pending transports for a system. STMS → Import Queue → select system. Imports should follow sequence (transport number order) unless explicitly desequenced with documentation.
- **SE10:** Overview of all transport requests for the logged-in user. Use to release and monitor request status.

### User Management
- **SU01:** Single user maintenance — create, change, lock, unlock, assign roles, set validity dates.
- **SU10:** Mass user maintenance — apply role assignments or locks across multiple users simultaneously.
- **SU53:** Authorization check analysis — displays the failed authorization object with actual vs. required field values. First tool to use for "no authorization" errors.
- **SU24:** Transaction code to authorization object mapping — defines which auth objects are checked for each tcode, and whether the check is active, inactive, or proposed.
- **Profile Generator (PFCG):** Role maintenance — creates authorization profiles from organizational levels and object selections. Always use PFCG to manage roles, never direct profile editing.

### Background Job Management
- **Job Classes:** A (high priority, reserved processing), B (normal), C (low priority, background). Production critical jobs should be class A or B.
- **Job Chains:** Predecessor dependencies set in SM36 → "After Job" to sequence jobs. Avoids time-based scheduling that fails when previous job runs long.
- **SM37:** Job monitoring — filter by user, job name, date, status. Check for status "Cancelled" or "Active" jobs running longer than expected.

### System Monitoring
- **SM50:** Work processes on the current application server — status, type (DIA, BTC, SPO, UPD), CPU, report name. Identify running long or stuck processes.
- **SM51:** List of active application servers. Allows SM50 drill-through to individual servers.
- **SM66:** Global work process overview across all application servers — critical for production load analysis.
- **SM21:** System log — OS-level and R/3 messages. Filter to ERROR and WARNING class for post-change review.
- **ST22:** ABAP Runtime Error (short dump) viewer. Contains program, line, runtime value, and call stack. Must be analyzed before restart.

### Performance Analysis
- **ST02:** Buffer statistics — hit ratios for program buffer, table buffer, CUA buffer, screen buffer. Hit ratio below 95% for program/table buffers indicates undersizing.
- **ST03N / ST03:** Workload Monitor — analysis of dialog, background, update, RFC response times by hour/day. Baseline performance before maintenance windows.
- **ST06:** OS Monitor — CPU, memory, disk I/O at OS level. Correlates with SM50/SM66 work process saturation.
- **SM12:** Lock entry table — identify and release stuck enqueue locks. Stuck locks block user transactions.

### HANA Administration
- **HANA Studio / HANA Cockpit:** Primary tools for DBA tasks — backup scheduling, alert monitoring, memory analysis, user management.
- **Backup/Recovery:** HANA supports full, incremental, and differential data backups plus log backups. Recovery point objective (RPO) drives log backup frequency — production typically every 15–30 minutes.
- **HANA Alerts:** Configured in HANA Cockpit. Critical alerts: low memory, high CPU, backup failure, replication lag (in scale-out). Integrate with SAP Alert Notification Service.
- **Table Distribution (Scale-Out):** In scale-out HANA, monitor partition placement and rebalancing operations. Avoid manual redistribution during business hours.

### Maintenance Procedures
- **SPAM (Support Package Manager):** Applies ABAP support packages (SPs) and SAP Notes. Import queue shows available packages from SAP support portal. Always apply in the correct sequence.
- **SAINT (Add-On Installation Tool):** Installs and upgrades add-on components (e.g., IS-Retail, SAP GRC, third-party add-ons). Requires system downtime in most cases.
- **Kernel Upgrade:** Replace executables in the OS-level kernel directory. Requires system stop. Always verify the new kernel is certified for the current database and OS version via SAP Product Availability Matrix (PAM).
- **Cloud ALM / Solution Manager:** Central hub for transport monitoring, system monitoring dashboards, job monitoring, and IT calendar (maintenance window management).

## Transaction Codes

| TCode | Purpose |
|-------|---------|
| STMS | Transport Management System |
| SE01 | Transport Organizer (Workbench + Customizing) |
| SE09 | Customizing Requests (client-specific) |
| SE10 | All Transport Requests |
| SCC4 | Client Administration |
| SCC1 | Client Copy (local) |
| SCCL | Local Client Copy |
| SU01 | User Maintenance (single user) |
| SU10 | User Mass Maintenance |
| SU53 | Authorization Error Analysis |
| SU24 | Auth Object Checks per TCode |
| PFCG | Role Maintenance (Profile Generator) |
| SM36 | Define Background Jobs |
| SM37 | Monitor Background Jobs |
| SM50 | Work Process Monitor (local server) |
| SM51 | Application Server List |
| SM66 | Global Work Process Monitor |
| SM21 | System Log |
| ST22 | ABAP Runtime Error (Dump) Analysis |
| SM12 | Lock Entry Table |
| ST02 | Buffer Statistics |
| ST03N | Workload Monitor |
| ST06 | OS Monitor |
| SPAM | Support Package Manager |
| SAINT | Add-On Installation Tool |

## Integration Points

- **Cloud ALM / Solution Manager:** Receives system monitoring data via Diagnostics Agent (SMD Agent). Provides centralized dashboards, transport tracking, and IT calendar for maintenance window coordination.
- **ITSM Tools (ServiceNow, Jira):** Change requests and incident tickets must reference SAP transport numbers and system change details for audit trail.
- **HANA Database:** Application servers connect via HANA JDBC. DBA Cockpit (DBACOCKPIT) provides SQL-level monitoring from ABAP; HANA Cockpit for native DBA tasks.
- **Identity Providers (LDAP/AD/IAS):** SNC (Secure Network Communications) or SAML integration for SSO. Changes to LDAP connectivity affect all user logons — treat as high-risk change.
- **Backup Infrastructure:** HANA backupcatalog must align with the organization's backup retention policy. Coordinate with infrastructure team for backup storage and off-site replication.

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Change request exists, is approved, and references all affected systems and transport numbers
- [ ] Pre-change baseline captured: SM21 and ST22 reviewed, ST03N workload snapshot taken
- [ ] Post-change verification completed within 30 minutes: SM21 clear, ST22 no new dumps, SM50 work processes stable
- [ ] Transport import sequence verified in STMS: no transports skipped, import log shows no errors
- [ ] Buffer consistency checked after support pack or kernel change: no inconsistency errors reported
- [ ] Post-change communication sent to affected business users confirming system availability

**Evidence required:** STMS import log showing successful completion; ST22 showing no new dumps post-change; change request updated to "Closed" with actual end time.

## Next Skill

After Basis maintenance or system change: `verification-before-completion`
For security role and authorization changes: `security-grc`
For integration connectivity issues post-change: `integration-suite`

## Related Skills

- `security-grc` — User authorization concepts and SoD analysis
- `abap-cloud` — ABAP development impacting system objects
- `troubleshooting` — Diagnosing ABAP dumps and runtime errors
- `integration-suite` — RFC destinations and middleware connectivity
