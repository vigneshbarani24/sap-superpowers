---
name: cutover-planning
description: Use when planning, sequencing, or executing SAP cutover activities including go-live weekend tasks, system switchover, data migration execution, interface activation, rollback planning, or cutover rehearsal. Triggers on any request involving cutover, production go-live execution, T-minus schedule, or cutover runbook.
---

# SAP Cutover Planning and Execution

This skill enforces a complete, rehearsed, and evidence-based cutover plan — preventing undocumented tasks, missed dependencies, unconfirmed interface partners, and go-live without a tested rollback procedure.

---

## Iron Laws

1. **NEVER EXECUTE CUTOVER WITHOUT AT LEAST ONE REHEARSAL.** A cutover plan untested in a dress rehearsal is a hypothesis, not a plan. Surprises on go-live weekend are not recoverable.
2. **NEVER SKIP THE GO/NO-GO CHECKPOINT.** Go/No-Go is a formal gate with named decision-makers and documented criteria. "We'll see how things look" is not a Go/No-Go process.
3. **ALWAYS HAVE A DOCUMENTED AND TESTED ROLLBACK PLAN.** If rollback has not been rehearsed, it does not exist. The rollback plan must include time limits, decision authority, and step-by-step execution procedures.
4. **NEVER ASSUME INTERFACE PARTNERS ARE READY WITHOUT WRITTEN CONFIRMATION.** Every external system, EDI partner, and third-party interface must provide written confirmation of readiness before cutover begins. Verbal confirmation is not confirmation.
5. **ALWAYS MAINTAIN A REAL-TIME CUTOVER STATUS BOARD.** Every task on the runbook must have an owner, a start time, an end time, and a live status (Not Started / In Progress / Complete / Blocked). No task exists unless it is tracked.
6. **NEVER EXTEND THE CUTOVER WINDOW WITHOUT INVOKING THE ROLLBACK DECISION PROCESS.** If the cutover falls behind the buffer threshold, rollback criteria must be formally evaluated — not silently extended.
7. **SEQUENCE IS NOT OPTIONAL.** Technical tasks, functional tasks, and organizational tasks have hard dependencies. Executing them out of sequence causes data corruption, interface failures, and system inconsistency.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip dress rehearsal because "we know what we're doing" | "The team is experienced and the plan is solid" | Rehearsals expose timing errors, missing dependencies, and coordination gaps that experience cannot predict. Dress rehearsals routinely add 20-40% to planned duration. | Iron Law 1: No cutover without rehearsal. If time is short, run an abbreviated rehearsal — but run it. |
| Omit rollback procedures because "we won't need them" | "The go-live will succeed — why plan for failure?" | Industry data: 15-20% of SAP go-lives require partial or full rollback. No rollback plan means rollback is uncontrolled and potentially catastrophic. | Iron Law 3: Rollback plan and time limit are mandatory deliverables. |
| Accept verbal confirmation from interface partners | "They said they'd be ready on the call" | Verbal commitments are forgotten, misunderstood, and legally unenforceable. Integration failures on go-live weekend are the most common single cause of cutover extension. | Iron Law 4: Written confirmation required. Email is acceptable; phone call notes are not. |
| Merge technical and functional cutover tasks into a single undifferentiated list | "It's simpler to track everything together" | Technical and functional tasks have different owners, different dependencies, and different rollback implications. Merging them obscures critical-path analysis. | Checklist Step 2: Tasks must be categorized by type with ownership explicitly assigned. |
| Plan cutover without buffer time | "The sequence is tight but achievable" | Every SAP cutover has unexpected issues. Without buffer, any delay triggers a rollback decision. A 20-30% time buffer is not padding — it is risk management. | Checklist Step 4: Buffer time is mandatory and must be calculated explicitly. |
| Treat go/no-go as a team consensus | "Everyone agrees we should proceed" | Consensus is not accountability. Go/No-Go requires named decision-makers who bear personal accountability for the decision. | Iron Law 2: Named decision-makers documented in advance. |
| Use a spreadsheet cutover plan without a real-time status mechanism | "Everyone can see the Excel" | Static spreadsheets become stale within hours of cutover start. Real-time visibility requires a live tracking tool or dedicated war room status board. | Iron Law 5: Real-time cutover status board is mandatory. |
| Skip DNS and RFC cutover steps because "IT will handle it" | "That's an infrastructure task, not my concern" | RFC connections, DNS changes, and system aliases must be sequenced precisely with functional activation. Missequencing causes connection failures that appear as functional errors. | Checklist Step 5: System landscape changes are explicit cutover tasks with dependencies documented. |

---

## Red Flags

Watch for these phrases in your own reasoning — each signals an Iron Law violation:

