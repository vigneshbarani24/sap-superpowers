# SAP Superpowers — Solution Patterns Library

**Last Updated:** 2026-04-12
**Purpose:** Curated, reusable SAP solution patterns — proven approaches for common problems
**Referenced By:** All SAP Superpowers skills (knowledge layer)

---

## What Are Patterns?

A **solution pattern** is a named, reusable answer to a recurring SAP problem. Each pattern documents:

- The **context** — where and when it applies
- The **problem** — what goes wrong without it
- The **solution** — the concrete, proven approach
- The **implementation** — what to build or configure, step by step
- The **verification** — how you confirm it worked
- The **trade-offs** — what you give up

Patterns are not tutorials. They assume you know SAP — they tell you the right approach and why.

---

## Pattern Categories

| Category | Description |
|----------|-------------|
| `abap-cloud/` | RAP, CDS, AMDP, released APIs, BAdI implementations |
| `integration/` | CPI iFlow design, IDoc handling, Event Mesh, OData consumption |
| `data-migration/` | Large volume load, delta load, error recovery, reconciliation |
| `module-config/` | FI, MM, SD, PP configuration patterns — proven config decisions |
| `performance/` | SQL tuning, internal table optimization, HANA pushdown |

---

## How to Contribute

1. Fork the `sap-superpowers-patterns` repository (public)
2. Create a new file in the correct category folder using the template below
3. Fill in **all** required sections — partial submissions are rejected
4. Submit a pull request with a description of the real project where you used the pattern
5. Maintainer reviews within 7 days for technical accuracy

### Contribution Quality Criteria

| Criterion | Requirement |
|-----------|-------------|
| Tested | Pattern used in a real SAP system (not a sandbox) |
| Generalizable | Useful beyond one customer landscape |
| Clean Core | Uses only released APIs (C2 / USE_IN_CLOUD_DEVELOPMENT); documents any exception |
| Real Data | Uses real SAP table names, tcodes, note numbers — no placeholders |
| Versioned | States exactly which S/4HANA versions it applies to |
| Code works | Code samples compile and produce the described result |

---

## Pattern Template

Filename convention: `<kebab-case-name>.md`

```markdown
# Pattern: <Short Descriptive Name>

**Category:** abap-cloud | integration | data-migration | module-config | performance
**Applies To:** <S/4HANA version range>
**Clean Core Compliant:** Yes | No (<reason if No>)
**Author:** <GitHub handle>
**Last Validated:** <YYYY-MM-DD>

## Context
When does this pattern apply? 2–4 sentences.

## Problem
What goes wrong without this pattern? What is the naive approach and its failure mode?

## Solution
Name the pattern approach in one sentence. Explain the key insight.

## Implementation
Step-by-step. Include code, tcode names, and configuration paths.

## Verification
- [ ] Checkable item 1
- [ ] Checkable item 2

## Trade-offs
| Benefit | Cost |
|---------|------|
| ...     | ...  |

## Related
- SAP Note XXXXXXX
- Skill: `skills/<skill-name>`
- Tcode: XX01
```

---

## Example Pattern Stubs

The following three patterns are the first contribution targets. Open a PR against `sap-superpowers-patterns` to claim and complete one.

---

### Stub 1: ABAP Cloud — CDS View with Association and Authorization

**File:** `abap-cloud/cds-view-with-association-and-auth.md`
**Applies To:** S/4HANA 1909+, BTP ABAP Environment

**Problem:** Developers write ad-hoc multi-table SELECT joins in ABAP reports rather than defining a reusable CDS view with a proper DCL access control file. The result: N copies of the same join logic, no authorization enforcement, and no upgrade safety (compatibility view risk).

**Solution outline:**
```abap
@AbapCatalog.sqlViewName: 'ZV_SALESORDEXT'
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Sales Order with Customer (Extended)'
define view entity ZI_SalesOrderExtended
  as select from I_SalesOrder as so
  association [0..1] to I_Customer as _Customer
    on so.SoldToParty = _Customer.Customer
{
  key so.SalesOrder,
  so.SoldToParty,
  so.SalesOrderDate,
  so.TotalNetAmount,
  _Customer.CustomerName,
  _Customer          -- expose association for path navigation
}
```

