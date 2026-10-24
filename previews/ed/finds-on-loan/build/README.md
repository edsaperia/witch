# Finds on loan: frames from the build (PR #1109)

These are shot from the game itself (seed 123) with `node tools/loan/shots.cjs <dir>`.

| File | What it shows |
|---|---|
| `dream-won.gif`, `dream-won.png` | The won dream after the bed. The cloud rises from her head and away from her, so she stays in view. It is a smooth scalloped cloud with an amber rim and puffs trailing down to her. The constellation gathers into the hats' floor, the Sentry hat appears there, and "The Sentry hat is yours". The dream ends by itself or at any key, and then her alarm rings. |
| `dream-lost.gif`, `dream-lost.png` | The lost dream. The stars drift apart and fade, and "The Sentry hat went back to the stars". |
| `home-*.png`, `dream-homes-sheet.png` | The won dream's last beat for each kind of find, each in its home's own furniture art: the hats' floor (a hat), the wardrobe (a cape), the shoe rack (trainers), the pegboard (a broom part) and the bags (a backpack). |
| `sparkle-hats-floor.gif`, `sparkle-hats-floor.png` | A hat on loan lying on the hats' floor, sparkling. |
| `sparkle-station-card.gif` | A loaned item's card sparkling at the wardrobe (the fourth card). |
| `sky-and-icon.png` | In the treetops: the on-loan icon top left, and the lit constellation in the game's own sky. It sits at its true bearing but drawn low and smaller, so it shows above the treeline; the telescope shows it at its true height. |

Two things in these frames come from the shot tool, not the game:
- In the bed shots she stands by the bed (the shot can't lay her in it).
- In the card shot the start screen shows behind the panel.

Known and separate: hats lying on the hats' floor don't show over the rug's art at all, even before this PR.
