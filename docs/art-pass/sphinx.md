# sphinx: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Lion body with human face and nemes.
- Flat humanlike face
- striped nemes headcloth
- proud short neck
- lion trunk
- four digitigrade paws
- tufted tail
- small adult feather wings
- cub without beard/wings

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .30; neck .25; legs .65; tail .9; deployed wingspan 1.8. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Broad lion chest and haunches, tucked waist; headcloth must not replace neck support. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/sphinx/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: Sheet distinguishes cub/adult and shows lion haunches, paws and tail. Adult face is oversized and stern; headcloth too large. Small wings read as ornamental shoulder feathers, not functioning folded wings.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [Lion_walking_(rbm-QP301M8-1887-722).jpg](https://commons.wikimedia.org/wiki/File:Lion_walking_(rbm-QP301M8-1887-722).jpg): Muybridge lion walking sequence: forequarter bulk, haunches, hocks, tuft tail and changing foot support. Small frames limit digit detail.
- [Golden_Eagle_Gliding.jpg](https://commons.wikimedia.org/wiki/File:Golden_Eagle_Gliding.jpg): Gliding eagle: layered wing feathers and outer primaries, hooked beak. One tip is cropped; no span measurement or flap/landing evidence.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
Feather wings for the winged adult target; head forward and torso level in flight, paws tucked/trailing; four grounded paws, folded wings when standing/walking. Wingless cub has no flight target.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Keep lion gait/mass
2. build flat human face/headcloth silhouette
3. distinguish small folded wings from shoulder decoration

## MISSING GRAPH FEATURES
Flat facial plane/ears; cloth side lobes and adult beard; articulated feather wings; digitigrade paws and tail tuft.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/sphinx/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Previous iteration: legend concepts and v1 pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/sphinx/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: buried sandstone city, tumbled columns and fallen colossus head under dunes. Source art/areas.js incorporates AREA_RECIPES; see art/areas/desert-ruin/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Living sandstone weathering.** The guardian of the buried city has weathered like its fallen colossus yet remains alive and watchful. An eroded face and worn torc imply epochs of riddles, while lion paws and feather wings preserve family. Ed judges the pick; no implementation or activation.

Legend checklist:
- Lion trunk/four paws
- wise human face
- striped worn nemes
- eroded sandstone surface
- brow cobra
- worn torc
- folded feather wings
- tuft tail

Legend body-plan target, L defined above: head .30L, neck .25L, legs .65L, tail .9L, folded wing length .7L. Broad chest/haunches remain animal masses, not a single block statue. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Flat face/nemes/cobra assemblies, surface erosion/crack masks, torc socket, folded feather fans, paw digits.

Actual inspection / choice: B is patient and leonine but less fantastical; C becomes decorated armour with too much geometric feather carving. A ties directly to the ruined city. Generated forelegs are too tall and face/headcloth too large; proposed ratios override the sheet.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.

## Revision 2: colossal fantasy target (current proposal)

Supersedes v1 legend pick/body-plan for this second pass. Full1476#6708227119 and6708229124, ART-GUIDE0b/0c and DESIGN.md Art direction; [method](l9-scale-method.md). Earlier anatomy/flight targets and v1 history remain intact.

![sphinx three revised concepts with hero and approximate game views](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/sphinx/legend-concepts-v2.png)

A/B/C columns; top hero, bottom game-camera approximation. C is explicit MAXIMUM FANTASY. Witch beside body and forest trees are scale cues in every panel. Intended above-treetop giant/about20x baby height per DESIGN; no baby shown, exact ratio not measured. No runtime size change.

**Current proposed pick C; SIGNATURE ELEMENT: Buried-city reliefs and star-bearing lapis nemes.** The buried city becomes the sphinx’s living history: worn reliefs and shrine niches are grown into a lion-shaped sandstone body, while the dark lapis headcloth holds the sky it has watched for epochs. Ed judges the pick.

Revised legend checklist:
- Four lion paws and lion trunk
- wise human face
- striped star-bearing lapis nemes
- ancient relief-carved sandstone
- shrine niches on flank
- feather wings
- tufted tail

Revised body plan, L as defined above: head .30L, neck .25L, legs .65L, tail .9L; wingspan2.4L. Keep heavy lion chest/haunches and tucked waist, not horse-like long forelegs or a thin architectural beam. These are modeling proposals, not measured image ratios or runtime dimensions.

Revised MISSING GRAPH FEATURES / unverified assembly: Surface relief/weathering masks, bounded nemes starfield, part-local shrine niches/torc/cobra, flat human face and articulated feather fans. Existing neck/parent/membrane/heel primitives remain acknowledged; this is a semantic target, not a request to recreate them.

Actual inspection / A–B–C choice: All panels contain witch and desert trees. C clearly adds impossible history and star-bearing nemes; A is an eroded guardian and B a patient couched colossus. Lower C retains four paws and lion tail but its trunk is too narrow and forelegs too long; body-plan targets override those synthetic proportions. Upper C wing tip clips; lower projection is approximate. Full lion mass and wing-root articulation remain unverified.

[Exact initial/revision prompts and provenance](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/sphinx/provenance-v2.json). [Lane signatures and repeat rationale](l9-legends-v2.md). Current-game comparison still awaits exact-SHA pixels; the generated bottom row is a projection proposal, not that comparison.
