---
name: troubleshooting
description: Use when diagnosing SAP runtime errors, performance issues, integration failures, or any unexpected system behavior. Enforces structured root cause analysis — not guessing.
---

# SAP Troubleshooting

This skill enforces structured root cause analysis. It makes guessing, untested fixes, and undocumented resolutions structurally impossible.

## Iron Laws

1. **NEVER GUESS ROOT CAUSE.** "I think the problem is..." is not a root cause. Every hypothesis must be tested against evidence from SAP diagnostic tools before any fix is applied. Guessing produces wrong fixes that mask symptoms and create new problems.
2. **CHECK ST22 AND SM21 FIRST.** Before forming any hypothesis, read the dump in ST22 and the system log in SM21. These contain the exact error, the exact stack trace, and the exact timestamp. Skipping them guarantees you are working without evidence.
3. **NEVER FIX WITHOUT UNDERSTANDING CAUSE.** Applying a fix before the root cause is confirmed produces one of two outcomes: the fix works by coincidence (the real cause remains and will resurface), or the fix does nothing (time wasted, system still broken). Neither is acceptable.
4. **REPRODUCE BEFORE FIXING.** If you cannot reproduce the error in a controlled way, you cannot confirm a fix has worked. A fix applied to an unreproducible error is an unverifiable fix.
5. **DOCUMENT ROOT CAUSE AND FIX.** Every resolved incident must have a written root cause analysis. Undocumented fixes produce recurring incidents — the next consultant starts from scratch every time.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip ST22 and jump to "known fixes" | "I've seen this error before, I know what it is" | The same error message can have five different root causes. Assuming you know the cause from memory is guessing with extra steps. | Iron Law 2. Open ST22. Read the full dump. The cause is in the evidence, not in memory. |
| Apply a transport or note without diagnosing | "SAP Note 1234567 fixes this class of error" | Notes fix specific causes. If your cause is different, the note changes nothing — or introduces new problems. | Iron Law 3. Confirm the root cause first. Then confirm the note addresses exactly that cause. |
| Skip reproduction because "it's intermittent" | "We can't reproduce it, so we just have to try something" | Intermittent issues have patterns — time, user, transaction, data volume. Find the pattern. Check SM21 for frequency. Use ST05 to catch the failure. | Iron Law 4. Document all known occurrence conditions. Attempt reproduction under those conditions. If truly unreproducible, escalate — do not guess. |
| Fix in production directly | "DEV doesn't have the same data, we need to fix it in PRD" | Fixing production without a tested fix path is gambling with a live system. | Reproduce in DEV or QAS. Test fix there. Transport via standard path. Emergency fixes require documented emergency change process. |
| Close the incident after the symptom disappears | "The error stopped happening, must be fixed" | Errors stop and recur. "It stopped" is not root cause. | Iron Law 5. Root cause must be identified and documented. If cause is unknown, the incident stays open. |
| Treat the first working hypothesis as confirmed cause | "That explains it, let's fix it" | The first plausible explanation is usually the simplest, not the correct one. Systems have complex interactions. | Hypothesize → Test → Confirm. A hypothesis is not confirmed until evidence from diagnostic tools supports it. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate structured diagnosis:

- "I think the problem is..." → Iron Law 1. What does ST22 say? What does SM21 say? Thought is not evidence.
- "Let's just try..." → Iron Law 3. Trying without understanding is guessing. What is the hypothesis? What evidence supports it?
- "This usually fixes it..." → Iron Law 1. "Usually" means sometimes it doesn't. What is the root cause in this specific case?
- "We've seen this before, it's probably..." → Read the dump. Confirm it matches the previous case exactly. Probably is not confirmed.
- "The error stopped, so it's resolved..." → Root cause must be documented. Unknown cause = open incident.
- "We can't reproduce it, let's deploy a fix anyway..." → Iron Law 4. Untestable fix is unverifiable fix.
- "We'll document it later..." → Iron Law 5. Later means never. Document before closing.

<HARD-GATE>
Before applying any fix: confirm (1) ST22 or SM21 has been checked and the error evidence is documented, (2) the error has been reproduced in a non-production environment or occurrence conditions are fully documented, (3) a specific root cause hypothesis has been stated and tested against diagnostic evidence, and (4) the fix addresses the confirmed root cause — not just the symptom. If any of these four conditions is not met, no fix may be applied.
</HARD-GATE>

## Diagnostic Process

### Step 1 — Reproduce

Define the exact conditions under which the error occurs. Gather from the reporter: transaction code, user, time, input data, and exact error message or dump ID. Attempt to reproduce in DEV or QAS.

- Evidence: Reproduction steps documented. Confirmation that the error is reproducible under those steps.
- Gate: Error is reproducible on demand, OR occurrence conditions (user, time, data pattern) are fully documented if intermittent.

### Step 2 — Collect Evidence

Run all applicable diagnostic tools before forming any hypothesis.

- **ST22 (ABAP Dump Analysis):** Open the exact dump for the error. Record: dump type, program, include, line, exception text, active call stack, and system variables at time of dump.
- **SM21 (System Log):** Filter by time window of the incident. Record all WARNING and ERROR entries in the relevant window. Identify correlated entries from other components (RFC, spool, batch).
- **ST05 (SQL Trace / RFC Trace):** Activate before reproducing. Capture all SQL statements executed during the failing transaction. Identify missing index hits, full table scans, lock waits.
- **SAT (ABAP Trace / Runtime Analysis):** Activate for performance-related failures. Capture gross time and net time by program, method, and database call.
- **SM50/SM66 (Work Process Monitor):** For hanging or slow transactions, check work process status, program name, and wait reason in SM50 (local) and SM66 (system-wide).
- **SLG1 (Application Log):** Check for application-level error messages logged by the failing component.