- "The team knows the plan, we don't need to document every step..." → Undocumented tasks are skipped tasks. Every step must be in the runbook.
- "We'll decide about rollback on the day..." → Rollback decisions made under pressure are made wrong. Define criteria in advance.
- "The interface team confirmed on the call..." → Written confirmation only. Stop.
- "We can skip the dress rehearsal, we're running out of time..." → The dress rehearsal IS the time saver. It prevents a failed production cutover.
- "If we fall behind we'll just push through..." → Pushing through without rollback evaluation violates Iron Law 6.
- "Go-live is go — everyone agrees..." → Consensus is not a Go/No-Go decision. Name the decision-makers.
- "We'll add the missing tasks after the fact..." → Retroactive runbook updates mean the runbook was wrong when it mattered.

---

<HARD-GATE>
Cutover execution CANNOT begin until:
1. At least one full dress rehearsal has been completed and a rehearsal report is in hand
2. Rollback plan is documented, rehearsed, and rollback time limit is explicitly defined
3. Written confirmation of readiness received from ALL interface and integration partners
4. Go/No-Go criteria are documented with named decision-makers assigned
5. Real-time cutover status board is set up and all tasks are loaded with owners and scheduled times
If any condition is unmet, cutover execution does NOT begin. Extend the timeline or escalate.
</HARD-GATE>

---

## Checklist

1. **Define cutover scope and task inventory** — Enumerate every technical, functional, and organizational task required to switch from legacy to SAP production. No task is too small to omit.
   - Evidence: Master task list categorized as Technical / Functional / Organizational with task ID, description, owner, and dependency references
   - Gate: Task list reviewed by technical lead, functional lead, and project manager — all three have signed off

2. **Sequence tasks and map dependencies** — Build the cutover dependency chain. Identify which tasks must complete before others begin. Identify the critical path.
   - Evidence: Sequenced cutover runbook with T-minus timeline, dependency links, and critical path highlighted
   - Gate: No circular dependencies; every task has a predecessor or is marked as day-zero start

3. **Assign owners and time estimates** — Every task must have a named owner (not a team — a person). Every task must have an estimated duration from dress rehearsal data.
   - Evidence: Runbook with Name (not role) in the Owner column and realistic duration for each task
   - Gate: Every owner has confirmed acceptance of their tasks in writing

4. **Calculate cutover window with buffer** — Sum the critical path duration. Add 20-30% buffer. Confirm the total fits within the business-approved downtime window. If it does not fit, escalate immediately.
   - Evidence: Cutover timeline with: system freeze time, downtime start, each milestone checkpoint, go/no-go decision point, target go-live time, latest acceptable go-live time, rollback trigger time
   - Gate: Timeline fits within approved downtime window with buffer

5. **Document system landscape changes** — List all DNS changes, RFC connection updates, logical system name changes, interface endpoint switches, and system alias updates. Sequence these within the runbook.
   - Evidence: Landscape change log with: component, current value, new value, T-minus slot, owner, verification step (e.g., SM59 connection test, SMICM restart)
   - Gate: Basis team has reviewed and approved all landscape change steps

6. **Develop rollback plan** — Define: rollback trigger criteria, rollback decision authority (named individual), rollback time limit (hard deadline), and step-by-step rollback execution procedure.
   - Evidence: Rollback plan document with trigger criteria table, named decision authority, hard time limit, and sequenced rollback steps
   - Gate: Rollback plan has been rehearsed in dress rehearsal and confirmed executable within the time limit

7. **Secure interface partner confirmations** — Contact every external system, EDI trading partner, and third-party integration. Obtain written confirmation (email) of their readiness for the cutover date.
   - Evidence: Confirmation email log listing: partner name, system/interface, contact name, confirmation date, any caveats
   - Gate: All partners confirmed in writing. Outstanding confirmations block cutover.

8. **Execute dress rehearsal** — Run the full cutover sequence in a non-production environment (ideally a dedicated pre-prod cutover rehearsal client). Record actual task durations and issues encountered.
   - Evidence: Rehearsal report with: planned vs. actual duration per task, issues encountered, issues resolved, unresolved items, updated time estimates
   - Gate: All critical issues from rehearsal resolved before production cutover

9. **Execute communication plan** — Deliver each scheduled communication to each audience at the planned time. Communications must be pre-drafted and approved before cutover begins — not written during the cutover window.
   - Audiences: Internal IT team (technical updates), business users (downtime notice, go-live announcement), management (status at each milestone), external partners (blackout window, activation confirmation)
   - Key communications: T-48h system freeze notice, T-24h final reminder, cutover start notice, milestone updates during blackout, go-live announcement, Day 1 support instructions
   - Evidence: Communication log listing: audience, channel, planned time, actual send time, sent by
   - Gate: All pre-drafted communications approved by project manager before cutover start

10. **Conduct Go/No-Go checkpoint** — At the scheduled decision point, named decision-makers review the Go/No-Go criteria checklist and formally record their decision.
    - Evidence: Completed Go/No-Go checklist with named sign-offs and timestamp
    - Gate: Unanimous Go from all named decision-makers, or formal escalation if a No-Go is issued

