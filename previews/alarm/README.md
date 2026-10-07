# The soundsystem alarm 🔇

Ed, 2026-10-06: "We should have an indicator for when a soundsystem or speaker is being attacked offscreen. It can look like the 🎶 indicator, but with 🔇."

These are from `npm run build && node tools/smoke/alarm.cjs`, which loads the game with `?debug=attack`. Every ten seconds that gives a few seconds of blows on the two soundsystems farthest from her; a soundsystem driven down to 15% is mended to full. Seed 123, 1600×900, with the witch in another area's clearing about 200 m from home.

- `alarm-one.png`: one alarm, for home's ring of speakers, off screen to the lower right. The ring is home's health in red, drained clockwise from 12 o'clock as it's hit (the dim part is what's lost). In the middle is 🔇 in pixels, with an arrow toward home and its distance as a pixel label.
- `alarm-two.png`: two alarms, for home and a second soundsystem. Both lie the same way, so the second alarm is moved along the edge and the two cues and labels don't sit on one another.
- `alarm-treetops.png`: the same two seen from the treetops.

Each blow shakes the alarm and swells it a moment. An alarm goes four seconds after the last blow (`alarms.linger`), or as soon as its soundsystem comes on screen. One that falls flashes white once and fades over `alarms.fall`. At most three show at once (`alarms.most`), the most recently hit.
