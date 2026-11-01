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

Audit against pinned product `3ca24150622131cb666c2416d32e22fb83ab311b`, 2026-11-01. No production changes. No browser, live relay, Render account or service request was made. Local relay tests use synthetic identities, loopback listeners and owned cleanup; virtual-clock cases do not measure real internet latency. Only the server's locked single dependency (`ws`8.22.0) was installed locally, without scripts.

### Cold start and configured timeouts

No Render deployment manifest/service-plan selection exists in this checkout. `docs/plans/multiplayer-relay-setup.md` describes free-service sleep/cold-wake behaviour, while `docs/plans/hosting-render.md` explicitly leaves actual account/legacy plan unverified. The production endpoint's name establishes neither its plan nor whether it sleeps. Actual cold-start duration, browser TCP/WebSocket timeout and live restart behaviour remain **unknown** from this repo-only audit.

| Boundary | Pinned source behaviour |
|---|---|
| Before WebSocket opens | Telephone status `connecting` (“Connecting the telephone…”). No application connect deadline/automatic reconnect; cancellation closes it. A simulated60s wait then open recovers. |
| Open socket without application handshake | Server `handshakeMs`10,000 (`server/guards.mjs`). This starts after the upgrade, not before service wake. |
| Unanswered call / verification |30,000ms from current ringing/challenge phase (`server/telephone.mjs`). Heartbeats do not extend it. |
| Client heartbeat |1,000ms after socket open (`relayClient.ts`). No acknowledgement/receive-liveness deadline in this client transport. |
| Activated socket silence |5,000ms server default (`server/relay.mjs`), checked every250ms normally. Local boundary tests use5ms checks with an injected clock. |
| Host while guest loads |20,000ms silence; guest load stall90,000ms, absolute join cap600,000ms. These are not a cold-start extension. |
| Held movement/pause controls |250ms since packet receipt (`guestInput.ts`); heartbeat cannot renew this input lease. |

### Case results

| New regression | Result / precise scope |
|---|---|
| Authenticated guest socket drop | PASS: host receives `guest-left`, its channel remains open, same visitor identity can consent to a new call and receive a host-state sentinel. Relay does not own game/save contents. |
| Authenticated host socket drop | PASS: visitor closes; both identities and room can be reused after fresh consent. |
| Local relay shutdown/restart | PASS: both old sockets close; fresh relay on the same loopback endpoint admits both synthetic identities. No promise of persisting a visit or migrating its host. |
|300ms logical delivery delay, two missed beats | PASS: arrivals separated by up to3,900ms preserve active sockets and forwarding. This is an injected arrival schedule, not live-service network measurement. |
| Active guest liveness boundary | PASS:4,999ms stays open;5,000ms closes the guest and notifies a heartbeating host. |
| Call answer deadline | PASS: heartbeats preserve socket liveness but an unanswered call expires at30,000ms and can redial. |
| Application-handshake deadline | PASS: unregistered upgraded socket expires at10,000ms. |
|60s cold-open UI state and recovery | PASS at telephone/socket seam: stays `connecting`, admits nobody or starts no heartbeat until open; ready acknowledgement becomes available. Not a rendered UI or actual service-wake proof. |
| Cancel cold connection / late open | PASS: ended state, no late heartbeat, no owned timer left. |
| Admitted guest socket-close callback | PASS using real telephone identity flow + visitLifecycle/visitSaves: one fresh-own adoption requested, borrowed checkpoint writes held, slot visit/save suspension released; duplicate/late messages cannot revive it. Fresh-night creation itself is the page adapter, represented by the adoption callback here. |
| Host session departure | PASS: guest witch removed, host seed/time not replaced, new membership has neutral movement/pause input. This is session/wire-state cleanup, not the browser input-layer or pause-overlay stack. |
| Delayed/dropped input release | PASS: received controls expire at250ms, including `pausePage`; stale sequence cannot restore held movement. |
| One-way blackholed downlink | **FAIL, minimal regression below.** Outgoing heartbeats keep succeeding; no receive-failure notification within the proposed active-silence bound. |

### Confirmed transport gap and proposed fix

`src/app/internetResilience.test.ts`, “MP-D minimal regression: active guest transport reports a blackholed downlink within the active silence budget”, uses the actual `connectRelay` with a synthetic socket: open → joined → ready/acknowledged → active; subsequently every outgoing send succeeds but no message, error or close event returns. After `ONLINE_TIMING.dropMs + 1000` (6s), heartbeats were sent but `onClose` and `onError` counts remain0. Expected nonzero failure notification; observed0. The test intentionally remains a failing regression, not `it.fails` or skipped.

Source explanation: `relayClient.ts` starts an outgoing heartbeat interval and reacts to WebSocket error/close, but tracks no server receive timestamp and owns no receive-deadline timer. Server `relay.mjs` refreshes liveness from client messages and does not acknowledge heartbeats. A one-way or half-open connection can therefore outlive the application’s active-silence expectation until the underlying transport eventually reports failure. This is reproduced at the transport seam, **not a measured live-network hang or a proof of infinite duration**. The6s assertion is a proposed receive-liveness regression derived from the existing5s active budget plus one heartbeat, not an already documented client deadline; the production owner/coordinator must choose its exact contract.

Proposed production fix for the multiplayer owner: add a bounded receive-liveness contract (explicit authenticated heartbeat acknowledgement, or another server activity guarantee), then notify the existing failure/close path when active inbound traffic stops. Keep cold-open/loading/call timeouts distinct, cancel the watchdog on hang-up/retry, and test delayed delivery and grace boundaries before applying it. Do not make “no gameplay changes while idle” look like a dead connection; the server must provide a message guarantee if the client expects one. No protocol or production change was made in this audit.

### Validation and remaining limits

- `node --test --test-concurrency=1 server/internet-resilience.test.mjs`:7 PASS, owned listeners/clients/timers cleaned up; process exited.
- `vitest run src/app/internetResilience.test.ts --maxWorkers=1`:5 PASS /1 FAIL as above. No broad suite or browser run.
- Typecheck attempted: existing `src/pagesWorkflow.test.ts(3,23)` TS2307 missing `yaml` in shared local dependencies; no other errors. The findings are not an all-checks-green FINAL.

Actual browser overlay visibility, input-layer/pause-stack teardown and guest-bedroom door presentation after a physical disconnect remain unverified. Pure session/save cleanup does not establish those UI outcomes. Service plan/sleep settings and real cold wake remain unverified. No account, deployment, heartbeat policy or production ownership change is authorized by these findings. Route the failing test and proposed contract to the multiplayer owner through the coordinator.
