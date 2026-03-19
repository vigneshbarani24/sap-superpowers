---
name: sap-change-management
description: Use when planning or executing organizational change management (OCM) for SAP implementations, upgrades, or transformations. Guides stakeholder analysis, communication, training, resistance management, and adoption tracking.
---

# SAP Change Management (OCM)

Structured organizational change management for SAP programs — ensuring people adopt new processes, not just new technology.

<HARD-GATE>
Stakeholder analysis (Step 1) MUST be completed before producing any communications plan or training plan. You cannot craft effective messages or training without knowing WHO is affected, HOW MUCH they are impacted, and what INFLUENCE they hold. If the user asks to skip ahead, refuse and explain why.
</HARD-GATE>

## Checklist

Work through every step in order. Do not skip steps.

1. **Stakeholder analysis** — Identify all stakeholder groups, classify each by impact and influence, and map them on the influence/impact matrix below.
2. **Change impact assessment** — For each stakeholder group, document which roles are affected, which business processes change, and what specifically is different (system, process, organization, job role).
3. **Communication plan** — Define audiences, key messages, channels, timeline, and owners using the communication template below.
4. **Training plan** — Define training needs by role and module, select delivery methods, set schedule using the training template below.
5. **Resistance management** — Identify likely sources of resistance, root causes, and mitigation strategies for each.
6. **Adoption tracking** — Establish metrics, surveys, and feedback loops using the adoption metrics framework below.
7. **Sustain** — Plan post-go-live reinforcement: super-user network, refresher training, continuous improvement cycles.

---

## Step 1: Stakeholder Influence/Impact Matrix

Classify every stakeholder group into one of four quadrants:

```
                        INFLUENCE
                   Low            High
            ┌──────────────┬──────────────┐
    High    │ Keep Informed│ Key Players  │
            │              │              │
  IMPACT    │ Provide info │ Engage       │
            │ regularly;   │ closely;     │
            │ address      │ co-design    │
            │ concerns     │ solutions    │
            ├──────────────┼──────────────┤
    Low     │ Monitor      │ Keep         │
            │              │ Satisfied    │
            │ Light-touch  │ Leverage as  │
            │ updates      │ champions;   │
            │              │ keep aligned │
            └──────────────┴──────────────┘
```

| Quadrant | Influence | Impact | Strategy |
|---|---|---|---|
| **Key Players** | High | High | Engage closely — involve in design, testing, and decision-making |
| **Keep Satisfied** | High | Low | Leverage as sponsors and champions; keep them aligned and supportive |
| **Keep Informed** | Low | High | Provide regular, targeted communication; address concerns proactively |
| **Monitor** | Low | Low | Light-touch updates; escalate only if status changes |

**Output:** A completed stakeholder register with columns: Name/Group, Role, Impact (H/M/L), Influence (H/M/L), Quadrant, Engagement Strategy.

---

## Step 2: Change Impact Assessment

For each affected role, document:

| Role | Process Area | Current State | Future State | Change Type | Severity |
|---|---|---|---|---|---|
| AP Clerk | Invoice Processing | SAP GUI, manual 3-way match | Fiori, automated matching | System + Process | High |
| Plant Manager | Production Planning | Spreadsheet-based MRP | SAP PP/DS with MRP Live | System + Process + Role | High |
| Sales Rep | Order Entry | Phone/email to order desk | Self-service Fiori app | System + Process | Medium |

**Change types:** System, Process, Organization, Job Role, Policy, Reporting.

---

## Step 3: Communication Plan Template

| # | Audience | Key Message | Channel | Frequency | Owner | Start Date |
|---|---|---|---|---|---|---|
| 1 | Executive sponsors | Program status, risk escalation | Steering committee | Biweekly | Program Director | Project start |
| 2 | Middle management | Impact to their teams, timeline | Town hall + email | Monthly | OCM Lead | Month 2 |
| 3 | End users | What is changing, why, when | Team meetings + intranet | Biweekly | Change Champions | Month 3 |
| 4 | IT support | Technical changes, support procedures | Workshop | As needed | IT Lead | Month 4 |
| 5 | External partners | Interface/process changes | Email + portal | Quarterly | Business Owner | Month 4 |

**Principles:**
- Communicate the "why" before the "what"
- Use managers as the primary channel for their teams
- Repeat key messages across multiple channels
- Create feedback mechanisms (not just broadcast)

---

## Step 4: Training Plan Template

| Role | Module | Topics | Method | Duration | Scheduled Date |
|---|---|---|---|---|---|
| AP Clerk | AP in Fiori | Invoice posting, 3-way match, payment runs | Instructor-led + hands-on | 2 days | Go-live minus 4 weeks |
| Plant Manager | PP/DS Overview | MRP Live, capacity planning, production orders | Workshop + simulation | 1 day | Go-live minus 5 weeks |
| Sales Rep | Order Management | Sales order creation, ATP check, pricing | E-learning + lab | 1.5 days | Go-live minus 3 weeks |
| Super Users | All assigned areas | Full process + troubleshooting + support | Deep-dive workshop | 3-5 days | Go-live minus 6 weeks |
| IT Support | Basis + Fiori admin | Launchpad config, error handling, monitoring | Technical workshop | 2 days | Go-live minus 4 weeks |

