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
completed, finds eligible to keep, waves passed and survival world seconds,
lexicographically (coordinator 6512758049). Partial quest progress earns zero:
only the real quest's `done` counts. Quest totals include every generated quest,
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
(`expert`, `skilled`, `crude`); fixtures supply `species`, `rank` (0–3) and
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

Pilot reproduction (one worker; at most 480 s between case boundaries):

```
node tools/balance/expert-search.mjs --out docs/notes/expert-results/pilot --time 60 --iterations 3 --train-seeds 1 --held-seeds 1 --wall-seconds 480
```

Repeat the exact command on the exact source commit to resume `checkpoint.json`.
Each completed case is saved immediately; pending candidates replay identically.
`cases.jsonl` is the readable training/held-out log; `held-out.md` separates the
two equipment conditions. The driver currently refuses cutoffs above 120 player
seconds or run budgets above 600 wall seconds pending longer-compute approval.

The coordinator approved a single-worker below-normal-priority pilot of at most
10 minutes, stopped before #1464's quiet trace; longer runs need a new answer
until then. `node tools/balance/expert-throughput.mjs` calibrates only four
30-player-second home cases and labels them accordingly. It is not a full-night
throughput estimate. No browser is needed.
