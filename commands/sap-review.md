---
name: sap-review
description: Trigger a structured SAP code review — invoked when ABAP, CDS, RAP, BTP, or integration code needs to be reviewed for quality, performance, security, and clean core compliance.
---

# /sap-review

Invokes the `sap-reviewer` agent with `code-review` skill enforcement to deliver a thorough, multi-dimensional code review. Checks are structured across four dimensions: code quality, performance, security, and S/4HANA clean core compliance. No review is complete until all four dimensions are addressed.

## Usage

```
/sap-review [file or code block]
```

**Arguments:**
- `[file or code block]` — Provide a file path, paste a code block, or describe the repository location. The reviewer will read the code directly if a path is given.

**Examples:**
- `/sap-review src/ZVENDOR_AGING_REPORT.abap`
- `/sap-review the CDS view I just created in the editor`
- `/sap-review agents/integration/iflow-error-handler.groovy`

## What Happens

1. The `sap-reviewer` agent is dispatched and reads the provided code.
2. The `code-review` skill activates and enforces a four-dimension review structure — it cannot be skipped or abbreviated.
3. In parallel, the `sap-security-auditor` agent scans for authorization object usage, privilege escalation patterns, and hardcoded credentials.
4. If S/4HANA context is detected, the `sap-migration-analyzer` agent checks clean core compliance — deprecated APIs, non-released objects, modification-based patterns.
5. All findings are classified by severity: Critical / High / Medium / Low / Informational.
6. Critical findings block the review from being marked complete — they must be addressed.
7. A unified report is assembled from all agents and delivered as a structured document.

## Output

A **Code Review Report** containing:

| Dimension | What Is Checked |
|-----------|----------------|
| Code Quality | Naming conventions, modularity, error handling, dead code, complexity |
| Performance | Select efficiency, table buffering, loop optimization, memory usage |
| Security | Authorization checks, injection risks, hardcoded credentials, RFC exposure |
| Clean Core | Released API usage, extensibility compliance, modification risks |
| Summary | Finding counts by severity, recommended actions, approval status |

## Example

```
/sap-review ZFIN_PAYMENT_PROCESSOR.abap

> Activating sap-reviewer agent with code-review skill...
> Dispatching sap-security-auditor in parallel...
> Dispatching sap-migration-analyzer for clean core check...
> Code Quality: 3 findings (1 High, 2 Medium)
> Performance: 2 findings — unbuffered SELECT in loop detected (Critical)
> Security: 1 finding — missing AUTHORITY-CHECK before table update (High)
> Clean Core: 1 finding — deprecated FM CALCULATE_TAX_ITEM used (High)
> Generating code review report...
```
