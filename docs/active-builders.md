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

## Register (2026-10-31 15:30 UTC)

| Builder (chat) | Task / PR | Branch | State | Waiting on | Owns |
|---|---|---|---|---|---|
| multiplayer `01a18a3b-2d3f` | Two-person play by telephone, #1538 | `codex/multiplayer-integration` | ACTIVE | key-verified calls, then coordinator review and Ed's deploy approval for the next relay version | `src/app/telephone.ts`, `src/platform/online/*`, `server/*`, the boudoir telephone use kind and its branch in `render/houseRooms.ts`; narrow hooks in `main.ts` and `app/nightSave.ts` after #1526 and #1513 land |
| editor `01a18a7b-45e6` | Treehouse editor and Ed's opt-in layout, #1526 | `codex/treehouse-editor` | ACTIVE | CI on 83232c6f, coordinator play check, Ed's preview | `src/editor/*`, `rules/housePlacement*.ts`, `rules/hatFloorPoints.ts`, `rules/kitchenPlacement.ts`, `rules/wakeUp.ts`, `render/brewingProps.ts`, house layout config |
| creatures `01a18a3b-47b6` | Creature sizes on by default, #1470 | `codex/creature-graph` | ACTIVE | merge prototype (keep Stiltwalkers' `gear.stilt`), then CI | creature size model and its pins; rig files shared with the potions owner, additive edits only |
| potions `01a18dee-1f52` | Potions: #1531 Night/Heat Vision, #1541 Hue Spin, #1544 The Forest Counts | `codex/potion-*` | ACTIVE | #1531: merge prototype after v6599 | potion effects, `rules/potionSettings.ts`, `app/sound.ts`, `platform/audio/*` |
| travel `01a1898a-0619` | Ground shader warm-up across sailing (M3), #1513 | `codex/travel-perf-3` | ACTIVE | one shared ground descriptor for warm and arrival materials → coordinator cloud diagnostic → laptop slot | `app/groundWarm.ts`, `app/groundPrep*.ts`, `app/mapPrep*.ts`, `tools/bench/ground-warm*` |
| config `01a18d4a-7c30` | A1 config gate, #1525 (live in v6599) | `codex/generated-config-a1` | AVAILABLE | n/a | n/a |
| patterned lighting | First slice, #1542 | `codex/patterned-lighting` | ACTIVE | coordinator cloud capture of 72e6349f | `render/lighting.ts` modulation and slot uniforms; ForestLight metadata lines in `view.ts` / `view/lights.ts`; `party.ts` steady update; spell-slot metadata in `fx/system.ts` |
| refraction | Heat and magical refraction, #1543 | `codex/heat-refraction` | ACTIVE | merge prototype; combined-potion cases | `render/refraction*.ts`; its namespaced lines in `post.ts` (base UV → refraction → potion wobble → grading); View lifecycle adapter |

Pause fix #1522 shipped with this register (no owner left on it). #1479 is a closed historical pass, not a live builder.

## Shared checks

- **Laptop browser slots:** Ed gave the coordinator standing permission on 2026-10-31. Slots are granted one at a time, only after actual FREE evidence. Builders never touch Ed's own windows.
- **Cloud browser checks, the full suite, smoke, art and releases:** the coordinator's.
