# Treehouse layout v4: the Ent as an old oak (mock)

A mock for Ed to approve before anything is built. Nothing in the game has changed.

Ed's art direction, verbatim: "it is a large old oak tree with wide, thick, decumbent branches. The trunk rooms are the largest, getting smaller towards to the top. The other rooms sit upon branches. The room and corridor shapes are irregular, and don't have clear joins between them. The floors are wooden but not planks. Redraw the terrace as well to match with the rest."

## The pictures

1. **[`1-plan.png`](1-plan.png): the plan from above, at the game's scale.**
   - Scale: 10.7 art pixels a metre, drawn 2×. The grid is 10 m and north is up, as in the game.
   - **Trunk:** the trunk rooms are labelled in gold, bottom to top: Dining Room, Terrace, Parlour, Boudoir, Bedroom 1.
   - **Branches:** the branch rooms are labelled in blue, each with its size.
   - **Furniture:** at its real footprint, from the room configs.
   - **Locked rooms:** Bedrooms 2 and 3, drawn shut, with a door where each one's branch reaches it.
   - **Walk:** the dotted line is her walk from the bed to the take-off.
2. **[`2-trunk-room.png`](2-trunk-room.png): a trunk room (the Parlour), at 5×.**
3. **[`3-branch-join.png`](3-branch-join.png): a branch meeting a room (the Parlour's branch into the Bestiary), at 5×.** It shows the wall of living wood on the far side, as the game stands walls on a room's back half.
4. **[`4-terrace.png`](4-terrace.png): the Terrace, redrawn to match.**
   - The DJ decks and the record shelf are by the open rim she steps off from, on its south-east.
   - The magic circle is in the middle.

The floor and walls are as the game would paint them: art pixels, a few tones a material, no anti-aliasing.
- **One shape.** The trunk, the branches and the rooms are one outline, smoothly joined, so no seams show.
- **No planks.** The floor is the tree's own wood. Polished heartwood shows growth rings round each room's heart, and long grain runs along each branch; the two flow into each other where they meet.
- **The rim** is bark, mossy on top.
- **The far walls** are standing living wood.

Furniture is drawn as boxes, as the game's placeholder furniture is.

The source is [`source/house-v4.html`](source/house-v4.html), with [`source/house-v4.cjs`](source/house-v4.cjs) to render it (`node house-v4.cjs <out dir>`).

## What's where

| Room | Where | What's in it |
|---|---|---|
| **Dining Room** | trunk, bottom | tea table, card table (re-used; neither does anything yet) |
| Kitchen | off the Dining Room | cauldron |
| Workshop | off the Dining Room | broom bay, pegboard, lathe |
| **Terrace** | trunk | DJ decks, take-off (the open rim), record shelf, magic circle |
| Studio | off the Terrace | drum kit, synth rack, microphone |
| Cloakroom | off the Terrace | hats' floor, hat mirror, cloak pegs |
| **Parlour** | trunk | bags, invitations desk |
| Bestiary | off the Parlour | the book (the zoo), specimens |
| Solarium | off the Parlour | the map table (the sea chart) |
| **Boudoir** | trunk | telephone |
| Bedroom 2, Bedroom 3 | off the Boudoir | locked: each branch ends at its door |
| **Bedroom 1** | trunk, top | bed, wardrobe, shoe rack, dressing table, clothes pile |
| Turret | off Bedroom 1 | telescope (today's Crow's nest) |

Gone: the Atrium, the Drawing Room and the Study. Also gone: the crystal ball, the curtains, the bedroom's second phone, and the cloak pegs in the bedroom (they're in the Cloakroom now).

## Sizes against now

"Across" means about twice the room's size (the shapes are irregular). Today's figures are the room configs' `radius`.

