# Combat spacing pass: creatures keep their distance by moving more

Brief for one builder (coordinator, 2026-11-01). Ed's go, 1 Nov ~19:00 UTC ("Can you start working on the spacing pass").

## What Ed asked for

From his 31 Oct playtest note, in the coordinator's paraphrase: animals should keep their spacing through **more dynamic movement that uses more of the combat area**. Push the 29 Oct movement pass further, rather than just making them stand further apart. Account for the **bigger creature sprites** (sizes went on by default on 31 Oct) against radii that are still fixed.

## What exists (read first)

- The 29 Oct movement styles (commit b75265d97): `config/packs.json` `_styles`, `src/rules/combat/packs.ts` (`styleOf`, `wheelSlot`, `spreadLull`, hop start/advance), and `src/rules/combat.ts` around the "fight style's place while it waits" block (~600). The styles are charger, circler, flanker, hopper and steady. Lull members sit 8 m apart, and her animals spread evenly round a foe.
- Orbits were made 30% tighter on 29 Oct (`invites.orbit`, commit 484498fcd). **Don't undo that.** The orbits are Ed's choice. This pass is about creatures' movement, not the orbit rings.
- Creature sizes are on (#1470, release 1031c). The drawn size differs by species, but separation and slot radii are fixed numbers.

## The change

1. **Size-aware spacing:** separation, slot and lull distances scale with each creature's drawn radius, so big bodies don't overlap and small ones don't float apart. One shared helper, used everywhere a fixed radius is used for creature-to-creature spacing.
2. **More of the arena:** exaggerate the styles. Wider wheels for chargers, larger, varying circler radii, flankers that re-position around her, and hoppers whose landing spots spread. Waiting creatures keep moving (drift, re-slot) instead of parking. Keep it readable: no jitter, with turn limits and reaction delays honoured (the creature momentum rules).
3. **Crowding relief:** when two creatures' drawn bodies would overlap, the one waiting moves, not the one attacking.
4. All numbers live in `config/packs.json`, documented beside the existing `_styles` notes. No magic numbers in code.

## Rules

- **Behind a switch, default OFF:** `?spacing=1` (or the existing link-switch mechanism). Ed decides the default after playing it. No tuning goes live on by default without Ed.
- With the switch off, the game must be unchanged: same seeds, same `bench:quick`, no declared differences.
- Don't touch multiplayer files (`src/platform/online/*`, `src/app/visit*`, `src/app/sharedNight*`, `server/*`) or `src/rules/game.ts`'s multi-witch branch. #1609 is landing calls. Merge `claude/prototype` normally before READY.
- No browser or laptop work without a slot from the coordinator. Use cloud CPU only.

## Evidence for READY

- Unit tests: size-aware spacing (no drawn-body overlap among waiting creatures in a seeded fight), styles still distinct, attackers not displaced.
- A seeded fight measurement, switch off vs on, over the same seeds (at least 20 fights): minimum and median pairwise distance between drawn bodies, the share of time any two bodies overlap, and the area of arena used (the convex hull or the occupied cells) while waiting.
- Two short cloud captures (same seed, off and on) for Ed to watch, plus a preview link with `?spacing=1`.
- `bench:quick` unchanged with the switch off.
