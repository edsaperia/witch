> Current legend direction: second-pass colossal/fantasy concepts below supersede the restrained first-pass pick. Prior anatomy/flight targets and plates are preserved.

# raven: skeleton target

Target: **Common raven (Corvus corax)**. Real anatomy wins over both generated images and today's sprite.

[Generated eight-view reference sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/reference-sheet.png)

## Identifying checklist

1. Heavy long arched bill, not a thin songbird beak.
2. Forehead slopes into the bill with nasal feathering.
3. Shaggy throat hackles below the bill.
4. Deep chest tapering into a long wedge-shaped tail.
5. Long layered folded flight feathers form pointed wing ends.
6. Black plumage with restrained blue-violet sheen, not blue body paint.
7. Two slim scaly legs with three forward toes and rear hallux.
8. Walking body tips forward slightly, alternating feet rather than four-legged gait.

## Body plan

B=trunk length along the main chest-to-rump axis, excluding neck/head/tail; for upright penguin measure along its near-vertical torso. Ratios below are deliberately approximate ART TARGET ranges from visual anatomy reasoning, not biological measurements or pixel measurements of generated panels. They apply to adult unless young/chick stated.

- head excluding bill .25–.35; young .32–.42 ×B.
- bill .22–.30; young .18–.25 ×B.
- visible leg .30–.45; young .28–.40 ×B.
- neck .20–.30, concealed partly by hackles ×B.
- tail beyond rump .55–.75; young .35–.55 ×B.

Chest/wing roots carry the mass forward of the hip; long flight feathers and tail add silhouette with little volume. Young target has a bigger-looking head and shorter tail.

## Real-photo cross-check and generation critique

