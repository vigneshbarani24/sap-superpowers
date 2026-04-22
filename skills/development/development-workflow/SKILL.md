---
name: development-workflow
description: Use when starting SAP development work, creating transports, moving objects across landscapes, structuring packages, or any task involving DEV→QAS→PRD change management.
---

# SAP Development Workflow

This skill enforces disciplined transport management and landscape governance — it makes landscape-breaking shortcuts impossible, not just inadvisable.

## Iron Laws

1. **NEVER DEVELOP IN PRODUCTION.** No exceptions. Not for "urgent fixes." Not for "just a config change." Not for "it's only a text." Production development bypasses QA, creates untraceable changes, and destroys audit trails. One violation invalidates the entire change management process.
2. **NEVER RELEASE A TRANSPORT WITHOUT TESTING.** A transport released to PRD without QAS validation is a production incident waiting to happen. "It worked in DEV" is not testing. QAS confirmation with documented test evidence is testing.
3. **NEVER MIX OBJECT TYPES IN ONE TRANSPORT.** Workbench objects and customizing objects belong in separate transports. Mixed transports create import sequence dependencies that break in production. One transport = one logical unit of change.
4. **NEVER SKIP THE NAMING CONVENTION.** Unnamed or inconsistently named objects become orphaned. When the developer leaves, no one knows what the object does, who owns it, or whether it's safe to delete.
5. **ALWAYS DOCUMENT THE TRANSPORT BEFORE RELEASE.** Description, linked ticket/change request, objects included, and reason for change. A transport with no description is a transport that will cause a production incident investigation to stall.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Suggest a direct PRD fix for "urgent" changes | "It's a 2-minute config change, the normal process takes days" | Emergency PRD changes have caused more production incidents than they've prevented. Every "urgent" shortcut bypasses regression checks. | Iron Law 1. Escalate to the emergency transport process (fast-tracked CTS), not a direct PRD change. |
| Mix workbench and customizing in one transport | "These changes are related, keep them together" | Workbench objects need ABAP import; customizing needs business config import. Mixed transports fail on import sequencing across clients. | Iron Law 3. Separate transports are always required. Link them in the change request, not in the transport. |
| Release to PRD without QAS sign-off | "There's no time, we need this in PRD today" | QAS exists to catch exactly the errors that "seem fine" in DEV. Skipping it means the first test is in production with real users. | Iron Law 2. If the process cannot accommodate QAS testing, the process is broken — escalate to management, don't skip QAS. |
| Create objects in the wrong package | "The default package is fine for now" | Objects in wrong packages lose their transport layer assignment. They become orphaned and cannot be moved to the correct landscape via CTS. | Checklist Step 2: Package assignment is mandatory before any object creation. |
| Skip transport documentation | "Everyone knows what this transport does, it's obvious" | In 6 months, "obvious" becomes "what was this for?" Transport audits, rollbacks, and incident investigations all depend on descriptions. | Iron Law 5. No transport gets released without a description referencing the change request. |
| Use local objects ($TMP) for development | "I'll move them to a proper package later" | Local objects cannot be transported. "Later" becomes never. Development ends up in $TMP and can never reach production. | Checklist Step 2: Assign to a transportable package before development begins. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you're about to violate an Iron Law:

- "It's just a small change in production..." → Iron Law 1. Stop. There is no such thing as a safe production change outside CTS.
- "We can clean up the package structure later..." → Later never comes. Package assignment happens before object creation.
- "Let's put everything in one transport to keep it simple..." → Simplicity now = import failure later. Separate by object type.
- "QAS is basically the same as DEV, testing there is just a formality..." → QAS exists because DEV is not DEV. Config drift, master data differences, and user permissioning make QAS essential.
- "I'll add the transport description before the release..." → The release IS the deadline. If it doesn't have a description, it doesn't get released.
- "The naming convention doesn't really matter for this one..." → It matters for every one. Inconsistency compounds.
- "CTS+ is overkill for this change..." → CTS+ is the process. Use it.

<HARD-GATE>
Before any development object is created or any transport is opened: confirm (1) the target package exists and is transportable, (2) the development system is DEV — not QAS or PRD, (3) a change request exists in the project tracking system, and (4) the naming convention for this customer/project is confirmed. If any of these four conditions is not met, STOP — do not create the transport.
</HARD-GATE>

## Checklist

1. **Confirm development system** — Verify the active system is the DEV client, not QAS or PRD.
   - Evidence: System ID and client number (e.g., D01/100) confirmed in SY-SYSID and SY-MANDT.
   - Gate: System is DEV. If not DEV, halt and escalate.

2. **Assign package before creating objects** — Check that a valid, transportable package exists for this project/module. Never use $TMP.
   - Evidence: Package name confirmed in SE80, package attributes show transport layer assigned.
   - Gate: Package exists with correct transport layer. If not, create the package before proceeding.

