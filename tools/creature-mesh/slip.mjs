// How far a mesh creature's planted feet slide (Ed, 2026-11-12, of the walk clip: "the feet don't plant, and the bodies seem
// rigid"). Measured two ways, nothing drawn, pure Node:
//   model: the walk as a clip. Each paw is followed through its stance (art/mesh/shape.js: a leg is down for its `duty` of the
//          cycle, from its `phase`), the body going forward one stride a cycle; the slip is how far the paw strays over the
//          ground from where it came down, in art pixels at the size it is drawn. A foot that plants: 0.
//   shown: the game's view played at 60 pictures a second at each pace (art pixels a second; 150 is a fight's run, 14 m a
//          second), with the frames it would show and where it would draw them (art/mesh/stride.js `stepStride`; the view before
//          that, a frame every step and at most 20 a second, on a tree that has no stride.js). The slip is the same, as drawn:
//          it adds what eight frames a cycle and the view's own stepping do to a foot.
//   node tools/creature-mesh/slip.mjs [kind...]        one line a kind and level and pace; every kind with legs, or those named
//     --tree <dir>    read art/mesh from another checkout (a worktree of the commit before), not this one
//     --levels 0,2    only those levels (0 baby to 3 legend)
//     --speeds 6,43,150   the paces the view is played at, art pixels a second (6: a wild one roaming; 43: on the leash; 150: a fight)
//     --json          as JSON
//     --max <px>      fail (exit 1) if any shown slip is over that many art pixels
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2), flag = name => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
const has = name => { const i = args.indexOf(name); if (i < 0) return false; args.splice(i, 1); return true; };
const tree = path.resolve(flag("--tree") ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../..")), levels = (flag("--levels") ?? "0,1,2,3").split(",").map(Number), speeds = (flag("--speeds") ?? "6,43,150").split(",").map(Number), json = has("--json"), max = flag("--max");
const load = f => import(pathToFileURL(path.join(tree, f)).href);
const M = await load("art/mesh/index.js"), { MESH_PLANS } = await load("art/mesh/plans.js"), { shape, pose } = await load("art/mesh/shape.js"), R = await load("art/mesh/raster.js");
const S = await load("art/mesh/stride.js").catch(() => null); // (the view's stepping, where the tree has it)
const kinds = (args.length ? args : Object.keys(MESH_PLANS).sort()).filter(k => MESH_PLANS[k][2]().gait?.legs?.length || MESH_PLANS[k][2]().gait?.paces);
const LEVELS = ["baby", "young", "adult", "legend"], CYCLE = M.MESH_CYCLE ?? 8;

/** A shape's planted feet: [{ paw (the bone on the ground), phase, duty }], from the shape itself where it says (sh.feet), else
 *  worked out from its gait's legs as the first meshes' were (the joint below a leg's last named bone). */
function feetOf(sh) {
  if (sh.feet) return sh.feet;
  return (sh.gait?.legs ?? []).map(l => { const last = sh.bones.findIndex(b => b.name === l.bones[2]), paw = sh.bones.findIndex(b => b.parent === last); return { paw: paw < 0 ? last : paw, phase: l.phase, duty: l.duty ?? sh.gait.duty ?? 0.6 }; });
}
const wrap = v => ((v % 1) + 1) % 1;

/** The clip's own slip: each paw through its stance, the body going one stride a cycle. { slip (metres, the worst paw's), rise
 *  (how far a planted paw leaves the ground, metres), stride }. */
function modelSlip(sh, n = 240) {
  const stride = R.stride(sh), feet = feetOf(sh); let slip = 0, rise = 0;
  for (const f of feet) {
    let x0, z0, y0;
    for (let i = 0; i <= n; i++) { const c = f.duty * i / n * 0.999, u = wrap(c - f.phase), { T } = pose(sh, u), x = T[f.paw * 3], y = T[f.paw * 3 + 1], z = T[f.paw * 3 + 2] + stride * (c - 0); // (the body has gone stride x c since it came down)
      if (i === 0) { x0 = x; y0 = y; z0 = z; continue; }
      slip = Math.max(slip, Math.hypot(x - x0, z - z0)); rise = Math.max(rise, Math.abs(y - y0)); }
  }
  return { slip, rise, stride };
}

/** The view before art/mesh/stride.js: a frame every `step`, at most `rate` a second, drawn where the creature is. */
function legacyView(step, rate, cycle) {
  let d = 0;
  return (dist, dt) => { d += rate ? Math.min(dist, step * rate * dt) : dist; return { frame: Math.floor(d / step) % cycle, shift: 0 }; };
}

/** The view played: the creature goes at `speed` (art pixels a second) for `secs`; each picture, the frame shown and where it is
 *  drawn; each paw's place on the ground (art pixels) is followed while the frame shown has it planted. The worst stray. `clips`:
 *  { walk: { sh, step (art pixels a frame) }, run? }, `view(dist, dt, speed)` => { clip, frame (of its cycle), shift (art pixels
 *  it is drawn ahead of where it is) }. */
function shownSlip(clips, ppu, view, speed, secs = 6, fps = 60) {
  const cache = new Map(), at = (clip, frame) => { const k = clip + frame; let v = cache.get(k); if (!v) { const sh = clips[clip].sh, { T } = pose(sh, frame / CYCLE); cache.set(k, (v = feetOf(sh).map(f => ({ z: T[f.paw * 3 + 2] * ppu, down: wrap(frame / CYCLE + f.phase) < f.duty })))); } return v; };
  let x = 0, worst = 0, cadence = 0, shown = 0, last = -1; const from = [];
  for (let i = 0; i < secs * fps; i++) {
    const dist = speed / fps; x += dist; const v = view(dist, 1 / fps, speed), feet = at(v.clip ?? "walk", v.frame), key = (v.clip ?? "walk") + v.frame;
    if (key !== last) { shown++; last = key; }
    feet.forEach((f, n) => { const g = x + (v.shift ?? 0) + f.z; if (!f.down) { from[n] = undefined; return; } if (from[n] === undefined || from[n].clip !== (v.clip ?? "walk")) from[n] = { g, clip: v.clip ?? "walk" }; if (i > fps) worst = Math.max(worst, Math.abs(g - from[n].g)); }); // (the first second: it is getting into its stride)
    cadence = shown / ((i + 1) / fps) / CYCLE;
  }
  return { slip: worst, cadence, clip: last.replace(/\d+$/, "") };
}

const rows = [];
for (const kind of kinds) for (const level of levels) {
  const make = () => ({ ...MESH_PLANS[kind][level](), fine: 2 }), walk = shape(make()), paces = walk.pace ? (make().gait.paces?.run ? ["walk", "run"] : ["walk"]) : ["walk"];
  const ppu = R.meshPpu(walk, M.MESH_HEIGHTS[kind][level]), clips = {};
  for (const pace of paces) { const sh = pace === "walk" ? walk : shape(make(), pace), m = modelSlip(sh); clips[pace] = { sh, step: m.stride / CYCLE * ppu, model: m }; }
  const row = { kind, level: LEVELS[level], ppu: +ppu.toFixed(1), paces: Object.fromEntries(paces.map(p => [p, { type: clips[p].sh.gait?.type, stridePx: +(clips[p].model.stride * ppu).toFixed(1), modelSlipPx: +(clips[p].model.slip * ppu).toFixed(2), modelRisePx: +(clips[p].model.rise * ppu).toFixed(2) }])), shown: {} };
  for (const speed of speeds) {
    const view = S ? (() => { const st = S.newStride(), G = { cycle: CYCLE, step: clips.walk.step, run: clips.run ? { step: clips.run.step } : undefined }; return (dist, dt, v) => { const r = S.stepStride(st, G, dist, dt); return { clip: r.run ? "run" : "walk", frame: r.frame, shift: r.shift }; }; })() : legacyView(clips.walk.step, M.MESH_RATE, CYCLE);
    const got = shownSlip(clips, ppu, view, speed); row.shown[speed] = { slipPx: +got.slip.toFixed(2), cyclesPerSecond: +got.cadence.toFixed(2), clip: got.clip };
  }
  rows.push(row);
}
if (json) console.log(JSON.stringify(rows, null, 1));
else {
  console.log(`slip of a planted paw, art pixels (model: the clip itself; shown: the view at ${speeds.join(", ")} art px a second, with its legs' cycles a second)`);
  for (const r of rows) console.log(`${(r.kind + " " + r.level).padEnd(18)} ${Object.entries(r.paces).map(([p, v]) => `${p} ${String(v.type).padEnd(5)} stride ${String(v.stridePx).padStart(6)} px, model slip ${String(v.modelSlipPx).padStart(6)}`).join(" | ")} | shown ${speeds.map(s => `@${s}: ${String(r.shown[s].slipPx).padStart(6)} px (${r.shown[s].clip} ${r.shown[s].cyclesPerSecond}/s)`).join("  ")}`);
  const worst = (f) => Math.max(...rows.flatMap(f));
  console.log(`worst: model ${worst(r => Object.values(r.paces).map(v => v.modelSlipPx))} px, shown ${worst(r => Object.values(r.shown).map(v => v.slipPx))} px`);
}
if (max !== undefined) { const bad = rows.flatMap(r => Object.entries(r.shown).filter(([, v]) => v.slipPx > +max).map(([s, v]) => `${r.kind} ${r.level} @${s}: ${v.slipPx} px`)); if (bad.length) { console.error(`planted feet slide more than ${max} art px:\n  ${bad.join("\n  ")}`); process.exit(1); } }
