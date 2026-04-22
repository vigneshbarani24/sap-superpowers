<p align="center">
  <h1 align="center">SAP Superpowers</h1>
  <p align="center">
    <strong>The AI operating system for SAP consultants.</strong><br>
    55 skills. 25 agents. 8 commands. 14 industries. 16 countries.<br>
    Delivery factory. Solution accelerators. Enterprise data protection.
  </p>
  <p align="center">
    <a href="https://github.com/vigneshbarani24/sap-superpowers/stargazers"><img src="https://img.shields.io/github/stars/vigneshbarani24/sap-superpowers?style=flat-square&color=yellow" alt="Stars"></a>
    <a href="https://github.com/vigneshbarani24/sap-superpowers/network/members"><img src="https://img.shields.io/github/forks/vigneshbarani24/sap-superpowers?style=flat-square" alt="Forks"></a>
    <a href="https://github.com/vigneshbarani24/sap-superpowers/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License"></a>
    <img src="https://img.shields.io/badge/version-3.1.0-purple?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/skills-55-green?style=flat-square" alt="Skills">
    <img src="https://img.shields.io/badge/agents-25-orange?style=flat-square" alt="Agents">
    <img src="https://img.shields.io/badge/SAP-S%2F4HANA%20%7C%20ECC%20%7C%20BTP-0070C0?style=flat-square" alt="SAP">
  </p>
</p>

---

> **One plugin. Every SAP module. Every project phase. Every deliverable.**
>
> SAP Superpowers turns Claude into a senior SAP consultant who enforces the right process, generates production-ready deliverables, and can run an entire project phase autonomously.

## Install (30 seconds)

```bash
# Claude Code Plugin Marketplace
claude plugin add sap-superpowers@vigneshbarani24-sap-superpowers

# Or manual install
git clone https://github.com/vigneshbarani24/sap-superpowers.git
cd sap-superpowers && claude plugin install .
```

**Zero dependencies. Zero API keys. Zero telemetry. Works offline.**

## What It Does

### Delivery Factory — One Command, One Phase, All Deliverables

```
/sap-deliver discover    → Project charter, stakeholder map, requirements, risks, scope
/sap-deliver prepare     → Estimation, architecture, change management, business case
/sap-deliver explore     → Fit/gap matrix, process designs, functional specs, test strategy
/sap-deliver realize     → Technical specs, code, unit tests, code review, SIT, training
/sap-deliver deploy      → Data migration, cutover runbook, go-live readiness, UAT, transports
/sap-deliver run         → Hypercare, status reports, value realization, lessons learned
```

**32 deliverables across 6 SAP Activate phases.** Quality-scored (L1-L5). Context-aware. What costs $50K-$500K to produce manually.

### Solution Accelerators — 60% Pre-Built

```
/sap-accelerate order-to-cash      → Process flow, fit/gap, FS, config guide, 30 test cases
/sap-accelerate procure-to-pay     → Procurement pipeline, release strategy, tolerance config
/sap-accelerate record-to-report   → Chart of accounts, closing tasks, tax logic, audit trail
/sap-accelerate plan-to-produce    → BOM/routing, MRP config, QM integration, capacity
/sap-accelerate hire-to-retire     → Org structure, infotypes, payroll, time management
```

Each accelerator adapts to your **industry** (14 supported) and **country** (16 localized).

### Autonomous Development

```
/sap-debug              → Systematic root cause analysis
/sap-estimate           → Three-point WBS decomposition (single numbers blocked)
/sap-kickoff            → SAP Activate Phase 0-1 charter
/sap-review             → 4-dimension code review (quality, performance, security, clean core)
/sap-doc                → Functional spec, technical spec, user guide, training
/sap-migrate            → S/4HANA migration assessment
```

**Autopilot:** Idea → requirements → design → code → test → ATC → activate → transport. One command.

**Self-correcting loop:** Fix → syntax check → ATC → unit tests → repeat until clean. Max 10 iterations.

**Team execution:** Parallel multi-agent dispatch with conflict resolution and merged deliverables.

## 55 Skills

| Category | Count | Highlights |
|----------|-------|-----------|
| **Meta** | 7 | Delivery factory, solution accelerator, team execution, sap-doctor, verification |
| **Consulting** | 9 | Deep interview, estimation, fit-gap, solution architecture, value advisory |
| **Development** | 8 | Autopilot, self-correcting loop, code generation, code review, program-to-spec |
| **Delivery** | 6 | Testing strategy, data migration, cutover, go-live readiness, transport release |
| **Modules** | 20 | FI, CO, MM, SD, PP, PM, QM, HCM, EWM, TM, Ariba, BTP, ABAP Cloud + 7 more |
| **Strategic** | 5 | S/4HANA migration, SAP Activate, RISE licensing, clean core, Joule |

Every skill enforces behavior through **Iron Laws**, **Rationalization Tables**, **Red Flags**, and **Hard Gates**. Not guidance — enforcement.

