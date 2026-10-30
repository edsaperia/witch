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

The release gate was lifted by coordinator comment 6513114943 (2026-10-30): v5734, prototype `08b4213a4`, merged normally here at `571d65e24`. Narrow integration is authorized, avoiding concurrent effects/stations/hats/unlock/attack edits. The page checkpoint below is implemented but awaiting cloud browser verification. Reconnect, telephone UI and three players remain outside this milestone; mid-night joining is explicitly included by the ruling.

## Page integration checkpoint (not milestone FINAL)

Coordinator 6513448941 approved a separate `online.html` Vite page. `index.html` and `src/main.ts` remain unchanged. The opt-in entry uses real rules/Input/View, host-frame replication and a presentation facade whose camera and host-facing lookups follow the assigned player without swapping authoritative rules aliases. An optional View callback draws the other witch using the existing atlas. Guest wake reuses the host bedroom (6513359265); guest bedrooms are a follow-up for the FINAL review pack.

This checkpoint is not browser-verified. Host-frame handoff, local camera, join/leave ownership and transport have nearby headless tests. The page has no music/sound engine, station customization panels, shared permanent-collection settlement or save/resume integration. Guest departure has logical happy-creature/loose-sigil and hat placement cleanup, but the departed hat's treetop falling animation is not implemented. Remote witch drawing uses simplified idle/flight poses and the same atlas; it needs bounded browser checks for room projection and occlusion. Returning home currently navigates to the ordinary page, whose existing resume choice applies. These limits must not be called finished online play.

The first before/after ordinary-entry measurement failed the identical-size condition: baseline `main-Cl-JQHUM.js` 1,977,892 bytes; with online as another input `main-BIxGhqQ8.js` 883,884 bytes. Both builds passed, but Rollup extracted common code. Coordinator 6513573682 required an independent build instead. `vite.online.config.ts` now builds only online.html into `dist/online/`, after the ordinary build, while `vite.config.ts` and View source are restored. The ordinary entry is again exactly 1,977,892 bytes, with identical SHA-256 `612f2e34b9560f39a2440f201c4e6afec29bedc3d8d52b7bd6b1fa91e7e338b4`. The online-only rendering adapter decorates its View instance's player-batch update; it adds no code to ordinary View. The output folders do not collide (`dist/assets` versus `dist/online/assets`); the existing Pages workflow copies all `dist/.`, including `dist/online/`. This confirms artifact inclusion, not a verified remote deployment. Coordinator 6513615782 routes two-page verification to the cloud, after this checkpoint is published; no laptop browser slot is authorized.

New page text at this checkpoint (all additions; no replacement of existing page text): `Witch · two-player prototype`; `Two-player prototype`; `Connecting…`; `Open the invitation on a second browser`; `Pause`; `Resume`; `Start party at the decks`; `Leave`; `WASD moves · E wakes / uses · Space rises · Esc pauses`; `Host · <build>` / `Guest · <build>`; `Guest left · Host · <build>`; `The relay connection ended. Leave to return home.`; `Online state lost its sequence. Leave and open a new invitation.`. Transport/validation errors are also surfaced in the status element. No ordinary-page text changed.

## Slow-guest repair after X-ray 6514578225

The first cloud check at ef4c78aa reached guest-ready once in five tries (154 seconds), with other runs stuck or sent home. This is a failed acceptance check, not online-play validation. Coordinator 6514585047 lifted the freeze and requested bounded joining grace, loading-stage evidence and a rerun.

The relay now grants joining connections at most 180 seconds before activation, with the existing five-second silence timeout after activation; a test advances a joining guest beyond five seconds and checks both later deadlines. A guest builds from a static initial snapshot while the host continues. The host withholds replay frames until the renderer reports ready, then sends a fresh authoritative snapshot; the guest preserves its built map/forest while applying it and reports active. This removes concurrent guest simulation/backlog work during View preparation without changing shared worker scheduling. It is not proof that the worker queue wait is fixed.

`window.witchOnline.loading` and bounded `online loading` console records show View.create versus View.prepare, recent build/preparation marks, compile readiness, home-art flags, pending/urgent jobs, queued/busy worker job names, recent art timing records and slicing stats. These read existing queues; no #1464 worker code was changed. The next cloud driver must capture them on a stall to distinguish art queue waits from shader/ground work. New loading status text: `Joining the current night…`. Root note/link registries are updated under explicit scope approval 6514214686. Prototype bf68860ab was merged normally after the cloud report.

X-ray rerun 6515063371 reached ready in 3/5 attempts, below its 4/5 gate. Create and prepare each took about 80 seconds on the shared four-core SwiftShader runner; two failures ended the host connection around 155–166 seconds. Coordinator 6514769087 clarified that each View owns its art queue/pool, so this is not evidence of the guest waiting behind the host's shared FIFO. Slow loading is a recorded performance follow-up, not a speed fix in this branch.

Per coordinator 6515067065, the host now has a bounded 20-second silence allowance only while a guest is joining, then the usual five seconds again. The relay logs one attributed close record per connection. Input arrival and sampling both use performance.now; sampling also clamps an earlier frame stamp rather than throwing. Tests cover the loading-host deadline, normal deadline after activation, close reasons and the observed fractional-clock skew. No new player-visible text changed for these repairs. The remaining driven acceptance items still require the next X-ray rerun.
