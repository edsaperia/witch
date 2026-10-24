# Finds on loan till dawn: the mock and the plan

Ed's rule (2026-10-24): a find is kept only if the night is won. She borrows it from the stars.
- **Taken:** its constellation lights up in full.
- **During the night:** she can wear or use it at once.
- **When she sleeps, the verdict comes in her dream** (Ed, round 2: "when she's asleep (after going to bed, or after starting a sail), we can communicate through her dreams").
  - **Won:** the constellation falls as a shooting star into her treehouse, and the find is hers for good.
  - **Not won:** its stars drift apart and fade back into the sky. It can be drawn again on a later night.

Nothing in the game is changed yet. This folder is the mock. The game change (PHASE 2) comes once Ed approves the dream mock.

## Ed's answers (round 1, 2026-10-24)

| # | Question | Answer |
|---|---|---|
| 1–3 | When dawn is, when a loss shows, worn things at a loss | **In her dream, when she sleeps.** The verdict comes in the dream. On a loss, loaned things she's wearing or has fitted are gone when she wakes. The in-world dawn and drift from round 1 (`3-…`, `4-…`) are **dropped**. |
| 4 | A find after the win | **Once the night is won, finds disappear.** A find not taken by the win is gone, and E can't take one afterwards. |
| 5 | Where the sky's constellation stands | **At its true bearing**, as through the telescope. |
| 6 | On foot | **The HUD icon alone** is enough. |
| 7 | The HUD icon's place | **Top left.** |
| 8 | The cards' wording | **No words on the end-of-night cards.** Words appear only in the dream, if anywhere (`5-cards.png` is dropped). |
| 9 | Loaned things in the treehouse | **No text, but sparkly**, at the stations and on the hats' floor. |
| 10 | Multiplayer: leaving early | **Agreed.** A witch who leaves before she sleeps on a won night doesn't keep it; the others still do. |
| — | The leak | **Close it:** a worn loaned item must not count as owned at the next load. |

## The pictures

The backgrounds are real frames of the current game (seed 123, `npm run shot`). The new parts are painted over them, at the sizes the game would draw them.

| File | What it shows |
|---|---|
| `6-dream-won.png`, `6-dream-won.gif`, `-strip.png` | **The dream, won.** She's asleep: the bed's dark veil and "💤 … zzz …", as the game shows it today (`render/wakeUp.ts`, `WakeCard.sleep`). A dream cloud rises from her in bed, in the legends' dream family (`render/thoughtCloud.ts`: the same cloud shape, puffs, amber ink and dark fill). In it:<br>1. Tonight's lit constellation, with her treehouse small below it.<br>2. The stars gather into one, which falls as a shooting star into the treehouse; its windows light up.<br>3. The find rises out of it, sparkling, with *"the Sentry hat ✦ yours"* beside the cloud.<br>4. The cloud fades back to the zzz.<br>About 6 s. |
| `7-dream-lost.png`, `7-dream-lost.gif`, `-strip.png` | **The dream, not won.** The same cloud, with the constellation and the find faint in its middle. The lines go first, then the stars drift apart out past the cloud and fade, the find fading with them, with *"the Sentry hat went back to the stars"* beside it. The cloud empties and fades. About 5 s. |
| `8-sparkle-hats-floor.png`, `.gif`, `-strip.png` | **A loaned hat on the hats' floor**, sparkling: pixel glints twinkling round it in the loan's pale gold-white, a breathing halo and a mote or two rising. No words. (Shot mode lays no hats on the floor, so the hat itself is painted in.) |
| `9-sparkle-station-card.gif`, `-strip.png` | **A loaned jacket's card at the wardrobe**, sparkling the same way (the third card), 3×. The same goes for a part's card at the Workshop's bay and its peg on the pegboard. |
| `1-hud-icon.png`, `1-hud-icon-twinkle.gif`, `-strip.png` | Unchanged from round 1. The on-loan HUD icon, top left: the find in a faint ring of its constellation, twinkling. It stays up till she sleeps. |
| `2-sky-constellation-*.png` | From round 1. The lit constellation's look holds, but per answer 5 it stands at its true bearing, not always in view. |
| `3-…`, `4-…`, `5-cards.png` | **Superseded** by the dream (answers 1–3 and 8). Kept for the record. |

In the bed frame she is standing by the bed, because shot mode can't lay her in it. In the game she would be in bed, under the veil.

## The dream (design)

- **When it plays:** each time she sleeps.
  - **The bed:** the dark veil and zzz while the next island is made (`WakeCard.sleep`).
  - **Starting a sail:** over the chart's last still while the next island is made (`sailInPlace`'s `showStill`). The same cloud rises from the bottom middle, since she isn't on screen.
