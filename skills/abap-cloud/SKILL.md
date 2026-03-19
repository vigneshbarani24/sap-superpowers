---
name: abap-cloud
description: Use when working with ABAP Cloud, clean core, RAP, CDS views, or checking released API compatibility. Provides tier model, key patterns, and SAP Notes.
---

# ABAP Cloud Reference Skill

## Content Routing

| Topic                        | Section                          |
|------------------------------|----------------------------------|
| Cloud-ready ABAP development | ABAP Cloud Tier Model            |
| Clean core strategy          | Clean Core Principles            |
| Checking API compatibility   | Released API Patterns            |
| RAP-based development        | RAP Overview                     |
| CDS modeling patterns        | CDS View Patterns                |
| Useful transactions          | Key Transaction Codes            |
| Official documentation       | SAP Help Portal Links & SAP Notes|

---

## ABAP Cloud Tier Model

ABAP Cloud uses a three-tier compatibility model that governs which APIs and language features are permitted.

### Tier 1 -- ABAP Cloud (Strict)

- **Scope**: Only released SAP APIs and objects with status **Released** (C1 contract).
- **Target**: SAP BTP ABAP Environment, S/4HANA Public Cloud.
- **Rules**: No classic dynpros, no direct DB access via EXEC SQL, no unreleased function modules.
- **Language version**: ABAP for Cloud Development (set in object properties).
- **Benefit**: Full forward compatibility across upgrades and cloud migration.

### Tier 2 -- ABAP Cloud (Stable)

- **Scope**: Released APIs plus deprecated-but-stable APIs (C2 contract).
- **Target**: S/4HANA Private Cloud, transitional scenarios.
- **Rules**: Deprecated APIs trigger warnings but compile. Useful during migration from classic to Tier 1.
- **Guidance**: Treat Tier 2 as a stepping stone; plan replacement of deprecated calls.

### Tier 3 -- Classic ABAP

- **Scope**: Full ABAP language, all APIs (released and unreleased).
- **Target**: On-premise SAP ECC / S/4HANA with no cloud migration requirement.
- **Rules**: No restrictions, but custom code may break on upgrade.
- **Risk**: Unreleased APIs can change or disappear without notice in any support package.

> **Rule of thumb**: Always target Tier 1 for new development. Fall back to Tier 2 only when a released replacement does not yet exist.

---

## Clean Core Principles

Clean core is SAP's strategy for keeping the S/4HANA core modification-free so upgrades remain non-disruptive.

1. **Extend, don't modify** -- Never modify SAP standard objects. Use extension points (BAdIs, RAP side-effects, key-user apps).
2. **Use released APIs only** -- Consume objects carrying the C1 release contract. This ensures SAP maintains backward compatibility.
3. **Key-user extensibility** -- Empower business users to create custom fields, custom logic (BRF+), and custom CDS views through Fiori-based tooling without developer involvement.
4. **Developer extensibility** -- For complex needs, use ABAP Cloud (Tier 1) with RAP, CDS, and service bindings.
5. **Side-by-side extensions** -- Move heavy custom logic to SAP BTP (CAP, Integration Suite) and call S/4HANA via released OData/SOAP APIs.
6. **Lifecycle stability** -- Released APIs follow a deprecation policy: SAP announces deprecation at least 12 months before removal, giving time to migrate.

---

## Released API Patterns

### How to Check if an API is Released

1. **ABAP Development Tools (ADT)**: Open the object in Eclipse. The **Properties > API State** tab shows the release contract (C1 Released, C1 Deprecated, Not Released).
2. **Released Object List**: In ADT, use the search with filter `api:USE_IN_CLOUD_DEVELOPMENT` to find all Tier 1-eligible objects.
3. **ABAP Test Cockpit (ATC)**: Run ATC checks with the **ABAP Cloud Readiness** check variant. Violations flag unreleased API usage.
4. **Custom Code Migration App** (Fiori): Analyses existing custom code for cloud readiness, maps unreleased calls to released successors.
5. **API Release State in Code**: The annotation `@EndUserText.label` does not indicate release; look for the `IF_RELEASE_STATE` interface or the ADT property.

### Common Released API Categories

| Category               | Example Released Object                        |
|------------------------|------------------------------------------------|
| Business Partner       | `I_BusinessPartner` (CDS), `API_BUSINESS_PARTNER` (OData) |
| Material               | `I_Product` (CDS), `API_PRODUCT_2` (OData)     |
| Sales Order            | `I_SalesOrder` (CDS), `API_SALES_ORDER` (OData)|
| Purchase Order         | `I_PurchaseOrder` (CDS)                        |
| Flight Reference Model | `R_TravelTP`, `/DMO/` objects (RAP samples)    |

---

## RAP Overview

The **ABAP RESTful Application Programming Model (RAP)** is SAP's strategic model for building transactional Fiori apps and APIs on S/4HANA and BTP.

### Architecture Layers

```
Service Binding  (exposes OData V2/V4 or InA)
      |
Service Definition  (selects projections to expose)
      |
Projection View / Projection Behavior  (UI-specific, consumption layer)
      |
Interface CDS View + Behavior Definition  (reusable BO layer)
      |
Database Table / CDS Entity
```

