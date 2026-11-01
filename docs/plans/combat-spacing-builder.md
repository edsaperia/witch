# Combat spacing builder PLAN

Inbox #1620; coordinator #1476 comment 6562407303. Full brief read at 4be832ef932f135b9a32f3a34e55c9df9eabb36f. Own branch codex/combat-spacing, isolated work/combat-spacing, starting HEAD ab06904b033b47b4b955da45f1a08c9568a67ddf. CI #1617 checkpoint remains separate and intact.

1. Trace the shipped drawn-size formula and existing separation/slot/lull movement. Add one shared rules-side body-radius helper using the drawing inputs, without Three.js in rules.
2. Add default-off spacing=1 through the existing per-load tuning/link mechanism. Preserve the old arithmetic/control flow and random consumption when off; leave Ed's 30% tighter invites.orbit unchanged.
3. Add config/packs.json knobs/notes for larger, smooth style-specific waiting paths and body-aware slot/lull spacing. Waiting creatures yield to attacking bodies via ordinary momentum steering; never move an attacker to resolve crowding. Preserve reaction, acceleration and turn limits.
4. Focused one-worker tests: radius scaling, distinct styles, waiting separation/attacker invariance and switch-off parity. Typecheck/config gates; cloud full CI/bench:quick with no declared differences off.
5. Prepare a reproducible cloud CPU-only paired measurement (at least20 same off/on seeds, drawn-body minimum/median distance, overlap share and occupied arena). Request canonical allocation for two short same-seed cloud captures and route heavy measurements there; no local full-suite/browser/heavy fight runs or laptop allocation.

No multiplayer files, server or game.ts multi-witch branch. Normally merge current prototype before READY. Existing infrastructure only. Report evidence/limitations on the own PR, no release.
