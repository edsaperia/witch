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

### Initial case results (product3ca241506; superseded watchdog status below)

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

The original `src/app/internetResilience.test.ts` discovery regression used actual `connectRelay` with a synthetic socket: open → joined → ready/acknowledged → active; subsequently every outgoing send succeeded but no message, error or close event returned. After `ONLINE_TIMING.dropMs + 1000` (6s), heartbeats were sent but `onClose` and `onError` counts remained0. Expected nonzero failure notification; observed0. It was committed as an unmasked failing regression, not `it.fails` or skipped. The approved contract and passing verification below supersede that initial deadline/status without erasing the discovery evidence.

Source explanation: `relayClient.ts` starts an outgoing heartbeat interval and reacts to WebSocket error/close, but tracks no server receive timestamp and owns no receive-deadline timer. Server `relay.mjs` refreshes liveness from client messages and does not acknowledge heartbeats. A one-way or half-open connection can therefore outlive the application’s active-silence expectation until the underlying transport eventually reports failure. This is reproduced at the transport seam, **not a measured live-network hang or a proof of infinite duration**. The6s assertion is a proposed receive-liveness regression derived from the existing5s active budget plus one heartbeat, not an already documented client deadline; the production owner/coordinator must choose its exact contract.

Proposed production fix for the multiplayer owner: add a bounded receive-liveness contract (explicit authenticated heartbeat acknowledgement, or another server activity guarantee), then notify the existing failure/close path when active inbound traffic stops. Keep cold-open/loading/call timeouts distinct, cancel the watchdog on hang-up/retry, and test delayed delivery and grace boundaries before applying it. Do not make “no gameplay changes while idle” look like a dead connection; the server must provide a message guarantee if the client expects one. No protocol or production change was made in this audit.

### Validation and remaining limits

- `node --test --test-concurrency=1 server/internet-resilience.test.mjs`:7 PASS, owned listeners/clients/timers cleaned up; process exited.
- `vitest run src/app/internetResilience.test.ts --maxWorkers=1`:5 PASS /1 FAIL as above. No broad suite or browser run.
- Typecheck attempted: existing `src/pagesWorkflow.test.ts(3,23)` TS2307 missing `yaml` in shared local dependencies; no other errors. The findings are not an all-checks-green FINAL.

Actual browser overlay visibility, input-layer/pause-stack teardown and guest-bedroom door presentation after a physical disconnect remain unverified. Pure session/save cleanup does not establish those UI outcomes. Service plan/sleep settings and real cold wake remain unverified. No account, deployment, heartbeat policy or production ownership change is authorized by these findings. Route the failing test and proposed contract to the multiplayer owner through the coordinator.

## Accepted contract and read-only hosting follow-up

Coordinator1610#6557984974 accepts the finding and supersedes the proposed6s receive deadline. The production owner, not this audit branch, implements: active call only,5s downstream silence warns,15s ends through the existing failure/return path; any downstream message clears the warning. The server acknowledges client heartbeats (or guarantees periodic downstream activity). Cold-open/connecting keeps its longer grace and is not monitored as an active call.

The existing6s red test remains the historical discovery case pending the exact approved production-fix head. Once that exact head is assigned, normally merge it into this audit branch (no rebase/force), update the regression for5s warning/15s termination/recovery/active-only conditions, and rerun. No future head or unrun green result is assumed.

Read-only access check,2026-11-01: no authenticated Render connector, installed CLI, available API credential or existing CLI configuration was accessible in this session. No browser was opened, no new access/permissions/tool installation was requested, and no service/account setting was changed. Therefore `witch-relay`'s **current compute plan, actual idle behaviour and measured cold-start duration are not verified**. Earlier deployment records described Starter/Frankfurt; those remain historical. Current dashboard/API service settings need an already authenticated owner to verify them.

