# The new opening: a storyboard (mock, Ed 2026-10-19)

Ed: the first load starts on the sea chart, with only home unlocked in a first game. "We need to zoom from the first map view to the home island anyway." Then into her bedroom, a real room in the treehouse, where she's waking up. "We can extend the waking up (loading) sequence if necessary; alarm goes off, snooze, wake up, stretch, get out of bed, choose hair and skin etc - before seeing out of the window."

**Nothing is built; this mock is for Ed to say go or change.**

- There is one frame per beat, 1600×900, with `sheet.png` holding all of them.
- Each frame shows the scene, then three boxes:
  - **Playable:** what the player can do.
  - **Shown:** what's just shown.
  - **Loading behind it:** what's being built meanwhile.
- A timeline under each frame puts that beat (outlined) against the loading.
- **What's real and what's drawn:**
  - Her sprites are the game's own, from the art generator: asleep (the stargaze pose), reaching, stretching, standing, back to us.
  - The chart, its flight and the decks are real frames from Foxtrot's timing runs. The rooms are today's game (#966).
  - The bedroom and the treehouse's outside are drawn for the mock at the game camera's angle, as the rooms mock was.

## The beats (first game)

| # | Frame | Beat | How long | Playable | Loading behind it |
|---|---|---|---|---|---|
| 1 | `01-chart.png` | The sea chart, only home open | the player | Click home: **Wake up at home**. Pan and zoom; locked islands say what opens them | The page with no night yet (Hotel's plan E5: a Page with `night = null`); the chart's islands; home's map in a worker and its art warming |
| 2a | `02-zoom.png` | The chart's camera dives onto home | 2–3 s | nothing | `startNight` begins: the seed, the game, then the island's layers in slices (steps 1–3) |
| 2b | `03-window-in.png` | …and into her lit bedroom window | 2–3 s | nothing | the build goes on; the bedroom (island-independent) is ready at once |
| 3a | `04-alarm.png` | Dark; her phone alarm goes off | 2 s | **E** snoozes | the build |
| 3b | `05-snooze.png` | Snooze: "five more minutes…" | 5 s a snooze, unlimited | E snoozes again; WASD gets her up | the build |
| 3c | `06-stretch.png` | The lamp on; she gets up, yawns, stretches | ~3 s | nothing | the build |
| 3d | `07-up.png` | Out of bed: her first steps | ~2 s, then the player | **WASD**, taught in a safe room | the build; the curtains shut |
| 4 | `08-mirror.png` | The mirror: skin, hair, hair style, face, earrings | the player | the mirror's station opens by itself the first time | the build finishes, and **the swap (step 4)** happens here |
| 5a | `09-window.png` | The window: curtains shut until the island is ready | until ready, then E | E opens the curtains once it's ready ("not yet" before) | the curtains wait on the build |
| 5b | `10-walk.png` | Out through the rooms to the decks | the player | walk; every station works; all rooms alike | nothing |
| 5c | `11-party.png` | At her decks: the DJ intro starts the party | 6.5 s + the boot | E at the decks: the scratch routine (no party spell) | nothing |
| ★ | `12-later.png` | A returning player's later load (open) | ~10 s to the decks if skipped | proposal: any key skips the zoom and the wake-up; the mirror optional | the same build: the skips go no faster than it |

**Timings.** The beats are Foxtrot's:
- the zoom to the window 2–3 s;
- dark plus the alarm 2 s;
- snooze 5 s a time (Ed), as often as she likes;
- wake and stretch 3 s;
- out of bed 2 s;
- the mirror at the player's pace;
- then the window.

They add up to about 15 s before the mirror, plus the mirror, plus the walk.

**Loading.** These figures are this cloud's software renderer, from Foxtrot's REPORT and Hotel's plan E5. On a real GPU each is far shorter (not measured).
- The chart: mounted in ~4 s, the first islands at ~18 s, all 65 at ~90 s cold, or 5 s from the cache on a revisit.
- Building an island: 15–25 s.

So the wake-up, plus a typical minute at the mirror, covers the build even here. **The only thing that waits is the window:** if the island isn't ready when she reaches it, the curtains stay shut until it is.

**What it replaces.** Today the page opens on the creator screen, which doubles as the loading cover: the fairy lights fill, then the 🎶 scroll unrolls. Casting it puts her at her decks for the 6.5 s scratch routine, then the speakers boot. There's no tutorial.

In this opening:
- the wake-up is the loading cover;
- the bedroom teaches walking and E;
- the mirror is the creator's first, smaller step;
- the DJ intro at the decks starts the party, in place of the party spell (Ed).

## A returning player (frame ★): open

Ed is sending laptop timings first. **The proposal: the same beats, skippable and shorter.**
1. The chart opens on the island they last played, with every island they've opened lit.
2. Choosing one zooms to its treehouse window (~3 s). Any key skips the zoom and the wake-up: she's already up.
3. The mirror is optional (walk past it, or E to change).
4. The curtains wait as before if the island isn't ready.
5. The DJ intro is skippable.

That makes about 10 s to the decks when skipped, never shorter than the island's own build.

## Ed's decisions (2026-10-20)

Every frame is redrawn to match (the changes: 1, 3a, 3b, 5a, 5b, 5c, ★; the curtains in every bedroom frame). The mist is gone from every frame: the curtains stay shut until 5a.

1. **The alarm:** a plain modern phone alarm, "for the joke". Her phone lies lit and buzzing on the bedside table (3a).
2. **The DJ intro:** "The DJ intro replaces the party spell before the party has started. After a knockout it remains the same."
   - At the start of the night, E at the decks plays her 6.5 s scratch routine, and that starts the party; there's no party spell (5c).
   - After a knockout, everything stays as it is today.
3. **The creator screen's tabs:** each goes to its natural home.
   - What's new and Options are buttons in the chart's corner, beside a Zoo button (1).
   - Controls are taught in the bedroom (WASD out of bed, E at things) and kept in the pause menu.
   - The zoo is reached through the bestiary's book and the chart's button.
4. **Skipping for returning players: still open.**
   - Ed asked whether the wake-up really is the loading time. It depends on the machine.
   - He's sending real laptop numbers from `?timing=1` first.
   - Whatever's chosen, a skip never goes past the build. Frame ★ shows the proposal, marked open.
5. **The creator's choices on a first game:** the mirror only (skin, hair, hair style, face, earrings). The rest stays the classic look until the dressing room and the garage, in play.
6. **The way out:** all rooms alike; the path isn't lit (5b).
7. **Which mirror:** a dressing table in the bedroom (4).
8. **The snooze:** unlimited, each one 5 s (3b).
   - E snoozes again; a small count shows how many times and that it rings again in 5 s.
   - WASD, or any move, gets her up.
   - The timeline draws one snooze.
9. **The island not ready at the window:** "Curtains are shut."
   - The curtains stay closed until the island is ready; E at them meanwhile says "not yet".
   - Once it's ready, E opens them onto the island (5a). There's no mist.
10. **After the bed:** the next night starts with the shorter wake-up.

**Not built yet:** the build depends on Hotel's sail-without-reload PRs 5 and 6, which give a Page with no night.

## Files

- `01-chart.png` … `12-later.png`: the frames.
- `sheet.png`: all twelve on one sheet.
- `src/`: the page and script that drew them (`index.html`, `main.js`, `opening.mjs`).
  - They run from a checkout's root with `tmp-opening/` holding them and Foxtrot's frames: `node tmp-opening/opening.mjs <out dir>`.
  - They draw her with `art/generator.js`.
