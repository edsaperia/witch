# Semantic review membership and rulings

Core-file format preview only; the rest of the audit remains in progress. Each group lists source declarations, not expanded executions. Durations use the sum of unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.

<a id="s1"></a>

## S1: Slot migration and isolation

hard limits; 14 declarations; ~0 s of CI.

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
- [src/ui/settingsSaves.test.ts:12](../../src/ui/settingsSaves.test.ts#L12): lists the active save with island/night/date summary and a new-save action
- [src/ui/settingsSaves.test.ts:18](../../src/ui/settingsSaves.test.ts#L18): opens new/different slots through the host and does not restart the current slot

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

<a id="s6"></a>

## S6: Recorded inputs and retained playtest reports

hard limits; 18 declarations; ~97 s of CI.

Controlled inputs and fake timers prove identical replay, refusal of undeclared divergence, bounded tape/journal storage and exact retention of report text after attachment pressure or transaction failure. The long paused tape and synthetic 16–18 MiB bundles exercise explicit integrity/budget boundaries, not success statistics. The 600-second paused loop advances fake time; no real ten-minute run is needed.

- [src/app/playtestComments.test.ts:25](../../src/app/playtestComments.test.ts#L25): roundtrips the actual played moment and continues from the same random/state cursor
- [src/app/playtestComments.test.ts:42](../../src/app/playtestComments.test.ts#L42): rejects oversized, malformed and wrong-build bundles instead of restoring an approximate link
- [src/app/playtestComments.test.ts:51](../../src/app/playtestComments.test.ts#L51): keeps every report across count pressure and reload; unread storage is never overwritten
- [src/app/playtestComments.test.ts:69](../../src/app/playtestComments.test.ts#L69): preserves legacy report text through production-sized duplicated replay pressure, reload and both exports
- [src/app/playtestComments.test.ts:100](../../src/app/playtestComments.test.ts#L100): migrates v1 packed comments and retains oversized moments as written reports
- [src/app/playtestComments.test.ts:111](../../src/app/playtestComments.test.ts#L111): commits text before attachments, exposes a real attachment-write error and reloads every word
- [src/app/playtestComments.test.ts:143](../../src/app/playtestComments.test.ts#L143): copies only the recent 30 seconds and caps a noisy breadcrumb stream
- [src/app/recordingHooks.test.ts:20](../../src/app/recordingHooks.test.ts#L20): the page hooks keep both players, explicit mutation boundaries and a comment replay to the saved state
- [src/app/recordingHooks.test.ts:35](../../src/app/recordingHooks.test.ts#L35): a diagnostic starting-save failure cannot prevent or duplicate the original simulation step
- [src/platform/inputRecording.test.ts:18](../../src/platform/inputRecording.test.ts#L18): keeps a ten-minute paused tape exact without expanding paused frames into the crash journal
- [src/platform/inputRecording.test.ts:52](../../src/platform/inputRecording.test.ts#L52): records a scripted fractional-frame run, retains local aim/zoom/framing, and replays to the identical paused moment
- [src/platform/inputRecording.test.ts:76](../../src/platform/inputRecording.test.ts#L76): rejects divergence before a labelled checkpoint instead of using it to repair the replay
- [src/platform/inputRecording.test.ts:82](../../src/platform/inputRecording.test.ts#L82): rejects executable/nested controls without changing the wire default or normalizing local aim
- [src/platform/inputRecording.test.ts:87](../../src/platform/inputRecording.test.ts#L87): replays the intro seat ease-off and changing camera anchors without render-path world snapshots
- [src/platform/inputRecording.test.ts:123](../../src/platform/inputRecording.test.ts#L123): retains unchanged frames without hot-path serialization/cloning, drains bounded journal batches and exports the exact ordered stream
- [src/platform/inputRecording.test.ts:151](../../src/platform/inputRecording.test.ts#L151): still enforces the raw expanded byte/event cap when a long unchanged run is compact in memory
- [src/platform/inputRecording.test.ts:162](../../src/platform/inputRecording.test.ts#L162): keeps deferred records owned by their original game after another night can become current
- [src/platform/inputRecording.test.ts:175](../../src/platform/inputRecording.test.ts#L175): labels an explicitly disabled profile tape incomplete and preserves its simulation actions without journal writes

## saves-replay-robustness: ruling review

- Current slot ruling: Ed, 2026-10-30, docs/notes/save-slots.md: ‘save slots that hold progress and settings’ and ‘By default open the previous one’. S1 directly tests this; the old single-save bytes remain migration input, not an obsolete rule to delete.
- Supersession checked: src/app/broomSave.test.ts describes ‘migration from the brooms before parts’; docs/notes/house.md records the 23 Oct Workshop/parts design. The test asserts Classic shape, retained colours and removal of the old spell. No positive old-broom gameplay assertion was found in S4.
- Current compatibility contract: docs/notes/save-slots.md ‘accept matching SavedNight/NightSnapshot format versions across build numbers’. S2/S3 assert that behavior; the v5955/v6322 names are compatibility examples, not version gates.
- Report retention: playtestComments.test.ts keeps report text under attachment/count pressure and preserves unread storage. Its historical build equality is deliberately stricter than ordinary cross-build night saves: docs/notes/save-slots.md says comment restore retains separate staging and recording/build checks. No supersession of that diagnostic replay contract was found in these reviewed files.

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

current rules; 9 declarations; ~50 s of CI.

These compare geometry to the configured cap/margin and lookup to an exhaustive oracle. Coverage counts ensure the fixture visits circles; they are not measured gameplay success rates.

- [src/rules/legendCircle.test.ts:16](../../src/rules/legendCircle.test.ts#L16): skips only legends too far for their circle: the same answers as searching every legend's clearing
- [src/rules/legendCircle.test.ts:38](../../src/rules/legendCircle.test.ts#L38): shows on the ground inside the clearing only, fading in on entering and out on leaving
- [src/rules/legendCircle.test.ts:61](../../src/rules/legendCircle.test.ts#L61): shows for a legend in any state, and says what its state means, in Ed's plain words (2026-10-19)
- [src/rules/legendCircle.test.ts:82](../../src/rules/legendCircle.test.ts#L82): asks for its kind with no age and names no boon (Ed, 2026-10-18)
- [src/rules/legendClearing.test.ts:19](../../src/rules/legendClearing.test.ts#L19): `every area with a legend has one (and only those), inside its own area, clear of trees, bushes, decor and the soundsystem, its legend near the top (seed ${seed})`
- [src/rules/legendClearing.test.ts:44](../../src/rules/legendClearing.test.ts#L44): is sized to its legend: the elk's wider than the bat's
- [src/rules/legendFit.test.ts:13](../../src/rules/legendFit.test.ts#L13): has every area's creature measured (config/legend-footprints.json: node tools/legends/footprint.mjs)
- [src/rules/legendFit.test.ts:16](../../src/rules/legendFit.test.ts#L16): never makes a circle smaller than it was, nor bigger than the cap
- [src/rules/legendFit.test.ts:23](../../src/rules/legendFit.test.ts#L23): fits every legend that can fit under the cap, with its margin to spare, as the map places its circle

<a id="l3"></a>

## L3: Timed scenarios and generated scenery/quest statistics

outcome stats; 8 declarations; ~87 s of CI.

Assertions include baby return within 20 s; following beyond circle+10 m after 25 s; a 150 s siege-to-rage scenario; grove mean >0.6/<0.08; rim/south coverage >80%; runestone-gap exceptions <1.5%. Mixed safety/rule assertions need extraction before any move, not deletion of the whole file. questLater compares summed route depths across three seeds. quest.test compares median-distance ratios across five capped/uncapped maps (>0.85), while directly asserting the CURRENT default questCap===0. Preserve that default and finite-range assertions as small rules before moving the statistics.

- [src/rules/legendClearing.test.ts:50](../../src/rules/legendClearing.test.ts#L50): each holds a wild baby of its legend's kind, which keeps to the circle, comes back in if pushed out, and is free only while leashed
- [src/rules/legendClearing.test.ts:81](../../src/rules/legendClearing.test.ts#L81): its befriended baby stays in the circle and dances there; only loose-sigil pickup makes it follow her
- [src/rules/legendClearing.test.ts:111](../../src/rules/legendClearing.test.ts#L111): a fallen soundsystem's babies run off home and its besiegers march on: its legend, left without kin, grows restless, then angry
- [src/rules/legendClearing.test.ts:158](../../src/rules/legendClearing.test.ts#L158): each swells the forest round it, strongest at its edge and easing smoothly out into the area's own, all the way round
- [src/rules/legendClearing.test.ts:186](../../src/rules/legendClearing.test.ts#L186): each is edged by the rim kit: small pieces just past its floor, all the way round
- [src/rules/legendClearing.test.ts:206](../../src/rules/legendClearing.test.ts#L206): each keeps its edge minFromStone metres from its area's runestone, but in a sliver of an area too small to (the farthest it fits)
- [src/rules/quest.test.ts:119](../../src/rules/quest.test.ts#L119): keeps the spread of near and far, cutting only the far tail; never its own kind; the far ones roll stronger
- [src/rules/questLater.test.ts:30](../../src/rules/questLater.test.ts#L30): dreams from deeper in than before: the dream's nearest later area lies later on the route than the old pick's

<a id="l4"></a>

## L4: Retained comparison settings

leftovers; 5 declarations; ~147 s of CI.

The default assertion already requires 0.2. Half, 0.3 and 1 are explicit overrides for the retained radius-map selector; its header says authored islands deal their own legends. This is old-mode coverage, not evidence the default still uses the superseded half-share rule. Explicit earlyQuest=false, questLater=false and stomp=true exercise retained options rather than asserting those are current defaults.

- [src/rules/earlyQuest.test.ts:48](../../src/rules/earlyQuest.test.ts#L48): is off with legends.earlyQuest false: every dream as before
- [src/rules/legendShare.test.ts:21](../../src/rules/legendShare.test.ts#L21): puts one in legends.share of the areas (Ed, 2026-10-08: about a fifth), never home, seeded, spread so they don't clump
- [src/rules/legendShare.test.ts:41](../../src/rules/legendShare.test.ts#L41): puts one in every area but home at 1, and differs by seed
- [src/rules/legends.test.ts:141](../../src/rules/legends.test.ts#L141): with the stomp on, a legend turning angry stamps on its own area's standing soundsystem, after the stomp's longer restless time (Ed, 2026-10-06)
- [src/rules/questLater.test.ts:44](../../src/rules/questLater.test.ts#L44): is the old gamble with legends.questLater false

<a id="l5"></a>

## L5: Pinned list of giants exceeding the old circle cap

leftovers; 1 declarations; ~4 s of CI.

The assertion pins an exact species list and its comment says ‘waiting on Ed's call’. The 26 Oct paired-area/fit design permits the biggest fitting circle and documented elephant exceptions. This needs a current design ruling; it is a stale-looking baseline, not a proven obsolete test.

- [src/rules/legendFit.test.ts:34](../../src/rules/legendFit.test.ts#L34): lists the legends too big for any circle under the cap (waiting on Ed's call: drawn smaller asleep, or the circles allowed bigger)

<a id="l6"></a>

## L6: Quest completion, sleeping state and party-legend rules

current rules; 37 declarations; ~196 s of CI.

The setup isolates a legend, kin or gift and invokes the explicit transition: waves do not wake legends, kin restore sleep, only a placed sigil completes a quest at any age, no buff is awarded, and the 100-letter Easter egg has its own tether/release rules. Fixed steps here check the declared state/timer/boundary, not an uncontrolled win rate. The staggered five-second kin check is a per-frame work bound. Early-quest wording still says baby, but its assertion explicitly says any age; it does not enforce the retired age requirement.

- [src/rules/earlyQuest.test.ts:14](../../src/rules/earlyQuest.test.ts#L14): `seed ${seed}: a legend among the first areas wants another first area's baby`
- [src/rules/earlyQuest.test.ts:29](../../src/rules/earlyQuest.test.ts#L29): forces a legend circle into the first three where the share left them none
- [src/rules/earlyQuest.test.ts:40](../../src/rules/earlyQuest.test.ts#L40): plans the same route mid-build (where the map gives the first areas their legend) as on the finished map
- [src/rules/earlyQuest.test.ts:44](../../src/rules/earlyQuest.test.ts#L44): is the same every time for a seed
- [src/rules/legends.test.ts:63](../../src/rules/legends.test.ts#L63): sleep on when their area's soundsystem comes (soundsystems no longer wake them)
- [src/rules/legends.test.ts:70](../../src/rules/legends.test.ts#L70): grow restless (0 to 1) with none of their kind in their area, calm as soon as one's back, and turn angry once it's run its course
- [src/rules/legends.test.ts:90](../../src/rules/legends.test.ts#L90): counts one of its kind parked there at her sigil as kin
- [src/rules/legends.test.ts:192](../../src/rules/legends.test.ts#L192): lie relics (flasks) about the map, one per ten areas; drunk on their sigil they grow her followers and wake no legend (Ed, 2026-10-18)
- [src/rules/legends.test.ts:206](../../src/rules/legends.test.ts#L206): take a quest sigil only inside their clearing: the right creature put down elsewhere in its area does nothing but cue
- [src/rules/legends.test.ts:251](../../src/rules/legends.test.ts#L251): has the dream quest wake it happy, fighting for her, no buff (Ed, 2026-10-18; the creature stays hers), and stay open while it sleeps, soundsystem on or not (Ed, 2026-10-06)
- [src/rules/legends.test.ts:359](../../src/rules/legends.test.ts#L359): enrages its wild creatures into a siege, but leaves its legend asleep, neither enraged nor besieging
- [src/rules/legends.test.ts:393](../../src/rules/legends.test.ts#L393): look for their kind every legends.check seconds (5), each on its own beat, not all on one frame
- [src/rules/legends.test.ts:410](../../src/rules/legends.test.ts#L410): away from where they lay, walk home first and lie down where they spawned
- [src/rules/legends.test.ts:430](../../src/rules/legends.test.ts#L430): calm when angry as soon as one of their kind is back in their area: asleep, restlessness 0, and home first
- [src/rules/legends.test.ts:450](../../src/rules/legends.test.ts#L450): stays as it was laid while she walks round it
- [src/rules/partyLegend.test.ts:45](../../src/rules/partyLegend.test.ts#L45): below the egg threshold stays a route legend: no direct invite, chat or rune; the final letter alone creates the party legend
- [src/rules/partyLegend.test.ts:57](../../src/rules/partyLegend.test.ts#L57): only a happy legend takes 💌s: asleep, restless and angry ones block them, and with the egg off a happy one does too
- [src/rules/partyLegend.test.ts:68](../../src/rules/partyLegend.test.ts#L68): takes partyHits 💌s (99 aren't enough), draining slowly; the 100th makes it a party legend, its rune at its feet
- [src/rules/partyLegend.test.ts:84](../../src/rules/partyLegend.test.ts#L84): picked up, it never comes to her, and she can't go a step past partyReach of it: on foot, over the treetops, or by a blink
- [src/rules/partyLegend.test.ts:103](../../src/rules/partyLegend.test.ts#L103): put down (E), it's let go where it stands, dancing, and she's free
- [src/rules/partyLegend.test.ts:118](../../src/rules/partyLegend.test.ts#L118): knocked out, she lets it go where it stands
- [src/rules/quest.test.ts:22](../../src/rules/quest.test.ts#L22): gives every sleeping legend a dream: a kind of the map, not its own, any age (Ed, 2026-10-18), from the seed
- [src/rules/quest.test.ts:34](../../src/rules/quest.test.ts#L34): isn't done by the wrong kind
- [src/rules/quest.test.ts:43](../../src/rules/quest.test.ts#L43): `is done by its kind at any age (${["a baby", "a young one", "an adult"][level]}): the legend happy at once, fighting for her, its island found tonight, no boon (Ed, 2026-10-18)`
- [src/rules/quest.test.ts:52](../../src/rules/quest.test.ts#L52): isn't taken once the party's over (Ed, 2026-10-18: permanent unlocks only while the party is on)
- [src/rules/quest.test.ts:96](../../src/rules/quest.test.ts#L96): can still be done after the area's wave, while its legend sleeps: happy, its island found, but not a friendly area (Ed, 2026-10-06)
- [src/rules/questDrop.test.ts:24](../../src/rules/questDrop.test.ts#L24): not by her animal of its kind standing in the circle, following her
- [src/rules/questDrop.test.ts:32](../../src/rules/questDrop.test.ts#L32): not by one parked in it with its sigil outside
- [src/rules/questDrop.test.ts:41](../../src/rules/questDrop.test.ts#L41): completes on the very step its sigil is put down in the circle, its animal still far away
- [src/rules/questDrop.test.ts:52](../../src/rules/questDrop.test.ts#L52): any age of the kind will do; a wrong kind's sigil is named on the panel the moment it's down
- [src/rules/questDrop.test.ts:71](../../src/rules/questDrop.test.ts#L71): names nothing for a wrong kind merely standing in the circle (only a sigil put down counts)
- [src/rules/questDrop.test.ts:80](../../src/rules/questDrop.test.ts#L80): Ed's case (seed 162218, 14 areas): his parked adults of the dreamt kind standing in the circle no longer finish it
- [src/rules/questLater.test.ts:14](../../src/rules/questLater.test.ts#L14): `seed ${seed}: every legend but the early quest's dreams of a kind from later on the route`
- [src/rules/sleeping.test.ts:31](../../src/rules/sleeping.test.ts#L31): sleep through her standing beside them: no fight, no chat, not a step
- [src/rules/sleeping.test.ts:40](../../src/rules/sleeping.test.ts#L40): turn happy (debug O, for now): at peace (Ed, 2026-10-18: happy legends grant nothing)
- [src/rules/sleeping.test.ts:46](../../src/rules/sleeping.test.ts#L46): leave home without a legend, (Ed, 2026-10-05)
- [src/rules/sleeping.test.ts:52](../../src/rules/sleeping.test.ts#L52): are the only legends: party animals evolve no further than adult

## legends: ruling review

- Supersession matched to L1: docs/notes/testing.md records the old diagnostic ‘incorrectly required physical cell equality’. Ed's 2026-10-26 replacement: paired areas are ‘one logical area’. sleepCells.test.ts now permits 14 raw differences on the largest fixture but requires zero logical mismatches. Keep the replacement regression; no remaining equality assertion in this reviewed group needs deleting.
- Supersession matched to L4: Ed, 2026-10-06, DESIGN.md: ‘about half of areas’; Ed, 2026-10-08: ‘more like 1/5’. legendShare.test.ts asserts S===0.2 before explicitly constructing half/all comparison maps. Both rulings are accounted for; the old citation alone is not an obsolete default.
- Current sizing ruling, L2/L5: Ed, 2026-10-26, legendFit.test.ts: ‘Legend circles need to be larger. Often legends don't fit in them.’ legendAreas.test.ts checks the authored paired areas, allowing only elephant overflow in its five-map matrix. The exact eleven-giant radius-cap list needs a separate ruling, not an assumed deletion.
- Concrete quest-cap supersession: DESIGN.md Quests are a gamble (6 Oct) describes a five-area tail cap; docs/notes/gameplay.md 31 Oct playtest item13 sets questCap to 0, ‘no distance tail cut’, while ‘Positive explicit caps remain supported and tested at 6’. quest.test.ts:119 already asserts default0 and explicitly builds cap6 comparison maps. Propose reporting its median ratios, retain default0/finite-distance protections. The seed162218 regression in questDrop.test.ts explicitly opts into cap6 to preserve Ed’s old coordinates and tests the 19 Oct placed-sigil rule; it does not pin cap6 as default.
- Quest supersession: DESIGN.md Dreams lists the old quest making the placed creature join the area and the old quest closing at its wave (5 Oct); the 6 Oct replacement stays open while asleep, and the 18 Oct replacement keeps the creature hers and grants no buff. quest.test.ts:43/96, questDrop.test.ts:41 and legends.test.ts:251 assert the replacements. No positive removed-buff or wave-closes-quest assertion remains in these reviewed cases.

<a id="m1"></a>

## M1: Audio safety, scheduling and sample integrity

hard limits; 41 declarations; ~2 s of CI.

Clocks and audio nodes are controlled stand-ins. Note uniqueness, finite scheduling, gate reset, bounded voices, drift recovery and compiled-voice determinism are pipeline guarantees, not outcomes of a generated fight. The sample manifest test enforces the existing licence/size contract. The old FOF implementation remains a lab comparison; its safety test does not select it as the game's voice.

- [src/platform/audio/buffer.test.ts:8](../../src/platform/audio/buffer.test.ts#L8): asks for the tuning's buffer in seconds, more if this browser learnt it needs it, a category or seconds by ?latency=
- [src/platform/audio/buffer.test.ts:18](../../src/platform/audio/buffer.test.ts#L18): after enough under-runs in a load, asks for twice the buffer next time, at least 60 ms, never more than the most
- [src/platform/audio/fof/fof.test.ts:24](../../src/platform/audio/fof/fof.test.ts#L24): is silent before its gate, sings after it, the same every time
- [src/platform/audio/musicAhead.test.ts:5](../../src/platform/audio/musicAhead.test.ts#L5): a bar rendered across a reset (a new night: the timeline not anchored) is dropped, not started at a non-finite time
- [src/platform/audio/musicEngine.test.ts:44](../../src/platform/audio/musicEngine.test.ts#L44): schedules every sixteenth once, in order, at full speed
- [src/platform/audio/musicEngine.test.ts:51](../../src/platform/audio/musicEngine.test.ts#L51): never schedules a sixteenth twice when the game runs slower than the audio or hitches (round 13: the music crackling, then quiet)
- [src/platform/audio/musicEngine.test.ts:76](../../src/platform/audio/musicEngine.test.ts#L76): a hitch shorter than what's scheduled ahead leaves no gap, and the music eases back into step
- [src/platform/audio/musicEngine.test.ts:85](../../src/platform/audio/musicEngine.test.ts#L85): after one long stall it schedules further ahead, so the next like it leaves no gap (Ed, round 16: "Music is still starting and stopping")
- [src/platform/audio/musicEngine.test.ts:92](../../src/platform/audio/musicEngine.test.ts#L92): a longer stall only holds the music for the stall, then it plays on from where it was
- [src/platform/audio/musicEngine.test.ts:100](../../src/platform/audio/musicEngine.test.ts#L100): eases the muffle and the legend's layer in over about a second as she enters, and out as she leaves
- [src/platform/audio/musicEngine.test.ts:138](../../src/platform/audio/musicEngine.test.ts#L138): slows the music with the world: a tenth as many sixteenths, each in order once, on the game clock (so the waves and bars stay in step)
- [src/platform/audio/musicEngine.test.ts:152](../../src/platform/audio/musicEngine.test.ts#L152): drops the notes' pitch like a slowing tape (down to its floor), but never the legend's own layer
- [src/platform/audio/musicEngine.test.ts:163](../../src/platform/audio/musicEngine.test.ts#L163): plays the legend's layer at full speed over the slowed music
- [src/platform/audio/musicEngine.test.ts:192](../../src/platform/audio/musicEngine.test.ts#L192): re-anchors the timeline at the new night's game time 0, not 6 s ahead of it
- [src/platform/audio/musicEngine.test.ts:200](../../src/platform/audio/musicEngine.test.ts#L200): opens the knockdown's gate and counts knockdowns from none
- [src/platform/audio/musicEngine.test.ts:211](../../src/platform/audio/musicEngine.test.ts#L211): builds the sung part's channel again after a new style (its first note no stall)
- [src/platform/audio/outputMeter.test.ts:5](../../src/platform/audio/outputMeter.test.ts#L5): logs a silence while the music should be heard, from the last loud read to the last silent one
- [src/platform/audio/outputMeter.test.ts:13](../../src/platform/audio/outputMeter.test.ts#L13): ignores a short dip, and silence that isn't expected (before the speakers boot, paused, muted)
- [src/platform/audio/outputMeter.test.ts:19](../../src/platform/audio/outputMeter.test.ts#L19): says how long it's been silent so far
- [src/platform/audio/outputMeter.test.ts:30](../../src/platform/audio/outputMeter.test.ts#L30): finds the device's lag
- [src/platform/audio/outputMeter.test.ts:35](../../src/platform/audio/outputMeter.test.ts#L35): flags a dropout after the game (the mic drops to the room while the output plays on), and not otherwise
- [src/platform/audio/outputMeter.test.ts:50](../../src/platform/audio/outputMeter.test.ts#L50): flags the mic hearing it loud while the output is silent
- [src/platform/audio/outputMeter.test.ts:69](../../src/platform/audio/outputMeter.test.ts#L69): calls a true clock true
- [src/platform/audio/outputMeter.test.ts:75](../../src/platform/audio/outputMeter.test.ts#L75): tells coarse clock steps (slow seconds paid back by fast ones, nothing lost) from under-runs
- [src/platform/audio/outputMeter.test.ts:84](../../src/platform/audio/outputMeter.test.ts#L84): calls a clock that loses time for good under-runs
- [src/platform/audio/outputMeter.test.ts:91](../../src/platform/audio/outputMeter.test.ts#L91): believes the browser's own under-run count where it has one
- [src/platform/audio/outputMeter.test.ts:97](../../src/platform/audio/outputMeter.test.ts#L97): starts the reckoning again after a suspend
- [src/platform/audio/sfxBudget.test.ts:27](../../src/platform/audio/sfxBudget.test.ts#L27): plays up to the cap, then lets a lesser sound go nowhere
- [src/platform/audio/sfxBudget.test.ts:35](../../src/platform/audio/sfxBudget.test.ts#L35): lets a greater sound cut the least short
- [src/platform/audio/sfxBudget.test.ts:41](../../src/platform/audio/sfxBudget.test.ts#L41): counts no lasting sound, and lets go of those done
- [src/platform/audio/sfxBudget.test.ts:49](../../src/platform/audio/sfxBudget.test.ts#L49): has no limit at 0
- [src/platform/audio/shed.test.ts:5](../../src/platform/audio/shed.test.ts#L5): sheds a step when the browser counts under-runs, waits between steps and stops at the last
- [src/platform/audio/shed.test.ts:13](../../src/platform/audio/shed.test.ts#L13): sheds when the audio clock falls behind for good, but not for a coarse clock's steps that pay back
- [src/platform/audio/shed.test.ts:21](../../src/platform/audio/shed.test.ts#L21): sheds when the music keeps re-anchoring (Ed's v2186 pattern: 279 resyncs in 320 s, no clock data)
- [src/platform/audio/shed.test.ts:26](../../src/platform/audio/shed.test.ts#L26): stays put on a true clock, and ?audio=lite starts shed, ?audio=full never sheds
- [src/platform/audio/shed.test.ts:36](../../src/platform/audio/shed.test.ts#L36): lets play's start pass: a second lost and a burst of under-runs in the first seconds shed nothing
- [src/platform/audio/shed.test.ts:44](../../src/platform/audio/shed.test.ts#L44): doesn't shed for a one-off step in the clock, only for time still being lost
- [src/platform/audio/shed.test.ts:52](../../src/platform/audio/shed.test.ts#L52): steps back up after a calm minute (a wave landing's burst costs a minute, not the night), never past ?audio=lite
- [src/platform/audio/shed.test.ts:64](../../src/platform/audio/shed.test.ts#L64): keeps shed while the trouble goes on
- [src/samples.test.ts:11](../../src/samples.test.ts#L11): are all listed, under approved licences (never NC), credited and within the size budget
- [src/samples.test.ts:16](../../src/samples.test.ts#L16): catches a non-commercial licence, an unlisted file and a missing one

<a id="m2"></a>

## M2: Score form and explicit musical rules

current rules; 63 declarations; ~27 s of CI.

The planner receives synthetic wave clocks; the score receives explicit seeds and styles. Assertions directly implement the 9 Oct ABAC structure, 11 Oct nightly set and 14 Oct alto/stepwise redesign. A 30-minute planner loop is not a played night. The 120 BPM test supplies its own style-based beat tuning; it does not prohibit choosing a different record. Wide instrument phrases, retained soprano fallback and alternate lab arpeggios are explicit comparison modes, not stale default singer claims.

- [src/rules/legendCircle.music.test.ts:18](../../src/rules/legendCircle.music.test.ts#L18): is heard on the ground inside the circle only: not in the treetops, not outside, not by an angry legend
- [src/rules/legendCircle.music.test.ts:32](../../src/rules/legendCircle.music.test.ts#L32): uses the map's clearing where it has one (#235), its middle and radius rather than the legend's own
- [src/rules/legendCircle.music.test.ts:40](../../src/rules/legendCircle.music.test.ts#L40): is heard at the middle of every clearing the map draws (#235), from its own legend
- [src/rules/legendCircle.music.test.ts:51](../../src/rules/legendCircle.music.test.ts#L51): muffles the music by how far in she is: unchanged outside, steeply low-passed and quieter fully in
- [src/rules/legendCircle.music.test.ts:62](../../src/rules/legendCircle.music.test.ts#L62): in the treehouse muffles more lightly, its volume kept (Ed, 2026-10-26: "the house music slows and muffles")
- [src/rules/legendCircle.music.test.ts:78](../../src/rules/legendCircle.music.test.ts#L78): plays a legend's own layer in the music's key over it, only while she's in a circle
- [src/rules/legendCircle.music.test.ts:91](../../src/rules/legendCircle.music.test.ts#L91): gives each species its own legend music: families their own instruments, kin their own melodies
- [src/rules/musicForm.test.ts:21](../../src/rules/musicForm.test.ts#L21): is ABAC in 8-bar phrases, A coming back exactly, B and C different
- [src/rules/musicForm.test.ts:38](../../src/rules/musicForm.test.ts#L38): rests in every phrase, every half-phrase ending on rests
- [src/rules/musicForm.test.ts:52](../../src/rules/musicForm.test.ts#L52): plays A on one instrument of Ed's six by the seed, B and C sung
- [src/rules/musicForm.test.ts:71](../../src/rules/musicForm.test.ts#L71): asks a question in B and answers it on the root in C
- [src/rules/musicForm.test.ts:85](../../src/rules/musicForm.test.ts#L85): every arc step, section and layer
- [src/rules/musicForm.test.ts:104](../../src/rules/musicForm.test.ts#L104): stays at 120 through every wave
- [src/rules/musicForm.test.ts:112](../../src/rules/musicForm.test.ts#L112): gains 5 a knockdown, with no cap
- [src/rules/musicForm.test.ts:128](../../src/rules/musicForm.test.ts#L128): is silent from the knockdown till the new record, which starts its form there on a new seed
- [src/rules/musicForm.test.ts:152](../../src/rules/musicForm.test.ts#L152): goes down and comes back in the game: her wait ends on a bar line, the cue silent till then
- [src/rules/musicForm.test.ts:190](../../src/rules/musicForm.test.ts#L190): plays triplets straight, three in the time of two
- [src/rules/musicForm.test.ts:208](../../src/rules/musicForm.test.ts#L208): names a four-on-the-floor, a breakbeat and a breakdown section for every wave
- [src/rules/musicForm.test.ts:223](../../src/rules/musicForm.test.ts#L223): plays them on the form: A and B four on the floor, A breakbeats, C a breakdown, from where each wave lands
- [src/rules/musicForm.test.ts:238](../../src/rules/musicForm.test.ts#L238): sings as an alto, G3 to G4 in the home key, whatever the seed
- [src/rules/musicForm.test.ts:247](../../src/rules/musicForm.test.ts#L247): walks the sung phrases in steps and thirds within a fifth, and still answers on the root
- [src/rules/musicForm.test.ts:259](../../src/rules/musicForm.test.ts#L259): opens every wave's sung phrase on the night's own hook, the rest the wave's own
- [src/rules/musicForm.test.ts:270](../../src/rules/musicForm.test.ts#L270): sings only in the breakdowns and the build, the instrument playing the rest; washed in the breakdowns; the dark chain in the dark families
- [src/rules/musicForm.test.ts:315](../../src/rules/musicForm.test.ts#L315): has the pure chain with no chorus, octave double or shimmer, and a swelling, breathing voice
- [src/rules/musicPlan.test.ts:31](../../src/rules/musicPlan.test.ts#L31): is sound: every section, part, pattern and patch it names exists, in whole bars and blocks
- [src/rules/musicPlan.test.ts:37](../../src/rules/musicPlan.test.ts#L37): change only on block lines (every 4 bars), and run whole blocks
- [src/rules/musicPlan.test.ts:50](../../src/rules/musicPlan.test.ts#L50): map waves to sections the same way every time
- [src/rules/musicPlan.test.ts:57](../../src/rules/musicPlan.test.ts#L57): boots with the intro, then the forest; builds into each wave and drops as it lands
- [src/rules/musicPlan.test.ts:75](../../src/rules/musicPlan.test.ts#L75): goes through the whole arc and stays on its last step
- [src/rules/musicPlan.test.ts:84](../../src/rules/musicPlan.test.ts#L84): drops on the next block line when a wave comes early (N)
- [src/rules/musicPlan.test.ts:93](../../src/rules/musicPlan.test.ts#L93): lets a wave a moment late still land on the line it was due on
- [src/rules/musicPlan.test.ts:99](../../src/rules/musicPlan.test.ts#L99): never builds with waves off, and starts straight in the forest with no boot
- [src/rules/musicPlan.test.ts:105](../../src/rules/musicPlan.test.ts#L105): keeps a block's plan once made, whatever comes after
- [src/rules/musicPlan.test.ts:113](../../src/rules/musicPlan.test.ts#L113): previews: ?music=<section> loops it, ?music=wave<N> plays wave N's music
- [src/rules/musicPlan.test.ts:123](../../src/rules/musicPlan.test.ts#L123): plays notes in every section, in the scale, at sane levels, the same every time
- [src/rules/musicPlan.test.ts:150](../../src/rules/musicPlan.test.ts#L150): fills the bar before a new section, and brings the intro's parts in as the speakers boot
- [src/rules/musicPlan.test.ts:162](../../src/rules/musicPlan.test.ts#L162): adds the siege's parts under siege
- [src/rules/musicPlan.test.ts:168](../../src/rules/musicPlan.test.ts#L168): adds the party's parts near a woken area that has joined the party, never doubling the section's own
- [src/rules/musicPlan.test.ts:181](../../src/rules/musicPlan.test.ts#L181): is heard near a standing soundsystem with happy animals by it, not near home's, a ruined one or one with none
- [src/rules/musicPlan.test.ts:200](../../src/rules/musicPlan.test.ts#L200): takes an arc step's variants in turn on later passes round its loop
- [src/rules/musicPlan.test.ts:208](../../src/rules/musicPlan.test.ts#L208): plays the form's melody wherever a block falls (Ed, 2026-10-09: the 32-bar ABAC form, on the music's bars)
- [src/rules/musicPlan.test.ts:216](../../src/rules/musicPlan.test.ts#L216): keeps the first pass as it was (pass 0 is the music before variants)
- [src/rules/musicPlan.test.ts:223](../../src/rules/musicPlan.test.ts#L223): darkens the music near an angry or charging legend, by how near, and not near a sleeping or happy one
- [src/rules/musicPlan.test.ts:249](../../src/rules/musicPlan.test.ts#L249): is silent before the first speaker, then adds a layer a speaker until the twelfth makes it whole
- [src/rules/musicPlan.test.ts:264](../../src/rules/musicPlan.test.ts#L264): brings each speaker's layer in on the bar line after it turns, and is whole without a boot to follow
- [src/rules/musicPlan.test.ts:273](../../src/rules/musicPlan.test.ts#L273): drops dropLayers of the intro on the bar line after her needle-drop routine, before any speaker (Ed, 2026-10-07)
- [src/rules/musicPlan.test.ts:282](../../src/rules/musicPlan.test.ts#L282): follows the game's speakers: none booted, silent; each the pulse reaches, a layer
- [src/rules/musicSet.test.ts:18](../../src/rules/musicSet.test.ts#L18): is sound: every family's sections, patches and leads exist, and the night's style checks out
- [src/rules/musicSet.test.ts:24](../../src/rules/musicSet.test.ts#L24): changes at least two of genre, key, lead, bass, voice and density every wave (never the tempo: the gameplay's), and never the genre twice running
- [src/rules/musicSet.test.ts:35](../../src/rules/musicSet.test.ts#L35): rises to its climax on the final wave, a peak and a breakdown every cycle, each cycle's peak higher
- [src/rules/musicSet.test.ts:62](../../src/rules/musicSet.test.ts#L62): deals its palette by the absolute wave: a 10-wave night stays early, home's 64 travels to the hard end
- [src/rules/musicSet.test.ts:69](../../src/rules/musicSet.test.ts#L69): plans by the night's time: a long wave counts for more of the night
- [src/rules/musicSet.test.ts:77](../../src/rules/musicSet.test.ts#L77): is the hand-picked set on the first home night, and the game plays it
- [src/rules/musicSet.test.ts:91](../../src/rules/musicSet.test.ts#L91): is the same for the same seed, island and waves, and different for another seed
- [src/rules/musicSet.test.ts:98](../../src/rules/musicSet.test.ts#L98): plays: every wave's sections, its lead, singer and bass make notes in its key
- [src/rules/musicVictory.test.ts:15](../../src/rules/musicVictory.test.ts#L15): is named by the style and sound
- [src/rules/musicVictory.test.ts:21](../../src/rules/musicVictory.test.ts#L21): lifts the drop a whole step, with more over it
- [src/rules/musicVictory.test.ts:32](../../src/rules/musicVictory.test.ts#L32): claps a conga line (one, two, three, kick!) and loops with no fills
- [src/rules/musicZones.test.ts:22](../../src/rules/musicZones.test.ts#L22): loudest and clear on the dancefloor and round its ring
- [src/rules/musicZones.test.ts:34](../../src/rules/musicZones.test.ts#L34): loud at a partified area's soundsystem
- [src/rules/musicZones.test.ts:40](../../src/rules/musicZones.test.ts#L40): faint and muffled deep in the wild, far from every soundsystem and from the sea
- [src/rules/musicZones.test.ts:52](../../src/rules/musicZones.test.ts#L52): all but gone on the beach, and at the sea's edge only the waves
- [src/rules/musicZones.test.ts:60](../../src/rules/musicZones.test.ts#L60): the forest just inland of the beach fades smoothly, never jumping

<a id="m3"></a>

## M3: Cue boundaries, potion routing and music-tool data

current rules; 37 declarations; ~14 s of CI.

Tests inject the watch, cleared-area, fireworks or knockdown event, manually advance clocks and log a fake sound call. Counts here prove exactly-once routing and configured limits. The inland sea-life case is the negative range boundary. Potion tests directly set trip times and check routing, fade and source disposal. Music Lab JSON/MIDI tests use synthetic input and roundtrip/validation assertions. The first sound.test authority case is excluded for #1609.

- [src/app/sound.test.ts:37](../../src/app/sound.test.ts#L37): isolates ordinary audio at wake, restores it over the final two game minutes, and starts only once
- [src/app/sound.test.ts:55](../../src/app/sound.test.ts#L55): heat mutes music, lowers creatures an octave and fades breathing, without muting ordinary effects
- [src/app/sound.test.ts:105](../../src/app/sound.test.ts#L105): gives the live music the new seed, and the watchdog's rebuild uses it
- [src/app/sound.test.ts:118](../../src/app/sound.test.ts#L118): anchors the music's timeline afresh
- [src/app/sound.test.ts:125](../../src/app/sound.test.ts#L125): makes new cues for the new night, and re-points the effects at its tuning
- [src/app/sound.test.ts:135](../../src/app/sound.test.ts#L135): lets the old cues' watch warning fall as it hands over
- [src/app/sound.test.ts:142](../../src/app/sound.test.ts#L142): re-arms the safety valve's grace once play has started
- [src/musicLabSettings.test.ts:10](../../src/musicLabSettings.test.ts#L10): copies nothing but its label when nothing changed
- [src/musicLabSettings.test.ts:14](../../src/musicLabSettings.test.ts#L14): copies only what changed, and pastes back the same
- [src/musicLabSettings.test.ts:29](../../src/musicLabSettings.test.ts#L29): ignores what it doesn't know and keeps numbers in range
- [src/musicLabSettings.test.ts:40](../../src/musicLabSettings.test.ts#L40): picks the singer's A/B voice, its breath and its chain (Ed, 2026-10-14)
- [src/musicLabSettings.test.ts:64](../../src/musicLabSettings.test.ts#L64): mutes and solos
- [src/musicStudioMidi.test.ts:13](../../src/musicStudioMidi.test.ts#L13): reads a format 1 file: the tempo map on the first track, names, notes in seconds, markers
- [src/musicStudioMidi.test.ts:31](../../src/musicStudioMidi.test.ts#L31): defaults to 120 bpm and 4/4, and refuses what it can't read
- [src/platform/audio/aggro.cues.test.ts:27](../../src/platform/audio/aggro.cues.test.ts#L27): rises with the watch and hits as they attack
- [src/platform/audio/aggro.cues.test.ts:37](../../src/platform/audio/aggro.cues.test.ts#L37): falls away without a hit when she rises before they decide
- [src/platform/audio/cleared.cues.test.ts:11](../../src/platform/audio/cleared.cues.test.ts#L11): plays once, on the next half-beat after the areaCleared event, louder near the new soundsystem
- [src/platform/audio/cleared.cues.test.ts:24](../../src/platform/audio/cleared.cues.test.ts#L24): from far away still heard, at the floor
- [src/platform/audio/fireworks.cues.test.ts:18](../../src/platform/audio/fireworks.cues.test.ts#L18): whooshes each shell of the drawn show up, bursts it once its sound has reached her, and cheers once at the finale
- [src/platform/audio/knockdownRecord.cues.test.ts:13](../../src/platform/audio/knockdownRecord.cues.test.ts#L13): plays it in that order, once
- [src/platform/audio/night.test.ts:9](../../src/platform/audio/night.test.ts#L9): every area type has its night named, and a wet one unnamed is a wet night
- [src/platform/audio/night.test.ts:17](../../src/platform/audio/night.test.ts#L17): how far the party's over: nothing in a game without it, its own ease, or eased in from its start
- [src/platform/audio/nope.cues.test.ts:10](../../src/platform/audio/nope.cues.test.ts#L10): plays once on the leash's fizzled event, and not on a placed one
- [src/platform/audio/potionAudio.test.ts:14](../../src/platform/audio/potionAudio.test.ts#L14): routes creature audio through pitch while breathing/startup bypass it but share the master and limiter
- [src/platform/audio/potionAudio.test.ts:26](../../src/platform/audio/potionAudio.test.ts#L26): transposes the existing creature bus with two bounded taps, restores exact dry routing and releases sources
- [src/platform/audio/potionAudio.test.ts:43](../../src/platform/audio/potionAudio.test.ts#L43): keeps creature routes, their reverb and shared volume/budget intact when ordinary output is muted
- [src/platform/audio/potionAudio.test.ts:54](../../src/platform/audio/potionAudio.test.ts#L54): keeps one bounded breathing source and releases it at stop, with an original rising startup tone
- [src/platform/audio/potionFilter.test.ts:9](../../src/platform/audio/potionFilter.test.ts#L9): covers every recipe with the fallback except the two explicitly bespoke vision effects
- [src/platform/audio/potionFilter.test.ts:12](../../src/platform/audio/potionFilter.test.ts#L12): thins Miniature and fades any fallback over the final two minutes of game time
- [src/platform/audio/potionFilter.test.ts:20](../../src/platform/audio/potionFilter.test.ts#L20): keeps modulation bounded and fixed on a paused game clock
- [src/platform/audio/potionFilter.test.ts:24](../../src/platform/audio/potionFilter.test.ts#L24): routes both dry and filtered paths, starts dry and restores dry gain after Stop
- [src/platform/audio/seaLife.cues.test.ts:35](../../src/platform/audio/seaLife.cues.test.ts#L35): inland, nothing
- [src/platform/audio/sfxCues.test.ts:18](../../src/platform/audio/sfxCues.test.ts#L18): call now and then from their clearings, more often as restlessness rises, the nearest two at most, and stop once calm
- [src/platform/audio/sfxCues.test.ts:45](../../src/platform/audio/sfxCues.test.ts#L45): is heard far beyond the usual hearing, and not past its range
- [src/platform/audio/sfxCues.test.ts:61](../../src/platform/audio/sfxCues.test.ts#L61): powers up each home speaker as the boot pulse turns it (g.speakerBoot), a step up the scale round the ring, the last a chord
- [src/platform/audio/sfxCues.test.ts:74](../../src/platform/audio/sfxCues.test.ts#L74): powers up a wave's soundsystem as it appears, once, from where it stands
- [src/platform/audio/sparkler.cues.test.ts:18](../../src/platform/audio/sparkler.cues.test.ts#L18): is heard by the pulse's tip, fading with distance, and not while home boots up

<a id="m4"></a>

## M4: Generated cue rates and melody proportions

outcome stats; 3 declarations; ~17 s of CI.

Sea-life tests sample seeded timetables for 60/600 seconds and require at least three splashes or one groan. Melody pace samples 60 seeds × ABC, requiring <3.5 notes/bar, >1 whole note/phrase and >15% triplets. These quantify an intended feel; they do not establish no-NaN, ownership or exactly-once event delivery. Opposite-coast absence assertions in the mixed sea-life cases must first be retained as small range tests.

- [src/platform/audio/seaLife.cues.test.ts:24](../../src/platform/audio/seaLife.cues.test.ts#L24): by the east coast, the dolphins' splashes, now and then
- [src/platform/audio/seaLife.cues.test.ts:29](../../src/platform/audio/seaLife.cues.test.ts#L29): by the west coast, the kraken's groan and the water pouring off it, rarely
- [src/rules/musicForm.test.ts:172](../../src/rules/musicForm.test.ts#L172): is mostly slow, with whole notes and triplets often, and some busier bars

<a id="m5"></a>

## M5: Outdated cheer-test descriptions

leftovers; 2 declarations; ~1 s of CI.

The suite still says +1 BPM (7 Oct), and a case name says after trumpet and rewind. The 9 Oct design instead adds 5 BPM and removes the rewind at the cut. Neither case asserts +1 or requires a rewind: one calls knockdownTempo with current tuning; the other supplies a synthetic return clock. This is stale explanation, not obsolete behavior or deletion authority.

- [src/platform/audio/tempoUp.cues.test.ts:11](../../src/platform/audio/tempoUp.cues.test.ts#L11): with no knockout under way, cheers once, on the bar line the tempo starts rising from
- [src/platform/audio/tempoUp.cues.test.ts:25](../../src/platform/audio/tempoUp.cues.test.ts#L25): knocked down, cheers once as she's back at her decks (after the trumpet and the rewind), on her clock

## music-audio: ruling review

- M5 old: tempoUp.cues.test.ts suite cites Ed, 2026-10-07, ‘+1 BPM’, and the second test names ‘the trumpet and the rewind’. Replacement: Ed, 2026-10-09, docs/notes/music.md Beat clock: ‘it stays at 120 unless you are knocked down, in which case it gains 5bpm’; Form: ‘the rewind at the cut is gone’. The assertions already test current event timing; only their description is proposed for rewrite.
- M2 old singer: docs/notes/music.md records the 11 Oct choice ‘e Recorded + ethereal will do for now’. Replacement: 14 Oct singer redesign specifies alto, narrow stepwise phrases and two effect chains. musicForm.test.ts asserts MIDI55–67, limited leaps, voice only in builds/breakdowns, and pure-chain chorus/octave/shimmer zero. No old high-soprano default is pinned by this reviewed group; the old soprano is explicitly fallback/comparison data.
- M4 current intent: Ed, 2026-10-09, musicForm.test.ts: ‘keep the melodies relatively slow, but not always. Use whole notes and triplets quite often’. The numeric 3.5/15% thresholds are implementation interpretations of that intent, not quoted numeric rulings. Sea-life header cites Ed, 2026-10-07, dolphins east/kraken west, but the ≥3/≥1 sampled counts are not quoted frequency decisions. No newer cancellation of these effects is claimed.
- M2 tempo scope: records were extended on 29 Oct to 100–200 BPM, with 100/120 starters (recordSave.test.ts). musicForm's 120-BPM case builds t.beat from style.bpm explicitly; it checks wave changes do not choose tempo. docs/notes/music.md 11 Oct: ‘tempo is set by the gameplay’. This does not contradict selectable records.

