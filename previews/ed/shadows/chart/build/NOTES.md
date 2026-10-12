# The moon over the sea chart: the build (PR #751, 2026-10-12)

Ed: "Build it." This is the mockup one level up (`../NOTES.md`), built as recommended:
- **The rise:** the moon rises over the north-west edge as the chart opens (6 s, each time it opens).
- **The orbit:** then it circles once every 4 minutes, at 22°.
- **Shadows:** at most 0.6 dark, on the sea and in the islands' own valleys, shallows and lakes.
- **Hill shading:** follows the moon.
- **Close in:** each island's shadows come from a tile of its own heights.
- **The empty band (#746):** an empty band of sea past the islands, 0.18 of their radius.
- **The disc:** the moon's disc is drawn past the rim at its bearing.
- **Live sliders** on the pause page under "#751 Chart moon": darkness, height, seconds a turn, rise, disc, empty sea. The knobs are `chart.moon.*` and `chart.edgeBand` in `config/tuning.json`.

## Files

- `whole-moon<b>.png`, `open-moon<b>.png`, `close-unknown-15-moon<b>.png`: the whole chart, the opening view and the tallest island close in, with the moon at bearings −40°, 50°, 140° and 230°.
- `moonrise.mp4`: the chart opening, the moon rising NW and setting off round (sped up).
- `orbit-close.mp4` and `orbit-open.mp4`: a full orbit close in and over the opening view (sped up).
- `maptable-over-the-game.png`: the map table open in the game (seed 123), about 90 s in, the moon round to the east.
- `open-moon50-fewer-taps.png`: the opening view after the march was cut to 20 taps on an island and 16 on the open sea (the files above were made with 28). It looks the same.

## Cost

Measured headless in software GL (SwiftShader), so only relative, at about the map table's size:

| | a chart frame |
|---|---|
| The chart before (no moon) | 255–285 ms |
| With the moon, shadows off | 290–330 ms |
| With shadows on | 380–410 ms |

Over the game, the table added about 270 ms a frame to the game's ~480 ms before, and about 350 ms with the moon. On a GPU the march is 16 to 20 texture reads a low-resolution chart pixel, so it should be small. It still needs a look on real hardware. Darkness 0 on the pause panel turns the march off.
