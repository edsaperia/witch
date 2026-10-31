PARTIAL 0/23 done (laptop: FAIL, timeout crash)

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

