// The wardrobe's and the shoe rack's new options on our witch (Ed, 2026-11-13: "give options for no jacket and no top"; "some more
// options for trousers (none, jeans, breeches, shorts, miniskirt, long skirt)"; "more options for shoes (none, high heels, boots)";
// "show bags previews without the strap"): a row an option. `walk` (the default): each walking towards us and away, three frames each,
// then the bag station's cards. `poses`: each standing, walking, running, sitting, in bed, lying down, dancing, in the limbo, and
// on her broom (hovering, leaning along, flat out, braking), to check a skirt goes where her legs go.
//   node tools/witch/wardrobe-sheet.mjs <out.png> [walk|poses] [scale]
import { openBrowser } from "../../art/headless.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const [out, mode = "walk", scale = "4"] = process.argv.slice(2);
const bags = JSON.parse(readFileSync(new URL("../../config/wardrobe.json", import.meta.url), "utf8")).shelves.bag.items.map(i => [i.name, i.set]);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ S, mode, bags }) => {
  const G = await import("/art/generator.js"), WG = await import("/art/witchGenome.js"), st = G.defaultStyle();
  const { look } = WG.genomeLook(WG.WITCH_GENOME), col = G.witchColours(st);
  // (each picture cut to what's drawn, so the sheet is no bigger than it need be)
  const trim = sp => { const d = sp.A.getContext("2d").getImageData(0, 0, sp.w, sp.h).data; let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (d[(y * sp.w + x) * 4 + 3]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } const c = document.createElement("canvas"); c.width = Math.max(1, x1 - x0 + 1); c.height = Math.max(1, y1 - y0 + 1); c.getContext("2d").drawImage(sp.A, -x0, -y0); return { A: c, w: c.width, h: c.height }; };
  const bake = sp => trim(G.bake(sp, col, st, st.cOutline));
  const one = (o, L) => bake(G.witchSprite(st, { ...o, look: { ...look, ...L } }));
  const OPTIONS = [["as she is", {}], ["jacket: none", { top: "none" }], ["top: none", { shirt: "none" }], ["jacket and top: none", { top: "none", shirt: "none" }],
    ["top: vest (no jacket)", { top: "none", shirt: "vest" }], ["top: crop top (no jacket)", { top: "none", shirt: "crop" }], ["top: crop top", { shirt: "crop" }],
    ["trousers: none", { trousers: "none" }], ["trousers: breeches", { trousers: "breeches" }], ["trousers: shorts", { trousers: "shorts" }], ["trousers: miniskirt", { trousers: "miniskirt" }], ["trousers: long skirt", { trousers: "longskirt" }],
    ["shoes: none", { shoes: "none" }], ["shoes: high heels", { shoes: "heels" }], ["shoes: boots", { shoes: "boots" }], ["boots and breeches", { shoes: "boots", trousers: "breeches" }], ["heels and a miniskirt, no jacket", { shoes: "heels", trousers: "miniskirt", top: "none" }]];
  const WALK = [...[0, 1, 3, 4].map(frame => ({ pose: "walk", frame, facing: "towards" })), ...[0, 1, 3, 4].map(frame => ({ pose: "walk", frame, facing: "away" }))];
  const POSES = [{ pose: "idle" }, { pose: "idle", facing: "away" }, { pose: "walk", frame: 1 }, { pose: "walk", frame: 1, heading: "towards" }, { pose: "walk", frame: 1, heading: "away" }, { pose: "run", frame: 1 }, { pose: "sit" }, { pose: "sitGround" }, { pose: "inBed" }, { pose: "stargaze" }, { pose: "twoStep" }, { pose: "spin", frame: 1 }, { pose: "limbo" },
    { frame: 0 }, { frame: 0, facing: "away" }, { pose: "lean", frame: 1 }, { frame: 0, heading: "towards" }, { pose: "fast" }, { pose: "brake" }, { pose: "descend" }];
  const rows = OPTIONS.map(([label, L]) => [label, (mode === "poses" ? POSES : WALK).map(o => one(o, L))]);
  if (mode !== "poses") { // the bag station's cards, as its panel draws them
    const card = set => { const L = { ...look }; for (const [k, v] of Object.entries(set)) L[k.replace("accessories.", "")] = v; const sp = G.witchCardSprite(st, { look: L, show: "bag" }); return sp && bake(sp); };
    rows.push(["bag cards (no straps)", bags.map(([, set]) => card(set)).filter(Boolean)]);
    const cards = (show, Ls) => Ls.map(L => bake(G.witchCardSprite(st, { look: { ...look, ...L }, show })));
    rows.push(["cards: jacket none; tops", cards("jacket", [{ top: "none" }]).concat(cards("top", [{ shirt: "tee" }, { shirt: "vest" }, { shirt: "crop" }, { shirt: "none" }]))]);
    rows.push(["cards: trousers", cards("hips", ["jeans", "breeches", "shorts", "miniskirt", "longskirt", "none"].map(trousers => ({ trousers })))]);
    rows.push(["cards: shoes", cards("legs", ["trainers", "heels", "boots", "none"].map(shoes => ({ shoes })))]);
  }
  const all = rows.flatMap(r => r[1]), cw = Math.max(...all.map(s => s.w)) * S + 10, ch = Math.max(...all.map(s => s.h)) * S + 10, lw = 340, cols = Math.max(...rows.map(r => r[1].length));
  const c = document.createElement("canvas"); c.width = lw + cw * cols; c.height = ch * rows.length;
  const g = c.getContext("2d"); g.fillStyle = "#3a2a1e"; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
  g.font = "18px monospace";
  rows.forEach(([label, sps], r) => { const y0 = r * ch; g.fillStyle = "#f4ecd8"; g.fillText(label, 10, y0 + ch / 2); sps.forEach((s, i) => g.drawImage(s.A, lw + i * cw + (cw - s.w * S) / 2, y0 + ch - 5 - s.h * S, s.w * S, s.h * S)); });
  return c.toDataURL();
}, { S: +scale, mode, bags });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close();
