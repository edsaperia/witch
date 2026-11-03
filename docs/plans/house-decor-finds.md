# House decor you win and place

Design note from Ed's discussion with the coordinator, 3 Nov 2026. Quotes are Ed's words. **Postponed: not to be built yet** (Ed:
"Write a note, we'll postpone building it for now").

## Idea

Ed: "The house has clutter; pot plants and such. We could make this stuff you can win (types of finds) and pick up and place in the
house. And have a big variety. Statues and art and lights and magic objects and so on."

Today the treehouse's rooms are dressed automatically (`art/houseDecor.js`, `render/houseDecor.ts`): a rug and four to six seeded
pieces a room by the walls (lamps, candles and lanterns, fairy lights, small wordless neon signs, glowing mushrooms, pot plants), each a
small 3D model built from a seed so no two are alike. This note turns that clutter into a collection she earns.

## Rulings (Ed, 3 Nov)

1. **Decor is a kind of find, won instead of the find.** A challenge area's reward (docs/HOW-THE-GAME-WORKS.md, Challenge area) can be
   a decor piece in place of the night's find. "We'll come up with a way of choosing what finds are found on what nights on what
   island in the future": which reward a given night and island gives (a gameplay find, a decor piece, a flask) is left to that later
   design. Until then nothing changes.
2. **Free placement.** She places a piece anywhere on a house floor, not in set spots.
3. **The existing clutter goes.** "Existing clutter is removed so you have to earn it": the automatic dressing is removed when this is
   built, and the house starts bare of decor (furniture and stations stay).

## Proposed shape (for the build; not yet ruled on)

- **Ownership.** Won pieces are kept with the campaign save, like finds; each is a seeded piece (its kind and seed), so it looks the same
  every night and on every device.
- **Placing.** In the house, the place key picks a piece up (it floats with her, as a sigil does) and puts it down where she stands,
  snapped gently to the floor, kept clear of stations, doorways, the way in and the bed and use spots. Her placements are saved.
  Unplaced pieces wait in a chest or on a shelf until she places them.
- **Variety, themed by where it was won** so the collection tells her journey:
  - statues of an island's animal (its creature model in stone, bronze or gold);
  - paintings of an island or its legend;
  - lights in the island's biome's style (ice lanterns from the cold, lava lamps from the volcanic, paper lanterns, fairy lights,
    neon signs, glowing mushrooms);
  - magic objects (floating orbs, a snow globe of the island, a bottled storm, a crystal that hums with the music);
  - plants of the biome;
  - unique trophies for the hardest feats (the late home's 128-animal challenge).
- **Multiplayer.** A visitor sees the host's house as the host arranged it.
- **Art.** Reuse the house decor generator's parts and models, and the creature genomes for statues.

## Open questions

1. The reward schedule: which night and island gives which kind of reward (Ed's later design, ruling 1).
2. Whether pieces can be removed back to storage, and any cap per room.
3. Whether decor has any effect beyond looks (none proposed).

## Build order, when picked up

1. Remove the automatic clutter; a saved inventory of pieces and free placement in the house.
2. The first themed set (statues, lights, plants) and the reward hook.
3. Paintings, magic objects and trophies.
