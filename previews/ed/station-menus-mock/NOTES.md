# Station menus, rethought (mock)

Ed, after #996: the station menus as they're met in the game. This is a mock only; no game code has changed. The frames are real game frames at the stations (v4031, seed 123, the placeholder rooms), with the proposed panel drawn over them. The thumbnails are her real sprite with each item on.

Ed's decisions so far (2026-10-21):

- **The menu opens as she gets near** (as #996 does) **and closes as she walks away.** There's no E and no prompt.
- **The mouse or the gamepad's direction keys navigate it.** Her movement stays on WASD and the left stick, so she can walk away at any time.
- **Colour pickers are 5 rows.**
- **She starts with all the colour variants.** Colours are never locked: every item she owns comes in every colour, and skin and hair colours are all open. Only items (shapes and pieces) are found.

## The flow

1. **Walking up** (`1-walking-up.png`): each station's name shows over it as she nears it.
2. **Near, the panel slides in** (`2-near-panel-in.png`): within reach (1.2 m of the station's edge) its panel slides in from the left by itself, as #996 does now. She keeps walking, so passing a station costs nothing.
3. **Choosing: the camera eases in** (`3-choosing-camera-in.png`): she stops and the pointer goes over a card, and the camera eases in on her, framed right of the panel (Q2).
4. **Browsing a locked item** (`4-browsing-locked.png`): the d-pad or the arrows move the focus. A locked item is a silhouette, and the box below says where it's found. It can't be put on.
5. **A change** (`5-change-applied.png`): a click on the sequin jacket puts it on her (taken in the game). She turns to the camera for a beat, and the jacket's own colour grid opens under its shelf.
6. **Sub-parts and colour** (`6-sub-parts-colour.png`): the wardrobe's jacket, top and trousers are three shelves in one panel, with no tabs. The d-pad has gone down to Trousers and into the jeans' colour grid.
7. **Walking away** (`7-walking-away.png`): the camera eases back as soon as she moves, and the panel slides away once she's 0.8 m past its reach (#996's slack). What she has on is what she keeps; there's no confirm button.
8. **On a pad** (`8-pad.png`, the broom stand): the d-pad moves through the panel while the left stick walks her. A two-part item (the broom's handle and bristles) has a chip for each part over its grid, and the shoulder buttons switch between them.
9. **The first game's mirror** (`9-wake-mirror.png`): she gets out of bed beside the dressing table, so its panel opens, with a banner, "First night · pick your look, then walk to the curtains". Hair has a 13-column grid and skin a 6-column one.

`strip.png` is all nine frames. `contents.png` shows every station's panel with its grids open, and the hats' floor.

## Navigating

- **Mouse.** Hovering highlights a card or swatch and shows its name, or its hint if it's locked, in the box at the bottom. A click puts it on. Clicking a card also opens that item's colour grid under its shelf. Moving the mouse into the panel never moves her.
- **D-pad, or the arrow keys** (Q1):
  - left and right move along a shelf, or along a grid row;
  - up and down move between shelves, and from a shelf's cards into its colour grid and back;
  - landing on an owned card or a swatch puts it on at once, so browsing is trying on;
  - a locked card only shows its hint;
  - from a grid's top row, up goes back to the cards; from its bottom row, down goes on to the next shelf.
- **Leaving:** walk away on WASD or the left stick, at any time.

### The colour grids: 5 rows

The rows run dark, deep, pure, light, pale (taken from today's 9-row grid: its 2nd, 4th, 5th, 7th and 9th rows).

| Palette | Columns | Swatches |
|---|---|---|
| Clothes (every garment, bag, shoe, scarf, cloak, broom part) | 13: the 12 hues and a grey column | 65 |
| Hair | 13, the same as clothes, since hair is often dyed | 65 |
| Skin | 6: five undertones (rosy to golden) and a fantasy lilac | 30 |

A grid is about 325 px wide in a 404 px panel, so the whole grid shows without scrolling. The mouse clicks a swatch. The d-pad or arrows move one swatch at a time and wrap at a row's ends. The swatch she's wearing has an amber ring and the focus a white one.

## What each station holds in a first game

The storyboard shows a later save (5 of 11 found at the wardrobe, the sequin jacket already given), so that worn, owned and locked all appear at once. Only items are found; every colour is open from the start.

| Station | Shelves | Hers from the start | To find (first ideas) |
|---|---|---|---|
| Dressing table (bedroom); the dressing room's mirror is the same panel | Hair, Skin (a grid only), Earrings | hair long, bob, buns; none, silver hoops | the mohawk; moon drops |
| Wardrobe | Jacket, Top, Trousers | velvet jacket, poncho; tee; jeans | sequin jacket, cape, mesh top; nightie, vest; cords, skirt |
| Cloak pegs | Cloak, Scarf | none, short cloak; none, scarf | long cloak, hooded cloak; long scarf |
| Shoe rack | Shoes | trainers | chunky trainers, boots |
| Bags | Bag | none, the plain satchel (no power) | the 💌 bags (unlocks.md: found like hats, at shrines) |
| Broom stand | Broom, Fit | classic, fan | twig, round, hobby horse, jet bike… (or the garage's parts: Q4) |
| Hats' floor | (objects, no panel) | her own hat | hats found at shrines (unlocks.md) |

**A locked item's hint** says who has it or where it lies:

- "A party witch on Wolf island wears one. Win a night there and she may give it to you."
- "Somewhere on an island to the south."

It names the island once that island is on her chart; until then it gives only a direction (the island's bearing from home). Bags and hats name a shrine.

## Open questions

### Q1. Keyboard-only players: how do they navigate without stealing WASD?
- **A. The arrow keys move through the panel, as the d-pad does (recommended).** WASD walks, the arrows choose. Today input.ts binds the arrows to movement as well as WASD; this takes them for the panel while it is open.
- B. The arrows move and Enter puts on. Browsing never changes her look until Enter is pressed.
- C. Tab and Shift+Tab move between cards and Enter puts on, like a web page.
- D. No keyboard navigation: mouse or pad only.

### Q2. When does the camera ease in on her?
- **A. Once she's choosing (recommended; frames 2 and 3).** That's when the pointer or d-pad goes into the panel, or when she's stood still at the station for about 0.4 s. It eases back as soon as she moves. Walking past a station never jolts the camera.
- B. As soon as the panel opens, and back when it closes. Simpler, but walking past a station pumps the camera in and out.
- C. Never: the house view stays, and she's big enough to see the change.

### Q3. How does she get new items?
- **A. Party witches give them (recommended).** The party witches at the dancefloor already wear generated outfits. After a won night, one of them gives her a piece she was wearing that the player doesn't own yet, shown on the afterparty's "new unlocks" card. The player can see an item on a witch before owning it.
- B. Found in the world as small parcels: a wrapped present in an area, picked up with E. These are light, unlike the garage's towed parts.
- C. Achievements, one per night (the older rule in unlocks.md).
- D. A mix: A for clothes, shrines for hats and bags (already decided), parts for brooms (the garage, already decided).

### Q4. The hats' floor, and the broom stand
- **A. Hats stay objects on the floor (recommended).** E picks one up or puts hers down, as now. A hat is a thing with a power, found at a shrine. Its shape and colour go to the hat station later (treehouse.md: the grimoire), or for now to a "Hat" shelf on the mirror's panel for the hat she's wearing.
- B. A panel at the hats' floor like the other stations, listing her hats.
- C. Both: hats lie on the floor, and a panel opens near it to restyle the one she's wearing.

The broom stand in the mock shows looks, colours and fit. If the garage is built (unlocks.md: one broom, three slots, parts towed from wrecks), its panel becomes the bay's slots instead.

### Q5. The genome sliders that aren't items
Today's sliders are hat height, brim, tilt and band; cloak length; scarf length; bag size; backpack size; broom length, thickness and bend; and bristles.

- **A. A "Fit" shelf at the station of what they shape (recommended; frame 8).** The mouse drags it; left and right step it (the d-pad or arrows):
  - cloak and scarf length at the cloak pegs;
  - bag and backpack size at the bags;
  - broom length, bend, thickness and bristles at the broom stand;
  - the hat's at the hat station or the mirror (Q4).
- B. Fold them into items: a "Short cloak", a "Long cloak", a "Huge backpack", with no sliders.
- C. Drop them: each item has one fixed shape.
- D. Keep them all at one "tailor" station.

### Q6. What does the d-pad do on a card?
- **A. Landing on an owned card puts it on at once (recommended).** Browsing is trying on, and walking away keeps it. The mouse needs a click, because hovering is too easy to do by accident.
- B. The d-pad only moves the focus, and cross (A on Xbox) puts it on: one press more, but nothing changes until she chooses.

### Q7. Her turning
- **A. She turns to the camera for about 0.8 s on each change, then back to the station (recommended; frame 5).**
- B. She faces the camera while the panel is open.
- C. She doesn't turn.

On the mock's turn: indoors in today's build she stays on her broom, side-on, so frame 5's turn is her facing flip. Facing the camera properly would use her "towards" heading frames, which exist for flight.

### Q8. The old creator screen
It's still used by:
- the page-load bedroom (the old opening, still the default);
- the start card's dress-up button;
- a new night in place with the room;
- the player pick.

- **A. Retire it with the new opening (recommended).** The opening wakes her in the house already, and the start card's button walks her to the dressing table.
- B. Keep it as a quick "dress up" for the bot game and tools only.
