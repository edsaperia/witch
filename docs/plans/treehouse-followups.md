# Treehouse follow-ups (Ed, 2 Nov ~11:00)

Ed, after playing v6994:
> "Please put all treehouse changes live by default.
> I should land anywhere in the treehouse from treetop mode.
> Increase walking speed by 20%
> After I wake up, the forest (background) is black. Then it becomes fully visible instantly. It should fade in over 20 seconds. Also sometimes from the treehouse the background or ground appears red, and the red fades away, do you know why this is?"

## 1. Treehouse look switches ON by default (first, small, release alone)

- In `config/decisions/1635-treehouse-look.json`, set the four toggles (`lookIndoor`, `lookNoNotch`, `lookApproach`, `lookNoWalls`) to default `true`, along with their tuning knobs (`treehouse.house.look.*`). Update the notes: these are now Ed's chosen defaults, not trials.
- The walls-off edge rule comes with it. With a broom she flies off any room edge; without one she gets the existing fall and respawn. Check that the no-broom fall actually happens with the shipped tuning (`treehouse.house.fall.on` is `false` in config/tuning.json). If the walls-off path depends on it, say so and make it work.
- List every test that pinned the old defaults, and how you changed it.

## 2. Walking speed +20% (same small release)

- `treehouse.house.walk` 7.5 → 9 m/s (her walk in the treehouse). **Ed hasn't yet said whether he also means walking on the forest floor** (`groundSpeed` 19.25). Change only the house walk until the coordinator relays his answer.

## 3. Land anywhere in the treehouse from the treetops

- Today she lands into the house from treetop mode only over the Terrace. Ed: "I should land anywhere in the treehouse from treetop mode." Rising/landing (Space) over any room's floor should land her on that floor, with the same landing feel (`landTime`). Over open air between rooms with the walls off, decide by the nearest floor under her or don't land, whichever matches the existing landing rules best, and say which.
- Must not break: waking up in bed, the knockout respawn, guests' bedrooms (#1609 owns the guest side; don't change multiplayer files, and note what the guest path needs).

## 4. Wake-up: the forest should fade in over 20 s

- Ed sees the forest black after waking, then fully visible all at once. The design is a fade over `dark.reveal` (20 s; docs/notes/house.md "Forest fades in behind the house", Ed 26 Oct "Fade in time: 20 seconds").
- Find out why it pops: a regression, the new look switches, waiting on art, or a reveal that starts already complete. Report the cause with evidence, then fix it so it fades over 20 s from the moment it can first be shown.

## 5. The red background or ground seen from the treehouse

- Ed: "sometimes from the treehouse the background or ground appears red, and the red fades away". **Diagnose first, no guessed fix.** Name the cause with evidence: which effect or shader draws red there, and when. Candidates to check (not conclusions): a damage/knockout tint, a placeholder or loading colour before ground art arrives, the light pool, Night/Heat Vision, or a fog/sky colour during the reveal. Then propose the fix.

## Rules

- 1 and 2 release first and alone, as soon as CI is green. 3–5 follow, each in its own report.
- Don't change multiplayer files. Before each report, check for merge conflicts with the live #1609 head (`gh api repos/edsaperia/witch/pulls/1609 --jq .head.sha`).
- PLAN first, then REPORT per item, then FINAL.
