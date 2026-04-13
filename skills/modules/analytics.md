---
name: analytics
description: Use when working with SAP Analytics Cloud (SAC), embedded analytics in S/4HANA, CDS-based analytical views, KPI modeling, Fiori analytical apps, BW/4HANA, SAP Datasphere, planning models, or BI story design.
---

# SAP Analytics

This skill enforces correct analytics architecture decisions, ensuring that CDS-based analytics are used for S/4HANA embedded reporting, standard Fiori analytical apps are evaluated before building custom reports, and authorization relevance is never an afterthought in CDS view design.

## Content Routing

| Topic | Section |
|-------|---------|
| SAP Analytics Cloud (SAC) | SAP Analytics Cloud |
| CDS-based embedded analytics | Embedded Analytics in S/4HANA |
| BW/4HANA and data warehousing | BW/4HANA |
| SAP Datasphere | SAP Datasphere |
| Fiori analytical apps | Fiori Analytical Apps |
| Planning models | SAC Planning |
| Live connection vs import | Connection Types |

## Iron Laws

1. **ALWAYS USE CDS-BASED ANALYTICS FOR S/4HANA EMBEDDED REPORTING.** Classic SE38/SQ01 reports and BW extractors are technical debt in S/4HANA. CDS views with analytical annotations are the strategic reporting foundation. Every new analytical requirement starts with CDS.
2. **NEVER BUILD CUSTOM REPORTS WHEN STANDARD FIORI ANALYTICAL APPS EXIST.** SAP delivers 500+ analytical Fiori apps. Before writing a single CDS view, search the Fiori Apps Library (fioriappslibrary.hana.ondemand.com) for existing coverage. Custom reports have maintenance costs; standard apps are upgraded by SAP.
3. **ALWAYS CONSIDER AUTHORIZATION RELEVANCE IN CDS VIEWS.** A CDS view without @AccessControl.authorizationCheck annotation defaults to NOT_ALLOWED in strict mode. Every analytical CDS view must have an explicit authorization check or a documented justification for NOT_REQUIRED. Data leaks from missing auth checks are audit findings.
4. **NEVER MIX LIVE AND IMPORT MODELS WITHOUT ARCHITECTURE JUSTIFICATION.** SAC live connections (real-time to HANA/BW) and import models (scheduled data copy) serve different purposes. Mixing them in the same story without documented rationale creates user confusion about data freshness.
5. **ALWAYS VALIDATE KPI DEFINITIONS WITH BUSINESS OWNERS.** A technically correct KPI with a business-incorrect definition is worse than no KPI. Revenue recognition timing, cost allocation methods, and headcount definitions MUST be confirmed with finance/HR before building dashboards.

## Embedded Analytics in S/4HANA

### CDS Analytical Annotations
The foundation of S/4HANA embedded analytics. Key annotations:

| Annotation | Purpose |
|------------|---------|
| @Analytics.dataCategory: #CUBE | Marks view as analytical cube (fact data) |
| @Analytics.dataCategory: #DIMENSION | Marks view as dimension (master data) |
| @AnalyticsDetails.query.axis: #ROWS / #COLUMNS | Default query layout |
| @Semantics.amount.currencyCode | Currency field association |
| @Semantics.quantity.unitOfMeasure | Unit of measure association |
| @Consumption.derivation | Default filter value derivation |
| @AccessControl.authorizationCheck: #CHECK | Authorization enforcement |
| @ObjectModel.representativeKey | Key field for Fiori display |

### CDS View Stack (Recommended Pattern)
1. **Interface View (I_):** Stable API, reusable across applications. SAP-delivered.
2. **Consumption View (C_):** Built on interface views, adds analytical annotations. SAP or custom.
3. **Extension View (Z_):** Custom extensions via CDS view extension or wrapper views.

### Virtual Data Model (VDM)
S/4HANA VDM organizes CDS views into layers:
- **Basic (private):** Direct table access — not for consumption
- **Composite (restricted):** Join multiple basic views — internal use
- **Consumption (public):** Exposed to Fiori, OData, SAC — the API layer

### Key Analytical CDS Views (Examples)
| CDS View | Domain |
|----------|--------|
| C_TRIALBALANCE | Financial — Trial balance |
| C_JOURNALENTRYITEMQ | Financial — Journal entries |
| C_GLLINEITEMQ | Financial — GL line items |
| C_PROFITCENTERACTUALQ | CO — Profit center actuals |
| C_PURCHASEORDERITEMQ | MM — Purchase order analytics |
| C_SALESORDERITEMQ | SD — Sales order analytics |
| C_PRODUCTIONORDERQ | PP — Production order analytics |

## SAP Analytics Cloud

### SAC Capabilities
- **Business Intelligence:** Stories, dashboards, smart insights, smart predict
- **Planning:** Financial and operational planning with versioning
- **Predictive:** Time series forecasting, classification, regression
- **Application Design:** Custom analytical applications with scripting

### Connection Types
| Type | Data Freshness | Use Case | Limitations |
|------|---------------|----------|-------------|
| Live (HANA) | Real-time | Operational dashboards | No blending, limited data wrangling |
| Live (BW) | Real-time | BW query consumption | No blending across connections |
| Import (scheduled) | Scheduled refresh | Cross-source blending, planning | Data latency, storage limits |
| Import (file) | Manual upload | Ad-hoc analysis | No automation |

