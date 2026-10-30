# Expert search: implementation and fairness audit

PR #1477, coordinator brief 6512521421, addition 6512547737 and ruling
6512668954 (2026-10-30). Work in progress; no trained expert or strong-play
claim yet. The game rules, tuning and existing skilled baseline are unchanged.

## Search contract

`tools/balance/expert-search-core.mjs` implements seeded coordinate hill climbing
with a full-space random restart every tenth candidate. It is derivative-free,
single-process and dependency-free. Candidate proposals, the generator state,
incumbent and its score are JSON-serializable. Checkpoint after `ask` and before
evaluation: repeated `ask` returns the same pending candidate, and `tell` refuses
an answer for a different candidate. The eventual driver must also checkpoint
individual real-rules case results so a restart does not mix or skip cases.

The objective compares aggregate wins, quests completed, runs with all quests
completed, finds eligible to keep, provisional finds collected, quest deliveries,
waves passed and survival world seconds, lexicographically (coordinators
6512758049 and 6514241011). Only the real quest's `done` counts as completion.
A partial delivery is a lower-priority tie-breaker, never a completed quest.
Quest totals include every generated quest,
including ones the expert has not discovered. Zero quests is not an all-quest win.
A single extra win outweighs any progress-only gain. A find is eligible when
actually picked up and the night is won; actual app sleep/persistence is not run
and `upgradePersisted` remains false. Tables name that distinction explicitly.
Training and held-out case lists must be disjoint and recorded in the manifest;
the evaluator must never select parameters using held-out scores. Censored
short runs are pilots, not wins or evidence of full-night strength.

Focused search checks:

```
node --test --test-concurrency=1 tools/balance/expert-search-core.test.mjs
```

## Existing skilled privileges

These findings concern `src/rules/bot.ts` at the prepared baseline 1caeffa3c.
They are preserved for interpreting old bot results, not changed for this PR.

| Code path | Information or operation requiring an expert boundary |
| --- | --- |
| `inviteable`, `pickRecruit`, initialization of `legendOf` | Full-island creature population, exact kind counts, unseen legends and their live state |
| `ahead`, defending, `stranded` | `party.next`, `afterNext`, exact wave deadline and remote standing soundsystems |
| `siegeJob` | Remote creature siege membership and exact fighting values |
| `threatDodge` | Attack target identities and exact `windupUntil`, charge and leap internals |
| Feeding, relic and quest jobs | Remote berry availability, relic positions, quest targets |
| Sigil jobs | Calls to `toBottom` mutate the leash immediately rather than emit player controls |

Some global information has legitimate HUD equivalents: `winTarget` is used by
the visible straggler pointer, and the game shows wave pointers and off-screen
soundsystem alarms. That does not authorize unrestricted reads of all underlying
entities or exact combat state. Each expert observation needs a specific visible
or audible source, and stored memories must remain stale when no new observation
is available. A radial distance filter alone is not proof of screen visibility:
the renderer uses the camera projection, world bend, frustum and canopy.

Coordinator-approved human limits are floors: reaction delay at least 0.25 player
seconds, control updates at most 8 Hz, aim error at least 1 metre. Aim noise needs
its own deterministic seed, never the game RNG. Only controls may affect the
real Game. Search cannot relax these limits. Exact interpretation of visibility
and its approved approximate adapter are described below.

## Approximate observation and quest discovery

Coordinator 6512711766 authorized the approximation: a 16:9 rectangle around the
witch, sized from the standard camera distance/FOV/angle at default zoom in each
mode. No terrain bend, canopy occlusion, camera easing, special house/circle
framing or true projection is modelled. Results must say **approximate fair
observation**. Actual projection integration is deferred until pilot results
show sensitivity or the coordinator assigns it. No renderer files are changed.

Only detached scalar snapshots cross into the policy, delayed by 0.25 player
seconds; controls update at most 8 Hz. Aim error is a separately seeded 1 m
offset per control update, never a game-RNG read. Button presses are single-step
pulses; movement, firing and a casting hold persist between updates. The expert
never calls `toBottom`, sets a bag, teleports or edits game state.

