# Sea chart with the real island shapes (PR claude/chart-real-shapes)

Every island is now drawn in hotel's real outline, the land it grows to (`islandOutline`), instead of the round placeholder coast.
World seed 0, `?chart=all` (everything found).

- Ed's note: "large enough that the animal sigils show clearly on the islands when you open the map screen". Every sigil is
  now one size, about 34 art pixels across when the chart opens. The camera never zooms out past the point where a sigil would
  drop below about 22 px, so the whole world never fits on screen at once; the camera glides from island to island instead.
- `real-furthest.png`: the furthest the camera zooms out, with the page's buttons and text hidden (`real-furthest-with-ui.png`
  shows them). The bright islands carry sigils because she can sail to them. The dark ones aren't charted yet (the placeholders).
- `real-home.png`: the opening view on home.
- `real-glide.mp4` (about 40 s, at 2× speed): the camera gliding home → wolf → stag → a phase 5 island → bear → home.
  `glide/` has stills from it.
- `real-first-second-round-coasts.png`: the first second after opening, before the outlines arrive. The round coasts show
  until each island's outline comes in from a background worker, starting with the chosen island and the ones nearest it.
- `real-phone.png`: the phone layout.

Timing in a headless browser with software GL: the first outline arrives after about 4 s, and all 65 after about 75 to 110 s.
The page stays responsive throughout, because the outlines are built in the worker.
