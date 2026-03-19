---
name: sap-integration-suite
description: Use when working with SAP Integration Suite, Cloud Integration (CPI), API Management, Cloud Connector, or hybrid integration patterns. Provides architecture, patterns, and SAP references.
---

# SAP Integration Suite

Complete reference for SAP Integration Suite — design, build, and operate enterprise integrations.

## Content Routing

| Topic | Jump to |
|---|---|
| Suite overview & capabilities | [Integration Suite Overview](#1-integration-suite-overview) |
| iFlow design, adapters, mapping | [Cloud Integration (CPI)](#2-cloud-integration-cpi) |
| API proxies, policies, portal | [API Management](#3-api-management) |
| On-premise connectivity | [Cloud Connector](#4-cloud-connector) |
| A2A, B2B, hybrid patterns | [Common Integration Patterns](#5-common-integration-patterns) |
| Monitoring, alerts, retry | [Monitoring & Error Handling](#6-monitoring--error-handling) |
| Adapter selection guide | [Adapter Comparison](#adapter-comparison-table) |

---

## 1. Integration Suite Overview

SAP Integration Suite is the unified middleware platform on SAP BTP. It consolidates five capabilities:

| Capability | Purpose | When to use |
|---|---|---|
| **Cloud Integration (CPI)** | Process integration, message orchestration, iFlows | Any system-to-system data exchange |
| **API Management** | Expose, govern, and monetize APIs | External/partner API consumption |
| **Open Connectors** | Pre-built connectors to 170+ non-SAP apps | Salesforce, Slack, ServiceNow, etc. |
| **Integration Advisor** | AI-assisted B2B mapping (EDI, IDoc, cXML) | B2B partner onboarding with EDI/EDIFACT |
| **Event Mesh** | Publish/subscribe event broker | Event-driven architectures, decoupled systems |

Activation: Enable capabilities individually via the Integration Suite launchpad in BTP cockpit.

---

## 2. Cloud Integration (CPI)

### iFlow Design Principles

- **One concern per iFlow** — avoid monolithic flows; split by interface.
- **Externalize configuration** — use externalized parameters for endpoints, credentials, and feature flags.
- **Idempotent design** — assume every message may be delivered more than once.
- **Content Modifier over scripting** — prefer declarative steps; use Groovy only when no standard step exists.

### Adapter Reference

CPI adapters connect to external systems. Choose based on protocol and direction:

| Adapter | Protocol | Direction | Typical use |
|---|---|---|---|
| SOAP | SOAP/XML over HTTP | Send/Receive | SAP ECC web services, third-party SOAP APIs |
| REST (HTTP) | REST/JSON or XML | Send/Receive | Modern cloud APIs, microservices |
| OData | OData v2/v4 | Send | SuccessFactors, S/4HANA Cloud APIs |
| IDoc | IDoc/ALE over RFC | Send/Receive | Classic SAP ECC master data & transactional |
| SFTP | SSH File Transfer | Send/Receive | Batch file exchange with partners |
| AS2 | AS2/MDN | Send/Receive | EDI B2B with trading partners |
| AMQP | AMQP 1.0 | Send/Receive | Event Mesh, RabbitMQ, Azure Service Bus |
| Kafka | Kafka protocol | Send/Receive | Event streaming platforms |
| Mail (SMTP/IMAP) | Email | Send/Receive | Notification emails, mailbox polling |
| SuccessFactors | OData + SF-specific | Send/Receive | Employee Central, Recruiting, etc. |

### Message Mapping

- **Graphical mapping** — drag-and-drop field mapping with standard functions (concat, substring, if-then).
- **XSLT mapping** — for complex XML transformations or when generating non-XML output.
- **Message mapping (Java)** — legacy; avoid in new projects.
- **Groovy script** — full programmatic control; use for JSON-to-JSON or logic-heavy transformations.

### Groovy Script Best Practices

```groovy
// Always access message body and headers via the message object
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def body = message.getBody(String)
    def headers = message.getHeaders()
    def properties = message.getProperties()

    // Transform body
    // ...

    message.setBody(transformedBody)
    return message
}
```

- Keep scripts under 200 lines; extract reusable logic into Script Collections.
- Never hardcode credentials — use Secure Parameter store or credential aliases.
- Log sparingly in production; use `messageLog` for traceability.

---

## 3. API Management

### Core Concepts

- **API Proxy** — facade over a backend API (CPI endpoint, S/4HANA OData, or external).
- **API Provider** — registered backend system (on-premise via Cloud Connector, or cloud).
- **API Product** — bundle of proxies published to the Developer Portal.
- **Developer Portal** — self-service portal where consumers discover, subscribe, and get API keys.

### Key Policies

| Policy | Purpose |
|---|---|
| Verify API Key | Authenticate consumers via API key |
| OAuth v2.0 | Token-based authentication |
| Spike Arrest | Limit requests per second to protect backend |
| Quota | Limit total requests per consumer per time window |
| JSON Threat Protection | Validate JSON payload structure and size |
| Response Cache | Cache backend responses to reduce load |
| Assign Message | Set/modify headers, query params, payload |

### Rate Limiting Strategy

1. **Spike Arrest** at proxy level — protects against bursts (e.g., 10 req/sec).
2. **Quota** per API Product — enforces business tier limits (e.g., 10,000 calls/month for Free tier).
3. **Backend timeout** — set reasonable connect/read timeouts to prevent thread starvation.

---

## 4. Cloud Connector

The Cloud Connector creates a secure TLS tunnel from on-premise to SAP BTP — no inbound firewall ports needed.

### Installation Checklist

1. Install on a dedicated host (Linux preferred) in the DMZ or app server network.
2. Configure HTTPS proxy if outbound traffic requires it.
3. Connect to BTP subaccount using subaccount ID and BTP user credentials.
4. Set up **high availability** — install a shadow instance for failover.

### Access Control

- **Virtual host mapping** — map internal hosts (e.g., `sapserver:44300`) to virtual names exposed to BTP.
- **Restrict resources** — allow only specific URL paths or RFC function modules.
- **Principal propagation** — forward the BTP user identity to the on-premise system (SSO via X.509 or SAML).

### Connectivity Protocols

| Protocol | Use case |
|---|---|
| HTTP/HTTPS | OData, REST, SOAP calls to on-premise |
| RFC | BAPI/RFC calls to SAP ECC/S4 |
| LDAP | Directory lookups (rare) |
| TCP (mail, DB) | SMTP or database tunneling via service channels |

---

## 5. Common Integration Patterns

### Application-to-Application (A2A)

- **Synchronous request-reply** — REST/OData call from S/4HANA to SuccessFactors.
- **Asynchronous fire-and-forget** — IDoc to CPI to third-party; guaranteed delivery via JMS queues.

### Business-to-Business (B2B)

- **EDI over AS2** — EDIFACT/X12 documents with MDN acknowledgments.
- **Use Integration Advisor** to generate MIGs (Message Implementation Guidelines) and MAGs (Mapping Guidelines).

### Hybrid Integration (Cloud + On-Premise)

- BTP app calls on-premise via **Cloud Connector + Destination Service**.
- CPI iFlow reads S/4HANA on-premise data via RFC adapter through Cloud Connector.
- Use **Event Mesh** to decouple: on-premise publishes events, cloud subscribes.

### Real-Time vs. Batch

| Aspect | Real-time | Batch |
|---|---|---|
| Trigger | Event or API call | Schedule (cron) or file arrival |
| Latency | Milliseconds to seconds | Minutes to hours |
| Volume | Single message / small payload | Bulk (thousands of records) |
| Error handling | Immediate retry / error response | Retry entire batch or per-record |
| CPI pattern | Request-reply or async message | SFTP poll + splitter + aggregator |

### Pub/Sub with Event Mesh

1. Define **event topics** using SAP namespace (e.g., `sap/s4/beh/businesspartner/changed/v1`).
2. Create **queue subscriptions** for each consumer.
3. Use **webhook** or **AMQP adapter** in CPI to consume events.

---

## 6. Monitoring & Error Handling

### Message Monitoring

- **Monitor > Message Processing** — view all processed messages with status (Completed, Failed, Retry).
- Filter by integration flow, time range, status, or custom header.
- Use **Trace** log level temporarily for debugging (auto-disables after 10 minutes).

### Alert Rules

- Configure alert rules to notify on failures via email.
- Set alerts on: message failure count, specific iFlow failures, certificate expiry.

### Error Handling Strategy

1. **Exception subprocess** — catch errors within the iFlow, log context, and route to error queue.
2. **Dead letter queue** — persist failed messages in JMS or external store for manual replay.
3. **Retry configuration** — use JMS retry with exponential backoff (e.g., 1 min, 5 min, 30 min).
4. **Alerting** — trigger email or incident on repeated failures.
5. **Idempotent receiver** — deduplicate using message ID or business key to prevent double processing.

### Monitoring Checklist

- [ ] Message monitoring dashboard reviewed daily
- [ ] Alert rules configured for all critical iFlows
- [ ] Certificate expiry monitored (minimum 30-day warning)

---

## Adapter Comparison Table

Use this table to select the right adapter for your scenario:

| Scenario | Recommended Adapter | Reason |
|---|---|---|
| S/4HANA Cloud API consumption | OData | Native protocol for S/4HANA Cloud |
| SAP ECC master data replication | IDoc | Standard ALE distribution; proven and reliable |
| BAPI calls to on-premise SAP | RFC | Direct function module invocation via Cloud Connector |
| Third-party REST API | HTTP (REST) | Lightweight, JSON-native |
| Legacy SOAP web service | SOAP | WSDL-based; handles WS-Security |
| Daily file exchange with partner | SFTP | Scheduled polling; PGP encryption support |
| EDI document exchange | AS2 | Industry-standard B2B with signed MDN |
| Event-driven from Event Mesh | AMQP | Native AMQP 1.0 support for queue consumption |
| High-throughput event streaming | Kafka | Offset-based consumption, replay capability |
| Email notifications from iFlow | Mail (SMTP) | Simple outbound notification |

---

## SAP References

### SAP Help Portal

- [SAP Integration Suite — Official Documentation](https://help.sap.com/docs/integration-suite)
- [Cloud Integration — Development Guidelines](https://help.sap.com/docs/cloud-integration/sap-cloud-integration/development-guidelines)

### SAP Notes

- **SAP Note 2171809** — [Cloud Connector: Sizing and Performance Guidelines](https://me.sap.com/notes/2171809)
- **SAP Note 2348491** — [SAP Cloud Integration: Adapter Tracing and Troubleshooting](https://me.sap.com/notes/2348491)
- **SAP Note 3088099** — [Integration Suite: Tenant Migration and Backup Recommendations](https://me.sap.com/notes/3088099)
