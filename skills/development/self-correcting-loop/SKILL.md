---
name: self-correcting-loop
description: Use when generated or modified ABAP code has syntax errors, ATC findings, test failures, or activation issues. Runs an iterative fix-check-fix loop until the code is clean, tested, and activated. Equivalent to a persistent development TDD cycle.
---

# Self-Correcting Loop

This skill runs an iterative fix → verify → fix cycle on ABAP code until all quality gates pass. It does not stop after one fix attempt — it loops until the code is syntax-clean, ATC-clean, test-passing, and successfully activated.

## Iron Laws

1. **NEVER DECLARE SUCCESS AFTER ONE FIX.** A fix that resolves one error often introduces another. Always re-run the full verification after every fix. The loop is: fix → full check → assess → repeat.

2. **NEVER FIX MORE THAN ONE ISSUE AT A TIME.** Batch fixes create cascading failures that are impossible to debug. Fix the first error, verify, then fix the next. Surgical precision, not shotgun patches.

3. **ALWAYS TRACK FIX HISTORY.** Every fix attempt is logged with: what was wrong, what was changed, and whether the check passed. This prevents circular fixes (fixing A breaks B, fixing B breaks A).

4. **STOP AFTER 10 ITERATIONS.** If 10 fix cycles cannot resolve the issue, the problem is architectural, not syntactical. Escalate to the user with the fix history — do not loop forever.

5. **NEVER WEAKEN THE CHECK TO PASS THE GATE.** If ATC flags a finding, fix the code — do not suppress the finding. If a test fails, fix the logic — do not delete the test. Weakening gates is not fixing.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Fix multiple errors at once | "I can see three errors, let me fix them all" | Multi-fix creates merge conflicts in your own reasoning. One change triggers side effects in others. | Iron Law 2. One fix per iteration. |
| Suppress ATC findings instead of fixing | "This is a false positive, I'll add a pragma" | If it were a false positive, explain why. Most "false positives" are real findings the developer doesn't want to fix. | Iron Law 5. Fix the code. |
| Skip re-running tests after a fix | "I only changed a comment, tests don't need to re-run" | You think you only changed a comment. Verify. | Iron Law 1. Full check after every fix. |
| Continue past 10 iterations | "I'm so close, one more try" | 10 failed attempts means the approach is wrong. More iterations won't help. | Iron Law 4. Escalate to user. |
| Delete a failing test | "The test is wrong, not the code" | Maybe. Document why the test is wrong. Write a better test. Don't delete evidence. | Iron Law 5. Fix tests, don't delete them. |

## Red Flags

- "This should fix everything..." → Iron Law 2. Fix one thing. Check. Then next.
- "Let me just suppress this warning..." → Iron Law 5. Fix the code.
- "Almost there, one more round..." → Check iteration count. If > 10, stop.
- "The test is too strict..." → The test is the specification. Fix the code.

<HARD-GATE>
Before entering the loop:
1. The code must be in a compilable state (or the first error identified)
2. The check suite must be defined (which checks to run: syntax, ATC, unit tests, activation)
3. The fix history log must be initialized
If entering from `autopilot`, these are inherited from the pipeline context.
</HARD-GATE>

## Loop Protocol

```
INITIALIZE
  → Define check suite: [syntax_check, atc_check, unit_tests, activation]
  → Initialize fix history: []
  → Set iteration = 0, max_iterations = 10

LOOP
  → iteration += 1
  → IF iteration > max_iterations: ESCALATE to user with fix history
  
  → RUN check suite
  → IF all checks pass: EXIT loop → SUCCESS
  
  → IDENTIFY first failing check
  → ANALYZE root cause of failure
  → APPLY single targeted fix
  → LOG fix to history: { iteration, error, fix_applied, files_changed }
  
  → GOTO LOOP

EXIT
  → Produce loop summary (iterations, fixes applied, final status)
```

### Check Suite Details

**Syntax Check:**
- Run ABAP syntax check on all modified objects
- Parse error messages for line number and error type
- Common fixes: missing declarations, type mismatches, obsolete statements

**ATC Check:**
- Run ATC with project check variant (Cloud or Standard)
- Categorize findings: P1 (must fix), P2 (should fix), P3 (consider)
- P1 and P2 must be resolved. P3 are documented but not blocking.

**Unit Tests:**
- Execute all test classes for modified objects
- Parse test results for: pass, fail, error, skip
- All tests must pass. Failed tests trigger code fix (not test deletion).

**Activation:**
- Activate all objects in dependency order (interfaces → classes → views)
- Handle dependent object activation failures
- Verify no remaining inactive objects in the transport

## Fix History Template

```
SELF-CORRECTING LOOP — FIX HISTORY
====================================
Object: [Object name]
Started: [Timestamp]
Check Suite: [syntax, atc, unit_tests, activation]

Iteration 1:
  Error: [Error description]
  Root Cause: [Analysis]
  Fix: [What was changed]
  Files: [Modified files]
  Result: [Pass/Fail — which check]

Iteration 2:
  ...

FINAL STATUS: ✅ ALL CHECKS PASS (iteration [N]) / ❌ ESCALATED (iteration 10)
Total fixes applied: [N]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] All checks in the check suite pass
- [ ] Fix history is complete with every iteration logged
- [ ] No ATC findings were suppressed (all were fixed)
- [ ] No tests were deleted or weakened
- [ ] Loop completed within 10 iterations OR escalated to user

**Evidence required:** Fix history log, final check suite results (all green).

## Next Skill

After completing this skill, return to the invoking skill (typically `autopilot` or `code-generation`) and continue the pipeline.

## Cross-References

- `autopilot` — Primary invoker of this skill
- `code-generation` — May invoke when generated code has issues
- `code-review` — May invoke when review findings need fixes
- `troubleshooting` — Invoke if the error is a runtime issue, not a compile-time issue
