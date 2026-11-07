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
