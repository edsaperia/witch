# tools/music-lab

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `ab.mjs`

A/B renders for Ed: node tools/music-lab/ab.mjs [out dir] [wave] [seed] [bars].

## `ab.ts`

A/B renders for Ed's music research: one fixed passage of the game's music, then the same with one ingredient added at a time, so each step can be judged against the last.

## `analyse.cjs`

Measure the music: builds the Music Lab, renders every section offline in headless Chromium, and prints each one's loudness, peak, bands and centroid and each part's own loudness; saves a spectrogram per section.

```
node tools/music-lab/analyse.cjs [out dir] [section,section…]
```

## `analyse.ts`

The Music Lab's measurements of a render: loudness, peak, energy in six bands, the spectral centroid, and a spectrogram picture.

## `boot.mjs`

The home speakers' boot, sped up: node tools/music-lab/boot.mjs [bars between speakers, default 1] Renders tools/music-lab/boot.ts offline in headless Chromium: two bars of nothing, then the 12 speakers crackling into life one a bar, the music a layer a…

## `boot.ts`

The home speakers' boot, sped up: two bars of silence, then a speaker every `every` bars, each crackling into life and its layer coming in on the next bar line, to the whole intro.

## `build.mjs`

Builds the Witch Music Lab as one self-contained page: tools/music-lab/lab.ts and everything it imports from the game bundled by esbuild into the page's one script.

```
node tools/music-lab/build.mjs
```

## `check.cjs`

The music's check: 1.

```
node tools/music-lab/check.cjs
```

## `circles.mjs`

The legends' clearings check: node tools/music-lab/circles.mjs [species,...] Renders tools/music-lab/circles.ts offline in headless Chromium: for each species, 3 s of wave 1's music 40 m from a soundsystem, then she steps into its legend's clearing: the…

## `circles.ts`

The legends' clearings: for each species, its legend's clearing as she walks into it on the ground: a few seconds of the music as it plays nearby, then the music muffling under the legend's own layer, the world slowing to a tenth there as a tape does, the…

## `cost.cjs`

The music graph's cost, measured two ways, repeatably.

```
node tools/music-lab/cost.cjs [sections,parts,run,live]   TOP=4 (sections whose parts are split) LIVE=120 (s)
```

## `cost.ts`

The music graph's cost: the game's own music engine rendered offline, timed against the audio it makes, with the nodes it builds and the sources it plays counted.

## `flight.cjs`

The music's continuity through the frames' hitches: Loads the built game in headless Chromium with sound, casts the party spell, then stops the game's own loop and drives the game's music as a real machine's frames would: about 60 a second, the game clock…

```
node tools/music-lab/flight.cjs [dist dir] [seconds]
```

## `form.mjs`

The 32-bar ABAC form, rendered: node tools/music-lab/form.mjs [section|form] [seed] [bars] [knockdown bar] [wave].

## `form.ts`

The 32-bar ABAC form: a wave's music on the game's mix, its sections on the form or one section looped, the form's melody over it, and, if asked, a knockdown as the game plays it: the record scratched and the music stopped, 5 bpm faster, the wait, the…

## `fxcost.cjs`

The voice effects' own cost, offline: node tools/music-lab/fxcost.cjs Prints each variant's load, the best of three.

## `fxcost.ts`

The voice effects' own cost: a sung line through VoiceFx with the style's settings, rendered offline at 48 kHz, timed against the audio it makes; then each effect taken out in turn, and none at all.

## `ingredients.ts`

The research ingredients' numbers, shared by the offline A/B renders and the live lab with sliders: the CC0 kit that takes the synthesised drums' place, the frame drums' ritual pattern, the vocalise's level, and the recorded voices' measured pitches.

## `lab.ts`

The Witch Music Lab: plays the game's music engine through the game's own mix from a style, with a pretend run, any one section on a loop, the proximity mix, damage and the hooks, and knobs for the style.

## `latency.cjs`

The audio output's buffer by latencyHint: For each hint, makes an AudioContext in headless Chromium, plays a graph about as heavy as the music's while the page's thread works as a 30 fps game's does, and prints the context's buffer, the device's latency,…

```
node tools/music-lab/latency.cjs            (HINTS=interactive,balanced,playback,0.06,0.12  LOAD=60  SECS=8)
```

## `set.mjs`

A night's set in miniature, rendered: node tools/music-lab/set.mjs [island] [waves] [seed] [bars a wave] [encore bars] [bpm].

## `set.ts`

A night's set in miniature: the night's music on the game's mix, each wave `bars` bars at one tempo, its build cut to a block so each wave lands on its own section first, then the victory's encore.

## `silence.cjs`

The measured output, live: node tools/music-lab/silence.cjs [dist dir] Loads the built game in headless Chromium with sound, walks her off her decks so the home speakers boot and the music plays, checks the meter hears it, then cuts the music and the sound…

## `stems.cjs`

The music drawn a bar at a time as stems against the same music drawn whole, in headless Chromium, a line of JSON a section: each section as stems through the bus against whole: apart sample by sample, by ear, the seams at the bar lines, and the cost a bar…

```
node tools/music-lab/stems.cjs [sections: drop,build,breakdown,forest] [bars: 4]
node tools/music-lab/stems.cjs parts [sections] [bars: 2]     the same, each part alone
node tools/music-lab/stems.cjs shift [sections] [bars: 1]     the live engine's own music drawn 2 s later against at 0, each
```

## `stems.ts`

The music drawn a bar at a time as stems, against the same music drawn whole: each bar's notes rendered on an OfflineAudioContext of their own into nine channels, with a tail for what rings past the bar, their bus automation kept, each bar's renderer…

## `tune.cjs`

The singer's tuning check: node tools/music-lab/tune.cjs [section] [seed] [bars] [wave].

## `tune.ts`

The singer's tuning check: the game's own engine renders the sung line alone over a breakdown, offline, and reports every sung note it scheduled, so Node can pitch-track the render and compare.

## `voices.mjs`

The voices' A/B for Ed: The same generated melody, five ways, each alone and in the music: a: Pink Trombone; b: the recorded woman's G4 retuned to each note, like a sampler; c: the FOF voice, three detuned singers, dry; d: the FOF voice through the…

```
node tools/music-lab/voices.mjs [out dir] [wave] [seed] [bars] (default previews/ed/music/voices, wave 2, seed 7, 32 bars).
```

## Also here

- `live`
- `music-lab.html`
