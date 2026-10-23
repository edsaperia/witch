# Biome forests (India, 2026-10-23; PR on claude/biome-forests)

Each compass biome is a look laid over any species as an island's area art is baked (`art/flora/biomes.js`). It tints leaves, bark and moss, nudges the trees' knobs, puts snow on crowns, and adds the jungle's flowering vines and the swamp's moss. A border island blends its two biomes. A temperate island is unchanged.

- `contact-treetops.jpg`, `contact-ground.jpg`: all nine in play, the same spot (seed 1, `?biome=`).
- `lion-island-*-on/off.jpg`: the lion's island (hot) as the game now draws it, against the look forced off.
- `sheet-trees.jpg`: oak, pine and birch, then four of each biome's own species, each in its look. `sheet-canopy.jpg` shows the treetops, `sheet-blends.jpg` the border islands, and `sheet-areas.jpg` real areas as they were and in a biome's look.

## Every area

| Area | Creature | Biome today | Trees today | Scenery today (floor; small; big; walls) | Change |
|---|---|---|---|---|---|
| bog | elk | temperate 0° | birch 50, pine 30, aspen 20 | moss; reeds; water | Delta (#1024 and its re-themes): moves to **cold**, its trees from that biome's list |
| bluebell-glade | hare | temperate 0° | beech 50, holly 20, cherry 15, whitebeam 15 | bluebells; fern | stays temperate |
| wetland | toad | temperate 15° | willow 45, alder 30, aspen 25 | mud; reeds; water, reeds | stays temperate |
| garden | wolf | temperate 25° | willow 40, cherry 30, crabApple 15, vinewood 15 | lawn; flowerbed; wall | Delta (#1024 and its re-themes): moves to **cold**, its trees from that biome's list |
| deadwood | raven | temperate 35° | broad 50, elm 25, aspen 25 | earth; log | Delta (#1024 and its re-themes): moves to **mountains and glaciers**, its trees from that biome's list |
| old-oaks | fox | temperate 40° | oak 50, holly 20, elm 15, whitebeam 15 | leaves; cones, log | stays temperate |
| rocky-slope | lynx | temperate 50° | rowan 40, pine 30, whitebeam 30 | scree; stones; boulder | Delta (#1024 and its re-themes): moves to **mountains and glaciers**, its trees from that biome's list |
| log-pile | beetle | temperate 70° | elder 40, aspen 35, birch 25 | leaves; fungi; log, snag(sparse), snag(sparse) | Delta (#1024 and its re-themes): moves to **volcanic**, its trees from that biome's list |
| tangly-forest | ram | temperate 75° | hawthorn 45, elder 25, crabApple 20, hazel 10 | nettles; bramble | Delta (#1024 and its re-themes): moves to **volcanic**, its trees from that biome's list |
| fern-forest | mole | temperate 80° | larch 45, fir 25, aspen 15, birch 15 | needles; fern | stays temperate |
| ravine | salamander | temperate 100° | rowan 40, pine 35, birch 25 | stone; fern; boulder, spire(sparse), spire(sparse), stalagmite(sparse); rockwall | Delta (#1024 and its re-themes): moves to **volcanic**, its trees from that biome's list |
| moor | woodlouse | temperate 110° | hawthorn 50, rowan 35, birch 15 | heather; grass; mound, cairn(sparse), standingstone(sparse); water | Delta (#1024 and its re-themes): moves to **volcanic**, its trees from that biome's list |
| wispy-forest | badger | temperate 130° | lime 40, birch 25, aspen 20, whitebeam 15 | leaves; birch | stays temperate |
| holly-thicket | spider | temperate 135° | holly 45, yew 30, vinewood 25 | leaves; web; hedge | Delta (#1024 and its re-themes): moves to **badlands**, its trees from that biome's list |
| heath | moth | temperate 160° | birch 40, pine 25, hawthorn 20, rowan 15 | heather; shrub | stays temperate |
| hazel-forest | hedgehog | temperate 170° | hazel 45, oak 20, elder 20, hazel 15 | grass; mound | stays temperate |
| norway | snake | temperate 170° | fir 50, birch 20, cedar 15, larch 15 | slate; stones | Delta (#1024 and its re-themes): moves to **jungle**, its trees from that biome's list |
| cave-mouth | bat | temperate 195° | broad 45, yew 30, crystal 25 | stone; stalagmite; rockwall | Delta (#1024 and its re-themes): moves to **jungle**, its trees from that biome's list |
| meadow | cat | temperate 205° | chestnut 30, oak 20, hawthorn 25, cherry 15, crabApple 10 | flowers; shrub | Delta (#1024 and its re-themes): moves to **hot**, its trees from that biome's list |
| muddy-forest | snail | temperate 215° | sycamore 40, alder 25, elm 20, crabApple 15 | mud; stump | stays temperate |
| fen | newt | temperate 225° | aspen 45, alder 35, willow 20 | moss; reeds, grass; water, reeds | stays temperate |
| heronry | heron | temperate 240° | elm 55, ash 30, willow 15 | tallgrass; reeds, grass; water, reeds | Delta (#1024 and its re-themes): moves to **mangrove swamp**, its trees from that biome's list |
| alder-forest | stoat | temperate 250° | alder 55, elm 25, willow 20 | tallgrass; stump | stays temperate |
| ancient | stag | temperate 265° | yew 45, oak 30, cedar 25 | roots; flowers | stays temperate |
| stream | otter | temperate 270° | alder 45, willow 30, weepingBirch 25 | pebbles; broad; water | Delta (#1024 and its re-themes): moves to **mangrove swamp**, its trees from that biome's list |
| twiggy-forest | squirrel | temperate 285° | ash 50, elm 25, aspen 25 | plants; broad | stays temperate |
| beaver-pond | beaver | temperate 290° | weepingBirch 40, alder 30, aspen 30 | leaves; stump; water | stays temperate |
| grassland | boar | temperate 300° | flat 30, hawthorn 25, crabApple 20, weepingBirch 15, whitebeam 10 | grass; mound | stays temperate |
| honeysuckle-tangle | dormouse | temperate 310° | hazel 40, rowan 25, elder 20, crabApple 15 | clover; shrub; bramble | stays temperate |
| berry-thicket | bear | temperate 320° | pine 40, rowan 25, elder 20, crabApple 15 | needles; shrub; bramble | Delta (#1024 and its re-themes): moves to **cold rainforest**, its trees from that biome's list |
| stone-shrine | owl | temperate 335° | yew 60, holly 25, hawthorn 15 | stony; stones; standingstone, boulder(sparse), pillar(sparse), pillar(sparse), cairn(sparse); henge | Delta (#1024 and its re-themes): moves to **cold rainforest**, its trees from that biome's list |
| old-pinewood | marten | temperate 345° | pine 55, rowan 25, larch 20 | needles; cones | stays temperate |
| trollwood | frosttroll | cold 5° | weepingBirch 50, pine 30, birch 20 | snow; fern, stones; boulder(sparse); stones | kept: already its biome's |
| snowfield | arcticfox | cold 12° | juniper 45, fir 35, birch 20 | snow; grass; boulder(sparse); stones | kept: already its biome's |
| packice | polarbear | cold 345° | larch 50, fir 25, birch 25 | ice; rock, grass; water | kept: already its biome's |
| rookery | penguin | cold 346° | fir 50, birch 30, pine 20 | snow; stones, grass; boulder, stones | kept: already its biome's |
| icefall | snowleopard | mountains and glaciers 25° | rowan 40, pine 40, birch 20 | ice; stones; cairn(sparse), standingstone(sparse), boulder; stones | kept: already its biome's |
| crags | ibex | mountains and glaciers 38° | larch 45, olive 35, pine 20 | lichen; stones, shrub, shrub; spire(sparse), spire(sparse), boulder; rockwall | **This PR:** olive 35 → **juniper** (krummholz); olive is a badlands tree |
| frostcave | frostwyrm | mountains and glaciers 45° | whitebeam 45, fir 30, crystal 25 | ice; stones, mound; waterfall, rockwall | kept (whitebeam as mountain ash) |
| misty-terraces | redpanda | mountains and glaciers 63° | cherry 40, fir 25, rowan 20, birch 15 | moss; fern, grass | kept (cherry as Himalayan cherry) |
| eyrie | griffin | mountains and glaciers 65° | cedar 60, pine 30, larch 10 | scree; grass, stones; rockwall | Delta (#1024 and its re-themes): moves to **badlands**, its trees from that biome's list |
| dragon-scrub | komodo | volcanic ("rocky") 89° | datePalm 50, acacia 35, hawthorn 15 | tallgrass; shrub, grass; outcrop, boulder | **This PR:** hawthorn 15 → **cycad** (east is volcanic) |
| cinder-slopes | stegosaurus | volcanic 105° | cycad 45, pine 35, datePalm 20 | basalt; fern, stones; boulder, rockwall | kept: the look chars the pines |
| warren | meerkat | badlands 115° | juniper 60, hawthorn 25, pine 15 | stony; grass; spire(sparse), spire(sparse), boulder(sparse), snag(sparse); rockwall | **This PR:** hawthorn 25 → **acacia** (Kalahari thorn) |
| cactus-flats | rattlesnake | badlands 125° | saguaro 50, joshua 30, pricklyPear 20 | sand; grass, bush; boulder(sparse); rockwall | **This PR:** saguaro 50, joshua 30, prickly pear 20 → saguaro 40, joshua 20, **paloVerde** 25, prickly pear 15: scrub wood, not desert |
| scrub-wash | armadillo | badlands 141° | hawthorn 55, juniper 30, pine 15 | mud; shrub; boulder(sparse), snag(sparse); rockwall | **This PR:** hawthorn 55 (stunted main) → **olive** (stunted); hawthorn is temperate |
| red-canyon | scorpion | badlands 145° | paloVerde 50, ironwood 30, ocotillo 20 | scree; grass, bush; boulder(sparse); rockwall | kept: already its biome's |
| bushveld | rhino | hot 165° | flat 55, acacia 30, hawthorn 15 | sand; bush, grass; bush | **This PR:** hawthorn 15 → **baobab** |
| erg | fennec | hot 166° | datePalm 65, acacia 25, baobab 10 | sand; grass, shrub; water, reeds | kept: already its biome's |
| plains | cheetah | hot 185° | acacia 70, baobab 15, datePalm 15 | grass; grass, mound; shrub | kept: already its biome's |
| savanna | lion | hot 192° | acacia 70, baobab 20, datePalm 10 | tallgrass; grass, shrub; shrub | kept: already its biome's |
| drowned-wood | hydra | mangrove swamp 205° | larch 60, willow 25, alder 15 | mud; reeds, grass; water, reeds | kept: larch here stands in for bald cypress (a swamp conifer) and the swamp look hangs it with moss |
| mangrove | crocodile | mangrove swamp 218° | mangrove 65, datePalm 20, willow 15 | mud; reeds, grass; water, reeds | kept: already its biome's |
| mudflat | crab | mangrove swamp 225° | mangrove 70, alder 20, aspen 10 | mud; reeds, grass; boulder(sparse); water | **This PR:** alder 20, aspen 10 → **datePalm** 20, **willow** 10 (aspen is boreal) |
| mangrove-pools | dragonfly | mangrove swamp 243° | mangrove 65, willow 20, alder 15 | mud; reeds, grass; water, reeds | **This PR:** alder 15 → **strangler** 15 |
| temple-jungle | elephant | jungle 265° | strangler 45, kapok 30, datePalm 15, bamboo 10 | earth; fern, stones; stones, fern | kept: already its biome's |
| bamboo-jungle | tiger | jungle 269° | bamboo 55, kapok 25, strangler 20 | leaves; fern, grass; fern, shrub | kept: already its biome's |
| river-jungle | jaguar | jungle 285° | ironwood 55, vinewood 20, strangler 15, bamboo 10 | mud; fern, reeds; water, reeds | kept: already its biome's |
| mistwood | flyingsquirrel | cold rainforest 295° | fir 45, cedar 25, alder 20, yew 10 | moss; fern, fungi; log, fern | kept: already its biome's |
| mossy-creek | raccoon | cold rainforest 305° | cedar 45, fir 35, alder 20 | moss; fern; log(sparse); water, fern | kept: already its biome's |
| mossy-dell | roe | cold rainforest 321° | rowan 40, birch 35, oak 25 | moss; fern, grass | **This PR:** oak 25 → **yew** 25 (no lowland oak in the rainforest) |
| moonpool-glade | unicorn | cold rainforest 325° | birch 50, yew 30, weepingBirch 20 | grass; fern, flowers; water | kept: already its biome's |
