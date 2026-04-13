---
name: integration-suite
description: Use when designing, building, troubleshooting, or reviewing SAP Integration Suite artifacts — Cloud Integration (CPI) iFlows, API Management proxies, Integration Advisor B2B templates, Event Mesh, or any middleware pattern connecting SAP and non-SAP systems.
---

# SAP Integration Suite

Governs all integration design and implementation on SAP Integration Suite. Every iFlow, API proxy, and B2B scenario MUST be built for resilience, observability, and maintainability — not just for the happy path.

## Content Routing

| Topic | Section |
|-------|---------|
| iFlow design and best practices | Iron Laws + iFlow Patterns |
| API Management | Key Concepts + Integration Points |
| Error handling and retry | Rationalization Table + Key Concepts |
| Monitoring and alerting | Transaction Codes / Tools |
| S/4HANA connectivity patterns | Integration Points |
| Security and credentials | Key Concepts |

## Iron Laws

1. **NEVER HARD-CODE ENDPOINTS OR CREDENTIALS IN IFLOWS.** Every URL, username, password, client ID, and secret MUST be stored in the tenant's Security Material store (credential name referenced by alias) or Destination Service. Hard-coded values create security vulnerabilities and make tenant migration impossible without code changes.
2. **ALWAYS EXTERNALIZE CONFIGURATION PARAMETERS.** Runtime environment (DEV/QAS/PRD) differences — endpoint URLs, receiver system IDs, queue names — MUST be externalized via Externalized Parameters (Configure menu on deployed artifact). Changing a parameter should never require re-editing and redeploying the iFlow.
3. **ALWAYS IMPLEMENT ERROR HANDLING WITH RETRY AND DEAD LETTER QUEUE.** Every iFlow that is not purely synchronous MUST have an Exception Subprocess with: (a) retry logic using a JMS adapter or scheduled re-trigger, (b) alerting to Operations Monitor or SAP Alert Notification Service, and (c) a dead-letter queue or error inbox for messages that exhaust retries. Silent failure is the worst failure mode.
4. **NEVER USE GROOVY SCRIPTS WHEN CONTENT MODIFIER OR BUILT-IN STEPS CAN DO THE JOB.** Scripts are black boxes: they bypass flow visualization, inhibit low-code modifications, and create maintenance bus factors. Use Message Mapping, Content Modifier, Filter, Splitter, or built-in functions first. Scripts are permitted only for logic that is genuinely impossible with standard steps.
5. **ALWAYS DESIGN FOR IDEMPOTENCY IN ASYNC SCENARIOS.** Fire-and-forget and pub/sub patterns MUST assume at-least-once delivery. Receivers must handle duplicate message IDs gracefully. Use the Data Store Write step or Message ID correlation to detect and discard duplicates at the receiver side.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Hard-code the S/4HANA URL in the HTTPS receiver adapter | "This endpoint doesn't change often" | URL changes at S/4HANA upgrade, system copy, or migration; breaks without touching source | Store in externalized parameter + Security Material; takes 5 minutes and survives every system change |
| Use a Groovy script to transform a simple field mapping | "Scripts are flexible and I know Groovy" | Script is invisible to business analysts, breaks content modifier display, requires developer every time a field changes | Use Message Mapping or Content Modifier; use Groovy only when XSLT and built-ins genuinely cannot handle the requirement |
| Skip Exception Subprocess because "this interface is low risk" | "Errors here aren't critical to business" | Low-risk interfaces become invisible failure points; ops teams can't distinguish "no messages" from "failed messages" | Every iFlow needs at minimum: exception handling + alert. Low-risk = simpler handling, not no handling. |
| Reuse a single iFlow for multiple source systems | "It reduces the number of artifacts to manage" | Multi-branch iFlows become impossible to read, impossible to monitor individually, and impossible to deploy independently | One iFlow per source-target-message-type combination. Reuse via subprocess references or mapping artifacts, not branching. |
| Use IDoc adapter for new S/4HANA integrations | "IDocs are proven and stable" | New S/4HANA integrations should prefer OData APIs (REST) or Business Events (AMQP via Event Mesh) — IDocs are legacy protocol with no JSON support and weak error semantics | Use OData V4 or SOAP (BAPI/RFC wrapper) for synchronous; Event Mesh for async. IDoc only when target system mandates it. |
| Store the SFTP private key as a flow variable | "It's simpler than the keystore" | Flow variables are plaintext in MPL logs; keys in flow variables are exposed in trace mode and persist in error messages | Use the tenant Keystore for all private keys; reference by alias in the adapter configuration |
| Deploy directly to production without tracing | "It worked in QAS" | Production data volumes and timing expose race conditions invisible in QAS; trace mode must be used to verify production behavior on first few messages | Enable trace mode for 30 minutes post-deployment in production; disable after successful verification |

