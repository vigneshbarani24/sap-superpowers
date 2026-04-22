# SPRO Configuration: SAP Ariba Integration (Ariba)

## Key Configuration Areas

### Ariba Network Integration Setup
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Ariba Network Configuration | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Ariba Network Settings | /ARBA/CONFIG | Cloud connector settings, Ariba Network ID (ANID), and API endpoint configuration |
| Supplier Enablement | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Supplier Enablement Settings | /ARBA/VENDOR | Maps SAP vendor numbers to Ariba Network IDs for electronic document exchange |
| Document Type Mapping | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Document Type Mapping | /ARBA/DOCTYPE | Maps SAP PO/invoice types to Ariba cXML document types (OrderRequest, InvoiceDetailRequest) |
| Communication Channel | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Communication Settings | /ARBA/COMM | cXML, EDI, or API-based communication; authentication, certificates, and retry logic |
| Error Handling | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Error Handling | /ARBA/ERROR | Retry intervals, alert recipients, and fallback procedures for failed transmissions |
| Number Range Mapping | SPRO > Materials Management > Purchasing > Environment Data > Ariba Network Integration > Define Number Mapping | /ARBA/NRMAP | Cross-reference between SAP document numbers and Ariba transaction IDs |

### Ariba Sourcing Integration
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Sourcing Project Templates | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Sourcing Templates | /ARBA/SRCTEMPL | RFx templates, auction types (English, Dutch, sealed bid), and evaluation criteria |
| Commodity Mapping | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Commodity Mapping | /ARBA/COMMODITY | Maps SAP material groups to UNSPSC commodity codes used in Ariba |
| Contract Workspace Integration | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Contract Integration Settings | /ARBA/CONTRACT | Links Ariba contract workspaces to SAP outline agreements and scheduling agreements |
| Approval Workflow | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Approval Flow Settings | /ARBA/APPROVAL | Sourcing event approval rules; value-based, commodity-based, and organizational approvals |
| Supplier Qualification | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Supplier Qualification Settings | /ARBA/QUAL | Qualification questionnaires, risk scoring, and preferred supplier list management |
| Award Scenario Configuration | SPRO > Materials Management > Purchasing > Ariba Sourcing > Define Award Scenarios | /ARBA/AWARD | Total cost of ownership, multi-attribute scoring, and lot-based award rules |

### Ariba Procurement (Guided Buying / Buying)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Catalog Integration | SPRO > Materials Management > Purchasing > Ariba Procurement > Define Catalog Settings | /ARBA/CATALOG | Punch-out (OCI), hosted catalog, and CIF catalog connectivity to Ariba |
| Purchase Requisition Integration | SPRO > Materials Management > Purchasing > Ariba Procurement > Define PR Integration | /ARBA/PR_INT | Maps Ariba shopping cart to SAP purchase requisition; account assignment and approval routing |
| Purchase Order Transmission | SPRO > Materials Management > Purchasing > Ariba Procurement > Define PO Transmission Settings | /ARBA/PO_TRANS | Outbound PO to Ariba Network; cXML OrderRequest mapping and confirmation handling |
| Invoice Automation (Ariba SLP) | SPRO > Materials Management > Purchasing > Ariba Procurement > Define Invoice Integration | /ARBA/INV_INT | Supplier-initiated invoices via Ariba Network; auto-matching against PO and GR in SAP |
| Goods Receipt Integration | SPRO > Materials Management > Purchasing > Ariba Procurement > Define GR Integration | /ARBA/GR_INT | Service entry sheet and goods receipt confirmation flow back to Ariba for three-way match |
| Payment Status Update | SPRO > Materials Management > Purchasing > Ariba Procurement > Define Payment Status Settings | /ARBA/PAY_STAT | Sends payment status (remittance advice) from SAP to Ariba for supplier visibility |

