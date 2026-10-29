# Tuning knobs

Generated from `config/tuning.json` (the values), `config/schema/tuning.schema.json` (types and ranges) and `config/knobs/<section>.json` (what each knob does, Ed's decisions) by `node tools/config/schema.mjs --docs`; don't edit by hand. A test fails if it's out of date.

Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.

## Map

The map and its places: the areas, their size and shape, the beach, glades, paths, walls, scenery pieces, set pieces, the treehouse, home and the legends' clearings and relics.

### `mapAreas`

| knob | type | range |
|---|---|---|
| `mapAreas` | number | 0 to … |

### `map`

The forest's size: how many areas there are and how big each one is.

The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger).

- **`map.shape`**: The map's shape [1].
  1. Ed, 2026-10-06: "The map as a whole should be circular rather than square, with a buffer zone with no runestones around the edge"
- **`map.islandAreas`**: How many areas the island has round home, and its round, buffered shape.
  1. Ed, 2026-10-11: the journey's islands: 10, the home island for now; ?island=10\|20\|...\|64\|home, ?island=off for the radius map
  2. Ed, 2026-10-07: 5.6: about 96; for about 100 areas: the best bots wake about 20 in a run, and half the creatures and trees run faster; 7.9 gave about 196, as many as the old 14 x 14
  3. Ed, 2026-10-11: the land map, rules/land.ts: round the borders of the playable areas, the ring of areas round them and, where it's near, the ring past that
  the island is home and exactly this many more areas, those nearest home's, round, its radius halfway out to the next (0: the radius below). shape circle: the playable areas are those whose centres lie within radius areas of home's [2], and only they get runestones, soundsystems, legends, relics and creatures and wake in waves; past them a buffer ring buffer areas deep (1 to 1.5), forest she can fly over where nothing happens; her flight's edge is the island's coast [3], soft over its last push metres (her speed outward easing to nothing at the edge, and a drift of up to drift m/s taking her back in); the forest goes on edge areas past it, into the fog.
  Code: `rules/land.ts`
- **`map.island`**: Which island is played: home, built from the kinds she knows, or another by its roster.
  1. Ed, 2026-10-11: the journey's rosters; rules/rosters.ts, config/kinds.json
  "home" plays home by roster, one area per kind she knows (the 10 kinds introduced at home and each kind whose island she's found, map.found: growing outward, its first areas the same; islandAreas its least, the kinds again past one each), its legends dealt each night, 1 in 5 areas; a kind's name (?island=fox) plays that kind's island, its own seed (where it lies on the sea chart) and size by phase (10 a phase), its roster that kind plentiful, 1-3 kinds new to its phase and the rest by bearing; empty, areas of random types as before.
  Code: `rules/rosters.ts`, `config/kinds.json`
- **`map.found`**: the kinds whose islands she's found (the night's legends favour the others).
- **`map.phase`, `map.shapes`**: How an island grows out from home, its outline rounder or more lobed, bayed and armed the further out it is.
  1. Ed, 2026-10-11: the journey's irregular islands: rules/islandGrowth.ts
  an island grows out from home over its areas' neighbours, each step the area nearest home for the island's reach that way, by its phase's shape (shapes[phase], index 0 home: near-round; 1 gently lobed; 2 bays and a peninsula; 3 arms and inlets; 4 and 5 strongly irregular): lobes, how far its outline swells and shrinks round home (a share of its reach) over harmonics bumps; arms, how far its peninsulas reach past it (a share), armCount[0] to [1] of them, each armWidth radians across; bays, how deep its bays cut in, bayCount[0] to [1] of them; jitter, each area's own seeded nudge in areas (ragged edges). Home's neighbours are always its first. an island's phase when it isn't one by roster (?phase=0 to 5; a kind's island takes its own).
  Code: `rules/islandGrowth.ts`
- **`map.coast`**: How irregular the island's coastline is, with gentle bays and headlands rather than a perfect circle.
  1. Ed, 2026-10-06: "The island shouldn't be a totally perfect circle; make the coast slightly irregular"
  which areas are playable and which the buffer's goes by their centres' distance from home over the same seeded coast, up to amp of its radius in or out (0 for a perfect circle): harmonics gentle bays and headlands (from two round the island up), plus detail (a share) of finer wobble. shape square: mapAreas x mapAreas as before (?shape=square to compare). ?mapAreas=<n> on the circular map sets the radius for about n x n areas.

| knob | type | range |
|---|---|---|
| `map.shape` | string | "circle" / "square" / "zoo" |
| `map.radius` | number | 0 to … |
| `map.islandAreas` | number | 0 to … |
| `map.island` | string |  |
| `map.found` | array of any |  |
| `map.phase` | number | 0 to … |
| `map.shapes` | array of object |  |
| `map.buffer` | number | 0 to … |
| `map.push` | number | 0 to … |
| `map.drift` | number | 0 to … |
| `map.edge` | number | 0 to … |
| `map.coast.amp` | number | 0 to … |
| `map.coast.harmonics` | number | 0 to … |
| `map.coast.detail` | number | 0 to … |

### `biomeLooks`

How strongly an island's forests take on its biome's look, more so the further out its ring.

1. Ed, 2026-10-25: "Lower phase non-home biome areas can be semi-temperate looking; higher phase biomes are more extreme; so there's a smoother transition between phases"
How strongly an island's forests take its biome's look (art/flora/biomes.js), by its ring [1]: strength[0] for phase from's islands, strength[1] the next ring out, and so on, the last for any further; each mixes the biome's look toward temperate's by 1 - strength (1 the full look). Rings nearer in are temperate. Its own art: a ring's strength is in its key (rules/lakeLooks.ts biomeKey).
Code: `art/flora/biomes.js`, `rules/lakeLooks.ts`

| knob | type | range |
|---|---|---|
| `biomeLooks.from` | number | 0 to … |
| `biomeLooks.strength` | array of number |  |

### `lakes`

Lakes on the outer islands: some areas are water she can fly over but not land on, some with biome looks like frozen or lava lakes.

1. Ed, 2026-10-11: the journey's islands: rules/lakes.ts
2. Ed, 2026-10-23: render/lakeLooks.ts, each lake the sea chart's look for it
Lakes [1]: from phase 1 some of an island's areas are water, map.shapes[phase].lakes (fewest, most) of them, each lakeSize (fewest, most) areas, never home or its neighbours, the rest of the island still joined (rules/islandGrowth.ts placeLakes); no beaches but a small shore, their water lighter than the sea; she flies over them in the treetops but never lands on the water, and on foot she and every creature stop at the shore. The biome lakes in play [2]: the north's glacier's peaks kept glacierClear metres under her treetop flight (treetopHeight), and the hot springs' (the rust pools') steam: on, puffs rising rise metres over life seconds, size metres across, at opacity, a vent every spacing metres over their deep water.
Code: `rules/lakes.ts`, `rules/islandGrowth.ts`, `render/lakeLooks.ts`

- **`lakes.shore`**: metres of bare shore round the water (no trees, nothing placed).
- **`lakes.pad`**: how far from the water anything on foot stops.
- **`lakes.koi`**: the share of lakes with koi in them (DECISION FOR ED).
- **`lakes.biomeFrom`**: the island phase from which its lakes take the look of its compass biomes on the sea chart (frozen, lava, oasis, sinkhole, glacial tarn, tar pit, rust pool, lily pond; app/chartOutlines.worker.ts), before it plain water [1].
  1. Ed, 2026-10-12: "biome lakes can start appearing one phase earlier" (3, it was 4, the first uncharted islands)
  Code: `app/chartOutlines.worker.ts`
- **`lakes.biomeFirstShare`**: the share of that first phase's lakes that take them, each lake seeded, the rest plain water; further out all of them, further in none [1].
  1. Ed, 2026-10-12: "half the lakes in the third ring are special. Further out they're all special, further in they're all plain"

| knob | type | range |
|---|---|---|
| `lakes.shore` | number | 0 to … |
| `lakes.pad` | number | 0 to … |
| `lakes.koi` | number | 0 to … |
| `lakes.biomeFrom` | number | 0 to … |
| `lakes.biomeFirstShare` | number | 0 to … |
| `lakes.glacierClear` | number | 0 to … |
| `lakes.steam.on` | boolean |  |
| `lakes.steam.rise` | number | 0 to … |
| `lakes.steam.life` | number | 0 to … |
| `lakes.steam.size` | number | 0 to … |
| `lakes.steam.opacity` | number | 0 to … |
| `lakes.steam.spacing` | number | 0 to … |

### `chart`

The sea chart (the map table and chart.html; render/chart/seaChart.ts, render/chart/moon.ts).

Code: `render/chart/seaChart.ts`, `render/chart/moon.ts`

- **`chart.moon`**: The moon rising and circling over the sea chart each time it opens.
  1. Ed, 2026-10-12: "islands casting shadows from the moon orbiting the map screen"
  2. "have the moon rise over the North West edge of the map as you open the map screen" (#746)
  each time the chart opens the moon rises over its edge at bearing from (degrees, 0 north, clockwise: -45 the north-west) over rise seconds, from just under the horizon to height degrees, then goes round once every turn seconds; every island's relief throws a shadow away from it, across the sea and into its own valleys, shadow its darkest (0 none, 1 black), the hills' shading following it.
- **`chart.moon.disc`**: its disc drawn in the sky past the rim at its bearing (hidden behind the world).
- **`chart.edgeBand`**: (#746: "add empty sea around the edge of the map"): the empty sea past the furthest islands, the disc's radius beyond theirs as a share of it (0 as before; at most 0.6).
- **`chart.sailHold`**: How long the use button is held on an island at the sea chart to sail there.
  1. Ed, 2026-10-23: "You have to hold the button to select a new island to sail to (ring fills)"
  Seconds the use button (E, Enter, the pad's square) or the mouse is held on an island at the map table's chart to sail there, its ring filling [1]; let go early, nothing. A click only chooses.

| knob | type | range |
|---|---|---|
| `chart.moon.rise` | number | 0 to … |
| `chart.moon.turn` | number | 0 to … |
| `chart.moon.height` | number | 0 to … |
| `chart.moon.from` | number |  |
| `chart.moon.shadow` | number | 0 to … |
| `chart.moon.disc` | boolean |  |
| `chart.edgeBand` | number | 0 to … |
| `chart.sailHold` | number | 0 to … |

### `islands`

How the other islands look on the sea chart and in the dream bubbles: their coastlines and shapes.

Islands other than home (the wave 2 finale's dream bubbles and the sea chart; rules/islandShape.ts, art/islands.js; Ed, docs/backlog/journey.md): coast, the coastline's knobs as map.coast's (amp, the most it strays from round, a share of the radius; harmonics, how many bays and headlands; detail, the finer wobble), stronger than home's so every island has a shape of its own, read at a bubble's 30 pixels.
Code: `rules/islandShape.ts`, `art/islands.js`, `docs/backlog/journey.md`

| knob | type | range |
|---|---|---|
| `islands.coast.amp` | number | 0 to … |
| `islands.coast.harmonics` | number | 0 to … |
| `islands.coast.detail` | number | 0 to … |

### `beach`

The strip of sand round the island's edge, where she can lie down to stargaze and meet other witches.

1. Ed, 2026-10-06: "Outside of the circular map, there is the sea. A beach surrounds the island, and the calm dark water reflects the sky. You can hear the sound of the waves. If you try and fly past the beach, you land and stargaze (the party lying down pose). Other witches can be found on the beach occasionally; if you land near them, you chat, hold hands, and hug. Try and do this in a way that doesn't cost performance - most games won't ever go to the beach, it's just an Easter egg for adventurers."
2. Ed, 2026-10-07: "move the camera further and lower to show off the moon reflecting on the water and the beach and the sky ... check in 12 different directions for a nice composition and smoothly interpolate between them"
3. Ed, 2026-10-06: "the bend shader applies so that you can see the sky"
4. Ed: "it's stronger than usual, so the sky takes up more of the screen"
5. Ed: "If you land near another witch, and you stargaze together, and you wait a few seconds, little hearts will start appearing near you both, floating upwards and disappearing"
6. Ed: "they last longer and disappear more slowly (5 seconds)"
7. Ed, 2026-10-06: "I think there should always be beach witches, but there are only a handful spread around it" (every run)
8. Ed, 2026-10-06: "Beach witches appear solo" (one)
The beach [1]: sand over the last width metres inside her flight's edge (nothing grows or stands on it), the sea from shore metres past the edge, the hills eased over ease metres down to sand metres high where the sand starts and to sea metres at the water. Flying on out over the sand for restAfter seconds she lands (from the treetops too) and lies down to stargaze; any other way gets her up. Lying there facing out to sea (the north coast: the camera always looks north), the bend keeps only camera.seaward of itself, so the open water isn't dropped below a horizon of sand. Lying down, the camera stands by her bearing round the coast [2]: camera.bearings, twelve entries every 30 degrees from the north, clockwise: angle (degrees below the horizon), distance (metres back), look (metres over her it aims at), side (metres east it stands and aims: out over the water on the east and west coasts, so the shore runs up the picture with the sea beside it) and bend (the share of the stargazing bend kept there: none facing the open sea to the north, so the water isn't dropped below a horizon of sand; camera.seaward does the same on the way down to the water), joined smoothly all the way round. Lying there [3] the world bends stargazeCurve times the treetops' curve [4], eased in and out over about gazeEase seconds, so the night sky opens up over the sea. Lying there with a beach witch [5]: after hearts.after seconds a ❤️ rises off one or the other every hearts.every[0] to [1] seconds, for hearts.life seconds each, until either gets up; the two stay lying together until she moves. A 💌 come down on the sand or the sea [6] rests letterLinger seconds, fading over the last letterFade, bobbing gently on the water. witchChance of runs [7] have spots[0] to spots[1] spots spread round the coast (evenly, each nudged by up to a third of the gap), each with witches[0] to witches[1] witches [8]; landing within meet metres of them and keeping still for idleAfter seconds, one chats, holds hands, hugs and stargazes with her, turn seconds each. None of it is drawn or heard unless she's within shown metres of the sand, nor the witches stepped beyond simRange. on false: forest to the edge, as before.

- **`beach.grain`**: how far each of the sand's art pixels is lightened or darkened at random, 0.14 = ±7%; the sand and sea draw their art pixels doubled until each covers at least a screen pixel (render/ground.ts), so the grain stays chunky under the beach's far, low camera.
  1. Ed, 2026-10-12: "The beach is not pixelated like everything else"
  Code: `render/ground.ts`
- **`beach.vary`**: the sand's width round the coast, width times e to the amp times a seeded smooth noise of harmonics bays and narrows; where the noise is lowest (below -rocky, of -1 to 1) it turns rocky, narrowing to rockyWidth metres; never under min.
  1. Ed, 2026-10-06: "The beach can be more irregularly shaped"
- **`beach.decor`**: Shells, starfish, seaweed, pebbles and footprint trails scattered along the beach.
  1. Ed, 2026-10-06: "a few beach decorations, sparsely: shells, star fish, conch, footprints of people and creatures ... just nature" (rules/beachDecor.ts, art/beach.js)
  2. Ed, 2026-10-12: too many on the beach, so finds and trails halved, to 0.35 and 0.035
  round the coast in sectors sectors, about finds finds a sector (shells, starfish, a conch, seaweed, pebbles; rocks on a rocky stretch), each sector with a trails chance of a trail of prints[0] to prints[1] footprints (bare feet, paws, hooves, a bird's, weighted by kinds) wandering along the sand and fading out [2]; all of it on the wet and dry sand, the clear metres of it nearest the woods left bare.
  Code: `rules/beachDecor.ts`, `art/beach.js`
- **`beach.decor.findScale`**: the beach finds' size, times [1].
  1. Ed, 2026-10-11: twice; the footprints keep theirs
- **`beach.dolphins`**: Dolphins leaping off the east coast while she's on the beach.
  1. Ed, 2026-10-07: their timetable rules/seaLife.ts, drawn by render/dolphins.ts
  leaping off the east coast, within arc radians of due east, one every every[0] to [1] seconds, pair of them in twos, out[0] to [1] metres past the water's edge from her and ahead[0] to [1] metres north of that (away from the camera: the stargazing bend drops anything much more than 20 m ahead of her below the screen), each leap length metres along the coast and height high over time seconds.
  Code: `rules/seaLife.ts`, `render/dolphins.ts`
- **`beach.kraken`**: A kraken's tentacles rising off the west coast now and then while she's on the beach.
  1. Ed, 2026-10-07: rules/seaLife.ts, render/kraken.ts
  off the west coast, within arc radians of due west, a slot every every seconds, chance of them holding a rising: tentacles[0] to [1] tentacles rising one after another out[0] to [1] metres past the water's edge from her and ahead[0] to [1] metres north of that, each over time seconds, and in head of them the dome of its head and its eye.
  Code: `rules/seaLife.ts`, `render/kraken.ts`

| knob | type | range |
|---|---|---|
| `beach.on` | boolean |  |
| `beach.grain` | number | 0 to … |
| `beach.width` | number | 0 to … |
| `beach.shore` | number | 0 to … |
| `beach.vary.amp` | number | 0 to … |
| `beach.vary.harmonics` | number | 1 to … |
| `beach.vary.rocky` | number | 0 to 1 |
| `beach.vary.rockyWidth` | number | 0 to … |
| `beach.vary.min` | number | 0 to … |
| `beach.decor.on` | boolean |  |
| `beach.decor.finds` | number | 0 to … |
| `beach.decor.findScale` | number | 0 to … |
| `beach.decor.trails` | number | 0 to 1 |
| `beach.decor.prints` | array of number |  |
| `beach.decor.clear` | number | 0 to … |
| `beach.decor.sectors` | number | 8 to … |
| `beach.decor.kinds` | array of number |  |
| `beach.ease` | number | 0 to … |
| `beach.sand` | number | 0 to … |
| `beach.sea` | number |  |
| `beach.restAfter` | number | 0 to … |
| `beach.stargazeCurve` | number | 0 to … |
| `beach.gazeEase` | number | 0 to … |
| `beach.letterLinger` | number | 0 to … |
| `beach.letterFade` | number | 0 to … |
| `beach.hearts.after` | number | 0 to … |
| `beach.hearts.every` | array of number |  |
| `beach.hearts.life` | number | 0 to … |
| `beach.shown` | number | 0 to … |
| `beach.witchChance` | number | 0 to … |
| `beach.spots` | array of number |  |
| `beach.witches` | array of number |  |
| `beach.meet` | number | 0 to … |
| `beach.idleAfter` | number | 0 to … |
| `beach.turn` | number | 0 to … |
| `beach.simRange` | number | 0 to … |
| `beach.camera.approach` | number | 0 to … |
| `beach.camera.angle` | number | 0 to … |
| `beach.camera.curve` | number | 0 to … |
| `beach.camera.seaward` | number | 0 to 1 |
| `beach.camera.bearings.angle` | array of number |  |
| `beach.camera.bearings.distance` | array of number |  |
| `beach.camera.bearings.look` | array of number |  |
| `beach.camera.bearings.side` | array of number |  |
| `beach.camera.bearings.bend` | array of number |  |
| `beach.dolphins.on` | boolean |  |
| `beach.dolphins.arc` | number | 0 to … |
| `beach.dolphins.every` | array of number |  |
| `beach.dolphins.pair` | number | 0 to … |
| `beach.dolphins.ahead` | array of number |  |
| `beach.dolphins.out` | array of number |  |
| `beach.dolphins.length` | number | 0 to … |
| `beach.dolphins.height` | number | 0 to … |
| `beach.dolphins.time` | number | 0 to … |
| `beach.kraken.on` | boolean |  |
| `beach.kraken.arc` | number | 0 to … |
| `beach.kraken.every` | number | 0 to … |
| `beach.kraken.chance` | number | 0 to … |
| `beach.kraken.tentacles` | array of number |  |
| `beach.kraken.ahead` | array of number |  |
| `beach.kraken.out` | array of number |  |
| `beach.kraken.time` | number | 0 to … |
| `beach.kraken.head` | number | 0 to … |

### `areaSize`

| knob | type | range |
|---|---|---|
| `areaSize` | number | 0 to … |

### `areaScale`

| knob | type | range |
|---|---|---|
| `areaScale` | number | 0 to … |

### `arena`

Every area is kept mostly open round its centre and its soundsystem, so fights have room.

every area is mostly open within radius metres of its centre and its soundsystem, for fights (they range 15 to 45 m), and (Ed: softer edges; then, at v473, a smaller clearing and a long soft gradient from the area's edge to near its runestone) the woods thicken over a band band metres wide beyond it, across most of the area, along curve (linear: thinning in from right past the open middle; smooth: a slow start), lone trees and bushes thinning out into the clearing, its edge wobbled by noise (a share of the band) so it's no ring; both times fight.scale.

- **`arena.bushes`, `arena.tufts`**: the share of the undergrowth and the ground cover left in its open middle.

| knob | type | range |
|---|---|---|
| `arena.radius` | number | 0 to … |
| `arena.band` | number | 0 to … |
| `arena.noise` | number | 0 to … |
| `arena.bushes` | number | 0 to … |
| `arena.tufts` | number | 0 to … |
| `arena.curve` | string | "linear" / "smooth" |

### `areaSizeVariance`

How much areas vary in size, some small and some large.

1. 2026-10-05: "make areas larger; each is effectively a fighting arena"
(0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are. Ed [1]: 14 x 14 areas of 168 m (areaScale 6), about the same world as 20 x 112 m.

| knob | type | range |
|---|---|---|
| `areaSizeVariance` | number | 0 to … |

### `borderLayers`

| knob | type | range |
|---|---|---|
| `borderLayers` | number | 0 to … |

### `clearingSize`

(0-1): how far out from an area's centre the ground stays fully open.

| knob | type | range |
|---|---|---|
| `clearingSize` | number | 0 to … |

### `clearingFalloff`

(0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges).

| knob | type | range |
|---|---|---|
| `clearingFalloff` | number | 0 to … |

### `gladeAmount`

How much of the woods is open in random glades.

(0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.

| knob | type | range |
|---|---|---|
| `gladeAmount` | number | 0 to … |

### `gladeScale`

| knob | type | range |
|---|---|---|
| `gladeScale` | number | 0 to … |

### `areaEdgeBlend`

Trees and bushes near an area's border take the look of the area next door, so borders blend rather than form a line.

1. Ed, 2026-10-13: 40: #887, so the planting blends across the borders; it was 20
2. Ed, 2026-10-26: "The effect that makes tree placement from neighbouring areas blend should be increased"
3. Ed, 2026-10-26: "I don't think tree blending borders need to wander, as the area edges themselves are already noisy" (on v4618; it was 30)
Blended area edges: each tree and bush takes its look (its area type) from a point up to width metres away [1], the offset mostly the plant's own, drawn independently of its neighbours' (stray of it: 0.85, Ed's #887 feedback, so the kinds interleave tree by tree rather than in clumps; it was 0.5), the rest a smooth noise scale metres across so the band doesn't run dead straight; the neighbour's share ramps from about half at the border to none width metres in. And the band itself wanders [2]: every plant near one spot shifted alike by up to warp metres, a noise warpScale metres across, so a border reads as ragged, gradual mixing rather than a line; width doubled to 80 then (it was 40). warp 0 since [3], kept as a knob. The pause page's Area blend slider sets width (a new map: it reloads). Only the look: creatures, partifying and the party border keep the exact borders.

- **`areaEdgeBlend.tufts`**: How far the ground cover blends across area borders as the trees do.
  the share of the band the ground cover blends over (0: the tufts keep the exact border, as before; they lie on the area's own floor, which keeps its edge, and a cave mouth's bare ground taking a grassland's thick grass 40 m in read as wrong; 1 blends them as the trees); their cell (a legend circle's floor, an arena) stays the exact one either way.

| knob | type | range |
|---|---|---|
| `areaEdgeBlend.width` | number | 0 to … |
| `areaEdgeBlend.scale` | number | 0 to … |
| `areaEdgeBlend.stray` | number | 0 to … |
| `areaEdgeBlend.warp` | number | 0 to … |
| `areaEdgeBlend.warpScale` | number | 0 to … |
| `areaEdgeBlend.tufts` | number | 0 to … |

### `groundBlend`

How neighbouring areas' floor textures meet, along a meandering, blended border.

How neighbouring areas' floor textures meet (Ed, v160): the border is warped by noise in two octaves (up to warp metres over about 40 m, and fine metres over about 6 m), so it meanders rather than following the texture's grid; across a band metres wide the two floors mix pixel by pixel, by noise and (dither) an ordered dither, like grass creeping into dirt. Visual only. ?blend=off turns it off.

| knob | type | range |
|---|---|---|
| `groundBlend.on` | boolean |  |
| `groundBlend.warp` | number | 0 to … |
| `groundBlend.fine` | number | 0 to … |
| `groundBlend.band` | number | 0 to … |
| `groundBlend.dither` | boolean |  |

### `ground`

Low rises and hollows in the ground's lighting, so it doesn't look flat.

The ground's fake relief (Ed, v171: so the ground doesn't look flat): low rises and hollows from noise about relief.scale metres across, tilting the ground's lighting by relief.strength (0 flat) so the witch's light and the campfires pick out the bumps, and hollows shaded darker by relief.shade. ?relief=0 turns it off.

- **`ground.layout`**: Every area's runestone stands on a rise and every legend's clearing lies in a hollow.
  1. Ed's idea, 2026-10-07: rules/terrain.ts; relayed by the coordinator: runestones on high ground, legends in low, trees thicker low down
  every area's runestone stands on a rise and every legend clearing lies in a hollow, rise and dip times the hills' amplitude high and deep (0.15 of 40 m: 6 m), each easing out over reach metres (kept short and low: the stones are about 110 m apart, a clearing about 65 m from its stone, and the slopes must stay under the camera's sightline) (the plateaus then level each one, so a stone tops a knoll and a clearing sits in a dell); trees grow up to trees (a share) thicker in the lowest ground and thinner on the highest, by the land's height over half the hills' amplitude (most of it lies within that). Drawing and tree placement only: the rules still move on flat ground.
  Code: `rules/terrain.ts`

| knob | type | range |
|---|---|---|
| `ground.relief.strength` | number | 0 to … |
| `ground.relief.scale` | number | 0 to … |
| `ground.relief.shade` | number | 0 to … |
| `ground.hills.on` | boolean |  |
| `ground.hills.amplitude` | number | 0 to … |
| `ground.hills.scale` | number | 0 to … |
| `ground.hills.octaves` | number | 0 to … |
| `ground.hills.shade` | number | 0 to … |
| `ground.layout.on` | boolean |  |
| `ground.layout.rise` | number | 0 to … |
| `ground.layout.dip` | number | 0 to … |
| `ground.layout.reach` | number | 0 to … |
| `ground.layout.trees` | number | 0 to … |

### `wisps`

Will-o'-the-wisps drifting through the wild areas near her, none near a party.

1. Ed, 2026-10-07
Will-o'-the-wisps in the wild areas [1]: a seeded chance per square of ground (cell m) within reach of her; none within partyNear of a partified area, the full chance from partyFar; height [low, high] m, drift m, a cycle of period s (fade in, linger, fade out, gone); core and halo size in art pixels; colour.

| knob | type | range |
|---|---|---|
| `wisps.on` | boolean |  |
| `wisps.cell` | number | 0 to … |
| `wisps.reach` | number | 0 to … |
| `wisps.chance` | number | 0 to … |
| `wisps.partyNear` | number | 0 to … |
| `wisps.partyFar` | number | 0 to … |
| `wisps.height` | array of number |  |
| `wisps.drift` | number | 0 to … |
| `wisps.period` | number | 0 to … |
| `wisps.size` | number | 0 to … |
| `wisps.halo` | number | 0 to … |
| `wisps.hue` | number | 0 to … |
| `wisps.sat` | number | 0 to … |
| `wisps.bright` | number | 0 to … |

### `glades`

The clearings where sleeping legends lie.

1. Ed, 2026-10-06: "Sleeping legends should be in a small circular clearing, where they sit near the top of the circle. This magical clearing should be lit with an eerie twilight with glowing motes rising in it." (render/glades.ts)
2. Ed, 2026-10-06: "When you go into the legend clearing, the rest of the forest should get darker. Maybe switch off the witch's glow when she's in there."
The sleeping legends' clearings [1]: art builder 1 places them (the map's glades); until then one round each sleeping legend, radius metres across with the legend top of the way toward its top. Only those within reach metres of the witch, the nearest 4, are lit. Inside one [2]: the forest's light and haze outside the clearing's own twilight dim by dark (0 none, 1 black), her own glow goes by glowOff (1: off; her moonlit rim stays), both eased in and out over fade seconds.
Code: `render/glades.ts`

- **`glades.hue`, `glades.sat`**: the twilight's colour (a cool violet dusk, against the party's amber).
- **`glades.light`**: its pool, filling the circle and soft at its edge.
- **`glades.edge`**: the ring at its edge at full (a quarter of it always marks the circle), which brightens with the witch inside it or a quest sigil or relic put down in it, easing at edgeEase a second.
- **`glades.motes`**: per to a clearing, rising rise metres a second to height metres, size art pixels, in hue and sat at bright.

| knob | type | range |
|---|---|---|
| `glades.on` | boolean |  |
| `glades.radius` | number | 0 to … |
| `glades.top` | number | 0 to … |
| `glades.reach` | number | 0 to … |
| `glades.hue` | number | 0 to … |
| `glades.sat` | number | 0 to … |
| `glades.light` | number | 0 to … |
| `glades.edge` | number | 0 to … |
| `glades.edgeEase` | number | 0 to … |
| `glades.dark` | number | 0 to … |
| `glades.glowOff` | number | 0 to … |
| `glades.fade` | number | 0 to … |
| `glades.motes.per` | number | 0 to … |
| `glades.motes.rise` | number | 0 to … |
| `glades.motes.height` | number | 0 to … |
| `glades.motes.size` | number | 0 to … |
| `glades.motes.hue` | number | 0 to … |
| `glades.motes.sat` | number | 0 to … |
| `glades.motes.bright` | number | 0 to … |

### `treehouse`

The witch's home in the great oak beside the dancefloor: where it stands, its deck and rooms, how she walks and lands there, and the oak's crown, lights and warm glow over it.

1. Ed, 2026-10-05: "The treehouse should be 5m due north of the dance floor, outside the speaker ring"
2. Ed, 2026-10-24: "put the treehouse north-west of the dancefloor" (the oak since,:, its Terrace's open south-east rim towards it)
3. Ed, 2026-10-11: "a circle with a wooden floor and a balustrade sitting on the ent. You land on it by being at treetop height, and during the night time slower 10x" (rules/treehouse.ts)
4. Ed: "The deck sits at 22 m"
5. Ed: "The table holding the decks is along the curved bottom edge of the platform" (decks, from where she stands behind them, inner metres out, to their front, outer, from to to degrees round, 90 due south; the Ent's art, art/ent.js, draws them there)
6. Ed, 2026-10-14: docs/backlog/treehouse.md step 1; treehouse.house, on in place of the deck; rules/treehouse.ts
7. 2026-10-24: the oak since, config/house/
8. Ed, 2026-10-21: "she shouldn't use her broom until she steps off the balcony"
9. Ed, 2026-10-25: "walking without sitting on a broom ... is too slow" (half again as fast, 5 to 7.5)
10. Ed, 2026-10-23: "when you're inside the treehouse in an enclosed room (i.e. not the terrace) the forest behind the tree should be black"
11. Ed, 2026-10-26: "When the forest has loaded, fade it in gradually behind the whole treehouse" (since)
12. Ed, 2026-10-24: the mock previews/ed/treehouse-layout-v4/crown/; rules/crown.ts, render/crown.ts
13. Ed, 2026-10-26: "The witch should have a canopy circle cut around her in the treehouse" … "Room canopy cuts should fade in rather than be instant"
14. Ed, 2026-10-27: "lights at half" (on the mock previews/ed/crown-look/)
15. Ed, 2026-10-27: "The spiral with 2 strands, smoothed so it sags across the gaps" (on the mock previews/ed/crown-spiral/)
16. Ed: "warm light only"
The witch's treehouse, home [1][2]: its foot (the Terrace's middle; clear metres round it) stands gap metres beyond the dancefloor's ring of speakers (so however many speakers or how far out, it stays outside them; 22 keeps the oak's rooms, up in its crown, clear of the dancefloor's clearing), at angle degrees (-135: north-west; -90 due north, straight up the screen), always facing south, to the floor and the camera; and keeps a clearing of clear metres round its foot (at least the art's footprint: 8.2 m for the v2 tower); its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off. The deck [3]: on (false: the old treehouse), a round deck radius metres across its middle at the Ent (the treehouse's spot), its floor height metres up [4]; in the treetops, landing within radius + grace metres of its middle lands her on it; she walks it, kept rail metres inside its edge, round the map table in its middle (table metres round; Ed: "The world map is in the centre"; E within tableUse metres of its edge opens the sea chart) and behind the decks along its south edge [5], where she starts and comes back, seat metres south of the middle. On it, landed, time runs as in a calm legend circle (legendCircle.slow). The house [6][7]: its floor the oak's one shape (config/house/shape.js) at height metres, rail its edge's keep-in, the Terrace one of its trunk rooms at the treehouse's spot, its layout config/house/base.json's (terrace: the open rim, the decks, her seat, the magic circle): at treetop height she flies straight onto the Terrace and lands over landTime seconds, walks off its rim to fly again, or, with no broom (fall.on, a switch till the brooms are objects), falls for fall.time seconds and comes back at the magic circle (circle.out south of the hub's centre, circle.r), where a knockout brings her back too. The house's walk [8]: on foot in the house (the hub, the balcony, the rooms) she walks, walk metres a second, not at her broom's groundSpeed [9]; her walk cycle is drawn for stride metres a second, its steps quickening above it so her feet don't slide. The dark behind the house [10][11]: with dark.on, on foot in the house, any room or the Terrace, only the house, the Ent's crowns and her are drawn, over black, till the island's ready (its art drawn: g.islandReady); then the forest fades in behind the whole house over dark.reveal seconds and stays behind every room after; leaving the house before then, it comes back from where she stands over dark.fade seconds, and through the telescope it fades in over the same. The great oak's crown [12]: with crown.on, one crown over the whole house in place of the rooms' leaf roofs, grown from the house's outline (config/house/outline.json) and crown.seed: its lobes, the oak's limbs through its gaps, the Terrace's notch open to the sky out to its edge, its string lights and its far landmark. Indoors [13]: the crown cleared over her room (or branch) opens over crown.cutFade seconds as she comes in and fills back in over the same as she leaves, and the forest's hole round her (canopyCutout: its size, its soft edge) is cut in it too, round where she's drawn, opening and closing with it; the Terrace's notch stays open as ever. Its lights [14]: lights of its strings hung, whole strings by a hash (0.5; 1 every one), each string hung its own way (rules/crown.ts: swags with their own sag and steps, some part way, tails hanging off them, spirals round the big limbs, drapes near or long across a gap, garlands part way or all round, tilted and wavering, the bulbs the same spacing on every one, Ed: "The same bulb spacing"). Its wrap [15]: wrap long strands spiralling out over its top from its middle as seen from above, in place of its drapes and garlands, each resting on the lobes, its height smoothed along it and sagging across the gaps between them (rules/crown.ts makeCrown); 2, as Ed chose; 0 its drapes and garlands instead. Its warm light [16]: warm times the house's light spilling up onto the lobes' and limbs' undersides over its open rooms (render/crown.ts warmAt: a glow round each room's middle 1.5 m over its floor, its size and 3 m more across, worked out once as the crown's made), in flat quarter steps; 0 none, 1 as Ed chose it from the mock; both live on the pause page's Oak crown group.
Code: `rules/treehouse.ts`, `art/ent.js`, `docs/backlog/treehouse.md`, `config/house/shape.js`, `config/house/base.json`, `rules/crown.ts`, `render/crown.ts`, `config/house/outline.json`

- **`treehouse.carrier`**: On other islands, that island's legend carries the treehouse on its back, braced under the oak.
  1. Ed, 2026-10-10: "Arriving" (journey.md: on a new island the Ent stands on the back of a party legend of that island's kind; drawing only, art/carrier.js)
  "island" that island's kind's legend, braced under the Ent, its back about 13 m up and the Ent's trunk that much shorter, so the deck stays where it is (home, the Ent's own island, has none, nor has a map that isn't an island); a kind's id (e.g. "bear", or ?carrier=bear) that kind's everywhere; "none" no one.
  Code: `art/carrier.js`

| knob | type | range |
|---|---|---|
| `treehouse.gap` | number | 0 to … |
| `treehouse.angle` | number |  |
| `treehouse.clear` | number | 0 to … |
| `treehouse.lightReach` | number | 0 to … |
| `treehouse.lightStrength` | number | 0 to … |
| `treehouse.deck.on` | boolean |  |
| `treehouse.deck.radius` | number | 0 to … |
| `treehouse.deck.height` | number | 0 to … |
| `treehouse.deck.grace` | number | 0 to … |
| `treehouse.deck.rail` | number | 0 to … |
| `treehouse.deck.table` | number | 0 to … |
| `treehouse.deck.tableUse` | number | 0 to … |
| `treehouse.deck.decks.inner` | number | 0 to … |
| `treehouse.deck.decks.outer` | number | 0 to … |
| `treehouse.deck.decks.from` | number | 0 to … |
| `treehouse.deck.decks.to` | number | 0 to … |
| `treehouse.deck.seat` | number | 0 to … |
| `treehouse.house.on` | boolean |  |
| `treehouse.house.height` | number | 0 to … |
| `treehouse.house.grace` | number | 0 to … |
| `treehouse.house.rail` | number | 0 to … |
| `treehouse.house.landTime` | number | 0 to … |
| `treehouse.house.walk` | number | 0 to … |
| `treehouse.house.stride` | number | 0 to … |
| `treehouse.house.fall.on` | boolean |  |
| `treehouse.house.fall.time` | number | 0 to … |
| `treehouse.house.fall.beat` | number | 0 to … |
| `treehouse.house.dark.on` | boolean |  |
| `treehouse.house.dark.fade` | number | 0 to … |
| `treehouse.house.dark.reveal` | number | 0 to … |
| `treehouse.house.crown.on` | boolean |  |
| `treehouse.house.crown.seed` | number | 0 to … |
| `treehouse.house.crown.cutFade` | number | 0 to … |
| `treehouse.house.crown.whole` | boolean |  |
| `treehouse.house.crown.lights` | number | 0 to … |
| `treehouse.house.crown.warm` | number | 0 to … |
| `treehouse.house.crown.wrap` | number | 0 to … |
| `treehouse.house.terraceRoom` | boolean |  |
| `treehouse.carrier` | string |  |

### `home`

Home's area [1]: the map is cut with home first, a circle round the dancefloor out past the treehouse's footprint (its distance and clear) and margin metres more all home's; the areas round it are cut round it, their centres kept at least gap of an area beyond the circle.

1. Ed, 2026-10-05: "Home area should be big enough that the whole circle, centre the dancefloor, edge the treehouse, is within it"

| knob | type | range |
|---|---|---|
| `home.margin` | number | 0 to … |
| `home.gap` | number | 0 to … |

### `scenes`

Small vignettes and large landmarks (a farmyard corner, a bus stop, a cemetery, castle ruins) placed about the island.

1. Ed, 2026-10-04: art/scenes.js
Scenes [1]: small vignettes (a farmyard corner, a bus stop, a picnic gone wild...) and large landmarks (a cemetery, a car park, ruined churches and temples, castle ruins...), each a few pieces counting as one, each at most once per map. An area gets one with chance, if a scene that suits it (its suits) is still unused; it stands off to the side of the area's centre, its footprint clear of the paths, gameplay and other features, trees kept off it, mirrored at random. footprint: the farthest piece's authored offset times scale, plus pad metres (a test checks it covers the art's own).
Code: `art/scenes.js`

- **`scenes.featured`**: one of ids (seeded) placed on a map at its chance, in an area it suits if there is room, else in any [1].
  1. Ed, 2026-10-11: "both" … "more variations" (the temple ruins on most islands,: the Greek temple or the classical ruins, and: temple-* is every seeded classical ruin scene, art/landmarks.js CLASSICAL_PLANS; an id ending in * takes every scene it starts)
  Code: `art/landmarks.js`

| knob | type | range |
|---|---|---|
| `scenes.chance` | number | 0 to … |
| `scenes.scale` | number | 0 to … |
| `scenes.pad` | number | 0 to … |
| `scenes.featured.ids` | array of string |  |
| `scenes.featured.chance` | number | 0 to … |

### `grounds`

Old playgrounds and sports grounds in some areas, off to the side of their centre.

1. Ed, 2026-10-11: the small islands
Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows. Kinds [1]: only the playground; the sports grounds are left out of kinds.

| knob | type | range |
|---|---|---|
| `grounds.chance` | number | 0 to … |
| `grounds.kinds` | array of string |  |
| `grounds.radius` | record |  |

### `legendClearing`

Each sleeping legend lies in a small round clearing of its own, sized to fit it.

1. Ed, 2026-10-06
Each area's sleeping legend lies in a small circular clearing of its own [1], where no tree or decor stands: radius metres across from its middle (species: a radius for that legend, sized to fit it: half its sleeping width plus 4 m), a soft ring edge metres wide marking it on the ground, and the legend lying top x radius north of the middle (the circle's far side from the camera), the open floor in front. Quest sigils and relics take effect inside it.

- **`legendClearing.minFromStone`**: its edge at least this many metres from its area's runestone (where the soundsystem comes), clear of the stone's clearing and the party's dance space; a small area with no such spot takes the farthest that fits (logged).
  1. Ed, 2026-10-06: "The legend circle shouldn't spawn near its runestone"
- **`legendClearing.minFromOtherStones`**: its edge at least this many metres from every neighbouring area's runestone too, always (not relaxed for a small area).
  1. Ed: "Legend and runestone in the same place" (v1628)
- **`legendClearing.floor`**: on, old flagstones about slab metres across, the legend's sigil carved into them as dark grooves, overgrowth (0.5 as drawn, up to 1 for more) moss, grass and litter over them so the carving shows only in pieces.
  1. Ed, 2026-10-06: "The floor of the legend circle can be weathered and mossy stone with the legend's sigil carved into it. It's covered by moss etc and so you can't see it clearly"
- **`legendClearing.floor.glint`**: how much the grooves catch the light while its legend sleeps (0, off: Ed's call later).
- **`legendClearing.rim`**: art builder 3's rim kit (#262) round its edge, a piece every spacing metres of it at chance, out metres past its radius and up to spread more (on its ring, never its floor), none on a path nor within gap degrees of due south [1].
  1. Ed, 2026-10-26: "legend circles should always be hidden by scenery around them" (0 since:: the stones go all the way round)
- **`legendClearing.grove`**: The forest swells thicker and taller round the edge of a legend's clearing.
  1. Ed, 2026-10-06: "an area of the tallest trees around each legend circle"
  2. "It should blend back smoothly into the rest of the forest around this area, so it doesn't stand out too much"
  3. Ed, 2026-10-26: "legend circles should always be hidden by scenery around them" (both 0 since:: the ring of trees goes all the way round, the circle hidden until she walks in, her see-through hole showing it then)
  round the circle's ragged edge the forest swells, strongest at the edge and easing out (smoothstep) over reach metres to the area's own: there trees stand at up to density (a chance a tree spot), up to tallest of them the area's two tallest kinds, drawn up to scale times bigger, each tree's strength jittered by jitter either way so no ring or step shows; open in front gap degrees either side of due south (toward the camera), easing in over soft degrees more [3].
- **`legendClearing.fit`**: Each legend's clearing is sized to its legend as drawn asleep, with a margin to spare.
  1. Ed, 2026-10-26: "Legend circles need to be larger. Often legends don't fit in them" (rules/legendFit.ts)
  each circle sized to its legend as drawn asleep (config/legend-footprints.json, measured by node tools/legends/footprint.mjs), its sleeping body fitting where it lies with margin metres to spare, never smaller than species (or radius) gives it, never more than max metres (past about 25 a circle can't be placed in its area clear of the runestones); in a legend area of its own (legends.areas) at most areaMax metres, at the area's heart, clear of the runestones round it by minFromOtherStones.
  Code: `rules/legendFit.ts`, `config/legend-footprints.json`, `tools/legends/footprint.mjs`

| knob | type | range |
|---|---|---|
| `legendClearing.radius` | number | 0 to … |
| `legendClearing.edge` | number | 0 to … |
| `legendClearing.top` | number | 0 to … |
| `legendClearing.minFromStone` | number | 0 to … |
| `legendClearing.minFromOtherStones` | number | 0 to … |
| `legendClearing.floor.on` | boolean |  |
| `legendClearing.floor.overgrowth` | number | 0 to … |
| `legendClearing.floor.slab` | number | 0 to … |
| `legendClearing.floor.glint` | number | 0 to … |
| `legendClearing.rim.spacing` | number | 0 to … |
| `legendClearing.rim.chance` | number | 0 to … |
| `legendClearing.rim.out` | number | 0 to … |
| `legendClearing.rim.spread` | number | 0 to … |
| `legendClearing.rim.gap` | number | 0 to … |
| `legendClearing.grove.reach` | number | 0 to … |
| `legendClearing.grove.density` | number | 0 to … |
| `legendClearing.grove.tallest` | number | 0 to … |
| `legendClearing.grove.scale` | number | 0 to … |
| `legendClearing.grove.gap` | number | 0 to … |
| `legendClearing.grove.soft` | number | 0 to … |
| `legendClearing.grove.jitter` | number | 0 to … |
| `legendClearing.fit.margin` | number | 0 to … |
| `legendClearing.fit.max` | number | 0 to … |
| `legendClearing.fit.areaMax` | number | 0 to … |
| `legendClearing.species` | record |  |

### `relics`

Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa) scattered through the forest, more of them near roads.

Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).

| knob | type | range |
|---|---|---|
| `relics.spacing` | number | 0 to … |
| `relics.chance` | number | 0 to … |
| `relics.nearRoad` | number | 0 to … |
| `relics.minGap` | number | 0 to … |

### `walls`

Garden walls, hedges, brambles and rock walls running through the areas, along paths where there are some.

Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.

| knob | type | range |
|---|---|---|
| `walls.runs` | array of number |  |
| `walls.runLength` | array of number |  |
| `walls.gateChance` | number | 0 to … |
| `walls.rings` | array of number |  |
| `walls.ringStones` | array of number |  |
| `walls.ringRadius` | array of number |  |
| `walls.avenueChance` | number | 0 to … |
| `walls.loneChance` | number | 0 to … |
| `walls.clumps` | array of number |  |
| `walls.clumpSize` | array of number |  |
| `walls.clumpRadius` | number | 0 to … |

### `decor`

Ruins, rocks and freak trees scattered as discoveries, fewer under dense canopy.

Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor.

- **`decor.mix`**: each family's share times its factor, 1 as each area authors it [1].
  1. Ed, 2026-10-11: ruins twice as many, about 6 an island, which with the island taking its finds first is 1.5; no rocks, no freak trees
- **`decor.footprint`**: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).

| knob | type | range |
|---|---|---|
| `decor.spacing` | number | 0 to … |
| `decor.ruins` | number | 0 to … |
| `decor.rocks` | number | 0 to … |
| `decor.freak` | number | 0 to … |
| `decor.mix.ruins` | number | 0 to … |
| `decor.mix.rocks` | number | 0 to … |
| `decor.mix.freak` | number | 0 to … |
| `decor.minGap` | number | 0 to … |
| `decor.clearing` | number | 0 to … |
| `decor.pathGap` | number | 0 to … |
| `decor.footprint` | number | 0 to … |

### `paths`

Railways, old roads and streams crossing the island.

1. Ed: "There are much too many paths" (linkChance 0.55 to 0.1, deadEndChance 0.3 to 0, rails [2,4] to [0,1], at most one railway)
Paths, roads and railways (Ed): far fewer since 2026-10-11 [1]. rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads (0: Ed, round 13, "remove the paths that are roads: only the kind that cars might drive on"; footpaths, railways and streams stay).

- **`paths.linkChance`**: the share of neighbouring areas joined by a meandering path.
- **`paths.deadEndChance`**: the share of areas with a path out to nothing.
- **`paths.pathHalf`, `paths.roadHalf`, `paths.railHalf`**: How wide the paths are kept clear of trees, with thick bushes along their edges.
  half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next.
- **`paths.railBroken`**: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).
- **`paths.pieces`**: false places none of these 3D pieces at all [1].
  1. Ed, 2026-10-11: the small islands: no landmarks, signals, buffer stops, stairs, bridges or fingerposts; paths cross streams without a bridge
- **`paths.fingerposts`**: a fingerpost by each footpath where it comes into a clearing (the prop generator's; the game turns it on: app/linkParams.ts); the two flights of stairs are finds, each at most once per map, by the clearing of a ravine, rocky slope, cave mouth or stone shrine.
  Code: `app/linkParams.ts`

| knob | type | range |
|---|---|---|
| `paths.rails` | array of number |  |
| `paths.roads` | array of number |  |
| `paths.linkChance` | number | 0 to … |
| `paths.deadEndChance` | number | 0 to … |
| `paths.pathHalf` | number | 0 to … |
| `paths.roadHalf` | number | 0 to … |
| `paths.railHalf` | number | 0 to … |
| `paths.railBroken` | number | 0 to … |
| `paths.streams` | array of number |  |
| `paths.streamHalf` | number | 0 to … |
| `paths.landmarkSpacing` | number | 0 to … |
| `paths.landmarkChance` | number | 0 to … |
| `paths.vergeSpacing` | number | 0 to … |
| `paths.pieceGap` | number | 0 to … |
| `paths.pieces` | boolean |  |
| `paths.fingerposts` | boolean |  |
| `paths.treesOnBroken` | number | 0 to … |
| `paths.edgeBushes` | number | 0 to … |
| `paths.bushBoost` | number | 0 to … |

### `setPieceChance`

the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement. [1]

1. Ed, 2026-10-11: the small islands: 0, none.

| knob | type | range |
|---|---|---|
| `setPieceChance` | number | 0 to … |

### `setPieceScale`

See `setPieceChance`.

| knob | type | range |
|---|---|---|
| `setPieceScale` | number | 0 to … |

### `setPieceClear`

See `setPieceChance`.

| knob | type | range |
|---|---|---|
| `setPieceClear` | number | 0 to … |

### `setPieceFootprint`

Scenery keeps clear of the gameplay places: soundsystems, legends and the like.

Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.

| knob | type | range |
|---|---|---|
| `setPieceFootprint` | number | 0 to … |

### `soundsystemFootprint`

See `setPieceFootprint`.

| knob | type | range |
|---|---|---|
| `soundsystemFootprint` | number | 0 to … |

### `reserveMargin`

See `setPieceFootprint`.

| knob | type | range |
|---|---|---|
| `reserveMargin` | number | 0 to … |

### `treeMarginFromSoundsystem`

See `setPieceFootprint`.

| knob | type | range |
|---|---|---|
| `treeMarginFromSoundsystem` | number | 0 to … |

## Forest

The forest: trees, bushes, ground cover and the wind in them.

### `treeDensity`

treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). (0-1): the chance of a tree on each spot outside the clearings.

| knob | type | range |
|---|---|---|
| `treeDensity` | number | 0 to … |

### `leafJitter`

Each tree's own leaf colour [1]: every tree is dealt two fixed seeds from where it stands (-1 to 1 each).

1. Ed, 2026-10-16: "a small amount of per-tree colour jitter is wanted, so forests look less uniform" (docs/ART-GUIDE.md section 3)
Code: `docs/ART-GUIDE.md`

- **`leafJitter.autumn`**: each tree's lit leaf colour drifts toward its own autumn colour (gold, orange, red, crimson or purple, by its first seed) by up to autumn of the way (its own share of it, some trees barely at all), kept at the brightness the night's moonlight gave it, so a red tree is as dark as its neighbours.
  1. Ed, 2026-10-19: "Why don't I see reds and oranges and purples from the jitter, only blue?" (then of the two ways offered, a drift toward autumn colours over a plain hue turn)
- **`leafJitter.value`**: its leaves' brightness scaled by 1 + value times the second seed (on the pixels its sway mask marks as leaves: the wood is untouched; both halves alike).
- **`leafJitter.hue`**: Each tree's leaf colour turned a little either way, so neighbouring trees don't look identical.
  1. Ed, 2026-10-19: "And also stretch the slider" (0 to 180, so any hue)
  2. 2026-10-26: v4522
  its lit leaf colour's hue turned either way by up to hue degrees times the first seed [1]. Ed's v3893 playtest found the hue turn had no visible effect: it was turned on the albedo and the night's coloured moonlight squeezed it to a third on screen (20 degrees moved the crowns 4.9 on average, less than the value's 0.12 alone); it and the autumn drift are applied to the lit colour now, so its degrees are the screen's. All three change live (the pause page's Leaf jitter sliders: autumn 0 to 1, hue 0 to 180, value 0 to 0.6, well past sense: Ed, "bigger range"); no rebake. 0 and 0: every tree of a variant the same colour, as before. Ed's tuned values from the pause page [2]: autumn 0.2, value 0.15, hue 0 (no hue turn; the autumn drift carries the variety).

| knob | type | range |
|---|---|---|
| `leafJitter.autumn` | number | 0 to 1 |
| `leafJitter.value` | number | 0 to … |
| `leafJitter.hue` | number | 0 to 180 |

### `wind`

Wind sway on leafy things (Ed, v171): trees (both halves together, from the foot) and undergrowth lean with gusts that travel across the forest: strength metres at the top of a crown, gusts moving at speed m/s, gustScale metres across; Walls and set pieces stand still. ?wind=0 turns it off.

- **`wind.treetop`**: the share of it seen over the treetops (gentler).

| knob | type | range |
|---|---|---|
| `wind.on` | boolean |  |
| `wind.strength` | number | 0 to … |
| `wind.speed` | number | 0 to … |
| `wind.gustScale` | number | 0 to … |
| `wind.treetop` | number | 0 to … |

### `groundCover`

Tufts of grass, fern, heather, reeds, moss and clover on the ground round her, so the ground doesn't look flat.

Tufts of grass, fern, heather, reeds, moss and clover on the ground round the witch (Ed, v171: so the ground doesn't look flat), in ground mode only: density (times each area type's groundCover.density in area-types.json; ?grass=0..2 scales it live), out to the canopy hole round her, at most radius metres (fading out towards it), at most cap at once; one chance every spacing metres, worked out cell metres square at a time, within budgetMs of each frame; they sway in the wind by sway of their height and part round her and nearby creatures by part. None within sigilClear metres of a placed sigil (or over its rune, if bigger), trampled short just beyond (Ed, v233). None on paths, the dancefloor or ground kept clear; thicker along path edges.

| knob | type | range |
|---|---|---|
| `groundCover.on` | boolean |  |
| `groundCover.density` | number | 0 to … |
| `groundCover.radius` | number | 0 to … |
| `groundCover.cap` | number | 0 to … |
| `groundCover.spacing` | number | 0 to … |
| `groundCover.cell` | number | 0 to … |
| `groundCover.budgetMs` | number | 0 to … |
| `groundCover.sway` | number | 0 to … |
| `groundCover.part` | number | 0 to … |
| `groundCover.sigilClear` | number | 0 to … |

### `density`

How thick the trees grow: dense patches, sparse patches and glades rather than an even forest.

1. Ed, 2026-10-03
Tree density is a field, not two states [1]: each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.
Code: `art/areas.js`

| knob | type | range |
|---|---|---|
| `density.patchScale` | number | 0 to … |
| `density.patchMin` | number | 0 to … |
| `density.patchMax` | number | 0 to … |
| `density.lone` | number | 0 to … |

### `bushDensity`

| knob | type | range |
|---|---|---|
| `bushDensity` | number | 0 to … |

### `bushClump`

| knob | type | range |
|---|---|---|
| `bushClump` | number | 0 to … |

### `treeHeight`

| knob | type | range |
|---|---|---|
| `treeHeight` | number | 0 to … |

### `treeCap`

How tall the tallest trees (tall and giant) are drawn.

1. Ed: "Halve the number of tall trees" (the same day)
The tallest tree variants (tall, giant) can be drawn squeezed: any height over from metres keeps only keep of the rest. keep 1 since Ed, 2026-10-26 ("treecap.keep should be 1. Tall trees look awesome. If it hurts performance we can lower the proportion of tall trees"): every tree stands at its art's own height, so a 45 m giant stands 45 m, over her 24 m treetop flight (treetopHeight) and over the oak's 32.3 m crown. 0.35 before, which squeezed a 45 m giant to about 29 m. With it, half as many tall and giant trees [1]: art/areas.js TREE_HEIGHT_CLASSES and every area's heightMix, their tall and giant shares halved and given to the mature trees (frame time at keep 1 went from +60 to 85% over 0.35 to +30 to 45%).
Code: `art/areas.js`

| knob | type | range |
|---|---|---|
| `treeCap.from` | number | 0 to … |
| `treeCap.keep` | number | 0 to … |

### `pins`

The HUD's pointers as map pins over their subject (render/indicator.ts): gap is how far (screen pixels) the arrow's tip floats over the subject's drawn top [1].

1. Ed, 2026-10-26: "pins should be a bit higher"
Code: `render/indicator.ts`

- **`pins.plate`**: A dark plate behind each edge pointer's ring and round its arrow, its opacity, so the pointers read on any ground (0 none, as before).
  1. Ed's playtest, 2026-10-29: "Also, it's easy to miss the pointers"
  Code: `render/indicator.ts`, `render/view/hud.ts`
- **`pins.vivid`**: How much of the pointers' calming toward the night is taken back: 0 as calmed, 1 the area's neon itself.

| knob | type | range |
|---|---|---|
| `pins.gap` | number | 0 to … |
| `pins.plate` | number | 0 to … |
| `pins.vivid` | number | 0 to … |

### `crownWidth`

| knob | type | range |
|---|---|---|
| `crownWidth` | number | 0 to … |

### `treeSpacingX`

| knob | type | range |
|---|---|---|
| `treeSpacingX` | number | 0 to … |

### `treeSpacingZ`

| knob | type | range |
|---|---|---|
| `treeSpacingZ` | number | 0 to … |

### `crownHalfWidth`

| knob | type | range |
|---|---|---|
| `crownHalfWidth` | number | 0 to … |

### `crownHeight`

| knob | type | range |
|---|---|---|
| `crownHeight` | number | 0 to … |

### `bushSpacing`

| knob | type | range |
|---|---|---|
| `bushSpacing` | number | 0 to … |

### `scenery`

How far round her trees, bushes and other scenery are drawn; creatures and gameplay objects are always drawn.

1. Ed, 2026-10-03: gameplay always drawn, scenery as much as we can
The scenery budget [1]. Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).

- **`scenery.canopyReach`**: in the treetops, tree crowns alone (no trunk, shadow or undergrowth) are drawn out to this many metres (at most haze.far) where the budget has pulled the rest in closer, so the canopy stays whole to the horizon on a slow machine [1]; 0 off.
  1. Ed's playtest, 2026-10-13: "outside of a circle around the witch, the canopy is not drawn"

| knob | type | range |
|---|---|---|
| `scenery.adaptive` | boolean |  |
| `scenery.fps` | number | 0 to … |
| `scenery.hysteresis` | number | 0 to … |
| `scenery.sustain` | number | 0 to … |
| `scenery.minRadius` | number | 0 to … |
| `scenery.shrink` | number | 0 to … |
| `scenery.grow` | number | 0 to … |
| `scenery.fade` | number | 0 to … |
| `scenery.canopyReach` | number | 0 to … |

## Witch

The witch: flight in both modes, her stack, blink, spells, health and knockout.

### `groundSpeed`

| knob | type | range |
|---|---|---|
| `groundSpeed` | number | 0 to … |

### `treetopSpeed`

| knob | type | range |
|---|---|---|
| `treetopSpeed` | number | 0 to … |

### `acceleration`

how quickly she reaches her speed or stops in the treetops (per second; higher is snappier).

| knob | type | range |
|---|---|---|
| `acceleration` | number | 0 to … |

### `treetop`

Treetop flight: a high top speed with momentum, building a boost while she holds a direction.

Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRateSlow degrees a second below sharpTurnSpeed of cruise, falling to turnRate at cruise (half that at full boost), so the size of her swoop grows with her speed (Ed); a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second, and above brakeAt of cruise she skids in the brake pose; letting go, she glides to a stop over about glideTime seconds.

- **`treetop.cameraPull`**: how far the camera draws back at full boost (a share of its distance).

| knob | type | range |
|---|---|---|
| `treetop.boost` | number | 0 to … |
| `treetop.boostTime` | number | 0 to … |
| `treetop.boostAngle` | number | 0 to … |
| `treetop.turnRate` | number | 0 to … |
| `treetop.turnRateSlow` | number | 0 to … |
| `treetop.sharpTurnSpeed` | number | 0 to … |
| `treetop.brakeAt` | number | 0 to … |
| `treetop.glideTime` | number | 0 to … |
| `treetop.sharpTurnBleed` | number | 0 to … |
| `treetop.cameraPull` | number | 0 to … |

### `groundAcceleration`

the same on the ground.

| knob | type | range |
|---|---|---|
| `groundAcceleration` | number | 0 to … |

### `leanAt`

the share of the top speed above which she leans into her flight.

| knob | type | range |
|---|---|---|
| `leanAt` | number | 0 to … |

### `facing`

When she and the creatures turn away from the viewer, only when clearly heading up the screen.

she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer. Within headingEnter degrees of straight up or straight down the screen (until past headingLeave) she flies in her heading sprites: seen from behind going up, coming at us going down.

| knob | type | range |
|---|---|---|
| `facing.awayEnter` | number | 0 to … |
| `facing.awayLeave` | number | 0 to … |
| `facing.headingEnter` | number | 0 to … |
| `facing.headingLeave` | number | 0 to … |

### `riseTime`

| knob | type | range |
|---|---|---|
| `riseTime` | number | 0 to … |

### `descendTime`

| knob | type | range |
|---|---|---|
| `descendTime` | number | 0 to … |

### `riseCooldown`

After she lands she can't rise again for this many seconds [1]. 0: no wait.

1. Ed, 2026-10-11: players rose to the treetops instead of dodging, since rising takes her out of ground mode, and out of reach, at once

| knob | type | range |
|---|---|---|
| `riseCooldown` | number | 0 to … |

### `cooldown`

One shared cooldown for her dodge and her take-off.

1. Ed, 2026-10-15: "One trail, one cooldown. The trail she leaves in the treetops, landing and taking off should also appear when she dodges. Its length shows one shared cooldown counter for dodge and take-off (the two contribute different amounts to it)" (rules/cooldown.ts)
One cooldown for her dodge and her take-off [1]: shared on, a counter in seconds draining a second a second; a dodge adds dash.cooldown, a take-off rise, a landing riseCooldown (the Jet nozzles halve both of the last: config/broom-parts.json). It has room for dash.charges dodges (dash.charges x dash.cooldown seconds; more with Hare's Dash bursts and the Twig bristles): an action goes when the counter is at or under that room less its own amount, so two dodges go straight off and the third waits a second as before, and a landing's 3 s (over the room) means no dodge for 2 s and no rising for 3; after a dodge no take-off for a second. Her trail (trail.cooldown) shows it. Off: the dodge's charges and the rise cooldown run apart as before.
Code: `rules/cooldown.ts`, `config/broom-parts.json`

| knob | type | range |
|---|---|---|
| `cooldown.shared` | boolean |  |
| `cooldown.rise` | number | 0 to … |

### `groundHeight`

| knob | type | range |
|---|---|---|
| `groundHeight` | number | 0 to … |

### `treetopHeight`

| knob | type | range |
|---|---|---|
| `treetopHeight` | number | 0 to … |

### `witch`

Her speeds on the ground and in the treetops, how long rising and descending take, and how the world's lights light her.

1. Ed: "I can go near a coloured light source and not change colour"
2. Ed: "when you're moving quickly, you jerk up and down with the roll of hills" (v289)
Speeds per mode, and how long rising and descending take. The witch is lit by the world's lights like everything else [1], but not by her own glow: never darker than lightFloor times her old unlit look, so she reads in the dark; coloured lights (soundsystems, campfires, rune stones, the dancefloor) tint her by lightTint and rim the edge of her facing them by lightRim. Over the hills [2] she and the camera ride a smoothed height, not the ground under her: the ground averaged over heightLookAhead seconds of her flight behind and ahead of her (so the hills' bumps smooth out and she rises early for a crest), eased by heightSmooth seconds at full speed (a damped spring; less as she slows, none standing still; 0 off), and her feet always at least heightClearance metres over the ground under her and a stride ahead.

- **`witch.knock`**: A blow knocks her back and staggers her, harder for big attacks and charges.
  1. Ed, 2026-10-05: "add a knockback and stun on the witch; make it large on chasing/ramming creatures" (rules/knock.ts)
  2. Ed: "don't make it stop at scenery"
  The witch knocked back and staggered by a blow [1]: thrown straight away from the blow, base metres for any blow (bites, swipes, shots) plus scale times the attack's own knockback (combat.json; so a maul, quake or slam sits in between), at least charge metres when it rams her (a charge, or a leap landing on her), at most max; eased off at ease a second (like a creature's knockback), straight through scenery [2], nudged to the nearest clear spot at the end if she'd rest inside a trunk, rock, speaker, soundsystem or the treehouse (the blink's clearances). Staggered (no moving, blinking or 💌s, a wobble and stars) stunBase seconds plus stunScale a metre thrown past base, at most stunMax; then not staggered again for immune seconds (the blows still count), so a pack can't stun-lock her. A blink dodges it all; the blow that knocks her out throws nothing. on false, or ?knock=0, turns it off.
  Code: `rules/knock.ts`

| knob | type | range |
|---|---|---|
| `witch.knock.on` | boolean |  |
| `witch.knock.base` | number | 0 to … |
| `witch.knock.scale` | number | 0 to … |
| `witch.knock.charge` | number | 0 to … |
| `witch.knock.max` | number | 0 to … |
| `witch.knock.ease` | number | 0 to … |
| `witch.knock.stunBase` | number | 0 to … |
| `witch.knock.stunScale` | number | 0 to … |
| `witch.knock.stunMax` | number | 0 to … |
| `witch.knock.immune` | number | 0 to … |
| `witch.lightFloor` | number | 0 to … |
| `witch.lightTint` | number | 0 to … |
| `witch.lightRim` | number | 0 to … |
| `witch.heightSmooth` | number | 0 to … |
| `witch.heightLookAhead` | number | 0 to … |
| `witch.heightClearance` | number | 0 to … |

### `stack`

The stack of sigils above her hat, swaying like a chain of springs as she moves.

1. Ed, 2026-10-15: "more opacity, and never obscured by scenery"
The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still). Its sigils more visible [1]: bright, how bright each stacked sigil is drawn, times leash.sigilGlyph (1 as the sigils on the ground; 1.6 now); backing, a near-black disc behind each (0 none, 1 solid), backSize times the sigil across, so it reads against lit crowns and the sky; over, drawn over the scenery (no depth test, after the see-through pass), so no tree or crown ever hides the stack.

| knob | type | range |
|---|---|---|
| `stack.offset` | number | 0 to … |
| `stack.scale` | number | 0 to … |
| `stack.gap` | number | 0 to … |
| `stack.stiffness` | number | 0 to … |
| `stack.damping` | number | 0 to … |
| `stack.trail` | number | 0 to … |
| `stack.idleSway` | number | 0 to … |
| `stack.bright` | number | 0 to … |
| `stack.backing` | number | 0 to … |
| `stack.backSize` | number | 0 to … |
| `stack.over` | boolean |  |

### `witchHealth`

The witch [1]: she takes hits (one point each, whatever hits her) before she's knocked out [2]; one comes back every repairTime seconds, the timer starting over whenever she's hit, so to heal she has to get right out of the fight.

1. Ed, 2026-10-04
2. Ed, 2026-10-08: "three slashes, and then a final hit" (4)

- **`witchHealth.grace`**: seconds after a hit in which no other blow lands, so a pack striking together takes one hit, not all three [1].
  1. 2026-10-06: balance: DECISION FOR ED, 0.5
- **`witchHealth.slashScale`**: her claw slashes' size relative to her [1].
  1. Ed, 2026-10-08: "the slashes should be twice as large" (render/leash/bubbles.ts; 1 the drawing at her art pixel:, 2)
  Code: `render/leash/bubbles.ts`
- **`witchHealth.slashGlow`**: their glow, the berries' light drawn in the scene along each stroke so the bloom takes it [1].
  1. Ed: "The slashes should glow brighter as well - similar to the berries" (0 none)

| knob | type | range |
|---|---|---|
| `witchHealth.hits` | number | 0 to … |
| `witchHealth.repairTime` | number | 0 to … |
| `witchHealth.grace` | number | 0 to … |
| `witchHealth.slashScale` | number | 0 to … |
| `witchHealth.slashGlow` | number | 0 to … |

### `knockout`

What happens when she's knocked out: her creatures go free, she comes back at the treehouse after a wait that grows with each knockdown, and the beat speeds up.

1. Ed, 2026-10-04
2. 2026-10-26: Ed's playtest of v4821: no sigil made; its rune at its feet, so she can leash it again
3. Ed: "they should idle near where they were dropped, not walk back to their area" (it idles within dropRadius metres of where it was dropped, dancing if that's a party area, till she leashes it again or the night ends (later that day:); it defends what's round it as any happy one, and counts as its kind there for the legends; before, #87, each sigil was put down where its animal stood, parked; at first each turned neutral and went wild again)
4. Ed, 2026-10-07
5. Ed, 2026-10-07: 6, 8, 10, 12
6. "We can remove the extra knockdown time" (then, with each knockdown costing a BPM instead,: step 0 and max 6, so every knockdown waits the flat base and the desk's candles are all white)
7. Ed, 2026-10-07: "the BPM goes up by 1 each time you die" (the DJ is off the decks and the crowd gets restless)
Knocked out [1]: she collapses where she is; her sigil stack lets go from the bottom up, one every releaseEach seconds (releaseMax caps the whole release, 0 no cap; an empty stack waits emptyBeat seconds), each animal turning happy where it stands [2][3]; then she sparkles out and back in behind her decks in the treehouse over teleport seconds. Creatures at sigils she had put down on the ground stay hers. One timeline [4], the whole wait counted from her going down: her hat (if it drops) floats to the ground over hatFloat seconds, the screen dimmed, a sad trumpet; she sparkles out and back in behind her decks (teleport seconds); and she scratches there ("Every time she respawns she could do a bit of scratching to increase the respawn time") for the rest of the wait, at least respawn.minScratch, her army fighting on without her, a countdown over her. The wait ("any more than about six seconds to wait will be frustrating ... make each successive death a bit longer, with a cooldown"): respawn.base seconds, respawn.step more for each knockdown within respawn.cooldown seconds of the last, up to respawn.max [5][6]. releaseEach 0 (Ed): her sigils all drop at once as she goes down, under the hat's float. The beat speeds up [7]: each knockdown adds bpmStep to the party's tempo for the rest of the run (bpmCap, if set, is the most it can add), eased in over beat.knockBeats beats (4, a bar) from the next bar line; the music follows the beat clock, and the wave countdown and the ley line's pulse run that much faster (tempo plus bonus over the wave's own tempo), so the waves come sooner.

- **`knockout.legendsLoyal`**: leashed legends stay with her (false: they're let go too: 'they're too old for this'; only a party legend is ever leashed now, and it's always let go).
- **`knockout.dropHat`**: When knocked out she drops her hat where she fell, and wears none till she goes back and picks it up.
  1. Ed, 2026-10-06: 'when you are killed, you drop your hat, and there's a direction marker for it, so you can go back and find it'
  she drops her hat where she went down and wears none till she stands on it and presses the sigil button (E), which puts it straight back on (never into the stack; on top of a sigil, the hat comes first); a 🎩 pointer shows the way meanwhile. Knocked out again with it still down, nothing more drops. A witch with no hat (the character creator's none) has none of this.
- **`knockout.dim`**: how much the screen dims round her while her hat floats off, from the knockdown to her sparkle away (her spot and the hat left lit); no hat, no dim.
  1. Ed, 2026-10-07: "the rest of the screen darkened" (drawing only)
- **`knockout.rise`**: the house (rules/treehouse.ts): back at the magic circle after a knockout, she rises out of its floor over rise seconds [1], then walks to her decks and scratches for the rest of the wait.
  1. Ed, 2026-10-14: blood rises from the floor and forms her shape
  Code: `rules/treehouse.ts`
- **`knockout.candleStep`**: one candle for every candleStep seconds of the wait (1 or 0.5), white for the base wait, red for the extra from knockdowns in a row; the red burn first.
  1. Ed, 2026-10-07: the candles along her desk are a loading bar

| knob | type | range |
|---|---|---|
| `knockout.releaseEach` | number | 0 to … |
| `knockout.releaseMax` | number | 0 to … |
| `knockout.emptyBeat` | number | 0 to … |
| `knockout.teleport` | number | 0 to … |
| `knockout.legendsLoyal` | boolean |  |
| `knockout.dropHat` | boolean |  |
| `knockout.hatFloat` | number | 0 to … |
| `knockout.dim` | number | 0 to … |
| `knockout.rise` | number | 0 to … |
| `knockout.respawn.base` | number | 0 to … |
| `knockout.respawn.step` | number | 0 to … |
| `knockout.respawn.max` | number | 0 to … |
| `knockout.respawn.cooldown` | number | 0 to … |
| `knockout.respawn.minScratch` | number | 0 to … |
| `knockout.candleStep` | number | 0 to … |
| `knockout.bpmStep` | number | 0 to … |
| `knockout.dropRadius` | number | 0 to … |

### `dash`

The dash: on the ground she blinks a short way in the direction she's moving and can't be hit for a moment.

1. Ed, 2026-10-04: 2026-10-05; right click, gamepad A, touch 'dash'
2. Ed, 2026-10-11: her steering, on the pad and on keyboard and mouse alike, not the way she's aiming; standing still, the way she's facing
The dash, a blink [1]: on the ground only, she vanishes and reappears distance metres the way she's moving [2] in one step, then cooldown seconds before the next. For gone seconds (a few frames) she isn't drawn and can't be hit; otherwise she's as hittable as ever: it's for slipping out of a shot's path. She lands clear of trees, rocks and ruins, soundsystems, the dancefloor's speakers and the treehouse by clear's metres each, the blink shortened to the furthest clear spot.

- **`dash.buffer`**: a press up to this many seconds before she can blink (still recharging, landing, staggered) waits and blinks the moment she can.
- **`dash.toCursor`**: on, she blinks toward the ground under the cursor (or the way the right stick points), the way she faces when the cursor is within aimDead metres of her, and with nothing to aim by (touch) the way she's steering; off, always the way she's steering.
  1. Ed's playtest, 2026-10-06
  2. 2026-10-11: off since
- **`dash.chain`**: the least time, seconds, from one blink to the next, whatever her charges or the shared cooldown say (it keeps a Double blink's two apart; the legend buffs' blink chain, 0.2, before they were removed).

| knob | type | range |
|---|---|---|
| `dash.distance` | number | 0 to … |
| `dash.gone` | number | 0 to … |
| `dash.cooldown` | number | 0 to … |
| `dash.buffer` | number | 0 to … |
| `dash.charges` | number | 0 to … |
| `dash.chain` | number | 0 to … |
| `dash.toCursor` | boolean |  |
| `dash.aimDead` | number | 0 to … |
| `dash.clear.tree` | number | 0 to … |
| `dash.clear.decor` | number | 0 to … |
| `dash.clear.sound` | number | 0 to … |
| `dash.clear.speaker` | number | 0 to … |
| `dash.clear.treehouse` | number | 0 to … |

### `spells`

Her two spell slots, a hat and a broom, each holding a spell or none.

1. Ed, 2026-10-11: rules/spells.ts, docs/backlog/unlocks.md
2. Ed, 2026-10-23: the Workshop
Spells [1]: two slots, a hat and a broom, each with a spell or none (the plain ones), the hat's chosen in the creator (or ?hat=), the broom's the set its parts complete [2]. Hats are put down with the sigil button held (rules/hat.ts) and work there (some once when placed, some while they lie there); the Helmet is worn. Broom parts change how she moves or pulls (config/broom-parts.json: the Long, Double blink and Haul brooms are the Curled tip, the Twig bristles and the Canoe hull now); an active set spell is cast with the spell button (R; gamepad circle; touch spell), then recharges.
Code: `rules/spells.ts`, `docs/backlog/unlocks.md`, `rules/hat.ts`, `config/broom-parts.json`

- **`spells.hat`**: the default.
- **`spells.hats`**: the spell hats she owns, a comma list or * for every one [1].
  1. Ed, 2026-10-23: only the plain hat is hers at first, every spell hat found one a night, rules/finds.ts; the page sets it from her save, app/hatSave.ts, and ?hats= for one load
  Code: `rules/finds.ts`, `app/hatSave.ts`
- **`spells.parts`**: her broom's parts, a comma list of ids from config/broom-parts.json (the page sets it from her save, localStorage witch.broom, fitted at the Workshop's bay; ?parts= for one load); the bare broom, none, has no spell and no quick take-off [1], and a complete set gives its spell.
  1. Ed, 2026-10-23
  Code: `config/broom-parts.json`
- **`spells.bag`**: her bag, a config/wardrobe.json bag item's id or empty for none, whose invites multiply invites.cooldown and invites.range while she carries it (rules/bags.ts).
  1. Ed, 2026-10-29: "We should start with a choice of two bags; faster rate of fire but shorter range, and slower rate of fire but longer range"
  The page sets it from her look (localStorage witch.genome, chosen at the bags station; ?bag=starter, quick or far for one load). The Satchel (the starter) throws at the base rate and reach with a little more homing, the Bumbag faster and shorter, the Purse slower and further; none, the tuning's own, and no invitations at the desk till she carries one (rules/kit.ts).
  Code: `config/wardrobe.json`
- **`spells.speed`**: the Speed broom, her speed times mult for duration seconds, then cooldown seconds to recharge.
- **`spells.healing`**: The Healing ring heals her while she stands near it, and the Helmet takes the first blow for her.
  the Healing ring, within radius m of it she heals a hit every `every` seconds while hurt. The Helmet: the first blow knocks it off beside her instead of costing a hit; she picks it up (E) to wear it again.
- **`spells.battering`**: the Battering broom's blink stuns every wild and enraged creature within width m of its line for stun s [1].
  1. Ed, 2026-10-12
- **`spells.leyjump`**: the Ley jump broom, cast, puts her at the ley line's pulse; cooldown s.
- **`spells.pound`**: the Ground pound broom [1], cast, rises or lands at once, knocking wild and enraged creatures within radius m back push m, and landing stuns them stun s; cooldown s.
  1. Ed, 2026-10-12: the Updraft renamed
- **`spells.stealth`**: the Stealth broom [1]: creatures don't see her unless she threw a 💌 or put down or picked up something in the last reveal s; ones that went for her keep on while she's within range m, then lose her.
  1. Ed, 2026-10-12
- **`spells.harvest`**: the Harvest hat, put down, grows berries berries in a ring radius m round it [1], at most once every every s (the same ring, moved: uneaten ones move with it).
  1. Ed, 2026-10-11: six
- **`spells.dowsing`**: the Dowsing hat, put down, points to the nearest relic for time s.
- **`spells.sentry`**: the Sentry hat, lying there, throws a 💌 at the nearest invitable creature within range m every every s (Ed: larger ranges).
- **`spells.slingshot`**: the Slingshot hat catches her 💌s flying within catch m, circling it radius m out, holds them hold s and flings each at the nearest invitable creature within fire m, at most max at once.
- **`spells.gathering`**: the Gathering hat, picked up again, brings every sigil of hers within range m back to her stack (Ed: all sigils in range).
- **`spells.bramble`**: the Bramble hat slows wild and enraged creatures within range m of it (Ed: 30 m).
- **`spells.mine`**: the Mine hat, put down, stuns wild and enraged creatures within range m for stun s, at most once every every s.
- **`spells.lullaby`**: the Lullaby hat, put down, sends wild creatures (not enraged) within range m to sleep for time s, at most once every every s; one wakes when a 💌 lands on it [1].
  1. Ed, 2026-10-12
- **`spells.cyclone`**: The Cyclone hat sweeps nearby wild and enraged creatures round it, lifts them and flings them away.
  1. Ed, 2026-10-12: instead of the Decoy
  the Cyclone hat [1], on putting it down and every every s while it lies there, catches wild and enraged creatures within radius m, sweeps them round it at spin turns a second for time s, lifting them up to lift m, then flings them fling m outward over flingTime s, stunned stun s after they land; never hers, happy ones or legends, and never hurt.
- **`spells.nursing`**: the Nursing hat heals her own creatures within range m of it, rate of their health a second (0.1: whole again in ten seconds).

| knob | type | range |
|---|---|---|
| `spells.hat` | string |  |
| `spells.hats` | string |  |
| `spells.parts` | string |  |
| `spells.bag` | string |  |
| `spells.speed.mult` | number | 0 to … |
| `spells.speed.duration` | number | 0 to … |
| `spells.speed.cooldown` | number | 0 to … |
| `spells.healing.radius` | number | 0 to … |
| `spells.healing.every` | number | 0 to … |
| `spells.helmet.drop` | number | 0 to … |
| `spells.battering.width` | number | 0 to … |
| `spells.battering.stun` | number | 0 to … |
| `spells.leyjump.cooldown` | number | 0 to … |
| `spells.pound.cooldown` | number | 0 to … |
| `spells.pound.radius` | number | 0 to … |
| `spells.pound.push` | number | 0 to … |
| `spells.pound.stun` | number | 0 to … |
| `spells.stealth.reveal` | number | 0 to … |
| `spells.stealth.range` | number | 0 to … |
| `spells.harvest.berries` | number | 0 to … |
| `spells.harvest.radius` | number | 0 to … |
| `spells.harvest.every` | number | 0 to … |
| `spells.dowsing.time` | number | 0 to … |
| `spells.sentry.range` | number | 0 to … |
| `spells.sentry.every` | number | 0 to … |
| `spells.slingshot.catch` | number | 0 to … |
| `spells.slingshot.fire` | number | 0 to … |
| `spells.slingshot.hold` | number | 0 to … |
| `spells.slingshot.radius` | number | 0 to … |
| `spells.slingshot.max` | number | 0 to … |
| `spells.gathering.range` | number | 0 to … |
| `spells.bramble.range` | number | 0 to … |
| `spells.mine.range` | number | 0 to … |
| `spells.mine.stun` | number | 0 to … |
| `spells.mine.every` | number | 0 to … |
| `spells.lullaby.range` | number | 0 to … |
| `spells.lullaby.time` | number | 0 to … |
| `spells.lullaby.every` | number | 0 to … |
| `spells.cyclone.radius` | number | 0 to … |
| `spells.cyclone.time` | number | 0 to … |
| `spells.cyclone.every` | number | 0 to … |
| `spells.cyclone.spin` | number | 0 to … |
| `spells.cyclone.lift` | number | 0 to … |
| `spells.cyclone.fling` | number | 0 to … |
| `spells.cyclone.flingTime` | number | 0 to … |
| `spells.cyclone.stun` | number | 0 to … |
| `spells.nursing.range` | number | 0 to … |
| `spells.nursing.rate` | number | 0 to … |

### `trail`

Her flight trail: a glowing ribbon along her path in the colour of the area she's over.

1. Ed, 2026-10-06: "more like a fading-out glow, similar to the leylines. Its length relates to her speed: 5 m on the ground and 20 m on the treetops. The glow should be the same as the current area colour"
2. Ed, 2026-10-15: the tuning's cooldown
Her flight trail [1]: a ribbon of glow along her path, fading to nothing at its tail, in the colour of the area she's over (eased over colourEase seconds as she crosses into the next). Its length: ground metres at full speed on the ground, treetops metres over the treetops, from none below from (a share of her top speed) to full at top speed along curve (1 straight), growing to a new speed's over grow seconds and shrinking over shrink. One trail, one cooldown [2]: it also runs along her blink when she dodges (the ribbon laid along the blink's line, from where she left to where she lands), and it is at least cooldown metres times the share of the shared cooldown counter in use (full right after a take-off or a landing, half after a dodge with two in hand, draining to nothing as the counter empties), so its length shows the cooldown; bySpeed off leaves only that (no length from her speed).

- **`trail.width`**: metres across on the ground and over the treetops.
- **`trail.bright`**: its brightness.
- **`trail.fade`**: how it fades along its length (eased out: bright for its first stretch, then thinning to nothing; higher keeps it bright longer), its width tapering with it.
- **`trail.sparks`**: the broom's little amber sparks as well. ?trail=0 hides it.

| knob | type | range |
|---|---|---|
| `trail.on` | boolean |  |
| `trail.ground` | number | 0 to … |
| `trail.treetops` | number | 0 to … |
| `trail.from` | number | 0 to … |
| `trail.curve` | number | 0 to … |
| `trail.width` | array of number |  |
| `trail.bright` | number | 0 to … |
| `trail.fade` | number | 0 to … |
| `trail.grow` | number | 0 to … |
| `trail.shrink` | number | 0 to … |
| `trail.colourEase` | number | 0 to … |
| `trail.sparks` | boolean |  |
| `trail.cooldown` | number | 0 to … |
| `trail.bySpeed` | boolean |  |

### `swoopTrail`

Rainbow trails the party witches leave as they swoop.

1. Ed, 2026-10-06: "Party-witch swoops should get the same following glow that you have, but it should be bright and multicoloured."
The party witches' swoop trails [1]: while one swoops she leaves a ribbon in her trail's look, bright and in rainbow colours, each witch starting at her own hue, the colours running along it (hueSpread turns of the wheel a metre) and shifting over time (hueSpeed turns a second), so a crowd of swoops reads as fireworks over the canopy. width metres across (turned to face the camera, so a climb straight up shows), wider in step with its distance from the camera past near metres (so from the treetops it reads as a streak, not a thread), bright its brightness; it fades in as she lifts off over her first liftFade metres, and each stretch of it fades out life seconds after she passed, so it trails out as she lands. At most slots at once (only while the party is stepped: partyWitches.simRange).

| knob | type | range |
|---|---|---|
| `swoopTrail.on` | boolean |  |
| `swoopTrail.life` | number | 0 to … |
| `swoopTrail.width` | number | 0 to … |
| `swoopTrail.near` | number | 0 to … |
| `swoopTrail.bright` | number | 0 to … |
| `swoopTrail.hueSpeed` | number | 0 to … |
| `swoopTrail.hueSpread` | number | 0 to … |
| `swoopTrail.liftFade` | number | 0 to … |
| `swoopTrail.slots` | number | 0 to … |

## Army

Inviting and the army: the 💌s, the leash and sigil weight, the bond, berries.

### `berries`

Berries on the bushes of every area, which her creatures eat to evolve.

1. Ed, 2026-10-05: "tie the cost to strength"
2. Ed, 2026-10-06: "Double the amount of berries animals need to evolve" (cost.per halved from 7.25)
3. 2026-10-07: the level gap of made the youth's 6, 8 and 16 for light, normal and strong species
4. Ed, 2026-10-27: "We can change 6/8/16=>3/4/8, and reduce berry spawns (keep the current cluster size but reduce frequency of clusters.)" (a youth showing a dot per berry eaten, two rows of 4 at most:: cost.per back to 7.25, so 3, 4 and 8, and bushesPerArea and perArea halved, half as many patches of the same size, the same share of their bushes in berry)
5. Ed, 2026-10-05: "we can make the berry clusters bigger"
6. Ed, 2026-10-04: legends are the areas' own, never grown
Berries and evolving (Ed): every area has bushesPerArea berry bushes (normal bushes of that area) and perArea [min, max] berries on distinct ones at the start. Bushes grow in patches of patch.bushes [min, max] within patch.radius metres. Party animals (invited, not legends), following her or held at a sigil, take a berry on their way (Ed, v233): within detour metres of the line to where they're heading or of their sigil, never beyond their leash; they nip over, eat it (eatTime seconds) and carry on. The berry grows again at once on a free berry bush somewhere else on the map. A party animal evolves on the next bar line once it has eaten the berries its next level costs [1]: the fighting value it gains (cost.by "value": √(hp × dps), its species' strength included) at cost.per a berry, rounded, at least 1: so a berry buys the same fighting value for every species; one of normal strength costs 4 and 4 [2][3][4] ("power" would count hp × dps instead). Bigger patches since [5]: perArea and patch.bushes up a quarter to a half, so the first evolve's extra berry (2, was 1) and weaker species' one-berry minimum come out a little faster to feed than before. Evolving stops at adult [6].

- **`berries.colour`**: the berry's (shiny dark cherry red).
- **`berries.glow`**: How strongly a berry's soft halo glows.
  1. Ed, 2026-10-11
  its soft halo's strength. B (debug) feeds the nearest party animal one berry. Babies [1]: a baby eats only when its sigil is put down with a berry within babyReach metres of it (following her, it never stops for one; when a baby's sigil is next to go down, the berries within babyReach of her glow brightly), and babyCost berries evolve it into a youth.

| knob | type | range |
|---|---|---|
| `berries.perArea` | array of number |  |
| `berries.bushesPerArea` | number | 0 to … |
| `berries.patch.bushes` | array of number |  |
| `berries.patch.radius` | number | 0 to … |
| `berries.detour` | number | 0 to … |
| `berries.eatTime` | number | 0 to … |
| `berries.cost.by` | string | "power" / "value" |
| `berries.cost.per` | number | 0 to … |
| `berries.colour` | string |  |
| `berries.glow` | number | 0 to … |
| `berries.babyReach` | number | 0 to … |
| `berries.babyCost` | number | 0 to … |

### `invites`

The 💌 invite: on the ground she fires spinning love letters at creatures to win them over.

1. Ed, 2026-10-05: issue #87
2. Ed: "base invite should be one envelope at a time (rebalance hits accordingly), they should arc a little and disappear when they hit the ground, go 50% further, 20% faster, and they should rotate by pitching instead of yawing"
3. 2026-10-07: balance, the overnight pass, with the wider level gap
The 💌 invite [1], replacing the proximity chat when on: on the ground she shoots spinning 💌s, aimed with the cursor (click fires) or the right stick (a trigger fires), or 1 toward the cursor. A burst is burst volleys burstGap seconds apart, each multiShot letters fanned over spread degrees, then cooldown seconds before the next; letters fly at speed m/s for range metres, turning toward the nearest invitable creature within homingRange metres and homingCone degrees of straight ahead at up to homing degrees a second, and land on one whose body comes within radius metres. Each hit adds amount to its affection; Round 11 [2]: one 💌 a shot (burst 1, multiShot 1), cooldown 0.55 (just over the old 0.5 s per-creature gap), hits [4, 9, 18, 36] so a meter fills in about the time it did with bursts of three (they gave one hit each 0.84 s); then [3] [4, 7, 14, 36]: the young and adults quicker to win over, so good play counts for more (a skilled player lasts about 2.5 minutes longer, a crude one no longer), range 33 (was 22) and speed 31.2 (was 26).

- **`invites.arc`**: the height (m) its lob rises over the straight line from her hand to the ground at its range, where it lands, with a puff (drawn only: the rules fly it flat).
- **`invites.hits`**: How many letters it takes to win a creature over by its level, and how fast its meter drains when not being hit.
  1. Ed, 2026-10-06: "the invitation dropoff rate (the speed at which animals become less invited) is too fast" (0.03 after 4 s, a full meter in about 33 s; it was states.json's 0.08 after 1.5 s, this knob unread)
  2. Ed, 2026-10-06: "I think we should remove the 0.5s cooldown between counted hits per creature - better to control this through the witch firing speed instead of having hits not register"
  3. Ed, 2026-10-28: "let's change the drain rate to 2% instead of 3%" (0.02 after 4 s, a full meter in about 50 s; hearts from her animals' blows fade the same, in one queue with the 💌s ("this should be the same speed as 💌s fade ... and they go in the same fade 'queue'"))
  letters to fill it, by level (baby, young, adult); it drains drain of a full meter a second when not being hit, from config/states.json's affection.drainDelay seconds after the last [1]. Every letter that lands on an invitable creature counts [2]: how fast she invites is her firing rate (burst, burstGap, cooldown), nothing adaptive. Enraged creatures and legends block letters; scenery never stops them (Ed).
  Code: `config/states.json`
- **`invites.fireSlow`**: her ground speed while firing, times this.
- **`invites.inaccuracy`**: degrees either side of her aim each 💌 may go (a fixed hash of its number, so the same throws go the same ways); 0, dead straight, and a bag adds its own (config/wardrobe.json invitesAdd).
  1. Ed, 2026-10-29: "For things with rapid rate of fire or shot-gun like clusters, we can also have accuracy/spread"
- **`invites.bloomPer`**: degrees more inaccuracy each volley while she keeps firing (the bloom); 0, none, and a bag adds its own.
- **`invites.bloomDecay`**: degrees a second the bloom falls back by.
- **`invites.bloomMax`**: the most degrees the bloom can reach.
- **`invites.pierce`**: how many more creatures a 💌 flies on through after the first it lands on, each a hit as any letter's; 0, it stops at the first, and a bag adds its own (config/wardrobe.json invitesAdd).
  1. Ed, 2026-10-29: "pierce, yes"
- **`invites.chain`**: how many hops a spent 💌 makes on to the nearest other invitable creature within chainRange metres (never one it has landed on, nor a stunned one), each a hit as any letter's; 0, none, and a bag adds its own (config/wardrobe.json invitesAdd).
  1. Ed, 2026-10-29: "chain"
- **`invites.chainRange`**: how far (m) a chained 💌 looks for the next creature to hop to.
- **`invites.linger`**: a 💌 that met no one rests where it came down this many seconds, fading over the last lingerFade, at most lingerMax at once (drawn only: it's no hit).
  1. Ed's playtest, 2026-10-06: "invitations should sit on the ground for a little while before they fade away"
- **`invites.spin`**: How fast a 💌 spins in flight.
  1. Ed, 2026-10-06: "the envelopes should spin like a frisbee"
  a 💌 in flight lies flat and turns about the upright this many times a second (drawn only); when it lands it stops and lies flat.
- **`invites.impact`**: how a 💌 landing on a creature feels (drawn only): a white flash for flash seconds, a squash of squash springing back over squashSecs, its ring slot popping in by pop over popSecs, and hitstop seconds of held picture on the 💌 that fills the ring.
  1. Ed, 2026-10-29: "invitation impacts feel unsatisfying" (full hit feedback for a 💌 landing on a creature: a white flash, a little squash, its ring slot popping in, a thunk rising as the ring fills, a hitstop on the 💌 that fills it; no flash and a gentler squash with reduce-flashing on)
  With reduce-flashing on there's no flash and the squash is gentle instead. The hitstop holds the picture only (the last frame kept, starting from the frame that shows the flash); the rules run on.
  Code: `src/render/impact.ts`, `src/render/comfort.ts`
- **`invites.cheer`**: one won over by her 💌s celebrates secs seconds by its body (render/cheer.ts), out of every fight meanwhile, a burst of that many hearts (hearts) off it.
  1. Ed, 2026-10-29: "when a creature is won over ... it celebrates for about 1 s in a way that suits its body type" (hoppers a jump-spin, four-legged a roll-over, flyers a loop, the rest a wiggle-dance; hearts burst, the happy sting, its sigil flipping to the friends' colour with a pop; out of every fight meanwhile (a short rules hold))
  Code: `src/render/cheer.ts`, `src/rules/affection.ts`
- **`invites.orbit`**: the 💌 ring circles a creature at scale times its body radius (movement.json bodies) plus gap metres, at least min, and at least height times its drawn height (to its top as drawn) plus gap, so it rings the creature you see at any size; wider still when it holds many.
  1. Ed, 2026-10-28: "the orbits are smaller than the size of the creatures; their size should adjust depending on how large the creatures are"
  2. Ed's playtest, 2026-10-06: "Invitation orbits are too tight around the creature"
  3. Ed's playtest, 2026-10-29: "damage orbits are too wide, bring them in by around 30%" (scale 2 to 1.4, gap 1 to 0.7, min 2 to 1.4, height 0.9 to 0.63 (all x0.7); the soundsystem's 💥 ring 1.5 to 1.05 m outside it)
  A soundsystem's 💥 ring sits 1.5 gaps outside its radius.
- **`invites.hard`**: the hard homing of the 💌s her Sentry and Slingshot hats throw: homing degrees a second, cone degrees either side it looks in, range metres it looks out to (was the legend buffs' charm, 420, 80 and 18).

| knob | type | range |
|---|---|---|
| `invites.on` | boolean |  |
| `invites.burst` | number | 0 to … |
| `invites.burstGap` | number | 0 to … |
| `invites.cooldown` | number | 0 to … |
| `invites.range` | number | 0 to … |
| `invites.speed` | number | 0 to … |
| `invites.arc` | number | 0 to … |
| `invites.homing` | number | 0 to … |
| `invites.homingCone` | number | 0 to … |
| `invites.homingRange` | number | 0 to … |
| `invites.multiShot` | number | 0 to … |
| `invites.spread` | number | 0 to … |
| `invites.inaccuracy` | number | 0 to … |
| `invites.bloomPer` | number | 0 to … |
| `invites.bloomDecay` | number | 0 to … |
| `invites.bloomMax` | number | 0 to … |
| `invites.pierce` | number | 0 to … |
| `invites.chain` | number | 0 to … |
| `invites.chainRange` | number | 0 to … |
| `invites.radius` | number | 0 to … |
| `invites.amount` | number | 0 to … |
| `invites.hits` | array of number |  |
| `invites.drain` | number | 0 to … |
| `invites.fireSlow` | number | 0 to 1 |
| `invites.linger` | number | 0 to … |
| `invites.lingerFade` | number | 0 to … |
| `invites.lingerMax` | number | 0 to … |
| `invites.spin` | number | 0 to … |
| `invites.impact.flash` | number | 0 to … |
| `invites.impact.squash` | number | 0 to … |
| `invites.impact.gentle` | number | 0 to … |
| `invites.impact.squashSecs` | number | 0 to … |
| `invites.impact.pop` | number | 0 to … |
| `invites.impact.popSecs` | number | 0 to … |
| `invites.impact.hitstop` | number | 0 to … |
| `invites.cheer.secs` | number | 0 to … |
| `invites.cheer.hearts` | number | 0 to … |
| `invites.orbit.scale` | number | 0 to … |
| `invites.orbit.gap` | number | 0 to … |
| `invites.orbit.min` | number | 0 to … |
| `invites.orbit.height` | number | 0 to … |
| `invites.hard.homing` | number | 0 to … |
| `invites.hard.cone` | number | 0 to … |
| `invites.hard.range` | number | 0 to … |

### `invite`

The old proximity chat, now replaced by the 💌 invite: she talked with the nearest creature in emoji.

1. 2026-10-05: DESIGN.md, the leash; superseded by the 💌s, invites, and used only with invites.on false
2. Ed, 2026-10-04: losing a hit point is the cost
The old proximity chat [1]: on the ground, she talks by herself (no button: Ed, v244) to the nearest invitable creature within talkRange metres, and sticks with it; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. A legend gives her one unimpressed look for snubTime seconds per approach (not again till she's been beyond cancelDistance). Being hit doesn't set a chat back [2]. talkTime's fourth value is for legends let go on a knockout (wild legends still can't be invited).

| knob | type | range |
|---|---|---|
| `invite.talkRange` | number | 0 to … |
| `invite.cancelDistance` | number | 0 to … |
| `invite.snubTime` | number | 0 to … |
| `invite.talkTime` | array of number |  |
| `invite.turn` | array of number |  |
| `invite.decayRate` | number | 0 to … |

### `win`

The end of the route: after the last wave a pointer leads her to the remaining enraged creatures, then the victory lap.

1. Ed, 2026-10-10: 2026-10-11
2. "The end of the route" (rules/win.ts, docs/backlog/journey.md)
3. Ed, 2026-10-11: a ring inside the conga's hid it from the ground
4. 2026-10-26: "Remove the end cards" (rules/guidance.ts; no card since Ed's)
5. Ed's playtest, 2026-10-26: "when you're on the ground in the home area, the line should follow you"
The end of the route [1][2]: the last wave landed, a pointer to the enraged animal nearest the centre while any lives (enraged legends don't count; retarget: seconds between re-picks); none left, the victory lap: the pulse races back along the route to home at lapSpeed m/s, every stone it passes firing its fireworks; home reached, the night won: the dealt legends wake (bar any still enraged, which go back to sleep, their islands not found) and dance in place on its far side [3], north of the dancefloor beyond the conga, behind everything from the north-facing camera: on arcs legendGap m outside the conga's circle, legendRow m apart, legendSpace m between them, from due north out to legendArc degrees across, clear of the treehouse, the island's sigil flares on the dancefloor (drawn on over flareDraw s, held flare s), every other animal joins one conga line round it (congaSpeed m/s, congaGap m apart, a circle of at least congaRadius m, as big as the line needs), walking to its place at joinSpeed m/s (out of her sight, seen m off, simply there); once she reaches the party after the win (anywhere on the dancefloor, on foot or flying low: Ed, 2026-10-28), it settles: the guidance pins lead her home [4]. The conga follows her [5]: with follow on, while she's on the ground in the home area (not at the treehouse or in the treetops) the leader trails followLead m behind her along where she's walked and the rest follow single file congaGap apart, walking to their places at joinSpeed or followSpeed times her own speed, whichever is faster; anywhere else the line goes back round the dancefloor.
Code: `rules/win.ts`, `docs/backlog/journey.md`, `rules/guidance.ts`

| knob | type | range |
|---|---|---|
| `win.lapSpeed` | number | 0 to … |
| `win.congaSpeed` | number | 0 to … |
| `win.congaGap` | number | 0 to … |
| `win.congaRadius` | number | 0 to … |
| `win.joinSpeed` | number | 0 to … |
| `win.seen` | number | 0 to … |
| `win.follow` | boolean |  |
| `win.followLead` | number | 0 to … |
| `win.followSpeed` | number | 0 to … |
| `win.legendGap` | number | 0 to … |
| `win.legendRow` | number | 0 to … |
| `win.legendSpace` | number | 0 to … |
| `win.legendArc` | number | 0 to … |
| `win.flareDraw` | number | 0 to … |
| `win.flare` | number | 0 to … |
| `win.retarget` | number | 0 to … |

### `leash`

- **`leash.length`**: how far a leashed creature roams from its leash point (you, or its sigil on the ground).
  metres her creatures follow within.
- **`leash.runSpeed`**: how fast it hurries back when out of range (m/s).
  how fast one out of range hurries back (m/s).
- **`leash.pickRadius`**: how near a placed sigil you must be to pick it up.
  how near (m) she picks up one of her own placed sigils.
- **`leash.spacing`**: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling).
  how far apart (m) sigils can be put down.
- **`leash.runeRadius`**: how near (m) she picks up a happy creature's rune, a relic's sigil or her hat [1][2].
  1. Ed's word, 2026-10-13: both 25% further on: 3.5 to 4.375, 4.5 to 5.625
  2. Ed's playtest, 2026-10-06: "Floor sigils of happy creatures and relics are difficult to pick up" (bigger than pickRadius, which stays under spacing, and less than a relic's sigilOffset, so standing on the relic itself doesn't)
- **`leash.hatHold`**: seconds she holds the sigil button on the ground, with nothing it picks up or puts down, to put her hat down at her feet (just a marker; a press over it puts it back on; rules/hat.ts putHat).
  1. Ed, 2026-10-09: "If you are in ground mode and hold down the drop / pick up sigil button and there are no sigils to pick up, you put down your hat"
  Code: `rules/hat.ts`
- **`leash.placedThrough`**: how bright a placed sigil shows where grass, bushes, trees or other scenery hide it (0 hidden, 1 as bright as in the open); never through the witch.
  1. Ed, 2026-10-11
- **`leash.sigilGlyph`, `leash.sigilHalo`**: How bright sigil glyphs are drawn, so they don't bloom into blobs on lit ground.
  1. Ed's pick B, 2026-10-12: "it's their glow that makes them hard to see, not the pixellation"
  every sigil glyph from the leash atlas (placed, happy runes, the ghost, a relic's, her stack, the treetop projection, one walking home after a knockout) is drawn at sigilGlyph times its colour (0.5: under the bloom's threshold, so it doesn't bloom into a disc on lit ground; 1 as bright as before), and the soft halos under placed sigils, ready runes and relic sigils and round a relic in her stack at sigilHalo times their old strength (0: none).
- **`leash.sigilBacking`**: A dark patch under every sigil on the ground, so it reads clearly.
  1. Ed, 2026-10-12: "a dark patch directly underneath a sigil is quite helpful for making it more readable" … "the same width as the sigil, darker, edges not too smooth" … "sigils less transparent" (Bravo's o3)
  under every sigil lying on the ground (placed, a happy creature's rune, the ghost, a relic's) a near-black disc in chunky 2-px cells with a lighter outer step, as wide as the glyph's own pixels times size, at dark (0: none), then the glyph painted opaque in its full neon at ink times how much it shows, under the dim added glyph (sigilGlyph).
- **`leash.runeGap`**: a happy creature's rune lies south of it (down the screen), and a parked animal roams round a point the same way north of its sigil, by its size: its body radius, half the sigil with its backing, and runeGap metres between (rules/runeOffset.ts; it was a fixed restAbove, 5 m).
  1. Ed, 2026-10-10: "Leashed animals should come to rest 10m above their placed sigil" (so it's easier to see and pick up)
  2. 2026-10-13: "the top of the sigil's background should be just below the animal's feet"
  Code: `rules/runeOffset.ts`
- **`leash.hex`**: Sigils are put down and picked up on a fixed hex grid on the ground, so a cluster of them reads cleanly.
  1. Ed, 2026-10-11: "a cluster of placed sigils reads cleanly"
  on the ground the sigil button works on a world-fixed hex grid, size metres between neighbouring cells (6 with the rank sigils, their ranks.hex; 4 before them, leash.spacing's density, as ?sigils=old still has it; 0: put down freely where she stands, as before). The cell nearest her decides: a sigil of hers in it, the press picks it up; free, a sigil goes down in its middle (never fizzling). Cells under a runestone or soundsystem (within stone metres of it, plus half a cell) or a home speaker (speaker metres) are skipped: the sigil goes down on the nearest free cell that isn't, within two cells, or not at all. Relic sigils and her hat go down where she stands, off the grid.
- **`leash.runs`**: Holding the sigil button picks up, or puts down, sigils one after another as she runs.
  1. Ed, 2026-10-15: "Pick up and place in runs"
  with the sigil button held on since a press that picked a sigil up, she keeps picking up any sigil she runs over (her placed ones, happy creatures' runes, a relic's); held since a press that put one down, moving into each empty hex puts down the next (a press that did nothing starts no run, so holding E with nothing to do still puts her hat down). On the pad her hat is triangle's (placed or picked up), circle cycles the stack, L3 casts the broom's spell.
- **`leash.runePull`**: on the ground, the nearest happy creature with its rune within radius (m) trots toward her at speed (m/s), stopping stop (m) from her, so its rune comes to her.
- **`leash.grounded`**: Too many heavy creatures on her leash stop her taking off.
  1. Ed, 2026-10-18: "One adult stops you taking off. Three young do." … "if creatures are light or heavy you can extrapolate" (the numbers indicative)
  weight is the most the creatures following her may weigh, together, before she can't take off (their sigils in her stack, each at its leash.weight.levels weight times its species' strength, however near; parked ones at a sigil on the ground don't count, nor babies; 2 is one adult of normal strength, three young 2.4, two 1.6; 0 turns it off). Pressing rise she tries: she lifts a little and the leashes, taut and bright, pull her straight back down (drawn only: she never leaves the ground, so it's no dodge and spends no cooldown). Apart from the pull (weight below); once up she stays up, it only stops the next take-off.
- **`leash.weight`**: How the creatures on her leash pull on her: slower moving away from them, slower to rise, and sinking in the treetops when heavily loaded.
  1. Ed, 2026-10-06: "every sigil above your head pulls on you as well as attracting the animal; you find it slower to move in the opposite direction to where the leashes are, you are pulled off course, and rising to treetop is slower. And you're gradually pulled back down" (rules/leashWeight.ts)
  2. Ed, 2026-10-10: free in the treetops for 8 babies, 3 youths or 1 adult, and on the ground 5 youths or 2 adults (baby 0.3, youth 0.8, from 0.5 and 1)
  3. Ed, 2026-10-09: "extra free allowance on the ground should be the equivalent of one adult" (the first few sigils' worth, so early play feels the same; on the ground, plus one adult's weight, levels' adult)
  sigil weight [1]: each sigil in her stack (placed ones weigh nothing) pulls her toward its creature by how taut its leash is (0 within 0.85 of length, up to maxTension a leash length further, however far: a far traveller can't pin her) times its weight (levels: baby, young, adult, legend; times its species' combat.json strength) [2]. Less free [3], that's her load (weight units, a young on a taut leash being 1).
  Code: `rules/leashWeight.ts`
- **`leash.weight.drag`**: moving away from the pull, that part of her speed is divided by 1 + drag x load (her input still steers).
- **`leash.weight.drift`**: she drifts toward the pull at up to that share of her top speed, reached at an extreme load.
- **`leash.weight.rise`**: rising takes 1 + rise x load times as long.
- **`leash.weight.sink`**: Heavily loaded over the treetops she sinks toward the crowns, and lands if she stops.
  over the treetops, loaded, she sinks by sink x load of the climb a second (at most sinkMax), to floor (of the climb, just over the crowns) while she flies on, and all the way down to land if she stops or her load reaches extreme; unloaded, she floats back up. The view reads leashLoad (rules/game.ts); the debug overlay shows it.
  Code: `rules/game.ts`
- **`leash.weight.babyGround`**: a baby's weight on the ground (the treetops' is weight.levels[0]), so 8 fill either allowance; a baby's species strength doesn't count, and in the line its leash's tension is measured from its place in the line.
- **`leash.babies`**: Her leashed babies follow her in single file and scatter out of the way while she's in a fight.
  1. Ed, 2026-10-11: docs/backlog/gameplay.md
  2. Ed, 2026-10-26: "they should scatter further, e.g. outside of my camera view" (55, past the view's farthest edge at the usual ground zoom, its top 50 m from her; kept on the island's land, and pulling on her not at all while scattered)
  3. Ed, 2026-10-11
  her leashed babies following her on the ground walk in single file along where she's been, in stack order (the stack's bottom one first), gap metres apart; while she's in a fight they scatter, scatter metres or a quarter more off to the side away from the first attacker [2], for the whole fight [3]: from the moment something goes for her or one of hers (closing in or winding up, not on the hit), the same way throughout, back into line once nothing has for calm seconds; one more than farAt metres from her (about off the screen) moves at farSpeed m/s, so it's with her in seconds.
  Code: `docs/backlog/gameplay.md`
- **`leash.ranks`**: Leash sigils drawn as bare glyphs in their rank's colour (baby, youth, adult, legend) with embers rising off them, so ranks are easy to tell apart at a glance.
  1. Ed, 2026-10-27: "larger sigils is good ... embers are good ... colours-for-rank is good; it's more important in rapid gameplay to be able to tell ranks apart than creatures" (after mocks 3 to 9; render/leash/ranks.ts)
  2. Ed, 2026-10-27: "go ahead and push all the new sigil work" (the default since; ?sigils=old turns them off and the hex grid back to 4 m)
  on [2], every leash sigil (her stack, placed sigils, happy runes, the ghost, the treetop projection, the bond) is its bare glyph, no ring or disc, glyph metres across on the ground, in its rank's colour (colours: baby, youth, adult, legend; the species' neon stays the world's: borders, stones, fireworks, dancefloor, holograms, chart), with embers rising off its strokes (embers.count at once, each size metres, rising rise metres, by rank; in her stack stack of that), under a dark shade in the glyph's own shape (not a disc); a youth in her stack shows two rows of round dots off to its right, one a berry it eats on the move (toEvolve less the last, eaten at a placed sigil), at most dotsPerRow a row, bright eaten and dim not, pulsing when ready; and the hex grid is hex metres (leash.hex.size).
  Code: `render/leash/ranks.ts`
- **`leash.placeMotes`**: A sigil put down or picked up: its burst of motes rising in its colour (render/leash.ts, drawn in render/leash/combat.ts): count, size (m), bright (times its colour), rise and life (times the old height and length).
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))
- **`leash.ranks.embers.bright`**: The embers rising off rank sigils (on the ground, in her stack, over the rune stones): their colour times this.
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))
- **`leash.ranks.embers.crowd`**: Past this many of her sigils put down, each one's embers thinned by the square root, so a crowd of them isn't noise (0: never).
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))

| knob | type | range |
|---|---|---|
| `leash.length` | number | 0 to … |
| `leash.runSpeed` | number | 0 to … |
| `leash.pickRadius` | number | 0 to … |
| `leash.spacing` | number | 0 to … |
| `leash.runeRadius` | number | 0 to … |
| `leash.hatHold` | number | 0 to … |
| `leash.placedThrough` | number | 0 to … |
| `leash.sigilGlyph` | number | 0 to … |
| `leash.sigilHalo` | number | 0 to … |
| `leash.sigilBacking.dark` | number | 0 to … |
| `leash.sigilBacking.size` | number | 0 to … |
| `leash.sigilBacking.ink` | number | 0 to … |
| `leash.placeMotes.count` | number | 0 to … |
| `leash.placeMotes.size` | number | 0 to … |
| `leash.placeMotes.bright` | number | 0 to … |
| `leash.placeMotes.rise` | number | 0 to … |
| `leash.placeMotes.life` | number | 0 to … |
| `leash.runeGap` | number | 0 to … |
| `leash.hex.size` | number | 0 to … |
| `leash.hex.stone` | number | 0 to … |
| `leash.hex.speaker` | number | 0 to … |
| `leash.runs` | boolean |  |
| `leash.runePull.radius` | number | 0 to … |
| `leash.runePull.speed` | number | 0 to … |
| `leash.runePull.stop` | number | 0 to … |
| `leash.grounded.weight` | number | 0 to … |
| `leash.weight.free` | number | 0 to … |
| `leash.weight.levels` | array of number |  |
| `leash.weight.drag` | number | 0 to … |
| `leash.weight.drift` | number | 0 to 1 |
| `leash.weight.rise` | number | 0 to … |
| `leash.weight.sink` | number | 0 to … |
| `leash.weight.sinkMax` | number | 0 to … |
| `leash.weight.floor` | number | 0 to 1 |
| `leash.weight.extreme` | number | 0 to … |
| `leash.weight.maxTension` | number | 0 to … |
| `leash.weight.babyGround` | number | 0 to … |
| `leash.babies.gap` | number | 0 to … |
| `leash.babies.scatter` | number | 0 to … |
| `leash.babies.calm` | number | 0 to … |
| `leash.babies.farAt` | number | 0 to … |
| `leash.babies.farSpeed` | number | 0 to … |
| `leash.ranks.on` | boolean |  |
| `leash.ranks.hex` | number | 0 to … |
| `leash.ranks.glyph` | number | 0 to … |
| `leash.ranks.colours` | array of array |  |
| `leash.ranks.enemy` | array of array |  |
| `leash.ranks.sizes` | array of number |  |
| `leash.ranks.embers.count` | array of number |  |
| `leash.ranks.embers.size` | array of number |  |
| `leash.ranks.embers.rise` | array of number |  |
| `leash.ranks.embers.stack` | number | 0 to … |
| `leash.ranks.embers.bright` | number | 0 to … |
| `leash.ranks.embers.crowd` | number | 0 to … |
| `leash.ranks.dotsPerRow` | number | 0 to … |
| `leash.ranks.stoneGlow` | number | 0 to … |
| `leash.ranks.standScale` | number | 0 to … |
| `leash.ranks.bold` | boolean |  |
| `leash.ranks.stones.range` | number | 0 to … |
| `leash.ranks.stones.fade` | number | 0 to … |
| `leash.ranks.stones.size` | number | 0 to … |
| `leash.ranks.stones.near` | number | 0 to … |
| `leash.ranks.stones.far` | number | 0 to … |
| `leash.ranks.stones.bars` | number | 0 to … |
| `leash.ranks.stones.radius` | number | 0 to … |
| `leash.ranks.stones.cell` | number | 0 to … |
| `leash.ranks.stones.convert` | number | 0 to … |
| `leash.ranks.stones.ringTilt` | number | 0 to … |
| `leash.ranks.chain.link` | array of number |  |
| `leash.ranks.chain.tether` | number | 0 to … |
| `leash.ranks.chain.slack` | number | 0 to … |
| `leash.ranks.chain.damping` | number | 0 to … |
| `leash.ranks.chain.gravity` | number | 0 to … |
| `leash.ranks.chain.arcPull` | number | 0 to … |
| `leash.ranks.chain.iterations` | number | 0 to … |
| `leash.ranks.chain.jump` | number | 0 to … |

### `bond`

How a leashed creature shows its tie to its sigil: a glow at its feet, sparks, and a thread when the leash is strained.

1. Ed, 2026-10-06: "The curve on slack leashes should be higher than it is now"
2. Ed, 2026-10-15: "The arc of leashes should be higher" (doubled, 0.4 to 0.8 and the cap 4 to 8)
how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain). The bond between her and her leashed creatures: rim, a glow at a creature's feet in its sigil's colour; sparks, one now and then from sigil to creature (every sparkEvery seconds, staggered); thread, a dotted line while a leash is under strain (past 0.85 of its length), bowing upward by threadArcSlack metres per metre of its length while slack, flattening to threadArcTaut as it goes taut [1][2], never more than threadArcMax metres.

| knob | type | range |
|---|---|---|
| `bond.rim` | boolean |  |
| `bond.sparks` | boolean |  |
| `bond.thread` | boolean |  |
| `bond.sparkEvery` | number | 0 to … |
| `bond.threadArcSlack` | number | 0 to … |
| `bond.threadArcTaut` | number | 0 to … |
| `bond.threadArcMax` | number | 0 to … |

## Creatures

Creatures: how many and how they grow, move, notice, nap, guard and fight.

### `fight`

The scale and speed fights are played at, with creatures running at about her speed.

1. Ed's motion scale pass, 2026-10-04: "the animals don't move around enough when attacking and defending"
2. Ed, 2026-10-06: "Charging creatures can easily be evaded by just walking away from them. They should jump far enough or charge far enough that this doesn't work"
The fight's scale and speed [1]: fights are drawn and played at the ground camera's scale, creatures running at about the witch's speed and their patterns about 50 m across. Every leap: reach times how far off it leaps from, a pounce (the lynx's) landing through metres past its target (a slam, the toad's, still onto it); Walking away is no escape [2]: charge.chase, a charge runs at least that many times her ground speed and on until it has caught up with her walking straight down its lane (its own time if longer), so stepping out of the lane at its tell, a blink sideways or the treetops get her clear, walking doesn't (0: off); leap.lead, a leap comes down where she'll be when it lands, as she's going at take-off (that share of it; 0: where she was).

- **`fight.scale`**: every length in a fight times this (attack ranges, lunges, area radii, beam widths, knockback, the packs' patterns and spacing, pursuit and guard reach, aggro).
- **`fight.speed`**: every fight speed times this (running, charging, lunging, shots).
- **`fight.momentum`**: How heavily creatures in a fight speed up, brake and turn.
  1. Ed, 2026-10-05: "they should have more momentum"
  how heavily creatures in a fight change speed and turn: their accelerations, braking and turn rates divided by it (2: twice as heavy). Try ?fightScale= and ?fightSpeed=, or change them live on the pause page (Esc): its Debug knobs sliders, or [ and ] for scale; and ' for speed,, and. for momentum.
- **`fight.charge`, `fight.leap`**: every species' charge (movement.json) scaled: reach its run's time and overshoot past its target, turn its turn rate (lower: wider arcs), brake how hard it slows (lower: more momentum).
  1. Ed, 2026-10-06: round 13: 'charging and jumping creatures should charge or jump much further... damaging whenever they're touched while in attack mode... much more momentum, travelling in wide arcs'
- **`fight.charge.contact`**: it hurts every foe it touches on the way, once each (her grace making one charge one hit). a pounce hurts whoever it touches in the air.
- **`fight.charge.miss`**: a charge that struck nothing stands winded that many seconds after (stars round its head), an opening for her 💌s [1].
  1. Ed, 2026-10-06: "We want to reward skilful use of blink and accurate invitation aiming"

| knob | type | range |
|---|---|---|
| `fight.scale` | number | 0 to … |
| `fight.speed` | number | 0 to … |
| `fight.momentum` | number | 0 to … |
| `fight.charge.reach` | number | 0 to … |
| `fight.charge.turn` | number | 0 to … |
| `fight.charge.brake` | number | 0 to … |
| `fight.charge.contact` | boolean |  |
| `fight.charge.chase` | number | 0 to … |
| `fight.charge.miss` | number | 0 to … |
| `fight.leap.reach` | number | 0 to … |
| `fight.leap.through` | number |  |
| `fight.leap.contact` | boolean |  |
| `fight.leap.lead` | number | 0 to … |

### `creatureMomentum`

Creatures chasing her carry momentum on their run-in and wind-up, so she can dodge past them.

1. Ed, 2026-10-27: "most animals don't have enough momentum and can turn too sharply, or alternatively track the witch too quickly and accurately ... less worth dodging"
2. "all these as options, which we can tweak later" … "prediction is ok, but it should mostly be for telegraphed attacks" … "each creature can have different amounts of each" (rules/momentum.ts)
3. Ed, 2026-10-27
Creature momentum [1][2], chasing the witch only (fights between creatures, legends and marchers as before): on its run-in and its wind-up (a pack's tell and combo too), never its committed lunge, which goes where the wind-up aimed, reaching up to a quarter again its usual length if the run-in left it short [3], so a strike that starts stays reliable. The pause page's sliders (Creature momentum) are global: turn, delay and strikeLead multiply every species' values, chaseLead adds seconds to every species' own; on false: as before.
Code: `rules/momentum.ts`

- **`creatureMomentum.turn`**: its heading swings at most turn / (1 + its speed / k) degrees a second (also divided by fight.momentum), slowing to turn tighter when she's far off its heading, so a fast one sidestepped overshoots in an arc.
- **`creatureMomentum.delay`**: it steers for where she was that many seconds ago (a short trail of her places), so a sidestep or blink fools it a moment.
- **`creatureMomentum.chaseLead`**: seconds of her velocity it leads her by when just chasing (0: none).
- **`creatureMomentum.strikeLead`**: times the lead its telegraphed attacks take (a melee wind-up's tracking, dodge.a.lead; a charge's lane, dodge.b.chargeLead; a leap, fight.leap.lead; a swoop's dive; shots and lobs, dodge.b.lead).
- **`creatureMomentum.classes`**: each class's values (heavy: dodge.a.heavy's species; light: those with the nimble or swarm trait; normal: everyone else), and a species may set its own in its folder (art/creatures/<id>/creature.js movement.momentum).

| knob | type | range |
|---|---|---|
| `creatureMomentum.on` | boolean |  |
| `creatureMomentum.turn` | number | 0 to … |
| `creatureMomentum.delay` | number | 0 to … |
| `creatureMomentum.chaseLead` | number | 0 to … |
| `creatureMomentum.strikeLead` | number | 0 to … |
| `creatureMomentum.classes.heavy.turn` | number | 0 to … |
| `creatureMomentum.classes.heavy.k` | number | 0 to … |
| `creatureMomentum.classes.heavy.delay` | number | 0 to … |
| `creatureMomentum.classes.normal.turn` | number | 0 to … |
| `creatureMomentum.classes.normal.k` | number | 0 to … |
| `creatureMomentum.classes.normal.delay` | number | 0 to … |
| `creatureMomentum.classes.light.turn` | number | 0 to … |
| `creatureMomentum.classes.light.k` | number | 0 to … |
| `creatureMomentum.classes.light.delay` | number | 0 to … |

### `attackFx`

How attacks feel on screen: attackers crouch and lunge, hits squash their target, and hard knock-backs send it tumbling.

1. Ed, 2026-10-06: "make creature attack visuals better" (render/attackFeel.ts)
How attacks feel on screen [1], a party not a fight: windupSquash, how low and wide an attacker crouches as its wind-up nears the blow (at most windupMax seconds of it shown); lungeStretch, how far it stretches out in its lunge; squash, how flat a hit squashes the one it hits, springing back past its shape over squashSecs seconds; a knock-back thrown faster than tumbleKnock m/s tumbles: up tumbleHeight metres (at most 1.5 times that for the hardest) for tumbleSecs, over on its back from turnFrom to turnTo of the way (one slow beat, never a strobe), landing with a squash. Squash and stretch go in whole art pixels.
Code: `render/attackFeel.ts`

- **`attackFx.legendFlash`**: how much bigger and longer a legend's blow flashes than anyone's (its flash 1 + 2 × legendFlash times; 0.5, twice: Ed's decisions panel, config/decisions.json).
  Code: `config/decisions.json`

| knob | type | range |
|---|---|---|
| `attackFx.windupSquash` | number | 0 to … |
| `attackFx.windupMax` | number | 0 to … |
| `attackFx.lungeStretch` | number | 0 to … |
| `attackFx.squash` | number | 0 to … |
| `attackFx.squashSecs` | number | 0 to … |
| `attackFx.tumbleKnock` | number | 0 to … |
| `attackFx.tumbleHeight` | number | 0 to … |
| `attackFx.tumbleSecs` | number | 0 to … |
| `attackFx.turnFrom` | number | 0 to … |
| `attackFx.turnTo` | number | 0 to … |
| `attackFx.legendFlash` | number | 0 to 1 |

### `combat`

How creatures fight: who goes for whom, how fast they run and chase, and how much a soundsystem and home's speakers can take.

1. Ed's playtest, 2026-10-04
2. Ed's playtest, 2026-10-11: "Animals seem to walk very slowly when they're going towards soundsystems they plan to attack" (it was its walk times marchMult, under 1 m/s, and marchOnRun 5 m/s marching on)
3. Ed, 2026-10-11: "seem to struggle to damage soundsystems" (some; a charge struck once a run, a swoop once a dive)
4. Ed, 2026-10-04
5. Ed, 2026-10-08: from 4000: shorter games, falls that cascade, and you must stop a swarm before it arrives
6. Ed, 2026-10-08: "home as 12 speakers at 500 hp each" (rules/speakers.ts)
Combat (Stage 4; the attacks themselves are data in config/combat.json; lengths and speeds at the fight's scale: see fight). Wild creatures attack party animals of other kinds within aggro metres. They go for the witch on the ground as soon as she's in their area or within their attack's range [1], and let her go when she rises to the treetops, or once she's out of their area, out of their range and at least witchLose metres away; then they walk back to their spot. The one she's inviting holds its fire on her (its friends don't). Party animals following her take on what attacks her or her party; parked ones (at a sigil) guard within guard.radius of it. Babies are never attacked, by either side. Marching on a soundsystem, its own area's or marching on after a fall, a creature moves at marchShare of its top (fight) speed: its movement profile's, else fightRun, a legend legendRun [2]. Against a soundsystem or speaker, charging kinds don't charge and swoopers don't swoop: they land and use their ordinary attack [3]. A beaten creature, wild or party, runs off the map at fleeMult times its speed and is gone for good [4]; a party animal is lost for the run. A soundsystem has soundsystemHealth, passive, and is hit within soundsystemRadius metres: sieges should outlast the wave gap. A soundsystem has 500 [5]. Home is its ring of speakers [6], each a soundsystem of speakerHealth, hit within speakerRadius metres, the besiegers going for the nearest standing one; home falls when every one has (its old homeHealth 8000 and homeRadius 9 gone).
Code: `config/combat.json`, `rules/speakers.ts`

- **`combat.packs.shadow`**: A pack member hiding in its lull (in the trees, underground, under water, in the branches, or scattered) is drawn as a shadow of itself, not left out.
  1. Ed, 2026-10-29: "'hiding' maybe should look like the animal becoming a shadow (dark and transparent), rather than teleporting"
  Hiding looks like a shadow [1]: while it's hidden (and can't be hit) it's drawn as its own sprite darkened by shade (0 its own colours, 1 black) at opacity, running round to where it comes back, fading from solid to shadow over fade seconds as it hides and back as it comes out (render/view/creatures.ts).
- **`combat.packs.shadow.shade`**: How dark: 0 its own colours, 1 black.
- **`combat.packs.shadow.opacity`**: How opaque the shadow is (0 invisible, 1 solid).
- **`combat.packs.shadow.fade`**: Seconds to turn from solid to shadow as it hides, and back as it comes out.
- **`combat.packs`**: Pack kinds fight in combos (the nearest lunges, the ranged fire where she'd dodge, one behind her throws its special) and fall back between them.
  1. Ed, 2026-10-19: docs/backlog/combat.md, build step 1
  2. Ed, 2026-10-20: "Turn pack combat on by default"
  pack combat [1], on by default [2] and on the pause page to turn off for testing: on, packs of config/packs.json's kinds (home's ten and Phase 1's eleven) fight in combos (the nearest lunges, the ones at range fire where a dodge would go, the one behind her throws the special), fall back by their kind's retreat between combos, and her own pack combos without retreating.
  Code: `docs/backlog/combat.md`, `config/packs.json`
- **`combat.aggro`**: wild creatures go for party animals within this, and for the witch anywhere in their area.
- **`combat.leaveArea`**: How far past its area's edge a wild creature chases her before giving up and going home.
  1. Ed, 2026-10-05
  2. Ed, 2026-10-06: round 13: 30; it was 10
  a wild one chasing the witch gives up once she's this far past its area's edge, and turns back home (besiegers keep witchLose: they give up once she's out of their area, out of range and this far off). a wild creature chases her (or her party) up to this many metres past its area's edge [2]; beyond it, or once she rises, it gives up and retreats into its area at its own pace, roaming again once it's in and within retreatHome metres of home, taking up a fight on the way only with someone back in its area (no flip-flopping at the edge). Besiegers march as before; happy and leashed ones aren't affected.
- **`combat.pursuit`**: how far from her (or its sigil, guarding) a party animal chases a foe before giving up.
- **`combat.pursuitRun`**: how fast it closes in while over 30 m off (so an area's creatures are onto her in a few seconds when she lands in it).
- **`combat.fightRun`**: how fast a creature runs in a fight (m/s), when its movement profile doesn't say (movement.json speed).
- **`combat.legendRun`**: a legend's.
- **`combat.reaction`**: seconds before a creature that has just noticed something goes for it.
- **`combat.shake`**: how hard a legend's quake shakes the screen (0 none).
- **`combat.daze`**: seconds a wild creature knocked down in a fight lies stunned (nothing attacks it, it attacks nothing, she can still invite it; it counts as present for its legend, and no siege takes it) before it runs off home [1].
  1. Ed, 2026-10-06: "the length of the stun of wild creatures that are downed in combat, before they run away, should be 20 seconds" (round 13; it was 8, states.json's daze)
- **`combat.defendRadius`**: her animals following her within this many metres of her go first for anything attacking her, spread over her attackers; farther off, following her, one fights back only at what's on it itself (and parked, guarding or travelling ones carry on as they were): never pulled across to her fight.
  1. Ed, 2026-10-09: "just ones that are in the same combat as you" (her posse defends her)
- **`combat.taunt`**: a creature after her that one of her animals in her fight hits turns on that animal instead, with chance chance, for time seconds (a lunge at her already under way lands first; then it may come back to her).
  1. Ed, 2026-10-09: "Taunt seems good" (on #592)

| knob | type | range |
|---|---|---|
| `combat.packs.on` | boolean |  |
| `combat.packs.shadow.shade` | number | 0 to … |
| `combat.packs.shadow.opacity` | number | 0 to … |
| `combat.packs.shadow.fade` | number | 0 to … |
| `combat.aggro` | number | 0 to … |
| `combat.witchLose` | number | 0 to … |
| `combat.leaveArea` | number | 0 to … |
| `combat.pursuit` | number | 0 to … |
| `combat.pursuitRun` | number | 0 to … |
| `combat.fightRun` | number | 0 to … |
| `combat.legendRun` | number | 0 to … |
| `combat.reaction` | number | 0 to … |
| `combat.marchShare` | number | 0 to … |
| `combat.fleeMult` | number | 0 to … |
| `combat.soundsystemHealth` | number | 0 to … |
| `combat.soundsystemRadius` | number | 0 to … |
| `combat.speakerHealth` | number | 0 to … |
| `combat.speakerRadius` | number | 0 to … |
| `combat.shake` | number | 0 to … |
| `combat.daze` | number | 0 to … |
| `combat.retreatHome` | number | 0 to … |
| `combat.defendRadius` | number | 0 to … |
| `combat.taunt.time` | number | 0 to … |
| `combat.taunt.chance` | number | 0 to … |

### `notice`

Creatures notice her on the ground nearby: resting ones turn to look, curious babies come up to her.

Creatures notice the witch on the ground within radius metres (Ed's playtest: a larger responsive area makes them feel alive): resting ones turn to look at her; babies of a curious kind come up to about curious metres from her, skittish ones keep about skittish metres off (config/combat.json temperament).
Code: `config/combat.json`

| knob | type | range |
|---|---|---|
| `notice.radius` | number | 0 to … |
| `notice.curious` | number | 0 to … |
| `notice.skittish` | number | 0 to … |

### `dodge`

Dodging matters: creatures commit to their strikes, so she can dodge them by moving or blinking away.

1. Ed, 2026-10-08: "almost all animals are easily evaded simply by walking backwards, even large swarms. Ideally good play should require effective use of dodge" (he picked all three)
Dodging matters [1]: against the witch only (fights between creatures as before). a, committed strikes: a creature closes on her at chase times its sprint (combat.pursuitRun, or its kind's pursuit: so a slow kind can still be outwalked), a melee one surges on at surge times its sprint while it winds up (no gliding to a stop), tracking her, aiming where she'll be when its blow arrives (her velocity times that time, times lead), until commit seconds before it lets go, when its aim locks (a blink then, or during its lunge, gets her clear), lunging lunge times its attack's lunge, its blow reaching width times its attack's range.

- **`dodge.a.heavy`**: Heavy kinds chasing her build up speed and swing their charges toward her, so a burst or a blink gets clear.
  1. Ed, 2026-10-09: "Maybe heavies can have a higher top speed, but slow acceleration?"
  2. Ed, 2026-10-09: "shooters should have longer range"
  chasing her, those species run at up to speed m/s (above her walk) built up at accel m/s each second, their charges swinging toward her at home degrees a second as they run, so a burst or a blink gets clear and a long retreat is run down (the snail, hedgehog and woodlouse left slow, the last two with their rolling charges; the mole with its own burrow); her blink keeps her untouchable for gone seconds (dash.gone otherwise); and at most tokens creatures wind up or strike at her at once (swarmTokens when swarm or more are on her), the rest keep their places. b, predictive aim: shots aim at release where she'll be when they arrive (times lead), lobs where she'll be when they land (times lobLead), charges down the lane to where she'll be when they reach her (times chargeLead); a shot lives life times its range over its speed (1.3 before); a shot at her flies speed times as fast (chasing her at her walk it closes at only its speed less hers); a shot or lob at her reaches range times as far, the shooter keeping its usual distance, [2] and winds up at most windup seconds (a beam as before: a sweep a blink can't outrun keeps its long warning). c, packs cut off her retreat: while she moves faster than moving times her walk, share of a pack of species (wolves, foxes, martens, bats) take places ahead of her (ahead seconds of her run on, angle radians either side of her heading, reach times their attack's reach out), sprinting at up to sprint m/s to get there. ?dodge=a,b,c turns on those named and off the rest (?dodge=0 none).

| knob | type | range |
|---|---|---|
| `dodge.a.on` | boolean |  |
| `dodge.a.lead` | number | 0 to … |
| `dodge.a.commit` | number | 0 to … |
| `dodge.a.chase` | number | 0 to … |
| `dodge.a.lunge` | number | 0 to … |
| `dodge.a.surge` | number | 0 to … |
| `dodge.a.width` | number | 0 to … |
| `dodge.a.gone` | number | 0 to … |
| `dodge.a.tokens` | number | 0 to … |
| `dodge.a.swarm` | number | 0 to … |
| `dodge.a.swarmTokens` | number | 0 to … |
| `dodge.a.gap` | number | 0 to … |
| `dodge.a.heavy.species` | array of string |  |
| `dodge.a.heavy.speed` | number | 0 to … |
| `dodge.a.heavy.accel` | number | 0 to … |
| `dodge.a.heavy.home` | number | 0 to … |
| `dodge.b.on` | boolean |  |
| `dodge.b.lead` | number | 0 to … |
| `dodge.b.lobLead` | number | 0 to … |
| `dodge.b.chargeLead` | number | 0 to … |
| `dodge.b.life` | number | 0 to … |
| `dodge.b.windup` | number | 0 to … |
| `dodge.b.range` | number | 0 to … |
| `dodge.b.speed` | number | 0 to … |
| `dodge.c.on` | boolean |  |
| `dodge.c.species` | array of string |  |
| `dodge.c.moving` | number | 0 to … |
| `dodge.c.share` | number | 0 to … |
| `dodge.c.angle` | number | 0 to … |
| `dodge.c.reach` | number | 0 to … |
| `dodge.c.ahead` | number | 0 to … |
| `dodge.c.sprint` | number | 0 to … |

### `stoneIdle`

A wild area's hostile creatures gather and roam near its runestone.

1. Ed, 2026-10-08: "if you enter a hostile area and the animals are at the very opposite end, it can be quite a long time before they reach you, and so it feels like nothing is happening. I think we can solve this by having the hostile creatures tend to idle near the runestone"
Hostile creatures gather near the runestone [1]: a wild area's own hostile young and adults (not its babies, its legend or its circle's baby, nor a friendly area's, nor happy, leashed or enraged ones) start, roam and nap anywhere in a disc of radius metres round its runestone, evenly spread (a loose cluster, not a ring), keeping clear metres off the stone itself; still inside their own area. Arriving at the stone means meeting them.

- **`stoneIdle.on`**: false lets them roam the whole area as before.

| knob | type | range |
|---|---|---|
| `stoneIdle.on` | boolean |  |
| `stoneIdle.radius` | number | 0 to … |
| `stoneIdle.clear` | number | 0 to … |

### `sigilAvoid`

Idling and dancing creatures keep off the sigils lying on the floor.

1. Ed, 2026-10-28: "When idling or dancing, creatures should try and avoid standing on floor sigils"
Creatures keep off floor sigils [1]: wild idlers, happy ones at their area, dancers and parked ones roaming round their sigil choose where to stand next off every sigil on the floor (her placed sigils, happy creatures' runes, relics' sigils, her hats lying down), and one resting on a sigil moves on. Only a nudge: with nowhere clear in a dozen tries it stands where it would have; moving, chasing, fighting and marching are untouched.

- **`sigilAvoid.on`**: false lets them stand on sigils as before.
- **`sigilAvoid.pad`**: Metres past a sigil's edge a creature's middle still counts as on it.

| knob | type | range |
|---|---|---|
| `sigilAvoid.on` | boolean |  |
| `sigilAvoid.pad` | number | 0 to … |

### `wildWatch`

On her first landing in a wild area its creatures stare and redden for a few seconds before they attack, and how far they chase her after.

1. Ed, 2026-10-07: "stir, evade and hang back, turning to LOOK at her" (when she enters a dormant area its animals nap, then, then attack; every creature looks, no special art)
2. Ed, 2026-10-07: "make the dormant-to-attacking choreography slower, with a visible sign of aggro (e.g. red tint) rising that lets a player who wanders into a dangerous area understand what's happening and have time to run away"
3. Ed, 2026-10-08: "Six second dormant period should be four seconds" (5.5 before, 2 before that)
4. Ed, 2026-10-07: "remove the wild area aggro red glow" (the screen edges' red that went with it is gone)
5. Ed, 2026-10-07: "should fade out rather than cut out instantly" (DECISION FOR ED, 0.7)
6. Ed, 2026-10-13: "Animals should chase outside, and relatively far. The idea is to stop people just sitting near the edge of a territory and sniping/kiting. However if you leave the area before the warning ends then they don't attack"
The wild watch [1]: on a witch's first coming down on the ground in a wild area (not partified, not friendly, not home), its wild young and adults (not legends, the enraged or besiegers; babies keep their notice) hold off for time seconds, standing and turning to stare at her, any within hangBack metres backing off a little; then they fight as ever. The area is forgotten forget seconds after the last witch was on the ground in it, so a later visit plays it again. Slower, with a warning [2]: time is 4 s [3]; leaving the area or rising before it is up calls it off (they settle back and don't chase; the next visit starts it over). Over the watch each watcher reddens, from faint as they notice her to full just before they attack, the whole area together: its red up to tint [4], times the area's danger, its watchers' fighting value over dangerF (F, rules/power.ts) capped at 1, so a deep, crowded area reads as worse than a first-ring one. When the watch ends (they attack, she invites one, she leaves or rises) the red eases out over fade seconds [5]. The chase [6]: leave before the warning's up and none comes after her; once they've attacked (the warning over with her inside) they follow her out to combat.leaveArea metres past their edge; and a 💌 of hers landing on a wild creature provokes it for provoked seconds: it comes out after her across its edge, to the same band (no sniping from just outside).
Code: `rules/power.ts`

- **`wildWatch.on`**: false: they attack at once, as before.
- **`wildWatch.inviteWakes`**: a 💌 landing on one of a wild area's creatures wakes the area at once: its watch is over (or never starts), and its own young and adults, napping or not, wake with no getting up and go for her at once, by the hunt's rules (rules/inviteWakes.ts); its babies, legend and circle baby as before.
  1. Ed, 2026-10-08
  Code: `rules/inviteWakes.ts`

| knob | type | range |
|---|---|---|
| `wildWatch.on` | boolean |  |
| `wildWatch.inviteWakes` | boolean |  |
| `wildWatch.provoked` | number | 0 to … |
| `wildWatch.time` | number | 0 to … |
| `wildWatch.forget` | number | 0 to … |
| `wildWatch.hangBack` | number | 0 to … |
| `wildWatch.dangerF` | number | 0 to … |
| `wildWatch.tint` | number | 0 to … |
| `wildWatch.fade` | number | 0 to … |

### `hunt`

Once the wild watch is over, every awake young and adult in the area hunts her while she's in it.

1. Ed, 2026-10-07: "When I go to a wild area, after they are awoken all of the wild creatures from that area should fight with me until either I die or they are invited. When they are all invited, the runestone transforms into a soundsystem. The legend and the circle baby are the exceptions"
2. "they should lose interest and go home if you leave their area, as they did before" (and; rules/hunt.ts)
The hunt [1][2]: once a wild area's watch is over with her on the ground in it, every one of its own awake young and adults hunts her while she's in the area, wherever in it they are, never giving up or napping; over the treetops there they hold and come on again when she lands. It ends for one when it's invited, enraged, or knocked down and run off; for all of an area's when she leaves the area (they're ordinary wild creatures again: they give up combat.leaveArea metres past their edge and walk home, as before); for all of hers when she's knocked out (they give up, walk home and roam, DECISION FOR ED, and the area's watch plays again on her next visit). Back in an area she left, it hunts her again at once while it's remembered (wildWatch.forget seconds after she was last on the ground in it), else its watch plays again. Babies don't fight.
Code: `rules/hunt.ts`

- **`hunt.on`**: false: the old rule (only those near her attack).

| knob | type | range |
|---|---|---|
| `hunt.on` | boolean |  |

### `naps`

Wild creatures roaming their area now and then lie down for a nap.

1. Ed, 2026-10-06: "I think animals in wild areas which are idling can sleep. They awake when you are there in ground mode, but stay asleep if you're in treetop mode, or not in their area (e.g. you see them from an adjacent area)"
2. "They don't all sleep - but it's one of the things they can do while idling"
Wild idlers nap [1][2]: a wild creature roaming its own still-wild area (not besieging, fleeing, dazed, marching, fighting, happy or a legend), at each pause, lies down instead with chance, for length seconds (a range: min, max), then gets up. It gets up at once when a witch is on the ground in its area (none starts a nap then), and when its area is partified or it's enraged or taken; getting up takes wake seconds (a stretch, a yawn), out of fights till then, so landing isn't an instant pounce. Asleep it stays down with her in the treetops or on the ground in another area, however near. Sleepers skip their roam and every fight.

- **`naps.on`**: false turns naps off.
- **`naps.circle`**: a legend circle's baby [1] naps at each pause with its own chance, for its own length (seconds), and is woken only by a witch on the ground within reach metres of its circle's edge (so she can still invite it), not anywhere in its area.
  1. Ed, 2026-10-07: "the legend circle baby should spend most of its time napping when in the circle"

| knob | type | range |
|---|---|---|
| `naps.on` | boolean |  |
| `naps.chance` | number | 0 to … |
| `naps.length` | array of number |  |
| `naps.wake` | number | 0 to … |
| `naps.circle.chance` | number | 0 to … |
| `naps.circle.length` | array of number |  |
| `naps.circle.reach` | number | 0 to … |

### `guard`

Creatures parked at a sigil on the ground guard it, fighting any wild creature that comes near.

1. Ed, 2026-10-04
2. Ed, 2026-10-11: "Animals leashed inside the home area should aggro enemy creatures within that area"
3. Ed, 2026-10-15: "Placing a sigil in any area should work as home does: the creatures defend the whole area, plus a radius round the sigil"
Parked party animals (at a sigil on the ground) guard it [1]: they take on any wild creature of another kind within radius metres of the sigil, and come back to it. One parked with its sigil in the home area (the dancefloor's) guards all of that area instead [2]: any wild or enraged creature anywhere in it, never one outside it, whatever radius says. Parked in any other area [3], it guards all of its sigil's area and radius metres round the sigil besides (rules/homeArea.ts areaOf).
Code: `rules/homeArea.ts`

| knob | type | range |
|---|---|---|
| `guard.radius` | number | 0 to … |

### `population`

How many wild creatures each area starts with, more along the waves' route so the later areas are the dangerous ones.

1. Ed, 2026-10-04
2. Ed, 2026-10-05: one baby and one young:, 'actually, the game should start with one baby and one youth, otherwise you can't avoid enraging lots of legends', after 'the game is hard! we should start each area with just one baby'; before it, one young and one adult, and before that one baby and two adults
3. Ed, 2026-10-07: "no population growth on a clock" (his new core design)
4. Ed, 2026-10-08: the swarm plan's phase 1: its own young and adults, the ones a wave enrages and sets marching; rules/swarm.ts
5. 2026-10-06: a fraction carries over: 0.5 is one every other wave; balance, DECISION FOR ED: 0.5, from 1, so a player's defence can hold the early sieges and playing well matters
6. Ed, 2026-10-28: "during a night, no creatures are created and none are destroyed" (growth.on off, so the balance simulators match the game; a creature that runs off sleeps on the beach (rules/runaway.ts))
Wild creatures [1]: every area starts with the same population, population.start [2], and, from the start [3], more by its place on the waves' route (Balance 2's shape; rules/growth.ts routePopulation): byRoute's threat (since removed: the hostile swarm below does this now), [route index, F] points (1 the first wave's stone; straight lines between, flat past the ends), is the extra fighting value its young and adults add (F by Lanchester, young 11.6, adult 40, babies 0; about what an area woken at that wave grew to before); its kind spends it by its profile (byRoute's profiles by species (removed with it), else default: the shares of its extra creatures as babies, young and adults), so many more of a swarm's young than of a heavy kind's adults, at the same danger: count = threat ÷ the profile's mean F a creature × the area's count scale, rounded, split by the shares (largest remainder, ties by the seed). The hostile swarm [4]: its challenge grows with the area's place p in the runestone order (0 the first stone, 1 the last), whatever its species. Each area fields, of every size up to its species' cap (capScales: the cap grown along the same curve, at least 2) and every young/adult split, the one nearest the target; among those within swarm.mixTolerance (10%) of the nearest, a mix of young and adults first. A simulated power (config/swarm-power.json, empty in phase 1) stands in for the estimate where it has the swarm. So a default map (about 100 areas) holds about 540 hostiles: the curve's average, 5.8 an area. growth is the old growth on a clock, which the game no longer reads, off since [6] (the balance simulators read it only when on): every wave, each area the party hasn't reached gained growth.perWave more [5], each at a random level by growth.weights (baby, young, adult: equal thirds), so the areas the party reaches late are the ones to fear. Areas already partified don't grow. New ones arrive out of the witch's sight (beyond the haze's far edge plus growth.hide metres), never popping in on screen; areas far from every witch keep them as counts only, made real (from the seed) when a witch comes within creatureSimRadius of the area or it wakes. The home area holds none. Fighting value (DESIGN.md, Balance): a young is worth 15.5, an adult 29, a legend 76; so an area woken at wave n brings about 1 + n/3 young and 1 + n/3 adults (F about 44.5 + 14.8 n), besides its legend (wildLegends). Only creatures whose home is within creatureSimRadius metres of the witch move. node tools/balance/sim.mjs forecasts the sieges these numbers make.
Code: `rules/growth.ts`, `rules/swarm.ts`, `config/swarm-power.json`, `tools/balance/sim.mjs`

- **`population.byRoute.babies`**: babies in every area, start's included [1], at most babyCap.
  1. Ed, 2026-10-07: about two, for quest sigils and berries
- **`population.byRoute.minHostile`**: at least this many young or adults in every wild area [1], any shortfall made up with young.
  1. Ed, 2026-10-07: "every wild area has at least one hostile wild creature"
- **`population.swarm.classes`**: Swarm species come in strong, medium and light classes, smaller swarms of stronger creatures.
  1. Ed, 2026-10-10: 2026-10-11
  strong (cap 6), medium (cap 12: swarm.reference, and every species not listed) and light (cap 16; Ed: "a swarm of 20 is too many; cap it at 16"), each class's strength 12 / its cap on its creatures' health and damage (strong ×2, light ×0.75; rules/combat/data.ts), so moving a species is one line here. The target is the estimated power (Σhp × Σdps; the witch doesn't count: her three hits ignore damage) of a medium reference swarm of swarm.start + (swarm.endAverage − swarm.start)·p^swarm.curve creatures (1 + 11·p^1.3), its young share easing from swarm.youngShare[0] (1.0) to [1] (0.2). p is the master curve's [1]: by the area's wave, (wave − 1)/(swarm.waves − 1), so wave swarm.waves (64) brings today's final swarm, every island plays it from wave 1 as far as it has areas, and a bigger map holds there after.
  Code: `rules/combat/data.ts`

| knob | type | range |
|---|---|---|
| `population.start.babies` | number | 0 to … |
| `population.start.young` | number | 0 to … |
| `population.start.adults` | number | 0 to … |
| `population.byRoute.babies` | number | 0 to … |
| `population.byRoute.babyCap` | number | 0 to … |
| `population.byRoute.minHostile` | number | 0 to … |
| `population.swarm.start` | number | 0 to … |
| `population.swarm.endAverage` | number | 0 to … |
| `population.swarm.waves` | number | 0 to … |
| `population.swarm.curve` | number | 0 to … |
| `population.swarm.youngShare` | array of number |  |
| `population.swarm.reference` | string |  |
| `population.swarm.classes` | record |  |
| `population.swarm.capScales` | boolean |  |
| `population.swarm.mixTolerance` | number | 0 to … |
| `population.growth.on` | boolean |  |
| `population.growth.perWave` | number | 0 to … |
| `population.growth.weights` | array of number |  |
| `population.growth.hide` | number | 0 to … |

### `creatureSimRadius`

See `population`.

| knob | type | range |
|---|---|---|
| `creatureSimRadius` | number | 0 to … |

### `simLod`

How far from her wild creatures are simulated every step; further off they're simulated coarsely, and past the sim radius not at all.

1. Ed, 2026-10-05: creatures far from the action frozen until she comes closer; rules/simLod.ts
The simulation's level of detail [1]. Wild creatures roaming are simulated every step within full.ground metres of the witch on the ground, full.treetop over the treetops (each a little past the most the view shows from there at any zoom: 178 and 262 m in a 1900 by 1240 window); beyond, coarsely: once every `every` steps (60 a second), by that many steps' time at once, taking turns; past creatureSimRadius not at all. Besiegers marching on a soundsystem are simulated every step within full of her or within action metres of a soundsystem, a party animal or a happy legend's guard; elsewhere coarsely, marching `every` steps at a time. Going out, one stays in full until band metres past the line, so none flickers. The debug overlay's sim line counts them.
Code: `rules/simLod.ts`

| knob | type | range |
|---|---|---|
| `simLod.full.ground` | number | 0 to … |
| `simLod.full.treetop` | number | 0 to … |
| `simLod.action` | number | 0 to … |
| `simLod.band` | number | 0 to … |
| `simLod.every` | number | 0 to … |

### `creatureSpeed`

| knob | type | range |
|---|---|---|
| `creatureSpeed` | number | 0 to … |

### `creatureSpeeds`

The witch is much faster than almost all creatures.

1. 2026-10-04
Ed [1]: the witch is much faster than almost all creatures (she flies at groundSpeed, 19.25 m/s, on the ground and treetopSpeed, 48, over the treetops; at first 14 and 32). Wild creatures amble at creatureSpeed m/s (legends legendSpeed); leashed ones run after their leash point at leash.runSpeed. The fast few (fast: hare, stoat, marten; rare, and weaker when combat comes) move fastMult times the usual; legends run at legend times it: very slow.

| knob | type | range |
|---|---|---|
| `creatureSpeeds.fast` | array of string |  |
| `creatureSpeeds.fastMult` | number | 0 to … |
| `creatureSpeeds.legend` | number | 0 to … |

## Legends

Legends: their circles, dreams, quests, rage and the wild ones.

### `legendCircle`

Standing in a sleeping or restless legend's circle slows the whole world down.

1. Ed, 2026-10-06: "the music and countdown get ~10x slower, things still move on the outside but very slowly, the music audibly slows down (this is a good audio cue for the transition) ... freeze only if the legend is asleep or restless. Enraged creatures outside the circle don't enter it. Your invitations disappear if they go outside the circle from inside"
A legend's circle [1]: slow: while she stands on the ground in the circle of a legend asleep or restless, the world (the clock, the waves' countdown, the music, every creature, siege and timer) runs at scale of its speed, easing there and back over ease seconds as she crosses its edge; she and everything of hers (moving, blinking, rising and landing, her sigils, her 💌s and their cooldowns, her hat) keep full speed. on false (or ?slow=0) for none. A calm circle (its legend asleep or restless) keeps enraged creatures out whether she's there or not, and a 💌 leaving it from inside vanishes in a sparkle.

| knob | type | range |
|---|---|---|
| `legendCircle.slow.on` | boolean |  |
| `legendCircle.slow.scale` | number | 0 to … |
| `legendCircle.slow.ease` | number | 0 to … |

### `dreams`

A sleeping legend's dream bubble, showing the quest it wants, and a pointer to where to go.

1. Ed, 2026-10-05
A sleeping legend's dream (or nightmare) bubble, and its pointer to the nearest runestone of the area type it dreams of [1]: shown only while she's on the ground within range metres of the legend (about its area's clearing and a little more); never from the treetops. A nightmare whose quest has closed shows its face alone.

- **`dreams.nightmare`**: a restless legend's one face [1], slightly sad to angry: faces[k] from restlessness at[k] on.
  1. Ed, 2026-10-05
- **`dreams.sleepy`**: A sleeping legend's sleepy face beside its quest sigil, now and then another face.
  1. Ed, 2026-10-06
  while it sleeps giving its quest (its dream open, no nightmare), its face beside the sigil: mostly face (😴), and now and then, for one turn of every seconds, one of faces instead; each turn its own throw per legend (seeded by its id, so legends never change together), face with chance weight. A face the browser can't draw (🫠 and 😮‍💨 are new) shows as fallback.
- **`dreams.cycle`**: the pixel thought bubble shows one symbol for hold seconds, the face, then the sigil it dreams of, then the face again; a flask share of the sigil's turns (seeded per legend and turn) show the flask's relic sigil instead [2]; each fades in and out over fade seconds.
  1. Ed, 2026-10-08: "just one at a time, alternating between emoji and the quest sigil, and occasionally the flask sigil"
  2. 2026-10-18: 0 since Ed's ruling: a flask no longer wakes a legend, so it no longer dreams of one

| knob | type | range |
|---|---|---|
| `dreams.range` | number | 0 to … |
| `dreams.nightmare.at` | array of number |  |
| `dreams.nightmare.faces` | array of string |  |
| `dreams.sleepy.face` | string |  |
| `dreams.sleepy.weight` | number | 0 to … |
| `dreams.sleepy.every` | number | 0 to … |
| `dreams.sleepy.faces` | array of string |  |
| `dreams.sleepy.fallback` | string |  |
| `dreams.cycle.hold` | number | 0 to … |
| `dreams.cycle.fade` | number | 0 to … |
| `dreams.cycle.flask` | number | 0 to … |

### `legends`

Which areas have a legend, and how far a happy one reaches.

1. Ed, 2026-10-06: "Legends should only appear in about half of areas (we can test this ratio); every area makes them too common." … "it should be more like 1/5" (share: the fraction of the areas (home never) with a sleeping legend (Ed, 2026-10-08:; 0.5 before), seeded per map and spread so they don't clump (no more than two neighbouring areas together where the map allows))
2. 2026-10-06
. The rest have no legend: no clearing, quest, restlessness or legend music. Read as the map is made: the decisions panel reloads. Ed's answers on #259 [2]: happyRange, a happy legend's reach in metres (relic allies: "They stay home, but if they're not useful enough right now, make their range longer").

- **`legends.earlyQuest`**: One of the first areas the waves wake has a legend dreaming of a creature from a nearby area, so there's an early quest.
  1. Ed, 2026-10-07: "for variety we could fix one of [first, second, third] having a legend that wants one of the first three [not itself] so there's always an easy quest to do in the first third"
  one of the first three areas the waves wake (seeded), one with a legend, dreams of the baby of another of those three's kind (rules/quest.ts earlyQuest); if none of them has a legend, one of them (seeded, one whose kind another of the three lacks) is given one as the map is made, moved from the legend area the route reaches last (or, where that would clump legend areas together, from the one beside it), so share holds (rules/map.ts); false: every dream as before.
  Code: `rules/quest.ts`, `rules/map.ts`
- **`legends.areas`**: Each legend gets an area of its own beside one of its kind's areas.
  1. Ed, 2026-10-26: "legends are spawned in additional areas that have legend circles where runestones usually are" (all legends in them)
  on, each of the night's legends gets an area of its own grown out of the island beside one of its kind's areas (its pair), taking its kind and look, with no runestone, soundsystem or route stop, its circle at its heart; the island grows by them; the pair counts as one area for a legend's rage and for creatures attacking and defending (rules/map.ts areaOf); false: legends in their own kind's areas as before.
  Code: `rules/map.ts`
- **`legends.questLater`**: a legend dreams only of a kind living in an area later on the route than its own, within questCap areas; failing that, the kind of the nearest later area; with no later area, any kind (the early easy quest keeps its own pick); false: any kind as before.
  1. Ed's core design, 2026-10-07: relayed by the coordinator: quests point to later areas, deeper in and wilder now the forest is grown before the waves
- **`legends.bombard`**: ("Legend bombards, but prioritises you"): an angry legend with no witch in its reach throws the first lob or beam of its volley at the nearest standing soundsystem within range metres, damage a hit (of combat.soundsystemHealth); a charging legend lobs at it rather than charge.
- **`legends.stomp`**: A legend turning angry destroys its own area's soundsystem at once.
  1. Ed, 2026-10-06: "perhaps" … "an angry legend simply stamps on the soundsystem in its area, destroying immediately. The angry legend waking timer may have to be longer" (a)
  2. Ed, 2026-10-06: "It would be funny if you could leash an elder, but it's so heavy that it stops you moving at all outside the leash slack distance, and it doesn't move towards you at all. Maybe you should be able to turn a happy legend into a party legend with an absurd number of invites (100?) and then pick up its sigil but it's totally useless" (rules/partyLegend.ts)
  3. Ed, 2026-10-06: "They're a high-roll mechanic; you don't know how hard the quest will be before you go off to try and find the creature" (the gamble kept)
  on, a legend turning angry while its own area's soundsystem stands destroys it at once (ruined, as any fallen one), and legends are restless angryAfter seconds before they anger (legends.json angryAfter otherwise). The party-legend Easter egg [2]: partyEgg turns it on; a happy legend (by its relic or its quest) then takes 💌s, its meter partyHits long, draining partyDrain of a full meter a second; full, it's a party legend (it dances in place, fights no one, its rune at its feet); picked up, she can go anywhere within partyReach metres of it (the leash's slack: 0.85 of leash.length) and not a step further, and it never comes to her; put down (E), it's let go where it stands. questNear: 0, a legend dreams of any kind on the map [3]; N, one of the N nearest other kinds round it, an area nearer home counting as nearer (a knob for trying it).
  Code: `rules/partyLegend.ts`

| knob | type | range |
|---|---|---|
| `legends.share` | number | 0 to … |
| `legends.earlyQuest` | boolean |  |
| `legends.areas` | boolean |  |
| `legends.happyRange` | number | 0 to … |
| `legends.questCap` | number | 0 to … |
| `legends.questLater` | boolean |  |
| `legends.bombard.on` | boolean |  |
| `legends.bombard.range` | number | 0 to … |
| `legends.bombard.damage` | number | 0 to … |
| `legends.stomp.on` | boolean |  |
| `legends.stomp.angryAfter` | number | 0 to … |
| `legends.partyEgg` | boolean |  |
| `legends.partyHits` | number | 1 to … |
| `legends.partyDrain` | number | 0 to … |
| `legends.partyReach` | number | 0 to … |

### `wildLegends`

What legends are for: optional quests, relics for powerful allies, and danger to her babies in sieges.

1. Ed, 2026-10-06
2. Ed, 2026-10-04
3. 2026-10-05: "Legends, redesigned" (redesigned, DESIGN.md)
4. Ed, 2026-10-08: legends.share, never home; half before
5. 2026-10-04: wake seconds of heaving out of the ground when its wave woke it; heal hp a second while no enemy was near
What legends are for [1]: a mostly optional layer of tasks; quick players do their quests (open as long as a legend sleeps; legend buffs designed 5 Oct, #87, removed 28 Oct), lucky ones find relics for powerful allies, and a losing player sees their babies hurt in sieges and them enraged, the loss spiral faster and more dramatic (his words in DESIGN.md, "Legends, redesigned", and config/legends.json). Area legends [2][3]: about a fifth of the areas [4] have one legend of its kind, sleeping, sunk into the ground like scenery (sink: the share of it under the ground, moss: how far its colours go toward moss). Waves no longer wake it: it grows restless, then angry, while its area has none of its kind, and a relic by it makes it happy (config/legends.json). A happy legend defends against the enraged within guard metres of where it stands; worn down, it goes back to sleep, any buff it gave kept. wake and heal are the first design's [5]; the redesigned rules don't read them (a happy one heals over legends.json healTime). Drawn scale times a legend's size, swelling by breathe as it breathes (once every breathEvery seconds); awake, an aura on the ground aura metres across and, from the treetops, a glow over the canopy (glow its strength) in a dark mix of its sigil's colour.
Code: `config/legends.json`

- **`wildLegends.seen.dark`, `wildLegends.seen.liftMax`**: a legend whose floored look (seen.floor times its coat's luminance, its body colour as baked: render/legendLight.ts) is under seen.dark has its floor raised to seen.dark over that luminance, at most seen.liftMax; the bear, the boar and the others as dark are caught, lighter legends stay as they are.
  1. Ed, 2026-10-07: "lift the night body light only for legends whose coats are dark enough to vanish at night" (by a measured rule, not a list)
  Code: `render/legendLight.ts`

| knob | type | range |
|---|---|---|
| `wildLegends.wake` | number | 0 to … |
| `wildLegends.sink` | number | 0 to … |
| `wildLegends.moss` | number | 0 to … |
| `wildLegends.guard` | number | 0 to … |
| `wildLegends.heal` | number | 0 to … |
| `wildLegends.scale` | number | 0 to … |
| `wildLegends.breathe` | number | 0 to … |
| `wildLegends.breathEvery` | number | 0 to … |
| `wildLegends.aura` | number | 0 to … |
| `wildLegends.glow` | number | 0 to … |
| `wildLegends.seen.aura` | number | 0 to … |
| `wildLegends.seen.rim` | number | 0 to … |
| `wildLegends.seen.floor` | number | 0 to … |
| `wildLegends.seen.nap` | boolean |  |
| `wildLegends.seen.steps` | number | 0 to … |
| `wildLegends.seen.dark` | number | 0 to … |
| `wildLegends.seen.liftMax` | number | 0 to … |

### `legendSpeed`

| knob | type | range |
|---|---|---|
| `legendSpeed` | number | 0 to … |

## Party

The party: the beat, waves, soundsystems, the dancefloor, its lights and objects, the party witches, the ley lines, music and sound, and the end.

### `cast`

The runestone stacks and the soundsystem spell: she converts a stone by holding the sigil button at it.

1. Ed, 2026-10-28: "It's a spell that you're choosing to cast on this stone, rather than a property of the area/stone itself." (every wild creature's sigil in its stone's stack (friends above enemies); no auto-clearing; the spell or a wave converts the stone, its friend sigils scattering round it for anyone to pick up)
Code: `src/rules/stoneStacks.ts`

- **`cast.on`**: on (the default since their view landed, #1378): the stacks and the spell; off (?cast=0): areas clear by themselves once their wild are gone, as before.
- **`cast.time`**: seconds of holding the sigil button at a stone to convert it; a hit stops the cast.
- **`cast.drain`**: how much of a full cast her progress on a stone loses a second while she isn't casting it (holding again resumes from there).
- **`cast.radius`**: how near the stone (m) she has to stand to cast; there the sigil button casts rather than putting down or picking up.
- **`cast.show`**: how near the stone (m) the spell's music-note sigil shows.
- **`cast.scatter`**: where a converted stone's friend sigils scatter: free hex cells of its clearing between min and reach metres, never in the hidden wedge just north of the soundsystem (hide.width either side, hide.depth behind).
  Ed, 2026-10-28: "It's fine if they're scattered around the whole runestone clearing"; "they also shouldn't fall immediately behind the soundsystem where they could be hidden". Open ground first (a tree's chance there at most open times the forest's density), in a seeded order so they spread however many there are; the wedge is where the soundsystem's sprite hides the ground from the camera, which looks north.

| knob | type | range |
|---|---|---|
| `cast.on` | boolean |  |
| `cast.time` | number | 0 to … |
| `cast.drain` | number | 0 to … |
| `cast.spot` | number | 0 to … |
| `cast.radius` | number | 0 to … |
| `cast.show` | number | 0 to … |
| `cast.scatter.min` | number | 0 to … |
| `cast.scatter.reach` | number | 0 to … |
| `cast.scatter.open` | number | 0 to … |
| `cast.scatter.hide.width` | number | 0 to … |
| `cast.scatter.hide.depth` | number | 0 to … |

### `beat`

The party's tempo in beats per minute, which the lasers sweep to and party animals dance to.

The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.

| knob | type | range |
|---|---|---|
| `beat.bpm` | number | 0 to … |
| `beat.knockBeats` | number | 0 to … |

### `leyLines`

The glowing line on the ground that joins the runestones in the order the waves wake them, a pulse flowing along it to the next one.

1. Ed, 2026-10-04
2. 2026-10-05: "you just follow them from objective to objective"
3. 2026-10-06: "I think the leylines should cover the entire set of waves the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"
4. Ed: "the leyline and pulse are not pixelated. Lighting effects can be non-pixel but they should be lighting objects that are pixels"
5. "the leyline is too faint"
6. Ed, 2026-10-06: "The leyline should always go from the treehouse to 3x the progress of the pulse, and I should be able to see it along its entire length"
The pause page's Waves slider sets it live, 0 to 6, remembered on this browser (config/decisions/953-waves.json, app/settings.ts); ?pulse=<m/s> or ?pulse=off sets it from a link, over the saved one. The ley lines [1][2][3]: a glowing line through every wave's runestone in the order the waves wake them, home first, the whole route the whole time (party.picker route keeps it from crossing itself): the sections ahead of the last stone reached each fade times as bright as the one before, the one just left behind behindBright times as bright as the next and each before it fade times that, none fainter than far[0] ahead or far[1] behind (as shares). Each wanders along the low ground between its stones, straying up to valley of its length (80 m at most) to follow the hills' valleys, and a shimmer flows along it toward the next stone at flow[0] m/s, flow[1] m apart. It stays on the ground in both modes (Ed): width metres across on the ground and over the treetops (wider there, with a faint glow through the crowns), height metres over the ground in each. Round 14 [4][5]: on the ground the line is pixels, a hard core core[0] metres each side of its middle (core[1] over the treetops) in whole art pixels, a half-bright rim core[2] (core[3]) round it, its brightness worked out per art pixel along it in flat quarter steps, the pulse's head and the growing tip stepped the same way; round it the smooth glow it casts, over width; from the treetops the glow through the crowns stays smooth. brightness 0.3 -> 0.4, width [2, 4.5] -> [3, 5.5]. ?ley=0 turns them off. Its whole length [6]: fade, behindBright and far all 1, so every section is as bright as the next; unbroken into and out of each stone; laid on the ground every 2 m so it never sinks into a crest; shown through the trees (never through a hill, the witch or a creature) at the same brightness; the current link as bright as the rest, the pulse only adding its head and arrival flash.
Code: `config/decisions/953-waves.json`, `app/settings.ts`

- **`leyLines.pulseSpeed`**: How fast the pulse runs along the ley line, which sets how long each wave takes to arrive.
  1. Ed, 2026-10-09: "Pure constant speed"
  2. Ed, 2026-10-18: "Default starting wave speed is 1m/s" (1; 4 before)
  the pulse's speed along the route's own curves, metres a second [2], times the party's tempo (a knockdown's BPM speeds it); a wave lands as it reaches the next stone, so a wave's gap is its link's length over the speed; 0 holds the pulse where it is (no waves). The boot has its own speed (boot.speed).
- **`leyLines.reveal`**: How fast the ley line grows out from the treehouse ahead of the waves, so no stone pops on at once.
  1. Ed, 2026-10-06: "The pulse starts from the treehouse at the start of the first wave. before that, during boot up phase, there's no leyline ... Then the leyline appears, starting at the treehouse, moving three times (adjustable) the speed on the pulse (so it reaches runestone 3 by the time the first wave finishes)"
  from the end of home's boot the line grows out from the treehouse along the route at this many links a wave (this many times the pulse's speed), a soft glow at its tip, reaching this stone as the first wave lands and going on at that pace until the whole route is drawn (so no stone pops on at once; rules/leypulse.ts leyReachTimes gives when it reaches each, for the beacons); none at all while home boots up. The pulse itself (render/leylines.ts) runs along the link from the last stone reached by the wave countdown's share (rules/leypulse.ts, as the HUD's wave pointer), the stretch behind it brighter, the whole link brightening toward the wave. The boot (rules/bootRing.ts): the party spell sends the pulse from the treehouse round the home ring clockwise from the top, turning each stone into its speaker, the line drawn ahead of it at reveal times its pace. ?ley=0 turns them off.
  Code: `rules/leypulse.ts`, `render/leylines.ts`, `rules/bootRing.ts`
- **`leyLines.advance`**: Whether the ley line moves on to the next stone only when its wave arrives, or as soon as that area's quest is done.
  1. Ed, 2026-10-08: "The pulse should never skip, it always travels along the route at the bpm speed. The line front also never skips, but travels along the route at three times the bpm speed"
  "first" moves it on when the next area's quest is done or its wave arrives, whichever comes first; "wave" only when its wave arrives. "wave" (the default) keeps the line, its pulse and its front to the waves, a quest done leaving its stone where it is on the route; "first" moves the line on to a stone as soon as its quest is done, as before (the pulse jumping to it).
- **`leyLines.brightness`**: How bright the ley line glows, each stretch shading from one area's colour to the next.
  1. Ed, 2026-10-05: "about 30% as bright" (0.3)
  how bright, a share of their first look [1], the glow through the crowns too. Each fades from the colour of the area it starts in to that of the area it ends in (the colour partified areas and soundsystems use).
- **`leyLines.depart`**: How the first stretch of ley line leaves the treehouse, curving round the ring of speakers rather than crossing the dancefloor.
  1. Ed, 2026-10-06: "The leyline shouldn't cross the dancefloor. After going around the speaker circle it should go off to the right and loop around to whatever direction it needs to go" (it ran due south across the floor before)
  the first line leaves the treehouse's front round the ring of speakers, avoid metres outside it, on the first objective's side (clockwise on the screen and off to the right, the spiral starting east of home; the other way round for one west of it), then off the ring and looping round the same way out to the first objective; no link of the route passes over the dancefloor.

| knob | type | range |
|---|---|---|
| `leyLines.on` | boolean |  |
| `leyLines.pulseSpeed` | number | 0 to … |
| `leyLines.reveal` | number | 0 to … |
| `leyLines.far` | array of number |  |
| `leyLines.behindBright` | number | 0 to … |
| `leyLines.advance` | string |  |
| `leyLines.fade` | number | 0 to … |
| `leyLines.brightness` | number | 0 to … |
| `leyLines.width` | array of number |  |
| `leyLines.core` | array of number |  |
| `leyLines.height` | array of number |  |
| `leyLines.valley` | number | 0 to … |
| `leyLines.flow` | array of number |  |
| `leyLines.depart.avoid` | number | 0 to … |
| `leyLines.minRadius` | number | 0 to … |
| `leyLines.rainbow.on` | boolean |  |
| `leyLines.rainbow.speed` | number | 0 to … |
| `leyLines.rainbow.linger` | number | 0 to … |
| `leyLines.rainbow.max` | number | 0 to … |
| `leyLines.rainbow.bars` | number | 0 to … |
| `leyLines.rainbow.spacing` | number | 0 to … |
| `leyLines.rainbow.cell` | number | 0 to … |
| `leyLines.rainbow.height` | number | 0 to … |

### `partyObjects`

The party clutter that appears as an area is partified: litter, lights, balloons, lanterns in the trees and set dressing, and home's own.

1. Ed, 2026-10-04: art/party.js
2. Ed, 2026-10-05: "It has party decorations instead of trees; ... scattered around the whole home area, excluding the dancefloor"
Party objects [1]: each partified area gets clusters [min, max] of the art's clusters, loose [min, max] loose pieces (litter, small lights, balloons; neon and balloon colours random per placement), set dressing at setChance, and at caughtChance an escaped balloon caught in a tree; hanging [min, max] lanterns, jars, fairy lights or mirror balls hung from branches in nearby crowns. They appear as the party arrives. Real point lights only from campfires and lanterns (lanternReach metres, warm), at most lightsPerArea an area; everything else glows without lighting. Home [2]: its meadow strewn all over with home.loose [min, max] pieces picked by class (home.weights: the home set, small lights, balloons, litter, furniture, set dressing; nothing that hangs, as home has no trees) at least home.gap metres apart, and home.clusters [min, max] clusters (the home ones, home-path and home-corner, among the rest), out to home.reach of an area past its circle, off the dancefloor's clearing, the paths, the treehouse and her seat; an arch piece over each path where it leaves the floor's clearing; at most home.lights real lights.
Code: `art/party.js`

- **`partyObjects.exclude`**: pieces never placed, loose or in clusters [1].
  1. Ed's scenery review, 2026-10-19: Ed, v271: the glowing LED cube looked too much like a game object; empty since the cube itself was cut from the game with nine others in
- **`partyObjects.generated`**: the prop generator's seeded bunting, balloon bunches and paper lanterns (art/party.js gen-*) in place of the hand-made ones they replace (the game turns it on: app/viewParams.ts).
  Code: `art/party.js`, `app/viewParams.ts`

| knob | type | range |
|---|---|---|
| `partyObjects.on` | boolean |  |
| `partyObjects.clusters` | array of number |  |
| `partyObjects.loose` | array of number |  |
| `partyObjects.setChance` | number | 0 to … |
| `partyObjects.caughtChance` | number | 0 to … |
| `partyObjects.hanging` | array of number |  |
| `partyObjects.lightsPerArea` | number | 0 to … |
| `partyObjects.lanternReach` | number | 0 to … |
| `partyObjects.arch` | string |  |
| `partyObjects.home.clusters` | array of number |  |
| `partyObjects.home.loose` | array of number |  |
| `partyObjects.home.weights` | record |  |
| `partyObjects.home.gap` | number | 0 to … |
| `partyObjects.home.reach` | number | 0 to … |
| `partyObjects.home.lights` | number | 0 to … |
| `partyObjects.exclude` | array of string |  |
| `partyObjects.generated` | boolean |  |

### `partyWitches`

Other witches who fly in to dance, drink, chat and swoop around the dancefloor, one per playing soundsystem.

1. Ed, 2026-10-04
2. 2026-10-06: "Party witches should wander within 40m of the centre of the dancefloor, but mildly prefer being closer to the centre. They don't drink, rest, chat, or hold hands on the dancefloor. They have a new move, \" … ", which is rising to treetop and coming down again. They do this more when you're in treetop mode (so you can see the party from afar). I think the number of party witches should be unlimited." (and: swoop\)
3. Ed, 2026-10-06: "random heights, taller and shorter than normal treetop"
4. Ed: "it only needs to be animated when you are near it"
Party witches [1][2]: one per playing soundsystem (not the dancefloor's), however many, flying in from its side (from flyFrom metres out, at flyHeight, over arriveTime seconds) to land within roam metres of the dancefloor's middle (each new spot at roam × u^centreBias from it: the mean roam / (1 + centreBias), so the floor stays busiest), clear of trees, the speakers and the treehouse, and off again if it stops. Drinking, resting, chatting and holding hands happen only off the floor (on it she runs off first). A swoop (weight swoop; times treetopBoost while a player is over the treetops) rises to swoopHeight (the treetops) times a random swoopMin to swoopMax [3] and back down over swoopTime seconds. Only visual [4]: stepped only while a player is within simRange metres of the floor (simRangeTreetop over the treetops, so the swoops show from afar); out of range they stand as they were, and coming back each picks something new at once.

- **`partyWitches.gaze`**: Beds out past the speakers where party witches lie stargazing, which she can join.
  1. Ed, 2026-10-11: "when a soundsystem is destroyed its party witch doesn't leave; she leaves the dancefloor and lies down to stargaze ... outside the speaker ring, in pairs and threes where possible. At the end of the night everyone lies there looking up. She can interact with them like the beach witches"
  stargazing [1]: beds from to to metres out past the speakers' ring, places side by side one behind another gap metres apart (lying along x, length metres long), each stagger metres along from the last, threes that share of beds (the rest pairs), apart metres between beds; a player keeping still within meet metres of one has the beach's turns with her (a chat, holding hands, a hug, lying side by side), turn seconds each.

| knob | type | range |
|---|---|---|
| `partyWitches.roam` | number | 0 to … |
| `partyWitches.centreBias` | number | 0 to … |
| `partyWitches.swoopTime` | number | 0 to … |
| `partyWitches.swoopHeight` | number | 0 to … |
| `partyWitches.swoopMin` | number | 0 to … |
| `partyWitches.swoopMax` | number | 0 to … |
| `partyWitches.treetopBoost` | number | 0 to … |
| `partyWitches.simRange` | number | 0 to … |
| `partyWitches.simRangeTreetop` | number | 0 to … |
| `partyWitches.idleAfter` | number | 0 to … |
| `partyWitches.idleReach` | number | 0 to … |
| `partyWitches.activityMin` | number | 0 to … |
| `partyWitches.activityMax` | number | 0 to … |
| `partyWitches.weights` | record |  |
| `partyWitches.arriveTime` | number | 0 to … |
| `partyWitches.flyFrom` | number | 0 to … |
| `partyWitches.flyHeight` | number | 0 to … |
| `partyWitches.runSpeed` | number | 0 to … |
| `partyWitches.walkSpeed` | number | 0 to … |
| `partyWitches.lapSpeed` | number | 0 to … |
| `partyWitches.pairRange` | number | 0 to … |
| `partyWitches.pairGap` | number | 0 to … |
| `partyWitches.limboPass` | number | 0 to … |
| `partyWitches.floorShare` | number | 0 to … |
| `partyWitches.debugExtra` | number | 0 to … |
| `partyWitches.gaze.from` | number | 0 to … |
| `partyWitches.gaze.to` | number | 0 to … |
| `partyWitches.gaze.gap` | number | 0 to … |
| `partyWitches.gaze.stagger` | number | 0 to … |
| `partyWitches.gaze.length` | number | 0 to … |
| `partyWitches.gaze.threes` | number | 0 to … |
| `partyWitches.gaze.apart` | number | 0 to … |
| `partyWitches.gaze.meet` | number | 0 to … |
| `partyWitches.gaze.turn` | number | 0 to … |

### `speakerLasers`

A single laser beam swinging up from each speaker in the dancefloor's ring.

1. Ed, 2026-10-04: none from the disco ball; one on top of each ring speaker
The dancefloor ring's lasers [1]: a single beam from each playing speaker, at most tilt degrees off straight up and leaning outwards, swinging sweep degrees sideways, over sweepBeats beats, neighbours out of phase; length metres, at opacity (thinner-looking than the area soundsystems' fans). Damaged speakers flicker theirs; destroyed ones have none. 12 more beams on top of the lasers' own.

| knob | type | range |
|---|---|---|
| `speakerLasers.on` | boolean |  |
| `speakerLasers.tilt` | number | 0 to … |
| `speakerLasers.sweep` | number | 0 to … |
| `speakerLasers.sweepBeats` | number | 0 to … |
| `speakerLasers.length` | number | 0 to … |
| `speakerLasers.opacity` | number | 0 to … |

### `lasers`

Each playing soundsystem's laser show, its beams fanning and sweeping in time with the music.

Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.

| knob | type | range |
|---|---|---|
| `lasers.on` | boolean |  |
| `lasers.maxCount` | number | 0 to … |
| `lasers.length` | number | 0 to … |
| `lasers.spread` | number | 0 to … |
| `lasers.maxTilt` | number | 0 to … |
| `lasers.sweep` | number | 0 to … |
| `lasers.sweepBeats` | number | 0 to … |
| `lasers.openBars` | number | 0 to … |
| `lasers.opacity` | number | 0 to … |
| `lasers.duty` | number | 0 to … |
| `lasers.blockBars` | number | 0 to … |
| `lasers.fadeIn` | number | 0 to … |
| `lasers.fadeOut` | number | 0 to … |
| `lasers.fadeNear` | number | 0 to … |
| `lasers.fadeFar` | number | 0 to … |

### `borders`

A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).

- **`borders.on`**: off by default [1][2].
  1. Ed, 2026-10-13: the glowing dotted edges gone
  2. "Area edges" (the pause page's brings them back to compare)
- **`borders.twinkle`**: How the sparks along a partified area's border twinkle, flicker and swap colours with the area next door.
  (0 a gentle breathing, 1 star-like: brief flashes and dips, now and then a spark out for a moment); each spark flickers between its own area's colour and the one across the edge (Ed, v183), swapRate times a second on its own phase, and swapBeat of them snap on the beat instead. ?border=<twinkle>,<swapRate>,<swapBeat> tries values.

| knob | type | range |
|---|---|---|
| `borders.on` | boolean |  |
| `borders.width` | number | 0 to … |
| `borders.brightness` | number | 0 to … |
| `borders.sparkle` | number | 0 to … |
| `borders.step` | number | 0 to … |
| `borders.twinkle` | number | 0 to … |
| `borders.swapRate` | number | 0 to … |
| `borders.swapBeat` | number | 0 to … |

### `bubbles`

The speech and thought bubbles: outline only, with pixel emoji, sized by the speaker's level.

1. Ed, 2026-10-12: "dream bubbles should also grow"
The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble). One bubble style for every speaker (render/bubbles.ts): the 💌 replies, the witches' chat, and the thought bubbles too [1]: a legend's dream, the night won's island dreams and the sleepers' 😴s, cloud and symbol together, by their creature's level.
Code: `render/bubbles.ts`

- **`bubbles.levelScale`**: a creature's bubble, emoji and outline together, times this by its level (baby, young, adult, legend); the witch's stays at 1.
  1. Ed, 2026-10-05: "the speech bubbles should scale with the level of the animal, with the legends as the largest"
- **`bubbles.near`, `bubbles.fade`, `bubbles.ease`**: How close (metres) she must be on the ground to see a creature's speech or thought bubble; none from the treetops or the treehouse.
  1. Ed, 2026-10-28: "Animal speech bubbles / thought bubbles should fade into view when the witch gets close. I shouldn't see them on the ground when I'm at the treetops. I shouldn't see them on the ground when I'm in the treehouse."
  Whole within near less fade, fading to nothing at near; eased in and out over ease seconds, so rising, landing and going indoors fade them. 38 and 8 to start: whole to 30 m, about the letters' reach (invites.range 33), so any creature she can throw at answers where she can read it, and gone by 38. The 💌 replies, the talk and the sleepers' 😴s go by it; a legend's dream (dreams.range) and the night won's island dreams (twice that) keep their own ranges, fading at their edge and hidden from the treetops and the treehouse the same.
  Code: `render/bubbleSight.ts`

| knob | type | range |
|---|---|---|
| `bubbles.emojiPixels` | number | 0 to … |
| `bubbles.scale` | number | 0 to … |
| `bubbles.levelScale` | array of number |  |
| `bubbles.near` | number | 0 to … |
| `bubbles.fade` | number | 0 to … |
| `bubbles.ease` | number | 0 to … |

### `runeMarkers`

The rune stones marking where soundsystems will come, glowing, and pulsing on the beat when the next wave is coming to them.

1. Ed: "let's see both" (v149)
Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives. An awake stone shows both [1]: a column of light above the canopy and a thin laser straight up like the disco ball's (laser opacity, width and length in metres; glow only, no light).

- **`runeMarkers.variants`**: Each area's rune stone is one of twenty carved forms, all used before any repeats.
  1. Ed, 2026-10-12: "20 mild variations on runestones so that they don't all look identical. They can also be flipped"
  each area's stone one of the art's 20 seeded forms, dealt like a shuffled deck so every form is used before any repeats (Ed, #716; rules/runestones.ts) (height, lean, worn top, chips, cracks, moss, the carving's place and wear, the stones and grass at its foot), mirrored at random, its sigil never mirror-written; off, every stone as before.
  Code: `rules/runestones.ts`
- **`runeMarkers.beamHeight`**: the beacon's height (metres).
- **`runeMarkers.lightRange`**: stones within this many metres light the scene.
- **`runeMarkers.awake.moteSize`**: The motes rising off an awake runestone: their size in the picture's pixels (render/markers.ts).
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))
- **`runeMarkers.awake.moteBright`**: The motes rising off an awake runestone: their brightness, times its colour.
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))
- **`runeMarkers.awake.moteRise`**: How high (m) an awake runestone's motes rise before they fade.
  1. the coordinator, 2026-10-29: "Given current settings, the motes from sigils don't do much" (Ed, relayed; the art director's motes pass, #1398 (tools/shot/motes.cjs measures them))

| knob | type | range |
|---|---|---|
| `runeMarkers.variants` | boolean |  |
| `runeMarkers.laser.opacity` | number | 0 to … |
| `runeMarkers.laser.width` | number | 0 to … |
| `runeMarkers.laser.length` | number | 0 to … |
| `runeMarkers.scale` | number | 0 to … |
| `runeMarkers.beamHeight` | number | 0 to … |
| `runeMarkers.lightRange` | number | 0 to … |
| `runeMarkers.dormant.glow` | number | 0 to … |
| `runeMarkers.dormant.light` | number | 0 to … |
| `runeMarkers.dormant.reach` | number | 0 to … |
| `runeMarkers.dormant.beam` | number | 0 to … |
| `runeMarkers.awake.glow` | array of number |  |
| `runeMarkers.awake.light` | number | 0 to … |
| `runeMarkers.awake.lightBuild` | number | 0 to … |
| `runeMarkers.awake.reach` | number | 0 to … |
| `runeMarkers.awake.beam` | number | 0 to … |
| `runeMarkers.awake.motes` | number | 0 to … |
| `runeMarkers.awake.moteBuild` | number | 0 to … |
| `runeMarkers.awake.moteSize` | number | 0 to … |
| `runeMarkers.awake.moteBright` | number | 0 to … |
| `runeMarkers.awake.moteRise` | number | 0 to … |
| `runeMarkers.flare.time` | number | 0 to … |
| `runeMarkers.flare.light` | number | 0 to … |
| `runeMarkers.stump.on` | boolean |  |
| `runeMarkers.stump.variants` | number | 0 to … |
| `runeMarkers.stump.clear` | number | 0 to … |
| `runeMarkers.stump.stack` | number | 0 to … |
| `runeMarkers.stump.ring.inner` | number | 0 to … |
| `runeMarkers.stump.ring.fill` | number | 0 to … |
| `runeMarkers.stump.ring.cell` | number | 0 to … |
| `runeMarkers.stump.ring.glow` | number | 0 to … |
| `runeMarkers.stump.ring.light.reach` | number | 0 to … |
| `runeMarkers.stump.ring.light.strength` | number | 0 to … |
| `runeMarkers.stump.ring.light.height` | number | 0 to … |
| `runeMarkers.stump.ring.wave.hold` | number | 0 to … |
| `runeMarkers.stump.ring.wave.fade` | number | 0 to … |
| `runeMarkers.stump.light.reach` | number | 0 to … |
| `runeMarkers.stump.light.strength` | number | 0 to … |
| `runeMarkers.stump.light.height` | number | 0 to … |
| `runeMarkers.stump.light.saturate` | number | 0 to … |

### `sfx`

The sound effects, all synthesised in the music's key [1]: volume over the music's, hear metres (a sound fades to nothing that far from her).

1. 2026-10-05

- **`sfx.budget.voices`**: the most one-shot sounds at once (0: no limit); over it, those that matter least (far creatures, the beds' scattered details) aren't played and lesser ones playing are cut short for her own sounds and the stings [1].
  1. Ed's playtest, 2026-10-12: "the sound is cutting out ... too many simultaneous sounds"
- **`sfx.voice`**: the babble [1].
  1. Ed, 2026-10-05: 💌s are her speech, attacks the animals'
- **`sfx.voice.witch`**: each 💌 a syllable in her voice (pitch Hz, range: how far her phrases rise and fall, pace: a syllable's seconds, timbre: her formants over an adult's, phraseGap: a pause this long starts a new phrase).
- **`sfx.voice.animals`**: Creatures babble in their own voice when they attack, a few at a time.
  an attack a burst of babble in the creature's own voice (pitch Hz for a normal-sized young, lower by level and size; maxVoices at once, the farthest giving way (only to one swapBy nearer, at most one every swapGap seconds: a crowd otherwise cut itself off many times a second), duck: how much the others quieten; syllables per burst; gap: a creature speaks at most every gap seconds; reply: a 💌 hit's answering syllable, its volume share).
- **`sfx.hit`**: a 💌 landing (a spent one a faint tick).
- **`sfx.fill`**: the affection tick, climbing octaves as the meter fills.
- **`sfx.invited`**: the flourish (fuller by level).
- **`sfx.enraged`**: the growl when one turns (gap: at most one every gap seconds, a crowd turning at once one heavier growl).
- **`sfx.happy`**: the pop.
- **`sfx.snore`**: a sleeping legend within range metres moaning softly in its dreams (volume).
- **`sfx.nightmare`**: its moans when restless (volume).
- **`sfx.windup`**: a legend's attack winding up, its whale song swelling for length seconds before it fires.
- **`sfx.lost`**: a soundsystem lost, the sting heard anywhere (volume).
- **`sfx.ouch`**: the witch hurt, her cry and a thump (volume; knocked down, her "whoa-oh" at knockdown times that), the music dipped by duck for duckTime seconds (twice that knocked down).
- **`sfx.impact`**: a lobbed shot landing, a thud (small times volume) or a legend's boom (volume), heard from the lob's landing spot (a legend's twice as far).
- **`sfx.roar`**: a legend turning angry, its roar (heard twice as far).
- **`sfx.power`**: The crackle, whine and thump of a runestone turning into a speaker or soundsystem, each a step up the scale.
  1. Ed, 2026-10-06
  a runestone crackling into life as a speaker or soundsystem [1], heard within range metres: its static (crackle), a capacitor's whine, the mains buzz, the cone's thump and the clean tone it settles into, each the home ring's next step up the scale, the last a chord; at most one every gap seconds (volume).
- **`sfx.lament`**: A restless legend's sad call, heard from the way of its clearing, more often as its restlessness runs out.
  1. Ed, 2026-10-06
  a restless legend calling out sadly [1], its own call lowered (pitch) and slowed (slow) into the legends' space, heard within range metres from the way of its clearing and muffled with distance; a call about every every seconds, down to urgent as its restlessness runs out; at most max restless legends call, the nearest, at least gap seconds apart (volume).
- **`sfx.shoes`**: dancers within range metres tapping their party shoes on the beat, at most max at once.
- **`sfx.pond`**: by a pond within range metres, water lapping (lap), a frog every frogEvery seconds or so (frogs), a drip every dripEvery (drips).
- **`sfx.picnic`**: by a picnic in a partified area within range metres, its party-goers' murmur and cups clinking every clinkEvery seconds or so.
- **`sfx.aggro`**: The wild watch's warning sound: a low swell and a riser while creatures stare at her, and a hit as they attack.
  1. Ed, 2026-10-07: art builder 3's aggroOf
  the wild watch's warning [1], while a wild area's watchers stand looking at her before they attack: a low swell in the music's key (swell) opening up and throbbing faster as the watch runs, a gritty riser over it (riser) by the area's danger, a hit as they attack (hit); called off, it sags and falls away over fall seconds; times volume.
- **`sfx.sparkler`**: by the ley line's pulse, its tip a burning sparkler (art builder 2's #491), its fizz within range metres (louder as she nears it): a flickering hiss (hiss) and a crackle of pops (pops), rate sparks a second, a share fork of them forking into a double tick, times volume.
- **`sfx.fireworks`**: The fireworks' whoosh, boom and crackle, and the crowd's cheer at the finale.
  over a soundsystem when a wave reaches an area she'd already cleared (Hotel's waveCelebrate, art builder 2's shells): each shell's climb (whoosh, now and then whistling), its burst (boom, its echo into the night echo, its stars' crackle), heard within range metres and late by the distance over speed metres a second, and the party under it cheering as the finale bursts (cheer) within cheerRange; the shells are rules/fireworks.ts's, the ones drawn, times volume.
  Code: `rules/fireworks.ts`
- **`sfx.seaLife`**: what lives in the sea off the beach [1], heard within range metres of it, under the music and the waves: a dolphin leaping off the east coast (splash: its blow and its splash back in), the kraken off the west coast (groan: a deep distant moan.
  1. Ed, 2026-10-07
- **`sfx.room`**: the creator's room in the treehouse while it's open, its hum, a record's crackle, the timber creaking every creakEvery seconds or so, and after the spell, at her decks before the first home speaker, at decks times its level.
- **`sfx.deck`**: The sounds of her decks while she DJs: record scratches, her "woo-hoo!" and the needle dropping.
  1. Ed, 2026-10-07: the needle dropped and a little scratching
  her decks while she stands behind them (the DJ witch): a stroke of the record on each half-beat of her scratch bars (scratch, its hiss under the stylus hiss, a stroke stroke seconds long) and her "woo-hoo!" when she throws a hand up (hype), and in her routine [1] the tonearm's tick and the needle's drop (needle), times volume.
- **`sfx.land`**: a 💌 that met no one landing on the ground, a soft puff (at most one every gap seconds).
- **`sfx.thunk`**: a 💌 landing on a creature, a soft thunk at volume (at most one every gap seconds), its pitch climbing from low to high semitones off the key as the ring fills.
  1. Ed, 2026-10-29: "invitation impacts feel unsatisfying" (full hit feedback for a 💌 landing on a creature: a white flash, a little squash, its ring slot popping in, a thunk rising as the ring fills, a hitstop on the 💌 that fills it; no flash and a gentler squash with reduce-flashing on)
  Code: `src/platform/audio/chimes.ts`
- **`sfx.nope`**: a soft two-note "uh-uh" at volume, at most one each gap seconds.
  1. Ed, 2026-10-07: a sigil refused, put down too near one already down, now heard and not drawn
- **`sfx.alarm`**: her phone ringing in the dark, a run of six bright plucks at volume, rung again every gap seconds while it rings.
  1. Ed, 2026-10-20: "a plain modern phone alarm, for the joke" (the new opening's wake-up)
- **`sfx.cleared`**: a small "cleared!" sting on the next half-beat, at volume, from the new soundsystem, fading over range metres to no less than floor of itself (she cleared it: she hears it).
  1. Ed, 2026-10-08: an area cleared before the pulse came
- **`sfx.tempoUp`**: the crowd cheering on the beat the party starts speeding up, at volume (a share of the fireworks' cheer; 0 off).
  1. Ed, 2026-10-07: the BPM up by 1 each knockdown
- **`sfx.stir`**: the boot-up over, the first wave's countdown begun, things stirring (volume).
- **`sfx.knock`**: the witch knocked back (#108), a thump and a whoosh by how far (volume, whoosh), and stunned, a soft dizzy twinkle every twinkleEvery seconds (twinkle).
- **`sfx.charge`**: a legend's long charge, its windup's bellow, heavy hoofbeats by its speed, the ground's rumble along its lane, the skid of its braking arc, a lighter trot home, heard within range metres.
- **`sfx.relic`**: a relic bottle found (a rare chime), spotted within spot metres on the ground or spotTreetop from the treetops, or reached within reach.
- **`sfx.meadow`**: Home's ambience: breeze, bees, birdsong, a picnic's murmur, clinking cups and squeaking balloons.
  home's ambience (breeze, bees, birds, a bird's song about every birdEvery seconds; its picnic's far murmur, its cups clinking about every clinkEvery seconds (clinks), its balloons squeaking about every squeakEvery (balloons)), in home's circle (the map's homeRadius round the dancefloor) fading out over its last fade metres.
- **`sfx.whale`**: the legends' voice [1]: volume, speed (1: moans of 2 to 3 s; 2: twice as fast), depth (Hz of its lowest moan), reverb (how big its space), sleepEvery (seconds between a sleeper's moans, sooner when restless).
  1. Ed, 2026-10-05: "whale song; deep and slow"
- **`sfx.sail`**: sailing between islands in place (app/sail.ts), the sea's hush and waves (sea, a share) and a soft gusting wind (wind) at volume while the next island is made, fading in and out over about fade seconds, the old night's music fading out over fade seconds as it comes in.
  Code: `app/sail.ts`
- **`sfx.ambience`**: each area's own soundscape in play [1], the afterparty night's layers without their pad and bells (bed 0), its noise and sounds at noise and sounds, times volume; near the party it keeps only quiet of itself, by how loud the music is there, and gives way to the night once the party's over.
  1. Ed, 2026-10-07: "Each area gets its own ambient soundscape that gives it individual character" (a ravine's gusts, a marsh's frogs and drips, standing stones' low hum, old oaks creaking)
- **`sfx.sadTrumpet`**: The sad trumpet when she's knocked down, and the backwards record scratch as she's whisked back to her decks.
  1. Ed, 2026-10-07: "a sad trumpet sound"
  2. Ed, 2026-10-07: the teleport's midpoint, the knockout's cut; the hat's scene turns into her decks with a rewind
  knocked down, a muted trumpet's "wah-wah-wah-waaah" as her hat drops [1], the music dipped by duck under it; knocked down with no hat to drop, its shorter "wah-waaah" if bare is 1 (0: none); and as she's whisked to her decks [2] a backwards record scratch (rewind, times volume) cuts its last note off, never before that note has had cutAfter seconds.

| knob | type | range |
|---|---|---|
| `sfx.on` | boolean |  |
| `sfx.volume` | number | 0 to … |
| `sfx.hear` | number | 0 to … |
| `sfx.budget.voices` | number | 0 to … |
| `sfx.voice.witch.volume` | number | 0 to … |
| `sfx.voice.witch.pitch` | number | 0 to … |
| `sfx.voice.witch.range` | number | 0 to … |
| `sfx.voice.witch.pace` | number | 0 to … |
| `sfx.voice.witch.timbre` | number | 0 to … |
| `sfx.voice.witch.phraseGap` | number | 0 to … |
| `sfx.voice.animals.volume` | number | 0 to … |
| `sfx.voice.animals.pitch` | number | 0 to … |
| `sfx.voice.animals.maxVoices` | number | 0 to … |
| `sfx.voice.animals.duck` | number | 0 to … |
| `sfx.voice.animals.syllables` | array of number |  |
| `sfx.voice.animals.gap` | number | 0 to … |
| `sfx.voice.animals.reply` | number | 0 to … |
| `sfx.voice.animals.swapBy` | number | 0 to … |
| `sfx.voice.animals.swapGap` | number | 0 to … |
| `sfx.hit.volume` | number | 0 to … |
| `sfx.hit.gap` | number | 0 to … |
| `sfx.fill.volume` | number | 0 to … |
| `sfx.fill.octaves` | number | 0 to … |
| `sfx.invited.volume` | number | 0 to … |
| `sfx.enraged.volume` | number | 0 to … |
| `sfx.enraged.gap` | number | 0 to … |
| `sfx.happy.volume` | number | 0 to … |
| `sfx.happy.gap` | number | 0 to … |
| `sfx.snore.volume` | number | 0 to … |
| `sfx.snore.range` | number | 0 to … |
| `sfx.nightmare.volume` | number | 0 to … |
| `sfx.windup.volume` | number | 0 to … |
| `sfx.windup.length` | number | 0 to … |
| `sfx.lost.volume` | number | 0 to … |
| `sfx.ouch.volume` | number | 0 to … |
| `sfx.ouch.knockdown` | number | 0 to … |
| `sfx.ouch.duck` | number | 0 to … |
| `sfx.ouch.duckTime` | number | 0 to … |
| `sfx.impact.volume` | number | 0 to … |
| `sfx.impact.small` | number | 0 to … |
| `sfx.roar.volume` | number | 0 to … |
| `sfx.power.volume` | number | 0 to … |
| `sfx.power.crackle` | number | 0 to … |
| `sfx.power.whine` | number | 0 to … |
| `sfx.power.buzz` | number | 0 to … |
| `sfx.power.thump` | number | 0 to … |
| `sfx.power.tone` | number | 0 to … |
| `sfx.power.gap` | number | 0 to … |
| `sfx.power.range` | number | 0 to … |
| `sfx.lament.volume` | number | 0 to … |
| `sfx.lament.pitch` | number | 0 to … |
| `sfx.lament.slow` | number | 0 to … |
| `sfx.lament.every` | number | 0 to … |
| `sfx.lament.urgent` | number | 0 to … |
| `sfx.lament.range` | number | 0 to … |
| `sfx.lament.gap` | number | 0 to … |
| `sfx.lament.max` | number | 0 to … |
| `sfx.shoes.volume` | number | 0 to … |
| `sfx.shoes.range` | number | 0 to … |
| `sfx.shoes.max` | number | 0 to … |
| `sfx.pond.volume` | number | 0 to … |
| `sfx.pond.lap` | number | 0 to … |
| `sfx.pond.frogs` | number | 0 to … |
| `sfx.pond.frogEvery` | number | 0 to … |
| `sfx.pond.drips` | number | 0 to … |
| `sfx.pond.dripEvery` | number | 0 to … |
| `sfx.pond.range` | number | 0 to … |
| `sfx.picnic.volume` | number | 0 to … |
| `sfx.picnic.murmur` | number | 0 to … |
| `sfx.picnic.clinks` | number | 0 to … |
| `sfx.picnic.clinkEvery` | number | 0 to … |
| `sfx.picnic.range` | number | 0 to … |
| `sfx.aggro.volume` | number | 0 to … |
| `sfx.aggro.swell` | number | 0 to … |
| `sfx.aggro.riser` | number | 0 to … |
| `sfx.aggro.hit` | number | 0 to … |
| `sfx.aggro.fall` | number | 0 to … |
| `sfx.sparkler.volume` | number | 0 to … |
| `sfx.sparkler.hiss` | number | 0 to … |
| `sfx.sparkler.pops` | number | 0 to … |
| `sfx.sparkler.rate` | number | 0 to … |
| `sfx.sparkler.fork` | number | 0 to … |
| `sfx.sparkler.range` | number | 0 to … |
| `sfx.fireworks.volume` | number | 0 to … |
| `sfx.fireworks.whoosh` | number | 0 to … |
| `sfx.fireworks.boom` | number | 0 to … |
| `sfx.fireworks.echo` | number | 0 to … |
| `sfx.fireworks.crackle` | number | 0 to … |
| `sfx.fireworks.cheer` | number | 0 to … |
| `sfx.fireworks.range` | number | 0 to … |
| `sfx.fireworks.cheerRange` | number | 0 to … |
| `sfx.fireworks.speed` | number | 0 to … |
| `sfx.seaLife.volume` | number | 0 to … |
| `sfx.seaLife.splash` | number | 0 to … |
| `sfx.seaLife.groan` | number | 0 to … |
| `sfx.seaLife.pour` | number | 0 to … |
| `sfx.seaLife.range` | number | 0 to … |
| `sfx.room.volume` | number | 0 to … |
| `sfx.room.hum` | number | 0 to … |
| `sfx.room.crackle` | number | 0 to … |
| `sfx.room.creak` | number | 0 to … |
| `sfx.room.creakEvery` | number | 0 to … |
| `sfx.room.decks` | number | 0 to … |
| `sfx.deck.volume` | number | 0 to … |
| `sfx.deck.scratch` | number | 0 to … |
| `sfx.deck.hiss` | number | 0 to … |
| `sfx.deck.stroke` | number | 0 to … |
| `sfx.deck.hype` | number | 0 to … |
| `sfx.deck.needle` | number | 0 to … |
| `sfx.deck.knock` | number | 0 to … |
| `sfx.deck.respawn` | number | 0 to … |
| `sfx.spell.volume` | number | 0 to … |
| `sfx.spell.hum` | number | 0 to … |
| `sfx.spell.rustle` | number | 0 to … |
| `sfx.spell.crackle` | number | 0 to … |
| `sfx.spell.burst` | number | 0 to … |
| `sfx.land.volume` | number | 0 to … |
| `sfx.land.gap` | number | 0 to … |
| `sfx.thunk.volume` | number | 0 to … |
| `sfx.thunk.gap` | number | 0 to … |
| `sfx.thunk.low` | number |  |
| `sfx.thunk.high` | number | 0 to … |
| `sfx.nope.volume` | number | 0 to … |
| `sfx.nope.gap` | number | 0 to … |
| `sfx.thud.volume` | number | 0 to … |
| `sfx.thud.gap` | number | 0 to … |
| `sfx.alarm.volume` | number | 0 to … |
| `sfx.alarm.gap` | number | 0 to … |
| `sfx.refused.volume` | number | 0 to … |
| `sfx.refused.gap` | number | 0 to … |
| `sfx.cleared.volume` | number | 0 to … |
| `sfx.cleared.range` | number | 0 to … |
| `sfx.cleared.floor` | number | 0 to … |
| `sfx.tempoUp.volume` | number | 0 to … |
| `sfx.stir.volume` | number | 0 to … |
| `sfx.knock.volume` | number | 0 to … |
| `sfx.knock.whoosh` | number | 0 to … |
| `sfx.knock.twinkle` | number | 0 to … |
| `sfx.knock.twinkleEvery` | number | 0 to … |
| `sfx.charge.volume` | number | 0 to … |
| `sfx.charge.bellow` | number | 0 to … |
| `sfx.charge.hooves` | number | 0 to … |
| `sfx.charge.rumble` | number | 0 to … |
| `sfx.charge.skid` | number | 0 to … |
| `sfx.charge.trot` | number | 0 to … |
| `sfx.charge.range` | number | 0 to … |
| `sfx.relic.volume` | number | 0 to … |
| `sfx.relic.spot` | number | 0 to … |
| `sfx.relic.spotTreetop` | number | 0 to … |
| `sfx.relic.reach` | number | 0 to … |
| `sfx.meadow.volume` | number | 0 to … |
| `sfx.meadow.breeze` | number | 0 to … |
| `sfx.meadow.bees` | number | 0 to … |
| `sfx.meadow.birds` | number | 0 to … |
| `sfx.meadow.birdEvery` | number | 0 to … |
| `sfx.meadow.fade` | number | 0 to … |
| `sfx.meadow.murmur` | number | 0 to … |
| `sfx.meadow.clinks` | number | 0 to … |
| `sfx.meadow.clinkEvery` | number | 0 to … |
| `sfx.meadow.balloons` | number | 0 to … |
| `sfx.meadow.squeakEvery` | number | 0 to … |
| `sfx.whale.volume` | number | 0 to … |
| `sfx.whale.speed` | number | 0 to … |
| `sfx.whale.depth` | number | 0 to … |
| `sfx.whale.reverb` | number | 0 to … |
| `sfx.whale.sleepEvery` | number | 0 to … |
| `sfx.waves.volume` | number | 0 to … |
| `sfx.waves.every` | number | 0 to … |
| `sfx.waves.wash` | number | 0 to … |
| `sfx.waves.range` | number | 0 to … |
| `sfx.sail.volume` | number | 0 to … |
| `sfx.sail.sea` | number | 0 to … |
| `sfx.sail.wind` | number | 0 to … |
| `sfx.sail.fade` | number | 0 to … |
| `sfx.ambience.volume` | number | 0 to … |
| `sfx.ambience.bed` | number | 0 to … |
| `sfx.ambience.noise` | number | 0 to … |
| `sfx.ambience.sounds` | number | 0 to … |
| `sfx.ambience.quiet` | number | 0 to … |
| `sfx.sadTrumpet.volume` | number | 0 to … |
| `sfx.sadTrumpet.duck` | number | 0 to … |
| `sfx.sadTrumpet.bare` | number | 0 to … |
| `sfx.sadTrumpet.rewind` | number | 0 to … |
| `sfx.sadTrumpet.cutAfter` | number | 0 to … |
| `sfx.night.volume` | number | 0 to … |
| `sfx.night.bed` | number | 0 to … |
| `sfx.night.noise` | number | 0 to … |
| `sfx.night.sounds` | number | 0 to … |
| `sfx.night.from` | number | 0 to … |
| `sfx.night.snore.volume` | number | 0 to … |
| `sfx.night.snore.gap` | number | 0 to … |
| `sfx.night.snore.range` | number | 0 to … |
| `sfx.night.snore.max` | number | 0 to … |

### `music`

The music gets louder and clearer near a playing soundsystem and quieter and muffled far off, never silent.

1. Ed, 2026-10-04
2. Ed's playtest, 2026-10-05: "The music stops playing after about 20 seconds" (at 0.08 and 380 Hz it was, flying away from home; audible: the most dB it may fall from by a soundsystem to anywhere far off, as a laptop plays it, checked by tools/music-lab/check.cjs)
Music by proximity [1]: one shared track, full and clear within nearDist metres of a playing soundsystem (or the dancefloor's ring, as loud as its speakers are on), fading to floor of the volume and muffled to a muffle Hz low-pass by farDist metres (clear: the cutoff close by), never gone [2]; a damaged soundsystem nearby wobbles, crackles and drops out, by its damage times distort. Only the music: the room, night and ambience sounds and the effects as they are.
Code: `tools/music-lab/check.cjs`

- **`music.volume`**: the master.
- **`music.latency`**: the audio context's latencyHint [1]: interactive the smallest output buffer, balanced more room for the audio thread, playback the most (under-runs least likely, sound effects latest); ?latency= tries one for a load (DECISION FOR ED).
  1. Ed, 2026-10-07: "the music is still cutting out"
- **`music.buffer`**: How much audio the game buffers ahead, so the music stays on the beat without crackling.
  1. "music is still cutting out" (Ed's v3167 playtest,: 474 device under-runs, each one 10 ms buffer, on his busy laptop; balanced gives Chrome the same 10 ms as interactive)
  the audio output's buffer to ask for, in seconds [1], 0 for the latency category below; a browser that under-runs 20 times in a load asks for twice as much next load, up to 0.24 s (platform/audio/buffer.ts); the music goes out early by the context's latency so it stays on the beat shown, only the sound effects come later.
  Code: `platform/audio/buffer.ts`
- **`music.dropLayers`**: when her needle-drop routine ends after the party spell [1], that many of the intro's layers come in on the next bar line, each home speaker then adding its own on top.
  1. Ed, 2026-10-07: the first music drops straight after it, before she steps off
- **`music.circle`**: in a sleeping legend's clearing on the ground [1], the music muffled to muffle Hz and quiet times its volume, eased in and out with a time constant of ease seconds, and the legend's own layer (the music style's circle) over it at level.
  1. Ed, 2026-10-06
- **`music.circle.radius`**: the clearing's metres round a legend where the map draws none.
- **`music.house.muffle`**: on the house its low-pass closes to this many Hz as its world slows (eased with the slowing), its volume as it is; lighter than a legend circle's circle.muffle.
  1. Ed, 2026-10-26: "When in the treehouse, the house music slows and muffles. Other sounds stay the same"
- **`music.src`**: an audio file to loop (empty: the built-in loop at beat.bpm until there's a real track). ?music=off silences it.

| knob | type | range |
|---|---|---|
| `music.on` | boolean |  |
| `music.volume` | number | 0 to … |
| `music.latency` | string | "interactive" / "balanced" / "playback" |
| `music.buffer` | number | 0 to … |
| `music.dropLayers` | number | 0 to … |
| `music.nearDist` | number | 0 to … |
| `music.farDist` | number | 0 to … |
| `music.floor` | number | 0 to … |
| `music.muffle` | number | 0 to … |
| `music.audible` | number | 0 to … |
| `music.circle.muffle` | number | 0 to … |
| `music.circle.quiet` | number | 0 to … |
| `music.circle.ease` | number | 0 to … |
| `music.circle.level` | number | 0 to … |
| `music.circle.radius` | number | 0 to … |
| `music.slow.on` | boolean |  |
| `music.slow.pitch` | number | 0 to … |
| `music.slow.floor` | number | 0 to … |
| `music.house.muffle` | number | 0 to … |
| `music.clear` | number | 0 to … |
| `music.distort` | number | 0 to … |
| `music.src` | string |  |
| `music.over.stop` | number | 0 to … |
| `music.over.floor` | number | 0 to … |
| `music.beach.fade` | number | 0 to … |
| `music.beach.quiet` | number | 0 to … |

### `alarms`

The soundsystem alarm [1]: a soundsystem (or the home ring's speakers) hit while off screen shows a 🔇 at the screen's edge toward it, its ring its health, shaking at each blow.

1. Ed, 2026-10-06: "We should have an indicator for when a soundsystem or speaker is being attacked offscreen. It can look like the 🎶 indicator, but with 🔇"

- **`alarms.linger`**: seconds it stays after the last blow.
- **`alarms.fall`**: seconds a fallen one stays, flashing then fading.
- **`alarms.most`**: how many show at once (the most recently hit).

| knob | type | range |
|---|---|---|
| `alarms.linger` | number | 0 to … |
| `alarms.fall` | number | 0 to … |
| `alarms.most` | number | 0 to … |

### `boot`

At the start the home ring of speakers boots up one stone at a time before the first wave sets off.

1. Ed, 2026-10-04
2. 2026-10-18: 4: the ley pulse's speed till Ed set the waves' to 1 m/s on, the boot kept as it was
3. 2026-10-06: the 179 m path in about 45 s, the first stone about 3 s off the decks, as Ed asked on
At the start the home speaker ring boots up [1]: its pulse runs from the treehouse's front down to the ring and once round it at speed m/s [2][3], each stone turning into its speaker as it passes; only then does the first wave's pulse set off: time to find and invite your first creatures. It waits for her first step off the decks, the party spell cast (golf: rules/party.ts castPartySpell; rules/bootRing.ts). The ley line runs ahead of it at leyLines.reveal times its pace.
Code: `rules/party.ts`, `rules/bootRing.ts`

- **`boot.transform`**: the seconds each takes to turn, glowing and rising into the speaker.
  1. Ed, 2026-10-06: the home ring starts as small runestones, and the boot pulse turns each into its speaker

| knob | type | range |
|---|---|---|
| `boot.speed` | number | 0 to … |
| `boot.transform` | number | 0 to … |

### `party`

- **`party.motes`**: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s.
- **`party.uplight`**: Tree crowns in partified areas catch a faint glow from below in the area's colour, pulsing on the beat.
  1. Ed, 2026-10-09: "Pure constant speed" (leyLines.pulseSpeed: no fixed interval, each gap its link's length over the speed)
  2. Ed, 2026-10-04: one per witch
  3. Ed, 2026-10-07: every one invited or run off; its legend and its circle's baby don't count
  crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave each time the ley pulse reaches the next stone on the route [1], setting off startDelay seconds after home's boot, each waking areasPerWave areas [2], chosen by picker. An area cleared of its own wild creatures before its wave [3] is partified at once, as its wave would (rules/clear.ts); the waves keep to the route all the same, and the wave that comes to a stone already playing changes nothing in the rules but celebrates (the waveCelebrate event).
  Code: `rules/clear.ts`
- **`party.picker`**: how the next area to wake is chosen: route [1][2][3] wakes them in one order worked out per map so the ley line through them all crosses itself at most a few times, within Ed's rules: a spiral [4].
  1. Ed, 2026-10-06: "I think the leylines should cover the entire set of waves the whole time, but ideally it shouldn't cross itself"
  2. "I thought the idea was to have no crossings?"
  3. "Long spirals are okay, but ideally it shouldn't be just spirals" (rules/leyroute.ts)
  4. Ed, 2026-10-06: "This last example looks great!" (of the mock-up; out from home ring by ring, the same way round, a little lobe, a few crossings)
  Code: `rules/leyroute.ts`
- **`party.noisy`**: (the picker before it, and the route's own fallback past the crossing rules) chooses among the areas bordering the party as below.
- **`party.transition`**: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).

| knob | type | range |
|---|---|---|
| `party.motes.perPatch` | number | 0 to … |
| `party.motes.from` | number | 0 to … |
| `party.motes.to` | number | 0 to … |
| `party.motes.speed` | number | 0 to … |
| `party.uplight.strength` | number | 0 to … |
| `party.uplight.pulse` | number | 0 to … |
| `party.uplight.edge` | number | 0 to … |
| `party.startDelay` | number | 0 to … |
| `party.areasPerWave` | number | 0 to … |
| `party.picker` | string |  |
| `party.noisy.wobble` | number | 0 to … |
| `party.noisy.lobeSize` | number | 0 to … |
| `party.noisy.candidates` | number | 0 to … |
| `party.noisy.spreadFromLast` | boolean |  |
| `party.transition` | number | 0 to … |
| `party.lightReach` | number | 0 to … |
| `party.lightStrength` | number | 0 to … |

### `blood`

Blood trails [1]: a hurt creature within range metres of her leaves small dark-red pixel marks on the ground as it moves, fading over fade seconds; the more hurt, the more often and the redder.

1. Ed, 2026-10-09: "hurt creatures leave a little trail of blood, the more hurt they are the more blood they leave? The blood vanishes over time" … "bloody footprints perhaps" (and; render/leash/blood.ts)
Code: `render/leash/blood.ts`

- **`blood.style`**: prints (footprints at its stride, left and right; four-legged ones in pairs, insects a tiny track; flyers, birds and snakes drip drops instead), prints+drops (and drops when badly hurt) or drops (drops only).
- **`blood.colour`**: red (a dark red on the night palette) or neon (a deep shade of the creature's own neon).
- **`blood.rate`**: drops a second at none of its health left (by how hurt, squared).
- **`blood.cap`**: The most blood marks shown at once, the oldest giving way.
  marks at once (the oldest gives way). Healed, it stops.

| knob | type | range |
|---|---|---|
| `blood.on` | boolean |  |
| `blood.style` | string | "prints" / "prints+drops" / "drops" |
| `blood.colour` | string | "red" / "neon" |
| `blood.fade` | number | 0 to … |
| `blood.rate` | number | 0 to … |
| `blood.cap` | number | 0 to … |
| `blood.range` | number | 0 to … |

### `soundsystemGen`

Each area's soundsystem is generated with its own look, bigger and taller the further from the dancefloor.

1. Ed, 2026-10-08: "a variety, for them all to point towards the dancefloor (like the central speaker ones do; back facing ones face outwards), and broadly for the ones further away to be larger ... we don't see any exactly identical ones on the map" (art/soundsystemGen.js, render/soundsystemGen.ts)
The generated soundsystems [1]: each area's its own genome, dealt as one set a map (none alike). Sized from near times the old stacks' height (three times the witch) by the dancefloor to far times at to metres out and beyond (from metres and nearer all near), more tiers and wider the further out. Turned along the line to the dancefloor, facing it from the far side and away from it on the near side so every one shows its front, as the ring's speakers (toward: always facing it, the near ones showing their carved backs), never more than maxYaw degrees off facing us (a wide stack side-on is a sliver). Baked in the background ahead waves ahead of the party. on false: the old three stacks.
Code: `art/soundsystemGen.js`, `render/soundsystemGen.ts`

| knob | type | range |
|---|---|---|
| `soundsystemGen.on` | boolean |  |
| `soundsystemGen.near` | number | 0 to … |
| `soundsystemGen.far` | number | 0 to … |
| `soundsystemGen.from` | number | 0 to … |
| `soundsystemGen.to` | number | 0 to … |
| `soundsystemGen.maxYaw` | number | 0 to … |
| `soundsystemGen.toward` | boolean |  |
| `soundsystemGen.ahead` | number | 0 to … |

### `stringLights`

Colourful garlands of string lights strung tree to tree across every partified area.

1. Ed, 2026-10-08: "I liked the six bright colour string lights, please bring them back"
2. Ed, 2026-10-27: "String lights on the treehouse seem to all have the same shape" (of the crown's)
Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres, coloured by mode: palette cycles through all of palette's colours [1]; areaNeon is warm white, the palette's first, two bulbs in three and the area's own neon the third (the art director, round 2: one neon an area plus the warm light). The light's grade leaves them their colour (light.spooky only drains what's darker than its gradePivot; measured from the treetops, the same with and without it), twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light. Each line hung its own way [2]: its two ends up to 1.2 m above or below height, its sag 0.5 to 1.7 times sag, and one in five with a strand of 1.5 to 4 m let hang off its far end (render/strings.ts, from its seed).
Code: `render/strings.ts`

- **`stringLights.more`**: times as many runs an area, their spread apart shrunk by its square root to fit (1 as tuned).
  1. Ed, 2026-10-27: "the party-area slider" (the pause page's Oak crown group)

| knob | type | range |
|---|---|---|
| `stringLights.on` | boolean |  |
| `stringLights.runsPerArea` | array of number |  |
| `stringLights.spansPerRun` | array of number |  |
| `stringLights.coneAngle` | number | 0 to … |
| `stringLights.junctionChance` | number | 0 to … |
| `stringLights.spanMin` | number | 0 to … |
| `stringLights.spanMax` | number | 0 to … |
| `stringLights.spread` | number | 0 to … |
| `stringLights.height` | number | 0 to … |
| `stringLights.sag` | number | 0 to … |
| `stringLights.bulbSpacing` | number | 0 to … |
| `stringLights.palette` | array of string |  |
| `stringLights.mode` | string | "palette" / "areaNeon" |
| `stringLights.twinkle` | number | 0 to … |
| `stringLights.chaseSpeed` | number | 0 to … |
| `stringLights.more` | number | 0 to … |

### `waveNumbers`

Numbers over the rune stones showing which wave will wake each one (now switched off).

1. Ed, 2026-10-06: "Remove the floating numbers above the runestones."
2. Ed, 2026-10-04: "for design purposes, let's just put a big glowing number above the stones"
Off [1]; set on to true to bring them back. Wave numbers over the rune stones [2]: each stone shows the wave that will wake it, in its area's neon, over the canopy and clouds from the treetops and above the stone on the ground; on turns them off; On the ground, a number whose stone is within pinRange metres is held inside the top of the screen when it would be above it.

- **`waveNumbers.size`**: a digit's height as a share of the screen's.
- **`waveNumbers.lift`**: metres above the stone (or the treetops).
- **`waveNumbers.spent`**: how bright the number stays once the party has reached the area (0 hides it).

| knob | type | range |
|---|---|---|
| `waveNumbers.on` | boolean |  |
| `waveNumbers.size` | number | 0 to … |
| `waveNumbers.lift` | number | 0 to … |
| `waveNumbers.spent` | number | 0 to … |
| `waveNumbers.pinRange` | number | 0 to … |

### `dancefloor`

The dancefloor at the island's heart: its size, its ring of stone speakers, the clearing round it and the magic motes rising off it.

The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); its radius in metres; a ring of speakers.count stone speakers (Ed, v160), the first at speakers.start degrees round from the camera side and the rest evenly spaced, speakers.radiusFactor times the radius out, each speakers.footprint metres round; a clear space of clearing metres beyond the speakers' feet (the treehouse stands outside that); the floor's glass tiles light up (Ed, v160): levels: how many areas must have the party for each level of intensity above 1 (up to 4, a full rave).

- **`dancefloor.tiles`**: The dancefloor's glass tiles light up under her and on events, show the island's sigil during the boot, and glow brighter as more areas join the party.
  1. Ed, 2026-10-11: island; home's the World Tree
  the witch lights the tiles under her (in witchColour, from the neon) when below witchLift, with a ripple each beat lasting rippleTime seconds (a landing's twice as long), footsteps fading over trailTime, events (a wave arriving, a sigil placed) over eventTime, and at level 1 only lowLevelShare of the lit tiles show; through the boot the floor shows the island's sigil [1], written on stroke by stroke as the boot's pulse goes round the ring, in place of the moon, the sap rising up it every sapBars bars once written, until the first wave switches the floor on (on: false, the moon as before); a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), a plaza of flagstones round the floor (paving: in rings from the rim out to beyond metres past the speakers' feet, course metres deep, stones about stone metres long, the outer edge breaking up over ragged metres with missing of its stones gone to grass, moss the share of mossy stones; the speakers stand on a course of darker stone); and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.

| knob | type | range |
|---|---|---|
| `dancefloor.motes.count` | number | 0 to … |
| `dancefloor.motes.rise` | number | 0 to … |
| `dancefloor.motes.speed` | number | 0 to … |
| `dancefloor.motes.column` | number | 0 to … |
| `dancefloor.radius` | number | 0 to … |
| `dancefloor.clearing` | number | 0 to … |
| `dancefloor.speakers.count` | number | 0 to … |
| `dancefloor.speakers.start` | number | 0 to … |
| `dancefloor.speakers.radiusFactor` | number | 0 to … |
| `dancefloor.speakers.footprint` | number | 0 to … |
| `dancefloor.paving.on` | boolean |  |
| `dancefloor.paving.beyond` | number | 0 to … |
| `dancefloor.paving.course` | number | 0 to … |
| `dancefloor.paving.stone` | number | 0 to … |
| `dancefloor.paving.ragged` | number | 0 to … |
| `dancefloor.paving.missing` | number | 0 to … |
| `dancefloor.paving.moss` | number | 0 to … |
| `dancefloor.levels` | array of number |  |
| `dancefloor.tiles.witchLift` | number | 0 to … |
| `dancefloor.tiles.witchColour` | string |  |
| `dancefloor.tiles.rippleTime` | number | 0 to … |
| `dancefloor.tiles.trailTime` | number | 0 to … |
| `dancefloor.tiles.eventTime` | number | 0 to … |
| `dancefloor.tiles.lowLevelShare` | number | 0 to … |
| `dancefloor.island.on` | boolean |  |
| `dancefloor.island.sapBars` | number | 0 to … |
| `dancefloor.circleHue` | number | 0 to … |
| `dancefloor.circleHue2` | number | 0 to … |
| `dancefloor.pulse` | number | 0 to … |
| `dancefloor.runeSpeed` | number | 0 to … |
| `dancefloor.lightReach` | number | 0 to … |
| `dancefloor.lightStrength` | number | 0 to … |
| `dancefloor.discoHeight` | number | 0 to … |
| `dancefloor.discoSize` | number | 0 to … |
| `dancefloor.spin` | number | 0 to … |
| `dancefloor.specks` | number | 0 to … |
| `dancefloor.speckBrightness` | number | 0 to … |
| `dancefloor.speckReach` | number | 0 to … |

### `partyOver`

The party's over [1]: once the home ring's speakers are all down [2], the afterparty, any soundsystem still standing switched off: the waves stop, nothing fights, and every creature walks home and sleeps.

1. Ed, 2026-10-06: "when the soundsystems and speakers are all destroyed, the dance music stops, the dancefloor switches off, lights switch off, the upset animals that ran away go home, all the animals go to sleep and make little 😴 speech bubbles, and you can walk the map safely" (rules/partyOver.ts)
2. Ed, 2026-10-10: "The party should end when all your home speakers are destroyed, not all speakers+soundsystems. When the party ends, undestroyed soundsystems should just switch off (sound and lights)"
Code: `rules/partyOver.ts`

- **`partyOver.ease`**: seconds it eases in over (g.partyOver.ease, 0 to 1: the lights going out, the music winding down, the ley line fading to leyFloor of its brightness). ?partyover=1 starts it at once (home's speakers down).
- **`partyOver.walk`**: their pace home, times their roaming speed (they walk, not run: a stroll home after the party).

| knob | type | range |
|---|---|---|
| `partyOver.ease` | number | 0 to … |
| `partyOver.leyFloor` | number | 0 to 1 |
| `partyOver.walk` | number | 0 to … |

## View

The camera and the view (drawing only): framing, pixel size, culling, fading, finding things.

### `sail`

Sailing from the sea chart starts the next night on the same page, the old night's music fading into sea and wind, rather than reloading.

Sailing from the map table's sea chart (docs/plans/sail-without-reload.md, app/sail.ts): inPlace, the next night started on the same page (the old night's music fading out as a quiet sea and wind come in, sfx.sail; Back then opens the pause menu; anything going wrong loads the page anew, quietly), and so the bed and the bot game's exit, and the cards' Sea chart opening the map table's chart over the game; else the page loaded anew on the island's link (or chart.html) as before. ?sail=inplace or ?sail=reload for one page.
Code: `docs/plans/sail-without-reload.md`, `app/sail.ts`

| knob | type | range |
|---|---|---|
| `sail.inPlace` | boolean |  |

### `loading`

The loading screen: the World Tree and COVEN RUSH picked out in gold stars that light up as the game loads.

1. Ed, 2026-10-26: src/ui/loadingScreen.js, before main.ts loads
The loading screen [1]: the World Tree and COVEN RUSH in gold stars, lighting as the game loads, edge first by edge (0 plain random), at most rate stars a second, each flashing for flash seconds; ghost how bright the stars not yet lit show (0: an empty sky, Ed's call); the heart's star last, its supernova to white over nova seconds and the white clearing over clear seconds into the bedroom. It draws fps frames a second while the game loads (each frame costs the load a little), about 20 once it's ready. Read as the page opens, so the pause page's sliders (remembered on this browser) take effect on the next load.
Code: `src/ui/loadingScreen.js`

| knob | type | range |
|---|---|---|
| `loading.edge` | number | 0 to … |
| `loading.rate` | number | 0 to … |
| `loading.flash` | number | 0 to … |
| `loading.ghost` | number | 0 to … |
| `loading.nova` | number | 0 to … |
| `loading.clear` | number | 0 to … |
| `loading.fps` | number | 0 to … |

### `opening`

A plain first load wakes her in her bedroom on the home island while the night is made.

1. Ed, 2026-10-20: app/opening.ts, previews/ed/opening-mock/ on claude/ed-shots
2. Ed, 2026-10-23: "the first screen should be the witch waking up in her bedroom on the home island instead of the map"
3. 2026-10-20: the sea chart came first from till then
The opening [1]: bedroom, a plain first load (its link naming no seed or island, no arrival, no bot, the room not skipped) going straight to home's night and waking her in her bedroom there [2][3], asleep in the dark while the night is made. On by default; ?opening=old keeps the old start for a load (the character creator as the loading cover), ?opening=bedroom forces the wake-up; false here turns it off for every load.
Code: `app/opening.ts`

- **`opening.wake`**: the wake-up in her bedroom (rules/wakeUp.ts): snooze, a snooze's seconds (Ed: 5, as often as she likes); stretch, her stretch's seconds before she stands; alarmMin, the seconds the alarm rings before E can snooze it.
  Code: `rules/wakeUp.ts`

| knob | type | range |
|---|---|---|
| `opening.bedroom` | boolean |  |
| `opening.wake.snooze` | number | 0 to … |
| `opening.wake.stretch` | number | 0 to … |
| `opening.wake.alarmMin` | number | 0 to … |

### `arrive`

Arriving on an island from the sea chart: the camera flies in over the sea, frames the dancefloor and comes round to the treehouse.

1. Ed, 2026-10-12: the zoom-to-island plan; rules/arrive.ts, app/arrive.ts
2. Ed's playtest, 2026-10-12: the first frames at a new spot are heavy
3. Ed, 2026-10-24: "Never a frozen frame" (the sail's transition)
Arriving on an island from the sea chart [1]: the chart hands off over the open sea south of the island (its last frame and camera in sessionStorage, Charlie's chart side), the page shows that still pushing in (a CSS animation in index.html, from the first paint) while the night builds, then cross-fades it away over fade seconds into the game's camera at the same place, and flies on, looking north: over the sea and low over the forest at speed m/s (low: angle degrees down, distance metres back, aimed offshore metres past the south coast at first; each low leg at least minLeg seconds), then up over rise seconds to frame the dancefloor and the treehouse's spot together (frame: angle, distance, lift metres over the ground), then down over settle seconds into the opening shot at her decks. It waits behind the still [2] until warm.frames frames in a row come within warm.ms ms, or warm.max seconds pass, then flies on the frames' own time, each counting at most maxStep seconds, so a stall holds the flight rather than skipping it. Any key skips to the decks. The chart's record (app/arrival.ts) is read once, and ignored if it's stale or for another island; with no still (too big for the storage) a plain dark screen fades instead. The flight starts at the chart's own speed north (its cam.speed). A sail in place [3]: the next night is made under the chart from the moment she sails, and the chart's flight waits for it (hold): from the end of its glide in, while the night isn't ready, its pace eases (over hold.ease seconds) down to hold.rate of its own, slowing on into a hover short of the hand-off, the sea still moving, for at most hold.cap seconds; then on, as it's ready, into the dive.
Code: `rules/arrive.ts`, `app/arrive.ts`, `app/arrival.ts`

- **`arrive.handoff`**: where the chart hands over, sea metres out to sea off the south coast below the dancefloor (negative: inland), its camera dist metres back and pitchDeg degrees down (the first flight's: -40, 600, 50); ?dive=near\|far\|skim for one load (app/chartView.ts DIVES).
  Code: `app/chartView.ts`
- **`arrive.tree`**: Where the camera ends its arrival: the whole treehouse tree seen from the south, filling the frame.
  1. Ed, 2026-10-24: "pan up to see the whole treehouse tree before we fly into her bedroom"
  after framing the dancefloor, the camera comes round to the whole treehouse tree from the south, angle degrees up at its middle, far enough back that it fills fill of the frame's height (its height in metres from its art once drawn, height till then), time seconds after the frame, then settle seconds on into her bedroom.

| knob | type | range |
|---|---|---|
| `arrive.warm.frames` | number | 0 to … |
| `arrive.warm.ms` | number | 0 to … |
| `arrive.warm.max` | number | 0 to … |
| `arrive.maxStep` | number | 0 to … |
| `arrive.fade` | number | 0 to … |
| `arrive.speed` | number | 0 to … |
| `arrive.minLeg` | number | 0 to … |
| `arrive.low.angle` | number | 0 to … |
| `arrive.low.distance` | number | 0 to … |
| `arrive.low.offshore` | number | 0 to … |
| `arrive.frame.angle` | number | 0 to … |
| `arrive.frame.distance` | number | 0 to … |
| `arrive.frame.lift` | number | 0 to … |
| `arrive.rise` | number | 0 to … |
| `arrive.settle` | number | 0 to … |
| `arrive.hold.rate` | number | 0 to … |
| `arrive.hold.ease` | number | 0 to … |
| `arrive.hold.cap` | number | 0 to … |
| `arrive.handoff.sea` | number |  |
| `arrive.handoff.dist` | number | 0 to … |
| `arrive.handoff.pitchDeg` | number | 0 to … |
| `arrive.tree.height` | number | 0 to … |
| `arrive.tree.angle` | number | 0 to … |
| `arrive.tree.fill` | number | 0 to … |
| `arrive.tree.time` | number | 0 to … |

### `camera`

The camera: near-isometric on the ground, starting close in on her seat in the treehouse and easing out once she moves.

1. Ed, 2026-10-10: "Increase the range of allowed zooming substantially in both treetop and ground (but keep the step size the same)" (20 m and 2 degrees a step, as before; was 4 steps, startZoom 1, ground 80-140 m, treetop 150-210 m)
Near-isometric on the ground, after Transistor; the game opens close in on the witch in her seat on the treehouse (intro: distance metres, angle degrees), easing out to the normal view over intro.ease seconds once she moves or rises (Ed, v171); lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. Zoom moves between them in zoomSteps steps, starting at startZoom: with 9 steps and startZoom 3 the start is ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with three steps in and five out from each [1].

- **`camera.zoomEase`, `camera.liftEase`**: How softly zooming and rising change the camera's angle and distance.
  how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out.
- **`camera.curve`**: the world bends away toward the top of the screen [1], per metre ahead of the witch, eased in as she rises; ?curve=<treetop> tries values (0.0015: about 11% of the screen sky in ?bare=1, Ed v276 asked 10-12%; 0.0022 about 24%; under 0.001 none; 0 off).
  1. Ed, 2026-10-04: only over the treetops, so a little night sky shows
- **`camera.curve.beyond`**: how many metres past the bent ground's horizon the distant treetops are still drawn (fewer is cheaper).
- **`camera.speedZoom`**: the treetop camera's distance is times (treetopSpeed / base) to the power power, so at a faster treetopSpeed it zooms out and the screen holds about as many seconds of flight (power 0: off).
  1. Ed, 2026-10-05: treetop mode much faster, for travel
- **`camera.shake`**: The screen shakes when she's hit, harder for each hit she was already missing and hardest on a knockdown.
  1. Ed, 2026-10-05: "Screen should shake when the witch is hit. More shake when you are on lower health"
  each hit adds trauma (0-1), base on her first, perMissingHit more for each hit she was already missing, knockdown on the hit that knocks her down; it falls away at decay a second, and the screen shakes by trauma squared times maxOffsetPx (screen pixels, whole ones) and maxRotDeg, smooth noise wandering speed times a second. ?shake=0 (or the start screen's toggle) turns it off.
- **`camera.circle`**: In a legend's circle the camera tilts and frames her and the legend together.
  1. Ed, 2026-10-08: "lowering the camera angle while you're in the circle to make them seem more looming" (considering it; legends being hard to make out in their circles)
  on the ground in a legend's circle the camera eases over ease seconds to angle degrees (from the ground view's 30 to 36), its distance times distance, aimed frame of the way from her to the legend and look metres higher, so the legend stands large over her; it eases back as she leaves. on false turns it off.
- **`camera.house`**: landed on the treehouse's floor, the camera eases over ease seconds to angle degrees and its distance times distance.
  1. Ed, 2026-10-14: "the camera zooms in so you can see the detail" (indoors)
- **`camera.station`**: at a dressing station and choosing (the pointer or the d-pad in its panel, or stood still a moment: ui/stationPanel.ts), its distance times distance and moved side times that distance east (west when negative), so she stands clear of the panel; eased over ease seconds, and back as soon as she moves.
  1. Ed, 2026-10-21
  Code: `ui/stationPanel.ts`
- **`camera.station.aim`**: with no part, the camera aimed that share of her height (as she's drawn) up her.
- **`camera.station.parts`**: Where the camera aims at a dressing station for each part of her being changed (head, hat, top, legs, feet, broom, the pegboard).
  1. Ed, 2026-10-23: "zoom in on what's being chosen"
  2. Ed's playtest, 2026-10-23: aimed by metres from her feet, her head went off the top of the screen up close; by her height it stays on the part chosen at any zoom
  for the part of her the row in focus is about (config/wardrobe.json's frame: head, hat, top, legs, feet, broom; board, the Workshop's pegboard, the wall behind her, so aimed up over her to it), aimed aim of her height (as drawn: 0 her feet, 1 the top of her hat) up her and look metres higher (a thing by her: the board, the broom), and its distance times distance in place of the station's own, eased from part to part as the cursor moves [2].
  Code: `config/wardrobe.json`
- **`camera.station.whole`**: At a dressing station the camera frames her whole, top of her hat to the soles of her shoes, in the right half of the screen while the panel takes the left half.
  1. Ed, 2026-10-29: "Menus should be left half of the screen, and the witch right half of the screen, and she should be nicely centred and visible top of hat to bottom of shoes."
  margin is the share of the screen's height left clear above and below her; at is where across the screen's width she stands (0.75: the right half's middle). On, it replaces distance, side, aim and parts (the zoom on the part of her being chosen), which stay for it off.
  Code: `src/render/view/camera.ts`, `src/ui/stationPanel.ts`
- **`camera.station.dim`**: How dark the picture behind her goes while she's framed at a station, so she stands out: 0 leaves it as it is, 1 makes it black.
  1. Ed, 2026-10-29: "When the witch opens a station, make the background behind her darker so that she stands out more clearly"
  a black wash over the whole picture, eased in with the framing, and her drawn again over it at full light; the panel's own wash on the left half is separate (ui/stationPanel.ts).
  Code: `src/render/stationBackdrop.ts`

| knob | type | range |
|---|---|---|
| `camera.fov` | number | 0 to … |
| `camera.ground.angleIn` | number | 0 to … |
| `camera.ground.angleOut` | number | 0 to … |
| `camera.ground.distanceIn` | number | 0 to … |
| `camera.ground.distanceOut` | number | 0 to … |
| `camera.treetop.angleIn` | number | 0 to … |
| `camera.treetop.angleOut` | number | 0 to … |
| `camera.treetop.distanceIn` | number | 0 to … |
| `camera.treetop.distanceOut` | number | 0 to … |
| `camera.lookAhead` | number | 0 to … |
| `camera.lookAheadMax` | number | 0 to … |
| `camera.lookAheadEase` | number | 0 to … |
| `camera.zoomEase` | number | 0 to … |
| `camera.liftEase` | number | 0 to … |
| `camera.curve.ground` | number | 0 to … |
| `camera.curve.treetop` | number | 0 to … |
| `camera.curve.beyond` | number | 0 to … |
| `camera.zoomSteps` | number | 0 to … |
| `camera.speedZoom.base` | number | 0 to … |
| `camera.speedZoom.power` | number | 0 to … |
| `camera.startZoom` | number | 0 to … |
| `camera.shake.base` | number | 0 to … |
| `camera.shake.perMissingHit` | number | 0 to … |
| `camera.shake.knockdown` | number | 0 to … |
| `camera.shake.decay` | number | 0 to … |
| `camera.shake.maxOffsetPx` | number | 0 to … |
| `camera.shake.maxRotDeg` | number | 0 to … |
| `camera.shake.speed` | number | 0 to … |
| `camera.follow` | number | 0 to … |
| `camera.intro.distance` | number | 0 to … |
| `camera.intro.angle` | number | 0 to … |
| `camera.intro.ease` | number | 0 to … |
| `camera.circle.on` | boolean |  |
| `camera.circle.angle` | number | 0 to … |
| `camera.circle.distance` | number | 0 to … |
| `camera.circle.ease` | number | 0 to … |
| `camera.circle.frame` | number | 0 to … |
| `camera.circle.look` | number | 0 to … |
| `camera.house.on` | boolean |  |
| `camera.house.angle` | number | 0 to … |
| `camera.house.distance` | number | 0 to … |
| `camera.house.ease` | number | 0 to … |
| `camera.station.on` | boolean |  |
| `camera.station.whole.on` | boolean |  |
| `camera.station.whole.margin` | number | 0 to … |
| `camera.station.whole.at` | number | 0 to … |
| `camera.station.dim` | number | 0 to … |
| `camera.station.distance` | number | 0 to … |
| `camera.station.side` | number |  |
| `camera.station.ease` | number | 0 to … |
| `camera.station.aim` | number | 0 to … |
| `camera.station.parts.head.aim` | number | 0 to … |
| `camera.station.parts.head.distance` | number | 0 to … |
| `camera.station.parts.hat.aim` | number | 0 to … |
| `camera.station.parts.hat.distance` | number | 0 to … |
| `camera.station.parts.top.aim` | number | 0 to … |
| `camera.station.parts.top.distance` | number | 0 to … |
| `camera.station.parts.legs.aim` | number | 0 to … |
| `camera.station.parts.legs.distance` | number | 0 to … |
| `camera.station.parts.feet.aim` | number | 0 to … |
| `camera.station.parts.feet.distance` | number | 0 to … |
| `camera.station.parts.broom.look` | number | -5 to 5 |
| `camera.station.parts.broom.distance` | number | 0 to … |
| `camera.station.parts.board.look` | number | 0 to … |
| `camera.station.parts.board.distance` | number | 0 to … |

### `pixelSize`

How many screen pixels each art pixel takes up, the size of the game's chunky pixels.

1. Ed, 2026-10-07: "the large pixels look cute but it's impossible to see what's going on" (3 after playtesting 5 and 4; ?px=4\|5 to compare)
Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. screen pixels per art pixel [1]. The witch's light reaches as far as the canopy hole round her in ground mode (its radius plus its soft edge, in metres at her depth, times glowToCutout), so beyond it the forest is dark (Ed, v149).

| knob | type | range |
|---|---|---|
| `pixelSize` | number | 0 to … |

### `spriteTilt`

1 = sprites face the camera fully, 0 = stand upright.

| knob | type | range |
|---|---|---|
| `spriteTilt` | number | 0 to … |

### `artPixelsPerMetre`

See `pixelSize`.

| knob | type | range |
|---|---|---|
| `artPixelsPerMetre` | number | 0 to … |

### `viewMargin`

See `pixelSize`.

| knob | type | range |
|---|---|---|
| `viewMargin` | number | 0 to … |

### `sigilProjection`

From the treetops each placed sigil shows above the canopy over its spot, with a faint beam down to it.

From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.

- **`sigilProjection.creatures`**: From the treetops each leashed or happy creature's sigil hangs over it, moving with it.
  1. Ed's playtest, 2026-10-06: "I should be able to see sigils of leashed creatures and happy creatures from treetop mode"
  each leashed or happy creature's sigil hangs over it at the same height, moving with it, no beam: only the nearest max within range metres, size times its ground rune, at opacity (a happy one's times happy, as its rune is dimmer on the ground), fading out over the last fade (a share) of the range. Not for one in her stack (its sigil's already over her) or one standing at its placed sigil (that one's projected already).

| knob | type | range |
|---|---|---|
| `sigilProjection.height` | number | 0 to … |
| `sigilProjection.opacity` | number | 0 to … |
| `sigilProjection.beam` | number | 0 to … |
| `sigilProjection.size` | number | 0 to … |
| `sigilProjection.creatures.range` | number | 0 to … |
| `sigilProjection.creatures.max` | number | 0 to … |
| `sigilProjection.creatures.size` | number | 0 to … |
| `sigilProjection.creatures.opacity` | number | 0 to … |
| `sigilProjection.creatures.happy` | number | 0 to … |
| `sigilProjection.creatures.fade` | number | 0 to … |

### `suspects`

The circle-bug suspects [1]: each effect centred on her with a round edge, on (as ever) or off, read every frame so the pause page's toggles show at once.

1. Ed, 2026-10-14: "there are not very many things that draw circles around the witch"

- **`suspects.seeThrough`**: tall things in front of her fading (occlusion).
- **`suspects.holeCut`**: the canopy cut away round her (off: crowns everywhere).
- **`suspects.trunkFade`**: trunk tops fading where crowns are cut away.
- **`suspects.groundCover`**: the tufts kept to the cut-away's reach (off: out to groundCover.radius).
- **`suspects.glow`**: her light and its warm pool.
- **`suspects.effectsLayer`**: the smooth effects layer (mist, dapple: drawn at the scene's resolution and blurred, laid over the picture).
- **`suspects.haze`**: the far haze round her.
- **`suspects.areaAverage`**: scenery sprites averaged where they shrink.
- **`suspects.seeDepth`**: the see-through pass's depth (#896).
- **`suspects.cutWhole`**: the cut-away by each crown whole, as canopyCutout.whole has it (off: pixel by pixel).
- **`suspects.seeSplit`**: the see-through's fade itself (off: the soft circle's things stay solid and in the solid pass; the vertex side unchanged).
- **`suspects.seeMark`**: the pixels the see-through pass draws tinted magenta.
- **`suspects.mist`**: the low mist (in the effects layer).
- **`suspects.lightRings`**: the moonlight rings on the crowns (in the effects layer).
- **`suspects.seeWrite`**: the see-through pass writes its depth as it draws, so the nearer of two faded things wins where they overlap, as in the solid pass (off as ever: whichever is drawn last).
- **`suspects.seeCull`**: the see-through pass skipping, before drawing, every sprite it reckons can't reach her circle or the hole (off: it draws them all and lets each pixel decide).
- **`suspects.seeKeep`**: the solid pass keeps what's in front of her as well (the see-through pass drawn over it).
- **`suspects.seeStencil`**: the see-through pass marks scenery in the stencil as the solid pass does.
- **`suspects.seeEarly`**: the see-through pass drawn straight after the solid scenery (render order 0.6, not 11: she then shows through it whole).
- **`suspects.seeSolid`**: the see-through pass's pixels drawn at alpha 1: off, all, only those in her circle (circle) or only the rest (rest).
- **`suspects.seeNoBlend`**: the see-through pass drawn with no blending.
- **`suspects.seeShowAlpha`**: the see-through pass drawn as its own opacity in grey (white solid, black clear).
- **`suspects.showBroken`**: scene pixels that are not a number red, infinite magenta, negative yellow (before the post-process).
- **`suspects.seeDither`**: the see-through done in the solid pass as an ordered dither (no second pass for it).
- **`suspects.seeTwo`**: the fix (on): what's in front of her drawn in a see-through pass of its own, writing depth, before the half-faded things (off: one see-through pass, as before, the circle bug).

| knob | type | range |
|---|---|---|
| `suspects.seeThrough` | boolean |  |
| `suspects.holeCut` | boolean |  |
| `suspects.trunkFade` | boolean |  |
| `suspects.groundCover` | boolean |  |
| `suspects.glow` | boolean |  |
| `suspects.effectsLayer` | boolean |  |
| `suspects.haze` | boolean |  |
| `suspects.areaAverage` | boolean |  |
| `suspects.seeDepth` | boolean |  |
| `suspects.cutWhole` | boolean |  |
| `suspects.seeSplit` | boolean |  |
| `suspects.seeMark` | boolean |  |
| `suspects.mist` | boolean |  |
| `suspects.lightRings` | boolean |  |
| `suspects.seeWrite` | boolean |  |
| `suspects.seeCull` | boolean |  |
| `suspects.seeKeep` | boolean |  |
| `suspects.seeStencil` | boolean |  |
| `suspects.seeEarly` | boolean |  |
| `suspects.seeSolid` | string | "off" / "all" / "circle" / "rest" |
| `suspects.seeNoBlend` | boolean |  |
| `suspects.seeShowAlpha` | boolean |  |
| `suspects.showBroken` | boolean |  |
| `suspects.seeDither` | boolean |  |
| `suspects.seeTwo` | boolean |  |

### `occlusion`

Tall things standing in front of the witch fade where they cover her, so she's never lost from view.

Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.

| knob | type | range |
|---|---|---|
| `occlusion.on` | boolean |  |
| `occlusion.fadeOpacity` | number | 0 to … |
| `occlusion.edge` | number | 0 to … |
| `occlusion.minHeight` | number | 0 to … |
| `occlusion.silhouette` | number | 0 to … |

### `reveal`

Places of interest she stands in are kept clear: whatever stands in front of them and covers them fades away.

1. Ed, 2026-10-26: "When the witch stands in a legend circle, scenery in front of it should fade away"
2. "we might want this for other important points of interest, such as runestone areas, finds, flasks" (render/view/reveal.ts)
The places she stands in, kept clear [1][2]: while she stands on the ground within a place of interest, everything standing nearer the camera than its centre whose picture covers it (its ring on the ground and what stands at its centre, width by height metres) fades out whole. For these three, whatever stands within keep metres of the thing is never faded: the thing itself (a relic, the trunk and a runestone are stood toward the camera by part of their height, nearer than the spot they mark). A place fades over seconds as she walks in and back over seconds as she leaves.
Code: `render/view/reveal.ts`

- **`reveal.edge`**: (a share of the screen's width) and depth (metres) are how far past its box on screen and nearer than its centre each thing eases from gone to whole, so nothing snaps at a line. ?reveal=legend,runestone,find,flask (or all, or none) sets which are on.
- **`reveal.legend`**: a legend's circle (its own radius, its ring pad metres wider for the rim's stones, and its legend as drawn, asleep or awake).
- **`reveal.runestone`**: an area's runestone and its fight's open middle [1].
  1. Ed, 2026-10-26: "the fading area around a runestone is relatively small (say a 30m radius)" (within radius metres of the stone; ring metres round it boxed; 30 m since)
- **`reveal.runestone.bounded`**: (the runestone's): only what stands within radius metres of the thing fades, so the woods round a fight don't thin out past it.
- **`reveal.find`**: tonight's trunk or wreck, until it's taken.
- **`reveal.flask`**: Whether a lying relic flask is kept clear like the other places of interest.
  1. Ed, 2026-10-26: "All four on" (all four on since; the last three the pause page's toggles, and the runestone's radius its slider)
  a lying relic flask. Each on or off [1].

| knob | type | range |
|---|---|---|
| `reveal.seconds` | number | 0 to … |
| `reveal.edge` | number | 0 to … |
| `reveal.depth` | number | 0 to … |
| `reveal.legend.on` | boolean |  |
| `reveal.legend.pad` | number | 0 to … |
| `reveal.runestone.on` | boolean |  |
| `reveal.runestone.radius` | number | 0 to … |
| `reveal.runestone.ring` | number | 0 to … |
| `reveal.runestone.width` | number | 0 to … |
| `reveal.runestone.height` | number | 0 to … |
| `reveal.runestone.keep` | number | 0 to … |
| `reveal.runestone.bounded` | boolean |  |
| `reveal.find.on` | boolean |  |
| `reveal.find.radius` | number | 0 to … |
| `reveal.find.width` | number | 0 to … |
| `reveal.find.height` | number | 0 to … |
| `reveal.find.keep` | number | 0 to … |
| `reveal.flask.on` | boolean |  |
| `reveal.flask.radius` | number | 0 to … |
| `reveal.flask.width` | number | 0 to … |
| `reveal.flask.height` | number | 0 to … |
| `reveal.flask.keep` | number | 0 to … |

### `canopyShadow`

a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind.

| knob | type | range |
|---|---|---|
| `canopyShadow.on` | boolean |  |
| `canopyShadow.strength` | number | 0 to … |
| `canopyShadow.height` | number | 0 to … |
| `canopyShadow.cover` | number | 0 to … |
| `canopyShadow.wind` | number | 0 to … |

### `rig`

Creatures close to the camera on the ground are drawn with a live rig (moving limbs) rather than baked frames; legends always are.

1. Ed, 2026-10-05
The live rig [1]: on by default, ?rig=0 turns it off. Creatures keep their baked frames in the treetops, and on the ground when drawn smaller than minPx art pixels, except the levels in alwaysLevels: legends are always rigged. A sleeping area legend is rigged too: lying down, legs folded, head on the ground, eyes shut, breathing slowly, sunk sink of its height into the earth (the baked frames sink wildLegends.sink), its legs paddling and head jerking in a nightmare while restless. Woken (angry or happy) it gets up drowsily over wakeSecs seconds (an angry one angryWake times as long): its head comes up first, sags once, then it heaves itself up out of the ground; lulled back to sleep it settles down over settleSecs.

| knob | type | range |
|---|---|---|
| `rig.minPx` | number | 0 to … |
| `rig.alwaysLevels` | array of string |  |
| `rig.wakeSecs` | number | 0 to … |
| `rig.angryWake` | number | 0 to … |
| `rig.settleSecs` | number | 0 to … |
| `rig.sink` | number | 0 to … |

### `pathFade`

Every end of a path, road, railway or stream (where it stops, peters out or is broken) frays out over its last metres in an ordered dither on the art's pixel grid, broken up by noise (Ed, v149).

| knob | type | range |
|---|---|---|
| `pathFade.metres` | number | 0 to … |
| `pathFade.dither` | boolean |  |

### `trunkFade`

On the ground, where the crowns are hidden, each trunk's top fades out in a pixel dither instead of ending in a flat cut.

1. Ed: "We have really lost our treetrunks" (v271)
In ground mode, where the crowns are hidden, each tree's trunk fades out over its top metres in an ordered dither on the art's pixel grid (Ed, v149), instead of ending in a flat cut; over at most share of the trunk's visible height, so short trees keep a solid trunk (Ed, v233). Trunks stand in the canopy's shadow: never darker than lightFloor of their unlit look, with a rim from her glow; and the cut between trunk and crown is where crownShare of the crown's pixels lie above, not its lowest low bough [1].

| knob | type | range |
|---|---|---|
| `trunkFade.metres` | number | 0 to … |
| `trunkFade.share` | number | 0 to … |
| `trunkFade.dither` | boolean |  |
| `trunkFade.lightFloor` | number | 0 to … |
| `trunkFade.rim` | number | 0 to … |
| `trunkFade.crownShare` | number | 0 to … |

### `load`

The weight of her leashed creatures made visible: her sigil stack sags and leans toward the pull, and she leans and her broom bows as she flies away from it.

1. Ed, 2026-10-06: "We can make the mechanic obvious through the artwork." (render/load.ts)
Sigil weight, made visible [1]: the load her carried leashes put on her (the rules' leashLoad, by tension and weight) shows from nothing (the rules' leashLoad: its over, the pull past leash.weight.free, so the first few sigils change nothing) to full weight units over: her sigil stack sags (its gaps closing by up to stackSag) and leans toward the pull (stackLean metres a sigil); carried leashes' threads show from threadFrom of the leash's length (0.85 unloaded), taut and brighter (threadBright); flying away from the pull she leans forward (witchLean metres per metre up), her broom tilts nose-up (broomTilt) and its shaft bows (broomBow art pixels), sparks splaying back from its bristles (sparks a second); over the treetops, sinking (her lift below 1 in treetop mode, the rules' leash.weight), sparks fall away below her.
Code: `render/load.ts`

| knob | type | range |
|---|---|---|
| `load.on` | boolean |  |
| `load.full` | number | 0 to … |
| `load.stackSag` | number | 0 to … |
| `load.stackLean` | number | 0 to … |
| `load.threadFrom` | number | 0 to … |
| `load.threadBright` | number | 0 to … |
| `load.witchLean` | number | 0 to … |
| `load.broomTilt` | number | 0 to … |
| `load.broomBow` | number | 0 to … |
| `load.sparks` | number | 0 to … |

### `canopyCutout`

On the ground the forest roof stays drawn at the screen's edges, with a hole cut round her so she can be seen.

1. Ed: "the crown-hiding circle still has a very sharp edge" (round 7)
In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a hole round her is cut out, screenFraction of the screen's width across, its edge edge of the width wide. Each tree has its own radius for it, up to a fifth nearer or further [1], so no line runs across the canopy, and the edge fades over a wide band. Rising closes the hole. Each crown goes by its middle less half its half-size, so every crown counts a little nearer: the hole and its band came in to keep the roof at the screen's edges (screenFraction 1 -> 0.8, edge 0.5 -> 0.25, outer 0.8 -> 1: crowns fading from about 0.15 to 0.65 of the width out), and glowToCutout 1 -> 1.55 keeps her light's reach as it was. Ed, 2026-10-14 ("the canopy cut-away radius is too large"): screenFraction 0.8 -> 0.53 -> 0.4, glowToCutout 1.55 -> 1.95 -> 2.24 keeping her light's reach.

- **`canopyCutout.whole`**: How much the canopy hole fades each crown as a whole rather than pixel by pixel, so the crowns don't line up into rings.
  1. Ed, 2026-10-06: "I still see concentric circles while moving through dense forests in ground mode... If these had softer edges, it would be fine"
  2. Ed: "canopy cut-out circle is still very sharp"
  how much the fade goes by each crown's middle rather than by each pixel [1]: by pixel, every crown carried the same circular gradient and they lined up into rings; at 1 each crown fades as a whole. edge 0.2 -> 0.3 with it. Round 14 [2]: by the crown's middle, a big crown near the camera (its middle far off) stood whole right up to her and its edge read as a hard ring, so whole 0.75 -> 0.25 (mostly by pixel again) and the rings are broken another way: wobble, how far the hole's line wanders (a share of edge) by a slow noise on the ground, so the fade's lines aren't circles; outer, how far past the radius the fade reaches (a share of edge; 0.35 before), with edge 0.3 -> 0.5, so the canopy thins over a band several crowns deep. A trunk cut from its crown now fades its top in alpha too (smooth effects). Ed, 2026-10-06 ("circle": it still read as a round window, crowns and trunks sliced along its arc): the slicing was the fade going by each pixel, every crown crossing the band cut along the same circle; so whole 0.25 -> 1, each crown (and its trunk) fading as one, by its middle less half its half-size (a big crown over her goes too).
- **`canopyCutout.ragged`**: its outline's bays and points round her, a share of the radius, drifting slowly round.
- **`canopyCutout.spread`**: each tree's own radius spread round the hole's, a share of it (0.2 before), so the edge is several crowns deep and ragged.
- **`canopyCutout.lead`**: its middle leans that many seconds ahead of her the way she's going (eased), so the opening opens into her path.
- **`canopyCutout.hold`**: the share of the camera's way down (by its eased lift, which trails hers) the hole stays shut before it opens from nothing, its soft edge growing with it, and so the share of its way up by which it has shut [1]
  1. Ed's playtest, 2026-10-13: "the canopy hider activates as soon as the transition happens, when it should happen smoothly during the transition"

| knob | type | range |
|---|---|---|
| `canopyCutout.screenFraction` | number | 0 to … |
| `canopyCutout.edge` | number | 0 to … |
| `canopyCutout.whole` | number | 0 to … |
| `canopyCutout.wobble` | number | 0 to … |
| `canopyCutout.outer` | number | 0 to … |
| `canopyCutout.ragged` | number | 0 to … |
| `canopyCutout.spread` | number | 0 to … |
| `canopyCutout.lead` | number | 0 to … |
| `canopyCutout.hold` | number | 0 to … |

### `find`

Wild creatures are easier to find in the dark: their eyes shine pale gold in her light and they never go fully dark.

Finding wild creatures in the dark (Ed, v244: 'quite hard to see in the forest... I don't want to go overboard'): eyeshine, their eyes catching the light in pale gold (strength over their own colour, out to range metres from her, blinking about blink of the time; woken creatures' red eyes stay red); lightFloor, never darker than that share of their unlit look; rim, a faint rim from her glow on the edge facing her; and in place of tone.ambient, ambient, with a cooler, more coloured moon (moonHue, moonSat).

| knob | type | range |
|---|---|---|
| `find.eyeshine.range` | number | 0 to … |
| `find.eyeshine.strength` | number | 0 to … |
| `find.eyeshine.blink` | number | 0 to … |
| `find.lightFloor` | number | 0 to … |
| `find.rim` | number | 0 to … |
| `find.ambient` | number | 0 to … |
| `find.moonHue` | number | 0 to … |
| `find.moonSat` | number | 0 to … |

### `pixels`

The picture's pixels on the screen.

- **`pixels.snap`**: Each of the picture's pixels drawn a whole number of the screen's own pixels, the pixel size rounded to the nearest (render/view.ts resize; ?snap=0 off).
  1. Ed, 2026-10-29: "the pixels are just hard to read" (via the coordinator: measured at his 1.25 DPR as 3.75 device pixels a pixel, drawn 3 and 4 wide by turns (previews/ed/blur/); Ed picked rounding to the nearest)

| knob | type | range |
|---|---|---|
| `pixels.snap` | boolean |  |

## Light

Light, sky and mood (drawing only): glow, lights, shadows, haze, mist, smoke, the sky and moon, the looks, tone, bloom and tilt-shift.

### `telescope`

The telescope in the treehouse's crow's nest, which she can walk up to and look through full screen.

1. Ed, 2026-10-04
2. Ed: "so that you never go behind a bump" (v289)
3. Ed: "bumps are fine, it's cliffs that really show" (v297)
4. Ed: "remove the slope shading" (v276)
5. Ed, 2026-10-21: just the view, true to the island, nothing marked; rules/telescope.ts
6. Ed, 2026-10-23: "opens when you walk up to it, look around with aiming keys" (the mouse, the arrows, the d-pad and the right stick look round; walking her away, E or Esc leaves)
The rolling ground [1]: ground.hills lifts the ground and everything standing on it into broad swells up to amplitude metres up or down, scale metres across, in octaves layers of noise; drawing only, the game itself stays flat. Paths stay level across, and the ground is levelled into plateaus under the dancefloor, the treehouse, soundsystems, set pieces, the grounds and ponds. ?hills=0 turns it off; ?hills=<amplitude> tries another (6 gentle, 20 rolling, 40 the default: Ed, v289 "I guess hills=50 is just too much, maybe 40 is enough"). No slope may rise past the camera's sightline to her [2]: the hills are made at least 4.3 × amplitude / tan(the camera's shallowest pitch) metres across (300 at 40 m and 30°), so taller hills come broader, not steeper; and after everything is combined (the noise, the plateaus' and paths' easing) no slope anywhere is steeper than 0.85 of that pitch [3]: a cliff is cut and filled into a slope of the limit, gentler ground left as it is. Plateaus ease in over 2 times the amplitude and paths over 0.6 times, and sprites stand at the lowest ground under their foot. Off [4]: the fake relief (relief.strength 0; ?relief=0.9 brings its bumps back) and the slopes' exaggerated light (shade 1). shade: the light reads their slopes this many times steeper, so gentle swells (which trees can stand on upright) still show. relief (above) adds the small bumps on top. The telescope in the crow's nest [5]: walking up to it looks through it full screen [6], the night running on at the house's tenth, a compass strip along its top.
Code: `rules/telescope.ts`

- **`telescope.eye`**: the eye's height [1].
  1. Ed, 2026-10-23: "the telescope view should be 'higher'" (m over the ground at the hub, above its roof; 50 to 100)
- **`telescope.fovWide`, `telescope.fovClose`**: its field of view wide and close (degrees; the game's is 20).
- **`telescope.aimWide`**: how far out (m) the middle of the view looks at its lowest (as she first looks: at the forest).
- **`telescope.pan`, `telescope.tilt`**: degrees a second panning (left, right) and tilting [1] wide, slower zoomed in (alike on screen).
  1. Ed, 2026-10-22: up, down:, to look at the stars
- **`telescope.tiltMax`**: how far up it tilts (degrees).
- **`telescope.zoomStep`**: a step of the zoom (the wheel, Z and X, the gamepad's shoulder buttons; 0 wide to 1 close).
- **`telescope.bend`**: the world's bend inside it (the treetops' is camera.curve.treetop; gentler, so the far side stays in view).
- **`telescope.reach`**: tree crowns are drawn out to this many metres (the island's far side; past the scenery's radius crowns alone).
- **`telescope.hazeNear`, `telescope.hazeFar`**: its haze.
- **`telescope.thinFrom`, `telescope.thin`, `telescope.thinGrow`**: past thinFrom metres only one crown in thin is drawn, thinGrow times as big (the cheaper far forest).
- **`telescope.wedge`**: what's drawn is what lies within its view's width and this many degrees either side, listed again each half of it panned.
- **`telescope.moonSpread`**: the game's moon stands at a bearing round north, the game's view this many degrees across.
- **`telescope.consHold`, `telescope.consLines`, `telescope.consBright`**: tonight's constellation [1]: its stars' brightness (1 the sky's brightest), its faint dotted lines' strength, fading in once she's held the view on it consHold seconds.
  1. Ed, 2026-10-22: the trunk's find's outline in the stars, at its bearing, rules/constellations.ts
  Code: `rules/constellations.ts`
- **`telescope.resolution`**: its picture's resolution (1 the game's pixels, 2 twice as fine, 0.5 twice as coarse; up to 3).
- **`telescope.lowGpuResolution`**: on an integrated GPU (Intel), instead [1].
  1. Ed, 2026-10-23: "telescope view is too pixellated" (1, the game's:, at 0.5)
- **`telescope.vignette`**: how dark its edges (0 none).

| knob | type | range |
|---|---|---|
| `telescope.eye` | number | 0 to … |
| `telescope.fovWide` | number | 0 to … |
| `telescope.fovClose` | number | 0 to … |
| `telescope.aimWide` | number | 0 to … |
| `telescope.pan` | number | 0 to … |
| `telescope.tilt` | number | 0 to … |
| `telescope.tiltMax` | number | 0 to … |
| `telescope.zoomStep` | number | 0 to … |
| `telescope.bend` | number | 0 to … |
| `telescope.reach` | number | 0 to … |
| `telescope.hazeNear` | number | 0 to … |
| `telescope.hazeFar` | number | 0 to … |
| `telescope.thinFrom` | number | 0 to … |
| `telescope.thin` | number | 0 to … |
| `telescope.thinGrow` | number | 0 to … |
| `telescope.wedge` | number | 0 to … |
| `telescope.moonSpread` | number | 0 to … |
| `telescope.consHold` | number | 0 to … |
| `telescope.consLines` | number | 0 to … |
| `telescope.consBright` | number | 0 to … |
| `telescope.resolution` | number | 0 to … |
| `telescope.lowGpuResolution` | number | 0 to … |
| `telescope.vignette` | number | 0 to … |

### `smoke`

Smoke puffs rising from every fire (campfires, bonfires, torches, the charcoal burner) high into the sky before they fade.

Smoke from every fire (Ed, round 13: puffs rising high into the sky before dissipating; render/smoke.ts): the world's campfires, the party's campfires, bonfires and tiki torches, the charcoal burner's mound. Each fire sends up about rate puffs a second (at most perFire at once), each living life seconds: rising at speed m/s at first and slowing, up to rise metres (well over the 24 m treetops), drifting with the wind at drift m/s, starting size metres across and growing to (1 + grow) times that, thinning out before the end; opacity its strength (a cool grey, under the moon and the party's amber), warm how much of the fire's amber the lowest puffs catch underneath; pixel draws them in three stepped tones with a dithered edge at the art pixel (false: smooth). The nearest maxFires fires within range metres smoke, those near the edge fading.
Code: `render/smoke.ts`

- **`smoke.on`**: false turns it off.

| knob | type | range |
|---|---|---|
| `smoke.on` | boolean |  |
| `smoke.rate` | number | 0 to … |
| `smoke.life` | number | 0 to … |
| `smoke.rise` | number | 0 to … |
| `smoke.speed` | number | 0 to … |
| `smoke.size` | number | 0 to … |
| `smoke.grow` | number | 0 to … |
| `smoke.drift` | number | 0 to … |
| `smoke.opacity` | number | 0 to … |
| `smoke.warm` | number | 0 to … |
| `smoke.pixel` | boolean |  |
| `smoke.perFire` | number | 0 to … |
| `smoke.maxFires` | number | 0 to … |
| `smoke.range` | number | 0 to … |

### `sky`

The night sky that shows over the bend in treetop mode (on; ?sky=off leaves the plain dark background there, which costs nothing): stars (how many, 0-1), moon (brightness).

- **`sky.clouds`**: The clouds drifting high over the forest, lit from below by the party's colours.
  1. Ed, 2026-10-04: real ones, seen only from underneath, over the bend
  count (roughly how many to a screenful of sky), altitude (metres over the ground: above the treetop camera, so never between her and it), speed (m/s they drift), opacity (translucent: stars show through), partyGlow (how strongly what's beneath them lights their undersides: the partified areas' colours, pulsing on the beat; campfires faintly; over dormant forest they stay moonlit grey).
- **`sky.lightning`**: about every so many seconds a cloud in view flickers (flashes per strike), sometimes with a forked bolt toward the horizon.
- **`sky.lightning.ground`**: the faint flash on the forest (0 none).

| knob | type | range |
|---|---|---|
| `sky.on` | boolean |  |
| `sky.stars` | number | 0 to … |
| `sky.moon` | number | 0 to … |
| `sky.clouds.count` | number | 0 to … |
| `sky.clouds.altitude` | number | 0 to … |
| `sky.clouds.speed` | number | 0 to … |
| `sky.clouds.opacity` | number | 0 to … |
| `sky.clouds.partyGlow` | number | 0 to … |
| `sky.lightning.every` | number | 0 to … |
| `sky.lightning.flashes` | number | 0 to … |
| `sky.lightning.ground` | number | 0 to … |

### `moon`

The moon in the sky, and the odd red, blue or gold moon that comes and goes during a run.

1. Ed, 2026-10-06: "The moon should slowly change: occasionally becoming red, and blue, and yellow, and going through phases, and moving across the sky"
The moon [1]: one moon, drawn in the sky, tinting the moonlight a little, and shown on the dancefloor before the first wave (the same phase). Coloured moons: the run is cut into windows of colourEvery seconds, and in each but the first there's a colourChance of a red (blood), blue or gold (harvest) moon for colourTime seconds, easing in and out over colourFade.

- **`moon.phasePeriod`**: seconds from new moon to new moon.
- **`moon.phaseStart`**: its phase at the start (0 new, 0.25 first quarter, 0.5 full).
- **`moon.orbit`**: seconds to cross the sky once (it rises at the left from behind the far forest and sets at the right), from arcStart (0-1 of the way).
- **`moon.left`, `moon.right`**: how far across the screen it goes.
- **`moon.low`, `moon.high`**: the height of its way up the sky band (fractions of the screen from the bottom: low is behind the far forest).
- **`moon.colours`**: theirs (0-1 rgb).
- **`moon.tint`**: how much of its colour the moonlight on the world takes (0 none, 1 all).
- **`moon.bloodTint`**: the same for a red (blood) moon, a little more so it reads through the night grade (the rendering builder, #252).
- **`moon.disc`**: the sky moon's size, times its old one (1.5: a crescent survives the sky's tilt-shift blur, the art director, #252).
- **`moon.floor`**: the dancefloor's moon before the first wave [1]: palette (dusky violet, slate blue, soft silver, 0-255), size (the moon's radius, a share of the floor's), stars (the share of the floor's sky twinkling round it), flare (seconds the full moon flares out into the party when the first wave comes).
  1. Ed: "only phases of the moon, in muted twilight colours"

| knob | type | range |
|---|---|---|
| `moon.phasePeriod` | number | 0 to … |
| `moon.phaseStart` | number | 0 to … |
| `moon.orbit` | number | 0 to … |
| `moon.arcStart` | number | 0 to … |
| `moon.left` | number | 0 to … |
| `moon.right` | number | 0 to … |
| `moon.low` | number | 0 to … |
| `moon.high` | number | 0 to … |
| `moon.colourEvery` | number | 0 to … |
| `moon.colourChance` | number | 0 to … |
| `moon.colourTime` | number | 0 to … |
| `moon.colourFade` | number | 0 to … |
| `moon.colours.red` | array of number |  |
| `moon.colours.blue` | array of number |  |
| `moon.colours.gold` | array of number |  |
| `moon.tint` | number | 0 to … |
| `moon.bloodTint` | number | 0 to … |
| `moon.disc` | number | 0 to … |
| `moon.floor.palette` | array of array |  |
| `moon.floor.size` | number | 0 to … |
| `moon.floor.stars` | number | 0 to … |
| `moon.floor.flare` | number | 0 to … |

### `glowReach`

| knob | type | range |
|---|---|---|
| `glowReach` | number | 0 to … |

### `sigilSpill`

Placed sigils glow like small lights in their creature's neon, tinting the grass, the ground and whoever stands near.

The sigils' neon spilling onto the world (overnight phase 3, the art pass): each placed sigil is a small light in its creature's neon, height metres over its rune, reaching reach metres (15% more a level) at strength (0: off), eased in as it's written and breathing with the rune's pulse, so the grass round it, the ground and whoever stands near take its colour; the bottom sigil of her stack is a fainter one (stack, 0 off) reaching stackReach metres, stackHeight metres over her, tinting her and the ground under her as she carries it.

| knob | type | range |
|---|---|---|
| `sigilSpill.strength` | number | 0 to … |
| `sigilSpill.reach` | number | 0 to … |
| `sigilSpill.height` | number | 0 to … |
| `sigilSpill.stack` | number | 0 to … |
| `sigilSpill.stackReach` | number | 0 to … |
| `sigilSpill.stackHeight` | number | 0 to … |

### `fireworks`

The fireworks show over a soundsystem when a wave is celebrated.

1. Ed, 2026-10-07: when the wave reaches an area already cleared, its soundsystem already up, celebrate it: fireworks over that soundsystem, and its lasers on for good, its full party
The wave's celebration [1]: the rules' waveCelebrate (game.ts) starts a show of shells[0] to shells[1] shells over `over` seconds, the last `finale` going up together at the end, each rising rise[0] to rise[1] seconds from the soundsystem's top to height[0] to height[1] metres, up to drift metres off it, and bursting radius[0] to radius[1] metres across: round peonies, rings, drooping gold willows and crackling glitter, in the party's neons (rules/fireworks.ts: its schedule, from the event alone, so the sound's pops land on the bursts; render/fireworks.ts: the picture, a fixed pool of sparks the GPU flies). From then on that soundsystem's lasers stay fully on, every beam (render/lasers.ts).
Code: `rules/fireworks.ts`, `render/fireworks.ts`, `render/lasers.ts`

- **`fireworks.on`**: false turns the show off.

| knob | type | range |
|---|---|---|
| `fireworks.on` | boolean |  |
| `fireworks.shells` | array of number |  |
| `fireworks.over` | number | 0 to … |
| `fireworks.rise` | array of number |  |
| `fireworks.height` | array of number |  |
| `fireworks.radius` | array of number |  |
| `fireworks.drift` | number | 0 to … |
| `fireworks.finale` | number | 0 to … |

### `combatLight`

Her light shrinks while she explores a wild area and grows during a fight, so the fight is lit.

1. Ed, 2026-10-07: the wild forest darker for exploring; a darker forest makes a fight harder to read, so her light rises during one and settles after, too slowly to notice as an effect; render/combatLight.ts
Her light in the wild and in a fight [1]. Exploring an area the party hasn't reached, her light's reach and strength are times wildReach and wildGlow (the forest beyond her small pool darker); with a fight within range metres of her (any blow, wind-up or shot, her posse's or the wild's) in the last hold seconds, times fightReach and fightGlow instead (the fight lit, a little more than on party ground). Each eased: up over rise seconds, back over fall, shaped smooth. Drawing only.
Code: `render/combatLight.ts`

| knob | type | range |
|---|---|---|
| `combatLight.wildReach` | number | 0 to … |
| `combatLight.wildGlow` | number | 0 to … |
| `combatLight.fightReach` | number | 0 to … |
| `combatLight.fightGlow` | number | 0 to … |
| `combatLight.range` | number | 0 to … |
| `combatLight.hold` | number | 0 to … |
| `combatLight.rise` | number | 0 to … |
| `combatLight.fall` | number | 0 to … |

### `nightLight`

How far her light reaches when the camera is far out, over the treetops and while she stargazes on the beach.

1. Ed, 2026-10-06: "Seems very bright for nighttime"
her light reaches at most maxReach metres however far the camera is (stargazing, zoomed out), and over the treetops treetopReach metres at treetopGlow of its strength, eased in as she rises, so the canopy stays moonlit with a lantern's warm glow round her; lying on the beach to stargaze, at most gazeReach metres.

| knob | type | range |
|---|---|---|
| `nightLight.maxReach` | number | 0 to … |
| `nightLight.treetopReach` | number | 0 to … |
| `nightLight.treetopGlow` | number | 0 to … |
| `nightLight.gazeReach` | number | 0 to … |

### `glowFalloff`

how fast it falls off, as (1 - distance/(reach × glowNear))^glowFalloff. ?glow=<reach>,<falloff>,<near> in the URL fixes the reach (glowReach metres), the falloff and the near share, to try values live.

| knob | type | range |
|---|---|---|
| `glowFalloff` | number | 0 to … |

### `glowNear`

the share of that reach where her light has fallen to dark [1].

1. Ed: "a bit flat, it should fall off closer" (round 11; 1 lit all the way to the hole's edge)

| knob | type | range |
|---|---|---|
| `glowNear` | number | 0 to … |

### `glowToCutout`

| knob | type | range |
|---|---|---|
| `glowToCutout` | number | 0 to … |

### `glowHeight`

| knob | type | range |
|---|---|---|
| `glowHeight` | number | 0 to … |

### `lightBudget`

how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once.

| knob | type | range |
|---|---|---|
| `lightBudget` | number | 0 to … |

### `lights`

How far (reach, metres) and how strongly each kind of light lights its surroundings.

- **`lights.find`**: tonight's find's own pale gold-white light (the finds style guide, docs/art-guide/FINDS.md: the brightest and whitest thing on its patch, brighter than her lantern; out once it's taken).
  Code: `docs/art-guide/FINDS.md`
- **`lights.knee`, `lights.ceiling`**: Bright lights ease off toward a ceiling instead of burning to white, so lit ground keeps its texture.
  1. Ed, 2026-10-12: "soundsystems lighting tends to blow out" (render/lighting.ts softKnee)
  the light falling on a pixel, every source summed, passes unchanged up to knee of brightness, then eases toward ceiling and never past it, in its own hue, so the ground round a soundsystem's party light, campfires and her glow stays under white and keeps its texture; ceiling at or under knee turns it off.
  Code: `render/lighting.ts`

| knob | type | range |
|---|---|---|
| `lights.find.reach` | number | 0 to … |
| `lights.find.strength` | number | 0 to … |
| `lights.campfire.reach` | number | 0 to … |
| `lights.campfire.strength` | number | 0 to … |
| `lights.stone.reach` | number | 0 to … |
| `lights.stone.strength` | number | 0 to … |
| `lights.knee` | number | 0 to … |
| `lights.ceiling` | number | 0 to … |

### `glowPower`

How bright the witch's own glow is, brightest under her and fading smoothly to dark at its reach.

the witch's own glow at its brightest (0-1; 0.95, a bright centre that drops quickly to dark, round 11), full under her, falling off as glowFalloff says out to glowNear of her reach, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.

| knob | type | range |
|---|---|---|
| `glowPower` | number | 0 to … |

### `light`

The night lighting's overall mood: the spooky grade over the plain light, and the moon's fill on everything facing up.

1. Ed, 2026-10-06: "make it a spooky dark forest with a party in it" (render/mood.ts)
The lighting's mood [1]: mood spooky lays this grade over the Art Lab's night light, plain is the light as it was (?light=plain or ?light=spooky to compare). Round 2 (the art director): moonUp, the moon's fill on whatever faces up (canopy tops, open ground) as a share of the moon, so the dark middle distance still reads (0 none); leyRgb and leyBright, the ley line in the HUD's amber at half its brightness, a guide rather than a light (leave leyRgb out for each area's own colour); berryHalo and berryGlow, a berry's halo's size and strength as shares of the old 2.8 m soft disc, so a berry reads as a crisp dot with a small glow. Round 3: moonUpHue and moonUpSat, the moon fill's own hue and saturation (green-cyan and pale, so the woods are blue-green with violet only in the shadows; left out, the moon's).
Code: `render/mood.ts`

- **`light.spooky`**: ambientHue and ambient (times the tuning's ambient): the shadows' colour and brightness, a deep blue-green.
- **`light.spooky.moonHue`, `light.spooky.moonSat`, `light.spooky.moon`**: (times tone.moon): a colder moon, a little stronger, so it rims what it lights.
- **`light.spooky.hazeHue`, `light.spooky.hazeSat`, `light.spooky.haze`**: (its brightness, 0 to 1): the fog the forest fades into, violet.
- **`light.spooky.hazeNear`, `light.spooky.hazeFar`**: where the fog starts and is whole (metres from the witch; nearer than haze.near and haze.far, which still set how far scenery is drawn).
- **`light.spooky.mist`**: the low ground mist's strength (instead of mist.strength).
- **`light.spooky.glowHue`, `light.spooky.glowSat`**: the witch's glow, warmer, so the party's lights are the warm ones in the wood.
- **`light.spooky.grade`, `light.spooky.gradeDesat`, `light.spooky.gradePivot`, `light.spooky.gradeHue`, `light.spooky.gradeSat`**: a grade over the finished picture, draining the dark and middle tones' colour (gradeDesat of it) toward a cold tint (hue and saturation), by grade [1], fading out up to gradePivot brightness, so the bright warm lights keep their colour.
  1. 2026-10-26: 0 off: Ed's tuned value from the pause page, v4522, and so the areas' grade tints with it
- **`light.spooky.partyWarm`, `light.spooky.partyReach`, `light.spooky.partyStrength`**: the soundsystems' light, warm amber, pink and gold (one per variant, instead of their crystal cyan, violet and amber), wider and stronger.
- **`light.spooky.decorLights`, `light.spooky.decorReach`, `light.spooky.decorStrength`**: the party decor's lights (lanterns, campfires), how many an area lights (instead of partyObjects.lightsPerArea) and how far and strong, so each party is pools of warm light with dark between.
- **`light.spooky.rimHue`, `light.spooky.rimSat`, `light.spooky.rim`**: A thin moonlit edge on the witch and every creature, so they stand out against the dark.
  1. Ed, 2026-10-06: "Animal legs have outlines on them; they'd look better without"
  a moonlight rim on the characters (the witch and every creature, baked or rigged), a light edge one art pixel wide on the side away from the moon in the night sky's blue-violet, at rim strength (0 off), so they read against the dark (the art director, round 1), only where the sprite is three pixels thick or more and never on the live rig's leg discs [1].
- **`light.spooky.witchGlow`**: how much of her own glow lights the witch herself (0: none, as before), so she stands in her pool of light.
- **`light.spooky.moonUpWrap`**: How evenly the moon's fill lights every face, so tree crowns don't light up as a lattice of dots.
  the share of that fill every face gets whatever its normal (0: by its normal alone), so a crown's regular bumps don't light up as a lattice of dots. Round 4: decorWarm, how far the party decor's point lights go from their neon to the party's amber (an area's neon pieces lit its ground lime; the neon stays on the bulbs, the pool stays warm).
- **`light.spooky.styledRim`, `light.spooky.styledGlow`**: Extra rim and glow on the witch in the bold and reference art styles, where she would otherwise vanish in her own light.
  with ?style=bold or ref, the rim's strength and her own glow on her, in place of rim and witchGlow (the styles bake dark tones with flat normals, so she needs more to stand out in her own pool). witchLift and styledLift: her pool's light thrown back up onto her, added rather than multiplied, so even dark tones lift (0 in the default style; styledLift with bold or ref, where she otherwise vanishes in her own pool).
- **`light.spooky.areaEase`**: how fast the mood eases from one area's to the next (a second).
- **`light.spooky.areas`**: Each kind of area's own fog colour, tint and mist (teal over bogs, violet in dead woods, pale mist on the moor and so on).
  each area type's own fog (hazeHue, hazeSat, haze), grade tint (gradeHue, gradeSat) and mist over the above, by area id ("home" for home): misty teal over the bogs and water, violet-grey in the dead and ancient woods, blue-violet in the bluebells, pale mist on the open moor, darker in the rocky places, near-black green under the pines, rosy in the honeysuckle and gardens, home a little less cold.
- **`light.spooky.unlit`**: How dark the forest is where nothing lights it: the ambient and the moonlight on ground, trees, bushes and creatures times this, while the lights (her glow, the party's, fires, lava, runestones, sigils) stay as they are (1 as before).
  1. Ed's playtest, 2026-10-29: "Contrast on the visuals seems low; the important parts of the scene don't stand out very well. The unlit forest needs to be darker." (v5399; measured with tools/shot/contrast.cjs)
  Code: `render/lighting.ts`, `render/view.ts`

| knob | type | range |
|---|---|---|
| `light.mood` | string |  |
| `light.spooky.ambientHue` | number | 0 to … |
| `light.spooky.ambient` | number | 0 to … |
| `light.spooky.unlit` | number | 0 to … |
| `light.spooky.moonHue` | number | 0 to … |
| `light.spooky.moonSat` | number | 0 to … |
| `light.spooky.moon` | number | 0 to … |
| `light.spooky.hazeHue` | number | 0 to … |
| `light.spooky.hazeSat` | number | 0 to … |
| `light.spooky.haze` | number | 0 to … |
| `light.spooky.hazeNear` | number | 0 to … |
| `light.spooky.hazeFar` | number | 0 to … |
| `light.spooky.mist` | number | 0 to … |
| `light.spooky.glowHue` | number | 0 to … |
| `light.spooky.glowSat` | number | 0 to … |
| `light.spooky.grade` | number | 0 to … |
| `light.spooky.gradeDesat` | number | 0 to … |
| `light.spooky.gradePivot` | number | 0 to … |
| `light.spooky.gradeHue` | number | 0 to … |
| `light.spooky.gradeSat` | number | 0 to … |
| `light.spooky.partyWarm` | array of array |  |
| `light.spooky.partyReach` | number | 0 to … |
| `light.spooky.partyStrength` | number | 0 to … |
| `light.spooky.decorLights` | number | 0 to … |
| `light.spooky.decorReach` | number | 0 to … |
| `light.spooky.decorStrength` | number | 0 to … |
| `light.spooky.decorWarm` | number | 0 to … |
| `light.spooky.rimHue` | number | 0 to … |
| `light.spooky.rimSat` | number | 0 to … |
| `light.spooky.rim` | number | 0 to … |
| `light.spooky.witchGlow` | number | 0 to … |
| `light.spooky.moonUp` | number | 0 to … |
| `light.spooky.moonUpHue` | number | 0 to … |
| `light.spooky.moonUpSat` | number | 0 to … |
| `light.spooky.moonUpWrap` | number | 0 to … |
| `light.spooky.styledRim` | number | 0 to … |
| `light.spooky.styledGlow` | number | 0 to … |
| `light.spooky.styledLift` | number | 0 to … |
| `light.spooky.leyRgb` | string |  |
| `light.spooky.leyBright` | number | 0 to … |
| `light.spooky.berryHalo` | number | 0 to … |
| `light.spooky.berryGlow` | number | 0 to … |
| `light.spooky.areaEase` | number | 0 to … |
| `light.spooky.areas.tundra-bog.hazeHue` | number | 0 to … |
| `light.spooky.areas.tundra-bog.hazeSat` | number | 0 to … |
| `light.spooky.areas.tundra-bog.haze` | number | 0 to … |
| `light.spooky.areas.tundra-bog.mist` | number | 0 to … |
| `light.spooky.areas.tundra-bog.gradeHue` | number | 0 to … |
| `light.spooky.areas.wetland.hazeHue` | number | 0 to … |
| `light.spooky.areas.wetland.hazeSat` | number | 0 to … |
| `light.spooky.areas.wetland.haze` | number | 0 to … |
| `light.spooky.areas.wetland.mist` | number | 0 to … |
| `light.spooky.areas.wetland.gradeHue` | number | 0 to … |
| `light.spooky.areas.beaver-pond.hazeHue` | number | 0 to … |
| `light.spooky.areas.beaver-pond.hazeSat` | number | 0 to … |
| `light.spooky.areas.beaver-pond.haze` | number | 0 to … |
| `light.spooky.areas.beaver-pond.mist` | number | 0 to … |
| `light.spooky.areas.beaver-pond.gradeHue` | number | 0 to … |
| `light.spooky.areas.mangrove-channel.hazeHue` | number | 0 to … |
| `light.spooky.areas.mangrove-channel.hazeSat` | number | 0 to … |
| `light.spooky.areas.mangrove-channel.haze` | number | 0 to … |
| `light.spooky.areas.mangrove-channel.mist` | number | 0 to … |
| `light.spooky.areas.mangrove-channel.gradeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.hazeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.hazeSat` | number | 0 to … |
| `light.spooky.areas.deadwood.haze` | number | 0 to … |
| `light.spooky.areas.deadwood.gradeHue` | number | 0 to … |
| `light.spooky.areas.deadwood.gradeSat` | number | 0 to … |
| `light.spooky.areas.ancient.hazeHue` | number | 0 to … |
| `light.spooky.areas.ancient.hazeSat` | number | 0 to … |
| `light.spooky.areas.ancient.haze` | number | 0 to … |
| `light.spooky.areas.ancient.gradeHue` | number | 0 to … |
| `light.spooky.areas.ancient.gradeSat` | number | 0 to … |
| `light.spooky.areas.log-pile.hazeHue` | number | 0 to … |
| `light.spooky.areas.log-pile.hazeSat` | number | 0 to … |
| `light.spooky.areas.log-pile.haze` | number | 0 to … |
| `light.spooky.areas.log-pile.gradeHue` | number | 0 to … |
| `light.spooky.areas.log-pile.gradeSat` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.hazeHue` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.gradeHue` | number | 0 to … |
| `light.spooky.areas.bluebell-glade.mist` | number | 0 to … |
| `light.spooky.areas.wispy-forest.hazeHue` | number | 0 to … |
| `light.spooky.areas.wispy-forest.gradeHue` | number | 0 to … |
| `light.spooky.areas.wispy-forest.mist` | number | 0 to … |
| `light.spooky.areas.moor.hazeHue` | number | 0 to … |
| `light.spooky.areas.moor.hazeSat` | number | 0 to … |
| `light.spooky.areas.moor.haze` | number | 0 to … |
| `light.spooky.areas.moor.mist` | number | 0 to … |
| `light.spooky.areas.heath.hazeHue` | number | 0 to … |
| `light.spooky.areas.heath.hazeSat` | number | 0 to … |
| `light.spooky.areas.heath.haze` | number | 0 to … |
| `light.spooky.areas.heath.mist` | number | 0 to … |
| `light.spooky.areas.grassland.hazeHue` | number | 0 to … |
| `light.spooky.areas.grassland.hazeSat` | number | 0 to … |
| `light.spooky.areas.grassland.haze` | number | 0 to … |
| `light.spooky.areas.grassland.mist` | number | 0 to … |
| `light.spooky.areas.jungle-cave.haze` | number | 0 to … |
| `light.spooky.areas.jungle-cave.gradeHue` | number | 0 to … |
| `light.spooky.areas.jungle-cave.gradeSat` | number | 0 to … |
| `light.spooky.areas.ravine.haze` | number | 0 to … |
| `light.spooky.areas.ravine.gradeHue` | number | 0 to … |
| `light.spooky.areas.ravine.gradeSat` | number | 0 to … |
| `light.spooky.areas.rocky-slope.haze` | number | 0 to … |
| `light.spooky.areas.rocky-slope.gradeHue` | number | 0 to … |
| `light.spooky.areas.rocky-slope.gradeSat` | number | 0 to … |
| `light.spooky.areas.old-pinewood.hazeHue` | number | 0 to … |
| `light.spooky.areas.old-pinewood.hazeSat` | number | 0 to … |
| `light.spooky.areas.old-pinewood.haze` | number | 0 to … |
| `light.spooky.areas.old-pinewood.gradeHue` | number | 0 to … |
| `light.spooky.areas.jungle-understory.hazeHue` | number | 0 to … |
| `light.spooky.areas.jungle-understory.hazeSat` | number | 0 to … |
| `light.spooky.areas.jungle-understory.haze` | number | 0 to … |
| `light.spooky.areas.jungle-understory.gradeHue` | number | 0 to … |
| `light.spooky.areas.honeysuckle-tangle.hazeHue` | number | 0 to … |
| `light.spooky.areas.honeysuckle-tangle.hazeSat` | number | 0 to … |
| `light.spooky.areas.snowy-taiga.hazeHue` | number | 0 to … |
| `light.spooky.areas.snowy-taiga.hazeSat` | number | 0 to … |
| `light.spooky.areas.berry-thicket.hazeHue` | number | 0 to … |
| `light.spooky.areas.berry-thicket.hazeSat` | number | 0 to … |
| `light.spooky.areas.home.gradeHue` | number | 0 to … |
| `light.spooky.areas.home.gradeSat` | number | 0 to … |
| `light.spooky.areas.home.mist` | number | 0 to … |

### `lightSources`

Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire [1], a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor). [2]

1. Ed, 2026-10-04: shown only once its area is partified: campfires are party objects; they light up with a whoosh of sparks as the party arrives
2. Ed, 2026-10-11: ponds a quarter of before, pond 0.02 to 0.005 and wetPond 0.12 to 0.03.

| knob | type | range |
|---|---|---|
| `lightSources.spacing` | number | 0 to … |
| `lightSources.campfire` | number | 0 to … |
| `lightSources.magicStone` | number | 0 to … |
| `lightSources.pond` | number | 0 to … |
| `lightSources.wetPond` | number | 0 to … |

### `haze`

the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far.

| knob | type | range |
|---|---|---|
| `haze.near` | number | 0 to … |
| `haze.far` | number | 0 to … |

### `shadows`

a small contact shadow under the witch, each bush, creature and prop; Ed's tuned values [1]: strength 0.75, long 2.5, glowReach 50, glowHeight 1.25, soft, core 0.8, across 1, and lights.campfire.reach 40.

1. 2026-10-12

- **`shadows.trees`**: a crown-sized shadow under every tree too, cast away from the moon [1].
  1. Ed, 2026-10-03: off
- **`shadows.tint`**: every shadow (scenery's, the trees' and palms', and the blobs under creatures, the witch, bushes and small things) at its darkest goes from black toward the complement of the light it lies in by tint (0: black): a campfire's orange throws blue-violet, plain moonlight a warm shade.
  1. Ed, 2026-10-12: "Runestones and especially soundsystems are bright with coloured light; they should have shadows but they shouldn't be black. Can we have complementary colours in shadows cheaply?"
  2. 2026-10-13: "colour all the shadows"
- **`shadows.cast`**: Creatures, the witch, bushes and props darken where trunk and scenery shadows fall on them, not just the ground.
  1. Ed, 2026-10-13: "shadows should darken the things that they land on ... it should be everything"
  what stands in the trunks', palms' and scenery's shadows (creatures, the witch, bushes, props, scenery) is darkened and tinted by them where they fall on it, from a map of them drawn from above round her (render/castShadows.ts); off, only the ground and grass; castRes is that map's texels across (1024: 6.4 a metre over 160 m; 512 is a quarter of the texels to clear and draw each frame, for a weaker GPU).
  Code: `render/castShadows.ts`
- **`shadows.trunks.foot`, `shadows.trunks.near`, `shadows.trunks.cover`**: How a trunk's shadow fades in at its foot, widens, fades as she comes close, and darkens the grass it falls on.
  1. Ed, 2026-10-12: "they should fade out at the bottom of the tree" … "when you're close to the tree" (for her glow's and the campfires' alike)
  2. "The shadows should darken other foliage that they cast upon" (and)
  a trunk's shadow fades in from nothing over foot metres from its foot (0: none) and opens out from a third of its width over taper metres (0: none; Ed: roots and decorations "get wide at the base, that look strange when they're rotated"), fades to nothing as she comes within near metres of its trunk (0: never), and darkens the ground cover it falls on (grass, flowers, tufts) at cover times its strength (0: not at all).
- **`shadows.trunks.scenery`, `shadows.trunks.sceneryMin`**: Scenery (ruins, rocks, relics, runestones, soundsystems) casts shadows from her glow and the fires too.
  1. Ed, 2026-10-12: "Scenery (temples etc) should also cast them" … "Runestones and soundsystems should also cast shadows"
  scenery casts the same shadows from her glow and the fires, untapered (its foot is its own width): set pieces, ruins, rocks and freak trees, modern and quest relics, the scenes' pieces (temples, castles, cemeteries...), the runestones and the soundsystems; pieces under sceneryMin metres tall cast none.
- **`shadows.trunks.glowLight`**: a glowing caster's (a runestone, a soundsystem) toward a soft shade of its own colour by glowLight (0: as dark as any).
- **`shadows.trunks.sceneryFoot`**: scenery's shadow, cast from its middle, fades in from nothing over its own half-width and sceneryFoot metres past it (0: none).
  1. Ed, 2026-10-12: "Runestones shadow should fade at the base"
- **`shadows.trunks.sceneryTaper`**: scenery's shadow is pinched to a third at its foot and opens to full over its half-width and sceneryTaper times its width past it (a wide ruin over more ground than a narrow runestone; at most 0.6 of its shadow's length; 0: none).
  1. Ed, 2026-10-12: "What about tapering?"
- **`shadows.trunks.lightReach`**: how far a soundsystem's or a runestone's light throws the trees', props' and scenery's shadows, in metres (0: none), past its own glow's reach so the trees round its clearing catch it [2].
  1. Ed, 2026-10-13: "the light that soundsystems and runestones produce" (should make the trees cast shadows)
  2. Ed, 2026-10-13: "Try band at 50" … "reduce the clearing size to 15m" (its clearing: arena.radius 5, noise 0.05 and band 50 (:), Ed:: the nearest trees about 15 m from it)

| knob | type | range |
|---|---|---|
| `shadows.on` | boolean |  |
| `shadows.strength` | number | 0 to … |
| `shadows.trees` | boolean |  |
| `shadows.tint` | number | 0 to … |
| `shadows.cast` | boolean |  |
| `shadows.castRes` | number | 0 to … |
| `shadows.trunks.mode` | string |  |
| `shadows.trunks.strength` | number | 0 to … |
| `shadows.trunks.long` | number | 0 to … |
| `shadows.trunks.glowReach` | number | 0 to … |
| `shadows.trunks.glowHeight` | number | 0 to … |
| `shadows.trunks.across` | number | 0 to … |
| `shadows.trunks.core` | number | 0 to … |
| `shadows.trunks.foot` | number | 0 to … |
| `shadows.trunks.taper` | number | 0 to … |
| `shadows.trunks.near` | number | 0 to … |
| `shadows.trunks.cover` | number | 0 to … |
| `shadows.trunks.scenery` | boolean |  |
| `shadows.trunks.sceneryMin` | number | 0 to … |
| `shadows.trunks.glowLight` | number | 0 to … |
| `shadows.trunks.sceneryFoot` | number | 0 to … |
| `shadows.trunks.sceneryTaper` | number | 0 to … |
| `shadows.trunks.lightReach` | number | 0 to … |

### `attacks`

The composable attacks (docs/plans/attack-grammar.md, src/rules/attacks/): reactionFloor, the least warning (s) any attack and each child it makes gives from its first telegraph to its first harm [1]; one under it is lengthened to it, silently in the game, said so in the Fight Arena.

1. Ed, 2026-10-27: "we can tune in balancing" (0.45 s)
Code: `docs/plans/attack-grammar.md`

- **`attacks.species`**: every species fights with its own attack in the grammar (config/species-attacks.json, by biome and island phase), its kind's own moves and its pack's turns as before; false (?attacks=old) the old ones.
  1. Ed, 2026-10-27: "go ahead and merge them"
  Code: `config/species-attacks.json`

| knob | type | range |
|---|---|---|
| `attacks.reactionFloor` | number | 0 to … |
| `attacks.species` | boolean |  |

### `gpu`

How much graphics memory the game lets itself use, letting go of the art used longest ago when it's over.

1. the coordinator's ask, 2026-10-26: Ed-approved; render/gpuLedger.ts counts every texture and render buffer at the GL calls, render/view/gpuBudget.ts keeps it
The game-wide GPU memory budget [1]: mb MB for a window of refWidth x refHeight physical pixels, scaled by this window's (Google Maps' rule), never under floor nor over ceil. Every every seconds, over it, the art used longest ago (an area type's trees, a creature set, a rig page) is let go till it's under headroom of the budget, nothing used in the last keep seconds (what's on screen is used every frame); it comes back from the art cache when wanted. GL's out-of-memory error, read every errorEvery seconds (each read waits on the GPU), lowers the budget to headroom of what was held then.
Code: `render/gpuLedger.ts`, `render/view/gpuBudget.ts`

| knob | type | range |
|---|---|---|
| `gpu.mb` | number | 0 to … |
| `gpu.refWidth` | number | 0 to … |
| `gpu.refHeight` | number | 0 to … |
| `gpu.floor` | number | 0 to … |
| `gpu.ceil` | number | 0 to … |
| `gpu.headroom` | number | 0 to … |
| `gpu.keep` | number | 0 to … |
| `gpu.every` | number | 0 to … |
| `gpu.errorEvery` | number | 0 to … |

### `mist`

A low mist drifting just above the ground.

a low drifting mist (height in metres above the ground). Each has on and strength.

| knob | type | range |
|---|---|---|
| `mist.on` | boolean |  |
| `mist.strength` | number | 0 to … |
| `mist.height` | number | 0 to … |
| `mist.wind` | number | 0 to … |
| `mist.gain` | number | 0 to … |

### `loadingMist`

A glowing mist over the parts of the island still loading, rolling back from the treehouse as their trees arrive.

1. Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes. If loading starts with areas closer to the treehouse, this will look fine"
2. "make the mist roll away progressively away from the treehouse instead of all at once" (render/loadingMist.ts)
The loading mist [1][2]: while the island is still being drawn (its trees one set an area type, nearest the treehouse first), every area whose trees aren't in yet lies under a low glowing night mist, in layers sheets up to height metres over the ground, each at most density opaque (the low ones thickest), in hard steps, glow times as bright as the night's mist. When a type's trees land, its mist rolls back off its areas as a front moving out from the treehouse at speed m/s, and what it hasn't reached cap seconds after the trees landed (the far rim) fades out over a second.
Code: `render/loadingMist.ts`

- **`loadingMist.soft`**: the front's soft edge (m either side), size: its rolling noise (m).
- **`loadingMist.sea`**: The loading mist lies over the sea too and burns off last, once all the land is in.
  1. Ed: "Maybe it should also appear over the water and burn off there too"
  it lies over the water too, out to sea metres past the island's furthest ground, thinning, and burns off last, as its own front from the treehouse once the land's all in [1]; 0 none. Areas drawn before the first frame (a revisit's, from the art cache) never have any. Off under ?quick=1; ?loadmist=1\|0 for one load, ?artdelay=<s> to land the trees drawn ahead of need one every that many seconds and watch it.

| knob | type | range |
|---|---|---|
| `loadingMist.on` | boolean |  |
| `loadingMist.layers` | number | 0 to … |
| `loadingMist.height` | number | 0 to … |
| `loadingMist.density` | number | 0 to … |
| `loadingMist.glow` | number | 0 to … |
| `loadingMist.speed` | number | 0 to … |
| `loadingMist.cap` | number | 0 to … |
| `loadingMist.soft` | number | 0 to … |
| `loadingMist.size` | number | 0 to … |
| `loadingMist.sea` | number | 0 to … |

### `lightRings`

Faint rings of moonlight across the treetops (now switched off), and the glory round her shadow on the leaves (off too).

1. Ed, 2026-10-07: "a halo / circle optical illusion: faint concentric rings of moonlight in the canopy, visible from treetop view" (making the wild forest eerier; render/lightRings.ts)
2. Ed, 2026-10-08: "there's now concentric circles under the witch on the canopy ... I think we should remove them"
3. Ed, 2026-10-11: strength 0
Light rings in the canopy [1]: one pass over the screen in the half-size effects layer that lights only what stands at crown height (above metres or more over the ground), never the floor. Centres seeded on a spacing-metre grid (a share of its cells has one), each count faint bands of moonlight out to radius metres, breathing outward at speed bands a second, laid on a level sheet plane metres up (about the crowns' tops: the crowns are upright sprites, so it's where the line of sight crosses that sheet that is ringed); They fade out between fadeNear and fadeFar metres from her. And the glory: rings of moonlight round her own shadow on the leaves (the halo you see round your shadow on dewy foliage), glory metres across at gloryStrength, faintly prismatic, going with her; off (gloryStrength 0) since [2]. Treetops only (fading in as she rises). Scattered rings off [3]; the glory is off too (gloryStrength 0), and the pass is skipped while both are 0.
Code: `render/lightRings.ts`

- **`lightRings.strength`**: a band at its brightest (in the moon's hue, paled), added as light.

| knob | type | range |
|---|---|---|
| `lightRings.on` | boolean |  |
| `lightRings.strength` | number | 0 to … |
| `lightRings.radius` | number | 0 to … |
| `lightRings.count` | number | 0 to … |
| `lightRings.spacing` | number | 0 to … |
| `lightRings.share` | number | 0 to … |
| `lightRings.above` | number | 0 to … |
| `lightRings.speed` | number | 0 to … |
| `lightRings.plane` | number | 0 to … |
| `lightRings.glory` | number | 0 to … |
| `lightRings.gloryStrength` | number | 0 to … |
| `lightRings.fadeNear` | number | 0 to … |
| `lightRings.fadeFar` | number | 0 to … |

### `holograms`

Each soundsystem projects a turning hologram of its area's animal sigil into the sky above the trees.

1. Ed, 2026-10-08: "soundsystems should project their animal sigil into the sky once they're activated, readable from the treetops but in a different character to how the leashing sigils look from treetop; maybe a hologram or peppers ghost or something, replacing the laser we have now" (render/hologram.ts)
The soundsystems' sky sigils [1]: each standing soundsystem's projector throws a translucent cone of light from the top of its stack to a hologram of its area's animal sigil over the canopy, in the area's crystal colour, with scanlines, a drifting interference band and a colour fringe, turning gently and bobbing. The glyph is drawn at the sky's depth, so the tilt-shift leaves it nearly as sharp as the stars.
Code: `render/hologram.ts`

- **`holograms.size`**: the glyph (m across: under about 20 its one-pixel strokes are finer than the treetop view's pixels and it smears).
- **`holograms.lift`**: how high its middle floats over the projector (m).
- **`holograms.glyph`, `holograms.cone`**: how bright (added light; past about 0.7 the bloom swallows its outline).
- **`holograms.powerUp`**: the flicker as it comes on when the soundsystem has risen (s).
- **`holograms.collapse`**: how long it takes to fold to a line and go out when the soundsystem is destroyed (s).
- **`holograms.turn`**: how far it turns either way (degrees).
- **`holograms.bob`**: how far it bobs (m).
- **`holograms.fadeFar`**: How far from her a soundsystem's hologram fades out; a damaged soundsystem's hologram glitches.
  it fades out towards this many metres from her. Damaged, it glitches, worse at each of the soundsystem's damage stages (below 75%, 50% and 25% of its health).

| knob | type | range |
|---|---|---|
| `holograms.on` | boolean |  |
| `holograms.size` | number | 0 to … |
| `holograms.lift` | number | 0 to … |
| `holograms.glyph` | number | 0 to … |
| `holograms.cone` | number | 0 to … |
| `holograms.powerUp` | number | 0 to … |
| `holograms.collapse` | number | 0 to … |
| `holograms.turn` | number | 0 to … |
| `holograms.bob` | number | 0 to … |
| `holograms.fadeFar` | number | 0 to … |

### `watching`

Leafy plants near her path lean toward where she just was, as if the trees are watching her.

1. Ed, 2026-10-07: "canopy tips within a few metres of her sway a beat late and slightly TOWARDS her, as if the trees lean in to watch" (making the wild forest eerier; render/sprites.ts uWatch)
The trees watching her [1]: a leafy thing standing within radius metres of where she was lag seconds ago (eased behind her) leans its tip lean metres that way across the screen, none at its foot; full within 0.4 of the radius. A shader nudge, nothing new drawn; keep it small.
Code: `render/sprites.ts`

| knob | type | range |
|---|---|---|
| `watching.on` | boolean |  |
| `watching.radius` | number | 0 to … |
| `watching.lean` | number | 0 to … |
| `watching.lag` | number | 0 to … |

### `moonbeams`

How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.

| knob | type | range |
|---|---|---|
| `moonbeams` | number | 0 to … |

### `looks`

How creatures look in their different states, such as the angry brows of an enraged one.

The creature states' looks (Ed, issue #87; render/looks.ts). The angry brows are a stopgap for an expression the creature generator will draw (render/looks.ts expression).
Code: `render/looks.ts`

- **`looks.enragedTint`**: An enraged creature's whole sprite is tinted toward a colour, keeping its shading.
  1. Ed, 2026-10-05: "Enraged creatures should have a red tint so that they're easy to tell apart from the other states"
  an enraged creature's whole sprite goes toward colour by amount (0 none, 1 all), by each pixel's lightness so its shading and shape still read; its angry brows and red eyes stay. No other state is tinted.
- **`looks.anger`**: A pixel 💢 popping beside an enraged creature's head.
  1. Ed: "or a 💢"
  2. Ed: "the red tint can be less strong" (0.38, with a floor so it never goes near-black)
  a pixel 💢 beside an enraged creature's head on the side it faces, popping on a pulse, size times its level's bubble size (bubbles.levelScale). Tint and 💢 each on its own (amount 0 or on false turns one off); both for now [2].
- **`looks.partyGlow`**: every happy and leashed animal has sparkles twinkling pixels round it, each lit for a moment about rate times a second, size times three game pixels, at strength brightness (additive); leashed ones keep their collar on top.
  1. Ed, 2026-10-05: "party animals could sparkle or glow a little"

| knob | type | range |
|---|---|---|
| `looks.enragedTint.colour` | string |  |
| `looks.enragedTint.amount` | number | 0 to … |
| `looks.anger.on` | boolean |  |
| `looks.anger.size` | number | 0 to … |
| `looks.partyGlow.on` | boolean |  |
| `looks.partyGlow.sparkles` | number | 0 to … |
| `looks.partyGlow.rate` | number | 0 to … |
| `looks.partyGlow.size` | number | 0 to … |
| `looks.partyGlow.strength` | number | 0 to … |

### `tone`

Contrast: ambient scales the twilight fill (lower is darker shade under the canopy), moon the moonlight (both lowered for Ed's dark forest, v149); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.

| knob | type | range |
|---|---|---|
| `tone.black` | number | 0 to … |
| `tone.gamma` | number | 0 to … |
| `tone.ambient` | number | 0 to … |
| `tone.moon` | number | 0 to … |

### `bloom`

a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow).

| knob | type | range |
|---|---|---|
| `bloom.on` | boolean |  |
| `bloom.strength` | number | 0 to … |
| `bloom.threshold` | number | 0 to … |

### `tiltShift`

blurs the top and bottom of the screen so the forest looks like a miniature.

- **`tiltShift.skyBlur`**: the share of the blur the night sky takes [1]: 1 blurs it as the ground, 0 leaves its stars sharp; a slider in the decisions panel, with the treetops' strength.
  1. Ed, 2026-10-06: "lessen the tilt-shift effect until you can see the stars" … "the stars don't have to be crisp, just perceptible" (then)
- **`tiltShift.stackSharp`**: her sigil stack over her hat kept out of the blur, sharp at any height, however tall [1]; false blurs it with the rest.
  1. Ed, 2026-10-27: "stacks should not be affected by the tilt shift" (render/post.ts Post.sharp)
  Code: `render/post.ts`
- **`tiltShift.strength`**: the blur at the screen's edges, in pixels.
  1. Ed, 2026-10-29: "reduce the tilt shift effect at top and bottom by 50%" (via the coordinator, after the art director's measurement of "the pixels are just hard to read" (previews/ed/blur/); 1.5 → 0.75)
- **`tiltShift.band`**: the height of the sharp band (0-1 of the screen).
- **`tiltShift.centre`**: where it sits (0 top, 0.5 middle, 1 bottom).
- **`tiltShift.treetop`**: A stronger miniature-world blur when she's up in the treetops.
  1. Ed, 2026-10-06: "reduce the intensity of the tilt-shift effect" (both halved and their sharp bands widened)
  2. Ed: "the tilt shift isn't blurring the sky - the tilt shift effect has to be applied after the bend shader rather than before" (round 12)
  the strength and band over the treetops (Ed, v160: a stronger miniature look there), blended in as she rises [1]; ?tilt=<strength>,<band> tries treetop values live; It blurs at the low resolution, before the pixels are scaled up; ?tilt=off turns it off. The night sky over the bend is blurred with the rest, the tilt-shift the last thing done to the finished, bent picture [2].
- **`tiltShift.treetop.strength`**: The tilt-shift's blur over the treetops, in pixels, blended in by lift.
  1. Ed, 2026-10-29: "reduce the tilt shift effect at top and bottom by 50%" (via the coordinator, after the art director's measurement of "the pixels are just hard to read" (previews/ed/blur/); 3 → 1.5)

| knob | type | range |
|---|---|---|
| `tiltShift.on` | boolean |  |
| `tiltShift.skyBlur` | number | 0 to … |
| `tiltShift.stackSharp` | boolean |  |
| `tiltShift.strength` | number | 0 to … |
| `tiltShift.band` | number | 0 to … |
| `tiltShift.centre` | number | 0 to … |
| `tiltShift.treetop.strength` | number | 0 to … |
| `tiltShift.treetop.band` | number | 0 to … |
