---
name: hypercare
description: Use when managing SAP post-go-live hypercare, setting up a hypercare war room, triaging live production issues, tracking stabilization, planning hypercare exit, or transitioning support to BAU. Triggers on any request involving post-go-live support, day-one issues, hypercare period, stabilization criteria, or support handover.
---

# SAP Post-Go-Live Hypercare Management

This skill enforces a structured, measurable hypercare period — preventing premature exit from hypercare, untracked P1 downgrades, and BAU handover before the system has actually stabilized.

---

## Iron Laws

1. **NEVER EXIT HYPERCARE WITHOUT MEETING ALL STABILIZATION CRITERIA.** A stabilization criterion is a hard gate, not a guideline. "Things are mostly quiet" is not a criterion. Zero P1s for the defined period is a criterion.
2. **NEVER DOWNGRADE A P1 WITHOUT EXPLICIT BUSINESS OWNER SIGN-OFF.** A Basis consultant cannot unilaterally decide a P1 is "actually a P2." The business owner whose process is affected makes that call — and signs it.
3. **ALWAYS TRACK RESOLUTION TIME AGAINST SLA.** Every issue must have a logged open time and a logged close time. SLA compliance is reported daily, not estimated weekly.
4. **EVERY ISSUE MUST HAVE A DOCUMENTED ROOT CAUSE, NOT JUST A FIX.** Applying a fix without root cause analysis means the same issue recurs. Root cause is mandatory before an issue ticket is closed.
5. **ALWAYS COMPLETE LESSONS LEARNED BEFORE HYPERCARE EXIT.** Lessons learned are not optional retrospective documentation. They are the mechanism by which the BAU team inherits institutional knowledge. Skipping them means the next incident is guaranteed.
6. **HYPERCARE SHIFTS MUST BE EXPLICITLY ROSTERED.** "The team will be available" is not a shift plan. Named individuals, contact numbers, shift start/end times, and escalation paths must be documented before go-live day one.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Declare hypercare exit because "it's been quiet" | "No major issues in the last week — the system is stable" | Quiet periods during hypercare can reflect low user adoption, incomplete business processes (month-end not yet run), or issues being worked around rather than resolved. Stabilization criteria exist precisely to prevent this misreading. | Iron Law 1: Stabilization criteria are checked line-by-line, not assessed by feel. |
| Downgrade a P1 to avoid SLA breach | "It's really more of a P2 — there is a workaround" | If the original classification was correct, downgrading under SLA pressure conceals a performance failure. The workaround may be consuming significant business effort not visible to IT. | Iron Law 2: Priority changes require business owner sign-off. Document the workaround effort cost. |
| Close an issue ticket without root cause | "The user confirmed the issue is fixed" | Without root cause, the fix is symptomatic. The same issue will recur in a different context (different user, month-end load, different plant). | Iron Law 4: Root cause field is mandatory for ticket closure. "Unknown" is not acceptable — it means investigation is incomplete. |
| Skip daily standup when issues are low | "It's a quiet day, we don't need the call" | The standup is not just issue review — it surfaces emerging patterns, batch job failures, and performance degradation before they escalate to P1. Skipping it creates blind spots. | Checklist Step 4: Daily standup is non-negotiable during hypercare, regardless of current issue volume. |
| Hand over to BAU before stabilization criteria are met | "The BAU team is capable, they can handle it from here" | BAU teams do not have project context, escalation relationships, or vendor access that the project team has. Premature handover without these transfers creates a support vacuum. | Iron Law 1 + Checklist Step 7: Knowledge transfer is a structured activity with completion evidence, not an assumption. |
| Treat all issues as equally urgent | "Every user complaint is a priority" | Without triage, P1 (system down) competes with P4 (cosmetic issue) for the same resource. SLA discipline collapses. Business-critical processes go unaddressed while cosmetic issues are fixed. | Checklist Step 3: Priority classification happens at first contact, using the defined P1-P4 matrix. |