3. **Create the correct transport type** — Workbench changes (ABAP, Dictionary, BAdI) use Workbench Request (SE09). Customizing changes use Customizing Request (SE10). Never mix.
   - Evidence: Transport type shown in SE01 matches the object type being developed.
   - Gate: Correct transport type selected and documented.

4. **Apply naming convention** — All objects follow the customer namespace (Z/Y prefix or registered namespace). Object name includes module identifier and functional identifier per project standards.
   - Evidence: Object name matches the naming convention table confirmed in Step 0.
   - Gate: Name reviewed and approved before saving.

5. **Develop and unit test in DEV** — Implement the change. Run SE37 function module tests, write ABAP Unit tests where applicable, execute the full user scenario in DEV.
   - Evidence: Unit test results documented. DEV scenario walkthrough complete with screenshots or log output.
   - Gate: All unit tests pass. No syntax errors (SE38/SLIN). ATC checks complete with no open findings above threshold.

6. **Release transport from DEV** — Release the transport task (developer level) then the transport request (team lead level) via SE01/SE09.
   - Evidence: Transport status shows "Released" in SE01. Transport log shows no errors.
   - Gate: Transport released successfully. Request number recorded in change management ticket.

7. **Import to QAS and execute integration test** — Import the released transport to QAS via STMS. Execute the full test scenario in QAS with a test user (not an admin/basis user).
   - Evidence: STMS import log for QAS shows RC=0. Test execution results documented (pass/fail per test case). Tester name and date recorded.
   - Gate: All test cases pass in QAS. If any fail, return to DEV — do not import partial fixes directly to QAS without a new transport.

8. **Obtain PRD import approval** — Change request status updated to "QAS Approved." PRD import request submitted per the customer's change management process.
   - Evidence: Change request shows QAS sign-off with approver name. PRD import request created in the customer's ITSM tool.
   - Gate: Formal approval received. Import scheduled in the next available change window.

9. **Import to PRD and verify** — Import the transport to PRD via STMS during the approved change window. Execute smoke test in PRD immediately after import.
   - Evidence: STMS import log for PRD shows RC=0. PRD smoke test results documented. No production incidents raised within 24 hours.
   - Gate: PRD smoke test passes. Change request closed with completion date.

## Transport Naming Reference

| Object Type | Transport Type | T-Code to Create | Notes |
|---|---|---|---|
| ABAP programs, function modules, classes | Workbench Request | SE09 | Never mix with customizing |
| IMG/customizing settings | Customizing Request | SE10 | Never mix with workbench |
| Transport of copies | Transport of Copies | SE01 | For corrections only — not standard development flow |
| CTS+ (extended transport) | CTS+ Request | CTS_BROWSER | For non-ABAP content (Fiori, BTP, metadata) |

## Landscape Overview

```
DEV (Development) → QAS (Quality Assurance) → PRD (Production)
     SE09/SE10           STMS Import               STMS Import
     (develop)           (integration test)         (change window)
```

Each arrow represents a formal transport import — never a direct change.

## Package Structure Template

```
Z<CUSTOMER>_<MODULE>         — Top-level package (e.g., ZABC_FI)
  Z<CUSTOMER>_<MODULE>_OBJ   — Dictionary objects (tables, structures, types)
  Z<CUSTOMER>_<MODULE>_PRG   — Programs and reports
  Z<CUSTOMER>_<MODULE>_FC    — Function groups and modules
  Z<CUSTOMER>_<MODULE>_CL    — Classes and interfaces
  Z<CUSTOMER>_<MODULE>_ENH   — Enhancements and BAdI implementations
  Z<CUSTOMER>_<MODULE>_CFG   — Configuration (if workbench-transportable)
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Development was performed in DEV system — never in QAS or PRD
- [ ] All objects are assigned to a transportable package (not $TMP)
- [ ] Naming conventions applied to every object created
- [ ] Transport types are correct — workbench and customizing in separate transports
- [ ] All transports have descriptions referencing a change request number
- [ ] Unit tests documented with pass results in DEV
- [ ] QAS import RC=0 confirmed in STMS import log
- [ ] QAS test cases executed and documented with tester sign-off
- [ ] PRD import approved via formal change management process
- [ ] PRD import RC=0 confirmed and smoke test executed

**Evidence required:** STMS import logs (DEV release + QAS import + PRD import), unit test documentation, QAS test case results with tester sign-off, change request with approval trail.

## Next Skill

After completing this skill, invoke: `code-review`
Conditions for handoff: Before the transport is released from DEV (after Step 5, before Step 6), trigger code review to validate the implementation against standards.

## Cross-References

- Use `code-review` before releasing any transport from DEV
- Use `troubleshooting` if STMS import fails at any landscape stage
- Use `code-generation` when the development task involves generating new ABAP Cloud or RAP objects
