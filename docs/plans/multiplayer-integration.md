# Multiplayer integration: first two-person social playtest

Owner assignment: Ed, 2026-10-31, via root: “Assign multiplayer to one of your builders and I will work with them on it.” Branch `codex/multiplayer-integration`, isolated `work/multiplayer-integration`, based on remote prototype `003eb8cc0fad18014fe1d8430784d649fc5e4a0d`. This first commit is an integration audit/brief only, not online-play acceptance or permission to deploy a relay. PR #1522's finished pause fix remains unchanged and under canonical release ownership.

## Result and existing decisions

Ed and a friend can meet through the ordinary game's telephone, visit the host's island, wake in the guest bedroom, play with normal controls/cameras/appearance/music/stations, and leave or redial safely. Reuse merged #1471's host-authoritative WebSocket implementation; do not build another networking stack. The first complete slice is two witches. A third witch follows after that slice works unless Ed/coordinator changes the order.

Latest rulings in `docs/backlog/platform.md` supersede its older notes: browser multiplayer before the port; host owns simulation, guests send inputs; normal shared time unless **all witches are in the treehouse**; legend circles do not slow multiplayer time; ordinary unscaled waves; successful permanent unlocks shared by all players; no helping each other up. Existing rules pause only when every player pauses. The Oct29 pause wording also records a proposed policy, so confirm this is the intended final social behavior rather than silently expanding it into a host-only global pause.

Guest arrival/departure follows the telephone design, with no new map indicators. Shared host hats/brooms/bags and exclusive broom parts must not be duplicated. Guest equipment, face/clothes and personal browser settings need separate presentation/ownership adapters. Room placement remains Ed's camera-authoritative layout, supplied by the house owner.

