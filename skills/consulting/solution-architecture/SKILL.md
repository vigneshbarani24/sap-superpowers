---
name: solution-architecture
description: Use when designing SAP solution landscapes, defining integration architecture, making BTP vs on-premise decisions, creating extensibility strategies, or producing solution architecture documents for any SAP implementation.
persona: Solution Architect, Enterprise Architect, BTP Developer
phase: Explore / Realize
---

# SAP Solution Architecture

This skill enforces rigorous, evidence-based SAP solution architecture so that no design is produced without documenting integration points, passing a clean core compliance check, and addressing performance at design time — the three shortcuts that cause production failures.

## Iron Laws

1. **NEVER DESIGN WITHOUT DOCUMENTING INTEGRATION POINTS.** Every component in an SAP landscape touches something else. A design that does not name every interface, protocol, and data flow is incomplete. Incomplete architectures become production incidents.
2. **NEVER SKIP CLEAN CORE COMPLIANCE CHECK.** Every custom extension must be classified against SAP's clean core tiers before design is finalized. Extensions that violate clean core boundaries block cloud migration and increase upgrade cost exponentially.
3. **ALWAYS CONSIDER PERFORMANCE AT DESIGN TIME.** Performance requirements — transaction volumes, peak loads, response time SLAs — must be factored into every architectural decision. "We'll optimize later" has ended more SAP go-lives than any other phrase.
4. **NO BTP DECISION WITHOUT A COMPARISON.** Recommending BTP vs. on-premise extension requires a documented assessment of deployment model, licensing, latency, data residency, and long-term maintainability. Gut feel is not architecture.
5. **NO ARCHITECTURE WITHOUT SECURITY LAYERS.** Every design must address: authentication, authorization (role concept), data encryption in transit and at rest, and network segmentation. Security retrofitted post-go-live costs 5x more.

## Rationalization Table

| Agent Will Try To... | Why It Seems Reasonable | Why It Fails | Counter |
|---|---|---|---|
| Skip interface documentation | "The integrations are well-known" | Undocumented interfaces get missed during testing, cutover, and upgrades. Every interface needs a data flow diagram. | Iron Law 1: Every integration point named with protocol, direction, volume, and error handling before design is approved. |
| Defer clean core assessment | "We'll refactor later if needed" | Technical debt from clean core violations compounds with every SAP update. Retrofit during upgrade costs 3-5x initial build. | Iron Law 2: Clean core tier assigned to every extension at design time. Tier 3 requires written justification and architect sign-off. |
| Design without volume data | "Architecture works regardless of scale" | A design valid for 100 users fails for 10,000. SAP HANA in-memory architecture, buffering, and partitioning decisions are volume-dependent. | Iron Law 3: Transaction volumes and peak concurrency must be documented before architecture is finalized. |
| Recommend BTP reflexively | "BTP is the modern way" | BTP adds latency, licensing cost, and operational complexity. For simple extensions, key user extensibility or in-app customization is faster, cheaper, and safer. | Iron Law 4: Document BTP vs. on-premise trade-off table before recommending BTP. |
| Reuse architecture from previous projects | "This is the same landscape as [client X]" | Every SAP landscape has unique data volumes, org structures, integration ecosystems, and legacy constraints. Reused templates miss client-specific risks. | Verification: Architecture must reference this client's specific systems, modules, and entity counts. |
| Skip disaster recovery design | "DR is an infrastructure decision" | SAP application-layer DR (system replication, backup frequency, RTO/RPO for SAP-specific objects) is an architecture concern, not just infrastructure. | Checklist Step 6: RTO, RPO, and backup strategy are architecture deliverables. |
| Combine data architecture with process design | "Data flows from the process" | Data architecture (master data governance, data residency, archiving strategy, GDPR) is a separate discipline. Conflating it with process design produces gaps in both. | Checklist Step 5: Data architecture section is mandatory and separate from process flows. |

## Red Flags

Watch for these phrases in your own reasoning — each one signals you are about to violate an Iron Law:

