---
name: brainstorming
description: Use when eliciting requirements, mapping business processes, analyzing pain points, generating solution options, or conducting structured ideation for SAP implementations. Triggers on brainstorm, ideation, requirements gathering, process mapping, or pain point analysis.
persona: Solution Architect, Functional Consultant, BTP Developer
phase: Discover / Explore
---

# SAP Solution Brainstorming

This skill enforces structured, evidence-based brainstorming for SAP solutions so that no ideation session produces untethered ideas without feasibility assessment, SAP standard alignment, and clean core impact analysis.

## Iron Laws

1. **NO IDEAS WITHOUT CONTEXT.** Before generating solutions, the current state must be documented. Pain points without process context produce solutions that solve the wrong problem.
2. **NO SOLUTION WITHOUT SAP STANDARD CHECK.** Every proposed solution must first be evaluated against SAP Best Practice content and Fit-to-Standard processes. Reinventing what SAP already provides is waste.
3. **NO CUSTOM WITHOUT JUSTIFICATION.** Any idea requiring custom development (Z-code, BAdI, BTP extension) must include a written justification for why SAP standard or configuration cannot meet the need. Clean core is the default.
4. **NO IDEA WITHOUT FEASIBILITY.** "Wouldn't it be great if..." is not a solution. Every idea must include: effort estimate (T-shirt size), technical feasibility, clean core impact, and dependency list.
5. **NO BRAINSTORM WITHOUT PRIORITIZATION.** An unranked list of 20 ideas is not actionable. Every session ends with a prioritized shortlist using value vs. effort scoring.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Jump straight to solutions | "The user described the problem clearly" | User-described problems often describe symptoms, not root causes. The real issue may be process, not system. | Checklist Step 1: Document current state BEFORE generating any solutions. |
| Suggest custom development first | "SAP standard can't do this" | 70% of "SAP can't do this" claims fail under scrutiny. New S/4HANA capabilities, Fiori apps, and BTP services often cover the need. | Iron Law 3: Check SAP standard first. Document the specific gap before proposing custom. |
| Generate a flat list of ideas | "More ideas = better brainstorm" | Flat lists overwhelm decision-makers. Without prioritization, teams pursue the exciting idea, not the valuable one. | Iron Law 5: Must produce a 2x2 prioritization matrix (value vs. effort). |
| Skip feasibility assessment | "We're just brainstorming, details come later" | Infeasible ideas that survive brainstorming consume weeks of detailed design before being killed. Kill early. | Iron Law 4: T-shirt size + feasibility flag for every idea. |
| Ignore integration implications | "That's a detail for the architects" | Solutions that don't consider integration fail during Realize. An idea that requires 5 new interfaces is not a "simple" solution. | Checklist Step 4: Every solution must list integration touchpoints. |
| Propose without considering clean core | "Clean core is aspirational, not mandatory" | SAP's lifecycle management, upgrades, and cloud transition require clean core. Extensions outside the boundary create tech debt that compounds. | Iron Law 3: Clean core impact is mandatory for every custom proposal. |
| Accept the first workable solution | "This meets the requirements" | The first workable solution is rarely the best. It anchors thinking and prevents better alternatives from emerging. | Checklist Step 3: Minimum 3 solution options per major requirement. |
| Mix strategic and tactical ideas | "All ideas are valid in brainstorming" | Mixing "move to S/4HANA Cloud" with "add a custom report field" confuses scope. Different horizons need separate treatment. | Checklist Step 2: Categorize requirements by horizon (quick win / project scope / roadmap). |
| Skip SAP Best Practice content reference | "I know what SAP standard offers" | SAP Best Practice content is updated quarterly. Agent knowledge of SAP standard may be outdated or incomplete. | Iron Law 2: Name the specific SAP Best Practice process or Fiori app that was checked. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "The obvious solution here is..." → You have not explored alternatives. Stop.
- "SAP can't do this out of the box..." → Have you checked S/4HANA 2023+, BTP services, and Fiori app library? Stop.
- "Let's just list all the ideas first and prioritize later..." → Later means never. Prioritize as you go. Stop.
- "This would require a small custom development..." → Small custom = tech debt. Justify against clean core. Stop.
- "The user knows their process..." → Users know their workarounds, not necessarily the optimal process. Validate. Stop.
- "We can figure out integration later..." → Integration is architecture. It affects feasibility now. Stop.
- "This is just an initial brainstorm..." → Every brainstorm output gets forwarded to decision-makers. Make it rigorous. Stop.
- "Based on similar implementations..." → Similar is not identical. This client's landscape matters. Stop.

