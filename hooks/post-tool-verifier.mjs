#!/usr/bin/env node
/**
 * SAP Superpowers — PostToolUse Verification Hook
 *
 * Checks results of MCP tool calls for common issues:
 * - Syntax errors after code generation
 * - Activation failures
 * - ATC findings
 * - Transport inconsistencies
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const result = verifyToolResult(hookData);
    process.stdout.write(JSON.stringify(result));
  } catch {
    process.stdout.write(JSON.stringify({}));
  }
});

function verifyToolResult(hookData) {
  const toolName = hookData.tool_name || '';
  const toolResult = hookData.tool_result || '';
  const resultStr = typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult);

  const warnings = [];

  // Check for syntax errors
  if (resultStr.includes('SYNTAX_ERROR') || resultStr.includes('syntax error')) {
    warnings.push('⚠️ Syntax error detected. Invoke self-correcting-loop skill to auto-fix.');
  }

  // Check for activation failures
  if (resultStr.includes('ACTIVATION_FAILED') || resultStr.includes('activation failed')) {
    warnings.push('⚠️ Activation failed. Check dependent objects and inactive object list (SE80 → Utilities → Inactive Objects).');
  }

  // Check for ATC findings
  if (resultStr.includes('ATC') && (resultStr.includes('P1') || resultStr.includes('priority 1'))) {
    warnings.push('🛑 ATC Priority 1 finding detected. This must be resolved before transport release.');
  }

  // Check for authorization errors
  if (resultStr.includes('NO_AUTHORITY') || resultStr.includes('authorization check failed')) {
    warnings.push('⚠️ Authorization error. Verify the user has required auth objects for this operation.');
  }

  // Check for lock conflicts
  if (resultStr.includes('ENQUEUE') || resultStr.includes('locked by user')) {
    warnings.push('⚠️ Object locked by another user. Check SM12 for lock entries.');
  }

  if (warnings.length > 0) {
    return { message: warnings.join('\n') };
  }

  return {};
}
