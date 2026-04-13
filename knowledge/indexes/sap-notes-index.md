# SAP Notes Index — Critical Notes Reference

**Last Updated:** 2026-04-12
**Applies To:** ECC 6.0, S/4HANA 1809–2023, SAP BTP, SAP Basis 7.40+
**Referenced By:** skills/troubleshooting, skills/s4hana-migration, skills/system-admin, skills/security-grc

## Content Routing

| Category | Section |
|----------|---------|
| S/4HANA Migration & Readiness | Lines ~45–75 |
| SAP Fiori & UX | Lines ~75–100 |
| ABAP & Development | Lines ~100–125 |
| FI — Financial Accounting | Lines ~125–145 |
| MM — Materials Management | Lines ~145–165 |
| SD — Sales & Distribution | Lines ~165–180 |
| PP — Production Planning | Lines ~180–195 |
| Basis & System Administration | Lines ~195–220 |
| Security & Authorization | Lines ~220–240 |
| SAP BTP & Integration | Lines ~240–265 |

---

## Quick Reference — Must-Apply Notes

| Note Number | Title | Priority |
|-------------|-------|---------|
| 2399707 | SAP S/4HANA Readiness Check | Critical — run before migration |
| 2668288 | Central Note for S/4HANA Migration | Critical — always check before SUM |
| 2380176 | S/4HANA Simplification List | Critical — mandatory review |
| 2186106 | Pre-requisites for S/4HANA Migration | Critical — apply early |
| 1648418 | Performance Optimization for ABAP on HANA | High — apply pre-production |
| 3031956 | Central Note for SAP BTP ABAP Environment | High — BTP projects |
| 2270221 | FAQ: SAP Fiori Frontend Server | High — Fiori setup |

---

## Full Reference

### S/4HANA Migration & Readiness

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2399707 | SAP S/4HANA Readiness Check Tool | Migration | Cross | Run via transaction READINESS_CHECK before migration planning — identifies custom code risks, simplification items, and missing pre-requisites |
| 2668288 | Central Note for S/4HANA Migration | Migration | Cross | Master note for migration to S/4HANA — links all sub-notes, SUM guides, and known issues; always review before Software Update Manager (SUM) run |
| 2380176 | S/4HANA Simplification List | Migration | Cross | Authoritative list of all simplification items (database table changes, removed fields, mandatory new functions); updated each release |
| 2186106 | Pre-requisites for S/4HANA Migration | Migration | Cross | Mandatory pre-requisites: SP levels, Unicode conversion, open items clearing; must be resolved before migration start |
| 2364210 | S/4HANA: Simplification of Material Ledger | Migration | CO/ML | Material Ledger activation becomes mandatory in S/4HANA 1610+; this note explains data migration steps and costing implications |
| 2338688 | SAP S/4HANA: Central Finance — Initial Load | Migration | FI | Setup and known issues for Central Finance initial data load; covers data replication framework and reconciliation |
| 2534845 | SAP S/4HANA — Conversion of Open Items | Migration | FI | Procedure for clearing open items in A/R, A/P, and G/L as part of system conversion; addresses archiving pre-requisites |
| 2715594 | S/4HANA Migration Cockpit — Central Note | Migration | Cross | Central note for SAP Migration Cockpit tool (transaction LTMC/LTMOM); covers supported scenarios and known issues |
| 2500512 | Custom Code Migration: Adaptation Objects | Migration | Dev | Classification of custom code objects in ABAP for S/4HANA migration; covers ATC check exemptions and adaptation priorities |
| 2183624 | Simplification — Sales and Distribution | Migration | SD | SD-specific simplification items: credit management changes, document flow, and removed BAPIs |
| 2270165 | S/4HANA: Business Partner Migration | Migration | FI/SD | Mandatory migration from customer (KNA1) and vendor (LFA1) to Business Partner (BUT000); covers FLCU01 migration transaction |

### SAP Fiori & UX

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2313884 | SAP Fiori Apps Reference Library — Overview | Fiori | Cross | Master note for the Fiori Apps Library (apps.sap.com/fiori); covers search, filtering, and implementation guide links |
| 2270221 | FAQ: SAP Fiori Frontend Server (FES) | Fiori | Basis | Common issues with Fiori Frontend Server setup including HTTPS, ICF services, and Launchpad configuration |
| 2382217 | SAP Fiori for SAP S/4HANA — Central Note | Fiori | Cross | Central note for Fiori in S/4HANA — covers catalog assignments, required roles, and activation via /UI2/FLP_CHECK_CUSTOMIZING |
| 2484285 | SAP Fiori — Launchpad Designer Usage | Fiori | Basis | How to use the Fiori Launchpad Designer to create spaces, pages, and tile assignments; replaces Classic Launchpad config |
| 2612429 | SAP Fiori: Sizing for Frontend Server | Fiori | Basis | Sizing guidelines for Frontend Server based on number of users, tile calls, and caching requirements |
| 2745566 | SAP Fiori Elements — Central Note | Fiori | Dev | Central note for SAP Fiori Elements (list report, object page, analytical list page); covers annotations and known issues |
| 2729185 | SAP S/4HANA: Activate Fiori Apps — Minimal Setup | Fiori | Basis | Step-by-step minimal activation of Fiori apps on S/4HANA On-Premise using SPRO |

