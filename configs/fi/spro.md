# SPRO Configuration: Financial Accounting (FI)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Company Code | SPRO > Enterprise Structure > Definition > Financial Accounting > Edit, Copy, Delete, Check Company Code | T001 | Smallest organizational unit for which a complete set of accounts is maintained |
| Business Area | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Business Area | TGSB | Cross-company code reporting segment (optional, replaced by profit center in S/4HANA) |
| Chart of Accounts | SPRO > Financial Accounting > General Ledger Accounting > Master Data > G/L Accounts > Preparations > Edit Chart of Accounts List | T004 | INT (international), CAUS (US), CADE (Germany) — defines G/L account structure |
| Assign Company Code to Chart of Accounts | SPRO > Financial Accounting > General Ledger Accounting > Master Data > G/L Accounts > Preparations > Assign Company Code to Chart of Accounts | T001 (KTOPL) | Each company code uses exactly one operational chart of accounts |
| Fiscal Year Variant | SPRO > Financial Accounting > Financial Accounting Global Settings > Fiscal Year > Maintain Fiscal Year Variant | T009 / T009B | K4 (calendar year), V3 (Apr-Mar) — defines posting periods and special periods |
| Assign Fiscal Year Variant to Company Code | SPRO > Financial Accounting > Financial Accounting Global Settings > Fiscal Year > Assign Fiscal Year Variant to Company Code | T001 (PERIV) | Links fiscal year definition to company code |
| Credit Control Area | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Credit Control Area | T014 | Controls customer credit limits; can span multiple company codes |
| Functional Area | SPRO > Enterprise Structure > Definition > Financial Accounting > Define Functional Area | TFKB | Cost-of-sales reporting dimension (production, admin, sales, R&D) |

### General Ledger Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Account Group | SPRO > Financial Accounting > General Ledger Accounting > Master Data > G/L Accounts > Preparations > Define Account Group | T077S | Controls number range and field status of G/L master records |
| Field Status Variant | SPRO > Financial Accounting > General Ledger Accounting > Master Data > G/L Accounts > Preparations > Define Field Status Variants | T004F | Controls which fields are required/optional/suppressed during document entry |
| Posting Keys | SPRO > Financial Accounting > General Ledger Accounting > Business Transactions > Posting Keys > Define Posting Keys | TBSL | 40 (debit G/L), 50 (credit G/L), 01 (debit customer), 31 (credit vendor) |
| Document Types | SPRO > Financial Accounting > General Ledger Accounting > Business Transactions > Document Types > Define Document Types for Entry View | T003 | SA (G/L), KR (vendor invoice), DR (customer invoice), AB (clearing), AA (asset posting) |
| Number Ranges for FI Documents | SPRO > Financial Accounting > General Ledger Accounting > Business Transactions > Document Number Ranges > Define Document Number Ranges | NRIV (RF_BELEG) | Internal/external number ranges per document type per company code |
| Posting Period Variant | SPRO > Financial Accounting > Financial Accounting Global Settings > Document > Posting Periods > Define Variants for Open Posting Periods | T001 (OPVAR) / T009 | Controls which periods are open for posting; separate ranges for account types |
| Open/Close Posting Periods | SPRO > Financial Accounting > Financial Accounting Global Settings > Document > Posting Periods > Open and Close Posting Periods | T009B | Period 1-12 + special periods 13-16; opened by account type (S, D, K, A, M) |
| Tolerance Groups | SPRO > Financial Accounting > General Ledger Accounting > Business Transactions > Define Tolerance Groups for G/L Accounts | T043T | Payment difference tolerances for clearing transactions |

### Accounts Receivable
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Customer Account Groups | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Customer Accounts > Master Data > Preparations for Creating Customer Master Data > Define Account Groups with Screen Layout | T077D | Controls field status, number range, and partner determination for customer master |
| Reconciliation Accounts | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Customer Accounts > Master Data > Preparations for Creating Customer Master Data > Define Reconciliation Accounts for Customer Down Payments | T001 / SKB1 | G/L account type D; auto-updated by customer postings |
| Payment Terms | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Incoming Invoices/Credit Memos > Maintain Terms of Payment | T052 | Z001 (Net 30), Z010 (2/10 Net 30) — drives due date and cash discount calculation |
| Dunning Procedure | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Dunning > Define Dunning Procedures | T047 | Dunning levels, intervals, minimum amounts, and correspondence per level |
| Interest Calculation | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Interest Calculation > Define Interest Calculation Types | T056 | Arrears interest, balance interest — calculates interest on overdue items |
| Credit Management | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Credit Management > Credit Control Account > Define Risk Categories | T014 / UKM_* (S/4) | Credit limits, risk categories, and automatic credit checks at order/delivery/billing |

