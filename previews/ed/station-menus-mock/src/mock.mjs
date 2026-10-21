// The station-menus storyboard (mock only): real game frames (bg/), the proposed panel drawn over them in HTML, a caption under each.
//   node mock.mjs <outdir>
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const HERE = dirname(fileURLToPath(import.meta.url)), OUT = resolve(process.argv[2] || "out"); mkdirSync(OUT, { recursive: true });
const f = p => pathToFileURL(resolve(HERE, p)).href, FONTS = "/home/user/witch/making-of/assets/fonts";
const crop = id => f(`crops/${id}.png`);

// ---- what each station holds in a first game (owned), and what's still to find (locked, with its hint); colours are never locked ----
const L = (img, name, hint) => ({ img, name, locked: true, hint });
const O = (img, name, extra = {}) => ({ img, name, ...extra });
// The colour grids, 5 rows (Ed, 2026-10-21): clothes and hair 13 columns (12 hues and a grey), skin 6 (five undertones and a fantasy one).
const hsv = (h, s, v) => { const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s); const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6]; return `rgb(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0})`; };
const ROWS = [[1, .3], [1, .62], [1, 1], [.5, 1], [.18, 1]]; // (dark, deep, pure, light, pale: from today's 9-row grid)
const CLOTH = ROWS.map(([sat, v], r) => [...Array(12)].map((_, c) => hsv(c / 12, sat, v)).concat(hsv(0, 0, .1 + .2 * r)));
const SKINS = [[.96, .2], [.84, .3], [.68, .4], [.5, .48], [.34, .52]].map(([v, sat]) => [.03, .05, .07, .09, .11].map(h => hsv(h, sat, v)).concat(hsv(.75, sat * .8, v)));
const G = (grid, sel, parts) => ({ grid, sel, parts });
const ST = {
  wardrobe: { icon: "🧥", name: "Wardrobe", found: "5 of 11", shelves: [
    { label: "Jacket", colour: G(CLOTH, [9, 2]), items: [O("top-jacket", "Velvet jacket", { worn: true, note: "Hers from the start." }), O("top-poncho", "Poncho", { note: "Hers from the start." }), O("top-sequins", "Sequin jacket", { note: "A gift from a party witch on Fox island." }), L("top-cape", "Cape", "A party witch on Wolf island wears one. Win a night there and she may give it to you."), L("top-mesh", "Mesh top", "Somewhere on an island to the south.")] },
    { label: "Top", colour: G(CLOTH, [12, 4]), items: [O("top-0", "Tee", { worn: true }), L("top-1", "Nightie", "A party witch on Owl island sleeps in one."), L("top-2", "Vest", "Somewhere on an island to the east.")] },
    { label: "Trousers", colour: G(CLOTH, [7, 1]), items: [O("jeans-0", "Jeans", { worn: true }), L("jeans-2", "Cords", "A party witch on Boar island wears them."), L("jeans-3", "Skirt", "Somewhere on an island to the north.")] },
  ] },
  mirror: { icon: "🪞", name: "Dressing table", found: "4 of 6", shelves: [
    { label: "Hair", colour: G(CLOTH, [11, 2]), items: [O("hair-long", "Long", { worn: true }), O("hair-bob", "Bob"), O("hair-buns", "Buns"), L("hair-mohawk", "Mohawk", "A party witch on Bat island wears one.")] },
    { label: "Skin", always: true, colour: G(SKINS, [1, 0]), items: [] },
    { label: "Earrings", items: [O("hair-long", "None", { worn: true, none: true }), O("earrings", "Silver hoops"), L("earrings", "Moon drops", "Somewhere on an island to the west.")] },
  ] },
  cloak: { icon: "🧣", name: "Cloak pegs", found: "4 of 7", shelves: [
    { label: "Cloak", colour: G(CLOTH, [8, 0]), items: [O("cloak-none", "None", { worn: true, none: true }), O("cloak-short", "Short cloak"), L("cloak-long", "Long cloak", "A party witch on Elk island wears one."), L("cloak-hooded", "Hooded cloak", "Somewhere on an island to the north.")] },
    { label: "Scarf", colour: G(CLOTH, [0, 2]), items: [O("cloak-none", "None", { worn: true, none: true }), O("scarf", "Scarf"), L("cloak-long-scarf", "Long scarf", "A party witch on Hare island wears one.")] },
  ] },
  shoes: { icon: "👟", name: "Shoe rack", found: "1 of 3", shelves: [
    { label: "Shoes", colour: G(CLOTH, [12, 4]), items: [O("shoes-plain", "Trainers", { worn: true }), L("shoes-chunky", "Chunky trainers", "A party witch on Fox island wears them."), L("shoes-plain", "Boots", "Somewhere on an island to the north.")] },
  ] },
  bags: { icon: "👜", name: "Bags", found: "2 of 4", shelves: [
    { label: "Bag", colour: G(CLOTH, [1, 1]), items: [O("cloak-none", "None", { worn: true, none: true }), O("satchel", "Satchel"), L("bumbag", "Bum bag", "At a shrine on an island to the east."), L("backpack", "Backpack", "At a shrine on an island to the south.")] },
  ] },
  broom: { icon: "🧹", name: "Broom stand", found: "2 of 6", shelves: [
    { label: "Broom", colour: G(CLOTH, [1, 1], ["handle", "bristles"]), items: [O("broom-classic", "Classic", { worn: true }), O("broom-fan", "Fan"), L("broom-twig", "Twig", "Built in the garage from parts."), L("broom-round", "Round"), L("broom-hobbyhorse", "Hobby horse"), L("broom-jetbike", "Jet bike")] },
    { label: "Fit", fit: [["Length", .5], ["Bend", .2], ["Thickness", .45]] },
  ] },
};

