---
name: qm
description: Use when working with SAP Quality Management — quality planning (inspection plans, material specs), quality inspection (inspection lots, results recording, usage decisions), quality control (SPC, control charts), quality certificates, quality notifications, or QM integration with MM/PP/SD.
---

# SAP Quality Management (QM)

This skill enforces correct QM implementation practices, ensuring that inspection plans are maintained before procurement and production go-live, usage decisions are never skipped for inspection lots, and quality notifications are always linked to root cause analysis — because a quality notification without a root cause is a complaint, not a corrective action.

## Content Routing

| Topic | Section |
|-------|---------|
| Quality planning | Quality Planning |
| Inspection plans and characteristics | Inspection Plans |
| Quality inspection process | Quality Inspection |
| Usage decisions | Usage Decisions |
| Quality notifications | Quality Notifications |
| Quality certificates | Quality Certificates |
| SPC and control charts | Statistical Process Control |
| Key tables and transactions | Key Tables / Key Transactions |
| Integration with MM, PP, SD | Integration Points |
| S/4HANA quality management | S/4HANA Quality Management |

## Iron Laws

1. **ALWAYS MAINTAIN INSPECTION PLANS BEFORE PROCUREMENT/PRODUCTION GO-LIVE.** Inspection lots are created automatically during goods receipt (MM) and production completion (PP). Without active inspection plans assigned to materials, these inspection lots have no inspection characteristics — making them meaningless checkboxes. Plans first, transactions second.
2. **NEVER SKIP USAGE DECISION FOR INSPECTION LOTS.** The usage decision (QA11) is the formal quality verdict — accept, reject, or conditionally accept. An inspection lot without a usage decision is an open quality item. Open lots block stock (if configured for quality stock), distort inventory figures, and create audit findings.
3. **ALWAYS LINK QUALITY NOTIFICATIONS TO ROOT CAUSE ANALYSIS.** A quality notification (QM01) that records a defect without analyzing its cause (using catalog codes for defect type, cause, and corrective action) is incident logging, not quality management. Every notification must have: defect description, cause code, corrective action, and responsible person.
4. **NEVER CONFIGURE SAMPLING WITHOUT STATISTICAL BASIS.** Sampling procedures define how many units to inspect from a lot. Random sampling without statistical basis (AQL — Acceptable Quality Level, sampling scheme per ISO 2859) produces inspection results that cannot be defended in an audit.
5. **ALWAYS ACTIVATE QM IN MATERIAL MASTER BEFORE EXPECTING INSPECTION LOT CREATION.** Inspection lot creation is triggered by the QM procurement/production view in the material master (inspection type activation). If the QM view is not maintained, no inspection lots are created — regardless of how many inspection plans exist.

## Quality Planning

### Material Specification
Define quality requirements at the material level:
- **Material master QM view:** Activate inspection types (01-goods receipt, 03-in-process, 04-delivery, 08-stock transfer)
- **Material specification (QS21):** Define required characteristic values for a material
- **Inspection setup (QDV1):** Link inspection type to plant/material with detailed control parameters

### Catalog Management
Quality catalogs define standardized code groups for:
| Catalog Type | Purpose | Transaction |
|-------------|---------|-------------|
| 1 — Defect types | What is wrong (scratch, crack, dimension deviation) | QS41 |
| 3 — Defect locations | Where on the item (surface, edge, interior) | QS41 |
| 5 — Causes | Why it happened (tool wear, operator error, material defect) | QS41 |
| 9 — Activities | What corrective action was taken (rework, scrap, sort) | QS41 |
| E — Usage decisions | Possible quality verdicts (accept, reject, conditional) | QS51 |

### Catalog Profiles
Group catalogs into profiles (QS41) and assign to notification types. Ensures consistent coding across plants and quality teams.

## Inspection Plans

### Plan Structure (QP01/QP02/QP03)
```
Inspection Plan Header (material, plant, plan group/counter)
  └── Operation (sequence step — e.g., visual inspection, dimensional check)
      └── Inspection Characteristic (specific measurement — e.g., length, weight, color)
          └── Specification (target value, tolerances, sampling)
```

### Characteristic Types
| Type | Description | Example |
|------|-------------|---------|
| Quantitative | Measured value with tolerances | Length: 100mm +/- 0.5mm |
| Qualitative | Attribute check (pass/fail, code) | Surface: OK / Defective |
| Formula-based | Calculated from other characteristics | Ratio = Length / Width |

### Master Inspection Characteristics (QS21)
Reusable characteristic definitions maintained centrally. Referenced in inspection plans. Changes to master characteristic propagate to all referencing plans.

