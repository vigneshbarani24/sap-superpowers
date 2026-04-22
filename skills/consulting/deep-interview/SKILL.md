---
name: deep-interview
description: Use when gathering requirements for an SAP project, feature, or change request. Conducts a structured Socratic interview to extract complete, unambiguous requirements — preventing scope creep, missed edge cases, and assumption-based development.
---

# Deep Interview — Structured Requirements Gathering

This skill conducts a systematic interview to extract complete requirements from the user. It uses Socratic questioning — never accepting the first answer, always probing for edge cases, constraints, and unstated assumptions.

## Iron Laws

1. **NEVER ACCEPT THE FIRST ANSWER AS COMPLETE.** The user's first description of what they want is always incomplete. Probe deeper. Ask "what happens when..." and "what if..." until edge cases are surfaced.

2. **NEVER ASSUME BUSINESS CONTEXT.** If the user says "we need a report," do not assume the audience, frequency, format, or authorization model. Ask.

3. **ALWAYS DOCUMENT DECISIONS AND ALTERNATIVES REJECTED.** When a design choice is made during the interview, document what was chosen AND what was explicitly rejected. This prevents re-litigation later.

4. **ALWAYS PRODUCE A REQUIREMENTS DOCUMENT.** The interview output is a structured document, not a conversation summary. It must be reviewable, signable, and traceable.

5. **NEVER LEAD THE WITNESS.** Do not suggest answers in your questions. "Should we use RAP?" is leading. "What is the target UI technology and why?" is not.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Start coding after the first requirement | "I have enough to start prototyping" | Prototyping from incomplete requirements produces throwaway code that somehow becomes production code. | Complete the interview first. All 7 dimensions. |
| Suggest solutions during requirements | "I can guide them to the right approach" | Suggesting solutions during requirements gathering biases the requirements toward that solution. | Iron Law 5. Gather requirements first. Design later. |
| Skip non-functional requirements | "Performance and security can be added later" | NFRs that aren't requirements become constraints discovered in production. | Cover all 7 dimensions. NFRs are not optional. |
| Accept "same as the old report" | "They know what they want" | "Same as" means "similar to" plus 47 unstated changes. | What specifically is the same? What's different? What's missing? |

<HARD-GATE>
The interview is NOT complete until ALL seven dimensions are covered:
1. Functional requirements (what the system does)
2. Data requirements (what data is needed, sources, volumes)
3. Process requirements (workflow, approvals, triggers)
4. Non-functional requirements (performance, availability, security)
5. Integration requirements (interfaces, APIs, external systems)
6. User requirements (roles, authorization, UI expectations)
7. Constraints (timeline, budget, technology, regulatory)
Skipping any dimension is a requirements gap that will surface during development.
</HARD-GATE>

## Interview Protocol

### Round 1 — The Big Picture (5 questions)
1. What business problem does this solve? (Not "what do you want built" — why does it matter?)
2. Who are the primary users? (Roles, not names)
3. What does success look like? (Measurable outcome)
4. What happens if we don't build this? (Urgency and alternatives)
5. What SAP module/area does this involve? (Route to module skill for context)

### Round 2 — Functional Depth (per requirement)
For each functional requirement identified:
1. What triggers this function? (User action, schedule, event, API call)
2. What are the inputs? (Data, parameters, selections)
3. What are the outputs? (Documents, reports, updates, notifications)
4. What are the business rules? (Validation, calculation, routing logic)
5. What are the edge cases? (Empty data, error conditions, boundary values)
6. What are the exception paths? (What happens when it fails?)

### Round 3 — Data & Integration
1. What master data is involved? (Materials, customers, vendors, employees)
2. What transaction data is created or consumed?
3. What external systems are involved? (APIs, file interfaces, RFC)
4. What is the expected data volume? (Records per day/month)
5. What is the data quality reality? (Known gaps, inconsistencies)

### Round 4 — Non-Functional & Constraints
1. Performance expectations? (Response time, batch window, concurrent users)
2. Security requirements? (Authorization concept, data classification)
3. Availability requirements? (Uptime, maintenance windows)
4. Regulatory constraints? (GDPR, SOX, industry-specific)
5. Technology constraints? (ABAP Cloud only? On-premise? BTP?)
6. Timeline and budget constraints?

### Round 5 — Confirmation
1. Read back all requirements in structured format
2. Ask: "What did I miss?"
3. Ask: "What assumptions am I making that are wrong?"
4. Get explicit sign-off on the requirements document

## Requirements Document Template

```markdown
# Requirements Document: [Project/Feature Name]

## Business Context
**Problem:** [What business problem this solves]
**Stakeholders:** [Who cares about this]
**Success Criteria:** [How we know it worked]
**Priority:** [Critical/High/Medium/Low]

## Functional Requirements
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|-------------------|
| FR-01 | [Description] | [P] | [How to verify] |

## Data Requirements
| Data Object | Source | Volume | Quality Notes |
|-------------|--------|--------|--------------|

## Process Requirements
| Step | Actor | Action | System | Output |
|------|-------|--------|--------|--------|

## Non-Functional Requirements
| ID | Category | Requirement | Measure |
|----|----------|-------------|---------|
| NFR-01 | Performance | [Description] | [Target metric] |

## Integration Requirements
| Interface | Direction | System | Protocol | Frequency |
|-----------|-----------|--------|----------|-----------|

## Authorization Requirements
| Role | Auth Object | Access Level |
|------|------------|-------------|

## Constraints
| Constraint | Impact | Mitigation |
|------------|--------|-----------|

## Decisions Made
| # | Decision | Alternatives Rejected | Rationale |
|---|----------|-----------------------|-----------|

## Assumptions
| # | Assumption | Risk if Wrong |
|---|-----------|---------------|

## Open Questions
| # | Question | Owner | Due Date |
|---|----------|-------|----------|
```

## Verification

- [ ] All 7 requirement dimensions covered
- [ ] Edge cases and exception paths documented for each functional requirement
- [ ] Non-functional requirements quantified (not vague)
- [ ] All assumptions explicitly stated
- [ ] Open questions documented with owners
- [ ] Requirements document produced in structured format
- [ ] User confirmed completeness

## Next Skill

After completing this skill, invoke: `estimation` (to estimate the work)
Or: `solution-architecture` (to design the solution)

## Cross-References

- `estimation` — Uses requirements document as input for effort estimation
- `solution-architecture` — Uses requirements for architecture design
- `project-kickoff` — May invoke deep-interview as part of kickoff
- `fit-gap-analysis` — Uses requirements for fit/gap assessment
