import { newGame, newWitchPlayer, type Controls, type Game } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { startWake } from "../../rules/wakeUp";
import { wakeInBedroom } from "../../rules/opening";
import { bareBroom } from "../../rules/broomParts";
import { setParts } from "../../rules/spells";
import { Input } from "../input";
import { View } from "../../render/view";
import { prewarmArtWorkers } from "../../render/assets";
import { gameStyle, styleFromLink, viewFromLink } from "../../app/viewParams";
import { connectRelay, invitationLink, soloHome } from "./relayClient";
import { guestInput, wireControls } from "./guestInput";
import { attachGuest, detachGuest } from "./membership";
import { localView } from "./localView";
import { otherWitches } from "./otherWitches";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame, type ReplayStart } from "./replay";
import { snapshotGame } from "../../rules/nightSnapshot";
import { nextFrame, runSliced, sliceLog, type Steps } from "../../render/slices";
import { buildProgress } from "./buildProgress";
import { prepareJoin } from "./joinPreparation";
import { sessionDeparture } from "./departure";

declare const __BUILD__: string;
const build = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
const params = new URLSearchParams(location.search), guest = params.get("online") === "guest";
const endpoint = params.get("relay") ?? "ws://localhost:8787";
const room = params.get("room") ?? String(crypto.getRandomValues(new Uint32Array(1))[0] % 9000000 + 1000000);
const token = new URLSearchParams(location.hash.slice(1)).get("invite") ?? undefined;
const status = document.getElementById("status")!, invite = document.getElementById("invite") as HTMLAnchorElement;
const heldMs = Number(params.get("heldInputMs") ?? 250);
let game: Game, presentation: ReturnType<typeof localView>, view: View;
let replica: ReturnType<typeof replayGuest> | undefined, tick = 0, sequence = 0, ready = false, paused = false, castWanted = false, stopped = false;
let guestPresent = false, guestIsReady = false, prepared = false, synchronized = false, failure: string | null = null;
let loadingStage = "connecting";
let joining = false, frameRequest = 0;
let loadingProgress = 0, reportProgress = () => {};
const loadingMonitors = new Set<ReturnType<typeof setInterval>>();
const loadingLog: { at: number; stage: string; detail?: unknown }[] = [];
const trace = (stage: string, detail?: unknown) => {
  if (!stage.endsWith(":waiting") && stage !== loadingStage) { loadingProgress++; reportProgress(); }
  loadingStage = stage; loadingLog.push({ at: Math.round(performance.now()), stage, detail });
  if (loadingLog.length > 120) loadingLog.shift();
  console.info("online loading", stage, detail ?? "");
};
const inputBuffer = guestInput(heldMs);
const setStatus = (text: string) => { status.textContent = text; };
const fail = (error: Error) => { failure = error.message; trace("failure", { message: error.message, stack: error.stack }); setStatus(error.message); };
prewarmArtWorkers();

