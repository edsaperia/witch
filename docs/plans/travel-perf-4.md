# Reachable chart warming (M4)

Canonical1513#6556708524, 2026-11-01: fresh task from current prototype; M3 is dropped and must never be merged.

Base: b995ef4236541ebf24037c65461ddf750087cbe4. Branch `codex/travel-perf-4`, isolated sibling worktree `travel-perf-4`.

## Plan before implementation

1. Restrict speculative chart outline/mesh worker requests to home and currently reachable islands, ordered by the existing chart policy. Use the chart's existing reachability rules rather than a second unlock definition.
2. Run that background work only while the witch is in the treehouse or MAP is open. Leaving, sailing, sleeping, hiding the page or changing world/save stops the owned speculative worker; re-entry resumes against the existing cache. Preserve sleep/alarm and house source.
3. Keep the open chart's all-island demand queue, existing cache, one-island-per-frame rise-in and prepared renderer/instant opening intact. Missing unreachable outlines remain available on demand. Background cancellation must never terminate a chart-owned demand worker.
4. Add focused tests for reachable requests, eligibility transitions, late/cancelled worker replies, cache/re-entry and changed world/found inputs. Run nearby tests with one worker and typecheck. No full suite, smoke, art, laptop browser, benchmark or local heavy job.
5. Prepare a bounded headless cloud/CI check for background job counts before/after, all chart islands still arriving on demand and cancellation on leaving. Canonical owns allocating/executing cloud/browser checks; historical M3 proofs do not count. Report exact candidate/build/driver and results or pending allocation honestly.

Scope: `app/chartWarm*`, a small main scheduling hook, focused tests, a dedicated proof tool, relevant island/performance notes and own changelog. Do not edit house geometry, renderer shaders, CI workflows or another builder's files. Raise any newly discovered ownership conflict on the own PR before touching it.

No capacity/service/spend work. M4's explicit fresh approval supersedes the historical M3-ships gate; no M3 source is carried here.

## Source checkpoint

Reachable-only worker requests and per-frame leave cancellation are implemented. Opening MAP transfers ownership to its existing all-island demand queue rather than running a second worker. A cancelled worker's late completion/error cannot settle another worker. Re-entry uses the existing cache; world/found/reachable changes invalidate the scheduling scope. Renderer preparation, chart demand/rise-in and house/sleep rules are untouched.

19 nearby tests (one worker) and typecheck pass. The first restricted test attempt could not collect because a Windows temporary-file rename was denied; the permitted rerun passed. Browser/job-count/no-missing-island proof tooling and canonical cloud execution remain outstanding. This is not a FINAL or speed claim. Multiplayer takes priority per1476#6556749161; checkpoint is safe to park for an explicitly assigned split.
