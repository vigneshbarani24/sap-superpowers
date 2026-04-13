# Clean Core Principles — SAP Reference Guide

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise, S/4HANA Cloud, BTP ABAP Environment
**Referenced By:** skills/clean-core-strategy, skills/development-workflow, skills/code-review, skills/s4hana-migration

## Definition

**Clean core** means the SAP system is maintained in a state where:
1. Customizations use only SAP-released extension points (no core modifications)
2. Data quality is enforced at entry — no reconciliation workarounds
3. Business processes align to SAP standard without non-standard workarounds
4. Upgrades can be applied with minimal custom code regression

> SAP's clean core is the pre-condition for continuous cloud delivery — without it, every upgrade is a custom code crisis.

---

## The Three Pillars

### Pillar 1 — Clean Extensions

Extensions must use only SAP-released APIs and extension points. No modifications to SAP standard objects.

| Tier | What It Means | Allowed in ABAP Cloud? |
|------|--------------|----------------------|
| Tier 1 — SAP Standard | SAP-delivered code, tables, and functionality | Read only (no modification) |
| Tier 2 — SAP Extensibility APIs | BAdI implementations, CDS exits, key user fields | Yes — recommended approach |
| Tier 3 — Custom Applications | Purpose-built apps using released APIs only | Yes — using C2/USE_IN_CLOUD_DEVELOPMENT APIs |

**Extension Prohibition List:**
- No `INCLUDE` modifications to SAP programs (SE38 on SAP namespace)
- No user exits in SAP function groups marked as non-releasable
- No direct table inserts to SAP-owned tables (MARA, BKPF, VBAK, etc.)
- No modification of delivered DDIC objects (domains, data elements, structures)

### Pillar 2 — Clean Data

Data quality is enforced through process discipline, not post-hoc correction programs.

| Principle | Implementation | Measurement |
|-----------|---------------|-------------|
| Single source of truth | Business Partner as master; no duplicate customer/vendor records | Duplicate BP rate < 0.1% |
| No open item backlog | Open A/R, A/P items cleared before go-live | 0 items > 360 days at cutover |
| Material master completeness | All required views populated per plant/storage location | MRP fields completeness > 99% |
| Cost center assignment | Every cost-relevant posting has valid cost center/internal order | CO completeness > 99.5% |
| Profit center coverage | All balance sheet accounts have profit center derivation rule | Gap < 0.1% |

### Pillar 3 — Clean Processes

Business processes must follow the SAP Activate "fit to standard" principle. Deviations require formal approval.

| Deviation Type | Governance | Risk |
|----------------|-----------|------|
| Configuration only | Allowed — document in solution design | Low |
| Key user extensibility (custom fields, BRF+) | Allowed — governed by IT review | Low-Medium |
| Developer extensibility (BAdI, CDS exit) | Allowed — requires code review and ATC clean | Medium |
| SAP namespace modification | Blocked — requires SAP approval (modification allowkey) | HIGH — upgrade blocker |
| Direct database write (not via API) | Blocked — data integrity violation | CRITICAL |

---

## Extension Classification Decision Tree

```
New requirement arrived — is it covered by SAP standard configuration?
  YES → Configure in SPRO/Fiori admin — done
  NO  → Can it be met by a key user extension (custom field, BRF+ rule, output template)?
          YES → Implement via In-App Extensibility (transaction F1346 / BAS on BTP)
          NO  → Does SAP provide a released BAdI or CDS extension point?
                  YES → Implement BAdI or CDS exit — Tier 2
                  NO  → Build a side-by-side extension on BTP using released OData/Event APIs
                          NEVER → Modify SAP standard code (no modification key)
```

**Side-by-Side Extension Pattern (BTP):**
```
S/4HANA ──(OData/Event Mesh)──▶ BTP App (CAP / ABAP Cloud) ──▶ Custom UI (Fiori Elements)
```

---

## API-First Development Rules

1. **Check release status before use** — query `I_APIBusinessObject` or check ADT API State property
2. **Prefer CDS views over SELECT on tables** — CDS views abstract the physical model and survive schema changes
3. **Use OData V4 for new services** — V2 is supported but V4 is the strategic direction
4. **No direct RFC calls from BTP** — use released OData APIs or SAP Event Mesh for communication
5. **Version your custom APIs** — use semantic versioning; deprecate old versions formally
6. **Contract test your APIs** — use OpenAPI spec from api.sap.com as the test contract

---

## Clean Core KPIs

Measure clean core health at project start and on each upgrade:

