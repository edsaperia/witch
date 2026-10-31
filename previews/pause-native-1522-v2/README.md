FAIL (on one listed expectation only): the bug stays fixed (clicks 0, Finds open in all 3 runs) and Tab / Shift+Tab now move focus through the pause page. But because focus now lands on the first pause button (❔ Controls), Enter/Space while paused are **not** defaultPrevented (keydown false, Space keyup false): they press ❔ Controls, which opens and closes the CONTROLS panel. The brief expected both "focus on the first pause button" and "Enter/Space defaultPrevented true"; with this fix the two can't both hold.

Build: commit 89aa6938c7f6b972ca319de071f460e444e98a30 (checked with `git rev-parse HEAD`), `npm ci`, `WITCH_SHA=89aa693… npx vite build`, served from dist/ by the script's own static server.
Page and method as in previews/pause-native-1522-check (same URL `/?dev=finds&creator=0&quick=1&seed=123&island=4&wave=off`, 1280×720, SwiftShader, fresh context per run, key log registered before the game's scripts). Script: `repro.cjs` here = the 1522-check script with step 10 replaced by: Tab ×3, Shift+Tab ×2, then Tab (up to 40) looking for ❔ Controls, falling back to focusing it by script. Run: `node repro.cjs dist previews/pause-native-1522-v2`. Raw log: `results.json`. No page errors in any run.

## Runs 1 and 2 (Enter): identical
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 focus ✕ | ✕ button | 0 | yes | no | — |
| 5 Esc | **❔ Controls** (first `#pause-btns` button) | 0 | yes | yes | Escape down: true, up: false |
| 6 Enter | ❔ Controls | 0 | **yes** | yes | Enter down: **false**, up: false; the CONTROLS panel opened (run1-6-enter.png) |
| 7 Space | ❔ Controls | 0 | **yes** | yes | Space down: **false**, up: **false**; the panel closed again (run1-7-space.png) |
| 8 Esc (resume) | BODY | 0 | **yes** | no | Escape down: true, up: false |

## Run 3 (Space only, Enter not pressed)
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 | ✕ button | 0 | yes | no | — |
| 5 Esc | ❔ Controls | 0 | yes | yes | Escape down: true, up: false |
| 7 Space | ❔ Controls | 0 | **yes** | yes | Space down: **false**, up: **false**; CONTROLS panel opened (run3-7-space.png) |
| 8 resume | BODY | 0 | **yes** | no | Escape down: true, up: false; panel gone, Finds open (run3-8-resumed.png) |

Against the expectations: clicks 0 ✔, Finds open while paused and after resume ✔, focus moves to the first pause button ✔, Enter/Space keydown and Space keyup defaultPrevented ✘ (false: focus is on a pause control, so the keys go to it, as intended for pause controls).

## Pause-page control check (steps 9–13, all 3 runs, identical)
| step | result |
|---|---|
| 9 Esc (re-pause) | paused, focus ❔ Controls |
| 10 Tab ×3 | ✔ focus moved: ❔ Controls → ⚙ Options → ⚙ Show settings page → Copy values; every Tab keydown/keyup defaultPrevented **false** |
| 10a Shift+Tab ×2 | ✔ moved back: Copy values → ⚙ Show settings page → ⚙ Options; not prevented |
| 10b Tab on to ❔ Controls | 40 Tabs walked forward through the dev slider panel (Download log, Report, Music Lab, …, Quality select, comment box, the ▸ test sections) without wrapping back to ❔ Controls; the list is just longer than 40, not a trap |
| 10c | ❔ Controls focused by script |
| 11 Enter on it | ✔ works: not prevented, CONTROLS panel opened |
| 12 Space on it | ✔ works: not prevented, panel closed (toggle) |
| 13 Esc | resumed, focus BODY |

## Reading
- The 1519 bug (Enter/Space pressing a focused native button under the pause) is fixed: the Finds ✕ was never clicked.
- New side effect, for Ed to judge: Enter or Space pressed just after pausing now presses ❔ Controls and opens the CONTROLS panel. Harmless, but visible.
- Not tested: mouse/pad on the pause page, other overlays' buttons, sliders' arrow keys.

Screenshots: `run<N>-5-paused.png`, `run<N>-6-enter.png` (runs 1–2), `run<N>-7-space.png`, `run<N>-8-resumed.png`, `run<N>-11-pause-control-enter.png` (panel open), `run<N>-12-pause-control-space.png` (closed).
