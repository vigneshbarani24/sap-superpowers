---
name: s4hana-migration
description: Use when advising on S/4HANA migration approach, assessing greenfield vs brownfield vs selective data transition options, analyzing custom code impact, reviewing simplification items, or building a migration business case or timeline.
persona: Solution Architect, Project Manager, Basis Lead, Technical Lead
phase: Discover / Prepare
---

# S/4HANA Migration Strategy

This skill enforces structured S/4HANA migration decision-making so that no approach recommendation is made without analyzing simplification items, custom code volume, and disruption tolerance — the three inputs that determine whether a migration succeeds or becomes a production crisis.

## Iron Laws

1. **NEVER RECOMMEND AN APPROACH WITHOUT ANALYZING SIMPLIFICATION ITEMS.** Greenfield, brownfield, and selective data transition are not stylistic preferences. The simplification item catalogue for the client's active modules determines feasibility. A recommendation without this analysis is a guess with a logo on it.
2. **NEVER ESTIMATE WITHOUT CUSTOM CODE ANALYSIS.** Timeline and cost are dominated by custom code remediation. A 500,000-line Z-namespace landscape requires a fundamentally different plan than a 5,000-line landscape. Volume, category, and remediation complexity must be quantified.
3. **ALWAYS CONSIDER DISRUPTION TOLERANCE.** A technically optimal greenfield approach that requires 18 months of parallel operation may be organizationally impossible for a 24/7 manufacturing business. Disruption tolerance is a constraint, not a preference.
4. **READINESS CHECK BEFORE APPROACH DECISION.** SAP Readiness Check output (or equivalent assessment) must exist before any migration approach is recommended. Skipping it means recommending without data.
5. **TCO COMPARISON IS MANDATORY.** Migration approach without a 5-year TCO is incomplete. Cloud vs on-premise, greenfield vs brownfield, licensing model changes — each combination produces a materially different cost profile.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Recommend greenfield by default | "Greenfield is the modern approach, clients want a clean start" | Greenfield ignores years of business-critical customizations, reporting logic, and embedded process knowledge. Re-creating it costs more than the migration itself. | Iron Law 1: Check simplification items AND custom code volume first. Greenfield is only appropriate when both support it. |
| Recommend brownfield by default | "Brownfield is safer, we just lift and shift" | Brownfield carries technical debt into S/4HANA. You get to S/4HANA but you do not get the benefits. Legacy designs block future clean-core compliance. | Iron Law 3: Document which business processes would be redesigned vs. carried forward. Model both timelines. |
| Skip SAP Readiness Check | "We know the landscape well enough" | Readiness Check surfaces hidden simplification items (FI-GL to Universal Journal migration, material ledger activation, etc.) that have multi-week remediation effort. Unknown items blow timelines. | Hard Gate: Readiness Check output must exist before Step 3. |
| Give a single timeline number | "The migration will take 12-18 months" | Timeline without custom code analysis is fiction. A client with 2,000 custom objects has a 6-month buffer where a 20,000-object client has an 18-month buffer for remediation alone. | Checklist Step 4: Decompose timeline by phase and by custom code remediation waves. |
| Ignore hyperscaler / hosting decision | "We can decide cloud vs on-premise later" | Hyperscaler selection affects licensing, BTP entitlements, network architecture, and go-live readiness. Deferring adds rework. | Checklist Step 2: Hosting decision inputs must be captured as part of the migration approach. |
| Understate selective data transition complexity | "Selective is the best of both worlds" | Selective data transition (also called Bluefield) requires specialized tooling, detailed data scoping, and expert execution. It is the most complex approach, not a compromise. | Checklist Step 3: Document selective approach prerequisites: tooling vendor, data scope, reconciliation plan. |
| Omit cutover complexity from the timeline | "Cutover is just the last few days" | S/4HANA cutovers involve data migration, balance carryforward, open document handling, and integration cutovers. Under-resourcing this phase causes go-live failures. | Checklist Step 5: Cutover window must be explicitly sized with dry run count. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "The client is a good candidate for greenfield..." → You have not checked simplification items or custom code volume. Stop.
- "We can do a quick brownfield migration and clean up later..." → 'Clean up later' is where migrations go to die. Stop.
- "Timeline is roughly X months..." → Roughly is not a timeline. Decompose by phase and custom code waves. Stop.
- "Custom code impact is probably manageable..." → Probably is not an analysis. Run custom code analysis. Stop.
- "We'll assess the Readiness Check later in Prepare..." → Later means you are recommending without data. Stop.
- "Selective gives them the best of both worlds..." → This phrase signals selective complexity is being understated. Stop.
- "TCO will be similar to current state..." → This claim requires a model. Build one. Stop.

## Hard Gates

<HARD-GATE>
DO NOT recommend a migration approach until ALL of the following exist:
1. SAP Readiness Check output (or equivalent documented landscape assessment) reviewed and simplification items catalogued by module
2. Custom code analysis completed: volume (line count and object count), category distribution (must-fix, should-fix, review), estimated remediation effort
3. Disruption tolerance documented: operational windows, parallel run feasibility, maximum cutover blackout window
4. Hosting model inputs captured: cloud vs on-premise, RISE vs own infrastructure, hyperscaler preference
5. Business driver documented: Is this migration about licensing deadline, cloud roadmap, process transformation, or all three?
</HARD-GATE>

