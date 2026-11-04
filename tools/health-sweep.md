# Tools health sweep — 2026-11-04

Source: prototype `483801b44`; H2 coordinator brief `1476#6619102474`. No gameplay, art, on-screen text, cache or worker changes.

## Method and limits

Inventoried 472 tracked non-test JavaScript/TypeScript files recursively, parsed each with the installed TypeScript parser, and checked relative static import/export targets. Found 0 parse errors and 0 missing relative static targets. This does not prove dynamic imports, external packages, browser globals, output paths or historical fixtures work.

No script has an explicit `--help` or `--dry-run` handler. Unsupported flags are not a dry run. The table is static triage, not a claim that every deferred script is broken or safe to execute. Browser, rendering, simulation, export, build, publishing and network workloads were not invoked.

Reviewed read-only commands: `node tools/inventory.mjs --check`, `node tools/data.mjs decisions check`, and `node tools/config/check.mjs` (format, schema, typegen, link switches, glossary, tables, inventory, generated-file reference). The schema reader uses Vite middleware mode without a listening port. Check results are recorded on the owning PR.

Known deferred stale tool: `tools/view/landing-limit-preload.cjs` checks the 15.5 s landing limit removed by open #1770. Leave it unchanged until #1770 merges, then its landing owner can update or retire the assertion. `tools/legends/footprint.mjs --check` still opens Chromium; it is not a safe offline check.

Fixed index omissions: root commands/build helpers and nested browser/audio/build entries now appear in the generated root index. Two existing root build helpers use inventory notes rather than changing their fingerprinted source. No test expectation, timing limit or gameplay behavior was relaxed.

## Per-file disposition

