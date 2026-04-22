# Country: United Kingdom

## Tax System
- **VAT:** Standard 20%, reduced 5%, zero-rated 0%
- **Making Tax Digital (MTD):** Mandatory digital VAT returns via HMRC API
- **Corporation Tax:** Self-assessment via CT600
- **SAP config:** Tax procedure TAXGB

## E-Invoicing
- No mandatory B2B e-invoicing (as of 2026)
- **Peppol** supported for public sector
- MTD API integration for VAT returns

## Banking & Payments
- **BACS** (Bankers' Automated Clearing Services) for bulk payments
- **FPS** (Faster Payments Service) for real-time
- **CHAPS** for high-value same-day
- **Payment format:** BACS Standard 18, ISO 20022 migration in progress
- **Bank statement:** MT940 / camt.053

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** GBP (£)
- **Decimal notation:** 1,234.56
- **Fiscal year:** April 6 – April 5 (tax year), varies for corporates

## Regulatory
- **UK GDPR** (post-Brexit data protection)
- **Companies Act 2006** — financial reporting
- **FCA** regulations for financial services
- **IR35** rules for contractor payments

## Key SAP Transactions
- MTD API integration (custom or partner solution)
- F110 with BACS payment method
