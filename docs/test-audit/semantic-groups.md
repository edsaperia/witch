# Semantic review membership and rulings

Reviewed source groups; the separate unreviewed manifest proposes no changes. No test change is authorized. Each group lists source templates, not expanded executions. Durations sum unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.

## saves-replay-robustness: review provenance

Core save, settings and replay setup/assertions reviewed. Borrowed visits and telephone boundaries remain with #1609; this page proposes no gameplay change.

<a id="s1"></a>

## S1: Slot migration and isolation

hard limits; 14 tests; files take <1 s.

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

hard limits; 8 tests; files take ~32 s.

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

hard limits; 10 tests; files take ~4 s.

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

current rules; 16 tests; files take <1 s.

Old broom spells and the broomBay name occur as migration inputs: assertions require the current Classic broom/lathe result. They do not restore obsolete gameplay. Records explicitly require the 29 Oct 100/120 BPM starters. House reviewer additionally verified mushroomStock:6/16/23: slot/campaign isolation, once-only in-flight credit and malformed-state handling.

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
- [src/app/mushroomStock.test.ts:6](../../src/app/mushroomStock.test.ts#L6): keeps mushroom supplies separate between save slots on the same world
- [src/app/mushroomStock.test.ts:16](../../src/app/mushroomStock.test.ts#L16): carries baskets, bags and unloading mushrooms exactly once into a fresh night
- [src/app/mushroomStock.test.ts:23](../../src/app/mushroomStock.test.ts#L23): separates campaigns and rejects malformed stock
- [src/app/recordSave.test.ts:12](../../src/app/recordSave.test.ts#L12): are every 10 bpm from 100 to 200 (Ed, 2026-10-29: "full set from 100 to 200, but only every 10 bpm"); she starts with 100 and 120, the other 9 are finds
- [src/app/recordSave.test.ts:18](../../src/app/recordSave.test.ts#L18): keeps the starting ones always, adds and drops finds, remembers the last chosen while she has it
- [src/app/recordSave.test.ts:28](../../src/app/recordSave.test.ts#L28): with Unlock everything on, offers every record, writing nothing

<a id="s5"></a>

## S5: Campaign progress and personal settings

current rules; 21 tests; files take <1 s.

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

hard limits; 17 tests; files take ~97 s.

Controlled inputs and fake timers prove identical replay, refusal of undeclared divergence, bounded tape/journal storage and exact retention of report text after attachment pressure or transaction failure. The long paused tape and synthetic 16–18 MiB bundles exercise explicit integrity/budget boundaries, not success statistics. The 600-second paused loop advances fake time; no real ten-minute run is needed.

- [src/app/playtestComments.test.ts:25](../../src/app/playtestComments.test.ts#L25): roundtrips the actual played moment and continues from the same random/state cursor
- [src/app/playtestComments.test.ts:42](../../src/app/playtestComments.test.ts#L42): rejects oversized, malformed and wrong-build bundles instead of restoring an approximate link
- [src/app/playtestComments.test.ts:51](../../src/app/playtestComments.test.ts#L51): keeps every report across count pressure and reload; unread storage is never overwritten
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

## legends: review provenance

Core legend and quest setup/assertions reviewed. Combat targeting, charge and route-integration cases remain with #1622; visual sprite checks and bot policies are listed with their corresponding systems. No test changes are made.

<a id="l1"></a>

## L1: Paired-area ownership and sleeping placement

hard limits; 9 tests; files take ~49 s.

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

current rules; 9 tests; files take ~50 s.

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

outcome stats; 8 tests; files take ~87 s.

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

leftovers; 5 tests; files take ~147 s.

The default assertion already requires 0.2. Half, 0.3 and 1 are explicit overrides for the retained radius-map selector; its header says authored islands deal their own legends. This is old-mode coverage, not evidence the default still uses the superseded half-share rule. Explicit earlyQuest=false, questLater=false and stomp=true exercise retained options rather than asserting those are current defaults.

- [src/rules/earlyQuest.test.ts:48](../../src/rules/earlyQuest.test.ts#L48): is off with legends.earlyQuest false: every dream as before
- [src/rules/legendShare.test.ts:21](../../src/rules/legendShare.test.ts#L21): puts one in legends.share of the areas (Ed, 2026-10-08: about a fifth), never home, seeded, spread so they don't clump
- [src/rules/legendShare.test.ts:41](../../src/rules/legendShare.test.ts#L41): puts one in every area but home at 1, and differs by seed
- [src/rules/legends.test.ts:141](../../src/rules/legends.test.ts#L141): with the stomp on, a legend turning angry stamps on its own area's standing soundsystem, after the stomp's longer restless time (Ed, 2026-10-06)
- [src/rules/questLater.test.ts:44](../../src/rules/questLater.test.ts#L44): is the old gamble with legends.questLater false

<a id="l5"></a>

## L5: Pinned list of giants exceeding the old circle cap

leftovers; 1 test; files take ~4 s.

The assertion pins an exact species list and its comment says ‘waiting on Ed's call’. The 26 Oct paired-area/fit design permits the biggest fitting circle and documented elephant exceptions. This needs a current design ruling; it is a stale-looking baseline, not a proven obsolete test.

- [src/rules/legendFit.test.ts:34](../../src/rules/legendFit.test.ts#L34): lists the legends too big for any circle under the cap (waiting on Ed's call: drawn smaller asleep, or the circles allowed bigger)

<a id="l6"></a>

## L6: Quest completion, sleeping state and party-legend rules

current rules; 61 tests; files take ~221 s.

The setup isolates a legend, kin or gift and invokes the explicit transition: waves do not wake legends, kin restore sleep, only a placed sigil completes a quest at any age, no buff is awarded, and the 100-letter Easter egg has its own tether/release rules. Fixed steps here check the declared state/timer/boundary, not an uncontrolled win rate. The staggered five-second kin check is a per-frame work bound. Early-quest wording still says baby, but its assertion explicitly says any age; it does not enforce the retired age requirement. Known-quest and offering policies receive fabricated observations/stack acknowledgements and explicit deadlines; they cannot invent unseen cues. Ending cases advance only the wave/ending clock and force neutralization, checking automatic ending and observed/drawn-pointer agreement, not whether a bot wins a natural night. Dream helpers directly check nearest-kind/compass results and quest-open flags. Slow-time tests force ring entry/exit, held headings and a boundary-crossing letter: clock-rate scaling and exclusion remain direct rules, despite numeric movement checks, rather than sampled battle outcomes. Final previously unread case 277 was read in full: three seeded maps require relics outside clearings, ground-visible glints, treetop visibility exactly equal to canopy clearance, and a moved-under-crown negative check. The open/covered mixture implements DESIGN432’s explicit alternating placement contract; it is not an arbitrary sampled percentage or travel deadline. Keep this current visibility/content rule.

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
- [src/rules/dream.test.ts:10](../../src/rules/dream.test.ts#L10): points at the runestone of the nearest area of the dreamed creature's kind, explored or not
- [src/rules/dream.test.ts:21](../../src/rules/dream.test.ts#L21): reads a legend's restlessness clamped to 0..1, calm when nothing has set it
- [src/rules/dream.test.ts:27](../../src/rules/dream.test.ts#L27): keeps a legend's quest open while it sleeps, soundsystem on or not (Ed, 2026-10-06), unless the rules say otherwise
- [src/rules/dream.test.ts:36](../../src/rules/dream.test.ts#L36): says the way in compass words, north up the screen (toward -z)
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
- [src/rules/legends.test.ts:277](../../src/rules/legends.test.ts#L277): glint only through a gap in the canopy from the treetops, always on the ground; lie out in the woods, some under gaps, some under closed canopy (Ed, 2026-10-05)
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
- [src/rules/slowTime.test.ts:29](../../src/rules/slowTime.test.ts#L29): slows the world to slow.scale on the ground in a sleeping legend's circle, eased over slow.ease, while she keeps her speed
- [src/rules/slowTime.test.ts:49](../../src/rules/slowTime.test.ts#L49): eases back to full speed when she leaves, rises to the treetops, or the legend turns angry; and not at all with slow off
- [src/rules/slowTime.test.ts:70](../../src/rules/slowTime.test.ts#L70): slows creatures outside the circle to a tenth of their pace
- [src/rules/slowTime.test.ts:85](../../src/rules/slowTime.test.ts#L85): keeps enraged creatures out of a sleeping legend's circle, whether she's there or not; not an angry one's
- [src/rules/slowTime.test.ts:111](../../src/rules/slowTime.test.ts#L111): vanishes, in a sparkle, crossing out of the circle from inside
- [src/rules/slowTime.test.ts:116](../../src/rules/slowTime.test.ts#L116): flies on inside it, and in from outside

## legends: ruling review

- Supersession matched to L1: docs/notes/testing.md records the old diagnostic ‘incorrectly required physical cell equality’. Ed's 2026-10-26 replacement: paired areas are ‘one logical area’. sleepCells.test.ts now permits 14 raw differences on the largest fixture but requires zero logical mismatches. Keep the replacement regression; no remaining equality assertion in this reviewed group needs deleting.
- Supersession matched to L4: Ed, 2026-10-06, DESIGN.md: ‘about half of areas’; Ed, 2026-10-08: ‘more like 1/5’. legendShare.test.ts asserts S===0.2 before explicitly constructing half/all comparison maps. Both rulings are accounted for; the old citation alone is not an obsolete default.
- Current sizing ruling, L2/L5: Ed, 2026-10-26, legendFit.test.ts: ‘Legend circles need to be larger. Often legends don't fit in them.’ legendAreas.test.ts checks the authored paired areas, allowing only elephant overflow in its five-map matrix. The exact eleven-giant radius-cap list needs a separate ruling, not an assumed deletion.
- Concrete quest-cap supersession: DESIGN.md Quests are a gamble (6 Oct) describes a five-area tail cap; docs/notes/gameplay.md 31 Oct playtest item13 sets questCap to 0, ‘no distance tail cut’, while ‘Positive explicit caps remain supported and tested at 6’. quest.test.ts:119 already asserts default 0 and explicitly builds cap6 comparison maps. Propose reporting its median ratios, retain default 0/finite-distance protections. The seed162218 regression in questDrop.test.ts explicitly opts into cap6 to preserve Ed’s old coordinates and tests the 19 Oct placed-sigil rule; it does not pin cap6 as default.
- Quest supersession: DESIGN.md Dreams lists the old quest making the placed creature join the area and the old quest closing at its wave (5 Oct); the 6 Oct replacement stays open while asleep, and the 18 Oct replacement keeps the creature hers and grants no buff. quest.test.ts:43/96, questDrop.test.ts:41 and legends.test.ts:251 assert the replacements. No positive removed-buff or wave-closes-quest assertion remains in these reviewed cases.
- Final legend case 277: DESIGN432 cites Ed 5Oct “bottle glint should only show through gaps” and explicitly places every other relic under a gap, the rest under closed canopy. Assertions require both categories on three seeds and compare each glint to canopyOver, including a deliberate under-crown negative placement. The 18Oct flask-use redesign does not supersede this visibility rule; no later cancellation was found in the reviewed notes. This is current authored placement/visibility coverage, not a statistical frequency score.

## art-rendering: review provenance

Read-only semantic review at 9f045ebca, report 6566138102. Includes the UI reviewer’s nine visual-control cases and three additional sprite-integrity cases read by the lead. No rendered appearance or GPU performance is claimed. Second review 6566610088 at 73741aa8: all 123 remaining declarations read, AR4 seven proposed and AR5 116 kept; zero overlap or unread.

<a id="ar1"></a>

## AR1: Sampled animation frequency and variety

outcome stats; 5 tests; files take ~6 s.

120-second quirks,40 IDs/400-second faces,400 dream-symbol turns and 60-second trail hues pin observed shares/diversity. Preserve within-turn holds, valid symbols and alternation before reporting sampled thresholds.

- [src/render/character.test.ts:16](../../src/render/character.test.ts#L16): a quirk plays now and then, for its own length, different creatures at different times
- [src/render/sleepyFace.test.ts:6](../../src/render/sleepyFace.test.ts#L6): is mostly 😴, now and then each of the others
- [src/render/sleepyFace.test.ts:13](../../src/render/sleepyFace.test.ts#L13): holds a face for a turn, and legends don't change together
- [src/render/swoopTrails.test.ts:40](../../src/render/swoopTrails.test.ts#L40): gives each witch her own colours, running along her trail
- [src/render/thoughtCloud.test.ts:51](../../src/render/thoughtCloud.test.ts#L51): by turns: the emoji, then the quest sigil (now and then the flask), then the emoji again

<a id="ar2"></a>

## AR2: Generated appearance and motion smoothness

outcome stats; 7 tests; files take ~25 s.

Mixed tests pin map-wide bark minimums, beach density/share, ride acceleration RMS, far-speaker cohort means, trail activity/height and 85% southern inscription placement. Preserve determinism, no-sea, ground clearance, finite/bounded trails, sizing, fit/non-overlap and readable-scale checks.

- [src/render/barkFaces.test.ts:12](../../src/render/barkFaces.test.ts#L12): at most two trees an area wear one, never home's, the same every time
- [src/render/beachEdge.test.ts:22](../../src/render/beachEdge.test.ts#L22): lines the scalloped edge with shrubs and grass, the odd palm, a few strays on the sand
- [src/render/beachEdge.test.ts:33](../../src/render/beachEdge.test.ts#L33): follows the sand's width along the coast, never into the sea or the decorations' ground
- [src/render/ride.test.ts:13](../../src/render/ride.test.ts#L13): `at full speed (${v} m/s, ${lift} m up) it bobs far less than the ground under her, and her feet never go under it`
- [src/render/soundsystemGen.test.ts:20](../../src/render/soundsystemGen.test.ts#L20): turns each towards the dancefloor (never more than maxYaw from facing us) and makes the further ones bigger
- [src/render/swoopTrails.test.ts:24](../../src/render/swoopTrails.test.ts#L24): are drawn only for witches swooping (or just landed), rise over the treetops, and have no NaN
- [src/render/zooInscriptions.test.ts:26](../../src/render/zooInscriptions.test.ts#L26): every island in the zoo has room for a whole inscription in the street, off every island; south of it nearly always

<a id="ar3"></a>

## AR3: Rendering integrity and current visual contracts

current rules; 495 tests; files take ~231 s.

Read-only source evidence supports current safety/rule/compatibility intent, not an independently dated Ed ruling for every aesthetic constant. Texture/height parity, conservative occlusion, bone/contact geometry, reset/disposal and exact neutral states remain blocking. UI control hashes cover both old-size and adopted-size grids deliberately. Lead-read sprite helpers preserve finite normals/contact/material/breath validation and connected flame effects.

- [src/artLabSizeBundle.test.ts:17](../../src/artLabSizeBundle.test.ts#L17): generated lab resolves occupied body height with size switch %s
- [src/beetleControls.test.ts:23](../../src/beetleControls.test.ts#L23): applies palette and look patches at young levels, retaining the original legend
- [src/beetleControls.test.ts:38](../../src/beetleControls.test.ts#L38): hashes a selected palette change and keeps the new slots non-emissive within the palette row
- [src/beetleControls.test.ts:44](../../src/beetleControls.test.ts#L44): keeps the legend's drawn pixels and normals identical with absent level-3 overrides
- [src/beetleControls.test.ts:49](../../src/beetleControls.test.ts#L49): builds symmetric inward-curving jaws with two teeth and raised away-view tips
- [src/beetleControls.test.ts:61](../../src/beetleControls.test.ts#L61): rejects invalid jaw dimensions and tooth counts
- [src/cheetahLegendAttachment.test.ts:12](../../src/cheetahLegendAttachment.test.ts#L12): keeps the graph active without detaching new effect pixels in frame %s
- [src/creatureShapeControls.test.ts:13](../../src/creatureShapeControls.test.ts#L13): pins %s age %s idle %s with optional controls absent on both size grids
- [src/creatureShapeControls.test.ts:22](../../src/creatureShapeControls.test.ts#L22): changes each mole control independently while explicit unit values preserve Current
- [src/creatureShapeControls.test.ts:28](../../src/creatureShapeControls.test.ts#L28): gates the ground membrane to adult levels and reuses its existing feature
- [src/creatureShapeControls.test.ts:33](../../src/creatureShapeControls.test.ts#L33): keeps walking eye paint and sentinel belly/tip controls independent
- [src/render/aggro.test.ts:5](../../src/render/aggro.test.ts#L5): rises from nothing as they notice her to full as they attack, more in a dangerous area
- [src/render/aggro.test.ts:12](../../src/render/aggro.test.ts#L12): rides in the glow between a blink (-1) and a sleeping legend (under -1.5), and reads back
- [src/render/aggro.test.ts:16](../../src/render/aggro.test.ts#L16): eases out from where it was when the watch ends, gone by its fade, never jumping (Ed, 2026-10-07)
- [src/render/alarm.test.ts:6](../../src/render/alarm.test.ts#L6): is a pixel speaker (#) and a cross (+), every row as wide, inside the ring's 26 px
- [src/render/areaWindow.test.ts:27](../../src/render/areaWindow.test.ts#L27): packs each texel's look, openness and pond in two bytes, read back as the old four channels
- [src/render/areaWindow.test.ts:35](../../src/render/areaWindow.test.ts#L35): keeps her within a step of its middle, moving a whole step at a time, and hands on only the slots it leaves
- [src/render/areaWindow.test.ts:49](../../src/render/areaWindow.test.ts#L49): holds what the shader reads: every texel in its box its own tile's, flown about and teleported, nothing stale
- [src/render/artCache.test.ts:6](../../src/render/artCache.test.ts#L6): isolates the opt-in body size candidate even with the same supplied style hash
- [src/render/artCache.test.ts:11](../../src/render/artCache.test.ts#L11): uses only that kind's fingerprint and preserves existing runtime salts
- [src/render/artCache.test.ts:20](../../src/render/artCache.test.ts#L20): preserves edge scale, invalid party misses and safe unknown-kind misses
- [src/render/artWorker.test.ts:23](../../src/render/artWorker.test.ts#L23): returns a hit with its buffers before loading any drawing code
- [src/render/artWorker.test.ts:30](../../src/render/artWorker.test.ts#L30): keeps cache-only misses, including unkeyed probes, free of drawing imports
- [src/render/artWorker.test.ts:36](../../src/render/artWorker.test.ts#L36): waits for the cache, loads once across concurrent misses, and writes before replying
- [src/render/artWorker.test.ts:46](../../src/render/artWorker.test.ts#L46): keeps the existing error reply when drawing fails
- [src/render/assets.test.ts:18](../../src/render/assets.test.ts#L18): queues one sheet for matching outfits, receives its age-local frames, and requests a new sheet on growth
- [src/render/assets.test.ts:46](../../src/render/assets.test.ts#L46): requires the complete current witch atlas, not a quick preview or an old outfit, for limited landing
- [src/render/assets.test.ts:58](../../src/render/assets.test.ts#L58): drops the last island's waiting sets (its trees, its soundsystems) and keeps the rest
- [src/render/assets.test.ts:77](../../src/render/assets.test.ts#L77): lets an old island's set that lands after the swap come to nothing, and the new island's land
- [src/render/assets.test.ts:101](../../src/render/assets.test.ts#L101): frees the last island's sets once each, and its treehouse if this island's is another
- [src/render/assets.test.ts:118](../../src/render/assets.test.ts#L118): knows which sets are an island's
- [src/render/assets.test.ts:143](../../src/render/assets.test.ts#L143): goes to a free worker at once, though the art ahead's share is full
- [src/render/assets.test.ts:153](../../src/render/assets.test.ts#L153): and the others asked ahead still wait their turn
- [src/render/attackFeel.test.ts:9](../../src/render/attackFeel.test.ts#L9): %s long-charge windup crouches, run/brake stretch, and home releases the pose
- [src/render/attackFeel.test.ts:21](../../src/render/attackFeel.test.ts#L21): pins no-run output bytes across idle, windup, lunge, hit and tumble
- [src/render/attackFeel.test.ts:27](../../src/render/attackFeel.test.ts#L27): is plain when nothing's happening, and fills the Feel it's given
- [src/render/attackFeel.test.ts:32](../../src/render/attackFeel.test.ts#L32): crouches deeper as the wind-up nears its blow
- [src/render/attackFeel.test.ts:39](../../src/render/attackFeel.test.ts#L39): stretches out in a lunge
- [src/render/attackFeel.test.ts:44](../../src/render/attackFeel.test.ts#L44): squashes on a hit, springs back past its shape, then settles
- [src/render/attackFeel.test.ts:50](../../src/render/attackFeel.test.ts#L50): tumbles up and over when knocked back hard, and not when barely nudged
- [src/render/audiencePotion.test.ts:9](../../src/render/audiencePotion.test.ts#L9): enables recipe 64 and restores the original watching settings over the last two game minutes
- [src/render/audiencePotion.test.ts:20](../../src/render/audiencePotion.test.ts#L20): temporarily enables a disabled watcher and fades its lean to zero without mutating tuning
- [src/render/audiencePotion.test.ts:28](../../src/render/audiencePotion.test.ts#L28): exposes bounded local settings and copies independent values
- [src/render/beachEdge.test.ts:18](../../src/render/beachEdge.test.ts#L18): noises as the ground shader's does: 0 to 1, smooth
- [src/render/beachEdge.test.ts:48](../../src/render/beachEdge.test.ts#L48): puts the same plants in the same places wherever she comes from
- [src/render/beachFires.test.ts:15](../../src/render/beachFires.test.ts#L15): `one beside every spot, on clear sand, never in front of her (seed ${seed})`
- [src/render/brewingProps.test.ts:14](../../src/render/brewingProps.test.ts#L14): `preserves RGBA buffers and drawing order for ${state}`
- [src/render/bubbleSight.test.ts:11](../../src/render/bubbleSight.test.ts#L11): shows a near creature's whole, fades it out over the fade band, and none past its range
- [src/render/bubbleSight.test.ts:20](../../src/render/bubbleSight.test.ts#L20): shows none from the treetops, rising, or up in the treehouse, however near
- [src/render/bubbleSight.test.ts:28](../../src/render/bubbleSight.test.ts#L28): starts near enough that any creature she can throw a letter at answers whole, and fades within the screen
- [src/render/bubbleSight.test.ts:34](../../src/render/bubbleSight.test.ts#L34): keeps a dream's own range: a sleeping legend 50 m off still dreams for her on the ground, not in the treehouse
- [src/render/bubbleSight.test.ts:39](../../src/render/bubbleSight.test.ts#L39): eases in and out over `ease` seconds: rising fades a bubble out, landing back in, a new one from nothing
- [src/render/cauldronMaterials.test.ts:6](../../src/render/cauldronMaterials.test.ts#L6): keeps render-target textures bound without cloneUniforms warnings
- [src/render/cauldronMaterials.test.ts:28](../../src/render/cauldronMaterials.test.ts#L28): never lets a reflection write the scene's depth or stencil masks
- [src/render/cauldronMaterials.test.ts:40](../../src/render/cauldronMaterials.test.ts#L40): bounds floor brightness at 38% and leaves invalid strengths at normal brightness
- [src/render/character.test.ts:6](../../src/render/character.test.ts#L6): every species named has a known quirk and sane numbers
- [src/render/character.test.ts:24](../../src/render/character.test.ts#L24): a happy bounce is a hop off the ground and back, never below it
- [src/render/character.test.ts:29](../../src/render/character.test.ts#L29): every species has a quirk a baked frame can show, and every quirk shows and settles back
- [src/render/character.test.ts:39](../../src/render/character.test.ts#L39): an unknown species takes the default
- [src/render/chart/flightClock.test.ts:5](../../src/render/chart/flightClock.test.ts#L5): starts landing grace once at the normal wall-clock end, even when animation dt is clamped
- [src/render/chart/flightClock.test.ts:13](../../src/render/chart/flightClock.test.ts#L13): does not hand over to a still when the slowdown cap expires before preparation finishes
- [src/render/chart/flightClock.test.ts:30](../../src/render/chart/flightClock.test.ts#L30): keeps the readiness barrier when the player skips the camera flight
- [src/render/chart/flightClock.test.ts:41](../../src/render/chart/flightClock.test.ts#L41): preserves an ordinary flight with no readiness hold
- [src/render/chart/islandMesh.test.ts:21](../../src/render/chart/islandMesh.test.ts#L21): makes the normals exactly as three.js's computeVertexNormals does
- [src/render/chart/islandMesh.test.ts:34](../../src/render/chart/islandMesh.test.ts#L34): keeps the triangles three.js would (16-bit indices under 65535 vertices), the land above the water and the lakes at their levels
- [src/render/chart/islandMesh.test.ts:52](../../src/render/chart/islandMesh.test.ts#L52): a bigger grid takes 32-bit indices
- [src/render/chart/moon.test.ts:7](../../src/render/chart/moon.test.ts#L7): rises over the north-west edge as the chart opens, from under the horizon
- [src/render/chart/moon.test.ts:19](../../src/render/chart/moon.test.ts#L19): then goes round once a turn, slowly (3 to 5 minutes)
- [src/render/chart/moon.test.ts:24](../../src/render/chart/moon.test.ts#L24): fills missing knobs from the defaults and keeps the empty band sane
- [src/render/cheer.test.ts:5](../../src/render/cheer.test.ts#L5): hoppers jump-spin, four-legged roll over, flyers loop, the rest wiggle
- [src/render/cheer.test.ts:11](../../src/render/cheer.test.ts#L11): moves within its second and is itself again at either end
- [src/render/chunkyPotion.test.ts:8](../../src/render/chunkyPotion.test.ts#L8): makes recipe 11 chunky at wake, fades in pixel steps, and restores the exact original grid
- [src/render/chunkyPotion.test.ts:19](../../src/render/chunkyPotion.test.ts#L19): uses live lab settings, exports them, and preserves telescope resolution when stopped
- [src/render/coastReadiness.test.ts:3](../../src/render/coastReadiness.test.ts#L3): measures the real wait while the visible coast holds its phase on a paused repaint
- [src/render/coastReadiness.test.ts:14](../../src/render/coastReadiness.test.ts#L14): does not compile before coast demand and starts only once across leaving/returning
- [src/render/coastReadiness.test.ts:19](../../src/render/coastReadiness.test.ts#L19): keeps continuous fallback while linking and cannot pop fully visible across a driver stall
- [src/render/coastReadiness.test.ts:28](../../src/render/coastReadiness.test.ts#L28): keeps the fast/cache-ready path immediate if no fallback frame was needed
- [src/render/conga.test.ts:9](../../src/render/conga.test.ts#L9): every species has a body to dance it with
- [src/render/conga.test.ts:17](../../src/render/conga.test.ts#L17): each body moves its own way: no two bodies' bars alike
- [src/render/conga.test.ts:23](../../src/render/conga.test.ts#L23): stays in bounds: on or over the ground, squash and stretch gentle, always leaning in
- [src/render/conga.test.ts:34](../../src/render/conga.test.ts#L34): on the beat, a bar of three steps and a kick, the kick biggest; flyers stay up, snails and snakes on the ground
- [src/render/conga.test.ts:44](../../src/render/conga.test.ts#L44): the step ripples back down the line: the one behind does it RIPPLE beats later
- [src/render/creatureArt.party.test.ts:21](../../src/render/creatureArt.party.test.ts#L21): requests exactly the selected age in both facings with the unchanged outfit and pose inputs
- [src/render/crown.test.ts:26](../../src/render/crown.test.ts#L26): has rooms to walk into
- [src/render/crown.test.ts:28](../../src/render/crown.test.ts#L28): opens a room's cut over cutFade seconds as she comes in, not at once, and closes it the same as she leaves
- [src/render/crown.test.ts:48](../../src/render/crown.test.ts#L48): clears nothing once she's out of the house
- [src/render/crown.test.ts:56](../../src/render/crown.test.ts#L56): crossfades from one room to the next, and back into the one just left from where its fade had got to
- [src/render/crown.test.ts:70](../../src/render/crown.test.ts#L70): with cutFade 0, cuts at once as before
- [src/render/crown.test.ts:78](../../src/render/crown.test.ts#L78): cuts the forest's hole round her, where she's drawn, opening as she comes in and closing as she goes out
- [src/render/crownMask.test.ts:9](../../src/render/crownMask.test.ts#L9): has a field for every unlocked room and every branch, and none for a locked room
- [src/render/crownMask.test.ts:15](../../src/render/crownMask.test.ts#L15): is clear on its room's own floor and closed far from it
- [src/render/dodgeEcho.test.ts:16](../../src/render/dodgeEcho.test.ts#L16): creates only bounded silhouette batches from borrowed atlas textures and preserves snapshot pose/lean
- [src/render/dodgeEcho.test.ts:29](../../src/render/dodgeEcho.test.ts#L29): keeps world feet fixed while the camera's billboard up changes
- [src/render/dodgeEcho.test.ts:39](../../src/render/dodgeEcho.test.ts#L39): releases owned resources on reset/appearance change without disposing a shared texture
- [src/render/dodgeEcho.test.ts:46](../../src/render/dodgeEcho.test.ts#L46): reproduces the invalid mesh-hide OFF capture and provides a history-preserving capture toggle
- [src/render/dodgeEcho.test.ts:64](../../src/render/dodgeEcho.test.ts#L64): records each real blink source when the default charge chain starts before any arrival was drawn
- [src/render/dodgeEchoIntegration.test.ts:9](../../src/render/dodgeEchoIntegration.test.ts#L9): captures the supplied body, clears for comfort and island reset, and never replays the held dodge
- [src/render/dodgeEchoModel.test.ts:10](../../src/render/dodgeEchoModel.test.ts#L10): freezes actual sampled departure poses and adds only the visible arrival, never a fabricated gap pose
- [src/render/dodgeEchoModel.test.ts:17](../../src/render/dodgeEchoModel.test.ts#L17): does not duplicate a held dash through paused frames and fades/expires on its clock
- [src/render/dodgeEchoModel.test.ts:24](../../src/render/dodgeEchoModel.test.ts#L24): starts a full arrival lifetime when she actually reappears after the real 0.2s gap
- [src/render/dodgeEchoModel.test.ts:34](../../src/render/dodgeEchoModel.test.ts#L34): bounds repeated dodges and never restarts an expired event seen by a late frame
- [src/render/dodgeEchoModel.test.ts:41](../../src/render/dodgeEchoModel.test.ts#L41): clears old atlas poses on costume/island changes and time rewind
- [src/render/dodgeEchoModel.test.ts:47](../../src/render/dodgeEchoModel.test.ts#L47): does not resurrect a dash after quality/comfort re-enable, and does not mutate captured pose payloads
- [src/render/fireworksWin.test.ts:5](../../src/render/fireworksWin.test.ts#L5): a peony is a rainbow round its burst; a ring gold outside and silver in; a willow gold glitter; a crackle silver strobes
- [src/render/floors.test.ts:12](../../src/render/floors.test.ts#L12): keeps ordinary terrain and the coast under placed stumps before, during and after a skylight trip
- [src/render/floors.test.ts:26](../../src/render/floors.test.ts#L26): draws a floor after the ground and before creatures, scenery and shadows, writing no depth
- [src/render/forestCountsPotion.test.ts:16](../../src/render/forestCountsPotion.test.ts#L16): holds scenery and audio between real beats and advances both at the boundary
- [src/render/forestCountsPotion.test.ts:22](../../src/render/forestCountsPotion.test.ts#L22): follows tempo ramps and lab beat subdivisions
- [src/render/forestCountsPotion.test.ts:30](../../src/render/forestCountsPotion.test.ts#L30): fades presentation only and restores the exact normal clock after expiry or Stop
- [src/render/forestCountsPotion.test.ts:39](../../src/render/forestCountsPotion.test.ts#L39): overrides mist drift locally without freezing shared lighting time
- [src/render/fx/model.test.ts:9](../../src/render/fx/model.test.ts#L9): covers every existing element and form with distinct ramps and movement
- [src/render/fx/model.test.ts:23](../../src/render/fx/model.test.ts#L23): has one monotonic intensity ladder
- [src/render/fx/model.test.ts:27](../../src/render/fx/model.test.ts#L27): stamps all six channels independently and fully clears in seconds
- [src/render/fx/model.test.ts:34](../../src/render/fx/model.test.ts#L34): keeps overlapping world cells on scroll, clears newly exposed slots, and never wraps distant stamps
- [src/render/fx/model.test.ts:41](../../src/render/fx/model.test.ts#L41): ranks a stronger nearby light above a remote weak one
- [src/render/fx/native.test.ts:6](../../src/render/fx/native.test.ts#L6): every adapter names a real family/form and a bounded intensity
- [src/render/fx/native.test.ts:14](../../src/render/fx/native.test.ts#L14): supports early-return native shaders without inserting statements into if/else
- [src/render/fx/native.test.ts:23](../../src/render/fx/native.test.ts#L23): binds each family's four-tone ramp without touching native geometry
- [src/render/fx/system.test.ts:9](../../src/render/fx/system.test.ts#L9): caps signature screen response and disables it with reduce flashing
- [src/render/fx/system.test.ts:15](../../src/render/fx/system.test.ts#L15): bounds lights, eases in, respects world reservation and fades completely
- [src/render/fx/system.test.ts:28](../../src/render/fx/system.test.ts#L28): drops imprints and reduces lights with quality, resets on a new island
- [src/render/fx/system.test.ts:37](../../src/render/fx/system.test.ts#L37): never changes gameplay or leaves a persistent imprint after its lifetime
- [src/render/fxMockModel.test.ts:4](../../src/render/fxMockModel.test.ts#L4): covers the four forms at three strengths
- [src/render/fxMockModel.test.ts:8](../../src/render/fxMockModel.test.ts#L8): eases the blast and lets the tree thaw before the next blast
- [src/render/fxMockModel.test.ts:19](../../src/render/fxMockModel.test.ts#L19): never displaces world lights or exceeds either cap
- [src/render/fxMockModel.test.ts:24](../../src/render/fxMockModel.test.ts#L24): keeps the original row and alpha codes in the frost row
- [src/render/glades.test.ts:9](../../src/render/glades.test.ts#L9): dims the forest and takes her glow inside a circle on the ground
- [src/render/glades.test.ts:15](../../src/render/glades.test.ts#L15): leaves the light as it is inside a circle over the treetops (Ed: ground mode only)
- [src/render/glades.test.ts:21](../../src/render/glades.test.ts#L21): eases both ways rather than snapping
- [src/render/glades.test.ts:29](../../src/render/glades.test.ts#L29): leaves the light alone outside every circle
- [src/render/glades.test.ts:32](../../src/render/glades.test.ts#L32): shows the clearings' twilight only on the ground; over the treetops the light is as it is
- [src/render/gpuLedger.test.ts:21](../../src/render/gpuLedger.test.ts#L21): knows each format's bytes a texel
- [src/render/gpuLedger.test.ts:31](../../src/render/gpuLedger.test.ts#L31): counts uploads by their own format, re-uploads in place, mipmaps and frees
- [src/render/gpuLedger.test.ts:49](../../src/render/gpuLedger.test.ts#L49): counts storage's levels, a cube's six faces, an image source and render buffers
- [src/render/gpuLedger.test.ts:64](../../src/render/gpuLedger.test.ts#L64): reports by kind: labelled textures, drawn-into ones as targets, the rest other, the canvas apart
- [src/render/gpuLedger.test.ts:82](../../src/render/gpuLedger.test.ts#L82): reads GL's out-of-memory error, and forgets everything when the context is lost
- [src/render/gpuLedger.test.ts:97](../../src/render/gpuLedger.test.ts#L97): goes with the window's pixels, between its floor and ceiling
- [src/render/groundFamily.test.ts:6](../../src/render/groundFamily.test.ts#L6): keeps each fixed ground extra independent and diagnostics conservative
- [src/render/groundFamily.test.ts:15](../../src/render/groundFamily.test.ts#L15): assigns stable distinct defines for every extra mask without changing lake/beach selection
- [src/render/groundFamily.test.ts:27](../../src/render/groundFamily.test.ts#L27): selects each lake kind independently with stable combination ordering
- [src/render/groundFamily.test.ts:38](../../src/render/groundFamily.test.ts#L38): retains all kinds for unknown, forced, zoo and mutable diagnostic views
- [src/render/hatFlight.test.ts:5](../../src/render/hatFlight.test.ts#L5): starts at her head and lies beside where she went down at the end
- [src/render/hatFlight.test.ts:10](../../src/render/hatFlight.test.ts#L10): only ever comes down, sways side to side on the way, and rocks as it swings
- [src/render/hatIcons.test.ts:15](../../src/render/hatIcons.test.ts#L15): every one 13 by 13, inked, and named after a hat spell
- [src/render/hatIcons.test.ts:20](../../src/render/hatIcons.test.ts#L20): every built hat spell but the plain hat has one
- [src/render/hatIcons.test.ts:23](../../src/render/hatIcons.test.ts#L23): the Dowsing flask fits the cue's box
- [src/render/headPoint.test.ts:11](../../src/render/headPoint.test.ts#L11): is the middle of its eyes where they show
- [src/render/headPoint.test.ts:15](../../src/render/headPoint.test.ts#L15): turned away (no eyes), the middle of its topmost rows
- [src/render/headPoint.test.ts:21](../../src/render/headPoint.test.ts#L21): nothing drawn, nowhere
- [src/render/headPoint.test.ts:22](../../src/render/headPoint.test.ts#L22): on every species' baked frames, inside the sprite
- [src/render/height.test.ts:32](../../src/render/height.test.ts#L32): relocates the arrival window in slices with exactly the synchronous samples
- [src/render/height.test.ts:45](../../src/render/height.test.ts#L45): the hills' noise stays within its amplitude and is seeded
- [src/render/height.test.ts:49](../../src/render/height.test.ts#L49): heightAt agrees with the samples the shaders read, between and on samples
- [src/render/height.test.ts:61](../../src/render/height.test.ts#L61): is level over the dancefloor's clearing and speakers
- [src/render/height.test.ts:65](../../src/render/height.test.ts#L65): paths are level across (but where two lines meet)
- [src/render/height.test.ts:77](../../src/render/height.test.ts#L77): moving the window keeps the heights where they were
- [src/render/height.test.ts:82](../../src/render/height.test.ts#L82): is flat with the hills off
- [src/render/height.test.ts:87](../../src/render/height.test.ts#L87): at 40 m hills (Ed, v289) the dancefloor is still level and paths level across
- [src/render/height.test.ts:102](../../src/render/height.test.ts#L102): no ground rises past the camera's sightline to her, and no cliffs (Ed, v289, v297)
- [src/render/height.test.ts:125](../../src/render/height.test.ts#L125): stores exactly the slope-limited heights when filled a block at a time, moving and working ahead (the fast path)
- [src/render/height.test.ts:145](../../src/render/height.test.ts#L145): is the same whichever way it was visited (ponds' levels don't depend on what was made first)
- [src/render/height.test.ts:155](../../src/render/height.test.ts#L155): are level: their ground varies by under 10 cm across, with the game's own hills (but where a path grazes one's rim, levelled across the path)
- [src/render/hiz.test.ts:8](../../src/render/hiz.test.ts#L8): only ever calls a rectangle hidden when every pixel in it is behind the occluders (many sizes, maps and rectangles)
- [src/render/hiz.test.ts:31](../../src/render/hiz.test.ts#L31): each level holds the farthest of what's under it, odd edges included
- [src/render/hologram.test.ts:5](../../src/render/hologram.test.ts#L5): steps at 75%, 50% and 25% of the soundsystem's health, as the projector's art does
- [src/render/homeArt.test.ts:15](../../src/render/homeArt.test.ts#L15): carrier-free Ent and oak baseline
- [src/render/homeArt.test.ts:27](../../src/render/homeArt.test.ts#L27): `steps as she walks${bare ? " (her hat off: the first morning's frames)" : ""}`
- [src/render/horizonLead.test.ts:16](../../src/render/horizonLead.test.ts#L16): `bend ${k}, camera ${distance} m back: anything the next frame shows over the horizon is drawn this frame`
- [src/render/horizonLead.test.ts:32](../../src/render/horizonLead.test.ts#L32): a metre's lead when the camera stands still
- [src/render/houseArt.test.ts:48](../../src/render/houseArt.test.ts#L48): `gives the same pixels as the two whole passes did (${mpp} m texels)`
- [src/render/houseArt.test.ts:60](../../src/render/houseArt.test.ts#L60): traces the same outline for the walls with the blocks clear of the floor left out
- [src/render/houseArtLayout.test.ts:12](../../src/render/houseArtLayout.test.ts#L12): leaves default payload and cache-key bytes unchanged, and separates stable opted-in configs
- [src/render/houseArtLayout.test.ts:23](../../src/render/houseArtLayout.test.ts#L23): keeps the original DJ pixel/normal hashes at zero rotation and rotates attachment coordinates rigidly
- [src/render/houseDecor.test.ts:10](../../src/render/houseDecor.test.ts#L10): gives each room a middle density (Ed's pick): a rug and up to six pieces, two or more in the bigger rooms (the small hubs crowded with branches, and the busy Workshop, take what fits)
- [src/render/houseDecor.test.ts:18](../../src/render/houseDecor.test.ts#L18): puts every piece on its room's floor by the wall, clear of the doorways, the ways in and every object's reach
- [src/render/houseDecor.test.ts:31](../../src/render/houseDecor.test.ts#L31): is the same every load, and faces each piece into its room, never away from the camera
- [src/render/houseDecor.test.ts:37](../../src/render/houseDecor.test.ts#L37): draws every kind, the lights lit
- [src/render/houseFurniture.test.ts:17](../../src/render/houseFurniture.test.ts#L17): draws every object of the house as art (none left a box)
- [src/render/houseFurniture.test.ts:21](../../src/render/houseFurniture.test.ts#L21): draws each from its footprint, in every state: on the floor, about its footprint's size, its lights on it
- [src/render/houseFurniture.test.ts:39](../../src/render/houseFurniture.test.ts#L39): knows every state her kit can put the desk and the lathe in, so the house asks for them all up front (rules/kit.ts)
- [src/render/houseFurniture.test.ts:47](../../src/render/houseFurniture.test.ts#L47): draws the Studio's instruments (Ed, 2026-10-23: a glam-rock drum kit, a retro wall of synths, the mic under its spot lamp) at their planned footprints, the lamp marked for the view's light
- [src/render/houseFurniture.test.ts:55](../../src/render/houseFurniture.test.ts#L55): draws the Workshop's pieces (Hotel's, Ed's OK 2026-10-23) with their marks for Hotel's broom and parts: the bay's and the lathe's rest, the biome board's nine cells in rows from the top left
- [src/render/houseFurniture.test.ts:64](../../src/render/houseFurniture.test.ts#L64): faces into its room, towards its middle, and never shows its back to the camera; its footprint as the art's, along its wall
- [src/render/houseFurniture.test.ts:74](../../src/render/houseFurniture.test.ts#L74): is twice a real piece's size (Ed, 2026-10-23: "about 2x, as big as in her old creator bedroom"): the bed about 4 m by 5 m
- [src/render/houseOrder.test.ts:11](../../src/render/houseOrder.test.ts#L11): draw after their own rug, wherever it stands, and before their half's near rails
- [src/render/houseOrder.test.ts:19](../../src/render/houseOrder.test.ts#L19): with the rug not baked yet, still after any furniture of their half (and before its near rails)
- [src/render/houseOrder.test.ts:26](../../src/render/houseOrder.test.ts#L26): have their label above them, not across their row
- [src/render/houseStanding.test.ts:16](../../src/render/houseStanding.test.ts#L16): preserves every original corner, colour, layer and order without rounding
- [src/render/houseStanding.test.ts:24](../../src/render/houseStanding.test.ts#L24): regenerates exact geometry when shipped wall height changes
- [src/render/houseStanding.test.ts:32](../../src/render/houseStanding.test.ts#L32): refuses to silently flatten a future nonvertical upright
- [src/render/houseStanding.test.ts:37](../../src/render/houseStanding.test.ts#L37): preserves placed upright quads on island seed %s
- [src/render/hueSpinPotion.test.ts:15](../../src/render/hueSpinPotion.test.ts#L15): rotates colours, preserves neutrals and completes a cycle
- [src/render/hueSpinPotion.test.ts:22](../../src/render/hueSpinPotion.test.ts#L22): shares the cycle with existing audio and respects controls and paused game time
- [src/render/hueSpinPotion.test.ts:29](../../src/render/hueSpinPotion.test.ts#L29): starts at wake, fades both picture and audio, and clears on Stop or replacement
- [src/render/impact.test.ts:6](../../src/render/impact.test.ts#L6): flashes white an instant and squashes, springing back; with reduce-flashing on, no flash and a gentler squash
- [src/render/impact.test.ts:25](../../src/render/impact.test.ts#L25): pops a slot in small, overshooting and settling at its size
- [src/render/impact.test.ts:32](../../src/render/impact.test.ts#L32): holds the picture once the frame after the filling 💌 has been drawn, for the hitstop's seconds
- [src/render/indicator.bend.test.ts:23](../../src/render/indicator.bend.test.ts#L23): `bend ${k}: far north is up, south down, east right, west left`
- [src/render/indicator.bend.test.ts:39](../../src/render/indicator.bend.test.ts#L39): a target near her, in view, isn't cued at the edge
- [src/render/indicator.test.ts:5](../../src/render/indicator.test.ts#L5): hides its distance from accessibility as well as sight, then restores it when visible
- [src/render/indicator.test.ts:27](../../src/render/indicator.test.ts#L27): `points toward a stone at (${dx}, ${dy})`
- [src/render/indicator.test.ts:39](../../src/render/indicator.test.ts#L39): never lets two cues on the edge sit on one another, nudging the later one along the edge
- [src/render/indicator.test.ts:53](../../src/render/indicator.test.ts#L53): points straight down at it, its tip under the ring
- [src/render/indicator.test.ts:59](../../src/render/indicator.test.ts#L59): sits beside another pin over the same spot, not on it
- [src/render/invitePixels.test.ts:7](../../src/render/invitePixels.test.ts#L7): is the sprite itself, pixel for pixel, unturned at full size
- [src/render/invitePixels.test.ts:10](../../src/render/invitePixels.test.ts#L10): turns a quarter clockwise on the screen, as CSS's rotate does
- [src/render/invitePixels.test.ts:14](../../src/render/invitePixels.test.ts#L14): lies flat by taking every other row at half height, never blending two
- [src/render/invitePixels.test.ts:17](../../src/render/invitePixels.test.ts#L17): leaves the corners a turned sprite doesn't reach empty
- [src/render/inviteRing.test.ts:21](../../src/render/inviteRing.test.ts#L21): does not fill a baby invitation meter
- [src/render/inviteRing.test.ts:28](../../src/render/inviteRing.test.ts#L28): has a slot for every hit its level's meter takes, and its filled slots are the meter's hits
- [src/render/inviteRing.test.ts:39](../../src/render/inviteRing.test.ts#L39): joins one envelope a hit into the next gap, a full ring stuns it, and the next 💌 turns the ring to hearts as the creature is won over (then its rune, not a second ring)
- [src/render/inviteRing.test.ts:63](../../src/render/inviteRing.test.ts#L63): left alone, the meter drains and the envelopes drop out of orbit one at a time, last first, as it does
- [src/render/invites.test.ts:15](../../src/render/invites.test.ts#L15): leaves her hand as drawn: over her drawn feet by her hand's height, in the world
- [src/render/invites.test.ts:22](../../src/render/invites.test.ts#L22): flies on from there as the rules fly it, on the house's floor, never down at the ground 22 m below
- [src/render/invites.test.ts:32](../../src/render/invites.test.ts#L32): outside the house, is drawn where the rules have it
- [src/render/island.test.ts:54](../../src/render/island.test.ts#L54): the height field lets go of its texture only, leaving the shaders' uniform to the next field
- [src/render/island.test.ts:62](../../src/render/island.test.ts#L62): the ley lines let go of every geometry and material of their lines and sparklers
- [src/render/island.test.ts:69](../../src/render/island.test.ts#L69): the dancefloor lets go of its ball's, beam's and motes' geometries and materials
- [src/render/island.test.ts:76](../../src/render/island.test.ts#L76): the paths let go of their meshes' geometries and materials and their strips' textures
- [src/render/island.test.ts:89](../../src/render/island.test.ts#L89): the minimap takes its canvas off the page
- [src/render/island.test.ts:96](../../src/render/island.test.ts#L96): the map table lets go of its disc's geometry and material
- [src/render/island.test.ts:105](../../src/render/island.test.ts#L105): built off the scene, go in only as they're attached, their hills then the field in use
- [src/render/island.test.ts:117](../../src/render/island.test.ts#L117): are built under one root in the scene, and its dispose takes them all out and lets go of all of them
- [src/render/koIris.test.ts:7](../../src/render/koIris.test.ts#L7): plays only inside the teleport, with a hat, without reduced motion
- [src/render/koIris.test.ts:14](../../src/render/koIris.test.ts#L14): closes onto the hat, turns it into a spinning record, cuts with a smear at the midpoint, and opens on her at the decks
- [src/render/koIris.test.ts:26](../../src/render/koIris.test.ts#L26): has her at her decks from the cut when it plays, as late in the teleport as before when it doesn't
- [src/render/landingReadiness.test.ts:5](../../src/render/landingReadiness.test.ts#L5): only the fully drawable witch can extend an expired grace, not house/props readiness
- [src/render/landingReadiness.test.ts:12](../../src/render/landingReadiness.test.ts#L12): keeps warm art unchanged, fades late art after it arrives and resets between islands
- [src/render/landingReadiness.test.ts:27](../../src/render/landingReadiness.test.ts#L27): does not turn a late art upload stall into an immediate full-opacity pop
- [src/render/landingReadiness.test.ts:33](../../src/render/landingReadiness.test.ts#L33): never leaves any configured room, corridor or terrace bound outside the temporary floor
- [src/render/leash/bareSlot.test.ts:23](../../src/render/leash/bareSlot.test.ts#L23): `${species}: rasterizes each plain/crowned glyph once, with unchanged ink`
- [src/render/leash/bareSlot.test.ts:43](../../src/render/leash/bareSlot.test.ts#L43): keeps cached plain, bold and crowned slots distinct when bold is toggled
- [src/render/leash/bold.test.ts:8](../../src/render/leash/bold.test.ts#L8): each a species with a sigil, its points in the unit box
- [src/render/leash/bold.test.ts:19](../../src/render/leash/bold.test.ts#L19): fills its grid: most of it across and down, ink a tenth to a half of it, strokes two pixels thick
- [src/render/leash/bold.test.ts:32](../../src/render/leash/bold.test.ts#L32): no two alike: every pair differs in at least a third of their ink
- [src/render/leash/glyphGain.test.ts:12](../../src/render/leash/glyphGain.test.ts#L12): tells a glyph from the soft dot and the solid square
- [src/render/leash/glyphGain.test.ts:18](../../src/render/leash/glyphGain.test.ts#L18): dims glyphs by glyphGain and leaves the dots and squares be
- [src/render/leash/glyphGain.test.ts:31](../../src/render/leash/glyphGain.test.ts#L31): ships under the bloom's threshold with no halos (Ed's pick B)
- [src/render/leash/groundedFlash.test.ts:6](../../src/render/leash/groundedFlash.test.ts#L6): flashes solid twice from the event, with a dotted gap between, and is dotted again after
- [src/render/leash/groundedFlash.test.ts:16](../../src/render/leash/groundedFlash.test.ts#L16): is over by the time she's back on the ground and settled (render/view/witch.ts groundedHop: down by 0.42 s, still by 0.6 s)
- [src/render/leash/ranks.test.ts:8](../../src/render/leash/ranks.test.ts#L8): a youth's dots are its berries to adult less the last (eaten at a placed sigil), read from the rules
- [src/render/leash/ranks.test.ts:19](../../src/render/leash/ranks.test.ts#L19): at most two rows of four drawn, lit in proportion
- [src/render/leash/ranks.test.ts:24](../../src/render/leash/ranks.test.ts#L24): only a youth has dots
- [src/render/leash/ranks.test.ts:27](../../src/render/leash/ranks.test.ts#L27): two rows off to the right, at most four a row, the rows interlocking
- [src/render/leash/ranks.test.ts:34](../../src/render/leash/ranks.test.ts#L34): ranks: babies purple on either side; enemies three reds, friends three blues, each muted to vivid, the legend the most saturated (Ed, 2026-10-29)
- [src/render/leash/ranks.test.ts:50](../../src/render/leash/ranks.test.ts#L50): only a legend's sigil shines: a glint sweeping across it a while every period, each its own
- [src/render/leash/ranks.test.ts:59](../../src/render/leash/ranks.test.ts#L59): a rune stone takes its area's top rank among those home, not hers; unlit with nobody home
- [src/render/leash/ranks.test.ts:73](../../src/render/leash/ranks.test.ts#L73): a sleeping legend's sigil is the baby's purple, neutral; awake, its side's colour again (Ed, 2026-10-29)
- [src/render/leash/ranks.test.ts:83](../../src/render/leash/ranks.test.ts#L83): every legend's sigil wears the one crown, no one else's; the crown reads at stack size
- [src/render/leash/slashes.test.ts:8](../../src/render/leash/slashes.test.ts#L8): are three torn strokes, the first longest, each inside the canvas and apart from the others
- [src/render/leash/slashes.test.ts:20](../../src/render/leash/slashes.test.ts#L20): shows one slash per hit taken, none while she's whole
- [src/render/leash/slashes.test.ts:28](../../src/render/leash/slashes.test.ts#L28): cuts the newest in with a flash, then drains it from its upper tip in step with the repair
- [src/render/leash/slashes.test.ts:36](../../src/render/leash/slashes.test.ts#L36): draws smaller for a far camera, still three strokes inside its canvas, each a pixel per pixel
- [src/render/leash/slashes.test.ts:44](../../src/render/leash/slashes.test.ts#L44): shows three slashes at most: the fourth hit knocks her out, the three standing whole
- [src/render/leash/stones.test.ts:8](../../src/render/leash/stones.test.ts#L8): keeps nearby notes at their authored size and distant notes at the minimum screen width
- [src/render/leash/stones.test.ts:13](../../src/render/leash/stones.test.ts#L13): the column climbs from just over the stone, each sigil its size, none overlapping
- [src/render/leash/stones.test.ts:19](../../src/render/leash/stones.test.ts#L19): the analyser's bars follow the music: the bass at the ring's front, mirrored left and right, silent with silence
- [src/render/leash/stones.test.ts:31](../../src/render/leash/stones.test.ts#L31): both ends pinned, its links their length, held up off the ground toward its bow, never under it
- [src/render/leash/stones.test.ts:42](../../src/render/leash/stones.test.ts#L42): gains and loses links at the creature's end; laid afresh on a jump; settles (no runaway)
- [src/render/leash/stones.test.ts:57](../../src/render/leash/stones.test.ts#L57): a tether's held length bows up as she comes closer
- [src/render/leash/stones.test.ts:67](../../src/render/leash/stones.test.ts#L67): picks the nearest of the angles, a link the same turned round
- [src/render/leash/travelPose.test.ts:6](../../src/render/leash/travelPose.test.ts#L6): lays links in sigil order around a route corner at the ordinary link spacing
- [src/render/leash/travelPose.test.ts:12](../../src/render/leash/travelPose.test.ts#L12): starts each transition at the current pose, including a rejoin halfway through a fall
- [src/render/leash/travelPose.test.ts:23](../../src/render/leash/travelPose.test.ts#L23): reaches the ground in the configured time and lifts the sigil end first
- [src/render/leash/writeOn.test.ts:9](../../src/render/leash/writeOn.test.ts#L9): never goes below 0 or above 1
- [src/render/leash/writeOn.test.ts:15](../../src/render/leash/writeOn.test.ts#L15): its light, as the view works it out, is never negative with her clock ahead of the world's
- [src/render/legendCarving.test.ts:6](../../src/render/legendCarving.test.ts#L6): is the legend's legendary sigil, ring-edged, its grooves a modest share of it, the same each time and different by kind
- [src/render/legendLight.test.ts:5](../../src/render/legendLight.test.ts#L5): leaves a lighter legend's floor as it is
- [src/render/legendLight.test.ts:8](../../src/render/legendLight.test.ts#L8): raises a dark coat's floor until its floored look reaches dark, at most liftMax
- [src/render/legendLight.test.ts:12](../../src/render/legendLight.test.ts#L12): does nothing with dark off
- [src/render/legendOutline.test.ts:5](../../src/render/legendOutline.test.ts#L5): shows fully inside the circle, none outside it, and fades smoothly across its edge
- [src/render/legendOutline.test.ts:13](../../src/render/legendOutline.test.ts#L13): carries its moss and its outline in one glow the shader reads back (every glow a sleeping legend's, under -1.5)
- [src/render/legendSleep.test.ts:8](../../src/render/legendSleep.test.ts#L8): is as its state is when first seen
- [src/render/legendSleep.test.ts:12](../../src/render/legendSleep.test.ts#L12): wakes drowsily over wakeSecs: the head up first, a sag, then the body
- [src/render/legendSleep.test.ts:23](../../src/render/legendSleep.test.ts#L23): wakes angry in angryWake of the time
- [src/render/legendSleep.test.ts:28](../../src/render/legendSleep.test.ts#L28): settles back to sleep over settleSecs, its head first
- [src/render/legendSleep.test.ts:36](../../src/render/legendSleep.test.ts#L36): turns back from part way without a jump
- [src/render/leylines.test.ts:25](../../src/render/leylines.test.ts#L25): isn't drawn while the boot's line is still going round the ring (the tip reveal times the boot's pulse, the ring first)
- [src/render/leylines.test.ts:29](../../src/render/leylines.test.ts#L29): goes on out from where the lap ends as the pulse sets off, reveal times as far along the one path
- [src/render/leylines.test.ts:33](../../src/render/leylines.test.ts#L33): is whole with the waves off (paused), and isn't drawn while waiting for the party spell
- [src/render/leylines.test.ts:40](../../src/render/leylines.test.ts#L40): runs at the pulse's speed: 0 as it sets off, a share of the link by length, 1 as the wave lands
- [src/render/leylines.test.ts:45](../../src/render/leylines.test.ts#L45): is off with the waves off
- [src/render/leylines.test.ts:51](../../src/render/leylines.test.ts#L51): is drawn from the treehouse's front, unbroken (every 2 m at most), to TIP_PACE times the pulse's progress, and as bright all along
- [src/render/leylines.test.ts:84](../../src/render/leylines.test.ts#L84): sits on the drawn line where it's drawn to, tinted toward the next stone's colour; none with the whole line shown; nothing drawn at it
- [src/render/leylines.test.ts:124](../../src/render/leylines.test.ts#L124): isn't there till the tip, reveal times the boot's pulse, has been round the whole ring
- [src/render/leylines.test.ts:129](../../src/render/leylines.test.ts#L129): runs on along the route at reveal times the boot pulse's pace, and goes on without a jump as the boot ends and the wave's pulse takes over
- [src/render/leylines.test.ts:137](../../src/render/leylines.test.ts#L137): keeps to the boot pulse's progress, not the clock: a faster pulse comes off the ring as early in it
- [src/render/leylines.test.ts:143](../../src/render/leylines.test.ts#L143): draws the first link from where the boot's lap ends, on round the ring the same way (clockwise), then off it; the rainbow and the dots run on from the ring
- [src/render/leylines.test.ts:171](../../src/render/leylines.test.ts#L171): runs the boot ring through every stone, so the pulse touches each as it turns it (Ed, 2026-10-07)
- [src/render/leylines.test.ts:183](../../src/render/leylines.test.ts#L183): isn't drawn at all till the spell's cast, not even the Route-seer hat's whole route; then as before
- [src/render/leylines.test.ts:208](../../src/render/leylines.test.ts#L208): is one line in the rainbow, the boot ring its first link, with one spark; only its glow pass draws (the line is dots)
- [src/render/leylines.test.ts:218](../../src/render/leylines.test.ts#L218): mid-boot: the boot's spark on the ring's link, bars behind it and single dots ahead, the tip reveal times as far: off the ring and out along the route, all single dots there
- [src/render/leylines.test.ts:233](../../src/render/leylines.test.ts#L233): before the tip is round the whole ring, only the ring is drawn, as far as its line's got; before the spell, nothing, and no spark
- [src/render/leylines.test.ts:242](../../src/render/leylines.test.ts#L242): the boot over: the ring's link faint (RING_AFTER) and all bars, the spark the wave's, bars behind it and dots ahead; the whole line shown (the hat), the spark still; the waves off, no spark and all bars
- [src/render/load.test.ts:16](../../src/render/load.test.ts#L16): shows nothing for a few sigils, following close or a little stretched
- [src/render/load.test.ts:20](../../src/render/load.test.ts#L20): grows with weight and tension, toward the army
- [src/render/load.test.ts:28](../../src/render/load.test.ts#L28): leans her only flying away from the pull, and shows her sinking only as she sinks over the treetops
- [src/render/loadingFront.test.ts:10](../../src/render/loadingFront.test.ts#L10): reaches each type's nearest and furthest ground from the treehouse, over all its areas
- [src/render/loadingFront.test.ts:14](../../src/render/loadingFront.test.ts#L14): keeps all of a type under the mist until its art lands
- [src/render/loadingFront.test.ts:17](../../src/render/loadingFront.test.ts#L17): starts short of the type's nearest ground, so nothing clears before the art is in
- [src/render/loadingFront.test.ts:20](../../src/render/loadingFront.test.ts#L20): rolls outward from the house: the nearer of a type's areas clear sooner than the far one
- [src/render/loadingFront.test.ts:26](../../src/render/loadingFront.test.ts#L26): clears a nearby area within a couple of seconds
- [src/render/loadingFront.test.ts:31](../../src/render/loadingFront.test.ts#L31): never hangs on past the cap: what the front hasn't reached fades out, however far the type reaches
- [src/render/loadingFront.test.ts:38](../../src/render/loadingFront.test.ts#L38): keeps its speed for a near area whatever else of its type lies far off
- [src/render/loadingFront.test.ts:42](../../src/render/loadingFront.test.ts#L42): has none for a type with no areas on the map once it's in
- [src/render/miniaturePotion.test.ts:7](../../src/render/miniaturePotion.test.ts#L7): shares stronger narrow focus between ground and treetop views without changing tuning
- [src/render/miniaturePotion.test.ts:14](../../src/render/miniaturePotion.test.ts#L14): fades back to disabled blur and respects lab values and house suppression
- [src/render/mushroomGlow.test.ts:7](../../src/render/mushroomGlow.test.ts#L7): removes complementary light and emits each patch’s own colour on the same silhouette
- [src/render/nightVisionPotion.test.ts:8](../../src/render/nightVisionPotion.test.ts#L8): reveals low-light detail with existing tone maths and restores normal levels on expiry and replacement
- [src/render/nightVisionPotion.test.ts:23](../../src/render/nightVisionPotion.test.ts#L23): copies live lab controls and can return neutral adjustments without accumulating changes
- [src/render/overBend.test.ts:9](../../src/render/overBend.test.ts#L9): shows everything without a bend
- [src/render/overBend.test.ts:12](../../src/render/overBend.test.ts#L12): shows the ground before the horizon and hides it past, ahead of the focus only
- [src/render/overBend.test.ts:19](../../src/render/overBend.test.ts#L19): still shows what stands tall enough to rise over the horizon
- [src/render/overBend.test.ts:30](../../src/render/overBend.test.ts#L30): hides a dot past the bend's horizon, shows one this side of it
- [src/render/overBend.test.ts:36](../../src/render/overBend.test.ts#L36): hides a dot behind a hill on the way to the camera, shows it when the hill's gone
- [src/render/overlayTilt.test.ts:8](../../src/render/overlayTilt.test.ts#L8): is sharp in the band, blurs to the full strength at the top, and some way at the bottom (the band sits low)
- [src/render/overlayTilt.test.ts:17](../../src/render/overlayTilt.test.ts#L17): blends to the treetops' by her lift, and is off with the tilt-shift
- [src/render/overlayTilt.test.ts:22](../../src/render/overlayTilt.test.ts#L22): is off in the treehouse, easing out as she comes in and back as she leaves (Ed, 2026-10-26: "No tilt shift while you're in the treehouse")
- [src/render/overrides.test.ts:13](../../src/render/overrides.test.ts#L13): `reads ${f}`
- [src/render/overrides.test.ts:18](../../src/render/overrides.test.ts#L18): reads an indexed PNG with a transparent colour
- [src/render/overrides.test.ts:22](../../src/render/overrides.test.ts#L22): refuses what isn't a PNG
- [src/render/overrides.test.ts:29](../../src/render/overrides.test.ts#L29): names the poses as art/export.mjs does
- [src/render/overrides.test.ts:30](../../src/render/overrides.test.ts#L30): every file is a real species' pose, readable, and in the game
- [src/render/palette.test.ts:13](../../src/render/palette.test.ts#L13): gives back every pixel exactly, the alpha codes and a normal's sway code on a rigid pixel too
- [src/render/palette.test.ts:22](../../src/render/palette.test.ts#L22): keeps index 0 for transparent, even in a plane with none
- [src/render/palette.test.ts:27](../../src/render/palette.test.ts#L27): takes 255 colours besides transparent, and leaves a plane with more as RGBA (null)
- [src/render/palette.test.ts:35](../../src/render/palette.test.ts#L35): reads a plane that isn't on a 4-byte boundary
- [src/render/palette.test.ts:40](../../src/render/palette.test.ts#L40): counts an indexed plane a quarter of RGBA's bytes and its palette
- [src/render/partyOver.test.ts:16](../../src/render/partyOver.test.ts#L16): switches nothing off while the party plays
- [src/render/partyOver.test.ts:22](../../src/render/partyOver.test.ts#L22): ripples out from home: near lights first, the farthest party last, all out at the end
- [src/render/partyOver.test.ts:33](../../src/render/partyOver.test.ts#L33): eases in from the rules' start time (g.partyOver.at) at its own pace, else their ease, else ?partyover=
- [src/render/partySheet.test.ts:10](../../src/render/partySheet.test.ts#L10): shares the cache across creature ids but separates species, outfit, age and style
- [src/render/partySheet.test.ts:21](../../src/render/partySheet.test.ts#L21): keeps both facings and wraps all walk-cycle lengths within the single-age sheet
- [src/render/partySheet.test.ts:29](../../src/render/partySheet.test.ts#L29): separates Current and redesigned genomes even with the same style hash
- [src/render/pins.test.ts:16](../../src/render/pins.test.ts#L16): a world point as it is, its top its height
- [src/render/pins.test.ts:19](../../src/render/pins.test.ts#L19): a house object on the house's floor, its own height over it, while she's outside
- [src/render/pins.test.ts:22](../../src/render/pins.test.ts#L22): in the house, moved as she's drawn: slid with her, its top over her drawn floor
- [src/render/pins.test.ts:27](../../src/render/pins.test.ts#L27): a house object's top as drawn once its art's made (render/houseRooms.ts marks "<id>.top"), so the pin clears it (Ed, 2026-10-26: "the pointer should be not overlapping with the item"); its config height till then, or when the target sets its own
- [src/render/pins.test.ts:33](../../src/render/pins.test.ts#L33): nothing for an object the house hasn't
- [src/render/pins.test.ts:34](../../src/render/pins.test.ts#L34): a piece's top as drawn is its highest pixel, at the middle of its pixels' width (render/houseFurniture.ts drawnTop)
- [src/render/potionChoreography.test.ts:4](../../src/render/potionChoreography.test.ts#L4): hides the fall from the participant and restores sight while she still rests
- [src/render/potionChoreography.test.ts:12](../../src/render/potionChoreography.test.ts#L12): accelerates downwards and finishes at ground level
- [src/render/potionEffects.test.ts:12](../../src/render/potionEffects.test.ts#L12): uses only the local witch, starts on wake, fades on game time and resets on replacement
- [src/render/potionEffects.test.ts:28](../../src/render/potionEffects.test.ts#L28): restores exact baseline parameters without changing the saved settings
- [src/render/potionEffects.test.ts:37](../../src/render/potionEffects.test.ts#L37): bends CPU positions upward for ravines, matching the signed shader equation
- [src/render/potionEffects.test.ts:50](../../src/render/potionEffects.test.ts#L50): keeps vertigo grounded when landed and restores the exact camera and grade on expiry
- [src/render/potionEffects.test.ts:61](../../src/render/potionEffects.test.ts#L61): restores moon glow and sky ordering after a trip, while the transparent floor retains depth
- [src/render/programInventory.test.ts:5](../../src/render/programInventory.test.ts#L5): retains original hidden ancestry and stable sources after compilation reveals objects
- [src/render/programInventory.test.ts:18](../../src/render/programInventory.test.ts#L18): bounds listed uses while retaining complete visibility counts and ignores unmapped materials
- [src/render/programReadiness.test.ts:4](../../src/render/programReadiness.test.ts#L4): detects a broken link once after completion, without status or log reads while unfinished
- [src/render/programReadiness.test.ts:13](../../src/render/programReadiness.test.ts#L13): checks successful links after completion without reading their logs
- [src/render/programReadiness.test.ts:19](../../src/render/programReadiness.test.ts#L19): expires a15s landing grace without reading unfinished uniforms, then finishes in the background at30s
- [src/render/programReadiness.test.ts:29](../../src/render/programReadiness.test.ts#L29): preserves fast completion and cancels an obsolete island wait without uniform reads
- [src/render/programReadiness.test.ts:37](../../src/render/programReadiness.test.ts#L37): keeps waiting beyond 60 seconds until each program is ready, reporting pending identities once
- [src/render/programReadiness.test.ts:51](../../src/render/programReadiness.test.ts#L51): waits for compile scheduling to settle and includes programs added while waiting
- [src/render/refraction.test.ts:14](../../src/render/refraction.test.ts#L14): projects a continuous fire and one pressure wave from world anchors, including camera motion
- [src/render/refraction.test.ts:22](../../src/render/refraction.test.ts#L22): does not duplicate a held cast and keeps motion frozen on a paused clock
- [src/render/refraction.test.ts:29](../../src/render/refraction.test.ts#L29): expires waves while off and never resurrects them on quality re-enable
- [src/render/refraction.test.ts:33](../../src/render/refraction.test.ts#L33): does not consume a cast before interpolation reaches its timestamp, and resets on island/time replacement
- [src/render/refraction.test.ts:39](../../src/render/refraction.test.ts#L39): culls behind-camera and distant fires without allocating any render targets
- [src/render/refraction.test.ts:44](../../src/render/refraction.test.ts#L44): chooses one nearest visible fire rather than allowing an offscreen fire to hide it
- [src/render/refraction.test.ts:49](../../src/render/refraction.test.ts#L49): protects foreground surfaces against the fire's base depth, not merely its nearer raised plume
- [src/render/refractionComposition.test.ts:7](../../src/render/refractionComposition.test.ts#L7): OFF is exact coordinate identity before potion wobble and performs zero depth reads
- [src/render/refractionComposition.test.ts:12](../../src/render/refractionComposition.test.ts#L12): pixels outside every local form stay exact and do not read depth
- [src/render/refractionComposition.test.ts:17](../../src/render/refractionComposition.test.ts#L17): samples and guards the base quantized destination, then the actual snapped source before potion wobble
- [src/render/refractionComposition.test.ts:27](../../src/render/refractionComposition.test.ts#L27): protects an adjacent thin foreground texel at both destination and displaced source
- [src/render/refractionComposition.test.ts:35](../../src/render/refractionComposition.test.ts#L35): does not refract a surface within the existing DEPTH24 quantisation uncertainty
- [src/render/refractionComposition.test.ts:39](../../src/render/refractionComposition.test.ts#L39): also protects neighbouring foreground when a diagnostic caller supplies a fractional coordinate
- [src/render/refractionComposition.test.ts:45](../../src/render/refractionComposition.test.ts#L45): keeps displaced source coordinates inside texel centres at every screen edge
- [src/render/refractionIntegration.test.ts:12](../../src/render/refractionIntegration.test.ts#L12): binds existing depth plus bounded form uniforms in the real Post composite without adding passes
- [src/render/refractionIntegration.test.ts:47](../../src/render/refractionIntegration.test.ts#L47): the real View hook respects URL activation, quality, comfort and island reset
- [src/render/refractionMath.test.ts:4](../../src/render/refractionMath.test.ts#L4): protects a foreground surface at both the destination and proposed source pixel
- [src/render/refractionMath.test.ts:11](../../src/render/refractionMath.test.ts#L11): never samples outside the image and limits even overlapping contributions to two art pixels
- [src/render/refractionMath.test.ts:17](../../src/render/refractionMath.test.ts#L17): keeps plume and pressure masks local with a finite lifetime
- [src/render/refractionMath.test.ts:24](../../src/render/refractionMath.test.ts#L24): consumes held events once, resets on island replacement or time rewind, and freezes with its clock
- [src/render/ride.test.ts:31](../../src/render/ride.test.ts#L31): standing still it sits on the ground, and is left alone on a frame drawn twice
- [src/render/ride.test.ts:40](../../src/render/ride.test.ts#L40): placed somewhere new, it starts on the ground there
- [src/render/rig/discOutline.test.ts:13](../../src/render/rig/discOutline.test.ts#L13): mode
- [src/render/rig/rig.test.ts:30](../../src/render/rig/rig.test.ts#L30): leaves the ordinary rig exactly unchanged at zero or unit stilt length
- [src/render/rig/rig.test.ts:36](../../src/render/rig/rig.test.ts#L36): lifts normal-sized torso/head/tail on tapered legs while feet keep their ground targets
- [src/render/rig/rig.test.ts:48](../../src/render/rig/rig.test.ts#L48): keeps tapered leg strokes overlapping, with a hard geometry bound even at the longest thinnest setting
- [src/render/rig/rig.test.ts:67](../../src/render/rig/rig.test.ts#L67): tracks more than four real legs and bounds malformed huge leg lists
- [src/render/rig/rig.test.ts:79](../../src/render/rig/rig.test.ts#L79): gives tucked legs visible body-proportioned extension without moving their feet or resizing the body
- [src/render/rig/rig.test.ts:89](../../src/render/rig/rig.test.ts#L89): resets a pooled disc scale before it becomes a normal body piece
- [src/render/rig/rig.test.ts:93](../../src/render/rig/rig.test.ts#L93): restores knee and foot thickness continuously as the trip expires
- [src/render/rig/rig.test.ts:110](../../src/render/rig/rig.test.ts#L110): does not invent legs or stretch a serpent
- [src/render/rig/rig.test.ts:115](../../src/render/rig/rig.test.ts#L115): solves a two-bone leg exactly: the bones keep their lengths and the foot reaches its target
- [src/render/rig/rig.test.ts:123](../../src/render/rig/rig.test.ts#L123): pulls an unreachable foot in rather than breaking the leg, and bends the knee the way it's told
- [src/render/rig/rig.test.ts:129](../../src/render/rig/rig.test.ts#L129): keeps a chain's links at their length as its head moves (follow the leader)
- [src/render/rig/rig.test.ts:135](../../src/render/rig/rig.test.ts#L135): steps each foot on its phase: down for the duty factor, sliding back, then lifted forward
- [src/render/rig/rig.test.ts:142](../../src/render/rig/rig.test.ts#L142): picks the nearest of the eight headings, the left ones the right ones mirrored
- [src/render/rig/rig.test.ts:152](../../src/render/rig/rig.test.ts#L152): turns its body toward where it goes and feels its acceleration
- [src/render/rig/rig.test.ts:160](../../src/render/rig/rig.test.ts#L160): turns to look at her while it watches (rules/wildWatch.ts), standing or backing off, and keeps its face to her
- [src/render/rig/rig.test.ts:169](../../src/render/rig/rig.test.ts#L169): lies a sleeping legend down: its body on the ground, its head down, its feet where they were
- [src/render/rig/rig.test.ts:177](../../src/render/rig/rig.test.ts#L177): plants its feet: a foot on the ground stays where it is while the body walks on, at any speed and heading
- [src/render/rig/rig.test.ts:183](../../src/render/rig/rig.test.ts#L183): stops stepping when it stops
- [src/render/rig/stiltParts.test.ts:15](../../src/render/rig/stiltParts.test.ts#L15): covers every current legged species at all four levels with finite independent joints
- [src/render/rig/stiltParts.test.ts:34](../../src/render/rig/stiltParts.test.ts#L34): leaves the ordinary non-quadruped rig population and cache keys unchanged
- [src/render/rig/stiltParts.test.ts:41](../../src/render/rig/stiltParts.test.ts#L41): keeps real wing surfaces with the normal body and excludes baked ground shadows
- [src/render/rig/stiltParts.test.ts:48](../../src/render/rig/stiltParts.test.ts#L48): bakes usable independent body/head headings and material discs for every new legged plan
- [src/render/rig/stiltView.test.ts:7](../../src/render/rig/stiltView.test.ts#L7): requests isolated stilt parts for tiny and treetop animals, then restores ordinary rig selection
- [src/render/routeEase.test.ts:10](../../src/render/routeEase.test.ts#L10): has no bend along a straight line, and samples a bent one evenly by arc length
- [src/render/routeEase.test.ts:17](../../src/render/routeEase.test.ts#L17): glides to a re-plan that bends the other way instead of jumping, its ends always exact
- [src/render/shaderDrawGate.test.ts:5](../../src/render/shaderDrawGate.test.ts#L5): uses the warmed ground fallback and skips effects before any unfinished uniform read or draw
- [src/render/shaderDrawGate.test.ts:24](../../src/render/shaderDrawGate.test.ts#L24): requires every compiled variant to be ready and never treats missing program metadata as ready
- [src/render/shake.test.ts:10](../../src/render/shake.test.ts#L10): shakes more the fewer hits she has left, and most on the knockdown
- [src/render/shake.test.ts:17](../../src/render/shake.test.ts#L17): starts on a hit, dies away in under half a second (the knockdown's within 0.6 s)
- [src/render/shake.test.ts:31](../../src/render/shake.test.ts#L31): moves in whole pixels (snapped to the pixel size), smoothly, within its most
- [src/render/shake.test.ts:44](../../src/render/shake.test.ts#L44): does nothing turned off (?shake=0)
- [src/render/shake.test.ts:52](../../src/render/shake.test.ts#L52): runs on her clock: a slowed world doesn't stretch it (a hit's over in half a second of hers)
- [src/render/shake.test.ts:61](../../src/render/shake.test.ts#L61): a bout of hits back to back shakes for maxSecs at most; the knockdown a bout of its own, also short
- [src/render/shake.test.ts:86](../../src/render/shake.test.ts#L86): a new night (its clock back at the start) carries nothing over, and its hits still shake
- [src/render/shake.test.ts:99](../../src/render/shake.test.ts#L99): holds still on pause (her clock stands) and goes on from there
- [src/render/slices.test.ts:25](../../src/render/slices.test.ts#L25): runs every step in order, straight through or sliced, and returns what it makes
- [src/render/slices.test.ts:32](../../src/render/slices.test.ts#L32): gives the page its turns between slices of about the budget, and logs its longest step
- [src/render/slices.test.ts:46](../../src/render/slices.test.ts#L46): fills the height field's window in steps exactly as follow fills it at once
- [src/render/slowtime.test.ts:6](../../src/render/slowtime.test.ts#L6): looks as ever at full speed, fullest at the slowest, and eases between
- [src/render/slowtime.test.ts:13](../../src/render/slowtime.test.ts#L13): is fullest at whatever the tuning slows to
- [src/render/soundsystemGen.test.ts:14](../../src/render/soundsystemGen.test.ts#L14): `never deals two alike on a map (seed ${seed}): every pair differs in at least two visible traits`
- [src/render/soundsystemGen.test.ts:29](../../src/render/soundsystemGen.test.ts#L29): faces the dancefloor along the line to it: from the far (north) side facing it, from the near side facing away
- [src/render/soundsystemGen.test.ts:36](../../src/render/soundsystemGen.test.ts#L36): is deterministic: the same map deals the same set
- [src/render/spin.test.ts:16](../../src/render/spin.test.ts#L16): lasts at least a beat, ending facing us at a turn's end
- [src/render/spin.test.ts:21](../../src/render/spin.test.ts#L21): carries on till the new look is in
- [src/render/spin.test.ts:26](../../src/render/spin.test.ts#L26): never past its cap
- [src/render/spin.test.ts:30](../../src/render/spin.test.ts#L30): another step mid-spin carries the one spin on, not a second
- [src/render/spin.test.ts:36](../../src/render/spin.test.ts#L36): turns through front, sides and back
- [src/render/spookyGrade.test.ts:17](../../src/render/spookyGrade.test.ts#L17): is a 0 to 1 slider on light.spooky.grade in the Leaf jitter group, beside autumn, hue and value, its default the built grade
- [src/render/spookyGrade.test.ts:28](../../src/render/spookyGrade.test.ts#L28): drives uGrade.x live: the slider sets the knob in place and the next frame's grade reads it
- [src/render/spookyGrade.test.ts:45](../../src/render/spookyGrade.test.ts#L45): isn't overwritten by the area moods' easing (they ease only its tint)
- [src/render/spookyGrade.test.ts:53](../../src/render/spookyGrade.test.ts#L53): carries across a sail to the next night's tuning
- [src/render/stiltwalkersPotion.test.ts:8](../../src/render/stiltwalkersPotion.test.ts#L8): replaces Tall Tales without changing either existing recipe ID and fades the leg shape back to normal
- [src/render/stiltwalkersPotion.test.ts:21](../../src/render/stiltwalkersPotion.test.ts#L21): copies adjustable length/taper independently and bounds both controls
- [src/render/stumpDeal.test.ts:14](../../src/render/stumpDeal.test.ts#L14): gives every area a stump of its type's form and colours, at most `variants` of a type, the same each time
- [src/render/swoopTrails.test.ts:45](../../src/render/swoopTrails.test.ts#L45): fades in as she lifts off, and trails out to nothing once she's down
- [src/render/swoopTrails.test.ts:58](../../src/render/swoopTrails.test.ts#L58): never draws more trails than its pool, and frees them for the next swoopers
- [src/render/thermalVision.test.ts:9](../../src/render/thermalVision.test.ts#L9): keeps every creature warmer than scenery and distinguishes escalating danger
- [src/render/thermalVision.test.ts:18](../../src/render/thermalVision.test.ts#L18): does not confuse a friendly creature attacking an enemy with danger to the witch
- [src/render/thermalVision.test.ts:22](../../src/render/thermalVision.test.ts#L22): starts off, so ordinary pixels use the unchanged drawing path
- [src/render/thermalVision.test.ts:25](../../src/render/thermalVision.test.ts#L25): uploads heat beside leaf jitter without changing it, and clears heat when an instance is reused for scenery
- [src/render/thoughtCloud.test.ts:22](../../src/render/thoughtCloud.test.ts#L22): `round a ${inner}-pixel symbol, with ${puffs} puffs`
- [src/render/thoughtCloud.test.ts:42](../../src/render/thoughtCloud.test.ts#L42): sits on the game's 3 px grid
- [src/render/thoughtCloud.test.ts:60](../../src/render/thoughtCloud.test.ts#L60): fades softly in and out at each swap, whole in the middle of its turn
- [src/render/thoughtCloud.test.ts:68](../../src/render/thoughtCloud.test.ts#L68): neighbours don't swap together, and with no quest to show it's the emoji alone
- [src/render/trail.test.ts:16](../../src/render/trail.test.ts#L16): is 5 m at full speed on the ground and 20 m over the treetops
- [src/render/trail.test.ts:20](../../src/render/trail.test.ts#L20): is shorter slower, and shrinks to nothing when she stops
- [src/render/trail.test.ts:27](../../src/render/trail.test.ts#L27): runs from her (0) to its tail (1)
- [src/render/trail.test.ts:33](../../src/render/trail.test.ts#L33): takes the colour of the area she's over, and runs from the new into the old as she crosses
- [src/render/trail.test.ts:41](../../src/render/trail.test.ts#L41): starts again after a blink
- [src/render/trunkCut.test.ts:8](../../src/render/trunkCut.test.ts#L8): cuts where the crown's share of pixels lies above, when the trunk reaches that high
- [src/render/trunkCut.test.ts:11](../../src/render/trunkCut.test.ts#L11): never cuts above the trunk's own top, so its fade ends on the trunk (Ed, 2026-10-13)
- [src/render/trunkCut.test.ts:15](../../src/render/trunkCut.test.ts#L15): is undefined with no crown
- [src/render/usePrompt.test.ts:12](../../src/render/usePrompt.test.ts#L12): is E on the keyboard, the pad's square on a pad (Ed, 2026-10-29), and a tap on touch: a keycap each, no words
- [src/render/usePrompt.test.ts:15](../../src/render/usePrompt.test.ts#L15): follows a remap
- [src/render/view/cameraLift.test.ts:4](../../src/render/view/cameraLift.test.ts#L4): holds and eases hill clearance at the original 60 Hz rate
- [src/render/view/entDepth.test.ts:9](../../src/render/view/entDepth.test.ts#L9): land on their own pixels, moved back or forward along the camera's rays
- [src/render/view/guidancePulse.test.ts:12](../../src/render/view/guidancePulse.test.ts#L12): keeps the displayed pointer phase through ten paused seconds and resumes from it
- [src/render/view/guidancePulse.test.ts:29](../../src/render/view/guidancePulse.test.ts#L29): swell gently, from 1 to 1 + pins.pulse and back, pulseRate times a second
- [src/render/view/guidancePulse.test.ts:36](../../src/render/view/guidancePulse.test.ts#L36): half as much with reduce flashing
- [src/render/view/guidancePulse.test.ts:39](../../src/render/view/guidancePulse.test.ts#L39): only the morning's: the night's end's 🧭 and 💤 stay still, as with no pin
- [src/render/view/hatArt.test.ts:9](../../src/render/view/hatArt.test.ts#L9): rises, loops a turn a second, falls apart over its fling, then is gone
- [src/render/view/hatArt.test.ts:20](../../src/render/view/hatArt.test.ts#L20): names only frames the art has, and the sprouts are real pieces
- [src/render/view/pausedWitch.test.ts:6](../../src/render/view/pausedWitch.test.ts#L6): submits identical witch instances on two retained repaints across hatless-art readiness
- [src/render/view/pointers.test.ts:10](../../src/render/view/pointers.test.ts#L10): the straggler's: its sigil in the enemy palette at its rank's size, only while the stragglers phase has one
- [src/render/view/pointers.test.ts:19](../../src/render/view/pointers.test.ts#L19): one per awake legend, in its stack colour at a legend's size, till the party's won
- [src/render/view/pointers.test.ts:32](../../src/render/view/pointers.test.ts#L32): the party's: none before the lap; the disco ball over the dancefloor once won, till she's reached the party (settled)
- [src/render/view/scenery.test.ts:10](../../src/render/view/scenery.test.ts#L10): yields while scanning %s rejected before sprite creation
- [src/render/view/scenerySchedule.test.ts:5](../../src/render/view/scenerySchedule.test.ts#L5): never drains an unfinished ordinary-play rebuild, however many frames it needs
- [src/render/view/scenerySchedule.test.ts:23](../../src/render/view/scenerySchedule.test.ts#L23): finishes both the old and freshly requested lists for explicit preparation
- [src/render/view/scenerySchedule.test.ts:31](../../src/render/view/scenerySchedule.test.ts#L31): does no work when nothing is due
- [src/render/viewSetGame.test.ts:80](../../src/render/viewSetGame.test.ts#L80): builds the new island off the scene, swaps it in, then lets the old go; reseats the art; resets every part
- [src/render/viewSetGame.test.ts:124](../../src/render/viewSetGame.test.ts#L124): takes every area's lines out and lets go of their geometry, and a new game starts with none
- [src/render/wisps.test.ts:8](../../src/render/wisps.test.ts#L8): none near the party, rarer the nearer it is, the full chance far from it
- [src/render/wisps.test.ts:16](../../src/render/wisps.test.ts#L16): a few, faint and slow: a sane tuning
- [src/render/workshopArt.test.ts:14](../../src/render/workshopArt.test.ts#L14): draws every part of config/broom-parts.json as its own piece, in its slot
- [src/render/workshopArt.test.ts:17](../../src/render/workshopArt.test.ts#L17): draws each on a card big and bold: about the card's length, no two alike
- [src/render/workshopArt.test.ts:27](../../src/render/workshopArt.test.ts#L27): hangs each on the pegboard within its cell (about 1.6 m across), still readable: a dozen pixels or more each way
- [src/render/workshopArt.test.ts:34](../../src/render/workshopArt.test.ts#L34): glows only where a real light would: the nozzles' pilot flames and the fairing's headlamp
- [src/render/workshopArt.test.ts:37](../../src/render/workshopArt.test.ts#L37): rests her broom assembled from her parts: bare, and each set and part changing it
- [src/render/wormsEyePotion.test.ts:8](../../src/render/wormsEyePotion.test.ts#L8): lowers recipe 45 on waking, fades on game time, and restores normal framing on expiry or replacement
- [src/render/wormsEyePotion.test.ts:22](../../src/render/wormsEyePotion.test.ts#L22): uses and copies live lab controls without mutating the normal camera values
- [src/render/zooInscriptions.test.ts:13](../../src/render/zooInscriptions.test.ts#L13): a found island: its animal (big), its area and biome, and its line wrapped
- [src/render/zooInscriptions.test.ts:19](../../src/render/zooInscriptions.test.ts#L19): one not found yet: just the animal and its biome underneath
- [src/render/zooInscriptions.test.ts:23](../../src/render/zooInscriptions.test.ts#L23): wraps words to the width
- [src/rules/pathGeometry.test.ts:14](../../src/rules/pathGeometry.test.ts#L14): retains exact pre-extraction ribbon arrays on a fixed map and a coastal island
- [src/rules/pathGeometry.test.ts:27](../../src/rules/pathGeometry.test.ts#L27): round-trips prepared geometry through worker cloning and map hydration; old prep falls back
- [src/rules/pathGeometry.test.ts:40](../../src/rules/pathGeometry.test.ts#L40): rejects malformed, inconsistent and nonfinite prepared geometry
- [src/rules/pathGeometry.test.ts:48](../../src/rules/pathGeometry.test.ts#L48): the existing worker returns plain geometry without canvas or GPU objects
- [src/sleepingLegendSize.test.ts:9](../../src/sleepingLegendSize.test.ts#L9): accepts two distinct valid breaths without modifying sprites
- [src/sleepingLegendSize.test.ts:14](../../src/sleepingLegendSize.test.ts#L14): rejects every original size, contact, normal, material, ground, origin and breath violation
- [src/spriteConnectivity.test.ts:6](../../src/spriteConnectivity.test.ts#L6): allows Current's existing detached effects and rejects a new component
- [src/spriteConnectivity.test.ts:12](../../src/spriteConnectivity.test.ts#L12): allows at most three extra detached pixels when component count stays fixed
- [src/spriteConnectivity.test.ts:18](../../src/spriteConnectivity.test.ts#L18): accepts diagonal contacts but never wraps across row boundaries
- [src/spriteConnectivity.test.ts:22](../../src/spriteConnectivity.test.ts#L22): rejects a detached eight-pixel ear with a two-row background gap
- [src/spriteConnectivity.test.ts:29](../../src/spriteConnectivity.test.ts#L29): fails empty masks and retains isolated single bright pixels
- [src/textureSizeCompatibility.test.ts:6](../../src/textureSizeCompatibility.test.ts#L6): %s age %s texture toggle preserves physical size

<a id="ar4"></a>

## AR4: Sampled appearance distributions

outcome stats; 7 tests; files take ~135 s.

One outcome-only and six mixed declarations. Report wet-pond share, rosette fill/closed-ring shares and sampled diversity, span/junction abundance, laser duty/agreement, pattern variety and accumulated lit-tile ratio. Retain endpoint controls, bounded geometry, no crossings, exact seeded replay, fade bounds, direct no-repeat choices and exact floor-level mappings. rules:605 has no independent integrity assertion; neighboring map/light checks remain. Exact dispositions: report 6566610088.

- [src/rosettePainter.test.ts:43](../../src/rosettePainter.test.ts#L43): fills a stable share of complete cells with solid ink rather than pale centres
- [src/rosettePainter.test.ts:69](../../src/rosettePainter.test.ts#L69): varies size and gap within bounds with a reproducible closed-ring share
- [src/rules/rules.test.ts:605](../../src/rules/rules.test.ts#L605): put more ponds in the wet areas
- [src/rules/rules.test.ts:741](../../src/rules/rules.test.ts#L741): hang as long runs between the area's own trees: no crossings, at most 3 ends per tree, the same every time
- [src/rules/rules.test.ts:990](../../src/rules/rules.test.ts#L990): are seeded, on about duty of the time, at most maxCount beams, and fade rather than pop
- [src/rules/rules.test.ts:1465](../../src/rules/rules.test.ts#L1465): plays patterns on the beat, changing on bar lines, never the same one twice running
- [src/rules/rules.test.ts:1477](../../src/rules/rules.test.ts#L1477): rises in level with the party, and a higher level lights more of the floor

<a id="ar5"></a>

## AR5: Art integrity and supported comparisons

current rules; 116 tests; files take ~353 s.

Keep connected finite anatomy, exact bone lengths/contact, source-genome immutability, sparse/full projected parity, scale parity, cache separation, pixel/material/normal contracts, sleeping anchors, bounded search, renderer state restoration and scenery budgets. Current feature visibility, authored moon/floor rules and supplied-input hysteresis are direct contracts rather than population statistics. Supported old-size/projected/graph contexts are explicitly selected.

- [src/bibPaint.test.ts:14](../../src/bibPaint.test.ts#L14): pins projected-fit marten pixels and normal bytes with the field absent
- [src/bibPaint.test.ts:21](../../src/bibPaint.test.ts#L21): bounds the shared paint to the underside of the neck and local chest
- [src/bibPaint.test.ts:31](../../src/bibPaint.test.ts#L31): paints a selected cream bib with a brown belly and no geometry changes
- [src/bibPaint.test.ts:51](../../src/bibPaint.test.ts#L51): requires a finite localized extent and valid material
- [src/bodyGraph.test.ts:9](../../src/bodyGraph.test.ts#L9): %s has continuous skin, tapered limbs and grounded feet
- [src/bodyGraph.test.ts:33](../../src/bodyGraph.test.ts#L33): matches the existing skin primitives exactly for a torso-only graph
- [src/bodyGraph.test.ts:45](../../src/bodyGraph.test.ts#L45): supports extra heads, shells and wings without mutating the input
- [src/bodyGraph.test.ts:57](../../src/bodyGraph.test.ts#L57): actually blends skin rather than merely overlapping hard shapes
- [src/bodyGraph.test.ts:63](../../src/bodyGraph.test.ts#L63): rejects disconnected spine stations and invalid sockets before drawing
- [src/bodyGraph.test.ts:78](../../src/bodyGraph.test.ts#L78): keeps both bone lengths for reachable, clamped and singular targets
- [src/bodyGraph.test.ts:90](../../src/bodyGraph.test.ts#L90): is periodic in signed travel and has stationary planted feet in world space
- [src/bodyGraph.test.ts:104](../../src/bodyGraph.test.ts#L104): %s loops continuously and never claims unreachable contact
- [src/bodyGraph.test.ts:123](../../src/bodyGraph.test.ts#L123): rejects invalid clocks and solver inputs
- [src/creatureDistinctness.test.ts:17](../../src/creatureDistinctness.test.ts#L17): warns on matching shape, palette, size and pattern
- [src/creatureDistinctness.test.ts:20](../../src/creatureDistinctness.test.ts#L20): allows the same silhouette when coat colour differs
- [src/creatureDistinctness.test.ts:26](../../src/creatureDistinctness.test.ts#L26): allows the same silhouette at different actual sizes
- [src/creatureDistinctness.test.ts:31](../../src/creatureDistinctness.test.ts#L31): allows different markings with the same palette and size
- [src/creatureDistinctness.test.ts:38](../../src/creatureDistinctness.test.ts#L38): allows different shapes even when all the other measures are close
- [src/creatureDistinctness.test.ts:43](../../src/creatureDistinctness.test.ts#L43): does not produce a look-alike warning from missing palette data
- [src/creatureDistinctness.test.ts:46](../../src/creatureDistinctness.test.ts#L46): makes the art-check look-alike result warning-only and keeps growth separate
- [src/creatureSelection.test.ts:24](../../src/creatureSelection.test.ts#L24): selects individual species explicitly and ignores malformed tokens
- [src/creatureSelection.test.ts:31](../../src/creatureSelection.test.ts#L31): keeps Current records and hash for explicit current and unavailable choices
- [src/creatureSelection.test.ts:38](../../src/creatureSelection.test.ts#L38): hashes selected content and keeps base/other records immutable
- [src/creatureSelection.test.ts:47](../../src/creatureSelection.test.ts#L47): uses identical selection in serialized page/worker contexts
- [src/creatureSelection.test.ts:55](../../src/creatureSelection.test.ts#L55): separates same-id sprite caches and restores the exact current sprite
- [src/creatureSelection.test.ts:63](../../src/creatureSelection.test.ts#L63): separates persistent creature/face/rig cache entries by the selected genome
- [src/creatureSelection.test.ts:77](../../src/creatureSelection.test.ts#L77): uses the selected anatomy for rig pieces too
- [src/creatureSelection.test.ts:83](../../src/creatureSelection.test.ts#L83): rejects a selected record for another species
- [src/creatureSelection.test.ts:88](../../src/creatureSelection.test.ts#L88): resolves selected per-level look and includes the level in its hash
- [src/creatureSizeCandidate.test.ts:9](../../src/creatureSizeCandidate.test.ts#L9): enables revised sizes by default after Ed's adoption
- [src/creatureSizeCandidate.test.ts:10](../../src/creatureSizeCandidate.test.ts#L10): lets Ed compare old sizes from the game link
- [src/creatureSizeCandidate.test.ts:14](../../src/creatureSizeCandidate.test.ts#L14): fits anatomical bodies only when opted in and isolates the sprite cache
- [src/creatureSizeCandidate.test.ts:24](../../src/creatureSizeCandidate.test.ts#L24): keeps readable small adults and the medium anchor with a broader adult range
- [src/creatureSizeCandidate.test.ts:31](../../src/creatureSizeCandidate.test.ts#L31): separates each age and keeps every mass class ordered at native size
- [src/creatureSizeCandidate.test.ts:40](../../src/creatureSizeCandidate.test.ts#L40): scales all bodies with the same witch reference and rejects invalid inputs
- [src/creatureSizeModel.test.ts:10](../../src/creatureSizeModel.test.ts#L10): covers every species exactly once and keeps continuous age targets ordered
- [src/creatureSizeModel.test.ts:15](../../src/creatureSizeModel.test.ts#L15): keeps the accepted bands, full-presence legend ratio and hard real-size pairs
- [src/creatureSizeModel.test.ts:25](../../src/creatureSizeModel.test.ts#L25): %s uses the final age target in both game facings
- [src/creatureSizeModel.test.ts:31](../../src/creatureSizeModel.test.ts#L31): keeps every tolerance interval inside hard growth, legend and ordering bounds
- [src/creatures.test.ts:15](../../src/creatures.test.ts#L15): assemble cleanly: the index current, every record in its folder, no genome problems
- [src/creatures.test.ts:19](../../src/creatures.test.ts#L19): each creature.js holds only known sections, of the right shapes (config/schema/creature.schema.json)
- [src/creatures.test.ts:23](../../src/creatures.test.ts#L23): every creature in the game has its folder, with its movement and voice
- [src/creatures.test.ts:37](../../src/creatures.test.ts#L37): decisions: every fragment named by its pr and group, ids unique, none left in the file
- [src/creatures.test.ts:41](../../src/creatures.test.ts#L41): flora: one file a species, the index current, none left in genomes.js, the baseline folder sound
- [src/creatures.test.ts:45](../../src/creatures.test.ts#L45): areas: a folder an area with its kind line, the recipes and the original areas' flora in them, the kinds' slots whole
- [src/creatures.test.ts:67](../../src/creatures.test.ts#L67): finds the pasted records and no more, each its own module without the spread
- [src/creatures.test.ts:76](../../src/creatures.test.ts#L76): leaves the file's array empty (the adopt puts the index's spread back) and what follows it as it was
- [src/defaultRoster.test.ts:6](../../src/defaultRoster.test.ts#L6): enables exactly Ed's twenty kept redesigns, with immutable Current fallback
- [src/defaultRoster.test.ts:16](../../src/defaultRoster.test.ts#L16): keeps redesigned and explicit Current species/cache identities separate
- [src/earSilhouette.test.ts:22](../../src/earSilhouette.test.ts#L22): does not regress baby/adult attachment in any game-style facing and retains Current baby
- [src/earSilhouette.test.ts:34](../../src/earSilhouette.test.ts#L34): both ears have visible pixels in the actual %s render without a narrow horn
- [src/earSilhouette.test.ts:46](../../src/earSilhouette.test.ts#L46): uses straight triangular edges rather than the old rounded leaf
- [src/earSilhouette.test.ts:51](../../src/earSilhouette.test.ts#L51): both adult tips clear the skull by 2 art px with pointed outlines in %s
- [src/felineGraph.test.ts:22](../../src/felineGraph.test.ts#L22): retains the Current sand-cat baby pixels and normals in both facings
- [src/felineGraph.test.ts:30](../../src/felineGraph.test.ts#L30): gives both non-baby sand-cat ears mirrored geometry
- [src/felineGraph.test.ts:43](../../src/felineGraph.test.ts#L43): positions low, splayed ears symmetrically without moving the head
- [src/felineGraph.test.ts:53](../../src/felineGraph.test.ts#L53): wraps rosettes onto the back and both flanks and leaves the belly clear
- [src/felineGraph.test.ts:65](../../src/felineGraph.test.ts#L65): keeps pale ring centres, ring ink and solid regional spots separate
- [src/felineGraph.test.ts:81](../../src/felineGraph.test.ts#L81): uses actual bake scale for native ring size and excludes spine/rump outside the region
- [src/felineGraph.test.ts:93](../../src/felineGraph.test.ts#L93): sets native marking scale through the real renderer callback
- [src/felineGraph.test.ts:102](../../src/felineGraph.test.ts#L102): keeps an opt-in baby's belly below its back even with inverted legacy ratios
- [src/felineGraph.test.ts:109](../../src/felineGraph.test.ts#L109): %s uses a connected graph at every level without mutating current art
- [src/moleReferenceFit.test.ts:16](../../src/moleReferenceFit.test.ts#L16): keeps the final age target governing pinned and unpinned mole proportions
- [src/moleReferenceFit.test.ts:25](../../src/moleReferenceFit.test.ts#L25): separates barrel vertical depth and width without changing the other axis
- [src/moleReferenceFit.test.ts:31](../../src/moleReferenceFit.test.ts#L31): moves and reshapes existing snout/paws and rejects invalid controls
- [src/multiHeadExpressions.test.ts:8](../../src/multiHeadExpressions.test.ts#L8): keeps the adult hydra angry brows visible on its actual multi-head geometry
- [src/napSizeCompatibility.test.ts:8](../../src/napSizeCompatibility.test.ts#L8): %s age %s lies no taller than its awake form
- [src/projectedModelFit.test.ts:6](../../src/projectedModelFit.test.ts#L6): uses exact ellipsoid support instead of its largest radius
- [src/projectedModelFit.test.ts:14](../../src/projectedModelFit.test.ts#L14): bounds rounded boxes, tapered cones and roughness conservatively
- [src/projectedModelFit.test.ts:22](../../src/projectedModelFit.test.ts#L22): fits skew plane coordinates using the same dual basis as ray clipping
- [src/projectedModelFit.test.ts:27](../../src/projectedModelFit.test.ts#L27): retains extras exclusion, explicit scale, projection and ground-row placement
- [src/projectedModelFit.test.ts:37](../../src/projectedModelFit.test.ts#L37): sparse edge and query rays match the full native mask after ground placement
- [src/quadFitDragonfly.test.ts:13](../../src/quadFitDragonfly.test.ts#L13): lets the final age target govern pinned quadruped proportion changes
- [src/quadFitDragonfly.test.ts:21](../../src/quadFitDragonfly.test.ts#L21): keeps dragonfly wing length and width independent and their roots fixed
- [src/quadFitDragonfly.test.ts:29](../../src/quadFitDragonfly.test.ts#L29): sets wing elevation in radians, including flat panes in both frames
- [src/rigSizeCapture.test.ts:7](../../src/rigSizeCapture.test.ts#L7): capture-only %s fit keeps exactly the full-raster scale and geometry
- [src/rosettePainter.test.ts:19](../../src/rosettePainter.test.ts#L19): retains the pre-change painter bytes when all new fields are absent
- [src/rosettePainter.test.ts:27](../../src/rosettePainter.test.ts#L27): keeps centre dots separated from the ring and accepts material names or indices
- [src/rosettePainter.test.ts:55](../../src/rosettePainter.test.ts#L55): fades whole cells toward the belly and neck with clamped, composable ramps
- [src/rosettePainter.test.ts:90](../../src/rosettePainter.test.ts#L90): rejects invalid bounds instead of emitting unstable patterns
- [src/rules/budget.test.ts:12](../../src/rules/budget.test.ts#L12): starts with the whole view
- [src/rules/budget.test.ts:13](../../src/rules/budget.test.ts#L13): holds at a good frame rate, never past the haze's far edge
- [src/rules/budget.test.ts:14](../../src/rules/budget.test.ts#L14): shrinks slowly while frames stay slow, not at the first slow frame
- [src/rules/budget.test.ts:21](../../src/rules/budget.test.ts#L21): never goes below its minimum
- [src/rules/budget.test.ts:22](../../src/rules/budget.test.ts#L22): holds in the hysteresis band between slow and fast
- [src/rules/budget.test.ts:27](../../src/rules/budget.test.ts#L27): grows back with headroom
- [src/rules/budget.test.ts:31](../../src/rules/budget.test.ts#L31): ignores long frames (a hidden tab, a hitch) and stays put when not adaptive
- [src/rules/interpolate.test.ts:13](../../src/rules/interpolate.test.ts#L13): draws a 💌 and a shot where they were at the moment drawn, and puts them back
- [src/rules/islandShape.test.ts:9](../../src/rules/islandShape.test.ts#L9): gives every kind its own sigil, home's the World Tree
- [src/rules/islandShape.test.ts:24](../../src/rules/islandShape.test.ts#L24): pictures every kind's island with its sigil in whole pixels, readable at a bubble's 30 px, and as a path for the sea chart
- [src/rules/lakeShore.test.ts:38](../../src/rules/lakeShore.test.ts#L38): draws every piece, only the lava rocks glowing
- [src/rules/rules.test.ts:598](../../src/rules/rules.test.ts#L598): come as campfires and ponds (rune stones now only mark soundsystem spots), the same from the same seed, and keep off the dancefloor
- [src/rules/rules.test.ts:1014](../../src/rules/rules.test.ts#L1014): run along the edge of an area's own ground, each point knowing the area across, cheaply
- [src/rules/rules.test.ts:1036](../../src/rules/rules.test.ts#L1036): faces the viewer unless clearly heading up the screen, with a little hysteresis on the cone
- [src/rules/rules.test.ts:1409](../../src/rules/rules.test.ts#L1409): shows only the moon before the first wave (with the island's sigil off), in its twilight palette, and switches on, once, when the first wave comes
- [src/rules/rules.test.ts:1434](../../src/rules/rules.test.ts#L1434): shows the island's sigil through the boot (home's: the World Tree), written on as the pulse goes round, the moon before
- [src/rules/rules.test.ts:1455](../../src/rules/rules.test.ts#L1455): draws the moon's phases: none lit at new, the right half at first quarter, all at full, the left half at last quarter
- [src/rules/rules.test.ts:1484](../../src/rules/rules.test.ts#L1484): lights the witch's tile where she stands, and ripples out from her
- [src/rules/rules.test.ts:1495](../../src/rules/rules.test.ts#L1495): composes the layers: an event's pulse shows over the pattern, towards its area
- [src/rules/rules.test.ts:1832](../../src/rules/rules.test.ts#L1832): goes through its phases, crosses the sky, and now and then turns red, blue or gold, the same for a seed
- [src/rules/trunkShadowTuning.test.ts:7](../../src/rules/trunkShadowTuning.test.ts#L7): are Ed's tuned values
- [src/rules/trunkShadowTuning.test.ts:11](../../src/rules/trunkShadowTuning.test.ts#L11): fade at the foot and near her, taper at the foot, and darken the ground cover
- [src/sizeAdoptionRegressions.test.ts:6](../../src/sizeAdoptionRegressions.test.ts#L6): keeps %s legend expressions on the visible blended head
- [src/sizeAdoptionRegressions.test.ts:15](../../src/sizeAdoptionRegressions.test.ts#L15): keeps both sleeping woodlouse legend ground anchors inside their native canvases
- [src/sizeAdoptionRegressions.test.ts:26](../../src/sizeAdoptionRegressions.test.ts#L26): keeps the resized crocodile carrier within its existing length and back limits
- [src/snowLeopardWhiskers.test.ts:16](../../src/snowLeopardWhiskers.test.ts#L16): pins projected-fit Current material and normal bytes with the control absent
- [src/snowLeopardWhiskers.test.ts:23](../../src/snowLeopardWhiskers.test.ts#L23): keeps top-view attachment non-worsening with the pixel floor on the projected grid
- [src/snowLeopardWhiskers.test.ts:29](../../src/snowLeopardWhiskers.test.ts#L29): passes the unchanged paired guard in all adult facings for frame %s
- [src/snowLeopardWhiskers.test.ts:32](../../src/snowLeopardWhiskers.test.ts#L32): rejects invalid pixel floors
- [src/stableMotes.test.ts:5](../../src/stableMotes.test.ts#L5): places the intended separated count deterministically without overwriting bodies
- [src/stableMotes.test.ts:11](../../src/stableMotes.test.ts#L11): bounds the search when no empty cells can hold an effect
- [src/tailMarkings.test.ts:13](../../src/tailMarkings.test.ts#L13): pins projected-fit %s material and normal bytes with the region absent
- [src/tailMarkings.test.ts:25](../../src/tailMarkings.test.ts#L25): uses arc length around bends for rings and the tip, preserving geometry
- [src/tailMarkings.test.ts:35](../../src/tailMarkings.test.ts#L35): reuses seeded rosettes, filled cells and centre dots around the whole tail
- [src/tailMarkings.test.ts:46](../../src/tailMarkings.test.ts#L46): wires the region through a selected creature without changing its shape or Current
- [src/tailMarkings.test.ts:55](../../src/tailMarkings.test.ts#L55): rejects invalid fields and does not guess a path for non-chain tails

## art-rendering: ruling review

- Size supersession: creatures.md formerly required legends≥1.75×rounded adult height; revised-size rule explicitly supersedes that floor and retains creatureSizeCandidate=0 for comparison. artLabSizeBundle exercises0/1 and textureSizeCompatibility checks physical-size parity; neither requires the superseded universal floor.
- Stiltwalkers explicitly replaces Tall Tales’ whole-body stretch. Its recipe/expiry tests restore length1; rig tests retain normal torso/head and fixed feet. The replacement is protected rather than the removed stretch.
- Stage-zero stop: old view.md said no stage1 work until frame review; current text says that stop was superseded and the original stage0 mock remains for comparison. fxMockModel tests a documented comparison path, not a production stop.
- Set pieces are phased out of normal generation29Oct, while recipes/art remain for previews. Retained art comparisons are not obsolete merely because their setup draws legacy scenery.
- programReadiness’s “OBSOLETE WAIT” is cancellation of a replaced island’s work, not an obsolete design test. No proven whole-case leftover deletion emerged. The 32 art-check dependency/cache tests are tools/CI handoff; five multiplayer and one timed arena-count case remain with their existing owners.
- Second review 6566610088: 31 October revised-size rules supersede universal old age bands only for revised sizes; explicit creatureSizeCandidate=0 keeps previous comparisons supported. Projected-fit tests explicitly select support math. 30 October combined likeness policy warns rather than fails; tests enforce it. Twenty adopted redesigns and current fallback/cache identities remain intentional. Both old/new raster hashes are present.

## creatures-movement: review provenance

Pinned source reviews6566093230 and 6566223656/6566231272 are preserved. After merging released prototype 7f6dcba3 (v6972), three fixed-population cases and refreshed movement IDs are owner-only under 1622. The 146 still-current reviewed creature tests remain grouped; no new combat behavior is reviewed here.

<a id="c1"></a>

## C1: Emergent travel, sleep, scenery and convergence thresholds

outcome stats; 15 tests; files take ~260 s.

Mixed tests pin a200 m baby arrival in8 s, squirrel glide/landing counts over 120 s, circle-baby sleep share over 300 s, normalized follower spacing after 6 s,800-draw level shares27–40%, idler naps, coarse marcher progress. Preserve conservation, boundaries, glide speed/landing, forced-level/determinism, boss exclusion and immediate LOD transitions before splitting. Second pass6566223656 adds sampled berry-area/patch shares, stone-idle outside/center shares, roaming grid coverage, fast-species share and conga convergence. Preserve berry indexing/conservation and seed equality, no-cross-area/speed limits, direct configured speed ordering, victory/quest/legend/leash state and following-mode invariants.

- [src/rules/babies.test.ts:120](../../src/rules/babies.test.ts#L120): one far off (200 m, out of sight) is back with her in seconds
- [src/rules/berries.test.ts:38](../../src/rules/berries.test.ts#L38): every area has perArea berries, one per bush, and the same seed gives the same berries
- [src/rules/berries.test.ts:124](../../src/rules/berries.test.ts#L124): bushes grow in patches: each bush has others of its patch close by
- [src/rules/glide.test.ts:12](../../src/rules/glide.test.ts#L12): glides to its far spots (held still through its pause, then sailing there), and only gliders do
- [src/rules/growth.test.ts:25](../../src/rules/growth.test.ts#L25): picks each grown creature's level by the weights, the same from the same seed
- [src/rules/naps.test.ts:35](../../src/rules/naps.test.ts#L35): has some of an area's idlers asleep at a time, not all, each for a while, with her in the treetops; never a legend
- [src/rules/naps.test.ts:129](../../src/rules/naps.test.ts#L129): is asleep most of the time, getting up now and then, with her away from its circle
- [src/rules/rules.test.ts:551](../../src/rules/rules.test.ts#L551): roam their whole area, slowly, and never leave it
- [src/rules/rules.test.ts:1581](../../src/rules/rules.test.ts#L1581): leaves the witch several times faster than any creature, the fast few rare, legends slowest
- [src/rules/simLod.test.ts:75](../../src/rules/simLod.test.ts#L75): far from her and the action they march coarsely, at their marching pace, and come into full near the soundsystem
- [src/rules/spacing.test.ts:40](../../src/rules/spacing.test.ts#L40): keeps her party from bunching as they follow her
- [src/rules/stoneIdle.test.ts:33](../../src/rules/stoneIdle.test.ts#L33): they start and roam in a loose cluster round it, never on it; babies, legends and the circle's baby as before
- [src/rules/stoneIdle.test.ts:52](../../src/rules/stoneIdle.test.ts#L52): a friendly area's creatures, and every creature with stoneIdle off, roam the whole area as before
- [src/rules/win.test.ts:173](../../src/rules/win.test.ts#L173): the win: the dealt legends woken and home (an enraged one lulled), everyone else in the conga, her leash let go, nothing fighting; the islands found only tonight's quests' (Ed, 2026-10-18); then the card
- [src/rules/win.test.ts:307](../../src/rules/win.test.ts#L307): on the ground in the home area the line files after her along where she's walked, its leader followLead behind her

<a id="c2"></a>

## C2: Explicit growth comparison helpers

current rules; 2 tests; files take ~3 s.

Controlled wave and visibility inputs verify pending-growth bookkeeping, no growth at home/party areas, growth-off0 and stable materialization IDs. These are retained comparison contracts, not a proposed return to old default population growth.

- [src/rules/growth.test.ts:34](../../src/rules/growth.test.ts#L34): grows every still-wild area by perWave a wave, as counts only, never home or a partified area
- [src/rules/growth.test.ts:47](../../src/rules/growth.test.ts#L47): makes the counts real only near a witch, out of her sight; a woken area's at once

<a id="c3"></a>

## C3: Direct movement and creature integrity

current rules; 90 tests; files take ~301 s.

Remaining assertions protect count/identity conservation, floor/shore state, eligibility, scheduling and hysteresis. Scripted movement checks are not outcome gates merely because they take steps. Posse membership through a constructed fight is ownership/integrity, not win balance. Second pass adds literal creature-record property order, repeated seed/input digest equality, fixed-step/substep/once-only input integrity, current bag cadence/range, berry stage/adult caps, diagonal speed normalization, configured rise delay/nozzles and ordered victory/conga gates. Those are direct contracts even when numeric or stepped.

- [src/rules/babies.test.ts:41](../../src/rules/babies.test.ts#L41): walk in single file behind her along where she's been, in stack order (the bottom one first), babies.gap apart
- [src/rules/babies.test.ts:56](../../src/rules/babies.test.ts#L56): scatter for the whole fight: from when something goes for her (before any hit), one way throughout, back into line only babies.calm seconds after it's over
- [src/rules/babies.test.ts:90](../../src/rules/babies.test.ts#L90): scatter off the screen (Ed, 2026-10-26: "outside of my camera view"): each at least babies.scatter from her, past the view's farthest edge (50 m at zoom 3 on his screen), pulling on her not at all, and on the island's land, even fleeing toward the sea
- [src/rules/babies.test.ts:140](../../src/rules/babies.test.ts#L140): following her, a baby never stops for a berry; its sigil put down with a berry within babyReach, it eats it, and one berry makes it a youth
- [src/rules/babies.test.ts:154](../../src/rules/babies.test.ts#L154): doesn't eat a berry further than babyReach from its placed sigil
- [src/rules/babies.test.ts:165](../../src/rules/babies.test.ts#L165): 8 babies fill her free allowance on the ground and in the treetops, whatever their species
- [src/rules/babies.test.ts:179](../../src/rules/babies.test.ts#L179): a tidy line costs nothing: babies at their places behind her pull no load; one left far behind pulls
- [src/rules/bags.test.ts:19](../../src/rules/bags.test.ts#L19): are the satchel (the starter, at the top), the Bumbag and the Purse: all hers from the start, no None
- [src/rules/bags.test.ts:32](../../src/rules/bags.test.ts#L32): the satchel throws at the base rate and reach with a little more homing; the Bumbag faster and shorter; the purse slower and further
- [src/rules/bags.test.ts:44](../../src/rules/bags.test.ts#L44): is the bag she wears; with none on, none
- [src/rules/bags.test.ts:53](../../src/rules/bags.test.ts#L53): sets her 💌s in play: the Bumbag's letters fly 25 m and come every 0.42 s, the purse's 43 m every 0.7 s
- [src/rules/bags.test.ts:71](../../src/rules/bags.test.ts#L71): the starting three aren't found in the forest; the rest are, each its own way to throw (Ed, 2026-10-29)
- [src/rules/bags.test.ts:82](../../src/rules/bags.test.ts#L82): every bot carries one, the same every game: the careful ones the Purse, the others the satchel
- [src/rules/berries.test.ts:52](../../src/rules/berries.test.ts#L52): party animals walk to a berry and eat it; it grows again elsewhere, so the total never changes
- [src/rules/berries.test.ts:64](../../src/rules/berries.test.ts#L64): wild animals and legends never eat
- [src/rules/berries.test.ts:74](../../src/rules/berries.test.ts#L74): evolves after 1 and 4 berries (a baby's one: Ed, 2026-10-11; the youth's by its strength gained, Ed 2026-10-05; 3 / 4 / 8 by strength, Ed 2026-10-27), on a bar line, up to adult and no further (Ed, 2026-10-04); legends can't be invited
- [src/rules/berries.test.ts:101](../../src/rules/berries.test.ts#L101): following her, a youth eats the berries it passes up to one short of adult and leaves the rest; only at a sigil she's put down does it eat the last and grow (Ed, 2026-10-27); a baby following her eats none
- [src/rules/berries.test.ts:130](../../src/rules/berries.test.ts#L130): a party animal takes a berry on its way (within the detour), not one off to the side
- [src/rules/berries.test.ts:147](../../src/rules/berries.test.ts#L147): a party animal goes to a berry at its leash pace, not its idle amble
- [src/rules/creatureShape.test.ts:14](../../src/rules/creatureShape.test.ts#L14): has every field, required then optional in one order, for every creature (legends too)
- [src/rules/grounded.test.ts:39](../../src/rules/grounded.test.ts#L39): weighs the stack: each creature at creatureWeight, babies and the gone not at all
- [src/rules/grounded.test.ts:51](../../src/rules/grounded.test.ts#L51): light and heavy species extrapolate: weight is level weight times strength
- [src/rules/grounded.test.ts:59](../../src/rules/grounded.test.ts#L59): one adult, or three young, keep her on the ground: said, and no cooldown spent
- [src/rules/grounded.test.ts:66](../../src/rules/grounded.test.ts#L66): two young, or any number of babies, don't
- [src/rules/grounded.test.ts:73](../../src/rules/grounded.test.ts#L73): parked animals don't count: an adult's sigil put down on the ground frees her
- [src/rules/grounded.test.ts:81](../../src/rules/grounded.test.ts#L81): a take-off pulled back down is input: she stops idling into the party
- [src/rules/grounded.test.ts:91](../../src/rules/grounded.test.ts#L91): the weight is a knob (leash.grounded.weight), 0 turning it off
- [src/rules/grounded.test.ts:98](../../src/rules/grounded.test.ts#L98): up in the treetops when the count is reached, she stays up: it only stops the next take-off
- [src/rules/growth.test.ts:72](../../src/rules/growth.test.ts#L72): in a game: nothing grows any more (Ed, 2026-10-07: the areas are peopled from the start, rules/clear.test.ts)
- [src/rules/kinds.test.ts:11](../../src/rules/kinds.test.ts#L11): has every area type's species once, and no other
- [src/rules/kinds.test.ts:15](../../src/rules/kinds.test.ts#L15): introduces 10 at home, 6 in phase 1, then 16 in each of phases 2, 3 and 4 (the roster, Ed, 2026-10-23: layout B): 64, each with a bearing 0 to 360
- [src/rules/kinds.test.ts:34](../../src/rules/kinds.test.ts#L34): deals only the first 32 slots' kinds on the classic map, so adding or moving a journey kind leaves today's maps as they were
- [src/rules/naps.test.ts:49](../../src/rules/naps.test.ts#L49): wakes them gently when she lands in their area: up over naps.wake, out of fights meanwhile, and no new naps while she's there
- [src/rules/naps.test.ts:70](../../src/rules/naps.test.ts#L70): keeps them asleep with her in the treetops right over them, or on the ground in the next area, close to the border
- [src/rules/naps.test.ts:90](../../src/rules/naps.test.ts#L90): wakes them when their area is partified, and lets no one nap with naps off
- [src/rules/naps.test.ts:106](../../src/rules/naps.test.ts#L106): leaves a sleep without napUntil (the party's over) alone: down till cleared, out of fights
- [src/rules/naps.test.ts:137](../../src/rules/naps.test.ts#L137): sleeps on with her on the ground elsewhere in its area, and wakes when she comes to its circle (so she can invite it)
- [src/rules/riseCooldown.test.ts:23](../../src/rules/riseCooldown.test.ts#L23): is 3 s
- [src/rules/riseCooldown.test.ts:25](../../src/rules/riseCooldown.test.ts#L25): just landed, rising does nothing till riseCooldown seconds after; then she rises (the bare broom: Ed, 2026-10-23, no quick take-off)
- [src/rules/riseCooldown.test.ts:35](../../src/rules/riseCooldown.test.ts#L35): the Jet nozzles' is half (the plain broom's old quick take-off, won back by a part: Ed, 2026-10-23); the bare broom's isn't
- [src/rules/riseCooldown.test.ts:46](../../src/rules/riseCooldown.test.ts#L46): at 0, she rises again at once
- [src/rules/rules.test.ts:329](../../src/rules/rules.test.ts#L329): starts on the ground with the canopy hidden
- [src/rules/rules.test.ts:336](../../src/rules/rules.test.ts#L336): flies at ground speed on the ground and treetop speed above
- [src/rules/rules.test.ts:346](../../src/rules/rules.test.ts#L346): flies in her up and down heading sprites only near straight up or down the screen, with hysteresis
- [src/rules/rules.test.ts:406](../../src/rules/rules.test.ts#L406): rises in riseTime and descends in descendTime: fast, but not instant
- [src/rules/rules.test.ts:422](../../src/rules/rules.test.ts#L422): turns back halfway when the button is pressed again
- [src/rules/rules.test.ts:430](../../src/rules/rules.test.ts#L430): stays inside the map
- [src/rules/rules.test.ts:435](../../src/rules/rules.test.ts#L435): faces the way she flies
- [src/rules/rules.test.ts:440](../../src/rules/rules.test.ts#L440): is no faster diagonally
- [src/rules/rules.test.ts:510](../../src/rules/rules.test.ts#L510): are each area's own kind, all 30 drawn by the art module
- [src/rules/rules.test.ts:517](../../src/rules/rules.test.ts#L517): start with population.start in every area and more by its place on the route (Ed, 2026-10-07: pre-populated, no growth on a clock): none at home, and one legend in each that has one (legends.share: Ed, 2026-10-06)
- [src/rules/rules.test.ts:536](../../src/rules/rules.test.ts#L536): have one legend in each area map.hasLegend picks, never home (Ed, 2026-10-05, 2026-10-06), each a boss, asleep, out of their clearings (Ed, 2026-10-04)
- [src/rules/rules.test.ts:579](../../src/rules/rules.test.ts#L579): only move near the witch, and pick up plausibly when she comes back
- [src/rules/rules.test.ts:1563](../../src/rules/rules.test.ts#L1563): casts the speed boost: much faster for its duration, then recharges over its cooldown
- [src/rules/rules.test.ts:1574](../../src/rules/rules.test.ts#L1574): makes her fly faster in the game
- [src/rules/rules.test.ts:1678](../../src/rules/rules.test.ts#L1678): is deterministic: the same seed and inputs give the same state
- [src/rules/rules.test.ts:1683](../../src/rules/rules.test.ts#L1683): steps in fixed steps: a frame's length only decides how many
- [src/rules/rules.test.ts:1695](../../src/rules/rules.test.ts#L1695): keeps a press made in a frame too short for a step for the next step
- [src/rules/rules.test.ts:1706](../../src/rules/rules.test.ts#L1706): applies a press once, however many steps a slow frame runs
- [src/rules/runaway.test.ts:37](../../src/rules/runaway.test.ts#L37): runs to the nearest beach and lies down asleep there, apart from the others and the beach witches, gone for the rules
- [src/rules/runaway.test.ts:60](../../src/rules/runaway.test.ts#L60): the party lost: it's up off the beach and asleep in its own area, with everyone else
- [src/rules/simLod.test.ts:19](../../src/rules/simLod.test.ts#L19): in full within full of her: a step every step
- [src/rules/simLod.test.ts:27](../../src/rules/simLod.test.ts#L27): beyond it, coarse: still on most steps, and by `every` steps at once on its turn
- [src/rules/simLod.test.ts:41](../../src/rules/simLod.test.ts#L41): frozen past the simulation radius (by its home)
- [src/rules/simLod.test.ts:50](../../src/rules/simLod.test.ts#L50): comes into full at the line, and goes out only band past it
- [src/rules/simLod.test.ts:86](../../src/rules/simLod.test.ts#L86): near her they march in full
- [src/rules/simLod.test.ts:93](../../src/rules/simLod.test.ts#L93): coarse marching keeps pace with full marching
- [src/rules/spacing.test.ts:14](../../src/rules/spacing.test.ts#L14): sizes a body by its kind and level: a bear's bigger than a dormouse's, a legend's the biggest
- [src/rules/spacing.test.ts:20](../../src/rules/spacing.test.ts#L20): eases a heap apart, softly, to about the room their sizes want: more round a bear than between dormice
- [src/rules/spacing.test.ts:33](../../src/rules/spacing.test.ts#L33): leaves a sleeping legend where it lies, and pushes others off it
- [src/rules/travel.test.ts:36](../../src/rules/travel.test.ts#L36): has a party animal following her through the treetops travel, quiet: wild creatures it passes don't engage it, nor it them
- [src/rules/travel.test.ts:53](../../src/rules/travel.test.ts#L53): has a traveller join her posse inside the radius and fight as ever
- [src/rules/travel.test.ts:68](../../src/rules/travel.test.ts#L68): plans a route along area borders, clear of every area's middle but near its ends
- [src/rules/travel.test.ts:87](../../src/rules/travel.test.ts#L87): re-plans the route when its target moves on
- [src/rules/travel.test.ts:100](../../src/rules/travel.test.ts#L100): keeps every party animal in her posse through a 30 s arena fight with her dodging round
- [src/rules/travel.test.ts:116](../../src/rules/travel.test.ts#L116): has hysteresis at the radius, and a party animal in a fight stays in her posse wherever it is
- [src/rules/travel.test.ts:136](../../src/rules/travel.test.ts#L136): has only party animals in her posse eat berries: not travellers, not wild ones (Ed, 2026-10-05)
- [src/rules/win.test.ts:44](../../src/rules/win.test.ts#L44): every incomplete legend sleeps in its circle at win, even if happy or a party legend; completed quests still dance
- [src/rules/win.test.ts:67](../../src/rules/win.test.ts#L67): last call: the final stone is flagged before its wave; after it the route is done
- [src/rules/win.test.ts:74](../../src/rules/win.test.ts#L74): stragglers: the pointer goes to the enraged animal nearest the centre, never an enraged legend, and nothing moves on while any lives
- [src/rules/win.test.ts:89](../../src/rules/win.test.ts#L89): the lap: none left, the pulse runs home from the last stone, each stone firing once in reverse order; then the win
- [src/rules/win.test.ts:111](../../src/rules/win.test.ts#L111): finds disappear once the night is won (Ed, 2026-10-24): one not yet taken is gone, E taking nothing after
- [src/rules/win.test.ts:229](../../src/rules/win.test.ts#L229): losing comes first: home's speakers down before the win, the party's over and the night is never won
- [src/rules/win.test.ts:266](../../src/rules/win.test.ts#L266): before wave 1 lands (the pulse still on the ring's stretch, or out along the first link) the island can't count as cleared, so no lap sets off
- [src/rules/win.test.ts:274](../../src/rules/win.test.ts#L274): `won ${stage === "start" ? "just as wave 1 lands, the pulse at the second link's start" : "mid-route after wave 1"}: the pulse home runs to links -1, the front, the ring's path longer, and the win comes there`
- [src/rules/win.test.ts:325](../../src/rules/win.test.ts#L325): she stops: they stop behind her; up in the treetops or out of the home area they go back round the dancefloor
- [src/rules/win.test.ts:345](../../src/rules/win.test.ts#L345): never on her leash (Ed's playtest, 2026-10-26: "when I land in the home area, they start following me, and they are all added to my sigil stack"): landing at home, walking with the line and pressing the sigil button among it, her stack stays empty and none of them is leashed
- [src/rules/win.test.ts:364](../../src/rules/win.test.ts#L364): puts any number of them on arcs north of the floor, beyond the conga's ring, apart, clear of the treehouse, the same every time
- [src/rules/win.test.ts:385](../../src/rules/win.test.ts#L385): the night's legends are the dealt kinds' (map.legendKinds); the island's sigil is its island's kind's, home's the World Tree
- [src/rules/win.test.ts:398](../../src/rules/win.test.ts#L398): a kind's island flares its own sigil at the win, home the World Tree (art4: art/sigils.js islandSigil)

<a id="c4"></a>

## C4: Human-limited bot observations and decisions

current rules; 39 tests; files take ~4 s.

The 39 tests use scripted observations/frames and explicit player clocks, not generated-night strength runs. They enforce detached information, ≥0.25 s reaction, ≤8 Hz input, bounded non-renewing coverage/quest slots, danger overrides and acknowledgement before another toggle/cycle. The 960-frame trace is scripted policy coverage, not a battle outcome.

- [src/bots/coverage.test.ts:5](../../src/bots/coverage.test.ts#L5): coverage remembers only whole cells in observed rectangles and is repeatable
- [src/bots/coverage.test.ts:15](../../src/bots/coverage.test.ts#L15): a least-seen candidate wins over a previously observed footprint and holds its waypoint
- [src/bots/coverage.test.ts:23](../../src/bots/coverage.test.ts#L23): the waypoint deadline does not renew and there is only one episode per thirty-second interval
- [src/bots/coverage.test.ts:30](../../src/bots/coverage.test.ts#L30): no observed movement abandons the heading with a bounded cooldown
- [src/bots/coverageGuard.test.ts:4](../../src/bots/coverageGuard.test.ts#L4): full health is required and any damage aborts even when HP remains above four
- [src/bots/coverageGuard.test.ts:8](../../src/bots/coverageGuard.test.ts#L8): KO, healing, alarm and every audible windup block optional coverage
- [src/bots/coverageGuard.test.ts:11](../../src/bots/coverageGuard.test.ts#L11): visible unangered adults at thirty metres block; sleeping legends and friendly adults do not
- [src/bots/coverageGuard.test.ts:19](../../src/bots/coverageGuard.test.ts#L19): an unsafe job consumes its slot and cannot resume after the cue clears
- [src/bots/coverageGuard.test.ts:25](../../src/bots/coverageGuard.test.ts#L25): the HP3 episode before the recorded KO is rejected before a close cheetah pass
- [src/bots/expert-trace.test.ts:37](../../src/bots/expert-trace.test.ts#L37): `diagnostic output preserves every control, questMax=${questMax}, coverage=${coverageExploration}, questJob=${knownQuestPriority}, delivery=${questDeliveryRepair}`
- [src/bots/expert-trace.test.ts:67](../../src/bots/expert-trace.test.ts#L67): a selected dream visit remembers only its observed position after it leaves view
- [src/bots/expert-trace.test.ts:75](../../src/bots/expert-trace.test.ts#L75): `arrival alone never marks a dream read; real ${open ? "open" : "closed"} cue releases job`
- [src/bots/expert-trace.test.ts:86](../../src/bots/expert-trace.test.ts#L86): healing, KO and audible dodge interrupt the visit without replacing its destination
- [src/bots/expert-trace.test.ts:98](../../src/bots/expert-trace.test.ts#L98): `the 30-second deadline cannot renew or restart, interrupted=${interrupted}`
- [src/bots/expert-trace.test.ts:120](../../src/bots/expert-trace.test.ts#L120): scheduled coverage can preempt ordinary loot but respects every higher priority
- [src/bots/expert-trace.test.ts:139](../../src/bots/expert-trace.test.ts#L139): scheduled coverage stays under five seconds per thirty-second interval at real input cadence
- [src/bots/expert-trace.test.ts:156](../../src/bots/expert-trace.test.ts#L156): known requests beyond questMax preempt optional loot/cast and recruit only the requested animal
- [src/bots/expert-trace.test.ts:164](../../src/bots/expert-trace.test.ts#L164): known-quest hints precede straggler pursuit, and a safety abort restores baseline controls
- [src/bots/expert-trace.test.ts:170](../../src/bots/expert-trace.test.ts#L170): actual offering placement does not claim completion; a closed cue releases the job
- [src/bots/expert-trace.test.ts:178](../../src/bots/expert-trace.test.ts#L178): real reaction/input cadence releases held quest controls before sixty seconds and never restarts
- [src/bots/expert-trace.test.ts:189](../../src/bots/expert-trace.test.ts#L189): stale requests release optional casting even while remembered by the ordinary policy
- [src/bots/expert-trace.test.ts:197](../../src/bots/expert-trace.test.ts#L197): a requested recruit's visible sigil is picked up before following its dream hint
- [src/bots/expert-trace.test.ts:219](../../src/bots/expert-trace.test.ts#L219): the duplicate-tiger delivery regression places either matching bottom rather than cycling forever
- [src/bots/expert-trace.test.ts:229](../../src/bots/expert-trace.test.ts#L229): mixed delivery sends only one cycle while waiting for the actual delayed stack change
- [src/bots/expert-trace.test.ts:238](../../src/bots/expert-trace.test.ts#L238): healing and KO keep precedence while a cycle acknowledgement is outstanding
- [src/bots/expert-trace.test.ts:256](../../src/bots/expert-trace.test.ts#L256): guarded coverage cancels on the delayed danger cue and never resumes that slot
- [src/bots/expert-trace.test.ts:262](../../src/bots/expert-trace.test.ts#L262): the selected default matches explicit guarded-on controls through safe and unsafe observations
- [src/bots/expert-trace.test.ts:269](../../src/bots/expert-trace.test.ts#L269): guarded coverage keeps visits, delivery, requested recruitment and ready casts above it
- [src/bots/expert-trace.test.ts:273](../../src/bots/expert-trace.test.ts#L273): guarded coverage remains under five seconds per slot with actual delayed input cadence
- [src/bots/expert-trace.test.ts:277](../../src/bots/expert-trace.test.ts#L277): guard diagnostics cannot change controls even when the output copy is mutated
- [src/bots/expert.test.ts:10](../../src/bots/expert.test.ts#L10): keeps an exploration destination while no new target is seen
- [src/bots/expert.test.ts:24](../../src/bots/expert.test.ts#L24): slows near a visible casting spot rather than crossing it at full speed
- [src/bots/expert.test.ts:41](../../src/bots/expert.test.ts#L41): returns detached observations and ignores remote creature coordinates
- [src/bots/expert.test.ts:56](../../src/bots/expert.test.ts#L56): delays the first action, emits only controls and never edits the leash
- [src/bots/expert.test.ts:70](../../src/bots/expert.test.ts#L70): rejects faster-than-approved reactions, inputs and perfect aim
- [src/bots/expert.test.ts:78](../../src/bots/expert.test.ts#L78): continues toward a visible target during descent rather than hovering over water
- [src/bots/expert.test.ts:91](../../src/bots/expert.test.ts#L91): waits for delayed mode acknowledgement before sending a second toggle
- [src/bots/expert.test.ts:106](../../src/bots/expert.test.ts#L106): does not reveal the requested species behind a closed dream bubble
- [src/bots/expert.test.ts:116](../../src/bots/expert.test.ts#L116): can visit a seen sleeping legend without reading its quest from the treetops

## creatures-movement: ruling review

- Historical fixed-population finding is CLOSED by 1622 at released 7f6dcba3: docs/plans/combat-spacing-test-changes.md replaces the bot-win prerequisite with explicit runaways and the actual victory transition while preserving IDs/count. The controlled defeat setup also changed. All three current cases are listed with 1622, excluded from this audit’s proposed splits/keeps; the original pinned review remains historical evidence.
- Explicit growth-on/off helper comparisons remain compatibility. They test once-per-wave pending counts only for wild areas, no materialization far away/in view, stable IDs and exact pending-count consumption when awakened. No old-vs-new ruling proved these helpers obsolete.
- The review read51 cases, not the original 1001 machine bucket. Remaining cases are shown as not reviewed/no change; no keep question covers them. Parameter/template and internal loops are not executed counts.
- Expert defaults: expert-search.md old default-OFF coverage pilot is replaced by newest guarded coverage default-ON, with explicit false preserving comparison. expert-trace:262 tests guardedON by default; :139 retains unguarded mode deliberately. Delivery repair similarly defaultsON and explicit false preserves old cycling; trace:219 checks undefined matches repairedON. No comparison deletion follows from date alone.
- Victory supersession: old win wording says legends home/lulled angry; gameplay.md52 now says only quest-complete legends dance, incomplete ones lull to their own circles, and completed timestamp0 counts. win:44 and:173 assert those replacements. D1/C1 only proposes reporting conga convergence, never moving these state gates. The 28Oct arrival-based settlement rule is retained.
- Current exactness is intentional: bags’29Oct Purse/Satchel roster,25.08/42.9 ranges and 0.418/0.6985 cadences are direct current contracts. Rise delay distinguishes bare broom from Jet nozzles under 23Oct rule and deliberately supports cooldown0. rules:510’s all 30 title is stale wording, but AREA_TYPES is dynamic/current 64; no assertion pinning30 is present.
- Prototype refresh: canonical6566366307 requested merging released combat7f6dcba3. Source files outside combat/fixedPopulation/creatureStates retain their reviewed test bodies and line IDs; changed movement registrations are refreshed from static source and remain owner-only. This is no duplicate combat review.

## house-treehouse: review provenance

Read-only review at 9f045ebca, report 6566215080. Original 178 tests are reconciled into reviewed house groups and explicit tools/UI/save/MP/combat handoffs. Extra rebucketed neighbors remain separately listed until reviewed. Second remaining-manifest review at 73741aa8f969dc5c5be31182490497c6668b358d, report 6566610514: 164 declarations resolved, six scenery declarations displayed under world and one explicit combat-owner listing.

<a id="h1"></a>

## H1: Simulated house travel observations

outcome stats; 3 tests; files take ~62 s.

Three mixed cases pin a bed-to-Terrace journey under 26 s, follower arrival within 12 m after 40 s, and later posse proximity after 90/20 s. Preserve floor/reachability, takeoff, sigil identity/order, no manufactured sigils and guard-assignment release.

- [src/rules/houseGuard.test.ts:39](../../src/rules/houseGuard.test.ts#L39): head into the home area to spots of their own and guard there, not to her: no sigil put down, her stack unchanged
- [src/rules/houseGuard.test.ts:57](../../src/rules/houseGuard.test.ts#L57): follow her again once she's off the treehouse: travelling to her while she flies, then her posse round her once she lands
- [src/rules/houseRooms.test.ts:66](../../src/rules/houseRooms.test.ts#L66): are walked from her bed down the trunk to the Terrace's take-off, on the floor all the way (and how long it takes: Ed, 2026-10-24)

<a id="h2"></a>

## H2: Historical route and layout descriptions

leftovers; 3 tests; files take ~11 s.

The 93 m name disagrees with its99 m assertion; explicit classic/Ed comparisons still describe Ed as globally opt-in; classic restoration is called default. Their actual assertions remain useful and are not proposed for removal.

- [src/rules/houseConfig.test.ts:27](../../src/rules/houseConfig.test.ts#L27): is the oak (the layout v4, Ed 2026-10-24): six rooms up the trunk, a pair of branch rooms off each of the first four, the last pair locked; the walk from her bed to the take-off about 93 m
- [src/rules/housePlacement.runtime.test.ts:75](../../src/rules/housePlacement.runtime.test.ts#L75): restores an opt-in save to default spell slots without losing occupants when the opt-in is removed
- [src/rules/housePlacement.test.ts:11](../../src/rules/housePlacement.test.ts#L11): leaves the published default and fixed shape unchanged and only applies Ed on explicit opt-in

<a id="hk1"></a>

## HK1: Movement, interactions and camera contracts

current rules; 77 tests; files take ~88 s.

Floor containment, one-time actions, blocked panels and reachable stations are direct protections. Current walk speeds/dimensions, rise permissions and camera easing remain authored rules. Explicit old-camera/house-off modes are supported comparisons, not proven dead code.

- [src/platform/inputHouse.test.ts:69](../../src/platform/inputHouse.test.ts#L69): `${how}: with no broom, pushed against the ${r.id}'s walls, she stays on the ground`
- [src/platform/inputHouse.test.ts:82](../../src/platform/inputHouse.test.ts#L82): pad: with no broom, at each bedroom station, the stick held toward it, rise doesn't take her off
- [src/platform/inputHouse.test.ts:92](../../src/platform/inputHouse.test.ts#L92): pad: on the Terrace rise still takes her up
- [src/platform/inputHouse.test.ts:98](../../src/platform/inputHouse.test.ts#L98): `${how}: with her broom, rise takes her up from every room, pushed against its wall or not`
- [src/rules/houseConfig.test.ts:16](../../src/rules/houseConfig.test.ts#L16): is the same for the game (each room imported by name) and the tools (every room file on disk): no room file left out
- [src/rules/houseConfig.test.ts:17](../../src/rules/houseConfig.test.ts#L17): has every room in its own file, named by its id, every object's id once, each branch room off a trunk room
- [src/rules/houseConfig.test.ts:59](../../src/rules/houseConfig.test.ts#L59): its Terrace's layout is the Ent's art's own (art/ent.js OAK_TERRACE: the lab draws it as the game does)
- [src/rules/houseConfig.test.ts:63](../../src/rules/houseConfig.test.ts#L63): its outline for the crown's builder (config/house/outline.json) is up to date: node tools/house/organic.mjs --outline
- [src/rules/houseRooms.test.ts:57](../../src/rules/houseRooms.test.ts#L57): are one floor: every unlocked room's middle and every limb's middle line is somewhere she stands (keepInHouse leaves it be)
- [src/rules/houseRooms.test.ts:88](../../src/rules/houseRooms.test.ts#L88): are walked out along every branch, from its trunk room into its room and back (the locked ones to their doors)
- [src/rules/houseRooms.test.ts:103](../../src/rules/houseRooms.test.ts#L103): on foot in the house she walks, at its walk, not her broom's ground speed
- [src/rules/houseRooms.test.ts:110](../../src/rules/houseRooms.test.ts#L110): walks half again as fast as she did (Ed, 2026-10-25: 5 to 7.5 m/s), her broom's ground speed apart and unchanged, her walk cycle drawn for 5 m/s so her steps quicken with her
- [src/rules/houseRooms.test.ts:121](../../src/rules/houseRooms.test.ts#L121): leave her room to move: limbs 3 m wide or more, rooms 12 m across or more, her bedroom 16 m
- [src/rules/houseRooms.test.ts:126](../../src/rules/houseRooms.test.ts#L126): their edge keeps her in, wherever she walks at it but the take-off
- [src/rules/houseRooms.test.ts:137](../../src/rules/houseRooms.test.ts#L137): with a broom she takes off from any room or limb (Ed, 2026-10-26: "maybe you can take off from anywhere on the treehouse"); with none, only rising on the Terrace, as before
- [src/rules/houseRooms.test.ts:156](../../src/rules/houseRooms.test.ts#L156): the Workshop's bay and pegboard are only to look at: E there does nothing (Ed, 2026-10-29: the broom one station, at the lathe)
- [src/rules/houseRooms.test.ts:165](../../src/rules/houseRooms.test.ts#L165): E at each working object says which (main.ts opens its station, the creator at its choices, or the zoo)
- [src/rules/houseRooms.test.ts:174](../../src/rules/houseRooms.test.ts#L174): each placeholder's E says so too (main.ts shows its line)
- [src/rules/houseRooms.test.ts:182](../../src/rules/houseRooms.test.ts#L182): the map table, in the Solarium, opens the chart; the Terrace's middle doesn't
- [src/rules/houseRooms.test.ts:190](../../src/rules/houseRooms.test.ts#L190): the hats' floor, in the Cloakroom: E by a hat takes it and leaves hers in its place; with none near, E does nothing (each hat an object of its own: Ed, 2026-10-29)
- [src/rules/houseRooms.test.ts:210](../../src/rules/houseRooms.test.ts#L210): the bed: E held for its hold sleeps, once (the night's over); let go early, it starts again
- [src/rules/houseRooms.test.ts:226](../../src/rules/houseRooms.test.ts#L226): the party's over: she still flies onto the Terrace, and the bed still sleeps (the afterparty's 💤 pin leads her there)
- [src/rules/houseRooms.test.ts:248](../../src/rules/houseRooms.test.ts#L248): standing still in a room, she stays in the house: she never idles into the party on the floor below
- [src/rules/houseRooms.test.ts:255](../../src/rules/houseRooms.test.ts#L255): Bedrooms 2 and 3 are locked (Ed, 2026-10-23: "The branch stops at the door, and a bubble says it's a friend's room"): drawn, the branch to the door, E there says so, and she can't go in
- [src/rules/houseRooms.test.ts:272](../../src/rules/houseRooms.test.ts#L272): the other bedrooms hold their placeholders (Ed, 2026-10-23: "fill the other two with placeholders for now"): a bare bed, a sheeted wardrobe and chest, crates; out of her reach, the way in from their door clear
- [src/rules/houseRooms.test.ts:284](../../src/rules/houseRooms.test.ts#L284): every object stands on its room's floor and every station reaches: E in front of each finds it, on the floor
- [src/rules/stations.test.ts:33](../../src/rules/stations.test.ts#L33): are the creator's stations, and there are some
- [src/rules/stations.test.ts:38](../../src/rules/stations.test.ts#L38): in the game, each bedroom station (dressed before the door: Ed, 2026-10-21) opens with her standing at it
- [src/rules/stations.test.ts:45](../../src/rules/stations.test.ts#L45): open near: within reach of a station's edge, that station
- [src/rules/stations.test.ts:49](../../src/rules/stations.test.ts#L49): close away: past reach with none open, nothing; and an open one goes once she's past its slack
- [src/rules/stations.test.ts:58](../../src/rules/stations.test.ts#L58): an open one stays open in its slack, so it doesn't flicker at the edge
- [src/rules/stations.test.ts:64](../../src/rules/stations.test.ts#L64): isn't the bed, the hats' floor, the book or a placeholder
- [src/rules/stations.test.ts:68](../../src/rules/stations.test.ts#L68): one at a time: walking from one station to the next swaps them
- [src/rules/stations.test.ts:75](../../src/rules/stations.test.ts#L75): in the game: walking up to the wardrobe opens it, walking away closes it
- [src/rules/stations.test.ts:84](../../src/rules/stations.test.ts#L84): in the game: none once she is off her feet (rising)
- [src/rules/stations.test.ts:91](../../src/rules/stations.test.ts#L91): choosing there, with her whole framed (camera.station.whole), the rules leave the camera's distance and aim to the view (render/view/camera.ts) but ease in and out
- [src/rules/stations.test.ts:106](../../src/rules/stations.test.ts#L106): choosing there (whole framing off), the camera eases in on her and aside from the panel; walking off, back out
- [src/rules/stations.test.ts:120](../../src/rules/stations.test.ts#L120): choosing a row (whole framing off), the camera zooms on the part of her it's about (camera.station.parts): each part's own aim and distance
- [src/rules/stations.test.ts:158](../../src/rules/stations.test.ts#L158): never eases in away from the house, framing or not
- [src/rules/stations.test.ts:165](../../src/rules/stations.test.ts#L165): the map table comes to her by nearness as a table (Ed, 2026-10-23: its chart slides up from the bottom), never as a dressing station
- [src/rules/stations.test.ts:179](../../src/rules/stations.test.ts#L179): on the lathe while she's at the lathe (the broom's one station since 2026-10-29); by the bay, not a station now, none
- [src/rules/stations.test.ts:183](../../src/rules/stations.test.ts#L183): in her hand on the Terrace (the hub's floor)
- [src/rules/stations.test.ts:187](../../src/rules/stations.test.ts#L187): nowhere drawn elsewhere in the rooms: the Workshop away from the bay and the lathe, the pegboard, another room
- [src/rules/stations.test.ts:193](../../src/rules/stations.test.ts#L193): and off the house's floor (flying), none: she's on it
- [src/rules/treehouse.test.ts:25](../../src/rules/treehouse.test.ts#L25): starts her at her decks on the deck, 22 m up, by the south rail behind the decks
- [src/rules/treehouse.test.ts:34](../../src/rules/treehouse.test.ts#L34): keeps her on it as she walks: inside the rail, round the map table, out of the decks
- [src/rules/treehouse.test.ts:50](../../src/rules/treehouse.test.ts#L50): slows the world to a tenth while she stands on it, as a calm legend's circle does, and lets it go when she rises
- [src/rules/treehouse.test.ts:63](../../src/rules/treehouse.test.ts#L63): takes her off it rising, and lands her back on it coming down over it; elsewhere she lands on the ground
- [src/rules/treehouse.test.ts:85](../../src/rules/treehouse.test.ts#L85): tells of landing on it (the 'perch' event) and of E at the map table (the 'chart' event); nothing goes down up there
- [src/rules/treehouse.test.ts:100](../../src/rules/treehouse.test.ts#L100): keeps her out of every fight up there
- [src/rules/treehouse.test.ts:109](../../src/rules/treehouse.test.ts#L109): with the deck off, she starts on the ground by the old treehouse as before
- [src/rules/treehouse.test.ts:129](../../src/rules/treehouse.test.ts#L129): starts her behind the decks on the Terrace, 22 m up; the deck's rules carry over
- [src/rules/treehouse.test.ts:143](../../src/rules/treehouse.test.ts#L143): faces the dancefloor: the house north-west of it, the Terrace's take-off towards it (Ed, 2026-10-24)
- [src/rules/treehouse.test.ts:151](../../src/rules/treehouse.test.ts#L151): is one floor: from the Terrace she walks up the trunk and out along the branches, kept in by its edge but for the take-off
- [src/rules/treehouse.test.ts:176](../../src/rules/treehouse.test.ts#L176): lands her when she flies onto the Terrace at treetop height from the dancefloor's side, no button; over the Bedroom she only flies past
- [src/rules/treehouse.test.ts:198](../../src/rules/treehouse.test.ts#L198): lands her on any of the trunk from the Dining Room to the Boudoir, flying over at treetop height or coming down over it; the Bedroom, Turret and branch rooms aren't (Ed, 2026-10-26)
- [src/rules/treehouse.test.ts:224](../../src/rules/treehouse.test.ts#L224): never lands her in furniture or on a station: coming down over one, she's eased onto the nearest clear floor
- [src/rules/treehouse.test.ts:237](../../src/rules/treehouse.test.ts#L237): taking off from a room, she flies on over the trunk without landing again till she's come back onto it from outside
- [src/rules/treehouse.test.ts:246](../../src/rules/treehouse.test.ts#L246): takes her flying again when she walks off the Terrace's open rim; with no broom she falls and comes back at the circle
- [src/rules/treehouse.test.ts:269](../../src/rules/treehouse.test.ts#L269): opens the chart with E at the map table (in the Solarium), and nothing goes down up there
- [src/rules/treehouse.test.ts:279](../../src/rules/treehouse.test.ts#L279): brings her back at the magic circle after a knockout, up out of its floor, then walks her to her decks to scratch
- [src/rules/treehouse.test.ts:296](../../src/rules/treehouse.test.ts#L296): pushes the camera in while she's on its floor, and lets it back out as she flies off
- [src/ui/roomWalk.test.ts:11](../../src/ui/roomWalk.test.ts#L11): is twice the first room's floor, and she starts somewhere clear
- [src/ui/roomWalk.test.ts:15](../../src/ui/roomWalk.test.ts#L15): moves her the way the keys point on screen
- [src/ui/roomWalk.test.ts:24](../../src/ui/roomWalk.test.ts#L24): stops at the walls and the furniture, sliding along them, and never ends up inside anything
- [src/ui/roomWalk.test.ts:36](../../src/ui/roomWalk.test.ts#L36): faces the way she walks
- [src/ui/roomWalk.test.ts:43](../../src/ui/roomWalk.test.ts#L43): keeps every footprint and her start inside the floor at any size
- [src/ui/stationChoice.test.ts:39](../../src/ui/stationChoice.test.ts#L39): every morning clothing station dresses her when its unchanged default is chosen
- [src/ui/stationChoice.test.ts:61](../../src/ui/stationChoice.test.ts#L61): at every station, moving through every place never changes her look or her broom
- [src/ui/stationChoice.test.ts:71](../../src/ui/stationChoice.test.ts#L71): choosing an unchanged colour also dresses her, including a shoe rack with no item row
- [src/ui/stationChoice.test.ts:85](../../src/ui/stationChoice.test.ts#L85): choosing an item she owns and isn't wearing puts it on; choosing again changes nothing more
- [src/ui/stationChoice.test.ts:105](../../src/ui/stationChoice.test.ts#L105): choosing a colour puts it on the part the colours are for, and choosing a part first moves the colours to it
- [src/ui/stationChoice.test.ts:118](../../src/ui/stationChoice.test.ts#L118): at the bags, a list: down moves bag to bag changing nothing, choosing a bag's line wears that bag
- [src/ui/stationChoice.test.ts:130](../../src/ui/stationChoice.test.ts#L130): an item still to be found, chosen, changes nothing and is marked till the focus moves
- [src/ui/stationChoice.test.ts:142](../../src/ui/stationChoice.test.ts#L142): at the broom's station, moving over the cards fits nothing; choosing one fits it
- [src/ui/stationChoice.test.ts:153](../../src/ui/stationChoice.test.ts#L153): leaving without choosing leaves her as she came, however much the focus moved
- [src/ui/stationChoice.test.ts:162](../../src/ui/stationChoice.test.ts#L162): choose and back are the bindings' (platform/bindings.ts): the pad's choose button chooses, its back doesn't

<a id="hk2"></a>

## HK2: Layouts, editor and hat conservation

current rules; 32 tests; files take ~17 s.

Serialization, validation and conservation assertions remain alongside current placement/default policy. Archived proposal audits validate historical evidence rather than asserting an old object count as today’s complete layout. Waiting through knockdown does not make hat ownership a balance outcome.

- [src/app/houseLayout.test.ts:4](../../src/app/houseLayout.test.ts#L4): defaults to Ed, keeps the ed alias and selects classic only explicitly
- [src/editor/hatZone.test.ts:10](../../src/editor/hatZone.test.ts#L10): keeps the empty spawn marker out of station menus and acts on individual hats only
- [src/editor/houseLayout.test.ts:16](../../src/editor/houseLayout.test.ts#L16): edits the hats marker as a spawn zone, exporting future slots with no fake station use point
- [src/editor/houseLayout.test.ts:39](../../src/editor/houseLayout.test.ts#L39): exports and reapplies every current object/station without changing the published house
- [src/editor/houseLayout.test.ts:48](../../src/editor/houseLayout.test.ts#L48): moves and rotates station footprints, their use positions and the decks' seat coherently
- [src/editor/houseLayout.test.ts:61](../../src/editor/houseLayout.test.ts#L61): refuses incompatible/partial/duplicate IDs and non-finite or unbounded values before applying
- [src/editor/houseLayout.test.ts:79](../../src/editor/houseLayout.test.ts#L79): uses the actual asymmetric model projection with the same sign as plan corners and approach geometry
- [src/editor/houseLayout.test.ts:89](../../src/editor/houseLayout.test.ts#L89): converts Ed's exact v1 using camera facings, preserves newer kitchen/new clutter, and keeps original evidence bytes
- [src/editor/houseLayout.test.ts:109](../../src/editor/houseLayout.test.ts#L109): separates clutter into stable selectable/exportable pieces and changes room lighting identity without changing station function
- [src/editor/houseLayout.test.ts:121](../../src/editor/houseLayout.test.ts#L121): undoes complete gestures and imports, redoes them, then discards a stale redo after editing
- [src/editor/houseLayoutAudit.test.ts:9](../../src/editor/houseLayoutAudit.test.ts#L9): audits Ed's converted proposal without changing the published defaults
- [src/editor/houseLayoutAudit.test.ts:22](../../src/editor/houseLayoutAudit.test.ts#L22): detects an object outside the floor and overlapping approach geometry
- [src/rules/hat.test.ts:35](../../src/rules/hat.test.ts#L35): a knockout drops it where she went down; the marker shows only while it's down
- [src/rules/hat.test.ts:51](../../src/rules/hat.test.ts#L51): the sigil button on it puts it back on, with nothing in the stack and nothing put down
- [src/rules/hat.test.ts:71](../../src/rules/hat.test.ts#L71): lying on a sigil, the first press takes the hat and the next the sigil
- [src/rules/hat.test.ts:88](../../src/rules/hat.test.ts#L88): knocked out again with it still down, the old one stays where it lies and nothing new drops
- [src/rules/hat.test.ts:99](../../src/rules/hat.test.ts#L99): a witch with no hat (the creator's none) drops nothing: no marker, and the knockout as ever
- [src/rules/hat.test.ts:115](../../src/rules/hat.test.ts#L115): is off with the knob
- [src/rules/hat.test.ts:132](../../src/rules/hat.test.ts#L132): held with nothing to pick up or put down, she puts it down at her feet; a press over it puts it back on
- [src/rules/hat.test.ts:143](../../src/rules/hat.test.ts#L143): a short press does nothing
- [src/rules/hat.test.ts:150](../../src/rules/hat.test.ts#L150): not in the treetops, and no hat (the creator's none) puts nothing down
- [src/rules/hatFloorPoints.test.ts:5](../../src/rules/hatFloorPoints.test.ts#L5): uses the lowest empty numbered point, independent of spell order, skipping occupied points
- [src/rules/hatFloorPoints.test.ts:11](../../src/rules/hatFloorPoints.test.ts#L11): retains overflow on a full floor and fills a vacated point without duplicating hats
- [src/rules/hatFloorPoints.test.ts:18](../../src/rules/hatFloorPoints.test.ts#L18): skips points occupied by actual dropped hats, then reuses them after pickup
- [src/rules/hatFloorPoints.test.ts:25](../../src/rules/hatFloorPoints.test.ts#L25): loads legacy and new JSON saves, retains physical indices and gaps, and supports returned hats
- [src/rules/hatFloorPoints.test.ts:33](../../src/rules/hatFloorPoints.test.ts#L33): never loses hats when capacity shrinks or grows, and excludes hats worn or lying elsewhere
- [src/rules/houseDefaultPins.test.ts:18](../../src/rules/houseDefaultPins.test.ts#L18): pins the default host/guest wake, bedside and doors to the authored layout
- [src/rules/houseDefaultPins.test.ts:38](../../src/rules/houseDefaultPins.test.ts#L38): uses the same selected house art identity for default and ed alias, and restores classic pins
- [src/rules/housePlacement.runtime.test.ts:5](../../src/rules/housePlacement.runtime.test.ts#L5): reserves one nearest point, picks the underfoot hat, refills released points and trims old origins
- [src/rules/housePlacement.runtime.test.ts:40](../../src/rules/housePlacement.runtime.test.ts#L40): runs ordered spawn/pick/drop and legacy save loading through the actual opt-in house consumers
- [src/rules/housePlacement.test.ts:24](../../src/rules/housePlacement.test.ts#L24): uses explicit model-facing, transformed station anchors and bed attachments instead of re-inferring source room facing
- [src/rules/housePlacement.test.ts:33](../../src/rules/housePlacement.test.ts#L33): provides a potion-owner position hook without changing colour identity, state or default kitchen geometry

<a id="hk3"></a>

## HK3: Equipment and kitchen contracts

current rules; 28 tests; files take ~89 s.

Remaining component arithmetic/exclusivity, ingredient reservation, landing credit and timed-effect state transitions are direct house rules. The nine combat/invitation kernels are not included in this keep group.

- [src/rules/broomParts.test.ts:11](../../src/rules/broomParts.test.ts#L11): are nine, three to a slot, each changing numbers the tuning has, at least one up and one down
- [src/rules/broomParts.test.ts:21](../../src/rules/broomParts.test.ts#L21): the bare broom is the tuning itself: no quick take-off (Ed, 2026-10-23), nothing changed
- [src/rules/broomParts.test.ts:26](../../src/rules/broomParts.test.ts#L26): each part's numbers land on the tuning as the doc has them
- [src/rules/broomParts.test.ts:42](../../src/rules/broomParts.test.ts#L42): parts fitted together add up (Ed's doc: 'Stats from different parts add up')
- [src/rules/broomParts.test.ts:48](../../src/rules/broomParts.test.ts#L48): one a slot: fitting a part takes out what was in its slot; unknown ids change nothing
- [src/rules/broomParts.test.ts:59](../../src/rules/broomParts.test.ts#L59): give today's spells: Rocket Speed, Hedge Stealth, Ferry Ley jump, Joust Battering, Pile driver Ground pound
- [src/rules/broomParts.test.ts:70](../../src/rules/broomParts.test.ts#L70): no broom completes two at once (every one of the 64)
- [src/rules/broomParts.test.ts:81](../../src/rules/broomParts.test.ts#L81): R casts only with a set complete: the bare broom and a half-made one have no spell
- [src/rules/brooms.test.ts:56](../../src/rules/brooms.test.ts#L56): cast, it puts her at the ley line's pulse; not while home boots up; then it recharges
- [src/rules/brooms.test.ts:76](../../src/rules/brooms.test.ts#L76): her sigils pull on her less: times its pull
- [src/rules/hatSpells.test.ts:46](../../src/rules/hatSpells.test.ts#L46): put down, six berries grow in a ring round it; eaten ones don't grow elsewhere; again too soon, nothing more
- [src/rules/hatSpells.test.ts:64](../../src/rules/hatSpells.test.ts#L64): put down, it points to the nearest relic still lying, for dowsing.time seconds
- [src/rules/hatSpells.test.ts:120](../../src/rules/hatSpells.test.ts#L120): picked up again, it brings her sigils within its range back to her stack, and leaves the ones beyond
- [src/rules/hatSpells.test.ts:139](../../src/rules/hatSpells.test.ts#L139): any other hat brings nothing back
- [src/rules/hatSpellsB.test.ts:57](../../src/rules/hatSpellsB.test.ts#L57): slows wild creatures within its range while it lies there; not one beyond, not hers
- [src/rules/hatSpellsB.test.ts:69](../../src/rules/hatSpellsB.test.ts#L69): put down, it stuns wild creatures within its range, and hurts none
- [src/rules/hatSpellsB.test.ts:103](../../src/rules/hatSpellsB.test.ts#L103): leaves the enraged be
- [src/rules/hatSpellsB.test.ts:141](../../src/rules/hatSpellsB.test.ts#L141): heals her own creatures near it, and not wild ones
- [src/rules/houseGuard.test.ts:81](../../src/rules/houseGuard.test.ts#L81): a baby at its home spot doesn't eat the berries there (Ed, 2026-10-24), though at a real placed sigil it does
- [src/rules/mushrooms.test.ts:21](../../src/rules/mushrooms.test.ts#L21): keeps the inland recovery camera upright while preserving seaside stargazing
- [src/rules/mushrooms.test.ts:28](../../src/rules/mushrooms.test.ts#L28): places exactly one reachable seeded patch per non-home area
- [src/rules/mushrooms.test.ts:40](../../src/rules/mushrooms.test.ts#L40): collects only on place, once, into hidden inventory with a puff; a new night regrows it
- [src/rules/mushrooms.test.ts:50](../../src/rules/mushrooms.test.ts#L50): unloads two per second and only credits baskets when their arcs land
- [src/rules/mushrooms.test.ts:59](../../src/rules/mushrooms.test.ts#L59): reserves three ingredients in flight; starts smoke on the third plop, not keypress
- [src/rules/mushrooms.test.ts:67](../../src/rules/mushrooms.test.ts#L67): affects late entrants, spins through the smoke, falls, sleeps, wakes and holds stargazing
- [src/rules/mushrooms.test.ts:79](../../src/rules/mushrooms.test.ts#L79): replaces a trip and measures expiry on game time only
- [src/rules/mushrooms.test.ts:87](../../src/rules/mushrooms.test.ts#L87): uses the agreed basket thresholds
- [src/rules/mushrooms.test.ts:90](../../src/rules/mushrooms.test.ts#L90): blocks movement and dodge during recovery in the real game step

<a id="h-r2-1"></a>

## H-R2-1: Canopy density and find diversity observations

outcome stats; 8 tests; files take ~77 s.

Keep structural validity, exclusions, reproducibility, ownership, eligibility, identity and existing upper bounds blocking. Report only sampled minimum density, numerical variation, abundance and diversity. Exact assertion dispositions and ruling review: PR #1632 comment 6566610514.

- [src/rules/crown.test.ts:19](../../src/rules/crown.test.ts#L19): has 300 to 500 lobes, thick and thin
- [src/rules/crown.test.ts:56](../../src/rules/crown.test.ts#L56): keeps open ground it's given (the dancefloor) open to the sky as the Terrace: no lobe over it or on a line of sight to it
- [src/rules/crown.test.ts:81](../../src/rules/crown.test.ts#L81): strings its lights: every bulb on a string, in order along it, the Terrace ringed
- [src/rules/crown.test.ts:101](../../src/rules/crown.test.ts#L101): hangs each string its own way (Ed, 2026-10-27: "String lights on the treehouse seem to all have the same shape")
- [src/rules/crown.test.ts:127](../../src/rules/crown.test.ts#L127): has leaves over the Terrace and along its notch, where the gap had none
- [src/rules/finds.test.ts:40](../../src/rules/finds.test.ts#L40): is the night's: the same seed puts it in the same place, and nights differ
- [src/rules/finds.test.ts:47](../../src/rules/finds.test.ts#L47): holds what the night's one draw picks over everything she lacks, of every kind (Ed, 2026-10-23); nothing once she has it all
- [src/rules/finds.test.ts:187](../../src/rules/finds.test.ts#L187): stands a few metres from her on clear ground: no tree, rock or ruin on it, not on a lake or the treehouse

<a id="h-r2-2"></a>

## H-R2-2: Obsolete Workshop descriptions

leftovers; 3 tests; files take ~65 s.

29 October combined broom work at the lathe supersedes the earlier bay/lathe/pegboard arrangement. Assertions already reflect ownership, unchanged fitted parts and one lathe. Correct names/comments only. Evidence: docs/notes/house.md; report 6566610514.

- [src/rules/finds.test.ts:150](../../src/rules/finds.test.ts#L150): E at it while the party's on: the part is hers at once (a found event of its kind), not fitted: it waits at the Workshop's bay
- [src/rules/finds.test.ts:159](../../src/rules/finds.test.ts#L159): a part found leaves her broom as it was: her fitted part stays, her set and spell too
- [src/rules/wardrobeShelves.test.ts:90](../../src/rules/wardrobeShelves.test.ts#L90): the broom stand is gone (the Workshop's bay, lathe and pegboard in its place), and no station offers a broom's power or shape

<a id="h-r2-k1"></a>

## H-R2-K1: Layout, wake-up and opening contracts

current rules; 54 tests; files take ~163 s.

Preserve exact published poses and removals, import identity, supported classic layout, authored snooze/stretch timing, clothing conservation, doors and deliberate party start. The bounded undressed walk proves reachability rather than setting a speed target.

- [src/editor/currentEdLayout.test.ts:11](../../src/editor/currentEdLayout.test.ts#L11): preserves the complete export and all110 kept poses/anchors; removes strictly west of -100
- [src/editor/currentEdLayout.test.ts:28](../../src/editor/currentEdLayout.test.ts#L28): requires explicit valid clutter removal rather than accepting missing furniture or overlaps
- [src/editor/editorStartupIdentity.test.ts:27](../../src/editor/editorStartupIdentity.test.ts#L27): starts with every authored pose under either one-ulp sine result, with the same source identity
- [src/editor/editorStartupIdentity.test.ts:39](../../src/editor/editorStartupIdentity.test.ts#L39): keeps source changes and unknown legacy IDs incompatible, rather than bypassing validation
- [src/editor/editorStartupIdentity.test.ts:49](../../src/editor/editorStartupIdentity.test.ts#L49): keeps the original v1 bytes and its camera-preserving import under both math variants
- [src/editor/publishedLayout.test.ts:6](../../src/editor/publishedLayout.test.ts#L6): opens and resets the editor to Ed's published poses with the stable import identity
- [src/editor/smokeBedStart.test.ts:8](../../src/editor/smokeBedStart.test.ts#L8): uses Ed's authored bed anchor for both a plain page and explicit ed
- [src/editor/smokeBedStart.test.ts:17](../../src/editor/smokeBedStart.test.ts#L17): keeps explicit classic and resets repeated selected-layout switches
- [src/editor/smokeBedStart.test.ts:25](../../src/editor/smokeBedStart.test.ts#L25): translates the selected interaction point with the actual island hub
- [src/editor/smokeBedStart.test.ts:31](../../src/editor/smokeBedStart.test.ts#L31): resolves %s at its selected authored anchor, retaining classic fallback
- [src/editor/smokeBedStart.test.ts:40](../../src/editor/smokeBedStart.test.ts#L40): rejects the old classic %s fixture under Ed's layout
- [src/rules/opening.test.ts:16](../../src/rules/opening.test.ts#L16): is beside her bed, in its room (the Turret: Ed, 2026-10-26, "Move the bed to the turret"), on the house's floor
- [src/rules/opening.test.ts:23](../../src/rules/opening.test.ts#L23): puts her there standing, off her decks, the camera indoors on her
- [src/rules/opening.test.ts:34](../../src/rules/opening.test.ts#L34): and she walks on from there, held in the house's walls
- [src/rules/rules.test.ts:237](../../src/rules/rules.test.ts#L237): starts the witch seated on the terrace; she stays put till the first move or rise
- [src/rules/wakeUp.test.ts:41](../../src/rules/wakeUp.test.ts#L41): rings with her in bed, held there, the night not started
- [src/rules/wakeUp.test.ts:49](../../src/rules/wakeUp.test.ts#L49): E snoozes it, but not a press the moment it starts ringing
- [src/rules/wakeUp.test.ts:60](../../src/rules/wakeUp.test.ts#L60): lasts five seconds, then the alarm rings again; as often as she likes
- [src/rules/wakeUp.test.ts:71](../../src/rules/wakeUp.test.ts#L71): E while snoozing does nothing more
- [src/rules/wakeUp.test.ts:79](../../src/rules/wakeUp.test.ts#L79): `moving gets her up from the ${from}: the stretch, held, then beside her bed`
- [src/rules/wakeUp.test.ts:94](../../src/rules/wakeUp.test.ts#L94): a rise does too, but she doesn't fly
- [src/rules/wakeUp.test.ts:104](../../src/rules/wakeUp.test.ts#L104): opens its mirror by itself the first time she comes to it, once
- [src/rules/wakeUp.test.ts:115](../../src/rules/wakeUp.test.ts#L115): up, she walks out of the bedroom's door in her nightie, the island built or not (Ed, 2026-10-25: "I should be able to leave regardless")
- [src/rules/wakeUp.test.ts:127](../../src/rules/wakeUp.test.ts#L127): the door's shut only till she's up: asleep, ringing, snoozing and stretching (held in bed then too)
- [src/rules/wakeUp.test.ts:140](../../src/rules/wakeUp.test.ts#L140): nor does the bed end the night meanwhile, nor any key cast the spell
- [src/rules/wakeUp.test.ts:158](../../src/rules/wakeUp.test.ts#L158): has no curtains, and nothing says "not yet"
- [src/rules/wakeUp.test.ts:208](../../src/rules/wakeUp.test.ts#L208): she wakes in her nightie, every piece of her outfit in the pile in the middle of her Bedroom (her bed up in the Turret: Ed, 2026-10-26; the middle, 2026-10-29)
- [src/rules/wakeUp.test.ts:221](../../src/rules/wakeUp.test.ts#L221): a game's first morning has no yesterday (Ed, 2026-10-26: "the hat she wore yesterday should be in the clothes pile - but on the first, there was no yesterday"): no pile, on any load; her hat lies on the hats' floor, and picked up there it's on
- [src/rules/wakeUp.test.ts:240](../../src/rules/wakeUp.test.ts#L240): after a night played (after the bed, or a sail), last night's hat is in the pile with the rest, none on the hats' floor
- [src/rules/wakeUp.test.ts:248](../../src/rules/wakeUp.test.ts#L248): her first wake-up has no pile (Ed, 2026-10-26: "if it's the first night, there won't be any last night's clothes"): in her nightie all the same, dressing at the stations; E where it would lie does nothing
- [src/rules/wakeUp.test.ts:259](../../src/rules/wakeUp.test.ts#L259): E at the pile puts on all of it at once: dressed
- [src/rules/wakeUp.test.ts:268](../../src/rules/wakeUp.test.ts#L268): a station's choice puts its piece on her, and the pile keeps the rest (Ed: "if she puts on a top via the menu, the pile then puts on everything else except yesterday's top")
- [src/rules/wakeUp.test.ts:283](../../src/rules/wakeUp.test.ts#L283): in her nightie, a hat taken off the Cloakroom's hats' floor is on her head, out of the pile (so she's drawn in it)
- [src/rules/wakeUp.test.ts:292](../../src/rules/wakeUp.test.ts#L292): half dressed by the stations, she walks out as she is, the rest left in the pile
- [src/rules/wakeUp.test.ts:303](../../src/rules/wakeUp.test.ts#L303): every dressing station but the Cloakroom's (the hat's mirror, the cloak pegs), the bags and the Workshop's is in the bedroom
- [src/rules/wakeUp.test.ts:310](../../src/rules/wakeUp.test.ts#L310): the wake-up's over as she gets up, not while she's in bed or stretching, the island built or not
- [src/rules/wakeUp.test.ts:323](../../src/rules/wakeUp.test.ts#L323): no key casts the spell on her way out, nor E anywhere but her decks
- [src/rules/wakeUp.test.ts:330](../../src/rules/wakeUp.test.ts#L330): E at her decks opens her DJ booth (Ed, 2026-10-29), and "Get this party started" seats her behind them and casts it: its routine holds her there, then the party's on
- [src/rules/wakeUp.test.ts:359](../../src/rules/wakeUp.test.ts#L359): `after a load or the bed, ${what} snoozes it, as often as she likes, and never gets her up`
- [src/rules/wakeUp.test.ts:371](../../src/rules/wakeUp.test.ts#L371): `after a load or the bed, a move from the ${from} starts the ${K.stretch} s stretch, then she's up`
- [src/rules/wakeUp.test.ts:381](../../src/rules/wakeUp.test.ts#L381): `${what} does nothing in the wake-up`
- [src/rules/wakeUp.test.ts:390](../../src/rules/wakeUp.test.ts#L390): the dressing table's first-ever visit is marked once: not again on a later morning (the page's save)
- [src/rules/wakeUp.test.ts:397](../../src/rules/wakeUp.test.ts#L397): the door's open as soon as she's up, dressed or not; the party waits for her decks all the same
- [src/rules/wakeUp.test.ts:416](../../src/rules/wakeUp.test.ts#L416): she sleeps through it in bed, held, nothing ringing
- [src/rules/wakeUp.test.ts:422](../../src/rules/wakeUp.test.ts#L422): its end rings the alarm (the page's: it played to its end), and the wake-up goes on as ever
- [src/rules/wakeUp.test.ts:431](../../src/rules/wakeUp.test.ts#L431): any key or move ends it: the alarm rings, and that press doesn't also get her up
- [src/rules/wakeUp.test.ts:440](../../src/rules/wakeUp.test.ts#L440): after a sail's flight in (Ed, 2026-10-24: one dream, always in bed): landed in her bedroom asleep, the same dream, the alarm when it ends
- [src/rules/wakeUp.test.ts:453](../../src/rules/wakeUp.test.ts#L453): no dream with nothing on loan: the alarm at once, as before
- [src/rules/wakeUp.test.ts:471](../../src/rules/wakeUp.test.ts#L471): with nothing on loan: in her bed in her bedroom, not at her decks, asleep with the alarm ringing, in her nightie
- [src/rules/wakeUp.test.ts:483](../../src/rules/wakeUp.test.ts#L483): then the wake-up as every morning: up after a move and the stretch, the door open at once, dressing at the pile if she likes
- [src/rules/wakeUp.test.ts:495](../../src/rules/wakeUp.test.ts#L495): undressed, she walks from her bed down the trunk to the Terrace and starts the party at her decks in her nightie (Ed, 2026-10-25, his playtest of a sail)
- [src/rules/wakeUp.test.ts:512](../../src/rules/wakeUp.test.ts#L512): with a find on loan: the same bed, dreaming first, the alarm as the dream ends
- [src/rules/wakeUp.test.ts:522](../../src/rules/wakeUp.test.ts#L522): on every way in: a load, after the bed or a sail, and after a dream
- [src/rules/wakeUp.test.ts:535](../../src/rules/wakeUp.test.ts#L535): up, E held at her bed sleeps, the party never cast: main.ts's "slept" (the night lost, the next on a new seed)

<a id="h-r2-k2"></a>

## H-R2-K2: Current kitchen and explicit legacy preview contracts

current rules; 27 tests; files take ~7 s.

The normal nine-colour kitchen and ten-minute individual trip coexist with the explicitly selectable six-kind cauldron preview and 90-second Mirror Floor. Keep both modes, valid timesteps, independent inventories, shared references and exactly-once consumption/exit. docs/notes/cauldron.md explicitly retains the preview; it is not obsolete.

- [src/rules/cauldron.test.ts:5](../../src/rules/cauldron.test.ts#L5): has exactly 56 unordered three-mushroom recipes, including repeats
- [src/rules/cauldron.test.ts:17](../../src/rules/cauldron.test.ts#L17): retains Ed's tutorial mapping for %j
- [src/rules/cauldron.test.ts:24](../../src/rules/cauldron.test.ts#L24): does not invent assignments for biome recipes
- [src/rules/cauldron.test.ts:30](../../src/rules/cauldron.test.ts#L30): collects without a capacity limit and transfers each kind without loss
- [src/rules/cauldron.test.ts:46](../../src/rules/cauldron.test.ts#L46): uses one per press and brews on exactly the third, then starts a fresh brew
- [src/rules/cauldron.test.ts:63](../../src/rules/cauldron.test.ts#L63): keeps separately allocated witch inventories independent
- [src/rules/cauldron.test.ts:71](../../src/rules/cauldron.test.ts#L71): keeps visitors' bags separate while sharing the host's baskets and partial pot
- [src/rules/cauldronKitchen.test.ts:12](../../src/rules/cauldronKitchen.test.ts#L12): deposits on entry, consumes one per use, starts the third immediately and exits once after a second
- [src/rules/cauldronKitchen.test.ts:37](../../src/rules/cauldronKitchen.test.ts#L37): does nothing outside or at an empty basket
- [src/rules/cauldronKitchen.test.ts:45](../../src/rules/cauldronKitchen.test.ts#L45): does not deposit repeatedly while inside, and preserves partial ingredients across a visit
- [src/rules/cauldronKitchen.test.ts:60](../../src/rules/cauldronKitchen.test.ts#L60): supports a large simulation step and a second brew after returning
- [src/rules/cauldronKitchen.test.ts:72](../../src/rules/cauldronKitchen.test.ts#L72): rejects invalid timesteps without advancing a brew
- [src/rules/cauldronKitchen.test.ts:80](../../src/rules/cauldronKitchen.test.ts#L80): fixes all recipients at the third ingredient; late arrivals stay normal and leavers still exit
- [src/rules/cauldronKitchen.test.ts:100](../../src/rules/cauldronKitchen.test.ts#L100): includes every witch present, only once, regardless of who contributed
- [src/rules/cauldronNight.test.ts:25](../../src/rules/cauldronNight.test.ts#L25): leaves ordinary nights disabled
- [src/rules/cauldronNight.test.ts:32](../../src/rules/cauldronNight.test.ts#L32): auto-collects once into her hidden bag after the party and keeps it through a knockout
- [src/rules/cauldronNight.test.ts:50](../../src/rules/cauldronNight.test.ts#L50): deposits both visitors, retains partial ingredients and snapshots all occupants on BBB
- [src/rules/cauldronNight.test.ts:75](../../src/rules/cauldronNight.test.ts#L75): preserves shared basket and pot references across save/restore
- [src/rules/cauldronTrip.test.ts:4](../../src/rules/cauldronTrip.test.ts#L4): fades Mirror Floor in/out and clears it completely after 90 simulation seconds
- [src/rules/cauldronTrip.test.ts:17](../../src/rules/cauldronTrip.test.ts#L17): allocates a separate trip clock for every witch
- [src/rules/movedKitchen.test.ts:14](../../src/rules/movedKitchen.test.ts#L14): uses Dining for basket use/unload and spatial smoke entrants, retaining timing and exclusions
- [src/rules/movedKitchen.test.ts:34](../../src/rules/movedKitchen.test.ts#L34): keeps classic Kitchen membership/panel exact and covers moved pot, baskets and smoke without a new radius
- [src/rules/potionRecipes.test.ts:5](../../src/rules/potionRecipes.test.ts#L5): covers all 165 combinations exactly once, independent of ingredient order
- [src/rules/potionRecipes.test.ts:21](../../src/rules/potionRecipes.test.ts#L21): starts at full strength on wake, stays full eight minutes, fades the last two
- [src/rules/potionSettings.test.ts:9](../../src/rules/potionSettings.test.ts#L9): exposes defaults for all implemented effects and copies independent complete settings
- [src/rules/potionSettings.test.ts:19](../../src/rules/potionSettings.test.ts#L19): clamps unsafe values, ignores unknown fields, changes renderer values immediately and resets
- [src/rules/potionSettings.test.ts:32](../../src/rules/potionSettings.test.ts#L32): shows the shared trip indicator even for coming-soon recipes, then fades and clears it

<a id="h-r2-k3"></a>

## H-R2-K3: Equipment, finds, canopy, telescope and Studio contracts

current rules; 65 tests; files take ~91 s.

Keep geometry and sight clearance, supported whole/gapped canopy, find validity/ownership/identity, once-only pickup, kit prerequisites and knockout conservation, telescope projection, real Studio mappings, wardrobe and hat ownership. Projection sample minimum ensures exercised inputs rather than setting a generated-world outcome target.

- [src/rules/constellations.test.ts:6](../../src/rules/constellations.test.ts#L6): give every item in the finds pool (the wearables and the 9 broom parts) an outline of 7 to 10 stars, within the sky's limits (render/sky.ts: 12 stars, 16 lines)
- [src/rules/constellations.test.ts:20](../../src/rules/constellations.test.ts#L20): stand at the trunk's bearing from the treehouse, about 35° up, and go once it's found
- [src/rules/constellations.test.ts:31](../../src/rules/constellations.test.ts#L31): take the night's one find from one source, any kind, an outline by its item id (Ed, 2026-10-22: one permanent upgrade a night)
- [src/rules/constellations.test.ts:39](../../src/rules/constellations.test.ts#L39): wrap round north
- [src/rules/crown.test.ts:14](../../src/rules/crown.test.ts#L14): is the same crown for the same house and seed, another for another seed
- [src/rules/crown.test.ts:26](../../src/rules/crown.test.ts#L26): stands over every room: each room's floor is inside the dome, under its leaves
- [src/rules/crown.test.ts:34](../../src/rules/crown.test.ts#L34): leaves the Terrace and its notch out to the crown's edge open: no lobe, limb or string above the floor on any line of sight to them
- [src/rules/crown.test.ts:47](../../src/rules/crown.test.ts#L47): frames the whole Terrace: its floor's outline, and her DJ desk on its rim, inside the gap with a margin to spare
- [src/rules/crown.test.ts:63](../../src/rules/crown.test.ts#L63): opens its notch the way she takes off: the Terrace's open south-east rim, towards the dancefloor
- [src/rules/crown.test.ts:69](../../src/rules/crown.test.ts#L69): carries each room's limb on past it, forking, with roots on the ground and top limbs over the topmost room
- [src/rules/crown.test.ts:91](../../src/rules/crown.test.ts#L91): winds its lights round it in smooth strands when asked (Ed, 2026-10-27: "The spiral with 2 strands, smoothed so it sags across the gaps")
- [src/rules/crown.test.ts:135](../../src/rules/crown.test.ts#L135): has no ring of lights round a gap, its other strings as ever, its limbs all kept
- [src/rules/crown.test.ts:141](../../src/rules/crown.test.ts#L141): still keeps open ground it's given open to the sky (the dancefloor)
- [src/rules/crown.test.ts:146](../../src/rules/crown.test.ts#L146): is the same crown for the same house and seed, and the gap's crown is the one it always was
- [src/rules/finds.test.ts:27](../../src/rules/finds.test.ts#L27): stands in a wild area's woods, never home's, off its clearings and clear of the relics
- [src/rules/finds.test.ts:72](../../src/rules/finds.test.ts#L72): finds hats and bags each on its own (Ed, 2026-10-23): every spell hat but the plain one, and the found bags (the Satchel, Bumbag and Purse hers from the start: Ed, 2026-10-29), out of the trunk
- [src/rules/finds.test.ts:86](../../src/rules/finds.test.ts#L86): starts her with the plain hat only; a hat found is hers and lies on the hats' floor (Ed, 2026-10-23: the floor fills as she finds them)
- [src/rules/finds.test.ts:105](../../src/rules/finds.test.ts#L105): opens with E on foot: what's in it is hers (a found event), once
- [src/rules/finds.test.ts:119](../../src/rules/finds.test.ts#L119): can't be opened once the party's over
- [src/rules/finds.test.ts:131](../../src/rules/finds.test.ts#L131): names the compass point from the treehouse to the trunk, north up the screen
- [src/rules/finds.test.ts:166](../../src/rules/finds.test.ts#L166): only while the party's on
- [src/rules/finds.test.ts:178](../../src/rules/finds.test.ts#L178): `is claimed exactly as a placed one (${kind} ${item})`
- [src/rules/finds.test.ts:206](../../src/rules/finds.test.ts#L206): is tonight's find: the constellation's way points at it, and an unknown item spawns nothing
- [src/rules/finds.test.ts:220](../../src/rules/finds.test.ts#L220): taken, its constellation's find is the loan's (lit), not tonight's to find; before, none on loan
- [src/rules/finds.test.ts:233](../../src/rules/finds.test.ts#L233): the night won: one not yet taken is gone; one on loan stays (its constellation lit till she sleeps)
- [src/rules/findsList.test.ts:31](../../src/rules/findsList.test.ts#L31): in docs/art-guide/FINDS.md is FIND_KINDS's own
- [src/rules/kit.test.ts:26](../../src/rules/kit.test.ts#L26): is nothing taken on a night that waits for her spell, and both on one that doesn't (the tools, the bots)
- [src/rules/kit.test.ts:34](../../src/rules/kit.test.ts#L34): takes her invitations once, and a broom while one's left at the lathe, one a witch
- [src/rules/kit.test.ts:41](../../src/rules/kit.test.ts#L41): E at the invitations desk gives her tonight's invitations; E at the lathe, a broom
- [src/rules/kit.test.ts:54](../../src/rules/kit.test.ts#L54): won't give her invitations till she carries a bag (Ed, 2026-10-29: "you can't pick up invitations until you're carrying a bag"): the desk says why
- [src/rules/kit.test.ts:72](../../src/rules/kit.test.ts#L72): without her invitations, her 💌 key throws nothing; with them, as ever (Ed: "no ammo that runs out")
- [src/rules/kit.test.ts:85](../../src/rules/kit.test.ts#L85): without a broom, off the Terrace's open rim she falls: a thud below, a beat, then back at the magic circle; with one, she flies
- [src/rules/kit.test.ts:109](../../src/rules/kit.test.ts#L109): keeps both through a knockout
- [src/rules/studio.test.ts:11](../../src/rules/studio.test.ts#L11): plays three rows of the scale, the middle row from the root, every note in key
- [src/rules/studio.test.ts:24](../../src/rules/studio.test.ts#L24): gives every drum key and gamepad pad a kit's real patch
- [src/rules/studio.test.ts:30](../../src/rules/studio.test.ts#L30): has every sound a real patch
- [src/rules/studio.test.ts:34](../../src/rules/studio.test.ts#L34): runs the number row on the shared loop and her own sound
- [src/rules/studio.test.ts:49](../../src/rules/studio.test.ts#L49): plays real patches in every style, a kick on the beat, never on the off-beat sixteenths
- [src/rules/studio.test.ts:64](../../src/rules/studio.test.ts#L64): stands the drum kit, the synth and the mic in the Studio; no record shelf (Ed, 2026-10-29: "Remove record station, instead have dj booth": her decks)
- [src/rules/studio.test.ts:68](../../src/rules/studio.test.ts#L68): lights the instrument she walks up to, is at it only on E there, holds it a little past reach, and lets go on Esc (Ed's playtest, 2026-10-26)
- [src/rules/telescope.test.ts:8](../../src/rules/telescope.test.ts#L8): starts north and wide, the game's own way
- [src/rules/telescope.test.ts:15](../../src/rules/telescope.test.ts#L15): pans all the way round, either way, and wraps
- [src/rules/telescope.test.ts:23](../../src/rules/telescope.test.ts#L23): turns straight by the mouse's degrees, wrapping round and tilting no further than its floor and tiltMax
- [src/rules/telescope.test.ts:30](../../src/rules/telescope.test.ts#L30): pans slower zoomed in, so the view moves alike on screen
- [src/rules/telescope.test.ts:35](../../src/rules/telescope.test.ts#L35): tilts up the stick from the forest to tiltMax, and no further either way (Ed, 2026-10-22: to look at the stars)
- [src/rules/telescope.test.ts:44](../../src/rules/telescope.test.ts#L44): zooms with the wheel, the zoom keys and the shoulder buttons, within wide and close
- [src/rules/telescope.test.ts:49](../../src/rules/telescope.test.ts#L49): looks down to the forest over the bend at its lowest
- [src/rules/telescope.test.ts:55](../../src/rules/telescope.test.ts#L55): names the compass points
- [src/rules/telescope.test.ts:58](../../src/rules/telescope.test.ts#L58): shows the moon only looking its way
- [src/rules/telescope.test.ts:65](../../src/rules/telescope.test.ts#L65): puts the moon in the sky: its altitude and bearing the same however the view pans, tilts and zooms (Ed's playtest, v4522)
- [src/rules/wardrobe.test.ts:26](../../src/rules/wardrobe.test.ts#L26): takes at once; a hat lying in the world stays there with its spell, and she wears the new one
- [src/rules/wardrobe.test.ts:38](../../src/rules/wardrobe.test.ts#L38): several can lie about at once
- [src/rules/wardrobe.test.ts:65](../../src/rules/wardrobe.test.ts#L65): she can't pick one up wearing a hat; bare-headed she puts it on, its spell hers, and her own stays where it lay
- [src/rules/wardrobeShelves.test.ts:14](../../src/rules/wardrobeShelves.test.ts#L14): gives every dressing station its shelves, and names no station the house hasn't
- [src/rules/wardrobeShelves.test.ts:19](../../src/rules/wardrobeShelves.test.ts#L19): sets only what her genome has, to values the generator draws
- [src/rules/wardrobeShelves.test.ts:29](../../src/rules/wardrobeShelves.test.ts#L29): colours only her palette's parts, and fits only her sliders
- [src/rules/wardrobeShelves.test.ts:36](../../src/rules/wardrobeShelves.test.ts#L36): has unique ids, and some still to find
- [src/rules/wardrobeShelves.test.ts:41](../../src/rules/wardrobeShelves.test.ts#L41): puts each item on, and only it of its shelf
- [src/rules/wardrobeShelves.test.ts:50](../../src/rules/wardrobeShelves.test.ts#L50): keeps a backpack's size when it's already on, so its fit stays
- [src/rules/wardrobeShelves.test.ts:56](../../src/rules/wardrobeShelves.test.ts#L56): starts her owning what she has on, on every shelf with items but the bags (she starts with none: Ed, 2026-10-29, "Remove none")
- [src/rules/wardrobeShelves.test.ts:65](../../src/rules/wardrobeShelves.test.ts#L65): owns the starting set, what's kept, and anything she's wearing; never a stranger's id
- [src/rules/wardrobeShelves.test.ts:74](../../src/rules/wardrobeShelves.test.ts#L74): has colour grids of 5 rows (Ed: "Colour picker has only 5 rows"): cloth 13 across, skin 6
- [src/rules/wardrobeShelves.test.ts:84](../../src/rules/wardrobeShelves.test.ts#L84): an item row shows once two of its items are hers
- [src/rules/wardrobeShelves.test.ts:96](../../src/rules/wardrobeShelves.test.ts#L96): every shelf names the part of her the camera zooms on, one the tuning has
- [src/rules/wardrobeShelves.test.ts:100](../../src/rules/wardrobeShelves.test.ts#L100): her hat comes off at the dressing table, not at the hat's mirror

## house-treehouse: ruling review

- Layout supersession: house.md37 records the saved proposal approved as the default after guest-wake releasev6703 (1553#6547631190,1476#6548948298). Plain links/layout=ed select it; layout=classic retains the older arrangement. housePlacement:11 explicitly compares false/true modes rather than the global default. H2 proposes descriptions only, preserving classic-module identity and occupant conservation.
- Bed route: houseConfig:27 names the old 93 m mock, while its actual assertion is99 m following the 26Oct corridor/bed move. H2 updates the description to the route already asserted, not the expected value.
- Treehouse direction: DESIGN105’s5Oct due-north placement was replaced by 24Oct north-west. treehouse:143 already checks north-west. No behavior deletion is needed.
- Broom stations: house.md100 records29Oct’s single station at the lathe, replacing separate bay/pegboard interaction. houseRooms:156 and stations:179 enforce the replacement. No-broom takeoff restrictions and broom-enabled takeoff are conditional rules, not contradictions.
- Cross-owner mixed kernels in nine broom/hat/guard cases are excluded from the combined house keep question and listed under 1622. Stealth windows, hit counts and Cyclone turn/height/fling percentages are not certified as house integrity merely by appearing in equipment files. Other handoffs:11 measurement-tool tests,3 changelog UI tests,3 mushroom-stock save tests and 9 MP boundary tests are counted on their owner pages once. No whole house behavior was proved obsolete.
- Second pass: the 1 November published layout retains 110 poses and 22 removals; 29 October one-lathe rule changes three descriptions only. Current kitchen rules do not obsolete the explicitly retained ?cauldron=1 preview. Whole/gapped canopy modes remain supported. Report 6566610514 includes the completed review and exact assertion dispositions.

## invites-party: review provenance

Read-only review of the 152 assigned tests in25 files at 9f045ebca, report 6566171808. Rebucketed neighboring cases are not silently approved. Second remaining-manifest review 6566767328 at 73741aa8: all 134 source declarations accounted for, 7 proposed, 116 kept and 11 combat-owner-only. Zero overlap and zero unread. Final question membership folded into IP1/IP2/IP3; IP4/IP5 are reviewer report labels, not additional questions.

<a id="ip1"></a>

## IP1: Observed motion and occurrence thresholds

outcome stats; 11 tests; files take ~208 s.

Nine tests pin loaded movement/climb ratios, route drift, treetop swoop frequency, sigil occupancy share, partner arrival, observed poses and the retained noisy picker’s excess crossings. These are outcome-dominated measurements; direct boundaries and ownership must remain separately protected. Second review adds two outcome-only docking/bot-success deadline measurements. Neither has an independent integrity assertion to retain; controlled pickup/cast/scatter contracts remain elsewhere. Report 6566767328.

- [src/rules/leashWeight.test.ts:75](../../src/rules/leashWeight.test.ts#L75): loaded, she's slower moving away from the pull, not toward it or across it much, and drifts a little toward it
- [src/rules/leashWeight.test.ts:84](../../src/rules/leashWeight.test.ts#L84): rises slower with load
- [src/rules/leyroute.test.ts:86](../../src/rules/leyroute.test.ts#L86): spirals out (Ed, 2026-10-06): distance from home growing steadily with the wave, no late return toward home, the waves spread round home
- [src/rules/leyroute.test.ts:98](../../src/rules/leyroute.test.ts#L98): (the noisy picker before it crossed itself thousands of times a run)
- [src/rules/partyWitches.test.ts:45](../../src/rules/partyWitches.test.ts#L45): a partner stands beside the one who leads
- [src/rules/partyWitches.test.ts:76](../../src/rules/partyWitches.test.ts#L76): the twirl and the broom limbo: partners do the partner's pose, and a third shuffles under the bar
- [src/rules/partyWitches.test.ts:112](../../src/rules/partyWitches.test.ts#L112): swoops up over the treetops and down again, much more often while a player's up there
- [src/rules/pickup.test.ts:81](../../src/rules/pickup.test.ts#L81): pulls from any side (Ed, 2026-10-12): a rune near her comes to her feet from north, south, east or west, round a follower in the way
- [src/rules/sigilAvoid.test.ts:34](../../src/rules/sigilAvoid.test.ts#L34): dancers and idlers near a cluster of placed sigils end up off them
- [src/rules/sigilAvoid.test.ts:51](../../src/rules/sigilAvoid.test.ts#L51): parked ones roaming round their sigil keep off it and its neighbours
- [src/rules/stoneStacks.test.ts:397](../../src/rules/stoneStacks.test.ts#L397): the skilled bot converts a stone by casting it, then gathers its loose sigils (seed 11, the 10-area home)

<a id="ip2"></a>

## IP2: Mixed party, spread and route statistics

outcome stats; 21 tests; files take ~358 s.

Sixteen mixed tests combine finite-sample extrema, density, activity, route diversity and arrival observations with direct rules. Preserve roster membership, angular bounds/replay, path/floor/seat exclusions, removed-piece absence, caps, deterministic guest places, reciprocal pairs, configured height/40 m bounds, finite pulse lifecycle, crossing separation and unoccupied destinations. Two outcome-only declarations: pickup:81 measures docking by a 12-second deadline; stoneStacks:397 requires bot casting/stack success within 90 seconds. Neither contains a separate integrity assertion to retain. Five mixed declarations: pickup:63 retains rune/pickup-radius ordering, controlled in-range pickup and leash state, while six-second convergence reports; stoneStacks:219 retains repeatability while sampled shape variation reports; rules:619 retains fresh adjacent choices, forecast and wave identity while sampled noisy-picker preference reports; runestones:23 retains same/different-seed dealing while finite-sample flip variety reports. rules:641 retains formula-derived arrival order, monotone activation, all speakers, scheduling and pause shifts; fixed path length 195, 8–9.5-second first arrival and midpoint speaker-count pins need reporting or geometry-derived checks. Its older roughly-three-second comment and DECISION FOR ED remain unresolved against the north-west house geometry; no replacement timing ruling was found. Exact assertion dispositions: report 6566767328.

- [src/rules/floorSigils.test.ts:12](../../src/rules/floorSigils.test.ts#L12): never picks an off-island kind's shape, whatever has the party, and does pick the World Tree
- [src/rules/invitesAim.test.ts:30](../../src/rules/invitesAim.test.ts#L30): strays each letter within inaccuracy degrees, both ways, and the same every time
- [src/rules/leashWeight.test.ts:89](../../src/rules/leashWeight.test.ts#L89): over the treetops: sinks slowly to the floor while flying on, lands if she stops or the load is extreme, floats back up unloaded
- [src/rules/leypulse.test.ts:83](../../src/rules/leypulse.test.ts#L83): none before the line's tip reaches the stone; it shoots up with a flare when it does, then stays
- [src/rules/leyroute.test.ts:41](../../src/rules/leyroute.test.ts#L41): keeps Ed's crossing rules on 40 seeds: at most 4 a map, none the pulse would pass over already drawn ahead of it, 350 m apart (Ed, 2026-10-06)
- [src/rules/leyroute.test.ts:106](../../src/rules/leyroute.test.ts#L106): starts about the ring round home, and keeps the waves near each other
- [src/rules/partyDressing.test.ts:14](../../src/rules/partyDressing.test.ts#L14): home is strewn all over with party decorations instead of trees (Ed, 2026-10-05), none on the floor, its clearing, the paths, the treehouse or her seat
- [src/rules/partyDressing.test.ts:43](../../src/rules/partyDressing.test.ts#L43): each area gets 2-4 clusters, 20-40 loose pieces (a set piece at most), lights capped, nothing on paths or the dancefloor; the same each time
- [src/rules/partyDressing.test.ts:71](../../src/rules/partyDressing.test.ts#L71): the ten cut pieces are gone (Ed, 2026-10-19), and what they filled is still filled by the rest
- [src/rules/partyDressing.test.ts:102](../../src/rules/partyDressing.test.ts#L102): an area's party neons are its own colour plus one accent (the art director, round 1), its balloons mostly by its lights
- [src/rules/partyGuests.test.ts:34](../../src/rules/partyGuests.test.ts#L34): deals guests out over the soundsystem and the party places, the same each time
- [src/rules/partyWitches.test.ts:26](../../src/rules/partyWitches.test.ts#L26): stays within roam of the floor through her activities, pairs are mutual, and flies off when her soundsystem stops
- [src/rules/partyWitches.test.ts:82](../../src/rules/partyWitches.test.ts#L82): wanders within 40 m of the floor's middle, mildly preferring it (Ed, 2026-10-06)
- [src/rules/partyWitches.test.ts:102](../../src/rules/partyWitches.test.ts#L102): never drinks, rests, chats or holds hands on the dancefloor itself
- [src/rules/partyWitches.test.ts:124](../../src/rules/partyWitches.test.ts#L124): swoops to random heights, lower hops and soaring well over the treetops
- [src/rules/pickup.test.ts:63](../../src/rules/pickup.test.ts#L63): forgiving (Ed's playtest, 2026-10-06): E picks a rune up from further than her own sigils, and a rune near her comes to her
- [src/rules/rules.test.ts:619](../../src/rules/rules.test.ts#L619): wakes exactly one area a wave, the one chosen in advance, always bordering the party (no islands), spreading away from the last (the noisy picker)
- [src/rules/rules.test.ts:641](../../src/rules/rules.test.ts#L641): boots the home speakers up first, one by one, at the boot's own speed, then the pulse sets off for the first wave (Ed, 2026-10-04; the first speaker about 3 s off the decks, 2026-10-06; the pulse's speed, 2026-10-09; the boot's own, 2026-10-18)
- [src/rules/runestones.test.ts:23](../../src/rules/runestones.test.ts#L23): is the seed's own, and mirrors some
- [src/rules/sigilAvoid.test.ts:61](../../src/rules/sigilAvoid.test.ts#L61): one resting on a sigil moves on
- [src/rules/stoneStacks.test.ts:219](../../src/rules/stoneStacks.test.ts#L219): grows the great stumps' cuts irregular (runeMarkers.stump.irregular; Ed, 2026-10-29: "can they be more irregular?"), each its own

<a id="ip3"></a>

## IP3: Invitation, phase and route contracts

current rules; 243 tests; files take ~744 s.

Direct hit counts use constructed eligible targets, not emergent battles. Phase/state/identity sweeps prevent vacuous passes. Long pulse audits check EVERY step for monotone bounded fronts and exact wave coupling; curveWork is a real planning budget. Old modes remain explicit comparisons. Keep eligibility, personal runes, pickup priority/delay, per-step no-teleport/leash bounds, actor/bed isolation, current letters, wave identity/forecast, analytical pulse/intercept, pause, once-only activation, stack/cycle geometry, balanced dealing, explicit placement/cardinality/uniqueness and deterministic choices. Long loops provide direct safety/branch coverage. placement:14 explicitly enables setPieceChance 0.25 and older scenery families; its minimum coverage avoids a vacuous compatibility fixture. Older grid, cast-off, noisy-picker, proximity-talk and injected carried-flask states are explicitly selected, not current-default demands. Report 6566767328.

- [src/partyGearSize.test.ts:8](../../src/partyGearSize.test.ts#L8): %s party accessories keep the naked body scale
- [src/rules/alarms.test.ts:14](../../src/rules/alarms.test.ts#L14): starts on the first blow, follows its health down, and counts a frame's blows once however often it's drawn
- [src/rules/alarms.test.ts:25](../../src/rules/alarms.test.ts#L25): goes a few seconds after the blows stop, and a new attack after that starts again
- [src/rules/alarms.test.ts:34](../../src/rules/alarms.test.ts#L34): keeps a fallen one for its fall, at no health, then lets it go
- [src/rules/alarms.test.ts:45](../../src/rules/alarms.test.ts#L45): shows one per soundsystem under attack, the most recently hit first, up to a few
- [src/rules/alarms.test.ts:54](../../src/rules/alarms.test.ts#L54): gives the debug blows as real soundHit events on the farthest standing ones, never felling one (mended at the floor)
- [src/rules/asleepBeforeParty.test.ts:51](../../src/rules/asleepBeforeParty.test.ts#L51): every creature asleep in its own area, as after a loss, the legends too
- [src/rules/asleepBeforeParty.test.ts:68](../../src/rules/asleepBeforeParty.test.ts#L68): out of the house she can't invite them, and nothing attacks her, as after a loss
- [src/rules/asleepBeforeParty.test.ts:83](../../src/rules/asleepBeforeParty.test.ts#L83): tonight's find isn't there yet: E at its trunk does nothing, as after a loss
- [src/rules/asleepBeforeParty.test.ts:94](../../src/rules/asleepBeforeParty.test.ts#L94): casting the party spell gets everyone up as a night that never waited has them, and the find is there
- [src/rules/asleepBeforeParty.test.ts:116](../../src/rules/asleepBeforeParty.test.ts#L116): a legend only snores before the party, no dream (Ed, 2026-10-26): its quest closed, as after a loss, open again once it's cast
- [src/rules/asleepBeforeParty.test.ts:131](../../src/rules/asleepBeforeParty.test.ts#L131): no relics before the party (Ed, 2026-10-26: "Relics, like finds, only appear once the party starts"); out once it's cast
- [src/rules/asleepBeforeParty.test.ts:147](../../src/rules/asleepBeforeParty.test.ts#L147): the night sounds as after a loss before the party (Ed, 2026-10-26, Q-c), easing out as it's cast; a night that never waited has none
- [src/rules/asleepBeforeParty.test.ts:161](../../src/rules/asleepBeforeParty.test.ts#L161): a night that never waits for the spell (the tools, the bots) is as before: awake from the start
- [src/rules/bootRing.test.ts:21](../../src/rules/bootRing.test.ts#L21): goes round clockwise from the top: the first stone just east of north, then east, south, west
- [src/rules/bootRing.test.ts:27](../../src/rules/bootRing.test.ts#L27): starts at the treehouse's front and comes down on to the ring along it, just past its top, before the first stone
- [src/rules/bootRing.test.ts:34](../../src/rules/bootRing.test.ts#L34): moves nothing before the party spell
- [src/rules/bootRing.test.ts:40](../../src/rules/bootRing.test.ts#L40): draws the line at reveal (3) times the pulse until the ring is whole
- [src/rules/bootRing.test.ts:45](../../src/rules/bootRing.test.ts#L45): waits at the treehouse after the cast until she leaves her decks
- [src/rules/bootRing.test.ts:50](../../src/rules/bootRing.test.ts#L50): runs at the pulse's speed from when she leaves her decks, turning the first stone as it gets there
- [src/rules/bootRing.test.ts:58](../../src/rules/bootRing.test.ts#L58): turns each stone into a speaker as the pulse reaches it, in order
- [src/rules/bootRing.test.ts:68](../../src/rules/bootRing.test.ts#L68): turns the 12th stone as the pulse reaches it, and ends the boot as it comes round to where it came on to the ring
- [src/rules/bootRing.test.ts:79](../../src/rules/bootRing.test.ts#L79): holds the party until it's cast and she leaves her decks, then the boot runs at the pulse's speed and the wave's pulse sets off after it
- [src/rules/bootRing.test.ts:106](../../src/rules/bootRing.test.ts#L106): the first line's way out starts where the boot's lap ends, runs on round the ring's circle and leaves it from a point on it
- [src/rules/clear.test.ts:137](../../src/rules/clear.test.ts#L137): leaves the pulse, its link, the line's front and every stone's reach time as they were
- [src/rules/clear.test.ts:151](../../src/rules/clear.test.ts#L151): counts its stone reached when its wave comes, at the wave's time, in the route's order
- [src/rules/clear.test.ts:164](../../src/rules/clear.test.ts#L164): raises its soundsystem at once, its babies (its circle's too) happy and dancing, its stone reached, no wave spent
- [src/rules/clear.test.ts:180](../../src/rules/clear.test.ts#L180): a wave at a stone already playing changes nothing in the rules: no enraging, no second soundsystem; it celebrates
- [src/rules/clear.test.ts:199](../../src/rules/clear.test.ts#L199): a wave still wakes a stone not yet cleared, as ever; and an early soundsystem lost is skipped quietly by its wave
- [src/rules/clear.test.ts:220](../../src/rules/clear.test.ts#L220): clears no area while any of its own wild (or enraged) creatures is about; its legend and circle baby don't count
- [src/rules/clear.test.ts:233](../../src/rules/clear.test.ts#L233): babies never hold it (Ed, 2026-10-07: 'Wild babies don't count'): with only its wild babies left it transforms, and they join the party
- [src/rules/clear.test.ts:245](../../src/rules/clear.test.ts#L245): its wave transforming it uncleared, its wild babies join the party too (Ed, 2026-10-07: 'Wild babies become party babies when the pulse transforms an uncleared area'); its young and adults besiege
- [src/rules/clear.test.ts:258](../../src/rules/clear.test.ts#L258): plays the same from the same seed
- [src/rules/clear.test.ts:265](../../src/rules/clear.test.ts#L265): lists the area's own still holding it, the area she's in if it can still be cleared, and says so in words
- [src/rules/clear.test.ts:287](../../src/rules/clear.test.ts#L287): a sleeper holds its area till she wakes it, landing in it (what Ed met), or with a 💌, which it now takes (Ed, 2026-10-11: "Letters wake them"; lettersWake.test.ts)
- [src/rules/clear.test.ts:305](../../src/rules/clear.test.ts#L305): a visitor standing in a cleared area doesn't block it, isn't counted, and isn't touched when its stone transforms; a native wandered off still holds it
- [src/rules/fireworks.test.ts:5](../../src/rules/fireworks.test.ts#L5): is the same for the same event, and different elsewhere
- [src/rules/fireworks.test.ts:9](../../src/rules/fireworks.test.ts#L9): keeps to its knobs: the count, the time, the heights, the drift, the finale last
- [src/rules/fireworks.test.ts:26](../../src/rules/fireworks.test.ts#L26): is off with fireworks.on false
- [src/rules/floorSigils.test.ts:24](../../src/rules/floorSigils.test.ts#L24): takes a game's kinds from its island's roster, not from home's own cell, and the floor keeps to them
- [src/rules/floorSigils.test.ts:34](../../src/rules/floorSigils.test.ts#L34): on a map with no roster, takes the kinds of its playable areas, home's own cell left out
- [src/rules/floorSigils.test.ts:40](../../src/rules/floorSigils.test.ts#L40): writes the island's own sigil through the boot: a kind's island its kind's, home's the World Tree
- [src/rules/guestWake.test.ts:11](../../src/rules/guestWake.test.ts#L11): looks up stable guest-room beds and doors without changing room access
- [src/rules/guestWake.test.ts:20](../../src/rules/guestWake.test.ts#L20): routes guest alarm, hold and stretch to her own bed without changing host or equipment
- [src/rules/guestWake.test.ts:40](../../src/rules/guestWake.test.ts#L40): keeps explicit host-room routing equivalent to the unchanged host default
- [src/rules/guestWake.test.ts:52](../../src/rules/guestWake.test.ts#L52): rejects unknown rooms and mismatched player targets without changing state
- [src/rules/hexSigils.test.ts:26](../../src/rules/hexSigils.test.ts#L26): are on: 6 m between neighbouring cells with the rank sigils (leash.ranks.hex; 4 before them, ?sigils=old)
- [src/rules/hexSigils.test.ts:31](../../src/rules/hexSigils.test.ts#L31): the grid: every point snaps to the nearest cell's middle, and neighbours are size apart
- [src/rules/hexSigils.test.ts:42](../../src/rules/hexSigils.test.ts#L42): put down, a sigil sits in the middle of the cell nearest her; pressed there again, it's picked up (no fizzling)
- [src/rules/hexSigils.test.ts:61](../../src/rules/hexSigils.test.ts#L61): a baby's sigil (Ed, 2026-10-11: babies follow in single file) snaps to the grid like the rest, and is picked up the same way
- [src/rules/hexSigils.test.ts:71](../../src/rules/hexSigils.test.ts#L71): skips barred cells (under a stone, a soundsystem, a speaker): down on the nearest free one that isn't, or nothing
- [src/rules/hexSigils.test.ts:83](../../src/rules/hexSigils.test.ts#L83): in the game, the cells under each runestone, soundsystem and home speaker are barred, and the open ground isn't
- [src/rules/inviteWakes.test.ts:38](../../src/rules/inviteWakes.test.ts#L38): its watch is over at once and every young and adult of it, a napper too, hunts her straight away; never its babies, legend or circle baby
- [src/rules/inviteWakes.test.ts:54](../../src/rules/inviteWakes.test.ts#L54): by the hunt's rules: with her not on the ground in the area, nobody hunts; and with inviteWakes off, the watch plays as ever
- [src/rules/invites.test.ts:28](../../src/rules/invites.test.ts#L28): fires a burst of `burst` volleys of `multiShot` letters, then waits out its cooldown
- [src/rules/invites.test.ts:42](../../src/rules/invites.test.ts#L42): lands on a wild creature in its path, and lets her own party through
- [src/rules/invites.test.ts:50](../../src/rules/invites.test.ts#L50): is blocked by an enraged creature or a legend in the way
- [src/rules/invites.test.ts:59](../../src/rules/invites.test.ts#L59): homes in on a creature a little off its line, and fizzles out past its range
- [src/rules/invites.test.ts:69](../../src/rules/invites.test.ts#L69): in the game: only on the ground and off her seat, and no proximity chat when on
- [src/rules/invites.test.ts:84](../../src/rules/invites.test.ts#L84): flies straight through trees and scenery: only animals stop a 💌 (Ed, 2026-10-05)
- [src/rules/invites.test.ts:106](../../src/rules/invites.test.ts#L106): every 💌 that lands counts (Ed, 2026-10-06: no per-creature gap): 5 letters in 0.2 s give five letters' worth
- [src/rules/invites.test.ts:114](../../src/rules/invites.test.ts#L114): one 💌 a shot: a meter fills in (hits - 1) cooldowns and a flight, every hit counting (the gap gone, 2026-10-06)
- [src/rules/invitesAim.test.ts:24](../../src/rules/invitesAim.test.ts#L24): at 0 (the tuning's own), every letter flies dead on her aim
- [src/rules/invitesAim.test.ts:37](../../src/rules/invitesAim.test.ts#L37): blooms while she keeps firing, up to bloomMax, and settles once she stops
- [src/rules/invitesAim.test.ts:47](../../src/rules/invitesAim.test.ts#L47): the spray, burst and stream bags carry it; the satchel, purse and briefcase fly true
- [src/rules/invitesChain.test.ts:55](../../src/rules/invitesChain.test.ts#L55): at 0, a letter stops at the first it lands on; at 2, it hops on to the next nearest twice, each once, none beyond chainRange
- [src/rules/invitesChain.test.ts:62](../../src/rules/invitesChain.test.ts#L62): picks the next by the letters' own invitable: one the Affection says no to is never hopped to
- [src/rules/invitesChain.test.ts:68](../../src/rules/invitesChain.test.ts#L68): in the game: a chain-2 letter fills one slot on each of three creatures, each as a direct letter's
- [src/rules/invitesChain.test.ts:79](../../src/rules/invitesChain.test.ts#L79): never hops to a stunned creature, and fills one about to be stunned no further than a direct letter
- [src/rules/invitesPierce.test.ts:56](../../src/rules/invitesPierce.test.ts#L56): at 0, a letter stops at the first it lands on; at 2, it lands on three, each once
- [src/rules/invitesPierce.test.ts:62](../../src/rules/invitesPierce.test.ts#L62): in the game: a pierce-2 letter fills one slot on each of three creatures, in the fade queue as a direct letter's
- [src/rules/invitesPierce.test.ts:74](../../src/rules/invitesPierce.test.ts#L74): does to a stunned creature or one about to be stunned just what a direct letter does, then flies on
- [src/rules/leashWeight.test.ts:34](../../src/rules/leashWeight.test.ts#L34): pulls by how taut each leash is: nothing while near and slack, capped however far
- [src/rules/leashWeight.test.ts:46](../../src/rules/leashWeight.test.ts#L46): weighs adults over babies, and the species' strength
- [src/rules/leashWeight.test.ts:51](../../src/rules/leashWeight.test.ts#L51): only her stack weighs (placed sigils don't), and the first few weigh nothing
- [src/rules/leashWeight.test.ts:66](../../src/rules/leashWeight.test.ts#L66): on the ground she's stronger: an adult's weight more is free there than in the treetops (Ed, 2026-10-09)
- [src/rules/lettersWake.test.ts:32](../../src/rules/lettersWake.test.ts#L32): a 💌 from the next area over rouses a napper and counts on its meter
- [src/rules/lettersWake.test.ts:46](../../src/rules/lettersWake.test.ts#L46): one asleep for good (the party's over: no nap's end) still lets them by
- [src/rules/leyPulseAudit.test.ts:50](../../src/rules/leyPulseAudit.test.ts#L50): wave by wave: from the last wave's stone to the next's, setting off as each wave lands, never past the front
- [src/rules/leyPulseAudit.test.ts:63](../../src/rules/leyPulseAudit.test.ts#L63): an area cleared early: the pulse, the line and the beacons keep their pace (#565); its wave reaches it as ever
- [src/rules/leyPulseAudit.test.ts:77](../../src/rules/leyPulseAudit.test.ts#L77): a soundsystem lost: its stone stays on the line, reached when its wave came; the line isn't redrawn and the pulse stays on its link
- [src/rules/leyPulseAudit.test.ts:89](../../src/rules/leyPulseAudit.test.ts#L89): an area cleared early whose soundsystem is lost before its wave: its stone is reached when the wave comes
- [src/rules/leyPulseAudit.test.ts:100](../../src/rules/leyPulseAudit.test.ts#L100): knocked out and teleported home: the line and the pulse don't change
- [src/rules/leyPulseAudit.test.ts:111](../../src/rules/leyPulseAudit.test.ts#L111): a quest done: the line, its order and the pulse stay as they were (Ed, 2026-10-08, leyLines.advance "wave"); "first" is the old jump
- [src/rules/leyPulseAudit.test.ts:157](../../src/rules/leyPulseAudit.test.ts#L157): through the boot and five waves: the pulse a link a wave, the front leyLines.reveal times as far
- [src/rules/leyPulseAudit.test.ts:166](../../src/rules/leyPulseAudit.test.ts#L166): a tempo change mid-link (a knockdown's BPM): the pace changes, nothing jumps, and it still arrives with the wave
- [src/rules/leyPulseAudit.test.ts:174](../../src/rules/leyPulseAudit.test.ts#L174): a soundsystem lost: the pulse keeps its pace and arrives with the wave, which comes on time (Ed, 2026-10-08)
- [src/rules/leyPulseAudit.test.ts:188](../../src/rules/leyPulseAudit.test.ts#L188): an area cleared early, and quests done for the next stone and one farther on: nothing moves
- [src/rules/leyPulseAudit.test.ts:198](../../src/rules/leyPulseAudit.test.ts#L198): two stones a wave (two witches): the pulse runs through both in turn, no jump as the wave lands
- [src/rules/leyPulseAudit.test.ts:206](../../src/rules/leyPulseAudit.test.ts#L206): paused: the pulse and the front hold still
- [src/rules/leycurve.test.ts:12](../../src/rules/leycurve.test.ts#L12): joins any two stones on their headings, landing exactly, never tighter than the radius
- [src/rules/leycurve.test.ts:25](../../src/rules/leycurve.test.ts#L25): goes through a stone it must double back from in a wide loop, not a hairpin
- [src/rules/leycurve.test.ts:35](../../src/rules/leycurve.test.ts#L35): passes through every stone without a corner (a V at a stone is the in and out headings apart)
- [src/rules/leycurve.test.ts:44](../../src/rules/leycurve.test.ts#L44): never turns tighter than leyLines.minRadius, sweeps through every stone without a corner, and keeps off the dancefloor
- [src/rules/leylines.test.ts:23](../../src/rules/leylines.test.ts#L23): start at home, pointing to the next wave's stone, then the ones after in the order they will wake
- [src/rules/leylines.test.ts:30](../../src/rules/leylines.test.ts#L30): foretell what the waves really wake, and move on to the next stone as each wave arrives
- [src/rules/leylines.test.ts:41](../../src/rules/leylines.test.ts#L41): under advance "first", move on when the next area's quest is done, before its wave, and stay put when that wave comes
- [src/rules/leylines.test.ts:54](../../src/rules/leylines.test.ts#L54): by default (advance "wave": Ed, 2026-10-08, 'The pulse should never skip'), stay put when a quest is done; its wave moves them on
- [src/rules/leylines.test.ts:67](../../src/rules/leylines.test.ts#L67): at the start runs from home through every area, in the order the waves will wake them
- [src/rules/leylines.test.ts:75](../../src/rules/leylines.test.ts#L75): stays the same line as the waves come, the last stone reached moving on along it
- [src/rules/leylines.test.ts:88](../../src/rules/leylines.test.ts#L88): under advance "first", moves on when the next area's quest is done
- [src/rules/leylines.test.ts:102](../../src/rules/leylines.test.ts#L102): starts at the treehouse's front at the start of a run
- [src/rules/leylines.test.ts:108](../../src/rules/leylines.test.ts#L108): stands north-west of the dancefloor (Ed, 2026-10-24; due north from 2026-10-05), its footprint gap metres outside the ring of speakers
- [src/rules/leylines.test.ts:117](../../src/rules/leylines.test.ts#L117): never crosses the dancefloor: on from where the boot's lap ends, round the speakers the same way (clockwise) till the objective lies out to the side, then off and round to it, smoothly, never across the boot's way down (Ed, 2026-10-06; 2026-10-29)
- [src/rules/leylines.test.ts:142](../../src/rules/leylines.test.ts#L142): leaves the ring in a sweep no tighter than the line's own radius, like every other turn (Ed, 2026-10-23)
- [src/rules/leypulse.test.ts:15](../../src/rules/leypulse.test.ts#L15): counts mm:ss from 0, whole seconds down, minutes running past 99
- [src/rules/leypulse.test.ts:28](../../src/rules/leypulse.test.ts#L28): runs from the start of play in a build without the party spell
- [src/rules/leypulse.test.ts:32](../../src/rules/leypulse.test.ts#L32): stays at 00:00 and prompts while waiting for the spell, then counts from the cast
- [src/rules/leypulse.test.ts:40](../../src/rules/leypulse.test.ts#L40): moves along a line by arc length
- [src/rules/leypulse.test.ts:48](../../src/rules/leypulse.test.ts#L48): runs from the last stone reached to the next at the pulse's speed (Ed, 2026-10-09: "Pure constant speed"), along the link as drawn
- [src/rules/leypulse.test.ts:66](../../src/rules/leypulse.test.ts#L66): hides while home boots up, then sets off from the link's start and fades in (Ed: "first appears when bootup finishes")
- [src/rules/leyroute.test.ts:15](../../src/rules/leyroute.test.ts#L15): counts crossing, touching and doubling back, not two links joined at their stone
- [src/rules/leyroute.test.ts:29](../../src/rules/leyroute.test.ts#L29): runs through every area once, home first, and the waves wake them in its order
- [src/rules/leyroute.test.ts:37](../../src/rules/leyroute.test.ts#L37): is the same for a seed every time
- [src/rules/leyroute.test.ts:55](../../src/rules/leyroute.test.ts#L55): plans quickly on every seed: the curves' untangling kept within its budget (the oak's seed 4 once took 25 s)
- [src/rules/leyroute.test.ts:70](../../src/rules/leyroute.test.ts#L70): (the rules themselves: too many, drawn ahead of the pulse, too close together)
- [src/rules/leyroute.test.ts:94](../../src/rules/leyroute.test.ts#L94): is the spiral before untangling and crossings (spiralOrder)
- [src/rules/orbit.test.ts:9](../../src/rules/orbit.test.ts#L9): drain at the same rate and delay, newest first, whichever kind
- [src/rules/orbit.test.ts:22](../../src/rules/orbit.test.ts#L22): squares with an affection set straight on it: its newest shed, or the rest 💌s
- [src/rules/partyDressing.test.ts:86](../../src/rules/partyDressing.test.ts#L86): partyObjects.exclude still leaves a piece out (Ed, v271: the LED cube's, empty since the cube was cut)
- [src/rules/partyDressing.test.ts:94](../../src/rules/partyDressing.test.ts#L94): the prop generator's party pieces (gen-*) only under partyObjects.generated, in place of the ones they replace
- [src/rules/partyGuests.test.ts:22](../../src/rules/partyGuests.test.ts#L22): finds each area's party places among its own decorations, inside the area
- [src/rules/partyGuests.test.ts:43](../../src/rules/partyGuests.test.ts#L43): keeps a dancing guest round its spot, inside its area
- [src/rules/partyGuests.test.ts:51](../../src/rules/partyGuests.test.ts#L51): stands guests behind a party place, the big ones further back
- [src/rules/partyGuests.test.ts:57](../../src/rules/partyGuests.test.ts#L57): gives each guest joining a place its own slot, apart from the others there
- [src/rules/partyOver.test.ts:23](../../src/rules/partyOver.test.ts#L23): starts when the dancefloor's ring of speakers is down, and not before
- [src/rules/partyOver.test.ts:33](../../src/rules/partyOver.test.ts#L33): ?partyover=1 (endParty) downs only home's speakers: a soundsystem still standing stays standing, switched off (Ed, 2026-10-10)
- [src/rules/partyOver.test.ts:47](../../src/rules/partyOver.test.ts#L47): eases in over partyOver.ease seconds
- [src/rules/partyOver.test.ts:60](../../src/rules/partyOver.test.ts#L60): stops the waves for good
- [src/rules/partyOver.test.ts:70](../../src/rules/partyOver.test.ts#L70): puts everyone to sleep: her leashed ones where they stand, the far ones (and the ones that ran off) at home, the near ones after walking home
- [src/rules/partyOver.test.ts:114](../../src/rules/partyOver.test.ts#L114): a creature napping when the party ends stays asleep for good, even with her landing in its area
- [src/rules/partyOver.test.ts:126](../../src/rules/partyOver.test.ts#L126): legends sleep too, and nobody fights, attacks her or takes 💌s
- [src/rules/partyWitches.gaze.test.ts:19](../../src/rules/partyWitches.gaze.test.ts#L19): her soundsystem ruined, she stays and lies down to stargaze out past the speakers' ring; the others party on
- [src/rules/partyWitches.gaze.test.ts:37](../../src/rules/partyWitches.gaze.test.ts#L37): they lie in pairs and threes, side by side, the newest bed filled before another is begun
- [src/rules/partyWitches.gaze.test.ts:59](../../src/rules/partyWitches.gaze.test.ts#L59): at the end of the night everyone lies looking up, and nobody more flies in
- [src/rules/partyWitches.gaze.test.ts:69](../../src/rules/partyWitches.gaze.test.ts#L69): out of sight they're simply lying in their places
- [src/rules/partyWitches.gaze.test.ts:77](../../src/rules/partyWitches.gaze.test.ts#L77): keeping still by one, she gets up and they take the beach's turns; moving off, she lies back down in her place
- [src/rules/partyWitches.test.ts:14](../../src/rules/partyWitches.test.ts#L14): one flies in for each playing soundsystem, however many (Ed, 2026-10-06), and lands round the floor
- [src/rules/partyWitches.test.ts:59](../../src/rules/partyWitches.test.ts#L59): the player idles into the party after idleAfter seconds still on foot by the floor, and any input stops it
- [src/rules/partyWitches.test.ts:97](../../src/rules/partyWitches.test.ts#L97): keeps clear of what stands round the floor
- [src/rules/partyWitches.test.ts:131](../../src/rules/partyWitches.test.ts#L131): is left alone while no player is near enough to see it, and lively again at once when one comes back
- [src/rules/partyspell.test.ts:18](../../src/rules/partyspell.test.ts#L18): holds everything until it's cast: she doesn't move or rise, the clock and the boot don't run
- [src/rules/partyspell.test.ts:30](../../src/rules/partyspell.test.ts#L30): is cast even when pressed on a frame too short for a step (Ed's v3668: the start's first frame, under a step, dropped it)
- [src/rules/partyspell.test.ts:39](../../src/rules/partyspell.test.ts#L39): starts the clock and the boot when pressed, and lets her move once the cast and her routine are done
- [src/rules/partyspell.test.ts:71](../../src/rules/partyspell.test.ts#L71): is cast by her spell key too, which then isn't the boost
- [src/rules/partyspell.test.ts:79](../../src/rules/partyspell.test.ts#L79): leaves a game without it (the tools, the tests) as before: she moves at once
- [src/rules/pickup.test.ts:42](../../src/rules/pickup.test.ts#L42): full ring: happy, its rune south of it; E within reach leashes it at the bottom of her stack, as a pick-up
- [src/rules/pickup.test.ts:98](../../src/rules/pickup.test.ts#L98): 💌s no longer fill a second meter: a happy creature isn't invitable
- [src/rules/pickup.test.ts:113](../../src/rules/pickup.test.ts#L113): picks up her hat first, then a placed sigil of hers, then the nearest happy creature's rune
- [src/rules/pickup.test.ts:138](../../src/rules/pickup.test.ts#L138): happy legends and babies carry no personal rune (Ed, 2026-10-31)
- [src/rules/pickup.test.ts:151](../../src/rules/pickup.test.ts#L151): pickupDelay holds the rune back for that long after the hearts
- [src/rules/placement.test.ts:14](../../src/rules/placement.test.ts#L14): `no set piece's, decoration's, relic's or ground's footprint touches a soundsystem, the dancefloor, the treehouse or a set piece (seed ${seed})`
- [src/rules/placement.test.ts:52](../../src/rules/placement.test.ts#L52): soundsystems stand in their own area, and trees keep clear of them
- [src/rules/pulseSpeed.test.ts:26](../../src/rules/pulseSpeed.test.ts#L26): is 1 m/s (Ed, 2026-10-18), and the boot runs its 195 m path at its own 4 m/s: about 49 s, whatever the waves' speed
- [src/rules/pulseSpeed.test.ts:37](../../src/rules/pulseSpeed.test.ts#L37): runs pulseSpeed metres a second along the route at the base tempo, and pulseSpeed times the tempo's rate after a knockdown's BPM
- [src/rules/pulseSpeed.test.ts:48](../../src/rules/pulseSpeed.test.ts#L48): lands each wave as the pulse reaches its stone: the gap its link's length over the speed
- [src/rules/pulseSpeed.test.ts:58](../../src/rules/pulseSpeed.test.ts#L58): set to 0 on the pause page mid-night, holds the pulse where it is (no waves, nothing NaN), and moves on when set again
- [src/rules/rainbow.test.ts:16](../../src/rules/rainbow.test.ts#L16): sets off from the early-cleared soundsystem's own stone, and only from an early clear
- [src/rules/rainbow.test.ts:31](../../src/rules/rainbow.test.ts#L31): twice as fast as before, three times as long
- [src/rules/rainbow.test.ts:37](../../src/rules/rainbow.test.ts#L37): runs both ways: on to the route's end, and back till it meets the spark
- [src/rules/rainbow.test.ts:54](../../src/rules/rainbow.test.ts#L54): follows the route's own line, and keeps at most max at once
- [src/rules/relics.test.ts:19](../../src/rules/relics.test.ts#L19): one of each kind, one just inside the home area's edge, the rest out in the map, every pair minGap apart
- [src/rules/relics.test.ts:50](../../src/rules/relics.test.ts#L50): are drunk by standing on their sigil and pressing the button (Ed, 2026-10-18): every animal following her an adult at once; not from beside the flask itself, and nothing with no one to grow
- [src/rules/relics.test.ts:74](../../src/rules/relics.test.ts#L74): one per relics.perAreas areas on the islands (Ed, 2026-10-11): 1 on 10, 2 on 20, 5 on 50, 6 on 64, no kind twice
- [src/rules/relics.test.ts:83](../../src/rules/relics.test.ts#L83): has twelve kinds: the six bottles and their mirror images (Ed, 2026-10-11)
- [src/rules/relics.test.ts:89](../../src/rules/relics.test.ts#L89): come in every bottle, mirrored or not, in every colour (Ed, 2026-10-11): 72 kinds, 36 looks; a bottle in its own glass written bare
- [src/rules/relics.test.ts:102](../../src/rules/relics.test.ts#L102): lists the colours in the bottles' order, each its own bottle's glass (art/partyRelics.js)
- [src/rules/relics.test.ts:108](../../src/rules/relics.test.ts#L108): never lays a bottle and its mirror image in the same colour on one map (Ed, 2026-10-11), on 30 seeds of each size
- [src/rules/relics.test.ts:117](../../src/rules/relics.test.ts#L117): are the same for the same seed
- [src/rules/rules.test.ts:614](../../src/rules/rules.test.ts#L614): starts with only home partified
- [src/rules/rules.test.ts:662](../../src/rules/rules.test.ts#L662): waits for her to get up from the decks: the first speaker about 3 s after her first step, the boot at its own speed (Ed, 2026-10-09; 2026-10-18)
- [src/rules/rules.test.ts:673](../../src/rules/rules.test.ts#L673): forecasts two waves ahead, confirmed (Ed, 2026-10-04)
- [src/rules/rules.test.ts:685](../../src/rules/rules.test.ts#L685): numbers every dormant area by the wave that will wake it, as the waves then do (Ed, 2026-10-04: numbers over the stones)
- [src/rules/rules.test.ts:697](../../src/rules/rules.test.ts#L697): wakes one area per witch each wave (Ed, 2026-10-04): areasPerWave, all different, forecast as sets, and it can change between waves
- [src/rules/rules.test.ts:717](../../src/rules/rules.test.ts#L717): comes in waves as the pulse reaches each stone at its speed (Ed, 2026-10-09: "Pure constant speed"), and pauses
- [src/rules/rules.test.ts:727](../../src/rules/rules.test.ts#L727): is the same from the same seed, and gives each new area one soundsystem in its own ground
- [src/rules/rules.test.ts:817](../../src/rules/rules.test.ts#L817): invites after talking for the creature's talk time (young 6 s, adults 12 s), not before: happy first, then (asked again) leashed (#87)
- [src/rules/rules.test.ts:833](../../src/rules/rules.test.ts#L833): talks by herself, no button (Ed, v244); rising cancels it, and she never invites from the treetops
- [src/rules/rules.test.ts:851](../../src/rules/rules.test.ts#L851): lets a chat drain at half the fill rate when she stops, and picks up from what's left
- [src/rules/rules.test.ts:874](../../src/rules/rules.test.ts#L874): can't invite legends
- [src/rules/rules.test.ts:894](../../src/rules/rules.test.ts#L894): with auto-talk off she talks only while Talk is held (Ed's playtest, 2026-10-04)
- [src/rules/rules.test.ts:905](../../src/rules/rules.test.ts#L905): sticks with the creature she's talking to while it stays within cancelDistance, and drops it beyond
- [src/rules/rules.test.ts:921](../../src/rules/rules.test.ts#L921): stacks last in, first out: places the newest, picks up back onto the bottom (put down freely: leash.hex off)
- [src/rules/rules.test.ts:961](../../src/rules/rules.test.ts#L961): is elastic: a creature walks to its new leash point, never jumps, then stays within the leash
- [src/rules/rules.test.ts:979](../../src/rules/rules.test.ts#L979): goes through the game: the debug invite and the sigil button in its controls
- [src/rules/rules.test.ts:1319](../../src/rules/rules.test.ts#L1319): stand count of them evenly round the floor at radiusFactor times its radius, from start degrees
- [src/rules/rules.test.ts:1328](../../src/rules/rules.test.ts#L1328): are gameplay: reserved, with no trees, bushes or scenery on their feet
- [src/rules/rules.test.ts:1337](../../src/rules/rules.test.ts#L1337): keep the treehouse outside their ring and the floor's clearing, over seeds
- [src/rules/rules.test.ts:1348](../../src/rules/rules.test.ts#L1348): are the dancefloor's only sound: no soundsystem stands in their ring or the floor's clearing, over seeds (Ed, v183)
- [src/rules/rules.test.ts:1359](../../src/rules/rules.test.ts#L1359): give the treehouse a clearing at least as wide as the art's footprint (v2: a tall tower in a giant tree)
- [src/rules/rules.test.ts:1364](../../src/rules/rules.test.ts#L1364): cycle playing, damaged, destroyed on the debug key
- [src/rules/rules.test.ts:1376](../../src/rules/rules.test.ts#L1376): turn into speakers one by one as the boot reaches them, each over boot.transform, all of them by its end
- [src/rules/rules.test.ts:1394](../../src/rules/rules.test.ts#L1394): can be booted by the pulse: bootSpeaker turns one now, once
- [src/rules/rules.test.ts:1594](../../src/rules/rules.test.ts#L1594): in the air sends the bottom sigil of the stack to the top, and never places or lifts
- [src/rules/rules.test.ts:1606](../../src/rules/rules.test.ts#L1606): on the ground never cycles: it puts the bottom sigil down
- [src/rules/rules.test.ts:1642](../../src/rules/rules.test.ts#L1642): stand on every area the party hasn't reached, at its soundsystem's spot; awake exactly where the next wave will spread
- [src/rules/rules.test.ts:1653](../../src/rules/rules.test.ts#L1653): replace the random rune stones (campfires stay)
- [src/rules/runeOffset.test.ts:16](../../src/rules/runeOffset.test.ts#L16): for every species and level, its backing's top edge is clear of the body by runeGap, a happy rune's and a placed sigil's
- [src/rules/runeOffset.test.ts:26](../../src/rules/runeOffset.test.ts#L26): is further off the bigger the animal: a dormouse's rune nearer than a bear's, a legend's furthest
- [src/rules/runeOffset.test.ts:34](../../src/rules/runeOffset.test.ts#L34): runeNear finds each happy creature's rune at its own offset south of it
- [src/rules/runestones.test.ts:8](../../src/rules/runestones.test.ts#L8): matches the art's number of forms
- [src/rules/runestones.test.ts:9](../../src/rules/runestones.test.ts#L9): on a 10-area map, no form repeats
- [src/rules/runestones.test.ts:15](../../src/rules/runestones.test.ts#L15): on a 50-area map, each form appears 2 or 3 times
- [src/rules/sigilAvoid.test.ts:71](../../src/rules/sigilAvoid.test.ts#L71): gathers her placed sigils, her hats lying down, the relics' sigils and happy creatures' runes (never one's own)
- [src/rules/sigilRuns.test.ts:41](../../src/rules/sigilRuns.test.ts#L41): holding Use at every morning dressing station and the booth never drops her hat
- [src/rules/sigilRuns.test.ts:56](../../src/rules/sigilRuns.test.ts#L56): a press puts one down; moving into each empty hex while holding puts down the next; letting go ends it
- [src/rules/sigilRuns.test.ts:85](../../src/rules/sigilRuns.test.ts#L85): the pad's one button (sigil) runs too
- [src/rules/sigilRuns.test.ts:99](../../src/rules/sigilRuns.test.ts#L99): a press that picks up starts a run: every placed sigil she runs over comes up while she holds
- [src/rules/sigilRuns.test.ts:122](../../src/rules/sigilRuns.test.ts#L122): a press that did nothing starts no run, and holding E with nothing to do still puts her hat down
- [src/rules/sigilRuns.test.ts:131](../../src/rules/sigilRuns.test.ts#L131): with leash.runs off a press does one thing and holding does nothing more
- [src/rules/sigilRuns.test.ts:141](../../src/rules/sigilRuns.test.ts#L141): puts her hat down at her feet at once; pressed on it again, she picks it up
- [src/rules/sigilRuns.test.ts:152](../../src/rules/sigilRuns.test.ts#L152): square held on (sigilHeld without hatHold) never drops the hat; E held (hatHold) does
- [src/rules/sigilRuns.test.ts:160](../../src/rules/sigilRuns.test.ts#L160): a hat press in the treetops does nothing
- [src/rules/stackCycle.test.ts:27](../../src/rules/stackCycle.test.ts#L27): brings every sigil to the bottom in turn, the adult's too
- [src/rules/stackCycle.test.ts:32](../../src/rules/stackCycle.test.ts#L32): a sleeping legend's sigil she carries is drawn last and stays there (it never cycles): the log names it
- [src/rules/stackRelics.test.ts:21](../../src/rules/stackRelics.test.ts#L21): goes on at the bottom, a creature leashed after it goes under it, and it cycles with the rest
- [src/rules/stackRelics.test.ts:50](../../src/rules/stackRelics.test.ts#L50): cycles back too (the pad's L1, Ed's layout 2026-10-28): the top sigil to the bottom, undoing a cycle forward
- [src/rules/stackRelics.test.ts:63](../../src/rules/stackRelics.test.ts#L63): cycles back in play, on the cycle-back control
- [src/rules/stackRelics.test.ts:72](../../src/rules/stackRelics.test.ts#L72): a relic alone, or a creature alone, doesn't cycle; the two together do
- [src/rules/stackRelics.test.ts:105](../../src/rules/stackRelics.test.ts#L105): cycles with the stack (Q), the cycled event naming it a relic
- [src/rules/stoneStacks.test.ts:60](../../src/rules/stoneStacks.test.ts#L60): show only wild fighters until clear, then include eligible friends, legend and babies in stack order
- [src/rules/stoneStacks.test.ts:87](../../src/rules/stoneStacks.test.ts#L87): keep a befriended one's sigil in the stack, friend-coloured: no rune at its feet till its stone converts
- [src/rules/stoneStacks.test.ts:98](../../src/rules/stoneStacks.test.ts#L98): no longer clear by themselves: an area with all its wild gone stays wild till it's cast or its wave comes
- [src/rules/stoneStacks.test.ts:114](../../src/rules/stoneStacks.test.ts#L114): an unready stump reserves Use for a second witch at her own position
- [src/rules/stoneStacks.test.ts:125](../../src/rules/stoneStacks.test.ts#L125): holding Use at a hostile, unready stump never puts her hat down, including an idle hold begun elsewhere
- [src/rules/stoneStacks.test.ts:137](../../src/rules/stoneStacks.test.ts#L137): held at the stone for cast.time converts it: a soundsystem, its babies friends, every friend sigil scattered loose round it
- [src/rules/stoneStacks.test.ts:166](../../src/rules/stoneStacks.test.ts#L166): can't be cast till every wild youth and adult of its area is invited (Ed, 2026-10-29); its babies and its sleeping legend don't count
- [src/rules/stoneStacks.test.ts:185](../../src/rules/stoneStacks.test.ts#L185): casts only standing on the spell spot (Ed's playtest, 2026-10-29: "I should have to stand on the soundsystem spell sigil"), not just north of it by the stone
- [src/rules/stoneStacks.test.ts:198](../../src/rules/stoneStacks.test.ts#L198): casts from the middle of a great stump's cut, not south of it (Ed, 2026-10-29: "the spell and the audio circle effect can be on top of the stump")
- [src/rules/stoneStacks.test.ts:228](../../src/rules/stoneStacks.test.ts#L228): drains while she's away, and resumes from where it has drained to
- [src/rules/stoneStacks.test.ts:242](../../src/rules/stoneStacks.test.ts#L242): stops at a hit, and won't go on till she lets go and holds again
- [src/rules/stoneStacks.test.ts:258](../../src/rules/stoneStacks.test.ts#L258): at the stone, the sigil button casts rather than putting a sigil down or the hat
- [src/rules/stoneStacks.test.ts:272](../../src/rules/stoneStacks.test.ts#L272): scatters its friend sigils, sets its wild young and adults on it, and keeps loose sigils loose when it falls
- [src/rules/stoneStacks.test.ts:293](../../src/rules/stoneStacks.test.ts#L293): in a friendly area turns every creature friendly and starts no siege
- [src/rules/stoneStacks.test.ts:317](../../src/rules/stoneStacks.test.ts#L317): by the spell
- [src/rules/stoneStacks.test.ts:329](../../src/rules/stoneStacks.test.ts#L329): by its wave
- [src/rules/stoneStacks.test.ts:343](../../src/rules/stoneStacks.test.ts#L343): on the islands (legend areas), each area's legend appears once its fighters are friendly, and scatters at conversion
- [src/rules/stoneStacks.test.ts:365](../../src/rules/stoneStacks.test.ts#L365): are picked up like any sigil, leashing the creature; a legend's tethers her at the distance it lay, till she puts it down
- [src/rules/waveLoss.test.ts:32](../../src/rules/waveLoss.test.ts#L32): the tuning has no loss penalty
- [src/rules/waveLoss.test.ts:34](../../src/rules/waveLoss.test.ts#L34): a loss leaves the countdown, the tempo and the knockdown bonus as they were; the wave comes on time
- [src/rules/waveLoss.test.ts:48](../../src/rules/waveLoss.test.ts#L48): two losses close together: still nothing
- [src/rules/waveLoss.test.ts:56](../../src/rules/waveLoss.test.ts#L56): a woken area's soundsystem lost ends its party and leaves the countdown be
- [src/rules/waveLoss.test.ts:71](../../src/rules/waveLoss.test.ts#L71): 5 BPM each, with no cap

## invites-party: ruling review

- Ley-line supersession: old 4/5Oct header advances on wave or quest ‘whichever comes first’; the 8Oct ruling says ‘The pulse should never skip, it always travels along the route at the bpm speed’. leylines:41/88 explicitly opt into advance=first; :54 tests current default; leyPulseAudit:111 tests both. They are compatibility paths. The audit header saying Ed has not ruled is stale prose, not old behavior.
- Witch-count supersession: DESIGN481 drops ‘one new area per witch’ on24Oct. leyPulseAudit:198’s two-witches title actually sets areasPerWave=2 in a SINGLE-witch game. Keep the explicit option’s timing check, but do not claim it proves multiplayer policy;1609 retains that design.
- Party guest distinction: an older stopped-soundsystem case flies away;11Oct destroyed-soundsystem design retains the witch stargazing in pairs/threes. partyWitches.gaze:19 checks both ruined and merely stopped; the implementation branches on ruined. No obsolete fly-away assertion was established.
- 29Oct set-piece removal applies to normal generation; partyDressing:43 does not require any set piece to spawn, and :71 requires removed pieces absent. The title alone is not deletion evidence.
- Baby invites changed31Oct. hexSigils:61 starts with already-carried babies; invites:114 uses a level1 stand-in and counting Affection. Neither asserts real baby invitation. Old partyspell prompt prose tests rules input and tool-game compatibility, not a restored start-screen UI.
- Second review 6566767328: current cast/grid/route/letters rules do not obsolete explicitly enabled comparison modes. Older carried-flask states test generic stack integration, not live flask pickup. Old wave-per-witch wording tests supplied areasPerWave. No obsolete whole test established. The old roughly-three-second boot prose versus 8–9.5-second assertion remains unresolved after the 24 October north-west treehouse geometry; IP2 flags it without choosing gameplay timing.
- Eleven cases in clear.test.ts:46,55,64,72,82,93,106,115 and homeSpeakers.test.ts:27,36,64 are combat-owner-only. Bodies were read for routing; the live combat plan does not enumerate all eleven individually. No audit keep/delete approval or claim that every individual disposition is already decided.

## music-audio: review provenance

Setup and assertions reviewed in the named score, cue, audio-engine and music-tool files. Telephone authority remains with #1609. No listening or browser run is claimed.

<a id="m1"></a>

## M1: Audio safety, scheduling and sample integrity

hard limits; 41 tests; files take ~2 s.

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

current rules; 88 tests; files take ~166 s.

The planner receives synthetic wave clocks; the score receives explicit seeds and styles. Assertions directly implement the 9 Oct ABAC structure, 11 Oct nightly set and 14 Oct alto/stepwise redesign. A 30-minute planner loop is not a played night. The 120 BPM test supplies its own style-based beat tuning; it does not prohibit choosing a different record. Wide instrument phrases, retained soprano fallback and alternate lab arpeggios are explicit comparison modes, not stale default singer claims. Additional beat/DJ/knockdown tests use specified clocks and tuning, including explicit bpmStep1/cap5 comparison parameters. Their real wave integration checks the derived tempo/countdown ratio, not an emergent win target. Beat inverse/continuity and DJ stroke order remain direct contracts. Two monolithic music tests explicitly set position/time/speaker damage and call musicMix; they do not simulate sampled sound success.

- [src/rules/beat.test.ts:8](../../src/rules/beat.test.ts#L8): runs at its tempo, and turns beats back into times
- [src/rules/beat.test.ts:15](../../src/rules/beat.test.ts#L15): eases to a new tempo without a skip: the beat is continuous and only ever goes forward
- [src/rules/beat.test.ts:35](../../src/rules/beat.test.ts#L35): can change course mid-ramp and stay continuous
- [src/rules/beat.test.ts:47](../../src/rules/beat.test.ts#L47): brings each wave's tempo in from the block line its music lands on, over rampBars
- [src/rules/beat.test.ts:60](../../src/rules/beat.test.ts#L60): lands a wave a moment after a line on that line, like the music
- [src/rules/beat.test.ts:65](../../src/rules/beat.test.ts#L65): moves on by a stall's lost time: from then the beat is the music's, before it as it was, mid-ramp or not
- [src/rules/beat.test.ts:90](../../src/rules/beat.test.ts#L90): sets the tempo to the record's at once and shifts the whole arc by the difference, beat-time's base unchanged
- [src/rules/beat.test.ts:100](../../src/rules/beat.test.ts#L100): at 120 (the arc's own start) changes nothing
- [src/rules/creatureVoices.test.ts:8](../../src/rules/creatureVoices.test.ts#L8): gives every creature in the game a call family that exists
- [src/rules/creatureVoices.test.ts:15](../../src/rules/creatureVoices.test.ts#L15): names only real families, and keeps its numbers sane
- [src/rules/djSet.test.ts:11](../../src/rules/djSet.test.ts#L11): starts on the first whole beat after the cast's burst, only while she's at the decks
- [src/rules/djSet.test.ts:19](../../src/rules/djSet.test.ts#L19): runs its 13 beats through the needle, the scratches, the chirps, the spin and the hype
- [src/rules/djSet.test.ts:25](../../src/rules/djSet.test.ts#L25): names only gestures the art draws, in order, inside its length
- [src/rules/djSet.test.ts:32](../../src/rules/djSet.test.ts#L32): gives the sound its strokes, in the window asked, as the table says
- [src/rules/djSet.test.ts:41](../../src/rules/djSet.test.ts#L41): fills a respawn wait: the needle on the new record as she's back, then her seeded scratching into the downbeat (Ed, 2026-10-09)
- [src/rules/djSet.test.ts:59](../../src/rules/djSet.test.ts#L59): makes its routine from the new music seed: the same for a seed, different between seeds, inside its beats
- [src/rules/djSet.test.ts:76](../../src/rules/djSet.test.ts#L76): reads the knockout's times on her own clock
- [src/rules/djSet.test.ts:81](../../src/rules/djSet.test.ts#L81): holds her at the decks from the party spell to the routine's end, when the first music drops
- [src/rules/knockdownTempo.test.ts:14](../../src/rules/knockdownTempo.test.ts#L14): N knockdowns add N BPM, eased in from the next beat without a skip; it never goes down
- [src/rules/knockdownTempo.test.ts:25](../../src/rules/knockdownTempo.test.ts#L25): stops at knockout.bpmCap, and adds nothing with no bpmStep
- [src/rules/knockdownTempo.test.ts:34](../../src/rules/knockdownTempo.test.ts#L34): a real knockdown adds its BPM
- [src/rules/knockdownTempo.test.ts:42](../../src/rules/knockdownTempo.test.ts#L42): the next wave comes sooner, by the tempo's ratio, from the knockdowns on
- [src/rules/knockdownTempo.test.ts:72](../../src/rules/knockdownTempo.test.ts#L72): a 200 bpm record runs the pulse and the countdown twice as fast as a 100 bpm one
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
- [src/rules/rules.test.ts:1538](../../src/rules/rules.test.ts#L1538): is full and clear by the playing dancefloor, quiet and muffled in the deep forest
- [src/rules/rules.test.ts:1548](../../src/rules/rules.test.ts#L1548): grows as the home speakers boot up, and is distorted by damage close by

<a id="m3"></a>

## M3: Cue boundaries, potion routing and music-tool data

current rules; 37 tests; files take ~14 s.

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

outcome stats; 3 tests; files take ~17 s.

Sea-life tests sample seeded timetables for 60/600 seconds and require at least three splashes or one groan. Melody pace samples 60 seeds × ABC, requiring <3.5 notes/bar, >1 whole note/phrase and >15% triplets. These quantify an intended feel; they do not establish no-NaN, ownership or exactly-once event delivery. Opposite-coast absence assertions in the mixed sea-life cases must first be retained as small range tests.

- [src/platform/audio/seaLife.cues.test.ts:24](../../src/platform/audio/seaLife.cues.test.ts#L24): by the east coast, the dolphins' splashes, now and then
- [src/platform/audio/seaLife.cues.test.ts:29](../../src/platform/audio/seaLife.cues.test.ts#L29): by the west coast, the kraken's groan and the water pouring off it, rarely
- [src/rules/musicForm.test.ts:172](../../src/rules/musicForm.test.ts#L172): is mostly slow, with whole notes and triplets often, and some busier bars

<a id="m5"></a>

## M5: Outdated cheer-test descriptions

leftovers; 2 tests; files take ~1 s.

The suite still says +1 BPM (7 Oct), and a case name says after trumpet and rewind. The 9 Oct design instead adds 5 BPM and removes the rewind at the cut. Neither case asserts +1 or requires a rewind: one calls knockdownTempo with current tuning; the other supplies a synthetic return clock. This is stale explanation, not obsolete behavior or deletion authority.

- [src/platform/audio/tempoUp.cues.test.ts:11](../../src/platform/audio/tempoUp.cues.test.ts#L11): with no knockout under way, cheers once, on the bar line the tempo starts rising from
- [src/platform/audio/tempoUp.cues.test.ts:25](../../src/platform/audio/tempoUp.cues.test.ts#L25): knocked down, cheers once as she's back at her decks (after the trumpet and the rewind), on her clock

## music-audio: ruling review

- M5 old: tempoUp.cues.test.ts suite cites Ed, 2026-10-07, ‘+1 BPM’, and the second test names ‘the trumpet and the rewind’. Replacement: Ed, 2026-10-09, docs/notes/music.md Beat clock: ‘it stays at 120 unless you are knocked down, in which case it gains 5 bpm’; Form: ‘the rewind at the cut is gone’. The assertions already test current event timing; only their description is proposed for rewrite.
- M2 old singer: docs/notes/music.md records the 11 Oct choice ‘e Recorded + ethereal will do for now’. Replacement: 14 Oct singer redesign specifies alto, narrow stepwise phrases and two effect chains. musicForm.test.ts asserts MIDI55–67, limited leaps, voice only in builds/breakdowns, and pure-chain chorus/octave/shimmer zero. No old high-soprano default is pinned by this reviewed group; the old soprano is explicitly fallback/comparison data.
- M4 current intent: Ed, 2026-10-09, musicForm.test.ts: ‘keep the melodies relatively slow, but not always. Use whole notes and triplets quite often’. The numeric 3.5/15% thresholds are implementation interpretations of that intent, not quoted numeric rulings. Sea-life header cites Ed, 2026-10-07, dolphins east/kraken west, but the ≥3/≥1 sampled counts are not quoted frequency decisions. No newer cancellation of these effects is claimed.
- M2 tempo scope: records were extended on 29 Oct to 100–200 BPM, with 100/120 starters (recordSave.test.ts). musicForm's 120-BPM case builds t.beat from style.bpm explicitly; it checks wave changes do not choose tempo. docs/notes/music.md 11 Oct: ‘tempo is set by the gameplay’. This does not contradict selectable records.

## tools-ci: review provenance

Two read-only tools reviews integrated:226 original tests plus 77 additional tests (reports 6565979619/6565996723/6566258844), plus six added synthetic inventory checks and eleven house-measurement tests reviewed separately. Standalone/plugin execution scope is labeled separately; no test run supplied semantic evidence.

<a id="t1"></a>

## T1: CI coverage, publication and proof guards

current rules; 71 tests; known files take <1 s; 3 files have unknown timing.

Parsed workflow YAML, tiny Git/command fixtures and stubbed pixels check fail-closed coverage, publication restrictions and current scheduling policy. world-audit parses strings; effects-scene tests a synthetic nonblank detector. Four shards and 8px/32 are current operational rules rather than timeless invariants. No generated outcome target is run.

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

hard limits; 80 tests; files take ~3 s.

Supplied traces, fake clocks/workers/GL and shader source tokens test honest telemetry, comparison boundaries and performance budgets. The 30000 upload calls and 256 masks are synthetic coverage, not game populations. Intentional shader changes may require a separately reviewed baseline; no replacing ruling was established. House reviewer verified eleven synthetic CPU attribution/quantile/missing-data, held-clock, draw/finish, PNG-drift and census-reconciliation tests; these are measurement integrity, not generated-house outcomes.

- [src/app/houseCpuFunctions.test.ts:3](../../src/app/houseCpuFunctions.test.ts#L3): clips sample weights to the actual frame window and keeps parent/child totals separate
- [src/app/houseCpuFunctions.test.ts:10](../../src/app/houseCpuFunctions.test.ts#L10): does not double-count a recursive parent and keeps small negative sample deltas from adding time
- [src/app/houseProfile.test.ts:7](../../src/app/houseProfile.test.ts#L7): keeps ordinary recording enabled and confines the comparison bypass to recording=0
- [src/app/houseProfile.test.ts:11](../../src/app/houseProfile.test.ts#L11): uses the smoke route's corridor directions and actual house rotation
- [src/app/houseProfile.test.ts:19](../../src/app/houseProfile.test.ts#L19): merges nested GC intervals on the anchored renderer thread without counting workers or double counting parents
- [src/app/houseProfile.test.ts:34](../../src/app/houseProfile.test.ts#L34): reports measured quantiles and five slowest phase splits, and rejects missing trace/timings instead of inventing zeros
- [src/app/houseProfile.test.ts:50](../../src/app/houseProfile.test.ts#L50): profiles the same controls/steps as smoke and restores the timing hook and manual state
- [src/app/houseShotSession.test.ts:8](../../src/app/houseShotSession.test.ts#L8): holds visual time without freezing the diagnostic clock
- [src/app/houseShotSession.test.ts:19](../../src/app/houseShotSession.test.ts#L19): completes every full draw before the next frame and retains controls/dt
- [src/app/houseShotSession.test.ts:31](../../src/app/houseShotSession.test.ts#L31): rejects drifting held captures instead of accepting a pixel comparison
- [src/app/houseShotSession.test.ts:37](../../src/app/houseShotSession.test.ts#L37): distinguishes real submitted geometry from zero-call visits and reconciles totals
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

hard limits; 4 tests; files take ~16 s.

These do step generated games (240/600-step paths plus short wave advances). Assertions compare matched state, semantic fingerprint sensitivity and reset behavior rather than wins, survival or kills. The historical15.605 file seconds remain integrity work, not a savings proposal.

- [tools/bench/fingerprint.test.ts:18](../../tools/bench/fingerprint.test.ts#L18): is the same for a knob added, a note edited, or the groups reordered: the tuning file is an input, not the state
- [tools/bench/fingerprint.test.ts:24](../../tools/bench/fingerprint.test.ts#L24): still changes when a knob the game uses changes what happens
- [tools/bench/twoNights.test.ts:28](../../tools/bench/twoNights.test.ts#L28): the second night is the night played fresh
- [tools/bench/twoNights.test.ts:38](../../tools/bench/twoNights.test.ts#L38): a new game puts the fight's settings back as a page starts them (the last night's are read before its first fight)

<a id="t4"></a>

## T4: Research, architecture and generated data

current rules; 93 tests; known files take ~4 s; 12 files have unknown timing.

Most inputs are fabricated rows/configs. Screen tests validate frozen experiment controls and gate text, not whether a bot wins. Toy ask/tell scores protect resumability. Tiny real expert-contract cases assert provenance, replay equality and honest unsupported results. The inventory classifier tests pass strings like advance(world); they never advance a world. Newly added synthetic inventory cases have been reviewed by the integrator. Second review6566258844 adds20 schema/architecture/reference contracts and 11 change-history/site-publication cases. Old import boundaries are parity inputs; the NEW schema graph excludes game/render/DOM. Knob-date checks validate metadata format, not every ruling’s design currentness. Changelog34 is a frozen archive sanity floor; Pages tests preserve selected source and latest live snapshot, not a game outcome.

- [src/changelog.test.ts:6](../../src/changelog.test.ts#L6): groups and sorts version gaps without assuming a consecutive workflow counter
- [src/changelog.test.ts:10](../../src/changelog.test.ts#L10): collects the archive and the fragments, the current build's first, then newest version first
- [src/changelog.test.ts:18](../../src/changelog.test.ts#L18): merges fragments with the same version into one entry, the newest file's items first, and keeps the archive's as they were
- [src/changelog.test.ts:33](../../src/changelog.test.ts#L33): has only well-formed files: the archive, and fragments named <yyyy-mm-dd>-<slug>.json with a version (null or a build number) and their bullets
- [src/changelog.test.ts:46](../../src/changelog.test.ts#L46): groups each version's fragments as changes, titled by the fragment (or its name), dated by its name, newest first
- [src/changelog.test.ts:58](../../src/changelog.test.ts#L58): covers the same versions as the flat changelog
- [src/linkSwitches.test.ts:12](../../src/linkSwitches.test.ts#L12): finds the reads it should (the scan itself)
- [src/linkSwitches.test.ts:18](../../src/linkSwitches.test.ts#L18): registers every switch the code reads, and reads every one it registers, each where it says
- [src/linkSwitches.test.ts:22](../../src/linkSwitches.test.ts#L22): gives each a plain sentence, its values, a group and a date, once
- [src/linkSwitches.test.ts:33](../../src/linkSwitches.test.ts#L33): writes docs/LINK-SWITCHES.md from it (node tools/config/linkSwitches.mjs)
- [src/makingOf.test.ts:7](../../src/makingOf.test.ts#L7): builds and passes its own checks
- [src/pagesWorkflow.test.ts:10](../../src/pagesWorkflow.test.ts#L10): checks Ed's selected source before requesting any protected deployment
- [src/pagesWorkflow.test.ts:20](../../src/pagesWorkflow.test.ts#L20): keeps preview debounce outside the publisher lock and live requests off the debounce path
- [src/pagesWorkflow.test.ts:30](../../src/pagesWorkflow.test.ts#L30): always packages the latest complete site rather than an old queued event snapshot
- [src/pagesWorkflow.test.ts:36](../../src/pagesWorkflow.test.ts#L36): uses default-branch dispatch and retains independent closed-PR cleanup
- [src/rules/configDataBoundary.test.ts:13](../../src/rules/configDataBoundary.test.ts#L13): preserves the legacy literal/export and identical default combat data and level strengths
- [src/rules/configDataBoundary.test.ts:37](../../src/rules/configDataBoundary.test.ts#L37): keeps the schema data runtime graph independent of creatures, wildWatch and game
- [src/rules/configs.test.ts:17](../../src/rules/configs.test.ts#L17): `holds ${c.file}`
- [src/rules/configs.test.ts:23](../../src/rules/configs.test.ts#L23): combat.json: levels and species name real attacks; every species is real
- [src/rules/configs.test.ts:32](../../src/rules/configs.test.ts#L32): movement.json: profiles and bodies are real species, legends' moves real attacks
- [src/rules/configs.test.ts:39](../../src/rules/configs.test.ts#L39): area-types.json: every type is a real area type
- [src/rules/knobDocs.test.ts:17](../../src/rules/knobDocs.test.ts#L17): has an entry for every top-level knob, and every entry (and the knobs it names as also or see) is a knob
- [src/rules/knobDocs.test.ts:21](../../src/rules/knobDocs.test.ts#L21): catches a knob with no entry, an entry for no knob and a note back in the tuning file
- [src/rules/knobDocs.test.ts:30](../../src/rules/knobDocs.test.ts#L30): gives every decision a date in the form 2026-10-28 or none, and something: who, when, a quote or words
- [src/rules/knobDocs.test.ts:39](../../src/rules/knobDocs.test.ts#L39): says what each knob does in one plain sentence (the rest in notes: the coordinator's hand pass, 2026-10-28)
- [src/rules/knobDocs.test.ts:48](../../src/rules/knobDocs.test.ts#L48): names only knobs that are there: a dotted path (beat.knockBeats) read from the entry's knob up
- [src/rules/knobDocs.test.ts:67](../../src/rules/knobDocs.test.ts#L67): keeps config/KNOBS.md and the schema's descriptions up to date (node tools/config/schema.mjs --docs)
- [src/rules/layer.test.ts:5](../../src/rules/layer.test.ts#L5): keeps every production rules module independent of drawing, UI, app, platform and DOM
- [src/rules/layer.test.ts:8](../../src/rules/layer.test.ts#L8): catches type-only and dynamic dependencies and actual DOM globals
- [src/rules/tuningSchema.test.ts:13](../../src/rules/tuningSchema.test.ts#L13): holds config/tuning.json: every knob known, of its type, in its range
- [src/rules/tuningSchema.test.ts:18](../../src/rules/tuningSchema.test.ts#L18): catches a new knob, a wrong type, an out-of-range number and a bad choice
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
- [tools/tests/inventory.test.mjs:75](../../tools/tests/inventory.test.mjs#L75): finds simple local registration wrappers without calling them

<a id="t5"></a>

## T5: Preview and visual-review tool integrity

current rules; 57 tests; known files take ~122 s; 6 files have unknown timing.

Throwaway Git fixtures, small typed arrays/depth bits, stubbed wrappers and glyph/genome records prove safe tooling and opted-in comparisons. Deterministic shape/ink constants are readability rules, not night outcomes. Art/creature owners should confirm a future acceptance-constant change. The 32 art-cache handoff tests parse ASTs/hash source/JSON/binary bytes and use fake command exits, not drawing. They require fail-closed dependency analysis, exact successful keys, initialization-order coverage and old-v1 exact-input compatibility. Copy-heavy real-source fixtures account for historical cost but are not outcome simulations.

- [src/artCheckAffected.test.ts:15](../../src/artCheckAffected.test.ts#L15): allows exact successful fingerprints on releases and pushes, retaining full fallback for unknown events
- [src/artCheckAffected.test.ts:23](../../src/artCheckAffected.test.ts#L23): derives every real registered task once without executing the check
- [src/artCheckAffected.test.ts:42](../../src/artCheckAffected.test.ts#L42): binds each fetched config file only to the task that reads it, and refuses unknown fetches
- [src/artCheckAffected.test.ts:62](../../src/artCheckAffected.test.ts#L62): re-keys only the tasks that fetch a changed config file
- [src/artCheckAffected.test.ts:67](../../src/artCheckAffected.test.ts#L67): re-keys one edited task (and the auxiliary unit), but every task for a shared helper or scaffolding edit
- [src/artCheckAffected.test.ts:78](../../src/artCheckAffected.test.ts#L78): keeps every result through planner and workflow edits that only choose what runs
- [src/artCheckAffected.test.ts:84](../../src/artCheckAffected.test.ts#L84): bridges exact v1 results once, never across a changed art input
- [src/artCheckAffected.test.ts:108](../../src/artCheckAffected.test.ts#L108): ignores npm script edits in package.json but keys every task on its dependencies
- [src/artCheckAffected.test.ts:116](../../src/artCheckAffected.test.ts#L116): accepts only an exact successful result and reruns misses, failures and corrupt entries
- [src/artCheckAffected.test.ts:125](../../src/artCheckAffected.test.ts#L125): isolates real creature-only edits using the production file-to-job analyzer
- [src/artCheckAffected.test.ts:150](../../src/artCheckAffected.test.ts#L150): groups affected sprite tasks, keeps auxiliary coverage, and caches only successful groups
- [src/artCheckScope.test.ts:7](../../src/artCheckScope.test.ts#L7): runs only the touched creatures' and areas' checks, without the lab pages
- [src/artCheckScope.test.ts:11](../../src/artCheckScope.test.ts#L11): runs the full check when shared art code, the lab, the style or the check itself changed
- [src/artCheckScope.test.ts:16](../../src/artCheckScope.test.ts#L16): skips when nothing of the art changed
- [src/artDependencies.test.ts:6](../../src/artDependencies.test.ts#L6): isolates roots, follows deep JSON and cycles, and exposes the reverse map
- [src/artDependencies.test.ts:19](../../src/artDependencies.test.ts#L19): skips mixed syntax containing only type bindings but follows runtime reexports
- [src/artDependencies.test.ts:23](../../src/artDependencies.test.ts#L23): declares virtual binary inputs and tracks additions through a fresh map
- [src/artDependencies.test.ts:29](../../src/artDependencies.test.ts#L29): fails closed for missing, undeclared, dynamic or escaping imports
- [src/artDependencies.test.ts:32](../../src/artDependencies.test.ts#L32): normalizes text line endings, preserves binary bytes and binds paths/schema
- [src/artHash.test.ts:20](../../src/artHash.test.ts#L20): changes with an edit to a nested art file, all the way down
- [src/artHash.test.ts:29](../../src/artHash.test.ts#L29): changes with the top level's and the extras' edits, not with art/out's exports or the tools
- [src/artHash.test.ts:36](../../src/artHash.test.ts#L36): reads the real art/'s subfolders
- [src/artJobFingerprints.test.ts:11](../../src/artJobFingerprints.test.ts#L11): derives all kinds and isolates inert creature functions while retaining shared sources
- [src/artJobFingerprints.test.ts:24](../../src/artJobFingerprints.test.ts#L24): retains initializer calls from unselected branches and transitive callees
- [src/artJobFingerprints.test.ts:35](../../src/artJobFingerprints.test.ts#L35): resolves namespace reexports and conservatively retains unknown guards
- [src/artJobFingerprints.test.ts:46](../../src/artJobFingerprints.test.ts#L46): does not mistake computed object member names for inert definitions
- [src/artJobFingerprints.test.ts:52](../../src/artJobFingerprints.test.ts#L52): does not broaden an inert metadata read to unrelated functions in that file
- [src/artJobFingerprints.test.ts:64](../../src/artJobFingerprints.test.ts#L64): binds initializer order and refuses shadowed built-in purity assumptions
- [src/artJobFingerprints.test.ts:74](../../src/artJobFingerprints.test.ts#L74): does not execute ordinary class methods at module load, but retains static effects
- [src/artJobFingerprints.test.ts:84](../../src/artJobFingerprints.test.ts#L84): normalizes JSON initialization inputs and conservative full-module parts
- [src/artJobFingerprints.test.ts:93](../../src/artJobFingerprints.test.ts#L93): binds declaration kind when a cyclic initializer catches the temporal dead zone
- [src/artJobFingerprints.test.ts:104](../../src/artJobFingerprints.test.ts#L104): isolates a real creature drawing-file edit from house and retains shared packing edits
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

hard limits; 1 test; file time unknown.

One declaration runs30/5 s real cases plus stun fixtures15/30 s. Repeated runs and phase accounting are hard integrity proofs; censored/stunned/hits>0/retaliation>0 predicates also validate the selected scenario. This is not a demonstrated pure outcome test to move wholesale. Exact purpose needs its report/combat owner.

- [tools/balance/report.test.mjs:36](../../tools/balance/report.test.mjs#L36): real-rules replay is deterministic across interleaved bots and bags

<a id="t7"></a>

## T7: Separate coordination-plugin contracts

current rules; 14 tests; file time unknown.

Fourteen contracts mock tool replies, clocks and session identity. They protect required status/option fields, atomic batches, version-pinned activity stamps and wake-thread identity. The plugin still has manifest/hooks, but live activation was not verified. These are OUTSIDE Witch Vitest includes, their timing is UNKNOWN, and no Witch CI saving is established. Activation/applicability remains with dev-ops owner.

- [.claude/skills/page-contract/tests/contract.test.ts:19](../../.claude/skills/page-contract/tests/contract.test.ts#L19): a well-formed item is written
- [.claude/skills/page-contract/tests/contract.test.ts:25](../../.claude/skills/page-contract/tests/contract.test.ts#L25): an item with no status is refused, saying why (draft PR #158 hid this way)
- [.claude/skills/page-contract/tests/contract.test.ts:33](../../.claude/skills/page-contract/tests/contract.test.ts#L33): kind "decision" and kind "final" are refused
- [.claude/skills/page-contract/tests/contract.test.ts:42](../../.claude/skills/page-contract/tests/contract.test.ts#L42): options as bare strings, body and createdAt are refused, naming the right fields
- [.claude/skills/page-contract/tests/contract.test.ts:52](../../.claude/skills/page-contract/tests/contract.test.ts#L52): a question with no options is refused; an update with none is fine
- [.claude/skills/page-contract/tests/contract.test.ts:58](../../.claude/skills/page-contract/tests/contract.test.ts#L58): a time in the future is refused; a few seconds of skew is not
- [.claude/skills/page-contract/tests/contract.test.ts:69](../../.claude/skills/page-contract/tests/contract.test.ts#L69): a batch is refused whole when one entry breaks the contract
- [.claude/skills/page-contract/tests/contract.test.ts:79](../../.claude/skills/page-contract/tests/contract.test.ts#L79): an update that only stamps handledAt passes; reads and other artifacts are never checked
- [.claude/skills/page-contract/tests/contract.test.ts:86](../../.claude/skills/page-contract/tests/contract.test.ts#L86): a bad links url is refused
- [.claude/skills/page-contract/tests/contract.test.ts:92](../../.claude/skills/page-contract/tests/contract.test.ts#L92): at the end of a turn that did work, the coordinator's lastActive is stamped, pinned to the version read
- [.claude/skills/page-contract/tests/contract.test.ts:110](../../.claude/skills/page-contract/tests/contract.test.ts#L110): after a restart, a coordinator is found by its own session link and its lastActive is stamped
- [.claude/skills/page-contract/tests/contract.test.ts:129](../../.claude/skills/page-contract/tests/contract.test.ts#L129): a session whose link is not on the page is never stamped
- [.claude/skills/page-contract/tests/contract.test.ts:145](../../.claude/skills/page-contract/tests/contract.test.ts#L145): after a restart, a turn that never touched the page still finds the coordinator and stamps it (admit, 2026-10-04 to 10-21)
- [.claude/skills/page-contract/tests/contract.test.ts:164](../../.claude/skills/page-contract/tests/contract.test.ts#L164): a page-comment wake is told whose wake thread it came on (Topic, 2026-10-05)

## tools-ci: ruling review

- Proof supersession checked: testing.md historical text ‘freezes prototype once and caches its separate build and successful baseline measurement’ is replaced by cost correction6562620628 ‘neither checks out/builds/measures nor caches a prototype baseline’. workflows.test.ts:8 asserts the replacement. Its nightly helper tests do not reinstate the removed PR settle/pixel gate.
- Pixel exception supersession: testing.md6561733936 replaces #1612’s exact-colour exception with at most eight pixels and channel delta32. proofs.test.cjs:30 checks 2small/8at32 pass and 9 pixels/40channel fail. No removed allowlist requirement remains.
- Art policy supersession: historical creatures.md says cloud art/canonical visual review are release gates; current testing.md says art runs nightly/manual and does not hold builds/releases. workflows.test.ts checks advisory nightly art, standing result and matching-tree reuse. This supports keeping the replacement guards, not deleting them.
- Compatibility is current: roster/presets.test.mjs legacy beetle branch is still implemented in art/roster/presets.js and creatures.md retains beetle Current. comparable old-log and hold-simulation old/new-loop inputs similarly prove compatibility. No whole-case obsolete design was established in these 49 files.
- run-unit.test.ts “slowest alone” still follows the current largest-first total-work algorithm for its300 s file/150 s remaining-work input. A separate case rejects hiding extra work under the longest file. The title alone does not pin the superseded longest-file objective.
- Second-pass schedule supersession: art-check/scope.mjs header says full check on every prototype push; art-checks.md5 Ed 1Nov now says nightly03:17/manual and ‘No build, deploy or release waits on it’. affected23 asserts schedule/manual and NO PR/push triggers. fullCheck(event) and scope(paths) are exported compatibility helpers, not workflow triggers. The old header is stale commentary; no assertion enforcing the retired schedule was found.
- Pure schema replacement: config.md7 now imports LEGEND from creatureLevels while creatures retains the old exports without changing assembled values. configDataBoundary13 builds an OLD-import parity reference; :37 requires the NEW independent runtime graph. Knob prose migration29Oct and generated gates approved30Oct are protected by knobDocs21/67. No request to restore retired imports or prose is present.
- Known hash bug: artHash’s23Oct header records top-level-only hashing missing nested edits. Tests now require recursive subfolder changes; exact-v1 migration requires matching effective inputs. These are replacement bug guards, not old stale-cache behavior. No outcome/deletion group was established in the 77-ID second pass.

## ui-menus-controls: review provenance

Read-only source review at 9f045ebca, report 6566137785. Exact overlap with saves/world/art is counted on those pages once; multiplayer boundaries remain with #1609. Second review 6566596996 at 73741aa8 accounts for all 35 remaining declarations: U7 five proposed, U8/U9/U10 thirty kept; no overlap.

<a id="u1"></a>

## U1: Preview and chart distribution thresholds

outcome stats; 3 tests; files take ~2 s.

Bag previews compare total throws/hits across loops. ChartLayout samples three archipelagos and pins median/max bearing drift, radius growth and quadrant shares. Split those outcome thresholds while retaining bag reach, chart containment and patch exclusion.

- [src/app/chartLayout.test.ts:15](../../src/app/chartLayout.test.ts#L15): packs the islands over the whole disc: home in the middle, each near its bearing, later phases further out, each in its own patch
- [src/ui/bagSim.test.ts:24](../../src/ui/bagSim.test.ts#L24): throws at its bag's rate: the Bumbag most, the Purse least
- [src/ui/bagSim.test.ts:31](../../src/ui/bagSim.test.ts#L31): gives out at its bag's reach, landing letters on the creatures in reach: the far one only for the Purse

<a id="u2"></a>

## U2: Controls, pause and menu recovery

current rules; 105 tests; files take ~12 s.

Tests inject events/hosts and check input ownership, exception recovery, remaps and exactly-once actions. freezeStack replay equality is integrity despite advancing a game. Settings’ fixed recovery inputs are deliberate; controller tests do not measure GPU performance.

- [src/app/knobs.test.ts:17](../../src/app/knobs.test.ts#L17): keeps the default solo keyboard and live setters working
- [src/app/opening.test.ts:12](../../src/app/opening.test.ts#L12): starts resumed, creator=0 and ready bot nights directly, retaining bedroom/arrival and pending-bot gates
- [src/app/opening.test.ts:22](../../src/app/opening.test.ts#L22): resumes directly into play instead of opening the creator that prevents start from unpausing
- [src/app/opening.test.ts:31](../../src/app/opening.test.ts#L31): is the tuning's way, or the link's ?opening=bedroom|old for one load
- [src/app/opening.test.ts:40](../../src/app/opening.test.ts#L40): is on by default: a plain first load wakes in her bedroom, ?opening=old and the tools' links keep their own start
- [src/app/opening.test.ts:48](../../src/app/opening.test.ts#L48): wakes her in her bedroom on a link naming its night too (Ed, 2026-10-25, on ?seed=497831: "it should be loading straight to her bedroom in the treehouse, not the character creation screen")
- [src/app/opening.test.ts:53](../../src/app/opening.test.ts#L53): wakes in her bedroom for any start of a night she plays
- [src/app/opening.test.ts:61](../../src/app/opening.test.ts#L61): a sail lands her asleep in her bed (Ed, 2026-10-25, his 2a), in place or by the island's link (&arrive=1); only ?opening=old at her decks
- [src/app/opening.test.ts:69](../../src/app/opening.test.ts#L69): a first game's chart has only home to sail to; what she finds opens more
- [src/app/playerPick.test.ts:20](../../src/app/playerPick.test.ts#L20): is hidden till the debug overlay comes on, and goes with it
- [src/app/playerPick.test.ts:29](../../src/app/playerPick.test.ts#L29): shows from the start with ?debug, and never with ?dev=0
- [src/app/settings.test.ts:15](../../src/app/settings.test.ts#L15): keep the waves' speed (Ed, 2026-10-18), its built default 1 m/s forgotten
- [src/app/settings.test.ts:23](../../src/app/settings.test.ts#L23): leave a knob the link sets alone
- [src/app/settings.test.ts:34](../../src/app/settings.test.ts#L34): every pause-page knob changed in one night is set in the next's, and nothing else
- [src/app/settings.test.ts:45](../../src/app/settings.test.ts#L45): leaves a knob the next night's link sets
- [src/app/settingsPage.test.ts:20](../../src/app/settingsPage.test.ts#L20): offers screen selection only when the browser implements screen details, without prompting
- [src/app/settingsPage.test.ts:31](../../src/app/settingsPage.test.ts#L31): closing during the first Settings import cancels the open but keeps the loaded menu reusable
- [src/controlsText.test.ts:12](../../src/controlsText.test.ts#L12): names the keys and buttons as the bindings have them (platform/bindings.ts), each a span the bindings fill
- [src/controlsText.test.ts:23](../../src/controlsText.test.ts#L23): covers the treehouse: the map's sea chart, the stations, the bed held
- [src/controlsText.test.ts:26](../../src/controlsText.test.ts#L26): keeps nothing stale: no Player pick, no Esc back to the start, no dodge diamond, no old pad layout
- [src/controlsText.test.ts:32](../../src/controlsText.test.ts#L32): say a legend's quest in a won night finds its island, not waking legends
- [src/platform/bindings.test.ts:16](../../src/platform/bindings.test.ts#L16): are Ed's pad layout (2026-10-28; cross and square swapped back in play, 2026-10-29: "square is use and place, x is takeoff/land")
- [src/platform/bindings.test.ts:31](../../src/platform/bindings.test.ts#L31): square never rises or chooses, and cross never uses (opens a station, puts down a sigil), in any context
- [src/platform/bindings.test.ts:42](../../src/platform/bindings.test.ts#L42): leave the keyboard and mouse as they were
- [src/platform/bindings.test.ts:52](../../src/platform/bindings.test.ts#L52): have no conflicts, and each a name and words
- [src/platform/bindings.test.ts:59](../../src/platform/bindings.test.ts#L59): override what the action reads, are saved, and come back on the next page
- [src/platform/bindings.test.ts:70](../../src/platform/bindings.test.ts#L70): move what the pad does: rise on cross reads as rise
- [src/platform/bindings.test.ts:76](../../src/platform/bindings.test.ts#L76): reset: one, or all, back to the defaults (and out of storage)
- [src/platform/bindings.test.ts:87](../../src/platform/bindings.test.ts#L87): setting one back to its default is the default (nothing kept)
- [src/platform/bindings.test.ts:92](../../src/platform/bindings.test.ts#L92): report conflicts: two actions on one input in one context (global counts in both); a game and a menu action may share
- [src/platform/bindings.test.ts:102](../../src/platform/bindings.test.ts#L102): refuse unknown actions and inputs; a spoilt store reads as the defaults
- [src/platform/bindings.test.ts:120](../../src/platform/bindings.test.ts#L120): reads past its dead zone, scaled, along the whole stick
- [src/platform/bindings.test.ts:130](../../src/platform/bindings.test.ts#L130): names the inputs bindings.ts reads, no more, no fewer
- [src/platform/freeze.pad.test.ts:7](../../src/platform/freeze.pad.test.ts#L7): Start always reaches pause when its configurable binding changes or is cleared
- [src/platform/freezeNative.test.ts:40](../../src/platform/freezeNative.test.ts#L40): cancels rejected outside button defaults on both keydown and keyup, including Enter and Space
- [src/platform/freezeNative.test.ts:47](../../src/platform/freezeNative.test.ts#L47): preserves native button and slider defaults inside pause, Settings and the potion lab
- [src/platform/freezeNative.test.ts:57](../../src/platform/freezeNative.test.ts#L57): focuses the non-tab-stop pause container after mounting, without restoring old focus
- [src/platform/freezeNative.test.ts:66](../../src/platform/freezeNative.test.ts#L66): cancels immediate Enter/Space on the pause container on both edges
- [src/platform/freezeNative.test.ts:73](../../src/platform/freezeNative.test.ts#L73): leaves the first Tab native from the pause container and activation native after reaching a button
- [src/platform/freezeNative.test.ts:83](../../src/platform/freezeNative.test.ts#L83): leaves Tab, Shift+Tab and arrows native even when pause receives them from BODY
- [src/platform/freezeStack.test.ts:34](../../src/platform/freezeStack.test.ts#L34): pause owns keys and pads, and held keyboard input cannot leak across a frame-free pause/resume
- [src/platform/freezeStack.test.ts:56](../../src/platform/freezeStack.test.ts#L56): keeps Studio first-Esc, Settings Esc and Start's opening-held behavior
- [src/platform/freezeStack.test.ts:71](../../src/platform/freezeStack.test.ts#L71): records and replays identical rules state across pause/resume with a held key and a single-step
- [src/platform/freezeText.test.ts:4](../../src/platform/freezeText.test.ts#L4): typing a period in the paused comment does not advance the simulation, while the existing canvas shortcut still does
- [src/platform/input.events.test.ts:20](../../src/platform/input.events.test.ts#L20): moving the mouse switches prompts back from gamepad, but touch movement does not
- [src/platform/input.events.test.ts:33](../../src/platform/input.events.test.ts#L33): T toggles once per press; Shift remains held independently
- [src/platform/input.events.test.ts:46](../../src/platform/input.events.test.ts#L46): mouse remaps can toggle Talk and Auto-talk before their edges are consumed
- [src/platform/input.events.test.ts:58](../../src/platform/input.events.test.ts#L58): `${name} keeps inviting and using (cast/bed/sigil holds) until released outside the canvas`
- [src/platform/input.events.test.ts:68](../../src/platform/input.events.test.ts#L68): tracks a left-button press chorded after right without needing another pointerdown
- [src/platform/input.events.test.ts:77](../../src/platform/input.events.test.ts#L77): a start-screen click is consumed once and does not fire; touch compatibility mouse events don't fire
- [src/platform/input.test.ts:12](../../src/platform/input.test.ts#L12): cross rises or lands; square uses (puts down, picks up, held: a run) (Ed, 2026-10-29: "swap x and square"); circle dodges; triangle the hat; L3 the boost
- [src/platform/input.test.ts:19](../../src/platform/input.test.ts#L19): square never rises; cross never uses (never opens a station or puts down a sigil)
- [src/platform/input.test.ts:23](../../src/platform/input.test.ts#L23): R1 cycles forward, L1 back; R2 invites and L2 dodges (Ed, 2026-10-29); the d-pad zooms (up out, down in: Ed, 2026-10-29) and no longer moves her; Share debug
- [src/platform/input.test.ts:32](../../src/platform/input.test.ts#L32): the left stick moves (past its dead zone), the right aims
- [src/platform/input.test.ts:38](../../src/platform/input.test.ts#L38): a button held from last frame isn't pressed again; one taken by something else (the start) does nothing
- [src/platform/input.test.ts:45](../../src/platform/input.test.ts#L45): only circle (back: main.ts closes it) and the triggers (the telescope's zoom) reach the game; no stick moves her
- [src/platform/inputStack.test.ts:8](../../src/platform/inputStack.test.ts#L8): gives input to the game only with an empty stack, and to the exact top registration otherwise
- [src/platform/inputStack.test.ts:22](../../src/platform/inputStack.test.ts#L22): lets native controls receive keys only through the top layer's target predicate
- [src/platform/inputStack.test.ts:31](../../src/platform/inputStack.test.ts#L31): consumes a close event once, without sending it to the exposed panel
- [src/platform/inputStack.test.ts:44](../../src/platform/inputStack.test.ts#L44): quarantines keys held before opening, and keys pressed inside until released after closing
- [src/platform/inputStack.test.ts:57](../../src/platform/inputStack.test.ts#L57): does not reorder duplicate pushes or disturb ownership when a lower layer closes
- [src/platform/inputStack.test.ts:65](../../src/platform/inputStack.test.ts#L65): clears physical key quarantine on blur, where a keyup can be lost
- [src/platform/inputStuck.test.ts:38](../../src/platform/inputStuck.test.ts#L38): `${key}: held walking into the mic, let go at it, isn't held after`
- [src/platform/inputStuck.test.ts:51](../../src/platform/inputStuck.test.ts#L51): a key pressed inside the menu doesn't walk her after it closes
- [src/platform/inputStuck.test.ts:59](../../src/platform/inputStuck.test.ts#L59): whatever's held is let go when a menu that takes the keys opens or closes (input.release): a key-up lost behind a frame, the zoo's or the chart's, too
- [src/platform/inputTalk.test.ts:13](../../src/platform/inputTalk.test.ts#L13): held: she talks while Shift is down
- [src/platform/inputTalk.test.ts:18](../../src/platform/inputTalk.test.ts#L18): toggled: a press starts it and it stays on after letting go; the next press stops it
- [src/platform/inputTarget.test.ts:3](../../src/platform/inputTarget.test.ts#L3): text editing owns periods and gameplay keys; sliders and game canvas keep their existing behavior
- [src/platform/padRemaps.test.ts:18](../../src/platform/padRemaps.test.ts#L18): action
- [src/platform/padRemaps.test.ts:26](../../src/platform/padRemaps.test.ts#L26): movement, aim, invitation holds and menu navigation read the remapped button
- [src/platform/padRemaps.test.ts:42](../../src/platform/padRemaps.test.ts#L42): Input.read dispatches a remapped pad Talk in held/toggle mode and Auto-talk once per edge
- [src/platform/rumble.test.ts:8](../../src/platform/rumble.test.ts#L8): pulses once on a hit, knockout, landing, wave and win/loss, rather than every frame
- [src/platform/rumble.test.ts:22](../../src/platform/rumble.test.ts#L22): honours off/reduced-effects/paused states, and never replays old events when enabled
- [src/platform/rumble.test.ts:31](../../src/platform/rumble.test.ts#L31): silently degrades for missing/disconnected actuators, sync failures and promise rejection
- [src/platform/tuningPreset.test.ts:12](../../src/platform/tuningPreset.test.ts#L12): is off without the flag
- [src/platform/tuningPreset.test.ts:16](../../src/platform/tuningPreset.test.ts#L16): writes the preset's numbers over the configs, keeping what it doesn't hold
- [src/rules/inputEdges.test.ts:8](../../src/rules/inputEdges.test.ts#L8): `one press drops the hat once at ${fps} fps, and another picks it up once`
- [src/rules/zooControls.test.ts:14](../../src/rules/zooControls.test.ts#L14): finds the block she's in
- [src/rules/zooControls.test.ts:19](../../src/rules/zooControls.test.ts#L19): adds and removes creatures of its kind at a level, in its block
- [src/rules/zooControls.test.ts:30](../../src/rules/zooControls.test.ts#L30): starts calm, and takes each mood: wild, happy (its runes to pick up), angry, calm again
- [src/rules/zooControls.test.ts:46](../../src/rules/zooControls.test.ts#L46): puts a block to sleep and wakes it
- [src/ui/deviceHints.test.ts:7](../../src/ui/deviceHints.test.ts#L7): chart and telescope pad readouts show changed bindings without keyboard instructions
- [src/ui/deviceHints.test.ts:17](../../src/ui/deviceHints.test.ts#L17): switching to keyboard or touch removes pad glyphs and keeps the chart's hold rule
- [src/ui/menuFocus.test.ts:6](../../src/ui/menuFocus.test.ts#L6): pad navigation reaches every existing pause control, wraps and leaves an empty panel safely
- [src/ui/menuFocus.test.ts:17](../../src/ui/menuFocus.test.ts#L17): native slider changes notify both live-input and persisted-change listeners
- [src/ui/menuFocus.test.ts:25](../../src/ui/menuFocus.test.ts#L25): opening a panel with choose held does not click through; hidden and disabled controls are skipped, Back stays in that panel
- [src/ui/menuFocus.test.ts:50](../../src/ui/menuFocus.test.ts#L50): a press made after the pause began but before its first frame still counts; the opening press itself does not
- [src/ui/menuFocus.test.ts:64](../../src/ui/menuFocus.test.ts#L64): a fresh pause snapshot resets old Back history even if no frame saw the menu close
- [src/ui/rebind.test.ts:9](../../src/ui/rebind.test.ts#L9): shows the mouse then the keys, or the pad
- [src/ui/rebind.test.ts:15](../../src/ui/rebind.test.ts#L15): sets a slot, fills an empty one, empties one, and swaps with its own other slot
- [src/ui/rebind.test.ts:27](../../src/ui/rebind.test.ts#L27): cannot clear the last Choose or Back input on either device, but can remove surplus inputs
- [src/ui/rebind.test.ts:42](../../src/ui/rebind.test.ts#L42): a swap into an empty slot cannot steal the last menu recovery input or partially mutate other bindings
- [src/ui/rebind.test.ts:56](../../src/ui/rebind.test.ts#L56): finds what has the input where the action works, not across play and menus
- [src/ui/rebind.test.ts:64](../../src/ui/rebind.test.ts#L64): swap: each other action takes the old input in its place; use both: they share; saved
- [src/ui/rebind.test.ts:77](../../src/ui/rebind.test.ts#L77): swap into an empty slot: the other loses the input
- [src/ui/rebind.test.ts:87](../../src/ui/rebind.test.ts#L87): takes a fresh button or a stick pushed one way, waiting for everything let go first
- [src/ui/rebind.test.ts:94](../../src/ui/rebind.test.ts#L94): names inputs: keys, the mouse, PlayStation's or Xbox's
- [src/ui/settingsNav.test.ts:14](../../src/ui/settingsNav.test.ts#L14): moves the focus down and up, skipping hidden rows and wrapping
- [src/ui/settingsNav.test.ts:20](../../src/ui/settingsNav.test.ts#L20): steps the tabs both ways, wrapping, the focus on the new tab's first row
- [src/ui/settingsNav.test.ts:25](../../src/ui/settingsNav.test.ts#L25): left and right change the row; choose flips, steps on or presses; back closes; reset resets
- [src/ui/settingsNav.test.ts:36](../../src/ui/settingsNav.test.ts#L36): steps choices round and sliders in twentieths, held to 0..1
- [src/ui/settingsNav.test.ts:46](../../src/ui/settingsNav.test.ts#L46): maps arrows and WASD, Enter and Space, Esc, Q/E and Tab, Delete
- [src/ui/settingsNav.test.ts:54](../../src/ui/settingsNav.test.ts#L54): ordinary menus follow remaps, while Settings keeps its fixed choose/back recovery
- [src/ui/settingsNav.test.ts:63](../../src/ui/settingsNav.test.ts#L63): ✕ chooses, ○ goes back, L1/R1 the tabs, △ resets: once a press, not again while held
- [src/ui/settingsNav.test.ts:72](../../src/ui/settingsNav.test.ts#L72): the d-pad and the stick move, repeating while held

<a id="u3"></a>

## U3: Opening, travel, progression and links

current rules; 101 tests; files take ~54 s.

Known inputs drive fallback, saved tuning, temporary finds and loading completeness. Map/campaign cases compare retained identity rather than bot success. Existing W1/W6 cases are excluded from duplicate membership here. House reviewer verified three whatsNew tests: lazy/retry networking, safe bounded paths/data and batched ordered changelog transport.

- [src/app/arrival.test.ts:32](../../src/app/arrival.test.ts#L32): keeps the camera without the still when the still won't fit
- [src/app/arriveLimit.test.ts:8](../../src/app/arriveLimit.test.ts#L8): lands a limited arrival with full witch/floor available even while homeDone remains false
- [src/app/chartLayout.test.ts:42](../../src/app/chartLayout.test.ts#L42): kept the rings it had (ringAt): home in the middle and every island on its ring, within a few degrees of its bearing, clear of its neighbours
- [src/app/chartNav.test.ts:6](../../src/app/chartNav.test.ts#L6): steps to the nearest island that way, north up the screen
- [src/app/chartNav.test.ts:11](../../src/app/chartNav.test.ts#L11): prefers the one straight ahead over a nearer one off to the side, and finds none where there's none
- [src/app/chartOrder.test.ts:13](../../src/app/chartOrder.test.ts#L13): `the warm job's order (world ${world}): every island once, home first, by phase, the nearest first within a phase`
- [src/app/chartOrder.test.ts:24](../../src/app/chartOrder.test.ts#L24): the chart's order: by phase even when a later phase's island is nearer the chosen one, nearest first within a phase
- [src/app/chartOrder.test.ts:34](../../src/app/chartOrder.test.ts#L34): the open chart's order (chartOrder): home, then the islands she can sail to nearest the chosen first, then the rest by phase
- [src/app/chartOrder.test.ts:43](../../src/app/chartOrder.test.ts#L43): the chart's real islands: the order asked for is sorted by phase
- [src/app/chartPin.test.ts:12](../../src/app/chartPin.test.ts#L12): one for each new island and no other, nearest the island she's on first
- [src/app/chartPin.test.ts:16](../../src/app/chartPin.test.ts#L16): points at nothing when there's nothing new
- [src/app/chartPin.test.ts:24](../../src/app/chartPin.test.ts#L24): over the island's highest drawn point, not its middle
- [src/app/chartPin.test.ts:30](../../src/app/chartPin.test.ts#L30): fades out over about a quarter second while its island's chosen, and back when another is
- [src/app/debugUnlock.test.ts:21](../../src/app/debugUnlock.test.ts#L21): stocks twenty of every mushroom without reducing an overflowing basket
- [src/app/debugUnlock.test.ts:27](../../src/app/debugUnlock.test.ts#L27): refreshes an existing floor, preserves hats in play and finds, and restores earned hats when switched off
- [src/app/debugUnlock.test.ts:50](../../src/app/debugUnlock.test.ts#L50): loads every built spell hat onto the Cloakroom floor with the debug switch, link, or headless defaults
- [src/app/debugUnlock.test.ts:68](../../src/app/debugUnlock.test.ts#L68): is off by default, and on and off in its own key
- [src/app/debugUnlock.test.ts:75](../../src/app/debugUnlock.test.ts#L75): offers every item on every shelf (bags too, read from the shelves) and every broom part, in new sets: hers untouched
- [src/app/debugUnlock.test.ts:84](../../src/app/debugUnlock.test.ts#L84): never saves a part as found: one fitted under it is kept fitted only while it's on (globalThis's storage, as the page's)
- [src/app/finds.test.ts:46](../../src/app/finds.test.ts#L46): `${kind} ${item}: the same saves and the same broom`
- [src/app/finds.test.ts:57](../../src/app/finds.test.ts#L57): granting a set's parts keeps them as finding them does: found, not fitted (the Workshop's bay fits them), so no spell yet
- [src/app/finds.test.ts:73](../../src/app/finds.test.ts#L73): every kind it lists has a keeper and names (a new kind joins by adding one: the typecheck asks)
- [src/app/finds.test.ts:76](../../src/app/finds.test.ts#L76): all and none per kind, and letting a fitted part go takes it off her broom
- [src/app/finds.test.ts:98](../../src/app/finds.test.ts#L98): reads all, none, kind:item, kind:* and a bare item, and ignores what it doesn't know
- [src/app/finds.test.ts:106](../../src/app/finds.test.ts#L106): writes the saves as the control does: all, then none leaves only what follows it
- [src/app/homeGrowth.test.ts:16](../../src/app/homeGrowth.test.ts#L16): knows home's 10, then each kind found with an area type, in the order found, none twice
- [src/app/homeGrowth.test.ts:49](../../src/app/homeGrowth.test.ts#L49): is the default home unchanged with nothing found (the same map as before home grew)
- [src/app/homeGrowth.test.ts:55](../../src/app/homeGrowth.test.ts#L55): end to end: a night won on an island finds its legends' kinds; the next night home has their areas, its legends favouring islands unfound
- [src/app/homeGrowth.test.ts:75](../../src/app/homeGrowth.test.ts#L75): on the sea chart, home's outline grows with it (its coast the same, bigger)
- [src/app/ladder.travel.test.ts:13](../../src/app/ladder.travel.test.ts#L13): ignores loading, a sail with no game frames, and the arrival flight, then grants settling time
- [src/app/ladder.travel.test.ts:21](../../src/app/ladder.travel.test.ts#L21): recovers quality after the trip while ordinary frames have room
- [src/app/ladder.travel.test.ts:28](../../src/app/ladder.travel.test.ts#L28): still reduces quality for sustained slow ordinary play after settling
- [src/app/landingBake.test.ts:14](../../src/app/landingBake.test.ts#L14): are every area type the island's night draws, whatever its seed (its home area drawn as home's meadow)
- [src/app/landingBake.test.ts:31](../../src/app/landingBake.test.ts#L31): draws the island's own trees first (what the game shows at once), then tonight's, for every type it will ask for
- [src/app/landingSleep.test.ts:4](../../src/app/landingSleep.test.ts#L4): holds exactly its loading night and releases once only when its house is ready
- [src/app/linkParams.test.ts:39](../../src/app/linkParams.test.ts#L39): ignores and deletes a remembered world and fight, and writes none back
- [src/app/linkParams.test.ts:52](../../src/app/linkParams.test.ts#L52): takes the world from the link alone, for that load only
- [src/app/linkParams.test.ts:80](../../src/app/linkParams.test.ts#L80): a whole copy: what one night's knobs change, deep in it, reaches neither the file nor the next night's
- [src/app/loan.test.ts:63](../../src/app/loan.test.ts#L63): is usable the night she takes it: a wearable is hers to wear, a hat on the hats' floor and hers, a part hers at the bay
- [src/app/loan.test.ts:76](../../src/app/loan.test.ts#L76): writes nothing while it's on loan: no save holds it, so a reload mid-night keeps nothing
- [src/app/loan.test.ts:88](../../src/app/loan.test.ts#L88): is kept on a won night, when she sleeps: in her own save for good
- [src/app/loan.test.ts:97](../../src/app/loan.test.ts#L97): goes back to the sky on a lost night: nothing kept, and she owns tonight only what her save says
- [src/app/loan.test.ts:110](../../src/app/loan.test.ts#L110): worn on a lost night, it's gone when she wakes: that slot holds what she had before the loan (the pile's, next morning)
- [src/app/loan.test.ts:121](../../src/app/loan.test.ts#L121): worn on a won night, it's still hers to wear next morning (in last night's pile, as ever)
- [src/app/loan.test.ts:130](../../src/app/loan.test.ts#L130): closes the leak: her look saved mid-night with the loan on doesn't make it hers at the next load
- [src/app/loan.test.ts:139](../../src/app/loan.test.ts#L139): a part fitted at the bay on a lost night: her broom keeps the part she had in that slot before
- [src/app/loan.test.ts:152](../../src/app/loan.test.ts#L152): a loaned hat is never saved as her hat: the one before stands in
- [src/app/loan.test.ts:158](../../src/app/loan.test.ts#L158): is dreamed of after the bed and after a sail (its flight lands her asleep in bed: Ed, 2026-10-24), never another way
- [src/app/loan.test.ts:164](../../src/app/loan.test.ts#L164): names itself and its home in the treehouse for the dream
- [src/app/newBuild.test.ts:7](../../src/app/newBuild.test.ts#L7): reads the build's number from its label, none from a local build
- [src/app/newBuild.test.ts:12](../../src/app/newBuild.test.ts#L12): is newer only by a higher number, and never for a local build
- [src/app/newBuild.test.ts:18](../../src/app/newBuild.test.ts#L18): detects a workflow-counter jump without assuming consecutive builds
- [src/app/newBuild.test.ts:23](../../src/app/newBuild.test.ts#L23): reads version.json without the cache and remembers a newer build
- [src/app/newBuild.test.ts:33](../../src/app/newBuild.test.ts#L33): says nothing when the page is the latest, or version.json can't be read
- [src/app/newForest.test.ts:5](../../src/app/newForest.test.ts#L5): gives the link a fresh seed and keeps the rest of it
- [src/app/newForest.test.ts:14](../../src/app/newForest.test.ts#L14): adds a seed to a link without one, and the seed changes from night to night
- [src/app/night.test.ts:96](../../src/app/night.test.ts#L96): presentation defaults keep the exact canonical render, HUD and simulation game
- [src/app/night.test.ts:110](../../src/app/night.test.ts#L110): presentation hooks route render/HUD reads while keeping Night.game and freeze canonical
- [src/app/night.test.ts:129](../../src/app/night.test.ts#L129): resumes the saved rules and tuning without replaying the link's fresh-night switches
- [src/app/night.test.ts:157](../../src/app/night.test.ts#L157): makes a night from its spec: its seed, island and tuning, fresh flags, held in page.night
- [src/app/night.test.ts:169](../../src/app/night.test.ts#L169): a second night gets fresh flags, its own game, tuning and playtest run, the log's hooks and the overlay carried
- [src/app/night.test.ts:187](../../src/app/night.test.ts#L187): re-points the page's pieces at the new night, and never a second boot's night (the later ways come in place)
- [src/app/night.test.ts:214](../../src/app/night.test.ts#L214): a sail after endNight: the ended night kept as page.last meanwhile, then carried on from (its sliders but its link's own), and let go
- [src/app/night.test.ts:232](../../src/app/night.test.ts#L232): endNight undoes the night's listeners and lets it go
- [src/app/night.test.ts:244](../../src/app/night.test.ts#L244): reads the night on now: its game and tuning, and drives that one
- [src/app/sail.test.ts:13](../../src/app/sail.test.ts#L13): is the tuning's sail.inPlace (on: PR 6), ?sail= over it for the page
- [src/app/sail.test.ts:26](../../src/app/sail.test.ts#L26): is ?island=X&seed=S, the page's other switches kept, the chart's hand-off and the repro and debug places dropped
- [src/app/sail.test.ts:31](../../src/app/sail.test.ts#L31): carries the chart's world when it gave one (the page's ?world=), and the new one over the old
- [src/app/sail.test.ts:35](../../src/app/sail.test.ts#L35): the reload's link is today's (ui/chartOverlay.ts's, as before)
- [src/app/sail.test.ts:50](../../src/app/sail.test.ts#L50): each starts the night its link would on a fresh load: its island, seed, world and how, the link's switches whole
- [src/app/sail.test.ts:61](../../src/app/sail.test.ts#L61): a link with no seed isn't a night in place (it throws: the page loads it anew instead)
- [src/app/sail.test.ts:64](../../src/app/sail.test.ts#L64): one going wrong loads its link as before
- [src/app/sail.test.ts:74](../../src/app/sail.test.ts#L74): the page has neither the night won card nor the party's over card, nor their buttons
- [src/app/sail.test.ts:101](../../src/app/sail.test.ts#L101): is left alone on a first load
- [src/app/sail.test.ts:109](../../src/app/sail.test.ts#L109): after a sail: the night's link and a guard on it; Back puts the guard back on the night's link and opens the pause menu
- [src/app/sail.test.ts:126](../../src/app/sail.test.ts#L126): startNight throwing: the page goes to the island's link exactly as the old way would, the error logged
- [src/app/sail.test.ts:136](../../src/app/sail.test.ts#L136): sailed in place: no reload
- [src/app/sail.test.ts:141](../../src/app/sail.test.ts#L141): a log that throws still reloads
- [src/app/sail.test.ts:150](../../src/app/sail.test.ts#L150): never starts a new night, from any chart: home or any island, mid-night or after
- [src/app/sail.test.ts:154](../../src/app/sail.test.ts#L154): sails to any other island, as now
- [src/app/sail.test.ts:159](../../src/app/sail.test.ts#L159): sails when the chart shows another world (a shared link's, or after starting over), or there's no night to go back to
- [src/app/sail.test.ts:164](../../src/app/sail.test.ts#L164): knows the night's island by its map: home or a kind's; none for a sized, phased or zoo island, or a placeholder
- [src/app/sail.test.ts:171](../../src/app/sail.test.ts#L171): labels its button as going back: to the party, or to the afterparty once the party's over
- [src/app/sail.test.ts:179](../../src/app/sail.test.ts#L179): chooses home when she's home, whatever her last voyage
- [src/app/sail.test.ts:182](../../src/app/sail.test.ts#L182): chooses the island she's on, not the last one she sailed to or the default
- [src/app/sail.test.ts:186](../../src/app/sail.test.ts#L186): keeps a page's own start, and with no night under it (or another world's chart) her last voyage, else home
- [src/app/sail.test.ts:192](../../src/app/sail.test.ts#L192): is what the chart view chooses as it opens, however it's opened (app/chartView.ts)
- [src/app/shot.test.ts:15](../../src/app/shot.test.ts#L15): object: puts her on foot in the house at that station
- [src/app/shot.test.ts:22](../../src/app/shot.test.ts#L22): room: puts her on the room's floor
- [src/app/shot.test.ts:27](../../src/app/shot.test.ts#L27): area: in the nearest area of that type
- [src/app/shot.test.ts:32](../../src/app/shot.test.ts#L32): creature: one of that species and level beside her, friendly
- [src/app/shot.test.ts:38](../../src/app/shot.test.ts#L38): find: that find on clear ground in front of her
- [src/app/shot.test.ts:44](../../src/app/shot.test.ts#L44): says why it can't: an unknown id or scene
- [src/app/shot.test.ts:47](../../src/app/shot.test.ts#L47): its link: quick art, no start card, the spell cast, the waves held; the link's own kept
- [src/app/whatsNew.test.ts:8](../../src/app/whatsNew.test.ts#L8): fetches nothing until selected, loads only one batch, caches it, and retries a failed next batch without losing notes
- [src/app/whatsNew.test.ts:26](../../src/app/whatsNew.test.ts#L26): rejects foreign index paths and oversized data while leaving retry available
- [src/app/whatsNew.test.ts:33](../../src/app/whatsNew.test.ts#L33): emits and fetches the entire existing changelog in newest-first batches of at most three
- [src/app/zooExit.test.ts:6](../../src/app/zooExit.test.ts#L6): in the book's frame over a night, it hands back to the night's page
- [src/app/zooExit.test.ts:9](../../src/app/zooExit.test.ts#L9): on a ?zoo link, it goes to the same page without the zoo's switches, keeping the rest
- [src/app/zooOverlay.test.ts:16](../../src/app/zooOverlay.test.ts#L16): opens over the night, pausing it, and closing it goes back to the night where it was
- [src/app/zooOverlay.test.ts:32](../../src/app/zooOverlay.test.ts#L32): is this build's own page with ?zoo

<a id="u4"></a>

## U4: Diagnostics, encoded data and queue bounds

hard limits; 60 tests; files take ~7 s.

Synthetic rows, fake timers and worker traces exercise bounded allocation, retained report text and transparent instrumentation. Long arrays and paused loops are integrity pressure, not gameplay outcome targets. S6 already contains recorded-game/comment replay and is not double-counted.

- [src/app/bundleMetrics.test.ts:4](../../src/app/bundleMetrics.test.ts#L4): includes transitive static imports and CSS, keeping dynamic screens and workers separate
- [src/app/bundleMetrics.test.ts:8](../../src/app/bundleMetrics.test.ts#L8): attributes generated UTF-8 bytes using source-map UTF-16 columns and leaves unmapped spans explicit
- [src/app/chartWorkerTrace.test.ts:8](../../src/app/chartWorkerTrace.test.ts#L8): keeps the untraced cached outline and transfer buffers unchanged
- [src/app/chartWorkerTrace.test.ts:16](../../src/app/chartWorkerTrace.test.ts#L16): traces cached scan and background coast write as separate completed jobs
- [src/app/compareKey.test.ts:12](../../src/app/compareKey.test.ts#L12): says her scene: the zoo, the treehouse, the treetops or the ground
- [src/app/compareKey.test.ts:18](../../src/app/compareKey.test.ts#L18): holds the build, the world, the island, the scene, the canvas, the renderer, the machine and the knobs
- [src/app/mapPrepDiagnostics.test.ts:16](../../src/app/mapPrepDiagnostics.test.ts#L16): records a valid worker prep, then resets its diagnostics when the next night has none
- [src/app/mapPrepDiagnostics.test.ts:24](../../src/app/mapPrepDiagnostics.test.ts#L24): distinguishes another seed from an invalid prep without using either
- [src/app/mapPrepDiagnostics.test.ts:32](../../src/app/mapPrepDiagnostics.test.ts#L32): records hydration time separately from the worker time
- [src/app/repro.test.ts:12](../../src/app/repro.test.ts#L12): lists every leaf that differs, by its path, and none of the notes or what the load sets elsewhere
- [src/app/repro.test.ts:18](../../src/app/repro.test.ts#L18): ?set= puts them back
- [src/app/repro.test.ts:30](../../src/app/repro.test.ts#L30): rebuilds the waves, the areas cleared early, her place, mode and zoom
- [src/app/repro.test.ts:47](../../src/app/repro.test.ts#L47): leaves her at her decks when she's there, and says so by leaving her place out
- [src/app/repro.test.ts:54](../../src/app/repro.test.ts#L54): is one short line in the overlay, the rest in the copied text, and names the browser and OS
- [src/app/storageFallback.test.ts:9](../../src/app/storageFallback.test.ts#L9): keeps broom finds and record choices when storage reads old data but refuses writes
- [src/app/storageFallback.test.ts:22](../../src/app/storageFallback.test.ts#L22): retains settings after refused writes and resumes reading shared storage after a successful retry
- [src/app/storageFallback.test.ts:38](../../src/app/storageFallback.test.ts#L38): plays with no accessible browser storage, keeping failed writes in this page
- [src/app/timing.test.ts:10](../../src/app/timing.test.ts#L10): is kept for the tab once asked for, and stopped by ?timing=0
- [src/app/timing.test.ts:17](../../src/app/timing.test.ts#L17): carries the chart page's steps to the next page and gives each step its own time, in order
- [src/app/timing.test.ts:32](../../src/app/timing.test.ts#L32): carries nothing without it, and copes with no storage
- [src/app/timing.test.ts:40](../../src/app/timing.test.ts#L40): keeps the last sail's steps alone, timed from it (every log: Ed's v4821 sail)
- [src/app/travelTiming.test.ts:18](../../src/app/travelTiming.test.ts#L18): records ordinary sail stalls and arrival holds without a timing link
- [src/app/travelTiming.test.ts:29](../../src/app/travelTiming.test.ts#L29): bounds long-lived diagnostic memory and declares clipped history
- [src/app/travelTiming.test.ts:39](../../src/app/travelTiming.test.ts#L39): does not require long-task support in the browser
- [src/app/workerJobHandlers.test.ts:22](../../src/app/workerJobHandlers.test.ts#L22): sends only the original art result when diagnostics are off
- [src/app/workerJobHandlers.test.ts:31](../../src/app/workerJobHandlers.test.ts#L31): records a cached art job end before its business reply without running the bake
- [src/app/workerJobHandlers.test.ts:41](../../src/app/workerJobHandlers.test.ts#L41): separates map compute and store stages and completes diagnostics before the terminating reply
- [src/app/workerJobTrace.test.ts:4](../../src/app/workerJobTrace.test.ts#L4): keeps tracing off when worker diagnostic packets cannot be safely intercepted
- [src/app/workerJobTrace.test.ts:10](../../src/app/workerJobTrace.test.ts#L10): measures a deferred queue gap independently of compute and cache operations
- [src/app/workerJobTrace.test.ts:19](../../src/app/workerJobTrace.test.ts#L19): keeps payload identity and original promises/results/errors when tracing is off
- [src/app/workerJobTrace.test.ts:27](../../src/app/workerJobTrace.test.ts#L27): records real enqueue depth and worker assignment without mutating the business job
- [src/app/workerJobTrace.test.ts:37](../../src/app/workerJobTrace.test.ts#L37): uses epoch clocks for worker stages and emits completion before a caller can send its reply
- [src/platform/logCodec.test.ts:7](../../src/platform/logCodec.test.ts#L7): uses exact frame runs/deltas and retains changing controls
- [src/platform/logCodec.test.ts:15](../../src/platform/logCodec.test.ts#L15): roundtrips native gzip, the explicit JSON fallback and legacy uncompressed data
- [src/platform/logCodec.test.ts:22](../../src/platform/logCodec.test.ts#L22): rejects corrupt envelopes and expansion bombs before allocating frame arrays
- [src/platform/logRecords.test.ts:4](../../src/platform/logRecords.test.ts#L4): keeps full context and folds equivalent repeated records with both time ranges
- [src/platform/logRecords.test.ts:13](../../src/platform/logRecords.test.ts#L13): evicts debug then info before warning/error under both count and byte caps
- [src/platform/logRecords.test.ts:25](../../src/platform/logRecords.test.ts#L25): reports invalid data and an entry too large to retain without throwing or executing it
- [src/platform/logRecords.test.ts:33](../../src/platform/logRecords.test.ts#L33): folds errors despite changing attached trails and renders their stack with actual line breaks
- [src/platform/playtestJournal.test.ts:25](../../src/platform/playtestJournal.test.ts#L25): coalesces flushes behind a blocked store and reconciles evicted rows without queueing a batch per request
- [src/platform/playtestJournal.test.ts:50](../../src/platform/playtestJournal.test.ts#L50): bounds durable debug growth across a long pause and reload while preserving warnings and errors
- [src/platform/playtestJournal.test.ts:68](../../src/platform/playtestJournal.test.ts#L68): does not evict important records even when they alone exceed the debug budget
- [src/platform/playtestJournal.test.ts:77](../../src/platform/playtestJournal.test.ts#L77): keeps committed records and the last fifty notable events after an unexpected reload
- [src/platform/playtestJournal.test.ts:90](../../src/platform/playtestJournal.test.ts#L90): distinguishes clean closure and never clears a newer page's marker
- [src/platform/playtestJournal.test.ts:100](../../src/platform/playtestJournal.test.ts#L100): an ordinary reload is not an unexpected end even though its pagehide write never commits (crash1823)
- [src/platform/playtestJournal.test.ts:118](../../src/platform/playtestJournal.test.ts#L118): leaves the unexpected-end marker after storage failure without throwing
- [src/platform/playtestJournal.test.ts:127](../../src/platform/playtestJournal.test.ts#L127): retains two prior pages and prunes their records together
- [src/platform/playtestJournal.test.ts:133](../../src/platform/playtestJournal.test.ts#L133): does not prune an unclosed page or another tab's session
- [src/platform/playtestJournal.test.ts:140](../../src/platform/playtestJournal.test.ts#L140): persists repeat updates and removes evicted debug records before errors
- [src/platform/playtestJournal.test.ts:150](../../src/platform/playtestJournal.test.ts#L150): enforces the shared storage budget by deleting closed pages only or refusing the write
- [src/platform/playtestJournal.test.ts:157](../../src/platform/playtestJournal.test.ts#L157): reconciles evictions after a transient write failure instead of leaking stale rows
- [src/platform/playtestLog.test.ts:12](../../src/platform/playtestLog.test.ts#L12): keeps the latest 20 errors with their original night context and leaves browser reporting alone
- [src/platform/playtestLog.test.ts:39](../../src/platform/playtestLog.test.ts#L39): does not turn blocked storage or an unprintable rejection into another crash
- [src/platform/playtestLog.test.ts:46](../../src/platform/playtestLog.test.ts#L46): starts a new page with its own ring and records errors before the first night with unknown context
- [src/platform/playtestLog.test.ts:59](../../src/platform/playtestLog.test.ts#L59): includes saved comments and their bundles in a readable text download
- [src/platform/playtestLog.test.ts:68](../../src/platform/playtestLog.test.ts#L68): downloads every written report when the full diagnostics envelope cannot be encoded
- [src/platform/stallLog.test.ts:4](../../src/platform/stallLog.test.ts#L4): uses the strict 100 ms threshold and reports a bad stretch at most once per five seconds, including its tail
- [src/platform/stallLog.test.ts:16](../../src/platform/stallLog.test.ts#L16): retains measured loading/draw breakdowns without summing inclusive totals or inventing missing parts
- [src/platform/stallLog.test.ts:24](../../src/platform/stallLog.test.ts#L24): bounds the raw stall ring and names only the five largest measured sections
- [src/ui/bagSim.test.ts:41](../../src/ui/bagSim.test.ts#L41): loops: the same bag plays the same loop again

<a id="u5"></a>

## U5: Creator and editor data compatibility

current rules; 40 tests; files take ~2 s.

Synthetic saved data and controls verify migration, current catalogs and valid schemas. The exact potion catalog and palette grid are current pins, not proven superseded. Beetle/shape visual baseline cases are listed under art instead.

- [src/app/defaultLook.test.ts:13](../../src/app/defaultLook.test.ts#L13): is a witch the generator's rules allow, or the classic one; its broom known parts in their own slots
- [src/app/defaultLook.test.ts:19](../../src/app/defaultLook.test.ts#L19): Copy look as defaults gives a file that brings back exactly how she was dressed
- [src/app/defaultLook.test.ts:35](../../src/app/defaultLook.test.ts#L35): refuses a genome or part it can't use (the classic witch, a bare slot)
- [src/app/defaultLook.test.ts:42](../../src/app/defaultLook.test.ts#L42): a first game's broom is the default's, fitted and found (no save yet)
- [src/app/defaultLook.test.ts:49](../../src/app/defaultLook.test.ts#L49): Try as a new witch opens this link with ?newWitch=1, nothing of hers over it
- [src/ui/creator.test.ts:9](../../src/ui/creator.test.ts#L9): maps every axis of the witch generator onto her genome
- [src/ui/creator.test.ts:16](../../src/ui/creator.test.ts#L16): keeps every randomised witch a witch (a pointed hat with its band, a broom)
- [src/ui/creator.test.ts:19](../../src/ui/creator.test.ts#L19): loads a save from before round 2, filling the new fields with hers
- [src/ui/creator.test.ts:27](../../src/ui/creator.test.ts#L27): offers no hat first, and the wide sliders' ends are still a valid witch
- [src/ui/creator.test.ts:36](../../src/ui/creator.test.ts#L36): greys out only real sliders on real options, and none on her classic look but her missing cloak's length (Ed, 2026-10-06: every slider does something)
- [src/ui/creator.test.ts:48](../../src/ui/creator.test.ts#L48): loads a save with a familiar (before 2026-10-08, Ed: "Remove familiars") without it or its colours, still a witch
- [src/ui/creator.test.ts:57](../../src/ui/creator.test.ts#L57): keeps the broom's thickness in her save, and an old save's broom as thick as hers
- [src/ui/creator.test.ts:66](../../src/ui/creator.test.ts#L66): picks colours from Ed's swatch grid: 12 hues and greys across, near-black through the pure hue to near-white down
- [src/ui/creator.test.ts:85](../../src/ui/creator.test.ts#L85): snaps an old save's colours, and the classic witch's, to their nearest swatches (null stays the classic)
- [src/ui/creator.test.ts:94](../../src/ui/creator.test.ts#L94): draws her bedroom at every art pixel: every glow, the banner's letters, its anchors inside, the floor clear round her
- [src/ui/creator.test.ts:105](../../src/ui/creator.test.ts#L105): puts every item of hers in its own box: every axis, accessory and colour part in exactly one, each box's parts its own
- [src/ui/creator.test.ts:114](../../src/ui/creator.test.ts#L114): has a place in her room by each of her things she can walk up to, its box a real one
- [src/ui/decide.test.ts:13](../../src/ui/decide.test.ts#L13): has sound entries: unique ids, 2 to 4 options, a default inside its control, a real knob or switch
- [src/ui/decide.test.ts:38](../../src/ui/decide.test.ts#L38): reads and sets knobs by path, and keeps a value inside its control
- [src/ui/decide.test.ts:51](../../src/ui/decide.test.ts#L51): puts the URL's knob choices on the tuning as the game starts
- [src/ui/decide.test.ts:57](../../src/ui/decide.test.ts#L57): makes a new-issue link labelled decision, with the choice, version, seed and panel
- [src/ui/decide.test.ts:66](../../src/ui/decide.test.ts#L66): the pause page's test sliders (Ed, 2026-10-12): every entry has its PR and a short name, newest PR first; Copy values gives a line each, label, key, value and built default
- [src/ui/decide.test.ts:84](../../src/ui/decide.test.ts#L84): folds the pause page's groups (Ed, 2026-10-26): all folded at first, the opened ones remembered, each header counting its changed sliders
- [src/ui/decide.test.ts:99](../../src/ui/decide.test.ts#L99): starts folded on a fresh page without browser storage, without carrying another page's memory fallback
- [src/ui/decide.test.ts:108](../../src/ui/decide.test.ts#L108): draws a colour's swatch as the light takes it (the Hidden witch group's glow; Ed, 2026-10-26)
- [src/ui/decide.test.ts:113](../../src/ui/decide.test.ts#L113): shows "Load latest version" only while a newer build is out, with its number, and a click loads it (playtest 31 Oct item 11)
- [src/ui/djBooth.test.ts:10](../../src/ui/djBooth.test.ts#L10): starts on her first record, none chosen; the button does nothing till one is
- [src/ui/djBooth.test.ts:16](../../src/ui/djBooth.test.ts#L16): chooses a record she has, not one she hasn't found; then the button starts the party with it
- [src/ui/djBooth.test.ts:23](../../src/ui/djBooth.test.ts#L23): opens with last time's record chosen and in focus, if she still has it
- [src/ui/loadingTree.test.ts:9](../../src/ui/loadingTree.test.ts#L9): is the sigil kit's own strokes
- [src/ui/looks.test.ts:11](../../src/ui/looks.test.ts#L11): randomises pleasing witches within the generator's limits
- [src/ui/looks.test.ts:14](../../src/ui/looks.test.ts#L14): keeps a harmonious palette's roles in every scheme
- [src/ui/potionLab.test.ts:7](../../src/ui/potionLab.test.ts#L7): reverses each sortable column without changing permanent IDs
- [src/ui/potionLab.test.ts:13](../../src/ui/potionLab.test.ts#L13): tries implemented effects for ten game minutes and never pretends a pending effect works
- [src/ui/schemaForm.test.ts:36](../../src/ui/schemaForm.test.ts#L36): shows every module of an empty attack, unset (its defaults), each with its control
- [src/ui/schemaForm.test.ts:44](../../src/ui/schemaForm.test.ts#L44): reads a set attack: its numbers, its enum, its body's variant by its kind, its path's terms, its children's attacks
- [src/ui/schemaForm.test.ts:62](../../src/ui/schemaForm.test.ts#L62): sets and unsets by path, keeping the value only what's set (an attack copied from it stays short)
- [src/ui/schemaForm.test.ts:79](../../src/ui/schemaForm.test.ts#L79): starts an added field from its default, or the empty kind with a variant's kind filled in
- [src/ui/schemaForm.test.ts:91](../../src/ui/schemaForm.test.ts#L91): stops at its depth, the rest raw JSON (children of children of ... are attacks)
- [src/ui/schemaForm.test.ts:105](../../src/ui/schemaForm.test.ts#L105): reads the game's own schemas without throwing (combat.json's)

<a id="u-time"></a>

## U-TIME: Production-sized replay pressure fixture cost

hard limits; 1 test; files take ~38 s.

Preserve legacy report text through duplicated replay pressure, reload and both exports. Coordinator report 6566569947 measured 24.7 s on a normal shard and a 30 s timeout on unrelated multiplayer head d7ce9a6e. This is fixture cost, not evidence against the safety assertion. Yes means use a smaller blocking integrity fixture and move only production-sized pressure to a nonblocking report; no means retain the current fixture. No implementation before Ed rules.

- [src/app/playtestComments.test.ts:69](../../src/app/playtestComments.test.ts#L69): preserves legacy report text through production-sized duplicated replay pressure, reload and both exports

<a id="u7"></a>

## U7: Sampled camera comfort and travel magnitudes

outcome stats; 5 tests; files take ~131 s.

Report sampled maximum angle changes, midpoint distance, smoothness multiplier and two-second travel magnitudes. Keep authored tables/poses, intro termination, no overshoot, capped look-ahead and settled tracking. coastCamera:38 and rules:788 require NEW direct finite/continuity and input-to-movement/camera-coupling coverage in the later implementation; they do not already contain separable integrity assertions. Report 6566596996 records each assertion disposition.

- [src/rules/coastCamera.test.ts:38](../../src/rules/coastCamera.test.ts#L38): eases, never jumps: a step's change in angle stays small
- [src/rules/coastCamera.test.ts:44](../../src/rules/coastCamera.test.ts#L44): lying down, the camera by her bearing round the coast: each of the twelve entries exactly, smoothly between
- [src/rules/rules.test.ts:447](../../src/rules/rules.test.ts#L447): opens close in on her seat, and eases out to the starting zoom once she leaves it (Ed, v171)
- [src/rules/rules.test.ts:481](../../src/rules/rules.test.ts#L481): follows smoothly: never overshoots, never jolts, and looks only a little ahead
- [src/rules/rules.test.ts:788](../../src/rules/rules.test.ts#L788): flies the witch and the camera follows

<a id="u8"></a>

## U8: Paused picture, clock and quality-controller policy

current rules; 17 tests; files take ~131 s.

Keep no paused redraw, each changed title redraw once, paused clock and MAX_STEP clamp. Quality modes, nonfinite/skipped sample handling, pending loads, hysteresis and exponential retry are supplied-input policy contracts, not measured throughput outcomes.

- [src/app/worldDrawGate.test.ts:4](../../src/app/worldDrawGate.test.ts#L4): retains a paused picture through a minute of menu frames, including background art arrivals
- [src/app/worldDrawGate.test.ts:15](../../src/app/worldDrawGate.test.ts#L15): redraws the start for new art, a changed view or an explicit simulation step, once each
- [src/rules/ladder.test.ts:9](../../src/rules/ladder.test.ts#L9): starts at full quality with nothing in effect
- [src/rules/ladder.test.ts:15](../../src/rules/ladder.test.ts#L15): steps down after a few slow windows, past rungs not built and load rungs, to the next live rung
- [src/rules/ladder.test.ts:24](../../src/rules/ladder.test.ts#L24): doesn't step down on a window or two, nor while settling
- [src/rules/ladder.test.ts:28](../../src/rules/ladder.test.ts#L28): climbs back slowly when there's room, and only if the rung above fitted last time
- [src/rules/ladder.test.ts:41](../../src/rules/ladder.test.ts#L41): stops climbing for the night after it keeps flipping
- [src/rules/ladder.test.ts:49](../../src/rules/ladder.test.ts#L49): goes to the bottom live rung, then wants px 4 from the next load, and no further
- [src/rules/ladder.test.ts:56](../../src/rules/ladder.test.ts#L56): marks load rungs passed over as pending, and drops them when climbing back over
- [src/rules/ladder.test.ts:73](../../src/rules/ladder.test.ts#L73): makes a night with the load rungs in effect at its rung
- [src/rules/ladder.test.ts:81](../../src/rules/ladder.test.ts#L81): does nothing pinned or off; off is full quality
- [src/rules/ladder.test.ts:90](../../src/rules/ladder.test.ts#L90): ignores windows marked skip and nonsense times
- [src/rules/ladder.test.ts:96](../../src/rules/ladder.test.ts#L96): doesn't step down on a spike, a stall or a load that a skip window breaks up
- [src/rules/ladder.test.ts:113](../../src/rules/ladder.test.ts#L113): climbs back once the room is real, though a spike pushed it down: retried after a while, longer each time it's left
- [src/rules/ladder.test.ts:129](../../src/rules/ladder.test.ts#L129): a rung that really doesn't fit is tried again less and less often
- [src/rules/ladder.test.ts:147](../../src/rules/ladder.test.ts#L147): on frame time (no GPU timer), a frame keeping up with the refresh isn't slow, and only missed frames step down
- [src/rules/rules.test.ts:780](../../src/rules/rules.test.ts#L780): does not run while paused, and cuts long frames short

<a id="u9"></a>

## U9: Morning and post-night guidance

current rules; 9 tests; files take ~4 s.

Keep current morning order, bed gating, real kit/bag prerequisites and settled-win map/bed guidance. Waking is fixture preparation. The 28 October downward-pointing pin rule supersedes the hiding header; case 170 already tests current at-target and outside-house behavior. No obsolete test assertion found.

- [src/rules/guidance.test.ts:32](../../src/rules/guidance.test.ts#L32): none while she's still in bed
- [src/rules/guidance.test.ts:38](../../src/rules/guidance.test.ts#L38): a game's first morning, in Ed's order (2026-10-29): the dressing table (skin, hair), wardrobe, shoes, bags, the invitations, the cloak, her hat, her broom; then the decks
- [src/rules/guidance.test.ts:62](../../src/rules/guidance.test.ts#L62): the dressing table's step is done once she's used it: E there (its panel opened)
- [src/rules/guidance.test.ts:71](../../src/rules/guidance.test.ts#L71): no dressing pin after a night played: last night's clothes are in their pile; straight to the decks
- [src/rules/guidance.test.ts:77](../../src/rules/guidance.test.ts#L77): a game's first morning on a later load (no night played yet): no pile, so the dressing pins, her hat last on the hats' floor
- [src/rules/guidance.test.ts:88](../../src/rules/guidance.test.ts#L88): the invitations desk, then the lathe, each till it's done (Lima's pickups; skipped while they say done)
- [src/rules/guidance.test.ts:123](../../src/rules/guidance.test.ts#L123): the decks' pin goes with the party spell cast
- [src/rules/guidance.test.ts:148](../../src/rules/guidance.test.ts#L148): after a won night, once its finale's settled: the map table while there's an island she hasn't been to, even after the chart's opened; then the bed; shown from anywhere (Ed, 2026-10-26)
- [src/rules/guidance.test.ts:170](../../src/rules/guidance.test.ts#L170): stays the same off the treehouse (Ed, 2026-10-28: "Whatever pin you had before leaving the treehouse still shows"), and knows when she's at its target (where the pin stays, over it)

<a id="u10"></a>

## U10: Exact camera geometry and configuration

current rules; 4 tests; files take ~131 s.

Keep authored coast/stargazing bearings, treetop exclusion, configured zoom endpoints/exponent and calculated camera position. Fixed-target settling prepares comparison with specified configuration.

- [src/rules/coastCamera.test.ts:28](../../src/rules/coastCamera.test.ts#L28): lying down to stargaze, lower and closer still; getting up and walking off, back the same way
- [src/rules/coastCamera.test.ts:60](../../src/rules/coastCamera.test.ts#L60): over the treetops the coast leaves the camera alone
- [src/rules/rules.test.ts:463](../../src/rules/rules.test.ts#L463): uses each mode's angle and distance, and zoom moves between in and out
- [src/rules/rules.test.ts:496](../../src/rules/rules.test.ts#L496): sits south of and above what it looks at

## ui-menus-controls: ruling review

- Relaxed sea chart: the old comparison placed each island on its phase ring; Ed 12Oct in island.md says ‘the rings can be very relaxed, a pleasing layout is much more important’ and ‘the phase rings should hardly show’. chartLayout:42 checks ringAt for the comparison tool’s before panel, not the live chart. Keep it; U1 targets the separate live-layout statistics.
- Fixed interval replacement: DESIGN records old party.interval ‘5 minutes then1’ and 9Oct ‘Pure constant speed’. tuningPreset:15 copies a historical preset and explicitly notes the runtime no longer reads its interval. Its copy/unknown-preset/untouched-camera assertions protect compatibility, not retired wave pacing.
- Opening replacement: the sea chart came first20Oct; Ed 23Oct says ‘the first screen should be the witch waking up in her bedroom on the home island instead of the map’. Opening tests now check bedroom defaults plus documented opening=old/tool/resume exceptions. The old-decks comparison is expressly retained in house.md. End-card tests assert their26Oct removal.
- Familiars: creator.test.ts:48 supplies old familiar data and asserts removal under Ed 8Oct ‘Remove familiars’. It is migration protection. Controls tests assert the 29Oct swap back, L2 dodge and correct d-pad zoom; no removed face-button layout was found required.
- Nine beetle/shape-control cases are counted under art once, not UI twice. Report/replay cases already in S6 and identity/link cases already in W1/W6 remain there. U6’s36 owner-boundary tests are listing-only for 1609.
- Coordinator timing proposal 6566569947 refines U4: the report-integrity assertion remains blocking; only fixture scale and production-sized pressure reporting are proposed to change. Alternatives recorded by the coordinator include a looser per-test timeout.
- Second review 6566596996: Ed 6 October gradual coast transition still applies, but sampled comfort is distinct from direct correctness. Bedroom-first opening retains generic seated intro camera math. 28 October pin behavior supersedes the stale hidden-at-target header; current assertions already match it. No obsolete whole behavior test found.

## world-islands-lakes: review provenance

Two bounded source reviews are integrated: original 97-case partition plus 122 additional IDs (reports 6566078651/6566081354 and 6566275689/6566277162). Shared save/creature cases and owner-only listings are counted elsewhere once. No world runtime was executed. Six scenery declarations read in second house report 6566610514 are integrated here without duplicate membership.

<a id="w1"></a>

## W1: Campaign identity and map equivalence

hard limits; 21 tests; files take ~313 s.

Assertions compare identity, stable coast/shape, prepared/direct map equality, allowed species and connectivity. The roster case steps12/24 waves plus 20 s but only prohibits species outside the roster. It is not a win-rate target. Nearby mapPrep:59 prepared/direct continuation equality is another integrity check, not evidence to move the file. Lead additionally read heightSamples.test.ts:14/31/54: preserved quantized buffers, worker/direct rolling equality, immutable cache and malformed/NaN rejection. Its frozen hash is an extraction-parity baseline, with no later replacing terrain ruling established.

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

hard limits; 25 tests; files take ~88 s.

Forced toggles, knockout and displacement verify declared landing/shore/fence states. Routing must terminate within its bound without crossing water. Scripted3–90 s movement is boundary coverage rather than emergent survival statistics; beach poses are current interaction rules within this predominantly spatial-integrity group.

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

current rules; 27 tests; files take ~118 s.

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

outcome stats; 7 tests; files take ~200 s.

One pure distribution case and six mixed cases sample coast widths,5–120 finds/km, raggedness ratios, featured scenery≥6/10 islands, ruins mean>4, dolphin starts15–80/300 s, kraken rises>4/1500 s with<35% active share, or low-ground trees>1.3×high. Preserve direct placement, forbidden-scenery, equality and parameter assertions before moving those statistical components.

- [src/rules/beach.test.ts:43](../../src/rules/beach.test.ts#L43): varies in width round the coast (Ed, 2026-10-06: "more irregularly shaped"): wide bays, narrows, rocky stretches
- [src/rules/beachDecor.test.ts:16](../../src/rules/beachDecor.test.ts#L16): lie on the sand, clear of the woods' edge and out of the sea, sparsely, the same for the same seed
- [src/rules/islandGrowth.test.ts:45](../../src/rules/islandGrowth.test.ts#L45): more irregular phase by phase (Ed, 2026-10-11): home near-round, phase 5 strongly irregular
- [src/rules/rules.test.ts:1851](../../src/rules/rules.test.ts#L1851): leaves out the cut scenery, keeps the playground, and puts the featured scene on most islands
- [src/rules/seaLife.test.ts:15](../../src/rules/seaLife.test.ts#L15): leaps dolphins off the east coast only, in the water north of her, now and then
- [src/rules/seaLife.test.ts:27](../../src/rules/seaLife.test.ts#L27): raises the kraken off the west coast only, rarely, beside or north of her and out in the water
- [src/rules/terrain.test.ts:31](../../src/rules/terrain.test.ts#L31): grows trees thicker in the low ground than on the high

<a id="w5"></a>

## W5: Map resource and test-helper budgets

hard limits; 4 tests; files take ~77 s.

The existing hydration guard uses best-of-two measurements over four tuples: each hydration below generation time and summed hydration below 0.6×generation. Small-world helpers must clone tuning, give a reason and preserve separate largest-world coverage. The snapshot<4M-character guard is already S2 on the saves page and is not counted again here.

- [src/rules/mapPrep.test.ts:65](../../src/rules/mapPrep.test.ts#L65): is never slower to make than the map itself (Ed's laptop, 2026-10-20): hydrating takes well under generating, home's island too
- [src/test/worlds.test.ts:7](../../src/test/worlds.test.ts#L7): shrinks only a cloned test map without mutating shared production/test tuning
- [src/test/worlds.test.ts:15](../../src/test/worlds.test.ts#L15): requires an answerable reason rather than silently choosing a small world
- [src/test/worlds.test.ts:18](../../src/test/worlds.test.ts#L18): keeps largest-shipped-world area diversity coverage separate from small logic fixtures

<a id="w6"></a>

## W6: Links, travel and explicit transition rules

current rules; 13 tests; files take ~91 s.

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

<a id="w7"></a>

## W7: Procedural field and scenery quality

outcome stats; 7 tests; files take ~131 s.

Seven bodies measure generated area-size spread, forest dense/open/gradient shares, type diversity, openness-band tree density, the deliberately reduced-density count, layout-pattern shares and path departure from a straight line. No save/replay/water/exclusion assertion occurs inside these quality-only bodies. These are procedural quality measurements, not seven fight simulations.

- [src/rules/layoutPatterns.test.ts:27](../../src/rules/layoutPatterns.test.ts#L27): glades are the inverse of groves' idea (holes in a full wood), hedges thin lines, a grid rows crossing rows
- [src/rules/rules.test.ts:183](../../src/rules/rules.test.ts#L183): varies area sizes more with areaSizeVariance, keeping 20 x 20 areas
- [src/rules/rules.test.ts:200](../../src/rules/rules.test.ts#L200): is a forest with clearings: mostly dense woods, open ground in distinct clearings (their edges softened round each area's arena: Ed, 2026-10-05)
- [src/rules/rules.test.ts:218](../../src/rules/rules.test.ts#L218): uses many area types
- [src/rules/rules.test.ts:259](../../src/rules/rules.test.ts#L259): are denser away from each area's centre, from an open clearing outward
- [src/rules/rules.test.ts:296](../../src/rules/rules.test.ts#L296): follow the tree density setting
- [src/rules/rules.test.ts:1140](../../src/rules/rules.test.ts#L1140): meander: no path is a ruler-straight line

<a id="w8"></a>

## W8: Mixed procedural quality and world integrity

outcome stats; 29 tests; files take ~182 s.

Twenty-nine cases combine sampled density, variety, correlations, ring shapes, street proximity and route diversity with direct world protection. Keep coast separation, nonnegative masks, water/path/floor/clearing exclusions, current allowed/removed content, per-object counts, exact seed/chunk equality, configuration endpoints and exercised nonempty coverage. mapShape53’s >90% numerical boundary agreement is retained GEOMETRY CORRECTNESS, not demoted with its aesthetic headland ratio.

- [src/rules/archipelago.test.ts:22](../../src/rules/archipelago.test.ts#L22): grows each island in its patch: home and its nearest neighbours' coasts never meet, a strait apart, and close enough to read as fitted
- [src/rules/beachDecor.test.ts:35](../../src/rules/beachDecor.test.ts#L35): put rocks on the rocky stretches, and trails of footprints that wander on and fade out
- [src/rules/bufferClearings.test.ts:15](../../src/rules/bufferClearings.test.ts#L15): `only playable areas clear an arena or a soundsystem's room (seed ${seed}, ${island}${islandAreas ? `, ${islandAreas} areas` : ""})`
- [src/rules/groundcover.test.ts:19](../../src/rules/groundcover.test.ts#L19): rings ponds with reeds and keeps the water clear
- [src/rules/groundcover.test.ts:30](../../src/rules/groundcover.test.ts#L30): keeps clear of trunks and grows thicker round their feet
- [src/rules/lakeShore.test.ts:16](../../src/rules/lakeShore.test.ts#L16): dresses each look with its own pieces, along its shore, off the paths and out of the clearings, the same every time
- [src/rules/lakeShore.test.ts:30](../../src/rules/lakeShore.test.ts#L30): dresses nothing round plain water, and lights only lava
- [src/rules/layoutPatterns.test.ts:18](../../src/rules/layoutPatterns.test.ts#L18): are the eleven art/areas.js names, each about 1 on average over an area
- [src/rules/layoutPatterns.test.ts:22](../../src/rules/layoutPatterns.test.ts#L22): each shaped one varies over the area, never below 0, and reads unlike every other (correlation under 0.8)
- [src/rules/mapShape.test.ts:53](../../src/rules/mapShape.test.ts#L53): has a coast round its areas' borders (Ed, 2026-10-11): the land the playable areas and the buffer's, the sea the rest
- [src/rules/rosters.test.ts:44](../../src/rules/rosters.test.ts#L44): deals 1 in 5 areas' legends a night from the roster, never its own kind, no two alike, the ones not found first
- [src/rules/rules.test.ts:65](../../src/rules/rules.test.ts#L65): gives different areas from a different seed
- [src/rules/rules.test.ts:80](../../src/rules/rules.test.ts#L80): puts most areas' own site inside them, and every site is fully open
- [src/rules/rules.test.ts:301](../../src/rules/rules.test.ts#L301): carry their area's type, with a ragged edge: strays only near a border
- [src/rules/rules.test.ts:766](../../src/rules/rules.test.ts#L766): show in a few of the areas whose type has one, never in the others
- [src/rules/rules.test.ts:1049](../../src/rules/rules.test.ts#L1049): varies: dense patches, sparse patches and lone trees, never just two states
- [src/rules/rules.test.ts:1063](../../src/rules/rules.test.ts#L1063): keeps every area's fighting arena open, its edge soft (Ed, 2026-10-05): no tree in its middle, the woods thickening gradually through its band, and back beyond it
- [src/rules/rules.test.ts:1110](../../src/rules/rules.test.ts#L1110): are few with the game's own numbers: at most one railway (and its branch), far fewer footpaths, streams as before
- [src/rules/rules.test.ts:1121](../../src/rules/rules.test.ts#L1121): have two to four railway lines crossing many areas, a road or two, and paths between areas
- [src/rules/rules.test.ts:1131](../../src/rules/rules.test.ts#L1131): keep one kind for their whole length: each line carries the area it starts in (Ed, v160)
- [src/rules/rules.test.ts:1148](../../src/rules/rules.test.ts#L1148): keep their corridors clear of trees (but for a few on broken railway) and bushes, with bushes thick along the edges
- [src/rules/rules.test.ts:1172](../../src/rules/rules.test.ts#L1172): carry 3D pieces: railway landmarks and signals, bridges over streams; trees keep clear of them
- [src/rules/rules.test.ts:1200](../../src/rules/rules.test.ts#L1200): are scattered sparsely, all three families, never on a path, in a central clearing or by the dancefloor
- [src/rules/rules.test.ts:1221](../../src/rules/rules.test.ts#L1221): lay out a handful of playgrounds and sports grounds per map, each in a clearing of its own
- [src/rules/rules.test.ts:1231](../../src/rules/rules.test.ts#L1231): scatter modern relics rarely, more of them by the roads and railways, never on a path
- [src/rules/rules.test.ts:1513](../../src/rules/rules.test.ts#L1513): keeps off paths, the dancefloor's clearing and cleared ground, in each area's own kinds
- [src/rules/rules.test.ts:1524](../../src/rules/rules.test.ts#L1524): is thick where the area says (grassland) and thin where it doesn't (the jungle cave), and none at density 0
- [src/rules/rules.test.ts:1621](../../src/rules/rules.test.ts#L1621): set the shrine's henge stones in circles, not an even field
- [src/rules/zooMap.test.ts:20](../../src/rules/zooMap.test.ts#L20): puts every kind's island at its chart place, size areas across, no two closer than the gap, the typical street about street (Ed: "too small and too far apart")

<a id="w9"></a>

## W9: World continuation, placement and explicit modes

current rules; 79 tests; files take ~603 s.

Seventy-nine tests protect matched prepared/direct moving state, corrupt-prep rejection, roster/save coherence, shore-safe routing, protected runestone ground, arrival step bounds, forest cache/query ordering and zoo transitions. A600 s route escape bound checks every walked/drawn segment stays ashore; a40 s flight checks coast containment. Numerical geometry/query-effectiveness and coverage bounds remain integrity/current rules, not generic sampled appearance scores.

- [src/rules/areaRenames.test.ts:12](../../src/rules/areaRenames.test.ts#L12): leaves no old id among the areas, and maps each to one that is
- [src/rules/areaRenames.test.ts:32](../../src/rules/areaRenames.test.ts#L32): loads a save from before the renames whole (saves keep kinds, never area ids)
- [src/rules/arrive.test.ts:11](../../src/rules/arrive.test.ts#L11): flies on from the chart's own camera, down low over the forest, up to frame the dancefloor and the Ent's spot, and down to her decks
- [src/rules/arrive.test.ts:44](../../src/rules/arrive.test.ts#L44): waits out the heavy first frames behind the still and then flies in full, a stall holding the flight, never skipping it (Ed's playtest, 2026-10-12: "froze for about ten seconds, and then cut straight to the witch on the decks")
- [src/rules/arrive.test.ts:66](../../src/rules/arrive.test.ts#L66): counts the land along the dive's track, south of the treehouse, nearer than the land north of it
- [src/rules/arrive.test.ts:82](../../src/rules/arrive.test.ts#L82): sees what's ahead of the camera and not what's behind or off to the side, and finds when the house comes on screen
- [src/rules/arrive.test.ts:103](../../src/rules/arrive.test.ts#L103): comes round to the whole tree, its foot, top and sides on screen, between the frame and her decks, by the tree as measured
- [src/rules/beach.test.ts:158](../../src/rules/beach.test.ts#L158): lie on the sand, left alone while she's away, and chat, hold hands, hug and stargaze with her when she lands by them
- [src/rules/deal.test.ts:18](../../src/rules/deal.test.ts#L18): puts the own kind first and keeps every kind apart, whatever the deck that allows it
- [src/rules/deal.test.ts:31](../../src/rules/deal.test.ts#L31): matches as many legends to legend areas as can be
- [src/rules/deal.test.ts:40](../../src/rules/deal.test.ts#L40): deals every playable island by Ed's three rules, its legends beside their kind
- [src/rules/deal.test.ts:67](../../src/rules/deal.test.ts#L67): keeps every soundsystem off the paths made for the dealt types
- [src/rules/forestChunks.test.ts:11](../../src/rules/forestChunks.test.ts#L11): returns the same %s, in the same order, cold and cached
- [src/rules/forestChunks.test.ts:23](../../src/rules/forestChunks.test.ts#L23): can pause a query while another caller uses the same caches
- [src/rules/groundcover.test.ts:45](../../src/rules/groundcover.test.ts#L45): has the cell the view asks for at a point hold the tufts round that point
- [src/rules/homeArea.test.ts:15](../../src/rules/homeArea.test.ts#L15): `seed ${seed}`
- [src/rules/homeArea.test.ts:34](../../src/rules/homeArea.test.ts#L34): `seed ${seed}`
- [src/rules/homeArea.test.ts:56](../../src/rules/homeArea.test.ts#L56): looks like home's meadow inside, like its own type outside, and grows no trees, bushes or scenery
- [src/rules/homeArea.test.ts:74](../../src/rules/homeArea.test.ts#L74): isn't counted as a neighbour's type: home's rolled type may sit next to its own kind
- [src/rules/island.test.ts:18](../../src/rules/island.test.ts#L18): is home and exactly that many areas grown from home (its phase's shape: rules/islandGrowth.ts), with everything for play inside her flight
- [src/rules/islandGrowth.test.ts:56](../../src/rules/islandGrowth.test.ts#L56): gives the sea chart and the dreams the real outline: the map's own coast, round home
- [src/rules/islandShape.test.ts:13](../../src/rules/islandShape.test.ts#L13): draws each kind's coastline the same every time, its own, within the coast's reach, sized by phase
- [src/rules/lakes.test.ts:128](../../src/rules/lakes.test.ts#L128): a leashed animal travelling to her across a lake (Ed, 2026-10-12) walks round its shore, never on the water, and its drawn route is where it goes
- [src/rules/lakes.test.ts:162](../../src/rules/lakes.test.ts#L162): islandOutline gives a lake's shore as a loop of its own (not the sea's), inside the coast
- [src/rules/land.test.ts:20](../../src/rules/land.test.ts#L20): knows how far from the water any point is, to well under a metre near the coast
- [src/rules/land.test.ts:30](../../src/rules/land.test.ts#L30): finds the nearest point of the coast, and the way out to the water from it
- [src/rules/land.test.ts:43](../../src/rules/land.test.ts#L43): walks round a loop: `along` comes back to the start after its length
- [src/rules/land.test.ts:49](../../src/rules/land.test.ts#L49): is the sea off the grid, deeper the further off
- [src/rules/mapPrep.test.ts:59](../../src/rules/mapPrep.test.ts#L59): plays the same game: its moving state after a few seconds' play
- [src/rules/mapPrep.test.ts:77](../../src/rules/mapPrep.test.ts#L77): is only made from a sound prep: one cut short or from other code is caught (app/mapPrep.ts makes the map afresh)
- [src/rules/mapPrep.test.ts:87](../../src/rules/mapPrep.test.ts#L87): is the boot's own map too (app/mapPrep.ts startBootMapPrep): the tuning as the page has it, home grown by islands found, and the radius map
- [src/rules/mapShape.test.ts:20](../../src/rules/mapShape.test.ts#L20): `about 96 playable areas, home among them, everything placed for play inside the buffer (seed ${seed})`
- [src/rules/mapShape.test.ts:73](../../src/rules/mapShape.test.ts#L73): ?shape=square: the old 14 x 14 square, exactly
- [src/rules/mapShape.test.ts:90](../../src/rules/mapShape.test.ts#L90): is the coast: kept in, whichever way she goes
- [src/rules/mapShape.test.ts:106](../../src/rules/mapShape.test.ts#L106): is soft: her speed outward eases off over its band, and she drifts back in when she lets go
- [src/rules/pointFeatures.test.ts:18](../../src/rules/pointFeatures.test.ts#L18): Ed's map (seed 871136): no runestone and legend on one spot in the Old pinewood
- [src/rules/pointFeatures.test.ts:25](../../src/rules/pointFeatures.test.ts#L25): `over ${SEEDS.length} seeds (Ed's among them): every area owns its runestone's ground; no legend near a runestone; circles clear of runestones, each other and relics`
- [src/rules/roster.test.ts:31](../../src/rules/roster.test.ts#L31): home at a campaign's start: every creature made over a night is one of its ten kinds (no flyers, no insects)
- [src/rules/roster.test.ts:50](../../src/rules/roster.test.ts#L50): home grows with the kinds found (Ed, 2026-10-10): a campaign that found the owl's island has an owl area at home, and nothing else new
- [src/rules/rosters.test.ts:66](../../src/rules/rosters.test.ts#L66): plays a kind's island from its own seed and size: its areas the roster's, a legend in an area of each kind dealt
- [src/rules/rosters.test.ts:82](../../src/rules/rosters.test.ts#L82): plays home by default: one area per kind she knows, two legends a night among them
- [src/rules/rosters.test.ts:90](../../src/rules/rosters.test.ts#L90): has the game's legends the night's dealt kinds, favouring islands not yet found
- [src/rules/rosters.test.ts:125](../../src/rules/rosters.test.ts#L125): never puts a placeholder on any island's roster, deals one as a legend, or plays a placeholder's island
- [src/rules/rules.test.ts:56](../../src/rules/rules.test.ts#L56): gives the same areas from the same seed
- [src/rules/rules.test.ts:72](../../src/rules/rules.test.ts#L72): keeps a point's area stable however often or in whatever order it is asked
- [src/rules/rules.test.ts:91](../../src/rules/rules.test.ts#L91): with no layers is plain Voronoi: every point goes to its nearest site
- [src/rules/rules.test.ts:103](../../src/rules/rules.test.ts#L103): matches the Witch Art Lab's makePartition point for point
- [src/rules/rules.test.ts:121](../../src/rules/rules.test.ts#L121): says how far a point can move and surely stay in its area (cellSafe), and is right about it
- [src/rules/rules.test.ts:138](../../src/rules/rules.test.ts#L138): is a circle of about mapAreas x mapAreas areas with every area type (Ed's 30 and any recipes)
- [src/rules/rules.test.ts:144](../../src/rules/rules.test.ts#L144): never gives two touching areas the same type
- [src/rules/rules.test.ts:160](../../src/rules/rules.test.ts#L160): finds no touching same-type areas even when sampled more finely than it was built
- [src/rules/rules.test.ts:169](../../src/rules/rules.test.ts#L169): is the same map from the same seed, and another from another
- [src/rules/rules.test.ts:176](../../src/rules/rules.test.ts#L176): puts each area's centre where the partition does, through the size warp
- [src/rules/rules.test.ts:224](../../src/rules/rules.test.ts#L224): puts the dancefloor in the clearing of the middle area, the treehouse by it, where the witch starts
- [src/rules/rules.test.ts:247](../../src/rules/rules.test.ts#L247): reads seeds from the URL: numbers as they are, words hashed
- [src/rules/rules.test.ts:279](../../src/rules/rules.test.ts#L279): leave the dancefloor clear, crowns and undergrowth included
- [src/rules/rules.test.ts:289](../../src/rules/rules.test.ts#L289): come out the same whichever patch is asked for first
- [src/rules/rules.test.ts:1100](../../src/rules/rules.test.ts#L1100): keeps the dancefloor clear of every tree
- [src/rules/rules.test.ts:1117](../../src/rules/rules.test.ts#L1117): are seeded: the same map makes the same network
- [src/rules/rules.test.ts:1190](../../src/rules/rules.test.ts#L1190): stop at the edge of clearings, so they never run under the dancefloor or a set piece
- [src/rules/rules.test.ts:1245](../../src/rules/rules.test.ts#L1245): stand at most one per area
- [src/rules/rules.test.ts:1510](../../src/rules/rules.test.ts#L1510): is seeded per cell: the same patch every time
- [src/rules/rules.test.ts:1632](../../src/rules/rules.test.ts#L1632): are the same every time and keep off paths and the reserved spots
- [src/rules/stoneKeepClear.test.ts:50](../../src/rules/stoneKeepClear.test.ts#L50): `nothing on Ed's list lies in a stone's keep-clear zone (${name}, seed ${seed})`
- [src/rules/stoneKeepClear.test.ts:61](../../src/rules/stoneKeepClear.test.ts#L61): the zone follows its knob
- [src/rules/terrain.test.ts:16](../../src/rules/terrain.test.ts#L16): `seed ${seed}: every runestone on a rise, every legend clearing in a hollow`
- [src/rules/zoo.test.ts:17](../../src/rules/zoo.test.ts#L17): has every area type in one row, each row by its swarm class (light, medium, strong), the undesigned kinds as '?' blocks
- [src/rules/zoo.test.ts:35](../../src/rules/zoo.test.ts#L35): lays its paths along every border and puts a crossing at every corner
- [src/rules/zoo.test.ts:43](../../src/rules/zoo.test.ts#L43): gives every block its group, calm, and its legend asleep in its clearing
- [src/rules/zooCoast.test.ts:23](../../src/rules/zooCoast.test.ts#L23): keeps the chart's biggest sea loop, evenly spaced, its longer side 1 across, centred on its box
- [src/rules/zooFence.test.ts:60](../../src/rules/zooFence.test.ts#L60): a dodge on foot never jumps a fence
- [src/rules/zooFence.test.ts:67](../../src/rules/zooFence.test.ts#L67): keeps every creature not hers inside its island's fence, whatever pushed it out
- [src/rules/zooFence.test.ts:86](../../src/rules/zooFence.test.ts#L86): has no treehouse: she starts standing in the Ent's circle at the middle, no deck (Ed, 2026-10-26)
- [src/rules/zooFence.test.ts:92](../../src/rules/zooFence.test.ts#L92): E at the little treehouse north of the Ent's circle takes her out of the zoo; E anywhere else doesn't (Ed, 2026-10-26)
- [src/rules/zooFence.test.ts:100](../../src/rules/zooFence.test.ts#L100): walking or flying on out against the zoo's edge, over the waterfall, takes her out of it too (Ed, 2026-10-26)
- [src/rules/zooMap.test.ts:41](../../src/rules/zooMap.test.ts#L41): ?all (found "*", the map's see-all): every island its kind's area; the rest of the ground home's (the plaza and the streets)
- [src/rules/zooMap.test.ts:59](../../src/rules/zooMap.test.ts#L59): keeps the plaza and the streets bare (no tree, no scenery) and every creature on its own island, its own kind
- [src/rules/zooMap.test.ts:76](../../src/rules/zooMap.test.ts#L76): lays each legend's clearing at its island's middle, sized as play sizes it but to the zoo's cap, its runestone by the south shore
- [src/rules/zooMap.test.ts:92](../../src/rules/zooMap.test.ts#L92): with a fresh save, only the kinds she knows are areas; every other island is its lake, with no creature on it

<a id="w-r2-1"></a>

## W-R2-1: Scenery abundance observations

outcome stats; 3 tests; files take ~131 s.

Keep structural validity, exclusions, reproducibility, ownership, eligibility, identity and existing upper bounds blocking. Report only sampled minimum density, numerical variation, abundance and diversity. Exact assertion dispositions and ruling review: PR #1632 comment 6566610514.

- [src/rules/rules.test.ts:1257](../../src/rules/rules.test.ts#L1257): no ruin, freak tree, relic, set piece or grounds arrangement appears twice, over 5 seeds
- [src/rules/rules.test.ts:1270](../../src/rules/rules.test.ts#L1270): places scenes, each at most once, in areas they suit, off the paths and clear of the gameplay (Ed, 2026-10-04)
- [src/rules/rules.test.ts:1294](../../src/rules/rules.test.ts#L1294): give each set piece to one area only, which has room for it

<a id="w-r2-k1"></a>

## W-R2-K1: Scenery footprint, stairs and paths

current rules; 3 tests; files take ~131 s.

Read in the second house pass and displayed here once: footprint size, stairs only in suitable areas and clear paths. These are direct placement and geometry contracts.

- [src/rules/rules.test.ts:1286](../../src/rules/rules.test.ts#L1286): gives each scene a footprint at least the art's own
- [src/rules/rules.test.ts:1290](../../src/rules/rules.test.ts#L1290): stairs stand only by ravines, rocky slopes, cave mouths and stone shrines
- [src/rules/rules.test.ts:1306](../../src/rules/rules.test.ts#L1306): keep soundsystems and set pieces off the paths, so paths run on unbroken

## world-islands-lakes: ruling review

- Set-piece supersession: DESIGN.md Ed 3Oct says ‘Set pieces are rare bits of scenery’. world-art.md Ed 29Oct says ‘phased out of normal generation (setPieceChance0)’ with recipes/art retained for previews. rules.test.ts:1851 asserts setPiecesNear=[] and paths.pieces=[]: retain those replacement guards and split only statistical scenery thresholds. lakes.test.ts:61 conditionally checks returned set-piece positions; mapPrep closure equality does not require one to spawn. No positive old-generation requirement was found in the 97 reviewed tests.
- Home-growth supersession: journey backlog Ed 10/11Oct says first10 areas’ ‘places and their kinds’ remain the same; island.md Ed 28Oct says ‘keep the route changing, shuffle the creatures and area types, retain the area shapes’. deal.test.ts:54 requires changed type deals with stable shapes; homeGrowth.test.ts:24 compares cell keys and sorted roster, not type-at-cell. They implement the replacement. The rosters comment saying the night ‘only deals its legends’ is stale explanation, not a reason to delete its count/coast protection.
- Placeholder supersession: journey backlog Ed 11Oct describes32 kinds and 32 placeholders; island.md now says all 64 designed. rosters.test.ts:115 still checks64 valid island descriptors; its old placeholder title is stale, while rejecting unknown-01 remains legacy-ID safety. Neither that title nor the 64-designed statement proves flora RETHEMING exclusions obsolete.
- G3 review limits: floraBiomes.test.ts:31 excludes11 RETHEMING IDs under a comment saying17; an art/data owner must confirm those exclusions. lakeLooks.test.ts:40 returns early if its sampled island has no lake. These are specific coverage-strengthening candidates, not established obsolete whole tests. This bounded review confirmed zero obsolete whole tests.
- Timing overlaps: mapPrep, beach, beachDecor, islandGrowth, homeGuard, lakes, island, terrain and win appear in multiple groups. File durations include other tests and other systems. No group-time sum is a wall-time or savings estimate.
- Second-pass set-piece evidence: rules.test.ts40–43 explicitly enables setPieceChance=.25, grounds/decor families and path pieces; stoneKeepClear14–16 opts in too. This is retained preview/placement compatibility under the 29Oct phase-out, not a positive requirement for normal generation. Keep exclusion/placement rules; report only sampled quality portions.
- Legacy zoo grid: old zoo.ts helpers draw borders/corners of a grid; island.md21 replaces the live zoo with chart-shaped islands26Oct. map.ts creates zooChartPlan, paths.ts omits grid strips with that layout, and the live map omits grid junctions. zoo35 directly tests retained zooPlan helpers, while the plan still supplies current jump-list rows. No live-grid requirement or helper-retirement permission is established.
- Radius/square compatibility is explicit: island.md13 retains island=off and test/radiusMap sets islandAreas0. mapShape73 selects square intentionally; islandShape13 tests a still-used helper, while islandGrowth56 compares real outlines. Treehouse rules224 already asserts north-west after 24Oct; no due-north-only assertion was found.
- Owner-only second-pass listings: island49 master swarm curve belongs to1622. IslandShape9/24 and lakeShore38 are visual source tests; rules237 is house/input; rules1642/1653 are spawn-marker/replacement-rune party policy. They receive no automatic keep decision from the world reviewer and remain explicitly unread until an owner/lead review is recorded.
- Set-piece follow-up to coordinator 6566615533: rules.test.ts:40–43 explicitly overrides GAME_TUNING with setPieceChance:0.25, enabled grounds, ruins/rocks/freak mix, path pieces and scenes.featured:undefined, disabling the featured exception while leaving ordinary scenes enabled. The five maps at 1253 use that TUNING. Therefore set-piece uniqueness (1257), assignment/count (1294) and path clearance (1306) explicitly opt into retained compatibility scenery; none requires default normal play to spawn set pieces. Ed 29 October phases normal generation out, while recipes/art remain for comparisons (world-art.md:11–12,39). Scenes/ruins remain documented features, and this fixture explicitly enables their full placement. Keep/split as proposed; no proven leftover.
- House reviewer clarification 6566750463 confirms all six cases explicitly use local compatibility TUNING; current GAME_TUNING defaults are checked separately at rules.test.ts:1847–1864. Three mixed cases remain split proposals, three remain keeps, zero proven leftovers.
