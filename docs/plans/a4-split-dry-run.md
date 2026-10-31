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

First implementation checkpoint: 132 named bodies/statements across 16 source
files, with two derived link-switch location files. Replay measured 1,529.8 ms;
identity check 113.7 ms. These are script timings, NOT total fence costs.
Every source/body hash is in `a4-dry-run-manifest.json`. All 132 bodies reverse
exactly. Config freshness gate passed after updating moved switch locations.

This is still WIP: full source/type/unit/bench validation is pending. The page
composition retains boot state declarations and several arrow-function initializers;
further thinning and callback adapter review remain before proof readiness.
Private View fields remain private, exposed to extracted bodies through an explicit
private getter/setter bridge; the bridge's type uses indexed member types and no
`any`. The class's existing callable methods remain forwarding boundaries.

No typecheck/full-unit/bench or browser run yet. No local slot or production fence.
No completed behavioural proof or measured full fence-cost claim.
No user-visible text changed.
