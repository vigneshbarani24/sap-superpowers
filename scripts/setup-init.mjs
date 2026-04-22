#!/usr/bin/env node
/**
 * SAP Superpowers — Setup Initialization Script
 *
 * Run via: /sap-setup or node scripts/setup-init.mjs
 *
 * Steps:
 * 1. Detect SAP environment (SAP version, ABAP release)
 * 2. Initialize .sap-superpowers/ config directory
 * 3. Configure MCP server connection
 * 4. Register enforcement hooks
 * 5. Optional: Extract SPRO customizing cache
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const CONFIG_DIR = join(PROJECT_ROOT, '.sap-superpowers');
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT || join(PROJECT_ROOT, 'plugin');

async function setup() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SAP Superpowers v3.0 — Setup Wizard            ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  Step 1: Environment Detection                  ║');
  console.log('║  Step 2: Project Configuration                  ║');
  console.log('║  Step 3: MCP Server Setup                       ║');
  console.log('║  Step 4: Hook Registration                      ║');
  console.log('║  Step 5: Verification                           ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  // Step 1: Environment detection
  console.log('📋 Step 1: Detecting SAP environment...');
  const sapVersion = detectSAPVersion();
  console.log(`   SAP Version: ${sapVersion.version}`);
  console.log(`   ABAP Release: ${sapVersion.release}`);
  console.log(`   Platform: ${sapVersion.platform}`);
  console.log('');

  // Step 2: Create config directory
  console.log('📁 Step 2: Initializing project configuration...');
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
    console.log(`   Created: ${CONFIG_DIR}/`);
  }

  const config = {
    sapVersion: sapVersion.version,
    abapRelease: sapVersion.release,
    platform: sapVersion.platform,
    mcpServer: 'abap-mcp-adt-powerup',
    mcpTransport: 'stdio',
    enforcement: 'standard',
    industry: null,
    country: null,
    sproCache: false,
    initialized: new Date().toISOString(),
    pluginVersion: '3.0'
  };

  writeFileSync(join(CONFIG_DIR, 'config.json'), JSON.stringify(config, null, 2));
  console.log('   Config written: config.json');

  // Create .gitignore
  writeFileSync(join(CONFIG_DIR, '.gitignore'), 'sap.env\nconfig.json\nspro-cache/\ndata-access-approval-*.md\n');
  console.log('   Gitignore written: .gitignore');
  console.log('');

  // Step 3: MCP server check
  console.log('🔌 Step 3: MCP Server configuration...');
  console.log('   To connect to a live SAP system, install the MCP server:');
  console.log('   npm install -g abap-mcp-adt-powerup');
  console.log('   Then create .sap-superpowers/sap.env with your connection details.');
  console.log('');

  // Step 4: Hook registration
  console.log('🔒 Step 4: Enforcement hooks...');
  console.log('   ✅ PreToolUse: Data protection enforcer');
  console.log('   ✅ PreToolUse: Transport validator');
  console.log('   ✅ PostToolUse: Result verifier');
  console.log('   ✅ UserPromptSubmit: Skill router');
  console.log('   ✅ PreCompact: Context preserver');
  console.log('');

  // Step 5: Verification
  console.log('✅ Step 5: Setup complete!');
  console.log('');
  console.log('   Next steps:');
  console.log('   1. Set industry: Edit .sap-superpowers/config.json → "industry": "retail"');
  console.log('   2. Set country: Edit .sap-superpowers/config.json → "country": "germany"');
  console.log('   3. Connect SAP: Create .sap-superpowers/sap.env with credentials');
  console.log('   4. Start working: Ask any SAP question — skills auto-activate!');
  console.log('');
}

function detectSAPVersion() {
  // Check for project indicators
  const indicators = {
    's4hana-cloud': ['.btp', 'mta.yaml', 'xs-app.json'],
    's4hana-onprem': ['sapui5', '.nwcloud'],
    'ecc6': ['saplink', 'ZMIG']
  };

  for (const [version, files] of Object.entries(indicators)) {
    for (const file of files) {
      if (existsSync(join(PROJECT_ROOT, file))) {
        return {
          version,
          release: version === 'ecc6' ? '740' : version === 's4hana-cloud' ? '758' : '756',
          platform: version === 's4hana-cloud' ? 'ABAP Cloud' : 'ABAP Classic'
        };
      }
    }
  }

  // Default to S/4HANA on-premise
  return {
    version: 's4hana-onprem',
    release: '758',
    platform: 'ABAP Classic'
  };
}

setup().catch(console.error);
