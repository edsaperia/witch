# Research-based creature part tree

Authority: coordinator1866#6689311553, 6 November16:03:31UTC. Design reference:
`docs/research/creature-generator-modelling.md` at45e17a425 on
`claude/creature-research`. The verified architectural findings inform this
implementation; its family ratios, recipes and bear preset remain project
inferences requiring the critical render loop. This supersedes de7fc615b's
globally blended station geometry, not its default-off selection contract.

## Licence and provenance checked before implementation

Infinigen's upstream root licence is BSD-3-Clause, copyright2023 Princeton
University. Read6Nov from the official repository API and actual raw LICENSE:
[upstream licence](https://github.com/princeton-vl/infinigen/blob/aeb7fd0556b7aa2c34e17d53a9b26741156904a2/LICENSE).
The licence-file commit is aeb7fd0556b7aa2c34e17d53a9b26741156904a2.
Its source/binary redistribution conditions retain copyright, conditions and
disclaimer, and prohibit endorsement using contributor names without permission.

This PR independently implements the paper's architectural ideas in original
JS. No Infinigen source, parameter tables, reference-photo profile values or
assets are copied or redistributed. Family profiles below are authored project
starting points, not extracted Infinigen/SMAL/PanTHERIA data. No SMAL material is
used. If later work imports upstream code/assets, it needs its own licence and
attribution review; this note does not authorize that.

Architecture reference: Raistrick et al., Infinite Photorealistic Worlds using
Procedural Generation, CVPR2023, [paper](https://arxiv.org/abs/2306.09310).
The research note distinguishes verified claims from inferred project recipes;
do not promote its gait numbers or ratios to verified facts.

## Changes versus de7

`part-tree.js` provides eight family templates: ursid, canid, cervid,
chiropteran, strigiform, gastropod, arachnid and serpent. These are parameter
vocabulary only: this PR still selects exactly the original six species.
Each template has an authored characteristic centre-line curve and three
cross-section profiles for rear, ribcage and shoulders. Presets choose a convex
blend of reference/broad/compact/lean profiles. Optional seeded variation
(at most8%) changes radii only; it never perturbs centre-line positions.
Explicit ribcage/flank depth/width multipliers, head snout/jaw/brow dimensions,
ear curl and the existing hard cloven-hoof split form the parameter-table
checklist. These are original controls, not copied parameter values.

The fifteen sampled stations remain the attachment guide. They no longer draw
fifteen overlapping ellipsoids. Three bean masses, generated from the family
profile, build the torso first. Existing regional tissue data deforms their
radius envelope. Positive fur thickness expands that envelope; no inward
ellipsoid-SDF offset or interior-depth shading is used.

Edges carry parent/u/v/r: u along the parent's centre line, v turns around the
cross-section, r from skeleton0 to analytic cross-section surface1. This is
an authored parametric surface, not a claim of an exact closest-point query on
the rendered union. Offset is an explicit extra local adjustment. The compiler
validates preceding parents; neck/head chains retain parent frames. Muscle
parameters from/to/angle/depth/radius add small parent-mounted tubes.

Bear stays preset-only: ursid,70%broad/30%compact radius prior, low.02 neck rise,
one shoulder muscle tube and the existing round skull, broad torso/feet and
regional bulk. The protected starting feature is the hump/low round head and
short pillar legs. Closeness to shipped still requires executed paired overlays;
no metric threshold or visual acceptance is invented here.

## Blend policy and features

The named convention is `classic-quadratic-band-width`. `blendBand` is B:
two equal inputs bulge by B/4; distances separated by B receive hard min. The
existing renderer already uses this convention; its global implementation is
unchanged. The graph selects a.035 model-unit band as an inferred starting point.
No claim of a separate per-parent smoothing kernel is made.

Selected graph models use parent-tree groups. The body is one group of three
masses; sibling legs/necks have distinct groups. A skull and its muzzle/jaw may
share a bounded group, while eyes, ears and other crisp features receive
separate groups after the body. Feature metadata names its parent head. Every
group is capped at three primitives (stronger than an overlap-only bound), then
IDs are compacted into the sprite's eight-bit group channel. The cap is applied
again after evolution/gear additions. Default legacy graphs keep their existing
compiler path; no shipped group/blend behavior changes when graphs are off.

Ruff is now a separate post-body collar mass rather than another globally
blended tissue layer. There is no sibling neck/limb soft union. Round-cone
segments within one chain may share their bounded group. Surface eyes remain
small authored features; a full post-bake decal system is not implemented or
claimed by this milestone. Production live-rig migration/turning/slopes remain
outside scope.

## Validation and handoff

Focused tests cover the named B/4 formula against Model.groupField, analytic
UVR coordinates/depth guards, all eight family profiles, convex-prior invariance,
radius-only seeded variation, three torso masses, tree parent order, unique
sibling limb/neck groups, all-age group caps and the six real critter() paths.
Legacy graph/feline tests protect the unchanged compiler/adapter path.

The exact clean-head cloud command remains:

```
WITCH_GRAPH_CLOUD=1 WITCH_SHA=<head> node tools/body-graph/iterate.mjs bear previews/graph-iterate/<head>/bear
```

It is still UNRUN here. The55s budget, external under60s process containment,
native/4x shipped overlay and per-age/facing IoU/precision/recall are described in
`body-graph-parameters.md`. Canonical owns execution and the critical
art-director loop; scores are guides, not proof of animal likeness. A cloud
budget failure must produce INCOMPLETE, not a performance-pass claim.
All six remain OFF, legacy fallback retained, no expressions/family expansion,
bench declaration, laptop capture/runtime retry, activation, merge or release.
