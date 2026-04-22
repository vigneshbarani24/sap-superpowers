# SPRO Configuration: Business Warehouse / Analytics (BW)

## Key Configuration Areas

### System Administration and Setup
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Source System Configuration | SPRO > SAP BW > Data Transfer > Source Systems > Define Source Systems | RSBASIDOC / RSLOGSYSMAP | Register ECC/S4 source systems; RFC destination, logical system mapping |
| BW Client Settings | SPRO > SAP BW > General Settings > Define BW Client Settings | RSCLIENTCP | Client-level activation of BW objects, transport behavior, and parallel processing |
| Background Processing | SPRO > SAP BW > General Settings > Define Background Processing Settings | RSBATCHCTRL | Number of parallel processes for data loading, process chains, and OLAP queries |
| Number Ranges for BW Objects | SPRO > SAP BW > General Settings > Maintain Number Ranges | NRIV (BW*) | Number ranges for InfoObjects, DataStore Objects, process chains, and transformations |
| Transport Connection | SPRO > SAP BW > Transport > Define Transport Connection | RSTRANCONN | Transport layer configuration between BW development, quality, and production systems |
| Authority Check Settings | SPRO > SAP BW > Authorization > Define Authorization Checks | RSAU | Analysis authorizations, reporting authorizations, and object-level access control |

### Data Modeling (InfoObjects and InfoProviders)
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| InfoObject Catalog | SPRO > SAP BW > Data Modeling > InfoObjects > Define InfoObject Catalog | RSDIOBJCAT | Grouping of InfoObjects by subject area (customer, material, time, financial) |
| InfoObject Properties | SPRO > SAP BW > Data Modeling > InfoObjects > Define InfoObject Properties | RSDIOBJ | Characteristic vs. key figure; aggregation, currency/unit reference, master data attributes |
| InfoArea | SPRO > SAP BW > Data Modeling > Define InfoAreas | RSINFOAREA | Folder structure for organizing InfoProviders, InfoObjects, and queries |
| Advanced DataStore Object (aDSO) | SPRO > SAP BW > Data Modeling > DataStore Objects > Define DataStore Object Types | RSDODSO | Standard, write-optimized, direct update — storage layer for staging and reporting |
| CompositeProvider | SPRO > SAP BW > Data Modeling > CompositeProviders > Define CompositeProvider | RSDHCPROV | Virtual join or union of multiple InfoProviders for cross-subject-area reporting |
| Open ODS View | SPRO > SAP BW > Data Modeling > Open ODS Views > Define Open ODS Views | RSODSO_VIEW | Virtual access to CDS views, database tables, or remote tables without data replication |
| Semantically Partitioned Objects | SPRO > SAP BW > Data Modeling > Define Semantically Partitioned Objects | RSPLS_PART | Partition large InfoProviders by fiscal year or other characteristic for performance |

### Data Extraction and Loading
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| DataSource Configuration | SPRO > SAP BW > Data Transfer > DataSources > Define DataSource Settings | ROOSOURCE | Extraction configuration in source system; delta mechanism, selection fields, extraction mode |
| Extraction Delta Methods | SPRO > SAP BW > Data Transfer > Delta Process > Define Delta Methods | RODELTAM | ABR (after-image with delete), AIM (additive delta), AIE (after-image), FIL (full with filter) |
| InfoPackage Settings | SPRO > SAP BW > Data Transfer > InfoPackages > Define InfoPackage Settings | RSLDPIO | Data selection, processing mode, update rules, error handling per extraction run |
| Data Transfer Process (DTP) | SPRO > SAP BW > Data Transfer > DTP > Define DTP Settings | RSBKDTP | Controls data movement from PSA to DataStore Object; filter, error handling, and processing mode |
| Transformation Rules | SPRO > SAP BW > Data Transfer > Transformations > Define Transformation Settings | RSTRAN | Field mapping, ABAP routines, formulas, and expert routines for data transformation |
| Process Chain Management | SPRO > SAP BW > Data Transfer > Process Chains > Define Process Chain Settings | RSPCCHAIN | Orchestrates extraction, transformation, activation, and reporting refresh in scheduled sequences |
| Error Handling and Data Quality | SPRO > SAP BW > Data Transfer > Error Handling > Define Error Stack Settings | RSERROR | Error DTP, error stack management, and reprocessing rules for failed records |

