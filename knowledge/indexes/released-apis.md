# SAP Released APIs — Reference Index

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise 1809–2023, S/4HANA Cloud, BTP ABAP Environment (Steampunk)
**Referenced By:** skills/abap-cloud, skills/development-workflow, skills/clean-core-strategy, skills/code-review

## Why This Matters

In ABAP Cloud and S/4HANA extensions, only **released** APIs may be used. Using unreleased APIs breaks upgrade compatibility (clean core principle). Every custom code object must be validated against release contracts before deployment.

---

## Release Contract Tiers (C0 / C1 / C2)

| Contract | Annotation | Meaning | Who Can Use |
|----------|-----------|---------|------------|
| C0 | `@AbapCatalog.releaseState: 'RELEASED'` not present | No stability contract — internal use only | SAP internal only; never use in customer code |
| C1 | `@ObjectModel.usageType.serviceQuality: #C` (Key User) | Stable for key user extensibility (in-app) | Key user tools, Fiori adaptation |
| C2 | `@ObjectModel.usageType.serviceQuality: #A` (Developer) | Stable for developer extensibility in ABAP Cloud | Custom apps in BTP ABAP Env, S/4HANA Cloud Extensions |
| USE_IN_CLOUD_DEVELOPMENT | ADT property / API state = RELEASED | Full release for cloud development | All ABAP Cloud development |

> **Rule:** Always prefer C2/USE_IN_CLOUD_DEVELOPMENT APIs. C1 is acceptable for Fiori adaptation. C0 = blocked.

---

## How to Check API Release Status

### Method 1 — CDS View in ADT (Eclipse)
1. Open the CDS view in ABAP Development Tools (ADT)
2. Go to **Properties** tab → **API State**
3. Status shows: `RELEASED`, `DEPRECATED`, `NOT RELEASED`, or `CLOUD RELEASED`

### Method 2 — I_APIBusinessObject CDS View (S/4HANA)
Query the released object catalog directly:
```sql
SELECT * FROM I_APIBusinessObject
  WHERE ReleaseState = 'RELEASED'
  AND ObjectType = 'DDLS'  -- for CDS views
```
Additional object types: `FUGR` (function groups), `TABL` (tables), `CLAS` (classes), `INTF` (interfaces)

### Method 3 — ATC Check in ADT
Run ATC with check variant `ABAP_CLOUD_READINESS` — flags all uses of non-released APIs with finding `CL_CI_TEST_EXTENDED_CHECK`.

### Method 4 — API State Annotation in Source
Look for annotations in the CDS view definition:
```
@AbapCatalog.sqlViewName: 'I_JOURNALENT'
@ObjectModel.usageType:{
  serviceQuality: #A,
  sizeCategory: #XXL,
  dataClass: #MIXED
}
```

### Method 5 — SAP API Business Hub
Browse released OData and REST APIs at **api.sap.com** — filter by product (S/4HANA, BTP) and status (Active).

---

## Released CDS Views — Financial Accounting (FI)

| CDS View Name | SQL View | Description | Contract | S/4HANA Version |
|---------------|---------|-------------|----------|----------------|
| I_JournalEntry | IJOURNALENTR | Universal Journal Entry Header (ACDOCA) | C2 | 1610+ |
| I_JournalEntryItem | IJOURENTIT | Universal Journal Entry Line Items | C2 | 1610+ |
| I_OperationalAcctgDocItem | IOPADOCIT | Operational Accounting Document Items | C2 | 1610+ |
| I_GeneralLedgerAccount | IGLACCT | G/L Account Master Data | C2 | 1809+ |
| I_GLAccountInChartOfAccounts | IGLACCOA | G/L Account in Chart of Accounts | C2 | 1809+ |
| I_CompanyCode | ICOMPCODE | Company Code Master Data | C2 | 1610+ |
| I_FiscalYear | IFISCYEAR | Fiscal Year Variant | C2 | 1610+ |
| I_FiscalPeriod | IFISCPER | Fiscal Period Data | C2 | 1610+ |
| I_CostCenter | ICOSTCTR | Cost Center Master Data | C2 | 1610+ |
| I_ProfitCenter | IPROFCTR | Profit Center Master Data | C2 | 1610+ |
| I_ControllingArea | ICTRLAREA | Controlling Area Master | C2 | 1610+ |
| I_FixedAsset | IFIXASSET | Fixed Asset Master Data | C2 | 1809+ |

---

## Released CDS Views — Materials Management (MM)

| CDS View Name | SQL View | Description | Contract | S/4HANA Version |
|---------------|---------|-------------|----------|----------------|
| I_PurchaseOrder | IPURCHORD | Purchase Order Header | C2 | 1610+ |
| I_PurchaseOrderItem | IPURCHORDIT | Purchase Order Item | C2 | 1610+ |
| I_PurchaseRequisition | IPURCHREQ | Purchase Requisition Header | C2 | 1610+ |
| I_PurchaseRequisitionItem | IPURCHREQIT | Purchase Requisition Item | C2 | 1610+ |
| I_PurchasingDocument | IPURCHDOC | Purchasing Document (PO/Outline Agr.) | C2 | 1809+ |
| I_Material | IMATERIAL | Material Master General Data | C2 | 1610+ |
| I_MaterialPlant | IMATPLANT | Material Master Plant Data | C2 | 1610+ |
| I_Plant | IPLANT | Plant Master Data | C2 | 1610+ |
| I_StorageLocation | ISTORLOC | Storage Location Master | C2 | 1610+ |
| I_GoodsMovement | IGOODSMOV | Material Document (MATDOC) | C2 | 1709+ |
| I_InventoryDocument | IINVDOC | Inventory Document Header | C2 | 1709+ |
| I_VendorInvoice | IVENDINV | Vendor Invoice Header (RBKPV) | C2 | 1809+ |

