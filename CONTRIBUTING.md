# Contributing to SAP Superpowers

We welcome contributions from SAP practitioners worldwide. Whether you're an ABAP developer, a functional consultant, or a solution architect — if you have SAP knowledge, you can improve this plugin.

## What We Need

| Contribution Type | Description | Difficulty |
|------------------|-------------|-----------|
| **Reference skills** | Module-specific knowledge (new modules, deeper coverage) | Easy |
| **Process skills** | Workflow-enforcing skills with Iron Laws | Medium |
| **Industry files** | Industry-specific SAP processes and master data | Easy |
| **Country files** | Country-specific tax, e-invoicing, banking rules | Easy |
| **SPRO configs** | Module customizing paths and configuration tables | Medium |
| **Solution patterns** | Reusable ABAP/CDS/RAP code patterns | Medium |
| **Accelerator content** | Pre-built fit/gap matrices, test scenarios, config guides | Hard |
| **Bug reports** | Incorrect SAP Note numbers, wrong tcodes, outdated info | Easy |

## Quality Standards

### Every Skill Must Include

1. **Iron Laws** — Non-negotiable rules (3-5 minimum)
2. **Rationalization Table** — Anticipated shortcuts + explicit counters
3. **Red Flags** — Self-monitoring trigger phrases
4. **Hard Gates** — Blocking conditions that require evidence
5. **Verification** — Completion criteria with required evidence
6. **Next Skill** — Workflow chain continuation

### Content Accuracy

- **Real transaction codes only** — verify in SAP before submitting
- **Real table names only** — no invented table names
- **Real SPRO paths only** — verify the menu path exists
- **Real SAP Note numbers only** — every cited note must be verifiable
- **No fabricated business justifications** — if unsure, say "verify with process owner"

## How to Contribute

### One Skill Per PR

Each pull request should contain exactly one skill, agent, or reference file. This keeps reviews focused and merges clean.

### Process

1. Fork the repository
2. Create a branch: `feat/skill-name` or `fix/description`
3. Write your contribution following the quality standards
4. Test with Claude Code (does the skill activate correctly?)
5. Submit a PR with:
   - What the skill/file does
   - Which SAP module(s) it covers
   - How you verified accuracy (system access, documentation, experience)

### File Naming

- Skills: `skills/{category}/{skill-name}.md`
- Agents: `agents/sap-{module}-consultant.md`
- Industry: `industry/{industry-name}.md`
- Country: `country/{country-name}.md`
- SPRO: `configs/{module}/spro.md`

## Code of Conduct

- Be respectful
- Help each other
- Share knowledge
- No SAP credential sharing
- No client data in contributions
