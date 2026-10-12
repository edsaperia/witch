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
- **Close-up** (Ed: "the islands should be larger at full zoom"): the camera now comes in until one island fills the screen
  and more. The chosen island's ground is rebuilt at about 7 m a sample. Its hills are relief-shaded, lit from the north-west
  as a painted map is; each area keeps its own ground colour; the beaches are sand; and the sea is pale in the shallows,
  fading into the deep. Close in, the sigil fades out so you see the island itself. `closeup-vs-reference.html` shows it
  beside your reference.
  What else could come straight from the game's data: the streams (a path kind in the game's path network) as blue lines;
  the paths and roads; how thickly each area is wooded, as darker canopy or tree marks; the dancefloor; and the runestones.
  None of that is drawn yet.
- **Zoom:** from one island filling the screen (`real-closest-wolf.png`, `real-closest-stag.png`) out to the whole sea on one
  screen (`real-furthest.png`), with every sigil still readable.
- `real-home.png`: the chart as it opens, on home.
- `real-glide.mp4` (2× speed) and `glide/`: the camera gliding home → wolf → stag → a phase 5 island → bear → home.
- `real-phone.png`: the phone layout.
- `real-first-second-round-coasts.png`: the first seconds after opening. Each island shows a placeholder round coast until
  its real land arrives from a background worker, starting with the one you're looking at; all of them take about a
  minute and a half, and the page stays responsive.
- The chart now draws at 2 screen pixels per art pixel, finer than the game's 3. It's still pixellated.

## Natural land colours by biome, and lakes (Ed: "Natural land colours", "The real maps will have lakes. Colour it themed by its biome.")

- The islands are painted like a map's terrain, no longer in their areas' floor colours: lowlands, uplands, rock and peaks by
  height and steepness, darker where the forest is thick, and sand on the beaches. The heights are the game's own terrain.
- Each island takes its biome's palette (from `config/kinds.json`). Today's 32 kinds are all temperate (greens and earths).
  The uncharted islands have their direction's biome: cold, mountains and glaciers, rocky, badlands, hot, mangrove swamp,
  jungle or cold rainforest. You can see the outer ring change colour by direction in `real-furthest.png`.
- `biomes-sheet.png`, one island per biome close up, left to right and top to bottom:
  - wolf (temperate), unknown-01 (cold), unknown-02 (mountains and glaciers);
  - unknown-04 (rocky), unknown-05 (badlands), unknown-07 (hot);
  - unknown-09 (mangrove swamp), unknown-11 (jungle), unknown-12 (cold rainforest).
- Lakes (hotel's #711): each lake lies flat at its own level in its hollow in the hills, lighter than the sea as in the game.
  `real-closest-wolf.png` shows two.
- The night's blue grade still tints everything; the hot and badlands islands would read warmer in daylight.