## Red Flags

Watch for these in your own reasoning — each signals a design or security failure:

- "I'll put the password directly in the adapter..." → Immediate Iron Law 1 violation. Check Security Material store; create a credential alias first.
- "Let me write a quick script to handle this..." → Pause. Can a Content Modifier, Filter, or standard mapping step achieve the same result? Only script if the answer is definitely no.
- "This interface doesn't need error handling, it's just a notification..." → Every deployed iFlow needs an Exception Subprocess. "Just a notification" that fails silently becomes an incident when business expects action on it.
- "We can figure out idempotency later..." → Idempotency is an architectural decision that cannot be retrofitted without receiver-side changes. Design it in from the start for all async flows.
- "Let me just copy the QAS iFlow and change the URL..." → URL changes belong in externalized parameters, not iFlow copies. Copies create version drift. Use the Configure menu post-deployment.
- "The MPL shows green, so we're done..." → Message Processing Log (MPL) green means the iFlow completed without exception — it does not mean the business process succeeded. Verify the receiver acknowledged the data correctly.

<HARD-GATE>
Before designing any iFlow: confirm (1) the integration pattern (sync/async/pub-sub), (2) the security model (credential store aliases for all endpoints), (3) the error handling strategy (retry count, dead letter behavior), and (4) externalized parameters for all environment-specific values. Do not write a single adapter configuration until these four items are decided.
</HARD-GATE>

## Key Concepts

### Cloud Integration (CPI)
- **iFlow (Integration Flow):** The unit of deployment. Contains sender/receiver adapters, routing, mapping, and processing steps. Deployed as a Maven artifact to the Integration Runtime worker nodes.
- **Adapters:** HTTPS, SOAP, OData, SFTP, AMQP, JMS, RFC, IDoc, AS2, SuccessFactors, Ariba, and 60+ others. Each has sender and receiver variants.
- **Message Processing Log (MPL):** Per-message audit trail. Contains header, properties, attachments, and (in trace mode) full payload at each step.
- **Externalized Parameters:** Runtime-configurable properties set via the Configure tile without redeployment. Environment-specific values belong here, not in iFlow property panels.
- **Security Material:** Tenant-level store for user credentials (BasicAuthentication), OAuth2 client credentials, PGP keys, and known hosts. Accessed by alias in adapter config — never value.
- **Keystore:** Tenant-level X.509 certificate store. Used for HTTPS mutual TLS, SFTP key authentication, and message-level signing/encryption (WS-Security, AS2).
- **Content Modifier:** Sets message body, headers, and exchange properties. Preferred over scripts for simple value assignment, static payloads, or header manipulation.
- **Message Mapping:** Graphical XSLT-based mapping editor. Supports functions, constants, value mapping tables. Preferable to Groovy for structured field-level transformations.
- **Data Store:** Persistent key-value store within Integration Suite tenant. Used for correlation IDs, duplicate detection, and store-and-forward patterns.

### API Management
- **API Proxy:** Facade over a backend API. Adds policies (security, throttling, transformation, caching) without touching the backend.
- **Policies:** Pre-built logic units applied at request/response: VerifyAPIKey, OAuthV2, Quota, SpikeArrest, AssignMessage, ServiceCallout, JSONToXML, RaiseFault.
- **Rate Limiting:** SpikeArrest (burst control, per second/minute) + Quota (volume control, per day/month). Both are needed — SpikeArrest alone cannot enforce contractual limits.
- **API Business Hub Enterprise:** Developer portal for API discovery, documentation, and self-service subscription.

