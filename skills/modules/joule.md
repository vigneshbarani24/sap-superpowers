---
name: joule
description: Use when working with SAP Joule AI assistant — Joule capabilities and architecture, Joule in S/4HANA Cloud, Joule in SuccessFactors, Joule in Ariba, Joule in BTP, Joule extensibility, natural language transaction execution, or understanding how Joule and SAP Superpowers complement each other.
---

# SAP Joule

This skill enforces correct understanding of Joule's capabilities, limitations, and positioning — ensuring that Joule-generated transactions are always verified before confirming, complex multi-step processes are not delegated to Joule without verification, and consultants understand exactly where Joule's scope ends and SAP Superpowers begins.

## Content Routing

| Topic | Section |
|-------|---------|
| Joule architecture | Architecture and Capabilities |
| Joule in S/4HANA Cloud | Joule in S/4HANA Cloud |
| Joule in SuccessFactors | Joule in SuccessFactors |
| Joule in Ariba and other apps | Joule in Other SAP Applications |
| Joule in BTP | Joule in BTP |
| Joule extensibility | Joule Extensibility |
| Joule vs. Superpowers | Joule vs. SAP Superpowers Positioning |
| Joule API integration | Joule API Integration Patterns |

## Iron Laws

1. **ALWAYS VERIFY JOULE-GENERATED TRANSACTIONS BEFORE CONFIRMING.** Joule interprets natural language and maps it to SAP transactions. Misinterpretation of ambiguous input produces incorrect transactions. Every Joule-generated action (PO creation, employee change, payment release) must be reviewed by the user before execution. Joule proposes; the user confirms.
2. **NEVER RELY ON JOULE FOR COMPLEX MULTI-STEP PROCESSES WITHOUT VERIFICATION.** Joule excels at single-step queries and simple transactional tasks. Multi-step processes (month-end close, migration cutover, complex configuration) require process orchestration that exceeds Joule's current scope. Use Joule for individual steps; use process skills for orchestration.
3. **UNDERSTAND JOULE'S SCOPE LIMITATIONS PER APPLICATION.** Joule's capabilities differ by SAP application and release level. Joule in S/4HANA Cloud Public Edition has different capabilities than Joule in SuccessFactors or Joule in BTP. Never assume a capability exists in one application because it works in another.
4. **NEVER TREAT JOULE AS A REPLACEMENT FOR SAP EXPERTISE.** Joule assists users with transaction execution and information retrieval. It does not provide consulting judgment — system design, process optimization, risk assessment, or architecture decisions. Joule is an assistant; the SAP consultant is the expert.
5. **ALWAYS CONSIDER AUTHORIZATION IN JOULE INTERACTIONS.** Joule executes actions within the user's authorization scope. A user who cannot execute a transaction manually cannot execute it via Joule. Joule does not bypass SAP authorization — but users may not understand this and attempt unauthorized actions expecting Joule to override.

## Architecture and Capabilities

### What Joule Is
SAP Joule is a generative AI copilot embedded across the SAP application portfolio. It provides natural language interaction for:
- **Information retrieval:** "Show me open purchase orders for plant 1000"
- **Transaction execution:** "Create a purchase order for 100 units of material M-1000"
- **Navigation assistance:** "Take me to the cost center report"
- **Data insights:** "What's the trend in overtime costs this quarter?"
- **Content generation:** "Draft a job description for a senior ABAP developer"

### Technical Architecture
| Component | Description |
|-----------|-------------|
| Joule Foundation | Core NLP/LLM engine hosted on SAP BTP |
| Application Connectors | Pre-built integrations with S/4HANA, SF, Ariba, etc. |
| Context Engine | Application-aware context (current user, module, data scope) |
| Action Framework | Maps natural language to SAP APIs and transactions |
| Authorization Layer | Respects SAP application-level authorization |
| Extensibility Framework | Custom skill development for domain-specific capabilities |

### Supported Interaction Patterns
| Pattern | Example | Complexity |
|---------|---------|------------|
| Query | "Show open sales orders" | Low |
| Navigate | "Open the vendor master for supplier 12345" | Low |
| Create | "Create a purchase requisition for..." | Medium |
| Update | "Change the delivery date on PO 4500012345 to June 15" | Medium |
| Analyze | "Compare actual vs. budget for cost center 1000" | Medium |
| Generate | "Write a business justification for this travel request" | Medium |
| Multi-step | "Process month-end journal entries" | High — not recommended |

