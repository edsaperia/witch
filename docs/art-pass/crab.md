# Fiddler crab: body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Male fiddler crab (Uca sensu lato), not symmetrical shore crab. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Broad low carapace, wider than front-to-back length
- Two tall independently mounted stalk eyes
- Four pairs of lateral walking legs, eight walking legs total
- One front display claw and one much smaller feeding claw
- Ten appendages when both claw-bearing limbs are counted
- Folded abdomen beneath carapace, no external lobster tail
- Low sideways scuttle with a stable supported shell

## Body plan and mass

L = carapace front-to-back length, excluding eyes/claws. Width 1.25–1.60L; shell depth 0.35–0.55L; eye stalk extension 0.35–0.65L. Adult major claw assembly 1.0–1.6L, minor claw 0.25–0.45L; walking-leg root-to-tip chain 0.8–1.3L. No separate projecting head/neck/tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Central broad shell on a wide support polygon. The large unilateral claw creates obvious asymmetry, while the eight legs keep its weight visually grounded.

**Age0:** Source levels explicitly shrink both claws and tuck the baby legs; adult gains a dominant claw and barnacles. Game age0 is a juvenile crab, not the earlier swimming zoea/megalopa stages.

**Top three priorities:** Exaggerate one claw only → maintain eight walking legs → keep stalk eyes clear.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/crab/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

The initial Commons shore-crab photo verified broad shell and lateral leg plan but was the wrong claw target; the symmetric generated trial was rejected. Robert Bachand's Animal Diversity Web male fiddler photo was then inspected at full size: one oversized pale claw, a tiny other claw, tall stalk eyes and low laterally spread legs. The replacement matches this asymmetry. It still crowds far-side feet, so exact count comes from anatomy.

[Photo gallery](https://commons.wikimedia.org/wiki/Carcinus_maenas) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/crab/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No decapod/fiddler assembly in #1866. Generic head/shell/tail sockets do not provide hinged two-finger pincers, independent eye stalks and eight lateral multi-joint legs or their sideways gait. Need handed claw size without mirroring it into two giant claws.

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/crab/legend-comparison-l8.png). A: tide herald with immense reef-aged beckoning claw. B: mudflat oracle with tall reflecting eyes. C: rootbreaker with broad digging feet and offering.

**First-pass recommendation A — A is the fiddler's own display magnified into an ancient tidal ritual. Tide-eroded ivory edges and restrained barnacles show age; the huge single claw makes its power immediately animal-specific.** Ed judges the recommendation. Signature element: **Colossal tide-eroded beckoning claw**.

**Chosen legend checklist/body plan:** Display claw assembly 2.0–2.8L, opposite feeding claw 0.25–0.45L; shell width stays 1.3–1.6L. Keep tall eyes visible above claw and eight feet supporting the load. Add local reef wear and sparse barnacles, not a second large claw or a uniform crown.

**Additional graph needs:** Asymmetric hinged display claw, independently worn pincer surfaces, barnacle sockets and slow display-pose target distinct from side scuttle.

**Area/story source:** art/areas/mudflat/recipe.js text: grey shining mud and crab holes, tide channels, breathing roots/pebbles, arching mangroves, an old canoe and crab pots.

**Comparison limits:** Legend image adds mangrove-root framing and mud despite the plain-background request; those are context only, not required creature geometry. B and C exaggerate feet more than the natural crab. Current albedo already has useful single-claw emphasis. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/crab/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/crab/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/crab/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A tide-gate herald; B remembered-tide eyes; C moon-caller with vertical tides (maximum fantasy).

**Current proposed pick A. Signature element: Tide gate inside one colossal display claw.** The fiddler's one beckoning pincer becomes the gate through which tides answer. Reef wear and offerings imply generations of reverence, without replacing the crab with a generic moon idol. B's eye mirrors and C's moon remain alternatives. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Keep eight walking legs plus two claw limbs, one major/one tiny. Preserve the above major-claw range2.0–2.8L; weather the inner claw into a tide-gate arch, with water visibly tied to the pincer opening. Tall eye stalks must remain clear of the gate. Shell and feet feel massive rather than delicate stilts.

**Additional graph needs:** Independent hinged pincer digits and asymmetric scale, a local water-ribbon attachment inside the claw, sparse barnacle/offerings sockets, tide-worn surface masks and colossal silhouette/bounds. Water here is a proposed visual, not a fluid simulation/gameplay feature.

**Inspection and scale limits:** Witch and mangrove trees appear in every cell, and both rows retain one giant/one tiny claw. Far-side foot counts are occluded. Hero view can exaggerate height relative to foreground trees; exact20:1 is not measured. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.

## Third-pass readable pixel references

Read the relayed third-pass direction (issue #1476, comments 6710686653/6710694651/6710701175). Two concepts are retained for review: **A display-claw titan; B armored tidepool elder**. Both keep the animal readable by exaggerating existing features only; armor, decoration, weathering and magic stay restrained. Body-scenes and invented anatomy are excluded.

[True 1× pixel reference](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/crab/legend-pixel-l8-v3-1x.png) · [nearest-neighbour 4×](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/crab/legend-pixel-l8-v3-4x.png). The sheet uses the existing v2 concept plate as a source anchor, reduced to a readable game-style pixel grid and enlarged 4× with nearest-neighbour. Each concept includes hero and approximate game-camera towards/away silhouettes, witch scale and forest trees.

**Review limits:** These are reference derivatives, not runtime sprites. 1× is a readability target, not a measured final tile size; 4× is a nearest-neighbour inspection aid. Exact giant scale, camera projection, lighting, gait, distant LOD and graph implementation remain unverified.
