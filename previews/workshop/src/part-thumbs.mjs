// MOCK ONLY: the nine proposed broom parts drawn alone (from art/brooms.js's kinds), as PNG thumbnails for the bay mock.
import { openBrowser } from "/home/user/witch-ws/art/headless.mjs";
import { writeFileSync } from "node:fs";
const out = process.argv[2];
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const res = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), { BROOM_KINDS } = await import("/art/brooms.js"), { Model, render, v3 } = await import("/art/model3d.js"), { M } = await import("/art/core.js");
  const st = G.defaultStyle(), L = { broomLength: 1, bristles: 1, frame: 0 };
  const twig = (m, c, r, o) => { const d = v3.norm(o.dir), R = [r[0] * 1.4, r[1] * .7, r[2] * .7], cc = v3.sub(c, v3.mul(d, R[0] - r[0])); m.ell(cc, R, M.STRAW, o); for (let i = 0; i < 5; i++) { const s = (i / 4 - .5) * 2, from = v3.sub(cc, v3.mul(d, R[0] * .4)), to = v3.add(v3.sub(cc, v3.mul(d, R[0] * (1.15 + .1 * (i % 2)))), [0, s * R[1] * 1.1, (i % 3 - 1) * R[2] * .9]); m.seg(from, to, .012, .006, M.STRAW, { group: 3 }); } m.seg(v3.add(c, [.06, 0, 0]), v3.add(c, [.3, 0, 0]), .022, .022, M.BROOM, { group: 2 }); };
  const COL = { missile: [[.0, .05, .85], [.0, .75, .85]], jetbike: [[.55, .7, .7], [.13, .2, .95]], canoe: [[.03, .7, .65], [.09, .5, .9]], ladder: [[.07, .5, .55], [.09, .4, .8]], hobbyhorse: [[.07, .5, .5], [.0, .0, .95]], oar: [[.08, .45, .6], [.08, .5, .85]], curl: [[.08, .55, .55], [.12, .55, .9]], twig: [[.08, .5, .45], [.1, .45, .75]] };
  const P = [
    ["missile-nose", "missile", "body", .55], ["curled-tip", "curl", "body", .4], ["horse-head", "hobbyhorse", "body", .4],
    ["jet-fairing", "jetbike", "body", 0], ["ladder", "ladder", "body", 0], ["canoe-hull", "canoe", "body", 0],
    ["jet-nozzles", "jetbike", "tail", 0], ["twig-bristles", "twig", "tail", 0], ["oar-blade", "oar", "tail", 0],
  ];
  const out = {};
  for (const [id, kind, what, crop] of P) {
    const m = new Model({ blend: .03 });
    if (what === "body") BROOM_KINDS[kind].body(m, L, [-.5, 0, 0], [.62, 0, 0], .022, .018);
    else if (kind === "twig") twig(m, [-.62, 0, 0], [.17, .07, .08], { dir: [1, 0, 0], group: 3 });
    else { BROOM_KINDS[kind].tail(m, L, [-.62, 0, 0], [.17, .07, .08], { dir: [1, 0, 0], group: 3 }); m.seg([-.5, 0, 0], [-.25, 0, 0], .022, .022, M.BROOM, { group: 2 }); }
    const { sp } = render(m, { scale: G.witchPixelsPerUnit ? G.witchPixelsPerUnit(st) * 1.0 : 60, facing: "towards" });
    const [broom, bristles] = COL[kind];
    const baked = G.bake(sp, G.witchColours(st, { ...G.DEFAULT_OUTFIT, broom, bristles }), st, st.cOutline);
    const x0 = Math.floor(baked.w * crop), w = baked.w - x0, k = 4;
    const c = document.createElement("canvas"); c.width = w * k; c.height = baked.h * k; const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    g.drawImage(baked.A, x0, 0, w, baked.h, 0, 0, w * k, baked.h * k);
    const d = g.getImageData(0, 0, c.width, c.height).data; let X0 = c.width, X1 = -1, Y0 = c.height, Y1 = -1;
    for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3] > 8) { X0 = Math.min(X0, x); X1 = Math.max(X1, x); Y0 = Math.min(Y0, y); Y1 = Math.max(Y1, y); }
    const c2 = document.createElement("canvas"); c2.width = X1 - X0 + 1; c2.height = Y1 - Y0 + 1; c2.getContext("2d").drawImage(c, X0, Y0, c2.width, c2.height, 0, 0, c2.width, c2.height);
    out[id] = c2.toDataURL();
  }
  return out;
});
for (const [id, url] of Object.entries(res)) writeFileSync(`${out}/${id}.png`, Buffer.from(url.split(",")[1], "base64"));
console.log(Object.keys(res).join(" "), b.errors.slice(0, 3));
await b.close();
