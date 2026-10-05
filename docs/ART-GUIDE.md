# Witch art guide

A living style guide for everything the generators make: creatures, plants, witches, props, ground and set pieces. It is distilled from the art director's reviews, so each rule says where it came from. **Builders read it before each batch.** The art director adds to it after every review that teaches something.

Ed's direction (2026-10-05): everything will eventually come from generators, aiming at 100+ area types, so "we should make good and flexible tools now, and learn as much as we can about what looks good." There is no hurry; the best artwork wins. The roadmap is #119.

Sources: #97 (art iterations; `docs/art-iterations/README.md` on its branch), #112 (art pass batch 1: iteration 1 and 2 notes), and later reviews as they come.

## 0. Pixel-art style (Ed, 2026-10-05: "everything should look a bit more pixel-art stylised")

Ed's main art feedback at this stage. Earlier, about the legends, he said "the more pixellated version is better". This section turns that into rules a generator can enforce. They apply to everything: creatures, plants, witches, props, ground and set pieces.

**The ladder.** `tools/art-iterations/ladder.mjs <area> <dir>` draws one area's set at the current look and at each rung below, at the game's screen scale and at night. The examples are in `docs/art-guide/ladder/`. Ed picks the rung. Until he does, the rules below are a proposal and are marked (proposed).

| Rung | What changes |
|---|---|
| 0 Now | The light in the style's 3 value bands, with a checker dither where bands meet; the dark outline |
| 1 Clean | The same bands, no dither, lone pixels merged into their neighbours |
| 2 Stylised | 3 hue-shifted tones per material and a selective outline |
| 3 Bold | Rung 2 with clusters: light bands follow a 3 × 3 majority, so tones form clusters and not noise |
| 4 Chunky | Rung 3 at art pixel 4 (now 3): fewer, bigger pixels |
| 5 Chunkier | Rung 3 at art pixel 5 |
| 6 Reference | Ed's reference look (below): one tone family, cream light falling as a big shape over the top, red-brown shadow, a strong near-black outline, interior lines where parts overlap, clean clusters, pixel 4 |

**Ed's decision (2026-10-05):** "4 or 5, but we will decide in playtesting", then "6 is also good". Two looks stay in the running, **Bold** (rung 3's treatment) and **Reference** (rung 6), each at **art pixel 4 or 5**. The final choice is made in playtesting, with a complete scene in motion ("trees, creatures, witch").
- **In the game:** `?style=now|bold|ref` and `?px=3|4|5` choose one per load (`art/stylise.js`, applied in `bake`: the live preview PR, branch `claude/art-style-preview`). With neither, the game looks as it did. The generators' own version of the styles will keep these switch names.
- **Either way the rest of the reference stands:** exaggerated silhouettes, an evolved design per level (0b), and texture as tone shapes.
- **Until Ed decides,** the rules below hold for both looks except where marked bold-only or ref-only.

### Ed's reference: "three evolutions of a boar" (2026-10-05)
The reference is someone else's work, so it's described in words only and never committed or fetched. **This is the target look.**
- **Baby:** a small, round, stubby piglet. Almost a ball with short legs, a tiny tail and small ears, and a few darker bands on its back.
- **Adult:** a stocky boar with a big shoulder hump and a heavy front. Short legs, dark hooves, its head low, a pale snout, two big curved white tusks, a small upright ear, a tufted tail curling up, and dark bristles along the spine.
- **Legend:** massive and top-heavy, head down as if about to charge, with enormous white tusks sweeping up and curling round past its head. Pale flame-like wisps rise from the tusk tips. A dark shaggy bristle mane runs along the spine and under the belly. It looms, far bigger than the adult.

