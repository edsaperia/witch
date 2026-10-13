# Animal review sheets (India, 2026-10-13)

One sheet per zoo row (`config/zoo.json`, top to bottom, cold to hot), made from `claude/prototype` at 35a12ef (after #859). Each species is one line: the witch for scale, then baby, young, adult and legend at game size (x3 art pixels), then the adult at x8; under it the species, its area, its builder (`quad3d` or a one-off builder), how its legend is made (the elder kit in creatures3d.js, an `elder` from elders.js, the evolution kit's legend level, or the old generic legend feature) and the adult's height over the witch's. Open issues already known are flagged in red on the line: the growth check's WARN steps (a level under 0.20 of silhouette from the level before, scaled to one box, i.e. mostly a bigger copy), the stegosaurus's head (Ed: reads bear), the lion, bear and stag's pale lower jaw, the stoat and bear elders, and the otter (floats here; stands in Golf's #861). Lit with the preview tools' even studio light (so colours read a little warm, as on every other sheet), not the game's night.

The stegosaurus is not on prototype: its line is rendered from `claude/stegosaurus` (#846) on sheet 12.

| # | Sheet | Species |
|---|---|---|
| 1 | [Cold](01-cold.png) | Penguin, Arctic fox, Polar bear, Frost troll |
| 2 | [Mountains & glaciers](02-mountains-glaciers.png) | Red panda, Ibex, Snow leopard, Frost wyrm, Griffin |
| 3 | [Cold rainforest](03-cold-rainforest.png) | Flying squirrel, Raccoon, Roe deer, Unicorn |
| 4 | [Temperate woodland](04-temperate-woodland.png) | Dormouse, Hedgehog, Stoat, Squirrel, Hare, Fox, Wolf, Badger, Stag |
| 5 | [Temperate deep woods](05-temperate-deep-woods.png) | Snail, Mole, Spider, Snake, Pine marten, Raven, Ram, Bear |
| 6 | [Temperate wetland](06-temperate-wetland.png) | Newt, Toad, Otter, Heron, Beaver, Elk |
| 7 | [Temperate open & rocky](07-temperate-open-rocky.png) | Moth, Woodlouse, Bat, Salamander, Stag beetle, Wildcat, Owl, Lynx, Boar |
| 8 | [Badlands & rocky](08-badlands-rocky.png) | Scorpion, Rattlesnake, Armadillo, Meerkat, Komodo dragon |
| 9 | [Hot](09-hot.png) | Fennec fox, Cheetah, Rhino, Lion |
| 10 | [Jungle](10-jungle.png) | Black jaguar, Tiger, Elephant |
| 11 | [Mangrove swamp](11-mangrove-swamp.png) | Crab, Dragonfly, Crocodile |
| 12 | [Volcanic (#846, not merged)](12-volcanic-846-not-merged.png) | Stegosaurus |

## Each species: what I'd change

One line each; "nothing" means the line reads and I'd leave it. The numbers in brackets are the growth check's steps.

### Cold

- **Penguin** (`penguin`, rookery, penguin3d (one-off), legend: evolution kit, adult 1.24x the witch): nothing: reads at every level; the legend's cloak of rock suits it.
- **Arctic fox** (`arcticfox`, snowfield, quad3d, legend: evolution kit, adult 1.71x the witch) · ⚠ growth WARN: young→adult 0.15: the young is a smaller adult (0.15): a rounder, shorter-muzzled young with bigger ears; the adult's coat is nearly white under the studio light, check it in the snow at night.
- **Polar bear** (`polarbear`, packice, quad3d, legend: elder kit, adult 3.11x the witch) · ⚠ growth WARN: adult→legend 0.12: the adult still reads as a loaf despite its profile: a longer neck, the head lower and smaller, a higher shoulder; the legend (0.12) is the adult plus icicles: an elder of its own (worn, scarred, a crown of ice).
- **Frost troll** (`frosttroll`, trollwood, troll3d (one-off), legend: evolution kit, adult 2.51x the witch) · ⚠ growth WARN: baby→young 0.18, young→adult 0.19, adult→legend 0.13: nothing on the shape; its three steps are small (0.18/0.19/0.13), so each level could add something (the young's first tusks, the adult's moss).

### Mountains & glaciers

- **Red panda** (`redpanda`, misty-terraces, quad3d, legend: evolution kit, adult 1.53x the witch): nothing: the ringed tail carries it; the legend could show more age (grizzle, a wreath).
- **Ibex** (`ibex`, crags, quad3d, legend: evolution kit, adult 2.31x the witch): nothing: the horns grow well by level; the legend's moss skirt reads.
- **Snow leopard** (`snowleopard`, icefall, quad3d, legend: evolution kit, adult 2.13x the witch) · ⚠ growth WARN: young→adult 0.12: the adult's legs are short and the tail thin (0.12 young to adult): longer legs, a thicker tail, bigger paws.
- **Frost wyrm** (`frostwyrm`, frostcave, quad3d, legend: evolution kit, adult 3.51x the witch): nothing; one of the best lines.
- **Griffin** (`griffin`, eyrie, quad3d, legend: evolution kit, adult 3.73x the witch): nothing: wings, beak and claws all grow; the legend is huge (3.73x the witch adult) but earns it.

### Cold rainforest

- **Flying squirrel** (`flyingsquirrel`, mistwood, quad3d, legend: evolution kit, adult 1.24x the witch) · ⚠ growth WARN: young→adult 0.14, adult→legend 0.12: the levels are scaled copies (0.14/0.12): the young with a smaller patagium, the legend with a glow along the membrane; otherwise fine.
- **Raccoon** (`raccoon`, mossy-creek, quad3d, legend: elder (elders.js), adult 1.53x the witch): nothing on the adult; its elder (elders.js) wears the rings and beads well.
- **Roe deer** (`roe`, mossy-dell, quad3d, legend: evolution kit, adult 2.51x the witch): nothing: antlers by level, a clean deer shape.
- **Unicorn** (`unicorn`, moonpool-glade, quad3d, legend: evolution kit, adult 3.38x the witch) · ⚠ growth WARN: young→adult 0.14, adult→legend 0.16: the adult reads loaf-and-stumps (0.14/0.16): longer legs, a longer neck, a proper horse head; the legend's horn glow helps but the body is the same.

### Temperate woodland

- **Dormouse** (`dormouse`, honeysuckle-tangle, quad3d, legend: elder (elders.js), adult 0.93x the witch): nothing; tiny by design (0.93x the witch).
- **Hedgehog** (`hedgehog`, hazel-forest, hedgehog3d (one-off), legend: elder (elders.js), adult 1.51x the witch) · ⚠ growth WARN: baby→young 0.12, young→adult 0.09: its levels are scaled copies (0.12/0.09): a baby with soft short spines, a young half-spined; the legend's mushroom crown is good.
- **Stoat** (`stoat`, alder-forest, quad3d, legend: generic (ribbons, mane), adult 1.20x the witch) · ⚠ legend: no elder yet (the generic ribbons and mane); growth WARN: young→adult 0.09: an elder: it is the last quadruped on the generic ribbons-and-mane legend; its young is a scaled adult too (0.09).
- **Squirrel** (`squirrel`, twiggy-forest, quad3d, legend: elder (elders.js), adult 1.38x the witch) · ⚠ growth WARN: young→adult 0.12: nothing but the young (0.12): a shorter tail on the young.
- **Hare** (`hare`, bluebell-glade, quad3d, legend: elder (elders.js), adult 1.80x the witch): nothing: the lantern-moon elder reads.
- **Fox** (`fox`, old-oaks, quad3d, legend: elder kit, adult 2.00x the witch): nothing; the elder kit's nine-tailed fan is the model for the others.
- **Wolf** (`wolf`, garden, quad3d, legend: elder kit, adult 3.00x the witch): nothing; the spiky mane and torc read at game size.
- **Badger** (`badger`, wispy-forest, quad3d, legend: elder (elders.js), adult 1.38x the witch): the adult is still a sausage: give it the profile (broad shoulders, a waist) and a lower, wedge head; the elder's spiral and basket are fine.
- **Stag** (`stag`, ancient, quad3d, legend: evolution kit, adult 3.24x the witch) · ⚠ pale lower jaw: tone the pale lower jaw to the coat; the legend's antlers are 2.5x its body height (a 932 px sprite): cap them at about 1.5x, or lean them back.

### Temperate deep woods

- **Snail** (`snail`, muddy-forest, snail3d (one-off), legend: elder (elders.js), adult 1.13x the witch): nothing: the starry elder shell is lovely.
- **Mole** (`mole`, fern-forest, mole3d (one-off), legend: elder (elders.js), adult 1.38x the witch): nothing: the legend as a mound with offerings is the right idea.
- **Spider** (`spider`, holly-thicket, spider3d (one-off), legend: generic (rose), adult 1.24x the witch): nothing on the body; the legend's rose web reads.
- **Snake** (`snake`, norway, snake3d (one-off), legend: generic (shed), adult 1.13x the witch) · ⚠ growth WARN: baby→young 0.11, young→adult 0.13: the baby and young are copies (0.11/0.13): a bigger head on the baby, a pattern that comes in with age.
- **Pine marten** (`marten`, old-pinewood, quad3d, legend: elder (elders.js), adult 1.71x the witch) · ⚠ growth WARN: young→adult 0.15, adult→legend 0.13: its steps are small (0.15/0.13): a fluffier tail with age; the shield elder is fine.
- **Raven** (`raven`, deadwood, raven3d (one-off), legend: generic (hoard), adult 1.87x the witch) · ⚠ growth WARN: baby→young 0.09, young→adult 0.15: the baby is a copy (0.09): a fledgling with down and a stub tail; the hoard legend reads.
- **Ram** (`ram`, tangly-forest, quad3d, legend: elder kit, adult 2.38x the witch): nothing; the elder's bramble fleece reads.
- **Bear** (`bear`, berry-thicket, quad3d, legend: elder kit, adult 3.11x the witch) · ⚠ pale lower jaw; legend: no elder yet (a scaled adult); growth WARN: adult→legend 0.12: tone the pale lower jaw; the legend is the adult with claws and scars (0.12): an elder (grizzle, a worn hide, a torc, moss); a bigger hump on the adult.

### Temperate wetland

- **Newt** (`newt`, fen, quad3d, legend: evolution kit, adult 1.00x the witch) · ⚠ growth WARN: young→adult 0.11: the young is a copy (0.11): the crest coming in by level; otherwise fine.
- **Toad** (`toad`, wetland, toad3d (one-off), legend: generic (sac), adult 1.38x the witch): nothing: the sac legend reads.
- **Otter** (`otter`, stream, quad3d, legend: evolution kit, adult 1.13x the witch) · ⚠ legend floats on its back here; stands in Golf's #861: take Golf's #861 (it stands); then its line is fine.
- **Heron** (`heron`, heronry, heron3d (one-off), legend: generic (stilts), adult 3.11x the witch) · ⚠ growth WARN: baby→young 0.19, young→adult 0.19: its young and adult are copies (0.19/0.19): the plumes coming in with age; the stilts legend on its disc is odd at game size: a taller bird with a lantern would read better.
- **Beaver** (`beaver`, beaver-pond, quad3d, legend: evolution kit, adult 1.64x the witch): nothing: the legend's branch tells its story.
- **Elk** (`elk`, bog, quad3d, legend: evolution kit, adult 3.51x the witch): nothing: the antlers grow and the legend's glow.

### Temperate open & rocky

- **Moth** (`moth`, heath, moth3d (one-off), legend: generic (eyespots), adult 1.24x the witch): nothing: the eyespot legend reads.
- **Woodlouse** (`woodlouse`, moor, woodlouse3d (one-off), legend: evolution kit, adult 1.00x the witch): nothing.
- **Bat** (`bat`, cave-mouth, bat3d (one-off), legend: generic (sonar), adult 1.38x the witch): nothing: the sonar rings read.
- **Salamander** (`salamander`, ravine, quad3d, legend: evolution kit, adult 1.00x the witch) · ⚠ growth WARN: young→adult 0.12, adult→legend 0.12: its adult and legend are copies (0.12/0.12): a thicker tail and a fire crest on the legend only.
- **Stag beetle** (`beetle`, log-pile, beetle3d (one-off), legend: generic (antlers), adult 1.24x the witch): nothing; the antlers scale.
- **Wildcat** (`cat`, meadow, quad3d, legend: evolution kit, adult 1.73x the witch): nothing since its growth batch; stripes read at game size.
- **Owl** (`owl`, stone-shrine, owl3d (one-off), legend: evolution kit, adult 2.38x the witch): nothing (baby to young at 0.20 is the line); the horned legend reads.
- **Lynx** (`lynx`, rocky-slope, quad3d, legend: evolution kit, adult 2.71x the witch): nothing since its growth batch: ear tufts and profile read.
- **Boar** (`boar`, grassland, quad3d, legend: elder kit, adult 2.64x the witch): nothing; the tusks and hump grow by level, and the legend's stones read.

### Badlands & rocky

- **Scorpion** (`scorpion`, red-canyon, scorpion3d (one-off), legend: evolution kit, adult 1.13x the witch): nothing.
- **Rattlesnake** (`rattlesnake`, cactus-flats, rattlesnake3d (one-off), legend: evolution kit, adult 1.24x the witch): nothing: the coiled legend with its rattle reads.
- **Armadillo** (`armadillo`, scrub-wash, armadillo3d (one-off), legend: elder (elders.js), adult 1.24x the witch) · ⚠ growth WARN: baby→young 0.14, young→adult 0.15: the baby and young are copies (0.14/0.15): a softer baby shell; the rolled-ball legend is a good idea.
- **Meerkat** (`meerkat`, warren, quad3d, legend: elder (elders.js), adult 2.00x the witch): nothing: the sentinel idle sells it; the elder's necklace reads.
- **Komodo dragon** (`komodo`, dragon-scrub, quad3d, legend: elder kit, adult 1.53x the witch) · ⚠ growth WARN: young→adult 0.17, adult→legend 0.11: the young and the legend are near copies (0.17/0.11): a longer, heavier head and a dewlap on the adult; more on the elder (a crown of spines).

### Hot

- **Fennec fox** (`fennec`, erg, quad3d, legend: evolution kit, adult 1.53x the witch): nothing: the ears carry it.
- **Cheetah** (`cheetah`, plains, quad3d, legend: evolution kit, adult 3.51x the witch): nothing since its growth batch; the deep chest and waist show.
- **Rhino** (`rhino`, bushveld, quad3d, legend: elder kit, adult 2.87x the witch) · ⚠ growth WARN: young→adult 0.12: the young is a copy (0.12) and the horn is tiny on every level: a real horn that grows by level, the head lower; the body reads heavy, which is right.
- **Lion** (`lion`, savanna, quad3d, legend: evolution kit, adult 3.38x the witch) · ⚠ pale lower jaw: tone the pale lower jaw; otherwise the mane and the profile read.

### Jungle

- **Black jaguar** (`jaguar`, river-jungle, quad3d, legend: evolution kit, adult 2.38x the witch): nothing: black with rosettes that only show in the light, as asked.
- **Tiger** (`tiger`, bamboo-jungle, quad3d, legend: evolution kit, adult 2.87x the witch): nothing; the stripes and ruff read.
- **Elephant** (`elephant`, temple-jungle, quad3d, legend: elder kit, adult 5.00x the witch): nothing: the trunk, ears and tusks read, and the elder's temple cloth is the best legend on the sheets.

### Mangrove swamp

- **Crab** (`crab`, mudflat, crab3d (one-off), legend: evolution kit, adult 1.13x the witch) · ⚠ growth WARN: baby→young 0.13, young→adult 0.15: the baby and young are copies (0.13/0.15): claws growing with age.
- **Dragonfly** (`dragonfly`, mangrove-pools, dragonfly3d (one-off), legend: evolution kit, adult 1.24x the witch): nothing.
- **Crocodile** (`crocodile`, mangrove, quad3d, legend: elder kit, adult 1.73x the witch) · ⚠ growth WARN: young→adult 0.13: the adult reads as a log with legs (0.13): a wider, flatter head with the jaw line showing, legs out to the sides; the standing-stone elder is good.

### Volcanic (#846, not merged)

- **Stegosaurus** (`stegosaurus`, cinder-slopes, quad3d, legend: evolution kit, adult 3.40x the witch) · ⚠ head reads bear (Ed); #846 not merged; growth WARN: young→adult 0.18, adult→legend 0.17: the head reads bear (Ed): a smaller, lower, beaked head on a longer neck; the legend's plates fuse into one dark mass at game size: space them and keep the glow lines.

## Summary

- 60 species on prototype plus the stegosaurus; 41 on `quad3d`, 20 one-off builders.
- Legends: 10 on the elder kit, 11 on elders.js, 31 on the evolution kit, 9 still on the old generic feature (stoat, spider, snake, raven, toad, heron, moth, bat, stag beetle). The stoat is the only quadruped left there.
- Growth WARNs (22 species): most are one-off builders whose levels are scaled copies (hedgehog, snake, raven, crab, armadillo, heron, frost troll), and quadrupeds whose young is the adult smaller (arctic fox, snow leopard, unicorn, stoat, squirrel, marten, newt, salamander, rhino, crocodile, komodo, flying squirrel) or whose legend is the adult plus a feature (bear, polar bear, salamander, komodo, flying squirrel, unicorn, marten). A second growth batch through the profile's level overrides would take the quadrupeds; the one-offs need their builders to read the level.
- The three things I'd do first: the bear and stoat elders, the pale lower jaws (lion, bear, stag: the jaw's material to the coat's shade), and the loaf bodies that the profile hasn't reached (badger, polar bear, unicorn, crocodile, rhino).

Made by `review-sheets.mjs` (in my session's scratchpad; it reads `config/zoo.json`, renders through `art/preview.mjs`'s path with `art/lighting.js`'s studio light, and takes the growth steps from `art/check.mjs`'s measure). `meta.json` holds every line's data.
