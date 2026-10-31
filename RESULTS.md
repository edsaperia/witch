# House first-show check for #1507 (fc7cb466 vs e8a054f3)

CAND = fc7cb46690c411dc11e4a9dde4fc0c0af6eaf059 (codex/rare-screens), BASE = e8a054f3a17a7651c92bbf19054861b4eed62961 (claude/prototype). Cloud runner, 2026-10-30/31 UTC, headless Chromium with SwiftShader.

## Summary

1. **Pixel parity: FAIL / INCONCLUSIVE.** Every PNG pair differs over the whole frame, but **the base build also differs from itself** by the same amount between two runs (control below). The house mist/fog drifts with wall-clock time, so these shot tools are not deterministic and cannot prove parity. One real failure: **CAND `oak/outside.png` was never produced**: `page.screenshot` timed out (300 s) on the treetops-over-the-Terrace shot on **both** attempts, including a run with nothing else on the machine. BASE takes that shot fine (in a slower, contended run).
2. **Boot (before the walk), HouseRoomsView.update inclusive, mean of 4:** base **392.5 ms**, cand **100.9 ms**. The cost in base is `buildQuads` → `standing` (houseArt.ts) → `outline`/`field` (house/shape.js), about 300–370 ms. In CAND those rows are gone (buildQuads 4–15 ms).
3. **Witch-frame p99:** first-30: base 33.8 ms, cand 26.1 ms. Full route: base 11.1 ms, cand 8.7 ms. Max: base 50.1 ms, cand 46.8 ms.
4. **Bundle size:** main-*.js grows by 20,621 bytes gzip -9 (+3.8%). That's the precomputed uprights.

## Steps: exit codes and wall times

| step | exit | wall |
|---|---|---|
| 1 checkout CAND (HEAD fc7cb46690c4…) + npm ci | 0 | 4 s |
| 2 worktree ../base + npm ci | 0 / 0 | 2 s (npm ci) |
| 2 base vite build | 0 | 35 s |
| 3 cand vite build | 0 | 34 s |
| 4 cand furniture-shots (4 shot jobs in parallel) | 0 | 603 s |
| 4 base furniture-shots (parallel) | 0 | 641 s |
| 4 cand oak-shots (parallel) | **1** (timeout at `outside`) | 1310 s |
| 4 base oak-shots (parallel) | 0 | 1646 s |
| 4 cand oak-shots rerun, alone | **1** (timeout at `outside` again) | 663 s |
| 4 extra control: base furniture-shots alone | 0 | 167 s |
| 4 extra control: cand furniture-shots alone | 0 | 166 s |
| 5 house-profile (RUNS=4) | 0 | 521 s |
| 6 house-cpu-functions ×8 | all 0 | ~1 min total |

## Step 3: bundle sizes

| build | file | raw bytes | gzip -9 bytes |
|---|---|---:|---:|
| BASE | main-0tf4MZFP.js | 1,497,072 | 541,118 |
| CAND | main-aqLTZNcJ.js | 1,610,708 | 561,739 |

## Step 4: pixel parity

**Overall: FAIL.** No pair is identical, and `oak/outside.png` is missing in CAND. The differences are not confined to the version-label corner: every bounding box covers nearly the whole 1600×900 frame. Read this with the control below. The base build doesn't reproduce its own shots, so this method can't tell a rendering change from drifting mist.

### Main comparison (base vs cand, as run in step 4)

