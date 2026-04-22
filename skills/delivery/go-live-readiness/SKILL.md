---
name: go-live-readiness
description: Use when assessing SAP go-live readiness, producing a Go/No-Go decision, or evaluating whether a system is ready for production. Triggers on any request involving go-live approval, readiness assessment, go/no-go checklist, production launch sign-off, or cutover gate review.
---

# SAP Go-Live Readiness Assessment

This skill enforces evidence-based go-live approval — blocking the "everything looks good" declaration and replacing it with a mandatory, dimension-by-dimension readiness checklist where every Green status requires attached evidence, not assertion.

---

## Iron Laws

1. **NEVER DECLARE "GO-LIVE READY" WITHOUT COMPLETING EVERY CHECKLIST ITEM.** Partial readiness is not readiness. A system that is 95% ready is not ready. Missing items are documented risks, not excuses to proceed.
2. **RED STATUS ITEMS BLOCK GO-LIVE — NO EXCEPTIONS, NO OVERRIDES.** A Red item means the condition is unmet. No business pressure, no timeline argument, and no seniority overrides a Red status. Red = stop.
3. **EVERY READINESS CLAIM MUST HAVE ATTACHED EVIDENCE, NOT ASSERTION.** "Training is complete" is an assertion. A signed training attendance register is evidence. "Data is loaded" is an assertion. A business-approved reconciliation report is evidence.
4. **NEVER SKIP BUSINESS SIGN-OFF ON DATA MIGRATION RECONCILIATION.** Business owners — not technical teams — must confirm that migrated data is correct. A Basis consultant saying "data looks good" is not business sign-off.
5. **GO/NO-GO DECISION REQUIRES NAMED DECISION-MAKERS, NOT CONSENSUS.** The decision must be owned by identified individuals who are accountable for it. "The team agreed" is not a Go/No-Go decision.
6. **AMBER STATUS REQUIRES FORMAL RISK ACCEPTANCE BEFORE PROCEEDING.** An Amber item with no documented risk acceptance is a hidden Red. Every Amber must have a named risk owner, a mitigation action, and a written acceptance.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Declare readiness based on gut feel | "The team has been working hard and things feel solid" | Go-live failures are not caused by team effort — they are caused by specific unmet conditions that feeling cannot detect. | Iron Law 1: Every dimension must be assessed on its checklist, not on team confidence. |
| Skip the security readiness dimension | "Security was handled during configuration; it's not a go-live item" | Role assignments frequently have errors discovered only at go-live. SoD conflicts undetected pre-go-live become audit findings post-go-live. Auth errors are the number one cause of day-one user escalations. | Checklist Step 6: Security readiness is a mandatory dimension with its own evidence requirements. |
| Accept "training is complete" without evidence | "The training team said it's done" | Training completion without attendance records means unknown users are untrained. Untrained users = day-one call volume spike and business process errors. | Iron Law 3: Training sign-off requires attendance register and assessment results. |
| Mark integration readiness Green without end-to-end test results | "The interfaces worked in the test system" | Test system interface configuration differs from production. DNS, RFC endpoints, credentials, and certificates change at cutover. Production integration must be tested post-cutover, not pre. | Checklist Step 5: Integration readiness requires production test results, not test-system results. |
| Allow Amber items to proceed without documentation | "We'll track them in the issues list" | An undocumented Amber is a concealed risk. If it materializes post-go-live, there is no record of the risk acceptance decision or who made it. | Iron Law 6: Every Amber requires written risk acceptance with named owner before proceeding. |
| Treat Go/No-Go as a project manager decision alone | "The PM owns the go-live decision" | Go-live decisions require functional sign-off (business), technical sign-off (Basis/architecture), and executive sign-off (sponsor). A PM cannot waive functional or technical readiness. | Iron Law 5: Named decision-makers across all three dimensions. |
| Skip performance verification because "SAP handles it" | "The system is SAP — it performs" | Custom Z-programs, background jobs, and reporting queries are not SAP standard. Volume testing results in ST05/ST12 must be confirmed against defined SLAs. | Checklist Step 1: Performance verification is evidence-based, with tcode-level monitoring data attached. |
| Rely on hypercare to catch what was missed | "If something breaks, hypercare will fix it" | Hypercare handles issues that arise from live use, not from unmet readiness conditions. Invoking hypercare as a substitute for readiness is a project governance failure. | Red Flag counter: Readiness gates exist precisely so hypercare is not used as a quality substitute. |

---

## Red Flags

Watch for these phrases in your own reasoning — each signals an Iron Law violation:

