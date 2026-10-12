# The sea chart: islands as they really are (PR #699)

Ed: "the sigils should be larger and more detailed, and the islands larger and more detailed, and you can zoom in and out
on the map to see a specific island or see almost the whole sea". World seed 0, `?chart=all` (everything found).

- **Islands:** each is drawn from its real map: its true shape, the game's own hills lit by the moon, each area in its own
  ground colour (moor violet, forests green, mud brown and so on), and sand on the beaches. The chart's scale is ours, so every
  island fills its place on its ring; the small early ones are no longer specks. The uncharted ones (the placeholders) are
  dark land with their hills.
- **Sigils:** they lie over the islands and change with how big they show. Far out you see the plain glyph, which reads at
  small sizes. Nearer, you see the legend circle with the animal's detail. Close in, you see the full circle with its runes,
  faded a little so the land shows through.
- **Zoom:** from one island filling the screen (`real-closest-wolf.png`, `real-closest-stag.png`) out to the whole sea on one
  screen (`real-furthest.png`), with every sigil still readable.
- `real-home.png`: the chart as it opens, on home.
- `real-glide.mp4` (2× speed) and `glide/`: the camera gliding home → wolf → stag → a phase 5 island → bear → home.
- `real-phone.png`: the phone layout.
- `real-first-second-round-coasts.png`: the first seconds after opening. Each island shows a placeholder round coast until
  its real land arrives from a background worker, starting with the one you're looking at; all of them take about a
  minute and a half, and the page stays responsive.
- The chart now draws at 2 screen pixels per art pixel, finer than the game's 3. It's still pixellated.
