# Treehouse layout v4: the Ent as an old oak (mock)

A mock for Ed to approve before anything is built. Nothing in the game has changed.

**Revision 4** (Ed, 2026-10-24: "The branch rooms themselves are not the ends of the branches; maybe they should have paths continuing through them? Or at least, we see this as part of the canopy"). The plan now reads as a tree's silhouette. The trunk's links, the sizes, the pairs and the take-off are all as in revision 3.
- **Each branch room is a swelling along its limb**, like a burl, not the limb's tip. The limb carries on out of the room's far side, in the direction its branch was heading.
- **Past the room the limb is bark, not floor.** It is the oak's dark, furrowed limb and can't be walked on. It tapers, forks twice into smaller branches and twigs, and runs out under the crown, ending at its edge. This is the same bark that shows through the crown's gaps. A second, smaller twig leaves each room's limb a little way out.
- **The floor only hints at it.** Each room's outline bulges out a few metres where the limb leaves (2.5 m past the room's edge, then rounded off). It is not a path or a lookout.
- **The trunk's ends.** Below the Dining Room the trunk goes down, and it flares into five great roots with smaller ones off them. Above the Turret it splits into three topmost limbs, each forking once, which run up into the crown. The plan now has a base and a top, like the reference oak.
- Pictures 1 and 5 are re-drawn wider (about 208 × 196 m) to take in the roots and the twigs, with the crown off so the plan is readable. Pictures 2 to 4 are re-drawn too: the bark now shows past the rooms' edges. The bed-to-take-off walk is unchanged at about 93 m.
- The crown pictures (`crown/`) draw these same limbs under the crown. The roots stay on the ground, so they don't show in the crown.

