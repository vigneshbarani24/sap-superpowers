# SAP Superpowers v3.1

**Behavior-shaping AI operating system for SAP consultants — enforced workflows, autonomous execution, enterprise-grade data protection.**

SAP Superpowers forces the right process through Iron Laws, anti-rationalization gates, and verification requirements. Every skill produces a tangible deliverable. Every workflow chains through SAP Activate phases. Autonomous execution pipelines take ideas from concept to tested, activated ABAP. Industry and country context adapts guidance to your specific environment.

**No telemetry. No servers. No API keys. Pure Markdown + shell + MCP bridge.**

---

## Skills (53+)

### Meta Skills (5)
Loaded at session start — always active.

| Skill | Purpose |
|-------|---------|
| `using-sap-superpowers` | Router — which skill, agent, or command to use and when |
| `verification-before-completion` | Enforces evidence-based completion — no done-claiming without proof |
| `writing-sap-skills` | Meta-skill for creating new v3.0-quality skills |
| `sap-doctor` | Plugin, MCP server, and SAP system health diagnostics |
| `team-execution` | Parallel multi-agent orchestration with consensus gates |

### Consulting Skills (9)

| Skill | Purpose |
|-------|---------|
| `project-kickoff` | Project charter, governance, RACI, risk register |
| `brainstorming` | Architecture decision records, structured ideation |
| `estimation` | Three-point WBS estimates — single numbers blocked |
| `fit-gap-analysis` | Fit/gap matrix with scoring and decision rationale |
| `solution-architecture` | Solution architecture document with decision log |
| `value-advisory` | Business case, ROI model, TCO analysis |
| `change-management` | OCM plan, stakeholder map, training matrix |
| `process-design` | To-be process flows with SAP standard alignment |
| `deep-interview` | Structured Socratic requirements gathering — 7 dimensions |

### Development Skills (8)

| Skill | Purpose |
|-------|---------|
| `development-workflow` | Structured path: brainstorm → design → code → test → review |
| `code-review` | Four-dimension review: quality, performance, security, clean core |
| `troubleshooting` | Systematic root cause analysis — diagnosis before fixes |
| `code-generation` | ABAP, CDS, RAP, BTP scaffolding with clean core compliance |
| `performance-tuning` | Runtime analysis, SQL optimization, memory profiling |
| `autopilot` | Full idea-to-tested-activated ABAP pipeline — autonomous execution |
| `self-correcting-loop` | Iterative fix → verify → fix until all quality gates pass |
| `program-to-spec` | Reverse-engineer existing ABAP into functional + technical specs |

### Delivery Skills (6)

| Skill | Purpose |
|-------|---------|
| `testing-strategy` | Test plan, SIT/UAT design, defect classification |
| `data-migration` | Migration plan, object mapping, reconciliation strategy |
| `cutover-planning` | Cutover runbook with sequenced steps and rollback |
| `go-live-readiness` | Go/No-Go decision matrix with parallel gate verification |
| `hypercare` | Post-go-live support structure, SLA, escalation path |
| `transport-release` | CTS workflow with pre-release checks and import verification |

### Module Reference Skills (20)
Deep SAP module expertise with content routing for token efficiency.

`abap-cloud` · `btp` · `integration-suite` · `system-admin` · `security-grc` · `FI` · `CO` · `MM` · `SD` · `PP` · `PM` · `SF` · `analytics` · `EWM` · `TM` · `Ariba` · `Fieldglass` · `Concur` · `QM` · `Joule`

### Strategic Skills (5)

`s4hana-migration` · `activate-methodology` · `rise-licensing` · `clean-core-strategy` · `joule-strategy`

---

## Agents (25)

### Core Agents (10)
| Agent | Role |
|-------|------|
| `sap-reviewer` | Code review — quality, patterns, SAP standards |
| `sap-estimator` | WBS decomposition, three-point estimates |
| `sap-migration-analyzer` | Custom code compatibility, simplification items |
| `sap-test-designer` | SIT/UAT scripts, coverage analysis |
| `sap-value-calculator` | ROI/TCO modeling, business case quantification |
| `sap-security-auditor` | Auth objects, SoD, security patterns |
| `sap-architect` | Solution architecture, design decisions |
| `sap-data-analyst` | Data volume, quality, mapping, reconciliation |
| `sap-doc-generator` | FS, TDS, user guides, training material |
| `sap-process-modeler` | To-be flows, swimlanes, gap identification |

### Module Consultant Agents (15)
Dispatched for deep module-specific expertise.

`sap-sd-consultant` · `sap-mm-consultant` · `sap-fi-consultant` · `sap-co-consultant` · `sap-pp-consultant` · `sap-ps-consultant` · `sap-pm-consultant` · `sap-qm-consultant` · `sap-hcm-consultant` · `sap-wm-consultant` · `sap-tm-consultant` · `sap-tr-consultant` · `sap-bw-consultant` · `sap-ariba-consultant` · `sap-bc-consultant`

