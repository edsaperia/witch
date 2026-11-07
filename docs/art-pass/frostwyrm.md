# frostwyrm: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Long, low, wingless ice dragon.
- Flattened crocodilian snout
- flexible long neck
- four low splayed limbs
- elongated trunk
- very long tapering tail
- backward horns
- dorsal plates
- wingless silhouette

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .30; neck .65; legs .35; tail 1.5. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Low trunk, broad shoulder region and heavy tail base; neck rises without making torso upright. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle; unicorn foal retains disproportionately long slender legs.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/frostwyrm/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: Sheet is wingless and has a tapered scuted tail, but the raised chest and relatively short neck drift toward a stocky dragon. Do not adopt those proportions; some tail tips approach panel edges.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [NileCrocodile.jpg](https://commons.wikimedia.org/wiki/File:NileCrocodile.jpg): Crocodiles: broad flattened skull, splayed short limbs, broad trunk and scuted tapering tail. Does not validate fantasy neck length.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
CONFLICT: source genome explicitly says wingless, while updated1866#6707952715 names frost wyrm under dragon/wyrm membrane. Keep this reference wingless pending coordinator ruling. If a winged variant is intended, require finger-supported membrane, folded ground state, forward level flight, tucked/trailing legs, flap/glide and transitions; no silent wing addition.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Keep low long silhouette
2. lengthen neck/tail before ornament
3. preserve four grounded limbs

## MISSING GRAPH FEATURES
Articulated neck chain; reptile splay and claws; dorsal/horn primitives and rotating spine frames; membrane wing system only if winged variant is approved.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/frostwyrm/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Legend concepts: three alternatives and proposed pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/frostwyrm/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: blue glacier ice and frozen waterfalls at ice cave, ice-spire ring and crystal-leaf trees. Source art/areas.js incorporates AREA_RECIPES; see art/areas/frostcave/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: River-long ice body and icicle beard.** The frost cave’s elder is a frozen river that can move: extraordinary length, worn horns and a beard of frozen falls. Crystal plates in B fit the cave, but length is more specific to this wyrm. Ed judges the pick; no implementation or activation.

Legend checklist:
- Wingless long low trunk
- very long tapering tail
- long neck
- crocodilian head
- chipped swept horns
- hanging icicle beard
- four short grounded legs

Legend body-plan target, L defined above: head .3L, neck .85L, legs .30L, tail2.2L; mass low along trunk and tail base. Increase length before bulk. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Long curved spine/tail assembly, chipped horn surfaces, hanging tapered icicles/beard, reptile feet; no wing sockets requested pending identity ruling.

Actual inspection / choice: B relies more on dorsal crystals; C’s frost breath competes with the silhouette. A best follows the existing “river of ice” story. Some legs are hidden by body; four-leg topology remains required, not verified by occlusion.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.
