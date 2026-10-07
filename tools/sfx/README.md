# tools/sfx

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `audit.cjs`

The sound's CPU audit: Loads the built game in headless Chromium with sound, in a big debug arena on seed 871136, casts the spell and starts the sound, then drives it a frame at a time: the rules' step without the picture, then the sound's own work for…

```
node tools/sfx/audit.cjs [dist dir] [game seconds] [out.json]
```

## `check.mjs`

The sound effects' check: Bundles tools/sfx/render.ts, renders every effect offline in headless Chromium, and fails on a script error, silence, NaN or clipping; writes each as a WAV to previews/sfx/ to listen to.

```
node tools/sfx/check.mjs [name,...]   (only those, while working on them)
```

## `compare.mjs`

Two renders of the sound effects compared: For a change that should leave every sound as it was: each WAV byte for byte, and where they differ, how much.

```
node tools/sfx/compare.mjs <dir a> <dir b>
```

## `live.cjs`

The live audio check: plays the built game in headless Chromium for MINUTES minutes with its real AudioContext, the audio graph instrumented: the nodes made by kind, the sources playing, the context's state and time, the output's peak and rms, and any…

## `mix.mjs`

The mix check: Bundles tools/sfx/mix.ts and renders its scenes offline in headless Chromium, as the game mixes them: home, a fight by a soundsystem and the deep forest.

```
node tools/sfx/mix.mjs [out-name]
```

## `mix.ts`

The mix: scenes of the game's sound rendered offline as the game plays it, the music with the sound effects over it on a timeline of cues, frame by frame.

## `render.ts`

Renders every sound effect offline, for tools/sfx/check.mjs: each in its own OfflineAudioContext, measured and returned as 16-bit mono samples.

## `run.mjs`

The run check: Bundles tools/sfx/run.ts and renders ten minutes of a scripted playthrough offline in headless Chromium, as the game mixes it: the boot at home, flying out past a pond, an angry legend, three waves, a partified area, sieges, a soundsystem…

```
node tools/sfx/run.mjs [out-name] [--clips]
```

## `run.ts`

The run: ten minutes of a playthrough's sound rendered offline as the game mixes it: the music through the proximity mix, its arc driven by a scripted run, and the sound effects over it on the same script.
