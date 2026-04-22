---
name: code-generation
description: Use when generating ABAP, CDS, RAP, Fiori Elements, or BTP CAP code for SAP systems. Enforces cloud-ready, clean-core-compliant, testable code generation — not quick-and-dirty prototypes.
---

# SAP Code Generation

This skill enforces clean, cloud-ready, fully tested SAP code generation. It makes generating non-compliant, untested, or undocumented code structurally impossible.

## Iron Laws

1. **ALWAYS USE ABAP CLOUD RESTRICTED SYNTAX FOR CLOUD DEPLOYMENTS.** Code targeting ABAP Cloud (BTP ABAP Environment, S/4HANA Public Cloud, or any tier marked Cloud-ready) must use only the ABAP Cloud restricted language subset. No classic ABAP statements incompatible with the cloud runtime. Verify via ATC with ABAP Cloud check variant before delivery.
2. **NEVER ACCESS DATABASE TABLES DIRECTLY — USE RELEASED APIS.** Custom code must never SELECT directly from SAP-delivered application tables (BKPF, BSEG, VBAK, EKKO, MARA, and equivalent). Access data through released CDS entities, released function modules, or released OData/RAP APIs. Direct table access creates upgrade risk and clean core violations.
3. **ALWAYS INCLUDE ERROR HANDLING.** Every CALL METHOD, CALL FUNCTION, database operation, and external call must have explicit error handling — checked exceptions, SY-SUBRC evaluation, or TRY/CATCH blocks. Silent failures are defects delivered as features.
4. **ALWAYS GENERATE UNIT TESTS.** Every class and every method generated must have a corresponding ABAP Unit test class (LOCAL FRIENDS if needed for private method access). Untested code is unverified code — it may work or it may not, and you cannot tell which.
5. **FOLLOW Z/Y NAMING CONVENTIONS.** All generated objects use Z or Y prefix (or registered customer namespace). Generated classes: ZCL_, interfaces: ZIF_, CDS views: Z_, RAP business objects: ZI_ (interface) / ZC_ (consumption) / ZA_ (abstract) / ZR_ (restricted). No SAP namespace pollution.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| SELECT directly from BSEG or VBAK | "It's the most direct way to get the data" | Direct access bypasses the virtual data model, breaks on HANA column store optimizations, and creates a hard dependency on physical table structure that changes across releases. | Iron Law 2. Identify the released CDS entity or API. For FI data: I_JournalEntryItem. For SD: I_SalesOrder. Use transaction TAANA or SAP API Business Hub to find the correct released API. |
| Skip unit tests because "the logic is simple" | "It's just a getter method, testing is overkill" | Simple methods break in edge cases that were never considered: null inputs, empty collections, authorization failures, character encoding edge cases. "Simple" code without tests is untested code. | Iron Law 4. Generate the test class. Simple methods have simple tests — this takes five minutes. No method is generated without a test. |
| Use classic ABAP for "backward compatibility" | "This might run on older systems, classic is safer" | If the target system is ABAP Cloud, classic syntax will fail ATC Cloud checks. If the target is on-premise, confirm this explicitly — then apply the correct standard for that target, not a hybrid. | Iron Law 1. Establish target platform first. Generate for that platform's standard. Never generate ambiguous cross-platform code. |
| Skip error handling because "this call always succeeds" | "This FM never returns errors in practice" | Function modules return errors when network is slow, authorization is missing, data is unexpected, or the FM itself is changed. "Always succeeds" is an observation from testing, not a guarantee. | Iron Law 3. Every call has error handling. Even if the error path is `RAISE EXCEPTION TYPE cx_sy_no_handler` — the decision to not handle is explicit, not an omission. |
| Use non-standard naming for clarity | "ZCL_INVOICE is cleaner than ZCL_FINANCE_INVOICE_PROCESSOR" | Non-standard naming pollutes search, makes transport analysis harder, and breaks naming-based ATC rules. Team conventions exist for everyone, not just the current developer. | Iron Law 5. Follow the project naming convention. If no project convention exists, use the SAP standard recommendation. Name for the next developer, not for convenience now. |
| Generate code without documenting the data model | "The code is self-explanatory" | Generated code without documented data model assumptions breaks when the model changes. Future developers cannot distinguish intentional design from accidental coupling. | Checklist Step 1: Document data model and API dependencies before generating implementation code. The documentation is part of the deliverable. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals non-compliant code is about to be generated:

- "I'll just SELECT from the table directly..." → Iron Law 2. Find the released CDS entity or API. If one does not exist, escalate — do not create a clean core violation.
- "Tests can be added later..." → Iron Law 4. Later means never. Tests are generated with the code, in the same step, in the same transport.
- "Classic ABAP is fine here..." → Confirm the target platform. If ABAP Cloud, it is not fine. If on-premise, document the decision.
- "This is just a prototype, error handling can be skipped..." → Iron Law 3. Prototypes become production code. Generate it right the first time.
- "The naming convention makes the class name too long..." → Iron Law 5. SAP allows 30-character class names. Use them. Abbreviate thoughtfully and consistently.
- "We don't need an interface, just the class..." → Clean OO design uses interfaces. Generate the interface first. The class implements it. This costs 10 minutes and saves weeks of refactoring.
- "I'll hardcode the value for now..." → No hardcoded values. Constants class or customizing table. Always.

<HARD-GATE>
Before generating any implementation code: confirm (1) the target platform is established (ABAP Cloud / S/4HANA on-premise / BTP CAP) and the appropriate language standard and API set is selected, (2) the required released CDS entities or APIs are identified for all data access, (3) the class/object structure and naming are agreed, and (4) the unit test structure is planned. If any of these four conditions is not confirmed, do not generate implementation code — complete the design step first.
</HARD-GATE>

## Generation Process

### Step 1 — Establish Platform and Standards

Confirm the target deployment platform before writing a single line:

- **ABAP Cloud (BTP ABAP Environment / S/4HANA Public Cloud):** Restricted ABAP syntax, released APIs only, RAP for transactional services, CDS for data exposure, ABAP Unit mandatory, ATC Cloud check variant.
- **S/4HANA On-Premise / Private Cloud:** Full ABAP syntax available but clean core compliance strongly recommended. Released APIs preferred. Classic enhancements acceptable where RAP/CDS equivalents do not exist.
- **BTP CAP (Cloud Application Programming Model):** Node.js or Java CAP service, CDS data model, OData V4 exposure, Jest or JUnit tests, SAP BTP service bindings.
- **Fiori Elements:** OData V4 + RAP back-end, Fiori Elements floor plan selection (List Report, Object Page, Worklist, Analytical List Page), no custom frontend JavaScript unless unavoidable.

Evidence: Platform confirmation documented. Language standard and API restriction level recorded.
Gate: Platform confirmed. Correct standard applied. No cross-platform ambiguity.

### Step 2 — Design Data Model and API Dependencies

Before generating code, document:

- Entities being read or modified (with released CDS name or API name — not physical table name)
- Key fields and relationships
- Authorization objects required for data access
- External dependencies (RFC destinations, OData services, message channels)

For RAP: define the business object structure (root entity, child entities, associations), key determination strategy, and draft handling requirement.
For CDS: define view hierarchy (basic interface view → composite interface view → consumption view) and required annotations.
For CAP: define the CDS data model (`.cds` schema) and service definition before generating handlers.

Evidence: Data model diagram or written entity/relationship description. Released API list with SAP transaction TAANA or API Business Hub reference.
Gate: No physical table names in the design (released CDS entities or API names only). All authorization objects identified.

### Step 3 — Generate Structure Before Logic

Generate the structural skeleton before any business logic:

- **ABAP OO:** Interface first (ZIF_), then class declaration (ZCL_) implementing the interface, then empty method implementations with correct signatures.
- **RAP:** Behavior definition (BDEF) and behavior implementation class (ZBEH_) before projection layer.
- **CDS:** Basic interface view first, then composite/TP view, then consumption view with annotations.
- **CAP:** Service definition (`.cds`) and entity definitions before event handler implementations.

Evidence: Skeleton generated and compiles without syntax errors. All method signatures match the interface. No business logic yet — structure only.
Gate: Structure compiles clean. Naming follows Iron Law 5. No implementation logic until structure is approved.

### Step 4 — Generate Unit Tests in Parallel with Logic

For every method containing business logic, generate the test class in the same step:

- Test class structure: `CLASS zcl_[name]_test DEFINITION FOR TESTING RISK LEVEL HARMLESS DURATION SHORT.`
- Cover: happy path, empty input, boundary conditions, error conditions (authorization failure, not-found, invalid data).
- Use test doubles for dependencies: `CL_ABAP_TESTDOUBLE` for class mocking, `CDS_TEST_ENVIRONMENT` for CDS unit tests, `IF_OSQL_TEST_ENVIRONMENT` for ABAP SQL test doubles.
- For RAP: use `CL_BOTD_MOCKEMLAPI_BO_TEST_ENV` for behavior unit tests.

Evidence: Test class generated alongside implementation class. All methods have at least happy path and one error path test. Tests execute and pass.
Gate: Tests execute without syntax errors. Tests pass for the generated logic. Test coverage includes at minimum the public interface methods.

