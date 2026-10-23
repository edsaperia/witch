# The Workshop

Proposal (2026-10-23), for Ed's OK. **Not built; don't build without Ed's go.** It takes [unlocks.md](unlocks.md)'s "The broom garage", renamed **the Workshop** and moved to the round room off the Terrace in the Ent's own house (v3: `tools/house/organic.mjs`, `config/house.json`, rules/houseRooms.ts), and fills it in with Ed's decisions of 2026-10-22/23, which win where they differ from unlocks.md:

1. One broom, three slots: **tip, chassis, exhaust**. Parts replace today's 18 broom shapes; the shapes' looks become the parts' looks.
2. **Stats and sets in the first build.** Each part changes one or two things she feels at once, often with a trade-off. Two- and three-piece sets unlock today's broom spells.
3. **One permanent upgrade a night**, across every kind (wearables, broom parts, later hats and bags), never two at once, hinted by its constellation through the telescope (rules/finds.ts `nightFind`, rules/constellations.ts). So a night's find is a trunk with a wearable, or a wreck with a broom part.
4. **Wrecks**: an old witch's crashed broom, half-buried and posed, a ground-mode find; each part's wreck its own scene. No towing: E picks the part up and it's hers at once (Ed, 2026-10-21), only while the party's on, and kept even if the night is lost.
5. **The room**: the bay fits parts, the lathe sets colour and shape, and the pegboard is a trophy display laid out as the 3 × 3 biome map.
6. The broom stand's Power row and the stand itself go when the Workshop lands. The bay and lathe reuse the station menus (src/ui/stationPanel.ts).
7. Multiplayer: only the host's parts, each on one witch's broom at a time. Not built now.
8. Furniture art: Alpha's or ours (see "What we need from Alpha and Echo").

Mock shots (claude/ed-shots, `previews/workshop/`): [wreck-forest.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/wreck-forest.png), [wreck-canoe.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/wreck-canoe.png), [wreck-horse.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/wreck-horse.png), [bay-menu.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/bay-menu.png), [lathe-menu.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/lathe-menu.png), [pegboard.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/pegboard.png). The wrecks are drawn by a throwaway build: mock pieces in the country kit made of `art/brooms.js`'s own parts, standing where tonight's trunk stands, in the game's light. The menus are HTML in the station menus' style, laid over the live game in the Workshop. Their sources are in `previews/workshop/src/`.

## Today's numbers (config/tuning.json), the baseline

Every number below is measured against **the bare broom** (all three slots empty). I propose it moves exactly as today's plain broom does, so fitting a part never feels like a step down from what a new player had:

| | today | where |
|---|---|---|
| Ground speed | 19.25 m/s | `groundSpeed` |
| Treetop speed (cruise) | 48 m/s, boosting to ×1.7 over 2 s held straight | `treetopSpeed`, `treetop.boost`, `boostTime` |
| Treetop turning | 150°/s at cruise (720°/s slow) | `treetop.turnRate`, `turnRateSlow` |
| Treetop pick-up | cruise in about 0.3 s | `acceleration` 10 |
| Ground pick-up | snappy | `groundAcceleration` 28 |
| Glide to a stop (treetops) | about 1 s | `treetop.glideTime` |
| Rise / come down | 0.7 s / 0.55 s | `riseTime`, `descendTime` |
| Shared cooldown | take-off adds 1 s, landing 1.5 s (2 and 3 at the plain broom's ×0.5) | `cooldown.rise`, `riseCooldown`, `spells.plain` |
| Dodge (blink) | 15 m; 2 charges, 1 s each | `dash.distance`, `charges`, `cooldown` |
| Haul | sigils pull at full weight (the Haul broom: ×0.5) | `leash.weight`, `spells.haul.pull` |
| Speed spell | ×2.2 for 4 s, then 12 s | `spells.speed` |

## The parts (nine to start)

Slot themes, as unlocks.md proposed, so a slot tells you roughly what a part changes: **the tip steers** (turning, the blink), **the chassis is the body** (speed on the ground, haul, rise and fall), **the exhaust is thrust** (pick-up, take-off and landing, dodges). Each part comes from one of today's shapes (`art/brooms.js`: a kind's `body` is the tip or chassis, its `tail` the exhaust).

