# SPRO Configuration: Cross-Module / Common Settings (Common)

## Key Configuration Areas

### Enterprise Structure — Organizational Units
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Client Settings | SPRO > SAP NetWeaver > General Settings > Set Client | T000 | Defines client role (production, customizing, test); controls cross-client transport behavior |
| Company | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Company | T880 | Legal entity for consolidated financial statements; one company can have multiple company codes |
| Company Code | SPRO > Enterprise Structure > Definition > Financial Accounting > Edit, Copy, Delete, Check Company Code | T001 | Smallest unit with a complete set of books; central to FI, CO, MM, SD, HR posting |
| Plant | SPRO > Enterprise Structure > Definition > Logistics - General > Define, copy, delete, check plant | T001W | Central logistics org unit; used by MM, PP, PM, QM, WM, SD |
| Business Area | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Business Area | TGSB | Cross-company-code reporting segment; optional in S/4HANA (profit center preferred) |
| Profit Center | SPRO > Controlling > Profit Center Accounting > Master Data > Profit Center > Define Profit Center | CEPC | Mandatory in S/4HANA for segment reporting; replaces business area functionality |
| Segment | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Segment | FAGL_SEGM | IFRS 8 segment reporting; derived from profit center assignment |
| Functional Area | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Functional Area | TFKB | Cost-of-sales accounting dimension (production, admin, sales, R&D) |

### Enterprise Structure — Assignments
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Assign Company Code to Company | SPRO > Enterprise Structure > Assignment > Financial Accounting > Assign Company Code to Company | T001 (BUTXT/RCOMP) | Links company code to legal entity for consolidation |
| Assign Plant to Company Code | SPRO > Enterprise Structure > Assignment > Logistics - General > Assign Plant to Company Code | T001K | Every plant must belong to exactly one company code; drives valuation and accounting |
| Assign Controlling Area to Company Code | SPRO > Enterprise Structure > Assignment > Controlling > Assign Company Code to Controlling Area | TKA02 | Links FI postings to CO cost objects; must share chart of accounts and fiscal year |
| Assign Credit Control Area to Company Code | SPRO > Enterprise Structure > Assignment > Financial Accounting > Assign Company Code to Credit Control Area | T001 (KKBER) | Links credit management to company code for customer credit checks |
| Assign Sales Organization to Company Code | SPRO > Enterprise Structure > Assignment > Sales and Distribution > Assign Sales Organization to Company Code | TVKO (BUKRS) | Links SD billing to FI posting; one sales org maps to one company code |
| Assign Purchasing Organization to Company Code | SPRO > Enterprise Structure > Assignment > Materials Management > Assign Purchasing Organization to Company Code | T024E (BUKRS) | Links procurement to FI posting; purchasing org can be cross-company or company-specific |
| Assign Personnel Area to Company Code | SPRO > Enterprise Structure > Assignment > Human Resource Management > Assign Personnel Area to Company Code | T500P (BUKRS) | Links HCM payroll posting to FI company code |

### Number Ranges
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| FI Document Number Ranges | SPRO > Financial Accounting > General Ledger Accounting > Business Transactions > Define Document Number Ranges for Entry View | NRIV (RF_BELEG) | Per company code and document type; must not overlap across types |
| Material Number Ranges | SPRO > Logistics - General > Material Master > Basic Settings > Material Types > Define Number Ranges for Each Material Type | NRIV (MATERIALNR) | Internal (auto-assigned) or external (user-entered); length up to 40 in S/4HANA |
| Customer Number Ranges | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Customer Accounts > Master Data > Define Account Groups with Screen Layout > Define Number Ranges for Customer Account Groups | NRIV (DEBITOR) | Per account group (sold-to, ship-to, payer); BP-based in S/4HANA |
| Vendor Number Ranges | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Vendor Accounts > Master Data > Define Account Groups with Screen Layout > Define Number Ranges for Vendor Account Groups | NRIV (KREDITOR) | Per account group; BP-based in S/4HANA |
| Business Partner Number Ranges | SPRO > Cross-Application Components > SAP Business Partner > Business Partner > Basic Settings > Number Ranges and Groupings > Define Number Ranges | NRIV (BU_PARTNER) | S/4HANA central number range; replaces separate customer/vendor ranges |
| Purchase Order Number Ranges | SPRO > Materials Management > Purchasing > Purchase Order > Define Number Ranges | NRIV (EINKBELEG) | Per document type; shared across PR, PO, contract, scheduling agreement |
| Sales Document Number Ranges | SPRO > Sales and Distribution > Sales > Sales Documents > Define Number Ranges for Sales Documents | NRIV (SD_VBELN) | Per sales document type; must accommodate projected transaction volumes |
| Internal Order Number Ranges | SPRO > Controlling > Internal Orders > Order Master Data > Define Number Ranges for Orders | NRIV (OR_ORDER) | Per order type; shared with PM orders and production orders |
| Asset Number Ranges | SPRO > Financial Accounting > Asset Accounting > Organizational Structures > Asset Classes > Define Number Range Intervals | NRIV (AS_NRANL) | Per asset class; main asset and sub-asset numbering |

