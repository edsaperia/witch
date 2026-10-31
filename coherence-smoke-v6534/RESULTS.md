FAIL: ley, laptop (both repeated); trunks, tilt-before timed out. PARTIAL 6/23 done (4 pass)

# Full smoke run on 003eb8cc0fad18014fe1d8430784d649fc5e4a0d

Software renderer (SwiftShader), cloud container. Started 2026-10-31 11:08 UTC. Each batch: `timeout --kill-after=10s 2700s env ONLY=<names> node tools/smoke/smoke.cjs`.

## Scenes (from tools/smoke/smoke.cjs `run(...)` names)

laptop, heath, phone, tilt-before, tilt-after, tilt-off, dancefloor, effects-off, effects-on, party, earth, ley, trunks, leash, cull, speed, slope, siege, boost, neutral, ground, vanish-1900x1240, vanish-2000x1076

(vanish-* are KNOWN on the software renderer: reported known, not flown, without SMOKE_GPU=1.)

## Batches

### Batch 1: laptop,heath,phone,tilt-before,tilt-after,tilt-off

- exit code: 1
- wall time: 1021s (11:27 UTC end)

```
```

Error (trimmed):
```
page.waitForFunction: Timeout 240000ms exceeded.
    at hold (/home/user/witch/tools/smoke/smoke.cjs:138:16)
    at async flyPath (/home/user/witch/tools/smoke/smoke.cjs:165:9)
    at async /home/user/witch/tools/smoke/smoke.cjs:214:5
    at async run (/home/user/witch/tools/smoke/smoke.cjs:107:5)
    at async main (/home/user/witch/tools/smoke/smoke.cjs:173:3) {
  log: [],
  name: 'TimeoutError'
}
```

Note: the run threw in `laptop` (an uncaught `page.waitForFunction` timeout in `hold`, smoke.cjs:138 via flyPath at :214), and smoke.cjs aborts the whole run on an uncaught error, so no ok/FAIL lines were printed and heath, phone, tilt-before, tilt-after and tilt-off never ran. They are rerun without laptop as batch 1b.

### Batch 1b: heath,phone,tilt-before,tilt-after,tilt-off

- exit code: 124 (timed out)
- wall time: 2701s (12:12 UTC end)

```
```

Error (trimmed):
```
page.screenshot: Target page, context or browser has been closed
Call log:
[2m  - taking page screenshot[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m

    at shot (/home/user/witch/tools/smoke/smoke.cjs:153:69)
    at async /home/user/witch/tools/smoke/smoke.cjs:303:7
    at async run (/home/user/witch/tools/smoke/smoke.cjs:107:5)
    at async main (/home/user/witch/tools/smoke/smoke.cjs:297:5) {
  log: [
    '  - taking page screenshot',
    '  - waiting for fonts to load...',
    '  - fonts loaded'
  ]
}
```

Note: 1b hit its 2700 s cap inside tilt-before's first screenshot (smoke.cjs:303). heath and phone had run (their screenshots 08, 10, 11 were written), but smoke.cjs prints ok/FAIL only at the end of a run, so their checks are lost. tilt-before: TIMEOUT (more than ~13 min, still in its first shot). From here, one scene per run (cap 900 s), so a slow scene can't take others' results with it.

### Batch s-dancefloor: dancefloor

- exit code: 0
- wall time: 361s (12:18 UTC end)

```
ok   over the treetops, no wave number shows for a stone past the bent horizon (10 drawn, 0 past the horizon, 0 still showing)
smoke test passed
```

### Batch s-party: party

- exit code: 0
- wall time: 731s (12:31 UTC end)

```
ok   the first wave partifies home's neighbours (1 areas)
ok   after four waves 5 areas are partified
smoke test passed
```

### Batch s-earth: earth

- exit code: 0
- wall time: 168s (12:34 UTC end)

```
ok   every layer stands on the rolling ground and bends with the world (86 checked)
ok   nothing drawn without a depth test shows through the bent earth
smoke test passed
```

### Batch s-ley: ley

- exit code: 1
- wall time: 221s (12:37 UTC end)

