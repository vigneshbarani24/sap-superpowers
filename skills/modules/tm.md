---
name: tm
description: Use when working with SAP Transportation Management — freight order management, freight booking, carrier selection, route determination, freight settlement, transportation planning, charge management, or embedded TM in S/4HANA.
---

# SAP Transportation Management (TM)

This skill enforces correct TM implementation practices, ensuring that carrier master data is validated before transportation planning begins, freight cost reconciliation is never skipped, and transportation network design reflects actual logistics operations — not theoretical route configurations.

## Content Routing

| Topic | Section |
|-------|---------|
| Freight order management | Freight Order Management |
| Carrier selection and routing | Carrier Selection and Route Determination |
| Freight settlement and charges | Freight Settlement |
| Transportation planning | Transportation Planning |
| Embedded TM in S/4HANA | Embedded TM in S/4HANA |
| Integration points | Integration Points |
| Key Fiori apps | Key Fiori Apps and Transactions |

## Iron Laws

1. **ALWAYS VALIDATE CARRIER MASTER DATA BEFORE TRANSPORTATION PLANNING.** Carrier profiles, lanes, rates, equipment types, and transit times must be complete and accurate before planning runs. Incomplete carrier master data produces infeasible plans — freight orders with no carrier, no rate, or impossible transit times.
2. **NEVER SKIP FREIGHT COST RECONCILIATION.** Carrier invoices must be matched against calculated freight costs. Paying carrier invoices without reconciliation against freight agreements results in overpayment. The average freight audit finds 3-5% overcharges.
3. **ALWAYS DEFINE TRANSPORTATION NETWORK BEFORE CONFIGURING PLANNING.** Locations, lanes, transportation zones, and transit times form the network graph that planning optimizes. Planning without a complete network graph produces suboptimal or infeasible results.
4. **NEVER RELEASE FREIGHT ORDERS WITHOUT COMPLETE DOCUMENTATION.** Bill of lading, customs documents, dangerous goods declarations, and weight/dimension data must be complete before release. Incomplete documentation causes shipment delays and compliance violations.
5. **ALWAYS CONFIGURE CHARGE CALCULATION BEFORE SETTLEMENT TESTING.** Freight charge management (rate tables, surcharges, accessorials) is the basis for settlement. Testing settlement without validated charge rules produces incorrect costs.

## Transportation Planning

### Planning Levels
| Level | Scope | Use Case |
|-------|-------|----------|
| Operational | Individual shipments, daily execution | Day-of shipping decisions |
| Tactical | Multi-day, consolidation, route optimization | Weekly/monthly planning cycles |
| Strategic | Network design, mode selection, partner strategy | Quarterly/annual planning |

### Planning Process
1. **Demand capture:** Delivery documents from SD/EWM or freight requests create transportation demand
2. **Consolidation:** Group shipments by route, time window, carrier, mode
3. **Carrier selection:** Apply tendering rules, contract rates, capacity constraints
4. **Route determination:** Assign transportation lanes, intermediate stops
5. **Load planning:** Vehicle capacity optimization (weight, volume, floor space)
6. **Freight order creation:** System creates freight order with selected carrier and route
7. **Execution:** Track shipment status, handle exceptions

### Optimization
TM optimizer uses SAP Transportation Resource Planning for:
- Shipment consolidation (LTL to FTL conversion savings)
- Multi-pickup/multi-delivery route optimization
- Mode selection (road vs. rail vs. ocean vs. air)
- Carrier mix optimization based on service level and cost

## Freight Order Management

### Freight Order Lifecycle
```
Transportation Demand (delivery, freight request)
  → Freight Unit (planning-relevant unit)
    → Freight Order (carrier assignment, route)
      → Freight Booking (carrier confirmation)
        → Execution (tracking, status updates)
          → Freight Settlement (cost calculation, invoice matching)
```

### Freight Order Types
| Type | Description |
|------|-------------|
| Standard Freight Order | Single carrier, single route segment |
| Forwarding Order | Multi-leg with intermediate handling |
| Freight Booking | Carrier-confirmed reservation (ocean/air) |

### Key Data Elements
- Shipper/consignee locations
- Pickup/delivery date windows
- Equipment type (container, trailer, pallet)
- Weight/volume/dimensions
- Dangerous goods classification
- Incoterms and trade compliance data

## Carrier Selection and Route Determination

### Carrier Selection Strategies
| Strategy | Description |
|----------|-------------|
| Least cost | Select carrier with lowest total freight cost |
| Preferred carrier | Route to preferred carriers first, overflow to others |
| Round robin | Distribute volume evenly across carrier pool |
| Tendering | Request quotes from carrier pool, select best offer |
| Business rule based | Custom logic (hazmat-certified, temperature-capable) |

### Route Determination
- **Transportation lanes:** Origin-destination pairs with assigned carriers, modes, transit times
- **Transportation zones:** Group locations for zone-based rating (e.g., ZIP code ranges)
- **Routing guides:** Rules for multi-leg routing with intermediate stops (cross-dock, hub)
- **Transit time calculation:** Based on lane master data, calendar, carrier schedules

### Tendering Process
1. Create tender from freight order
2. Broadcast to carrier pool (EDI/API/portal)
3. Carriers respond with accept/reject/counter
4. Evaluate responses (cost, transit time, service level)
5. Award and confirm freight booking

## Freight Settlement

### Charge Management
| Charge Type | Description |
|-------------|-------------|
| Base freight | Rate per weight, volume, pallet, container, or flat rate |
| Fuel surcharge | Percentage or per-unit addition based on fuel index |
| Accessorials | Stop-off charge, liftgate, inside delivery, residential |
| Detention/demurrage | Time-based charge for delayed loading/unloading |
| Customs/duties | Import/export related charges |