| File | Execution / deferral reason |
|---|---|
| `tools/arrive/boot.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/arrive/time.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/art-cache/history.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/art-cache/load.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/art-cache/map.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/art-cache/parity.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/art-check/affected.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/art-check/checked-tree.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/art-check/scope.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/art-iterations/evolutions.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/art-iterations/ladder.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/art-lab/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/art-style/capture.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/artDependencies.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/artHash.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/artJobFingerprints.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/attack-look/cost.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/attack-look/sheet.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attack-look/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/attacks/audit-report.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attacks/audit-screen.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attacks/audit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attacks/census-proposal.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attacks/compile.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/attacks/deliveries.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/attacks/strip.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/audio-test/build.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/audio-test/main.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/audio-test/run.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/audio-test/stall.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/bagstun.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/bot-outcomes.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/bottrace.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/balance/charges.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/coach.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/coachwatch.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/dodgebot.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/endgame.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-calibrate.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-contract.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-coverage-screen.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-delivery-screen.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-diagnostic-trace.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-evaluate.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-evaluation-core.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-guarded-coverage-screen.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-known-quest-screen.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-progress.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-quest-trace.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-search-core.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-search.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/expert-space.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/expert-throughput.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/fight.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/fightbot.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/leycross.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/balance/lib.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/logistics.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/mapsize.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/balance/opening.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/playthrough.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/pulsegaps.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/report-core.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/report-fixture-sanity.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/report-replay.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/balance/report-runtime.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/report.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/runbot.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/sim.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/states.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/stunhits.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/survey.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/balance/sweep.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/balance/waves.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/beach/approach.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/bearings.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/dolphins-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/dolphins.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/gaze-gif.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/kraken-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/map.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/beach/spot.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/behaviour/config.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/behaviour/creatures-finale.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/creatures-motion.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/creatures-placement.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/fixture.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/invites-actors.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/invites-placement.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/music.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/results.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/behaviour/run.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/schedule.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/behaviour/world-rules.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/behaviour/world.behaviour.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/bench/alloc.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/bench/alloc.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/artmem.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/bootstall.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/comparable.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/compare.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/crown-cost.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/cull-walk.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/early-diff.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/expect.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/fingerprint.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/frames.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/gpu.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ground-compile-variants.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/ground-compile.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ground-extra-intel.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ground-extra-parity.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ground-family-map.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/bench/ground-family-parity.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ground-parity-scene.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/ground.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/heapdiff.cjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/bench/hitch.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/hold-simulation.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/house-cpu-functions.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/house-profile-summary.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/house-profile.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/house-route.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/late.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/map-prep-intel.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/neutral-hunt.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/ordinary.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/pack-frames.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/pack.ts` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/bench/perf.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/rules.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/run.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/bench/scene-state.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/spikes.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/stalls.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/travel-budget.cjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/bench/ts.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/bench/viewalloc.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/worker-compute-entry.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/worker-compute.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/bench/worker-job-summary.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/bench/worker-profile.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/biomes/sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/biomes/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/body-graph/age-size-audit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/body-graph/cat-fixtures.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/body-graph/cats-preview.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/body-graph/diagnostics.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/body-graph/fit-contact-sheets.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/body-graph/fit-size-audit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/body-graph/size-candidate-audit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/changelogBatches.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/chart/diff.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/chart/emerge.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/chart/open.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/chart/profile.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/ci/annotations.cjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/build-proof-baseline.cjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/pages-policy.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/ci/report-command.cjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/run-proofs.cjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/run-unit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/same-game.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/sleep-cell-repro.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/test-scope.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/unit-timings.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/ci/vitest-reporter.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/ci/world-audit.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/combat-spacing/body-radii.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/combat-spacing/capture-fight.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/combat-spacing/capture.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/combat-spacing/diagnose.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/combat-spacing/measure.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/combat-spacing/run.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/config/check.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/config/format.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/config/generated.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/config/knob-docs.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/config/linkSwitches.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/config/schema.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/config/typegen.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/creatures.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/data.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/dj/booth-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/dj/booth.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/dj/candles-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/dj/respawn.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/dj/strip.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/docs/glossary.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/docs/tables.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/feel/trace.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/flora/bush-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/flora/leaf-jitter-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/flora/species-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/flora/tuft-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/flora/vignette.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/forest/border-map.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/forest/border-stats.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/forest/border.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/genome/compare.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/gpu/budget.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/ground/area-frames.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/ground/ground-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/hats/art-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/hats/edge-seer-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/hats/hats-out-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/hats/wardrobe-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/hologram/bend.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/audit-layout.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/house/bedrooms-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/dark-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/draw-census.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/house/editor-check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/forest-fade.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/furniture-sheet.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/house/furniture-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/hiz-walk.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/oak-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/organic.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/house/positions.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/rooms-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/shot-session.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/takeoff.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/house/terrace-lock.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/houseStanding.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/inventory.mjs` | Read-only command reviewed; see executed checks below. |
| `tools/islands/chart.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/islands/map.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/islands/sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/labs/publish.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/lakes/leylines.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/lakes/looks-map.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/lakes/looks.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/lakes/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/arc-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/bold-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/chain-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/grounded-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/route-strip.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/runs-gif.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leash/sigil-pass-candidates.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/leash/sigil-pass.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/leash/stack-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/legends/footprint.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leylines/boot-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/leylines/win-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/lib/entries.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/lib/genomeRecords.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/lib/kinds.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/lighting/survey.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/loan/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/magic-mock/budget.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/magic-mock/capture.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/magic-mock/review.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/making-of/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/map/leycurve.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/map/leydepart.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/map/leyroute.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/map/scenery.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/map/shape.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mist/dive.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mist/frames.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/momentum/strip.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mushrooms/brewing-check.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mushrooms/build-preview.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/mushrooms/check.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/mushrooms/explorer.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/mushrooms/glow-check.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mushrooms/ingame-check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mushrooms/lab-check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/mushrooms/recipe-book.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/mushrooms/sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/ab.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/ab.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/analyse.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/analyse.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/boot.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/boot.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/music-lab/check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/circles.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/circles.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/cost.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/cost.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/flight.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/form.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/form.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/music-lab/fxcost.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/fxcost.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/ingredients.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/lab.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/latency.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/live/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/music-lab/live/main.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/live/player.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/live/ptWorker.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/live/settings.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/set.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/set.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/silence.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/stems.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/stems.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/tune.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-lab/tune.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-lab/voices.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-studio/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/music-studio/check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/music-studio/knobs.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/music-studio/main.ts` | Browser/render workload; no browser allocation in this task. |
| `tools/music-studio/midi.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/occlusion/envelope-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/opening/bedroom-budget.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/opening/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/opening/wake-keys.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/overrides/png.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/playtest/compare.cjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/props/ingame.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/qa/core.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/qa/journey.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/qa/leash-lake.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/qa/win-strip.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/rainbow/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/refraction/capture-hold.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/refraction/capture-pair.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/refraction/depth-coverage.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/refraction/depth-readback.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/refraction/foreground.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/refraction/review-depth-coverage.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/relics/map.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/rig/demo.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/rig/legends.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/rig/perf.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/rig/strip.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/robustness/bundle-size.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/robustness/catch-audit.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/robustness/measure-log.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/robustness/measure-recorder.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/robustness/rules-layer.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/roster/assessments.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/roster/audit.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/roster/catalogue.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/roster/check-model-pack.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/roster/compare.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/roster/fetch-previews.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/roster/pixel-diff.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/roster/poll.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/roster/prepare-model.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/roster/visual-review.mjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/sail/bed-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sail/leak.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sail/swap.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/samples/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/samples/check.d.mts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/samples/check.mjs` | CLI/configured workload without a verified help/dry-run handler; static inspection only. |
| `tools/samples/credits.d.mts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/samples/credits.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/settings/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/audit.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/check.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/compare.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/live.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/mix.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/mix.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/sfx/render.ts` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/sfx/run.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sfx/run.ts` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/shadows/prop-light-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shadows/scenery-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shadows/trunk-cover.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shadows/trunk-walkup.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/contrast.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/crown-gap.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/crown-look.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/crown-whole.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/motes.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/pixels.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/playtest-render.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/shot.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/stump-diagnostic.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shot/wisps.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/shots/push.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/sigils/legendary-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/sigils/sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/alarm.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/bedroom.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/bounce-off.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/canopy-hole.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/cheer-shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/creator-menus.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/creator.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/decide.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/dream-way.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/dreams.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/effects-scene.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/smoke/flask-stack.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/house-bed-start.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/smoke/hud.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/knockdown-bpm.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/large-world.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/legend-attack.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/legend-panel.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/legendary-sigil.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/legends-flasks.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/looks.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/magic-dodge.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/magic-letters.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/magic-sigils.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/music-lab-pause.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/orbit-combat.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/packs.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/party-join.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/party-life.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/partyspell.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/pause-on-top.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/paused-pixels.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/smoke/paused-settle.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/paused-world.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/places.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/quick.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/room-walk.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/smoke.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/spell-scroll.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/start-screen.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/swoop.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/trail-cooldown.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/trail.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/treetop-sigils.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/wild-left.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/smoke/witch-pool.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/soundsystem/build-preview.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/soundsystem/ingame.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/soundsystem/sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/stars/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/stations/check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/studio/check.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/telescope/moon.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/telescope/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/build-budget.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/chart-target.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/coast-first-use.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/landing-limit-preload.cjs` | Deferred until #1770 lands: checks the retiring 15.5 s landing cutoff. |
| `tools/view/sail-timing.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/start-hold.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/travel-failure.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/view/travel-probe.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/view/worker-checkpoint.cjs` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/voice/fof/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/voice/pink-trombone/Noise.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/voice/pink-trombone/index.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/voice/sing.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/voice/tract/build.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/voice/tract/worklet.js` | Imported helper or browser/bundler entry; standalone invocation is not a supported dry run. |
| `tools/witch/bags-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/brooms-gif.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/brooms-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/hats-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/longwear-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/nightie-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/slider-audit.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/sliders-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/thickness-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/witch/walk-sheet.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/workshop/parts-sheet.mjs` | Writes output or starts a child/server; no verified help/dry-run handler. |
| `tools/workshop/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/coasts.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/map.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/order.mjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/perf.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/shots.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/trees.cjs` | Browser/render workload; no browser allocation in this task. |
| `tools/zoo/versailles-tall-mock.cjs` | Browser/render workload; no browser allocation in this task. |
