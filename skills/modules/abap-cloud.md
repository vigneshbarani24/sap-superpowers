---
name: abap-cloud
description: Use when writing, reviewing, or troubleshooting ABAP Cloud code, RAP business objects, CDS views, released APIs, or any ABAP development in S/4HANA Public Cloud or BTP ABAP Environment.
---

# ABAP Cloud

Enforces clean-core compliance: every piece of ABAP Cloud code MUST use only released APIs, restricted syntax, and RAP patterns — no exceptions.

## Content Routing

| Topic | Section |
|-------|---------|
| Released API verification | Iron Laws + Released API Patterns |
| RAP development | RAP Overview |
| CDS views | CDS View Patterns |
| Syntax restrictions | Restricted Syntax Reference |
| Service exposure | Service Binding Patterns |

## Iron Laws

1. **NEVER USE UNRELEASED APIS.** If the API does not appear in the SAP API Business Hub or is not annotated `@ReleaseState: RELEASED`, it CANNOT be used. Using unreleased APIs breaks upgrades — your code will fail silently in the next release.
2. **ALWAYS CHECK RELEASE STATUS BEFORE CODING.** Run transaction `ABAPDOC` or check the object in ADT "Released Objects" view before referencing any SAP object. Checking after writing is too late — rewrites are expensive.
3. **NEVER USE CLASSIC STATEMENTS EXCLUDED FROM RESTRICTED SYNTAX.** Forbidden: `SELECT * INTO TABLE` without field list, `EXEC SQL`, `CALL FUNCTION` (use `CALL METHOD` of a released function group), direct table access to DDIC tables without CDS. Restricted syntax is not a suggestion.
4. **NEVER BYPASS THE RAP FRAMEWORK FOR TRANSACTIONAL OPERATIONS.** Do not write UPDATE/INSERT/DELETE on application tables directly. All transactional operations go through the RAP EML (`MODIFY ENTITY`). Direct DML breaks the framework's consistency model.
5. **ALWAYS TEST IN ABAP TEST COCKPIT (ATC) BEFORE TRANSPORT.** ATC with the Cloud Readiness check variant is the gate. A clean ATC run is required evidence — not optional.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Use a classic BAPI directly | "BAPIs are stable SAP interfaces" | Most BAPIs are not released for ABAP Cloud; they will be blocked at activation | Check BAPI release status in `SE37` → "Where-Used" → Cloud Release state before any BAPI reference |
| Access `MARA`, `BKPF`, `EKKO` directly | "These are standard SAP tables, always available" | Direct table access is forbidden in Cloud; use released CDS views (e.g., `I_MaterialDocumentItem`) | Replace with the corresponding released CDS VDM view; see SAP API Business Hub for equivalents |
| Skip ATC because "it's just a small change" | "ATC takes time, it's a minor fix" | A one-line change using a non-released type fails upgrade validation. All changes require ATC. | Iron Law 5: ATC is always required. No exceptions for size. |
| Use CALL FUNCTION for utility logic | "Function modules work fine in on-prem" | Classic function module calls are restricted in Cloud; use class-based calls or released APIs | Refactor to ABAP OO; use released utility classes from `CL_*` namespace |
| Write SQL without CDS views | "OpenSQL still works" | Direct table SELECT bypasses authorizations built into CDS; creates maintenance debt | Define a CDS view with `@AccessControl.authorizationCheck: #CHECK` and query through it |

## Red Flags

Watch for these in your own reasoning — each signals an Iron Law violation:

- "This table has always been available..." → You're about to access a non-released DB object. Check VDM equivalents first.
- "I'll just use the BAPI for now and refactor later..." → Unreleased BAPIs cannot be activated. There is no "later."
- "ATC can wait until the transport is ready..." → ATC must pass before transport creation, not after.
- "This ABAP statement works in on-prem too..." → On-prem compatibility is irrelevant. Cloud syntax rules apply.
- "Let me query BSEG directly..." → BSEG does not exist in ACDOCA-based S/4HANA Cloud. Use `I_JournalEntry` CDS.

<HARD-GATE>
Before writing any ABAP Cloud code: confirm the target system (BTP ABAP Environment / S/4HANA Public Cloud / Private Cloud). Confirm all referenced SAP objects appear in ADT Released Objects browser or SAP API Business Hub with status RELEASED. Do not write a single line of code until these confirmations exist.
</HARD-GATE>

