---
name: process-design
description: Use when designing SAP business processes during Explore or Realize phases. Triggers on requests to map current processes, design future-state processes, define process variants, assign process owners, set KPIs, or align to SAP Best Practices.
persona: Functional Consultant, Business Analyst, Solution Architect, Process Owner
phase: Explore / Realize
---

# SAP Process Design

This skill enforces structured, evidence-based business process design for SAP implementations so that no to-be process is designed without documenting the as-is, no custom process is introduced without first validating SAP Best Practice, no process is left without an owner, and no process is complete without measurable KPIs.

## Iron Laws

1. **NEVER DESIGN TO-BE WITHOUT DOCUMENTING AS-IS.** A to-be process designed without understanding the current state is a consultant's assumption dressed as a solution. The as-is documents pain points, workarounds, data flows, and integration touchpoints that the to-be must address. Skipping it produces designs that cannot be adopted.
2. **REFERENCE SAP BEST PRACTICE BEFORE PROPOSING CUSTOM.** Every to-be process must be compared to the relevant SAP Best Practice Scope Item before any variant or custom design is introduced. If the Best Practice meets the business need, it is the default. Custom design requires explicit justification of why Best Practice is insufficient.
3. **NEVER SKIP PROCESS OWNER ASSIGNMENT.** A process without an accountable owner has no one to approve the design, resolve disputes in workshops, sign off on UAT, or own adoption post go-live. Every process and sub-process must have a named process owner before the design is baselined.
4. **DEFINE MEASURABLE KPIs FOR EVERY PROCESS.** A process without KPIs cannot be improved, benchmarked, or measured for the value it delivers. Every process must have at least one leading and one lagging KPI, with a baseline value and a target value agreed with the business before Realize begins.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip as-is documentation | "The client wants to move quickly — let's design the future state directly" | Without as-is, the design team misses critical integration points, data flows, exception handling paths, and user workarounds that must be addressed in the to-be. The design goes into UAT with gaps that surface as defects. | Iron Law 1: As-is documentation is not optional. If time is short, document at swim-lane level — but document it. |
| Propose custom process before checking Best Practice | "The client's process is unique — SAP standard won't work" | SAP Best Practices cover the majority of standard business scenarios. "Unique" processes are often unique habits, not unique business requirements. Best Practice adoption reduces cost, improves upgradability, and shortens delivery. | Iron Law 2: Show the Best Practice process first. Justify deviation with a named business requirement that Best Practice cannot meet. |
| Leave process owner TBD | "We'll assign owners once the design is more stable" | Design stability requires process owner input. A design without an owner cannot be reviewed, approved, or tested by the right person. The owner must co-create the design, not receive it. | Iron Law 3: Process owner is identified in Step 1 — before design begins, not after. |
| Define KPIs as generic targets | "We'll improve efficiency and reduce errors" | Generic KPIs cannot be measured, baselined, or targeted. They cannot drive remediation if adoption is poor. Without specific KPIs, the project cannot demonstrate value to the business sponsor. | Iron Law 4: Every KPI has a name, a unit of measure, a baseline value, a target value, and a measurement method. |
| Design all variants upfront | "The client has 12 variants of this process — let's document them all" | Documenting all variants before standardizing creates an unmaintainable design with 12 times the testing effort. Use variant analysis to reduce variants to the minimum necessary before designing each one. | Variant analysis step: Consolidate variants before designing. Challenge every variant with "what is the business reason this cannot follow the standard path?" |
| Skip integration touchpoints | "This is a pure finance process — no integration needed" | Pure processes are rare. Most SAP processes touch adjacent modules (FI-MM, SD-FI, PP-QM) or external systems. Missing integration touchpoints means the design is incomplete and the fit-gap analysis will be wrong. | Step 2 (as-is): Integration touchpoints are a mandatory component of the as-is documentation. |
| Treat process design as a documentation exercise | "We just need the process maps for the design spec" | Process design shapes configuration decisions, gap identification, testing scenarios, and training content. A design produced only for documentation produces designs that are disconnected from what is actually configured. | Process design drives fit-gap, configuration, and test case design. These downstream dependencies must be called out at the start of every design workshop. |