**Delivery methods:** Instructor-led training (ILT), virtual ILT, e-learning, hands-on lab, simulation, job aid, coaching, recorded video.

---

## Step 5: Resistance Management

Common sources and mitigations:

| Source of Resistance | Root Cause | Mitigation |
|---|---|---|
| Fear of job loss | Automation replacing manual tasks | Communicate reskilling plan; show new role opportunities |
| Comfort with current system | Years of SAP GUI expertise | Provide ample practice time; acknowledge existing skills |
| Lack of trust in project | Previous failed implementations | Share quick wins; involve skeptics in testing |
| Workload concerns | Training on top of daily work | Backfill during training; stagger rollout |
| Loss of control | Standardized processes replacing local variants | Involve users in process design; explain rationale |

**Approach:** Listen first, acknowledge concerns, involve resistors early, provide extra support, escalate persistent blockers to sponsors.

---

## Step 6: SAP-Specific Change Challenges

| Challenge | Example | Mitigation |
|---|---|---|
| New UX | Fiori vs SAP GUI | Side-by-side comparison training; highlight efficiency gains |
| Process change | New approval workflows | Process maps showing before/after; walk-throughs with users |
| Data ownership | Master data governance | RACI matrix for each data domain; data steward appointments |
| Role changes | Shared services centralization | Clear new role definitions; career path conversations |
| Reporting changes | Embedded analytics vs BW reports | Report mapping (old to new); self-service analytics training |
| Integration complexity | New interfaces with third-party systems | End-to-end process demos; cross-team workshops |

---

## Step 7: Adoption Metrics Framework

Track adoption across four dimensions:

| Dimension | Metric | Target | Measurement Method | Frequency |
|---|---|---|---|---|
| **System Usage** | Daily active users / total trained users | > 80% by go-live + 4 weeks | System logs (SAP Usage Analytics, Fiori Launchpad stats) | Weekly |
| **System Usage** | Transaction completion rate | > 90% without fallback | Process mining / transaction logs | Weekly |
| **Help Desk** | SAP-related ticket volume | Declining trend after week 2 | Service desk reports | Weekly |
| **Help Desk** | Ticket resolution time | < 4 hours for P2, < 1 hour for P1 | Service desk SLA reports | Weekly |
| **Process Compliance** | Process steps executed correctly | > 85% by go-live + 6 weeks | Audit samples, process mining | Biweekly |
| **Process Compliance** | Workaround / manual override rate | < 10% | Exception reports | Biweekly |
| **User Satisfaction** | End-user satisfaction score | > 3.5 / 5.0 | Pulse surveys | Monthly |
| **User Satisfaction** | Confidence in using new system | > 70% "confident" or "very confident" | Pulse surveys | Monthly |

**Feedback loops:**
- Weekly super-user check-ins during hypercare
- Biweekly pulse surveys for first 8 weeks post-go-live
- Monthly OCM retrospectives with leadership
- Quarterly adoption review with steering committee

---

## Step 7b: Sustain — Post-Go-Live Reinforcement

- **Super-user network:** Maintain 1 super-user per 15-25 end users; hold monthly knowledge-sharing sessions
- **Refresher training:** Schedule at go-live + 6 weeks and go-live + 12 weeks
- **Knowledge base:** Keep job aids, quick-reference cards, and FAQ updated in a central portal
- **Continuous improvement:** Funnel user feedback into enhancement backlog; review quarterly
- **Recognition program:** Celebrate adoption milestones and change champion contributions

---

## Cross-References

- **`sap-project-kickoff`** — Stakeholder identification should begin at project kickoff; OCM workstream must be scoped and resourced from Day 1.
- **`sap-go-live-readiness`** — Gate 9 (Training delivered) directly depends on Steps 1-4 of this skill. Training cannot be signed off until stakeholder analysis, impact assessment, and training execution are complete.

---

## Quick Reference: OCM Workstream Timeline

| Phase | OCM Activities | Key Deliverables |
|---|---|---|
| **Prepare** (Months 1-2) | Stakeholder analysis, OCM strategy, sponsor alignment | Stakeholder register, OCM plan |
| **Explore** (Months 2-4) | Change impact assessment, communication kickoff | Impact assessment, initial comms |
| **Realize** (Months 4-8) | Training development, resistance management, ongoing comms | Training materials, change network |
| **Deploy** (Months 8-10) | Training delivery, go-live comms, adoption baseline | Trained users, go-live readiness |
| **Run** (Months 10+) | Adoption tracking, sustain activities, continuous improvement | Adoption dashboards, lessons learned |
