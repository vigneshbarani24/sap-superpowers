# SAP Superpowers v3.0

**Behavior-shaping AI for SAP consultants — not a knowledge base, an operating system.**

SAP Superpowers forces the right process through Iron Laws, anti-rationalization gates, and verification requirements. Every skill produces a tangible deliverable. Every workflow chains through SAP Activate phases. Skills get smarter through a RAG-ready knowledge layer that grows with the community.

**No telemetry. No servers. No API keys. Pure Markdown + shell.**

---

## Skills (46+)

### Meta Skills (3)
Loaded at session start — always active.

| Skill | Purpose |
|-------|---------|
| `using-sap-superpowers` | Router — which skill, agent, or command to use and when |
| `verification-before-completion` | Enforces evidence-based completion — no done-claiming without proof |
| `writing-sap-skills` | Meta-skill for creating new v3.0-quality skills |

### Consulting Skills (8)
Cover the full SAP consulting lifecycle from engagement start to value delivery.

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

### Development Skills (5)
Cover the full ABAP/BTP development lifecycle.

| Skill | Purpose |
|-------|---------|
| `development-workflow` | Structured path: brainstorm → design → code → test → review |
| `code-review` | Four-dimension review: quality, performance, security, clean core |
| `troubleshooting` | Systematic root cause analysis — diagnosis before fixes |
| `code-generation` | ABAP, CDS, RAP, BTP scaffolding with clean core compliance |
| `performance-tuning` | Runtime analysis, SQL optimization, memory profiling |

### Delivery Skills (5)
Cover project delivery from test strategy through hypercare.

| Skill | Purpose |
|-------|---------|
| `testing-strategy` | Test plan, SIT/UAT design, defect classification |
| `data-migration` | Migration plan, object mapping, reconciliation strategy |
| `cutover-planning` | Cutover runbook with sequenced steps and rollback |
| `go-live-readiness` | Go/No-Go decision matrix with parallel gate verification |
| `hypercare` | Post-go-live support structure, SLA, escalation path |

### Module Reference Skills (20)
Deep SAP module expertise. Each skill uses content routing for token efficiency — load only the section you need.

| Skill | Coverage |
|-------|---------|
| `abap-cloud` | ABAP RESTful Application Programming Model, clean core, released APIs |
| `btp` | SAP BTP services, CF runtimes, Kyma, CAP framework |
| `integration-suite` | Cloud Integration, API Management, Event Mesh, Trading Partner Management |
| `system-admin` | Basis administration, transport management, system landscape |
| `security-grc` | Authorization concepts, role design, SoD, audit compliance |
| `FI` | Financial Accounting — GL, AP, AR, asset accounting, closing |
| `CO` | Controlling — cost centers, profit centers, internal orders, CO-PA |
| `MM` | Materials Management — procurement, inventory, valuation, MRP |
| `SD` | Sales & Distribution — order management, pricing, billing, credit |
| `PP` | Production Planning — MRP, production orders, shop floor, capacity |
| `PM` | Plant Maintenance — equipment, functional locations, work orders |
| `SF` | SuccessFactors — EC, Recruiting, LMS, Compensation, integration |
| `analytics` | SAC, BW/4HANA, Embedded Analytics, data modeling |
| `EWM` | Extended Warehouse Management — storage types, warehouse orders, RF |
| `TM` | Transportation Management — freight orders, carrier selection, settlement |
| `Ariba` | Ariba procurement — sourcing, contracts, buying, supplier management |
| `Fieldglass` | External workforce management — SOW, temp labor, compliance |
| `Concur` | Travel & expense — expense reports, travel requests, approvals |
| `QM` | Quality Management — inspection plans, usage decisions, defect recording |
| `Joule` | SAP Joule AI copilot — capabilities, extensibility, embedded scenarios |

### Strategic Skills (5)
Methodology and platform strategy for large-scale SAP decisions.

