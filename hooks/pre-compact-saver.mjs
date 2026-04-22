#!/usr/bin/env node
/**
 * SAP Superpowers — PreCompact Context Preservation Hook
 *
 * Before Claude compacts the conversation context, this hook
 * ensures critical SAP session state is preserved:
 * - Active transport numbers
 * - Target system/release configuration
 * - In-progress skill chain position
 * - Generated object names and dependencies
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const context = extractCriticalContext(hookData);
    process.stdout.write(JSON.stringify(context));
  } catch {
    process.stdout.write(JSON.stringify({}));
  }
});

function extractCriticalContext(hookData) {
  const conversation = hookData.conversation || '';
  const convStr = typeof conversation === 'string' ? conversation : JSON.stringify(conversation);

  const preserved = [];

  // Extract transport numbers mentioned
  const transports = convStr.match(/[A-Z]{3,4}K\d{6}/g);
  if (transports) {
    preserved.push(`Active transports: ${[...new Set(transports)].join(', ')}`);
  }

  // Extract ABAP object names
  const zObjects = convStr.match(/\bZ[A-Z_]{2,29}\b/g);
  if (zObjects) {
    const unique = [...new Set(zObjects)].slice(0, 20);
    preserved.push(`Generated objects: ${unique.join(', ')}`);
  }

  // Extract system info
  const systemMatch = convStr.match(/(?:SAP_VERSION|sapVersion)[:\s]*["']?([^"'\s,]+)/i);
  if (systemMatch) {
    preserved.push(`Target SAP version: ${systemMatch[1]}`);
  }

  const releaseMatch = convStr.match(/(?:ABAP_RELEASE|abapRelease)[:\s]*["']?(\d{3})/i);
  if (releaseMatch) {
    preserved.push(`ABAP release: ${releaseMatch[1]}`);
  }

  if (preserved.length > 0) {
    return {
      message: `📌 SAP Session Context (preserved across compaction):\n${preserved.join('\n')}`
    };
  }

  return {};
}
