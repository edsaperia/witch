// The two-player route (T5B, PR #1609): two browser contexts on one build call each other through the boudoir telephone, play a
// visit and leave and redial, with normal keys and clicks only, reading state through the game's debug hooks (window.witch);
// each stage PASS/FAIL with its timing, the guest prediction's snaps, the host's input queue, catch-up and WebSocket events (no
// payloads), screenshots at a failure, results as JSON and a short markdown summary. One run, never retried; browsers always closed.
//   node tools/multiplayer/route.cjs --build http://localhost:4173/ --relay ws://127.0.0.1:8787 --out /tmp/mproute/local-1
//   node tools/multiplayer/route.cjs --build https://edsaperia.github.io/witch/pr-1609/ --relay wss://witch-relay-playtest.onrender.com --out <dir>
// See tools/multiplayer/README.md for the stages, the bounds and how to run a local relay and build.
const fs = require("node:fs");
const path = require("node:path");
const { planFloorPath } = require("./floorPath.cjs");

const DEFAULT_ENDPOINT = "wss://witch-relay-playtest.onrender.com"; // the game's built-in relay (src/app/telephone.ts)
const READY_TEXT = "The line is ready.";

function parseArgs(argv) {
  const a = { seed: "123", overall: 480, load: 180, phone: 20, wardrobe: 16, rejoin: 20, bedHold: 15, walk: 30, join: 150, rollover: 90, leave: 90, wake: 25, redial: 150, viewport: "960x540", headed: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (!k.startsWith("--")) throw Error(`Unexpected argument ${k}`);
    const key = k.slice(2);
    if (key === "headed") { a.headed = true; continue; }
    if (key === "trace") { a.trace = true; continue; }
    if (key === "gl") { a.gl = true; continue; }
    if (key === "help") { a.help = true; continue; }
    const v = argv[++i]; if (v === undefined) throw Error(`${k} needs a value`);
    a[key] = ["seed", "build", "relay", "out", "viewport", "link", "stop-after", "expect-version", "expect-relay-build"].includes(key) ? v : Number(v);
    if (typeof a[key] === "number" && !Number.isFinite(a[key])) throw Error(`${k} needs a number`);
  }
  return a;
}
const USAGE = `Usage: node tools/multiplayer/route.cjs --build <game URL> --relay <ws:// or wss:// relay> --out <directory>
  [--seed 123] [--link "px=6"] [--expect-version <text in version.json>] [--expect-relay-build <relay build prefix>] [--viewport 960x540] [--headed]
  bounds in seconds: [--overall 480] [--load 180] [--phone 20] [--wardrobe 16] [--rejoin 20] [--bedHold 15] [--walk 30]
                     [--join 150] [--rollover 90] [--leave 90] [--redial 150] [--wake 25]
  diagnosis: [--watch <seconds>: once a second, both pages' clocks, step pipeline counts, renderer.info and canvas sizes, from the dial to that long after connecting] [--gl: with WebGL call counts] [--profile <seconds>: CPU profiles and call counts of both pages for that long once the visit starts] [--profile-again <seconds>: a second window that long after the first] [--trace: and a Chrome trace of the host page] [--stop-after <stage>]`;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const now = () => Date.now();
const round = (n, k = 3) => (typeof n === "number" && Number.isFinite(n) ? Math.round(n * 10 ** k) / 10 ** k : n);

/** In every page before its scripts: the relay rewrite (only when --relay is not the game's own) and a WebSocket wrapper that keeps
 *  per-socket open/close/error times, close codes and message counts by type, never a payload. The host's frames' catch-up steps and
 *  the guest's holds are counted from their sends (a count only). window.__mpRoute.forceClose() closes the open relay socket once. */
