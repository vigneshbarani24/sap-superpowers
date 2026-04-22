# SPRO Configuration: Human Capital Management (HCM)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Personnel Area | SPRO > Enterprise Structure > Definition > Human Resource Management > Personnel Areas > Define Personnel Areas | T500P | Org unit grouping employees by location; links to company code for payroll posting |
| Personnel Subarea | SPRO > Enterprise Structure > Definition > Human Resource Management > Personnel Subareas > Define Personnel Subareas | T001P | Subdivision of personnel area; controls pay scale, public holiday calendar, and wage types |
| Employee Group | SPRO > Enterprise Structure > Definition > Human Resource Management > Employee Groups > Define Employee Groups | T501 | Active (1), retiree (2), external (3) — highest-level employee classification |
| Employee Subgroup | SPRO > Enterprise Structure > Definition > Human Resource Management > Employee Subgroups > Define Employee Subgroups | T503K | Salaried (DK), hourly (DL), part-time — controls pay scale structure and wage type permissibility |
| Payroll Area | SPRO > Enterprise Structure > Definition > Human Resource Management > Payroll Areas > Define Payroll Areas | T549A | Groups employees by payroll run frequency (monthly, bi-weekly, weekly) |
| Assign Personnel Area to Company Code | SPRO > Enterprise Structure > Assignment > Human Resource Management > Assign Personnel Area to Company Code | T500P (BUKRS) | Links HCM personnel area to FI company code for accounting integration |
| Organizational Key | SPRO > Enterprise Structure > Assignment > Human Resource Management > Define Organizational Key | T527O | Combination of enterprise structure fields used for authorization checks |

### Personnel Administration
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Infotype Configuration | SPRO > Personnel Management > Personnel Administration > Customizing Procedures > Infotypes > Define Infotype Properties | T582A | Controls time constraint, retroactivity, and screen behavior per infotype |
| Personnel Actions | SPRO > Personnel Management > Personnel Administration > Customizing Procedures > Actions > Define Action Types | T529A | Hiring (01), transfer (02), termination (03), organizational reassignment (04) — drives infotype sequence |
| Action Reasons | SPRO > Personnel Management > Personnel Administration > Customizing Procedures > Actions > Define Reasons for Actions | T530 | Voluntary resignation, retirement, restructuring — linked to action types for reporting |
| Number Ranges for Personnel Numbers | SPRO > Personnel Management > Personnel Administration > Basic Settings > Maintain Number Ranges for Personnel Numbers | NRIV (RP_PERNR) | Internal/external number ranges per employee group or personnel area |
| Feature PINCH | SPRO > Personnel Management > Personnel Administration > Basic Settings > Define Features > PINCH | T549D | Decision tree that controls default infotype screen based on employee attributes |
| Dynamic Actions | SPRO > Personnel Management > Personnel Administration > Customizing Procedures > Dynamic Actions > Define Dynamic Actions | T588Z | Automatic infotype updates triggered by changes to other infotypes (e.g., address change triggers tax area update) |
| Infotype Menus | SPRO > Personnel Management > Personnel Administration > Customizing Procedures > Infotypes > Define Infotype Menus | T588M | Groups infotypes into logical menus for different user roles (PA20/PA30 screens) |

### Organizational Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Object Types | SPRO > Personnel Management > Organizational Management > Basic Settings > Data Model Enhancement > Maintain Object Types | T778O | O (org unit), S (position), C (job), P (person), T (task) — OM object catalog |
| Plan Version | SPRO > Personnel Management > Organizational Management > Basic Settings > Activate Plan Version | T777D | 01 (active), 02 (planning) — controls which org structure version is operational |
| Number Ranges for OM Objects | SPRO > Personnel Management > Organizational Management > Basic Settings > Maintain Number Ranges | NRIV (HRP1000) | Number ranges per object type for OM objects |
| Relationships | SPRO > Personnel Management > Organizational Management > Basic Settings > Data Model Enhancement > Maintain Relationships | T778V | A003 (belongs to), B003 (incorporates), A008 (holder), A007 (describes) — object linkages |
| Integration Switch (PLOGI ORGA) | SPRO > Personnel Management > Organizational Management > Integration > Set Up Integration with Personnel Administration | T77S0 (PLOGI ORGA) | Activates OM-PA integration; position assignment in IT0001 drives org assignment |
| Evaluation Path | SPRO > Personnel Management > Organizational Management > Basic Settings > Maintain Evaluation Paths | T778A | Defines traversal paths through OM hierarchy for reporting and structural authorization |