---

## Red Flags

Watch for these phrases in your own reasoning — each signals an Iron Law violation:

- "Things seem stable, we can probably exit hypercare..." → "Seem" is not a stabilization criterion. Run the checklist. Stop.
- "We can downgrade this to P2 since there's a workaround..." → Workarounds are not resolutions. Downgrade requires business owner sign-off. Stop.
- "Root cause is probably [X], let's just fix it..." → Probably is not root cause. Confirm it. Document it. Then close the ticket. Stop.
- "The BAU team knows SAP, they'll be fine..." → Knowing SAP and knowing this specific system's configuration are different things. Complete the knowledge transfer. Stop.
- "We didn't log that one, it was resolved quickly..." → Every issue is logged, regardless of resolution time. Unlogged issues cannot be trended or learned from. Stop.
- "Let's skip the standup today, it's quiet..." → The standup catches what the issue log does not. Run it. Stop.

---

<HARD-GATE>
Hypercare exit CANNOT be declared until:
1. ALL stabilization criteria are met (zero P1s for the defined period, P2 resolution within SLA, key processes running without manual intervention for the defined period)
2. Lessons learned session completed and document issued
3. Knowledge transfer to BAU support team completed with sign-off from BAU team lead
4. All open issues handed over to BAU with documented status, owner, and next action
5. BAU escalation path tested: at least one live issue handled end-to-end by BAU team during hypercare overlap period
If any condition is unmet, hypercare continues. Do not declare exit. Reassess against criteria after the next stabilization measurement period.
</HARD-GATE>

---

## Priority Definitions and SLA Matrix

```
PRIORITY | DEFINITION                                      | RESPONSE SLA | RESOLUTION SLA | EXAMPLE
---------|------------------------------------------------|--------------|----------------|------------------------------------------
P1       | System unavailable OR critical process completely | 15 minutes  | 4 hours        | SAP login failure; payroll run aborted;
         | blocked with no workaround                      |              |                | goods receipt completely blocked
P2       | Critical process impaired; workaround exists    | 30 minutes   | 8 hours        | Invoice posting errors for one company
         | but workaround is high-effort                   |              |                | code; purchase order approval stuck
P3       | Process degraded; workaround is low-effort      | 2 hours      | 3 business days| Output missing from print; report
         |                                                 |              |                | slow but usable; one field not defaulting
P4       | Cosmetic, enhancement, or low-impact issue       | Next standup | Next sprint     | Label mismatch on screen; column order
         |                                                 |              |                | preference; training request
```

---

## Checklist

1. **Stand up the hypercare war room** — Before go-live day one, establish the physical or virtual war room. Configure monitoring dashboards. Confirm all support tools are accessible.
   - Evidence: War room access details distributed; monitoring dashboard live (CCMS / RZ20, SM37, SM21, ST22 shortcuts configured); escalation matrix published to all stakeholders
   - Gate: All hypercare team members have confirmed access to the war room, SAP production system, and issue tracking tool

2. **Publish the shift roster** — Roster named individuals for each hypercare shift. Cover 24/7 for the first week; office hours with on-call for subsequent weeks (adjust by project risk).
   - Evidence: Shift schedule published with: Name, Shift Start, Shift End, Mobile Contact, Role (Functional/Basis/Integration)
   - Gate: No shift gap for the first 5 business days; on-call coverage documented for all other periods

3. **Triage every inbound issue against the P1-P4 matrix** — At first contact, classify each issue. Do not allow users to self-assign priority. Apply the definition table above.
   - Evidence: Issue log entry with: Ticket ID, Date/Time Logged, Reporter, Description, Module, Initial Priority, Assigned Owner, Status
   - Gate: Every issue logged within 15 minutes of first contact; no issue exists only in email or chat

