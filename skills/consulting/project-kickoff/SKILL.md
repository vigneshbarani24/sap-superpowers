---
name: project-kickoff
description: Use when starting a new SAP project, setting up governance, defining scope, identifying stakeholders, creating a project charter, or establishing a RACI matrix for any SAP Activate engagement.
persona: Project Manager, Change Management Lead, Solution Architect
phase: Discover / Prepare
---

# SAP Project Kickoff

This skill enforces structured SAP project initiation so that no project starts without a charter, governance model, stakeholder register, and risk register — the four artifacts that prevent the "we assumed someone else was handling that" failures that kill SAP programs.

## Iron Laws

1. **NO PROJECT WITHOUT A CHARTER.** A verbal agreement is not a project. A charter with scope, governance, milestones, and sign-off authority is a project. Everything else is a favor.
2. **NO SCOPE WITHOUT BOUNDARIES.** In-scope means nothing without explicit out-of-scope. Every charter must list both. Ambiguous scope is the #1 cause of SAP project overruns.
3. **NO GOVERNANCE WITHOUT ESCALATION PATHS.** A steering committee that meets monthly is not governance. Defined escalation paths with SLAs and named decision-makers is governance.
4. **NO RACI WITHOUT VALIDATION.** A RACI created by one person is a wish list. A RACI validated by every Accountable party is a commitment.
5. **NO KICKOFF WITHOUT RISK REGISTER.** Projects that start without identified risks are not optimistic — they are negligent. Minimum 5 risks with quantified impact.
6. **ACTIVATE PHASES ARE NON-NEGOTIABLE.** Every SAP project maps to SAP Activate phases (Discover, Prepare, Explore, Realize, Deploy, Run). Custom phase names create confusion with SAP support and quality gates.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip stakeholder analysis | "The project sponsor told us who matters" | Sponsors have blind spots. Missed stakeholders surface at UAT with blocking objections. | Checklist Step 1: Minimum 4 stakeholder categories (executive, process owner, end user, IT). |
| Define scope as a bullet list | "The SOW already has the scope" | Bullet lists lack precision. "Implement FI" could mean 2 company codes or 50. | Iron Law 2: Scope must include entity counts, process boundaries, and explicit exclusions. |
| Skip the communication plan | "We'll figure out communication as we go" | Ad-hoc communication means the steering committee learns about risks from rumors. | Checklist Step 5: Communication plan with audience, frequency, channel, and owner for each stakeholder group. |
| Create a RACI in isolation | "I know the org chart" | Org charts show reporting lines, not project accountability. The FI lead may not know they own chart of accounts migration. | Iron Law 4: Every A (Accountable) party must confirm in writing. |
| Use generic risk categories | "Risks are risks — resource, budget, timeline" | Generic risks generate generic mitigations. "Data migration complexity" with a specific legacy system named drives action. | Checklist Step 6: Each risk must name a specific SAP module, system, or workstream. |
| Assume SAP Activate is understood | "Everyone knows Activate" | Teams confuse Activate with Waterfall, ASAP, or their own hybrid. Phase gates get skipped. | Iron Law 6: Charter must map deliverables to Activate phases explicitly. |
| Skip the out-of-scope section | "We listed what's in scope, isn't that enough?" | What you don't list, the client assumes is included. Especially integrations, reports, data migration. | Iron Law 2: Out-of-scope section is mandatory and must be at least half as long as in-scope. |
| Copy a charter template without customizing | "This template worked for the last project" | Every SAP landscape is different. A retail S/4HANA project charter does not fit a pharma brownfield migration. | Verification: Charter must reference this client's specific systems, modules, and org structure. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "The scope is pretty clear already..." → You have not written explicit boundaries. Stop.
- "We can refine the RACI later..." → Later means never. Get commitments now. Stop.
- "The risks are standard for this type of project..." → Standard risks are lazy risks. Be specific. Stop.
- "The stakeholders are obvious..." → You have not done a stakeholder analysis. Stop.
- "Let's keep the charter lightweight..." → Lightweight charters produce heavyweight change requests. Stop.
- "We'll handle governance organically..." → Organic governance means no governance. Stop.
- "This is similar to the last project..." → Similar is not the same. Different client, different landscape, different risks.