function initScript({ from, to }) {
  const Native = window.WebSocket, rec = { sockets: [], types: {}, catchUpSteps: 0, catchUpFrames: 0, holds: 0, events: [] };
  const live = new Map();
  const typeOf = data => { if (typeof data !== "string") return "binary"; const head = data.slice(0, 200), t = head.match(/"type":"([a-z-]+)"/); const kind = head.match(/"payload":\{"kind":"([a-z-]+)"/); return t ? t[1] + (kind ? ":" + kind[1] : "") : "unknown"; };
  const bump = key => { rec.types[key] = (rec.types[key] ?? 0) + 1; };
  const marked = ["resume", "resumed", "telephone", "telephone-ready", "call-connected", "transport-away", "peer-away", "peer-resumed", "guest-joined", "guest-left", "state:start", "leave"];
  class Tracked extends Native {
    constructor(url, protocols) {
      const target = from && String(url).startsWith(from) ? to + String(url).slice(from.length) : url;
      super(target, protocols);
      const u = new URL(String(target)), entry = { id: rec.sockets.length, url: u.origin + u.pathname, created: Date.now(), opened: null, closed: null, code: null, wasClean: null, reason: null, errors: 0, sent: 0, received: 0, lastSend: null, lastReceive: null, sendGapAtCloseMs: null, receiveGapAtCloseMs: null };
      rec.sockets.push(entry); live.set(this, entry);
      this.addEventListener("open", () => { entry.opened = Date.now(); });
      this.addEventListener("close", e => {
        entry.closed = Date.now(); entry.code = e.code; entry.wasClean = e.wasClean; entry.reason = String(e.reason ?? "").slice(0, 80);
        entry.sendGapAtCloseMs = Math.max(0, entry.closed - (entry.lastSend ?? entry.opened ?? entry.created));
        entry.receiveGapAtCloseMs = Math.max(0, entry.closed - (entry.lastReceive ?? entry.opened ?? entry.created));
        live.delete(this);
      });
      this.addEventListener("error", () => { entry.errors++; });
      this.addEventListener("message", e => { entry.lastReceive = Date.now(); entry.received++; const t = typeOf(e.data); bump("in:" + t); if (marked.includes(t)) rec.events.push({ at: Date.now(), socket: entry.id, dir: "in", type: t }); });
    }
    send(data) {
      const entry = live.get(this); if (entry) entry.sent++;
      const t = typeOf(data); bump("out:" + t);
      if (marked.includes(t)) rec.events.push({ at: Date.now(), socket: entry?.id ?? -1, dir: "out", type: t });
      if (t === "state:frame") { const n = (data.match(/"catchUp":true/g) ?? []).length; if (n) { rec.catchUpSteps += n; rec.catchUpFrames++; } }
      if (t === "input" && data.includes('"hold":true')) rec.holds++;
      const open = this.readyState === 1;
      const result = super.send(data);
      // A closing socket silently drops sends; a thrown send was not queued either.
      if (entry && open) entry.lastSend = Date.now();
      return result;
    }
  }
  window.WebSocket = Tracked;
  rec.forceClose = () => {
    const open = [...live].filter(([ws]) => ws.readyState === 1);
    if (open.length !== 1) return { closed: false, open: open.length };
    const [ws, entry] = open[open.length - 1]; ws.close(); return { closed: true, socket: entry.id, at: Date.now() };
  };
  window.__mpRoute = rec;
  // Frames, and the sum of raw frame gaps and of the gaps capped at 0.1 s (the page's own cap on a rules step: app/telephoneStation.ts).
  rec.frames = 0; rec.rawDt = 0; rec.cappedDt = 0; rec.drawMs = 0; rec.frameMs = 0; let lastFrame = 0;
  const tick = t => { rec.frames++; if (lastFrame) { const d = (t - lastFrame) / 1000; rec.rawDt += d; rec.cappedDt += Math.min(0.1, d); } lastFrame = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  try { new PerformanceObserver(list => { for (const e of list.getEntries()) rec.frameMs += e.duration; }).observe({ type: "long-animation-frame", buffered: false }); } catch { /* not supported */ }
  // The view's draw, timed by wrapping its render once the page has one (the rest of a long frame is mostly stepping).
  const wrapDraw = () => { const v = window.witch?.view; if (!v || v.__mpTimed) { if (!v) setTimeout(wrapDraw, 1000); return; } const orig = v.render; v.render = function (...a) { const t0 = performance.now(); try { return orig.apply(this, a); } finally { rec.drawMs += performance.now() - t0; } }; v.__mpTimed = true; };
  setTimeout(wrapDraw, 1000);
  // Rendered positions (the local view, the guest's prediction) without the whole telephone proof.
  window.__mpPos = id => { const w = window.witch?.view?.game?.witches?.find(q => q.id === id); return w ? { x: w.body.x, z: w.body.z, perched: !!w.body.perch } : null; };
}


/** Diagnosis (--watch): counts per WebGL context of draws (and instances), the pixels their viewports cover, clears, reads back and
 *  uploads, cumulative; read once a second. Counts only. */
function glStatsScript() {
  const all = []; window.__mpGl = all;
  const wrap = (proto, name, fn) => { const orig = proto[name]; if (typeof orig !== "function") return; proto[name] = function (...a) { try { fn(this, a); } catch { /* counting only */ } return orig.apply(this, a); }; };
  const stat = gl => { let s = gl.__mpStat; if (!s) { s = gl.__mpStat = { canvas: gl.canvas?.id || (typeof HTMLCanvasElement !== "undefined" && gl.canvas instanceof HTMLCanvasElement ? "canvas" : "offscreen"), cw: gl.canvas?.width, ch: gl.canvas?.height, vw: 0, vh: 0, draws: 0, instances: 0, drawPx: 0, clears: 0, clearPx: 0, reads: 0, readPx: 0, bufReads: 0, bufReadBytes: 0, texBytes: 0, bufBytes: 0, fbos: 0, maxVp: 0 }; all.push(s); } s.cw = gl.canvas?.width; s.ch = gl.canvas?.height; return s; };
  for (const proto of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype].filter(Boolean)) {
    wrap(proto, "viewport", (gl, a) => { const s = stat(gl); s.vw = a[2]; s.vh = a[3]; s.maxVp = Math.max(s.maxVp, a[2] * a[3]); });
    for (const n of ["drawArrays", "drawElements"]) wrap(proto, n, gl => { const s = stat(gl); s.draws++; s.instances++; s.drawPx += s.vw * s.vh; });
    wrap(proto, "drawArraysInstanced", (gl, a) => { const s = stat(gl); s.draws++; s.instances += a[3]; s.drawPx += s.vw * s.vh; });
    wrap(proto, "drawElementsInstanced", (gl, a) => { const s = stat(gl); s.draws++; s.instances += a[4]; s.drawPx += s.vw * s.vh; });
    wrap(proto, "clear", gl => { const s = stat(gl); s.clears++; s.clearPx += s.vw * s.vh; });
    wrap(proto, "readPixels", (gl, a) => { const s = stat(gl); s.reads++; s.readPx += a[2] * a[3]; });
    wrap(proto, "getBufferSubData", (gl, a) => { const s = stat(gl); s.bufReads++; s.bufReadBytes += a[2]?.byteLength ?? 0; });
    // (texImage2D(target, level, internal, width, height, border, format, type, data) or (target, level, internal, format, type, source))
    const dims = (a, w, h, src) => (a.length > src + 1 && typeof a[w] === "number" ? a[w] * a[h] : (a[src]?.width ?? 0) * (a[src]?.height ?? 0));
    wrap(proto, "texImage2D", (gl, a) => { const s = stat(gl); s.texUploads = (s.texUploads ?? 0) + 1; s.texBytes += 4 * (a.length >= 9 ? a[3] * a[4] : dims(a, 3, 4, 5)); if (a.length < 9 && a[5]) { const k = `${a[5].constructor?.name}:${a[5].width}x${a[5].height}`; (s.sources ??= {})[k] = (s.sources[k] ?? 0) + 1; } });
    wrap(proto, "texSubImage2D", (gl, a) => { const s = stat(gl); s.texUploads = (s.texUploads ?? 0) + 1; s.texBytes += 4 * (a.length >= 9 ? a[4] * a[5] : (a[6]?.width ?? 0) * (a[6]?.height ?? 0)); if (a.length < 9 && a[6]) { const k = `sub ${a[6].constructor?.name}:${a[6].width}x${a[6].height}`; (s.sources ??= {})[k] = (s.sources[k] ?? 0) + 1; } });
    wrap(proto, "bufferData", (gl, a) => { stat(gl).bufBytes += a[1]?.byteLength ?? 0; });
    wrap(proto, "bufferSubData", (gl, a) => { stat(gl).bufBytes += a[2]?.byteLength ?? 0; });
    wrap(proto, "bindFramebuffer", gl => { stat(gl).fbos++; });
  }
}


/** Diagnosis (--watch): the visible meshes of the view's scene grouped by name, material and geometry, with their draw counts,
 *  instances and triangles, biggest first. */
const sceneTop = page => page.evaluate(() => {
  const v = window.witch?.view, groups = new Map();
  const roots = [v?.scene, ...Object.values(v ?? {}).filter(o => o && o.isScene && o !== v?.scene)].filter(Boolean);
  const visible = o => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
  const path = o => { const names = []; for (let x = o; x && names.length < 4; x = x.parent) if (x.name) names.push(x.name); return names.join("<"); };
  roots.forEach((root, ri) => root.traverse(o => {
    if (!(o.isMesh || o.isPoints || o.isLine || o.isSprite) || !visible(o)) return;
    const g = o.geometry, idx = g?.index ? g.index.count : g?.attributes?.position?.count ?? 0, range = g?.drawRange?.count;
    const per = Math.min(idx, Number.isFinite(range) ? range : Infinity) / 3;
    const inst = o.isInstancedMesh ? o.count : g?.isInstancedBufferGeometry ? (g.instanceCount ?? 0) : 1;
    const m = Array.isArray(o.material) ? o.material[0] : o.material;
    const key = `${ri}:${path(o) || "(unnamed)"} | ${m?.name || m?.type || "?"} | ${g?.type ?? "?"}`;
    const e = groups.get(key) ?? { key, meshes: 0, instances: 0, triangles: 0, renderOrder: o.renderOrder };
    e.meshes++; e.instances += inst; e.triangles += Math.round(per * inst); groups.set(key, e);
  }));
  return [...groups.values()].sort((a, b) => b.triangles - a.triangles).slice(0, 40);
}).catch(e => ({ unavailable: e.message.split("\n")[0] }));

/** Canonical (window.witch.game) facts the route waits on: wake, sleep and room, plus the page's telephone proof. No numbers. */
const pageState = page => page.evaluate(() => {
  const W = window.witch; if (!W?.game || !W.telephoneProof) return null;
  const g = W.game, p = W.telephoneProof();
  const wakeOf = w => w.wake ?? (w.id === 0 ? g.wake : undefined);
  return {
    status: p.status, active: p.active, visiting: p.visiting, seed: p.seed, borrowed: p.borrowed, worldReady: p.worldReady,
    menus: p.menus, paused: p.paused, preparation: { stage: p.preparation.stage, progress: p.preparation.progress, failure: p.preparation.failure },
    network: p.network, players: p.players.map(q => ({ id: q.id, x: q.x, z: q.z, room: q.room ?? null, atRoom: q.atRoom, perched: q.perched, slept: q.slept, wakeOpen: q.wakeOpen ?? null, nearObjects: q.nearObjects })),
    canonical: g.witches.map(w => { const k = wakeOf(w); return { id: w.id, x: w.body.x, z: w.body.z, perched: !!w.body.perch, slept: w.house?.slept === true, wake: k ? { open: !!k.open, beat: k.beat, room: k.room ?? null } : null }; }),
    clockPaused: g.clock.paused, trouble: !!document.getElementById("telephone-trouble"), notice: document.getElementById("telephone-notice")?.textContent?.slice(0, 200) ?? null,
  };
});
const houseOf = page => page.evaluate(() => { const p = window.witch.telephoneProof(); const { m: _m, ...shape } = p.house.shape; return { at: p.house.at, turn: p.house.turn, shape: JSON.parse(JSON.stringify(shape)), rail: window.witch.game.tuning.treehouse.house.rail, objects: p.house.objects, reach: null }; });

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.build || !args.relay || !args.out) { console.log(USAGE); process.exitCode = args.help ? 0 : 2; return; }
  let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
  const out = path.resolve(args.out);
  if (fs.existsSync(out) && fs.readdirSync(out).length) throw Error(`Output directory ${out} is not empty (one run per directory; nothing is retried)`);
  fs.mkdirSync(path.join(out, "screenshots"), { recursive: true });
  const relay = new URL(args.relay); if (!["ws:", "wss:"].includes(relay.protocol)) throw Error("--relay must be a ws:// or wss:// URL");
  const relayBase = relay.href.replace(/\/$/, "");
  const [vw, vh] = args.viewport.split("x").map(Number);
  const startedAt = now(), deadline = startedAt + args.overall * 1000;
  const R = {
    tool: "tools/multiplayer/route.cjs", startedAt: new Date(startedAt).toISOString(), finishedAt: null, verdict: "FAIL",
    build: { url: args.build }, relay: { url: relayBase, rewritten: relayBase !== DEFAULT_ENDPOINT },
    bounds: { overallS: args.overall, loadS: args.load, phoneReadyS: args.phone, wardrobeS: args.wardrobe, rejoinS: args.rejoin, bedHoldS: args.bedHold, walkS: args.walk, joinS: args.join, rolloverS: args.rollover, leaveS: args.leave, redialS: args.redial, wakeS: args.wake },
    stages: [], checks: [], prediction: null, hostInputs: null, catchUp: null, guestHolds: null, sockets: { host: [], guest: [] }, wsEvents: { host: [], guest: [] },
    forcedClose: null, frameRate: [], walks: [], errors: { host: [], guest: [] }, screenshots: [], notes: [],
  };
  const save = () => { fs.writeFileSync(path.join(out, "result.json"), JSON.stringify(R, null, 2)); fs.writeFileSync(path.join(out, "summary.md"), summary(R)); };
  let browser = null, host = null, guest = null, failed = false, sampler = null;
  let closed = null;
  const closeAll = async () => { const b = browser; browser = null; if (b) closed = await b.close().then(() => true, () => false); };
  const overall = setTimeout(() => { R.notes.push(`overall bound ${args.overall}s reached; browsers closed`); failed = true; void closeAll(); }, args.overall * 1000 + 5000);
  for (const sig of ["SIGINT", "SIGTERM"]) process.once(sig, () => { R.notes.push(`stopped by ${sig}`); void closeAll().then(() => { R.finishedAt = new Date().toISOString(); save(); process.exit(1); }); });

  const left = () => deadline - now();
  const bounded = s => Math.max(0, Math.min(s * 1000, left()));
  const check = (name, pass, detail) => { R.checks.push({ name, pass: !!pass, ...(detail === undefined ? {} : { detail }) }); return !!pass; };
  async function shot(label) {
    for (const [role, page] of [["host", host], ["guest", guest]]) {
      if (!page || page.isClosed()) continue;
      const file = `screenshots/${String(R.screenshots.length).padStart(2, "0")}-${label}-${role}.png`;
      try { await page.screenshot({ path: path.join(out, file), timeout: 15000 }); R.screenshots.push(file); } catch (e) { R.notes.push(`screenshot ${label} ${role}: ${e.message.split("\n")[0]}`); }
    }
  }
  /** One stage: PASS when `fn` returns, FAIL (screenshots and both pages' state kept) when it throws or a bound passes. */
  let stopped = null;
  async function stage(name, boundS, fn) {
    if (failed || stopped) { R.stages.push({ name, result: "UNRUN", boundS, ...(stopped ? { note: `stopped after ${stopped} (--stop-after)` } : {}) }); return null; }
    try { return await stageRun(name, boundS, fn); } finally { if (args["stop-after"] === name) stopped = name; }
  }
  async function stageRun(name, boundS, fn) {
    const t0 = now(), row = { name, result: "RUNNING", boundS, startedAt: new Date(t0).toISOString(), atS: round((t0 - startedAt) / 1000, 1) };
    R.stages.push(row); save();
    console.log(`[${row.atS}s] ${name} ...`);
    try {
      if (left() <= 0) throw Error(`overall bound ${args.overall}s reached`);
      const detail = await fn(boundS);
      row.result = "PASS"; if (detail !== undefined) row.detail = detail;
      return detail ?? true;
    } catch (e) {
      row.result = "FAIL"; row.failedAfterMs = now() - t0; row.error = String(e.message ?? e).split("\n").slice(0, 3).join(" "); failed = true;
      if (e.walk) row.walk = e.walk;
      for (const [role, page] of [["host", host], ["guest", guest]]) if (page && !page.isClosed()) row[`${role}State`] = await pageState(page).catch(err => ({ unavailable: err.message.split("\n")[0] }));
      await shot(name);
      return null;
    } finally {
      row.ms = now() - t0;
      if (sampler) { await sample().catch(() => {}); row.counters = counters(); }
      console.log(`[${round((now() - startedAt) / 1000, 1)}s] ${name}: ${row.result} in ${row.ms} ms${row.error ? ` (${row.error})` : ""}`); save(); }
  }
  /** Polls `fn` on a page (a function of the page's state) until it is truthy or `ms` pass. */
  async function until(page, ms, what, predicate, every = 250) {
    const end = now() + Math.min(ms, left()); let last = null;
    for (;;) {
      last = await pageState(page).catch(() => null);
      if (last && predicate(last)) return last;
      if (now() >= end) throw Error(`${what}: not within ${Math.round(ms / 1000)} s`);
      await sleep(every);
    }
  }
  const watch = (role, page) => {
    page.on("pageerror", e => { if (R.errors[role].length < 40) R.errors[role].push({ at: now(), kind: "pageerror", text: e.message.slice(0, 300) }); });
    page.on("console", m => { if (m.type() === "error" && R.errors[role].length < 40) R.errors[role].push({ at: now(), kind: "console", text: m.text().slice(0, 300) }); });
    page.on("websocket", ws => {
      const u = new URL(ws.url()), e = { at: now(), url: u.origin + u.pathname, open: now(), close: null, errors: [] };
      R.wsEvents[role].push(e);
      ws.on("close", () => { e.close = now(); });
      ws.on("socketerror", err => { e.errors.push({ at: now(), error: String(err).slice(0, 200) }); });
    });
  };
  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  async function release(page, held) { for (const k of [...held]) { await page.keyboard.up(k).catch(() => {}); held.delete(k); } }
  /** Walks `id` on `page` along a floor route to `to` with the arrow keys (up the screen is -z); never a teleport. Far off she holds
   *  the keys towards a point a metre along the route; within a metre and a half she stops and steps in with short presses, so a slow
   *  frame rate cannot carry her past. Done when she stands within `tolerance` of `to` or, given `near`, in that object's reach. */
  async function walk(page, id, house, to, { ms, open = [], near = null, tolerance = 0.45, label }) {
    const start = await page.evaluate(i => window.__mpPos(i), id);
    if (!start) throw Error(`${label}: no witch ${id}`);
    const plan = await planFloorPath(house, start, to, { open });
    const pts = plan.points, held = new Set(), t0 = now(), end = t0 + Math.min(ms, left()), trace = [];
    let k = 0, pos = start, samples = 0, travelled = 0, prev = start, presses = 0, arrived = null, lastD = null, scale = 1;
    const steer = (from, aim) => { const dx = aim.x - from.x, dz = aim.z - from.z, d = Math.hypot(dx, dz) || 1, want = new Set(); if (Math.abs(dx) > 0.38 * d) want.add(dx > 0 ? "ArrowRight" : "ArrowLeft"); if (Math.abs(dz) > 0.38 * d) want.add(dz > 0 ? "ArrowDown" : "ArrowUp"); return want; };
    const fail = message => { const e = Error(message); e.walk = { label, plan: { lengthM: round(plan.length, 2), minClearanceM: round(plan.minClearance, 2), points: pts.length }, to, trace: trace.slice(-80) }; R.walks.push({ ...e.walk, result: "FAIL" }); return e; };
    try {
      for (;;) {
        pos = await page.evaluate(i => window.__mpPos(i), id); samples++;
        if (!pos) throw fail(`${label}: lost witch ${id}`);
        travelled += Math.hypot(pos.x - prev.x, pos.z - prev.z); prev = pos;
        const dGoal = Math.hypot(to.x - pos.x, to.z - pos.z);
        if (trace.length < 400) trace.push([now() - t0, round(pos.x, 2), round(pos.z, 2), [...held].map(q => q.slice(5, 6)).join("")]);
        if (!pos.perched) throw fail(`${label}: she left the floor at (${pos.x.toFixed(2)}, ${pos.z.toFixed(2)})`);
        if (now() >= end) throw fail(`${label}: ${dGoal.toFixed(2)} m from the target after ${Math.round(ms / 1000)} s`);
        if (dGoal <= 1.5) {
          await release(page, held);
          await sleep(200);
          const s = await pageState(page), me = s.players.find(q => q.id === id), d = Math.hypot(to.x - me.x, to.z - me.z);
          if (d <= tolerance || (near && me.nearObjects.includes(near) && d <= 1)) { arrived = me; break; }
          // Shorter presses when the last one overshot (on a slow page one frame's step can be most of a metre).
          if (lastD !== null && d >= lastD - 0.05) scale = Math.max(0.25, scale * 0.6);
          lastD = d;
          const want = steer(me, to);
          for (const key of want) await page.keyboard.down(key);
          await sleep(Math.round(Math.max(30, Math.min(160, d * 130)) * scale)); presses++;
          for (const key of want) await page.keyboard.up(key);
          continue;
        }
        while (k < pts.length - 1 && Math.hypot(pts[k].x - pos.x, pts[k].z - pos.z) < 1) k++;
        for (let j = k; j < Math.min(pts.length, k + 6); j++) if (Math.hypot(pts[j].x - pos.x, pts[j].z - pos.z) < Math.hypot(pts[k].x - pos.x, pts[k].z - pos.z)) k = j;
        const want = steer(pos, pts[Math.min(pts.length - 1, k)]);
        for (const key of keys) if (held.has(key) && !want.has(key)) { await page.keyboard.up(key); held.delete(key); }
        for (const key of want) if (!held.has(key)) { await page.keyboard.down(key); held.add(key); }
        await sleep(50);
      }
    } finally { await release(page, held); }
    await sleep(250); // (coming to a stop)
    const s = await pageState(page), me = s.players.find(q => q.id === id) ?? arrived;
    if (near && !me.nearObjects.includes(near)) throw fail(`${label}: stopped outside ${near}'s reach (near ${me.nearObjects.join(",") || "nothing"})`);
    const result = { ms: now() - t0, routeM: round(plan.length, 2), routeMinClearanceM: round(plan.minClearance, 2), travelledM: round(travelled, 2), samples, finalPresses: presses, end: { x: round(me.x, 2), z: round(me.z, 2), atRoom: me.atRoom, nearObjects: me.nearObjects } };
    R.walks.push({ label, result: "PASS", ms: result.ms, routeM: result.routeM, travelledM: result.travelledM, trace: trace.filter((_, i) => i % 4 === 0).slice(0, 100) });
    return result;
  }
  /** Gets her up from bed (the wake-up's alarm or snooze: a move key starts the stretch) and waits until it opens. */
  async function getUp(page, id, ms, label) {
    const s = await pageState(page), me = s.canonical.find(w => w.id === id) ?? s.canonical[0];
    if (me.wake && !me.wake.open) { await page.keyboard.down("ArrowRight"); await sleep(40); await page.keyboard.up("ArrowRight"); }
    const t0 = now();
    await until(page, ms, `${label} wake-up`, x => { const w = x.canonical.find(q => q.id === id); return w && (!w.wake || w.wake.open); });
    return { ms: now() - t0, wasOpen: !me.wake || me.wake.open };
  }
  const objectFront = (house, id) => { const o = house.objects.find(q => q.id === id); if (!o) throw Error(`no house object ${id}`); return o.front; };
  async function panelText(page) { return page.locator("#telephone-panel [role=status]").first().textContent({ timeout: 2000 }).catch(() => null); }
  async function waitPanel(page, ms, text, what) {
    await page.locator("#telephone-panel [role=status]", { hasText: text }).first().waitFor({ state: "visible", timeout: Math.max(1, Math.min(ms, left())) }).catch(async () => { throw Error(`${what}: "${text}" not shown within ${Math.round(ms / 1000)} s (status now: ${JSON.stringify(await panelText(page))})`); });
  }
  /** E at the telephone: the panel opens and the line gets ready. Observations kept: focus at the press, pictures after it. */
  async function openPhone(page, role, ms) {
    const before = await pageState(page), me = before.players.find(q => q.id === 0);
    if (!me.nearObjects.includes("telephone")) throw Error(`${role} is not at the telephone (near ${me.nearObjects.join(",")})`);
    const focus = await page.evaluate(() => ({ active: document.activeElement ? `${document.activeElement.tagName.toLowerCase()}${document.activeElement.id ? "#" + document.activeElement.id : ""}` : null, hasFocus: document.hasFocus(), clockPaused: window.witch.game.clock.paused }));
    const t0 = now();
    await page.keyboard.press("KeyE");
    await sleep(300);
    const opened = await page.evaluate(() => window.witch.telephoneProof().menus.telephone);
    try { await waitPanel(page, ms, READY_TEXT, `${role} line ready`); }
    catch (e) { await shot(`${role}-phone-bound`); throw e; }
    return { ms: now() - t0, focusAtPress: focus, panelOpenAfter300ms: opened };
  }
  const guestNumber = async page => (await page.locator("#telephone-panel").first().innerText({ timeout: 5000 })).match(/Your number\s*(\d{7})/)?.[1] ?? null;

  // Prediction and input-queue sampling: the counters restart with each prediction (each start/checkpoint and each new night), so
  // each instance's last reading is added to the totals when the next begins.
  const P = { instances: 0, totals: { corrections: 0, snaps: 0, transitionSnaps: 0, correctionSnaps: 0, pendingCapSnaps: 0, transitionReasons: {} }, largest: 0, recentP95Max: 0, pendingPeak: 0, samples: 0, last: null };
  const Q = { sessions: 0, discarded: 0, underruns: 0, longestHoldMs: 0, queuedPeak: 0, samples: 0, last: null };
  const foldP = s => { const t = P.totals; for (const k of ["corrections", "snaps", "transitionSnaps", "correctionSnaps", "pendingCapSnaps"]) t[k] += s[k] ?? 0; for (const [k, v] of Object.entries(s.transitionReasons ?? {})) t.transitionReasons[k] = (t.transitionReasons[k] ?? 0) + v; };
  const foldQ = s => { Q.discarded += s.discarded ?? 0; Q.underruns += s.underruns ?? 0; };
  async function sample() {
    if (!host || !guest) return;
    const [g, h] = await Promise.all([guest.evaluate(() => window.witch.telephoneProof().network).catch(() => null), host.evaluate(() => window.witch.telephoneProof().network).catch(() => null)]);
    const p = g?.prediction;
    if (p) {
      P.samples++;
      if (!P.last || p.corrections < P.last.corrections || p.acknowledged < P.last.acknowledged) { if (P.last) foldP(P.last); P.instances++; }
      P.last = p; P.pendingPeak = Math.max(P.pendingPeak, p.pending); P.largest = Math.max(P.largest, p.largest); P.recentP95Max = Math.max(P.recentP95Max, p.recentP95);
    }
    const q = h?.inputs;
    if (q) {
      Q.samples++;
      if (!Q.last || q.received < Q.last.received || q.applied < Q.last.applied - 1) { if (Q.last) foldQ(Q.last); Q.sessions++; }
      Q.last = q; Q.longestHoldMs = Math.max(Q.longestHoldMs, q.longestHoldMs, q.currentHoldMs); Q.queuedPeak = Math.max(Q.queuedPeak, q.queued);
    }
  }
  /** The running totals at this moment (the current prediction's and queue's readings added in), for each stage's row. */
  const counters = () => {
    const t = structuredClone(P.totals), q = { discarded: Q.discarded, underruns: Q.underruns };
    if (P.last) { for (const k of ["corrections", "snaps", "transitionSnaps", "correctionSnaps", "pendingCapSnaps"]) t[k] += P.last[k] ?? 0; for (const [k, v] of Object.entries(P.last.transitionReasons ?? {})) t.transitionReasons[k] = (t.transitionReasons[k] ?? 0) + v; }
    if (Q.last) { q.discarded += Q.last.discarded ?? 0; q.underruns += Q.last.underruns ?? 0; }
    return { prediction: { ...t, pendingPeak: P.pendingPeak, largestM: round(P.largest) }, hostInputs: { ...q, longestHoldMs: round(Q.longestHoldMs, 0), queuedPeak: Q.queuedPeak } };
  };
  const startSampler = () => { if (sampler) return; let busy = false; sampler = setInterval(() => { if (busy) return; busy = true; void sample().finally(() => { busy = false; }); }, 500); };
  const frameRate = async label => { if (failed) return; for (const [role, page] of [["host", host], ["guest", guest]]) { if (!page || page.isClosed()) continue; const fr = await page.evaluate(() => new Promise(r => { let n = 0; const t = performance.now(), g0 = window.witch.game.herTime; const f = () => { n++; if (performance.now() - t < 2000) requestAnimationFrame(f); else r({ fps: n / 2, pace: (window.witch.game.herTime - g0) / ((performance.now() - t) / 1000) }); }; requestAnimationFrame(f); })).catch(() => null); R.frameRate.push({ at: label, role, framesPerSecond: fr?.fps ?? null, gameSecondsPerSecond: fr ? round(fr.pace, 2) : null }); } };

  try {
    // 0. Preflight: the build's page, its script and version; the relay's identity. HTTP 200 each, before any browser.
    await stage("preflight", 60, async () => {
      const t = now(), index = await fetch(args.build, { cache: "no-store", signal: AbortSignal.timeout(20000) }).catch(e => { throw Error(`${e.message}${process.env.HTTPS_PROXY && !process.env.NODE_USE_ENV_PROXY ? " (behind an HTTPS proxy, run with NODE_USE_ENV_PROXY=1)" : ""}`); });
      const html = await index.text(); if (index.status !== 200) throw Error(`game page HTTP ${index.status}`);
      const src = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1] ?? html.match(/<script[^>]+src="([^"]+\.js)"/)?.[1];
      const script = src ? await fetch(new URL(src, args.build), { cache: "no-store", signal: AbortSignal.timeout(30000) }) : null;
      if (script) await script.arrayBuffer();
      if (!script || script.status !== 200) throw Error(`game script ${src ?? "(none found)"} HTTP ${script?.status}`);
      const version = await fetch(new URL("version.json", args.build), { cache: "no-store", signal: AbortSignal.timeout(20000) }).then(r => (r.ok ? r.json() : null)).catch(() => null);
      R.build.version = version; R.build.script = src;
      if (args["expect-version"] && !JSON.stringify(version ?? "").includes(args["expect-version"])) throw Error(`served version ${JSON.stringify(version)} lacks ${args["expect-version"]}`);
      const healthUrl = new URL(relayBase.replace(/^ws/, "http")); healthUrl.pathname = "/";
      const h0 = now(), health = await fetch(healthUrl, { cache: "no-store", signal: AbortSignal.timeout(60000) });
      const body = await health.json().catch(() => null);
      R.relay.health = { status: health.status, ms: now() - h0, service: body?.service, protocol: body?.protocol, build: body?.build };
      if (health.status !== 200 || body?.service !== "witch-relay") throw Error(`relay health HTTP ${health.status}`);
      if (args["expect-relay-build"] && !String(body.build).startsWith(args["expect-relay-build"])) throw Error(`relay build ${body.build} is not ${args["expect-relay-build"]}`);
      return { ms: now() - t, version, script: src, relay: R.relay.health };
    });

    // 1. Two isolated contexts load the same build; both reach a ready world with the telephone proof switches on.
    const pageUrl = new URL(args.build);
    for (const [k, v] of [["telephone", "1"], ["telephoneCalls", "1"], ["resume", "1"], ["seed", args.seed]]) pageUrl.searchParams.set(k, v);
    for (const [k, v] of new URLSearchParams(args.link ?? "")) pageUrl.searchParams.set(k, v); // (extra link switches for both pages, e.g. px=6 on a slow software renderer)
    R.build.pageUrl = pageUrl.href;
    await stage("load", args.load, async boundS => {
      browser = await playwright.chromium.launch({ headless: !args.headed });
      const rewrite = R.relay.rewritten ? { from: DEFAULT_ENDPOINT, to: relayBase } : { from: null, to: null };
      const make = async role => {
        const context = await browser.newContext({ viewport: { width: vw, height: vh } });
        await context.addInitScript(initScript, rewrite);
        if (args.watch && args.gl) await context.addInitScript(glStatsScript);
        const page = await context.newPage(); watch(role, page); return page;
      };
      host = await make("host"); guest = await make("guest");
      const t0 = now();
      await Promise.all([host, guest].map(p => p.goto(pageUrl.href, { waitUntil: "domcontentloaded", timeout: bounded(boundS) })));
      const ready = await Promise.all([host, guest].map(async p => { await p.waitForFunction(() => window.witch?.ready && window.witch.telephoneProof, null, { timeout: bounded(boundS) - (now() - t0) }); return now() - t0; }));
      const [hs, gs] = await Promise.all([pageState(host), pageState(guest)]);
      if (!hs.worldReady || !gs.worldReady) throw Error("world not ready");
      const versions = await Promise.all([host, guest].map(p => p.evaluate(() => fetch("version.json", { cache: "no-store" }).then(r => r.json()).catch(() => null))));
      if (JSON.stringify(versions[0]) !== JSON.stringify(versions[1])) throw Error("the two pages loaded different builds");
      return { hostReadyMs: ready[0], guestReadyMs: ready[1], version: versions[0] };
    });
    await frameRate("loaded");

    // 2. Each walks from her bed to her own telephone (the guest needs her line open to answer); the host presses E there.
    let house = null;
    await stage("host-phone-ready", args.walk + args.phone + args.wake, async () => {
      house = await houseOf(host);
      const phone = objectFront(house, "telephone");
      const up = await Promise.all([getUp(host, 0, args.wake * 1000, "host"), getUp(guest, 0, args.wake * 1000, "guest")]);
      const walks = await Promise.all([host, guest].map((p, i) => walk(p, 0, house, phone, { ms: args.walk * 1000, near: "telephone", label: `${i ? "guest" : "host"} to her telephone` })));
      const hostPhone = await openPhone(host, "host", args.phone * 1000);
      const guestPhone = await openPhone(guest, "guest", args.phone * 1000);
      return { getUp: up, walks: { host: walks[0], guest: walks[1] }, host: hostPhone, guest: guestPhone };
    });

    // 3. The host dials the guest's number (the relay makes the caller the host), the guest answers, both confirm the new number,
    //    and the guest's page joins the host's night: two witches in one world.
    let watcher = null;
    const watchSample = async label => {
      const at = now();
      const one = page => page.evaluate(() => {
        const v = window.witch?.view, r = v?.renderer, c = r?.domElement, gl = r?.getContext?.();
        const targets = [], seen = new Set();
        const scan = (o, name, depth) => { if (!o || typeof o !== "object" || seen.has(o) || depth > 3) return; seen.add(o); if (o.isWebGLRenderTarget) { targets.push(`${name}:${o.width}x${o.height}`); return; } if (o.isObject3D || o.isTexture || o.isMaterial || o.isBufferGeometry) return; if (Array.isArray(o)) { o.slice(0, 20).forEach((x, i) => scan(x, `${name}[${i}]`, depth + 1)); return; } for (const k of Object.keys(o)) { if (["game", "assets", "scene", "renderer"].includes(k)) continue; try { scan(o[k], `${name}.${k}`, depth + 1); } catch { /* getters */ } } };
        try { scan(v, "view", 0); } catch { /* best effort */ }
        return { info: r && { calls: r.info.render.calls, triangles: r.info.render.triangles, points: r.info.render.points, lines: r.info.render.lines, programs: r.info.programs?.length, geometries: r.info.memory.geometries, textures: r.info.memory.textures },
          canvas: c && { w: c.width, h: c.height, cssW: c.clientWidth, cssH: c.clientHeight, dbW: gl?.drawingBufferWidth, dbH: gl?.drawingBufferHeight }, pixelRatio: r?.getPixelRatio?.(), pixelScale: v?.pixelScale, dpr: devicePixelRatio,
          witches: v?.game?.witches?.length, canvases: document.getElementsByTagName("canvas").length, targets: targets.slice(0, 60), gl: (window.__mpGl ?? []).map(x => ({ ...x })),
          clock: (() => { const g = window.witch?.game; if (!g) return null; const net = window.witch.telephoneProof?.().network; const m = window.__mpRoute; return { wall: performance.now(), world: g.clock.time, her: g.herTime, timeScale: g.timeScale, paused: g.clock.paused, witchTimes: g.witches.map(w => w.time ?? null), bodies: g.witches.map(w => ({ id: w.id, mode: w.body.mode, perch: !!w.body.perch, seated: !!w.body.seated, ko: !!w.ko, paused: !!w.paused, wake: (w.wake ?? (w.id === 0 ? g.wake : null))?.beat ?? null })), slow: g.tuning.legendCircle?.slow ?? null, rawDt: m?.rawDt, cappedDt: m?.cappedDt, drawMs: m?.drawMs, frameMs: m?.frameMs, viewTimed: !!window.witch?.view?.__mpTimed, frames: m?.frames, tick: net?.tick, inputs: net?.inputs ?? null, prediction: net?.prediction && { pending: net.prediction.pending, acknowledged: net.prediction.acknowledged }, outInput: m?.types["out:input"] ?? 0, inInput: m?.types["in:input"] ?? 0, outFrame: m?.types["out:state:frame"] ?? 0, inFrame: m?.types["in:state:frame"] ?? 0, catchUpSteps: m?.catchUpSteps ?? 0, holds: m?.holds ?? 0 }; })() };
      }).catch(e => ({ unavailable: e.message.split("\n")[0] }));
      const [h, g] = await Promise.all([one(host), one(guest)]);
      (R.watch ??= []).push({ t: round((at - startedAt) / 1000, 1), label, host: h, guest: g });
    };
    const startWatch = () => { if (!args.watch || watcher) return; let busy = false; watcher = setInterval(() => { if (busy) return; busy = true; void watchSample("").finally(() => { busy = false; }); }, 1000); };
    await stage("call-and-consent", args.join, async boundS => {
      if (args.watch) R.sceneBefore = { host: await sceneTop(host), guest: await sceneTop(guest) };
      startWatch();
      const t0 = now(), number = await guestNumber(guest);
      if (!number) throw Error("the guest's number is not shown");
      const input = host.getByRole("textbox", { name: "Number to call", exact: true });
      await input.click(); await input.pressSequentially(number, { delay: 30 });
      await host.getByRole("button", { name: "Call", exact: true }).click();
      await waitPanel(guest, 20000, "The telephone is ringing.", "guest ringing");
      const ringingMs = now() - t0;
      await guest.getByRole("button", { name: "Answer", exact: true }).click();
      const confirm = name => name.getByRole("button", { name: "Connect to this new number", exact: true });
      await Promise.all([host, guest].map(p => confirm(p).waitFor({ state: "visible", timeout: 30000 })));
      const consentShownMs = now() - t0;
      await confirm(host).click(); await confirm(guest).click();
      startSampler();
      const [hs, gs] = await Promise.all([
        until(host, bounded(boundS) - (now() - t0), "host connected with two witches", s => s.status === "connected" && s.active && !s.visiting && s.players.length === 2),
        until(guest, bounded(boundS) - (now() - t0), "guest connected in the host's night", s => s.status === "connected" && s.active && s.visiting && s.borrowed && s.players.length === 2),
      ]);
      check("both pages show the same night", hs.seed === gs.seed, { host: hs.seed, guest: gs.seed });
      if (hs.seed !== gs.seed) throw Error("the two pages show different nights");
      return { ringingMs, consentShownMs, connectedMs: now() - t0, seed: hs.seed };
    });
    await frameRate("connected");
    if (args.watch && !failed) {
      (R.watch ??= []).push({ t: round((now() - startedAt) / 1000, 1), label: "connected" });
      await sleep(args.watch * 1000);
      R.sceneAfter = { host: await sceneTop(host), guest: await sceneTop(guest) };
      await frameRate("watched");
    }
    if (watcher) { clearInterval(watcher); watcher = null; }
    if (args.profile && !failed) {
      // Diagnosis only: both pages' CPU profiles (DevTools .cpuprofile) and function call counts (V8 precise coverage) for --profile
      // seconds right after the visit starts, and again --profile-again seconds after that window ends, if given.
      const sessions = await Promise.all([host, guest].map(async page => { const cdp = await page.context().newCDPSession(page); await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 1000 }); return cdp; }));
      const pageFacts = () => Promise.all([host, guest].map(page => page.evaluate(() => { const m = window.__mpRoute; return { at: Date.now(), frames: m?.frames, types: { ...(m?.types ?? {}) }, catchUpSteps: m?.catchUpSteps, domNodes: document.getElementsByTagName("*").length, heapMB: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null }; }).catch(e => ({ unavailable: e.message.split("\n")[0] }))));
      const windows = [0, ...(args["profile-again"] ? [args["profile-again"]] : [])];
      R.profileWindows = [];
      for (const [k, delay] of windows.entries()) {
        if (delay) await sleep(delay * 1000);
        if (left() <= args.profile * 1000) break;
        const t0 = now(), before = await pageFacts();
        await Promise.all(sessions.map(cdp => cdp.send("Profiler.startPreciseCoverage", { callCount: true, detailed: false })));
        await Promise.all(sessions.map(cdp => cdp.send("Profiler.takePreciseCoverage"))); // (counts from here)
        if (args.trace && k === 0) await browser.startTracing(host, { path: path.join(out, "host-trace.json"), categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.frame", "blink", "cc", "gpu", "v8.execute"] });
        await Promise.all(sessions.map(cdp => cdp.send("Profiler.start")));
        await sleep(args.profile * 1000);
        const profiles = await Promise.all(sessions.map(cdp => cdp.send("Profiler.stop")));
        const coverage = await Promise.all(sessions.map(cdp => cdp.send("Profiler.takePreciseCoverage")));
        await Promise.all(sessions.map(cdp => cdp.send("Profiler.stopPreciseCoverage")));
        if (args.trace && k === 0) await browser.stopTracing();
        const after = await pageFacts();
        for (const [i, role] of ["host", "guest"].entries()) {
          fs.writeFileSync(path.join(out, `${role}-w${k}.cpuprofile`), JSON.stringify(profiles[i].profile));
          const calls = coverage[i].result.filter(sc => /\.js/.test(sc.url)).flatMap(sc => sc.functions.filter(f => f.ranges[0]?.count > 0).map(f => ({ url: sc.url.split("/").pop(), name: f.functionName, offset: f.ranges[0].startOffset, count: f.ranges[0].count })));
          fs.writeFileSync(path.join(out, `${role}-w${k}.calls.json`), JSON.stringify(calls));
        }
        R.profileWindows.push({ window: k, startS: round((t0 - startedAt) / 1000, 1), seconds: round((now() - t0) / 1000, 1), before, after });
        R.notes.push(`profile window ${k}: ${round((t0 - startedAt) / 1000, 1)} s into the run, ${round((now() - t0) / 1000, 1)} s`);
      }
      await Promise.all(sessions.map(cdp => cdp.detach().catch(() => {})));
    }

    // 4. The host leaves the phone menu and walks; the guest gets up. Each page sees the other move.
    let hostBedPlan = null;
    await stage("both-move", 20 + args.wake, async () => {
      await host.getByRole("button", { name: "Step away", exact: true }).click();
      await until(host, 5000, "host phone menu closed", s => !s.menus.telephone);
      const g0 = await guest.evaluate(() => window.__mpPos(0));
      const bed = objectFront(house, "bed");
      hostBedPlan = bed;
      // A short first leg of her way to bed: the route's first two metres.
      const plan = await planFloorPath(house, await host.evaluate(() => window.__mpPos(0)), bed);
      let acc = 0, leg = plan.points[plan.points.length - 1];
      for (let i = 1; i < plan.points.length; i++) { acc += Math.hypot(plan.points[i].x - plan.points[i - 1].x, plan.points[i].z - plan.points[i - 1].z); if (acc >= 2) { leg = plan.points[i]; break; } }
      const hostWalk = await walk(host, 0, house, leg, { ms: 15000, tolerance: 1, label: "host first steps" });
      let seen = null;
      for (const t = now(); !seen; await sleep(250)) {
        const p = await guest.evaluate(() => window.__mpPos(0));
        if (p && Math.hypot(p.x - g0.x, p.z - g0.z) >= 1) seen = { ms: now() - t, movedM: round(Math.hypot(p.x - g0.x, p.z - g0.z), 2) };
        else if (now() - t > 10000) throw Error("the guest's page did not see the host move");
      }
      const h1 = await host.evaluate(() => window.__mpPos(1));
      const guestUp = await getUp(guest, 1, args.wake * 1000, "guest");
      await until(host, 10000, "host sees the guest up", s => s.canonical.find(w => w.id === 1)?.wake?.open === true);
      return { hostWalk, guestSawHost: seen, guestUp, guestBeforeUp: h1 && { x: round(h1.x, 2), z: round(h1.z, 2) } };
    });

    // 5. The guest's room: bedroom 2, as the host's rules assign it and as her own page shows it.
    await stage("guest-bedroom2", 10, async () => {
      const [hs, gs] = await Promise.all([pageState(host), pageState(guest)]);
      const hostSays = hs.canonical.find(w => w.id === 1)?.wake?.room, guestSays = gs.players.find(p => p.id === 1)?.room;
      if (hostSays !== "bedroom2" || guestSays !== "bedroom2") throw Error(`guest room host=${hostSays} guest=${guestSays}`);
      return { host: hostSays, guest: guestSays };
    });

    // 6. The guest walks from her bedside to bedroom2Wardrobe with the arrow keys within the bound; the host's rules agree.
    await stage("guest-wardrobe", args.wardrobe, async boundS => {
      const t0 = now(), target = objectFront(house, "bedroom2Wardrobe");
      const w = await walk(guest, 1, house, target, { ms: bounded(boundS), open: ["bedroom2"], near: "bedroom2Wardrobe", label: "guest to bedroom2Wardrobe" });
      const hs = await until(host, Math.max(1, boundS * 1000 - (now() - t0)), "host's rules put the guest at bedroom2Wardrobe", s => s.players.find(p => p.id === 1)?.nearObjects.includes("bedroom2Wardrobe"));
      const hg = hs.players.find(p => p.id === 1);
      return { ...w, totalMs: now() - t0, hostView: { x: round(hg.x, 2), z: round(hg.z, 2), perched: hg.perched, nearObjects: hg.nearObjects } };
    });
    await frameRate("wardrobe");

    // 7. One forced close of the guest's relay socket (not Leave); within the window she rejoins the same night as the same witch.
    await stage("forced-close-rejoin", args.rejoin, async boundS => {
      const [hs0, gs0] = await Promise.all([pageState(host), pageState(guest)]);
      const typesBefore = await guest.evaluate(() => ({ ...window.__mpRoute.types }));
      const forced = await guest.evaluate(() => window.__mpRoute.forceClose());
      if (!forced.closed) throw Error(`expected one open relay socket on the guest page, found ${forced.open}`);
      const t0 = forced.at;
      let troubleSeen = false;
      const end = now() + bounded(boundS);
      let resumedAt = null, startAt = null, clearAt = null, last = null;
      for (;;) {
        const [rec, gs] = await Promise.all([guest.evaluate(() => ({ events: window.__mpRoute.events, sockets: window.__mpRoute.sockets })), pageState(guest)]);
        last = gs; troubleSeen ||= gs.trouble;
        resumedAt ??= rec.events.find(e => e.dir === "in" && e.type === "resumed" && e.at >= t0)?.at ?? null;
        if (resumedAt) startAt ??= rec.events.find(e => e.dir === "in" && e.type === "state:start" && e.at >= resumedAt)?.at ?? null;
        if (resumedAt && startAt && !gs.trouble && gs.status === "connected" && gs.active && gs.players.length === 2) { clearAt = now(); R.forcedClose = { ...forced, socket: rec.sockets[forced.socket] }; break; }
        if (now() >= end) { R.forcedClose = { ...forced, socket: rec.sockets[forced.socket] }; throw Error(`no authenticated rejoin within ${boundS} s (resumed ${!!resumedAt}, checkpoint ${!!startAt}, trouble ${gs.trouble}, status ${gs.status})`); }
        await sleep(100);
      }
      const [hs1, gs1] = await Promise.all([pageState(host), pageState(guest)]);
      const typesAfter = await guest.evaluate(() => ({ ...window.__mpRoute.types }));
      const reRegistered = (typesAfter["out:telephone"] ?? 0) - (typesBefore["out:telephone"] ?? 0);
      check("rejoin: same night on both pages", gs1.seed === gs0.seed && hs1.seed === hs0.seed && gs1.seed === hs1.seed, { before: gs0.seed, after: gs1.seed });
      check("rejoin: the guest is still witch 1 on both pages", gs1.players.some(p => p.id === 1) && hs1.players.some(p => p.id === 1) && hs1.players.length === 2);
      check("rejoin: no new telephone registration", reRegistered === 0, { registrations: reRegistered });
      check("rejoin: reconnect warning shown during the gap", troubleSeen);
      check("rejoin: host call stayed up", hs1.active && hs1.status === "connected");
      if (gs1.seed !== gs0.seed || reRegistered !== 0 || !hs1.active) throw Error("rejoin did not return to the same game and actor");
      return { closeCode: R.forcedClose.socket?.code, wasClean: R.forcedClose.socket?.wasClean, resumedMs: resumedAt - t0, checkpointMs: startAt - t0, clearedMs: clearAt - t0 };
    });

    // 8. The guest walks to her bed and holds E there until she sleeps (the host's rules say so).
    await stage("guest-sleeps", args.wardrobe + args.bedHold, async () => {
      const w = await walk(guest, 1, house, objectFront(house, "bedroom2Bed"), { ms: args.wardrobe * 1000, open: ["bedroom2"], near: "bedroom2Bed", label: "guest to bedroom2Bed" });
      const t0 = now();
      await guest.keyboard.down("KeyE");
      try { await until(host, args.bedHold * 1000, "guest asleep in the host's rules", s => s.canonical.find(q => q.id === 1)?.slept === true); }
      finally { await guest.keyboard.up("KeyE"); }
      return { walk: w, holdMs: now() - t0 };
    });

    // 9. The host walks to her own bed and sleeps; with both in bed the host starts the next night and the guest is in it too.
    await stage("shared-night", args.walk + args.bedHold + args.rollover, async () => {
      const seed0 = (await pageState(host)).seed;
      const w = await walk(host, 0, house, hostBedPlan ?? objectFront(house, "bed"), { ms: args.walk * 1000, near: "bed", label: "host to her bed" });
      const t0 = now();
      await host.keyboard.down("KeyE");
      let slept;
      try { slept = await until(host, args.bedHold * 1000, "host asleep or the night rolled over", s => s.canonical.find(q => q.id === 0)?.slept === true || s.seed !== seed0); }
      finally { await host.keyboard.up("KeyE"); }
      const holdMs = now() - t0;
      const [hs, gs] = await Promise.all([
        until(host, args.rollover * 1000, "host in the next night with her guest", s => s.seed !== seed0 && s.active && s.players.length === 2),
        until(guest, args.rollover * 1000, "guest in the host's next night", s => s.seed !== seed0 && s.active && s.visiting && s.players.length === 2),
      ]);
      if (hs.seed !== gs.seed) throw Error(`next night differs: host ${hs.seed}, guest ${gs.seed}`);
      return { walk: w, holdMs, rolloverMs: now() - t0, nextSeed: hs.seed, hostSleptFirst: slept.seed === seed0 };
    });
    await frameRate("next night");

    // 10. The guest leaves (pause, Leave visit) and is home at her own telephone with the number ready to redial; the host gets her
    //     line ready again at her telephone; the guest redials, the host answers, and the call connects again.
    await stage("leave-and-redial", args.leave + args.walk + args.phone + args.redial, async () => {
      const t0 = now();
      await guest.keyboard.press("Escape");
      const leave = guest.getByRole("button", { name: "Leave visit", exact: true });
      await leave.waitFor({ state: "visible", timeout: 15000 });
      await leave.click();
      await until(host, args.leave * 1000, "host call ended", s => !s.active);
      const home = await until(guest, args.leave * 1000, "guest home in her own night", s => !s.active && !s.visiting && !s.borrowed && s.players.length === 1 && s.menus.telephone);
      await waitPanel(guest, args.phone * 1000, READY_TEXT, "guest line ready at home");
      const leftMs = now() - t0;
      const prefilled = await guest.getByRole("textbox", { name: "Number to call", exact: true }).inputValue();
      check("redial: the host's number is ready to call", /^\d{7}$/.test(prefilled));
      // The host, waking in her next night, gets up and walks back to her telephone.
      const hs0 = await pageState(host);
      const hostUp = await getUp(host, 0, args.wake * 1000, "host next morning");
      const h0 = await pageState(host), here = h0.players.find(p => p.id === 0);
      const w = here.nearObjects.includes("telephone") ? null : await walk(host, 0, house, objectFront(house, "telephone"), { ms: args.walk * 1000, near: "telephone", label: "host back to her telephone" });
      if ((await pageState(host)).menus.telephone) await waitPanel(host, args.phone * 1000, READY_TEXT, "host line ready again");
      else await openPhone(host, "host", args.phone * 1000);
      const t1 = now();
      await guest.getByRole("button", { name: "Call", exact: true }).click();
      await waitPanel(host, 20000, "The telephone is ringing.", "host ringing on the redial");
      await host.getByRole("button", { name: "Answer", exact: true }).click();
      const [g2, h2] = await Promise.all([
        until(guest, args.redial * 1000, "redial connected (the caller hosts)", s => s.status === "connected" && s.active && !s.visiting && s.players.length === 2),
        until(host, args.redial * 1000, "redial connected (the answerer visits)", s => s.status === "connected" && s.active && s.visiting && s.players.length === 2),
      ]);
      const redialConnectedMs = now() - t1;
      // Connected is not enough: the call has to stay up (both pages still in it ten seconds later).
      await sleep(Math.min(10000, left()));
      const [g3, h3] = await Promise.all([pageState(guest), pageState(host)]);
      if (!(g3.active && g3.status === "connected" && h3.active && h3.status === "connected")) throw Error(`the redialled call dropped within 10 s of connecting (caller ${g3.status}${g3.notice ? ` "${g3.notice}"` : ""}, answerer ${h3.status}${h3.notice ? ` "${h3.notice}"` : ""})`);
      return { leftMs, homeSeed: home.seed, hostWasStatus: hs0.status, hostUp, hostWalk: w, redialConnectedMs, sameNight: g2.seed === h2.seed, stillUpAfter10s: true };
    });

    // The redialled call is hung up from the caller's telephone; both lines go quiet.
    await stage("hang-up", 30, async () => {
      const t0 = now();
      const before = await pageState(guest);
      if (!before.active || before.status !== "connected") throw Error(`the call had already ended (${before.status}${before.notice ? `, "${before.notice}"` : ""})`);
      if (!before.menus.telephone) { await guest.keyboard.press("KeyE"); await sleep(500); }
      await guest.locator("#telephone-panel").getByText("Hang up", { exact: true }).click();
      await Promise.all([until(guest, 20000, "caller line ended", s => !s.active), until(host, 20000, "answerer line ended", s => !s.active)]);
      return { ms: now() - t0 };
    });
    if (!failed && !stopped) R.verdict = "PASS";
    else if (!failed) R.verdict = `STOPPED after ${stopped}`;
  } catch (e) {
    R.notes.push(`driver error: ${String(e.stack ?? e).split("\n").slice(0, 4).join(" | ")}`); failed = true;
    await shot("driver-error").catch(() => {});
  } finally {
    if (sampler) clearInterval(sampler);
    await sample().catch(() => {});
    if (P.last) foldP(P.last);
    if (Q.last) foldQ(Q.last);
    R.prediction = P.samples ? { instances: P.instances, ...P.totals, largestM: round(P.largest), recentP95MaxM: round(P.recentP95Max), pendingPeak: P.pendingPeak, samples: P.samples } : { unavailable: "no guest prediction was sampled" };
    R.hostInputs = Q.samples ? { sessions: Q.sessions, discarded: Q.discarded, underruns: Q.underruns, longestHoldMs: round(Q.longestHoldMs, 0), queuedPeak: Q.queuedPeak, samples: Q.samples } : { unavailable: "no host input queue was sampled" };
    for (const [role, page] of [["host", host], ["guest", guest]]) {
      if (!page || page.isClosed()) continue;
      const rec = await page.evaluate(() => { const r = window.__mpRoute; return r && { sockets: r.sockets, types: r.types, catchUpSteps: r.catchUpSteps, catchUpFrames: r.catchUpFrames, holds: r.holds, events: r.events.slice(-200) }; }).catch(() => null);
      if (!rec) continue;
      R.sockets[role] = rec.sockets; R[`${role}MessageTypes`] = rec.types; R[`${role}Lifecycle`] = rec.events;
      if (role === "host") R.catchUp = { steps: rec.catchUpSteps, frames: rec.catchUpFrames, source: "counted from the host's sent frames (guestSteps marked catchUp)" };
      else R.guestHolds = { sent: rec.holds, source: "guest input messages marked hold" };
    }
    const resumes = role => R[`${role}MessageTypes`]?.["out:resume"] ?? 0;
    R.transportResumes = { host: resumes("host"), guest: resumes("guest"), forced: R.forcedClose?.closed ? 1 : 0, note: "resume messages sent by each page; beyond the one forced close, each is a socket the page itself replaced (a silence of two heartbeats, or a close)" };
    clearTimeout(overall);
    await closeAll();
    R.finishedAt = new Date().toISOString(); R.elapsedS = round((now() - startedAt) / 1000, 1);
    R.browsersClosed = closed ?? "never launched";
    save();
    console.log(`${R.verdict}: ${R.stages.filter(s => s.result === "PASS").length}/${R.stages.length} stages passed in ${R.elapsedS} s; ${path.join(out, "result.json")}`);
    process.exitCode = R.verdict === "PASS" ? 0 : 1;
  }
}

