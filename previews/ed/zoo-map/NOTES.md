# The zoo laid out like the map: mock

Ed (2026-10-26): "The zoo should be laid out like the map; the sea are flagstone streets, and the islands are a single area the shape of the island but just for the animal that the island corresponds to. Islands that are not discovered yet appear as that biome's lake. Home appears as a stone plaza with the ent's sigil on it (drawn like the floor of a legend circle)."

This is a mock. Nothing here is merged.

## Pictures

- `map.png`: the whole zoo from above, drawn from the game's own data for world 0, using a sample save with 24 of 64 islands found (home's 10 kinds and the 14 nearest).
  - Every island is its chart outline scaled to one area (168 m across) at its chart place. The layout is spread so the nearest two are 198 m apart; the disc is 2.9 km across.
  - A found island is its area's floor colour, with its legend circle at the middle and its sigil carved in.
  - An undiscovered island is its biome's lake (`lakeLooks`: ice, tarn, lava, rust, oasis, lily, sinkhole, tar), with its animal's sigil faint on the water (Ed's answer).
  - Home is the Ent's plaza: pale flagstones with the World Tree carved in.
  - The streets are the dancefloor plaza's stone (art/dancefloor.js `DISCO_LOOK`: rim, rimDark, grout).
  - At the edge the flagstones give way to a band of water that pours off the disc, with space and stars beyond.
- `map-all.png`: the same with `?all`, the map's "see all" switch: all 64 islands found.
- `chart-edge.png`: the sea chart's own rim, the look the zoo's edge would copy. The sea darkens to the lip, pours off the disc (`seaChart.ts`'s `fall` skirt) and fades into the starfield.
- `frame-street.png`, `frame-above.png`: in play on a street, on foot and from the treetops. The streets are painted by the ground shader in the dancefloor plaza's flagstones (the same courses, joints, moss and grain as `uPave`), laid in straight courses along the street. This is the mock's hack in `src/render/ground.ts`. It paints today's zoo grid's streets, so it shows **the stone's look only**. The layout is the maps': as built, the flagstones fill the whole sea between the islands (Ed's answer below). `v1/` has the first try, the `flagstones` path strip, for comparison.
- `frame-island.png`: inside an island's area on foot, today's zoo block (its own floor, flora, runestone and nameplate).
- `lakes/lava-ground.png`, `lakes/ice-*.png`: two biome lakes as the game draws them today. An undiscovered island would be one of these in its outline.

## How it would read the chart

- **Positions and shapes**: the archipelago's layout for the world (`worldOf(world).islands`: each island's place on the disc) and each island's coast (`islandCoast(coastSpec(islandOf(kind, world)))`). Both are pure functions of the world seed, already shared by the chart and the dreams.
- **Discovered or not**: the chart save on this browser (`loadSave().found` and `world`, app/chartSave.ts), the same save the chart reads. `?zoo&all` uses `allSave()`, the map's "see all" switch.
- **The world seed**: the save's `world` (0 for the first campaign). `?world=N` previews another world.

## Scale (Ed answered)

Ed: "zoo creature areas should be about the same size as the ones found on islands."

- **Each island.** Its outline is scaled to **168 m across**, one ordinary area (`areaSize` × `areaScale`), whatever its real size. A phase 1 island and a phase 5 one are the same size, each in its own shape.
- **The chart's layout** is spread just enough that the nearest two islands' middles are 198 m apart, which leaves at least 30 m of street between any two. For world 0 that makes the disc **2.9 km across**. The positions are the chart's own, scaled.
- **The streets** run 30 m wide at the narrowest and open into broad squares where the chart's sea is wide. Long trips can be by broom.
- **Home's plaza** is about 140 m across, with the treehouse and dancefloor on it as today's zoo entrance.

Today's zoo is about 9 by 8 blocks of 168 m (about 1.5 by 1.3 km). This is about twice as far end to end, but most of it is street.

## Today's purpose: reviewing all 64 area types (Ed answered)

Ed: "like the map, there is a debug switch, 'see all areas', that makes all areas discovered." The map's switch is `?chart=all` (or `?all`), which loads `allSave()` (app/chartSave.ts) in place of this browser's save. The zoo would honour the same `?all`: every island shows its animal's area instead of a lake.

Checked against the code: there are **64 area types and 64 kinds, one each**. No kind is a placeholder any more, and no area type shares a creature. So with `?all` every area type appears on exactly one island, and no separate `?zoo=areas` grid is needed. The art tools that walk the zoo's blocks (`tools/zoo/trees.cjs`, `order.mjs`) would walk the islands instead.

## The legend circle at each island's centre (Ed)

Ed: "Each zoo area has the corresponding legend circle at the centre of it." Each found island has its animal's legend clearing in its middle, with the legend asleep in it. This is today's legend clearing: the flagstone floor with its sigil carved in, the rim kit and the grove.

- **Sizing.** The circles are sized as Echo's #1154 sizes them (`legendFit`, per-species sleeping footprints from `config/legend-footprints.json`, with the margin).
- **The cap.** In play, the 25 m cap comes from placing a circle in its area clear of the runestones. A zoo island is about 190 m across and its circle sits at the centre, so the zoo can allow a larger cap (about 45 m). The big sleepers that don't fit in play (elephant, griffin, frost wyrm...) would fit in the zoo.
- **The runestone.** It moves off the centre to the island's south shore, by the street, as a lit marker with the nameplate.
- **Proposal.** The zoo calls the same `legendFit` with a zoo cap (`zoo.legendCap`). I'll agree the call with Echo so there's one sizing function.

## The edge (Ed)

Ed: "Around the edge of the zoo, it looks like the map; all around the flagstones give way to water, which falls off the disc as a waterfall, and behind that is space."

The zoo is a disc like the chart. Its flagstones run out to about 1.12 times the islands' radius (the chart's `chart.edgeBand`, 0.18 past the islands), then a band of water about 180 m wide pours off the lip. Below and beyond is the night sky.

To build it, reuse the chart's sea, lip and `fall` skirt shaders (render/chart/seaChart.ts) at the zoo's scale, and the game's sky past the edge. The game already has a sea past the beach (`uBeach` in the ground shader), so the band could be that water with the chart's lip and fall added at the disc's rim. Flying off the edge is held back as the beach holds her today.

## Creatures there (proposal)

- Each found island holds only its own kind, at every age: baby, young and adult as today's block group (`config/zoo.json` group). Its legend sleeps in its clearing at the island's centre (below), with its nameplate and description as today.
- They are calm, as in today's zoo: no waves, no sieges, no timer, nothing attacks her. The 💌s work as they do in the zoo today.
- An undiscovered island's lake has no creatures.
- The streets have no creatures, and no trees except perhaps lone street trees.
- The plaza has the treehouse and dancefloor, as today's zoo entrance.

## Performance

- The zoo is already a real map (`rules/map.ts`'s "zoo" shape), and only the islands near her are made and drawn, as in play. The streets are ground plus a path strip, so there is no extra work there.
- Island-shaped areas need the zoo's partition to follow the coast outlines (each island one area, the sea one "street" region). That partition is made once at load from the 65 outlines and is cheap.
- The lakes use the existing lake looks (`?lakelook`), whose cost is measured in `tools/lakes/looks.cjs`. The worst (lava, glacier) are a little dearer than water, and only the ones near her draw.
- Fewer area types are loaded at once than in today's zoo, because fewer islands are near each other. Art bakes should drop.

## Streets (Ed answered)

Ed: "I think the streets should be the shape of the sea, and the areas should be the shape of the islands." The flagstones fill exactly the chart's sea, between the island outlines and out to the edge water, as `map.png` draws it. Each area is its island's outline, with no extra hint near the coasts.

## Undiscovered islands (Ed answered)

An undiscovered island is its biome's lake in the island's outline, with the animal's sigil drawn faintly on the water: like the legend floor's carving, but faint and watery. To build it, the lake shader takes the sigil's mask (`legendSigilMask`, as the carving does) at low strength, rippled by the water's own wobble.

## Questions for Ed

1. **Q1 (streets)**: plain flagstone streets everywhere, or the sea's shape kept by darker, wetter stone near the coasts?
1. **Q1 (animals)**: only the island's own animal at every age, plus its sleeping legend? Its legend sleeps at the centre. Should its quest work in the zoo (bring it the sigil it dreams of and it wakes happy), or should it only sleep, for show?