4. **Run the daily hypercare standup** — Every business day during hypercare, run a structured standup covering: new issues since last standup, P1/P2 status and SLA compliance, batch job results from SM37, interface health from SXMB_MONI/SM59, and performance from ST03N.
   - Evidence: Daily standup minutes with: date, attendees, new issues, P1/P2 status table, batch job summary, interface status, actions agreed
   - Gate: Standup minutes distributed within 1 hour of standup close

5. **Monitor SAP daily operations checklist** — Every shift, execute the operational monitoring checklist to catch issues before users report them.
   - Evidence: Completed daily monitoring log per shift
   - Monitoring items:
     - SM37: Check all scheduled background jobs — status, duration vs. baseline, failed jobs
     - SM21: System log — scan for critical (red) entries
     - ST22: ABAP dump analysis — zero dumps acceptable; any dump investigated immediately
     - SXMB_MONI / Integration Monitoring: All interface messages processed; no stuck messages
     - ST03N: Workload monitor — response time vs. go-live baseline; flag any >20% degradation
     - RZ20: CCMS alert tree — all alerts reviewed and acknowledged or escalated
     - SM50/SM66: Work process overview — no hung processes, no lock pile-up

6. **Enforce root cause analysis before ticket closure** — For every P1 and P2 ticket, root cause analysis (RCA) is mandatory before closure. For P3/P4, a brief cause note is sufficient.
   - Evidence: Ticket closure record includes: Root Cause (specific, not "user error"), Fix Applied, Preventive Action (if recurring risk exists), Retested By (name), Retest Date
   - Gate: RCA field populated with a specific cause statement. "Resolved" as the only closure note is not acceptable.

7. **Assess stabilization criteria weekly** — At the end of each hypercare week, formally assess whether stabilization criteria have been met.
   - Evidence: Weekly stabilization report with: criteria name, target, actual measurement, status (Met/Not Met)
   - Stabilization criteria (default — adjust to project):
     - Zero P1 incidents for 5 consecutive business days
     - 100% of P2 incidents resolved within SLA for the past 5 business days
     - All scheduled batch jobs (SM37) running successfully without manual intervention for 5 consecutive days
     - All critical business processes (defined in scope document) executed at least once successfully by business users without support intervention
     - Interface error rate below agreed threshold (e.g., <0.5% message failure) for 5 consecutive days
   - Gate: All criteria Met before hypercare exit is proposed

8. **Execute structured knowledge transfer to BAU** — Before exit, run a formal knowledge transfer: configuration overview, known issues log, monitoring runbook, escalation procedures, and SAP OSS access handover.
   - Evidence: Knowledge transfer sign-off sheet: BAU team lead confirms receipt and understanding of each transfer item
   - Gate: BAU team has handled at least one live issue end-to-end during the hypercare overlap period

9. **Conduct lessons learned session** — Facilitate a project retrospective covering: what went well, what was harder than expected, what would be done differently, and open actions for the BAU team and the client.
   - Evidence: Lessons learned document distributed to project team, client PMO, and BAU lead
   - Gate: Document issued and acknowledged before hypercare exit declaration

10. **Declare hypercare exit** — With all stabilization criteria met and KT complete, issue the formal hypercare exit notice.
    - Evidence: Hypercare exit notice with: Date, Stabilization criteria confirmation table, BAU team contact details, Outstanding issues list (P3/P4 only), Hypercare team sign-off
    - Gate: Named hypercare manager has signed the exit notice; client IT manager has countersigned

---

## Deliverable Templates

### Daily Status Report