- **Which dream:**
  - Won (`game.win.phase === "won"`) with a find on loan: **the won dream**.
  - Not won with a find on loan: **the drift dream**. This covers the party being over, sailing mid-night, and going to bed before the win.
  - Nothing on loan: **no dream**, just the zzz.
- **When it's decided:** the moment she falls asleep, before the next night starts, so a sail's reload fallback can't lose it.
  - **Won:** `keepFound` saves the find, and the dream plays.
  - **Not won:** nothing is written, the dream plays, and loaned things are gone when she wakes:
    - A loaned **hat** she wore: her plain hat. A loaned hat lying anywhere goes too.
    - Loaned **clothes**: she wakes in her nightie as always. Last night's pile by the bed holds what she wore before she put the loaned thing on (else that slot's starting item).
    - A loaned **broom part** she fitted: the part she had in that slot before (else the slot is empty), and her broom's spell follows.
    - A loaned **bag**: her previous bag.
- **A reload or closed page mid-night:** she never slept, so there's no dream and nothing is kept. The loan was never written. The same seed draws the same find in the same place, so she can take it again.
- **Its look:**
  - the legends' dream cloud: its shape (`thoughtShape`), its amber ink and dark fill, at the game's pixel grid;
  - the constellation's stars and lines as in the sky;
  - the find drawn as its HUD icon;
  - her treehouse as a small pixel glyph.
- **Sound:** (proposal) the won dream's fall gets a soft chime; the drift gets a falling shimmer under the snoring.

## The rest of the plan (PHASE 2)

- **In the rules (per night):** `g.trunk` holds the night's one find, and the taken one is marked as on loan. The rules' claim stays as it is, so she can use it at once:
  - a hat goes onto her hats and onto the hats' floor;
  - a part goes to the Workshop's bay;
  - clothes and bags are offered at the stations.
- **Finds disappear at the win** (answer 4): once `win.phase` is `"won"`, a find not yet taken is removed. Its piece and light go, E can't take it, and it has no constellation.
- **On the page:** the "found" event no longer calls `keepFound`. It adds the item to a **loan** held in memory, with nothing written to `witch.owned`, `witch.hats` or `witch.broom`. `keepFound` runs only when she falls asleep on a won night.
- **The leak:** `loadOwned` counts a worn item as hers, and her look is saved. Loaned items must be left out of that rule, so a loaned top she's wearing never becomes hers at the next load.
- **The sky's constellation** (answer 5): once taken, it's drawn lit (stars bright, lines whole) at its true bearing and height, in the telescope and in the game camera's own sky. The game camera looks north, so in its sky the constellation shows only when it lies to the north.
- **The HUD icon** (answers 6 and 7): top left, from taking it until she sleeps.
- **The sparkle** (answer 9), no text:
  - a loaned hat's place on the hats' floor;
  - a loaned item's card at its station (wardrobe, dressing table, shoe rack, cloak pegs, bag station);
  - a loaned part's card at the bay and its peg on the pegboard.
- **The cards** (answer 8): no change.
- **Dev controls:**
  - `?own=` and the finds panel's give and let go stay as permanent grants.
  - The finds panel gains tonight's loan with **keep** and **send back**, which play the won or drift dream at once.
  - `?spawnfind=` takes as a real loan.
- **Multiplayer** (`docs/backlog/platform.md`, not built): everyone in the house borrows it. On a won night each witch keeps it in her own collection when she sleeps. A witch who leaves before that doesn't keep it (answer 10). This contradicts nothing in the backlog.
- **Tests:**
  - kept on a win, when she sleeps;
  - not kept on a loss (party over, sailing mid-night, bed before the win), or on a reload;
  - usable during the night (hat worn, part fitted, top worn);
  - a worn loaned item gone when she wakes, back to what she had;
  - finds gone at the win, and E taking nothing after it;
  - the look's save doesn't leak a loaned item;
  - the dev keep and send-back buttons;
  - which dream plays (won, drift, none).
- **Also in PHASE 2:** a changelog fragment and a bench declaration.

## Still for Ed

1. **Words in the dream:**
   - (a) The find's name, with "✦ yours" or "went back to the stars" beside the cloud *(mocked)*.
   - (b) The name only.
   - (c) No words at all.
2. **The dream's length and skipping:** about 6 s (won) and 5 s (lost).
   - If the next island is ready sooner, (a) the dream finishes first *(proposed)*, or (b) any key skips it.
3. **Nothing on loan:** no dream, just the zzz *(proposed)*? Or a quiet dream of the night sky?
4. **The sail's dream:** over the chart's still, the cloud rising from the bottom middle *(proposed)*.
5. **What she wakes in after a lost loan:** what she had before she put the loaned thing on *(proposed)*, or the slot's starting item.