## Hard Gates

<HARD-GATE>
DO NOT generate a project charter until ALL of the following exist:
1. Stakeholder register with minimum 8 named stakeholders across 4 categories
2. Scope statement with explicit in-scope AND out-of-scope sections
3. Governance model with steering committee membership and escalation paths
4. RACI matrix covering at least: scope decisions, budget approval, go-live decision, change requests, risk escalation
5. Risk register with minimum 5 SAP-specific risks (not generic categories)
6. SAP Activate phase mapping with key deliverables per phase
</HARD-GATE>

## Checklist

### Step 1: Stakeholder Identification
Identify all stakeholders using the SAP project stakeholder framework:

- **Executive Sponsors:** Who signs off on budget, scope changes, go-live?
- **Process Owners:** Who owns each business process being implemented? (One per SAP module area minimum)
- **End User Representatives:** Who will validate during Fit-to-Standard workshops and UAT?
- **IT Landscape Owners:** Who manages the current systems being replaced/integrated?
- **Integration Partners:** Who owns the non-SAP systems that will connect?
- **Compliance/Audit:** Who must approve data, security, and regulatory aspects?

Evidence: Stakeholder register table with Name, Role, Category, Influence Level (H/M/L), Engagement Strategy.
Gate: Minimum 8 named stakeholders across 4+ categories before proceeding.

### Step 2: Scope Definition
Define scope using the SAP module boundary method:

- **Modules in scope:** List each SAP module (FI, CO, MM, SD, PP, PM, etc.) with specific sub-components
- **Entity scope:** Company codes, plants, sales orgs, purchasing orgs — with counts
- **Process scope:** Name each business process (e.g., P2P, O2C, R2R) and its boundaries
- **Geography scope:** Countries, languages, currencies, legal entities
- **Integration scope:** Name each system-to-system interface with direction and protocol
- **Data migration scope:** Which data objects, from which source systems, approximate volumes
- **Reporting scope:** Operational reports, analytics, dashboards — named, not "as needed"
- **OUT OF SCOPE:** Explicitly list what is excluded — modules, processes, entities, integrations, reports

Evidence: Scope statement document with all 8 categories populated.
Gate: Out-of-scope section exists and contains specific items (not "everything not listed above").

### Step 3: Governance Model
Define project governance aligned with SAP Activate quality gates:

- **Steering Committee:** Members (by name/role), meeting cadence, decision authority
- **Project Management Office:** PM structure, reporting cadence, tools
- **Workstream Leads:** One per module/functional area, responsibilities
- **Quality Gates:** Map to SAP Activate phase transitions (Discover→Prepare, Prepare→Explore, etc.)
- **Escalation Matrix:** Issue severity levels (1-4) with escalation path, target response time, and named decision-maker per level
- **Change Control:** How scope changes are requested, evaluated, approved, and communicated

Evidence: Governance model document with named individuals (not just roles).
Gate: Escalation matrix has at least 3 severity levels with distinct paths.

### Step 4: RACI Matrix
Build a RACI covering SAP project decisions:

Minimum decision areas:
- Scope change approval
- Budget reallocation
- Go-live decision (Go/No-Go)
- Change request evaluation
- Risk escalation
- Data migration sign-off
- Integration design approval
- Security/authorization concept approval
- Test strategy approval
- Training approach approval
- Cutover plan approval

Evidence: RACI matrix with every decision area having exactly one A (Accountable).
Gate: No decision area has zero A or more than one A.

### Step 5: Communication Plan
Define communication for each stakeholder group:

| Audience | Content | Frequency | Channel | Owner |
|----------|---------|-----------|---------|-------|
| Steering Committee | Status, risks, decisions needed | Bi-weekly | Formal meeting | PM |
| Process Owners | Workstream progress, open items | Weekly | Teams/Slack | Workstream Lead |
| End Users | Project awareness, timeline, training | Monthly | Email/Town Hall | Change Manager |
| IT Team | Technical progress, dependencies | Weekly | Stand-up | Tech Lead |