| set | name | identical | differing px | max channel diff | diff bbox [x0,y0,x1,y1] |
|---|---|---|---:|---:|---|
| oak | bedroom.png | no | 338702 | 247 | [2,0,1599,899] |
| oak | bedroom2-door.png | no | 164832 | 229 | [0,0,1599,899] |
| oak | bestiary.png | no | 660347 | 224 | [2,0,1599,899] |
| oak | boudoir.png | no | 449548 | 223 | [2,0,1599,899] |
| oak | cloakroom.png | no | 291281 | 240 | [2,0,1599,899] |
| oak | dining.png | no | 63972 | 179 | [0,0,1590,899] |
| oak | kitchen.png | no | 343397 | 230 | [2,0,1599,899] |
| oak | outside.png | no | — | — | **FAIL: only in base** |
| oak | parlour.png | no | 471200 | 178 | [2,0,1599,899] |
| oak | solarium.png | no | 350075 | 255 | [0,0,1599,899] |
| oak | studio.png | no | 162265 | 180 | [0,0,1590,887] |
| oak | terrace-up.png | no | 511395 | 238 | [2,0,1599,896] |
| oak | terrace.png | no | 228374 | 246 | [593,0,1599,887] |
| oak | turret.png | no | 360995 | 252 | [0,0,1599,899] |
| oak | workshop.png | no | 429464 | 205 | [0,0,1599,899] |
| furniture | bedroom.png | no | 363755 | 254 | [0,1,1599,899] |
| furniture | bestiary.png | no | 630063 | 250 | [0,1,1599,899] |
| furniture | boudoir.png | no | 571307 | 241 | [0,0,1599,899] |
| furniture | cloakroom.png | no | 255130 | 251 | [0,1,1599,899] |
| furniture | dining.png | no | 228038 | 253 | [0,0,1591,897] |
| furniture | kitchen.png | no | 287990 | 250 | [1,2,1599,899] |
| furniture | parlour.png | no | 1190079 | 248 | [0,0,1599,899] |
| furniture | solarium.png | no | 375073 | 253 | [3,1,1599,899] |
| furniture | studio.png | no | 150555 | 213 | [2,2,1599,899] |
| furniture | terrace.png | no | 269865 | 235 | [0,0,1599,899] |
| furniture | turret.png | no | 406612 | 245 | [0,1,1599,899] |
| furniture | workshop.png | no | 580341 | 242 | [1,0,1599,899] |

The CAND oak files are from the solo rerun. Both CAND oak attempts stopped after `bedroom2-door`.

CAND oak-shots error (same on both attempts):

```
page.screenshot: Timeout 300000ms exceeded.
Call log:
[2m  - taking page screenshot[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m

    at shot (/home/user/witch/tools/house/oak-shots.cjs:27:45)
    at /home/user/witch/tools/house/oak-shots.cjs:34:262 {
  log: [
    '  - taking page screenshot',
    '  - waiting for fonts to load...',
    '  - fonts loaded'
  ],
  name: 'TimeoutError'
}
```

### Control 1: base vs cand, each run alone (`previews/house-1507-parity/control-alone/`)

| set | name | identical | differing px | max channel diff | diff bbox [x0,y0,x1,y1] |
|---|---|---|---:|---:|---|
| furniture | bedroom.png | no | 303609 | 252 | [0,1,1599,899] |
| furniture | bestiary.png | no | 463971 | 249 | [0,1,1599,899] |
| furniture | boudoir.png | no | 770460 | 253 | [0,0,1599,899] |
| furniture | cloakroom.png | no | 594639 | 248 | [0,1,1599,899] |
| furniture | dining.png | no | 158999 | 244 | [0,0,1589,897] |
| furniture | kitchen.png | no | 482263 | 253 | [1,2,1599,899] |
| furniture | parlour.png | no | 988375 | 255 | [0,0,1599,899] |
| furniture | solarium.png | no | 343579 | 254 | [3,1,1599,899] |
| furniture | studio.png | no | 684475 | 180 | [2,2,1599,899] |
| furniture | terrace.png | no | 149150 | 240 | [0,0,1599,899] |
| furniture | turret.png | no | 124683 | 255 | [0,1,1599,899] |
| furniture | workshop.png | no | 480264 | 241 | [1,0,1599,899] |

### Control 2: base vs base (the step-4 base run vs the solo base run)

| set | name | identical | differing px | max channel diff | diff bbox [x0,y0,x1,y1] |
|---|---|---|---:|---:|---|
| furniture | bedroom.png | no | 349378 | 254 | [0,1,1599,899] |
| furniture | bestiary.png | no | 642873 | 250 | [0,1,1599,899] |
| furniture | boudoir.png | no | 558103 | 253 | [0,0,1599,899] |
| furniture | cloakroom.png | no | 608292 | 251 | [0,1,1599,899] |
| furniture | dining.png | no | 325274 | 253 | [0,0,1591,897] |
| furniture | kitchen.png | no | 203732 | 253 | [1,2,1599,899] |
| furniture | parlour.png | no | 858431 | 255 | [0,0,1599,899] |
| furniture | solarium.png | no | 324943 | 254 | [3,1,1599,899] |
| furniture | studio.png | no | 672036 | 213 | [2,2,1599,899] |
| furniture | terrace.png | no | 351374 | 240 | [0,0,1599,899] |
| furniture | turret.png | no | 382295 | 255 | [0,1,1599,899] |
| furniture | workshop.png | no | 398940 | 242 | [1,0,1599,899] |

