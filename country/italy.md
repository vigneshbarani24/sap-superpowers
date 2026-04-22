# Country: Italy

## Tax System
- **VAT (IVA):** Standard 22%, reduced 10%, super-reduced 4%, exempt 0%
- **Split Payment:** Mandatory for B2G (PA retains VAT, pays net to supplier)
- **Reverse Charge:** Domestic reverse charge for specific sectors
- **SAP config:** Tax procedure TAXITA

## E-Invoicing
- **FatturaPA / SDI (Sistema di Interscambio):** Mandatory B2B and B2G e-invoicing since 2019
- **XML format** (FatturaPA 1.2.2) via SDI platform
- All invoices must transit through SDI — paper invoices not legally valid for VAT
- **Esterometro:** Cross-border transaction reporting via SDI

## Banking & Payments
- **SEPA** SCT/SDD, **CBI** (Corporate Banking Interbancario) format
- **Payment format:** SEPA XML pain.001, CBI (legacy)
- **Ri.Ba (Ricevuta Bancaria):** Bank receipt for collection
- **Bank statement:** camt.053, CBI format

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** EUR (€)
- **Decimal notation:** 1.234,56

## Regulatory
- **GDPR** — data protection
- **Codice Civile** — civil code accounting
- **Certificazione Unica (CU)** — annual withholding tax certificate
- **Spesometro** (replaced by SDI reporting)

## Key SAP Transactions
- FatturaPA XML generation and SDI submission
- Split Payment configuration