---

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "Let's design the future state and come back to as-is later..." → As-is must be documented first. Stop.
- "The client's process is too unique for SAP standard..." → Have you shown them the Best Practice? Start there.
- "We'll assign a process owner in the next phase..." → Process owner must be named before design begins. Stop.
- "KPIs can be defined after go-live once we have real data..." → Baseline data comes from the as-is. Define KPIs now.
- "We have 15 process variants — let's document them all..." → Run variant analysis first. Reduce before designing.
- "This process doesn't touch any other modules..." → Verify the integration touchpoints. Assumption of isolation is a risk.
- "The design is done — we just need sign-off..." → Has the process owner been involved throughout, or only at sign-off? Involvement ≠ sign-off.
- "We'll use the same design from the last project..." → Requirements and org context differ. Validate this design against this client's as-is before reusing.

---

## Hard Gates

<HARD-GATE>
DO NOT produce a to-be process design until ALL of the following exist:
1. As-is process documented at swim-lane level with pain points, workarounds, and integration touchpoints identified
2. SAP Best Practice Scope Item reviewed and compared against the business requirement
3. Process owner named and confirmed as available for design workshops
4. Variant analysis complete — number of process variants agreed and justified
5. KPI baseline values sourced from the as-is or current measurement — not estimated
6. Design reviewed with the process owner before it is baselined
</HARD-GATE>

---

## Checklist

### Step 1: Identify Processes, Owners, and Scope
Before any mapping or design begins, establish the process inventory:

- **Process list:** Enumerate all business processes in scope for design (e.g. Procure-to-Pay, Order-to-Cash, Record-to-Report)
- **Sub-process breakdown:** Decompose each process into sub-processes (e.g. Purchase Requisition, Purchase Order, Goods Receipt, Invoice Verification)
- **Process owner assignment:** Name the accountable business owner for each process and sub-process
- **Org units involved:** Which departments, plants, company codes, or sales organizations execute each process?
- **SAP module mapping:** Map each process to the primary SAP module(s) involved

Evidence: Process inventory table with process, sub-process, process owner (named), org unit, and SAP module for every in-scope process.
Gate: Every process has a named process owner before Step 2 begins. "TBD" is not a process owner.

### Step 2: Document the As-Is Process
For every process, document the current state before designing the future state:

**As-Is Documentation Components:**

| Component | What to Capture |
|-----------|----------------|
| **Swim-lane diagram** | Process steps, decision points, actors (roles/systems), and flow by lane |
| **System landscape** | Which systems are currently used (legacy ERP, spreadsheets, email, paper) |
| **Data inputs and outputs** | What data enters and leaves each step? What documents are created? |
| **Integration touchpoints** | Which adjacent processes or systems does this process touch? |
| **Pain points** | What is slow, error-prone, manual, or inconsistent in the current process? |
| **Workarounds** | What informal fixes have users invented to compensate for system or process limitations? |
| **Volume and frequency** | How often does this process run? What transaction volumes are typical? |
| **Exceptions** | What are the most common non-standard paths? How are exceptions handled? |

Conduct as-is workshops with the process owner and key users. Do not reconstruct the as-is from documentation alone — people know what the documentation does not say.

Evidence: Swim-lane diagram and as-is summary per process with all eight components documented.
Gate: As-is is validated by the process owner as an accurate representation of current state before to-be design begins.

### Step 3: Compare Against SAP Best Practice
For every process, identify and review the corresponding SAP Best Practice Scope Item:

- **Locate the Scope Item:** Use SAP Best Practices Explorer to find the relevant Scope Item(s)
- **Review the standard flow:** Walk the Best Practice process against the business requirement
- **Gap identification:** Note where the Best Practice flow differs from the business requirement
- **Coverage assessment:** Is the gap a process habit (accept Best Practice) or a genuine business requirement (design variant)?

**Best Practice Adoption Decision:**

