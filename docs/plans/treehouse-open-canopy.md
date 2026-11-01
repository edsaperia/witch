# Open treehouse edges and canopy visibility

Ed,2026-11-01, directly requested in the expert-builder chat:

- Remove the walls. Walking off without a broom falls with a thud and returns
  a moment later to the edge where she fell, like the existing balcony.
- Walking off with a broom transitions to treetop.
- While inside, the treehouse tree canopy fades transparent to opaque over a
  longer distance. Remove its notch.
- The treehouse must not show through the tree from behind at ground level.
- Entering its canopy in treetop mode should reveal the treehouse beneath.
- Increase witch walking speed by20percent.

Own branch `codex/treehouse-open-canopy`, isolated worktree
`work/treehouse-open-canopy`. Expert1540 checkpoint remains separate and training
stays stopped. Inspect rules/renderer and reuse the existing balcony fall/landing
semantics. Coordinate any overlap with the house-layout owner before touching
its placement/editor files. Add focused geometry/mode/speed tests and a player
changelog fragment; canonical handles allocated visual/art checks and release.
No visual acceptance or timing claim until measured on the resulting source.
