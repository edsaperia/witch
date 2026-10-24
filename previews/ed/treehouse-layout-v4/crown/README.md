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
| `a1-outside-lights-off.png` | From outside at night, with the flying camera (pitched 35°), before the party: the string lights are off. One crown about 185 m across stands well up out of the woods. Its edge is ragged, with sprays and twigs, and it throws a darker shadow on the woods. The Terrace's take-off is a well in the crown, open to the sky. The floors and limbs show in the gaps. |
| `a1-outside-lights-switching-on.png` | The party starts at the decks: the lights switch on, running along each string from its start (caught at about halfway). |
| `a1-outside-lights-on.png` | The party's on: the crown is strewn with colourful string lights. |
| `a1-outside-lights-on-near.png` | Nearer, with the lights on: swags hung under the limbs, strings draped from clump to clump, and garlands round the clumps. |
| `a2-outside-landing.png` | Coming in to land from the treetops (pitched 50°, closer). Her see-through hole opens the crown round her (pink). The Terrace floor and its rim are lit warm by the rooms' lamps, and the house's limb shows its bark below the floor. The lights are on; those up in the crown are cut away with it inside her hole. |
| `b1-inside-trunk-room.png` | Indoors as the game sees it (the 24° camera: depth × 0.41) in the Parlour. The crown is a layer 5 m over the floors. The soft dithered hole round her shows the room. Everywhere else is crown: thick clumps, thin sprays, and the oak's dark furrowed limbs in the gaps, with the floor far below them in deep shade. The bright floor at the bottom right is the Terrace's take-off, open to the sky. |
| `b2-inside-branch.png` | The same, out on the branch from the Parlour to the Solarium. Both are drawn with the party on: the bulbs are in the crown overhead, glowing on the leaves round them and casting coloured pools through the gaps onto the floor below. |
| `c-closeup-patches.png` | A close-up of one patch. A great limb forks under two thick clumps (top) and thin, gappy ones (lower right), with sprays at the edge. The bark is dark grey-brown, its furrows run along the limb, and moss grows on its top. |

## How it would be built

- **One crown, a few meshes.** The leaves would be a single instanced mesh of lobes: about 1,300 camera-facing sprites in the mock (the big clumps plus the small sprays at the edge), each a round billowy clump. A lobe's place and size come from the dome, with its outer ends sagging. A low-frequency noise over the dome thins some lobes, and some are dropped to leave the gaps. The limbs would be one merged tube mesh (trunk, buttresses, six great limbs and their forks), plus the house's own limb under the floors. In all that is two or three draw calls, in place of a dome per room.
- **Thick and thin** come from the lobes, not a texture. A lobe's `thin` value (0 thick, about 0.5 thin) is passed per instance. The fragment shader cuts a thin lobe with a finer noise, so its leaves break into sprays with the bark behind them. A lobe's ragged edge is the same noise against its radius. Both are cut-outs (alpha-test, no blending), so the depth test still saves the work behind them.
- **The bark layer** is the limb mesh itself, seen wherever the leaves let it be. It needs no separate layer: the gaps do the work.
- **Shading:** the night palette's five leaf tones and four bark tones, banded, not smooth. The moon lights the tops. The rooms' lamps warm the undersides of the leaves and the limbs near the floors (a few point lights, or a baked warm term).

## What it costs to draw

- The triangles are cheap: about 1,300 lobe quads and a tube mesh of perhaps 15–25 thousand triangles.
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
- Both views share the house's own limbs and their revision 4 continuations. The outside view also has the great limbs rising from the trunk, which the indoor crown doesn't draw. A build would use one set for both.
- In the landmark views the woods are a plain placeholder, and the oak is due north of her.

## String lights (Ed, 2026-10-24: "it should be strewn with colourful string lights, which switch on when the party starts and switch off when it finishes")

- **One family with the clearings' string lights** (`render/strings.ts`): the same thin dark wire, and bulbs every `stringLights.bulbSpacing` (0.8 m; the mock spaces them 1.4 m). Each bulb is one pixel, two when near. They use the same palette (`#fff1d6 #ff6fcf #5fe8ff #ffe25c #b48cff #7dff8a`), the same twinkle and the same chase now and then, and are bright enough to bloom.
- **Where they hang:**
  - a swag under every limb about every 8 m: the great limbs, the house's own limb, and the branch limbs and their continuations;
  - strings draped from clump to clump over the top of the crown;
  - garlands looped round about half the big clumps.

  The mock has about 11,000 bulbs. At the game's spacing that is about 19,000, which is one points draw call, as the clearings' bulbs are.