### Sampling Procedures (QDV2)
| Sampling Type | Description |
|---------------|-------------|
| Fixed sample | Always inspect N units |
| Percentage-based | Inspect X% of lot quantity |
| Sampling scheme | AQL-based per ISO 2859 (single, double, sequential) |
| 100% inspection | Inspect every unit (for critical characteristics) |
| Skip lot | Skip inspection for qualified suppliers (dynamic modification) |

### Dynamic Modification (QDP1/QDP2)
Automatically adjust inspection scope based on quality history:
- Good results -> reduce inspection (tighten skip lot)
- Bad results -> increase inspection (from sampling to 100%)
- Supplier quality score drives inspection level

## Quality Inspection

### Inspection Lot Creation
Inspection lots are created automatically based on triggers:

| Inspection Type | Trigger | Source |
|-----------------|---------|--------|
| 01 — Goods receipt | MIGO goods receipt for purchase order | MM |
| 03 — In-process | Production order confirmation at operation | PP |
| 04 — Goods issue for delivery | Delivery creation for customer | SD |
| 05 — Goods receipt from production | Production order goods receipt | PP |
| 08 — Stock transfer | Stock transfer posting | MM |
| 09 — Recurring inspection | Time-based for stored materials | QM |
| 89 — Physical sample | Laboratory sample inspection | QM |

### Results Recording (QA32/QE01)
| Transaction | Purpose |
|-------------|---------|
| QA32 | Change inspection lot — results recording |
| QE01 | Results recording for inspection point |
| QE51N | Results recording worklist |
| QA33 | Display inspection lot |

Record measured values for each characteristic. System evaluates against specification (target, upper/lower limits). Automatic valuation: characteristic accepted or rejected based on results.

### Defect Recording (QA32/QF01)
Record defects found during inspection with catalog codes:
- Defect type (from catalog 1)
- Defect location (from catalog 3)
- Defect severity (critical, major, minor)
- Quantity defective

## Usage Decisions

### Usage Decision Process (QA11/QA12)
The formal quality verdict for an inspection lot:

| Decision Code | Action | Stock Posting |
|---------------|--------|---------------|
| Accept (A) | Release to unrestricted stock | Quality -> Unrestricted (321) |
| Reject (R) | Block stock or return to supplier | Quality -> Blocked (343) or return |
| Conditional Accept | Accept with deviation documentation | Quality -> Unrestricted with note |
| Scrap | Write off material | Quality -> Scrap (551) |
| Rework | Return for reprocessing | Quality -> Rework (internal) |
| Sample retained | Retain sample, release lot | Quality -> Unrestricted |

### Follow-Up Actions
Usage decisions can trigger automatic follow-up:
- Quality notification creation (for rejected lots)
- Vendor evaluation update (quality score adjustment)
- Dynamic modification rule update (adjust future inspection level)
- Stock posting (automatic goods movement)
- Quality certificate creation

## Quality Notifications

### Notification Types
| Type | Code | Use Case | Transaction |
|------|------|----------|-------------|
| Quality Notification (general) | Q1 | Customer complaint | QM01 |
| Quality Notification (vendor) | Q2 | Supplier quality issue | QM01 |
| Quality Notification (internal) | Q3 | Internal defect report | QM01 |

### Notification Structure
```
Notification Header (reporter, priority, dates)
  └── Items (defect descriptions with catalog codes)
      └── Causes (root cause with catalog codes)
          └── Activities/Tasks (corrective actions with responsible persons and deadlines)
```

### Key Transactions
| Transaction | Purpose |
|-------------|---------|
| QM01 | Create quality notification |
| QM02 | Change quality notification |
| QM03 | Display quality notification |
| QM10 | List of quality notifications |
| QM50 | Notification processing deadline monitoring |

### 8D Report Integration
Quality notifications support the 8D methodology: D1 (Team), D2 (Problem Description), D3 (Containment), D4 (Root Cause), D5 (Corrective Action), D6 (Verification), D7 (Prevention), D8 (Closure). Map notification items, causes, and tasks to 8D steps.

## Quality Certificates

### Certificate Types (QC01/QC02)
| Type | Description |
|------|-------------|
| Inspection certificate | Results from inspection lot |
| Certificate of analysis (CoA) | Detailed analytical results |
| Certificate of conformance (CoC) | Declaration of compliance to spec |
| Mill certificate (3.1) | EN 10204 material test certificate |

### Certificate Processing
- Automatic certificate creation from usage decision
- Certificate output via print, email, EDI
- Certificate profile configuration (QV51) — which characteristics appear
- Inbound certificate processing from suppliers (QC51)

