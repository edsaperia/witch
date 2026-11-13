# Ranged attacks: the real-rules check, before and after (#1995)

Ed's choice (2026-11-12): option C, every rule for every creature: aim ahead of her, locking before release; a speed floor of 2x her ground speed; the sub-rules and the three fixes; treetops untouchable. The engine harness's tables are in [AFTER-harness.md](AFTER-harness.md); the measurements that led to the decision are in [REPORT-before.md](REPORT-before.md).

**How it was measured.** `node tools/balance/rangedreal.mjs --all --jobs 4 --seeds 3 --time 60` (2026-11-12, about 15 min on 4 cores). It runs the whole game through `stepGame`: one or three of a kind placed 25–33 m from her in a wild area, a bot moving her for 60 s, 3 seeds a cell. "Before" is `--ranged old`, which sets `ranged.on` to false. Shots counted are the ones aimed at her: species casts, plus every bolt of the old pack bolts (stoat, hare, badger). Hits come from `observeAttacks`. Each cell is hit % (hits/shots). The raw per-kind runs are the `real-{new,old}-*.md` files here; `--table` rebuilds `real.md` from them.

Things to keep in mind when reading it:
- "across" here means across the line to the nearest caster, so at close range she circles it. That is harder to hit than the harness's straight line.
- Counts are small (3–126 shots a cell). Cells under about 15 shots are a hint, not a rate.
- A three-shot cell like "7/7" or "3/3" usually means one or two casts.

