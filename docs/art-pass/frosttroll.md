# frosttroll: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Friendly shaggy, long-armed troll.
- Massive shoulders
- long knuckle-supporting arms
- short hindlegs
- broad plantigrade feet
- round eyes
- bulbous nose
- adult beard
- unbearded big-headed youngster

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .35; neck .10; arms 1.4; hindlegs .8; tail 0. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Upper back/chest and forearms carry bulk, lower pelvis smaller. Weight transfers between hands and feet. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/frosttroll/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: The sheet has useful shoulder bulk, long arms and clear age faces. Its standing pose is too upright for a reliable knuckle support target; walking hands/feet need explicit contact validation. Dense fur hides joints.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [Juvi_walking.jpg](https://commons.wikimedia.org/wiki/File:Juvi_walking.jpg): Juvenile gorilla: broad shoulders, face and long arms. Vegetation obscures feet; does not validate knuckle contact or complete gait.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
No wings or flight requirement.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Establish shoulder/arm hierarchy
2. build readable hands and support contacts
3. keep young face/beard distinct

## MISSING GRAPH FEATURES
Different arm and leg chains; articulated hand/knuckle contact; face/nose/ear primitives; beard coat volume.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/frosttroll/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Legend concepts: three alternatives and proposed pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/frosttroll/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: troll bridge over iced stream, frozen spruce/larch forest and snow-capped boulders that may be sleeping trolls. Source art/areas.js incorporates AREA_RECIPES; see art/areas/trollwood/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Partial petrification of one supporting arm.** Its ancient body is slowly becoming one of the trollwood boulders. The huge stone arm retains the troll’s defining knuckle weight, while the kind face and beard keep wisdom visible. Ed judges the pick; no implementation or activation.

Legend checklist:
- Long supporting arms
- one waterworn stone arm/shoulder
- living round-eyed wise face
- bulbous nose
- long white beard
- moss in cracks

Legend body-plan target, L defined above: head .32L, neck .08L, arms1.5L, hindlegs .75L, tail0; shoulder width .9L. Upper-body mass dominates; stone arm must not float. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Organic/stone material boundary, rough fractured surface patches, beard bundles, asymmetric hand/contact and moss sockets.

Actual inspection / choice: B is readable but its beads become generic jewellery; C hides much of the body behind cupped hands and the light. A is the clearest evolved troll, though stone weight/contact still needs rig validation.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.
