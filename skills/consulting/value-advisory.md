---
name: value-advisory
description: Use when building a business case, calculating ROI or TCO, quantifying SAP project benefits, validating savings claims, or producing value realization frameworks for any SAP investment decision.
persona: Value Advisor, Solution Architect, Project Manager
phase: Discover / Prepare
---

# SAP Value Advisory

This skill enforces evidence-based business case construction so that no SAP investment claim is made without a quantification methodology, a current-state cost baseline, and explicit separation of hard savings from soft benefits — the three shortcuts that produce business cases that collapse under scrutiny.

## Iron Laws

1. **NEVER CLAIM SAVINGS WITHOUT A QUANTIFICATION METHODOLOGY.** Saying "this will reduce processing time by 40%" without documenting how that 40% was calculated is not a business case — it is a sales pitch. Every savings claim must reference its calculation method, data source, and assumptions.
2. **ALWAYS SEPARATE HARD SAVINGS FROM SOFT BENEFITS.** Hard savings (headcount reduction, license cost elimination, error fine avoidance) are fundable. Soft benefits (improved visibility, better decisions, employee satisfaction) are not budgetable. Mixing them inflates business cases and destroys credibility when audited.
3. **NEVER SKIP CURRENT-STATE COST BASELINE.** A business case without a current-state baseline has no reference point. "We will save X" is meaningless without "we currently spend Y." The baseline is the foundation — without it the business case is fiction.
4. **TCO INCLUDES TOTAL COST.** Total Cost of Ownership must include: software licensing, implementation, infrastructure, integration, training, change management, ongoing support, and upgrade costs. A TCO that omits categories is not a TCO — it is a partial cost.
5. **BENEFIT CLAIMS REQUIRE EVIDENCE.** Industry benchmarks may support a claim but cannot be the only source. Every major benefit must be validated against client-specific data: process volumes, FTE counts, error rates, cycle times measured in this organization.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Use industry benchmark savings without client data | "Gartner says SAP reduces DSO by 15%" | Industry averages mask enormous variance. A well-run finance team may already be at benchmark. Applying average savings to a best-practice organization produces a fraudulent business case. | Iron Law 5: Every major benefit must include at least one client-specific data point (actual cycle time, actual FTE cost, actual error rate). |
| Combine hard and soft benefits in one total | "The combined value is $X million" | Finance teams immediately ask "how much is hard vs. soft?" If the answer embarrasses the business case, the case is built on soft ground. | Iron Law 2: Hard and soft benefits always reported separately, never combined into a single headline number. |
| Skip the investment cost section | "The client knows the implementation costs" | Clients systematically underestimate change management, training, and ongoing support costs. A business case that shows only benefits without full TCO is misleading and damages trust. | Iron Law 4: TCO section is mandatory. Every cost category must be addressed — even if the answer is $0. |
| Build the business case top-down from a target | "The sponsor wants to see $10M savings" | Top-down business cases reverse-engineer justifications for a predetermined conclusion. They collapse the moment a skeptic asks "where does that number come from?" | Checklist Step 2: Build bottom-up from measured baseline. Never start from a target and work backwards. |
| Use vague benefit language | "Improved efficiency and reduced manual effort" | Vague benefits cannot be tracked or audited. When value realization reviews happen 12 months post-go-live, unmeasured benefits are always deemed "not achieved." | Every benefit must have a baseline metric, target metric, measurement method, and measurement owner. |
| Ignore payback period and NPV | "The ROI is clearly positive" | ROI without time dimension is incomplete. A 200% ROI over 10 years may be inferior to a 50% ROI in 18 months depending on the organization's hurdle rate. | Checklist Step 5: Financial model must include payback period, NPV at 3 and 5 years, and IRR. |
| Claim FTE savings without workforce plan | "We will save 5 FTEs" | FTE "savings" that result in retained headcount doing lower-value work are not savings — they are redeployments. Actual savings require a workforce plan showing what happens to those FTEs. | Hard Gate: FTE savings claims must specify: reduction, redeployment to higher-value work, or natural attrition — not all three can be claimed simultaneously. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "Based on industry benchmarks, this will save..." → You have not validated against client data. Stop.
- "The total value of this project is $X..." → Have you separated hard from soft? Stop.
- "Improved efficiency will..." → How much improvement? How measured? What is the baseline? Stop.
- "The ROI is clearly significant..." → ROI is a number, not an adjective. Calculate it. Stop.
- "We can quantify this more precisely later..." → A business case submitted without quantification cannot be recalled after approval. Stop.
- "The client already knows what this costs..." → Document the TCO regardless. Stop.
- "This benefit is hard to measure so we'll note it qualitatively..." → Hard to measure is not unmeasurable. Estimate it with ranges and state assumptions. Stop.
- "Similar companies have achieved..." → This company is not similar companies. Validate against this organization's data.

## Hard Gates

