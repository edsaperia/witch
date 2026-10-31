# Refraction #1543: does the heat plume bend the witch in front of a campfire? (head 580fcb8, with the capture hold)

QA run, 2026-10-31 (UTC), on exact head `580fcb8340920097a72f216780f37da5b35e5f06` ("Hold prepared scene state during
foreground captures"). Helper used unchanged: `tools/refraction/foreground.cjs` → `capture-hold.cjs` → `capture-pair.cjs`.
No game or helper code was changed. Follows `../foreground-0cb56c2/`, which could not decide the ordinary scene.

## Summary

| # | Item | Result |
|---|------|--------|
| 1 | Build of the exact head | **PASS**: HEAD = 580fcb83…; `npm ci`, `node tools/config/check.mjs` clean; `dist/version.json` = `dev · 580fcb8`; the helper's label check accepted it. |
| 2 | Helper stages the ordinary scene unaided (`/?seed=123&refraction=1&creator=0`) | **PASS**: no runner hat fix, clock pin or timeout change was needed for the helper itself. Nearest fire (3472.8, 2292.2) accepted at 1 m south; 5/5 crossings `foreground: true`, `overlapsPlume: true`, drawn by `witchBatch`. 0 page/console errors. |
| 3 | **Capture hold works** (OFF-return vs OFF, whole frame) | **PASS**: **0 px** in all 5 crossings (the 0cb56c2 run had 33k–89k px). ON vs OFF is now 9–99 px, all inside the plume (y 235–261). |
| 4 | **Witch guard**: ON vs OFF inside her opaque body = 0 (noise is 0) | **FAIL (small)**: crossings 0 and 4 are 0 px; crossings **1, 2, 3 change 36, 9 and 18 of her opaque-body pixels by up to 3, 3 and 1 levels**, against 0 px OFF-return noise. In crossing 2 (fire straight behind her) those 9 px are the *only* pixels in the whole frame that refraction changed. |
| 5 | Creature guard | **NOT TESTED**: no friendly, unleashed creature exists in this scene (the 12 nearest are wild moles, badgers, snails; `run.json` `creatures`), so `creatureId` had nothing valid to name. |
| 6 | Drift culprits (one full `View.render` at fixed game time, no hold) | **LISTED** below: camera (`camLift`), `mistClock`, `uScenery`, `uGlowR`, witch-follow uniforms, four `iPos` buffers. `canopyNow` is never reported (see caveat 3). |

## Numbers (ordinary scene, game clock 1.500 s, 960×540 screenshots of the 320×180 canvas at 3×)

"px" = pixels with any channel different; "max" = largest channel difference (0–255). Opaque-body mask = pixels inside the
helper's padded body envelope that change by ≥ 24 levels between the helper's held `off.png` and `off-nowitch.png`.
Edge/interior: interior if every pixel one art texel (±3 px) round it is also in the mask.

| Crossing (lateral) | Batch | Whole ON vs OFF: px, max, bounds | Whole OFF-return vs OFF | Opaque mask px | **Opaque ON vs OFF: px, max** | of which edge / interior | Opaque OFF-return vs OFF | Body depth < support depth |
|---|---|---|---|---|---|---|---|---|
| 0 (−2 m) | witchBatch | 99, 4, [501,235]–[518,261] | 0, 0 | 1242 | **0, 0** | 0 / 0 | 0, 0 | 0.99114 < 0.99129 |
| 1 (−1 m) | witchBatch | 45, 3, [489,235]–[500,255] | 0, 0 | 1422 | **36, 3** | 9 / 27 | 0, 0 | 0.99112 < 0.99128 |
| 2 (0 m) | witchBatch | 9, 3, [468,259]–[470,261] | 0, 0 | 1323 | **9, 3** | 9 / 0 | 0, 0 | 0.99112 < 0.99127 |
| 3 (+1 m) | witchBatch | 54, 2, [453,253]–[470,261] | 0, 0 | 1404 | **18, 1** | 18 / 0 | 0, 0 | 0.99111 < 0.99126 |
| 4 (+2 m) | witchBatch | 99, 2, [438,235]–[458,261] | 0, 0 | 1395 | **0, 0** | 0 / 0 | 0, 0 | 0.99111 < 0.99126 |

Fire form: one fire, shape ≈ (0.533, 0.535, 0.0174, 0.0534), support depth ≈ 0.9913, strength 1.5. Every changed pixel is listed
with its OFF / ON / no-witch colour in `ordinary/crossing-N/opaque-changes.json`.

What the leaking pixels are: in crossing 1 they sit on her right side, one art texel wide (x 489–494, y 244–255), right over the
fire's glow; she is faint there (removing her moves those pixels only 27–29 levels, e.g. OFF (145,134,146), no-witch (174,163,165),
ON (147,135,145)). In crossings 2 and 3 they are single art texels on her silhouette edge (her feet/broom near the fire base).
So the guard leaks at low strength on thin or faint parts of her body near the plume, not across her whole figure. Whether
1–3 levels is acceptable is the reviewer's call; by the brief's test (0 px, noise 0) it fails.

