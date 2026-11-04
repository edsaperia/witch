# MP-C telephone panel input proof — prepared, not executed

Assigned by COORDINATOR PR1607 comment6557011272, 2026-11-01. At pickup the latest pushed1538 head was `9e655f938318efd6e581060b4440bf59d29a01fe`; normally merged into `codex/mp-relay-lifecycle-audit`. MP-B's accepted20-case audit at `8128e5176ffa14e00f27446e39f022b6d4c0862e` remains in history. MP-C owns only the new driver and this note. No production UI, runtime, binding, relay or style changes.

## Preparation and execution

Preparation commands, no browser launch:

```sh
node --check tools/telephone/panel-input-proof.cjs
node tools/telephone/panel-input-proof.cjs --self-test
node tools/telephone/panel-input-proof.cjs --bundle-hash
```

The self-test checks recording a success and an intentionally intercepted control as a failure, retains its diagnostic, bundles the real source and parses the resulting JavaScript without executing it. These are harness/mock and compilation checks, not UI acceptance. The bundle includes real TelephonePanel, SlideIn, MenuFocus, bindings, input stack and Freeze, without module stubs or CSS overrides. Minimal clock data supports Freeze toggling; the game simulation, main loop and world are not mounted.

Only canonical may run the browser proof in its allocated cloud container. Create an allocation JSON outside tracked source:

```json
{
  "environment": "canonical-cloud",
  "canonicalComment": "actual allocation comment URL",
  "priorSlotFree": "actual preceding slot-free evidence",
  "sourceSha": "exact clean checkout HEAD",
  "driverHash": "SHA256 of tools/telephone/panel-input-proof.cjs",
  "bundleHash": "output of --bundle-hash on that checkout",
  "playwrightModule": "/absolute/path/to/playwright",
  "chromium": "/absolute/path/to/approved/chromium",
  "output": "/absolute/path/to/result-directory"
}
```

Then `node tools/telephone/panel-input-proof.cjs --run /absolute/path/to/allocation.json`. The driver requires exact checkout/hash agreement and the baseline ancestor; it never fetches, changes source, starts a relay or installs a browser. It opens one browser, serial ephemeral contexts at960x480,960x540,1280x720, no game URL/network requests, and a180-second run cap. Contexts/browser close on completion; nothing is detached. Canonical must supply truthful allocation/free evidence; the strings themselves are provenance, not an independent scheduling authorization check.

## Matrix and evidence

Each size has15 checks:

1. Prove the outside-panel game-key event probe is active.
2. Native digit typing, Home/Arrow/Backspace/Delete/End editing, invalid game-back letter and Enter stay local; text input Enter neither calls nor confirms.
3. Native Enter on Call triggers exactly one dial action, with zero game-key events. Center hit must belong to Call.
4–5. Escape from input and button pauses/resumes the real Freeze, preserving the open panel. Pause shield owns center hit. Enter on a deliberately stale focused behind-pause button cannot activate it.
6. Bound KeyE on a button steps away without leaking the keydown to the game probe.
7. Step away receives a normal unobstructed click and closes.
8. Address-book selection fills the number without dialing; Call subsequently works.
9. First-contact confirmation requires its own explicit control; Call disabled, text Enter inert.
10. Answer and Not now have independent reachable actions.
11–12. Error and ended states expose working Reconnect, with Call disabled.
13. Connected Hang up is reachable.
14. Synthetic standard pad navigates and scrolls to Step away and chooses exactly once.
15. Pad Start owns pause, wrapped gamepad reads hide the pad from the panel, underlying navigation/choose cannot act, resume restores control and circle closes.

`result.json` names source, baseline, driver/bundle hashes, viewport, per-case PASS/FAIL, before/after callback counts, active focus, panel scroll positions, target rectangle and actual center-hit identity. Each failure retains its immediate state and screenshot when available. Normal status/pause pictures accompany the matrix. No telephone identities, keys, network traffic or saves exist: displayed numbers are synthetic fixtures.

Every one of45 rows and all page/console-error lists must pass for overall PASS; a missing row, uncaught setup failure or cap is not acceptance. Failures should go to the1538 production owner through canonical with row, viewport, hit/focus evidence and screenshot. Do not patch the driver to force clicks through intercepting controls, disable real transitions, override production styles or soften consent assertions.

## Limits

Prepared only; no laptop or cloud browser run performed by this builder. There are no accepted hit-test/picture results yet. Action spies verify the actual panel's callbacks, not networking, trust persistence, real first-contact cryptography or live reconnect. The game-key probe detects propagation, not actual game shortcuts in main. Real Freeze input ownership is covered; main's additional Studio/settings lifecycle and full game/pause integration are outside this standalone proof. Synthetic standard pad reads exercise real MenuFocus/Freeze routing, not physical controller compatibility or human usability. Canonical cloud execution and review are still required; no permission to enable calls or release follows from preparation.
