# Text Element Rules

## All User-Visible Text via Text Elements

No hardcoded strings in code for anything the user sees. This ensures:
- Translation support (SE63)
- Consistent terminology across the program
- Centralized text management

## Text Element Types

### Selection Texts
```abap
" Selection screen parameters automatically link to text elements
PARAMETERS: p_bukrs TYPE bukrs.  " Text: Company Code
SELECT-OPTIONS: s_matnr FOR mara-matnr.  " Text: Material Number
```
Set via: Program → Text Elements → Selection Texts → checkbox "Dictionary Reference" or manual text.

### Text Symbols
```abap
" Reference in code as TEXT-{id}
WRITE: / TEXT-001.  " 'Processing complete'
MESSAGE TEXT-e01 TYPE 'E'.

" In string templates
DATA(lv_msg) = |{ TEXT-010 }: { lv_count } { TEXT-011 }|.
```

### Block Titles
```abap
SELECTION-SCREEN BEGIN OF BLOCK b01 WITH FRAME TITLE TEXT-b01.
" TEXT-b01 = 'Selection Criteria'
```

### Title Bar Texts
```abap
SET TITLEBAR 'TITLE_100' WITH lv_doc_number.
" Title: 'Document &1 — Detail View'
```

## Naming Convention for Text Symbols

| ID Range | Purpose | Example |
|----------|---------|---------|
| 001-099 | General labels and headers | TEXT-001 = 'Processing Results' |
| 100-199 | Selection screen block titles | TEXT-b01 = 'Selection Criteria' |
| 200-299 | ALV column headers | TEXT-200 = 'Document Number' |
| 300-399 | Status messages | TEXT-300 = 'Data loaded successfully' |
| e01-e99 | Error messages | TEXT-e01 = 'No data found for selection' |
| w01-w99 | Warning messages | TEXT-w01 = 'Large data volume — processing may be slow' |

## Rules

1. **Never concatenate translated strings** — word order differs across languages
   ```abap
   " WRONG — German word order would be different
   lv_text = TEXT-001 && lv_name && TEXT-002.
   
   " CORRECT — use placeholders
   MESSAGE s001(zmm) WITH lv_name.
   ```

2. **Use Message Class for user messages** — not inline text
   ```abap
   " WRONG
   MESSAGE 'Vendor not found' TYPE 'E'.
   
   " CORRECT
   MESSAGE e010(zmm) WITH lv_lifnr.
   ```

3. **Max 132 characters** per text element (SAP limit)

4. **Dictionary reference** for selection texts where a data element description exists

5. **No text elements for internal logging** — those don't need translation
