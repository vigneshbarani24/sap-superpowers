# ABAP and HANA Performance Guidelines

**Last Updated:** 2026-04-12
**Applies To:** S/4HANA On-Premise 1809–2023, SAP BTP ABAP Environment, ABAP 7.40+
**Referenced By:** skills/performance-tuning, skills/code-review, skills/development-workflow, skills/abap-cloud

## The HANA Performance Mindset

HANA is a columnar in-memory database. The rules that applied to row-store databases (Oracle, DB2, MaxDB) are **inverted in several key ways**. The fastest code pushes logic to the database engine — not to the ABAP application server.

> **Core principle:** Move the data filter to the database. Never move large data sets to ABAP just to filter them there.

---

## SQL — Database Access Rules

### Rule SQL-01: Never SELECT *

```abap
" WRONG — reads all columns across the network
SELECT * FROM vbak INTO TABLE @DATA(lt_orders).

" CORRECT — only fetch what you need
SELECT vbeln, kunnr, auart, erdat
  FROM vbak
  INTO TABLE @DATA(lt_orders)
  WHERE erdat >= @lv_date_from
    AND vkorg = @lv_sales_org.
```

**Why:** HANA column store only reads the columns you request. SELECT * forces all columns into memory and across the network — this is the single biggest avoidable overhead in ABAP-HANA development.

---

### Rule SQL-02: Always Filter in WHERE — Never in ABAP

```abap
" WRONG — full table scan, filter in ABAP loop
SELECT vbeln, kunnr FROM vbak INTO TABLE @DATA(lt_all).
LOOP AT lt_all INTO DATA(ls_order) WHERE kunnr = '1000001'.
  " process
ENDLOOP.

" CORRECT — predicate pushed to HANA
SELECT vbeln, kunnr FROM vbak
  INTO TABLE @DATA(lt_filtered)
  WHERE kunnr = '1000001'.
```

---

### Rule SQL-03: Use INTO TABLE (Bulk Fetch) — Never SELECT ENDSELECT

```abap
" WRONG — one network roundtrip per row (N+1 problem)
SELECT vbeln FROM vbak INTO lv_vbeln WHERE auart = 'OR'.
  " process one row
ENDSELECT.

" CORRECT — single roundtrip
SELECT vbeln FROM vbak
  INTO TABLE @DATA(lt_vbeln)
  WHERE auart = 'OR'.
LOOP AT lt_vbeln INTO DATA(ls).
  " process
ENDLOOP.
```

**Exception:** SELECT ENDSELECT is acceptable only for cursor-based streaming when result sets exceed available memory (> 50M rows) — and only with `PACKAGE SIZE`.

---

### Rule SQL-04: Use Aggregation in SQL, Not in ABAP

```abap
" WRONG — reads all rows to ABAP, sums in loop
SELECT gjahr, belnr, dmbtr FROM bseg INTO TABLE @DATA(lt_fi).
DATA(lv_total) = REDUCE decfloat34( INIT s = '0'
                                    FOR ls IN lt_fi
                                    NEXT s = s + ls-dmbtr ).

" CORRECT — HANA does the aggregation
SELECT gjahr, SUM( dmbtr ) AS total_amount
  FROM bseg  " (use ACDOCA in S/4HANA)
  INTO TABLE @DATA(lt_totals)
  GROUP BY gjahr.
```

---

### Rule SQL-05: Joins Belong in CDS Views, Not in ABAP SELECT

```abap
" AVOID — multi-table join in procedural ABAP
SELECT a~vbeln, a~kunnr, b~netwr
  FROM vbak AS a
  INNER JOIN vbap AS b ON a~vbeln = b~vbeln
  INTO TABLE @DATA(lt_result)
  WHERE a~erdat >= @lv_from.

" BETTER — define as a CDS view (reusable, released, authorized)
" In CDS: define view entity ZI_SalesOrderWithValue...
SELECT vbeln, kunnr, netwr
  FROM zi_sales_order_with_value
  INTO TABLE @DATA(lt_result)
  WHERE erdat >= @lv_from.
```

---

### Rule SQL-06: Avoid Nested SELECTs (SELECT Inside Loop)