Access control file (DCL — same ABAP Package):
```abap
@EndUserText.label: 'Access Control: Sales Order Extended'
@MappingRole: true
define role ZI_SalesOrderExtended {
  grant select on ZI_SalesOrderExtended
    where ( SalesOrganization ) = aspect pfcg_auth( V_VBAK_VKO, VKORG );
}
```

**Key gotcha:** The authorization field in the WHERE clause must exist in the CDS view's SELECT list. If missing, the DCL silently returns zero rows for all users.

**Status:** Open to claim — file a PR at `sap-superpowers-patterns`

---

### Stub 2: Integration — Idempotent IDoc Processing

**File:** `integration/idempotent-idoc-processing.md`
**Applies To:** S/4HANA 1809+, SAP PI/PO, SAP Cloud Integration (CPI)

**Problem:** IDoc reprocessing after communication errors creates duplicate documents. A source system retransmits an ORDERS05 IDoc after a timeout — S/4HANA creates a second sales order. Duplicates are discovered during billing or goods issue, requiring manual cancellation and credit notes.

**Solution outline:**
1. Extend IDoc segment E1EDK01 with a custom field `ZEXT_ORDER_REF` via EDISAD extension (WE31/WE32) — populate with source system order number
2. In the IDoc inbound processing BAdI (`IDOC_INBOUND_ASYNCHRONOUS`), query `I_SalesOrder` for `ExternalDocumentID = incoming ZEXT_ORDER_REF` before calling SD order creation
3. If a matching order is found: write IDoc status 53 (Posted successfully — duplicate suppressed) with existing order number in text field; skip creation
4. If no match found: proceed with normal order creation; store the external reference in `VBKD-IHREZ` (customer reference field)
5. Log all duplicate detections to application log (SLG1 object `ZSD_IDOC_DEDUP`) for audit trail

**Key gotcha:** IDoc segments can arrive in a different order on retransmission when source system is SAP. Hash business-relevant fields (customer, date, items, quantities), not IDoc segment sequence position.

**Status:** Open to claim — file a PR at `sap-superpowers-patterns`

---

### Stub 3: Data Migration — Large Volume Load with Error Recovery

**File:** `data-migration/large-volume-load-with-error-recovery.md`
**Applies To:** S/4HANA migration projects (any release)

**Problem:** Loading 2M+ open items (FI-AR, MM stock, SD open orders) in a 6-hour cutover window. A single batch job fails on record 1.7M due to a missing cost center. The entire load must restart — the window is missed and go-live is delayed.

**Solution outline:**
1. **Pre-validate:** Before cutover window, run a validation pass against a QA system using `API_JOURNALENTRIES_PROCESS_SRV` (dry run / error-only mode). Generate error report, correct source data
2. **Partition:** Split source into chunks of 5,000 records. Write chunk status to control table `ZMIG_AR_CTRL` (fields: `CHUNK_ID`, `STATUS`, `REC_COUNT`, `OK_COUNT`, `ERR_COUNT`, `TIMESTAMP`)
3. **Parallel execution:** Schedule 4 parallel background jobs in SM36 — each processes a non-overlapping chunk range. Net throughput: ~4x single-threaded rate
4. **Error isolation:** Each chunk uses individual `TRY/CATCH cx_root` — one bad record fails only its chunk. Failed records written to `ZMIG_AR_ERR` with full error message and source key
5. **Restart:** Failed chunks re-queued automatically; corrected records reloaded in isolation without re-processing successful records
6. **Reconciliation:** After all chunks complete, compare `SUM(OK_COUNT)` from `ZMIG_AR_CTRL` vs source system count. Delta > 0.01% triggers hold before go-live sign-off

**Key gotcha:** LTMC (Migration Cockpit) has a memory ceiling per session — restart the cockpit session every 50,000 records for large loads. For programmatic loads via OData, set HTTP client timeout to 120s and implement exponential retry (3 attempts).

**Status:** Open to claim — file a PR at `sap-superpowers-patterns`

---

## License

All patterns are MIT licensed. By contributing, you agree to release your pattern under MIT.
