# Smaller gameplay changes

Backlog (Ed, 2026-10-09 to 10-10). **Not built unless marked shipped; don't build without Ed's go.** Lakes, relics per area, the master curve and the end of the route are in [journey.md](journey.md).

## Babies

- **Single file:** leashed, on the ground, babies line up behind her in single file along where she's been, in stack order. How tight the line is is a knob.
- **They scatter in combat.**
- **No drawn leashes** for babies.
- **Very fast offscreen:** they always reach her within seconds.
- **Berries:** a baby only eats when its sigil is placed within 10 m of it. When a baby's sigil is next to be placed and a berry is within 10 m, the berry glows brightly to show it'll be eaten.
- **One berry evolves a baby into a youth.**
- **Weight** (Ed): free in the treetops for 8 babies, 3 youths or 1 adult; on the ground 8 / 5 / 2.
  - **Shipped (#611):** baby 0.3, youth 0.8 (from 0.5 and 1). Free allowance unchanged (2.5 treetops; on the ground plus one adult's weight, #608).
  - Not yet built: **species strength doesn't count for babies** (it still does for youths and adults).

## Flasks (the relic bottles)

- **One third the size.** Today they're drawn 7 to 16 m across (legend-sized).
- Then the relic sigil's offset can come back in: `legends.json` `relics.sigilOffset` is 12 m only because the big bottle's mound hid the sigil at 6.
- **Relics: one per 10 areas** (journey.md; today's maps have six whatever their size).

## Flyers

- **Shipped (#611):** a longer bottom to their dives, so they can be invited (`movement.json` `swoop.bottom`: owl and raven 0.6 → 2 s, bat 0.3 → 1 s).

## Tempo is difficulty

- The record's bpm sets the pulse's speed as well as the music's: **pulse speed = 4 m/s × bpm / 120**. It replaces today's separate Waves menu (2.5 / 4 / 6 m/s). Knockdowns still add 5 bpm.
- She chooses it by choosing a record (journey.md, section 2).

## Flying cooldown

- **Why:** players rise to the treetops instead of dodging. Rising takes her out of ground mode at once, so nothing can hit her for the whole 0.7 s climb.
- **Fix** (Ed): after she lands she can't rise again for a few seconds (about 3 s; a knob).
- Not chosen: hittable while rising; a cooldown after a hit.

## Enraged animals march inward

- After destroying a soundsystem, enraged animals **never target a soundsystem further from the centre than they are** (Ed). They march inward, toward home, never back out.

## Controller

- **Shipped (#618):** cross rises or lands, square picks up and puts down sigils (held: her hat), triangle cycles the stack, circle boosts (the spell), R2 invites, L2 blinks. Start pauses.
- Remaining:
  - **Blink goes the way she's moving**, not the way she's aiming, on the pad **and** on keyboard and mouse (Ed). Standing still: the way she's facing (proposed).
  - **Creator and treehouse on the pad:** today they're mouse-only. Next / Back on buttons, left and right for options.
  - **Pad prompts:** on-screen prompts show keyboard keys even on a pad.
  - **Rumble:** none yet.

## Open questions

- Babies on the ground: with baby 0.3 the ground frees about 15 babies, not Ed's 8. Do babies need their own rule on the ground, or is 15 fine?
- Single-file tightness: the knob's default.
- Flying cooldown length (3 s proposed).
- Blink when standing still: facing (proposed) or something else?

## Decisions (Ed, 2026-10-11)

- **Babies on the ground:** babies weigh **more on the ground than in the treetops**, so 8 fill the ground allowance (and 8 the treetops' too). Species strength still doesn't count for babies.
- **The Player dropdown** (human or bot) moves to the **debug overlay only**; players never see it. The Waves menu goes (the record sets the tempo).