---

## Released CDS Views — Sales & Distribution (SD)

| CDS View Name | SQL View | Description | Contract | S/4HANA Version |
|---------------|---------|-------------|----------|----------------|
| I_SalesOrder | ISALORD | Sales Order Header (VBAK) | C2 | 1610+ |
| I_SalesOrderItem | ISALORDITEM | Sales Order Item (VBAP) | C2 | 1610+ |
| I_DeliveryDocument | IDELDOC | Delivery Document Header (LIKP) | C2 | 1610+ |
| I_DeliveryDocumentItem | IDELDOCITEM | Delivery Document Item (LIPS) | C2 | 1610+ |
| I_BillingDocument | IBILLDOC | Billing Document Header (VBRK) | C2 | 1610+ |
| I_BillingDocumentItem | IBILLDOCIT | Billing Document Item (VBRP) | C2 | 1610+ |
| I_Customer | ICUSTOMER | Customer Master (Business Partner) | C2 | 1610+ |
| I_SalesOrganization | ISALEORG | Sales Organization Master | C2 | 1610+ |
| I_SalesQuotation | ISALQUOT | Sales Quotation Header | C2 | 1809+ |

---

## Released CDS Views — Production Planning (PP)

| CDS View Name | SQL View | Description | Contract | S/4HANA Version |
|---------------|---------|-------------|----------|----------------|
| I_ProductionOrder | IPRODORD | Production Order Header (AUFK) | C2 | 1610+ |
| I_ProductionOrderComponent | IPRODORDCMP | Production Order Component (RESB) | C2 | 1709+ |
| I_BillOfMaterial | IBOM | Bill of Material Header | C2 | 1709+ |
| I_BillOfMaterialItem | IBOMITEM | Bill of Material Item | C2 | 1709+ |
| I_WorkCenter | IWORKCTR | Work Center Master | C2 | 1709+ |
| I_Routing | IROUTING | Routing Header | C2 | 1809+ |

---

## Released OData Services (Key Services)

| Service Name | Version | Description | Module |
|--------------|---------|-------------|--------|
| API_SALES_ORDER_SRV | V2 | Sales Order API — create, read, update | SD |
| API_PURCHASEORDER_PROCESS_SRV | V2 | Purchase Order Processing | MM |
| API_PURCHASEREQ_PROCESS_SRV | V2 | Purchase Requisition Processing | MM |
| API_BILLING_DOCUMENT_SRV | V2 | Billing Document Read API | SD |
| API_BUSINESS_PARTNER | V2 | Business Partner — full CRUD | FI/SD/MM |
| API_PRODUCT_SRV | V2 | Material Master (Product) | MM |
| API_JOURNALENTRIES_PROCESS_SRV | V2 | Journal Entry Posting API | FI |
| API_MATERIAL_STOCK_SRV | V2 | Material Stock Read | MM |
| API_PRODUCTION_ORDER_SRV | V2 | Production Order — create and update | PP |
| API_FIXED_ASSET_SRV | V2 | Fixed Asset Master Read | FI-AA |
| API_MAINTENANCE_ORDER_SRV | V2 | Maintenance Order Management | PM |
| API_COST_CENTER_SRV | V2 | Cost Center Master Read | CO |

---

## BAPI Stability Contracts

BAPIs are **not released for ABAP Cloud** — they are only available in compatibility tier (Tier 2 on S/4HANA On-Premise). For new development:

| Instead of BAPI | Use This Released API |
|----------------|-----------------------|
| BAPI_SALESORDER_CREATEFROMDAT2 | API_SALES_ORDER_SRV (OData) or CL_SALESDOCUMENT_API (RAP) |
| BAPI_PO_CREATE1 | API_PURCHASEORDER_PROCESS_SRV |
| BAPI_GOODSMVT_CREATE | I_GoodsMovement (CDS) + RAP action |
| BAPI_ACC_DOCUMENT_POST | API_JOURNALENTRIES_PROCESS_SRV |
| BAPI_MATERIAL_SAVEDATA | API_PRODUCT_SRV or CALL BAPI via Tier 2 |
| BAPI_PRODORD_CREATE | API_PRODUCTION_ORDER_SRV |

---

## Release Contract Decision Tree

```
Is the API annotated USE_IN_CLOUD_DEVELOPMENT or C2?
  YES → Safe to use in ABAP Cloud and extensions
  NO  → Is it C1 (Key User)?
          YES → Only for Fiori adaptation and key user extensibility
          NO  → Is it a released OData service on API Business Hub?
                  YES → Use via HTTP client / destination
                  NO  → DO NOT USE — find an alternative released API
                        or raise a request via SAP Influence (influence.sap.com)
```

---

## API Business Hub Quick Reference

- **URL:** api.sap.com
- **Filter by:** Product = "SAP S/4HANA" → Category → Module
- **Status filter:** Active (avoid Deprecated and Decommissioned)
- **Sandbox:** Available for most APIs; use client ID from "Configure Environments"
- **OpenAPI spec:** Downloadable per API for mock server generation and contract testing
