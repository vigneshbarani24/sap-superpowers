# Data Extraction Policy

## Multi-Layer Enforcement

Data extraction from SAP systems follows a 4-tier protection model:

```
Tier 1: Agent instructions (skill-level rules — always active)
Tier 2: Session directives (CLAUDE.md global rules — always active)
Tier 3: PreToolUse hook (hooks/pre-tool-enforcer.mjs — intercepts MCP calls)
Tier 4: MCP server-side enforcement (server configuration — if supported)
```

## Blocklist Categories

Located in `exceptions/` directory:

| File | Protects |
|------|----------|
| hr-payroll.json | Employee compensation, payroll results |
| banking-payment.json | Bank accounts, payment runs, wire transfers |
| master-data-pii.json | Customer/vendor PII (names, addresses, IDs) |
| auth-security.json | User credentials, authorization profiles |
| tax-government-ids.json | Tax IDs, national ID numbers |
| pricing-conditions.json | Pricing conditions, special agreements |
| audit-security-logs.json | Audit trails, security events |
| protected-business-data.json | Financial documents, sales/purchase orders |

## Enforcement Levels

### Hard Block (level: "hard")
- **Action:** MCP tool call is rejected — operation cannot proceed
- **Tables:** HR payroll, bank details, credentials, national IDs
- **Override:** Requires explicit user approval with documented justification
- **Approval file:** `.sap-superpowers/data-access-approval-YYYYMMDD-HHMM.md`

### Soft Block (level: "soft")
- **Action:** Warning displayed, operation proceeds with caution notice
- **Tables:** Business documents, master data, audit logs
- **Purpose:** Awareness — ensure the user knows they're accessing sensitive data

## Acknowledgment Protocol

When a user needs to access hard-blocked data:

1. Agent explains the risk and data category
2. User must provide explicit affirmative: **"yes"**, **"approved"**, or **"confirmed"**
3. Vague responses ("just do it", "sure", "whatever") are NOT accepted
4. Approval is logged with timestamp and justification
5. Approval is valid for the current session only — no carryover

## Approved Alternatives

Instead of direct table access, recommend:

| Instead Of | Use |
|-----------|-----|
| PA0008 (salary data) | Aggregated headcount reports, anonymized analytics |
| USR02 (password hashes) | SUIM (user info system) reports without sensitive fields |
| BSEG (FI line items) | I_JournalEntryItem CDS entity with auth checks |
| KNA1/LFA1 (master data) | I_Customer / I_Supplier CDS with field-level filtering |
| KONP (pricing rates) | Aggregated pricing summaries without customer-specific rates |

## Rules

1. **Never extract full tables** — always use WHERE clause with business justification
2. **Never export PII** to files without encryption/anonymization
3. **Log all data access** through MCP tools
4. **Session-only approval** — approval does not carry over to next session
5. **Least privilege** — access only the fields/records needed for the task
