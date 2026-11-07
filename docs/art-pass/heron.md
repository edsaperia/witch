> Current legend direction: second-pass colossal/fantasy concepts below supersede the restrained first-pass pick. Prior anatomy/flight targets and plates are preserved.

# heron: skeleton target

Target: **Grey heron (Ardea cinerea)**. Real anatomy wins over both generated images and today's sprite.

[Generated eight-view reference sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/reference-sheet.png)

## Identifying checklist

1. Long straight dagger bill on a small narrow head.
2. Long neck folds into a clear S, not a straight mammal neck.
3. Compact narrow trunk with folded grey wings.
4. Long exposed lower legs, with the apparent backward bend being the ankle/hock.
5. Very long spreading toes supporting the wader on soft ground.
6. White/pale neck with dark longitudinal markings.
7. Adult dark crown stripe and trailing crest; immature head greyer and crest reduced.
8. Short tail under the long folded wing tips.

## Body plan

B=trunk length along the main chest-to-rump axis, excluding neck/head/tail; for upright penguin measure along its near-vertical torso. Ratios below are deliberately approximate ART TARGET ranges from visual anatomy reasoning, not biological measurements or pixel measurements of generated panels. They apply to adult unless young/chick stated.

- head excluding bill .20–.28; young .25–.34 ×B.
- bill .35–.50; young .30–.43 ×B.
- neck arc length .90–1.35; young .70–1.00 ×B.
- hip-to-ground leg chain1.10–1.50; visible .80–1.10 ×B.
- tail .15–.25; toes .25–.40 ×B.

Most bulk is the small trunk around the wing roots; neck is long but narrow and lower legs nearly threadlike. Keep the bird tall without inflating the chest.

## Real-photo cross-check and generation critique

