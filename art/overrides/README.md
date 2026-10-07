# Hand-drawn sprites

Any creature frame the generator draws can be replaced by a PNG drawn by hand. Put it at

    art/overrides/<species>/<pose>.png

and the next build uses it in place of the generated frame, everywhere that frame is drawn.

## Names

`<species>` is a species' id (`wolf`, `fox`, `stag-beetle`... as in `art/genome/species.js`). `<pose>` is the frame's name as
`node art/export.mjs` writes it, without the species:

| pose | what |
|---|---|
| `baby-walk0`, `baby-walk1` | a baby, its two walking frames, turned towards us |
| `young-walk0` ... `legend-walk1` | the same for young, adult and legend |
| `adult-walk0-away` ... | `-away`: turned away from us (walking up the screen) |

So `art/overrides/wolf/adult-walk0.png` replaces the adult wolf's first walking frame, seen from the front. Any you leave out
stay generated. A test (`src/render/overrides.test.ts`) fails on a file whose species or pose isn't real.

## Drawing one

- Start from the generated frame: `node art/export.mjs style.json out/` writes `out/wolf-adult-walk0.png` and the rest (the
  albedo PNGs), at the game's own size. Paint over it, or draw your own at about that size.
- One image pixel is one art pixel. Draw it facing right; the game mirrors it for the other way.
- The bottom row is the ground: stand the feet on it.
- Alpha: under 128 is empty, anything else solid (pixel art has no soft edges). Alpha **254** marks a pixel that glows (eyes,
  magic): it's drawn unlit, at full brightness, in the dark too.
- It's lit flat: the light falls on it evenly, so put the shading in the drawing.
- 8-bit PNG (RGBA, RGB, greyscale or indexed with a transparent colour), not interlaced: what most pixel editors save.

## What it changes

- That frame, as drawn, for the wild creature, the enraged one, its expressions and its party look: a hand-drawn frame carries no
  generated gear, faces or red eyes.
- A level with any hand-drawn frame isn't drawn by the live rig on the ground (`src/render/rig/rigView.ts`): it walks on its
  frames, as in the treetops.
- Not yet: sleeping creatures and sleeping legends (`art/naps.js`, `art/legends.js`), the witch, trees and props.

The build reads the PNGs (`vite.config.ts`, `tools/overrides/png.ts`) into `virtual:art-overrides`; the art workers bake them in
(`src/render/artBuild.ts`, `bakeOverride`); they're part of the art's hash, so browsers draw the sets again when one changes.