// ---- the panel ----
// at: [shelf, item] (a card in focus) or [shelf, "c", col, row] (a swatch in its colour grid); cur: the mouse is the pointer there.
const CUR = `<svg class="cur" viewBox="0 0 16 22" width="20" height="26"><path d="M1 1 L1 18 L5 14 L8 21 L11 20 L8 13 L14 13 Z" fill="#fff" stroke="#000" stroke-width="1.4"/></svg>`;
function card(it, focus, cur) {
  const cls = ["card", it.locked && "locked", it.worn && "worn", focus && "focus"].filter(Boolean).join(" ");
  const art = it.none ? `<i class="none">∅</i>` : `<img src="${crop(it.img)}">`;
  return `<div class="${cls}">${art}${it.worn ? `<b class="tick">✓</b>` : ""}${it.locked ? `<b class="lock">🔒</b>` : ""}${focus && cur ? CUR : ""}</div>`;
}
function grid(g, at, si, cur, whose) {
  const inG = at && at[0] === si && at[1] === "c";
  return `<div class="cgrid">${g.parts ? `<div class="parts">${g.parts.map((p, i) => `<span class="${i ? "" : "on"}">${p}</span>`).join("")}</div>` : `<div class="clab">Colour · ${whose}</div>`}
    <div class="sws" style="grid-template-columns:repeat(${g.grid[0].length},22px)">${g.grid.map((row, r) => row.map((c, k) => `<i class="${g.sel[0] === k && g.sel[1] === r ? "sel" : ""} ${inG && at[2] === k && at[3] === r ? "focus" : ""}" style="background:${c}">${inG && at[2] === k && at[3] === r && cur ? CUR : ""}</i>`).join("")).join("")}</div></div>`;
}
function shelf(s, si, at, cur, open) {
  const on = at && at[0] === si;
  if (s.fit) return `<div class="shelf ${on ? "on" : ""}"><div class="lab">${s.label}<span> · how it's worn</span></div>${s.fit.map(([n, v], i) => `<div class="fit ${on && at[1] === i ? "focus" : ""}"><span>${n}</span><div class="bar"><i style="left:${v * 100}%"></i></div></div>`).join("")}</div>`;
  const worn = s.items.find(i => i.worn);
  const showGrid = s.colour && (open ?? on);
  return `<div class="shelf ${on ? "on" : ""}"><div class="lab">${s.label}<span>${worn ? " · " + worn.name : ""}</span>${s.always ? `<em>every colour, always</em>` : ""}</div>${s.items.length ? `<div class="row">${s.items.map((it, i) => card(it, on && at[1] === i, cur)).join("")}</div>` : ""}${showGrid ? grid(s.colour, at, si, cur, worn ? worn.name.toLowerCase() : s.label.toLowerCase()) : ""}</div>`;
}
function detail(st, at) {
  const s = st.shelves[at[0]]; if (s.fit) return `<div class="detail"><h3>${s.fit[at[1]][0]}</h3><p>◀ ▶ to change it. Kept with the broom.</p></div>`;
  if (at[1] === "c") return `<div class="detail"><h3>Colour</h3><p>Every colour is hers from the start. 5 rows: dark to pale; ${s.colour.grid[0].length} columns.</p></div>`;
  const it = s.items[at[1]];
  if (it.locked) return `<div class="detail lockd"><h3>🔒 ${it.name}</h3><p>${it.hint || "Not found yet."}</p></div>`;
  return `<div class="detail"><h3>${it.name}${it.worn ? ` <small>wearing</small>` : ""}</h3><p>${it.note || "Yours."}</p></div>`;
}
const KEYS = `<span class="k">🖱</span> click <span class="k">← ↑ → ↓</span> or <span class="k pad">✥</span> move · walk away to close`;
const PADK = `<span class="k pad">✥</span> move · puts it on <span class="k pad">L</span> walk away to close`;
function panel(id, { at = [0, 0], x = 0, pad = false, banner = "", foot = "", shelves, cur = false, grids } = {}) {
  const st = { ...ST[id] }; if (shelves) st.shelves = shelves.map(i => ST[id].shelves[i]);
  return `<div class="panel" style="transform:translateX(${x}%)">
    ${banner ? `<div class="banner">${banner}</div>` : ""}
    <div class="head"><span class="ic">${st.icon}</span><b>${st.name}</b><span class="cnt">${st.found} found</span></div>
    ${st.shelves.map((s, i) => shelf(s, i, at, cur, grids ? grids.includes(i) : undefined)).join("")}
    ${detail(st, at)}
    <div class="foot">${foot || (pad ? PADK : KEYS)}</div>
  </div>`;
}
const chip = (x, y, text) => `<div class="chip" style="left:${x}px;top:${y}px">${text}</div>`;
const bg = name => `<img class="bg" src="${f(`bg/${name}.png`)}">`;

