# Smoke-veil readback stall (#1240, Ed's "jerky" frames, 26 Oct)

PR #1240 (`claude/frame-regress`, 4 commits not on prototype) fixed a 70–150 ms stall every 0.2–0.3 s when walking near campfire smoke at wave ≥ 2. three.js `probeAsync` polled the smoke veil's readback fence every 4 ms with a flush (`render/occlusion.ts`). The fix keeps the read buffer, checks the fence once a frame with no flush and no timer, skips the veil pass when no probe is in use, and adds `?veilread=three|off` to compare. It never shipped because it needed a check on Ed's machine (D3D11), which our laptop queue can now do without Ed.

## Do
1. Bring the change onto current prototype on a fresh branch `codex/veil-readback` (its own PR; close #1240 pointing to it). `occlusion.ts` and `view.ts` have moved since 26 Oct.
2. Write a bounded headless laptop driver (≤ 270 s, the same served-SHA/Intel/KHR/CPU checks as #1513's runner): walk near campfire smoke at wave ≥ 2 in three arms (default, `veilread=three`, `veilread=off`), recording frame intervals (p95, worst, count > 50 ms) and the `veil` timing part.
3. CI green, then REPORT. The coordinator grants a laptop slot after #1513 and #1542.

PASS: the default is as smooth as `off` within noise, and smoother than `three`. The look is unchanged (cloud OFF/ON frames).
