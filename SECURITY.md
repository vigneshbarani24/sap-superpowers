# Security Policy

## Data Protection

SAP Superpowers is designed for enterprise SAP environments. Security is a core design principle, not an afterthought.

### What We Protect

- **8 blocklist categories** enforce access control on 80+ sensitive SAP tables
- **Hard blocks** reject access to payroll, credentials, national IDs, password hashes
- **Soft blocks** warn on business documents, master data, audit logs
- **Per-session approval** — no blanket access carryover between sessions
- **Transport validation** — blocks direct production modifications

### What We Never Do

- **No telemetry.** Zero data collection. Zero phone-home. Zero analytics.
- **No credential storage.** SAP credentials stay in `.sap-superpowers/sap.env` (gitignored)
- **No external API calls** from the core plugin. Extensions are opt-in.
- **No data exfiltration.** Blocklists prevent bulk extraction of sensitive tables.

### Credential Handling

- SAP connection credentials are stored in user-space only (`.sap-superpowers/sap.env`)
- The `.gitignore` in `.sap-superpowers/` prevents accidental credential commits
- Credentials are never logged, transmitted, or cached beyond the session

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. **Do not open a public issue**
2. Email: [security contact via repository owner]
3. Include: description, reproduction steps, potential impact
4. We will respond within 48 hours

## Supported Versions

| Version | Supported |
|---------|-----------|
| 3.1.x | Yes |
| 3.0.x | Security fixes only |
| < 3.0 | No |