- "I believe we're ready..." → Belief is not evidence. Show the checklist with evidence attached. Stop.
- "Everything looks good..." → "Looks good" is not a readiness status. RAG status per dimension is a readiness status. Stop.
- "We can fix it after go-live..." → Post-go-live fixes under production pressure cost 10x more and create business disruption. Document it as a Red or formal risk — do not proceed silently. Stop.
- "It should work in production..." → Should is not evidence. Test it in production after cutover and confirm it does work. Stop.
- "The team is confident..." → Team confidence does not replace a signed checklist. Stop.
- "We're close enough..." → There is no "close enough" gate in this skill. Every item is met or it is not. Stop.
- "We'll track the outstanding items as hypercare tasks..." → Hypercare is for live issues, not for unmet go-live conditions. Stop.
- "Security roles were done months ago, they're fine..." → Role assignments and SoD checks must be re-verified on the production system post-transport, not assumed from configuration activity. Stop.

---

<HARD-GATE>
Go/No-Go decision CANNOT be issued as GO until:
1. All six readiness dimensions (Technical, Functional, Organizational, Data, Integration, Security) have been assessed
2. Zero Red items remain across all dimensions
3. Every Amber item has documented risk acceptance with a named risk owner
4. Business sign-off on data migration reconciliation is in hand (signed document)
5. Named decision-makers across technical, functional, and executive dimensions have all individually confirmed Go
6. The signed Go/No-Go decision record is completed with names, roles, and timestamp
If any condition is unmet, the status is NO-GO. Do not issue a Go recommendation. Escalate unresolved Reds immediately.
</HARD-GATE>

---

## Checklist

1. **Technical Readiness** — Verify system performance, monitoring, backup, and disaster recovery.
   - System performance verified via ST03N (workload monitor): response time within SLA for critical transactions
   - Background job schedule confirmed in SM36; all production batch jobs scheduled and tested in SM37
   - System monitoring configured: CCMS alerts (RZ20), system log monitoring (SM21), ABAP dump tracking (ST22)
   - Backup and recovery tested: last successful backup confirmed, restore test completed with documented RTO
   - Disaster recovery plan in place with documented RTO/RPO and named DR coordinator
   - Transport landscape locked: production client open only for authorized transports; no debug-and-change (S_DEVEL restriction in PFCG confirmed)
   - Evidence: ST03N screenshot, SM37 job list, RZ20 alert configuration screenshot, backup log, DR plan document
   - Gate: All technical items Green or Amber with documented risk acceptance

2. **Functional Readiness** — Verify all test scenarios passed, training complete, and user documentation available.
   - UAT sign-off document in hand (from `testing-strategy` skill output)
   - Zero open P1 defects; all P2 defects resolved or formally risk-accepted
   - End-user training completed: attendance register signed, assessment pass rates documented
   - User guides and job aids published and accessible to business users
   - Super-user network identified and briefed: key users per module named and available for day-one support
   - Evidence: Signed UAT sign-off, defect log showing zero P1, training attendance register, user guide publication confirmation
   - Gate: All functional items Green or Amber with documented risk acceptance

3. **Organizational Readiness** — Verify support model, hypercare plan, and escalation paths.
   - Support model documented: who handles P1/P2/P3/P4 issues post-go-live, with names and contact details
   - Hypercare plan ready: war room location/bridge, shift schedule, escalation matrix, exit criteria defined
   - Escalation path documented for each module area: functional consultant → solution architect → client IT manager
   - Business process owners briefed and available during go-live week (no planned leave on Day 1-5)
   - External support agreements confirmed: SAP Support (OSS) licence active, BASIS support contract active
   - Evidence: Hypercare plan document, support model org chart, escalation matrix, OSS access confirmation
   - Gate: All organizational items Green or Amber with documented risk acceptance

4. **Data Readiness** — Verify migration complete, reconciled, and formally accepted by business.
   - All data objects (master data and transactional data in scope) migrated to production
   - Reconciliation report produced comparing source system record counts to SAP load counts
   - Business data owners have reviewed and signed off on the reconciliation report — not the technical team
   - Data quality exceptions documented and formally accepted or remediated
   - Reference data (number ranges via SNRO, fiscal year settings via OB52, plant parameters) verified in production
   - Evidence: Migration load logs, reconciliation report with business signature, number range screenshot from production
   - Gate: Business-signed reconciliation report in hand. If unsigned, status is Red.

