# Include Structure

## Mandatory 9-Include Pattern for Reports

Every report program with more than trivial complexity uses a structured include pattern:

```abap
REPORT z{module}_report_{nn}.

INCLUDE z{module}_report_{nn}_top.  " Global data declarations
INCLUDE z{module}_report_{nn}_sel.  " Selection screen
INCLUDE z{module}_report_{nn}_cls.  " Local classes (OOP logic)
INCLUDE z{module}_report_{nn}_alv.  " ALV output handling
INCLUDE z{module}_report_{nn}_pbo.  " Process Before Output
INCLUDE z{module}_report_{nn}_pai.  " Process After Input
INCLUDE z{module}_report_{nn}_evt.  " Event handlers
INCLUDE z{module}_report_{nn}_frm.  " FORM subroutines (legacy only)
INCLUDE z{module}_report_{nn}_tst.  " ABAP Unit test classes
```

## Include Purposes

### _TOP — Global Declarations
```abap
" Types, constants, global variables, selection screen parameters
TYPES: BEGIN OF ty_s_output,
         vbeln TYPE vbeln,
         erdat TYPE erdat,
       END OF ty_s_output.

DATA: gt_output TYPE TABLE OF ty_s_output.
```

### _SEL — Selection Screen
```abap
SELECTION-SCREEN BEGIN OF BLOCK b01 WITH FRAME TITLE TEXT-b01.
  SELECT-OPTIONS: s_vbeln FOR vbak-vbeln,
                  s_erdat FOR vbak-erdat.
  PARAMETERS: p_bukrs TYPE bukrs OBLIGATORY.
SELECTION-SCREEN END OF BLOCK b01.
```

### _CLS — Local Classes
```abap
CLASS lcl_data DEFINITION.
  PUBLIC SECTION.
    METHODS: select_data, process_data.
  PRIVATE SECTION.
    DATA: mt_data TYPE TABLE OF ty_s_output.
ENDCLASS.

CLASS lcl_data IMPLEMENTATION.
  METHOD select_data.
    " Data selection logic
  ENDMETHOD.
ENDCLASS.
```

### _ALV — ALV Output
```abap
CLASS lcl_alv DEFINITION.
  PUBLIC SECTION.
    METHODS: display IMPORTING it_data TYPE ty_t_output.
  PRIVATE SECTION.
    METHODS: build_fieldcatalog RETURNING VALUE(rt_fcat) TYPE lvc_t_fcat.
ENDCLASS.
```

### _PBO / _PAI — Dynpro Modules (if screens used)
```abap
MODULE status_0100 OUTPUT.
  SET PF-STATUS 'STATUS_0100'.
  SET TITLEBAR 'TITLE_0100'.
ENDMODULE.

MODULE user_command_0100 INPUT.
  CASE sy-ucomm.
    WHEN 'BACK'. LEAVE TO SCREEN 0.
  ENDCASE.
ENDMODULE.
```

### _TST — Unit Tests
```abap
CLASS ltcl_data_test DEFINITION FINAL FOR TESTING
  RISK LEVEL HARMLESS DURATION SHORT.
  PRIVATE SECTION.
    METHODS: test_select_data FOR TESTING.
ENDCLASS.
```

## Conditional Includes

Not all includes are mandatory. Use only what the program needs:

| Program Type | Required Includes | Optional |
|-------------|-------------------|----------|
| Simple report | _TOP, _SEL, _CLS | _ALV, _TST |
| ALV report | _TOP, _SEL, _CLS, _ALV | _TST |
| Module pool | _TOP, _CLS, _PBO, _PAI | _ALV, _EVT |
| Background job | _TOP, _CLS | _TST |

## Rules
1. **Never put logic in the main program** — only INCLUDE statements and event keywords
2. **_TOP is always first** — declares all shared types and data
3. **_CLS replaces _FRM** for new development — use OOP, not FORMs
4. **_TST is always last** — test classes should be in a separate include
