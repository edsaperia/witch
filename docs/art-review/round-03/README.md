# Art review, round 3 (2026-10-06, about 05:00 UTC)

**Build:** `claude/prototype` at d02b5d8, which now carries:
- the spooky lighting stack (#184, #189, #195, #199);
- the warm party (#198);
- the party's life (#200, #206);
- the creator in amber (#209);
- the set pieces (#204).

Merged in for this preview:
- **#208:** spooky lighting 5, round 2's fixes;
- **#205:** the night palette;
- **#212:** her magic in the night palette.

The attack PRs (#193, #203) conflict with #208 in `src/render/rig/rigView.ts` and aren't in this set.

**Capture:** the fixed script, seed 123, the areas in their own cells (moor 8,9, fern forest 7,10, ravine 7,11, shrine 8,8), plus a new **party** shot: a partified area two waves on, by its soundsystem. The baseline is `../round-01b/`; side by sides are in `../compare/`.

## Since round 1

| Round 1 problem | Round 3 |
|---|---|
| The witch at the floor's value | **Fixed** on the moor, shrine and ravine. She has a light pool and a cool rim. **Regressed in the fern forest**, where her pool is gone and she's a dark figure in a dark wood (`default-fern-forest-ground`). |
| The areas look alike at night | **Fixed.** The moor is violet heather, the shrine pale blue flags, the ravine grey rock with spires, the fern forest dark blue-green. |
| The party as six hues | **Fixed away from home.** The partified area (`default-party-*`) is the picture Ed asked for: a warm amber pool round its purple soundsystem in a dark blue-green wood, under the moon. **At home** a big lime-green glow still sits on the ground at the dancefloor's front (`default-fight`), the brightest thing there and off home's cyan. |
| Pools as black holes | Not in frame this round. |
| The UI shouting | **Fixed:** amber, quiet, and the creator panel too. |
| Too dark in the mid-distance (round 2) | **Fixed.** From the treetops the canopy's shapes read under the moon. |
| Eyeshine as red blobs (round 2) | **Fixed:** small, crisp pairs. |

## New in round 3

1. **It has swung too far into blue-violet.** The moor and the shrine are periwinkle and lavender now, not "a dark blue-green and violet forest", and with the amber they're the only two hues on screen. Pull the moon's fill toward green-cyan and take a little saturation out, so the woods are blue-green with violet in the shadows. Keep the heather's violet as the moor's accent, not the whole floor. (Rendering, with art builder 1.)
2. **The shrine's flags are the brightest ground.** Pale and moonlit, they read as frost or snow, and the fox stands out more than the witch. Cap the pale floors' value (my note on #205).
3. **Her light in the fern forest.** Check why her pool doesn't light the ground there; it may be the area's fog or tint eating it.
4. **The lime glow at home** (above). Rendering or art builder 3: what is it? Home's light should be its cyan and the warm amber.
5. **Checker dither as a screen door.** The ravine's rock spires and the dark crowns are a 50% checkerboard where light meets shade. At 1280×720 it reads as a mesh over them. Use an ordered pattern that clusters (2×2), or the smooth path for those bands.

## Bold and ref (`bold-*`, `ref-*`)

- **In the party's light the styles finally show.** In the fight at home (`bold-fight`, `ref-fight`), the boar in its party shoes and the wolves read in each style: bold's coloured outlines against ref's near-black ones. This is the place for Ed to choose between them.
- **On the dark moor the witch disappears in both styles.** Her light pool is there, but she isn't visible in it (`bold-moor-ground`, `ref-moor-ground`). The rim in every style (#208) isn't enough for a dark witch on violet heather. Rendering should check the witch herself under the styles: she must be the brightest figure in her own pool in every style.
