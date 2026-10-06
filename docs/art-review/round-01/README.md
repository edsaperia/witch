# Art review, round 1 (2026-10-06, about 01:30 UTC)

**Build:** `claude/prototype` at 5766018. **Seed:** 123, at night as the game is, 1280×720, captured by `node tools/art-review/capture.cjs`.

**Shots:**
- `default-*`: the default look.
  - `creator`: the creator room, still the side-view room. The isometric bedroom (#143) landed after this build.
  - `home-ground`: home as she steps off.
  - `<area>-ground`: four areas on the ground (moor, fern forest, ravine, stone shrine).
  - `fight`: a debug arena of wolves and boars by the dancefloor.
- `bold-*` and `ref-*`: the same build with `?style=bold&px=4` and `?style=ref&px=4`.

The treetop shots come from the second capture, after a fix to the script (rising is Q now; Space is the dash).

## The whole picture

1. **She can't be found.** On the moor she is a dark violet shape on dark green, about the same value as the ground. The light pool round her lights the grass, not her. In the fight, the wolves are dark grey on dark stone and vanish; only the boars' warm brown reads. **Value structure is the biggest problem in the set:** the player and the creatures have to be the clearest things in the frame, and right now they're among the least clear.
2. **The areas look alike at night.** The moor, the ravine and the stone shrine on the ground are the same dark green grass with a few sticks. Only the fern forest's pale birches tell you where you are. Each area's floor colour (the moor's heather and moss, the ravine's grey rock, the shrine's pale flags) is lost under the night's low, green-tinted values.
3. **The party is a cacophony, not pools of light.** At the dancefloor:
   - the speakers' cyan and the runes' cyan;
   - a lime-to-amber ley line;
   - red and yellow flecks over the floor;
   - pink motes and the treehouse's mixed neons.

   That's six colour families at once, all at full strength. Ed's direction tonight ("a spooky dark forest with a party in it") wants the party as warm glowing pools against a dark blue-green and violet forest. That means fewer hues, warmer, and falling off into the dark.
4. **Pools read as holes.** At night the pools are flat black shapes, the darkest thing on screen, with no rim or reflection, so they read as pits.
5. **The UI shouts over the art.** The booting ring is big and yellow, the countdowns over the runestones are large magenta numbers, and a line of status text ("wave 0 · 1 areas · waves off", maybe only because the capture turns the waves off) sits on the art. Three accent colours, none of them the art's.
6. **Bold and ref barely show at night.** At this light level the three styles look almost the same (`bold-*` and `ref-*` against `default-*`): the night lighting crushes the bands and outlines the styles draw. Ed should pick between them in a scene lit by the party, with the witch's light on a creature, not in the dark moor.

## The changes with the most coherence for the effort (briefed tonight)

| # | Change | Who | Lever |
|---|---|---|---|
| 1 | **A rim light for characters.** A cool moonlight rim on the witch and every creature (a light edge on the side away from the camera, 1 art pixel, in the sky's blue-violet), plus her own light lighting her as well as the ground. | Rendering | One shader rule for every character sprite |
| 2 | **The night palette:** dark blue-green and violet for the forest, and every area's floor hue kept apart at night by value as well as hue (moor violet-brown, ravine cool grey, shrine pale stone, fern forest green). | Rendering (ambient and fog), art builder 1 (ground and tuft values per area) | Ambient colour and per-area floor values |
| 3 | **The party's light:** warm amber pools from lanterns, fairy lights and campfires; neons limited to the area's own colour plus one accent; balloons lit by the warm light, not glowing. | Art builder 3 (party decor emissives), rendering (point-light falloff) | Party decor palette |
| 4 | **Pools and water:** a moonlit rim and a faint sky reflection, so water is darker than the ground but never a black hole. | Art builder 3 (pools), rendering (sky reflection) | One water rule |
| 5 | **UI in the art's palette:** one accent colour; the countdowns smaller and in the area's colour; status text out of the art when waves are off, if it is debug. | Coordinator (UI) | UI colours |

Ed's second direction, better creature attack visuals, is art builder 2's. Their strips are reviewed when they come.

## From the treetops (the second capture)

- **The numbers over the runestones are the loudest thing in the sky.** There are eight or more large pixel numerals (14, 19, 9, 149, 168, 128, 172, 181) in cyan, magenta and yellow, bigger than the moon and the treehouse's lit windows, floating over the forest. They belong to the UI's brief (item 5 above): smaller, in one colour or the area's own, and only for the next stone or two.
- **The fern forest's lit crowns read lime and glowing.** Under her light, the birch and fern crowns go to a saturated yellow-green, the brightest patch in the frame (section 3 of the guide: saturated yellow-green reads as glowing). Their hue should go blue-green in the night palette (art builder 1's brief).
- **She is invisible from the treetops.** There is no rim or marker; the moonlight rim (rendering's brief) is for here too.
- **What works:** the moon, the starry sky over the bend, and the treehouse's warm windows with its string of amber lights. That is the "party as warm pools in a dark forest" Ed asked for, in one place. The rest of the party should look like that.

## Correction (03:30 UTC)

Art builder 1 found two bugs in the capture script that affect rounds 1 and 2:
- the area search took cells off the map, which still answer a type;
- her offset from the area's site could land in the neighbouring area.

So this round's `*-moor-*` shots (and possibly others) may not show the area named. The script is fixed, and round 1's build (5766018) is being re-shot into `../round-01b/` for the comparison with later rounds.
