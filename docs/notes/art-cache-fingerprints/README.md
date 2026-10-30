# Per-kind art fingerprints

The build derives all 34 ArtJob kinds from the dispatcher, follows their drawing
bindings, and includes conservative module initialization dependencies. Cache keys
use these hashes plus the existing style, identity, seed and scale inputs. The
`art-kind-v1` prefix causes one cold migration; party sheets remain uncached.
Unknown kinds, missing hashes and inherited object names bypass caching.

[dependencies.json](dependencies.json) records the current forward/reverse map.
There are 83 whole drawing files, 10 shared whole-file inputs (including build
tools), and 2,675 conditional initialization parts totaling 1,314,730 serialized
text bytes. Parts overlap: this is not a count of unique source bytes. Filename
maps are conservative upper bounds; `affectedArtJobs` compares complete hashes.
There is no per-species pruning.

## Historical source replay

[history.json](history.json) contains every transition and provenance;
[comparison.json](comparison.json) contains matched comparisons. The pinned
909f00aeed24a72654b1a48c04faad4ac558e865 sample covers October 23 12:00 UTC to
October 30 12:00 UTC, 2026: 1,456 reachable transitions and 304 first-parent
transitions, with zero unsupported analyses. All 6,548 Git blobs were verified.
Historical code was never executed. Repaired shallow history supersedes the
initial 1,451/29 sample and differs from the supplied 956-commit brief.

| Scope | Reachable comparable | Old global → per-kind | First-parent comparable | Old global → per-kind |
| --- | ---: | ---: | ---: | ---: |
| House piece | 922 | 168 → 162 | 200 | 44 → 43 |
| All walking creatures | 1,456 | 294 → 252 | 304 | 74 → 61 |
| One species, fox | 1,456 | 294 → 252 | 304 | 74 → 61 |
| Area type / trees | 1,456 | 294 → 273 | 304 | 74 → 65 |
| Every kind together, equal kind sets | 1,443 | 281 → 239 | 301 | 71 → 58 |

House comparisons omit revisions without housePiece. Kind migrations exclude 13
reachable / 3 first-parent transitions from the last row. Reachable transitions
include branches and merges; first-parent transitions are not deployments.
The baseline is the fixed pinned-909 global input rule, not each historical
hash implementation. Each revision uses its own source layout, so the helper
split is not assumed to have existed throughout the week.

The new conservative graph also adds inputs: house avoids 30 old invalidations
but adds 24, creatures avoid 76 and add 34, trees avoid 55 and add 34. First-parent
figures are respectively 9/8, 23/10 and 19/10. These are source invalidations,
not proof of changed pixels. Shared inputs still invalidate every kind in 239
of 1,443 comparable reachable transitions (58/301 first-parent).

Replay is bound to 395a07f918de74356badd7abd8b415d06a805503. Its analysis-engine
digest was checked against delivery source after the later cache-consumer-only
guard. The current map separately binds the later source. Runtime style/id/seed
salts, actual IndexedDB hits and loading times are not replayed. Style-input
touches occur in eight reachable / one first-parent transitions and are listed
separately. No hit-rate or speedup claim follows from these counts.

## Validation and integration

Typecheck and 35 nearby tests pass, including real source isolation, shared
changes, initialization effects, declaration kinds, cycles, binary/JSON inputs,
unknown edges, reverse coverage and cache-key guards. Three complete runJob
outputs were byte-identical before/after the helper and lighting-import split:
teaTable house (6,175 bytes), fox (5,950,648), and type 0 / seed 424242 / K1
(3,385,244). The plan records their full digests. No browser was used.

Drawing function bodies, models, generator, scheduling and readiness are
unchanged. When combining #1470, carry its creatureSprites colour-call edits
into the moved function in src/render/creatureArt.ts. Full suite, smoke tests
and full art checks belong to the coordinator's combined build and were not run
locally. Species-specific keys remain deferred until selector and initialization
isolation can be proved. Coordinator 6525574257 queues cache-first worker imports,
affected-only art checks and party-outfit caching only after this milestone lands;
none is implemented here.
