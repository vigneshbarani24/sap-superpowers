---
name: sap-doc
description: Trigger structured SAP document generation — invoked when a functional spec, technical spec, user guide, or training material needs to be produced from requirements, code, or process descriptions.
---

# /sap-doc

Invokes the `sap-doc-generator` agent to produce structured, client-ready SAP documentation. Supports four document types, each following a standard SAP methodology template. The agent reads your input (requirements, code, process notes) and generates a fully formatted document.

## Usage

```
/sap-doc [document type]
```

**Document Types:**
- `functional-spec` — Functional specification (FS) from business requirements or fit-gap notes
- `technical-spec` — Technical design document (TDS) from functional spec or code
- `user-guide` — End-user guide from transaction walkthrough or process description
- `training-material` — Training module with exercises from process or system walkthrough

**Examples:**
- `/sap-doc functional-spec` — then describe the requirement or paste fit-gap notes
- `/sap-doc technical-spec` — then provide the FS or point to the code file
- `/sap-doc user-guide for VF01 billing document creation process`
- `/sap-doc training-material for MM goods receipt workflow`

## What Happens

1. The `sap-doc-generator` agent is dispatched with the selected document type.
2. The agent reads the provided input — requirements, code, process description, or existing documents.
3. For `functional-spec`: captures business process, requirements, business rules, exception handling, and acceptance criteria.
4. For `technical-spec`: maps functional requirements to technical design — objects, programs, interfaces, data model changes.
5. For `user-guide`: structures step-by-step instructions with transaction paths, field-level guidance, and screenshots placeholders.
6. For `training-material`: builds a module with learning objectives, process overview, exercises, and knowledge check questions.
7. The document is written to the working directory in standard SAP formatting.

## Output

A formatted document file matching the selected type:

| Type | Format | Key Sections |
|------|--------|-------------|
| functional-spec | Markdown | Business context, requirements, process flow, rules, acceptance criteria |
| technical-spec | Markdown | Architecture, objects, program design, interfaces, error handling, testing |
| user-guide | Markdown | Role overview, step-by-step instructions, field explanations, tips |
| training-material | Markdown | Objectives, process overview, guided exercises, knowledge check |

## Example

```
/sap-doc technical-spec

> Provide your input: [paste functional spec for ZVENDOR_AGING custom report]

> Activating sap-doc-generator agent...
> Document type: technical-spec
> Reading functional spec — extracting requirements...
> Mapping to technical design: 1 custom report, 2 function modules, ALV output
> Generating technical design document...
> Output: ZVENDOR_AGING_TDS.md written to working directory
```
