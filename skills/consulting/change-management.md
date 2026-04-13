---
name: change-management
description: Use when planning or executing organizational change for an SAP implementation. Triggers on requests for stakeholder impact analysis, change readiness assessment, communication planning, training needs analysis, resistance management, or adoption measurement.
persona: Change Manager, Project Manager, HR/Training Lead, Functional Consultant
phase: All Phases (Prepare through Run)
---

# SAP Change Management

This skill enforces structured, evidence-based change management for SAP implementations so that no stakeholder group goes unanalyzed, no communication is broadcast without targeting, no training is generic, and adoption is measured before go-live is declared successful.

## Iron Laws

1. **NEVER SKIP STAKEHOLDER IMPACT ANALYSIS.** Deploying SAP without a stakeholder impact analysis is deploying into the unknown. You do not know who is most affected, who will resist, or who needs to be onside first. Every role that touches the new system must be analyzed before communication or training begins.
2. **NEVER ASSUME ONE CHANNEL REACHES ALL.** An email to all staff is not a communication strategy. Different stakeholder groups have different access, literacy, and trust in different channels. Segment your audiences and match channel to group.
3. **ALWAYS CREATE ROLE-BASED TRAINING.** Generic "how to use SAP" training fails because it does not connect to the user's actual daily tasks. Every training audience must be defined by role, and every training module must be tied to the transactions and processes that role performs.
4. **DEFINE ADOPTION METRICS BEFORE GO-LIVE.** If you have not defined what adoption looks like, you cannot measure it, and you cannot declare go-live successful. Metrics must be agreed with the business before cutover — not retrospectively applied to explain poor outcomes.

---

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip formal stakeholder impact analysis | "We know who the users are — let's go straight to communication" | Knowing who the users are is not the same as knowing who is most impacted, what changes they face, and how ready they are. Unanalyzed stakeholders become resistant users. | Iron Law 1: Complete the stakeholder impact matrix before any communication or training is designed. |
| Send a single all-staff communication | "Everyone needs to know about SAP — one message covers it" | Different roles face different changes. A warehouse operator and a finance controller have entirely different concerns. One message addresses neither properly and builds distrust in both. | Iron Law 2: Segment audiences. Map message to role, concern, and channel. |
| Use a single generic training course | "SAP training is SAP training — we'll cover all modules in one session" | Generic training produces low retention and high support ticket volume post go-live. Users learn SAP in the abstract but cannot perform their own jobs in the new system. | Iron Law 3: Training is designed per role. Each role gets a module tied to its transactions and process steps. |
| Define adoption metrics after go-live | "We'll measure adoption once the system is live and we can see actual usage" | Post go-live metric definition means you have no baseline, no agreed target, and no ability to trigger remediation. By the time low adoption is visible, the window for intervention has closed. | Iron Law 4: Adoption metrics are agreed and baselined before cutover rehearsal. |
| Treat resistance as an IT problem | "Users will adapt once the system is live" | Resistance is a change problem, not a system problem. Unmanaged resistance causes workarounds, parallel processing, shadow systems, and eventually failed adoption. | Resistance management step: Identify resistance sources early. Engage resistors directly — do not route around them. |
| Compress change management into the Deploy phase | "We'll do training and communication in the last month before go-live" | Change management that starts in Deploy is too late. Awareness must be built in Prepare, understanding in Explore, acceptance in Realize, readiness in Deploy. Compressing it creates surface-level readiness that collapses under go-live pressure. | Phase alignment: Change management activities must be planned against SAP Activate phases from Prepare onward. |
| Treat change management as a soft track | "Change management is important but the real work is configuration" | Failed SAP implementations are more commonly the result of adoption failure than technical failure. Change management is a risk mitigation activity, not a soft-skills add-on. | Frame change management outputs as risk controls — stakeholder impact = risk identification, training = risk mitigation, adoption metrics = risk acceptance criteria. |

