---
name: autopilot
description: Use when the user wants end-to-end autonomous ABAP development — from idea to tested, activated, transport-ready code. Chains through requirements → design → generate → test → activate → verify in a single pipeline.
---

# SAP Autopilot — Autonomous Development Pipeline

This skill executes the full ABAP development lifecycle autonomously — from a user's idea to tested, ATC-clean, activated code in a transport. It chains the right skills and agents in sequence, handling errors along the way.

## Iron Laws

1. **NEVER SKIP THE DESIGN PHASE.** Jumping from idea to code produces code that solves the wrong problem. Requirements must be confirmed, data model must be designed, and API dependencies must be identified before any implementation begins.

2. **NEVER ACTIVATE WITHOUT TESTS.** Code that compiles is not code that works. Every generated class must have unit tests that pass before activation is attempted. Untested activation is shipping hope.

3. **NEVER PROCEED PAST A FAILED GATE.** If syntax check fails, fix it. If ATC has P1 findings, fix them. If tests fail, fix them. The pipeline does not skip gates — it loops until clean.

4. **ALWAYS USE THE SELF-CORRECTING LOOP FOR FIXES.** When a gate fails, invoke `self-correcting-loop` to iteratively fix → check → fix until clean. Do not manually patch and hope. The loop has discipline you lack.

5. **ALWAYS PRODUCE A COMPLETION RECORD.** When the pipeline finishes, a structured completion record documents every object created, every test result, and the final transport number. No record = pipeline not complete.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip requirements confirmation | "The user was very specific" | Users describe what they want, not what they need. Ambiguity hides in specificity. | Confirm requirements explicitly. Repeat back the understanding. Get a yes. |
| Generate code before designing the data model | "I'll figure out the data model as I code" | Retrofitting a data model produces spaghetti dependencies and incorrect CDS view hierarchies. | Complete Step 2 (Design) fully before Step 3 (Generate). |
| Skip unit tests for "simple" methods | "Getters don't need tests" | Getters fail on null refs, auth failures, and data type mismatches. | Iron Law 2. Every method gets a test. No exceptions. |
| Manually fix errors instead of using self-correcting-loop | "I can see the fix, it's obvious" | Manual fixes introduce new errors. The loop catches what you miss. | Iron Law 4. Use the loop. Always. |
| Activate before ATC completes | "ATC is running, but the code looks clean" | ATC catches what syntax check misses — performance issues, security holes, deprecated APIs. | Wait for ATC. No activation without P1/P2 clean. |

## Red Flags

- "Let me just quickly scaffold this..." → You're skipping design. Stop.
- "Tests can come after..." → Iron Law 2. Tests come with the code.
- "This small fix doesn't need the loop..." → Iron Law 4. Use the loop.
- "ATC is being overly cautious..." → ATC found something. Fix it.
- "The user is in a hurry..." → Rushed code is broken code shipped faster.

<HARD-GATE>
Before starting the autopilot pipeline:
1. User has confirmed the requirements (repeated back, got explicit yes)
2. Target SAP platform is established (ABAP Cloud / S/4HANA on-prem / ECC)
3. ABAP release is confirmed (702-758)
4. Transport request number is provided or created
5. MCP server connection is verified (if using live system)
If any condition is not met, complete it before proceeding.
</HARD-GATE>

## Pipeline Steps

### Step 1 — Requirements Confirmation
**Agent:** Main (no delegation)
**Input:** User's idea or request
**Process:**
1. Parse the request into: WHAT (object type), WHY (business need), HOW (technical approach)
2. Identify the SAP module context and load the relevant module skill
3. Repeat back understanding to the user in structured format
4. Get explicit confirmation before proceeding

**Gate:** User confirmed requirements. No ambiguity remaining.

