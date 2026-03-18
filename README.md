# SAP Superpowers

> The SAP consultant's AI operating system — for Claude Code

Process-driven AI skills for the entire SAP lifecycle. Not just reference docs — **enforced workflows** with checklists, decision trees, and hard gates that guide you through complex SAP processes step by step.

## Install

```
/plugin marketplace add vigneshbarani24/sap-superpowers
```

## What You Get

### Process Skills — Guided Workflows

| Skill | What It Does |
|-------|-------------|
| `/sap-debug` | Systematic SAP debugging — diagnose before you fix |
| `/sap-estimate` | Structured estimation with SAP complexity factors |
| `sap-go-live-readiness` | 10-gate go-live checklist — no skipping |

### Coming Soon

| Skill | Status |
|-------|--------|
| `sap-brainstorming` | Planned |
| `sap-project-kickoff` | Planned |
| `sap-code-review` | Planned |
| `sap-testing-strategy` | Planned |
| `sap-change-management` | Planned |
| 15 reference skills (ABAP, FI/CO, MM/SD, Basis, BTP, ...) | Planned |

## How It Works

SAP Superpowers follows the [superpowers](https://github.com/obra/superpowers) pattern:

1. **Install the plugin** — one command
2. **Skills auto-activate** — mention SAP topics and the right skill kicks in
3. **Follow the process** — hard gates prevent skipping critical steps
4. **Get better results** — systematic approaches beat guessing every time

### Example: /sap-debug

Instead of guessing at fixes, the skill enforces:

```
1. Capture the symptom (exact error, transaction, timestamp)
2. Classify the layer (ABAP? Basis? Functional? Integration?)
3. Gather evidence (specific logs/traces for that layer)
4. Search SAP Notes (with the right search pattern)
5. Identify root cause (from evidence, not assumption)
6. Propose fix (with rollback plan)
7. Verify (test before transport)
```

## For Contributors

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add new skills.

**We need help with:**
- Reference skills for SAP modules (FI, CO, MM, SD, PP, PM, etc.)
- Process skills for more SAP workflows
- SAP Notes references and best practices
- Testing and feedback

## License

MIT — use it, fork it, share it.

## Disclaimer

SAP, S/4HANA, ABAP, Fiori, RISE with SAP, SAP Activate, SuccessFactors, and related terms are trademarks of SAP SE. This is an independent community tool.
