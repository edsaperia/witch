# featheredserpent: skeleton reference target

Status: phase 1 proposal for skeleton #1866; reviewed as a concept reference, not accepted game art. No game changes.

## Reads as / identifying checklist
Feathered, limbless serpent.
- Continuous S-shaped limbless spine
- wedge-shaped snake head
- narrowing tail
- feather neck ruff
- avian crest
- paired adult feather wings
- wingless hatchling

## Body plan and mass
Let L be the axial trunk length from neck base/shoulder station to pelvis/vent, excluding neck, head and tail. Proposed model-space lengths relative to L: head .12; neck .20; legs 0; tail .45. These are design starting points, not photo measurements; foreshortening in the generated sheet must not set rig lengths.

Continuous axial mass, broadest midbody; no mammal chest/hips. Wing roots load the anterior trunk. Juvenile proportions must be authored independently, not a uniform adult shrink. Use larger head relative to its own trunk, age-specific ornament/wing omission, and shorter muzzle.

## Reference evidence and actual comparison
[Generated ground concept plate](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/featheredserpent/reference-v1.png): upper row adult, lower row age0; columns intended standing towards, walking towards, standing away, walking away. All are synthetic fantasy concepts, not photographs. Actual inspection: The sheet preserves a continuous body and wingless young. Wings become ambiguous layered ruff in front views; do not copy that attachment. Juvenile crest remains too adult-like.

