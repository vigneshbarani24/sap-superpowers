# Contributing to SAP Superpowers

Thanks for helping make SAP consulting smarter!

## How to Add a Skill

### 1. Create the directory

```
skills/your-skill-name/
└── SKILL.md
```

### 2. Write the SKILL.md

Every skill needs YAML frontmatter:

```yaml
---
name: your-skill-name
description: Use when [specific triggering conditions]. [One sentence about what it does].
---
```

**Rules:**
- `name` must match the directory name exactly
- `description` must start with "Use when"
- Description max 500 characters

### 3. Choose your skill type

**Process skills** (guided workflows):
- Must have a `## Checklist` section
- Should use `<HARD-GATE>` tags for critical steps
- Include decision trees (graphviz) for routing
- Cross-reference relevant reference skills

**Reference skills** (domain knowledge):
- Must cite at least 2 SAP Help Portal links
- Must reference at least 2 SAP Notes
- Cover at least 3 core topics
- Include a content routing table if using sub-files

### 4. Test locally

```bash
bash test/smoke-test.sh
```

### 5. Submit a PR

- One skill per PR
- Include a description of what the skill covers
- CI will validate your SKILL.md automatically

## Code of Conduct

Be respectful. Help each other. Share knowledge.

## Questions?

Open an issue on GitHub.
