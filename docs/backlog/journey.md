# The journey: islands, records and the treehouse

Backlog (Ed, 2026-10-10). **Nothing here is built yet; don't build any of it without Ed's go.** It is the game's longer arc: a run is one night on one island, and between nights the witch explores a sea of islands from her treehouse.

Where this overrides older notes: the record crate no longer picks the map's seed (islands do), and "the bedroom" grows into the whole treehouse.

## 1. Islands

- **The first island** is small (about 30 areas), round, and not too hard to win.
- **Winning an island** means surviving every wave on its route *and* leaving no enraged creature standing. (Today the pulse simply stops after the last stone and nothing ends the run but losing; this is the missing win state.)
- **Losing:** she goes to bed, and can play the same island again.
- **Winning:** every legend on the island wakes and joins the party. Each legend tells of a different island: these are the next maps, unlocked on the sea chart.
- **Phases** (Ed, 2026-10-10): how far an island is from the first, and so how hard, is its *phase*: phase 1 is the first island, phase 2 the islands its legends tell of, and so on. A **fixed number of phases, four or five** (Ed). (The moon: phase 1 full, waning to new; see the archipelago below.)
- **The archipelago** (Ed, 2026-10-10): **each kind of legend tells of its own island**, always the same one: about 100 islands, one per legend kind (so about 100 creature kinds in the end; 32 today). Rarer legends live further out, so the stories lead outward.
  - Five phases, the moon waning as you go (phase 1 full, then gibbous, half, crescent, new: each phase darker). Island sizes **30 / 40 / 50 / 60 / 70 areas**; at about 1 legend per 5 areas, that's 6 / 8 / 10 / 12 / 14 legends an island. Measured on today's ~100-area maps: about 1 minute of route per area at 4 m/s, so roughly a 30 to 70 minute night (less on faster records).
  - Proposed island counts per phase: **1 / 6 / 15 / 30 / 48** (about 100). A legend kind appears on islands of the phase before its own island, so several islands can point to the same next one (phase 2's 6 islands carry 48 legends among 15 kinds; phase 3's 150 among 30; phase 4's 360 among 48).
  - **Every legend kind exists by phase 4** (Ed): phase 4's islands between them carry all ~100 kinds, so **phase 5 has no new legends**; its legends tell of islands already found (a way back across the chart).
  - **Legends decide the creatures** (Ed): a kind of creature lives in a phase only if its legend does. A kind first appears in the phase before its own island's (so phase 1, with 6 legends, has about 6 kinds of creature: an easy start with few to learn), and stays in every phase after.
  - **A little more variety in phase 1** (Ed): a tutorial, but with slightly more than 6 kinds (proposed 8 to 10: more legends on the first island, or a few common kinds with no island of their own).
  - **The home island grows** (Ed): each time you unlock a legend's island, that kind of animal comes to live on the home island too, so replaying it gets richer.
- **Biomes by direction** (Ed): the sea chart is a compass. **North** gets colder (pine forests, eventually tundra); **south** hotter (eventually desert); **east** rockier (eventually volcanic); **west** becomes jungle. The further out, the more of an island's areas are themed by its biome (today's 32 area types are the temperate middle). Proposed: the diagonals blend (north-east mountains and glaciers, south-east badlands, south-west mangrove swamp, north-west cold rainforest), and each biome brings its own creatures, legends and record genre.
- **Harder further out.** The further an island is from the first, the more areas it has, the more irregular its shape, and the rarer its animals.
  - Further from home, the more **fantastical** the creatures (dragons, pegasi...); directions are biomes (below). Many more creatures are planned.
- **Replay:** islands already won can be won again, to explore the chart in other directions (each legend points somewhere new) or to finish their quests (records, below).
- **How it could work:** each island is a point on the sea chart, its seed made from its position; its size, irregularity, biome and animals all follow from its distance and direction from the start. The save is only which islands are won and which records are earned.

### Irregular islands and lakes

- **Build the land out of areas.** Grow the island outward from home over the area grid with seeded noise (arms, bays, peninsulas); some interior areas are water: **lakes**. The coast follows the areas' fractal borders.
- **Replace the polar coast.** Today the coast is one radius per direction from home (`rules/mapShape.ts` `makeCoast`), which can't make lakes or bending inlets. Instead, a land map (distance to water, computed once when the map is made) answers "inside?" and "nearest coast" for flight, the soft edge, the beach and sea drawing (a texture lookup, so lake shores get beaches too), sea life and the coast camera.
- **Animals route over the area map** (Ed chose this): a path from area to area that skips water areas, as travelling party animals already route along area borders (`rules/travel.ts`); used by besiegers marching on and her followers. Straight lines within an area, as now.
- Unchanged: areas, the wave route (it rings outward by distance on any set of areas), creatures, combat, legends, sieges.
- Watch: the ley line crossing a lake; home must stay well inland.