- "The integrations are pretty standard..." → You have not documented the interfaces. Stop.
- "We'll keep it clean core as much as possible..." → As much as possible is not a plan. Every extension gets a tier assignment. Stop.
- "Performance should be fine with HANA..." → HANA is not a performance guarantee. Design for volume. Stop.
- "BTP is the obvious choice here..." → Have you documented the on-premise alternative? Stop.
- "Security is the basis team's concern..." → Authentication, roles, and encryption are architecture. Stop.
- "This architecture worked at my last client..." → Different client, different landscape, different constraints.
- "We can add the integration details later..." → Integration details are architecture. Later is too late. Stop.
- "Let's keep the diagram simple for the presentation..." → The diagram must be accurate, not simple. Simplify the presentation separately.

## Hard Gates

<HARD-GATE>
DO NOT produce a solution architecture document until ALL of the following exist:
1. Landscape overview: all SAP and non-SAP systems named with version, deployment model, and owner
2. Integration register: every interface documented with protocol, direction, volume, and error handling
3. Clean core assessment: every proposed extension assigned a tier (1/2/3) with justification for Tier 3
4. Performance requirements: transaction volumes, peak concurrency, and response time SLAs documented
5. Security architecture: authentication model, role concept approach, encryption, and network zones defined
6. BTP vs. on-premise decision documented for every extension requiring evaluation
</HARD-GATE>

## Checklist

### Step 1: Landscape Discovery
Document the full technical landscape before designing anything:

- **SAP Core System:** Product (S/4HANA Cloud GROW / RISE / On-Prem), release, deployment model
- **Non-SAP Systems:** Every system that will integrate — name, version, owner, data exchanged
- **Current Middleware:** Integration platform in use (SAP Integration Suite, MuleSoft, Dell Boomi, custom)
- **Identity Provider:** How users authenticate — SAP IAS, Azure AD, on-prem LDAP
- **Network Topology:** Cloud regions, data centers, network zones, firewall boundaries
- **Data Residency Requirements:** GDPR, DPDPA, or other regulatory constraints on data location

Evidence: Landscape diagram with all systems named and connection lines drawn.
Gate: Every system that appears in scope or integration discussions is on the diagram before proceeding.

### Step 2: Integration Architecture
For every system-to-system connection, document:

- **Interface Name:** Meaningful business name (e.g., "S/4HANA → Ariba PO Replication")
- **Direction:** Inbound / Outbound / Bidirectional
- **Protocol:** REST, SOAP, IDOC, BAPI, RFC, OData, Flat File, SFTP, Event Mesh
- **Trigger:** Event-driven / Scheduled / Real-time / Batch
- **Frequency and Volume:** Messages per day, peak messages per hour, payload size
- **Error Handling:** Retry logic, dead-letter queue, alerting, support responsibility
- **Data Sensitivity:** Does the payload contain PII, financial data, or regulated data?
- **SAP Integration Suite Relevance:** Should this interface use Integration Suite for monitoring, mapping, or routing?

Evidence: Integration register table with all 8 attributes per interface.
Gate: No interface listed as "TBD" or "to be determined" — every interface fully specified before architecture is signed off.

### Step 3: Extensibility and Clean Core Strategy
Classify every requirement that cannot be met by SAP standard configuration:

**Clean Core Tiers:**
- **Tier 1 — In-App (Clean):** Key User Extensibility, Custom Fields and Logic, Adaptation UI — no code transport, upgrade-safe
- **Tier 2 — Side-by-Side (Cloud-Ready):** BTP extensions using CAP / SAP Cloud SDK, event-driven via Event Mesh — separate lifecycle, upgrade-safe
- **Tier 3 — Classic Custom (Technical Debt):** Z-programs, BAdi implementations in on-prem, custom database tables — creates upgrade risk, requires justification

For every Tier 3 extension:
- Written business justification: why Tier 1 and Tier 2 cannot meet the requirement
- Technical risk statement: upgrade impact, test scope, maintenance cost
- Architect sign-off requirement
- Roadmap to retire or move to Tier 1/2

