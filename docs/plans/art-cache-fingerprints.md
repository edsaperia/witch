# Per-art-kind cache fingerprints — plan

Branch: `codex/art-hash`, based on `909f00aeed24a72654b1a48c04faad4ac558e865`
(`origin/claude/prototype`). Coordinator brief: PR1477/comment6522208139,
2026-10-30. This commit is a plan only; no cache or drawing behavior changes.

## Problem and correctness boundary

`tools/artHash.ts` currently hashes all nested art JS/JSON, five extra sources
and every override PNG into one value. `artCacheKey` applies that value to every
persisted job. A species-only edit therefore discards the house too. Conversely,
the historical list can omit transitive render helpers outside its five extras.

A simple import-file closure is insufficient: artBuild, homeArt, islandArt,
housePieces and rigBuild import the generator facade, which imports nearly every
family. The dependency map must follow referenced bindings/re-exports and local
helper calls, rather than blindly union every facade import. Uncertain edges must
broaden invalidation, never silently disappear.

## Proposed map and fingerprints

1. Use the existing TypeScript compiler API; add no dependency. Parse TS/JS imports,
   exports, namespace member accesses, local references and job dispatch roots.
   Exclude type-only references. Resolve relative module extensions/index files,
   JSON imports and cycles deterministically. Follow `Art.name` through the
   generator's named import/re-export binding, not all generator exports.
2. Generate a complete kind catalogue from the ArtJob union/dispatch and trace each
   job's called helpers and required top-level initializers. File dependencies are
   sorted repository-relative paths; hash normalized text contents, raw PNG bytes,
   paths and a fingerprint-schema version. Keep dispatcher/packing code that
   genuinely affects every result in a common component. Retain conservative
   family-wide dependencies where selection is not provable.
3. Treat computed exports, dynamic module paths, side-effect imports and unknown
   initializers explicitly. Resolve finite literal alternatives when provable;
   otherwise include the module/family's full closure or use the existing complete
   art fingerprint as a safe fallback. Emit the reason in the map. Never interpret
   an unresolved edge as an empty dependency set. Missing inputs fail the build.
4. Export reusable `job -> files` and `file -> jobs` data, with shared/family/local
   membership and fallback reasons, for the later affected-only art check.
   The semantic roots are the actual runJob branches; avoid a second hand-written
   list of source files. Test that every ArtJob kind has a root/fallback.
5. Inject per-kind fingerprints at build time and choose them in artCacheKey.
   Preserve the existing style hash, job identity and seed/scale/biome components;
   keep party's nonpersistent key null. Unknown future kinds use the safe global
   fallback. A schema prefix makes the migration a deliberate one-time cold miss.
   No IndexedDB destruction or drawing/worker-scheduling changes are needed.
6. Scope override PNG bytes to their actual species/poses where identifiable.
   Species-specific source closures are optional only where a static selector can
   be proved sound. Shared registry enumeration or unresolved model dispatch stays
   creature-family-wide. Do not promise species isolation by merely excluding
   other species folders. Do not edit creature models or arrival-readiness code.

## Initial job families to cover

These are an audit guide, not the production dependency manifest. Actual file
closures will be generated from the current dispatch and reachable bindings.

| Job kinds | Semantic roots / families |
| --- | --- |
| creature, rig, woken, sleep, nap, glide, face, party | creatureSprites/rigSprites; creatures, genomes, pose/legend/nap code, selected overrides and packing |
| type | typeSprites/areaAssets/areaTreeVariants; area recipes, flora, trees/ground/props, biome helpers and required LOOKS data |
| witch, hat, partyWitch | witchSprites/witchLookOf/partyWitchSprites; witch/genome/outfit/hat code |
| treehouse, housePiece, workshopPic, crownMask | homeArt/housePieces/workshopPieces/crownMask and their actual house, furniture, decor/config dependencies |
| props, decor, scenes, pathPieces, relics, find | corresponding sprite helpers and prop/decor/scene/path/relic/find generators |
| beach, beachEdge, lakeShore, sea | corresponding beach/shore/sea generators, biome/color helpers and packing |
| disco, soundsystems, soundsystem, speakers, stones, stumps, stump, partyObjects | corresponding dancefloor/speaker/stone/stump/party generators and packing |

Shared code may include core drawing, rasterization, lighting, palette indexing
and atlas packing, but membership must come from the graph. Report its measured
file count and the union/intersection across cacheable jobs; don't invent a shared
percentage before generating the map.

## Verification and historical replay

- Fixture imports must prove: a creature-only leaf changes its creature key but
  not the house key; a shared drawing/packing dependency changes every dependent
  key; unrelated tools/output exports do not invalidate drawings. Cover deep
  imports, re-exports, namespace uses, JSON, file add/remove/rename, cycles,
  override pixels and deliberate conservative fallbacks.
- Test real repository family separation, complete ArtJob coverage and preservation
  of runtime cache-key inputs/null party behavior. Default to invalidation where
  dependency proof is incomplete. Typecheck and nearby tests only, as briefed.
- Pin a UTC seven-day range and base SHA in a replay artifact. Initial read-only
  count for 2026-10-23T12:00Z through 2026-10-30T12:00Z at this base is 1,451
  reachable commits, which differs from the brief's 956-commit audit; retain that
  discrepancy rather than claim the same sample. Report all-commit and first-parent
  denominators separately. Actual release counts require deployed build SHAs;
  otherwise label first-parent transitions as release proxies.
- Read historical blobs through Git, without repeatedly checking out old code or
  executing historical art. Derive dependency maps at each revision, cache work by
  blob ID, and compare fingerprints with its first parent. Account for newly added
  kinds, missing/unresolvable historical inputs and cold schema migration explicitly.
  Unknown history is conservative, not a fabricated cache hit.
- Report old global invalidations versus new house, all-creature, individual-species
  and all-job invalidations. Include affected job counts and the shared sources
  responsible for remaining global invalidations. Also state how much invalidation
  remains due to the unchanged whole-style hash. These are predicted cache-key
  invalidations, not measured load-time speedups or promises of warm user storage.

## Scope and next step

Expected implementation ownership: fingerprint analysis/build injection, cache-key
selection, focused tests and this documentation. Leave PR1470's creature models,
PR1464's arrival readiness and the art worker's scheduling untouched. Flag any
required overlap to the coordinator before changing that owner's area.

Post this plan on the new draft PR, then wait for coordinator review before
implementation. No expected hit-rate number is claimed before the replay runs.