Conditional public facts, checked against Render's official pages: [Free web services](https://render.com/docs/free) idle after15minutes without inbound traffic and take about one minute to spin up; [the FAQ](https://render.com/docs/faq) says paid compute does not spin down. Render's [official always-on comparison](https://render.com/articles/render-vs-railway) lists Starter web-service compute at $7/month (0.5vCPU/512MB), excluding other usage/account charges; [pricing](https://render.com/pricing) remains the rate reference. This is conditional plan context, not verification of this service, a requested purchase or an upgrade recommendation. If the historical Starter selection is still current, free-tier idle wake is not the explanation; that condition has not been verified here.

Coordinator1610#6558051418 closes the access question: **Starter ($7/month, Frankfurt) per deploy record, not re-verified 1 Nov.** Paid compute does not idle, so the free-tier cold-wake risk does not apply if that recorded selection remains unchanged. No current dashboard/API verification or measured startup duration is claimed. The coordinator explicitly declined a dashboard/browser session; no further hosting audit is pending. This builder is AVAILABLE while awaiting the exact approved1609 watchdog-fix head for a normal merge and15s-contract regression run; no other inbox is assigned.

## Early watchdog verification — 1 Nov,17:26 UTC

Coordinator1610#6561247053 explicitly approved product head `13689c6736ac4d814b02bbd1585ac7b6d6370840`. Normal-merged exactly that head as `3f76fe28cdf016437625bb1db457302cc0ac72fd` (no rebase/force). The sole add/add conflict was the audit client test already imported/updated by the production owner; retained its5s/15s regression and fresh-return case, then added remaining audit conditions. All production files come unchanged from the approved merge. Own diff against that product head remains only the two audit test files and this findings note.

`node --test --test-concurrency=1 server/internet-resilience.test.mjs`: **8 PASS**,357ms reported runner duration. `vitest run src/app/internetResilience.test.ts --maxWorkers=1`: **11 PASS**,12.96s total (3.14s tests). No live relay or browser. Per-case disposition:

| Relay cases | Result |
|---|---|
| Guest socket loss / survivor channel / fresh consent | PASS |
| Host socket loss / identities and room released | PASS |
| Local relay restart at same endpoint | PASS |
|300ms logical delay and two lost beats | PASS |
|4,999ms survives /5,000ms guest-silence closes | PASS |
|30,000ms answer timeout despite heartbeats | PASS |
|10,000ms post-upgrade handshake deadline | PASS |
|Heartbeat acknowledgement for registered phones and both active roles | PASS |

| Client cases | Result |
|---|---|
|60s cold-open stays connecting then recovers | PASS |
|Cancel cold-open / late-open cannot start heartbeat | PASS |
|Socket close after guest admission requests one fresh-own return; late messages cannot revive | PASS |
|Host disconnect removes guest and stale movement/pause input without replacing host seed/time | PASS |
|Delayed/dropped release obeys250ms held-input lease | PASS |
|Active guest blackhole: no warning before5s, warns at5s, no end at14.999s, ends at15s | PASS |
|Real telephone/visit save seam:5s warning stays connected,15s requests fresh-own return exactly once | PASS |
|Downstream heartbeat clears warning and resets full15s deadline | PASS |
|Downstream state message clears warning and resets full15s deadline | PASS |
|Open/preparing guest stays unarmed60s, then arms on active | PASS |
|Host arms on accepted readiness and ends once at15s | PASS |

Typecheck attempted on the merged tree: only existing `src/pagesWorkflow.test.ts(3,23)` TS2307 missing `yaml` in shared local dependencies; no other errors. Diff check PASS. Non-browser imports emit the existing storage-unavailable warning; the save assertions use explicit memory stores and pass. All local listeners, sockets and timers are cleaned up.

This is **early exact-head CPU/local-socket evidence**, not browser/UI/Render/deployment acceptance or a full all-checks-green FINAL. Repeat these audit files only if the final approved1609 head changes the watchdog. The historical hosting qualification and unverified physical-disconnect door/overlay/input-stack limits remain unchanged.