const CSS = `
@font-face { font-family: Tiny5; src: url(${pathToFileURL(FONTS + "/Tiny5.woff2").href}); }
:root { --ink: #e8e2f4; --dim: #9a93b4; --panel: rgba(14, 11, 28, .86); --accent: #e8b46a; --accent-dim: rgba(232, 180, 106, .45); }
* { box-sizing: border-box; }
body { margin: 0; width: 1280px; background: #0b0a16; color: var(--ink); font: 14px/1.4 ui-monospace, Menlo, Consolas, monospace; }
.frame { position: relative; width: 1280px; height: 720px; overflow: hidden; }
.bg { position: absolute; inset: 0; width: 1280px; height: 720px; image-rendering: pixelated; }
.cap { height: 96px; padding: 14px 22px; background: #15122a; border-top: 2px solid var(--accent-dim); }
.cap b { font-family: Tiny5; font-size: 22px; color: var(--accent); letter-spacing: 1px; margin-right: 10px; }
.cap span { color: var(--ink); font-size: 15px; }
.cap p { margin: 4px 0 0; color: var(--dim); font-size: 13px; }
.panel { position: absolute; left: 0; top: 16px; bottom: 16px; width: 404px; padding: 14px 16px 12px; background: var(--panel); border: 1px solid var(--accent-dim); border-left: 0; border-radius: 0 12px 12px 0; box-shadow: 6px 0 24px rgba(0,0,0,.5); display: flex; flex-direction: column; gap: 10px; }
.banner { margin: -14px -16px 0; padding: 8px 16px; background: linear-gradient(90deg, rgba(232,180,106,.28), rgba(232,180,106,.05)); border-bottom: 1px solid var(--accent-dim); font-size: 13px; color: var(--accent); border-radius: 0 12px 0 0; }
.head { display: flex; align-items: baseline; gap: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(232,226,244,.12); }
.head .ic { font-size: 20px; } .head b { font-family: Tiny5; font-size: 26px; font-weight: normal; color: var(--accent); letter-spacing: 1px; } .head .cnt { margin-left: auto; color: var(--dim); font-size: 12px; }
.shelf { opacity: .62; } .shelf.on { opacity: 1; }
.lab { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--dim); margin-bottom: 5px; display: flex; gap: 4px; align-items: baseline; }
.shelf.on .lab { color: var(--ink); } .lab span { text-transform: none; letter-spacing: 0; color: var(--dim); }
.lab em { margin-left: auto; font-style: normal; text-transform: none; letter-spacing: 0; font-size: 11px; color: var(--accent-dim); }
.row { display: flex; gap: 7px; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, #000 88%, transparent); }
.card { position: relative; width: 66px; height: 66px; flex: none; border-radius: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(232,226,244,.14); display: grid; place-items: center; overflow: hidden; }
.card img { max-width: 60px; max-height: 60px; image-rendering: pixelated; }
.card .sw { width: 34px; height: 34px; border-radius: 50%; border: 2px solid rgba(0,0,0,.4); }
.card .none { font-style: normal; font-size: 24px; color: var(--dim); }
.card.locked { background: rgba(0,0,0,.35); border-style: dashed; } .card.locked img { filter: brightness(0) invert(.18); opacity: .9; }
.card.worn { background: rgba(232,180,106,.12); }
.card.focus { border: 2px solid var(--accent); box-shadow: 0 0 0 3px rgba(232,180,106,.25), 0 0 14px rgba(232,180,106,.45); transform: translateY(-2px); }
.tick { position: absolute; top: 2px; right: 3px; width: 15px; height: 15px; border-radius: 50%; background: var(--accent); color: #1a1430; font-size: 10px; display: grid; place-items: center; }
.lock { position: absolute; bottom: 1px; right: 2px; font-size: 11px; font-weight: normal; }
.fit { display: flex; align-items: center; gap: 10px; margin: 6px 0; padding: 4px 6px; border-radius: 6px; border: 1px solid transparent; }
.fit.focus { border-color: var(--accent); box-shadow: 0 0 10px rgba(232,180,106,.35); }
.fit span { width: 82px; font-size: 12px; } .bar { position: relative; flex: 1; height: 6px; background: rgba(255,255,255,.14); border-radius: 3px; }
.bar i { position: absolute; top: -5px; width: 12px; height: 16px; margin-left: -6px; border-radius: 3px; background: var(--accent); }
.detail { margin-top: auto; padding: 10px 12px; border-radius: 8px; background: rgba(255,255,255,.05); border: 1px solid rgba(232,226,244,.1); min-height: 76px; }
.detail h3 { margin: 0 0 3px; font-size: 15px; font-weight: 600; } .detail h3 small { font-weight: normal; font-size: 11px; color: #1a1430; background: var(--accent); border-radius: 4px; padding: 1px 5px; margin-left: 6px; vertical-align: 2px; }
.detail p { margin: 0; color: var(--dim); font-size: 13px; } .detail.lockd { border-style: dashed; } .detail.lockd h3 { color: var(--dim); }
.foot { font-size: 11px; color: var(--dim); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.k { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 4px; background: rgba(255,255,255,.12); border: 1px solid rgba(232,226,244,.35); border-bottom-width: 2px; color: var(--ink); font-size: 11px; }
.k.pad { border-radius: 50%; min-width: 22px; height: 22px; background: rgba(232,180,106,.15); border-color: var(--accent-dim); }
.peek { position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 34px; padding: 10px 0; background: var(--panel); border: 1px solid var(--accent-dim); border-left: 0; border-radius: 0 10px 10px 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.peek i { writing-mode: vertical-rl; font-style: normal; font-family: Tiny5; color: var(--accent); font-size: 15px; letter-spacing: 2px; }
.prompt { position: absolute; transform: translateX(-50%); padding: 5px 10px; border-radius: 6px; background: var(--panel); border: 1px solid var(--accent); font-size: 13px; white-space: nowrap; display: flex; gap: 6px; align-items: center; box-shadow: 0 0 14px rgba(232,180,106,.35); }
.chip { position: absolute; padding: 4px 9px; border-radius: 12px; border: 1px dashed rgba(255,255,255,.55); color: #fff; font-size: 12px; background: rgba(0,0,0,.35); }
.chip::before { content: "mock note · "; color: var(--accent); }
.motion { position: absolute; left: 0; top: 16px; bottom: 16px; width: 404px; background: linear-gradient(90deg, rgba(232,180,106,0), rgba(232,180,106,.08)); }
.zoomin { position: absolute; border: 2px dashed rgba(232,180,106,.7); border-radius: 4px; }
.cgrid { margin-top: 8px; } .clab { font-size: 11px; color: var(--dim); margin-bottom: 4px; }
.parts { display: flex; gap: 6px; margin-bottom: 5px; } .parts span { font-size: 11px; padding: 1px 8px; border-radius: 10px; border: 1px solid rgba(232,226,244,.3); color: var(--dim); } .parts span.on { border-color: var(--accent); color: var(--ink); }
.sws { display: grid; gap: 3px; grid-auto-rows: 16px; } .sws i { position: relative; border-radius: 3px; border: 1px solid rgba(0,0,0,.45); }
.sws i.sel { outline: 2px solid var(--accent); outline-offset: 1px; z-index: 1; } .sws i.focus { outline: 2px solid #fff; outline-offset: 2px; z-index: 2; box-shadow: 0 0 10px rgba(255,255,255,.6); }
.cur { position: absolute; left: 60%; top: 55%; z-index: 5; filter: drop-shadow(1px 2px 1px rgba(0,0,0,.6)); }
.sheet { display: flex; gap: 18px; padding: 18px; background: #0b0a16; width: max-content; }
.sheet .slot { position: relative; width: 404px; height: 720px; }
.sheet .slot .panel { top: 0; bottom: 0; }
.sheet h2 { font-family: Tiny5; color: var(--accent); font-weight: normal; margin: 0 0 8px; }
.objcard { width: 404px; height: 720px; padding: 16px; border: 1px dashed var(--accent-dim); border-radius: 12px; color: var(--dim); font-size: 13px; }
.objcard b { font-family: Tiny5; color: var(--accent); font-size: 26px; font-weight: normal; display: block; margin-bottom: 10px; }
`;