## Statistical Process Control

### Control Charts (QCC0/QCC1)
| Chart Type | Use Case |
|------------|----------|
| X-bar/R | Mean and range for variable data |
| X-bar/S | Mean and standard deviation |
| p-chart | Proportion defective (attribute data) |
| np-chart | Number defective |
| c-chart | Count of defects per unit |
| u-chart | Defects per unit (variable sample size) |

### SPC Configuration
- Define control chart type per inspection characteristic
- Configure control limits (calculated or manual)
- Set rules for out-of-control signals (Western Electric rules)
- Transaction QCC0: Maintain quality control chart

## Key Tables

| Table | Description |
|-------|-------------|
| QALS | Inspection lot header |
| QASR | Inspection lot sample records |
| QAVE | Usage decision header |
| QAMR | Defect items for inspection lot |
| QMEL | Quality notification header |
| QMFE | Quality notification items |
| QMUR | Quality notification causes |
| QMMA | Quality notification activities |
| PLKO | Inspection plan header (task list) |
| PLPO | Inspection plan operations |
| PLMK | Inspection plan characteristics |
| QMAT | Material-inspection type assignment |

## Integration Points

| Integration | Description | Key Process |
|-------------|-------------|-------------|
| QM-MM | Goods receipt inspection | GR triggers inspection lot (type 01); usage decision moves stock |
| QM-MM (vendor eval) | Vendor quality score | Usage decision updates vendor evaluation quality sub-criterion |
| QM-PP | In-process inspection | Production confirmation triggers inspection lot (type 03) |
| QM-PP (final) | Final inspection | Production GR triggers inspection lot (type 05) |
| QM-SD | Delivery inspection | Delivery creation triggers inspection lot (type 04) |
| QM-PM | Maintenance quality | Quality notifications from maintenance findings |
| QM-CO | Quality costs | Inspection and non-conformance costs collected on orders |

## S/4HANA Quality Management

### Key Changes
- **Fiori Apps:** Manage Inspection Lots, Record Inspection Results, Create Quality Notification
- **Embedded Analytics:** Real-time quality KPIs — defect rates, inspection lot status, supplier quality scores
- **Simplified inspection processing:** Streamlined results recording and usage decision UI
- **Integration with SAP DMC:** Digital Manufacturing Cloud for shop floor quality integration
- **Quality Intelligence:** AI-assisted defect detection and pattern recognition (roadmap)

### Key Fiori Apps
| App ID | App Name |
|--------|----------|
| F2674 | Manage Inspection Lots |
| F3859 | Record Inspection Results |
| F2255 | Create Quality Notification |
| F2583 | Monitor Quality |

## Best Practices

1. **Define catalogs before inspection plans** — standardized defect/cause codes are the foundation for quality analytics
2. **Use dynamic modification** — automated inspection level adjustment reduces inspection cost while maintaining quality
3. **Link notifications to CAPA** — corrective and preventive actions must be tracked to closure
4. **Integrate with vendor evaluation** — quality inspection results should automatically influence vendor quality scores
5. **Activate QM view in material master BEFORE go-live** — this is the most common missed step

## Anti-Patterns

- Creating inspection lots without inspection plans (lots with no characteristics are meaningless)
- Leaving usage decisions open (blocks stock, distorts inventory reporting)
- Using free text instead of catalog codes in notifications (prevents trend analysis)
- Skipping sampling procedure configuration (all inspections default to 100% — costly and unnecessary)
- Implementing QM without training production/warehouse staff on results recording

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct QM process identified (planning, inspection, notification, certificate)
- [ ] Material master QM view activation confirmed for relevant materials
- [ ] Inspection type correctly mapped to business trigger (GR, production, delivery)
- [ ] Catalog codes defined for defect types, causes, and corrective actions
- [ ] Integration impacts stated (MM stock posting, PP process order, SD delivery, vendor eval)
- [ ] Usage decision process and follow-up actions addressed

**Evidence required:** Specific transaction codes, catalog configurations, inspection plan structure, and integration triggers — not generic quality management descriptions.

## Next Skill

After completing this skill, invoke:
- `mm` — When goods receipt inspection or vendor evaluation is the focus
- `pp` — When in-process or final inspection during production is needed
- `sd` — When outbound delivery quality checks or customer complaints are the focus

## Cross-References

- `mm` — Goods receipt inspection, vendor evaluation, material master QM view
- `pp` — In-process inspection, production order integration
- `sd` — Delivery inspection, customer complaint quality notifications
- `pm` — Maintenance-triggered quality findings
- `co` — Quality cost collection and analysis