### Step 2 — Design
**Agent:** `sap-architect` (dispatched)
**Input:** Confirmed requirements
**Process:**
1. Define object structure (classes, interfaces, CDS views, RAP BOs)
2. Map data dependencies to released CDS entities / APIs
3. Identify authorization objects required
4. Define test strategy (what to test, what to mock)
5. Produce a design brief

**Gate:** Design brief reviewed. All data access uses released APIs. No physical table dependencies.

### Step 3 — Generate Structure
**Skill:** `code-generation` (invoked — Steps 1-3)
**Input:** Design brief
**Process:**
1. Generate interface definitions (ZIF_*)
2. Generate class skeletons (ZCL_*)
3. Generate CDS view hierarchy (ZI_*, ZC_*)
4. Generate RAP behavior definition if applicable
5. Run syntax check on all generated objects

**Gate:** All structures compile clean. No syntax errors.

### Step 4 — Generate Tests
**Skill:** `code-generation` (invoked — Step 4)
**Agent:** `sap-test-designer` (dispatched for test case design)
**Process:**
1. Generate test class for each implementation class
2. Create test doubles for dependencies
3. Write happy path, error path, and boundary tests
4. Verify test structure compiles

**Gate:** Test classes compile. Test structure covers all public methods.

### Step 5 — Generate Implementation
**Skill:** `code-generation` (invoked — Step 5)
**Process:**
1. Implement business logic method by method
2. Follow coding standards from `common/` conventions
3. Apply ABAP release-specific syntax (per config)
4. Add error handling on every external call
5. Run tests after each major implementation block

**Gate:** All unit tests pass. No implementation gaps.

### Step 6 — Quality Check
**Agents:** `sap-reviewer` + `sap-security-auditor` (parallel dispatch)
**Process:**
1. Run ATC with configured check variant
2. Code review against clean core / clean ABAP standards
3. Security audit for auth checks and injection risks
4. Performance review for N+1 queries and full table scans

**Gate:** ATC P1/P2 clean. No critical code review findings. No security findings.

### Step 7 — Fix Loop (if needed)
**Skill:** `self-correcting-loop` (invoked if any Step 6 gate fails)
**Process:** Iterative fix → check → fix until all gates pass.

### Step 8 — Activate & Transport
**Process:**
1. Activate all objects in dependency order
2. Verify activation success (no inactive objects)
3. Assign all objects to transport request
4. Run final syntax check on activated objects
5. Produce completion record

**Gate:** All objects active. All in transport. Final syntax clean.

## Completion Record Template

```
AUTOPILOT COMPLETION RECORD
============================
Request: [Original user request]
Platform: [SAP version / ABAP release]
Transport: [Transport number]
Duration: [Pipeline execution time]

OBJECTS CREATED
───────────────
[Type] | [Name] | [Description] | [Status]

TESTS
─────
Total: [N] | Passed: [N] | Failed: [0]

ATC
───
Check variant: [Name]
P1: 0 | P2: 0 | P3: [N]

CODE REVIEW
───────────
Critical: 0 | Major: 0 | Minor: [N]

SECURITY
────────
Findings: 0

PIPELINE RESULT: ✅ SUCCESS / ❌ FAILED AT [step]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Requirements confirmed by user
- [ ] Design brief produced and reviewed
- [ ] All objects generated and compile clean
- [ ] Unit tests generated and all pass
- [ ] ATC run with zero P1/P2 findings
- [ ] Code review completed with zero critical findings
- [ ] All objects activated successfully
- [ ] All objects assigned to transport
- [ ] Completion record produced with all evidence

**Evidence required:** Completion record with all sections filled.

## Next Skill

After completing this skill, invoke: `code-review` (for peer review of the generated code)
If the user wants to deploy: chain to `testing-strategy` → `go-live-readiness`

## Cross-References

- `self-correcting-loop` — Invoked when any gate fails
- `code-generation` — Handles the actual code generation steps
- `code-review` — Post-pipeline peer review
- `team-execution` — Use instead of autopilot when multiple developers need parallel work
