// PLAN — MP-B telephone disconnect/proof-order regression audit, canonical1476#6556803207.
// Own branch: codex/mp-relay-lifecycle-audit.
// Worktree: C:/Users/edsap/Documents/ChatGPT/witch game/work/mp-relay-lifecycle-audit.
// Base: current prototype98558e2612a75ee4607c1914d9f4f1b113f3cfd6.
// Only this NEW test file is owned; no production/protocol/permission/rate/Render changes.
// 1. Reuse existing telephone/server factory and fixture patterns. Each test owns/cleans its sockets/timers.
// 2. Cover disconnect during ringing, challenge and one-sided acceptance; reject stale/reused proofs/call state.
// 3. Cover decline, timeout/re-register, room/socket cleanup and bounded caps with deterministic clocks where supported.
// 4. Run only nearby CPU tests, one worker. Report each case PASS or a minimal failing test to canonical;
//   1538's owner alone fixes production. No browser, live relay/service load or hardware run.
// Current prototype has no telephone.mjs/telephone.test.mjs; they are on1538/ea88aeaf.
// Canonical dependency disposition is requested before integrating that unmerged implementation or claiming test results.
// This PLAN checkpoint contains no executed lifecycle tests and is NOT a passing audit.
