---
name: performance-tuning
description: Use when diagnosing or resolving SAP performance problems — slow transactions, long-running batch jobs, expensive SQL, HANA resource issues, or general ABAP runtime bottlenecks.
---

# SAP Performance Tuning

This skill enforces measurement-first, evidence-based performance optimization. It makes optimizing without baselines, guessing at bottlenecks, or shipping unverified improvements structurally impossible.

## Iron Laws

1. **NEVER OPTIMIZE WITHOUT MEASURING.** Every optimization action must be preceded by a measurement that identifies the specific bottleneck. Optimization without measurement is guessing about what is slow. Guessing produces changes that may help, may do nothing, or may make things worse — and you cannot tell which.
2. **ESTABLISH A BASELINE FIRST.** Before any change is made, the current performance must be measured and recorded. Without a baseline, "improved" is meaningless. The baseline is the before; the post-fix measurement is the after. Both are required to demonstrate improvement.
3. **TEST WITH PRODUCTION-REPRESENTATIVE VOLUME.** A program that runs in 2 seconds on 1,000 test records and 4 hours on 10,000,000 production records has a performance problem that testing did not reveal. All performance claims must be validated under data volumes that represent production, not sandbox.
4. **NEVER ASSUME HANA FIXES BAD SQL.** HANA's columnar store, parallel execution, and in-memory processing are powerful — and are regularly used to justify skipping SQL optimization. HANA does not eliminate the cost of SELECT * with no WHERE clause, SELECT in a loop, or Cartesian joins. Bad SQL is bad SQL on any database.
5. **DOCUMENT BEFORE AND AFTER.** Every performance change must have documented before metrics, the change made, and after metrics. Undocumented "improvements" cannot be verified, cannot be reversed intelligently, and cannot be used to justify further investment.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip baseline measurement because "it's obviously slow" | "The program takes 45 minutes, we know it's slow" | Knowing it is slow is not knowing where it is slow. Without a baseline per-step measurement, optimization effort targets the most obvious-looking code — which is rarely the actual bottleneck. | Iron Law 1 and 2. Run SAT and ST05 first. The bottleneck is in the data, not in your intuition. |
| Claim HANA resolves the performance issue | "We're on S/4HANA, the database handles this efficiently" | HANA provides massive acceleration for analytics and aggregation. It does not compensate for N+1 SELECT patterns, missing WHERE clauses, or SELECT * on wide tables. The HANA-optimized cost of a bad query is still higher than the cost of a good query. | Iron Law 4. Run ST05 on HANA. Review the execution plan. Optimize the SQL. Then let HANA accelerate it. |
| Optimize based on code appearance | "I can see this loop looks inefficient" | Runtime behavior does not match static code appearance. A "complex" section may be fast; a "simple" SELECT may account for 80% of runtime. Profiles reveal the truth. | Iron Law 1. Run SAT. Optimize what the profiler shows is slow, not what looks slow in the editor. |
| Test with reduced data volume | "DEV doesn't have full data, but the logic is the same" | O(n log n) and O(n²) algorithms produce unnoticeable differences at 10,000 rows. They produce minutes-to-hours differences at 10,000,000 rows. Performance testing without production volume is not performance testing. | Iron Law 3. Use a production copy, anonymized if necessary, or generate representative volume. If neither is possible, document the extrapolation risk explicitly. |
| Optimize everything at once | "While I'm in here, I'll clean up all the inefficiencies" | Multiple simultaneous changes make it impossible to attribute improvement (or regression) to a specific change. Each optimization must be isolated, measured, and confirmed before the next is applied. | One change at a time. Measure after each. Build a change log with before/after for each discrete optimization. |
| Mark performance as resolved after single test run | "I ran it and it's faster now" | One test run is not a measurement. Network variability, buffer state, lock contention, and resource competition all affect single-run results. Measure multiple runs, discard outliers, compare medians. | Iron Law 5. Record three or more runs before and after. Compare medians. Document the methodology. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to skip measurement:

- "I can see the bottleneck, it's obviously this loop..." → Iron Law 1. Run SAT. The profiler may disagree with you. Check before optimizing.
- "HANA will handle it..." → Iron Law 4. HANA accelerates good SQL. It does not fix bad SQL. What does ST05 show?
- "It's faster now, we're done..." → Iron Law 5. Document the before and after metrics. How much faster? Under what volume? How measured?
- "We'll optimize it if it becomes a problem..." → Performance problems in production are production incidents. Design for production volume from the start.
- "The indexes will cover this..." → Verify. Run ST05 and check the execution plan. Missing index hits appear as full table scans regardless of what indexes you believe exist.
- "This change is safe, let me make a few more while I'm here..." → One change at a time. Isolate each optimization. Measure each change.
- "We don't have production data in DEV..." → Iron Law 3. Extrapolation risk must be documented. Request anonymized production copy or generate synthetic data at volume.

