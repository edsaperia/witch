# tools

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

Scripts for building, checking and measuring the game, run from the repository root. Each directory has a README listing its scripts (from their own header comments, with how to run them).

Do not assume `--help` or `--check` is safe: scripts without a help handler may run their normal workload, and some checks open a browser. Read the entry point and its imports before invoking it. See [the health sweep](health-sweep.md) for checked commands and deferred workloads.

## Root scripts and build helpers

### [`artDependencies.ts`](artDependencies.ts)

Conservative runtime-import graph, shared by cache fingerprints and affected-job tools.

### [`artHash.ts`](artHash.ts)

Legacy global hash for diagnostics/comparison.

### [`artJobFingerprints.ts`](artJobFingerprints.ts)

Per-job roots from the real dispatcher, plus conservative module-initialization inputs.

### [`changelogBatches.ts`](changelogBatches.ts)

Build helper imported by Vite: emits hashed changelog batches and their index; not a standalone command.

### [`creatures.mjs`](creatures.mjs)

The creatures' data, one folder a species, and the index that assembles them.

```
node tools/creatures.mjs list            every species: id, name, template, builder, levels, its folder's files
node tools/creatures.mjs index           writes art/creatures/index.js (the species sorted by id) from the folders
node tools/creatures.mjs check           fails if the index is stale, a folder's record has another id, or a genome has problems
node tools/creatures.mjs adopt           moves any record still written in the old registries (art/genome/species.js's
node tools/creatures.mjs show <id>       everything the game knows about one species, section by section
```

### [`data.mjs`](data.mjs)

The game's split registries besides the creatures': one small file each, assembled by the readers, so builders stop colliding on one shared file.

```
node tools/data.mjs decisions list|check|adopt     the pause page's test sliders and the decisions panel (src/ui/decisions.ts):
node tools/data.mjs flora list|check|adopt         the tree species' genomes (art/flora/genomes.js PLANT_GENOMES): one file a
node tools/data.mjs flora index                     writes art/flora/species/index.js from the folder
node tools/data.mjs areas list|check|adopt         the areas (art/areas/<id>/): recipe.js (art/recipes.js's recipes), kind.json
node tools/data.mjs areas index                     writes art/areas/index.js from the folders
node tools/data.mjs adopt                           every domain's adopt, the creatures' too
node tools/data.mjs check                           every domain's check
```

### [`houseStanding.ts`](houseStanding.ts)

Build helper imported by Vite: packs fixed house uprights into a lossless virtual module; not a standalone command.

### [`inventory.mjs`](inventory.mjs)

The tools' inventory: writes tools/README.md and a README.md in each tools/ directory that has none of its own, from each script's own header comment: its first sentence, and its usage line.

```
node tools/inventory.mjs [--check]
```

## Directories

