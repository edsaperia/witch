# Input/overlay stack, then the big-file split (brief)

From the 2026-10-30 architecture review, approved by Ed:
- `main.ts` holds about 40 top-level mutable flags (sailing, chartHeld, zooPaused, dreamAsleep, menuGone…). It checks open/frozen state 43 times and builds a 6-flag string to notice mode changes (around main.ts:1095).
- 33 keydown/keyup listeners are spread over 20 files.
- 34 commits in 14 days fixed overlay, Esc, pause or stuck-key bugs. `pause-on-top.cjs` exists only to catch them.

Part 1, the **input stack** (A3):
1. One overlay stack (e.g. in `platform/freeze.ts`). Only the top overlay receives key and pad input; the game gets input only when nothing is above it. Pause/menu rules stay as Ed has set them.
2. Move panels onto it **one per PR**, each released and checked: pause, chart, studio, zoo, DJ booth, creator, telescope, settings.
3. Each move must keep behaviour identical, except for fixing leaked or stuck keys. Extend `pause-on-top` coverage as you go.

Part 2, **after Part 1** (A4): split `render/view.ts` (1,812 lines, 131 imports) into registered drawing parts, each with update and dispose, so new visuals add a file instead of editing view.ts. Do the same for whatever is left of main.ts.

PLAN first. Typecheck plus nearby tests; smoke and pause-on-top run on the release check.
