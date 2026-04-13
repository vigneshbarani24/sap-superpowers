# SAP Fiori Apps Reference Index

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise 1809–2023, S/4HANA Cloud Public and Private Edition
**Referenced By:** skills/development-workflow, skills/system-admin, skills/fiori, skills/s4hana-migration

## Content Routing

| Module | Section |
|--------|---------|
| FI — Financial Accounting | Lines ~50–95 |
| CO — Controlling | Lines ~95–115 |
| MM — Materials Management | Lines ~115–155 |
| SD — Sales & Distribution | Lines ~155–190 |
| PP — Production Planning | Lines ~190–215 |
| PM — Plant Maintenance | Lines ~215–235 |
| QM — Quality Management | Lines ~235–250 |
| HR — Human Resources / SuccessFactors | Lines ~250–265 |
| Cross-Application / Basis | Lines ~265–295 |
| Fiori Admin & Setup | Lines ~295–320 |

---

## Quick Reference — Must-Know App IDs

| App ID | App Name | Module | Replaces |
|--------|---------|--------|---------|
| F0717 | Manage Journal Entries | FI | FB03 + FBL3N |
| F1703 | Create Purchase Order | MM | ME21N |
| F1704 | Create Sales Orders | SD | VA01 |
| F2958 | My Inbox | Cross | SBWP / SWI1 |
| F0955 | Manage Business Partners | FI/SD | BP tcode |
| F2229 | Manage Purchase Requisitions | MM | ME52N / ME53N |
| F2835 | Manage Production Orders | PP | COOIS / CO02 |
| F2615 | Manage Maintenance Orders | PM | IW38 |

---

## App Type Definitions

| Type | Description |
|------|-------------|
| Transactional | Create / change / display individual objects (SAP UI5, Fiori Launchpad) |
| Analytical | List reports and KPI tiles backed by CDS views or embedded BW |
| Fact Sheet | Read-only contextual display; launched from search or workflow |
| Smart Business KPI | Real-time KPI tile backed by CDS view with drilldown |
| OVP | Overview Page — aggregated view of multiple entity types |

---

## Full Reference

### FI — Financial Accounting

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F0717 | Manage Journal Entries | FI-GL | Analytical | FB03, FBL3N |
| F0718 | Post General Journal Entry | FI-GL | Transactional | FB50 |
| F0719 | Schedule General Ledger Jobs | FI-GL | Transactional | F.05, F.07 (background jobs) |
| F2680 | Manage Fixed Assets | FI-AA | Transactional | AS02, AS03 |
| F2681 | Create Fixed Asset | FI-AA | Transactional | AS01 |
| F1712 | Fixed Asset Depreciation Run | FI-AA | Transactional | AFAB |
| F3032 | Manage Accounts Payable | FI-AP | Analytical | FBL1N |
| F3033 | Manage Accounts Receivable | FI-AR | Analytical | FBL5N |
| F2406 | Display Line Items in General Ledger | FI-GL | Analytical | FAGLL03 |
| F1367 | G/L Account Balances | FI-GL | Analytical | S_ALR_87012284 |
| F0997 | Post Incoming Payments | FI-AR | Transactional | F-28 |
| F0998 | Post Outgoing Payments | FI-AP | Transactional | F-53 |
| F2405 | Automatic Payment Run | FI-AP | Transactional | F110 |
| F2743 | Clear Incoming Payments | FI-AR | Transactional | F-32 |
| F1302 | Manage Bank Accounts | FI-TR | Transactional | FI12 |
| F3752 | Cash Management Overview | FI-TR | OVP | FF7A / FF7B |
| F3486 | G/L Account Master Data | FI-GL | Transactional | FS00 |
| F2394 | Tax Returns | FI-TX | Analytical | S_ALR_87012357 |
| F0722 | Display Financial Statement | FI-GL | Analytical | F.01 |
| F4873 | Profit and Loss — Plan/Actual | CO-PA | Analytical | KE30 |

### CO — Controlling

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F3010 | Cost Center Planning | CO-CCA | Transactional | KP06 |
| F3011 | Cost Center Actuals | CO-CCA | Analytical | KSB1 |
| F3012 | Cost Centers — Overview | CO-CCA | OVP | KSBL |
| F1377 | Create Internal Order | CO-OPA | Transactional | KO01 |
| F1378 | Manage Internal Orders | CO-OPA | Analytical | KO02 / KOB1 |
| F2190 | Material Cost Estimate | CO-PC | Transactional | CK11N |
| F2191 | Manage Material Costing Runs | CO-PC | Transactional | CK40N |
| F3752 | Profitability Analysis | CO-PA | Analytical | KE24 |
| F0960 | Activity Price Calculation | CO-CCA | Transactional | KSPI |

