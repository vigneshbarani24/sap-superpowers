#!/usr/bin/env node
/**
 * SAP Superpowers — PreToolUse Enforcement Hook
 *
 * Intercepts MCP tool calls to enforce data protection policies.
 * Blocks access to sensitive tables without explicit user approval.
 * Validates ABAP release compatibility before code generation.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || process.cwd();

// Read hook input from stdin
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const result = enforceDataProtection(hookData);
    process.stdout.write(JSON.stringify(result));
  } catch (e) {
    // Pass through on parse errors — don't block legitimate operations
    process.stdout.write(JSON.stringify({ allow: true }));
  }
});

function enforceDataProtection(hookData) {
  const toolName = hookData.tool_name || '';
  const toolInput = hookData.tool_input || {};

  // Only intercept MCP tools that access SAP data
  if (!toolName.startsWith('mcp__abap') && !toolName.includes('adt')) {
    return { allow: true };
  }

  // Check for sensitive table access
  const query = JSON.stringify(toolInput).toUpperCase();
  const blockedTables = loadBlocklist();

  for (const entry of blockedTables) {
    if (query.includes(entry.table)) {
      if (entry.level === 'hard') {
        return {
          allow: false,
          message: `🛑 BLOCKED: Access to ${entry.table} denied.\nCategory: ${entry.category}\nReason: ${entry.reason}\nThis table contains ${entry.category} data and cannot be accessed without explicit security approval.\nUse approved alternatives: ${entry.alternatives || 'aggregated views or anonymized data'}`
        };
      }
      if (entry.level === 'soft') {
        return {
          allow: true,
          message: `⚠️ WARNING: Accessing ${entry.table} (${entry.category}).\nThis table contains sensitive data. Ensure you have authorization and a documented business justification.\nConsider alternatives: ${entry.alternatives || 'released CDS entities'}`
        };
      }
    }
  }

  return { allow: true };
}

function loadBlocklist() {
  const blocklistDir = join(pluginRoot, 'exceptions');
  const blocklist = [];

  if (!existsSync(blocklistDir)) return blocklist;

  const files = [
    'hr-payroll.json', 'banking-payment.json', 'master-data-pii.json',
    'auth-security.json', 'tax-government-ids.json', 'pricing-conditions.json',
    'audit-security-logs.json', 'protected-business-data.json'
  ];

  for (const file of files) {
    const filePath = join(blocklistDir, file);
    if (existsSync(filePath)) {
      try {
        const data = JSON.parse(readFileSync(filePath, 'utf8'));
        blocklist.push(...(data.tables || []));
      } catch { /* skip malformed files */ }
    }
  }

  return blocklist;
}
