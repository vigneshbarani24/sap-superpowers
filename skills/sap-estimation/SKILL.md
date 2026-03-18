---
name: sap-estimation
description: Use when estimating effort, timelines, or complexity for SAP work items, sprints, phases, or full projects. Provides structured estimation with SAP-specific complexity factors.
---

# SAP Estimation

Structured estimation for SAP work — never guess, always decompose.

<HARD-GATE>
Do NOT give a single-number estimate. Every estimate must include: decomposition, complexity factors, range (optimistic/realistic/pessimistic), and assumptions.
</HARD-GATE>

## Checklist

1. **Clarify scope** — What exactly is being estimated? (single task, sprint, phase, project)
2. **Decompose** — Break into estimable units (see Work Breakdown below)
3. **Apply complexity factors** — SAP-specific multipliers
4. **Calculate range** — Optimistic / Realistic / Pessimistic
5. **State assumptions** — What must be true for this estimate to hold?
6. **Add contingency** — Based on unknowns and risk

## Work Breakdown by SAP Area

### ABAP Development
| Work Item | Simple | Medium | Complex |
|-----------|--------|--------|---------|
| Report/ALV | 2-3 days | 5-8 days | 10-15 days |
| Enhancement/BAdI | 1-2 days | 3-5 days | 8-12 days |
| Interface (IDoc/API) | 3-5 days | 8-12 days | 15-25 days |
| Form (Adobe/Smartform) | 2-3 days | 5-8 days | 10-15 days |
| Workflow | 3-5 days | 8-12 days | 15-20 days |
| CDS View + RAP | 2-4 days | 5-10 days | 12-20 days |
| Fiori App (freestyle) | 5-8 days | 12-20 days | 25-40 days |

### Functional Configuration
| Work Item | Simple | Medium | Complex |
|-----------|--------|--------|---------|
| Single config activity (SPRO) | 0.5-1 day | 2-3 days | 5-8 days |
| Business process config (end-to-end) | 3-5 days | 8-15 days | 20-30 days |
| Output determination | 1-2 days | 3-5 days | 8-12 days |
| Pricing procedure | 2-3 days | 5-8 days | 10-15 days |
| Authorization concept | 3-5 days | 8-12 days | 15-25 days |

### Basis / Technical
| Work Item | Simple | Medium | Complex |
|-----------|--------|--------|---------|
| Transport management | 0.5 day | 1-2 days | 3-5 days |
| System copy | 2-3 days | 5-8 days | 10-15 days |
| Upgrade/patch | 3-5 days | 8-15 days | 20-30 days |
| Performance optimization | 2-5 days | 8-15 days | 20-40 days |

### Data Migration
| Work Item | Simple | Medium | Complex |
|-----------|--------|--------|---------|
| Single object (vendor/customer) | 2-3 days | 5-8 days | 10-15 days |
| Transaction data (orders/invoices) | 5-8 days | 12-20 days | 25-40 days |
| Full data migration (all objects) | 20-30 days | 40-60 days | 80-120 days |

## Complexity Factors (Multipliers)

Apply these multipliers to the base estimate:

| Factor | Low (0.8x) | Medium (1.0x) | High (1.5x) | Very High (2.0x) |
|--------|-----------|--------------|-------------|-----------------|
| **Requirements clarity** | Crystal clear, signed off | Mostly clear, some gaps | Vague, still evolving | Unknown, discovery needed |
| **System landscape** | Single system | 2-3 systems | Multi-system, multi-client | Global, multi-region |
| **Data quality** | Clean, consistent | Mostly clean, some issues | Significant cleansing needed | Unknown quality |
| **Team experience** | Done this before | Similar experience | New technology/module | First SAP project |
| **Integration complexity** | No integrations | 1-3 simple interfaces | 5+ interfaces, real-time | Complex middleware, legacy |
| **Organizational readiness** | Experienced, committed | Somewhat ready | Resistance expected | Major change required |

**Combined multiplier:** Multiply all applicable factors together. Example: unclear requirements (1.5x) x new team (1.5x) x complex integrations (1.5x) = 3.375x base estimate.

## Estimation Template

Present every estimate in this format:

```
## Estimate: [Work Item Name]

### Scope
[1-2 sentences describing what is being estimated]

### Decomposition
| # | Task | Base (days) | Complexity | Adjusted (days) |
|---|------|-------------|-----------|-----------------|
| 1 | [task] | [base] | [factor] | [adjusted] |
| 2 | [task] | [base] | [factor] | [adjusted] |
| | **Total** | **[sum]** | | **[sum]** |

### Range
| Scenario | Days | Assumptions |
|----------|------|-------------|
| Optimistic | [total x 0.8] | Everything goes smoothly |
| Realistic | [total x 1.0] | Normal issues and rework |
| Pessimistic | [total x 1.5] | Significant unknowns materialize |

### Assumptions
- [assumption 1]
- [assumption 2]

### Risks
- [risk 1] → impact: +[X] days
- [risk 2] → impact: +[X] days

### Contingency
[10-30% of realistic estimate, based on risk level]
```

## Common Estimation Mistakes

| Mistake | Fix |
|---------|-----|
| Single number ("it'll take 5 days") | Always give a range |
| Forgetting testing | Add 30-40% of dev effort for testing |
| Ignoring ramp-up | Add 2-5 days for new team members |
| No contingency | Add 10-30% based on unknowns |
| Estimating in ideal days | Use calendar days (meetings, interruptions, context switching) |
| Not accounting for reviews | Add 1-2 days per review cycle |
