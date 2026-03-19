---
name: rise-licensing
description: Use when evaluating RISE with SAP, GROW with SAP, HUoM licensing, SAPS sizing, BTP credits, or SAP contract structures. Provides licensing models, comparison tables, and commercial guidance.
---

# RISE with SAP / Licensing Reference

Commercial and licensing reference for RISE with SAP, GROW with SAP, and related SAP licensing models.

## Content Routing

| Topic | Section |
|-------|---------|
| RISE bundle, S/4HANA Cloud Private | [RISE with SAP Overview](#1-rise-with-sap-overview) |
| GROW bundle, S/4HANA Cloud Public | [GROW with SAP Overview](#2-grow-with-sap-overview) |
| RISE vs GROW selection | [RISE vs GROW Comparison](#3-rise-vs-grow-comparison) |
| HUoM, FUE, SAPS, CPEA metrics | [Licensing Models](#4-licensing-models) |
| BTP consumption, credit types | [BTP Credits Model](#5-btp-credits-model) |
| Subscription terms, hyperscaler choice | [Contract Structure](#6-contract-structure) |
| T-shirt sizing, reference architectures | [Common Sizing Patterns](#7-common-sizing-patterns) |
| When to pick RISE vs GROW | [Decision Matrix](#rise-vs-grow-decision-matrix) |

---

## 1. RISE with SAP Overview

RISE with SAP is a **business-transformation-as-a-service** offering. It bundles multiple components under a single subscription:

- **S/4HANA Cloud, Private Edition** — dedicated tenant with full customization capability (custom code, modifications, enhancements via BAdIs).
- **SAP Business Technology Platform (BTP)** — includes a base allocation of CPEA credits for integration, extension, analytics, and AI services.
- **SAP Business Network Starter Pack** — access to Ariba Network, Logistics Business Network, or Asset Intelligence Network.
- **SAP Business Process Intelligence** — process mining and analysis tools (Signavio).
- **SAP Application Lifecycle Management (ALM)** — Cloud ALM for implementation, monitoring, and operations.
- **Infrastructure** — managed hosting on customer's choice of hyperscaler (AWS, Azure, GCP).

### Key Characteristics

- Subscription-based (typically 3-5 year terms).
- SAP manages infrastructure, technical upgrades, and platform operations.
- Customer retains control over functional configuration and custom code.
- Migration support included (tools, methodology, and SAP-led conversion services).
- Fits organizations with complex, highly customized SAP landscapes.

---

## 2. GROW with SAP Overview

GROW with SAP targets **midmarket and new SAP customers** seeking rapid, standardized cloud adoption:

- **S/4HANA Cloud, Public Edition** — multi-tenant SaaS with quarterly automatic updates.
- **Pre-configured best practices** — SAP-delivered industry and line-of-business processes ready to activate.
- **SAP BTP base entitlements** — starter allocation of BTP services for lightweight extensions.
- **SAP Business Network** — starter access similar to RISE.
- **Community and learning** — SAP Learning Hub, community resources, guided onboarding.

### Key Characteristics

- Lower entry cost; consumption/subscription pricing.
- No custom ABAP code in the core — extensibility via BTP side-by-side or key-user tools only.
- Automatic updates managed entirely by SAP; no upgrade projects.
- Faster time-to-value (typically 4-8 months for initial go-live).
- Best for organizations willing to adopt SAP standard processes.

---

## 3. RISE vs GROW Comparison

| Dimension | RISE with SAP | GROW with SAP |
|-----------|--------------|---------------|
| **Target customer** | Large enterprises, existing SAP customers with complex landscapes | Midmarket, new-to-SAP, or subsidiaries seeking standardization |
| **S/4HANA edition** | Private Edition (single tenant) | Public Edition (multi-tenant SaaS) |
| **Customization** | Full custom code, modifications, BAdIs, enhancements | Key-user extensibility + BTP side-by-side only |
| **Deployment** | Dedicated infrastructure on chosen hyperscaler | SAP-managed multi-tenant infrastructure |
| **Upgrade control** | Customer-scheduled upgrade windows | Automatic quarterly updates by SAP |
| **Pricing model** | Subscription based on HUoM / FUE metrics | Subscription based on user packs / metric packs |
| **Migration path** | System conversion, selective data transition, or new implementation | New implementation only (Greenfield) |
| **Typical timeline** | 12-36 months | 4-8 months |
| **BTP inclusion** | CPEA credit allocation included | Starter BTP entitlements included |
| **Contract term** | 3-5 years typical | 1-3 years typical |

---

## 4. Licensing Models

### 4.1 HUoM (Harmonized Units of Measure)

Metric-based licensing that normalizes diverse usage into a single unit of measurement.

- **Concept** — Different business documents (sales orders, purchase orders, invoices, etc.) each carry a weighting factor. Total consumption is expressed in HUoM.
- **Benefit** — Simplifies licensing across modules; one metric instead of multiple named-user or document-based metrics.
- **Measurement** — SAP provides measurement tools (USMM / LAW) to track actual usage vs. entitlement.
- **Applies to** — RISE with SAP Private Edition subscriptions primarily.

### 4.2 FUE (Full Use Equivalent)

User-based licensing that consolidates multiple user types into a single metric.

- **Concept** — Each named user type (professional, limited, employee self-service) maps to a fraction of one FUE. A professional user = 1 FUE; a limited user might = 0.5 FUE.
- **Benefit** — Flexibility to mix user types under a single purchased quantity.
- **Tracking** — Administered via SAP license administration tools; periodic true-up reviews.
- **Applies to** — Both on-premise and cloud (Private Edition) licensing.

### 4.3 SAPS (SAP Application Performance Standard)

Infrastructure sizing metric, not a commercial license metric.

- **Definition** — 1 SAPS = 2,000 fully processed order line items per hour (SD benchmark).
- **Usage** — Used to size hardware/infrastructure requirements for S/4HANA deployments.
- **Relevance** — In RISE, SAP uses SAPS to determine the required infrastructure tier; customers specify workload in SAPS during scoping.
- **Benchmarks** — SAP publishes certified SAPS ratings for hardware; use SAP Quick Sizer for estimation.

### 4.4 CPEA (Cloud Platform Enterprise Agreement)

Consumption-based licensing for SAP BTP services.

- **Concept** — Pre-purchased credit pool consumed by BTP services at published rates.
- **Services covered** — Integration Suite, AI services, HANA Cloud, Analytics Cloud, Data Intelligence, and 80+ other BTP services.
- **Billing** — Monthly consumption deducted from the annual credit commitment.
- **Overage** — Consumption beyond committed credits billed at pay-as-you-go rates.

---

## 5. BTP Credits Model

### Credit Types

| Credit Type | Description |
|-------------|-------------|
| **CPEA** | Pre-committed annual credit pool; best discount tier |
| **Pay-As-You-Go** | No commitment; higher per-unit rate; good for exploration |
| **Free Tier** | Limited free allocation for selected services (development/trial) |

### Consumption Mechanics

- Each BTP service has a **metric** (API calls, GB stored, users, integration messages).
- Service consumption is converted to **credits** at a published rate per metric unit.
- **SAP BTP Cockpit** provides real-time usage dashboards and forecasting.
- Alerts can be configured at subaccount or directory level for cost governance.

### Optimization Tips

- Right-size HANA Cloud instances (scale up/down on schedule).
- Use free-tier services for dev/test where possible.
- Monitor Integration Suite message volumes; batch where practical.
- Review monthly consumption reports to detect anomalies early.

---

## 6. Contract Structure

### Subscription Terms

- **RISE** — Typically 3 or 5 year initial term with renewal options.
- **GROW** — Typically 1 or 3 year initial term; more flexible.
- Both include annual true-up reviews for usage-based metrics.

### Hyperscaler Choice (RISE)

- Available on **AWS, Microsoft Azure, or Google Cloud Platform**.
- Customer selects region and hyperscaler during contracting.
- SAP manages the infrastructure layer; customer does not need a direct hyperscaler contract.
- Hyperscaler-native services (e.g., Azure AD integration) can complement the SAP-managed stack.

### Migration Paths

| Approach | Description | Typical Use |
|----------|-------------|-------------|
| **System Conversion** | In-place technical conversion of existing ECC/S4 | Preserve config and history |
| **Selective Data Transition** | Shell conversion + selective data migration | Clean up while retaining key data |
| **New Implementation** | Greenfield deployment with data migration | Clean start; GROW or RISE |

---

## 7. Common Sizing Patterns

Reference architectures (approximate SAPS ranges):

| Size | SAPS Range | Typical Profile |
|------|-----------|-----------------|
| **Small** | 10,000-30,000 | Single country, < 500 users, limited modules |
| **Medium** | 30,000-100,000 | Multi-country, 500-2,000 users, core ERP + analytics |
| **Large** | 100,000-400,000+ | Global, 2,000+ users, full suite + integrations |

### Sizing Considerations

- Use **SAP Quick Sizer** (https://quicksizer.sap.com) for formal sizing.
- Factor in peak vs. average load (month-end, year-end processing spikes).
- Include batch processing, reporting, and integration workloads.
- Plan for 3-year growth when sizing initial infrastructure.
- RISE contracts allow re-sizing at renewal or via change orders mid-term.

---

## RISE vs GROW Decision Matrix

Use this matrix to guide the initial recommendation:

| Question | If Yes → RISE | If Yes → GROW |
|----------|---------------|---------------|
| Existing SAP ECC/S4 with heavy custom code? | X | |
| Need industry-specific modifications in core? | X | |
| Regulatory requirements mandate single-tenant? | X | |
| New to SAP or replacing non-SAP ERP? | | X |
| Willing to adopt standard best practices? | | X |
| Subsidiary or regional deployment needing speed? | | X |
| Need full control over upgrade timing? | X | |
| Budget-constrained with < 500 users? | | X |
| Require complex integration with legacy systems? | X | |
| Prefer automatic updates, minimal IT overhead? | | X |

**Hybrid approach** — Some organizations adopt RISE for headquarters and GROW for subsidiaries, consolidating on a single S/4HANA data model with mixed deployment editions.

---

## References

1. **SAP RISE with SAP Overview** — https://www.sap.com/products/erp/rise.html — Official product page with current bundle components, customer stories, and solution briefs.
2. **SAP GROW with SAP Overview** — https://www.sap.com/products/erp/grow.html — Official page covering GROW packages, onboarding resources, and community access.
3. **SAP BTP Service Catalog & Pricing** — https://discovery-center.cloud.sap/ — SAP Discovery Center lists all BTP services with metrics and estimator tools.
