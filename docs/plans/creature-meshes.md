# Creatures as real meshes: a trial on home's ten

Ed, 2026-11-11: "I'm not really happy how the creatures are looking and moving. Many don't look much like their real life counterparts, they end up looking a grotesque, and are wooden in the way they move. The designer is also not great at exaggerating the special features of creatures for the adults and legends; they mostly just look scaled up. Perhaps there's a better way to approach it?" Then: "Okay, how do we set this pipeline up? I think we should try it on all the home island creatures."

This is a plan and a set of proposals. Nothing in it is ruled by Ed except his words quoted here and the briefs it copies from `docs/art-guide/EVOLUTIONS.md` and `docs/ART-GUIDE.md` 0c.

## Why

Today a creature is a handful of ellipsoids and cones melted together, placed by numbers in its genome (`art/creatures3d.js`, `art/model3d.js`), and it moves as a rigid torso picture with legs strung from discs, every quadruped on one trot (`src/render/rig/rig.ts`, `art/genome/templates.js`). The briefs ask for more than that medium can draw. The trial keeps "3D drawn as pixels" (the game needs every heading, the view from above, normals for its lights and legends hundreds of pixels tall) and changes who makes the 3D: a picture Ed approves, turned into a mesh with a skeleton.

## The five stages

| | Stage | Goes in | Comes out | Who can do it |
|---|---|---|---|---|
| 1 | Concept | the species' brief (below), the style block | one sheet a species: baby, young, adult, legend side by side; then one clean picture a level | an image model; Ed approves the sheet |
| 2 | Mesh | a level's clean picture | `art/models/<species>/<level>.glb`, textured | an image-to-3D service |
| 3 | Skeleton and clips | the mesh | the same `.glb`, rigged, with its clips | the service's rigger, or a donor skeleton (below) |
| 4 | Bake | the rigged `.glb` | pixel sprites: colour, normals, a lit frame | `tools/creature-bake/bake.mjs` (built, below) |
| 5 | In the game | the sprites | the creature in play | first through `art/overrides/`, then its own path (below) |

Cloud sessions cannot reach the image or 3D services (tried 2026-11-11: no route), so stages 1 to 3 run where there is a login: Ed in the services' own pages, or a builder on the laptop with their keys.

## What is proven (2026-11-11)

- **Stage 4 works.** `node tools/creature-bake/bake.mjs <model.glb> <out dir> [clip] [height px] [frames]` bakes a rigged glTF model at the game's view (the same yaw and pitch as `art/model3d.js`), in about two seconds for 16 frames at adult size. Tried on the Khronos sample fox (mesh CC0, rig and clips CC BY 4.0; a test model only, not committed): it reads as a fox, its legs bend at real joints, and its walk has a spine and a tail.
- **Stage 5's first seam works.** The lit frames dropped into `art/overrides/fox/adult-walk0.png`, `adult-walk1.png` and their `-away` twins show in the built game with no code changed (`art/overrides/README.md`).
- **Not proven:** any picture-to-mesh step, any automatic rig on our own meshes, a legend, a creature that isn't four-legged, and the look under the game's coloured lights (an override is lit flat).

## Stage 1: concepts

One sheet a species, for Ed's eye: the four levels side by side on a plain ground, in the game's three-quarter view, silhouettes first. The rules a sheet is judged by:

1. **Real animal first.** The young and adult would pass for the animal in a field guide: its true proportions, leg joints, feet, ears and face.
2. **One signature, pushed further each level.** Each species names the one or two things that make it that animal (below). The baby has it small or missing, the adult has it plainly, the legend has it far past nature.
3. **A new silhouette every level,** told apart with both drawn at one height. A legend is its own drawing, never the adult enlarged.
4. **A legend is the elder of its kind** (Ed, 2026-10-13: "The animal's nature, plus ancient wisdom, power, and magic"; "Size, weathering, exaggerated nature, exaggerated features, magical-ness, jewellery/armour/decorations, scars"). Nothing generic: no crystals, flame crests, spirit wings or rings unless they come from the animal.
5. **Babies are babies:** a big head, big eyes, short legs, round.
6. **It reads at game size.** Shrunk to its height in art pixels (the table below), each level is still that animal.

Once a sheet is approved, each level gets one clean picture for the mesh: the animal alone, standing square on all its feet, legs apart, tail clear of the legs, mouth shut, plain background, even light, side-on with a slight turn. Where the service takes several views, a front and a back as well.

