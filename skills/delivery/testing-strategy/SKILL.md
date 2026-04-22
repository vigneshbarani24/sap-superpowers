---
name: testing-strategy
description: Use when designing, planning, or executing a testing strategy for an SAP implementation, upgrade, or change project. Triggers on any request involving test planning, UAT, test cases, test automation, defect management, or sign-off readiness.
---

# SAP Testing Strategy

This skill enforces a complete, evidence-based testing strategy — preventing premature sign-off, skipped test levels, and UAT conducted without proper test case coverage.

---

## Iron Laws

1. **NEVER SIGN OFF WITHOUT UAT COMPLETION.** No UAT = no go-live approval. A "mostly done" UAT is a failed UAT. Partial UAT does not count.
2. **NEVER SKIP NEGATIVE TESTS.** Every test case has a negative counterpart. Testing only happy paths is testing only half the system.
3. **NEVER TEST WITH PRODUCTION DATA WITHOUT ANONYMIZATION.** Raw production data in test systems is a GDPR/data protection violation. Anonymize first, always.
4. **NEVER DECLARE A DEFECT CLOSED WITHOUT RETEST EVIDENCE.** A developer saying "it's fixed" is not evidence. A tester confirming the fix with a retest pass is evidence.
5. **TEST COVERAGE IS MEASURED, NOT ESTIMATED.** "We tested everything important" is not a coverage metric. Count test cases executed vs. planned. Report the percentage.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip unit testing and jump to E2E | "SAP standard code doesn't need unit tests" | Custom ABAP, BAdIs, and enhancements absolutely need unit tests. Bugs caught at unit level cost 10x less than E2E bugs. | Checklist Step 1: Unit test coverage is mandatory for all custom code. |
| Run UAT without a formal test case library | "The business users know the process" | Business users test what they remember, not what the system must do. Coverage gaps guarantee post-go-live defects. | Hard Gate: UAT cannot begin without signed-off test case library. |
| Use production data directly in testing | "It's the most realistic data" | GDPR violation. Also — prod data corrupted by test activity is a catastrophic incident. | Iron Law 3: Anonymized data or synthetic data only. No exceptions. |
| Mark defects closed based on developer word | "The developer has fixed it in the system" | Configuration drift, transport errors, and regression mean developer confidence ≠ working system. | Iron Law 4: All defects require documented retest before closure. |
| Skip performance testing because "SAP handles it" | "SAP is enterprise-grade, it scales" | SAP scales. Your custom code, Z-tables, and integration points may not. Volume testing is mandatory. | Checklist Step 5: Performance test mandatory for all high-volume processes. |
| Report test completion without defect resolution | "We've run all the test cases" | Running tests and passing tests are different things. Open critical defects block sign-off. | Verification: Zero open P1/P2 defects required for sign-off. |

---

## Red Flags

Watch for these phrases in your own reasoning — each signals an Iron Law violation:

- "The business can test informally..." → No formal test cases = no coverage measurement. Stop.
- "We can fix that after go-live..." → Deferring defects is acceptable only when formally risk-accepted. Stop and document.
- "UAT is mostly done..." → Partial UAT is not UAT. State the actual percentage. Stop.
- "This is standard SAP, it doesn't need testing..." → Standard SAP + your config + your data = unique system. Test it. Stop.
- "We tested it in dev, it'll work in prod..." → Environments differ. Transport issues are real. Stop.
- "Performance testing can wait..." → You won't have time after go-live. Stop.
- "The users signed off verbally..." → Verbal sign-off is not sign-off. Written evidence only. Stop.

---

<HARD-GATE>
UAT sign-off CANNOT be granted until:
1. A formal test case library exists with pass/fail status for every test case
2. UAT execution is 100% complete (every test case run, not estimated)
3. Zero open P1 (critical) defects remain
4. All P2 (high) defects are resolved OR formally risk-accepted in writing by the business owner
5. Formal UAT sign-off document is signed by the business representative
If any of these conditions is unmet, the status is NOT signed off. Do not represent it as ready.
</HARD-GATE>

---

## Checklist

1. **Define the test pyramid** — Identify scope at each level: unit, integration, E2E, UAT, performance, regression.
   - Evidence: Test pyramid diagram with scope statement per layer
   - Gate: All six levels documented with in-scope/out-of-scope rationale

2. **Build the test case library** — Create test cases for every business process in scope, including positive and negative scenarios.
   - Evidence: Test case matrix with Process, Test Case ID, Description, Expected Result, Priority
   - Gate: Business process owner has reviewed and approved test case coverage

3. **Define test data strategy** — Identify data requirements per test case. Determine anonymization approach for any production data used.
   - Evidence: Test data matrix; anonymization script or tool documented
   - Gate: Test data available in test system before execution begins

