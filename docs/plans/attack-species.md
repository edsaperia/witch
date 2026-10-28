# Each species' own attack (step 5)

**Status (2026-10-28):** shipped in #1326 (the default, `attacks.species` true; `config/species-attacks.json`, its 64 species matching the table below), drawn in their elements in #1335. Still to do: the legends' own attacks (step 5b).

Each species' attack in the composable grammar (`config/species-attacks.json`; Ed, 2026-10-27, via the coordinator):
- within each biome every species has a distinct style;
- the further out its island's phase, the more modules it composes;
- the default from now on (`?attacks=old`, or the tuning's `attacks.species` false, for the old ones).

How each level gets its attack:
- The young's attack is as written.
- The adult's is the same grown (`adultOf` in `src/rules/attacks/species.ts`): one more in its pattern, a fifth bigger, a tenth further, and its children grown alike.
- Legends keep their own moves for now (step 5b).

How it sits in the fight:
- A kind's own moves (charge, leap, swoop, burrow, dig) are as before, on its old attack's reach and budget. A cast wound up before one of them is dropped.
- The species attack is its ordinary strike: a melee one is the fight's own lunge, with its stun or root landing after the blow.
- In a pack (`roleSpell`, rules/combat.ts), the pack's turns, combos and specials are as before:
  - a lunger strikes with it when it's close (a lunge, or an area round itself);
  - a shooter fires it from its pack's place, timed as the pack's shots and reaching as far, when its pack's shot is the plain bolt;
  - a pack's own designed shot stays (the toad's spores, the raven's spit and barb, lobs).
- Against a soundsystem every kind uses its old attack, so the sieges and the balance simulator are unchanged.
- Hits count against the fight's counters by what landed them: an area as a pulse (a swarm takes double), a lob, mine or seed as a lob, a beam as a beam, a bolt as a shot (armour turns it).
- Every one gives at least the reaction floor of warning (`src/rules/attacks/species.test.ts`), which also checks the styles and the phases.

Complexity by phase: home 0.7, phase 1 1.7, phase 2 2.0, phase 3 2.5, phase 4 2.7. This counts modules and terms beyond a plain single bolt, with children included.

Each species' attack, made from `config/species-attacks.json` and its kind's `art/areas/<id>/kind.json` (`node tools/docs/tables.mjs`):

<!-- data: species-attacks (node tools/docs/tables.mjs --write; edit the data, not this) -->
| Phase | Biome | Species | Attack |
|---|---|---|---|
| 0 | temperate | badger | a shoulder-barge lunge that knocks her back |
| 0 | temperate | dormouse | a quick seed flicked straight at her |
| 0 | temperate | fox | a foxfire wisp curving in |
| 0 | temperate | hare | a stamp: the ground jolts round it |
| 0 | temperate | hedgehog | a ring of quills, short reach |
| 0 | temperate | marten | two pinecones thrown in quick succession |
| 0 | temperate | mole | the ground heaves up where she stood |
| 0 | temperate | snail | a slime patch round it that slows |
| 0 | temperate | squirrel | an acorn lobbed onto where she stands |
| 0 | temperate | stoat | the fastest, longest lunge at home |
| 1 | temperate | beaver | three logs rolled at her side by side |
| 1 | temperate | boar | a goring sweep in an arc in front |
| 1 | temperate | moth | a fluttering puff of dust that slows |
| 1 | temperate | newt | a slime streak that passes through and slows |
| 1 | temperate | stag | stamps marching out in a line toward her |
| 1 | temperate | toad | a hop-splash lob that bounces once |
| 2 | badlands | meerkat | three pebbles arcing in quick succession |
| 2 | badlands | spider | a web shot that roots, leaving a web patch |
| 2 | cold | elk | a frost stamp: a ring spreading out that knocks back |
| 2 | cold | wolf | a frost bite lunge that slows and knocks back |
| 2 | cold rainforest | owl | a silent feather homing in, speeding up |
| 2 | cold rainforest | raccoon | a junk can thrown out and coming back |
| 2 | hot | cat | three short claw slashes in a fan |
| 2 | hot | fennec | a sweeping spray of sand, slowing as it goes |
| 2 | jungle | bat | a screech: a ring spreading out that slows |
| 2 | jungle | snake | a curving, weaving venom spit that slows |
| 2 | mangrove swamp | heron | a beak-spear that speeds up and pierces |
| 2 | mangrove swamp | otter | a skimming pebble, bouncing twice |
| 2 | mountains and glaciers | lynx | a pouncing lunge that stuns |
| 2 | mountains and glaciers | raven | two curving feathers relayed through its packmate |
| 2 | volcanic | ram | a headbutt lunge that throws and stuns |
| 2 | volcanic | salamander | a short fire breath sweeping across, burning creatures |
| 3 | badlands | armadillo | a roll that bursts into pebbles at its end |
| 3 | badlands | rattlesnake | two venom traps laid round her |
| 3 | cold | arcticfox | a frost shard that bursts into three where it ends |
| 3 | cold | penguin | a belly-slide that slows to a stop on an ice patch |
| 3 | cold rainforest | flyingsquirrel | an acorn that scatters four splinters where it lands |
| 3 | cold rainforest | roe | kicks in a cross round where she stood |
| 3 | hot | cheetah | a dust devil accelerating at her, leaving dust |
| 3 | hot | lion | a roar: a wide cone that throws and stuns |
| 3 | jungle | jaguar | a long-telegraphed pounce onto where she stood |
| 3 | jungle | tiger | three raking slashes in a wide fan that pierce |
| 3 | mangrove swamp | crocodile | a whirlpool that drags her in while it bites |
| 3 | mangrove swamp | dragonfly | a weaving spark that chains from foe to foe |
| 3 | mountains and glaciers | ibex | a rockfall marching out in a line |
| 3 | mountains and glaciers | redpanda | a leaf thrown out swaying and coming back |
| 3 | volcanic | beetle | a dung bomb laid at her feet: a blast and a ring of embers |
| 3 | volcanic | woodlouse | a stop-and-go roll, re-aiming at each stop |
| 4 | badlands | griffin | a dive that lands as a gust: a ring of curving feathers |
| 4 | badlands | scorpion | a sting that sticks, then bursts a venom cloud |
| 4 | cold | frosttroll | three frost rings spreading out one after another |
| 4 | cold | polarbear | icicles raining round where she stood |
| 4 | cold rainforest | bear | a huge swat in a wide arc |
| 4 | cold rainforest | unicorn | a rainbow strung between two unicorns |
| 4 | hot | rhino | a stampede: two charging runners with a gap to slip through |
| 4 | hot | sphinx | a golden gaze beam that charges, then tracks her |
| 4 | jungle | elephant | two great stomp rings that throw |
| 4 | jungle | featheredserpent | six feathers spiralling out |
| 4 | mangrove swamp | crab | three crabs mark a triangle and the water inside erupts |
| 4 | mangrove swamp | hydra | three heads spit homing venom that leaves pools |
| 4 | mountains and glaciers | frostwyrm | a frost breath sweeping wide after a charge |
| 4 | mountains and glaciers | snowleopard | frost bursts in a cross round where she stood |
| 4 | volcanic | komodo | a weaving venom bolt that burns and leaves a pool |
| 4 | volcanic | stegosaurus | a spray of tail spikes swept round |
<!-- /data: species-attacks -->