## Drift culprits (helper's `drift`, 5 probes, one per crossing; `ordinary/foreground.json` → `stages[i].drift.changes`)

141–211 changed keys per render call, 36 distinct after dropping object ids:

- **Camera**: `camLift` eases each call (0.786 → 0.739 on the first probe, 0.2015 → 0.1894 on the third), so the camera matrix (`camera`) and everything that follows it changes: `uBack` (crown), `uWitch`, `uWitchDepth`, `uCutout` (80 sprite meshes + crown).
- **`mistClock`**: +0.1 s per call (performance.now, capped at 0.1), driving the loading mist.
- **`uScenery`**: x 360 → 355.3 per call on 216 meshes, crown, Points, magic layers and LineSegments.
- **`uGlowR`**: 62.328 → 62.312 per call on ~300 meshes (Points, Magic upright/ground layers 0–3, canopy halo, LineSegments, crown).
- **`iPos` instance buffers**: 4 meshes (ids 222–225) per call.
- Not seen: `canopyNow` (see caveat 3), any particle-position attribute other than those `iPos`.

## Method

- Chromium + Playwright, headless, `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`,
  960×540. Renderer: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`. `dist/` served by
  `scripts/serve.cjs` (no-store) on 127.0.0.1.
- `scripts/lib.cjs` (from earlier passes): init script seeds `Math.random` and sets `witch.manual = true`; 30 frames stepped;
  `witch.shot("at:x,z+3")` at the nearest real fire; 60 frames; art settled; one warm-up screenshot (0.9 s). Unlike 0cb56c2,
  `performance.now`/`Date.now` were **not** pinned, so the drift probe shows the natural culprits; the hold makes them irrelevant to the trio.
- `captureForeground(page, sha, out, { fire })` exactly as documented; the hold is installed by the helper itself round each trio and
  `off-nowitch.png`; drift is probed before it. Then `scripts/run.cjs` → `calc.cjs` (masks and diffs, in a browser canvas),
  `inspect.cjs` (per-pixel list, edge/interior), `crop.cjs` (side-by-sides).
- Timings: page load 31.8 s, first steps + art ~73 s, `captureForeground` 19.1 s (5 crossings), analysis ~2 s; whole run 134 s.
  The whole job, including build, ~30 min.

## Files

- `ordinary/side-by-side-crossing1-lateral-1m.png` (the clearest leak) and `ordinary/side-by-side-crossing2-lateral0.png`: OFF |
  OFF witch hidden | ON | opaque mask | |ON−OFF|×8 | changed opaque pixels in red, cropped round her at 4×. The ×8 diff is
  nearly black because the changes are 1–3 levels; the red panel shows where.
- `ordinary/crossing-N/`: helper's `off.png`, `on.png`, `off-return.png`, `off-nowitch.png`, `capture.json`, `foreground.json`
  (with `drift` and `hold`); runner's `measure.json`, `opaque-changes.json`, `witch-mask.png`, `diff-*-x8.png`, `side-by-side.png`.
- `ordinary/foreground.json`, `ordinary/run.json`, `ordinary/log.txt`; `scripts/`.

## Caveats

1. SwiftShader only; no hardware GPU. One fire (a beach fire, nearest to the start), one seed, one clock.
2. The ≥ 24-level mask counts faint parts of her (where mist/glow already covers her) as opaque body; the crossing-1 leak is in
   such a part (27–29 levels from background). With a stricter threshold (say ≥ 32) those 27 interior pixels would drop out,
   but the edge texels in crossings 2 and 3 (which differ more) would not all; not recomputed here.
3. The drift probe reads `v.canopyNow`, but View keeps it on a sub-object (`src/render/view.ts:246`, updated at :1672), so a
   change there would not be listed under that name (its effect would show via `uCanopyReach`, which was not listed either).
4. Each crossing's camera differs slightly (camLift still easing between stages); within a trio it is held.
5. No creature, moving-camera, edge-of-screen, GPU-time or memory checks.
