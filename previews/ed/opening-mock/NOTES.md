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
| 3a | `04-alarm.png` | Dark; the alarm goes off | 2 s | **E** snoozes | the build |
| 3b | `05-snooze.png` | Snooze: "five more minutes…" | 2–3 s | E slaps it quiet, or it rings again louder | the build |
| 3c | `06-stretch.png` | The lamp on; she gets up, yawns, stretches | ~3 s | nothing | the build |
| 3d | `07-up.png` | Out of bed: her first steps | ~2 s, then the player | **WASD**, taught in a safe room | the build; the window shows mist |
| 4 | `08-mirror.png` | The mirror: skin, hair, hair style, face, earrings | the player | the mirror's station opens by itself the first time | the build finishes, and **the swap (step 4)** happens here |
| 5a | `09-window.png` | The window: the island | ~3 s | E looks out (the camera goes through it) | ready; if not, mist, and she waits at the sill |
| 5b | `10-walk.png` | Out through the rooms to the decks | the player | walk; every station works | nothing |
| 5c | `11-party.png` | At her decks: the party spell | 6.5 s + the boot | cast the spell | nothing |
| ★ | `12-later.png` | A returning player's later load | ~10 s to the decks if skipped | any key skips the zoom and the wake-up; the mirror optional | the same build: the skips go no faster than it |

**Timings.** The beats are Foxtrot's:
- the zoom to the window 2–3 s;
- dark plus the alarm 2 s;
- snooze 2–3 s;
- wake and stretch 3 s;
- out of bed 2 s;
- the mirror at the player's pace;
- then the window.

They add up to about 15 s before the mirror, plus the mirror, plus the walk.

**Loading.** These figures are this cloud's software renderer, from Foxtrot's REPORT and Hotel's plan E5. On a real GPU each is far shorter (not measured).
- The chart: mounted in ~4 s, the first islands at ~18 s, all 65 at ~90 s cold, or 5 s from the cache on a revisit.
- Building an island: 15–25 s.

So the wake-up, plus a typical minute at the mirror, covers the build even here. **The only thing that waits is the window:** if the island isn't ready when she reaches it, it shows mist and she waits at the sill.

**What it replaces.** Today the page opens on the creator screen, which doubles as the loading cover: the fairy lights fill, then the 🎶 scroll unrolls. Casting it puts her at her decks for the 6.5 s scratch routine, then the speakers boot. There's no tutorial.

In this opening:
- the wake-up is the loading cover;
- the bedroom teaches walking and E;
- the mirror is the creator's first, smaller step;
- the party spell moves to the decks.

## A returning player (frame ★)

**Recommended: the same beats, skippable and shorter.**
1. The chart opens on the island they last played, with every island they've opened lit.
2. Choosing one zooms to its treehouse window (~3 s). Any key skips the zoom and the wake-up: she's already up.
3. The mirror is optional (walk past it, or E to change).
4. The window waits as before if the island isn't ready.
5. The DJ intro is skippable.

That makes about 10 s to the decks when skipped, never shorter than the island's own build. See Q4.

## Open questions for Ed (recommendation first)

1. **The alarm's sound.**
   - **a) A wind-up bell clock, synthesised in the music's key like every other sound effect,** its bells on the intro's first chord, so the snooze cuts it on the beat. (recommended)
   - b) Her familiar as the alarm (the crow cawing, the cat on her chest).
   - c) The intro itself as the alarm: a music box on the bedside table plays its first layer.
   - d) A plain modern phone alarm, for the joke.
2. **The 6.5 s DJ intro at the decks.**
   - **a) Keep it, skippable with any key**: it's the moment the party starts. (recommended)
   - b) Keep it only on a first game.
   - c) Cut it: the spell goes straight to the speakers' boot.
   - d) Move a shorter version into the morning: she checks the decks from the window.
3. **What replaces the creator screen's tabs (❔ Controls, 📜 What's new, ⚙ Options, and the zoo).**
   - **a) Each to its natural home** (recommended):
     - What's new and Options as corner buttons on the chart, which is the first screen now;
     - Controls taught by prompts in the bedroom (WASD out of bed, E at things) and kept in the pause menu;
     - the zoo through the bestiary's book and a button on the chart.
   - b) All of them in the pause menu only.
   - c) As objects in the bedroom: a noticeboard for What's new, a book of controls, a clock for options.
   - d) Keep a small start screen before the chart, with those tabs.
4. **Skipping for returning players.**
   - **a) Skippable and shorter on later loads** (frame ★); the first game plays it all. (recommended)
   - b) The same every time, unskippable: it's the island's loading time anyway.
   - c) Skippable on every load, the first game included.
   - d) Later loads skip the wake-up entirely and land at the decks; the wake-up only on a first game and after sleeping in the bed.
5. **The creator's choices on a first game.**
   - **a) The mirror only (skin, hair, hair style, face, earrings).** The rest is the classic look until she visits the dressing room and the garage, in play. (recommended)
   - b) The whole of today's creator at the mirror on a first game.
   - c) No mirror on a first game; she goes straight to the window.
   - d) The mirror with a Randomise button, for players who don't want to choose.
6. **The way out on a first game.**
   - **a) The rooms on her way out (dressing room, hub, balcony) lit, the rest dim**, so the path to the decks is plain. (recommended)
   - b) All rooms alike.
   - c) Her familiar leads the way.
7. **Which mirror.**
   - **a) A dressing table in the bedroom,** so the whole wake-up stays in one room until the window. (recommended)
   - b) The dressing room's mirror: she walks through first, and the window comes after.
8. **The snooze.**
   - **a) One snooze, costing nothing** (about 2 s more of the build). (recommended)
   - b) Unlimited snoozes, each a little longer, as long as the island is still building.
   - c) No snooze: any key gets her up.
9. **If the island isn't ready at the window.**
   - **a) Mist outside, she waits at the sill, the music rising; it clears when ready.** (recommended)
   - b) She can walk on through the rooms (their windows misted), and only the balcony door waits.
   - c) Show a progress hint (a small fill on the window sill).
10. **After the bed (ending a night).**
    - **a) The next night starts with the wake-up again (the shorter one).** (recommended)
    - b) Back to the chart first, then the wake-up.

## Files

- `01-chart.png` … `12-later.png`: the frames.
- `sheet.png`: all twelve on one sheet.
- `src/`: the page and script that drew them (`index.html`, `main.js`, `opening.mjs`).
  - They run from a checkout's root with `tmp-opening/` holding them and Foxtrot's frames: `node tmp-opening/opening.mjs <out dir>`.
  - They draw her with `art/generator.js`.