<HARD-GATE>
Before implementing any performance optimization: confirm (1) a baseline measurement has been recorded using SAT, ST05, or applicable monitoring tool, (2) the specific bottleneck has been identified from profiling data — not from code inspection, (3) the proposed optimization targets the identified bottleneck specifically, and (4) a test plan with production-representative data volume exists. If any of these four conditions is not confirmed, no optimization changes may be implemented.
</HARD-GATE>

## Tuning Process

### Step 1 — Establish Baseline

Before touching any code or configuration, record current performance metrics:

- **Transaction response time:** Run the transaction or program three times under representative conditions. Record wall-clock time for each run and the median.
- **SAT (ABAP Runtime Analysis):** Activate via transaction SAT or `/nsat`. Execute the program. Export the trace. Record gross time and net time by program and call hierarchy. Identify the top 10 time consumers by gross time percentage.
- **ST05 (SQL Trace):** Activate in ST05. Execute the program. Deactivate. Display trace. Record: total SQL time, number of executions per statement, records fetched vs. records needed, and any full table scans (no index used).
- **ST02 (Buffer Statistics):** Check buffer hit rates for table buffers (generic, single-entry, full). Low hit rates indicate buffering configuration issues rather than code problems.
- **/SDF/MON (System Performance Monitor):** For system-wide issues, check current work process load, memory consumption, and response time distribution. Distinguish single-program problems from system-wide degradation.
- **SM50/SM66:** For hanging or resource-consuming processes, check work process wait reasons and program attribution.

Evidence: Baseline document with three run times, SAT export with top 10 time consumers, ST05 summary with SQL statement list.
Gate: Baseline documented. No optimization work begins until baseline is recorded and the primary bottleneck category is identified (SQL / ABAP logic / memory / locking / system resource).

### Step 2 — Identify Bottleneck

Analyze baseline data to locate the specific bottleneck. Apply the 80/20 rule — find the operation consuming 80% of time and optimize that first.

**SQL Bottlenecks (identified in ST05):**
- Full table scans on large tables → Missing WHERE clause fields, missing index.
- High execution count on same statement → SELECT in loop (N+1 pattern).
- Large fetch count vs. small needed count → SELECT * or missing field restriction.
- Long lock waits → Conflicting DML operations or missing commit rhythm in batch.

**ABAP Logic Bottlenecks (identified in SAT):**
- Method or FORM routine consuming >20% gross time → Algorithmic issue or unnecessary work inside the hot path.
- String operations in loops → CONCATENATE or string template inside high-iteration loop.
- READ TABLE with linear search on STANDARD TABLE → Wrong internal table type for the access pattern.
- Repeated identical computation inside loop → Move invariant computation outside the loop.

**Memory Bottlenecks (identified in ST02 and memory monitors):**
- Large internal tables held in memory → Use PACKAGE SIZE for batch processing instead of loading full result sets.
- Repeated large allocations inside loops → Pre-allocate or reuse structures.

Evidence: Written bottleneck statement identifying the specific operation, its location (program, method, line), its contribution to total runtime (% from SAT or absolute from ST05), and category.
Gate: Bottleneck is specific — a named method, a specific SQL statement, a named internal table operation. "The program is slow" is not a bottleneck. "SELECT FROM BKPF at line 247 of ZCL_INVOICE_BATCH runs 50,000 times and accounts for 78% of total SQL time" is a bottleneck.

### Step 3 — Select Optimization Approach

Match the bottleneck category to the correct optimization technique. Do not apply techniques that do not match the identified bottleneck.

**For SELECT in loop (N+1 pattern):**
- Replace with SELECT...FOR ALL ENTRIES IN (for ABAP SQL) or JOIN.
- FOR ALL ENTRIES requires the driving table to be non-empty — add guard check.
- Consider CDS association with $projection if in RAP context.

**For full table scan:**
- Add WHERE clause on primary key or existing index field.
- Check secondary indexes via SE11 → Indexes tab. Create targeted index if justified by access pattern.
- For HANA: consider HANA-native calculation views or CDS with analytical annotations for aggregate-heavy queries.

**For wrong internal table type:**
- STANDARD TABLE with READ TABLE LINEAR → change to SORTED TABLE with READ TABLE BINARY SEARCH or HASHED TABLE with READ TABLE key lookup.
- Rule: HASHED TABLE for exact-key single-record lookup, SORTED TABLE for range access and sorted reads, STANDARD TABLE for sequential append-and-process.

**For memory volume:**
- Replace single large SELECT INTO TABLE with SELECT...PACKAGE SIZE loop for batch processing.
- Free large internal tables with FREE after use in long-running programs.

**For ABAP logic in hot path:**
- Move invariant calculations outside loops.
- Replace string CONCATENATE in loops with string table joined at end.
- Cache repeated identical lookups in a local HASHED TABLE.

**For HANA-specific optimization:**
- Push aggregation and filtering to the database layer via CDS analytical views rather than loading data into ABAP and processing in memory.
- Use ABAP SQL aggregate functions (SUM, COUNT, MAX, MIN, AVG) in SELECT rather than summing in ABAP loops.
- Prefer CDS with @Analytics.query for complex analytical workloads.