4. **Execute unit and integration testing** — All custom development (ABAP, BAdIs, enhancements, APIs) unit-tested. Integration scenarios (iDocs, APIs, BTP) integration-tested.
   - Evidence: Unit test results; integration test logs; defect log with resolutions
   - Gate: No open P1/P2 defects before progressing to E2E

5. **Execute E2E and performance testing** — Run end-to-end scenarios across modules. Execute volume and performance tests for high-volume processes.
   - Evidence: E2E test execution report; performance test results with benchmark vs. actual
   - Gate: E2E scenarios passing; performance within defined SLA

6. **Facilitate UAT** — Business users execute the approved test case library. Tester logs defects in tracking tool.
   - Evidence: UAT test execution records; defect log; daily UAT status report
   - Gate: 100% test case execution; all P1/P2 defects resolved or formally risk-accepted

7. **Conduct regression testing** — On each major defect fix, re-run affected regression scenarios to confirm no regressions introduced.
   - Evidence: Regression test run results; delta comparison from previous run
   - Gate: No new defects introduced by fixes

8. **Obtain formal UAT sign-off** — Present UAT completion evidence to business. Obtain written sign-off.
   - Evidence: Signed UAT sign-off document with name, date, scope, and outstanding items
   - Gate: Signed document in hand before go/no-go recommendation

---

## Deliverable Templates

### Test Strategy Summary

```
PROJECT: [Name]
DATE: [Date]
VERSION: [Version]

TEST PYRAMID SCOPE
------------------
Unit Testing:        [In scope / Out of scope] — [Rationale]
Integration Testing: [In scope / Out of scope] — [Rationale]
E2E Testing:         [In scope / Out of scope] — [Rationale]
UAT:                 [In scope] — [Business users, dates, location]
Performance Testing: [In scope / Out of scope] — [Rationale]
Regression Testing:  [In scope] — [Trigger conditions]

TEST DATA STRATEGY
------------------
Source:              [Origin of test data]
Anonymization:       [Tool / approach]
Volume:              [Record counts per entity]

AUTOMATION SCOPE
----------------
Tool:                [Tosca / Selenium / SAP TAO / None]
Automated scenarios: [List]
Manual scenarios:    [List]

DEFECT MANAGEMENT
-----------------
Tool:                [JIRA / Azure DevOps / SAP Solution Manager]
Priority definitions: P1=[definition] P2=[definition] P3=[definition] P4=[definition]
SLA: P1=[hours] P2=[hours] P3=[hours] P4=[hours]

SIGN-OFF AUTHORITY
------------------
UAT sign-off:        [Name, role]
Go-live approval:    [Name, role]
```

### Test Case Matrix

```
| ID    | Module | Process          | Test Case                    | Type     | Priority | Status  | Tester | Pass/Fail | Defect Ref |
|-------|--------|-----------------|------------------------------|----------|----------|---------|--------|-----------|------------|
| TC001 | FI     | Invoice Posting  | Post vendor invoice — valid  | Positive | P1       | Pending | [Name] |           |            |
| TC002 | FI     | Invoice Posting  | Post invoice — missing field | Negative | P1       | Pending | [Name] |           |            |
| TC003 | MM     | Purchase Order   | Create PO — standard         | Positive | P1       | Pending | [Name] |           |            |
| TC004 | MM     | Purchase Order   | Create PO — blocked vendor   | Negative | P2       | Pending | [Name] |           |            |
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Test pyramid documented with all six levels addressed
- [ ] Test case library reviewed and approved by business process owners
- [ ] Test data strategy documented with anonymization approach confirmed
- [ ] Unit and integration testing completed with defect log
- [ ] E2E testing completed with performance benchmarks met
- [ ] UAT execution is 100% complete (not estimated, counted)
- [ ] Zero open P1 defects; P2 defects resolved or formally risk-accepted in writing
- [ ] Formal UAT sign-off document signed and dated

**Evidence required:** Test strategy document, test case matrix with pass/fail status, defect log, performance test report, signed UAT sign-off form.

If any item above is unchecked, this skill is NOT complete. Do not claim sign-off readiness.

---

## Next Skill

After completing this skill, invoke: `data-migration`
Conditions for handoff: Testing strategy signed off and UAT complete. Data migration execution requires its own testing (reconciliation, trial run) — invoke the data-migration skill next.

---

## Cross-References

- `go-live-readiness` — Testing sign-off is one input to the go/no-go matrix; invoke after this skill
- `cutover-planning` — Test completion gates cutover execution
- `development-workflow` — Unit test standards for custom development
- `sap-test-designer` agent — Use for automated test case generation from process specs