Quest requests come from a visible ground-level legend's dream bubble within
`dreams.range`, never a global quest journal or sleeping-legend pointer. The
approximation treats its cycling request sigil as readable and uses the public
eight-direction/rounded-distance hint (`dreamWay`), not the exact unseen target.
Visible observations update quest memory; unseen memories stay stale. There is
no intrinsically hidden quest type in `quest.ts`, but undiscovered sleeping
legends cannot be read remotely, and a closed quest may become unavailable.
Delivery cycles the carried stack one legal control press at a time. The find
is observed only on foot, in the rectangle and within the renderer's 120 m limit.
Relics are reported only when visible on the ground; an independent relic-trip
tactic is not implemented in the first policy. Quest delivery and find collection
are implemented; comprehensive quest completion is unverified.

## Conditions and integration

Matched conditions: Satchel, no hat, no broom parts; home, Tiger and a later
island; 100 and 200 bpm. A later island will be selected from the actual designed
roster and its phase recorded before training. Home with everything unlocked is
a separate training/evaluation condition and result table.

The baseline report harness creates default home knowledge and `fillTrunk(g,{})`.
The app's `debugUnlock` widens legal equipment/island choices; it does not equip
mutually exclusive items together or expand home's animal roster by itself.
#1478 owns the unlock/hat path. Until its helper lands, the harness uses the
built hat catalogue, all bags and each legal broom slot catalogue. Home setup
uses `knownKinds(REAL_KINDS)` via `map.found` and `islandAreas`. Availability is
not ownership: as with the app debug toggle, the night's find draw still uses
an empty owned-find profile. Cosmetic clothing does not change policy mechanics.
Explicit experiment cases set `hat.has=false` for no hat, whereas the old report
only set the hat spell to none; legacy cases are preserved unless `wearsHat` is
specified. New comparisons all use the explicit setup.

The later island is Komodo (kind phase 4, island phase 5), later than Tiger
(kind phase 3, island phase 4) and volcanic rather than jungle. Policy bounds
and equipment index domains live in `tools/balance/expert-space.mjs`. The search
does not relax human floors. Training seeds start at night 1000/world 0; protected
held-out pairs are committed in `expert-held-out-pairs.json`. Both training rounds
exclude every protected pair. First-round external imports additionally exclude
the survey's world `910000+i` / night `1000+7919*(10000+i)` for i=0..29.

## Survey contract and external evaluations

`createCaseRunner()` in `tools/balance/expert-contract.mjs` returns
`{runCase(case,lock), close(), fingerprint}`. Call `close()` in a finally block.
Each case explicitly supplies `kind` (`run`, `stun`, `ko`), `worldSeed`,
`nightSeed`, `island`, `bpm` (80–220), `bag`, `hat`, `broomPart` (one exact part
or null), `condition` (`matched`, meaning ordinary roster, or `home-everything`),
and `limit` in player seconds. Runs additionally supply `bot`
(`expert`, `skilled`, `crude`, `sloppy`); sloppy maps to the existing novice and
is labelled privileged-observation alongside skilled/crude. Fixtures supply `species`, `rank` (0–3) and
optional `distance` (default 10 m). No unknown gear or field silently falls back.
The ordinary-roster survey condition can use its requested equipment, unlike
the search's own matched Satchel/no-hat/bare-broom matrix.

Locks from `modelLock(parameters, sourceFingerprint, heldOutPairs)` hold schema,
exact parameters, human floors, observation label, protected pairs and a
canonical SHA-256 checksum. `model-lock.json` is emitted only after the complete
training/evaluation pilot; a pilot lock is not a strong-play certificate.
Source mismatches and unsupported cells return explicit reasons. A rank-3
fixture selects a natural real legend; if the requested species/rank is absent,
the fixture is unsupported rather than fabricated. Invitation-stun protects
witch health, while KO is stationary, non-firing and unprotected; both disable
waves and remove other creatures/allies as fixture setup, retaining real rules.