function summary(R) {
  const lines = [`# Two-player route: ${R.verdict}`, "", `- build: ${R.build.url} (${R.build.version ? JSON.stringify(R.build.version) : "version unknown"})`, `- relay: ${R.relay.url}${R.relay.health ? ` (HTTP ${R.relay.health.status}, build ${R.relay.health.build}, ${R.relay.health.ms} ms)` : ""}`, `- started ${R.startedAt}, ${R.elapsedS ?? "?"} s of the ${R.bounds.overallS} s bound; browsers closed: ${R.browsersClosed ?? "?"}`, "", "| stage | result | ms | bound s | note |", "|---|---|---|---|---|"];
  for (const s of R.stages) lines.push(`| ${s.name} | ${s.result} | ${s.ms ?? ""} | ${s.boundS} | ${(s.error ?? "").replace(/\|/g, "/").slice(0, 160)} |`);
  const staged = R.stages.filter(x => x.counters);
  if (staged.length) {
    lines.push("", "Guest prediction and host queue by stage (counts within the stage; peaks are running):", "", "| stage | snaps | transition | correction | pending cap | reasons | pending peak | discarded | longest hold ms |", "|---|---|---|---|---|---|---|---|---|");
    let prev = { prediction: { snaps: 0, transitionSnaps: 0, correctionSnaps: 0, pendingCapSnaps: 0, transitionReasons: {} }, hostInputs: { discarded: 0 } };
    for (const x of staged) {
      const c = x.counters.prediction, d = k => c[k] - prev.prediction[k], reasons = Object.entries(c.transitionReasons).map(([k, v]) => [k, v - (prev.prediction.transitionReasons[k] ?? 0)]).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(", ");
      lines.push(`| ${x.name} | ${d("snaps")} | ${d("transitionSnaps")} | ${d("correctionSnaps")} | ${d("pendingCapSnaps")} | ${reasons} | ${c.pendingPeak} | ${x.counters.hostInputs.discarded - prev.hostInputs.discarded} | ${x.counters.hostInputs.longestHoldMs} |`);
      prev = x.counters;
    }
  }
  if (R.checks.length) { lines.push("", "Checks:", ""); for (const c of R.checks) lines.push(`- ${c.pass ? "PASS" : "FAIL"} ${c.name}`); }
  const p = R.prediction;
  if (p) lines.push("", "Guest prediction:", "", p.unavailable ? `- ${p.unavailable}` : `- snaps ${p.snaps}: transition ${p.transitionSnaps}, correction ${p.correctionSnaps}, pending cap ${p.pendingCapSnaps}; transition reasons ${JSON.stringify(p.transitionReasons)}; corrections ${p.corrections}; largest ${p.largestM} m; pending peak ${p.pendingPeak}; ${p.instances} prediction instance(s)`);
  const q = R.hostInputs;
  if (q) lines.push(q.unavailable ? `- host inputs: ${q.unavailable}` : `- host input queue: discarded ${q.discarded}, longest hold ${q.longestHoldMs} ms, underruns ${q.underruns}, queued peak ${q.queuedPeak}`);
  if (R.catchUp) lines.push(`- catch-up: ${R.catchUp.steps} steps in ${R.catchUp.frames} frames; guest holds sent: ${R.guestHolds?.sent ?? "?"}`);
  if (R.forcedClose?.socket) lines.push(`- forced close: code ${R.forcedClose.socket.code}, wasClean ${R.forcedClose.socket.wasClean}`);
  if (R.transportResumes) lines.push(`- transport resumes: host ${R.transportResumes.host}, guest ${R.transportResumes.guest} (forced closes: ${R.transportResumes.forced})`);
  const ws = role => R.sockets[role].map(s => `${s.code ?? "open"}`).join(", ");
  lines.push(`- relay sockets: host ${R.sockets.host.length} (closes ${ws("host") || "-"}), guest ${R.sockets.guest.length} (closes ${ws("guest") || "-"})`);
  for (const role of ["host", "guest"]) for (const socket of R.sockets[role]) {
    const line = socketCloseLine(role, socket); if (line) lines.push(line);
  }
  if ([...R.sockets.host, ...R.sockets.guest].some(s => Number.isFinite(s.closed))) lines.push("- Socket gaps are browser observations (successfully queued sends and dispatched receives), not proof of relay receipt, a server timeout, or its cause.");
  const fr = R.frameRate.map(f => `${f.role} ${f.framesPerSecond}/s (game ${f.gameSecondsPerSecond} s/s) at ${f.at}`).join("; ");
  if (fr) lines.push(`- frame rate samples: ${fr}`);
  const errs = ["host", "guest"].map(r => `${r} ${R.errors[r].length}`).join(", ");
  lines.push(`- page errors/console errors: ${errs}`);
  if (R.screenshots.length) lines.push(`- screenshots: ${R.screenshots.join(", ")}`);
  for (const n of R.notes) lines.push(`- note: ${n}`);
  return lines.join("\n") + "\n";
}

function socketCloseLine(role, s) {
  if (!Number.isFinite(s.closed)) return null;
  const stamp = key => !Object.hasOwn(s, key) ? "unavailable" : Number.isFinite(s[key]) ? new Date(s[key]).toISOString() : "none since open";
  const send = Number.isFinite(s.sendGapAtCloseMs) ? s.sendGapAtCloseMs : null, receive = Number.isFinite(s.receiveGapAtCloseMs) ? s.receiveGapAtCloseMs : null;
  const gaps = [send !== null && send >= 20000 ? "send" : null, receive !== null && receive >= 20000 ? "receive" : null].filter(Boolean);
  return `- ${role} socket #${s.id} closed ${s.code ?? "?"}: last send ${stamp("lastSend")}; last receive ${stamp("lastReceive")}; gaps at close send ${send === null ? "unavailable" : send + " ms"}, receive ${receive === null ? "unavailable" : receive + " ms"}${gaps.length ? ` [GAP >=20s: ${gaps.join(", ")}]` : ""}`;
}

if (require.main === module) main().catch(e => { console.error(e.stack ?? e); process.exitCode = 1; });
module.exports = { parseArgs, summary, initScript, socketCloseLine };
