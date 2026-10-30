# Balance study follow-up

Ed, 2026-10-30: "continue" the balance work after the reporting tool and initial baselines in PR #1463.

Work stays on the real rules, with no tuning or edits to `src/rules`. The first step is a bounded preflight against prototype `3c13498d7`: seed 1000, world 0, home and Tiger, sloppy/crude/skilled, Satchel/no hat/bare broom, a 4200-player-second cap. The first six cases use 200 bpm; six matching 100-bpm cases give a same-source tempo comparison. Tiger is a diagnostic target because the initial slice recorded 29/27 knockdowns for sloppy/crude but reached the 1200-second cutoff. These are fresh experiments on newer rules; changes from the v5655 baseline cannot be attributed solely to tempo.

The preflight checks compatibility and the longer observation horizon. It is not a calibrated human study or an estimate from 200 seeds. It should expose runtime and remaining censoring before selecting the larger matrix. The coordinator selects the larger study's scope; proposed scope is home plus one troublesome later island, matched seeds/loadouts and 100/120/160/200 bpm. Tuning remains Ed's decision after his playtest.

The previous v5655 baseline remains unchanged. Both tempo groups completed, with no censored cases in this one-seed preflight.

## Newcomer-policy evidence

Inspected the latest saved playtest export, `previews/ed/playtests/playtest-2026-10-29-19-23.json` on `claude/ed-shots`. It contains eight sessions on builds v5399–v5613, with varied bags, broom parts, world seeds and settings; several are short house/transition sessions. `PlaytestRun.debug` is a debug-info string, not an input-event stream. The samples do not record the aim/dodge decisions needed to calibrate the existing novice policy's missed throws, aim wobble and disabled dash.

These logs therefore do not validate "sloppy = newcomer" on the current build. Do not compare their aggregate invite counters directly with the report's landed-letter observations or claim that zero in that counter means no invitations were thrown. The existing novice remains a deliberately impaired policy until Ed watches it or a suitable matched current-build playtest is available. No bot changes are made here.

## Matched preflight results

Game source: prototype `3c13498d7`. Experiment checkout: `6d1ae3898dd4645effb402fcf78b4b72c880d2f5` (only this study's initial note added). Schema 2; source fingerprint `7788c4ef429986b851d070d9188f936791f59858caab2625cdd6b2a736f84313`. This is a source label, not an asserted published build number. Both experiment manifests match exactly except their starting record bpm. The game's tempo arc and knockdown increments remain active.

Raw evidence and full phase tables: [100-bpm JSONL](balance-data/prototype-3c13498d7-preflight-100.jsonl), [100-bpm tables](balance-data/prototype-3c13498d7-preflight-100.md), [200-bpm JSONL](balance-data/prototype-3c13498d7-preflight-200.jsonl), [200-bpm tables](balance-data/prototype-3c13498d7-preflight-200.md).

All times below are world seconds; the cap was 4200 player seconds. Each row is **one run**, not an estimated population win rate. Reached/passed waves are arrivals/subsequent arrivals, not won sieges. Ranged targeting is the observed lower bound defined in the reporting notes. All discovery/kept-island/loan columns were zero; no progression conclusion follows from these recruitment policies.

| island | starting bpm | bot | outcome | end seconds | knockdowns | waves reached/passed | ranged targeting % |
|---|---|---|---|---|---|---|---|
| home | 100 | sloppy | won | 561.13 | 7 | 2/1 | 5.09 |
| home | 100 | crude | won | 297.62 | 1 | 1/0 | 2.59 |
| home | 100 | skilled | won | 309.91 | 0 | 1/0 | 3.06 |
| tiger | 100 | sloppy | lost | 1385.73 | 32 | 9/8 | 11.20 |
| tiger | 100 | crude | lost | 1389.60 | 33 | 9/8 | 4.64 |
| tiger | 100 | skilled | lost | 3062.80 | 14 | 15/14 | 1.60 |
| home | 200 | sloppy | won | 434.53 | 5 | 3/2 | 2.58 |
| home | 200 | crude | won | 287.15 | 1 | 2/1 | 2.88 |
| home | 200 | skilled | won | 309.23 | 0 | 2/1 | 3.45 |
| tiger | 200 | sloppy | lost | 1133.72 | 27 | 11/10 | 4.68 |
| tiger | 200 | crude | lost | 1146.58 | 26 | 11/10 | 2.57 |
| tiger | 200 | skilled | lost | 1963.57 | 4 | 15/14 | 3.16 |

1. The longer horizon resolves the original kind of uncertainty: on this current-source 100-bpm Tiger run, sloppy/crude eventually lose after about 23 minutes and skilled after about 51. A 20-minute cutoff would still leave all three outcomes unknown. This is not proof that Tiger is unwinnable.
2. At the matched 200-bpm setting, Tiger losses come earlier for each bot, but not uniformly twice as early. Recruitment, survival and the wave tempo interact; a record-speed ratio is not a win-time formula.
3. Fewer knockdowns can coexist with an earlier party loss. Skilled's Tiger run has 14 knockdowns at 100 bpm and four at 200 bpm, yet the faster run loses sooner. Witch safety and party defence need separate measurements.
4. Home's observed wins at both tempos contrast with Tiger's observed losses, making these useful diagnostic endpoints for a larger sample. The common Satchel removes bag differences; it does not establish each bot's best possible build or human play.

## Reproduction and larger-study decision

```
node tools/balance/report.mjs runs --seeds 1 --time 4200 --islands home,tiger --bpms 100 --bots sloppy,crude,skilled --bags satchel --out fresh-100.jsonl --build prototype-3c13498d7
node tools/balance/report.mjs runs --seeds 1 --time 4200 --islands home,tiger --bpms 200 --bots sloppy,crude,skilled --bags satchel --out fresh-200.jsonl --build prototype-3c13498d7
```

Run on the named source to reproduce it; a newer rules source is a new experiment. Both six-case groups have unique matched island/bot keys, identical non-tempo manifests and terminal outcomes. `npm run typecheck` and the four focused report tests passed on this prototype. No full suite, smoke run, browser run or art check was run for this documentation/data-only follow-up.

The larger scope question is on PR #1475: proposed home + Tiger, 200 night seeds per bot, 100/120/160/200 bpm, world 0, common Satchel/no hat/bare broom, 4200-player-second cap. **That is 4800 full runs**, not 200 total runs. Local measured case times varied with load (home roughly 4–21 s, Tiger roughly 24–127 s in this preflight); do not promise the entire matrix in one laptop overnight or extrapolate precisely from this seed. A staged or cloud run needs the coordinator to settle scope, execution capacity and timing, plus the newcomer-policy limitation above. No large batch is running, and no tuning is proposed.
