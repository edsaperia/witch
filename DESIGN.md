# Witch — design document

*Witch* is a working title. This document grows as Ed and the coordinator settle things; anything not written here is undecided. Builders read it before starting work, and record nothing here that Ed has not ruled. Unless marked otherwise, everything here is Ed's, 2026-10-03.

## Priorities

- Witch is a creative project. **Quick development cycles** and **easy playtesting**, by Ed and by people he shares it with, come before everything else.
- Witch is played **in the browser first**, so it is quick to build and share. Nothing is chosen that would make a later port to other platforms impossible.
- Ed has designed and directed games but not developed one. The coordinator brings game-development practice and says when a choice goes against it.

## Pitch

A roguelite that crosses a **creature collector** with **tower defence / real-time strategy**. The player moves around a map, finds creatures, collects them and levels them up, and **leashes** them to locations, where they defend the player's home against incoming enemies.

## The party

The heart of the game (Ed, 2026-10-03): **the witch is throwing a rave in the forest.**

- In the middle of the map is a **ritual circle**, which is the **dancefloor** and the home. It is a wide ring of standing stones around a **glowing magic circle** on the ground, with a **magic disco ball floating above it**, throwing specks of light across the clearing (Ed, 2026-10-03).
- **As time goes on the party grows**: the music gets more intense and the **party zone** around the dancefloor spreads. In the party zone, trees have lights on them and party paraphernalia is scattered around. The lights are **colourful string lights hung between the trees**, twinkling (Ed, 2026-10-03).
- **Idle creatures dance**, and **other witches** appear and fly around.
- **Soundsystems** scattered around spread the music. A soundsystem looks like a real custom sound-system stack (a stepped wall of bass bins, mid-horns and tweeter boxes) crossed with a **magic fantasy rock**: hewn stone cabinets with glowing runes, glowing crystal cones, a floating top tier and crystal shards (Ed, 2026-10-03).
- **The threat**: the growing party zone wakes and annoys creatures that are sleeping. They come to shut the party down by **destroying the soundsystems**.
- **Invitations**: if the witch reaches **young creatures** before the music wakes them and gives them an invitation, they **join her side** and help defend the party.
- **No death**: defeated creatures **run away in tears**.

So the party's growth is both the goal and the source of the danger.

### Waves and the end of a run (Ed, 2026-10-03)

- The party grows in **waves**: every few minutes the **music gets louder** and **new soundsystems magically appear** further from the dancefloor, in a **roughly circular pattern**.
  - **First prototype rule** (Ed, 2026-10-03): a wave every **30 seconds** (a countdown bar down the side of the screen, for prototyping). On each wave, **every area adjacent to a partified area** (home, or an area with a soundsystem) **gets a soundsystem and becomes partified**, with a short **magical transition**: a wave of light sweeps in from the neighbour, the string lights pop on, and the soundsystem rises in the clearing.
- Because the party zone is a circle growing in 2D, **eventually the witch cannot get round it fast enough to invite all the creatures**.
- **Destroyed soundsystems stay destroyed.**
- **The run ends when every soundsystem is destroyed.** Soundsystems get harder to defend as the area grows.
- **Score is how long you survived**; the reward is **how much of the music you get to hear**.
- The **map starts much larger** than any party reasonably gets; the edge is never reached.
- **The clock is fixed**: everything is balanced around the wave timer and the length of an average game, **about 20 minutes**. There may be game modes or difficulty levels.
- **Arcade, not economy**: balance for an **inevitable, catastrophic defeat** rather than an economy slowly overwhelmed. Playtesting and changing numbers will find what is fun.
- **The arc of a run**: at the start the music is gentle and the forest large and dark, and it feels like exploring a huge magical forest full of mysterious creatures; by the end it is a chaotic, frantic bullet-hell battleground.
- Ideas, not settled: the party may spread **through neighbouring areas** rather than in a strict circle, giving an irregular shape that differs every run, with **soundsystems at the areas' Voronoi points**; soundsystems may be **repairable, slowly**.
- Woken creatures **go for the nearest soundsystem**. They fight the witch's creatures if in range or attacked.

## The witch