### Query and Reporting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Query Properties | SPRO > SAP BW > Reporting > Query Design > Define Query Properties | RSZCOMPDIR | Default settings for query execution (read mode, cache, delta caching) |
| Query Read Mode | SPRO > SAP BW > Reporting > Performance > Define Read Mode | RSQRMODE | H (read from cache/DB), X (read from DB only), Q (read from OLAP cache) — performance tuning |
| Aggregate Management | SPRO > SAP BW > Reporting > Performance > Define Aggregate Settings | RSAGGR | Pre-aggregated summary tables for frequently used characteristic combinations |
| BW Accelerator / HANA-Optimized | SPRO > SAP BW > Reporting > Performance > Define HANA Optimization | RSHANAOPT | In-memory acceleration settings for BW on HANA; HANA composite providers |
| Analysis Authorization | SPRO > SAP BW > Authorization > Analysis Authorizations > Define Analysis Authorization Settings | RSECADMIN | Row-level security on InfoProvider data based on characteristic values (company code, cost center) |
| Variable Settings | SPRO > SAP BW > Reporting > Query Design > Define Variable Types | RSZGLOBV | User input, authorization, replacement path, SAP exit, customer exit — query variable types |

### Process Chains
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Process Types | SPRO > SAP BW > Data Transfer > Process Chains > Define Process Types | RSPCPROCESSTYPE | Load, activate, aggregate fill, delete, ABAP program, event trigger — chain building blocks |
| Scheduling and Monitoring | SPRO > SAP BW > Data Transfer > Process Chains > Define Scheduling Settings | RSPCCHAIN (SCHED) | Time-based, event-based, or API-triggered scheduling with monitoring alerts |
| Variant Maintenance | SPRO > SAP BW > Data Transfer > Process Chains > Define Process Variants | RSPCVARIANT | Execution parameters for each process type within a chain (date selection, InfoPackage ID) |
| Meta Chain | SPRO > SAP BW > Data Transfer > Process Chains > Define Meta Chain | RSPCCHAINMETA | Chain of chains; orchestrates multiple process chains with dependency logic |
| Alert and Exception Handling | SPRO > SAP BW > Data Transfer > Process Chains > Define Alert Settings | RSPCALERT | Email, workflow, and CCMS alerts on process chain failure or threshold breach |

### BW/4HANA Specific
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| HANA Data Tiering | SPRO > SAP BW > Data Modeling > HANA Settings > Define Data Tiering | RSHANA_TIER | Hot (in-memory), warm (NSE), cold (data lake) — data lifecycle management |
| Mixed Scenarios (Live + Replicated) | SPRO > SAP BW > Data Modeling > Open ODS Views > Define Mixed Scenario Settings | RSODSO_MIXED | Combine real-time CDS views with replicated historical data for hybrid reporting |
| SAP Analytics Cloud Integration | SPRO > SAP BW > Reporting > SAC Integration > Define SAC Live Connection | RSSAC_CONN | Live data connection from SAC to BW/4HANA queries for cloud-based analytics |
| Data Provisioning Agent | SPRO > SAP BW > Data Transfer > Define Data Provisioning Agent | RSDPA_AGENT | Non-SAP source connectivity via SDA (Smart Data Access) and SDI (Smart Data Integration) |
| Composite Provider Types | SPRO > SAP BW > Data Modeling > CompositeProviders > Define CompositeProvider Types | RSDHCPROV_TYPE | Union, join, and mixed provider types; HANA calculation view integration |

## Critical Configuration Dependencies

1. **Source System RFC connections** must be active and tested before DataSource replication and extraction
2. **InfoObjects** must be created and activated before they can be used in aDSO, transformations, or queries
3. **DataSource activation** in source system must complete before InfoPackage extraction works
4. **Transformation rules** must be created between source and target before DTP can move data
5. **Process Chains** require all referenced objects (InfoPackages, DTPs, aDSOs) to be activated before chain execution
6. **Analysis Authorizations** must be assigned to user roles before query results are filtered correctly
7. **Aggregates** should be defined after query usage patterns are analyzed — premature aggregation wastes resources
8. **BW/4HANA migration** requires conversion of classic InfoCubes and MultiProviders to aDSOs and CompositeProviders before go-live

## Common Configuration Mistakes

1. **Delta initialization skipped or repeated** — Not initializing delta extraction properly, causing duplicate records or missing data in subsequent delta loads.
2. **Process chain scheduling conflicts** — Multiple process chains competing for the same background work processes or trying to load the same target simultaneously without proper serialization.
3. **Transformation routine performance** — Writing ABAP expert routines with nested SELECTs or inefficient loops, causing data load times to explode on large record volumes.
4. **Analysis authorization overly restrictive** — Configuring row-level security that inadvertently blocks legitimate users from seeing required data, especially when authorization-relevant characteristics have hierarchies.
5. **Aggregate and cache invalidation** — Not configuring aggregate rollup or cache invalidation after data loads, causing queries to return stale results from outdated aggregates or OLAP cache.
