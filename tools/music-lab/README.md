# tools/music-lab

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

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

## `flight.cjs`

The music's continuity through the frames' hitches: Loads the built game in headless Chromium with sound, casts the party spell, then stops the game's own loop and drives the game's music as a real machine's frames would: about 60 a second, the game clock…

```
node tools/music-lab/flight.cjs [dist dir] [seconds]
```

## `lab.ts`

The Witch Music Lab: plays the game's music engine through the game's own mix from a style, with a pretend run, any one section on a loop, the proximity mix, damage and the hooks, and knobs for the style.

## `silence.cjs`

The measured output, live: node tools/music-lab/silence.cjs [dist dir] Loads the built game in headless Chromium with sound, walks her off her decks so the home speakers boot and the music plays, checks the meter hears it, then cuts the music and the sound…

## Also here

- `dist`
- `music-lab.html`