const frame = (inner, n, title, note) => `<div class="frame">${inner}</div><div class="cap"><b>${n}</b><span>${title}</span><p>${note}</p></div>`;
const FRAMES = [
  ["1-walking-up", frame(bg("wardrobe-walkup"), "1", "Walking up", "She walks into the dressing room as usual, and each station's name shows over it as she nears it. Nothing is open yet: the panel waits until she's within reach of a station."), 816],
  ["2-near-panel-in", frame(bg("wardrobe-at") + `<div class="motion"></div>` + panel("wardrobe", { x: -18, at: [0, 0], grids: [] }) + chip(860, 40, "camera stays in the house view for now"), "2", "Near the wardrobe, the panel slides in", "Within reach (1.2 m of its edge), the wardrobe's panel slides in from the left by itself, as #996 does now. No key and no prompt. She keeps walking on WASD or the left stick, so passing a station costs nothing. Whatever she's wearing is already lit."), 816],
  ["3-choosing-camera-in", frame(bg("wardrobe-zoom-back") + panel("wardrobe", { at: [0, 1], cur: true, grids: [] }) + chip(860, 40, "camera eases in once she's choosing: the pointer or d-pad in the panel, or ~0.4 s stood still"), "3", "Choosing: the camera eases to her", "She stops at the wardrobe and the pointer goes over a card. Once she's choosing, the camera eases in on her (about 0.5 s), framed to the right of the panel. Hovering only highlights a card and shows its name below; a click puts it on. (When the camera eases in is Q2 in NOTES.md.)"), 816],
  ["4-browsing-locked", frame(bg("wardrobe-zoom-back") + panel("wardrobe", { at: [0, 3], grids: [] }), "4", "Browsing with the d-pad or arrows (a locked item)", "The d-pad (or the arrow keys) moves the focus along a shelf and up and down between shelves. ✓ marks what she's wearing. A locked item is a dark silhouette, and the box below says where it's found: who wears it, or which way it lies. A locked item can't be put on."), 816],
  ["5-change-applied", frame(bg("wardrobe-zoom-sequins") + panel("wardrobe", { at: [0, 2], cur: true }).replace(`<b class="tick">✓</b></div><div class="card"><img src="${crop("top-poncho")}"`, `</div><div class="card"><img src="${crop("top-poncho")}"`).replace(`<div class="card focus"><img src="${crop("top-sequins")}">`, `<div class="card worn focus"><img src="${crop("top-sequins")}"><b class="tick">✓</b>`).replace(">Sequin jacket</h3>", ">Sequin jacket <small>wearing</small></h3>").replace("<span> · Velvet jacket</span>", "<span> · Sequin jacket</span>").replace("Colour · velvet jacket", "Colour · sequin jacket") + chip(860, 40, "she turns to the camera for a beat, then back"), "5", "A change, and her turning; the item's colours open under it", "A click on the sequin jacket puts it on her at once (taken in the game). She turns to the camera for a moment to show it off. The jacket's own colour grid opens under its shelf: 5 rows (dark, deep, pure, light, pale) by 13 columns (12 hues and a grey), every colour hers from the start."), 816],
  ["6-sub-parts-colour", frame(bg("wardrobe-zoom-sequins") + panel("wardrobe", { at: [2, "c", 7, 2] }), "6", "Sub-parts, and a colour picked with the d-pad", "The wardrobe's jacket, top and trousers are three shelves in one panel, with no tabs. Here the d-pad has moved down to Trousers and on into the jeans' colour grid: it walks the grid swatch by swatch, and each swatch it lands on goes on her at once. Pressing up from the grid's top row goes back to the cards."), 816],
  ["7-walking-away", frame(bg("wardrobe-walkup") + panel("wardrobe", { x: -80, at: [2, 0], grids: [] }) + chip(860, 40, "camera eases back out as soon as she moves; the panel slides away past reach + 0.8 m"), "7", "Walking away", "She walks off on WASD or the left stick, as she could at any moment. The camera eases back to the house view as soon as she moves, and the panel slides away once she's 0.8 m past its reach (#996's slack, so it doesn't flicker at the edge). What she has on is what she keeps; there's no confirm button."), 816],
  ["8-pad", frame(bg("broom-zoom-front") + panel("broom", { at: [0, "c", 4, 1], pad: true, grids: [0] }) + chip(860, 40, "pad: d-pad moves through the panel, the left stick still walks her"), "8", "On a pad: the broom stand", "The d-pad moves through the panel and the left stick walks her, so a pad player can choose and leave without changing hands. An item with two coloured parts (the broom's handle and bristles) has a chip for each above its grid; the shoulder buttons switch parts. The Fit shelf holds the sliders that aren't items (length, bend, thickness; NOTES.md, Q5)."), 816],
  ["9-wake-mirror", frame(bg("table-zoom-front") + panel("mirror", { at: [1, "c", 2, 1], banner: "First night · pick your look, then walk to the curtains", grids: [0, 1], shelves: [0, 1] }) + chip(860, 40, "first game only: she gets up beside the dressing table, so it opens"), "9", "The first game's mirror, in the wake-up", "In a first game she gets out of bed beside the dressing table, so its panel slides in, with a banner, and the camera eases in. Hair has its 13-column grid and skin a 6-column one (five undertones and a fantasy lilac), 5 rows each, all open. She walks off to the curtains when ready."), 816],
];

