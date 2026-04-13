# SAP Transaction Code Index

**Last Updated:** 2026-04-12
**Applies To:** ECC 6.0, S/4HANA 1809–2023, S/4HANA Cloud (where noted)
**Referenced By:** skills/development-workflow, skills/troubleshooting, skills/system-admin

## Content Routing

| Module | Section | Approximate Range |
|--------|---------|-------------------|
| FI — Financial Accounting | FI Module | Lines ~50–100 |
| CO — Controlling | CO Module | Lines ~100–140 |
| MM — Materials Management | MM Module | Lines ~140–185 |
| SD — Sales & Distribution | SD Module | Lines ~185–230 |
| PP — Production Planning | PP Module | Lines ~230–265 |
| PM — Plant Maintenance | PM Module | Lines ~265–295 |
| QM — Quality Management | QM Module | Lines ~295–320 |
| Basis / System Admin | Basis Module | Lines ~320–370 |
| Security / Authorization | Security Module | Lines ~370–405 |
| ABAP Development | Dev Module | Lines ~405–450 |
| Transport Management | Transport Module | Lines ~450–480 |
| Monitoring / Performance | Monitoring Module | Lines ~480–510 |

---

## Quick Reference — Most-Used Tcodes

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| SE38 | Dev | ABAP Editor | Available |
| SE11 | Dev | ABAP Data Dictionary | Available |
| SM30 | Basis | View/Table Maintenance | Available |
| SU01 | Security | User Maintenance | Available |
| SE16N | Dev | Table Contents Display (enhanced) | Available |
| STMS | Transport | Transport Management System | Available |
| SM21 | Monitoring | System Log | Available |
| ST05 | Dev/Perf | SQL Trace / Performance Trace | Available |
| VA01 | SD | Create Sales Order | Available |
| ME21N | MM | Create Purchase Order | Available |
| FB01 | FI | Post Document | Available |
| IW31 | PM | Create Maintenance Order | Available |

---

## Full Reference

### FI — Financial Accounting

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| FB01 | FI | Post Document (general) | Available |
| FB03 | FI | Display Document | Available |
| FB50 | FI | G/L Account Document Entry | Available |
| FB60 | FI | Enter Incoming Invoice (A/P) | Available |
| FB70 | FI | Enter Outgoing Invoice (A/R) | Available |
| FBL1N | FI | Vendor Line Item Display | Available |
| FBL3N | FI | G/L Account Line Items | Available |
| FBL5N | FI | Customer Line Item Display | Available |
| FBVB | FI | Post Parked Document | Available |
| F-02 | FI | Enter G/L Account Posting | Available |
| F-28 | FI | Post Incoming Payments | Available |
| F-32 | FI | Clear Customer Open Items | Available |
| F-44 | FI | Clear Vendor Open Items | Available |
| F-53 | FI | Post Outgoing Payments | Available |
| F110 | FI | Automatic Payment Run | Available |
| F.05 | FI | Foreign Currency Valuation | Available |
| FS00 | FI | G/L Account Master (Company Code) | Available |
| FSP0 | FI | G/L Account Master (Chart of Accounts) | Available |
| OBD4 | FI | G/L Account Groups Configuration | Available |
| OBA7 | FI | Document Types Configuration | Available |
| OBC4 | FI | Field Status Groups | Available |
| FAGLB03 | FI | G/L Account Balance Display (new ledger) | Available |
| FAGLL03 | FI | G/L Account Line Items (new ledger) | Available |
| S_ALR_87012284 | FI | G/L Account Balances (classic) | Available |
| MIGO | MM/FI | Goods Movement (triggers FI posting) | Available |
| VF01 | SD/FI | Create Billing Document | Available |

