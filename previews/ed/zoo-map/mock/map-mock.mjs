// Mock (not for merging): the zoo laid out like the sea chart, from above. Writes previews/ed/zoo-map/map.svg and map.png.
//   node tools/zoo/map-mock.mjs [found-count] [world]
import fs from "fs";
import { openRules } from "../balance/lib.mjs";
const [foundN = "14", worldArg = "0"] = process.argv.slice(2), world = Number(worldArg);
const R = await openRules();
const ros = await R.load("/src/rules/rosters.ts"), { islandCoast } = await R.load("/src/rules/islandShape.ts"), { TUNING } = await R.load("/src/rules/tuning.ts");
const { islandPoints } = await R.load("/art/islands.js"), { AREAS } = await R.load("/art/areas.js"), { groundColours } = await R.load("/art/ground.js");
const LL = await R.load("/src/rules/lakeLooks.ts"), S = await R.load("/art/sigils.js"), { M } = await R.load("/art/materials.js").catch(() => ({ M: null }));
const { DISCO_LOOK: DL } = await R.load("/art/dancefloor.js");
const STYLE = JSON.parse(fs.readFileSync("config/style.json", "utf8"));
const W = worldOf => worldOf;
const isl = ros.worldOf(world).islands;
// The scale: the chart's disc radius 1 as DISC metres; each island's outline box (the chart's BOX, 0.17) as its share.
// (Ed, 2026-10-26: "zoo creature areas should be about the same size as the ones found on islands": every island's outline scaled to
// AREA across, whatever its real size; the chart's layout spread till the nearest two islands' middles are AREA + GAP apart)
const AREA = 168, GAP = 30, BOX = 0.17;
const mids = [{ x: 0, y: 0 }, ...[...isl.entries()].filter(([k]) => k !== "home").map(([, p]) => p)];
let near = Infinity; for (let i = 0; i < mids.length; i++) for (let j = i + 1; j < mids.length; j++) near = Math.min(near, Math.hypot(mids[i].x - mids[j].x, mids[i].y - mids[j].y));
const DISC = Math.ceil((AREA + GAP) / near / 10) * 10;
const kinds = ros.KIND_NAMES, homeK = ros.homeKinds();
// (a sample save: home's kinds, and the next nearest islands found)
const byDist = kinds.filter(k => !homeK.includes(k)).sort((a, b) => Math.hypot(isl.get(a).x, isl.get(a).y) - Math.hypot(isl.get(b).x, isl.get(b).y));
const found = new Set([...homeK, ...byDist.slice(0, Number(foundN))].filter(k => !ros.isPlaceholder(k)));
const areaOf = k => AREAS.find(a => a.creature === k);
const hex = c => "#" + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const floorOf = k => { const a = areaOf(k); if (!a) return [90, 90, 90]; const g = groundColours(a, { sat: 1, trunkHue: .08, ...STYLE }); const v = Object.values(g); return v[0]; };
const LOOK = { water: [40, 70, 110], ice: [190, 220, 235], lava: [230, 80, 30], oasis: [40, 150, 140], sinkhole: [30, 60, 50], tarn: [70, 110, 130], tar: [25, 25, 30], rust: [180, 90, 50], lily: [60, 110, 70] };
const lookOf = k => { const b = LL.blendAt(LL.islandBearing(k, world)); return LL.LAKE_LOOKS[b.a] ?? "water"; };
const PX = 1600, cx = PX / 2;
const sc = PX / (DISC * 2.75);
const P = (x, y) => [cx + x * DISC * sc, cx + y * DISC * sc];
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PX}" height="${PX}" viewBox="0 0 ${PX} ${PX}">`;
svg += `<defs><pattern id="flag" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${hex(DL.rim)}"/><rect x="7" y="7" width="7" height="7" fill="${hex(DL.rimDark)}" opacity=".35"/><path d="M0 0H14M0 7H14M0 0V7M7 7V14" stroke="${hex(DL.grout)}" stroke-width="1.2"/></pattern><pattern id="plaza" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#c4bdab"/><path d="M0 0H22M0 11H22M0 0V11M11 11V22" stroke="#8d8676" stroke-width="1.4"/><circle cx="16" cy="5" r="2" fill="#7d8a5a" opacity=".6"/></pattern></defs>`;
// space past the edge (Ed: "behind that is space"): deep night and stars, as the chart's sky
svg += `<rect width="${PX}" height="${PX}" fill="#070912"/>`;
for (let i = 0; i < 420; i++) { const h = (n) => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return x - Math.floor(x); }; svg += `<circle cx="${(h(1) * PX).toFixed(1)}" cy="${(h(2) * PX).toFixed(1)}" r="${(0.5 + h(3) * 1.3).toFixed(1)}" fill="#dfe6ff" opacity="${(0.3 + h(4) * 0.7).toFixed(2)}"/>`; }
// the rim (Ed: "all around the flagstones give way to water, which falls off the disc as a waterfall"): the flagstones out to the
// streets' edge, then a band of water darkening to the lip, the lip lighter where it gathers to pour off, the fall's spray beyond
const RS = DISC * 1.12 * sc, RW = DISC * 1.24 * sc;
svg += `<defs><radialGradient id="sea" cx="50%" cy="50%" r="50%"><stop offset="${(RS / RW * 100).toFixed(1)}%" stop-color="#1d3a5c"/><stop offset="97%" stop-color="#0d1d33"/><stop offset="100%" stop-color="#7fb0d8"/></radialGradient></defs>`;
svg += `<circle cx="${cx}" cy="${cx}" r="${RW + 10}" fill="none" stroke="#9cc6e8" stroke-width="14" stroke-dasharray="3 5" opacity=".35"/>`;
svg += `<circle cx="${cx}" cy="${cx}" r="${RW}" fill="url(#sea)"/>`;
svg += `<circle cx="${cx}" cy="${cx}" r="${RS}" fill="url(#flag)"/>`;
svg += `<circle cx="${cx}" cy="${cx}" r="${RS}" fill="none" stroke="#6f6656" stroke-width="3"/>`;
const rows = [];
for (const k of ["home", ...kinds]) {
  const at = k === "home" ? { x: 0, y: 0 } : isl.get(k); if (!at) continue;
  const spec = k === "home" ? ros.coastSpec(ros.homeIsland(world, ros.knownKinds([...found].filter(f => !homeK.includes(f))))) : ros.coastSpec(ros.islandOf(k, world));
  const radii = islandCoast(spec, k === "home" ? TUNING.map?.coast : TUNING.islands?.coast).radii, raw = islandPoints(radii);
  const xs = raw.map(p => p[0]), ys = raw.map(p => p[1]), ext = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const k0 = AREA / DISC / BOX / ext, pts = raw.map(([u, v]) => [.5 + (u - .5) * k0, .5 + (v - .5) * k0]); // (AREA metres across)
  const box = AREA; // metres across: every island one area
  const d = pts.map(([u, v], i) => { const [x, y] = P(at.x + (u - .5) * BOX, at.y + (v - .5) * BOX); return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`; }).join("") + "Z";
  const [mx, my] = P(at.x, at.y);
  if (k === "home") {
    const pr = box * .42 * sc; // (the plaza: a round of pale flagstones, the Ent's sigil carved in, as a legend clearing's floor)
    svg += `<circle cx="${mx}" cy="${my}" r="${pr}" fill="url(#plaza)" stroke="#6d675b" stroke-width="4"/>`;
    for (const st of S.SIGILS.worldTree) if (st.l) svg += `<polyline points="${st.l.map(([u, v]) => `${(mx + (u - .5) * pr * 1.7).toFixed(1)},${(my + (v - .5) * pr * 1.7).toFixed(1)}`).join(" ")}" fill="none" stroke="#3d3a33" stroke-width="${(pr * .05).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    svg += `<circle cx="${mx}" cy="${my}" r="${pr * .93}" fill="none" stroke="#5bffb0" stroke-width="1.5" opacity=".5"/>`;
    svg += `<text x="${mx}" y="${my + pr + 18}" text-anchor="middle" font-family="monospace" font-size="13" fill="#eee" stroke="#000" stroke-width="2.5" paint-order="stroke">home: the Ent's plaza</text>`;
    rows.push({ id: k, state: "home" });
  } else if (found.has(k)) {
    svg += `<path d="${d}" fill="${hex(floorOf(k))}" stroke="#2a2a22" stroke-width="2"/>`;
    // its legend's circle at the island's middle (Ed: "Each zoo area has the corresponding legend circle at the centre of it"), its sigil carved in
    const lr = 22 * sc, col = hex(S.sigilColour(k));
    svg += `<circle cx="${mx}" cy="${my}" r="${lr}" fill="url(#plaza)" stroke="#d8d0bc" stroke-width="1.5"/>`;
    for (const st of S.SIGILS[k] ?? []) if (st.l) svg += `<polyline points="${st.l.map(([u, v]) => `${(mx + (u - .5) * lr * 1.6).toFixed(1)},${(my + (v - .5) * lr * 1.6).toFixed(1)}`).join(" ")}" fill="none" stroke="${col}" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>`;
    svg += `<text x="${mx}" y="${my + lr + 12}" text-anchor="middle" font-family="monospace" font-size="11" fill="#fff" stroke="#000" stroke-width="2.5" paint-order="stroke">${k}</text>`;
    rows.push({ id: k, state: "found", area: areaOf(k)?.id });
  } else {
    const L = lookOf(k);
    svg += `<path d="${d}" fill="${hex(LOOK[L])}" stroke="#4f4a40" stroke-width="3" opacity=".95"/>`;
    svg += `<text x="${mx}" y="${my + 4}" text-anchor="middle" font-family="monospace" font-size="10" fill="#ddd" opacity=".7">${ros.isPlaceholder(k) ? "?" : L}</text>`;
    rows.push({ id: k, state: "lake", look: L });
  }
}
svg += `<text x="20" y="34" font-family="monospace" font-size="22" fill="#eee">The zoo laid out like the sea chart (world ${world}; ${found.size} of ${kinds.length} islands found, ${found.size >= kinds.length ? "?all: the map's see-all switch" : "sample save"})</text>`;
svg += `<text x="20" y="62" font-family="monospace" font-size="15" fill="#aaa">streets: the dancefloor's flagstones · rim: water pouring off into space · coloured: found · lake colours: undiscovered · every island ${AREA} m across, disc ${2 * DISC} m across</text>`;
const bar = 500 * sc; svg += `<rect x="20" y="${PX - 40}" width="${bar}" height="6" fill="#eee"/><text x="${20 + bar + 8}" y="${PX - 32}" font-family="monospace" font-size="14" fill="#eee">500 m (every island ${AREA} m across, one area; the nearest two ${GAP}+ m apart)</text>`;
svg += `</svg>`;
fs.writeFileSync("previews/ed/zoo-map/map.svg", svg);
fs.writeFileSync("previews/ed/zoo-map/map.json", JSON.stringify({ world, disc: DISC, box: BOX * DISC, rows }, null, 1));
await R.close();
let pw; try { pw = await import("playwright"); } catch { pw = (await import("/opt/node22/lib/node_modules/playwright/index.js")).default; }
const b = await (pw.chromium ?? pw.default.chromium).launch(), pg = await b.newPage({ viewport: { width: PX, height: PX } });
await pg.setContent(`<body style="margin:0">${svg}</body>`); await pg.screenshot({ path: "previews/ed/zoo-map/map.png" }); await b.close();
console.log(`islands ${rows.length}: found ${rows.filter(r => r.state === "found").length}, lakes ${rows.filter(r => r.state === "lake").length}; disc ${2 * DISC} m across, nearest middles ${Math.round(near * DISC)} m`);
