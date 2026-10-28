# Trees for the open areas (proposal, for Ed's picks)

Ed, 2026-10-12: "let's see if we can reasonably put trees into areas with no trees". Each area here has no trees, or very few, today. Each proposal uses only the tree species the game already has, and tries to keep the area's character.

Each `<area>.png` (on claude/ed-shots, [previews/archive/art-review/mocks/trees-for-open-areas/](https://github.com/edsaperia/witch/tree/claude/ed-shots/previews/archive/art-review/mocks/trees-for-open-areas)) shows a small scene: the area's own floor, walls, small pieces, big pieces and set piece as the art draws them today (left), then the same with the proposed trees (right). [`all.png`](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/archive/art-review/mocks/trees-for-open-areas/all.png) has all twelve together.

These are mocks composed from the real sprites by `tools/flora/vignette.mjs` (the proposals are in `spec.json`), not the game's own placement. The added trees are drawn at the game's tall height class. No game code is changed.

| Area | Today | Proposed trees | How they stand |
| --- | --- | --- | --- |
| Moor | no trees (moss mounds, cairns, standing stones) | rowan, wind-bent hawthorn | 2 to 4 lone specimen trees an area, far apart |
| Stone shrine | no trees (standing stones, pillars, cairn) | yew, one holly | a ring of 5 or 6 old yews round the stones; the middle stays open |
| Log pile | no trees (logs, snags) | birch, aspen (young) | two loose clumps taking over between the logs |
| Ravine | no trees (rock, spires, stalagmite) | Scots pine, birch, rowan | on the rims only, leaning out over the drop |
| Meadow | very few (chestnut, hawthorn, lone) | one great field oak, lone hawthorns | specimen trees; the grass stays open for the flowers |
| Grassland | very few (field maple, weeping birch, lone) | hawthorn, crab apple | two hedgerow islands, 2 or 3 trees each |
| Heath | sparse (birch, hawthorn) | Scots pine, birch | a couple of lone pines and a birch clump |
| Wetland | edges only (willow, alder) | pollard willow, alder | clumps by the pools, into the middle too |
| Stream | sparse rows (alder, willow) | alder, willow | a denser row along the banks |
| Fen | edges only (aspen, alder) | alder carr, a willow | 2 or 3 low wet clumps among the pools |
| Heronry | sparse stands (elm, ash) | one great heron elm, willows | one tall heron tree, willows round the mere |
| Beaver pond | edges only (weeping birch, alder) | aspen, weeping birch | round the pond, some leaning where the beavers have gnawed them |

## How it would go in (not done yet)

- Today an area's big pieces are either all trees (the wooded areas, dealt from their flora) or all props (moor, stone shrine, log pile and ravine). The first four proposals therefore need a small change: an area could carry a few trees beside its props, each with its own share of the big pieces and its own pattern (lone, ring, edge, clumps).
- The other eight already have trees. For them it's data: their flora, their layout's density and pattern, and their `treeDensity` in `config/area-types.json`.
- Every picked tree is an existing species, so there is no new art. The art check's flora rules still hold: 3 to 6 species per wooded area, no species the main kind of more than two areas.
