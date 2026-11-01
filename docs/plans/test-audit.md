# Test audit: tests that pin old designs

**Ed's concern (1 Nov):** "we have developed a lot of tests, and as the design has evolved they have not been updated." Ed's go-ahead: "Let's do it!"

**The goal:** every test in the suite should protect something Ed still wants. Tests that pin a design he has since replaced are removed or rewritten. Simulations that judge a fight or a night by an outcome statistic stop blocking releases.

This is an **audit first**. Ed rules on whole groups of tests before anything is deleted or moved. No game behaviour changes in this work.

## What to do

### 1. Inventory (tooling, no judgement yet)

Write `tools/tests/inventory.mjs`. It lists every `*.test.ts` / `*.test.mjs` file and every `it(...)` case, with:

- **file, case name, approximate runtime**: use the unit-shard timing that CI already records, or a single cloud run with `--reporter=json`;
- **cited rulings**: the dates and quotes in the case name or nearby comments, e.g. `(Ed, 2026-10-06)` or `Ed's playtest, v3893`;
- **superseded?** Cross-reference each cited ruling date against `DESIGN.md` and `docs/notes/*.md`, which record superseded decisions with phrases like "Before, from…", "since…", "Superseded…" or "(was …)". Flag a case when the ruling it cites has a later ruling on the same topic. A heuristic is fine; mark it as one.
- **kind**: a first guess at one of the four kinds below, from simple signals (e.g. `run(g, N)` over a generated world plus a numeric threshold suggests an outcome statistic).

Output: `docs/test-audit/inventory.json` plus a short summary table. The inventory is a tool, so it lives in the repo and can be re-run.

### 2. Classify into four kinds

1. **Hard limits**, always kept:
   - saves stay intact and survive round trips;
   - replay stays deterministic;
   - no teleporting, no NaN (invalid numbers);
   - multiplayer authority;
   - performance budgets;
   - nothing crashes.
2. **Current rules**: one of Ed's decisions, checked directly and deterministically, e.g. a set-up hit leads to a stun and then fleeing, or berry costs are 3/4/8. Keep while the rule stands.
3. **Outcome statistics**: run a simulation (a fight, a night, a bot) and assert an emergent number or "within N seconds". These break whenever the design shifts and are usually slow. **Ed's ruling for combat already moves these out of the unit tests** (#1622). Propose the same here, either into a non-blocking report like the nightly art check, or deleted.
4. **Leftovers**: they pin a design Ed has replaced, a removed feature (e.g. set pieces) or an old tuning value. Delete or rewrite them.

### 3. One page per system, for Ed

Write `docs/test-audit/<system>.md` for each system. Systems: combat (coordinate with #1622, which is already rewriting combat tests; don't duplicate), creatures/movement, invites/party, legends, world/islands/lakes, house/treehouse, music/audio, UI/menus/controls, saves/replay/robustness, multiplayer (coordinate with #1609), art/rendering checks, tools/CI.

Each page has:
- what this system's tests protect, in 3–6 plain bullets;
- a table: test (file › case), kind, cited ruling, current or superseded (with the superseding ruling quoted), recommendation (keep / rewrite / move to report / delete), runtime;
- **a few group decisions for Ed**, worded so he can answer per group, e.g. "Delete these 9 tests that pin set pieces (phased out 29 Oct)? yes/no".

Keep the pages phone-readable: short lines, no wide tables where a list works.

### 4. After Ed rules

Only then, in separate small PRs per system:
- delete or rewrite the agreed tests;
- move outcome statistics into a non-blocking behaviour report (one workflow, like `art-check.yml`: nightly plus manual dispatch, posting numbers, never blocking a release).

Report the CI time saved.

## Rules

- **Don't touch #1622 (combat) or #1609 (multiplayer) source or tests.** Note their tests in the pages and leave changes to those builders.
- No game source changes. Docs, `tools/tests/` and, after Ed's ruling, test files only.
- Before publishing, check for merge conflicts with `codex/multiplayer-integration` (`git merge-tree`).
- No laptop or browser runs are needed. CI and cloud only.
- Post PLAN first, then REPORT per milestone (inventory; pages; post-ruling PRs).

## Standing rule to propose to Ed (add to DESIGN.md or docs/notes once he agrees)

- The builder who changes a system owns its tests.
- When Ed changes a design, the brief lists the tests that pin the old rule.
- Outcome statistics never block a release.
- Every REPORT lists the tests it changed or removed, with a reason.
