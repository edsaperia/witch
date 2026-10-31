INCONCLUSIVE

Laptop smoke A/B run, 2026-10-31, 12:21–13:37 UTC, in a cloud container (4 CPUs, SwiftShader). BASE is `a30c885755b2667fc060aa644b2ae71ecab51252`, the commit before mushrooms. CAND is `003eb8cc0fad18014fe1d8430784d649fc5e4a0d`, the live commit. I built each in its own worktree with `npm ci` and `WITCH_SHA=<sha> npx vite build`, then ran each test as `timeout --kill-after=10s 900s env ONLY=laptop node tools/smoke/smoke.cjs`.

| # | Tree | Exit | Wall | ok/FAIL lines | Where it stopped |
|---|------|------|------|---------------|------------------|
| 1 | BASE | 124 (killed at the time limit) | 900 s | none (the script prints its results only at the end) | `hold` (smoke.cjs:137) in `flyPath` (smoke.cjs:162) |
| 2 | CAND | 124 (killed at the time limit) | 900 s | none | `hold` (smoke.cjs:138) in `flyPath` (smoke.cjs:165) |
| 3 | BASE | 124 (killed at the time limit) | 900 s | none | `hold` (smoke.cjs:137) in `flyPath` (smoke.cjs:164) |
| 4 | CAND | 124 (killed at the time limit) | 900 s | none | `hold` (smoke.cjs:138) in `flyPath` (smoke.cjs:165) |

CAND's smoke.cjs has 1 extra line near the top (`require("./effects-scene.cjs")`), so its line numbers are 1 higher. CAND:165 is the same line as BASE:164, the `hold` for the zoom-in steps after the zoom-out loop. BASE:162 is the `hold` just before it.

All 4 runs ended with the same error. It came from the 900 s `timeout`, not from the 240 s `waitForFunction` limit:

```
page.waitForFunction: Target page, context or browser has been closed
    at hold (.../tools/smoke/smoke.cjs:137|138:16)
    at async flyPath (.../tools/smoke/smoke.cjs:162|164|165:9)
    at async .../tools/smoke/smoke.cjs:213|214:5
    at async run (.../tools/smoke/smoke.cjs:106|107:5)
    at async main (.../tools/smoke/smoke.cjs:172|173:3) {
  log: []
}
```

## What this shows

- **The reported failure did not happen here.** That was `Timeout 240000ms exceeded at hold via flyPath`: her clock stopped while she was flying. In none of the 4 runs did a single `hold` wait 240 s. Both trees were still working through `flyPath` when the 900 s limit killed them.
- **BASE and CAND paced the same.** Each run saved screenshots 00 to 04 and then went into `flyPath`. From the screenshot times, the start screen came about 3–4 min into each run, and 04 (just before `flyPath`) about 6–7 min after that. For example, run 2 (CAND) took screenshot 00 at 12:45 and 04 at 12:50; run 3 (BASE) took 00 at 13:00 and 04 at 13:06; run 4 (CAND) took 00 at 13:15 and 04 at 13:22. Both trees reached the same part of `flyPath`, and CAND got at least as far as BASE.
- **Why INCONCLUSIVE:** neither tree passed, and neither failed the way the report did. In this container, 900 s is too short for the laptop scene on either tree. These runs therefore can't tell a regression apart from slow software rendering. They do show no difference between the trees in how fast they go.

## Diagnostic

I didn't run it. The brief calls for it only when CAND fails and BASE passes, and the 75-minute budget was used up by the 4 runs. A useful next step would be to rerun both trees with a longer limit (e.g. 2400 s) and a scratch-copy probe before each `hold` that prints `g.herTime`, `g.clock.paused`, `g.timeScale` and the freeze stack. That would show whether CAND's clock really stops (the reported failure) or just runs slowly.

## Files

- `run1-base.log`, `run2-cand.log`, `run3-base.log`, `run4-cand.log`: the full output of each run.
- `run3-base-04-treetop-flying.png`, `run4-cand-04-treetop-flying.png`: the last screenshot before `flyPath`, one from each tree.
