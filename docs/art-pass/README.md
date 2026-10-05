# The art pass (#92)

Ed (2026-10-05): one combined pass over every species (creatures from the creature generator, plants from the flora generator, witches from the witch generator) across all 30 area types, going back to the original briefs and developing the art fresh within each generator's limits, with the current art only as inspiration. The art director reviews each iteration as a set.

**Nothing here changes the default art yet.** Every change is data in the art set `pass` (`art/genome/pass.js`), on top of the genomes, drawn only on request:

- `?art=pass` shows every area at its latest iteration;
- `?art=pass@<n>` shows every area at its nth iteration;
- `?art=pass:<area>@<n>` (for example `?art=pass:moor@1`) shows one area at its nth.

Our witch is kept exactly as she is (Ed). Witch variety is left as #98 made it until Ed answers questions 138 to 140.

## The briefs

Ed's columns for each area (`art/areas.js`'s `text`, DESIGN.md's table), its creature, and the art direction in DESIGN.md's "Look": recognisable animals that grow magical features as they level; areas read as colour fields, each with its own dominant colour; dark, rich night scenes lit by saturated glows.

## The batches

Five batches of six areas, in DESIGN.md's order, so Ed's own rows come first:

1. moor, fern forest, muddy forest, stone shrine, tangly forest, wispy forest;
2. hazel forest, garden, twiggy forest, ancient, norway, alder forest;
3. meadow, old oaks, berry thicket, wetland, stream, rocky slope;
4. bog, deadwood, cave mouth, grassland, beaver pond, log pile;
5. heath, old pinewood, ravine, bluebell glade, holly thicket, honeysuckle tangle.

## How to read the folders

Each `docs/art-pass/<area>/<before|v1|...>/` holds:

- `creatures.png`: the creature at baby, young, adult and legend, towards and away, with the witch for scale; then the young and adult in party gear, the young woken and the sleeping legend's two breaths; then the walk frames;
- `plants.png`: the area's tree variants across the height classes; a patch of crowns as the treetops show them and the trunks as the ground shows them; its walls, small and big objects and set piece;
- `set.png`: the set together on a patch of its floor;
- `ingame-ground.png`, `ingame-treetops.png`: the built game with that art set, the witch put down near the nearest area of that type (seed 123, waves off, at night as the game is).

`docs/art-pass/witches/v<n>.png` is the witch sheet: ours, then generated witches, each hovering, leaning and standing.

The sheets are lit by the previews' warm studio light, so judge hues against `before`, not absolutely.

To redraw: `node tools/art-iterations/sheets.mjs <area> <dir> pass@<n> 2`; `npm run build && node tools/art-iterations/ingame.cjs <area> <dir> pass@<n>`; `node art/preview.mjs witchgen 15 <png> 2`.

## Batch 1, iteration 1

| Area | Ed's brief | Creature | What v1 tries |
|---|---|---|---|
| Moor | moss; puddles, a lake; long grass; moss mounds; the sleeping giant | badger | A European badger: a cool slate-grey back, black legs, the striped face. Its legend's crystals become a ridge of the moor's standing stones, glowing a pale moonlit green rather than the style's mint and violet. The moor a deeper olive moss with taller grass. |
| Fern forest | pine needles, ferns, pine trees | boar | A darker, grey-brown, bristly wild boar whose piglets are striped like humbugs (a new `coat.stripes`). Its legend's great tusks are old ivory. A dark blue-green conifer forest (fir, Scots pine and larch, no birch or aspen) over rusty needles, its ferns taller. |
| Muddy forest | mud and leaves, short trunks with broken branches, trees with many trunks and branches | snail | A garden snail: a bigger amber shell with tight dark bands and a pale mantle, a grey-brown body, longer stalks (new snail `form` numbers). Its legend's shell glows amber. The trees an ochre, muddy olive over wet, dark mud. |
| Stone shrine | grassy, stony; mossy henges; little stones; big stones; a shrine | fox | A deeper red fox with dark socks. Its legend is a kitsune whose many tails burn with pale fox-fire. The shrine's grass greyer, like old stone. |
| Tangly forest | nettles and earth, tangled branches, fairly short tangly trees | ram | A ram with a cream fleece and a dark face. Its legend's horns glow gold, as its feature's name says, not the style's mint. The hawthorn tangle a deeper red-green. |
| Wispy forest | dry leaves, tall thin wispy trees, thick trees with several trunks | woodlouse | A common woodlouse: slate grey with pale flecks and pale plate edges, ten plates, longer feelers (new woodlouse `form` numbers). Its legend's crystals moonstone. The wispy forest a paler gold. |

### Generator changes (opt-in; the default art is pixel-identical)

