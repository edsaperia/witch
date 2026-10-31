# Hosted relay preparation for Ed

Preparation only for PR #1538, 2026-10-31. No Render account/service/plan change or deployment has been performed. Do not deploy this prototype until the public-entry gaps below are addressed and Ed/canonical authorize the exact revision. This is a small Node Web Service alongside the game, not a move of the GitHub Pages site.

## Reviewable service settings

| Setting | Value to prepare |
|---|---|
| Repository | `edsaperia/witch` |
| Service type / runtime | Web Service / Node |
| Root Directory | `server` |
| Build command | `npm ci` (uses `server/package-lock.json`) |
| Start command | `npm start` (`node relay.mjs`) |
| Bind address | Environment `HOST=0.0.0.0` |
| Port | Keep Render's supplied `PORT`; relay reads it. Do not hard-code local8787 publicly. |
| Build identity | Set `WITCH_SHA` to the exact reviewed service-source commit; root JSON health must report it. A later startup adapter can derive this from platform metadata, but no unimplemented env name is assumed here. |
| Health check path | `/` returns relay JSON with `service`, `protocol`, `build`; expect protocol1 and approved SHA. A healthy process does not prove two-client gameplay. |
| Git branch / deploy revision | Coordinator-approved revision, pinned in the deployment record; not automatically whichever builder tip is newest. |
| Auto-Deploy | Off during controlled playtest preparation. Manual deployment is still an Ed/canonical action, not executed by this document. |
| Instances | One: current rooms live in this process's Map. More instances would split host and guest room ownership. |
| Plan and region | Ed selects the existing service/region. His recorded choice was Free while building, paid for playtests; any paid change requires his authorization. No price assumed. |

These field meanings, port binding and automatic deploy behavior follow Render's [Web Services](https://render.com/docs/web-services), [first-deploy guide](https://render.com/docs/your-first-deploy) and [deploy settings](https://render.com/docs/deploys), checked2026-10-31. The concrete commands/environment above come from this repository's service entry, not an Express template. No game build belongs in this service's build command.

## Connection and restart behavior to prove

- After an authorized deployment, use the service's HTTPS root to check exact identity, then its corresponding `wss://` endpoint from both game browsers. Render documents secure WebSockets for public connections; local `ws://127.0.0.1:8787` is only a local test address. [WebSocket documentation](https://render.com/docs/websocket).
- Current server accepts WebSocket upgrades on its HTTP server without an application path restriction. Do not invent `/ws` as a required route. Agree an explicit path only with a tested protocol/hosting change.
- Free services idle after15minutes without inbound traffic and wake on HTTP/new WebSocket connection, with a documented startup delay around a minute. Existing inbound WebSocket messages count as activity. A phone must show an honest connecting/waking state and permit cancellation; do not run a keepalive daemon to evade service idling. [Free-service behavior](https://render.com/docs/free).
- Rooms/invitation tokens are memory-only. Process restart/redeploy loses them; no host migration or persistence is promised. Render may interrupt sockets and distributes connections across instances, so independent connections must not rely on multi-instance affinity. Keep one instance and exercise clean dropped-line/redial behavior. [WebSocket lifecycle/scaling](https://render.com/docs/websocket).
- Existing game input lease is250ms, activated silence5s, host-during-join20s, advancing-load stall90s and absolute join cap600s. These are separate clocks; a socket heartbeat never extends held input. A service cold-start happens before a room connection and is not covered merely by extending renderer loading limits.

## Public-entry gaps found in current source

| Source observation | Required bounded follow-up before public hosting |
|---|---|
| WebSocketServer has maxPayload8MiB and send checks bufferedAmount16MiB | Retain bounds; measure actual initial snapshot and frame traffic before choosing tighter budgets. Test exact oversize/backpressure closure and clean departure. |
| No Origin gate in the upgrade path | Explicit allowed game origins for main/PR playtest and a deliberate local-test exception; reject disallowed/missing origins according to the reviewed policy. This is a proposed guard, not a claim current service enforces it. |
| No per-connection message/connection/room quota | Bounded rate/burst and capacity handling that preserves valid loading progress/heartbeats and reports a useful refusal. Do not present room numbers as authentication. |
| Random bearer invitation token, no room list; guest cannot send state | Preserve these properties. Phone-number dialing must add invitation/answer consent without weakening token authority; don't expose tokens in logs/referrers or an enumerable directory. |
| Generic protocol1 outer framing and separate browser build check | Keep exact build/schema compatibility; reject malformed authority/state before activation. Confirm actual entry paths, not just unused helper tests. |
| HTTP health reports supplied WITCH_SHA; CLI lacks signal handler | Add/test bounded SIGTERM cleanup using existing relay.close if canonical assigns it. Verify deployed build identity and expected disconnect behavior; don't label arbitrary runtime metadata a proven source SHA. |
| Cold connect/error has no normal-game telephone UX yet | Explicit connecting/cancel/refusal/disconnect/redial states in the session/phone adapter. No forever-spinner or false “friend joined” before authoritative activation. |

No new server environment variables for quotas/origins are documented as usable until implemented and tested. These are source-audit findings, not a claim of an exploited vulnerability or an expanded hosting authorization.

## Prepared acceptance route (canonical allocation still required)

1. Review exact code/config and remaining Ed choices; canonical gives server/app boundaries. Run nearby pure/protocol tests with one worker and typecheck; socket integration tests must be short-lived and closed, never a leftover listener.
2. Ed/canonical creates or configures the approved service and explicitly deploys its reviewed revision. Record HTTPS build identity, secure endpoint, selected single-instance plan and exact game SHA. This agent has not performed those account actions.
3. Canonical hosted checks: correct/wrong origin, valid/invalid invitation, protocol/build mismatch, duplicate host/full room, stale input, payload/rate/backpressure bounds, cold wake, canceled join, idle restart, guest/host departure and redial. Logs omit payload/token secrets.
4. Two independent machines over real internet: telephone host/join/answer, guest room/wake, normal movement/cameras/appearance/audio/stations, shared time/pause/progress/equipment, fresh solo return with permanent unlocks kept. Ed+friend acceptance follows; old isolated cloud joins do not substitute for this.

Until those gates, the existing separate online page remains an opt-in prototype. A green health response is not a social playtest pass, and this preparation does not authorize a public deployment.
