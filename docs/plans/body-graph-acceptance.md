# Body-graph acceptance batch

Coordinator 1476 comment 6658629537 (5 November) restarts the merged #1470
foundations. Scope is bear, wolf, stag, bat, snail and hydra, then stop for
Ed's verdict. This replaces the historical staging instruction to scale to
all families without an interim review. All six versions start off.

Branch `codex/body-graph-acceptance`, worktree `work/body-graph-acceptance`.
Use only `creatureModels` / `creatureVariants`: for example
`?creatureModels=bear:graph`. The built-in acceptance pack supplies complete,
serializable graph genomes through that existing path. Absence, unavailable
modes and explicit Current retain their established fallback; no new selectors.

## Implementation boundaries

1. Extend `art/body-graph/graph.js` only for typed branched necks, membranes and
   shell/appendage descriptions needed by this batch. Keep its existing
   validation and diagnostic callers working. Separate graph description from
   compiling model primitives and from posing it.
2. Add acceptance records/adapters under `art/body-graph/`, preserving the
   selected shipped palette, age-size model and legend identity. Bear uses
   plantigrade feet; wolf digitigrade feet; stag hooves. Bat has membrane wings
   supported by finger rays; snail a broad foot and spiral shell; hydra a
   branching neck fan. Reuse anatomical part families rather than create six
   independent replacement engines.
3. Add a narrow selected-graph dispatch at the existing creature build entry
   and transport the pack through existing style/worker serialization. Keep
   legacy builders callable. Preserve off-mode sprites, state and benchmark
   fingerprints; no bench expectation declaration.
4. Pose the graph from the existing gait clock. State the limits of its current
   two-segment leg model honestly. A true hock, turn/terrain contact or live-rig
   promotion needs demonstrated batch need and review, not an implied migration.
   Expressions remain off; leave an attachment hook without expression heads.

## Shape handoff

#1865 at 1b5ae5720293b0900b298cd2fd785bac61b3c7fc remains the unchanged green
source/evidence checkpoint. Do not merge its five new shape switches here or
continue tuning its old builders. Carry forward these visual requirements:

- hydra: fan the necks, in this acceptance batch;
- lion: fuller/lighter face-and-chest ruff, round ears, larger tuft, heavy front;
- mole: barrel body and outward spade hands;
- woodlouse: readable antennae and seven pairs of legs;
- crocodile: thicker tapered tail base and splayed limbs.

The other four belong to later matching graph batches after acceptance. The
five old-builder candidates are therefore superseded as an implementation
direction, while their requested looks, pins and review evidence remain useful.
#1584 is fully superseded as a separate implementation plan once this handoff
is registered; retain its history. #1865 remains an evidence checkpoint, not an
activation candidate for release.

## Acceptance evidence

Own focused graph/selection/serialization tests and exact typecheck, one
worker. Canonical CI runs the full suite, art and unchanged `bench:quick`.
For each of six species: old/new matching age, facing and native size sheets,
4x nearest-neighbour close-up, walk strip, anatomical/gait notes and a measured
CI/cloud frame-cost note. No new local browser/measurement/heavy-suite run.
Light Node-only diagrams must be labelled diagnostics rather than approval
images. Publish review images only with `tools/shots/push.mjs` under the
assigned preview path. No merge, release, old-builder removal, production
default change, wider family implementation or visual-acceptance claim.

## Source checkpoint and review limits

The first implementation compiles all six plans through shared spine, socket,
neck and membrane primitives. Bat wings have finger rays and hind limbs;
snail has a broad foot, paired eye stalks, shell whorl and head attachment.
Hydra branches grow from one to seven with age and retain the requested fan.
The quadrupeds expose the existing rig attachment surface and reuse evolution
features. Expression-head generation is disabled for selected graph records.

Reference criteria for review: bear soles bear weight flat; wolf walks on toes
with a raised heel; stag bears weight on paired hooves, with a narrow muzzle and
age-dependent antlers. Bat membrane must read as supported fingers rather than
feathered wings. Snail advances on its muscular foot beneath a single coiled
shell. Hydra is a design choice, with separated neck silhouettes. The current
two-segment leg approximation is not a real articulated hock; turning, slopes,
natural coat markings and legend detail still need batch review before claiming
anatomical or visual acceptance.

Deferred condition: canonical CI/cloud evidence must supply matching old/new
native and 4x sheets, walk strips and measured frame cost for the exact source
head. Full CI, including unchanged bench:quick, must pass. Only after those
artifacts exist can Ed judge this acceptance batch; no further families or
default activation before that verdict. This checkpoint is not READY to ship.