- **On and off:**
  - Off before the party. Seen near, the wires and dark glass bulbs show.
  - When the party starts at the decks, each string switches on running along from its start. This is the clearings' `aBulb.z` switch-on time per bulb, set by the bulb's place along its string.
  - When the party's over they go out bulb by bulb, as the clearings' do (`partyOff`).
- **Seen from:**
  - outside;
  - afar, as twinkles on the landmark below;
  - inside, through the crown's gaps.

  Bulbs up in the crown are cut by her see-through hole like the leaves, so none hang in mid-air over her room.
- **To build:** the crown's lines go through the same bulb and wire meshes and shaders as `rules/strings.ts`'s lines. Those are hung between pairs of trunks at a fixed height; these follow the crown's limbs and clumps instead. So `strings.ts` would take a second source of lines rather than becoming a second system.

## A landmark over the horizon (Ed, 2026-10-24: "ideally we can see the massive tree over the horizon when you're flying around the map")

**What the flying camera shows of the horizon today.** These come from the tuning and `render/view/camera.ts`.
- The treetop camera has a fov of 20°, is pitched 30–46° down (`camera.treetop` angleIn/Out), and sits 110–270 m back. The top of the frame therefore looks 20–36° below level, and a flat world would show no horizon at all.
- The **bend** (`camera.curve.treetop` 0.0015: everything ahead of her dropped by 0.0015 × d²) curves the woods away, so a band of night sky shows at the top. In the mock (pitched 32°, 190 m back) the horizon is the woods only about 170–200 m ahead of her, and the sky is about the top tenth of the frame.
- The **haze** runs from 150 to 360 m (`haze.near`/`far`). The scenery is culled at the haze's far edge (`culling.ts` `inView`), and the camera's far plane is 900 m.
- **The camera always looks north** (`camera.ts`: "the camera always looks north", `uBendFwd`). The frame is about 35° wide, so a landmark can only be in view when home lies within about 17° of due north of her. From anywhere else it is off-screen, honestly.
- **So today the oak is gone past about 250 m.** At 500 m it is 375 m below the bent horizon and fully hazed (`landmark/h0-today-500m.png`). At 220 m the real oak, lights and all, already shows over the horizon (`landmark/h3-near-220m.png`).

**The proposal (`landmark/h1-far-1100m.png`, `landmark/h2-middle-500m.png`).**
- Once the bend would hide the oak, draw it **standing on the horizon** at its true bearing and its true size for the distance, so it shrinks as she flies away. Its lower crown sinks behind the woods' top edge, it is hazed (about 0.35–0.6 with distance), and it is drawn only over the sky, behind all the woods.
- When the party's on, its string lights show as twinkles through the haze.
- Nearer than that, it is the real oak as the world draws it, and the two hand over where the real oak first clears the horizon.

**Drawn without breaking the budget.**
- A **far impostor**: one quad in the sky pass. `render/sky.ts` already draws the moon and clouds over the bend, and the impostor would sit with them.
- Its texture is a picture of the crown's silhouette, baked once when the island loads by rendering the crown itself (about 512 × 256).
- Its lights are a second small points draw: a subset of the crown's bulbs, a few hundred, in the impostor's frame. They twinkle and switch on in the same shader as the strings.
- That is two draw calls and a few thousand pixels, with no scenery beyond the haze and no change to the culling.
- **Kept honest:** it is just the tree. There is no map marker, outline or glow beyond its own lights. It is not shown when its bearing is off-screen, and it is behind every wood.

**Questions for Ed.**
- At its true size the far crown is big. At 500 m and even 1.1 km it fills the sky band and is cut by the top of the frame (the mock is true size). Keep it true, or shrink it a little so the whole dome fits the band?
- With the camera always looking north, it shows only when home is roughly north of her. Is that enough?

## Source

`source/crown.js` adds the crown and its string lights to the house mock (`../source/house-v4.html`, which now loads it after its own script) and draws the outside views. `source/horizon.js` draws the landmark views.

`node source/crown.cjs <out dir> [picture prefixes]` renders the crown pictures in about 40 seconds. `node source/hz.cjs <out dir> [prefixes]` renders the landmark ones in about 20 seconds.
