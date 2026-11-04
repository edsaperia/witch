# tools/multiplayer

The two-player route (T5B on PR #1609) as a tool anyone can run: `route.cjs` drives two headless browser contexts (host and guest)
on one build, through one relay, with normal keys and clicks only. Positions and state come from the game's debug hooks
(`window.witch`, `witch.telephoneProof()`), as the other tools read them. It runs once and never retries; it always closes its browsers.

## `route.cjs`

```
node tools/multiplayer/route.cjs --build <game URL> --relay <ws:// or wss:// relay> --out <empty directory>
  [--seed 123] [--link "px=6"] [--expect-version <text in version.json>] [--expect-relay-build <relay build prefix>]
  [--viewport 960x540] [--headed]
  bounds in seconds: [--overall 480] [--load 180] [--phone 20] [--wardrobe 16] [--rejoin 20] [--bedHold 15] [--walk 30]
                     [--join 150] [--rollover 90] [--leave 90] [--redial 150] [--wake 25]
  diagnosis: [--watch <seconds>] [--profile <seconds>] [--trace] [--stop-after <stage>]
```

`--watch 25 --stop-after call-and-consent` samples both pages once a second from the dial to 25 s after connecting: the clocks
(world, her own, each witch's, the time scale and who is perched), frames with the sum of raw frame gaps and of the gaps capped at
0.1 s, draw and long-frame milliseconds, the step pipeline (guest steps sent, received and applied, empty host steps, catch-up,
holds, frames sent and received); three.js
`renderer.info` (calls, triangles, programs, geometries, textures), canvas and drawing-buffer sizes, the view's render targets,
and, with `--gl`, per-context WebGL counts (draws, instances, viewport pixels drawn, clears, read-backs, texture uploads and their sources),
plus the visible scene grouped by mesh before and after (`watch`, `sceneBefore`, `sceneAfter` in result.json; counts only).
`--profile 20 --stop-after call-and-consent` writes both pages' CPU profiles (`host.cpuprofile`, `guest.cpuprofile`, for DevTools)
for 20 s right after the visit starts, and `--trace` adds a Chrome trace of the host page (`host-trace.json`, which also holds the
shared GPU process). Profile an unminified build with source maps (`npx vite build --minify false --sourcemap --outDir dist-prof`).

`--wake` is the tool's own bound for each wake-up (a move key, then the 3 s stretch of her own time), not a T5B bound. A guest's
clock runs only as fast as her page sends steps, so on a slow software renderer it may need longer (`--wake 120`).

The build must be one with the telephone (the multiplayer branch, `codex/multiplayer-integration`). Both pages load it with
`?telephone=1&telephoneCalls=1&resume=1&seed=<seed>` (the proof switches, docs/LINK-SWITCHES.md) plus anything given with
`--link`. When `--relay` is not the game's own (`wss://witch-relay-playtest.onrender.com`), an init script rewrites that one URL in
each page's `WebSocket` constructor; nothing else about the game changes.

### Against a PR preview and the live relay

```
node tools/multiplayer/route.cjs --build https://edsaperia.github.io/witch/pr-1609/ \
  --relay wss://witch-relay-playtest.onrender.com --expect-relay-build 24cded08 --out /tmp/mproute/live-1
```

Behind an HTTPS proxy, Node's own `fetch` (the preflight) needs `NODE_USE_ENV_PROXY=1` (Node 22.21 or later); the browsers use
the system's proxy settings. Run one at a time against the live relay and leave a few minutes between runs: other people's calls use it too (it keeps calls
apart, but its room and connection limits are shared). The relay only admits pages from its allowed origin
(https://edsaperia.github.io), so a local build cannot use the live relay.

### Against a local relay and a local build (no network needed)

```
git worktree add --detach ../mp-build origin/codex/multiplayer-integration
cd ../mp-build && npm ci && npm run build && npx vite preview --port 4173 --strictPort    # serves dist/
cd ../mp-build/server && npm ci && WITCH_ALLOWED_ORIGINS=http://localhost:4173 node relay.mjs   # 127.0.0.1:8787
node tools/multiplayer/route.cjs --build http://localhost:4173/ --relay ws://127.0.0.1:8787 --out /tmp/mproute/local-1
```

`server/relay.mjs` listens on `HOST` (default `127.0.0.1`) and `PORT` (default `8787`); its health is `GET /`
(`{"service":"witch-relay","protocol":1,"build":...}`, the build from `WITCH_SHA`). `WITCH_ALLOWED_ORIGINS` is optional on
loopback; the other knobs (`WITCH_DROP_MS`, `WITCH_JOIN_GRACE_MS`, `WITCH_JOIN_STALL_MS`, `WITCH_HOST_JOIN_DROP_MS`,
`WITCH_MAX_CONNECTIONS`, `WITCH_MAX_ROOMS`) default to the deployed values.

On a software renderer the game can run at a few frames a second, and game time then falls behind the clock (each frame's step
is capped at 0.1 s), so the wall-clock bounds get harder. `--link px=6` (larger art pixels, presentation only) roughly doubles the
frame rate there. The result records each page's frame rate and game seconds per second at several points, so a failure can be
read against them.

## The stages

Each stage is PASS, FAIL or UNRUN (after a failure), with its time. At a failure both pages' state and screenshots are kept.

| stage | what it does | bound |
|---|---|---|
| preflight | GET the game page, its script and version.json (HTTP 200 each), and the relay's `GET /` identity | 60 s |
| load | two isolated contexts load the same build; both worlds ready; same version.json | `--load` |
| host-phone-ready | both get up from bed (a move key) and walk to their own boudoir telephone along the floor; E at each; "The line is ready." | `--walk` + `--phone` |
| call-and-consent | the host dials the guest's number and presses Call, the guest answers, both press "Connect to this new number"; both pages connected, two witches, same night | `--join` |
| both-move | the host steps away from the phone menu and walks 2 m (seen on the guest's page); the guest gets up (seen on the host's) | 45 s |
| guest-bedroom2 | the guest's room is bedroom2 on both pages | 10 s |
| guest-wardrobe | the guest walks from her bedside to bedroom2Wardrobe's reach, no teleport; the host's rules agree | `--wardrobe` (16 s) |
| forced-close-rejoin | the guest page's relay socket is closed once (`ws.close()`, not Leave); she must get `resumed`, then a host checkpoint, the warning cleared, the same night and witch, no new telephone registration | `--rejoin` (20 s) |
| guest-sleeps | the guest walks to bedroom2Bed and holds E until the host's rules have her asleep | `--wardrobe` + `--bedHold` |
| shared-night | the host walks to her bed and holds E; both pages move on to the same next night, still in the call | `--walk` + `--bedHold` + `--rollover` |
| leave-and-redial | the guest pauses and presses Leave visit; she is home at her telephone with the number ready; the host gets up, walks back to her telephone and opens it; the guest presses Call, the host answers; connected again | `--leave` + `--walk` + `--phone` + `--redial` |
| hang-up | the caller hangs up; both lines end | 30 s |

The relay makes the caller the host (server/telephone.mjs), so the host's page dials and the guest's page answers. On the redial
the roles swap: the guest, back home, calls and so hosts, and the old host visits her.

Walking: the route across the floor is planned on the page's own house shape (`telephoneProof().house`, using
config/house/shape.js `field`, `floorPath.cjs`), keeping off the edges, since stepping off any edge leaves the house. She holds the
arrow keys towards a point a metre along the route (up the screen is -z) and steps in with short presses for the last metre and a
half. The guest's own bedroom counts as open for her route, as the rules open it for her.

## What it records

`<out>/result.json` and `<out>/summary.md`, plus `<out>/screenshots/` at failures:

- stages and checks, with timings and each stage's details (walk lengths, wake-ups, focus at the E press, close code, rejoin times);
- the guest prediction's counters (`telephoneProof().network.prediction`, sampled every half second and added up across its
  restarts): snaps by kind (transition, correction, pending cap), transition reasons (held, perch, sleep, bed, ko), corrections,
  largest, pending peak, and the same per stage in the summary. A guest asleep in bed snaps on every acknowledgement (the
  prediction holds her), so most of the transition snaps of the sleeping stages are that, not a fault;
- the host's guest-input queue (`network.inputs`): discarded, longest hold, underruns, queued peak;
- catch-up steps, counted from the host's sent frames (`guestSteps` marked `catchUp`), and the guest's `hold` inputs (counts only);
- WebSocket events (`page.on("websocket")`: URL, open, close, errors) and, from the in-page wrapper, each socket's close code,
  wasClean and message counts by type; plus the times of lifecycle messages (resume, resumed, start checkpoints, peer-away...). No
  payloads, telephone numbers or tickets are kept;
- transport resumes per page: beyond the forced close, each is a socket the page replaced itself (a silence of two heartbeats);
- page errors and console errors, frame rate and game pace samples.

Exit code 0 only when every stage passes.