**The style block** every prompt carries (proposed; Ed to adjust after the first sheets): stylised low-poly animal for a pixel-art game, bold simple shapes, flat colour regions with few colours, no fine fur texture, dark eyes large enough to read small, clean readable silhouette, night-forest palette, no background.

## Stage 2: meshes

- One mesh a level, `art/models/<species>/<baby|young|adult|legend>.glb`, low-poly (a few thousand triangles; a legend more), one texture of flat colours.
- Head along the model's forward axis, feet on the ground plane, real leg joints modelled (a straight leg cannot bend: see stage 3).
- Whatever a legend wears (a bell rope, a torc, beads) is part of its mesh.

## Stage 3: skeletons and clips

- **The risk.** A test of four automatic riggers on twelve animals (Cinevva, 2026-08-19) found every one gave legs too straight to bend. So an automatic rig is tried first and judged on its walk, and where it fails the mesh is skinned to a donor skeleton made by an artist (Quaternius's animated animal sets are CC0 and carry walk, run and idle).
- **Gaits by family, not one trot:** fox and badger walk and trot; hare hops, with a gallop at speed; stoat and marten bound, the back arching; squirrel and dormouse scurry and hop; hedgehog and mole shuffle low; the snail is no skeleton at all, a foot that ripples and a shell that rocks.
- **Clips the game uses, in the order to make them:** walk, run, idle (breathing, ears and tail alive), attack wind-up and strike, hurt, sleep, dance (party animals dance on the beat). The first sheets need only walk and idle.

## Stage 4: the bake

`tools/creature-bake/bake.mjs` draws each frame four times too big and brings it down a block an art pixel, so thin legs don't flicker; puts every colour of the bake on one small palette (10 by default); and writes for each heading and frame a lit picture (three bands, a dark outline, a line wherever a nearer part stands in front), its flat colours and its normals, with a contact sheet and `bake.json`.

Heights to bake at, in art pixels, are today's sprites' (measured 2026-11-11, `critter(id, level)` facing towards), so nothing changes size in play:

| | baby | young | adult | legend |
|---|---|---|---|---|
| hedgehog | 47 | 74 | 103 | 347 |
| squirrel | 42 | 71 | 122 | 403 |
| hare | 74 | 114 | 164 | 491 |
| fox | 53 | 81 | 137 | 387 |
| marten | 45 | 69 | 97 | 237 |
| stoat | 41 | 63 | 88 | 229 |
| mole | 45 | 67 | 95 | 323 |
| snail | 35 | 54 | 73 | 222 |
| dormouse | 38 | 65 | 86 | 246 |
| badger | 54 | 82 | 113 | 256 |

## Stage 5: into the game

1. **First look, no code:** two walk frames a level, towards and away, as hand-drawn frames (`art/overrides/<species>/<level>-walk<n>[-away].png`). The live rig steps aside for a level with an override. Lit flat, no party gear, faces or red eyes: enough to judge shape and size in play, not motion or light.
2. **Its own path, once the look is agreed** (not built): the build bakes each model into atlas pages of colour and normals, every clip at eight headings, and the view plays them by the creature's state and speed. Needs a sprite that carries its own colours beside its normals (today's carry a material a pixel: `art/core.js` `Sprite`), the view from above for the treetops, party gear on head and neck anchors read from the skeleton, the faces, and the sleeping forms. It also moves the creatures' drawing out of the player's browser and into the build.

## Home's ten: signatures and ladders

Fox, badger and snail are Ed's briefs as they stand in the genomes and `docs/art-guide/EVOLUTIONS.md` (their legends the elder versions). The other seven are proposals for Ed to mark up. Areas are today's (`art/areas/*/kind.json`); EVOLUTIONS still names the fox's as the stone shrine and the badger's as the moor, so their legends' stories want Ed's eye.

1. **Fox** (old oaks). Signature: the brush tail and the pointed mask.
   - Baby: a fluffy round kit, oversized ears, a short round tail with a white tip.
   - Young: slim, long-legged, a full brush, a sharp face.
   - Adult: a ruff at neck and cheeks, dark-backed ears, a second smaller tail.
   - Legend: the old shrine fox: nine soft tails tipped silver-white, a grizzled muzzle and a bitten ear, a red rope at its throat with a bell, rings in its ears, stone prayer beads on its legs.
2. **Badger** (wispy forest). Signature: the striped face and the low, broad digger's body.
   - Baby: round and low, all face, an oversized white blaze.
   - Young: a longer, flatter wedge, the blaze nose to crown between two black bands.
   - Adult: a broad armoured-looking back in shaggy plates, heavy forelegs with big pale claws.
   - Legend: grizzled and scarred, its stripes running on down its back as chalk hill-figure lines, a bronze torc.
