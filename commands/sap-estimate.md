---
name: sap-estimate
description: Trigger structured SAP project estimation — invoked when scope needs to be broken down into effort, cost, or timeline with WBS decomposition and three-point estimates.
---

# /sap-estimate

Invokes the `sap-estimator` agent with `estimation` skill enforcement to produce rigorous, decomposed effort estimates. Single-number estimates are blocked by design — every output uses three-point estimation (optimistic / most likely / pessimistic) with a full Work Breakdown Structure.

## Usage

```
/sap-estimate [scope description]
```

**Arguments:**
- `[scope description]` — Describe the work to be estimated. Can be a project, a phase, a module, a feature, or a list of requirements. More detail yields more accurate WBS decomposition.

**Examples:**
- `/sap-estimate Full S/4HANA greenfield for a mid-size manufacturing company — FI, CO, MM, PP, SD`
- `/sap-estimate Custom ABAP report — vendor payment due date aging with multi-currency support`
- `/sap-estimate SAP Integration Suite: 12 iFlows connecting S/4 to Salesforce CRM`

## What Happens

1. The `sap-estimator` agent is dispatched with the `estimation` skill active.
2. The skill enforces scope decomposition before any numbers are given — the agent must produce a WBS first.
3. Each WBS line item receives a three-point estimate: optimistic (O), most likely (M), pessimistic (P).
4. PERT formula is applied: `E = (O + 4M + P) / 6` per line item.
5. Risk adjustments, contingency factors, and dependency impacts are layered on.
6. Assumptions and exclusions are captured explicitly — nothing is left implicit.
7. The skill hard-gates prevent delivery until all line items have supporting rationale.

## Output

An **Effort Estimate Document** containing:

| Section | Content |
|---------|---------|
| Scope Summary | What is and is not included |
| WBS | Full work breakdown to task level |
| Three-Point Estimates | O / M / P / PERT per line item |
| Total Summary | Hours by phase, by role, by module |
| Risk Register | Estimate risks with probability and impact |
| Assumptions | Explicit assumptions underpinning the numbers |
| Exclusions | What is explicitly out of scope |

## Example

```
/sap-estimate FI-AP implementation for a retail client — 3 company codes, SEPA payments, automatic payment run

> Activating sap-estimator agent with estimation skill...
> Stage 1: Scope decomposition — 8 WBS items identified
> Stage 2: Three-point estimates applied to each item
> Stage 3: Risk adjustments — SEPA config complexity flagged (+15%)
> Stage 4: Assumptions captured — 4 explicit, 2 exclusions noted
> Generating effort estimate document...
```
