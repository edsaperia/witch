# Art iterations: what the new generators can do

Ed (2026-10-05): "Feel free to do a few iterations of the art – let's see what the new system can do." An exploratory look ahead of the full art pass (#92), using the creature genomes (#79 stages 1–3: species as data, palette colour, size curves, the silhouette check) and the flora genomes (parts 1–3: plant genomes, blob crowns, pixel wind). Each area is reviewed as a **set**: its creature at all four levels, its plants and its sleeping legend together.

**Nothing here changes the default art.** Every change is data in an *art set* (`art/genome/iterations.js`), drawn only when asked for: `?art=next` in the game shows the chosen iteration of every area together; `?art=<area>@<n>` (e.g. `?art=ancient@2`) one area's nth.

## How to read the folders

Each `docs/art-iterations/<area>/<before|v1|v2|v3>/` holds:

- `creatures.png`: the creature at baby, young, adult and legend, towards then away, the witch for scale; then the young and adult in party gear, the young woken, the sleeping legend's two breaths; then the walk frames. Lit by the previews' warm studio light on the area's own floor.
- `plants.png`: the area's tree variants across the height classes; a 3 × 3 patch of crowns as the treetops show them and the trunks as the ground shows them; its walls, small and big objects and set piece.
- `set.png`: the set together on a patch of its floor: trees, props, creatures (baby, young, adult), the sleeping legend, the witch.
- `ingame-ground.png`, `ingame-treetops.png`: the built game with that art set, the witch put down ~40 m from the nearest area of that type's middle (seed 123, waves off, at night as the game is).

`new/v<n>/creatures.png` has the new creatures.

Rerun: `node tools/art-iterations/sheets.mjs <area> <dir> <artSet>`, `npm run build && node tools/art-iterations/ingame.cjs <area> <dir> <artSet>`, `node tools/art-iterations/silhouettes.mjs next`.

## The areas, and why these

Picked to be as different as possible, and to put every template but the bird through it:

| Area | Ed's brief (art/areas.js) | Creature, template | Flora |
|---|---|---|---|
| Ancient | mossy roots over rocks, sorrel, giant gnarly slanted trees | stag, quadruped | broadleaf, the blob generator |
| Wetland | wet mud, puddles and reeds, reeds and rushes, willows | toad, squat | bespoke willow, blob |
| Cave mouth | stone and roots, rock walls, stalagmite stubs, dead trees, a cave mouth | bat, flyer | bare blob snags, fantasy glowcaps |
| Holly thicket | dead leaves, holly hedges, cobwebs, hollies, a web-hung dead tree | spider, insectoid | bespoke holly, blob |
| Bluebell glade | bluebells, ferns, beeches | glow-worm, serpent | broadleaf beech, hazel |

## What each iteration tried

### Ancient (stag) — chosen: v3
- **v1** A red deer's coat (deeper, redder, cream belly and rump) instead of flat orange; spots on the fawn only (a new `spotsAt`). A new blob-generator species, **ancient oak**: a thick, slanting, bent trunk, low spreading limbs, 6–8 broad blobs, moss and ivy at the foot. Leaf hue a touch greener.
- **v2** A grander stag: longer legs and neck, smaller head, antlers growing faster by level (a per-species size curve); its legend carries only the forest on its back with bone antlers. Oaks taller and twice as gnarled; one green from tree to tree (a new per-species `variety`).
- **v3** The legend's glow re-coloured per species (`palette.over`): antlers and back-forest in old gold and lichen green instead of the style's mint and violet. Holier oak crowns, ferns with the sorrel.

### Wetland (toad) — chosen: v2
- **v1** A common toad: olive-brown, wartier, pale throat, bigger eyes. Willows a cooler green (a new `marshWillow`; the area's leaf hue was autumn yellow).
- **v2** A natterjack: flatter and wider, pale stripe down the back, greener, thicker legs, big-eyed babies (eyes per level). An **alder carr** (several dark stems) by the blob generator as the minor tree.
- **v3** The legend wears a flat green lily-pad cap (the toadstool cap, legend only); thicker alder carr, longer willow curtains. *Rejected*: the pad reads as a saddle or table on its back, not a lily pad; v2 is cleaner.

### Cave mouth (bat) — chosen: v3
- **v1** A long-eared bat: bigger ears and head, plum membrane, pink ears. Dead trees became **cave snags** (blob generator, no crown, bent 2.6); glowcaps instead of the green yew, which jarred in a dead area.
- **v2** Wider wings with four fingers and drooping tips, a tawny ruff, big-headed, big-eared babies; taller hollow snags; a cold blue-grey stone floor.
- **v3** A darker bat that reads against stone at night, wings growing faster than its body by level; dark-barked snags; glowcaps a cold cave cyan instead of violet; the hollows dropped (see limits).

### Holly thicket (spider) — chosen: v3
- **v1** A garden spider: chestnut, cream cross, longer hairy legs held higher. A darker, glossier holly with fewer berries (`darkHolly`).
- **v2** Rounder and darker, a banded abdomen (big and round on babies), thicker baby legs; hollies grown by the blob generator as cones of glossy blobs. *Rejected both*: the bands read as a bee, and the blob holly as a topiary lollipop tree.
- **v3** The bespoke holly back as the main tree, the blob holly a minor sapling with fewer berries; the cross back on a dark spider with near-black hairy legs.

### Bluebell glade (glow-worm) — chosen: v3
- **v1** The real larva: dark, banded, 11 segments, three glowing tail segments, a lower back. Beeches a fresh spring green (a new `gladeBeech`) instead of autumn yellow.
- **v2** The glow grows with it: one segment on a baby to four on a legend, in its own yellow-green (`palette.over` on the magic materials); beeches one green; ferns and bluebell flowers underfoot.
- **v3** Taller beeches over a hazel understorey (instead of holly); a bluer floor.

### New creatures (`new`) — chosen: v3
Three species that don't exist yet, each only a genome record on an existing template:
- **Crystal stag** (quadruped; a shaped and coloured variant): palm antlers, pale frost coat, ice-cyan glow, crystals along its legend's back.
- **Hearth drake** (quadruped; fantasy): long and low, no ears, curled horns, a ridge, a yellow belly, fire glow; its legend a flame crest and crystal spines (v1–v2 tried green wings: they read as cards).
- **Toadstool toad** (squat; v1 a "puffball" that read as a burger): a domed red cap with white spots, growing with level.

Silhouette check on `next` (`tools/art-iterations/silhouettes.mjs`): no pair under 0.15; the closest new pair is otter ~ hearth drake at 0.22 (adult).

## What the system did well

- **Variants are cheap.** Three new species in 30 lines of data, no code. A palette, a few proportions and a part choice make a recognisably new animal; the toad builder with a cap became a whole new creature.
- **Patches compose.** Each iteration is a patch on the last (objects merged, arrays replaced, `null` removes), so trying, comparing and reverting is editing a few numbers; any iteration is one URL away in the game.
- **Size curves** read well: per-species curves (the stag's antlers) and per-level `form` values (bat ears and head, toad eyes, spider abdomen, glow-worm light) make babies cute and legends grand without new art.
- **The blob generator** gives each tree a strong silhouette with only a dozen numbers: the slanted ancient oak, the twisted snags and the alder carr are all clearly new species.
- **The silhouette check** runs on any art set in a second, so new species can be screened before anyone looks.
- **The default art is safe**: every builder change is pixel-identical unless a genome asks for it (`tools/genome/compare.mjs`: 1560 sprites, 0 differ).

## Limits hit (for stages 4–5 and the art pass)

Creatures:
1. **Non-quadruped builders had no shape parameters at all.** Only palette and the template's two size curves (`build`, `motes`) were data; the bat, toad, spider and glow-worm were constants in code. I added an opt-in `form` to those four (defaults identical); the owl, raven, hedgehog, mole, snail, woodlouse, beetle, snake and moth still have none.
2. **`coat.shaggy` does nothing**: the badger, bear and elk set it, no builder reads it. Fur texture is not drawable yet.
3. **Markings can't vary by level** except the one hard-coded "young spots" case (I added `spotsAt`). Stage 4 wants markings as a part with its own per-level curve.
4. **The palette is one hue ramp.** Every material derives from one colour, so a bat's membrane, a deer's dark legs or a red cap need per-material overrides (`palette.over`, added here). Curated ramps per material, as #79 suggests, would do better than hsv offsets.
5. **Glow colour is the style's, not the species'.** Legends' glowing parts all came out mint and violet whatever the animal; `palette.over` on `MAGIC`/`MAGIC2` fixes it per species. The left and right antlers glow in different materials, so they never match.
6. **Legend features are toys.** "A little forest on its back" is three lollipop trees; "wings" on the four-legged are flat cards; crystals look like fins. They are primitives, not grown by the plant generator or the part pool. Stage 5 should let a legend feature be a baked plant (a real blob crown on a stag's back) or a part from the pool.
7. **Flat-plane wings fail face-on.** The bat seen from the front is a stick; seen away, its wings are flat rectangles. A membrane needs real thickness or a 2-pose bake per facing (stage 4's 8 directions will make this worse, not better).
8. **Parts are fixed lists.** One horn shape (`curl`), two antler shapes, no fantasy parts (a cap, a lily pad, a shell, a mane) in the socket list; I put a cap in the toad builder as a stop-gap. The part pool needs to be data too.
9. **No new legend sleeping poses**: `LEGEND_POSES` is per species in code, so new creatures have no sleeping legend.

Flora:
10. **The blob generator can't fill a cone or a column.** Blobs sit only at branch tips, so a holly becomes a topiary of separate balls. An envelope fill (space colonisation, or blobs placed through a crown shape) is needed for hollies, yews and firs.
11. **Bare trees and the top/bottom split**: on a bare tree a knothole (`treeHollow`) lands in the top half and floats in the canopy as a dark oval; `splitTree` should keep wood-coloured marks with the trunk.
12. **Hue variety was the style's only.** Some species need to stay one colour (I added a per-species `variety`); spring and autumn per area want a palette ramp, not hue jitter.
13. **Tree sizes are relative**: "giant gnarly trees" needed both a bigger genome and a bigger area `scale`; the height classes cap how much a species can dominate.

Props and the review itself:
14. **Props aren't genomes.** Rocks, reeds, stalagmites, webs, ferns and flowers are code with a handful of options, so the cave's stalagmites and the glade's bluebells could not be iterated; the bluebell floor doesn't read as blue at all.
15. **Night hides everything.** The in-game shots are dark; contact sheets under studio light are the only way to judge colour. The art pass needs a review mode in the game (a brighter debug light) and sheets under the game's own night.
16. **Studio light is warm**: everything on the sheets shifts yellow; judge hues against `before`, not absolutely.

## Recommendations

**Creature stages 4–5**
- Make **every builder a template with `form` numbers** (as done here for four), each number allowed per level, so all 30 (and 80) species are data.
- Make **markings a part** (`marking.cross`, `marking.bands`, `marking.spots`, `marking.stripe`) with a per-level curve and its own material.
- Give **palettes per-material ramps** (curated 3–5 shades), and a per-species glow ramp; colour both antlers from one material.
- Turn **legend features into parts** from the pool, including baked plants (`moss` = a real blob crown from the area's own species), and give the part pool fantasy parts (caps, pads, shells, manes, crystal clusters).
- **Bake wings with thickness** or as separate per-facing poses before going to 8 directions.
- Make **sleeping legend poses data** (sink depth, head-down, moss) so new species get one free.
- Run the **silhouette check on every art set** in `art/check.mjs` once sets are part of the game.

**Flora part 4**
- An **envelope fill** for the blob generator (cone, column, dome, weeping) so the bespoke holly, yew, fir and larch can become genomes too.
- Per-species **colour ramps and seasons** in place of hue jitter.
- Keep **marks with the wood** in `splitTree`.
- **Props as genomes** (rocks, reeds, stalagmites, flowers, webs), so an area's whole set can be tuned as data.

**The witch generator**
- Build it the same way from the start: a **template with `form` numbers and parts** (hat, broom, cloak, hair, accessories as tagged parts with exclusions), **palette per material** with curated outfits, per-pose bakes, and a silhouette check against the 30 creatures so she always reads as the witch.
- Start from an **art set**, so the new witch can be compared with today's in the game (`?art=`) before it replaces her.

## Next for Ed
- Look at `?art=next` on the PR's build (the preview link the workflow posts).
- Which of these, if any, should replace the default art? Nothing has been flipped.
