# Creature size options (Ed, 2026-10-08: "creatures are quite hard to make out on screen")

Options: today, +20%, +35%, +50% for babies, young and adults (`st.creatureScale`, `art/creatures3d.js` drawHeight; `?creatures=1.35` in the game). Every option is baked at the art pixel, never drawn at a fractional scale (STYLE §1 rule 1). Legends keep their size unless their adult would come within 2.2× of them; they then grow just enough to stay 2.2× above it.

- `sizes-1/2/3.png`: each species' baby, young and adult beside the standing witch, once per option.
- `game-ground-today-35-50.png`: the same moment in the game (seed 123, a lynx crowd at night, default ground camera), stacked top to bottom as today, +35%, +50%.
- `game-treetop-today-35.png`: from the treetops, today above +35%. The full frames are `game-treetop-*-full.png`.

## Heights (body px at the default style; the witch's body is 45)

| | today | +20% | +35% | +50% |
|---|---|---|---|---|
| wolf baby / young / adult | 33 / 50 / 90 | 40 / 60 / 108 | 45 / 68 / 122 | 50 / 75 / 135 |
| big adults ÷ witch (wolf, boar, stag, bear, elk, lynx) | 2.0, 1.76, 2.16, 2.07, 2.33, 1.8 | 2.4, 2.11, 2.58, 2.49, 2.8, 2.16 | 2.71, 2.38, 2.91, 2.8, 3.16, 2.42 | 3.0, 2.64, 3.24, 3.11, 3.51, 2.71 |
| legends that grow | none | none | all 32, about +9% | all 32, about +22% |

## What each option breaks

**Art rules (`art/check.mjs`, STYLE §4)**
- The adult-vs-witch check (big adults 1.45 to 2.1 × her, the elk and stag up to 2.5 ×) fails for all six at every option. Its bounds would scale with the option: ×1.2 gives 2.5 / 3.0, ×1.35 gives 2.8 / 3.4, ×1.5 gives 3.2 / 3.75.
- The level steps (young ≥ 1.3 × baby, adult ≥ 1.55 × young) still hold at every option.
- Legend ≥ 2.1 × adult (by body height) fails:
  - at +20% for the badger (2.08);
  - at +35% for the wolf (2.04), badger (2.0) and boar (2.07);
  - at +50% for the same three.
- The fix for the legend step is to set the legend's floor by body height rather than full height, which grows those legends a little more.
- STYLE §4's table (baby 0.65 ×, young 1 ×, adult 1.6 × her) would need its numbers multiplying by the option.

**Rules (all fixed metres; nothing reads the sprite)**
- Body radius: `rules/spacing.ts` bodyRadius, `movement.json` `bodies.radius` × `bodies.level` [0.5, 0.75, 1, 3.2]. Bigger sprites at today's radii overlap more in packs. Scaling the radius moves gameplay:
  - melee reach (`combat/hits.ts` adds both bodies);
  - the 💌 hit radius (`invites.ts`);
  - target radius (`combat/targeting.ts`);
  - the party's guest slots (`partyGuests.ts`).
- Recommendation: scale only the spacing's personal space (`factor`/`margin`) by the option. Leave reach, hit radii, attack ranges (combat.json), talk range 12, leash distances and flocking radii alone: those are gameplay, not looks.
- The balance sims don't see sprite size, so they don't change.

**Render**
- These already follow the sprite: shadows, culling, the 💌 head anchor, health bar height, hit sparks and stun stars.
- These are capped and stop following:
  - bubbles at a top of 4 / 4.5 m (`leash/bubbles.ts`);
  - the combat marker at 4.5 m;
  - the leash ring at 7 m;
  - grass parting.
  
  The caps would want raising by the option.
- Health bar width and sigil rings are sized by level, not sprite. They'd look relatively smaller but still work.
- Live rig (`?rig=1`): `rig.minPx` 40 means bigger babies and young cross into rigging. That's more CPU, so time it with `tools/rig/perf.cjs`. The rig pages (48 kept) also hold more pixels each.
- Atlases: creature sets and rig pages grow about 1.4× (+20%) to 2.25× (+50%) in pixel area. `packPixels` (`artBuild.ts`) is 2048 wide with an unchecked height, so check `maxTextureSize` on phones before +50%.

## What I see

- On the ground, +35% makes the lynx crowd read clearly as animals. +50% begins to crowd her.
- From the treetops, size isn't the main thing. The young and adults read better at +35%, but babies are still mostly two red eyes in the dark, and dark coats on dark ground are the bigger problem.
- A rim light or a brighter coat at night (the witch already has a rim light) would likely help as much as the size does. I'd pair +35% with a night readability pass.
