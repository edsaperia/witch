# The witch's portrait: style sheet

The one reference for whoever draws the portrait (`src/ui/portrait/`). The art director (art builder 2) wrote it in round 1 of the art direction on #529, and it changes only with Ed's say. Ed (2026-10-08): "a good start but the art must be higher quality."

## The target

A chunky pixel-art anime bust, in the manner of Ed's reference:
- a big pointed hat with dark blue outlines and a red band with a gold buckle;
- brown hair in clumps, with lighter strands;
- big expressive eyes, each with a dark upper lid, a two-tone iris and a white highlight;
- a confident grin;
- a hand tipping the brim;
- a blue robe with a collar.

Strong, simple shapes, read first by silhouette and then by the face.

The round-1 target head is in `art-review/portrait/direction/`. It is a hand-placed pixel map (`round1-target-head.txt`, `round1-target-face.txt`) at the new size. It's the bar to meet, not the final art: lift from it freely.

## Size

- **Canvas: 128 × 144 art pixels**, up from 72 × 88.
- The head with its hair is about **64 px wide**.
- The face's skin is about 46 px wide and 40 px tall, from the hairline to the chin.
- An eye is about **12 × 11 px**, with about one eye's width between the eyes.
- The hat rises about 40 px over the head.
- The bust runs from the hat's tip to the chest. The shoulders fill the canvas's width.
- At `portrait.scale` 2 it stands 288 screen px tall. The scale knob stays a whole number.

## How it's built

- **Hand-placed pixel maps, not shapes in code.** Each part is an ASCII grid of palette letters, with `.` for empty. Each letter is one material at one tone, so the creator's colours, and the swatch grid coming to character creation, swap colours without redrawing.
- The rig places parts on its anchors in **whole pixels only**. Drawn pixel art is never rotated or scaled, because nearest-neighbour rotation shreds clusters and outlines.
- **Tilt** is faked by whole-pixel parallax: the hat moves 1 px further than the head, and the fringe and locks move with the head. If that isn't enough, use a pre-drawn tilt frame each way. A falling or flying hat may rotate, because it's in motion and blurred anyway.
- **Gaze:** the iris and pupil move as one block, 1 px at a time, clipped to the eye white's mask.
- **Expressions and visemes are drawn sprites:**
  - eyes: open, half, closed, happy ^ ^, wide, wince > <, dizzy, sleepy;
  - brows: 3 or 4 angles;
  - mouths: one sprite for each of the 16 mouth shapes.
  The parameters still pick them, so `expressions.ts` and `poses.ts` keep working.
- **The creator's sliders:**
  - Hat height adds or removes the cone's middle rows.
  - Brim width repeats the brim's middle columns, between hand-drawn ends.
  - Hat tilt shears the cone by whole pixels, 1 px every N rows.
  - Every slider keeps changing something, as `sliderApplies` requires.
- **A curated set, done well, before many done roughly:**
  - The generator's five hats come first (classic, crooked, floppy, small, flowers), plus none.
  - Then the 4 hairs, the 5 tops and the 4 cloaks.
  - Until a hat is hand-drawn, it falls back to the nearest drawn one. DECISION FOR ED: whether a missing hat should fall back like this, or keep its current shape-drawn version for now.

## Colour

- Every material gets **4 tones plus its own outline**:
  - light: warmer, brighter, a little less saturated;
  - base;
  - shade: cooler, towards blue-violet;
  - deep;
  - outline: darker and more saturated than deep, in the material's own hue.
  `palette.ts`'s hue-shifted ramps are right. Keep them, and add the outline tone.
