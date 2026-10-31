// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { wakeInBedroom } from "../rules/opening";
import { startWake } from "../rules/wakeUp";
import { areaUnderWitch } from "../rules/game";
import { compareKey, rendererOf, sceneMode } from "./compareKey";

import { type BotKind } from "../rules/botKinds";

import { pleasingWitch } from "../ui/looks";

import { addFloorHat } from "../rules/houseRooms";
import { FIND_KINDS, fillTrunk, spawnFind, spawnSpot, type FindKindId } from "../rules/finds";
import { foundAll } from "./finds";
import { lend } from "./loan";
import { GUIDANCE_HOOKS } from "../rules/guidance";
import { installHooks } from "./hooks";
import { gpuSample } from "../render/view/gpuBudget";
import { endNight, startNight } from "./night";
import { sailHref } from "./sail";
import type { FlightEnd } from "../render/chart/seaChart";
import { restoreGame } from "../rules/nightSnapshot";
import { browserNightStore } from "./nightSave";
import { captureComment, parseCommentFile } from "./playtestComments";
import { LOG_EXPANDED_BYTES } from "../platform/logCodec";
import { observePlaytestErrors } from "../platform/playtestLog";
import { recordedStep, recordingFor } from "./recordingHooks";
import { replayRecording } from "../platform/inputRecording";
import { snapshotGame } from "../rules/nightSnapshot";

export function botGame(pageHost: PageHost, kind: BotKind): void {
  if (pageHost.botKind) return;
  pageHost.botKind = kind;
  const look = pleasingWitch(pageHost.N().seed);
  pageHost.lookNow = JSON.stringify(look); pageHost.showLook(); pageHost.wearHat(look);
  if (pageHost.creator.open) pageHost.creator.hide();
  void Promise.all([import("../rules/bot"), import("../ui/botGame")]).then(([{ BOT_GAME, newBot }, { BotTag }]) => {
    pageHost.bot = newBot(kind, BOT_GAME[kind]); // (the skilled one questing, bringing relics and feeding: rules/bot.ts BOT_GAME)
    pageHost.botTag = new BotTag(kind, () => pageHost.newNight("bot")); // (back to the start: a night in place on this link without ?bot)
    if (pageHost.N().flags.ready) pageHost.startDirect(); // (else the forest's ready starts it)
  });
}

export async function saveComment(pageHost: PageHost, text: string): Promise<string> {
  const n = pageHost.N();
  const comment = captureComment(n.game, text, { build: pageHost.BUILD, params: n.params.toString(), look: pageHost.page.look() as Record<string, unknown> | null, loan: pageHost.loan,
    flags: { chartRecorded: n.flags.chartRecorded, overRecorded: n.flags.overRecorded } }, pageHost.repro.link(), Object.fromEntries(pageHost.repro.changed()), pageHost.breadcrumbs.recent(n.game), Date.now(), recordingFor(n.game, pageHost.BUILD, pageHost.captureRecording).export());
  const kept = await pageHost.commentBook.add(comment);
  const status = kept ? "Comment and saved moment kept in the playtest log." : "Comment kept on this page only: browser storage is unavailable. Download the log before closing.";
  return comment.recording?.complete ? status : `${status} Exact input replay is incomplete: ${comment.recording?.failure ?? "unavailable"}.`;
}

export async function restoreComment(pageHost: PageHost, file: File): Promise<void> {
  if (file.size > LOG_EXPANDED_BYTES) throw Error("This log file is too large.");
  const comment = await parseCommentFile(await file.text(), pageHost.BUILD);
  // Validate the full graph before writing or navigating. Importing JSON never executes code.
  const replayed = comment.recording ? replayRecording(comment.recording, pageHost.BUILD) : restoreGame(comment.night.game);
  if (JSON.stringify(snapshotGame(replayed)) !== JSON.stringify(comment.night.game)) throw Error("Input replay differs from the saved comment moment. The log is kept; report this replay failure.");
  await browserNightStore(location.pathname + ":comment-restore").write(comment.night);
  const url = new URL(location.href); url.search = "?restore=comment&resume=1"; location.href = url.toString();
}

export function spawnHere(pageHost: PageHost, kind: FindKindId | null, item: string | null): string {
  return pageHost.mutate("debug: spawn find", () => pageHost.spawnHereNow(kind, item));
}

export function spawnHereNow(pageHost: PageHost, kind: FindKindId | null, item: string | null): string {
  const g = pageHost.N().game, at = spawnSpot(g);
  if (!at) return "no clear ground within 12 m of her (in the treehouse? step out onto the island)";
  if (kind && item) return spawnFind(g, kind, item, at) ? `${kind} ${item} spawned ${Math.round(Math.hypot(at.x - g.witch.x, at.z - g.witch.z))} m from her` : `no ${kind} ${item}`;
  if (g.trunk && g.trunk.item === null) fillTrunk(g, foundAll(pageHost.findsCtx()));
  if (!g.trunk?.item || g.trunk.found) return "no find tonight (all found, or taken)";
  const c = g.map.cellSafe(at.x, at.z).cell;
  Object.assign(g.trunk, { x: at.x, z: at.z, cell: [c[0], c[1]] });
  return `tonight's ${g.trunk.kind} ${g.trunk.item} moved next to her`;
}

