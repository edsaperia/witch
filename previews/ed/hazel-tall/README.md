# Hazel forest without glowcaps; a tall hazel instead (Ed, 2026-10-19)

- `heights-before.png` / `heights-after.png`: the hazel forest's ten tree variants, sapling to giant, with the witch for scale (`node art/preview.mjs treeheights hazel-forest`). Before: a glowcap (the purple mushroom, third from the left). After: no glowcap, and the tall hazel takes two slots: a slim upright sapling (third) and the tall tree with three straight stems (second from the right).
- `tall-hazel.png`, `tall-hazel-sapling.png`: the new tall hazel alone, enlarged from that sheet.
- `canopy-before.png` / `canopy-after.png`: a 3×3 patch of the hazel forest's crowns from above (left), beside the honeysuckle tangle's (right).
- `before-ground.png` / `after-ground.png`, `before-treetops.png` / `after-treetops.png`: in the game, seed 123, in the hazel forest nearest home, on the ground and from the treetops.

Checks: `node art/check.mjs --tasks tree-variety,tree-species,life-below-crown,tree-types,areas` passes (the area flora check: 3 to 6 species, the main kind first).