- The player is a **witch flying on a broomstick**.
- She **does not fight**. She is not safe from attack: **wild creatures attack her on the ground** (Ed, 2026-10-04, after a playtest: inviting was too cheap, flying into the next wave's area and inviting everything before it woke). Wild young and up shoot at her or strike her in ground mode within range, with telegraphed, dodgeable attacks; she's safe over the treetops. **She can still invite them while they attack**, so inviting means dodging while staying near them: a main part of the game loop. Big, strong groups are hard to invite without getting hit; babies are the easiest (they don't attack and are quick to convince). A hit doesn't set an invite back: losing a hit is the cost (Ed, 2026-10-04).
- **Aggro on the witch** (Ed, 2026-10-04): a wild creature goes for her once she's within its attack range or 30 m; it lets her go when she rises to the treetops, or once she's out of its area **and** out of its range **and** at least 30 m away, and then walks back to its spot. Attacks are mixed by species: some shoot slow, telegraphed shots; melee ones wind up and lunge. Both can be dodged. Some kinds **kite**: long-range attackers that hold a distance as part of their attack, backing off when she closes in and closing in when she's too far (Ed: "some creatures try and keep a certain distance as part of their attack pattern, rather than they run away per se").
- **Her health** (Ed, 2026-10-04): she takes **three hits** (one point each, whatever hits her). One comes back every **20 s**, the timer starting over whenever she's hit, so to recover she has to get right out of the fight. Pips under her show her hits once she's been hit.
- **Knocked out** (Ed, 2026-10-04): at no hits left she collapses where she is (no more hits, no input). **Her sigil stack lets go from the bottom up, about a second each**, each sigil splashing away and its leash dissolving; as each goes, **its creature is no longer hers**: it turns **neutral** (it attacks no one) and walks at its own pace to the **nearest area of its own kind** (else the nearest area the party hasn't reached), where it becomes an ordinary wild creature of that area, keeping its level (and wakes with that area's wave). On the way it can be invited again, at the normal time. **Creatures at sigils on the ground aren't on her leash, so they stay hers: park your army before you scout** (Ed: "leashed creatures going wild when you're knocked out might be the best design idea so far, and might be the thing that makes the whole game work"). **Legends aren't loyal either: they go back to the wild ("they're too old for this")**, a home-made boss; their buff ends then. Then she sparkles out and back in at the treehouse. A big stack takes a long time to let go: "dramatic, and it probably means you just lost the game".
- **The dash** (Ed, 2026-10-04): on the ground, a quick burst of a few metres the way she's steering, about once a second. She can still be hit while dashing ("then you have to dash in the right direction").
- The pressure on the player is **defending the party**. What she does while her creatures defend is **invite, collect and upgrade more creatures**.

### Two modes of movement

- **Ground mode**: under the trees, slower, with full sight of what is on the ground.
- **Speeds** (Ed, 2026-10-03, after the first playtest): ground mode about **14 m/s** (the first cut's treetop speed); treetop mode much faster, starting at about **32 m/s**. Both are tuning numbers. The **treetop camera is low**, looking towards the horizon so you see far ahead, for a sense of speed (Ed, 2026-10-03).
- **Treetop mode**: above the canopy, faster, but the canopy hides the ground. From above she sees only **tall landmarks**, **large creatures**, and the ground in **clearings** where the trees are sparser.
- **Switching** is fast but not instant: the witch and the camera move vertically. Each piece of foliage is made of **two halves, top and bottom**; the tops are hidden at ground level and appear at treetop level.
- **Foliage, rocks and the like are only visual**: she weaves freely through them in either mode.
- She can **invite and leash creatures only from the ground**. From the treetops she can spot creatures only in a clearing or if they are huge.

The trade is speed against information: treetop mode covers distance, ground mode reveals what is there and is where creatures are caught.

## Creatures

- **One kind of creature per area type**, so as many kinds as area types: about **30 to test with**, **100 or more by release**.
- Each kind has **four levels: baby, young, adult and legendary** (Ed, 2026-10-03), from **cute babies** up to **giant legendary magical creatures**. Each level is a clear size step up from the last: **adults clearly bigger than young** (Ed, 2026-10-04: "the size difference should be obvious ... use the current Adult models for Youths, and come up with something larger for Adults"), so the bigger kinds' adults stand well over the witch.
- **Levelling up**: the witch leads creatures around to **eat berries** that grow in the forest; it is the only way to level up. Berries may not regrow, or regrow slowly, so taking creatures into the forest to level them up is an adventure.
- **Neutral behaviour varies by kind, and perhaps by level**: some attack, some run away, some ignore her, some are friendly, some flock or surround her.
- How deeply music wakes a creature **varies by kind**.
- **Defeated creatures run away and disappear.**
- Creatures **pass through each other**, with a **repulsion force** as they get close.
- **The main work of the game is unique behaviour for each creature.**
- **Creatures grow more numerous and higher level with distance from home** (Ed, 2026-10-03): the **home area** (the dancefloor's own) holds **no creatures** (Ed, 2026-10-03); the areas next to it hold a couple of babies; areas towards the edge of the map hold about 20 creatures. **Legendary creatures are rare: at most one in any area**, and most areas have none (Ed, 2026-10-03). **Idle creatures roam throughout their own area**, never leaving it (Ed, 2026-10-03). **Each creature species has a magical sigil**: an abstract stave-like symbol that evokes the animal. It is the **leashing rune**: when the witch leashes a creature, its sigil is drawn on the ground at the camera's angle, glowing **neon** (Ed, 2026-10-03). **A sigil grows more impressive with the creature's level** (bigger, thicker, brighter, with rings and ornament), so a glance at the runes on the ground shows which creatures of which level are around (Ed, 2026-10-03).
- Creatures **spawn in their own area**. Areas may change how creatures move: some slower or faster, some impassable (for example a watery area that some creatures cannot cross, or cross slowly). Whether a creature is better in its own area is left open on purpose: with so many creatures to design, each may have its own relationship with areas.

## The leash

- A leashed creature **roams within the length of its leash** around a **leash point**.
- The witch can **pick up a leash point and put it down again** elsewhere.
- The witch carries leashes as a **stack**: one button **picks up or places**, last in, first out. She can **carry many leashes at once**, and can "fight" by **leading a swarm around**.
- **Inviting** (Ed, 2026-10-03): on the ground, the witch **talks to a creature in range by herself**: there is no Talk button (Ed, v244: "I tend to just hold it down all the time"; it replaced the held Talk button of 2026-10-03, leaving that button free for later). She picks the nearest invitable creature in range and sticks with it while it stays near, chatting on the fly as she moves and settling into her talk pose when she stops; a legend in range gives her one unimpressed look per approach. In talking range, the witch and the creature take turns showing **speech bubbles with emoji** (🎉🎈💃🎊🥳😛🍉🍒🍷🍸🍹🥂🍺😁😆🫢😮🤭…) for a couple of seconds, like a conversation; then the creature is **invited, and so leashed**. Moving away or rising to the treetops cancels it; the chat drains slowly, so coming back resumes it. **Babies, young and adults can be invited; legends can't.** The higher the level, the **longer the conversation** (babies 3 s, young 6 s, adults 12 s) and the **less enthusiastic** the creature's emoji: adults start bored and busy (😴🫩🥱💼) and warm up as the conversation goes on (Ed, 2026-10-03).
- **Party animals look different from wild ones** (Ed, 2026-10-03): once invited, a creature wears **party gear**: a **glowing collar** in its sigil's colour (always), and a mix of **party hats, sunglasses and fancy shoes**. Party animals **bob and dance** rather than stand still. Woken, hostile creatures will have **angry red glowing eyes**.
- **The leash stack is shown as sigils above the witch's head** (Ed, 2026-10-03): each leashed creature's sigil floats and sways above her, **newest at the bottom** (nearest her head), oldest at the top. The stack **sways with her movement**: gently when she is still, and it **teeters and trails behind her when she moves fast** (Ed, 2026-10-03). Inviting a creature leashes it to her and adds its sigil at the bottom, pushing the others up. **Placing** puts the newest (bottom) sigil down as a glowing neon rune on the ground, leashing that creature there. **Picking it up** returns the sigil to the stack, and the creature follows her again. **A sigil can't be put down on top of another sigil**; a ghost shows where it would land, and a blocked spot fizzles (Ed, 2026-10-03).
- **The bond between a creature and its sigil** (Ed, 2026-10-03; it must stay calm with many creatures on screen): (1) the creature carries a faint neon rim or glow at its feet in its sigil's colour; (2) every few seconds a single spark travels from the sigil to the creature, staggered so they never fire together; (3) a thin dotted neon thread appears only when the leash is under tension, brightening with the strain, and is invisible when relaxed.
- Leashes are **somewhat elastic**: the witch moves much faster than most creatures, so she can fly off with a leash point, put it down somewhere, and the creature makes its way towards it.

## The forest: areas and the map

- The forest is made of **areas**. Each area has **its own vegetation** and is **home to its own kind of creature**.
- **Replayability** comes from a **large number of area types** (and so of creatures) and a **procedurally generated map** that arranges them differently each run.
- **Size**: after the first playtest, Ed asked for areas **twice the size** of the prototype's first cut (taken as twice the width), and **varying more in size**, from small to large (Ed, 2026-10-03). A map is about **20 × 20 areas**. The numbers live in the prototype's tuning file; playtesting will settle them.
- **Arrangement** is mostly random, with some rules; mainly, the **same area type is kept from sitting near itself**.
- The **home, the dancefloor, is in the middle of the map**.
- Area shapes: Ed is inspired by Boris the Brave's *fractal jittered Voronoi partitions* (https://www.boristhebrave.com/2026/08/29/fractal-jittered-voronoi-partitions/).
  - **The method** (from the article, which Ed pasted, 2026-10-03): start with a grid and pick a random point, a *site*, in each square (layer 0: one site per area). Make a grid of half the size and pick layer-1 sites; each site's *parent* is the nearest site one layer up. Repeat for a few layers. A point belongs to the area of the root you reach by following parents up from its nearest deepest-layer site. Borders come out fractal, like coastlines.
  - **Why it suits Witch**: each point is computed on its own from a seed (no diagram to build, any map size), so a map is repeatable from its seed; layer-0 sites are natural **area centres**, where the **clearings** (and perhaps the soundsystems) go; the number of layers sets how wiggly borders are.
  - Working in the Witch Art Lab's scene and map view since 2026-10-03.

### The first 30 area types (Ed, 2026-10-03)

One area type per creature, each a small definition in Ed's columns: **floor** texture, **wall** objects (edges and barriers), **small** objects, **big** objects, a **set piece**, and the **creature**. Rows marked *Ed* are Ed's own; the rest are the coordinator's draft, which Ed approved as a list and may revise.

- **Wall objects don't block movement**, for now (Ed, 2026-10-03).
- **Set pieces are rare bits of scenery**, seen only occasionally, for variety; not every area has one (Ed, 2026-10-03).

| Area | Floor | Wall | Small | Big | Set piece | Creature | |
|---|---|---|---|---|---|---|---|
| Moor | moss | puddles, a lake | long grass | moss mounds | | Badger | Ed |
| Fern forest | pine needles | | ferns | pine trees | | Boar | Ed |
| Muddy forest | mud and leaves | | short trunks with broken branches | trees with many trunks and branches | | Snail | Ed |
| Stone shrine | grassy, stony | mossy henges | little stones | big stones | a shrine | Fox | Ed |
| Tangly forest | nettles and earth | | tangled branches | fairly short tangly trees | | Ram | Ed |
| Wispy forest | dry leaves | | tall thin wispy trees | thick trees with several trunks | | Woodlouse | Ed |
| Hazel forest | short grass | | brown lumps | crooked trees with many branches | | Hedgehog | Ed |
| Garden | uniform grass | ornate stone wall | manicured flower beds | willows | a stone pavilion | Squirrel | Ed |
| Twiggy forest | small leafy plants | | small trees with many thin trunks | straight but slanted trees with many trunks | | Wolf | Ed |
| Ancient | mossy roots over rocks | | sorrel | giant gnarly slanted trees | | Stag | Ed |
| Norway | pine needles and slate | | rocks | straight pines | | Stoat | Ed |
| Alder forest | tall and short grass | | tree stumps with tall grass around | tall slanted trees with thin leaves at different heights | | Snake | Ed |
| Meadow | grass and wildflowers | | scattered hawthorn | lone oaks | | Hare | draft |
| Old oaks | leaf litter | | acorns, fallen branches | ancient gnarled oaks with hollow trunks | a great hollow oak | Owl | draft |
| Berry thicket | pine needles | bramble thickets | berry bushes | tall pines | | Bear | draft |
| Wetland | wet mud | puddles, reeds | reeds and rushes | willows | | Toad | draft |
| Stream | pebbles and grass | a stream or pond | alder saplings | alders | a fallen-log bridge | Otter | draft |
| Rocky slope | scree and moss | boulders | rocks | pines | a rocky outcrop | Lynx | draft |
| Bog | sphagnum moss | bog pools | cotton grass | spruce | | Elk | draft |
| Deadwood | bare earth | | broken branches | blasted dead trees | | Raven | draft |
| Cave mouth | stone and roots | rock walls | stalagmite stubs | dead trees | a cave mouth | Bat | draft |
| Grassland | short turf | | molehills | lone birches | | Mole | draft |
| Beaver pond | birch leaves | a pond | stumps | birch and aspen | a beaver dam | Beaver | draft |
| Log pile | rotting leaves | | fungi | rotting logs | a fallen giant | Stag beetle | draft |
| Heath | heather | | gorse | wind-bent birches | | Moth | draft |
| Old pinewood | pine needles | | pine cones | tall old pines with knotholes | | Pine marten | draft |
| Ravine | wet moss and rock | rock walls | ferns | mossy boulders | a waterfall | Salamander | draft |
| Bluebell glade | bluebells | | ferns | beeches | | Glow-worm | draft |
| Holly thicket | dead leaves | holly hedges | cobwebs | hollies | a web-hung dead tree | Spider | draft |
| Honeysuckle tangle | grass and clover | bramble | honeysuckle | hazel coppice | | Dormouse | draft |

## Combat, pacing and forecasting (Ed, 2026-10-04)

Decided in a long design session with the coordinator; built in stages, with a playable release after each (quick, easy things first, the creature menagerie last).

- **Park your army before you scout** (Ed, 2026-10-04): a knockout lets go of every creature on her leash, but not those at sigils on the ground.
- **Core loop:** the forecast shows where the party spreads next. You head there, inviting, feeding and evolving creatures on the way. Arrive early and you can invite that area's young before the music wakes them. Arrive late and its woken creatures are attacking the new soundsystem, so you defend with what you brought or pre-placed. High-level play is pre-positioning evolved creatures and sigils so you can react, and keeping your creatures alive by using them well.
- **Pace:** one new area per wave, at a fixed pace (5 minutes for now, Ed 2026-10-04; wild creatures don't grow over time). Fights are **long**, and soundsystems take a long while to destroy, so you always have time to feed babies. Pressure builds because sieges outlast the wave gap and overlap, and survivors of a lost defence march on to the next-nearest soundsystem. (An "annoyance" raid system is parked as an optional setting.)
- **Start:** the home speaker ring boots up first.
- **Movement:** creatures move at their own pace and are never carried by the witch. She is much faster than almost all of them; fast creatures are rare and weaker; legends are very slow.
- **Forecasting:** the next two waves are confirmed, plus a probable set. Rune stones grow a circle of up to 12 symbols, and the 12th means next. The beams grow with the countdown.
- **Music:** one track; louder and clearer near playing soundsystems, muffled in the deep forest, distorted by damage nearby.
- **Spells:** one chosen per run from a list unlocked across runs, used on a cooldown. The list includes spells, placed items (buff totem, knockback bomb), speed boots and instant evolve. The first is the speed boost.
- **Legends,** while alive, each give the witch a unique buff.
- **Controls** (Ed, 2026-10-04: MOBA style): movement on the arrow keys, actions on **1 2 3 4 Q W E R**: Q spell, W dash, E sigil, R cycle, 1–4 for later spells, items and totems, shown on an action bar with their recharge; space rises or descends. Talking is automatic (Ed, v244). Feeding is automatic: party animals eat berries near them.
- **Combat** (later stages):
  - **Sides:** wild and party animals fight each other with one shared system. No friendly fire. Wild creatures attack the witch on the ground (Ed, 2026-10-04: see The witch). **Same kind never fights same kind**, whichever side, always (Ed, 2026-10-04: even at a soundsystem): inviting doesn't start fights inside a group, and your wolves can't defend against wild wolves. Mixed defences are the puzzle.
  - **Level-ups:** babies don't attack. Young have one attack; adults a stronger one plus a second ability or modifier; legends one slow, powerful signature move.
  - **Defeat:** health bars show only when hurt. A defeated party animal is **lost for the run**; a defeated wild creature flees and vanishes.
  - **Control:** leash position only. Party animals on her leash take on whatever attacks her or them, staying near the leash; parked ones (at a sigil) guard a small radius round it and come back to it (Ed, 2026-10-04).
  - **Babies are never attacked** (Ed, 2026-10-04: "Babies don't attack. No animals should attack babies."): by either side; shots and quakes pass them by, and they can't be beaten in a fight. A leash of babies is safe in a fight; only a knockout loses them. **Babies don't get enraged** either: when a wave wakes their area they stay home as before, join no siege, and **stay invitable** (Ed: "yes, babies stay invitable").
  - **Healing** (Ed, 2026-10-04): a party animal is healed to full when it eats a berry (a hurt one goes for berries even at a legend's level) and when it's invited ("animals should go to full health after they've invited"). Wild creatures don't heal. Berry patches near a soundsystem are a defensive resource.
  - **Soundsystems** are passive and don't heal.
  - **Dodging:** some species dodge, as a behaviour trait.
  - **Status effects:** a brief immunity after a stun or ensnare; slows don't stack.
  - **Cover:** nothing blocks attacks.
  - **Wild legends** are rare, late mini-bosses.
  - **Balance:** an equal power budget per level, spent differently.
  - **Hit feel:** medium, with screen shake only for legends.
  - **Content:** built from data-driven parts (movement, behaviour drives, attack delivery, effect and timing, skins). The first slice is **10 contrasting species**; balance tools are a dashboard page and an in-game arena mode.
- **Mode roles:** treetop mode is the strategic map, ground mode is for micro.

### Balance and forecasting power (Ed, 2026-10-04)

- **Measure it** (Ed, 2026-10-04: "We need some kind of measure of how powerful we think a player can get, and how quickly"). The measure is **fighting value**, F = Σ √(hp × dps) over a side's fighters (Lanchester's square law): a baby 0, a young 15.5, an adult 29, a legend 76. The side with more F wins, with about √(F_big² − F_small²) left. The idle-loss time ("if you do nothing at all, how long will it take for you to lose?") is a useful **lower bound**; what matters more is how irrecoverable the end is: whether a player who reacts late can still catch up.
- **Populations stay tied to distance** (Ed, 2026-10-04): an area's wild creatures go by how far its rune stone (its soundsystem's spot) is from the dancefloor, in metres, so the map stays dangerous far from home; the map's layout, the area types and the wave order give the variation. A small table in the tuning file (`population`), read between rows, with a roll per area. Starting point (the coordinator's, agreed with Ed): about 100 m (the first ring) 2 babies and 2 adults (a siege worth F ≈ 58); about 250 m 2 babies, 2 young, 3 adults (F ≈ 118); about 400 m, where the party gets by about wave 30 of one-minute waves, 2 babies, 3 young, 5 adults (F ≈ 190); 700 m and beyond mostly adults, and the wild legends (dangerous to explore). Babies are always there to invite.
- **Tools:** the debug overlay's power meter (the party's F, leashed and parked, against each siege's and every marcher's together); a **playtest log** (every 10 s: time, wave, party F, creatures by level, berries, invites, each siege's F; L downloads it) so Ed's playtests give the real growth rate; and a headless **balance simulator** (`node tools/balance/sim.mjs`) that plays the real map and wave order with only the sieges, in seconds, for the idle loss, the enemy's F wave by wave, and whether players growing at 30, 50 or 70 F a minute, starting late, can catch up.

### Multiplayer (Ed, 2026-10-04)

- **Online co-op** is a goal (not versus, not same-screen); networking comes later. Each player is a witch with her own leash stack, spell and camera; creatures, soundsystems, waves and the forecast are shared.
- **Waves:** the clock stays the same; each wave wakes **one new area per witch** in the game at that moment, so witches can join and leave mid-game and it still works.
- **Sigils:** each witch has her own stack, but a sigil placed on the ground belongs to no one: **any witch can pick it up**.
- **Legend buffs apply to every witch** while that legend lives, whoever evolved it.
- **For builders now:** no single-witch assumptions in new rules code (pass the acting witch explicitly); per-player state (camera, mode, music mix, HUD, edge cues) lives in `src/render/`; inputs go through one place that could later carry a player id; the picker and forecast take `areasPerWave` (1 for now). Done in Stage 4: `game.witches[]` (each with her body, leash, spell, dash and health; `game.witch` reads the first), and a fixed-timestep (1/60 s) deterministic simulation driven only by inputs and the seed, drawn eased between steps (for balance sims, off-screen fights and netcode).

## Run structure

- A run is a sequence of **waves** (above) and ends when every soundsystem is destroyed.
- Exploring and defending are **probably in phases**; to be found by experiment.

## Camera and controls

- **Fixed camera angle**. Zooming in and out may change the angle, and ground mode and treetop mode may have different angles.
- **Gamepad** is the model. Everything should work with **the arrow keys and a few action buttons** (MOBA style, Ed 2026-10-04: actions on 1 2 3 4 Q W E R), and so also with a **touch joystick and buttons** on phones.

## Look

- A 3D world with **2D pixel-art sprites** for characters and objects. References: *Cult of the Lamb* and *Octopath Traveler*. Witch develops its own art style as it goes.
- **Transistor** (Supergiant Games) is a further inspiration (Ed, 2026-10-03): colourful, moody, near-isometric; dark, rich scenes lit by saturated glows.
- **Tilt-shift**: the view is blurred towards the top and bottom of the screen, so the forest looks like a miniature (Ed, 2026-10-03). Octopath Traveler shows tilt-shift and pixel art can be combined, unusual and charming.
- **The art so far is placeholder**, to set the scene for prototyping; more art passes come later (Ed, 2026-10-03).
- Art is made with **a generator**, so that the style stays consistent across all assets.
- **For now the art is drawn by code** (Ed, 2026-10-03: "easily good enough"): sprites built from a few parameters per kind and coloured by a style file. Ed explores styles in the **Witch Art Lab** (https://claude.ai/artifact/WLBnF1NrbTezd41A8m5Cfj). An image generator may replace it later through the same asset list.
- Art direction from Ed's references (2026-10-03):
  - **Trees**: larger, wider, taller and sparser, with differently shaped crowns (gnarled broadleaf, willow, birch, tree fern, fir, flat-crowned); plus **bushes and shrubs**.
  - **Night**: a twilight palette, with light revealing that the trees and ground are green; the witch glows and lights what is near her. **High contrast**: dark areas are very dark (near-black, cool), lit things bright, like a moonlit romantic landscape painting. **Scattered light sources** show the lighting off: campfires, glowing magic stones and ponds that reflect the moon (Ed, 2026-10-03).
  - **Legendary creatures are about 20 times a baby's height**, taller than the treetops.
  - **Areas read as colour fields**: each area has its own dominant colour (for example a blue fir area beside an orange autumn one), with pale clearings and shafts of light.
  - **Pixels are larger** (chunkier) and **tree crowns about three times wider** than the first lab's (Ed, 2026-10-03).
  - **Trees are 50% taller than the first cut, with wider crowns** (Ed, 2026-10-03).
- **In ground mode the canopy stays drawn towards the edges of the screen**, cut away only around the witch, so she flies under the forest roof (Ed, 2026-10-03).
- **Tree density rises away from each area's centre**, so every area has a **clearing in the middle**. The change from clearing to edge density is **gradual**, not a sharp edge (Ed, 2026-10-03).
  - **A first bestiary of 20 animals** (proposed by the coordinator, 2026-10-03, not yet ruled): wolf, fox, badger, boar, stag, hare, owl, bear, hedgehog, squirrel, toad, otter, lynx, elk, raven, bat, mole, beaver, stoat, stag beetle, each with a legendary feature (spirit wings, many tails, crystals, great tusks, glowing antlers, a forest on its back...).
  - **The witch is a "modern young adult witch"** (Ed, 2026-10-03): **headphones, sneakers, jeans, and a broom**. Outfits and colours are **unlocked as you go**, or accessories are **picked at the start** of a run; so her sprite is built in **layers** (body, hat, top, jeans, sneakers, headphones, broom) that can be swapped and recoloured. She appears on a **splash screen**, and perhaps as a **JRPG-style character portrait** overlaid when she talks; those are large illustrations, not sprites.
  - **The witch** (Ed's witch references, 2026-10-03; more to come): a young woman in casual, modern clothes (a sweater, a skirt or trousers, a satchel or shoulder bag, often barefoot or in simple shoes) under a **big, floppy, wide-brimmed pointed hat**, often olive or dark green with a coloured band; muted olive, ochre and dark blue, with warm orange accents. She rides **side-saddle**, relaxed. The references also show night-blue scenes lit by candles and strings of fairy lights, a chalk ritual circle with a candle, cats in witch hats dancing to music, and **spirit cats drawn as glowing white outlines**. A second set of references (2026-10-03) adds: the **hat as the dominant silhouette**, huge, with a bent or crooked tip and a ribbon band (one crowned with marigolds); **a lantern** whose warm light glows against blue night; expressive, mischievous faces (a wink, a grin); **headphones** on one witch, a natural fit for a rave; pointed ears and black wings on others; sneakers; warm orange accents against cool blues throughout. The references themselves are other artists' work and are not stored in this public repository.
  - **Creatures are recognisable animals** (wolf, badger, boar) that grow magical features as they level: spirit wings and mane, tusks, bolder stripes; drawn with dark outlines.
- A **lo-fi aesthetic**: few animation frames (walking perhaps two or three).
- Creatures face **left and right only** (mirrored).
- Creatures are drawn in **three-quarter view**, matching the camera looking down at the forest, not in pure side profile (Ed, 2026-10-03). Ed's meaning, from a reference sheet of farm animals: the body is **turned about 30–40° towards the viewer**, head nearer at front-left and rump further at back-right. The camera **looks down**, so the top of the back shows as a lit plane. **All four legs show, staggered in depth**, and the head shows both eyes and ears. A side-on profile with a perspective warp is not enough. Creatures have **turned-towards and turned-away views**, each mirrored for left and right, giving four facings chosen from the direction of travel (Ed, 2026-10-03). Ed prefers the **chunkier, more pixellated** look of the young and baby sprites. **Bigger pixels for everything, one consistent pixel size; babies can be small** (Ed, 2026-10-03), rather than mixing pixel sizes for big creatures.
- Sizes to start, to be experimented with: a baby creature roughly 16 to 24 pixels tall, a legendary 64 or more.
- Ed provides the **style references** that the first style prompts are written from.
- **Coloured light sources** that light the pixel sprites.

### Art pipeline (Ed, 2026-10-03; method proposed by the coordinator, not yet chosen)

- A **list of every asset** the game needs, kept in the repository: foliage (top and bottom halves), and each creature at each level with a few frames each of **walking, attacking and being hurt**.
- A **style**, written as a prompt plus fixed rules (palette, pixel size), that the whole list is generated from. Changing the style and regenerating is how art styles are tried out.

## Engine

**Prototype in Three.js in the browser; port to Godot once Ed is happy with it** (Ed, 2026-10-03). The game's state and rules live in modules with no Three.js in them, so the port carries them over. The art is drawn by JavaScript code (the Art Lab's generator), which the prototype uses directly.

## Order of work

1. A character the player moves around in 3D space.
2. Map generation and art direction, so that the environment feels good.
3. Enemies and creatures, then building and iterating the gameplay loop.

## Practices

- **Find the fun early**: grey boxes and placeholder art until a loop is fun in playtests.
- **Design pillars** settle trade-offs once they are written.
- **Tuning values live in data files** Ed can edit, not in code.
- **Area types and creatures are data**: adding one is a definition file and its art, not new engine code; a creature's unique behaviour is built from shared parts, with its own script only where it needs one.
- **Every change gets a playable link** for playtests.
- **The party loop is first tested in the real game** (the Three.js prototype), not in a separate throwaway top-down prototype (Ed, 2026-10-03).
- **Variants are switches**: where the design is an experiment (phases, camera angles), playtest builds carry a switch for each variant rather than one baked-in answer.
- **Maps come from a seed**, so a tester can share the exact map they played.
- **Scope small, then grow**: a toy, then a slice, then content.

## Open questions

- What persists between runs (perhaps new creatures).
- What a destroyed soundsystem does to the party zone around it.
- Music: Ed hopes to make it with the coordinator.
- Which creatures count as young enough to invite.
- Music: how it intensifies, and whether anything moves to the beat.
- The art generator: which one; how frames are made.
- (Engine settled for now, below.)

## Glossary

- **Dancefloor**: the ritual circle in the middle of the map; the home the party is held at.
- **Wave**: a step in the party's growth, every few minutes: the music gets louder and new soundsystems appear further out.
- **Invitation**: what the witch gives a young creature, before the music wakes it, to bring it to her side: she goes close and holds a button for a couple of seconds.
- **Party zone**: the area around the dancefloor where the party has spread: lit trees, party paraphernalia, music.
- **Soundsystem**: a speaker stack that spreads the music; what woken creatures try to destroy.
- **Area**: a region of the forest, about a screen in size, with its own vegetation and its own kind of creature.
- **Clearing**: a place where the trees are sparse enough to see the ground from treetop mode.
- **Ground mode**: the witch flying under the trees: slower, full sight; where creatures are caught and leashed.
- **Leash**: what ties a creature to a leash point; the creature roams within its length.
- **Leash point**: where a leash is fixed; the witch can pick it up and put it down elsewhere.
- **Treetop mode**: the witch flying above the canopy: faster, sight only of what shows through or above it.