| Room | Now | v4 |
|---|---|---|
| Dining Room | (none) | **24 m** |
| Terrace | 14 m (the hub) plus the balcony | **21 m** |
| Parlour | 11 m | **18 m** |
| Boudoir | 9 m | **15 m** |
| Bedroom 1 | 18 m | **14 m** |
| Workshop | 15 m | 14 m |
| Kitchen | 13 m | 12 m |
| Studio | 13 m | 13 m |
| Cloakroom | (none) | 11 m |
| Bestiary | 13 m | 12 m |
| Solarium | 13 m | 12 m |
| Bedrooms 2 and 3 | 18 m each | 11 m each |
| Turret (Crow's nest) | 9 m | 9 m |

The house overall spans about 80 m by 125 m; today's is about 80 m by 75 m.

**The walk from her bed to the take-off is about 77 m**, measured in straight lines through the rooms' middles: Bedroom 1, Boudoir, Parlour, the Terrace, then its open rim. Today's is about the same, also 77 m (Bedroom, Boudoir, Parlour, Atrium, Terrace, the balcony's rim). At her walking speed of 5 m/s that's about 15 s. The Dining Room adds nothing to it, being below the Terrace.

## Conflicts with Ed's earlier decisions (flagged, not resolved)

1. **The other two bedrooms are smaller than hers.** On 2026-10-23 Ed said Bedrooms 2 and 3 are "as big as hers". Here hers is a trunk room (14 m) and theirs are branch rooms (11 m), because branch rooms are smaller than trunk rooms. Should they stay as big as hers, at least one would break the trunk-largest rule.
2. **Her bedroom shrinks.** It goes from 18 m to 14 m, the smallest trunk room. On 2026-10-21 Ed doubled the rooms ("the treehouse is too small for the witch to move inside"). Everything fits in 14 m, but it's tighter than today.
3. **The Dining Room is "below" the Terrace, where the take-off was.**
   - Today the Terrace's front (its south rim, the balcony) is open air, with her decks on it, and that's where she steps off.
   - With the Dining Room at the bottom of the trunk, the mock bends the trunk: the Dining Room sits to the south-west, and the take-off and decks move to the Terrace's south-east rim.
   - Ed may want them elsewhere.
4. **No curtains, but the wake-up waits on them.**
   - The bedroom's door waits for her to be dressed and for the curtains to open once the island is ready (`rules/wakeUp.ts`, `doorShut`; the curtains are in `src/rules/houseRooms.ts`, `render/wakeUp.ts`, `app/opening.ts`, `main.ts` and elsewhere).
   - Without curtains, something else has to hold her until the island's art is drawn. It could be the door alone, saying "not yet".
5. **The cloak pegs move out of her bedroom.**
   - Ed said on 2026-10-21 that everything but her hat, bag and broom should be choosable "before the locked door".
   - The nightie's clothes pile also treats the cloak pegs as a bedroom station (`STATION_SLOT` cloak, `rules/clothesPile.ts`).
   - In v4 she can still put her cloak on from the pile, but she can only change it in the Cloakroom.
6. **The bags move from the Study to the Parlour.** They stay a dressing station past her door, as now, so this isn't a conflict, just noted.
7. **The crystal ball is gone.** It's already only a placeholder since the telescope's constellation took its job. Its object and the `ball` use go.
8. **The take-off direction.** Flying back onto the house, she lands where she flies over the balcony's half-disc today (`flyOnto`). That would need to become the Terrace's open rim on its south-east.

## What the build would touch

- **The room configs**, `config/house/rooms/*.json`:
  - new: `dining`, `cloakroom`;
  - renamed: `crowsNest` to `turret`;
  - removed: `atrium`, `drawingRoom`, `study`;
  - moved: objects move room (the map table to the Solarium, the tea and card tables to the Dining Room, the mirror and hats' floor to the Cloakroom, the bags and invitations to the Parlour);
  - dropped: `crystalBall`, `curtains`, the bedroom's `phone`;
  - every room gets a `trunk` flag and its own shape (a wobble, not a circle).
- **`config/house/base.json`** (its note) and **`config/house/assemble.js`**:
  - the trunk as a spine, a thick bent limb between trunk rooms;
  - branches that taper;
  - irregular rooms;
  - the walk's path.
- **`tools/house/organic.mjs`:** the plan, the crowding check and the walk's path (Bedroom 1, Boudoir, Parlour, Terrace).
- **The floor test**, `rules/houseRooms.ts` `nearestIn`: it must follow the drawn shape (smooth-joined blobs and limbs), not circles and rectangles, so she walks exactly where the floor is.
- **The floor and wall drawing:**
  - `render/houseArt.ts` `paintFloor`: rings and grain in place of boards, and the bark rim;
  - its standing walls: living wood in place of boards, windows to be decided;
  - `render/houseRooms.ts`: each room's leaf roof needs a room-by-room region now the floors are one shape.
- **The Terrace art**, `art/ent.js`:
  - its floor in the trunk's rings, not wide boards;
  - its rail;
  - the open rim on the south-east;
  - the decks moved to it.
- **Rules around the take-off and the wake-up:**
  - `rules/treehouse.ts` (`flyOnto`, `keepInHouse`, the balcony's half-disc, `atMapTable` for the Solarium);
  - `rules/wakeUp.ts` and `rules/clothesPile.ts` (curtains, cloak pegs).
- **Tools and checks:**
  - `tools/house/*-shots.cjs`;
  - `tools/stations/check.cjs` (the bedroom's stations);
  - `tools/opening/shots.cjs`;
  - the house's tests;
  - `CLAUDE.md`'s glossary (the treehouse's rooms).
