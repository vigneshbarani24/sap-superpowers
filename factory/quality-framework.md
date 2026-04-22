# Delivery Factory — Quality Scoring Framework

## Purpose

Every deliverable produced by the factory receives a maturity score. This replaces the binary "done/not done" with a measurable quality level that tells stakeholders exactly where each artifact stands.

## Maturity Levels

| Level | Name | Definition | Criteria |
|-------|------|-----------|----------|
| **L1** | Draft | Structure exists. Sections identified. Placeholders present. | File created. Headings match template. Content < 30% filled. |
| **L2** | Working | Content filled for all mandatory sections. No empty placeholders. | All sections have substantive content. Tables populated. No [TBD] markers. |
| **L3** | Reviewed | Peer reviewed. Inconsistencies resolved. Cross-references validated. | Review comments addressed. No conflicting information across deliverables. |
| **L4** | Approved | Meets all hard gate criteria. Ready for client/stakeholder sign-off. | All verification items from the producing skill are checked. Evidence attached. |
| **L5** | Baselined | Signed off by client. Version-controlled. Under change management. | Sign-off record exists. Document versioned. Changes require change request. |

## Phase Thresholds

| Phase | Minimum Level | Rationale |
|-------|--------------|-----------|
| DISCOVER | L2 | Discovery outputs evolve — working drafts are sufficient |
| PREPARE | L3 | Budget and architecture decisions require reviewed quality |
| EXPLORE | L3 | Functional specs must be reviewed before build |
| REALIZE | L4 | Code and tests must be approved before deployment |
| DEPLOY | L4 | Go-live artifacts must be approved — no drafts in production |
| RUN | L3 | Hypercare documents evolve — reviewed quality sufficient |

## Scoring Rubric by Deliverable Type

### Process Deliverables (Charter, Plans, Strategies)
| Criterion | L1 | L2 | L3 | L4 |
|-----------|----|----|----|----|
| Structure | Template applied | All sections filled | Sections reviewed for consistency | Meets all hard gates |
| Content depth | Bullets/placeholders | Paragraphs with detail | Detail with evidence | Detail with sign-off |
| Cross-references | None | Links to related docs | Links verified and consistent | Dependencies mapped and validated |
| Stakeholder input | None | Draft from consultant | Reviewed by team | Approved by stakeholder |

### Technical Deliverables (Specs, Code, Test Scripts)
| Criterion | L1 | L2 | L3 | L4 |
|-----------|----|----|----|----|
| Completeness | Structure only | All objects specified | Peer reviewed | ATC clean, tests pass |
| Accuracy | Assumptions stated | Data model validated | Released APIs confirmed | Activated and tested |
| Test coverage | No tests | Test structure defined | Tests written and reviewed | Tests pass 100% |
| Standards compliance | Naming convention check | Clean code review | Security audit | Full ATC + code review |

### Data Deliverables (Migration Plans, Mappings)
| Criterion | L1 | L2 | L3 | L4 |
|-----------|----|----|----|----|
| Scope | Objects identified | Fields mapped | Mapping reviewed with data owners | Trial load verified |
| Quality | Volumes estimated | Quality rules defined | Quality rules tested | Reconciliation passed |
| Transformation | Logic sketched | Logic documented | Logic validated | Logic tested with real data |

## Aggregate Scoring

Phase quality = average maturity of all deliverables in that phase.

```
Phase Quality = Σ(deliverable_level) / count(deliverables)

Example:
  EXPLORE phase: E1=L3, E2=L3, E3=L2, E4=L2, E5=L1, E6=L1
  Phase Quality = (3+3+2+2+1+1) / 6 = 2.0 (below L3 threshold)
  Status: 🔴 NOT READY for phase gate
```

## Quality Report Format

```
QUALITY SCORECARD
═════════════════
Phase: EXPLORE | Threshold: L3 | Current: L2.3 | Status: 🔴

Deliverable                    Level  Status
─────────────────────────────  ─────  ──────
E1 Fit/Gap Matrix              L3     ✅ Meets threshold
E2 Process Designs             L3     ✅ Meets threshold
E3 Functional Specifications   L2     ⚠️ Below threshold — needs review
E4 Data Migration Strategy     L2     ⚠️ Below threshold — needs stakeholder input
E5 Test Strategy               L1     🔴 Draft only — content incomplete
E6 Integration Architecture    L1     🔴 Draft only — content incomplete

ACTION ITEMS
────────────
1. Complete E5 content (invoke testing-strategy skill)
2. Complete E6 content (invoke solution-architecture skill)
3. Review E3 with module leads
4. Validate E4 with data migration team
```
