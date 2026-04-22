# Error Handling Pattern

## Class-Based Exceptions Standard

All new code uses class-based exceptions. No SY-SUBRC for business logic (SY-SUBRC is acceptable for AUTHORITY-CHECK and ABAP SQL only).

## Exception Hierarchy

```
CX_ROOT
├── CX_STATIC_CHECK    → Checked at compile time (caller MUST handle or propagate)
│   └── ZCX_APP_ERROR  → Application-level business errors
│       ├── ZCX_VALIDATION_ERROR  → Input validation failures
│       ├── ZCX_AUTH_ERROR        → Authorization check failures
│       └── ZCX_BUSINESS_RULE     → Business rule violations
│
├── CX_DYNAMIC_CHECK   → Checked at runtime (caller SHOULD handle)
│   └── ZCX_RUNTIME_ERROR  → Unexpected runtime failures
│
└── CX_NO_CHECK        → System-level (typically not caught)
```

## Pattern: Method with Exception Handling

```abap
METHOD process_invoice.
  " Guard clause — fail fast on preconditions
  IF iv_belnr IS INITIAL.
    RAISE EXCEPTION TYPE zcx_validation_error
      EXPORTING textid = zcx_validation_error=>document_number_required.
  ENDIF.

  " Authorization check
  AUTHORITY-CHECK OBJECT 'F_BKPF_BUK'
    ID 'BUKRS' FIELD iv_bukrs
    ID 'ACTVT' FIELD '03'.
  IF sy-subrc <> 0.
    RAISE EXCEPTION TYPE zcx_auth_error
      EXPORTING textid = zcx_auth_error=>no_display_auth
                bukrs  = iv_bukrs.
  ENDIF.

  " Business logic with error handling
  TRY.
      DATA(ls_invoice) = read_invoice( iv_belnr ).
      validate_invoice( ls_invoice ).
      post_invoice( ls_invoice ).
    CATCH zcx_validation_error INTO DATA(lx_valid).
      " Log and re-raise
      log_error( lx_valid ).
      RAISE EXCEPTION lx_valid.
    CATCH cx_sy_open_sql_db INTO DATA(lx_db).
      " Wrap system exception in application exception
      RAISE EXCEPTION TYPE zcx_runtime_error
        EXPORTING textid   = zcx_runtime_error=>database_error
                  previous = lx_db.
  ENDTRY.
ENDMETHOD.
```

## Rules

1. **Catch specific exceptions** — never bare `CATCH cx_root`
2. **No empty CATCH blocks** — always handle, log, or propagate
3. **Wrap system exceptions** in application exceptions (add business context)
4. **Use textid for messages** — not hardcoded message text in exceptions
5. **Guard clauses first** — check preconditions and fail fast before main logic
6. **Log before raise** — capture diagnostic information before propagating
7. **CLEANUP block** for resource release in TRY/CATCH

## BAPI/FM Error Handling

```abap
CALL FUNCTION 'BAPI_SALESORDER_CREATEFROMDAT2'
  EXPORTING ...
  IMPORTING ...
  TABLES
    return = lt_return.

" Check for errors
IF line_exists( lt_return[ type = 'E' ] ) OR
   line_exists( lt_return[ type = 'A' ] ).
  " Collect error messages
  CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.
  RAISE EXCEPTION TYPE zcx_business_rule
    EXPORTING textid  = zcx_business_rule=>bapi_error
              details = collect_messages( lt_return ).
ELSE.
  CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'
    EXPORTING wait = abap_true.
ENDIF.
```
