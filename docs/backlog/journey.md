# The journey: islands, records and the treehouse

Backlog (Ed, 2026-10-10). **Not built unless marked built; don't build any of it without Ed's go.** It is the game's longer arc: a run is one night on one island, and between nights the witch explores a sea of islands from her treehouse.

Where this overrides older notes: the record crate no longer picks the map's seed (islands do), and "the bedroom" grows into the whole treehouse.

## 1. Islands

- **The first island is home** (the Ent's island): small (about 10 areas), round, and not too hard to win.
- **Winning an island** means surviving every wave on its route *and* leaving no enraged creature standing. (Today the pulse simply stops after the last stone and nothing ends the run but losing; this is the missing win state.)
- **Losing:** she goes to bed, and can play the same island again.
- **Winning:** every legend on the island wakes and joins the party. *Changed (Ed, 2026-10-18; built, #954: `g.islandsTonight`, `rules/win.ts`):* islands are found by **legends' quests** ("bring me a badger": any age), not by the win. A quest done makes its legend happy (it fights for her) and finds its island for tonight; the island is **kept only if the night is won**, and can't be sailed to before then. Winning alone finds no islands.
- **Phases** (Ed, 2026-10-10): how far an island is from home, and so how hard, is its *phase*: phase 1 is the islands home's legends tell of, phase 2 the islands theirs tell of, and so on: **home plus five phases**. The moon: full at home, waning phase by phase to new at phase 5.
- **The archipelago** (Ed, 2026-10-10): **each kind of legend tells of its own island**, always the same one: **about 64 islands**, one per legend kind (so about 64 creature kinds; all 64 built, the last placeholders filled by the sphinx, #1031, and the feathered serpent, #1036). More kinds can come later as expansions without changing any rule. Rarer legends live further out, so the stories lead outward.
  - **Home plus five phases** (Ed, 2026-10-10: small enough to clear them all): phase islands are **10 / 20 / 30 / 40 / 50 areas** (2 / 4 / 6 / 8 / 10 legends); home grows from about 10 areas to 64 and is the endgame. The moon wanes outward (home full; then gibbous to new across the phases). About 1 minute of route per area at 4 m/s, so 10 to 50 minute nights, less on faster records.
  - Island counts (64 in all, one per legend kind; the roster, Ed, 2026-10-23: layout B): **home, then 10 / 6 / 16 / 16 / 16** islands in phases 1 to 5, i.e. new kinds introduced: 10 at home (the starting ring of sigils; their islands are phase 1), 6 in phase 1 (temperate), 16 in each of phases 2, 3 and 4 (2 per compass biome each), none in phase 5. (Before the roster: 10 / 10 / 12 / 14 / 18.) A kind appears in the phase before its own island's and every phase after; with only 2 to 10 legends a night, replays open the rest.
  - **Every legend kind exists by phase 4** (Ed: no new legends in the last phase): the last phase's legends tell of islands already found (a way back across the chart).
  - **Legends decide the creatures** (Ed): a kind of creature lives in a phase only if its legend does. A kind first appears in the phase before its own island's, and stays in every phase after (so home starts with about 10 kinds: an easy start with few to learn).
  - **One rule for every island** (Ed, 2026-10-10): an island is a **size** and a **roster** of kinds; its areas are filled from the roster, kinds repeating when there are more areas than kinds. Legends are **1 in 5 areas everywhere, dealt at random each night** from the kinds on the island (no two of one kind).
    - **Home** (the Ent's island, round, full moon): one area per kind she knows (about 10 at first, 64 at the end); roster = every kind she knows. A short tutorial at first (2 legends a night), the complete gallery and **the endgame challenge** at the end.
    - *(Out of date, 2026-10-18: islands now come from quests done on a won night.)* Winning home opens the islands of the legends dealt that night; **replaying home deals different legends**, opening the rest of phase 1 over a few short nights.
    - **Phase islands:** fixed size by phase (10 / 20 / 30 / 40 / 50), roster from that phase's kinds (below).
  - **Rosters** (proposed, 2026-10-10). A kind of creature *is* an area type (each area type has its species), so a roster is an island's mix of area types. Each kind gets two hand-set facts: its **biome** (temperate 16: home's 10 and 6 more; north/cold, south/hot, east/volcanic, west/jungle, and the diagonals' own; 6 kinds each) and the **phase it's introduced in** (home 10, phase 1 6, phases 2, 3 and 4 16 each). Its own island lies one phase later, in its biome's direction. For kind K's island (phase p), from the island's seed:
    1. Eligible: kinds introduced in phase p or earlier.
    2. Always: **K itself, plentiful** (about 1 area in 6: its home); **1–3 kinds new to phase p** (more on bigger islands) from nearby on the chart (so it has legends telling of new islands).
    3. The rest by weight: own biome strongly, neighbouring biomes some, temperate commons a little, the opposite biome almost never; recently introduced kinds favoured.
    4. **Every other kind on at most 2 areas** (Ed, 2026-10-28: "we should reduce the number of repeats. Of its own kind, we should have about 1 in 6 as we have now. Of other kinds, there should be no more than 2"), so about half as many kinds as areas (10 areas: 5 kinds, 20: 10, 30: 14, 40: 18, 50: 22). Was: about a third as many kinds as areas (10 areas ≈ 4 kinds, 50 ≈ 17), each about three times.
    5. Biome-themed share of areas grows with phase: home and phase 1 are temperate; biomes come in from phase 2 (since the roster, Ed, 2026-10-23: each biome's first two kinds are introduced in phase 2, so phase 3's islands are the first in the biomes), and their share grows outward to nearly all by phase 5. (Was: phases 1–2 essentially temperate, biomes from phase 3.)
    - Each night's legends (1 in 5 areas) are dealt from the roster, favouring kinds whose islands aren't found yet, never K.
    - **Dealt along the night's route** (Ed, 2026-10-28: "Always first"; "The same creature shouldn't appear two waves in a row"; then "keep the route changing, shuffle the creatures and area types, retain the area shapes"): the island's shapes are fixed by its world; each night its area types are dealt onto them along that night's route, its own kind the first area the waves reach and no kind twice in a row (rules/deal.ts).
    - Authoring: a table of ~64 kinds, each with a biome and a phase; the rest is the generator.
- **Biomes by direction** (Ed): the sea chart is a compass. **North** gets colder (pine forests, eventually tundra); **south** hotter (eventually desert); **east** volcanic (Ed, 2026-10-23: "Can we call 'rocky' 'volcanic'?"); **west** becomes jungle. The further out, the more of an island's areas are themed by its biome. The diagonals have their own (north-east mountains and glaciers, south-east badlands, south-west mangrove swamp, north-west cold rainforest), and each biome brings its own creatures, legends and record genre.
  - **The roster** (Ed, 2026-10-23; the review page's table): 8 biomes of 6 kinds, one fantastic each, and 16 temperate: home's 10 and 6 more in phase 1 (each kind's own in the table at the end of this file, made from its `art/areas/<id>/kind.json`; the cat a sand cat or caracal, the snake a python, the moth to become a butterfly). Each biome's first two kinds come in phase 2, the next two in phase 3, its toughest and its fantastic one in phase 4, their bearings 11.25° either side of its point. The sphinx and feathered serpent take placeholder slots 50 and 58 (unknown-19, unknown-27) when they're built (built: #1031, #1036); the moved kinds' areas and coats follow.
  - **Tall natural scenery everywhere** (Ed, 2026-10-11): even the bare extremes (desert, volcanic; likewise tundra) keep natural tall scenery standing in for trees, so the treetop view still has a canopy-height layer to fly over and the ground still has cover: e.g. rock spires, hoodoos, mesas and giant cacti in the desert; basalt columns, lava towers and dead giant trees on the volcanic side.
- **Harder further out.** The further an island is from the first, the more areas it has, the more irregular its shape, and the rarer its animals.
  - Further from home, the more **fantastical** the creatures (dragons, pegasi...); directions are biomes (below). Many more creatures are planned.
- **Losing** (Ed, 2026-10-11): the next night she can replay the same island, or pick any other island she has unlocked on the sea chart. Nothing is lost.
- **Replay:** islands already won can be won again, to explore the chart in other directions (each legend points somewhere new) or to finish their quests (records, below).
- **How it could work:** each island is a point on the sea chart, its seed made from its position; its size, irregularity, biome and animals all follow from its distance and direction from the start. The save is only which islands are won and which records are earned.
- **The world seed** (Ed, 2026-10-11; built: `rules/rosters.ts`, `rules/map.ts`, `app/chartSave.ts`): **one a campaign**. The sea chart shows it (to share) and **Start over** begins a new campaign in a new world, its seed random or typed / pasted in (Start over is gone from the chart since Ed, 2026-10-23: `app/chartView.ts`); `?world=<seed>` plays or charts another world for one look (its nights not saved to this campaign). An island's **shape** is fixed within a campaign, from the world seed and its kind: its coast, its areas and their types (its roster), and where it lies on the chart (its kind's bearing, nudged a few degrees by the world). **Home's** shape too, from the world seed (no longer the run's). Its **insides** change every night, from the night's own seed (the run's): trees, paths, scenery and set pieces, creatures, the night's legends. No save means world 0, the first world, with the table's bearings as given. `islandOf(kind, world)`, `homeIsland(world)`, `coastSpec`; the map's `map.world` (`tuning.map.world`, from the save); the map's shape from `shapeSeed`, everything else from `map.seed` (the night).

### The world and the sea chart (Ed, 2026-10-10)

- **The world is a flat disc**, round like the map, the sea streaming off its edges into space. Home is at its centre; every island lies around it.
- **The sea chart is the same circle:** home in the middle, each island drawn in its **true shape** (worked out in advance from its seed, so only its land and water need making, not its whole forest), with the **sigil of its legend's animal** on it.
- **Sigils light up as kinds are discovered** (Ed): the chart starts with a ring of about 10 lit sigils round home (the kinds she knows); an island's sigil lights when its animal is discovered. **Each voyage draws a line** from the island it set out from to the new one, so the chart shows the paths taken. **Home grows on the chart** too, gradually, as it gains areas.
- **Home's sigil is the World Tree**: symbolically the Ent legend's placed sigil. It shows on the dancefloor before the party spell wakes it.
- **In the treehouse** the chart is a miniature of the world itself: a water feature, the disc with its islands, its sea pouring off the rim into a pool in the floor.
- Fits what's drawn today: the world's bend already curves the ground away toward the horizon.
- **Sailing zooms in** (Ed, 2026-10-11, eventually; **built**: #735, #738, and on into the treehouse, #986): choosing an island on the chart transitions to it by zooming the chart's camera down into the island, all the way to the dancefloor at its centre, where the night begins.
- **Open sea round the edge, and the moon rising** (Ed, 2026-10-12; **built**, #751): an empty band of sea round the chart's edge, past the outermost islands. As the map screen opens, the moon rises over its north-west edge (the same moon whose light casts the islands' shadows on the sea, Ed's chart-shadows ask).

### Sigils, unified (Ed, 2026-10-12)

The chart's detailed island sigils (#712, art/sigilDetail.js: plain glyph, carved bands, solid carved emblem by size) are good enough for now. Later, **update and unify all the sigils**: one sigil family drawn by one system everywhere they appear (placed sigils and runes, the stack, dream bubbles, the dancefloor, the sea chart, runestones, the World Tree), with the carved emblem style refined toward Ed's reference (previews/ed/refs/sigil-detail-reference.png on claude/ed-shots: fewer, bolder carved bands and spirals) and detail chosen by size.

### The end of the route (Ed, 2026-10-10)

1. **Last call:** the wave pointer's 🎶 becomes **🎉** for the final stone.
2. **Victory lap:** when the last wave has landed and **no enraged creature is left**, the pulse races back along the whole ley line to home, **each runestone shooting fireworks as it passes**; the music (every soundsystem already plays the same track) turns to **special victory music**.
3. **Stragglers first:** none of this happens while enraged animals live. Until then a pointer shows the way to the enraged animal **closest to the centre** (there may be many).
4. **The win:** **the island's own sigil** (its legend kind's) flares on the dancefloor; the legends dealt that night wake and come to dance as party legends; **every animal on the island becomes a party animal**, and they all join **a giant conga line**; fireworks from every soundsystem.
5. **Telling without words:** each woken legend's dream bubble shows the shape of its home island with its sigil, the same picture that lights up on the sea chart.
6. Then the afterparty, stargazing, bed and the voyage.

Decisions (Ed, 2026-10-11, approving the plan):
- **Legends don't join the conga**, but they do come home: the woken dealt legends walk to the home area and dance there as party legends. The conga is the party animals only. **Where** (Ed, 2026-10-11, from art1's #691 finding: their ring inside the conga's hid the conga from ground views): on the dancefloor's **far (north) side**, beyond the conga's ring, behind everything from the north-facing camera, in an arc (a second row further out if many) spread clear of the treehouse and of each other, dancing in place; the conga keeps its ring (`win.legendGap`, `legendRow`, `legendSpace`, `legendArc`; `rules/win.ts` `legendPlaces`).
- **Enraged legends don't block the win**: the straggler pointer and the "no enraged left" check ignore them (only non-legend enraged animals count). At the win they calm and go back to sleep in their clearing, and **an enraged legend's island is not unlocked**: the night's islands found are the dealt legends woken, not those still enraged at the end (`g.win.found` and `g.win.lost`, by kind: the card's and, later, the sea chart's).
- Built (PR 1, rules/win.ts): last call (🎉 on the wave pointer), the stragglers' pointer, the victory lap (the pointer follows its pulse home, each stone's fireworks as it passes, the music's victory hook), the win (legends home, the conga, fireworks from every soundsystem, her leash let go, nothing fights), the Night won card (its button: a new island until the sea chart). Placeholders: the island's sigil (home's), the dealt legends (every legend on the island, until part A's rosters), the victory music (the drop), the dream bubbles and the island outlines (art4), the conga's look (art1).

### Irregular islands and lakes

- **Build the land out of areas.** Grow the island outward from home over the area grid with seeded noise (arms, bays, peninsulas); some interior areas are water: **lakes**. The coast follows the areas' fractal borders.
- **Replace the polar coast.** Today the coast is one radius per direction from home (`rules/mapShape.ts` `makeCoast`), which can't make lakes or bending inlets. Instead, a land map (distance to water, computed once when the map is made) answers "inside?" and "nearest coast" for flight, the soft edge, the beach and sea drawing (a texture lookup, so lake shores get beaches too), sea life and the coast camera.
- **Animals route over the area map** (Ed chose this): a path from area to area that skips water areas, as travelling party animals already route along area borders (`rules/travel.ts`); used by besiegers marching on and her followers. Straight lines within an area, as now.
- Unchanged: areas, the wave route (it rings outward by distance on any set of areas), creatures, combat, legends, sieges.
- Watch: the ley line crossing a lake; home must stay well inland.
- **Lakes by biome** (Ed, 2026-10-12): in the **cold** biomes lakes are **frozen**; in the **volcano** biome they're **lava**; in the **desert** biome they're **oases**; in the **jungle** biome they're **sinkholes**. Only the cardinal biomes have special lakes (Ed, 2026-10-12): N cold frozen, E rocky (the volcano) lava, S hot oases, W jungle sinkholes; the diagonals have their own (Ed, 2026-10-12): NE mountains and glaciers glacial tarns (milky turquoise meltwater, ice chunks at the edge), NW cold rainforest tar pits (Ed, 2026-10-13, instead of hot springs, which looked walkable: glossy black tar, slow bubbles, oil-slick rainbows on its surface, half-sunk bones and a drowned trunk; on the sea chart now too), SE badlands rust pools (red-orange mineral water, layered terraces), SW mangrove swamp lily ponds (giant lily pads and flowers); temperate stays water (koi). **Biomes blend smoothly** by bearing (Ed, 2026-10-12): an island between two directions mixes their looks, and a border island can have lakes of both kinds. Looks only (Ed): no gameplay effect; they play exactly as lakes do. They start a phase earlier than the biomes do (Ed, 2026-10-12: "biome lakes can start appearing one phase earlier"): from island phase 3 (`lakes.biomeFrom` in the tuning), the temperate islands that far out have their compass biomes' lakes on the sea chart (#736's looks, blended by bearing): half of them in that first phase, each lake seeded, the rest plain water (`lakes.biomeFirstShare`), all of them further out, and none further in (Ed: "half the lakes in the third ring are special. Further out they're all special, further in they're all plain").
- **Biome lakes look the part in the game** (Ed, 2026-10-13): today their looks show on the sea chart; in play a special lake should look as it is described: a lava lake is glowing, crusted lava; a frozen lake is ice, broken up into floes with dark water between, never a solid sheet (Ed, 2026-10-14: solid ice would look walkable); an oasis, a sinkhole, a glacial tarn, a tar pit, a rust pool and a lily pond each their own water, shore and edge dressing. Looks only, as above.
- **Home earns biome lakes** (Ed, 2026-10-12): when she completes every island in a biome, home gets a special lake of that biome (a frozen lake, a lava pool, an oasis, a sinkhole, a glacial tarn, a tar pit, a rust pool or a lily pond), so home collects the world's waters as she explores. Looks only, like the other biome lakes. To settle: what "complete" means (every island won, or found), and where on home each lake goes.
- Built: the land map and the coast (#690), the island shapes by phase (#697), the lakes (rules/lakes.ts: from phase 1, never home or its neighbours, small shores, lighter water, koi in some, no landing on the water, on foot everyone stopped at the shore; creatures head round them along the shore, which stands in for routing over the area map). The ley line crosses a lake on about 10 to 15% of its links (tools/lakes/leylines.mjs): left as it is for Ed to judge. Next: the islands fitted together on the chart (tessellation). Built (PR 4, rules/archipelago.ts): the archipelago, the islands' foreseen coasts packed over the whole disc, turned to fit, a strait apart at least, and grown in their patches, the rings only loose guidance (Ed, 2026-10-12).

### Difficulty: one master curve (Ed, 2026-10-10)

- Today's swarm curve (`swarm`: 1 young creature at the first stone up to about 12, mostly adults, at the last; `endAverage` 12, `curve` 1.3, `youngShare` 1 → 0.2) becomes **the master curve over waves 1 to 64**, indexed by wave number rather than by share of the route, and **squeezed so wave 64 reaches today's final difficulty** (Ed, 2026-10-11).
- **Every island plays the curve from wave 1**, as far as it has areas: phase 1 waves 1–10, phase 2 1–20, ... phase 5 1–50. Only **home**, grown to 64 areas (one of each creature), plays the whole curve to 64, ending at today's hardest waves.
- So every night starts gentle; bigger islands climb higher. Other dials (darkness, shape, creature strength) stay mild and mostly visual, so the curve stays the main, readable lever. An easy game is fine as long as progression is constant (Ed).

### The treehouse, for now

Not designed properly until every meta-system is settled (each will own a place in it). Meanwhile: **one big octagonal room with an object for each system** (Ed).

### First prototype (after the token reset; Ed: "trying out smaller islands and unlocking the map seems like a good idea to start")

Using only today's 32 kinds and art:
1. **Small islands:** a map size by area count (10 / 20 / ...), round, with the swarm curve indexed by wave number (above). **Built** (2026-10-11): `map.islandAreas` (10 by default, `?island=`), `population.swarm.waves` 64, and relics one per 10 areas, each a bottle, mirrored or not, in one of six colours, never the same bottle and colour twice on a map.
2. **Rosters:** an island's area types drawn by the roster rule from a table giving each of the 32 kinds a phase (home 10, phase 1 10, phase 2 the other 12; biomes later). **Built** (2026-10-11): the kind table `config/kinds.json` (Ed approved it as drafted: each kind's phase and its island's **planned biome direction**, a compass bearing that places the island on the sea chart; today's 32 are all temperate, so the bearing only places it), and `rules/rosters.ts`: `islandOf(kind)` → `{ kind, phase, bearing, size, seed, roster }` (phase its kind's + 1, size 10 a phase, seed from its bearing and phase ring, so its shape follows from `islandOf` alone), `homeIsland(seed)`, `dealLegends(island, night, found, prefer)` (1 in 5 areas, never its own kind, kinds whose islands aren't found first). The map plays one by `map.island` (`"home"` by default: one area per kind she knows; a kind's name, `?island=fox`, its island on its own seed, the run's seed dealing the night's legends: `map.legendKinds`); `map.found` the kinds whose islands she's found.
3. **Winning:** survive every wave with no enraged creature left; the legends dealt that night wake. Ed (2026-10-11): enraged legends don't block the win (they calm at the win), and their islands are **not** unlocked; after a win a **"Night won" card** lists the islands just found and leads to the sea chart.
4. **The sea chart:** a bare page: home in the middle, islands appearing as their legends are woken, click one to play it; progress saved in the browser. Ed (2026-10-11): islands placed by their kind's planned biome direction; a **Start over** button with a confirm; `?chart=all` shows every island. **Built** (2026-10-11): `chart.html` (and `?chart` on the game's link), `app/chartPage.ts`: the disc, home in the middle; every island always drawn in its outline (Ed, 2026-10-11: "You can always see all the islands — you only see sigils on the ones that you can travel to"), a sigil and a link only on those she can travel to (home and each found) (`art/islands.js` islandPath of `rules/islandShape.ts` islandCoast with `rules/rosters.ts` coastSpec: the map's own coast) with its sigil, on its phase's ring at its bearing (`app/chartLayout.ts`, neighbours nudged apart a few degrees), the rest bare outlines; voyages as dotted lines; won islands starred; click one to sail there (`?island=<kind>`). The save (`app/chartSave.ts`, localStorage `witch.chart`): found kinds, won and played islands, voyages; a won night finds the islands of the legends it woke (`win.found`, never `win.lost`), a lost one only plays; the game's legends favour unfound islands (`map.found` from the save). The party's-over card has a Sea chart button.
5. **Home** growing by one area per kind found. **Built** (wave 2 D; "Home's size", section 3).
6. **All the islands** (Ed, 2026-10-11: "We should generate all the islands. For islands where we haven't designed the creatures yet, use '?'"): the kinds table (`src/rules/kinds.ts`; `config/kinds.json` until 2026-10-13, now one line a file: `art/areas/<id>/kind.json` and `config/kinds/`) holds all 64 kinds, today's 32 and 32 placeholders (`unknown-01`…`unknown-32`, `placeholder: true`): 14 introduced in phase 3 and 18 in phase 4, their bearings spread round the compass, each with the biome its direction suggests. Every island has a seed, size and coast (`islandOf`); a placeholder's shows on the sea chart as a bare outline like any island not yet found, not sailable ("Not yet charted"; a '?' under `?chart=all`), and no roster or night's deal ever holds a placeholder kind, nor does `?island=` play one. `?chart=all` shows all 64.
Not yet: the Ent, the voyage, treehouse rooms, records, lakes, biomes. (Since built: the Ent and the treehouse's rooms (treehouse.md), lakes (#690) and their biome looks (#1019), the biomes (#1024, #1026); the voyage dropped (section 3); records not yet.)

### The other 32 animals, and better shapes for all (Ed, 2026-10-12)

When we design the 32 placeholder kinds (bringing the animals to 64), first **audit every creature shape and add-on**: today's four-legged animals are mostly the same three-ellipsoid "sausage" torso (art/creatures3d.js quad3d), so silhouettes differ only by their add-ons. Then **expand the set of body shapes and parts** (silhouette-first bodies lofted along a per-species spine and belly profile, separate neck, shoulder and haunch masses, bolder proportions, postures) **until it can make every animal we want**, and make all 64 as good as we can, the existing 32 included. A black-silhouette sheet at game size with a pairwise likeness score keeps them distinct.

### Mushrooms on the journey (Ed, 2026-10-10)

- Six mushroom kinds (the cauldron's 56 recipes): **two temperate kinds grow on home** from the start; **one kind per biome direction** (north, south, east, west) grows only on **phase-3-and-beyond islands** of that direction (home and phases 1–2 are essentially temperate).
- **Find a kind once and it grows at home from then on**, as animals do: its basket in the kitchen fills, a first cluster sprouts on home. Brewing works on any island (the kitchen travels with the Ent).
- So the cauldron opens up as you explore in every direction: a fourth reward, for exploring widely.
- **The tutorial recipes** (the two home mushrooms, A and B; Ed): **AAA Superhot** (good: time moves only while she moves; the wave countdown still creeps while she's still), **AAB Orbit** (neutral: treetops three times higher, the forest like a planet from space), **ABB Drift** (bad: her controls slowly rotate, with a dizzy sway and swirl), **BBB Mirror Floor** (neutral: the ground a dark mirror). Moderate on purpose: with two plentiful mushrooms they're easy to make. The strong trips (Bullet Time and the like) need biome mushrooms.

## 2. Records

A third axis of progress, separate from the other two:

| | Unlocked by | Rewards |
|---|---|---|
| Islands | winning an island | defence and survival |
| Hats and brooms | achievements (one per run) | trying the mechanics |
| **Records** | **completing every legend quest dealt on an island in one night** | the optional layer: exploring, the right creatures, map awareness |

- She starts with two records: **Slow** and **Normal**.
- **An island's record** (its genre, matching its biome) is earned by completing **every legend quest dealt that night, in a single run** (Ed, 2026-10-11). A player can win an island first and come back another night for its record.
- **Tempo = difficulty.** The record's bpm drives the music *and* the pulse's speed (pulse speed = 4 m/s × bpm / 120; replaces today's separate Waves menu). Knockdowns still add 5 bpm. **Open (2026-10-18):** Ed set the wave speed to 1 m/s by default, on a pause-page slider (built, #953), for slow early nights; how a record's tempo and the wave speed relate is to decide.
- **Records from further islands are faster.** A fast record played on an easy island makes a hard night: difficulty becomes a choice.
- Keep the first island's quests gentle enough that a new player can finish them (the early easy quest helps).

## 3. The treehouse

**Superseded in part by [treehouse.md](treehouse.md)** (Ed, 2026-10-14): the house is a walkable set of rooms round a hub with the map at its centre, entered by flying onto a balcony; the room table and the octagon-for-now below are kept for the record.

**No voyage** (Ed, 2026-10-12, superseding the voyage below): sailing is one continuous zoom. At the map table she picks an island; the chart's camera glides to it and zooms in, past its dancefloor and sigil, and on down into the game's own camera until she's at the night's start (yawning and getting out of bed). The legend-carries-the-Ent voyage and its pictures are dropped.

**The same treehouse on every island; a legend carries it** (Ed, 2026-10-10). Each island is the home of one kind of legend. When she sets off for an island, its legend comes for the house: the giant tree rides **on the creature's back** across the sea, through the night while she sleeps (a short dreamy voyage: moonlight, the legend swimming or flying, the moon's phase changing). She wakes on its island and gets dressed. Proposed: the tree keeps souvenirs of where it's been (snow from the north, sand from the south).

**The house is a treehouse Ent** (Ed, 2026-10-10): an ancient magic walking tree, itself a legend, with the treehouse in its branches. **It is the first (full-moon) island's legend**, the first legend she befriended, and her home ever since. It sleeps rooted while she parties. **On the voyage the Ent rides the island legend's back** (trees can't swim), roots gripping its shell or fur. **Its pose is Atlas** (Ed): the Ent kneels, holding the treehouse up above it in its branches. **It looks mostly like a gnarled tree, with only a suggestion of Atlas, and no face** (Ed, 2026-10-11). It never needs to walk: to travel, **the legend comes up beneath it and lifts it**, Ent, house and all, and carries it away (and sets it down the same way). Built on today's 3D treehouse model (art/treehouse.js): the gnarled, kneeling Ent (no face), baked like the rest; the voyage needs only the legend drawn huge, rising, and swimming or flying.

**Arriving** (Ed, 2026-10-10): on a new island the Ent stands on the back of **a party legend of that island's kind**, sitting north of the dancefloor where the treehouse stands today. Story: it was so impressed by her last party that it brought her back to its home island.

**Home's size** (Ed, 2026-10-10): **one area of each creature**, so about **64 areas** at the end (about 64 islands, one per legend kind), playing the whole master curve (squeezed to 64 waves). **Built** (wave 2 D, 2026-10-11; `rules/rosters.ts` `knownKinds`, `homeIsland`; `rules/map.ts`): the kinds she knows are home's 10 and each kind whose island she's found (the save's `found`, in the order found; a home kind or a placeholder adds nothing), one area each. Winning home finds home kinds' islands, so home stays 10 until she wins one of those: its legends are dealt from its roster (phase 1's kinds among them), and each found adds an area at home the next night (10 → 11 → 13 …), a legend a night for every 5 areas (2 at first). Home's shape stays the world's as it grows: its middle and its first 10 areas (their places and their kinds) are the same every night of the campaign, and each new kind takes the next area further out. The sea chart's home outline grows with it (`coastSpec(homeIsland(world, knownKinds(found)))`). `map.islandAreas` only turns home on and sets its least size (past one area each, the kinds again in turn).

**Relics: one per 10 areas** (Ed; today's maps have six whatever their size).

**The dancefloor is a spell** (Ed): **putting the record on at the DJ booth casts the party spell** (Ed, 2026-10-11): the needle drops and the dancefloor and speaker ring rise out of the island (today's opening cast and boot). Only the house travels.

**Later (once every meta-system is settled; for now the octagon above):** the bedroom becomes **the whole treehouse**: rooms she walks between, each with its own job. Before the party she can wander the house freely; **she can't leave until the party starts**, and the party starts when she takes a record to the DJ booth.

| Room | What you do there |
|---|---|
| **Bedroom** | sleep: the end of a night, and where a new one starts |
| **Wardrobe** | get dressed: Next / Back, one piece at a time, from her nightie (creator plan: face, hair, top, jeans, shoes, jacket, scarf; a working mirror) |
| **Hat room** | the hats she's unlocked; choose one (spares here for swapping during the party) |
| **Broom room** | the brooms she's unlocked; choose one |
| **Map room** | the sea chart: the miniature world (a water feature pouring into a floor pool), islands found and won with their sigils; choose tonight's island |
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

- Which rooms are open during the party. Answered: every room (Ed, 2026-10-14; treehouse.md, "A night through the house").

The roster, each biome's kinds by the phase they come in (each kind's `phase` and `biome` in `art/areas/<id>/kind.json`; `node tools/docs/tables.mjs`):

<!-- data: roster (node tools/docs/tables.mjs --write; edit the data, not this) -->
| Biome | home | phase 1 | phase 2 | phase 3 | phase 4 |
|---|---|---|---|---|---|
| temperate | badger, dormouse, fox, hare, hedgehog, marten, mole, snail, squirrel, stoat | beaver, boar, moth, newt, stag, toad |  |  |  |
| badlands |  |  | meerkat, spider | armadillo, rattlesnake | griffin, scorpion |
| cold |  |  | elk, wolf | arcticfox, penguin | frosttroll, polarbear |
| cold rainforest |  |  | owl, raccoon | flyingsquirrel, roe | bear, unicorn |
| hot |  |  | cat, fennec | cheetah, lion | rhino, sphinx |
| jungle |  |  | bat, snake | jaguar, tiger | elephant, featheredserpent |
| mangrove swamp |  |  | heron, otter | crocodile, dragonfly | crab, hydra |
| mountains and glaciers |  |  | lynx, raven | ibex, redpanda | frostwyrm, snowleopard |
| volcanic |  |  | ram, salamander | beetle, woodlouse | komodo, stegosaurus |
<!-- /data: roster -->
