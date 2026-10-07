# tools/balance

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `buffs.mjs`

💌 throughput under stacked legend buffs: how fast she can fill a crowd's affection with no buffs, typical builds and worst-case stacks, with the per-animal hit gap and other limits; then waves survived in the creature-state model with each build.

```
node tools/balance/buffs.mjs [--seeds 4] [--gap 120] [--cap 60] [--skills 0.5,1] [--policies defend,leash] [--relics 0] [--no-sim]
```

## `charges.mjs`

Can she walk away from a charge or a leap?

```
node tools/balance/charges.mjs [--dists 10,20,30,40] [--escapes walk,side,blink,blinkside,blinkthrough,stand] [--blink-side 8] [--blink-through 5] [--set path=value;...]
```

## `coach.mjs`

The coach: a search over the careful bot's options and numbers by a simple evolution strategy, every candidate playing the real rules headless on the training seeds and the best scored again on held-out seeds it never trained on.

```
node tools/balance/coach.mjs search [--gens 8] [--pop 8] [--seeds 4 (training seeds 0..N-1)] [--time 2700] [--workers 4] [--from best.json] [--out dir]
node tools/balance/coach.mjs score [--bots skilled,champion,crude] [--opts file.json (the champion's options)] [--held 8 (held-out seeds 100..)] [--time 5400] [--json out.json]
```

## `coachwatch.mjs`

The coach's eye on one run: a bot plays a seed headless and, each --every seconds, prints what decides a siege: her place and mode, her stack and parked sigils, every standing soundsystem's health, and the marchers by the soundsystem they're after with…

```
node tools/balance/coachwatch.mjs [--bot champion] [--seed 1000] [--time 2700] [--every 60] [--opts file.json]
```

## `endgame.mjs`

How long losing takes.

```
node tools/balance/endgame.mjs [--seeds 4] [--gaps 300,120] [--skills 0.1,0.25,0.5,1] [--policies defend,leash,relay,mass] [--cap 60] [--hurry 0.5,3] [--relics 0]
```

## `fight.mjs`

How dangerous a fight is for the witch.

```
node tools/balance/fight.mjs [--seeds 2] [--sizes 2,4,8,12] [--mixes wolf,boar,raven,bat,mixed] [--levels 1,2] [--time 60] [--radius 16] [--moves 0,0.3,0.6] [--set fight.speed=1.25;combat.reaction=0.15]
```

## `fightbot.mjs`

What playtesters will feel in fights: a bot plays the real rules headless, no new rules.

```
node tools/balance/fightbot.mjs [--seeds 2] [--areas 3] [--waves 1,5,10,20,30] [--builds 0,2,4,7] [--bots circle20,circle35,circle50,kiter,greedy,skilled] [--kite 9] [--blink 5] [--limit 240] [--start babies,young,adults] [--json out.json] | --report a.json,b.json
```

## `leycross.mjs`

How the ley line's route crosses itself and what shape it takes: for each seed, the whole run's route through every area in wave order: its crossings, its shape, how far apart the waves are, and how many wake an area bordering none the party has.

```
node tools/balance/leycross.mjs [--seeds 300] [--from 1] [--varied | --was | --before] [--json]
```

## `lib.mjs`

What the balance tools share: the rules loaded through Vite's SSR, command-line flags, and a few statistics.

## `logistics.mjs`

The logistics sweep. Over a grid of area size × treetop speed, with the balance simulator's logistics: the areas the witch can visit a wave, the party animals' walk to the frontier, whether a defence gets to each new soundsystem before its first blow, and…

```
node tools/balance/logistics.mjs [--seeds 8] [--sizes 112,168,224,280] [--treetops 32,48,64,96]
```

## `opening.mjs`

The opening. A bot plays the real rules headless from her first step to the first wave: it flies to the areas nearest home in turn, over the treetops, lands, and invites with 💌s, then moves on.

```
node tools/balance/opening.mjs [--seeds 3] [--starts 1,0,0;1,1,0;0,1,1] [--policies all,careful,park] [--time 600] [--areas 12]
```

## `playthrough.mjs`

A whole run, headless, for sanity: a bot plays the real rules for --minutes of game time, and every second the run is checked for what shouldn't happen: a NaN or infinity in her, a creature or a letter; an exception; a creature busy that hasn't moved in…

```
node tools/balance/playthrough.mjs [--seed 123] [--minutes 15] [--carry 4] [--stuck 30] [--json out.json]
```

## `runbot.mjs`

Full runs: a bot plays the real rules headless for the first --time seconds of a run, and we read off what a playtester would feel: when she's first knocked out, how much of each woken area she'd invited before its wave, how many legends are angry, and how…

```
node tools/balance/runbot.mjs [--seeds 3 (seeds 0 to N-1; --skip K starts at K)] [--bots skilled,crude] [--time 1800] [--happy N (the N legends nearest home happy from the start)] [--calm (no legend ever turns angry)] [--quests (the skilled bot fetches what sleeping legends dream of)] [--relics (and picks up relics for them)] [--relic-policy nearest|home|front|far (which sleeping legend gets each relic)] [--quest-max N (at most N quests, then she plays on as usual)] [--relic-max N (at most N relics brought)] [--strategy invite|feed|quest|sigil|mixed (the skilled bot's strategies: rules/bot.ts STRATEGIES)] [--feed (the skilled bot leads her babies and young to berry patches)] [--guards 3 --keep 2 (the skilled bot parks up to G at the next soundsystem, keeping K)] [--set path=value;...] [--combat path=value;... (config/combat.json's)] [--json out.json] | --report a.json,b.json
```

## `sim.mjs`

The balance simulator's runner: many seeds, wave gaps of 60 s and 300 s.

```
node tools/balance/sim.mjs [--seeds 12] [--gaps 60,300] [--skills 10,30,50,70,100] [--cap 60]
```

## `states.mjs`

The creature-state model's report: src/rules/states.ts on the real maps.

```
node tools/balance/states.mjs [--seeds 6] [--gap 60] [--skills 0.5,1,2,4] [--policies defend,third,leash,babies,relay] [--cap 40]
```

## `waves.mjs`

Faster waves for the endgame, against the siege hurry: waves rushing once the run is lost, and a ramp shortening the gap over the whole run.

```
node tools/balance/waves.mjs [--seeds 3] [--gap 300] [--skills 0.1,0.25,0.5] [--policies defend,leash,relay,mass] [--cap 60 (waves at the starting gap: the runs stop at cap × gap seconds)] [--json out.json]
node tools/balance/waves.mjs --report a.json,b.json,...   (merge several runs' JSON into the tables)
```
