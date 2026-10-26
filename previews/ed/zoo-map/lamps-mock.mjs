// Mock (concept): the zoo's fence lamps from above, round a few islands of the real layout (rules/zooMap.ts, world 0, every island
// found): each fence run's lamps spread evenly round it, about every SPACING metres (its perimeter over SPACING, rounded), each with
// its warm pool of light on the flagstones and the grass. Writes previews/ed/zoo-map/lamps-above.png.
//   node tools/zoo/lamps-mock.mjs [around kind] [box m]
import fs from "fs";
import { openRules } from "../balance/lib.mjs";
const [kind = "wolf", boxArg = "620"] = process.argv.slice(2), BOX = Number(boxArg), SPACING = 30;
const R = await openRules();
const { zooLayout, reachAt } = await R.load("/src/rules/zooMap.ts"), { TUNING } = await R.load("/src/rules/tuning.ts"), { ZOO_CONFIG } = await R.load("/src/rules/zoo.ts");
const { AREAS } = await R.load("/art/areas.js"), { groundColours } = await R.load("/art/ground.js"), { DISCO_LOOK: DL } = await R.load("/art/dancefloor.js");
const STYLE = JSON.parse(fs.readFileSync("config/style.json", "utf8")), A = TUNING.areaSize * TUNING.areaScale;
const L = zooLayout(0, "all", { across: A, gap: ZOO_CONFIG.gap, margin: ZOO_CONFIG.margin, areaSize: A }, TUNING.islands?.coast);
const C = L.islands.find(I => I.kind === kind) ?? L.islands[0], PX = 1200, sc = PX / BOX, ox = C.x - BOX / 2, oz = C.z - BOX / 2;
const P = (x, z) => [((x - ox) * sc).toFixed(1), ((z - oz) * sc).toFixed(1)];
const hex = c => "#" + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const floor = k => { const a = AREAS.find(t => t.creature === k); return a ? Object.values(groundColours(a, { sat: 1, trunkHue: .08, ...STYLE }))[0] : [80, 90, 70]; };
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PX}" height="${PX}"><defs><pattern id="flag" width="${(1.4 * sc).toFixed(1)}" height="${(0.9 * sc).toFixed(1)}" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="${hex(DL.rim.map(v => v * 0.55))}"/><path d="M0 0H100M0 0V100" stroke="${hex(DL.grout.map(v => v * 0.55))}" stroke-width="1"/></pattern>
<radialGradient id="pool"><stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".45" stop-color="#ffb35a" stop-opacity=".3"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient></defs>`;
svg += `<rect width="${PX}" height="${PX}" fill="url(#flag)"/>`;
const near = L.islands.filter(I => Math.abs(I.x - C.x) < BOX / 2 + I.most && Math.abs(I.z - C.z) < BOX / 2 + I.most);
let lamps = 0;
const pools = [], posts = [];
for (const I of near) {
  const pts = [];
  for (let k = 0; k <= 360; k++) { const a = -Math.PI + (k / 360) * Math.PI * 2, r = reachAt(I.reach, a); pts.push([I.x + Math.cos(a) * r, I.z + Math.sin(a) * r]); }
  const d = pts.map(([x, z], i) => `${i ? "L" : "M"}${P(x, z).join(",")}`).join("") + "Z";
  svg += `<path d="${d}" fill="${hex(floor(I.kind).map(v => v * 0.6))}"/>`;
  svg += `<path d="${d}" fill="none" stroke="#1d1206" stroke-width="5"/><path d="${d}" fill="none" stroke="#e0a83a" stroke-width="2.5"/>`;
  // (its lamps: spread evenly by arc length round its outline)
  const seg = [0]; for (let i = 1; i < pts.length; i++) seg.push(seg[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const per = seg[seg.length - 1], n = Math.max(3, Math.round(per / SPACING)), off = (I.x * 0.37) % (per / n);
  for (let j = 0; j < n; j++) { const s = off + (j * per) / n; let i = 1; while (i < seg.length - 1 && seg[i] < s) i++; const f = (s - seg[i - 1]) / Math.max(1e-6, seg[i] - seg[i - 1]); const x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, z = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f; pools.push([x, z]); posts.push([x, z]); lamps++; }
  svg += `<text x="${P(I.x, I.z)[0]}" y="${P(I.x, I.z)[1]}" text-anchor="middle" font-family="monospace" font-size="16" fill="#fff" stroke="#000" stroke-width="3" paint-order="stroke">${I.kind} · ${n} lamps</text>`;
}
for (const [x, z] of pools) svg += `<circle cx="${P(x, z)[0]}" cy="${P(x, z)[1]}" r="${(9 * sc).toFixed(1)}" fill="url(#pool)" style="mix-blend-mode:screen"/>`;
for (const [x, z] of posts) svg += `<circle cx="${P(x, z)[0]}" cy="${P(x, z)[1]}" r="4" fill="#fff1c2" stroke="#1d1206" stroke-width="2"/>`;
const bar = 100 * sc;
svg += `<rect x="20" y="${PX - 36}" width="${bar}" height="6" fill="#eee"/><text x="${28 + bar}" y="${PX - 28}" font-family="monospace" font-size="15" fill="#eee" stroke="#000" stroke-width="3" paint-order="stroke">100 m · concept: a gilt lamp about every ${SPACING} m round each island's fence, spread evenly; a warm pool of light under each</text>`;
svg += `</svg>`;
await R.close();
let pw; try { pw = await import("playwright"); } catch { pw = (await import("/opt/node22/lib/node_modules/playwright/index.js")).default; }
const b = await (pw.chromium ?? pw.default.chromium).launch(), pg = await b.newPage({ viewport: { width: PX, height: PX } });
await pg.setContent(`<body style="margin:0;background:#000">${svg}</body>`); await pg.screenshot({ path: "previews/ed/zoo-map/lamps-above.png" }); await b.close();
console.log(`${near.length} islands, ${lamps} lamps in view; about ${Math.round(L.islands.reduce((t, I) => { let p = 0; for (let k = 0; k < 96; k++) { const a0 = -Math.PI + k / 96 * Math.PI * 2, a1 = a0 + Math.PI * 2 / 96; p += Math.hypot(Math.cos(a1) * reachAt(I.reach, a1) - Math.cos(a0) * reachAt(I.reach, a0), Math.sin(a1) * reachAt(I.reach, a1) - Math.sin(a0) * reachAt(I.reach, a0)); } return t + Math.round(p / SPACING); }, 0))} lamps over the whole zoo`);
