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

Cloud sessions cannot reach the image or 3D services (tried 2026-11-11: no route), so by that road stages 1 to 3 run where there is a login: Ed in the services' own pages, or a builder on the laptop with their keys.

**A second road for stages 1 to 3: drawn in code** (Ed, 2026-11-11: "Is there no way that you can draw things yourself, instead of using an image generator?"). `tools/creature-mesh/` builds a low-poly animal from a plan a species: its joints and bones at the real animal's proportions, its body as faceted tubes lofted through rings that each ride one bone, cones for ears and tufts, colours by region, and a gait as a looping clip (each leg by its phase, the joints folding in swing, the body bobbing and swaying, the tail trailing). `node tools/creature-mesh/make.mjs fox-adult out/fox-adult.glb` (or `fox-baby`, `fox-young`, `fox-legend`) writes the rigged `.glb`; the bake takes it as it takes any other. It needs no service, no key and no picture, a builder can do it in a cloud session, and the builder looks at each bake and corrects the plan. Tried first; the services stay as the fallback for whatever it can't reach (a legend's ornament, perhaps).

## What is proven (2026-11-11)

- **Stage 4 works.** `node tools/creature-bake/bake.mjs <model.glb> <out dir> [clip] [height px] [frames]` bakes a rigged glTF model at the game's view (the same yaw and pitch as `art/model3d.js`), in about two seconds for 16 frames at adult size. Tried on the Khronos sample fox (mesh CC0, rig and clips CC BY 4.0; a test model only, not committed): it reads as a fox, its legs bend at real joints, and its walk has a spine and a tail.
- **Stage 5's first seam works.** The lit frames dropped into `art/overrides/fox/adult-walk0.png`, `adult-walk1.png` and their `-away` twins show in the built game with no code changed (`art/overrides/README.md`).
- **Drawn in code works for an adult fox.** `tools/creature-mesh/fox.js`, about 730 triangles on 28 bones with a walk, made in three passes of bake, look and correct: it reads as a fox beside the artist-made sample, with its mask, bib, socks and brush (`previews/creature-bake/fox-three-ways.png` on `claude/ed-shots`).
- **The fox's whole ladder, two passes** (Ed, 2026-11-11: "go"; then, on the first: "I think the adult should be more like the legend (all the tails and spikes) and then the legend should be even more epic, gnarly, ancient, magical, fantastic (not just \"big\"!)"). `tools/creature-mesh/fox.js` has its four levels, put together from `kit.js`'s parts (a torso, legs, a head, tails, bands), each its own build: a kit that's all ears with a stub of a tail; a leggy young; an adult with five tails fanned and a spiked ruff (the first pass's legend, without the elder's trappings); and the old shrine fox: gaunt on knotted legs with long claws, its withers humped under a mane, a pale mask and a beard, one eye lit and one gone white, a torn ear, nine plumed tails that rise and coil, each tipped silver and carrying fox-fire, the middle one holding its star-ball, gold bound on them, the shrine's rope, paper streamers and bell, stone beads on its legs (about 3,800 triangles, 78 bones). Fox-fire, the star-ball and the lit eye glow: the model marks them, and the bake keeps them unlit and writes them at alpha 254, as a hand-drawn frame marks a glow. Pictures: `previews/creature-bake/fox-ladder-second-pass.png`, `fox-ladder-silhouettes-second-pass.png`, `fox-legend-night.png` (a mock: the lit frame dimmed by hand, the glow left bright; not the game's lighting). What's rough: the manes are still spikes more than fur; the legend's body is small under its tails and its face hard to read at this view; fox-fire is a hard-edged flame, not a flicker.
- **The other nine of home's ten, a first pass each** (Ed, 2026-11-11: "That'll do! Want to try the other home island creatures?", and "I like magical armour pieces on legends"). `tools/creature-mesh/mustelids.js` (stoat, marten), `rodents.js` (hare, squirrel, dormouse), `diggers.js` (badger, mole, hedgehog) and `snail.js`, four levels each, on the kit grown for them: a back that arches and drops, haunches, long hind feet and spade paws, round and long ears, a striped face, fur, spines and plates standing off the skin, armour plates with lit stones, a bound for a gait beside the walk; the snail on its own body (a foot that ripples, a coiled shell, eye stalks) with no legs at all. Each adult wears its signature loud and each legend is its own older, stranger creature with armour: the white stoat in ermine with a circlet and gorget; the marten with amber down its spine and a feather collar; the moon's hare carrying a moon between ears twice its height, in moon-silver; the squirrel under an acorn-cup helm with banded walnut shells on its shoulders and a lit acorn on its tail; the dormouse asleep under a straw nest and flowering honeysuckle; the badger with standing stones down its spine, a torc and bronze; the mole in an iron helm with a lamp, earth and coins on its back and a lit star for a nose; the hedgehog a thicket of bronze-tipped spears carrying apples and lanterns behind a silver face; the snail's shell the night sky, inlaid and lipped with gold. Pictures: `previews/creature-bake/home-ten-ladders.png` and `home-ten-legends-night.png` (the night a mock: lit frames dimmed by hand, the glow left bright). What's rough: the mole reads worst (a dark barrel; its spade hands are flat triangles); the marten's and stoat's legends are thin beside the others; round ears, manes and frills are still facets and spikes more than fur; every level has one gait and nothing else; none has been seen moving or in the game.
- **Two candidates to stand in for the marten or the stoat, and two passes over the set** (Ed, 2026-11-11: "Martens and Stoats are pretty similar, maybe we should have a different animal. Bees? Turtles? You can do another couple of passes on the animals to improve them."). `tools/creature-mesh/bee.js`: its own hovering body (a furred thorax, a banded abdomen, two pairs of beating wings, six hanging legs): a bee-let, a worker, a great bumble with pollen on its legs, and the old queen plated in gold with a crown of comb, lit wing veins, lit honey dripping and her daughters circling. `turtle.js`: a quad under a domed shell: a hatchling in half its egg, a smooth young, a keeled mossy adult, and the oracle, its shell's joins lit, a bronze rim hung with lamps, a beard, and a long tail of weed. Neither is in the game's roster: taking either in means its rules, sounds, sigils, sleeping forms and an area type, none of it started. The passes: fur drawn as full curved locks where it was needles (`tufts` `lock`, the cone's `bulge` and `bend`); the mole reworked (a smooth cone of a head, hands as flat pink paddles with a fan of claws); the hare legend's armour darkened to show on its silver coat; the badger adult's plates broadened; the dormouse's eyes and the squirrel legend's ear tufts brought down; the bee's bands sharpened (two rings a band). Pictures: `previews/creature-bake/home-ladders-pass3.png` (all twelve) and `legends-night-pass3.png`. The marten and stoat were left as they were, waiting on which goes.
- **The bee takes the marten's place on home, armour remade, the spheres gone, and two more passes** (Ed, 2026-11-11: "keep both, but swap the marten for the bee"; "I don't like the random spheres. Armour should just be thickened polygons on their torso with a different colour and glowing runes."). Read as: on home the bee stands where the marten did; the marten's and the turtle's drawings are kept for other islands. `quadruped.js` has a new part, `armour`: a patch of a loft's own facets raised into plate, cut along its length into lames that overlap like a lobster's tail, in its own colour with a second for its edges, and a lit rune drawn on each plate's facets (eight made-up marks of straight strokes, drawn unlit like fox-fire, so the bake keeps them bright). Every legend's armour is now that and nothing else: black lacquer on the fox's back, gold lames up the stoat's neck, purple enamel over the queen bee's black bands, moon-steel on the hare's haunches and shoulders, walnut on the squirrel, plum enamel on the dormouse, bronze on the badger's shoulders, iron lames on the mole, a bronze collar on the hedgehog, night-blue on the snail's neck; resin down the marten's spine and a bronze band round the turtle's shell. Taken off: every boss with a stone in it, and every ball (the fox's pearl, the hare's moon, the squirrel's lit acorn, cap and cloak of nuts, the badger's torc ends and moss, the mole's helm, lamp and coins, the hedgehog's apples, lanterns and leaves, the dormouse's nest, the snail's gorget and its shell's gold lip, the turtle's lamps, bosses and barnacles, the queen's honey drops and circling daughters, the bumble's balls of pollen). What is lit instead: the runes, the squirrel's tail tufts and every third hedgehog spear at their points, and the badger's chalk lines, now drawn down its back as its brief asks (the same part, inset and lit). Still round because they are the animal: the snail's lit eyes on their stalks (Ed's own brief), the bee's head, thorax and eyes, the mole's hands. Passes: the squirrel's tail from young to legend is a plume up its back flicked over at the tip, not an arch like a banana; the hare's scut is a small upturned wedge, not a ball; the badger's tail is a short brush, not a knob; a band on a tail now fits the tail's own thickness. Pictures: `previews/creature-bake/home-ladders-pass4.png`, `legends-armour-pass4.png`, `legends-night-pass4.png`.
- **Not proven:** motion judged moving rather than as frames, any picture-to-mesh step or automatic rig, and the look under the game's coloured lights (an override is lit flat). (The snail shows a creature that isn't four-legged can be made; birds, snakes and insects have not been tried.)

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

Heights to bake at, in art pixels, are today's sprites' (measured 2026-11-11, `critter(id, level)` facing towards), so nothing changes size in play; the bake draws its first frame once to measure it and sets the scale so that frame stands exactly that tall:

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

Fox, badger and snail are Ed's briefs as they stand in the genomes and `docs/art-guide/EVOLUTIONS.md` (their legends the elder versions). The other seven are proposals for Ed to mark up. All ten are now built as first passes; where the build went further than a line below (armour on every legend, on Ed's word; the adults made louder), the species' file in `tools/creature-mesh/` says what it made. Areas are today's (`art/areas/*/kind.json`); EVOLUTIONS still names the fox's as the stone shrine and the badger's as the moor, so their legends' stories want Ed's eye.

On home the bee now stands in the marten's place (Ed, 2026-11-11: "keep both, but swap the marten for the bee"): its ladder is 11 below, and the marten's (7) is kept for another island, as is the turtle's (`tools/creature-mesh/turtle.js`). The bee has no area type, rules, sounds, sigil or sleeping form yet. A legend's armour, wherever a line below says otherwise, is plate raised from its own torso with a lit rune on each plate, and nothing on it is a ball (Ed, 2026-11-11, above).

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
7. **Marten** (old pinewood). Signature: the long supple body, the cream bib, the climber's reach. *Proposed; off home, kept for another island.*
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
11. **Bee** (no area yet; in the marten's place). Signature: the bands, the wings, the sting; it flies. *Proposed.*
    - Baby: a bee-let, a ball of pale fluff with a stub of an abdomen, wings too small to lift it far.
    - Young: a slim worker, neatly banded.
    - Adult: a great bumble: a deep furred thorax, bold bands, wide wings, pollen packed on its hind legs, a long sting.
    - Legend: the old queen: long in the body, a plate of purple enamel over each black band with a honey-lit rune on it, a crown of comb, wings veined with light, a ruff of white fur.

## What Ed decides

1. Whether the code-drawn road is good enough to carry on with, on the evidence of the fox's whole ladder (baby, young, adult, legend).
2. Whether the seven proposed ladders stand, and the three legends' stories now their areas have moved.
3. Whether the creature builders on the old system pause while the trial runs.
4. Only if the code-drawn road falls short: which image model draws concepts and which 3D service makes and rigs meshes (Meshy and Tripo both rig four-legged models; Tripo's also names six- and eight-legged, bird and snake bodies), and the budget for about 40 meshes with retries.
