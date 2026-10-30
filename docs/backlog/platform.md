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
- Joining is any time she can be at the phone: before the party, mid-night or after it. Waves run as normal, whatever the number of witches (Ed, 2026-10-24; the old "one area per witch per wave" is dropped).
- In the treehouse, the telephone is where she calls friends to the party: see **Multiplayer design** below.

## Multiplayer design (Ed, 2026-10-24)

Design only: **nothing here is built, and nothing is to be started without Ed's go.** The tech could be prototyped in the browser (WebRTC between the players' browsers; a tiny introductions server, since GitHub Pages can't run one; a relay for the roughly one connection in ten that can't go direct), but the plan above still puts real co-op after the port.

**Who and where**
- Up to three witches, one per bedroom: the host's own and Bedrooms 2 and 3 in the host's treehouse.
- The **caller is the host**: a friend who answers comes to the host's island and treehouse.
- No map markers or indicators for other witches. They find each other by reading the island, and by **hats**, which all **glow** (hats are magical); a hat left lying is the way to mark a spot.

**The telephone (the lobby)**
- A **classic red rotary landline** on the telephone table in the Boudoir. Walking up to it, its menu rises from the bottom, as the map table's does.
- The menu shows a **rotary dial**, with **floating magic numbers** showing the digits dialled so far, and **her own number on a post-it**.
- **Her number:** 7 digits, made up at random the first time she plays and kept on that browser. It's her address on the introductions server, and she's listed there only while she stands at the telephone table.
- **An address book** on the post-it pad: numbers she's called or been called from, each with that witch's face, picked with one press. New numbers are dialled by hand.
- **Sounds do the work:** dial tone, the dial's whirr and clicks, ringing, "the number you have dialled has not been recognised", an engaged tone, ringing out. When a call connects, the two witches have a short exchange in their babble voices.
- **Answering:** her friend waits near her own telephone table and answers when it rings.
- **Connected:** after a short fade, the friend **wakes up in her bedroom** in the host's treehouse, with the usual wake-up (nightie, clothes pile). When the host steps away from the phone and the menu closes, that bedroom's door is open. A second call fills the third bedroom.
- **Who's in:** a magic floating bubble above the host's phone for each connection, with that witch's face in it; the open bedroom doors; the address book. Witches have no names: faces and numbers only.
- **Kicking:** the host kicks from the telephone table, with the X at the bottom right of a witch's bubble. A kicked witch can ring straight back; the host sees a flickering bubble appear, so they know who's calling.
- **Leaving:** from the host's telephone (she hangs up) or from the pause menu. Either way she's back in her own treehouse.
- **A dropped line** (the host leaves or the connection fails): the friend hears the line go dead and appears in her own treehouse beside her own phone, the host's number pre-filled to dial again at once.
- **The friend's own night** is left behind: she starts fresh at home next time.

**Shared rules**
- **One night clock** for everyone. Time slows (the treehouse's tenth, a legend circle's slow) **only when every witch is in a slow place**: the house, a legend circle, or the pause menu, mixed in any way. If anyone is elsewhere, the night runs at full speed. Alone, it's as today.
- **The pause menu** never stops the world on its own; it counts as a slow place.
- **Tonight's find** goes to everyone in the house that night, in each witch's own collection.
- **Hats, brooms and bags** are the host's and shared (treehouse.md, unlocks.md); each broom part is on one witch's broom at a time.
- **Sigils** on the ground belong to no one: any witch can pick one up. Creatures, soundsystems and waves are shared.
- **A witch who leaves** (hanging up, the pause menu, kicked or a dropped line) leaves her leashed creatures behind as **happy creatures**: each idles where it is, with its sigil on the ground at its feet, which any witch can pick up. Sigils she had already put down stay where they are. **Her hat falls where she stood** (it's one of the host's shared hats, so it stays in the game, glowing, for anyone to pick up):
  - **in the treetops**, it flutters down like a falling leaf, spinning slowly and glowing, through the canopy to the ground below her;
  - **over a lake** (where no one can come down), it sinks and reappears on the hats' floor in the Cloakroom;
  - **in the treehouse**, it drops on the floor where she stood (the same rule as anywhere else), except **in her bedroom**: that room shuts when she leaves, so the hat reappears on the hats' floor in the Cloakroom.
- **Ending the night:** only when **every witch is in bed**.

## Multiplayer first, in the browser (Ed, 2026-10-29)

Ed: "the game is pretty playable now ... I feel like prioritising multiplayer so that I can start doing social playtests." This changes the **Sequence** above: online co-op comes **before** the port, in the browser. **Notes only: don't build without Ed's go** ("don't build anything yet but note these answers").

- **Online, not one screen:** "online, we will get a server" (for introductions and the relay; GitHub Pages can't run one).
- **Time:** "it runs at normal speed unless all witches are in the treehouse, in which case it runs at treehouse speed." (Simpler than 2026-10-24's "every witch in a slow place: house, legend circle or pause menu". Whether a legend circle still counts is to confirm.)
- **Pausing:** "game does not pause unless all players pause, or maybe if the host pauses. check what games normally do here." The coordinator's note: in most online co-op games a player's menus don't stop the world (Minecraft, Valheim, Don't Starve Together); some two-player games pause for both when either opens the menu (It Takes Two). Proposed: station menus and the DJ booth never pause; the world pauses only when every player is on the pause page; the host can't pause alone.
- **The morning and the treehouse:** "guests visit the host - that's why there are guest bedrooms" (as 2026-10-24).
- **Progress:** "all successful permanent unlocks are shared by all players."
- **Difficulty:** no scaling with the number of witches: "the later maps and faster speeds get very hard, people will need friends to help them." (As 2026-10-24: waves run as normal.)
- **Knocked down:** no helping each other up: "current design is fine for now."
- **Music** (every player on the same beat) and **many animals** (the same rules run from one seed, inputs sent, occasional checks): "ok".
- **Server (Ed, 2026-10-30):** Ed's Render account: one small Node WebSocket service in a `server/` folder (a room per phone number: introductions and relaying the host's and guests' messages). Free plan while building (it sleeps after about 15 minutes idle); a paid instance for playtests. Step 2 is briefed once the groundwork (#1457) and save/resume (#1455) are live (Ed: "Yes, brief it then").
- **First steps proposed (not started):** (1) groundwork testable without a network: several witches in the rules, all randomness from the night's seed, stable IDs, a saveable night; (2) a two-witch prototype online, the host's island, joined by link; (3) the telephone, three witches, joining mid-night, dropped lines, logs from every player.

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
