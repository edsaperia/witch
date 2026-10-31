# House outside-shot parity for #1507 (670a83df vs 3fefd6ed)

- CAND: `670a83df847e55b1c6f3d2d41338dbf590a1bff7` (codex/rare-screens)
- BASE: `3fefd6edd16e46e01a7522b89fe048c47189c91d` (claude/prototype), with CAND's `tools/house/oak-shots.cjs`, `tools/house/shot-session.cjs`, `tools/bench/hold-simulation.cjs` copied in.
- Run 2026-10-31 UTC on the cloud software renderer (headless Chromium, pre-installed Playwright). Oak runs one at a time.

## Verdict: **PASS**: all 15 PNGs pixel-identical, all 15 `*.state.json` identical field by field (`outside` `drawCalls` 88 on both; the 89 vs 88 seen earlier did not recur).

## Steps

| Step | Exit | Wall time |
|---|---|---|
| CAND checkout, HEAD `670a83df847e…` | 0 | – |
| CAND `npm ci` | 0 | 2 s |
| `git worktree add ../base 3fefd6ed…` | 0 | 1 s |
| base `npm ci` | 0 | 2 s |
| Copy the three tool files into base | 0 | – |
| base `WITCH_SHA=parity npx vite build` | 0 | 22 s |
| CAND `WITCH_SHA=parity npx vite build` | 0 | 20 s |
| base oak-shots (seed 123, cap 3600 s) | 0 | 912 s |
| CAND oak-shots (seed 123, cap 3600 s) | 0 | 910 s |
| Compare (Playwright canvas getImageData; JSON flattened field by field) | 0 | – |

Both `dist/version.json` read `"version":"dev · parity"`.

Base `git status --short` after the copy (`hold-simulation.cjs` was already byte-identical):

```
 M tools/house/oak-shots.cjs
?? tools/house/shot-session.cjs
```

`outside.png` produced: base **yes** (327,661 bytes), CAND **yes** (327,661 bytes). Both sides wrote 30 files (15 PNG + 15 state.json).

## Per-file comparison (1600×900 each)

| File | Identical | Differing px | Max channel diff | Diff bbox |
|---|---|---|---|---|
| oak/bedroom.png | yes | 0 | 0 | - |
| oak/bedroom2-door.png | yes | 0 | 0 | - |
| oak/bestiary.png | yes | 0 | 0 | - |
| oak/boudoir.png | yes | 0 | 0 | - |
| oak/cloakroom.png | yes | 0 | 0 | - |
| oak/dining.png | yes | 0 | 0 | - |
| oak/kitchen.png | yes | 0 | 0 | - |
| oak/outside.png | yes | 0 | 0 | - |
| oak/parlour.png | yes | 0 | 0 | - |
| oak/solarium.png | yes | 0 | 0 | - |
| oak/studio.png | yes | 0 | 0 | - |
| oak/terrace-up.png | yes | 0 | 0 | - |
| oak/terrace.png | yes | 0 | 0 | - |
| oak/turret.png | yes | 0 | 0 | - |
| oak/workshop.png | yes | 0 | 0 | - |

## JSON field differences

None. Every field of every `*.state.json` matches (including `oak/outside.state.json` `drawCalls`: 88 vs 88).

## Outside: frame/finish diagnostics (draw/finish in ms)

Base:
```
house-frame 30 {"worstDraw":3294.5,"worstFinish":0.19999999995343387}
house-frame 60 {"worstDraw":11321.900000000023,"worstFinish":0.19999999995343387}
house-frame 90 {"worstDraw":11321.900000000023,"worstFinish":5.900000000139698}
house-frame 120 {"worstDraw":11321.900000000023,"worstFinish":5.900000000139698}
frames {"frames":120,"worstDraw":11321.900000000023,"worstFinish":5.900000000139698}
capture outside {"time":6.59999999999993,"herTime":29.999999999999577,"acc":0,"x":3176.43871836629,"z":2826.926777190793,"mode":"treetop","perch":false,"manual"
shot outside
```

CAND:
```
house-frame 30 {"worstDraw":3299.8000000000466,"worstFinish":0.10000000009313226}
house-frame 60 {"worstDraw":9105.699999999953,"worstFinish":0.10000000009313226}
house-frame 90 {"worstDraw":9105.699999999953,"worstFinish":2.5}
house-frame 120 {"worstDraw":9183.699999999953,"worstFinish":2.5}
frames {"frames":120,"worstDraw":9183.699999999953,"worstFinish":2.5}
capture outside {"time":6.59999999999993,"herTime":29.999999999999577,"acc":0,"x":3176.43871836629,"z":2826.926777190793,"mode":"treetop","perch":false,"manual"
shot outside
```

(The `capture outside` lines are cut at 160 characters here; the full lines are in `base.log` and `cand.log`.) The worst single draw for outside was about 11.3 s on base and 9.2 s on CAND. That is timing on a shared software renderer, not a rendering difference.

## Errors

None. Neither log has an error or warning line, and no step failed.