- `coat.stripes` for the four-legged: lengthwise stripes round the back at the levels it names (`{ at: [0], n: 5, mat: "BELLY" }`, a piglet's).
- `form` for the snail (shell, shellH, whorl, stripe, foot, stalks, skin, shellMat, bandMat, mantle) and the woodlouse (plates, length, width, dome, legs, antennae, rim, mottle).
- An art set's area may carry its own `flora` (species and palette, as `art/flora/areas.js`).
- Ferns take `h` (their height), as grass does.

`tools/genome/compare.mjs` against `claude/prototype`: 1560 creature sprites, 0 differ.

### Limits met in this batch

- The ram's curled horns are a fixed shape in the four-legged builder; at a legend's 1.5 times they read as blobs whatever their colour.
- Wool is fourteen even ellipsoids round the body, so a fleece reads smooth, not curly.
- Small objects (grass, ferns, stones, brambles) and the moor's mounds are props with a few options, not genomes, so they can only be resized and recoloured.
- The flora palette scales each species' own colour, so an autumn-gold larch stays gold in a blue-green conifer forest; the forest's colour comes from which species lead.

## Batch 1, iteration 2 (the art director's notes on #112)

Across the batch:
- **One leaf colour per area**: each area's main species has `colour.variety` 0.3 (fir, sycamore, hawthorn, lime), and an area's flora can now give one of its species its own colour (`flora.species[i][2].colour`), so the fern forest's pines and larches stay its dark green rather than turning yellow.
- **The sleeping legends wear their own area**: a genome's `sleep` changes its sleeping pose's overgrowth (`over`, with a new `mud`: earth caked up its flanks) and its colours. The moor's badger is dark peat and standing stones; the shrine's fox grey stone and lichen; the tangly ram brambles and nettles; the muddy snail caked in mud. (The fern forest's was already right.)
- **Each area's own tufts**: an area's `tufts` (its mix, saturation, value, flower colour) and `tone` (its props' leaves): dark heather and moss on the moor, needles and fern in the fern forest, pebbles on the shrine, litter in the muddy and wispy forests, long grass in the tangle.
- **Clumps**: the set sheet now puts the small objects and trees in clumps of 3 to 5.
- **Big legends' contour lines** are left alone this pass (a stage-4 item).

Per area:
- **Moor (badger)**: a wide, high-contrast white blaze (`head.blaze`) with near-black eye bands; its legend's crystals are grey standing stones with a moonlit rune on each face (`coat.crystalStone`); low, wide cairns (`cairn` `squat`); one real pool (`water` `d`, its depth).
- **Fern forest (boar)**: three bold pale stripes on the piglet only; short, hooked legend tusks (`head.tuskHook`, `tuskLegend`); ferns lower. (The "palm trees with trunks" in the set are Ed's set piece, the ring of giant tree ferns round a stone basin.)
- **Muddy forest (snail)**: the broken trunks about the witch's height (props now take `scale`); the many-trunked sycamore leads (55%, three trunks), alders two-trunked.
- **Stone shrine (fox)**: the kitsune's seven tails fanned apart with gaps, each curving, pale at the tip with fox-fire over it (`coat.kitsune`); the legend's ears 1.45 times; the shrine 1.8 times, the henges 1.6, the boulders 1.6, the little stones 1.4.
- **Tangly forest (ram)**: a white fleece of curls (`coat.woolCurls`), near-black face and legs, horns that spiral out from the head (`hornTurns`, `hornOut`, `hornThick`, `hornRidges`) in their own dark horn colour and show from the young up (its `horns` size curve); bronze legend horns; the tangled branches 1.6 times.
- **Wispy forest (woodlouse)**: half the flecks; moonstone legend crystals (pale blue-white); the birches green-yellow with white trunks (`hueAbs`); the limes one colour, a little greener than v1's gold.

`tools/genome/compare.mjs` against `claude/prototype`: 1560 creature sprites, 0 differ; `art/check.mjs`'s flora baseline still matches, so every new number is opt-in.

## Batch 1, iteration 3 (the art director's notes on iteration 2; the last creature round before creature texture)

- **Kitsune (stone shrine)**: the tails rooted along the rump and swept up and back together like flames, overlapping, of different lengths, the outer ones lower and shorter, each tip flicking forward, the fox-fire kept (`coat.kitsune.flame`).
- **Badger (moor)**: a new face, `head.face: "badgerBands"`: two black bands from the nose through the eyes to the ears, true white between and below them (`BELLY` near white).
- **Moor**: cairns as irregular grey stones heaped low with a leaning slab or two (`cairn` `rough`, `grey`); round pools with irregular shores (`water` `round`).
- **Muddy forest**: six kinds of broken trunk and log in its small objects: heights, branch reach either way (`stump` `tall`, `branch`), a plain stump, a log and a fallen branch.
- **Wispy forest**: the limes muted towards old gold (an area's own colour for its main species).
- **Fern forest**: the boar lifted off the needles by value, its bristle ridge a paler grizzle (`coat.ridgeMat`); no piglet stripes (at about 10 px they can't read); the ferns low and dark.
- **Tangly forest**: the brambles doubled in size and count, a big tangle's strands thicker and arching (bramble `scale` over 2).

Creatures pause here for the creature generator's surface texture (art builder 2); the plants, tufts, clumps and set pieces carry on.
