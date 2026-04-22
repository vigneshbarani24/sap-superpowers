# OOP Pattern — Two-Class Split

## Standard Architecture

Every OOP report uses two local classes with clear separation of concerns:

| Class | Responsibility |
|-------|---------------|
| **LCL_DATA** | Data selection, processing, business logic, validation |
| **LCL_ALV** | Display, field catalog, layout, events, user interaction |
| **LCL_EVENT** | (Optional) ALV event handling if complex (hotspot, button, F4 help) |

## Orchestration Flow

```abap
INITIALIZATION.
  " Create instances
  go_data = NEW lcl_data( ).
  go_alv  = NEW lcl_alv( ).

START-OF-SELECTION.
  " Select and process data
  go_data->select_data( ).
  go_data->process_data( ).

END-OF-SELECTION.
  " Display results
  go_alv->display( go_data->get_output( ) ).
```

## LCL_DATA Pattern

```abap
CLASS lcl_data DEFINITION.
  PUBLIC SECTION.
    METHODS:
      select_data RAISING cx_sy_no_handler,
      process_data,
      get_output RETURNING VALUE(rt_output) TYPE ty_t_output.
  
  PRIVATE SECTION.
    DATA: mt_raw    TYPE TABLE OF ty_s_raw,
          mt_output TYPE ty_t_output.
    
    METHODS:
      validate_selections RAISING cx_sy_no_handler,
      enrich_data,
      calculate_totals.
ENDCLASS.
```

**Rules for LCL_DATA:**
- Never references UI elements (no MESSAGE, no WRITE, no ALV calls)
- All database access happens here — nowhere else
- Returns data via getter methods (get_output, get_totals)
- Raises exceptions for business rule violations

## LCL_ALV Pattern

```abap
CLASS lcl_alv DEFINITION.
  PUBLIC SECTION.
    METHODS:
      display IMPORTING it_data TYPE ty_t_output,
      refresh.
  
  PRIVATE SECTION.
    DATA: mo_grid TYPE REF TO cl_gui_alv_grid,
          mo_cont TYPE REF TO cl_gui_custom_container.
    
    METHODS:
      build_fieldcatalog RETURNING VALUE(rt_fcat) TYPE lvc_t_fcat,
      build_layout       RETURNING VALUE(rs_layout) TYPE lvc_s_layo,
      handle_toolbar FOR EVENT toolbar OF cl_gui_alv_grid
        IMPORTING e_object e_interactive,
      handle_user_command FOR EVENT user_command OF cl_gui_alv_grid
        IMPORTING e_ucomm.
ENDCLASS.
```

**Rules for LCL_ALV:**
- Never accesses the database — receives data via constructor/method parameters
- Handles all UI concerns (field catalog, layout, colors, events)
- Delegates business actions back to LCL_DATA via events or callbacks

## Quick Display (CL_SALV_TABLE)

For simple read-only output without custom screens, use SALV factory:

```abap
CLASS lcl_alv DEFINITION.
  PUBLIC SECTION.
    METHODS display IMPORTING it_data TYPE ty_t_output.
ENDCLASS.

CLASS lcl_alv IMPLEMENTATION.
  METHOD display.
    DATA(lt_data) = it_data.
    TRY.
        cl_salv_table=>factory(
          IMPORTING r_salv_table = DATA(lo_salv)
          CHANGING  t_table      = lt_data ).
        lo_salv->get_functions( )->set_all( ).
        lo_salv->get_columns( )->set_optimize( ).
        lo_salv->display( ).
      CATCH cx_salv_msg INTO DATA(lx_salv).
        MESSAGE lx_salv->get_text( ) TYPE 'E'.
    ENDTRY.
  ENDMETHOD.
ENDCLASS.
```

## When to Use Which

| Scenario | Pattern |
|----------|---------|
| Simple list output, no editing | CL_SALV_TABLE (quick display) |
| ALV with editing, custom buttons, events | CL_GUI_ALV_GRID + custom container + screen |
| Background job (no display) | LCL_DATA only |
| Complex multi-view | Multiple ALV grids with splitter container |
