---
name: transport-release
description: Use when releasing transport requests through the SAP transport landscape. Enforces pre-release checks, dependency validation, and proper CTS workflow — DEV → QAS → PRD with quality gates at each stage.
---

# Transport Release — CTS Workflow Management

This skill manages the release and promotion of transport requests through the SAP transport landscape. It enforces quality gates before each release and ensures proper CTS discipline.

## Iron Laws

1. **NEVER RELEASE WITHOUT PRE-RELEASE CHECKS.** Every transport must pass: syntax check on all objects, ATC run clean, unit tests pass, no inactive objects, and no missing dependencies.

2. **NEVER SKIP IMPORT SEQUENCE.** Transports release in dependency order. If Transport B depends on Transport A, A must be imported first. Out-of-sequence imports cause dump-at-import.

3. **NEVER RELEASE DIRECTLY TO PRODUCTION.** All transports follow DEV → QAS → PRD. No direct modifications to production objects. No emergency transports without documented justification and post-release review.

4. **ALWAYS VERIFY AFTER IMPORT.** After importing into each target system, verify: no import errors, objects active, no short dumps in SM21, application works as expected.

<HARD-GATE>
Before releasing any transport:
1. All objects in the transport compile without syntax errors
2. No inactive objects remain (SE80 → Inactive Objects)
3. ATC run completed with zero P1/P2 findings
4. All unit tests pass
5. Transport description follows standard: "[Module]-[Type]-[Brief description]"
6. No unauthorized objects included (cross-check with the development task scope)
</HARD-GATE>

## Release Process

### Step 1 — Transport Inventory
Document the transport contents:
- Transport number and description
- All objects included (type, name, action: create/modify/delete)
- Owner and development task
- Dependencies on other transports

### Step 2 — Pre-Release Checks
Run all checks before releasing:
- Syntax check on every object
- ATC with project check variant
- Unit test execution for all modified classes
- Inactive object check (must be zero)
- Cross-reference check (no missing includes/dependencies)

### Step 3 — Release from Development
- Release the task (developer level)
- Release the request (project lead level)
- Verify transport log is clean (return code 0 or 4, NOT 8 or 12)

### Step 4 — QAS Import & Verification
- Import into quality assurance system
- Verify import log (RC 0 or 4)
- Run smoke tests in QAS
- Verify no new short dumps (SM21)
- Get QA sign-off

### Step 5 — Production Import
- Schedule production import during maintenance window
- Import with appropriate options (R3trans flags)
- Verify import log
- Run production verification tests
- Monitor SM21 and ST22 for 24 hours post-import

## Transport Description Standard

```
[MODULE]-[TYPE]-[Description]

Examples:
FI-ENH-Custom payment block logic for vendor invoices
MM-FIX-Purchase order pricing condition type determination
SD-NEW-Customer credit check enhancement via BAdI
BC-CFG-Transport route configuration for new QAS client
```

## Verification

- [ ] All pre-release checks passed
- [ ] Transport released with clean log
- [ ] QAS import successful with RC ≤ 4
- [ ] QAS verification completed
- [ ] Production import scheduled/completed per process
- [ ] Post-import monitoring confirms no issues

## Next Skill

After transport release: `hypercare` (for post-deployment monitoring)

## Cross-References

- `autopilot` — Creates objects that need transport management
- `go-live-readiness` — Verifies all transports are released and imported before go-live
- `self-correcting-loop` — Fixes issues found during pre-release checks