### Output Determination
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Output Condition Tables | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Condition Tables | T681 (App V) | Key combination for output condition records (e.g., sales org + document type) |
| Output Access Sequences | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Access Sequences | T682I (App V) | Search strategy for output determination; most specific to least specific |
| Output Types | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Output Types | TNAPR | BA00 (order confirmation), LD00 (delivery note), RD00 (billing), NEU (purchase order print) |
| Output Determination Procedures | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Output Determination Procedures | T683 (V) | Assigns output types to procedures; controls requirement and timing (immediately, batch, send) |
| Print Programs and Forms | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Output Types > Processing Routines | TNAPR (NAESSION) | Maps output types to SAPscript forms, Smart Forms, or Adobe Forms and their print programs |
| Email and EDI Output | SPRO > Sales and Distribution > Basic Functions > Output Determination > Maintain Output Types > Define Partner Functions for Output | TNAPR (MEDIUM) | Medium 1 (print), 2 (fax), 5 (external send/EDI), 7 (SAPconnect/email), 8 (special function) |
| Condition Records for Output | Transaction NACE / VV11-VV13 | NACH | Actual output condition records that trigger output for specific combinations (customer + doc type) |

### Calendar and Global Settings
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Factory Calendar | SPRO > SAP NetWeaver > General Settings > Maintain Calendar | TFACS / THOCI | Public holidays + holiday calendar + factory calendar — used by MRP, scheduling, payroll, and dunning |
| Country Settings | SPRO > SAP NetWeaver > General Settings > Set Countries > Define Countries | T005 | Country keys, date format, decimal notation, address format — foundation for all modules |
| Currency Settings | SPRO > SAP NetWeaver > General Settings > Currencies > Define Currency Codes | TCURC | ISO currency codes; parallel currencies for company code (local, group, hard) |
| Exchange Rate Types | SPRO > SAP NetWeaver > General Settings > Currencies > Define Exchange Rate Types > Define Exchange Rate Types | TCURV | M (standard/average), B (buying), G (selling), P (planned) — used across FI, CO, SD, MM |
| Exchange Rate Maintenance | SPRO > SAP NetWeaver > General Settings > Currencies > Enter Exchange Rates | TCURR | Daily, monthly, or period-based exchange rates; automatic inverse rate calculation |
| Units of Measure | SPRO > SAP NetWeaver > General Settings > Check Units of Measurement | T006 | KG, L, EA, PC, M — ISO units with conversion factors; used across all logistics modules |
| Tax Settings | SPRO > Financial Accounting > Financial Accounting Global Settings > Tax on Sales/Purchases > Define Tax Codes for Sales and Purchases | T007A / A003 | Tax codes per country; rate, account assignment, and jurisdiction code |

