# SPRO Configuration: Treasury (TR)

## Key Configuration Areas

### Enterprise Structure
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Company Code (Treasury) | SPRO > Financial Accounting > Financial Accounting Global Settings > Company Code > Define Company Code | T001 | Same FI company code; Treasury transactions post here |
| Bank Area | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Organizational Structures > Define Bank Area | T036 | Sub-division of company code for treasury; groups banking activities |
| Treasury Company | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Organizational Structures > Define Treasury Company | T036T | Treasury-specific entity that can span company codes for group treasury |
| Trading Partner | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Trading Partners | T036P | External counterparties (banks, financial institutions) for treasury deals |
| Portfolio | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Portfolios | T036A | Groups financial instruments for reporting, valuation, and risk analysis |

### Cash Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Planning Groups | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Cash Management > Define Planning Groups | FDLEV | Groups cash-relevant items by category (receivables, payables, planned items, memo records) |
| Planning Levels | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Cash Management > Define Planning Levels | FDLEV (LEVEL) | Hierarchy of liquidity groupings for cash position and liquidity forecast |
| Cash Position | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Cash Management > Set Up Cash Management > Determine Display Structure | FDTA | Real-time bank balance view; maps G/L accounts and planning types to cash position |
| Liquidity Forecast | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Cash Management > Set Up Cash Management > Define Liquidity Forecast | FDTA (LF) | Medium-term forecast using open items, planned orders, and manual memo records |
| Bank Account Management | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Bank Account Management > Define Account Symbols | T028A | Symbolic mapping of bank accounts for payment processing and cash concentration |
| Cash Concentration | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Cash Concentration > Define Cash Concentration | T028C | Zero-balancing, threshold-based sweeping between house bank accounts |
| Payment Factory | SPRO > Treasury and Risk Management > Cash and Liquidity Management > Payment Factory > Define Payment Factory Settings | FPAY | Central payment processing hub for multi-company-code environments |

### Transaction Manager
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Product Types | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Product Types | T036D | Fixed-term deposits, money market loans, bonds, FX forwards, interest rate swaps — instrument classification |
| Transaction Types | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Transaction Types | T036E | Purchase, sale, maturity, rollover — lifecycle events on financial instruments |
| Flow Types | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Flow Types | T036F | Principal, interest, fees, premiums — cash flow categories within transactions |
| Position Management | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Position Management > Activate Position Management | T036 (POS_MGMT) | Enables portfolio position tracking with average cost, realized/unrealized P&L |
| Limit Management | SPRO > Treasury and Risk Management > Transaction Manager > Limit Management > Define Limit Types | T056L | Counterparty, country, product limits — credit risk controls for treasury deals |
| Correspondence | SPRO > Treasury and Risk Management > Transaction Manager > General Settings > Define Correspondence Types | T036C | Confirmation letters, deal tickets, SWIFT messages — output from treasury deals |

### Market Risk Management
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Market Data Settings | SPRO > Treasury and Risk Management > Market Risk Analyzer > Market Data > Define Market Data Settings | TRB_MKT | Yield curves, FX rates, volatilities — market data feeds for valuation |
| Valuation Areas | SPRO > Treasury and Risk Management > Market Risk Analyzer > Valuation > Define Valuation Areas | TRB_VAL | Book value, fair value, hedge accounting — parallel valuation approaches |
| Risk Measures | SPRO > Treasury and Risk Management > Market Risk Analyzer > Risk Measures > Define Risk Measures | TRB_RISK | Value at Risk (VaR), sensitivities (BPV, delta, gamma) — market risk analytics |
| Yield Curve Types | SPRO > Treasury and Risk Management > Market Risk Analyzer > Market Data > Define Yield Curve Types | TRB_YC | Government, swap, corporate — benchmark curves for discounting and valuation |
| Scenario Analysis | SPRO > Treasury and Risk Management > Market Risk Analyzer > Scenario Analysis > Define Scenarios | TRB_SCEN | Stress testing and what-if scenarios for portfolio impact analysis |
| NPV Calculation | SPRO > Treasury and Risk Management > Market Risk Analyzer > Valuation > Define NPV Calculation Methods | TRB_NPV | Discounting methods, day count conventions, and pricing models |

