# tools/art-check

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `affected.mjs`

Successful-result cache for PRs, releases and shared pushes.

## `checked-tree.mjs`

Reuse only an exact tree/environment proven by a successful same-repository Art check run.

## `scope.mjs`

What the art check should run for a change: node tools/art-check/scope.mjs <changed path>...

## `shards.mjs`

Four balanced art-check shards and strict combined proof.

## Also here

- `shards.test.mjs`
- `task-times.json`
