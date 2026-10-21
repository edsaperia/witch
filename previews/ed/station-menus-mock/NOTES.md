# Station menus, rethought (mock)

Ed, after #996: menus at the stations, met in the game. This is a mock only; no game code has changed. The frames are real game frames at the stations (v4031 build, seed 123, the placeholder rooms), with the proposed panel drawn over them. The thumbnails are her real sprite with each item put on.

## The flow (frames 1 to 7)

1. **Walking up** (`1-walking-up.png`): as today, the station's name shows over it as she nears it.
2. **The prompt** (`2-prompt.png`): within reach, "E Step in · Wardrobe", plus a slim tab at the left edge naming the station. Nothing covers the game until she chooses to step in (Q1).
3. **Stepping in** (`3-stepping-in.png`): E. The camera eases in on her over about half a second, framed right of the panel, and the panel slides in from the left. She faces the station. The movement keys now browse rather than walk.
4. **Browsing** (`4-browsing-locked.png`):
   - A and D move along a shelf; W and S move between shelves.
   - Each card is something she owns, and ✓ marks what she's wearing.
   - A locked card is a dark silhouette with a hint about where it's found. Focusing it changes nothing on her.
5. **A change** (`5-change-applied.png`): focusing an owned item puts it on her at once (the sequin jacket, taken in the game). She turns to the camera for a beat to show it off. There is no confirm button: what she has on when she steps out is what she keeps.
6. **Sub-parts** (`6-sub-parts.png`): the wardrobe's jacket, top and trousers are three shelves in one panel, with no tabs (treehouse.md: "never tabs"). The shelf in focus is lit and the others dim. The dressing table's hair, hair colour, skin and earrings, and the cloak pegs' cloak and scarf, work the same way.
7. **Stepping out** (`7-stepping-out.png`): E or Esc. The panel slides away, the camera eases back, the prompt returns and her keys walk again.

There are also two more frames:

- **On a pad** (`8-pad.png`, the broom stand): the left stick or d-pad browses, square (E's button) steps in and out, and circle (Esc's) steps out. One panel serves keyboard and pad alike; only the key hints in its footer change.
- **The first game's mirror** (`9-wake-mirror.png`, the dressing table): once she's out of bed in a first game, she's stepped in for her, with a banner ("First night · pick your look"). E steps out ("I'm ready") and the wake-up carries on to the curtains. In later games the dressing table is an ordinary station.

`contents.png` shows every station's panel side by side, and the hats' floor.

## What each station holds in a first game

The storyboard's frames show a later save (7 of 13 found at the wardrobe, the sequin jacket already given) so that owned, worn and locked all appear at once. A first game starts with this:

