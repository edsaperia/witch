# Wide, shallow balance survey — design v1

Ed approved these five studies on 2026-10-30 (coordinator comments 6512707637, 6512744240, 6512758227, 6512788396 and 6512956726 on PR #1475). **Design now; execute only after the first expert is trained. No game tuning.** Cloud Claude sessions run headless Node rules, one worker per command; no laptop survey batch or GPU/browser work. The older ~200-seed deep study remains a separate, later phase, with its existing playtest gate.

## Exact manifests and cells

The authoritative factorised manifests are [ladder](../../tools/balance/surveys/ladder.json), [tempo](../../tools/balance/surveys/tempo.json), [equipment](../../tools/balance/surveys/equipment.json), [census](../../tools/balance/surveys/census.json) and [map luck](../../tools/balance/surveys/map-luck.json). [catalogue.json](../../tools/balance/surveys/catalogue.json) freezes all 65 islands (home + 64 kinds), 64 species, nine bags, 15 built hat powers including none, and nine broom parts. Cosmetic hat variants are not separate powers.

`survey.mjs` expands these exact products, hashes each scenario and proves that every requested key belongs to exactly one shard. It never imports a copied combat model. Catalogue changes require an explicitly versioned design; no automatic addition/removal at execution time.

| study | exact product | requested cells | shards |
|---|---|---:|---:|
| Island ladder | 65 islands × sloppy/crude/skilled/expert × 100/200 starting bpm × five map pairs × plain loadout | 2600 | 65 |
| Tempo curve | home (early), raven (phase 3), tiger × expert × 80–220 bpm, every 10 × five map pairs × plain | 225 | 15 |
| Equipment value | home/tiger × expert × 120 bpm × five map pairs × 32 loadouts | 320 | 40 |
| Creature census | 64 species × ages 0/1/2/3 × five map pairs × (nine bag stun fixtures + one baseline KO fixture) | 12800 | 64 |
| Map luck | tiger × expert × 120 bpm × 30 map pairs × plain | 30 | 6 |
| **Total** | 3175 full runs + 12800 isolated fixture requests | **15975** | **190** |

Design choices for review: 10-bpm resolution; expert-only tempo/equipment/map-luck studies to limit cost; all four policies in the ladder. Of the ladder requests, **1950 use privileged-state legacy policies**. This label must appear in their tables; they are not calibrated humans. Expert labels come from its exact frozen observation audit (currently "approximate fair observation"), not a claim of perfect human equivalence.

Plain means Satchel, no hat, no broom parts. The 32 equipment loadouts are plain once, eight alternative bags, 14 non-plain built hats, and nine individually fitted parts. One factor changes at a time; no sets, combinations or separately tuned policy per item. The same trained policy is frozen throughout. Gear is virtual benchmark equipment; the find ownership pool stays `{}` in all cells, as in the existing headless report. No automatic home-everything upgrade is applied to full runs. This isolates equipped gear, not a natural campaign ownership history.

Map pair `i` is **worldSeed = 910000+i; nightSeed = 1000+7919·(10000+i)**. All studies use i=0..4, except map luck i=0..29. The first five night seeds are 79191000, 79198919, 79206838, 79214757, 79222676; the reserved interval ends at world 910029/night 79420651. Full lists are in every manifest and every shard entry. Both campaign geometry and nightly contents vary; map luck estimates their combined variability, not those components separately. There is no extra stochastic policy replicate.

## Endpoints, horizons and missingness

Full runs stop at won (`win.wonAt`), lost (`partyOver`) or **4200 player seconds** (right-censored). Durations retain separate world and player clocks. Tempo is the starting record; the normal arc and knockdown increments remain. No wave/survival proxy substitutes for winning.

Every full-run row separately records:

- won/lost/censored, terminal world/player time, waves reached/passed, knockdowns, actual ranged-target numerator/eligible conscious-ground denominator;
- quests completed **n of total**, based on real `quest.done`, with zero-opportunity cases distinct from all-quests success;
- permanent upgrade found, **eligible to keep under the night outcome**, and unresolved retention on a cutoff. The expert contract's `upgradePersisted=false` is retained: app sleep/browser persistence is not simulated. Find availability is unknown unless observed, not silently assumed;
- actual loadout, policy identity, source/model hashes, expert parameter vector and observation audit. Exact expert external JSONL is retained unchanged for #1477's importer.

The census has two distinct **60-player-second** fixtures at 10 m: protected-health stationary witch continuously aiming invitations until target stun/win-over; and unprotected, stationary, non-firing witch until her first knockdown. These are not ordinary full nights. Win/quest/find endpoints are **N/A**, not zeros. Hits, event/censoring, world duration and actual target rank/boss status remain. The supplied fixture does not report elapsed player duration or structural eligibility; those remain null/unknown rather than inferred from world time or a timeout.

For ranks 0–2, use the species' own island and an exact naturally generated specimen. For rank 3, sample natural bosses on home-everything, explicitly tagged in the case. An exact absent rank/species returns **unsupported**; never relabel an ordinary creature as a legend, hunt alternative seeds after seeing results, or call absence a loss. Five natural boss deals do **not** guarantee every species is observed. Census coverage tables must expose that gap before interpreting species difficulty. Fixture changes would require a new manifest/version and owner integration.

Unsupported cells retain their requested key and reason, are excluded from success denominators and are not censored. Execution errors stop a shard; they never become game outcomes. A malformed/truncated JSONL is refused, not silently discarded. These rules preserve missingness rather than manufacture complete-looking results.

## Cloud sharding and exact commands

All **190 exact commands**, with their explicit world/night pairs and case counts, are committed in [cloud-commands.txt](../../tools/balance/surveys/cloud-commands.txt) and machine-readable [cloud-shards.json](../../tools/balance/surveys/cloud-shards.json). No agent must invent ranges. Layout:

- ladder: one map pair × five consecutive catalogue islands per shard, all four policies and both tempos: 40 requests/shard;
- tempo: one island × one map pair, all 15 tempos: 15 requests/shard;
- equipment: one island × one map pair × eight loadouts: eight requests/shard;
- census: one species, all five pairs, ages and ten fixture conditions: 200 requests/shard;
- map luck: five consecutive map pairs: five requests/shard.

Before dispatch, combine the survey design and #1477, train/freeze the first expert, and freeze one **common cloud checkout**. Copy its trained model lock and protected held-out inventory into the run package. The expert fingerprint includes all rules/config/art/bot/planner source: integrating this design **after** training changes it. The expert owner must validate/re-freeze on the combined source; do not hand-edit a checksum to pretend it was trained/evaluated on different source. All cloud sessions use that same commit, source bytes and trained lock.

`trained-expert-lock.json` is a survey envelope, **not a replacement for #1477's modelLock**:

```
{
  "expertTrained": true,
  "sourceCommit": "<exact common 40-character commit>",
  "searchRound": 1,
  "trainingPairs": [{ "worldSeed": 0, "nightSeed": 1000 }],
  "modelLock": { "...": "the exact complete modelLock object produced by #1477" }
}
```

`trainingPairs` must be the complete actual training/search inventory, not this one-item shape example. Execution refuses an untrained/missing lock, first-round overlap with the 30 survey pairs, any final-held-out overlap, a changed checkout, model/vector/source mismatch, or an unknown cell. The held-out list must equal `docs/notes/expert-held-out-pairs.json` from #1477: its final scores are never survey/search feedback.

The adapter is **exactly** `expert-contract.mjs`: `await createCaseRunner()` returns `{runCase(case,lock),close,fingerprint}`. The wrapper translates fields to `kind,worldSeed,nightSeed,island,bpm,bag,hat,broomPart,condition,limit,bot` (fixtures add species/rank/distance), passes only the unmodified nested modelLock, and retains its external row. It does not edit or duplicate report-runtime. First cloud shard is a compatibility/throughput pilot after the training gate, before queueing the rest.

Example dispatch (every other shard command is in the committed list):

```
node tools/balance/survey.mjs run --manifest tools/balance/surveys/ladder.json --shard ladder-000 --lock trained-expert-lock.json --out results/ladder/ladder-000.jsonl
```

Each command is sequential, headless, one worker, checkpointing after every completed/requested-unsupported case. Retry the identical command to resume. Never write two workers to one output file. Cloud concurrency is assigned by the coordinator; this design creates no sessions, daemon, listener, workflow or laptop batch.

After collecting every shard of each study:

```
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/ladder.json --dir results/ladder --out results/ladder.jsonl
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/tempo.json --dir results/tempo --out results/tempo.jsonl
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/equipment.json --dir results/equipment --out results/equipment.jsonl
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/census.json --dir results/census --out results/census.jsonl
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/map-luck.json --dir results/map-luck --out results/map-luck.jsonl
```

These commands write merged JSONL **and `.md` screening tables**. Merge rejects duplicate, wrong-shard, missing or changed-case keys, incomplete provenance, mixed source/model/vector/audit/selection cohorts and missing objective fields. It never averages conflicting duplicates. Scenario IDs match equivalent controls across studies; the dataset key also includes study ID. Some common controls are deliberately repeated; no cross-study cache saving is assumed in the budget.

## Capacity estimate, not a billing or completion guarantee

The earlier 12-run preflight simulated **12294.9167 player seconds in 463.5 wall seconds**, about **26.526×**. This is wall throughput under laptop load, **not measured process CPU time**. Reserving one busy CPU core per Node worker makes it a planning proxy for CPU-hours. Normalising every full run to the 4200-second cap gives 158.33 wall seconds; use **160 s/cell** base. The slowest observed throughput normalises near 470 s; allow **700 s/cell** for denser maps/expert observation work (an explicit extra 50% allowance, not a measured bound).

No new fixture timing run was performed. Its 60-second cap normalises to 2.26 s at the same throughput; use **6 s/cell** base / **12 s/cell** contingency including unmeasured map/setup allowance, especially 64-area home-everything boss samples. Recalibrate after the first trained-expert cloud shard; unsupported cases may be quicker, but do not budget on their failure. Allow one extra startup minute per shard. Estimates are also stored in each manifest.

| study | base one-core hours | contingency one-core hours |
|---|---:|---:|
| ladder | 116.64 | 506.64 |
| tempo | 10.25 | 44.00 |
| equipment | 14.89 | 62.89 |
| census | 22.40 | 43.73 |
| map luck | 1.43 | 5.93 |
| **total** | **165.61** | **663.19** |

Idealised totals at 8 / 16 / 32 concurrent one-core workers are roughly **20.7–82.9 / 10.4–41.4 / 5.2–20.7 hours**, before queueing, installation, transfers, skew, retries or agent overhead. They are not promises or measured cloud benchmarks. The largest ladder shard budgets about 1.8 base / 7.8 contingency hours plus startup; split further only by recorded case keys if a runner's wall limit requires it. Prioritise one map-luck pilot, then ladder/tempo, then equipment/census, keeping actual throughput/censoring visible. No study has been executed for this milestone.

## Analyses to deliver after execution

| study | tables/plots and question answered |
|---|---|
| ladder | Island × journey phase × policy × tempo: W/L/censored/unsupported counts, conditional terminal times, KO and waves, quests n/total and all-quests runs, upgrade found/eligible-to-keep. Flag win cliffs, progression cliffs and within-phase outliers separately; an island that is winnable but whose quests/find remain incomplete is not labelled solved. Legacy policies remain explicitly privileged. |
| tempo | Matched-map curves at every 10 bpm for wins, quests and find retention, plus time/KO/censoring. Identify gradual change versus abrupt reversals; do not force a monotone curve or infer it from one seed. |
| equipment | Same map/expert checkpoint at plain versus exactly one item: per-map paired win/quest/find differences, duration and KO differences, unsupported and actual-use coverage. Rank policy-conditional marginal benefits, not intrinsic item power or combinations. Current contract lacks placement/activation observations: mark this unobserved and never interpret zero effect as proof an active hat is useless. |
| census | Species × actual age × bag: natural-specimen coverage, unsupported reasons, observed event/censoring, landed invitation hits and time-to-stun; separate time-to-witch-KO. Real legends stay separate from non-boss ranks. A timeout is not proof of impossibility; unknown eligibility is not a structural immunity claim. |
| map luck | All 30 outcomes and map pairs, distributions/IQRs of time, KO, quest completion and find retention, and prefix stability at 5/10/20/30 maps. With a fixed expert vector, how much results vary across campaign/night draws? Use this to propose the later deep study's sample size for an explicitly agreed precision, not automatically assert 200 is sufficient. |

At five maps per cell, counts are screening evidence, not precise win rates or definitive multiple-comparison significance. Keep censored times out of completed-win means; report their fraction. For later uncertainty estimates, resample **whole matched map pairs**, not independent item/bot rows; use a fixed analysis seed (424242), 10000 bootstrap resamples, and show small-sample limitations. Report the three objectives separately and a joint all-goals indicator only as an additional column, never as a substitute or an unapproved weighted score.

## First expert → survey → focused second search → weak-cell rerun

1. #1477 trains the first expert without any of the 30 reserved survey pairs; all its final held-out pairs are protected in both rounds. Freeze the model vector, source, observation limits, loadouts and manifests. Do **not** run legacy cells now and append expert rows from a later source: run the complete ladder cohort on the same frozen post-training checkout. If the catalogue changes, publish design v2 rather than silently resize v1.
2. Run/merge the survey. `weak` groups expert rows by island/tempo/loadout and flags lost/censored cells, outcome swings across maps, incomplete quests and known available finds not found/retained. Retain **all matched maps of each flagged cell**, including wins, to avoid selecting only losing seeds.

```
node tools/balance/survey.mjs weak --manifest tools/balance/surveys/ladder.json --data results/ladder.jsonl --out results/ladder-weak.json
node tools/balance/survey.mjs commands --manifest tools/balance/surveys/ladder.json --selection results/ladder-weak.json --out results/ladder-round2-commands.txt
```

The first command also writes `results/ladder-weak.json.evaluations.jsonl`: verbatim #1477 external expert evaluations, not a competing training format. Repeat `weak` for tempo/equipment/map-luck as needed. Unsupported rows are data/adapter gaps, not optimizer losses. Unknown availability or unobserved item use must be resolved or labelled, not awarded fictional objective credit.

3. #1477 imports those rows with its **`--external … --round 2`** path. The search owner rechecks proposed parameter vectors on the canonical training matrix; cache reuse requires exact parameter/source/case/loadout/cutoff matches. Survey pairs may now inform this second search, so they are **no longer held-out scores**. Its own final held-out list never enters feedback, fitness or selection.
4. Freeze the second model and round-two envelope. Use the generated nonempty weak-shard commands, which carry `--selection` and write under `results/<study>-round2/`, never over round one. They retain the same scenario keys/caps/maps/loadouts but a new model hash/vector. Empty selections yield zero commands. Merge only the selected keys:

```
node tools/balance/survey.mjs merge --manifest tools/balance/surveys/ladder.json --selection results/ladder-weak.json --dir results/ladder-round2 --out results/ladder-round2.jsonl
```

Compare round-one/round-two expert outcomes on those exact paired cells, explicitly labelled **post-selection diagnostic improvement**, not unbiased generalisation. Source fingerprint must stay identical for that comparison (a conservative full-code check); model vectors/hashes may change. If source changes, re-establish an explicit experiment baseline, not silent policy attribution. Final expert scores come **only from #1477's untouched held-out list**.

## Readiness and limits

Static checks: `node tools/balance/survey.mjs check` and `node --test --test-concurrency=1 tools/balance/survey.test.mjs`. These expand cells, check disjoint shard coverage, translate mocked contract rows and exercise merging/leakage guards; they do not run game simulations or prove expert strength. Typecheck is separate. The actual trained lock/combined source/real-adapter pilot remains deliberately unexecuted until the gate.

The reviewed contract initially allowed expert/skilled/crude but not sloppy; coordinator QUESTION 6513090264 requests that small allowlist extension. Until the provider adds it, those **650 requested ladder cells must be unsupported**, not silently mapped to crude. The natural-specimen contract can also leave census ages missing. Both are execution coverage risks, not permission to edit the expert owner's files or fabricate observations. #1475 owns only design/shards/validation/merge; #1477 owns the adapter and runtime integration.
