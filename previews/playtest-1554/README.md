# Playtest render review: PR #1554 (chain on the ground, mushroom glow)

QA run, 2026-10-31 (UTC). No game code changed. Captures by the builder's own driver, `tools/shot/playtest-render.cjs` from the candidate, run against both builds.

- **Base:** `ea42af826b923b4261d841b10e7da3b4d3997b2f` (merge base with `origin/claude/prototype`, checked with `git merge-base`); served `version.json` = `dev · ea42af8`.
- **Candidate:** `f136339b97c1d248d502dd4a497a5c9dad1656c5` (`codex/playtest-1031-render` head); served `version.json` = `dev · f136339`.
- **Renderer (both):** `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`, 1280×720, seed 123, `?shot=creature:fox@2`.
- **Timings:** game ready in 67 s (base) / 71 s (candidate); each screenshot 0.2–4.5 s; whole run 181 s / 190 s (`captures/*/run.json`). No page or console errors on either build.
- The driver ran unchanged against the base: it only uses `window.witch` hooks the base already has. My copy (`scripts/driver.cjs`) adds only `--ignore-gpu-blocklist`, a 120 s default timeout, one warm-up screenshot, and the renderer string and timings in `run.json`.

## Files

| File | What |
|---|---|
| `01`–`05-chain-*.png` | base \| candidate \| 8× abs diff, the five chain poses in order |
| `06`–`11-mushroom-*.png` | the same for blue, red, turquoise at 4 m (near) and 24 m (far) |
| `candidate-chain-strip.png` | the candidate's five poses in a row (half size) |
| `chain-closeup-base-top-candidate-bottom.png` | 2× close-up of the leash and fox, base on top, candidate below, poses left to right |
| `path-ground-closeup.png` | 3× close-up of the ground under the foxes: base path, candidate path, candidate falling |
| `mushroom-glow-closeups.png` | each mushroom close up, base left, candidate right (rows: blue near/far, red near/far, turquoise near/far) |
| `metrics.json`, `mushroom-glow-stats.json` | the numbers below |
| `scripts/` | the driver copy, the static server, the comparison scripts |

Diff numbers: "changed" = any channel differs; ">8" = some channel differs by more than 8 of 255. **Noise floor:** the grass (bottom left and bottom right) differs between the two builds in every frame, even in pose 1 where the code paths are the same; about 20–30k px of each count, and the reason every bounding box spans the whole width. Read the counts as rough.

## Chain poses

| # | Pose | Changed px | >8 | Max | Bounds (x0,y0,x1,y1) | What I see |
|---|---|---|---|---|---|---|
| 1 | chain | 33,605 | 21,846 | 176 | 27,496 – 1269,717 | Same picture: the chain hangs straight down from above to the fox's collar in both. The diff is the grass only. |
| 2 | falling | 102,821 | 51,081 | 249 | 207,100 – 1279,717 | **Base: no chain at all** (it vanishes the moment she starts travelling). **Candidate: the chain is drawn**, swung over to a diagonal from upper left down to the fox, the same blue links as pose 1. Also, the candidate's fox has moved right, into its travelling place; the base's fox is still where it was. |
| 3 | path | 124,758 | 72,917 | 254 | 0,142 – 1279,717 | Base: no chain. Candidate: a short blue zigzag on the ground under the foxes' feet (see `path-ground-closeup.png`). It is the same blue and line, but **almost all of it is hidden behind the fox sprites** in this camera, so from this frame alone I can't say it reads as "the chain on the ground"; it reads as a few blue scribbles by the paws. Most of the diff is the fox drawn in a different place (the candidate shows three overlapping fox bodies; the base two). |
| 4 | lifting | 59,412 | 16,905 | 240 | 0,0 – 1279,717 | Base: chain snaps straight back to vertical. Candidate: the chain is on a diagonal again, between pose 2's angle and vertical: a lift, not a snap. The foxes now match the base. |
| 5 | rejoined | 3,661 | 2,305 | 176 | 1215,250 – 1279,717 | Same as base: the vertical chain, back as in pose 1. Diff is grass at the right edge only. |

