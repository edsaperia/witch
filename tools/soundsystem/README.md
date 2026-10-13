# tools/soundsystem

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build-preview.mjs`

Builds the soundsystem preview as one self-contained page: five real maps' soundsystems, dealt by the game's own soundsystemSpecs, and the art modules inlined as the Art Lab's build inlines them, so the page draws every one live and rerolls in the browser.

```
node tools/soundsystem/build-preview.mjs [seeds]
```

## `ingame.cjs`

The generated soundsystems in play: the built game at 1280×720, WAVES waves brought on at once, each left to rise; her by each soundsystem in turn, close, on the ground, waiting for its art; then up in the treetops between the first two, zoomed out ZOOM…

```
npm run build && node tools/soundsystem/ingame.cjs [out dir] [seed]
```

## `sheet.mjs`

The soundsystem generator's sheet: N generated soundsystems side by side, a made-up map's worth, dealt as one set, on a dark ground at scale K, each labelled with its profile, crystal, stone and projector; then three of them through every state: playing,…

```
node tools/soundsystem/sheet.mjs <out.png> [seed] [n]
```

## Also here

- `dist`
- `preview.html`
