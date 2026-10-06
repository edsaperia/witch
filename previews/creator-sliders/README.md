# The creator's sliders, option by option

Ed, 2026-10-06: "do a pass of the character creation panel to make sure that all the sliders do something for all of the options. It would be nice if the broomstick had a 'thickness' slider as well as length."

- `sliders.png`: every slider at its min and its max, with every option it applies to (each hat with the hat's sliders, each broom with the broom's, each cloak with its length, the scarf, satchel and backpack). Each cell shows min and max hovering, then min and max standing. 147 pairs: 124 change her, 23 are greyed out in the creator because they can't apply (dimmed and labelled), and 0 are dead. A dead one would be ringed red. Made by `node tools/witch/slider-audit.mjs`, which exits 1 on any dead slider, or on any greyed-out one that does change her. `sliders.json` holds the same results.
- `broom-thickness.png`: the new thickness slider on every broom kind at its thinnest (×0.5), as hers (×1) and at its thickest (×2.2). Each is shown hovering, leaning along (her treetop flight) and standing, then leaning at 2×. Along the bottom are six party witches from her generator, thin then thick. Made by `node tools/witch/thickness-sheet.mjs`.
- `creator-broom.png`: the Broom tab with a quad drone. The thickness slider sits under length, here at ×2, and bend and bristles are greyed out because a drone has neither.
- `creator-hat.png`: the Hat tab with a beanie. Brim is greyed out because a beanie has none; the tilt now leans it.
