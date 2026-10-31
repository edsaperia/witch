# Balance baselines — v5655 rules

Initial reporting baseline, 2026-10-29, PR #1463. **No tuning changes. One night seed is a reproducibility check, not an estimate of players' win rates.** The coordinator approved this bounded initial slice instead of holding delivery for the longer 144-case extension.

Rules/build: **v5655**, `318c935cf7dda287edae2d39afa8c40b52022f1e`. The reporting milestone is `e491c4aa3d06ef611bf90270fbc1940f7dddbc15`; later fixture validation records retaliation and explicitly checks that combat is active. Raw manifests record the full checkout commit, schema and SHA-256 source fingerprint. Rules did not change between these measurements. The full-run snapshot retains its original schema 1; the stun batch uses schema 2 with explicit fixture metadata. Do not silently mix future sources or fixture versions.

## Scope and reproduction

- Full runs: **18 cases**, seed **1000**, world 0; home, stoat, stag, raven, tiger and bear (one island from each journey phase 0–5); **100 bpm**; sloppy, crude and skilled. Every bot carries the **Satchel**, no hat, no broom parts. The existing novice policy is labelled sloppy. Common options contain only the bag: this is not a quest/find-hunting study.
- Stuns: **360 cases**, seed **1000**, fox/ibex/boar/raven/frostwyrm, ranks 1/2, **all nine bags**, **100/120/160/200 bpm**. Starting distance 10 m; one target, no allies, stationary witch, protected health, active retaliation, paused waves. The timer starts after any party-spell input hold. These are invitation stuns in an isolated fixture, not ordinary unprotected fights.
- Fixed input step: 1/60 s. Full-run cutoff: **1200 player seconds**; stun cutoff: **30 player seconds**. Table durations are **world seconds**, which can slow in legend circles. A cutoff is **censored**, not a loss or proof that stunning is impossible.
- Raw evidence: [18-run JSONL snapshot](balance-data/v5655-runs-initial.jsonl), [full run/phase tables](balance-data/v5655-runs-initial.md), [360 stun rows](balance-data/v5655-stuns.jsonl), [full per-bpm stun tables](balance-data/v5655-stuns.md). These frozen snapshots are evidence, not resumable output files for a newer checkout. The run snapshot's `snapshotOf` identifies the larger experiment it selects from.

```
node tools/balance/report.mjs runs --seeds 1 --time 1200 --islands home,stoat,stag,raven,tiger,bear --bpms 100 --bots sloppy,crude,skilled --bags satchel --out fresh-runs.jsonl --build v5655
node tools/balance/report.mjs stuns --species fox,ibex,boar,raven,frostwyrm --levels 1,2 --seeds 1 --bags all --bpms 100,120,160,200 --time 30 --out fresh-stuns.jsonl --build v5655
node tools/balance/report.mjs report --out docs/notes/balance-data/v5655-runs-initial.jsonl
```

To reproduce the rules, use the named source commit plus this PR's report tool; a later rules revision is a new experiment. The build label is descriptive; the commit and fingerprint provide exact source provenance. The optional extension uses two seeds (1000, 8919) and four bpms across these islands, **144 cases**; it is not required evidence for this initial slice. The later ~200-seed-per-bot tuning study is not run here. It should select a bounded island/bpm matrix first: every added island, bag and bpm multiplies the work. The runner prints measured per-case time and an updated estimate; no overnight duration is asserted for the entire island matrix.

## Full runs at 100 bpm

Each row has **n = 1**. Won corresponds to 100% of that single observed run; censored corresponds to 0% won **by the cutoff**, not a 0% eventual win chance. No run in this slice ended with the party lost. Discoveries, islands kept, finds on loan and loans eligible to keep were all **zero**; these policies do not establish progression difficulty. App saving/sleep is not simulated.

“Waves reached/passed” counts arrivals and subsequent arrivals, not won sieges. A fast early clear can win after fewer waves. “Ranged %” is actual ranged targeting (wind-ups/casts) divided by conscious ground time, an **observed lower bound**, not all shootable positions or hit probability. Zero does not prove immunity to ranged attacks.

| island | phase | bot | outcome | win seconds | end seconds | waves reached/passed | knockdowns | ranged % |
|---|---|---|---|---|---|---|---|---|
| home | 0 | sloppy | won | 561.13 | 561.13 | 2/1 | 7 | 5.09 |
| home | 0 | crude | won | 297.62 | 297.62 | 1/0 | 1 | 2.59 |
| home | 0 | skilled | won | 309.91 | 309.91 | 1/0 | 0 | 3.06 |
| stoat | 1 | sloppy | won | 578.98 | 578.98 | 3/2 | 7 | 3.39 |
| stoat | 1 | crude | censored | — | 1199.10 | 4/3 | 1 | 0.33 |
| stoat | 1 | skilled | won | 286.03 | 286.03 | 1/0 | 0 | 1.54 |
| stag | 2 | sloppy | censored | — | 1199.10 | 4/3 | 6 | 6.21 |
| stag | 2 | crude | censored | — | 1199.10 | 4/3 | 4 | 4.81 |
| stag | 2 | skilled | censored | — | 1199.10 | 3/2 | 0 | 1.31 |
| raven | 3 | sloppy | censored | — | 1191.00 | 6/5 | 15 | 2.24 |
| raven | 3 | crude | censored | — | 1196.40 | 5/4 | 17 | 1.10 |
| raven | 3 | skilled | censored | — | 1199.10 | 5/4 | 4 | 2.19 |
| tiger | 4 | sloppy | censored | — | 1199.10 | 7/6 | 29 | 12.09 |
| tiger | 4 | crude | censored | — | 1199.10 | 6/5 | 27 | 5.16 |
| tiger | 4 | skilled | censored | — | 1199.10 | 3/2 | 0 | 1.40 |
| bear | 5 | sloppy | censored | — | 1199.10 | 4/3 | 21 | 0.27 |
| bear | 5 | crude | censored | — | 1199.10 | 3/2 | 5 | 0.00 |
| bear | 5 | skilled | censored | — | 1199.17 | 2/1 | 0 | 0.29 |

