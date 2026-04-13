---
name: code-review
description: Use when reviewing ABAP code, SAP development artifacts, CDS views, or any custom SAP code before transport release, pull request approval, or go-live sign-off.
---

# SAP Code Review

This skill enforces zero-tolerance code quality gates — it makes approving dangerous, non-performant, or insecure SAP code structurally impossible.

## Iron Laws

1. **NEVER APPROVE SELECT IN LOOPS.** A SELECT statement inside a LOOP...ENDLOOP, DO...ENDDO, or WHILE...ENDWHILE is an automatic rejection. No exceptions. Not even for "small tables." One SELECT in a loop that runs against a large dataset is a production system outage.
2. **NEVER APPROVE CODE WITHOUT AUTHORITY CHECKS.** Any code that reads, writes, or executes against business data must have explicit AUTHORITY-CHECK statements. "The calling program already checks authority" is not acceptable — each component enforces its own authorization.
3. **NEVER APPROVE MODIFICATIONS TO SAP STANDARD.** No direct modification to SAP-delivered objects. Enhancements must use released BAdIs, User Exits, Enhancement Spots, or CDS extensions. SAP standard modifications are overwritten at every support package upgrade.
4. **NEVER APPROVE WITHOUT ATC CLEAN.** Code that has not been run through ABAP Test Cockpit (ATC) with no open Priority 1 or Priority 2 findings cannot be approved. ATC findings are not suggestions — they are known defects.
5. **NEVER APPROVE CODE THAT ACCESSES DEPRECATED OR LOCKED TABLES DIRECTLY.** In S/4HANA, tables like BSEG, VBAP, MARA have compatibility views or released CDS entities. Direct table access that bypasses the virtual data model creates upgrade incompatibilities.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Approve a SELECT in a loop "because the table is small" | "There are only 100 records in that table now" | Tables grow. A table with 100 records today will have 1,000,000 in two years. The code will still be in production. | Iron Law 1. No SELECT in loops, regardless of current table size. Refactor to SELECT...FOR ALL ENTRIES or JOIN. |
| Skip authority check review because "the Fiori app controls access" | "The tile and role assignment handle authorization" | Direct RFC calls, background jobs, and API access all bypass Fiori tile authorization. Every executable unit must check authority independently. | Iron Law 2. Show me the AUTHORITY-CHECK statement. If it doesn't exist, the review fails. |
| Approve a modification because "it's the only way" | "There's no BAdI for this, modification is the only option" | There is almost always a released API, Enhancement Framework entry, or alternative approach. "Only way" usually means "fastest way I found." | Checklist Step 5: Document the three alternatives investigated before modification is considered. Modification requires architect sign-off. |
| Treat ATC findings as optional | "These are just warnings, not real errors" | ATC Priority 2 findings include security vulnerabilities, performance anti-patterns, and clean core violations. They are categorized warnings for a reason. | Iron Law 4. ATC clean is a gate, not a guideline. P1 and P2 findings must be resolved or formally suppressed with justification. |
| Approve code using BSEG directly in S/4HANA | "BSEG still exists in S/4HANA, it works" | BSEG in S/4HANA is a compatibility view. Direct access is inefficient and will break at clean core enforcement. Use I_JournalEntryItem or equivalent released CDS. | Iron Law 5. Direct access to compatibility views is a clean core violation. Use released APIs. |
| Skip performance review for "simple" programs | "It's just a small report" | "Small reports" run in batch. Batch programs process full table sets. A report that takes 5 seconds per record × 1M records = 6 days of runtime. | Checklist Step 3: Performance review applies to every program, regardless of perceived complexity. |
| Approve hardcoded values without constants | "The value is obvious from context" | Hardcoded values become silent bugs when configuration changes. Magic numbers and strings are the root cause of countless production defects. | Checklist Step 4: Constants, not hardcoded literals. Every unexplained literal is a review finding. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you're about to approve a violation:

- "The table is small, so SELECT in a loop is fine..." → Iron Law 1. Tables grow. Reject.
- "Authorization is handled at the UI layer..." → Iron Law 2. Each component checks authority independently. Show me the AUTHORITY-CHECK.
- "There's no enhancement option, we have to modify..." → Iron Law 3. Investigate alternatives before accepting this claim. Escalate to architect.
- "ATC findings are just warnings we can ignore..." → Iron Law 4. P1 and P2 are gates. Resolve or suppress with documented justification.
- "This code is basically the same as the existing code..." → Similar code with the same defects is still defective. Review independently.
- "The developer is experienced, it's probably fine..." → Experience does not substitute for review. Every piece of code gets the same review.
- "We're short on time, a quick look is enough..." → Quick looks miss SELECT in loops. Follow the checklist.
- "This is just a temporary solution..." → Temporary solutions become permanent. Review as if it will be in production for 10 years, because it will.

<HARD-GATE>
Before approving any code: confirm (1) ATC has been run and all P1/P2 findings are resolved or formally suppressed, (2) there are no SELECT statements inside loops, (3) all AUTHORITY-CHECK requirements have been verified, and (4) no SAP standard objects have been modified. If any of these four conditions is not confirmed, the review CANNOT be approved.
</HARD-GATE>

## Checklist

1. **Structural review — syntax and completeness** — Run SLIN and ATC (transaction SE38 → Check → Extended Program Check, or ATC via SATC). Review all findings.
   - Evidence: ATC run results showing zero P1 and P2 open findings. Screenshot or export of SATC results.
   - Gate: No P1 or P2 ATC findings open. P3 findings documented with disposition (fix or accepted risk with justification).

