# Playtest fixes, 31 Oct (Ed, 17:16 UTC)

Ed's six notes from play, sense-checked against the code by the coordinator and clarified with Ed one question at a time (17:20–17:35 UTC). Two slices, so two builders can work in parallel without touching the same files:

- **Slice A (rules):** items 1, 2, 5, 6.
- **Slice B (render):** items 3, 4.

Each item is small. Ship each slice as one PR: CI green, then the coordinator combines and publishes. Keep every number in `config/` as a tuning knob, not a literal.

## Slice A: rules

### 1. No inviting babies (Ed: "you shouldn't be able to invite wild babies, they get auto-invited when the area is soundsystemed anyway, and you can't pick them up before that")

- **Now:** `invitableNow` (`src/rules/creatureStates.ts:59-68`) excludes legends and bosses but not level 0. So a wild baby can be invited by 💌 (`affectionOf`, `src/rules/game.ts:413`) and by proximity talk (`src/rules/leash.ts:182-189`, "babies 3"). It then drops a rune (`hasRune`, `creatureStates.ts:87-93`), and the pickup goes through `sigilPress` / `inviteCreature(..., "picked")` (`leash.ts:377-391`).
- **Change:** **no baby is invitable**, the circle baby included (Ed: "No, no baby is invitable"). There is no 💌 meter, no talk, and no rune for any level-0 creature. Babies join only when their area is soundsystemed (`game.ts:867-868`, and the clearing path `stepClear` `game.ts:810-820`). **Check the circle baby is covered by that soundsystem befriending**: it keeps to its legend's circle (`keepsToCircle`, `src/rules/creatures.ts:353`). If it isn't covered, make it join at the same moment as its area's other babies. Remove the "so she can still invite it" wake reason (`game.ts:804`) or change it to match, and update the 💌 flow note (`docs/notes/gameplay.md:10`).
- **Keep:** quests that accept "any level animal" (`src/rules/quest.ts:3`) are unaffected, since quest delivery isn't an invite. Update `src/rules/babies.test.ts` and the `invites*` tests.

### 2. Pursuit until take-off (Ed: "pursue you until you next take off")

