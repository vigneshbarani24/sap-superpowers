---
name: program-to-spec
description: Use when reverse-engineering an existing ABAP program into a functional or technical specification. Reads code and produces structured documentation — not a code dump, a proper spec document that a consultant can hand to a client.
---

# Program-to-Spec — Reverse Engineering

This skill reads existing ABAP code and produces a structured specification document — either a Functional Specification (what it does from a business perspective) or a Technical Specification (how it works from a developer perspective). The output is client-ready, not a code comment dump.

## Iron Laws

1. **NEVER PRODUCE A CODE WALKTHROUGH DISGUISED AS A SPEC.** A spec explains business logic, data flows, and decisions — not line-by-line code commentary. If your output reads like "Line 42 calls BAPI_SALESORDER_CREATEFROMDAT2", you are producing a walkthrough, not a spec.

2. **ALWAYS IDENTIFY THE BUSINESS PROCESS.** Every program exists to support a business process. Identify it. Name it. Map the program's logic to process steps. If you cannot identify the business process, state the gap — do not invent one.

3. **ALWAYS DOCUMENT ASSUMPTIONS AND GAPS.** Reverse-engineered specs have blind spots — hardcoded values without explanation, dead code paths, unclear business rules. Document these explicitly as "Assumptions" and "Gaps for Clarification."

4. **ALWAYS PRODUCE BOTH VIEWS.** Generate both the functional spec (for business stakeholders) and the technical spec (for developers). They serve different audiences and neither is complete alone.

5. **NEVER FABRICATE BUSINESS JUSTIFICATIONS.** If the code does something without clear business reason, say "Business justification unclear — clarify with process owner." Do not invent justifications.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Describe code instead of business logic | "The code IS the specification" | Code is implementation, not specification. Specs describe WHAT and WHY. Code describes HOW. | Iron Law 1. Translate code into business terms. |
| Skip dead code analysis | "Dead code doesn't matter" | Dead code in SAP is often conditionally active (different plants, company codes, or periods). Document it. | Analyze all code paths. Flag potentially dead code as "Conditional — verify activation criteria." |
| Invent business reasons for hardcoded values | "This must be for tax calculation" | Guessing business logic from hardcoded values is how wrong specs get written. | Iron Law 5. Document as: "Hardcoded value [X] — business justification needed." |
| Produce one combined document | "One document is simpler" | Business users won't read technical details. Developers don't need business context. | Iron Law 4. Two separate docs. |

<HARD-GATE>
Before producing the specification:
1. The source code must be fully read (all includes, function modules, classes)
2. The program type must be identified (report, module pool, function group, class, interface, CDS view)
3. All external dependencies must be cataloged (BAPIs, FMs, RFC destinations, CDS views)
If the code cannot be fully read (missing includes, broken references), document the gaps explicitly.
</HARD-GATE>

## Analysis Process

### Step 1 — Code Inventory
Read the complete program and produce an inventory:
- Program type and technical name
- All includes with purposes
- All classes/methods with signatures
- All function module calls
- All database access (tables/views/CDS entities)
- All external interfaces (RFC, HTTP, file I/O)
- All screen elements (Dynpros, ALV, selection screen)
- All text elements and message classes

### Step 2 — Business Process Mapping
Map the code logic to business process steps:
- Identify the trigger (user action, batch job, event)
- Trace the main execution path
- Identify branching logic and its business meaning
- Map database operations to business entities
- Identify output (reports, documents, updates, messages)

### Step 3 — Data Flow Analysis
Document how data moves through the program:
- Input sources (selection screen, file, API, database)
- Transformations (calculations, validations, enrichments)
- Output destinations (database updates, files, APIs, UI)
- Error handling paths

### Step 4 — Produce Functional Specification

```markdown
# Functional Specification: [Program Name]

## Overview
**Program:** [Technical name]
**Business Process:** [Process name]
**Module:** [SAP module]
**Purpose:** [1-2 sentence business description]

## Business Context
[Why this program exists, what business need it serves]

## Scope
### In Scope
- [Business function 1]
- [Business function 2]

### Out of Scope
- [Explicitly excluded functions]

## Process Flow
1. [Business step 1] — [What happens]
2. [Business step 2] — [What happens]
3. ...

## Business Rules
| Rule | Description | Implementation |
|------|-------------|----------------|
| BR-01 | [Rule description] | [How it's enforced] |

## Input/Output
### Inputs
| Input | Source | Format | Validation |
|-------|--------|--------|------------|

### Outputs
| Output | Destination | Format | Trigger |
|--------|------------|--------|---------|

## Authorization
| Auth Object | Field | Values | Business Role |
|-------------|-------|--------|--------------|

## Assumptions & Gaps
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | [Item] | Assumption/Gap | Needs clarification |
```

### Step 5 — Produce Technical Specification

```markdown
# Technical Specification: [Program Name]

## Technical Overview
**Program:** [Name] | **Type:** [Report/Module Pool/Class]
**Package:** [Package] | **Transport:** [If known]
**ABAP Release:** [Minimum required]

## Architecture
[Class diagram or structure overview]

## Object Inventory
| Object | Type | Purpose |
|--------|------|---------|
| [Name] | Class/FM/Include | [Purpose] |

## Data Model
### Tables/Views Accessed
| Table/CDS | Access Type | Purpose |
|-----------|------------|---------|

### Internal Data Structures
| Structure | Fields | Purpose |
|-----------|--------|---------|

## Method/Function Documentation
### [Method Name]
- **Purpose:** [What it does]
- **Parameters:** [In/Out/Changing/Returning]
- **Exceptions:** [What can go wrong]
- **Dependencies:** [What it calls]

## External Interfaces
| Interface | Type | Direction | System |
|-----------|------|-----------|--------|

## Error Handling
| Error | Handler | User Message | Recovery |
|-------|---------|-------------|----------|

## Performance Considerations
- [Known performance patterns — indexed access, buffering, parallel processing]

## Technical Gaps
| # | Item | Impact | Recommendation |
|---|------|--------|---------------|
```

## Verification

- [ ] Complete code inventory produced (all includes, classes, FMs cataloged)
- [ ] Business process identified and mapped
- [ ] Functional specification produced in structured format
- [ ] Technical specification produced in structured format
- [ ] All assumptions explicitly documented
- [ ] All gaps flagged for clarification
- [ ] No fabricated business justifications
- [ ] Both specs are independently readable by their target audience

## Next Skill

After completing this skill, invoke: `code-review` (if the reverse-engineered code needs quality assessment)
Or: `s4hana-migration` (if the spec is being produced for migration analysis)

## Cross-References

- `code-review` — Review the code quality during reverse engineering
- `s4hana-migration` — Use spec output for migration compatibility analysis
- `solution-architecture` — Use spec output for architecture documentation