11. **Execute production cutover and smoke test** — Execute tasks from the runbook in sequence. Update the status board in real time. Escalate blocked tasks immediately to the cutover manager. On task completion, execute the functional smoke test before opening to users.
    - Smoke test scope: Post-login user access (SU01 verification), core transaction round-trip per module (e.g., VA01 in SD, ME21N in MM, FB01 in FI), background job trigger (SM37), interface send/receive (SXMB_MONI), print output (SP01)
    - Evidence: Completed runbook with actual start/end times for every task; smoke test checklist showing pass/fail per test; status board showing all tasks Complete
    - Gate: All tasks complete, system landscape changes verified (SM59, SMICM restart confirmed, interface activation in SXMB_ADM), and smoke test fully passed before go-live announcement

---

## Deliverable Templates

### Cutover Runbook Entry

```
CUTOVER RUNBOOK — [Project Name] — Version [x.x]
Production Go-Live: [Date] | System Freeze: [Date/Time] | Rollback Deadline: [Date/Time]

TASK LOG
--------
ID    | T-Minus | Category   | Task Description                          | Owner      | Dep On | Est.  | Act.  | Status
------|---------|------------|-------------------------------------------|------------|--------|-------|-------|----------
CT001 | T-48h   | Org        | Communicate system freeze to all users    | [Name]     | —      | 1h    |       | Not Started
CT002 | T-24h   | Technical  | Final data migration load (LSMW/BAPI)     | [Name]     | CT001  | 4h    |       | Not Started
CT003 | T-24h   | Technical  | Run migration reconciliation report       | [Name]     | CT002  | 1h    |       | Not Started
CT004 | T-12h   | Technical  | Lock legacy system (read-only mode)       | [Name]     | CT003  | 0.5h  |       | Not Started
CT005 | T-8h    | Technical  | Update RFC destinations (SM59)            | [Basis]    | CT004  | 1h    |       | Not Started
CT006 | T-8h    | Technical  | Update DNS/hostnames for SAP URLs         | [Basis]    | CT004  | 0.5h  |       | Not Started
CT007 | T-6h    | Technical  | Activate production interfaces (SXMB_ADM) | [Name]    | CT006  | 2h    |       | Not Started
CT008 | T-4h    | Functional | Execute functional smoke tests            | [Name]     | CT007  | 2h    |       | Not Started
CT009 | T-2h    | Org        | GO/NO-GO checkpoint                       | [PM/Exec]  | CT008  | 0.5h  |       | Not Started
CT010 | T-0     | Org        | Open system to users — communicate go-live| [Name]    | CT009  | 0.5h  |       | Not Started

GO/NO-GO DECISION RECORD
-------------------------
Decision Point: [Date/Time]
Decision: [ ] GO   [ ] NO-GO
Decision Authority: [Name, Role] — Signature: _______________
Criteria Met: [Yes/No per criterion]
Notes: [Any conditions or caveats]

ROLLBACK TRIGGER
----------------
Rollback decision required if cutover falls behind schedule by more than [X] hours
Rollback hard deadline: [Date/Time] — after this point, rollback is not possible
Rollback decision authority: [Name, Role]
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Master task list complete, categorized, and signed off by technical lead, functional lead, and PM
- [ ] Sequenced cutover runbook with critical path and buffer time calculated
- [ ] Every task has a named owner (not a team) who has confirmed in writing
- [ ] Cutover timeline fits within the approved downtime window including buffer
- [ ] System landscape changes (RFC, DNS, interfaces) documented with verification steps
- [ ] Rollback plan documented with named authority, hard time limit, and rehearsed steps
- [ ] Written confirmation received from all interface and integration partners
- [ ] Dress rehearsal completed and rehearsal report issued with lessons applied
- [ ] Go/No-Go criteria documented with named decision-makers assigned in advance
- [ ] Real-time status board configured and loaded before cutover execution begins

**Evidence required:** Signed cutover runbook, rehearsal report, interface partner confirmation log, rollback plan, Go/No-Go decision record.

If any item above is unchecked, cutover execution does NOT begin. Do not represent the plan as complete.

---

## Next Skill

After completing this skill, invoke: `go-live-readiness`
Conditions for handoff: Cutover plan complete, dress rehearsal done, and Go/No-Go checkpoint passed. Go-live readiness assessment must be the final gate before declaring the system open to business users.

---

## Cross-References

- `testing-strategy` — UAT sign-off is a prerequisite input to cutover go/no-go criteria
- `go-live-readiness` — Formal readiness assessment runs in parallel with final cutover preparation
- `data-migration` — Data migration execution is a cutover task; reconciliation must complete before system handover
- `hypercare` — Hypercare mobilization begins at the moment go-live is declared; prepare in parallel
- `sap-migration-analyzer` agent — Use to analyze data migration volumes and estimate cutover data load window
