# Creature meshes: the rollout to every kind

A brief for the coordinator, written by the creature-mesh builder (#1962) at Ed's asking (Ed, 2026-11-12: "Can you write a command I
can give to the coordinator to create a series of sessions to update each creature in the way you think is best?"). It is a
proposal: the coordinator runs it as it sees fit, and Ed's words win over mine. How the meshes work is in
[`creature-meshes.md`](creature-meshes.md) and `docs/notes/creatures.md` (**Mesh creature**).

Ed, 2026-11-12: "meshes are great, we should aim to transition to them for all the creatures".

## Where it stands

- **Done, on `claude/creature-bake` (#1962):** home's ten (fox, stoat, hare, squirrel, dormouse, badger, mole, hedgehog, snail, bee)
  and the turtle. The marten has a mesh and is on the bench with the newt (`src/rules/kinds.ts` `BENCH`).
- **To do: 53 kinds**, in the eight batches below.
- **Nothing here can start until #1962 is combined**: `art/mesh/` exists only on that branch.

## What Ed has ruled, for every batch

1. Four models a kind: baby, young, adult, legend. Low-poly, flat-shaded, on a skeleton.
2. "keep the sizes" (2026-11-12): a kind is drawn as tall as it is drawn today at each level. Measure today's and use that.
3. "1 texture, twice the sides" (2026-11-12): already on for every mesh; nothing to do a kind.
4. Legends' armour (2026-11-12): "I don't like the random spheres. Armour should just be thickened polygons on their torso with a
   different colour and glowing runes." No orbs, no floating ornament. A legend should still be its animal, grown strange.
5. Asleep (2026-11-12): "Most sleeping legends should curl up on their sides", in a ring, nose to tail, like a sleeping dog ("It
   should be like references"); "Snail and turtle sleep in their shells." A kind that can't curl (a snake coils, a bird tucks its
   head, an insect folds its legs) needs its own sleeping pose, said in the report.
6. Ed passes the models by eye before they go into the game (he did for home: "Ok these are good", then "I'm happy with these
   models, let's do the real build").
7. "Be economical" (2026-10-29).

## Step 0: one preparing session, before any batch (after #1962 is in)

**Done** (2026-11-12, `claude/mesh-fix-step0`, with the fixes from Ed's first playtest: feet on the ground, a real stride, a gait a kind). What it made, and the how-to and checklist a batch follows, are in `docs/notes/creatures.md`, **Writing a mesh creature**: `art/mesh/species/<id>.js`, `art/mesh/kit/<part>.js`, and `tools/creature-mesh/` `sizes.mjs`, `sheet.mjs`, `index.mjs`, `frames.mjs`. As it was proposed:

So that batches can run side by side without touching the same lines, and each takes few steps:

1. **A kind's mesh in its own file.** Today `art/mesh/plans.js` (the table of plans, the curl's options) and `art/mesh/index.js`
   (`MESH_HEIGHTS`) are shared lists every batch would edit. Move each kind's plans, heights and sleeping options into
   `art/mesh/species/<id>.js`, and make the list from the folder with a tool, as `art/creatures/index.js` is made. No change in what
   is drawn (prove it: every frame of the eleven identical before and after).
2. **Kit parts in their own files** (`art/mesh/kit/<part>.js`), so a batch that adds hooves doesn't collide with one adding wings.
3. **One command for pictures:** `node tools/creature-mesh/sheet.mjs <kind>...` writing one sheet a batch: the four sizes beside
   today's drawing at the same scale, the legend's armour, and adult and legend asleep. Then `tools/shots/push.mjs` as ever.
4. **One command for sizes:** today's drawn height of a kind at each level (meshes off), to fill in "keep the sizes".
5. **A short how-to** in `docs/notes/creatures.md`: writing a plan from the kit, the checklist below.

This is the creature-mesh builder's own area; a fresh session of it is the natural one to do this.

## The batches

By body, not by island: kinds that share a skeleton share the code and the checks. Each batch is one builder, one branch
(`claude/mesh-<batch>`), one draft pull request.

| # | Batch | Kinds | New kit it needs |
|---|---|---|---|
| A | Dogs and small hunters (7) | wolf, arcticfox, fennec, raccoon, redpanda, otter, meerkat | none: the fox's and the stoat's |
| B | Cats (7) | cat, lynx, cheetah, lion, tiger, jaguar, snowleopard | none; a mane |
| C | Hoofed (6) | stag, elk, roe, ram, ibex, boar | hooves, antlers and horns, tusks |
| D | Heavy and gnawing (6) | bear, polarbear, rhino, elephant, beaver, flyingsquirrel | a trunk, a horn, a flat tail, a glide skin |
| E | Cold-blooded (7) | salamander, komodo, crocodile, toad, armadillo, snake, rattlesnake | a legless body that slithers; a sprawling gait |
| F | Wings (7) | heron, raven, owl, penguin, moth, bat, dragonfly | a bird's two legs and feathered wing; the bee's wings and hover |
| G | Many legs (5) | beetle, woodlouse, spider, scorpion, crab | six, eight and fourteen legs (the bee has six); pincers, a sting |
| H | Wonders (8) | griffin, sphinx, unicorn, frostwyrm, frosttroll, hydra, featheredserpent, stegosaurus | whatever A to G made, combined; several heads |

- **Order:** A and B first and together (no new kit, the quickest proof that the how-to works). Then C, D, E. Then F and G. H last:
  it needs the others' parts and has the most invention in it.
- **No more than three at once:** each needs Ed's eye on a sheet, and the coordinator's combine.

## What one batch does

1. For each kind: its plan at four levels from the kit (the fox's is 81 lines), its legend's armour and runes in a colour of its
   own, its sleeping pose, its gait (`gait.type`: Ed, 2026-11-12, "many small creatures bound rather than trot"). Heights from
   today's drawing. The checklist in `docs/notes/creatures.md` (**Writing a mesh creature**): ground contact, stride, gait, armour,
   asleep, sizes.
2. Draws the batch's sheet and posts it. **Stops there for Ed** (through the coordinator): a `QUESTION:` with the picture.
3. On Ed's yes, or with his changes made: switches the kinds on (their heights listed), adds a What's new fragment and the branch's
   bench declaration (`frames` only: the rules don't change, since no kind changes its id, its island or its numbers).
4. Checks: `npm run typecheck`, `src/render/meshCreatures.test.ts` and the art tests near it, `node tools/creatures.mjs check`.
   Not the full suite, and no waiting on CI inside a turn.
5. `FINAL:` with the head, the sheet's link, what is rough, what Ed can look at in play (`?meshCreatures=0` for the old ones).

A batch does **not**: change a kind's id, island, attack or numbers; touch `src/rules/`; change another batch's kinds; add a new
kind. (The bee and the turtle needed all of that, and it was where the cost and the breakage were.)

## Keeping the cost down

Measured on #1962's session (2026-11-12): over half its spend was re-reading its own long conversation at every step, and most of
the rest was commands and looking at pictures.

1. A fresh builder a batch, briefed with this file and the how-to and nothing else.
2. One script a job (step 0's commands): a batch should be tens of steps, not hundreds.
3. One sheet a batch, looked at once by the builder; the full-size one goes to Ed.
4. No polling CI; the coordinator runs the slow checks once on the combined build, as it does.
5. The table work in step 0 is mechanical and could run on a smaller model; the modelling wants judgement.

## For the coordinator to decide or ask Ed

1. **The body-graph lane** (#1866, paused, "bear to hydra"): the meshes now cover the same animals. Ed's "transition to them for
   all the creatures" reads as retiring it; ask him.
2. **What the generated creatures are kept for** once a kind has a mesh: today they are what `?meshCreatures=0` shows and what the
   bench and the art checks pin. Removing them is a later, separate piece of work.
3. **Balance:** the bee (a flier on home) and the turtle (slower, armoured, in the Fen) are first guesses and have not been through
   the balance tools.
4. **Still rough from #1962:** the hare's and the badger's curls; no idle fidget or glide pose of a mesh's own (it has a standing
   frame since step 0); motion judged only from stepped frames (the cloud renderer gives about a frame a second).