async function prepare(source: Game, player: number, signal?: AbortSignal) {
  trace("view-create:start");
  let phase = "view-create";
  let lastProgress = "";
  const monitor = setInterval(() => {
    const buildMarks = performance.getEntriesByType("mark").filter(m => m.name.startsWith("witch:prep-") || m.name.startsWith("witch:build-"));
    // Only completed work or new build stages advance the lease; repeating a waiting log does not.
    const progress = JSON.stringify([buildMarks.length, view?.readiness, view?.assets.home, view?.assets.timings.length,
      view ? [...view.assets.typeLog].filter(([, value]) => value.landed !== undefined).length : 0]);
    if (progress !== lastProgress) {
      lastProgress = progress; loadingProgress++; reportProgress();
      setStatus(phase === "view-create" ? "Joining… drawing the island" : `Joining… preparing the view (${Math.round((view?.readiness.share ?? 0) * 100)}%)`);
    }
    const marks = performance.getEntriesByType("mark").filter(m => m.name.startsWith("witch:prep-") || m.name.startsWith("witch:build-")).slice(-6).map(m => ({ name: m.name, at: Math.round(m.startTime) }));
    // Read-only queue evidence; worker scheduling remains owned by the travel/performance work.
    const a = view?.assets as unknown as { queue?: { kind: string; id: unknown }[]; workers?: { busy: boolean; job?: { kind: string; id: unknown } }[]; urgentKeys?: Set<string> } | undefined;
    trace(`${phase}:waiting`, { marks, readiness: view ? { ...view.readiness } : null, pending: view?.assets.pending,
      home: view ? { ...view.assets.home } : null, queue: a?.queue?.slice(0, 8).map(j => ({ kind: j.kind, id: j.id })),
      workers: a?.workers?.map(w => ({ busy: w.busy, job: w.job ? { kind: w.job.kind, id: w.job.id } : null })), urgent: a?.urgentKeys ? [...a.urgentKeys].slice(0, 8) : [],
      timings: view?.assets.timings.slice(-8), typeLog: view ? [...view.assets.typeLog].slice(-8) : [], slices: sliceLog.slice(-3) });
  }, 5000);
  loadingMonitors.add(monitor);
  const clearMonitor = () => { clearInterval(monitor); loadingMonitors.delete(monitor); };
  signal?.addEventListener("abort", clearMonitor, { once: true });
  game = source; presentation = localView(game, player);
  const style = styleFromLink(params, game.tuning);
  try {
    // Same construction/order/budget as View.create, observing this instance's completed build steps.
    await nextFrame();
    view = new View(document.getElementById("game") as HTMLCanvasElement, presentation.game, gameStyle(style, game.tuning), null, true);
    const steps = (view as unknown as { build(): Steps }).build();
    await runSliced(buildProgress(steps, () => { loadingProgress++; reportProgress(); }), "view", 8);
  }
  catch (error) { clearMonitor(); throw error; }
  signal?.throwIfAborted();
  trace("view-create:done", sliceLog.map(s => ({ what: s.what, ms: s.ms, longestAt: s.longestAt })));
  viewFromLink(view, params);
  otherWitches(view, game, player);
  const resize = () => view.resize(innerWidth, innerHeight);
  resize(); addEventListener("resize", resize);
  trace("view-prepare:start");
  phase = "view-prepare";
  try { await view.prepare(); } finally { clearMonitor(); }
  signal?.throwIfAborted();
  trace("view-prepare:done"); prepared = true;
  connection.sendReady();
  if (!guest) { ready = true; setStatus(`Host · ${build}`); }
  else setStatus("Joining the current night…");
}

if (!guest) {
  const tuning = structuredClone(TUNING), seed = Number(params.get("seed") ?? 123);
  if (!Number.isInteger(seed)) throw new Error("Invalid island seed");
  if (params.has("island")) tuning.map!.island = params.get("island")!;
  game = newGame(seed, tuning);
  wakeInBedroom(game); startWake(game, game.herTime, { yesterday: true, mirrored: true });
  game.clock.paused = false;
  void prepare(game, 0).catch(fail);
} else if (!token) throw new Error("The invitation is missing");

