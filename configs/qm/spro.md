# SPRO Configuration: Quality Management (QM)

## Key Configuration Areas

### Basic Settings
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Quality Management in Procurement | SPRO > Quality Management > Quality Management in Procurement > Define QM Control in Procurement | QMAT | Activates QM for material/plant; controls inspection lot creation at goods receipt |
| Inspection Types | SPRO > Quality Management > Quality Planning > Inspection Planning > Maintain Inspection Types | TQ30 | 01 (GR from vendor), 02 (GR from production), 03 (in-process), 04 (final inspection), 08 (stock transfer), 89 (recurring) |
| Inspection Lot Origins | SPRO > Quality Management > Quality Planning > Inspection Planning > Define Inspection Lot Origin | TQ76 | Controls which business events trigger automatic inspection lot creation |
| Catalog Types for QM | SPRO > Quality Management > Quality Notifications > Notification Creation > Define Catalog Types | QPCT | 1 (defect types), 3 (causes), 5 (corrective actions), 9 (defect locations) |
| Sample Management | SPRO > Quality Management > Quality Planning > Sample Management > Define Sampling Procedures | QDEB | Fixed sample, percentage, sampling scheme (AQL-based skip lot) — controls inspection scope |
| Number Ranges for QM Objects | SPRO > Quality Management > Quality Planning > Basic Data > Define Number Ranges for Inspection Lots | NRIV (QM_LOSNR) | Internal number ranges for inspection lots, quality notifications, and quality certificates |

### Quality Planning
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Master Inspection Characteristics | SPRO > Quality Management > Quality Planning > Inspection Planning > Define Master Inspection Characteristics | QPMK | Quantitative and qualitative characteristics; tolerance limits, units, and catalogs |
| Inspection Plans | SPRO > Quality Management > Quality Planning > Inspection Planning > Define Task List Types | PLKO (PLNTY = Q) | Type Q inspection plans; linked to material/plant for automatic plan selection |
| Sampling Procedures | SPRO > Quality Management > Quality Planning > Sample Management > Define Sampling Procedures | QDEB | Fixed, percentage, or standards-based (AQL) sampling with sample sizes and acceptance numbers |
| Sampling Schemes | SPRO > Quality Management > Quality Planning > Sample Management > Define Sampling Schemes | QDEA | Tightened, normal, reduced inspection levels; automatic stage switching based on history |
| Dynamic Modification Rule | SPRO > Quality Management > Quality Planning > Inspection Planning > Define Dynamic Modification Rules | QDMR | Automates inspection severity changes based on vendor/material quality history (skip lot logic) |
| Inspection Lot Quantities | SPRO > Quality Management > Quality Planning > Inspection Planning > Define How Inspection Lot Quantity Is Determined | TQ70 | Controls whether lot quantity comes from PO, delivery, or production order quantity |

### Quality Inspection
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Results Recording | SPRO > Quality Management > Quality Inspection > Results Recording > Define Settings for Results Recording | TQ70R | Single value, summarized, class recording — controls how inspection results are entered |
| Usage Decision | SPRO > Quality Management > Quality Inspection > Inspection Lot Completion > Usage Decision > Define Usage Decision Codes | TQ72 | Accept, reject, rework, scrap — triggers stock posting and quality score update |
| Follow-Up Actions | SPRO > Quality Management > Quality Inspection > Inspection Lot Completion > Usage Decision > Define Follow-Up Actions | TQ76F | Post to unrestricted, blocked, returns, scrap stock; create notification; trigger vendor evaluation update |
| Quality Score | SPRO > Quality Management > Quality Inspection > Inspection Lot Completion > Define Quality Score Procedure | TQ73 | Calculates overall quality score from individual characteristic results; weighted or unweighted |
| Stock Posting after Usage Decision | SPRO > Quality Management > Quality Inspection > Inspection Lot Completion > Define Stock Posting | TQ74 | Movement types 321 (QI to unrestricted), 343 (QI to blocked), 350 (QI to returns) |
| Defect Recording | SPRO > Quality Management > Quality Inspection > Results Recording > Defect Recording > Define Defect Types | QPCT (KatArt = 1) | Defect catalogs linked to inspection characteristics for structured defect capture |