Base against itself differs by 0.16–0.86 Mpx, with max channel differences up to 255, the same scale as base vs cand. Looking at `parlour.png`, the drifting purple mist and the light pool are what change. The timing differs too: four jobs in parallel took about 600 s, alone about 167 s, so the game clock at each shot differs. Measuring parity needs a fixed clock or the mist turned off. That's not done here, per the brief.

## Step 5: timing profile (summary.md verbatim)

# Same-route house profile

Complete: true. Cap: 830 seconds. 4 fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.

| configuration | runs | samples | witch max ms | p99 ms | median ms |
|---|---:|---:|---:|---:|---:|
| as-built | 4 | 7208 | 46.800 | 8.700 | 2.800 |
| recording-off | 4 | 7208 | 39.000 | 10.200 | 2.900 |
| external-baseline | 4 | 7208 | 50.100 | 11.100 | 2.800 |

## as-built: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 4/96 | -1.77,-2.09 | 57.100 | 0.700 | 56.400 | 46.800 | 9.600 | 0.000 |
| 3/878 | -51.22,-17.90 | 40.000 | 0.600 | 39.400 | 32.000 | 7.400 | 26.296 |
| 4/1 | 5.97,6.29 | 76.700 | 2.500 | 74.200 | 26.700 | 47.500 | 0.000 |
| 2/3 | 5.85,6.14 | 48.000 | 2.300 | 45.700 | 26.100 | 19.600 | 0.000 |
| 4/7 | 5.54,5.79 | 48.600 | 0.800 | 47.800 | 24.600 | 23.200 | 4.732 |

## recording-off: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/1 | 5.97,6.29 | 91.500 | 1.400 | 90.100 | 39.000 | 51.100 | 4.374 |
| 1/5 | 5.70,5.97 | 65.500 | 3.100 | 62.400 | 38.500 | 23.900 | 15.958 |
| 4/9 | 5.37,5.61 | 51.100 | 0.900 | 50.200 | 36.700 | 13.500 | 0.000 |
| 1/7 | 5.54,5.79 | 58.600 | 1.000 | 57.600 | 28.800 | 28.800 | 0.000 |
| 2/256 | -12.80,-17.98 | 33.600 | 0.700 | 32.900 | 28.600 | 4.300 | 17.968 |

## external-baseline: five slowest witch frames

| run/frame | x,z | wall | step | render | witch | other render | GC in witch |
|---|---|---:|---:|---:|---:|---:|---:|
| 3/1772 | 41.92,14.34 | 53.500 | 0.400 | 53.100 | 50.100 | 3.000 | 0.000 |
| 2/6 | 5.62,5.88 | 61.700 | 0.600 | 61.100 | 34.000 | 27.100 | 1.530 |
| 3/5 | 5.70,5.97 | 48.100 | 0.900 | 47.200 | 33.800 | 13.400 | 22.686 |
| 1/257 | -12.86,-18.08 | 45.600 | 0.500 | 45.100 | 28.400 | 16.700 | 0.000 |
| 2/23 | 4.16,4.35 | 35.300 | 0.500 | 34.800 | 28.100 | 6.700 | 1.159 |

Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.


### First-30 vs full route (computed from summary.json: route frames with section 1; first-30 = frame ≤ 30, 4 runs × 30 = 120 frames; same quantile method as the tool)

| configuration | slice | frames | witch max | p99 | median | wall max | wall p99 | wall median |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| external-baseline | first-30 | 120 | 34.0 | 33.8 | 5.6 | 95.6 | 83.5 | 19.1 |
| external-baseline | full-route | 7208 | 50.1 | 11.1 | 2.8 | 95.6 | 24.9 | 5.1 |
| as-built | first-30 | 120 | 26.7 | 26.1 | 5.7 | 76.7 | 68.7 | 17.4 |
| as-built | full-route | 7208 | 46.8 | 8.7 | 2.8 | 76.7 | 20.8 | 5.2 |
| recording-off | first-30 | 120 | 39.0 | 38.5 | 6.4 | 91.5 | 79.2 | 19.5 |
| recording-off | full-route | 7208 | 39.0 | 10.2 | 2.9 | 91.5 | 23.2 | 5.1 |


