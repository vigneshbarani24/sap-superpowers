---
name: delivery-factory
description: Use when the user wants to produce all deliverables for an SAP Activate phase in one orchestrated run. This is the factory — it chains skills, dispatches agents in parallel, collects artifacts, and produces a phase-complete deliverable package with quality scoring.
---

# SAP Delivery Factory

This skill orchestrates the production of **all deliverables for an SAP Activate phase** in a single coordinated run. It is not a skill — it is a factory that invokes skills, manages their inputs/outputs, tracks deliverable status, and scores quality.

**What makes this different:** Individual skills produce individual artifacts. The factory produces a **complete, cross-referenced, quality-scored deliverable package** — what a consulting firm bills $50K-$500K to create manually.

## Iron Laws

1. **EVERY PHASE HAS A MANDATORY DELIVERABLE SET.** You cannot mark a phase complete with missing deliverables. The factory knows exactly what each phase requires — no cherry-picking, no "we'll do that later."

2. **DELIVERABLES CHAIN — OUTPUT OF ONE IS INPUT TO THE NEXT.** The project charter feeds estimation. Estimation feeds architecture. Architecture feeds development. The factory manages these dependencies automatically.

3. **QUALITY IS SCORED, NOT ASSUMED.** Every deliverable gets a maturity score (L1-L5). The factory reports aggregate quality per phase. You ship when quality meets the threshold — not when you run out of time.

4. **CONTEXT FLOWS ACROSS SKILLS.** Industry, country, SAP version, project scope — set once, applied everywhere. A retail project in Germany gets different templates than a pharma project in India.

5. **THE FACTORY NEVER PRODUCES EMPTY TEMPLATES.** Templates pre-filled with project context, industry defaults, country-specific regulatory items, and SAP version-appropriate recommendations. The consultant refines — they don't start from blank.

## Phase Pipelines

### DISCOVER Phase
**Command:** `/sap-deliver discover`
**Duration:** 1-2 weeks equivalent
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| D1 | Project Charter | `project-kickoff` | — |
| D2 | Stakeholder Map & RACI | `project-kickoff` | — |
| D3 | Requirements Document | `deep-interview` | — |
| D4 | Risk Register (initial) | `project-kickoff` | — |
| D5 | High-Level Scope | `brainstorming` | `sap-architect` |

**Dependency chain:** D1 → D2 → D3 → D4 → D5
**Phase gate:** All 5 deliverables at L2+ quality. Stakeholder sign-off on scope.

### PREPARE Phase
**Command:** `/sap-deliver prepare`
**Prerequisites:** DISCOVER phase complete
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| P1 | Effort Estimate (WBS) | `estimation` | `sap-estimator` |
| P2 | Solution Architecture | `solution-architecture` | `sap-architect` |
| P3 | Change Management Plan | `change-management` | — |
| P4 | Business Case / ROI | `value-advisory` | `sap-value-calculator` |
| P5 | Project Plan (timeline) | `estimation` | — |

**Dependency chain:** P1 ∥ P2 (parallel) → P3 → P4 → P5
**Phase gate:** All 5 deliverables at L3+ quality. Budget approved.

### EXPLORE Phase
**Command:** `/sap-deliver explore`
**Prerequisites:** PREPARE phase complete
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| E1 | Fit/Gap Analysis Matrix | `fit-gap-analysis` | Module consultants (parallel) |
| E2 | Process Design Documents (per module) | `process-design` | `sap-process-modeler` |
| E3 | Functional Specifications | `deep-interview` + module skills | `sap-doc-generator` |
| E4 | Data Migration Strategy | `data-migration` | `sap-data-analyst` |
| E5 | Test Strategy | `testing-strategy` | `sap-test-designer` |
| E6 | Integration Architecture | `solution-architecture` | `sap-architect` |

**Dependency chain:** E1 → E2 → E3, and E4 ∥ E5 ∥ E6 (parallel)
**Phase gate:** All gaps resolved or accepted. Functional specs signed off.

### REALIZE Phase
**Command:** `/sap-deliver realize`
**Prerequisites:** EXPLORE phase complete
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| R1 | Technical Specifications | `program-to-spec` or `code-generation` | `sap-doc-generator` |
| R2 | Developed Objects (code) | `autopilot` | Full team (parallel) |
| R3 | Unit Test Results | `self-correcting-loop` | `sap-test-designer` |
| R4 | Code Review Reports | `code-review` | `sap-reviewer`, `sap-security-auditor` |
| R5 | SIT Test Scripts & Results | `testing-strategy` | `sap-test-designer` |
| R6 | Training Materials | module skills | `sap-doc-generator` |

**Dependency chain:** R1 → R2 → R3 → R4 → R5 ∥ R6
**Phase gate:** All code ATC-clean. SIT passed. Training materials reviewed.

