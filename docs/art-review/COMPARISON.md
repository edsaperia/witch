# The night's art review: first against latest

Ed's brief (2026-10-06): "take sets of screenshots of the game and think about what will make the visuals more coherent and aesthetic, keep iterating". Later the same night he added: "a spooky dark forest with a party in it."

Every shot uses the same seed (123), the same places and the same window (1280×720), at night as the game is:
- **First:** `claude/prototype` at 5766018, about 01:00 UTC (`round-01b/`, re-shot with the fixed capture script).
- **Latest:** round 4, about 06:30 UTC (`round-04/`). That's `claude/prototype` at 8b019fb0, now carrying nearly all of the night's work, plus the open #203 (attack cues).

Each picture in `compare/` has the first on the left and the latest on the right.

| | |
|---|---|
| **The creator** | ![](compare/creator.jpg) |
| **Home, on the ground** | ![](compare/home-ground.jpg) |
| **Home, from the treetops** | ![](compare/home-treetops.jpg) |
| **The moor** | ![](compare/moor-ground.jpg) |
| **The moor, from the treetops** | ![](compare/moor-treetops.jpg) |
| **The fern forest** | ![](compare/fern-forest-ground.jpg) |
| **The ravine** | ![](compare/ravine-ground.jpg) |
| **The stone shrine** | ![](compare/stone-shrine-ground.jpg) |
| **A fight at home** | ![](compare/fight.jpg) |

The latest sets also have a shot the first set didn't take: a partified area away from home (`round-03/default-party-*.png`, `round-04/default-party-*.png`). Round 3's amber pool is the clearest picture of "a spooky dark forest with a party in it" so far.

## What changed overnight

1. **A cold, dark wood with the party as the warm light** (rendering, #184–#199 and #208):
   - per-area fog and tint;
   - the party's lights as warm amber pools;
   - the moon on the treetops, so the forest's shape reads from above.
2. **The witch reads in the dark** (#199): a cool moonlit rim and her own light on her. In round 1 she was the floor's value and hard to find.
3. **Each area has its own floor at night** (art builder 1, #205): the moor violet-brown heather, the ravine grey rock, the shrine pale flags. Every green is a dark blue-green, never lime.
4. **The party is warm, not six neons** (art builder 3, #198):
   - amber lanterns and fairy lights, with each area's own neon on one bulb in three;
   - balloons lit by the lights;
   - pools with a moonlit rim instead of black holes.
5. **A quiet UI** (golf, #188 and #209): one amber accent, smaller countdowns, the creator in the same amber, and the creator's new isometric bedroom (#143).
6. **Creatures' eyes in the dark** are small, crisp red pairs, not blurred red discs.

## Still to do (after round 4)

- **Checker dither:** a checkerboard dither on the ravine's rock spires reads as a screen door.
- **Party light colour:** the partified area's light went lime-yellow in round 4. It should stay amber, with the neon on the bulbs.
- **Bold against ref is still Ed's call.** In the fight at home both read (`round-03/bold-fight.png`, `ref-fight.png`). On the dark moor the witch disappeared in both in round 3, which is briefed to rendering. So compare them in the party's light, not on the dark moor.
- **Attacks (Ed's second direction):** the squash, the tumble and the contact puff are in (#193). The cues (#203) are under review.

Fixed between round 3 and round 4:
- the blue-violet swing;
- the shrine's bright flags;
- her missing light in the fern forest;
- the lime glow at home.

Round by round: `round-01/` (its area shots were off the map), `round-01b/`, `round-02/`, `round-03/` and `round-04/`. Each has a README with its critique and briefs. The running thread is PR #177.
