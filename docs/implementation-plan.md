# SAP Superpowers — Implementation Plan

**Date:** 2026-03-18
**Status:** Active
**Spec:** Design Specification (provided by author)

---

## Current State Assessment

### What Exists (Layer 1 — Complete)

| Component | Status | Notes |
|-----------|--------|-------|
| `.claude-plugin/plugin.json` | Done | Valid manifest |
| `.claude-plugin/marketplace.json` | Done | Valid listing |
| `hooks/hooks.json` | Done | SessionStart hook configured |
| `hooks/session-start` | Done | Bash script, JSON output, cross-platform |
| `package.json` | Done | Metadata only, no deps |
| `agents/sap-reviewer.md` | Done | Clean core review subagent |
| `commands/sap-debug.md` | Done | Links to sap-troubleshooting |
| `commands/sap-estimate.md` | Done | Links to sap-estimation |
| `commands/sap-kickoff.md` | Stub | "Coming soon" placeholder |
| `commands/sap-review.md` | Stub | "Coming soon" placeholder |
| `test/smoke-test.sh` | Done | Validates frontmatter, hooks, commands |
| `.github/workflows/validate-skills.yml` | Done | CI on PR/push |
| `README.md` | Done | Comprehensive |
| `CONTRIBUTING.md` | Done | Contribution guidelines |
| `CHANGELOG.md` | Done | Initial release |
| `LICENSE` | Done | MIT |

### What Exists (Layer 2 — Partial)

**Process Skills (3 of 9 done):**

| # | Skill | Status | Quality |
|---|-------|--------|---------|
| 1 | `using-sap-superpowers` | Done | Good — needs update when new skills added |
| 2 | `sap-brainstorming` | Missing | — |
| 3 | `sap-project-kickoff` | Missing | — |
| 4 | `sap-troubleshooting` | Done | Excellent — decision tree, checklist, patterns |
| 5 | `sap-code-review` | Missing | — |
| 6 | `sap-testing-strategy` | Missing | — |
| 7 | `sap-go-live-readiness` | Done | Excellent — 10 hard gates with templates |
| 8 | `sap-estimation` | Done | Excellent — decomposition tables, multipliers |
| 9 | `sap-change-management` | Missing | — |

**Reference Skills (0 of 15 done):**
All 15 reference skills are missing.

---

## Implementation Phases

### Phase 1: Remaining Process Skills (6 skills)

Priority order based on viral potential and dependency:

#### 1.1 `sap-code-review` (HIGH PRIORITY)
- **Why first:** Already has a subagent (`sap-reviewer.md`) and a command stub. Developers use this daily.
- **Content needed:**
  - SKILL.md with checklist: clean core check → ABAP Cloud tier → naming → error handling → testing → documentation
  - Decision tree: which tier is this code? (Cloud API / Cloud stable / Classic)
  - Cross-reference to `abap-cloud` reference skill
  - Clean core rules table (released vs unreleased APIs)
  - Common anti-patterns table
- **Update:** `commands/sap-review.md` from stub to working command

#### 1.2 `sap-project-kickoff` (HIGH PRIORITY)
- **Why second:** Every project starts here. Universal.
- **Content needed:**
  - SKILL.md with checklist: scope → stakeholders → governance → timeline → risks → kickoff
  - SAP Activate phase 0 (Discover) and phase 1 (Prepare) mapping
  - Stakeholder mapping template (RACI)
  - Governance structure template
  - `templates/` directory with kickoff agenda, RACI template
- **Update:** `commands/sap-kickoff.md` from stub to working command

#### 1.3 `sap-brainstorming` (MEDIUM)
- **Why:** Creative process for new SAP features/projects before implementation
- **Content needed:**
  - SKILL.md adapting superpowers brainstorming to SAP context
  - SAP-specific questions: which module? on-prem or cloud? clean core? integration points?
  - Decision tree: new development vs enhancement vs configuration
  - Cross-references to relevant module reference skills

