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
| `creatures[k][level][frame]` | for each kind in `world.kinds`: levels **0 baby, 1 young, 2 adult, 3 legend** (`LEVELS`); frames 0 and 1 of the walk. Built in 3D and seen in three-quarter view from above (turned 35°, looking down 30°), facing right. Young are about 45 art pixels tall at the default style (about the witch's height for the bigger species). Adults have adult proportions and mature features but no legendary ones, at 1.3 times their young, capped at 1.4 times the witch (the elk, already taller as a young, is about 1.5). Legends are about 4.5 times their young. Sizes on screen stay the same as the pixel size changes |
| `creatures[k][level][frame].away` | the same frame turned away from the viewer (we see the rump and the back of the head); use it for creatures moving up the screen |
| `witch` | the witch on her broom, frame 0 turned towards; `witch.frames` her three hover frames, `witch.away` the same turned away, `witch.lean` the fast-flight pose `{ towards, away }`, `witch.rise` and `witch.descend` her flights up to the treetops and down to the ground, two flutter frames each: `{ towards: [2], away: [2] }`; `witch.fast` her treetop top speed, three flapping frames: `{ towards: [3], away: [3] }`; `witch.brake` a skidding stop, two frames: `{ towards: [2], away: [2] }`; on foot, `witch.stand`, `witch.land`, `witch.takeoff`, `witch.talk`, `witch.placeSigil`, `witch.liftSigil` the same way (frame counts in `WITCH_FOOT_POSES`), each sprite with `.anchors` |
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
| `critter(speciesId, level, frame, style, facing)` | a sprite for one creature (`SPECIES` lists the ids; `level` 0 to 3 as above); `facing` is `"towards"` (default) or `"away"`. Each sprite's `bodyH` is its body's height without antlers or wings |
| `speciesColours(speciesId, style, gear)` | its palette (material → RGB), with the gear's colours when given the same `gear` |
| `critter(id, level, frame, style, facing, gear)` | the same, wearing **party gear** or **woken** (`gear`, optional): `{ collar, hat, glasses, shoes, woken }`. `collar`: a colour (the creature's sigil neon, `sigilColour(id)`) or `true`: a glowing ring round the neck (or the body's front) with a tag at its front, always worn by party animals. `hat`: a colourway 0 to 2 (`HAT_COLOURWAYS`), a striped cone with a pompom. `glasses`: `"bar"`, `"star"` or `"heart"`. `shoes`: `"sneakers"`, `"glitter"` or `"platform"` (`SHOE_STYLES`), on each foot; the snake wears one on its tail tip, and the bat, moth, spider, woodlouse, glow-worm, snail and stag beetle go without. `woken`: angry glowing red eyes and a darker tint. Gear never changes the body's size. Shapes are cached per gear combination |
| `partyGear(seed, collarColour)` | a seeded mix for an invited creature: the collar always; a hat, sunglasses or shoes often; occasionally all three |
| `TREE_TYPES` | `[[mixKnob, drawFn], …]`; `drawFn(rng, style, scale)` returns `{ sp, crownY }` |
| `treeColours(rng, style, drawFn)`, `splitTree({ sp, crownY })` | a tree's palette; its `{ top, bot }` halves |
| `bush(rng, style)` | `{ sp, colours }` |
| `witchSprite(style, { frame, facing, lean, pose })`, `witchColours(style, outfit)` | the witch, built in 3D from named parts (`WITCH_PARTS`); an outfit is a colour per part (`DEFAULT_OUTFIT`). `pose` is `"rise"` (the broom about 45° nose-up, leaning into the climb, hat brim pushed back, hair and jacket trailing down, sparks falling from the bristles) or `"descend"` (about 38° nose-down, leaning back to brake, a hand on her hat, hair and jacket flowing up, legs reaching down to land), with `frame` 0 or 1; or `"fast"` (treetop top speed, barely hanging on: the broom level and a little nose-down, bristles flared; she grips the front of the handle with her body streaming out behind, legs flapping, hat blown up on its chin strap, eyes wide and teeth gritted; small speed streaks) with `frame` 0 to 2; or `"brake"` (slowing down sharply: the broom hauled about 25° nose-up in a skid, bristles swinging forward under her; she leans back hard on straight arms, feet thrust forward; hair, hat and jacket swing forward, the hat over her eyes; a puff kicked forward) with `frame` 0 or 1. On foot (`WITCH_FOOT_POSES`: `{ frames, fps }` per pose), her broom upright in her far hand like a staff, bristles down, the near hand free: `"stand"` (three idle frames: breathing, hair and jacket stirring), `"land"` and `"takeoff"` (three frames each between hovering and standing: astride the dipped broom, a leg swung over, the broom swung upright; and back), `"talk"` (four gestures: an open palm, pointing up, a wave, a hand on her chest; her head tilting, her mouth open on two), `"placeSigil"` (reaching up to the stack, drawing a sigil down, crouched with her palm to the ground), `"liftSigil"` (crouched, palm to the ground; rising; tossing it up into the stack) and `"sit"` (two frames on the treehouse's terrace chair, swinging her legs and looking out, her broom leaning beside her; her seat `WITCH_SEAT_HEIGHT` above the ground). The sigil isn't drawn: each on-foot sprite has `.anchors = { hand, hatTip }`, pixels from its top-left, her free hand (where a held sigil goes) and her hat's tip. All drawn at her ordinary scale |
| `treehouseSprite(style, { facing })`, `treehouseColours(style)` | the witch's home near the dancefloor (treehouse.js): a camper van crossed with a castle, stuck in a giant tree, with a terrace, about 16 m tall, built at the witch's scale. `{ whole, top, bot, crownY, anchors: { base, seat, door, lights: [{ x, y, rgb, kind }] }, metres }`: `top` is the crown and everything above the van's roof (from `crownY` up: treetop mode), `bot` the trunk, van and terrace; `seat` is where her `sit` pose's anchor goes (she starts the game there), `lights` the warm windows, the lantern and fairy lights. Its windows glow; the fairy lights are three party neons and violet |
| `soundsystemSprite(style, { variant, state, frame })`, `soundsystemColours(variant)` | one soundsystem (`SOUNDSYSTEMS` lists the three); `state` is `"playing"` (frames 0 to 2), `"damaged"` (0 to 1) or `"destroyed"` |
| `lightProps(style)` | the light sources, as in `buildAssets(...).lights` |
| `bake(sp, colours, style, outline, makeCanvas)` | any sprite → `{ A, N, NF, w, h }` |
| `rng(seed)` | the seeded random generator everything uses |
| `AREAS`, `AREA_BY_ID` | the 30 area types in Ed's columns: `floor`, `wall`, `small`, `big`, `set`, `creature` (`text` keeps the words from DESIGN.md) |
| `areaAssets(areaId, style, { K, makeCanvas })` | everything one area type needs, baked: `{ def, floor, walls, small, big, setPiece }`; `floor` is a 64 × 48 tile to repeat over the ground, the rest are props `{ sp: { A, N, NF, w, h }, kind, text }` anchored at `(w / 2, h)` |
| `NEW_SET_PIECES`, `SET_PIECE_KINDS` | the set pieces built in 3D (setpieces.js) for the twenty areas that had none, each area's landmark at 6 to 12 m: `{ areaId: [kind, description, size] }`. Their `setPiece` also has `metres: { width, height }`. Moor: a sleeping giant of moss; fern forest: tree ferns round a stone basin; muddy forest: a sunken rowing boat; tangly forest: a bramble-wrapped wagon; wispy forest: a beehive tree (glowing bees); hazel forest: a fairy ring (one stone's rune glows); twiggy forest: a charcoal burner's hut (embers glow); ancient: a root arch over a rune stone (glowing); Norway: a turf-roofed log hut; alder forest: a heron rookery; meadow: a sundial; berry thicket: a bear's den; wetland: a stilt hut; bog: a carved post shrine (will-o'-wisps); deadwood: a raven tree with a hanging cage; grassland: a barrow; heath: a cairn with a cold beacon; old pinewood: a stump throne; bluebell glade: a beech with a rope swing (glowworms); honeysuckle tangle: a bower. The flowering areas' (meadow, heath, berry thicket) have nothing glowing |
| `areaTreeVariants(areaId, style, { K, makeCanvas, ppm })`, `TREE_HEIGHT_CLASSES` | an area's trees across a range of heights (empty when its big objects are not trees): about ten variants of its own recipe, 3 saplings (about 0.45 to 0.7 times its ordinary tree, slimmer), 4 mature (0.85 to 1.15), 2 tall (1.3 to 1.6) and 1 emergent giant (1.8 to 2.2). Firs grow tall and narrow, willows wider rather than taller, dead trees into narrow snags. Each `{ heightClass, scale, weight, whole, top, bot, crownY, metres: { height, crownBase, crownHeight, crownRadius } }`: `weight` is its share of the area's trees (the classes 25%, 50%, 20%, 5%); `top` is the crown (cut out from the treetops), `bot` the trunk below `crownY`; metres at `ART_PIXELS_PER_METRE` (16, the prototype's) |
| `AREA_LAYOUTS`, `area.layout`, `layoutProblems(area)` | how each area lays out its vegetation, data only for the prototype's layout engine: `pattern` (`scatter`, `groves`, `rows` with `along`, `rings`, `thicket`, `lone`, `stands`, `edgeOnly`), `density`, `clump` (0 even to 1 clustered), `glades: { count, size: [min, max] m }`, `heightMix` over sapling/mature/tall/giant (null where the big objects aren't trees), `undergrowth`, `lean: { dir (degrees, 0 east, 90 up the screen), amount }`, `terrain` (stream, pools, rocky, mounds, paths, hollows, ridges), `decor: { rate, ruins, rocks, freak, lake, modern }` and a one-sentence `feel`. In the manifest's `areas`. `layoutProblems` lists what's wrong with one (empty when sound) |
| `WALLS_BLOCK`, `SET_PIECE_CHANCE` | placement rules (Ed): wall objects don't block movement for now; a set piece appears in only some of an area type's areas (chance 0.25 to start) |

## Sigils

Each creature has a **sigil** (`art/sigils.js`), its name written in the forest's magic: a stave written bottom to top, one or two marks that evoke the animal, and the crescent foot every sigil shares. Kin to the rune glyphs (`runeGlyph` in `core.js`). It has three uses (Ed):
- the **leashing rune**, written on the ground under a creature. The sigils survive being squashed to about half their height.
- the **leash stack**: leashed creatures' sigils float above the witch's head, newest at the bottom.
- carving and the interface: the bestiary card, rune stones, soundsystems.

They glow **neon**: a near-white core in a coloured halo, each species in its own palette slot. Each creature **level** has a frame that grows, so a field of runes shows at a glance what is about:
- **baby** (level 0): the bare sigil, about 2 m across;
- **young** (1): about 3 m, thicker and brighter, in a dotted circle (12 round dots);
- **adult** (2): about 4 m, thicker and brighter again, in a full circle at the normal line weight;
- **legend** (3): about 5.5 m, the thickest and brightest, with its double ring banded with rune ticks, four rays and a slow shimmer.

| Call | Gives |
|---|---|
| `SIGILS[id]` | the strokes, in writing order, in a unit box (x right, y down): `{ l: [[x, y], …] }` a polyline, `{ a: [cx, cy, r, from, to] }` an arc (degrees, 0 right, 90 down), `{ d: [x, y] }` an end dot; each drawn from its first point. `SIGIL_STROKE` and `SIGIL_DOT` are the stroke width and dot radius |
| `NEON`, `SIGIL_NEON[id]`, `sigilColour(id)` | the neon palette, each species' slot in it, and its colour. Every renderer also takes `colour`, so the game can recolour (per outfit, say) |
| `sigilFrame(level)`, `SIGIL_LEVELS` | a level's frame, for any level number (0 baby, 1 young, 2 adult, 3 legend): `{ metres, core, halo, rings, dots, band, rays, shimmer }`. Size steps first, then rings, then ornament, so levels between or beyond these extend it |
| `sigilStrokes(id)`, `sigilMark(id, level)` | the sigil's strokes as polylines, or everything drawn for a level (the frame first, then the sigil scaled into it) in its "mark" box. Each carries its share of the draw-on (`start`, `end`, 0 to 1) and its width |
| `sigilSVG(id, { size, level, colour, glow, progress })`, `drawSigil(ctx, id, { x, y, size, level, colour, progress, glow })` | the neon sigil as an SVG string or on a canvas, bare (`level` null, the default) or framed for a level; `progress` below 1 draws it partly written. Transform the canvas first to lay it on a plane |
| `sigilGlyph(id, size)`, `sigilHit(id, u, v, w)` | the bare sigil as a pixel glyph (`{ w, h, m }`, 12 to 24 px), or a hit test for carving it like `runeGlyph` |
| `groundSigil(id, { level, pxPerMetre, pitch })` | the leashing rune: a neon pixel field the level's size, foreshortened by the camera's pitch (`GROUND_PITCH`, 35°) |
| `floatSigil(id, { level, px })`, `floatSize(level)` | the floating form for the stack, upright: `px` across for a baby, larger for higher levels; its height in metres |
| `paintSigilField(field, t, { colour, canvas, progress })` | paints a field `t` seconds after it began. Its strokes trace in order over `SIGIL_DRAW_TIME` (0.6 s) with a bright, flickering pen tip, then it glows and pulses (legends shimmer). Every pixel glows: draw it unlit and additively. A field is precomputed once, so each frame is cheap |
| `new SigilStack(tuning)` | the leash stack, a chain of springs. `push(id, level, from)` adds a sigil at the bottom (lifting off from a ground point `from`, if given). `place()` takes the bottom one and returns `{ id, level, pos }`. `update(dt, { head } or { velocity })` follows her. `layout()` gives each sigil's `offset` from her head, its `tilt`, `size` and `enter` (0 to 1 through its lift-off). Tuning (`STACK_TUNING`): `size`, `gap`, `stiffness`, `damping`, `trail`, `growth`, `idleSway`, `idleRate`, `maxLean` |
| `liftOff(t)`, `setDown(t)` | the two transitions (`SIGIL_TRANSITION_TIME`, 0.4 s), for `t` 0 to 1: `{ rise, upright, scale, draw }`. Lift-off peels the ground rune up and shrinks it into the floating form; set-down drops it, flattens it and writes it onto the ground |
| `runeStone(style, { glow, sigil })`, `soundsystemSprite(style, { …, sigil })` | a rune stone or soundsystem carved with a creature's sigil instead of a generic rune (an area's own creature) |

In a 3D engine, `drawSigil` onto a canvas texture laid flat on the ground (or upright, facing the camera, for the stack) does the same as the pixel fields, with the engine doing the foreshortening.

The export writes each sigil as `sigil-<species>.svg` (bare), a 64 px `sigil-<species>.png`, and `sigil-<species>-baby|young|adult|legend.svg` and `.png` (framed, 64 px). It lists them, with their strokes, neon slots, the level frames and the stack's tuning, under `sigils` in `manifest.json`.

The night lighting pass the lab uses is `shade(target, out, style, lights, rect)` in `art/lighting.js`.

## Files

- `generator.js`: the entry point: the style's knobs, the witch, `buildAssets`; re-exports the rest
- `core.js`: random numbers, colour, the `Sprite` (a material and a normal per pixel), the shape toolkit (smooth outlines, limbs, fills with normals from the distance to the edge), `bake`
- `creatures.js`: the bestiary (species table, colours, `critter`)
- `creatures3d.js`: each creature built from 3D parts; `model3d.js`: the 3D parts (ellipsoids, tapered cones, rounded boxes, shaped planes, carved hollows) and the renderer (one ray per pixel, true normals)
- `trees.js`: trees and bushes
- `areas.js`: the 30 area types and their props
- `witch.js`: the witch in 3D
- `treehouse.js`: the witch's treehouse, in 3D
- `soundsystem.js`: the soundsystems, in 3D (stone blocks as rounded boxes, horn mouths carved as hollows)
- `setpieces.js`: the twenty 3D set pieces
- `sigils.js`: the creature sigils and their renderers
- `lighting.js`: the night lighting pass
- `export.mjs`: every asset to PNGs and `manifest.json` (`node art/export.mjs [style.json] [out dir]`)
- `preview.mjs`: lit preview sheets; `check.mjs`: the checks (see `CLAUDE.md`)
