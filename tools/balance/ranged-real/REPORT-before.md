# Creature ranged attacks: measured (2026-11-12)

Ed's report (2026-11-12): "An incidental note about creature ranged attacks (home island, mostly youths): the preparation time seems long, projectile speed is low, if you're moving at all they basically never hit you." He chose to measure first. **Nothing in the game has been changed.** He added: "when the changes are decided, apply them to all creatures, not just home ones." So the options below are rules for every ranged attack. Home's numbers come first, because home is where he played.

## In short

1. **He's right, and the main cause is the aim, not the speed.** Every species' own ranged attack aims at where she stood **when its wind-up starts**, with no lead. From the start of the wind-up to impact takes 0.9–1.9 s at home (the legend's: 5.2 s). In that time she walks 17–37 m at 19.25 m/s. So any steady movement takes her out of the shot's path. Walking across the shot, nothing at home hits her: 0% in the engine harness. In the full real-rules runs, nearly every moving cell is 0–9%; the only exceptions are a few small cells for the mole and the marten (17–33% from 6–22 shots). Making shots faster or wind-ups shorter on their own changes almost nothing (option 2+3: across stays at 0%).
2. **Even standing still, she's often missed.** The caster keeps moving through its wind-up: a median of 0–7.6 m in the real-rules runs, with the dormouse at 2–7 m. The bolt then flies from wherever the caster is at release, still on the heading it took at the start, so its line is shifted sideways. On top of that, curved paths are aimed straight, so the fox's foxfire (curving 30°/s) misses a standing witch. In real rules, standing still: dormouse 11–60%, fox 0–23%. Marten, squirrel and mole hit 96–100%.
3. **Youths in a team wind up longer: 0.91 s, against 0.6 s alone.** A pack shooter takes the pack bolt's wind-up (0.7 s, × 1.3 for a youth). A pack's tell (0.5–1 s) comes before that. This matches "the preparation time seems long".
4. **Home's close kinds (stoat, hare, badger) shoot a separate, older pack bolt that is the opposite extreme.** It winds up for 0.35 s, flies at 2× speed (35–62 m/s) and leads her fully at release. In real rules the stoat's and hare's hit straight walkers 53–100% of the time and zig-zaggers 47–81%. The badger's samples are too small to say. It is shared by 14 other kinds: the close kinds wolf, elk, stag, ram, lion, ibex, crocodile, lynx and bat, plus spider, raven, feathered serpent, owl and toad, whose packs have a designed shot.
5. **The treetops are safe from every ranged attack** by rule: a witch who isn't on the ground can't be hit, and her hunters lose their target when she rises. So (e) is 0% throughout.
6. **Recommendation: option C.** Aim at where she'll be when the shot arrives (lead ×1), with the aim locked at least 0.75 s (young) or 0.6 s (adult and legend) before it can reach her. Make straight bolts and rollers fly at least 2× her ground speed (38.5 m/s). Leave wind-ups as they are. With C, a home shooter alone hits a straight walker 56–100% of the time. The exceptions are the hedgehog's short ring and the youths in a team, which are limited by reach: their bolt runs out before it reaches where she'll be. Zig-zagging every second still gets her through most of the time: 4–57% (the marten's burst excepted, see flag 1). A 15 m blink after the lock always clears the shot. C needs four exclusions or fixes, listed under **Flags**.

## How it was measured

