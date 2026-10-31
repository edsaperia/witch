# Pause: stop native key activation under the pause page

Small fix. Light process: one PLAN comment, then build, then FINAL.

## The bug (confirmed in a browser)
While the game is paused, Enter or Space on a native `<button>` that had keyboard focus *before* the pause still clicks that button.

Evidence: branch `claude/pause-native-1519`, folder `previews/pause-native-1519/` (README, repro.cjs, results.json, screenshots). Build 952060e0, 3 of 3 runs:
1. Focus the Finds (dev) panel's ✕ button.
2. Press Escape to pause. Focus stays on ✕.
3. Press Enter: a click fires and Finds closes under the pause page. `defaultPrevented` is false. Space-keyup does the same.

Cause: `src/platform/freeze.ts:89` stops propagation for keys the top layer rejects, but never cancels the native default action. A keyboard-made click goes to the focused element regardless of the pause shield.

Found by the coherence review (#1519, comments 6540734665 and 6540815666).

## What to do
1. Keep native defaults for controls *inside* the pause page or the current top layer. Its sliders, buttons and Settings must still work with keyboard and pad.
2. For a key event the pause layer rejects whose target is *outside* the top layer: cancel its default action as well (Enter, Space and other activation keys, keydown and keyup).
3. When pausing: if `document.activeElement` is outside the pause layer, move focus to the pause page (or blur it). That way focus can't sit on an underlying control.
   - On resume, it's fine not to restore the old focus. If you do restore it, make sure it can't re-trigger anything.
4. Unit tests:
   - a rejected keydown/keyup aimed at an outside button has `defaultPrevented` true;
   - a key aimed at a control inside the pause page is untouched;
   - focus leaves an underlying control on pause.
5. Changelog fragment, one plain line, e.g. "Keys pressed while paused no longer press buttons behind the pause screen."

## Out of scope
Any wider input-stack rework, gamepad changes, or new pause UI.

## Check
CI green. The coordinator re-runs `previews/pause-native-1519/repro.cjs` against your head in the cloud. Expected: clicks 0, and Finds stays open in all runs.
