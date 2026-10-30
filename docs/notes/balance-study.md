# Balance study follow-up

Ed, 2026-10-30: "continue" the balance work after the reporting tool and initial baselines in PR #1463.

Work stays on the real rules, with no tuning or edits to `src/rules`. The first step is a bounded preflight against the current prototype: seed 1000, home and Tiger, sloppy/crude/skilled, Satchel/no hat/bare broom, 200 bpm, a 4200-player-second cap. Six cases. Tiger is a diagnostic target because the initial 100-bpm slice recorded 29/27 knockdowns for sloppy/crude but reached the 1200-second cutoff. A different tempo and newer rules make this a fresh experiment, not a direct attribution of changes to tempo.

The preflight checks compatibility and the longer observation horizon. It is not a calibrated human study or an estimate from 200 seeds. It should expose runtime and remaining censoring before selecting the larger matrix. The coordinator selects the larger study's scope; proposed scope is home plus one troublesome later island, matched seeds/loadouts and 100/120/160/200 bpm. Tuning remains Ed's decision after his playtest.

Results and precise source provenance will be added after the preflight completes. The previous v5655 baseline remains unchanged.
