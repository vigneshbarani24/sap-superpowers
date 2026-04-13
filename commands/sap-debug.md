---
name: sap-debug
description: Trigger structured root cause analysis for SAP issues — runtime errors, dump analysis, integration failures, configuration problems, or unexpected system behavior.
---

# /sap-debug

Invokes the `troubleshooting` skill to run a structured, evidence-driven root cause analysis on any SAP issue. Prevents premature conclusions and enforces a systematic diagnostic path before any fix is attempted.

## Usage

```
/sap-debug [description of issue]
```

**Arguments:**
- `[description of issue]` — Describe the symptom, error message, transaction, or scenario. Include any error codes, dump IDs, or affected objects if known.

**Examples:**
- `/sap-debug ABAP dump CALL_FUNCTION_NOT_FOUND in program ZVENDOR_PROCESS`
- `/sap-debug Sales orders stuck in credit check — VKM1 shows hundreds of blocked orders`
- `/sap-debug Integration Suite iFlow failing intermittently with HTTP 503 on target system`

## What Happens

1. The `troubleshooting` skill is activated with your issue as input.
2. The skill enforces a structured diagnostic loop — symptom capture, scope determination, hypothesis generation, evidence collection, and root cause confirmation.
3. Hard gates block progression until each stage is verified with evidence (logs, dumps, tcode output).
4. If the issue touches code, the `sap-reviewer` agent is dispatched for code-level analysis.
5. If the issue involves authorizations, the `sap-security-auditor` agent is dispatched in parallel.
6. A root cause is confirmed only when the evidence chain is complete — not when a plausible explanation is found.

## Output

A **Root Cause Analysis (RCA) document** written to the working directory, containing:

| Section | Content |
|---------|---------|
| Issue Summary | Symptom, affected objects, scope, severity |
| Diagnostic Path | Steps taken, evidence collected, hypotheses tested |
| Root Cause | Confirmed cause with supporting evidence |
| Fix Applied | Exact change made (code, config, customizing) |
| Verification | How the fix was confirmed — test results, logs |
| Prevention | What to change to prevent recurrence |

## Example

```
/sap-debug MIRO posting fails with error FF805 — tax code not allowed for company code

> Activating troubleshooting skill...
> Stage 1: Symptom confirmed — FF805 raised in FI-IV-IV, affects company code 1000 only
> Stage 2: Scope — all MIRO postings with tax code V1, started after transport TR1234 imported
> Stage 3: Evidence collected — FTXP config, OBY6 settings, FI customizing transport log
> Stage 4: Root cause confirmed — tax procedure TAXGB missing V1 condition type after transport
> Generating RCA document...
```