```
HYPERCARE DAILY STATUS REPORT
Project: [Name]  |  Day [N] of Hypercare  |  Date: [Date]  |  Prepared by: [Name]

OVERALL STATUS: [ ] GREEN — Stable  [ ] AMBER — Issues being managed  [ ] RED — P1 active

ISSUE SUMMARY
-------------
Priority | Open | New Today | Closed Today | SLA Breaches Today
---------|------|-----------|--------------|-------------------
P1       |      |           |              |
P2       |      |           |              |
P3       |      |           |              |
P4       |      |           |              |

ACTIVE P1/P2 ISSUES
--------------------
ID    | Description              | Owner  | Open Since | SLA Deadline | Status/Next Action

SYSTEM MONITORING SUMMARY (Today)
----------------------------------
SM37 Batch Jobs:    [ ] All successful  [ ] Failures: [detail]
ST22 ABAP Dumps:    [ ] Zero dumps      [ ] Dumps found: [detail]
SM21 System Log:    [ ] No critical     [ ] Criticals: [detail]
Interfaces:         [ ] All green       [ ] Issues: [detail]
ST03N Performance:  [ ] Within SLA      [ ] Degradation: [detail]

ACTIONS
-------
# | Action | Owner | Due Date | Status
```

### Hypercare Exit Criteria Checklist

```
HYPERCARE EXIT CRITERIA CHECKLIST
Project: [Name]  |  Exit Assessment Date: [Date]

STABILIZATION CRITERIA
-----------------------
Criterion                                          | Target      | Actual    | Status
---------------------------------------------------|-------------|-----------|----------
Zero P1 incidents (consecutive business days)       | 5 days      | [X] days  | [Met/Not]
P2 SLA compliance (last 5 business days)            | 100%        | [X]%      | [Met/Not]
Batch jobs running without intervention (SM37)      | 5 days      | [X] days  | [Met/Not]
Key processes completed by business without support | All in scope| [list]    | [Met/Not]
Interface error rate below threshold                | <0.5%       | [X]%      | [Met/Not]

KNOWLEDGE TRANSFER
------------------
[ ] Configuration overview delivered to BAU
[ ] Known issues log handed over
[ ] Monitoring runbook delivered
[ ] Escalation procedure confirmed with BAU
[ ] BAU team handled at least one live issue end-to-end

LESSONS LEARNED
---------------
[ ] Session facilitated
[ ] Document distributed
[ ] Open actions assigned

EXIT DECISION
-------------
Hypercare Manager: [Name] — Signature: _______________ Date: ___
Client IT Manager: [Name] — Signature: _______________ Date: ___
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] War room and shift roster established before go-live day one
- [ ] Every issue logged in the tracking tool with priority classification applied at first contact
- [ ] Daily standup minutes issued every business day during hypercare
- [ ] Daily SAP monitoring checklist (SM37, SM21, ST22, SXMB_MONI, ST03N, RZ20) completed every shift
- [ ] Every P1 and P2 ticket closed with documented root cause (not just "resolved")
- [ ] Weekly stabilization report produced; all criteria formally assessed
- [ ] All stabilization criteria met before exit is declared
- [ ] Structured knowledge transfer completed with BAU team lead sign-off
- [ ] Lessons learned session facilitated and document distributed
- [ ] Formal hypercare exit notice signed by hypercare manager and client IT manager

**Evidence required:** Issue log with SLA tracking, daily standup minutes, weekly stabilization reports, root cause records for all P1/P2 tickets, KT sign-off sheet, lessons learned document, signed hypercare exit notice.

If any item is unchecked, hypercare has NOT been completed successfully. Do not declare exit.

---

## Next Skill

After completing this skill, invoke: `project-kickoff`
Conditions for handoff: Hypercare exit declared, system handed to BAU, lessons learned complete. This is the end of the SAP Activate delivery chain. If a follow-on phase or project exists, loop back to `project-kickoff` to begin the next engagement with lessons learned as a direct input.

---

## Cross-References

- `go-live-readiness` — Hypercare plan is assessed as part of Organizational Readiness; hypercare begins immediately on go-live declaration
- `cutover-planning` — Cutover runbook execution is the trigger event that starts Day 1 of hypercare
- `testing-strategy` — Defects deferred from UAT become the initial P3/P4 hypercare backlog
- `sap-reviewer` agent — Use to analyze SM21 / ST22 logs for systemic error patterns during hypercare
