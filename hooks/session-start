#!/bin/bash
# SAP Superpowers v3.1 — Session Start Hook
# Runs at the start of every Claude Code session in an SAP project.
# Must output valid JSON for hook framework.

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
  SAP_VERSION=$(grep -o '"sapVersion"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" 2>/dev/null | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  ABAP_RELEASE=$(grep -o '"abapRelease"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" 2>/dev/null | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  INDUSTRY=$(grep -o '"industry"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" 2>/dev/null | head -1 | grep -o '"[^"]*"$' | tr -d '"')
  COUNTRY=$(grep -o '"country"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" 2>/dev/null | head -1 | grep -o '"[^"]*"$' | tr -d '"')
fi

# Output valid JSON
cat << EOF
{
  "hookName": "session-start",
  "plugin": "sap-superpowers",
  "version": "3.1.0",
  "platform": "$PLATFORM",
  "config": {
    "sapVersion": "${SAP_VERSION:-unknown}",
    "abapRelease": "${ABAP_RELEASE:-unknown}",
    "industry": "${INDUSTRY:-none}",
    "country": "${COUNTRY:-none}"
  },
  "capabilities": {
    "skills": 55,
    "agents": 25,
    "commands": 8,
    "industries": 14,
    "countries": 16,
    "codingStandards": 13,
    "sproConfigs": 15,
    "blocklists": 8
  }
}
EOF
