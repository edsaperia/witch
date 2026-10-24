# Finds on loan till dawn: the mock and the plan (PHASE 1)

Ed's ask (2026-10-24): a find is kept only if the night is won. She borrows it from the stars:

- **Taken:** its constellation lights up in full.
- **During the night:** she can wear or use it at once.
- **Won:** at dawn it falls as a shooting star into the treehouse, and it's hers for good.
- **Lost:** as the party dies, its stars drift apart and fade, and it goes back to the sky. It can be drawn again on a later night.

On loan, two reminders show: a small HUD icon in a faint ring of its constellation, and the lit constellation low in the game's own sky.

Nothing in the game is changed yet. This folder is the mock. The game change comes once Ed approves (PHASE 2).

## The pictures

| File | What it shows |
|---|---|
| `1-hud-icon.png` | The on-loan icon on the HUD (top left, under the clock's line), on foot in the forest, with a close-up at 4×. The find's own icon (here the Sentry hat) sits in a faint ring of its constellation's stars. The stars twinkle. |
| `1-hud-icon-twinkle.gif` / `-strip.png` | The icon's twinkle, 8 frames. |
| `2-sky-constellation-forest.png`, `2-sky-constellation-home.png` | The lit constellation low in the game's own sky, from the normal treetop camera, over the forest and over home: stars bright, lines drawn whole. Each has a close-up at 3×. On foot under the canopy the game camera shows no sky (see `1-hud-icon.png`), so there the HUD icon is the only reminder. |
| `3-won-dawn.gif` / `-strip.png` | A won night's dawn: the constellation gathers into one star, which falls as a shooting star into the treehouse, with a flash on its roof. Then the card. |
| `4-lost-drift.gif` / `-strip.png` | A lost night: as the party's lights ripple out, the stars drift apart, the lines go first, then the stars fade. The HUD icon's ring breaks up the same way and the icon fades. |
| `5-cards.png` | The won and lost cards with their find line (the wording is Ed's to pick). |

The backgrounds are real frames of the current game (seed 123, `npm run shot`). The new parts are painted over them, at the sizes the game would draw them.

## The plan (PHASE 2, once approved)

### Where the loan is held, and what keeps it

- **In the rules (per night):** `g.trunk` already holds the night's one find and `found`. A taken find becomes `g.trunk.loan = { at }` (taken, not yet kept). The rules' claim stays as it is, so she can use the find at once:
  - a hat goes onto her hats, and onto the hats' floor (`addFloorHat`);
  - a part is hers at the Workshop's bay;
  - clothes and bags are offered at the stations.
- **On the page (per night, never written):** the "found" event no longer calls `keepFound`. Instead it adds the item to a **loan** held in memory: the owned set, hats and parts the page shows tonight, with nothing saved to `witch.owned`, `witch.hats` or `witch.broom`.
- **Kept on a win:** at the moment the night's win is recorded (`game.win.card`, where `nightOver(... won: true)` already records the night's islands), the page calls `keepFound` for the loan. It's saved, and the shooting star plays. This matches the islands: "only a won night keeps them".
- **A leak to close:** today the look's save (`witch.look`) and `loadOwned`, "one she's wearing still counts as hers", would turn a loaned top she has on into a kept one at the next load. Loaned items must be left out of that rule. The test below covers it.

### A loss while she's wearing or using it

A loss is any of these:
- the party's over;
- she sails away mid-night;
- she goes to bed before the win;
- the page reloads.

The question is what happens to a loaned thing she has on:

| Thing | Proposal | Alternative |
|---|---|---|
| A hat on her head | Lifts off as stars as the constellation drifts; her plain hat is back (`setLoadout(..., "none")`). A loaned hat lying anywhere (put down in the forest, or on the hats' floor) goes the same way. | Stays on till she goes to bed, then gone. |
| Clothes she's put on | Shimmer away as the stars drift; that slot goes back to what she wore before she put it on (else the slot's starting item). | The same, at bed. |
| A broom part fitted at the bay | Leaves the slot as stars; her last part in that slot is back (else the slot is empty); her broom's spell follows (`setParts`). | The same, at bed. |
| A bag | Goes back to her previous bag. If it holds anything, that stays with her. | The same, at bed. |

The proposal ties it all to the one moment the stars drift apart. After the party's over she walks about safely, so losing a spell then costs nothing.

### The end-of-night cards

- **Won:** a line under the islands: *"The Sentry hat fell from the stars: it's yours, on the hats' floor."* It names where it went, as the found line does today (hats' floor, the wardrobe, the Workshop).
- **Lost:** a line under "You lasted …": *"The Sentry hat went back to the stars. It may fall your way another night."*
- With nothing taken tonight, neither card says anything about finds.

### The dev controls

- **`?own=` and the finds panel's give and let go** stay as they are. They are dev grants, written for good, not loans.
- **The finds panel** gains a line for tonight's loan and two buttons, **keep** (as a win) and **send back** (as a loss), so both endings can be tried without playing a night out.
- **`?spawnfind=`** spawns as tonight's find, so taking it is a loan like a real one, which is the point of testing with it.

### A reload mid-night

The night isn't saved (`docs/backlog/platform.md`, "Save the night too", not built), and the loan is never written, so a reload loses it. The same seed draws the same find in the same place, so she can take it again.

When the night's save is built, the loan goes in it, and a resumed night resumes the loan.

### Multiplayer (`docs/backlog/platform.md`, not built)

"Tonight's find goes to everyone in the house that night, in each witch's own collection." On loan, that reads:
- everyone in the house borrows it at once;
- on a win, every witch still in the house keeps it in her own collection;
- on a loss, nobody keeps it.

"Hats, brooms and bags are the host's and shared" still holds: a loaned hat is on the host's hats' floor till dawn. Nothing here contradicts the backlog.

### Tests (PHASE 2)

- kept on a win;
- gone on a loss (party over, sailing mid-night, bed before the win);
- usable during the night (hat worn, part fitted, top worn);
- a worn loaned item comes off at a loss;
- a reload keeps nothing;
- the look's save doesn't leak a loaned item;
- the dev keep and send-back buttons work.

## Choices for Ed

1. **When "dawn" is.** The game has no dawn yet.
   - (a) The win itself, as the victory lap reaches home, just before the card *(proposed)*.
   - (b) When she goes to bed after a won night.
2. **A lost night's moment.**
   - (a) The stars drift as the party's lights ripple out *(proposed)*.
   - (b) When she goes to bed.

   Sailing away mid-night or going to bed before the win would play the drift quickly first, either way.
3. **Worn or fitted loaned things at a loss.**
   - (a) Taken off at the drift, back to what she had *(proposed)*.
   - (b) Kept on till bed.
4. **Taking the find after the win.** Today E only works while the party's on. Should a find taken after the win (the conga, the afterparty) be kept at once, with the shooting star straight away? Or should it be closed once the night is won?
5. **Where the sky's constellation stands.** The game's own sky is a fixed view, looking north just over the horizon.
   - (a) Always low over the top of the screen, a little left of the moon's path, so it's always in view *(mocked)*.
   - (b) At its true bearing, so it shows only when the camera faces that way. The game camera always faces north, so it would often be out of view.
6. **On foot.** The canopy hides the sky, so on foot the HUD icon is the only reminder. Is that enough, or should the constellation also show in clearings where the sky is open?
7. **The HUD icon's place.**
   - (a) Top left *(mocked)*.
   - (b) Beside the clock, top centre.
   - (c) By the action bar.
8. **The cards' wording** (above, and in `5-cards.png`).
9. **Loaned things in the treehouse.** Should they be marked as on loan, a ✦ with "till dawn" on their card at the stations and on the hats' floor? The mock doesn't show this yet.
10. **Multiplayer:** a witch who leaves before dawn (hangs up, is kicked or loses the line). Proposed: she doesn't keep it (it wasn't dawn for her), and the others still do.
