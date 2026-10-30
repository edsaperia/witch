# Two-browser prototype

Assigned slice (Ed, 2026-10-30): two players on the host's island, joined by link, in separate browsers. Builds on multiplayer groundwork #1457 at `bcf86735e8c83d318de37f066c76706e3fb5f2eb` and its #1455 snapshot dependency. This document proposes integration contracts; it does not expose online play.

## Authority and public boundaries

- The host owns the authoritative `Game`, tuning, seed and fixed-step clock. A guest cannot provide a replacement island or successful unlocks.
- A connection assigns the guest stable witch ID 1; the host is ID 0. Exactly two witches are created before the night starts. Joining mid-night and reconnecting are excluded.
- The guest sends versioned input envelopes with session ID, player ID and monotonically increasing sequence number. The host binds player ID to the connection, rejects wrong-session/version/duplicate messages, and records accepted inputs against host ticks.
- The host advances one complete two-witch input array per fixed step. Input arrival must never advance the simulation directly. Missing guest input, input expiry and disconnect policy need explicit agreement before implementation; continuing held movement indefinitely is unacceptable.
- The host sends an initial full snapshot and numbered authoritative updates. Snapshot serialization uses `nightSnapshot.ts`, not a second serializer. Prototype bandwidth is measured before choosing full snapshots versus nearby-state deltas.
- Guest presentation reads its assigned witch for camera, controls, menus and audio. It must not swap the authoritative `g.witch` alias, which rules and existing host-facing helpers depend on.
- Successful permanent unlock descriptors come from the host's existing `sharedNightProgress`; applying them to each browser's own permanent collection is a separate reviewed integration. Guest sessions must not overwrite the guest's saved solo night.

## Transport-independent test seams

Keep envelope validation, tick input assembly and session state separate from the browser transport. A loopback adapter can delay, duplicate and reorder envelopes without a deployed service. A two-process harness should serialize messages between independent rules instances, compare canonical snapshots including RNG cursors, and prove that guest input cannot control witch 0. It must also cover stale sequence numbers, incompatible protocol versions, all-player pause and independent controls.

These checks prove protocol and replication behavior only. The acceptance gate for the slice is two browser pages: host creates a session, guest opens its link, each controls its own visible witch, each camera follows its own witch, the shared world agrees, and solo entry still works. Browser checks must identify the served commit. A screenshot is not a human social playtest.

## Coordinator decisions required

1. Transport and staging: recommended first milestone is an explicitly local WebSocket service with no external deployment, account or cost; an online staging service and its ownership require separate approval. Alternatively use WebRTC with an introductions service and relay arrangements; that adds service dependencies before the first two-browser check. No transport dependency has been added.
2. File ownership: this branch proposes owning new `src/platform/online/` protocol/session/transport modules and their nearby tests. Before integration, coordinate ownership of `src/main.ts`, local-player lookup in renderer/camera/audio, and `src/app/nightSave.ts` with #1455 and the coordinator.
3. Startup and failure behavior: agree a minimal create/join surface, when both players start, bounded input expiry and what the prototype does when a connection drops. Telephone/address book, three players, mid-night joins and reconnect are deferred until a new brief explicitly includes them.

## Current status

Architecture contract only. No networking runtime, service, dependency, visible UI or persistence changes. The next independent work is envelope validation and deterministic loopback tests; browser integration waits for the coordinator decisions above.
