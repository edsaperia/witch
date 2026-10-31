# Active builders

The register of who is building what (Ed, 2026-10-31: "Maybe we should have a register of active builders on the repo, and they can switch themselves off and you can restart and re-activate them when necessary, and the claude coordinator can request them").

**Only the coordinator edits this file**, in its release branches. Builders don't; they report on their own PR, and the Codex root coordinator keeps its delivery receipts elsewhere. Rules for builders are in [`CLAUDE.md`](../CLAUDE.md), section *Builders and the coordinator*.

## Lifecycle

1. **Ask.** The coordinator asks the Codex root coordinator on PR #1476 for an available builder, giving the exact branch, the brief and the files that builder owns.
2. **Wake.** Root records the assignment, wakes that exact chat and confirms the builder has actually picked it up (a PLAN or REPORT). A sent message alone doesn't count.
3. **Work.** The builder works on its own branch and draft PR, posting `REPORT:`, `QUESTION:` and `FINAL:` there.
4. **Park.** At a checkpoint the builder posts its exact SHA and whatever is unfinished, then asks to be marked WAITING or AVAILABLE. Root confirms and pauses that builder's monitor. Nothing is deleted: not the branch, the worktree or the chat.
5. **Monitors.** Builders don't poll while idle. Root watches the PRs and wakes a builder on a real event: CI result, review, coordinator answer.

States: **ACTIVE** (working now), **WAITING** (blocked on the named condition), **AVAILABLE** (free for a new task).

## Register (2026-10-31 19:05 UTC)

| Builder (chat) | Task / PR | Branch | State | Waiting on | Owns |
|---|---|---|---|---|---|
| multiplayer `01a18a3b-2d3f` | Two-person play by telephone, #1538 | `codex/multiplayer-integration` | ACTIVE | #1553 landing (guest wake exports), then session/main binding; calls stay OFF | `src/app/telephone.ts`, `src/platform/online/*`, `server/*`, telephone station panel; granted hooks: night.ts presentation/borrowed guards, hud.ts presentation getter, sound.ts `shareBeat` guard, slotStorage borrowed-visit lease, main station callbacks |
| house `01a18a7b-45e6` | Guest-room wake rules, #1553 | `codex/guest-room-wake` | WAITING | CI green → next combined release | `src/editor/*`, `rules/housePlacement*.ts`, `rules/wakeUp.ts`, house layout config |
| creatures `01a18a3b-47b6` | Creature sizes on by default, #1470 | `codex/creature-graph` | WAITING | CI green → next combined release | creature size model and its pins |
| rules A (former #1469 chat) | Playtest rules slice A, #1552 | `codex/playtest-1031-rules` | ACTIVE | items 1, 2, 5, 6 then 10 (home legend) | invite/rune checks, `combat/targeting.ts` give-up, `hunt.ts`, `win.ts`, `combat/legend.ts`, route callback in `combat/data.ts` + `game.ts`, `heldByCombat` line, treehouse carrier removal |
| render B `01a18dee-1f52` | Playtest render slice B, #1554 | `codex/playtest-1031-render` | ACTIVE | cloud frames (Ed picks glow), then items 7–9, then sparkle-shift | `render/leash/stack.ts`, `render/leash/chain.ts`, `render/mushrooms.ts`, `render/mushroomGlow.ts`, stump stack/icon drawing |
| travel `01a1898a-0619` | Ground warm-up M3 on by default, #1513 | `codex/travel-perf-3` | WAITING | CI green → laptop timing slot (after #1540's run) | `app/groundWarm.ts`, `app/groundPrep*.ts`, `tools/bench/ground-warm*` |
| patterned lighting | On by default (Ed 16:49), #1542 | `codex/patterned-lighting` | WAITING | CI green → laptop cost slot after #1513 | `render/lighting.ts` modulation; light metadata lines in `view.ts`/`view/lights.ts`, `fx/system.ts` |
| refraction + dodge `01a18d4a-9d53` | #1543 heat refraction; #1545 dodge echoes | `codex/heat-refraction`, `codex/dodge-echoes` | WAITING | cloud reruns (580fcb83; 17a8111e) | `render/refraction*.ts`, `tools/refraction/*`; `render/dodgeEcho*.ts`, `render/view/dodgeEchoes.ts` |
| expert bot | Campaign strategy, #1540 | `codex/expert-strategy` | ACTIVE | laptop training run (current slot holder); merge prototype (60 behind) | `docs/plans/expert-strategy.md`, bot strategy/training tools |
| (unassigned) | Inbox #1555: CI speed, capture harness, veil readback, A4 split; #1551 slice C (pause menu) | `codex/ops-inbox` | — | root assignment | see each brief |

#1479 is closed (historical). #1240's fix moves to a fresh PR under `docs/plans/veil-readback.md`.

## Shared checks

- **Laptop slots:** Ed gave the coordinator standing permission on 2026-10-31. Slots are granted one at a time, only after actual FREE evidence, for **any CPU- or GPU-heavy local run** (browsers, benches, training). Builders never touch Ed's own windows.
- **Cloud browser checks, the full suite, smoke, art and releases:** the coordinator's.
