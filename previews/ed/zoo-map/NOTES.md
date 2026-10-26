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
- `frame-fence.png`, `fence-close.png`: the little gold fence (Ed's), a concept painted in the bold pixel style over the island frame, and a close-up of a section.
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

## The gold fence (Ed)

Ed: "Zoo areas, apart from home, should have a little gold fence around them, that stop creatures passing."

- **Where.** Along every found island's outline (gold in `map.png`). There is none round the home plaza.
  - **Undiscovered lakes: no fence (proposal).** Nothing lives on them to keep in, and the shore already reads as the edge. When the island is found, its lake becomes the area and the fence appears with it.
- **Look.** Bold pixel style: three hue-shifted gold tones (a cream highlight, a mid gold, a warm brown shade) and a near-black outline. Posts 2 m apart with ball finials and two rails, 0.9 m tall, about half the witch's height. It is a prop in the art (a `zooFence` piece in art/country.js beside `fence`: posts and rails in a new gold material, or `M.ACCENT` with a gold palette), laid along the outline the way paths lay their edge props. It doesn't glow.
- **Creatures.** They can't cross it. Each island's creatures keep to its outline, the way a legend's baby keeps to its clearing today (`keepsToCircle`): the rules clamp a creature that would step outside back to the inside. A 💌 still flies over.
- **The witch.** She steps over it on foot. It is too low to block her, so the rules don't collide her with it, and she walks straight across; the drawing gives her a small step-up as she crosses. In the treetops she simply flies over. Her leashed creatures follow her across: a leashed creature isn't held by its island.

## Questions for Ed

1. **Q1 (streets)**: plain flagstone streets everywhere, or the sea's shape kept by darker, wetter stone near the coasts?
1. **Q1 (animals)**: only the island's own animal at every age, plus its sleeping legend? Its legend sleeps at the centre. Should its quest work in the zoo (bring it the sigil it dreams of and it wakes happy), or should it only sleep, for show?

## The fence: Versailles railings (concept, before the final art)

The brief: gilded railings about 1–1.2 m, close-set bars with spearhead finials, a lower band with rosettes, taller posts with urns, and gilt streetlamps with lantern heads every ~30 m that really light the ground.

- `fence-close.png`: one run close up, in the bold pixel style (three gold tones, near-black outline). Bars every 2 art px with spearheads, a rail band with rosettes low down, a post with an urn every 4 m, and a lamp (about 4 m, a lantern head) casting a warm pool.
- `frame-fence.png`: the same overlaid in play at the game's scale (an art pixel is about 0.13 m, so the railing is 1.1 m, a little under her shoulder).
- `lamps-above.png`: zoomed out over world 0. A lamp about every 30 m, spread evenly round each island (17–18 an island), each with its warm pool.

**The light budget.** That is about 1,100 lamps over the whole zoo (about 170 in a treetop view). The plan: every lamp's head glows (emissive, free), its pool is drawn in the ground shader from the nearest lamps' places, and only the nearest ~8 to her also feed the game's point lights (the house/party light system), so the cost is the same as a party area's.

**Flying over.** The fence stops walking only (her on foot, every creature). Rising and flying cross it, and her leashed followers follow her over, as they would anywhere (tested: `src/rules/zooFence.test.ts`).

**Knocked out in the zoo** she comes back on home's plaza (tested).

## The build (PR #1184, v4738): frames in `build/`

- `fence.png`: on a street by the wolf island's gold fence (placeholder strip until the Versailles railings are approved), its runestone and nameplate.
- `legend.png`: the wolf island, its wolves at every age, the legend asleep in its circle at the middle, sigil carved in the floor.
- `plaza.png`: the Ent's circle at the zoo's middle, the World Tree carved in the flagstones. No treehouse, dancefloor or speakers (Ed, 2026-10-26).
- `edge.png`, `edge-above.png`: the flagstones give way to water, which ends 30 m out where it pours off into space.
- `above.png`: an island from the treetops, its fence and the streets round it.
- `lake.png`, `lake-above.png`: an undiscovered island's lake inside its fence (shot on the build before the islands were brought closer).
- The zoo is flat; islands are 12 m of street apart at the nearest (was 30).

## The fence, round 2: five times taller (concept, before the final art)

Ed: "Make it more Versailles. Add fleur-de-lis tips, a curly scroll band and proper urns on the posts. Make it five times taller." (The 1.1 m round is in `short/`.)

- `fence-close.png`: a 10 m run at 5 screen pixels an art pixel, her height beside it.
  - 5.5 m of railing (42 art pixels).
  - Bars every 4 pixels: a lit pixel and a dark one, two clear between, so half of it is see-through.
  - Fleur-de-lis on every other bar, spear points on the rest.
  - Two bands of C-scrolls meeting at rosettes, near the foot and near the top.
  - A pilaster every 4 m with a capital, a footed urn and a flame finial (about 8 m to the flame).
  - A gilt lamp every 30 m, its lantern about 8.5 m up, over the urns, lighting a warm pool on the street.
  - Three gold tones and a highlight, with a near-black edge on the ornament (gold, not brass).
- `frame-fence.png`: painted along the wolf island's fence line in a game frame. She stands on the street before it; the wolves' garden shows through the bars.
- `fly-over.png`: her in the treetops (24 m) over the same island's front, with the railing along it and its lamps' pools. She clears it by about 18 m.

Knock-ons:
- **Flying over:** her flight height is 24 m (`treetopHeight`), so she clears 5.5 m by far. The fence only stops anything on foot. Her leashed followers cross with her (tested); every other creature is held in.
- **The camera:** from the street, she stands in front of it. Inside an island, with the fence between her and the camera, 5.5 m of gold would cover her. The final art fades the fence round her line of sight, as the scenery fade does trees.
- **The lights:** the same budget as before. About 1,100 lamps over the whole zoo; every lantern glows (emissive); the pools are painted in the ground shader; only the nearest ~8 cast real point lights.
- **Cost:** one mesh for all the railings (a textured ribbon), and the lamps one sprite batch, so no more draw calls than the 1.1 m fence.
