# A4 mechanical split: cut-line proposal

Owner: Codex chat `01a19366-12da-7cc0-a12c-d252489911ae`.
Branch: `codex/a4-split-dry-run`; worktree: `work/a4-split-dry-run`.
Parent: #1555; authority: #1476 comment 6547931247 and #1555 comment 6547641785.
Starting prototype: `ea42af826` (exact full SHA recorded in the dry-run manifest).

## Gate and scope

This is a proposal for coordinator approval, then a scripted mechanical rehearsal.
The production fence is NOT open. No behavioural changes, expected-change bench
declaration, merge, release, or edits in another builder's worktree are included.
The latest coordinator ruling supersedes the original brief's wait for playtest
fixes: once proof passes, the coordinator announces the approximately two-hour
fence and this script is rerun against then-current prototype.

## Main composition cut lines

Keep boot parameter parsing, ordered construction, and the final composition in
`src/main.ts`. Extract named concerns into new modules, preserving execution and
listener registration order. Use explicit typed host interfaces with live getters
and setters for mutable page state; never snapshot the current night. Keep the
existing `N()` lookup and mutation/recording boundaries.

| New app module | Existing symbols or exact concern |
| --- | --- |
| `pagePause.ts` | `openPotionLab`, `openMusicLab`, `pauseControls`, `freeze.onToggle`, `updatePauseMenus`; freeze callbacks installed at their original composition point |
| `pageStations.ts` | station callbacks, `findsCtx`, `workshopNow`, `useHouse`, `shutStation`; preserve the callback mutation labels and lazy owned-state reads |
| `pageNight.ts` | `bedFirst`, `arrived`, `wakeArrival`, `wakeFirst`, `sailFromChart`, `recordSail`, `departFromChart`, `sailInPlace`, `makeSailNight`, `warmAt`, `newNight`, `nightInPlace`, `leaveBot`; keep async sequencing and fallback paths verbatim |
| `pageFinds.ts` | `lendFind`, `settleLoan`, `settleLoanNow`, `startDream`, `herHead`, `stepGuide`; all loan/guide state remains live |
| `pageDebug.ts` | repro/diagnostic installation and the `window.witch` extension block following `installHooks`; preserve conditional lazy imports and console mutations |
| `pageFrame.ts` | `drawFrame`, `frame`, `frameBody`, `overlayHead`, frame counters and requestAnimationFrame scheduling; ordered frame body remains one verbatim unit |
| `pageBuildNotice.ts` | `NewBuildNotice`, menu-gone state and its callbacks; compose through the pause host |

Online/telephone work belongs to #1538. Do not invent or relocate its unmerged
hooks: ask the coordinator to identify its final integration symbols before the
fenced rerun. Existing app modules are reused, not duplicated.

## View cut lines

Existing `view/camera.ts`, `home.ts`, `lights.ts`, `frameUniforms.ts`, `scenery.ts`
already own much of the requested layer split. Extend that structure rather than
create a competing renderer. Keep the `View` export, constructor, all public
members, defaults, getter/setter semantics and method call signatures unchanged.

| New view module | Methods moved behind identical View forwarding methods |
| --- | --- |
| `frame.ts` | complete `render` body; retain exact time/quality/layer/post order |
| `houseFrame.ts` | `houseTilt`, `behindHouse`, `occluders`, `ensureCrown`, `buildHome`, `swapHomeArt` |
| `markers.ts` | `legendRings`, `pin`, `inviteStart`; delegate existing home marker drawings unchanged |
| `atmosphere.ts` | `updateMoon`, `updateSteam`, `updateSmoke`; reuse existing lights/frameUniforms |
| `readiness.ts` | `readyPrograms`, landing shader grace/readiness methods, `compileAll`, `gpuCaughtUp`, `warmDraws`, `warmSteps`, `setReadiness` |
| `lifecycle.ts` | `build`, `prepare`, `treeExtent`, `askIsland`, `setGameSteps`, `retype` |
| `viewport.ts` | `scenePixelSize`, `resize`, `screenOf`, `aimAt`; reuse existing camera update |

