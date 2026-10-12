# Why the beach isn't pixelated: diagnosis

Ed asked: "The beach is not pixelated like everything else, why is this?"

All shots use seed 2 on the north coast at 1280×720, using `tools/beach/approach.cjs`'s camera at the water's edge (and lying down where she lay). They were shot on prototype at b80a901a. The toggles were temporary and local, and none are committed.

## Verdict

The picture *is* drawn in pixels everywhere: the game renders at a third of the screen's size, then scales up. The sand just has nothing to show from one drawn pixel to the next. Three causes:

1. **The squash fade (`fine`, `src/render/ground.ts`) wipes out all of the sand's detail.** This is the main cause.
   - The sand's grain, ripples, shells, bubbles, lace and wet sheen sit on a world grid of the art's pixel (`uPixel`, about 9 cm).
   - The beach camera is far back and low (85–110 m, about 2° down), so one drawn pixel covers about 1.5 of those cells across and 4–5 down (`4-debug…`). That is a squash of 1.5–8, while `fine` fades all detail between 0.75 and 1.6.
   - So `fine` is 0 over all the sand, and only the flat base colour and smooth lighting are left.
   - Turning the fade off (c) brings the grain back, but it aliases into streaks far off.
2. **The forest floor hides the same thing.** Its art pixels are as small: the debug shot shows a squash of about 2 across. But its colour changes sharply from cell to cell, and the grass tufts (sprites at the art's own pixel scale) cover it. So every drawn pixel differs from its neighbour and it reads chunky. The open sand has no tufts and a nearly flat colour.
3. **The mist** (`?fx=smooth`, the default) lays soft gradients over everything. Over plain sand they read as big soft blotches; turning mist off (n) removes them. In the woods, trees and tufts break the mist up.

### What doesn't matter

| Variant | Result |
|---|---|
| b, lighting worked out at the pixel's centre rather than the exact spot | no visible change; the light barely varies inside one art pixel |
| h, trunk shadows off (#754) | no change |
| `uLand` sampling | already read once per pixel |
| l, raising the fade's thresholds (2 to 4) | still smooth, because the squash is above 4 |
| k, measuring the fade across the screen only | still smooth, because the squash across is 1.5–2 |
| e, a stronger per-pixel grain | shows, but on the fine grid it would alias far off |
| f, lighting in dithered steps | noisy, not pixel-art |

## Proposed fix (ground.ts only, small)

Replace the `fine` fade on the beach with a **level of detail**:
- Grow the sand's grid cell by powers of two until it is at least one drawn pixel. Do this separately across and down: `k = exp2(ceil(log2(max(1, fwidth(world.xz) / uPixel))))`, then `px = floor(world.xz / (uPixel·k))·k`.
- Keep its detail at full strength (`fine = 1`).
- Give the sand a little more per-cell contrast (the mock adds a ±7% grain on top of its own three tones).

The grain stays locked to the world, so it doesn't swim as she moves. It is never finer than a drawn pixel, so it doesn't alias, and it reads chunky like everything else (shots r and s; `3-lying-view` for the stargazing camera).

In the mock the coarser grid applies to the whole ground while the beach is on. The real version should apply it only to the sand and sea branch.

**Decision for Ed:**
- **Mist on the beach:** with mist (r) or without (s)? Or mist in `?fx=pixel` style just over the sand?
- **Sand contrast:** how strong should the grain be?