5. **Integration Readiness** — Verify all interfaces tested end-to-end in production and partner confirmations received.
   - All interface connections verified in production via SM59 (RFC), SXMB_MONI (PI/PO message monitor), or equivalent
   - End-to-end integration test executed in production post-cutover for all critical interfaces (not test system results)
   - EDI trading partner confirmations received in writing for all B2B interfaces
   - Error handling and alerting configured for each interface: SXMB_MONI alert rules, BTP integration monitoring
   - Idoc reprocessing procedure documented and tested (BD87 for inbound, WE19 for outbound reprocessing)
   - Evidence: SM59 connection test screenshots, SXMB_MONI clean message log, partner confirmation emails, error handling procedure
   - Gate: All interfaces showing Green in production. No interface left as "will test after go-live."

6. **Security Readiness** — Verify roles assigned, SoD clean, and audit logging enabled.
   - All production user accounts created and roles assigned in production system (SU01 / SU10)
   - Role assignments transported from quality to production and verified — not assumed from transport log
   - SoD conflict check run using GRC Access Control or manual SUIM analysis; all critical conflicts resolved or formally mitigated
   - Audit logging enabled (SM19 / RSAU_CONFIG): security audit log active with appropriate filter for critical events
   - Firefighter / emergency access IDs configured and tested (GRC EAM or manual procedure)
   - Default SAP* and DDIC passwords changed in all clients; production client locked for SAP* login
   - Evidence: SU01 user list with role assignments, SoD conflict report showing zero unmitigated critical conflicts, SM19 active audit log screenshot
   - Gate: All security items Green. SoD conflicts with no mitigation = Red. No exceptions.

---

## Deliverable Template

### Go-Live Readiness Assessment — RAG Decision Matrix

```
GO-LIVE READINESS ASSESSMENT
Project: [Name]  |  Assessment Date: [Date]  |  Planned Go-Live: [Date]
Assessed by: [Name, Role]

DIMENSION SUMMARY
-----------------
Dimension         | Status | Evidence Ref        | Risk Owner (if Amber) | Notes
------------------|--------|---------------------|----------------------|-------
Technical         | [R/A/G]| [Doc ref]           | [Name if Amber]      |
Functional        | [R/A/G]| [Doc ref]           | [Name if Amber]      |
Organizational    | [R/A/G]| [Doc ref]           | [Name if Amber]      |
Data              | [R/A/G]| [Doc ref]           | [Name if Amber]      |
Integration       | [R/A/G]| [Doc ref]           | [Name if Amber]      |
Security          | [R/A/G]| [Doc ref]           | [Name if Amber]      |

OVERALL STATUS: [RED — Do Not Proceed | AMBER — Conditional Proceed | GREEN — Proceed]

OUTSTANDING RED ITEMS
---------------------
[List each Red item with: Dimension | Item | Owner | Resolution Required By]

AMBER RISK ACCEPTANCES
----------------------
[List each Amber item with: Dimension | Item | Risk Owner | Acceptance Date | Mitigation]

GO/NO-GO DECISION RECORD
-------------------------
Functional Sign-Off:   [Name, Role] — [ ] GO  [ ] NO-GO — Date: ___
Technical Sign-Off:    [Name, Role] — [ ] GO  [ ] NO-GO — Date: ___
Executive Sign-Off:    [Name, Role] — [ ] GO  [ ] NO-GO — Date: ___

FINAL DECISION: [ ] GO   [ ] NO-GO   Decision Time: [Date/Time]
Conditions: [Any conditions attached to a conditional GO]
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] All six readiness dimensions assessed with evidence references documented
- [ ] Zero Red items remain (or go-live has been formally postponed)
- [ ] Every Amber item has documented risk acceptance with a named risk owner and date
- [ ] Business-signed data migration reconciliation report in hand
- [ ] Integration interfaces verified in the production system (not test system)
- [ ] Security: SoD report showing zero unmitigated critical conflicts; audit logging confirmed active
- [ ] Named decision-makers across functional, technical, and executive dimensions have individually signed
- [ ] Completed and signed Go/No-Go Decision Record exists with timestamp

**Evidence required:** Completed RAG Decision Matrix, all dimension evidence documents, Go/No-Go Decision Record with signatures.

If any item is unchecked, the Go/No-Go is NOT complete. Do not issue a Go recommendation. Do not allow go-live to proceed.

---

## Next Skill

After completing this skill, invoke: `hypercare`
Conditions for handoff: Go/No-Go decision is GO, system is live, and first users are logging in. Hypercare mobilization must begin the moment go-live is declared — not after the first issue appears.

---

## Cross-References

- `cutover-planning` — Cutover execution is the prerequisite that enables this readiness assessment
- `testing-strategy` — UAT sign-off feeds directly into Functional Readiness dimension
- `data-migration` — Business-signed reconciliation report is a required input for Data Readiness
- `hypercare` — Hypercare plan is assessed under Organizational Readiness; must be ready before Go
- `sap-security-auditor` agent — Use to run automated SoD conflict analysis and role assignment verification
