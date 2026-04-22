# Country: Japan

## Tax System
- **Consumption Tax (消費税):** Standard 10%, reduced 8% (food/beverages)
- **Qualified Invoice System (インボイス制度):** Mandatory since Oct 2023
- **Registration number** required on all tax invoices
- **Withholding tax** on professional services, royalties, dividends
- **SAP config:** Tax procedure TAXJP

## E-Invoicing
- **Qualified Invoice (適格請求書):** Must include registration number, tax rate breakdown, and tax amount
- **Peppol JP** adoption for digital invoicing
- **Digital Agency** driving e-invoice standardization

## Banking & Payments
- **Zengin System** for domestic bank transfers
- **BOJ-NET** for high-value interbank settlement
- **Payment format:** Zengin format (fixed-length text), FB data format
- **Bank statement:** MT940 or Zengin statement format
- **Tegata (手形):** Promissory notes (declining usage)

## Date & Currency
- **Date format:** YYYY/MM/DD or YYYY年MM月DD日
- **Currency:** JPY (¥), no decimal places
- **Decimal notation:** 1,234 (no decimal for JPY)
- **Fiscal year:** April 1 – March 31 (most companies)

## Regulatory
- **APPI (個人情報保護法):** Personal Information Protection Act
- **Companies Act (会社法):** Financial reporting requirements
- **J-SOX:** Internal control reporting for listed companies
- **FSA (金融庁):** Financial services regulation
- **Electronic Book Preservation Act (電帳法):** E-document storage requirements

## Key SAP Transactions
- Qualified Invoice output with registration number
- Zengin payment format configuration
- FB data format for payment files
