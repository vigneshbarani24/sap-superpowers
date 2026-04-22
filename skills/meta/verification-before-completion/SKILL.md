---
name: verification-before-completion
description: Use before claiming ANY task is complete. Activates at the end of every skill execution, every deliverable generation, and every user request fulfillment. Blocks completion claims that lack enumerated evidence.
---

# Verification Before Completion

This skill enforces that no task is ever marked "done" without enumerated outputs, cited evidence, and a completed verification checklist. It is the quality gate for the entire SAP Superpowers system.

## Iron Laws

1. **NEVER SAY "DONE" WITHOUT LISTING WHAT WAS PRODUCED.** Completion is not a feeling. It is an inventory. Name every output: every file generated, every finding documented, every source cited. If you cannot list it, you did not produce it.

2. **NEVER SKIP VERIFICATION STEPS.** Every skill has a Verification section with checkboxes. Each box must be checked with evidence, not assumptions. Skipping a verification step because "it's obvious" is the number one cause of defective SAP deliverables.

3. **ALWAYS PROVIDE EVIDENCE, NOT ASSERTIONS.** "This should work" is an assertion. "Tested in SE38, output matches expected result per test case TC-004" is evidence. "The config looks correct" is an assertion. "SPRO path X > Y > Z verified, field ABC set to value 123 matching spec section 4.2" is evidence.

4. **NEVER CONFUSE COVERAGE WITH CORRECTNESS.** Touching every item on a checklist is coverage. Producing verifiable output for every item is correctness. Coverage without correctness is a false completion.

5. **COMPLETION IS BINARY.** A task is either verified-complete or not-complete. There is no "mostly done," "essentially complete," or "done except for." If any verification item fails, the task is not complete. Period.

## What "Done" Means by Skill Type

### Process Skills (Consulting, Delivery)

A process skill is complete when:
- A **deliverable file** has been generated (Markdown document, matrix, plan, runbook)
- The deliverable follows the skill's **template** exactly
- Every section of the template is filled with **project-specific content**, not placeholders
- The skill's **verification checklist** is fully satisfied
- The **next skill** in the workflow chain has been identified and communicated

**Evidence:** The deliverable file path, section-by-section confirmation, verification checklist status.

### Development Skills

A development skill is complete when:
- **Code** has been written, reviewed, or analyzed as the skill requires
- **Findings** are documented in a structured format (table, report, annotated code)
- **Sources** are cited for any SAP-specific claims (SAP Notes, documentation, knowledge layer)
- The skill's **verification checklist** is fully satisfied
- No **open items** remain unaddressed (every finding has a resolution or explicit deferral)

**Evidence:** Code artifacts, findings report, source citations, verification checklist status.

### Reference Skills (Module Skills)

A reference skill is complete when:
- The user's question is answered with **specific, sourced information**
- **Transaction codes**, **configuration paths**, **table names**, or **API names** are verified against the knowledge layer
- Any **limitations or caveats** are stated explicitly
- **Alternative approaches** are mentioned where relevant

**Evidence:** Source citations (knowledge layer file, SAP Note number, documentation reference), specificity of answer (not generic).

### Review Skills

A review skill is complete when:
- **All findings** are documented in a structured findings table
- Each finding has a **severity**, **description**, **location**, and **recommendation**
- **No areas were skipped** — the review scope is fully covered
- A **summary** with counts by severity is provided

**Evidence:** Findings table, scope coverage confirmation, severity summary.

### Meta Skills

A meta skill is complete when:
- The **routing, chain, or governance action** it prescribes has been executed
- The downstream skill has been **correctly identified and invoked**
- The meta skill's own **verification checklist** is satisfied

**Evidence:** Named skill invoked, governance action taken, verification checklist status.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Claim "done" after explaining the process | "I covered everything thoroughly in my explanation" | An explanation is not a deliverable. The user cannot hand an explanation to their steering committee. | HARD-GATE: List every output artifact. If no file was generated for a process skill, it is not done. |
| Say "the user seems satisfied" | "They said 'thanks' or 'that's great'" | User satisfaction is not verification. Users often accept incomplete work because they trust the agent. That trust must be earned with evidence. | Satisfaction is not verification. Complete the verification checklist regardless of user reaction. |
| Treat a quick question as exempt | "It's just a quick question — no need for full verification" | Quick questions still need accurate answers with sources. An unsourced quick answer to an SAP config question can cause production incidents. | Quick questions still need: correct answer + source citation + caveat disclosure. |
| Say "I already covered this" | "I mentioned it earlier in the conversation" | Mentioned is not verified. Earlier in the conversation is not the current deliverable. Each task stands on its own verification. | Covered is not verified. Show the evidence for THIS task, not a reference to a prior mention. |
| Skip verification for "obvious" items | "This is clearly correct, no need to double-check" | "Obviously correct" SAP configurations cause 30% of go-live incidents. Nothing is obvious in a system with 300K+ config tables. | Every checklist item gets evidence. Obvious items are the most dangerous to skip because no one checks them. |
| Bundle multiple completions together | "I finished tasks A, B, and C — all done" | Bundled completion hides individual gaps. Task B might be 80% done while A and C are complete. | Each task gets its own verification checklist. Complete them individually. |
| Declare completion with caveats | "Done, but note that X, Y, and Z still need attention" | If X, Y, and Z need attention, the task is not done. It is partially done with known gaps. | If there are open items, the task status is "in progress with N open items," not "done." |
| Use weasel words for untested claims | "This should handle most cases" / "This is likely correct" | "Should," "likely," "probably," and "most" are uncertainty markers dressed as confidence. They mean "I did not verify." | Replace every "should" with tested evidence. Replace every "likely" with a specific condition under which the claim holds. |

