# tools/ci

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `run-unit.mjs`

Resolve related tests first.

## `sleep-cell-repro.mjs`

Diagnose logical ownership at spawn and both sleep stages; retain raw physical legend-cell differences as evidence.

```
node tools/ci/sleep-cell-repro.mjs [largest|four-area|radius|all] (exit 1 means a real ownership mismatch; no browser).
```

## `test-scope.mjs`

Conservative unit-test selection.

## `world-audit.mjs`

Inventory real world-constructor calls and explicit small-fixture reasons; comments are not calls.

## Also here

- `effects-scene.test.ts`
- `PLAN.md`
- `run-unit.test.ts`
- `test-scope.test.ts`
- `workflows.test.ts`
- `world-audit.test.ts`
