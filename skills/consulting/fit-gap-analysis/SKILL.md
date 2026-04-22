---
name: fit-gap-analysis
description: Use when classifying business requirements against SAP standard capability during Explore phase. Triggers on requests to assess coverage, identify gaps, classify requirements, determine custom development need, or build a fit-gap matrix.
persona: Functional Consultant, Solution Architect, Business Analyst
phase: Explore
---

# SAP Fit-Gap Analysis

This skill enforces evidence-based classification of every business requirement against SAP standard capability so that no gap is accepted without a resolution strategy, no fit is assumed without proof, and no custom development is committed without assessing clean core impact.

## Iron Laws

1. **NEVER CLASSIFY AS FIT WITHOUT PROVING STANDARD COVERS IT.** "SAP probably handles this" is not a Fit classification. A Fit requires a named standard transaction, configuration path, or Best Practice process that demonstrably covers the requirement without modification.
2. **NEVER ACCEPT A GAP WITHOUT A RESOLUTION STRATEGY.** Every gap — whether configuration, development, process, or partial — must carry an explicit resolution: configure, extend (BAdI/BTP), workaround, or accept. An unresolved gap is a project risk, not a classification.
3. **ALWAYS ASSESS CLEAN CORE IMPACT.** Every Gap-Dev classification must be evaluated against SAP's clean core principles. Custom code inside the core (Z-programs, modifications) must be challenged. Side-by-side BTP extensions are preferred.
4. **NEVER ESTIMATE GAP EFFORT WITHOUT A TECHNICAL APPROACH.** A gap effort estimate without a named technical approach (configuration path, BAdI, BTP service, interface) is a guess. Do not produce numbers without first defining how the gap will be resolved.
5. **INVOLVE THE PROCESS OWNER IN EVERY CLASSIFICATION.** Business requirements classified without process owner confirmation are consultant assumptions. Classifications must be reviewed and signed off by the accountable business stakeholder before the matrix is baselined.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Classify as Fit based on module familiarity | "We've done SD before — standard order-to-cash covers this" | Requirements vary by client. Client-specific pricing rules, approval workflows, or output formats routinely break assumed Fits. | Iron Law 1: Name the transaction or config path. If you cannot, it is not a Fit. |
| Leave a gap without resolution strategy | "We'll decide how to resolve it in Realize" | Unresolved gaps accumulate. By Realize, the backlog is so large that the resolution strategy defaults to custom development without proper evaluation. | Iron Law 2: Every gap row must have a resolution column populated at classification time. |
| Skip clean core assessment for Gap-Dev | "The client wants the custom report — just estimate it" | Custom code inside the core creates technical debt, blocks upgrades, and violates SAP's cloud roadmap. A side-by-side BTP extension may achieve the same result with zero core impact. | Iron Law 3: Every Gap-Dev must include a clean core impact rating (None / Low / Medium / High) and a justification. |
| Estimate effort before technical approach is defined | "The functional consultant can size it at a high level" | Without a technical approach, effort estimates have no basis. A BAdI-based extension might take 3 days; a full RAP object might take 15. The approach drives the number. | Iron Law 4: Technical approach column must be populated before the effort column. |
| Use only IT stakeholders for classification | "The business is too busy for workshops" | IT stakeholders may not know the actual business requirement. Process owners routinely override IT classifications in UAT. Surface the disagreement now. | Iron Law 5: Document the process owner who confirmed each classification. If unavailable, flag it as provisional. |
| Classify every variance as a gap | "If it requires configuration, it must be a gap" | Standard SAP configuration is not a gap — it is the mechanism for delivering Fit. Misclassifying configuration as a gap inflates gap counts and creates false urgency for custom development. | Classification rules: Gap-Config = achievable via standard configuration. Only Gap-Dev and Gap-Process represent true divergence from standard. |
| Ignore partial fits | "It's mostly covered — call it a Fit" | Partial fits carry hidden scope. The uncovered portion becomes a late-stage gap that is more expensive to resolve once design is locked. | Classification rules: Partial fit = its own category. Document what is covered and what is not. |

---

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "SAP standard handles this..." → Name the transaction or config path. If you cannot, stop.
- "We can decide on the resolution later..." → Every gap needs a resolution strategy now.
- "The client wants custom code for this..." → Have you assessed the clean core impact? Stop.
- "Let me estimate this gap at roughly X days..." → What is the technical approach? Define it first.
- "The IT team confirmed this as a Fit..." → Did the process owner confirm it? Flag as provisional until they do.
- "This is a minor gap, we can absorb it..." → Minor gaps have effort and risk. Classify and size it.
- "We'll just build a workaround..." → Workarounds must be documented with effort, owner, and risk rating.
- "This gap is the same as the last project..." → Requirements vary by client. Validate it here.

