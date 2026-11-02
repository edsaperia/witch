# Semantic review membership and rulings

Core-file format preview only; the rest of the audit remains in progress. Each group lists source declarations, not expanded executions. Durations use the sum of unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.

<a id="s1"></a>

## S1: Slot migration and isolation

hard limits; 12 declarations; ~0 s of CI.

In-memory stores exercise exact byte preservation, corrupt indexes, independent controls, cross-tab metadata and flush-before-reload; no emergent outcome target.

- [src/app/saveSlots.test.ts:30](../../src/app/saveSlots.test.ts#L30): preserves all legacy progress/settings bytes in the first slot and never deletes originals
- [src/app/saveSlots.test.ts:40](../../src/app/saveSlots.test.ts#L40): isolates new slots, persists last-used selection, and keeps night paths separate
- [src/app/saveSlots.test.ts:55](../../src/app/saveSlots.test.ts#L55): a corrupt slot's bytes cannot block another slot
- [src/app/saveSlots.test.ts:62](../../src/app/saveSlots.test.ts#L62): does not mark incomplete migration complete and retains failed writes for this page
- [src/app/saveSlots.test.ts:74](../../src/app/saveSlots.test.ts#L74): does not complete migration after a failed legacy read
- [src/app/saveSlots.test.ts:81](../../src/app/saveSlots.test.ts#L81): refuses a reload selection when persistence fails
- [src/app/saveSlots.test.ts:86](../../src/app/saveSlots.test.ts#L86): leaves device diagnostics shared and exposes only copies of slot metadata
- [src/app/saveSlots.test.ts:95](../../src/app/saveSlots.test.ts#L95): reloads controls from the selected slot without changing the first slot's remap
- [src/app/saveSlots.test.ts:105](../../src/app/saveSlots.test.ts#L105): waits for the outgoing night before selection/reload and leaves a failed write open
- [src/app/saveSlots.test.ts:115](../../src/app/saveSlots.test.ts#L115): pins the outgoing storage adapter even after the last-used choice changes
- [src/app/saveSlots.test.ts:121](../../src/app/saveSlots.test.ts#L121): keeps newer slot bytes and a damaged index instead of rolling back to legacy data
- [src/app/saveSlots.test.ts:132](../../src/app/saveSlots.test.ts#L132): keeps other tabs' slots and last-used selection when an older tab saves metadata

<a id="s2"></a>

## S2: Snapshot integrity and format guards

hard limits; 8 declarations; ~32 s of CI.

The generated world is input to a before/after equality proof, not a win/count target. The 4 MB size ceiling is a hard budget. Hash guards also retain the old v1 contract alongside the additive mushroom migration.

- [src/app/saveFormat.test.ts:37](../../src/app/saveFormat.test.ts#L37): requires an explicit envelope-format review when SavedNight changes
- [src/app/saveFormat.test.ts:40](../../src/app/saveFormat.test.ts#L40): requires an explicit rules-format review when Game or the graph format changes
- [src/rules/nightSnapshot.test.ts:18](../../src/rules/nightSnapshot.test.ts#L18): migrates older nights without mushroom state and preserves new brewing snapshots exactly
- [src/rules/nightSnapshot.test.ts:30](../../src/rules/nightSnapshot.test.ts#L30): keeps seeded streams at their cursor without changing the existing generator
- [src/rules/nightSnapshot.test.ts:36](../../src/rules/nightSnapshot.test.ts#L36): roundtrips a played night, its maps, sets, typed buffers, shared references and infinities
- [src/rules/nightSnapshot.test.ts:64](../../src/rules/nightSnapshot.test.ts#L64): continues the same simulation, including RNG, after later waves and a knockout
- [src/rules/nightSnapshot.test.ts:79](../../src/rules/nightSnapshot.test.ts#L79): rejects incompatible, incomplete, executable and malformed saves
- [src/rules/nightSnapshot.test.ts:95](../../src/rules/nightSnapshot.test.ts#L95): measures home and a later island's snapshot budget

<a id="s3"></a>

## S3: Solo autosave eligibility and identity

hard limits; 10 declarations; ~4 s of CI.

Synthetic storage proves ordering and failure behavior. The stepped wake-up fixture checks an explicit save gate, not how quickly an uncontrolled night succeeds. Telephone and borrowed-visit cases are left to #1609.

- [src/app/nightSave.test.ts:20](../../src/app/nightSave.test.ts#L20): keeps an explicit-link conflict distinct and supplies a one-click link to the retained save
- [src/app/nightSave.test.ts:32](../../src/app/nightSave.test.ts#L32): accepts a build-counter jump under the cross-build save contract
- [src/app/nightSave.test.ts:66](../../src/app/nightSave.test.ts#L66): restores an actual captured game across build numbers while rejecting unknown formats
- [src/app/nightSave.test.ts:77](../../src/app/nightSave.test.ts#L77): doesn't offer a new night until she gets out of bed, even with the loading card hidden
- [src/app/nightSave.test.ts:100](../../src/app/nightSave.test.ts#L100): keeps format and explicit night identity across builds; a plain game link can resume a later island
- [src/app/nightSave.test.ts:116](../../src/app/nightSave.test.ts#L116): leaves bots, debug links and automation isolated unless resume is explicitly enabled
- [src/app/nightSave.test.ts:123](../../src/app/nightSave.test.ts#L123): throttles periodic saves, forces a final checkpoint, and clears an ended night
- [src/app/nightSave.test.ts:132](../../src/app/nightSave.test.ts#L132): doesn't overlap writes and reports a failed write without throwing into play
- [src/app/nightSave.test.ts:142](../../src/app/nightSave.test.ts#L142): doesn't create a checkpoint while no playable night is active
- [src/app/nightSave.test.ts:146](../../src/app/nightSave.test.ts#L146): flush waits for an active checkpoint then writes the latest state before a slot exit

<a id="s4"></a>

## S4: Equipment saves and compatibility migrations

current rules; 13 declarations; ~0 s of CI.

Old broom spells and the broomBay name occur as migration inputs: assertions require the current Classic broom/lathe result. They do not restore obsolete gameplay. Records explicitly require the 29 Oct 100/120 BPM starters.

- [src/app/broomSave.test.ts:11](../../src/app/broomSave.test.ts#L11): a first game's: no parts found, a bare broom
- [src/app/broomSave.test.ts:16](../../src/app/broomSave.test.ts#L16): a part found is kept (even if the night's then lost: saved the moment she picks it up), not fitted: the bay fits it
- [src/app/broomSave.test.ts:28](../../src/app/broomSave.test.ts#L28): the bay keeps only parts she's found (a ?parts= broom fitted for a load isn't saved)
- [src/app/broomSave.test.ts:34](../../src/app/broomSave.test.ts#L34): fits only parts she has found, each in its own slot; unknown ones dropped
- [src/app/broomSave.test.ts:44](../../src/app/broomSave.test.ts#L44): an old save's broom shape goes back to the Classic look (its colours and fit kept) and its broom spell is dropped, once
- [src/app/broomSave.test.ts:60](../../src/app/broomSave.test.ts#L60): a fresh browser: nothing to change
- [src/app/guideSave.test.ts:7](../../src/app/guideSave.test.ts#L7): keeps the new things (one an item, newest last) and the islands seen; drops a thing gone, and anything unreadable
- [src/app/hatSave.test.ts:8](../../src/app/hatSave.test.ts#L8): keeps a newly found hat in this page when storage refuses the write
- [src/app/hatSave.test.ts:19](../../src/app/hatSave.test.ts#L19): start with none found, keep what she finds, and ignore what isn't a hat to find
- [src/app/hatSave.test.ts:28](../../src/app/hatSave.test.ts#L28): as this load's tuning: her save, ?hats=all or a list for one load, and a ?hat= worn counted as hers
- [src/app/recordSave.test.ts:12](../../src/app/recordSave.test.ts#L12): are every 10 bpm from 100 to 200 (Ed, 2026-10-29: "full set from 100 to 200, but only every 10 bpm"); she starts with 100 and 120, the other 9 are finds
- [src/app/recordSave.test.ts:18](../../src/app/recordSave.test.ts#L18): keeps the starting ones always, adds and drops finds, remembers the last chosen while she has it
- [src/app/recordSave.test.ts:28](../../src/app/recordSave.test.ts#L28): with Unlock everything on, offers every record, writing nothing

<a id="s5"></a>

## S5: Campaign progress and personal settings

current rules; 21 declarations; ~0 s of CI.

Won/lost results are supplied directly; no night is simulated to obtain them. Settings use synthetic stores and cloned tuning to test migration, accessibility flags and noncompounding volume.

- [src/app/chartSave.test.ts:11](../../src/app/chartSave.test.ts#L11): starts with home alone unlocked
- [src/app/chartSave.test.ts:17](../../src/app/chartSave.test.ts#L17): unlocks the islands of the legends a won night woke, each with its voyage from where she set out; a lost night only plays
- [src/app/chartSave.test.ts:33](../../src/app/chartSave.test.ts#L33): keeps it in the browser, forgets it on Start over, and survives bad or blocked storage
- [src/app/chartSave.test.ts:47](../../src/app/chartSave.test.ts#L47): opens the whole chart for ?chart=all
- [src/app/chartSave.test.ts:57](../../src/app/chartSave.test.ts#L57): keeps the campaign's world seed (0 with no save: the first world); Start over begins a new world, typed or random
- [src/app/chartSave.test.ts:75](../../src/app/chartSave.test.ts#L75): sailing off from the treehouse's map table mid-night ends the night unwon, as a loss; once the night's over, it's already recorded (Ed, 2026-10-11: "Sail anytime")
- [src/app/chartSave.test.ts:85](../../src/app/chartSave.test.ts#L85): knows the islands she's found and not been to: found, no night played there, not where she is (Ed, 2026-10-26)
- [src/app/playerSettings.test.ts:13](../../src/app/playerSettings.test.ts#L13): defaults rumble on for older saves and remembers it off
- [src/app/playerSettings.test.ts:19](../../src/app/playerSettings.test.ts#L19): is the defaults on a new browser
- [src/app/playerSettings.test.ts:20](../../src/app/playerSettings.test.ts#L20): comes back as saved
- [src/app/playerSettings.test.ts:25](../../src/app/playerSettings.test.ts#L25): carries over today's saved volumes and screen shake the first time, not after
- [src/app/playerSettings.test.ts:32](../../src/app/playerSettings.test.ts#L32): keeps the start screen's shake in step (witch.shake)
- [src/app/playerSettings.test.ts:35](../../src/app/playerSettings.test.ts#L35): throws nothing away but what's wrong: bad values are their defaults
- [src/app/playerSettings.test.ts:39](../../src/app/playerSettings.test.ts#L39): works with no storage, or one that refuses
- [src/app/playerSettings.test.ts:49](../../src/app/playerSettings.test.ts#L49): keeps original settings levels across a saved night, including disabled shake/flash and quieter voices
- [src/app/playerSettings.test.ts:60](../../src/app/playerSettings.test.ts#L60): sets the volumes, master times each
- [src/app/playerSettings.test.ts:66](../../src/app/playerSettings.test.ts#L66): scales every babbling voice from its built level, never compounding
- [src/app/playerSettings.test.ts:73](../../src/app/playerSettings.test.ts#L73): turns the legends' quake shake off and back on, and a legend's flash off with reduce flashing
- [src/app/playerSettings.test.ts:80](../../src/app/playerSettings.test.ts#L80): maps quality onto the ladder: auto, full, the middle rung, the top
- [src/app/playerSettings.test.ts:83](../../src/app/playerSettings.test.ts#L83): names a pad's glyphs from its name unless forced
- [src/app/playerSettings.test.ts:92](../../src/app/playerSettings.test.ts#L92): move the settings with them (over master), so the next night keeps them

## saves-replay-robustness: ruling review

- Current slot ruling: Ed, 2026-10-30, docs/notes/save-slots.md: ‘save slots that hold progress and settings’ and ‘By default open the previous one’. S1 directly tests this; the old single-save bytes remain migration input, not an obsolete rule to delete.
- Supersession checked: src/app/broomSave.test.ts describes ‘migration from the brooms before parts’; docs/notes/house.md records the 23 Oct Workshop/parts design. The test asserts Classic shape, retained colours and removal of the old spell. No positive old-broom gameplay assertion was found in S4.
- Current compatibility contract: docs/notes/save-slots.md ‘accept matching SavedNight/NightSnapshot format versions across build numbers’. S2/S3 assert that behavior; the v5955/v6322 names are compatibility examples, not version gates.

<a id="l1"></a>

## L1: Paired-area ownership and sleeping placement

hard limits; 9 declarations; ~49 s of CI.

Generated maps are checked for logical relationships and rejection of unrelated ownership. The short sleep steps preserve those relationships; they are not survival statistics.

- [src/rules/legendAreas.test.ts:29](../../src/rules/legendAreas.test.ts#L29): `each of the night's legends lies in an area of its own beside one of its kind, off the route (${kind} island, seed ${seed})`
- [src/rules/legendAreas.test.ts:63](../../src/rules/legendAreas.test.ts#L63): holds even the biggest legends asleep: every legend in a legend area fits its circle with its margin, or has the most its area held
- [src/rules/legendAreas.test.ts:77](../../src/rules/legendAreas.test.ts#L77): shows no border inside a pair: the legend area wears its pair's look everywhere, so the area blend has nothing to blend there
- [src/rules/legendAreas.test.ts:92](../../src/rules/legendAreas.test.ts#L92): counts a legend area and its pair as one area: a point in either is in the pair's area, and the legend's cell is its pair's
- [src/rules/legendAreas.test.ts:110](../../src/rules/legendAreas.test.ts#L110): wild creatures defend the pair as one: one of the pair's chases her on into its legend area, and gives up only past its far edge
- [src/rules/legendAreas.test.ts:123](../../src/rules/legendAreas.test.ts#L123): a legend's rage counts the pair as one: its kin parked by sigil in its legend area keep it calm
- [src/rules/legendAreas.test.ts:141](../../src/rules/legendAreas.test.ts#L141): partifies a pair together: its legend area is partified with it, drawn as a zone of its own, and the party border runs round the outside of the pair
- [src/rules/sleepCells.test.ts:24](../../src/rules/sleepCells.test.ts#L24): preserves $name ownership from initial placement through both sleep states
- [src/rules/sleepCells.test.ts:51](../../src/rules/sleepCells.test.ts#L51): rejects an unrelated area even for a boss, and rejects a non-circle wild creature in a paired legend area

<a id="l2"></a>

## L2: Circle geometry and explanation contracts

current rules; 7 declarations; ~17 s of CI.

These compare geometry to the configured cap/margin and lookup to an exhaustive oracle. Coverage counts ensure the fixture visits circles; they are not measured gameplay success rates.

- [src/rules/legendCircle.test.ts:16](../../src/rules/legendCircle.test.ts#L16): skips only legends too far for their circle: the same answers as searching every legend's clearing
- [src/rules/legendCircle.test.ts:38](../../src/rules/legendCircle.test.ts#L38): shows on the ground inside the clearing only, fading in on entering and out on leaving
- [src/rules/legendCircle.test.ts:61](../../src/rules/legendCircle.test.ts#L61): shows for a legend in any state, and says what its state means, in Ed's plain words (2026-10-19)
- [src/rules/legendCircle.test.ts:82](../../src/rules/legendCircle.test.ts#L82): asks for its kind with no age and names no boon (Ed, 2026-10-18)
- [src/rules/legendFit.test.ts:13](../../src/rules/legendFit.test.ts#L13): has every area's creature measured (config/legend-footprints.json: node tools/legends/footprint.mjs)
- [src/rules/legendFit.test.ts:16](../../src/rules/legendFit.test.ts#L16): never makes a circle smaller than it was, nor bigger than the cap
- [src/rules/legendFit.test.ts:23](../../src/rules/legendFit.test.ts#L23): fits every legend that can fit under the cap, with its margin to spare, as the map places its circle

<a id="l3"></a>

## L3: Timed travel and generated scenery statistics

outcome stats; 6 declarations; ~33 s of CI.

Assertions include baby return within 20 s; following beyond circle+10 m after 25 s; a 150 s siege-to-rage scenario; grove mean >0.6/<0.08; rim/south coverage >80%; runestone-gap exceptions <1.5%. Mixed safety/rule assertions need extraction before any move, not deletion of the whole file.

- [src/rules/legendClearing.test.ts:50](../../src/rules/legendClearing.test.ts#L50): each holds a wild baby of its legend's kind, which keeps to the circle, comes back in if pushed out, and is free only while leashed
- [src/rules/legendClearing.test.ts:81](../../src/rules/legendClearing.test.ts#L81): its befriended baby stays in the circle and dances there; only loose-sigil pickup makes it follow her
- [src/rules/legendClearing.test.ts:111](../../src/rules/legendClearing.test.ts#L111): a fallen soundsystem's babies run off home and its besiegers march on: its legend, left without kin, grows restless, then angry
- [src/rules/legendClearing.test.ts:158](../../src/rules/legendClearing.test.ts#L158): each swells the forest round it, strongest at its edge and easing smoothly out into the area's own, all the way round
- [src/rules/legendClearing.test.ts:186](../../src/rules/legendClearing.test.ts#L186): each is edged by the rim kit: small pieces just past its floor, all the way round
- [src/rules/legendClearing.test.ts:206](../../src/rules/legendClearing.test.ts#L206): each keeps its edge minFromStone metres from its area's runestone, but in a sliver of an area too small to (the farthest it fits)

<a id="l4"></a>

## L4: Retained radius-map comparison settings

leftovers; 2 declarations; ~14 s of CI.

The default assertion already requires 0.2. Half, 0.3 and 1 are explicit overrides for the retained radius-map selector; its header says authored islands deal their own legends. This is old-mode coverage, not evidence the default still uses the superseded half-share rule.

- [src/rules/legendShare.test.ts:21](../../src/rules/legendShare.test.ts#L21): puts one in legends.share of the areas (Ed, 2026-10-08: about a fifth), never home, seeded, spread so they don't clump
- [src/rules/legendShare.test.ts:41](../../src/rules/legendShare.test.ts#L41): puts one in every area but home at 1, and differs by seed

<a id="l5"></a>

## L5: Pinned list of giants exceeding the old circle cap

leftovers; 1 declarations; ~4 s of CI.

The assertion pins an exact species list and its comment says ‘waiting on Ed's call’. The 26 Oct paired-area/fit design permits the biggest fitting circle and documented elephant exceptions. This needs a current design ruling; it is a stale-looking baseline, not a proven obsolete test.

- [src/rules/legendFit.test.ts:34](../../src/rules/legendFit.test.ts#L34): lists the legends too big for any circle under the cap (waiting on Ed's call: drawn smaller asleep, or the circles allowed bigger)

## legends: ruling review

- Supersession matched to L1: docs/notes/testing.md records the old diagnostic ‘incorrectly required physical cell equality’. Ed's 2026-10-26 replacement: paired areas are ‘one logical area’. sleepCells.test.ts now permits 14 raw differences on the largest fixture but requires zero logical mismatches. Keep the replacement regression; no remaining equality assertion in this reviewed group needs deleting.
- Supersession matched to L4: Ed, 2026-10-06, DESIGN.md: ‘about half of areas’; Ed, 2026-10-08: ‘more like 1/5’. legendShare.test.ts asserts S===0.2 before explicitly constructing half/all comparison maps. Both rulings are accounted for; the old citation alone is not an obsolete default.
- Current sizing ruling, L2/L5: Ed, 2026-10-26, legendFit.test.ts: ‘Legend circles need to be larger. Often legends don't fit in them.’ legendAreas.test.ts checks the authored paired areas, allowing only elephant overflow in its five-map matrix. The exact eleven-giant radius-cap list needs a separate ruling, not an assumed deletion.

