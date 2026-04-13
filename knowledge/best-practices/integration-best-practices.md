# Integration Best Practices — SAP Reference Guide

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise and Cloud, SAP BTP Integration Suite, SAP PI/PO
**Referenced By:** skills/integration-suite, skills/development-workflow, skills/solution-architecture

## Integration Technology Selection Matrix

| Scenario | Recommended Technology | Avoid |
|----------|----------------------|-------|
| SAP-to-SAP, real-time, simple | RFC / BAPI (legacy) or OData API | Direct DB link |
| SAP-to-third-party, real-time | OData V4 API via API Management | RFC to non-SAP |
| Batch, high-volume file exchange | IDoc (established) or flat file via SFTP + CPI | Real-time API for bulk |
| Event-driven, loose coupling | SAP Event Mesh (AMQP/HTTP) | Polling loops |
| Complex routing, transformation | SAP Cloud Integration (CPI) iFlow | Point-to-point code |
| EDI (ANSI X12 / EDIFACT) | IDoc via SAP ALE or CPI EDI adapter | Custom parsing |
| Legacy system integration | CPI with JDBC/SFTP/SOAP adapter | Direct RFC to legacy |
| Public API exposure | SAP API Management (rate limit, auth, analytics) | Exposing raw RFC |

---

## Integration Patterns

### Pattern 1 — Synchronous Request/Response

**Use when:** Caller needs an immediate response (e.g., ATP check, credit check, address validation).

```
Caller ──HTTP/OData──▶ SAP API Management ──▶ S/4HANA OData Service ──▶ Response
```

**Rules:**
- Timeout: set aggressive timeout (< 30s); never block indefinitely
- Error handling: return structured error body (HTTP 4xx/5xx with JSON error object)
- Retry: caller must implement exponential backoff (3 retries, 1s/2s/4s intervals)
- Circuit breaker: open circuit after 5 consecutive failures; close after 60s

**SAP Implementation:** OData V4 service exposed via SAP API Management on BTP; use XSUAA for OAuth 2.0 client credentials.

---

### Pattern 2 — Asynchronous Fire-and-Forget

**Use when:** Caller does not need immediate confirmation (e.g., order creation notification, stock update broadcast).

```
S/4HANA Event ──▶ SAP Event Mesh (topic) ──▶ Consumer App subscribes to topic
```

**Rules:**
- Message must be idempotent — design for at-least-once delivery
- Include a correlation ID (GUID) in every message header
- Dead-letter queue: configure DLQ for all subscriptions; monitor DLQ size
- Message expiry: set TTL (time-to-live) per message type (e.g., stock updates: 1 hour; order events: 24 hours)
- Schema: use CloudEvents 1.0 specification as envelope format

**SAP Implementation:** S/4HANA Business Event Handling (BEH) publishes events to SAP Event Mesh; consumer app (BTP CAP, third-party) subscribes via AMQP or HTTP webhook.

---

### Pattern 3 — Publish/Subscribe via CPI

**Use when:** Multiple consumers need the same message with different transformations (fan-out).

```
Source ──IDoc/RFC──▶ CPI iFlow ──▶ Transform ──▶ Target A (REST)
                                              ──▶ Target B (SFTP)
                                              ──▶ Target C (EDI/AS2)
```

**Rules:**
- One iFlow per integration scenario (single responsibility)
- Use Content Modifier to set/read message headers — avoid custom scripts for header logic
- Script steps: use Groovy for light transformation; use XSLT for heavy XML mapping
- Never use Java Script steps for business logic — Groovy is preferred for traceability
- Externalize all credentials to CPI Security Material store (never hardcode)

---

### Pattern 4 — Batch File Processing

**Use when:** High-volume data loads from legacy systems, nightly feeds, or data lake exports.

```
Source ──file──▶ SFTP ──▶ CPI (Poll) ──▶ Split/Chunk ──▶ S/4HANA BAPI/OData (batched)
                                                        ──▶ Error File ──▶ Alert
```

**Rules:**
- Chunk size: process in batches of 100–500 records per API call (bulk operations)
- Checkpointing: write processed record count to persistent store (CPI Data Store) — enables restart
- Error isolation: one bad record must not fail the entire file — use split + individual try/catch
- Audit trail: log source file name, record count, success count, error count, timestamp

---

## Technology Deep Dive — IDoc vs API vs RFC vs Event Mesh