### Key Concepts

- **Entity Behavior Definition (BDef)**: Declares CRUD operations, actions, validations, determinations, and draft handling for a business object.
- **Behavior Implementation (BIL)**: ABAP class implementing the handler and saver methods declared in the BDef.
- **Projections**: Thin CDS views and behavior projections that tailor a base BO for a specific UI or API consumer.
- **Service Binding**: Binds a service definition to a protocol (OData V2, V4, or SQL/InA) and makes it available on a specific path.
- **Draft Handling**: Built-in draft persistence (`with draft`) allows users to save incomplete documents. RAP manages the draft table, activation, and locking.
- **Managed vs Unmanaged**: Managed scenario lets the RAP framework handle DB operations; unmanaged gives full control to the developer.
- **Actions**: Instance-bound or static operations beyond CRUD (e.g., `approve`, `reject`). Can be factory actions to create new entities.
- **Validations & Determinations**: Validations enforce business rules on save; determinations auto-fill fields on trigger conditions.

---

## CDS View Patterns

### Basic (Interface) Views -- Prefix `I_`

- Direct projection on DB tables.
- Reusable across multiple consumption views.
- Carry associations, key annotations, and foreign-key relationships.

### Composite Views -- Prefix `I_`

- Join or union of multiple basic views.
- Contain calculated fields, aggregations, or complex associations.
- Still part of the interface layer; no UI annotations.

### Consumption Views -- Prefix `C_`

- Built on top of interface views.
- Include `@UI`, `@Search`, `@Consumption.filter` annotations for Fiori Elements.
- One consumption view per app/use case.

### Transactional (RAP) Views -- Prefix `R_` or `I_`

- Root and child entities for a RAP business object.
- Paired with a behavior definition.
- Often suffixed with `TP` (transactional processing), e.g., `R_TravelTP`.

### Key CDS Annotations

| Annotation                          | Purpose                              |
|-------------------------------------|--------------------------------------|
| `@AbapCatalog.viewEnhancementCategory` | Controls view extensibility       |
| `@AccessControl.authorizationCheck` | Enables DCL-based authorization      |
| `@ObjectModel.semanticKey`          | Defines the human-readable key       |
| `@UI.lineItem` / `@UI.fieldGroup`  | Fiori Elements list and form layout  |
| `@Consumption.valueHelpDefinition`  | Attaches value help to a field       |

---

## Key Transaction Codes

| TCode / Tool              | Purpose                                          |
|---------------------------|--------------------------------------------------|
| **ADT (Eclipse)**         | Primary IDE for ABAP Cloud development           |
| **SE80**                  | Classic ABAP Workbench (Tier 3 only)             |
| **SE38**                  | ABAP Editor for reports (Tier 3 only)            |
| **/IWFND/MAINT_SERVICE**  | Activate & maintain OData services on front-end  |
| **/IWBEP/V4_ADMIN**       | OData V4 service administration                  |
| **SAPC** (Fiori)          | Custom Code Migration app                        |
| **ATC**                   | ABAP Test Cockpit -- run cloud readiness checks  |
| **SICF**                  | HTTP service activation (ICF tree)               |
| **SCI**                   | Code Inspector -- define check variants           |
| **/n/UI2/FLP**            | Fiori Launchpad configuration                    |

---

## SAP Help Portal Links

1. **ABAP Cloud -- Development Model**: <https://help.sap.com/docs/abap-cloud/abap-development-model>
2. **ABAP RESTful Application Programming Model (RAP)**: <https://help.sap.com/docs/btp/sap-abap-restful-application-programming-model>
3. **CDS View Reference**: <https://help.sap.com/docs/abap-cloud/abap-cds-tools>
4. **Released Objects for ABAP Cloud**: <https://help.sap.com/docs/abap-cloud/abap-released-objects>

---

## Relevant SAP Notes

| SAP Note   | Title                                                       | Relevance                                      |
|------------|-------------------------------------------------------------|------------------------------------------------|
| **2803646** | Custom Code Migration -- Simplification Database            | Lists unreleased-to-released API mappings for migration to S/4HANA and ABAP Cloud. |
| **3375980** | ABAP Cloud -- Development Guidelines and Recommendations   | Official guidelines for Tier 1 development, naming conventions, and ATC usage.       |
| **2872574** | Released APIs for ABAP Cloud Development                    | Master list of released APIs available for cloud-ready custom code.                  |
| **3344425** | RAP -- Known Issues and Corrections                         | Collects RAP framework fixes; check before reporting new RAP defects.                |

---

## Quick Decision Guide

```
New custom development?
  |
  +-- Can it be done with Key-User Extensibility? --> Yes --> Use Fiori Custom Fields / BRF+
  |
  +-- No --> Is a released API available? --> Yes --> Build with RAP (Tier 1)
  |
  +-- No released API? --> Check SAP Note 2872574 for alternatives
  |         |
  |         +-- Alternative exists --> Use it (Tier 1)
  |         +-- No alternative yet --> Use Tier 2 wrapper + open SAP influence request
  |
  +-- Must use unreleased API --> Document risk, isolate in wrapper class, plan migration
```
