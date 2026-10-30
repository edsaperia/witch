# Robustness source audit

Base: `3f7d386beb3d7147f32f6837d9144decd467b7b2`, 2026-10-30. No rules behavior or tuning changes.

Reporting-route follow-up (6531271878): the starting-save-failure test now observes `logCaughtError` itself, with the exact error/location and one-call assertion, while still executing its real implementation. A shared worker can already have the page-log sink installed, legitimately bypassing console.warn. Reporting is synchronous at this catch; waiting for the journal drain would not repair a console assertion. The test retains full rules-state equality and restores both spies in finally; no production flag/reset change is needed.

Coordinator polling follow-up: trusted `COORDINATOR —`, `–` and `-` headers are recognized alongside the original colon prefix. The unmodified body still determines receipt hashes. Both paginated fetches must succeed before explicit acknowledgement can advance receipts. Missed instructions6531244653/6531271878 were read against the latest full brief, not replayed as older work; author/prefix/quoted-text regression checks cover the classifier.

CI shared-module follow-up (6529978390): error listeners are installed at module evaluation, once per real page. A test worker may cache that module before a fake window exists; resetting only after tests left the first fixture without listeners, so its caught-error ring never received the dispatched browser errors. The fixture now resets before each fake-page import, with a deliberate preloaded-module regression and a separate-page/pre-night error case. Production ring retention across nights is intentional: earlier entries keep their original context and the active sink is replaced by each new night. Real reloads/tabs use separate module realms/rings; prior persisted logs are explicitly included as history, not relabelled as current-page errors. No production reset or weakened assertion was introduced.

## Catch audit

`node tools/robustness/catch-audit.mjs` inventories actual catch clauses with the TypeScript parser, excluding comments, tests and string-embedded generated code. “Empty” means no statements after removing comments. The brief's roughly 98 empty catches are deliberate in most cases. Five now record unexpected failures: sound construction on wake/start, the watchdog callback, and the playtest comparability/debug-text callbacks. Two nonempty dream-art fallbacks and the sliced-build worker rejection also now record errors while preserving their original fallback. Reporting uses a lightweight hook, so drawing/worker callers do not import the log's rules graph. Workers without the page hook retain console diagnostics.

The remaining 93 statement-empty catch clauses were reviewed by purpose and retained:

| Purpose | Files/operations | Why quiet |
| --- | --- | --- |
| Storage blocked, full or corrupt | arrival, attackLibrary, broomSave, chartCache, chartSave, chartView, debugUnlock, guideSave, hatSave, ladder, linkParams, loadout, mapPrep, musicLab, owned, playerPick, recordSave, settings, shake, storageFallback, timing, creator, decisions, bindings, playtestLog, audio/buffer, main | Defaults or page-only state already provide recovery; storage failures must not recursively log storage failures. |
| Unsupported optional browser feature | landingBake worker construction, performance timeline, rumble, audio automation rate, output timestamp, touch pointer capture, sleepyFace canvas probe, zoo iframe keyboard bridge | Existing fallback remains usable. No new permissions or retries. |
| Audio teardown | babble, fof, music, musicAhead, musicEngine, night, places, sfx, sparkler, tract, voiceFx, watchdog, outputMeter | Nodes may already be stopped, disconnected or absent; repeated cleanup is expected. |
| Optional recorded voice | voiceSamples | A missing/undecodable individual sample intentionally keeps the synthetic voice. |
| Guarded page context | sound's URL probes and freeze, fightArena's history update | No page/audio context or denied browser operation is supported. |
| Existing fallback/error ownership | artCache upgrade failure, musicLab's second parse, sail's attempt to log a failure, musicSet missing route | Failure is already answered by storage events/parse validation/reload, or an explicit equal-length fallback in pure rules. |

Nonempty unbound catches were also checked: storage/default returns, optional GPU/permission/worker probes, invalid JSON form feedback, missing-species carving fallback and user-facing save notices retain their existing behavior. Existing bound catches already report through returned errors, console diagnostics, worker replies, rejection or their caller's failure callback. Empty promise rejection handlers retain ownership/fallback: art-cache persistence, art build's caller-owned rejection, optional chart preparation, audio resume/gesture restrictions, compile-on-first-use fallback, optional zoo font and version polling. No worker scheduling/fingerprints, art model or retry limit was changed.

## Layer boundary and cycles

`src/rules/layer.test.ts` checks production rules sources, including type imports, import types, re-exports and dynamic imports. It rejects three/render/ui/app/platform module paths and browser DOM names; comments, strings, object keys and locally bound names do not count. Standard cross-platform timing (`performance.now`) remains allowed. This is a source boundary guard, not a security analysis of dynamically computed code.

The loading-mist shape now belongs to rules tuning, and render/loadingFront derives its type from it. `bossBreath`, `dances` and their pure state helpers now live in rules/creatureCues; rendering re-exports preserve callers, and audio no longer imports the rendering modules for those helpers. Formulas and state precedence are unchanged.

`node tools/robustness/rules-layer.mjs` reports this existing 23-file runtime strongly connected component (type-only edges excluded). It was not restructured:

attacks/combatWorld, combat, combat/data, combat/hits, combat/legend, combat/packs, combat/targeting, creatureStates, creatures, growth, leashWeight, legends, momentum, movement, orbit, power, quest, runeOffset, sigilAvoid, spacing, swarm, wildWatch, witch (all under src/rules, .ts).

Other existing runtime components: leylines/party/pulseRoute (3), islandShape/map/paths/zooMap (4), attacks/parse/attacks/timeline (2), game/opening/sigilButton/wakeUp (4). No cycle acceptance or refactor is inferred from the boundary test.
