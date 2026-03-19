---
name: system-administration
description: Use when dealing with SAP Basis administration, transport management, system monitoring, upgrades, patching, or client management. Provides key tcodes, monitoring patterns, and SAP Notes.
---

# SAP Basis / System Administration

Comprehensive reference for SAP system administration tasks.

## Content Routing

| Topic | Section |
|---|---|
| Transports, import queues, transport routes | Transport Management |
| System logs, work processes, batch jobs | System Monitoring |
| DB performance, SQL traces, user sessions | Performance Monitoring |
| Client copy, client settings, cross-client | Client Management |
| SUM, SPAM, kernel patches, support packages | Upgrade & Patching |
| DEV/QAS/PRD landscape, sandbox, training | System Landscape |
| Quick tcode lookup | Key Transaction Codes |

---

## 1. Transport Management

### Core Transactions

- **STMS** -- Transport Management System configuration and monitoring
- **SE09 / SE10** -- Workbench / Customizing request management
- **SE01** -- Transport Organizer (extended view)

### Transport Routes

Transport routes define the path objects travel through the landscape:

- **Consolidation route**: DEV -> QAS (collect changes for testing)
- **Delivery route**: QAS -> PRD (deploy tested changes)
- Configure in STMS > Overview > Transport Routes

### Import Queue Operations

1. Open STMS > Import Overview > select target system
2. Review requests in the queue -- check dependencies and sequence
3. Import single or all requests; always import to QAS before PRD
4. After import, check return codes: 0 (success), 4 (warning), 8+ (error)

### Best Practices

- One task per developer per logical change; release tasks before requests
- Never transport directly to PRD -- always route through QAS
- Use transport of copies (SE01) for emergency repairs; document in change management
- Lock critical objects in PRD using SE03 > Set System Change Option
- Review import logs (STMS > Import History) after every import

---

## 2. System Monitoring

### SM21 -- System Log

- Displays kernel and application errors, login failures, and security events
- Filter by time, user, transaction, or message class
- Check daily for authorization failures and unexpected terminations

### SM50 / SM66 -- Work Processes

- **SM50**: Local work process overview (one app server)
- **SM66**: Global work process overview (all app servers)
- Watch for: long-running dialog processes, stuck update tasks, excessive RFC usage
- Actions: soft-cancel a process, debug a running process, restart after investigation

### ST06 -- OS Monitor

- CPU, memory, disk, and swap usage at the operating system level
- Alerts when CPU > 80% sustained or swap usage is high
- Drill into top processes to find resource consumers

### SM37 -- Background Job Monitoring

- Review scheduled, active, released, finished, and cancelled jobs
- Key checks: jobs stuck in "active" too long, recurring job failures
- Use SM36 to schedule or reschedule jobs; set spool and notification parameters

---

## 3. Performance Monitoring

### ST04 -- Database Performance

- Shows database buffer hit ratios, expensive SQL statements, and lock waits
- Target buffer quality > 98%; investigate statements with high elapsed time
- Cross-reference with DB-specific tools (Oracle AWR, HANA Studio, etc.)

### ST05 -- SQL Trace / Performance Trace

- Activate trace for a specific user or transaction
- Capture SQL, RFC, enqueue, and buffer trace data
- Analyze with "Display Trace" -- sort by duration to find bottlenecks
- Always deactivate traces after capture to avoid overhead

### SAT (SE30) -- ABAP Runtime Analysis

- Measures ABAP execution times at the statement level
- Identify expensive loops, nested SELECTs, and redundant calls
- Compare "before and after" traces when tuning code

### SM04 / AL08 -- User Sessions

- **SM04**: Users logged in on the local app server
- **AL08**: Users logged in across all app servers
- Useful for identifying who is consuming resources or blocking processes

---

## 4. Client Management

### SCC4 -- Client Administration

- Defines client properties: changeability, cross-client object lock, CATT restrictions
- Client roles: Customizing, Testing, Production, SAP Reference
- **Critical**: set PRD client to "No changes allowed" for customizing and repository

### Client Copy

