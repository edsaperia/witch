# Sleep-cell fix (brief)

Found by the #1496 test-worlds audit (A7). On the largest shipped world (home, world0, game seed 123, all 64 area types), 14 creatures across 7 species sleep in a cell that disagrees with where the rules think they are safe (example: newt #18, `cellSafe` 21,12 vs `c.cell` 21,11), in both the before-party and lost states. Reproduction and the full table: `docs/notes/testing.md` and `tools/ci/sleep-cell-repro.mjs` (landed with #1496).

Work on this branch, `codex/sleep-cell-fix`; report on its draft PR.

1. PLAN first, before any code: root cause, distinguishing initial placement from the sleep transition (or something else), with the exact code paths and why only these 7 species / this world size show it.
2. Fix only this bug. Rules changes limited to what the root cause needs; no tuning or balance changes.
3. Proof: the repro reports 0 mismatches on the largest world and the small worlds; nearby tests pass; CI green; no change to the game-unchanged benchmark unless the PLAN predicts and explains it.
