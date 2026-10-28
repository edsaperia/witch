# The menagerie: how animals are generated, and what holds them back

India, overnight 2026-10-13, for Ed's brief: "Think about how animals are generated overall and review our menagerie to see if you can make any improvements to the approach: more realistic animals, and a more awe-inspiring legend."

This is step 1: the pipeline end to end, its systemic weaknesses with measurements, and the order I'm fixing them in (step 2, one PR a theme). Golf's `legend-audit.md` covers each legend's *idea*; this covers the *machinery* every animal and legend is built with.

## 1. The pipeline, end to end

1. **A species is a record** (`art/genome/species.js`): template (body plan), builder, palette (hue, sat, val, belly), proportions (`body`, `head`), parts by socket (`parts`: ears, tail, feet, horns, antlers, tusks), markings (`coat`), a `legend` list of old generic features, and optionally `levels` (four per-level patches with `features`, the evolution kit) and a `texture`.
2. **A template** (`art/genome/templates.js`) gives the plan its builders, sockets, face style, texture kind, rig gait and, for the four-legged only, **size curves**: four multipliers (baby, young, adult, legend) on head, length, leg length, chest, body width, limb thickness, neck, snout, eye, ear, horns, tusks, antlers, motes. Every quadruped shares the one set; no species overrides them (`sizes:` appears in no record).
3. **`speciesOf`** (`art/genome/index.js`) folds the record into the builders' bag `S.q` and the level patches into `S.levelQ` / `S.levelFeatures`.
4. **A builder** (`art/creatures3d.js`) makes a `Model`: a list of SDF volumes (ellipsoids, rounded cones, boxes) in groups that melt together (smooth union within a group, a crease between groups), plus flat masked planes (ears, wings, flames). `quad3d` draws every four-legged species (24 of 36 today, and most of the ones being added); `owl3d`, `raven3d`, `heron3d`, `bat3d`, `moth3d`, `snake3d`, `glowworm3d`, `hedgehog3d`, `toad3d`, `mole3d`, `snail3d`, `woodlouse3d`, `beetle3d`, `scarab3d`, `spider3d` are each one species. `evolve3d` adds a level's features (mane, wisps, stones, claws, tails, ruff, brambles, moss, wings). `gearUp` adds the expression (`genome/expressions.js`), collar, hat, glasses, shoes from anchors (head, eyes, neck, feet).
5. **`render`** (`art/model3d.js`) ray-marches the model at a fixed three-quarter view (yaw 35°, pitch 30°) one ray per art pixel, writes a material index and a true normal per pixel, draws interior lines where a nearer group stands in front of a farther one, drops the sprite onto its bottom row, and reports `bodyH` (height without `extra` parts).
6. **`critter`** (`art/creatures.js`) caches per shape knobs, applies the **surface texture** (`genome/texture.js`: cells with shared normals, tones, seams, lumps) and the woken eyes; `speciesColours` turns the palette into RGB per material; `bake` (`art/core.js`, `art/stylise.js`) lights and stylises into the game's pixel style.
7. **Forms** replace the final draw: `art/naps.js` (asleep), `art/legends.js` (the sleeping legend: sunk, mossed, overgrown, eyes shut, glow gone to stone) and the idle builders (`sentinel3d`).
8. **The live rig** (`art/genome/parts.js` → `src/render/rig/`): the same model split by `m.part` into torso, head and tail pieces baked at five headings, its legs as chains of discs strung by two-bone IK from `m.rig.legs` (hip, knee, foot), a trot by duty factor. On by default on the ground at 40 px and up; the two baked walk frames show from the treetops and for every non-rigged plan.
9. **Checks**: `art/check.mjs` (size steps baby < young < adult < legend by 1.3 / 1.55 / 2.1, adults against the witch, the cross-species silhouette distance at 24 px (0.15), expressions, textures, rig parts, gear, palette variants, the lint), `tools/genome/compare.mjs` (pixel-identical refactors), `art/preview.mjs lineup|legends|faces|silhouettes|sizes`.

## 2. Systemic weaknesses

