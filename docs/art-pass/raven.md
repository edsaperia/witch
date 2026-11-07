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
