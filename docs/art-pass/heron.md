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
