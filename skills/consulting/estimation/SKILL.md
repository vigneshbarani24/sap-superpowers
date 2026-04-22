---
name: estimation
description: Use when estimating effort, timelines, or complexity for SAP work items, sprints, phases, or full projects. Triggers on requests for hours, days, duration, cost, resource count, or project sizing.
persona: Project Manager, Solution Architect, Functional Consultant
phase: Prepare
---

# SAP Effort Estimation

This skill enforces decomposition-based, range-driven estimation for SAP work so that no single number, unsupported assumption, or unrisked commitment ever leaves this engagement.

## Iron Laws

1. **NEVER GIVE A SINGLE-POINT ESTIMATE.** Every estimate is a range: optimistic / realistic / pessimistic. A single number is a lie dressed as precision. The PM puts it in the plan. The client holds you to it. The project bleeds.
2. **NEVER ESTIMATE WITHOUT DECOMPOSITION.** "About 30 days for FI" is not an estimate. A table of work packages with individual three-point assessments is an estimate. If it is not decomposed, it is a guess.
3. **NEVER ESTIMATE WITHOUT STATING ASSUMPTIONS.** Every assumption that underpins an estimate must be written down before the numbers are produced. Hidden assumptions become blown budgets. If you have not listed them, you have not controlled them.
4. **ALWAYS INCLUDE A RISK BUFFER.** 10% minimum, 30% for high-uncertainty work. Saying "no contingency needed" means you have not identified the unknowns. There are always unknowns in SAP projects.
5. **TESTING IS NEVER INCLUDED IN DEVELOPMENT.** Testing effort is 30–40% of SAP delivery. Embedding it in development effort hides it until it is too late to resurface. It must be its own line.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Give a single number | "The user asked 'how long will this take?' — they want one answer" | Single numbers become commitments. The PM puts them in the Gantt chart. The client uses them in contracts. Ranges force an honest conversation about uncertainty. | Iron Law 1: Always three-point. If the user insists on one number, give the realistic estimate with explicit written caveats. |
| Skip work package decomposition | "The scope is clear enough for a top-down estimate" | Top-down estimates miss hidden complexity: legacy data cleanup, authorization design, integration mapping, transport management. Each of these can double a phase estimate. | Iron Law 2: WBS first. Every process area gets its own row before any numbers are written. |
| Skip complexity factors | "The work is straightforward" | 'Straightforward' SAP work has a 40-60% overrun rate when complexity factors are not applied. Customization depth, team experience, and integration count multiply base effort materially. | Checklist Step 3: Apply all five complexity factors to every work package. If all factors score 1.0×, provide written justification. |
| Merge testing into development | "Testing is implicit in the development estimate" | Testing is 30–40% of SAP delivery. When it is hidden, it gets cut under time pressure. Then it happens anyway — in production. | Iron Law 5: Testing is a mandatory separate line item in every work package. |
| Omit training and cutover effort | "We're estimating development, not the full project" | Training, cutover prep, and hypercare are 20–30% of total project cost. Omitting them produces estimates that look lean until Realize when the full picture emerges and the budget is already committed. | Checklist Step 2: Six effort categories are mandatory: Build, Test, Data Migration, Integration, Training, Project Management. |
| Skip risk identification | "We can handle risks as they come" | Unidentified risks become 'surprises' that justify emergency change requests. Clients lose trust. Budgets collapse. Identify them now and quantify their day-impact. | Checklist Step 5: Minimum 3 estimation risks with quantified day-impact and a named contingency allocation. |
| Apply calendar days = working days | "The user asked for a timeline, so I'll use working days" | SAP consultants attend workshops, prepare for calls, review designs, handle environment issues, and wait on approvals. Utilization on a project is typically 60–70% of calendar days. | Template: calendar-day conversion uses a 0.65 utilization factor by default. State the factor explicitly. |
| Anchor to a previous project | "We estimated similar work at 40 days on the last project" | Different client, different legacy landscape, different team, different SAP release. Analogical estimates without documented similarity criteria are guesses with false authority. | Red Flag trigger: "Based on similar projects..." → State the similarity criteria explicitly or do not use the analogy. |

---

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "This should take about..." → You are about to give a single number. Stop. Decompose first.
- "It's pretty straightforward..." → You have not assessed complexity factors. Stop.
- "I'll include testing in the dev estimate..." → Testing is always a separate line item. Stop.
- "Roughly..." → Rough is not an estimate. Decompose into work packages.
- "Based on similar projects..." → Similar ≠ same. Apply this project's complexity factors.
- "Let me give a quick sizing first..." → Quick sizing becomes the commitment. Do it right the first time.
- "No contingency needed here..." → This means you have not identified the unknowns. Stop.
- "We can tighten the estimate later..." → Later means after the budget is locked. Tighten it now.

---

## Hard Gates

