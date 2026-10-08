# The ley line's curvature

Ed, 2026-10-06, on a hairpin at a runestone: "can we give leylines a maximum curvature so they don't kink like this?" And on a sharp V at another: "Another runestone showing the leyline with a kink in it".

`ley-curve.png` comes from `node tools/map/leycurve.mjs --seeds 1,2,3,123,4242,925469`. It shows six seeds, one row each.

- **Left:** the whole route from above, with home in yellow.
  - Grey is the line as it was, straight from stone to stone.
  - Coloured is the line as curved now, from blue (the first waves) to pink (the last).
  - Red rings mark crossings. These are only the planned route's own few, within Ed's rules.
- **Right:** close-ups, 220 m across, at the four stones where the old line turned sharpest. They're its hairpins and Vs, 170° to 180°.
  - Dashed grey is before; cyan is after; white marks the stones.
  - The dashed circle is the minimum radius (`leyLines.minRadius`, 25 m).

Before, each stone was a corner, up to 180° in no length at all: a hairpin where the next stone lay back the way the line came, or a V. Now the line sweeps through every stone and never turns tighter than 25 m on any seed. That's at most 2.29° a metre, and every seed's tightest turn is exactly 25.0 m. Where the next stone lies back the way it came, the line loops round the stone instead of doubling back, like a road through a town.
