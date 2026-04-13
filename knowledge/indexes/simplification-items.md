# S/4HANA Simplification Items — Reference Index

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise (all releases), S/4HANA Cloud
**Referenced By:** skills/s4hana-migration, skills/fit-gap-analysis, skills/clean-core-strategy, skills/solution-architecture
**Source:** SAP Simplification List (SAP Note 2380176 — updated each release)

## What Are Simplification Items?

Simplification Items (SIs) are documented changes where S/4HANA fundamentally restructures, replaces, or removes functionality that existed in ECC. Every SI requires an explicit migration decision: adopt the S/4HANA approach, find a replacement, or accept a functional gap.

> **Consultant Rule:** Review the Simplification List for every in-scope module before design. SIs are non-negotiable — they cannot be "switched off."

---

## Impact Level Definitions

| Level | Meaning | Action Required |
|-------|---------|----------------|
| HIGH | Mandatory change — blocking migration if not addressed | Must resolve before system conversion |
| MEDIUM | Functional change with workaround available | Address during project; document decision |
| LOW | Minor change; no functional loss | Inform business; update training material |

---

## Full Reference

### FI — Financial Accounting

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-FI-001 | FI-GL | **Universal Journal (ACDOCA):** Single source of truth replaces BSEG, FAGLFLEXA, COEP. All FI/CO postings write to ACDOCA only. Old tables become compatibility views. | HIGH | Validate custom reports reading BSEG/FAGLFLEXA — replace with I_JournalEntryItem CDS view or migrate to ACDOCA direct reads |
| SI-FI-002 | FI-AA | **New Asset Accounting mandatory:** Classic AA (based on ANLA/ANLZ) replaced by new AA integrated with ACDOCA. Depreciation areas post in real time. Parallel valuation is ledger-based. | HIGH | Run asset migration transaction ABLDT; validate depreciation areas; test all asset transactions end-to-end |
| SI-FI-003 | FI/SD/MM | **Business Partner mandatory:** Customer (KNA1/KNVV) and Vendor (LFA1/LFB1) master data replaced by Business Partner (BUT000). Tcodes XD01/XK01 disabled by default. | HIGH | Run BP migration via transaction FLCU01 (customers) and FLCU02 (vendors); validate all custom code reading KNA1/LFA1 directly |
| SI-FI-004 | FI-GL | **New G/L replaces Classic G/L:** Document splitting, real-time segment reporting, and ledger approach are mandatory. Classic G/L (single ledger) is not supported. | HIGH | Ensure New G/L was active in ECC before migration; if not, activate first; validate document splitting configuration |
| SI-FI-005 | FI-TX | **Tax procedure simplification:** Condition-based tax calculation replaces formula-based in some scenarios; integration with SAP Tax Service (BTP) for S/4HANA Cloud. | MEDIUM | Review tax procedure type (TAXEUR/TAXUS); test all tax-relevant transactions; validate external tax system interfaces |
| SI-FI-006 | FI-GL | **Profit Center Accounting integrated into GL:** Separate PCA (EC-PCA) module removed; profit center line items written directly to ACDOCA. EC-PCA reports replaced by CO-PA/margin analysis. | HIGH | Disable EC-PCA activation; migrate profit center planning to CO-CEL or CO-PA; update profit center reports |
| SI-FI-007 | FI-AP/AR | **Correspondence (dunning/statements) via Output Management:** Classic correspondence (F.61, F.62) replaced by new output management framework using BRF+. | MEDIUM | Configure new output management; test dunning runs; update customer-specific correspondence templates |
| SI-FI-008 | FI-TR | **Cash and Liquidity Management redesigned:** Classic Liquidity Planner and Cash Management replaced by SAP Cash Management (powered by HANA); new tables FCLM_BAL, FCLM_FLOW. | MEDIUM | Activate SAP Cash Management (Fiori-based); migrate bank statements; validate bank account management |