### Quality Notifications
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Notification Types | SPRO > Quality Management > Quality Notifications > Notification Creation > Define Notification Types | TQ80 | Q1 (customer complaint), Q2 (complaint against vendor), Q3 (internal problem report) |
| Response Monitoring | SPRO > Quality Management > Quality Notifications > Notification Processing > Response Monitoring > Define Response Profile | TQ80R | Required completion time, escalation rules, and priority-based deadlines |
| Task Determination | SPRO > Quality Management > Quality Notifications > Notification Processing > Tasks > Define Task Types | TQ80T | Standard tasks automatically assigned based on notification type and defect code |
| Partner Determination | SPRO > Quality Management > Quality Notifications > Notification Processing > Partner Determination > Define Partner Determination Procedure | TPAR | Coordinator, responsible person, reported by — notification partner roles |
| Action Box | SPRO > Quality Management > Quality Notifications > Notification Processing > Define Action Box | TQ80A | Predefined action sets for quick notification processing (create order, print, email) |

### Quality Certificates and Vendor Evaluation
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Certificate Profile | SPRO > Quality Management > Quality Certificates > Define Certificate Profile | QCPR | Certificate types (CoA, CoC), output format, and data sources for certificate generation |
| Certificate Categories | SPRO > Quality Management > Quality Certificates > Define Certificate Categories | QCCA | Inbound (from vendor) and outbound (to customer) certificate types |
| Vendor Evaluation Criteria | SPRO > Materials Management > Purchasing > Vendor Evaluation > Define Criteria | T4ME | Quality, price, delivery, service — main and sub-criteria with weightings |
| QM-Specific Vendor Evaluation | SPRO > Quality Management > QM in Procurement > Define Quality Score for Vendor Evaluation | T4ME (QM) | Quality score from inspection lots feeds into vendor evaluation system |
| Certificate Determination | SPRO > Quality Management > Quality Certificates > Define Certificate Determination | QCDE | Rules for automatic certificate requirement based on material, vendor, and customer |

## Critical Configuration Dependencies

1. **Material Master QM view** must be maintained (procurement and inspection data) before QM processes activate
2. **Inspection Types** must be activated in material master before automatic inspection lot creation works
3. **Inspection Plans** must exist and be assigned to material/plant before planned inspections can execute
4. **Catalog Profiles** must be configured before defect codes can be recorded in inspection results or notifications
5. **Usage Decision codes** must be linked to follow-up actions and stock posting rules before inspection completion posts correctly
6. **Sampling Procedures** must be defined before inspection plans can reference them for sample size determination
7. **Quality Info Records** (QIR) must be maintained for vendor/material to activate QM in procurement controls
8. **MM integration** (T156 movement type 103 to QI stock) must be configured for goods receipt to inspection stock to work

## Common Configuration Mistakes

1. **Inspection type not activated in material master** — Configuring inspection types in SPRO but forgetting to activate them in the material master QM view, so no inspection lots are created at goods receipt or production.
2. **Missing follow-up actions on usage decisions** — Defining usage decision codes without linking stock posting rules, so inspection lot completion does not move stock from quality inspection to unrestricted or blocked.
3. **Dynamic modification rule not assigned** — Setting up skip-lot or reduced inspection logic without assigning the dynamic modification rule to the material/vendor combination in the quality info record.
4. **Catalog codes not maintained for notification types** — Custom QM notification types created without linked catalog profiles, preventing users from recording structured defect, cause, and action data.
5. **Sample size procedure mismatch** — Using AQL-based sampling schemes without configuring the correct inspection level and AQL values, resulting in sample sizes that are too large or too small for the business requirement.
