---
name: btp
description: Use when designing, building, or troubleshooting solutions on SAP Business Technology Platform — subaccounts, Cloud Foundry, Kyma, CAP, HANA Cloud, XSUAA, destinations, or any BTP service.
---

# BTP (SAP Business Technology Platform)

Enforces secure, portable, multi-tenant-aware BTP architecture — no hard-coded credentials, no monolithic subaccount designs, no skipped security configurations.

## Content Routing

| Topic | Section |
|-------|---------|
| Subaccount design | Subaccount Architecture |
| CF vs Kyma choice | Runtime Decision |
| CAP development | CAP Patterns |
| Security / XSUAA | Security Patterns |
| HANA Cloud | HANA Cloud Patterns |
| Destinations | Destination Service |

## Iron Laws

1. **ALWAYS CONSIDER MULTI-TENANCY FROM DAY ONE.** Retrofitting multi-tenancy is 3-5x the effort of designing it in. Every BTP solution must document its tenancy model (single vs. multi) before architecture is approved.
2. **NEVER HARD-CODE CREDENTIALS.** No passwords, client secrets, or connection strings in code, config files, or environment variables set manually. All credentials live in the Credential Store, Destination Service, or Secret Store (Kyma). Hard-coded credentials will be rotated, and your app will break at 2am.
3. **ALWAYS USE THE DESTINATION SERVICE FOR BACKEND CONNECTIVITY.** Direct URL construction bypasses certificate management, load balancing, and the principal propagation chain. Destination Service is mandatory for all S/4HANA, on-prem, and external system calls.
4. **NEVER SKIP XSUAA SCOPE CHECKS.** An application that doesn't enforce scopes grants every authenticated user admin-level access. Define roles, role collections, and scopes in `xs-security.json` before the first protected endpoint is written.
5. **NEVER DEPLOY TO PRODUCTION WITHOUT A SEPARATE SUBACCOUNT.** Dev / Test / Prod are separate subaccounts, not separate spaces in the same subaccount. Shared subaccounts share entitlements, quotas, and blast radius.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Put credentials in `default-env.json` | "It's only for local dev, not production" | `default-env.json` gets committed to git; rotated credentials break local envs for everyone | Use `cf env` export or `.env` in `.gitignore`; use Credential Store for real secrets |
| Use one subaccount for all landscapes | "Simpler to manage, fewer accounts" | Single subaccount = single quota pool; a runaway dev workload can starve production | Iron Law 5: Separate subaccounts are architecture, not bureaucracy |
| Skip `xs-security.json` scope design | "We'll add security after the PoC works" | XSUAA app registration cannot be easily retrofitted; scope names become API contracts | Define scopes on day one; they are cheap to define, expensive to change |
| Build on CF because it's familiar | "We've always used CF" | Kyma is mandatory for some scenarios (event mesh, complex Kubernetes workloads); choose based on requirements | See Runtime Decision section; document the choice with criteria |
| Use `hdi-shared` plan for production | "It's the easy HANA Cloud option" | `hdi-shared` is for dev/test; production requires dedicated HANA Cloud instance with HA config | Check service plan before provisioning; document the plan choice in architecture |

## Red Flags

- "I'll add the security config later..." → XSUAA scopes are an architecture decision. Define them now.
- "The credentials are just for the PoC..." → PoCs become production. Hard-code once, regret forever.
- "We can use the same subaccount for dev and prod..." → Iron Law 5 violation. Separate subaccounts are non-negotiable.
- "Let me just call the S/4HANA URL directly..." → Iron Law 3 violation. Use the Destination Service.
- "Multi-tenancy isn't needed for this project..." → Document that decision explicitly and get sign-off; don't assume it.

<HARD-GATE>
Before any BTP solution design or code: (1) Confirm subaccount landscape (dev/test/prod separation). (2) Confirm runtime choice (CF or Kyma) with documented rationale. (3) Confirm tenancy model. (4) Confirm all credentials will go through Destination Service or Credential Store. No architecture diagram or code until these four decisions are documented.
</HARD-GATE>