**Candidate's own pose-to-pose change** (`metrics.json`, `candidate_pose_to_pose`): 93k, 123k, 113k, 116k px over 8 between successive poses. Every step moves about the same amount, so no single step jumps; but much of that is the scene's own animation (the rainbow ring at bottom right grows across the poses, the grass), not the chain.

**Smoothness:** going by the angle, chain → falling → path → lifting → rejoined goes vertical → diagonal → on the ground → diagonal → vertical, which is the fall and lift the PR describes. Five poses at 0.25–0.5 s steps can't show in-between popping; I saw no frame where the chain is missing, doubled or cut off by the screen edge. The base, by contrast, drops the chain for the whole trip.

## Mushroom glow

| Frame | Changed px | >8 | Max | Bounds | Box mean RGB base → cand | Saturation base → cand | What I see |
|---|---|---|---|---|---|---|---|
| blue near (4 m) | 16,565 | 8,461 | 171 | 0,229 – 1279,717 | 122,83,61 → 115,78,78 | 0.54 → 0.63 | Blue halo stronger and wider, clearly blue. |
| blue far (24 m) | 14,999 | 10,117 | 171 | 0,64 – 1279,717 | 21,26,50 → 6,14,83 | 0.70 → 0.93 | Base: a pale, nearly white-blue cap. Candidate: deep saturated blue: **its own colour, not whiter**. But the cap is now nearly the same blue as its halo, so its shape is blurrier and the mushroom is darker against the dark ground than the base's pale one. |
| red near | 76,790 | 41,178 | 254 | 0,142 – 1279,708 | 145,83,53 → 166,73,45 | 0.67 → 0.74 | Strong red halo; it tints the fox's tail red. Most of this count is a fox in a different place (see caveats), not the glow. |
| red far | 72,605 | 39,738 | 254 | 0,64 – 1279,708 | 79,31,34 → 109,6,10 | 0.63 → 0.93 | Base: pinkish-white cap. Candidate: pure red cap and halo, brighter. Same blur of the cap into the halo as blue; red reads best of the three. Count also includes the fox in a different place. |
| turquoise near | 12,269 | 4,782 | 171 | 0,172 – 1279,708 | 124,86,52 → 120,96,57 | 0.57 → 0.60 | Green-turquoise halo stronger. |
| turquoise far | 9,083 | 5,664 | 171 | 0,82 – 1279,708 | 17,30,32 → 7,44,38 | 0.62 → 0.86 | Base: pale mint cap. Candidate: turquoise-green cap and halo, a little greener than turquoise; cap spots still visible. |

Near-white pixels in each glow box fall or stay level in the candidate (e.g. blue far 66 → 57, red near 459 → 414) except turquoise near (270 → 405, where more of the fox's pale tail tip is lit). Brightness (mean value) goes up in every frame. So: **stronger, in each mushroom's own colour, not whiter.**

## Caveats

1. **SwiftShader only**, not a GPU. Colours and glow falloff may differ on Ed's machine.
2. **The near (4 m) mushrooms sit behind a fox's tail** with the driver's placement (`witch.z − 4`), so the near frames mostly show glow round the tail, not the mushroom. Far frames are the clean colour check.
3. **Fox positions differ between the builds** in the falling, path and red frames (the candidate's travel pose places the leashed fox differently, and that state carries into the first mushroom frames). Those counts mix fox movement with the chain or glow change.
4. **The path pose can't really show the chain on the ground here**: the foxes cover it. A frame with the fox further from its route, or the camera tilted, would show whether the ground chain reads as links.
5. Five poses can't prove there is no popping between them; it would need a frame-by-frame capture across a fall and a lift.
6. The grass differs between builds in every frame (noise floor above); I didn't hunt down why, as it's outside this PR's files.
