# Full-smoke split rerun for #1496: df1750e0 (cand) vs 3fefd6ed (base)

Run 2026-10-31 (UTC) on the cloud container's software renderer (headless Chromium, no GPU). Each run: `timeout --kill-after=5s 2700s env ONLY=<list> node tools/smoke/smoke.cjs`, one at a time.

- **cand** = `df1750e0afcbebb143f30fffc9d5ad62c38dfd74` (codex/ci-tests), built with `WITCH_SHA=df1750e0… npx vite build`
- **base** = `3fefd6edd16e46e01a7522b89fe048c47189c91d` (claude/prototype), built the same way

## Called out first

- **No check is ok on base and FAIL on cand.** All four runs exited 0 with "smoke test passed".
- **The effects-off and effects-on screenshots are swapped between base and cand** (see Screenshots). No check fails on this; the smoke test doesn't assert on these pictures' contents.

## Results

| Run | List | Exit | Wall time | Result |
|---|---|---|---|---|
| A-cand | phone,tilt-before,tilt-after,tilt-off | 0 | 978 s | smoke test passed |
| B-cand | effects-off,effects-on,siege | 0 | 955 s | smoke test passed |
| A-base | phone,tilt-before,tilt-after,tilt-off | 0 | 797 s | smoke test passed |
| B-base | effects-off,effects-on,siege | 0 | 913 s | smoke test passed |

| Scene / check | base | cand |
|---|---|---|
| phone: a tap starts the game | ok | ok |
| phone: the touch joystick flies her north-east | ok (20.9, -20.9 m) | ok (20.3, -20.3 m) |
| phone: the round button rises to treetop mode | ok | ok |
| tilt-before / tilt-after / tilt-off | shots only (no ok/FAIL lines) | shots only (no ok/FAIL lines) |
| effects-off / effects-on | shots only (no ok/FAIL lines) | shots only (no ok/FAIL lines) |
| siege: a woken area's creatures besiege its soundsystem, … march on to the dancefloor | ok (asleep 8) | ok (asleep 4) |
| siege: when home's speakers have fallen the party's over and the 💤 pin leads her to bed, no card | ok (true, true) | ok (true, true) |
| siege: the afterparty: nothing fights, everyone's asleep or walking home to bed | ok (asleep 8) | ok (asleep 4) |

Every ok/FAIL line is quoted verbatim in the logs: `A-cand.log`, `B-cand.log`, `A-base.log`, `B-base.log`. There were no FAIL lines and no errors.

## Served version

| | dist/version.json | on-screen label |
|---|---|---|
| cand | `{"version":"dev · df1750e","built":"2026-10-31T02:29:24.470Z"}` | `dev · df1750e` (seed 123) |
| base | `{"version":"dev · 3fefd6e","built":"2026-10-31T02:30:14.696Z"}` | `dev · 3fefd6e` (seed 123) |

(Copies: `version-cand.json`, `version-base.json`.)

## Screenshots (effects-off / effects-on)

| Shot | base (3fefd6e) | cand (df1750e) |
|---|---|---|
| 30-ground-effects-off | **mostly black/empty**: only the witch, lit, on black | **ground, paths and forest**: grass, two curved paths, a campfire, lamps and the dancefloor at the top |
| 30-ground-effects-on | **ground, paths and forest** (behind the debug overlay and rulers): grass, a path, a campfire | **mostly black/empty**: debug overlay, ruler grid and a dim witch on black |
| 31-treetop-effects-off | **mostly black/empty**: the witch on black, with one tree crown and a few lights top-left | **ground, paths and forest**: the dancefloor with its lights, paths, trees round the edges |
| 31-treetop-effects-on | **ground, paths and forest** (behind the overlay and rulers): treetops, a campfire, the dancefloor faint at the top | **mostly black/empty**: debug overlay and ruler grid on black |

So on base the world draws with effects on and is black with effects off; on cand it's the other way round. Both runs used seed 123, the same area (Thorn scrub), and the debug overlay's numbers are similar (cand: ground tiles 4 on the ground and 235 in the treetops; base: 1 and 247). Which of the two is right I can't tell from the smoke test, which only takes these pictures. The software renderer is very slow here (1 to 7 fps), so a picture caught while the scene is still being built can't be ruled out.

Other shots (phone, tilt, siege) are in each run's folder for comparison; I haven't looked through them closely.

## Files

- `A-cand/`, `B-cand/`, `A-base/`, `B-base/`: each run's screenshots (from `previews/`)
- `*.log`: each run's full output
- No file over 50 MB; nothing skipped (3.7 MB in all).