| Scenario | Decision |
|---------|---------|
| Best Practice fully meets the requirement | Adopt Best Practice as the to-be — no variant needed |
| Best Practice meets the requirement with configuration | Adopt Best Practice — configure the variant |
| Best Practice does not meet a genuine business requirement | Design a process variant — document the business justification |
| Client wants to keep current process regardless of Best Practice | Escalate — current-process-as-default is a risk to timeline and clean core |

Evidence: Best Practice comparison table per process with Scope Item ID, comparison result, and adoption decision.
Gate: No process variant is designed without a documented business justification for deviation from Best Practice.

### Step 4: Conduct Variant Analysis
Before designing multiple process variants, challenge and reduce them:

- **Identify all variants:** List every known variant of the process (regional, org unit, product type, customer type)
- **Challenge each variant:** "What is the business reason this cannot follow the standard path?"
- **Consolidate where possible:** Variants that differ only by habit or preference should be consolidated to the standard path
- **Approve remaining variants:** Process owner and project sponsor confirm which variants will be designed and supported
- **Estimate variant cost:** Each additional variant multiplies configuration, testing, and training effort — quantify this

**Variant Decision Matrix:**

| Variant | Business Justification | Can Consolidate? | Decision | Additional Effort |
|--------|----------------------|:----------------:|---------|:----------------:|
| [Variant Name] | [Reason] | Y/N | Keep / Consolidate | [days] |

Evidence: Variant decision matrix with business justification and consolidation decision for every variant.
Gate: No variant proceeds to design without explicit process owner and sponsor approval.

### Step 5: Design the To-Be Process
Design the future-state process for each approved process and variant:

**To-Be Design Components:**

| Component | What to Produce |
|-----------|----------------|
| **Swim-lane diagram** | To-be flow with SAP roles, system steps, and integration points |
| **SAP transaction mapping** | Which SAP transactions or Fiori apps support each process step |
| **Configuration requirements** | What configuration settings, org structure, or master data are required |
| **Automation opportunities** | Where can workflow, automation (BTP/RPA), or output management reduce manual steps |
| **Delta from as-is** | What changes from current state — steps added, removed, or changed |
| **Exception handling** | How are exceptions managed in the new process |
| **Role and responsibility changes** | Which roles change as a result of the new process (input to change management) |

Design workshops must include the process owner. The functional consultant facilitates — the process owner co-designs.

Evidence: To-be swim-lane diagram and process design document per process with all components populated.
Gate: To-be design reviewed and approved by the process owner before it is submitted for configuration.

### Step 6: Define Process KPIs
For every process, define measurable performance indicators:

**KPI Design Principles:**
- Every process must have at least one leading KPI (predictive — warns before performance drops) and one lagging KPI (outcome — measures result)
- KPI must be measurable in SAP or via a connected analytics tool — not estimated manually
- Baseline value must come from the as-is or current measurement, not from assumption
- Target value must be agreed with the process owner and business sponsor

**KPI Categories for SAP Processes:**

| Category | Example KPIs |
|---------|-------------|
| **Efficiency** | Cycle time, touchless rate, manual steps per transaction |
| **Quality** | Error rate, exception rate, first-pass yield |
| **Compliance** | On-time completion rate, policy adherence rate |
| **Volume** | Transaction volume, throughput rate |
| **Cost** | Cost per transaction, processing cost |

Evidence: KPI table per process with KPI name, category, unit of measure, baseline value, target value, measurement method, and measurement frequency.
Gate: No KPI is accepted without a baseline value and a named measurement method. "TBD" baseline is not acceptable.

### Step 7: Baseline the Process Design Document
Compile all outputs into the process design document and obtain sign-off:

- Compile as-is, Best Practice comparison, variant analysis, to-be design, and KPIs into one document per process or process area
- Review with the process owner and resolve any outstanding design questions
- Obtain formal sign-off from the process owner before the document is handed to configuration
- Flag any open items that will require further decision — assign an owner and due date per item

Evidence: Signed process design document per process area with no unresolved design decisions and all open items assigned.
Gate: No configuration begins in Realize on a process that does not have a signed process design document.