---

## Hard Gates

<HARD-GATE>
DO NOT produce a fit-gap matrix until ALL of the following exist:
1. Full list of in-scope business requirements, numbered and traceable to a source (workshop, RFP, process document)
2. SAP Best Practice process scope defined (which Scope Items are activated in the system)
3. Classification criteria agreed with the project team (Fit / Gap-Config / Gap-Dev / Gap-Process / Partial)
4. Process owner identified for every requirement area
5. Technical approach defined for every Gap-Dev before effort is estimated
6. Clean core impact assessed for every Gap-Dev classification
</HARD-GATE>

---

## Checklist

### Step 1: Gather and Number All Requirements
Before any classification begins, compile the complete requirement set:

- **Source documents:** Workshop outputs, RFP, AS-IS process documentation, stakeholder interviews
- **Numbering convention:** Assign a unique ID to every requirement (e.g. FGA-SD-001)
- **Traceability:** Record the source document and page/section for each requirement
- **Scope boundary:** Confirm which requirements are in-scope vs. out-of-scope for this project

Evidence: Numbered requirements list with source traceability and scope boundary confirmed.
Gate: No classification begins until all in-scope requirements are identified and numbered.

### Step 2: Define SAP Standard Baseline
Establish what "standard" means for this project:

- **SAP Best Practice Scope Items:** Which scope items are activated? Which are the baseline processes?
- **SAP Release:** S/4HANA version — on-premise, RISE, or Public Cloud (determines available configuration options)
- **Country version:** Localization requirements (tax, legal, payments) that are standard vs. country-specific
- **Industry solution:** Any SAP industry add-ons that extend the standard baseline

Evidence: Scope item list with SAP release and country version documented.
Gate: No requirement is classified as Fit against functionality that is not confirmed to be in scope for activation.

### Step 3: Classify Every Requirement
Apply the five-category classification to every numbered requirement:

**Classification Definitions:**

| Classification | Definition | Resolution Path |
|---------------|-----------|----------------|
| **Fit** | Requirement is fully met by SAP standard without any configuration or development beyond standard activation | No action required |
| **Gap-Config** | Requirement is met by SAP standard through configuration (org structure, settings, output types, pricing, etc.) | Configure in Realize |
| **Gap-Dev** | Requirement cannot be met by standard configuration — requires development (BAdI, extension, report, interface, BTP app) | Develop — assess clean core impact |
| **Gap-Process** | SAP standard delivers the outcome but via a different process than the client currently uses — no system change needed, business process change required | Process change management |
| **Partial** | Requirement is partially met by standard — some elements are Fit or Gap-Config, other elements require development or process change | Decompose into sub-requirements and classify each |

For every Gap-Dev, additionally record:
- **Technical Approach:** BAdI / BTP Side-by-Side / RAP Extension / CDS View / Interface / Report / Modification (flag modifications as high risk)
- **Clean Core Impact:** None / Low / Medium / High
- **Clean Core Justification:** Why this approach was selected over a cleaner alternative

Evidence: Every requirement has a classification, and every Gap-Dev has a technical approach and clean core impact rating.
Gate: No Gap-Dev row has an empty technical approach column.

### Step 4: Define Resolution Strategy Per Gap
For every non-Fit classification, define how the gap will be resolved:

**Resolution Options:**

| Resolution | Definition | When to Use |
|-----------|-----------|-------------|
| **Configure** | Use standard SAP configuration to meet the requirement | Gap-Config |
| **Extend** | Use SAP-endorsed extension points (BAdI, BTP, RAP) — no core modification | Gap-Dev where clean core can be maintained |
| **Workaround** | Use a different SAP process or combination of standard functions to meet the business outcome without development | Gap-Process or low-priority Gap-Dev |
| **Accept** | Business accepts that SAP will not meet this requirement as stated — either drop the requirement or re-define it | Low-priority requirements where cost of resolution exceeds value |

Evidence: Every gap has a named resolution strategy with justification.
Gate: "TBD" is not a valid resolution strategy. Any requirement with an unresolved strategy is flagged as a project risk.

### Step 5: Estimate Effort Per Gap
Size the resolution effort for every Gap-Config and Gap-Dev:

- **Gap-Config:** Estimate configuration days (Design + Configure + Unit Test)
- **Gap-Dev:** Estimate development days by phase (Design, Develop, Unit Test, Integration Test) — use three-point (O/R/P)
- **Gap-Process:** Estimate change management effort (process documentation, training, communication)
- **Priority:** Assign each gap a priority (Must Have / Should Have / Could Have) — this drives sequencing in Realize

Evidence: Effort estimate per gap with three-point values for Gap-Dev items.
Gate: No single-point estimates for Gap-Dev. Complexity and technical approach must justify the estimate.

