# Smaller gameplay changes

Backlog (Ed, 2026-10-09 to 10-10). **Not built unless marked built; don't build without Ed's go.** Checked against the code on 2026-10-14 (Kilo): what's left stands here, what's built is in the **Built** list at the bottom with its PR or file. Lakes, relics per area, the master curve and the end of the route are in [journey.md](journey.md).

## Tempo is difficulty — partly built

- **Built:** the pulse runs at `leyLines.pulseSpeed` × the party's tempo rate (`tempoRate` in `rules/beat.ts`, read by `stepParty` in `rules/party.ts`, #527): a knockdown's +5 bpm speeds the pulse as it speeds the music.
- **Built (#953; Ed, 2026-10-18):** the wave speed defaults to **1 m/s** (was 4), set from a slider on the pause page; the bedroom's "Waves:" dropdown is gone (`leyLines.pulseSpeed`, `config/decisions/953-waves.json`). **Open:** how the records' "pulse speed from the bpm" (journey.md, section 2) fits a wave speed now set on its own; Ed wants the early nights slow.

## Invitations bounce off the enraged (Ed, 2026-10-12) — built

- **Built:** a 💌 that reaches an **enraged** creature stops dead (`blocks` in `src/rules/invites.ts`, the `blocked` event; #89) and a 💢 pops over it with a stung face (`src/render/invites.ts`).
- **Built (#923):** the **angry, whiny sound** (`refused` for `blocked` in `src/platform/audio/sfxCues.ts`, `chimes.ts`), the 💢 **vibrating**, and the invitation **crumpling into a ball of paper** and being tossed away.

## Controller — partly built

- **Built (#618):** cross rises or lands, square picks up and puts down sigils (held: her hat), triangle cycles the stack, circle boosts (the spell), R2 invites, L2 blinks. Start pauses.
- **Built (Lima, 2026-10-15, Ed's notes of 15 Oct):** triangle puts her hat down and picks it up (it was holding square), circle cycles the stack (it was triangle), the broom's spell (the boost) moves to L3 (the left stick pressed, where games put sprint; Ed confirmed, 2026-10-15). Square still picks up and puts down; **held on, it runs** (`src/rules/leash.ts` `run`, `leash.runs`, E on the keyboard too): since a press that picked a sigil up it keeps picking up any she runs over, since a press that put one down each empty hex she moves into takes the next; a press that did nothing starts no run, so holding E with nothing to do still puts her hat down (not square: its hat is triangle).
- **Built (#649):** blink goes the way she's moving, not the way she's aiming, on the pad and on keyboard and mouse; standing still, the way she's facing (`src/rules/dash.ts`; `dash.toCursor` off).
- Remaining (not built; the pad reaches the sea chart, the station menus (`src/ui/stationPanel.ts`, #1076), the Studio and the telescope, and the treehouse's use prompt shows the pad's square, `src/ui/keyHint.ts`):
  - **Creator and treehouse on the pad:** today they're mouse-only. Next / Back on buttons, left and right for options.
  - **Pad prompts:** on-screen prompts show keyboard keys even on a pad.
  - **Rumble:** none yet.

## Ed's notes, 2026-10-15

- **Sigils defend their whole area.** Today a sigil placed in the home area has her creatures fight any hostile in that area; a sigil placed in any other area only defends a radius round it. Placing a sigil in any area should work as home does: the creatures defend the whole area, plus a radius round the sigil. — **Built** (#941).
- **The arc of leashes should be higher.** — **Built** (#936).
- **The stack's sigils (above her head) more visible:** more opacity, and never obscured by scenery. — **Built** (#937).
- **Pick up and place in runs.** Picking up: if the first press picks a sigil up, holding the button keeps picking up any she runs over. Placing: if the first press places one, moving into empty hexes while holding places more. **Pad:** her hat is placed and picked up with triangle (was holding square); circle cycles the stack. — **Built** (#938; `leash.runs`, the Controller line above; the broom's spell moved off circle to L3, confirmed by Ed).
- **One trail, one cooldown.** The trail she leaves in the treetops, landing and taking off should also appear when she dodges. Its length shows one shared cooldown counter for dodge and take-off (the two contribute different amounts to it). — **Built** (#940).

## Ed's notes, 2026-10-16

- **Built (2026-10-19): envelopes go behind scenery as animals do.** A 💌 in flight should be hidden by trees and scenery the way animals are, not drawn over everything. Ed added: smoke counts too, and so do the invite rings. Each 💌 and each ring now asks the scene's depth, at the point animals are drawn, whether it is seen (`render/occlusion.ts`), and the smoke veils it. See HOW-THE-GAME-WORKS §6.

## Open questions

- Single-file tightness: shipped at 1.6 m, raised to 5 m by Ed (#666; `leash.babies.gap`). Settled unless Ed says otherwise.
- The rest are answered: babies on the ground (the Decision below, built), the flying cooldown's length (3 s, a pause-page slider since #916), blink when standing still (her facing, #649).

## Decisions (Ed, 2026-10-11)

- **Babies on the ground:** babies weigh **more on the ground than in the treetops**, so 8 fill the ground allowance (and 8 the treetops' too). Species strength still doesn't count for babies. — **Built** (#649, `leash.weight.babyGround` 0.56; `src/rules/leashWeight.ts`).
- **The Player dropdown** (human or bot) moves to the **debug overlay only**; players never see it. — **Built** (#649, `src/app/playerPick.ts`: shown only with the debug overlay on). The Waves menu goes. — **Built** (#953: a pause-page slider instead; see Tempo is difficulty).

## Built

- **Babies** (#648, Ed's go on golf's plan; `src/rules/babies.ts`): single file along where she's been, in stack order, `leash.babies.gap` apart (1.6 m shipped, 5 m since #666); scatter in combat (8 m); no drawn leashes; very fast offscreen (past 35 m, 40 m/s); berries only at a placed sigil within `berries.babyReach` (10 m), the berry glowing while a baby's sigil is next down; one berry (`berries.babyCost`) makes a youth.
- **Baby weight** (#611: baby 0.3, youth 0.8; #649: baby 0.56 on the ground, `leash.weight.babyGround`; strength never counts for a baby: `creatureWeight` in `src/rules/leashWeight.ts`).
- **Flasks: every flask is a growth spurt** (Ed, 2026-10-18; #954, `growthSpurt` in `src/rules/berries.ts`): everything following her becomes an adult; a flask no longer makes a legend happy.
- **Flasks a third the size** (#647; `PARTY_RELIC_SIZE` in `art/partyRelics.js`, the light scaled with it) and the relic sigil's offset back to 6 m (`config/legends.json` `relics.sigilOffset`).
- **Relics: one per 10 areas** (#650; `relics.perAreas` in `config/legends.json`, `placeRelics` in `src/rules/legends.ts`).
- **Flyers' longer dive bottom** (#611, on #588's swoop): now 4 s for the owl, bat and raven (`movement.swoop.bottom` in each `art/creatures/<id>/creature.js`).
- **Flying cooldown** (#649): after landing she can't rise for `riseCooldown` seconds (3; `src/rules/game.ts`, `riseCooldownOf` in `src/rules/spells.ts`; the plain broom halves it, `spells.plain.riseCooldown`, #695). A pause-page slider for it since #916.
- **Enraged animals march inward** (#649): `nearestSound` in `src/rules/combat/targeting.ts` never picks a soundsystem further from the map's centre than the besieger (`INWARD_SLACK` 10 m; home always); `marchOn` in `src/rules/combat.ts`.
- **Blink goes the way she's moving** (#649; `src/rules/dash.ts`).
- **Controller bindings** (#618; `PAD` in `src/platform/input.ts`).
- **Player dropdown in the debug overlay only** (#649; `src/app/playerPick.ts`).