---

## Deliverable Template

```markdown
# SAP Process Design Document

## Header
- **Process Area:**
- **SAP Module(s):**
- **Process Owner:** [Name, Role, Org Unit]
- **Design Version:**
- **Prepared By:**
- **Process Owner Sign-Off:** [Name, Date]

## Process Inventory

| Process | Sub-Process | Process Owner | Org Unit | SAP Module | Variants |
|---------|------------|--------------|---------|-----------|:--------:|
| | | | | | |

## As-Is Process Summary

### [Process Name]
- **Systems Used:**
- **Key Pain Points:**
  1.
  2.
- **Workarounds Identified:**
  1.
  2.
- **Integration Touchpoints:**
- **Transaction Volumes:**
- **Exception Rate:**

[Attach swim-lane diagram]

## SAP Best Practice Comparison

| Process | Best Practice Scope Item | Coverage Assessment | Adoption Decision | Justification if Variant |
|---------|------------------------|:------------------:|:-----------------:|------------------------|
| | | Full / Partial / None | Adopt / Configure / Variant | |

## Variant Analysis

| Variant | Business Justification | Consolidate? | Decision | Additional Effort (d) | Approved By |
|--------|----------------------|:-----------:|---------|:--------------------:|------------|
| | | Y/N | Keep / Consolidate | | |

## To-Be Process Design

### [Process Name] — [Variant if applicable]
- **SAP Transactions / Fiori Apps:**
- **Configuration Requirements:**
- **Automation Opportunities:**
- **Role and Responsibility Changes:**
- **Exception Handling:**
- **Delta from As-Is (key changes):**
  1.
  2.

[Attach to-be swim-lane diagram]

## Process KPIs

| Process | KPI Name | Type | Unit | Baseline | Target | Measurement Method | Frequency |
|---------|---------|:----:|------|:--------:|:------:|-------------------|-----------|
| | | Lead/Lag | | | | | |

## Open Items

| Item | Design Decision Required | Owner | Due Date | Risk if Unresolved |
|------|------------------------|-------|----------|--------------------|
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Process inventory is complete with every in-scope process and sub-process listed
- [ ] Every process has a named process owner — no TBD entries
- [ ] As-is documentation covers all eight components per process (swim-lane, systems, data, integration, pain points, workarounds, volume, exceptions)
- [ ] As-is is validated by the process owner as accurate
- [ ] SAP Best Practice Scope Item has been reviewed for every process before to-be design begins
- [ ] Every process variant has a documented business justification and is approved by process owner and sponsor
- [ ] To-be design covers all components per process including transaction mapping, configuration requirements, and exception handling
- [ ] Every to-be design is reviewed and approved by the process owner
- [ ] Every process has at least one leading and one lagging KPI with baseline value, target value, and measurement method
- [ ] No KPI has a TBD baseline — baseline values sourced from as-is or current measurement
- [ ] Process design document is signed off before configuration begins in Realize

**Evidence required:** Signed process design document per process area with as-is diagrams, Best Practice comparison, to-be diagrams, variant decisions, and KPI table fully populated.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

---

## Next Skill

After completing this skill, invoke:
- `fit-gap-analysis` — When to-be processes are designed and the team moves to classifying each requirement against SAP standard capability

Conditions for handoff: Process design documents are signed off for all in-scope processes. The to-be design defines the business requirements that will be classified as Fit, Gap-Config, Gap-Dev, Gap-Process, or Partial in the fit-gap matrix.

---

## Cross-References

- `project-kickoff` — The project scope defined in kickoff determines which process areas are in scope for design
- `fit-gap-analysis` — To-be process requirements are the input to fit-gap classification; process design and fit-gap run in sequence
- `estimation` — Process complexity and variant count from process design feed into the effort estimate for configuration and development
- `change-management` — Role and responsibility changes identified in to-be design drive the stakeholder impact analysis and training needs
- `sap-process-modeler` agent — Dispatch for large-scale process mapping engagements spanning 10+ end-to-end processes across multiple modules
