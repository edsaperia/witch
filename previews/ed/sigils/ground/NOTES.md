# Ground sigils off the pixel grid: mockup (2026-10-12)

Ed: "it might make sense for ground-placed sigils to be off the pixel grid … They're really UI elements, so need to be easy to distinguish, and they aren't at the moment." Then: "We have a tiltshift effect that makes things blurrier - this *should* affect sigils."

## The scene

Seed 123, about 110 m south of the treehouse, at night, 1900×1240 (Ed's window). It holds every sigil the leash glyph atlas draws:

- placed sigils under five parked creatures (mole, snail, toad, hare, owl), near and far;
- happy creatures' runes, three ready to pick up (fox, squirrel, beetle) and two still fresh (dormouse, hedgehog);
- her stack of three over her hat (mole, snail, toad), and the ghost of the bottom one at her feet;
- a dropped relic flask's gold sigil;
- a knocked-out hare's grey sigil, walking home;
- from the treetops, the canopy projection.

## The options

- **A: grid** (`a-*`). Today's art-pixel glyphs in the low-resolution picture.
- **B: smooth** (`b-*`). The same sigils drawn at the screen's resolution from their vector strokes, crisp lines with the glow kept soft like the game's other light. Each keeps its level's frame (a young creature's dotted ring, an adult's full ring).
- **C: ui** (`c-*`). As B, with thinner lines. The level's frame gives way to a ring by state:
  - parked: solid;
  - ready to pick up: dashed and bright;
  - happy but not yet ready: dashed and faint.
  - The stack, the ghost, the flask and the walking-home sigil keep no ring.
  - The first try had a dark outline and bolder lines (`c-ui-ground-outlined-first-try.png`). Ed asked for the outline to go and the lines to be thinner, and the current stills show that.

## How B and C sit under the tilt-shift

The tilt-shift is a pass over the low-resolution picture, so nothing drawn inside it can be finer than the art's pixels.

Here the sigils are drawn at screen resolution just over the game. Each one is then blurred by its height on screen exactly as the world there is (`render/overlayTilt.ts`), the same rule the 💌s, hearts and bubbles already follow. So near sigils are sharp and far ones soften with the forest. "Crisp" applies to the line, not to escaping the depth blur.

## Files

- `*-ground-1900x1240.png`: the whole frame at Ed's size.
- `*-treetops-1900x1240.png`: the same scene from the treetops (the canopy projection).
- `*-crop-1to1.png`: the middle at the game's real size.
- `*-crop-3x.png`: the middle, 3× nearest-neighbour.
- `*-pan.mp4`: the camera panning east then back at walking pace (960×640 at 1:1, 30 fps), where the grid's stair-step shimmer shows.

## Costs and caveats for a real build

- The overlay is a 2D canvas: under 1 ms a frame for this scene.
- It sits over everything, so a sigil under a creature's feet draws over the feet. Today's placed sigils already show through scenery at 0.45 (`leash.placedThrough`).
- Doing it properly inside the picture would mean upscaling before the tilt-shift, a full-resolution pass, which costs more.