### Rate Structures
- **Rate tables:** Origin-destination-weight break matrix
- **Tariffs:** Published carrier rate schedules
- **Contract rates:** Negotiated rates per lane/volume commitment
- **Scale rates:** Volume discount tiers
- **Minimum charges:** Floor rates per shipment

### Settlement Process
1. **Charge calculation:** System applies rate tables to freight order data
2. **Cost allocation:** Distribute freight cost to originating documents (deliveries, purchase orders)
3. **Carrier invoice receipt:** Carrier submits invoice (EDI 210, PDF, portal)
4. **Invoice matching:** Compare carrier invoice to calculated charges
5. **Variance handling:** Tolerance-based auto-approval or manual review
6. **Payment trigger:** Approved invoices forwarded to FI-AP for payment
7. **Cost posting:** Freight costs posted to FI (freight accrual, actual, variance accounts)

## Embedded TM in S/4HANA

### Key Advantages of Embedded TM
- **Single database:** No replication between ERP and TM systems
- **Shared master data:** Business partner, material, org structure — no synchronization
- **Simplified integration:** Direct document flow without middleware
- **Unified analytics:** CDS-based reporting across logistics and transportation
- **Single Fiori launchpad:** Warehouse and transportation users on same platform

### Embedded TM Scope
Embedded TM supports core TM functionality within S/4HANA. For advanced scenarios (ocean/air booking, complex multi-leg, advanced optimization), standalone TM on BTP may still be required.

### Key Differences from Standalone TM
| Area | Embedded TM | Standalone TM |
|------|-------------|---------------|
| Deployment | Within S/4HANA | Separate system (on-prem or BTP) |
| Freight booking | Limited | Full ocean/air booking |
| Optimization | Basic consolidation | Advanced optimizer |
| Planning UI | Fiori-based | TM planning cockpit (Web UI) |
| Subcontracting | Integrated | Separate integration needed |

## Key Fiori Apps and Transactions

### Fiori Apps
| App ID | App Name |
|--------|----------|
| F5768 | Manage Freight Orders |
| F5769 | Monitor Freight Orders |
| F5770 | Process Freight Settlement |
| F5771 | Manage Transportation Lanes |
| F5920 | Plan Freight |

### Classic Transactions (Standalone TM)
| Transaction | Purpose |
|-------------|---------|
| /SCMTMS/TRQ | Transportation request management |
| /SCMTMS/FWO | Freight order management |
| /SCMTMS/SETTLE | Freight settlement cockpit |
| /SCMTMS/PLAN | Transportation planning cockpit |
| /SCMTMS/CARRIER | Carrier management |

## Integration Points

| Integration | Description |
|-------------|-------------|
| TM-SD | Outbound delivery triggers transportation demand; POD confirmation updates delivery |
| TM-MM | Inbound delivery/PO creates transportation demand for inbound freight |
| TM-EWM | Dock scheduling, loading sequence, shipping point coordination |
| TM-FI | Freight cost posting, accrual, settlement to G/L accounts |
| TM-FI-AP | Carrier invoice matching and payment processing |
| TM-GTS | Global Trade Services for customs, compliance, restricted party screening |
| TM-Event Mgmt | Shipment tracking, milestone events, exception handling |

## Best Practices

1. **Start with master data quality** — carrier profiles, lanes, and rate tables are the foundation; plan 30% of implementation effort for master data
2. **Implement freight cost reconciliation from day one** — do not defer carrier invoice matching to a later phase
3. **Design transportation network with actual carrier routes** — not theoretical point-to-point, but hub-and-spoke reality
4. **Use tendering for spot market lanes** — contracted lanes use rate tables; variable lanes use tendering
5. **Test with realistic shipment volumes** — planning optimization behaves differently with 50 vs. 5,000 freight units
6. **Configure exception management** — delays, capacity shortfalls, and carrier rejections happen daily; plan for them

## Anti-Patterns

- Going live without freight cost reconciliation (accepting all carrier invoices at face value)
- Configuring TM without involvement of logistics/transportation team (IT-driven config misses operational reality)
- Using standalone TM for basic domestic trucking (embedded TM suffices; standalone adds integration complexity)
- Ignoring transit time master data (planning produces schedules that carriers cannot physically execute)
- Skipping carrier onboarding process (carriers cannot transact without proper EDI/API setup and testing)

## Verification

This skill is complete ONLY when ALL of the following are true:
- [ ] Transportation scenario correctly identified (inbound/outbound, mode, domestic/international)
- [ ] Carrier master data requirements addressed (lanes, rates, equipment, transit times)
- [ ] Freight settlement approach defined (charge types, rate structures, reconciliation process)
- [ ] Integration points mapped (which ERP modules generate or consume TM data)
- [ ] Embedded vs. standalone TM deployment justified for the scenario
- [ ] Network design reflects physical logistics reality, not theoretical routes

**Evidence required:** Specific TM document types, charge management rules, carrier selection strategies, and integration flows — not generic transportation descriptions.

## Next Skill

After completing this skill, invoke:
- `sd` — When outbound delivery or shipping point configuration is the focus
- `ewm` — When warehouse-transportation integration (dock scheduling, loading) is needed
- `fi` — When freight cost posting or accrual configuration is required

## Cross-References

- `sd` — Outbound delivery creation, shipping point determination
- `ewm` — Warehouse shipping, dock door management, loading
- `mm` — Inbound transportation, purchase order freight
- `fi` — Freight cost posting, accrual accounting
- `ariba` — Carrier sourcing and procurement