One external JSONL line is an `runCase` success result plus `schema:1`:
`{schema:1,status:"ok",sourceFingerprint,modelSha256,parameters,case,result}`.
`result` contains the real-rules outcome, seed/loadout, quest counts, find
eligibility and progress. Import with `--external file.jsonl --round 1|2`.
Candidate policies are proposed from external rows, then evaluated on the same
canonical training matrix before acceptance. An external result replaces a local
evaluation only when source, parameters, exact case, equipment and cutoff match.
Unmatched survey outcomes never directly change fitness. Protected pairs are
refused, malformed JSONL is refused and a changed external digest prevents resume.
The survey owns its manifests, sharding and merging (#1475).

### Focused round two and source freeze

Coordinator 6513506188 requires `--round 2 --cases weak.cases.json --from
selected-training-parameters.json`. The reader is
`readFitnessCases` in `tools/balance/expert-contract.mjs`: input is an array of
contract run cases or `{ "schema": 1, "cases": [...] }`. The supplied list
replaces the original matrix. Every case retains its exact world/night seed,
island, BPM, bag, hat, single broom part and player-second cutoff. A source case
for skilled/crude/sloppy explicitly projects to expert for optimization; the
original case remains in the manifest. Duplicate cells after projection,
unknown equipment, fixture kinds, malformed lists and any protected pair are
refused. First-round reserved survey pairs become eligible in round two; the
expert's own protected pairs never do.

`--external` remains an exact-result cache/proposal source, not the matrix
selector. Round two refuses to run without both `--cases` and a same-source
`--from` model. Equipment is fixed by each supplied case, so round two searches
policy parameters only and preserves the selected model's unlocked loadout for
the eventual final evaluation. Case-list/model/external digests enter the resume
manifest. `--time` remains the standard-matrix/final-evaluation cutoff; it never
overrides a supplied fitness case's own cutoff.

Source hashes normalize CRLF to LF and use ordinal filename order
(`lf-ordinal-v1`), so equivalent Windows and Linux checkouts agree. Manifests
record Node version, OS and architecture; exact numeric replay across unlike
runtimes is not claimed. Changed source or runtime cannot silently resume an
old checkpoint.

### Cloud runner preflight

Use the exact dispatched source SHA with Node 22 and existing dependencies
(`npm ci`). Before a training command, run:

```
npm run typecheck
npx vitest run src/bots/expert.test.ts tools/docs --maxWorkers=1
node --test --test-concurrency=1 tools/balance/expert-progress.test.mjs tools/balance/expert-search-core.test.mjs tools/balance/expert-space.test.mjs tools/balance/expert-contract.test.mjs tools/balance/report.test.mjs
node --check tools/balance/expert-search.mjs
```

If a preflight fails, report it without modifying source or training. Run only
the assigned shard command; its hard 3300 s cap leaves five minutes of a 60-minute
window for preserving results. Exit 2 is an incomplete checkpoint, not success.
Commit that shard's result folder even when incomplete, on its own
`claude/expert-train-<n>` branch. Source edits are not assigned to runners.
Both optimizer checkpoints and JSONL must return; the builder fetches them
read-only and compares policies on the common training matrix. No runner opens
a browser or evaluates the protected held-out list (`--training-only`).

Before cloud dispatch, the home calibration on source
`496ab6fedf2135cd33a83925d00f09a67758ae97` ran
2026-10-30 02:21:49.505–02:24:10.562 UTC: 141.057 s including startup,
123.272 s of simulation. Lost after 2916 player seconds / 2913.84 world seconds;
wave 10 reached, 9 passed, no knockdowns, quests 0/2. The briefcase find was
picked up but was not eligible to keep after a loss. This is a single-case
throughput result with possible coexisting unit checks, not a strength estimate.
Its raw result is `expert-results/full-night-calibration.json`.

The subsequent policy adds a deliberate visit to a sleeping legend actually
seen, then reads its dream only after landing. `questMax` (0–6, default 1) bounds
distinct dream visits, alongside `questRange`/`questBias`. Opportunistic dreams
remain readable in view. This is a policy choice for cloud search, not a measured
quality improvement; it uses no remote sleeping-legend data.

### Partial-progress preparation after round one

Coordinator 6514241011 approved lower-priority gradients after round one's
0 wins / 95 losses / 1 censored result. The next objective has eight terms:
win count, completed quest count, all-quest runs, find eligible to keep,
provisional find pickups, unique quest deliveries, waves passed, world seconds.
Tests prove that arbitrary amounts of lower progress cannot outrank any of the
first four priorities. The old six-term checkpoints remain old-source evidence;
they are not silently converted or resumed as eight-term checkpoints.

`expert-progress.mjs` observes existing events without changing policy input or
rules. Provisional pickup is recorded once even if the find later disappears;
it is never called kept. A quest delivery is a requested creature's sigil placed
in its legend's area: either the real completion event, or the rules' existing
`outsideCircle` cue when the correct creature is brought to the area but dropped
outside the clearing. It is counted once per legend, so repeated drops cannot
farm the score. `questDeliveriesIncomplete` separates such incomplete arrivals
from completed quests. Ordinary sigils and relic placements earn no delivery.

This is prepared source, not a new training freeze. Coordinator 6514249008 has
dispatched the unchanged-skilled comparison on 676e8924 to baseline-1; its result
must be reviewed before freezing another source or making a trained lock.

Pilot reproduction (one worker; at most 480 s between case boundaries):

```
node tools/balance/expert-search.mjs --out docs/notes/expert-results/pilot --time 60 --iterations 3 --train-seeds 1 --held-seeds 1 --wall-seconds 480
```

Repeat the exact command on the same source fingerprint to resume `checkpoint.json`.
Results-only commits may resume without changing the original source provenance;
changed policy/rules/tool source is refused.
Each completed case is saved immediately; pending candidates replay identically.
`cases.jsonl` is the readable training/held-out log; `held-out.md` separates the
two equipment conditions. Local pilots refuse cutoffs above 120 player seconds
or budgets above 600 wall seconds. `--execution cloud --training-only` permits
full-night cases and at most 3600 wall seconds, enforced by an idle parent process
that terminates the one simulation worker. An interrupted case is replayed;
completed cases survive. Exit code 2 means the hard budget ended with a checkpoint,
not a completed model. Cloud training-only runs never evaluate a protected case.

## Matched-home diagnostic after round one

Paired cloud trace `5247329e317da6268bd2c2500278a28593c8b858` runs unchanged
`676e8924` on world 0/night 1000, home, 100 bpm, Satchel, explicit no hat and no
parts. Skilled wins at 310.73 player seconds; expert reaches the 600-second
cutoff in wave 2. These are training-seed diagnostics, not held-out scores.

The first policy divergence after the mandatory reaction/deck exit is local
exploration at 2.67 seconds: skilled already has a map-derived destination;
expert rotates its movement every input. After briefly seeing a hare at 7.2,
expert loses it at 7.47 and orbits roughly x=3084–3136/z=2945–2997 through
27.2, with zero invitation hits. A fair replacement must explore from observed
positions rather than copy skilled's privileged map-wide target selection.

There is also a measured arrival failure: expert labels 123.47–309.07 as
casting at the squirrel stone, repeatedly crossing it (sampled distances
about 0–5.2 m), while skilled's corresponding job lasts 11.3–17.08. The trace
script's cast event uses `ctl.sigil`, not `sigilHeld`, so it does not establish
the exact cast hold history; movement oscillation and delayed conversion are
directly recorded. The proposed control change slows movement within 10 m of
interaction destinations and keeps a local exploration waypoint until reached
or a 12-player-second timeout. It preserves the observation boundary and human
floors. This candidate needs cloud nearby tests/typecheck and same-cell
revalidation before any claim of improved outcomes or further training.

Cloud revalidation on `57aa9d40` (`b62748800465d377512517c235925f22a6826218`)
passes typecheck, expert/docs Vitest (16 tests) and the seven pure progress/search
tests. Expert wins home100/200 at 2763.48/1959.37 player seconds, zero KOs,
0/2 quests, with one upgrade eligible to keep at each tempo; persistence remains
false. Skilled still wins at 310.73/310.05, with no upgrade. The candidate's
phase logs show expert waiting through all ten waves then spending 192/639
world seconds on stragglers, while skilled clears early. The old trace shows
skilled's map-wide recruitment route; expert lacks that privileged knowledge and
prioritizes visible finds. This explains the broad route difference, not every
second of the new candidate: there is no new candidate decision trace. The
approved waves/survival tie-breakers maximize progress/time, including won
runs, so search does not directly reward a faster win. Do not silently change
that scoring order or claim search will necessarily close the speed gap.

Released prototype `bf68860ab` was normally merged at `28a8d5fc`. Unlocked-home
setup now calls its `syncHatUnlock` with explicit `hats=*` parameters, avoiding
storage reads. Fingerprints conservatively include `src/app` as well as rules,
bots, config, art and balance tools to bind that helper and its imports. The
adopted diagnostic script counts/watches `sigilHeld` for casts. Old trace files
retain their original, limited instrumentation and provenance.

The next proposed bounded cloud batch uses `--defer-quests`: all three existing
quest parameters remain fixed, including external proposals and restarts;
quest outcomes still occupy their approved objective positions. Four independent
search seeds propose distinct neighbours across movement/combat and legal gear.
Each candidate uses two training nights (1000, 8919), world 0, home/Tiger/Komodo
at 100/200 bpm plus unlocked home at both tempos: 16 cells. This widens night
randomness, not map-world diversity. Two candidates per runner mean 32 rows each,
128 maximum across four runners, with a hard 3300-wall-second cap and immediate
case checkpoints. This is a modest local search, not evidence of optimal play.
Cloud preflight and coordinator dispatch are required; no local batch is implied.

## First pilot, not trained strength

Source `9be247f04e21aa8175e3d534a7a6ea904be7a250`, artifacts in
`expert-results/pilot/`: three candidates, one training seed, 24 training cases,
24 held-out comparison cases with one distinct held-out seed per cell, 60 player
seconds each. Completed in 219.337 simulation wall seconds, 13.13 short cases/min
(startup excluded). All three objectives tied at `[0,0,0,0,0,402.86]`; no parameter
was demonstrated to matter. The initial policy and Satchel/no-hat/bare-broom
loadout remained selected. Everything was censored, so this does not establish
win strength, quest performance, gear value or a learned improvement.

A separate diagnostic using training seed 1000 showed the witch remaining
stationary while descending over a lake for more than 100 world seconds. Steering
toward the visible target removed the stationary trace, but a second trace showed
delayed observations repeating toggle presses and reversing the landing. The
next source change acknowledges a mode transition before pressing again. This
was found and corrected using training-seed traces, not held-out parameter
selection. The first pilot belongs to its recorded old source and is not a
trained-model lock for the corrected policy.

Coordinator 6513108324 moves longer training to four cloud runners, with separate
optimizer seeds and a shared canonical training matrix. Source/checkpoints/JSONL
return on `claude/expert-train-<n>` and are fetched read-only. Final held-out scores
come after candidate selection. The approved home/Satchel full-night throughput
calibration is `node tools/balance/expert-calibrate.mjs`; its separate idle parent
enforces a hard 600 s cap including startup and records UTC start/end times.
It must not run during #1464's quiet trace. Coordinator 6513114429 currently
holds all local simulation until #1464 explicitly posts browser free.

The coordinator approved a single-worker below-normal-priority pilot of at most
10 minutes, stopped before #1464's quiet trace; longer runs need a new answer
until then. `node tools/balance/expert-throughput.mjs` calibrates only four
30-player-second home cases and labels them accordingly. It is not a full-night
throughput estimate. No browser is needed.