### Hedge Management and Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Hedge Accounting Types | SPRO > Treasury and Risk Management > Hedge Management > Define Hedge Types | TRB_HEDGE | Fair value hedge, cash flow hedge, net investment hedge — IFRS 9 / ASC 815 compliance |
| Hedging Relationships | SPRO > Treasury and Risk Management > Hedge Management > Define Hedging Relationships | TRB_HREL | Links hedging instrument (derivative) to hedged item (exposure) with effectiveness testing |
| Effectiveness Testing | SPRO > Treasury and Risk Management > Hedge Management > Define Effectiveness Test Methods | TRB_EFF | Dollar offset, regression analysis, hypothetical derivative — prospective and retrospective tests |
| Exposure Types | SPRO > Treasury and Risk Management > Hedge Management > Define Exposure Types | TRB_EXP | FX exposure, interest rate exposure, commodity exposure — underlying risk categories |
| Valuation Rules (Hedge) | SPRO > Treasury and Risk Management > Hedge Management > Define Valuation Rules | TRB_HVAL | Accounting treatment for effective and ineffective portions under IFRS 9 |

### FI Integration and Accounting
| Config Item | SPRO Path | Table/View | Description |
|-------------|-----------|------------|-------------|
| Account Determination | SPRO > Treasury and Risk Management > Transaction Manager > Accounting > Define Account Determination | T036G | Maps product types and flow types to G/L accounts for treasury postings |
| Valuation Methods | SPRO > Treasury and Risk Management > Transaction Manager > Accounting > Define Valuation Methods | T036V | Mark-to-market, lower of cost or market, amortized cost — period-end valuation rules |
| Accrual/Deferral | SPRO > Treasury and Risk Management > Transaction Manager > Accounting > Define Accrual/Deferral Methods | T036AD | Interest accrual calculation methods, posting frequency, and reversal handling |
| Parallel Valuation | SPRO > Treasury and Risk Management > Transaction Manager > Accounting > Define Parallel Valuation Areas | T036PV | Local GAAP, IFRS, US GAAP — simultaneous valuation under multiple accounting standards |
| Posting Rules | SPRO > Treasury and Risk Management > Transaction Manager > Accounting > Define Posting Rules | T036PR | Controls document type, posting key, and account assignment for treasury FI documents |

## Critical Configuration Dependencies

1. **Company Code and Chart of Accounts** must be configured in FI before Treasury can define account determination
2. **House Banks** must be set up in FI before Cash Management bank accounts can reference them
3. **Product Types** must be defined before Transaction Types and Flow Types can be assigned
4. **Market Data infrastructure** (yield curves, FX rates) must be configured before valuation and risk analytics work
5. **Account Determination** must be complete for all product/flow type combinations before treasury transactions post to FI
6. **Hedge Accounting types** must be configured before hedging relationships can be designated under IFRS 9
7. **Planning Groups and Levels** must be defined before Cash Position and Liquidity Forecast reports display meaningful data
8. **Position Management** must be activated before portfolio-level P&L and position tracking is available

## Common Configuration Mistakes

1. **Cash Management planning groups not mapped to G/L accounts** — Open items from AR/AP and bank accounts not assigned to planning groups, resulting in incomplete or zero cash position reports.
2. **Account determination incomplete for flow types** — Not covering all flow type combinations (principal, interest, fees, revaluation) for every product type, causing treasury postings to fail at settlement or valuation.
3. **Hedge effectiveness testing not configured** — Designating hedge relationships without setting up prospective/retrospective effectiveness tests, leading to audit findings and incorrect hedge accounting treatment.
4. **Market data feed disconnected** — Yield curves and FX rates not updated regularly or not mapped correctly, causing valuation runs to use stale rates and produce inaccurate fair values.
5. **Parallel valuation areas misaligned** — Configuring Treasury valuation areas that do not match the FI ledger group structure, resulting in inconsistent accounting entries across local GAAP and IFRS ledgers.