#### 1.4 `sap-testing-strategy` (MEDIUM)
- **Why:** Testing is a universal pain point in SAP projects
- **Content needed:**
  - SKILL.md with checklist: test strategy → test plan → test cases → execution → defect mgmt
  - Testing pyramid for SAP: unit (ABAP Unit) → integration (process chains) → UAT → regression
  - Test case template
  - Defect severity classification
  - SAP-specific test tools table (ABAP Unit, eCATT, Tricentis, SAP Cloud ALM)

#### 1.5 `sap-estimation` — Already done

#### 1.6 `sap-change-management` (MEDIUM)
- **Why:** Critical for project success, often neglected
- **Content needed:**
  - SKILL.md with checklist: stakeholder analysis → impact assessment → comms plan → training plan → adoption tracking
  - Stakeholder influence/impact matrix
  - Communication plan template
  - Training plan template (by role, by module)
  - Adoption metrics framework

#### 1.7 `sap-troubleshooting` — Already done

#### 1.8 `sap-go-live-readiness` — Already done

### Phase 2: Reference Skills — Technical (5 skills)

Technical reference skills that support the process skills:

#### 2.1 `abap-cloud`
- **Content:** Clean core rules, released API list patterns, ABAP Cloud tier model, RAP overview, CDS view patterns, key SAP Notes
- **References:** SAP Help Portal ABAP Cloud docs, SAP Note 2803646 (custom code migration)
- **Cross-ref from:** `sap-code-review`, `sap-troubleshooting`

#### 2.2 `system-administration`
- **Content:** Transport management (STMS), system monitoring (SM21/SM50/ST06), upgrade planning, patching, client management
- **References:** SAP Help Portal Basis admin docs
- **Cross-ref from:** `sap-troubleshooting`

#### 2.3 `btp-development`
- **Content:** BTP architecture (subaccounts, entitlements), CAP model, Fiori Elements, SAP Build Apps/Process Automation, Cloud Foundry vs Kyma
- **References:** SAP BTP documentation, SAP Developers tutorials

#### 2.4 `sap-integration-suite`
- **Content:** Integration Suite overview, Cloud Integration (CPI), API Management, Cloud Connector, Open Connectors, event mesh
- **References:** SAP Integration Suite docs, integration patterns

#### 2.5 `sap-security-grc`
- **Content:** Authorization objects, role design patterns, SoD concepts, GRC overview, emergency access (firefighter), audit trail
- **References:** SAP Help Portal security docs, SAP Note 1703803

### Phase 3: Reference Skills — Functional Modules (7 skills)

#### 3.1 `financial-accounting`
- **Content:** FI organizational structure, G/L accounting, AP/AR, asset accounting, bank accounting, closing operations, reporting (FBL*/S_ALR_*)
- **SAP Notes:** Key FI notes for S/4HANA changes (new G/L, universal journal)

#### 3.2 `controlling`
- **Content:** CO organizational structure, cost element accounting, cost center accounting, internal orders, profitability analysis (CO-PA), product costing
- **SAP Notes:** Key CO notes for S/4HANA (margin analysis replaces CO-PA)

#### 3.3 `materials-management`
- **Content:** MM organizational structure, procurement process, inventory management, invoice verification, MRP, source determination
- **SAP Notes:** Key MM notes for S/4HANA (simplified stock management)

#### 3.4 `sales-distribution`
- **Content:** SD organizational structure, order-to-cash process, pricing, availability check (ATP), output management, billing, shipping
- **SAP Notes:** Key SD notes for S/4HANA (advanced ATP, output management)

#### 3.5 `production-planning`
- **Content:** PP organizational structure, BOM, routing, work centers, MRP, production orders, shop floor control
- **SAP Notes:** Key PP notes for S/4HANA

#### 3.6 `plant-maintenance`
- **Content:** PM organizational structure, equipment/functional locations, maintenance planning, work orders, preventive maintenance, notifications
- **SAP Notes:** Key PM notes for S/4HANA

#### 3.7 `successfactors`
- **Content:** SF module overview (EC, recruiting, learning, performance, compensation), integration with S/4HANA, Employee Central Payroll
- **References:** SAP SuccessFactors documentation

### Phase 4: Reference Skills — Strategic (3 skills)