```abap
" WRONG — classic N+1 — one SELECT per order line
LOOP AT lt_orders INTO DATA(ls_order).
  SELECT SINGLE kna1~name1 FROM kna1
    INTO DATA(lv_name)
    WHERE kunnr = ls_order-kunnr.  " N database calls
ENDLOOP.

" CORRECT — collect keys, fetch in one go, use hash table for lookup
SELECT kunnr, name1 FROM kna1
  INTO TABLE @DATA(lt_customers)
  FOR ALL ENTRIES IN @lt_orders
  WHERE kunnr = @lt_orders-kunnr.

DATA(lhash_cust) = VALUE #( ).  " build internal hash for lookup
```

---

## Internal Table Rules

### Rule IT-01: Choose the Right Table Type

| Table Type | Best For | Key Access | Avoid When |
|-----------|---------|------------|-----------|
| STANDARD | Small sets (< 100 rows), sequential processing, unsorted input | Linear (O(n)) | Large sets needing repeated key lookup |
| SORTED | Medium sets needing sorted output + range reads; binary search native | Binary (O(log n)) | Frequent inserts into middle |
| HASHED | Large sets (> 1000 rows) needing exact key lookup with unique key | O(1) average | Ranges or sorted output needed |

```abap
" SORTED table — binary search built in
DATA: lt_materials TYPE SORTED TABLE OF ty_mat WITH UNIQUE KEY matnr.

" HASHED table — O(1) lookup by key
DATA: lt_customers TYPE HASHED TABLE OF ty_cust WITH UNIQUE KEY kunnr.

" READ TABLE on SORTED/HASHED — fast
READ TABLE lt_customers WITH TABLE KEY kunnr = lv_key INTO DATA(ls_cust).
```

---

### Rule IT-02: Use FIELD-SYMBOLS or DATA() Reference for LOOP

```abap
" WRONG — copy by value on every iteration (expensive for wide structures)
LOOP AT lt_large_table INTO DATA(ls_row).
  ls_row-field1 = 'X'.    " modifies local copy only — BUG and waste
ENDLOOP.

" CORRECT — field symbol gives direct reference (zero copy)
LOOP AT lt_large_table ASSIGNING FIELD-SYMBOL(<ls_row>).
  <ls_row>-field1 = 'X'.  " modifies table in place
ENDLOOP.

" ALSO CORRECT — reference variable (ABAP 7.40+)
LOOP AT lt_large_table REFERENCE INTO DATA(lr_row).
  lr_row->field1 = 'X'.
ENDLOOP.
```

---

### Rule IT-03: Binary Search on STANDARD Tables (Legacy Code)

```abap
" WRONG — linear search on STANDARD table (O(n) per lookup)
READ TABLE lt_std_mat INTO DATA(ls_mat) WITH KEY matnr = lv_key.

" CORRECT — sort first, then binary search
SORT lt_std_mat BY matnr.
READ TABLE lt_std_mat INTO DATA(ls_mat)
  WITH KEY matnr = lv_key
  BINARY SEARCH.

" BEST — use SORTED or HASHED table from declaration
```

---

### Rule IT-04: Avoid LOOP AT … WHERE on STANDARD Tables

```abap
" AVOID on large STANDARD tables — linear scan
LOOP AT lt_orders INTO DATA(ls_ord) WHERE kunnr = '1000001'.
  " ...
ENDLOOP.

" USE SORTED table with secondary key, or collect filtered rows first
DATA: lt_orders TYPE SORTED TABLE OF ty_ord
        WITH UNIQUE KEY vbeln
        WITH NON-UNIQUE SORTED KEY by_customer COMPONENTS kunnr.

LOOP AT lt_orders INTO DATA(ls_ord) USING KEY by_customer
  WHERE kunnr = '1000001'.  " fast — uses sorted key
ENDLOOP.
```

---

## HANA-Specific Rules

### Rule H-01: Push Computation to HANA via AMDP

For complex aggregations or procedural logic that cannot be expressed in CDS:

```abap
CLASS zcl_perf_amdp DEFINITION PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    CLASS-METHODS get_aged_ar
      IMPORTING iv_bukrs    TYPE bukrs
      EXPORTING et_result   TYPE ty_ar_aging_tt
      RAISING   cx_amdp_error.
ENDCLASS.

CLASS zcl_perf_amdp IMPLEMENTATION.
  METHOD get_aged_ar BY DATABASE PROCEDURE FOR HDB
    LANGUAGE SQLSCRIPT
    USING acdoca.
    et_result = SELECT
      kunnr,
      SUM(CASE WHEN days_overdue <= 30  THEN dmbtr ELSE 0 END) AS bucket_0_30,
      SUM(CASE WHEN days_overdue <= 60  THEN dmbtr ELSE 0 END) AS bucket_31_60,
      SUM(CASE WHEN days_overdue > 60   THEN dmbtr ELSE 0 END) AS bucket_61_plus
    FROM (
      SELECT kunnr, dmbtr,
             DAYS_BETWEEN(faedt, CURRENT_DATE) AS days_overdue
      FROM acdoca
      WHERE bukrs = :iv_bukrs AND bstat = ' '
    ) GROUP BY kunnr;
  ENDMETHOD.
ENDCLASS.
```

