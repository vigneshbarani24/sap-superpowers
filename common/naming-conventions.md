# Naming Conventions

## Object Naming
All custom objects use **Z** or **Y** prefix (or registered customer namespace `/CUST/`).

| Object Type | Pattern | Example |
|-------------|---------|---------|
| Program (report) | Z{MODULE}{TYPE}{NN} | ZMM_REPORT_01 |
| Program (module pool) | SAPMZ{MODULE}{NN} | SAPMZMM01 |
| Class | ZCL_{DOMAIN}_{PURPOSE} | ZCL_FI_PAYMENT_HANDLER |
| Interface | ZIF_{DOMAIN}_{PURPOSE} | ZIF_FI_PAYMENT |
| Function Group | Z{MODULE}_{PURPOSE} | ZMM_PROCUREMENT |
| Function Module | Z_{MODULE}_{VERB}_{OBJECT} | Z_MM_GET_VENDOR_DATA |
| CDS View (Interface) | ZI_{ENTITY} | ZI_PURCHASEORDER |
| CDS View (Consumption) | ZC_{ENTITY} | ZC_PURCHASEORDER |
| CDS View (Abstract) | ZA_{ENTITY} | ZA_PURCHASEORDERCREATE |
| CDS View (Restricted) | ZR_{ENTITY} | ZR_PURCHASEORDER |
| RAP Business Object | ZI_{BO}_{ENTITY} | ZI_TRAVEL_BOOKING |
| Table | Z{MODULE}_{ENTITY} | ZMM_CUSTOM_MAP |
| Table Type | ZTT_{ENTITY} | ZTT_VENDOR_LIST |
| Structure | ZS_{ENTITY} | ZS_VENDOR_DATA |
| Data Element | ZDE_{FIELD} | ZDE_VENDOR_SCORE |
| Domain | ZDO_{DOMAIN} | ZDO_APPROVAL_STATUS |
| Message Class | Z{MODULE} | ZMM, ZFI, ZSD |
| Lock Object | EZ_{TABLE} | EZ_CUSTOM_MAP |
| Enhancement Implementation | ZEI_{PURPOSE} | ZEI_PO_VALIDATION |

## Include Naming (Programs)
| Include Suffix | Purpose |
|---------------|---------|
| _TOP | Global data declarations (TOP include) |
| _SEL | Selection screen definitions |
| _CLS | Local class definitions and implementations |
| _ALV | ALV output handling |
| _PBO | Process Before Output modules |
| _PAI | Process After Input modules |
| _EVT | Event handler implementations |
| _FRM | FORM subroutines (procedural — avoid in new code) |
| _TST | ABAP Unit test classes |

## Variable Naming
| Scope | Prefix | Example |
|-------|--------|---------|
| Local variable | lv_ (scalar), lt_ (table), ls_ (structure), lr_ (reference), lo_ (object) | lv_amount, lt_items |
| Global variable | gv_, gt_, gs_, gr_, go_ | gv_bukrs |
| Parameter | iv_ (importing), ev_ (exporting), cv_ (changing), rv_ (returning) | iv_document_number |
| Field symbol | <fs_>, <lt_>, <ls_> | <fs_item> |
| Constant | co_ or gc_ | co_status_active |
| Type | ty_ | ty_s_vendor, ty_t_vendor |

## Screen Naming
| Screen Range | Purpose |
|-------------|---------|
| 0100 | Main screen / ALV display |
| 0200 | Detail / Edit screen |
| 0300 | Search help / Popup |
| 0900 | Selection screen (if custom) |
| 9000+ | Subscreen containers |

## Transport Description
```
{MODULE}-{TYPE}-{Brief Description}
Types: NEW (new development), ENH (enhancement), FIX (bug fix), CFG (config), MIG (migration)
Example: FI-ENH-Add custom validation for vendor payment block
```
