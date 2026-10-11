# tools/samples

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build.mjs`

Fetches and prepares the game's samples: For each sample in samples/sources.json: its source file from its repository at the pinned commit, then ffmpeg makes it mono, trims the silence before the hit, cuts it to `max` seconds with the last tenth faded out,…

```
node tools/samples/build.mjs [id,...]
```

## `check.mjs`

The samples' check: node tools/samples/check.mjs.

## `credits.mjs`

The samples' credits, from samples/manifest.json: samples/CREDITS.md, grouped by source, every file's credit line.

## Also here

- `check.d.mts`
- `credits.d.mts`