Use module-local typed structural contexts for private state. Do not make private
members public, use `any`, introduce prototype patching, or add a runtime import
cycle. Type-only references to View are safe. Shared constants move only when
their initialization order and singleton identity are preserved. Post construction
and invocation remain at their existing positions in lifecycle/frame respectively.

## Script and proof contract

1. Script records exact source SHA, source hashes, named extraction boundaries,
   byte/line counts, and public API inventory. Abort on missing/ambiguous anchors,
   an unexpected source hash or an existing destination; never guess a cut.
2. Extract source slices without rewriting their bodies; explicitly inventory the
   limited adapter changes (imports, host access, delegating wrappers). Verify each
   moved body against its source after reversing only those declared adapters.
3. Script supports check-only and apply; second apply refuses, while check-only
   verifies already generated results. Record preparation/apply/check wall times.
4. Run `npm run typecheck`, `npm test`, and `npm run bench:quick`, with zero expected
   changes. Record exact source SHA for every run, rules/frame fingerprints,
   command output, exit codes and wall times. CI checks are additional evidence,
   never a substitute for an unrun requested local command.
5. The original brief also requires smoke and art identity for the actual split.
   Ask coordinator to allocate those gates explicitly; do not report them proved
   by unit/bench success. No source shader/art/rules changes are intended.
6. Before *any* heavy local check, obtain a fresh canonical serial CPU/GPU slot,
   FREE evidence, input idle >=5 min and no Ed game tab. Headless browser only;
   each capture <=270 s. Stop at a safe checkpoint if Ed returns; post SLOT DONE.

## Fence estimate and risks

Budget proposal (not measured): 10 min fresh-base/ownership check, 15 min apply
and adapter review, 60 min serial proof, 20 min coordinator integration/review,
15 min reserve = 120 min. Replace these numbers with measured rehearsal costs.
If the allocated proof cannot fit, report that before opening the fence.

