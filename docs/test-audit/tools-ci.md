# Tools and CI

**Not ready for Ed: semantic review pending.** The generic prompts below are placeholders, not proposed group decisions.

Audit only. Any implementation follows a separate, small system PR after Ed rules.

## What these tests aim to protect

- Build and review tools report failures honestly.
- Selection and reporting preserve coverage.
- Tool fixtures remain independent of game outcome targets.

## First guesses

| Kind | Declarations |
|---|---:|
| hard limits | 37 |
| current rules | 191 |
| outcome stats | 2 |
| leftovers | 1 |

These are machine guesses, not confirmed design decisions. See [all tools and ci cases](cases.md#tools-ci) for names, citations, recommendations and runtime limits.

## Group decisions for Ed

1. Keep the safety and integrity protections. Review the provisional rule group against today's design before any changes.
2. Review the 2 outcome-stat declarations as a group for possible nonblocking reports. No move happens before your ruling.
3. Review the 1 historical-wording declarations for compatibility purpose. Choose keep, rewrite or delete only after checking the case and a specific superseding ruling. An older date alone is insufficient.

Case runtimes are unknown. Historical file timings are in the inventory; no savings estimate or new benchmark run is claimed.
