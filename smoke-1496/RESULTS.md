# Full-smoke check for #1496 (candidate against base)

Run on 2026-10-31 in one cloud container. Both runs used the software renderer (SwiftShader, no GPU), one after the other.

- **CAND**: `892548e10cc8ee15abe7885f3ada02d8ae44f12d` (branch `codex/ci-tests`). The build's `version.json` and the label on screen both read `dev · 892548e`.
- **BASE**: `3fefd6edd16e46e01a7522b89fe048c47189c91d` (`claude/prototype`). The build's `version.json` and the label on screen both read `dev · 3fefd6e`.
- **Command**: `timeout --kill-after=5s 1500s env ONLY=phone,tilt-before,tilt-after,tilt-off,effects-off,effects-on,siege node tools/smoke/smoke.cjs`. Each build was made with `WITCH_SHA=<sha> npx vite build`. `smoke.cjs` serves `dist/` itself and writes its shots to `previews/`; it has no option for another output folder and does not print the SHA it served. The SHA above comes from `dist/version.json` and the label on screen.

## Headline

**Both runs hit the 1500 s timeout (exit 124) inside `effects-on`, so neither finished. `siege` never ran on either.** `smoke.cjs` prints its per-check `ok`/`FAIL` lines only at the very end, so the kill lost them. The table below therefore marks a scene as *reached* when its screenshots were written and nothing was thrown before the next scene started. That is weaker than PASS: a scene can be reached and still fail its checks. **No scene was reached on base but not on cand.** One visual difference stands out (see **Observation**).

| scene | base | cand | base wall (from shot times) | cand wall (from shot times) |
|---|---|---|---|---|
| phone | reached (10, 11 written) | reached (10, 11 written) | ~2m43 (from start, includes load) | ~6m10 (from start, includes load; overlapped base `npm ci`/build for about the first 1 min) |
| tilt-before | reached (20) | reached (20) | ~4m43 | ~6m19 |
| tilt-after | reached (21) | reached (21) | ~3m48 | ~1m37 |
| tilt-off | reached (22) | reached (22) | ~3m30 | ~1m43 |
| effects-off | reached (30, 31) | reached (30, 31): **ground shot is black** | ~6m10 | ~7m02 |
| effects-on | **killed by timeout** in `offHouse` (smoke.cjs:148), ~4m06 in | **killed by timeout** in `hold` (smoke.cjs:135), ~2m09 in | — | — |
| siege | not run | not run | — | — |

The times are the gaps between screenshot timestamps. Each scene's time includes its page load and the wait for its art.

| | base | cand |
|---|---|---|
| exit code | 124 (timeout) | 124 (timeout) |
| wall time | 1500 s (01:56:03 to 02:21:03 UTC) | 1500 s (01:30:50 to 01:55:50 UTC) |

## Errors, verbatim

These are thrown when `timeout` kills the browser; they are not failures of the game.

**cand** (`cand/smoke.log`):
```
page.evaluate: Target page, context or browser has been closed
    at state (/home/user/witch/tools/smoke/smoke.cjs:109:30)
    at hold (/home/user/witch/tools/smoke/smoke.cjs:135:24)
    at /home/user/witch/tools/smoke/smoke.cjs:344:13
    at async run (/home/user/witch/tools/smoke/smoke.cjs:106:5)
    at async main (/home/user/witch/tools/smoke/smoke.cjs:341:5) {
  log: []
}
```
**base** (`base/smoke.log`):
```
page.waitForFunction: Target page, context or browser has been closed
    at offHouse (/home/user/base/tools/smoke/smoke.cjs:148:16)
    at async /home/user/base/tools/smoke/smoke.cjs:341:7
    at async run (/home/user/base/tools/smoke/smoke.cjs:105:5)
    at async main (/home/user/base/tools/smoke/smoke.cjs:339:5) {
  log: []
}
```

## Observation (unverified as a failure)

The candidate moves the effects scenes onto `&island=4` (base uses the default island). In the candidate's `cand/30-ground-effects-off.png`, everything is black except the witch: no ground, path or forest. Its `31-treetop-effects-off.png` shows trees only in the top-left, with the rest black. Base's `30-ground-effects-off.png` shows a lit forest floor with paths and a fire. The black may just mean that island 4's start puts her near the island's edge or over the sea after 1.5 s of `ArrowRight`; it may also mean the ground isn't drawn there. Because the run was killed, it's unknown whether any of the smoke's own checks failed on it. **The effects-off/on comparison on island 4 probably compares almost nothing.** Worth looking at before relying on it.

## Not done / caveats

- With a 1500 s budget on this container's software renderer, these seven scenes don't fit: both runs finished only 5 of 7. `siege` needs its own run, or a longer timeout.
- The candidate run shared the CPU with base's `npm ci` and build for about its first minute (01:30:50 to about 01:32). Its phone scene time is inflated by that.
- No output file was over 50 MB; none were skipped.
