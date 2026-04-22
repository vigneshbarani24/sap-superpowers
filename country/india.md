# Country: India

## Tax System
- **GST:** CGST + SGST (intra-state) or IGST (inter-state), standard 18%, rates: 0/5/12/18/28%
- **HSN/SAC codes** mandatory on invoices (6-digit for > ₹5Cr turnover)
- **TDS (Tax Deducted at Source):** Mandatory for specified payments
- **TCS (Tax Collected at Source):** On specified goods
- **SAP config:** Tax procedure TAXINN (condition-based), GST configuration

## E-Invoicing
- **GST e-Invoice:** Mandatory for turnover > ₹5 Cr (via IRP — Invoice Registration Portal)
- **IRN (Invoice Reference Number)** and QR code on every B2B invoice
- **E-Way Bill** for goods movement > ₹50,000
- **GSTR returns:** GSTR-1 (outward), GSTR-3B (summary), GSTR-2B (auto-drafted inward)

## Banking & Payments
- **NEFT** (National Electronic Funds Transfer)
- **RTGS** (Real Time Gross Settlement) for high-value
- **UPI** (Unified Payments Interface) — growing B2B adoption
- **Payment format:** RBI prescribed formats
- **Bank statement:** MT940

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** INR (₹)
- **Decimal notation:** 12,34,567.89 (lakhs/crores grouping)
- **Fiscal year:** April 1 – March 31

## Regulatory
- **Companies Act 2013** — financial reporting (Ind AS / IFRS converged)
- **SEBI** regulations for listed companies
- **DPDP Act 2023** — data protection
- **RBI** regulations for banking/payments
- **Transfer pricing** documentation requirements

## Key SAP Transactions
- J1IGIN (GST invoice generation)
- J1IGST (GST return preparation)
- J1IEWB (E-Way Bill generation)
- J1INCHLN (TDS challan)