- [`arrive/`](arrive/README.md): 2 scripts — boot.cjs, time.cjs
- [`art-cache/`](art-cache/README.md): 4 scripts — history.mjs, load.mjs, map.mjs, parity.mjs
- [`art-check/`](art-check/README.md): 4 scripts — affected.mjs, checked-tree.mjs, scope.mjs, shards.mjs
- [`art-check-legacy/`](art-check-legacy/README.md): 0 scripts
- [`art-iterations/`](art-iterations/README.md): 2 scripts — evolutions.js, ladder.mjs
- [`art-lab/`](art-lab/README.md): 1 script — build.mjs
- [`art-style/`](art-style/README.md): 1 script — capture.cjs
- [`attack-look/`](attack-look/README.md): 3 scripts — cost.cjs, sheet.mjs, shots.cjs
- [`attacks/`](attacks/README.md): 7 scripts — audit-report.mjs, audit-screen.mjs, audit.mjs, census-proposal.mjs, compile.mjs, deliveries.mjs, strip.cjs
- [`audio-test/`](audio-test/README.md): 4 scripts — build.mjs, main.ts, run.cjs, stall.ts
- [`balance/`](balance/README.md): 48 scripts — bagstun.mjs, bot-outcomes.mjs, bottrace.mjs, charges.mjs, coach.mjs, coachwatch.mjs, dodgebot.mjs, endgame.mjs, expert-calibrate.mjs, expert-contract.mjs, expert-coverage-screen.mjs, expert-delivery-screen.mjs, expert-diagnostic-trace.mjs, expert-evaluate.mjs, expert-evaluation-core.mjs, expert-guarded-coverage-screen.mjs, expert-known-quest-screen.mjs, expert-progress.mjs, expert-quest-trace.mjs, expert-search-core.mjs, expert-search.mjs, expert-space.mjs, expert-throughput.mjs, fight.mjs, fightbot.mjs, leycross.mjs, lib.mjs, logistics.mjs, lunges.mjs, mapsize.mjs, opening.mjs, playthrough.mjs, pulsegaps.mjs, rangedhit-core.mjs, rangedhit.mjs, rangedreal.mjs, report-core.mjs, report-fixture-sanity.mjs, report-replay.mjs, report-runtime.mjs, report.mjs, runbot.mjs, sim.mjs, states.mjs, stunhits.mjs, survey.mjs, sweep.mjs, waves.mjs
- [`beach/`](beach/README.md): 9 scripts — approach.cjs, bearings.cjs, check.cjs, dolphins-sheet.mjs, dolphins.cjs, gaze-gif.cjs, kraken-sheet.mjs, map.mjs, spot.cjs
- [`behaviour/`](behaviour/README.md): 28 scripts — art-animation.behaviour.ts, art-layout.behaviour.ts, art-motion.behaviour.ts, art-rosettes.behaviour.ts, art-rules.behaviour.ts, camera-comfort.behaviour.ts, camera-travel.behaviour.ts, config.mjs, creatures-finale.behaviour.ts, creatures-motion.behaviour.ts, creatures-placement.behaviour.ts, fixture.mjs, house-canopy.behaviour.ts, house-finds.behaviour.ts, house-travel.behaviour.ts, invites-actors.behaviour.ts, invites-placement.behaviour.ts, legends-fit.behaviour.ts, legends-quests.behaviour.ts, legends-scenery.behaviour.ts, legends-travel.behaviour.ts, music.behaviour.ts, results.mjs, run.mjs, schedule.mjs, ui-preview.behaviour.ts, world-rules.behaviour.ts, world.behaviour.ts
- [`bench/`](bench/README.md): 61 scripts — alloc.mjs, alloc.ts, artmem.cjs, bootstall.cjs, comparable.cjs, compare.cjs, cpuWindow.cjs, crown-cost.cjs, cull-walk.cjs, early-diff.cjs, expect.cjs, fingerprint.ts, frames.cjs, gpu.cjs, ground-compile-variants.cjs, ground-compile.mjs, ground-extra-intel.cjs, ground-extra-parity.mjs, ground-family-map.mjs, ground-family-parity.mjs, ground-parity-scene.mjs, ground.cjs, heapdiff.cjs, hitch.cjs, hold-simulation.cjs, house-cpu-functions.mjs, house-profile-summary.mjs, house-profile.mjs, house-route.cjs, late.cjs, map-prep-intel.mjs, neutral-hunt.cjs, ordinary.cjs, pack-frames.cjs, pack.ts, patterned-blink-fixture.cjs, patterned-camera-completion.cjs, patterned-camera-target.cjs, patterned-completion.cjs, patterned-cpu-window.cjs, patterned-fingerprint.cjs, patterned-input-guard.cjs, patterned-light-cost.cjs, patterned-pass-timer.cjs, perf.ts, rules.ts, run.mjs, scene-state.cjs, spikes.ts, stalls.cjs, travel-budget.cjs, ts.mjs, veil-capture-clock.cjs, veil-laptop-guard.cjs, veil-readback-intel.cjs, veil-readback-model.cjs, viewalloc.cjs, worker-compute-entry.ts, worker-compute.mjs, worker-job-summary.cjs, worker-profile.cjs
- [`biomes/`](biomes/README.md): 2 scripts — sheet.mjs, shots.cjs
- [`body-graph/`](body-graph/README.md): 7 scripts — age-size-audit.mjs, cat-fixtures.js, cats-preview.mjs, diagnostics.mjs, fit-contact-sheets.mjs, fit-size-audit.mjs, size-candidate-audit.mjs
- [`chart/`](chart/README.md): 4 scripts — diff.cjs, emerge.cjs, open.cjs, profile.cjs
- [`checks/`](checks/README.md): 1 script — which.mjs
- [`ci/`](ci/README.md): 19 scripts — annotations.cjs, build-proof-baseline.cjs, install-chromium.cjs, mockingTests.mjs, pages-gc.cjs, pages-policy.cjs, perch-profile.cjs, program-counts.cjs, prune-merged-branches.mjs, release-reuse.mjs, report-command.cjs, run-proofs.cjs, run-unit.mjs, same-game.mjs, sleep-cell-repro.mjs, test-scope.mjs, unit-timings.mjs, vitest-reporter.mjs, world-audit.mjs
- [`combat-spacing/`](combat-spacing/README.md): 6 scripts — body-radii.mjs, capture-fight.cjs, capture.cjs, diagnose.mjs, measure.ts, run.mjs
- [`config/`](config/README.md): 9 scripts — check.mjs, format.mjs, generated.mjs, knob-docs.mjs, linkSwitches.mjs, schema-runtime.mjs, schema.mjs, stampChangelog.mjs, typegen.mjs
- [`creature-bake/`](creature-bake/README.md): 2 scripts — bake.mjs, page.js
- [`creature-mesh/`](creature-mesh/README.md): 12 scripts — clip.mjs, draw.mjs, frames.mjs, index.mjs, make.mjs, page.js, quadruped.js, sheet.mjs, sizes.mjs, slip.mjs, slither.mjs, strike.mjs
- [`dj/`](dj/README.md): 5 scripts — booth-sheet.mjs, booth.cjs, candles-sheet.mjs, respawn.cjs, strip.mjs
- [`docs/`](docs/README.md): 2 scripts — glossary.mjs, tables.mjs
- [`feel/`](feel/README.md): 1 script — trace.cjs
- [`flora/`](flora/README.md): 5 scripts — bush-sheet.mjs, leaf-jitter-shots.cjs, species-sheet.mjs, tuft-sheet.mjs, vignette.mjs
- [`forest/`](forest/README.md): 3 scripts — border-map.mjs, border-stats.mjs, border.cjs
- [`genome/`](genome/README.md): 1 script — compare.mjs
- [`gpu/`](gpu/README.md): 1 script — budget.cjs
- [`ground/`](ground/README.md): 2 scripts — area-frames.cjs, ground-sheet.mjs
- [`hats/`](hats/README.md): 4 scripts — art-shots.cjs, edge-seer-shots.cjs, hats-out-shots.cjs, wardrobe-shots.cjs
- [`hologram/`](hologram/README.md): 1 script — bend.cjs
- [`house/`](house/README.md): 17 scripts — audit-layout.mjs, bedrooms-shots.cjs, dark-shots.cjs, draw-census.cjs, editor-check.cjs, forest-fade.cjs, furniture-sheet.mjs, furniture-shots.cjs, hiz-walk.cjs, oak-shots.cjs, organic.mjs, positions.cjs, rooms-shots.cjs, shot-session.cjs, takeoff.cjs, terrace-lock.cjs, terrace-walk.cjs
- [`islands/`](islands/README.md): 3 scripts — chart.mjs, map.mjs, sheet.mjs
- [`labs/`](labs/README.md): 1 script — publish.mjs
- [`lakes/`](lakes/README.md): 4 scripts — leylines.mjs, looks-map.mjs, looks.cjs, shots.cjs
- [`leash/`](leash/README.md): 9 scripts — arc-shots.cjs, bold-sheet.mjs, chain-shots.cjs, grounded-shots.cjs, route-strip.mjs, runs-gif.cjs, sigil-pass-candidates.mjs, sigil-pass.mjs, stack-shots.cjs
- [`legends/`](legends/README.md): 1 script — footprint.mjs
- [`leylines/`](leylines/README.md): 2 scripts — boot-shots.cjs, win-shots.cjs
- [`lib/`](lib/README.md): 3 scripts — entries.mjs, genomeRecords.mjs, kinds.mjs
- [`lighting/`](lighting/README.md): 1 script — survey.cjs
- [`loan/`](loan/README.md): 1 script — shots.cjs
- [`magic-mock/`](magic-mock/README.md): 3 scripts — budget.cjs, capture.cjs, review.mjs
- [`making-of/`](making-of/README.md): 1 script — build.mjs
- [`map/`](map/README.md): 5 scripts — leycurve.mjs, leydepart.mjs, leyroute.mjs, scenery.mjs, shape.mjs
- [`mist/`](mist/README.md): 2 scripts — dive.cjs, frames.cjs
- [`momentum/`](momentum/README.md): 1 script — strip.mjs
- [`multiplayer/`](multiplayer/README.md): 2 scripts — floorPath.cjs, route.cjs
- [`mushrooms/`](mushrooms/README.md): 9 scripts — brewing-check.mjs, build-preview.mjs, check.mjs, explorer.js, glow-check.mjs, ingame-check.cjs, lab-check.cjs, recipe-book.mjs, sheet.mjs
- [`music-lab/`](music-lab/README.md): 41 scripts — ab.mjs, ab.ts, analyse.cjs, analyse.ts, banger.mjs, banger.ts, bass.mjs, bass.ts, boot.mjs, boot.ts, build.mjs, check.cjs, circles.mjs, circles.ts, cost.cjs, cost.ts, flight.cjs, form.mjs, form.ts, fxcost.cjs, fxcost.ts, haunted.mjs, haunted.ts, heard.mjs, ingredients.ts, lab.ts, latency.cjs, leads.mjs, leads.ts, load.mjs, load.ts, melody.mjs, melody.ts, set.mjs, set.ts, silence.cjs, stems.cjs, stems.ts, tune.cjs, tune.ts, voices.mjs
- [`music-studio/`](music-studio/README.md): 5 scripts — build.mjs, check.cjs, knobs.ts, main.ts, midi.ts
- [`occlusion/`](occlusion/README.md): 1 script — envelope-shots.cjs
- [`opening/`](opening/README.md): 3 scripts — bedroom-budget.cjs, shots.cjs, wake-keys.cjs
- [`overrides/`](overrides/README.md): 1 script — png.ts
- [`playtest/`](playtest/README.md): 1 script — compare.cjs
- [`prebake/`](prebake/README.md): 5 scripts — bake.mjs, coverage.cjs, lightUniforms.cjs, page.ts, treeQuant.mjs
- [`props/`](props/README.md): 1 script — ingame.cjs
- [`qa/`](qa/README.md): 4 scripts — core.cjs, journey.cjs, leash-lake.cjs, win-strip.cjs
- [`rainbow/`](rainbow/README.md): 1 script — shots.cjs
- [`refactor/`](refactor/README.md): 4 scripts — a4-browser-preload.cjs, a4-inventory.mjs, a4-proof-artifacts.cjs, a4-split.mjs
- [`refraction/`](refraction/README.md): 6 scripts — capture-hold.cjs, capture-pair.cjs, depth-coverage.cjs, depth-readback.cjs, foreground.cjs, review-depth-coverage.mjs
- [`relics/`](relics/README.md): 1 script — map.mjs
- [`rig/`](rig/README.md): 4 scripts — demo.cjs, legends.cjs, perf.cjs, strip.mjs
- [`robustness/`](robustness/README.md): 5 scripts — bundle-size.mjs, catch-audit.mjs, measure-log.mjs, measure-recorder.mjs, rules-layer.mjs
- [`roster/`](roster/README.md): 10 scripts — assessments.mjs, audit.mjs, catalogue.mjs, check-model-pack.mjs, compare.mjs, fetch-previews.mjs, pixel-diff.js, poll.mjs, prepare-model.mjs, visual-review.mjs
- [`sail/`](sail/README.md): 4 scripts — bed-shots.cjs, hold.cjs, leak.cjs, swap.cjs
- [`samples/`](samples/README.md): 3 scripts — build.mjs, check.mjs, credits.mjs
- [`settings/`](settings/README.md): 1 script — shots.cjs
- [`sfx/`](sfx/README.md): 9 scripts — audit.cjs, check.mjs, compare.mjs, live.cjs, mix.mjs, mix.ts, render.ts, run.mjs, run.ts
- [`shadows/`](shadows/README.md): 4 scripts — prop-light-shots.cjs, scenery-shots.cjs, trunk-cover.cjs, trunk-walkup.cjs
- [`shot/`](shot/README.md): 10 scripts — contrast.cjs, crown-gap.cjs, crown-look.cjs, crown-whole.cjs, motes.cjs, pixels.cjs, playtest-render.cjs, shot.cjs, stump-diagnostic.cjs, wisps.cjs
- [`shots/`](shots/README.md): 6 scripts — headless.mjs, mask-coverage.mjs, pixels.mjs, push.mjs, run.mjs, still.mjs
- [`sigils/`](sigils/README.md): 2 scripts — legendary-sheet.mjs, sheet.mjs
- [`smoke/`](smoke/README.md): 46 scripts — alarm.cjs, bedroom.cjs, bounce-off.cjs, canopy-hole.cjs, cheer-shots.cjs, creator-menus.cjs, creator.cjs, decide.cjs, dream-way.cjs, dreams.cjs, effects-scene.cjs, flask-stack.cjs, house-bed-start.cjs, hud.cjs, knockdown-bpm.cjs, large-world.cjs, legend-attack.cjs, legend-panel.cjs, legendary-sigil.cjs, legends-flasks.cjs, looks.cjs, magic-dodge.cjs, magic-letters.cjs, magic-sigils.cjs, music-lab-pause.cjs, orbit-combat.cjs, packs.cjs, party-join.cjs, party-life.cjs, partyspell.cjs, pause-on-top.cjs, paused-pixels.cjs, paused-settle.cjs, paused-world.cjs, places.cjs, quick.cjs, room-walk.cjs, smoke.cjs, spell-scroll.cjs, start-screen.cjs, swoop.cjs, trail-cooldown.cjs, trail.cjs, treetop-sigils.cjs, wild-left.cjs, witch-pool.cjs
- [`soundsystem/`](soundsystem/README.md): 3 scripts — build-preview.mjs, ingame.cjs, sheet.mjs
- [`stall/`](stall/README.md): 1 script — sail-takeoff.cjs
- [`stars/`](stars/README.md): 1 script — shots.cjs
- [`stations/`](stations/README.md): 1 script — check.cjs
- [`studio/`](studio/README.md): 1 script — check.cjs
- [`telephone/`](telephone/README.md): 1 script — panel-input-proof.cjs
- [`telescope/`](telescope/README.md): 3 scripts — moon.cjs, ready.cjs, shots.cjs
- [`view/`](view/README.md): 9 scripts — build-budget.cjs, chart-target.cjs, coast-first-use.cjs, landing-limit-preload.cjs, sail-timing.cjs, start-hold.cjs, travel-failure.cjs, travel-probe.cjs, worker-checkpoint.cjs
- [`voice/`](voice/README.md): 2 scripts — chimera-notes.mjs, sing.mjs
- [`witch/`](witch/README.md): 10 scripts — bags-sheet.mjs, brooms-gif.mjs, brooms-sheet.mjs, hats-sheet.mjs, longwear-sheet.mjs, nightie-sheet.mjs, slider-audit.mjs, sliders-sheet.mjs, thickness-sheet.mjs, walk-sheet.mjs
- [`workshop/`](workshop/README.md): 2 scripts — parts-sheet.mjs, shots.cjs
- [`zoo/`](zoo/README.md): 7 scripts — coasts.cjs, map.mjs, order.mjs, perf.cjs, shots.cjs, trees.cjs, versailles-tall-mock.cjs

## Nested scripts and browser entries

- [`music-lab/live/build.mjs`](music-lab/live/build.mjs)
- [`music-lab/live/main.ts`](music-lab/live/main.ts)
- [`music-lab/live/player.ts`](music-lab/live/player.ts)
- [`music-lab/live/ptWorker.ts`](music-lab/live/ptWorker.ts)
- [`music-lab/live/settings.ts`](music-lab/live/settings.ts)
- [`shots/scenarios/dodge.mjs`](shots/scenarios/dodge.mjs)
- [`shots/scenarios/refraction.mjs`](shots/scenarios/refraction.mjs)
- [`voice/fof/build.mjs`](voice/fof/build.mjs)
- [`voice/pink-trombone/Noise.js`](voice/pink-trombone/Noise.js)
- [`voice/pink-trombone/index.js`](voice/pink-trombone/index.js)
- [`voice/tract/build.mjs`](voice/tract/build.mjs)
- [`voice/tract/worklet.js`](voice/tract/worklet.js)
