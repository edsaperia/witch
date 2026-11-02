# C1 creatures behaviour split

Approved scope: Ed's audit ruling1632#6576776394; priority1632#6577541796 (W8, IP2, C1), resumed after W8 closed with no fix in6578939962. Own branch `codex/behaviour-creatures`, worktree `work/behaviour-creatures`, draft PR into `claude/prototype`. Exact base c7b1f99303970a62ec9f9816b5ad5fd97508d20f. No production, tuning, combat, MP or player text edits. Canonical combines/releases; root watches CI.

## Exact owned manifest

Audit IDs refer to73741aa8 declarations, reconciled by current titles. Fifteen callbacks across ten files; all other callbacks stay untouched. No entire mixed declaration is deleted.

| Audit case | Current title / reported outcome | Blocking protection / replacement |
|---|---|---|
| babies:120 | one far off (200 m, out of sight) is back with her in seconds; original200m/10s run and arrival<8s | controlled catch-up update: finite valid movement, identity/leash conservation and configured catch-up behavior; other baby trail/scatter/feed/weight cases unchanged |
| berries:38 | every area has perArea berries, one per bush, and the same seed gives the same berries; area coverage and >.9 lower-bound share | berry/bush indexing, one berry per bush, nonempty per-area configured bounds and exact same-seed bushes/berries |
| berries:124 | bushes grow in patches: each bush has others of its patch close by; >.9 neighbour share | nonempty finite/indexed berry/bush data and seed identity; existing direct feed/conservation cases unchanged |
| glide:12 | glides to its far spots (held still through its pause, then sailing there), and only gliders do;120s glide/landing counts | explicitly supplied leap start/mid/landing, paused movement flag, configured per-step speed and endpoint; only gliders have profiles |
| growth:25 | picks each grown creature's level by the weights, the same from the same seed;800 draws27-40% each | returned levels valid, exact seed replay and both forced adult/baby weights; C2 bookkeeping/materialization untouched |
| naps:35 | has some of an area's idlers asleep at a time, not all, each for a while, with her in the treetops; never a legend;120s nap/wake counts | supplied eligible/ineligible sleepers, boss exclusion and direct nap/wake state updates; other ground/area/off/party-over nap cases unchanged |
| naps:129 | is asleep most of the time, getting up now and then, with her away from its circle;300s share>.6/stirs | supplied circle-baby nap/wake eligibility and valid state; adjacent circle proximity gate unchanged |
| rules:551 | roam their whole area, slowly, and never leave it; original5-creature grid coverage>.4 and scaled40-minute window | direct configured step-speed bounds and area containment using exercised boundary/target states; remove the long grid-count loop from blocking, retain it unchanged in report |
| rules:1581 | leaves the witch several times faster than any creature, the fast few rare, legends slowest; fast-species share<.15 | direct configured witch/creature speed ordering and legend ordering; nonempty population |
| simLod:75 | far from her and the action they march coarsely, at their marching pace, and come into full near the soundsystem;30s progress/120s arrival | initial coarse classification plus controlled relocation into action range and immediate full transition; direct configured march pace/scheduling; other LOD/hysteresis comparisons unchanged |
| spacing:40 | keeps her party from bunching as they follow her; minimum normalized gap>.6 after6s | supplied following members retain identity, leash membership, finite positions and bounded spacing updates; other body-size/push/legend contracts unchanged |
| stoneIdle:33 | they start and roam in a loose cluster round it, never on it; babies, legends and the circle's baby as before;120s outside/centre/quartile/baby-far shares | direct idlesAtStone eligibility and supplied in-area targets, no-cross-area geometry; original largest-world sample only in report |
| stoneIdle:52 | a friendly area's creatures, and every creature with stoneIdle off, roam the whole area as before;60s far shares | direct friendly/disabled/baby/legend/circle exclusions and valid in-area target selection |
| win:173 | the win: the dealt legends woken and home (an enraged one lulled), everyone else in the conga, her leash let go, nothing fighting; the islands found only tonight's quests' (Ed, 2026-10-18); then the card;40s convergence | victory/quest/find/lost/legend/leash/state/unique membership/flare/settlement gates remain; direct congaPlace/legendPlaces geometry retains configured layout without sampled convergence deadlines |
| win:307 | on the ground in the home area the line files after her along where she's walked, its leader followLead behind her;30s leader/trail/gap convergence | original per-step congaFollows gate and conservation/valid trail geometry; direct configured trailPlaces geometry; other stop/treetop/out-of-home/no-leash cases untouched |

## Latest merged combat review

Read merged #1654, including ece189758 and577922f78 on basec7b. Its controlled baby-scatter callback/imports in `babies.test.ts` are outside the owned120 case and remain byte-identical. Its combat/wildWatch/bot fixtures, waiting paths, movement profiles, benchmark declarations and bot-outcomes tool stay untouched. C1 fixtures call existing public leash/creature/LOD/win geometry interfaces and do not substitute old waiting/combat behavior. Current runtime/tuning supplies the reports; legacy modes are copied only where the original C1 fixture explicitly used them.

## Implementation and validation

Add separate `creatures-placement.behaviour.ts` (six declarations), `creatures-motion.behaviour.ts` (five) and `creatures-finale.behaviour.ts` (four). Copy original seeds/full-or-small/largest maps, windows, cadence and sample algorithms, reporting actual numerators/denominators alongside historical references. Add supplied contract fixtures where an outcome loop currently supplies incidental branch coverage. No generated world/replay, heavy actor simulation, browser or full suite on the laptop. Run normal/report typechecks and tiny supplied fixtures/report harness; own CI handles generated coverage.

Verify the exact15 callback changes and all untouched callback identities using an AST comparison with CRLF normalization. List every added/changed/removed test and reason in REPORT/FINAL, with no player-visible text changed. No savings claim from a single pair: coordinator6578939962 requires medians across at least two runs on each side; timing envelopes/import/hook limits remain explicit.

Integration keeps base music/world/world-rules registrations. Canonical's combination must also retain IP2#1663's two invite providers and T6#1667's replay/fixture hookup. Neither pending source branch is silently used as a base. Independent report limits/quiet scheduling/release isolation remain unchanged; actual new-provider cloud execution is separately reported after canonical dispatch, not inferred from CI.