### MM — Materials Management

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F1703 | Create Purchase Order | MM-PUR | Transactional | ME21N |
| F2229 | Manage Purchase Requisitions | MM-PUR | Transactional | ME52N / ME53N |
| F2346 | Create Purchase Requisition | MM-PUR | Transactional | ME51N |
| F1339 | Process Purchase Orders | MM-PUR | Analytical | ME2M / ME2L |
| F2082 | Create Outbound Delivery (from PO context) | MM-IM | Transactional | MIGO (GR) |
| F0842 | Manage Stock | MM-IM | Transactional | MB52 / MMBE |
| F2346 | Goods Receipt — Purchase Order | MM-IM | Transactional | MIGO (GR from PO) |
| F2726 | Post Goods Movement | MM-IM | Transactional | MIGO |
| F1068 | Manage Material Documents | MM-IM | Analytical | MB51 |
| F2094 | Physical Inventory | MM-IM | Transactional | MI01 / MI07 |
| F0848 | Approve Purchase Orders | MM-PUR | Transactional | ME28 / approval workflow |
| F2062 | Vendor Invoice | MM-IV | Transactional | MIRO |
| F5762 | Park Vendor Invoice | MM-IV | Transactional | MIR7 |
| F1416 | Approve Supplier Invoices | MM-IV | Transactional | MIR6 (approval) |
| F3345 | Manage Materials | MM | Transactional | MM02 / MM03 |
| F0395 | Create Material (Project) | MM | Transactional | MM01 |
| F2211 | Stock Overview | MM-IM | Analytical | MMBE |
| F2943 | Analyze Purchase Spend | MM-PUR | Analytical | ME2M (analytical) |
| F1379 | Schedule Agreements | MM-PUR | Transactional | ME31L / ME32L |
| F1380 | Source List Maintenance | MM-PUR | Transactional | ME01 |
| F3342 | Purchasing Contract Management | MM-PUR | Transactional | ME31K / ME32K |

### SD — Sales & Distribution

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F1704 | Create Sales Orders | SD | Transactional | VA01 |
| F2439 | Manage Sales Orders | SD | Transactional | VA02 / VA05 |
| F2082 | Create Outbound Delivery | SD-SHP | Transactional | VL01N |
| F2084 | Manage Outbound Deliveries | SD-SHP | Analytical | VL06O |
| F0799 | Billing — Create and Edit | SD-BIL | Transactional | VF01 |
| F2340 | Billing Due List | SD-BIL | Transactional | VF04 |
| F0955 | Manage Business Partners | FI/SD | Transactional | BP / XD01 / XK01 |
| F2334 | Create Sales Quotation | SD | Transactional | VA21 |
| F2335 | Manage Sales Quotations | SD | Analytical | VA25 |
| F0863 | Maintain Condition Records (Pricing) | SD | Transactional | VK11 / VK12 |
| F2406 | Check SD Document Flow | SD | Fact Sheet | VA03 (document flow tab) |
| F3017 | Customer Returns | SD | Transactional | VA01 (return order type) |
| F3020 | Credit Memo Processing | SD | Transactional | VF01 (credit memo) |
| F2686 | Manage Customer Master | SD | Transactional | XD02 (now via BP) |
| F1713 | Backorder Processing | SD-ATP | Transactional | V_RA |
| F3048 | Available to Promise Check | SD-ATP | Transactional | CO09 |
| F0710 | Sales Order Fulfillment Issues | SD | Analytical | Replaces manual exception monitoring |
| F2093 | Goods Issue for Outbound Delivery | SD-SHP | Transactional | VL02N (goods issue) |
| F2453 | Transportation Management — Freight Orders | TM | Transactional | /SCMTMS/MON_FO |

### PP — Production Planning

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F2835 | Manage Production Orders | PP | Transactional | CO02 / COOIS |
| F1960 | Schedule Production Orders | PP | Transactional | CO24 / CM01 |
| F2836 | Create Production Order | PP | Transactional | CO01 |
| F3045 | Production Order Confirmation | PP | Transactional | CO11N |
| F3046 | Backflush Production | PP | Transactional | CO15 |
| F2271 | MRP — Monitor Material Coverage | PP | Analytical | MD04 |
| F2272 | pMRP — Predictive MRP Run | PP | Transactional | MD01N |
| F3047 | Manage Bills of Material | PP | Transactional | CS02 / CS03 |
| F3048 | Where-Used List for Material | PP | Analytical | CS15 |
| F2966 | Manage Work Centers | PP | Transactional | CR02 / CR03 |
| F2370 | Production Scheduling Board | PP | Transactional | CM25 / MF50 |
| F2369 | Kanban Board | PP | Transactional | PKMC |
| F3049 | Manage Routings | PP | Transactional | CA02 / CA03 |

