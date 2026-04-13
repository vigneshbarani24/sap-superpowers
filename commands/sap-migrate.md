---
name: sap-migrate
description: Trigger an S/4HANA migration readiness assessment — invoked when evaluating a system or landscape for conversion approach, custom code impact, simplification items, and migration risk.
---

# /sap-migrate

Invokes the `sap-migration-analyzer` agent with the `s4hana-migration` skill to assess a system or landscape for S/4HANA readiness. Evaluates conversion approach options, custom code exposure, simplification item impact, and data migration complexity. Blocks conclusions until evidence is collected — no assessment is made from memory alone.

## Usage

```
/sap-migrate [system/landscape info]
```

**Arguments:**
- `[system/landscape info]` — Describe the current landscape: ECC version, active modules, custom code volume, database, hosting model, and any known constraints. If you have a custom code analysis output or simplification item list, paste or reference it.

**Examples:**
- `/sap-migrate ECC 6.0 EHP8, Oracle DB, FI CO MM SD PP, ~3,000 custom objects, on-premise`
- `/sap-migrate SAP ECC 6.0 on HANA, EU data residency required, 500 custom programs, RISE with SAP target`
- `/sap-migrate Paste output of custom code analysis report here`

## What Happens

1. The `sap-migration-analyzer` agent is dispatched with the `s4hana-migration` skill active.
2. The skill enforces a structured assessment process — conversion approach cannot be recommended before custom code and simplification item data is reviewed.
3. The agent evaluates three conversion approaches: Greenfield (new implementation), Brownfield (system conversion), and Selective Data Transition (SDT) — and scores each against the provided context.
4. Custom code impact is analyzed: deprecated APIs, non-released objects, removed tables, and compatibility packs required.
5. Simplification items relevant to the active modules are identified and rated by impact.
6. Data migration complexity is assessed: volume, quality, legacy structure, and tool recommendations (LTMC, LTMOM, BODS, Migration Cockpit).
7. A risk-rated migration assessment is produced with a recommended path and next steps.

## Output

A **Migration Assessment** document containing:

| Section | Content |
|---------|---------|
| Landscape Summary | Current system details, versions, modules, custom code volume |
| Conversion Approach | Greenfield / Brownfield / SDT scored and recommended with rationale |
| Custom Code Impact | Breakdown by category — critical, needs rework, compatible, deprecated |
| Simplification Items | Relevant items by module with impact rating and recommended action |
| Data Migration | Volume assessment, quality risks, recommended tooling |
| Timeline Estimate | Phase-by-phase effort range based on complexity |
| Risk Register | Top risks with probability, impact, and mitigation |
| Recommended Next Steps | Prioritized action list to begin migration planning |

## Example

```
/sap-migrate ECC 6.0 EHP7, MS SQL, FI CO MM SD, 1,800 custom objects, target RISE with SAP BTP

> Activating sap-migration-analyzer with s4hana-migration skill...
> Landscape: ECC 6.0 EHP7 confirmed — database migration to HANA required
> Custom code: 1,800 objects flagged for analysis — scanning for deprecated APIs...
> Simplification items: 34 relevant items identified across FI CO MM SD
> Conversion approach: Brownfield recommended (existing customizing preserved)
> Data migration: Migration Cockpit recommended for master data, BODS for transactional
> Generating migration assessment...
```
