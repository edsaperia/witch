# Dressing before the bedroom door (PR #1008)

Ed, 2026-10-21: "The curtains should open as soon as they've loaded. Also all of the customisation options (except for broom, hat, and bag) should be before the locked door"; "We will have three bedrooms, one for each witch (multiplayer). Hats, brooms, and satchels are shared between witches"; "I think bedrooms should be larger to fit everything".

- `bedroom-whole.png`: the whole bedroom (18 × 18 m) from the game's camera, zoomed out three steps (1600×900, seed 123). On its back walls: the wardrobe, the dressing table and the phone on the left; the bed, the cloak pegs, the curtains and the shoe rack on the right. The landing and the hat room (the hat's mirror, the hats' floor) are to its left.
- `first-load-*.png`: a fresh first load (?opening=chart, 1280×720), from her getting up through each bedroom station's panel (the dressing table, the wardrobe, the cloak pegs, the shoe rack) to the curtains, which had already opened on their own, and out through the door onto the landing.

Shot with `node tools/house/v2-shots.cjs <dir>` (ONLY=whole) and `node tools/opening/shots.cjs <dir>` on claude/dress-before-door.