```
FAIL the ley line is drawn from home through every area (10 sections for 11 areas), the last reached at 0 (2798 triangles)
ok   only the next stone has a HUD indicator (1 for the 1 waking next)
ok   two waves on, the same line, moved on along it (18,17 → 19,17 → 20,18, now at 19,17, 1 behind, 9 ahead)
FAILED:
```

Error (trimmed):
```
FAILED:
the ley line is drawn from home through every area (10 sections for 11 areas), the last reached at 0 (2798 triangles)
```

### Batch s-trunks: trunks

- exit code: 124 (timed out)
- wall time: 900s (12:52 UTC end)

```
```

Error (trimmed):
```
page.waitForFunction: Target page, context or browser has been closed
    at /home/user/witch/tools/smoke/smoke.cjs:474:16
    at async run (/home/user/witch/tools/smoke/smoke.cjs:107:5)
    at async main (/home/user/witch/tools/smoke/smoke.cjs:469:3) {
  log: []
}
```

### Batch s-cull: cull

- exit code: 0
- wall time: 243s (12:56 UTC end)

```
smoke test passed
```

### Batch rerun-ley: ley

- exit code: 1
- wall time: 244s (13:01 UTC end)

```
FAIL the ley line is drawn from home through every area (10 sections for 11 areas), the last reached at 0 (2798 triangles)
ok   only the next stone has a HUD indicator (1 for the 1 waking next)
ok   two waves on, the same line, moved on along it (18,17 → 19,17 → 20,18, now at 19,17, 1 behind, 9 ahead)
FAILED:
```

Error (trimmed):
```
FAILED:
the ley line is drawn from home through every area (10 sections for 11 areas), the last reached at 0 (2798 triangles)
```

### Batch rerun-laptop: laptop

- exit code: 1
- wall time: 1185s (13:20 UTC end)

```
```

Error (trimmed):
```
page.waitForFunction: Timeout 240000ms exceeded.
    at hold (/home/user/witch/tools/smoke/smoke.cjs:138:16)
    at async flyPath (/home/user/witch/tools/smoke/smoke.cjs:163:9)
    at async /home/user/witch/tools/smoke/smoke.cjs:214:5
    at async run (/home/user/witch/tools/smoke/smoke.cjs:107:5)
    at async main (/home/user/witch/tools/smoke/smoke.cjs:173:3) {
  log: [],
  name: 'TimeoutError'
}
```

## Summary (13:21 UTC, 133 of 150 minutes used)

| Scene | Result | Rerun |
|---|---|---|
| dancefloor | pass | |
| party | pass | |
| earth | pass | |
| cull | pass (no checks of its own; "smoke test passed") | |
| ley | **FAIL**: "the ley line is drawn from home through every area (10 sections for 11 areas), the last reached at 0 (2798 triangles)" | repeated identically: **real** |
| laptop | **FAIL**: uncaught `page.waitForFunction: Timeout 240000ms exceeded` in `hold` during flyPath (smoke.cjs:138 ← :165 / :163 ← :214); aborts the run, so no checks were printed | repeated (1185 s, same timeout in flyPath): **real** (or the software renderer too slow for the 240 s hold) |
| trunks | TIMEOUT at the 900 s cap, in its body (smoke.cjs:474) | not rerun: a 1200 s rerun wouldn't fit the budget |
| tilt-before | TIMEOUT: still in its first screenshot (smoke.cjs:303) when batch 1b hit 2700 s | not rerun |
| heath, phone | ran in batch 1b (screenshots 08, 10, 11 in previews/) but their checks were lost when the batch timed out | not run again |
| vanish-1900x1240, vanish-2000x1076 | KNOWN (#1090): fly only on a real GPU | |
| tilt-after, tilt-off, effects-off, effects-on, leash, speed, slope, siege, boost, neutral, ground | **not run**: out of budget | |

Lessons for the next runner: on this container scenes take 4 to 20+ minutes each, and smoke.cjs prints results only at the end and aborts the whole run on any uncaught timeout, so run one scene per invocation.