### Workflow and Business Process
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Workflow Runtime Configuration | SPRO > SAP NetWeaver > Application Server > Business Management > SAP Business Workflow > Maintain Runtime Configuration | SWU3 (T77S0) | WF-BATCH user, RFC destination, event queue activation — one-time setup for all SAP workflows |
| Organizational Plan for Workflow | SPRO > SAP NetWeaver > Application Server > Business Management > SAP Business Workflow > Define Organizational Plan | T77UA | Assigns agents (users, positions, jobs) to workflow tasks for approval routing |
| Standard Task Configuration | SPRO > SAP NetWeaver > Application Server > Business Management > SAP Business Workflow > Define Standard Tasks | SWOTICE | Configures binding, agent assignment, and deadline monitoring for workflow steps |
| Event Linkage | SPRO > SAP NetWeaver > Application Server > Business Management > SAP Business Workflow > Define Event Linkage | SWE2 | Maps business object events (e.g., PO created) to workflow templates for auto-triggering |
| Notification and Escalation | SPRO > SAP NetWeaver > Application Server > Business Management > SAP Business Workflow > Define Deadline Monitoring | SWE2 (DEADLINE) | Deadline types (requested, latest, escalation) with notification actions |

### Change Management and Transport
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Change and Transport System | SPRO > SAP NetWeaver > Application Server > System Administration > Transport Management System | TMSCSYS | Transport routes, layers, and consolidation paths between DEV > QAS > PRD |
| Client-Dependent vs. Cross-Client | SPRO > SAP NetWeaver > General Settings > Set Client | T000 (CCCATEGORY) | Controls whether customizing changes are client-dependent (most SPRO) or cross-client (table entries) |
| Transport of Copies | SPRO > SAP NetWeaver > Application Server > System Administration > Transport > Define Transport of Copies | TPALOG | Copies customizing and workbench objects between clients or systems without original system lock |
| Change Request Management | SPRO > SAP NetWeaver > Application Server > Change Management > Define Change Request Settings | E070 | Transport request types: customizing (SYST), workbench (DEVE), transport of copies (COPY) |
| Table Logging | SPRO > SAP NetWeaver > Application Server > System Administration > Define Table Logging | DD09L (PROTOKOLL) | Activates change logging for critical config tables; required for audit compliance |

## Critical Configuration Dependencies

1. **Client** must be configured with correct role (customizing, production) before any configuration begins
2. **Company** and **Company Code** must exist before any module-specific org unit can be created or assigned
3. **Chart of Accounts** must be assigned to Company Code before G/L accounts, cost elements, or any financial posting is possible
4. **Plant** must be assigned to Company Code before logistics modules (MM, PP, PM, QM, WM) function
5. **Controlling Area** must be assigned to Company Code(s) before any CO postings or cost object creation
6. **Factory Calendar** must be maintained for all relevant countries/regions before scheduling, MRP, payroll, and dunning run correctly
7. **Currency and Exchange Rates** must be configured before multi-currency transactions post — missing rates cause hard posting errors
8. **Number Ranges** must be configured per module before any master data or transactional documents can be created — ranges must not overlap and must accommodate projected volumes for the system lifetime
9. **Workflow Runtime** (SWU3) must be configured before any business workflow (approval, notification) triggers
10. **Business Partner** number ranges and groupings must be configured in S/4HANA before any customer or vendor master data creation (replaces classic customer/vendor number ranges)

## Common Configuration Mistakes

1. **Enterprise structure built without future growth** — Defining org units (company codes, plants, sales orgs) without considering mergers, acquisitions, or geographic expansion. Restructuring org units after go-live is extremely costly and disruptive.
2. **Number range exhaustion** — Allocating number ranges that are too narrow for the projected transaction volume over the system's lifetime (10-20 years). Extending ranges after go-live requires careful planning to avoid gaps or overlaps.
3. **Factory calendar not maintained for future years** — Only configuring holidays for the current year, causing MRP, scheduling, and payment runs to fail in January of the following year when no calendar data exists.
4. **Output determination incomplete** — Configuring output types and procedures but forgetting to create condition records, so no output (print, email, EDI) is actually triggered when documents are processed.
5. **Workflow runtime not configured** — Skipping SWU3 setup or not assigning the WF-BATCH user, causing all workflow-based approvals (PO release, leave request, invoice approval) to silently fail with no error visible to end users.
