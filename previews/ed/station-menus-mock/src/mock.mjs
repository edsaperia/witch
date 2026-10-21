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

// ---- what each station holds in a first game (owned), and what's still to find (locked, with its hint) ----
const L = (img, name, hint) => ({ img, name, locked: true, hint });
const O = (img, name, extra = {}) => ({ img, name, ...extra });
const SW = (css, name, extra = {}) => ({ swatch: css, name, ...extra });
const SKIN = [SW("#f3d2bd", "Fair"), SW("#d9a888", "Light"), SW("#a8735a", "Brown"), SW("#6e4636", "Deep")];
const ST = {
  wardrobe: { icon: "🧥", name: "Wardrobe", found: "7 of 13", shelves: [
    { label: "Jacket", items: [O("top-jacket", "Velvet jacket", { worn: true, note: "Hers from the start." }), O("top-poncho", "Poncho", { note: "Hers from the start." }), O("top-sequins", "Sequin jacket", { note: "A gift from a party witch on Fox island." }), L("top-cape", "Cape", "A party witch on Wolf island wears one. Win a night there and she may give it to you."), L("top-mesh", "Mesh top", "Somewhere on an island to the south.")] },
    { label: "Top", items: [O("top-0", "White tee", { worn: true }), O("top-1", "Red tee"), L("top-2", "Teal tee", "A party witch on Owl island wears one."), L("top-3", "Gold tee", "Somewhere on an island to the east.")] },
    { label: "Trousers", items: [O("jeans-0", "Blue jeans", { worn: true }), O("jeans-1", "Black jeans"), L("jeans-2", "Rust cords", "A party witch on Boar island wears them."), L("jeans-3", "Moss jeans", "Somewhere on an island to the north.")] },
  ] },
  mirror: { icon: "🪞", name: "Dressing table", found: "11 of 14", shelves: [
    { label: "Hair", items: [O("hair-long", "Long", { worn: true }), O("hair-bob", "Bob"), O("hair-buns", "Buns"), L("hair-mohawk", "Mohawk", "A party witch on Bat island wears one.")] },
    { label: "Hair colour", always: true, items: [O("hair-long", "Raspberry", { worn: true }), O("hair-0", "Scarlet"), O("hair-1", "Chestnut"), O("hair-2", "Silver"), O("hair-3", "Lilac")] },
    { label: "Skin", always: true, items: SKIN.map((s, i) => i === 0 ? { ...s, worn: true } : s) },
    { label: "Earrings", items: [O("hair-long", "None", { worn: true, none: true }), O("earrings", "Silver hoops"), L("earrings", "Moon drops", "Somewhere on an island to the west.")] },
  ] },
  cloak: { icon: "🧣", name: "Cloak pegs", found: "4 of 8", shelves: [
    { label: "Cloak", items: [O("cloak-none", "None", { worn: true, none: true }), O("cloak-short", "Short cloak"), L("cloak-long", "Long cloak", "A party witch on Elk island wears one."), L("cloak-hooded", "Hooded cloak", "Somewhere on an island to the north.")] },
    { label: "Scarf", items: [O("cloak-none", "None", { worn: true, none: true }), O("scarf", "Striped scarf"), L("cloak-long-scarf", "Long scarf", "A party witch on Hare island wears one."), L("scarf-1", "Teal scarf", "Somewhere on an island to the east.")] },
  ] },
  shoes: { icon: "👟", name: "Shoe rack", found: "1 of 3", shelves: [
    { label: "Shoes", items: [O("shoes-plain", "Trainers", { worn: true }), L("shoes-chunky", "Chunky trainers", "A party witch on Fox island wears them."), L("shoes-plain", "Boots", "Somewhere on an island to the north.")] },
  ] },
  bags: { icon: "👜", name: "Bags", found: "2 of 4", shelves: [
    { label: "Bag", items: [O("cloak-none", "None", { worn: true, none: true }), O("satchel", "Satchel"), L("bumbag", "Bum bag", "At a shrine on an island to the east."), L("backpack", "Backpack", "At a shrine on an island to the south.")] },
  ] },
  broom: { icon: "🧹", name: "Broom stand", found: "2 of 8", shelves: [
    { label: "Broom", items: [O("broom-classic", "Classic", { worn: true }), O("broom-fan", "Fan"), L("broom-twig", "Twig", "Built in the garage from parts."), L("broom-round", "Round"), L("broom-hobbyhorse", "Hobby horse"), L("broom-jetbike", "Jet bike")] },
    { label: "Fit", fit: [["Length", .5], ["Bend", .2], ["Thickness", .45]] },
  ] },
};

