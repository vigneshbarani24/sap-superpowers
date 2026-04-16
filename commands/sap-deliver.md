---
name: sap-deliver
description: Run the SAP Delivery Factory for a specific SAP Activate phase. Produces all deliverables for that phase with quality scoring.
---

# /sap-deliver

Runs the SAP Delivery Factory for a specified SAP Activate phase.

## Usage

```
/sap-deliver <phase> [--industry <name>] [--country <name>] [--modules <list>]
```

### Phases
| Phase | Deliverables | Description |
|-------|-------------|-------------|
| `discover` | 5 | Project charter, stakeholder map, requirements, risks, scope |
| `prepare` | 5 | Estimation, architecture, change management, business case, plan |
| `explore` | 6 | Fit/gap, process designs, functional specs, migration, testing, integration |
| `realize` | 6 | Technical specs, code, unit tests, code review, SIT, training |
| `deploy` | 5 | Data migration, cutover, go-live readiness, UAT, transport release |
| `run` | 5 | Hypercare, status reports, value realization, lessons learned, knowledge transfer |
| `status` | — | Show current project delivery status across all phases |

### Examples
```
/sap-deliver discover
/sap-deliver prepare --industry retail --country germany --modules SD,MM,FI
/sap-deliver status
/sap-deliver explore
```

## What It Does

1. Loads project context (industry, country, SAP version, in-scope modules)
2. Invokes the `delivery-factory` skill for the specified phase
3. Chains the required skills in dependency order
4. Dispatches agents in parallel where possible
5. Produces all phase deliverables with quality scores
6. Reports phase status

## Output

Creates a `deliverables/` directory in the project with phase-organized artifacts:

```
deliverables/
├── discover/
│   ├── project-charter.md
│   ├── stakeholder-raci.md
│   ├── requirements.md
│   ├── risk-register.md
│   └── scope-definition.md
├── prepare/
│   ├── effort-estimate.md
│   ├── solution-architecture.md
│   ├── change-management-plan.md
│   ├── business-case.md
│   └── project-plan.md
└── factory-status.md
```

## Skill Chain

This command invokes: `delivery-factory` → which orchestrates all phase-specific skills.
