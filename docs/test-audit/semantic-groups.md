# Semantic review membership and rulings

Core-file format preview only; the rest of the audit remains in progress. Each group lists source declarations, not expanded executions. Durations use the sum of unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.

<a id="s1"></a>

## S1: Slot migration and isolation

hard limits; 14 declarations; <1 s of CI.

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

current rules; 13 declarations; <1 s of CI.

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

current rules; 21 declarations; <1 s of CI.

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

current rules; 50 declarations; ~201 s of CI.

The setup isolates a legend, kin or gift and invokes the explicit transition: waves do not wake legends, kin restore sleep, only a placed sigil completes a quest at any age, no buff is awarded, and the 100-letter Easter egg has its own tether/release rules. Fixed steps here check the declared state/timer/boundary, not an uncontrolled win rate. The staggered five-second kin check is a per-frame work bound. Early-quest wording still says baby, but its assertion explicitly says any age; it does not enforce the retired age requirement. Known-quest and offering policies receive fabricated observations/stack acknowledgements and explicit deadlines; they cannot invent unseen cues. Ending cases advance only the wave/ending clock and force neutralization, checking automatic ending and observed/drawn-pointer agreement, not whether a bot wins a natural night.

- [src/bots/knownQuest.test.ts:11](../../src/bots/knownQuest.test.ts#L11): empty observations and closed bubbles never invent unseen requests; output is detached
- [src/bots/knownQuest.test.ts:17](../../src/bots/knownQuest.test.ts#L17): only fresh actual cues can keep a job active; closed/angry/friendly cues end it
- [src/bots/knownQuest.test.ts:26](../../src/bots/knownQuest.test.ts#L26): a carried offering beats other hints, and a chosen request remains committed
- [src/bots/knownQuest.test.ts:34](../../src/bots/knownQuest.test.ts#L34): unavailable targets release priority without manufacturing an arrival/completion cue
- [src/bots/knownQuest.test.ts:39](../../src/bots/knownQuest.test.ts#L39): the fixed deadline counts gaps, dream-visit interruptions and quest switches; no restart
- [src/bots/knownQuest.test.ts:53](../../src/bots/knownQuest.test.ts#L53): `${reason} releases deferral for the rest of the night`
- [src/bots/knownQuest.test.ts:60](../../src/bots/knownQuest.test.ts#L60): unsafe entry and an active dream visit cannot begin a budget; opt-out is inert
- [src/bots/quest-ending.test.ts:14](../../src/bots/quest-ending.test.ts#L14): timed waves reach the ending without casting or any witch control
- [src/bots/quest-ending.test.ts:24](../../src/bots/quest-ending.test.ts#L24): external neutralization starts an automatic lap; observed cue equals the drawn party pointer
- [src/bots/questOffering.test.ts:4](../../src/bots/questOffering.test.ts#L4): either of two matching requested sigils can be put down, independent of age or ID
- [src/bots/questOffering.test.ts:9](../../src/bots/questOffering.test.ts#L9): one cycle pulse waits for the delayed stack acknowledgement before placement
- [src/bots/questOffering.test.ts:17](../../src/bots/questOffering.test.ts#L17): a longer mixed stack cycles once per acknowledged rotation, never against stale input
- [src/bots/questOffering.test.ts:25](../../src/bots/questOffering.test.ts#L25): missing requested species does not cycle, and a detached diagnostic cannot acknowledge it
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

<a id="t1"></a>

## T1: CI coverage, publication and proof guards

current rules; 71 declarations; known files: <1 s of CI; 3 files have unknown timing.

Parsed workflow YAML, tiny Git/command fixtures and stubbed pixels check fail-closed coverage, publication restrictions and current scheduling policy. world-audit parses strings; effects-scene tests a synthetic nonblank detector. Four shards and8px/32 are current operational rules rather than timeless invariants. No generated outcome target is run.

- [tools/ci/effects-scene.test.ts:15](../../tools/ci/effects-scene.test.ts#L15): rejects a black frame even when drawing counters claim the scene is ready
- [tools/ci/effects-scene.test.ts:18](../../tools/ci/effects-scene.test.ts#L18): rejects an unfinished forest and the wrong flight mode even when pixels have detail
- [tools/ci/effects-scene.test.ts:22](../../tools/ci/effects-scene.test.ts#L22): reports actual drawn detail only when the complete scene and requested mode agree
- [tools/ci/pages-policy.test.cjs:6](../../tools/ci/pages-policy.test.cjs#L6): live publication bypasses preview debounce and only live may preempt a running publisher
- [tools/ci/pages-policy.test.cjs:16](../../tools/ci/pages-policy.test.cjs#L16): an old preview replacing a queued live job still publishes the newest live root, never its stale event snapshot
- [tools/ci/pages-policy.test.cjs:27](../../tools/ci/pages-policy.test.cjs#L27): Ed owns source activation, cleanup remains independent, and dispatch reaches the default-branch workflow
- [tools/ci/proofs.test.cjs:8](../../tools/ci/proofs.test.cjs#L8): settled fixture requires idle builds and three distinct unchanged rendered samples
- [tools/ci/proofs.test.cjs:30](../../tools/ci/proofs.test.cjs#L30): approved repaint rule accepts two small changes and rejects count or channel excess
- [tools/ci/proofs.test.cjs:37](../../tools/ci/proofs.test.cjs#L37): proof server resolves build identities and rejects encoded traversal without a local listener
- [tools/ci/proofs.test.cjs:43](../../tools/ci/proofs.test.cjs#L43): the initial CI-safe registry names an existing canonical proof
- [tools/ci/reporting.test.cjs:12](../../tools/ci/reporting.test.cjs#L12): annotation cap is shared across commands, totals remain complete and payload cannot inject commands
- [tools/ci/reporting.test.cjs:27](../../tools/ci/reporting.test.cjs#L27): tool diagnostics retain names and config paths
- [tools/ci/reporting.test.cjs:35](../../tools/ci/reporting.test.cjs#L35): command status is preserved; crash fallback and unsuccessful named checks are annotated
- [tools/ci/reporting.test.cjs:45](../../tools/ci/reporting.test.cjs#L45): checked-tree proof rejects changed tree/environment, failed runs, absent or corrupt proof
- [tools/ci/reporting.test.cjs:66](../../tools/ci/reporting.test.cjs#L66): real isolated Vitest failure reports its test name, file and assertion line without changing failure status
- [tools/ci/reporting.test.cjs:80](../../tools/ci/reporting.test.cjs#L80): release imports only successful matching-environment task results; changed fingerprints remain misses
- [tools/ci/reporting.test.cjs:101](../../tools/ci/reporting.test.cjs#L101): embedded GitHub scripts compile and neither workflow reruns on PR edits
- [tools/ci/run-unit.test.ts:10](../../tools/ci/run-unit.test.ts#L10): locally runs exactly the resolved related files once with one worker
- [tools/ci/run-unit.test.ts:17](../../tools/ci/run-unit.test.ts#L17): falls back to all tests for %s
- [tools/ci/run-unit.test.ts:20](../../tools/ci/run-unit.test.ts#L20): falls back if module-graph selection itself throws
- [tools/ci/run-unit.test.ts:23](../../tools/ci/run-unit.test.ts#L23): does not hide a failing selected test by rerunning the full suite
- [tools/ci/run-unit.test.ts:28](../../tools/ci/run-unit.test.ts#L28): full runs do not invoke the related selector or permit empty suites
- [tools/ci/run-unit.test.ts:35](../../tools/ci/run-unit.test.ts#L35): CI keeps its configured parallelism for $tests
- [tools/ci/run-unit.test.ts:40](../../tools/ci/run-unit.test.ts#L40): full CI runs pass the shard to Vitest so every file runs in exactly one shard
- [tools/ci/run-unit.test.ts:45](../../tools/ci/run-unit.test.ts#L45): a related selection runs entirely in shard 1; other shards never start an empty Vitest run
- [tools/ci/run-unit.test.ts:53](../../tools/ci/run-unit.test.ts#L53): no shard env means the unsharded run (%s)
- [tools/ci/run-unit.test.ts:54](../../tools/ci/run-unit.test.ts#L54): rejects a malformed shard %s instead of skipping tests
- [tools/ci/run-unit.test.ts:57](../../tools/ci/run-unit.test.ts#L57): splits the full suite by measured time: every file exactly once, deterministically, the slowest alone
- [tools/ci/run-unit.test.ts:66](../../tools/ci/run-unit.test.ts#L66): balances only full sharded runs, never hands Vitest an empty filter, and falls back to its own --shard
- [tools/ci/run-unit.test.ts:76](../../tools/ci/run-unit.test.ts#L76): keeps the measured timings in step with the real test files
- [tools/ci/run-unit.test.ts:81](../../tools/ci/run-unit.test.ts#L81): does not hide extra heavy work underneath the longest file
- [tools/ci/run-unit.test.ts:89](../../tools/ci/run-unit.test.ts#L89): refreshes portable cloud timings and rejects failures, duplicate files and invalid durations
- [tools/ci/same-game.test.ts:18](../../tools/ci/same-game.test.ts#L18): ignores only the build time in version.json
- [tools/ci/same-game.test.ts:24](../../tools/ci/same-game.test.ts#L24): reports any changed, added or removed built file
- [tools/ci/same-game.test.ts:30](../../tools/ci/same-game.test.ts#L30): refuses builds stamped differently or unstamped
- [tools/ci/same-game.test.ts:34](../../tools/ci/same-game.test.ts#L34): ignores a branch's bench expect declaration but not a changed benchmark tool
- [tools/ci/test-scope.test.ts:12](../../tools/ci/test-scope.test.ts#L12): allows related tests only for ordinary module-only PRs
- [tools/ci/test-scope.test.ts:13](../../tools/ci/test-scope.test.ts#L13): keeps %s full
- [tools/ci/test-scope.test.ts:14](../../tools/ci/test-scope.test.ts#L14): keeps release/publish branch %s full
- [tools/ci/test-scope.test.ts:15](../../tools/ci/test-scope.test.ts#L15): keeps title-based release %s full
- [tools/ci/test-scope.test.ts:16](../../tools/ci/test-scope.test.ts#L16): does not treat an ordinary title mentioning release as a release
- [tools/ci/test-scope.test.ts:17](../../tools/ci/test-scope.test.ts#L17): keeps title-based publication checks full
- [tools/ci/test-scope.test.ts:18](../../tools/ci/test-scope.test.ts#L18): falls back for %s
- [tools/ci/test-scope.test.ts:19](../../tools/ci/test-scope.test.ts#L19): cannot pass missing history or an empty diff as a related run
- [tools/ci/test-scope.test.ts:24](../../tools/ci/test-scope.test.ts#L24): uses the merge base and keeps renamed path separators intact
- [tools/ci/test-scope.test.ts:30](../../tools/ci/test-scope.test.ts#L30): falls back when a changed module was deleted
- [tools/ci/test-scope.test.ts:33](../../tools/ci/test-scope.test.ts#L33): falls back on a shallow or broken git history
- [tools/ci/test-scope.test.ts:36](../../tools/ci/test-scope.test.ts#L36): selects safely from a real two-parent depth-two PR checkout and falls back at depth one
- [tools/ci/workflows.test.ts:8](../../tools/ci/workflows.test.ts#L8): runs candidate-only fast proofs on PR artifacts with smoke Chromium
- [tools/ci/workflows.test.ts:20](../../tools/ci/workflows.test.ts#L20): keeps settled pixels on informational nightly/manual execution, never PRs
- [tools/ci/workflows.test.ts:32](../../tools/ci/workflows.test.ts#L32): checks config values and every maintained generated reference before building
- [tools/ci/workflows.test.ts:39](../../tools/ci/workflows.test.ts#L39): builds the tested revision once, with the benchmark base explicitly distinct
- [tools/ci/workflows.test.ts:48](../../tools/ci/workflows.test.ts#L48): skips only the benchmark itself when the game build is byte-identical to base
- [tools/ci/workflows.test.ts:55](../../tools/ci/workflows.test.ts#L55): has every built-game consumer download the one artifact
- [tools/ci/workflows.test.ts:63](../../tools/ci/workflows.test.ts#L63): cannot report a green required check when its prerequisite build failed
- [tools/ci/workflows.test.ts:69](../../tools/ci/workflows.test.ts#L69): runs independent check work beside unit shards and keeps the final gate strict and tiny
- [tools/ci/workflows.test.ts:82](../../tools/ci/workflows.test.ts#L82): skips the unused playable preview for release-check and publish PRs
- [tools/ci/workflows.test.ts:86](../../tools/ci/workflows.test.ts#L86): splits unit tests over four shards and the required check needs every shard
- [tools/ci/workflows.test.ts:98](../../tools/ci/workflows.test.ts#L98): bounds every Chromium install so a hung download cannot consume a whole job timeout
- [tools/ci/workflows.test.ts:105](../../tools/ci/workflows.test.ts#L105): gives main publication priority without publishing prototype pushes or forks
- [tools/ci/workflows.test.ts:118](../../tools/ci/workflows.test.ts#L118): runs PR preview alongside checks while only main publication gates them
- [tools/ci/workflows.test.ts:127](../../tools/ci/workflows.test.ts#L127): keeps closed-PR cleanup independent and removes the duplicate benchmark workflow
- [tools/ci/workflows.test.ts:134](../../tools/ci/workflows.test.ts#L134): does not make the independent art generator consume a nonexistent game build
- [tools/ci/workflows.test.ts:147](../../tools/ci/workflows.test.ts#L147): runs advisory art only nightly on prototype or manually on the selected exact ref
- [tools/ci/workflows.test.ts:168](../../tools/ci/workflows.test.ts#L168): creates or updates one nightly failure comment with source and failed batch, and quietly resolves it
- [tools/ci/workflows.test.ts:190](../../tools/ci/workflows.test.ts#L190): reuses a scheduled proof's actual checkout tree even when workflow metadata names another SHA
- [tools/ci/workflows.test.ts:222](../../tools/ci/workflows.test.ts#L222): keeps real largest-world drawing coverage separate from small unit worlds
- [tools/ci/workflows.test.ts:227](../../tools/ci/workflows.test.ts#L227): allows cancellation of stale consumer jobs rather than always keeping them alive
- [tools/ci/world-audit.test.ts:5](../../tools/ci/world-audit.test.ts#L5): finds imported constructor aliases and ignores comment/string lookalikes
- [tools/ci/world-audit.test.ts:9](../../tools/ci/world-audit.test.ts#L9): keeps each small-world factory reason with the calls it supplies
- [tools/ci/world-audit.test.ts:14](../../tools/ci/world-audit.test.ts#L14): does not treat type-only imports or unrelated methods as world creation

<a id="t2"></a>

## T2: Measurement and diagnostic contracts

hard limits; 69 declarations; ~3 s of CI.

Supplied traces, fake clocks/workers/GL and shader source tokens test honest telemetry, comparison boundaries and performance budgets. The30000 upload calls and256 masks are synthetic coverage, not game populations. Intentional shader changes may require a separately reviewed baseline; no replacing ruling was established.

- [tools/bench/chart-target.test.ts:5](../../tools/bench/chart-target.test.ts#L5): selects a record with no outline before waiting for its prioritized outline
- [tools/bench/chart-target.test.ts:16](../../tools/bench/chart-target.test.ts#L16): shares one wait budget rather than restarting the full timeout after selection
- [tools/bench/chart-target.test.ts:23](../../tools/bench/chart-target.test.ts#L23): does not choose a target whose record never becomes available
- [tools/bench/coast-first-use.test.ts:6](../../tools/bench/coast-first-use.test.ts#L6): separates the coast transition window from later coast frames and verifies material activation
- [tools/bench/coast-first-use.test.ts:20](../../tools/bench/coast-first-use.test.ts#L20): refuses an unverified coast visit later than30s after arrival
- [tools/bench/comparable.test.ts:23](../../tools/bench/comparable.test.ts#L23): differ in nothing but what's tested: the build by default
- [tools/bench/comparable.test.ts:29](../../tools/bench/comparable.test.ts#L29): compares the knobs one by one, a knob as built against one set
- [tools/bench/comparable.test.ts:35](../../tools/bench/comparable.test.ts#L35): refuses a pair that differs in more, naming each field before and after; --override compares anyway
- [tools/bench/comparable.test.ts:45](../../tools/bench/comparable.test.ts#L45): can't judge a run made before keys: compares with a warning
- [tools/bench/comparable.test.ts:50](../../tools/bench/comparable.test.ts#L50): takes --testing and --override off the command line
- [tools/bench/comparable.test.ts:60](../../tools/bench/comparable.test.ts#L60): splits where the island, wave or mode changes, with each segment's own medians
- [tools/bench/comparable.test.ts:66](../../tools/bench/comparable.test.ts#L66): falls back to the view's mode in a log from before scenes
- [tools/bench/comparable.test.ts:69](../../tools/bench/comparable.test.ts#L69): merges a scene's samples wherever they fall, for two runs side by side
- [tools/bench/comparable.test.ts:83](../../tools/bench/comparable.test.ts#L83): refuses this morning's pair, saying which fields differ
- [tools/bench/comparable.test.ts:89](../../tools/bench/comparable.test.ts#L89): compares it with --override, and still only the scenes both runs have
- [tools/bench/comparable.test.ts:95](../../tools/bench/comparable.test.ts#L95): sets a like-for-like pair side by side by scene (the key's own scene, the last sampled, aside)
- [tools/bench/expect.test.ts:22](../../tools/bench/expect.test.ts#L22): with nothing declared, every mismatch is one
- [tools/bench/expect.test.ts:27](../../tools/bench/expect.test.ts#L27): only what's declared passes, with its reason; the rest, and what can't be declared, still fail
- [tools/bench/expect.test.ts:33](../../tools/bench/expect.test.ts#L33): * declares every scene (or every part) of its kind
- [tools/bench/expect.test.ts:38](../../tools/bench/expect.test.ts#L38): says what was declared but didn't differ
- [tools/bench/expect.test.ts:42](../../tools/bench/expect.test.ts#L42): refuses a declaration with no reason, a reason missing, or a field it doesn't know
- [tools/bench/expect.test.ts:53](../../tools/bench/expect.test.ts#L53): rejects undeclared initial position drift, including when only pixels or another scene were declared
- [tools/bench/expect.test.ts:57](../../tools/bench/expect.test.ts#L57): accepts declared finite initial x/z only, and reports unused declarations
- [tools/bench/expect.test.ts:62](../../tools/bench/expect.test.ts#L62): rejects every other boundary field's drift even alongside declared position drift
- [tools/bench/expect.test.ts:72](../../tools/bench/expect.test.ts#L72): cannot declare missing boundaries or missing/non-finite coordinates
- [tools/bench/expect.test.ts:75](../../tools/bench/expect.test.ts#L75): rejects start wildcards, blank scene names and missing reasons at parsing
- [tools/bench/ground-compile-variants.test.ts:5](../../tools/bench/ground-compile-variants.test.ts#L5): enumerates four baseline and six proposed families without impossible no-lake/water-only defines
- [tools/bench/ground-compile-variants.test.ts:12](../../tools/bench/ground-compile-variants.test.ts#L12): guards only the biome helpers and special branch, preserving ordinary water and full-path text
- [tools/bench/ground-extra-source.test.ts:37](../../tools/bench/ground-extra-source.test.ts#L37): retains exact active fragment tokens when all extras are present, plain/beach and every lake kind
- [tools/bench/ground-extra-source.test.ts:44](../../tools/bench/ground-extra-source.test.ts#L44): all256 extra combinations keep balanced scope; the empty set removes the costly feature bodies
- [tools/bench/ground-parity-scene.test.ts:4](../../tools/bench/ground-parity-scene.test.ts#L4): removes water-only regions without depending on compiled-out lake looks
- [tools/bench/ground-parity-scene.test.ts:10](../../tools/bench/ground-parity-scene.test.ts#L10): ablates each requested kind independently and rejects absent or mismatched fixtures
- [tools/bench/hold-simulation.test.ts:5](../../tools/bench/hold-simulation.test.ts#L5): holds old paused and new direct-play loops synchronously before readiness, without blocking readiness or replacing the game
- [tools/bench/travel-budget.test.ts:5](../../tools/bench/travel-budget.test.ts#L5): passes a complete, smooth trip without a quality downgrade
- [tools/bench/travel-budget.test.ts:6](../../tools/bench/travel-budget.test.ts#L6): requires job protocol evidence for the new job-instrumented trace format
- [tools/bench/travel-budget.test.ts:12](../../tools/bench/travel-budget.test.ts#L12): rejects an unmeasured API trip instead of counting missing telemetry as zero
- [tools/bench/travel-budget.test.ts:15](../../tools/bench/travel-budget.test.ts#L15): accepts observed zero long tasks but not unsupported empty telemetry
- [tools/bench/travel-budget.test.ts:19](../../tools/bench/travel-budget.test.ts#L19): rejects non-finite durations and frame counts
- [tools/bench/travel-budget.test.ts:24](../../tools/bench/travel-budget.test.ts#L24): does not pass a partial trace whose later trip timed out
- [tools/bench/travel-budget.test.ts:28](../../tools/bench/travel-budget.test.ts#L28): does not silently pass with a misspelled numeric budget
- [tools/bench/travel-budget.test.ts:29](../../tools/bench/travel-budget.test.ts#L29): catches removal of sliced terrain preparation even under the broad software-renderer frame limit
- [tools/bench/travel-budget.test.ts:30](../../tools/bench/travel-budget.test.ts#L30): rejects the measured premature handoff even when no frame was blocked
- [tools/bench/travel-budget.test.ts:34](../../tools/bench/travel-budget.test.ts#L34): rejects an unrecorded arrival or incomplete observation rather than treating null as zero
- [tools/bench/travel-budget.test.ts:39](../../tools/bench/travel-budget.test.ts#L39): rejects long tasks, slices and frame gaps independently
- [tools/bench/travel-budget.test.ts:43](../../tools/bench/travel-budget.test.ts#L43): requires active quality and catches a drop during travel or the arrival grace period
- [tools/bench/travel-budget.test.ts:48](../../tools/bench/travel-budget.test.ts#L48): does not require chart markers for an explicitly identified API trip
- [tools/bench/travel-budget.test.ts:53](../../tools/bench/travel-budget.test.ts#L53): summarizes elapsed shader waits separately from callbacks and parallel worker reports
- [tools/bench/travel-budget.test.ts:58](../../tools/bench/travel-budget.test.ts#L58): summarizes upload aggregates by call count and individual maximum, not aggregate wall time
- [tools/bench/travel-failure.test.ts:5](../../tools/bench/travel-failure.test.ts#L5): retains chart readiness and bounded mark metadata without outline payloads
- [tools/bench/travel-failure.test.ts:12](../../tools/bench/travel-failure.test.ts#L12): preserves original phase context on a closed page
- [tools/bench/travel-failure.test.ts:16](../../tools/bench/travel-failure.test.ts#L16): bounds diagnostics when the failed page no longer responds
- [tools/bench/travel-failure.test.ts:22](../../tools/bench/travel-failure.test.ts#L22): retains page evidence when an individual worker is unresponsive
- [tools/bench/travel-probe.test.ts:5](../../tools/bench/travel-probe.test.ts#L5): preserves worker handlers, receiver, return values and transfer-list identity
- [tools/bench/travel-probe.test.ts:34](../../tools/bench/travel-probe.test.ts#L34): preserves upload return values and thrown errors while recording the call
- [tools/bench/travel-probe.test.ts:44](../../tools/bench/travel-probe.test.ts#L44): records native worker errors without replacing handlers or retaining event payloads
- [tools/bench/travel-probe.test.ts:57](../../tools/bench/travel-probe.test.ts#L57): consumes diagnostic packets, preserves active jobs across reset and closes them on termination
- [tools/bench/travel-probe.test.ts:75](../../tools/bench/travel-probe.test.ts#L75): streams job metadata to the host across recorder resets without requiring a final page snapshot
- [tools/bench/travel-probe.test.ts:84](../../tools/bench/travel-probe.test.ts#L84): retains initial job records if the host binding is installed after the probe init script
- [tools/bench/travel-probe.test.ts:94](../../tools/bench/travel-probe.test.ts#L94): retains every upload count and slowest call beyond the old cap, leaving room for late worker events
- [tools/bench/worker-checkpoint.test.ts:8](../../tools/bench/worker-checkpoint.test.ts#L8): preserves metadata already delivered to the host when the page later stops responding
- [tools/bench/worker-checkpoint.test.ts:20](../../tools/bench/worker-checkpoint.test.ts#L20): deduplicates batches, declares gaps and bounds retained history
- [tools/bench/worker-checkpoint.test.ts:27](../../tools/bench/worker-checkpoint.test.ts#L27): does not call missing checkpoints zero jobs and prefers a completed page snapshot
- [tools/bench/worker-checkpoint.test.ts:31](../../tools/bench/worker-checkpoint.test.ts#L31): does not extend pending-stage elapsed time through a transport backlog
- [tools/bench/worker-checkpoint.test.ts:39](../../tools/bench/worker-checkpoint.test.ts#L39): never resurrects a cancelled job when a delayed worker stage packet arrives
- [tools/bench/worker-job-summary.test.ts:4](../../tools/bench/worker-job-summary.test.ts#L4): keeps queue, compute and cache wall spans separate across different time origins
- [tools/bench/worker-job-summary.test.ts:14](../../tools/bench/worker-job-summary.test.ts#L14): retains a pending cache operation at failure without pretending it completed
- [tools/bench/worker-profile.test.ts:5](../../tools/bench/worker-profile.test.ts#L5): escapes malformed native Windows profile URLs without changing samples or times
- [tools/bench/worker-profile.test.ts:11](../../tools/bench/worker-profile.test.ts#L11): leaves valid profile JSON unchanged and rejects unrelated corruption
- [tools/bench/worker-profile.test.ts:16](../../tools/bench/worker-profile.test.ts#L16): copies ImageData exactly and clips rectangles in the explicit Node pixel backend

<a id="t3"></a>

## T3: Generated-world fingerprints and repeat-night isolation

hard limits; 4 declarations; ~16 s of CI.

These do step generated games (240/600-step paths plus short wave advances). Assertions compare matched state, semantic fingerprint sensitivity and reset behavior rather than wins, survival or kills. The historical15.605 file seconds remain integrity work, not a savings proposal.

- [tools/bench/fingerprint.test.ts:18](../../tools/bench/fingerprint.test.ts#L18): is the same for a knob added, a note edited, or the groups reordered: the tuning file is an input, not the state
- [tools/bench/fingerprint.test.ts:24](../../tools/bench/fingerprint.test.ts#L24): still changes when a knob the game uses changes what happens
- [tools/bench/twoNights.test.ts:28](../../tools/bench/twoNights.test.ts#L28): the second night is the night played fresh
- [tools/bench/twoNights.test.ts:38](../../tools/bench/twoNights.test.ts#L38): a new game puts the fight's settings back as a page starts them (the last night's are read before its first fight)

<a id="t4"></a>

## T4: Research provenance and generated data

current rules; 61 declarations; known files: <1 s of CI; 12 files have unknown timing.

Most inputs are fabricated rows/configs. Screen tests validate frozen experiment controls and gate text, not whether a bot wins. Toy ask/tell scores protect resumability. Tiny real expert-contract cases assert provenance, replay equality and honest unsupported results. The inventory classifier tests pass strings like advance(world); they never advance a world. Newly added synthetic inventory cases have been reviewed by the integrator.

- [tools/balance/expert-contract.test.mjs:9](../../tools/balance/expert-contract.test.mjs#L9): source fingerprints match LF and CRLF checkouts but reject changed source
- [tools/balance/expert-contract.test.mjs:31](../../tools/balance/expert-contract.test.mjs#L31): locks protect source, parameters and human floors; canonical hashes ignore key order
- [tools/balance/expert-contract.test.mjs:41](../../tools/balance/expert-contract.test.mjs#L41): weak-case fitness lists preserve exact settings and exclude held-out pairs in both rounds
- [tools/balance/expert-contract.test.mjs:61](../../tools/balance/expert-contract.test.mjs#L61): external rows cannot leak held-out pairs or first-round reserved survey pairs
- [tools/balance/expert-contract.test.mjs:79](../../tools/balance/expert-contract.test.mjs#L79): runCase uses exact seeds/loadout/tempo and rejects unsupported cells
- [tools/balance/expert-coverage-screen.test.mjs:6](../../tools/balance/expert-coverage-screen.test.mjs#L6): final coverage matrix is sixteen exact paired cases with alternating arm order and visits on
- [tools/balance/expert-coverage-screen.test.mjs:20](../../tools/balance/expert-coverage-screen.test.mjs#L20): every final-screen night is refused if protected; missing protection input is refused
- [tools/balance/expert-coverage-screen.test.mjs:24](../../tools/balance/expert-coverage-screen.test.mjs#L24): screen fixes the ten-minute whole-job budget and preserves the pre-registered decision verbatim
- [tools/balance/expert-delivery-screen.test.mjs:4](../../tools/balance/expert-delivery-screen.test.mjs#L4): delivery correctness screen fixes one matched off/on pair with priority and coverage off
- [tools/balance/expert-delivery-screen.test.mjs:12](../../tools/balance/expert-delivery-screen.test.mjs#L12): delivery screen refuses protected pairs and fixes five-minute budget and exact gate
- [tools/balance/expert-evaluation-core.test.mjs:17](../../tools/balance/expert-evaluation-core.test.mjs#L17): approved vectors change only their named existing policy choice and exclude protected pairs
- [tools/balance/expert-evaluation-core.test.mjs:28](../../tools/balance/expert-evaluation-core.test.mjs#L28): baseline reuse requires a complete default-policy artifact bound to source, runtime, matrix and cutoff
- [tools/balance/expert-evaluation-core.test.mjs:43](../../tools/balance/expert-evaluation-core.test.mjs#L43): resumption preserves completed cases and rejects a different baseline, vector or corrupt case
- [tools/balance/expert-evaluation-core.test.mjs:59](../../tools/balance/expert-evaluation-core.test.mjs#L59): comparisons keep primary goal improvements distinct from survival tie-breakers
- [tools/balance/expert-guarded-coverage-screen.test.mjs:3](../../tools/balance/expert-guarded-coverage-screen.test.mjs#L3): guarded coverage fixes four paired cases on the KO night with both correctness fixes on
- [tools/balance/expert-guarded-coverage-screen.test.mjs:9](../../tools/balance/expert-guarded-coverage-screen.test.mjs#L9): guarded coverage refuses protected input and fixes its eight-minute gate without tuning
- [tools/balance/expert-known-quest-screen.test.mjs:4](../../tools/balance/expert-known-quest-screen.test.mjs#L4): known-quest screen fixes two paired nights, alternating order and every other control
- [tools/balance/expert-known-quest-screen.test.mjs:17](../../tools/balance/expert-known-quest-screen.test.mjs#L17): known-quest screen refuses either protected pair before producing cases
- [tools/balance/expert-known-quest-screen.test.mjs:21](../../tools/balance/expert-known-quest-screen.test.mjs#L21): known-quest screen fixes ten-minute budget and actual-completion disposition
- [tools/balance/expert-progress.test.mjs:5](../../tools/balance/expert-progress.test.mjs#L5): partial deliveries count each real quest once, not repeated placement farming
- [tools/balance/expert-progress.test.mjs:15](../../tools/balance/expert-progress.test.mjs#L15): a provisional pickup stays recorded without becoming a kept find
- [tools/balance/expert-progress.test.mjs:22](../../tools/balance/expert-progress.test.mjs#L22): ordinary sigil/relic events and invalid IDs do not create quest progress
- [tools/balance/expert-search-core.test.mjs:9](../../tools/balance/expert-search-core.test.mjs#L9): a serialized pending evaluation resumes the exact search trajectory
- [tools/balance/expert-search-core.test.mjs:23](../../tools/balance/expert-search-core.test.mjs#L23): completed priorities dominate every lower partial-progress reward
- [tools/balance/expert-search-core.test.mjs:33](../../tools/balance/expert-search-core.test.mjs#L33): equal wins prefer faster completion while non-wins prefer longer survival
- [tools/balance/expert-search-core.test.mjs:42](../../tools/balance/expert-search-core.test.mjs#L42): invalid domains, results and mismatched checkpoint replies are refused
- [tools/balance/expert-space.test.mjs:7](../../tools/balance/expert-space.test.mjs#L7): deferred quest search retains the fixed quest policy through mutations
- [tools/balance/expert-space.test.mjs:18](../../tools/balance/expert-space.test.mjs#L18): all proposed equipment is one choice per legal slot and never enters matched cases
- [tools/balance/report.test.mjs:8](../../tools/balance/report.test.mjs#L8): observations separate cutoff, KO onset, wave passage and completed phases
- [tools/balance/report.test.mjs:26](../../tools/balance/report.test.mjs#L26): tables keep bag/bpm/island denominators separate and omit censored win times
- [tools/balance/report.test.mjs:57](../../tools/balance/report.test.mjs#L57): ranged observation counts this witch's live casts, excluding melee, expired and other targets
- [tools/balance/survey.test.mjs:18](../../tools/balance/survey.test.mjs#L18): every frozen production cell has exactly one cloud shard, including census ages and gear
- [tools/balance/survey.test.mjs:34](../../tools/balance/survey.test.mjs#L34): untrained experts, first-round leakage and final-heldout contamination fail closed
- [tools/balance/survey.test.mjs:43](../../tools/balance/survey.test.mjs#L43): wave one covers every axis in 24 budgeted shards with distinct short-horizon keys
- [tools/balance/survey.test.mjs:54](../../tools/balance/survey.test.mjs#L54): case/JSONL translation follows createCaseRunner contract, preserving exact external evaluations
- [tools/balance/survey.test.mjs:69](../../tools/balance/survey.test.mjs#L69): merge refuses duplicates, wrong cells, missing shards, missing progression and model drift
- [tools/balance/survey.test.mjs:80](../../tools/balance/survey.test.mjs#L80): wave-two depth is selected from actual map-luck spread, not an automatic full matrix
- [tools/balance/survey.test.mjs:90](../../tools/balance/survey.test.mjs#L90): unsupported is explicit; fixture progression N/A and unresolved retention never become fake zeros
- [tools/balance/survey.test.mjs:100](../../tools/balance/survey.test.mjs#L100): weak feedback keeps all matched maps of a weak cell and never enters final scoring
- [tools/config/format.test.ts:6](../../tools/config/format.test.ts#L6): preserves every tuning value and key order, with byte-stable output
- [tools/config/format.test.ts:14](../../tools/config/format.test.ts#L14): expands object arrays and leaves short numeric vectors inline
- [tools/config/inventory.test.ts:7](../../tools/config/inventory.test.ts#L7): generates the same readable inventory from CRLF and LF and detects drift
- [tools/config/typegen.test.ts:7](../../tools/config/typegen.test.ts#L7): keeps the schema-derived tuning declaration fresh
- [tools/config/typegen.test.ts:11](../../tools/config/typegen.test.ts#L11): preserves enums, records, nullable values and optional keys without adding constraints
- [tools/docs/glossary.test.ts:10](../../tools/docs/glossary.test.ts#L10): reads a note's entries: the bold names opening its lines, each once, in order
- [tools/docs/glossary.test.ts:17](../../tools/docs/glossary.test.ts#L17): is up to date with the notes (node tools/docs/glossary.mjs --write)
- [tools/docs/glossary.test.ts:21](../../tools/docs/glossary.test.ts#L21): names each entry in one note only
- [tools/docs/glossary.test.ts:30](../../tools/docs/glossary.test.ts#L30): has every note in CLAUDE.md's list of notes
- [tools/docs/tables.test.ts:11](../../tools/docs/tables.test.ts#L11): are as the data makes them (node tools/docs/tables.mjs --write)
- [tools/docs/tables.test.ts:15](../../tools/docs/tables.test.ts#L15): each stand in a doc
- [tools/docs/tables.test.ts:20](../../tools/docs/tables.test.ts#L20): fills a block from its table and refuses an unknown one
- [tools/tests/inventory.test.mjs:8](../../tools/tests/inventory.test.mjs#L8): finds aliased nested declarations and parameterized templates without executing
- [tools/tests/inventory.test.mjs:17](../../tools/tests/inventory.test.mjs#L17): ignores declaration-looking strings and records scoped dated comments
- [tools/tests/inventory.test.mjs:25](../../tools/tests/inventory.test.mjs#L25): keeps hard limits above outcome or historical wording
- [tools/tests/inventory.test.mjs:31](../../tools/tests/inventory.test.mjs#L31): only suggests later same-topic evidence and labels it unverified
- [tools/tests/inventory.test.mjs:37](../../tools/tests/inventory.test.mjs#L37): routes protected owner areas and tools
- [tools/tests/inventory.test.mjs:42](../../tools/tests/inventory.test.mjs#L42): semantic groups use explicit membership and preserve undivided file timing
- [tools/tests/inventory.test.mjs:52](../../tools/tests/inventory.test.mjs#L52): semantic review rejects missing examples and duplicate case assignments
- [tools/tests/inventory.test.mjs:59](../../tools/tests/inventory.test.mjs#L59): finds numeric simulated outcomes without relying on survival wording
- [tools/tests/inventory.test.mjs:64](../../tools/tests/inventory.test.mjs#L64): records computed case names without evaluating imported fixture constants
- [tools/tests/inventory.test.mjs:70](../../tools/tests/inventory.test.mjs#L70): system guesses use file ownership rather than incidental words in test prose

<a id="t5"></a>

## T5: Preview and visual-review tool integrity

current rules; 25 declarations; known files: ~2 s of CI; 6 files have unknown timing.

Throwaway Git fixtures, small typed arrays/depth bits, stubbed wrappers and glyph/genome records prove safe tooling and opted-in comparisons. Deterministic shape/ink constants are readability rules, not night outcomes. Art/creature owners should confirm a future acceptance-constant change.

- [tools/leash/sigil-pass.test.mjs:7](../../tools/leash/sigil-pass.test.mjs#L7): review candidates remain within the live grid ink and stroke limits
- [tools/leash/sigil-pass.test.mjs:33](../../tools/leash/sigil-pass.test.mjs#L33): approved squirrel stays apart from snail at each nominal rank and pointer size
- [tools/leash/sigil-pass.test.mjs:41](../../tools/leash/sigil-pass.test.mjs#L41): approved horn differs from the actual dropped-hat pointer mask
- [tools/leash/sigil-pass.test.mjs:56](../../tools/leash/sigil-pass.test.mjs#L56): approved five keep the 24px glyph below the shared crown in its 32px atlas slot
- [tools/refraction/capture-hold.test.cjs:11](../../tools/refraction/capture-hold.test.cjs#L11): holds update state while allowing repeated Post draws and restores inherited render
- [tools/refraction/capture-hold.test.cjs:20](../../tools/refraction/capture-hold.test.cjs#L20): restores an existing runner wrapper descriptor and backdrop even when Post throws
- [tools/refraction/capture-hold.test.cjs:29](../../tools/refraction/capture-hold.test.cjs#L29): diagnostic names actual changed camera state and interleaved/instance buffers at one clock
- [tools/refraction/depth-coverage.test.cjs:6](../../tools/refraction/depth-coverage.test.cjs#L6): real c680 depth bits exclude all9 color-contrast halo pixels without changing contrast24
- [tools/refraction/depth-coverage.test.cjs:14](../../tools/refraction/depth-coverage.test.cjs#L14): equal or farther depth does not create actor front coverage; malformed map rejected
- [tools/refraction/depth-readback.test.cjs:3](../../tools/refraction/depth-readback.test.cjs#L3): keeps adjacent sampled float32 depths distinct instead of re-quantizing to DEPTH24
- [tools/refraction/depth-readback.test.cjs:9](../../tools/refraction/depth-readback.test.cjs#L9): maps screenshot samples through the actual canvas offset rather than assuming origin0
- [tools/refraction/depth-readback.test.cjs:15](../../tools/refraction/depth-readback.test.cjs#L15): reports the complete clamped square including diagonals and original bit identity
- [tools/roster/pixel-diff.test.mjs:5](../../tools/roster/pixel-diff.test.mjs#L5): changed sprite size counts changed opaque pixels instead of null/zero
- [tools/roster/pixel-diff.test.mjs:8](../../tools/roster/pixel-diff.test.mjs#L8): transparent padding uses the sheet's bottom alignment
- [tools/roster/presets.test.mjs:6](../../tools/roster/presets.test.mjs#L6): default-off and unknown switch preserve every production record by identity and hash
- [tools/roster/presets.test.mjs:14](../../tools/roster/presets.test.mjs#L14): opt-in changes only selected genomes, has valid sockets, and leaves source records untouched
- [tools/roster/presets.test.mjs:32](../../tools/roster/presets.test.mjs#L32): legacy beetle resolver requires level and keeps its original elder fallback
- [tools/roster/presets.test.mjs:40](../../tools/roster/presets.test.mjs#L40): shared-hook pack contains complete same-id records and explicit declared elder targets
- [tools/roster/presets.test.mjs:61](../../tools/roster/presets.test.mjs#L61): ordinary corrections survive per-level overrides and restore elder anatomy
- [tools/shots/push.test.ts:30](../../tools/shots/push.test.ts#L30): adds only the named files, whatever is staged or missing in the checkout
- [tools/shots/push.test.ts:39](../../tools/shots/push.test.ts#L39): replaces a file of its own, and a second publish of the same bytes changes nothing
- [tools/shots/push.test.ts:47](../../tools/shots/push.test.ts#L47): built again on the new tip when another builder pushes first, keeping theirs
- [tools/shots/push.test.ts:59](../../tools/shots/push.test.ts#L59): refuses a commit that would delete a path
- [tools/shots/push.test.ts:71](../../tools/shots/push.test.ts#L71): never puts a file where a directory of others' previews is (git won't, and nothing is pushed)
- [tools/shots/push.test.ts:79](../../tools/shots/push.test.ts#L79): keeps to paths on the branch

<a id="t6"></a>

## T6: One mixed replay and fixture-sanity case

hard limits; 1 declarations; historical time unknown.

One declaration runs30/5s real cases plus stun fixtures15/30s. Repeated runs and phase accounting are hard integrity proofs; censored/stunned/hits>0/retaliation>0 predicates also validate the selected scenario. This is not a demonstrated pure outcome test to move wholesale. Exact purpose needs its report/combat owner.

- [tools/balance/report.test.mjs:36](../../tools/balance/report.test.mjs#L36): real-rules replay is deterministic across interleaved bots and bags

## tools-ci: ruling review

- Proof supersession checked: testing.md historical text ‘freezes prototype once and caches its separate build and successful baseline measurement’ is replaced by cost correction6562620628 ‘neither checks out/builds/measures nor caches a prototype baseline’. workflows.test.ts:8 asserts the replacement. Its nightly helper tests do not reinstate the removed PR settle/pixel gate.
- Pixel exception supersession: testing.md6561733936 replaces #1612’s exact-colour exception with at most eight pixels and channel delta32. proofs.test.cjs:30 checks 2small/8at32 pass and9pixels/40channel fail. No removed allowlist requirement remains.
- Art policy supersession: historical creatures.md says cloud art/canonical visual review are release gates; current testing.md says art runs nightly/manual and does not hold builds/releases. workflows.test.ts checks advisory nightly art, standing result and matching-tree reuse. This supports keeping the replacement guards, not deleting them.
- Compatibility is current: roster/presets.test.mjs legacy beetle branch is still implemented in art/roster/presets.js and creatures.md retains beetle Current. comparable old-log and hold-simulation old/new-loop inputs similarly prove compatibility. No whole-case obsolete design was established in these49 files.
- run-unit.test.ts “slowest alone” still follows the current largest-first total-work algorithm for its300s file/150s remaining-work input. A separate case rejects hiding extra work under the longest file. The title alone does not pin the superseded longest-file objective.

<a id="w1"></a>

## W1: Campaign identity and map equivalence

hard limits; 21 declarations; ~313 s of CI.

Assertions compare identity, stable coast/shape, prepared/direct map equality, allowed species and connectivity. The roster case steps12/24 waves plus20s but only prohibits species outside the roster. It is not a win-rate target. Nearby mapPrep:59 prepared/direct continuation equality is another integrity check, not evidence to move the file. Lead additionally read heightSamples.test.ts:14/31/54: preserved quantized buffers, worker/direct rolling equality, immutable cache and malformed/NaN rejection. Its frozen hash is an extraction-parity baseline, with no later replacing terrain ruling established.

- [src/app/arrival.test.ts:16](../../src/app/arrival.test.ts#L16): carries the flight's end to the island's page, once
- [src/app/arrival.test.ts:23](../../src/app/arrival.test.ts#L23): ignores another island's, a stale one, and none
- [src/app/homeGrowth.test.ts:24](../../src/app/homeGrowth.test.ts#L24): 10 -> 11 -> 13 areas at home: the first ones kept, each new kind an area further out, the shape the world's
- [src/app/islandTypes.test.ts:11](../../src/app/islandTypes.test.ts#L11): `are all its roster's, ring and sea too (${island})`
- [src/app/landingBake.test.ts:8](../../src/app/landingBake.test.ts#L8): are home's meadow, the island's own kind, then the rest of its roster, once each
- [src/app/landingBake.test.ts:25](../../src/app/landingBake.test.ts#L25): gives each island in each world its own tree seed, the same every time
- [src/rules/archipelago.test.ts:10](../../src/rules/archipelago.test.ts#L10): is the same for a world each time, and another world's is another
- [src/rules/areaRenames.test.ts:20](../../src/rules/areaRenames.test.ts#L20): keeps each renamed area's creature in its kind's slot (its island and its place on the maps as they were)
- [src/rules/deal.test.ts:54](../../src/rules/deal.test.ts#L54): keeps an island's shapes every night and moves only its types, the rules holding each night
- [src/rules/heightSamples.test.ts:14](../../src/rules/heightSamples.test.ts#L14): retains the original quantised windows at arrival and after small and large moves
- [src/rules/heightSamples.test.ts:31](../../src/rules/heightSamples.test.ts#L31): hydrates the worker window without refilling, preserves rolling continuation and cache immutability
- [src/rules/heightSamples.test.ts:54](../../src/rules/heightSamples.test.ts#L54): rejects incomplete or nonfinite height payloads instead of trusting a cached window
- [src/rules/islandGrowth.test.ts:22](../../src/rules/islandGrowth.test.ts#L22): `phase ${phase}: exactly its areas, joined, home inland, everything for play off the beach`
- [src/rules/islandGrowth.test.ts:39](../../src/rules/islandGrowth.test.ts#L39): the same island for the same seed; another seed, another shape
- [src/rules/land.test.ts:13](../../src/rules/land.test.ts#L13): traces the coast and the lake's shore as two loops, the sea's and the lake's
- [src/rules/mapPrep.test.ts:50](../../src/rules/mapPrep.test.ts#L50): is the map made directly: its data and its closures' answers, for several seeds, worlds and islands
- [src/rules/roster.test.ts:42](../../src/rules/roster.test.ts#L42): a kind's island: every creature made over a night is in its roster
- [src/rules/win.test.ts:240](../../src/rules/win.test.ts#L240): is deterministic: the same island won twice is the same, step for step
- [src/rules/worldSeed.test.ts:17](../../src/rules/worldSeed.test.ts#L17): fixes every island in a world (world 0: the table's own bearings), and moves them all in another
- [src/rules/worldSeed.test.ts:28](../../src/rules/worldSeed.test.ts#L28): keeps an island's shape every night in one world, its insides the night's own; another world, another shape
- [src/rules/worldSeed.test.ts:37](../../src/rules/worldSeed.test.ts#L37): places the creatures by the night too

<a id="w2"></a>

## W2: Coast, lake and zoo boundaries

hard limits; 25 declarations; ~88 s of CI.

Forced toggles, knockout and displacement verify declared landing/shore/fence states. Routing must terminate within its bound without crossing water. Scripted3–90s movement is boundary coverage rather than emergent survival statistics; beach poses are current interaction rules within this predominantly spatial-integrity group.

- [src/rules/beach.test.ts:21](../../src/rules/beach.test.ts#L21): `nothing grows, stands or runs on the sand or in the sea (seed ${seed})`
- [src/rules/beach.test.ts:88](../../src/rules/beach.test.ts#L88): on foot: pushing out against the edge she lies down, and stays down
- [src/rules/beach.test.ts:102](../../src/rules/beach.test.ts#L102): from the treetops: she comes down first
- [src/rules/beach.test.ts:113](../../src/rules/beach.test.ts#L113): never in the woods, nor flying along the beach
- [src/rules/beach.test.ts:147](../../src/rules/beach.test.ts#L147): each spot left alone unless she's near it
- [src/rules/beachDecor.test.ts:46](../../src/rules/beachDecor.test.ts#L46): are found only near her, and only near the beach
- [src/rules/homeGuard.test.ts:56](../../src/rules/homeGuard.test.ts#L56): the final game boundary keeps the guard inside home even after an external displacement
- [src/rules/lakeHold.test.ts:34](../../src/rules/lakeHold.test.ts#L34): has a lake to test on
- [src/rules/lakeHold.test.ts:41](../../src/rules/lakeHold.test.ts#L41): pressing to come down over the water leaves her in the treetops, said by the lakeHold event
- [src/rules/lakeHold.test.ts:52](../../src/rules/lakeHold.test.ts#L52): ashore, the same press brings her down as ever
- [src/rules/lakeHold.test.ts:61](../../src/rules/lakeHold.test.ts#L61): her followers' pull never lands her on the water
- [src/rules/lakes.test.ts:33](../../src/rules/lakes.test.ts#L33): never home or its neighbours, the rest of the island its size and joined
- [src/rules/lakes.test.ts:53](../../src/rules/lakes.test.ts#L53): lies inland: its water well clear of the sea, the island's land one piece round it
- [src/rules/lakes.test.ts:61](../../src/rules/lakes.test.ts#L61): nothing placed for play on the water or its shore
- [src/rules/lakes.test.ts:76](../../src/rules/lakes.test.ts#L76): stops her on foot at the shore, sliding along it; over the water she never lands
- [src/rules/lakes.test.ts:98](../../src/rules/lakes.test.ts#L98): puts every creature on foot back on the shore, sliding toward where it's going; those in the air pass over
- [src/rules/lakes.test.ts:119](../../src/rules/lakes.test.ts#L119): routes a travelling animal round a lake
- [src/rules/lakes.test.ts:175](../../src/rules/lakes.test.ts#L175): lie level in a hollow: one flat water, the ground easing down to it round the shore and never under it
- [src/rules/zooCoast.test.ts:31](../../src/rules/zooCoast.test.ts#L31): keeps its bay: a point in the bay is the street, the land round it the island
- [src/rules/zooCoast.test.ts:42](../../src/rules/zooCoast.test.ts#L42): the fence stops her at the coast itself, in the bay too
- [src/rules/zooCoast.test.ts:53](../../src/rules/zooCoast.test.ts#L53): lays out with the real coasts it's given, and round ones for the rest
- [src/rules/zooFence.test.ts:26](../../src/rules/zooFence.test.ts#L26): on foot she can't walk out of an island, nor into one from the street: she stops at the fence
- [src/rules/zooFence.test.ts:37](../../src/rules/zooFence.test.ts#L37): and not round an undiscovered island's lake either (lakes get fences too)
- [src/rules/zooFence.test.ts:44](../../src/rules/zooFence.test.ts#L44): she rises inside an island and flies over its fence, followers or not, and comes down outside
- [src/rules/zooFence.test.ts:74](../../src/rules/zooFence.test.ts#L74): knocked out on an island, she comes back on the Ent's plaza (home), never inside a fence (Ed, 2026-10-26)

<a id="w3"></a>

## W3: Authored rosters, biomes and lake looks

current rules; 27 declarations; ~118 s of CI.

Roster multiplicities and biome/phase assignments come directly from authored content rules. Equal wave numbers producing equal populations is a direct generation contract, not a played-night victory statistic. Flora exclusions and the no-lake early return need the targeted coverage review recorded in the ruling appendix.

- [src/biomeForests.test.ts:11](../../src/biomeForests.test.ts#L11): has a look for every compass biome, and none for temperate
- [src/biomeForests.test.ts:16](../../src/biomeForests.test.ts#L16): gives every non-temperate kind's island a key its look reads
- [src/biomeForests.test.ts:26](../../src/biomeForests.test.ts#L26): blends two biomes by share
- [src/biomeForests.test.ts:32](../../src/biomeForests.test.ts#L32): tints leaves and bark, keeps a prop's flowers, and leaves snow's jitter out
- [src/biomeForests.test.ts:48](../../src/biomeForests.test.ts#L48): takes its biome's look by its ring: semi-temperate near home, the full look furthest out (Ed, 2026-10-25)
- [src/biomeForests.test.ts:75](../../src/biomeForests.test.ts#L75): mixes the look toward temperate by 1 - strength, and keeps two neighbours' blend
- [src/floraBiomes.test.ts:28](../../src/floraBiomes.test.ts#L28): finds the graded areas
- [src/floraBiomes.test.ts:31](../../src/floraBiomes.test.ts#L31): `${A.id} (ring ${k.phase + 1}, ${k.biome})`
- [src/rules/beach.test.ts:75](../../src/rules/beach.test.ts#L75): off, or on the square map, there's none
- [src/rules/beach.test.ts:123](../../src/rules/beach.test.ts#L123): in every run, a handful of spots spread round the whole coast, never bunched (Ed, 2026-10-06: "always ... only a handful spread around it")
- [src/rules/beachDecor.test.ts:29](../../src/rules/beachDecor.test.ts#L29): are only nature: shells, starfish, a conch, seaweed, pebbles, rocks, and prints of feet, paws, hooves and birds
- [src/rules/coastCamera.test.ts:17](../../src/rules/coastCamera.test.ts#L17): lowers steadily from the normal view 200 m out to beach.camera.angle at the water's edge
- [src/rules/homeGuard.test.ts:39](../../src/rules/homeGuard.test.ts#L39): has none on the home island
- [src/rules/island.test.ts:58](../../src/rules/island.test.ts#L58): peoples each area by its wave alone: the same wave, the same swarm, on a 10-area island and a 50-area one
- [src/rules/kinds.test.ts:22](../../src/rules/kinds.test.ts#L22): puts home and phase 1 in temperate, then 6 kinds in each compass biome, 2 a phase, near its point (Ed, 2026-10-23)
- [src/rules/lakeLooks.test.ts:11](../../src/rules/lakeLooks.test.ts#L11): blends the two compass biomes a bearing lies between
- [src/rules/lakeLooks.test.ts:18](../../src/rules/lakeLooks.test.ts#L18): keeps home's lakes and the inner phases' plain, half the first special phase's, all further out
- [src/rules/lakeLooks.test.ts:25](../../src/rules/lakeLooks.test.ts#L25): blends the volcanic east with its neighbours like every compass point (no island a biome alone)
- [src/rules/lakeLooks.test.ts:35](../../src/rules/lakeLooks.test.ts#L35): deals each lake one of its island's two looks, the same every time
- [src/rules/lakeLooks.test.ts:40](../../src/rules/lakeLooks.test.ts#L40): finds every lake on a real island and gives it a look
- [src/rules/lakes.test.ts:24](../../src/rules/lakes.test.ts#L24): none on home's island (phase 0); from phase 1 some, more by phase
- [src/rules/lakes.test.ts:151](../../src/rules/lakes.test.ts#L151): has koi in some lakes: seeded, all or none at the share's ends
- [src/rules/rosters.test.ts:15](../../src/rules/rosters.test.ts#L15): puts every kind's island one phase after its own, on its bearing, sized by phase, the same every time
- [src/rules/rosters.test.ts:28](../../src/rules/rosters.test.ts#L28): gives each a roster by the rule: its kind plentiful, 1-3 new to its phase, only kinds of its phase or before, each other kind on at most 2 areas (Ed, 2026-10-28)
- [src/rules/rosters.test.ts:102](../../src/rules/rosters.test.ts#L102): draws from islandOf alone: the coast the map makes with the island's seed and the islands' knobs
- [src/rules/rosters.test.ts:115](../../src/rules/rosters.test.ts#L115): gives all 64 kinds an island with a seed, size and roster, 10 to 50 areas by phase
- [src/rules/terrain.test.ts:23](../../src/rules/terrain.test.ts#L23): is seeded, and with ground.layout off the land is the hills alone and trees grow as before

<a id="w4"></a>

## W4: Scenery distributions and sea-life frequencies

outcome stats; 7 declarations; ~200 s of CI.

One pure distribution case and six mixed cases sample coast widths,5–120 finds/km, raggedness ratios, featured scenery≥6/10 islands, ruins mean>4, dolphin starts15–80/300s, kraken rises>4/1500s with<35% active share, or low-ground trees>1.3×high. Preserve direct placement, forbidden-scenery, equality and parameter assertions before moving those statistical components.

- [src/rules/beach.test.ts:43](../../src/rules/beach.test.ts#L43): varies in width round the coast (Ed, 2026-10-06: "more irregularly shaped"): wide bays, narrows, rocky stretches
- [src/rules/beachDecor.test.ts:16](../../src/rules/beachDecor.test.ts#L16): lie on the sand, clear of the woods' edge and out of the sea, sparsely, the same for the same seed
- [src/rules/islandGrowth.test.ts:45](../../src/rules/islandGrowth.test.ts#L45): more irregular phase by phase (Ed, 2026-10-11): home near-round, phase 5 strongly irregular
- [src/rules/rules.test.ts:1851](../../src/rules/rules.test.ts#L1851): leaves out the cut scenery, keeps the playground, and puts the featured scene on most islands
- [src/rules/seaLife.test.ts:15](../../src/rules/seaLife.test.ts#L15): leaps dolphins off the east coast only, in the water north of her, now and then
- [src/rules/seaLife.test.ts:27](../../src/rules/seaLife.test.ts#L27): raises the kraken off the west coast only, rarely, beside or north of her and out in the water
- [src/rules/terrain.test.ts:31](../../src/rules/terrain.test.ts#L31): grows trees thicker in the low ground than on the high

<a id="w5"></a>

## W5: Map resource and test-helper budgets

hard limits; 4 declarations; ~77 s of CI.

The existing hydration guard uses best-of-two measurements over four tuples: each hydration below generation time and summed hydration below0.6×generation. Small-world helpers must clone tuning, give a reason and preserve separate largest-world coverage. The snapshot<4M-character guard is already S2 on the saves page and is not counted again here.

- [src/rules/mapPrep.test.ts:65](../../src/rules/mapPrep.test.ts#L65): is never slower to make than the map itself (Ed's laptop, 2026-10-20): hydrating takes well under generating, home's island too
- [src/test/worlds.test.ts:7](../../src/test/worlds.test.ts#L7): shrinks only a cloned test map without mutating shared production/test tuning
- [src/test/worlds.test.ts:15](../../src/test/worlds.test.ts#L15): requires an answerable reason rather than silently choosing a small world
- [src/test/worlds.test.ts:18](../../src/test/worlds.test.ts#L18): keeps largest-shipped-world area diversity coverage separate from small logic fixtures

<a id="w6"></a>

## W6: Links, travel and explicit transition rules

current rules; 13 declarations; ~91 s of CI.

Explicit URL values override carried sliders; retired wave-pace keys are forgotten. Door/ready and forced-clear transitions check named state and exactly-once pulses. The two generated-bot win/recruitment templates from the original partition remain with #1622, not a duplicate world proposal.

- [src/app/linkParams.test.ts:18](../../src/app/linkParams.test.ts#L18): takes the island's size from ?island= (Ed, 2026-10-11): areas, home, off; ?mapAreas= the radius map
- [src/app/linkParams.test.ts:62](../../src/app/linkParams.test.ts#L62): clamps the link's values
- [src/app/linkParams.test.ts:66](../../src/app/linkParams.test.ts#L66): forgets the old waves' pace key (Ed, 2026-10-08; the pause page's slider keeps its own now: app/settings.ts)
- [src/app/linkParams.test.ts:69](../../src/app/linkParams.test.ts#L69): ?dodge= picks which dodge changes are on (Ed, 2026-10-08), all by default
- [src/app/sail.test.ts:44](../../src/app/sail.test.ts#L44): fall back to today's links: the bed newForestHref's (a new seed, the same island), the bot's exit without ?bot
- [src/app/sail.test.ts:83](../../src/app/sail.test.ts#L83): knows the knobs its link sets itself: ?set= paths and the decisions' d_<id>
- [src/app/sail.test.ts:87](../../src/app/sail.test.ts#L87): carries every slider moved last night but those the next night's link sets itself
- [src/platform/zooPad.test.ts:7](../../src/platform/zooPad.test.ts#L7): Square uses the zoo's in-world exit; Circle is not a parent-side exit action
- [src/rules/guidance.test.ts:110](../../src/rules/guidance.test.ts#L110): something new, newest first, till she's been to it; never the map table during the night, new islands or not (Ed, 2026-10-26: "You don't see it all night")
- [src/rules/guidance.test.ts:133](../../src/rules/guidance.test.ts#L133): after a lost night: the bed, wherever she is, over everything else, unless there's an island she hasn't been to (Ed, 2026-10-26)
- [src/rules/island.test.ts:35](../../src/rules/island.test.ts#L35): plays the waves on any island, the pulse running out after the last stone
- [src/rules/wakeUp.test.ts:148](../../src/rules/wakeUp.test.ts#L148): dressed, the door opens with the island still being built; the spell waits for her decks
- [src/rules/win.test.ts:122](../../src/rules/win.test.ts#L122): the island cleared before the route's end (Ed, 2026-10-12): the lap sets off at once, from where the wave's pulse is, one pulse home and one on to the route's end, each stone firing once; the waves stop

## world-islands-lakes: ruling review

- Set-piece supersession: DESIGN.md Ed3Oct says ‘Set pieces are rare bits of scenery’. world-art.md Ed29Oct says ‘phased out of normal generation (setPieceChance0)’ with recipes/art retained for previews. rules.test.ts:1851 asserts setPiecesNear=[] and paths.pieces=[]: retain those replacement guards and split only statistical scenery thresholds. lakes.test.ts:61 conditionally checks returned set-piece positions; mapPrep closure equality does not require one to spawn. No positive old-generation requirement was found in the97 reviewed tests.
- Home-growth supersession: journey backlog Ed10/11Oct says first10 areas’ ‘places and their kinds’ remain the same; island.md Ed28Oct says ‘keep the route changing, shuffle the creatures and area types, retain the area shapes’. deal.test.ts:54 requires changed type deals with stable shapes; homeGrowth.test.ts:24 compares cell keys and sorted roster, not type-at-cell. They implement the replacement. The rosters comment saying the night ‘only deals its legends’ is stale explanation, not a reason to delete its count/coast protection.
- Placeholder supersession: journey backlog Ed11Oct describes32 kinds and32 placeholders; island.md now says all64 designed. rosters.test.ts:115 still checks64 valid island descriptors; its old placeholder title is stale, while rejecting unknown-01 remains legacy-ID safety. Neither that title nor the64-designed statement proves flora RETHEMING exclusions obsolete.
- G3 review limits: floraBiomes.test.ts:31 excludes11 RETHEMING IDs under a comment saying17; an art/data owner must confirm those exclusions. lakeLooks.test.ts:40 returns early if its sampled island has no lake. These are specific coverage-strengthening candidates, not established obsolete whole tests. This bounded review confirmed zero obsolete whole tests.
- Timing overlaps: mapPrep, beach, beachDecor, islandGrowth, homeGuard, lakes, island, terrain and win appear in multiple groups. File durations include other tests and other systems. No group-time sum is a wall-time or savings estimate.

