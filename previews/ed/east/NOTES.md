# East biome: concept sheets (art builder 4, 2026-10-11)

## Ed's decisions (2026-10-11)
1. **All four kinds and their areas: yes, as drawn.**
2. **The Cinder Wyrm grows wings.** They're a new evolution feature in the art kit (`wings`, art/creatures3d.js; PR into claude/prototype): nubs on the young, full leathery wings from adult up, the legend's biggest. `wyrm.png` and `area-wyrm.png` are redrawn with them.
3. **The vulture stays on the raven builder for now**; no new bird builder.

East runs rockier, then volcanic, further out. South-east blends into badlands. These are concepts only: nothing here is wired into the game.

- The creatures are drawn by the real art generator, as genome records on existing templates and builders (`genomes.json`; `GENOME='…' node art/preview.mjs genome`).
- Each creature sheet's top row is legend, adult, young and baby. The second row shows each again, angry then happy.
- The area sheets (`area-*.png`) use the prop, set-piece and decor generators' own pieces, with their moss regraded per biome and laid on a ground palette. The ground is a pixel swatch, not the ground shader.

## Ibex: the Scree (crags). Phase 3 or so, the first step east.
- **Feel:** a sure-footed mountain goat on grey scree; its horns grow from nubs to great ridged sweeps. Its legend carries standing stones and moss on its back, a crag that walks.
- **Fights:** a charger with a run-up (the ram's `charge`, with backup). It leaps down off higher ground onto its target (the lynx's `leap`, longer). Legend: a stamping quake that rolls loose stones (the quake ring).
- **Sigil idea:** two horns sweeping back in a single curve, like a wave, over a dot for the eye.
- **Area:** grey scree and lichen, stone pinnacles and cairns. Set piece: a ring of standing stones on a ledge.

## Armadillo: the Badlands (south-east).
- **Feel:** a banded little digger on rust and ochre clay. The bands go from 4 to 7, and its claws grow. Its legend wears stone spines and standing stones like a mesa.
- **Fights:** the woodlouse's and hedgehog's `curl`: it rolls into a ball, takes less damage and bowls through the line. It also burrows (the mole's `burrow`) to pop up under her posse.
- **Sigil idea:** an oval of stacked bands, like a rolled-up shell, with a tiny snout.
- **Area:** rust and ochre clay, hoodoos and sandstone boulders. Set piece: a collapsed mesa.

## Vulture: Bone Canyon.
- **Feel:** a patient brown scavenger circling over bleached sand and bone-white snags.
- **Note:** this is drawn on the raven builder, so it has no bald head yet, and its legend shows the raven's green spirit wings. A real vulture needs its own bird builder, or the heron's, for the long neck.
- **Fights:** it hangs back and circles (`orbit` at range). It drops on the weakest party animal, and on knocked-down ones first (the fox's `flank`). It pecks rather than shoots.
- **Sigil idea:** an open-winged V with a hooked beak at its point.
- **Area:** bleached sand, white snags and bone rubble. Set piece: a fallen giant's ribcage (stand-in: a rubble heap).

## Cinder Wyrm: the Caldera (far east, volcanic; the fantastical kind). Phase 4.
- **Feel:** a small dragon. The baby is a lizard with a ridge. From adult on, its crest burns with flame wisps. Its legend has twisted horns, a full fiery crest, claws and glowing eyes.
- **Wings** (Ed's decision): the new `wings` evolution feature. Folded nubs on the young; leathery wings, bones with a scalloped membrane, from adult up; the legend's biggest.
- **Fights:** spits embers (a short-range `shot`). Its signature move: it breathes a flame line (the long beam, telegraphed). Its legend breathes the line, then a fire ring round itself (the upheaval ring).
- **Sigil idea:** a coiled wyrm, nose to tail, with a single flame at its crest.
- **Area:** black basalt with ember cracks, cinder ash on the boulders. Set piece: a fire-pit ring where the wyrm sleeps.

## What a real build would need
- **New builders or features:** the wyrm's wings are done (the `wings` feature). A bald-headed vulture bird is not wanted for now (Ed).
- **Area recipes:** four new ones (`art/recipes/`) with ground genomes in these palettes.
- **Flora:** rock-garden plants (saxifrage, thrift, dwarf pine) for the scree, and nothing living in the caldera except ember lichen.
- **Sigils:** in `art/sigils.js`.
