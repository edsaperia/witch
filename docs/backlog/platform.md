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

## To investigate: BRUTAL, instead of Godot (Ed, 2026-10-16)

Ed: investigate https://github.com/ahwootech/BRUTAL as the port's foundation. Looked at on 2026-10-16 (the coordinator, README only):

- **What it is:** RocketWerkz's free C# framework for making a game or your own engine (RimWorld's Waylith engine and Kitten Space Agency run on it). Deliberately small: interop, memory, collections, strings, maths, a job system, logging, localisation, and bindings to Vulkan 1.3, OpenGL, GLFW and SDL, Dear ImGui, FMOD and OpenAL, RakNet, Jolt and Box2D, FreeType, glTF, KTX. **No editor, no scene graph, no renderer**, and none planned: you write your own stack. .NET 10; today **Windows and Linux** only.
- **Licence:** MIT with an attribution requirement (the copyright notice in the credits, the logo before gameplay, `NOTICE.txt` shipped), waivable for non-profits or by a separate commercial licence; not yet OSI approved. Third-party components keep their own licences (FMOD is not free for commercial games above a revenue threshold; OpenAL and SDL mixer are).
- **Why it might suit us:** the game is already "rules first, art baked to sprites": a small 2D renderer over Vulkan or OpenGL, the fixed-step sim ported as is, and the existing tests as the spec is close to how BRUTAL is meant to be used. No engine's architecture to fit. C# rather than GDScript, and Ludeon report 2 to 4× Unity's performance.
- **What to check before choosing it over Godot:** (1) **consoles**: Godot has porting partners under platform NDAs; BRUTAL's console story (Vulkan on Switch, PlayStation and Xbox need their own APIs) is unknown; ask on their forum. (2) **Mac**: Steam PC and Mac are the targets, and BRUTAL lists Windows and Linux (Vulkan on Mac means MoltenVK). (3) **Build from source**: project files and build scripts were "coming" as of the README; the NuGet packages are the way in. (4) **Audio**: the synth would need rebuilding on FMOD, OpenAL or SDL mixer; Faust compiles to C, which fits. (5) **Online co-op**: RakNet bindings are there; Steam lobbies would need Steamworks.NET or similar. (6) How small the team and the community are; the framework is new and its scope is fixed by its owners.
- **Not started**; no decision. Revisit when the port is next up (sequence step 3 above).

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