// ---- the panel ----
function card(it, focus) {
  const cls = ["card", it.locked && "locked", it.worn && "worn", focus && "focus"].filter(Boolean).join(" ");
  const art = it.swatch ? `<i class="sw" style="background:${it.swatch}"></i>` : it.none ? `<i class="none">∅</i>` : `<img src="${crop(it.img)}">`;
  return `<div class="${cls}">${art}${it.worn ? `<b class="tick">✓</b>` : ""}${it.locked ? `<b class="lock">🔒</b>` : ""}</div>`;
}
function shelf(s, si, at) {
  const on = at && at[0] === si;
  if (s.fit) return `<div class="shelf ${on ? "on" : ""}"><div class="lab">${s.label}<span> · how it's worn</span></div>${s.fit.map(([n, v], i) => `<div class="fit ${on && at[1] === i ? "focus" : ""}"><span>${n}</span><div class="bar"><i style="left:${v * 100}%"></i></div></div>`).join("")}</div>`;
  const worn = s.items.find(i => i.worn);
  return `<div class="shelf ${on ? "on" : ""}"><div class="lab">${s.label}<span> · ${worn ? worn.name : ""}</span>${s.always ? `<em>always all yours</em>` : ""}</div><div class="row">${s.items.map((it, i) => card(it, on && at[1] === i)).join("")}</div></div>`;
}
function detail(st, at) {
  const s = st.shelves[at[0]]; if (s.fit) return `<div class="detail"><h3>${s.fit[at[1]][0]}</h3><p>◀ ▶ to change it. Kept with the broom.</p></div>`;
  const it = s.items[at[1]];
  if (it.locked) return `<div class="detail lockd"><h3>🔒 ${it.name}</h3><p>${it.hint || "Not found yet."}</p></div>`;
  return `<div class="detail"><h3>${it.name}${it.worn ? ` <small>wearing</small>` : ""}</h3><p>${it.note || "Yours."}</p></div>`;
}
const KEYS = `<span class="k">W</span><span class="k">S</span> shelf <span class="k">A</span><span class="k">D</span> item <span class="k">E</span> step out`;
const PADK = `<span class="k pad">✥</span> or <span class="k pad">L</span> browse <span class="k pad">□</span> or <span class="k pad">○</span> step out`;
function panel(id, { at = [0, 0], x = 0, pad = false, banner = "", foot = "", shelves } = {}) {
  const st = { ...ST[id] }; if (shelves) st.shelves = shelves.map(i => ST[id].shelves[i]);
  return `<div class="panel" style="transform:translateX(${x}%)">
    ${banner ? `<div class="banner">${banner}</div>` : ""}
    <div class="head"><span class="ic">${st.icon}</span><b>${st.name}</b><span class="cnt">${st.found} found</span></div>
    ${st.shelves.map((s, i) => shelf(s, i, at)).join("")}
    ${detail(st, at)}
    <div class="foot">${foot || (pad ? PADK : KEYS)}</div>
  </div>`;
}
const peek = id => `<div class="peek"><span>${ST[id].icon}</span><i>${ST[id].name}</i></div>`;
const prompt = (x, y, text, op = 1) => `<div class="prompt" style="left:${x}px;top:${y}px;opacity:${op}"><span class="k">E</span> ${text}</div>`;
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
.foot { font-size: 12px; color: var(--dim); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.k { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 4px; background: rgba(255,255,255,.12); border: 1px solid rgba(232,226,244,.35); border-bottom-width: 2px; color: var(--ink); font-size: 11px; }
.k.pad { border-radius: 50%; min-width: 22px; height: 22px; background: rgba(232,180,106,.15); border-color: var(--accent-dim); }
.peek { position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 34px; padding: 10px 0; background: var(--panel); border: 1px solid var(--accent-dim); border-left: 0; border-radius: 0 10px 10px 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.peek i { writing-mode: vertical-rl; font-style: normal; font-family: Tiny5; color: var(--accent); font-size: 15px; letter-spacing: 2px; }
.prompt { position: absolute; transform: translateX(-50%); padding: 5px 10px; border-radius: 6px; background: var(--panel); border: 1px solid var(--accent); font-size: 13px; white-space: nowrap; display: flex; gap: 6px; align-items: center; box-shadow: 0 0 14px rgba(232,180,106,.35); }
.chip { position: absolute; padding: 4px 9px; border-radius: 12px; border: 1px dashed rgba(255,255,255,.55); color: #fff; font-size: 12px; background: rgba(0,0,0,.35); }
.chip::before { content: "mock note · "; color: var(--accent); }
.motion { position: absolute; left: 0; top: 16px; bottom: 16px; width: 404px; background: linear-gradient(90deg, rgba(232,180,106,0), rgba(232,180,106,.08)); }
.zoomin { position: absolute; border: 2px dashed rgba(232,180,106,.7); border-radius: 4px; }
.sheet { display: flex; gap: 18px; padding: 18px; background: #0b0a16; width: max-content; }
.sheet .slot { position: relative; width: 404px; height: 720px; }
.sheet .slot .panel { top: 0; bottom: 0; }
.sheet h2 { font-family: Tiny5; color: var(--accent); font-weight: normal; margin: 0 0 8px; }
.objcard { width: 404px; height: 720px; padding: 16px; border: 1px dashed var(--accent-dim); border-radius: 12px; color: var(--dim); font-size: 13px; }
.objcard b { font-family: Tiny5; color: var(--accent); font-size: 26px; font-weight: normal; display: block; margin-bottom: 10px; }
`;

const frame = (inner, n, title, note) => `<div class="frame">${inner}</div><div class="cap"><b>${n}</b><span>${title}</span><p>${note}</p></div>`;
const FRAMES = [
  ["1-walking-up", frame(bg("wardrobe-walkup"), "1", "Walking up", "She walks into the dressing room as usual. Each station's name shows over it as she nears it, as it does today. Nothing slides in yet."), 816],
  ["2-prompt", frame(bg("wardrobe-at") + prompt(640, 160, "Step in · Wardrobe") + peek("wardrobe"), "2", "The prompt (walking up only previews)", "Within reach: an \"E Step in\" prompt over the wardrobe, and a slim tab at the left edge saying which station this is. The panel itself waits for E, so walking past stations never covers the game. (Recommended; the alternatives are in NOTES.md, Q1.)"), 816],
  ["3-stepping-in", frame(bg("wardrobe-zoom-back") + `<div class="motion"></div>` + panel("wardrobe", { x: -22, at: [0, 0] }) + chip(860, 40, "camera eases in over ~0.5 s, framing her right of the panel"), "3", "Stepping in: the camera eases to her, the panel slides in", "E steps in. The camera eases in on her (the house view at about two-thirds of its distance) and the wardrobe's panel slides in from the left. She stays at the wardrobe facing it. Movement keys now browse instead of walking."), 816],
  ["4-browsing-locked", frame(bg("wardrobe-zoom-back") + panel("wardrobe", { at: [0, 3] }), "4", "Browsing with the movement keys (a locked item)", "A and D move along a shelf; W and S move between shelves. Each card is something she owns, and ✓ marks what she's wearing. A locked item shows as a dark silhouette with a hint about where it's found. Moving onto a locked item does nothing to her."), 816],
  ["5-change-applied", frame(bg("wardrobe-zoom-sequins") + panel("wardrobe", { at: [0, 2], shelves: [0, 1, 2] }).replace(`<b class="tick">✓</b></div><div class="card"><img src="${crop("top-poncho")}"`, `</div><div class="card"><img src="${crop("top-poncho")}"`).replace(`<div class="card focus"><img src="${crop("top-sequins")}">`, `<div class="card worn focus"><img src="${crop("top-sequins")}"><b class="tick">✓</b>`).replace(">Sequin jacket</h3>", ">Sequin jacket <small>wearing</small></h3>").replace("<span> · Velvet jacket</span>", "<span> · Sequin jacket</span>") + chip(860, 40, "she turns to the camera for a beat, then back"), "5", "A change, and her turning", "Landing on an owned item puts it on her at once (the sequin jacket here, taken in the game). She turns to the camera for a moment to show it off. No confirm button: what she has on when she steps out is what she keeps."), 816],
  ["6-sub-parts", frame(bg("wardrobe-zoom-sequins") + panel("wardrobe", { at: [2, 1] }).replace(`<div class="card worn focus"><img src="${crop("jeans-0")}">`, `<div class="card worn"><img src="${crop("jeans-0")}">`), "6", "A station with sub-parts: jacket, top, trousers", "The wardrobe's three sub-parts are shelves stacked in one panel, with no tabs. W and S step between them (here S twice, down to Trousers), and the shelf in focus is lit while the others dim. The mirror (hair, colour, skin, earrings) and the cloak pegs (cloak, scarf) work the same way."), 816],
  ["7-stepping-out", frame(bg("wardrobe-at") + panel("wardrobe", { x: -78, at: [2, 1] }) + prompt(640, 160, "Step in · Wardrobe", .55) + chip(860, 40, "camera eases back out; the prompt returns"), "7", "Stepping out", "E (or Esc) steps out: the panel slides away left, the camera eases back to the house view, and her keys walk again. Walking off without stepping out can't happen, because while she's stepped in the movement keys only browse."), 816],
  ["8-pad", frame(bg("broom-zoom-front") + panel("broom", { at: [1, 0], pad: true }) + chip(860, 40, "same panel on a pad: stick or d-pad browse, □ in/out (E's button), ○ out (Esc's)"), "8", "On a pad: the broom stand", "The same panel driven from a pad: the left stick or d-pad browses, square (E's button) steps in and out, and circle steps out. The broom stand also shows a \"Fit\" shelf: what's left of the sliders (length, bend, thickness), where ◀ ▶ moves the focused one (NOTES.md, Q4)."), 816],
  ["9-wake-mirror", frame(bg("table-zoom-front") + panel("mirror", { at: [0, 1], banner: "First night · pick your look, then E to step out", foot: `<span class="k">W</span><span class="k">S</span> shelf <span class="k">A</span><span class="k">D</span> item <span class="k">E</span> I'm ready` }) + chip(860, 40, "first game only: stepped in for her, no prompt"), "9", "The first game's mirror, in the wake-up", "In a first game, once she's out of bed, she's stepped in at the dressing table for her: the camera eases in and the panel is already open, with a banner. E steps out as anywhere else and the wake-up carries on (the curtains). Later games skip this and the dressing table is an ordinary station."), 816],
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
const order = [["mirror", [1, 2]], ["wardrobe", [1, 0]], ["cloak", [0, 2]], ["shoes", [0, 1]], ["bags", [0, 2]], ["broom", [0, 2]]];
const hats = `<div class="slot"><h2>Hats' floor</h2><div class="objcard"><b>Stays objects</b>Hats lie on the floor as game objects, and E picks one up or puts hers down, as now. A hat is a thing with a power (hats are found at shrines, unlocks.md), so it stays something she carries rather than a choice on a panel.<br><br>First game: her own hat only.<br><br>Its shape and colour: the hat station's grimoire (treehouse.md), or a "Hat" shelf on the mirror's panel for the one she's wearing (NOTES.md, Q4).</div></div>`;
const sheet = `<div class="sheet">${order.map(([id, at]) => `<div><h2>${ST[id].name}</h2><div class="slot">${panel(id, { at })}</div></div>`).join("")}<div>${hats}</div></div>`;
const file = resolve(OUT, "contents.html"); writeFileSync(file, page(sheet));
await p.setViewportSize({ width: 7 * 422 + 18, height: 800 }); await p.goto(pathToFileURL(file).href); await p.waitForTimeout(150);
await p.screenshot({ path: resolve(OUT, "contents.png"), fullPage: true }); console.log("contents");
await browser.close();
