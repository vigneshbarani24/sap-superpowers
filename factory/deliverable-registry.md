# Delivery Factory — Deliverable Registry

## Purpose

The deliverable registry is the single source of truth for what artifacts the factory produces, which skill creates each one, and what constitutes completeness.

## Full Registry

### DISCOVER Phase (5 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| D1 | Project Charter | `project-kickoff` | — | Markdown | Scope, timeline, governance, RACI defined |
| D2 | Stakeholder Map & RACI | `project-kickoff` | — | Markdown table | All roles identified, RACI complete |
| D3 | Requirements Document | `deep-interview` | — | Markdown (7 dimensions) | All 7 dimensions covered, no open questions |
| D4 | Risk Register | `project-kickoff` | — | Markdown table | Risks identified, mitigation planned, owners assigned |
| D5 | High-Level Scope | `brainstorming` | `sap-architect` | Markdown + ADR | Modules in scope, boundaries defined, ADRs documented |

### PREPARE Phase (5 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| P1 | Effort Estimate | `estimation` | `sap-estimator` | Markdown (WBS table) | Three-point estimates, no single-number, risk buffer |
| P2 | Solution Architecture | `solution-architecture` | `sap-architect` | Markdown + diagrams | Landscape, integration, extensions, data architecture |
| P3 | Change Management Plan | `change-management` | — | Markdown | Stakeholder analysis, training plan, comms plan |
| P4 | Business Case / ROI | `value-advisory` | `sap-value-calculator` | Markdown (financial tables) | TCO, benefits, NPV/IRR, sensitivity analysis |
| P5 | Project Plan | `estimation` | — | Markdown (timeline table) | Phases mapped, milestones defined, dependencies |

### EXPLORE Phase (6 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| E1 | Fit/Gap Analysis | `fit-gap-analysis` | Module consultants | Markdown (matrix) | All requirements classified, resolutions for gaps |
| E2 | Process Designs | `process-design` | `sap-process-modeler` | Markdown per module | As-is/to-be, gap analysis, KPIs |
| E3 | Functional Specs | `deep-interview` + modules | `sap-doc-generator` | Markdown per object | Business rules, data flow, UI specs |
| E4 | Data Migration Strategy | `data-migration` | `sap-data-analyst` | Markdown | Objects, volumes, quality rules, timeline |
| E5 | Test Strategy | `testing-strategy` | `sap-test-designer` | Markdown | Test levels, approach, tools, environments |
| E6 | Integration Architecture | `solution-architecture` | `sap-architect` | Markdown + diagrams | Interface list, protocols, error handling |

### REALIZE Phase (6 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| R1 | Technical Specifications | `program-to-spec` / `code-generation` | `sap-doc-generator` | Markdown per object | Data model, methods, APIs, error handling |
| R2 | Developed Objects | `autopilot` | Team (parallel) | ABAP/CDS/RAP code | Compiled, ATC clean, in transport |
| R3 | Unit Test Results | `self-correcting-loop` | `sap-test-designer` | Test execution log | All tests pass |
| R4 | Code Review Reports | `code-review` | `sap-reviewer`, `sap-security-auditor` | Markdown | Zero critical findings |
| R5 | SIT Test Results | `testing-strategy` | `sap-test-designer` | Test execution log | All SIT scenarios pass |
| R6 | Training Materials | Module skills | `sap-doc-generator` | Markdown / slides | Role-based, process-aligned |

### DEPLOY Phase (5 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| Y1 | Data Migration Results | `data-migration` | `sap-data-analyst` | Reconciliation report | Load complete, reconciliation passed |
| Y2 | Cutover Runbook | `cutover-planning` | — | Markdown (sequenced steps) | All tasks sequenced, owners assigned, rollback defined |
| Y3 | Go-Live Readiness | `go-live-readiness` | Team (parallel) | Decision matrix | All 6 dimensions GREEN |
| Y4 | UAT Results & Sign-Off | `testing-strategy` | `sap-test-designer` | Sign-off document | All UAT scenarios pass, business sign-off |
| Y5 | Transport Release Log | `transport-release` | — | Transport log | All objects active, imported through QAS → PRD |

### RUN Phase (5 Deliverables)

| ID | Deliverable | Producing Skill | Agent | Output Format | Verification |
|----|-------------|----------------|-------|---------------|-------------|
| N1 | Hypercare Plan | `hypercare` | — | Markdown | SLA defined, escalation path, monitoring checklist |
| N2 | Daily Status Reports | `hypercare` | — | Markdown (template) | Issues tracked, SLA metrics reported |
| N3 | Value Realization Report | `value-advisory` | `sap-value-calculator` | Markdown | Planned vs. actual benefits compared |
| N4 | Lessons Learned | `hypercare` | — | Markdown | Categorized findings, recommendations |
| N5 | Knowledge Transfer Log | `hypercare` | `sap-doc-generator` | Sign-off document | All topics covered, client team certified |

## Totals

| Phase | Deliverables | Skills Used | Agents Used |
|-------|-------------|-------------|-------------|
| DISCOVER | 5 | 3 | 1 |
| PREPARE | 5 | 4 | 3 |
| EXPLORE | 6 | 5 | 5 |
| REALIZE | 6 | 5 | 4 |
| DEPLOY | 5 | 4 | 2 |
| RUN | 5 | 2 | 2 |
| **TOTAL** | **32** | **14 unique** | **8 unique** |

A full SAP implementation project produces **32 deliverables** managed by the factory.
