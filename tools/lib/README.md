# tools/lib

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `entries.mjs`

The top-level entries of an object literal `export const <name> = {` in a module's text: [{ key, text, before, after }], and the text's start and end.

## `genomeRecords.mjs`

The records in art/genome/species.js's GENOMES array: a merge pastes a species' record back into the array next to the index's spread, and adopt moves it out to art/creatures/<id>/genome.js.

## `kinds.mjs`

The kinds table assembled for the node tools the way src/rules/kinds.ts assembles it for the game: from every area folder's kind.json and the placeholders', in slot order.
