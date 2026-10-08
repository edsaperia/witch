# tools/witch

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `brooms-gif.mjs`

A few broom kinds flying: her lean cycle on each, over ground scrolling past, at 3× the game's size; the drone's rotors, the bicycle's wheels, the flames and exhausts and the mop's drips turn with the frames.

```
node tools/witch/brooms-gif.mjs [out dir] [kind,...]
```

## `brooms-sheet.mjs`

Every broom kind on our witch: hovering towards and away, leaning along, at top speed, braking and standing, at the treetops' size and the ground's, then close up, labelled; each in colours that suit it.

```
node tools/witch/brooms-sheet.mjs <out.png> [kind,...]
```

## `hats-sheet.mjs`

Every hat on our witch: hovering and standing, at the game's size then close up, labelled.

```
node tools/witch/hats-sheet.mjs <out.png>
```

## `longwear-sheet.mjs`

The longest cloak and scarf: our witch in a long cloak and a scarf at the old ends of their sliders and the new, hovering, leaning along, rising, descending, braking, standing, sitting at the decks, dancing and sitting on the ground, at the treetops' size…

```
node tools/witch/longwear-sheet.mjs <out.png>
```

## `slider-audit.mjs`

The character creator's sliders, option by option: every slider drawn at its min and its max on our witch with each option it applies to, in four poses; a pair whose every pose draws the same is dead.

```
node tools/witch/slider-audit.mjs [out dir] [--only hatHeight,...]
```

## `sliders-sheet.mjs`

The creator's new sliders on our witch: scarf length, bag size, backpack size, cloak length and the hat's height and brim at the sliders' ends; flying and standing, at the game's size and close up.

```
node tools/witch/sliders-sheet.mjs <out.png>
```

## `thickness-sheet.mjs`

The broom's thickness on every kind: each kind at the slider's thinnest, hers and its thickest, hovering, leaning along and standing, at the treetops' size, then leaning at the ground's; and along the bottom, party witches drawn thin and thick.

```
node tools/witch/thickness-sheet.mjs [out.png] [kind,...]
```
