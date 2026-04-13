---
name: sap-kickoff
description: Trigger project kickoff for a new SAP engagement — generates a full project charter with scope, governance structure, RACI matrix, and risk register.
---

# /sap-kickoff

Invokes the `project-kickoff` skill to structure and document the start of an SAP project or phase. Enforces that scope, governance, roles, and risks are defined before any delivery work begins. Produces a client-ready project charter.

## Usage

```
/sap-kickoff [project name]
```

**Arguments:**
- `[project name]` — The name or brief description of the project. Additional context (client, modules, deployment model) will be gathered through the skill's structured intake process.

**Examples:**
- `/sap-kickoff Acme Group S/4HANA Greenfield — Phase 1 Discovery`
- `/sap-kickoff RetailCo RISE with SAP migration — FI CO MM SD`
- `/sap-kickoff BTP Integration Layer for HealthCo — Phase 2 Realize`

## What Happens

1. The `project-kickoff` skill activates and runs a structured intake — project type, client details, scope, team size, deployment model, timeline.
2. The skill enforces governance definition before proceeding — steering committee, decision authority, escalation paths must be named.
3. RACI matrix is built for all key roles: workstream leads, client counterparts, SI team, hyperscaler contacts.
4. Risks are identified and rated using a probability/impact matrix — not listed generically.
5. Success criteria and measurable outcomes are captured explicitly.
6. The skill chains to `estimation` skill if effort has not yet been confirmed.
7. Output is a structured project charter file ready for client review.

## Output

A **Project Charter** document containing:

| Section | Content |
|---------|---------|
| Project Overview | Objectives, scope statement, out-of-scope |
| Delivery Approach | SAP Activate phases, milestones, timeline |
| Governance | Steering committee, decision-making authority, meeting cadence |
| RACI Matrix | All roles mapped to responsibilities |
| Team Structure | Org chart with workstream leads and client contacts |
| Risk Register | Top 10 risks with probability, impact, and mitigation |
| Success Criteria | Measurable outcomes tied to business value |
| Assumptions & Constraints | Named explicitly — nothing implied |
| Sign-off Block | Approval section for client and SI leads |

## Example

```
/sap-kickoff NovaTech S/4HANA Brownfield — FI CO MM SD PP

> Activating project-kickoff skill...
> Intake: Brownfield conversion, 4 modules, 2 company codes, go-live target Q4
> Governance: 3 steering members identified, bi-weekly cadence set
> RACI: 18 roles mapped across client and SI team
> Risks: 7 risks identified and rated — 2 high, 4 medium, 1 low
> Generating project charter...
```