| Transaction | Purpose |
|---|---|
| SCCL | Local client copy (same system) |
| SCC9 | Remote client copy (across systems) |
| SCC3 | Client copy log analysis |

### Client-Dependent vs Independent

- **Client-dependent**: customizing entries, master data, transactional data (tied to a specific client number)
- **Client-independent**: ABAP repository objects, cross-client customizing (applies to all clients in the system)
- Transports carry both; be aware of cross-client impact when importing

---

## 5. Upgrade & Patching

### SUM (Software Update Manager)

- Central tool for SAP upgrades and enhancement package installations
- Phases: extraction, detection, preprocessing, execution, postprocessing
- Plan for downtime; run SUM in phases to minimize production impact
- Reference: [SAP SUM Guide](https://help.sap.com/docs/SOFTWARE_UPDATE_MANAGER)

### SPAM / SAINT -- Support & Add-On Packages

- **SPAM**: Import support packages (kernel-independent corrections)
- **SAINT**: Install or upgrade SAP add-on components
- Always apply in the order: DEV -> QAS -> PRD
- Check pre-requisites with SAP Note **1227190** (SPAM/SAINT Update Procedure)

### Kernel Patches

1. Download kernel files from SAP Software Download Center (support.sap.com/swdc)
2. Stop SAP instance; back up current kernel directory
3. Extract new kernel files; adjust file permissions (Unix: sapstartsrv, disp+work)
4. Restart SAP instance; verify with `sm51` (kernel info) or `disp+work -version`
5. Reference: SAP Note **19466** (Collective Note for Kernel Patches)

### Support Package Stacks

- Apply as a stack (coordinated set of packages) rather than individual packages
- Use the Maintenance Planner at `apps.support.sap.com/smp` to calculate the stack
- Review release notes for each package before importing

---

## 6. System Landscape

### Standard Three-Tier Landscape

```
DEV (Development) --> QAS (Quality Assurance) --> PRD (Production)
```

- **DEV**: all development and initial customizing
- **QAS**: integration testing, user acceptance testing, performance testing
- **PRD**: live business operations; locked for direct changes

### Additional Systems

- **Sandbox (SBX)**: experimentation and prototyping; disposable
- **Training (TRN)**: end-user training with anonymized production data
- **Pre-Production (PRE)**: final dress rehearsal before go-live or upgrades

### Landscape Best Practices

- Refresh QAS/SBX periodically with production data (use system copy or TDMS)
- Maintain identical kernel and support package levels across DEV/QAS/PRD
- Separate transport domains if running multiple product lines (ERP + BW + S/4HANA)

---

## Key Transaction Codes

| TCode | Description |
|---|---|
| STMS | Transport Management System |
| SE09 | Workbench Requests |
| SE10 | Customizing Requests |
| SM21 | System Log |
| SM50 | Work Process Overview (local) |
| SM66 | Global Work Process Overview |
| SM37 | Background Job Overview |
| SM36 | Background Job Scheduling |
| ST06 | Operating System Monitor |
| ST04 | Database Performance Monitor |
| ST05 | Performance Trace (SQL, RFC) |
| SAT | ABAP Runtime Analysis |
| SM04 | User List (local) |
| AL08 | User List (global) |
| SCC4 | Client Administration |
| SCCL | Local Client Copy |
| SM51 | Application Server List |
| RZ10 | Profile Parameter Maintenance |
| RZ20 | CCMS Monitoring |
| SM12 | Lock Entry Management |
| ST22 | ABAP Dump Analysis |
| SU01 | User Maintenance |
| SICK | SAP Installation Check |

---

## Reference Links

- [SAP Help Portal -- System Administration](https://help.sap.com/docs/SAP_NETWEAVER/system-administration)
- [SAP Help Portal -- Transport Management](https://help.sap.com/docs/SAP_NETWEAVER/transport-management-system)

## SAP Notes

- **SAP Note 19466** -- Collective correction note for SAP kernel patches; always review before applying kernel updates
- **SAP Note 1227190** -- SPAM/SAINT update procedure and prerequisites; required reading before importing support packages
- **SAP Note 1969700** -- SQL Statement Collection for SAP HANA; useful for HANA-specific performance analysis