### CO — Controlling

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-CO-001 | CO-PA | **Margin Analysis replaces Classic CO-PA (account-based preferred):** Costing-based CO-PA still available but account-based is standard in S/4HANA and integrates with ACDOCA. | HIGH | Decide on CO-PA type early; if costing-based is required, validate KEPH/CE1xxxx table usage in custom code |
| SI-CO-002 | CO-PC | **Material Ledger activation mandatory:** ML must be active for all plants. Actual costing integration changes price determination logic. | HIGH | Activate ML in system conversion; run ML data migration; validate costing run sequence and timing |
| SI-CO-003 | CO-OM | **Cost element master unified with G/L account:** Separate cost element master (KA01/KA02) removed — cost elements are now G/L accounts with controlling properties. | HIGH | Validate all KA01 mass maintenance; ensure G/L account master includes controlling relevance flag; update cost element reports |
| SI-CO-004 | CO-CCA | **Activity-based cost allocation in ACDOCA:** Overhead assessment and distribution cycles still exist but write to ACDOCA; CO-OM and FI are always reconciled. | MEDIUM | Validate cycle run results post-migration; check KKRO reconciliation ledger no longer needed |

### MM — Materials Management

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-MM-001 | MM-IM | **MATDOC replaces MKPF/MSEG:** Material documents stored in MATDOC table. MKPF and MSEG become compatibility views (read-only, potential performance impact). | HIGH | Replace all custom code reading MKPF/MSEG with I_GoodsMovement CDS view or MATDOC direct access; test all inventory reports |
| SI-MM-002 | MM-PUR | **Vendor master replaced by Business Partner:** See SI-FI-003 — same change affects MM. LFA1/LFB1 are compatibility views. ME21N vendor assignment via BP number. | HIGH | See SI-FI-003 migration action — shared migration activity |
| SI-MM-003 | MM-IM | **Batch management simplification:** Batch classification structure changed; MCHA/MCH1/MCHB tables restructured. Batch-specific unit of measure handling updated. | MEDIUM | Validate batch classification hierarchy; test batch split in goods movement; check WM/EWM batch integration |
| SI-MM-004 | MM-CBD | **Commodity Pricing Engine (CPE) replaces formula pricing:** Classic formula-based commodity pricing removed; CPE is the replacement for commodity-intensive industries. | MEDIUM | Assess if commodity pricing formulas are in scope; activate CPE if required; migrate formula definitions |
| SI-MM-005 | MM-IV | **Invoice Verification redesigned:** MR8M for reversal deprecated in favor of Fiori-based invoice management; Logistics Invoice Verification (MIRO) still available but output management changed. | MEDIUM | Update output management for invoice documents; test reversal workflow; validate tolerance key configuration |
| SI-MM-006 | MM | **Material number length extension (up to 40 chars):** Default material number length remains 18 chars but can be extended to 40. Extension has cross-system impact (IDoc, interfaces, print forms). | LOW | Decide material number length strategy early; if extending, update all interfaces and forms; note: cannot be reduced after extension |

### SD — Sales & Distribution

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-SD-001 | SD/FI | **Integrated Credit Management (FIN-FSCM-CR) mandatory:** Classic credit management (FD32/OVA8) replaced by SAP Credit Management integrated with Financial Risk Management. New tables FDN_CREDITSEGMENT. | HIGH | Activate FIN-FSCM-CR; migrate credit master data via F.28 (credit limit migration); reconfigure credit checks in SD; train credit controllers |
| SI-SD-002 | SD-ATP | **Advanced ATP (aATP) replaces classic ATP:** Classic availability check (MTVFP) replaced by aATP with product allocation, backorder processing (BOP), and rules-based ATP. | HIGH | Activate aATP (requires activation switch); migrate product allocation data; reconfigure ATP checking rules; test ATP at sales order entry |
| SI-SD-003 | SD | **Customer master replaced by Business Partner:** See SI-FI-003 — KNA1/KNVV are compatibility views. | HIGH | See SI-FI-003 — shared migration |
| SI-SD-004 | SD | **Output management framework:** NACE-based output determination replaced by condition technique + BRF+ for forms and messages. Smart Forms/SAPscript → Adobe Forms or BTP Document Management. | MEDIUM | Inventory all SD output types (order confirmations, delivery notes, billing); migrate to new output management framework; test all output channels (email, EDI, print) |
| SI-SD-005 | SD-BIL | **Revenue Recognition via ASC 606 / IFRS 15:** New revenue recognition (VKOA replaced by RAR — Revenue Accounting and Reporting) for applicable industries. | MEDIUM | Assess if IFRS 15 compliance is required; activate RAR if yes; significant configuration and training investment |
| SI-SD-006 | SD | **Rebate processing deprecated:** Classic SD rebate processing (VBOW) replaced by Settlement Management (FS-BP-PM) in S/4HANA 2020+. | HIGH | Migrate open rebate agreements to Settlement Management before go-live; test settlement runs; retrain sales accounting team |

