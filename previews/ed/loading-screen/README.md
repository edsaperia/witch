# Loading screen mock (Ed, 2026-10-26)

`loading-desktop.mp4` and `loading-phone.mp4` show it moving, a 20 s loop: the stars light, then the hand-over.

**The seal.** The Ent's sigil (the World Tree) is drawn in stars, "Coven" over it and "Rush" under it, in Great Vibes (a brush
script; OFL licence).
- There are 593 stars, every one part of the progress.
- They light in a random order weighted toward the edge, and the star nearest the middle is always last, as the game is truly ready.
- Each new star flashes, then settles. There are no connecting lines (`?lines=1` brings them back).

**Laid back like the sea chart.** The tree lies tipped away from the camera, while the words stand upright on its rim.
- The camera is far off, so the view is nearly isometric and "Coven" and "Rush" come out the same size.
- It sways slowly and comes a little closer as the seal completes.

**The galaxy.** Under the seal, in its plane, lies an irregular star-forming cloud after Ed's NGC 346 reference, kept dim:
- blue-violet gas with a dark dust lane through it;
- clumps of young blue-white stars, and an old orange cluster off to the right;
- around it, a dense sky of warm orange and blue-white stars, the brightest with four-point spikes, and a Milky Way band.

**Files:**
- `desktop-*.png` (1440×900) and `phone-*.png` (390×844 at 3×): the load at 0, 25, 50, 75 and 100%.
- `*-supernova-15/30/42/60/100.png`: the hand-over (Ed: "the final star is in the centre - it should supernova, transitioning straight to the dark bedroom and the alarm going off").
  - The last star, in the middle, swells to a white core with four spikes across the screen, and a shockwave ring races out across the seal's plane.
  - The screen goes white, then the white falls straight away onto her dark bedroom with the alarm ringing. There's no asleep card.
  - `bedroom-alarm*.png` is the game's own frame there: a cold load at seed 123 at its alarm beat.
- `mock.html`: the live page; open it from this folder, next to `greatvibes.woff2`.

The mock's settings, all in its query string:

| Setting | What it does |
|---|---|
| `?p=0..1` | the load's progress |
| `?t=` | a moment of the camera's sway |
| `?hand=0..1` | how far through the hand-over: white by 0.45 (`?nova=`), the white clearing over 0.35 (`?clear=`) |
| `?edge=` | how strongly the edge lights first |
| `?ghost=` | how bright an unlit star is |
| `?sp=` | the tree's stars apart |
| `?spacing=`, `?wordh=` | the words' stars apart, and their size |
| `?galaxy=` | the galaxy's brightness |
| `?tilt=` | how far the tree lies back |
| `?far=` | the camera's distance |
| `?orbit=`, `?dolly=` | the camera's sway, and how much nearer it comes |
| `?lines=1` | bring back the connecting lines |

`cloud-load-timeline.json`: a cold first load in the cloud, its timing marks, for the progress plan.

## v4 (Ed's notes, 2026-10-26, after v3)

- **Flat again**: the seal faces the camera squarely, with no tilt and no dome. The slow sway and the sky's depth stay.
- **Font**: "Calligraphy" (Ed's upload; `?font=Adelia` and `?font=Great Vibes` for the others).
  - Neither uploaded font is committed here: Adelia's file says "All rights reserved" (Carroline, 2022), and Calligraphy's carries no licence.
  - Put `calligraphy.otf`, `adelia.ttf` and `adelia-alt.otf` beside `mock.html` to see them. Without them it falls back to Great Vibes.
  - Shipping either in the game needs its maker's licence.
- **Text star density low**, as Ed asked (`?spacing=20`). With these scripts the small lowercase gets hard to read at that density.
  - Compare `*-compare-calligraphy-denser.png` (`?spacing=10`), `*-compare-adelia.png` and `*-compare-greatvibes.png`.
- **One colour**: every star of the design lights the same warm gold (`?star=r,g,b`).
- **The supernova**, after Ed's Cassiopeia A reference, in `*-supernova-10…100.png`:
  - a brief white flash from the centre star;
  - a ragged remnant shell opening out from it: a red haze outside, blue wisps inside, orange-gold filaments along it, green patches;
  - then the white, and the cut to the bedroom with its alarm (`bedroom-alarm*.png`).
