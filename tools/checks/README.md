# tools/checks

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `which.mjs`

Which checks the current change needs, from its changed files and config/checks.json: the builder's before a FINAL, and the coordinator's on the combined build.

```
node tools/checks/which.mjs [--base <ref>] [--json] [--all] [path ...]
```

## Also here

- `which.test.ts`
