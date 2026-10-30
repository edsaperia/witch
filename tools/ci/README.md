# tools/ci

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `run-unit.mjs`

Resolve related tests first.

## `test-scope.mjs`

Conservative unit-test selection.

## `sleep-cell-repro.mjs`

Largest shipped world: diagnose the sleep-cell failure across the full roster without editing production rules. Exit 1 records a broken invariant, not a test pass.

## `world-audit.mjs`

Inventory real world-constructor calls and explicit small-fixture reasons; comments are not calls. This lists direct imported constructors in source tests, not indirect helpers or browser smokes; its counts are a work list, not completion proof.

## Also here

- `PLAN.md`
- `run-unit.test.ts`
- `test-scope.test.ts`
- `workflows.test.ts`
- `world-audit.test.ts`