3. **Snail** (muddy forest). Signature: the shell's spiral and the eye stalks.
   - Baby: a near-clear one-turn shell, big stalk eyes.
   - Young: an amber banded shell of two turns.
   - Adult: a tall ridged cone on a frilled body, longer stalks.
   - Legend: its shell the night sky, full of stars, a gold spiral inlaid along its whorls, its lip chipped, old grey skin, huge slow eye stalks with glowing tips.
4. **Hedgehog** (hazel forest). Signature: the spines, and the ball it rolls into. *Proposed.*
   - Baby: a pale soft ball with a few short white quills, a big wet nose.
   - Young: a full coat of short spines, a pointed snout, quick little legs.
   - Adult: long banded spines that flare into a fan when it braces, a skirt of fur, a longer snout.
   - Legend: a walking thicket: spines as long as spears, old ones broken and regrown, offerings spiked on them (apples, leaves, a lantern), a silver face.
5. **Hare** (bluebell glade). Signature: the ears and the long hind legs. *Proposed.*
   - Baby: a crouched leveret, ears laid flat and short, huge dark eyes.
   - Young: ears up and already too long for it, gangly back legs.
   - Adult: tall black-tipped ears, a deep chest, hind legs like springs, standing upright to box.
   - Legend: the moon's hare: ears twice its body's height, notched and ringed, long lean limbs, a crescent mark on its brow, its coat silvered.
6. **Squirrel** (twiggy forest). Signature: the tail, as big as the animal. *Proposed.*
   - Baby: a pink-eared kit with a thin tail like a string.
   - Young: ear tufts starting, the tail a bottle-brush.
   - Adult: a great plumed tail curled over its back, tufted ears, a hoarder's fat cheeks.
   - Legend: the keeper of the hoard: a tail like a sail of red-gold fur, a cloak of strung acorns and nutshells, tufts like horns, one tooth gold.
7. **Marten** (old pinewood). Signature: the long supple body, the cream bib, the climber's reach. *Proposed.*
   - Baby: a short dark kit with a bright bib, round ears too big for it.
   - Young: stretching out, a bushy tail, big paws.
   - Adult: long and arched, a deep bib, a tail as long as its body, hooked climbing claws.
   - Legend: the pinewood's old hunter: longer than seems right, its bib a breastplate of pale fur, pine resin and needles set in its coat, feathers of its catches braided at its neck.
8. **Stoat** (alder forest). Signature: the long neck, the upright stand, the black tail tip, the war dance. *Proposed.*
   - Baby: a tiny pale kit with a mane of baby fur at its neck.
   - Young: a slim tube of an animal, the black tip just showing.
   - Adult: a long neck held high, a white belly, the tail's black brush, standing tall to dance.
   - Legend: the white one: in full ermine, its tail tip a long black plume, a collar of ermine tails as a king's robe turned back on its makers, eyes that hold you.
9. **Mole** (fern forest). Signature: the spade hands and the velvet barrel, no eyes to speak of. *Proposed.*
   - Baby: a pink-nosed velvet bean, hands already too big.
   - Young: a short barrel, broad pink hands turned outward.
   - Adult: huge clawed spade hands, a long sensitive snout, a body like a furred boulder.
   - Legend: the delver: hands like ploughshares worn bright, a crust of earth, roots and old coins on its back, a star-shaped nose that glows faintly, blind and certain.
10. **Dormouse** (honeysuckle tangle). Signature: the big dark eyes, the furred tail, the curl of its sleep. *Proposed.*
    - Baby: a big-eyed baby with a short thin tail.
    - Young: slim and leggy, its tail not yet bushy.
    - Adult: fattened for its long sleep, golden, a full furred tail wrapped round it.
    - Legend: the sleeper: vast and round, half asleep even awake, honeysuckle grown through its fur, a nest of woven grass on its back, whiskers like fishing rods.

## What Ed decides before stages 1 to 3 start

1. Which image model draws the concepts, and whether Ed makes the sheets himself or a builder with a key does.
2. Which 3D service makes and rigs the meshes (Meshy and Tripo both rig four-legged models; Tripo's also names six- and eight-legged, bird and snake bodies), and its budget for about 40 meshes with retries.
3. Whether the seven proposed ladders stand, and the three legends' stories now their areas have moved.
4. Whether the creature builders on the old system pause while the trial runs.