## Hard Gates

<HARD-GATE>
DO NOT generate solution recommendations until ALL of the following exist:
1. Current state documented: existing process, systems involved, pain points with business impact
2. Requirements categorized by type (functional, technical, compliance, UX) and horizon (quick win, project, roadmap)
3. SAP standard options checked for each major requirement (name the specific Fiori app, Best Practice process, or BTP service)
4. Minimum 3 solution options generated for each major requirement area
5. Each option assessed for: T-shirt effort, clean core compliance, integration impact, technical feasibility
</HARD-GATE>

## Checklist

### Step 1: Current State Documentation
Before any solution ideation, capture:

- **Business Process:** Name the end-to-end process (e.g., Procure-to-Pay, Order-to-Cash, Record-to-Report)
- **Current Systems:** What systems execute this process today? SAP ECC? Legacy? Manual?
- **Pain Points:** Specific, quantified where possible ("month-end close takes 12 days" not "month-end is slow")
- **Workarounds:** What manual steps or shadow IT systems exist? These reveal where SAP standard failed or was misconfigured.
- **Business Impact:** Revenue at risk, compliance exposure, FTE cost of manual processes, customer satisfaction impact
- **Process Volumes:** Transaction counts, user counts, data volumes — these drive architecture decisions

Evidence: Current state summary with all 6 categories populated.
Gate: At least 3 pain points with quantified business impact before proceeding.

### Step 2: Requirement Categorization
Organize requirements into actionable categories:

**By Type:**
- **Functional:** Business process requirements (what the system must do)
- **Technical:** Performance, scalability, availability, security requirements
- **Compliance:** Regulatory, audit, data residency requirements
- **UX:** User experience, mobile access, role-based UI requirements

**By Horizon:**
- **Quick Win:** Achievable with configuration or existing Fiori apps in < 2 weeks
- **Project Scope:** Requires design, build, test within the current project timeline
- **Roadmap:** Strategic items for future phases or projects

Evidence: Categorized requirement list with type and horizon tags.
Gate: Every requirement has both a type and horizon assignment.

### Step 3: SAP Standard Exploration
For each major requirement, systematically check:

1. **SAP Best Practice Content:** Does a pre-configured process exist? (Reference by scope item ID, e.g., J58 for Asset Accounting)
2. **Fiori App Library:** Is there a standard Fiori app? (Reference by app ID, e.g., F0731 for Manage Journal Entries)
3. **S/4HANA Simplification:** Has S/4HANA simplified or automated this? (Reference the simplification item)
4. **BTP Services:** Does a BTP service cover this? (SAP Build Work Zone, Integration Suite, AI services)
5. **SAP Notes / KBAs:** Are there relevant SAP Notes that address the requirement?

Evidence: SAP standard assessment table with specific app IDs, scope items, or service names per requirement.
Gate: Every major requirement has a documented SAP standard check (even if the answer is "no standard solution exists").

### Step 4: Solution Option Generation
For each major requirement area, generate minimum 3 options:

**Option Types (in preference order):**
1. **Configure:** SAP standard configuration (IMG, Fiori config apps)
2. **Extend (In-App):** Key User Extensibility, Custom Fields, Custom Logic (clean core tier 1)
3. **Extend (Side-by-Side):** BTP extension using SAP Cloud SDK / CAP (clean core tier 2)
4. **Integrate:** Third-party solution connected via Integration Suite
5. **Custom Develop:** Z-code / custom RAP BO (clean core tier 3 — requires strong justification)

For each option, assess:
- **Effort:** T-shirt size (XS/S/M/L/XL) with day-range mapping
- **Clean Core Impact:** Tier 1 (in-boundary) / Tier 2 (side-by-side) / Tier 3 (custom, requires review)
- **Integration Points:** Systems and interfaces affected
- **Technical Feasibility:** Confirmed viable / Needs POC / High risk
- **Upgrade Safety:** Will this survive an S/4HANA upgrade without rework?
- **Dependencies:** What must exist first (other config, master data, authorizations)

Evidence: Solution options table with all assessments per option.
Gate: Minimum 3 options per major requirement area. At least 1 option must be SAP standard or configuration.

### Step 5: Prioritization Matrix
Score and rank all solutions using a value-vs-effort matrix:

