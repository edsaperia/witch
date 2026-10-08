# Legend contact sheets (#363)

In the game at night (seed 123, `?wave=off`), in the legend circle nearest home, with each species put in that legend's place.

- `<species>.png`: top row is before (claude/prototype before #363), bottom row is after (#363). Columns: asleep, restless, happy, angry. These are Ed's round 14 cases: the lynx; the birds (owl, raven, heron); the fox (the Stone Shrine's legend, which read as claws); the bear (angry, airbrushed); the boar; and the badger.
- `all-asleep-before.png`: every species' old sleeping form (art/legends.js), from `node art/preview.mjs legends all` (bold).
- `all-asleep-after.png`: every species' legend nap (art/naps.js), from `LEVELS=3 node art/preview.mjs naps all` (bold).

The floors-under-actors case (the pig at the sports field) is checked by `src/render/floors.test.ts`.
