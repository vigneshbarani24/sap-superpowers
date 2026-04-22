# ALV Rules

## Two ALV Approaches

### Full ALV: CL_GUI_ALV_GRID
Use when: editing, custom toolbar buttons, hotspot navigation, drag-and-drop, or multiple ALV grids.

**Requires:** Custom Dynpro screen with container control.

```abap
" Screen 0100: Custom container named 'CC_ALV'
DATA(lo_container) = NEW cl_gui_custom_container( container_name = 'CC_ALV' ).
DATA(lo_grid) = NEW cl_gui_alv_grid( i_parent = lo_container ).

lo_grid->set_table_for_first_display(
  EXPORTING is_layout       = ls_layout
  CHANGING  it_outtab       = lt_output
            it_fieldcatalog = lt_fieldcat ).
```

### Quick Popup: CL_SALV_TABLE
Use when: read-only display, no custom screen needed, simple output.

```abap
cl_salv_table=>factory(
  IMPORTING r_salv_table = DATA(lo_salv)
  CHANGING  t_table      = lt_output ).
lo_salv->get_functions( )->set_all( ).
lo_salv->display( ).
```

## Field Catalog Construction

**Always build explicitly** — never rely on auto-generation for production code.

```abap
METHOD build_fieldcatalog.
  rt_fcat = VALUE lvc_t_fcat(
    ( fieldname = 'VBELN'  coltext = 'Sales Doc'  outputlen = 10 key = abap_true )
    ( fieldname = 'ERDAT'  coltext = 'Created'    outputlen = 10 )
    ( fieldname = 'NETWR'  coltext = 'Net Value'  outputlen = 15 do_sum = abap_true
      cfieldname = 'WAERK' )
    ( fieldname = 'WAERK'  coltext = 'Currency'   outputlen = 5  no_out = abap_true )
  ).
ENDMETHOD.
```

## Layout Settings

```abap
DATA(ls_layout) = VALUE lvc_s_layo(
  zebra      = abap_true     " Alternating row colors
  cwidth_opt = abap_true     " Optimize column widths
  sel_mode   = 'A'           " Multiple row selection
  no_rowmark = abap_false    " Show row selection column
).
```

## ALV Rules

1. **Always specify field catalog explicitly** — auto-generated catalogs miss labels, lengths, and aggregation
2. **Always set column text** — use coltext (medium) not scrtext_l/m/s
3. **Currency/quantity fields must reference unit field** — cfieldname for currency, qfieldname for quantity
4. **Hide technical fields** — set no_out = abap_true for currency codes, unit of measure
5. **Enable standard functions** — always call `set_all( )` on functions for SALV, or pass `i_save = 'A'` for Grid
6. **Zebra striping** — always enable for readability
7. **Column optimization** — set cwidth_opt = abap_true as default
8. **No hardcoded texts** — use Text Elements for column headers when possible