---

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "We'll cover everyone in one communication..." → Have you segmented your audiences by role and concern? Stop.
- "Users will get used to it after go-live..." → Resistance does not resolve itself. Identify it and address it now.
- "Training will be a few sessions before go-live..." → Training is role-based and runs through Realize, not just Deploy. Redesign the plan.
- "We'll measure adoption once it's live..." → Adoption metrics must be defined before cutover. Stop.
- "The sponsor sent an email, so awareness is covered..." → Awareness is one stage of change readiness. Have you measured it? Have you confirmed receipt and understanding?
- "Change management is the HR team's responsibility..." → Change management is a project delivery responsibility. HR may co-own training, but the project team owns the plan.
- "We know our stakeholders..." → Have you analyzed their impact level, readiness, and influence? Knowing who they are is not enough.

---

## Hard Gates

<HARD-GATE>
DO NOT produce a change management plan until ALL of the following exist:
1. Stakeholder register with every role that will be impacted by the SAP implementation
2. Stakeholder impact analysis covering process changes, system changes, and role changes per group
3. Change readiness baseline — current state assessment per stakeholder group
4. Communication channel map — channels available and appropriate for each audience
5. Training needs analysis — roles, transactions, and learning outcomes per training audience
6. Adoption metrics agreed with the business sponsor before the plan is finalized
</HARD-GATE>

---

## Checklist

### Step 1: Identify and Register All Stakeholder Groups
Before any change activity begins, map the full stakeholder landscape:

- **Roles affected:** Every role that will use, oversee, approve, or be impacted by the new SAP processes
- **Organizational units:** Which departments, locations, and business units are in scope
- **Influence and interest:** For each group — level of influence over project success and level of interest in outcomes
- **Key individuals:** Named champions, blockers, and decision-makers within each group

Evidence: Stakeholder register with role, org unit, influence rating (H/M/L), and interest rating (H/M/L).
Gate: Every in-scope process area has at least one identified stakeholder group before Step 2 begins.

### Step 2: Conduct Stakeholder Impact Analysis
For every stakeholder group, assess the nature and severity of change they face:

**Impact Dimensions:**

| Dimension | Questions to Answer |
|-----------|-------------------|
| **Process Change** | Which processes change? Is the change minor adjustment or fundamental redesign? |
| **System Change** | Which transactions are new, changed, or removed? What is the learning curve? |
| **Role Change** | Does this role gain, lose, or change responsibilities? Are jobs at risk? |
| **Volume of Change** | How many changes does this group face simultaneously? |
| **Readiness Gap** | How far is the current state from the required future-state capability? |

Rate each dimension: High / Medium / Low impact.
Calculate an overall impact score per stakeholder group.

Evidence: Impact assessment table per stakeholder group with dimension-level ratings and overall impact score.
Gate: No stakeholder group has an impact score of "Low" without written justification — assumption of low impact is a risk.

### Step 3: Assess Change Readiness
Establish the current readiness baseline for each stakeholder group:

**Readiness Assessment Methods:**
- Survey (quantitative — likert scale questions on awareness, understanding, desire, ability)
- Workshop / focus group (qualitative — understand concerns, blockers, and motivators)
- Interview (for senior stakeholders and identified resistors)

**Readiness Dimensions (ADKAR model):**

| Dimension | What It Measures |
|-----------|----------------|
| **Awareness** | Does the group know why the change is happening? |
| **Desire** | Does the group want to support the change? |
| **Knowledge** | Does the group know how to change? |
| **Ability** | Can the group perform in the new way? |
| **Reinforcement** | Will the change stick post go-live? |

Rate each dimension per stakeholder group (1–5 scale). Identify the lowest-scoring dimension as the primary intervention point.

Evidence: Change readiness baseline per stakeholder group with ADKAR dimension scores and primary gap identified.
Gate: Readiness assessment is conducted with actual stakeholders — not estimated by the project team on their behalf.

### Step 4: Design the Communication Strategy
Build a targeted communication plan that segments by audience:

**Communication Planning Principles:**
- Match message to the audience's primary concern (What does this mean for me? What changes? What support is available?)
- Match channel to audience access and trust level
- Sequence messages: Awareness → Understanding → Acceptance → Readiness
- Identify the most credible sender for each audience (sponsor, line manager, peer champion)

**Channel Options:**

