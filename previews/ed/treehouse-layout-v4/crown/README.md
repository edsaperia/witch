# The great oak's crown (mock, 2026-10-24)

Ed chose one great crown over the whole house in place of today's leaf dome over each room (`paintRoof` in `render/houseArt.ts`, the roofs in `render/houseRooms.ts`): "one great crown sounds good. it should have thicker and thinner patches. Perhaps there's also a layer that shows the bark of the tree underneath." This is still a mock. Nothing in the game has changed.

The crown follows the reference Ed sent (described in words in `../README.md`):
- a broad, low dome about 2:1, its outer ends sagging;
- a short massive trunk with root buttresses, splitting low into great limbs that rise in a V, then run out almost level, dipping and forking;
- clumped, billowing lobes, dark underneath and moonlit on top, with a ragged edge;
- an open inner, lower crown.

## The pictures

| | |
|---|---|
| `a1-outside-flying.png` | From outside at night, with the flying camera (pitched 35°). One crown about 185 m across stands well up out of the woods. Its edge is ragged, with sprays and twigs, and it throws a darker shadow on the woods. The Terrace's take-off is a well in the crown, open to the sky. The floors and limbs show in the gaps. |
| `a2-outside-landing.png` | Coming in to land from the treetops (pitched 50°, closer). Her see-through hole opens the crown round her (pink). The Terrace floor and its rim are lit warm by the rooms' lamps, and the house's limb shows its bark below the floor. |
| `b1-inside-trunk-room.png` | Indoors as the game sees it (the 24° camera: depth × 0.41) in the Parlour. The crown is a layer 5 m over the floors. The soft dithered hole round her shows the room. Everywhere else is crown: thick clumps, thin sprays, and the oak's dark furrowed limbs in the gaps, with the floor far below them in deep shade. The bright floor at the bottom right is the Terrace's take-off, open to the sky. |
| `b2-inside-branch.png` | The same, out on the branch from the Parlour to the Solarium. |
| `c-closeup-patches.png` | A close-up of one patch. A great limb forks under two thick clumps (top) and thin, gappy ones (lower right), with sprays at the edge. The bark is dark grey-brown, its furrows run along the limb, and moss grows on its top. |

## How it would be built

- **One crown, a few meshes.** The leaves would be a single instanced mesh of lobes: about 300 to 500 camera-facing sprites, each a round billowy clump. A lobe's place and size come from the dome, with its outer ends sagging. A low-frequency noise over the dome thins some lobes, and some are dropped to leave the gaps. The limbs would be one merged tube mesh (trunk, buttresses, six great limbs and their forks), plus the house's own limb under the floors. In all that is two or three draw calls, in place of a dome per room.
- **Thick and thin** come from the lobes, not a texture. A lobe's `thin` value (0 thick, about 0.5 thin) is passed per instance. The fragment shader cuts a thin lobe with a finer noise, so its leaves break into sprays with the bark behind them. A lobe's ragged edge is the same noise against its radius. Both are cut-outs (alpha-test, no blending), so the depth test still saves the work behind them.
- **The bark layer** is the limb mesh itself, seen wherever the leaves let it be. It needs no separate layer: the gaps do the work.
- **Shading:** the night palette's five leaf tones and four bark tones, banded, not smooth. The moon lights the tops. The rooms' lamps warm the undersides of the leaves and the limbs near the floors (a few point lights, or a baked warm term).

## What it costs to draw

- The triangles are cheap: about 500 lobe quads and a tube mesh of perhaps 15–25 thousand triangles.
- The real cost is **overdraw**. From outside the crown covers most of the screen, several lobes deep. Two things keep it in check:
  - the lobes are cut-outs, so the depth test rejects what's behind them;
  - each lobe's sprite should be rounded (an octagon or fitted polygon, not a square quad), so fewer empty pixels reach the shader.
- Indoors the crown is one layer over the house, so it costs about one full-screen pass, plus the hole.
- These are estimates. A real build should be measured with the performance tools (`docs/notes/performance.md`).

## Re-using the see-through passes

The hole round her should be the forest's own see-through, not a new one. The crown's material would take the same passes and the same uniforms as the trees (`render/sprites.ts`: her circle, its dithered band, `passOf`, the two passes). It would then cut the same soft circle round her and follow the circle-hunt fixes for free. The mock fakes it as a screen-space circle with a Bayer dither at its edge.

The take-off is handled at build time: no lobe within about 18 m of it, so its edge is open to the sky from every angle, with no special pass.

## Fitting the "dark indoors" view

Indoors only the house and the Ent's crowns show. The great crown would be the house's Ent crown: the one thing drawn over the rooms, dark everywhere but where the moon catches its tops and the lamps warm its undersides. The hole round her is the only clear view down. The rooms she isn't in stay hidden under leaves, as the forest hides what's under it outdoors. The floor seen through the gaps is drawn in deep shade so the limbs read against it.

**Open question for Ed:** is one hole round her enough indoors? Or should the room she's in clear as a whole, as the room roofs do today? The mock shows only the hole.

## What the mock can't show

- It is orthographic and drawn with spheres. The game would use sprites and tubes with its own lighting.
- The indoor crown is a flat layer faked over the floor. In the game the crown is truly overhead, so where it sits on screen depends on its height.
- The woods are placeholders.
- The limbs in the indoor view follow the house's own spine and branches, not the outside view's great limbs. A build would use one set for both.

## Source

`source/crown.js` adds the crown to the house mock (`../source/house-v4.html`, which now loads it after its own script) and draws the outside views. `node source/crown.cjs <out dir> [picture prefixes]` renders the five pictures in about 20 seconds.
