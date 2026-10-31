# Refraction #1543: does the heat plume bend the witch standing in front of it? (head 0cb56c2)

QA run, 2026-10-31 (UTC), on exact head `0cb56c2e55dc0992119a32da86ee08eb256fe59a` ("Stage real witch foreground crossings
for refraction review"). This used the builder's new helper `tools/refraction/foreground.cjs` (`captureForeground`). No game
code or helper code was changed. Everything the runner did in the page is listed under **Method**.

## Summary

| # | Item | Result |
|---|------|--------|
| 1 | Build of the exact head; served label | **PASS**: `git rev-parse HEAD` = 0cb56c2e…; `npm ci`, `tools/config/check.mjs` clean; `dist/version.json` = `dev · 0cb56c2`; the helper's own label check accepted it. |
| 2 | Helper on the briefed start, `/?seed=123&refraction=1`, as it loads | **FAIL (helper can't stage)**: both campfires tried were refused with *"Witch body not visible: staging refused"*. On a game's first morning her hat lies on the hats' floor (`rules/wakeUp.ts` hatOnFloor), so she is drawn by `view.bareBatch`; `view.witchBatch.items`, the only batch the helper checks, is empty. A probe at all 5 fires × 1/3/6 m found the same every time (`rejected/probe-which-batch-draws-her.json`). |
| 3 | Helper's screenshots on SwiftShader | **FAIL (timeout) without a runner warm-up**: after moving to the fire, the first screenshot takes ~50 s here (51.6 s and 51.9 s measured); the helper's `page.screenshot` uses Playwright's 30 s default and threw. Runner fix: one warm-up screenshot plus `page.setDefaultTimeout(120000)`. |
| 4 | A real foreground overlap exists (helper accepted) | **PASS**: fire 0 (3472.8, 2292.2), the nearest real beach campfire, accepted at 1 m south; all 5 crossings (−2…+2 m) report `foreground: true`, `overlapsPlume: true`, ellipse radius 0 (fire centre inside her body box); body depth 0.99113 < support depth 0.99128. |
| 5 | **Guard, ordinary scene** (`&creator=0`: party on, hat on, no dream): her opaque pixels ON vs OFF ≤ OFF-return noise? | **NOT DECIDED**: the frame changes on every render even with the game clock frozen, wall clock pinned and `Math.random` reseeded per render. Inside her opaque pixels ON vs OFF is 63–171 px (max 1–4) against 117–189 px (max 1–3) of OFF-return noise: same size, so it neither passes nor fails. ON ≤ noise in 3 of 5 crossings by pixel count; crossing 3 has max 4 vs noise 1. |
| 6 | **Guard, zero-noise scene** (the briefed URL, still in the wake-up dream, hat put on by hand) | **PASS, weak evidence**: OFF-return noise is 0 px everywhere; inside her opaque pixels ON vs OFF is **0 px** in all 5 crossings. The only changes (16–82 px, max 1 level) sit in the plume beside or above her, outside her opaque pixels. Weak because the dream dims and blurs the picture, so her opaque mask is only 68–153 px (mostly the hat), and 1-level changes are near what blur hides. |
| 7 | Overall: refraction leaves a witch in front of the fire untouched | **NOT PROVEN**: no measured bending of her opaque pixels anywhere (item 6), but the ordinary scene can't be measured cleanly (item 5). |
| 8 | Creature crossing, moving camera, GPU/memory | **NOT TESTED** (outside this helper). |

## What to look at

- `side-by-side-ordinary-lateral0.png`: OFF | ON | diff ×8, cropped round her (3× nearest-neighbour), ordinary party scene, fire right behind her. The ×8 diff is mostly the per-render drift (item 5).
- `side-by-side-dream-lateral0.png`: the same for the zero-noise dream frame.
- Each `*/crossing-N/`: the helper's `off.png`, `on.png`, `off-return.png`, `capture.json`, `foreground.json`; and the runner's `off-recheck.png` (OFF re-rendered by the runner), `off-nowitch.png` (same, her batch given no items), `witch-mask.png` (OFF with the opaque-body mask in magenta and the wider any-change mask tinted), `diff-on-vs-off-x8.png`, `diff-return-vs-off-x8.png`, `measure.json`.
- `summary.json`: every number below.

## Numbers

Pixels are 960×540 screenshot pixels (game canvas 320×180 at 3×). "px" = pixels with any channel different; "max" = largest
single channel difference (0–255).

**Ordinary scene** (`/?seed=123&refraction=1&creator=0`, `ordinary-party/`), game clock 1.667 s:

| Crossing (lateral) | Whole frame ON vs OFF: px, max, bounds | Whole frame OFF-return vs OFF: px, max | Opaque-body mask px | Opaque body ON vs OFF: px, max | Opaque body OFF-return vs OFF: px, max | Any-change mask px | Any-change ON vs OFF: px, max | Any-change OFF-return vs OFF: px, max |
|---|---|---|---|---|---|---|---|---|
| 0 (−2 m) | 60,040, 108, [0,2]–[959,539] | 89,049, 108 | 1197 | 144, 1 | 189, 1 | 6,322 | 1,608, 2 | 1,749, 4 |
| 1 (−1 m) | 48,213, 79, [0,2]–[959,539] | 77,348, 107 | 1224 | 171, 1 | 153, 1 | 6,371 | 1,068, 2 | 756, 3 |
| 2 (0 m) | 31,706, 110, [0,2]–[959,539] | 43,343, 110 | 1269 | 63, 1 | 153, 3 | 6,370 | 948, 1 | 1,122, 3 |
| 3 (+1 m) | 39,512, 113, [0,2]–[959,539] | 51,273, 113 | 1269 | 126, 4 | 117, 1 | 6,304 | 642, 4 | 696, 1 |
| 4 (+2 m) | 19,308, 36, [0,2]–[956,539] | 33,459, 48 | 1305 | 63, 3 | 144, 1 | 6,419 | 516, 4 | 1,074, 2 |

**Zero-noise dream frame** (`/?seed=123&refraction=1`, hat put on, `dream-start/`), game clock 1.067 s:

| Crossing (lateral) | Whole frame ON vs OFF: px, max, bounds | Whole frame OFF-return vs OFF: px, max | Opaque-body mask px | Opaque body ON vs OFF: px, max | Opaque body OFF-return vs OFF: px, max | Any-change mask px | Any-change ON vs OFF: px, max | Any-change OFF-return vs OFF: px, max |
|---|---|---|---|---|---|---|---|---|
| 0 (−2 m) | 37, 1, [503,237]–[518,257] | 0, 0 | 153 | **0, 0** | 0, 0 | 5,657 | 36, 1 | 0, 0 |
| 1 (−1 m) | 58, 1, [485,237]–[499,257] | 0, 0 | 135 | **0, 0** | 0, 0 | 5,316 | 58, 1 | 0, 0 |
| 2 (0 m) | 16, 1, [470,237]–[487,263] | 0, 0 | 68 | **0, 0** | 0, 0 | 5,231 | 16, 1 | 0, 0 |
| 3 (+1 m) | 54, 1, [452,237]–[469,263] | 0, 0 | 72 | **0, 0** | 0, 0 | 5,569 | 54, 1 | 0, 0 |
| 4 (+2 m) | 82, 1, [437,243]–[457,263] | 0, 0 | 117 | **0, 0** | 0, 0 | 5,614 | 37, 1 | 0, 0 |

Fire form (both runs): one fire, centre (0.4991, 0.5349), half-size (0.0175 × 0.0537), strength 1.5.

## Method

- **Browser**: preinstalled Chromium + Playwright, headless, `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`, 960×540. Renderer string: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`; Chrome 153 Linux, 4 cores. `dist/` served by `scripts/serve.cjs` on 127.0.0.1 with `no-store`.
- **Freezing** (from the previous pass's `lib.cjs`): an init script seeds `Math.random` and sets `window.witch.manual = true` the moment the hooks object exists; 30 frames stepped and the art settled; then she is placed with `witch.shot("at:x,z+3")` at the nearest real campfire, 60 frames are stepped, the art settles, and `performance.now`/`Date.now` are pinned before the helper runs.
- **Runner-only staging, in the page**: (a) `game.witches[0].hat.down = null` (her hat on her head, as after picking it up), needed for item 2. In the ordinary run it was already on (`wasDown: null`), so this did nothing there. (b) A warm-up screenshot (≤180 s) and `page.setDefaultTimeout(120000)` (item 3). (c) In run 7 only, `view.render` wrapped to reseed `Math.random` each call; its PNGs came out byte-identical to run 6, so the drift is not `Math.random`.
- **Helper**: `await captureForeground(page, '0cb56c2e55dc0992119a32da86ee08eb256fe59a', dir, { fire: { x, z } })`, unchanged. It found 1 m, then took OFF/ON/OFF-return at −2/−1/0/+1/+2 m.
- **Witch mask**: after the helper restored the scene, the runner re-staged each crossing the way the helper does (`witch.shot("at:x,z")` with her exact x and z, refraction ON render, art idle, 4 renders at the same frozen clock). It then rendered refraction OFF twice: once as is (`off-recheck.png`) and once with `view.witchBatch.set` wrapped to draw no items (`off-nowitch.png`; hiding the mesh doesn't work, because `SpriteBatch.set` turns it visible again each render). Both masks are clipped to the helper's padded body envelope: the **opaque-body mask** is pixels that change by ≥ 24 levels when she is removed; the **any-change mask** is pixels that change at all (it also catches her soft light, shadow and blur halo). The pass test is the opaque-body mask.
- Diffs are computed in a browser canvas (`scripts/calc.cjs`; the repo has no pngjs). Diff images are |A−B| × 8.

## Caveats (read these)

1. **Ordinary scene not still.** With `&creator=0` (party on) the frame drifts on every `view.render` call: small particles, sparkles and mist glows all over the frame, up to 113 levels. It repeats exactly across runs (runs 6 and 7 are byte-identical) and is not driven by `Math.random`, wall clock or game clock, so some render-side state moves forward one step per call. The helper renders OFF→ON→OFF, so ON vs OFF is one step of drift and OFF-return vs OFF is two. That is why item 5 can't be decided. The OFF identity a guard test needs can't be measured in this scene without a render that holds still (a builder question, not something a runner can fix).
2. **Masks in the ordinary run are approximate.** The runner's re-render is a few render calls later than the helper's, so `off-recheck` differs from the helper's `off` by 90k–267k px of the same drift. Her own position is identical (same `shot`), but drift inside her box can leak into the ≥ 24 mask.
3. **Dream frame is not ordinary play.** The briefed URL lands in the first-morning wake-up: she's asleep and dreaming ("… zzz …"), and the picture is dimmed and, in this run, blurred. An earlier run of the same setup (`rejected/run4-…`) came out sharp, so how much blur you get depends on timing. Run 4's numbers were similar (ON vs OFF 27–165 px, max 4–5, all within y 237–263 round the plume; OFF-return 0), but its mask failed (empty), so it isn't counted.
4. The hat on her head was set by hand for the dream run; the helper can't stage the briefed start without it (item 2).
5. Only one campfire was accepted (fire 0, on a beach); fire 1 was tried only in the first, refused run. I didn't check whether seed 123 has an inland fire.
6. SwiftShader only; no hardware GPU. The previous pass's whole-frame sea noise didn't show here at the fire.

## Timings (wall clock)

| Run | Page load | Warm-up screenshot | `captureForeground` | Mask + analysis per crossing | Whole run |
|---|---|---|---|---|---|
| Ordinary (`creator=0`) | 26.7 s | 0.8 s | 17.1 s | ~1.9 s | 138.5 s |
| Dream start | 28.0 s | 51.9 s | 66.7 s | ~2.4 s | 148.9 s |

All runs stayed inside the 15-minute bound. Seven runs plus five probes, about 45 minutes in all, including the diagnosis of items 2–3.

## Rejected attempts (`rejected/`)

- `run1-hat-on-floor.txt`: briefed URL; fires 0 and 1 refused, *"Witch body not visible: staging refused"* (item 2).
- `run2-screenshot-timeout.txt`, `run3-screenshot-timeout-nofreeze.txt`: hat on; staging passed; the helper's first screenshot timed out at 30 s, with and without the pinned clock (item 3; `scripts/probe5.cjs` timed the first composite at 49.6 s).
- `run4-mask-method-broken.txt`: first full capture; mask method was `mesh.visible = false`, which `SpriteBatch.set` undoes, so the mask came out empty.
- `probe-which-batch-draws-her.json`: all 5 fires × 1/3/6 m: `witchBatch` 0 items, `bareBatch` 2, hat down.

## Scripts (`scripts/`)

`run.cjs` (runner; env `HAT_ON`, `ONE_FIRE`, `NO_FREEZE`, `RESEED`), `calc.cjs` (diffs and masks), `reanalyse.cjs` (recomputes from saved PNGs), `lib.cjs` / `serve.cjs` (from the previous pass), `probe2.cjs` (which batch draws her), `probe5.cjs` (screenshot timing).
Example: `HAT_ON=1 ONE_FIRE=1 NODE_PATH=$(npm root -g) node run.cjs "http://127.0.0.1:8765/?seed=123&refraction=1&creator=0" out 0cb56c2e55dc0992119a32da86ee08eb256fe59a`.

## Suggested for the builder (not done here)

1. Let the helper accept `view.bareBatch` (her hat off or on the floor) as her visible body, or refuse with a message that says why.
2. Give the helper's screenshots an explicit long timeout, or warm up once before the first screenshot.
3. Find what changes on every `view.render` call during the party with the clocks frozen, so the ordinary-scene guard can be measured against zero noise.
