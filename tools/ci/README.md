# tools/ci

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `run-unit.mjs`

Resolve related tests first.

## `test-scope.mjs`

Conservative unit-test selection.

## `world-audit.mjs`

Inventory real world-constructor calls and explicit small-fixture reasons; comments are not calls. This lists direct imported constructors in source tests, not indirect helpers or browser smokes; its counts are a work list, not completion proof.

## Also here

- `PLAN.md`
- `run-unit.test.ts`
- `test-scope.test.ts`
- `workflows.test.ts`
- `world-audit.test.ts`
