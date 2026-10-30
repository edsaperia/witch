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

The objective compares aggregate wins first, then waves passed, then survival
seconds, lexicographically. A single extra win outweighs any progress-only gain.
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
and any required shared observation adapter is pending coordinator ownership.

## Conditions and pending integration

Matched conditions: Satchel, no hat, no broom parts; home, Tiger and a later
island; 100 and 200 bpm. A later island will be selected from the actual designed
roster and its phase recorded before training. Home with everything unlocked is
a separate training/evaluation condition and result table.

The baseline report harness creates default home knowledge and `fillTrunk(g,{})`.
The app's `debugUnlock` widens legal equipment/island choices; it does not equip
mutually exclusive items together or expand home's animal roster by itself.
#1478 owns the unlock/hat path. Its callable headless interface and the legal
equipment search condition must be coordinated before that condition can run.

The coordinator approved a single-worker below-normal-priority pilot of at most
10 minutes, stopped before #1464's quiet trace; longer runs need a new answer
until then. `node tools/balance/expert-throughput.mjs` calibrates only four
30-player-second home cases and labels them accordingly. It is not a full-night
throughput estimate. No browser is needed.
