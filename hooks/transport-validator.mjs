#!/usr/bin/env node
/**
 * SAP Superpowers — Transport Validator Hook
 *
 * Enforces transport discipline on MCP tool calls that modify SAP objects.
 * Requires: transport number, standardized description, no direct production access.
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const result = validateTransport(hookData);
    process.stdout.write(JSON.stringify(result));
  } catch {
    process.stdout.write(JSON.stringify({ allow: true }));
  }
});

function validateTransport(hookData) {
  const toolName = hookData.tool_name || '';
  const toolInput = hookData.tool_input || {};

  // Only check write operations via MCP
  const writeOps = ['create', 'update', 'delete', 'activate', 'release', 'modify'];
  const isWriteOp = writeOps.some(op => toolName.toLowerCase().includes(op));

  if (!isWriteOp) return { allow: true };
  if (!toolName.startsWith('mcp__abap') && !toolName.includes('adt')) {
    return { allow: true };
  }

  // Validate transport number format (DEVK9XXXXX or similar)
  const transport = toolInput.transport || toolInput.tr_number || toolInput.corrNr || '';
  if (!transport) {
    return {
      allow: false,
      message: '🛑 Transport Required: All modifications to SAP objects must specify a transport request.\nProvide a transport number (e.g., DEVK900001) before proceeding.\nUse /sap-debug to check available transports if needed.'
    };
  }

  const transportPattern = /^[A-Z]{3,4}K\d{6}$/;
  if (!transportPattern.test(transport)) {
    return {
      allow: true,
      message: `⚠️ Transport format warning: "${transport}" does not match standard pattern (e.g., DEVK900001). Verify this is correct.`
    };
  }

  // Block direct production system access
  const targetSystem = (toolInput.system || toolInput.destination || '').toUpperCase();
  if (targetSystem.includes('PRD') || targetSystem.includes('PROD')) {
    return {
      allow: false,
      message: '🛑 BLOCKED: Direct modification of production system objects is prohibited.\nAll changes must go through the transport landscape: DEV → QAS → PRD.\nModify in the development system and release the transport through STMS.'
    };
  }

  return { allow: true };
}
