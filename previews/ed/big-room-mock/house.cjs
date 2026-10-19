// The treehouse as placeholder rooms joined by corridors (Ed, 2026-10-19), from house.json: a plan from above (north up, the
// camera and the dancefloor south) and a view at the game camera's angle (front walls cut away, as the game draws indoors).
//   node house.cjs <plan.png> <view.png>
const fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "house.json"), "utf8"));
const [planOut, viewOut] = process.argv.slice(2);
const COL = { works: "#5fd99a", soon: "#b99be8", bed: "#f2c25c", now: "#6fb4f0" };
const FLOOR = "#7a5636", WALL = "#3a2617", CORR = "#6b4a2e", INK = "#14121b";
const esc = t => t.replace(/&/g, "&amp;");
const lab = (txt, x, y, c, anchor = "middle", size = 15) => `<text x="${x}" y="${y}" fill="${c}" font-size="${size}" font-weight="700" text-anchor="${anchor}" paint-order="stroke" stroke="${INK}" stroke-width="5">${esc(txt)}</text>`;
const roomOf = id => H.rooms.find(r => r.id === id);

// ---- the plan ----
function plan() {
  const S = 22, W = 1400, Hh = 1160, cx = 660, cy = 560, X = x => cx + x * S, Y = z => cy + z * S;
  let s = "";
  // the Ent's branches under the corridors, a hint of where they run
  for (const c of H.corridors) { const [a, b] = c.pts; s += `<line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="#2c3a22" stroke-width="${(H.w + 1.6) * S}" stroke-linecap="round" opacity=".7"/>`; }
  // balcony, hub
  const BO = H.balcony.out, BR = H.balcony.r, R = H.hub.r;
  s += `<path d="M ${X(-BR)} ${Y(BO)} A ${BR * S} ${BR * S} 0 0 0 ${X(BR)} ${Y(BO)} Z" fill="#6b4a2e" stroke="#c49a6c" stroke-width="3"/>`;
  s += `<circle cx="${X(0)}" cy="${Y(0)}" r="${R * S}" fill="${FLOOR}" stroke="${WALL}" stroke-width="9"/>`;
  s += `<circle cx="${X(0)}" cy="${Y(0)}" r="${2.6 * S}" fill="#2b5c7f"/>`;
  // rooms
  for (const r of H.rooms) s += `<rect x="${X(r.x0)}" y="${Y(r.z0)}" width="${(r.x1 - r.x0) * S}" height="${(r.z1 - r.z0) * S}" fill="${FLOOR}" stroke="${WALL}" stroke-width="9"/><rect x="${X(r.x0)}" y="${Y(r.z0)}" width="${(r.x1 - r.x0) * S}" height="${(r.z1 - r.z0) * S}" fill="${r.col}" fill-opacity=".14"/>`;
  // corridors over the walls (the doorways)
  for (const c of H.corridors) { const [a, b] = c.pts; s += `<line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="${CORR}" stroke-width="${H.w * S}"/><line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="#d8b890" stroke-width="2" stroke-dasharray="2 8" opacity=".6"/>`; }
  // the hub's open front onto the balcony
  { const [o0, o1] = H.hub.open, p = (b, r) => [Math.sin(b * Math.PI / 180) * r, -Math.cos(b * Math.PI / 180) * r], a = p(o0, R), b = p(o1, R); s += `<path d="M ${X(a[0])} ${Y(a[1])} A ${R * S} ${R * S} 0 0 1 ${X(b[0])} ${Y(b[1])}" fill="none" stroke="${FLOOR}" stroke-width="12"/>`; }
  // objects
  for (const o of H.objects) {
    const c = COL[o.kind];
    if (o.round) { s += `<circle cx="${X(o.x)}" cy="${Y(o.z)}" r="${o.round * S}" fill="${o.id === "circle" ? "#3b1e1e" : c}" stroke="${o.id === "circle" ? "#c03a3a" : INK}" stroke-width="3"/>`; continue; }
    if (o.area) { s += `<ellipse cx="${X(o.x)}" cy="${Y(o.z)}" rx="${o.area[0] / 2 * S}" ry="${o.area[1] / 2 * S}" fill="${c}" fill-opacity=".2" stroke="${c}" stroke-width="2" stroke-dasharray="5 4"/>`;
      for (const [hx, hz] of [[-.9, .1], [0, -.3], [.9, .25]]) { const px = X(o.x + hx), py = Y(o.z + hz); s += `<path d="M ${px - 7} ${py + 4} L ${px + 7} ${py + 4} L ${px + 2} ${py - 10} Z" fill="#3b2a5e" stroke="${c}" stroke-width="2"/><line x1="${px - 10}" y1="${py + 4}" x2="${px + 10}" y2="${py + 4}" stroke="${c}" stroke-width="3"/>`; }
      continue; }
    s += `<rect x="${X(o.x - o.w / 2)}" y="${Y(o.z - o.d / 2)}" width="${o.w * S}" height="${o.d * S}" rx="3" fill="${c}" stroke="${INK}" stroke-width="2"/>`;
  }
  // room names and object labels
  for (const r of H.rooms) s += lab(r.label.toUpperCase(), X((r.x0 + r.x1) / 2), Y(r.z1) - 10, r.col, "middle", 15);
  s += lab("HUB", X(0), Y(-R) + 26, "#d8c08a", "middle", 15) + lab("BALCONY", X(0), Y(BO + BR) + 22, "#d8b890", "middle", 14);
  const place = {
    mapTable: [0, 0, "middle", 5], crystalBall: [-3.6, 2.6, "middle", -16], circle: [-1.8, 4.3, "end", 5], decks: [0, 10.0, "middle", 26],
    mirror: [12.3, -3.4, "end", 5, -0.5], wardrobe: [17.0, -4.4, "middle", -20], cloak: [21.7, -3.6, "start", 5, 0.5], shoes: [21.6, -0.6, "start", 5, 0.8],
    hats: [17.0, -1.6, "middle", 34], bags: [19.0, 9.0, "start", 5, 0.8], invites: [14.2, 9.2, "end", 5, -0.9],
    bed: [17.6, -16.0, "middle", -34], telephone: [21.0, -15.0, "start", 5, 0.8], broomStand: [-13.6, 1.0, "start", -14, 0.2], pegboard: [-20.2, 4.2, "end", 5, -0.5],
    recordShelf: [-16.0, -9.6, "middle", -16], cauldron: [0, -16.4, "middle", -22],
    book: [7.5, -11.0, "middle", 26], specimens: [7.5, -13.6, "middle", -12], telescope: [-10.8, -17.0, "middle", -20], cardTable: [-16.0, 20.0, "middle", -24], teaTable: [-17.6, 13.0, "middle", -22],
  };
  for (const o of H.objects) { const p = place[o.id]; if (!p) continue; s += lab(o.label, X(p[0] + (p[4] || 0)), Y(p[1]) + p[3], o.id === "mapTable" ? "#fff" : COL[o.kind], p[2], 14); }
  // the way in
  s += `<defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#fff"/></marker></defs>`;
  s += `<path d="M ${X(-6.5)} ${Y(BO + 8)} Q ${X(-4.5)} ${Y(BO + 4)} ${X(-1.8)} ${Y(BO + 1.6)}" fill="none" stroke="#fff" stroke-width="3" marker-end="url(#ar)"/>` + lab("fly in onto the balcony", X(-6.5), Y(BO + 8.8), "#fff");
  s += `<path d="M ${X(2.4)} ${Y(BO + 1.6)} Q ${X(4.6)} ${Y(BO + 4)} ${X(6.5)} ${Y(BO + 8)}" fill="none" stroke="#fff" stroke-width="3" marker-end="url(#ar)"/>` + lab("walk off the rim to fly", X(6.5), Y(BO + 8.8), "#fff");
  const legend = [["works", "works (E uses it)"], ["now", "as today"], ["bed", "the bed: E ends the night"], ["soon", "placeholder (soon)"]].map(([k, t], i) => `<rect x="${W - 320}" y="${Hh - 170 + i * 26}" width="18" height="14" rx="3" fill="${COL[k]}"/><text x="${W - 294}" y="${Hh - 158 + i * 26}" fill="#eee" font-size="15">${t}</text>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" font-family="system-ui"><rect width="100%" height="100%" fill="${INK}"/>
<text x="30" y="40" fill="#f0dca0" font-size="24" font-weight="700">The treehouse as placeholder rooms and corridors (mock), from above</text>
<text x="30" y="66" fill="#bbb" font-size="15">Today's hub and balcony stay as they are; each sub-area is a room of its own, off the hub on a corridor along one of the Ent's branches.</text>
<text x="30" y="88" fill="#bbb" font-size="15">Walk up to an object (it lights), E uses it. The dressing room lies between the bedroom and the hub, as treehouse.md has it.</text>
${s}${legend}<line x1="40" y1="${Hh - 40}" x2="${40 + 5 * S}" y2="${Hh - 40}" stroke="#fff" stroke-width="3"/><text x="${40 + 2.5 * S}" y="${Hh - 50}" fill="#fff" font-size="14" text-anchor="middle">5 m</text>
<text x="${W - 60}" y="60" fill="#fff" font-size="16" text-anchor="middle">N</text><path d="M ${W - 60} 70 L ${W - 60} 110" stroke="#fff" stroke-width="2" marker-start="url(#ar)"/><text x="${W - 60}" y="128" fill="#fff" fill-opacity=".6" font-size="12" text-anchor="middle">camera ↓</text></svg>`;
}

// ---- the view at the game camera's angle: looking north and down, front (south) walls cut away ----
function view() {
  const S = 24, W = 1600, Hh = 1120, P = 52 * Math.PI / 180, cx = 740, cy = 610, WH = 2.6;
  const pr = (x, y, z) => [cx + x * S, cy + (z * Math.sin(P) - y * Math.cos(P)) * S];
  const poly = (pts, fill, stroke = "none", sw = 0, op = 1) => `<polygon points="${pts.map(p => pr(...p).join(",")).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" fill-opacity="${op}"/>`;
  const parts = []; // [depth (z of its back), svg]
  const wallQuad = (x0, z0, x1, z1, shade) => poly([[x0, 0, z0], [x1, 0, z1], [x1, WH, z1], [x0, WH, z0]], shade, WALL, 1.5);
  // corridors: floors and their two side walls (the near one low, cut away)
  for (const c of H.corridors) { const [a, b] = c.pts, hw = H.w / 2, horiz = Math.abs(a[1] - b[1]) < 1e-6, x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), z0 = Math.min(a[1], b[1]), z1 = Math.max(a[1], b[1]);
    const fl = horiz ? [[x0, 0, a[1] - hw], [x1, 0, a[1] - hw], [x1, 0, a[1] + hw], [x0, 0, a[1] + hw]] : [[a[0] - hw, 0, z0], [a[0] + hw, 0, z0], [a[0] + hw, 0, z1], [a[0] - hw, 0, z1]];
    let g = poly(fl, CORR, WALL, 1);
    g += horiz ? wallQuad(x0, a[1] - hw, x1, a[1] - hw, "#5a3c26") : wallQuad(a[0] - hw, z0, a[0] - hw, z1, "#4c321f") + wallQuad(a[0] + hw, z0, a[0] + hw, z1, "#4c321f");
    parts.push([horiz ? a[1] - hw : z0, g]); }
  // rooms: floor, back wall and side walls
  for (const r of H.rooms) { let g = poly([[r.x0, 0, r.z0], [r.x1, 0, r.z0], [r.x1, 0, r.z1], [r.x0, 0, r.z1]], FLOOR, WALL, 2) + poly([[r.x0, 0, r.z0], [r.x1, 0, r.z0], [r.x1, 0, r.z1], [r.x0, 0, r.z1]], r.col, "none", 0, .12);
    g += wallQuad(r.x0, r.z0, r.x0, r.z1, "#4c321f") + wallQuad(r.x1, r.z0, r.x1, r.z1, "#4c321f") + wallQuad(r.x0, r.z0, r.x1, r.z0, "#5a3c26");
    parts.push([r.z0, g]); }
  // the hub: its floor, its back wall round (the front cut away), the pool; and the balcony
  { const R = H.hub.r, n = 64, fl = [], wall = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; fl.push([Math.cos(a) * R, 0, Math.sin(a) * R]); }
    let g = poly(fl, FLOOR, WALL, 2); const pool = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; pool.push([Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6]); } g += poly(pool, "#2b5c7f");
    for (let i = 0; i < n; i++) { const a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2; if (Math.sin(am) > -0.35) continue; g += wallQuad(Math.cos(a0) * R, Math.sin(a0) * R, Math.cos(a1) * R, Math.sin(a1) * R, "#5a3c26"); }
    parts.push([-R, g]);
    const BO = H.balcony.out, BR = H.balcony.r, bal = []; for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI; bal.push([Math.cos(a) * BR, 0, BO + Math.sin(a) * BR]); }
    parts.push([BO, poly(bal, "#6b4a2e", "#c49a6c", 2)]); }
  // objects: boxes (front and top faces), round ones as short cylinders, areas as patches
  for (const o of H.objects) { const c = COL[o.kind]; let g = "";
    if (o.round) { const n = 28, top = [], bot = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; top.push([o.x + Math.cos(a) * o.round, o.h, o.z + Math.sin(a) * o.round]); bot.push([o.x + Math.cos(a) * o.round, 0, o.z + Math.sin(a) * o.round]); }
      g += o.id === "circle" ? poly(bot, "#3b1e1e", "#c03a3a", 2) : poly(bot, "#000", "none", 0, .25) + poly([[o.x - o.round, 0, o.z], [o.x + o.round, 0, o.z], [o.x + o.round, o.h, o.z], [o.x - o.round, o.h, o.z]], c, INK, 1.5) + poly(top, c, INK, 1.5, .9); }
    else if (o.area) { const n = 24, e = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; e.push([o.x + Math.cos(a) * o.area[0] / 2, 0, o.z + Math.sin(a) * o.area[1] / 2]); } g += poly(e, c, c, 2, .22);
      for (const hx of [-.9, 0, .9]) { const [px, py] = pr(o.x + hx, 0, o.z); g += `<path d="M ${px - 8} ${py} L ${px + 8} ${py} L ${px + 2} ${py - 16} Z" fill="#3b2a5e" stroke="${c}" stroke-width="2"/><line x1="${px - 11}" y1="${py}" x2="${px + 11}" y2="${py}" stroke="${c}" stroke-width="3"/>`; } }
    else { const x0 = o.x - o.w / 2, x1 = o.x + o.w / 2, z0 = o.z - o.d / 2, z1 = o.z + o.d / 2;
      g += poly([[x0, 0, z1], [x1, 0, z1], [x1, o.h, z1], [x0, o.h, z1]], c, INK, 1.5) + poly([[x0, o.h, z0], [x1, o.h, z0], [x1, o.h, z1], [x0, o.h, z1]], c, INK, 1.5, .75); }
    parts.push([o.z + 0.01, g]); }
  parts.sort((a, b) => a[0] - b[0]);
  let s = parts.map(p => p[1]).join("");
  // her, in the dressing room, at the wardrobe
  { const [px, py] = pr(16.4, 0, -2.6); s += `<ellipse cx="${px}" cy="${py}" rx="12" ry="5" fill="#000" opacity=".35"/><rect x="${px - 6}" y="${py - 34}" width="12" height="30" rx="5" fill="#d86fb0"/><path d="M ${px - 16} ${py - 32} L ${px + 16} ${py - 32} L ${px + 3} ${py - 62} Z" fill="#2a1f3d" stroke="#ffcf6a" stroke-width="2"/>`;
    s += `<ellipse cx="${pr(16.7, 0, -4.4)[0]}" cy="${pr(16.7, 1.1, -4.4)[1]}" rx="52" ry="40" fill="${COL.works}" opacity=".18"/>`; }
  // labels last, over everything
  for (const r of H.rooms) { const [x, y] = pr((r.x0 + r.x1) / 2, 0, r.z1); s += lab(r.label.toUpperCase(), x, y - 8, r.col, "middle", 15); }
  { const [x, y] = pr(0, 0, -H.hub.r + 1.6); s += lab("HUB", x, y, "#d8c08a", "middle", 15); }
  for (const o of H.objects) { const top = o.area ? 0.9 : o.round ? o.h : o.h; const [x, y] = pr(o.x, top, o.z); s += lab(o.label.split(" · ")[0], x, y - 10, o.id === "mapTable" ? "#fff" : COL[o.kind], "middle", 13); }
  { const [x, y] = pr(16.4, 2.7, -2.6); s += lab("E: wardrobe", x, y - 6, "#fff", "middle", 13); }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" font-family="system-ui"><rect width="100%" height="100%" fill="#0e1018"/>
<text x="30" y="40" fill="#f0dca0" font-size="24" font-weight="700">The treehouse rooms at the game camera's angle (mock drawing)</text>
<text x="30" y="66" fill="#bbb" font-size="15">Looking north, front walls cut away as the game draws indoors. She stands at the wardrobe: it lights, and E opens the creator at its choices.</text>${s}</svg>`;
}

(async () => { const b = await pw.chromium.launch(), p = await b.newPage({ viewport: { width: 1600, height: 1100 } });
  for (const [svg, out] of [[plan(), planOut], [view(), viewOut]]) { await p.setContent(`<body style="margin:0">${svg}</body>`); const el = await p.$("svg"); await el.screenshot({ path: out }); }
  await b.close(); })();