| Channel | Best For |
|---------|---------|
| Executive briefing | Senior leadership, board-level stakeholders |
| Town hall / all-hands | Large groups needing awareness |
| Line manager cascade | Frontline staff — manager as trusted messenger |
| Team briefing pack | Consistent message at team level |
| Intranet / SharePoint | Reference content, FAQs, updates |
| Email | Updates, confirmations, actions — not primary awareness |
| Poster / visual | Operational areas (warehouse, shop floor) with low screen access |
| Video message | Asynchronous reach across locations |

Evidence: Communication plan with event, audience, channel, sender, message, and timing for every planned communication.
Gate: Every communication event has a named sender and a mechanism for two-way feedback.

### Step 5: Define Training Needs by Role
Build a role-based training needs analysis:

- **Role inventory:** List every role that will use the SAP system
- **Transaction mapping:** For each role, identify the SAP transactions and processes they will perform
- **Learning objectives:** Define what the person must be able to do after training (behavioral outcomes, not feature lists)
- **Prerequisite knowledge:** What does the learner already know? What is the delta?
- **Training format:** Classroom / virtual / e-learning / job aid / on-the-job — match to content complexity and audience size

**Training Curriculum Design:**

| Training Module | Target Role(s) | Transactions / Processes | Duration | Format | Delivery Date |
|----------------|---------------|------------------------|----------|--------|--------------|
| [Module Name] | [Role] | [T-codes / Process Steps] | [hours] | [Format] | [Date] |

Evidence: Training needs analysis per role with learning objectives, transaction mapping, and format decision.
Gate: No training module is labelled "All Users" or "General SAP." Every module has a specific target role.

### Step 6: Identify and Manage Resistance
Proactively identify and address resistance before it becomes blockers:

**Resistance Identification:**
- Who has the most to lose from the change?
- Who has influence to derail adoption if they resist?
- Who has resisted previous technology changes in this organization?

**Resistance Response Strategies:**

| Resistance Type | Symptoms | Response |
|----------------|---------|---------|
| **Fear of job loss** | Disengagement, absenteeism from workshops | Clarify role impact; provide explicit commitment where possible |
| **Loss of power/control** | Territorial behavior, data hoarding | Involve as subject matter expert; give ownership of part of the design |
| **Lack of trust in leadership** | "This will fail like the last project" | Direct engagement from credible sponsor; evidence of listening |
| **Competence anxiety** | "I'm too old for this" / "I can't learn new systems" | Peer-based training; extended practice time; visible support structure |
| **Legitimate concern** | "This process design won't work" | Escalate to functional team; resolve the design issue if valid |

Evidence: Resistance register with identified resistors, resistance type, response strategy, owner, and status.
Gate: Resistance register is reviewed at every project steering meeting — not treated as a one-off assessment.

### Step 7: Define Adoption Metrics and Go-Live Readiness Criteria
Before cutover, agree on how adoption will be measured:

**Adoption Metric Categories:**

| Category | Example Metrics |
|---------|----------------|
| **System usage** | % of target users logged in within 30 days of go-live |
| **Process compliance** | % of transactions processed in SAP vs. workaround/manual |
| **Data quality** | Error rate on user-entered data at 30 / 60 / 90 days post go-live |
| **Support ticket volume** | Helpdesk ticket volume vs. baseline (leading indicator of adoption failure) |
| **Training completion** | % of target users completing role-based training before go-live |
| **Assessment scores** | % of trained users passing competency assessment at defined threshold |

**Go-Live Readiness Criteria (Change Perspective):**
- Training completion rate ≥ [X]% per role group
- Change readiness re-assessment score ≥ [Y] on ADKAR scale
- All high-impact, high-influence resistors have been engaged
- Communication plan fully executed for Prepare and Explore phases
- Hypercare support model communicated to all user groups

Evidence: Adoption metrics table with metric, target, measurement method, and measurement frequency agreed with business sponsor.
Gate: Adoption metrics are documented and signed off before cutover rehearsal — not defined after go-live.

---

## Deliverable Template

