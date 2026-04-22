# Privacy Policy

## Summary

**SAP Superpowers collects zero data.** No telemetry, no analytics, no tracking, no phone-home. Period.

## What Stays Local

- All skill execution happens locally in your Claude Code session
- SAP credentials are stored locally in `.sap-superpowers/sap.env`
- Generated deliverables are written to your local filesystem
- No data is transmitted to any external server by the core plugin

## MCP Server Connections

When you configure the MCP bridge to connect to a SAP system:
- Connection details are stored locally (`.sap-superpowers/sap.env`)
- Data flows directly between your machine and your SAP system
- SAP Superpowers does not proxy, intercept, or log MCP traffic

## Extensions

Optional extensions (if installed) may connect to third-party services:
- These connections are opt-in and require explicit configuration
- Each extension's privacy policy applies separately
- The core plugin functions fully without any extensions

## Your Rights

- You can delete all local data by removing the `.sap-superpowers/` directory
- No account is required to use SAP Superpowers
- No data retention — nothing persists beyond your session unless you save deliverables
