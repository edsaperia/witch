# penguin: skeleton target

Target: **Emperor penguin (Aptenodytes forsteri)**. Real anatomy wins over both generated images and today's sprite.

[Generated eight-view reference sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/penguin/reference-sheet.png)

## Identifying checklist

1. Upright streamlined oval trunk, broad through lower chest and abdomen.
2. Small dark head transitions smoothly into a thick neck.
3. Long narrow slightly curved bill with orange lower-bill marking.
4. White belly against black back and head, yellow-orange neck patches.
5. Short stiff flattened flippers, not feather fans or arms.
6. Very short visible legs and webbed feet under the body.
7. Short stiff tail projects down/back as a brace.
8. Grey-down chick with black cap and white face; no adult yellow gorget.

## Body plan

B=trunk length along the main chest-to-rump axis, excluding neck/head/tail; for upright penguin measure along its near-vertical torso. Ratios below are deliberately approximate ART TARGET ranges from visual anatomy reasoning, not biological measurements or pixel measurements of generated panels. They apply to adult unless young/chick stated.

- head excluding bill .18–.24; chick .28–.36 ×B.
- bill .16–.22; chick .08–.13 ×B.
- external neck .15–.25; chick .08–.16 ×B.
- visible leg .08–.15; chick .08–.14 ×B.
- tail .12–.20; flipper .45–.60 ×B.

Bulk sits low in the elongated trunk above the feet; walking transfers weight side-to-side. Chick is rounder/downier with larger head ratio, short bill and small flippers.

## Real-photo cross-check and generation critique

Comparison-only [Commons gallery](https://commons.wikimedia.org/wiki/Aptenodytes_forsteri) and [specific photo](https://commons.wikimedia.org/wiki/File:Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg) reviewed2026-11-07; photos stay outside the PR and image publication. The inspected Commons adult-and-chick photo supports the generated black/white adult, yellow neck and grey chick with white cheeks. Generated adult tail is over-feathered and the walking stance raises a foot too far forward; do not copy those literally. Current level1 brown-grey young reads partly king-penguin-like: retain only as explicit game design, not emperor zoology.

## Age and fantasy scope

Penguin has explicit grey down at0, brown-grey young at1 and adult at2; head-size ratios differ from generic avian template. Target age0 is a mobile emperor chick. Level3 elder borrows emperor anatomy with oar-like flippers, ice/scars, gorget, offerings and a chick; fantasy additions are separate from the real-animal target.

## Camera, age and graph audit

Audited prototype524b0acaa. `art/model3d.js` exports PITCH=.52rad (29.79°) and YAW towards=.6/away=-.6rad (±34.38°); model axes x forward/y up/z across. Generated sheets request those approximate views, not calibrated projections. Eight panels: adult top, mobile young bottom; standing-towards, walking-towards, standing-away, walking-away. Generation cannot guarantee orthographic projection, exact yaw, joint placement or temporal gait continuity; labels are not proof. These are targets, not shipped-art comparisons or accepted graph candidates.

`art/genome/templates.js` avian uses head sizes[.48,.36,.36,.36], headY[.95,1.08,1.08,1.08] and alternating offsets[0,.5]. `art/genome/index.js` merges each level's overrides. Age0 means the game's mobile youngest stage, not biological hatch-day anatomy.

`art/body-graph/graph.js` supports head/leg/wing/tail/shell sockets, overlapping spine ellipsoids and tapered tail chains; head/wing/shell currently compile as ellipsoids. Leg families are plantigrade/digitigrade/hoof with fixed knee/foot recipes, not an avian foot adapter. `fixtures.js` explicitly calls wings placeholders. `gait.js` has straight-line alternating limb posing; it does not establish a bird-specific walk. Gaps below distinguish missing specialized behavior from existing generic socket names. No source edits requested in this lane.

## Missing graph features

Flattened tapered flipper surfaces with constrained shoulder pose; webbed avian foot and compact-leg stance; stiff tail brace/contact and upright biped balance. Generic wing/head/tail sockets already exist but do not provide these anatomy/gait semantics.

Top three priorities: upright low-mass trunk/short legs; stiff flippers/webbed feet; emperor chick colour and proportions. This is a target checklist, not a claim today's sprite fails each item or that a new graph bird is implemented. No exhaustive shipped-look critique performed, per later ruling1476#6707758462.

## Provenance

Generated2026-11-07 with built-in image_gen.imagegen (imagegen skill, no API service or key). One generation for this sheet; original PNG preserved, no retouching. SHA256: 34497ca9398b7ed6695ad226a68ba3e2d1be584f9e8df91e566d5e68e17c3ab7. Tool does not expose a stable model revision or random seed; none invented. Whole bodies and eight requested panels inspected. Camera/perspective match is approximate, particularly heron/penguin; do not use this as a metric camera test.

Exact prompt:

> Photoreal natural history anatomy reference contact sheet for Emperor penguin Aptenodytes forsteri, black back white belly yellow orange neck patches, short stiff flippers, webbed feet, grey down chick black cap white cheeks; NOT brown king penguin chick. Plain warm grey seamless background, soft neutral daylight, entire bird including all toes and tail inside every panel. Eight separated panels, 2 rows by4 columns. TOP adult: standing towards, walking towards, standing away, walking away. BOTTOM mobile young: same four views. Fixed orthographic-like long lens camera looking DOWN30 degrees. Bird longitudinal axis primarily left-right on sheet, turned35degrees towards viewer in towards panels and35degrees away in away panels; not front-on portraits. Exactly two legs and two wings, natural avian joints, realistic species anatomy. Modest natural walking step not running, wings folded (penguin flippers resting). Each specimen isolated same scale within its age row. No scenery, no decorative graphic, no fantasy features, no clipped feet. Small panel labels adult/young and towards/away standing/walking. Generated scientific target illustration, not game sprite.

## Review status

Reference/target document complete for coordinator review; biological/photo and generated-view limitations above remain explicit. No game-size likeness acceptance, exact-camera validation, source change, game text change or production migration claimed. Graph implementation remains with1866 owner; next condition is coordinator review and that owner's species batch after the six-species gate.

## Flight ruling applicability (7 November)

1866#6707952715 does not make a penguin aerial. Emperor penguin remains flightless: stiff flattened flippers propel underwater, unlike fanned feathered airborne primaries or bat membrane/finger rays. Preserve upright grounded folded/resting-flipper and walking states from the existing photo-checked sheet. A future swimming pose would be horizontal with flippers sweeping and feet/tail steering, but no swimming implementation is authorized here. No takeoff/airborne-glide/landing cycle is requested for this species; do not apply a generic flyer animation. Missing graph semantics remain flipper rigidity, webbed feet, upright balance and tail brace; swimming support, if later assigned, needs its own evidence. No additional aerial reference is fabricated.