#### 4.1 `s4hana-migration`
- **Content:** Migration approaches (brownfield/greenfield/bluefield/selective data), SUM tool, DMLT, readiness checks, custom code analysis, simplification items
- **SAP Notes:** SAP Note 2380257 (simplification items)

#### 4.2 `sap-activate-methodology`
- **Content:** Activate phases (Discover, Prepare, Explore, Realize, Deploy, Run), deliverables per phase, quality gates, workstreams, SAP Cloud ALM
- **References:** SAP Activate methodology documentation

#### 4.3 `rise-licensing`
- **Content:** RISE with SAP components, GROW with SAP, HUoM/FUE licensing, SAPS sizing, contract structures, BTP credits model
- **References:** SAP licensing documentation (public)

### Phase 5: Update Meta-Skill + Final Polish

- Update `using-sap-superpowers/SKILL.md` with all 24 skills in routing table
- Update all cross-references between skills
- Update `commands/sap-kickoff.md` and `commands/sap-review.md` (remove stubs)
- Update `README.md` with complete skill catalog
- Update `CHANGELOG.md`
- Run smoke tests
- Tag v2.0.0

---

## Implementation Order (Execution Batches)

Each batch can be executed in a single session. Skills within a batch are independent and can be built in parallel.

### Batch A — Process Skills (6 skills to build)
1. `sap-code-review` + update `commands/sap-review.md`
2. `sap-project-kickoff` + update `commands/sap-kickoff.md`
3. `sap-brainstorming`
4. `sap-testing-strategy`
5. `sap-change-management`

### Batch B — Technical Reference Skills (5 skills)
1. `abap-cloud` (with `references/` dir)
2. `system-administration` (with `references/` dir)
3. `btp-development` (with `references/` dir)
4. `sap-integration-suite` (with `references/` dir)
5. `sap-security-grc` (with `references/` dir)

### Batch C — Functional Module Reference Skills (7 skills)
1. `financial-accounting`
2. `controlling`
3. `materials-management`
4. `sales-distribution`
5. `production-planning`
6. `plant-maintenance`
7. `successfactors`

### Batch D — Strategic Reference Skills (3 skills)
1. `s4hana-migration`
2. `sap-activate-methodology`
3. `rise-licensing`

### Batch E — Integration & Polish
1. Update `using-sap-superpowers/SKILL.md` routing table
2. Update cross-references in all skills
3. Update README.md
4. Update CHANGELOG.md
5. Run smoke tests
6. Fix any issues
7. Tag release

---

## Quality Checklist Per Skill

### Process Skills
- [ ] Valid YAML frontmatter (name matches dir, description starts with "Use when")
- [ ] `<HARD-GATE>` section enforcing discipline
- [ ] `## Checklist` section with numbered steps
- [ ] Decision tree (graphviz dot format) where applicable
- [ ] Templates/tables for deliverables
- [ ] Cross-references to relevant reference skills
- [ ] Common mistakes/anti-patterns table

### Reference Skills
- [ ] Valid YAML frontmatter
- [ ] Content routing table (if multiple reference files)
- [ ] At least 3 core topics with explanations
- [ ] At least 2 SAP Help Portal links
- [ ] At least 2 SAP Notes references
- [ ] Version-specific info where relevant (S/4HANA 2023/2024)
- [ ] `references/` directory with supplementary files

---

## Estimated Effort

| Batch | Skills | Estimated Time | Notes |
|-------|--------|---------------|-------|
| A | 5 process skills | 1-2 sessions | Process skills need full content |
| B | 5 technical refs | 1 session | Reference skills can be more concise |
| C | 7 functional refs | 1-2 sessions | Module knowledge, tables, links |
| D | 3 strategic refs | 1 session | Strategic/licensing content |
| E | Integration | 1 session | Updates, testing, polish |
| **Total** | **20 new + updates** | **5-7 sessions** | |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| SAP Notes links may change | Reference skills become stale | Use SAP Note numbers (stable) not URLs |
| Smoke test doesn't catch content quality | Bad skills ship | Manual review before each batch merge |
| Too much content per skill | Context window bloat | Keep SKILL.md under 300 lines, use references/ for overflow |
| Cross-references to missing skills | Runtime "skill not found" | Build in dependency order, update meta-skill last |