### PM — Plant Maintenance

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F2615 | Manage Maintenance Orders | PM | Transactional | IW38 / IW32 |
| F2616 | Create Maintenance Order | PM | Transactional | IW31 |
| F2617 | Create Maintenance Notification | PM | Transactional | IW21 |
| F2618 | Manage Maintenance Notifications | PM | Analytical | IW28 |
| F2963 | Equipment Master | PM | Transactional | IE02 / IE03 |
| F2964 | Functional Location | PM | Transactional | IL02 / IL03 |
| F2619 | Maintenance Plan Scheduling | PM | Transactional | IP10 |
| F3050 | My Maintenance Worklist | PM | Transactional | IW38 (personal filter) |
| F3051 | Maintenance Cost Analysis | PM | Analytical | IW40 cost analysis |
| F2965 | Maintenance Confirmation | PM | Transactional | IW41 |

### QM — Quality Management

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F2622 | Manage Quality Notifications | QM | Transactional | QM02 / QM03 |
| F2623 | Record Inspection Results | QM | Transactional | QE51N |
| F2624 | Usage Decision for Inspection Lot | QM | Transactional | QA11 |
| F3052 | Quality Inspection Overview | QM | Analytical | QA32 |
| F2625 | Manage Inspection Lots | QM | Analytical | QA32 / QA33 |
| F3053 | Defect Recording | QM | Transactional | QM01 |

### HR / SuccessFactors

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| HCM_EMPL_FACTSHEET | Employee Fact Sheet | HCM/SF | Fact Sheet | PA20 (partial) |
| SF_TIMESHEET | Time Sheet Entry | SF/HCM | Transactional | CATS (CAT2) |
| F2958 | My Inbox (includes HR approvals) | Cross/HR | Transactional | SBWP / workflow inbox |
| F1385 | Leave Request | HCM | Transactional | PTARQ |
| F1386 | Approve Leave Requests | HCM | Transactional | PTARQ (manager) |

### Cross-Application / Basis

| App ID | App Name | Module | Type | Replaces Tcode |
|--------|---------|--------|------|---------------|
| F2958 | My Inbox | Cross | Transactional | SBWP / SWI1 |
| F0955 | Manage Business Partners | FI/SD/MM | Transactional | BP / XD01 / XK01 |
| F1346 | Custom Fields and Logic (In-App Extensibility) | Cross | Transactional | No equivalent — new capability |
| F1463 | Manage Workflow and Approvals | Cross | Transactional | SWI1 / SWDD |
| F1497 | Adapt UI (Fiori App Personalization) | Cross | Transactional | No equivalent |
| F2048 | Communication Systems (S/4HANA Cloud) | Basis | Transactional | SM59 equivalent for cloud |
| F2049 | Communication Arrangements | Basis | Transactional | RFC destination setup (cloud) |
| F1082 | Application Jobs | Basis | Transactional | SM36 / SM37 |
| F2296 | Manage Users (S/4HANA Cloud) | Security | Transactional | SU01 (cloud equivalent) |
| F2297 | Assign Business Users | Security | Transactional | SU10 (cloud equivalent) |
| F3030 | Output Parameter Determination | Cross | Transactional | NACE |
| F3031 | Manage Output Templates | Cross | Transactional | Smart Forms / Adobe Forms admin |

---

## Fiori App Activation Checklist (On-Premise)

1. **Confirm S/4HANA release** — check Fiori Apps Library filter matches your exact version
2. **Activate OData service** — via /IWFND/MAINT_SERVICE or Fiori reference apps activation procedure
3. **Assign catalog and group** — via Fiori Launchpad Designer or Spaces/Pages (2020+)
4. **Assign role to user** — business role contains catalog; use PFCG or SU01 role assignment
5. **Check ICF node** — confirm /sap/bc/ui5_ui5 and /sap/opu/odata active in SICF
6. **Run /UI2/FLP_CHECK_CUSTOMIZING** — validates Launchpad config consistency

---

## Version Notes

| S/4HANA Version | Fiori Changes |
|----------------|--------------|
| 1610 | Initial Fiori 2.0 wave; most core apps available |
| 1809 | Spaces and Pages concept introduced; SAP Fiori 3.0 visuals |
| 2020 | Spaces mandatory for new launchpad setup; Classic Launchpad deprecated path |
| 2021 | Enhanced Fiori Launchpad with dynamic tiles backed by CDS views |
| 2022 | Expanded analytical apps; Joule AI assistant integration points |
| Cloud Public | Fiori is the only interface — no SAPGUI for end users |