Ed ruling in this owner chat, 2026-10-31 (recorded on PR #1538, comment6544237613): returning from a friend's game starts a **fresh solo night**, not the interrupted saved night. Successful permanent unlocks remain kept/shared. Clear/replace only the participating slot's interrupted-night checkpoint at the reviewed session transition, never its permanent collection or another slot, and never write the host's multiplayer snapshot as the guest's solo night. Exact crash/reload/failed-call transition boundaries still need explicit lifecycle tests.

## Current source audit

| Area | What exists at the base | Integration gap / acceptance obligation |
|---|---|---|
| `server/relay.mjs` | Protocol1 relay, host/guest roles, random invitation token, seven-digit room, real socket tests; HTTP build identity; guest state rejected | Single host + one guest only. No origin policy, connection/rate quota or public-operational setup. Bound message/backpressure limits exist (8MiB /16MiB); measure real bandwidth before changing representation. |
| Loading and liveness | Actual advancing load progress; 90s stall/600s absolute cap; normal5s silence; host20s allowance during guest loading | Keep progress truthful, cleanup deterministic and input lease independent (250ms). Test cold service connection, late join, version mismatch, host departure and redial over the actual hosted route. |
| `src/platform/online/entry.ts`, `online.html` | Separate opt-in page using real Input/View/Game, mid-night attach, initial snapshot/rebase and ordered host-frame replication | Ordinary `main.ts` has no online/telephone entry. Prototype builds a new host game, has its own simple buttons/frame loop, no normal station/audio/persistence integration. Extract reusable session ownership; do not copy a second normal game loop. |
| Replication/input | `replay.ts` reuses NightSnapshot; build compatibility, numbered frames and restore; `guestInput` allowlist/sequence/edge consumption/expiry | Replay frames currently carry host inputs/dt every animation frame, not the old proposed20Hz nearby-state/prediction design. Keep the proven model initially; audit latency and throughput. The generic envelope helper is not automatically the active wire wrapper; do not claim its session check protects every entry message. |
| Local presentation | `localView.ts` follows assigned witch for a presentation-only facade; `otherWitches.ts` decorates its View | Normal HUD, room projection/occlusion, wake/clothes, face/wardrobe and audio/stations must consistently use the local witch. Never pass the reordered facade to simulation or persistence. Existing remote witch uses simplified poses/shared atlas. |
| Membership | `membership.ts` adds ID1 mid-night and uses existing wake; departure releases happy creatures/sigils/relics/hat | Prototype deliberately reuses host bedroom. Need house-owner guest room/bed/door adapter; no hard-coded new room placement. Verify shared possessions and falling/lake/bedroom hat outcomes against latest rules. |
| Progress/saves | `sharedNightProgress.ts` exposes successful unlock descriptors, without writing storage | No browser settlement adapter in prototype. Must apply only host-authorized outcomes idempotently to each active personal slot; never save host multiplayer state as guest's solo checkpoint. Confirm guest's interrupted solo-night/return policy with Ed. |
| Telephone | `config/house/rooms/boudoir.json` has a `say` placeholder (“The line's quiet. Friends can call later.”) | Normal telephone host/join/leave, remembered number, dial/ringing/answer/busy/reject states, invitation authority and redial. Number-only calling needs a reviewed consent flow; do not remove bearer-token protection to imitate dialing. |
| Social proof | Historical cloud joins, snapshot agreement and host-departure results are retained in online-prototype notes | These do not prove normal-game integration, real-internet/two-machine behavior or a human social playtest. All still required. |

## Stale document contradictions to resolve explicitly

- DESIGN's “networking comes later” and platform.md's “nothing started / don't build / after the port” are historical. Oct29 browser-first priority and Ed's Oct31 assignment now authorize integration; they do not authorize public deployment or paid service changes.
- Oct24 mixed slow places (pause/legend circle/house) are superseded by Oct29 treehouse-only multiplayer slowdown. Existing `slowTime.ts` already implements the later rule.
- `server/README.md` says no page integration,180s absolute grace and future payload integration. Actual merged source has an opt-in online page and90s stall/600s cap. Update this reference as part of the first owned protocol/hosting preparation milestone, preserving historical evidence.
- Online notes' initial “not browser-verified”/gated actor creation precede later cloud evidence; their explicit limitations (no audio/stations/shared permanent storage/guest room) remain real. Provide a current status summary instead of erasing failed runs or overstating acceptance.
- Oct24 says a guest leaves her own night behind and starts fresh at home next time. Prototype `soloHome()` navigates to normal entry, whose modern save slots may resume that old solo night. Decide the intended behavior with Ed before implementing storage transition. Permanent shared unlocks remain shared either way.
- The prototype starts a guest with bare broom/plain hat to avoid duplication; that is a prototype constraint, not a final ruling about the host's shared wardrobe or guest personal appearance.

## Small delivery stages and gates

1. **Protocol and hosted-relay preparation (independent of house layout).** Audit existing handshake/state validation, origin/size/rate/backpressure/cleanup/version behavior. Add only bounded missing protections with focused tests after canonical file boundaries. Prepare Render configuration/instructions for Ed, pinned build health and local cleanup; no account action, service creation, paid-plan change, deployment, daemon or public exposure. Preserve room-token secrecy. Record measured payload size and intended one-instance room ownership; horizontal scaling needs a separate design.
2. **Ordinary game session seam and telephone.** Introduce narrow app session/telephone adapters around existing #1471 modules; keep normal solo entry working. Define host/join/answer/leave/failure state transitions and lifecycle before wiring main. Canonical assigns exact `main.ts`/input/save hooks to avoid concurrent edits. Telephone art, room placement and audio hooks come through their owners. Guest-room work does not block stage1.
3. **Two-person play completion.** Use the house owner's guest bedroom/wake and door adapter; local appearance/camera/HUD/controls; normal music/SFX/stations via assigned-witch hooks; shared equipment exclusivity; all-in-bed ending; host-authorized successful unlock settlement to both personal slots. Implement Ed's explicit return/solo-night policy. Maintain deterministic shared rules and per-player pause.
4. **Departure/redial and acceptance.** Cover leaving, kick/refusal, socket loss, sleeping/cold relay, host tab loss and stale invitations. Release held controls, settle guest effects on host once, return to own home/phone with redial state, and avoid solo-save corruption. Canonical exact-SHA browser proof, then Ed+friend on two machines over real internet. Record latency/bandwidth/responsiveness and limits; no social-pass claim from snapshots alone.
5. **Third witch.** Only after coherent two-person acceptance: extend relay/membership identities, second guest bedroom, shared equipment and per-player UI without a second protocol or hard-coded room geometry.

Every stage gets nearby tests/typecheck with one worker and a pushed own-branch milestone. Canonical owns full suite, cloud/browser allocation, combined build and release. No perpetual five-minute polling is added; root wakes this owner when new instructions arrive.

## Ownership requests (canonical to confirm on this PR)

- Proposed direct ownership: `src/platform/online/`, new narrowly named multiplayer app/telephone adapters and tests, `server/`, this brief and online current-status notes. Reuse current snapshot/progress/save APIs rather than editing them speculatively.
- #1526 owns active room layout, guest bed/DJ/hat ordered spawn points, kitchen and worker adapters. Request stable guest-room/bed/telephone-use hooks; do not edit its room/layout/render files concurrently.
- #1536 owns audio hooks; request an assigned-witch/audio-clock interface and telephone sound routing. #1470/#1532 own active art paths; request appearance/remote-witch drawing adapters rather than rewriting generators.
- `src/main.ts`, station dispatch, pause/input and slot/checkpoint hooks require an explicit narrow ownership agreement before implementation. No wider refactor under this brief.
- Shared progression settlement and interrupted guest solo-night policy go through Ed in this chat, with every ruling copied onto this PR. No new placement without respecting his camera/layout decisions.

## Render preparation baseline (not deployment instructions executed)

Existing service is `server/`, `npm ci` then `npm start` (`node relay.mjs`). A hosted instance needs `HOST=0.0.0.0`, the platform-supplied `PORT`, and exact `WITCH_SHA` for the JSON health identity. Browser endpoint must be secure `wss://` from the HTTPS game. Tokens remain outside normal URL requests/referrers. Public setup waits on audited origin/rate/connection policy and Ed's chosen service configuration. Prepare a concrete reviewable setup for Ed before any account/deployment request; current Render-specific UI/behavior must be checked against official documentation when those instructions are written.

No runtime/player-visible text changed in this initial audit. Tests/browser/deployment not run for this documentation-only commit.