export function decidePanel(pageHost: PageHost, open: boolean): void {
  if (pageHost.decide || pageHost.decideLoading) return;
  pageHost.decideLoading = true;
  void import("../ui/decide").then(({ DecidePanel }) => { pageHost.decide = new DecidePanel({ mutate: pageHost.mutate, get tuning() { return pageHost.N().game.tuning; }, get seed() { return pageHost.N().game.seed; }, version: pageHost.BUILD, live: pageHost.knobLive }, open); });
}

export function keyNow(pageHost: PageHost, spot?: string): ReturnType<typeof compareKey> { return compareKey({ build: pageHost.BUILD, game: pageHost.N().game, canvas: pageHost.canvas, window: { width: innerWidth, height: innerHeight }, renderer: rendererOf(pageHost.view.renderer.getContext()), changed: pageHost.repro.changed(), params: pageHost.N().params, spot, dpr: devicePixelRatio, nav: navigator as Navigator & { deviceMemory?: number } }); }

export function installDebug1(pageHost: PageHost): void {
observePlaytestErrors(error => pageHost.breadcrumbs.add(pageHost.N().game, "error", error));
}

export function installDebug2(pageHost: PageHost): void {
pageHost.N().playtest.stalls = () => pageHost.stallLog.stalls;
}

export function installDebug3(pageHost: PageHost): void {
document.getElementById("finds-dev-btn")?.addEventListener("click", () => pageHost.findsPanel.toggle());
}

export function installDebug4(pageHost: PageHost): void {
document.getElementById("copy-debug")?.addEventListener("click", e => {
  const b = e.currentTarget as HTMLButtonElement, text = pageHost.repro.full();
  void navigator.clipboard?.writeText(text).then(() => { b.textContent = "copied"; }, () => { b.textContent = "copy failed: see console"; console.log(text); }).finally(() => setTimeout(() => { b.textContent = "copy debug info"; }, 1500));
});
}

export function installDebug5(pageHost: PageHost): void {
pageHost.N().playtest.debugInfo = () => ({ link: pageHost.repro.link(), machine: pageHost.repro.machine().map(l => l.slice(7)), changed: Object.fromEntries(pageHost.repro.changed()) });
}

export function installDebug6(pageHost: PageHost): void {
pageHost.N().playtest.comments = () => pageHost.commentBook.all();
}

export function installDebug7(pageHost: PageHost): void {
pageHost.N().playtest.inputRecording = () => recordingFor(pageHost.N().game, pageHost.BUILD, pageHost.captureRecording).export();
}

export function installDebug8(pageHost: PageHost): void {
pageHost.N().playtest.debugText = () => pageHost.repro.full();
}

export function installDebug9(pageHost: PageHost): void {
pageHost.N().playtest.viewState = () => { const { game } = pageHost.N(), w = game.witch; return { x: Math.round(w.x), z: Math.round(w.z), mode: w.mode, area: areaUnderWitch(game), zoom: game.camera.zoomStep, timeScale: Math.round((game.timeScale ?? 1) * 100) / 100 }; };
}

export function installDebug10(pageHost: PageHost): void {
pageHost.N().playtest.keyState = () => pageHost.keyNow();
}

export function installDebug11(pageHost: PageHost): void {
pageHost.N().playtest.sceneState = () => sceneMode(pageHost.N().game);
}

export function installDebug12(pageHost: PageHost): void {
pageHost.N().playtest.gpuState = () => gpuSample(pageHost.view);
}

export function installDebug13(pageHost: PageHost): void {
pageHost.view.onGpuEvent = what => pageHost.N().playtest.gpuEvent(what, Math.round(pageHost.view.ledger.total / 1048576));
}

export function installDebug14(pageHost: PageHost): void {
pageHost.view.onContextRestored = () => {
  pageHost.N().playtest.gpuEvent("context restored: the night loaded again");
  const link = pageHost.repro.link();
  location.replace(pageHost.N().params.has("debug") ? link : link.replace(/&debug$/, ""));
};
}

export function installDebug15(pageHost: PageHost): void {
pageHost.N().playtest.frameState = () => {
  const r = pageHost.frameStats.recent(), pct = (a: number[], p: number) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return Math.round(s[Math.min(s.length - 1, Math.floor(p * s.length))] * 10) / 10; };
  const S = pageHost.view.stats, { game } = pageHost.N(), w = game.witch;
  return { ms: pct(r.frames, 0.5) ?? 0, p95: pct(r.frames, 0.95) ?? 0, cpu: pct(r.cpu, 0.5) ?? 0, cpu95: pct(r.cpu, 0.95) ?? 0, gpu: pct(r.gpu, 0.5), gpu95: pct(r.gpu, 0.95), over20: r.frames.length ? Math.round((100 * r.frames.filter(x => x > 20).length) / r.frames.length) : 0, draws: S.drawCalls ?? 0, trees: S.trees, bushes: S.bushes, creatures: S.creatures, mode: w.mode, zoom: game.camera.zoomStep, rung: pageHost.ladder.state.rung, ladder: pageHost.ladder.state.mode };
};
}