| Dimension | IDoc | OData API | RFC/BAPI | Event Mesh |
|-----------|------|----------|---------|-----------|
| Coupling | Loose | Loose | Tight | Loose |
| Direction | Async (primarily) | Sync | Sync | Async |
| Transformation | SAP-specific structure | JSON/XML standard | SAP proprietary | CloudEvents / JSON |
| Error handling | IDoc status (workflow) | HTTP status codes | Exception handling | DLQ / retry |
| Volume | High (mass load) | Medium | Low-Medium | High |
| Clean Core | Yes (released IDoc types) | Yes (released APIs) | Restricted (not ABAP Cloud) | Yes |
| Monitoring | WE05 / BD87 | API Monitoring (APIM) | SM59 + SM50 | Event Mesh Dashboard |
| EDI support | Yes (ORDERS, INVOIC) | No | No | No |

---

## SAP Cloud Integration (CPI) — iFlow Design Rules

1. **Naming convention:** `<Direction>_<Source>_<Target>_<Object>_<Version>` e.g., `Inbound_SalesForce_S4HANA_Order_v1`
2. **Error handling:** Always add an exception subprocess to every iFlow; write error details to CPI Message Log
3. **Security:** Use CPI Credential Store for all passwords/tokens; never embed credentials in iFlow properties
4. **Logging:** Log correlation ID, source system, target system, object count, and timestamp at minimum
5. **Retry:** Use CPI JMS Queue adapter for guaranteed delivery; configure retry with backoff in queue properties
6. **Testing:** Use CPI built-in tracing (set log level to TRACE) during development; reset to INFO in production
7. **Version control:** Export iFlow packages to Git on every release; use Git-based transport for CPI content

---

## Error Handling Patterns

### Synchronous Errors (OData/REST)

| HTTP Status | Meaning | Client Action |
|------------|---------|--------------|
| 400 Bad Request | Invalid input data | Fix payload; do not retry |
| 401 Unauthorized | Token expired or missing | Refresh OAuth token; retry once |
| 403 Forbidden | Authorization denied | Raise to admin; do not retry |
| 404 Not Found | Object does not exist | Check object key; do not retry |
| 409 Conflict | Duplicate key / lock conflict | Implement idempotency; retry with delay |
| 429 Too Many Requests | Rate limit exceeded | Honour Retry-After header; back off |
| 500 Internal Server Error | SAP backend error | Log, alert, retry with backoff |
| 503 Service Unavailable | System under maintenance | Wait and retry; check maintenance window |

### Asynchronous Errors (IDoc / Event Mesh)

| Error Type | Detection | Recovery |
|-----------|----------|---------|
| IDoc status 51 (Application Error) | WE05 / BD87 monitoring | Correct source data; reprocess via BD87 |
| IDoc status 65 (Created — not sent) | WE05 filter | Resend from WE14 / WE19 |
| Event message not consumed | DLQ alert | Investigate consumer; replay from DLQ |
| Duplicate event received | Check correlation ID in DB | Idempotent handler discards duplicate silently |
| Message schema mismatch | CPI exception log | Schema evolution — negotiate with producer |

---

## API Design for SAP (Consuming and Building)

### Consuming SAP APIs
- Always use CSRF token handling for write operations (OData V2): `GET /sap/opu/odata/sap/API_SERVICE?$top=0` with `x-csrf-token: Fetch` header, then pass token in POST/PATCH
- OData V4: uses CSRF-via-header by default; OAuth 2.0 Bearer token required
- Batch requests: use OData `$batch` to group multiple reads/writes in one HTTP request (reduces round-trips by 70%+)
- System fields: always pass `If-Match: *` or ETag in PATCH/DELETE to avoid optimistic lock failures

### Building Custom APIs on BTP
- Follow SAP API Naming Guidelines (snake_case for JSON properties)
- Implement pagination: `$top`, `$skip`, `$count` for all collection endpoints
- Implement filtering: `$filter` for at least key fields
- Versioning: include version in URL path `/v1/`, `/v2/` — not in header
- Documentation: generate OpenAPI 3.0 spec; publish to SAP API Business Hub or internal catalog

---

## Monitoring Checklist

| Layer | Tool | Key Metrics |
|-------|------|------------|
| IDoc | WE05, BD87, WE07 | IDoc error count, status 51/56/65 rate |
| CPI iFlow | CPI Operations Monitor | Failed messages, processing time, DLQ size |
| RFC | SM59, SM50, SM66 | RFC error rate, blocked work processes |
| API Management | APIM Analytics dashboard | API latency p99, error rate, quota usage |
| Event Mesh | Event Mesh Dashboard (BTP) | Queue backlog, DLQ message count, consumer lag |
| End-to-end | SAP Cloud ALM | Integration monitoring across all channels |

---

## Integration Governance Rules

1. **No point-to-point integrations** — all integrations route through CPI or API Management
2. **Interface inventory** — maintain a registry of all integration scenarios (source, target, object, direction, owner)
3. **Change management** — API contract changes require 30-day deprecation notice to consumers
4. **SLA definition** — every integration has a defined availability (e.g., 99.5%) and latency SLA
5. **Error ownership** — every interface scenario has a named owner responsible for monitoring and resolution