**Value Score (1-5):**
- 5: Eliminates critical pain point, measurable ROI, affects 100+ users
- 3: Improves efficiency, moderate user impact
- 1: Nice-to-have, limited user impact

**Effort Score (1-5):**
- 1: XS — Configuration only, < 1 week
- 3: M — Design + build + test, 2-4 weeks
- 5: XL — Complex custom, > 8 weeks

**Priority Quadrants:**
- **Do First:** High value (4-5), Low effort (1-2)
- **Plan:** High value (4-5), High effort (3-5)
- **Quick Win:** Medium value (2-3), Low effort (1-2)
- **Deprioritize:** Low value (1-2), High effort (3-5)

Evidence: Prioritization matrix with all solutions scored and quadrant-assigned.
Gate: Final shortlist contains no more than 10 items for "Do First" + "Plan" combined.

### Step 6: Generate Brainstorming Summary
Assemble the deliverable using the template below.

## Deliverable Template

```markdown
# SAP Solution Brainstorming Summary

## Context
- **Business Process Area:** [e.g., Procure-to-Pay]
- **SAP Product:** [S/4HANA Cloud / On-Prem / BTP / etc.]
- **Current Systems:** [List]
- **Session Participants:** [Roles involved]

## Current State Assessment
### Pain Points (Quantified)
| # | Pain Point | Business Impact | Affected Users | Current Workaround |
|---|-----------|----------------|----------------|-------------------|

### Process Volumes
| Metric | Volume | Growth Trend |
|--------|--------|-------------|

## Requirements
| ID | Requirement | Type | Horizon | Priority |
|----|------------|------|---------|----------|

## SAP Standard Assessment
| Requirement | SAP Standard Option | Reference (App ID / Scope Item) | Gap? |
|-------------|--------------------|---------------------------------|------|

## Solution Options
### [Requirement Area 1]
| Option | Approach | Effort | Clean Core | Feasibility | Upgrade Safe |
|--------|----------|--------|------------|-------------|-------------|
| A | Configure: [specific] | S | Tier 1 | Confirmed | Yes |
| B | Extend: [specific] | M | Tier 2 | Needs POC | Yes |
| C | Custom: [specific] | L | Tier 3 | High risk | No |

**Recommendation:** [Option X because...]

## Prioritization Matrix
| Solution | Value (1-5) | Effort (1-5) | Quadrant | Recommendation |
|----------|------------|-------------|----------|----------------|

## Prioritized Shortlist
### Do First (High Value, Low Effort)
1. [Solution] — [One-line rationale]

### Plan (High Value, High Effort)
1. [Solution] — [One-line rationale]

### Quick Wins
1. [Solution] — [One-line rationale]

## Clean Core Impact Summary
- **Tier 1 (In-Boundary):** [count] solutions
- **Tier 2 (Side-by-Side):** [count] solutions
- **Tier 3 (Custom/Review Required):** [count] solutions

## Open Questions
| # | Question | Owner | Due Date |
|---|---------|-------|----------|

## Next Steps
1. [Action item with owner]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Current state is documented with quantified pain points (numbers, not adjectives)
- [ ] Requirements are categorized by type AND horizon
- [ ] SAP standard has been checked for every major requirement with specific references (app IDs, scope items)
- [ ] Minimum 3 solution options exist per major requirement area
- [ ] Every solution option has effort, clean core impact, feasibility, and upgrade safety assessed
- [ ] Prioritization matrix is complete with value and effort scores
- [ ] Final shortlist has no more than 10 prioritized items
- [ ] Clean core impact summary shows the overall extension footprint
- [ ] No solution is recommended without a stated reason for choosing it over alternatives

**Evidence required:** Complete brainstorming summary document with all sections populated. No "[TBD]" placeholders.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke one of:
- `fit-gap-analysis` — When requirements need formal Fit/Gap/Partial classification against SAP standard
- `solution-architecture` — When the prioritized solutions need to be assembled into a coherent architecture

Conditions for handoff: Brainstorming summary is complete with prioritized shortlist, and the project is moving from ideation to formal analysis or design.

## Cross-References

- `fit-gap-analysis` — For formalizing gaps identified during brainstorming
- `solution-architecture` — For designing the technical architecture from brainstorming outputs
- `estimation` — For converting T-shirt sizes into detailed effort estimates
- `process-design` — For detailed process design of the selected solutions
- `value-advisory` — For building business cases around the prioritized solutions