## Isolated invitation stuns

Cells are **landed hits / world seconds to stun**. `cutoff` means not stunned within 30 player seconds, with landed hits still shown. Each fixture is repeated at the four record bpms; the full per-bpm rows are linked above. Do not infer ordinary solo-combat success from a protected-health fixture.

All 90 matched species/rank/bag fixtures had identical hits, stun outcome and world time at all four bpms. This is a waves-paused observation; it does not establish equal difficulty when faster records advance the real run's waves.

Rank 1:

| bag | fox | ibex | boar | raven | frostwyrm |
|---|---|---|---|---|---|
| satchel | 8 / 7.63 | 7 / 6.50 | 8 / 8.18 | 7 / 6.75 | 7 / 4.47 |
| bumbag | 8 / 7.23 | 7 / 5.95 | 7 / 3.92 | 7 / 5.45 | 7 / 2.67 |
| purse | 7 / 7.30 | 7 / 7.65 | 8 / 13.87 | 8 / 14.28 | 7 / 7.88 |
| tote | 7 / 2.13 | 7 / 2.05 | 8 / 2.05 | 8 / 3.77 | 7 / 1.93 |
| duffel | 7 / 6.28 | 7 / 2.25 | 7 / 2.25 | 7 / 6.65 | 7 / 2.32 |
| briefcase | 7 / 8.13 | 8 / 12.53 | 8 / 13.57 | 8 / 14.28 | 7 / 4.67 |
| clutch | 7 / 7.35 | 7 / 7.65 | 8 / 10.13 | 7 / 7.13 | 7 / 5.37 |
| messenger | 8 / 7.87 | 8 / 13.05 | 8 / 13.40 | 7 / 6.83 | 7 / 4.60 |
| backpack | 7 / 6.12 | 8 / 7.28 | 7 / 3.93 | 7 / 5.85 | 7 / 2.67 |

Rank 2:

| bag | fox | ibex | boar | raven | frostwyrm |
|---|---|---|---|---|---|
| satchel | 14 / 14.10 | 14 / 13.07 | 15 / 17.97 | 15 / 18.50 | 14 / 8.80 |
| bumbag | 15 / 17.17 | 15 / 13.03 | 14 / 11.43 | 15 / 16.57 | 14 / 9.35 |
| purse | 15 / 25.17 | 14 / 17.58 | 15 / 18.60 | 16 / 28.35 | 14 / 13.32 |
| tote | 15 / 14.62 | 15 / 12.77 | 16 / 11.08 | 17 / 14.97 | 14 / 7.40 |
| duffel | 7 / cutoff | 15 / 12.92 | 14 / 8.08 | 15 / 16.02 | 15 / 11.25 |
| briefcase | 15 / 26.47 | 14 / cutoff | 15 / 17.93 | 16 / 29.15 | 14 / 10.47 |
| clutch | 15 / 22.43 | 15 / 23.28 | 14 / 17.97 | 16 / 27.35 | 14 / 12.90 |
| messenger | 15 / 22.52 | 15 / 23.35 | 15 / 18.13 | 16 / 26.22 | 14 / 12.85 |
| backpack | 15 / 14.83 | 14 / 12.67 | 14 / 11.25 | 15 / 16.43 | 14 / 7.55 |

## Findings to recheck after Ed's next playtest

1. **Bag advantages depend on rank and kind.** The Tote's rank-1 fox takes 2.13 s versus the Satchel's 7.63 s (about 3.6 times faster), but its rank-2 fox takes 14.62 s versus 14.10 s. This does not establish an overall best bag, particularly beyond the fixed 10 m start or with a crowd.
2. **Slow single-target outcomes need review.** The Duffel's rank-2 fox and the Briefcase's rank-2 ibex reach the cutoff, while the Satchel completes both. These are observed timeouts in one fixture, not proof of impossible solo stuns. The brief's seven unstunnable species/ages and older ibex result are not validated or disproved by this five-species sample.
3. **Skill changes the cost of a win.** On home all three win, but sloppy takes seven knockdowns and 561 s, versus skilled's zero and 310 s. On Tiger, sloppy/crude take 29/27 knockdowns while skilled takes zero, yet all are censored. That is evidence of different pressure and tactics, not evidence that the later island is unwinnable.
4. **Wave count alone is a poor ranking.** On Stoat, sloppy wins at wave 3 while skilled wins at wave 1; crude reaches wave 4 without a win by the cutoff. Measure victory and time alongside waves.
5. **Progression is unmeasured here.** Zero discoveries/loans reflect these policies and their common options; night victory must not be reported as an island unlock or a retained loan. Ranged targeting is only the coordinator-approved observed lower bound.

No tuning follows from these numbers. The next actionable conditions are Ed's post-playtest tuning decision, a selected larger matched-seed matrix, and a public read-only exposure query if all possible shooting positions are wanted. The legacy models remain until the [coverage map](balance-report-coverage.md#legacy-coverage-map) is complete or their uncovered counterfactuals are explicitly ruled obsolete.
