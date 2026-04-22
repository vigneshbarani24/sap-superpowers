# Testing Standards

## ABAP Unit Test Structure

Every testable class has a companion test class:

```abap
CLASS ltcl_{class}_test DEFINITION FINAL FOR TESTING
  RISK LEVEL HARMLESS
  DURATION SHORT.

  PRIVATE SECTION.
    DATA: mo_cut TYPE REF TO zcl_{class}.  " Class Under Test

    METHODS:
      setup,                                " Runs before each test
      teardown,                             " Runs after each test
      test_happy_path FOR TESTING,
      test_empty_input FOR TESTING,
      test_invalid_input FOR TESTING RAISING cx_static_check,
      test_authorization_failure FOR TESTING.
ENDCLASS.
```

## Test Method Naming

```
test_{what}_{condition}_{expected}
```

| Pattern | Example |
|---------|---------|
| Happy path | `test_create_order_valid_input_success` |
| Empty input | `test_create_order_empty_items_raises_error` |
| Boundary | `test_discount_max_percentage_100_accepted` |
| Error path | `test_post_invoice_locked_document_raises_lock_error` |
| Auth failure | `test_display_salary_no_auth_raises_auth_error` |

## Test Doubles

### SQL Test Environment (CDS / ABAP SQL mocking)
```abap
CLASS-DATA: environment TYPE REF TO if_osql_test_environment.

CLASS-METHODS class_setup.
  environment = cl_osql_test_environment=>create(
    VALUE #( ( 'ZCDS_INVOICE' ) ( 'ZCDS_ITEM' ) ) ).
ENDCLASS.

METHOD setup.
  environment->clear_doubles( ).
  " Insert test data
  environment->insert_test_data( VALUE ty_t_invoice( 
    ( belnr = '0090000001' bukrs = '1000' ) ) ).
ENDMETHOD.
```

### Class Test Doubles (CL_ABAP_TESTDOUBLE)
```abap
" Create mock for interface
DATA(lo_mock) = CAST zif_payment_service(
  cl_abap_testdouble=>create( 'ZIF_PAYMENT_SERVICE' ) ).

" Configure mock behavior
cl_abap_testdouble=>configure_call( lo_mock
  )->returning( VALUE #( status = 'SUCCESS' ) ).
lo_mock->process_payment( iv_amount = 100 ).

" Inject mock into class under test
mo_cut = NEW zcl_invoice_processor( io_payment = lo_mock ).
```

### RAP Test Doubles (BOTD)
```abap
" For RAP behavior unit tests
DATA(lo_env) = cl_botd_mockemlapi_bo_test_env=>create(
  VALUE #( ( bdef_name = 'ZI_TRAVEL' ) ) ).
```

## Coverage Requirements

| Level | Target | Scope |
|-------|--------|-------|
| All public methods | 100% | Every public method has at least one test |
| Happy path | 100% | Every method has a success scenario test |
| Error paths | ≥ 80% | Expected error conditions are tested |
| Boundary conditions | ≥ 70% | Edge cases (empty, null, max, min) |

## Rules

1. **Tests run in isolation** — no dependency on other tests or execution order
2. **Tests are deterministic** — same input = same result, every time
3. **No database writes in tests** — use test doubles, RISK LEVEL HARMLESS
4. **Fast execution** — DURATION SHORT (< 60 seconds per test class)
5. **Test the behavior, not the implementation** — test public interface, not private methods
6. **One assertion per concept** — multiple asserts are fine if they verify one logical outcome