Evidence: Extension register with tier classification and justification for all Tier 3 items.
Gate: Zero Tier 3 extensions without written justification and architect sign-off.

### Step 4: BTP Architecture Decisions
For every capability requiring evaluation between BTP and on-premise:

Assess each option against:
- **Latency:** Real-time UI extension vs. batch process — does network round-trip matter?
- **Licensing:** BTP service licensing cost vs. on-premise add-on
- **Data Residency:** Can PII or regulated data leave the on-premise environment?
- **Operational Model:** Who maintains it — SAP Basis team or dedicated BTP team?
- **Upgrade Independence:** BTP extension can evolve without SAP core upgrade; on-prem extension cannot
- **SAP Roadmap Alignment:** Is SAP investing in the BTP-native version of this capability?

**BTP Service Categories to Evaluate:**
- Integration: SAP Integration Suite (API Management, Integration Flows, Event Mesh)
- Extension: SAP Build (Work Zone, Apps, Process Automation)
- Data: SAP Datasphere, SAP Analytics Cloud
- AI/ML: SAP AI Core, SAP AI Launchpad, Joule

Evidence: BTP decision table with assessment scores per capability.
Gate: Every BTP recommendation has a documented on-premise alternative that was rejected with reasons.

### Step 5: Data Architecture
Define data design decisions that affect system architecture:

- **Master Data Governance:** How is master data created, validated, and distributed? (SAP MDG, manual, integration-driven)
- **Data Migration Architecture:** Source systems, extraction method, transformation approach, load sequence, delta handling
- **Archiving Strategy:** Which data objects, archiving method (ILM, custom), retention periods by data category
- **Analytics Architecture:** Where does reporting live — SAP Analytics Cloud, embedded analytics, BW/4HANA, third-party BI?
- **GDPR / Data Privacy:** PII data objects, consent management, right-to-erasure implementation in SAP
- **Data Volume Planning:** Current data volumes, growth rates, HANA in-memory sizing implications

Evidence: Data architecture section with all 6 categories addressed.
Gate: Data migration architecture specifies source systems and load sequence — not "TBD."

### Step 6: Security Architecture
Define security design before any build begins:

- **Authentication:** SAP IAS configuration, IdP federation, SSO protocol (SAML 2.0, OIDC)
- **Authorization Concept:** Role design approach — business roles, composite roles, segregation of duties matrix
- **Transport Security:** TLS versions, certificate management, API gateway configuration
- **Network Security:** System Communication Users, service accounts, API authentication method
- **Audit and Logging:** SAP Security Audit Log activation, log retention, SIEM integration
- **Privileged Access:** Emergency access procedures, firefighter IDs (GRC), access reviews

Evidence: Security architecture section with all 6 categories defined.
Gate: Role concept approach is defined — "will follow standard SAP roles" is not a concept.

### Step 7: Generate Solution Architecture Document
Assemble all sections into the deliverable template below.

Evidence: Complete solution architecture document with all sections populated.
Gate: All Hard Gate conditions met.

## Deliverable Template

