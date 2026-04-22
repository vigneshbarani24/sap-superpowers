# Constant Rules

## No Magic Values in Code

Every literal value that could change or has business meaning must be a named constant.

### Constants Interface Pattern

```abap
INTERFACE zif_sd_constants PUBLIC.
  " Document types
  CONSTANTS: co_doc_type_standard TYPE auart VALUE 'OR',
             co_doc_type_return   TYPE auart VALUE 'RE',
             co_doc_type_credit   TYPE auart VALUE 'CR'.

  " Status codes
  CONSTANTS: co_status_open      TYPE char1 VALUE 'O',
             co_status_completed TYPE char1 VALUE 'C',
             co_status_cancelled TYPE char1 VALUE 'X'.

  " Movement types
  CONSTANTS: co_mvt_goods_receipt TYPE bwart VALUE '101',
             co_mvt_goods_issue   TYPE bwart VALUE '261',
             co_mvt_return        TYPE bwart VALUE '122'.

  " Thresholds
  CONSTANTS: co_max_line_items    TYPE i VALUE 999,
             co_credit_tolerance  TYPE p LENGTH 8 DECIMALS 2 VALUE '100.00'.
ENDINTERFACE.
```

### Usage

```abap
" CORRECT — self-documenting, searchable, changeable in one place
IF ls_order-auart = zif_sd_constants=>co_doc_type_standard.

" WRONG — magic value, what does 'OR' mean? Where else is it used?
IF ls_order-auart = 'OR'.
```

## What Must Be Constants

| Category | Examples |
|----------|---------|
| **Document types** | Order types, delivery types, billing types |
| **Status codes** | Approval status, processing status, lifecycle state |
| **Movement types** | 101, 261, 301, 601 |
| **Screen numbers** | 0100, 0200, 0300 |
| **Transaction codes** | Used in CALL TRANSACTION |
| **BAPI/FM names** | Called via CALL FUNCTION |
| **Message IDs** | Message class + number combinations |
| **Default values** | Default company code, plant, storage location |
| **Thresholds** | Tolerance amounts, maximum counts, date ranges |
| **GUI status names** | PF-STATUS identifiers |
| **Authorization values** | Activity codes (01, 02, 03, 06) |

## What Can Be Inline

- ABAP keywords and structural values: `abap_true`, `abap_false`, `space`
- Loop indices and temporary counters
- Format strings in string templates
- Test fixture values (in unit tests only)

## Customizing Table Alternative

For values that change per client/system, use a customizing table instead of constants:

```abap
" Retrieve from customizing (buffered)
SELECT SINGLE value FROM zcust_config
  WHERE parameter = 'MAX_RETRY_COUNT'
  INTO @DATA(lv_max_retries).
```

Use constants for values that are structurally fixed. Use customizing for values that vary by client.
