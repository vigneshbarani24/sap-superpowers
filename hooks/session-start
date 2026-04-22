#!/bin/bash
# SAP Superpowers v3.1 — Session Start Hook
# Runs at the start of every Claude Code session in an SAP project.
# Detects platform, loads config, injects context.

# Platform detection
PLATFORM="claude-code"
if [ -n "${CURSOR_PLUGIN_ROOT:-}" ]; then
  PLATFORM="cursor"
elif [ -n "${COPILOT_PLUGIN_ROOT:-}" ]; then
  PLATFORM="copilot-cli"
fi

# Load project config if exists
SAP_VERSION="unknown"
ABAP_RELEASE="unknown"
INDUSTRY="none"
COUNTRY="none"
CONFIG_FILE=".sap-superpowers/config.json"
if [ -f "$CONFIG_FILE" ]; then
  SAP_VERSION=$(grep -o '"sapVersion"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  ABAP_RELEASE=$(grep -o '"abapRelease"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  INDUSTRY=$(grep -o '"industry"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  COUNTRY=$(grep -o '"country"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | grep -o '"[^"]*"$' | tr -d '"')
fi

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  SAP Superpowers v3.1 — Loaded                          ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║  Platform: $PLATFORM"
echo "║  SAP Version: $SAP_VERSION | ABAP Release: $ABAP_RELEASE"
echo "║  Industry: $INDUSTRY | Country: $COUNTRY"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                                                          ║"
echo "║  CAPABILITIES:                                           ║"
echo "║  Skills    : 53+ (meta, consulting, development,         ║"
echo "║              delivery, modules, strategic)                ║"
echo "║  Agents    : 25  (10 core + 15 module consultants)       ║"
echo "║  Commands  : 6   (/sap-debug, /sap-estimate,             ║"
echo "║              /sap-kickoff, /sap-review, /sap-doc,        ║"
echo "║              /sap-migrate)                                ║"
echo "║  Standards : 12  (naming, clean code, OOP, ALV,          ║"
echo "║              testing, error handling, Dynpro)             ║"
echo "║  Industries: 14  (retail, auto, pharma, F&B, etc.)       ║"
echo "║  Countries : 16  (US, DE, UK, IN, JP, KR, BR, etc.)     ║"
echo "║  Blocklists: 8   (HR, banking, PII, auth, tax, etc.)    ║"
echo "║                                                          ║"
echo "║  AUTONOMOUS EXECUTION:                                   ║"
echo "║  /autopilot          — Idea to tested ABAP              ║"
echo "║  /self-correcting    — Fix loop until clean             ║"
echo "║  /team-execution     — Parallel multi-agent work        ║"
echo "║                                                          ║"
echo "║  ENFORCEMENT:                                            ║"
echo "║  ✅ PreToolUse: Data protection + transport validation   ║"
echo "║  ✅ PostToolUse: Syntax/ATC/activation verification      ║"
echo "║  ✅ PromptRouter: Auto skill activation                  ║"
echo "║  ✅ PreCompact: SAP context preservation                 ║"
echo "║                                                          ║"
echo "║  IRON LAWS (always enforced):                            ║"
echo "║  - Route every SAP request through a skill              ║"
echo "║  - Never skip verification steps                        ║"
echo "║  - Always produce deliverables for process skills       ║"
echo "║  - Three-point estimates only                           ║"
echo "║  - Check ABAP release before generating code            ║"
echo "║  - Enforce data protection blocklists                   ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
