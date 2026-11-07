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

## Legend concepts (new7November brief)

Authority1476#6707981581, corrected by6707992824: fit and VARIETY, not a blanket ban on crystals/flame/spirit wings. Source ART-GUIDE0b/0c and historical legend-audit read. All are proposed concepts; Ed judges the pick, no implementation/activation.

[Three concepts A/B/C](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/penguin/legend-concepts.png): Deep-song elder / Rookery shield / Star navigator.

### Area and animal story

art/areas/rookery/recipe.js text: snow over dark wet shingle, black sea rocks, tussock grass/pebbles, wind-stunted trees and a ring of pebble nests. It is a shore, not polar-bear pack ice. Ed’s explicit elder-god penguin knows deep songs and the age of stars.

### Proposed strongest pick: A — Deep-song elder

This follows Ed’s own example: a penguin worshipped for surviving epochs, carrying ancient songs and protecting young. Sea-worn back and scarred white breast show age, while low song-lines in its natural orange neck patch are its power. Shell/pebble offerings belong to the rookery. Ice armour is allowed but is a less precise fit to the shingle shore; star ornament risks being a generic astronomy badge.

Signature element: **Deep-song gorget with sheltered chick**.

### Chosen legend checklist

1. Emperor-penguin upright oval body, black/white pattern and orange neck patch retained.
2. Very old sea-worn back and healed breast scars remain feather/body surfaces, not a rock replacing the bird.
3. Low song-lines stay within the gorget silhouette rather than becoming a universal halo.
4. Small grey chick sheltered at feet is clearly separate offspring.
5. Pebble/shell offerings differ in shape and size, sparse enough to reveal neck.
6. Stiff flippers remain flippers; no aerial or spirit-flight anatomy implied.

### Legend body plan and graph needs

Legend near-vertical trunk remains dominant, head .20–.26B, flippers .55–.70B and visible legs .08–.15B. Broad low body shelters chick .30–.45 of elder body height. Larger scale alone is not the design: old surfaces, throat-song and protective posture supply evolution.

Missing/needed graph features: Scar/weathering masks, curved gorget emissive band placement, individual offering sockets, chick child-instance attachment with independent readable body; stiff flipper and protective pose support. No generic aerial wing rig required. These are requirements for graph1866, not edits to current handwritten art.

### Today comparison (source-labelled, raster pending)

Current penguin genome levels3 already adds oar flippers, gorget, longer bill, elder and chick; penguin3d adds pebble/shell offerings. Sleeping legend is hunched over chick on a pebble nest, lichened like sea rock. ConceptA refines these explicit story cues, not a claim current code lacks them. The required side-by-side contact sheet must use a real source-labelled current legend PNG, never a generated imitation labelled today. Canonical cloud evidence requested in1901#6708035999; independent concepts are complete, comparison montage remains pending that evidence.

### Variety check

Inspected available other-lane local summary documents on7November before final selection; L1/L9 summaries had no signature-element picks yet. No claim of all-lane uniqueness: canonical will check cross-lane spread when their picks exist. Within L6, owl disc / raven hoard / heron throat reflection / penguin song-and-chick are different signatures. Raven and penguin both use objects, but raven’s mismatched found keys in hackles express collecting, while penguin’s shore offerings express rookery worship; keep those distinct or reduce the penguin ornaments if spread review finds excess jewellery.

Legend provenance: built-in image_gen.imagegen,2026-11-07. Three concepts generated, then one targeted anatomy correction replaced erroneous raptor talons with broad webbed penguin feet in all panels; revised sheet inspected, first erroneous version is rejected. No game asset or runtime rendering. SHA256 9e5b34a2501b538dc4cd8920aa67446ddcaa82725697e054eb70bb354cec7bba. Exact camera match remains approximate; generated feather wear is exaggerated and foot details are not a rig specification.

Exact generation prompt:

> Create one polished photoreal-fantasy creature concept comparison sheet, THREE distinct whole-creature panels A B C, plain neutral warm grey background, no environment. Species penguin, clearly recognisable bird anatomy, camera looking down30degrees and longitudinal axis turned35degrees towards viewer, orthographic-like long lens, every toe/wing/tail visible inside margins. Each concept ancient wise powerful and mysterious, evolved silhouette not merely adult enlarged; distinct designs, no common uniform. A: Deep-song elder: colossal emperor penguin with deeply weathered black back like sea-worn stone, white scarred chest, orange gorget glowing as low-frequency song-lines, pebble-and-shell offerings necklace, chick sheltered at feet; knows deep songs and age of stars. B: Rookery shield: emperor penguin broad protective belly and ancient scarred stiff flippers held around chick, a few natural ice armour plates only on shoulder ridges, no crystals elsewhere; windswept shore protector. C: Star navigator: ancient emperor penguin with subtly star-speckled dark plumage, long worn beak and small shell astrolabe offering hanging from throat, orange neck patches and grey chick; no wings or crown. Small A B C labels only, no prose. Grounded poses. Animal-specific nature and area story must drive optional magic/jewellery. These are proposed legend targets, not today's game sprites.

Exact correction prompt:

> Edit this three-concept emperor penguin legend sheet. Preserve all three designs A/B/C, markings, necklaces, chicks, whole-body framing and plain background. Correct ONLY anatomy of feet of ALL adult penguins and chicks: replace clawed bird-of-prey/raptor talons with correct emperor penguin short broad BLACK WEBBED FEET, three forward toes visibly joined by continuous webbing, low under belly, short blunt nails only, no long curling claws, no extra toes. Preserve emperor species, no mammalian feet. This correction is mandatory for every panel. Keep whole feet within frame.
