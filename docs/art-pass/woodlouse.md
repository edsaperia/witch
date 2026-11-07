# Woodlouse: body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Oniscus asellus comparison, a terrestrial isopod rather than insect or spherical pillbug. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Low flattened oval body with overlapping transverse plates
- Seven pairs of adult walking legs, fourteen total
- Small tucked head and two prominent jointed antennae
- Short legs emerge beneath thoracic plates, not random abdomen segments
- Paired pointed rear uropods
- Armored back remains separate from flexible underside
- Plate rims read as overlapping shields, not one smooth shell

## Body plan and mass

L = front of head to rear body, excluding antennae/uropods. Width 0.45–0.60L; depth 0.18–0.28L; head approximately 0.10–0.15L. Antennae 0.30–0.45L; leg chains 0.15–0.25L; uropods 0.08–0.15L. No separate long neck, single external tail or insect waist. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Visual weight spreads evenly across low overlapping armor; many short legs keep it near the ground. Antennae are light and long, not load-bearing tusks.

**Age0:** Game genome uses five emphasized baby plates, seven youth and ten adult plates as a stylized evolution. These are not biological segment counts. Newly released real manca have six walking-leg pairs before gaining the seventh; game age0 target is explicitly a proxy and does not silently change the existing age design.

**Top three priorities:** Keep low overlapping armor → assign seven adult leg pairs → separate antennae/uropods.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/woodlouse/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons Oniscus live thumbnail confirms the low oval plated back, short underbody legs and prominent antennae. It cannot prove all fourteen feet or fine segment topology. Generated image adds uncertain plate/leg counts, so count and attachment rules in the checklist take precedence.

[Photo gallery](https://commons.wikimedia.org/wiki/Oniscus_asellus) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/woodlouse/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No isopod family in #1866. Generic shell socket exists but does not supply serial overlapping articulated tergites, seven short leg pairs with wave gait, separate pleon/uropods or jointed antennae. Need plate overlap preserved during crawl/curvature; do not substitute a mammal quadruped.

## Three legend concepts and recommended pick

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/woodlouse/legend-comparison-l8.png). A: walking hearth with roof-tile armor and warm inset door/window. B: fourteen-step keeper with lit feet. C: rain vault with water-bearing plates.

**Recommend A — A extends the existing home-carrying elder through the woodlouse's own overlapping shields. Weathered roof-like plates and a tiny warm interior make an ancient refuge, not a house simply perched on an unrelated animal.** Ed judges the recommendation. Signature element: **Warm hearth inside overlapping roof-plate armor**.

**Chosen legend checklist/body plan:** Armor depth 0.35–0.45L, width 0.65–0.80L, long whip antennae 0.65–0.90L. Preserve low isopod body and fourteen short adult feet. Inset one small door/window between side plates, keeping it clear of joints and gait; no new row of appendages. Avoid a full spherical roll for an Oniscus-based shape.

**Additional graph needs:** Serial overlapping shield surfaces with local warm aperture/window inset and body-following interior light sockets, long segmented antennae, fourteen-leg support wave.

**Area/story source:** art/areas.js moor text: moss, puddles/lake, long grass and moss mounds; genome's later legend heritage adds a little carried home. Rain wear ties the roof-plate refuge to that landscape.

**Comparison limits:** Legend generator makes plates overly architectural with tiny roof plants and indeterminate legs; retain the warm refuge idea, correct counts and simplify. C repeats the water-holding motif already selected for L4 moose, so it is not recommended. Current albedo's raised plates are worth keeping. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.

