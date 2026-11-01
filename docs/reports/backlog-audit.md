# Backlog status audit

Docs-only audit for inbox #1621 (brief commit `63d70eaf45e250ca4b0b848744c51f4d086278b8`, 2026-11-01). Starting source: prototype `ab06904b033b47b4b955da45f1a08c9568a67ddf`. Reconciled with fresh prototype `11236cf7d70374163170f6ff645dbf2129eb4c11` after release1101k (canonical #1476 comment6562592823); this adds the released art scheduling/park note. Game-feature evidence is unchanged by that scheduling-only release. No request here authorises implementing a backlog item.

## Method

Read every Markdown page under `docs/backlog/`. Count actionable feature requests, not historical decisions, example recipes, evidence instructions or repeated summaries of the same request. Group a list under one request when its bullets specify that request rather than independent work. Mark **Built** only when current source implements the request; record the merged PR and a verified version when available. A source implementation with an unverified release is labelled explicitly. Mark **Partly built** with the remaining gap. Unbuilt requests stay unmarked. Superseded requests retain their words and a status explanation rather than becoming new instructions.

Record current source, git history, PR and changelog evidence. A source finding does not imply browser acceptance or that an open branch is live. Active owner pages are reconciled from fresh prototype before final; overlapping edits require coordinator routing.

## Results

| Page | Items | Built | Partly built | Not built / unassigned |
|---|---:|---:|---:|---:|
| [look.md](../backlog/look.md) | 2 | 1 | 1 | 0 |
| [creatures.md](../backlog/creatures.md) | 5 | 0 | 5 | 0 |
| [creator-and-house.md](../backlog/creator-and-house.md) | 21 | 7 | 12 | 2 |
| [gameplay.md](../backlog/gameplay.md) | 18 | 17 | 1 | 0 |
| [world-and-perception.md](../backlog/world-and-perception.md) | 4 | 1 | 1 | 2 |
| [forest-counts.md](../backlog/forest-counts.md) | 1 | 1 | 0 | 0 |
| [hue-spin.md](../backlog/hue-spin.md) | 1 | 1 | 0 | 0 |
| [miniature-audio.md](../backlog/miniature-audio.md) | 2 | 2 | 0 | 0 |
| [mushroom-sparkle-shift.md](../backlog/mushroom-sparkle-shift.md) | 1 | 0 | 0 | 1 |
| [visual-response-projects.md](../backlog/visual-response-projects.md) | 7 | 0 | 4 | 3 |
| [platform.md](../backlog/platform.md) | 20 | 3 | 12 | 5 |
| [music.md](../backlog/music.md) | 20 | 10 | 8 | 2 |
| [treehouse.md](../backlog/treehouse.md) | 24 | 11 | 11 | 2 |
| [journey.md](../backlog/journey.md) | 30 | 18 | 9 | 3 |
| [workshop.md](../backlog/workshop.md) | 14 | 9 | 3 | 2 |
| [unlocks.md](../backlog/unlocks.md) | 29 | 12 | 6 | 11 |
| [combat.md](../backlog/combat.md) | 15 | 8 | 7 | 0 |
| [magic-effects.md](../backlog/magic-effects.md) | 15 | 7 | 6 | 2 |
| [cauldron.md](../backlog/cauldron.md) | 131 | 29 | 2 | 100 |
| [potion-recipes.md](../backlog/potion-recipes.md) | 165 | 18 | 0 | 147 |
| [art-check-shards.md](../backlog/art-check-shards.md) | 3 | 1 | 1 | 1 |
| grass-repaint-noise.md (read-only owner branch) | 1 | 0 | 0 | 1 |

Counts are feature groups documented in each page's status index, not arbitrary paragraph/bullet counts. Repeated historical decisions and build-order restatements are not counted twice. Recipe book counts all165 combination slots, including unassigned reservations; cauldron counts distinct named catalogue effects once plus collection/kitchen/lifecycle groups. Totals across pages overlap and must not be read as a distinct-feature total.

## Five significant partial gaps

1. Multiplayer: opt-in telephone/guest/save/equipment source exists, but ordinary calls and the complete accepted visit lifecycle remain off/incomplete (#1538/#1609).
2. Creature generator: graph/socket/skin/gait foundations exist, but have not replaced every production quadruped and one-off builder (#1470).
3. Journey records: BPM records and DJ booth are built, but the proposed per-island quest-earned biome/genre record progression is not.
4. House progression: dressing/Workshop/zoo/kitchen are real; custom portable bedrooms, trophies/biome skeleton rewards and tarot gameplay are not delivered.
5. Visual response: layered magic and default dodge echoes exist, plus opt-in refraction; movement footprint memory, landing terrain ripples and fast-spell echo reuse remain absent/incomplete.

## Scope and source limitations

No runtime change, new hardware/browser run, audio audition or full test suite. Source implementation is not proof of visual acceptance. Null-version fragments are explicitly unknown first-live versions. Current rule variants and superseded designs are called out without rewriting the underlying requests. The released art-check-shards.md owner text was freshly read from prototype11236cf7 and preserved; only a status block was added. The unreleased grass-repaint-noise.md page was read at #1614/codex/proof-ci head369297d19db2daf512d39fb933b74de709df48be: one deferred, unconfirmed diagnosis, no fix. It is absent from current prototype and is counted separately as read-only; no owner branch/proof-loop edits and no READY claim. Its file will need an additive index entry only when its owner version lands. README is an index, not an additional feature request.


## Evidence identity corrections

PR metadata verified during audit: Stiltwalkers is #1532 (not publish PR1534); Worm's Eye is #1530 (not closed release-check1537); full layered magic is #1468, with M5 polish #1484. Mushroom brewing #1523, night save #1455 and multi-witch groundwork #1457 are merged. Graph generator #1470 remains an additive implementation, not universal migration. Gamepad rumble is real source in #1456 (git075f7ff7b), correcting the old “none yet” backlog line.
