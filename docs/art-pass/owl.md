> Current legend direction: second-pass colossal/fantasy concepts below supersede the restrained first-pass pick. Prior anatomy/flight targets and plates are preserved.

# owl: skeleton target

Target: **Spotted owl (Strix occidentalis)**. Real anatomy wins over both generated images and today's sprite.

[Generated eight-view reference sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/reference-sheet.png)

## Identifying checklist

1. Round facial disc with a dark rim, not a mammalian muzzle.
2. Dark forward-facing eyes, separated by a small hooked bill.
3. Rounded crown WITHOUT biological ear tufts.
4. Compact deep feathered trunk, shoulders merging into the head.
5. Chocolate-brown back and folded wings with white spots.
6. Broken pale chest barring rather than a solid white bib.
7. Short feathered lower legs ending in grasping talons.
8. Short layered tail beneath the folded wings.

## Body plan

B=trunk length along the main chest-to-rump axis, excluding neck/head/tail; for upright penguin measure along its near-vertical torso. Ratios below are deliberately approximate ART TARGET ranges from visual anatomy reasoning, not biological measurements or pixel measurements of generated panels. They apply to adult unless young/chick stated.

- head diameter .45–.60; young .60–.75 ×B.
- visible leg .15–.25; young .15–.22 ×B.
- neck external .05–.12, largely hidden in feathers ×B.
- tail beyond rump .25–.40; young .15–.25 ×B.

Bulk sits in the deep chest and broad head; down increases the owlet silhouette without lengthening its skeleton.

## Real-photo cross-check and generation critique

