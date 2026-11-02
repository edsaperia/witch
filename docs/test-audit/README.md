# Test audit inventory

Audit only, #1631 / draft #1632.

**Scoped semantic review.** Concrete reviewed groups: [Saves, replay and robustness](saves-replay-robustness.md), [Legends](legends.md), [Art and rendering checks](art-rendering.md), [Creatures and movement](creatures-movement.md), [House and treehouse](house-treehouse.md), [Invites and party](invites-party.md), [Music and audio](music-audio.md), [Tools and CI](tools-ci.md), [UI, menus and controls](ui-menus-controls.md), [World, islands and lakes](world-islands-lakes.md). Exact reviewed membership, assertion rationale and old/current ruling comparisons are in [semantic-groups.md](semantic-groups.md). Page scope statements identify bounded reviews; neighboring unreviewed cases are not silently treated as current. These proposals await the coordinator's review before Ed sees them. Combat and multiplayer retain their existing owners. The initial catalogue remains a machine-first reading aid; reviewed classifications are in inventory.json. No test is changed or approved for deletion.

628 files; 3229 source case declarations. Parameterized and loop-generated cases are not expanded. CJS files are supplementary to the requested TS/MJS scope.

601 files have historical CI durations from [the existing run](https://github.com/edsaperia/witch/actions/runs/41305026644); all case durations are unknown. File duration includes runner effects and cannot be added to infer parallel CI wall time saved.

Kinds are first guesses. “Current rules” is a provisional default, not proof of a current Ed ruling. Historical citations may describe setup or compatibility. Supersession candidates require human confirmation. Nothing adopts the proposed standing rule.

Run `node tools/tests/inventory.mjs` to refresh; `--check` verifies generated outputs. Reads source only; never imports or executes game tests.

## System decisions

- [Combat](combat.md): 394 declarations
- [Creatures and movement](creatures-movement.md): 149 declarations
- [Invites and party](invites-party.md): 301 declarations
- [Legends](legends.md): 93 declarations
- [World, islands and lakes](world-islands-lakes.md): 212 declarations
- [House and treehouse](house-treehouse.md): 307 declarations
- [Music and audio](music-audio.md): 171 declarations
- [UI, menus and controls](ui-menus-controls.md): 344 declarations
- [Saves, replay and robustness](saves-replay-robustness.md): 87 declarations
- [Multiplayer](multiplayer.md): 221 declarations
- [Art and rendering checks](art-rendering.md): 630 declarations
- [Tools and CI](tools-ci.md): 320 declarations

The short system pages link to the exhaustive [case catalogue](cases.md) and [machine inventory](inventory.json). File timings live in the JSON. Review every cited assertion before granting a grouped deletion. No measured CI savings are claimed.

## Coverage ledger

Counts below are source test templates, not executions. “Existing owner” means no parallel review/proposal in this audit; “unread” means no change proposed.

| System | Reviewed | Existing owner | Unread |
|---|---:|---:|---:|
| Combat | 0 | 394 | 0 |
| Creatures and movement | 149 | 0 | 0 |
| Invites and party | 152 | 0 | 149 |
| Legends | 92 | 0 | 1 |
| World, islands and lakes | 212 | 0 | 0 |
| House and treehouse | 143 | 0 | 164 |
| Music and audio | 171 | 0 | 0 |
| UI, menus and controls | 309 | 0 | 35 |
| Saves, replay and robustness | 87 | 0 | 0 |
| Multiplayer | 0 | 221 | 0 |
| Art and rendering checks | 507 | 0 | 123 |
| Tools and CI | 320 | 0 | 0 |

See [the exact unread file/line manifest](unreviewed.md). Standalone Node and external coordination-plugin files are included in the inventory but labeled outside Witch Vitest includes; their counts are not established Witch CI savings. A file with no named registrations may be a standalone assertion script, not zero coverage.