## Joule in S/4HANA Cloud

### Available Capabilities
| Area | Capabilities |
|------|-------------|
| Finance | Journal entry creation, trial balance queries, cost center analysis, payment status |
| Procurement | Purchase requisition/order creation, supplier queries, invoice status |
| Sales | Sales order creation, delivery status, customer queries |
| Manufacturing | Production order queries, shop floor insights |
| Asset Management | Equipment queries, maintenance order status |
| General | Navigation assistance, Fiori app search, data exploration |

### S/4HANA Cloud Editions
| Edition | Joule Availability |
|---------|-------------------|
| Public Cloud | GA — fully embedded, automatic updates |
| Private Cloud | Available — requires activation and licensing |
| On-Premise | Limited — selected scenarios via BTP integration |

### Practical Examples
- "Show me overdue invoices for company code 1000" -> Joule queries CDS views and returns results
- "Create a purchase order for 500 units of material RAW-100 from vendor 10001" -> Joule pre-fills PO fields, user reviews and confirms
- "What's the current inventory level for material FG-200 in plant 1000?" -> Joule retrieves real-time stock data

## Joule in SuccessFactors

### Available Capabilities
| Area | Capabilities |
|------|-------------|
| Employee Central | Employee data queries, org chart navigation, position details |
| Recruiting | Job posting assistance, candidate summaries, interview scheduling |
| Learning | Course recommendations, learning history queries |
| Performance | Goal suggestions, review summary generation |
| General HR | Policy questions (with configured knowledge base), leave balance queries |

### Key Use Cases
- Managers: "Show me the team's time-off schedule for next month"
- Employees: "What's my remaining vacation balance?"
- Recruiters: "Summarize this candidate's qualifications against the job requirements"
- HR admins: "How many employees in department 5000 are on probation?"

## Joule in Other SAP Applications

### Ariba
- Supplier search and status queries
- Requisition creation assistance
- Contract clause suggestions
- Sourcing event status

### Concur
- Expense report status queries
- Policy guidance for expense categories
- Travel booking assistance

### SAP Build
- Code generation assistance for ABAP Cloud, CAP, UI5
- Application design suggestions
- Configuration assistance

### SAP Signavio
- Process mining insight queries
- Process variant analysis
- Improvement recommendation summaries

## Joule in BTP

### Developer Assistance
| Capability | Description |
|------------|-------------|
| Code generation | ABAP Cloud, CAP (Node.js/Java), UI5 code snippets |
| Code explanation | Explain existing ABAP/CAP code in natural language |
| Test generation | Generate unit test cases from code |
| Error assistance | Analyze error messages and suggest fixes |
| Documentation | Generate technical documentation from code |

### BTP-Specific Use Cases
- "Generate a CDS view for sales order analytics with currency conversion"
- "Explain this ABAP class and its dependencies"
- "Create a CAP service for managing customer complaints"
- "Why is this OData service returning a 403 error?"

## Joule Extensibility

### Custom Joule Skills
Organizations can extend Joule with custom skills for domain-specific scenarios.

### Extension Architecture
| Component | Purpose |
|-----------|---------|
| Skill definition | Describe what the custom skill does and when it triggers |
| Intent mapping | Map natural language patterns to custom skill activation |
| Action implementation | CAP-based service implementing the skill's logic |
| Response templates | Define how Joule presents results to the user |

### Extension Scenarios
- Company-specific transaction shortcuts ("Create a FICO posting for intercompany" maps to company-specific process)
- Domain terminology mapping ("Run the weekly flash report" triggers a specific analytical query)
- Custom approval workflows ("Approve all pending time entries for my team")
- Integration with non-SAP systems via BTP destination services

### Extension Limitations
- Custom skills cannot bypass application authorization
- Response time requirements (skills must respond within timeout)
- Custom skills go through SAP review for marketplace publication
- Training data for custom intents requires careful curation to avoid conflicts with standard skills

## Joule vs. SAP Superpowers Positioning

