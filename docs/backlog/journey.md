# The journey: islands, records and the treehouse

Backlog (Ed, 2026-10-10). **Nothing here is built yet; don't build any of it without Ed's go.** It is the game's longer arc: a run is one night on one island, and between nights the witch explores a sea of islands from her treehouse.

Where this overrides older notes: the record crate no longer picks the map's seed (islands do), and "the bedroom" grows into the whole treehouse.

## 1. Islands

- **The first island** is small (about 30 areas), round, and not too hard to win.
- **Winning an island** means surviving every wave on its route *and* leaving no enraged creature standing. (Today the pulse simply stops after the last stone and nothing ends the run but losing; this is the missing win state.)
- **Losing:** she goes to bed, and can play the same island again.
- **Winning:** every legend on the island wakes and joins the party. Each legend tells of a different island: these are the next maps, unlocked on the sea chart.
- **Phases** (Ed, 2026-10-10): how far an island is from the first, and so how hard, is its *phase*: phase 1 is the first island, phase 2 the islands its legends tell of, and so on. A **fixed number of phases, four or five** (Ed). (Proposed: phases of the moon, the night sky showing that phase's moon, waxing toward full as you go further out.)
- **Harder further out.** The further an island is from the first, the more areas it has, the more irregular its shape, and the rarer its animals.
  - Directions on the chart may drift into **biomes** (desert, volcano, tundra...), and/or the further from home the more **fantastical** the creatures (dragons, pegasi...). Rarity and the new creatures come later; many more creatures are planned.
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

The bedroom becomes **the whole treehouse**: rooms she walks between, each with its own job. Before the party she can wander the house freely; **she can't leave until the party starts**, and the party starts when she takes a record to the DJ booth.

| Room | What you do there |
|---|---|
| **Bedroom** | sleep: the end of a night, and where a new one starts |
| **Wardrobe** | get dressed: Next / Back, one piece at a time, from her nightie (creator plan: face, hair, top, jeans, shoes, jacket, scarf; a working mirror) |
| **Hat room** | the hats she's unlocked; choose one (spares here for swapping during the party) |
| **Broom room** | the brooms she's unlocked; choose one |
| **Map room** | the sea chart: islands found, won, and their records; choose tonight's island |
| **Studio** | the record collection: choose tonight's record (genre and tempo) |
| **Observation tower** | look out over the actual island and its dancefloor, before the party and during it (the real game camera, from the treehouse) |
| **Computer room / telephone** | multiplayer: call friends to the party (lobby, party code) |
| **Kitchen** | the cauldron: brew mushroom trips (6 baskets, 56 recipes) |
| **DJ booth** | start the party (put on the record). A **ritual circle** surrounds it (Ed, 2026-10-10): after a knockdown she comes back inside it, and its candles count down the respawn wait (6 s), going out or lighting one by one before she drops the needle |

Also on the walls: **the poster** of her biggest party.

- Rooms visited during the party slow time and add their own music (as decided for the kitchen and the old upstairs bedroom). Open: which rooms can be visited mid-party.
- One button per room (E at the thing), no menus where a thing in the room will do.

## Open questions

- Which rooms are open during the party.
- How a legend "tells" of its island without text (a dream bubble showing the island's shape?).
- Biomes by direction, fantastical by distance, or both.
