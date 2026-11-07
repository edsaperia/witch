# hydra: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Limbless coiled swamp serpent with independent necks.
- Five adult heads
- one hatchling head
- independent neck chains
- broad anterior neck-root region
- low thick coiled serpent body
- no legs or wings
- tapering tail

## Body plan and mass
Let L be the axial trunk length from neck-root station to vent, excluding neck, head and tail. Proposed model-space lengths relative to L: each head .18; neck .9–1.3; legs 0; tail 1.2. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Broad anterior trunk supports the neck fan; continuous heavy coils and tail base counterbalance it. There is no shoulder girdle for legs. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/hydra/reference-v1.png): upper row adult, lower row age0; columns intended resting towards, undulating towards, resting away, undulating away. All are synthetic fantasy concepts, not photographs. Actual inspection: The initial quadruped generation was rejected after reading hydra3d and the genome: this game uses a LIMBLESS coiled serpent. It is excluded from evidence publication. Replacement sheet inspection is recorded below; head counts must remain five adult/one hatchling. Legend seven-head form is separate.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [NileCrocodile.jpg](https://commons.wikimedia.org/wiki/File:NileCrocodile.jpg): Crocodiles: broad flattened skull, splayed short limbs, broad trunk and scuted tapering tail. Does not validate fantasy neck length.
- [Python_Regius.jpg](https://commons.wikimedia.org/wiki/File:Python_Regius.jpg): Coiled python: continuous taper, wedge head and narrow neck; coiling prevents precise axial measurements.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
No wings or flight requirement. Adult target is level2 five heads; source levels are 1/3/5/7, not five at every age.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Keep each neck separately traceable
2. broaden support base
3. make age head counts explicit

## MISSING GRAPH FEATURES
Multiple head tags alone insufficient: independently posed parented neck chains; branching/rotating attachment frames; continuous serpent undulation and independently posed necks.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/hydra/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Legend concepts: three alternatives and proposed pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/hydra/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: cold still black water, drowned cypress roots and broken old walls. Source art/areas.js incorporates AREA_RECIPES; see art/areas/drowned-wood/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Seven heads showing scarred regrowth.** The drowned wood’s old serpent has survived decapitation. Three old necks plus two healed bases each branching to two young heads tell that history without glowing eyes or a generic crest. Bronze rings are old offerings. Ed judges the pick; no implementation or activation.

Legend checklist:
- Strictly limbless low coils
- exactly seven heads
- three old long necks
- two scarred branching bases with two heads each
- uneven head ages
- bronze offerings
- dark glinting eyes

Legend body-plan target, L defined above: each old head .18L, necks .9–1.3L, young branches .45–.65L beyond bases; legs0, tail1.3L. Broad anterior coils support uneven neck mass. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Parented neck chains already exist; require branching seven-head semantic assembly, independent pose/occlusion, healed scar markings and neck-ring sockets.

Actual inspection / choice: A visibly shows seven heads and two forked front bases. B shows age but not regeneration; C’s rootlike frills dominate the seven heads. A is most specific to hydra survival. Each branch attachment still needs structural validation; no bleeding/wound gore.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.

Replacement inspection: corrected plate has no legs, five adult heads and one hatchling head in all panels. Continuous low coils/tapered tail match the python comparison. Cobra-like raised necks and absent crest/frill detail remain limitations; exact projection/gait not proven.
