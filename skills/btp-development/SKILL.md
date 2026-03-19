---
name: btp-development
description: Use when developing on SAP Business Technology Platform — CAP, Fiori Elements, SAP Build, Cloud Foundry, Kyma, or BTP architecture. Provides patterns, tools, and SAP references.
---

# SAP BTP Development Reference

Comprehensive guide for building, deploying, and operating applications on SAP Business Technology Platform.

## Content Routing

| Topic | Section |
|-------|---------|
| Global accounts, subaccounts, entitlements | [BTP Architecture](#btp-architecture) |
| CAP Node.js / Java, CDS, services | [CAP Overview](#cap-cloud-application-programming-model) |
| List report, object page, annotations | [Fiori Elements](#fiori-elements) |
| Low-code, process automation, Work Zone | [SAP Build](#sap-build) |
| BAS, VS Code, ADT | [Development Tools](#development-tools) |
| MTA, cf deploy, approuter, destinations | [Deployment Patterns](#deployment-patterns) |
| cf, cds, mbt CLI commands | [Key CLI Commands](#key-cli-commands) |

---

## 1. BTP Architecture

### Hierarchy

```
Global Account
 ├── Directory (optional grouping)
 │    ├── Subaccount A  (Cloud Foundry environment)
 │    └── Subaccount B  (Kyma environment)
 └── Subaccount C       (Cloud Foundry environment)
```

- **Global Account** — top-level contract entity; holds commercial entitlements.
- **Directories** — optional grouping of subaccounts for management and cost tracking.
- **Subaccounts** — isolation boundary for environments, security, and subscriptions.
- **Entitlements** — service plans assigned from global account to subaccounts via quotas.

### Cloud Foundry vs Kyma

| Aspect | Cloud Foundry | Kyma |
|--------|--------------|------|
| Unit of deployment | Application (buildpack / Docker) | Container / Pod (Kubernetes) |
| Scaling | `cf scale` (instances) | Horizontal Pod Autoscaler |
| Service binding | `cf bind-service` → VCAP_SERVICES | BTP Service Operator → K8s Secrets |
| Best for | CAP apps, standard Fiori | Microservices, event-driven, sidecars |
| CLI | `cf` | `kubectl` + `kyma` |

> **Guideline:** Default to Cloud Foundry for CAP-based projects. Choose Kyma when you need full container control, custom sidecars, or Kubernetes-native tooling.

---

## 2. CAP (Cloud Application Programming Model)

CAP is SAP's recommended framework for building enterprise-grade services and applications on BTP.

### Runtimes

- **Node.js** (`@sap/cds`) — faster iteration, lighter footprint.
- **Java** (`com.sap.cds:cds-services-api`) — enterprise features, Spring Boot integration.

### CDS Modeling

```cds
namespace bookshop;

entity Books {
  key ID    : UUID;
  title     : String(200);
  author    : Association to Authors;
  stock     : Integer;
}

entity Authors {
  key ID    : UUID;
  name      : String(100);
  books     : Association to many Books on books.author = $self;
}

service CatalogService {
  @readonly entity ListOfBooks as projection on Books;
}
```

### Key Concepts

| Concept | Purpose |
|---------|---------|
| **Services** | Define APIs (OData V4/V2, REST, GraphQL via plugin) |
| **Persistence** | HANA, SQLite (dev), PostgreSQL; auto-generated DDL |
| **Events / Messaging** | SAP Event Mesh, Redis, file-based (dev) |
| **Authentication** | XSUAA / IAS via `@requires` annotations |
| **Multitenancy** | MTX sidecar for SaaS tenant lifecycle |
| **Remote Services** | Consume external OData / REST with `cds.connect.to()` |

### CAP Project Structure

```
project-root/
 ├── app/          # UI (Fiori Elements / freestyle)
 ├── db/           # CDS domain models & data
 ├── srv/          # Service definitions & handlers
 ├── mta.yaml      # MTA deployment descriptor
 └── package.json  # Dependencies & cds config
```

---

## 3. Fiori Elements

Annotation-driven UI framework — minimal frontend code, maximum SAP standard compliance.

### Floorplans

| Floorplan | Use Case | Key Annotation |
|-----------|----------|----------------|
| **List Report** | Search and filter entity sets | `UI.LineItem` |
| **Object Page** | Detailed view / edit of a single entity | `UI.FieldGroup`, `UI.Facets` |
| **Overview Page** | KPI cards, quick filters, navigation | `UI.DataPoint`, `UI.Chart` |
| **Analytical List Page** | Charts + table with visual filters | `UI.Chart`, `UI.PresentationVariant` |
| **Worklist** | Simplified task list without filter bar | `UI.LineItem` (no `UI.SelectionFields`) |

### Annotation Example (CDS)

```cds
annotate CatalogService.ListOfBooks with @(
  UI.LineItem: [
    { Value: title, Label: 'Title' },
    { Value: author.name, Label: 'Author' },
    { Value: stock, Label: 'In Stock' }
  ],
  UI.SelectionFields: [ title, author_ID ]
);
```

> **Tip:** Use the Fiori Elements flexible programming model for custom sections, custom columns, and controller extensions when annotations are insufficient.

---

## 4. SAP Build

### SAP Build Apps (formerly AppGyver)

- Visual drag-and-drop for business apps (web & mobile).
- Connects to BTP destinations, OData, REST.
- Use for citizen-developer scenarios and rapid prototyping.

### SAP Build Process Automation

- Automate workflows and decisions (replaces SAP Workflow + iRPA).
- Trigger via API, events, or schedule.
- Decision tables for business rules; bot execution for RPA tasks.

### SAP Build Work Zone

- **Standard Edition** — Launchpad service: central entry point for Fiori apps, static / dynamic tiles.
- **Advanced Edition** — adds workspaces, content federation, UI integration cards.

---

## 5. Development Tools

| Tool | When to Use |
|------|-------------|
| **SAP Business Application Studio (BAS)** | Primary cloud IDE; built-in CAP, Fiori, HANA dev spaces |
| **VS Code + SAP extensions** | Local development; install `SAP CDS Language Support`, `SAP Fiori tools` |
| **ABAP Development Tools (ADT)** | ABAP Cloud / on-prem ABAP in Eclipse |
| **SAP HANA Database Explorer** | Ad-hoc SQL, HDI container inspection |
| **Cloud Connector** | Secure tunnel from BTP to on-premise systems |

### Recommended VS Code Extensions

- `SAPOSS.sap-cds-language-support` — CDS syntax, code completion, diagnostics.
- `SAPSE.sap-ux-fiori-tools-extension-pack` — Fiori Elements page map, guided development.
- `SAPOSS.app-studio-toolkit` — BAS-like experience in VS Code.

---

## 6. Deployment Patterns

### MTA (Multi-Target Application)

Standard packaging for BTP Cloud Foundry. One `mta.yaml` describes all modules (apps, services) and resources (service instances). Build with `mbt build`, deploy with `cf deploy`.

### Approuter

- Single entry point for multi-module apps; handles XSUAA auth redirects and route mapping.
- Configure routes in `xs-app.json`.

### Destinations

- Defined at subaccount or service-instance level; abstract backend URLs.
- Support principal propagation, OAuth2, basic auth.
- Access via `@sap-cloud-sdk/connectivity` or destination service REST API.

---

## Key CLI Commands

| Command | Purpose |
|---------|---------|
| `cf login -a <api-endpoint>` | Authenticate to Cloud Foundry |
| `cf push` | Deploy app using manifest |
| `cf deploy <mtar>` | Deploy MTA archive |
| `cf logs <app> --recent` | View recent application logs |
| `cf env <app>` | Show environment variables (VCAP_SERVICES) |
| `cf create-service <svc> <plan> <inst>` | Provision a service instance |
| `cf bind-service <app> <inst>` | Bind service to application |
| `cds init <project>` | Scaffold a new CAP project |
| `cds watch` | Run locally with live reload |
| `cds build` | Build for production |
| `cds deploy --to hana` | Deploy DB artifacts to HANA HDI |
| `cds add hana,xsuaa,mta` | Add BTP features to project |
| `cds bind -2 <service-instance>` | Bind to remote service for hybrid testing |
| `mbt build` | Build MTA archive (.mtar) |
| `mbt build -p=cf -t=gen/` | Build MTA for CF target |

---

## SAP References

### SAP Help Portal / SAP Developers

- [SAP CAP Documentation](https://cap.cloud.sap/docs/) — authoritative reference for CDS, services, deployment, and best practices.
- [SAP BTP Developer Guide](https://help.sap.com/docs/btp/btp-developer-guide/btp-developer-guide) — end-to-end guidance for developing on BTP.
- [SAP Fiori Elements Feature Map](https://sapui5.hana.ondemand.com/test-resources/sap/fe/core/fpmExplorer/index.html) — live examples of all Fiori Elements floorplans and building blocks.

### SAP Notes

- **SAP Note 3247839** — CAP Node.js: recommended versions, known issues, and patch guidance for `@sap/cds` runtime.
- **SAP Note 3038439** — SAP BTP Cloud Foundry environment: buildpack versions, supported runtimes, and end-of-support dates.
- **SAP Note 1928533** — General BTP prerequisites: supported browsers, network configuration, and system requirements.

---

## Quick Decision Guide

```
Need to build an app on BTP?
  ├── Full-stack / enterprise logic  →  CAP + Fiori Elements
  ├── Citizen developer / rapid UI   →  SAP Build Apps
  ├── Process / workflow automation   →  SAP Build Process Automation
  └── Central app launchpad          →  SAP Build Work Zone
```
