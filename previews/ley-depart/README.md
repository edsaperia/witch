# The ley line leaving home: round the speakers, never over the dancefloor (Ed, 2026-10-06)

Ed's playtest of round 14: "The leyline shouldn't cross the dancefloor. After going around the speaker circle it should go off to the right and loop around to whatever direction it needs to go."

- `ley-depart.png`: seeds 1, 2, 3, 123, 4242 and 925469. Each panel is the 360 m round home, seen from above with north up.
  - Grey: the dancefloor. White dots: its speakers. Dashed: the line's clearance round them. Brown: the treehouse.
  - Cyan, thick: the line leaving home. From the treehouse's front it goes clockwise round the right side of the speaker ring, then off to the right and loops round to the first runestone.
  - Blue to pink: the first waves' links, with the stones numbered by wave. No link passes over the dancefloor.
- `ley-spiral.png`: the same seeds, the whole route. Today's varied order (left) beside the spiral (right). The spiral now always turns clockwise on the screen, starting east of home where the line leaves it. Under each pair: distance from home by wave.

Redraw with `node tools/map/leydepart.mjs` and `node tools/map/leyroute.mjs --out previews/ley-depart`.