Evidence: Communication plan table with all stakeholder categories covered.
Gate: Every stakeholder group from Step 1 appears in the communication plan.

### Step 6: Risk Register
Identify SAP-specific project risks:

Each risk must include:
- **Risk ID and Name:** Specific, not generic (e.g., "Legacy GL account structure incompatible with Universal Journal" not "Data migration risk")
- **Category:** Technical, Functional, Organizational, Integration, Data, Resource
- **Probability:** H/M/L with justification
- **Impact:** H/M/L with estimated day/cost impact
- **Mitigation:** Specific action with owner and deadline
- **Contingency:** What happens if the risk materializes despite mitigation

Evidence: Risk register with minimum 5 risks, each with all 6 attributes.
Gate: At least 2 risks must be rated High probability or High impact.

### Step 7: Generate Project Charter
Assemble the charter document using the deliverable template below.

Evidence: Complete charter document with all sections populated.
Gate: All Hard Gate conditions met.

## Deliverable Template

```markdown
# SAP Project Charter

## Project Overview
- **Project Name:**
- **Client:**
- **SAP Product:** [S/4HANA Cloud / S/4HANA On-Premise / BTP / SuccessFactors / etc.]
- **Implementation Approach:** [Greenfield / Brownfield / Bluefield / Selective Data Transition]
- **SAP Activate Phases:** [Which phases are in scope for this engagement]
- **Target Go-Live:**
- **Budget Range:**

## Stakeholder Register
[Table from Step 1]

## Scope Definition
### In Scope
[From Step 2 — all 7 in-scope categories]
### Out of Scope
[From Step 2 — explicit exclusions]

## Governance Model
[From Step 3]
### Escalation Matrix
[Severity levels with paths]
### Quality Gates
| Activate Phase Transition | Gate Criteria | Decision Maker |
|---------------------------|---------------|----------------|

## RACI Matrix
[From Step 4]

## Communication Plan
[From Step 5]

## Risk Register
[From Step 6]

## SAP Activate Phase Mapping
| Phase | Key Deliverables | Duration (est.) | Quality Gate |
|-------|-----------------|------------------|--------------|
| Discover | Project charter, stakeholder analysis | | |
| Prepare | Scope finalization, team onboarding, environment setup | | |
| Explore | Fit-to-Standard workshops, fit-gap analysis, process design | | |
| Realize | Configuration, development, testing | | |
| Deploy | Cutover, go-live, hypercare | | |
| Run | Steady-state support, optimization | | |

## Assumptions and Constraints
[List all assumptions that underpin this charter]

## Sign-Off
| Name | Role | Signature | Date |
|------|------|-----------|------|
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Stakeholder register has 8+ named individuals across 4+ categories
- [ ] Scope statement has explicit in-scope AND out-of-scope sections with SAP module specifics
- [ ] Governance model names real people (not just roles) for steering committee and escalation
- [ ] RACI matrix has exactly one A per decision area and covers 10+ decision types
- [ ] Communication plan covers every stakeholder group identified in Step 1
- [ ] Risk register has 5+ SAP-specific risks with probability, impact, mitigation, and contingency
- [ ] Charter maps deliverables to SAP Activate phases
- [ ] Out-of-scope section contains specific named exclusions (not "everything else")
- [ ] All assumptions are stated explicitly in the charter

**Evidence required:** Complete project charter document with all sections populated and no placeholder text.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke one of:
- `estimation` — When the project needs effort estimates for planning and budgeting
- `fit-gap-analysis` — When moving into Explore phase to assess requirements against SAP standard

Conditions for handoff: Charter is signed off (or ready for sign-off) and the project is transitioning from Discover/Prepare into Explore or needs detailed estimation for budget approval.

## Cross-References

- `estimation` — For detailed effort estimation referenced in the charter
- `change-management` — For expanding the stakeholder analysis into a full OCM plan
- `value-advisory` — For building the business case that justifies the project charter
- `sap-activate-methodology` — For detailed phase gate criteria referenced in governance