---

## Commands (6)

| Command | Produces |
|---------|----------|
| `/sap-debug` | Root cause analysis document |
| `/sap-estimate` | Effort estimate with WBS |
| `/sap-kickoff` | Project charter |
| `/sap-review` | Code review report |
| `/sap-doc` | Functional/technical spec, user guide, or training material |
| `/sap-migrate` | Migration assessment |

---

## Autonomous Execution

### Autopilot Pipeline
Idea → Requirements → Design → Generate → Test → ATC → Activate → Transport
Uses self-correcting loop for iterative fixes. Full completion record produced.

### Self-Correcting Loop
Fix → Syntax Check → ATC → Unit Tests → Activation → repeat until all pass.
Max 10 iterations. Escalates to user if architectural issue detected.

### Team Execution
Parallel multi-agent dispatch with task boundaries, dependency management, conflict resolution, and merged deliverables.

---

## Enforcement Hooks

| Hook | Type | Purpose |
|------|------|---------|
| `pre-tool-enforcer.mjs` | PreToolUse | Block sensitive table access, enforce data protection |
| `transport-validator.mjs` | PreToolUse | Require transport number, block production modifications |
| `post-tool-verifier.mjs` | PostToolUse | Check syntax errors, ATC findings, activation failures |
| `prompt-router.mjs` | UserPromptSubmit | Auto-detect SAP keywords, inject skill context |
| `pre-compact-saver.mjs` | PreCompact | Preserve transport numbers, object names, config across compaction |

---

## Data Protection

8 blocklist categories in `exceptions/`:
`hr-payroll` · `banking-payment` · `master-data-pii` · `auth-security` · `tax-government-ids` · `pricing-conditions` · `audit-security-logs` · `protected-business-data`

**Hard block:** MCP call rejected (payroll, credentials, national IDs)
**Soft block:** Warning displayed (business documents, master data)
**Override:** Explicit user approval required — logged per session

---

## Coding Standards (12 files in `common/`)

`naming-conventions` · `clean-code` · `include-structure` · `oop-pattern` · `alv-rules` · `constant-rules` · `text-element-rules` · `abap-release-reference` · `sap-version-reference` · `data-extraction-policy` · `error-handling-pattern` · `testing-standards` · `dynpro-pattern`

---

## Industry Context (14 files in `industry/`)

`retail` · `automotive` · `pharmaceutical` · `food-beverage` · `chemical` · `electronics` · `construction` · `utilities` · `banking` · `public-sector` · `fashion` · `steel` · `cosmetics` · `tire`

Each file documents: business characteristics, key SAP modules, master data specifics, key processes, common customizations, industry solutions, compliance requirements.

---

## Country Localization (16 files in `country/`)

`united-states` · `germany` · `united-kingdom` · `india` · `japan` · `south-korea` · `france` · `italy` · `spain` · `netherlands` · `brazil` · `mexico` · `australia` · `singapore` · `china` · `eu-wide`

Each file documents: tax system, e-invoicing, banking/payments, date/currency formats, regulatory requirements, key SAP transactions.

---

## SPRO Configuration References (15 files in `configs/`)

Module-specific customizing guides: `sd` · `mm` · `fi` · `co` · `pp` · `ps` · `pm` · `qm` · `hcm` · `wm` · `tm` · `tr` · `bw` · `ariba` · `common`

---

## MCP Integration

SAP Superpowers connects to SAP systems via MCP ABAP ADT server:
- **Bridge:** `bridge/mcp-server.cjs` — launcher with preflight checks
- **Config:** `.sap-superpowers/config.json` — SAP version, release, industry, country
- **Connection:** `.sap-superpowers/sap.env` — SAP ADT credentials (never committed)
- **Setup:** `scripts/setup-init.mjs` — interactive setup wizard

---

## Workflow Chains (SAP Activate Aligned)

```
DISCOVER  → project-kickoff → brainstorming → deep-interview
PREPARE   → estimation → solution-architecture → change-management
EXPLORE   → fit-gap-analysis → process-design → [module skills]
REALIZE   → autopilot → code-review → testing-strategy
DEPLOY    → data-migration → cutover-planning → go-live-readiness
RUN       → hypercare → value-advisory
```

---

## Knowledge Layer

```
knowledge/
├── indexes/         SAP Notes, transaction codes, released APIs, Fiori apps
├── best-practices/  Module-specific proven patterns
└── patterns/        Reusable solution patterns (IDoc, BAPI, RAP, CDS)
```

---

## No Telemetry

SAP Superpowers collects no data. No usage tracking, no analytics, no phone-home.

---

## Author & License

**Author:** vigneshbarani24 | **Company:** KaarTech UK | **License:** MIT | **Version:** 3.1
