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
| `creatures[k][level][frame]` | for each kind in `world.kinds`: levels 0 baby, 1 young, 2 legend; frames 0 and 1 of the walk. Built in 3D and seen in three-quarter view from above (turned 35°, looking down 30°), facing right. Young are about 45 art pixels tall at the default style, legends about 4.5 times that; sizes on screen stay the same as the pixel size changes |
| `creatures[k][level][frame].away` | the same frame turned away from the viewer (we see the rump and the back of the head); use it for creatures moving up the screen |
| `witch` | the witch on her broom, frame 0 turned towards; `witch.frames` her three hover frames, `witch.away` the same turned away, `witch.lean` the fast-flight pose `{ towards, away }` |
| `soundsystems` | what the party defends: three stacks (`id` stack, wall, tower; `crystal` cyan, violet, amber), each `{ playing: [3 frames of the cones pumping], damaged: [2 frames of flicker], destroyed }`; about three times the witch's height. Drawn the first time it is asked for |
| `lights` | light sources: `campfire` (three frames), `stones` (`cyan`, `violet`, `green` magic stones), `pond` (with `mask`: white where its pixels are water) |

Every asset is a **baked sprite**: `{ A, N, NF, w, h }`.
- `A`: albedo canvas, RGBA. Alpha **254** marks a pixel that glows: draw it unlit. 255 is an ordinary pixel.
- `N`: normal map canvas, RGB = (x, y, z) mapped from [-1, 1] to [0, 255]; x to the right, y down the image, z towards the viewer.
- `NF`: the normal map for the sprite drawn mirrored (facing left).
- `w`, `h`: size in art pixels.
- **Anchor**: everything stands on its bottom row (the flyers, bat and moth, stand on their shadow). Creatures and trees are centred on their feet or trunk, so the anchor is `(w / 2, h)`; `art/export.mjs` measures the exact feet.
- Everything faces **right**; mirror for left.

## Single assets

| Call | Gives |
|---|---|
| `critter(speciesId, level, frame, style, facing)` | a sprite for one creature (`SPECIES` lists the ids); `facing` is `"towards"` (default) or `"away"` |
| `speciesColours(speciesId, style)` | its palette (material → RGB) |
| `TREE_TYPES` | `[[mixKnob, drawFn], …]`; `drawFn(rng, style, scale)` returns `{ sp, crownY }` |
| `treeColours(rng, style, drawFn)`, `splitTree({ sp, crownY })` | a tree's palette; its `{ top, bot }` halves |
| `bush(rng, style)` | `{ sp, colours }` |
| `witchSprite(style, { frame, facing, lean })`, `witchColours(style, outfit)` | the witch, built in 3D from named parts (`WITCH_PARTS`); an outfit is a colour per part (`DEFAULT_OUTFIT`) |
| `soundsystemSprite(style, { variant, state, frame })`, `soundsystemColours(variant)` | one soundsystem (`SOUNDSYSTEMS` lists the three); `state` is `"playing"` (frames 0 to 2), `"damaged"` (0 to 1) or `"destroyed"` |
| `lightProps(style)` | the light sources, as in `buildAssets(...).lights` |
| `bake(sp, colours, style, outline, makeCanvas)` | any sprite → `{ A, N, NF, w, h }` |
| `rng(seed)` | the seeded random generator everything uses |
| `AREAS`, `AREA_BY_ID` | the 30 area types in Ed's columns: `floor`, `wall`, `small`, `big`, `set`, `creature` (`text` keeps the words from DESIGN.md) |
| `areaAssets(areaId, style, { K, makeCanvas })` | everything one area type needs, baked: `{ def, floor, walls, small, big, setPiece }`; `floor` is a 64 × 48 tile to repeat over the ground, the rest are props `{ sp: { A, N, NF, w, h }, kind, text }` anchored at `(w / 2, h)` |
| `WALLS_BLOCK`, `SET_PIECE_CHANCE` | placement rules (Ed): wall objects don't block movement for now; a set piece appears in only some of an area type's areas (chance 0.25 to start) |

## Sigils

Each creature has a **sigil** (`art/sigils.js`), its name written in the forest's magic: a stave written bottom to top, one or two marks that evoke the animal, and the crescent foot every sigil shares. Kin to the rune glyphs (`runeGlyph` in `core.js`). Its main use is the **leashing rune**, written on the ground under a creature, so the sigils are made to survive being squashed to about half their height.

| Call | Gives |
|---|---|
| `SIGILS[id]` | the strokes, in writing order, in a unit box (x right, y down): `{ l: [[x, y], …] }` a polyline, `{ a: [cx, cy, r, from, to] }` an arc (degrees, 0 right, 90 down), `{ d: [x, y] }` an end dot; each drawn from its first point. `SIGIL_STROKE` and `SIGIL_DOT` are the stroke width and dot radius |
| `sigilStrokes(id)` | the same as polylines, each with its length and its share of the draw-on (`start`, `end`, 0 to 1) |
| `sigilColour(id)` | its glow colour: the creature's hue, bright |
| `sigilSVG(id, { size, colour, glow, progress })` | an SVG string; `progress` below 1 draws it partly written |
| `drawSigil(ctx, id, { x, y, size, colour, progress, glow })` | the same on a canvas; transform the context first to lay it on a plane |
| `sigilGlyph(id, size, { progress })` | a pixel glyph, `{ w, h, m }`: 2 a stroke's bright core, 1 its edge (for 12 to 24 px) |
| `sigilHit(id, u, v, w)` | true where the sigil has ink, for carving, like `runeGlyph` |
| `groundSigil(id, { diameter, pitch, ring })`, `paintGroundSigil(g, t, { colour, canvas })` | the leashing rune on the ground: precomputed once per size, foreshortened by the camera's pitch (`GROUND_PITCH`, 35°), with a faint magic circle; painting it at `t` seconds draws it on over `SIGIL_DRAW_TIME` (0.6 s), then it glows and pulses (alpha 254: draw it unlit). For a 3D engine, `drawSigil` onto a flat texture laid on the ground does the same |
| `runeStone(style, { glow, sigil })`, `soundsystemSprite(style, { …, sigil })` | a rune stone or soundsystem carved with a creature's sigil instead of a generic rune (an area's own creature) |

The export writes each as `sigil-<species>.svg` and a 64 px `sigil-<species>.png`, and lists them with their strokes under `sigils` in `manifest.json`.

The night lighting pass the lab uses is `shade(target, out, style, lights, rect)` in `art/lighting.js`.

## Files

- `generator.js`: the entry point: the style's knobs, the witch, `buildAssets`; re-exports the rest
- `core.js`: random numbers, colour, the `Sprite` (a material and a normal per pixel), the shape toolkit (smooth outlines, limbs, fills with normals from the distance to the edge), `bake`
- `creatures.js`: the bestiary (species table, colours, `critter`)
- `creatures3d.js`: each creature built from 3D parts; `model3d.js`: the 3D parts (ellipsoids, tapered cones, rounded boxes, shaped planes, carved hollows) and the renderer (one ray per pixel, true normals)
- `trees.js`: trees and bushes
- `areas.js`: the 30 area types and their props
- `witch.js`: the witch in 3D
- `soundsystem.js`: the soundsystems, in 3D (stone blocks as rounded boxes, horn mouths carved as hollows)
- `sigils.js`: the creature sigils and their renderers
- `lighting.js`: the night lighting pass
- `export.mjs`: every asset to PNGs and `manifest.json` (`node art/export.mjs [style.json] [out dir]`)
- `preview.mjs`: lit preview sheets; `check.mjs`: the checks (see `CLAUDE.md`)
