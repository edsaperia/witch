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