<HARD-GATE>
DO NOT produce benefit claims or ROI calculations until ALL of the following exist:
1. Current-state cost baseline documented with data sources named (not estimated without evidence)
2. Process volumes measured: transaction counts, FTE hours, error rates, cycle times for this organization
3. Hard savings and soft benefits listed separately with calculation methodology for each
4. Full TCO documented including implementation, licensing, infrastructure, support, and change management
5. FTE savings claims accompanied by workforce disposition plan (reduction / redeployment / attrition)
6. At least one client-specific data point per major benefit (no pure benchmark-only claims)
</HARD-GATE>

## Checklist

### Step 1: Current-State Cost Baseline
Before claiming any benefit, measure the current state:

- **Process FTE Costs:** Name the processes, count the FTEs, apply fully-loaded cost rates (salary + benefits + overhead)
- **Error and Rework Costs:** Error rates × cost-to-fix per occurrence × annual volume
- **Cycle Time Costs:** Time-value of slow processes (DSO impact on working capital, late payment penalties, compliance delays)
- **Technology Costs:** Current software licensing, maintenance, infrastructure, and support — system by system
- **Compliance and Risk Costs:** Fines incurred, audit findings, insurance costs attributable to current-state gaps
- **Opportunity Costs:** Revenue lost due to process delays, customer churn from service failures, market opportunities missed

Evidence: Baseline cost table with data source cited for each line item (not "estimated" without method).
Gate: At least 3 cost categories have client-provided or system-extracted data — not analyst estimates alone.

### Step 2: Benefit Identification and Classification
Identify all benefits and classify them rigorously:

**Hard Benefits (fundable — can be committed to finance):**
- Headcount reduction (with workforce plan)
- License cost elimination (named systems being decommissioned)
- Infrastructure cost reduction (servers, data centers, hardware)
- Error fine and penalty avoidance (named regulatory fine, named occurrence rate)
- Interest income from working capital improvement (DSO × outstanding AR × cost of capital)

**Soft Benefits (real but not budgetable):**
- Decision-making quality improvement
- Employee satisfaction and retention
- Customer experience improvement
- Faster time-to-market
- Strategic agility and flexibility

**Risk Reduction Benefits (quantifiable with probability weighting):**
- Audit finding probability × average fine × probability reduction from control improvement
- Security breach cost × breach probability × probability reduction from new security controls
- Regulatory non-compliance cost × occurrence probability × reduction from automation

Evidence: Benefit register with each benefit classified as Hard / Soft / Risk Reduction.
Gate: Hard benefits total is presented separately from Soft benefits total in all outputs.

### Step 3: Quantification Methodology
For every hard benefit and risk reduction benefit, document the calculation:

**Methodology Template per Benefit:**
- **Benefit Name:** Specific, not generic
- **Calculation Formula:** The exact math
- **Data Inputs:** Each variable in the formula with its source (client system, client HR data, SAP benchmark — state which)
- **Assumptions:** What must be true for this calculation to hold
- **Sensitivity:** What happens to the benefit if a key assumption changes by ±20%?
- **Measurement Method:** How will actual realization be measured post-go-live?
- **Measurement Owner:** Name the role responsible for tracking this benefit

Evidence: Quantification worksheet with all 7 attributes per hard benefit.
Gate: No hard benefit is presented to the client without a completed quantification worksheet.

### Step 4: Total Cost of Ownership Model
Build a complete TCO covering all cost phases:

**Implementation Costs (one-time):**
- SAP licensing: initial purchase or cloud subscription setup costs
- Implementation services: internal FTEs and SI partner fees by phase
- Infrastructure: hardware, cloud infrastructure, network, environments
- Data migration: extraction, cleansing, transformation, load, validation
- Integration: interface build, testing, middleware configuration
- Training: content development, delivery, LMS, materials
- Change management: OCM consultants, communication, user adoption programs
- Testing: test management, test execution, UAT coordination

**Ongoing Costs (annual recurring):**
- SAP maintenance and support fees (RISE/GROW subscription or AMS contract)
- Infrastructure operations and monitoring
- Functional support: helpdesk, super-user network, ongoing configuration changes
- Enhancement and development: continuous improvement budget
- Upgrade and patch management
- Security and compliance reviews

Evidence: TCO model with all categories populated. Omitted categories must be explicitly noted as $0 with justification.
Gate: TCO covers a minimum 5-year horizon. TCO without a multi-year view is not a TCO.

### Step 5: Financial Model
Assemble the business case financial model:

**Metrics to calculate:**
- **Payback Period:** When cumulative hard savings exceed total TCO investment
- **ROI (3-year):** (Total 3-year hard savings − 3-year TCO) / 3-year TCO × 100%
- **ROI (5-year):** Same formula over 5 years
- **NPV (3-year):** Net present value using client's hurdle rate or WACC
- **NPV (5-year):** Same
- **IRR:** Internal rate of return for the investment
- **Break-Even Year:** When cumulative hard benefits exceed cumulative TCO in each year

**Scenario Analysis:**
- **Conservative:** 70% of projected hard benefits achieved, 10% cost overrun
- **Base Case:** 100% of projected hard benefits, planned TCO
- **Optimistic:** 120% of projected hard benefits, 5% efficiency in delivery