### Step 5 — Generate Implementation Logic

Implement business logic following these non-negotiable patterns:

- **Error handling:** Every external call uses TRY/CATCH or checks SY-SUBRC immediately. No call without handling.
- **Database access:** Released CDS entities via ABAP SQL only (`SELECT FROM zcds_entity`). No SELECT from physical tables.
- **Internal tables:** SORTED TABLE with unique/non-unique key for sorted access, HASHED TABLE for keyed lookup, STANDARD TABLE only for sequential processing. Declare at point of use.
- **String handling:** String templates `` `|{ lv_field }|` `` preferred over CONCATENATE for modern ABAP. CONCATENATE only for downward compatibility targets.
- **Constants:** All literal values that could change are in a constants interface (ZIF_[DOMAIN]_CONSTANTS) or customizing table. No magic numbers or strings in logic.
- **Commit control:** COMMIT WORK only in the outermost caller (application program or RAP save sequence). Never inside methods, function modules, or class constructors.

Evidence: Implementation compiles and passes all unit tests. ATC run with no P1/P2 findings.
Gate: Unit tests pass. ATC P1/P2 clean. No hardcoded values. Error handling present on every external call.

### Step 6 — Generate Documentation

Every generated object requires inline documentation:

- Class header: purpose, author, creation date, key dependencies.
- Method header: purpose, parameters description, raised exceptions, usage example if non-obvious.
- Complex logic blocks: "why" comment, not "what" (the code states what, the comment explains why the design decision was made).

Evidence: All public methods have documentation headers. Complex blocks have explanatory comments.
Gate: No public method without documentation header. Documentation is meaningful — not auto-generated boilerplate restating the parameter names.

## Generated Code Deliverable Template

```
GENERATED CODE RECORD
=====================
Request ID: [Task/ticket number]
Platform: [ABAP Cloud / S/4HANA On-Premise / BTP CAP / Fiori Elements]
Generated by: [Developer name]
Date: [Date]
ATC Variant: [Cloud / Standard / Custom - used for check]

OBJECTS GENERATED
-----------------
[Object type] | [Object name] | [Description]
[e.g., Class | ZCL_INVOICE_PROCESSOR | Core invoice processing logic]
[e.g., Interface | ZIF_INVOICE_PROCESSOR | Public interface for invoice processor]
[e.g., Test Class | ZCL_INVOICE_PROCESSOR_TEST | Unit tests for invoice processor]
[e.g., CDS View | ZI_INVOICE_HEADER | Interface view on I_JournalEntryItem]

DATA DEPENDENCIES
-----------------
Released API / CDS Entity: [Name] → [Purpose]
Authorization object: [Object] → [Activity / Field values required]
RFC destination: [Destination name] → [Purpose] (if applicable)

ATC RESULTS
-----------
ATC run date: [Date]
Check variant: [Variant name]
P1 findings: [Count — must be 0]
P2 findings: [Count — must be 0]
P3 findings: [Count + disposition]

UNIT TEST RESULTS
-----------------
Test class: [Name]
Methods tested: [List]
Pass: [Count] / Fail: [Count]
Coverage: [%] (target: all public methods)

TRANSPORT
---------
Transport number: [DEVK9XXXXX]
Objects included: [List]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Target platform confirmed and appropriate language standard applied
- [ ] All data access uses released CDS entities or APIs — no direct physical table access
- [ ] Class/interface structure follows naming conventions (ZCL_, ZIF_, ZI_, ZC_)
- [ ] All external calls have explicit error handling — no unhandled calls
- [ ] Unit test class generated with tests for all public methods
- [ ] Unit tests pass — zero failures
- [ ] ATC run completed with zero P1 and P2 findings
- [ ] No hardcoded values — constants class or customizing for all literals
- [ ] Documentation headers generated for all public methods and classes
- [ ] Generated code record completed with all objects, dependencies, and test results

**Evidence required:** ATC results export showing P1/P2 clean, unit test run results showing all passing, generated code record, transport number.

## Next Skill

After completing this skill, invoke: `code-review`
Conditions for handoff: After all generated code compiles, passes unit tests, and is ATC-clean, submit the transport for code-review. Attach the generated code record as context — the reviewer needs the platform, API dependencies, and ATC results to conduct an efficient review.

## Cross-References

- Use `code-review` to review all generated code before transport release
- Use `troubleshooting` if generated code produces runtime errors during testing
- Use `performance-tuning` if generated code shows performance issues under test data volume
- Use `development-workflow` for transport creation and management