<HARD-GATE>
DO NOT produce an effort estimate until ALL of the following exist:
1. Work breakdown structure with named work packages (minimum one per SAP module/workstream in scope)
2. Three-point values (optimistic / realistic / pessimistic) for every work package
3. All five SAP complexity factors assessed for every work package
4. All six effort categories populated (Build, Test, Data Migration, Integration, Training, Project Management)
5. All estimating assumptions documented
6. Risk buffer explicitly calculated and stated as a percentage and day count
</HARD-GATE>

---

## Checklist

### Step 1: Define the Estimation Scope
Before producing any numbers, confirm what is being estimated:

- **Work scope:** Which SAP modules, processes, and org entities are in scope?
- **Estimation horizon:** Is this a full project, a phase, a sprint, or a work package?
- **Team profile:** Onshore / offshore / mixed? Experience level (senior / mid / junior)?
- **Delivery model:** Agile / Waterfall / SAP Activate hybrid?
- **Environment assumptions:** Are development, test, and production systems available?

Evidence: Scope statement with all five items confirmed.
Gate: All five scope parameters are defined before any decomposition begins.

### Step 2: Build the Work Breakdown Structure (WBS)
Decompose scope into estimable work packages:

**Mandatory WBS categories:**

| Category | Examples |
|----------|---------|
| **Build** | Configuration, development (ABAP, CDS, RAP, BTP), customization |
| **Test** | Unit test, integration test, UAT, regression (never merge with Build) |
| **Data Migration** | Extraction, transformation, load, validation, legacy decommission |
| **Integration** | Interface design, development, testing, monitoring setup |
| **Training** | Materials, delivery, train-the-trainer, e-learning |
| **Project Management** | Workshops, status reporting, governance, cutover coordination |

For each work package, capture: Name, Module/Workstream, Owner Role, Dependencies.

Evidence: WBS table with at least one row per SAP module in scope and all six categories represented.
Gate: No work package is labelled "Miscellaneous" or "TBD." Every row has a named owner role.

### Step 3: Apply SAP Complexity Factors
Adjust base effort using the five SAP-specific complexity multipliers:

| Complexity Factor | Low (0.8×) | Medium (1.0×) | High (1.3×) | Very High (1.6×) |
|------------------|-----------|--------------|------------|-----------------|
| **Customization Ratio** | Standard config only | Minor config changes | Moderate custom dev | Heavy Z-code / BAdIs |
| **Data Migration Volume** | < 10K records, clean data | 10K–100K records | 100K–1M records, dirty data | > 1M records, complex transformation |
| **Integration Count** | 0–2 interfaces | 3–5 interfaces | 6–10 interfaces | 11+ interfaces, real-time |
| **Team Experience** | Team has done this 5+ times | Team has done this 2–4 times | First time for most team members | First SAP project for team |
| **Requirements Clarity** | Fully documented, signed off | Mostly documented, minor gaps | High-level only, key gaps | Undefined, frequent change |

**Composite Score Calculation:**
- Multiply the five factor scores together (or take the average — document which method you used)
- Apply the composite score to the base effort per work package
- If any single factor scores 1.6×, flag it in the risk section

Evidence: Complexity factor table with a score for every factor for every major work package.
Gate: No work package carries a complexity score of 1.0× without a written justification.

### Step 4: Apply Three-Point Estimation
For every work package, produce three values:

| Value | Definition | Typical Relationship |
|-------|-----------|---------------------|
| **Optimistic (O)** | Everything goes right: full requirements, experienced team, no surprises | 60–70% of Realistic |
| **Realistic (R)** | Normal conditions: some ambiguity, some rework, some waiting | Your complexity-adjusted estimate |
| **Pessimistic (P)** | Known risks materialize: scope grows, team issues, environment delays | 140–160% of Realistic |

**PERT Formula for Expected Value:**
> Expected = (O + 4R + P) / 6

**Range to present:** Present as `O–P days` with the PERT Expected value as the "most likely" scenario.

Evidence: Three-point table with O, R, P, and PERT Expected for every work package.
Gate: Pessimistic value for no work package is less than 130% of the Realistic value.

### Step 5: Identify Estimation Risks
List factors that could invalidate the estimate:

Each risk must include:
- **Risk Name:** Specific — not "resource risk" but "FI lead unavailable during Explore workshops"
- **Probability:** H / M / L
- **Day Impact:** Estimated additional days if risk materializes
- **Contingency Allocation:** Percentage added to affected work packages

Evidence: Risk table with minimum 3 SAP-specific estimation risks, each with a day-impact figure.
Gate: Total contingency percentage is explicitly stated (minimum 10%, maximum 30% unless justified).

### Step 6: Convert to Calendar Timeline
Translate effort days to calendar dates:

- **Utilization factor:** Default 0.65 (consultants are available ~65% of calendar days on active projects)
- **Parallelism:** Which work packages can run in parallel? Which are sequential dependencies?
- **Milestone mapping:** Map effort to SAP Activate phase boundaries

Formula: `Calendar Days = (Effort Days / Team Size) / Utilization Factor`

Evidence: Timeline table mapping work packages to SAP Activate phases with start/end dates.
Gate: The utilization factor used is stated explicitly.

### Step 7: Produce the Effort Estimate Deliverable
Assemble all outputs into the template below.

Evidence: Complete effort estimate document with all sections populated.
Gate: All Hard Gate conditions are confirmed before proceeding.

---

## Deliverable Template

```markdown
# SAP Effort Estimate

## Estimate Header
- **Project / Scope:**
- **SAP Product / Release:**
- **Estimation Date:**
- **Prepared By:**
- **Estimation Method:** Three-Point / PERT
- **Validity Period:** [Date after which the estimate requires re-baselining]

## Estimating Assumptions
[List every assumption. If an assumption proves wrong, the estimate is invalid.]
1.
2.
3.

## Work Breakdown Structure with Effort

| Work Package | Module / Workstream | Category | Owner Role | Optimistic (d) | Realistic (d) | Pessimistic (d) | PERT Expected (d) | Complexity Score |
|-------------|--------------------|---------|-----------:|---------------:|--------------:|----------------:|------------------:|-----------------|
| [Name]      | [Module]           | Build   | [Role]     | [O]            | [R]           | [P]             | [(O+4R+P)/6]      | [x.x×]          |

**Category Subtotals**
| Category | PERT Expected Days |
|----------|--------------------|
| Build | |
| Test | |
| Data Migration | |
| Integration | |
| Training | |
| Project Management | |
| **Subtotal** | |
| Risk Contingency ([X]%) | |
| **Total Estimate** | |

## Complexity Factor Assessment

| Work Package | Customization | Data Migration | Integration Count | Team Experience | Requirements Clarity | Composite |
|-------------|:-------------:|:--------------:|:-----------------:|:---------------:|:--------------------:|:---------:|

## Estimation Risks

| Risk | Probability | Day Impact | Contingency Allocation |
|------|:-----------:|----------:|----------------------|
| | | | |

**Total Contingency:** [X]% = [Y] days

## Timeline Summary

| SAP Activate Phase | Work Packages | Effort (PERT) | Calendar Days | Start | End |
|-------------------|--------------|-------------:|-------------:|-------|-----|
| Prepare | | | | | |
| Explore | | | | | |
| Realize | | | | | |
| Deploy | | | | | |
| Run (Hypercare) | | | | | |

**Utilization Factor Applied:** [0.65 / other — state justification]
**Team Size Assumed:** [number of consultants]

## Estimate Range Summary
| Scenario | Total Days | Calendar Duration | Interpretation |
|----------|----------:|------------------:|---------------|
| Optimistic | | | All assumptions hold, no risks materialize |
| PERT Expected | | | Normal conditions, standard risks |
| Pessimistic | | | Key risks materialize, scope ambiguity increases |

## Open Items That Will Change This Estimate
| Item | Impact if Unresolved | Owner | Due Date |
|------|---------------------|-------|----------|
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] WBS has at least one row per SAP module/workstream in scope
- [ ] All six effort categories (Build, Test, Data Migration, Integration, Training, PM) are populated separately
- [ ] Every work package has three-point values (O, R, P) and PERT Expected
- [ ] All five complexity factors are scored for every major work package
- [ ] Testing effort is a separate line item — not embedded in Build
- [ ] Estimating assumptions are listed explicitly (minimum 3)
- [ ] Estimation risks are listed with day-impact figures (minimum 3)
- [ ] Risk contingency percentage is stated and justified
- [ ] Calendar timeline uses an explicit utilization factor
- [ ] Estimate range summary shows Optimistic, PERT Expected, and Pessimistic totals

**Evidence required:** Completed effort estimate document with all sections populated and no placeholder values in numeric cells.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

---

## Next Skill

After completing this skill, invoke one of:
- `solution-architecture` — When the estimate is part of a solution design that needs architecture validation
- `fit-gap-analysis` — When the estimate is being built ahead of Explore phase and gaps are not yet quantified

Conditions for handoff: The effort estimate is complete and the project is moving from Prepare into Explore, or from Explore into Realize where estimates need to be refined against confirmed gaps.

---

## Cross-References

- `project-kickoff` — The project charter (from kickoff) defines the scope input for this estimate
- `fit-gap-analysis` — Gap resolution strategies (configure / extend / custom) drive effort by gap
- `brainstorming` — T-shirt sizing from brainstorming feeds into the WBS as preliminary estimates
- `solution-architecture` — Architecture decisions (BTP extensions, integration patterns) affect complexity factors
- `sap-estimator` agent — Dispatch for deep effort decomposition when scope spans 5+ modules
