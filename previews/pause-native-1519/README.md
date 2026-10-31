VERDICT: CONFIRMED. While paused, Enter (and, on its own, Space) on a <button> focused before the pause clicked it: the Finds (dev) panel's ✕ fired a click and Finds closed under the pause page, in every run (3 of 3).

Build: commit 952060e0554e7d1fe47548179e66525e0ca7c400, `npm ci && npm run build`, served from dist/ by the script's own static server. dist/version.json reads `"version":"dev"`: the label comes from the `WITCH_VERSION` env var (vite.config.ts:11), not the commit, so it can't name 952060e locally. The checkout was checked with `git rev-parse HEAD` instead.
Page: `?dev=finds&creator=0&quick=1&seed=123&island=4&wave=off`, 1280×720, headless Chromium (SwiftShader), a fresh browser context per run. Enter started the game, then the script waited for game time > 2 s.
Script: `repro.cjs` (`node previews/pause-native-1519/repro.cjs dist`). Raw log: `results.json`.

How "paused" was confirmed: `body.paused`, `#pause-sliders.open`, `#pause-shield` displayed, the screen's middle hits `pause-shield`, and `game.clock.paused` true.
The key log is a capture listener on window, added by an init script so it runs before freeze.ts's own listener. A listener added later never runs, because freeze.ts calls `stopImmediatePropagation`. It reads `defaultPrevented` in a `setTimeout(0)`, after every other handler has run.

## Run 1 (Enter)
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 focus ✕ | ✕ button | 0 | yes | no | — |
| 5 Esc | ✕ button (focus kept) | 0 | yes | yes (shield on top) | Escape down: true, up: false |
| 6 Enter | BODY | **1** | **no** | yes | Enter down: **false**, up: false |
| 7 Space | skipped (Finds already closed) | | | | |
| 8 Esc (resume) | BODY | 1 | no | no | Escape down: true, up: false |

## Run 2 (Enter, fresh context): identical to run 1
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 | ✕ button | 0 | yes | no | — |
| 5 Esc | ✕ button | 0 | yes | yes | Escape down: true, up: false |
| 6 Enter | BODY | **1** | **no** | yes | Enter down: **false**, up: false |
| 8 resume | BODY | 1 | no | no | Escape down: true, up: false |

## Run 3 (extra: Space only, fresh context, Enter not pressed)
| step | activeElement | clicks | Finds open | paused | keys (defaultPrevented) |
|---|---|---|---|---|---|
| 4 | ✕ button | 0 | yes | no | — |
| 5 Esc | ✕ button | 0 | yes | yes | Escape down: true, up: false |
| 7 Space | BODY | **1** | **no** | yes | Space down: **false**, up: **false** |
| 8 resume | BODY | 1 | no | no | Escape down: true, up: false |

## Reading
- The pause layer (`src/platform/freeze.ts`: `key` → `inputStack.key` → `acceptsKey` false) returns true, so the event's propagation is stopped. Nothing calls `preventDefault`, so the browser's native activation still happens. Enter clicks on keydown; Space clicks on keyup, whose `defaultPrevented` is also false.
- The shield makes no difference: a keyboard-made click goes to the focused element, not to whatever is at a point on the screen.
- After resuming, Finds stays closed: the overlay was not "as it was left".
- Not tested: other overlays' buttons, or other focusable native controls (selects, checkboxes) under the pause. The same path should apply to them.

Screenshots: `run<N>-5-paused.png` (after Esc), `run<N>-6-enter.png` (after Enter; runs 1–2), `run3-7-space.png` (after Space), `run<N>-8-resumed.png`.