| Station | Shelves | Hers from the start | To find (first ideas) |
|---|---|---|---|
| Dressing table (bedroom); the dressing room's mirror is the same panel | Hair, Hair colour, Skin, Earrings | hair long, bob, buns; **every hair colour and every skin tone, always** | the mohawk; earrings: hoops, moon drops |
| Wardrobe | Jacket, Top, Trousers | velvet jacket, poncho; white tee, red tee; blue jeans, black jeans | sequin jacket, cape, mesh top; two tees; two trousers |
| Cloak pegs | Cloak, Scarf | none, short cloak; none, striped scarf | long cloak, hooded cloak; long scarf, a second scarf |
| Shoe rack | Shoes | trainers | chunky trainers, boots |
| Bags | Bag | none, the plain satchel (no power) | the 💌 bags (unlocks.md: found like hats, at shrines) |
| Broom stand | Broom, Fit | the classic broom, the fan broom | twig, round, hobby horse, jet bike… (or the garage's parts: Q4) |
| Hats' floor | (objects, no panel) | her own hat | hats found at shrines (unlocks.md) |

**Skin and hair colour are never locked.** Who she is isn't something to collect; only what she wears is.

**A locked item's hint** says who or where:

- an item a party witch wears: "A party witch on Wolf island wears one. Win a night there and she may give it to you."
- an item found in the world: "Somewhere on an island to the south."

The hint names the island once that island is on her chart. Until then it gives only a direction (the island's bearing from home), so it sharpens as she explores. Bags and hats name a shrine ("At a shrine on an island to the east").

## Open questions

### Q1. What does walking up do?
- **A. A prompt and a slim tab only (recommended; frame 2).** The panel waits for E. Walking through the dressing room never covers the game, and stepping in is the deliberate act.
- B. The panel slides in to preview as she nears the station (as #996 does now), and E only gives the keys to it.
- C. The prompt only, with no tab.

### Q2. Colour variants of an item?
- **A. Each colourway is its own item (recommended).** "Blue jeans" and "Black jeans" are two cards, found separately. Browsing is one axis per shelf with no colour picker, every card shows exactly what she'll look like, and there's more to find.
- B. Dyes. Dye bottles are found on their own and any owned dye goes on any owned item, as a "Colour" shelf under the focused item. Fewer things to find, but many more looks.
- C. Free colour. Owned items take any colour from today's swatch grid. Most freedom, but colour is never something found.
- D. No colour choice: each item has one fixed colour.

### Q3. How does she get new items?
- **A. Party witches give them (recommended).** The party witches at the dancefloor already wear generated outfits. After a won night, one of them gives her a piece she was wearing that the player doesn't own yet, shown on the afterparty's "new unlocks" card. The player can see an item on a witch before owning it, and a hint can name the island where it's worn.
- B. Found in the world as small parcels: a wrapped present in an area, picked up with E. These are light, unlike the garage's towed parts. Shrines stay for hats and bags.
- C. Achievements, one per night (the older rule in unlocks.md).
- D. A mix: A for clothes, shrines for hats and bags (already decided), parts for brooms (the garage, already decided).

### Q4. The hats' floor, and the broom stand?
- **A. Hats stay objects on the floor (recommended).** E picks one up or puts hers down, as now. A hat is a thing with a power, found at a shrine, so it stays something she carries. Its shape and colour go to the hat station later (treehouse.md: the grimoire), or for now to a "Hat" shelf on the mirror's panel for the hat she's wearing.
- B. A panel at the hats' floor like the other stations, listing her hats.
- C. Both: hats lie on the floor, and stepping in at the floor opens a panel to choose one.

The broom stand in the mock shows looks and fit only. If the garage is built (unlocks.md: one broom, three slots, parts towed from wrecks), its panel becomes the bay's slots instead.

### Q5. The genome sliders that aren't items
Today's sliders are hat height, brim, tilt and band; cloak length; scarf length; bag size; backpack size; broom length, thickness and bend; and bristles.

- **A. A "Fit" shelf at the station of what they shape (recommended; frame 8, the broom stand).** ◀ ▶ moves the focused one in a few steps:
  - cloak and scarf length at the cloak pegs;
  - bag and backpack size at the bags;
  - broom length, bend, thickness and bristles at the broom stand;
  - the hat's at the hat station or the mirror (Q4).
- B. Fold them into items: a "Short cloak", a "Long cloak", a "Huge backpack" are separate items with no sliders.
- C. Drop them: each item has one fixed shape.
- D. Keep them all on one "tailor" station, apart from the items.

### Q6. What does Esc do?
- **A. E and Esc both step out and keep what she has on (recommended; Ed's answer).**
- B. Esc steps out and puts back what she wore on stepping in; E keeps the changes.

### Q7. Her turning
- **A. She turns to the camera for about 0.8 s on each change, then back to the station (recommended; frame 5).**
- B. She faces the camera the whole time she's stepped in.
- C. She doesn't turn.

On the mock's turn: indoors in today's build she stays on her broom, side-on, so frame 5's turn is her facing flip. Facing the camera properly would use her "towards" heading frames, which exist for flight, or her on-foot stand turned towards us.

### Q8. The old creator screen
The full-screen creator is still used by the page-load bedroom (the old opening, still the default), the start card's dress-up button, a new night in place with the room, and the player pick (#996's FINAL). Once the stations hold every choice:

- **A. Retire it with the new opening (recommended).** The opening already wakes her in the house, and the start card's button walks her to the dressing table.
- B. Keep it as a quick "dress up" for the bot game and tools only.
