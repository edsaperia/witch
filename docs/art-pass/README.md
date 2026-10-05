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
