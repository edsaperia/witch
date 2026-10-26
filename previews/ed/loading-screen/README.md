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
- `*-handover-35/70/100.png`: the hand-over. The seal flares, fades to dark, then the asleep card ("💤 … zzz …") comes up.
- `mock.html`: the live page; open it from this folder, next to `greatvibes.woff2`.

The mock's settings, all in its query string:

| Setting | What it does |
|---|---|
| `?p=0..1` | the load's progress |
| `?t=` | a moment of the camera's sway |
| `?hand=0..1` | how far through the hand-over |
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