### SAP Business Network (Successor to Ariba Network)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Business Network Integration | SPRO > Materials Management > Purchasing > SAP Business Network > Define Integration Settings | /SBN/CONFIG | Cloud Integration tenant, API credentials, and business network profile |
| Trading Partner Management | SPRO > Materials Management > Purchasing > SAP Business Network > Define Trading Partner Settings | /SBN/PARTNER | Discovery, qualification, and onboarding of suppliers on SAP Business Network |
| Supply Chain Collaboration | SPRO > Materials Management > Purchasing > SAP Business Network > Define Supply Chain Settings | /SBN/SC_COLLAB | Forecast sharing, inventory visibility, and quality collaboration with suppliers |
| Asset Intelligence Network | SPRO > Materials Management > Purchasing > SAP Business Network > Define Asset Network Settings | /SBN/AIN | Equipment master data sharing, maintenance history, and IoT integration across companies |
| Logistics Network | SPRO > Materials Management > Purchasing > SAP Business Network > Define Logistics Network Settings | /SBN/LOGNET | Freight collaboration, carrier tendering, and shipment visibility via Business Network |

### Cloud Integration (Middleware)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| SAP Integration Suite Configuration | SPRO > Cross-Application Components > SAP Cloud Connector > Define Cloud Connector Settings | SLDCHECK | Cloud Connector setup for secure tunnel between on-premise SAP and Ariba cloud |
| IDoc/cXML Mapping | SPRO > Cross-Application Components > IDoc Interface > Define IDoc-cXML Mapping | /ARBA/IDOC_MAP | Maps SAP IDoc segments to Ariba cXML elements for document exchange |
| API Management | SPRO > Cross-Application Components > API Management > Define API Settings | /ARBA/API | REST/OData API configuration for real-time integration with Ariba APIs |
| Middleware Monitoring | SPRO > Cross-Application Components > Integration Monitoring > Define Monitoring Settings | /ARBA/MONITOR | Dashboard for tracking message flow, errors, and SLA compliance between SAP and Ariba |
| Master Data Replication | SPRO > Cross-Application Components > Master Data Distribution > Define Replication Settings | /ARBA/MDR | Vendor, material, and organizational data synchronization from SAP to Ariba |
| Field Mapping and Transformation | SPRO > Cross-Application Components > Data Mapping > Define Field Mapping Rules | /ARBA/FIELDMAP | Custom field mapping for company-specific extensions in Ariba documents |

## Critical Configuration Dependencies

1. **SAP Cloud Connector** must be installed and configured before any Ariba cloud integration works
2. **Vendor Master** in SAP must have Ariba Network ID (ANID) maintained before electronic document exchange
3. **Material Group to UNSPSC mapping** must be complete before Ariba Sourcing can classify spend correctly
4. **Purchasing Organization** must be mapped to Ariba buying organization before requisitions flow correctly
5. **Ariba Realm** (test vs. production) must be correctly configured — test transactions on production realm cause real supplier notifications
6. **IDoc partner profiles** must be configured for Ariba message types before asynchronous document exchange
7. **Catalog content** must be maintained in Ariba before guided buying/punch-out works for end users
8. **Invoice matching rules** (2-way, 3-way) must be aligned between SAP tolerance settings and Ariba invoice rules

## Common Configuration Mistakes

1. **Ariba Network ID mismatch** — Supplier ANID in SAP does not match the supplier's actual Ariba Network registration, causing POs to be sent to wrong or non-existent network accounts.
2. **Cloud Connector certificate expiry** — Not monitoring SSL certificate expiration on the Cloud Connector, leading to sudden integration outage between SAP and Ariba cloud.
3. **Document type mapping gaps** — Not mapping all PO types or invoice types used in SAP to their Ariba equivalents, causing certain transaction types to fail silently on the Ariba side.
4. **Test vs. production realm confusion** — Testing integrations against the Ariba production realm instead of the test realm, sending real POs or invoices to actual suppliers.
5. **Master data synchronization lag** — Not configuring real-time or near-real-time master data replication, so vendor or material changes in SAP are not reflected in Ariba for hours or days, causing procurement process errors.