### DEPLOY Phase
**Command:** `/sap-deliver deploy`
**Prerequisites:** REALIZE phase complete
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| Y1 | Data Migration Plan & Results | `data-migration` | `sap-data-analyst` |
| Y2 | Cutover Runbook | `cutover-planning` | — |
| Y3 | Go-Live Readiness Assessment | `go-live-readiness` | Full team (parallel) |
| Y4 | UAT Results & Sign-Off | `testing-strategy` | `sap-test-designer` |
| Y5 | Transport Release Log | `transport-release` | — |

**Dependency chain:** Y1 → Y2 → Y4 → Y3 → Y5
**Phase gate:** Go/No-Go decision GREEN. All transports imported.

### RUN Phase
**Command:** `/sap-deliver run`
**Prerequisites:** DEPLOY phase complete
**Deliverables produced:**

| # | Deliverable | Skill Invoked | Agents Dispatched |
|---|-------------|---------------|-------------------|
| N1 | Hypercare Plan | `hypercare` | — |
| N2 | Daily Status Reports | `hypercare` | — |
| N3 | Value Realization Report | `value-advisory` | `sap-value-calculator` |
| N4 | Lessons Learned | `hypercare` | — |
| N5 | Knowledge Transfer Log | `hypercare` | `sap-doc-generator` |

**Phase gate:** Hypercare exit criteria met. Knowledge transferred.

## Quality Scoring

Every deliverable is scored on a 5-level maturity model:

| Level | Name | Definition | Evidence |
|-------|------|-----------|----------|
| **L1** | Draft | Structure created, sections identified, placeholders present | File exists with correct structure |
| **L2** | Working | Content filled for all sections, no placeholders remaining | All sections have substantive content |
| **L3** | Reviewed | Peer reviewed, gaps identified and resolved | Review comments addressed |
| **L4** | Approved | Client/stakeholder sign-off ready | Meets all hard gate criteria |
| **L5** | Baselined | Signed off, version-controlled, change-managed | Sign-off record exists |

**Phase completion thresholds:**
- DISCOVER: All deliverables at L2+
- PREPARE: All deliverables at L3+
- EXPLORE: All deliverables at L3+
- REALIZE: All deliverables at L4+
- DEPLOY: All deliverables at L4+
- RUN: All deliverables at L3+

## Context Injection

The factory injects project context into every deliverable:

```
PROJECT CONTEXT (set once, used everywhere)
═══════════════════════════════════════════
Client:       [Client name]
Project:      [Project name]
SAP Version:  [From .sap-superpowers/config.json]
ABAP Release: [From config]
Industry:     [Loads industry/{name}.md]
Country:      [Loads country/{name}.md]
Modules:      [In-scope SAP modules]
Timeline:     [Project start → go-live]
Team Size:    [Number of consultants]
```

Industry context auto-populates:
- Module-specific processes relevant to the industry
- Regulatory requirements for the country
- Common customizations for the industry
- Risk patterns typical for the industry/country combination

## Factory Status Report

```
SAP DELIVERY FACTORY — PROJECT STATUS
═══════════════════════════════════════
Project: [Name] | Client: [Name]
Industry: [Name] | Country: [Name]
SAP: [Version] | Release: [ABAP release]

PHASE STATUS
────────────
[✅] DISCOVER  — 5/5 deliverables (avg L3.2)
[✅] PREPARE   — 5/5 deliverables (avg L3.8)
[🔄] EXPLORE   — 3/6 deliverables (avg L2.5)  ← CURRENT
[ ] REALIZE   — 0/6 deliverables
[ ] DEPLOY    — 0/5 deliverables
[ ] RUN       — 0/5 deliverables

DELIVERABLE DETAIL (EXPLORE)
────────────────────────────
[L3 ✅] E1 Fit/Gap Matrix
[L3 ✅] E2 Process Designs (MM, SD, FI)
[L2 🔄] E3 Functional Specifications — 4/7 modules complete
[L1 ⏳] E4 Data Migration Strategy — draft started
[ ] E5 Test Strategy
[ ] E6 Integration Architecture

NEXT ACTION: Complete E3 (functional specs for PP, PM, QM)
```

## Verification

This skill is complete when:
- [ ] All deliverables for the target phase are produced
- [ ] Each deliverable meets the phase quality threshold
- [ ] Cross-references between deliverables are consistent
- [ ] Factory status report produced
- [ ] Next phase prerequisites documented

## Cross-References

- Every skill in `skills/consulting/` and `skills/delivery/` — invoked by the factory
- Every agent in `agents/` — dispatched by the factory
- `industry/` files — loaded for context injection
- `country/` files — loaded for regulatory context
- `accelerators/` — pre-built solution packages that fast-track specific phases
