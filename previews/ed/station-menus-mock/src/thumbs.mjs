// Item thumbnails for the station-menus mock: our witch with one thing changed, standing (or flying, for brooms), as PNGs.
import { openBrowser } from "/home/user/witch/art/headless.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
const out = process.argv[2]; mkdirSync(out, { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const items = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), WG = G.WITCH_GENOME;
  const variants = [];
  const add = (id, mut, opt = {}) => variants.push({ id, mut, opt });
  for (const t of ["jacket", "sequins", "mesh", "poncho", "cape"]) add("top-" + t, g => { g.top = t; });
  for (const c of ["none", "short", "long", "hooded"]) add("cloak-" + c, g => { g.cloak = c; });
  add("scarf", g => { g.accessories.scarf = true; g.scarfLength = 3; }); add("cloak-long-scarf", g => { g.cloak = "long"; g.accessories.scarf = true; g.scarfLength = 5; });
  for (const h of ["long", "bob", "buns", "mohawk"]) add("hair-" + h, g => { g.hair = h; });
  add("earrings", g => { g.accessories.earrings = true; });
  add("shades", g => { g.accessories.shades = true; });
  add("shoes-plain", g => { g.accessories.chunky = false; });
  add("shoes-chunky", g => { g.accessories.chunky = true; });
  add("satchel", g => { g.accessories.satchel = true; g.bagSize = 1.4; });
  add("bumbag", g => { g.accessories.bumbag = true; });
  add("backpack", g => { g.backpackSize = 1.4; });
  for (const k of ["classic", "fan", "twig", "round", "hobbyhorse", "mop", "jetbike", "drone"]) add("broom-" + k, g => { g.broom = { ...g.broom, kind: k }; }, { fly: true });
  // colourways: jeans, jacket and skin
  const pals = { jeans: [[.6, .5, .45], [.0, .0, .15], [.08, .45, .55], [.33, .4, .4]], jacket: [[.0, .55, .25], [.75, .5, .45], [.13, .6, .55], [.5, .4, .35]], top: [[.95, .1, .95], [.0, .6, .6], [.55, .5, .55], [.15, .7, .8]], hair: [[.0, .7, .55], [.08, .5, .25], [.12, .3, .9], [.8, .45, .7]], cloak: [[.75, .45, .35], [.0, .6, .3], [.4, .4, .3], [.6, .3, .2]], scarf: [[.95, .6, .7], [.5, .5, .6], [.13, .7, .8], [.33, .5, .5]], skin: [[.08, .3, .95], [.07, .4, .8], [.06, .5, .6], [.05, .55, .42]] };
  for (const [part, cs] of Object.entries(pals)) cs.forEach((c, i) => add(`${part}-${i}`, g => { g.palette = { ...(g.palette || {}), [part]: c }; }));
  const res = {};
  for (const v of variants) {
    const g = JSON.parse(JSON.stringify(WG)); v.mut(g);
    const { look, outfit } = G.genomeLook(g), col = G.witchColours(st, outfit, { styleHues: false });
    const sp = G.bake(G.witchSprite(st, v.opt.fly ? { look, frame: 0 } : { look, pose: "stand", frame: 0, heading: "towards" }), col, st, st.cOutline);
    const c = document.createElement("canvas"); c.width = sp.w; c.height = sp.h; const x = c.getContext("2d"); x.drawImage(sp.A, 0, 0);
    res[v.id] = { url: c.toDataURL(), w: sp.w, h: sp.h };
  }
  return res;
});
const meta = {};
for (const [id, it] of Object.entries(items)) { writeFileSync(`${out}/${id}.png`, Buffer.from(it.url.split(",")[1], "base64")); meta[id] = { w: it.w, h: it.h }; }
writeFileSync(`${out}/thumbs.json`, JSON.stringify(meta, null, 1));
console.log(Object.keys(meta).length, "thumbs", b.errors.slice(0, 3)); await b.close();
