# Country: South Korea

## Tax System
- **VAT:** Standard 10% (single rate)
- **Electronic Tax Invoice (전자세금계산서):** Mandatory via NTS (국세청) system
- **Withholding tax** on services, interest, dividends
- **Corporate tax:** Progressive rates (10-25%)
- **SAP config:** Tax procedure TAXKR

## E-Invoicing
- **e-세금계산서 (e-Tax Invoice):** Mandatory electronic issuance via NTS
- **HomeTax (홈택스)** portal for filing and verification
- **Business Registration Number (사업자등록번호)** required on all invoices
- **RRN (주민등록번호)** masking — never store full resident registration numbers

## Banking & Payments
- **KFTC** (Korea Financial Telecommunications & Clearings Institute) network
- **Internet banking** with PKI certificate (공인인증서 / 공동인증서)
- **Payment format:** KFTC standard format
- **Bank statement:** Local Korean bank formats

## Date & Currency
- **Date format:** YYYY-MM-DD or YYYY년 MM월 DD일
- **Currency:** KRW (₩), no decimal places
- **Decimal notation:** 1,234 (no decimal for KRW)
- **Fiscal year:** Calendar year (Jan-Dec)

## Regulatory
- **PIPA (개인정보보호법):** Personal Information Protection Act — strict PII rules
- **RRN masking** mandatory — never display or store full 13-digit RRN
- **K-IFRS** financial reporting standards
- **Fair Trade Act** for business practices
- **Electronic Financial Transactions Act**

## Key SAP Transactions
- e-Tax Invoice generation and NTS submission
- Korean bank payment format configuration
- RRN masking enforcement in all outputs
