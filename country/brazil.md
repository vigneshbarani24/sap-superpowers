# Country: Brazil

## Tax System
- **ICMS:** State-level VAT on goods (interstate rate varies: 7%, 12%, 18%, or 25%)
- **IPI:** Federal excise tax on manufactured goods
- **PIS/COFINS:** Federal social contribution taxes (cumulative or non-cumulative regime)
- **ISS:** Municipal service tax
- **CFOP codes:** Fiscal operation codes (mandatory on every line item)
- **SAP config:** Tax procedure TAXBRA, J_1B* country-specific transactions

## E-Invoicing
- **NF-e (Nota Fiscal Eletrônica):** Mandatory electronic fiscal document for goods
- **NFS-e (Nota Fiscal de Serviços Eletrônica):** Electronic service invoice (municipal)
- **CT-e:** Electronic transport document
- **SPED:** System of digital bookkeeping (ECD, ECF, EFD-ICMS/IPI, EFD-Contribuições)
- **DANFE:** Printed representation of NF-e

## Banking & Payments
- **Boleto Bancário:** Payment slips (most common B2B payment)
- **PIX:** Instant payment system (central bank)
- **TED/DOC:** Bank transfers (being replaced by PIX)
- **Payment format:** CNAB 240/400 (Febraban standard)
- **Bank statement:** CNAB format

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** BRL (R$)
- **Decimal notation:** 1.234,56
- **Fiscal year:** Calendar year

## Regulatory
- **LGPD:** Brazilian General Data Protection Law
- **CPC (Comitê de Pronunciamentos Contábeis):** Brazilian accounting standards (IFRS-converged)
- **SPED compliance:** Monthly/annual digital bookkeeping submissions
- **Substitute taxation (ICMS-ST):** Tax substitution for specific product categories
- **CPF/CNPJ:** Individual/Corporate tax identification (sensitive PII)

## Key SAP Transactions
- J1BNFE (NF-e generation)
- J1BTAX (tax calculation)
- J1BSPED (SPED reporting)
- CFOP determination and validation