## Checklist

### Step 1: Landscape and Business Driver Assessment
Establish the why and the what before the how.

- **Business Driver:** Deadline (ECC maintenance end), transformation initiative, cloud mandate, or cost optimization?
- **Current Landscape:** ECC version, support pack level, database type (AnyDB vs HANA), operating system
- **Module Footprint:** Which SAP modules are active, which are heavily customized, which are lightly used?
- **Organizational Scope:** Company codes, plants, countries, legal entities, languages
- **Integration Map:** Count and complexity of inbound/outbound interfaces. EDI, middleware, point-to-point.
- **Data Volume:** DB size, largest tables, archiving posture, data retention requirements

Evidence: Landscape summary document with all six categories populated.
Gate: Business driver is explicitly documented and agreed with the client stakeholder.

### Step 2: SAP Readiness Check and Simplification Item Analysis
Run or review SAP Readiness Check output.

- **Simplification Item Catalogue:** Export from Readiness Check. Group by: Mandatory remediation, Functional change, Performance change, Information only.
- **High-Impact Items:** Flag items that affect Universal Journal migration, Material Ledger activation, Business Partner migration, House Bank migration, Customer/Vendor Integration.
- **Module-Level Impact:** Score each module area: Green (minimal impact), Amber (moderate — 2-4 week remediation), Red (significant — 5+ weeks or process redesign required).
- **Custom Namespace Review:** List all Z/Y objects referenced in simplification items. These are the highest-risk items.

Evidence: Simplification item register with impact classification per module.
Gate: No module marked Red proceeds to approach decision without a specific remediation plan.

### Step 3: Custom Code Analysis
Quantify and categorize all custom development.

- **Total Object Count:** Programs, function modules, classes, BAdIs, enhancements, customer exits, SmartForms, Adobe forms, reports
- **ABAP Test Cockpit Results:** Run ATC with S/4HANA compatibility check profile. Classify findings: Errors (must fix), Warnings (should fix), Info (review)
- **Custom Code Volume by Module:** Assign objects to business areas. Identifies which workstreams carry the most remediation risk.
- **Remediation Effort Estimation:** Apply effort per finding category. Errors: 0.5-2 days average. Warnings: 0.25-1 day average. Aggregate by module.
- **Candidate for Retirement:** Identify objects that duplicate standard functionality now available in S/4HANA. Retirement reduces remediation scope.

Evidence: Custom code analysis report with object counts, ATC results, effort estimates by module, and retirement candidates.
Gate: Remediation effort estimate exists in days (not percentages) before timeline is built.

### Step 4: Migration Approach Selection
Select and justify the migration approach using all prior inputs.

**Greenfield (New Implementation):**
- Appropriate when: High simplification item count, high custom code debt, business process transformation desired, organization has capacity for re-implementation
- Risk: Loss of embedded business logic, higher project cost, longer timeline, change management intensity
- Indicator: More than 30% of custom objects are retirement candidates; major process redesign planned

**Brownfield (System Conversion):**
- Appropriate when: Low-to-medium simplification item count, manageable custom code remediation, business continuity is paramount, process designs are fit-for-purpose
- Risk: Technical debt migrates with the system, clean-core compliance requires post-migration remediation program
- Indicator: ATC error rate under 15% of total objects; organization cannot absorb full reimplementation

**Selective Data Transition (Bluefield/Mixed):**
- Appropriate when: Partial process redesign required, subset of data should not migrate, merger/demerger scenarios, specific legal entities or company codes need different treatment
- Risk: Most complex approach — requires specialist tooling (SNP, Natuvion, or equivalent), precise data scoping, reconciliation effort
- Prerequisites: Tooling vendor selected, data scope document signed off, reconciliation framework agreed

Evidence: Approach recommendation document with selection rationale mapped to Readiness Check and custom code analysis inputs.
Gate: Approach is backed by data from Steps 1-3, not stated as a default preference.

### Step 5: Timeline and Phasing Model
Build a phase-level timeline using custom code analysis as the primary variable.

Phase structure aligned to SAP Activate:
- **Prepare:** Environment setup, team onboarding, custom code freeze, governance
- **Explore:** Fit-to-Standard workshops, delta design, remediation backlog finalization
- **Realize:** Custom code remediation (Wave 1: mandatory fixes), configuration, integration build
- **Realize Extension:** Custom code remediation (Wave 2: warnings), unit testing, integration testing
- **UAT and Performance:** User acceptance testing, performance testing, cutover rehearsals
- **Deploy:** Cutover execution, go-live, hypercare

For each phase, provide:
- Duration in weeks (range: optimistic / realistic / pessimistic)
- Key dependencies and critical path items
- Resource requirements (FTE by role)
- Risks that would extend this phase

