# griffin: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Eagle forequarters on lion body.
- Hooked eagle beak
- feather neck
- separate feather wing pair
- two taloned forelegs
- two feline hindlegs
- tucked waist and muscular haunches
- tufted lion tail
- juvenile wing nubs

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .30; neck .30; legs .65; tail .9; deployed wingspan 2.5. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Large chest and wing roots, narrower waist and powerful feline hindquarters. Four ground limbs remain independent of wings. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/griffin/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: Sheet reads eagle/lion and retains four legs plus wings. Adult standing wings are half-open, not a folded-ground standard. Talon counts vary; cub wings are larger than simple nubs in some panels.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [Golden_Eagle_Gliding.jpg](https://commons.wikimedia.org/wiki/File:Golden_Eagle_Gliding.jpg): Gliding eagle: layered wing feathers and outer primaries, hooked beak. One tip is cropped; no span measurement or flap/landing evidence.
- [Lion_walking_(rbm-QP301M8-1887-722).jpg](https://commons.wikimedia.org/wiki/File:Lion_walking_(rbm-QP301M8-1887-722).jpg): Muybridge lion walking sequence: forequarter bulk, haunches, hocks, tuft tail and changing foot support. Small frames limit digit detail.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
Feather wings; level/path-angled torso and forward eagle head in flight, four legs tucked/trailing. Ground stands/walks on talons and paws with wings folded.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Separate six appendage roots
2. make beak/talons readable
3. articulate feather wing folds

## MISSING GRAPH FEATURES
Independent foreleg/wing socket frames; beak and talon digits; feather primary fans and wing folding; feline hocks and tuft tail.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/griffin/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Previous iteration: legend concepts and v1 pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/griffin/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: wind-bent cedar and pine peaks and great nest on high ledge. Source art/areas.js incorporates AREA_RECIPES; see art/areas/eyrie/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Weather-beaten sail wings.** The high eyrie’s ancient guardian has survived mountain winds: huge wings with worn and regrown primaries, a swept white crest, scarred gold talons. Power comes from flying anatomy, not a common halo. Ed judges the pick; no implementation or activation.

Legend checklist:
- Eagle beak/head
- old white crest
- vast ragged feather wings
- independent taloned forelegs
- lion hindquarters/paws
- tuft tail
- chipped golden talons

Legend body-plan target, L defined above: head .3L, neck .35L, legs .65L, tail1.0L; deployed span3.2L, crest .35L. Chest/wing roots heavy with feline haunch counterweight. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Independent feather wing fan/fold, varied worn/regrown primaries, talon digits/surface scars; four legs remain separate from two wings.

Actual inspection / choice: B’s golden repaired wing is a good alternative but its single dominant fan obscures the far wing; C becomes a ring-holding upright mascot. A best expresses the wind and nest guardian. Wing tips approach panel borders; full spread needs a dedicated margin-safe rig review.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.

## Revision 2: colossal fantasy target (current proposal)

Supersedes v1 legend pick/body-plan for this second pass. Full1476#6708227119 and6708229124, ART-GUIDE0b/0c and DESIGN.md Art direction; [method](l9-scale-method.md). Earlier anatomy/flight targets and v1 history remain intact.

![griffin three revised concepts with hero and approximate game views](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/griffin/legend-concepts-v2.png)

A/B/C columns; top hero, bottom game-camera approximation. C is explicit MAXIMUM FANTASY. Witch beside body and forest trees are scale cues in every panel. Intended above-treetop giant/about20x baby height per DESIGN; no baby shown, exact ratio not measured. No runtime size change.

**Current proposed pick C; SIGNATURE ELEMENT: Stormcloud and lightning carried by feather primaries.** The eyrie’s eagle-lion guardian becomes the storm over its own nest: feather wings contain cloud bands and lightning, while heavy lion haunches anchor it to mountain stone. Ed judges the pick.

Revised legend checklist:
- Hooked eagle beak
- white feather crest
- huge separate feather wings
- storm bands/branching lightning at primaries
- taloned forelegs
- lion hindquarters/paws
- tufted tail

Revised body plan, L as defined above: head .3L, neck .35L, legs .7L, tail1.0L; deployed span3.8L; massive chest/wing root and heavy feline haunches. These are modeling proposals, not measured image ratios or runtime dimensions.

Revised MISSING GRAPH FEATURES / unverified assembly: Articulated feather fan/fold, bounded cloud/lightning surfaces following primaries, talon digits and scar masks; retain four ground limbs separate from wings. Existing neck/parent/membrane/heel primitives remain acknowledged; this is a semantic target, not a request to recreate them.

Actual inspection / A–B–C choice: All six panels visibly include witch and trees. C retains eagle beak, crest, feather primaries, gold foretalons and lion tail, with rocklike haunch mass and storm-bearing wings. A is a worn wing elder; B emphasizes the nest offering but stands too upright in hero view. C is strongest fantasy while bottom C still reads griffin. Some hero and bottom wing tips crop at panel edges; crouched C obscures far limbs and does not verify all four contacts. Cloud bands must not replace feather structure.

[Exact initial/revision prompts and provenance](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/griffin/provenance-v2.json). [Lane signatures and repeat rationale](l9-legends-v2.md). Current-game comparison still awaits exact-SHA pixels; the generated bottom row is a projection proposal, not that comparison.
