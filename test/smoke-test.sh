#!/usr/bin/env bash
# Smoke test for sap-superpowers plugin
# Validates SKILL.md files, hooks, and cross-references

set -euo pipefail

ERRORS=0
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Find a working python. On Windows, `python3` may be a Microsoft Store alias
# that doesn't actually work — test with a real invocation.
PYTHON=""
for candidate in python3 python; do
    if command -v "$candidate" >/dev/null 2>&1; then
        if "$candidate" -c "print('ok')" >/dev/null 2>&1; then
            PYTHON="$candidate"
            break
        fi
    fi
done
if [ -z "$PYTHON" ]; then
    echo "ERROR: Python not found. Install Python 3 to run smoke tests."
    exit 1
fi

# Helper: validate JSON file
validate_json() {
    $PYTHON -c "import json,sys; json.load(open(sys.argv[1]))" "$1" 2>/dev/null
}

echo "=== SAP Superpowers Smoke Test ==="
echo "Using Python: $PYTHON"
echo ""

# 1. Validate all SKILL.md frontmatter
echo "--- Checking SKILL.md frontmatter ---"
for skill_dir in "${ROOT}"/skills/*/; do
    skill_name=$(basename "$skill_dir")
    skill_file="${skill_dir}SKILL.md"

    if [ ! -f "$skill_file" ]; then
        echo "FAIL: ${skill_name}/ missing SKILL.md"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check frontmatter exists
    first_line=$(head -1 "$skill_file")
    if [ "$first_line" != "---" ]; then
        echo "FAIL: ${skill_name}/SKILL.md missing frontmatter (no opening ---)"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Extract name from frontmatter
    fm_name=$(sed -n '/^---$/,/^---$/{ /^name:/p }' "$skill_file" | head -1 | sed 's/name: *//')
    if [ -z "$fm_name" ]; then
        echo "FAIL: ${skill_name}/SKILL.md missing 'name' in frontmatter"
        ERRORS=$((ERRORS + 1))
    elif [ "$fm_name" != "$skill_name" ]; then
        echo "FAIL: ${skill_name}/SKILL.md name '${fm_name}' doesn't match directory '${skill_name}'"
        ERRORS=$((ERRORS + 1))
    else
        echo "PASS: ${skill_name} — name matches"
    fi

    # Check description starts with "Use when"
    fm_desc=$(sed -n '/^---$/,/^---$/{ /^description:/p }' "$skill_file" | head -1 | sed 's/description: *//')
    if [ -z "$fm_desc" ]; then
        echo "FAIL: ${skill_name}/SKILL.md missing 'description' in frontmatter"
        ERRORS=$((ERRORS + 1))
    elif [[ ! "$fm_desc" =~ ^\"?Use\ when ]]; then
        echo "WARN: ${skill_name}/SKILL.md description doesn't start with 'Use when'"
    fi
done
echo ""

# 2. Validate hooks.json is valid JSON
echo "--- Checking hooks.json ---"
if [ -f "${ROOT}/hooks/hooks.json" ]; then
    if validate_json "${ROOT}/hooks/hooks.json"; then
        echo "PASS: hooks.json is valid JSON"
    else
        echo "FAIL: hooks.json is invalid JSON"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "FAIL: hooks/hooks.json not found"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Validate session-start script exists and produces valid JSON
echo "--- Checking session-start hook ---"
if [ -f "${ROOT}/hooks/session-start" ]; then
    if [ -x "${ROOT}/hooks/session-start" ]; then
        echo "PASS: hooks/session-start is executable"
    else
        echo "WARN: hooks/session-start exists but is not executable"
    fi

    # Test it produces valid JSON (write to temp file to avoid pipe issues)
    TMPFILE=$(mktemp)
    if CLAUDE_PLUGIN_ROOT="${ROOT}" bash "${ROOT}/hooks/session-start" > "$TMPFILE" 2>/dev/null && validate_json "$TMPFILE"; then
        echo "PASS: session-start produces valid JSON"
    else
        echo "FAIL: session-start does not produce valid JSON"
        ERRORS=$((ERRORS + 1))
    fi
    rm -f "$TMPFILE"
else
    echo "FAIL: hooks/session-start not found"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Validate command files
echo "--- Checking command files ---"
for cmd_file in "${ROOT}"/commands/*.md; do
    [ -f "$cmd_file" ] || continue
    cmd_name=$(basename "$cmd_file" .md)
    first_line=$(head -1 "$cmd_file")
    if [ "$first_line" != "---" ]; then
        echo "FAIL: commands/${cmd_name}.md missing frontmatter"
        ERRORS=$((ERRORS + 1))
    else
        echo "PASS: commands/${cmd_name}.md has frontmatter"
    fi
done
echo ""

# 5. Validate plugin manifests
echo "--- Checking plugin manifests ---"
for manifest in ".claude-plugin/plugin.json" ".claude-plugin/marketplace.json"; do
    if [ -f "${ROOT}/${manifest}" ]; then
        if validate_json "${ROOT}/${manifest}"; then
            echo "PASS: ${manifest} is valid JSON"
        else
            echo "FAIL: ${manifest} is invalid JSON"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "FAIL: ${manifest} not found"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Summary
echo "=== Results ==="
if [ $ERRORS -eq 0 ]; then
    echo "ALL CHECKS PASSED"
    exit 0
else
    echo "${ERRORS} error(s) found"
    exit 1
fi
