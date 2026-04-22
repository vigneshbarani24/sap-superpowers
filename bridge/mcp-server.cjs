#!/usr/bin/env node
/**
 * SAP Superpowers — MCP Server Bridge
 *
 * Launches and manages the connection to the ABAP ADT MCP server.
 * Supports multiple MCP server backends:
 *   - abap-mcp-adt-powerup (community MCP server)
 *   - Custom ADT REST client
 *   - Mock server for testing
 *
 * Three-tier configuration resolution:
 *   1. Local project config (.sap-superpowers/config.json)
 *   2. User config (~/.sap-superpowers/config.json)
 *   3. Plugin defaults (plugin/config/defaults.json)
 */

const { spawn } = require('child_process');
const { existsSync, readFileSync, mkdirSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');

const CONFIG_DIR = '.sap-superpowers';
const CONFIG_FILE = 'config.json';
const ENV_FILE = 'sap.env';

class MCPBridge {
  constructor() {
    this.config = this.loadConfig();
    this.mcpProcess = null;
  }

  /**
   * Load configuration with three-tier resolution
   */
  loadConfig() {
    const defaults = {
      sapVersion: 's4hana-onprem',
      abapRelease: '758',
      mcpServer: 'abap-mcp-adt-powerup',
      mcpTransport: 'stdio',
      enforcement: 'standard',
      industry: null,
      country: null,
      sproCache: false
    };

    // Tier 1: Project-level config
    const projectConfig = this.readJson(join(process.cwd(), CONFIG_DIR, CONFIG_FILE));
    // Tier 2: User-level config
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    const userConfig = this.readJson(join(homeDir, CONFIG_DIR, CONFIG_FILE));

    return { ...defaults, ...userConfig, ...projectConfig };
  }

  readJson(filePath) {
    try {
      if (existsSync(filePath)) {
        return JSON.parse(readFileSync(filePath, 'utf8'));
      }
    } catch { /* ignore parse errors */ }
    return {};
  }

  /**
   * Preflight checks before launching MCP server
   */
  async preflight() {
    const checks = [];

    // Check Node.js version
    const nodeVersion = parseInt(process.version.slice(1));
    if (nodeVersion < 20) {
      checks.push({ status: 'fail', check: 'Node.js version', message: `Requires Node.js >= 20, found ${process.version}` });
    } else {
      checks.push({ status: 'pass', check: 'Node.js version', message: process.version });
    }

    // Check config directory
    const configDir = join(process.cwd(), CONFIG_DIR);
    if (existsSync(configDir)) {
      checks.push({ status: 'pass', check: 'Config directory', message: configDir });
    } else {
      checks.push({ status: 'warn', check: 'Config directory', message: 'Not found — run /sap-setup to initialize' });
    }

    // Check MCP server availability
    const mcpServer = this.config.mcpServer;
    try {
      require.resolve(mcpServer);
      checks.push({ status: 'pass', check: 'MCP server', message: `${mcpServer} found` });
    } catch {
      checks.push({ status: 'warn', check: 'MCP server', message: `${mcpServer} not installed — install via npm i -g ${mcpServer}` });
    }

    // Check SAP connection env vars
    const envFile = join(process.cwd(), CONFIG_DIR, ENV_FILE);
    if (existsSync(envFile)) {
      checks.push({ status: 'pass', check: 'SAP environment', message: 'sap.env found' });
    } else {
      checks.push({ status: 'warn', check: 'SAP environment', message: 'No sap.env — MCP tools will not connect to SAP' });
    }

    return checks;
  }

  /**
   * Launch the MCP server process
   */
  launch() {
    const mcpServer = this.config.mcpServer;
    const transport = this.config.mcpTransport;

    // Load environment from sap.env
    const env = { ...process.env };
    const envFile = join(process.cwd(), CONFIG_DIR, ENV_FILE);
    if (existsSync(envFile)) {
      const envContent = readFileSync(envFile, 'utf8');
      for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }

    // Set SAP Superpowers context
    env.SAP_SUPERPOWERS_VERSION = '3.0';
    env.SAP_VERSION = this.config.sapVersion;
    env.ABAP_RELEASE = this.config.abapRelease;
    env.ENFORCEMENT_PROFILE = this.config.enforcement;

    if (this.config.industry) env.SAP_INDUSTRY = this.config.industry;
    if (this.config.country) env.SAP_COUNTRY = this.config.country;

    console.log(`[SAP Superpowers] Launching MCP server: ${mcpServer} (${transport})`);

    try {
      this.mcpProcess = spawn('npx', [mcpServer, '--transport', transport], {
        env,
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      this.mcpProcess.on('error', (err) => {
        console.error(`[SAP Superpowers] MCP server error: ${err.message}`);
      });

      this.mcpProcess.on('exit', (code) => {
        console.log(`[SAP Superpowers] MCP server exited with code ${code}`);
      });

      return true;
    } catch (err) {
      console.error(`[SAP Superpowers] Failed to launch MCP server: ${err.message}`);
      return false;
    }
  }

  /**
   * Initialize project configuration
   */
  initProject(options = {}) {
    const configDir = join(process.cwd(), CONFIG_DIR);
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }

    const config = {
      sapVersion: options.sapVersion || 's4hana-onprem',
      abapRelease: options.abapRelease || '758',
      mcpServer: options.mcpServer || 'abap-mcp-adt-powerup',
      mcpTransport: options.mcpTransport || 'stdio',
      enforcement: options.enforcement || 'standard',
      industry: options.industry || null,
      country: options.country || null,
      sproCache: false,
      createdAt: new Date().toISOString(),
      createdBy: 'sap-superpowers'
    };

    writeFileSync(
      join(configDir, CONFIG_FILE),
      JSON.stringify(config, null, 2)
    );

    // Create sap.env template
    if (!existsSync(join(configDir, ENV_FILE))) {
      writeFileSync(join(configDir, ENV_FILE), [
        '# SAP Superpowers — SAP Connection Environment',
        '# Rename this file and fill in your SAP system details',
        '#',
        '# ADT Connection (for MCP server)',
        'SAP_HOST=https://your-sap-system.example.com',
        'SAP_PORT=44300',
        'SAP_CLIENT=100',
        'SAP_USER=your_username',
        'SAP_PASSWORD=your_password',
        '# SAP_LANG=EN',
        '#',
        '# Optional: RFC connection (for BAPI/FM calls)',
        '# RFC_ASHOST=your-sap-system.example.com',
        '# RFC_SYSNR=00',
        '# RFC_CLIENT=100',
        ''
      ].join('\n'));
    }

    // Create .gitignore for config dir
    writeFileSync(join(configDir, '.gitignore'), [
      '# Never commit SAP credentials',
      'sap.env',
      'config.json',
      'spro-cache/',
      'data-access-approval-*.md',
      ''
    ].join('\n'));

    return config;
  }
}

// CLI entry point
if (require.main === module) {
  const bridge = new MCPBridge();
  const cmd = process.argv[2];

  if (cmd === 'preflight') {
    bridge.preflight().then(checks => {
      for (const c of checks) {
        const icon = c.status === 'pass' ? '✅' : c.status === 'warn' ? '⚠️' : '❌';
        console.log(`${icon} ${c.check}: ${c.message}`);
      }
    });
  } else if (cmd === 'init') {
    const config = bridge.initProject();
    console.log('✅ Project initialized:', JSON.stringify(config, null, 2));
  } else {
    bridge.launch();
  }
}

module.exports = { MCPBridge };