Comparison-only [Commons gallery](https://commons.wikimedia.org/wiki/Corvus_corax) and [specific photo](https://commons.wikimedia.org/wiki/File:Corvus_corax_(NPS).jpg) reviewed2026-11-07; photos stay outside the PR and image publication. Generated heavy bill and throat hackles are plausible targets, but feather scalloping is exaggerated. The inspected Commons flight photo supports long wings and tail silhouette, not walking joints; the additional NPS standing photo confirms the bill/hackles but its feet are partly hidden, so neither photo validates walking joint placement. Young row is a fledgling, not a helpless nestling, and its pale gape is only an age cue. Towards/away panels sometimes reverse left-right direction rather than preserving exact renderer yaw.

## Age and fantasy scope

Avian template supplies level0 larger head and lower head height even though raven genome has no separate levels array. Use mobile fledgling age0 target. Hoard legend is a fantasy accessory over raven anatomy, not a separate biological bird.

## Camera, age and graph audit

Audited prototype524b0acaa. `art/model3d.js` exports PITCH=.52rad (29.79°) and YAW towards=.6/away=-.6rad (±34.38°); model axes x forward/y up/z across. Generated sheets request those approximate views, not calibrated projections. Eight panels: adult top, mobile young bottom; standing-towards, walking-towards, standing-away, walking-away. Generation cannot guarantee orthographic projection, exact yaw, joint placement or temporal gait continuity; labels are not proof. These are targets, not shipped-art comparisons or accepted graph candidates.

`art/genome/templates.js` avian uses head sizes[.48,.36,.36,.36], headY[.95,1.08,1.08,1.08] and alternating offsets[0,.5]. `art/genome/index.js` merges each level's overrides. Age0 means the game's mobile youngest stage, not biological hatch-day anatomy.

`art/body-graph/graph.js` supports head/leg/wing/tail/shell sockets, overlapping spine ellipsoids and tapered tail chains; head/wing/shell currently compile as ellipsoids. Leg families are plantigrade/digitigrade/hoof with fixed knee/foot recipes, not an avian foot adapter. `fixtures.js` explicitly calls wings placeholders. `gait.js` has straight-line alternating limb posing; it does not establish a bird-specific walk. Gaps below distinguish missing specialized behavior from existing generic socket names. No source edits requested in this lane.

## Missing graph features

Shaped bill and nasal feather attachment, layered feather surfaces with wedge tail fan, avian toe/hallux foot and hock parameters; wing socket exists but only ellipsoid placeholders compile today.

Top three priorities: heavy bill/hackles; wedge tail and wing layers; avian feet. This is a target checklist, not a claim today's sprite fails each item or that a new graph bird is implemented. No exhaustive shipped-look critique performed, per later ruling1476#6707758462.

## Provenance

Generated2026-11-07 with built-in image_gen.imagegen (imagegen skill, no API service or key). One generation for this sheet; original PNG preserved, no retouching. SHA256: a027884e4c1cd1aa22f1fbeab3e43734eebf504b98b9e734f967b9a9798effde. Tool does not expose a stable model revision or random seed; none invented. Whole bodies and eight requested panels inspected. Camera/perspective match is approximate, particularly heron/penguin; do not use this as a metric camera test.

Exact prompt:

> Photoreal natural history anatomy reference contact sheet for Common raven Corvus corax, heavy arched black bill, shaggy throat hackles, glossy black folded flight feathers, wedge tail; recently fledged young raven duller plumage shorter tail and subtle pale gape. Plain warm grey seamless background, soft neutral daylight, entire bird including all toes and tail inside every panel. Eight separated panels, 2 rows by4 columns. TOP adult: standing towards, walking towards, standing away, walking away. BOTTOM mobile young: same four views. Fixed orthographic-like long lens camera looking DOWN30 degrees. Bird longitudinal axis primarily left-right on sheet, turned35degrees towards viewer in towards panels and35degrees away in away panels; not front-on portraits. Exactly two legs and two wings, natural avian joints, realistic species anatomy. Modest natural walking step not running, wings folded (penguin flippers resting). Each specimen isolated same scale within its age row. No scenery, no decorative graphic, no fantasy features, no clipped feet. Small panel labels adult/young and towards/away standing/walking. Generated scientific target illustration, not game sprite.

## Review status

Reference/target document complete for coordinator review; biological/photo and generated-view limitations above remain explicit. No game-size likeness acceptance, exact-camera validation, source change, game text change or production migration claimed. Graph implementation remains with1866 owner; next condition is coordinator review and that owner's species batch after the six-species gate.

## Flight and folded-ground follow-up (7 November)

Exact instruction:1866#6707952715, updated2026-11-07T14:06:43Z. [Generated adult flight/ground pose sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/flight-targets.png); earlier eight-view standing/walking sheet remains valid separate evidence.

### Posture and wing type

Torso approximately level, heavy bill/head forward, feet tucked close under the belly, long tail behind. Feathered wings open at shoulder/elbow/wrist, with long separated primary tips; wedge tail fans for steering. Folded/perched state must keep the overlapping flight-feather silhouette.

### Flap, glide and transitions required from the graph

Require distinct mid-upstroke, raised reversal, mid-downstroke and lowered reversal targets (at least four recognizable phases as an initial review target, not Ed-mandated frame count), plus held-wing glide/soar. Enough interpolation/frames must read as flapping at native game size; two alternating wing pictures alone do not establish this. Head/torso/leg posture must remain coherent throughout the cycle. Grounded/perched hold is separate from glide.

Ground/perch → crouch, wing opening and leg push → powered downstroke with feet leaving support → tucked travel. Landing: raise body angle, fan tail, flare wings, bring feet forward to grip, settle and fold.

Grounded-until-attack is a required available state path if gameplay assigns it; this documentation does not change attack behavior. Age0 mobile-young references are not permission to make an unflighted nestling fly. Flight-ready young need species-appropriate feather growth; adult sheet is not proof of age0 flight.

### New missing-feature requirements

Feathered articulated wing surface with separately fanned primaries and folded storage; torso/path orientation independent of standing; tucked/trailing leg posing; distinct flap/glide/ground states with phase-continuous takeoff/landing and support/contact switching. Existing generic wing sockets are not absent; missing are these specialized shapes/pose transitions and an accepted bird adapter. The reported bat membrane/finger-ray two-frame work in1866 is a separate wing kind, not evidence that feathered birds already pass.

### Cross-check and limits

Inspected [Commons Northern Raven01](https://commons.wikimedia.org/wiki/File:Corvus_corax_-_Northern_Raven_01.jpg): actual airborne body is level, bill forward, feet tucked and primary feathers separated; this supports the target. Earlier standing NPS comparison supplies the grounded bill/hackle silhouette, with feet partly obscured.

Generated wing states must preserve raven proportions instead of replacing the bird with a generic raptor. Inspect tucked feet and wedge tail in every target; individual feather counts and generated pose labels do not establish correct joint rotation. No flap-cycle, transition, timing, collision or runtime proof is supplied; all are graph review targets.

Flight-sheet provenance: built-in image_gen.imagegen,2026-11-07; one generation, original PNG unedited; SHA256 f71f2fc06f01aa3b2028805171e0b8f57feaf7724cabfd3a752dda141444b139. Six adult panels inspected; exact camera and contact accuracy are not guaranteed.

Exact flight-sheet prompt:

> Photoreal natural history target sheet of Common raven Corvus corax, heavy bill forward, long wings with fanned primary feathers, wedge tail, legs tucked under belly. Six panels in2rows3columns: top row adult airborne upstroke, downstroke, held-wing glide; bottom row folded-wing grounded/perched, takeoff push-off, landing feet-forward flare. Entire bird and all wings/tips/feet in frame with generous margins, plain warmgrey background, soft daylight. Camera looking down30degrees, body predominantly left-right angled35degrees towards viewer, consistent wholeanimal scale. Flying torso level along path and head forward; feathered wing elbows/wrists naturally articulated, primaries visibly fanned. Exact2wings2legs, no mammal arms. Grounded wings truly folded. This is a set of anatomical pose targets not a validated animation sequence. No fantasy or scenery. Small accurate pose labels.

## Legend concepts (new7November brief)

Authority1476#6707981581, corrected by6707992824: fit and VARIETY, not a blanket ban on crystals/flame/spirit wings. Source ART-GUIDE0b/0c and historical legend-audit read. All are proposed concepts; Ed judges the pick, no implementation/activation.

[Three concepts A/B/C](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/legend-concepts.png): Keeper of lost names / Ash-memory / Storm accountant.

### Area and animal story

art/areas.js deadwood text: bare earth, broken branches and blasted dead trees. A surviving collector of lost objects and names belongs in that abandoned place.

### Previous-iteration pick: A — Keeper of lost names

The raven is revered for intelligence and collecting: a few individually worn keys/coins caught in its own shaggy throat make that nature visible. A chipped heavy bill and grizzled feathers show long survival. Ember letters and storm marks are allowed alternatives, but are less immediately tied to the collector and risk repeating fire/storm motifs elsewhere.

Signature element: **Mismatched hoard caught in throat hackles**.

### Chosen legend checklist

1. Heavy arched bill and shaggy raven throat remain primary identifiers.
2. Wedge tail and long layered folded primaries retained.
3. Sparse mismatched keys/coins are caught in hackles rather than a uniform ceremonial necklace.
4. Old scar/chip remains a healed surface cue, not broken unusable anatomy.
5. Grizzled edges and wise alert eye carry age.
6. Each offering has enough silhouette separation at game size; remove excess rather than hide the bird.

### Legend body plan and graph needs

Retain adult raven proportions and flight posture; legend chest depth .55–.70B and hackle envelope .25–.40B below bill. Keep heavy bill .25–.35B and tail .60–.85B. Trinkets no larger than .10–.18B so collecting enhances the throat silhouette instead of replacing it.

Missing/needed graph features: Feather/hackle attachment sockets for individual rigid keys, rings and coins; per-instance material wear/scars; articulated feather wings/wedge tail. Orbiting hoard, if retained later, needs its own bounded attachment/animation path; not implied by sockets. These are requirements for graph1866, not edits to current handwritten art.

### Today comparison (source-labelled, raster pending)

Current genome legend is hoard, not the old audit’s spirit-wing/eye-ring list. raven3d has grizzled head, trinkets in ruff and circling coins/rings/keys. Chosen concept evolves that animal-specific idea; it is not presented as a wholly new invention. The required side-by-side contact sheet must use a real source-labelled current legend PNG, never a generated imitation labelled today. Canonical cloud evidence requested in1901#6708035999; independent concepts are complete, comparison montage remains pending that evidence.

### Variety check

Inspected available other-lane local summary documents on7November before final selection; L1/L9 summaries had no signature-element picks yet. No claim of all-lane uniqueness: canonical will check cross-lane spread when their picks exist. Within L6, owl disc / raven hoard / heron throat reflection / penguin song-and-chick are different signatures. Raven and penguin both use objects, but raven’s mismatched found keys in hackles express collecting, while penguin’s shore offerings express rookery worship; keep those distinct or reduce the penguin ornaments if spread review finds excess jewellery.

Legend sheet provenance: built-in image_gen.imagegen,2026-11-07, one three-concept generation, no retouching; SHA256 ec03cc02e0db4fb3132c639a3978a77f441d966092c8ed8e4a6456edfb638077. Whole-creature panels inspected; photoreal fantasy design, camera pitch approximate, not graph/game output.

Exact legend prompt:

> Create one polished photoreal-fantasy creature concept comparison sheet, THREE distinct whole-creature panels A B C, plain neutral warm grey background, no environment. Species raven, clearly recognisable bird anatomy, camera looking down30degrees and longitudinal axis turned35degrees towards viewer, orthographic-like long lens, every toe/wing/tail visible inside margins. Each concept ancient wise powerful and mysterious, evolved silhouette not merely adult enlarged; distinct designs, no common uniform. A: Keeper of lost names: enormous old raven, thick scarred bill, throat hackles bound with a few mismatched human keys and river-polished coin offerings; glossy worn black wedge tail, intelligence and hoarding made sacred in deadwood. B: Ash-memory: ancient raven whose natural throat hackles emit a few emberlike letters, charcoal worn flight feathers, one pale healed wing scar; blasted-dead-tree omen, no generic fire crown. C: Storm accountant: raven with long weathered primary feathers etched by lightning scars, one tiny tarnished party bell tied at ankle; severe wise eye and huge beak, sparse blue storm glint. Small A B C labels only, no prose. Grounded poses. Animal-specific nature and area story must drive optional magic/jewellery. These are proposed legend targets, not today's game sprites.

## Colossal maximum-fantasy revision (7November)

Authority1476#6708227119 and later6708229124, overriding strict plain-background/no-scale-props for these revised concepts. Source ART-GUIDE0b/0c, DESIGN (legend about20times baby height and above treetops), area story above.

[Three revised concepts, hero and game-camera rows](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/legend-scale-v2.png). Top A/B/C: near-ground hero. Bottom A-game/B-game/C-game: generated approx30degree downward views of the same design ideas. Each panel includes witch plus forest trees. These are generated concepts, not actual game screenshots.

### Current proposed pick — C: Omen Archivist

Collecting and intelligence become an impossible power: lost keepsakes orbit the bill as a dense ominous hoard. A’s keys and B’s ember voice stay as alternatives, but C most clearly answers maximum fantasy without borrowing owl time-discs or penguin song. Its heavy bill, shaggy throat, long black wings and wedge tail remain readable.

Signature element: **Impossible hoard-gravity sphere held in the raven’s bill**. Ed judges; no approval/activation inferred.

Chosen legend checklist: Keep heavy raven bill and wedge tail obvious; hoard sphere must visibly contain lost objects, not a generic planet; preserve grizzled throat; black primary plates eroded like strata; witch remains tiny beside the toes; dead trees reach only lower body; magic originates at bill/hoard.

Body plan: Deep chest and low forward head with bill .30–.45B and tail .65–.90B. Sphere diameter .4–.6B; it must not replace or hide the bill. Scale target about20 own baby heights; foot/body support reads as colossal weight. No physics or collision scheme is specified here.

New graph requirements: Rigid offering instancing and bounded orbit/hoard anchor at bill; feather plate wear/scars; beak gape articulation independent of skull; giant bounds and reduced-detail distant representations. Sphere remains visual art target, not gameplay attraction or a new mechanic.

### Actual image inspection and limits

Witch and forest appear in all6panels and selectedC remains raven-shaped. Top-row silhouettes fill panels very tightly; some feather extremities are near edges. Hero C sphere reads stronger than C-game, where the head angle changes; retain object identity and keep max fantasy readable at actual game size later. Current albedo cannot prove giant runtime lighting.

The six panels are independent generated views, not exact multiview reconstruction. Witch/tree cues establish intended colossal size; there is no baby specimen in every panel and no metric20:1 proof. Future graph output must measure that ratio against the species age0 model. No native-size gameplay/readability/performance claim.

### Source-labelled current comparison

[Current albedo PNG](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/current-legend-albedo.png) and [side-by-side comparison](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/raven/legend-comparison-v2.png): panel1 left is actual source albedo at2x nearest-neighbor; panel2 right is the generated6panel sheet unresized. Different independent picture scales deliberately do NOT establish current versus target world scale.

Current source524b0acaa43bb9975e7b2834ff9a55cbca4b3319, confirmed equal to freshly fetched prototype for art/style/tuning at extraction; age3/frame0/towards, defaultStyle plus config/style style, explicitBold and tuningpixel3. Browser-free critter/speciesColours/bake with minimal in-memory createImageData/putImageData canvases; lossless RGBA→PNG. This is unlit albedo, not runtime lighting or proof of default artStyle. No browser/server/allocation used. Prior cloud-comparison request6708035999 is now resolved by this read-only lightweight extraction. The earlier raster-pending text is historical.

Second-pass provenance: built-in image_gen.imagegen,2026-11-07, one six-panel generation; original PNG inspected. No game rendering. SHA256 7fc79fca27ce788563bb84f3542066befb8a401cfcb994fb4a2d0149c9300aff.

Exact scale/fantasy prompt:

> Six-panel fantasy creature design review sheet for raven. THREE distinct legend concepts A B C shown twice: top row three low-near-ground heroic views; bottom row SAME3 designs at game camera looking DOWN30degrees, heading35degrees towardsviewer from side. In EVERY panel include a clearly visible tiny adult WITCH with pointed hat beside creature's FOOT and full FOREST TREES around its feet for absolute scale. Legends roughly20times babybirdheight, roughly12witchheights and taller than trees: treetops reach about lowerhalf giant, witch tiny1/12height; do NOT draw ordinary animal-sized beside witch. Whole giant including feet/tail/wingtips inside EACH frame, generous margins. Painterly photoreal-fantasy concept art, species instantlyrecognizable, colossal landform mass and weathering not just scaledadult. Ground and sparse areaenvironment allowed, atmospheric depth on farbody, readable bold silhouette. Concepts: A Keeper of Lost Names: raven colossus with huge chipped bill and shaggy throat carrying a few house-sized mismatched old keys/coins as offerings, grizzled black wings weathered into cliff strata, blasted deadwood. B Ash-Memory: raven colossus with ember glyphs escaping natural throat hackles, one ancient pale wing scar, ash-laden layered feathers; bill and wedge tail obvious, sparse fire only at voice. C MAXIMUM FANTASY Omen Archivist: unmistakable raven mountain-sized, impossible bill holds a floating black sun-like sphere made of thousands of lost shining keepsakes; giant wedge tail and long black primaries are eroded slablike feathers; deadwood trees at feet, spectral forgotten-object silhouettes orbit the beak, intelligence/hoarding becomes gravity, no owl-disc/no starcloak. Keep bird anatomy2legs2wings. Penguin ifpresent: WEBBED feet no raptor claws. Owl ifpresent: feathered not mammal ears. Labels top A B C, bottom A-game B-game C-game. No prose. Eachconcept itsownsignature, show supernaturalpower. Everypanel mustshow witch AND trees, camera variation no detachedportraits.
## Third-pass readable concepts

Two game-camera candidates replace the scene-heavy revision for this review: **A Iron Bill** (deep hooked bill, shaggy throat hackles, one worn neck torque, two scars and a small eye glint) and **B Crownscratch** (broad wedge tail, layered coverts, battered brow band, chipped tips and one bill ember mark). Pick A: bill, throat and wedge-tail silhouette read as raven before its single torque. Body-plan notes: preserve heavy bill, wedge tail, layered wings, avian feet and hock; expose only bill, torque, scar and small accent sockets.
