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

6 November objective repair (coordinator1866#6684290270): the shared finish
uses bulk1 when a template has no build curve, including its reference model.
Each graph species now has a regression render through the actual `critter()`
entry point. Snail foot/reach and hydra body/neck offsets vary between baked
frames; the two crawl species also have real sprite-difference checks. Review
columns say Graph selected. The earlier cloud sheets used an unpushed bulk1
workaround and remain qualified evidence; corrected-head evidence is required.
Look changes, cost and bounds tuning await Ed's separate verdict. The failed
448f laptop fixture attempt and verified FREE report6684278805 are retained;
no old measurement allocation automatically carries to the repaired source.

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
wolf now has a distinct raised heel, with three preserved bone lengths and
opposite elbow/stifle bend hints. Its distal toe segment keeps a fixed model
orientation during the diagnostic cycle; turning and slope contact remain
outside this milestone. This is not a promotion of graph animation into the
existing production live rig. Its legacy three-radius attachment record remains
compatible, with the extra heel landmark retained separately for review.

The source follow-up adds bear muzzle, wolf saddle/underside and juvenile stag
spot/rump painting; stag hooves are split into paired toes. Legend identity
includes glowing stag antlers, bat sonar ears/rings, the snail's dark starry
shell/runes and the hydra's crests and two healed cuts with paired regrowth.
Bear/wolf evolution continues through the existing shared evolution kit. No
expression heads are generated. These are source changes pending visual review,
not claims of likeness or aesthetic acceptance.

Deferred condition: canonical CI/cloud evidence must supply matching old/new
native and 4x sheets, walk strips and measured frame cost for the exact source
head. Full CI, including unchanged bench:quick, must pass. Only after those
artifacts exist can Ed judge this acceptance batch; no further families or
default activation before that verdict. This checkpoint is not READY to ship.

Cloud command (do not run on the laptop): set WITCH_GRAPH_CLOUD=1 and WITCH_SHA
to the exact clean pushed head, then run
`node tools/body-graph/acceptance-review.mjs previews/body-graph-acceptance/<sha>`.
The tool proves its served SHA, writes four-age/two-facing comparisons with both
baked walk frames at native pixels and 4x, checks shipped cache restoration and
finite normals, and records one cold construction+bake timing per cell. Those
timings include native fitting and are not steady-state live-rig frame costs;
the canonical bench must provide any runtime comparison. Publish only through
`tools/shots/push.mjs` under the allocated creature-graph preview batch.
