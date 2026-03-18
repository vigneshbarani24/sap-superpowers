---
name: sap-go-live-readiness
description: Use when preparing for SAP go-live, cutover planning, or readiness assessments. Enforces a hard-gated checklist that cannot be skipped.
---

# SAP Go-Live Readiness

Systematic go-live preparation — every gate must pass before proceeding.

<HARD-GATE>
Do NOT declare go-live readiness until ALL gates have been explicitly verified. A skipped gate is a production incident waiting to happen.
</HARD-GATE>

## Checklist

You MUST verify each gate in order. Mark each as PASS, FAIL, or N/A with justification:

1. **Functional testing complete** — All test cases executed, defects resolved
2. **Integration testing complete** — All interfaces tested end-to-end
3. **UAT sign-off obtained** — Business users have formally signed off
4. **Performance testing passed** — Load/stress tests within SLA thresholds
5. **Data migration validated** — Mock conversions successful, reconciliation clean
6. **Authorization concept implemented** — Roles assigned, SoD conflicts resolved
7. **Cutover plan documented** — Step-by-step with owners, durations, rollback triggers
8. **Hypercare plan ready** — Support team, escalation paths, monitoring dashboards
9. **Training delivered** — End users trained, materials available
10. **Go/No-Go decision documented** — Steering committee approval recorded

## Gate Detail

### Gate 1: Functional Testing

**Required evidence:**
- Test case execution report (pass/fail counts)
- Critical/high defect count = 0 open
- Medium defects have workarounds documented
- Regression test suite passing

**Questions to ask:**
- How many test cases were planned vs executed?
- Are there any critical/high defects still open?
- Have all business process chains been tested end-to-end?

### Gate 2: Integration Testing

**Required evidence:**
- All inbound/outbound interfaces tested
- Error handling verified (what happens when partner system is down?)
- Volume testing done (realistic message counts)
- Monitoring alerts configured

**Questions to ask:**
- Which interfaces were tested with production-like volumes?
- What happens when an IDoc fails? Who gets notified?
- Are retry mechanisms configured?

### Gate 3: UAT Sign-Off

**Required evidence:**
- Formal sign-off document from each business process owner
- UAT defect log with resolution status
- Change requests captured (for post-go-live backlog)

**Questions to ask:**
- Have all business process owners signed off?
- Are there any conditional sign-offs (signed off with caveats)?

### Gate 4: Performance Testing

**Required evidence:**
- Load test results (response times, throughput)
- Stress test results (system behavior under peak load)
- Batch job runtime estimates vs. available batch window
- Database growth projections

**Questions to ask:**
- Do batch jobs complete within the overnight window?
- What is the response time for the most-used transactions?

### Gate 5: Data Migration

**Required evidence:**
- Mock conversion results (at least 2 successful runs)
- Data reconciliation report (source vs target counts and totals)
- Data quality report (cleansing applied, exceptions handled)
- Conversion program transport list

**Questions to ask:**
- How long does the full data load take?
- What is the reconciliation delta? Is it acceptable?

### Gate 6: Authorization

**Required evidence:**
- Role-to-user assignment matrix
- SoD conflict report (clean or mitigated)
- Emergency access (firefighter) procedure documented
- Authorization testing results

### Gate 7: Cutover Plan

**Required evidence:**
- Cutover runbook with numbered steps
- Each step has: owner, estimated duration, predecessor, rollback trigger
- Communication plan (who gets notified at each milestone)
- Dress rehearsal completed (at least 1 dry run)

**Cutover runbook template:**

| # | Task | Owner | Duration | Start | End | Predecessor | Rollback Trigger |
|---|------|-------|----------|-------|-----|-------------|-----------------|
| 1 | Lock legacy system | Basis | 30 min | T-0 | T+0:30 | — | Users report access |
| 2 | Final data extract | Data team | 2 hrs | T+0:30 | T+2:30 | 1 | Extract fails |
| 3 | Load to S/4HANA | Data team | 4 hrs | T+2:30 | T+6:30 | 2 | Load errors > 1% |
| ... | ... | ... | ... | ... | ... | ... | ... |

### Gate 8: Hypercare Plan

**Required evidence:**
- Hypercare team roster with shifts
- Escalation matrix (L1 → L2 → L3 → vendor)
- Monitoring dashboard URLs
- Known issue list with workarounds
- Daily stand-up schedule (first 2 weeks)

### Gate 9: Training

**Required evidence:**
- Training completion rates by role
- Training materials accessible (not locked on someone's laptop)
- Quick reference cards for top 10 transactions
- Helpdesk ready to handle basic questions

### Gate 10: Go/No-Go Decision

**Required evidence:**
- Steering committee meeting minutes
- Go/No-Go decision matrix (all gates summarized)
- Rollback decision criteria documented
- Final approval signatures

**Go/No-Go decision matrix template:**

| Gate | Status | Owner | Notes |
|------|--------|-------|-------|
| Functional testing | PASS/FAIL | [name] | [details] |
| Integration testing | PASS/FAIL | [name] | [details] |
| UAT sign-off | PASS/FAIL | [name] | [details] |
| Performance testing | PASS/FAIL | [name] | [details] |
| Data migration | PASS/FAIL | [name] | [details] |
| Authorization | PASS/FAIL | [name] | [details] |
| Cutover plan | PASS/FAIL | [name] | [details] |
| Hypercare plan | PASS/FAIL | [name] | [details] |
| Training | PASS/FAIL | [name] | [details] |
| **DECISION** | **GO / NO-GO** | [steering committee] | [conditions] |

## After Go-Live

- Execute hypercare plan
- Daily stand-ups for first 2 weeks
- Monitor performance dashboards
- Track and resolve production issues
- Conduct lessons learned after stabilization (week 4)
