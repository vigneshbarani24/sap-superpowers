# Clean ABAP Standards

## 9 Enforced Rules

### 1. Naming
- **Descriptive full words** — no abbreviations unless universally known (PO, SO, GL)
- Name reveals intent: `lt_overdue_invoices` not `lt_data`
- Boolean variables: `is_`, `has_`, `can_` prefix → `lv_is_approved`
- No Hungarian notation beyond scope prefixes (lv_, lt_, etc.)

### 2. Variables
- **Declare at point of use** — not all at the top
- **Prefer inline declarations:** `DATA(lv_name) = ...` or `FIELD-SYMBOL(<fs_item>) ...`
- **Guard clauses** for early return: check preconditions first, return/raise early
- **Avoid deep nesting:** max 3 levels of IF/LOOP/TRY. Refactor to methods if deeper.

### 3. Control Flow
- **Shallow nesting** — refactor nested IFs into guard clauses or helper methods
- **CASE over IF chains** when checking the same variable against multiple values
- **Avoid WHEN OTHERS silently** — always handle or at minimum log
- **No GO TO.** Ever.

### 4. Modern ABAP (740+)
- **String templates:** `|Invoice { lv_belnr } posted|` over CONCATENATE
- **Inline declarations:** `DATA(lt_result) = ...`
- **Constructor expressions:** `NEW`, `VALUE`, `CONV`, `CORRESPONDING`, `COND`, `SWITCH`
- **Functional method calls:** `lv_result = obj->method( iv_param = lv_value )`
- **Table expressions:** `lt_items[ vbeln = lv_doc ]` with TRY/CATCH for not-found
- **LOOP AT ... REFERENCE INTO** over ASSIGNING for read-only iteration

### 5. Exception Handling
- **Class-based exceptions only** — no SY-SUBRC for new code (except AUTHORITY-CHECK, ABAP SQL)
- **Catch specific exceptions** — never bare `CATCH cx_root`
- **Always handle or propagate** — no empty CATCH blocks
- **Custom exceptions** inherit from `cx_static_check` (checked) or `cx_dynamic_check` (runtime)
- **Error messages:** Meaningful text, include context (document number, field name)

### 6. SQL Discipline
- **Always specify field list** — never `SELECT *`
- **Use WHERE clause** — no SELECT-all-then-filter with LOOP/DELETE
- **Use JOINs** — not nested SELECT (N+1 problem)
- **Use aggregate functions** — COUNT, SUM, AVG at DB level, not in ABAP
- **Released CDS entities** preferred over physical tables
- **Always check SY-SUBRC** after SELECT SINGLE
- **UP TO 1 ROWS** for existence checks, not full table reads

### 7. Modularization
- **One method, one purpose** — target ≤ 30 lines per method
- **Max 5 parameters** per method — group into structures if more
- **No side effects** — methods should not modify global state
- **Interface-based design** — program to interfaces, not implementations
- **Private by default** — expose only what's needed

### 8. Text & Messages
- **All user-visible text via Text Elements** — no hardcoded strings in logic
- **Messages via Message Class** — not inline text
- **Support translation** — never concatenate translated strings (word order varies)
- **Use placeholders:** `MESSAGE e001(zmm) WITH lv_matnr lv_werks`

### 9. Performance & Security
- **AUTHORITY-CHECK** before every sensitive operation
- **No SELECT in LOOPs** — collect keys, SELECT once outside
- **Buffer single records:** `SELECT SINGLE` for buffered tables
- **Use sorted/hashed tables** for keyed access (not STANDARD with READ TABLE ... BINARY SEARCH)
- **Avoid MODIFY itab** — use FIELD-SYMBOL or REFERENCE INTO for in-place modification
