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
- **As time goes on the party grows**: the music gets more intense and the **party zone** around the dancefloor spreads. In the party zone, trees have lights on them and party paraphernalia is scattered around.
- **Idle creatures dance**, and **other witches** appear and fly around.
- **Soundsystems** scattered around spread the music.
- **The threat**: the growing party zone wakes and annoys creatures that are sleeping. They come to shut the party down by **destroying the soundsystems**.
- **Invitations**: if the witch reaches **young creatures** before the music wakes them and gives them an invitation, they **join her side** and help defend the party.
- **No death**: defeated creatures **run away in tears**.

So the party's growth is both the goal and the source of the danger.

### Waves and the end of a run (Ed, 2026-10-03)

- The party grows in **waves**: every few minutes the **music gets louder** and **new soundsystems magically appear** further from the dancefloor, in a **roughly circular pattern**.
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
- She **does not fight and is never attacked**. Only her creatures and her home are.
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
- Each kind has **a few levels**, from **cute babies** up to **giant legendary magical creatures**.
- **Levelling up**: the witch leads creatures around to **eat berries** that grow in the forest; it is the only way to level up. Berries may not regrow, or regrow slowly, so taking creatures into the forest to level them up is an adventure.
- **Neutral behaviour varies by kind, and perhaps by level**: some attack, some run away, some ignore her, some are friendly, some flock or surround her.
- How deeply music wakes a creature **varies by kind**.
- **Defeated creatures run away and disappear.**
- Creatures **pass through each other**, with a **repulsion force** as they get close.
- **The main work of the game is unique behaviour for each creature.**
- **Creatures grow more numerous and higher level with distance from home** (Ed, 2026-10-03): the **home area** (the dancefloor's own) holds **no creatures** (Ed, 2026-10-03); the areas next to it hold a couple of babies; areas towards the edge of the map hold about 20 creatures, including a couple of legendary ones.
- Creatures **spawn in their own area**. Areas may change how creatures move: some slower or faster, some impassable (for example a watery area that some creatures cannot cross, or cross slowly). Whether a creature is better in its own area is left open on purpose: with so many creatures to design, each may have its own relationship with areas.

## The leash

- A leashed creature **roams within the length of its leash** around a **leash point**.
- The witch can **pick up a leash point and put it down again** elsewhere.
- The witch carries leashes as a **stack**: one button **picks up or places**, last in, first out. She can **carry many leashes at once**, and can "fight" by **leading a swarm around**.
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

## Run structure

- A run is a sequence of **waves** (above) and ends when every soundsystem is destroyed.
- Exploring and defending are **probably in phases**; to be found by experiment.

## Camera and controls

- **Fixed camera angle**. Zooming in and out may change the angle, and ground mode and treetop mode may have different angles.
- **Gamepad** is the model. Everything should work with **WASD and a few action buttons**, and so also with a **touch joystick and buttons** on phones.

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