### Accounts Payable
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Vendor Account Groups | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Vendor Accounts > Master Data > Preparations for Creating Vendor Master Data > Define Account Groups with Screen Layout | T077K | Controls field status and number ranges for vendor master records |
| Payment Program (Automatic Payments) | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Outgoing Payments > Automatic Outgoing Payments > Payment Method/Bank Selection for Payment Program | T042 / T042Z | F110 config: paying company code, payment methods, bank determination, house banks |
| House Banks | SPRO > Financial Accounting > Bank Accounting > Bank Accounts > Define House Banks | T012 | Company's own bank accounts; linked to G/L accounts for bank clearing |
| Payment Methods | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Outgoing Payments > Automatic Outgoing Payments > Payment Method/Bank Selection for Payment Program > Set Up Payment Methods per Country/Company Code | T042Z | C (check), T (bank transfer), E (ACH), S (SEPA) — per country and company code |
| Withholding Tax | SPRO > Financial Accounting > Financial Accounting Global Settings > Withholding Tax > Extended Withholding Tax > Calculation > Define Withholding Tax Type | T059Z | Classic or extended withholding tax; type, code, rates for 1099/TDS |
| Vendor Down Payments | SPRO > Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Down Payment Made > Define Reconciliation Accounts for Down Payments | T001 / SKB1 | Special G/L indicator A for vendor down payments; alternative recon account |

### Bank Accounting and Cash Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Bank Account Determination | SPRO > Financial Accounting > Bank Accounting > Bank Accounts > Define House Banks | T012 / T012K | Maps house bank + account ID to G/L account |
| Electronic Bank Statement | SPRO > Financial Accounting > Bank Accounting > Business Transactions > Payment Transactions > Electronic Bank Statement > Define Global Settings for Electronic Bank Statement | T028B / FEBKO | BAI2/MT940 format mapping; posting rules, account symbols, and search strings |
| Cash Journal | SPRO > Financial Accounting > Bank Accounting > Business Transactions > Cash Journal > Define Cash Journal | T028V | Petty cash management with G/L account assignment and business transaction codes |
| Bank Reconciliation | SPRO > Financial Accounting > Bank Accounting > Business Transactions > Payment Transactions > Manual Bank Statement > Define Posting Rules | T028R | Matching rules for bank statement items to open FI items |
| Cash Management Position | SPRO > Financial Accounting > Bank Accounting > Business Transactions > Cash Management > Define Planning Levels | FDLEV | Liquidity forecast grouping by planning type (receipts, disbursements, balances) |

### Asset Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Chart of Depreciation | SPRO > Financial Accounting > Asset Accounting > Organizational Structures > Define Chart of Depreciation | T093 | Country-specific; one per client, assigned to company code |
| Asset Classes | SPRO > Financial Accounting > Asset Accounting > Organizational Structures > Asset Classes > Define Asset Classes | ANLA / T095 | Groups assets by type (buildings, vehicles, IT equipment); drives account determination |
| Depreciation Areas | SPRO > Financial Accounting > Asset Accounting > Depreciation > Valuation Methods > Depreciation Areas > Define Depreciation Areas | T093B | 01 (book), 15 (cost center), 20 (tax), 30 (IFRS) — parallel valuation |
| Depreciation Keys | SPRO > Financial Accounting > Asset Accounting > Depreciation > Valuation Methods > Depreciation Key > Define Depreciation Keys | T093C / ANLB | LINA (straight-line), DEGR (declining balance), GWG (low-value) — calculation method + useful life |
| Account Determination for Asset Classes | SPRO > Financial Accounting > Asset Accounting > Asset Classes > Specify Account Determination | TABW / AO90 | Maps asset class to G/L accounts for acquisition, depreciation, retirement, gain/loss |
| Number Ranges for Assets | SPRO > Financial Accounting > Asset Accounting > Organizational Structures > Asset Classes > Define Number Range Intervals | NRIV (AS_NRANL) | Internal/external number ranges per asset class |

## Critical Configuration Dependencies

1. **Client and Country settings** must be configured before Company Code creation
2. **Chart of Accounts** must be defined and assigned to Company Code before any G/L account can be created
3. **Fiscal Year Variant** must be assigned to Company Code before any postings can occur
4. **Field Status Variant** must be assigned to Company Code before G/L accounts can be configured properly
5. **Posting Period Variant** must be defined and periods opened before document posting
6. **G/L accounts** (especially reconciliation accounts) must exist before AR/AP master data creation
7. **House Banks** and G/L accounts for bank clearing must be configured before automatic payment program runs
8. **Chart of Depreciation** must be assigned to Company Code, and Depreciation Areas configured, before Asset Classes can be set up
9. **Document Types and Number Ranges** must be configured before any transaction posting in the module

## Common Configuration Mistakes

1. **Field Status conflicts** — G/L account field status (account group) conflicts with document type field status, causing fields to be unexpectedly suppressed or required. The intersection rule (required > optional > suppressed) catches consultants off guard.
2. **Posting period not opened** — Forgetting to open the correct posting period for the right account type, or closing a period while month-end clearing is still in progress.
3. **Tolerance group misconfiguration** — Not setting up tolerance groups for users (blank = default), leading to either excessive manual clearing flexibility or unexpected payment difference rejections.
4. **Automatic payment program bank determination** — House bank ranking, bank account amounts, and payment method priority not configured correctly, causing F110 to skip vendors or select wrong bank accounts.
5. **Asset Accounting account determination gaps** — Missing G/L accounts for specific transaction types (retirement gain/loss, revaluation, transfer) in the asset class account determination, causing posting failures during asset lifecycle events.
