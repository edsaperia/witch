# Multiplayer

Audit only. #1609 owns multiplayer changes. Authority protections remain hard limits.

## What these tests aim to protect

- Authority and ownership remain enforced.
- Messages preserve valid synchronized state.
- Changes and decisions belong to #1609.

## First guesses

| Kind | Declarations |
|---|---:|
| hard limits | 43 |
| current rules | 106 |
| outcome stats | 0 |
| leftovers | 0 |

These are machine guesses, not confirmed design decisions. See [all multiplayer cases](cases.md#multiplayer) for names, citations, recommendations and runtime limits.

## Group decisions for Ed

1. Keep the safety and integrity protections. Review the provisional rule group against today's design before any changes.
2. Have #1609 review these classifications after its integration; this audit proposes no authority-test edits.
3. Review the 0 historical-wording declarations for compatibility purpose. Choose keep, rewrite or delete only after checking the case and a specific superseding ruling. An older date alone is insufficient.

Case runtimes are unknown. Historical file timings are in the inventory; no savings estimate or new benchmark run is claimed.
