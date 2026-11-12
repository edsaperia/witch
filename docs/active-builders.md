# Active builders

The register of who is building what (Ed, 2026-10-31: "Maybe we should have a register of active builders on the repo, and they can switch themselves off and you can restart and re-activate them when necessary, and the claude coordinator can request them").

**Only the coordinator edits this file**, in its release branches. Builders don't; they report on their own PR, and the Codex root coordinator keeps its delivery receipts elsewhere. Rules for builders are in [`CLAUDE.md`](../CLAUDE.md), section *Builders and the coordinator*.

## How builders run now (2026-11-11)

- **Claude builders** are subagents the coordinator starts from its own session, one task each, on their own `claude/...` branch and pull request into `claude/prototype`. They report back to the coordinator, which reviews, records them here and releases only on Ed's go naming the pull requests.
- **Codex builders are paused** (Ed's decision). Before any lane resumes, the coordinator estimates its image and agent cost, and the lane needs Ed's direct OK in Codex chat; then one lane at a time. The coordinator no longer posts on #1476 or on Codex pull requests, so it doesn't wake them.
- A builder that's finished is removed from the register; its pull request is the record.

States: **ACTIVE** (working now), **WAITING** (blocked on the named condition), **PAUSED** (stopped by Ed's decision; nothing runs).

## Register (2026-11-11 21:08 UTC)

| Builder | Task / PR | Branch | State | Waiting on | Owns |
|---|---|---|---|---|---|
| no-crawl (Claude) | Stop shimmer and popping in grass and decor as the camera moves; camera-independent draw order only (Ed: no grow-in-place) | `claude/no-crawl` (no PR yet) | ACTIVE | its own audit, then a pan video for Ed | grass and decor draw ordering under `src/render/` |
| music load (Claude) | Music crunches and cuts out on Ed's laptop since #1951: measure the audio load, make it cheaper without changing the sound, add a budget check | `claude/music-load` (no PR yet) | ACTIVE | its own measurements, then before/after clips for Ed | the music's audio graph (banger mode's voices, buses and effects), the new load check |
| coordinator | Release 26, #1956 (#1954 loading stars, #1955 wardrobe trousers) | `claude/release-26` | ACTIVE | the public site showing the new build | release and publish branches |
| tree pre-bake (Claude) | Pre-drawing the art at build time, phase A, #1884 | `claude/prebake-art` | WAITING | Ed's pick of a compression option (stopped: over the size limit) | `tools/` bake scripts on that branch only |
| art worker retry (Claude) | Retry a failed drawing import, #1886 | `claude/peaceful-albattani-01fh7x` | WAITING | review and Ed's go | `src/render/artWorker.ts` |
| paused-work ledger (coordinator) | Plans: ledger of paused work, #1916 | `claude/paused-ledger` | WAITING | Ed's go | `docs/plans/` ledger |
| body graph (Codex) | Body-graph acceptance, bear to hydra, default off, #1866; reference note `claude/creature-research` | `codex/body-graph-acceptance` | PAUSED | cost estimate, then Ed's OK in Codex chat | body-graph creature code, default off |
| creature shapes (Codex) | Five creature shape candidates, default off, #1865 | `codex/creature-shapes-stage1` | PAUSED | as above | shape candidates, default off |
| art lanes L1–L9 (Codex) | Anatomy and skeleton reference targets for the body graph, #1898–#1906 (several marked do-not-merge) | `codex/art-pass-l1` … `codex/art-pass-l9` | PAUSED | as above | reference targets only |

Not builders of the coordinator's: Ed's repo-review session's #1957 (`claude/review-doc-fixes`) and #1958 (`claude/review-hygiene`).

## Shared checks

- **Laptop slots** (Ed, 2026-10-31; tightened after his crash the same day): heavy local runs (browsers, benches, training) one at a time, only when Ed's input has been idle 5 minutes or more and no game tab is open. Builders never touch Ed's own windows. (No Codex lane runs on the laptop while they're paused.)
- **Cloud browser checks, the full suite, smoke, art and releases:** the coordinator's.