- **Now:** a single provoked creature gives up `combat.leaveArea` (30 m) past its area's edge (`pastEdge`, `src/rules/combat/targeting.ts:57-62`, `valid()` 84-96; `gaveUp` 73-78 → `c.retreat`). It already drops her when `!onGround`. Hunters (`src/rules/hunt.ts`: the whole area after its watch) hold while she's over the treetops above their area, resume on landing, and all give up when she leaves the area on foot or in the air.
- **Change, ordinary provoked pursuers:** drop `pastEdge`. They chase her **anywhere on the ground** until she next takes off (her mode leaves `"ground"`, `src/rules/witch.ts:11,114`). Taking off ends their pursuit; landing doesn't restart it.
- **Change, hunters (Ed's exact rule):** "Hunters should keep pursuing when you leave their area on the ground. Hunters should stop pursuing when you are outside their area in the air."
  1. She's on the ground anywhere, including outside their area: they keep hunting.
  2. She's in the air **over their area**: they hold and come on again when she lands (as today).
  3. She's in the air **outside their area**: the hunt ends for all of that area's hunters. They walk home as ordinary wild creatures, and the area's watch plays again on her next visit, as today.
- **Keep:** the other hunt endings (invite, enrage/knock-down/run off, gone, knocked out), and the Stealth broom's lose-range rule (`targeting.ts:89`). Update the 7 Oct header in `hunt.ts`, `docs/notes/gameplay.md:31`, and the tests that pin `leaveArea`. Leave the `combat.leaveArea` knob in place if something else reads it, otherwise remove it.

### 5. Winning the night (Ed: "only legends whose quest you have completed should go to the dancefloor. The rest should sleep in their circle")

- **Now:** `win()` (`src/rules/win.ts:244-275`) sends every dealt legend that isn't angry or enraged to the dancefloor (`legendPlaces`, line 230) as a happy `partyLegend`. Angry and enraged ones are `lull`ed to sleep (line 256).
- **Change:** only legends with `c.quest.done` (`quest.ts:14,112`) go to the dancefloor. Every other legend is `lull`ed (`src/rules/legends.ts:224-228`) to sleep in its circle, whether asleep, awake, angry or enraged. Update the 11 Oct header comment (`win.ts:11-13`) and the win tests.

### 6. Friendly legends (Ed's three-step rule)

- **Now:** `stepLegendAttack` (`src/rules/combat/legend.ts:16-75`): a happy legend never leaves its area. Every 15 s it attacks up to 3 nearest **enraged** creatures within `legends.happyRange` 420 m (`config/tuning.json:1431`). Chargers charge and return to their lair.
- **Change.** Each decision, in this order:
  1. **Defend:** if she's being attacked (a creature has her as its target, or is hunting her) and she's within the legend's range, it targets the creatures attacking her.
  2. **Engage:** otherwise, if enemy creatures (enraged creatures, plus wild creatures currently targeting or hunting a witch) are within its range, it stops and attacks them.
  3. **Walk the route:** otherwise it walks to the nearest point on tonight's route (`src/rules/leyroute.ts`, `routeOf` `src/rules/party.ts:417`), then along it **towards the ley line's drawing tip** (Ed's choice: the growing front, `leyReachTimes` / `TIP_PACE`, `src/rules/leypulse.ts:144-160`). It stops at the tip and keeps up as the tip moves.
- **Range:** Ed asked for "about the average radius of an area". An area is `areaSize` 28 × `areaScale` 6 = 168 m across, so use **85 m**, as a new knob (for example `legends.friendRange`; retire `happyRange` 420 if nothing else uses it). One range serves both "she's in its range" and "enemies within its range".
- **Keep:** the attack kinds themselves (windup, lob/beam, `config/legends.json:32-54`). Chargers can keep their charge but don't return to the lair; they resume the route. Party legends (`leash.ts:350`) are unchanged. Make sure friendly legends walking the route can't be pursued, provoked or invited.
- **Tests:** a scripted night for each branch (defend, engage, walk), the 85 m boundary, and the order of priority.

## Slice B: render

### 3. Chains and travel paths (Ed: "make the path look like the chain, and the transition between path and chain should be smooth (chain falls to the ground and becomes a path), and the path should lift from the ground and connect to the sigil stack like a chain when close to the witch")

- **Now:** at more than 84 m (`posse` 60 × `leave` 1.4, `config/travel.json`; `updateMode`, `src/rules/travel.ts:42-55`) outside its sigil's area, or whenever she's in the air, a leashed creature travels. Its chain is deleted and a dotted ground path is drawn instead (`src/render/leash/stack.ts:146-163`; chain drawing in `stack.ts:168-178`, `src/render/leash/chain.ts:50,115`). This was Ed's own 5 Oct idea, kept, but now made to look continuous.
- **Change:**
  1. The travel path is drawn **as chain links lying on the ground** (same link art and colour as the chain), not dots.
  2. When travel starts, the chain **falls to the ground and becomes the path**: the links drop over a short animation (about 0.5 s, a knob), no pop.
  3. When she's close (the rejoin distance, 60 m, or as the creature arrives), the part of the path nearest her **lifts off the ground and connects to her sigil stack like a chain**, again smoothly.
  4. Babies still have no chains (`stack.ts:127`).
- **Don't change** when travel starts or ends (that's rules). This is drawing only. Provide before/after frames (chain → falling → path → lifting → chain) via the coordinator's cloud capture: post the driver with your REPORT.

### 4. Mushroom glow (Ed: "mushrooms should glow more strongly in their colour")

- **Now:** `src/render/mushrooms.ts` `glowGain` 2.4 (line 35), patch `glow` .5 (line 42), spore puffs .25 (line 54). The subtractive halo (`src/render/mushroomGlow.ts`) has alpha `.40*edge*centre` (line 44) in the complement colour, `white` .18, radius `max(2, h*1.05)`. Only the spots emit (`M.GLOW` / `M.MAGIC2`, `art/mushrooms.js:165`).
- **Change:** a stronger glow **in each mushroom's own colour**: brighter emissive spots and a stronger, more saturated coloured halo/pool, not whiter. Make the strengths knobs in `config/` (there are none today). Start at about 2× and show Ed before/after frames at night (three mushroom colours, near and far) via the coordinator's cloud capture. Ed picks the strength.
- **Keep:** the 150 m draw range, and the art bytes unless a pin needs updating (prove size/glow-only as usual).

## For both slices

- Branch from the latest `claude/prototype` (v6628). Your own branch and draft PR, with `REPORT:`/`QUESTION:`/`FINAL:` comments.
- `node tools/config/check.mjs` and nearby tests one-worker, then CI green on the exact head.
- No laptop browser. The coordinator runs cloud captures and releases.

# Addendum: stumps and the home legend (Ed, 17:47 and 17:52 UTC)

Sense-checked against the code by the coordinator. Ed's words are quoted; his new rules replace the earlier ones named below. Items 7–9 go to slice B (render, #1554 builder), item 10 to slice A (rules, #1552 builder) after its current items, unless root assigns another builder.

### 7. Stump sigil stacks: hostiles only, then everyone (Ed: "in wild areas, I think they should only show the hostile creatures (no legends, no babies, no happy animals); when there are no more hostile creatures, then all of the area creatures show above the stump (all levels)")

- **Now:** `stoneStack` (`src/rules/stoneStacks.ts:87-96`, filter `inStack` :70) shows every rank, including the legend (`legend: !!c.boss`), all babies (the circle baby too) and invited "friend" creatures. `stackOrder` (:82) puts enemies at the bottom and friends above. Drawing is in `src/render/leash/stones.ts:108-115`.
- **Change:** while the wild area still has any hostile creature (wild, not invited, level > 0, not the legend), the stack shows **only those hostile creatures**: no legend, no babies, no happy or invited animals. Once none are left, the stack shows **all of the area's creatures, every level** (legend, adults, youths, babies, the circle baby), in the existing order (Ed 28–29 Oct: babies on top, legend lowest). The leashed/dropped/gone exclusions stay.
- After a cast or wave converts the area, it empties and scatters as today (`stoneOpen`, `friendSigils`).

### 8. Soundsystem spell icon visible from any distance once the area is clear (Ed: "The soundsystem spell icon on the stump should be visible from all distances once there are no hostile creatures")

- **Now:** the 🎶 (`src/render/leash/stones.ts:116-127`) shows only when `castReady`, and in stump mode only as she reaches the cut (`pastCasting`, `stoneStacks.ts:111-121`; Ed 28 Oct "visible only as you enter the clearing… disappears as you leave"). The stack column itself only draws within 90 m (`STONES_DEFAULT` range 90/fade 20; `home.ts:111-113`).
- **Change (replaces Ed's 28 Oct rule):** when `castReady`, the 🎶 shows on the stump **at any distance**, with no distance fade or cut. It shows whenever the stump is on screen, including beyond the 90 m stack range, so the icon is drawn even where the stack isn't. Keep it readable at distance (a minimum on-screen size). **Casting itself is unchanged:** she still casts on the stump (`castShown` / the cast ring within `cast.show` 6 m).

### 9. Stumps not drawn (Ed: "Stumps seem to not be drawn anymore")

- **Unknown cause.** No commit since 29 Oct touched `src/render/view/home.ts` `drawMarkers` (:176-194), `src/render/island.ts`, `src/render/markers.ts` or `art/props/stumps.js`. Suspects:
  1. The 30 Oct shader draw gate / limited landing (`src/render/shaderDrawGate.ts:13-28`, commits 6c4873df4 and 64c95a287). Stump `SpriteBatch`es are created lazily after `compileAll`, and the gate skips any material whose program isn't ready while `shaderDrawStatus.active`.
  2. Stump art (`AssetLibrary.stumpArt`, `src/render/assets.ts:683`) dropped on `reseat` (:727-737) and never re-requested.
  3. `runeMarkers.stump.on` (on in tuning).
- **Do:** reproduce first. The coordinator can run a cloud check: provide a tiny driver that loads `?seed=123`, walks or shots to a wild area, and reports `shaderDrawStatus.skipped` labels, stump batch counts and whether stump art arrived. Then fix the root cause and add a regression test. Don't fix it blind.

### 10. The home legend (Ed: "At the moment we draw the legend of the island you're on by the treehouse. Remove this. Instead, the legend whose island you're on is a friendly legend of its type that spawns in your home area. It targets enraged creatures, and any creature that is targeting you if it can target it without leaving the home area." and "The home legend does not target creatures of its own type, as normal")

- **Remove** the treehouse carrier: `carrierOf` (`src/rules/treehouse.ts:111-117`), baked in `entTreehouseSprites` (`src/render/homeArt.ts:160-180`), placed in `home.ts:427-440`, knob `treehouse.carrier: "island"` (Ed 10 Oct). The Ent/oak then has no carrier.
- **Spawn** one **friendly legend of the island's own kind** (`map.island.kind`; the home area type gives the wrong species) in the home area (`homeArea(map)`, `src/rules/homeArea.ts:12-33`). Today `spawnCreatures` skips home (`src/rules/creatures.ts:403-434`; Ed 5 Oct "Home area shouldn't have a legend", now replaced for this one legend). Make it happy, give it a lair in the home area and no quest, and mark it (for example `homeGuard`). On the home island (no island kind) there is none.
- **Behaviour:** it **never leaves the home area**: it roams or stands there. It targets (a) enraged creatures and (b) any creature targeting her, **only if it can attack them without leaving the home area** (its normal attack reach from inside the home area; use the same range knob as item 6). It **never targets its own kind** (the normal legend rule). It's exempt from item 6's route walking.
- **Exclude it from:** the win (`src/rules/win.ts:244-275`): it doesn't go to the dancefloor. Also dealt legends, quests, invites/💌, partyEgg, `hasKin`, stacks (item 7) and the legend count.
- **Tests:** spawn per island kind, none on the home island, the targeting gates (enraged / attacking her / inside-area reach / own kind), never leaving the home area, and the exclusions.

# Addendum 2: pause menu (Ed, 18:08 UTC, with a screenshot at 18:25)

Slice C (UI, small). Root assigns a builder; if none is free, it goes to slice B after items 7–9. **"The pause menu" here is the pause test-sliders panel** (`#pause-sliders`, `src/ui/decide.ts`): the left column with ⚙ Show settings page, Copy values, Download log, …, Fight arena, Potion lab, then the Quality box. Ed's screenshot shows that panel.

### 11. "Load latest version" in the pause menu (Ed: "Can we put the 'load to latest version' button in the pause menu")

- **Now:** `NewBuildNotice` (`src/app/newBuild.ts`; Ed 14 Oct) checks `version.json` on load, on pausing and every 5 minutes. While a newer build is up, it shows the separate `#new-build` notice with a reload button in the bedroom and on the pause page (`main.ts:675-677`). That's not part of the pause panel's button list, so it's easy to miss.
- **Change:** add a **"⟳ Load latest version (vNNNN)"** button to the pause panel's button list in `src/ui/decide.ts`, in the same `copyall` style as the others, near the top, after ⚙ Show settings page. Add it as an optional `DecideHost` hook (for example `newBuild?: { latest(): string | null; load(): void }`, wired in `main.ts` from `newBuild`). It appears only while a newer build is out, and choosing it reloads the page (`location.reload()`; check that a reload mid-night loses nothing it wouldn't on an ordinary refresh). Keep the bedroom notice. Remove the floating pause-page copy if it now duplicates the button. Test: present only when newer, the label shows the version, the click reloads.

### 12. Quality dropdown spills out of its card (Ed's screenshot, 18:25: the Quality select runs ~120 px past the panel's right edge)

- **Where:** the pause panel's Quality box, `src/ui/decide.ts:153-156` (`#pause-sliders .quality .qrow` flex row; `select { flex: 1; … }`). The panel is 280 px wide (`:157`).
- **Cause:** the select has `flex: 1` but no `min-width: 0`, so its intrinsic width (the longest option label, for example a pinned rung's name) pushes it past the row.
- **Fix:** `min-width: 0` (and `max-width: 100%`) on the select (and `min-width: 0` on `.qrow` if needed), so it shrinks to the box and the option text truncates inside the closed select. Check the other selects in the panel the same way. Before/after screenshot in your REPORT.
