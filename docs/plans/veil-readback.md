# Smoke-veil readback: current-prototype replacement for PR1240

Authorized by coordinator1476#6547335419, parent1555 / codex/ops-inbox d119c80f0173d2edd48841c1ecf117c81616e508,2026-10-31. Own branch codex/veil-readback; worktree C:/Users/edsap/Documents/ChatGPT/witch game/work/veil-readback. Lighting1542 remains held at3eff77ca95bc223c5a3f589f963d3a4653c2ec0a.

## Brief

PR1240 (claude/frame-regress, four commits) addressed Ed's jerky frames near campfire smoke: Three's asynchronous render-target readback polls a fence every4ms with a flush. It never shipped because the D3D11 check was missing. Manually adapt its retained read buffer and once-per-frame non-flushing fence check to current prototype; skip veil rendering when no probe is in use; retain veilread=three|off diagnostic arms. Preserve the visual calculation and expose veil/veilRead frame-part timings.

## Implementation plan

1. Review all1240 changes/comments; port by current symbols, not a blind cherry-pick. Retain one pixel-pack buffer, no timer/flush polling, copy only after signalled; invalidate pending data on reset/key reuse and handle absent/context-lost GL safely. Keep the old Three route and no-veil route for comparison. Narrow View changes: flag wiring and separate timings only; preserve other builders' camera/easing/refraction hooks.
2. Add deterministic GL lifecycle tests for pending/signalled fences, one poll per frame, buffer reuse, no flush/timer, reset and probe attribution. Prepare these without running heavy local checks while the laptop is allocated elsewhere.
3. Prepare a <=270s serialized headless Intel/KHR/exact-served-SHA/CPU driver: same real wave>=2 campfire-smoke walking fixture in default/three/off arms. Record raw frame gaps, p95/worst/count>50ms and veil/veilRead parts; require actual smoke and probes, comparable fixture and clean telemetry. No synthetic stand-in or performance claim from absent smoke.
4. Request canonical cloud default-vs-Three unchanged-look evidence plus off-arm sensitivity. GitHub CI is allowed in parallel. Local heavy build/test/art/bench/browser/training requires a fresh canonical slot, after1540/1513/1542 and actual preceding FREE; no old slot automatically transfers.
5. Report exact head/checks/driver; hardware acceptance requires default as smooth as off within a declared noise allowance and smoother than Three. Ask canonical for numerical noise criteria before claiming PASS. Preserve1240 history; close it only after this replacement is registered and reviewed as instructed. No production merge/release.

All current local work is lightweight implementation/driver preparation. The hardware driver and cloud browser proof remain unexecuted until specifically allocated.

## Fixed acceptance (1558#6547506171)

Every arm must show an active invite probe and drawn campfire smoke for at least80% of its measured time, with identical fixture/seed/route, CPU below70%, five-minute input idle and read-only no-Ed-game-tab proof. The analysis module fails closed on missing evidence. The previous Three route must reproduce at least3 frames over50ms with probe/readback time at least30ms, or its p95 must exceed default by at least10ms. Otherwise report INCONCLUSIVE: stall not reproduced. Default passes against off only if p95 is at most off plus max(2ms,5% of off), worst at most off plus16.7ms, and frames over50ms at most off count plus1. Retain all raw numbers; never retry/tune the ceiling. Cloud appearance compares default with Three; off is sensitivity only. The driver will use the same five-minute/fail-closed browser guard as lighting1542. These criteria replace the earlier request for numerical limits; they are not a laptop grant.