const connection = connectRelay({ endpoint, room, token: guest ? token : undefined,
  onError: fail,
  onClose() { if (guest) { returnHome(); return; } detachGuest(game); guestPresent = guestIsReady = false; inputBuffer.clear(); setStatus("The relay connection ended. Leave to return home."); },
  onMessage(m) {
    if (m.type === "hosted" && typeof m.token === "string") {
      invite.href = invitationLink(location.href, endpoint, room, m.token); invite.hidden = false;
    } else if (m.type === "guest-joined" && !guest) {
      if (guestPresent) return;
      // No host equipment is duplicated: the prototype guest starts with a bare broom and plain hat.
      const W = newWitchPlayer(1, 0, 0, game.tuning); setParts(W.spells, bareBroom()); W.spells.hat = "none";
      attachGuest(game, W); guestPresent = true; inputBuffer.clear();
      guestIsReady = false;
      connection.sendState({ kind: "start", start: replayStart(game, build, tick) });
    } else if (m.type === "guest-ready" && !guest && guestPresent) {
      // Rendering is now built: rebase the guest to the current authoritative instant, not a long replay backlog.
      guestIsReady = true;
      connection.sendState({ kind: "start", start: replayStart(game, build, tick) });
    } else if (m.type === "input" && !guest && m.player === 1) {
      inputBuffer.accept(m.payload, performance.now());
    } else if (m.type === "guest-left" && !guest) {
      detachGuest(game); guestPresent = guestIsReady = false; inputBuffer.clear(); setStatus(`Guest left · Host · ${build}`);
    } else if (m.type === "state" && guest && m.player === 0) {
      const payload = m.payload as { kind?: string; start?: ReplayStart; frame?: ReplayFrame };
      if (payload?.kind === "start" && payload.start && !replica && !joining) {
        joining = true;
        const start = payload.start;
        trace("start-snapshot:received", { tick: start.tick, acc: start.transient?.acc });
        void prepareJoin({ restore: () => { replica = replayGuest(start, build); return replica.game; }, prepare: (g, signal) => prepare(g, 1, signal), progress: () => loadingProgress, trace, fail });
      } else if (payload?.kind === "start" && payload.start && replica && prepared) {
        trace("sync-replay:start", { tick: payload.start.tick, acc: payload.start.transient?.acc });
        replica = replayGuest(payload.start, build, game);
        trace("sync-replay:done");
        connection.sendActive();
        synchronized = ready = true; trace("join:synchronized", { tick: replica.tick });
        setStatus(`Guest · ${build}`);
      } else if (payload?.kind === "frame" && payload.frame && replica && synchronized) {
        if (!replica.apply(payload.frame)) { stopped = true; fail(new Error("Online state lost its sequence. Leave and open a new invitation.")); }
      }
    }
  },
});
reportProgress = () => { connection.sendProgress(loadingProgress); };
const input = new Input();
let cleaned = false;
const cleanup = () => {
  if (cleaned) return; cleaned = true;
  stopped = true; ready = false; cancelAnimationFrame(frameRequest); input.release();
  for (const timer of loadingMonitors) clearInterval(timer); loadingMonitors.clear();
  connection.close();
  // Only this page's instance-owned resources; no shared worker implementation is changed.
  const workers = (view?.assets as unknown as { workers?: { w: Worker }[] } | undefined)?.workers ?? [];
  for (const { w } of workers) w.terminate();
  view?.renderer.dispose();
};
const returnHome = sessionDeparture(cleanup, () => { location.replace(soloHome(location.href)); });
input.aimFrom = (x, y) => ready ? view.aimAt(x, y) : null;
const pause = () => { paused = !paused; input.release(); document.getElementById("pause")!.textContent = paused ? "Resume" : "Pause"; };
document.getElementById("pause")!.onclick = pause;
document.getElementById("party")!.onclick = () => { castWanted = true; };
document.getElementById("leave")!.onclick = returnHome;
addEventListener("keydown", e => { if (e.code === "Escape" && !e.repeat) pause(); });
addEventListener("beforeunload", cleanup);
let last = 0;
function frame(now: number) {
  frameRequest = requestAnimationFrame(frame);
  const dt = Math.min(0.1, last ? (now - last) / 1000 : 0); last = now;
  if (!ready || stopped || failure) return;
  const raw = input.read(), controls = wireControls(raw)!;
  controls.pausePage = paused;
  if (paused) { controls.moveX = controls.moveZ = 0; controls.fire = false; }
  if (castWanted) { controls.castParty = true; castWanted = false; }
  if (guest) connection.sendInput({ sequence: sequence++, controls });
  else {
    const inputs: Controls[] = guestPresent ? [controls, inputBuffer.sample(performance.now())] : [controls];
    const update = replayHostStep(game, inputs, dt, ++tick);
    if (guestPresent && guestIsReady) connection.sendState({ kind: "frame", frame: update });
  }
  presentation.update(dt, raw.zoom);
  view.render(game.clock.time);
}
frameRequest = requestAnimationFrame(frame);
// Read-only bounded-check seam; does not replace either player's controls.
Object.assign(window, { witchOnline: {
  build, role: guest ? "guest" : "host",
  get ready() { return ready; }, get tick() { return replica?.tick ?? tick; },
  get state() { return ready ? snapshotGame(game) : null; },
  get players() { return ready ? game.witches.map(w => ({ id: w.id, x: w.body.x, z: w.body.z, paused: w.paused })) : []; },
  get failure() { return failure; },
  get loading() { return { stage: loadingStage, progress: loadingProgress, prepared, synchronized, log: [...loadingLog] }; },
} });
