# tools/music-studio

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build.mjs`

Builds the Music Studio beside the game, a step of `npm run build`: dist/music-studio.html and its script bundled by esbuild into dist/music-studio/.

```
node tools/music-studio/build.mjs [out dir: dist]
```

## `check.cjs`

The Music Studio's check, in headless Chromium on a build: the page loads with no script error; the demo song plays through the game's engine and is heard; every synth knob moved off its default on a copy of a patch still sounds; held keyboard notes start…

## `knobs.ts`

The Music Studio's knobs: every knob of the engine's synth, drum and bell patches, grouped and named as a subtractive synth lays them out, with each one's range, its engine default and its unit.

## `main.ts`

The Music Studio: the game's own music engine playing patches outside the score.

## `midi.ts`

A Standard MIDI File reader for the Music Studio: formats 0 and 1, every track's notes in seconds by the file's own tempo map, its name, channel and markers.

## Also here

- `page.html`
