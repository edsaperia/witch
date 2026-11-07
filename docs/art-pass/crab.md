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

## Three legend concepts and recommended pick

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/crab/legend-comparison-l8.png). A: tide herald with immense reef-aged beckoning claw. B: mudflat oracle with tall reflecting eyes. C: rootbreaker with broad digging feet and offering.

**Recommend A — A is the fiddler's own display magnified into an ancient tidal ritual. Tide-eroded ivory edges and restrained barnacles show age; the huge single claw makes its power immediately animal-specific.** Ed judges the recommendation. Signature element: **Colossal tide-eroded beckoning claw**.

**Chosen legend checklist/body plan:** Display claw assembly 2.0–2.8L, opposite feeding claw 0.25–0.45L; shell width stays 1.3–1.6L. Keep tall eyes visible above claw and eight feet supporting the load. Add local reef wear and sparse barnacles, not a second large claw or a uniform crown.

**Additional graph needs:** Asymmetric hinged display claw, independently worn pincer surfaces, barnacle sockets and slow display-pose target distinct from side scuttle.

**Area/story source:** art/areas/mudflat/recipe.js text: grey shining mud and crab holes, tide channels, breathing roots/pebbles, arching mangroves, an old canoe and crab pots.

**Comparison limits:** Legend image adds mangrove-root framing and mud despite the plain-background request; those are context only, not required creature geometry. B and C exaggerate feet more than the natural crab. Current albedo already has useful single-claw emphasis. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.