### PP — Production Planning

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-PP-001 | PP | **Predictive MRP (pMRP) replaces classic MRP:** Classic MD01 batch MRP replaced by pMRP (MD01N) with parallel processing and material segmentation. Classic MRP still available as fallback. | HIGH | Switch to MD01N cockpit; review MRP controller assignments; validate MRP results parity; train planners on new UI |
| SI-PP-002 | PP/DS | **Embedded PP/DS replaces standalone APO-PP/DS:** PP/DS capacity planning embedded in S/4HANA; separate APO system for PP/DS no longer required (APO APO still available via separate license). | MEDIUM | Activate embedded PP/DS if in scope; migrate master data (resources, PPMs); validate planning results against APO output |
| SI-PP-003 | PP | **Production orders use ACDOCA for cost collection:** PP cost objects write directly to ACDOCA; separate CO-PC settlement to ProfitCenter in real time. COSS/COSP compatibility views available. | MEDIUM | Validate production order settlement configuration; test actual cost flow from production to ACDOCA; update WIP reports |
| SI-PP-004 | PP | **Kanban redesigned with Fiori:** Classic PKMC Kanban board replaced by Fiori-based Kanban apps. Kanban control cycle tables restructured. | LOW | Retrain Kanban controllers; validate replenishment trigger logic; test Fiori Kanban board with pilot group |

### PM — Plant Maintenance

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-PM-001 | PM | **Asset Intelligence Network (AIN) integration:** Equipment master extended with AIN for IoT-based maintenance. Classic equipment master unchanged but AIN adds new fields and APIs. | LOW | Assess AIN adoption; activate if IoT connectivity required; no mandatory change for classic PM |
| SI-PM-002 | PM/FI | **Work Order cost integration via ACDOCA:** PM order actual costs write directly to ACDOCA; classic CO line item tables are compatibility views. | MEDIUM | Validate PM order settlement; test cost flow from maintenance orders to cost centers in ACDOCA |

### Cross-Module / Data Model

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-CROSS-001 | All | **Business Partner replaces KNA1/LFA1:** Single most impactful SI — affects FI, SD, MM, and all interfaces that pass customer/vendor numbers. | HIGH | Central BP migration project; update all interfaces (IDoc, RFC, APIs, print forms); retrain master data team |
| SI-CROSS-002 | All | **Compatibility views for removed tables:** SAP provides compatibility views for BSEG, MKPF/MSEG, KNA1, LFA1, COEP, etc. Custom code reading these views may work but with performance degradation. | HIGH | Do not rely on compatibility views long-term; replace with CDS views or released APIs; treat view usage as technical debt |
| SI-CROSS-003 | FI/CO | **Real-time reconciliation FI-CO:** The FI-CO reconciliation ledger (GLPCA, GLFUNCT) is removed — FI and CO are always in sync via ACDOCA. | HIGH | Remove reconciliation postings (KE5T); validate that CO-FI reconciliation delta is zero before migration |
| SI-CROSS-004 | All | **Pool and cluster tables removed:** Physical tables RFBLG (FI cluster), PCL1/PCL2 (HR clusters) are dissolved into transparent tables or HANA columnar storage. | HIGH | No custom direct reads of pool/cluster tables allowed; use released APIs or function modules |
| SI-CROSS-005 | All | **Custom code using function modules marked "not to be released":** Many classic BAPIs and function modules are flagged as non-cloud in ATC checks. | HIGH | Run ATC with ABAP_CLOUD_READINESS check variant; remediate all findings before go-live; prioritize based on usage frequency |
| SI-CROSS-006 | All | **DDIC type changes — currency fields:** Currency fields in ACDOCA use CURR with 2 decimal reference fields changed. Custom currency fields must align. | MEDIUM | Review all custom currency fields; update CURR references if non-standard decimal handling used |

---

