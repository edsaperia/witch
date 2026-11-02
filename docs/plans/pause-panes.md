# Pause page: buttons on the right, sliders on the left (Ed, 2 Nov ~11:10)

Ed: "We now have a lot of buttons at the top of the pause menu - can you put these on a different pane on the right side, with sliders staying on the left side, both sliding in from their sides when the game is paused."

## What to build

- **Two panes.** The pause page's buttons and toggles (the decision switches and other buttons now stacked at the top) go in a pane on the **right** edge. The sliders stay in a pane on the **left** edge. The game picture stays visible in the middle.
- **Slide in.** When the game pauses, the left pane slides in from the left and the right pane from the right, with a short ease-out (start around 0.25 s, as a knob). On resume they slide back out. Honour the existing reduced-motion setting, if there is one, with an instant show/hide.
- **Keep everything working.** Group headings ("Oak crown", "Treehouse look" and so on) move with their controls. Keep:
  - the current order within each group;
  - keyboard and gamepad navigation (Choose/Back, focus order: left pane, then right pane, or whatever reads naturally; say which);
  - the native text/slider behaviour the pause tests protect.
- **Phone and small screens:** if both panes can't fit side by side, stack them or let each scroll on its own. No horizontal page scroll.
- The code lives in `src/app/overlayPause.ts`, `src/app/settingsPage.ts` and the decision/knob plumbing in `src/app/knobs.ts`. Read the existing pause/menu-ownership rules and tests first.

## Rules

- Layout only: no change to what any control does or to its default.
- Tests: keep the input-ownership and pause tests green. Add direct checks that every control appears exactly once, in its pane, and that both panes are hidden while playing. List any test you change, and why.
- Shots: one pause screenshot at desktop size and one at phone width, in the REPORT.
- Don't change multiplayer files. Before the REPORT, check for merge conflicts with the live #1609 head (`gh api repos/edsaperia/witch/pulls/1609 --jq .head.sha`). The treehouse builder (#1638) is changing treehouse decision defaults at the same time; avoid editing `config/decisions/*.json`.
- PLAN first, then REPORT, then FINAL. The coordinator releases it.