Comparison-only [Commons gallery](https://commons.wikimedia.org/wiki/Ardea_cinerea) and [specific photo](https://commons.wikimedia.org/wiki/File:Grey_Heron_(Ardea_cinerea)-_Immature_at_Bharatpur_I_IMG_5716.jpg) reviewed2026-11-07; photos stay outside the PR and image publication. The inspected Commons immature heron shows a narrow grey body, long neck and dagger bill. Generated juvenile agrees broadly, but adult sheet neck is too tucked/short for an extended walking target and walking toes are not anatomically dependable. Use the reference as folded-neck target; the stated extended-neck ratios are design guidance, not a measurement of the generated sheet.

## Age and fantasy scope

Heron inherits avian level0 size curves without its own evolution array. Age0 is represented as a mobile juvenile, not a hatchling unable to walk. The heronry legend rests folded in reeds with a stick nest; preserve that as a separate pose/accessory target, not a change in basic anatomy.

## Camera, age and graph audit

Audited prototype524b0acaa. `art/model3d.js` exports PITCH=.52rad (29.79°) and YAW towards=.6/away=-.6rad (±34.38°); model axes x forward/y up/z across. Generated sheets request those approximate views, not calibrated projections. Eight panels: adult top, mobile young bottom; standing-towards, walking-towards, standing-away, walking-away. Generation cannot guarantee orthographic projection, exact yaw, joint placement or temporal gait continuity; labels are not proof. These are targets, not shipped-art comparisons or accepted graph candidates.

`art/genome/templates.js` avian uses head sizes[.48,.36,.36,.36], headY[.95,1.08,1.08,1.08] and alternating offsets[0,.5]. `art/genome/index.js` merges each level's overrides. Age0 means the game's mobile youngest stage, not biological hatch-day anatomy.

`art/body-graph/graph.js` supports head/leg/wing/tail/shell sockets, overlapping spine ellipsoids and tapered tail chains; head/wing/shell currently compile as ellipsoids. Leg families are plantigrade/digitigrade/hoof with fixed knee/foot recipes, not an avian foot adapter. `fixtures.js` explicitly calls wings placeholders. `gait.js` has straight-line alternating limb posing; it does not establish a bird-specific walk. Gaps below distinguish missing specialized behavior from existing generic socket names. No source edits requested in this lane.

## Missing graph features

Poseable S-neck chain with head attachment in the terminal local frame; long multi-joint avian leg/hock and spreading toes; shaped bill and crest/feather surfaces. Curved spine data exists but rotating station frames and socket-on-socket articulation are explicitly future work.

Top three priorities: S-neck/bill silhouette; long legs and toes; narrow wing-covered trunk. This is a target checklist, not a claim today's sprite fails each item or that a new graph bird is implemented. No exhaustive shipped-look critique performed, per later ruling1476#6707758462.

## Provenance

Generated2026-11-07 with built-in image_gen.imagegen (imagegen skill, no API service or key). One generation for this sheet; original PNG preserved, no retouching. SHA256: 440795097f237e9ff8f7153142c2c587de4b05e9d2b8b5d0869f09ac17f310c1. Tool does not expose a stable model revision or random seed; none invented. Whole bodies and eight requested panels inspected. Camera/perspective match is approximate, particularly heron/penguin; do not use this as a metric camera test.

Exact prompt:

> Photoreal natural history anatomy reference contact sheet for Grey heron Ardea cinerea, long dagger bill, folded S neck, grey folded wings, long thin legs and spread long toes; mobile juvenile grey heron shorter crest dull grey head, not a helpless nestling. Plain warm grey seamless background, soft neutral daylight, entire bird including all toes and tail inside every panel. Eight separated panels, 2 rows by4 columns. TOP adult: standing towards, walking towards, standing away, walking away. BOTTOM mobile young: same four views. Fixed orthographic-like long lens camera looking DOWN30 degrees. Bird longitudinal axis primarily left-right on sheet, turned35degrees towards viewer in towards panels and35degrees away in away panels; not front-on portraits. Exactly two legs and two wings, natural avian joints, realistic species anatomy. Modest natural walking step not running, wings folded (penguin flippers resting). Each specimen isolated same scale within its age row. No scenery, no decorative graphic, no fantasy features, no clipped feet. Small panel labels adult/young and towards/away standing/walking. Generated scientific target illustration, not game sprite.

## Review status

Reference/target document complete for coordinator review; biological/photo and generated-view limitations above remain explicit. No game-size likeness acceptance, exact-camera validation, source change, game text change or production migration claimed. Graph implementation remains with1866 owner; next condition is coordinator review and that owner's species batch after the six-species gate.

## Flight and folded-ground follow-up (7 November)

Exact instruction:1866#6707952715, updated2026-11-07T14:06:43Z. [Generated adult flight/ground pose sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/flight-targets.png); earlier eight-view standing/walking sheet remains valid separate evidence.

### Posture and wing type

Torso level in cruise; head/bill forward on a retracted S-neck, long legs trailing behind beyond the tail. Do not use crane-like fully straight neck as the default cruising target. Broad feathered wings fan at the primary tips. Grounded/perched bird restores tall legs, folded wings and poseable S-neck.

### Flap, glide and transitions required from the graph

Require distinct mid-upstroke, raised reversal, mid-downstroke and lowered reversal targets (at least four recognizable phases as an initial review target, not Ed-mandated frame count), plus held-wing glide/soar. Enough interpolation/frames must read as flapping at native game size; two alternating wing pictures alone do not establish this. Head/torso/leg posture must remain coherent throughout the cycle. Grounded/perched hold is separate from glide.

Ground → lean and flex legs → leg push with wings opening → legs stream backward and neck retracts → flight. Landing → wing flare and leg extension down/forward → toe contact and load transfer → fold wings/raise standing posture. Keep neck/legs distinct across these states.

Grounded-until-attack is a required available state path if gameplay assigns it; this documentation does not change attack behavior. Age0 mobile-young references are not permission to make an unflighted nestling fly. Flight-ready young need species-appropriate feather growth; adult sheet is not proof of age0 flight.

### New missing-feature requirements

Feathered articulated wing surface with separately fanned primaries and folded storage; torso/path orientation independent of standing; tucked/trailing leg posing; distinct flap/glide/ground states with phase-continuous takeoff/landing and support/contact switching. Existing generic wing sockets are not absent; missing are these specialized shapes/pose transitions and an accepted bird adapter. The reported bat membrane/finger-ray two-frame work in1866 is a separate wing kind, not evidence that feathered birds already pass.

### Cross-check and limits

Inspected [Commons heron in flight](https://commons.wikimedia.org/wiki/File:Ardea_cinerea_in_flight.jpg) and [heron landing](https://commons.wikimedia.org/wiki/File:Ardea_cinerea_landing.jpg). Flight photo has a partly extended curved neck in that instant, so neck pose varies; long legs clearly trail and primaries separate. Landing photo shows legs dropped toward contact while wings remain open. Preserve pose variation rather than declaring every flight frame must have one neck shape.

Generated sheets may straighten the neck or shorten trailing legs. Those would be target errors, not reasons to change real anatomy. The six images are separate illustrations; landing/takeoff contacts cannot be measured from them. No flap-cycle, transition, timing, collision or runtime proof is supplied; all are graph review targets.

Flight-sheet provenance: built-in image_gen.imagegen,2026-11-07; one generation, original PNG unedited; SHA256 b9cebddf0652d51d113f66f2a50f3d3e455add119b864f7949957baab0238446. Six adult panels inspected; exact camera and contact accuracy are not guaranteed.

Exact flight-sheet prompt:

> Photoreal natural history target sheet of Grey heron Ardea cinerea, long dagger bill pointing forward, neck retracted in an S (NOT crane straight-neck), broad feathered wings and fanned primaries, long legs trailing straight behind. Six panels in2rows3columns: top row adult airborne upstroke, downstroke, held-wing glide; bottom row folded-wing grounded/perched, takeoff push-off, landing feet-forward flare. Entire bird and all wings/tips/feet in frame with generous margins, plain warmgrey background, soft daylight. Camera looking down30degrees, body predominantly left-right angled35degrees towards viewer, consistent wholeanimal scale. Flying torso level along path and head forward; feathered wing elbows/wrists naturally articulated, primaries visibly fanned. Exact2wings2legs, no mammal arms. Grounded wings truly folded. This is a set of anatomical pose targets not a validated animation sequence. No fantasy or scenery. Small accurate pose labels.

## Legend concepts (new7November brief)

Authority1476#6707981581, corrected by6707992824: fit and VARIETY, not a blanket ban on crystals/flame/spirit wings. Source ART-GUIDE0b/0c and historical legend-audit read. All are proposed concepts; Ed judges the pick, no implementation/activation.

[Three concepts A/B/C](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/legend-concepts.png): Mere keeper / Jetty sentinel / Tide scribe.

### Area and animal story

art/areas/mangrove-heronry/recipe.js text: mud/reed litter, mere edge, reeds/rushes, tall mangroves and elms with nests, old jetty. This recipe is the current area story reached through areas/index.js, not an invented icy lake.

### Previous-iteration pick: A — Mere keeper

Stillness, a long neck and the sudden dagger-bill strike become the source of power. The narrow water-light throat is unlike the raven’s object-hoard or owl’s radial disc. Scarred bill and worn reed ankle bands make it old without making it a generic armoured wader. The living-jetty concept is strong but risks turning legs into literal wood; ink plumes are less clearly the animal’s defining trait.

Signature element: **Thin reflected-water light along the long throat**.

### Chosen legend checklist

1. Long S-neck and dagger bill remain unmistakably heron.
2. Legs remain thin with spreading toes, not wooden columns.
3. Long healed bill scar and weathered crest communicate age.
4. Light is a thin throat reflection, not an eye beam or crystal crown.
5. Reed ankle bands are sparse and fit the mere story.
6. Folded-wing grounded stillness and trailing-leg flight remain distinct.

### Legend body plan and graph needs

Legend neck arc1.4–1.8B, exposed legs1.1–1.4B, bill .45–.60B; narrow trunk bulk around wing roots. Keep weight over feet during held still pose; elongated neck can retract in flight. Ratios are optional design targets requiring silhouette review, not a new rig specification.

Missing/needed graph features: Articulated long neck with local-frame head attachment, thin emissive throat marking following curvature, bill-scar mask, ankle/reed accessory sockets, long avian toes/hock and flight/ground state transitions. These are requirements for graph1866, not edits to current handwritten art.

### Today comparison (source-labelled, raster pending)

Current sleeping LEGEND_HERON folds the neck along the back in reeds and carries a stick nest; current awake heron must be rendered separately. The historical audit says older heron legend had only scale/glowing eyes; that is historical, not proof of current raster. Comparison pending canonical cloud image. The required side-by-side contact sheet must use a real source-labelled current legend PNG, never a generated imitation labelled today. Canonical cloud evidence requested in1901#6708035999; independent concepts are complete, comparison montage remains pending that evidence.

### Variety check

Inspected available other-lane local summary documents on7November before final selection; L1/L9 summaries had no signature-element picks yet. No claim of all-lane uniqueness: canonical will check cross-lane spread when their picks exist. Within L6, owl disc / raven hoard / heron throat reflection / penguin song-and-chick are different signatures. Raven and penguin both use objects, but raven’s mismatched found keys in hackles express collecting, while penguin’s shore offerings express rookery worship; keep those distinct or reduce the penguin ornaments if spread review finds excess jewellery.

Legend sheet provenance: built-in image_gen.imagegen,2026-11-07, one three-concept generation, no retouching; SHA256 b21d016e72d9103e3186f0441917c1cc0e3663fe0aa290c85303304b7c723cb4. Whole-creature panels inspected; photoreal fantasy design, camera pitch approximate, not graph/game output.

Exact legend prompt:

> Create one polished photoreal-fantasy creature concept comparison sheet, THREE distinct whole-creature panels A B C, plain neutral warm grey background, no environment. Species heron, clearly recognisable bird anatomy, camera looking down30degrees and longitudinal axis turned35degrees towards viewer, orthographic-like long lens, every toe/wing/tail visible inside margins. Each concept ancient wise powerful and mysterious, evolved silhouette not merely adult enlarged; distinct designs, no common uniform. A: Mere keeper: ancient grey heron with impossibly long still S-neck and dagger bill, worn knotted reed bands at ankles, long scar on bill, water-reflection light held as a thin stripe along throat; stillness before strike, mangrove mere. B: Jetty sentinel: giant old heron with driftwood-coloured weathered legs and a small battered brass fishermans ring around bill base, subtle barnacle ankle crust; no tree on back; stands like a living pier. C: Tide scribe: narrow heron with long ink-dark calligraphic throat plumes and translucent water-thread feather tips, slow wise posture and chipped bill; reedbeds and old jetty. Small A B C labels only, no prose. Grounded poses. Animal-specific nature and area story must drive optional magic/jewellery. These are proposed legend targets, not today's game sprites.

## Colossal maximum-fantasy revision (7November)

Authority1476#6708227119 and later6708229124, overriding strict plain-background/no-scale-props for these revised concepts. Source ART-GUIDE0b/0c, DESIGN (legend about20times baby height and above treetops), area story above.

[Three revised concepts, hero and game-camera rows](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/legend-scale-v2.png). Top A/B/C: near-ground hero. Bottom A-game/B-game/C-game: generated approx30degree downward views of the same design ideas. Each panel includes witch plus forest trees. These are generated concepts, not actual game screenshots.

### Current proposed pick — C: Tide-Scribe

The long S-neck and patient fishing strike turn into impossible command of water above the mangrove mere. The water ribbon/fish lights arise from heron nature and place, rather than a decoration shared by every legend. A is the restrained luminous throat; B is a relic-covered jetty sentinel. C makes power visible without changing the family.

Signature element: **River-like neck and suspended living-water ribbon at dagger bill**. Ed judges; no approval/activation inferred.

Chosen legend checklist: Long narrow S-neck, small head and dagger bill must remain heron; long thin avian legs and toes reach through the canopy; water ribbon comes from bill and reaches mere with fish-light silhouettes; slate-like feather mantle carries age; witch stays visible near feet; avoid a straight crane neck.

Body plan: Neck arc1.5–2B, visible legs1.1–1.5B, bill .45–.65B. Most mass remains the narrow trunk/wing roots; exaggerate surface age and reach rather than inflating legs to tree trunks. About20 own baby heights, taller than trees, to be measured on future graph output.

New graph requirements: Poseable long-neck local frames, anchored flowing-water surface and restrained fish-light instances, contact-aligned ripple visual; feather wear, long bird leg/toe support, giant bounds/LOD and flight-to-ground transitions. No water simulation/gameplay is implemented.

### Actual image inspection and limits

All6panels show a witch and mangrove trees beneath the giant. C-game still exposes the S-neck and water ribbon from above. Heron top bill is close to panel edge; camera and exact scale vary. The water ribbon is a concept effect, not evidence the renderer can afford it. Reflection motif overlaps L4 moose water palms in element only, but here it is a flowing bill-to-mere strike rather than static antler pools.

The six panels are independent generated views, not exact multiview reconstruction. Witch/tree cues establish intended colossal size; there is no baby specimen in every panel and no metric20:1 proof. Future graph output must measure that ratio against the species age0 model. No native-size gameplay/readability/performance claim.

### Source-labelled current comparison

[Current albedo PNG](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/current-legend-albedo.png) and [side-by-side comparison](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/heron/legend-comparison-v2.png): panel1 left is actual source albedo at2x nearest-neighbor; panel2 right is the generated6panel sheet unresized. Different independent picture scales deliberately do NOT establish current versus target world scale.

Current source524b0acaa43bb9975e7b2834ff9a55cbca4b3319, confirmed equal to freshly fetched prototype for art/style/tuning at extraction; age3/frame0/towards, defaultStyle plus config/style style, explicitBold and tuningpixel3. Browser-free critter/speciesColours/bake with minimal in-memory createImageData/putImageData canvases; lossless RGBA→PNG. This is unlit albedo, not runtime lighting or proof of default artStyle. No browser/server/allocation used. Prior cloud-comparison request6708035999 is now resolved by this read-only lightweight extraction. The earlier raster-pending text is historical.

Second-pass provenance: built-in image_gen.imagegen,2026-11-07, one six-panel generation; original PNG inspected. No game rendering. SHA256 1337f7789b7065ed0dc59eca0ca10f3de4908b30c94dc61023c6c96e806eed44.

Exact scale/fantasy prompt:

> Six-panel fantasy creature design review sheet for heron. THREE distinct legend concepts A B C shown twice: top row three low-near-ground heroic views; bottom row SAME3 designs at game camera looking DOWN30degrees, heading35degrees towardsviewer from side. In EVERY panel include a clearly visible tiny adult WITCH with pointed hat beside creature's FOOT and full FOREST TREES around its feet for absolute scale. Legends roughly20times babybirdheight, roughly12witchheights and taller than trees: treetops reach about lowerhalf giant, witch tiny1/12height; do NOT draw ordinary animal-sized beside witch. Whole giant including feet/tail/wingtips inside EACH frame, generous margins. Painterly photoreal-fantasy concept art, species instantlyrecognizable, colossal landform mass and weathering not just scaledadult. Ground and sparse areaenvironment allowed, atmospheric depth on farbody, readable bold silhouette. Concepts: A Mere Keeper: colossal grey heron, impossibly long S-neck bearing a slender ribbon of reflected-water light, dagger bill scarred like worn stone, long legs like ancient jetty piles but still avian, sparse reed bands; mangrove mere. B Jetty Sentinel: heron giant with old bronze fishing rings and barnacled ankle armour, drowned wood patina on feather edges, long narrow trunk, living still pier, no tree on back. C MAXIMUM FANTASY Tide-Scribe: unmistakable heron striding above a flooded mangrove forest, impossibly long S-neck bends like a river, its dagger bill holds a suspended vertical ribbon of water with tiny fish-shaped lights; feathered wing mantle like eroded wet slate, long legs wade through forest canopy, stillness commands the mere, no raven sphere. Keep bird anatomy2legs2wings. Penguin ifpresent: WEBBED feet no raptor claws. Owl ifpresent: feathered not mammal ears. Labels top A B C, bottom A-game B-game C-game. No prose. Eachconcept itsownsignature, show supernaturalpower. Everypanel mustshow witch AND trees, camera variation no detachedportraits.
## Third-pass readable concepts

Two game-camera candidates replace the scene-heavy revision for this review: **A Long-Reed Elder** (tall S-neck, dagger bill, bronze ankle band, torn crest feather and one blue throat stripe) and **B Mere Watcher** (long trailing legs, narrow wing mantle, weathered shoulder plates, old leg scar and one bill glint). Pick A: the S-neck, bill and long legs remain a clean heron silhouette; the stripe is secondary. Body-plan notes: preserve the articulated S-neck, shaped bill, narrow trunk, long hock/toes and folded wings; expose only throat, ankle, shoulder and scar sockets.