| KPI | Formula | Target |
|-----|---------|--------|
| Custom Object Count | Count of Z/Y namespace ABAP objects | Trend down 10% per year |
| ATC Violation Rate | Open ATC findings / total custom objects | < 2% HIGH or VERY HIGH findings |
| Released API Coverage | % of DB accesses via released CDS or OData | > 85% |
| Upgrade Regression Rate | Failed test cases after SP upgrade / total custom test cases | < 5% |
| Modification Count | Objects with SAP modification key | 0 (hard rule) |
| Open Compatibility View Usage | Custom code reading compatibility views (BSEG, MKPF, KNA1) | 0 by go-live |

---

## Common Anti-Patterns and Remediation

| Anti-Pattern | Why It Violates Clean Core | Remediation |
|-------------|--------------------------|-------------|
| Direct BSEG table reads in custom reports | BSEG is a cluster table remnant (compatibility view in S/4HANA); performance degrades under load | Replace with I_JournalEntryItem CDS view |
| BTE (Business Transaction Event) P-functions | P-functions modify SAP posting logic at low level — not clean; not cloud-compatible | Replace with BADI FI_DOCUMENT_BADI or posting exit |
| User exits in MV45AFZB (SD order BAdI) | Function group exits — not released for cloud; fragile across upgrades | Replace with BAdI ES_FILL_USER_DATA or CDS view exit |
| SELECT * FROM VBAP in custom code | Reads all columns — performance issue on HANA column store; also misses ACDOCA integration | Use I_SalesOrderItem CDS view with specific field list |
| Hardcoded company codes / plant codes | Configuration values embedded in code break at upgrade or multi-system deployment | Use customizing tables and read at runtime |
| CALL TRANSACTION in background jobs | Bypasses proper API contract; breaks with UI changes; not cloud compatible | Replace with BAPI or OData API call |

---

## Upgrade Impact Assessment

Before each SAP SP or release upgrade, run this clean core health check:

1. **ATC clean run** — ATC check variant `ABAP_CLOUD_READINESS`; zero tolerance for HIGH findings
2. **Compatibility view scan** — search for custom code reading BSEG, MKPF, MSEG, KNA1, LFA1 (they are views now, not tables)
3. **BAPI usage review** — identify BAPIs marked deprecated in new release
4. **Enhancement spot activation check** — verify all BAdI implementations still activate without error
5. **Custom OData service check** — validate all Z-prefix OData services against new Gateway version
6. **Transport regression test** — run smoke tests on all Tier 2 and Tier 3 extensions

---

## Clean Core and SAP Activate

In the Fit-to-Standard workshop phase of SAP Activate:
- Every custom requirement must be classified as: Configuration / Key User / Developer Extensibility / Side-by-Side / Not Feasible
- **No "custom code" without a clean core classification** — this is the design gate
- The Clean Core scorecard is updated weekly during Build phase
- At go-live readiness gate: ATC findings = 0 HIGH, compatibility view usage = 0

---

## Extensibility Method Quick Reference

| Requirement Type | Tool / Method | SAP Transaction / Service |
|-----------------|--------------|--------------------------|
| Additional field on standard screen | Key User In-App Extensibility | F1346 (Custom Fields and Logic) |
| Custom validation rule | BRF+ rule or CDS access control | F1346 / ADT |
| Additional logic at save | BAdI implementation (released) | SE18/SE19 or ADT |
| Custom report on standard data | CDS view (C2 contract) + Fiori app | ADT / SEGW |
| External business logic | BTP side-by-side app + Event Mesh | BTP Cockpit |
| Custom workflow | SAP Build Process Automation (BPA) | BTP BPA service |
| Custom UI with new data | RAP object on custom tables | ADT (ABAP Cloud) |
| Output forms (invoices, orders) | Adobe Forms / BTP Document Management | SFP (on-premise) / BTP |

---

## Clean Core Score Card Template

Use this at each project milestone review:

| Category | Metric | Target | Current Score |
|----------|--------|--------|--------------|
| Extensions | Custom objects in Z/Y namespace | Baseline documented | — |
| ATC Findings | HIGH / VERY HIGH open findings | 0 | — |
| Compatibility Views | Custom code reading BSEG, MKPF, KNA1 | 0 at go-live | — |
| Released API Coverage | % of DB access via CDS/OData | > 85% | — |
| Modifications | Objects with modification key | 0 | — |
| Deprecated APIs | Custom code using deprecated BAPIs | 0 at go-live | — |