2. **SELECT statement analysis** — Scan every SELECT statement in the code. Verify: no SELECT inside LOOP/DO/WHILE, all SELECTs specify only required fields (no SELECT *), WHERE clauses use primary key or indexed fields, large result sets use SELECT...INTO TABLE with PACKAGE SIZE for batch processing.
   - Evidence: List of all SELECT statements with their location (line number), fields selected, and WHERE clause content. Confirm no SELECT inside loops.
   - Gate: All SELECTs use explicit field lists. No SELECT inside any loop construct. Large table reads use appropriate buffering or PACKAGE SIZE.

3. **Performance pattern review** — Check for: internal table types (SORTED or HASHED tables used where binary/hash lookup needed, not STANDARD tables with READ TABLE), string operations in loops, CONCATENATE or string operations inside large loops, CALL FUNCTION in loops (should be batch calls or refactored).
   - Evidence: Internal table declarations reviewed. Table type matched to access pattern (SORTED = sorted read/range, HASHED = keyed lookup, STANDARD = sequential only).
   - Gate: Internal table types are appropriate for the access pattern. No obvious O(n²) patterns present.

4. **Clean core compliance check** — Verify: no direct access to S/4HANA compatibility tables (BSEG, VBAP, EKKO, MARA where CDS equivalents exist), no use of obsolete statements (WRITE, MOVE-CORRESPONDING on non-compatible structures without explicit mapping), only released APIs used for cross-module access, BTP/Cloud deployable code uses restricted ABAP syntax.
   - Evidence: List of external table/API accesses with confirmation each is on the released API list. Check via transaction TAANA or the SAP API Business Hub.
   - Gate: No access to non-released APIs. No use of statements flagged as non-Cloud-compliant if the code targets ABAP Cloud.

5. **Authorization checks** — Identify all objects and operations the code accesses (reads financial data, modifies MM records, executes function modules with sensitive data). Confirm AUTHORITY-CHECK statement present for each object/activity combination. Verify SY-SUBRC is checked immediately after every AUTHORITY-CHECK.
   - Evidence: Map of data objects accessed → AUTHORITY-CHECK statements in code. SY-SUBRC check confirmed for each AUTHORITY-CHECK.
   - Gate: Every sensitive data operation has an AUTHORITY-CHECK. Every AUTHORITY-CHECK has an SY-SUBRC check with appropriate error handling (not just WRITE / MESSAGE — proper exception or user feedback).

6. **SAP standard modification check** — Confirm no SAP-delivered objects (programs, function groups, dictionary objects with namespace without Z/Y or customer namespace) have been modified. Enhancement implementations use only released framework (BAdI, Enhancement Spot, CDS extension).
   - Evidence: List of objects changed in the transport. Each object confirmed as customer-namespace (Z/Y/registered) or confirmed as a released enhancement point only.
   - Gate: Zero modifications to SAP standard objects. If any exist, halt — escalate to architect for architecture review before proceeding.

7. **Error handling review** — Verify: no CATCH without handling (empty CATCH blocks), no MESSAGE without user guidance, SY-SUBRC checked after every CALL FUNCTION/CALL METHOD that can fail, no COMMIT WORK inside function modules (commit belongs with the caller), database error handling present for all DML operations.
   - Evidence: All CATCH/EXCEPTIONS blocks reviewed for meaningful handling. No silent failures (empty CATCH, unchecked SY-SUBRC on critical calls).
   - Gate: Every error condition has a documented handling path — user message, log entry, exception raise, or explicit documented decision to ignore (with justification comment in code).

8. **Code readability and maintainability** — Check: method/function length (methods over 100 lines need justification or refactoring), naming follows project conventions, no commented-out code blocks in final version, no hardcoded values that belong in customizing or constants, inline documentation present for complex logic.
   - Evidence: Method/function line count confirmed. No magic numbers or strings. No dead code blocks. Complex algorithms have comments explaining the "why" not just the "what."
   - Gate: No method over 100 lines without documented justification. No hardcoded values. No commented-out code.

## Review Finding Template

```
CODE REVIEW FINDING
===================
Transport: [Transport number]
Object: [Program/class/function group name]
Finding ID: [Sequential number]
Severity: BLOCKER | MAJOR | MINOR
Category: Performance | Security | Clean Core | Standards | Error Handling

Location: Line [XX] in [method/form name]
Finding: [What the problem is — specific, not generic]
Evidence: [Code snippet or description showing the exact issue]
Required Action: [What must change before approval]
Approved: YES / NO
Approver: [Name]
Date: [Date]
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] ATC run completed — zero P1 and P2 open findings (or all formally suppressed with justification)
- [ ] No SELECT statements inside any loop construct confirmed
- [ ] All sensitive data access has AUTHORITY-CHECK with SY-SUBRC check
- [ ] No modifications to SAP standard objects
- [ ] Clean core compliance confirmed — only released APIs accessed
- [ ] Error handling review complete — no silent failures
- [ ] All BLOCKER and MAJOR findings resolved before approval
- [ ] Review finding log completed with disposition for every finding
- [ ] Formal approval recorded with approver name and date

**Evidence required:** ATC results export, review finding log with all findings and dispositions, signed approval record (physical or digital) with approver name.

## Next Skill

After completing this skill, invoke: `development-workflow`
Conditions for handoff: After review approval, return to development-workflow Step 6 (release transport from DEV) with approval evidence attached.

## Cross-References

- Use `development-workflow` for transport release process after approval
- Use `troubleshooting` if ATC findings indicate runtime errors or dump patterns
- Use `code-generation` to regenerate code sections that failed review rather than manually patching anti-patterns
- Use `performance-tuning` when review identifies performance anti-patterns that need deeper analysis
