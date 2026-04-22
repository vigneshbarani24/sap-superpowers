---
name: data-migration
description: Use when planning, designing, or executing SAP data migration. Triggers on requests involving data migration strategy, data mapping, LTMC, BODS, legacy data conversion, reconciliation, trial migration, or cutover data load.
---

# SAP Data Migration

This skill enforces structured, evidence-based data migration — preventing the three most common catastrophic failures: migrating without reconciliation, skipping data profiling, and assuming source data is clean.

---

## Iron Laws

1. **NEVER MIGRATE WITHOUT RECONCILIATION.** Every migrated object must be counted and reconciled: records sent = records loaded = records validated. A migration without reconciliation is a migration with unknown quality.
2. **NEVER SKIP DATA PROFILING.** You cannot map what you haven't profiled. Data profiling is not optional prep — it is the foundation everything else is built on.
3. **NEVER ASSUME SOURCE DATA IS CLEAN.** Source data is always dirty. The question is how dirty. Data profiling quantifies the dirt. Remediation cleans it. Assuming it's clean skips both steps.
4. **ALWAYS RUN AT LEAST ONE TRIAL MIGRATION.** A trial migration in a non-production system is non-negotiable. The first full load CANNOT be the production cutover load.
5. **TRANSFORMATION RULES ARE DOCUMENTED BEFORE LOAD, NOT AFTER.** If a transformation rule is not in the mapping document before loading, it does not exist. Post-hoc documentation of "what we actually did" is not a migration document.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip data profiling to save time | "We know the source system well" | Knowing the system ≠ knowing its data quality. Legacy data accumulated over years has integrity issues the source team doesn't know about. | Iron Law 2: Profiling is non-negotiable. At minimum: record counts, null rates, format violations, referential integrity checks. |
| Declare migration complete without reconciliation | "Everything loaded without errors" | Error-free load ≠ complete load. Records can be silently skipped, truncated, or misrouted. Only counts prove completeness. | Iron Law 1: Reconciliation report required. Records out = records in, or explain every delta. |
| Use big bang strategy without considering phased option | "It's simpler to do everything at once" | Big bang increases cutover window, risk of failure, and rollback complexity. Phased migration is often safer. Justify the choice with evidence. | Checklist Step 1: Strategy decision documented with justification and risk assessment. |
| Assume vendor/partner master data is correct | "The client maintains this data themselves" | Client-maintained data has format issues, duplicates, and gaps. Profile it the same way as any other source. | Iron Law 3: Profile all sources without exception. |
| Skip trial migration because "dev loads worked" | "We've done partial loads in dev" | Partial dev loads ≠ full trial migration. Trial migration tests volume, performance, error handling, and reconciliation in an integrated environment. | Iron Law 4: Full trial migration mandatory. Dev loads do not satisfy this requirement. |
| Defer cleansing to post-migration | "We'll clean it up once it's in SAP" | SAP has strict validation rules. Dirty data that loads creates more remediation effort in SAP than in the source. Clean before migration. | Checklist Step 3: Cleansing rules and completion criteria defined and executed before load. |

---

## Red Flags

Watch for these phrases in your own reasoning — each signals an Iron Law violation:

- "The source data looks pretty good..." → You haven't profiled it. Stop.
- "We can reconcile after go-live..." → Post-go-live reconciliation of migrated data is triage, not validation. Stop.
- "The load ran without errors, so it's complete..." → Error-free ≠ complete. Run reconciliation. Stop.
- "We did this for the dev load, we don't need a trial migration..." → Dev load ≠ trial migration. Stop.
- "The transformation is simple enough to document later..." → Iron Law 5. Document first. Stop.
- "The client assured us the data is clean..." → Client assurance is not a data profile. Stop.
- "We'll do big bang, it's just easier..." → Justify the risk with evidence. Stop.

---

<HARD-GATE>
Trial migration CANNOT be skipped. Production cutover data load cannot proceed until:
1. Data profiling is complete and results documented for ALL objects in scope
2. Data cleansing rules are defined, executed, and sign-off obtained from the business
3. Full field-level mapping document is approved — source field → transformation rule → target SAP field
4. At least one full trial migration has been executed in a non-production environment
5. Trial migration reconciliation report confirms record counts match within defined tolerance
6. Data migration test sign-off obtained from business data owners
If any condition is unmet, the production load is NOT authorized. Do not proceed.
</HARD-GATE>

---

## Checklist

1. **Define migration strategy** — Choose and justify big bang vs. phased migration. Document scope: which objects, which legacy systems, cutover timeline.
   - Evidence: Migration strategy document with approach, justification, object scope, and phasing plan
   - Gate: Strategy reviewed and approved by project manager and client data owner

2. **Execute data profiling** — For every migration object, profile the source data: record counts, null rates, format compliance, duplicates, referential integrity, business rule violations.
   - Evidence: Data profiling report per object with quantified quality metrics
   - Gate: Profiling complete for 100% of in-scope objects; results reviewed by business owner

3. **Define cleansing rules and execute cleansing** — Based on profiling results, define transformation and cleansing rules. Execute cleansing in source or staging area. Measure improvement.
   - Evidence: Cleansing rules document; before/after data quality metrics; business sign-off on cleansed data
   - Gate: Cleansed data meets defined quality thresholds; business owner signs off

4. **Build field-level mapping document** — For every source field in scope, document: source system, field name, transformation logic, target SAP object, target field, mandatory/optional, validation rule.
   - Evidence: Data mapping document approved by functional consultants and business
   - Gate: Mapping reviewed by SAP functional lead; no unmapped mandatory SAP fields