### Story Design Best Practices
1. **One story, one purpose** — do not combine operational monitoring with strategic analysis
2. **Use responsive pages** — design for desktop and mobile from the start
3. **Limit widgets per page to 8-10** — performance degrades with widget count
4. **Use input controls** over page filters for user-facing filtering
5. **Set default filters** to avoid full-data-set initial load
6. **Use calculated measures sparingly** — complex calculations degrade live connection performance

## SAC Planning

### Planning Model Design
- **Accounts dimension:** Mandatory — represents the measure structure (revenue, cost, headcount)
- **Time dimension:** Mandatory — fiscal or calendar periods
- **Organization dimension:** Company code, cost center, profit center
- **Category dimension:** Plan, actual, forecast, budget versions
- **Custom dimensions:** Product, region, project as needed

### Key Planning Features
| Feature | Description |
|---------|-------------|
| Data Actions | Automated allocation, copy, distribution operations |
| Multi Actions | Chain multiple data actions with parameters |
| Predictive Forecasting | Time-series-based forecast generation |
| Value Driver Trees | Top-down planning with driver decomposition |
| Calendar Tasks | Workflow for planning cycles with assignments and deadlines |
| Version Management | Plan, budget, forecast version comparisons |

### Integration with S/4HANA
- **Embedded Planning:** SAC planning models connected live to S/4HANA ACDOCA
- **Writeback:** Plan data written back to S/4HANA for integrated financial reporting
- **Data Actions for Actuals:** Pull actuals from S/4HANA into planning models for comparison

## Fiori Analytical Apps

### App Types
| Type | Technology | Example |
|------|-----------|---------|
| Overview Page (OVP) | Smart annotations, CDS | Financial Overview, Procurement Overview |
| Analytical List Page (ALP) | CDS + SmartTable | Journal Entry Items, Sales Orders |
| KPI Workspace | KPI modeler | Custom KPI tiles on Fiori Launchpad |
| SAC Embedded | iFrame/mashup | Embedded SAC story in Fiori |

### Key Standard Analytical Apps
- **F0996A:** Financial Statement (actual/plan comparison)
- **F1531:** Display Journal Entries
- **F2077:** Manage Cost Centers and Budgets
- **F0713:** Sales Order Fulfillment Analysis
- **F0842:** Purchase Order Tracking
- **F2439:** Inventory Analysis

## BW/4HANA

### When to Use BW/4HANA
- Cross-system reporting (multiple S/4HANA instances, non-SAP sources)
- Historical data retention beyond S/4HANA operational data lifetime
- Complex transformation and data modeling beyond CDS view capabilities
- Near-line storage for large data volumes

### Key Objects
| Object | Purpose |
|--------|---------|
| ADSO (Advanced DataStore Object) | Primary data persistence |
| CompositeProvider | Virtual data integration layer |
| Open ODS View | External data consumption without persistence |
| BW Query | Analytical query for consumption by SAC or Fiori |

### CDS Extraction
S/4HANA -> BW/4HANA extraction uses CDS-based extractors (replacing classic datasources). Annotation: @Analytics.dataExtraction.enabled: true.

## SAP Datasphere

### Positioning
SAP Datasphere (formerly Data Warehouse Cloud) is the cloud data integration and modeling layer.

### Key Capabilities
- **Spaces:** Isolated workspaces for data governance
- **Data Builder:** Graphical data flow and view modeling
- **Business Layer:** Business-friendly semantic model on technical data
- **Data Marketplace:** Third-party and SAP content packages
- **Open SQL Schema:** Direct HANA SQL access for advanced scenarios

### Integration with SAC
Datasphere serves as the semantic layer between raw data and SAC stories. Pattern: Source systems -> Datasphere (model/govern) -> SAC (visualize/plan).

## Best Practices

1. **Start with SAP standard content** — check the SAC content library and Fiori apps library before building custom
2. **Design CDS views for reuse** — build interface views that multiple consumption views can reference
3. **Implement row-level security via DCL** — CDS data control language for authorization, not application-level filtering
4. **Use bookmarks** in SAC stories for personalized views instead of duplicating stories
5. **Monitor CDS view performance** — use SQL explain plan and HANA monitoring to detect expensive views

## Anti-Patterns

- Building ABAP ALV reports for analytics in S/4HANA (bypasses the VDM and lacks CDS benefits)
- Creating one massive CDS view with 50+ joins instead of layered VDM approach (performance disaster)
- Using SAC import mode for data that changes hourly (live connection is appropriate)
- Skipping @AccessControl annotations — data exposed to all users without explicit authorization
- Hardcoding currency conversion in CDS views instead of using standard conversion functions

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct analytics technology selected for the scenario (CDS, SAC, BW/4HANA, Datasphere)
- [ ] Authorization approach defined (DCL for CDS, SAC security for stories)
- [ ] Connection type justified (live vs. import with rationale)
- [ ] Standard content checked before proposing custom development
- [ ] KPI definitions validated against business requirements, not just technical correctness
- [ ] Performance implications considered (view complexity, data volume, refresh frequency)

**Evidence required:** Specific CDS view names, SAC model design decisions, connection type justification, and standard content references — not generic analytics advice.

## Next Skill

After completing this skill, invoke:
- `fi` — When financial reporting CDS views or GL analytics are the focus
- `btp` — When custom analytical applications or Datasphere configuration is needed
- `abap-cloud` — When custom CDS view development is required

## Cross-References

- `fi` — Financial reporting, trial balance, journal entry analytics
- `co` — Cost center and profit center analytical views
- `abap-cloud` — CDS view development, ABAP SQL, RAP-based analytical services
- `btp` — SAP Datasphere administration, SAC tenant management
- `sf` — Workforce analytics integration with SuccessFactors data