Measured on `claude/prototype` at 9ad634d (`node art/preview.mjs lineup all`, and a script measuring each species' baked joints through `rigParts` and its level-to-level silhouette distance with both levels scaled into the same 24 px box: 0 the same shape, 1 no overlap).

### 2a. Legs are straight sticks ending in balls

`quad3d` builds every leg the same way: hip → knee → foot, the knee set at 55% of the hip's height **straight below it**, the foot a ball. The hind leg gets one extra point 0.12 back. The knee angle (hip–knee–foot) on the baked adult:

| species | fore legs | hind legs |
|---|---|---|
| wolf, fox, lion, lynx, stag, elk, ram, hare, boar, bear, cheetah, fennec, meerkat, otter, beaver, stoat, marten, squirrel, dormouse | 162–169° | 172–179° |
| badger (its own `legW` 1.7 and low `chest`) | 69–72° | 59–72° |
| salamander, newt (sprawling, their own low bodies) | 106–169° | 100–156° |

A real dog's elbow stands at about 140° and its hock at about 140°; a cat's lower; a deer's cannon bone is upright but its hock is sharp. Here nineteen species stand on four near-vertical columns. That is why Ed's playtests read the legs as "a string of balls" and the fixes so far (the rig's rod-lit discs, #banded-legs) treated the symptom (shading) not the cause (no joints). It also means no stance: a bear (plantigrade, flat-footed), a wolf (digitigrade, on its toes), a stag (unguligrade, on a hoof) and a hare (long hind feet) all stand the same way, so their silhouettes share the same gestalt in the silhouette sheet (wolf, lion, fox, lynx, stoat, marten, otter, dormouse all read as "loaf on four posts").

Feet are one ellipsoid: no pad, no toes, no hoof shape (a hoof is the same ball in a darker colour, `M.NOSE`). The party shoes fit better than the feet do.

### 2b. The torso is three loaves

The body is three ellipsoids on one axis (chest, rump, middle), smoothed into one mass by the group blend. There are no withers (the shoulder mass that makes a wolf's or a bear's outline), no pelvis or croup, no ribcage against a tucked loin beyond two heights (`chest`, `tuck`), no spine line a back could follow (the hump and arch are two fixed bumps). Across the sheet every quadruped's back is the same soft curve: compare the stag's (a deer's back is flat with a raised croup) with the lion's (a cat's is a long level line) with the bear's (a hump behind the neck and a sloping rump): all three are the same bean.

### 2c. The neck is one cone, the head one egg

The neck is a single rounded cone from the chest's top to the head's centre, so there is no throat, no crest, and the head sits *on* the neck rather than hanging *from* it. The head is one ellipsoid with a snout ellipsoid and a nose ball; the eyes are two balls placed by one fixed direction on the ellipsoid, so every species has the same eye placement and the same blank forehead: no brow ridge (the expression kit draws brows as strokes on top, which is why they read as drawn on), no cheek or jaw, no mouth line, no nostrils. The faces sheet shows it: wolf, fox, bear and hare have the same face at every level with the snout length as the only difference.

### 2d. Growth is mostly scale

The quadruped template's size curves make a baby chunky (head 1.75, legs 0.55) but leave young → adult → legend as a thicker copy: body width ×1.28, limbs ×1.3, length ×1.06/1.14, head ×1.12/1.0. Silhouette distance between consecutive levels, both scaled into the same box:

| step | median | lowest |
|---|---|---|
| baby → young | 0.52 | mole 0.07, raven 0.09, toad 0.10, snake 0.11, hedgehog 0.12, glow-worm 0.12 |
| young → adult | 0.19 | hedgehog 0.09, bear 0.11, otter 0.12, squirrel/marten/beaver/newt/dormouse 0.12–0.13, toad/snake/meerkat 0.13–0.14 |
| adult → legend | 0.27 | marten 0.11, newt 0.11, mole 0.11, salamander 0.13, toad 0.14, meerkat 0.14, squirrel 0.16 |

For the one-species builders (toad, mole, hedgehog, snake, raven) growth is *only* scale (0.07–0.17 at every step): they read no level patch at all beyond the shared `build` and `motes`. The art guide (0b) asked for a within-species check; there is none, which is why these slipped.

### 2e. Legends are an adult with things on

Section 0c's brief needs no restating; what the machinery does is: the legend level is the adult with `limbB` ×1.3, `body` ×1.28, a smaller head, nine motes, glowing eyes, then one of the generic `legend` features (`crystals`, `moss` + back trees, `wings`, `ribbons`, `eyesRing`, `crown`, `starTail`, `mane`/`flames`, `antlersGlow`, `wingsBig`): 29 of 33 flagged in the audit. The evolution kit (`levels[3]`) is the right mechanism and the wolf, fox, badger, boar, snail, ram, woodlouse, owl, fennec, lion, cheetah use it, but it has nothing for **what Ed's brief asks of every legend**: age (a grizzled muzzle, worn teeth, a bowed back), wear (scars, a torn ear, a chipped horn), and the trappings of something worshipped (a torc, rings on horns and tusks, bells, a garland, beads, bands). Each builder re-invents those or leaves them out; the frost wyrm's PR adds its own `scars`, `hoard` and `harness` paint to `quad3d` because the kit has none. Nothing changes the legend's *stance* either: it stands exactly as the young does.

### 2f. Only `quad3d` has a skeleton

The fifteen one-species builders each hand-place their volumes. They record anchors (so expressions and gear work) but most have no `m.rig`, no level patches and a two-frame walk that nudges feet ±0.03–0.08. Every non-quadruped is frozen at the shape its builder first gave it; the levels only scale. An avian or squat template with size curves of its own would lift the owl, raven, heron, toad, hedgehog and mole together.

### 2g. The walk

Two baked frames, each leg swung ±0.32 with a 0.06 lift, the body bobbed 0.04: the swinging leg stays straight (no elbow or hock flexing), the head and tail don't move, and frame 0 (the standing frame in the game) is a mid-stride splay. The rig does better on the ground (IK, a hock, a trot by distance), but its knee bends from `restBend`, which with straight baked legs is a near-zero cross product, so the fore knee direction is decided by a sign flip.

### 2h. Smaller things

- **Markings are height thresholds**: belly below `chest + .12`, saddle above `top − .18`, the same line on every species; a stag's pale rump and a fox's dark socks are `rump` and `socks` flags with fixed geometry.
- **Materials**: one BODY ramp (BODYL/BODY/BODY2/BODY3) plus BELLY and ACCENT; a species with two coat colours (a badger's grey back and black legs, a lion's mane) borrows BODY3, so the texture pass treats a mane as shadow.
- **Lumps**: `texture.lumps` is 0.004 model units at young (a ~0.1 px bump); the surface texture carries all the "fur" and it reads as noise on a balloon rather than shoulders and haunches.
- **Ears** are one flat plane at one fixed point on the head, four shapes; ears don't turn with level or mood.
- **Dead knobs**: `head.cheeks`, `head.whiskers` and `head.snoutTaper` are set in a dozen records (lynx, lion, hare, otter, beaver, stoat, squirrel, dormouse, fox...) and read by no builder: a builder tuning them changes nothing, and nobody noticed because nothing checks that a knob is read.
- **Motes**: every adult has three, every legend nine, in one seed per species, so they land on the same pixels of every frame.

## 3. What I'm changing, in order (generator first)

Each a small PR with before/after sheets in `docs/art-review/mocks/` (the pictures now on claude/ed-shots, [previews/archive/art-review/mocks/](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/archive/art-review/mocks)), the art check and tests green, nothing pixel-locked (these are meant to change every animal), each knob with a default that keeps a species itself so other builders' records keep working unchanged.

1. **Legs with joints and feet** (`quad3d`): fore = shoulder, elbow, wrist, paw; hind = hip, stifle, hock, paw; a stance by foot kind (paw: digitigrade, elbow and hock bent; hoof: a long upright cannon, a sharp hock; `plantigrade`: a flat foot, a bear's or badger's); the swinging leg flexing in the walk; feet as a pad with toes or a hoof. `m.rig` keeps hip/knee/foot (the rig's IK keeps working; a `hock` joint added for a later rig PR).
2. **Torso and neck**: a spine line (withers, back, croup) the three masses hang from, a shoulder mass and a pelvis, a two-part neck with a throat; knobs `withers`, `croup`, `loin`, `throat` with defaults by foot kind and the existing `back`.
3. **Heads**: a brow ridge, cheeks and a jaw, a mouth line and nostrils, eyes set under the brow; anchors unchanged.
4. **The elder kit** (`evolve3d`): age and wear and trappings any legend can wear, from Ed's list: `grizzle` (a pale muzzle and brows), `worn` (a notched ear, a chipped horn or tusk), `bowed` (an old back and a lower head), `torc`, `rings` (on horns, tusks, antlers), `earrings`, `bands` (on legs), `garland`, `bells`, `beads` (already) — none of them crystals, flames, wings, eyes or trees.
5. **A within-species level check** in `art/check.mjs`: each level's silhouette against the previous scaled into the same box, warned under 0.2 (the numbers above as the baseline), so a scaled copy can't ship quietly.
6. Then per-animal: size curves for the avian and squat templates, and the worst scaled copies (bear, otter, marten, dormouse, mole, toad, hedgehog), where the three legend builders aren't already redoing them.

Not in scope (Ed hasn't asked): new animals, new attacks, set pieces, gameplay.