### ABAP & Development

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 1648418 | Performance Optimization for ABAP Programs | Performance | Dev | Core ABAP performance rules on HANA: avoid SELECT *, use CDS views over SELECT with joins, minimize roundtrips; apply before go-live |
| 2193554 | ABAP Test Cockpit (ATC) — Central Note | Dev | Dev | Setup and usage of ATC; mandatory check configuration for custom code quality gates |
| 2570689 | ABAP CDS Views — Known Issues and Corrections | Dev | Dev | Cumulative corrections for CDS view syntax and activation errors; apply when CDS views fail to activate |
| 2591719 | ABAP Core Data Services — Release Annotations | Dev | Dev | Documents @AbapCatalog.sqlViewName, @AccessControl.authorizationCheck, and @C1/C2 release contract annotations |
| 2502552 | OData Version 4 — SAP Gateway: Central Note | Dev | Dev | Setup of OData V4 services on SAP Gateway; required for Fiori Elements V4 applications |
| 2908309 | ABAP Cloud — Tier 1/2/3 Classification | Dev | Dev | Documents ABAP Cloud development model tiers and which APIs are permitted in each tier |
| 3007771 | RAP — ABAP RESTful Application Programming Model | Dev | Dev | Central note for RAP; covers known issues with managed and unmanaged scenarios, draft handling, and action implementations |

### FI — Financial Accounting

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2220005 | New Asset Accounting — Central Note (S/4HANA) | Functionality | FI-AA | Mandatory activation of new Asset Accounting in S/4HANA; deprecation simulation, parallel ledgers, and migration steps |
| 2270170 | ACDOCA — Universal Journal Entry in S/4HANA | Functionality | FI | Documents ACDOCA table structure, posting logic, and reconciliation with CO; replaces BSEG/FAGLFLEXA split |
| 2286106 | S/4HANA Finance: Closing Operations | Functionality | FI | Month-end and year-end closing procedure changes in S/4HANA Finance; covers FAGLGVTR, asset fiscal year change |
| 2349361 | Foreign Currency Valuation in S/4HANA | Functionality | FI | Covers FAGL_FCV program behavior change in S/4HANA; new valuation approaches and parallel ledger handling |
| 2523409 | Advanced Payment Management — Central Note | Functionality | FI | Setup and known issues for Advanced Payment Management (in-app payment proposals, bank communication management) |

### MM — Materials Management

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2344012 | Inventory Management in S/4HANA — Central Note | Functionality | MM | Documents MATDOC table replacing MKPF/MSEG; impact on custom reports and BAdI implementations using old tables |
| 2395066 | Purchasing in S/4HANA — Simplification | Functionality | MM | Covers removal of classic purchasing transactions; mandatory Business Partner for vendor, new purchasing apps |
| 2415173 | Batch Management Simplification in S/4HANA | Functionality | MM | Simplified batch classification; changes to MSC1N/MSC2N and impact on WM integration |
| 2476838 | Material Ledger Mandatory Activation | Functionality | CO/MM | Details on mandatory ML activation for all plants in S/4HANA; retroactive cost adjustment and costing run changes |

### SD — Sales & Distribution

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2204079 | Integrated Credit Management in S/4HANA | Functionality | SD/FI | Credit management moves from FD32/OVA8 to SAP Credit Management (FIN-FSCM-CR); impacts credit check at sales order |
| 2336119 | Advanced Available-to-Promise (aATP) | Functionality | SD/PP | aATP replaces classic ATP in S/4HANA; product allocation, backorder processing, and confirmation logic changes |
| 2434711 | Output Management in S/4HANA SD | Functionality | SD | New output management framework replaces NACE for SD output (order confirmations, delivery notes); BRF+ rules required |
| 2533923 | SD Billing — Simplification in S/4HANA | Functionality | SD | Changes to VF01/VF04 and billing due list; impact of ACDOCA integration on revenue recognition |

### PP — Production Planning

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2232584 | MRP in S/4HANA — Central Note (pMRP) | Functionality | PP | Predictive MRP (pMRP) replaces classic MRP run; MD01N cockpit, parallel processing, and segmentation |
| 2491281 | PP/DS Embedded in S/4HANA | Functionality | PP | Embedded PP/DS (formerly APO-PP/DS) available natively; activation, integration model, and known issues |
| 2524480 | Kanban in S/4HANA — Simplifications | Functionality | PP | Changes to PKMC Kanban board; Fiori-based Kanban apps and classic transaction status |