## Key Concepts

- **Restricted Syntax:** Subset of ABAP allowed in Cloud; enforced by compiler. Check via ADT syntax check or ATC Cloud Readiness variant.
- **Released APIs:** SAP objects annotated for external use. Two categories: C0 (use in key user apps), C1 (use in developer extensibility).
- **VDM (Virtual Data Model):** Released CDS views prefixed `I_` (interface), `C_` (consumption), `P_` (private).
- **RAP (RESTful Application Programming Model):** Framework for transactional and query apps. Components: CDS view, behavior definition (`.bdef`), behavior implementation (class), service definition, service binding.
- **EML (Entity Manipulation Language):** ABAP syntax for RAP operations: `READ ENTITY`, `MODIFY ENTITY`, `COMMIT WORK AND WAIT`.

## Key Transaction Codes / ADT Tools

| Tool | Purpose |
|------|---------|
| ADT (Eclipse) | Primary dev environment for Cloud |
| `ABAPDOC` | Released API documentation |
| ATC (ABAP Test Cockpit) | Code quality + Cloud readiness |
| `SE80` | Not available in Cloud — use ADT |
| `SEGW` | OData v2 service — prefer RAP for new dev |
| `/IWFND/MAINT_SERVICE` | Activate OData services (classic) |

## Key CDS View Patterns (Released VDM)

| Domain | Released CDS View |
|--------|-----------------|
| Journal entries | `I_JournalEntry`, `I_JournalEntryItem` |
| Material documents | `I_MaterialDocumentItem` |
| Purchase orders | `I_PurchaseOrder`, `I_PurchaseOrderItem` |
| Sales orders | `I_SalesOrder`, `I_SalesOrderItem` |
| Business partner | `I_BusinessPartner` |
| Cost center | `I_CostCenter` |
| Profit center | `I_ProfitCenter` |

## RAP Development Checklist

1. **Define root CDS view** — annotate `@AbapCatalog.viewEnhancementCategory`, add `define root view entity`
2. **Define behavior definition** — specify `managed` or `unmanaged`; declare operations (`create`, `update`, `delete`, actions, determinations, validations)
3. **Generate behavior implementation class** — implement handler and saver methods
4. **Add validations** — use `FAILED`, `REPORTED` structures; report to field level
5. **Define service definition** — expose root + compositions
6. **Create service binding** — OData V4 UI or Web API binding; publish and test in Fiori Preview

## Integration Points

- **Event Mesh:** Raise RAP business events via `RAISE ENTITY EVENT`; consume via Event Consumption Model
- **Remote API calls:** Use `cl_http_client` (released) or Destination Service; never hard-code URLs
- **Side Effects:** Declare `sideEffects` in behavior definition to trigger UI refresh

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] All referenced SAP objects verified as released (C0 or C1) in ADT or API Business Hub
- [ ] ATC run with Cloud Readiness check variant — zero findings of severity Error or Warning
- [ ] No forbidden SQL patterns (SELECT *, EXEC SQL, direct DDIC table access without CDS)
- [ ] RAP EML used for all transactional operations — no direct DML on application tables
- [ ] Service binding published and tested via Fiori Preview or Postman (for Web API)

**Evidence required:** ATC results screenshot / export showing clean run; service binding URL confirmed active.

## Next Skill

After completing ABAP Cloud development, invoke: `verification-before-completion`
For deployment to BTP, invoke: `btp`
For API exposure and management, invoke: `integration-suite`

## Related Skills

- `btp` — BTP environment setup, CAP, HANA Cloud
- `integration-suite` — Exposing and consuming APIs
- `code-review` — General code quality review
- `troubleshooting` — Debugging runtime errors

## Complete RAP Example

Full travel entity showing CDS → Behavior → Service → Binding:

```abap
* 1. CDS Interface View
define root view entity ZI_Travel
  as select from /dmo/travel as travel
{
  key travel_id    as TravelID,
  agency_id        as AgencyID,
  customer_id      as CustomerID,
  begin_date       as BeginDate,
  end_date         as EndDate,
  booking_fee      as BookingFee,
  total_price      as TotalPrice,
  currency_code    as CurrencyCode,
  status           as Status
}

* 2. CDS Projection View
@AccessControl.authorizationCheck: #CHECK
define root view entity ZC_Travel
  provider contract transactional_query
  as projection on ZI_Travel
{
  key TravelID,
  AgencyID,
  CustomerID,
  BeginDate,
  EndDate,
  BookingFee,
  TotalPrice,
  CurrencyCode,
  Status
}

* 3. Behavior Definition
managed implementation in class zbp_i_travel unique;
strict ( 2 );

define behavior for ZI_Travel alias Travel
persistent table /dmo/travel
lock master
etag master LastChangedAt
{
  create;
  update;
  delete;
  field ( readonly ) TravelID, Status;
  validation validateDates on save { create; field BeginDate, EndDate; }
  action acceptTravel result [1] $self;
  determination calculateTotalPrice on save { create; update; }
}

* 4. Service Definition
define service ZUI_TravelService {
  expose ZC_Travel as Travel;
}

* 5. Service Binding: OData V4 UI
```

## EML (Entity Manipulation Language) Patterns

```abap
* Read
READ ENTITIES OF ZI_Travel
  ENTITY Travel FIELDS ( TravelID BeginDate )
  WITH VALUE #( ( TravelID = '001' ) )
  RESULT DATA(lt_travel)
  FAILED DATA(ls_failed)
  REPORTED DATA(ls_reported).

* Modify
MODIFY ENTITIES OF ZI_Travel
  ENTITY Travel
  UPDATE FIELDS ( Status )
  WITH VALUE #( ( TravelID = '001' Status = 'A' ) )
  FAILED ls_failed
  REPORTED ls_reported.

* Execute Action
MODIFY ENTITIES OF ZI_Travel
  ENTITY Travel EXECUTE acceptTravel
  FROM VALUE #( ( TravelID = '001' ) )
  RESULT DATA(lt_result).
```

## Restricted Syntax Reference

| Allowed (Cloud) | Forbidden (Cloud) | Why |
|-----------------|-------------------|-----|
| `SELECT FROM ZC_Travel` | `SELECT FROM /dmo/travel` | Must use CDS/released view |
| `cl_abap_context_info=>get_user_technical_name( )` | `SY-UNAME` | Context abstraction required |
| Field symbols with structures | `EXEC SQL` | Native SQL not allowed |
| `VALUE #(...)`, inline declarations | `COMPUTE`, obsolete statements | Modern ABAP only |
| Released Function Modules only | Unreleased FMs | API release state check |
| Released classes (`cl_abap_*`) | Internal classes | Upgrade safety |

## ATC Cloud Readiness Workflow

1. **Download remote ATC config** — SAP Note 1935048, fetch check variant ABAP_CLOUD_DEVELOPMENT_DEFAULT
2. **Run ATC** — Select objects, execute with cloud variant (tcode: ATC or ADT)
3. **Categorize findings** — Errors block cloud usage; warnings should be remediated; info is advisory
4. **Remediate by category**:
   - Use released API (preferred)
   - Move to on-stack classic (if cloud not required)
   - Refactor to side-by-side on BTP
5. **Exemption handling** — For known exceptions, add exemption with business justification and reviewer approval

## Released API Discovery Methods

1. **Query I_APIBusinessObject CDS view** — `SELECT * FROM I_APIBusinessObject WHERE ReleaseState = 'RELEASED'`
2. **ADT Properties panel** — Right-click object → Properties → shows API state (released/deprecated/not released)
3. **SAP API Business Hub** — Online search at api.sap.com
4. **ATC Cloud Readiness** — Flags unreleased API usage automatically
5. **Object annotations** — `@ObjectModel.api` annotation visible in CDS source

## Common Pitfalls

- **Using USE_IN_CLOUD_DEVELOPMENT APIs in on-stack code** — Wrong context; check release state matches use case
- **Assuming all I_ views are released** — Many interface views remain internal (`C0` contract); verify state
- **Mixing ABAP Cloud with RAP draft patterns** — Draft requires additional draft table; incompatible with simple scenarios
- **Missing strict(2) in behavior definitions** — Older strict(1) allows more permissive syntax but misses modern checks
- **Missing EML error handling** — Always check FAILED and REPORTED structures for failures
