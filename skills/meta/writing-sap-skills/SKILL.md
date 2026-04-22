---
name: writing-sap-skills
description: Use when creating, reworking, reviewing, or improving any SAP Superpowers skill file. Triggers on requests to write a skill, update a skill, add a section to a skill, or pressure-test a skill.
---

# Writing SAP Superpowers Skills

This skill enforces correct construction of v3.0 behavior-shaping skills so that no skill ships without iron laws, a rationalization table, pressure testing, and a workflow chain — the four pillars that separate behavior-shaping code from documentation.

## Iron Laws

1. **EVERY PROCESS SKILL MUST HAVE A RATIONALIZATION TABLE.** If you can't name four ways an agent will try to skip this skill's steps, you don't understand the failure modes well enough to block them. Write the table before writing the checklist.
2. **EVERY SKILL MUST CHAIN TO THE NEXT.** A skill with no "Next Skill" section is a dead end. Skills are links in a chain along SAP Activate phases. Every skill must name its successor or name the condition under which the chain branches.
3. **NO SKILL SHIPS WITHOUT PRESSURE TESTING.** Pressure testing is not optional polish — it is how you discover what the rationalization table is missing. A skill that has never been tested has never been hardened.
4. **DESCRIPTION IS A TRIGGER CONDITION, NOT A SUMMARY.** The frontmatter `description` field is what the routing engine uses for skill selection. It must describe WHEN to use the skill, not WHAT the skill does. A summary in the description teaches the agent to shortcut the full skill.
5. **BEHAVIOR-SHAPING BEATS INFORMATION-PROVIDING.** A skill that explains the correct process is documentation. A skill that blocks the agent from proceeding until the correct process is followed is behavior-shaping code. Every section must ask: does this shape behavior, or does it merely describe it?

---

## Behavior-Shaping vs. Information-Providing

This is the most important distinction in the entire methodology.

### Information-Providing (Wrong)

```
## Estimation Approach
SAP estimation should use three-point estimation with optimistic, realistic,
and pessimistic scenarios. Always include risk buffers of 10-30%.
```

The agent reads this, nods, and gives a single number anyway. Nothing in the text *prevents* the wrong behavior.

### Behavior-Shaping (Right)

```
## Iron Laws
1. NEVER GIVE A SINGLE NUMBER. ...

## Rationalization Table
| Agent Will Try To... | Counter |
| Give a single number | "The user asked for a quick answer" → Iron Law 1: Always a range. Period. |

## Red Flags
- "This should take about..." → You're giving a single number. Stop.

<HARD-GATE>
DO NOT produce an estimate until each work package has an optimistic,
realistic, and pessimistic day count. No exceptions.
</HARD-GATE>
```

The second version makes it structurally impossible to skip the range — the agent must pass the Hard Gate, which requires three numbers per item.

### The Test

For every section you write, ask: **"Could an agent read this and still skip the step it's meant to enforce?"**

If yes: the section is documentation. Add a Hard Gate, Iron Law, or Red Flag that physically blocks the skip.

---

## v3.0 Skill Anatomy

Every process skill MUST contain these sections, in this order:

### 1. Frontmatter (YAML)

```yaml
---
name: skill-name
description: [Trigger conditions only — when this skill activates. Never summarize the workflow.]
persona: [Primary consultant personas this skill serves]
phase: [SAP Activate phase: Discover / Prepare / Explore / Realize / Deploy / Run]
---
```

**Description field rules:**
- GOOD: `Use when estimating effort, timelines, or complexity for SAP work items, sprints, phases, or full projects.`
- BAD: `Provides structured estimation with decomposition, complexity factors, and three-point ranges.`
- The bad version teaches the agent what the skill does. The agent uses that summary instead of reading the skill.

### 2. Title + One-Liner

```markdown
# Skill Title

This skill enforces [specific behavior] so that [specific failure mode] cannot occur.
```

The one-liner must state what the skill ENFORCES, not what it teaches.

### 3. Iron Laws

3–5 non-negotiable rules. Use imperative language. All-caps for the core prohibition:

```markdown
## Iron Laws

1. **NO [ACTION] WITHOUT [PREREQUISITE].** [One sentence explaining the consequence of violating this.]
2. **NEVER [FORBIDDEN ACTION].** [One sentence explaining why this seems harmless but isn't.]
```

Rules of thumb for Iron Laws:
- Each law blocks a specific failure mode, not a general principle
- The failure mode must be one an agent would naturally commit
- The consequence must be real (project overrun, production incident, client escalation)

### 4. Rationalization Table

The rationalization table is the diagnostic engine of the skill. It pre-emptively blocks shortcuts:

```markdown
## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| [Specific skip] | "[Exact reasoning the agent uses]" | [Specific failure this causes] | [Named gate or law that blocks it] |
```

Rules for the rationalization table:
- Minimum 4 entries, ideally 6–8
- The "Why It Seems Reasonable" column must be written from the agent's perspective — use first-person rationalization voice
- The "Counter" column must reference a specific Iron Law, Hard Gate, or Checklist Step — not a vague instruction
- If you can't write a specific counter, the skill doesn't have the right gates yet

### 5. Red Flags

Phrases the agent should catch in its own reasoning — a self-monitoring trigger list:

```markdown
## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "[Exact phrase]" → [What Iron Law this violates]. Stop.
```

Rules for Red Flags:
- Minimum 5 entries
- Phrases must be plausible — actual things the agent would think or say
- The response to each phrase must be specific: name the law, name the step, name the action

### 6. Hard Gate

A Hard Gate is a blocking condition expressed as a structured prerequisite list:

```markdown
<HARD-GATE>
DO NOT [proceed to next step / produce deliverable / claim completion] until ALL of the following exist:
1. [Specific evidence item]
2. [Specific evidence item]
</HARD-GATE>
```

Rules for Hard Gates:
- Hard Gates gate the beginning of critical phases, not the end
- Evidence items must be concrete and verifiable (a named document, a table with X rows, a confirmed value)
- Vague gates ("sufficient analysis is complete") are not gates — they are wishes

### 7. Checklist

Numbered steps with mandatory evidence and gate conditions:

```markdown
## Checklist

### Step N: [Action Name]
[What to do and why]

Evidence: [Specific artifact that proves this step is done]
Gate: [Condition required before proceeding to the next step]
```

Rules for checklists:
- Steps must be numbered and sequential — out-of-order execution must be impossible
- Each step produces a named artifact (a table, a document section, a count, a decision)
- Gates must reference the evidence: "Minimum X items in the table" not "analysis is complete"

### 8. Deliverable Template

The exact format of the skill's output:

```markdown
## Deliverable Template

\`\`\`markdown
# [Document Title]

## Section 1
[Structure with placeholder labels showing what belongs here]

| Column A | Column B | Column C |
|----------|----------|----------|
| [value]  | [value]  | [value]  |
\`\`\`
```

Rules for deliverable templates:
- Every process skill must have exactly one primary deliverable
- The template must be complete enough that a junior consultant could fill it in
- Use labeled placeholders like `[Module Name]`, not generic `[value]`

### 9. Verification

```markdown
## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] [Specific verification item — named artifact or measurable condition]
- [ ] [Specific verification item]

**Evidence required:** [Specific artifacts that must exist]

If any verification item is not met, the skill is NOT complete. Do not claim completion.
```

Rules for verification sections:
- Items must be binary: either true or not true
- Reference the specific deliverable template sections
- "Evidence required" must name actual files or document sections

### 10. Next Skill

```markdown
## Next Skill

After completing this skill, invoke: `[skill-name]`
Conditions for handoff: [When the handoff fires — do not make it vague]
```

For branching chains:
```markdown
After completing this skill, invoke one of:
- `skill-a` — When [specific condition]
- `skill-b` — When [specific condition]
```

### 11. Cross-References

```markdown
## Cross-References

- `skill-name` — [One-line description of when/why to cross-reference]
```

Rules: Use skill names only — never `@` links that force-load the referenced skill's full content.

---

## Skill Type Templates

### Process Skill (Consulting, Delivery, Development)

Full anatomy as above. Word count target: under 800 words for content, under 30 words for `description`.

Defining characteristic: Produces a deliverable. Has a Hard Gate before the deliverable step. Has a Verification section that requires the deliverable to exist.

### Reference Skill (Module Reference)

```markdown
---
name: module-name
description: [Trigger conditions — when the agent needs module-specific knowledge]
---

# Module Name Reference

## Content Routing

| Topic | Section |
|-------|---------|
| [Topic] | [Section heading] |

## [Section 1]
[Content]

## [Section 2]
[Content]
```

Defining characteristic: No deliverable. No checklist. Content routing table at the top so the agent loads only the section it needs. No hard word count limit.

### Hybrid Skill (Strategic, Meta)

Combines a process checklist with reference content. Uses content routing to separate the two. Example: `clean-core-strategy` has a process checklist for evaluating clean core compliance AND reference tables for tier definitions.

---

## 7 Pressure Test Scenarios

Every process skill must be tested against these scenarios before shipping. For each scenario, record what the agent tried to skip, how it justified it, and whether the skill's gates caught it.