### CO — Controlling

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| KS01 | CO | Create Cost Center | Available |
| KS02 | CO | Change Cost Center | Available |
| KSB1 | CO | Cost Center: Actual Line Items | Available |
| KSB5 | CO | CO Documents: Actual Costs | Available |
| KSBL | CO | Cost Center: Plan/Actual/Variance | Available |
| KO01 | CO | Create Internal Order | Available |
| KO02 | CO | Change Internal Order | Available |
| KOB1 | CO | Internal Orders: Actual Line Items | Available |
| KP06 | CO | Change Plan/Actual: Cost Centers/Activities | Available |
| KP26 | CO | Change Plan Prices: Activity Types | Available |
| KSH1 | CO | Create Cost Center Group | Available |
| KB11N | CO | Enter Reposting of CO Line Items | Available |
| KSW5 | CO | Periodic Reposting Run | Available |
| KSU5 | CO | Distribution Cycle Run | Available |
| KSV5 | CO | Assessment Cycle Run | Available |
| CKMVFM | CO/ML | Material Ledger Closing Entry | Available |
| CK11N | CO | Create Material Cost Estimate | Available |
| CK24 | CO | Price Update (mark/release standard price) | Available |
| KE30 | CO-PA | Run Profitability Report | Available |
| KE24 | CO-PA | Display CO-PA Line Items | Available |

### MM — Materials Management

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| MM01 | MM | Create Material Master | Available |
| MM02 | MM | Change Material Master | Available |
| MM03 | MM | Display Material Master | Available |
| MM60 | MM | Material where-used list | Available |
| ME01 | MM | Maintain Source Lists | Available |
| ME11 | MM | Create Purchasing Info Record | Available |
| ME21N | MM | Create Purchase Order | Available |
| ME22N | MM | Change Purchase Order | Available |
| ME23N | MM | Display Purchase Order | Available |
| ME2M | MM | Purchase Orders by Material | Available |
| ME51N | MM | Create Purchase Requisition | Available |
| ME52N | MM | Change Purchase Requisition | Available |
| MIGO | MM | Goods Movements (GR, GI, Transfer) | Available |
| MIRO | MM | Enter Incoming Invoice (LIV) | Available |
| MIR7 | MM | Park Incoming Invoice | Available |
| MB51 | MM | Material Document List | Available |
| MB52 | MM | Warehouse Stocks of Material | Available |
| MMBE | MM | Stock Overview | Available |
| MI01 | MM | Create Physical Inventory Document | Available |
| MI07 | MM | Post Physical Inventory Count | Available |
| MRP1 | MM/PP | MRP Controller Monitoring | Available |
| MD01N | MM/PP | MRP Run (new MRP Cockpit in S/4) | S/4HANA only |
| MD04 | MM/PP | Stock/Requirements List | Available |
| MD05 | MM/PP | MRP List | Available |

### SD — Sales & Distribution

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| VA01 | SD | Create Sales Order | Available |
| VA02 | SD | Change Sales Order | Available |
| VA03 | SD | Display Sales Order | Available |
| VA11 | SD | Create Inquiry | Available |
| VA21 | SD | Create Quotation | Available |
| VL01N | SD | Create Outbound Delivery | Available |
| VL02N | SD | Change Outbound Delivery | Available |
| VL32N | SD | Change Inbound Delivery | Available |
| VF01 | SD | Create Billing Document | Available |
| VF02 | SD | Change Billing Document | Available |
| VF04 | SD | Billing Due List | Available |
| VF11 | SD | Cancel Billing Document | Available |
| XD01 | SD | Create Customer (centrally) | Replaced by BP |
| XD02 | SD | Change Customer (centrally) | Replaced by BP |
| BP | FI/SD | Business Partner (replaces customer/vendor) | S/4HANA mandatory |
| VK11 | SD | Create Condition (pricing) | Available |
| VK12 | SD | Change Condition Record | Available |
| V/08 | SD | Pricing Procedure Configuration | Available |
| OVZ2 | SD | Customer Credit Management Config | Available |
| FD32 | SD | Change Customer Credit Master | Available |
| VA05 | SD | List of Sales Orders | Available |
| VD51 | SD | Create Customer-Material Info Record | Available |

