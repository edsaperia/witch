# tools/audio-test

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build.mjs`

Builds the audio capacity test beside the game, a step of `npm run build`: dist/audio-test/, with Vite on its own.

```
node tools/audio-test/build.mjs [out dir: dist]
```

## `main.ts`

The audio capacity test: run once on his laptop, about two minutes.

## `run.cjs`

The audio capacity test in headless Chromium, for a builder: serves the built game's dist/, opens audio-test/, presses Start, waits for the results and prints the summary, writing the JSON to [out].

```
node tools/audio-test/run.cjs [dist] [out.json] [page: "" the capacity test, stall.html the music stall test]
```

## `stall.ts`

The music's stall test: the game's own music runs for about 40 s while the page's thread is held busy for 1.5 s three times, as a long frame would hold it.

## Also here

- `index.html`
- `stall.html`
