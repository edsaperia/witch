# MP-D: real-internet resilience audit

## PLAN — 2026-11-01

Assignment: coordinator1542#6557524938. Own branch `codex/mp-internet-resilience`, based on the current `codex/multiplayer-integration` head `3ca24150622131cb666c2416d32e22fb83ab311b`. This is a tests-only audit; the multiplayer owner makes production fixes.

Owned changes: NEW `server/internet-resilience.test.mjs`, NEW `src/app/internetResilience.test.ts` if client contracts need coverage, and this single findings note. Reuse the existing isolated local relay/telephone factory approach from `server/telephone-lifecycle.test.mjs`. No production modules, deploy configuration, live Render service, browser or laptop workload changes.

1. Read deploy configuration and repository documentation for relay startup/sleep assumptions. Record what is configured, what remains unknown, and the current connection/dial/heartbeat/drop timeouts. Do not infer the live service plan from its hostname or assume that it sleeps.
2. Exercise guest socket drop, host socket drop and local relay shutdown/restart after authenticated call/visit admission. Assert room/socket cleanup, host-night continuity, guest own-save/fresh-return contracts and stale callback rejection at the available client seams. Distinguish server/message guarantees from untested browser/input/pause integration.
3. Inject representative 300ms delivery delay and dropped heartbeats using deterministic clocks where the existing APIs support them. Test the exact timeout boundary and reconnect/re-registration behaviour with bounded local sockets; do not contact or load the live relay.
4. Each confirmed defect gets a minimal failing regression and a proposed production fix for the multiplayer owner. Report pass/fail/unverified separately; no expected-failure masking, production fixes, inferred browser success or new service/plan assumptions.
5. Run only nearby tests with one worker and typecheck. Clean up all owned local listeners, clients and timers. Open the draft PR early and report checkpoints on it; keep prior lighting and veil checkpoints separate.

## Findings

Audit not yet run. PLAN checkpoint only.