Main risks are lexical closures and mutable state, async night replacement,
private View state, lazy import timing, shader initialization, and conflicting
unmerged edits (#1538, #1543, #1545). They are reasons for strict anchors and
identity evidence, not permission to change behaviour or waive a gate.

## Rehearsal checkpoint (2026-10-31)

Coordinator approval: #1476 comment 6548060224, acknowledged on #1562 comment
6548140613. Cut lines approved. Preserve #1538's station/presentation call sites;
do not move #1543/#1545's owned files. Smoke and art identity remain mandatory,
but release CI supplies those gates; no local smoke/art run is requested.

`node tools/refactor/a4-split.mjs --apply` performs the first extraction;
`--check` verifies generated hashes and reverses every declared body adapter to
the exact source slice at the pinned SHA. `--replay` rereads that same source SHA
and refuses to overwrite any generated file that differs from its manifest.
Default evaluation and async boundaries remain in one place. Import-only symbol
binding uses no libraries or module graph and runs no game typecheck.

Latest implementation checkpoint: 149 named bodies/statements across 16 source
files, with two derived link-switch location files. Replay measured 2,086.3 ms;
identity check 240.9 ms. These are script timings, NOT total fence costs.
Every source/body hash is in `a4-dry-run-manifest.json`. All 149 bodies reverse
exactly. Config freshness gate passed after updating moved switch locations.
View's public signatures/defaults/field initializers also match syntactically
(the async boundary moves into its implementation, retaining the Promise type).
Isolated esbuild transforms validate all generated files without a graph/build.

CI on first source checkpoint `2fb88b022` failed: generated `view` parameter
collided with the existing `const view = this` alias in `buildHome`. The script
now uses collision-checked host names and classifies lexical this-aliases. Private-
only aliases receive the private live bridge; public aliases keep their View.
This repaired rehearsal passes isolated transforms; CI on its new head is needed.

CI on `677d0eace` subsequently passed build, smoke, largest-world art and the
no-declaration bench, but its full unit run failed 1/3,025 tests: the existing
`viewSetGame.test.ts` uses `Object.create(View.prototype)` to avoid WebGL, bypassing
the new eager private bridge field. The bridge is now a private lazy accessor
cached in a module WeakMap, so prototype stand-ins retain their original support
without changing constructor defaults or the test. Focused command
`npx vitest run src/render/viewSetGame.test.ts src/app/pageComposition.test.ts --maxWorkers=1`
passes 6 tests in 35.86 s (4.53 s test execution); no game typecheck/full local
suite/benchmark was run. This is repair evidence, not fresh full-suite proof.

This is still WIP: full source/type/unit/bench validation is pending. The page
composition retains boot state declarations and some initializers;
further thinning and callback adapter review remain before proof readiness.
Private View fields remain private, exposed to extracted bodies through an explicit
private getter/setter bridge; the bridge's type uses indexed member types and no
`any`. The class's existing callable methods remain forwarding boundaries.

No typecheck/full-unit/bench or browser run yet. No local slot or production fence.
No completed behavioural proof or measured full fence-cost claim.
No user-visible text changed.

After coordinator ruling #1476 comment 6548948298, merged prototype
`5b6fcf427a02139b6f531a7a6aba799986e635de` (v6703 release lineage). Both cut
source files are byte-identical to the previous source baseline. The rehearsal
now pins that prototype SHA and records the previous source SHA in sourceHistory.
`--replay --adopt-source=<merged commit>` verifies ancestry and both source hashes
before accepting updated derived switch-location metadata; a changed main/view
source is refused for explicit cut review, never silently replayed.

CI on `76d19f24f` passed all 502 unit files / 3,025 tests, then typecheck failed
with TS2341 in readiness.ts: the background generator receives `this` through a
typed `View` parameter, an alias the first script did not recognize. Immediate
callback parameters supplied the current `this` are now tracked by lexical symbol
and their private reads use the live bridge. Two isolated tooling regressions
(`node --test tools/refactor/a4-split.test.mjs`, 453 ms) pass: the actual generated
guard respects private accessibility, and its actual generator cancels between
program slices when the epoch changes. This is not the full game typecheck; that
gate remains for fresh CI and the requested local proof slot.

Focused regression file: `npx vitest run src/app/pageComposition.test.ts --maxWorkers=1`
passes four cases (13.95 s including imports, 23 ms of tests): retained callback
reads the replacement night, manual frames only schedule, draw errors preserve
timing accounting, and an epoch change cancels a stale sliced home build. First
restricted run failed before test collection with Windows temporary-file rename
EPERM; rerunning with normal file access passed. Node's expected unavailable-save
storage warning was printed; it was not hidden or treated as a browser result.

## Allocated proof checklist (not executed)

- Obtain the existing requested slot from #1476. Check its actual FREE evidence,
  current five-minute input idle and no game tab; stop safely if Ed returns.
- Pin source and tested head SHAs in the report before any build. The original
  baseline is the manifest's sourceCommit, not a remembered version label.
- Run `npm run typecheck` and `npm test` serially, retaining complete output,
  exit codes and elapsed times. The focused regression run is not either gate.
- Build baseline and head separately, with their real `WITCH_SHA`; verify each
  served `version.json` against that SHA before its `npm run bench:quick`.
  Do not reuse an unrelated existing dist or server. Compare complete outputs
  with `node tools/bench/compare.cjs <before> <after>` and no --expect/--override.
- The stock frames driver contains waits longer than the laptop policy permits.
  Any local invocation must have an outer process-tree bound of <=270 seconds
  for each browser capture; timeout means incomplete proof, never a pass. The
  comparison tool also launches headless Chromium and needs the same bound.
- Post SLOT DONE and exact results. Only after proof passes does the coordinator
  announce the fence and the source/ownership check run again on latest prototype.
  Release CI must still certify identical smoke/art; no local smoke/art run.
