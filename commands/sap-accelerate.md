---
name: sap-accelerate
description: Generate a pre-built solution accelerator package for a common SAP end-to-end process. Produces 60% pre-filled deliverables adapted to your industry, country, and SAP version.
---

# /sap-accelerate

Generates a solution accelerator package — pre-built deliverables for common SAP processes.

## Usage

```
/sap-accelerate <process> [--industry <name>] [--country <name>]
```

### Available Accelerators
| Process | Modules | Deliverables |
|---------|---------|-------------|
| `order-to-cash` | SD, FI, TM, EWM | Process flow, fit/gap, FS, config guide, test cases, integration, migration scope |
| `procure-to-pay` | MM, FI, Ariba, QM | Process flow, fit/gap, FS, config guide, test cases, integration, migration scope |
| `record-to-report` | FI, CO, Treasury | Chart of accounts, closing tasks, config guide, test cases, tax logic, audit trail |
| `plan-to-produce` | PP, MM, QM, PM | BOM/routing design, MRP config, production config, QM integration, test cases |
| `hire-to-retire` | HCM, SF, Payroll | Org structure, infotype config, payroll schema, time management, test cases |

### Examples
```
/sap-accelerate order-to-cash
/sap-accelerate procure-to-pay --industry pharma --country germany
/sap-accelerate record-to-report --industry banking --country united-states
```

## What It Does

1. Loads project context and accelerator definition
2. Applies industry variant (industry-specific processes, gaps, customizations)
3. Applies country variant (tax, regulatory, payment, compliance)
4. Generates 7-8 pre-filled deliverable files
5. Marks each deliverable section as "Standard" (pre-filled) or "Client-Specific" (needs input)

## Output

Creates an `accelerator-output/` directory:

```
accelerator-output/order-to-cash/
├── 01-process-flow.md
├── 02-fit-gap-matrix.md
├── 03-functional-spec.md
├── 04-configuration-guide.md
├── 05-test-scenarios.md
├── 06-integration-points.md
├── 07-data-migration-scope.md
└── README.md
```

## Skill Chain

This command invokes: `solution-accelerator` → which leverages module consultant agents + industry/country context.
