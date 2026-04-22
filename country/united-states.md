# Country: United States

## Tax System
- **Sales & Use Tax:** State + county + city (nexus-based, no federal VAT)
- **Vertex / Avalara** integration common for tax determination
- **1099 reporting:** Miscellaneous income reporting to IRS (1099-NEC, 1099-MISC)
- **Withholding tax:** Federal + state income tax withholding
- **SAP config:** Tax procedure TAXUS/TAXUSJ, jurisdiction codes

## E-Invoicing
- No federal e-invoicing mandate (as of 2026)
- Industry-specific EDI (ANSI X12: 810 invoice, 850 PO, 856 ASN)

## Banking & Payments
- **ACH** (Automated Clearing House) for domestic transfers
- **Wire transfers** (Fedwire) for high-value payments
- **Check payments** still common (positive pay, check printing)
- **Payment format:** ACH CTX/CCD, NACHA format
- **Bank statement:** BAI2 format

## Date & Currency
- **Date format:** MM/DD/YYYY
- **Currency:** USD ($)
- **Decimal notation:** 1,234.56
- **Fiscal year:** Calendar year common, but varies (Oct-Sep for federal)

## Regulatory
- **SOX** (Sarbanes-Oxley) for public companies — internal controls
- **FCPA** (Foreign Corrupt Practices Act) — anti-bribery
- **HIPAA** (health data), **FERPA** (education), **GLBA** (financial)
- **OFAC** sanctions screening for payments
- **EAR/ITAR** export controls

## Key SAP Transactions
- TAXUSJ (jurisdiction code maintenance)
- J1INREP (1099 reporting)
- F110 with ACH/check payment methods
