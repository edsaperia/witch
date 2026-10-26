# Loading screen mock (Ed, 2026-10-26)

The starscape; the Ent's sigil (the World Tree) as a constellation in the middle; COVEN in star-letters round its top, RUSH round
its bottom. No bar: every star (165: 101 the sigil's, 64 the letters') is the progress. They light in a random order weighted toward
the seal's edge (knob `edgeFirst`, here 1.0; 0 is plain random), and the star nearest the middle is always last, lit as the game
is truly ready. The faint dotted lines (as the telescope's constellations) show only between two lit stars. Unlit stars are a
faint ghost (knob `ghost`, 0.34), so the seal's shape is hinted from the start.

- `desktop-*.png` 1440×900, `phone-*.png` 390×844 at 3×: 0, 25, 50, 75 and 100%.
- `*-handover-35/70/100.png`: the seal flaring as it completes, faded to dark, then the asleep card ("💤 … zzz …").
- `mock.html`: the live mock. With no query it loops; `?p=0..1`, `?edge=`, `?ghost=`, `?hand=0..1`, `?extra=0` (no extra stars along the letters' long strokes).
- `cloud-load-timeline.json`: a cold first load in the cloud (seed 123): every timing mark, the art's done and pending, the long tasks.
