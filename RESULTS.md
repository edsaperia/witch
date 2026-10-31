# House parity retest for #1507 (third check)

- CAND `670a83df847e55b1c6f3d2d41338dbf590a1bff7` (codex/rare-screens), BASE `3fefd6edd16e46e01a7522b89fe048c47189c91d` (claude/prototype).
- Run 2026-10-31, 00:50–02:30 UTC, one cloud container, software GL (SwiftShader via the tools' own launch flags). Seed 123. Shot jobs run strictly one at a time.
- Comparison script: `logs/compare.cjs` (decodes both PNGs in headless Chromium, compares RGBA per pixel; flattens each JSON and compares field by field). Raw results: `control.json`, `parity.json`. Full tool logs: `logs/`.

## Verdicts

- **Control (base1 vs base2): NOT REPEATABLE** — strictly by the brief, because `oak/outside.png` is missing from base2 (the run hit the 1500 s outer timeout). Every PNG present on both sides (26/26) is pixel-identical and all 27 scene-state JSONs are identical, including `outside.state.json`.
- **Parity (base1 vs cand): FAIL** — `oak/outside.png` missing from cand (same 1500 s outer timeout), and `oak/outside.state.json` differs in `drawCalls` (base 89, cand 88). Every other PNG (26/26) is pixel-identical (0 differing pixels) and the other 26 JSONs are identical.

## Outside shot produced?

| run | outside.png | how the oak run ended |
|---|---|---|
| base1 | yes | exit 0 after 1480 s (20 s under the outer limit) |
| base2 | **no** | exit 124 (killed by `timeout 1500s`) during the outside screenshot |
| cand | **no** | exit 124 (killed by `timeout 1500s`) during the outside screenshot |

The kill came from the outer 1500 s `timeout`, not the tool's own 300000 ms screenshot timeout: Playwright reports "Target page, context or browser has been closed". In both failing runs every one of the outside step's 120 draws, and its `gl.finish`, completed before the capture began (`capture outside` was logged). The outside step is simply very slow on the software renderer: the worst single draw was 13.9 s (base1), 14.4 s (base2), 19.2 s (cand); in-house draws peak at well under 1.5 s. So these runs do not show whether the capture itself would have finished; a longer outer timeout would.

base2, lines around the timeout:
```
shot bedroom2-door
house-frame 30 {"worstDraw":5982.899999999907,"worstFinish":0.19999999972060323}
house-frame 60 {"worstDraw":10558.399999999907,"worstFinish":4.2999999998137355}
house-frame 90 {"worstDraw":14380.299999999814,"worstFinish":4.2999999998137355}
house-frame 120 {"worstDraw":14380.299999999814,"worstFinish":4.2999999998137355}
frames {"frames":120,"worstDraw":14380.299999999814,"worstFinish":4.2999999998137355}
capture outside {"time":6.59999999999993,"herTime":29.999999999999577,"acc":0,"x":3176.43871836629,"z":2826.926777190793,"mode":"treetop","perch":false,"manual":true,"pending":0,"wallClock":10008000,"houseVisible":false,"camera":[1,0,0,0,0,0.8090192597773321,-0.5877821342209524,0,0,0.5877821342209524,0.8090192597773321,0,3176.490711958559,192.6074302687877,3033.2439286517206,1],"projection":[3.186
page.screenshot: Target page, context or browser has been closed
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

    at Object.capture (/home/user/base/tools/house/shot-session.cjs:60:28)
    at shot (/home/user/base/tools/house/oak-shots.cjs:27:239)
    at async /home/user/base/tools/house/oak-shots.cjs:34:256 {
  log: [
    '  - taking page screenshot',
    '  - waiting for fonts to load...',
    '  - fonts loaded'
  ]
}
```

cand, lines around the timeout:
```
shot bedroom2-door
house-frame 30 {"worstDraw":6013.100000000559,"worstFinish":0.39999999944120646}
house-frame 60 {"worstDraw":12183.900000000373,"worstFinish":0.5}
house-frame 90 {"worstDraw":12183.900000000373,"worstFinish":4.099999999627471}
house-frame 120 {"worstDraw":19242.39999999944,"worstFinish":4.099999999627471}
frames {"frames":120,"worstDraw":19242.39999999944,"worstFinish":4.099999999627471}
capture outside {"time":6.59999999999993,"herTime":29.999999999999577,"acc":0,"x":3176.43871836629,"z":2826.926777190793,"mode":"treetop","perch":false,"manual":true,"pending":0,"wallClock":10008000,"houseVisible":false,"camera":[1,0,0,0,0,0.8090192597773321,-0.5877821342209524,0,0,0.5877821342209524,0.8090192597773321,0,3176.490711958559,192.6074302687877,3033.2439286517206,1],"projection":[3.186
page.screenshot: Target page, context or browser has been closed
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

    at Object.capture (/home/user/witch/tools/house/shot-session.cjs:60:28)
    at shot (/home/user/witch/tools/house/oak-shots.cjs:27:239)
    at async /home/user/witch/tools/house/oak-shots.cjs:34:256 {
  log: [
    '  - taking page screenshot',
    '  - waiting for fonts to load...',
    '  - fonts loaded'
  ]
}
```

base1, the same step finishing:
```
shot bedroom2-door
house-frame 30 {"worstDraw":5957.5,"worstFinish":0.2000000000698492}
house-frame 60 {"worstDraw":13312.20000000007,"worstFinish":2.300000000046566}
house-frame 90 {"worstDraw":13936.5,"worstFinish":2.300000000046566}
house-frame 120 {"worstDraw":13936.5,"worstFinish":4.7000000001862645}
frames {"frames":120,"worstDraw":13936.5,"worstFinish":4.7000000001862645}
capture outside {"time":6.59999999999993,"herTime":29.999999999999577,"acc":0,"x":3176.43871836629,"z":2826.926777190793,"mode":"treetop","perch":false,"manual":true,"pending":0,"wallClock":10008000,"houseVisible":false,"camera":[1,0,0,0,0,0.8090192597773321,-0.5877821342209524,0,0,0.5877821342209524,0.8090192597773321,0,3176.490711958559,192.6074302687877,3033.2439286517206,1],"projection":[3.186
shot outside
ok
```

## Steps: exit codes and wall times

| step | exit | wall |
|---|---|---|
| CAND checkout (`git rev-parse HEAD` = 670a83df847e55b1c6f3d2d41338dbf590a1bff7) | 0 | - |
| CAND `npm ci` | 0 | 6 s |
| `git worktree add ../base 3fefd6ed…` | 0 | - |
| base `npm ci` | 0 | 3 s |
| base `WITCH_SHA=parity npx vite build` | 0 | 44 s |
| CAND `WITCH_SHA=parity npx vite build` | 0 | 43 s |
| base1 oak-shots | 0 | 1480 s |
| base1 furniture-shots | 0 | 472 s |
| base2 oak-shots | **124 (timeout)** | 1501 s |
| base2 furniture-shots | 0 | 484 s |
| cand oak-shots | **124 (timeout)** | 1500 s |
| cand furniture-shots | 0 | 481 s |
| compare control | 0 | 4 s |
| compare parity | 0 | 3 s |

npm ci reported audit warnings only, no errors.

## Base checkout

The four tool files copied from CAND over base. `tools/bench/hold-simulation.cjs` was already byte-identical in both, so copying it changed nothing. `git status --short` in base afterwards:
```
 M tools/house/furniture-shots.cjs
 M tools/house/oak-shots.cjs
?? tools/house/shot-session.cjs
```

## Build label

`vite.config.ts` builds the label from `WITCH_VERSION` (unset → `dev`) and `WITCH_SHA` (first 7 chars), the same in both commits. Both builds were run with only `WITCH_SHA=parity` set; both `dist/version.json` read `"version":"dev · parity"`. Only the `built` timestamp differs (base 00:51:48Z, cand 00:52:31Z); it is not drawn in any shot, and the in-house PNGs being identical confirms that.

## Scene-JSON differences

- Control (base1 vs base2): none. All 27 `*.state.json` identical (15 oak + 12 furniture), including `oak/outside.state.json`.
- Parity (base1 vs cand): one field in one file. `oak/outside.state.json` `drawCalls`: base 89, cand 88. Every other field (game/her clocks, acc, position/mode, camera/projection matrices, light clocks, pending art, house visibility, WebGL loss) is identical. All other 26 JSONs identical.

## Comparison tables

### (i) Control: base1 vs base2

| file | identical | differing px | max channel diff | diff bbox |
|---|---|---|---|---|
| furniture/bedroom.png | yes | 0 | 0 | - |
| furniture/bestiary.png | yes | 0 | 0 | - |
| furniture/boudoir.png | yes | 0 | 0 | - |
| furniture/cloakroom.png | yes | 0 | 0 | - |
| furniture/dining.png | yes | 0 | 0 | - |
| furniture/kitchen.png | yes | 0 | 0 | - |
| furniture/parlour.png | yes | 0 | 0 | - |
| furniture/solarium.png | yes | 0 | 0 | - |
| furniture/studio.png | yes | 0 | 0 | - |
| furniture/terrace.png | yes | 0 | 0 | - |
| furniture/turret.png | yes | 0 | 0 | - |
| furniture/workshop.png | yes | 0 | 0 | - |
| oak/bedroom.png | yes | 0 | 0 | - |
| oak/bedroom2-door.png | yes | 0 | 0 | - |
| oak/bestiary.png | yes | 0 | 0 | - |
| oak/boudoir.png | yes | 0 | 0 | - |
| oak/cloakroom.png | yes | 0 | 0 | - |
| oak/dining.png | yes | 0 | 0 | - |
| oak/kitchen.png | yes | 0 | 0 | - |
| oak/parlour.png | yes | 0 | 0 | - |
| oak/solarium.png | yes | 0 | 0 | - |
| oak/studio.png | yes | 0 | 0 | - |
| oak/terrace-up.png | yes | 0 | 0 | - |
| oak/terrace.png | yes | 0 | 0 | - |
| oak/turret.png | yes | 0 | 0 | - |
| oak/workshop.png | yes | 0 | 0 | - |
| oak/outside.png | **MISSING on B side (failure)** | - | - | - |

### (ii) Parity: base1 vs cand

| file | identical | differing px | max channel diff | diff bbox |
|---|---|---|---|---|
| furniture/bedroom.png | yes | 0 | 0 | - |
| furniture/bestiary.png | yes | 0 | 0 | - |
| furniture/boudoir.png | yes | 0 | 0 | - |
| furniture/cloakroom.png | yes | 0 | 0 | - |
| furniture/dining.png | yes | 0 | 0 | - |
| furniture/kitchen.png | yes | 0 | 0 | - |
| furniture/parlour.png | yes | 0 | 0 | - |
| furniture/solarium.png | yes | 0 | 0 | - |
| furniture/studio.png | yes | 0 | 0 | - |
| furniture/terrace.png | yes | 0 | 0 | - |
| furniture/turret.png | yes | 0 | 0 | - |
| furniture/workshop.png | yes | 0 | 0 | - |
| oak/bedroom.png | yes | 0 | 0 | - |
| oak/bedroom2-door.png | yes | 0 | 0 | - |
| oak/bestiary.png | yes | 0 | 0 | - |
| oak/boudoir.png | yes | 0 | 0 | - |
| oak/cloakroom.png | yes | 0 | 0 | - |
| oak/dining.png | yes | 0 | 0 | - |
| oak/kitchen.png | yes | 0 | 0 | - |
| oak/parlour.png | yes | 0 | 0 | - |
| oak/solarium.png | yes | 0 | 0 | - |
| oak/studio.png | yes | 0 | 0 | - |
| oak/terrace-up.png | yes | 0 | 0 | - |
| oak/terrace.png | yes | 0 | 0 | - |
| oak/turret.png | yes | 0 | 0 | - |
| oak/workshop.png | yes | 0 | 0 | - |
| oak/outside.png | **MISSING on B side (failure)** | - | - | - |

## Errors verbatim

base2 oak and cand oak (identical apart from the path):
```
page.screenshot: Target page, context or browser has been closed
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

    at Object.capture (<checkout>/tools/house/shot-session.cjs:60:28)
    at shot (<checkout>/tools/house/oak-shots.cjs:27:239)
    at async <checkout>/tools/house/oak-shots.cjs:34:256
```
No page errors in any run. The furniture runs' logs end at `shot bestiary` with exit 0.
