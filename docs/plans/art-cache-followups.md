# Art cache follow-ups

COMPLETED in PR #1500, included in v6478 (2026-10-31): cache-first worker import and conservative affected-art-check reuse. The accepted fingerprint work remains intact. The instructions/checkpoints below describe that completed assignment, not new work; current check behavior is in [art-check notes](../notes/art-checks.md).

COORDINATOR6526799842 accepts fingerprint FINAL3b2f96be and explicitly opens
these milestones now, without waiting for release. This branch starts at exact
3b2f96beb3f1b27d1371c9838387615cc9169132 and preserves that accepted work.

1. Cache-first worker: src/render/artWorker.ts, storage-only artCacheStorage.ts
   with artCache.ts re-exports, a small transfer-buffer helper,
   its artBuild re-export, nearby worker tests and an own changelog fragment.
   Read IndexedDB before importing artBuild. Cache-only misses never import it;
   drawing misses share one lazy import, preserving replies, buffers and tracing.
2. Affected-only PR art checks: tools/art-check/**, art/check.mjs and only
   .github/workflows/art-check.yml, plus nearby tests and art-check notes. Derive
   affected jobs from the accepted dependency analyzer, conservatively map to
   check tasks, and persist successful results by complete input fingerprints.
   Prototype/main pushes and release checks (claude/rel-* or Release check:
   titles) always run the full check. No edits to ci.yml or other CI workflows;
   #1496 owns other CI work. Route any required overlap through the coordinator.
3. Party sheets: src/render/assets.ts, artBuild.ts/creatureArt.ts and artCache.ts
   plus related types/tests. Keys use species, outfit and current age rather than
   creature identity; render/cache only the age shown. Preserve other job shapes.

Each milestone gets its own REPORT and typecheck/nearby tests. Full suite,
browser checks and full art checks remain coordinator-owned. No measured
one-second saving is claimed without measurement. No direct builder messages.

## Implementation checkpoint

Cache-first source is pushed, including storage-only and transfer helpers so
cache hits do not pull the seed helper's art dependencies into the worker.
QUESTION6526943853 still awaits canonical routing for only Vite worker.format
`es`; CI confirms its current `iife` format rejects the dynamic drawing chunk.
No Vite edit has been made before routing.

Affected-check milestone5770dcdae derives all57 sprite tasks and retains auxiliary
checks/labs separately. A final audit converts callback-local dynamic imports to
conservative whole-module roots in the analysis adapter. The production
fingerprint engine and accepted PR1487 history artifacts remain untouched.
Successful results alone are cached; unknown layouts run the full check.

Party milestone1311c9dce shares outfit/age keys, current-age frames and atlas/view
batches. Related caller src/render/view/creatures.ts now passes current age.
Ordinary creature sheets, dressed naps, rigs and outfit selection retain their
existing behavior. All43 combined nearby checks passed; the subsequent dynamic
import regression and typecheck also passed. No browser/full art check was run
locally. This is a checkpoint, not FINAL: the Vite routing gate remains open.
