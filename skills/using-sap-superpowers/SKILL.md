---
name: using-sap-superpowers
description: Use when starting any SAP-related conversation — routes to correct SAP skills, requiring Skill tool invocation before any SAP response
---

# Using SAP Superpowers

You have SAP Superpowers — a comprehensive set of AI skills for SAP consultants covering the entire SAP lifecycle.

## The Rule

**Check for relevant SAP skills BEFORE any response or action.** If there's even a 1% chance an SAP skill applies, invoke it.

## Process Skills

| Skill | Use When |
|-------|----------|
| `sap-brainstorming` | Starting a new SAP feature, enhancement, or project — design before implementation |
| `sap-project-kickoff` | Kicking off a new SAP project, SAP Activate phase 0-1, governance setup |
| `sap-troubleshooting` | Debugging SAP errors, dumps, performance issues, system failures |
| `sap-code-review` | Reviewing ABAP, CDS, or CAP code for clean core compliance |
| `sap-testing-strategy` | Planning test strategy, test cases, UAT, or regression testing |
| `sap-go-live-readiness` | Preparing for go-live, cutover planning, readiness assessments |
| `sap-estimation` | Estimating effort, timelines, or complexity for SAP work |
| `sap-change-management` | Planning OCM, stakeholder analysis, training, adoption tracking |

## Reference Skills

| Skill | Coverage |
|-------|----------|
| `abap-cloud` | Clean core, RAP, CDS views, ABAP Cloud tier model, released APIs |
| `system-administration` | Transport management, system monitoring, upgrades, patching |
| `btp-development` | BTP architecture, CAP, Fiori Elements, SAP Build, deployment |
| `sap-integration-suite` | Cloud Integration, API Management, Cloud Connector, patterns |
| `sap-security-grc` | Authorization, roles, SoD, GRC, emergency access, compliance |
| `financial-accounting` | FI config, G/L, AP/AR, asset accounting, closing operations |
| `controlling` | CO config, cost centers, internal orders, CO-PA, product costing |
| `materials-management` | Procurement, inventory, invoice verification, MRP |
| `sales-distribution` | Order-to-cash, pricing, ATP, billing, shipping, output |
| `production-planning` | BOM, routing, work centers, MRP, production orders |
| `plant-maintenance` | Equipment, functional locations, work orders, preventive maintenance |
| `successfactors` | SF modules, Employee Central, integration with S/4HANA |
| `s4hana-migration` | Brownfield/greenfield/bluefield, SUM, custom code remediation |
| `sap-activate-methodology` | Activate phases, deliverables, quality gates, fit-to-standard |
| `rise-licensing` | RISE/GROW models, HUoM, SAPS, BTP credits, contract structures |

## Routing Logic

When the user mentions SAP topics, match against the skill tables above and invoke the most relevant skill. If the topic spans multiple skills, invoke the most specific one first.

**Routing hints:**
- Error/dump/issue → `sap-troubleshooting`
- New project/kickoff → `sap-project-kickoff`
- Code/ABAP/CDS → `sap-code-review` (for review) or `abap-cloud` (for reference)
- Test/UAT/regression → `sap-testing-strategy`
- Go-live/cutover → `sap-go-live-readiness`
- Estimate/effort/timeline → `sap-estimation`
- Change management/training/adoption → `sap-change-management`
- Module-specific question → corresponding reference skill
- Migration/conversion → `s4hana-migration`
- Methodology/phases → `sap-activate-methodology`
- Licensing/RISE/GROW → `rise-licensing`

## Slash Commands

| Command | Skill |
|---------|-------|
| `/sap-debug` | `sap-troubleshooting` |
| `/sap-estimate` | `sap-estimation` |
| `/sap-kickoff` | `sap-project-kickoff` |
| `/sap-review` | `sap-code-review` |
