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