### Complementary Roles
| Dimension | Joule | SAP Superpowers |
|-----------|-------|-----------------|
| **User** | End user, business user, developer | SAP consultant, architect, project team |
| **Context** | Inside SAP applications (embedded) | Inside IDE/CLI (development environment) |
| **Purpose** | Execute transactions, retrieve info | Design solutions, enforce methodology |
| **Interaction** | Natural language to SAP actions | Behavior-shaping skills with Iron Laws |
| **Scope** | Single-step and simple multi-step | Full project lifecycle, complex processes |
| **Knowledge** | Application-specific, real-time data | SAP consulting methodology, best practices |
| **Output** | Transaction results, data answers | Deliverables, assessments, code reviews |
| **Quality control** | User confirmation of proposed actions | Hard gates, verification checklists, red flags |

### When to Use Which
| Scenario | Tool |
|----------|------|
| Create a purchase order | Joule |
| Design the procurement process for a new S/4HANA implementation | SAP Superpowers |
| Check an employee's leave balance | Joule |
| Design the SuccessFactors RBP model for a global rollout | SAP Superpowers |
| Navigate to a Fiori app | Joule |
| Review ABAP code for clean core compliance | SAP Superpowers |
| Run a standard report | Joule |
| Estimate effort for an S/4HANA migration project | SAP Superpowers |
| Generate a CAP code snippet | Joule |
| Design the integration architecture between S/4HANA and SuccessFactors | SAP Superpowers |

### Integration Potential
Joule and SAP Superpowers can work together:
- Superpowers designs the process; Joule helps execute individual transactions
- Superpowers generates configuration specs; Joule assists with navigation to config screens
- Superpowers produces test cases; Joule helps run individual test transactions
- Superpowers reviews code; Joule generates code fixes

## Joule API Integration Patterns

### Embedding Joule in Custom Applications
| Pattern | Description |
|---------|-------------|
| BTP AI Core | Host custom AI models that Joule can invoke |
| SAP Build Apps | Embed Joule chat in custom Fiori/UI5 applications |
| CAP integration | Invoke Joule capabilities from CAP services |
| Destination services | Connect Joule to external data via BTP destinations |

### Key Considerations
- **Latency:** Joule responses involve LLM processing; plan for 2-5 second response times
- **Token limits:** Complex queries may hit context window limits; design concise prompts
- **Availability:** Joule availability follows SAP BTP SLA; plan for occasional unavailability
- **Data residency:** Joule processing occurs in the user's SAP data center region
- **Cost:** Joule is licensed per user/per application; factor into project cost estimates

## Best Practices

1. **Train users on verification** — Joule is assistive, not autonomous; users must review before confirming
2. **Start with high-frequency simple tasks** — Joule adoption improves when users see immediate value for routine tasks
3. **Document Joule capabilities per application** — prevent user frustration from trying unsupported scenarios
4. **Monitor Joule usage analytics** — understand adoption patterns and common failure scenarios
5. **Combine with SAP Superpowers** — use Joule for transaction execution, Superpowers for consulting methodology

## Anti-Patterns

- Expecting Joule to replace SAP training (Joule assists; it does not teach SAP concepts)
- Using Joule for mass transactions (designed for interactive single-user scenarios)
- Assuming Joule capabilities are identical across all SAP applications
- Bypassing verification for Joule-generated transactions ("Joule said it, so it must be right")
- Treating Joule as a consulting advisor (Joule retrieves and executes; it does not design or strategize)

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Correct Joule capability identified for the specific SAP application and scenario
- [ ] Application-specific scope limitations acknowledged
- [ ] Verification requirements stated (user must review Joule output before confirmation)
- [ ] Complementary role with SAP Superpowers clarified where relevant
- [ ] Authorization implications addressed (Joule operates within user's auth scope)
- [ ] Extensibility approach defined if custom Joule skills are discussed

**Evidence required:** Specific Joule capabilities per application, scope boundaries, verification requirements, and positioning relative to SAP Superpowers — not generic AI assistant descriptions.

## Next Skill

After completing this skill, invoke:
- `btp` — When Joule extensibility, custom skills, or BTP integration is the focus
- `using-sap-superpowers` — When consultant-side methodology and process design is needed (beyond Joule's scope)
- Any module skill — When the specific SAP application context requires deeper functional knowledge

## Cross-References

- `btp` — Joule foundation on BTP, custom skill development, AI Core integration
- `abap-cloud` — Joule developer assistance for ABAP Cloud development
- `sf` — Joule in SuccessFactors scenarios
- `ariba` — Joule in procurement scenarios
- `using-sap-superpowers` — Complementary positioning: Superpowers for consulting, Joule for execution