```markdown
# SAP Change Management Plan

## Header
- **Project:**
- **SAP Scope:**
- **Plan Version:**
- **Prepared By:**
- **Business Sponsor Sign-Off:** [Name, Role, Date]

## Stakeholder Register

| Stakeholder Group | Org Unit | Role Count | Influence | Interest | Impact Score | Primary Concern |
|------------------|---------|----------:|:---------:|:--------:|:------------:|----------------|
| | | | H/M/L | H/M/L | H/M/L | |

## Impact Analysis Summary

| Stakeholder Group | Process Change | System Change | Role Change | Volume | Readiness Gap | Overall Impact |
|------------------|:-------------:|:------------:|:----------:|:------:|:-------------:|:-------------:|
| | H/M/L | H/M/L | H/M/L | H/M/L | H/M/L | H/M/L |

## Change Readiness Baseline

| Stakeholder Group | Awareness | Desire | Knowledge | Ability | Reinforcement | Primary Gap |
|------------------|:---------:|:------:|:---------:|:-------:|:-------------:|------------|
| | 1–5 | 1–5 | 1–5 | 1–5 | 1–5 | |

## Communication Plan

| # | Event / Activity | Audience | Channel | Sender | Key Message | Timing / Phase | Feedback Mechanism |
|---|----------------|---------|--------|--------|------------|----------------|-------------------|
| | | | | | | | |

## Training Plan

| Module | Target Role(s) | Transactions / Processes | Objectives | Duration | Format | Delivery Date | Owner |
|--------|---------------|------------------------|-----------|----------|--------|--------------|-------|
| | | | | | | | |

## Resistance Register

| Stakeholder | Resistance Type | Risk to Project | Response Strategy | Owner | Status |
|------------|----------------|:---------------:|------------------|-------|--------|
| | | H/M/L | | | |

## Adoption Metrics

| Metric | Target | Measurement Method | Frequency | Owner | Baseline |
|--------|-------:|-------------------|-----------|-------|---------|
| Training completion rate | ≥ [X]% | LMS report | Pre go-live | | |
| System login rate (30d) | ≥ [X]% | SAP usage report | Monthly | | |
| Process compliance rate | ≥ [X]% | Transaction audit | Monthly | | |
| Support ticket volume | ≤ [X]/week | Helpdesk report | Weekly | | |

## Go-Live Readiness — Change Perspective

| Criteria | Target | Status | Owner |
|---------|--------|--------|-------|
| Training completion per role group | ≥ [X]% | | |
| ADKAR re-assessment score | ≥ [Y] | | |
| High-impact resistors engaged | All identified | | |
| Hypercare support model communicated | All user groups | | |

## Open Items

| Item | Risk if Unresolved | Owner | Due Date |
|------|-------------------|-------|----------|
```

---

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Stakeholder register covers every role and org unit impacted by the SAP implementation
- [ ] Impact analysis has been completed per stakeholder group with dimension-level ratings
- [ ] Change readiness baseline has been established using actual stakeholder input — not estimated
- [ ] Communication plan has a separate event for each audience segment — no all-staff-only entries
- [ ] Every communication event has a named sender and a feedback mechanism
- [ ] Training plan is role-based — every module has a specific target role and transaction mapping
- [ ] No training module is labelled "General SAP" or "All Users"
- [ ] Resistance register identifies specific individuals or groups with tailored response strategies
- [ ] Adoption metrics are defined, targeted, and agreed with the business sponsor before go-live
- [ ] Go-live readiness criteria (change perspective) are documented and measurable

**Evidence required:** Completed change management plan with all sections populated, resistance register reviewed, and adoption metrics signed off by the business sponsor.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

---

## Next Skill

After completing this skill, invoke:
- `go-live-readiness` — When the change management plan is baselined and the project moves into Deploy phase to confirm organizational readiness for cutover

Conditions for handoff: Communication plan is underway, training delivery is scheduled and resources confirmed, adoption metrics are agreed, and resistance register has no unaddressed high-risk items.

---

## Cross-References

- `project-kickoff` — Stakeholder identification from kickoff feeds into the change management stakeholder register
- `fit-gap-analysis` — Process changes identified in fit-gap drive the impact analysis and training needs
- `process-design` — To-be process designs define the scope of behavior change that stakeholders must adopt
- `testing-strategy` — UAT is a change management event — users engaging with the system before go-live builds ability (ADKAR)
- `go-live-readiness` — Change readiness is a go-live gate — adoption metrics and training completion feed the go-live checklist
