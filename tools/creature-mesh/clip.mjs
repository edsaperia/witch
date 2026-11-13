// One clip of mesh creatures going as the game's view shows them, before a change and after it, to judge their walks by (Ed,
// 2026-11-12, of the last one: "the feet don't plant, and the bodies seem rigid"; he wants one long clip, not many). Each kind in
// turn, its baby and its adult: creeping (a wild one's roam), walking (on the leash), running (a fight's pace), then stopping.
// The top lane is the tree before (`--before <dir>`, a worktree of the commit before), the bottom this one; the ground is
// pebbled so a planted foot can be watched against it, and the picture follows the animals. Each tree is played with its own
// view: art/mesh/stride.js where it has one, else the first meshes' (a frame every step, at most MESH_RATE a second).
//   node tools/creature-mesh/clip.mjs --before ../before --out previews/creature-mesh/walks.mp4 [kind...]
//     --levels 0,2   the levels in each lane (two at most); --scale 2 (screen pixels an art pixel); --fps 60; needs ffmpeg
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { BG, DIM, GROUND, INK, Sheet } from "./draw.mjs";

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(here, "../..");
const args = process.argv.slice(2), flag = name => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
const before = flag("--before"), out = path.resolve(flag("--out") ?? "previews/creature-mesh/walks.mp4"), levels = (flag("--levels") ?? "0,2").split(",").map(Number).slice(0, 2), K = +(flag("--scale") ?? 2), fps = +(flag("--fps") ?? 60);
const W = 1280, H = 720, LEVELS = ["baby", "young", "adult", "legend"];
// (what each does, in turn: art pixels a second, for how long; 6.4 is 0.6 m a second, a wild one's roam; 43 the leash's run; 150 a fight's)
const ACTS = [["creeping", 8, 3], ["walking", 43, 4], ["running", 150, 3.5], ["stopped", 0, 1.5], ["walking", 43, 2], ["stopped", 0, 1.5]];

/** A tree's meshes and its view: { M, kinds, play(kind, level) => { walk (the baked frames), next(dist, dt) => { frame, shift } } }. */
async function tree(dir) {
  const load = f => import(pathToFileURL(path.join(dir, f)).href), M = await load("art/mesh/index.js"), S = await load("art/mesh/stride.js").catch(() => null);
  return { M, play(kind, level) {
    const walk = M.meshWalk(kind, level), G = M.meshGait(kind), n = G.cycle, step = G.steps[level] * walk.w, fly = G.type === "fly";
    if (S && !fly) { const o = S.newStride(), g = { cycle: n, step, rests: G.rests, run: G.run ? { step: G.run.steps[level] * walk.w } : undefined };
      return { walk, next(dist, dt) { const r = S.stepStride(o, g, dist, dt); return { frame: r.stand ? G.stand : r.run ? G.run.from + r.frame : r.frame, shift: r.shift }; } }; }
    let d = 0, at = -1, t = 0; // (the view the first meshes had: src/render/view/creatures.ts strideFrame as it was)
    return { walk, next(dist, dt) { t += dt; if (fly) return { frame: Math.floor(t * G.rate) % n, shift: 0 }; if (dist > 1e-6) { d += G.rate ? Math.min(dist, step * G.rate * dt) : dist; at = t; } return { frame: t - at < 0.25 ? Math.floor(d / step) % n : G.stand ?? 0, shift: 0 }; } };
  } };
}
const now = await tree(root), was = before ? await tree(path.resolve(before)) : null;
const kinds = args.length ? args : Object.keys(now.M.MESH_HEIGHTS).sort();
const lanes = [...(was ? [["before", was]] : []), ["after", now]], laneH = Math.floor((H - 40) / lanes.length);

fs.mkdirSync(path.dirname(out), { recursive: true });
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${W}x${H}`, "-r", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "medium", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
const done = new Promise((ok, no) => ff.on("close", c => (c ? no(Error(`ffmpeg ${c}`)) : ok())));
const sheet = new Sheet(W, H), hash = (a, b) => ((Math.imul(a, 374761393) ^ Math.imul(b, 668265263)) >>> 0) / 4294967296;
let shots = 0;
for (const kind of kinds) {
  const t0 = Date.now(), cast = lanes.map(([name, T]) => ({ name, who: levels.map(l => T.play(kind, l)) }));
  let x = 0; // (how far they have all gone, art pixels)
  for (const [doing, speed, secs] of ACTS) for (let i = 0; i < secs * fps; i++) {
    const dist = speed / fps; x += dist; sheet.clear(BG);
    sheet.text(`${kind}: ${doing}${speed ? ` (${speed} art px a second)` : ""}`, 16, 10, INK, 3);
    cast.forEach((lane, n) => {
      const ground = 40 + (n + 1) * laneH - 46; sheet.text(lane.name, 16, ground - laneH + 60, DIM, 3);
      // the ground: a line, and pebbles that pass with it, so a planted foot has something to be planted against
      for (let y = 0; y < 30; y++) for (let sx = 0; sx < W; sx += K) { const gx = Math.floor((sx + x * K - W * 4) / K), r = hash(gx >> 1, (y >> 1) + n * 0), c = y === 0 ? GROUND : r > 0.93 ? [70, 78, 70] : r < 0.04 ? [112, 122, 100] : [52, 58, 56]; for (let t = 0; t < K; t++) sheet.dot(sx + t, ground + y, c); }
      lane.who.forEach((p, j) => { const r = p.next(dist, 1 / fps), w = p.walk, at = Math.round(W * (levels.length > 1 ? 0.26 + j * 0.42 : 0.5) / K + r.shift) * K - Math.round(w.w * K / 2);
        sheet.frame(w.towards[r.frame] ?? w.towards[0], w.w, w.h, at, ground + K, K); });
    });
    if (!ff.stdin.write(Buffer.from(sheet.d.buffer, sheet.d.byteOffset, sheet.d.byteLength))) await new Promise(ok => ff.stdin.once("drain", ok));
    shots++;
  }
  console.error(`${kind}: drawn (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
ff.stdin.end(); await done;
console.log(`${out}: ${kinds.length} kinds, ${(shots / fps).toFixed(0)} s`);