- **Engine harness** (`tools/balance/rangedhit.mjs`, core in `rangedhit-core.mjs`): one cast at a time through the real attack engine (`rules/attacks/engine.ts`). The spec is built as the fight builds it: `speciesAttack` held to the reaction floor, then the fight's own wind-up and range changes for pack and team shooters, then `reachingFurther` (shots at her reach `dodge.b.range` 2 × `difficulty.rangedRange` 1.2 = 2.4 times as far). The close kinds' old pack bolt is rebuilt from `packAttack` with `dodge.b`'s wind-up cap, speed and lead.
  - **The caster:** stands still, unless the drift column says otherwise.
  - **Her:** a point of radius 0.3 (the engine's own), already moving at 19.25 m/s as the wind-up starts, with ground acceleration 28.
  - **Distance:** drawn evenly from 0.75–1.25 × the distance the fight keeps that shooter at. Legends: 20–60 m.
  - **Samples:** 200–300 casts per cell, fixed seeds. A cast counts as a hit if any part of it harms her.
  - **(d) zig-zag:** 45° either side of straight across, switching every 1 s, at a random phase.
- **Real-rules check** (then `scratchpad/ranged/real.mjs`, now `tools/balance/rangedreal.mjs`; its setup comes from `tools/balance/dodgebot.mjs`): the whole game through `stepGame`, one or three of a kind at a level placed 25–33 m from her in a wild area. A bot moved her for 60 s × 2 seeds. Casts and old shots aimed at her were counted, and the hits came from `observeAttacks`. The counts are small (4–84 shots per cell), so treat these as a check, not as precise rates.
- **Paths a kind can shoot by:** `solo` is its own attack, alone. `team` is its own attack as a pack or team shooter (`roleSpell`: the pack's range, and the pack bolt's wind-up if that is longer). `pack` is the old pack bolt a close kind fires in a shooter's role. Babies have no attack (dps 0). Each legend throws one huge lob (`legends.json`: 2.2 s wind-up, 3 s flight, radius 8). The lob lands where she stood at the cast and bursts into its kind's attack, grown.

## Her movement

| | value |
|---|---|
| ground speed | 19.25 m/s; acceleration 28 (reaches full speed in about 0.1 s) |
| treetop speed | 48 m/s; boost 1.7× for 2 s; rise 0.7 s, descend 0.55 s, 3 s between rises |
| dodge (blink) | 15 m, 2 charges, 1 s cooldown, unhittable for 0.2 s (`dodge.a.gone`) |
| reaction floor | 0.45 s from the first warning to any harm (`attacks.reactionFloor`) |
| hit radius | 0.3 m, plus the projectile's own radius |

## Current values: home (every ranged attack at every level; babies have none)

The values are the fight's own after its changes: wind-up, speed, how far it fires from (2.4× its cast range for shots at her, 1.2× for lobs), where it stands, cooldown, aim, homing and radius. The last column is the time from the start of the wind-up to arrival where she stood, at its stand-off distance, and how far she walks in that time. All legends' attacks are the same lob, so the one legend row stands for all of them.

| kind | level | path | body | wind-up s | speed | fires from (m) | stands at (m) | cooldown s | aim | homing | path bends | radius | wind-up→impact s (she walks m) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| dormouse | young | solo | bolt | 0.60 | 26 m/s | 48 | 16.0 | 1.8 | her place at wind-up start | none |  | 0.5 | 1.22 (23) |
| dormouse | young | team | bolt | 0.91 | 26 m/s | 24 | 8.2 | 1.8 | her place at wind-up start | none |  | 0.5 | 1.23 (24) |
| dormouse | adult | solo | bolt | 0.60 | 26 m/s | 53 | 17.6 | 1.8 | her place at wind-up start | none |  | 0.6 | 1.28 (25) |
| dormouse | adult | team | bolt | 0.70 | 26 m/s | 29 | 9.6 | 1.8 | her place at wind-up start | none |  | 0.6 | 1.08 (21) |
| dormouse | legend | solo | lob | 2.20 | lob, 3 s up | 420 | 20–60 (any to 420) | 15 | where she stood at wind-up start | none |  | 8 | 5.20 (100) |
| fox | young | solo | bolt | 0.60 | 20 m/s | 43 | 14.4 | 1.8 | her place at wind-up start | none | curve | 0.6 | 1.32 (26) |
| fox | young | team | bolt | 0.91 | 20 m/s | 31 | 10.2 | 1.8 | her place at wind-up start | none | curve | 0.6 | 1.43 (27) |
| fox | adult | solo | bolt | 0.60 | 20 m/s | 48 | 15.8 | 1.8 | her place at wind-up start | none | curve | 0.72 | 1.40 (27) |
| fox | adult | team | bolt | 0.70 | 20 m/s | 36 | 12.0 | 1.8 | her place at wind-up start | none | curve | 0.72 | 1.31 (25) |
| marten | young | solo | bolt burst×2 | 0.60 | 24 m/s | 43 | 14.4 | 2 | her place at wind-up start | none |  | 0.5 | 1.21 (23) |
| marten | young | team | bolt burst×2 | 0.91 | 24 m/s | 24 | 8.2 | 2 | her place at wind-up start | none |  | 0.5 | 1.25 (24) |
| marten | adult | solo | bolt burst×3 | 0.60 | 24 m/s | 48 | 15.8 | 2 | her place at wind-up start | none |  | 0.6 | 1.27 (24) |
| marten | adult | team | bolt burst×3 | 0.70 | 24 m/s | 29 | 9.6 | 2 | her place at wind-up start | none |  | 0.6 | 1.11 (21) |
| squirrel | young | solo | lob | 0.60 | lob, 1 s up | 26 | 17.6 | 2 | where she stood at wind-up start | none |  | 2.5 | 1.60 (31) |
| squirrel | young | team | lob | 0.91 | lob, 1 s up | 29 | 9.5 | 2 | where she stood at wind-up start | none |  | 2.5 | 1.91 (37) |
| squirrel | adult | solo | lob | 0.60 | lob, 1 s up | 29 | 19.4 | 2 | where she stood at wind-up start | none |  | 3 | 1.60 (31) |
| squirrel | adult | team | lob | 0.70 | lob, 1 s up | 34 | 11.2 | 2 | where she stood at wind-up start | none |  | 3 | 1.70 (33) |
| mole | young | solo | area | 0.90 | none (ground) | 24 | 16.0 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.90 (17) |
| mole | young | team | area | 0.91 | none (ground) | 31 | 10.2 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.91 (18) |
| mole | adult | solo | area | 0.90 | none (ground) | 26 | 17.6 | 2.4 | where she stood at wind-up start | none |  | r 3.6 | 0.90 (17) |
| mole | adult | team | area | 0.90 | none (ground) | 36 | 12.0 | 2.4 | where she stood at wind-up start | none |  | r 3.6 | 0.90 (17) |
| hedgehog | young | solo | bolt ring×6 | 0.70 | 22 m/s | 14 | 4.8 | 2.2 | her place at wind-up start | none |  | 0.5 | 0.92 (18) |
| hedgehog | young | team | bolt ring×6 | 0.91 | 22 m/s | 24 | 8.2 | 2.2 | her place at wind-up start | none |  | 0.5 | 1.29 (25) |
| hedgehog | adult | solo | bolt ring×7 | 0.70 | 22 m/s | 16 | 5.3 | 2.2 | her place at wind-up start | none |  | 0.6 | 0.94 (18) |
| hedgehog | adult | team | bolt ring×7 | 0.70 | 22 m/s | 29 | 9.6 | 2.2 | her place at wind-up start | none |  | 0.6 | 1.14 (22) |
| stoat | young | pack | bolt | 0.35 | 49.28 m/s | 20 | 6.8 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.49 (9) |
| stoat | adult | pack | bolt fan×2 | 0.35 | 61.6 m/s | 24 | 8.0 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.48 (9) |
| hare | young | pack | bolt | 0.35 | 35.2 m/s | 24 | 8.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| hare | adult | pack | bolt | 0.35 | 44 m/s | 29 | 9.6 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.57 (11) |
| badger | young | pack | bolt | 0.35 | 35.2 m/s | 29 | 9.5 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.63 (12) |
| badger | adult | pack | bolt | 0.35 | 44 m/s | 34 | 11.2 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.61 (12) |
## Hit rates now: home

**Engine harness**, with the caster still. This is an upper bound: real casters drift.

| kind | level | path | (a) still | (b) across | (c) away | (c) toward | (d) zig-zag | (e) treetops |
|---|---|---|---|---|---|---|---|---|
| dormouse | young | solo | 100% | 0% | 0% | 100% | 0% | 0% |
| dormouse | young | team | 100% | 0% | 0% | 0% | 0% | 0% |
| dormouse | adult | solo | 100% | 0% | 0% | 100% | 0% | 0% |
| dormouse | adult | team | 100% | 0% | 0% | 0% | 0% | 0% |
| dormouse | legend | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| fox | young | solo | 0% | 0% | 0% | 99% | 0% | 0% |
| fox | young | team | 11% | 0% | 0% | 0% | 0% | 0% |
| fox | adult | solo | 0% | 0% | 0% | 100% | 0% | 0% |
| fox | adult | team | 0% | 0% | 0% | 38% | 0% | 0% |
| marten | young | solo | 100% | 0% | 0% | 100% | 6% | 0% |
| marten | young | team | 100% | 0% | 0% | 0% | 0% | 0% |
| marten | adult | solo | 100% | 0% | 0% | 100% | 5% | 0% |
| marten | adult | team | 100% | 0% | 0% | 51% | 12% | 0% |
| squirrel | young | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| squirrel | young | team | 100% | 0% | 0% | 0% | 0% | 0% |
| squirrel | adult | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| squirrel | adult | team | 100% | 0% | 0% | 0% | 0% | 0% |
| mole | young | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| mole | young | team | 100% | 0% | 0% | 0% | 0% | 0% |
| mole | adult | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| mole | adult | team | 100% | 0% | 0% | 0% | 0% | 0% |
| hedgehog | young | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| hedgehog | young | team | 100% | 0% | 0% | 0% | 0% | 0% |
| hedgehog | adult | solo | 100% | 0% | 0% | 0% | 0% | 0% |
| hedgehog | adult | team | 100% | 0% | 0% | 0% | 0% | 0% |
| stoat | young | pack | 100% | 100% | 100% | 100% | 83% | 0% |
| stoat | adult | pack | 100% | 100% | 0% | 93% | 57% | 0% |
| hare | young | pack | 100% | 100% | 100% | 100% | 46% | 0% |
| hare | adult | pack | 100% | 100% | 100% | 100% | 76% | 0% |
| badger | young | pack | 100% | 100% | 100% | 100% | 45% | 0% |
| badger | adult | pack | 100% | 100% | 100% | 100% | 73% | 0% |
**Real-rules check** (the whole game, with a bot moving her). Shots counted are those aimed at her. "Old pack bolt": that kind fires the old pack bolt.

| kind | level | group | still | across | away | zig-zag | shots counted (still/across/away/zig-zag) | median firing distance m | caster moved during its wind-up, median m |
|---|---|---|---|---|---|---|---|---|---|
| dormouse | young | alone | 11% | 0% | 0% | 0% | 18/18/8/18 | 8.3 | 3.8/4.4/2.4/0.8 |
| dormouse | young | three | 43% | 0% | 0% | 0% | 47/44/31/44 | 9.8 | 4.1/6.9/6.2/2.7 |
| dormouse | adult | alone | 60% | 0% | 0% | 0% | 20/18/8/18 | 10.2 | 2.4/4.3/2.9/0.5 |
| dormouse | adult | three | 41% | 4% | 0% | 15% | 44/45/31/46 | 12.0 | 3.1/3.0/6.9/3.8 |
| fox | young | alone | 13% | 0% | 0% | 0% | 16/16/12/18 | 10.3 | 0.4/0.9/1.1/0.4 |
| fox | young | three | 23% | 0% | 0% | 6% | 31/26/24/32 | 9.0 | 1.3/5.3/5.5/2.8 |
| fox | adult | alone | 0% | 0% | 0% | 0% | 16/16/12/18 | 12.3 | 0.8/1.5/2.0/1.6 |
| fox | adult | three | 18% | 0% | 0% | 0% | 33/28/32/34 | 13.0 | 2.0/6.3/7.6/5.4 |
| marten | young | alone | 100% | 0% | 0% | 0% | 16/16/12/16 | 7.7 | 0.0/1.0/1.7/2.1 |
| marten | young | three | 96% | 0% | 0% | 7% | 27/26/22/28 | 9.5 | 2.2/3.9/7.5/2.7 |
| marten | adult | alone | 100% | 7% | 17% | 0% | 14/14/12/14 | 10.3 | 0.0/1.2/0.3/0.4 |
| marten | adult | three | 100% | 9% | 27% | 11% | 30/22/22/27 | 10.3 | 2.4/3.2/5.6/5.3 |
| squirrel | young | alone | 100% | 0% | 0% | 0% | 16/14/12/16 | 14.6 | 0.0/0.0/0.0/0.0 |
| squirrel | young | three | 96% | 4% | 0% | 2% | 47/48/43/46 | 10.1 | 0.0/0.0/0.0/0.0 |
| squirrel | adult | alone | 100% | 0% | 0% | 0% | 16/16/14/16 | 17.2 | 0.0/0.0/0.0/0.6 |
| squirrel | adult | three | 96% | 0% | 9% | 0% | 50/51/46/52 | 12.1 | 0.0/0.1/0.8/0.0 |
| mole | young | alone | 100% | 0% | 0% | 0% | 10/12/10/10 | 6.2 | 0.0/0.7/0.0/0.4 |
| mole | young | three | 100% | 8% | 29% | 0% | 36/26/17/26 | 12.1 | 0.7/0.2/0.1/1.0 |
| mole | adult | alone | 100% | 33% | 0% | 0% | 10/6/6/12 | 10.7 | 0.3/0.2/0.7/0.1 |
| mole | adult | three | 100% | 7% | 11% | 4% | 26/28/19/25 | 15.0 | 0.2/0.5/2.7/0.8 |
| hedgehog | young | alone | – | 75% | – | 100% | 0/4/0/2 | - | -/0.5/-/1.7 |
| hedgehog | young | three | 100% | 17% | 0% | 67% | 2/12/2/9 | 15.9 | 1.9/0.6/4.0/1.7 |
| hedgehog | adult | alone | – | 0% | – | 0% | 0/4/0/2 | - | -/0.4/-/1.9 |
| hedgehog | adult | three | 100% | 0% | 25% | 33% | 4/8/4/9 | 20.4 | 0.4/0.4/4.2/2.0 |
| stoat | young | alone (old pack bolt) | 100% | 100% | 50% | 81% | 16/16/10/16 | 7.1 | – |
| stoat | young | three (old pack bolt) | 100% | 67% | 53% | 59% | 44/43/34/46 | 9.5 | – |
| stoat | adult | alone (old pack bolt) | 100% | 63% | 35% | 81% | 32/32/20/32 | 9.5 | – |
| stoat | adult | three (old pack bolt) | 79% | 56% | 44% | 47% | 84/82/66/78 | 10.1 | – |
| hare | young | alone (old pack bolt) | 100% | 92% | 33% | 50% | 12/13/6/12 | 17.6 | – |
| hare | young | three (old pack bolt) | 100% | 53% | 12% | 47% | 39/40/34/38 | 16.9 | – |
| hare | adult | alone (old pack bolt) | 100% | 85% | 33% | 57% | 14/13/12/14 | 16.6 | – |
| hare | adult | three (old pack bolt) | 100% | 59% | 26% | 47% | 34/37/31/38 | 16.4 | – |
| badger | young | alone (old pack bolt) | 100% | 100% | 0% | 100% | 6/4/2/4 | 10.1 | – |
| badger | young | three (old pack bolt) | 100% | 0% | 100% | 43% | 9/2/2/7 | 13.6 | – |
| badger | adult | alone (old pack bolt) | 100% | 100% | 0% | 100% | 6/4/4/6 | 11.9 | – |
| badger | adult | three (old pack bolt) | 100% | 0% | 0% | 17% | 10/5/4/6 | 20.3 | – |
**Why moving beats them** (point 4 of the brief): from the start of the wind-up to impact, a home shot takes 0.9 s (mole), 1.1–1.4 s (bolts) or 1.6–1.9 s (lobs: wind-up plus a 1 s flight). In that time she walks 17–37 m. The aim is fixed at that start, so the shot lands where she was. A shot never hits someone moving steadily unless she is walking straight at it. The old pack bolts take 0.5–0.6 s and lead her, which is why they hit.

## Options (none applied)

Each option is a rule for every ranged attack. Each was measured by running the same harness with the change made in memory only. Each cell gives (a) still / (b) across / (c) away / (c) toward / (d) zig-zag, in %. (e), the treetops, stays 0% under every option because the rule that she can't be hit there is unchanged.

- **Option 1, lead.** The aim follows her through the wind-up. It locks at least 0.2 s before release, and at least 0.75 s (young) or 0.6 s (adult and legend) before the shot can reach her, never less than the 0.45 s reaction floor. It aims at where she'll be on arrival (lead ×1), solving curved paths so the curve passes through that point. The old pack bolts take the same lock. Speeds and wind-ups are unchanged.
- **Options 2+3, faster and quicker, aim unchanged.** Bolts and rollers fly at least 2× her ground speed (38.5 m/s), and lob flights shorten in proportion. Wind-ups ×0.6, lifted back to the reaction floor where needed. (Run separately, speed alone and wind-up alone came out the same: across stays at 0% for every species shot.)
- **Option C, combination (recommended).** Option 1, plus option 2's speed floor (38.5 m/s for straight bolts and rollers). Wind-ups are unchanged, so the wind-up she sees is still her warning. The last column reruns C with each caster drifting 4 m/s through its wind-up, the way the real ones do. This is a lower bound, explained below.

**Ed's per-level lead factor ("babies lead less") measured as a cliff.** A shot that leads her by L of the way lands (1 − L) × her speed × flight time behind her. That is 2–4 m short at L = 0.85, against a hit radius of 0.8 m. With youths at 0.85 and adults at 1 (plus the 38.5 m/s floor), every young species shot fell to 0–8% across: dormouse 0%, fox 0%, marten 0%, hedgehog 0%. Adults stayed at 100%. So the level difference is better made by **when the aim locks**: young 0.75 s before impact, adult 0.6 s. A longer lock leaves youths more dodgeable by a change of direction, while they stay a threat to a straight walker.

### Home

| kind | level | path | now | 1 lead | 2+3 faster, quicker | C combo | C, caster drifting 4 m/s |
|---|---|---|---|---|---|---|---|
| dormouse | young | solo | 100/0/0/100/0 | 100/100/0/100/10 | 100/0/100/100/0 | 100/100/100/100/19 | 44/44/42/47/11 |
| dormouse | young | team | 100/0/0/0/0 | 100/0/0/50/0 | 100/0/11/0/0 | 100/0/0/100/4 | 25/10/0/26/4 |
| dormouse | adult | solo | 100/0/0/100/0 | 100/100/0/100/9 | 100/0/100/100/0 | 100/100/100/100/38 | 96/71/97/100/28 |
| dormouse | adult | team | 100/0/0/0/0 | 100/0/0/100/3 | 100/0/89/75/0 | 100/100/0/100/24 | 47/42/7/37/13 |
| fox | young | solo | 0/0/0/98/0 | 100/0/0/100/4 | 4/0/0/100/0 | 100/56/0/100/33 | 49/47/29/54/26 |
| fox | young | team | 11/0/0/0/0 | 100/0/0/0/0 | 69/0/0/49/0 | 100/60/0/100/5 | 36/23/0/35/6 |
| fox | adult | solo | 0/0/0/100/0 | 100/0/0/100/4 | 0/0/0/100/0 | 100/93/0/100/57 | 75/63/30/100/40 |
| fox | adult | team | 0/0/0/36/0 | 100/0/0/56/2 | 47/0/0/100/0 | 100/78/0/100/48 | 67/62/5/67/29 |
| fox | legend | solo | 100/0/0/0/0 | 100/100/100/100/2 | 100/0/0/0/0 | 100/100/100/100/2 | 100/100/100/100/2 |
| marten | young | solo | 100/0/0/100/5 | 100/0/0/100/4 | 100/0/100/100/0 | 100/100/98/100/68 | 100/38/48/100/54 |
| marten | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/11/100/2 | 100/0/0/100/24 | 100/10/0/47/26 |
| marten | adult | solo | 100/0/0/100/6 | 100/32/0/100/7 | 100/0/100/100/3 | 100/100/100/100/96 | 100/70/96/100/77 |
| marten | adult | team | 100/0/0/50/10 | 100/0/0/100/3 | 100/0/89/100/4 | 100/100/0/100/80 | 100/42/7/100/64 |
| squirrel | young | solo | 100/0/0/0/0 | 100/100/100/100/4 | 100/0/0/0/0 | 100/100/100/100/19 | 100/100/100/100/19 |
| squirrel | young | team | 100/0/0/0/0 | 100/100/100/100/2 | 100/0/0/0/0 | 100/100/100/100/15 | 100/100/100/100/15 |
| squirrel | adult | solo | 100/0/0/0/0 | 100/100/100/100/4 | 100/0/0/0/0 | 100/100/100/100/20 | 100/100/100/100/20 |
| squirrel | adult | team | 100/0/0/0/0 | 100/100/100/100/1 | 100/0/0/0/0 | 100/100/100/100/18 | 100/100/100/100/18 |
| mole | young | solo | 100/0/0/0/0 | 100/100/100/100/31 | 100/0/0/0/0 | 100/100/100/100/31 | 100/100/100/100/31 |
| mole | young | team | 100/0/0/0/0 | 100/100/100/100/30 | 100/0/0/0/0 | 100/100/100/100/30 | 100/100/100/100/30 |
| mole | adult | solo | 100/0/0/0/0 | 100/100/100/100/50 | 100/0/0/0/0 | 100/100/100/100/50 | 100/100/100/100/50 |
| mole | adult | team | 100/0/0/0/0 | 100/100/100/100/50 | 100/0/0/0/0 | 100/100/100/100/50 | 100/100/100/100/50 |
| hedgehog | young | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/100/10 | 100/0/0/100/10 | 26/10/0/18/9 |
| hedgehog | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/75/100/10 | 100/100/0/100/4 | 25/10/0/26/4 |
| hedgehog | adult | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/31/0/18 | 100/0/0/100/19 | 38/16/0/35/12 |
| hedgehog | adult | team | 100/0/0/0/0 | 100/0/0/100/10 | 100/0/100/100/19 | 100/100/47/100/24 | 47/42/20/50/14 |
| stoat | young | pack | 100/100/100/100/84 | 100/100/100/92/48 | 100/100/100/100/64 | 100/100/100/92/48 | 46/51/49/35/31 |
| stoat | adult | pack | 100/100/0/91/54 | 100/100/0/86/20 | 100/0/0/100/73 | 100/100/0/86/20 | 94/87/68/40/55 |
| hare | young | pack | 100/100/100/100/49 | 100/100/100/100/16 | 100/100/100/100/62 | 100/100/100/98/28 | 47/54/49/39/26 |
| hare | adult | pack | 100/100/100/100/78 | 100/100/100/100/44 | 100/100/100/100/64 | 100/100/100/100/44 | 69/62/73/67/42 |
| badger | young | pack | 100/100/100/100/46 | 100/100/100/100/13 | 100/100/100/100/62 | 100/100/100/100/25 | 48/54/49/44/25 |
| badger | adult | pack | 100/100/100/100/75 | 100/100/100/100/42 | 100/100/100/100/64 | 100/100/100/100/42 | 76/64/80/77/40 |
The fox legend's row stands for every legend. Its lob is shown for 3 s, so the 0.6 s lock happens at release. Straight walkers are then hit, zig-zaggers almost never (2%).

### A spread of other kinds sharing the rules

- **Fast shooter:** dragonfly (30 m/s) and the tiger and cat fans (30–32 m/s).
- **Slow heavy shooters:** rhino (logs from 8 m/s rising to 24) and heron (heavy, 18 rising to 40 m/s).
- **Homing:** owl and hydra.
- **Areas put down where she stands:** jaguar and polar bear.
- **Old pack bolts:** spider and feathered serpent.
- **Others:** beaver walls, toad lobs, fennec and stegosaurus sprays, sphinx beam.

| kind | level | path | now | 1 lead | 2+3 faster, quicker | C combo | C, caster drifting 4 m/s |
|---|---|---|---|---|---|---|---|
| dragonfly | young | solo | 57/0/0/50/0 | 100/100/0/100/11 | 63/0/74/50/0 | 100/97/99/100/27 | 51/48/53/77/16 |
| dragonfly | young | team | 95/0/0/0/0 | 100/0/0/28/3 | 70/0/0/0/0 | 100/0/0/100/2 | 25/0/0/18/3 |
| dragonfly | adult | solo | 63/0/0/71/0 | 100/100/0/100/9 | 79/0/81/73/0 | 100/100/100/100/37 | 84/79/78/94/28 |
| dragonfly | adult | team | 69/0/0/0/0 | 100/0/0/100/7 | 100/0/53/40/0 | 100/100/0/100/16 | 43/24/0/44/11 |
| rhino | young | solo | 0/0/0/0/0 | 0/0/0/0/1 | 0/0/0/0/0 | 0/0/0/0/17 | 11/12/9/24/31 |
| rhino | young | team | 0/0/0/0/0 | 0/0/0/0/0 | 0/0/0/0/0 | 0/0/0/0/16 | 52/45/0/52/26 |
| rhino | adult | solo | 100/0/0/41/0 | 100/0/0/100/1 | 100/0/100/100/0 | 100/94/100/100/78 | 57/56/59/76/61 |
| rhino | adult | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/100/0/0 | 100/100/5/100/65 | 55/54/20/56/58 |
| heron | young | solo | 100/0/80/100/0 | 100/100/80/100/6 | 100/0/100/100/0 | 100/100/100/100/45 | 59/63/68/82/28 |
| heron | young | team | 100/0/0/0/0 | 100/100/0/100/10 | 100/0/100/79/0 | 100/100/100/100/30 | 31/31/27/32/12 |
| heron | adult | solo | 100/0/92/100/0 | 100/100/92/100/5 | 100/0/100/100/0 | 100/100/100/100/47 | 90/81/96/94/36 |
| heron | adult | team | 100/0/6/44/0 | 100/100/6/100/16 | 100/0/100/100/0 | 100/100/100/100/49 | 76/74/80/81/33 |
| owl | young | solo | 100/0/0/100/12 | 100/6/0/61/2 | 100/0/100/100/0 | 100/0/100/100/33 | 90/13/100/100/24 |
| owl | young | pack | 100/0/0/0/3 | 100/100/100/100/0 | 100/100/100/100/10 | 100/100/100/100/3 | 100/100/100/100/3 |
| owl | adult | solo | 100/0/0/100/14 | 100/51/0/67/0 | 100/0/100/100/0 | 100/0/100/100/33 | 100/15/100/100/29 |
| owl | adult | pack | 100/0/0/0/3 | 100/100/100/100/0 | 100/100/100/100/12 | 100/100/100/100/4 | 100/100/100/100/4 |
| hydra | young | solo | 100/0/0/41/0 | 100/0/0/49/0 | 100/0/93/100/0 | 100/0/10/100/29 | 52/28/17/83/28 |
| hydra | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/43/62/0 | 100/0/0/100/36 | 36/32/0/47/45 |
| hydra | adult | solo | 83/0/0/62/0 | 83/0/0/61/0 | 0/0/100/79/0 | 0/100/29/98/35 | 2/67/26/90/41 |
| hydra | adult | team | 25/0/0/0/0 | 25/0/0/0/0 | 0/0/56/95/0 | 0/58/0/90/41 | 38/50/2/72/52 |
| tiger | young | solo | 100/0/0/0/0 | 100/0/0/60/14 | 100/0/0/0/0 | 100/0/0/100/15 | 58/0/0/21/12 |
| tiger | young | team | 100/0/0/0/0 | 100/0/0/100/24 | 100/0/0/4/0 | 100/0/0/100/19 | 43/7/0/38/20 |
| tiger | adult | solo | 51/0/0/0/0 | 51/0/0/0/31 | 48/0/0/0/0 | 48/0/0/0/26 | 84/0/0/30/34 |
| tiger | adult | team | 0/0/0/0/0 | 0/0/0/11/22 | 0/0/0/85/24 | 0/0/0/25/30 | 61/0/0/68/41 |
| cat | young | solo | 100/0/0/0/0 | 100/0/0/100/16 | 100/0/0/0/0 | 100/0/0/100/12 | 83/12/0/26/10 |
| cat | young | team | 100/0/0/0/0 | 100/0/0/57/14 | 100/0/0/0/0 | 100/0/0/100/24 | 57/5/0/21/19 |
| cat | adult | solo | 100/0/0/0/0 | 100/0/0/0/27 | 100/0/0/0/0 | 100/0/0/0/28 | 97/2/0/75/31 |
| cat | adult | team | 28/0/0/0/0 | 28/0/0/0/38 | 22/0/0/44/0 | 22/0/0/9/35 | 84/0/0/75/42 |
| stegosaurus | young | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/15 | 100/0/0/100/13 | 39/10/0/32/13 |
| stegosaurus | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/16 | 100/0/0/100/11 | 46/0/0/19/8 |
| stegosaurus | adult | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/6/22/12 | 100/0/0/100/22 | 59/21/0/50/20 |
| stegosaurus | adult | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/11 | 100/0/0/100/22 | 57/16/0/48/22 |
| fennec | young | solo | 100/0/0/0/0 | 100/0/0/14/0 | 100/0/0/40/0 | 100/0/0/100/1 | 64/0/0/37/1 |
| fennec | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/0 | 64/0/0/6/1 |
| fennec | adult | solo | 100/0/0/1/0 | 100/0/0/37/0 | 100/0/0/62/0 | 100/0/0/100/5 | 77/0/0/61/5 |
| fennec | adult | team | 100/0/0/0/0 | 100/0/0/16/0 | 100/0/0/76/0 | 100/0/0/96/4 | 80/0/0/49/3 |
| jaguar | young | solo | 100/0/0/0/0 | 100/100/100/100/27 | 100/0/0/0/0 | 100/100/100/100/27 | 100/100/100/100/27 |
| jaguar | young | team | 100/0/0/0/0 | 100/100/100/100/27 | 100/0/0/0/0 | 100/100/100/100/27 | 100/100/100/100/27 |
| jaguar | adult | solo | 100/0/0/0/0 | 100/100/100/100/45 | 100/0/0/0/0 | 100/100/100/100/45 | 100/100/100/100/45 |
| jaguar | adult | team | 100/0/0/0/0 | 100/100/100/100/45 | 100/0/0/0/0 | 100/100/100/100/45 | 100/100/100/100/45 |
| polarbear | young | solo | 61/0/0/0/0 | 61/0/0/0/0 | 61/0/0/0/0 | 61/0/0/0/0 | 61/0/0/0/0 |
| polarbear | adult | solo | 82/0/0/0/0 | 82/0/0/0/0 | 82/0/0/0/0 | 82/0/0/0/0 | 82/0/0/0/0 |
| spider | young | solo | 100/0/0/95/0 | 100/0/0/100/1 | 100/0/56/100/0 | 100/100/0/100/29 | 69/60/7/92/19 |
| spider | young | pack | 100/100/100/100/67 | 100/100/100/100/34 | 100/100/100/100/64 | 100/100/100/100/34 | 52/58/56/51/33 |
| spider | adult | solo | 100/0/0/100/0 | 100/0/0/100/1 | 100/0/73/100/0 | 100/100/17/100/42 | 100/99/16/100/43 |
| spider | adult | pack | 100/100/100/100/91 | 100/100/100/100/56 | 100/100/100/100/65 | 100/100/100/100/56 | 86/68/88/86/59 |
| featheredserpent | young | solo | 50/0/0/29/0 | 100/0/0/29/0 | 0/0/0/100/0 | 0/0/0/29/0 | 7/0/0/15/0 |
| featheredserpent | young | pack | 100/100/100/100/65 | 100/100/100/100/33 | 100/100/100/100/64 | 100/100/100/100/33 | 55/59/58/52/34 |
| featheredserpent | adult | solo | 48/0/0/50/0 | 86/0/0/51/0 | 0/0/0/100/0 | 0/0/0/51/0 | 2/0/0/22/0 |
| featheredserpent | adult | pack | 0/0/0/97/40 | 0/22/0/97/49 | 0/0/0/100/51 | 0/22/0/97/49 | 69/55/1/100/44 |
| sphinx | young | solo | 100/0/0/0/0 | 100/0/0/25/0 | 100/0/0/13/0 | 100/0/0/25/0 | 100/0/0/22/0 |
| sphinx | young | team | 100/0/100/0/0 | 100/100/100/100/37 | 100/0/100/0/0 | 100/100/100/100/37 | 100/100/100/100/39 |
| sphinx | adult | solo | 100/0/0/0/0 | 100/0/0/5/3 | 100/0/0/35/0 | 100/0/0/5/3 | 100/0/0/3/4 |
| sphinx | adult | team | 100/0/100/0/0 | 100/100/100/100/47 | 100/0/100/0/0 | 100/100/100/100/47 | 100/100/100/100/46 |
| beaver | young | solo | 100/0/0/25/0 | 100/0/0/29/0 | 100/0/67/100/0 | 100/100/0/100/32 | 77/85/3/89/33 |
| beaver | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/100/10 | 92/0/0/68/12 |
| beaver | adult | solo | 100/0/0/17/0 | 100/0/0/36/0 | 53/0/64/35/0 | 53/100/0/69/55 | 100/100/11/98/65 |
| beaver | adult | team | 100/0/0/0/0 | 100/0/0/0/0 | 48/0/0/6/0 | 48/0/0/98/44 | 99/37/0/100/52 |
| toad | young | solo | 100/0/0/0/0 | 100/100/100/100/2 | 100/0/0/0/0 | 100/100/100/100/30 | 100/100/100/100/30 |
| toad | young | pack | 100/0/0/0/3 | 100/100/100/100/1 | 100/100/100/100/19 | 100/100/100/100/4 | 100/100/100/100/4 |
| toad | adult | solo | 100/0/0/0/0 | 100/100/100/100/5 | 100/0/0/0/0 | 100/100/100/100/32 | 100/100/100/100/32 |
| toad | adult | pack | 100/0/0/0/6 | 100/100/100/100/1 | 100/100/100/100/21 | 100/100/100/100/4 | 100/100/100/100/4 |
## Flags: what would be unfair, or broken, under the options

1. **Bursts, sprays and volleys** (marten at home; meerkat, fennec, stegosaurus): later shots must keep the first shot's locked aim. In the harness they re-aimed with full lead at their own release, and the marten then hits 68–96% even zig-zagging. Treat those cells as a worst case until the later shots share the lock.
2. **Areas put down where she stands** (mole at home; jaguar, roe, snow leopard; mines): with no flight, the lock is all the warning she gets. At 0.6–0.75 s, zig-zag hits are 27–50%: mole 31% young, 50% adult. Locking 0.7 s for adults too brings them to 29–37%. A lead of 0.5 takes them back to about 0% when moving.
3. **Homing and odd paths should stay out of the speed floor and the lead.**
   - Hydra adult: fans of 4 that home at 40°/s. The faster bolts can't turn in, and standing-still hits fall from 83% to 0%.
   - Feathered serpent: a spiral ring. Standing-still hits fall from 50% to 0%.
   - Owl: lead and homing work against each other, and across stays at 0%.
   - Boomerangs (raccoon, red panda) and beams (salamander, sphinx, frost wyrm, unicorn) should keep their own aim and tracking. The harness's lead turned the sphinx's team beam to 37–47% zig-zag.
4. **Walls of rollers with lead** (rhino adult, beaver adult): 44–78% zig-zag, because the wall is wider than her change of direction. The rhino is the harshest kind under C. Give walls lead ×0.5, or leave them out.
5. **The old pack bolts are already the harshest ranged attacks**, today, before any change. Home's stoat, hare and badger hit zig-zaggers 46–84% in the harness and 47–81% in real rules; the spider adult hits 91%. Under C's lock they drop to 20–56%. Adults stay the strongest, with the spider adult at 56% and hare and badger adults at 42–44%. Giving them their species' wind-up instead of `dodge.b.windup` 0.35 s would be the next step. That wasn't measured.
6. **The caster must hold its aim point.** The real casters drift 0–7.6 m during a wind-up. If the aim is computed from where the caster stands at the lock and it keeps sliding, C's hits fall a lot: compare the "caster drifting 4 m/s" column, where many still targets drop to 25–50%. A change should aim from where the caster lets go, or stop it from the lock to the release ("it glides to a stop as it winds up" already).

## Oddities found today (not caused by the options)

- **Curved shots are aimed straight.** Fox (curve 30°/s), snake, raven, meerkat and red panda miss a standing witch at their stand-off distance: fox 0% solo, meerkat 1–2%.
- **Even-count fans leave a hole in the middle.** An adult gains one more in its fan (tiger and cat 3 → 4; the old pack fans 1 → 2 for stoat, bat, lynx, stag, raven and feathered serpent). Standing still or walking straight away is then safe: tiger adult team 0% standing, stoat adult pack 0% away.
- **Young rhino logs never reach her**, even when she stands still (0%).
- **`dodge.b.speed` (2×) and `dodge.b.windup` (0.35 s) apply only to the old pack bolts**, not to species attacks. `balance.md` already notes the speed half.
- **The polar bear's rain ignores the changed aim** in the harness, so its rows are unchanged. Not modelled.
- **Not measured solo:** pack-interplay attacks that need packmates (unicorn tether, crab triangulate, raven relay, dragonfly chain).

## Recommendation

**Option C, with flags 1–4 and 6 built into the rule.**

1. **Aim:** at where she'll be on arrival (lead ×1). The aim follows her through the wind-up, so the telegraph lane or landing ring tracks her, then locks at least 0.2 s before release. It locks at least 0.75 s (young) or 0.6 s (adult and legend) before the shot can reach her. Areas put down where she stands lock 0.7 s at every level. The aim is taken from where the caster lets go.
2. **Speed:** straight bolts and rollers fly at least 2× her ground speed (38.5 m/s). Homing, spiral, boomerang and beam attacks are left out. Burst and spray shots share the first shot's lock.
3. **Wind-ups:** unchanged. The team youths' longer 0.91 s could come down to 0.7 s if Ed still finds it long after C. That wasn't measured.
4. **Old pack bolts:** take the same lock.

What it does for home (harness, caster still):

- **Straight across:** the dormouse, squirrel and mole hit a straight walker about 100% of the time, and the fox 56–93%. Team youths are reach-limited at 0–60%: from 8 m away, the intercept lands beyond their bolt's reach.
- **Zig-zag:** 4–57%: mole 30–50%, marten worst-case 24–96% until flag 1 is in.
- **Blink:** a 15 m blink after the lock always clears the shot.

Before shipping, rerun the real-rules check on the combined build, because casters' drift and teams change these numbers.

Reruns:

```
node tools/balance/rangedhit.mjs --kinds home                                          # now
node tools/balance/rangedhit.mjs --kinds all --values                                  # values only, every kind
node tools/balance/rangedhit.mjs --kinds home --lead 1 --commit 0.2 --impact 1:0.75,2:0.6,3:0.6 --lead-old --min-speed 2   # option C
```

## Appendix: current values, every ranged attacker (young and adult; every legend's is the legend row above)

Each kind's own measured hit rates now are in `scratchpad/ranged/current-all.md`.

| kind | level | path | body | wind-up s | speed | fires from (m) | stands at (m) | cooldown s | aim | homing | path bends | radius | wind-up→impact s (she walks m) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| badger | young | pack | bolt | 0.35 | 35.2 m/s | 29 | 9.5 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.63 (12) |
| badger | adult | pack | bolt | 0.35 | 44 m/s | 34 | 11.2 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.61 (12) |
| dormouse | young | solo | bolt | 0.60 | 26 m/s | 48 | 16.0 | 1.8 | her place at wind-up start | none |  | 0.5 | 1.22 (23) |
| dormouse | young | team | bolt | 0.91 | 26 m/s | 24 | 8.2 | 1.8 | her place at wind-up start | none |  | 0.5 | 1.23 (24) |
| dormouse | adult | solo | bolt | 0.60 | 26 m/s | 53 | 17.6 | 1.8 | her place at wind-up start | none |  | 0.6 | 1.28 (25) |
| dormouse | adult | team | bolt | 0.70 | 26 m/s | 29 | 9.6 | 1.8 | her place at wind-up start | none |  | 0.6 | 1.08 (21) |
| fox | young | solo | bolt | 0.60 | 20 m/s | 43 | 14.4 | 1.8 | her place at wind-up start | none | curve | 0.6 | 1.32 (26) |
| fox | young | team | bolt | 0.91 | 20 m/s | 31 | 10.2 | 1.8 | her place at wind-up start | none | curve | 0.6 | 1.43 (27) |
| fox | adult | solo | bolt | 0.60 | 20 m/s | 48 | 15.8 | 1.8 | her place at wind-up start | none | curve | 0.72 | 1.40 (27) |
| fox | adult | team | bolt | 0.70 | 20 m/s | 36 | 12.0 | 1.8 | her place at wind-up start | none | curve | 0.72 | 1.31 (25) |
| hare | young | pack | bolt | 0.35 | 35.2 m/s | 24 | 8.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| hare | adult | pack | bolt | 0.35 | 44 m/s | 29 | 9.6 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.57 (11) |
| hedgehog | young | solo | bolt ring×6 | 0.70 | 22 m/s | 14 | 4.8 | 2.2 | her place at wind-up start | none |  | 0.5 | 0.92 (18) |
| hedgehog | young | team | bolt ring×6 | 0.91 | 22 m/s | 24 | 8.2 | 2.2 | her place at wind-up start | none |  | 0.5 | 1.29 (25) |
| hedgehog | adult | solo | bolt ring×7 | 0.70 | 22 m/s | 16 | 5.3 | 2.2 | her place at wind-up start | none |  | 0.6 | 0.94 (18) |
| hedgehog | adult | team | bolt ring×7 | 0.70 | 22 m/s | 29 | 9.6 | 2.2 | her place at wind-up start | none |  | 0.6 | 1.14 (22) |
| marten | young | solo | bolt burst×2 | 0.60 | 24 m/s | 43 | 14.4 | 2 | her place at wind-up start | none |  | 0.5 | 1.21 (23) |
| marten | young | team | bolt burst×2 | 0.91 | 24 m/s | 24 | 8.2 | 2 | her place at wind-up start | none |  | 0.5 | 1.25 (24) |
| marten | adult | solo | bolt burst×3 | 0.60 | 24 m/s | 48 | 15.8 | 2 | her place at wind-up start | none |  | 0.6 | 1.27 (24) |
| marten | adult | team | bolt burst×3 | 0.70 | 24 m/s | 29 | 9.6 | 2 | her place at wind-up start | none |  | 0.6 | 1.11 (21) |
| mole | young | solo | area | 0.90 | none (ground) | 24 | 16.0 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.90 (17) |
| mole | young | team | area | 0.91 | none (ground) | 31 | 10.2 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.91 (18) |
| mole | adult | solo | area | 0.90 | none (ground) | 26 | 17.6 | 2.4 | where she stood at wind-up start | none |  | r 3.6 | 0.90 (17) |
| mole | adult | team | area | 0.90 | none (ground) | 36 | 12.0 | 2.4 | where she stood at wind-up start | none |  | r 3.6 | 0.90 (17) |
| squirrel | young | solo | lob | 0.60 | lob, 1 s up | 26 | 17.6 | 2 | where she stood at wind-up start | none |  | 2.5 | 1.60 (31) |
| squirrel | young | team | lob | 0.91 | lob, 1 s up | 29 | 9.5 | 2 | where she stood at wind-up start | none |  | 2.5 | 1.91 (37) |
| squirrel | adult | solo | lob | 0.60 | lob, 1 s up | 29 | 19.4 | 2 | where she stood at wind-up start | none |  | 3 | 1.60 (31) |
| squirrel | adult | team | lob | 0.70 | lob, 1 s up | 34 | 11.2 | 2 | where she stood at wind-up start | none |  | 3 | 1.70 (33) |
| stoat | young | pack | bolt | 0.35 | 49.28 m/s | 20 | 6.8 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.49 (9) |
| stoat | adult | pack | bolt fan×2 | 0.35 | 61.6 m/s | 24 | 8.0 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.48 (9) |
| beaver | young | solo | runner wall×3 | 0.80 | 12 m/s | 38 | 12.8 | 2.6 | her place at wind-up start | none |  | 0.8 | 1.87 (36) |
| beaver | young | team | runner wall×3 | 0.91 | 12 m/s | 20 | 6.8 | 2.6 | her place at wind-up start | none |  | 0.8 | 1.49 (29) |
| beaver | adult | solo | runner wall×4 | 0.80 | 12 m/s | 42 | 14.1 | 2.6 | her place at wind-up start | none |  | 0.96 | 1.97 (38) |
| beaver | adult | team | runner wall×4 | 0.80 | 12 m/s | 24 | 8.0 | 2.6 | her place at wind-up start | none |  | 0.96 | 1.48 (28) |
| moth | young | solo | bolt | 0.70 | 14 m/s | 58 | 19.2 | 2.2 | her place at wind-up start | none | wave | 0.8 | 2.07 (40) |
| moth | young | team | bolt | 0.91 | 14 m/s | 20 | 6.8 | 2.2 | her place at wind-up start | none | wave | 0.8 | 1.40 (27) |
| moth | adult | solo | bolt | 0.70 | 14 m/s | 63 | 21.1 | 2.2 | her place at wind-up start | none | wave | 0.96 | 2.22 (43) |
| moth | adult | team | bolt | 0.70 | 14 m/s | 24 | 8.0 | 2.2 | her place at wind-up start | none | wave | 0.96 | 1.28 (25) |
| newt | young | solo | bolt | 0.70 | 20 m/s | 43 | 14.4 | 2.2 | her place at wind-up start | none |  | 0.6 | 1.42 (27) |
| newt | young | team | bolt | 0.91 | 20 m/s | 24 | 8.2 | 2.2 | her place at wind-up start | none |  | 0.6 | 1.32 (25) |
| newt | adult | solo | bolt | 0.70 | 20 m/s | 48 | 15.8 | 2.2 | her place at wind-up start | none |  | 0.72 | 1.50 (29) |
| newt | adult | team | bolt | 0.70 | 20 m/s | 29 | 9.6 | 2.2 | her place at wind-up start | none |  | 0.72 | 1.18 (23) |
| stag | young | pack | bolt | 0.35 | 35.2 m/s | 29 | 9.5 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.63 (12) |
| stag | adult | pack | bolt fan×2 | 0.35 | 44 m/s | 34 | 11.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.61 (12) |
| toad | young | solo | lob | 0.70 | lob, 0.8 s up | 24 | 16.0 | 2.2 | where she stood at wind-up start | none |  | 2 | 1.50 (29) |
| toad | young | pack | lob | 0.35 | lob, 1.1 s up | 16 | 10.9 | 2.6 | at release, leads ×0.9 | none |  | 1.8 | 1.45 (28) |
| toad | adult | solo | lob | 0.70 | lob, 0.8 s up | 26 | 17.6 | 2.2 | where she stood at wind-up start | none |  | 2.4 | 1.50 (29) |
| toad | adult | pack | lob | 0.35 | lob, 1.1 s up | 19 | 12.8 | 2.6 | at release, leads ×0.9 | none |  | 2.1 | 1.45 (28) |
| elk | young | pack | bolt | 0.35 | 28.16 m/s | 20 | 6.8 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.59 (11) |
| elk | adult | pack | bolt fan×3 | 0.35 | 35.2 m/s | 24 | 8.0 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| wolf | young | pack | bolt | 0.35 | 28.16 m/s | 20 | 6.8 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.59 (11) |
| wolf | adult | pack | bolt fan×3 | 0.35 | 35.2 m/s | 24 | 8.0 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| owl | young | solo | bolt | 0.80 | 12 accel→26 m/s | 62 | 20.8 | 2.6 | her place at wind-up start | turns 60°/s after 0.3 s |  | 0.7 | 1.87 (36) |
| owl | young | pack | lob | 0.35 | lob, 1.2 s up | 31 | 20.4 | 2.6 | at release, leads ×0.9 | none |  | 1.8 | 1.55 (30) |
| owl | adult | solo | bolt | 0.80 | 12 accel→26 m/s | 69 | 22.9 | 2.6 | her place at wind-up start | turns 60°/s after 0.3 s |  | 0.84 | 1.96 (38) |
| owl | adult | pack | lob | 0.35 | lob, 1.2 s up | 36 | 24.0 | 2.6 | at release, leads ×0.9 | none |  | 2.1 | 1.55 (30) |
| raccoon | young | solo | bolt | 0.70 | 20 m/s | 43 | 14.4 | 2.4 | her place at wind-up start | none | boomerang | 0.7 | 1.42 (27) |
| raccoon | young | team | bolt | 0.91 | 20 m/s | 24 | 8.2 | 2.4 | her place at wind-up start | none | boomerang | 0.7 | 1.32 (25) |
| raccoon | adult | solo | bolt | 0.70 | 20 m/s | 48 | 15.8 | 2.4 | her place at wind-up start | none | boomerang | 0.84 | 1.50 (29) |
| raccoon | adult | team | bolt | 0.70 | 20 m/s | 29 | 9.6 | 2.4 | her place at wind-up start | none | boomerang | 0.84 | 1.18 (23) |
| cat | young | solo | bolt fan×3 | 0.60 | 30 m/s | 14 | 4.8 | 1.8 | her place at wind-up start | none |  | 0.6 | 0.77 (15) |
| cat | young | team | bolt fan×3 | 0.91 | 30 m/s | 20 | 6.8 | 1.8 | her place at wind-up start | none |  | 0.6 | 1.14 (22) |
| cat | adult | solo | bolt fan×4 | 0.60 | 30 m/s | 16 | 5.3 | 1.8 | her place at wind-up start | none |  | 0.72 | 0.78 (15) |
| cat | adult | team | bolt fan×4 | 0.70 | 30 m/s | 24 | 8.0 | 1.8 | her place at wind-up start | none |  | 0.72 | 0.97 (19) |
| fennec | young | solo | bolt spray×5 | 0.60 | 26 decel→12 m/s | 23 | 8.0 | 2 | her place at wind-up start | none |  | 0.6 | 0.99 (19) |
| fennec | young | team | bolt spray×5 | 0.91 | 26 decel→12 m/s | 23 | 8.2 | 2 | her place at wind-up start | none |  | 0.6 | 1.31 (25) |
| fennec | adult | solo | bolt spray×6 | 0.60 | 26 decel→12 m/s | 24 | 8.8 | 2 | her place at wind-up start | none |  | 0.72 | 1.04 (20) |
| fennec | adult | team | bolt spray×6 | 0.70 | 26 decel→12 m/s | 26 | 9.6 | 2 | her place at wind-up start | none |  | 0.72 | 1.21 (23) |
| bat | young | pack | bolt | 0.35 | 35.2 m/s | 20 | 6.8 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.55 (11) |
| bat | adult | pack | bolt fan×2 | 0.35 | 44 m/s | 24 | 8.0 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.53 (10) |
| snake | young | solo | bolt | 0.70 | 22 m/s | 43 | 14.4 | 2.2 | her place at wind-up start | none | curve+wave | 0.6 | 1.36 (26) |
| snake | young | team | bolt | 0.91 | 22 m/s | 29 | 9.5 | 2.2 | her place at wind-up start | none | curve+wave | 0.6 | 1.34 (26) |
| snake | adult | solo | bolt | 0.70 | 22 m/s | 48 | 15.8 | 2.2 | her place at wind-up start | none | curve+wave | 0.72 | 1.42 (27) |
| snake | adult | team | bolt | 0.70 | 22 m/s | 34 | 11.2 | 2.2 | her place at wind-up start | none | curve+wave | 0.72 | 1.22 (23) |
| heron | young | solo | bolt | 0.80 | 18 accel→40 m/s | 62 | 20.8 | 2.4 | her place at wind-up start | none |  | 0.5 | 1.43 (28) |
| heron | young | team | bolt | 0.91 | 18 accel→40 m/s | 37 | 12.2 | 2.4 | her place at wind-up start | none |  | 0.5 | 1.34 (26) |
| heron | adult | solo | bolt | 0.80 | 18 accel→40 m/s | 69 | 22.9 | 2.4 | her place at wind-up start | none |  | 0.6 | 1.49 (29) |
| heron | adult | team | bolt | 0.80 | 18 accel→40 m/s | 43 | 14.4 | 2.4 | her place at wind-up start | none |  | 0.6 | 1.28 (25) |
| otter | young | solo | lob | 0.60 | lob, 0.6 s up | 24 | 16.0 | 2 | where she stood at wind-up start | none |  | 1.5 | 1.20 (23) |
| otter | young | team | lob | 0.91 | lob, 0.6 s up | 24 | 8.2 | 2 | where she stood at wind-up start | none |  | 1.5 | 1.51 (29) |
| otter | adult | solo | lob | 0.60 | lob, 0.6 s up | 26 | 17.6 | 2 | where she stood at wind-up start | none |  | 1.8 | 1.20 (23) |
| otter | adult | team | lob | 0.70 | lob, 0.6 s up | 29 | 9.6 | 2 | where she stood at wind-up start | none |  | 1.8 | 1.30 (25) |
| lynx | young | pack | bolt | 0.35 | 35.2 m/s | 24 | 8.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| lynx | adult | pack | bolt fan×2 | 0.35 | 44 m/s | 29 | 9.6 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.57 (11) |
| raven | young | solo | bolt fan×2 | 0.80 | 26 m/s | 67 | 25.2 | 2.6 | her place at wind-up start | none | curve | 0.6 | 1.77 (34) |
| raven | young | pack | bolt | 0.35 | 44.8 m/s | 73 | 24.5 | 2.4 | at release, leads ×1 | none |  | 0.7 | 0.90 (17) |
| raven | adult | solo | bolt fan×3 | 0.80 | 26 m/s | 74 | 27.7 | 2.6 | her place at wind-up start | none | curve | 0.72 | 1.87 (36) |
| raven | adult | pack | bolt fan×2 | 0.35 | 64 m/s | 86 | 28.8 | 2.8 | at release, leads ×1 | none |  | 0.8 | 0.80 (15) |
| ram | young | pack | bolt | 0.35 | 35.2 m/s | 24 | 8.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| ram | adult | pack | bolt | 0.35 | 44 m/s | 29 | 9.6 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.57 (11) |
| salamander | young | solo | beam | 0.80 | beam | 17 | 11.2 | 3 | her place at wind-up start | none |  | 1.5 wide | 0.80 (15) |
| salamander | adult | solo | beam | 0.80 | beam | 18 | 12.3 | 3 | her place at wind-up start | none |  | 1.8 wide | 0.80 (15) |
| meerkat | young | solo | bolt burst×3 | 0.60 | 26 m/s | 48 | 16.0 | 2.2 | her place at wind-up start | none | arc | 0.5 | 1.22 (23) |
| meerkat | young | team | bolt burst×3 | 0.91 | 26 m/s | 20 | 6.8 | 2.2 | her place at wind-up start | none | arc | 0.5 | 1.18 (23) |
| meerkat | adult | solo | bolt burst×4 | 0.60 | 26 m/s | 53 | 17.6 | 2.2 | her place at wind-up start | none | arc | 0.6 | 1.28 (25) |
| meerkat | adult | team | bolt burst×4 | 0.70 | 26 m/s | 24 | 8.0 | 2.2 | her place at wind-up start | none | arc | 0.6 | 1.01 (19) |
| spider | young | solo | bolt | 0.70 | 22 m/s | 48 | 16.0 | 2.6 | her place at wind-up start | none |  | 0.8 | 1.43 (28) |
| spider | young | pack | bolt | 0.35 | 44.8 m/s | 45 | 15.0 | 2.2 | at release, leads ×1 | none |  | 0.7 | 0.69 (13) |
| spider | adult | solo | bolt | 0.70 | 22 m/s | 53 | 17.6 | 2.6 | her place at wind-up start | none |  | 0.96 | 1.50 (29) |
| spider | adult | pack | bolt | 0.35 | 60 m/s | 53 | 17.6 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.65 (13) |
| arcticfox | young | solo | bolt | 0.70 | 24 m/s | 29 | 14.4 | 2.4 | her place at wind-up start | none |  | 0.6 | 1.31 (25) |
| arcticfox | young | team | bolt | 0.91 | 24 m/s | 16 | 8.2 | 2.4 | her place at wind-up start | none |  | 0.6 | 1.25 (24) |
| arcticfox | adult | solo | bolt | 0.70 | 24 m/s | 32 | 15.8 | 2.4 | her place at wind-up start | none |  | 0.72 | 1.37 (26) |
| arcticfox | adult | team | bolt | 0.70 | 24 m/s | 19 | 9.6 | 2.4 | her place at wind-up start | none |  | 0.72 | 1.11 (21) |
| penguin | young | solo | runner | 0.70 | 18 decel→6 m/s | 22 | 11.2 | 2.6 | her place at wind-up start | none |  | 0.9 | 1.58 (30) |
| penguin | young | team | runner | 0.91 | 18 decel→6 m/s | 17 | 6.8 | 2.6 | her place at wind-up start | none |  | 0.9 | 1.35 (26) |
| penguin | adult | solo | runner | 0.70 | 18 decel→6 m/s | 23 | 12.3 | 2.6 | her place at wind-up start | none |  | 1.08 | 1.75 (34) |
| penguin | adult | team | runner | 0.70 | 18 decel→6 m/s | 18 | 8.0 | 2.6 | her place at wind-up start | none |  | 1.08 | 1.24 (24) |
| flyingsquirrel | young | solo | lob | 0.70 | lob, 1 s up | 26 | 17.6 | 2.6 | where she stood at wind-up start | none |  | 1.5 | 1.70 (33) |
| flyingsquirrel | young | team | lob | 0.91 | lob, 1 s up | 24 | 8.2 | 2.6 | where she stood at wind-up start | none |  | 1.5 | 1.91 (37) |
| flyingsquirrel | adult | solo | lob | 0.70 | lob, 1 s up | 29 | 19.4 | 2.6 | where she stood at wind-up start | none |  | 1.8 | 1.70 (33) |
| flyingsquirrel | adult | team | lob | 0.70 | lob, 1 s up | 29 | 9.6 | 2.6 | where she stood at wind-up start | none |  | 1.8 | 1.70 (33) |
| roe | young | solo | area | 0.80 | none (ground) | 14 | 9.6 | 2.6 | where she stood at wind-up start | none |  | r 1.6 | 0.80 (15) |
| roe | young | team | area | 0.91 | none (ground) | 24 | 8.2 | 2.6 | where she stood at wind-up start | none |  | r 1.6 | 0.91 (18) |
| roe | adult | solo | area | 0.80 | none (ground) | 16 | 10.6 | 2.6 | where she stood at wind-up start | none |  | r 1.92 | 0.80 (15) |
| roe | adult | team | area | 0.80 | none (ground) | 29 | 9.6 | 2.6 | where she stood at wind-up start | none |  | r 1.92 | 0.80 (15) |
| cheetah | young | solo | runner | 0.60 | 10 accel→34 m/s | 43 | 14.4 | 2.2 | her place at wind-up start | none |  | 1 | 1.24 (24) |
| cheetah | young | team | runner | 0.91 | 10 accel→34 m/s | 24 | 8.2 | 2.2 | her place at wind-up start | none |  | 1 | 1.35 (26) |
| cheetah | adult | solo | runner | 0.60 | 10 accel→34 m/s | 48 | 15.8 | 2.2 | her place at wind-up start | none |  | 1.2 | 1.28 (25) |
| cheetah | adult | team | runner | 0.70 | 10 accel→34 m/s | 29 | 9.6 | 2.2 | her place at wind-up start | none |  | 1.2 | 1.19 (23) |
| lion | young | pack | bolt | 0.35 | 35.2 m/s | 24 | 8.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.58 (11) |
| lion | adult | pack | bolt | 0.35 | 44 m/s | 29 | 9.6 | 2.6 | at release, leads ×1 | none |  | 0.9 | 0.57 (11) |
| jaguar | young | solo | area | 0.90 | none (ground) | 17 | 11.2 | 2.4 | where she stood at wind-up start | none |  | r 2.5 | 0.90 (17) |
| jaguar | young | team | area | 0.91 | none (ground) | 24 | 8.2 | 2.4 | where she stood at wind-up start | none |  | r 2.5 | 0.91 (18) |
| jaguar | adult | solo | area | 0.90 | none (ground) | 18 | 12.3 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.90 (17) |
| jaguar | adult | team | area | 0.90 | none (ground) | 29 | 9.6 | 2.4 | where she stood at wind-up start | none |  | r 3 | 0.90 (17) |
| tiger | young | solo | bolt fan×3 | 0.75 | 32 m/s | 17 | 5.6 | 2.2 | her place at wind-up start | none |  | 0.8 | 0.93 (18) |
| tiger | young | team | bolt fan×3 | 0.91 | 32 m/s | 24 | 8.2 | 2.2 | her place at wind-up start | none |  | 0.8 | 1.17 (22) |
| tiger | adult | solo | bolt fan×4 | 0.75 | 32 m/s | 18 | 6.2 | 2.2 | her place at wind-up start | none |  | 0.96 | 0.95 (18) |
| tiger | adult | team | bolt fan×4 | 0.75 | 32 m/s | 29 | 9.6 | 2.2 | her place at wind-up start | none |  | 0.96 | 1.05 (20) |
| crocodile | young | pack | bolt | 0.35 | 35.2 m/s | 29 | 9.5 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.63 (12) |
| crocodile | adult | pack | bolt | 0.35 | 44 m/s | 34 | 11.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.61 (12) |
| dragonfly | young | solo | bolt | 0.70 | 30 m/s | 53 | 17.6 | 2.4 | her place at wind-up start | none | wave | 0.5 | 1.29 (25) |
| dragonfly | young | team | bolt | 0.91 | 30 m/s | 20 | 6.8 | 2.4 | her place at wind-up start | none | wave | 0.5 | 1.14 (22) |
| dragonfly | adult | solo | bolt | 0.70 | 30 m/s | 58 | 19.4 | 2.4 | her place at wind-up start | none | wave | 0.6 | 1.35 (26) |
| dragonfly | adult | team | bolt | 0.70 | 30 m/s | 24 | 8.0 | 2.4 | her place at wind-up start | none | wave | 0.6 | 0.97 (19) |
| ibex | young | pack | bolt | 0.35 | 35.2 m/s | 29 | 9.5 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.63 (12) |
| ibex | adult | pack | bolt | 0.35 | 44 m/s | 34 | 11.2 | 2.6 | at release, leads ×1 | none |  | 0.6 | 0.61 (12) |
| redpanda | young | solo | bolt | 0.70 | 18 m/s | 43 | 14.4 | 2.4 | her place at wind-up start | none | boomerang+wave | 0.6 | 1.50 (29) |
| redpanda | young | team | bolt | 0.91 | 18 m/s | 20 | 6.8 | 2.4 | her place at wind-up start | none | boomerang+wave | 0.6 | 1.29 (25) |
| redpanda | adult | solo | bolt | 0.70 | 18 m/s | 48 | 15.8 | 2.4 | her place at wind-up start | none | boomerang+wave | 0.72 | 1.58 (30) |
| redpanda | adult | team | bolt | 0.70 | 18 m/s | 24 | 8.0 | 2.4 | her place at wind-up start | none | boomerang+wave | 0.72 | 1.15 (22) |
| beetle | young | solo | mine | 0.70 | mine | 19 | 12.8 | 3 | her place at wind-up start | none |  | 0.6 | 0.70 (13) |
| beetle | adult | solo | mine | 0.70 | mine | 21 | 14.1 | 3 | her place at wind-up start | none |  | 0.6 | 0.70 (13) |
| woodlouse | young | solo | runner | 0.80 | 16 stopGo m/s | 25 | 12.8 | 2.6 | her place at wind-up start | none |  | 1 | 2.07 (40) |
| woodlouse | adult | solo | runner | 0.80 | 16 stopGo m/s | 25 | 14.1 | 2.6 | her place at wind-up start | none |  | 1.2 | 2.14 (41) |
| armadillo | young | solo | runner | 0.80 | 16 m/s | 43 | 14.4 | 2.6 | her place at wind-up start | none |  | 1 | 1.71 (33) |
| armadillo | adult | solo | runner | 0.80 | 16 m/s | 48 | 15.8 | 2.6 | her place at wind-up start | none |  | 1.2 | 1.79 (34) |
| rattlesnake | young | solo | mine fan×2 | 0.70 | mine | 19 | 12.8 | 3 | her place at wind-up start | none |  | 0.6 | 0.70 (13) |
| rattlesnake | young | team | mine fan×2 | 0.91 | mine | 24 | 8.2 | 3 | her place at wind-up start | none |  | 0.6 | 0.91 (18) |
| rattlesnake | adult | solo | mine fan×3 | 0.70 | mine | 21 | 14.1 | 3 | her place at wind-up start | none |  | 0.6 | 0.70 (13) |
| rattlesnake | adult | team | mine fan×3 | 0.70 | mine | 29 | 9.6 | 3 | her place at wind-up start | none |  | 0.6 | 0.70 (13) |
| griffin | young | solo | lob | 0.90 | lob, 1.2 s up | 31 | 20.8 | 3.2 | where she stood at wind-up start | none |  | 3 | 2.10 (40) |
| griffin | young | team | lob | 0.91 | lob, 1.2 s up | 37 | 12.2 | 3.2 | where she stood at wind-up start | none |  | 3 | 2.11 (41) |
| griffin | adult | solo | lob | 0.90 | lob, 1.2 s up | 34 | 22.9 | 3.2 | where she stood at wind-up start | none |  | 3.6 | 2.10 (40) |
| griffin | adult | team | lob | 0.90 | lob, 1.2 s up | 43 | 14.4 | 3.2 | where she stood at wind-up start | none |  | 3.6 | 2.10 (40) |
| scorpion | young | solo | bolt | 0.80 | 26 m/s | 43 | 14.4 | 3 | her place at wind-up start | none |  | 0.6 | 1.36 (26) |
| scorpion | young | team | bolt | 0.91 | 26 m/s | 20 | 6.8 | 3 | her place at wind-up start | none |  | 0.6 | 1.18 (23) |
| scorpion | adult | solo | bolt | 0.80 | 26 m/s | 48 | 15.8 | 3 | her place at wind-up start | none |  | 0.72 | 1.42 (27) |
| scorpion | adult | team | bolt | 0.80 | 26 m/s | 24 | 8.0 | 3 | her place at wind-up start | none |  | 0.72 | 1.11 (21) |
| polarbear | young | solo | area | 1.00 | none (ground) | 26 | 17.6 | 3.6 | where she stood at wind-up start | none |  | r 1.8 | 1.00 (19) |
| polarbear | adult | solo | area | 1.00 | none (ground) | 29 | 19.4 | 3.6 | where she stood at wind-up start | none |  | r 2.16 | 1.00 (19) |
| unicorn | young | solo | beam | 0.80 | beam | 26 | 17.6 | 3.4 | her place at wind-up start | none |  | 1 wide | 0.80 (15) |
| unicorn | young | team | beam | 0.91 | beam | 33 | 10.9 | 3.4 | her place at wind-up start | none |  | 1 wide | 0.91 (18) |
| unicorn | adult | solo | beam | 0.80 | beam | 29 | 19.4 | 3.4 | her place at wind-up start | none |  | 1 wide | 0.80 (15) |
| unicorn | adult | team | beam | 0.80 | beam | 38 | 12.8 | 3.4 | her place at wind-up start | none |  | 1 wide | 0.80 (15) |
| rhino | young | solo | runner wall×3 | 0.90 | 8 accel→24 m/s | 43 | 14.4 | 3.2 | her place at wind-up start | none |  | 1.2 | 1.77 (34) |
| rhino | young | team | runner wall×3 | 0.91 | 8 accel→24 m/s | 20 | 6.8 | 3.2 | her place at wind-up start | none |  | 1.2 | 1.44 (28) |
| rhino | adult | solo | runner wall×4 | 0.90 | 8 accel→24 m/s | 48 | 15.8 | 3.2 | her place at wind-up start | none |  | 1.44 | 1.83 (35) |
| rhino | adult | team | runner wall×4 | 0.90 | 8 accel→24 m/s | 24 | 8.0 | 3.2 | her place at wind-up start | none |  | 1.44 | 1.48 (29) |
| sphinx | young | solo | beam | 0.80 | beam | 26 | 17.6 | 3.6 | her place at wind-up start | none |  | 1.5 wide | 1.40 (27) |
| sphinx | young | team | beam | 0.91 | beam | 29 | 9.5 | 3.6 | her place at wind-up start | none |  | 1.5 wide | 1.51 (29) |
| sphinx | adult | solo | beam | 0.80 | beam | 29 | 19.4 | 3.6 | her place at wind-up start | none |  | 1.8 wide | 1.40 (27) |
| sphinx | adult | team | beam | 0.80 | beam | 34 | 11.2 | 3.6 | her place at wind-up start | none |  | 1.8 wide | 1.40 (27) |
| featheredserpent | young | solo | bolt ring×6 | 0.90 | 14 m/s | 42 | 14.4 | 3.2 | her place at wind-up start | none | spiral | 0.6 | 1.93 (37) |
| featheredserpent | young | pack | bolt | 0.35 | 44.8 m/s | 49 | 16.3 | 2.2 | at release, leads ×1 | none |  | 0.7 | 0.72 (14) |
| featheredserpent | adult | solo | bolt ring×7 | 0.90 | 14 m/s | 42 | 15.8 | 3.2 | her place at wind-up start | none | spiral | 0.72 | 2.03 (39) |
| featheredserpent | adult | pack | bolt fan×2 | 0.35 | 56 m/s | 58 | 19.2 | 2.4 | at release, leads ×1 | none |  | 0.7 | 0.70 (13) |
| hydra | young | solo | bolt fan×3 | 0.90 | 16 m/s | 48 | 16.0 | 3.2 | her place at wind-up start | turns 40°/s after 0.4 s |  | 0.6 | 1.91 (37) |
| hydra | young | team | bolt fan×3 | 0.91 | 16 m/s | 33 | 10.9 | 3.2 | her place at wind-up start | turns 40°/s after 0.4 s |  | 0.6 | 1.59 (31) |
| hydra | adult | solo | bolt fan×4 | 0.90 | 16 m/s | 53 | 17.6 | 3.2 | her place at wind-up start | turns 40°/s after 0.4 s |  | 0.72 | 2.01 (39) |
| hydra | adult | team | bolt fan×4 | 0.90 | 16 m/s | 38 | 12.8 | 3.2 | her place at wind-up start | turns 40°/s after 0.4 s |  | 0.72 | 1.71 (33) |
| frostwyrm | young | solo | beam | 0.90 | beam | 24 | 16.0 | 3.6 | her place at wind-up start | none |  | 2 wide | 1.30 (25) |
| frostwyrm | adult | solo | beam | 0.90 | beam | 26 | 17.6 | 3.6 | her place at wind-up start | none |  | 2.4 wide | 1.30 (25) |
| snowleopard | young | solo | area | 0.80 | none (ground) | 22 | 14.4 | 3 | where she stood at wind-up start | none |  | r 1.6 | 0.80 (15) |
| snowleopard | young | team | area | 0.91 | none (ground) | 29 | 9.5 | 3 | where she stood at wind-up start | none |  | r 1.6 | 0.91 (18) |
| snowleopard | adult | solo | area | 0.80 | none (ground) | 24 | 15.8 | 3 | where she stood at wind-up start | none |  | r 1.92 | 0.80 (15) |
| snowleopard | adult | team | area | 0.80 | none (ground) | 34 | 11.2 | 3 | where she stood at wind-up start | none |  | r 1.92 | 0.80 (15) |
| komodo | young | solo | bolt | 0.80 | 20 m/s | 38 | 12.8 | 3 | her place at wind-up start | none | wave | 0.7 | 1.44 (28) |
| komodo | young | team | bolt | 0.91 | 20 m/s | 29 | 9.5 | 3 | her place at wind-up start | none | wave | 0.7 | 1.39 (27) |
| komodo | adult | solo | bolt | 0.80 | 20 m/s | 42 | 14.1 | 3 | her place at wind-up start | none | wave | 0.84 | 1.51 (29) |
| komodo | adult | team | bolt | 0.80 | 20 m/s | 34 | 11.2 | 3 | her place at wind-up start | none | wave | 0.84 | 1.37 (26) |
| stegosaurus | young | solo | bolt spray×8 | 0.90 | 20 m/s | 24 | 8.0 | 3.4 | her place at wind-up start | none |  | 0.7 | 1.30 (25) |
| stegosaurus | young | team | bolt spray×8 | 0.91 | 20 m/s | 20 | 6.8 | 3.4 | her place at wind-up start | none |  | 0.7 | 1.25 (24) |
| stegosaurus | adult | solo | bolt spray×9 | 0.90 | 20 m/s | 26 | 8.8 | 3.4 | her place at wind-up start | none |  | 0.84 | 1.34 (26) |
| stegosaurus | adult | team | bolt spray×9 | 0.90 | 20 m/s | 24 | 8.0 | 3.4 | her place at wind-up start | none |  | 0.84 | 1.30 (25) |