| Slot | Part | Look (from today's shape) | Up | Down (the trade-off) | Set |
|---|---|---|---|---|---|
| Tip | **Missile nose** | the missile's pointed nose and band | treetop speed 48 → 53 m/s (+10%) | turns wider: 150 → 120°/s | Rocket |
| Tip | **Curled tip** | the curled tip's rolled nose | blinks 15 → 22 m (+50%; the Long broom was ×2) | each dodge's recharge 1 → 1.3 s | Hedge |
| Tip | **Hobby-horse head** | the hobby horse's head and mane, a figurehead | tight turns: 150 → 210°/s, and a sharp turn bleeds boost half as fast (`sharpTurnBleed` 3 → 1.5) | boost peaks lower: ×1.7 → ×1.5 | Ferry, Joust |
| Chassis | **Jet-bike fairing** | the jet bike's fairing and windscreen | ground speed 19.25 → 22 m/s (+15%) | heavier off the mark: ground pick-up 28 → 20 | Rocket, Joust |
| Chassis | **Ladder** | the ladder's rails and rungs | rises 0.7 → 0.45 s and comes down 0.55 → 0.35 s (the Mole's old boon) | ground speed 19.25 → 17.5 m/s (−10%) | Hedge, Pile driver |
| Chassis | **Canoe hull** | the canoe's hull, its inside in the trim colour | hauls: her sigils pull ×0.65 (the Haul broom was ×0.5) | slow to cruise: treetop pick-up 0.3 → 0.4 s (`acceleration` 10 → 7.5) | Ferry |
| Exhaust | **Jet nozzles** | the jet bike's twin glowing nozzles | take-off 1 → 0.5 s and landing 1.5 → 0.75 s on the shared cooldown | lets go slowly: glides 1 → 1.8 s to a stop | Rocket, Pile driver |
| Exhaust | **Twig bristles** | the twig broom's long bundle and stray twigs | one more dodge: 2 → 3 charges (the Double blink broom) | boost builds slower: 2 → 3 s | Hedge |
| Exhaust | **Oar blade** | the oar's flat blade | sharp on foot: ground pick-up 28 → 40 | blinks 15 → 12 m | Ferry |

Today's passive brooms become part stats (Long → the Curled tip, Double blink → the Twig bristles, Haul → the Canoe hull; the plain broom's quick take-off → the bare broom and the Jet nozzles), and the movement boons unlocks.md set aside for the garage land here too (the Hare's blink charges → Twig bristles, the Mole's fast rise → Ladder, the Raven's treetop speed → Missile nose). Stats from different parts add up (a Missile nose and a Hobby-horse head can't both be fitted, so no slot fights itself).

**The next nine**, for later batches (the other shapes, one slot each): tips Handlebars, Speeder prongs, Gyro bubble nose; chassis Bicycle frame, Drone plate, Gyro keel; exhausts Fan or Round bristles, Mop head, Pitchfork tines, Speeder engine, Gyro pusher prop. The Classic stays the bare broom's look.

## Sets and today's broom spells

Every set's pieces are listed with their slot. The three-piece sets are the pegboard's three columns, and the two-piece sets cross them. The two-piece sets are laid out so that **no broom can complete two sets at once**: no three-piece set contains a two-piece one, and the two two-piece sets need different chassis. So there's never a choice of spells to resolve, and R always means one thing.

