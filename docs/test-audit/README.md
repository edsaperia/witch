# Test audit decisions


## One yes/no list for Ed

Answer by ID. Changes come first; each linked page explains what yes preserves and changes. Released combat changes are already decided; remaining combat and multiplayer listings stay with their owners.

### Proposed changes

- **L3 — Move these eight scenery, travel and quest-distribution tests out of release gates?** 8 tests. [legends](legends.md#l3).
- **L5 — Replace the exact list of eleven giant species with a report of which legends currently overflow?** 1 test. [legends](legends.md#l5).
- **AR1 — Move these five sampled frequency/variety thresholds to nightly reports?** 5 tests. [Art and rendering checks](art-rendering.md#ar1).
- **AR2 — Split these seven mixed tests so density, averages, frequency and smoothness become nightly reports?** 7 tests. [Art and rendering checks](art-rendering.md#ar2).
- **AR4 — Move sampled appearance shares and long-run variety to nonblocking reports while keeping direct visual rules, geometry, caps, fades and replay blocking?** 7 tests. [Art and rendering checks](art-rendering.md#ar4).
- **C1 — Split these mixed tests so sampled movement, sleep, spacing, distribution and convergence thresholds become nonblocking reports?** 15 tests. [Creatures and movement](creatures-movement.md#c1).
- **H1 — Split these three travel tests so their time/proximity observations become nonblocking reports?** 3 tests. [House and treehouse](house-treehouse.md#h1).
- **H2 — Update these three historical descriptions while keeping every assertion?** 3 tests. [House and treehouse](house-treehouse.md#h2).
- **H-R2-1 — Split sampled canopy density and find diversity into nonblocking reports while preserving the blocking protections?** 8 tests. [House and treehouse](house-treehouse.md#h-r2-1).
- **H-R2-2 — Correct three obsolete Workshop descriptions while preserving every assertion?** 3 tests. [House and treehouse](house-treehouse.md#h-r2-2).
- **IP1 — Move these eleven observed motion, occurrence and bot-success thresholds to nonblocking nightly/manual reports?** 11 tests. [Invites and party](invites-party.md#ip1).
- **IP2 — Split these twenty-one mixed tests into blocking direct rules and nonblocking sampled measurements?** 21 tests. [Invites and party](invites-party.md#ip2).
- **M4 — Make these three rate/proportion tests informational?** 3 tests. [Music and audio](music-audio.md#m4).
- **M5 — Update these two test descriptions to the current knockdown design?** 2 tests. [Music and audio](music-audio.md#m5).
- **T6 — Ask the report/combat owner to separate fixture-sanity predicates from this replay test?** 1 test. [Tools and CI](tools-ci.md#t6).
- **U1 — Split these three tests so sampled throw/hit and chart-distribution targets run as nonblocking reports?** 3 tests. [UI, menus and controls](ui-menus-controls.md#u1).
- **U-TIME — Keep the report-integrity checks with a smaller blocking fixture and move production-sized pressure to a nonblocking report?** 1 test. [UI, menus and controls](ui-menus-controls.md#u-time).
- **U7 — Split or replace sampled camera comfort and travel magnitudes while retaining or supplying direct pose, continuity and movement/follow protections?** 5 tests. [UI, menus and controls](ui-menus-controls.md#u7).
- **W4 — Split these seven mixed tests so scenery-density and event-frequency targets become nightly reports?** 7 tests. [World, islands and lakes](world-islands-lakes.md#w4).
- **W7 — Move these seven procedural-quality measurements to nightly/manual reports?** 7 tests. [World, islands and lakes](world-islands-lakes.md#w7).
- **W8 — Split these twenty-nine tests so only procedural density/variety/shape targets become reports?** 29 tests. [World, islands and lakes](world-islands-lakes.md#w8).
- **W-R2-1 — Report sampled scenery abundance while retaining uniqueness, suitability, clearance and valid placement checks?** 3 tests. [World, islands and lakes](world-islands-lakes.md#w-r2-1).

### Keep unchanged

- **S-KEEP — Keep S1, S2, S3, S4, S5, S6 unchanged?** 86 tests; protect slot isolation, exact save/replay continuation, safe checkpoints, equipment migrations, personal settings and retained report text. [saves-replay-robustness](saves-replay-robustness.md#keep-as-they-are).
- **L-KEEP — Keep L1, L2, L4, L6 unchanged?** 84 tests; protect paired-area ownership, circle geometry and instructions, deliberate comparison settings, quest completion and sleeping/Easter-egg state rules. [legends](legends.md#keep-as-they-are).
- **AR-KEEP — Keep AR3, AR5 unchanged?** 611 tests; protect resource ownership, finite geometry, CPU/shader data agreement, deterministic pixels and retained visual comparison modes. [Art and rendering checks](art-rendering.md#keep-as-they-are).
- **C-KEEP — Keep C2, C3, C4 unchanged?** 131 tests; protect creature conservation, exact input/seed continuation, movement/LOD and berry/bag rules, travel/victory ownership and human-limited bot decisions. [Creatures and movement](creatures-movement.md#keep-as-they-are).
- **H-KEEP — Keep HK1, HK2, HK3, H-R2-K1, H-R2-K2, H-R2-K3 unchanged?** 283 tests; protect safe floors and interactions, exactly-once events, layout/editor identity, hat conservation and direct equipment/kitchen rules. [House and treehouse](house-treehouse.md#keep-as-they-are).
- **IP-KEEP — Keep IP3 unchanged?** 243 tests; protect letter eligibility and queue parity, correct sigil ownership, phase gates, monotone pulse/route coupling and valid party-guest state. [Invites and party](invites-party.md#keep-as-they-are).
- **M-KEEP — Keep M1, M2, M3 unchanged?** 166 tests; protect audio resource limits and deterministic scheduling, the approved score structure, and explicit event-to-sound routing. [Music and audio](music-audio.md#keep-as-they-are).
- **T-KEEP — Keep T1, T2, T3, T4, T5, T7 unchanged?** 319 tests; protect honest CI coverage and publication, trustworthy measurements, deterministic isolation, research provenance and safe preview tooling. [Tools and CI](tools-ci.md#keep-as-they-are).
- **U-KEEP — Keep U2, U3, U4, U5, U8, U9, U10 unchanged?** 336 tests; protect input recovery, menu ownership, opening/travel handoff, retained diagnostics and valid creator/editor data. [UI, menus and controls](ui-menus-controls.md#keep-as-they-are).
- **W-KEEP — Keep W1, W2, W3, W5, W6, W9, W-R2-K1 unchanged?** 172 tests; protect campaign identity and map equivalence, spatial boundaries, authored world content, resource budgets and explicit link/transition rules. [World, islands and lakes](world-islands-lakes.md#keep-as-they-are).

<details>
<summary>Inventory, coverage and method</summary>


Audit only, #1631 / draft #1632.

**Scoped semantic review.** Concrete reviewed groups: [Saves, replay and robustness](saves-replay-robustness.md), [Legends](legends.md), [Art and rendering checks](art-rendering.md), [Creatures and movement](creatures-movement.md), [House and treehouse](house-treehouse.md), [Invites and party](invites-party.md), [Music and audio](music-audio.md), [Tools and CI](tools-ci.md), [UI, menus and controls](ui-menus-controls.md), [World, islands and lakes](world-islands-lakes.md). Exact reviewed membership, assertion rationale and old/current ruling comparisons are in [semantic-groups.md](semantic-groups.md). Page scope statements identify bounded reviews; neighboring unreviewed cases are not silently treated as current. These proposals await the coordinator's review before Ed sees them. Combat and multiplayer retain their existing owners. The initial catalogue remains a machine-first reading aid; reviewed classifications are in inventory.json. No test is changed or approved for deletion.

630 files; 3230 source case declarations. Parameterized and loop-generated cases are not expanded. CJS files are supplementary to the requested TS/MJS scope.

598 files have historical CI durations from [the existing run](https://github.com/edsaperia/witch/actions/runs/41305026644); all case durations are unknown. File duration includes runner effects and cannot be added to infer parallel CI wall time saved.

Kinds are first guesses. “Current rules” is a provisional default, not proof of a current Ed ruling. Historical citations may describe setup or compatibility. Supersession candidates require human confirmation. Nothing adopts the proposed standing rule.

Run `node tools/tests/inventory.mjs` to refresh; `--check` verifies generated outputs. Reads source only; never imports or executes game tests.

## System decisions

- [Combat](combat.md): 425 declarations
- [Creatures and movement](creatures-movement.md): 146 declarations
- [Invites and party](invites-party.md): 275 declarations
- [Legends](legends.md): 93 declarations
- [World, islands and lakes](world-islands-lakes.md): 218 declarations
- [House and treehouse](house-treehouse.md): 300 declarations
- [Music and audio](music-audio.md): 171 declarations
- [UI, menus and controls](ui-menus-controls.md): 345 declarations
- [Saves, replay and robustness](saves-replay-robustness.md): 86 declarations
- [Multiplayer](multiplayer.md): 221 declarations
- [Art and rendering checks](art-rendering.md): 630 declarations
- [Tools and CI](tools-ci.md): 320 declarations

The short system pages link to the exhaustive [case catalogue](cases.md) and [machine inventory](inventory.json). File timings live in the JSON. Review every cited assertion before granting a grouped deletion. No measured CI savings are claimed.

## Coverage ledger

Counts below are source test templates, not executions. “Existing owner” means no parallel review/proposal in this audit; “unread” means no change proposed.

| System | Reviewed | Existing owner | Unread |
|---|---:|---:|---:|
| Combat | 0 | 425 | 0 |
| Creatures and movement | 146 | 0 | 0 |
| Invites and party | 275 | 0 | 0 |
| Legends | 93 | 0 | 0 |
| World, islands and lakes | 218 | 0 | 0 |
| House and treehouse | 300 | 0 | 0 |
| Music and audio | 171 | 0 | 0 |
| UI, menus and controls | 345 | 0 | 0 |
| Saves, replay and robustness | 86 | 0 | 0 |
| Multiplayer | 0 | 221 | 0 |
| Art and rendering checks | 630 | 0 | 0 |
| Tools and CI | 320 | 0 | 0 |

See [the exact unread file/line manifest](unreviewed.md). Standalone Node and external coordination-plugin files are included in the inventory but labeled outside Witch Vitest includes; their counts are not established Witch CI savings. A file with no named registrations may be a standalone assertion script, not zero coverage.

</details>