Evidence: Financial model spreadsheet or structured table with all metrics across 3 scenarios.
Gate: Financial model is presented as a range across scenarios — never a single-point figure.

### Step 6: Value Realization Framework
Define how benefits will be tracked after go-live:

For each major hard benefit:
- **KPI Name:** Measurable metric (e.g., Days Sales Outstanding, Invoice Processing Cost per Invoice)
- **Baseline Value:** Current measured state
- **Target Value:** Post-go-live target with timeline
- **Measurement Frequency:** Monthly / Quarterly
- **Data Source:** Which SAP report, analytics dashboard, or external system provides this metric
- **Accountability:** Which business role owns hitting this target
- **Review Gate:** 3-month, 6-month, 12-month post-go-live review checkpoints

Evidence: Value realization tracking table with all KPIs, baselines, and targets.
Gate: Every major hard benefit has at least one KPI with a named measurement owner.

### Step 7: Generate Business Case Document
Assemble all sections into the deliverable template below.

## Deliverable Template

```markdown
# SAP Business Case

## Executive Summary
- **Investment:** [Total TCO — 5 year]
- **Hard Benefits (5-year):** [Hard savings only]
- **Soft Benefits (5-year):** [Separate line — not added to hard]
- **Payback Period:** [Months to break-even on hard savings]
- **5-Year ROI:** [Hard savings ROI only]
- **5-Year NPV:** [At [X]% hurdle rate]
- **Recommendation:** [Proceed / Conditional / Do Not Proceed] with rationale

## Current-State Cost Baseline
### Process Costs
| Process | FTEs | Fully-Loaded Rate | Annual Cost | Data Source |
|---------|------|------------------|-------------|-------------|

### Technology Costs
| System | License Cost | Support Cost | Infrastructure | Total Annual | Notes |
|--------|-------------|-------------|----------------|-------------|-------|

### Error, Rework, and Compliance Costs
| Cost Category | Annual Cost | Calculation Basis | Data Source |
|---------------|-------------|------------------|-------------|

**Total Current-State Annual Cost: $[X]**

## Benefits Register
### Hard Benefits (Fundable)
| # | Benefit | Annual Value | Calculation Method | Data Source | Measurement KPI |
|---|---------|-------------|-------------------|-------------|----------------|

**Total Hard Benefits (Annual): $[X]**
**Total Hard Benefits (5-Year): $[X]**

### Soft Benefits (Non-Budgetable)
| # | Benefit | Qualitative Description | Indicative Range | Notes |
|---|---------|------------------------|-----------------|-------|

### Risk Reduction Benefits
| # | Risk Reduced | Probability Reduction | Annual Value | Calculation |
|---|-------------|----------------------|--------------|-------------|

## Total Cost of Ownership
### Implementation Costs (One-Time)
| Category | Cost | Notes |
|----------|------|-------|

### Annual Recurring Costs
| Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|----------|--------|--------|--------|--------|--------|

**5-Year TCO: $[X]**

## Financial Summary
| Metric | Conservative | Base Case | Optimistic |
|--------|-------------|-----------|-----------|
| Payback Period | | | |
| 3-Year ROI | | | |
| 5-Year ROI | | | |
| 5-Year NPV | | | |
| IRR | | | |

## Key Assumptions
| # | Assumption | Impact if Wrong | Confidence |
|---|-----------|----------------|------------|

## Value Realization Framework
| KPI | Baseline | Target | Timeline | Data Source | Owner | Review Cadence |
|-----|----------|--------|----------|-------------|-------|----------------|

## Recommendation
[Structured narrative: investment rationale, key value drivers, critical success factors, risk to value]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Current-state cost baseline has at least 3 categories with client-provided or system-extracted data
- [ ] Hard benefits and soft benefits are listed in completely separate sections — never combined
- [ ] Every hard benefit has a calculation formula, data source, and assumption list
- [ ] FTE savings claims include a workforce disposition plan (reduction / redeployment / attrition)
- [ ] TCO covers all mandatory categories over a minimum 5-year horizon
- [ ] Financial model presents payback period, ROI, and NPV across 3 scenarios (conservative / base / optimistic)
- [ ] Value realization framework assigns a named KPI owner to every major hard benefit
- [ ] Business case headline figure uses hard savings only — soft benefits are shown separately
- [ ] Every major benefit has at least one client-specific data point (not benchmark-only)

**Evidence required:** Complete business case document with quantification worksheets. No benefit presented with only industry benchmark support and no client data.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke one of:
- `project-kickoff` — When the business case is approved and the project needs to be formally initiated
- `solution-architecture` — When the approved investment scope needs to be translated into a technical design

Conditions for handoff: Business case is reviewed by the client's finance or investment committee, and a Go / No-Go decision has been made on the SAP investment.

## Cross-References

- `brainstorming` — For identifying solution options whose value needs to be quantified
- `estimation` — For implementation cost inputs to the TCO model
- `project-kickoff` — For incorporating the business case into the project charter
- `change-management` — For quantifying change management as a TCO cost category
- `sap-value-calculator` agent — For automated benefit calculation assistance
