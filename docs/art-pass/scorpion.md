# Scorpion: body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Red-brown canyon scorpion; Euscorpius is an anatomy comparator, not an exact species claim. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Eight walking legs, four pairs
- Two separate clawed pedipalps ahead of the legs
- Broad low plated trunk
- Narrow articulated rear metasoma curled above the back
- Five tail segments followed by a distinct telson/stinger
- Small head/eye region and chelicerae, no antennae
- Pincers and sting remain readable in both headings

## Body plan and mass

L = front of prosoma to rear of broad mesosoma, excluding pedipalps and narrow tail. Broad body width 0.35–0.50L; depth 0.18–0.28L; pedipalp root-to-pincer tip chain 0.65–0.95L; walking-leg chains 0.45–0.70L; tail arc length 1.0–1.4L, stinger 0.15–0.25L. No projecting mammal head or neck. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

A low central plated trunk with two forward claw masses balances the raised but narrow rear tail. Keep walking supports separate from grasping claws.

**Age0:** Game source shortens baby tail and pincers, then grows both; juvenile keeps eight walking legs and two pedipalps. Paler coloration is a target aid, not a verified species-age measurement.

**Top three priorities:** Separate eight legs from pincers → articulate rear tail → keep low plated mass.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/scorpion/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons Euscorpius dorsal photo shows eight walking legs separate from paired pincers and a narrow jointed tail behind the broad body. Generated panels preserve the overall plan but tail segment shapes/counts vary; the anatomy checklist wins. No juvenile or brood photograph was inspected.

[Photo gallery](https://commons.wikimedia.org/wiki/Category:Euscorpius_italicus) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/scorpion/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No arachnid/scorpion family in #1866. Generic tail chains can curve but do not declare five armored metasomal segments plus telson, hinged pincer digits, eight multi-joint walking legs, or separate pedipalp gait/attack controls.

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/scorpion/legend-comparison-l8.png). A: brood matriarch with huge protective curled tail and pale young on scarred back. B: venom keeper with amber stinger. C: canyon archivist with stratum-like plates and copper offering.

**First-pass recommendation A — A carries the animal's real maternal brood behavior into the existing game elder brief. Scars and a protective tail communicate age and authority; blue-green plate-edge magic stays subordinate to the family relationship.** Ed judges the recommendation. Signature element: **Brood sheltered beneath an enormous curled tail**.

**Chosen legend checklist/body plan:** Tail arc length 1.7–2.2L, pincers 0.8–1.1L, broad back approximately 0.50L wide. Keep five tail segments plus telson even though the concept image oversegments it. Brood sits on the broad back, never on free-floating sockets; eight adult feet support the body.

**Additional graph needs:** Back-surface brood attachment sockets with local pose following, discrete armored tail segments/telson, scars and restrained plate-edge emission.

**Area/story source:** art/areas/red-canyon/recipe.js text: red scree/slabs, red ledges, ocotillo/dry grass, palo verde/desert ironwood and a heap of red stones.

**Comparison limits:** The concept image has too many tail segments and heavily rock-like plates: retain the brood/tail story but correct those before modelling. Brood size/count is concept design, not measured zoology. Current albedo's curled sting and forward pincers are worth keeping. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/scorpion/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/scorpion/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/scorpion/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A ancestral brood shelter; B fossil memories inside a venom stinger; C impossible night valley under the tail (maximum fantasy).

**Current proposed pick B. Signature element: Epoch fossils suspended inside an amber venom stinger.** The scorpion's own venom becomes a memory older than the forest. This separates it from shelter/portal motifs elsewhere while scars and canyon-like plates communicate survival. A preserves the maternal story as an option; C offers Ed the furthest fantasy. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Keep eight walking legs, two pincers and a five-segment rear tail plus telson. Enlarge only the terminal venom bulb to0.30–0.45L, using the earlier legend tail arc1.7–2.2L. Its translucent amber contains a few fossil silhouettes; no extra external claws or disconnected floating sting.

**Additional graph needs:** Distinct telson mesh/material and internal bounded fossil-mask layer, articulated discrete tail segments, worn pincer/plate surfaces, colossal contact/bounds. This is a visual memory image, not a venom simulation or new combat effect.

**Inspection and scale limits:** Witch and trees appear in every cell. The generator still adds too many tail segments and over-rocky armor. Rebuild five segments plus telson from anatomy before any model adoption; do not treat fossil silhouettes as a zoological claim. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.
