# SPRO Configuration: Sales and Distribution (SD)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Sales Organization | SPRO > Enterprise Structure > Definition > Sales and Distribution > Define, copy, delete, check sales organization | TVKO | Highest-level org unit in SD; drives pricing, conditions, and master data |
| Distribution Channel | SPRO > Enterprise Structure > Definition > Sales and Distribution > Define, copy, delete, check distribution channel | TVTW | Channel through which goods reach customer (wholesale, retail, direct) |
| Division | SPRO > Enterprise Structure > Definition > Sales and Distribution > Define, copy, delete, check division | TSPA | Product line grouping; controls material-specific settings |
| Sales Area | SPRO > Enterprise Structure > Assignment > Sales and Distribution > Set up sales area | TVTA | Combination of sales org + dist channel + division; key for master data |
| Assign Sales Org to Company Code | SPRO > Enterprise Structure > Assignment > Sales and Distribution > Assign sales organization to company code | TVKO (BUKRS field) | Links SD billing to FI accounting |
| Assign Plant to Sales Org/Dist Channel | SPRO > Enterprise Structure > Assignment > Sales and Distribution > Assign plant to sales organization/distribution channel | TVKWZ | Determines which plants can deliver for a sales area |
| Sales Office | SPRO > Enterprise Structure > Definition > Sales and Distribution > Maintain sales office | TVBUR | Geographic sales office for reporting and authorization |
| Sales Group | SPRO > Enterprise Structure > Definition > Sales and Distribution > Maintain sales group | TVGRUPPE | Group of sales personnel within a sales office |

### Pricing and Conditions
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Condition Table | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Condition Tables | T681 | Defines key combination for condition records (field catalog) |
| Access Sequence | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Access Sequences | T682I | Search strategy for finding condition records (most specific to least) |
| Condition Type | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Condition Types | T685 | Price element type (PR00 = price, K004 = discount, MWST = tax) |
| Pricing Procedure | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define and Assign Pricing Procedures | T683 | Sequence of condition types applied to a sales document |
| Pricing Procedure Determination | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define and Assign Pricing Procedures > Determine Pricing Procedure | T683V | Links customer pricing procedure + document pricing procedure to pricing procedure |
| Condition Exclusion Groups | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Condition Exclusion Groups | T685B | Controls which discounts can combine and which are exclusive |
| Account Keys | SPRO > Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Account Keys | T685A | Maps condition types to G/L accounts for revenue account determination |

### Sales Document Types
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Sales Document Types | SPRO > Sales and Distribution > Sales > Sales Documents > Sales Document Header > Define Sales Document Types | TVAK | OR (standard order), RE (returns), CR (credit memo req), SO (rush order), etc. |
| Item Categories | SPRO > Sales and Distribution > Sales > Sales Documents > Sales Document Item > Define Item Categories | TVAP | TAN (standard), TANN (free of charge), TAX (text item) — controls billing, pricing, scheduling |
| Item Category Determination | SPRO > Sales and Distribution > Sales > Sales Documents > Sales Document Item > Assign Item Categories | T184 | Auto-determines item category from doc type + item cat group + usage + higher-level item |
| Schedule Line Categories | SPRO > Sales and Distribution > Sales > Sales Documents > Schedule Lines > Define Schedule Line Categories | TVEP | Controls MRP relevance, movement type, and availability check per line |
| Schedule Line Category Determination | SPRO > Sales and Distribution > Sales > Sales Documents > Schedule Lines > Assign Schedule Line Categories | TVEPZ | Maps item category + MRP type to schedule line category |
| Copy Control (Order to Delivery) | SPRO > Sales and Distribution > Sales > Maintain Copy Control for Sales Documents | TVCPF | Controls data flow and checks when copying between document types |

### Shipping and Delivery
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Delivery Types | SPRO > Logistics Execution > Shipping > Deliveries > Define Delivery Types | TVLK | LF (outbound delivery), LR (return delivery), EL (inbound delivery) |
| Shipping Point Determination | SPRO > Logistics Execution > Shipping > Basic Shipping Functions > Shipping Point and Goods Receiving Point Determination > Assign Shipping Points | TVST | Plant + shipping conditions + loading group = shipping point |
| Route Determination | SPRO > Logistics Execution > Shipping > Basic Shipping Functions > Routes > Define Routes | TVRO | Departure zone + transportation zone = route; drives transit time and freight |
| Picking and Packing | SPRO > Logistics Execution > Shipping > Picking > Define Picking Locations | T331 | Warehouse/storage location for pick; controls lean WM or full WM |
| Goods Issue | SPRO > Logistics Execution > Shipping > Goods Issue > Set Default Values for Goods Issue | TVLK (WMS_FLAG) | Movement type 601 for standard GI; triggers FI posting and inventory reduction |
| Transportation Planning | SPRO > Logistics Execution > Transportation > Basic Transportation Functions > Define Transportation Planning Types | T5TR | Groups shipments for carrier assignment and freight cost calculation |

