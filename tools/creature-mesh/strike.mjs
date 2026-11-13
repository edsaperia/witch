// A clip of a mesh creature whose heads strike in turn (the hydra: Ed, 2026-11-13, "it would be cool if the hydra did attacks with
// alternating heads"), to judge the strike by: two levels side by side, standing, through two casts of its attack. The frames
// are the game's own (art/mesh/index.js meshWalk: its strike frames after its walk's) and the timing is its attack's as written
// (config/species-attacks.json: wind-up, a burst's shots and their gap, cooldown), picked as src/render/headStrike.ts picks
// them: the first head drawn back through the wind-up, each head struck as its shot leaves, the next drawn back between shots.
// A dot leaves the picture from the striking head's side with each shot. It is not a recording of the game.
//   node tools/creature-mesh/strike.mjs [kind] --out previews/creature-mesh/hydra-strike.mp4
//     --levels 2,3   the levels shown (two at most); --scale 2 (screen pixels an art pixel); --fps 30; needs ffmpeg
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { meshGait, meshWalk } from "../../art/mesh/index.js";
import { DIM, GROUND, INK, Sheet } from "./draw.mjs";

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(here, "../..");
const args = process.argv.slice(2), flag = name => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
const out = path.resolve(flag("--out") ?? "previews/creature-mesh/hydra-strike.mp4"), levels = (flag("--levels") ?? "2,3").split(",").map(Number).slice(0, 2), K = +(flag("--scale") ?? 2), fps = +(flag("--fps") ?? 30), kind = args[0] ?? "hydra";
const A = JSON.parse(fs.readFileSync(path.join(root, "config/species-attacks.json"), "utf8"))[kind], G = meshGait(kind);
if (!G.strike || !A) { console.error(`${kind} has no heads that strike in turn (its plan's gait.strike)`); process.exit(2); }
const windup = A.cast?.windup ?? 0.5, cooldown = A.cast?.cooldown ?? 3, n = A.emit?.n ?? 1, gap = A.emit?.gap ?? 0.15, heads = A.emit?.heads?.n ?? G.strike.heads, SNAP = 0.16, SWAY = 5;
/** The strike frame at `t` s into a cast (src/render/headStrike.ts), or -1; and the shots that have left by then. */
function at(t) {
  const sway = Math.floor(t * SWAY) & 1;
  if (t < windup) return { f: sway, shots: [] };
  const k = Math.min(n - 1, Math.floor((t - windup) / gap + 1e-9)), since = t - windup - k * gap, shots = Array.from({ length: k + 1 }, (_, i) => ({ head: i % heads, age: t - windup - i * gap }));
  if (since < SNAP) return { f: (k % heads) * G.strike.each + G.strike.each - 1, shots };
  return { f: k < n - 1 ? ((k + 1) % heads) * G.strike.each + sway : -1, shots };
}
const walks = levels.map(l => meshWalk(kind, l)), W = Math.max(640, walks.reduce((a, w) => a + w.w * K + 160, 80) & ~1), H = (Math.max(...walks.map(w => w.h)) * K + 110) & ~1, ground = H - 50;
fs.mkdirSync(path.dirname(out), { recursive: true });
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${W}x${H}`, "-r", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
const done = new Promise((ok, no) => ff.on("close", c => (c ? no(Error(`ffmpeg ${c}`)) : ok()))), sheet = new Sheet(W, H), NAMES = ["baby", "young", "adult", "legend"], total = 1 + 2 * cooldown;
for (let i = 0; i < total * fps; i++) {
  const t = i / fps - 1, c = t < 0 ? null : at(t % cooldown), f = c && c.f >= 0 ? G.strike.from + c.f : G.stand;
  sheet.clear(); sheet.line(0, W, ground, GROUND);
  let x = 60;
  walks.forEach((w, j) => { sheet.frame(w.towards[f], w.w, w.h, x, ground, K); sheet.text(NAMES[levels[j]], x, ground + 10, DIM, 2);
    // (its shots: a dot from the striking head's side, flying off to the right)
    for (const s of c?.shots ?? []) { const px = x + w.w * K * 0.8 + s.age * 420, py = ground - w.h * K * (0.3 + 0.12 * (heads - 1 - s.head)); for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) if (a * a + b * b <= 16) sheet.dot(px + a, py + b, [150, 230, 90]); }
    x += w.w * K + 160; });
  sheet.text(`${kind}: ${c ? (c.f < 0 ? "resting" : c.f % G.strike.each === G.strike.each - 1 ? `head ${Math.floor(c.f / G.strike.each) + 1} spits` : `head ${Math.floor(c.f / G.strike.each) + 1} draws back`) : "standing"}`, 12, 12, INK, 2);
  if (!ff.stdin.write(Buffer.from(sheet.d.buffer, 0, W * H * 4))) await new Promise(r => ff.stdin.once("drain", r));
}
ff.stdin.end(); await done;
console.log(`${path.relative(root, out)}: ${W} x ${H}, ${total.toFixed(1)} s`);