### Time Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Work Schedules | SPRO > Personnel Management > Time Management > Work Schedules > Define Work Schedule Rules | T508A / T550A | Daily work schedule + period work schedule + work schedule rule — defines planned working time |
| Public Holiday Calendar | SPRO > Personnel Management > Time Management > Work Schedules > Define Public Holiday Calendar | THOCI | Country and region-specific holiday definitions; linked to personnel subarea |
| Absence Types | SPRO > Personnel Management > Time Management > Time Data Recording and Administration > Absences > Define Absence Types | T554S | Vacation, sick leave, maternity — controls counting, quota deduction, and payroll valuation |
| Attendance Types | SPRO > Personnel Management > Time Management > Time Data Recording and Administration > Attendances > Define Attendance Types | T554S | Business trip, training, overtime — positive time recording types |
| Time Quota Types | SPRO > Personnel Management > Time Management > Time Data Recording and Administration > Absences > Define Absence Quota Types | T556A | Annual leave entitlement, sick leave balance — quota generation and deduction rules |
| Time Evaluation (Schema) | SPRO > Personnel Management > Time Management > Time Evaluation > Define Processing Logic (TM04 Schema) | T510S / T555A | Schema TM04 processes time data; personnel calculation rules for overtime, premiums, and valuation |
| Substitution Types | SPRO > Personnel Management > Time Management > Time Data Recording and Administration > Substitutions > Define Substitution Types | T556S | Temporary position/work schedule substitution during absence |

### Payroll
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Payroll Schema | SPRO > Personnel Management > Payroll > Define Payroll Schemas | T52C0 | Country-specific processing schema (e.g., XUSA for US, XDE0 for Germany) |
| Wage Types | SPRO > Personnel Management > Payroll > Define Wage Types > Create Wage Type Catalog | T512W / T512T | Primary wage types (1000-series = basic pay, 2000-series = allowances) — drives calculation and posting |
| Wage Type Permissibility | SPRO > Personnel Management > Payroll > Wage Type Permissibility > Define Wage Type Permissibility for Infotypes | T511 | Controls which wage types are valid per personnel area, employee subgroup, and infotype |
| Pay Scale Structure | SPRO > Personnel Management > Payroll > Define Pay Scale Structure > Define Pay Scale Types and Areas | T510 / T510A | Pay scale type (industry), pay scale area (region), pay scale group (grade), level (step) |
| Symbolic Accounts | SPRO > Personnel Management > Payroll > Reporting for Posting Payroll Results to Accounting > Define Symbolic Accounts | T52EK | Maps wage types to symbolic accounts for FI posting (salaries, taxes, benefits, employer contributions) |
| Posting to Accounting (HR-FI) | SPRO > Personnel Management > Payroll > Reporting for Posting Payroll Results to Accounting > Define Posting to Accounting | T52EL | Maps symbolic accounts to G/L accounts per company code; drives payroll journal entries |

## Critical Configuration Dependencies

1. **Personnel Area** must be assigned to Company Code before any employee master data creation
2. **Personnel Subarea** must be configured with public holiday calendar and pay scale settings before work schedules and payroll work
3. **Employee Group/Subgroup** must be defined before wage type permissibility and action types reference them
4. **Work Schedule Rules** must be fully built (daily > period > rule) before Time Management infotype 0007 can be maintained
5. **Organizational Management objects** (org unit, position, job) must exist before OM-PA integration assigns employees to positions
6. **Wage Type Catalog** must be built and permissibility configured before payroll infotypes (IT0008, IT0014, IT0015) accept entries
7. **Payroll Schema** must be configured for the country before payroll simulation and live runs execute
8. **Symbolic Account and G/L mapping** must be complete before payroll results can post to Financial Accounting

## Common Configuration Mistakes

1. **OM-PA integration activated without data alignment** — Turning on PLOGI ORGA before ensuring every employee has a valid position assignment, causing mass errors in PA infotype 0001.
2. **Work schedule rule not covering all periods** — Missing period work schedule assignments for certain months, causing time evaluation to fail with "No work schedule found" for employees in that period.
3. **Wage type permissibility gaps** — Creating custom wage types without maintaining permissibility for all relevant employee group/subgroup combinations, so the wage type cannot be entered in the infotype.
4. **Retroactive accounting period too short** — Setting the earliest retroactive accounting period (EARLA feature) too restrictively, preventing legitimate backdated corrections from being processed in payroll.
5. **Dynamic actions creating circular updates** — Configuring dynamic actions that trigger each other in a loop, or dynamic actions that overwrite manually entered infotype data during personnel actions.
