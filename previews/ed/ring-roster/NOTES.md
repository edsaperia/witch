# The buffer ring grows its island's own species (PR #767, 2026-10-12)

Ed chose B: every area past an island's playable ones (the buffer ring, the sea's and the lakes') takes the type of its nearest playable area, so an island grows only its roster's forest.

All shots are on island wolf, seed 4242, 1280×720, software GL. *Before* is claude/prototype at #765; *after* is this PR.

- `before/after-ring-treetops.png`, `before/after-ring-ground.png`: the ring area nearest home, 355 m out (cell 15,17).
  - It used to be a random dense conifer forest.
  - Its nearest playable area is open ground (snags and stumps), so now it is too.
  - Where the ring borders an open area, the outer woods thin.
- `before/after-shore-treetops.png`: the ring area farthest from home, at the coast (cell 14,24). The woods along the shore are now the neighbouring areas' species.

## Numbers (wolf, seed 4242)

- Area types with trees: 31 before, 10 after.
- Trees on the island: about 43,100 before, about 36,400 after (each type has its own density).
- Area-type sets drawn in one load, start to the shore: 33 before (all 30 types plus the rest), 11 after.
- Their worker time: 609 s before, 338 s after. This is software GL with the workers in parallel, so only the ratio means anything.
