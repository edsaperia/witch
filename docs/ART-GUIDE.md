# Witch art guide

A living style guide for everything the generators make: creatures, plants, witches, props, ground and set pieces. It is distilled from the art director's reviews, so each rule says where it came from. **Builders read it before each batch.** The art director adds to it after every review that teaches something.

Ed's direction (2026-10-05): everything will eventually come from generators, aiming at 100+ area types, so "we should make good and flexible tools now, and learn as much as we can about what looks good." There is no hurry; the best artwork wins. The roadmap is #119.

Sources: #97 (art iterations; `docs/art-iterations/README.md` on its branch), #112 (art pass batch 1 notes), and later reviews as they come.

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
- **From the treetops only crowns and glows show.** Each area's canopy must differ from its neighbours' by shape and value, not only hue (`crownStats` in `art/trees.js`). Glowing parts are the main thing seen at night from above, so place them deliberately (#97: the cave-mouth glowcaps were the most legible thing in the treetop shot).

## 3. Palette rules

- **One leaf colour per area.** Tree-to-tree hue jitter puts one yellow or orange tree in a green area, and it reads as autumn or as a mistake (#97 glade beech and wetland willow; #112 wispy, fern and tangly forests). Set the main species' `colour.variety` to about 0.3. Get variety from value and crown shape, not hue.
- **An area's leaf hue sits between about .24 and .34** unless the brief asks for autumn or dead leaves. Area leaf hues near .20 came out yellow-autumnal (#97 wetland). Minor species must not inherit an area's dry-leaf hue: #112's birch saplings turned orange on the wispy forest's dry-leaf floor. Give them their own `hueAbs` or hue shift.
- **Legends glow in their species' colour, not the style's.** The style's shared magic hue made every legend's glow mint and violet whatever the animal (#97). Set `palette.over.MAGIC` and `MAGIC2` per species. The glow should come from the area's story: lichen gold for the ancient stag, moonstone for the woodlouse, fox-fire for the kitsune, cold cyan in a cave.
- **The glow must contrast with the body by value and hue.** Gold horns on a cream ram vanished (#112). On a pale body, use a darker or more saturated glow (bronze, dark gold); on a dark body, use a pale glow.
- **Coats: value first, then hue.** The game is played at night, so a creature must separate from its floor by value. Dark creatures (bat, spider, mole) go darker than their floor; pale ones (ram, stoat) go paler. A creature that is the floor's value and hue disappears in the game, even if the sheet looks fine.
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
| Contour banding on big legends | #112 | The 3D bake's shading terraces at large size | Waits for the generator's next stage (Ed) |
| In-game shots too dark | #97, #112 | Night lighting at ground level | Judge colour on sheets; a lit review mode is proposed |

## 8. Checks that a machine could do (proposals for art/check.mjs)

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