### PP — Production Planning

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| CS01 | PP | Create Bill of Materials | Available |
| CS02 | PP | Change BOM | Available |
| CS03 | PP | Display BOM | Available |
| CR01 | PP | Create Work Center | Available |
| CR02 | PP | Change Work Center | Available |
| CA01 | PP | Create Routing | Available |
| CA02 | PP | Change Routing | Available |
| CO01 | PP | Create Production Order | Available |
| CO02 | PP | Change Production Order | Available |
| CO11N | PP | Goods Issue / Confirmation for Prod. Order | Available |
| CO15 | PP | Production Order Confirmation — Goods Movement | Available |
| COOIS | PP | Production Information System | Available |
| MD01 | PP | MRP Run (total) | Available (use MD01N in S/4) |
| MD01N | PP | MRP — New MRP Cockpit | S/4HANA only |
| MD04 | PP | Stock/Requirements List | Available |
| MF60 | PP | Pull List (Kanban / Repetitive Mfg) | Available |
| PKMC | PP | Kanban Board | Available |

### PM — Plant Maintenance

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| IE01 | PM | Create Equipment | Available |
| IE02 | PM | Change Equipment | Available |
| IL01 | PM | Create Functional Location | Available |
| IL02 | PM | Change Functional Location | Available |
| IP01 | PM | Create Maintenance Plan | Available |
| IP02 | PM | Change Maintenance Plan | Available |
| IP10 | PM | Schedule Maintenance Plan | Available |
| IW21 | PM | Create PM Notification | Available |
| IW22 | PM | Change Notification | Available |
| IW31 | PM | Create Maintenance Order | Available |
| IW32 | PM | Change Maintenance Order | Available |
| IW33 | PM | Display Maintenance Order | Available |
| IW38 | PM | Change Maintenance Orders (list) | Available |
| IW41 | PM | Enter PM Order Confirmation | Available |
| COOIS | PM | Order Information System | Available |
| IH01 | PM | Display Equipment Hierarchy | Available |

### QM — Quality Management

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| QM01 | QM | Create Quality Notification | Available |
| QM02 | QM | Change Quality Notification | Available |
| QA01 | QM | Create Inspection Lot (manual) | Available |
| QA32 | QM | Change Inspection Lots (list) | Available |
| QE01 | QM | Enter Results for Inspection Lot | Available |
| QE51N | QM | Results Recording (new UI) | Available |
| QP01 | QM | Create Control Chart | Available |
| QS21 | QM | Create Master Inspection Characteristic | Available |
| QS41 | QM | Create Inspection Method | Available |
| QDL1 | QM | Quality Notification List | Available |
| QE71 | QM | Print QM Certificates | Available |

### Basis / System Administration

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| SM21 | Basis | System Log | Available |
| SM36 | Basis | Schedule Background Job | Available |
| SM37 | Basis | Job Overview (background processing) | Available |
| SM50 | Basis | Work Process Overview | Available |
| SM51 | Basis | Application Server Overview | Available |
| SM66 | Basis | Systemwide Work Process Overview | Available |
| SM12 | Basis | Lock Entries Display/Delete | Available |
| SM13 | Basis | Incomplete Update Requests | Available |
| SM59 | Basis | RFC Destination Configuration | Available |
| SMGW | Basis | Gateway Monitor | Available |
| SMICM | Basis | ICM Monitor (web dispatcher) | Available |
| RZ10 | Basis | Profile Parameters | Available |
| RZ20 | Basis | CCMS Alert Monitor | Available |
| AL11 | Basis | Directory of SAP Files | Available |
| DB02 | Basis | Database Tables / Missing Indexes | Available |
| DB12 | Basis | Database Backups Overview | Available |
| SGEN | Basis | SAP Load Generator (mass generation) | Available |
| SICK | Basis | Installation Check | Available |
| SARA | Basis | Archive Administration | Available |
| SLG1 | Basis | Application Log Display | Available |
| SWI1 | Basis | Work Item Selection (workflow) | Available |
| SWEL | Basis | Event Display (workflow) | Available |