## 25 Agents

**Core (10):** Reviewer, Estimator, Migration Analyzer, Test Designer, Value Calculator, Security Auditor, Architect, Data Analyst, Doc Generator, Process Modeler

**Module Consultants (15):** SD, MM, FI, CO, PP, PS, PM, QM, HCM, WM, TM, TR, BW, Ariba, Basis

Dispatched automatically by skills. Run in parallel via team execution.

## Enterprise Features

### Data Protection (8 categories)
Hard-block sensitive tables (payroll, credentials, national IDs). Soft-block business data with warnings. Per-session approval protocol. Never blanket access.

### Enforcement Hooks (6 lifecycle events)
| Hook | What It Does |
|------|-------------|
| **PreToolUse** | Blocks sensitive table access, validates transport discipline |
| **PostToolUse** | Checks syntax errors, ATC findings, activation failures |
| **UserPromptSubmit** | Auto-routes to relevant skill based on keywords |
| **PreCompact** | Preserves transport numbers and SAP context |
| **SessionStart** | Loads config, detects platform, injects context |

### 14 Industries
Retail, Automotive, Pharma, F&B, Chemical, Electronics, Construction, Utilities, Banking, Public Sector, Fashion, Steel, Cosmetics, Tire

### 16 Countries
US, Germany, UK, India, Japan, South Korea, France, Italy, Spain, Netherlands, Brazil, Mexico, Australia, Singapore, China, EU-wide

Each with tax systems, e-invoicing formats, banking standards, regulatory requirements.

### 13 Coding Standards
Naming conventions, Clean ABAP, OOP patterns, ALV rules, include structure, constants, text elements, ABAP release reference (702-758), SAP version awareness (ECC vs S/4HANA), error handling, testing, Dynpro.

### 15 SPRO Configuration Guides
Module-specific customizing references with real SPRO paths, config tables, and dependency sequences.

## MCP Integration

Connect to live SAP systems via MCP ABAP ADT server:

```bash
# Initialize project
node scripts/setup-init.mjs

# Configure SAP connection
# Edit .sap-superpowers/sap.env with your ADT credentials

# Run diagnostics
# Use /sap-doctor to verify plugin, MCP, and SAP system health
```

Supports: `abap-mcp-adt-powerup` | stdio / HTTP / SSE transport | Auto-preflight checks

## Architecture

```
sap-superpowers/
├── skills/          55 behavior-shaping skills (meta, consulting, dev, delivery, modules, strategic)
├── agents/          25 specialized agents (10 core + 15 module consultants)
├── commands/        8 slash commands (/sap-deliver, /sap-accelerate, /sap-debug, etc.)
├── factory/         Delivery factory engine (quality scoring, deliverable registry)
├── accelerators/    Pre-built solution packages (O2C, P2P, R2R, P2P-Mfg, H2R)
├── hooks/           6 enforcement hooks (PreToolUse, PostToolUse, prompt router, etc.)
├── common/          13 coding standard files
├── industry/        14 industry reference files
├── country/         16 country localization files
├── configs/         15 SPRO configuration guides
├── exceptions/      8 data protection blocklist categories
├── knowledge/       SAP Notes index, tcodes, released APIs, patterns
├── bridge/          MCP server launcher with 3-tier config resolution
└── scripts/         Setup wizard, maintenance utilities
```

**180+ files. Zero npm dependencies. Pure Markdown + shell + JS hooks.**

## Why SAP Superpowers

| Problem | SAP Superpowers |
|---------|----------------|
| AI gives generic SAP advice | 55 skills with enforced methodology — Iron Laws prevent shortcuts |
| Consultants recreate deliverables every project | Delivery factory produces all phase artifacts in one command |
| New consultants lack module depth | 15 module consultant agents with real transaction codes and SPRO paths |
| Code generation ignores SAP standards | 13 coding standards enforced, ABAP release-aware (702-758) |
| No industry context | 14 industry files with specific processes, master data, and regulations |
| Data protection ignored | 8 blocklist categories with hard/soft blocks on 80+ sensitive tables |
| Projects use different SAP versions | SAP version awareness — ECC 6.0, S/4HANA on-prem, S/4HANA Cloud all supported |

## No Telemetry

SAP Superpowers collects **zero data**. No usage tracking. No analytics. No phone-home. Your SAP landscape details, client data, and code stay on your machine. Always.

## Contributing

We welcome contributions from SAP practitioners. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**One skill per PR.** Every skill must include Iron Laws, Rationalization Table, Red Flags, Hard Gates, and Verification.

## License

MIT — use it commercially, modify it, distribute it. No restrictions.

## Author

**vigneshbarani24** | KaarTech UK

---

<p align="center">
  <strong>If SAP Superpowers saves you time, give it a star.</strong><br>
  <a href="https://github.com/vigneshbarani24/sap-superpowers">https://github.com/vigneshbarani24/sap-superpowers</a>
</p>