| kind | level | group | before still | before across | before away | before zig-zag | after still | after across | after away | after zig-zag |
|---|---|---|---|---|---|---|---|---|---|---|
| dormouse | young | alone | 11% (3/27) | 0% (0/27) | 0% (0/12) | 0% (0/27) | 100% (27/27) | 11% (3/27) | 0% (0/12) | 22% (6/27) |
| dormouse | young | three | 41% (29/70) | 0% (0/66) | 0% (0/46) | 0% (0/66) | 100% (72/72) | 14% (10/72) | 7% (3/42) | 16% (11/69) |
| dormouse | adult | alone | 60% (18/30) | 0% (0/27) | 0% (0/12) | 0% (0/27) | 100% (30/30) | 62% (18/29) | 33% (4/12) | 25% (6/24) |
| dormouse | adult | three | 42% (28/67) | 3% (2/68) | 2% (1/46) | 13% (9/68) | 100% (68/68) | 33% (22/66) | 11% (6/54) | 22% (15/68) |
| fox | young | alone | 13% (3/24) | 0% (0/24) | 0% (0/18) | 0% (0/27) | 96% (24/25) | 25% (6/24) | 33% (6/18) | 26% (7/27) |
| fox | young | three | 22% (10/46) | 0% (0/39) | 0% (0/36) | 6% (3/47) | 100% (47/47) | 12% (6/51) | 11% (4/36) | 26% (11/43) |
| fox | adult | alone | 0% (0/24) | 0% (0/24) | 0% (0/18) | 0% (0/27) | 100% (24/24) | 44% (11/25) | 29% (6/21) | 13% (3/24) |
| fox | adult | three | 16% (8/49) | 7% (3/42) | 0% (0/48) | 0% (0/51) | 100% (49/49) | 29% (12/41) | 15% (6/39) | 6% (3/48) |
| marten | young | alone | 100% (24/24) | 0% (0/24) | 0% (0/18) | 0% (0/24) | 100% (24/24) | 43% (10/23) | 22% (4/18) | 13% (3/24) |
| marten | young | three | 98% (39/40) | 3% (1/40) | 0% (0/33) | 7% (3/42) | 100% (38/38) | 10% (4/40) | 0% (0/34) | 26% (10/39) |
| marten | adult | alone | 100% (21/21) | 5% (1/21) | 17% (3/18) | 0% (0/21) | 100% (21/21) | 95% (20/21) | 33% (6/18) | 57% (12/21) |
| marten | adult | three | 100% (43/43) | 6% (2/36) | 23% (8/35) | 12% (5/43) | 100% (47/47) | 14% (5/37) | 20% (7/35) | 33% (16/49) |
| squirrel | young | alone | 100% (24/24) | 0% (0/22) | 0% (0/17) | 0% (0/24) | 100% (24/24) | 17% (4/24) | 0% (0/17) | 0% (0/24) |
| squirrel | young | three | 97% (70/72) | 3% (2/72) | 2% (1/65) | 3% (2/69) | 99% (71/72) | 0% (0/72) | 13% (8/63) | 1% (1/69) |
| squirrel | adult | alone | 100% (24/24) | 0% (0/24) | 0% (0/21) | 0% (0/24) | 100% (24/24) | 38% (9/24) | 14% (3/21) | 13% (3/24) |
| squirrel | adult | three | 96% (72/75) | 0% (0/75) | 6% (4/66) | 0% (0/78) | 99% (73/74) | 3% (2/73) | 10% (7/68) | 0% (0/74) |
| mole | young | alone | 100% (15/15) | 0% (0/18) | 0% (0/15) | 0% (0/15) | 100% (15/15) | 0% (0/17) | 50% (6/12) | 0% (0/15) |
| mole | young | three | 100% (52/52) | 7% (3/43) | 29% (8/28) | 3% (1/40) | 100% (49/49) | 11% (5/46) | 17% (6/36) | 12% (5/43) |
| mole | adult | alone | 100% (15/15) | 22% (2/9) | 0% (0/9) | 0% (0/18) | 100% (15/15) | 0% (0/15) | 75% (9/12) | 20% (3/15) |
| mole | adult | three | 100% (39/39) | 7% (3/41) | 11% (3/28) | 5% (2/37) | 100% (41/41) | 15% (6/40) | 7% (2/27) | 8% (3/36) |
| hedgehog | young | alone | – (0) | 67% (4/6) | – (0) | 100% (3/3) | – (0) | 100% (6/6) | – (0) | 100% (3/3) |
| hedgehog | young | three | 100% (3/3) | 13% (2/15) | 0% (0/3) | 57% (8/14) | 100% (3/3) | 0% (0/15) | 0% (0/3) | 11% (1/9) |
| hedgehog | adult | alone | – (0) | 0% (0/6) | – (0) | 0% (0/3) | – (0) | 100% (6/6) | – (0) | 0% (0/3) |
| hedgehog | adult | three | 100% (6/6) | 10% (1/10) | 20% (1/5) | 25% (3/12) | 100% (8/8) | 69% (11/16) | 60% (3/5) | 17% (2/12) |
| stoat | young | alone | 100% (24/24) | 100% (24/24) | 47% (7/15) | 79% (19/24) | 100% (24/24) | 0% (0/24) | 20% (3/15) | 13% (3/24) |
| stoat | young | three | 100% (67/67) | 71% (47/66) | 52% (28/54) | 61% (42/69) | 100% (66/66) | 21% (14/67) | 17% (8/47) | 10% (7/73) |
| stoat | adult | alone | 100% (48/48) | 67% (31/46) | 30% (9/30) | 81% (39/48) | 50% (27/54) | 6% (3/48) | 50% (15/30) | 0% (0/48) |
| stoat | adult | three | 79% (100/126) | 55% (66/120) | 44% (43/98) | 48% (57/118) | 48% (58/120) | 12% (14/116) | 14% (12/86) | 5% (6/126) |
| hare | young | alone | 100% (19/19) | 95% (18/19) | 33% (3/9) | 50% (9/18) | 100% (19/19) | 14% (3/21) | 0% (0/9) | 20% (3/15) |
| hare | young | three | 100% (60/60) | 54% (32/59) | 12% (6/51) | 44% (26/59) | 95% (59/62) | 14% (9/65) | 25% (12/48) | 17% (10/60) |
| hare | adult | alone | 100% (21/21) | 89% (17/19) | 33% (6/18) | 57% (12/21) | 100% (21/21) | 14% (3/21) | 33% (3/9) | 33% (6/18) |
| hare | adult | three | 100% (51/51) | 61% (34/56) | 24% (11/46) | 47% (26/55) | 100% (51/51) | 30% (17/57) | 21% (9/42) | 29% (16/56) |
| badger | young | alone | 100% (9/9) | 100% (6/6) | 0% (0/3) | 100% (6/6) | 100% (7/7) | 100% (6/6) | 0% (0/3) | 50% (3/6) |
| badger | young | three | 100% (13/13) | 0% (0/3) | 100% (3/3) | 45% (5/11) | 94% (15/16) | 0% (0/6) | 0% (0/3) | 0% (0/12) |
| badger | adult | alone | 100% (9/9) | 100% (6/6) | 0% (0/6) | 100% (9/9) | 100% (6/6) | 50% (4/8) | 0% (0/6) | 33% (3/9) |
| badger | adult | three | 100% (14/14) | 0% (0/9) | 0% (0/6) | 27% (3/11) | 100% (13/13) | 0% (0/9) | 50% (3/6) | 0% (0/9) |
| dragonfly | young | alone | 67% (12/18) | 0% (0/3) | – (0) | 0% (0/15) | 100% (18/18) | 0% (0/3) | – (0) | 60% (9/15) |
| dragonfly | young | three | 9% (3/33) | 0% (0/28) | 0% (0/17) | 4% (1/28) | 100% (33/33) | 0% (0/28) | 0% (0/17) | 12% (4/34) |
| dragonfly | adult | alone | 0% (0/15) | 0% (0/3) | – (0) | 0% (0/18) | 100% (18/18) | 0% (0/3) | – (0) | 38% (6/16) |
| dragonfly | adult | three | 40% (12/30) | 0% (0/26) | 17% (3/18) | 4% (1/26) | 100% (28/28) | 33% (9/27) | 22% (5/23) | 4% (1/26) |
| rhino | young | alone | 0% (0/18) | – (0) | 0% (0/6) | 20% (3/15) | 100% (18/18) | – (0) | 0% (0/6) | 50% (6/12) |
| rhino | young | three | 50% (12/24) | 20% (3/15) | 0% (0/15) | 0% (0/27) | 100% (15/15) | 43% (9/21) | 25% (3/12) | 62% (13/21) |
| rhino | adult | alone | 17% (3/18) | – (0) | 0% (0/12) | 33% (3/9) | 100% (18/18) | – (0) | 25% (3/12) | 67% (6/9) |
| rhino | adult | three | 74% (14/19) | 0% (0/18) | 40% (6/15) | 29% (6/21) | 100% (22/22) | 17% (3/18) | 40% (6/15) | 75% (9/12) |
| heron | young | alone | 17% (3/18) | 0% (0/18) | 0% (0/12) | 0% (0/15) | 100% (18/18) | 33% (6/18) | 25% (3/12) | 38% (6/16) |
| heron | young | three | 38% (15/39) | 0% (0/36) | 0% (0/27) | 0% (0/36) | 100% (42/42) | 14% (5/37) | 0% (0/24) | 3% (1/34) |
| heron | adult | alone | 17% (3/18) | 0% (0/6) | 0% (0/12) | 0% (0/18) | 100% (18/18) | 61% (11/18) | 50% (6/12) | 32% (6/19) |
| heron | adult | three | 34% (11/32) | 9% (3/34) | 0% (0/31) | 6% (2/33) | 97% (30/31) | 36% (10/28) | 19% (5/27) | 14% (5/36) |
| hydra | young | alone | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) |
| hydra | young | three | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) |
| hydra | adult | alone | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) | – (0) |
| hydra | adult | three | 95% (35/37) | 33% (7/21) | 11% (3/27) | 21% (7/33) | 97% (34/35) | 39% (9/23) | 18% (4/22) | 25% (8/32) |
| tiger | young | alone | 75% (9/12) | – (0) | 0% (0/6) | 50% (3/6) | 100% (12/12) | – (0) | 0% (0/6) | 0% (0/8) |
| tiger | young | three | – (0) | 20% (3/15) | – (0) | 0% (0/15) | – (0) | 47% (9/19) | – (0) | 0% (0/15) |
| tiger | adult | alone | 33% (3/9) | – (0) | 0% (0/9) | 0% (0/9) | 100% (9/9) | – (0) | 0% (0/9) | 67% (6/9) |
| tiger | adult | three | – (0) | 0% (0/6) | 0% (0/3) | 0% (0/19) | – (0) | 0% (0/6) | 0% (0/3) | 41% (7/17) |
| cat | young | alone | 100% (12/12) | 0% (0/15) | 30% (3/10) | 0% (0/15) | 100% (12/12) | 100% (15/15) | 0% (0/12) | 53% (8/15) |
| cat | young | three | 61% (20/33) | 0% (0/37) | 0% (0/24) | 3% (1/35) | 100% (36/36) | 47% (16/34) | 4% (1/25) | 37% (13/35) |
| cat | adult | alone | 40% (6/15) | 0% (0/18) | 0% (0/12) | 6% (1/18) | 100% (15/15) | 100% (18/18) | 25% (3/12) | 50% (9/18) |
| cat | adult | three | 74% (29/39) | 13% (5/38) | 13% (4/30) | 22% (9/41) | 100% (39/39) | 66% (25/38) | 21% (6/29) | 49% (20/41) |
| fox | legend | alone | 100% (7/7) | 0% (0/7) | 100% (7/7) | 0% (0/7) | 100% (7/7) | 0% (0/7) | 57% (4/7) | 0% (0/7) |
| tiger | legend | alone | 100% (7/7) | 0% (0/7) | 100% (7/7) | 0% (0/7) | 100% (7/7) | 0% (0/7) | 14% (1/7) | 0% (0/7) |


