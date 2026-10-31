# PR #1526 play check: treehouse editor and Ed's opt-in layout (commit 2d14f5d)

Run on 2026-10-31, 14:12 to 14:52 UTC. Cloud container, headless Chromium on SwiftShader (about 1 frame per second in the game).
Built with `WITCH_SHA=2d14f5d3a35d8f729a40de44635847846e50e37d npx vite build`. `dist/version.json` = `{"version":"dev · 2d14f5d", ...}`. The build was served from a small local static server (`scripts/serve.cjs`).

## Summary

| # | Item | Result | One line |
|---|---|---|---|
| 1 | Editor check (`tools/house/editor-check.cjs`) | **PASS** | Exit 0: drag, rotation, undo/redo, copy fallback, bad import refused, hat points exported, no localStorage written. |
| 2a | Wakes in bed (`?layout=ed`) | **PASS** | She wakes at the Turret bed (3.65 m from the bed's use point) with the alarm, the WASD keys and "E snooooze". No page errors. |
| 2b | Numbered hat points, lowest empty first | **PASS, with a note** | New hats take the lowest free point. Her plain hat lies on point 1 on the first morning and blocks points 1 and 2, so the first hat lands on point 3 (see notes). |
| 2b | Overflow when every point is full | **PASS (queues), with a note** | With 14 hats and 3 points blocked by her plain hat, the 14th hat (`routeseer`) waits in `hatOverflow`; no stacking and nothing lost. When the plain hat was lifted and points 1 and 2 freed, the queued hat **stayed queued** over the next frames (no other hat action happened). |
| 2c | Save/load keeps hats on their points | **PASS** | After a reload the saved night came back with the same point list, the same overflow list and the same worn hat. |
| 2d | DJ booth | **PARTIAL** | E at the decks opens the booth panel ("Get this party started"). The button was disabled (`aria-disabled="true"`, class `db-go off`), so the party never started; I didn't choose a record (probably needed first). The seat and landing are **NOT TESTED**. |
| 2e | Kitchen: cauldron and 9 baskets | **PASS (drawn), 6 of 9 used** | The cauldron and all 9 baskets are drawn round it. E at blue, purple, pink, red, orange and yellow each sent one mushroom to the pot. Green, turquoise and white took nothing, because the pot was still busy with the earlier brew (not a layout fault as far as I can tell). |
| 2f | Visual layering, room by room | **PASS, 2 things to look at** | All 14 rooms screenshotted. No furniture drawn over the witch and no walls clipped. To look at: the Kitchen and the two locked bedrooms (see notes). |
| 3 | Default game (`?seed=123`, no layout flag) | **PASS** | Wakes in bed with the snooze hint, a hat spawns, the kitchen draws as before. No page errors. |

**Page errors:** none in any run (the `pageerror` and console `error` lists are empty in every results JSON).

## Notes and evidence

### 1. Editor
`editor/run.log`: `PASS {...}`, exit=0. Screenshots: `editor/overview.png`, `editor/moved-station.png`. Results: `editor/results.json`.

### 2. Opt-in game, `/?layout=ed&seed=123&quick=1&resume=1`
Keys held in real time often didn't register at about 1 frame a second. So the reliable runs stepped the game a frame at a time (`window.witch.manual = true; window.witch.frame(controls, 1/60)`), with `place`/`hat` controls as E/the hat button. Hats were spawned with `window.witch.take('hat', id)`, the same call the finds use (it calls `addFloorHat`). Raw logs: `ed/b2.log` (real-time run), `ed/b2b.log`, `ed/b2c.log`, `ed/b2d.log` (stepped runs). JSON: `ed/results*.json`.

**a. Waking.** `ed/a1-wake.png`, `ed/s-a0-wake.png`: in the Turret bed, alarm ringing, keycaps, "E snooooze". The beats went alarm → snooze → stretch → up (`b2b.log`).

**b. Hat points** (15 points, 0.51 m apart in a 7 + 7 + 1 grid; positions from `docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json`):
- First morning: her plain hat lies on point 1 (`hatDown` = point 1's position) and `hatReserved` = `[0,1]`. It blocks points 1 **and 2**, because the 0.9 m reserve radius is wider than the 0.51 m spacing. So the first new hat (`helmet`) went to **point 3**, not point 1.
- After E at the helmet's point: the press picked up her **plain hat lying 1 m away**, not the helmet. `hatToTake` prefers her own lying hat within the rune radius under the layout. This may be intended; flagging it because the player is standing on the helmet.
- Hat button while wearing it: the hat goes down at her feet (point 3), and `hatReserved` = `[1,2,3]` (three points blocked by one hat). The next new hat (`healing`) took **point 1**, the lowest unblocked, and `harvest` took point 5. Correct by the rules.
- Every hat taken (`b2b.log` `b6_all`): floor = `healing,"",helmet,"",harvest,dowsing,…,edgeseer`, overflow = `["routeseer"]`. It queues; nothing stacks or vanishes.
- Overflow refill (`b2c.log`): after lifting the plain hat off point 1, `hatReserved` = `[]` and points 1 and 2 are empty, but `hatOverflow` stays `["routeseer"]` after more frames. The stored state isn't refilled until the next spawn or pickup calls `reconcileHatPoints`. The view's `hatsOnFloor` reconciles a copy, so the screen may show it filled before the save does. Not confirmed on screen.
- Screenshots: `ed/b1-two-hats.png`, `ed/b3-all-hats.png`, `ed/s-b-all-hats.png`, `ed/s2-b-hats-after-plain-lifted.png`. With all hats down they read as one tight cluster on the Cloakroom rug.

**c. Save/load** (`b2.log` `c_before`/`c_after`/`c_match`): floor, overflow and worn hat are identical after the reload (`{"floor":true,"overflow":true,"wear":true}`). Hats taken by `witch.take` are on loan, not in `witch.hats`, so a fresh night would have shown an empty floor. Getting them back confirms the night save restored them. Only one witch, so "owners" means witch 0's floor. Side note: `house.hatPointOrigin` stores the whole deck object (rooms, shape, stubs and so on, several KB) inside the night save, not just x and z (`ed/results.json` `a_wake`, and the first explore dump).

**d. DJ booth** (`b2d.log`): standing at the seat, E (held in real time) opens the booth with the button "Get this party started", which was disabled. `ed/s3-d0-at-decks.png`. The booth screenshot timed out. No record was chosen.

**e. Kitchen** (`b2b.log` `e_baskets`, `b2c.log` `e_baskets_rest`): baskets were stocked to 3 each with a debug write. Blue, purple, pink, red, orange and yellow each went from 3 to 2 and added an ingredient (up to 3 in the pot). Green, turquoise and white stayed at 3 with 0 ingredients: the pot was mid-brew/smoke. Screenshots: `ed/s3-room-kitchen.png`, `ed/e1-cauldron.png`, `ed/e3-basket-*.png`.

**f. Rooms** (`ed/rooms-sheet-A.png`: Turret, Bedroom, Boudoir, Parlour, Terrace, Dining, Kitchen; `ed/rooms-sheet-B.png`: Workshop, Cloakroom, Studio, Solarium, Bestiary, Bedroom 2, Bedroom 3; singles `ed/s3-room-*.png`):
- **Kitchen:** at the room's middle she stands on the cauldron's dark base, drawn in front of its lower half. It reads as her standing in the pot's footprint. Worth a look.
- **Bedroom 2 and Bedroom 3** (locked): the shot puts her at their middles, but no floor or furniture is drawn there (dark forest only). That's probably right for locked rooms; noting it in case they should show.
- Everything else looked ordered correctly: furniture behind her when it's behind, nothing floating.

### 3. Default game, `/?seed=123&quick=1&resume=1`
`default/default-sheet.png` (wake, hats, kitchen); `default/run.log`. She wakes in the bed with the snooze hint, and `take('hat','helmet')` worked. The kitchen draws the cauldron and the basket ring as before. There are no `mushroom-basket:*` house objects without the flag, which is expected: only `?layout=ed` adds them. No page errors.

## Not tested / limits
- DJ seat and landing after the party starts (the start button was disabled).
- Hat ownership with more than one witch (co-op).
- Whether the queued overflow hat appears on screen in a freed point before the next hat action.
- Timings are SwiftShader's; several real-time screenshots timed out at 60 s (`shotfail` lines in `ed/b2.log`). The stepped runs re-took them.