**Revision 3** (Ed's feedback on revision 2, 2026-10-24: "The branch rooms come in pairs; the upper of each pair should be closer to the trunk, and the lower should be further and curve down. The connections between the trunk rooms should be thicker and shorter, and the zigzag a bit less pronounced, more smooth. The turret should not be directly above bedroom1; it's the top of the trunk effectively, so it's part of the zigzag."):
- **The trunk is a soft S**, bottom to top: the Dining Room, Terrace, Parlour, Boudoir, Bedroom 1, then the **Turret**, its top and smallest room, on the right. Its links are short and thick (about 0.8 of the rooms' size), so it reads as one massive, gently winding limb.
- **Each pair of branch rooms** is on its trunk room's outer side. The **upper** room sits close in on a short, straight branch. The **lower** room sits further out on a longer branch that goes out level and curves down. From Ed's diagram:

  | Trunk room | Upper (closer) | Lower (further, curving down) |
  |---|---|---|
  | Dining Room (left) | Workshop | Kitchen |
  | Terrace (right) | Cloakroom | Studio |
  | Parlour (left) | Solarium | Bestiary |
  | Boudoir (right) | Bedroom 2 | Bedroom 3 |

- **The take-off** is on the Terrace's open **south-east** rim, about 60° round from east. That's the open air between the trunk's link down to the Dining Room (south-west) and the Studio's branch (east). The DJ decks and record shelf are beside it.
- The close-up of a branch meeting a room is now the Parlour's short branch to the Solarium.

**Revision 2** (Ed's feedback, 2026-10-24: "closer to the diagram; trunk rooms weave left and right, and there are two rooms out to one side for each ... See if you can foreshorten the growth ring texture to make the floor look more isometric"; "branches can be longer, and branch rooms larger"):
- **The trunk zigzags**, bottom to top: the Dining Room on the left, the Terrace on the right, the Parlour on the left, the Boudoir on the right, Bedroom 1 on the left.
- **Each trunk room's two branch rooms** go out on its outer side and above it, and the Turret sits straight above Bedroom 1.
- **The branches are longer and thicker, and the rooms bigger:** branch rooms 14 to 16 m across, and the trunk 28 m down to 17 m. The trunk rooms are still the largest.
- **The floor is foreshortened.** Indoors the game's camera pitches down 24° (the tuning's `camera.house.angle`; `render/view/camera.ts` sets its up vector as (0, cos a, −sin a)). So the floor's depth shows on screen at sin 24° ≈ **0.41** of its width.
  - The plan is drawn straight down, with only its floor's grain squashed by 0.41, so the rings are ellipses.
  - The new picture 5 and the three close-ups are drawn entirely as the game sees them: depth × 0.41, the walls standing cos 24° of their height.
- **The take-off** is on the Terrace's open **south-east rim**, below its two branches, with the DJ decks and the record shelf beside it.

Ed's art direction, verbatim: "it is a large old oak tree with wide, thick, decumbent branches. The trunk rooms are the largest, getting smaller towards to the top. The other rooms sit upon branches. The room and corridor shapes are irregular, and don't have clear joins between them. The floors are wooden but not planks. Redraw the terrace as well to match with the rest."

## The pictures

1. **[`1-plan.png`](1-plan.png): the plan from above, at the game's scale.** The floor's grain is foreshortened 0.41.
   - Scale: 10.7 art pixels a metre, drawn 2×. The grid is 10 m and north is up, as in the game.
   - **Trunk:** the trunk rooms are labelled in gold, bottom to top: Dining Room, Terrace, Parlour, Boudoir, Bedroom 1.
   - **Branches:** the branch rooms are labelled in blue, each with its size.
   - **Furniture:** at its real footprint, from the room configs.
   - **Locked rooms:** Bedrooms 2 and 3, drawn shut, with a door where each one's branch reaches it.
   - **Walk:** the dotted line is her walk from the bed to the take-off.
2. **[`2-trunk-room.png`](2-trunk-room.png): a trunk room (the Parlour), as the game sees it, at 4×.**
3. **[`3-branch-join.png`](3-branch-join.png): a branch meeting a room (the Parlour's branch into the Bestiary), as the game sees it, at 4×.** It shows the wall of living wood on the far side, as the game stands walls on a room's back half.
4. **[`4-terrace.png`](4-terrace.png): the Terrace, redrawn to match, as the game sees it.**
   - The DJ decks and the record shelf are by the open rim she steps off from, on its south-east, below its branches.
   - The magic circle is in the middle.
5. **[`5-as-the-game-sees-it.png`](5-as-the-game-sees-it.png): the whole house as the game's camera would see it indoors.** It has the same labels as the plan.

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
| **Turret** | trunk, top (revision 3) | telescope (today's Crow's nest) |

Gone: the Atrium, the Drawing Room and the Study. Also gone: the crystal ball, the curtains, the bedroom's second phone, and the cloak pegs in the bedroom (they're in the Cloakroom now).

## Sizes against now

"Across" means about twice the room's size (the shapes are irregular). Today's figures are the room configs' `radius`.

| Room | Now | v4 (revision 2) |
|---|---|---|
| Dining Room (trunk) | (none) | **28 m** |
| Terrace (trunk) | 14 m (the hub) plus the balcony | **25 m** |
| Parlour (trunk) | 11 m | **22 m** |
| Boudoir (trunk) | 9 m | **19 m** |
| Bedroom 1 (trunk) | 18 m | **17 m** |
| Workshop | 15 m | 16 m |
| Kitchen | 13 m | 15 m |
| Studio | 13 m | 15 m |
| Bestiary | 13 m | 15 m |
| Cloakroom | (none) | 14 m |
| Solarium | 13 m | 14 m |
| Bedrooms 2 and 3 | 18 m each | 14 m each (they fit hers' set of furniture; no Turret branch) |
| Turret (trunk, top) | 9 m | 13 m |

The branches between are about 20 to 30 m long, against about 3 to 10 m today. The house spans about 140 m by 150 m; today's is about 80 m by 75 m.

**The walk (revision 3).** These are straight lines through the trunk rooms' middles: Bedroom 1, Boudoir, Parlour, then the Terrace. Revision 3's shorter trunk brings the walk back near today's.

| Walk | Distance | At her walking speed (5 m/s) |
|---|---|---|
| Bed to where she first steps onto the Terrace | about 68 m | about 14 s |
| Bed to the Terrace's middle | about 80 m | about 16 s |
| Bed to the take-off | about 93 m | about 19 s |
| Revision 2, bed to the take-off | about 134 m | about 27 s |
| Today, bed to the take-off | about 77 m | about 15 s |

The sizes are as in revision 2. The Turret is now a trunk room, 13 m across: the smallest of the trunk, at its top.

## The canopy: Ed's reference (2026-10-24)

Ed sent a photo of an oak for the treehouse's canopy, the Ent as it's seen from outside. Per the house rule, it's described here in words only, not kept.
- **The tree:** a lone, ancient oak, much wider than tall (about 2:1).
- **The trunk:** short, massive and gnarled, flaring at the foot. It splits low, at about a fifth of the tree's height, into four or five huge limbs.
- **The limbs:** they spread out almost sideways, sagging on the way out and lifting a little at their tips (the "decumbent" branches). The outer ones run nearly level, low over the ground.
- **The crown:** a broad, rounded dome of dense, clumpy foliage in deep oak green. It's darker underneath and lighter on its sunlit top, with gaps where the limbs show through.
- **The edge:** the canopy's outline is ragged and lumpy, not smooth.

It fits the plan: a short, thick trunk with long, low limbs out to the rooms. For the build, it's the outside look (`art/ent.js`, the Ent's crown), not the floors.

## Decided since (Ed, 2026-10-24)

- **Bedrooms 2 and 3 are smaller branch rooms** (14 m across since revision 2). Ed: "bedrooms 2 and 3 just need to have enough space to hold the same items; they can be smaller because they don't have a turret. Since they're at the top, the trunk is becoming smaller anyway."
  - At 14 m across (revision 2), each holds her room's set: bed, wardrobe, shoe rack, dressing table and so on, as they will one day. Today they hold sheeted placeholders.
  - Neither needs room for a Turret's branch.
- **No curtains and no loading gate.** Ed: "hopefully the house is large enough that by the time she gets to the terrace it's loaded already. If she sees some stuff pop in, it's not the end of the world."
  - The bedroom's door waits only on her being dressed.
  - She can go anywhere, the Terrace included, while the island is still drawing.
- **The cloak pegs move to the Cloakroom.** Her cloak comes from the clothes pile; the Cloakroom is only for changing it.

## Conflicts still open (flagged, not resolved)

1. **The walk** is 93 m from bed to take-off in revision 3, against 77 m today (see above).
2. **The take-off moves.** Today it's the balcony's south rim. In v4 it's the Terrace's open south-east rim, between the trunk's link to the Dining Room and the Studio's branch. Flying back onto the house, she lands where she flies over the balcony's half-disc today (`flyOnto`); that would need to become this rim.
3. **The bags move from the Study to the Parlour.** They stay a dressing station past her door, as now, so this isn't a conflict, just noted.
4. **The crystal ball is gone.** It's already only a placeholder since the telescope's constellation took its job. Its object and the `ball` use go.

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
  - **No curtains, no loading gate** (`rules/wakeUp.ts`):
    - Drop the `curtains` object (`config/house/rooms/bedroom.json`) and its use kind (`houseRooms.ts`, `configSchemas.ts`), and its drawing (`render/houseFurniture.ts`, `render/houseRooms.ts`).
    - Drop the curtains' states: `WakeState.open` set by `ready`, and the "curtains" event.
    - Make `doorShut` depend on `dressed` only. Something else then ends the wake-up: being dressed, or stepping out of the door.
    - Remove the `notYet` event (E at the curtains before the island's ready), or replace it, along with what plays or shows it (`render/wakeUp.ts`, `app/opening.ts`, `main.ts`).
    - `g.islandReady` stays for the art's own swap, but no longer holds her.
  - **The cloak pegs:** `rules/clothesPile.ts` keeps `cloakPegs: "cloak"` in `STATION_SLOT` (choosing at the pegs before she's dressed still takes the cloak out of the pile); only the station's room changes.
- **Tools and checks:**
  - `tools/house/*-shots.cjs`;
  - `tools/stations/check.cjs` (the bedroom's stations);
  - `tools/opening/shots.cjs`;
  - the house's tests;
  - `CLAUDE.md`'s glossary (the treehouse's rooms).