## What looks unfair, or worth Ed's eye

Thresholds: zig-zag above about 60%, or a standing target below about 80%, for an aimed shot.

1. **Stoat adult, standing still: 100% to 50% (alone), 79% to 48% (three).** This isn't the lead; it's the even-fan fix. The adult stoat fires a volley of 2 old pack bolts, and each carries half the volley's damage (`src/rules/combat/packs.ts`, damage ÷ shots). Before, the two bolts straddled the aim, and from about 9 m both hit a standing witch. Now one flies on the aim and the other a full spread to the side and misses. Every volley still hits, but it does half the damage. Knobs: the stoat's pack `spread` (`config/packs`), or leaving old pack fans out of the centring (the `RG.on` argument to `fanOffsets` in `src/rules/combat.ts`). Defaults not changed.
2. **Rhino zig-zag 62–75%** (young three 13/21, adult alone 6/9, adult three 9/12). The harness gave 34–52%. Its log walls are wide, so a one-second zig-zag doesn't clear them, but the counts are small. Knobs: `ranged.rollerLead` (0.5 now; lower aims the wall less far ahead), or the rhino wall's log count and spacing.
3. **Tiger adult alone zig-zag 67% (6/9).** This matches the harness's 63%. The tiger adult team is 41% (7/17) here, against 64% in the harness. The cat adult is 49–50% here, against 54–64% in the harness. Knobs: `ranged.lock.adult` (0.6 s now; longer gives her more warning), or a narrower 4-shot fan for these kinds.
4. **The harness's other flags didn't reproduce in the real game.**
   - Stoat adult zig-zag: 0–5% here, against 65% in the harness.
   - Hydra adult team, standing: already 95% before and 97% after here. The harness's 24% before was harness-only.
