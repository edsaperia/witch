# tools/docs

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `glossary.mjs`

The glossary's index: each note under docs/notes/ holds its area's entries as bold names opening a line, and docs/notes/INDEX.md lists them, made from the notes, never by hand.

```
node tools/docs/glossary.mjs           checks docs/notes/INDEX.md is as the notes make it (exit 1 if not)
node tools/docs/glossary.mjs --write   writes it
```

## `tables.mjs`

The docs' tables made from the data: a table in a doc that only copies a data file is written between two marks, from that file, never by hand: <!-- data: <name> -->...

```
node tools/docs/tables.mjs           checks every doc's tables (exit 1 if one is out of date)
node tools/docs/tables.mjs --write   writes them
```

## Also here

- `glossary.test.ts`
- `tables.test.ts`