### Security / Authorization

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| SU01 | Security | User Maintenance | Available |
| SU10 | Security | Mass User Changes | Available |
| SU01D | Security | User Display | Available |
| SU53 | Security | Display Authorization Check (failed) | Available |
| SU24 | Security | Auth. Obj. Check under Transactions | Available |
| PFCG | Security | Role Maintenance | Available |
| SUPC | Security | Profile Comparison | Available |
| SUIM | Security | User Information System | Available |
| SM19 | Security | Security Audit Log Configuration | Available |
| SM20 | Security | Security Audit Log Analysis | Available |
| RSUSR002 | Security | Users by Complex Criteria | Available |
| RSUSR100 | Security | Changes to User Master | Available |
| SU56 | Security | User Authorization Buffer Display | Available |
| STAUTHTRACE | Security | Authorization Trace (new) | S/4HANA preferred |
| NACE | SD/Security | Output Condition Records | Available |
| SE97 | Security | Transaction Code Auth. Attributes | Available |

### ABAP Development

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| SE38 | Dev | ABAP Program Editor | Available |
| SE80 | Dev | Object Navigator (ABAP Workbench) | Available |
| SE11 | Dev | ABAP Dictionary | Available |
| SE16 | Dev | Data Browser (read-only) | Available |
| SE16N | Dev | General Table Display | Available |
| SE37 | Dev | Function Module Editor | Available |
| SE24 | Dev | Class Builder | Available |
| SE18 | Dev | BAdI Definitions (Explorer) | Available |
| SE19 | Dev | BAdI Implementations | Available |
| SEGW | Dev | SAP Gateway Service Builder (OData v2) | Available |
| SICF | Dev/Basis | HTTP Service Configuration (ICF) | Available |
| SFW5 | Dev | Switch Framework | Available |
| SPRO | Config | IMG: Customizing (project-specific) | Available |
| SE91 | Dev | Message Class Maintenance | Available |
| SE93 | Dev | Transaction Code Maintenance | Available |
| SNOTE | Dev/Basis | SAP Note Assistant (Apply Notes) | Available |
| SCI | Dev | ABAP Code Inspector | Available |
| SCII | Dev | Code Inspector Inline | Available |
| ATC | Dev | ABAP Test Cockpit | Available (preferred) |
| SAT | Dev | ABAP Runtime Analysis (new) | Available |
| SE30 | Dev | ABAP Runtime Analysis (classic) | Available |

### Transport Management

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| STMS | Transport | Transport Management System | Available |
| SE09 | Transport | Workbench Request Overview | Available |
| SE10 | Transport | Customizing Request Overview | Available |
| SCC1 | Transport | Transport Copies within Client | Available |
| STMS_QA | Transport | Transport Quality Assurance | Available |
| CG3Y | Transport | Download Files from Application Server | Available |
| CG3Z | Transport | Upload Files to Application Server | Available |

### Monitoring & Performance

| Tcode | Module | Description | S/4HANA Status |
|-------|--------|-------------|----------------|
| ST05 | Perf | Performance Trace (SQL/RFC/Enqueue) | Available |
| ST12 | Perf | ABAP Trace (combined with AT) | Available |
| ST22 | Perf | ABAP Dump Analysis | Available |
| SM21 | Monitoring | System Log | Available |
| AL08 | Monitoring | Active Users (all instances) | Available |
| AL12 | Monitoring | Display Buffer Statistics | Available |
| DB50 | Perf | SQL Monitor (HANA-specific) | S/4HANA |
| /SDF/SMON | Perf | System Monitoring (SAP SDF) | Available |
| /SDF/EMON | Perf | Expensive SQL Statements | Available |
| STAD | Perf | Business Transaction Analysis | Available |
| SNOTE | Basis | Note Assistant | Available |
| SPAM | Basis | Support Package Manager | Available |
| SUM | Basis | Software Update Manager (external tool) | Available |

---

## Version Notes

| SAP Version | Key Differences |
|-------------|-----------------|
| ECC 6.0 | All classic tcodes active; FD32/XD01/XK01 used for customer/vendor master |
| S/4HANA On-Premise | BP mandatory (XD01/XK01 hidden by default); MD01N replaces MD01 for MRP; FAGLL03 preferred over classic FI reports |
| S/4HANA Cloud | Reduced tcode set — Fiori apps are primary interface; SE38/SE80 not available in ABAP Cloud |
| ABAP Cloud (BTP/PCE) | Only Released APIs and CDS; classic tcodes not available |
