# Two-browser prototype

Assigned slice (Ed, 2026-10-30): two players on the host's island, joined by link, in separate browsers. Builds on multiplayer groundwork #1457 at `bcf86735e8c83d318de37f066c76706e3fb5f2eb` and its #1455 snapshot dependency. This document proposes integration contracts; it does not expose online play.

## Authority and public boundaries

- The host owns the authoritative `Game`, tuning, seed and fixed-step clock. A guest cannot provide a replacement island or successful unlocks.
- A connection assigns the guest stable witch ID 1; the host is ID 0. The host runs normally and the guest joins mid-night (coordinator ruling, 2026-10-30). Creating/removing the guest actor waits for the rules/app integration gate.
- The guest sends versioned input envelopes with session ID, player ID and monotonically increasing sequence number. The host binds player ID to the connection, rejects wrong-session/version/duplicate messages, and records accepted inputs against host ticks.
- The host advances one complete two-witch input array per fixed step. Input arrival never advances the simulation directly. Held guest input expires at 250 ms, then becomes neutral; one-shot presses must be consumed once rather than leased. Five seconds without a message drops a line. Both timings are knobs. Heartbeats keep a connection alive but must not extend held movement.
- The host sends an initial full snapshot and numbered authoritative updates. Snapshot serialization uses `nightSnapshot.ts`, not a second serializer. Prototype bandwidth is measured before choosing full snapshots versus nearby-state deltas.
- Guest presentation reads its assigned witch for camera, controls, menus and audio. It must not swap the authoritative `g.witch` alias, which rules and existing host-facing helpers depend on.
- Successful permanent unlock descriptors come from the host's existing `sharedNightProgress`; applying them to each browser's own permanent collection is a separate reviewed integration. Guest sessions must not overwrite the guest's saved solo night.

## Transport-independent test seams

Keep envelope validation, tick input assembly and session state separate from the browser transport. A loopback adapter can delay, duplicate and reorder envelopes without a deployed service. A two-process harness should serialize messages between independent rules instances, compare canonical snapshots including RNG cursors, and prove that guest input cannot control witch 0. It must also cover stale sequence numbers, incompatible protocol versions, all-player pause and independent controls.

These checks prove protocol and replication behavior only. The acceptance gate for the slice is two browser pages: host creates a session, guest opens its link, each controls its own visible witch, each camera follows its own witch, the shared world agrees, and solo entry still works. Browser checks must identify the served commit. A screenshot is not a human social playtest.

## Coordinator ruling (2026-10-30, comment 6512299207)

1. WebSocket, host-authoritative. Small Node relay in `server/`, one room per phone number, local first. Ed chose his Render account for later hosting; Ed creates that service. No external deployment or account action by this branch.
2. Owned files: `server/`, `src/platform/online/`, this note. Main/render/camera/audio/save integration waits until #1455 and #1457 are released on `claude/prototype`; the coordinator will confirm. Keep hooks narrow around active station/effects builders.
3. No start lobby: guest joins the running host. Dropped-line consequences follow platform.md: guest returns home, leashed creatures stay happy, hat falls. These game consequences are not implemented by the relay.

## Current status

Local relay, input assembly and browser transport seams are implemented with nearby tests. See `server/README.md` for running it and the wire contract. `guestInput` allowlists ordinary controls, excludes debug commands and consumes edges once while held controls expire. `connectRelay` owns heartbeat/close cleanup; `invitationLink` carries the invitation token in the URL fragment. These modules do not automatically install page hooks.

The release gate was lifted by coordinator comment 6513114943 (2026-10-30): v5734, prototype `08b4213a4`, merged normally here at `571d65e24`. Narrow integration is authorized, avoiding concurrent effects/stations/hats/unlock/attack edits. No game hooks, visible UI or persistence changes yet. Two real loopback clients test routing and liveness; this is not two-browser gameplay, two-process rules determinism or snapshot replication. Browser verification still requires an assigned serial slot. Reconnect, telephone UI and three players remain outside this milestone; mid-night joining is explicitly included by the ruling.