Real photographs were downloaded and visually inspected for borrowed anatomy, comparison only. No Commons media is committed, published with these plates or imported into game:
- [Python_Regius.jpg](https://commons.wikimedia.org/wiki/File:Python_Regius.jpg): Coiled python: continuous taper, wedge head and narrow neck; coiling prevents precise axial measurements.
- [Golden_Eagle_Gliding.jpg](https://commons.wikimedia.org/wiki/File:Golden_Eagle_Gliding.jpg): Gliding eagle: layered wing feathers and outer primaries, hooked beak. One tip is cropped; no span measurement or flap/landing evidence.

Mythical combinations, horns, added heads, wings and magical materials have no real-species proof. The photos validate only the visible borrowed structures described above.

## Ground and flight pose requirements
Feather wings; flight body extended along path with undulating trailing tail, head forward; no invented legs. Ground coils/slithers with wings folded.

For any approved winged form: require multiple visibly distinct flap phases (upstroke, downstroke and intermediate), held-wing glide/soar, fully folded standing/walking or perched state, and takeoff/landing transitions for grounded-until-attack behavior. Inspect rooted wing joints and fanned primaries in flight and ground views. A still plate is not animation, aerodynamic validation or runtime proof. See [flight addendum](l9-flight.md).

## Top three priorities
1. Preserve limb-free undulation
2. separate ruff from head
3. make folded wings distinct from feathers

## MISSING GRAPH FEATURES
Flexible many-station spine and local rotating frames; feather fans with articulated elbow/wrist; age-specific wing omission.

Baseline audit: prototype 524b0acaa, art/body-graph/graph.js. The graph already has head/leg/wing/tail/shell socket labels: do not request those tags again. Legs build a fixed-family three-point chain; tail builds a chain; other tags currently build ellipsoids. Nested sockets and rotating local attachment frames are noted as future work. These are gaps against that audited baseline, not a claim about uninspected later #1866 commits.

## Camera and provenance
art/model3d.js uses x forward/y up/z near side, PITCH .52rad (29.8deg down), YAW towards .6rad and away -.6rad (34.4deg from side). Generated views approximate those values; perspective, exact heading and pose cannot be certified by prompting. Live config/tuning.json ground camera 26–42deg is a separate view. No render/pixel calibration was performed.

Tool: image_gen.imagegen, 7 November 2026. Exact requested prompt is preserved with the plate in [provenance.json](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/featheredserpent/provenance.json). Eight-panel layout and requested angles are intentions, with the inspection limitations above overriding the image.

## Current #1866 boundary (supersedes baseline-only gap wording)
Read-only audit at ed9e35cb733f72944677efcd80b46eb13c4229e0: graph.js now includes neck chains, parent sockets, u/v/r attachment guides, optional raised heel, per-segment limb radius profiles and triangular membrane sockets. Do not request those primitives again. Rotating spine frames remain future work. Generic wing/head/shell tags still compile to ellipsoids; species-ready facial/feather/hand/ornament assemblies and contact-aware flight remain the handoff concerns. Parented neck chains make hydra topology possible; independent pose/branch assembly and visual validation remain unverified. See [current graph audit](l9-graph.md).

## Previous iteration: legend concepts and v1 pick

![Three concepts A/B/C left to right](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/featheredserpent/legend-concepts-v1.png). Synthetic imagegen proposals, 7 November 2026, exact prompt in provenance.json. Approximate camera, plain background; not calibrated game art.

Area story: step pyramid with serpent balustrades in mossy paving, jungle kapoks and figs. Source art/areas.js incorporates AREA_RECIPES; see art/areas/step-pyramid/recipe.js text. ART-GUIDE0b/0c applies with later1476#6707992824 correction: fit and variety; crystals/flames/spirit wings allowed.

**Proposed pick A; signature element: Turquoise fire at worn plume tips.** The temple serpent magnifies its own ruff and crest; plume-tip fire repeats its existing temple legend, rather than adding an unrelated crystal crown. The old clasp is an offering, not body armour. Ed judges the pick; no implementation or activation.

Legend checklist:
- Towering swept crest
- S-neck and limbless coils
- separated feather wings
- ragged regrown quills
- turquoise fire restricted to tips
- old bronze clasp

Legend body-plan target, L defined above: head .12L, neck .30L, tail .65L, legs0; crest height .45L, wingspan1.8L. Continuous low coils balance the raised front. These are proposed ratios, not measurements.

Legend MISSING GRAPH FEATURES / unverified assembly: Feather fan/crest assemblies, bounded tip-emission masks, worn quill variation, head/neck-local clasp socket.

Actual inspection / choice: B has attractive stepped patterns but risks reading as a woven carpet; C becomes a literal roof/armour panel. A keeps feathers identifiable. The generated flame height is stronger than needed; reduce it so plumage remains the main form.

Today's comparison: current source design is recorded in the genome at prototype524b0acaa. Fresh exact-SHA current legend image requested from coordinator in PR1905#6708054195. The review board marks this slot pending until supplied; historical sprites or generated substitutes are not labelled current game output.

## Revision 2: colossal fantasy target (current proposal)

Supersedes v1 legend pick/body-plan for this second pass. Full1476#6708227119 and6708229124, ART-GUIDE0b/0c and DESIGN.md Art direction; [method](l9-scale-method.md). Earlier anatomy/flight targets and v1 history remain intact.

![featheredserpent three revised concepts with hero and approximate game views](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/featheredserpent/legend-concepts-v2.png)

A/B/C columns; top hero, bottom game-camera approximation. C is explicit MAXIMUM FANTASY. Witch beside body and forest trees are scale cues in every panel. Intended above-treetop giant/about20x baby height per DESIGN; no baby shown, exact ratio not measured. No runtime size change.

**Current proposed pick C; SIGNATURE ELEMENT: Burning feather sun-calendar over temple coils.** The serpent becomes the temple calendar itself: immense feather ruff, fiery turquoise vanes and terrace-like coils preserve its limbless feathered nature while making the jungle guardian impossible. Ed judges the pick.

Revised legend checklist:
- Limbless emerald coils
- gold belly
- vast feather sun-calendar ruff
- paired feather wings
- turquoise tip-fire
- weathered temple offerings
- long streamer tail

Revised body plan, L as defined above: neck .4L, head .12L, tail .8L, legs0; ruff diameter .9L, span2.5L; low heavy coils support raised neck. These are modeling proposals, not measured image ratios or runtime dimensions.

Revised MISSING GRAPH FEATURES / unverified assembly: Radial feather fan and bounded tip emission, wing fold, surface-local temple offering mounts and varied feather wear. Existing neck/parent/membrane/heel primitives remain acknowledged; this is a semantic target, not a request to recreate them.

Actual inspection / A–B–C choice: Witch and trees visible in all six panels, and bottom views expose coils/terraces. A remains an old decorated serpent; B becomes textile-like historical streamers; C most strongly ties impossible feathers to temple ritual. Hero wings/crest reach panel edges and lower right wing tip clips; bottom projection is approximate and still scenic. Temple terraces can obscure where scales end and stone begins; keep live serpent continuity explicit.

[Exact initial/revision prompts and provenance](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/featheredserpent/provenance-v2.json). [Lane signatures and repeat rationale](l9-legends-v2.md). Current-game comparison still awaits exact-SHA pixels; the generated bottom row is a projection proposal, not that comparison.
