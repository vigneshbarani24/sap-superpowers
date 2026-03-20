# SAP Superpowers

**The SAP consultant's AI operating system — for Claude Code**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-26-brightgreen.svg)](skills/)
[![Process Skills](https://img.shields.io/badge/Process_Skills-10-orange.svg)](skills/)
[![Reference Skills](https://img.shields.io/badge/Reference_Skills-16-purple.svg)](skills/)
[![Agents](https://img.shields.io/badge/Agents-6-red.svg)](agents/)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](CHANGELOG.md)

> What [superpowers](https://github.com/obra/superpowers) did for software engineering, SAP Superpowers does for SAP consulting. Not just reference docs — **enforced workflows with hard gates, checklists, and decision trees** that guide you through complex SAP processes step by step.

---

## Why SAP Superpowers?

Other SAP AI tools give you **knowledge**. We give you **process + agents**.

- **10 process skills** with hard gates — you literally cannot skip steps
- **6 specialized agents** that get dispatched automatically to do focused work
- **16 reference skills** covering the full SAP lifecycle (dev + functional + PM + OCM)
- **4 slash commands** for instant access to common workflows
- **Zero telemetry.** Pure Markdown. No API keys. No dependencies.

---

## Quick Start

```bash
# 1. Install Claude Code (if you haven't)
npm install -g @anthropic-ai/claude-code

# 2. Inside Claude Code, install SAP Superpowers
/plugin marketplace add vigneshbarani24/sap-superpowers

# 3. Start using it — skills activate automatically
#    Or use slash commands:
/sap-debug        # Systematic SAP troubleshooting
/sap-estimate     # Structured effort estimation
/sap-kickoff      # SAP Activate project setup
/sap-review       # Clean core code review
```

No config. No API keys. No telemetry. Just SAP expertise.

---

## What's Inside — 26 Skills

### Process Skills — Enforced Workflows (10)

These are **rigid, superpowers-style skills** with hard gates, numbered checklists, and decision trees. You cannot skip steps.

| Skill | Slash Command | What It Enforces |
|-------|--------------|-----------------|
| `sap-troubleshooting` | `/sap-debug` | 7-step diagnosis: symptom → layer classification → evidence → SAP Notes → root cause → fix → verify |
| `sap-estimation` | `/sap-estimate` | Forced decomposition with complexity multipliers, always a range (optimistic/realistic/pessimistic) |
| `sap-go-live-readiness` | — | 10 hard gates with evidence requirements — cannot skip Gate 5 without passing Gate 4 |
| `sap-code-review` | `/sap-review` | ABAP Cloud tier classification → clean core rules → anti-patterns → severity report |
| `sap-project-kickoff` | `/sap-kickoff` | SAP Activate Phase 0-1: scope → stakeholders → RACI → governance → risks → timeline |
| `sap-brainstorming` | — | SAP standard first → config possible? → released API? → modification (last resort) |
| `sap-testing-strategy` | — | Testing pyramid: ABAP Unit → integration → UAT → regression, with defect management |
| `sap-change-management` | — | Stakeholder analysis → impact assessment → comms plan → training → adoption tracking |
| `sap-value-advisory` | — | Current state → value drivers → TCO → ROI/NPV/IRR → sensitivity → executive presentation |
| `using-sap-superpowers` | — | Meta-skill: routes to correct skills, auto-activates on session start |

### Reference Skills — Domain Knowledge (16)

Deep SAP domain knowledge with transaction codes, SAP Notes, SAP Help Portal links, and version-specific guidance.

#### Technical

| Skill | Coverage | Key Content |
|-------|----------|-------------|
| `abap-cloud` | Clean core, RAP, CDS, released APIs | Tier model, API verification methods, naming conventions |
| `system-administration` | Basis, transports, monitoring | 24+ transaction codes, STMS, SM21, SM50, upgrade planning |
| `btp-development` | BTP architecture, CAP, Fiori Elements | Cloud Foundry vs Kyma, SAP Build, deployment patterns |
| `sap-integration-suite` | CPI, API Management, Cloud Connector | 10 adapter types, iFlow patterns, error handling |
| `sap-security-grc` | Authorization, SoD, GRC, firefighter | Role design patterns, 7 common SoD conflicts, audit trail |
| `sap-joule` | SAP's AI copilot | Capabilities, architecture, ROI concerns, Joule vs external AI |

#### Functional Modules

| Skill | Module | Key Content |
|-------|--------|-------------|
| `financial-accounting` | FI | G/L, AP/AR, asset accounting, closing, universal journal (S/4HANA) |
| `controlling` | CO | Cost centers, internal orders, CO-PA, margin analysis (S/4HANA) |
| `materials-management` | MM | Procurement, inventory, MRP, invoice verification, movement types |
| `sales-distribution` | SD | Order-to-cash, pricing condition technique, ATP, output management |
| `production-planning` | PP | BOM, routing, MRP, production orders, capacity planning |
| `plant-maintenance` | PM | Equipment, work orders, preventive maintenance, notifications |
| `successfactors` | HCM/SF | Employee Central, ECP, S/4HANA integration, module sequencing |

#### Strategic

| Skill | Coverage | Key Content |
|-------|----------|-------------|
| `s4hana-migration` | Migration approaches | Brownfield/greenfield/bluefield decision tree, SUM, custom code remediation |
| `sap-activate-methodology` | Project methodology | 6 phases, deliverables, quality gates, fit-to-standard workshops |
| `rise-licensing` | Commercial models | RISE vs GROW decision matrix, HUoM, FUE, SAPS, BTP credits |

---

## See It In Action

### `/sap-debug` — Never Guess at Fixes Again

```
You:     "I'm getting a MESSAGE_TYPE_X dump in VA01"

Claude:  Using sap-troubleshooting skill...

         Step 1: Capturing symptom
         → Dump type: MESSAGE_TYPE_X, Transaction: VA01
         → What does ST22 show for exception class and program?

You:     "CX_SY_ZERODIVIDE in ZSD_PRICING_EXIT"

Claude:  Step 2: Classified as ABAP Layer (short dump)
         Step 3: Gathering evidence
         → Custom pricing exit dividing by quantity, but quantity is 0
         Step 4: SAP Notes search → Note 2345678 matches
         Step 5: Root cause → Missing null check
         Step 6: Proposed fix with rollback plan...
```

**What makes it different:** 7 mandatory steps. Evidence before fix. No jumping to conclusions.

### `/sap-estimate` — Stop Giving Single-Number Estimates

```
Claude:  Using sap-estimation skill...

         | Task              | Base   | Complexity | Adjusted |
         |-------------------|--------|-----------|----------|
         | CDS Views         | 3 days | 1.5x      | 4.5 days |
         | RAP Service       | 4 days | 1.5x      | 6 days   |
         | Fiori UI          | 8 days | 1.5x      | 12 days  |

         Range: 30 days (optimistic) → 38 days (realistic) → 57 days (pessimistic)
```

**What makes it different:** Forced decomposition. SAP-specific multipliers. Always a range.

### `sap-go-live-readiness` — 10 Gates, Zero Shortcuts

```
Claude:  HARD GATE: All 10 gates must PASS before declaring readiness.

         Gate 1: Functional Testing    → PASS ✓
         Gate 2: Integration Testing   → PASS ✓
         Gate 3: UAT Sign-off          → FAIL ✗ (2 critical defects open)

         BLOCKED: Cannot proceed to Gate 4 until Gate 3 passes.
```

**What makes it different:** Hard gates. Can't skip steps. Every gate needs evidence.

---

## Architecture

```
┌─ Claude Code ──────────────────────────────────────┐
│                                                     │
│  ┌─ SAP Superpowers Plugin ─────────────────────┐  │
│  │                                               │  │
│  │  hooks/session-start                          │  │
│  │  → Injects meta-skill on every session        │  │
│  │  → Routes to correct skill based on context   │  │
│  │                                               │  │
│  │  skills/ (26 SKILL.md files)                  │  │
│  │  ├── 10 process skills (hard gates)           │  │
│  │  └── 16 reference skills (domain knowledge)   │  │
│  │                                               │  │
│  │  commands/ (4 slash commands)                  │  │
│  │  agents/ (6 specialized subagents)            │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Pure Markdown + shell scripts                      │
│  No npm install. No API keys. No telemetry.         │
│  No dependencies. MIT license.                      │
└─────────────────────────────────────────────────────┘
```

**Skills auto-activate** based on keywords:
- "error", "dump", "not working" → `sap-troubleshooting`
- "estimate", "effort" → `sap-estimation`
- "go-live", "cutover" → `sap-go-live-readiness`
- "business case", "ROI" → `sap-value-advisory`
- Module-specific topics → corresponding reference skill

---

## Agents — Specialists That Do the Work

Skills guide the process. Agents do focused work. When you trigger a skill, it can automatically dispatch a specialized subagent — a separate AI instance that handles a specific task and reports back.

| Agent | Dispatched By | What It Does |
|-------|--------------|-------------|
| `sap-reviewer` | `sap-code-review` | Analyzes ABAP/CDS code against clean core rules, classifies ABAP Cloud tier, flags deprecated APIs |
| `sap-estimator` | `sap-estimation` | Decomposes work items, applies SAP complexity multipliers, produces range estimates |
| `sap-migration-analyzer` | `s4hana-migration` | Scans custom code for S/4HANA compatibility, classifies as must-fix/should-fix/nice-to-fix |
| `sap-test-designer` | `sap-testing-strategy` | Generates test cases from process descriptions — positive, negative, boundary, integration |
| `sap-value-calculator` | `sap-value-advisory` | Builds ROI/TCO models, calculates NPV/IRR, runs sensitivity analysis across scenarios |
| `sap-security-auditor` | `sap-security-grc` | Reviews authorization for SoD conflicts, flags over-privileged access (SAP_ALL, broad S_TCODE) |

---

## Who This Is For

| Role | Top Skills |
|------|-----------|
| **Functional Consultants** (FI/CO, MM/SD, PP/PM) | Module reference skills, estimation, go-live readiness, value advisory |
| **ABAP/BTP Developers** | Code review, troubleshooting, ABAP Cloud, BTP development |
| **Basis Administrators** | System administration, troubleshooting, go-live readiness |
| **Solution Architects** | Brainstorming, S/4HANA migration, integration suite, Activate methodology |
| **Project Managers** | Project kickoff, estimation, go-live readiness, Activate methodology |
| **Change Management Leads** | Change management, testing strategy, value advisory |

---

## What Makes Us Different

Most SAP AI tools give you **knowledge** — here's how a CDS view works, here's the tcode. We give you **process** — enforced step-by-step workflows where you can't skip steps, with specialized agents doing focused work.

| Capability | SAP Superpowers |
|-----------|----------------|
| **Process workflows with hard gates** | 10 — no other SAP AI tool has any |
| **Specialized subagents** | 6 — dispatched automatically during workflows |
| **Functional module coverage** | FI, CO, MM, SD, PP, PM, SF — not just dev tools |
| **Project management** | Kickoff, estimation, go-live readiness |
| **Change management** | Full OCM workflow with adoption tracking |
| **Value advisory** | TCO, NPV, IRR modeling with sensitivity analysis |
| **Migration guidance** | Decision trees for brownfield/greenfield/bluefield |
| **Clean core code review** | ABAP Cloud tier classification + anti-pattern detection |
| **Telemetry** | None. Zero. No phone home. |
| **Cost** | Free, MIT licensed |

---

## Contributing

We need SAP practitioners. See [CONTRIBUTING.md](CONTRIBUTING.md).

**Most wanted:**
- Reference skills for modules you know deeply
- Process skills for workflows you follow daily
- SAP Notes references and real-world patterns
- Bug reports and feedback from actual SAP projects

---

## FAQ

**Q: Do I need an SAP system?**
A: No. Skills guide your process and provide knowledge. You use them alongside your SAP system.

**Q: Does this replace SAP Joule?**
A: They're complementary. Joule is great for in-system queries. We're great for cross-cutting consulting methodology. Use both.

**Q: Is my data sent anywhere?**
A: No. Pure Markdown files. No telemetry, no API calls, no data collection. Everything runs locally.

**Q: Can I use this with Cursor?**
A: The hook system supports Cursor. Other platforms may work with manual skill invocation.

**Q: How is this different from other SAP AI plugins?**
A: Others provide knowledge-only plugins for developers. We provide process-driven workflows with hard gates you can't skip, specialized agents, and coverage across the entire SAP lifecycle — including functional, PM, OCM, and value advisory.

---

## Roadmap

- [x] **v1.0** — 3 process skills, plugin scaffold, hooks, CI
- [x] **v2.0** — 26 skills (10 process + 16 reference), 6 agents, 4 commands *(you are here)*
- [ ] **v2.1** — MCP servers for SAP ecosystem integration
- [ ] **v2.2** — Additional agents and community-requested skills
- [ ] **v3.0** — Pro tier with advanced deliverable generation

---

## License

MIT — use it, fork it, improve it, share it.

---

**SAP**, **S/4HANA**, **ABAP**, **Fiori**, **RISE with SAP**, **SAP Activate**, **SuccessFactors**, and related terms are trademarks of SAP SE. This is an independent community project not affiliated with SAP SE.
