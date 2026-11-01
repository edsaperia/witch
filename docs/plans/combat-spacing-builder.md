# Combat spacing builder PLAN

Inbox #1620; coordinator #1476 comment 6562407303. Full brief read at 4be832ef932f135b9a32f3a34e55c9df9eabb36f. Own branch codex/combat-spacing, isolated work/combat-spacing, starting HEAD ab06904b033b47b4b955da45f1a08c9568a67ddf. CI #1617 checkpoint remains separate and intact.

1. Trace the shipped drawn-size formula and existing separation/slot/lull movement. Add one shared rules-side body-radius helper using the drawing inputs, without Three.js in rules.
2. Add default-off spacing=1 through the existing per-load tuning/link mechanism. Preserve the old arithmetic/control flow and random consumption when off; leave Ed's 30% tighter invites.orbit unchanged.
3. Add config/packs.json knobs/notes for larger, smooth style-specific waiting paths and body-aware slot/lull spacing. Waiting creatures yield to attacking bodies via ordinary momentum steering; never move an attacker to resolve crowding. Preserve reaction, acceleration and turn limits.
4. Focused one-worker tests: radius scaling, distinct styles, waiting separation/attacker invariance and switch-off parity. Typecheck/config gates; cloud full CI/bench:quick with no declared differences off.
5. Prepare a reproducible cloud CPU-only paired measurement (at least20 same off/on seeds, drawn-body minimum/median distance, overlap share and occupied arena). Request canonical allocation for two short same-seed cloud captures and route heavy measurements there; no local full-suite/browser/heavy fight runs or laptop allocation.

No multiplayer files, server or game.ts multi-witch branch. Normally merge current prototype before READY. Existing infrastructure only. Report evidence/limitations on the own PR, no release.

## Source checkpoint, 2026-11-01

Default-off switch and body-radius/slot/lull/waiting-steering paths are prepared. The narrow game.ts edit is only the shared stepSpacing call outside all multi-witch branches; it routes fighting bodies through their existing steering rather than positional nudges. Ten focused tests include radius units, distinct smooth goals, attacker preservation, a tiny seeded waiting fight and explicit-off/default state parity. Full benchmark and larger paired-fight proof are cloud-owned.

Calibration is intentionally NOT invented: spacing.body.radii remains empty until canonical returns the cloud-generated anatomical support artifact. Therefore spacing=1 is not a working/READY preview at this checkpoint. Missing calibrated species fail explicitly. Default play still takes the old paths. The unexecuted cloud tool captures actual fitted model support; run.mjs prepares the required >=20 paired fights, and capture-fight.cjs accepts only an already allocated cloud page and writes a short clip without owning a browser/server/listener. Manual proof workflow is prepared but may require an existing cloud executor because a new workflow isn't yet on the default branch.

Pending canonical cloud allocation: own PR questions6562481064/6562510182, central1476 question6562643939. No local calibration, heavy arena measurement, browser or art run. Resume calibration adoption and actual metrics/capture proof only on that allocation/result. No assertions/timeouts changed and no orbit tuning changed.