```markdown
# SAP Solution Architecture Document

## Document Control
- **Project:**
- **Client:**
- **Version:**
- **Author:**
- **Review Date:**
- **SAP Product:** [S/4HANA Cloud GROW / RISE / On-Prem / BTP / etc.]
- **Activation Phase:**

## 1. Landscape Overview
### System Inventory
| System | Product | Version | Deployment | Owner | Status |
|--------|---------|---------|------------|-------|--------|

### Landscape Diagram
[Insert architecture diagram — all systems and connections]

## 2. Integration Architecture
### Integration Register
| # | Interface Name | Direction | Protocol | Trigger | Volume/Day | Error Handling | PII? | Integration Suite? |
|---|----------------|-----------|----------|---------|------------|----------------|------|--------------------|

### Integration Platform Decision
[SAP Integration Suite / middleware choice with justification]

## 3. Extensibility Strategy
### Clean Core Position
[Statement of clean core commitment for this engagement]

### Extension Register
| # | Extension Name | Business Requirement | Tier | Justification | Upgrade Risk | Owner |
|---|----------------|---------------------|------|---------------|--------------|-------|

### Tier 3 Justifications
[Detailed justification for every Tier 3 extension — if none, state "None — all extensions are Tier 1 or Tier 2"]

## 4. BTP Architecture
### BTP Services in Scope
| Service | Use Case | Alternative Considered | Decision Rationale |
|---------|----------|----------------------|-------------------|

### BTP Tenant Strategy
[Subaccount structure, environments, landscape segregation]

## 5. Data Architecture
### Master Data Governance
[MDG approach, ownership, distribution model]

### Data Migration Architecture
| Data Object | Source System | Extraction Method | Load Sequence | Volume (est.) |
|-------------|---------------|------------------|---------------|----------------|

### Analytics Architecture
[Reporting layer: SAC / embedded analytics / BW / third-party]

### Data Privacy and GDPR
[PII objects, consent handling, erasure approach]

## 6. Security Architecture
### Authentication Model
[IdP, SSO protocol, SAP IAS configuration]

### Authorization Concept
[Role design approach, SoD matrix, GRC integration]

### Transport and Network Security
[TLS, certificate management, network zones]

## 7. Performance Design
### Volume Requirements
| Process Area | Daily Transactions | Peak/Hour | Concurrent Users | Response Time SLA |
|--------------|-------------------|-----------|------------------|--------------------|

### Performance Architectural Decisions
[HANA partitioning, buffering, batch scheduling, archiving triggers]

## 8. Disaster Recovery and Business Continuity
| Metric | Target | Approach |
|--------|--------|----------|
| RTO | | |
| RPO | | |
| Backup Frequency | | |
| Failover Approach | | |

## 9. Architecture Decisions Log
| ID | Decision | Options Considered | Rationale | Date | Owner |
|----|----------|--------------------|-----------|------|-------|

## 10. Open Architecture Risks
| # | Risk | Impact | Mitigation | Owner | Due Date |
|---|------|--------|------------|-------|----------|

## Sign-Off
| Name | Role | Signature | Date |
|------|------|-----------|------|
```

## Verification

This skill is complete ONLY when ALL of the following are true:

- [ ] Landscape diagram names every SAP and non-SAP system with version and deployment model
- [ ] Integration register has all interfaces fully specified — no "TBD" protocol or volume fields
- [ ] Extension register classifies every custom extension by clean core tier with justification
- [ ] Zero Tier 3 extensions exist without written business justification and architect sign-off
- [ ] BTP vs. on-premise assessment exists for every capability requiring the decision
- [ ] Data architecture addresses master data governance, migration approach, and GDPR
- [ ] Security architecture defines authentication, authorization concept, and transport security
- [ ] Performance requirements are documented with transaction volumes and response time SLAs
- [ ] Architecture decisions log captures key decisions with options considered and rationale
- [ ] Open risks register exists with mitigation owners assigned

**Evidence required:** Complete solution architecture document with all sections populated. No sections containing only "TBD" or placeholder text.

If any verification item is not met, the skill is NOT complete. Do not claim completion.

## Next Skill

After completing this skill, invoke one of:
- `estimation` — When the architecture needs to be decomposed into detailed effort estimates
- `testing-strategy` — When moving into Realize phase and the architecture drives test scope
- `data-migration` — When the data migration architecture requires detailed migration planning

Conditions for handoff: Solution architecture document is reviewed and approved, and the project is moving from Explore into Realize phase design and build activities.

## Cross-References

- `brainstorming` — For exploring solution options before finalizing architecture
- `fit-gap-analysis` — For identifying the gaps that drive extensibility decisions
- `estimation` — For converting architectural components into effort estimates
- `security-grc` — For detailed GRC and authorization design beyond the architecture concept
- `btp` — For BTP service-specific design patterns and implementation guidance
- `clean-core-strategy` — For detailed clean core governance and extension lifecycle management
