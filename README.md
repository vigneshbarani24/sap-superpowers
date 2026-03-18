# SAP Superpowers

**The SAP consultant's AI operating system — for Claude Code**

> What [superpowers](https://github.com/obra/superpowers) did for software engineering, SAP Superpowers does for SAP consulting.

Stop guessing. Start following proven processes. SAP Superpowers gives you **enforced workflows** with checklists, decision trees, and hard gates — so you never skip a critical step again.

---

## Quick Start

### 1. Install Claude Code

If you don't have Claude Code yet:

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Install SAP Superpowers

```bash
claude
# Inside Claude Code:
/plugin marketplace add vigneshbarani24/sap-superpowers
```

### 3. Start using it

Just mention SAP topics and the right skill activates automatically. Or use slash commands:

```
/sap-debug        → Systematic SAP troubleshooting
/sap-estimate     → Structured effort estimation
```

That's it. No config. No API keys. No setup.

---

## What You Get

### `/sap-debug` — Never Guess at Fixes Again

**The problem:** You get an SAP error. You Google it. You try random fixes. 3 hours later, you find the root cause was something you could have checked in 5 minutes.

**With SAP Superpowers:**

```
You:     "I'm getting a MESSAGE_TYPE_X dump in transaction VA01"

Claude:  Using sap-troubleshooting skill...

         Step 1: Capturing symptom
         → Dump type: MESSAGE_TYPE_X
         → Transaction: VA01
         → Let me check ST22 for the short dump details.
         What is the exact exception class and triggering program?

You:     "CX_SY_ZERODIVIDE in program ZSD_PRICING_EXIT"

Claude:  Step 2: Classified as ABAP Layer (short dump)
         Step 3: Gathering evidence
         → The dump is in a custom pricing exit (ZSD_PRICING_EXIT)
         → CX_SY_ZERODIVIDE means division by zero
         → Check line 42 of the program — a pricing condition
           value is being divided by quantity, but quantity is 0.

         Step 4: SAP Notes search
         → SAP Note 2345678: "Division by zero in pricing exits
           when quantity is initial"

         Step 5: Root cause identified
         → Missing null check before division in custom pricing exit

         Step 6: Proposed fix with rollback plan...
```

**What makes it different:** The skill forces you through 7 diagnostic steps. No jumping to conclusions. No guessing. Evidence first, fix second.

---

### `/sap-estimate` — Stop Giving Single-Number Estimates

**The problem:** "How long will this take?" You say "5 days." It takes 15. Every time.

**With SAP Superpowers:**

```
You:     "Estimate building a custom Fiori app for purchase order approval"

Claude:  Using sap-estimation skill...

         ## Estimate: PO Approval Fiori App

         ### Decomposition
         | # | Task              | Base   | Complexity | Adjusted |
         |---|-------------------|--------|-----------|----------|
         | 1 | CDS Views         | 3 days | 1.5x      | 4.5 days |
         | 2 | RAP Service       | 4 days | 1.5x      | 6 days   |
         | 3 | Fiori UI          | 8 days | 1.5x      | 12 days  |
         | 4 | Workflow integration| 5 days | 1.5x      | 7.5 days |
         | 5 | Testing           | 8 days | 1.0x      | 8 days   |
         |   | **Total**         |        |           | **38 days** |

         ### Range
         | Scenario    | Days | Assumptions |
         |-------------|------|-------------|
         | Optimistic  | 30   | Clear requirements, experienced team |
         | Realistic   | 38   | Normal rework and discovery |
         | Pessimistic | 57   | Requirements change mid-sprint |

         ### Assumptions
         - Requirements are 80% defined
         - Team has RAP/Fiori experience
         - Dev system available from day 1

         ### Risks
         - Workflow approval logic changes (+5 days)
         - New team member ramp-up (+5 days)
```

**What makes it different:** Forced decomposition, SAP-specific work breakdown tables, complexity multipliers, and always a range — never a single number.

---

### `sap-go-live-readiness` — 10 Gates, Zero Shortcuts

**The problem:** You go live. Something critical was missed. The steering committee asks "didn't we have a checklist?" You did. No one followed it.

**With SAP Superpowers:**

```
You:     "Check our go-live readiness for the S/4HANA migration"

Claude:  Using sap-go-live-readiness skill...

         HARD GATE: All 10 gates must PASS before declaring readiness.

         Gate 1: Functional Testing
         → Status: PASS / FAIL / N/A ?
         → Required evidence: test case execution report,
           0 critical/high defects open, regression suite passing
         → Questions:
           - How many test cases planned vs executed?
           - Any critical defects still open?

You:     "All 847 test cases executed. 2 medium defects with workarounds."

Claude:  Gate 1: ✓ PASS

         Gate 2: Integration Testing
         → Status: PASS / FAIL / N/A ?
         → Required evidence: all interfaces tested end-to-end,
           error handling verified, volume testing done
         ...

         [continues through all 10 gates]

         Gate 10: Go/No-Go Decision
         → Go/No-Go Matrix:
         | Gate                  | Status | Owner      |
         |-----------------------|--------|------------|
         | Functional testing    | PASS   | Sarah K.   |
         | Integration testing   | PASS   | Dev team   |
         | UAT sign-off          | PASS   | Business   |
         | ...                   |        |            |
         | **DECISION**          | **GO** | Steering   |
```

**What makes it different:** Hard gates. Can't skip to Gate 7 without passing Gate 6. Every gate needs evidence, not just "yeah, we did that."

---

## Real-World Use Cases

### For Functional Consultants
- Debug FI posting errors systematically instead of random SPRO checks
- Estimate configuration effort with SAP-specific complexity factors
- Never miss a go-live gate again

### For ABAP Developers
- Diagnose dumps with a structured layer-by-layer approach
- Get SAP Notes search patterns that actually find relevant results
- Estimate development work with realistic multipliers

### For Project Managers
- Run go-live readiness checks that the steering committee can trust
- Get estimates with ranges, assumptions, and risk factors
- Standardize project processes across teams

### For Basis Administrators
- Systematic troubleshooting for performance issues
- Structured approach to upgrade and patch estimation
- Go-live infrastructure readiness checks

---

## How It Works Under the Hood

SAP Superpowers is a [Claude Code plugin](https://docs.anthropic.com/en/docs/claude-code) — it extends Claude's capabilities with SAP-specific knowledge and workflows.

```
┌─ Claude Code ──────────────────────────────┐
│                                            │
│  You: "I have an error in VA01"            │
│                                            │
│  ┌─ SAP Superpowers ────────────────────┐  │
│  │                                      │  │
│  │  Session hook detects SAP context    │  │
│  │  → Routes to sap-troubleshooting     │  │
│  │  → Enforces 7-step diagnosis         │  │
│  │  → Hard gate: no fix without cause   │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Claude: "Step 1: Let's capture the        │
│  exact error. What does ST22 show?"        │
│                                            │
└────────────────────────────────────────────┘
```

**Skills auto-activate** based on keywords in your conversation:
- Mention "error", "dump", "not working" → `sap-troubleshooting` kicks in
- Mention "estimate", "effort", "timeline" → `sap-estimation` kicks in
- Mention "go-live", "cutover", "readiness" → `sap-go-live-readiness` kicks in

Or invoke directly with slash commands: `/sap-debug`, `/sap-estimate`

---

## Roadmap

### v1.0 — Now
- [x] `sap-troubleshooting` — Systematic debugging
- [x] `sap-go-live-readiness` — 10-gate checklist
- [x] `sap-estimation` — Structured estimation
- [x] Slash commands, hooks, CI

### v1.1 — Next
- [ ] `sap-project-kickoff` — SAP Activate phase 0-1
- [ ] `sap-code-review` — Clean core compliance
- [ ] `sap-brainstorming` — SAP project design

### v1.2 — Planned
- [ ] `sap-testing-strategy` — Test phase planning
- [ ] `sap-change-management` — OCM planning
- [ ] Reference skills: `abap-cloud`, `financial-accounting`, `controlling`

### v2.0 — Vision
- [ ] 15 reference skills covering all major SAP modules
- [ ] Community-contributed skills
- [ ] Premium skills for advanced workflows

---

## Contributing

We need SAP practitioners to help build skills. See [CONTRIBUTING.md](CONTRIBUTING.md).

**Most wanted contributions:**
- Reference skills for SAP modules you know well (FI, CO, MM, SD, PP, PM, etc.)
- New process skills for workflows you use daily
- SAP Notes references and real-world patterns
- Bug reports and feedback

Every contribution makes SAP consulting smarter for everyone.

---

## FAQ

**Q: Do I need an SAP system to use this?**
A: No. The skills guide your process and provide knowledge. You use them alongside your SAP system access.

**Q: Does this replace SAP Joule?**
A: Different tool, different purpose. Joule is embedded in SAP products. SAP Superpowers works in your AI coding assistant (Claude Code) and focuses on consulting workflows, not in-system automation.

**Q: Is my data sent anywhere?**
A: No. The plugin is pure Markdown files — no telemetry, no API calls, no data collection. Everything runs locally in Claude Code.

**Q: Can I use this with Cursor or other AI assistants?**
A: The hook system supports Cursor out of the box. Other platforms may work with manual skill invocation.

**Q: How is this different from secondsky/sap-skills?**
A: secondsky/sap-skills provides excellent reference knowledge (35 skills for BTP/CAP/ABAP). SAP Superpowers is **process-driven** — it doesn't just tell you what, it guides you *how* with enforced workflows, hard gates, and checklists. They complement each other.

---

## License

MIT — use it, fork it, improve it, share it.

## Disclaimer

SAP, S/4HANA, ABAP, Fiori, RISE with SAP, SAP Activate, SuccessFactors, and related terms are trademarks of SAP SE. This is an independent community project not affiliated with SAP SE.
