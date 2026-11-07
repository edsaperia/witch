# Dragonfly: body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Emperor/hawker dragonfly, Anax imperator comparison. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Four separate transparent veined wings in two thoracic pairs
- Huge adjacent compound eyes dominate the small head
- Compact muscular thorax carries wings and six legs
- Long slender segmented abdomen, not a mammal tail
- Six spiny legs cluster beneath front thorax
- Tiny antennae; no butterfly clubs or bat fingers
- Resting wings held open rather than damselfly-style folded upright

## Body plan and mass

L = head-front to abdomen tip. Head 0.12–0.18L; thorax 0.17–0.23L; abdomen 0.60–0.70L; head width 0.15–0.22L. Full wing span 1.25–1.60L; thoracic leg chains 0.20–0.35L. No long neck; abdomen is an articulated body region, not an accessory tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Flight mass is concentrated at thorax; eyes broaden the front, abdomen stays light and narrow. Wings should read as thin planes rather than bulky lobes.

**Age0:** Genome explicitly says every level flies, with baby a small dragonfly. Age0 therefore uses a short-abdomen/small-wing flying adult proxy, not the real aquatic nymph. Preserve that ruling.

**Top three priorities:** Separate four wing roots → tuck flight legs → keep abdomen slender.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/dragonfly/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons perched male thumbnail shows the long abdomen, green thorax and laterally open wings. The My Nature Photography flight original shows level abdomen/head-forward posture and legs tightly tucked under thorax. Base generated walking cells are actually flight, intentionally labelled; motion blur cannot validate four wing roots or a flap cycle.

[Photo gallery](https://commons.wikimedia.org/wiki/Anax_imperator) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/dragonfly/provenance-l8.json) records exact generated prompts and selected source files.

## Flight and resting targets

Rest: six feet grip a reed, wings remain open. Flight: level/path-angled torso, forward head, legs tucked under thorax; fore/hind wings articulate independently. Require a readable sequence beyond two alternating frames, a held-wing glide, release/contact takeoff/landing poses. Do not force a butterfly folded-wing state. Supplemental six-cell sheet is row-major rest/glide/upstroke/downstroke/takeoff/landing; it illustrates key shapes only. Four-wing phasing, exact leg count and transition timing remain unverified.

[Supplemental pose sheet](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/dragonfly/flight-targets-l8.png). [Flight photograph](https://mynaturephotography.com/anax-imperator-blue-emperor/) was inspected at full size; the perched Commons comparison supplies the resting shape.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. #1866 bat membrane/finger-ray wing is present, not a general insect implementation. No dragonfly family, four separately phased glassy wing surfaces with veins, six-leg thorax, compound-eye mass, or segmented abdomen assembly. Held-wing glide, rest, readable multi-frame flap and state transitions remain required.

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/dragonfly/legend-comparison-l8.png). A: ancient all-seeing hawker with huge weathered reflective eyes and tattered glass wings. B: storm measurer with charged veins. C: reed memory with curved abdomen and flood-line wings.

**First-pass recommendation A — A magnifies the dragonfly's vision and ancient-hawker identity. Damaged margins and old wing repairs show long survival; enormous eyes carry wisdom without adding a borrowed ornament.** Ed judges the recommendation. Signature element: **Ancient reflective compound eyes**.

**Chosen legend checklist/body plan:** Head/eye width 0.28–0.35L, full wing span 1.7–2.0L, abdomen approximately 0.60–0.68L. Keep four wings, six tucked legs and slender tailward mass. Weather the wing margins while preserving enough surface for credible flight; no feather fingers.

**Additional graph needs:** Independent compound-eye surfaces/reflections and asymmetric torn-wing edge masks, plus four-wing insect flight/ground state support.

**Area/story source:** art/areas/mangrove-pools/recipe.js text: black mud/leaf litter, pools' edges, reeds/lilies, arching mangrove roots and a sagging boardwalk.

**Comparison limits:** Generated legend plate wing overlap makes counting unreliable in some panels. Reflections are fantasy targets, not literal biological eye contents. Current albedo's long abdomen and four-wing spread are useful silhouette cues. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/dragonfly/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/dragonfly/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/dragonfly/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A time-seeing compound eyes; B living lightning veins; C four epochs within four glass wings (maximum fantasy).

**Current proposed pick C. Signature element: Four glass wings showing four epochs of the mangrove forest.** The four-wing structure becomes the memory of a habitat that has existed across epochs. This is stranger than a large hawker but still organized by its unmistakable glass wings, eyes and long abdomen. B overlaps other lanes' storm wings; A overlaps the owl's time-seeing face more closely. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Keep four independent thin wing surfaces, huge compound eyes, six tucked thoracic legs and level abdomen. Use the earlier legend wing span1.7–2.0L as a first shape range, then test projection at colossal size. Each wing carries a different era within its own boundary; do not add extra wings or let the surface scene hide the wing roots.

**Additional graph needs:** Four independently phased transparent veined surfaces with separate bounded epoch-image/material regions, edge wear, body-local sparse shrine attachments, flap/glide/rest state support and giant bounds/LOD. No time simulation, world capture or portal mechanic is authorized.

**Inspection and scale limits:** Witch and trees present throughout. Hero wing tips crop at some cell borders; game-row wing boundaries are more readable but remain approximate. Images cannot prove four wing roots or six tucked legs in all overlaps. Antennae are too prominent in the hero view; use tiny natural antennae. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.

## Third-pass readable pixel references

Read the relayed third-pass direction (issue #1476, comments 6710686653/6710694651/6710701175). Two concepts are retained for review: **A long-winged ancient; B heavy-eyed ancient**. Both keep the animal readable by exaggerating existing features only; armor, decoration, weathering and magic stay restrained. Body-scenes and invented anatomy are excluded.

[True 1× pixel reference](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/dragonfly/legend-pixel-l8-v3-1x.png) · [nearest-neighbour 4×](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/dragonfly/legend-pixel-l8-v3-4x.png). The sheet uses the existing v2 concept plate as a source anchor, reduced to a readable game-style pixel grid and enlarged 4× with nearest-neighbour. Each concept includes hero and approximate game-camera towards/away silhouettes, witch scale and forest trees.

**Review limits:** These are reference derivatives, not runtime sprites. 1× is a readability target, not a measured final tile size; 4× is a nearest-neighbour inspection aid. Exact giant scale, camera projection, lighting, gait, distant LOD and graph implementation remain unverified.
