---
name: team-execution
description: Use when a task requires parallel work by multiple specialized agents — e.g., simultaneous code review + security audit + performance check, or multi-object development where different agents handle different components. Orchestrates agent dispatch, manages dependencies, and merges results.
---

# Team Execution — Parallel Multi-Agent Orchestration

This skill coordinates multiple specialized agents working in parallel on different aspects of the same task. It dispatches agents, manages their execution order, handles dependencies between their outputs, and merges results into a unified deliverable.

## Iron Laws

1. **NEVER DISPATCH AGENTS WITHOUT A CLEAR TASK BOUNDARY.** Each agent must have a defined scope — what it does, what it does NOT do, and what output it produces. Overlapping scopes produce conflicting outputs.

2. **ALWAYS DEFINE MERGE CRITERIA BEFORE DISPATCHING.** Know how agent outputs will be combined before agents start. If merge strategy is undefined, the results will be a pile of fragments, not a coherent deliverable.

3. **NEVER IGNORE AGENT CONFLICTS.** If two agents produce contradictory recommendations (e.g., reviewer says "add error handling" and performance agent says "remove overhead"), resolve the conflict explicitly. Do not silently pick one.

4. **ALWAYS USE CONSENSUS GATES FOR CRITICAL DECISIONS.** Before proceeding past a major decision point, verify that all relevant agents agree or that conflicts are resolved. No majority-rules shortcuts.

5. **NEVER EXCEED 5 PARALLEL AGENTS.** More agents create more coordination overhead than value. If a task needs more than 5 agents, decompose into sequential team phases.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Dispatch all agents at once without coordination | "Parallel is faster" | Uncoordinated agents produce conflicting artifacts and duplicate work. | Define task boundaries and dependencies first. |
| Skip the merge step | "Each agent's output is self-contained" | Unmerged outputs force the user to synthesize. That's our job. | Iron Law 2. Always merge into a unified deliverable. |
| Resolve conflicts by picking the "best" recommendation | "The reviewer is more authoritative" | Authority is not resolution. The conflict reveals a design tension that needs explicit decision. | Iron Law 3. Document the conflict, present options, resolve. |

<HARD-GATE>
Before dispatching the team:
1. Task is decomposed into agent assignments with clear boundaries
2. Dependencies between agents are mapped (who waits for whom)
3. Merge strategy is defined (how outputs combine)
4. Conflict resolution protocol is established
</HARD-GATE>

## Execution Protocol

### Phase 1 — Task Decomposition

Break the task into agent-sized units:

```
TASK: [Overall objective]
├── Agent 1: [sap-reviewer] → Scope: [What they do] → Output: [What they produce]
├── Agent 2: [sap-security-auditor] → Scope: [...] → Output: [...]
├── Agent 3: [sap-test-designer] → Scope: [...] → Output: [...]
└── Dependencies: Agent 3 waits for Agent 1 output
```

### Phase 2 — Parallel Dispatch

Dispatch independent agents simultaneously using the Agent tool with parallel calls:
- Each agent gets: ROLE, TASK, CONTEXT, OUTPUT format, CONSTRAINTS
- Track dispatch time and expected completion
- Independent agents run in parallel; dependent agents wait

### Phase 3 — Result Collection

As agents complete:
- Collect and validate each output against expected format
- Flag any agent that failed or produced incomplete output
- Re-dispatch failed agents with clarified instructions (max 2 retries)

### Phase 4 — Conflict Resolution

Compare outputs for contradictions:
- **Agreement:** Both agents recommend the same approach → accept
- **Complementary:** Agents cover different aspects → merge directly
- **Conflict:** Agents disagree → document both positions, evaluate trade-offs, make explicit decision with justification

### Phase 5 — Merge & Deliver

Combine all agent outputs into a unified deliverable:

```
TEAM EXECUTION REPORT
======================
Task: [Description]
Agents Dispatched: [N]
Duration: [Time]

AGENT RESULTS
─────────────
[Agent 1 — Role]: [Summary of output]
[Agent 2 — Role]: [Summary of output]

CONFLICTS RESOLVED
──────────────────
[Conflict 1]: [Agent A said X, Agent B said Y → Decision: Z because...]

MERGED DELIVERABLE
──────────────────
[Unified output combining all agent work]
```

## Common Team Patterns

### Pattern: Code Quality Review
```
Dispatch parallel:
  sap-reviewer → code quality + clean ABAP
  sap-security-auditor → auth checks + injection risks
  sap-migration-analyzer → S/4HANA compatibility
Merge → Unified code review report
```

### Pattern: Go-Live Readiness
```
Dispatch parallel:
  sap-test-designer → test coverage verification
  sap-security-auditor → auth concept validation
  sap-data-analyst → data migration verification
  sap-process-modeler → process flow validation
Merge → Go/No-Go decision matrix
```

### Pattern: Multi-Object Development
```
Dispatch sequential phases:
  Phase 1 (parallel): sap-architect designs all objects
  Phase 2 (parallel): multiple code generators build objects simultaneously
  Phase 3 (parallel): sap-reviewer + sap-test-designer verify all objects
Merge → Complete development package
```

## Verification

- [ ] All agents dispatched with clear scope and output format
- [ ] All agent outputs collected and validated
- [ ] Conflicts identified and explicitly resolved
- [ ] Merged deliverable produced
- [ ] No agent output silently dropped
- [ ] Team execution report completed

## Next Skill

After team execution, invoke the skill appropriate to the original task context (e.g., `autopilot` continues its pipeline, `go-live-readiness` continues its gates).

## Cross-References

- `autopilot` — Uses team execution for parallel quality checks
- `go-live-readiness` — Uses team execution for parallel gate verification
- All agent definitions in `agents/` — The agents dispatched by this skill
