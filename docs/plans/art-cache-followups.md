# Art cache follow-ups

COORDINATOR6526799842 accepts fingerprint FINAL3b2f96be and explicitly opens
these milestones now, without waiting for release. This branch starts at exact
3b2f96beb3f1b27d1371c9838387615cc9169132 and preserves that accepted work.

1. Cache-first worker: src/render/artWorker.ts, a small transfer-buffer helper,
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
