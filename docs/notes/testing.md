# Testing tools

**Shared still capture harness** (#1556, canonical #1555, 2026-10-31):
`tools/shots/still.mjs` loads a caller-owned allocated page, verifies its served
version, seeds random and catches the manual hook before the game steps. Wall
clocks stay live until ready, then monotonic/epoch clocks are pinned separately
and advance only with explicit steps. Loading mist remains a wall-time loading
overlay in production; captures hold it through pinned time and prepared-scene
redraw. Scenery budget already uses elapsed wall time; uGlowR follows camera
geometry. No production budget/potion/animation freeze was added.

```js
export async function run({ page, loadStill, url, expectedSha, output }) {
  const capture = await loadStill(page, { url, expectedSha });
  try {
    await capture.step(60);
    await capture.compare({
      output,
      read: () => window.witch.view.post.refractionEnabled,
      write: on => { window.witch.view.post.refractionEnabled = on; },
      validate: () => {
        if (!window.witch.view.post.refraction.count) throw Error('No live form');
      },
      actors: w => [w.view.witchBatch.meshes, w.view.bareBatch?.meshes ?? []],
    });
  } finally { await capture.release(); }
}
```

The harness prepares ON once, then holds View updates and redraws existing Post
at the same game/personal clock. It warms a screenshot and gives each screenshot
120 seconds. Decoded OFF-return must equal OFF exactly: any changed pixel fails
and writes its diff first. Teardown restores render descriptors (including runner
wrappers), actors, toggle, manual mode, clocks and random. Nested holds/clock
advancement fail. Actor masks hide actual prepared groups/meshes while updates
are held, so SpriteBatch.set cannot undo hiding. Positive threshold/envelope are
recorded; empty masks fail. Effect/actor overlap and acceptance need real review.

`pixels.mjs` validates CRC/filters for non-interlaced 8-bit RGB/RGBA screenshots,
counts differing pixels (including alpha), max delta and inclusive bounds, and
writes amplified PNG/side-by-side. Dimensions/unsupported PNGs fail. Explicit
cross-build exclusions are recorded; OFF-return accepts none. Served version.json
has seven SHA characters, not a full-SHA endpoint: also verify the CI artifact.

`run.mjs`/`headless.mjs` require a real canonical grant and exact SHA, prior FREE
comment, input idle>=5min and no-game-tab checks <=60s old, expiry and <=270s
duration. Evidence is not self-issued permission. They own one fresh headless
Chromium BrowserServer, reserve teardown time and enforce an owned-process kill
deadline. slot-receipt.json records PID/closure/failure; operator FREE verification
and SLOT DONE are still required. No Ed browser/profile, automatic browser install
or cloud-runner assumption. A canonical-approved Chromium-family executable can
be named by chromiumExecutable in the evidence (fresh owned headless process and
profile, never Ed's existing window). The caller supplies a Playwright runtime:

```text
node tools/shots/run.mjs SCENARIO URL FULL_SHA OUTPUT ACTUAL_SLOT_JSON PLAYWRIGHT_MODULE [SCENARIO_OPTIONS_JSON]
```

The dodge scenario uses captureVisible, not the invalid mesh.hide+View.update
OFF method. If true default visibility is still zero, same-prepared-frame
diagnostics isolate motes/ribbons, tone levels and draw order, then restore them;
no alpha change is assumed. prepareFrame:false refuses a stale/unprepared clock.
The refraction scenario wraps its still-owned driver by explicit path/SHA and
measures witch and real-creature masks inside the plume. Migrate #1543/#1542 drivers only AFTER their
PRs merge. Publication remains tools/shots/push.mjs.

Bench declaration: camera/canopy frames intentionally change at non-60Hz and
repeated timestamps. .35/.06 and .08 coefficients match a 1/60s step; tests cover
60/144Hz and equal-total-time partitions. Both use her interpolated clock and
reset the timestamp with the night. Canopy's last-metre snap is after the step,
up to one 60Hz frame earlier at that boundary, to preserve partition behavior.
No extra pass/texture/draw calls and no measured cost/visual acceptance claim.
Allocated bench/captures remain pending. Nearby checks are renderEasing and
tools/shots pixels/still/headless tests; fake Chromium/timers launch no browser.

Sleeping-legend size regression (PR1570, canonical1476#6550319134): full featheredserpent/marten sprite checks run on the existing `sleeping-legends` art task's awake reference and two breath frames, both facings. The original height, occupied bottom row, finite normals, forbidden eye/glow materials, ground/origin and distinct-breath assertions live in `art/checks/sleepingLegendSize.js`; `src/sleepingLegendSize.test.ts` uses tiny valid/invalid fixtures to pin each condition without duplicate expensive generation. The art task retains the original explicit bold/game-style/configured-pixel inputs and reports stage times. No test timeout is increased. See `docs/reports/sleeping-legend-test-cost.md` for measured before/after evidence and its limits.

Current execution ownership (2026-10-31): builders run typecheck and nearby tests with one worker, plus the art check when art is touched, subject to the coordinator's browser allocation. The coordinator owns combined full-suite/smoke/browser acceptance. The historical “builders before a FINAL” full-smoke instruction below is superseded by CLAUDE.md's Builders and the coordinator section.

CI now builds one `game-dist` artifact per tested revision. Main deploy has priority before checks; PR preview publication runs beside checks after build. Unit selection is `tools/ci/run-unit.mjs`, with conservative full fallback; smoke, largest-world proof and benchmark head reuse the build. Version labels use CI run number with no offset; always verify the served SHA for browser checks. See `.github/workflows/ci.yml` for the exact gates.

The [2026-10-31 CI flake audit](../reports/ci-flakes-2026-10-31.md) records original and rerun evidence, separately from deterministic failures and cancellations. It does not authorize another rerun or a timeout increase.

CI failure reporting uses `tools/ci/annotations.cjs` for20 detail annotations per job plus one totals annotation, without truncating logs/artifacts or changing check exit codes. Vitest retains its default reporter plus an extra CI reporter; art/smoke/config commands stream their full output through the diagnostic wrapper. `node --test tools/ci/reporting.test.cjs` exercises synthetic failures and checked-tree proof safety without loading the game.

Release art checks now use the same successful task fingerprints as ordinary PRs, with full fallback on unknown analysis. Prototype/main pushes may reuse a successful same-repository Art check's exact checked Git tree and matching environment proof artifact; missing/expired/mismatched proof falls back to checking. PR title/body edits do not re-run CI/art. Proofs are new, so historical checks without them remain conservative misses. Measured release timing acceptance is separate from these policies.

Effects-off/on smoke scenes (`ONLY=effects-off,effects-on`) now wait for complete island art, forest and ground, idle art jobs, requested flight mode and actual drawing (>20 trees, at least one batch, >15 draw calls). They require >40 six-bit canvas colours, the existing quick-smoke nonblank criterion, before holding that frame for its screenshot. Readiness counters alone cannot accept a black frame. This proves a complete, nonblank scene; it does not claim pixel parity or measure the visual strength of each effect. Canonical base/candidate cloud comparisons remain coordinator-owned.

### Sleep-cell ownership invariant (A7 audit, 2026-10-30; diagnosed 2026-10-31)

PR #1496 exposed a raw-cell assertion failure using the largest shipped home world: game seed `123`, world `0`, shape seed `1063814361`, all 64 found kinds (64 roster areas plus home). Newt `#18` physically sleeps in cell `21,12`, while its ownership cell `c.cell` is `21,11`. These are intentionally one logical area: Ed's 2026-10-26 legend-area design gives an extra legend cell the ownership of its paired playable cell (`map.legendAreas`, `areaOf`, `sameArea`). The old test and diagnostic incorrectly required physical cell equality.

Reproduce without a browser: `node tools/ci/sleep-cell-repro.mjs all` reports raw physical differences and actual logical ownership mismatches at spawn, new-game initialization, before-party and lost-night stages for the largest, four-area and radius fixtures. Exit `1` means a logical mismatch or an invalid physical-cell exception. A raw difference is accepted only for a legend or its circle baby physically in the explicit legend cell paired to its assigned cell; unrelated areas still fail. `src/rules/sleepCells.test.ts` preserves the exact 14 IDs/roles, checks each pairing, and includes negative cases. No production rules or tuning change is required.

The staged proof finds the same 14 raw differences already at initial placement and through both sleep states, with zero logical mismatches. Each row is a boss legend followed by its circle baby. The four-area (5 cells including home) and radius (98 cells) fixtures have zero raw and logical differences at all four stages:

| Species and IDs | Assigned cell | Actual cell |
|---|---|---|
| newt 18, 19 | 21,11 | 21,12 |
| snowleopard 34, 35 | 19,12 | 20,11 |
| fennec 86, 87 | 18,13 | 18,11 |
| squirrel 164, 165 | 22,14 | 22,13 |
| lion 185, 186 | 15,15 | 13,14 |
| polarbear 454, 455 | 19,20 | 19,21 |
| moth 485, 486 | 22,20 | 21,21 |

PR #1516's approved PLAN and staged proof establish a test/diagnostic contract correction, not a game sleep bug. Legends are placed by `spawnCreatures`/`legendSpot` and their babies by `pointInCircle` in the extra legend area while retaining the paired ownership cell. `bedOf` preserves the lair or chooses the same circle; sleep introduces no ownership violation. Seven species appear because this world deals seven legends. Future failures must still distinguish physical and logical cells and must not ignore bosses or circle babies indiscriminately.

Fixture limit found during the audit: `legendShare.test.ts` must retain a roster-free radius map. `map.ts` applies `legends.share` through `chooseLegendCells` only in that mode; authored islands deliberately deal their own legends. A trial using the largest authored island therefore exercised a different policy (including 13 legends at share 1), not a newly identified rules defect. The original fixture and all its assertions remain intact.

Frame benchmark startup (#1493): `tools/bench/frames.cjs` installs a synchronous `window.witch` assignment interceptor before game scripts run, setting the existing manual hook before the first live RAF on both pre-start-card and direct-play builds. Readiness/art preparation continues independently. After the common Enter gesture it waits for reveal-triggered art as well, and asserts a ready/art-idle zero-step boundary (world/her clocks and accumulator zero) before controlled frames. The boundary is saved in frames.json and compared without a declarable exception. No clocks/state are reset to hide prior progress, and pixel thresholds/scene exceptions are unchanged. Browser acceptance remains the coordinator's CI run; Node tests exercise both hook lifecycles and reject progressed/pending-art boundaries.

Part of Witch's notes (CLAUDE.md is the index): the full smoke test, proof shots. Moved here from CLAUDE.md as it stood (housekeeping, Ed 2026-10-23: a note an area, so pull requests add to their own area's file, not one shared file); every rule kept. Add to this file, not CLAUDE.md, when you change this area.

Not in CI, run by builders before a FINAL: `npm run build && npm run smoke`, a headless Chromium smoke test (`tools/smoke/smoke.cjs`, Playwright from the machine's global install; never `playwright install`) that flies both modes on the laptop and phone layouts, drives the touch controls, flies a path through every zoom step in both modes failing on any pop (anything appearing or vanishing in clear view), flies full-speed straight lines in both modes at Ed's window sizes (1900×1240 at DPR 1, 2000×1076 at DPR 2) failing on any pop or any sprite instance set but not drawn (`view.stats.dropped`), flies a 10 s full boost north over the treetops frame by frame at a fixed 1/60 s (`window.witch.frame`) failing if its frames' own work (rules and view, `view.ms` by part) passes 22 ms at p99 or 40 ms at worst, runs four party waves, and saves screenshots to `previews/` (`RECORD=1` also saves `previews/flight.webm`). Checks that fail on `claude/prototype` itself for a known reason are listed in `KNOWN` at the top of `tools/smoke/smoke.cjs`, each with its issue (today the cloud's frame-time budgets, #310; the scenery rebuild at full boost, 35–135 ms frames, #1325; the pop checks under its 1–2 s software-rendered frames, #311; and the vanish flights at Ed's window sizes, which take tens of seconds a frame in software and so fly only on a real GPU, `SMOKE_GPU=1`, #1090): they're reported apart (`known: N`) and don't fail the run, and one that starts passing says so, to come off the list. Keep the list small and honest, so a red full smoke means something new.

**A quick proof shot** (the coordinator's ask, 2026-10-23: a whole night's art took 15 to 45 minutes in the cloud before a builder could see a room, a creature or a find): `npm run build && npm run shot -- <scene> [out.png] [more of the link]` (`tools/shot/shot.cjs`) loads the built game with `?shot=<scene>` (`app/shot.ts`: only the art the view needs, `?quick=1`; no start card or bedroom; the party spell cast and the waves held; her put at the scene), steps it a frame at a time while that art is drawn, and saves the frame (default `previews/shot/<scene>.png`): about 2 to 3 minutes on the cloud's software renderer, most of it the page's load. Scenes: `object:<id>` (or `station:<id>`: in front of a house object, at its station's reach, its menu in), `room:<id>`, `area:<type>` (the nearest of that area type; `island=` for another island), `creature:<species>[@level]` (one beside her by the dancefloor, friendly; 2 by default), `find:<kind>:<item>` or `find:tonight` (on clear ground in front of her), `at:<x>,<z>[,treetop]`. The link's other switches apply as ever: `own=none`, `hat=sentry`, `zoom=0`, `seed=` (also `SEED`), `SIZE=1600x900`, `FRAMES=`; it fails on a page error or a scene it can't make (an unknown id, nothing of that type on the island). `window.witch.shot(scene)` moves her to another scene in a page already open. Examples: `npm run shot -- object:dressingTable`, `npm run shot -- find:part:nozzles previews/shot/nozzles.png own=none`, `npm run shot -- creature:fox@1`.

**Publishing previews** (the coordinator, 2026-10-26: twice that day a builder's stale staged deletion went out with their own frames and briefly deleted hundreds of other builders' previews on `claude/ed-shots`): publish frames, sheets and mocks with `node tools/shots/push.mjs <file>[:<path on the branch>] ... [--to <dir>] [-m <message>]`, never by committing in a checkout of the branch. It fetches `claude/ed-shots` and builds the new commit on its tip with git's plumbing (a temporary index read from the tip, each named file hashed in and placed, the tree committed on the tip), so nothing staged or missing in any checkout can ride along: only the named files are added or replaced. A file with no `:path` goes to `<--to>/<its name>` (`--to` defaults to `previews/<today>`), a directory's files by their paths under it. It refuses a commit that would delete any path, does nothing when the branch already has the files as they are, and when another builder has pushed first it fetches the branch again and builds on the new tip (up to six tries). It prints the commit, what it adds or changes, and each file's link; `--dry` builds and checks the commit without pushing (`--branch`, `--remote` for other targets). `tools/shots/push.test.ts`, against a throwaway origin: a checkout with others' previews staged for deletion publishes only its own file; a beaten push lands on the new tip, keeping the other builder's; a file onto a directory of others' previews fails with nothing pushed.