| Skill | Purpose |
|-------|---------|
| `s4hana-migration` | Conversion approach assessment, simplification items, custom code impact |
| `activate-methodology` | SAP Activate phases, quality gates, deliverable mapping |
| `rise-licensing` | RISE with SAP licensing model, contract levers, negotiation points |
| `clean-core-strategy` | Clean core adoption roadmap, extensibility model, ABAP cloud transition |
| `joule-strategy` | Joule rollout strategy, use case prioritization, governance |

---

## Agents (10)

Specialized subagents dispatched by skills for focused, parallel work.

| Agent | Role |
|-------|------|
| `sap-reviewer` | Code review specialist — quality, patterns, SAP standards |
| `sap-estimator` | Estimation specialist — WBS decomposition, three-point estimates |
| `sap-migration-analyzer` | Migration readiness analyst — custom code, simplification items |
| `sap-test-designer` | Test case generator — SIT/UAT scripts, coverage analysis |
| `sap-value-calculator` | ROI and TCO modeler — business case quantification |
| `sap-security-auditor` | Security and authorization auditor — auth objects, SoD, risks |
| `sap-architect` | Solution architecture reviewer — design decisions, integration patterns |
| `sap-data-analyst` | Data migration analyst — volume, quality, mapping, reconciliation |
| `sap-doc-generator` | Documentation generator — FS, TDS, user guides, training material |
| `sap-process-modeler` | Process flow designer — to-be flows, swimlanes, gap identification |

---

## Commands (6)

Short-form triggers that invoke the right skill and agent combination.

| Command | Usage | What It Produces |
|---------|-------|-----------------|
| `/sap-debug` | `/sap-debug [issue description]` | Root cause analysis document |
| `/sap-estimate` | `/sap-estimate [scope description]` | Effort estimate with WBS |
| `/sap-kickoff` | `/sap-kickoff [project name]` | Project charter |
| `/sap-review` | `/sap-review [file or code block]` | Code review report |
| `/sap-doc` | `/sap-doc [document type]` | Functional spec, technical spec, user guide, or training material |
| `/sap-migrate` | `/sap-migrate [system/landscape info]` | Migration assessment |

---

## Workflow Chains (SAP Activate Aligned)

Skills chain together — each skill names the next skill to invoke. Quality gates block phase transitions until evidence requirements are met.

```
DISCOVER  → project-kickoff → brainstorming
PREPARE   → estimation → solution-architecture → change-management
EXPLORE   → fit-gap-analysis → process-design → [module skills]
REALIZE   → development-workflow → code-review → testing-strategy
DEPLOY    → data-migration → cutover-planning → go-live-readiness
RUN       → hypercare → value-advisory
```

---

## Knowledge Layer

Skills reference a RAG-ready knowledge base instead of embedding all knowledge inline. This keeps skills token-efficient and enables community contribution.

```
knowledge/
├── indexes/          # SAP Notes, transaction codes, released APIs
├── best-practices/   # Module-specific proven patterns
└── patterns/         # Reusable solution patterns (IDoc, BAPI, RAP, CDS)
```

Future: MCP server integration for live SAP Note search.

---

## Skill Quality Standard

Every v3.0 skill enforces behavior — it does not merely inform. Each skill contains:

1. **Iron Laws** — Non-negotiable rules, stated emphatically
2. **Rationalization Table** — Anticipated shortcuts and explicit counters
3. **Red Flags** — Trigger phrases the agent watches for in its own reasoning
4. **Hard Gates** — Blocking conditions that require evidence before proceeding
5. **Verification** — Completion criteria with required evidence
6. **Next Skill** — Workflow chain continuation

---

## No Telemetry

SAP Superpowers collects no data. No usage tracking, no analytics, no phone-home. Your SAP landscape details, client data, and code stay local.

---

## Author & License

**Author:** vigneshbarani24  
**Company:** KaarTech UK  
**License:** MIT  
**Version:** 3.0  

Contributions welcome. See `CONTRIBUTING.md` for the community skills process.
