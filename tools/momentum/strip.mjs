// Creature momentum, seen from above (Ed, 2026-10-27; rules/momentum.ts): each species runs at her from 40 m off; 16 m short,
// before it winds up, she blinks 9 m to the side; its path over the next 2 s with the momentum on (orange) and off (grey), and
// her two places. Headless (the rules through Vite), drawn as SVG and shot to a PNG in Chromium.
//   node tools/momentum/strip.mjs [out.png] [--species wolf,boar,fox,cat] [--seed 77]
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const { chromium } = pw.default ?? pw;
import fs from "node:fs";
import { openRules, arg, list } from "../balance/lib.mjs";

const OUT = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "previews/momentum-strip.png";
const SPECIES = list(arg("species", "wolf,boar,fox,cat")), SEED = +arg("seed", 77);
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

function run(species, on) {
  const t = withTuning({ creatureMomentum: { ...TUNING.creatureMomentum, on }, combat: { ...TUNING.combat, packs: { on: false } } });
  const g = newGame(SEED, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 150) c.gone = true;
  g.witches[0].health.hp = 1e6;
  const w = g.witch, x = w.x + 40, z = w.z;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && Math.hypot(k.x - w.x, k.z - w.z) > 200);
  Object.assign(c, { species, level: 2, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, state: "wild", enraged: true });
  c.cell = g.map.cellSafe(w.x, w.z).cell;
  g.byArea = null;
  const o = { x: w.x, z: w.z }, path = [], her = [];
  let at = -1;
  for (let i = 0; i < 8 * 60; i++) {
    stepGame(g, idle, STEP);
    const w = g.witch; // (her body is a new object each step)
    if (at < 0 && c.fight?.target?.kind === "witch" && !c.fight.lunge && Math.hypot(c.x - w.x, c.z - w.z) < 20 && Math.hypot(c.vx ?? 0, c.vz ?? 0) > 5) { her.push({ x: w.x - o.x, z: w.z - o.z }); g.witch = { ...w, z: w.z + 9 }; at = i; her.push({ x: w.x - o.x, z: w.z + 9 - o.z }); }
    if (at >= 0 || i % 2 === 0) path.push({ x: c.x - o.x, z: c.z - o.z, after: at >= 0 });
    if (at >= 0 && i - at > 120) break;
  }
  return { path, her, stepped: at >= 0 };
}

const S = 9, W = 360, H = 260, panels = [];
for (const sp of SPECIES) {
  const on = run(sp, true), off = run(sp, false), cx = 40, cy = H / 2;
  const P = (q) => `${(cx + (q.x + 6) * S * 0.62).toFixed(1)},${(cy + q.z * S * 0.62).toFixed(1)}`;
  const line = (r, col, w) => `<polyline fill="none" stroke="${col}" stroke-width="${w}" points="${r.path.map(P).join(" ")}"/>` + r.path.filter((q, i) => q.after && i % 6 === 0).map(q => `<circle cx="${P(q).split(",")[0]}" cy="${P(q).split(",")[1]}" r="2.2" fill="${col}"/>`).join("");
  const her = on.her.length ? on.her : off.her;
  panels.push(`<g clip-path="url(#clip)"><rect width="${W}" height="${H}" fill="#14161f"/>${line(off, "#8a8fa0", 1.6)}${line(on, "#ff9a3c", 2.4)}
    ${her.map((q, i) => `<circle cx="${P(q).split(",")[0]}" cy="${P(q).split(",")[1]}" r="5" fill="${i ? "#ff5cc8" : "none"}" stroke="#ff5cc8" stroke-width="2"/>`).join("")}
    <text x="10" y="20" fill="#fff" font-family="monospace" font-size="14">${sp}${on.stepped && off.stepped ? "" : " (no sidestep)"}</text></g>`);
}
const cols = 2, rows = Math.ceil(panels.length / cols), svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * W + (cols - 1) * 8}" height="${rows * H + (rows - 1) * 8 + 52}">
<defs><clipPath id="clip"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="100%" height="100%" fill="#0b0c12"/>${panels.map((p, i) => `<g transform="translate(${(i % cols) * (W + 8)},${Math.floor(i / cols) * (H + 8)})">${p}</g>`).join("")}
<text x="10" y="${rows * (H + 8) + 16}" fill="#ccc" font-family="monospace" font-size="13">Each runs in from the right; 20 m short she steps 9 m down (pink ring to dot).</text><text x="10" y="${rows * (H + 8) + 36}" fill="#ccc" font-family="monospace" font-size="13">Orange: momentum on (a dot every 0.1 s after). Grey: off. Charges keep their lane.</text></svg>`;
await close();
const b = await chromium.launch(), p = await b.newPage();
await p.setContent(`<body style="margin:0">${svg}</body>`);
fs.mkdirSync(OUT.replace(/[^/]*$/, "") || ".", { recursive: true });
await (await p.$("svg")).screenshot({ path: OUT });
await b.close();
console.log(OUT);
