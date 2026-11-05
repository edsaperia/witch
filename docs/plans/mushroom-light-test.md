# Mushroom lighting controls, a test row, and the invisible cauldron (Ed, 2 Nov ~11:15)

Ed: "please give me some pause-menu controls for adjusting the mushroom lighting. Spawn one mushroom of each kind in a row 10m apart 40m south of the dancefloor so I can test it. The cauldron and mushroom baskets seem to be invisible."

## 1. Pause-page controls for mushroom lighting

- Add a "Mushroom light" group to the pause page (a decision file, like the other groups), with sliders for whatever shapes the mushroom glow today. That means `src/render/mushroomGlow.ts` (the subtractive colour halos) and its knobs in `config/playtest-render.json`: at least halo strength, radius, colour saturation/complement amount and height, plus any glow on the cap itself. Each slider has a sensible range around today's value, and today's values stay the defaults.
- No default changes; Ed tunes and then tells us the numbers.
- The pause page is being split into a left (sliders) and right (buttons) pane in #1639. Use the normal decision/knob plumbing so the new group lands in the right pane automatically. Don't edit `src/app/overlayPause.ts` or `settingsPage.ts` yourself.

## 2. A test row of mushrooms

- One mushroom of each kind, in a straight east–west row, 10 m apart, centred 40 m south of the dancefloor's centre, on the ground. Make it a switch in the same pause group ("Mushroom test row"), default off, so normal nights are unchanged. It's for looking at, so make it pickable only if that's free; say which.
- Check none of them lands in water, inside the stone keep-clear zone, or on top of scenery. If the spot is blocked on some seeds, nudge the row and say how.

## 3. The cauldron and mushroom baskets look invisible

- Ed can't see the cauldron or the baskets (the kitchen in the Dining room, docs/notes/cauldron.md). **Find out why first, with evidence:**
  - Are they not placed?
  - Placed but not drawn (layer, render order, the new treehouse look switches such as walls-off or indoor crown fade, the house-only layer while the island loads)?
  - Drawn but transparent or off-screen?

  Then fix it. Check against the live treehouse look switches, which Ed is turning on by default in #1638.
- **A lead for #1638's red-tint item, not a conclusion:** `mushroomGlow.ts` draws *subtractive* colour halos that remove the complementary light from the background. If basket mushrooms in the house are glowing while their meshes are invisible, a red or other coloured patch could appear behind them and fade. Check whether that's what Ed saw, and post the answer on #1638 too.

## Rules

- Don't change multiplayer files. Check for merge conflicts with the live #1609 head before the REPORT. Coordinate with #1638 (treehouse) on anything in the house's draw path.
- PLAN first, then REPORT, then FINAL. The coordinator releases it.
