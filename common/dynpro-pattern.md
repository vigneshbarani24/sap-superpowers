# Classical Dynpro Pattern

## When to Use Dynpro

- **ECC 6.0 systems** where Fiori is not available
- **S/4HANA on-premise** when extending existing Dynpro-based transactions
- **Never for S/4HANA Cloud** — Dynpro is blocked in ABAP Cloud

## Screen Architecture

### Main Screen (0100) — ALV Container
```
Screen 0100: Main Display
├── Custom Container 'CC_ALV' → ALV Grid
├── GUI Status: STATUS_0100
│   ├── Back (BACK), Exit (EXIT), Cancel (CANC)
│   ├── Custom buttons (CREATE, CHANGE, DISPLAY)
│   └── Standard toolbar (SAVE, PRINT, FIND)
└── Title Bar: TITLE_0100
```

### Detail Screen (0200) — Edit Form
```
Screen 0200: Detail/Edit View
├── Input fields bound to OK_CODE
├── Tabstrip (if multiple sections)
├── GUI Status: STATUS_0200
└── Title Bar: TITLE_0200
```

## PBO/PAI Pattern

### Process Before Output (PBO)
```abap
MODULE status_0100 OUTPUT.
  SET PF-STATUS 'STATUS_0100'.
  SET TITLEBAR 'TITLE_0100'.
ENDMODULE.

MODULE init_alv_0100 OUTPUT.
  IF go_alv IS NOT BOUND.
    go_alv = NEW lcl_alv( ).
    go_alv->create_grid( container_name = 'CC_ALV' ).
  ENDIF.
ENDMODULE.
```

### Process After Input (PAI)
```abap
MODULE user_command_0100 INPUT.
  DATA(lv_ucomm) = sy-ucomm.
  CLEAR sy-ucomm.

  CASE lv_ucomm.
    WHEN 'BACK' OR 'EXIT' OR 'CANC'.
      LEAVE TO SCREEN 0.
    WHEN 'CREATE'.
      CALL SCREEN 0200.
    WHEN 'REFRESH'.
      go_data->select_data( ).
      go_alv->refresh( ).
  ENDCASE.
ENDMODULE.
```

## GUI Status Pattern

Define via SE41 or programmatically:

| Function Code | Type | Text | Icon |
|--------------|------|------|------|
| BACK | E (Exit) | Back | ICON_SYSTEM_BACK |
| EXIT | E (Exit) | Exit | ICON_SYSTEM_END |
| CANC | E (Exit) | Cancel | ICON_SYSTEM_CANCEL |
| SAVE | Normal | Save | ICON_SYSTEM_SAVE |
| CREATE | Normal | Create | ICON_CREATE |
| CHANGE | Normal | Change | ICON_CHANGE |
| DELETE | Normal | Delete | ICON_DELETE |
| REFRESH | Normal | Refresh | ICON_REFRESH |
| PRINT | Normal | Print | ICON_PRINT |

## Screen Number Conventions

| Range | Purpose |
|-------|---------|
| 0100 | Main list/ALV screen |
| 0200 | Detail/Edit screen |
| 0300 | Search help popup |
| 0400 | Confirmation dialog |
| 0500-0800 | Additional functional screens |
| 0900 | Custom selection screen |
| 9000+ | Subscreen containers |

## Rules

1. **Always clear SY-UCOMM** at the start of PAI — prevents double-processing
2. **Check screen flow** — LEAVE TO SCREEN 0 returns to caller, CALL SCREEN creates a stack
3. **No business logic in PBO/PAI** — delegate to LCL_DATA methods
4. **GUI status per screen** — don't share statuses between screens with different functions
5. **Subscreen containers** for reusable screen fragments (tabstrips, header/detail)