- Evidence: Exported or documented findings from each applicable tool. ST22 dump export. SM21 log extract. ST05 trace file if SQL-related.
- Gate: Evidence collected from at minimum ST22 and SM21 before any hypothesis is formed.

### Step 3 — Hypothesize

Based only on the collected evidence, form a specific hypothesis. State: "The root cause is [specific cause] because [specific evidence from Step 2]." One hypothesis at a time. Rank hypotheses by evidence strength.

- Evidence: Written hypothesis statement referencing specific evidence (e.g., "NULL pointer exception at line 247 of ZCL_INVOICE_PROCESSOR because the evidence in ST22 shows LV_VENDOR is initial when the input PO has no vendor assigned").
- Gate: Hypothesis references specific evidence. No hypothesis formed without Step 2 evidence.

### Step 4 — Test Hypothesis

Design a test that would confirm or disprove the hypothesis without applying a permanent fix. Examples: add a breakpoint and inspect variable state, add a temporary assertion, check whether the error occurs only when the specific condition is met, trace with ST05 to confirm the suspected SQL pattern.

- Evidence: Test design documented. Test results documented — what was observed, what it confirms or disproves.
- Gate: Test result either confirms hypothesis (proceed to Step 5) or disproves it (return to Step 3 with new evidence).

### Step 5 — Confirm Root Cause

State the confirmed root cause with full supporting evidence. The confirmed root cause must be specific enough to determine the correct fix. "Something wrong with the invoice process" is not a confirmed root cause. "LV_VENDOR is not populated when PO type NB has no vendor master record, causing a NULL dereference at ZCL_INVOICE_PROCESSOR line 247" is a confirmed root cause.

- Evidence: Confirmed root cause statement. Evidence chain from Step 2 → Step 3 → Step 4 → confirmation.
- Gate: Root cause is specific, supported by evidence, and directly points to the fix required.

### Step 6 — Fix and Test

Implement the fix in DEV. Apply it to the confirmed root cause only — do not fix adjacent issues in the same change (separate concerns, separate transports). Test the fix under the exact reproduction conditions from Step 1. Confirm the error no longer occurs. Run regression test on related functions.

- Evidence: Fix described (what changed, why). Test confirmation that error no longer reproduces. Regression test results.
- Gate: Error does not reproduce after fix. No regression in related functionality. Fix transported through standard DEV → QAS → PRD path.

### Step 7 — Verify in Production and Document

After transport to production, verify the fix is effective under real conditions. Complete the root cause analysis document.

- Evidence: Production verification confirmation. Completed Root Cause Analysis document.
- Gate: No recurrence of the error after fix applied. RCA document completed and stored in incident record.

## Root Cause Analysis Document Template

```
ROOT CAUSE ANALYSIS
===================
Incident ID: [Ticket/incident number]
System: [SID and client]
Date of occurrence: [Date and time]
Reported by: [User/team]
Resolved by: [Developer/consultant]
Resolution date: [Date]

SYMPTOMS
--------
Transaction: [T-code where error occurred]
Error message: [Exact error text or dump type]
Dump ID: [ST22 dump ID if applicable]
Frequency: [Single occurrence / recurring / intermittent - pattern]
Impact: [Users affected, business process impact]

EVIDENCE COLLECTED
------------------
ST22: [Dump type, program, line, exception, key variables]
SM21: [Relevant log entries and timestamps]
ST05: [SQL findings if applicable]
SAT:  [Runtime findings if applicable]
SM50: [Work process status if applicable]
Other: [Any additional tools or logs consulted]

ROOT CAUSE
----------
Confirmed root cause: [Specific, evidence-backed cause statement]
Evidence chain: [How evidence from Step 2 led to hypothesis and confirmation]

FIX APPLIED
-----------
Description: [What was changed and why]
Transport: [Transport number]
Fix applied in: DEV [date] → QAS [date] → PRD [date]

VERIFICATION
------------
PRD verification: [Confirmed resolved / date / by whom]
Regression test: [Pass/fail and scope]

PREVENTION
----------
Recurrence risk: [High / Medium / Low]
Prevention action: [Code fix / config change / monitoring / none required]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Error reproduced in non-production environment OR occurrence conditions fully documented
- [ ] ST22 checked — dump details documented (if runtime error)
- [ ] SM21 checked — relevant log entries documented
- [ ] Additional tools (ST05, SAT, SM50, SLG1) used where applicable and findings documented
- [ ] Root cause hypothesis formed based on evidence only
- [ ] Hypothesis tested — confirmed or disproved with test evidence
- [ ] Root cause confirmed — specific, evidence-backed statement documented
- [ ] Fix implemented and tested against reproduction conditions
- [ ] Fix transported through DEV → QAS → PRD — no direct production changes without tested transport
- [ ] Production verification completed — no recurrence confirmed
- [ ] Root cause analysis document completed and attached to incident record

**Evidence required:** ST22 export or SM21 log extract, completed Root Cause Analysis document, transport confirmation, production verification record.

## Next Skill

After completing this skill, invoke: `code-review`
Conditions for handoff: After root cause is confirmed and fix is implemented, submit the fix code for code-review before transport to production. Attach the RCA document as context for the reviewer — the fix must be reviewed against the confirmed root cause, not in isolation.

## Cross-References

- Use `code-review` to review the fix before transport release
- Use `performance-tuning` when ST05 or SAT evidence points to SQL or runtime performance as the root cause
- Use `development-workflow` for transport management after fix is approved
