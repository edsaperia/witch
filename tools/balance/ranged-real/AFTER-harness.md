# Creature ranged attacks: before and after the ranged rule (2026-11-12)

PR #1995. Harness: tools/balance/rangedhit.mjs (before: --ranged old). Real-rules check: scratchpad/ranged/real2.mjs, 3 seeds x 60 s (still running when this was written; rerun mk.py to refresh).

## Flags
- harness home: stoat adult pack: zig-zag 65% (caster still)
- harness spread: tiger adult solo: zig-zag 63% (caster still)
- harness spread: tiger adult team: zig-zag 64% (caster still)
- harness spread: cat adult team: zig-zag 64% (caster still)
- harness spread: polarbear young solo: still 60% (caster still)

### Home's kinds

Engine harness, caster still unless the last column says otherwise. Each cell: still / across / away / toward / zig-zag, % of casts that hit. Treetops: 0% in every row, before and after.

| kind | level | path | before | after | after, caster drifting 4 m/s till its lock | aim after |
|---|---|---|---|---|---|---|
| dormouse | young | solo | 100/0/0/100/0 | 100/100/100/100/28 | 100/100/99/100/30 | followed, lead x1 |
| dormouse | young | team | 100/0/0/0/0 | 100/0/0/100/24 | 100/30/0/100/23 | followed, lead x1 |
| dormouse | adult | solo | 100/0/0/100/0 | 100/100/100/100/38 | 100/100/100/100/38 | followed, lead x1 |
| dormouse | adult | team | 100/0/0/0/0 | 100/100/0/100/43 | 100/100/9/100/44 | followed, lead x1 |
| every legend (dormouse's row) | legend | solo | 100/0/0/0/0 | 100/100/100/100/2 | 100/100/100/100/2 | followed, lead x1 |
| fox | young | solo | 0/0/0/98/0 | 100/100/0/100/51 | 100/98/0/100/50 | followed, lead x1 |
| fox | young | team | 11/0/0/0/0 | 100/92/0/100/22 | 100/56/0/100/24 | followed, lead x1 |
| fox | adult | solo | 0/0/0/100/0 | 100/100/12/100/60 | 100/100/10/100/55 | followed, lead x1 |
| fox | adult | team | 0/0/0/36/0 | 100/100/2/100/53 | 100/100/11/100/52 | followed, lead x1 |
| marten | young | solo | 100/0/0/100/5 | 100/100/98/100/23 | 100/100/93/100/26 | followed, lead x1 |
| marten | young | team | 100/0/0/0/0 | 100/0/0/100/24 | 100/30/0/100/23 | followed, lead x1 |
| marten | adult | solo | 100/0/0/100/6 | 100/100/100/100/38 | 100/100/99/100/38 | followed, lead x1 |
| marten | adult | team | 100/0/0/50/10 | 100/100/0/100/43 | 100/100/9/100/44 | followed, lead x1 |
| squirrel | young | solo | 100/0/0/0/0 | 100/100/100/100/4 | 100/100/100/100/4 | followed, lead x1 |
| squirrel | young | team | 100/0/0/0/0 | 100/100/100/100/2 | 100/100/100/100/1 | followed, lead x1 |
| squirrel | adult | solo | 100/0/0/0/0 | 100/100/100/100/4 | 100/100/100/100/4 | followed, lead x1 |
| squirrel | adult | team | 100/0/0/0/0 | 100/100/100/100/1 | 100/100/100/100/2 | followed, lead x1 |
| mole | young | solo | 100/0/0/0/0 | 100/100/100/100/34 | 100/100/100/100/32 | followed, lead x1 |
| mole | young | team | 100/0/0/0/0 | 100/100/100/100/37 | 100/100/100/100/34 | followed, lead x1 |
| mole | adult | solo | 100/0/0/0/0 | 100/100/100/100/37 | 100/100/100/100/34 | followed, lead x1 |
| mole | adult | team | 100/0/0/0/0 | 100/100/100/100/37 | 100/100/100/100/34 | followed, lead x1 |
| hedgehog | young | solo | 100/0/0/0/0 | 100/0/0/100/16 | 100/7/0/100/20 | followed, lead x1 |
| hedgehog | young | team | 100/0/0/0/0 | 100/100/0/100/24 | 100/60/0/100/23 | followed, lead x1 |
| hedgehog | adult | solo | 100/0/0/0/0 | 100/0/0/100/40 | 100/38/0/100/41 | followed, lead x1 |
| hedgehog | adult | team | 100/0/0/0/0 | 100/100/47/100/43 | 100/100/47/100/44 | followed, lead x1 |
| stoat | young | pack | 100/100/100/100/84 | 100/100/100/100/44 | 100/100/100/100/42 | followed, lead x1 |
| stoat | adult | pack | 100/100/0/91/54 | 100/100/100/100/65 | 100/100/100/100/64 | followed, lead x1 |
| hare | young | pack | 100/100/100/100/49 | 100/100/100/100/26 | 100/100/100/100/22 | followed, lead x1 |
| hare | adult | pack | 100/100/100/100/78 | 100/100/100/100/43 | 100/100/100/100/42 | followed, lead x1 |
| badger | young | pack | 100/100/100/100/45 | 100/100/100/100/21 | 100/100/100/100/20 | followed, lead x1 |
| badger | adult | pack | 100/100/100/100/75 | 100/100/100/100/42 | 100/100/100/100/44 | followed, lead x1 |

### The report's representative spread

Engine harness, caster still unless the last column says otherwise. Each cell: still / across / away / toward / zig-zag, % of casts that hit. Treetops: 0% in every row, before and after.

| kind | level | path | before | after | after, caster drifting 4 m/s till its lock | aim after |
|---|---|---|---|---|---|---|
| dragonfly | young | solo | 58/0/0/50/0 | 100/100/99/98/40 | 100/100/94/99/41 | followed, lead x1 |
| dragonfly | young | team | 98/0/0/0/0 | 100/0/0/100/22 | 100/0/0/87/22 | followed, lead x1 |
| dragonfly | adult | solo | 62/0/0/73/0 | 100/100/100/100/38 | 100/100/99/100/42 | followed, lead x1 |
| dragonfly | adult | team | 70/0/0/0/0 | 100/100/0/100/42 | 100/91/0/100/46 | followed, lead x1 |
| rhino | young | solo | 0/0/0/0/0 | 100/45/100/23/34 | 100/38/100/23/33 | followed, lead x0.5 |
| rhino | young | team | 0/0/0/0/0 | 100/0/0/100/24 | 100/1/1/53/22 | followed, lead x0.5 |
| rhino | adult | solo | 100/0/0/43/0 | 100/64/100/46/48 | 100/63/100/56/50 | followed, lead x0.5 |
| rhino | adult | team | 100/0/0/0/0 | 100/46/30/100/52 | 100/51/31/79/54 | followed, lead x0.5 |
| heron | young | solo | 100/0/80/100/0 | 100/100/100/100/36 | 100/100/100/100/37 | followed, lead x1 |
| heron | young | team | 100/0/0/0/0 | 100/100/100/100/32 | 100/100/97/100/35 | followed, lead x1 |
| heron | adult | solo | 100/0/90/100/0 | 100/100/100/100/48 | 100/100/100/100/52 | followed, lead x1 |
| heron | adult | team | 100/0/5/46/0 | 100/100/100/99/51 | 100/100/100/100/54 | followed, lead x1 |
| owl | young | pack | 100/0/0/0/3 | 100/100/100/100/0 | 100/100/100/100/0 | followed, lead x1 |
| owl | young | solo | 100/0/0/100/13 | 100/0/0/100/13 | 100/0/0/23/21 | as before (left out) |
| owl | adult | pack | 100/0/0/0/3 | 100/100/100/100/0 | 100/100/100/100/0 | followed, lead x1 |
| owl | adult | solo | 100/0/0/100/16 | 100/0/0/100/16 | 100/0/0/29/23 | as before (left out) |
| hydra | young | solo | 100/0/0/44/0 | 100/0/0/44/0 | 63/0/0/15/0 | as before (left out) |
| hydra | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 40/0/0/1/0 | as before (left out) |
| hydra | adult | solo | 84/0/0/62/0 | 100/0/0/62/0 | 96/0/0/26/0 | as before (left out) |
| hydra | adult | team | 24/0/0/0/0 | 100/0/0/0/0 | 92/0/0/7/0 | as before (left out) |
| tiger | young | solo | 100/0/0/0/0 | 100/0/0/100/32 | 100/0/0/87/33 | followed, lead x1 |
| tiger | young | team | 100/0/0/0/0 | 100/0/0/100/28 | 100/1/0/100/27 | followed, lead x1 |
| tiger | adult | solo | 48/0/0/0/0 | 100/0/0/100/63 | 100/0/0/100/66 | followed, lead x1 |
| tiger | adult | team | 0/0/0/0/0 | 100/100/0/100/64 | 100/89/0/100/61 | followed, lead x1 |
| cat | young | solo | 100/0/0/0/0 | 100/0/0/100/42 | 100/15/0/100/32 | followed, lead x1 |
| cat | young | team | 100/0/0/0/0 | 100/0/0/100/43 | 100/0/0/99/34 | followed, lead x1 |
| cat | adult | solo | 100/0/0/0/0 | 100/0/0/100/54 | 100/40/0/100/61 | followed, lead x1 |
| cat | adult | team | 28/0/0/0/0 | 100/100/0/100/64 | 100/100/0/100/73 | followed, lead x1 |
| stegosaurus | young | solo | 100/0/0/0/0 | 100/0/0/100/37 | 100/8/0/100/33 | followed, lead x1 |
| stegosaurus | young | team | 100/0/0/0/0 | 100/0/0/100/36 | 100/0/0/88/32 | followed, lead x1 |
| stegosaurus | adult | solo | 100/0/0/0/0 | 100/0/0/100/40 | 100/33/0/100/40 | followed, lead x1 |
| stegosaurus | adult | team | 100/0/0/0/0 | 100/0/0/100/40 | 100/10/0/100/40 | followed, lead x1 |
| fennec | young | solo | 100/0/0/0/0 | 100/0/0/100/20 | 100/0/0/90/25 | followed, lead x1 |
| fennec | young | team | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/6/0 | followed, lead x1 |
| fennec | adult | solo | 100/0/0/0/0 | 100/0/0/100/26 | 100/0/0/97/25 | followed, lead x1 |
| fennec | adult | team | 100/0/0/0/0 | 100/0/0/96/3 | 100/0/0/81/9 | followed, lead x1 |
| jaguar | young | solo | 100/0/0/0/0 | 100/100/100/100/28 | 100/100/100/100/27 | followed, lead x1 |
| jaguar | young | team | 100/0/0/0/0 | 100/100/100/100/30 | 100/100/100/100/29 | followed, lead x1 |
| jaguar | adult | solo | 100/0/0/0/0 | 100/100/100/100/32 | 100/100/100/100/29 | followed, lead x1 |
| jaguar | adult | team | 100/0/0/0/0 | 100/100/100/100/32 | 100/100/100/100/29 | followed, lead x1 |
| polarbear | young | solo | 60/0/0/0/0 | 60/0/0/0/0 | 63/0/0/0/0 | followed, lead x1 |
| polarbear | adult | solo | 80/0/0/0/0 | 80/0/0/0/0 | 79/0/0/0/0 | followed, lead x1 |
| spider | young | pack | 100/100/100/100/66 | 100/100/100/100/28 | 100/100/100/100/30 | followed, lead x1 |
| spider | young | solo | 100/0/0/95/0 | 100/100/0/100/44 | 100/100/9/100/46 | followed, lead x1 |
| spider | adult | pack | 100/100/100/100/90 | 100/100/100/100/58 | 100/100/100/100/55 | followed, lead x1 |
| spider | adult | solo | 100/0/0/100/0 | 100/100/16/100/42 | 100/100/17/100/46 | followed, lead x1 |
| featheredserpent | young | pack | 100/100/100/100/64 | 100/100/100/100/28 | 100/100/100/100/27 | followed, lead x1 |
| featheredserpent | young | solo | 50/0/0/30/0 | 50/0/0/30/0 | 43/0/0/15/0 | as before (left out) |
| featheredserpent | adult | pack | 0/0/0/98/42 | 100/100/100/100/58 | 100/100/100/100/62 | followed, lead x1 |
| featheredserpent | adult | solo | 50/0/0/50/0 | 50/0/0/50/0 | 54/0/0/23/0 | as before (left out) |
| sphinx | young | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/0/0 | as before (left out) |
| sphinx | young | team | 100/0/100/0/0 | 100/0/100/0/0 | 100/0/100/0/0 | as before (left out) |
| sphinx | adult | solo | 100/0/0/0/0 | 100/0/0/0/0 | 100/0/0/1/0 | as before (left out) |
| sphinx | adult | team | 100/0/100/0/0 | 100/0/100/0/0 | 100/0/100/0/0 | as before (left out) |
| beaver | young | solo | 100/0/0/26/0 | 100/0/0/19/0 | 100/0/1/19/2 | followed, lead x0.5 |
| beaver | young | team | 100/0/0/0/0 | 100/0/0/100/14 | 100/0/0/80/14 | followed, lead x0.5 |
| beaver | adult | solo | 100/0/0/17/0 | 100/4/0/43/26 | 100/7/8/40/21 | followed, lead x0.5 |
| beaver | adult | team | 100/0/0/0/0 | 100/0/0/94/30 | 100/19/0/79/30 | followed, lead x0.5 |
| toad | young | pack | 100/0/0/0/2 | 100/100/100/100/1 | 100/100/100/100/1 | followed, lead x1 |
| toad | young | solo | 100/0/0/0/0 | 100/100/100/100/4 | 100/100/100/100/3 | followed, lead x1 |
| toad | adult | pack | 100/0/0/0/5 | 100/100/100/100/1 | 100/100/100/100/1 | followed, lead x1 |
| toad | adult | solo | 100/0/0/0/0 | 100/100/100/100/6 | 100/100/100/100/6 | followed, lead x1 |

### Real-rules check

The whole game through `stepGame`, one or three of a kind 25–33 m from her in a wild area, a bot moving her, 3 seeds x 60 s a cell (the report had 2 x 60). Shots counted are those aimed at her (species casts, and old pack bolts for the stoat, hare and badger); hits from `observeAttacks`. Each cell: hit % (hits/shots). "across" in the real game is across the line to the nearest caster, so at close range it circles the caster.

| kind | level | group | before still | before across | before away | before zig-zag | after still | after across | after away | after zig-zag |
|---|---|---|---|---|---|---|---|---|---|---|