5. **The old pack bolts got much easier to dodge on the move.** Stoat young across went from 100% to 0%, and zig-zag from 79% to 13%. Hare adult across went from 89% to 14%. The report called these the harshest ranged attacks, so this is probably wanted, but it's the biggest change in feel.
6. **Every aimed shot hits a standing witch now: 94–100% in every cell with shots,** apart from the stoat adult (point 1). Before, the dormouse hit 11–60%, the fox 0–22%, and the dragonfly, rhino, heron, tiger and cat 0–100% (mostly below 75%).
7. **Moving, the home youths now land some hits rather than almost none:** across 0–95%, zig-zag 0–57%. Before, the moving cells were 0–29%, apart from a few hedgehog cells of 3–15 shots.
8. **Legends (7 casts a cell, so treat as a hint):**
   - Standing: still 100%.
   - Zig-zag: still 0%.
   - Walking straight away now dodges more: fox 100% to 57%, tiger 100% to 14%. Their lob shows for 3 s and locks 0.6 s before it lands.
9. **No data for some cells, before or after.**
   - The hydra young (alone and three) and the hydra adult alone cast nothing at her in 60 s × 3 seeds.
   - Three tiger youths or adults fire no shots at a standing witch.
   - These are setup gaps, not results.
10. **Treetops:** not covered by this check (she stays on the ground). The harness has them at 0% in every row, before and after.
