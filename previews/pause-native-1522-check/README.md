FAIL: the bug is fixed (3 of 3 runs), but on the extra pause-page check Tab no longer moves focus while paused, so the pause page's controls can't be reached by keyboard. Once focused, Enter and Space on them still work.

Build: commit dfe11743ca8d067ea4abaade7a99817bd107120f (checked with `git rev-parse HEAD`), `npm ci`, `WITCH_SHA=dfe1174… npx vite build`, served from dist/ by the script's own static server.
Page and method as in previews/pause-native-1519 (same URL, 1280×720, SwiftShader, a fresh context per run, a capture key log added before the game's scripts). Script: `repro.cjs` here, which is the 1519 script plus steps 9–14 and an output-folder argument (`node repro.cjs dist <out>`). Raw log: `results.json`. No page errors in any run.

## Runs 1 and 2 (Enter): identical
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 focus ✕ | ✕ button | 0 | yes | no | — |
| 5 Esc | BODY (the fix blurs ✕ on pause) | 0 | yes | yes (shield on top) | Escape down: true, up: true |
| 6 Enter | BODY | 0 | **yes** | yes | Enter down: **true**, up: true |
| 7 Space | BODY | 0 | **yes** | yes | Space down: **true**, up: **true** |
| 8 Esc (resume) | BODY | 0 | **yes** | no | Escape down: true, up: false |

## Run 3 (Space only, Enter not pressed)
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 | ✕ button | 0 | yes | no | — |
| 5 Esc | BODY | 0 | yes | yes | Escape down: true, up: true |
| 7 Space | BODY | 0 | **yes** | yes | Space down: **true**, up: **true** |
| 8 resume | BODY | 0 | **yes** | no | Escape down: true, up: false |

Every expected point holds: clicks 0, Finds open while paused and after resume, Enter/Space keydown and Space keyup preventDefaulted. Focus left the ✕ on pause (to BODY), as the fix intends.

## Pause-page control check (steps 9–13, all 3 runs, identical)
| step | result |
|---|---|
| 9 Esc (re-pause) | paused, focus BODY |
| 10 Tab ×40 | **focus never moved off BODY**; every Tab keydown/keyup defaultPrevented true |
| 10b | `❔ Controls` (in `#pause-btns`) focused by script instead |
| 11 Enter on it | works: keydown not prevented, the CONTROLS corner panel opened |
| 12 Space on it | works: not prevented, the panel closed again (toggle) |
| 13 Esc | resumed, focus BODY |

## Reading
- The new `preventDefault` in `src/platform/freeze.ts` (key handler) applies to every key the pause layer takes whose target is outside `PAUSE_UI`, and on pause the fix blurs focus to BODY, so Tab's own default (moving focus) is cancelled too: a keyboard player can't Tab into the pause page. From code reading this is new with the fix (before it nothing called `preventDefault`); I did not run the pre-fix build to show Tab working there.
- A possible narrowing (not tried): prevent only Enter and Space (and keyup of Space), or leave Tab alone.
- Not tested: mouse/pad on the pause page, other overlays' buttons, sliders' arrow keys.

Screenshots: `run<N>-5-paused.png`, `run<N>-6-enter.png` (runs 1–2), `run<N>-7-space.png`, `run<N>-8-resumed.png`, `run<N>-11-pause-control-enter.png` (Controls panel open), `run<N>-12-pause-control-space.png` (closed).
