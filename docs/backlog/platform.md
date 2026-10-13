# Platforms, the port and multiplayer

Discussion notes (Ed, 2026-10-09). **Nothing here is started; don't start without Ed's go.**

## Targets

- **Steam (PC and Mac) and consoles.** Not web or mobile as targets: the browser stays the prototype.
- Consoles justify a **Godot port**. Godot console exports go through porting partners (W4 Games and others, under platform NDAs); GDScript is the safer language there.
- **Port only after the design settles.**

## Sequence (proposed)

1. **Browser:** finish and lock the feature set (unlocks, cauldron, the treehouse, the journey, tutorial, balance).
2. **Technical-debt cleanup sprint** (below), so the port copies a clean game.
3. **Port to Godot.**
4. **Online co-op in Godot.**
5. **Consoles** via a porting partner; console online uses each platform's own services.

## Porting notes

- **Rules first**, using the existing tests as the spec, plus a **trace comparison**: same seed and inputs in both, compare state each step. The deterministic fixed-step sim makes this possible.
- **Art:** the JS art generator stays as a **bake tool**, producing sprite sheets.
- **Music:** rebuild the synth in Godot, or pre-render layers.

## Online co-op

- **Host-authoritative:** the host simulates; clients send inputs, receive nearby state at about 20 Hz and predict their own witch.
- **Steam lobbies**, invites and relays (GodotSteam).
- Joining mid-game is already supported by the design (one area per witch per wave).
- In the treehouse, the computer room / telephone is where she calls friends to the party (journey.md).

## Technical-debt cleanup (before the port)

- Remove dead knobs.
- Move history out of the config files (the long dated notes in config comments).
- Retire the copied balance sims (`balance.ts`, `states.ts`) in favour of sims that run the real rules.
- Refresh `docs/HOW-THE-GAME-WORKS.md`.
- Close stale PRs.

## Open questions

- Synth rebuilt in Godot, or pre-rendered layers?
- Which porting partner, and when to approach them.

## Saving the night in progress

Ed, 2026-10-13. Today the browser keeps the character, the sea chart (found, won, played, voyages, world seed) and small settings, but not the night being played: a reload (including the one on a lost graphics context, #884) restarts it. Save the night too (the wave, her stack and leashed creatures, placed sigils, the areas' state, the clock) every few seconds and on leaving the page, and offer to resume it on the next load. Local storage or IndexedDB, not cookies.