Evidence: Phase timeline table with week ranges, critical path identified, and at least 2 dry run cutover cycles planned.
Gate: Custom code remediation waves are sequenced and capacity-planned against available ABAP developer headcount.

### Step 6: TCO and Business Case
Build a 5-year TCO comparison.

- **Current State Costs:** ECC licensing, infrastructure, support, maintenance, custom code upkeep
- **Migration Investment:** Project cost (consulting, license, infrastructure, internal effort, change management)
- **Future State Costs (per approach):** S/4HANA licensing model (on-premise vs RISE/GROW), infrastructure (owned vs cloud), reduced customization maintenance
- **Risk-Adjusted Scenarios:** What does timeline overrun of 3 months cost? What is the cost of a failed cutover?
- **Break-Even Point:** When does cumulative benefit exceed migration investment?

Evidence: TCO comparison model with current state, migration investment, and 5-year future state for each migration approach option being considered.
Gate: Business case must show a positive NPV scenario within 5 years. If it does not, document why the migration is still required (regulatory, EOM support).

### Step 7: Generate Migration Strategy Document
Assemble the deliverable using the template below.

Evidence: Complete migration strategy document.
Gate: All Hard Gate conditions met and all six steps have documented evidence.

## Deliverable Template

```markdown
# S/4HANA Migration Strategy
**Client:** [Name]
**Date:** [Date]
**Prepared by:** [Consultant]
**Version:** [1.0]

## Executive Summary
[2-3 sentence summary: current state, recommended approach, headline timeline and investment]

## Landscape Assessment
### Current SAP Environment
| Parameter | Value |
|-----------|-------|
| ECC Version | |
| Database | |
| DB Size | |
| Active Modules | |
| Company Codes / Plants | |
| Integration Count | |

### Business Drivers
[Ranked list of drivers: compliance, transformation, cost, etc.]

## Simplification Item Analysis
| Module Area | Item Count | Mandatory Remediation | Effort Estimate | RAG |
|-------------|-----------|----------------------|-----------------|-----|

### Critical Simplification Items
[Detail the top 5 highest-impact items with remediation approach]

## Custom Code Analysis
| Metric | Value |
|--------|-------|
| Total Custom Objects | |
| ATC Errors (must fix) | |
| ATC Warnings (should fix) | |
| Retirement Candidates | |
| Estimated Remediation Effort | [days] |

### Custom Code by Module
[Table: module, object count, error count, remediation days]

## Migration Approach Recommendation
**Recommended Approach:** [Greenfield / Brownfield / Selective]

### Justification
[Structured rationale referencing simplification item data and custom code analysis]

### Approach Comparison
| Criterion | Greenfield | Brownfield | Selective |
|-----------|-----------|-----------|-----------|
| Timeline | | | |
| Cost | | | |
| Risk | | | |
| Business Disruption | | | |
| Clean Core Alignment | | | |

## Migration Timeline
| Phase | Duration | Key Deliverables | Dependencies |
|-------|----------|-----------------|--------------|
| Prepare | | | |
| Explore | | | |
| Realize (Wave 1) | | | |
| Realize (Wave 2) | | | |
| UAT | | | |
| Deploy | | | |

**Total Timeline:** [range] weeks
**Go-Live Target:** [date]
**Dry Run Cutovers:** [count]

## TCO Comparison
| Scenario | Year 1 | Year 2 | Year 3 | Year 5 | NPV |
|----------|--------|--------|--------|--------|-----|
| Current State (do nothing) | | | | | |
| Brownfield Migration | | | | | |
| Greenfield Migration | | | | | |

## Key Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|

## Assumptions
[Numbered list of all assumptions underpinning this strategy]

## Recommended Next Steps
[3-5 specific actions with owners and deadlines]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] SAP Readiness Check output reviewed and simplification items classified by module and RAG status
- [ ] Custom code analysis completed with object count, ATC results, and remediation effort in days
- [ ] Migration approach recommendation is backed by simplification item and custom code data (not stated as a default)
- [ ] Timeline is decomposed by phase with week ranges and custom code remediation waves sequenced
- [ ] TCO comparison exists for at least two approach options over a 5-year horizon
- [ ] Disruption tolerance documented and validated against proposed cutover window
- [ ] Migration strategy document generated using the deliverable template above

**Evidence required:** Migration strategy document with all sections populated, simplification item register, and custom code analysis report.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke one of:
- `activate-methodology` — When transitioning from strategy into project execution planning across SAP Activate phases
- `clean-core-strategy` — When the migration approach is confirmed and custom code remediation needs a long-term clean-core roadmap
- `rise-licensing` — When the hosting model decision (RISE vs own infrastructure) requires detailed commercial analysis

Conditions for handoff: Migration approach is agreed, timeline is approved by the client, and the project is moving into detailed project planning.

## Cross-References

- `activate-methodology` — For Activate phase gate criteria referenced in the timeline
- `clean-core-strategy` — For custom code remediation roadmap post-migration
- `rise-licensing` — For RISE with SAP commercial assessment
- `estimation` — For detailed effort estimation of individual workstreams
- `project-kickoff` — For project governance setup once approach is confirmed
