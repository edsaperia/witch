# The treehouse as placeholder rooms (mock, Ed 2026-10-19)

Ed: "we should start working on building this into the island so you can enter and exit during the party ... stick with placeholder rooms for now". In this session Ed also changed the plan:
- A series of rooms joined by corridors, not one big circular room.
- Hats are objects on the floor, with no rack.
- The mirror splits into stations, and the scarf goes with the cloak.
- Bags get an area of their own, by a desk of invitations.
- Brooms go in the garage with the pegboard.
- Accessories are to be reviewed.
- There's a crow's nest with a telescope, a bestiary with the zoo's book, and a tea room, and a card table in a room of its own.

Nothing is built; this is the mock to say go or change. All files are in `previews/ed/big-room-mock/`:
- `plan.png`: the house from above, north up, the camera and the dancefloor to the south.
- `view.png`: the same rooms at the game camera's angle, looking north with the front walls cut away as the game draws indoors. She stands at the wardrobe, lit.
- `house.json`: the layout as data (rooms, corridors, objects), what the build would read.

## The shape

- **The hub and balcony stay as today:** the hub is radius 7, with the map table, the magic circle and the decks on the balcony. She flies onto the balcony as now.
- **Every other room is a placeholder box** off the hub, on a corridor about 2 m wide along one of the Ent's branches. Each room is 5 to 10 m across; a corridor is 3 to 6 m long.
- **The camera** follows her through them as it follows her in the hub, so each room is drawn with its front wall cut away.
- **Objects are data:** `{ id, room, x, z, label, action }`. Walk up to one, it lights, and E uses it.

| Room | Off | What's in it |
|---|---|---|
| **Hub** | the balcony | the **map table** (E: the sea chart, as now); the **magic circle** (respawn, as now); the **crystal ball** (placeholder) |
| **Balcony** | the hub, south | the **decks**, as now |
| **Dressing room** | the hub, east | **mirror** (face, hair, earrings); **wardrobe** (jacket, top, trousers); **cloak pegs** (cloak, scarf); **shoe rack** (shoes); **the hats' floor** (hats lie there as objects, no rack: E picks one up and puts down the one she wore, as the dropped hat works today) |
| **Bedroom** | the dressing room, north | the **bed** (E ends the night, after a confirm); the **telephone** (placeholder). Through the dressing room, as treehouse.md has it |
| **Bags & invitations** | the dressing room, south | **bags** (bag, backpack, bum bag); the **invitations desk** (placeholder) |
| **Garage** | the hub, west, by the balcony | the **broom stand** (E: the brooms); the **pegboard**, the broom-parts wall (placeholder) |
| **Tea room** | the garage, south | the **tea table** (placeholder) |
| **Card room** | the tea room, south | the **card table**, the tarot game to come (placeholder) |
| **Studio** | the hub, west | the **record shelf** (placeholder) |
| **Bestiary** | the hub, north-east | the **bestiary book** (E: the zoo, which exists today as `?zoo`); **skeletons and skulls** (placeholder) |
| **Kitchen** | the hub, north | the **cauldron** (placeholder) |
| **Crow's nest** | the kitchen, up a stair | the **telescope**, the 360° view of the island (placeholder) |

The dressing stations, the bags and the broom stand each open today's creator at only their own choices.

## Open choices for Ed

1. **Rooms on one floor, or levels?** treehouse.md has stairs (the bedrooms up, the kitchen down, the crow's nest at the top). Proposed for placeholders: one floor, with the crow's nest the only "up a stair" (a doorway that takes her up). The levels come with the careful design.
2. **The Ent's art.** The corridors run out along its branches. Proposed for placeholders: plain plank boxes and corridors drawn by the game, the Ent's own branches left as they are underneath. Its art grows to hold them in the careful design.
3. **The F key and the Bedroom button.** Proposed: the button goes, since the stations replace it, and F stays as a keyboard shortcut to the whole creator while she's in the house. Or keep both for now.
4. **What placeholders say on E.** Proposed: a one-line bubble in the game's voice, e.g. "The cauldron is cold. Brewing comes later." Or nothing (they only light up), or "Coming soon".
5. **The bed's confirm.** Proposed: E once shows "Sleep? This ends the night. E again to sleep", and walking away cancels it. Or hold E (a filling ring), or a yes/no panel.
6. **Brooms.** Proposed: the broom stand opens the creator at its broom choices for now. Or should brooms be objects like the hats, leaning in the garage with E to swap, from the start?
7. **The bestiary book.** The zoo exists (`?zoo`). Should E on the book open it over the game mid-night (it's a separate page today), or should the book be a placeholder for now?
8. **Accessories need a review** (Ed). Today's list: headphones, sunglasses, glow sticks, a festival wristband, a lantern, a potion vial, a spellbook, a familiar, a pendant and earrings. Earrings are at the mirror; the rest are unplaced until the review.
