# Test audit inventory

Audit only, #1631 / draft #1632.

**Semantic review in progress.** Concrete reviewed groups: [Saves, replay and robustness](saves-replay-robustness.md), [Legends](legends.md), [Music and audio](music-audio.md), [Tools and CI](tools-ci.md), [World, islands and lakes](world-islands-lakes.md). Exact reviewed membership, assertion rationale and old/current ruling comparisons are in [semantic-groups.md](semantic-groups.md). Page scope statements identify bounded reviews; neighboring unreviewed cases are not silently treated as current. Other system pages remain placeholders and are not ready for Ed. Combat and multiplayer retain their existing owners. The initial catalogue remains a machine-first reading aid; reviewed classifications are in inventory.json. No test is changed or approved for deletion.

628 files; 3216 source case declarations. Parameterized and loop-generated cases are not expanded. CJS files are supplementary to the requested TS/MJS scope.

601 files have historical CI durations from [the existing run](https://github.com/edsaperia/witch/actions/runs/41305026644); all case durations are unknown. File duration includes runner effects and cannot be added to infer parallel CI wall time saved.

Kinds are first guesses. “Current rules” is a provisional default, not proof of a current Ed ruling. Historical citations may describe setup or compatibility. Supersession candidates require human confirmation. Nothing adopts the proposed standing rule.

Run `node tools/tests/inventory.mjs` to refresh; `--check` verifies generated outputs. Reads source only; never imports or executes game tests.

## System decisions

- [Combat](combat.md): 367 declarations
- [Creatures and movement](creatures-movement.md): 163 declarations
- [Invites and party](invites-party.md): 299 declarations
- [Legends](legends.md): 93 declarations
- [World, islands and lakes](world-islands-lakes.md): 222 declarations
- [House and treehouse](house-treehouse.md): 341 declarations
- [Music and audio](music-audio.md): 171 declarations
- [UI, menus and controls](ui-menus-controls.md): 379 declarations
- [Saves, replay and robustness](saves-replay-robustness.md): 84 declarations
- [Multiplayer](multiplayer.md): 166 declarations
- [Art and rendering checks](art-rendering.md): 655 declarations
- [Tools and CI](tools-ci.md): 276 declarations

The short system pages link to the exhaustive [case catalogue](cases.md) and [machine inventory](inventory.json). File timings live in the JSON. Review every cited assertion before granting a grouped deletion. No measured CI savings are claimed.
