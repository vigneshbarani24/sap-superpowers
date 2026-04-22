---
name: solution-accelerator
description: Use when the user wants a pre-built, industry-aware solution package for a common SAP end-to-end process. Accelerators provide 60% pre-filled deliverables, pre-mapped process flows, known gap patterns, and proven configuration sequences — cutting weeks of discovery into hours.
---

# Solution Accelerators

Accelerators are pre-built solution packages for the most common SAP end-to-end processes. They are NOT templates — they are **partially-completed deliverables** with industry defaults, known gap patterns, proven configuration paths, and pre-mapped integrations.

**What makes this different from templates:** A template is empty structure. An accelerator is 60% done — with the 60% that consultants copy-paste from their last project anyway. The remaining 40% is client-specific, and that's where the consultant adds value.

## Iron Laws

1. **ACCELERATORS ARE STARTING POINTS, NOT FINISHED PRODUCTS.** Every accelerator output must be reviewed and customized for the client. Shipping an unreviewed accelerator output is shipping someone else's project.

2. **ALWAYS DISCLOSE THE ACCELERATOR.** Tell the client: "We used an accelerator framework for this process area. The industry-standard components are pre-built. All client-specific elements were custom-designed for your requirements."

3. **ACCELERATORS ADAPT TO CONTEXT.** Industry, country, SAP version — the accelerator adjusts its defaults. A retail O2C is different from a pharma O2C.

## Available Accelerators

### Order-to-Cash (O2C)
**Modules:** SD + FI + (optional: TM, EWM, CO-PA)
**Process scope:**

```
Inquiry → Quotation → Sales Order → Delivery → Goods Issue → Billing → Payment → Dunning
```

**Pre-built components:**
- Process flow diagram (10 steps with decision points)
- Fit/Gap matrix with 25 most common gaps
- Document type configuration (OR, RE, CR, DR, SO)
- Pricing procedure with 15 standard condition types
- Output determination for order confirmation, delivery note, invoice
- Credit management integration points
- Revenue recognition rules (IFRS 15)
- Test scenarios (30 standard test cases)

**Industry variants:**
- Retail: POS integration, returns, markdown pricing
- Automotive: Scheduling agreements, JIT, consignment
- Pharma: Serialization, batch determination, sample management

### Procure-to-Pay (P2P)
**Modules:** MM + FI + (optional: Ariba, QM)
**Process scope:**

```
Purchase Requisition → RFQ/Sourcing → Purchase Order → Goods Receipt → Invoice Verification → Payment
```

**Pre-built components:**
- Process flow diagram (8 steps with approval workflows)
- Fit/Gap matrix with 20 most common gaps
- Document type configuration (NB, FO, UB, STO)
- Release strategy for POs (value-based, 3-tier approval)
- Movement types mapping (101, 102, 103, 122)
- Invoice verification tolerances
- Vendor evaluation scoring criteria
- Test scenarios (25 standard test cases)

**Industry variants:**
- Manufacturing: Subcontracting, consignment, scheduling agreements
- Retail: Seasonal procurement, DSD, VMI
- Pharma: GMP vendor qualification, approved manufacturer list

### Record-to-Report (R2R)
**Modules:** FI + CO + (optional: Treasury, Consolidation)
**Process scope:**

```
Journal Entry → Period-End Closing → Financial Statements → Management Reporting → Statutory Reporting
```

**Pre-built components:**
- Chart of accounts design (operational + group + country)
- Period-end closing task list (30 steps sequenced)
- Intercompany reconciliation framework
- Tax determination logic per country
- CO allocation cycles and assessment rules
- Financial statement version configuration
- Audit trail requirements per country
- Test scenarios (20 standard test cases)

**Industry variants:**
- Banking: Parallel accounting (IFRS + local GAAP), hedge accounting
- Manufacturing: WIP settlement, product costing, variance analysis
- Retail: Revenue recognition across channels, gift card accounting

### Plan-to-Produce (P2P-Mfg)
**Modules:** PP + MM + QM + (optional: PM, CO)
**Process scope:**

```
Demand Planning → MRP → Production Order → Shop Floor Execution → Goods Receipt → Quality Inspection → Costing
```

**Pre-built components:**
- BOM and routing structure design
- MRP configuration (lot sizing, scheduling, planning strategies)
- Production order types and control parameters
- Backflushing configuration
- Quality inspection integration (01, 03, 04 inspection types)
- Product cost estimate configuration
- Capacity planning setup
- Test scenarios (25 standard test cases)

**Industry variants:**
- Automotive: Repetitive manufacturing, Kanban, JIT/JIS
- Pharma: Process manufacturing, batch management, GMP compliance
- F&B: Catch weight, co-products, recipe management

### Hire-to-Retire (H2R)
**Modules:** HCM/SF + (optional: Payroll, Time, Benefits)
**Process scope:**

```
Requisition → Hiring → Onboarding → Position Management → Time Recording → Payroll → Separation
```

**Pre-built components:**
- Organizational structure design (enterprise → personnel area → personnel subarea)
- Infotype configuration (PA0001-PA0008 essentials)
- Time management profiles
- Payroll schema overview
- ESS/MSS scenarios
- Country-specific payroll requirements
- Test scenarios (20 standard test cases)

**Country variants:**
- Germany: Kurzarbeit, Betriebsrat, social insurance
- US: FLSA, 401(k), ACA compliance
- India: PF, ESI, gratuity, professional tax
- Brazil: CLT, FGTS, 13th salary

## How Accelerators Work

### Step 1 — Select Accelerator
```
User: /sap-accelerate order-to-cash
```

### Step 2 — Context Loading
Factory loads:
- Industry file (e.g., `industry/retail.md`)
- Country file (e.g., `country/germany.md`)
- SAP version (from `.sap-superpowers/config.json`)
- ABAP release

### Step 3 — Generate Package
The accelerator produces a **deliverable package**:

```
accelerator-output/
├── 01-process-flow.md          # Process diagram with decision points
├── 02-fit-gap-matrix.md        # Pre-filled with known gaps + resolutions
├── 03-functional-spec.md       # Partially filled FS with standard config
├── 04-configuration-guide.md   # SPRO steps with recommended values
├── 05-test-scenarios.md        # Pre-built test cases
├── 06-integration-points.md    # Cross-module touchpoints
├── 07-data-migration-scope.md  # Objects to migrate for this process
└── README.md                   # Package summary with customization notes
```

### Step 4 — Consultant Customizes
The 40% that's client-specific:
- Custom pricing conditions beyond standard
- Client-specific approval workflows
- Non-standard integration requirements
- Industry-specific extensions
- Country-specific regulatory additions

## Verification

- [ ] Correct accelerator selected for the process scope
- [ ] Industry variant applied
- [ ] Country variant applied
- [ ] SAP version/release compatibility verified
- [ ] All deliverable files generated
- [ ] Each deliverable marked as "Accelerator-generated — requires client review"
- [ ] Customization notes document what's standard vs. what needs client input

## Cross-References

- `delivery-factory` — Accelerators feed into factory phase pipelines
- `industry/` — Provides industry-specific variants
- `country/` — Provides country-specific regulatory and tax context
- `configs/` — SPRO references for configuration guidance
- Module consultant agents — Dispatched for module-specific customization
