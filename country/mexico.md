# Country: Mexico

## Tax System
- **IVA (VAT):** Standard 16%, border zone 8%, exempt 0%
- **ISR:** Income tax (withholding on payments)
- **IEPS:** Special tax on production and services (alcohol, tobacco, fuel)
- **SAP config:** Tax procedure TAXMX

## E-Invoicing
- **CFDI 4.0 (Comprobante Fiscal Digital por Internet):** Mandatory for all invoices
- **PAC (Proveedor Autorizado de Certificación):** Certified provider stamps each invoice
- **UUID (Folio Fiscal):** Unique identifier per CFDI
- **Complemento de Pago:** Payment complement CFDI for partial payments
- **SAT** (Servicio de Administración Tributaria) — tax authority

## Banking & Payments
- **SPEI:** Interbank electronic payment system (real-time)
- **CLABE:** Standardized 18-digit bank account number
- **Payment format:** SPEI format
- **Bank statement:** Local Mexican bank formats

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** MXN ($)
- **Decimal notation:** 1,234.56
- **Fiscal year:** Calendar year

## Regulatory
- **LFPDPPP:** Federal data protection law
- **NIF (Normas de Información Financiera):** Mexican accounting standards
- **RFC (Registro Federal de Contribuyentes):** Tax ID (mandatory on all invoices)
- **Annual tax declaration** with SAT digital signature (e.firma)

## Key SAP Transactions
- CFDI 4.0 generation and PAC certification
- Payment complement generation
- SAT XML format compliance