---

### Rule H-02: CDS View Performance Annotations

```abap
@AbapCatalog.sqlViewName: 'ZV_HIGHPERF'
@AbapCatalog.compiler.compareFilter: true   " optimize filter pushdown
@AbapCatalog.preserveKey: true
@Accessibility.freeStylingAllowed: false
@Analytics.dataCategory: #FACT              " marks as fact table for BW/HANA aggregation
@VDM.viewType: #BASIC
define view entity ZI_HighPerfView
  as select from acdoca
{
  key rclnt,
  key rbukrs,
  key gjahr,
  key belnr,
  kunnr,
  @Aggregation.default: #SUM
  dmbtr
}
where
  bstat = ' '  " push this filter to HANA at activation
```

---

### Rule H-03: Avoid Client-Dependent SELECT Without Client Field

```abap
" WRONG — forces cross-client scan (HANA cannot optimize)
SELECT * FROM usr02 CLIENT SPECIFIED INTO TABLE @DATA(lt_usr).

" CORRECT — let ABAP runtime inject client (SY-MANDT)
SELECT bname, gltgb FROM usr02 INTO TABLE @DATA(lt_usr)
  WHERE bname LIKE 'BATCH%'.
```

---

## Anti-Pattern Quick Reference

| Anti-Pattern | Symptom | Fix |
|-------------|---------|-----|
| SELECT * | High network bandwidth, slow load | Select specific fields |
| SELECT inside LOOP | Exponential DB calls; SM50 shows many short RFCs | FOR ALL ENTRIES or JOIN |
| LOOP WHERE on STANDARD table | Full scan on every iteration | SORTED/HASHED table with secondary key |
| COLLECT into STANDARD table | O(n²) for duplicate check | HASHED table with `+=` |
| Nested LOOPS O(n²) | Long runtime, no index usage | Use READ TABLE with BINARY SEARCH or HASHED table |
| Work area in LOOP (no ASSIGNING) | Extra copy per iteration | ASSIGNING FIELD-SYMBOL |
| Missing WHERE clause | Full table scan | Always filter; add WHERE clause |
| Long-running UPDATE in dialog work process | Time limit dump (ABAP_RUNTIME_EXCEEDED) | Move to background job via SM36 |
| Synchronous RFC in dialog step | User waits; RFC timeout risk | Use aRFC or background task |
| Aggregation in ABAP loop | ABAP memory pressure; slow | Push SUM/COUNT/AVG to SQL or AMDP |

---

## Performance Trace Tools

| Tool | Transaction | Use |
|------|------------|-----|
| SQL Trace | ST05 | Captures all SQL statements with runtime and row counts; identify missing WHERE, SELECT * |
| ABAP Trace | SAT (or SE30) | Call hierarchy with time per method/statement; identify hot spots |
| Runtime Analysis | ST12 | Combined SQL + ABAP; best starting point for end-to-end profiling |
| SQL Monitor | DB50 | HANA-level expensive statement monitor; shows top SQL by elapsed time |
| Expensive Statements | /SDF/EMON | System-wide top SQL; run in production to find repeat offenders |
| Business Transaction Analysis | STAD | Aggregated runtime per dialog step; shows DB time vs. ABAP time split |

---

## Performance Investigation Sequence

1. **Reproduce the slow transaction** — record exact steps, user, time, input data
2. **Run STAD** — check DB time vs. ABAP time ratio; if DB time > 60%, focus on SQL; if ABAP time > 60%, focus on internal table logic
3. **Run ST05 SQL Trace** during the transaction — export to spreadsheet; sort by duration; identify top-3 slow statements
4. **Check execution plan** in HANA Studio or HANA Cockpit — look for full table scans (no index usage)
5. **Run SAT ABAP Trace** — identify the ABAP method or subroutine consuming the most time
6. **Apply fix** — use rules above; re-run ST05 to confirm improvement
7. **Document** — record before/after runtime; add to performance baseline register