### Step 6: Assess Clean Core Risk Portfolio
Review all Gap-Dev classifications as a portfolio:

- **Modification count:** How many requirements require core modifications (highest risk)?
- **BTP extension count:** How many can be resolved via side-by-side BTP extensions?
- **Upgrade risk:** Which custom developments will be affected by future SAP upgrades?
- **Clean core score:** Calculate the ratio of clean extensions to total Gap-Dev items

Evidence: Clean core portfolio summary with modification count, BTP extension count, and upgrade risk items flagged.
Gate: Any core modification must be escalated to the solution architect and client IT lead before classification is baselined.

### Step 7: Review and Sign Off with Process Owners
Conduct fit-gap review workshops with business process owners:

- Walk through each requirement classification with the accountable process owner
- Record agreement or challenge for every classification
- Update classifications based on process owner input
- Obtain sign-off on the baselined fit-gap matrix before Realize begins

Evidence: Sign-off record with process owner name, date, and any classification changes made.
Gate: No fit-gap matrix is baselined without process owner review documented.

---

## Deliverable Template

```markdown
# SAP Fit-Gap Analysis Matrix

## Header
- **Project:**
- **SAP Release / Deployment Model:** [S/4HANA version, On-Premise / RISE / Public Cloud]
- **Analysis Date:**
- **Prepared By:**
- **Process Owner Sign-Off:** [Name, Role, Date]

## Scope Baseline
- **SAP Best Practice Scope Items Activated:**
- **Country Version:**
- **Industry Solution (if applicable):**

## Classification Summary

| Classification | Count | % of Total | Est. Effort (days) |
|---------------|------:|----------:|-----------------:|
| Fit | | | N/A |
| Gap-Config | | | |
| Gap-Dev | | | |
| Gap-Process | | | |
| Partial | | | |
| **Total** | | 100% | |

## Fit-Gap Matrix

| Req ID | Requirement Description | Source | Module | Classification | Resolution | Technical Approach | Clean Core Impact | Priority | Est. Effort (d) O/R/P | Process Owner |
|--------|------------------------|--------|--------|---------------|-----------|-------------------|------------------|----------|-----------------------|---------------|
| FGA-[MOD]-001 | | | | | | | | | / / | |

## Clean Core Portfolio

| Item | Count | Notes |
|------|------:|-------|
| Core Modifications (High Risk) | | |
| BTP Side-by-Side Extensions | | |
| BAdI / Enhancement Spot | | |
| RAP Extensions | | |
| Standard Config Only | | |
| **Clean Core Score** (non-modification Gap-Dev / total Gap-Dev) | | |

## Gaps Requiring Escalation

| Req ID | Issue | Escalation To | Due Date |
|--------|-------|--------------|----------|
| | Core modification proposed | Solution Architect, Client IT Lead | |

## Open Items

| Item | Risk if Unresolved | Owner | Due Date |
|------|-------------------|-------|----------|
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Every in-scope requirement has a unique ID and source reference
- [ ] Every requirement carries one of the five classifications (Fit / Gap-Config / Gap-Dev / Gap-Process / Partial)
- [ ] No Fit classification is made without a named standard transaction or configuration path
- [ ] Every Gap-Dev has a named technical approach and a clean core impact rating
- [ ] Every gap (non-Fit) has an explicit resolution strategy — no TBD entries
- [ ] Effort estimates for Gap-Dev are three-point (O/R/P) — no single-point estimates
- [ ] Core modifications are flagged and escalated — none accepted without justification
- [ ] Process owner sign-off is documented with name, role, and date
- [ ] Classification summary totals are complete and consistent with the matrix

**Evidence required:** Completed fit-gap matrix with all columns populated, clean core portfolio summary, and documented process owner sign-off.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

---

## Next Skill

After completing this skill, invoke:
- `solution-architecture` — When the fit-gap matrix is baselined and the team moves to designing the solution that resolves confirmed gaps

Conditions for handoff: Fit-gap matrix is signed off by process owners, all gaps have resolution strategies, and Gap-Dev items have technical approaches defined. The solution architect uses the gap portfolio to design the overall solution blueprint.

---

## Cross-References

- `project-kickoff` — The project scope defined in kickoff determines which requirements are in scope for fit-gap analysis
- `estimation` — Gap effort estimates from the fit-gap matrix feed directly into the project effort estimate
- `process-design` — To-be process designs define the business requirements that are classified in the fit-gap matrix
- `solution-architecture` — Architecture decisions determine which extension patterns are available for Gap-Dev resolution
- `sap-architect` agent — Dispatch for complex gap resolution decisions involving BTP, integration, or clean core tradeoffs