const page = body => `<!doctype html><meta charset="utf-8"><style>${CSS}</style><body>${body}</body>`;
const browser = await playwright.chromium.launch();
const p = await browser.newPage({ viewport: { width: 1280, height: 816 } });
for (const [name, body, h] of FRAMES) {
  const file = resolve(OUT, name + ".html"); writeFileSync(file, page(body));
  await p.setViewportSize({ width: 1280, height: h }); await p.goto(pathToFileURL(file).href); await p.waitForTimeout(150);
  await p.screenshot({ path: resolve(OUT, name + ".png") }); console.log(name);
}
// The contents: each station's panel in a first game, side by side; and the hats' floor, which stays objects.
const order = [["mirror", [2, 2]], ["wardrobe", [0, 0]], ["cloak", [0, 2]], ["shoes", [0, 1]], ["bags", [0, 2]], ["broom", [0, 2]]];
const hats = `<div class="slot"><h2>Hats' floor</h2><div class="objcard"><b>Stays objects</b>Hats lie on the floor as game objects, and E picks one up or puts hers down, as now. A hat is a thing with a power (hats are found at shrines, unlocks.md), so it stays something she carries rather than a choice on a panel.<br><br>First game: her own hat only.<br><br>Its shape and colour: the hat station's grimoire (treehouse.md), or a "Hat" shelf on the mirror's panel for the one she's wearing (NOTES.md, Q4).</div></div>`;
const sheet = `<div class="sheet">${order.map(([id, at]) => `<div><h2>${ST[id].name}</h2><div class="slot">${panel(id, { at, grids: [0, 1] })}</div></div>`).join("")}<div>${hats}</div></div>`;
const file = resolve(OUT, "contents.html"); writeFileSync(file, page(sheet));
await p.setViewportSize({ width: 7 * 422 + 18, height: 800 }); await p.goto(pathToFileURL(file).href); await p.waitForTimeout(150);
await p.screenshot({ path: resolve(OUT, "contents.png"), fullPage: true }); console.log("contents");
await browser.close();
