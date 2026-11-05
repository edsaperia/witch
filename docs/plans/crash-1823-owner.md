# Crash1823 investigation: owner checkpoint

PLAN: `codex/crash-1823`, isolated `work/crash-1823`, existing journal/recording owner. Canonical1476#6547418294 and docs/plans/crash-1823.md at ops-inbox525394cf read. CI1557@799b63dfc safely checkpointed/unvalidated, to resume after urgent work resolves; no duplicate worker/idle monitor.

First inspect/decode Ed's committed log and measure diagnostic persistence amplification without a browser. Bound low-priority journal retention, avoid paused-frame durable expansion while preserving exact in-memory input recording/export, and preserve all warning/error records. Distinguish incompatible save format from explicit-link mismatch, keep the saved night available via one click and test reload/link cases. Add focused tests/typecheck/config gate with one worker. Request canonical cloud-first 10+minute pause/reload measurement (journal bytes/write latency/heap/quota) and concurrent-training memory evidence via root; no unallocated local browser or heavy reproduction.

Hypotheses remain unproven: paused-frame journal pressure and simultaneous bot-worker memory pressure may both contribute. No renderer-crash root-cause/fixed claim without measurements. Canonical owns cloud/fullsuite/browser/release. Laptop proof requires fresh slot and <=270s cap.