- **Coloured outlines, never one black ink:**
  - dark blue-violet on the hat;
  - deep maroon or brown (the hair's own outline tone) on the hair;
  - warm brown on the skin;
  - the robe's deep blue on the robe.
  The darkest near-black is only for the upper lash line and the pupils.
- **Selective outlining:** the silhouette's edge is the darkest. Lines inside it (between fringe clumps, folds, the jaw against the neck) use the material's deep tone, not the outline tone.
- **Light comes from the upper left.** Lit sides take the light tone and the far sides take the shade. The brim casts a shadow band on the hair and forehead, and the fringe casts a 1 px shade on the forehead under each clump.

## Anti-aliasing and lines

- Smooth curves by hand on the hat's cone and brim ends, the cheek and jaw, and the hair's outer edge. Where a line steps by 2 px or more, add one pixel of an in-between tone at the step.
- Never AA against the transparent background: the bust sits on any backdrop.
- Lines are 1 px, except the upper eyelid, which is 2 px with an outer-corner flick.
- No orphan pixels (lone single pixels unlike their neighbours) and no 1-px "barcode" stripes.

## Face

- **Shape:** the cheeks are round, and the jaw tapers to a soft point at the chin. Show the jaw: the hair frames it and doesn't hide it.
- **Eyes:**
  - upper lid 2 px in the darkest tone, with a flick at the outer corner;
  - iris two-tone, dark at the top under the lid and light at the bottom;
  - pupil dark, 4 × 4 px;
  - a 2 × 2 white highlight at the upper left of **both** eyes (never mirrored), plus a 1 px spark at the lower right;
  - eye whites with a cool shade under the lid;
  - lower lid a short soft line in the skin's outline tone, not black.
- **Brows:** a thin 1 px arc in the hair's deep tone, raised or tilted by expression. Never a thick slab.
- **Nose:** 1–2 px of skin shade on the side away from the light.
- **Mouth:**
  - The neutral is a short, slightly lopsided smile.
  - The grin shows a top row of teeth, a dark inside and a tongue.
  - One corner rises a pixel higher (confident).
  - The mouth is no wider than the gap between the eyes' outer corners, minus 4 px.
- **Blush:** short diagonal strokes under the eyes, not a solid patch.

## Hair

- **Clumps, not strands:**
  - The fringe is 5 or 6 big pointed clumps across the forehead, their tips at different heights and curving slightly outwards.
  - Each clump has a light side (towards the light) and a shade side, with a line in the hair's deep tone between clumps.
  - Skin shows in the V-shaped gaps between the tips.
- **Side locks** frame the face down past the jaw, ending in 2–3 points. The lock on the right (away from the light) is a tone darker.
- **Back hair** fills behind the jaw and neck in shade and deep, so no backdrop shows between the locks and the neck.
- **A shine arc** on the crown: a band of the light tone with 2–3 glint pixels. It's usually hidden under the hat; it shows when the hat is off.
- The hairstyles are drawn whole for each style (long, bob, buns, mohawk): the fringe, the locks and the back. Wind and mess use 1–2 px offsets of the lock tips, never a reshaped curve.

## Hat (classic)

- A tall cone, about 38 px wide at the band, with a slight bend of the tip to one side.
- A brim about 80 px across and 13 px deep: the top surface in base and light, and the near edge as a 2–3 px band of shade and deep.
- The band is red: 5 px tall, with a light top row and a deep bottom row.
- The buckle is gold, 6 × 5 px, with a dark hole.
- Draw one crease line down the cone in its shade tone.
- The outline is dark blue-violet all round.

## Body

- The neck is narrow, about 12 px, with a shade band under the chin.
- **Robe:**
  - Draw the shoulders with a slope and a fold or two at each armpit, not a dome.
  - The collar is a folded, layered shape with its own light edge, and a V at the neck.
  - The shading follows the forms (shoulder tops lit, chest under the collar shaded), not one diagonal split.
- **The hand tipping the brim:**
  - The hand is big, about 16 px across, as big as an eye and its lid.
  - Fingers on the brim, the thumb under it.
  - The sleeve's cuff shows and the arm is mostly out of the frame.
  - Never a thin tube rising from the frame's edge.

## Checks before a round's shots

- [ ] Look at it at scale 1 and at scale 2. At scale 1 the face should still read: eyes, mouth, hat.
- [ ] Look at it on a dark and a bright backdrop.
- [ ] Every expression at native size, side by side, each telling apart from the others.
- [ ] No pure black except the lash line and the pupils; no outline at the background's edge.
- [ ] 30 generated witches: palette swaps keep the ramps' order (light > base > shade > deep).
