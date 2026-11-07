# unicorn: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Anatomical horse with a single brow horn.
- Horse head profile
- single midline brow horn
- long supported neck
- solid single hooves
- distinct carpus and hock
- mane
- muscular hindquarters
- long-legged foal

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .40; neck .70; legs 1.0; tail hair .70. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Deep ribcage and substantial haunches joined by a narrower waist; legs support beneath body rather than splay. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle; unicorn foal retains disproportionately long slender legs.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/unicorn/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: Sheet has plausible horse mass and hoof silhouette. Foal is too chunky, with too much mane and a horn beyond a small nub; real foal photo wins. Exact hoof-ground contacts still need rig validation.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [Standingarabianfoalone.jpg](https://commons.wikimedia.org/wiki/File:Standingarabianfoalone.jpg): Standing foal: slender disproportionately long legs, short muzzle and small mane.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
No wings or flight requirement. Legend horn is smooth glowing gold-white per genome comment; this adult concept does not approve legend detail.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Get horse head/neck silhouette first
2. separate hock/carpus and hoof contacts
3. foal allometry and horn nub

## MISSING GRAPH FEATURES
Equine head/jaw and ears; curved horn attachment; articulated hoof chains and hocks; mane/tail hair and age-specific ratios.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/unicorn/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Legend concepts: three alternatives and proposed pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/unicorn/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: still moonlit pool, white stone ring, old cedars/spruces/alders, offerings from people healed. Source art/areas.js incorporates AREA_RECIPES; see art/areas/moonpool-glade/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Smooth healing horn with visitors’ offerings.** The first unicorn’s long smooth gold-white horn is the source of healing and reverence. Grey muzzle, goat beard and worn mane show age; beads from healed visitors carry its moonpool story. Ed judges the pick; no implementation or activation.

Legend checklist:
- Horse body/solid hooves
- one smooth gold-white luminous horn
- grey muzzle
- goat beard
- long old mane
- feathered fetlocks
- offerings from healed visitors

Legend body-plan target, L defined above: head .4L, neck .75L, legs1.0L, horn .60L, tail hair .9L. Ribcage/haunch weight remains horse-like; coat must not conceal all joints. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Smooth emissive horn and local material control, aged muzzle/scars, beard/mane/fetlock bundles, leg-local bead/cord sockets.

Actual inspection / choice: B is elegant but its reflection is a background effect; C’s scars imply survival but lose the healing-offering story. A best follows the existing first-unicorn brief. Image horn has faceted highlights that can suggest spiral; chosen target explicitly requires smooth, no spiral. Beads should stay mainly at legs per source, not all over neck.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.
