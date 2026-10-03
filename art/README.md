# Witch art generator

Code-drawn art for Witch: every sprite is generated from a **style** (the Witch Art Lab's knobs) and comes out as an **albedo** image plus a **normal map**, for a lighting pass to light. Pure ES modules; the only thing they need from their host is a way to make canvases.

## The one call: every asset for a style

```js
import { buildAssets, defaultStyle } from "./art/generator.js";

const style = { ...defaultStyle(), /* knobs from the lab's style file */ };
const world = { kinds: ["wolf", "boar", "owl"], forestSeed: 3 };   // which creatures, which forest
const assets = buildAssets(style, world, { K: 2 / style.pixel, makeCanvas });
```

- `makeCanvas(w, h)` returns a canvas (`HTMLCanvasElement` or `OffscreenCanvas`). Optional: by default the generator uses `document` when there is one, else `OffscreenCanvas`.
- `K` scales world-sized things (trees, bushes) to the pixel size; the lab passes `2 / pixel`. Optional, defaults to that.

It returns:

| Field | What |
|---|---|
| `trees[i]` | 12 trees (4 per area for 3 areas): `{ whole, top, bot }`. `bot` is the trunk below the crown (shown in ground mode), `top` everything else (the canopy, shown from the treetops), `whole` both |
| `bushes[i]` | 12 bushes |
| `creatures[k][level][frame]` | for each kind in `world.kinds`: levels 0 baby, 1 young, 2 legend; frames 0 and 1 of the walk |
| `witch` | the witch on her broom |

Every asset is a **baked sprite**: `{ A, N, NF, w, h }`.
- `A`: albedo canvas, RGBA. Alpha **254** marks a pixel that glows: draw it unlit. 255 is an ordinary pixel.
- `N`: normal map canvas, RGB = (x, y, z) mapped from [-1, 1] to [0, 255]; x to the right, y down the image, z towards the viewer.
- `NF`: the normal map for the sprite drawn mirrored (facing left).
- `w`, `h`: size in art pixels.
- **Anchor**: everything stands on its bottom row. Creatures and trees are centred on their feet or trunk, so the anchor is `(w / 2, h)`; `art/export.mjs` measures the exact feet.
- Everything faces **right**; mirror for left.

## Single assets

| Call | Gives |
|---|---|
| `critter(speciesId, level, frame, style)` | a sprite for one creature (`SPECIES` lists the ids) |
| `speciesColours(speciesId, style)` | its palette (material → RGB) |
| `TREE_TYPES` | `[[mixKnob, drawFn], …]`; `drawFn(rng, style, scale)` returns `{ sp, crownY }` |
| `treeColours(rng, style, drawFn)`, `splitTree({ sp, crownY })` | a tree's palette; its `{ top, bot }` halves |
| `bush(rng, style)` | `{ sp, colours }` |
| `witchSprite()`, `witchColours(style)` | the witch |
| `bake(sp, colours, style, outline, makeCanvas)` | any sprite → `{ A, N, NF, w, h }` |
| `rng(seed)` | the seeded random generator everything uses |

The night lighting pass the lab uses is `shade(target, out, style, lights, rect)` in `art/lighting.js`.

## Files

- `generator.js`: the entry point: the style's knobs, the witch, `buildAssets`; re-exports the rest
- `core.js`: random numbers, colour, the `Sprite` (a material and a normal per pixel), the shape toolkit (smooth outlines, limbs, fills with normals from the distance to the edge), `bake`
- `creatures.js`, `babies.js`: the bestiary; babies are hand-drawn grids
- `trees.js`: trees and bushes
- `lighting.js`: the night lighting pass
- `export.mjs`: every asset to PNGs and `manifest.json` (`node art/export.mjs [style.json] [out dir]`)
- `preview.mjs`: lit preview sheets; `check.mjs`: the checks (see `CLAUDE.md`)
