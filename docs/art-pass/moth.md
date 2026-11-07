# Swallowtail (saved id moth): body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Papilio machaon butterfly; current genome explicitly replaced the moth. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Two pairs of broad scaled wings, not glass dragonfly wings
- Yellow field with black veins and borders
- Distinct hindwing tails and blue crescent markings
- Slender abdomen and compact thorax
- Clubbed antennae, not feathery moth antennae
- Six thoracic legs; folded/resting legs remain separate from wings
- A small head and visible proboscis rather than a mammal muzzle

## Body plan and mass

L = head-front to abdomen tip, excluding antennae. Head 0.12–0.18L; thorax 0.25–0.32L; abdomen 0.45–0.58L. Full open wing span 2.2–3.0L, forewing root-to-tip 1.1–1.5L, hindwing tail extension 0.25–0.45L; antennae 0.35–0.50L; leg chains 0.35–0.55L. Neck is a small hinge; no separate external tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Tiny central body supports broad thin wing surfaces. Preserve the abdomen behind the thorax; avoid a round moth blob or thick bat membrane.

**Age0:** Age0 is the game's smaller butterfly proxy, not a caterpillar or chrysalis. Keep the swallowtail family and simplify pattern/tails rather than invent a biological miniature larva with wings.

**Top three priorities:** Respect swallowtail identity → distinguish fore/hind wings and tails → separate rest and flight.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons mounted male gives clear fore/hindwing outline, tails and black/yellow pattern; it does not establish live posture. Marc Solari's flight original shows open scaled wings and tucked legs. Lepiforum's Matter 2007-06-19 Buettenhardt underside photo shows a resting butterfly gripping a stalk with closed wings alongside/above the body, clubbed antennae and narrow abdomen. Base generated perch cells are partly open, so the supplemental closed-wing cell is the better target, still more upright than the real resting pose.

[Photo gallery](https://commons.wikimedia.org/wiki/Papilio_machaon) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/provenance-l8.json) records exact generated prompts and selected source files.

## Flight and resting targets

Flight: level/path-angled thorax, forward head and tucked six legs; fore/hind wings remain paired scaled surfaces, not finger-ray membranes. Rest: grip or stand, wings close vertically together with underside visible; an open bask pose may also exist. Require multiple readable flap poses plus a held-wing glide and takeoff/landing contact changes. Supplemental sheet row-major perch/glide/upstroke/downstroke/takeoff/landing is static; cycle timing and continuity are not demonstrated.

[Supplemental pose sheet](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/flight-targets-l8.png). [Flight photo by Marc Solari](https://photos-marc-solari.e-monsite.com/album-photos/papillons-de-jour-rhopaloceres/papilionidae/papilio-machaon-en-vol-web-1.html) and [resting underside by Matter on Lepiforum](https://lepiforum.org/wiki/page/Papilio_machaon) were inspected at full size.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No butterfly/scaled-wing family in #1866. Bat membranes do not supply four overlapping scaled wing lobes, club antennae, proboscis or six legs. Need wing pattern following deforming surfaces, folded rest, held-wing glide, readable flap sequence and ground/flight transitions.

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/legend-comparison-l8.png). A: eyespot oracle with enormous luminous blue hindwing eyespots and frayed tails. B: pollen pilgrim with exaggerated clubbed antennae. C: wind elder with long continuous hindwing tails.

**First-pass recommendation A — A develops the existing elder eyespot idea directly from the patterned wings. Worn scale fields and tattered tails show age, while the gaze belongs on the wings rather than a generic floating ring of eyes.** Ed judges the recommendation. Signature element: **Luminous hindwing eyespots**.

**Chosen legend checklist/body plan:** Open span 3.0–3.6L; paired eyespots approximately 0.45–0.65L across on the hindwing fields. Keep black/yellow veins, tails, club antennae, six tucked legs and small central body. Shape frayed margins without making the butterfly look like a moth or feathered bird.

**Additional graph needs:** Surface-locked eyespot masks/emission, asymmetric worn-scale/tail edges and folded-wing-safe pattern placement.

**Area/story source:** art/areas.js heath text: heather, gorse and wind-bent birches; kind.json says temperate and current genome calls it meadow swallowtail. References keep swallowtail anatomy; the concept uses wind wear and pollinator wings, not a literal moth attraction-to-flame story.

**Comparison limits:** Concept A is closer to a dorsal presentation than calibrated game camera; the generator's worn tails are fragile design suggestions. Current albedo preserves yellow/black butterfly identity but does not prove the new folded or flight states. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/moth/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/moth/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/moth/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A eyespots showing possible futures; B life-seeding pollen between club antennae; C dream-mapped wings and starlight tails (maximum fantasy).

**Current proposed pick B. Signature element: Life-seeding pollen carried between giant clubbed antennae.** The swallowtail becomes a keeper of flowering clearings through its own pollinator nature. A and C are strong options, but pollen gives this lane a signature distinct from the dragonfly's four time-windows and the snail's cosmos. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Keep scaled yellow/black four-wing anatomy, blue crescents, hindwing tails and six small legs. Antennae extend0.7–1.0L as an evolved legend target and remain clubbed rather than feathery. A bounded gold pollen arc links the clubs and trails toward the meadow. Keep central body narrow and age visible as worn scales/tails.

**Additional graph needs:** Articulated clubbed antennae with local pollen emission anchors, surface-following scale wear, sparse decorative pollen trail, folded/resting wing patterns and the flight states already listed. No actual seed spawning or ecology mechanic.

**Inspection and scale limits:** All six cells contain witch/trees. Upper views are strongly dorsal and wing tips reach borders; lower row drifts to an upright wing pose rather than level flight. Use the separate flight/rest sheet to correct torso/leg posture; this is a fantasy/camera exploration, not a validated flight frame. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.

## Third-pass readable pixel references

Read the relayed third-pass direction (issue #1476, comments 6710686653/6710694651/6710701175). Two concepts are retained for review: **A scalloped-wing elder; B heavy-thorax elder**. Both keep the animal readable by exaggerating existing features only; armor, decoration, weathering and magic stay restrained. Body-scenes and invented anatomy are excluded.

[True 1× pixel reference](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/moth/legend-pixel-l8-v3-1x.png) · [nearest-neighbour 4×](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/moth/legend-pixel-l8-v3-4x.png). The sheet uses the existing v2 concept plate as a source anchor, reduced to a readable game-style pixel grid and enlarged 4× with nearest-neighbour. Each concept includes hero and approximate game-camera towards/away silhouettes, witch scale and forest trees.

**Review limits:** These are reference derivatives, not runtime sprites. 1× is a readability target, not a measured final tile size; 4× is a nearest-neighbour inspection aid. Exact giant scale, camera projection, lighting, gait, distant LOD and graph implementation remain unverified.
