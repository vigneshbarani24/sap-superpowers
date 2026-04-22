#!/usr/bin/env node
/**
 * SAP Superpowers — UserPromptSubmit Router Hook
 *
 * Detects SAP-relevant keywords in user prompts and injects
 * skill context hints for the agent. Enables auto-activation
 * without requiring explicit slash commands.
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const result = routePrompt(hookData);
    process.stdout.write(JSON.stringify(result));
  } catch {
    process.stdout.write(JSON.stringify({}));
  }
});

function routePrompt(hookData) {
  const prompt = (hookData.user_prompt || hookData.message || '').toLowerCase();

  const routes = [
    // Troubleshooting triggers
    { pattern: /\b(error|dump|st22|abend|not working|runtime error|short dump|exception)\b/, skill: 'troubleshooting' },
    // Estimation triggers
    { pattern: /\b(estimate|effort|how long|story points|person.?days|timeline)\b/, skill: 'estimation' },
    // Go-live triggers
    { pattern: /\b(go.?live|cutover|readiness|production.*deploy)\b/, skill: 'go-live-readiness' },
    // Code review triggers
    { pattern: /\b(code review|review.*code|check.*quality|atc|clean core)\b/, skill: 'code-review' },
    // Business case triggers
    { pattern: /\b(business case|roi|tco|value|cost benefit)\b/, skill: 'value-advisory' },
    // Migration triggers
    { pattern: /\b(migration|s.?4.*hana|conversion|brownfield|greenfield|bluefield)\b/, skill: 's4hana-migration' },
    // Code generation triggers
    { pattern: /\b(generate|create.*class|create.*program|scaffold|rap|cds view)\b/, skill: 'code-generation' },
    // Autopilot triggers
    { pattern: /\b(autopilot|build.*end.?to.?end|full pipeline|idea to code)\b/, skill: 'autopilot' },
    // Testing triggers
    { pattern: /\b(test plan|test cases|sit|uat|testing strategy)\b/, skill: 'testing-strategy' },
    // Data migration triggers
    { pattern: /\b(data migration|data load|lsmw|bapi.*upload|legacy.*data)\b/, skill: 'data-migration' },
    // Architecture triggers
    { pattern: /\b(architecture|solution design|integration pattern|landscape)\b/, skill: 'solution-architecture' },
    // Performance triggers
    { pattern: /\b(performance|slow|runtime|st05|sql trace|sat|optimization)\b/, skill: 'performance-tuning' },
  ];

  for (const route of routes) {
    if (route.pattern.test(prompt)) {
      return {
        message: `💡 SAP Superpowers detected: "${route.skill}" skill is relevant for this request. The agent should invoke this skill for structured guidance.`
      };
    }
  }

  return {};
}