5. **Configure migration tooling** — Set up LTMC, BODS, or custom migration program. Validate tool configuration matches the mapping document.
   - Evidence: Migration program / LTMC project configured; test load of sample records confirms correct field mapping
   - Gate: Sample load of 10–50 records validates all transformations correctly

6. **Execute trial migration** — Run full migration load for all objects in a non-production environment. Do not skip objects or volumes.
   - Evidence: Trial migration execution log; record counts per object (source vs. loaded)
   - Gate: Load completes without critical errors; record counts within tolerance

7. **Reconcile trial migration** — Compare source record counts to loaded SAP counts. Investigate all discrepancies. Document resolution for each delta.
   - Evidence: Reconciliation report: source count, load count, delta, resolution per object
   - Gate: All deltas explained and resolved or formally accepted; zero unexplained discrepancies

8. **Obtain data migration sign-off** — Present trial migration results and reconciliation to business data owners. Obtain written approval to proceed to production load.
   - Evidence: Signed data migration sign-off document
   - Gate: Sign-off obtained before production cutover window opens

---

## Deliverable Templates

### Data Migration Plan

```
PROJECT: [Name]
DATE: [Date]
VERSION: [Version]

MIGRATION STRATEGY
------------------
Approach:            [Big Bang / Phased — with justification]
Legacy systems:      [List source systems]
Cutover window:      [Date range, duration]
Rollback trigger:    [Conditions that trigger rollback]

OBJECTS IN SCOPE
----------------
| Object          | Source System | Tool  | Volume (records) | Priority | Owner     |
|-----------------|--------------|-------|-----------------|----------|-----------|
| Vendor Master   | Legacy ERP   | LTMC  | ~12,000         | P1       | [Name]    |
| Customer Master | Legacy CRM   | BODS  | ~8,500          | P1       | [Name]    |
| Open Items (AP) | Legacy ERP   | LTMC  | ~45,000         | P1       | [Name]    |
| Material Master | Legacy ERP   | LTMC  | ~30,000         | P1       | [Name]    |

MIGRATION TIMELINE
------------------
Data profiling:      [Start] → [End]
Data cleansing:      [Start] → [End]
Mapping:             [Start] → [End]
Trial migration 1:   [Date]
Trial migration 2:   [Date]
Production load:     [Date] [Time window]

RECONCILIATION TOLERANCE
------------------------
Standard objects:    0% variance (exact count match required)
Complex objects:     Up to [X]% variance with documented justification
```

### Data Mapping Document (per object)

```
OBJECT: [e.g., Vendor Master]
SOURCE SYSTEM: [e.g., Oracle EBS]
TARGET: SAP LFM1 / LFA1
MAPPING VERSION: [Version]

| Source Field     | Source Type | Transformation Rule                    | Target Table | Target Field | Mandatory | Validation          |
|-----------------|------------|---------------------------------------|-------------|-------------|-----------|---------------------|
| VENDOR_CODE     | VARCHAR(10) | Prefix with 'V', zero-pad to 10 chars | LFA1        | LIFNR       | YES       | Unique in LFA1      |
| VENDOR_NAME     | VARCHAR(80) | Trim whitespace, UPPER case            | LFA1        | NAME1       | YES       | Max 35 chars        |
| COUNTRY_CODE    | VARCHAR(2)  | Map legacy to ISO 3166-1 alpha-2       | LFA1        | LAND1       | YES       | Valid T005 entry    |
| PAYMENT_TERMS   | VARCHAR(10) | Map to SAP ZTERM via lookup table      | LFB1        | ZTERM       | YES       | Valid T052 entry    |
```

### Reconciliation Report

```
TRIAL MIGRATION: [Trial # and Date]
ENVIRONMENT:     [System ID]

| Object          | Source Count | Loaded Count | Delta | Delta % | Status      | Resolution             |
|-----------------|-------------|-------------|-------|---------|-------------|------------------------|
| Vendor Master   | 12,043      | 12,043      | 0     | 0.0%    | PASS        | —                      |
| Customer Master | 8,521       | 8,517       | 4     | 0.05%   | INVESTIGATE | 4 records missing LAND1|
| Open Items (AP) | 45,230      | 45,230      | 0     | 0.0%    | PASS        | —                      |

OVERALL STATUS: [PASS / FAIL / CONDITIONAL PASS]
SIGN-OFF REQUIRED FROM: [Data owner names]
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Migration strategy documented and approved (big bang vs. phased with justification)
- [ ] Data profiling complete for 100% of in-scope migration objects
- [ ] Cleansing rules defined and executed; business sign-off on cleansed data obtained
- [ ] Full field-level mapping document approved by functional consultants
- [ ] Migration tooling configured and sample load validated
- [ ] At least one full trial migration executed in a non-production environment
- [ ] Reconciliation report confirms zero unexplained discrepancies
- [ ] Data migration sign-off obtained from business data owners in writing

**Evidence required:** Data profiling report, cleansing sign-off, mapping document, trial migration execution log, reconciliation report, signed data migration sign-off.

If any item is unchecked, this skill is NOT complete. Do not authorize the production data load.

---

## Next Skill

After completing this skill, invoke: `cutover-planning`
Conditions for handoff: Data migration trial complete and signed off. Cutover planning must sequence the production data load as a critical path task within the cutover runbook.

---

## Cross-References

- `testing-strategy` — Data migration testing (trial run, reconciliation) is part of the overall test strategy
- `cutover-planning` — Production data load is a key step in the cutover runbook
- `go-live-readiness` — Data migration sign-off is a required input to the go/no-go matrix
- `sap-data-analyst` agent — Use for automated data profiling and anomaly detection
