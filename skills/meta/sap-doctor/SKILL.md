---
name: sap-doctor
description: Use when diagnosing plugin health, MCP server connectivity, SAP system connection issues, or configuration problems. Runs systematic health checks and produces a diagnostic report.
---

# SAP Doctor — System Diagnostics

This skill diagnoses issues with the SAP Superpowers plugin, MCP server connection, and SAP system health. It runs systematic checks and produces a clear diagnostic report with remediation steps.

## Iron Laws

1. **ALWAYS CHECK ALL LAYERS.** Problems cascade — a MCP issue looks like a SAP issue which looks like a code issue. Check every layer systematically: plugin → MCP → SAP → data.

2. **NEVER GUESS THE ROOT CAUSE.** Run the diagnostic. Read the output. The error message tells you what's wrong — your guess about what's wrong is often incorrect.

3. **ALWAYS PRODUCE A DIAGNOSTIC REPORT.** Even if the fix is obvious, document the finding. The next person to hit this issue needs the diagnostic trail.

<HARD-GATE>
Before suggesting any fix: complete the full diagnostic checklist. Premature fixes based on incomplete diagnosis create new problems.
</HARD-GATE>

## Diagnostic Layers

### Layer 1 — Plugin Health
Check the SAP Superpowers plugin installation:

| Check | How | Expected |
|-------|-----|----------|
| Plugin loaded | Check CLAUDE.md accessible | File exists and readable |
| Skills available | Count .md files in skills/ | ≥ 46 files |
| Agents available | Count .md files in agents/ | ≥ 10 files |
| Hooks registered | Read hooks/hooks.json | All hooks defined |
| Config valid | Read .sap-superpowers/config.json | Valid JSON with required fields |
| Exceptions loaded | Count files in exceptions/ | 8 blocklist files |
| Knowledge available | Check knowledge/indexes/ | Index files present |

### Layer 2 — MCP Server Health
Check the MCP ABAP ADT server:

| Check | How | Expected |
|-------|-----|----------|
| Node.js version | `node --version` | ≥ 20.0.0 |
| MCP server installed | `npx abap-mcp-adt-powerup --version` | Version string returned |
| MCP config | Check .mcp.json or mcp config | Server configured |
| Bridge script | Check bridge/mcp-server.cjs | File exists |
| Transport protocol | Config mcpTransport | stdio/http/sse |

### Layer 3 — SAP Connection Health
Check the connection to the SAP system:

| Check | How | Expected |
|-------|-----|----------|
| Env file exists | Check .sap-superpowers/sap.env | File present |
| Host configured | SAP_HOST in env | Valid hostname |
| Client configured | SAP_CLIENT in env | 3-digit client number |
| ADT accessible | HTTP GET to /sap/bc/adt/discovery | 200 OK |
| User authorized | Login test | Successful auth |
| System info | /sap/bc/adt/core/systeminfo | Version and release |

### Layer 4 — SAP System Health
Check common SAP system issues:

| Check | How | Expected |
|-------|-----|----------|
| Work processes | SM50 equivalent via ADT | Sufficient free WPs |
| Transport status | STMS equivalent | Transport routes active |
| ATC available | ATC run possible | Check variant accessible |
| ICF services active | /sap/bc/adt/* nodes | All ADT services active |

## Diagnostic Report Template

```
SAP DOCTOR — DIAGNOSTIC REPORT
================================
Date: [Timestamp]
Plugin Version: 3.0
Config: [SAP version] / [ABAP release]

LAYER 1: PLUGIN HEALTH
───────────────────────
[✅/❌] Plugin loaded: [status]
[✅/❌] Skills: [count] available
[✅/❌] Agents: [count] available
[✅/❌] Hooks: [status]
[✅/❌] Config: [status]
[✅/❌] Exceptions: [count] loaded
[✅/❌] Knowledge: [status]

LAYER 2: MCP SERVER
───────────────────
[✅/❌] Node.js: [version]
[✅/❌] MCP server: [version/not found]
[✅/❌] Config: [status]
[✅/❌] Bridge: [status]

LAYER 3: SAP CONNECTION
───────────────────────
[✅/❌] Env file: [status]
[✅/❌] ADT access: [status]
[✅/❌] Auth: [status]
[✅/❌] System: [version]

LAYER 4: SAP SYSTEM
───────────────────
[✅/❌] Work processes: [status]
[✅/❌] Transports: [status]
[✅/❌] ATC: [status]

FINDINGS
────────
[Finding 1]: [Description] → [Remediation]
[Finding 2]: [Description] → [Remediation]

OVERALL STATUS: [HEALTHY / DEGRADED / CRITICAL]
```

## Common Issues & Fixes

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| "MCP tool not found" | MCP server not installed | `npm i -g abap-mcp-adt-powerup` |
| "Connection refused" | SAP ADT ICF service inactive | Activate /sap/bc/adt/* in SICF |
| "401 Unauthorized" | Wrong credentials in sap.env | Check SAP_USER and SAP_PASSWORD |
| "Timeout" | Network/firewall issue | Check SAP_HOST accessibility |
| "No transport" | Transport route not configured | Check STMS transport routes |
| Skills not loading | Plugin not installed correctly | Reinstall via plugin marketplace |

## Verification

- [ ] All 4 diagnostic layers checked
- [ ] Diagnostic report produced
- [ ] All findings have remediation steps
- [ ] Overall status assessed

## Cross-References

- `troubleshooting` — For runtime SAP issues (not plugin/connection issues)
- `autopilot` — Calls sap-doctor before starting pipeline if connection issues suspected
