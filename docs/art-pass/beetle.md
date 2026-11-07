# Fire beetle (stag-jawed): body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Lucanus cervus body plan; volcanic fire is the game flourish. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Six jointed thoracic legs, never mammalian feet
- Distinct head, broad pronotum and oval paired elytra
- A visible straight elytral centre seam
- Large paired curved branching mandibles, not horns on the skull
- Elbowed antennae ending in clubs
- Low dark chestnut/black armored mass; ember cracks secondary

## Body plan and mass

L = head-front to elytral rear, excluding mandibles and antennae. Head 0.18–0.25L; pronotum 0.20–0.28L; elytra approximately 0.50–0.60L (parts overlap at joints). Adult jaw projection 0.35–0.60L; leg root-to-tip chain 0.45–0.65L; width 0.35–0.45L, body depth 0.20–0.28L. Neck is a short articulation, not a mammal neck; no external tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Most visual volume sits in elytra/abdomen; wide head and jaws create forward leverage without lifting the whole body upright.

**Age0:** Game age0 is an adult-plan proxy with short mandibles and simpler rounded shell. A biological beetle larva is not a small wing-cased adult. This note preserves the current game lifecycle rather than introducing metamorphosis.

**Top three priorities:** Separate jaws from head → preserve paired elytra seam → place six legs on thorax.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/beetle/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

The Commons dorsal specimen shows two long branching jaws, six slender jointed legs, clubbed antennae and separate pronotum/elytra. The first generated ground-beetle trial lacked the defining jaws and was rejected. The replacement carries them. Its leg attachments remain occluded: do not copy their count or attachment positions blindly.

[Photo gallery](https://commons.wikimedia.org/wiki/Lucanus_cervus) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/beetle/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No beetle family in #1866 acceptance. Generic shell sockets and the existing shared mandiblePart are present, so neither shells nor mandibles are universally absent. Missing is an insect thorax with three leg pairs, insect joints/tarsi, independent elytra/open hindwing hinges and species assembly using those mandibles.

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/beetle/legend-comparison-l8.png). A: eroded flamejaw. B: iron reliquary shell with bronze rings. C: opened amber hindwings, forest sentinel.

**First-pass recommendation A — A exaggerates the stag jaws and lets volcanic heat show through old cracks. Chipped jaw tips and charred shell carry age; the power belongs to the jaws rather than a shared back crest.** Ed judges the recommendation. Signature element: **Molten cracks in eroded branching jaws**.

**Chosen legend checklist/body plan:** Keep six legs and a clear elytral seam; jaws project 0.70–1.0L, head 0.25–0.32L; retain clearance between jaw tips and ground. Add uneven chipped jaw branches, restrained emissive fissures following the jaw surface and local shell wear. Mass stays low behind the head, not a top-heavy pile of ornaments.

**Additional graph needs:** Branch-level jaw wear/cuts, jaw-surface fissure mask and emissive material control; no jewellery socket needed for A.

**Area/story source:** art/areas.js log-pile text: rotting leaves, fungi, rotting logs and a fallen giant. art/areas/log-pile/kind.json now places it in volcanic; genome says fire beetle. The concept treats fire/ash as primary and deadwood as heritage.

**Comparison limits:** The generator invents a Latin name on the legend plate; it is decorative fiction, not taxonomy. Jaw branching is more exaggerated than the real specimen. The current albedo retains glowing jaws/embers worth preserving. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/beetle/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/beetle/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/beetle/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A forge-ember jaws; B votive shield beetle; C eclipsed-sun forge (maximum fantasy).

**Current proposed pick A. Signature element: A living forge held between eroded mandibles.** The impossible ember lives between the beetle's defining jaws. Basalt-like shell wear and rooted deadwood make epochs visible; the forge belongs to volcanic nature, while B is chiefly armor and C risks making the floating sun the whole animal. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Retain the six-leg/thorax/elytra anatomy above and first-pass jaw clearance ranges. Raise jaw volume enough to frame the forge but attach both at the mouth, not as skull antlers; the generator drifts toward upright horns. Keep the shell a broad low landform, with sparse world-grown deadwood as age evidence. The ember is an attached visual target, not an extra body segment.

**Additional graph needs:** Mouth-hinged branching jaw sockets, bounded emissive forge anchor between jaw tips, surface fissures, sparse deadwood/offerings attached in local shell frames, colossal bounds/culling and lower-detail distant silhouette.

**Inspection and scale limits:** Every cell has witch/trees. Some hero feet/antenna tips meet the frame; the lower row is more informative for body envelope. The huge mandibles read too horn-like: correct mouth origin/forward reach from the natural plate. The label does not prove exactly20:1 or calibrated camera. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.

## Third-pass readable pixel references

Read the relayed third-pass direction (issue #1476, comments 6710686653/6710694651/6710701175). Two concepts are retained for review: **A jaw-forge silhouette; B worn shield shell**. Both keep the animal readable by exaggerating existing features only; armor, decoration, weathering and magic stay restrained. Body-scenes and invented anatomy are excluded.

[True 1× pixel reference](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/beetle/legend-pixel-l8-v3-1x.png) · [nearest-neighbour 4×](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/beetle/legend-pixel-l8-v3-4x.png). The sheet uses the existing v2 concept plate as a source anchor, reduced to a readable game-style pixel grid and enlarged 4× with nearest-neighbour. Each concept includes hero and approximate game-camera towards/away silhouettes, witch scale and forest trees.

**Review limits:** These are reference derivatives, not runtime sprites. 1× is a readability target, not a measured final tile size; 4× is a nearest-neighbour inspection aid. Exact giant scale, camera projection, lighting, gait, distant LOD and graph implementation remain unverified.