## Subaccount Architecture

**Hierarchy:** Global Account → Directories (optional grouping) → Subaccounts → Spaces (CF) / Namespaces (Kyma)

**Recommended Landscape:**
- `dev` subaccount — developer sandbox, liberal quotas
- `test` / `staging` subaccount — integration testing, mirrors prod entitlements
- `prod` subaccount — production, restricted access, alerting enabled

**Entitlement management:** Assign service plans per subaccount. Never share entitlements across landscapes by co-locating in one subaccount.

## Runtime Decision: CF vs Kyma

| Factor | Choose CF | Choose Kyma |
|--------|-----------|-------------|
| Primary language | Node.js, Java, Python | Any (container-based) |
| Complexity | Straightforward apps | Microservices, event-driven |
| Kubernetes needed | No | Yes |
| Event Mesh integration | Limited | Native |
| Custom runtime | Not supported | Full control |
| Operator model | Buildpacks | Helm charts |

## CAP Patterns

- **`cds.requires`** — declare service dependencies, never hard-code in handlers
- **`@restrict` annotations** — declarative authorization; supplement with `req.user.is()` in handlers
- **Hybrid testing:** `cds bind --to <cloud-service>` for local dev against real BTP services
- **CAP + HANA:** Use `@sap/hana-client` via `cds add hana`; never write raw HANA SQL in handlers
- **Multitenancy:** Use `@sap/cds-mtxs` extension; implement `onSubscribe` and `onUnsubscribe` handlers

## Security Patterns (XSUAA)

Key `xs-security.json` elements:
```
xsappname, tenant-mode (dedicated|shared), scopes, role-templates, role-collections
```

- **Principal propagation:** Set `forwardAuthToken: true` in destination for user context forwarding to S/4HANA
- **Service-to-service:** Use `grant-as-authority-to-apps` in scopes; bind both apps to same XSUAA instance
- **Token exchange:** Use `TokenExchange` grant type for on-behalf-of flows

## HANA Cloud Patterns

| Object | Pattern |
|--------|---------|
| HDI containers | One container per app; never share across apps |
| Calculation views | Use sparingly; prefer CDS or SQL views for maintainability |
| Full-text search | `CONTAINS` predicate with `FUZZY` option |
| Monitoring | HANA Cockpit → Performance → Thread Samples for slow query analysis |
| Backup | Automatic daily; verify recovery point objective matches SLA |

## Key BTP Services Reference

| Service | Purpose | Key Config |
|---------|---------|-----------|
| XSUAA | Authentication & authorization | `xs-security.json` |
| Destination Service | Backend connectivity | Destination config in BTP Cockpit |
| Connectivity Service | On-premise via Cloud Connector | `OnPremise` destination type |
| SAP Event Mesh | Async messaging | Queue/topic binding in `enterprise-messaging.json` |
| Alert Notification | Ops alerting | Conditions + actions in service config |
| Job Scheduling | Cron / one-time jobs | `jobscheduler` binding in `mta.yaml` |
| Audit Log | Compliance logging | Bind `auditlog` service; log via SDK |

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Subaccount landscape documented (dev/test/prod as separate subaccounts)
- [ ] Runtime choice (CF vs Kyma) documented with rationale
- [ ] Tenancy model documented and signed off
- [ ] Zero hard-coded credentials in code or `mta.yaml` — all via Destination Service or Credential Store
- [ ] `xs-security.json` scopes defined and reviewed
- [ ] Deployed app responds correctly to authentication + authorization checks (scope enforcement verified)

**Evidence required:** Architecture diagram showing subaccount structure; `xs-security.json` with defined scopes; deployment log showing successful bind to XSUAA and Destination Service.

## Next Skill

After BTP solution design, invoke: `abap-cloud` (if ABAP extension) or `integration-suite` (if integration required)
For security review, invoke: `security-grc`

## Related Skills

- `abap-cloud` — ABAP development on BTP ABAP Environment
- `integration-suite` — API and integration patterns
- `security-grc` — Security and authorization review