## Step 6: cold-prep attribution

Inclusive ms from `house-cpu-functions.mjs`. In the bundle, functions have short minified names, so I've mapped each row back to its source name and file. `outline (art/attackLook.js)` is a different function that just shares the name.

### boot-before-walk

| repeat | base sampledMs | cand sampledMs | base HouseRoomsView.update ms | cand HouseRoomsView.update ms | base standing/outline/field/buildQuads rows (inclusive ms) | cand standing/outline/field/buildQuads rows (inclusive ms) |
|---:|---:|---:|---:|---:|---|---|
| 1 | 34426.9 | 27200.7 | 438.2 | 89.5 | buildQuads (houseRooms.ts:58) 367.3; standing (houseArt.ts:139) 355.9; outline (house/shape.js:143) 340.7; field (house/shape.js:75) 309.1; outline (art/attackLook.js:41, unrelated) 4.8 | outline (art/attackLook.js:41, unrelated) 25.7; buildQuads (houseRooms.ts:59) 14.6; standing (housePieces.ts:31) 0.6 |
| 2 | 27318.8 | 27960.2 | 369.8 | 83.8 | buildQuads (houseRooms.ts:58) 309.9; standing (houseArt.ts:139) 300.4; outline (house/shape.js:143) 291.6; field (house/shape.js:75) 274.2; outline (art/attackLook.js:41, unrelated) 10.1; standing (housePieces.ts:31) 1.1 | outline (art/attackLook.js:41, unrelated) 4.2; buildQuads (houseRooms.ts:59) 3.6; standing (housePieces.ts:31) 0.7 |
| 3 | 27687.4 | 27651 | 370.2 | 97.1 | buildQuads (houseRooms.ts:58) 314.3; standing (houseArt.ts:139) 297.1; outline (house/shape.js:143) 286.6; field (house/shape.js:75) 266.1; outline (art/attackLook.js:41, unrelated) 9.7; standing (housePieces.ts:31) 1.1 | outline (art/attackLook.js:41, unrelated) 23.7; buildQuads (houseRooms.ts:59) 6.7; standing (housePieces.ts:31) 0.6 |
| 4 | 27609.7 | 28529.8 | 391.9 | 133.2 | buildQuads (houseRooms.ts:58) 332.4; standing (houseArt.ts:139) 327.7; outline (house/shape.js:143) 323.0; field (house/shape.js:75) 296.7; outline (art/attackLook.js:41, unrelated) 7.4; standing (housePieces.ts:31) 0.6 | buildQuads (houseRooms.ts:59) 11.6; outline (art/attackLook.js:41, unrelated) 5.7; standing (housePieces.ts:31) 2.1 |
| **mean** | 29260.7 | 27835.4 | 392.5 | 100.9 | | |


### route1to12

| repeat | base sampledMs | cand sampledMs | base HouseRoomsView.update ms | cand HouseRoomsView.update ms | base standing/outline/field/buildQuads rows (inclusive ms) | cand standing/outline/field/buildQuads rows (inclusive ms) |
|---:|---:|---:|---:|---:|---|---|
| 1 | 471.6 | 395.9 | 125.8 | 85.3 | field (house/shape.js:75) 7.7; standing (housePieces.ts:31) 0.6 | field (house/shape.js:75) 2.9; standing (housePieces.ts:31) 0.6 |
| 2 | 506.8 | 391.8 | 129.3 | 97 | standing (housePieces.ts:31) 2.4 | field (house/shape.js:75) 2.1 |
| 3 | 350.3 | 310.8 | 77.9 | 88.2 | field (house/shape.js:75) 2.9; standing (housePieces.ts:31) 0.7 | field (house/shape.js:75) 3.0 |
| 4 | 420.2 | 346.8 | 110.3 | 78.1 | — | field (house/shape.js:75) 4.2 |
| **mean** | 437.2 | 361.3 | 110.8 | 87.2 | | |


## Errors

- CAND `tools/house/oak-shots.cjs`: `page.screenshot: Timeout 300000ms exceeded` at the `outside` shot (oak-shots.cjs:27), twice (once in parallel, once alone). Not investigated further.
- `pngjs` is not in node_modules, so the comparison used Playwright canvas `getImageData`.
- Nothing over 50 MB; nothing was skipped.
