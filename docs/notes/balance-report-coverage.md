# Real-rules reports and legacy coverage

Ed, 2026-10-29: "improving the real-rules balance reporting, then establishing matched-seed/loadout baselines"; no tuning. PR #1463 keeps `src/rules` read-only.

`node tools/balance/report.mjs` runs `newGame`/`stepGame` and the existing `newBot` policies through Vite SSR. It never imports `balance.ts` or `states.ts`. `sloppy` is an alias for the existing `novice`, not a new calibrated human model. All bots get the same explicit bag, no hat and no broom parts. They start unseated, before the party spell, as `runbot` does; the bedroom tutorial and app persistence are outside this experiment. Records use the game's `recordTempo`, retaining its tempo arc and knockdown increments.

Examples (one CPU worker, no browser):

```
node tools/balance/report.mjs runs --seeds 200 --bots sloppy,crude,skilled --islands home --bags satchel --bpms 100,120,160,200 --time 4200 --out home.jsonl --build v5655
node tools/balance/report.mjs runs --seeds 2 --islands home,fox,ibex --bags satchel,purse --time 1200 --out islands.jsonl --build v5655
node tools/balance/report.mjs stuns --species all --levels 1,2 --bags all --bpms 100,120,160,200 --seeds 2 --time 60 --out stuns.jsonl --build v5655
node tools/balance/report.mjs report --out home.jsonl
node --test --test-concurrency=1 tools/balance/report.test.mjs
```

`--seeds N` means N seeds starting at `1000 + 7919 * skip`, not an end index; `--skip` defaults to 0. `--islands all` selects every built island, including home. Phase summaries describe only the selected islands, equally weighted by run. Run phases are opening (before wave 1), waves, stragglers and lap. Completed phase durations and unfinished durations are separate; a cutoff is censored, not lost. The limit counts player seconds; durations count world seconds, which slow in legend circles. `wavesPassed` means later wave arrivals observed, not a count of won sieges. The latest wave may still have active besiegers when a run ends.

JSONL starts with an experiment manifest and appends each completed case immediately. The same command resumes only with an identical manifest: full commit, source fingerprint, seed list, selected cases, limit and loadout. The fingerprint covers rules, configuration, art data and report tools. A changed checkout or command requires a new output file; a partial final JSON line is refused rather than silently ignored. Output Markdown can be regenerated from the JSONL even after the source changes. Runtime estimates are printed after each case; they exclude already completed cases. Measured runtime is deliberately absent from deterministic result rows.

Stun fixtures have one active wild target, no allies or waves, a stationary witch with protected health, and continuous aim at the target's current position. `--distance` (default 10 m) is the starting separation; the creature moves under real rules. Every bag shares the same fixture and seeds. Landed letters, completion and world time are separate; a timeout is not "impossible". These are invitation stuns, not blows from an adult ally, nor ordinary unprotected fights.

Night wins, discovered islands, islands kept by `win.found`, finds on loan and eligibility to keep a found loan are separate columns. App saving/sleep is not executed, so the report never claims an unlock was persisted. The existing bots are not find-hunting policies.

## Legacy coverage map

Do not retire the copied models until every needed row below has an explicit replacement or the coordinator rules that the experiment is obsolete. Current coverage is partial. Their numbers are historical hypotheses, not calibrated measurements of current pack/orbit combat.

| Old measurement | Existing entry point | Real-rules replacement / remaining gap |
|---|---|---|
| Idle loss and time to party end | `balance.ts` / `sim.mjs` | `runs --bots idle`, explicit lost/censored outcome and overAt |
| Enemy value, population and siege strength by wave | `balance.ts` / `sim.mjs --per-wave` | Wave arrivals observed; per-wave strength/population snapshots not yet covered |
| Skill spread expressed as constant F/min | `balance.ts` / `sim.mjs --skills` | Actual bot wins, phase time and waves; constant-F/min counterfactual not covered and has no measured human calibration |
| Late-start catch-up from a chosen wave | `balance.ts` / `sim.mjs --starts` | Not covered by current fixed bots |
| Attrition/director/no-merge variants | `balance.ts` / `sim.mjs` | Not covered; simulator-only interventions are not current game rules |
| Travel, descent, sigil costs and defence arriving before first blow | `balance.ts` / `logistics.mjs` | Real travel is executed but dedicated arrival/first-blow observations not yet reported |
| Survival by invite rate and defence policy | `states.ts` / `states.mjs` | Actual sloppy/crude/skilled/idle policies and explicit loadouts; defend/third/leash/babies/relay/mass counterfactuals not equivalent and not covered |
| Wild pool, each area's prior recruitment and siege targets | `states.ts` / `states.mjs` | Not covered by this summary (`runbot.mjs` retains per-wave recruitment observations) |
| Angry legends, relics, berries, evolution, same-kind fights | `states.ts` / `states.mjs` | Executed by current rules; dedicated state-distribution tables not covered |
| Point of no return and losing tail | `states.ts` / `endgame.mjs` | Loss time observed; counterfactual irrecoverability and time since irreversible loss not covered |
| Faster/ramped waves | `states.ts` / `waves.mjs` | Actual record bpm 100/120/160/200 covered; simulator-only rush policies not covered |
| Current invitation stuns per bag/species/rank | Neither copied model | `stuns`, observed landed letters, time and explicit timeout |

Retirement is therefore deferred until the missing measurements are implemented or explicitly ruled obsolete on PR #1463; the files and their callers/tests remain intact. No square-law result is reused in the new report.
