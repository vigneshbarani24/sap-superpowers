# SAP Version Reference

## Version-Specific Behavior

Code and recommendations must adapt to the target SAP version. What's standard in S/4HANA may not exist in ECC.

## Key Differences: ECC 6.0 vs S/4HANA

| Area | ECC 6.0 | S/4HANA |
|------|---------|---------|
| **Business Partner** | Customer (KNA1) + Vendor (LFA1) separate | Business Partner (BUT000) — unified, KNA1/LFA1 are compatibility views |
| **Material Ledger** | Optional | Mandatory (actual costing always active) |
| **Universal Journal** | BSEG/BSAS/BSIS line items | ACDOCA — single source of truth for FI+CO |
| **Credit Management** | FD32, classic credit | SAP Credit Management (UKM) — BRF+ rules |
| **Output Management** | NACE/condition technique | BRF+ Output Management (S/4HANA 1909+) |
| **MRP** | Classic MRP (MD01/MD02) | MRP Live (embedded PP/DS) |
| **Procurement** | ME21N classic | Fiori apps + managed purchase orders |
| **Asset Accounting** | Classic FI-AA | New Asset Accounting (mandatory in S/4HANA) |
| **G/L Accounting** | Classic/New G/L | Only New G/L (ledger-based) |
| **Classical Dynpro** | Standard UI | Still works but Fiori preferred for new development |
| **Batch Input** | BDC / LSMW common | LSMW deprecated — use BAPIs, APIs, or migration cockpit |

## Tables Removed/Changed in S/4HANA

| ECC Table | Status in S/4HANA | Replacement |
|-----------|-------------------|-------------|
| BSEG | Compatibility view (slow) | ACDOCA |
| BSAS/BSIS/BSAD/BSID/BSAK/BSIK | Compatibility views | ACDOCA with status filters |
| KONV | Changed structure | PRCD_ELEMENTS |
| VBFA | Compatibility view | I_SalesDocumentFlow CDS |
| KNA1 | Compatibility view | BUT000 (Business Partner) |
| LFA1 | Compatibility view | BUT000 (Business Partner) |
| MARA (some fields) | Fields removed | Check simplification list |

## Decision Tree: Which Version?

```
Is target system S/4HANA?
├── YES → Is it S/4HANA Cloud (Public)?
│   ├── YES → ABAP Cloud restricted syntax only
│   │         Released APIs only (no custom tables/views on SAP tables)
│   │         No classical Dynpro — RAP + Fiori only
│   │         Key-user extensibility preferred
│   └── NO → S/4HANA On-Premise / Private Cloud
│             Clean core recommended but classic ABAP allowed
│             RAP preferred for new development
│             Business Partner mandatory (not KNA1/LFA1)
│             ACDOCA for financial data (not BSEG)
└── NO → ECC 6.0
          Classic ABAP fully supported
          KNA1/LFA1 for customer/vendor
          BSEG for FI line items
          Classical Dynpro standard
          Clean core not applicable
```

## Rules

1. **Always confirm SAP version before recommendations** — ECC advice in S/4HANA causes errors
2. **Never recommend BSEG in S/4HANA** — performance disaster on ACDOCA compatibility view
3. **Business Partner is mandatory in S/4HANA** — never create customer/vendor master via XD01/XK01
4. **Check simplification list** before using any ECC-era table or transaction
5. **Classical Dynpro is allowed in S/4HANA on-prem** but forbidden in S/4HANA Cloud
