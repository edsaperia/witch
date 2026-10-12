# Trunk shadows: fades, taper, ground cover and Ed's values (#754)

Two sheets, brightened about 2× so the night reads on screen:

- `walkup-sheet.png`: before (`claude/prototype`, top) and after (#754, bottom), her 16, 8, 4 and 2 m east of a dead tree next to home.
  - **After:** Ed's values make the shadows longer and darker, and they reach further from her glow.
  - **At the foot:** each shadow fades in and is pinched where it meets its trunk, so wide roots don't splay.
  - **Near her:** the nearest trunks' shadows fade away as she walks up to them, gone within about 1.5 m.
  - The raw frames are `before-walkup-*.png` and `after-walkup-*.png`.
- `cover-crop.png`: the shadow lying west across the meadow (2×).
  - **Shipped:** the shadow darkens the grass and the red flowers in it.
  - **cover 0:** how it was before. The ground is dark, the flowers full bright: Ed's complaint.
  - **debug:** where the shadow lies, in magenta.
  - The full frames are `cover-on.png`, `cover-off.png` and `debug.png`.

Cost on this software renderer: the view's work was about 300 ms a frame at both glowReach 20 and 50. The two runs gave 298 → 310 ms and 321 → 317 ms, so there's no measurable difference here.

Tools: `tools/shadows/trunk-walkup.cjs` and `tools/shadows/trunk-cover.cjs`.