## 2. Records

A third axis of progress, separate from the other two:

| | Unlocked by | Rewards |
|---|---|---|
| Islands | winning an island | defence and survival |
| Hats and brooms | achievements (one per run) | trying the mechanics |
| **Records** | **completing every legend quest on an island** | the optional layer: exploring, the right creatures, map awareness |

- She starts with two records: **Slow** and **Normal**.
- **An island's record** (its genre, matching its biome) is earned by completing every legend quest on it. A player can win an island first and come back for its quests later.
- **Tempo = difficulty.** The record's bpm drives the music *and* the pulse's speed (pulse speed = 4 m/s × bpm / 120; replaces today's separate Waves menu). Knockdowns still add 5 bpm.
- **Records from further islands are faster.** A fast record played on an easy island makes a hard night: difficulty becomes a choice.
- Keep the first island's quests gentle enough that a new player can finish them (the early easy quest helps).

## 3. The treehouse

**The same treehouse on every island; a legend carries it** (Ed, 2026-10-10). Each island is the home of one kind of legend. When she sets off for an island, its legend comes for the house: the giant tree rides **on the creature's back** across the sea, through the night while she sleeps (a short dreamy voyage: moonlight, the legend swimming or flying, the moon's phase changing). She wakes on its island and gets dressed. Proposed: the tree keeps souvenirs of where it's been (snow from the north, sand from the south).

**The house is a treehouse Ent** (Ed, 2026-10-10): an ancient magic walking tree, itself a legend, with the treehouse in its branches. **It is the first (full-moon) island's legend**, the first legend she befriended, and her home ever since. It sleeps rooted while she parties, with a face in its bark that wakes when they set off. **On the voyage the Ent rides the island legend's back** (trees can't swim), roots gripping its shell or fur. **Its pose is Atlas** (Ed): the Ent kneels, holding the treehouse up above it in its branches. It never needs to walk: to travel, **the legend comes up beneath it and lifts it**, Ent, house and all, and carries it away (and sets it down the same way). Built on today's 3D treehouse model (art/treehouse.js): the kneeling Ent with a face in its bark (asleep and awake), baked like the rest; the voyage needs only the legend drawn huge, rising, and swimming or flying.

**The dancefloor is a spell** (Ed): on arriving she casts the party spell and the dancefloor and speaker ring rise out of the island (today's opening cast and boot, as they are). Only the house travels.

The bedroom becomes **the whole treehouse**: rooms she walks between, each with its own job. Before the party she can wander the house freely; **she can't leave until the party starts**, and the party starts when she takes a record to the DJ booth.

| Room | What you do there |
|---|---|
| **Bedroom** | sleep: the end of a night, and where a new one starts |
| **Wardrobe** | get dressed: Next / Back, one piece at a time, from her nightie (creator plan: face, hair, top, jeans, shoes, jacket, scarf; a working mirror) |
| **Hat room** | the hats she's unlocked; choose one (spares here for swapping during the party) |
| **Broom room** | the brooms she's unlocked; choose one |
| **Map room** | the sea chart: islands found, won, and their records; choose tonight's island |
| **Studio** | the record collection: choose tonight's record (genre and tempo) |
| **Observation tower** | see the whole island: a near-overhead view from high above the treehouse (looking straight down, so the north-facing camera never turns) |
| **Computer room / telephone** | multiplayer: call friends to the party (lobby, party code) |
| **Kitchen** | the cauldron: brew mushroom trips (6 baskets, 56 recipes) |
| **DJ booth** | start the party (put on the record). A **ritual circle** surrounds it (Ed, 2026-10-10): after a knockdown she comes back inside it, and its candles count down the respawn wait (6 s), going out or lighting one by one before she drops the needle |

Also on the walls: **the poster** of her biggest party.

**The balcony shot** (Ed, 2026-10-10): the treehouse stays 5 m north of the dancefloor (it never hides the party from the north-facing camera), so the balcony isn't seen *from*: it's filmed **low, through the party, up to the balcony**, with the crowd and the floor in front and her at the rail above, like a DJ over the crowd (close to today's opening shot). The camera never turns round.

- Rooms visited during the party slow time and add their own music (as decided for the kitchen and the old upstairs bedroom). Open: which rooms can be visited mid-party.
- One button per room (E at the thing), no menus where a thing in the room will do.

## Open questions

- Which rooms are open during the party.
- How a legend "tells" of its island without text (a dream bubble showing the island's shape?).
- Biomes by direction, fantastical by distance, or both.
