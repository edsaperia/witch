# Input/overlay stack, then the big-file split (brief)

STATUS 2026-10-31: PR #1495 shipped the stack foundation and pause migration, included in v6478. The later panels and view/main split remain deferred, not implicitly authorized by this historical brief. Current ownership and held-input behavior are in [run notes](../notes/run.md); foundation-era “pending” statements below are historical.

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

## PR #1495: stack foundation, then pause only

Plan acknowledged 2026-10-30: introduce `platform/inputStack.ts`, then move only
pause onto it. The core gives keyboard/gamepad ownership to the exact top
registration; lower layers never receive a closing event. Keys held across an
ownership change are quarantined until released, and focus loss clears physical
key tracking. A target predicate preserves native controls within the top layer.

Coordinator comment 6528928146 approves the boundary: this PR owns the new core
and tests, then `platform/freeze.ts` and pause-on-top assertions; no `main.ts` or
`settingsMenu.ts` edits. Freeze migration waits until PR #1493 lands on
`claude/prototype` and the coordinator gives the handoff, then merges prototype
normally. Preserve its `textEntry` guard and `mutate` / `advance` replay hooks;
the future command candidates in `docs/robustness-plan.md` remain documentation,
not a second replay path. No other panel migration or view/main split here.

Foundation checks cover exact top ownership, target filtering, one-shot close
routing, held keys on open/close, duplicate registration/lower-layer removal,
and lost keyup on blur. Pause integration and browser release checks remain
pending at this foundation milestone. The coordinator runs the browser checks;
this builder has no browser allocation.

Handoff received in COORDINATOR6533896127 after robustness shipped as v6031;
prototype merged normally. COORDINATOR6533986583 approved the bounded
`ui/menuFocus.ts` session-reset fix after its new regression failed on the old
code (expected two Back calls, received one). COORDINATOR6534004220 approved
exactly `input.clearPresses()` to `input.release()` in `freeze.onToggle`, with a
held-key pause/resume tape equality test. These are the only main/menu-focus
boundary expansions; Settings, bindings storage and save-slot work stay outside.

Pause milestone implemented: final affected checks pass (20 tests across stack,
Freeze integration/text entry, menu focus and changelog), plus typecheck and
pause-on-top script syntax. The earlier nearby input/recording run passed 35
tests. Release browser assertions are prepared but not run by this builder;
native-control behavior and the intermittent CI symptom await the coordinator's
combined release check. No further panel migration begins on this PR.
