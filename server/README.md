# Witch online relay

## Telephone signaling under review (not deployed)

PR1538 adds `telephone` registration with a seven-digit number, `available` presence, `dial`, `answer`, `decline` and `cancel-call`. Only an explicit answer promotes the exact caller socket to host and answerer socket to guest. No snapshot/input authority is granted while ringing; no bearer token is disclosed. Existing token invitations remain unchanged. One pending call per socket, at most the room capacity in pending calls,30second ring deadline; stepping away, declining, canceling or disconnecting clears both ends. Direct invitation-room admission can exhaust capacity after ringing starts, so answer checks capacity again. Number registration is ephemeral and does not list off-phone witches. This is still two-person-only signaling, not completed normal-game integration or a deployed protocol.

`WITCH_MAX_CONNECTIONS` and `WITCH_MAX_ROOMS` now override the CLI's positive-integer caps; the coordinator recommends8/4 on512MB instances. CI's check job now installs server dependencies and runs its sequential protocol tests. The live Render revision remains7fb7aff67 until fresh review/deployment approval.

## Public playtest configuration (PR1538)

The separate online page already uses this relay. Normal-game telephone/audio/stations/guest-room/save integration is still pending. Public CLI now requires `HOST=0.0.0.0`, supplied `PORT`, full 40-character lowercase reviewed source `WITCH_SHA`, and `WITCH_ALLOWED_ORIGINS=https://edsaperia.github.io`. Missing origins/SHA fail startup. Exact comma-separated origins only: no wildcards, paths, opaque null or missing Origin. HTTP is allowed only for explicitly configured loopback origins. Library createRelay defaults permit origin-less local tests; public CLI does not.

Origin is a browser origin, not a repository/path boundary: all edsaperia.github.io pages share it. Non-browser clients can forge it. It does not replace invitation-token authority or provide DDoS protection. There is no room directory and room numbers alone grant no access. No proxy header is trusted as a client identity; fixed global admission and per-socket budgets avoid an unbounded IP map.

Prepared Render settings: one Free instance, Frankfurt, root server, npm ci, npm start, health /, Auto-Deploy Off. Public HTTPS/WSS terminates at Render. Rooms are memory-only and disappear on restart; no horizontal scaling or host migration. GET/HEAD / returns protocol/build identity without caching; other HTTP paths disclose no room data. Do not deploy without approval of the exact revision. SIGTERM/SIGINT stops admission and closes sockets/HTTP with a two-second process backstop; close() is idempotent. Actual Render restart/cold wake remains hosted acceptance.

Fixed defaults in guards.mjs: 16 sockets/8 rooms; global upgrades10/second burst40; initial identification10seconds; each socket240 data/control messages/second burst480 and16MiB/second burst32MiB; complete incoming message8MiB; guest input64KiB; queued outgoing including next serialized message16MiB; close handshake1second. HTTP cap32 connections, headers8192bytes, header/request deadline10seconds. Compression disabled. Closing sockets cannot submit more application messages. One abusive caller can consume shared capacity; upstream abuse handling and production capacity are outside this small playtest.

Sequential socket tests deliver a synthetic near8MiB state and test a deterministic144Hz message budget; these are transport boundaries, not measured real largest-world payload size, bandwidth or latency. Browser code retains actual build/snapshot/input validation, sequence checks and250ms held-input expiry. The generic envelope helper is not automatically active outer framing.

Current timing: normal silence5000ms, active host during guest loading20000ms, advancing loading stall90000ms and absolute cap600000ms. Initial unassigned handshake10seconds is separate; heartbeats cannot extend it. New close rules include handshake/rate/capacity; existing logs omit tokens, room identifiers and payloads.

From `server/`, run `npm ci` then `npm start`. Default local address: `ws://127.0.0.1:8787`. `npm test` exercises real loopback WebSocket connections sequentially and closes the service afterwards.

Timing knobs: `PORT` (8787), `HOST` (127.0.0.1), `WITCH_DROP_MS` (5000), `WITCH_JOIN_GRACE_MS` (600000), `WITCH_JOIN_STALL_MS` (90000). Only strictly advancing progress renews loading; the absolute cap is never extended. Renderer readiness triggers a fresh current-night snapshot, and the guest reports active only after applying it; normal silence timeout starts then. No deployment is performed by this milestone.

While a guest is joining, an active host's silence allowance is `WITCH_HOST_JOIN_DROP_MS` (20000). It returns to `WITCH_DROP_MS` after guest activation/departure, with a fresh normal interval. This is bounded tolerance for a busy host main thread, not a faster-loading claim. The relay emits one JSON `relay-close` line per socket with connection number, role, rule, close code, elapsed silence/join time and any deadline that fired. It omits invitation tokens and message payloads. Rules distinguish `silence`, `join-cap`, `join-stall`, `handshake`, `rate`, `capacity`, `protocol`, `client-close`, `host-left`, `backpressure`, `socket-error` and `shutdown`.

Every JSON message carries `protocol: 1`. A host sends `{type: "host", room: "1234567"}` and receives `hosted` with a random invitation token and player 0. A guest sends `{type: "join", room, token}` and receives `joined` with player 1; the host receives `guest-joined`. Room numbers have seven digits. The invitation token is required: knowing the number alone is insufficient. No room list is exposed.

A guest sends `input` with `payload`; only the host receives it, labelled player 1 by the relay. The host sends `state` with `payload`; only the guest receives it, labelled player 0. The relay never accepts guest state. Payload schemas, game session IDs, tick/sequence validation and applying snapshots remain browser-session responsibilities. The existing envelope receiver is not automatically wired to this outer relay framing.

Clients must send `heartbeat` or valid traffic more often than the drop interval. The relay drops silent sockets, notifies the host with `guest-left`, and closes a guest when the host leaves. It does not modify rules state or perform the hat/creature/return-home consequences; those require the gated game integration. Guest controls expire separately after 250 ms; heartbeats must never renew held movement. Both timings are configurable (`inputLease` arguments in the browser module, environment for server timeout).

The implemented limits above need hosted playtest measurement before any production-capacity claim. Real full snapshot size and throughput have not been measured. No telephone UI, external service or browser gameplay session is created here.
