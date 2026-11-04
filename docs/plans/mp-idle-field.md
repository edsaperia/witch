# Idle imprint field no-op

Exact branch `codex/mp-idle-field`, worktree `work/mp-idle-field`, based on PR1819 head32fcaa90c. Approved COORDINATOR1819#6642152776, updated2026-11-04T21:08:15Z, SHA2563c735943d1fcaa18f6b4653483e277f36085fa66c51dfb91fc32daeb93ccf600. Rejoin work stays on1819.

Track positive field values and pending publication. Preserve existing equations, Float32 storage, rounding, toroidal scroll and first-write behavior. Once initialized, an empty unchanged field does no decay/publication scan, MagicFx texture copy or upload request. Clearing/decaying the last mark still publishes the cleared field once. Enable/quality and field-box uniforms remain current even when bytes do not change.

Tests: reference equivalence across idle/active/stamp/scroll/reset/decay-to-empty, zero idle work counters, first-write wake and clearing publication, actual MagicFx lifecycle/texture outputs. Measure local CPU work/time without browser or screenshots. Focused one-worker tests/typecheck (and art check if required by touched rendering code). No visual/tuning/relay/security changes, browser allocation, Render or release.