### EWM — Extended Warehouse Management

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-EWM-001 | EWM | **Embedded EWM replaces decentralized EWM (SCM):** EWM is delivered natively in S/4HANA 1709+; separate SCM system for EWM is no longer required for new deployments. | HIGH | Assess EWM integration model (embedded vs. decentralized); for migrations from SCM-based EWM, use SAP-provided migration tools for warehouse structure and master data |
| SI-EWM-002 | EWM/MM | **Warehouse Management (LE-WM) deprecated:** Classic WM (LGPLA, LQUA tables) is not strategic — SAP strongly recommends migration to EWM. LE-WM maintained for existing customers but no new functional development. | MEDIUM | Roadmap LE-WM to EWM migration; do not extend classic WM with new developments; assess EWM activation timeline |

### QM — Quality Management

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-QM-001 | QM | **Quality Management in Procurement integrated:** QM in Procurement integrates directly with MM purchasing via Fiori-based inspection processes; classic QM notification output management changed. | LOW | Update QM output management configuration; test inspection lot creation from MIGO; validate usage decision workflow |

### HCM / HR

| SI Number | Module | Description | Impact Level | Migration Action |
|-----------|--------|-------------|-------------|-----------------|
| SI-HR-001 | HCM | **SAP HCM on S/4HANA — limited scope:** Core HR functionality available but SAP's strategic direction is SuccessFactors Employee Central for new implementations. Existing HCM customers can continue but no major new features. | MEDIUM | Assess HCM vs. SF strategy early in project; if HCM on S/4HANA, validate all HR infotypes (PA30) and payroll schema changes |
| SI-HR-002 | HCM | **Concurrent Employment redesigned:** Concurrent employment (multiple employment records per person) simplified; PERNR relationship to Business Partner changed. | LOW | Validate concurrent employment scenarios; test payroll run with concurrent employment active |

---

## Key Tables Affected by Simplification Items

| Old Table (ECC) | New Table / View (S/4HANA) | Simplification Item |
|----------------|--------------------------|-------------------|
| BSEG | ACDOCA (compatibility view: BSEG) | SI-FI-001 |
| BKPF | ACDOCA header fields + BKPF (unchanged) | SI-FI-001 |
| FAGLFLEXA | ACDOCA (compatibility view) | SI-FI-001 |
| MKPF / MSEG | MATDOC (compatibility views: MKPF, MSEG) | SI-MM-001 |
| KNA1 / KNVV | BUT000 + BUT100 (BP tables; KNA1 is compatibility view) | SI-FI-003 |
| LFA1 / LFB1 | BUT000 + BUT100 (BP tables; LFA1 is compatibility view) | SI-FI-003 |
| ANLA / ANLC | FAAT_PLAN_VALUES, FAAT_DOC_IT (new AA tables) | SI-FI-002 |
| GLPCA (PCA) | ACDOCA with profit center field | SI-FI-006 |
| COEP | ACDOCA (compatibility view: COEP) | SI-CO-004 |
| CE1xxxx | ACDOCA with account-based CO-PA fields | SI-CO-001 |
| KEPH | No direct replacement — use CDS views over ACDOCA | SI-CO-001 |

---

## Simplification Item Priority Sequence for Projects

1. **Phase 1 — Readiness (Before Design):** Run Readiness Check (2399707); review all HIGH items for in-scope modules
2. **Phase 2 — Design:** For each HIGH item, document the "as-is", the S/4HANA replacement, and the delta
3. **Phase 3 — Build:** Remediate custom code (ATC findings); configure S/4HANA replacement functions
4. **Phase 4 — Test:** Validate parity of business outcomes (not UI parity) in integration test
5. **Phase 5 — Training:** Update all job aids and training materials to reflect new processes

---

## Version Notes

| S/4HANA Release | Key New Simplification Items |
|----------------|------------------------------|
| 1610 | Universal Journal, New AA, Business Partner mandatory introduced |
| 1709 | MATDOC replaces MKPF/MSEG; aATP available |
| 1809 | Rebate deprecation announced; Margin Analysis preferred |
| 2020 | Settlement Management replaces SD Rebates; pMRP generally available |
| 2021 | Compatibility views performance warnings increase |
| 2022 | Additional classic CO-PA features deprecated |
| 2023 | Several previously optional simplifications become mandatory for new implementations |
