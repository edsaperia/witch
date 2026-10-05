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
- **Aggro on the witch** (Ed, 2026-10-04): a wild creature goes for her as soon as she's on the ground **in its area** (Ed's playtest, 2026-10-04; it replaced "within its attack range or 30 m"), or within its attack range; it lets her go when she rises to the treetops, or once she's out of its area **and** out of its range **and** at least 30 m away, and then walks back to its spot. Attacks are mixed by species: some shoot slow, telegraphed shots; melee ones wind up and lunge. Both can be dodged. Some kinds **kite**: long-range attackers that hold a distance as part of their attack, backing off when she closes in and closing in when she's too far (Ed: "some creatures try and keep a certain distance as part of their attack pattern, rather than they run away per se").
- **Inviting under fire** (Ed's playtest, 2026-10-04): **the creature she's inviting doesn't attack her** while the chat runs (its friends still do), **and her party leaves it be** (Ed, 2026-10-04): her leashed and parked animals don't go for it, and their shots and area hits pass it by; other wild creatures are fair game, and once the chat's off it is too. **A creature enraged by a wave (besieging or marching on a soundsystem) can't be invited**: repelling a big mixed attack shouldn't turn into inviting one and watching the rest set on it. Enraged creatures show angry red eyes. A creature that's only going for the witch (above) isn't enraged and stays invitable.
- **A larger responsive area** (Ed's playtest: "this will make them feel much more alive and responsive"): creatures notice and react from further off (to each other, the party and her: `combat.aggro`, `combat.engage`, `guard.radius`, `notice` in the tuning file). Wild ones roaming near her on the ground turn to look at her when they pause; babies of a curious kind come up to her, skittish ones keep their distance.
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
- **Levelling up**: the witch leads creatures around to **eat berries** that grow in the forest; it is the only way to level up. **Evolving stops at adult** (Ed, 2026-10-04): legends are the areas' own, never grown from a party animal (an adult still eats to heal). Berries may not regrow, or regrow slowly, so taking creatures into the forest to level them up is an adventure.
- **Neutral behaviour varies by kind, and perhaps by level**: some attack, some run away, some ignore her, some are friendly, some flock or surround her.
- How deeply music wakes a creature **varies by kind**.
- **Beaten creatures run off the map** (Ed, 2026-10-04: "it's sad when animals die"): a beaten creature, wild or party, runs away visibly to the edge of the map, out of the world, and is gone for good (it no longer vanishes on the spot). A beaten party animal is lost for the run, off its leash as it goes.
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
- **Home's area holds the whole circle from the dancefloor out past the treehouse** (Ed, 2026-10-05: "Home area should be big enough that the whole circle, centre the dancefloor, edge the treehouse, is within it - should fix this before generating the rest of the areas on the map"). The map is cut with home first: a circle centred on the dancefloor, reaching past the treehouse's footprint with a margin (`home.margin`), is all home's ground, and the areas round it are cut round it, their own centres kept clear of it (`home.gap`), so no neighbour cuts into the dancefloor, its speakers or the treehouse.
- **Home is a meadow of its own** (Ed, 2026-10-05: "It should also have its own custom floor; a pleasant green meadow with flowers"): it doesn't roll one of the creature area types' looks (art/areas.js `HOME_AREA`, not in the random pool; neighbours aren't kept from sharing home's rolled type), its ground fresh green grass with wildflowers, and **no trees, bushes or scenery anywhere in home's area**. **Party decorations instead of trees** (Ed: "It has party decorations instead of trees; we have already made these, they can be scattered around the whole home area, excluding the dancefloor"): the party objects (the home set, small lights, balloons, litter, furniture, set dressing) and their clusters strewn over the whole meadow (`partyObjects.home`), off the dancefloor's clearing, the paths, the treehouse and her seat, with an arch over each path where it leaves the floor.
- **The treehouse stands due north of the dancefloor, just outside its ring of speakers** (Ed, 2026-10-05: "The treehouse should be 5m due north of the dance floor, outside the speaker ring"): its footprint's nearest edge 5 m (`treehouse.gap`) beyond the ring, always facing south, to the floor and the camera; home's circle reaches out past it.
- **The first ley line leaves from the front of the treehouse and runs straight south across the dancefloor** (Ed, 2026-10-05: "The start of the first leyline should go from the front of the treehouse"; "The ley line leads from it south across the dancefloor and then towards the first speaker"): due south from the treehouse's front, through the ring of speakers and over the floor, a little way past the ring (`leyLines.depart.past`), then curving smoothly to the first objective's soundsystem, that stretch kept outside the ring. Later lines are unchanged.
- **The ley line is six sections long: the next three runestones and the past three** (Ed, 2026-10-05: "the leylines work well - let's try six sections long, showing the next three and the past three runestones"): from the last runestone reached it runs on through the next three objectives in wave order, each section fainter, and back through the three stones reached before it, dimmer, so the way ahead and the way come both read; further out it isn't drawn. Reaching the next stone draws a new section out ahead and lets the oldest go behind. **Only the next runestone has a HUD indicator** (Ed: "We only need the UI indicator for the next one, not the next two").
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
- **Pace:** one new area per wave, at a fixed pace (5 minutes for now, Ed 2026-10-04; wild creatures don't grow over time). In the final game waves will likely be **about a minute apart, about 30 of them** (Ed, 2026-10-04). Fights are **long**, and soundsystems take a long while to destroy, so you always have time to feed babies. Pressure builds because sieges outlast the wave gap and overlap, and survivors of a lost defence march on to the next-nearest soundsystem. (An "annoyance" raid system is parked as an optional setting.)
- **Start:** the home speaker ring boots up first: **five minutes, from her first step off the decks** (Ed, 2026-10-05: "a boot up period of 5 minutes"; it was one minute from the start screen). No wave comes and no area grows till it's done, but the animals still attack (Ed, 2026-10-05: "boot up - animals still attack - you just have more time to build an army and do quests before things get difficult"); then the first wave's countdown begins, so wave 1 lands ten minutes after she gets up.
- **Movement:** creatures move at their own pace and are never carried by the witch. She is much faster than almost all of them; fast creatures are rare and weaker; legends are very slow.
- **Forecasting:** the next two waves are confirmed, plus a probable set. Rune stones grow a circle of up to 12 symbols, and the 12th means next. The beams grow with the countdown.
- **Music:** one track; louder and clearer near playing soundsystems, muffled in the deep forest, distorted by damage nearby.
- **Spells:** one chosen per run from a list unlocked across runs, used on a cooldown. The list includes spells, placed items (buff totem, knockback bomb), speed boots and instant evolve. The first is the speed boost.
- **Legends,** while happy, each give the witch a unique buff.
- **Controls** (Ed, 2026-10-04: MOBA style; remapped 2026-10-05: "WASD and mouse. right click is dodge, q is up/down, e is place sigil/cycle"): **WASD** moves (the arrow keys too), the **mouse** aims and left click throws 💌s, **right click** dodges (the dash; Space too), **Q** rises or lands, **E** puts down a sigil or cycles them, **R** the spell, 1–4 for later spells, items and totems, shown on an action bar with their recharge. Talking is automatic (Ed, v244). Feeding is automatic: party animals eat berries near them.
- **Combat** (later stages):
  - **Sides:** wild and party animals fight each other with one shared system. No friendly fire. Wild creatures attack the witch on the ground (Ed, 2026-10-04: see The witch). **Same kind never fights same kind**, whichever side, always (Ed, 2026-10-04: even at a soundsystem): inviting doesn't start fights inside a group, and your wolves can't defend against wild wolves. Mixed defences are the puzzle.
  - **Level-ups:** babies don't attack. Young have one attack; adults a stronger one plus a second ability or modifier; legends one slow, powerful signature move.
  - **Defeat:** health bars show only when hurt. A beaten creature, wild or party, **runs off the map** and is gone for good (Ed, 2026-10-04); a beaten party animal is lost for the run.
  - **Control:** leash position only. Party animals on her leash take on whatever attacks her or them, staying near the leash; parked ones (at a sigil) guard a small radius round it and come back to it (Ed, 2026-10-04).
  - **Babies are never attacked** (Ed, 2026-10-04: "Babies don't attack. No animals should attack babies."): by either side; shots and quakes pass them by, and they can't be beaten in a fight. A leash of babies is safe in a fight; only a knockout loses them. **Babies don't get enraged** either: when a wave wakes their area they stay home as before, join no siege, and **stay invitable** (Ed: "yes, babies stay invitable").
  - **Healing** (Ed, 2026-10-04): a party animal is healed to full when it eats a berry (a hurt one goes for berries even at a legend's level) and when it's invited ("animals should go to full health after they've invited"). Wild creatures don't heal. Berry patches near a soundsystem are a defensive resource.
  - **Soundsystems** are passive and don't heal.
  - **Dodging:** some species dodge, as a behaviour trait.
  - **Status effects:** a brief immunity after a stun or ensnare; slows don't stack.
  - **Cover:** nothing blocks attacks.
  - **Legends** are the areas' own: one sleeping in every area, a mini-boss once its area's wave wakes it (see Sleeping legends).
  - **Balance:** an equal power budget per level, spent differently.
  - **Hit feel:** medium, with screen shake only for legends.
  - **Content:** built from data-driven parts (movement, behaviour drives, attack delivery, effect and timing, skins). The first slice is **10 contrasting species**; balance tools are a dashboard page and an in-game arena mode.
- **Mode roles:** treetop mode is the strategic map, ground mode is for micro.

### Balance and forecasting power (Ed, 2026-10-04)

- **Measure it** (Ed, 2026-10-04: "We need some kind of measure of how powerful we think a player can get, and how quickly"). The measure is **fighting value**, F = Σ √(hp × dps) over a side's fighters (Lanchester's square law): a baby 0, a young 15.5, an adult 29, a legend 76. The side with more F wins, with about √(F_big² − F_small²) left. The idle-loss time ("if you do nothing at all, how long will it take for you to lose?") is a useful **lower bound**; what matters more is how irrecoverable the end is: whether a player who reacts late can still catch up.
- **Populations** (Ed, 2026-10-04; this replaced an earlier "populations by distance from the centre" ruling, and relaxes "wild creatures don't grow over time"): **every area starts the same, with one baby and one young** (Ed, 2026-10-05, after playing: "the game is hard! we should start each area with just one baby and have a boot up period of 5 minutes", then "actually, the game should start with one baby and one youth, otherwise you can't avoid enraging lots of legends": a legend grows restless once its area has none of its kind, so with one creature an area every invite angers one; before that one young and one adult, Ed 2026-10-05: "could start with 1 youth instead of 1 baby and 1 adult; that should make it easier", after the fight bot found the first fights too hard; before that one baby and two adults, Ed 2026-10-05: "Two adults it is"; and before that one adult) (plus its sleeping legend, when that's built). **Every wave, each still-wild area spawns one more non-legend creature at a random level**, by tuned weights (equal thirds of baby, young and adult to start); partified areas don't spawn. So the areas the party reaches late are the dangerous ones, and older areas get dangerous to cross on foot. New creatures arrive naturally: out of the witch's view, never popping in on screen. Far from every witch they stay counts, made (from the seed) when she comes within the creature simulation radius or their area wakes, so the game never simulates or draws thousands of idle creatures.
- **Skill should matter** (Ed, 2026-10-04: "A worry is that all games last about the same time, and the difference between a good player and a bad player is small (because the enemies grow exponentially). You just go along and then suddenly get steamrolled. We might need to adjust as we go along to keep pressure on players but not suddenly overwhelm them. The obvious way to do this is have areas spawn creatures over time in response to the player's progress."). The key measure is the **skill spread**: how long a player lasts by how fast they grow; roughly twice the skill should give twice the survival, never a common cliff. Spawning over time relaxes the earlier "wild creatures don't grow over time"; it stays behind a tuning flag, and reinforcements must arrive visibly (from the map's edge or deeper areas, never popping in) and only out of the witch's view. The population growth above is built; the other pacing variants (attrition on the march, a director) stay in the simulator until Ed picks one.
- **Direction** (Ed, 2026-10-04, via the coordinator): the game stays mostly about the hero (the witch), her army and defence. The wave clock stays for now, though its meaning will probably change later. Not to build yet: each area's legend flipping between asleep, happy and angry through quests.
- **Every area has a sleeping legend** (Ed, 2026-10-04, via the coordinator): it wakes angry when its area's wave arrives and stays in its own area as a mini-boss (480 hp, 12 dps), attacking the witch, her creatures and that area's soundsystem; it doesn't march (alone it topples a 4000 hp soundsystem in about 5.6 minutes). **Evolution stops at adult**, so players can't make legends, and **no other legends spawn**. Modelled in the balance simulator (`areaLegends`); not built in the game yet.
- **Species strength and berry costs** (Ed, 2026-10-05): some species are weaker or stronger per creature than others. Weaker ones spawn in larger numbers (a swarm, like bees), stronger loners fewer. Their levels cost different numbers of berries. Ed worried varied counts make the rule less legible, and ruled: "We should definitely segment the ring, and tie the cost to strength" (the ring under a party animal shows one segment per berry). Then (Ed, 2026-10-05): "I don't think we should have distinct classes, just a number that goes up and down. If we need to increase berry spawn rate to make up the numbers, that's ok - we can make the berry clusters bigger." Built: each species has a strength number (`combat.json` `strength.species`, 1 normal, e.g. 0.3 for a swarm, 2 for a loner) multiplying its health and damage, so its fighting value goes by the same factor; its areas start with and grow by 1 / that many (fractions carried from wave to wave), so an area's fighting value stays about the same; and a level costs the fighting value it gains, at `berries.cost.per` a berry, rounded, at least one, so a berry buys the same for every species (2 and 2 for a normal one, was 1 and 3). Berry patches are bigger to match (`berries.perArea`, `patch.bushes`). No species has a number yet.
- **The creature-state model** (issue #87, Ed 2026-10-05, via the coordinator): the witch does no damage; she only invites. Wild becomes happy by inviting (it defends its own area, never enraged); leashing a happy one is a second step, and only leashed ones grow (on berries). An area's wild young and adults (and its legend, unless its quest is done) turn enraged when it gets its soundsystem and besiege the nearest; babies never do. Knocked down, happy, leashed and enraged creatures run off for good (wild ones lie dazed first); nothing new grows where there's a soundsystem. **Creatures still never attack their own kind** in any state, so a fresh soundsystem must be defended by other species (her leashed army, neighbours, legends). **An area's enraged legend goes back to sleep when that area's soundsystem falls**, rather than besieging elsewhere. **Legends redesigned the same day** (replacing that): soundsystems no longer wake them; asleep by default (a dream quest gives its buff while it sleeps on); **restless** while its area holds none of its kind (any state, babies and parked leashed ones too), a nightmare seen from far off, calming as soon as one is back; **angry** after about 60 s of that: slow long-range blasts (a lobbed bomb, a beam) reaching into the next areas, at the witch and her posse only, never soundsystems; **happy** where she places a **relic** by it (3–4 a map, giant party objects she finds and carries as a sigil): a powerful defender against the enraged in range, and its buff. Legends never leave their area and never attack their own kind. Modelled in the balance simulator (`src/rules/states.ts`).
- **A fallen soundsystem costs wave time** (Ed, 2026-10-05: "there's not much penalty for losing a soundsystem. Maybe it penalises you wave time?"; "All waves sooner seems like the wrong kind of penalty"): each soundsystem that falls brings the **next wave 60 s sooner** (at once if the countdown has less than that left). Modelled in the balance simulator (`fallAdvance` in `src/rules/states.ts`); not in the game yet. A fixed 60 s, not a share of the gap (Ed, 2026-10-05). **No last stand yet** (the sieges hurrying once a run is lost) and **no swarm/ranged mix in late sieges yet** (Ed, 2026-10-05: "let's do more playtesting before we make extra rules").
- **No win screen** (Ed, 2026-10-05): you keep going until you lose; "once things are unrecoverable it's not fun to wait to lose", so the simulator measures the tail from the point of no return to game over (`tools/balance/endgame.mjs`, `tools/balance/waves.mjs`).
- **Tools:** the debug overlay's power meter (the party's F, leashed and parked, against each siege's and every marcher's together); a **playtest log** (every 10 s: time, wave, party F, creatures by level, berries, invites, each siege's F; L downloads it) so Ed's playtests give the real growth rate; and a headless **balance simulator** (`node tools/balance/sim.mjs`) that plays the real map and wave order with only the sieges, in seconds, for the idle loss, the enemy's F wave by wave, and whether players growing at 30, 50 or 70 F a minute, starting late, can catch up.

### Creature movement (Stage 5; proposed by the builder, 2026-10-04; Ed's direction added the same day)

Ed: this is "really the whole game: leading animals around, and evading animals while they attack you and you're inviting them". Animals should move differently and interestingly, not just straight at you, and usually move together with their own kind. With waves about a minute apart in the final game, a fight has to read at a glance: each kind's movement is its signature.

The system has three layers, all data (`config/movement.json`), so a new species is a few lines:

1. **Steering behaviours**, small and composable. Each one asks for a direction and speed; a creature moves by their weighted sum, capped by its gait, with its own acceleration (heavy creatures turn slowly).
   - **seek** / **arrive** (to a point or target, slowing near it), **flee** (from a threat);
   - **keep range** (between near and far of a target: kiting), **orbit** (circle a target at a radius, either way round), **strafe** (sideways to a target while facing it);
   - **slot** (go to an assigned spot round a target, for group tactics);
   - **separation**, **cohesion**, **alignment** (flocking, with its own kind);
   - **dodge** (step sideways out of a telegraphed attack's path: a shot's line, a lob's ring, a beam);
   - **wander** (a little jitter), **tether** (stay near home, or the leash point).
2. **Movement profiles**, one per species: its gait (walk, run, burst speeds; acceleration), and for each mood (roaming, noticing her, fighting, fleeing) a list of behaviours with weights and settings. A profile also names its kind's **move**: a short special pattern on a cooldown, such as a **charge** (burst in a straight line, then a slow turn), a **pounce** (crouch, then leap at a point), a **hop** (bounding in arcs), a **burrow** (vanish, reappear near the target), or an **ambush** (hold still until something comes close, then burst).
3. **Group tactics.** Creatures of one kind near each other form a **pack**, which picks a tactic when it engages (weighted by species, re-picked every few seconds, seeded):
   - **surround**: slots evenly round the target;
   - **pincer**: two halves come at it from opposite sides;
   - **hit and run**: members take turns darting in to strike, then fall back to a ring;
   - **volley line**: ranged members spread into a line at range and fire together on the beat;
   - **swarm**: everyone rushes in, strongly separated and jittery;
   - **screen**: melee members hold a line between the target and their ranged friends.

**New attack deliveries**, where a pattern needs them:
- **Lob**: an arcing shot at a point, landing after a flight time; a ring on the ground shows where. Step out of the ring.
- **Beam**: a thin line telegraphs it, then it burns along the line for a moment, sweeping slowly. Step out of the line.

Each delivery has a factor so its expected damage a second (allowing for misses and area hits) stays within the level's **equal power budget**.

**Ed's direction (2026-10-04, after a long design talk):** the game is mostly about **your hero unit (the witch), your army and your defence**; the wave clock stays for now. His playtest problem: creatures read as interchangeable "soldiers", and who beats whom is "emergent and totally opaque, and totally overrun by quantity". So each kind needs an identity you read on sight (how it moves, how it attacks, how it telegraphs), and **counters you can see**, so a fight isn't decided by numbers alone.

**The first slice: 11 contrasting species** (personalities in `config/movement.json`, attacks and traits in `config/combat.json`):

| Species | Moves like | Pack tactic | Attack (telegraph) | Trait |
|---|---|---|---|---|
| wolf | trots, then flanks | surround, pincer | melee lunge (ring at its feet) | — |
| boar | charges in a straight line, turns slowly | none | charge with knockback (dust, then a straight run) | heavy |
| hare | darts in and back out, sidesteps telegraphs | hit and run | melee nip | nimble |
| raven | keeps its distance, strafing | volley line | long shot (aim line) | flier |
| bat | flits in erratic circles | swarm | screech: a short pulse all round it (ring) | flier, swarm |
| owl | circles wide and slow | volley line | lob (a ring where it lands) | flier |
| salamander | creeps, holds still to aim | none | beam (aim line, then a burning line) | — |
| spider | lies still until you come close, then springs | ambush | web shot (aim line; an adult's slows) | — |
| mole | burrows (a moving mound, untouchable) and surfaces under its target | none | upheaval: a pulse as it surfaces (ring) | burrower |
| toad | leaps in arcs, landing near its target | none | slam on landing: a small pulse (ring where it lands) | — |
| beetle | plods straight in, slow to turn | none | melee shove with knockback | armoured |

**All 30 species (Ed's species pass, 2026-10-05: "Yes, give all 19 a profile").** Every species now has a profile, the other 19 with new signature moves where they called for one (a ram's run-up, the stags' paired charge, a badger digging in, a beaver's block, a lynx's pounce, a fox's flank, a snake's strike, a moth's pull to light, rolling hedgehogs and woodlice, a snail's slime, a glow-worm's flash). Speeds are a fight's (times tuning `fight.speed`); every one closes from afar at its sprint (`combat.pursuitRun`, 20 m/s, unless it has its own). Each new move has a debug arena preset (`?arena=` swipe, wide, pair, ram, dig, block, flank, pounce, weave, packflank, otter, squirrel, dart, roll, slime, woodlouse, strike, moth, flash).

| Species | Speed (m/s) | Accel (m/s²) | Behaviours | Pack tactic | Signature move | Trait |
|---|---|---|---|---|---|---|
| wolf | 17 | 70 | arrive, slot, separation, cohesion | surround, pincer | — | — |
| boar | 14 | 25 | arrive, separation | — | charge (lowers its head 0.5 s, builds to 30 m/s, overshoots, brakes in an arc) | heavy |
| hare | 20 | 150 | arrive, slot, strafe, dodge, separation | hit and run | — | nimble |
| raven | 19 | 80 | keep range, strafe, slot, separation | volley line, (alone) | — | flier |
| bat | 19 | 110 | orbit, wander, separation, dodge | swarm | — | flier, swarm |
| owl | 16 | 40 | orbit, keep range, slot, separation | volley line, (alone) | — | flier |
| salamander | 12 | 30 | keep range, separation | — | — | — |
| spider | 15 | 90 | keep range, strafe, separation | — | ambush: still till she's within 20 m, then a burst | — |
| mole | 13 | 50 | arrive, separation | — | burrow: under from 10 m, surfacing under her | burrower |
| toad | 12 | 40 | keep range, separation | — | leap: an arc 6 m high, slamming down round it | — |
| beetle | 12 | 15 | arrive, separation | — | — | armoured |
| bear (new) | 13 | 20 | arrive, separation | — | heavy swipe: a wide, hard blow with a short lunge (5 to 6 m) | heavy |
| elk (new) | 15 | 18 | arrive, separation | — | charge, heavy: slow to build, a wide braking arc (60°/s), runs on 16 m | heavy |
| stag (new) | 16 | 30 | arrive, slot, separation | pincer | charge in a pair: its pack mate sets off with it | heavy |
| ram (new) | 14 | 35 | arrive, separation | — | backs off 7 m/s while it lowers its head, then rams (fast to build) | — |
| badger (new) | 12 | 40 | arrive, separation | — | digs in when she's within 6 m: rooted 3 s, half damage, no knockback, bites without a lunge | — |
| beaver (new) | 12 | 40 | arrive, separation | — | braces behind its tail when a shot comes at it or its target winds up: rooted 1 s, shots ×0.15, blows ×0.5; then slaps back at once | — |
| fox (new) | 18 | 90 | arrive, slot, strafe, separation | flank, surround | — | — |
| lynx (new) | 16 | 70 | arrive, strafe, separation | — | pounce: a low, quick leap (2 m high, 0.45 s), landing its blow on her | — |
| stoat (new) | 19 | 160 | arrive, slot, strafe, dodge, separation | hit and run | — | nimble |
| marten (new) | 17 | 100 | arrive, slot, separation, cohesion | flank, pincer | — | — |
| otter (new) | 17 | 130 | arrive, strafe, dodge, separation | — | — | nimble |
| squirrel (new) | 18 | 170 | arrive, slot, dodge, separation | hit and run | — | nimble |
| dormouse (new) | 13 | 180 | arrive, slot, wander, strafe, dodge, separation | hit and run | — | nimble |
| hedgehog (new) | 10 (sprint 14) | 30 | arrive, separation | — | rolls curled up (charge): spikes whirling, taking ×0.3 | armoured |
| snail (new) | 6 (sprint 8) | 10 | arrive, separation | — | slime trail: a patch every 0.4 s, drying after 7 s, slowing her to half | armoured |
| woodlouse (new) | 9 (sprint 12) | 25 | keep range, separation | — | rolls curled up (charge), taking ×0.3 | armoured |
| snake (new) | 14 | 80 | keep range, strafe, separation | — | ambush strike: still till she's within 16 m, then springs and strikes at once | — |
| moth (new) | 15 | 90 | orbit, wander, light, dodge, separation | swarm | drawn to light: glow-worms and soundsystems within 40 m | flier, swarm |
| glowworm (new) | 9 (sprint 10) | 30 | keep range, separation | — | flash: within 9 m, a burst of light slowing the other side 1.5 s (her to 0.6) | — |

New pieces for them: a **flank** tactic (slots at the target's back, the way it's heading, striking only from behind); a **light** behaviour (drawn to the nearest glow-worm or soundsystem); the charge's **backup**, **pair** and **curl**; the leap's **strike** (a pounce lands a blow on its target, not a slam round it); the ambush's **strike**; and four new moves, **dig**, **block**, **trail** and **flash**. Slime and the flash slow the witch too (her speed times the move's `slow`, a moment). The bear gets its own attacks (`swipe`, `bigswipe`); otters, squirrels and dormice join the nimble. Babies never fight. Party animals use the same profiles against wild ones, inside their leash. Everything is deterministic (seeded, fixed steps).

**Traits and counters** (data: `combat.json` `traits` and `counters`). The raw numbers stay on the **equal power budget** for the level (same health, same damage a second). The difference is in behaviour and in a few multipliers anyone can read:
- **Flier**: melee hits it for half (it flits up out of reach). Ranged attackers beat fliers' melee enemies; fliers beat melee.
- **Armoured**: shots, lobs and beams hit it for a third; knockback hits it for double and stuns it a moment (flipped on its back). Melee knockback beats armour; armour beats ranged.
- **Swarm**: area hits (pulses, quakes, lobs, beams) hit it for double. Area attackers beat swarms.
- **Heavy**: no knockback and slows last half as long; but it turns slowly, so sidestepping beats it.
- **Nimble**: steps out of telegraphed shots and lobs; area pulses catch it.
- **Burrower**: untouchable while burrowed; it has to surface to strike.

A counter is **shown**: a hit that's strong against its target flashes big and gold with a "!!"; a resisted one goes "tink", small and grey. Each creature with a trait wears its trait's mark by its health bar while it fights (placeholders: flier sky blue, armoured a steel square, swarm violet, heavy a brown square, nimble green, burrower earth).

**Wild legends get move sets** (`movement.json` `legends`): a looping **pattern** of big, telegraphed moves (a **slam** pulse; a **nova** ring of shots; a **spin** beam sweeping all round; a **charge**, backing off first to get a run), with long wind-ups you can read and dodge (a reach ring, spokes, the circle a spin will sweep, the lane a charge will run down), and a **phase change** at half health: a roar and a burst, a red aura, it speeds up and its pattern gains the spin. Try one in the arena: `?arena=wolf*4@2,bear*1@3`. This is a step toward the legend states below.

**Debug arena** (Ed, to see and judge patterns): `?arena=wolf*4,beetle*3` spawns, in the home clearing, your side (parked by sigils: the first group) against the wild side (the second); `wolf*4@2` sets the level (default young, 1). Hers at `@3` are happy area legends guarding the arena; a wild group ending `!` besieges home's soundsystem. So `?arena=boar@3,wolf*6@2!` shows a happy legend defending home against a siege. It's set below the dancefloor; she stands behind her side (the wild go for the nearest, so hers first). `J` sets the arena up again.

### Creature states (Ed, 2026-10-05; issue #87)

"Nobody is being killed in this game; we are throwing a party, we're inviting everyone, some people don't get invites and so are offended." Four states (`src/rules/creatureStates.ts`, knobs in `config/states.json`; the balance simulator's model of them is `src/rules/states.ts`):

| | Wild | Happy | Leashed | Enraged |
|---|---|---|---|---|
| **Attacks** | the witch in or near its area; leashed animals not travelling | only the enraged (defends its own area) | the wild and the enraged | the witch, the happy and the leashed; besieges the nearest soundsystem |
| **Invitable** | yes (the 💌 meter; the chat until the 💌s land) | its second step, to leashed (`leash`: `again`, a second meter; or `hold`) | no (for good) | no; it stops 💌s, as legends do |
| **Knocked down** | dazed for `daze` seconds (nothing attacks it, it can still be invited), then runs off | runs off | runs off | runs off |
| **Berries** | no | no | in her posse only | no |

- Wild and happy ignore each other; wild and enraged too. Nobody ever attacks its own kind, whatever the states: an enraged animal with no foe of another kind besieges on.
- A wave's soundsystem enrages its area's wild creatures (part-invited ones too: their meters are lost); happy ones, leashed ones and babies never are. Areas with a soundsystem grow no new creatures.
- Happy ones stay in their own area; once it has a soundsystem they dance round it, breaking off to fight a siege.
- Knocked down, the witch is sent home and her carried sigils are put down where their animals stand: they stay hers, a parked group.
- **The 💌 meter** (`src/rules/affection.ts`, the interface agreed with the rendering builder on #87): `hit(g, c, amount, time)` adds to a creature's affection; a full meter takes `affection.hits` hits at its level (baby, young, adult); at most one 💌 counts on a creature every `affection.gap` seconds; it drains at `affection.drain` of a full meter a second, `drainDelay` seconds after its last hit. Full, a wild one becomes happy; a happy one (with `leash` `again`) is leashed. `invitable(c)`, `blocksLetters(c)` and `affection(g, c)` (0..1 or null) are what the 💌s and the view read; `c.state`, `c.dazed`, `c.dazedUntil` and `c.dancing` are the creature's.

### Travelling and posse (Ed, 2026-10-05)

Ed: "when you have leashed creatures and are flying far in treetop mode, or you plant a sigil for a creature far away from where it is, those creatures have to walk a long way ... We probably don't want party animals getting into fights while they're just traversing the world when you're not looking." Approved design (knobs in `config/travel.json`):

- **Posse:** a party animal within about 60 m of the witch while she's on the ground, or, at a placed sigil, inside the sigil's area or within that distance of it. It fights, is noticed and defends as ever. The radius is set by the fight's spread (lunges, the hit-and-run ring, pursuit, charges' overshoot) and scales with `fight.scale`. It leaves the posse only at 1.4 times that (no flickering at a fight's edge), and never while it's engaged: while it has a target, or for 4 s after it last had one or was hit.
- **Travelling:** everything else, including following her through the treetops. Quiet both ways: wild creatures (besiegers too) don't notice or target a traveller, it engages nothing, and area hits pass it by. It eats no berries ("Only leashed creatures eat berries, and only when not in travel mode").
- **Border routes:** a traveller's route is planned when it sets off and again when its target moves on: the straight line, its points pushed out of every area's middle (at least 50 m from the centre, except near its start and its target), smoothed. It travels at 1.4 times its leash pace, since border routes are longer.
- **The leash shows the route** (Ed's addition): while travelling, the leash is drawn as a dotted line on the ground along the route to her or the sigil, flowing that way and shortening as it walks; joining the posse again, it pops back to the taut thread.

### Motion scale (Ed, 2026-10-04, after playing v386)

Ed: "the animals don't move around enough when attacking and defending … I don't really perceive [the new attack patterns]". At the ground camera's 80 to 140 m, the old speeds (2.6 to 4.5 m/s), lunges (1.2 to 1.8 m) and strafes were a few pixels. So fights now play at the camera's scale:

- **Speed.** In a fight, animals move at about the witch's speed (she's 19.25 m/s on the ground): 12 to 20 m/s by species (`movement.json` `speed`; others `combat.fightRun` 14), with high acceleration. Closing in from over 30 m off, they sprint at `combat.pursuitRun` (20 m/s). Roaming and idle speeds are unchanged.
- **Patterns about 50 m across.** Surround and pincer slots sit at the attackers' reach (about 15 m for melee). Hit-and-run falls back to a ring at least 25 m out. Kiting holds 20 to 36 m. Volley lines stand 32 m off and 6 m apart. Charges run up from 10 to 45 m. Separation and flocking radii are about 3.5 times what they were, so packs spread rather than clump.
- **Pursuit.** Party animals on her leash chase up to `combat.pursuit` (40 m) from her before giving up; parked ones up to `guard.radius` (40 m) from their sigil. Normal following is unchanged (`leash.length`). Wild ones go for party animals within `combat.aggro` (30 m).
- **Fast aggro** (Ed: "When I go into an area, the creatures in it should be onto me in a few seconds"). The moment she's on the ground in a wild area, every hostile creature in it notices her. After a `combat.reaction` beat (0.3 s) it comes at the pursuit speed, so even from the far side (about 112 m) it's on her in about 5 s. Babies and friendly areas are excepted. The area's creatures are already made and running whenever she's within `creatureSimRadius` (600 m), and fighting creatures are stepped every step, so nothing delays them.
- **Melee lunges are 12 to 16 m:** a dash-strike at 60 m/s. The windup shows its line on the ground.
  - At the witch the lunge keeps that line, so she can sidestep it.
  - At a creature it homes in, since creatures can't read a telegraph. Fliers are the exception: they flit up out of its way, the flier counter made visible.
- **Knock-ons:**
  - Shots fly at 22 to 32 m/s over 20 to 40 m. Lobs land in 4 to 5 m rings. Beams are 20 to 24 m long and 2 to 2.8 m wide. Pulses reach 5 to 7 m, quakes 11 to 12 m.
  - Knockback throws 7 to 12 m.
  - Windups are unchanged, and the boar now lowers its head for 0.5 s with its lane shown before it charges, so everything stays dodgeable.
  - Damage a second is unchanged: the equal power budget doesn't depend on speed.
- **The witch:** her dash (5 m in 0.18 s, every second) still dodges a lunge (its windup is 0.45 to 0.55 s and she needs about 3 m), and rising still ends a fight. But with creatures as fast as she is on the ground, she can't simply outrun a pack. Flag for Ed: if that feels unfair, a longer dash (8 to 10 m) is the knob.
- **Momentum** (Ed, 2026-10-05, after v439: "the charging animals move a jerkily - they should have more momentum").
  - A charge now has phases. The boar lowers its head (0.5 s, easing to a stop, its lane shown), then builds speed at `accel` (40 m/s²) up to 30 m/s down the locked lane. It hits once and carries on through, `overshoot` (8 m) past its target. Then it brakes at `brake` (30 m/s²), turning in an arc toward its target at `turn` (140°/s), until it's down to its run and steers again. These are the boar's `move` in `movement.json`.
  - All fight steering accelerates at most at the profile's `accel`. The new `tuning.fight.momentum` divides every fight acceleration, braking and turn rate, so 2 is twice as heavy.
  - Facing has a margin, so it doesn't flicker as a creature passes straight up or down the screen.
  - The view blends creatures between rule steps up to 20 m a frame (5 m before), so a fast charge at a low frame rate is still smoothed.
- **Spacing** (Ed, 2026-10-05: "animals attempted not to bunch up while moving; the distance they want to keep can depend on their size"). Every creature has a body radius: its kind's, from `movement.json` `bodies` (a dormouse 0.3 m, a bear 1.4 m), times its level's scale (a baby 0.5, a legend 3.2). Two creatures keep (r1 + r2) × 1.3 + 0.5 m apart. Once a step, after all movement (roaming, following her, marching, fleeing, going home, fighting), creatures within 150 m of a witch ease apart from anyone closer, at up to 6 m/s. It's soft: a pack still closes on its target, and a fight profile's own separation still applies on top. A sleeping legend holds its ground and pushes others off. It's cheap: a grid, and at most 8 neighbours each (about +0.4 ms a step at wave 30, 5,000 creatures).
- **Wild pursuit is short** (Ed, 2026-10-05: "wild creatures shouldn't pursue you very far outside of their area"). A wild creature chasing the witch gives up once she's `combat.leaveArea` (10 m) past its area's edge, then turns back and walks home. It won't take her up again from outside unless she comes back. Besiegers keep their old rule, and party animals are unchanged. (Fixed on the way: happy legends and an area's guards are on her side, so they never go for her.)
- **Live knobs.** `tuning.fight.scale` multiplies every fight length (ranges, lunges, radii, knockback, pattern sizes, pursuit, aggro). `fight.speed` multiplies every fight speed (running, charging, lunging, shots).
  - `?fightScale=` and `?fightSpeed=` set them at the start.
  - In the debug overlay (~): sliders and a reset, or [ and ] for scale, ; and ' for speed and , and . for momentum, live mid-fight (and `?fightMomentum=`).
  - They're remembered on the browser, and every change goes in the playtest log.
- **Arena presets at the new scale:** `?arena=surround`, `pincer`, `hitandrun`, `charge`, `volley`, `kite`, `swarm`, `lob`, `beam`, `ambush`, `burrow`, `leap`, `armour`, `legend`, `siege`.

### Legends, redesigned (Ed, 2026-10-05; issue #87)

This replaces the legend rules in "Sleeping legends" and "The first quest" below (kept for the record). `src/rules/legends.ts`, knobs in `config/legends.json`.

| State | How | Effect |
|---|---|---|
| **Asleep** | the default; soundsystems no longer wake them | it dreams of a creature (its quest) |
| **Asleep + buff** | its quest done: that creature's sigil put down in its area while the quest is open (till the area's soundsystem switches on) | its buff is hers for good; it sleeps on; the creature stays hers, parked there |
| **Restless** | its area has none of its own kind (any state, leashed ones parked there and babies too) | its dream turns to a nightmare (`c.restlessness` 0 to 1 over `angryAfter`, 60 s); it calms back to sleep as soon as one of its kind is there again |
| **Angry** | restlessness run its course | it shoots the witch and her posse from afar (never soundsystems, never happy creatures) |
| **Happy** | a relic put down next to it (within `placeRadius`) while it sleeps or is restless | its buff is hers for good, and it shoots the enraged from afar |

- **Relics:** `relics.count` (4) giant half-buried party objects per map (the art builder's party relics), in areas at least `minRemoteness` from home and `spacing` areas apart. On the ground, the sigil button by one picks it up (it's a relic sigil in her stack, `leash.relics`); carrying one, the sigil button by a sleeping legend puts it down there.
- **Attacks** (angry and happy alike; Ed: long range, slow, less damage): a legend never leaves its area, standing where it lay, but reaches `attack.range` (420 m, 2 to 3 areas). Every `interval` (15 s) it winds up for `windup` (2.2 s), then lobs a bomb (landing after `lobFlight` 3 s, `lobRadius` 8 m) or fires a beam (`beamWidth` 3 m, `beamTime` 1.6 s), by species (`beam` lists the beamers), at up to `targets` (3) of the nearest, `damage` (10) a hit. Its health is 480; a happy one heals to whole over `healTime` (2 min) when nothing's near. (The balance builder's values, #80: legend damage is the game's most sensitive knob.) Angry legends' shots are the wild's (her, her posse), happy ones' the happy's (the enraged).
- **The long charge** (Ed, 2026-10-05: "charging legends do long distance charges knocking away everything in the way... but they'd have to go back to their area after each one"; "medium speed (they're huge, and heavy), and they have a big slowdown arc afterwards. They can curve somewhat as they charge to hit their target"). The charging legends (`charge.species`: boar, elk, stag, ram, hedgehog, woodlouse, those whose fight move is a charge; Ed to confirm) charge instead of lobbing or beaming, in `config/legends.json` `charge`:
  - **Telegraph:** head down for `windup` (2.5 s), its first lane shown on the ground (`laneShown` 60 m, `laneWidth` 6 m), brightening.
  - **The run:** building speed (`accel` 9 m/s²) to a medium top `speed` (24 m/s, a little above her run), curving toward its target at up to `turn` (24°/s): a sharp sidestep or a blink beats it, drifting doesn't. It runs straight through scenery, till it's past its target or out of `attack.range`.
  - **The slowdown:** it doesn't stop dead. It brakes over `brake` (30 m), turning wide at `arc` (55°/s), overshooting.
  - **What it hits:** everything in its lane but its own side and its own kind, once each, run or slowdown: `damage` (10), knocked aside `knockback` (9 m, less as it slows); the witch loses her one point and is thrown aside and staggered as by any ram (`witch.knock`, #108). Angry, that's her, her posse and the wild alike; happy, it charges at besiegers and tramples only what isn't hers or happy.
  - **Then home:** it walks back to where it lay at `returnSpeed` (6 m/s, its fight run), and only there, after `rest` (2 s), may it charge again: the trip home is its real cooldown. Out of its area meanwhile, it's worn down by the normal rule (Ed: "same as anywhere else").
  - Legends are too huge and heavy to be knocked about themselves.
  - Ruts of churned ground show where it ran, fading over 12 s.
- **Long range only** (Ed, 2026-10-05: "close up move set - stick with the long range one for now, we can see in playtesting"): legends fight only with their long-range attack (or the long charge), near or far, on its normal timing. The close-up move sets (slam, nova, charge; spin in phase 2) stay in the code and data, off by `closeMoves: false`.
- **Worn down** (its health gone, angry or happy): it goes back to sleep; a buff she has from it is kept ("losing buffs feels bad": buffs once earned are never taken away). Enraged animals within `attack.wornReach` (40 m) go for a happy legend.
- **For the view:** `c.legendState` (asleep, restless, angry, happy), `c.restlessness`, `c.questOpen` (its dream shows while true), `c.buffed`, `g.relics` (`state`: lying, carried, used; `kind`: the art's party relic id), `g.leash.relics`; leash events `relicPicked` and `relicPlaced`.

### Sleeping legends (Ed, 2026-10-04; superseded by "Legends, redesigned" above)

**Every area has a legend of its kind, sleeping** (Ed: "The first major change, I think, is that every area has a sleeping legend in it"). They replace the rare wild legends: no legend comes from anywhere else. Party animals evolve no further than adult, and nothing else makes a legend.

- **Asleep, it's scenery.** Ed: "ancient creatures, half sunken into the ground, they could almost be mistaken for scenery. They have been sleeping for centuries."
  - It lies out of its area's clearing, sunk into the ground and grown over (a placeholder until art builder 2's sleeping forms land: the legend's art, sunk and tinted toward moss).
  - It has no health bar, no glow, no eyeshine and no aura: nothing marks it as a creature from afar.
  - You can't attack it or invite it, and walking by doesn't wake it.
  - It costs almost nothing: no AI and no roaming, drawn in an instanced batch.
- **Its area's wave wakes it, angry.**
  - A burst of soil, then it heaves up out of the ground over `wildLegends.wake` seconds, untouchable meanwhile.
  - Then it's a mini-boss with red eyes and its move set (Creature movement, above). It guards its own area: it attacks the witch, her creatures and its area's soundsystem there, never beyond.
  - It doesn't march when that soundsystem falls. Its area's ordinary creatures march on the soundsystem as before.
- **Beaten, it sleeps for good.** It doesn't run off. It sinks back into the ground where it stands and never wakes again that run, so its soundsystem is safe from it.
- **Happy, it joins the party in its area and gives its buff.**
  - It stays in its own area: not on her leash or her stack.
  - Its legend buff is on while it's happy.
  - **It fights incoming sieges** (Ed, 2026-10-04). It guards its area like a parked party animal with a large guard radius (`wildLegends.guard`, 40 m round its area's centre). It takes on wild attackers entering its area, especially sieges marching on its soundsystem or through its area to others, with its legend move set (slam, nova, charge; spin in phase 2). (Since Ed, 2026-10-05: with its long-range attack instead, `legends.closeMoves` off.)
  - Defaults until Ed rules otherwise: it heals `wildLegends.heal` hp a second while no enemy is near. If beaten, it sinks back to sleep for good and its buff ends, like a defeated legend.
  - A legend becomes happy through its quest (The first quest, below); the debug key **O** also makes the nearest one happy.
  - **Home has no legend** (Ed, 2026-10-05: "Home area shouldn't have a legend"; "no home starting buff"): she starts every run with no buff.
- **The state machine:** asleep → its area's wave → waking → awake (angry) → beaten → asleep for good; and asleep or awake → (later: mollified) → happy.
- **Consequences.**
  - Legend buffs now come from happy legends (`rules/buffs.ts`). The party-legend path stays in the code, dormant, for mollified legends joining her later.
  - The knockout rule "legends aren't loyal" is moot, since no legend is ever on her leash; it's left in place.
  - The legend moves' power budget is unchanged: 480 hp, 12 dps.
  - Early pressure: from the first wave on, every woken area has a legend to beat or avoid next to its soundsystem. That's much more pressure than before, when legends were rare and remote. The balance builder's simulator can model it.

### The first quest (Ed, 2026-10-04; superseded by "Legends, redesigned" above)

**Each sleeping legend dreams of a creature.** A thought bubble over it holds that creature's sigil, drawn in its level's variant (Ed, 2026-10-05: the sigil's own level look, no pips).
- The creature is a species found on the map, never the legend's own, at a random level. It's chosen from the seed when the map is made.
- The bubble reads on the ground. From the treetops a smaller one floats high over the legend.
- **Fulfilling it:** put that sigil down anywhere in the legend's area while the area is still wild. That means a creature of that species and level from her stack, placed with the usual sigil action. Then:
  - the legend becomes **happy**: the bubble pops in sparkles, and the legend stirs and rises contentedly;
  - **all the area's creatures become friendly**: they don't attack her or her party, and her party leaves them be;
  - **the creature she placed joins the area**: it leaves her leash and stack and becomes one of the area's creatures.
- **When a happy area's wave comes**, all its creatures (the legend, the one placed and the area's own) become **party animals that stay in the area and defend it**.
  - They guard it like parked party animals with an area-wide radius: anything hostile in the area, within `wildLegends.guard` metres of where each one stands.
  - They aren't on her leash or stack.
  - The legend's buff is on, and it fights with its move set.
  - No siege comes from that area.
- **If the quest isn't done before the area's wave**, the area wakes **angry**.
  - Its creatures go for the **nearest party animal or soundsystem**, whichever is nearer.
  - Its legend wakes hostile but **stays in its area**: it guards it against her, her creatures and its soundsystem there. Beaten, it sleeps for good.
- **Defaults, for Ed to overrule:**
  - A friendly area still grows each wave, and the newcomers are friendly too.
  - Friendly creatures (and guards) can still be invited. Taking them weakens the area's future defence; that's the player's call.
  - The quest can't be done once the area's wave has come.
  - The debug key **O** stays (L is the playtest log's download): it makes the nearest legend happy, as if its quest were done.
  - The balance simulator's legend options stay debug-only.
- **Demo:** `?quest=1` starts her beside the nearest sleeping legend, with the creature it dreams of on her stack. Press E there.

**Planned direction, not built yet (Ed, 2026-10-04):** each area will have a **legendary animal that can be flipped between asleep, happy and angry**, by things that aren't only fighting (quests, mostly exploring the forest). So legends need **distinctive, readable move sets of their own**; the move sets above are written as data per legend so each can get its own later.

### Multiplayer (Ed, 2026-10-04)

- **Online co-op** is a goal (not versus, not same-screen); networking comes later. Each player is a witch with her own leash stack, spell and camera; creatures, soundsystems, waves and the forecast are shared.
- **Waves:** the clock stays the same; each wave wakes **one new area per witch** in the game at that moment, so witches can join and leave mid-game and it still works.
- **Sigils:** each witch has her own stack, but a sigil placed on the ground belongs to no one: **any witch can pick it up**.
- **Legend buffs apply to every witch** while that legend is happy, whoever made it so.
- **For builders now:** no single-witch assumptions in new rules code (pass the acting witch explicitly); per-player state (camera, mode, music mix, HUD, edge cues) lives in `src/render/`; inputs go through one place that could later carry a player id; the picker and forecast take `areasPerWave` (1 for now). Done in Stage 4: `game.witches[]` (each with her body, leash, spell, dash and health; `game.witch` reads the first), and a fixed-timestep (1/60 s) deterministic simulation driven only by inputs and the seed, drawn eased between steps (for balance sims, off-screen fights and netcode).

## Run structure

- A run is a sequence of **waves** (above) and ends when every soundsystem is destroyed.
- Exploring and defending are **probably in phases**; to be found by experiment.

## Camera and controls

- **Fixed camera angle**. Zooming in and out may change the angle, and ground mode and treetop mode may have different angles.
- **Gamepad** is the model. Everything should work with **WASD, the mouse and a few action keys** (MOBA style, Ed 2026-10-04; remapped 2026-10-05: right click dodge, Q up/down, E sigil, R spell), and so also with a **touch joystick and buttons** on phones.

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
