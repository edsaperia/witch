# Dodge echoes (PR #1545) — QA capture, build 17a8111

Build: `codex/dodge-echoes` at exact `17a8111ef8527eea12fcde19ce05a769d2e02ed6`, `npm ci`, `WITCH_SHA=… npm run build`; `dist/version.json` says `dev · 17a8111`.
Renderer: headless Chromium (Playwright, preinstalled) with ANGLE SwiftShader (software GL), 960×540. Page: `/?shot=creature:fox@1&seed=123&creator=0&dodgeEchoes=1` (the shot loader: waves held, her on foot by the dancefloor with a level-1 fox 6 m east). Math.random seeded, `witch.manual = true`, frames stepped at 1/60 s with `witch.frame`. Two capture runs took about 2 minutes each, plus two diagnostic runs.
No game code was changed. The `?dodgeEchoes=1` switch did turn on (`view.dodgeEchoes.enabled === true`), and comfort/secondary detail allowed it (the meshes were made and fed every frame).

## Results

| Item | Result | In short |
|---|---|---|
| Echoes visible / readable at all | **FAIL** | At the game's own strength (alpha 0.24 at birth, fading) the echo changes **0 pixels** in the finished picture in every frame captured. Forced to alpha 0.19 it changes 828 px by at most 2/255; it only reads from about 0.45 and up (see `diag-alpha-sweep.png`). |
| a. single sideways dodge, 0.05 / 0.15 / 0.30 s | **FAIL** (logic OK) | The departure echo is made at the right spot (where she stood) and fades on time (0.193 → 0.082 → 0.003). 0 px ON vs OFF at every time. |
| a. arrival echo | **FAIL** (by design?) | She is gone 0.2 s here (`dodge.a.gone`, not `dash.gone` 0.05), the arrival echo is shown when she reappears but is dated to the dodge's start, so it is born at alpha 0.034 and is gone 0.12 s later. It also sits exactly under her (she stands still), drawn behind her body (renderOrder 9.9 vs 10). |
| b. dodge that turns her | **PASS (logic) / FAIL (visible)** | Two departure echoes from her walk east (spaced 0.96 m, both facing her old way) and she arrives facing west. Nothing on screen. |
| c1. three dodges at the real 1 s cooldown | **PASS (logic) / FAIL (visible)** | Each dodge has its own echoes at its own departure point; the earlier ones have expired. |
| c2. three rapid dodges (cooldown lowered in-page to 0.1 s, 0.15 s apart) | **FAIL** | Because she's gone 0.2 s per blink, no new pose is ever recorded between blinks: the 2nd and 3rd dodges' "departure" echoes both reuse her **original** spot from two blinks back (3208.5, while she actually left from ~3192 and ~3171). No arrival echoes (each blink cancels the last's). Stacked duplicates at one spot. Can this happen in play? Only if blinks come faster than the time she's gone (Hare's Dash burst charges with a short chain?) — unverified. |
| d. camera moving during echoes | **PASS (logic) / NOT TESTED (pixels)** | Echo world position stays fixed (3208.51, 2856.5) while she walks north and the camera follows. With nothing on screen there's nothing to see drift. |
| e. occlusion (fox / trees) | **NOT TESTED** | The fox wasn't between the camera and the echo, and the echo draws nothing at its real alpha. With the echo forced opaque red, depthTest on/off gave the same picture (nothing in front in that spot). |
| f. pause during echoes, then resume | **PASS (logic)** | Paused for 60 frames: alpha held at 0.171, clock still. Resumed: it fades (0.068) and is gone by +0.4 s. No leftovers. |
| Leftovers after expiry | **PASS** | `echoes: []` and 0 px ON vs OFF after 0.32 s in every case; owned batches stay allocated (3), empty. |
| `enabled = false` vs meshes hidden | **inconclusive** | 12,456 px differ, but in the fox (see caveat 2), not the echo. |
| Page errors | **PASS** | None in any run. |

## What I see

- **The silhouette itself is right when you can see it.** Forced to opaque red or to alpha 0.75 (`diag-alpha-sweep.png`), it's a clean witch-shaped silhouette, her actual pose, standing on her departure spot.
- **At the shipped strength it is lost entirely.** It sits right under the existing dash motes and ribbon (white/violet, bright, drawn over it) and its blue tint at ≤ 0.24 alpha disappears in the night scene and the view's post-processing. The response is very non-linear (0.19 → max 2/255, 0.3 → 20, 0.5 → 59, 0.75 → 118), so something after the echo (the motes/glow over it, or the post pass) crushes faint layers. I did not track down which.
- So in play with the motes on (as the plan asks for this first comparison), Ed would see **no difference** with `?dodgeEchoes=1` on this renderer.

## Measurement method and caveats

1. Each capture point is drawn three times at the same game time: ON, OFF (the three echo meshes set `visible = false`), ON again. I hid the meshes instead of setting `view.dodgeEchoes.enabled = false`, because disabling clears the live echoes (`dodgeEchoModel.ts`), which would spoil the next ON frame.
2. The frame `witch.frame` draws while stepping differs from a plain re-render at the same time (the fox's pose moves). Repeated re-renders are identical to each other (checked: 4 in a row, 0 px). So all ON/OFF/ON2 pictures are re-renders. Where the table's diffs.json still shows changes (b-turn-0.06, c1-dodge1, c2-rapid3, e-fox-0.05, f-prepause), ON vs ON2 changes by the same amount, and the side-by-sides show it's the fox: it isn't the echo.
3. Software GL (SwiftShader). A real GPU might blend slightly differently, but not enough to turn 0/255 into something visible.
4. Rapid dodges needed `tuning.dash.cooldown` lowered to 0.1 s **in the page** (restored afterwards). Real-play reachability is unverified.
5. GPU/draw-call cost was not measured.

## Files

- `side-<case>.png`: OFF | ON | 8× diff (top: full frame, bottom: crop around any change or the middle).
- `strip-single-dodge-on.png`: the single dodge ON: before, 0.05, 0.15, 0.30, 0.40 s.
- `diag-alpha-sweep.png`: the same dodge with the echo hidden, then forced to alpha 0.19 / 0.45 / 0.75 (the game uses ≤ 0.24).
- `capture.json` (echo state per frame: world x/z, born, alpha, per-batch uniform), `diffs.json` (changed px / max / bounds / ON-vs-ON2), `diag.json`.
- `capture.cjs` (capture; `PROBE=1` for the re-render check), `diag.cjs` (alpha sweep), `compose.py` (diffs and pictures). Raw frames are not committed (13 MB); rerun with `node previews/dodge-echoes-1545/capture.cjs && python3 -I previews/dodge-echoes-1545/compose.py` after a build.