| Set | Pieces | Spell (today's, rules/spells.ts) | Why |
|---|---|---|---|
| **Rocket** (3) | Missile nose + Jet-bike fairing + Jet nozzles | **Speed** (R: ×2.2 for 4 s, 12 s recharge) | the fast set gets the boost |
| **Hedge** (3) | Curled tip + Ladder + Twig bristles | **Stealth** (passive: unseen unless inviting or placing; lost past 25 m) | an old wooden broom, quiet, long blinks and an extra dodge |
| **Ferry** (3) | Hobby-horse head (as a figurehead) + Canoe hull + Oar blade | **Ley jump** (R: to the ley line's pulse, 60 s recharge) | the ley line as a river she's ferried along |
| **Joust** (2) | Hobby-horse head + Jet-bike fairing | **Battering** (passive: blinks stun what's in her path) | a charger in armour |
| **Pile driver** (2) | Ladder + Jet nozzles | **Ground pound** (R: up or down at once, knocking back, the landing stunning) | a heavy frame hammered down by jets |

All five of today's spell brooms are placed: Speed, Stealth, Ley jump, Battering and Ground pound. The bay shows each set's progress as chips ("Rocket 3/3 · Speed", "Joust 1/2 · Battering"), so a player can see a set coming before it's whole. Spell numbers stay the tuning's `spells.*`. One of unlocks.md's kept ideas fits here: a full set could change her treetop trail (sparks for Rocket, leaves for Hedge, spray for Ferry), as a later pass.

## The night's one find: trunk or wreck

`nightFind` already says one find a night, of one kind. The question is how the night chooses between a trunk (a wearable) and a wreck (a part).

**Recommended: one draw over everything left.** Every upgrade she hasn't found is one ticket: today's 10 findable wearables (`FINDABLE`) and the 9 parts. The night's seed draws one ticket, and its kind decides the find: a wearable puts a trunk on the island and a part puts a wreck there. Early on a wreck comes about half the time (9 of 19), and both pools run dry together, so neither kind is left to grind at the end. Later hats and bags join the same draw as their own kinds. Two refinements:

- **A part leans to its biome** (its pegboard cell, below): from phase 3, when islands have biomes other than temperate, a part's ticket only counts on islands in its cell's direction, or, softer, counts double there. Phases 0 to 2 are all temperate (`kinds.ts`), so until then every part is eligible everywhere.
- **The first wreck comes early**: on her second night (or the first night after she has seen the Workshop), the draw is from parts only, so she meets the loop before trunks have taken all the early finds.

Alternatives:

- **Alternate**, trunk then wreck: predictable, and the player always knows what's in the stars. One pool runs out first, and then every night is the other kind.
- **By island**: each island holds a fixed kind (dealt like the hat shrines in unlocks.md), so a player learns where wrecks lie. This fights the "never two at once" rule less than it fights the one-a-night rhythm: some nights would have nothing to find.
- **By canopy**: wrecks only in areas with thin canopy, trunks under thick. This is a placement rule more than a pick, and it could sit on top of the recommendation.

Where a wreck stands: as `placeTrunk` does today (a seeded wild area, never home, in its woods round its middle, off clearings and the legend's circle, clear of the relics), with no glint, and drawn only within 120 m. It's the same `find` art job, keyed by the part. What's in the stars is the part's own outline (`OUTLINES` by its id: a nose cone, a ladder, a canoe).

## Wreck scenes

Every part's wreck is its own scene: the part itself, as it lies, with its dressing (a country-kit piece like `travel-trunk`, built from `art/brooms.js`'s kinds so the part looks exactly as it will on her broom). Every wreck has a lost pointed hat somewhere in it, and a moss and tuft skirt in the area's own colours.

| Part | Pose | Dressing |
|---|---|---|
| Missile nose | the missile buried tail-first, only its nose and band up out of a mound, like a shell that never went off | a ring of fins snapped off round it, scorched earth, the hat hung on a fin |
| Curled tip | snapped in two over a mossy log, the curl hanging off the far side | bristles strewn along the log, ivy over the break, a hat crushed under the log |
| Hobby-horse head (shot) | driven upright into the ground like a grave marker, the horse looking out | a red scarf tied round its neck, ivy up the handle, bristles at its foot, the hat beside it |
| Jet-bike fairing | on its side, sledged a long furrow into the ground | a torn-up trail of turf behind it, the windscreen cracked, ferns grown up through the furrow |
| Ladder | leaning against a trunk as if climbed, rungs broken | the hat high in the tree's lowest branch, a lantern at its foot |
| Canoe hull (shot) | turned turtle in the moss, its bow up on a root | a fern through a split in it, its paddle beside it, the hat on the ground |
| Jet nozzles (shot) | nose-down, the back end up, the nozzles cold and sooted | a scorched ring of thrown earth, moss over the near side, the hat flung clear |
| Twig bristles | a bristle-bundle on its own, wedged in a fork of roots, the handle gone | bristles and twigs scattered for metres, as if it came apart in the air, the hat upturned with water in it |
| Oar blade | the blade stuck straight up out of a pool's edge or a damp hollow | reeds round it, the handle under the water line, the hat floating (where a pool's near) |

The mock shots show three of them (Jet nozzles, Canoe hull, Hobby-horse head) at ground zoom, standing where seed 123's trunk stands. The jet and canoe read at a glance in the witch's light. The upright hobby horse is the hardest to read, which suits a find, though the final art should push its head and scarf.

**Picking it up**: E at the wreck (within the trunk's reach, 2.2 m) while the party's on: the part is hers at once (the `found` event; "found: Jet nozzles · at the Workshop" under the clock), and the wreck stays, stripped of the part (the empty trunk's rule). After the party's lost the wreck is gone. A part found and the night then lost is kept (unlocks.md, 2026-10-18).

## The room

The Workshop is the round room off the Terrace (radius 7.5 m, west of it at a bearing of −100°, joined to it by a branch). Today it holds two placeholder boxes, the broom stand and the pegboard. It gets three stations along its back wall:

- **The bay** (in the middle): the broom up on trestles, a mechanic's creeper under it. Walking up to it slides in its **station menu** (no E). It has three shelves (tip, chassis, exhaust), each a row of part cards (∅ for an empty slot, her parts, and the rest as locked silhouettes, as the wardrobe shows them). Then a **Sets** row of chips, the focused part's detail (what it raises in green and lowers in red, and the set it's in), and a **"Her broom"** summary, bare → now, for every stat her parts change. Choosing a part fits it at once. She lies on the creeper and rolls under, with welding sparks (the stargazing pose on a board, the hit sparks tinted white), and the camera eases in as the station menus' does. Swapping is free. See [bay-menu.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/bay-menu.png).
- **The lathe** (to one side): the broom spins on it. Its menu is today's broom stand without the shapes and the Power: a **Body** colour grid (handle, fairing, hull), a **Trim** grid (stripes, seat, bristles), both five rows as Ed asked, and **Fit** (Length, Thickness, Bend, and Bristles renamed **Exhaust size**). Fit is looks only: the bay's parts set what the broom does. See [lathe-menu.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/lathe-menu.png).
- **The pegboard** (the other side, its existing spot): a big board laid out as the **3 × 3 biome map**, north up. Centre home (temperate); north cold, north-east mountains, east rocky, south-east badlands, south hot, south-west mangrove, west jungle, north-west cold rainforest (the kinds table's biomes by direction). Each cell holds one part: a found part hangs there in its colours, and a missing one is a dark outline. **Tonight's part glows in its cell** (unlocks.md: the board says one is out there, never where). The three columns are the three-piece sets: west Ferry (Oar blade NW, Hobby-horse head W, Canoe hull SW), middle Hedge (Ladder N, Twig bristles home, Curled tip S), east Rocket (Missile nose NE, Jet-bike fairing E, Jet nozzles SE). Walking up shows it as a station menu of its own, read-only. Two alternatives: make it the bay's fitting menu (the bay zooms into the board), or a full-screen close-up like the zoo's book. See [pegboard.png](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/workshop/pegboard.png).

**The flow**: she lands on the Terrace and walks into the Workshop. At the pegboard she sees what she has and whether tonight's island holds a part. At the bay she fits parts, the sets lighting up. At the lathe she paints and shapes it. Then she walks out to the Terrace and takes off. Mid-night the same (time at a tenth in the house): a part just found can be fitted the moment she flies home.

## What replaces the broom stand

When the Workshop lands, the **broom stand** object (`config/house.json` `broomStand`, the wardrobe's `broomStand` station: `broom`, `broomFit`, `broomPower`) goes:

- the **broom** shelf (shapes) is gone: shapes are parts now, fitted at the bay;
- **broomFit** moves to the lathe as its Fit shelf, with the broom's two colours from the broom shelf's grid;
- **broomPower** (the Power row) is gone: the spell comes from the set her parts make (`SpellState.broom` set from the parts, not picked);
- the creator's Broom box and `?broom=` stay as debug switches for a while: `?broom=speed` fits the Rocket set, and a new `?parts=missile,jetfairing,jets` fits any three.

**Saves**: what this browser keeps today is the loadout (`witch.loadout`: a broom spell), the genome's `broom.kind` (a shape) and the owned items (`witch.owned`, where the Classic and Fan shapes are start items). Proposed migration:

- the saved shape → the Classic look (the bare broom), keeping its colours and fit;
- the saved broom spell → dropped (spells come from sets now); nothing about it is owned, since every spell was unlocked for testing;
- owned `broom-*` items → ignored, since no part is owned at the start (a first game's broom is bare).

Alternative for testers: give a save that had a spell broom the set that casts it, once. I'd rather not: it skips the finds, and every spell was free.

## What we need from Alpha and Echo

**Alpha** (the house's furniture, drawn by id and footprint):

- the **bay**: trestles (or a stand) holding the broom at waist height, about 3 × 1.2 m, with a mechanic's creeper on the floor under it and a tool chest; the broom on it is ours (her own, drawn from her parts);
- the **lathe**: a workbench with a lathe on it, about 2.4 × 0.8 m, with paint tins and brushes, room on it for her broom spinning;
- the **pegboard**: a 3 × 3 board on the wall, about 2.8 × 2.2 m (its current footprint), with nine cells, a painted compass rose at the top and a biome's colour in each cell's frame. The parts hanging on it are ours (each part's sprite, a found one in colour and a missing one as an outline, the glow ours too);
- the Workshop's dressing: sawdust and shavings, a broom-shaped burn on the floor, a workbench lamp.

The wrecks are ours (the art kit's country pieces, like the trunk), and so are the parts' own sprites.

**Echo** (the station menus, being changed now for the broom stand):

- a shelf kind for **parts**: a row of part cards that are wider than the 54 px item cards (parts are long), with ∅ first;
- a **sets** row (chips with progress) and a **detail** box that can list stat changes, green up and red down, and a "Her broom" summary;
- a station with **no items**, only colour grids and Fit (the lathe);
- the broom stand's Power row and shapes gone, and the **pegboard** as a read-only station (or the bay's zoom, whichever Ed picks);
- multiplayer later: a part on a friend's broom shown as taken ("on Bea's broom"), so each part is used by one witch at a time.

## Multiplayer (noted, not built)

Only the host's found parts are in the Workshop, and each part is on one witch's broom at a time: fitting a part a friend has fitted is refused, and the card says whose broom it's on. Sets therefore compete: two witches can't both fly Rocket. When a guest leaves, her parts go back on the board.

## Building it, when Ed says go

1. **Rules**: `rules/broomParts.ts` (the parts as data in a new `config/broom-parts.json`: slot, look, stat changes, sets), what the bare broom and each part do to the tuning's numbers, and the set → spell (`SpellState.broom` from parts); tests.
2. **Art**: `art/brooms.js` split so a kind's body draws as a tip or a chassis, the broom assembled from three parts; each part's outline for the constellation; the nine wrecks in the country kit.
3. **Finds**: `nightFind`'s draw over wearables and parts; `placeTrunk` places a wreck too; E picks up a part (`found`).
4. **The Workshop**: the bay, lathe and pegboard stations, with Echo's panel kinds and Alpha's furniture; the broom stand retired; the save migration.

## Open questions

1. **The sets**: Rocket → Speed, Hedge → Stealth, Ferry → Ley jump, Joust → Battering, Pile driver → Ground pound, as above? Or swap Ferry and Joust's spells?
2. **The night's pick**: one draw over everything left (recommended), alternate, by island, or by canopy?
3. **The pegboard**: its own read-only station (recommended), the bay's fitting menu as a zoom into the board, or a full-screen close-up?
4. **Biome lean**: a part only on islands in its cell's direction from phase 3 (strict), counts double there (a lean, recommended), or anywhere?
5. **The bare broom**: keeps today's plain broom's quick take-off as the baseline (recommended), or loses it, so the Jet nozzles win it back?
6. Does a full set change her treetop trail (unlocks.md's kept idea) in the first build or later?
7. The next nine parts: which batch, and do any of them make new sets (for example a silly set with the Bicycle frame and the hobby horse: no upside, every creature turns to look)?