### Billing
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Billing Document Types | SPRO > Sales and Distribution > Billing > Billing Documents > Define Billing Types | TVFK | F2 (invoice), G2 (credit memo), L2 (debit memo), S1 (cancellation) |
| Copy Control (Delivery to Billing) | SPRO > Sales and Distribution > Billing > Billing Documents > Maintain Copying Control for Billing Documents | TVCPF | Controls which delivery types flow into which billing types |
| Revenue Account Determination | SPRO > Sales and Distribution > Basic Functions > Account Assignment/Costing > Revenue Account Determination > Assign G/L Accounts | VKOA | Maps chart of accounts + sales org + account key + condition type to G/L account |
| Billing Plan Types | SPRO > Sales and Distribution > Billing > Billing Plan > Define Billing Plan Types | TFPLA | Milestone billing and periodic billing configuration for project/service scenarios |
| Invoice Lists | SPRO > Sales and Distribution > Billing > Invoice Lists > Define Invoice List Types | TVFK (FKART) | Collective invoicing for factoring or EDI scenarios |
| Output Determination (Billing) | SPRO > Sales and Distribution > Basic Functions > Output Determination > Output Determination Using Condition Technique > Maintain Output Determination for Billing Documents | NACH / TNAPR | Controls invoice print, EDI, email output using condition technique |

### Partner Determination and Text
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Partner Determination Procedure | SPRO > Sales and Distribution > Basic Functions > Partner Determination > Set Up Partner Determination > Set Up Partner Determination for Sales Document Header | TPAR / TB000 | Defines mandatory/optional partner functions (SP, SH, BP, PY) per doc type |
| Customer Account Groups | SPRO > Sales and Distribution > Master Data > Business Partners > Customer Account Groups > Define Account Groups for Customers | T077D | Controls field status of customer master (sold-to, ship-to, payer) and number ranges |
| Text Determination | SPRO > Sales and Distribution > Basic Functions > Text Control > Define Text Types > Define Text Types for Sales Documents | TTXID | Header/item text types, text determination procedures, and access sequences |
| Incompletion Procedures | SPRO > Sales and Distribution > Basic Functions > Log of Incomplete Items > Define Incompletion Procedures | V_TVUV | Blocks save/delivery/billing if critical fields are missing (e.g., no PO number) |
| Material Determination | SPRO > Sales and Distribution > Basic Functions > Material Determination > Define Material Determination Procedure | T683 (VB) | Product substitution or material cross-reference at order entry |

## Critical Configuration Dependencies

1. **Company Code** (FI) must exist before Sales Organization can be assigned to it
2. **Plant** (MM/Logistics) must exist before it can be assigned to a Sales Org / Distribution Channel
3. **Sales Area** (Sales Org + Dist Channel + Division) must be defined before any SD master data or transactions
4. **Condition Tables and Access Sequences** must be created before Condition Types that reference them
5. **Pricing Procedure** must be built before Pricing Procedure Determination can link it to document/customer
6. **Sales Document Types** must be configured before Copy Control between document types
7. **Revenue Account Determination** (VKOA) must be configured before billing can post to FI — this is often the last SD config step but must not be forgotten
8. **Shipping Points** must be assigned to Plants before delivery processing works
9. **Output Determination** must be configured end-to-end (condition table > access sequence > output type > procedure) before any document output (print/EDI/email) works

## Common Configuration Mistakes

1. **Missing Sales Area assignments** — Forgetting to assign distribution channels and divisions to the sales organization, or forgetting the plant assignment. Transactions fail silently or with cryptic errors.
2. **Pricing Procedure not determined** — The three-way link (sales area pricing procedure + customer pricing procedure + document pricing procedure) is incomplete, resulting in orders with no prices.
3. **Revenue Account Determination gaps** — Not covering all combinations of account key, condition type, and sales org in VKOA. Billing documents fail to post to FI with error "Account determination: no G/L account found."
4. **Copy Control not maintained** — Forgetting to set up copy control from order to delivery or delivery to billing for custom document types, so documents cannot reference each other.
5. **Incomplete Item Category Determination** — Custom material types or item category groups without proper entries in T184, causing "Item category could not be determined" errors at order creation.