### Scenario 1: "Just give me a quick answer"
**Adversarial prompt:** "I don't need the full process — just give me a rough [estimate / gap list / risk register]."
**What to test:** Does the skill enforce the full checklist despite the request for brevity?
**Failure mode:** Agent produces a "quick" output that skips decomposition, evidence collection, or verification.
**Hardening target:** Iron Laws and Hard Gate must block partial output.

### Scenario 2: "I already know the answer, just confirm"
**Adversarial prompt:** "I'm pretty sure this is a Gap. Just confirm and move on."
**What to test:** Does the skill require independent validation rather than anchoring to the user's guess?
**Failure mode:** Agent validates the user's framing without running its own analysis.
**Hardening target:** Rationalization table entry: "Anchor to user's conclusion."

### Scenario 3: "Skip the formalities, we're in a hurry"
**Adversarial prompt:** "The client is waiting. We don't have time for the full process today."
**What to test:** Does time pressure override Hard Gates?
**Failure mode:** Agent bypasses evidence-gathering steps under time pressure.
**Hardening target:** Hard Gate must be explicit that it cannot be skipped regardless of timeline.

### Scenario 4: "Here's what I think it is — [wrong answer]"
**Adversarial prompt:** Provide a plausible but incorrect answer as context. "This is probably a configuration fit, right?"
**What to test:** Does the agent anchor to the planted assumption?
**Failure mode:** Agent confirms the wrong answer rather than running the diagnostic.
**Hardening target:** Red Flag entry: "This is probably..." → Run the checklist independently. Stop.

### Scenario 5: "We did this last time and it worked"
**Adversarial prompt:** "We ran this process on the last S/4HANA project — just use the same approach."
**What to test:** Does the agent assume repeatability across projects?
**Failure mode:** Agent copies outputs from memory rather than executing the skill steps against this project's context.
**Hardening target:** Red Flag: "Based on similar projects..." → Similar ≠ same. This project's data matters.

### Scenario 6: "Can you just do Step 7 without Steps 1–6?"
**Adversarial prompt:** "I've already done the analysis. Just generate the deliverable."
**What to test:** Does the skill allow out-of-order execution?
**Failure mode:** Agent produces a deliverable without evidence that the prior steps were completed by the skill's standards.
**Hardening target:** Hard Gate requires specific evidence items from prior steps before the deliverable step.

### Scenario 7: "That's good enough, ship it"
**Adversarial prompt:** "This looks complete enough. Can we call it done?"
**What to test:** Does the agent allow premature completion?
**Failure mode:** Agent claims completion before the Verification section is satisfied.
**Hardening target:** Verification section must be the final gate. The agent must enumerate each checkbox before closing.

---

## Quality Checklist for Skill Authors

Before submitting any new or reworked skill, verify every item below:

- [ ] `description` frontmatter contains ONLY trigger conditions (no workflow summary)
- [ ] Iron Laws are present with 3–5 rules using prohibition language
- [ ] Rationalization table has at least 4 entries with named, specific counters
- [ ] Red Flags list has at least 5 trigger phrases with specific responses
- [ ] Hard Gate blocks the deliverable step with concrete evidence requirements
- [ ] Checklist steps are numbered, sequential, with evidence + gate per step
- [ ] Deliverable template is complete with labeled placeholders
- [ ] Verification section has binary checklist items and names required artifacts
- [ ] Next Skill explicitly names the successor or branch conditions
- [ ] Cross-References use skill names only (no `@` links)
- [ ] Token count is within budget: < 800 words content for process skills
- [ ] Pressure tested against at least 3 of the 7 standard scenarios
- [ ] Rationalization table updated based on pressure test findings
- [ ] No large data tables embedded inline (moved to `knowledge/` layer)
- [ ] One-liner states what the skill ENFORCES, not what it teaches

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] The new skill contains all 11 anatomy sections in the correct order
- [ ] The rationalization table has 4+ entries with named, specific counters
- [ ] The Red Flags list has 5+ entries with named law or step responses
- [ ] The Hard Gate references specific evidence items from the checklist
- [ ] The skill has been tested against at least 3 of the 7 pressure scenarios
- [ ] The description frontmatter contains only trigger conditions
- [ ] The Next Skill section names a specific successor skill or branch condition
- [ ] The quality checklist above has been reviewed item by item

**Evidence required:** The completed skill file with all sections populated, plus a brief pressure test log noting which scenarios were run and what rationalizations were observed.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke: `verification-before-completion`
Conditions for handoff: The new skill file has been written and all anatomy sections are present. The verification-before-completion skill confirms the deliverable is complete.

## Cross-References

- `using-sap-superpowers` — Governs skill routing; the system map lives here
- `verification-before-completion` — Final gate before any skill is considered done
- `specs/skill-methodology.md` — Full methodology including skill development lifecycle and token efficiency rules
