# Treehouse v2 (PR #1000, v4034)

Ed, 2026-10-21: "the treehouse is too small for the witch to move inside"; "she shouldn't use her broom until she steps off the balcony, and stop using it when she steps on"; "we can give her standing and walking art"; and "more of an isometric view" (rooms as isometric boxes).

- `walk-<room>.png`: walking in each of the ten rooms, on foot, no broom (1600×900, seed 123).
- `stand-bedroom.png`: standing still in the bedroom (her idle).
- `walk-cycle.png`: the new art, idle (3 frames) and walk (6), side-on both ways and heading up and down the screen.
- `off-1..5.png` and `balcony-step-off-strip.png`: on foot on the balcony, walking to its open rim, the take-off onto her broom as she rises, flying off.
- `on-1..5.png` and `balcony-land-strip.png`: flying in from the treetops, coming down onto the balcony, stepping off the broom, standing, walking.

Shot with `node tools/house/v2-shots.cjs <dir>` and `node tools/witch/walk-sheet.mjs <png>` on claude/treehouse-v2.