Evidence: Optimization approach selected and documented with rationale referencing the bottleneck evidence from Step 2.
Gate: Optimization technique directly addresses the identified bottleneck. No speculative optimizations applied to areas not identified in baseline profiling.

### Step 4 — Implement One Change at a Time

Apply one optimization change. Document what was changed before implementing it. After each change, repeat the measurement from Step 1 and compare to baseline.

Evidence: Change log entry with: what was changed, why (referencing bottleneck), before metric, after metric.
Gate: Each change is isolated. Measurement taken after each change. Regression check confirms no degradation in non-optimized paths.

### Step 5 — Validate at Production Volume

Confirm optimization holds at production-representative data volume. If DEV does not have production volume:

- Request anonymized production copy for performance testing in QAS.
- Generate synthetic data at production volume if anonymized copy is unavailable.
- If neither is possible: document the volume gap explicitly, state the extrapolation risk, and require production monitoring for the first 5 business days after transport.

Evidence: Test run results at production volume. Comparison of baseline vs. optimized at representative volume.
Gate: Improvement confirmed at production volume OR volume gap documented with explicit monitoring plan.

### Step 6 — Document and Transport

Complete the performance report before transporting. The report is a deliverable — not a post-production afterthought.

Evidence: Completed performance report. Transport released after code-review.
Gate: Performance report completed. Code-review completed on all changed objects. Transport to production via standard path.

## Performance Report Template

```
PERFORMANCE TUNING REPORT
==========================
Program / Transaction: [Name and T-code]
System: [SID and client]
Analysis date: [Date]
Analyst: [Name]
Ticket / Request: [Reference]

BASELINE METRICS
----------------
Measurement method: [SAT / ST05 / wall-clock / /SDF/MON]
Test data volume: [Record count and table/entity name]
Run 1: [Time]  Run 2: [Time]  Run 3: [Time]  Median: [Time]

SAT top 5 time consumers (baseline):
[Rank] | [Program/Method] | [Gross %] | [Net Time]

ST05 SQL summary (baseline):
[Statement] | [Executions] | [Records fetched] | [Avg time ms] | [Index used Y/N]

BOTTLENECK IDENTIFIED
---------------------
Category: [SQL / ABAP Logic / Memory / Locking / System Resource]
Location: [Program, method, line number]
Description: [Specific operation and why it is the bottleneck]
Contribution: [% of total runtime or absolute time]

OPTIMIZATIONS APPLIED
---------------------
Change 1:
  What changed: [Description]
  Why: [Bottleneck evidence reference]
  Before: [Metric]
  After: [Metric]
  Delta: [Improvement %]

[Repeat for each discrete change]

POST-OPTIMIZATION METRICS
--------------------------
Test data volume: [Same as baseline — must match]
Run 1: [Time]  Run 2: [Time]  Run 3: [Time]  Median: [Time]
Total improvement: [%] ([Before median] → [After median])

PRODUCTION VOLUME VALIDATION
-----------------------------
Volume tested: [Record count]
Production volume: [Estimated record count]
Volume match: [Yes / Partial — see risk note / No — monitoring plan required]
Risk note: [If volume gap exists — document extrapolation and monitoring plan]

TRANSPORT
---------
Transport number: [DEVK9XXXXX]
Changed objects: [List]
Code review: [Completed / Pending — must be completed before PRD transport]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Baseline measurement documented — three runs, median recorded, SAT and ST05 data collected
- [ ] Bottleneck identified by profiling data — specific operation, location, and runtime contribution stated
- [ ] Optimization approach selected and matched to bottleneck evidence
- [ ] Each optimization implemented and measured independently — one change at a time
- [ ] Post-optimization measurement completed using same methodology as baseline
- [ ] Performance improvement confirmed — before and after metrics documented with delta
- [ ] Validation completed at production-representative data volume OR volume gap documented with monitoring plan
- [ ] All changed code submitted to code-review before production transport
- [ ] Performance report completed and attached to the request record
- [ ] Transport released through DEV → QAS → PRD standard path

**Evidence required:** Baseline measurement document (SAT export, ST05 summary), performance report with before/after metrics, code-review approval, transport confirmation.

## Next Skill

After completing this skill, invoke: `code-review`
Conditions for handoff: After all optimization changes are confirmed by measurement and the performance report is drafted, submit all changed objects for code-review. Attach the performance report — the reviewer needs the baseline, the identified bottleneck, and the post-optimization metrics to evaluate whether the changes are correct, complete, and do not introduce new defects.

## Cross-References

- Use `code-review` to review all optimization changes before transport release
- Use `troubleshooting` if performance profiling reveals an underlying error condition (dump, lock escalation, resource exhaustion) rather than a pure code efficiency issue
- Use `development-workflow` for transport creation and management after review approval