**What it teaches** (these are the style's principles):
1. **A strictly limited palette.** Each sprite uses about 4–5 tones of one colour family:
   - a pale cream highlight;
   - a mid tone;
   - a deeper tone;
   - a red-brown (for cool colours, blue-violet) shadow;
   - plus near-black for the outline and hooves, and white for tusks, horns and teeth.
2. **Flat cel shading in big shapes.** The light falls as a big pale shape across the top of the back and shoulders, and the shadow is a bold, deliberate shape underneath. Each tone change is a hard edge, with no gradients and no dither.
3. **A strong dark outline all round,** and interior lines picking out the legs, jaw, ear and tusks where one part sits in front of another. (This is stronger than the selective outline of rung 2. The reference wins.)
4. **Surface texture is tone shapes, not noise.** The light on the back, the jagged dark edge of a bristle mane, a few bands on a piglet. Never fine fur speckle spread over the body.
5. **Exaggerate the silhouette.** The shoulder hump, the tusks and a head-down posture are pushed hard so the sprite reads instantly at small size. Each species' key feature (section 2) is drawn bigger than life.
6. **Each level is a different design, not a scaled copy:**
   - the baby is round and simple;
   - the adult is heavy-fronted;
   - the legend is a hulking, monstrous version with a magical flourish (flame wisps).

   Ed has said awake legend redesigns come later, but this is the bar they're measured against.
7. **The overall feel** is a classic handheld-monster-game sprite: chunky, bold, readable.

The ladder's rung 6 shows only the rendering half: palette, cel, outline and clusters. Exaggerated shapes and the redesigned stages need generator work: the creature genome's proportions and size curves, the texture work, and later the legend redesign.

### The rules (proposed until Ed picks)
1. **One art-pixel size for everything.** Every asset is drawn at the same art pixel (style `pixel`; the tuning's `pixelSize`) and displayed at a whole multiple, never resampled. Nothing is drawn at half resolution or scaled by a fraction. Mixed resolutions are the clearest sign of "not pixel art". Check: every sprite is baked at the style's `pixel`, and the renderer draws sprites at whole-pixel scale.
2. **3 tones per material, hue-shifted.** A material's ramp has 3 tones:
   - **shadow:** a deeper, more saturated tone, leaning red-brown for warm materials and blue-violet for cool ones, about half the base value;
   - **base:** the material's colour;
   - **light:** a pale cream (hue towards yellow, much less saturated, brighter), falling as a big shape over the top of each form.

   Not a darker and lighter version of one hue. Glowing materials keep their own flat colour. Check: each material in a baked sprite uses 3 colours at most (outline excluded), and the shadow tone's hue is cooler than the light tone's.
3. **No soft edges.** No smooth gradients, no anti-aliasing and no partial alpha. Light comes in whole bands. Check: every sprite pixel's alpha is 0, 254 (glow) or 255, and no material shows more than its 3 tones.
4. **Clusters, not noise.** Every tone sits in a cluster of 2 or more pixels. No lone pixel differs from all four neighbours (the witch already has a fleck check; extend it). Leaf stamps, fur and bark are drawn as clusters of 2 × 2 or more at the game's scale. Check: the share of lone pixels per sprite is under about 1%, extending the fleck check to every asset.
5. **The outline.** Ref: a strong near-black outline with interior lines. Bold: a selective outline in each part's own dark tone, broken on the lit upper left. The rest of this rule describes ref. **A strong outline with interior lines** (from Ed's reference). The whole shape gets a near-black outline, and interior lines run where one part sits in front of another: a near leg over the body, the jaw, an ear, the tusks. Not on markings. (A selective outline in each part's own dark tone, broken on the lit side, is rung 2's softer alternative.) Check: the outline is darker than every fill beside it, and interior lines sit only on surface turns, not colour changes.
6. **Shape first, detail second.** Simplify forms and exaggerate the one key feature (the antlers, the blaze, the tusks, the shell); see section 2. At pixel 4 there is less room, so simplify again: fewer tines, a bolder blaze, fewer and bigger leaf clumps.
7. **One light.** Light comes from the upper left and a little in front, as the bake does now (`[-0.45, -0.75, 0.5]`). Highlights are crisp clusters on the upper-left of each form, not speckles. The game's lights (fire, neon, the moon) add on top, but the baked tones always assume that one direction.
8. **Dither only on purpose.** No automatic checker at band edges. Dither is allowed only as a texture a material asks for (moss, gravel), in a fixed pattern.

### What it takes in the generators
- **Creatures (art builder 2's texture work):** a cel pass in the bake (3 hue-shifted tones per material from the palette row), a cluster pass, and a selective outline. The palette row grows from one colour per material to 3 tones per material. `art/genome/palette.js` holds it and the sprite shader reads it, so the hue shift is data and not code.
- **Plants (art builder 1):** bigger leaf stamps (at least 2 × 2 at the game's scale), blobs lit in 3 hue-shifted tones, and no per-pixel jitter in the leaf shading. The cluster pass can't merge stamp noise, because the stamps use three leaf materials. The stamps themselves must be bigger and fewer.
- **Props, ground and set pieces:** the same bake pass, and flat ground tiles in 3 tones with deliberate texture clusters.
- **The game's shader:** today it bands the light with a checker dither. Under rung 2 and above, the bands come from the baked tones and the shader only adds coloured light, without re-banding.

## 0b. Each level is an evolution, not a scaled copy (Ed, 2026-10-05)

"I would emphasise the exaggerated silhouettes and the evolved design per stage (not just being larger) - the creatures, especially adult and legendary, can be quite fantastic with lots of details; not just 'large versions of the creature'."

- **Every level gains new features and pushes its silhouette.** For example:
  - the baby is round and simple;
  - the young is lean;
  - the adult is heavy, with its key feature pushed hard (a hump, horns, a mane);
  - the legend is fantastic: extra or reshaped horns and tusks, manes, crests, armour, spines, glowing markings, tail flourishes, and elemental wisps of its area.
- **The species stays readable at every level**, and the legend carries its area's story.
- **The briefs** for the batch 1 species, plus wolf and owl, are in `docs/art-guide/EVOLUTIONS.md`.
- **What the generator must support:**
  - per-level genome changes (a `levels` patch and per-level `features`; a first opt-in version is in `quad3d`);
  - a parts kit by socket with size curves by level;
  - area-tied flourishes as parts;
  - posture per level that keeps the face readable;
  - markings per level as parts.
- **Check:** at each level step, a species' silhouette should differ from the previous level scaled to the same height, by a minimum distance (the silhouette check, applied within a species).

## 1. Review an area as a set

- **Judge an area as one picture.** Look at its creature at every level, its trees and props, its sleeping legend and the witch together. Use the set sheet (`tools/art-iterations/sheets.mjs`) and both in-game views (ground and treetops). A creature that looks good alone can still clash with its trees, and a tree can read well in isolation but turn neon in a clump.
- **Compare against the "before", not absolutely.** The preview sheets use a warm studio light that pushes everything yellow (#97). In-game shots are at night, so they are honest about mood but too dark to judge colour at ground level. Judge colour and shape on the sheets, and judge mood and density in the game.
- **Go back to Ed's brief.** It's in `art/areas.js` `text`: floor, wall, small, big, set piece. Every area should make its brief obvious from one crop. If you can't name the area from the set sheet, it fails.

## 2. What reads at each size

At ground level a young creature is about 45 px tall and the witch about 50 px. From the treetops everything is about 2.6 times smaller, so crowns are what show.

- **One silhouette cue per species, kept big.** Name the one thing that makes the species and protect it at every level:
  - the badger's white face blaze;
  - the stag's antlers;
  - the boar's bristle ridge;
  - the snail's spiral shell;
  - the spider's long high knees;
  - the woodlouse's plates.

  If that cue isn't readable at young size (about 45 px), the species fails. It failed for the badger blaze in #112 v1, and for the ram's horns, which are invisible below legend size.
- **Small markings vanish.** Piglet stripes, fine fur flecks and four-finger bat wings don't survive at 30–45 px (#112, #97). A marking needs 2 px or more of width and a value contrast of about 0.3 or more to show. Otherwise drop it, or save it for adult and legend.
- **Patterns that read as something else are worse than none.** In #97 and #112:
  - bands on a spider read as a bee;
  - heavy flecks on a woodlouse read as camouflage print;
  - lengthwise ribs on a legend read as fins or crystals.

  Ask what the marking looks like to someone who doesn't know the species.
- **Thin flat planes fail face-on.** A bat seen from the front is a stick, and from behind its wings are rectangles (#97). Wing-like parts need thickness or a per-facing pose.
- **Fans of identical parts read as hands.** The many-tailed fox, a crest of spikes and a back of crystals all read as a fan of fingers (#112 fox legend; #97 crystal stag). Vary length and curve, and leave gaps between parts.
- **Rounded tips read as fingertips.** Tails, flames, spikes and fronds that end in round blobs read as a gloved hand, even when bundled (#112 v3 kitsune). Taper them to points that flick, and put any glow on the point.
- **Parts from one root read as spokes.** Separated but evenly splayed from a single point, the kitsune's tails read as a starburst or an octopus (#112 v2). Spread the roots along the body and sweep the parts in one shared direction, overlapping, with uneven lengths.
- **From the treetops only crowns and glows show.** Each area's canopy must differ from its neighbours' by shape and value, not only hue (`crownStats` in `art/trees.js`). Glowing parts are the main thing seen at night from above, so place them deliberately (#97: the cave-mouth glowcaps were the most legible thing in the treetop shot).

## 3. Palette rules

- **One leaf colour per area.** Tree-to-tree hue jitter puts one yellow or orange tree in a green area, and it reads as autumn or as a mistake (#97 glade beech and wetland willow; #112 wispy, fern and tangly forests). Set the main species' `colour.variety` to about 0.3. Get variety from value and crown shape, not hue.
- **An area's leaf hue sits between about .24 and .34** unless the brief asks for autumn or dead leaves. Area leaf hues near .20 came out yellow-autumnal (#97 wetland). Minor species must not inherit an area's dry-leaf hue: #112's birch saplings turned orange on the wispy forest's dry-leaf floor. Give them their own `hueAbs` or hue shift.
- **Legends glow in their species' colour, not the style's.** The style's shared magic hue made every legend's glow mint and violet whatever the animal (#97). Set `palette.over.MAGIC` and `MAGIC2` per species. The glow should come from the area's story: lichen gold for the ancient stag, moonstone for the woodlouse, fox-fire for the kitsune, cold cyan in a cave.
- **The glow must contrast with the body by value and hue.** Gold horns on a cream ram vanished (#112). On a pale body, use a darker or more saturated glow (bronze, dark gold); on a dark body, use a pale glow.
- **Coats: value first, then hue.** The game is played at night, so a creature must separate from its floor by value. Dark creatures (bat, spider, mole) go darker than their floor; pale ones (ram, stoat) go paler. A creature that is the floor's value and hue disappears in the game, even if the sheet looks fine. This was confirmed in game: #112 v2's dark brown boars on dark needles showed only their tusks. If the coat must stay dark, give it a paler ridge, back or blaze.
- **Whites must be white.** A blaze, a fleece or a rump patch in the cream belly colour reads as yellow at game size (#112 badger, ram v1). Use `palette.over` to set near-white.
- **Saturated yellow-green crowns read as glowing.** An autumn or dry-leaf area wants old gold at moderate saturation, not lime (#112 v2 wispy forest limes).
- **Natural colours come from the real animal, but saturation stays moderate.** For example: a red deer's coat, a natterjack's green with its pale stripe, a garden spider's chestnut with a cream cross. Fully saturated oranges and yellows read as toys (#97 "before" stag; #112 ram).
- **Colour per material, not one ramp.** A species' whole ramp derives from one hue. Use `palette.over` for parts that differ in nature: membranes, dark legs, horns, caps and the glow.

## 4. Silhouette rules

- **Every species passes the silhouette check** (`art/genome/silhouette.js`, 0.15). Aim for 0.2 or more against its own template's species. New species are screened with `tools/art-iterations/silhouettes.mjs`.
- **Proportion changes by level should read as growth, not scaling.**
  - Babies: a big head, big eyes and short legs (the size curves).
  - Adults: heavier, with bigger horns and antlers.
  - Legends: grand, plus one story feature.

  Per-level `form` values did this for the bat, toad, spider and glow-worm (#97).
- **The legend's feature must read at a glance and look grown, not glued on.** Lollipop trees on a back, flat-card wings and crystal fins all read as toys (#97, #112). Until features can be grown by the plant generator or come from a part pool, use fewer and bigger features that match the area.
- **Trees: each species owns a crown shape.** Examples: slanting and broad (ancient oak), a cone (holly), a column (aspen, alder carr), weeping (willow), umbrella (Scots pine), bare and twisted (snags). Don't build a cone from separate blobs: the blob generator turned a holly into topiary (#97).

## 5. Clumps and density

- **Thickets are clumps, not scatter.** Briefs that say "tangled", "many trunks", "thicket" or "wispy" need small objects and minor trees in clumps of 3 to 5, with gaps between clumps (#112). Scattered singles read as a park.
- **Small objects must be big enough to matter.** "Short trunks with broken branches" drawn as matchsticks don't read (#112 muddy forest). A small object is about knee- to witch-height. Tufts are for anything smaller.
- **Ferns are knee- to waist-high on the witch, with no trunk.** Tall ferns read as palm trees (#112 fern forest).
- **Tall set pieces and decor must be grey or brown stone and wood, not the grass colour.** The stone shrine and cairns in khaki read as pine cones or vanished (#112).
- **One prop repeated in lines reads as something manufactured.** Identical broken stumps in rows read as a battery of little cannons (#112 v2 muddy forest). Vary height, angle and mirroring, break up the spacing, and mix in a second kind.
- **Vary a prop's shape, not only where it stands.** One pool sprite three times, or one stump with a stick laid beside it, still reads as stamped (#112 v3). A prop generator should give each instance its own outline, and join parts that belong together (a broken branch to its stump).
- **Water keeps its value apart from its rim, in every style.** Under bold and ref, a pool's teal water shifts green and takes one band, so it merges with a moss rim and reads as a lawn (#142). Keep the water darker than its shore, and its glints glowing, so the stylisation leaves them alone.
- **Near-neutral greys drift warm under the key light.** A stone at 7% saturation looks blue-grey on the night sheet but khaki beside the grass by day (#142). Give a grey that must read as grey a little cool saturation, and judge it in play, not only on a sheet.
- **Stacked regular rings read as haystacks or beehives.** Cairns drawn as even rings in straw colour (#112 v2 moor) need irregular grey stones and a leaning slab.
- **Water edges are round and irregular.** Pointed lenses with hard edges read as boats or leaves (#112 v2 moor pools).
- **Every area gets its own tuft mix and value.** The same bright lime grass tuft in every area makes them all one place, and reads as neon on a dark floor (#112).

## 6. An area's materials carry into its creature and legend

- **A sleeping legend is made of its area.** It is sunk into that area's floor, mossed with its plants and weathered towards its stone, so each one is distinct:
  - moor: peat and standing stones;
  - fern forest: needles and fronds;
  - tangly forest: brambles;
  - stone shrine: grey stone and lichen;
  - muddy forest: mud.

  In #112 they were all one green lump with orange mushrooms.
- **The awake legend's glow and feature tell the same story.** Examples: the moor badger's standing stones with a moonlit rune glow, the ancient stag's back-forest and gold-lichen antlers, the cave bat's cold cyan.
- **The creature's coat should belong in its area's palette without matching the floor**, for example the slate badger on dark moss, or the chestnut spider among dark hollies.

## 7. Failures and why they failed

| What | Where | Why it failed | Fix |
|---|---|---|---|
| Lily-pad legend toad | #97 wetland v3 | A flat disc on the back reads as a saddle or table | Drop it; one feature at a time |
| Banded garden spider | #97 holly v2 | Bands read as a bee | A cross marking, which is the species' real cue |
| Blob-generator holly | #97 holly v2 | Blobs only at branch tips make topiary | Bespoke cone generator, or an envelope fill (flora part 4) |
| Knothole on a bare tree | #97 cave v2 | The mark lands in the top half and floats in the canopy | Keep marks with the wood in `splitTree` |
| Toy legend features | #97, #112 | Primitive spheres and cards, too regular | Fewer, bigger features matching the area; later, a part pool and baked plants |
| Kitsune tails as a fan | #112 fox | Identical parts in a fan read as fingers | Separate curved tails with gaps (Ed approved the kitsune) |
| Cream ram | #112 tangly | Same value as the gold glow, and reads as a lamb or pig | White fleece, dark face, legs and horns; bronze legend horns (Ed) |
| Lime tuft everywhere | #112 | One tuft for every area flattens them | Per-area tuft mix and value |
| Kitsune tails as spokes | #112 v2 fox | Evenly splayed from one root | Roots along the rump, swept together, uneven lengths |
| Broken stumps as cannons | #112 v2 muddy | One sprite repeated in rows | Vary size, angle and mirror; irregular spacing; mix kinds |
| Cairns as haystacks | #112 v2 moor | Even stacked rings in straw colour | Irregular grey stones, a leaning slab |
| Boar invisible in game | #112 v2 fern forest | Coat the same value as the floor | Lift the value, or a paler ridge |
| Ram, v2 (a success) | #112 v2 tangly | White fleece, black face and legs, dark horns: three values that never merge | The model for a strong creature read |
| Contour banding on big legends | #112 | The 3D bake's shading terraces at large size | Waits for the generator's next stage (Ed) |
| Pools as lawns, khaki stones | #142 bold/ref, day | Water's tone matched its moss rim; a low-saturation grey took the warm light | Water darker than its rim, glints glowing; cooler, lighter stone |
| In-game shots too dark | #97, #112 | Night lighting at ground level | Judge colour on sheets; a lit review mode is proposed |

## 8. Checks that a machine could do (proposals for art/check.mjs)

The pixel-art style's checks are listed with its rules in section 0.

These follow from the rules above. Each needs the art set (`artSet`) given to the check, so it runs on the default art and on every art set under review.

1. **Leaf-hue spread per area.** Across an area's tree variants, the spread of mean leaf hue is under about 0.04. This would have caught the one-yellow-tree failures.
2. **Leaf hue in range.** Each area's mean leaf hue is between .22 and .36, unless the area is flagged `autumn` or `dead`.
3. **Glow contrast.** For each legend, the value difference between the mean glow (MAGIC/MAGIC2) and the mean body is 0.25 or more, so gold on cream fails.
4. **Creature against floor.** At young level, the value difference between the mean body and the area's floor colour is 0.15 or more.
5. **Silhouette cue.** For species with a declared cue material (BELLY for the badger blaze, ACCENT for horns and antlers), that material covers at least about 3% of the young sprite.
6. **Small-object height.** Each area's small objects are at least 0.4 times the witch's height. Tufts are separate.
7. **Distinct sleeping legends.** No two sleeping legends' mean colours are within a small distance.
8. **Silhouette check on art sets.** Run the existing check on every art set under review, not only on the default art.

## 9. Witches (from Ed, 2026-10-05)

- Generated witches replace the party witches' outfits.
- Bigger brims and longer cloaks.
- Accessories both witchy and modern.
- Our own witch stays as she is unless Ed says otherwise. Every generated witch must read as a witch next to the 30 creatures: hat first, then broom.