## Red Flags

Watch for these phrases in your own reasoning — each signals you are about to claim false completion:

- **"I believe this is complete"** --> "Believe" is not "verified." Check the verification checklist.
- **"This should work"** --> "Should" means untested. Test it or cite evidence that it works.
- **"I think we're done"** --> "Think" means uncertain. Run through the verification checklist item by item.
- **"That covers everything"** --> Does it? List every output. Compare against the skill's template. Confirm nothing is missing.
- **"The rest is straightforward"** --> The "straightforward rest" is where defects hide. Complete it.
- **"We can finalize this later"** --> Later is never. Either it is done now with evidence, or it is explicitly deferred with a reason.
- **"Essentially complete"** --> Essentially is not actually. What is missing?
- **"Good enough for now"** --> "Good enough" in SAP means "will cause a problem later." Meet the verification standard.
- **"I'm fairly confident"** --> Fairly confident means not fully confident. What would make you fully confident? Do that.
- **"Just needs a quick review"** --> If it needs review, it is not verified. Do the review.

**If you catch yourself thinking any of these: STOP. Open the skill's Verification section. Check every item. Produce the evidence.**

<HARD-GATE>
Before claiming ANY task is complete, you MUST:

1. ENUMERATE every output artifact produced (files, tables, findings, recommendations).
2. MAP each artifact to the invoking skill's template/requirements — no required section may be empty or placeholder.
3. COMPLETE the invoking skill's verification checklist with specific evidence for each item.
4. CONFIRM that no open items remain. If items are deferred, list them explicitly with reasons.
5. STATE the next skill in the workflow chain, if applicable.

If you cannot complete ALL five steps above, the task is NOT done. Say: "This task is not yet complete. Outstanding items: [list]."

Claiming completion without completing this gate is a system violation.
</HARD-GATE>

## Checklist

Execute this checklist at the end of every skill, every deliverable, and every task completion:

1. **Inventory outputs** — List every artifact produced during this task.
   - Evidence: A numbered list of outputs with file paths or inline locations.
   - Gate: At least one tangible output must exist for process skills. Reference skills must have sourced answers.

2. **Cross-check against skill template** — Compare outputs against the invoking skill's template or requirements.
   - Evidence: Section-by-section confirmation ("Template section X: covered in output section Y").
   - Gate: No required template section may be missing or contain only placeholders.

3. **Verify factual claims** — Every SAP-specific claim (Note numbers, tcodes, config paths, API names) must be sourced.
   - Evidence: Source citation for each factual claim (knowledge layer file, SAP documentation, tested output).
   - Gate: No unsourced factual claims remain.

4. **Check for weasel words** — Scan your output for "should," "likely," "probably," "most," "generally," "typically" used as substitutes for evidence.
   - Evidence: Each instance either replaced with evidence or explicitly flagged as an assumption.
   - Gate: No weasel word is used to disguise an unverified claim.

5. **Confirm completion status** — Determine the final status.
   - **Complete:** All verification items pass. State: "Task complete. Outputs: [list]. Verification: all items pass."
   - **Incomplete:** One or more items fail. State: "Task incomplete. Outstanding: [list]. Next steps: [actions needed]."
   - Gate: Status must be binary — complete or incomplete. No "mostly done."

6. **Identify chain continuation** — Name the next skill in the workflow chain.
   - Evidence: Next skill named with trigger condition.
   - Gate: User informed of chain continuation or explicit reason for chain termination.

## Verification (Self-Referential)

This skill verifies that verification itself was performed. It is complete ONLY when ALL of the following are true:

- [ ] The 6-step checklist above was executed for the current task
- [ ] Every output artifact was enumerated (Step 1)
- [ ] Outputs were cross-checked against the invoking skill's template (Step 2)
- [ ] Factual claims were sourced (Step 3)
- [ ] Weasel words were eliminated or flagged (Step 4)
- [ ] Completion status was stated as binary — complete or incomplete (Step 5)
- [ ] Workflow chain continuation was identified (Step 6)
- [ ] The HARD-GATE's five requirements were all satisfied

**Evidence required:** The completed checklist above with specific evidence for each step. Not checkmarks — evidence.

**Self-verification check:** Did you just check these boxes without producing evidence for each one? If yes, you have failed this skill. Go back and produce the evidence.

If any verification item is not met, this skill is NOT complete, which means the underlying task is NOT complete. Do not claim completion.

## Next Skill

This skill does not chain forward — it is the final gate. After verification passes, control returns to `using-sap-superpowers` for routing the next request. If the verified skill has its own "Next Skill" section, that chain takes priority.

## Cross-References

- `using-sap-superpowers` — Master routing skill; invokes this skill at every completion point
- `writing-sap-skills` — When creating skills, this skill verifies the new skill meets quality standards
- Every process skill — Each has a Verification section that this skill enforces
- Every development skill — Findings must be documented and sourced per this skill's standards
- Every module reference skill — Answers must be specific and sourced per this skill's standards