export function installDebug16(pageHost: PageHost): void {
installHooks({ night: pageHost.N, view: pageHost.view, sound: pageHost.sound, meter: pageHost.meter, shake: pageHost.shake, frameStats: pageHost.frameStats, ladder: pageHost.ladder, loadTimes: pageHost.loadTimes, loop: pageHost.loop, advance: (game, controls, dt) => recordedStep(game, controls, dt, pageHost.BUILD, pageHost.captureRecording) });
}

export function installDebug17(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.compareKey = pageHost.keyNow;
}

export function installDebug18(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.take = (kind: FindKindId, id: string): boolean => {
  const { game } = pageHost.N(), k = FIND_KINDS.find(q => q.id === kind), W = game.witches[0];
  if (!k?.items.includes(id)) return false;
  const c = game.map.cellSafe(game.witch.x, game.witch.z).cell;
  game.trunk = { x: game.witch.x, z: game.witch.z, cell: [c[0], c[1]], kind, item: id, found: true };
  k.claim?.(W.spells, id);
  if (kind === "hat") addFloorHat(W, id);
  pageHost.lendFind(kind, id);
  return true;
};
}

export function installDebug19(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.wakeUp = (yesterday: boolean): boolean => { const { game } = pageHost.N(); return wakeInBedroom(game) && startWake(game, game.herTime, { yesterday }); };
}

export function installDebug20(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.stationShuts = pageHost.stationShuts;
}

export function installDebug21(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.guide = { save: pageHost.guide, pin: () => pageHost.guidePin.state, hooks: GUIDANCE_HOOKS, step: () => pageHost.stepGuide(performance.now()) };
}

export function installDebug22(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.dream = (v: string, kind: FindKindId, id: string): boolean => {
  if (!FIND_KINDS.some(q => q.id === kind && q.items.includes(id))) return false;
  pageHost.startDream({ loan: lend(kind, id, { look: null, hat: "none", parts: pageHost.N().game.witches[0].spells.parts }), won: v === "won" }, true);
  return true;
};
}

export function installDebug23(pageHost: PageHost): void {
if (pageHost.params.get("debug") === "sail") (window as unknown as { witch: Record<string, unknown> }).witch.debugSwap = async (seed: number, island?: string): Promise<number> => {
  const p = new URLSearchParams(pageHost.params), was = pageHost.N().spec;
  p.set("seed", String(seed));
  if (island !== undefined) p.set("island", island);
  pageHost.sailing = true;
  pageHost.loan = null; // (a debug swap: tonight's loan, if any, just gone)
  endNight(pageHost.page, true); // (its game marked disposed: a reader left on it that steps it throws)
  const n = await startNight(pageHost.page, { how: "debug", island: island ?? was.island, seed, world: was.world, params: p });
  pageHost.seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  await pageHost.view.prepare();
  n.flags.ready = true;
  pageHost.sailing = false;
  pageHost.start();
  return n.seed;
};
}

export function installDebug24(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.chart = () => pageHost.chartOverNight();
}

export function installDebug25(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.zooOverlay = pageHost.zoo;
}

export function installDebug26(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.studio = pageHost.studio;
}

export function installDebug27(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.telescope = {
  look: (heading: number, zoom: number, elevation?: number) => { const { game, tuning } = pageHost.N(); if (!tuning.telescope) return false; pageHost.telescope.open(game, tuning.telescope); pageHost.telescope.point(heading, zoom, tuning.telescope, elevation); pageHost.view.telescope = pageHost.telescope.look(tuning.telescope); return true; },
  close: () => { pageHost.telescope.close(); pageHost.view.telescope = null; },
  get on() { return pageHost.telescope.on; },
  get aim() { return pageHost.telescope.aiming; },
};
}

export function installDebug28(pageHost: PageHost): void {
(window as unknown as { witch: Record<string, unknown> }).witch.sail = (island: string, seed: number, o: { end?: FlightEnd | null; fail?: boolean } = {}): Promise<boolean> => {
  pageHost.sailFail = !!o.fail && pageHost.params.get("debug") === "sail";
  const world = pageHost.chartWorldArg(), end = o.end === null ? undefined : o.end ?? { cam: { x: 0, z: 700, height: 260, pitch: 0.45, fov: 40, speed: 60 }, still: "" };
  return pageHost.sailFromChart(sailHref(island, seed, world, location.href), { island, seed, world, end });
};
}

export function installDebug29(pageHost: PageHost): void {
{
  const hooks = (window as unknown as { witch: Record<string, unknown> }).witch;
  for (const name of ["arena", "arenaAttack", "shot", "guest", "lose", "rainbow", "hit", "take", "wakeUp", "dream"]) {
    const action = hooks[name];
    if (typeof action === "function") hooks[name] = (...args: unknown[]) => pageHost.mutate(`debug: ${name}`, () => Reflect.apply(action, hooks, args));
  }
}
}