Comparison-only [Commons gallery](https://commons.wikimedia.org/wiki/Strix_occidentalis) and [specific photo](https://commons.wikimedia.org/wiki/File:Northern_Spotted_Owl.USFWS.jpg) reviewed2026-11-07; photos stay outside the PR and image publication. The generated round disc, dark eyes and white spots match the inspected USFWS photo. The sheet exposes more leg than the perched photograph; do not infer leg lengths from that photo. Generated owlet spotting is too adult-like for an early down stage. Individual toe arrangement is not reliable. Real spotted owls have no ear tufts; current levels1–3 intentionally add them, which must remain an explicit fantasy layer, not anatomical truth.

## Age and fantasy scope

All four use avian template level0 size curves; owl additionally defines down/no tufts at0, spots at1, bars/disc rim at2 and cloak/eye-ring fantasy at3. Mobile owlet reference is an age0 drawing target, not a newly hatched bird. Legend borrows owl anatomy, with moonlit cloak and glowing eye ring separately authored.

## Camera, age and graph audit

Audited prototype524b0acaa. `art/model3d.js` exports PITCH=.52rad (29.79°) and YAW towards=.6/away=-.6rad (±34.38°); model axes x forward/y up/z across. Generated sheets request those approximate views, not calibrated projections. Eight panels: adult top, mobile young bottom; standing-towards, walking-towards, standing-away, walking-away. Generation cannot guarantee orthographic projection, exact yaw, joint placement or temporal gait continuity; labels are not proof. These are targets, not shipped-art comparisons or accepted graph candidates.

`art/genome/templates.js` avian uses head sizes[.48,.36,.36,.36], headY[.95,1.08,1.08,1.08] and alternating offsets[0,.5]. `art/genome/index.js` merges each level's overrides. Age0 means the game's mobile youngest stage, not biological hatch-day anatomy.

`art/body-graph/graph.js` supports head/leg/wing/tail/shell sockets, overlapping spine ellipsoids and tapered tail chains; head/wing/shell currently compile as ellipsoids. Leg families are plantigrade/digitigrade/hoof with fixed knee/foot recipes, not an avian foot adapter. `fixtures.js` explicitly calls wings placeholders. `gait.js` has straight-line alternating limb posing; it does not establish a bird-specific walk. Gaps below distinguish missing specialized behavior from existing generic socket names. No source edits requested in this lane.

## Missing graph features

Facial-disc surface and bill/talon attachment semantics; independently articulated feathered wings and tail fan. A generic wing socket already exists, so wings themselves are NOT missing.

Top three priorities: round disc/no biological tufts; compact chest/head ratio; taloned feet. This is a target checklist, not a claim today's sprite fails each item or that a new graph bird is implemented. No exhaustive shipped-look critique performed, per later ruling1476#6707758462.

## Provenance

Generated2026-11-07 with built-in image_gen.imagegen (imagegen skill, no API service or key). One generation for this sheet; original PNG preserved, no retouching. SHA256: 7f25168ec93732c355d61b3a469b7d6255c7e939aaf9519be22a31d573897409. Tool does not expose a stable model revision or random seed; none invented. Whole bodies and eight requested panels inspected. Camera/perspective match is approximate, particularly heron/penguin; do not use this as a metric camera test.

Exact prompt:

> Photoreal natural history anatomy reference contact sheet for Spotted owl Strix occidentalis, rounded head WITHOUT ear tufts, dark eyes, chocolate brown and white spotted plumage, round facial disc; downy owlet with oversized head. Plain warm grey seamless background, soft neutral daylight, entire bird including all toes and tail inside every panel. Eight separated panels, 2 rows by4 columns. TOP adult: standing towards, walking towards, standing away, walking away. BOTTOM mobile young: same four views. Fixed orthographic-like long lens camera looking DOWN30 degrees. Bird longitudinal axis primarily left-right on sheet, turned35degrees towards viewer in towards panels and35degrees away in away panels; not front-on portraits. Exactly two legs and two wings, natural avian joints, realistic species anatomy. Modest natural walking step not running, wings folded (penguin flippers resting). Each specimen isolated same scale within its age row. No scenery, no decorative graphic, no fantasy features, no clipped feet. Small panel labels adult/young and towards/away standing/walking. Generated scientific target illustration, not game sprite.

## Review status

Reference/target document complete for coordinator review; biological/photo and generated-view limitations above remain explicit. No game-size likeness acceptance, exact-camera validation, source change, game text change or production migration claimed. Graph implementation remains with1866 owner; next condition is coordinator review and that owner's species batch after the six-species gate.

## Flight and folded-ground follow-up (7 November)

Exact instruction:1866#6707952715, updated2026-11-07T14:06:43Z. [Generated adult flight/ground pose sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/flight-targets.png); earlier eight-view standing/walking sheet remains valid separate evidence.

### Posture and wing type

Compact torso follows the flight path; head projects forward, legs and talons tucked against the belly during travel. Short broad tail steers; broad rounded feathered wings retain separated primaries, not bat finger rays. Ground/perch has folded wings against the flank and gripping feet.

### Flap, glide and transitions required from the graph

Require distinct mid-upstroke, raised reversal, mid-downstroke and lowered reversal targets (at least four recognizable phases as an initial review target, not Ed-mandated frame count), plus held-wing glide/soar. Enough interpolation/frames must read as flapping at native game size; two alternating wing pictures alone do not establish this. Head/torso/leg posture must remain coherent throughout the cycle. Grounded/perched hold is separate from glide.

Perch/ground → crouch and unload toes → push off and open wings → first powered downstroke → level flight. Landing reverses the balance: flare wings/tail, extend talons toward contact, grip/absorb, then fold wings.

Grounded-until-attack is a required available state path if gameplay assigns it; this documentation does not change attack behavior. Age0 mobile-young references are not permission to make an unflighted nestling fly. Flight-ready young need species-appropriate feather growth; adult sheet is not proof of age0 flight.

### New missing-feature requirements

Feathered articulated wing surface with separately fanned primaries and folded storage; torso/path orientation independent of standing; tucked/trailing leg posing; distinct flap/glide/ground states with phase-continuous takeoff/landing and support/contact switching. Existing generic wing sockets are not absent; missing are these specialized shapes/pose transitions and an accepted bird adapter. The reported bat membrane/finger-ray two-frame work in1866 is a separate wing kind, not evidence that feathered birds already pass.

### Cross-check and limits

Spotted-owl ground photo remains the inspected USFWS comparison. [NPS spotted-owl natural history](https://www.nps.gov/articles/000/california-spotted-owl.htm) describes large wings and alternating short glides/quick wingbeats; [USFWS species notes](https://www.fws.gov/species/mexican-spotted-owl-strix-occidentalis-lucida) describe barred flight feathers. No exact-species airborne Commons photograph was retrieved in this pass. Supplementary comparison-only real flight photograph: [Wilderness Committee, Keepers of the spotted owl](https://www.wildernesscommittee.org/news/keepers-spotted-owl), flight photograph credited in its source context; viewed locally without publication/import. It shows broad barred wings, separated rounded primaries, forward-facing disc and feet tucked beneath the belly; generated sheet agrees in those broad cues. This is an explicitly non-Commons supplementary source; Commons ground comparison remains above. It does not validate every generated phase or contact.

Generated up/down/glide are readable broad-wing pose suggestions; extreme wing tips and feather counts are not validated. Camera angle varies and the push-off lacks a visible support/contact. Do not copy it as contact physics. No flap-cycle, transition, timing, collision or runtime proof is supplied; all are graph review targets.

Flight-sheet provenance: built-in image_gen.imagegen,2026-11-07; one generation, original PNG unedited; SHA256 19c56fdbfd7f6ce11a4ab4d27616b7ab6f2eb7805dc22e3f1d0554fe89918c4a. Six adult panels inspected; exact camera and contact accuracy are not guaranteed.

Exact flight-sheet prompt:

> Photoreal natural history target sheet of Spotted owl Strix occidentalis, round head no tufts, broad rounded feathered wings with separated primaries, short tail, legs tucked. Six panels in2rows3columns: top row adult airborne upstroke, downstroke, held-wing glide; bottom row folded-wing grounded/perched, takeoff push-off, landing feet-forward flare. Entire bird and all wings/tips/feet in frame with generous margins, plain warmgrey background, soft daylight. Camera looking down30degrees, body predominantly left-right angled35degrees towards viewer, consistent wholeanimal scale. Flying torso level along path and head forward; feathered wing elbows/wrists naturally articulated, primaries visibly fanned. Exact2wings2legs, no mammal arms. Grounded wings truly folded. This is a set of anatomical pose targets not a validated animation sequence. No fantasy or scenery. Small accurate pose labels.

## Legend concepts (new7November brief)

Authority1476#6707981581, corrected by6707992824: fit and VARIETY, not a blanket ban on crystals/flame/spirit wings. Source ART-GUIDE0b/0c and historical legend-audit read. All are proposed concepts; Ed judges the pick, no implementation/activation.

[Three concepts A/B/C](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/legend-concepts.png): Henge listener / Moon witness / Stone vigil.

### Area and animal story

art/areas.js stone-shrine text: grassy/stony floor, mossy henges, little/big stones and a shrine; current roster also places the spotted owl in cold rainforest. The target combines the shrine association with the quiet forest listener, without attaching a tree to its back.

### Previous-iteration pick: A — Henge listener

It makes the owl’s own extraordinary listening and facial disc feel ancient and powerful. Worn feather edges and a healed bill scar carry age; a great quiet disc is mysterious without borrowing a universal crystal crown. The spirit-wing alternative is allowed, but less specific than the animal’s own listening apparatus; the stone collar is plausible yet weaker in silhouette.

Signature element: **Exaggerated concentric listening disc**.

### Chosen legend checklist

1. Spotted-owl family remains clear: dark eyes, hooked bill, round disc and spotted folded wings.
2. Disc substantially wider and deeper than the adult, formed of feathers not a stone helmet.
3. Concentric feather bowls create a listening silhouette without extra literal eyes.
4. Silver worn feather edges and healed bill scar suggest age rather than decay.
5. Heavy chest and large gripping talons support the enlarged head.
6. Grounded folded cloak and flight feather articulation remain compatible.

### Legend body plan and graph needs

B=trunk length. Proposed legend disc diameter .85–1.10B versus adult .45–.60B, head carried low-forward on a short concealed neck; trunk remains compact/deep. Feather bowl must clear the wings and feet in ground and glide. These are proposed art ratios, not accepted anatomy.

Missing/needed graph features: Radial feather-disc surface/attachment, layer-specific wear and scar masks; adjustable head/neck counterbalance; cloak wing fold and primary fan. No extra biological ears required. Jewellery sockets optional only for rejected conceptC. These are requirements for graph1866, not edits to current handwritten art.

### Today comparison (source-labelled, raster pending)

Current source at524b0acaa: genome levels3 adds cloak, swept-back tufts and dish/disc rim; owl3d scales the disc1.75 and eyes1.45, plus moonlit wing edges. Historical audit flags the shared eye ring; current source, not that old audit alone, defines today. No current raster beside concepts yet. The required side-by-side contact sheet must use a real source-labelled current legend PNG, never a generated imitation labelled today. Canonical cloud evidence requested in1901#6708035999; independent concepts are complete, comparison montage remains pending that evidence.

### Variety check

Inspected available other-lane local summary documents on7November before final selection; L1/L9 summaries had no signature-element picks yet. No claim of all-lane uniqueness: canonical will check cross-lane spread when their picks exist. Within L6, owl disc / raven hoard / heron throat reflection / penguin song-and-chick are different signatures. Raven and penguin both use objects, but raven’s mismatched found keys in hackles express collecting, while penguin’s shore offerings express rookery worship; keep those distinct or reduce the penguin ornaments if spread review finds excess jewellery.

Legend sheet provenance: built-in image_gen.imagegen,2026-11-07, one three-concept generation, no retouching; SHA256 2299fe42a0ba23c7c3064ed129335f37f1f2ea7e522c556b5db56a711e281ece. Whole-creature panels inspected; photoreal fantasy design, camera pitch approximate, not graph/game output.

Exact legend prompt:

> Create one polished photoreal-fantasy creature concept comparison sheet, THREE distinct whole-creature panels A B C, plain neutral warm grey background, no environment. Species owl, clearly recognisable bird anatomy, camera looking down30degrees and longitudinal axis turned35degrees towards viewer, orthographic-like long lens, every toe/wing/tail visible inside margins. Each concept ancient wise powerful and mysterious, evolved silhouette not merely adult enlarged; distinct designs, no common uniform. A: Henge listener: gigantic rounded facial disc feathered like concentric sound-catching bowls, silver worn feather edges, one old healed bill scar; quiet moss-tone spotted owl with folded cloak wings, no added eyes; ancient shrine guardian whose listening is power. B: Moon witness: spotted owl with translucent spirit-wing echoes precisely following its own feather fans, not extra limbs; old barred cloak and weathered dark disc, shrine moon oracle. C: Stone vigil: massive spotted owl with worn stone prayer collar and battered small bronze brow ornament, deep chest and huge talons, no horns; guardian of mossy henges. Small A B C labels only, no prose. Grounded poses. Animal-specific nature and area story must drive optional magic/jewellery. These are proposed legend targets, not today's game sprites.

## Colossal maximum-fantasy revision (7November)

Authority1476#6708227119 and later6708229124, overriding strict plain-background/no-scale-props for these revised concepts. Source ART-GUIDE0b/0c, DESIGN (legend about20times baby height and above treetops), area story above.

[Three revised concepts, hero and game-camera rows](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/legend-scale-v2.png). Top A/B/C: near-ground hero. Bottom A-game/B-game/C-game: generated approx30degree downward views of the same design ideas. Each panel includes witch plus forest trees. These are generated concepts, not actual game screenshots.

### Current proposed pick — C: Time-Seer

The owl’s forward-looking face becomes impossible sight across epochs. A and B remain valid quieter choices: A exaggerates listening, B uses spirit-feather memories. C carries the clearest maximum-fantasy distance from an ordinary old owl, while its two natural eyes, hooked bill, barred chest and folded wings still read as owl.

Signature element: **Concentric feather disc showing different times**. Ed judges; no approval/activation inferred.

Chosen legend checklist: Protect the round feather disc and two natural eyes; keep multiple dawn/night bands inside the disc rather than generic extra eyeballs; shoulders become old feather strata with small shrine ledges; scarred talons support immense chest; tiny witch and henges sit below the feet; upper body exceeds forest canopy.

Body plan: Trunk remains a deep owl mass, not a thin pillar. Disc .9–1.2B, massive layered shoulder mantle1.3–1.6B wide; B is chest-to-rump. Model whole height about20 own baby heights per DESIGN, not20 witch heights. Apparent illustration ratios are not calibrated geometry.

New graph requirements: Concentric feather-disc layers with bounded time/light material; feather strata/overgrowth masks; shrine attachment sockets aligned to curved mantle, silhouette LOD and colossal bounds/culling; giant posture must retain flight/ground state compatibility.

### Actual image inspection and limits

All6panels contain witch and trees; head exceeds canopy and ground bodies are legible. C-game shows the disc from above, but some terrain/time bands change between hero and game rows: these are matched design variants, not identical geometry. A/B eyes are paler than spotted-owl anatomy; selectedC keeps dark natural eyes. Spirit echoes can approach panel edges; no exact camera/scale proof.

The six panels are independent generated views, not exact multiview reconstruction. Witch/tree cues establish intended colossal size; there is no baby specimen in every panel and no metric20:1 proof. Future graph output must measure that ratio against the species age0 model. No native-size gameplay/readability/performance claim.

### Source-labelled current comparison

[Current albedo PNG](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/current-legend-albedo.png) and [side-by-side comparison](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/owl/legend-comparison-v2.png): panel1 left is actual source albedo at2x nearest-neighbor; panel2 right is the generated6panel sheet unresized. Different independent picture scales deliberately do NOT establish current versus target world scale.

Current source524b0acaa43bb9975e7b2834ff9a55cbca4b3319, confirmed equal to freshly fetched prototype for art/style/tuning at extraction; age3/frame0/towards, defaultStyle plus config/style style, explicitBold and tuningpixel3. Browser-free critter/speciesColours/bake with minimal in-memory createImageData/putImageData canvases; lossless RGBA→PNG. This is unlit albedo, not runtime lighting or proof of default artStyle. No browser/server/allocation used. Prior cloud-comparison request6708035999 is now resolved by this read-only lightweight extraction. The earlier raster-pending text is historical.

Second-pass provenance: built-in image_gen.imagegen,2026-11-07, one six-panel generation; original PNG inspected. No game rendering. SHA256 5ddb098b3a11f7534bb22cd9760bdf380c9bbf03a325c8d5f38743e19aa56fbc.

Exact scale/fantasy prompt:

> Six-panel fantasy creature design review sheet for owl. THREE distinct legend concepts A B C shown twice: top row three low-near-ground heroic views; bottom row SAME3 designs at game camera looking DOWN30degrees, heading35degrees towardsviewer from side. In EVERY panel include a clearly visible tiny adult WITCH with pointed hat beside creature's FOOT and full FOREST TREES around its feet for absolute scale. Legends roughly20times babybirdheight, roughly12witchheights and taller than trees: treetops reach about lowerhalf giant, witch tiny1/12height; do NOT draw ordinary animal-sized beside witch. Whole giant including feet/tail/wingtips inside EACH frame, generous margins. Painterly photoreal-fantasy concept art, species instantlyrecognizable, colossal landform mass and weathering not just scaledadult. Ground and sparse areaenvironment allowed, atmospheric depth on farbody, readable bold silhouette. Concepts: A Henge Listener: owl giant with enormous layered sound-catching feather disc, furrowed basalt-like brown feather mantle, moss in old feather ridges, ancient stone offerings under talons; listening makes air ripple, shrine story. B Moon Witness: owl giant whose own feathered wings have pale translucent spirit echoes showing earlier wing positions, scarred round face, moonlit bars; distinct spirit-feather memory. C MAXIMUM FANTASY Time-Seer: unmistakable spotted owl as living ancient henge, massive round facial disc contains concentric feather rings displaying different dawns/stars/time, two natural dark eyes remain; cloak wings like weathered stratified cliffs with small mossy shrine ledges, no extra literal eyeballs, animal sees across epochs. Keep bird anatomy2legs2wings. Penguin ifpresent: WEBBED feet no raptor claws. Owl ifpresent: feathered not mammal ears. Labels top A B C, bottom A-game B-game C-game. No prose. Eachconcept itsownsignature, show supernaturalpower. Everypanel mustshow witch AND trees, camera variation no detachedportraits.
