# ABAP Release Reference

## Syntax Availability by Release

Generate code that matches the target ABAP release. Never use syntax from a higher release.

| Feature | Minimum Release | Example |
|---------|----------------|---------|
| Inline DATA declarations | 740 | `DATA(lv_x) = 1.` |
| Inline FIELD-SYMBOL | 740 | `ASSIGN lt[ 1 ] TO FIELD-SYMBOL(<fs>).` |
| String templates | 740 | `\|Hello { lv_name }\|` |
| Constructor expressions NEW | 740 | `NEW zcl_class( )` |
| VALUE constructor | 740 | `VALUE ty_t( ( a = 1 ) )` |
| CONV constructor | 740 | `CONV string( lv_numc )` |
| CORRESPONDING constructor | 740 | `CORRESPONDING ty_s( ls_source )` |
| COND constructor | 740 | `COND #( WHEN x THEN y ELSE z )` |
| SWITCH constructor | 740 | `SWITCH #( lv_x WHEN 1 THEN 'A' )` |
| FOR expressions | 740 | `VALUE ty_t( FOR wa IN lt WHERE ( x = 1 ) ( wa ) )` |
| REDUCE | 740 | `REDUCE i( INIT s = 0 FOR wa IN lt NEXT s = s + 1 )` |
| Table expressions | 740 | `lt_items[ vbeln = lv_doc ]` |
| FILTER operator | 740 | `FILTER #( lt_all WHERE status = 'A' )` |
| ALPHA built-in | 740 | `\|{ lv_matnr ALPHA = IN }\|` |
| MESH types | 740 | Associative access across related tables |
| Enumerated types | 750 | `TYPES: BEGIN OF ENUM status, open, closed, END OF ENUM` |
| CDS AMDP (table functions) | 750 | AMDP class with CDS table function |
| ABAP SQL: literals in field list | 751 | `SELECT 'X' AS flag FROM ...` |
| ABAP SQL: UNION | 752 | `SELECT ... UNION SELECT ...` |
| ABAP SQL: cross join | 752 | `SELECT ... FROM t1 CROSS JOIN t2` |
| ABAP SQL: case expressions | 750 | `CASE WHEN ... THEN ... END` in SELECT |
| Internal table GROUP BY | 740 | `LOOP AT lt GROUP BY ( key = ... )` |
| CL_ABAP_TESTDOUBLE | 750 | Test double framework |
| RAP (managed/unmanaged) | 754 | RESTful ABAP Programming Model |
| ABAP Cloud (restricted) | 756 | Restricted language subset for cloud |
| Entity Manipulation Language | 754 | EML `MODIFY ENTITIES OF ...` |

## Release-Platform Mapping

| SAP System | Typical ABAP Release |
|-----------|---------------------|
| ECC 6.0 EHP 7 | 740 |
| ECC 6.0 EHP 8 | 750 |
| S/4HANA 1709 | 751 |
| S/4HANA 1809 | 753 |
| S/4HANA 1909 | 754 |
| S/4HANA 2020 | 754 |
| S/4HANA 2021 | 756 |
| S/4HANA 2022 | 757 |
| S/4HANA 2023 | 758 |
| BTP ABAP Environment | 758+ (cloud restricted) |

## Rules

1. **Check `abapRelease` in config** before generating code
2. **Never use 740+ syntax for 731 targets** — it will not compile
3. **RAP is 754+ only** — do not generate RAP for older systems
4. **ABAP Cloud (restricted syntax) is 756+ only**
5. **When in doubt, ask** — do not assume the target release
