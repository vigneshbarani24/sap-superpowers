# Country: Spain

## Tax System
- **VAT (IVA):** Standard 21%, reduced 10%, super-reduced 4%
- **SII (Suministro Inmediato de Información):** Real-time VAT reporting to AEAT
- **Modelo 303** (quarterly VAT return), **Modelo 349** (intra-EU)
- **SAP config:** Tax procedure TAXE

## E-Invoicing
- **Facturae** format for B2G (mandatory via FACe platform)
- **SII:** Near real-time invoice reporting (within 4 days of issue)
- B2B e-invoicing mandate expected (aligned with EU ViDA)
- **TicketBAI** (Basque Country specific e-invoicing)

## Banking & Payments
- **SEPA** SCT/SDD
- **Cuaderno 34** (payment orders), **Cuaderno 19** (direct debit) — legacy, migrating to SEPA
- **Payment format:** SEPA XML, Cuaderno 34/19 (legacy)
- **Bank statement:** camt.053, Cuaderno 43 (legacy)

## Date & Currency
- **Date format:** DD/MM/YYYY
- **Currency:** EUR (€)
- **Decimal notation:** 1.234,56

## Regulatory
- **GDPR (LOPD-GDD)** — Spanish data protection implementation
- **Plan General Contable** — Spanish chart of accounts
- **SII** real-time reporting obligation
- **Modelo 347** — annual third-party transaction reporting

## Key SAP Transactions
- SII real-time reporting integration
- Facturae XML for B2G