### Basis & System Administration

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 2186580 | HANA Database Administration — Best Practices | Administration | Basis | HANA memory sizing, delta merge triggers, persistence layer config; mandatory read for HANA DBA |
| 2321295 | SAP System Landscape Directory (SLD) — Errors | Administration | Basis | Common SLD connection errors and resolution steps; relevant for SolMan and PI/PO connectivity |
| 2467813 | Software Update Manager (SUM) 2.0 — Central Note | Administration | Basis | Central note for SUM 2.0 tool; update procedure, downtime minimisation (DMO), and known issues |
| 2523091 | SAP Solution Manager 7.2 — Support Pack Stack | Administration | Basis | SP stack release note for SolMan 7.2; always apply before upgrade projects |
| 2694677 | SAP Host Agent — Installation and Update | Administration | Basis | Host Agent deployment for HANA and ABAP instances; required for SAPControl and monitoring integration |
| 2932770 | SAP Kernel 7.77/7.89 — Central Release Note | Administration | Basis | Kernel patch release note; review before patching to identify critical fixes and incompatibilities |
| 1984787 | System Copy Guide for SAP HANA Database | Administration | Basis | Procedure for homogeneous and heterogeneous system copies; relevant for refresh of QA/DEV from production |

### Security & Authorization

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 1706400 | Security Parameter Recommendations | Security | Basis | Recommended login/* and rdisp/* profile parameters; apply to all SAP systems (login/fails_to_user_lock, etc.) |
| 2159710 | RFC Security — Unified Connectivity (UCON) | Security | Basis | UCON framework for RFC function module access control; mandatory for SAP Security Baseline compliance |
| 2622660 | SAP Security Baseline Template 1.0 | Security | Cross | SAP's official security baseline — 68 controls; reference for audit and penetration testing remediation |
| 2080475 | Privilege Escalation via RFC — SAP*  | Security | Basis | Critical: SAP* user re-creation risk; mandatory fix for all systems — set login/no_automatic_user_sapstar = 1 |
| 2084023 | Security Audit Log (SAL) — Configuration | Security | Basis | SAL configuration via SM19; recommended event classes and filter profiles for compliance audit trails |
| 2295839 | SoD Conflict — Critical Authorization Combinations | Security | Security | Documents high-risk SoD conflicts involving PFCG, SU01, and debugging authorizations; used in GRC ruleset design |
| 2407616 | HANA Database User Security — Hardening | Security | Basis | HANA user privilege minimization, system privilege restrictions, and analytic privilege design |

### SAP BTP & Integration

| Note Number | Title | Category | Module | Relevance |
|-------------|-------|----------|--------|-----------|
| 3031956 | Central Note for SAP BTP ABAP Environment | BTP | Dev | Master note for BTP ABAP Environment (Steampunk); covers known issues, supported APIs, and feature list by release |
| 2985209 | SAP Integration Suite — Cloud Integration Central | BTP | Integration | Central note for Cloud Integration (CPI); known issues with adapter configurations and message processing |
| 3099267 | SAP Event Mesh — Setup and Configuration | BTP | Integration | Setup of SAP Event Mesh on BTP; topic namespaces, queue configuration, and AMQP/HTTP binding |
| 2875188 | SAP API Business Hub — OData API Publishing | BTP | Dev | How to publish and consume SAP APIs from API Business Hub; authentication, rate limiting, and sandbox usage |
| 3159295 | SAP BTP Connectivity — Cloud Connector Setup | BTP | Basis | Cloud Connector installation, SCC tunnel setup, and troubleshooting HTTPS connectivity from BTP to on-premise |

---

## Version Applicability Notes

| Note Range | Guidance |
|------------|---------|
| Notes below 1000000 | Usually apply to legacy SAP R/3 or early ECC; verify validity for your release before applying |
| Notes 1000000–2000000 | Primarily ECC 6.0 era; many still apply to S/4HANA On-Premise in compatibility mode |
| Notes 2000000–3000000 | S/4HANA, Fiori, HANA DB era; highest applicability to current implementations |
| Notes 3000000+ | BTP, S/4HANA Cloud Public Edition, and latest on-premise releases |
| Always check | Correction Instructions (CIs) vs. Manual Instructions — apply in correct sequence |

---

## How to Find and Apply Notes

1. **SAP ONE Support Launchpad** — support.sap.com; search by note number or keyword
2. **SNOTE transaction** — apply notes directly from within SAP (requires internet connectivity or manual download)
3. **Note Priority** — HotNews > Very High > High > Medium; automate HotNews application in maintenance windows
4. **Validity check** — always verify against your exact SAP release (e.g., S/4HANA 2022 FPS02) before applying
5. **Pre-requisite notes** — SNOTE resolves dependencies automatically; manual application requires manual ordering