### Integration Patterns
- **Synchronous Request-Reply:** Caller waits for response. Use HTTPS sender → processing → HTTPS/OData receiver. Timeout must be configured at both iFlow and load balancer level.
- **Async Fire-and-Forget:** Caller sends and continues. Use JMS or AMQP queue as intermediary; separate iFlow polls and delivers. Decouples sender availability from receiver availability.
- **Pub/Sub via Event Mesh:** Publisher raises a CloudEvent to a topic; N subscribers consume independently. Use for domain events (BusinessPartnerChanged, SalesOrderCreated) originating from S/4HANA.
- **Store-and-Forward:** Messages persisted in Data Store or JMS queue; retried on schedule until receiver is available. Essential for batch receivers with maintenance windows.

### S/4HANA Connectivity — When to Use What
| Mechanism | Use When |
|-----------|----------|
| OData V4 API | Real-time read/write; prefer for new integrations; JSON native |
| OData V2 API | Existing integrations; still valid but V4 preferred for new |
| SOAP / BAPI-RFC Wrapper | Complex transactional logic; existing BAPI in S/4HANA |
| IDoc | Legacy EDI or partner systems that mandate IDoc |
| Business Events (Event Mesh) | Domain event propagation; async; decoupled; no polling |

## Monitoring Tools

| Tool / Path | Purpose |
|-------------|---------|
| Operations Monitor → Message Processing | MPL — per-message status, payload (trace), error details |
| Operations Monitor → Manage Integration Content | Deployed artifacts, runtime status, start/stop |
| Operations Monitor → Manage Locks | Stuck messages in Data Store / sequence locks |
| Alert Notification Service | Push alerts on iFlow errors to email, Slack, PagerDuty |
| API Management → Analytics | API call volumes, latency, error rates, top consumers |
| Trace Mode | Detailed step-by-step payload capture — enable only in non-prod or briefly in prod |

## Integration Points

- **S/4HANA:** Connects via Cloud Connector (on-prem) or direct HTTPS (cloud). Exposes OData V4 APIs, SOAP RFC/BAPI wrappers, IDocs, and Business Events via Event Mesh.
- **SuccessFactors:** Native SF adapter (OData-based). Used for employee replication, position management, payroll integration.
- **Ariba / Fieldglass:** Dedicated adapters for procurement and contingent workforce. Handles cXML and AS2 for EDI partners.
- **Third-Party Systems:** SFTP for legacy file transfer; AS2 for EDI/B2B; REST/HTTPS for modern APIs. Integration Advisor provides B2B message templates (EDIFACT, ANSI X12, IDoc).
- **BTP Services:** Integration Suite runs on BTP. Connects to XSUAA for OAuth, Destination Service for endpoint management, SAP Event Mesh for pub/sub, Alert Notification Service for ops.

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] All endpoints stored as Security Material aliases or Destination Service references — no hard-coded values
- [ ] All environment-specific values defined as Externalized Parameters — confirmed via Configure tile
- [ ] Exception Subprocess implemented: retry logic configured, alert or logging step present
- [ ] Idempotency confirmed for all async/pub-sub iFlows: duplicate detection mechanism in place
- [ ] Groovy scripts justified in design document — all standard-step alternatives explicitly ruled out
- [ ] Test messages executed in MPL: green status confirmed AND receiver system verified to have processed correctly
- [ ] Trace mode enabled during initial production deployment, disabled after first successful batch

**Evidence required:** MPL screenshot showing successful message processing; receiver system record confirming data arrived correctly; no credentials visible in iFlow property panels.

## Next Skill

After Integration Suite design or build: `verification-before-completion`
For ABAP-side API development in S/4HANA: `abap-cloud`
For BTP platform setup and connectivity: `btp`

## Related Skills

- `abap-cloud` — Developing OData APIs and Business Events in S/4HANA
- `btp` — BTP environment, Destination Service, Event Mesh setup
- `security-grc` — OAuth, XSUAA, and API security governance
- `troubleshooting` — Diagnosing iFlow failures from MPL and system logs
