// The bedroom's one pixel scale (Ed, 2026-10-06: "everything should be pixellated to the same level (including the menu) and be
// laid out in a balanced way"): the creator's panel, tabs, sliders, swatches, buttons and text drawn on the room's own art-pixel
// grid. `--u` on #creator is one art pixel in CSS pixels (the room's whole-number scale over the device pixel ratio); every size
// here is a whole number of it. The text is Tiny5 (an 8 px em on a 1 px grid: crisp at 8 × u), the title Jacquard 24 (a pixel
// blackletter, 43 px em) drawn at art pixels on a canvas and shaded like the room's gold; the tabs' and buttons' icons are pixel
// art (no emoji). Light and glow stay smooth (Ed's rule). Fonts: SIL Open Font License, ./fonts/OFL-*.txt.
import tiny5 from "./fonts/Tiny5.woff2?url";
import jacquard from "./fonts/Jacquard24.woff2?url";

const U = "var(--u)";
const u = (n: number) => `calc(${U} * ${n})`;
/** A rectangle with its corner pixels cut, n art pixels in: pixel art's rounded corner. */
const cut = (n = 1) => `polygon(${u(n)} 0, calc(100% - ${u(n)}) 0, calc(100% - ${u(n)}) ${u(n)}, 100% ${u(n)}, 100% calc(100% - ${u(n)}), calc(100% - ${u(n)}) calc(100% - ${u(n)}), calc(100% - ${u(n)}) 100%, ${u(n)} 100%, ${u(n)} calc(100% - ${u(n)}), 0 calc(100% - ${u(n)}), 0 ${u(n)}, ${u(n)} ${u(n)})`;

const INK = "#1a1022", GOLD = "#f2c46a", GOLD_D = "#b57a2c";

/** The stylesheet: everything in #creator on the grid. (Its inline styles are the creator's own; these win where they say
 *  !important, so the look lives here and what the controls do stays in creator.ts.) */
const CSS = `
@font-face { font-family: "Tiny5"; src: url(${tiny5}) format("woff2"); font-display: block; }
@font-face { font-family: "Jacquard 24"; src: url(${jacquard}) format("woff2"); font-display: block; }
#creator { --u: 3px; font-family: "Tiny5", ui-monospace, monospace !important; font-size: ${u(8)} !important; line-height: ${u(10)}; -webkit-font-smoothing: none; font-smooth: never; }
#creator * { border-radius: 0 !important; }
#creator button, #creator input, #creator label, #creator legend { font-family: inherit !important; font-size: ${u(8)} !important; line-height: ${u(8)} !important; }
#creator .px-sheet { box-shadow: none !important; -webkit-mask: none !important; mask: none !important; padding: 0 !important; image-rendering: pixelated; background-size: 100% 100% !important; background-repeat: no-repeat !important; }
#creator .px-tabs { gap: ${u(1)} !important; padding: 0 0 0 ${u(4)} !important; overflow-y: auto; scrollbar-width: none; min-height: 0; }
#creator .px-tabs::-webkit-scrollbar { display: none; }
#creator .px-tabs button { width: ${u(14)} !important; height: ${u(12)} !important; flex: 0 0 auto; padding: 0 !important; border: none !important; background: #3a2850 !important; box-shadow: inset 0 ${u(-1)} 0 ${INK}, inset ${u(1)} 0 0 #5a4472 !important; clip-path: polygon(${u(1)} 0, 100% 0, 100% 100%, ${u(1)} 100%, ${u(1)} calc(100% - ${u(1)}), 0 calc(100% - ${u(1)}), 0 ${u(1)}, ${u(1)} ${u(1)}); filter: none !important; display: flex; align-items: center; justify-content: center; margin-right: 0 !important; }
#creator .px-tabs button[data-on] { background: #281a3a !important; box-shadow: inset ${u(1)} 0 0 ${GOLD} !important; }
#creator .px-tabs button:not([data-on]) canvas { opacity: .6; }
#creator .px-tabs button canvas, #creator .px-icon { width: ${u(11)}; height: ${u(11)}; image-rendering: pixelated; display: block; }
#creator .px-panel { background: #281a3a !important; border-left: none !important; padding: ${u(2)} ${u(5)} 0 ${u(4)} !important; margin: 0 ${u(6)} 0 0 !important; scrollbar-width: thin; scrollbar-color: ${GOLD_D} #1d1229; }
#creator .px-panel::-webkit-scrollbar { width: ${u(3)}; }
#creator .px-panel::-webkit-scrollbar-track { background: #1d1229; }
#creator .px-panel::-webkit-scrollbar-thumb { background: ${GOLD_D}; }
#creator fieldset { border: ${u(1)} solid ${GOLD_D} !important; margin: 0 0 ${u(3)} !important; padding: ${u(1)} ${u(4)} ${u(3)} !important; }
#creator legend { padding: 0 ${u(2)} !important; display: flex; align-items: center; gap: ${u(2)}; color: ${GOLD} !important; }
#creator legend .px-icon { width: ${u(11)}; height: ${u(11)}; }
#creator .px-row { gap: ${u(2)} !important; margin: ${u(2)} 0 !important; row-gap: ${u(2)} !important; }
#creator .px-row > span:first-child { width: ${u(26)} !important; }
#creator .px-row > input[type=range] + span { width: ${u(22)} !important; }
#creator button { border: ${u(1)} solid ${INK} !important; padding: ${u(2)} ${u(3)} ${u(2)} !important; clip-path: ${cut()}; box-shadow: inset 0 ${u(-1)} 0 rgba(0,0,0,.4), inset 0 ${u(1)} 0 rgba(255,255,255,.18) !important; min-height: 0 !important; height: auto !important; outline-offset: 0 !important; }
#creator button[data-part] { min-width: ${u(8)}; min-height: ${u(8)} !important; outline: none !important; }
#creator button[data-part][data-on] { border-color: #fff !important; }
#creator [data-bar] { gap: ${u(3)} !important; margin-top: ${u(3)} !important; padding: ${u(3)} 0 !important; background: #281a3a !important; }
#creator [data-bar] button { padding: ${u(3)} ${u(4)} !important; }
#creator input[type=range] { -webkit-appearance: none; appearance: none; height: ${u(7)}; background: transparent; margin: 0; min-width: ${u(40)}; }
#creator input[type=range]::-webkit-slider-runnable-track { height: ${u(2)}; background: ${INK}; box-shadow: 0 ${u(1)} 0 #4a3a5e; }
#creator input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: ${u(4)}; height: ${u(7)}; margin-top: ${u(-2.5)}; background: ${GOLD}; box-shadow: inset ${u(-1)} ${u(-1)} 0 ${GOLD_D}, inset ${u(1)} ${u(1)} 0 #fff3c8; border: none; clip-path: ${cut()}; }
#creator input[type=range]::-moz-range-track { height: ${u(2)}; background: ${INK}; border: none; }
#creator input[type=range]::-moz-range-thumb { width: ${u(4)}; height: ${u(7)}; background: ${GOLD}; border: none; border-radius: 0; box-shadow: inset ${u(-1)} ${u(-1)} 0 ${GOLD_D}; }
#creator input[type=range]:disabled::-webkit-slider-thumb { background: #6a5a7a; box-shadow: none; }
#creator input[type=checkbox] { -webkit-appearance: none; appearance: none; width: ${u(7)}; height: ${u(7)}; margin: 0 ${u(1)} 0 0; background: ${INK}; box-shadow: inset 0 0 0 ${u(1)} #6a5a7a; cursor: pointer; flex: 0 0 auto; }
#creator input[type=checkbox]:checked { background: ${GOLD}; box-shadow: inset 0 0 0 ${u(1)} ${INK}, inset 0 0 0 ${u(2)} ${GOLD}, inset 0 0 0 ${u(3)} ${GOLD_D}; }
#creator label { gap: ${u(2)} !important; margin-right: ${u(4)} !important; }
#creator canvas[data-strip] { height: ${u(6)} !important; border: ${u(1)} solid ${INK} !important; box-sizing: border-box; }
#creator [data-picker] > div { gap: ${u(2)} !important; margin: ${u(1)} 0 !important; }
#creator [data-picker] > div > span:first-child { width: ${u(20)} !important; }
#creator .px-extras { gap: ${u(3)} !important; }
#creator .px-extras button { padding: ${u(2)} ${u(3)} !important; background: #3a2850 !important; height: ${u(15)} !important; display: inline-flex; align-items: center; }
#creator .px-extras button[data-page] { padding: ${u(1)} ${u(2)} !important; }
#creator .px-panel * { font-size: ${u(8)} !important; }
#creator .keys, #creator .ss-body { font-size: ${u(8)} !important; line-height: ${u(10)} !important; }
#creator .keys b { color: ${GOLD}; font-weight: normal; }
#creator .px-title { position: absolute; image-rendering: pixelated; pointer-events: none; }
`;

let installed = false;
/** Puts the fonts and the stylesheet in, once; resolves when the fonts are ready (or have failed: the fallbacks draw). */
export function installPixelUi(): Promise<void> {
  if (!installed) {
    installed = true;
    const s = document.createElement("style"); s.id = "px-ui"; s.textContent = CSS; document.head.append(s);
  }
  if (!document.fonts?.load) return Promise.resolve();
  return Promise.all([document.fonts.load('8px "Tiny5"'), document.fonts.load('43px "Jacquard 24"')]).then(() => undefined, () => undefined);
}

/** The pixel icons (11 × 11), by the creator's box ids and the extra panels'. */
const PAL: Record<string, string> = {
  k: INK, g: GOLD, G: GOLD_D, w: "#efe6ff", W: "#a89cc0", p: "#ff6fbf", P: "#a83a7a", b: "#8fd4ff", B: "#3a6aa0", n: "#9a6a3a", N: "#5c3a19",
  y: "#ffd65a", Y: "#c99a2a", s: "#f0c8a0", v: "#9a6ad8", V: "#5a3a8a", m: "#7ff0b0", M: "#3a9a6a", r: "#ff7a7a",
};
const ICONS: Record<string, string[]> = {
  looks: ["...k...k...", "...kkkkk...", "...kpppk...", "..kpppppk..", "...kpPpk...", "...kpppk...", "..kpppppk..", "..kpppPpk..", ".kpppppppk.", ".kppPpPppk.", ".kkkkkkkkk."],
  hat: [".....k.....", "....kvk....", "....kvVk...", "...kvvVk...", "...kvvVk...", "..kvvvvVk..", "..kggggGk..", ".kvvvvvvVk.", "kvvvvvvvvVk", ".kkkkkkkkk.", "..........."],
  hair: ["...kkkkk...", "..kNnnnNk..", ".kNnnnnnNk.", ".kNsssssNk.", ".kNkssskNk.", ".kNsssssNk.", ".kNssPssNk.", ".kNNsssNNk.", ".kNNkkkNNk.", ".kNk...kNk.", "..k.....k.."],
  face: ["...kkkkk...", "..kyyyyyk..", ".kyyyyyyyk.", "kyykyyykyyk", "kyykyyykyyk", "kyyyyyyyyyk", "kykyyyyykyk", "kyykkkkkyyk", ".kyyyyyyyk.", "..kyyyyyk..", "...kkkkk..."],
  outfit: ["..kk...kk..", ".kVVk.kVVk.", "kVvvVkVvvVk", "kVvvvkvvvVk", "kVkvvgvvkVk", "kVkvvkvvkVk", "kVkvvgvvkVk", ".kkvvkvvkk.", "..kvvgvvk..", "..kvvkvvk..", "..kkkkkkk.."],
  shoes: ["...........", "...........", ".kkkk......", ".kbbbk.....", ".kbwbbk....", ".kbbwbbkk..", ".kbbbbbbbk.", "kbbbbbbbbbk", "kwwwwwwwwwk", ".kkkkkkkkk.", "..........."],
  broom: [".........kk", "........knk", ".......knk.", "......knk..", ".....knk...", "...kknk....", "..kgGGk....", ".kgggGk....", "kgggGk.....", "kggGk......", "kkkk......."],
  scarf: ["...........", ".kkkkkkkkk.", "kprprprprpk", "kprprprprpk", ".kkkkkkrpk.", "......kprk.", "......krpk.", "......kprk.", "......krpk.", "......kkkk.", "..........."],
  bag: ["...kkkkk...", "..k.....k..", "..k.....k..", ".kkkkkkkkk.", "kpppppppppk", "kppPPgPPppk", "kppppppppPk", "kpppppppppk", "kPpppppppPk", "kPPPPPPPPPk", ".kkkkkkkkk."],
  backpack: ["...kkkkk...", "..kNk.kNk..", ".kkkkkkkkk.", "kmmmmmmmmmk", "kmmmmmmmmMk", "kkkkkkkkkkk", "kmkmmmmmkMk", "kmkmgggmkMk", "kmkmmmmmkMk", "kmmmmmmmmMk", ".kkkkkkkkk."],
  phones: ["...kkkkk...", "..kVVVVVk..", ".kVk...kVk.", ".kVk...kVk.", "kVk.....kVk", "kVk.....kVk", "kkkk...kkkk", "kppk...kppk", "kppk...kppk", "kPPk...kPPk", ".kk.....kk."],
  more: [".....y.....", ".....y.....", "....yyy....", "..yyywyyy..", "....yyy....", ".....y...b.", ".....y..bwb", ".y.......b.", "ywy........", ".y.....p...", "......pwp.."],
  controls: ["...kkkkk...", "..kwwwwwk..", ".kwwkkkwwk.", ".kwk..kwwk.", "..k..kwwk..", "....kwwk...", "....kwk....", "....kkk....", "....kwk....", "....kwk....", "....kkk...."],
  news: [".kkkkkkkk..", "kGggggggGk.", ".kwwwwwwwk.", ".kwWWWWwwk.", ".kwwwwwwwk.", ".kwWWWwWwk.", ".kwwwwwwwk.", ".kwWWwWWwk.", ".kwwwwwwwk.", "kGggggggGk.", ".kkkkkkkk.."],
  options: ["....kkk....", ".kk.kgk.kk.", ".kgkgggkgk.", "..kgggggk..", "kkggkkkggkk", "kgggk.kgggk", "kkggkkkggkk", "..kgggggk..", ".kgkgggkgk.", ".kk.kgk.kk.", "....kkk...."],
  bot: ["....kkk....", ".....k.....", "..kkkkkkk..", ".kwwwwwwwk.", ".kwbbwbbwk.", ".kwbbwbbwk.", ".kwwwwwwwk.", ".kwwkkkwwk.", ".kwwwwwwwk.", "..kkkkkkk..", "..........."],
};
/** An icon as a canvas (11 × 11 art pixels, drawn pixelated at u); a box no icon names gets the sparkle. */
export function pixelIcon(id: string): HTMLCanvasElement {
  const rows = ICONS[id] ?? ICONS.more, c = document.createElement("canvas"); c.width = 11; c.height = 11; c.className = "px-icon";
  const x = c.getContext("2d")!;
  rows.forEach((row, j) => [...row.padEnd(11, ".").slice(0, 11)].forEach((ch, i) => { if (PAL[ch]) { x.fillStyle = PAL[ch]; x.fillRect(i, j, 1, 1); } }));
  return c;
}
export const ICON_IDS = Object.keys(ICONS);

/** Strips a leading emoji (and its space) from a label: "🎲 Randomise" is "Randomise" on the grid. */
export const noEmoji = (s: string) => s.replace(/^[^\p{L}\p{N}(]+\s*/u, "");

/** The title, "Coven Rush", in Jacquard 24 at one art pixel to its pixel: lit gold, darker down its strokes, a dark rim and a
 *  drop shadow, at w × h art pixels. */
export function pixelTitle(text: string): HTMLCanvasElement {
  const pad = 3, m = document.createElement("canvas"), g = m.getContext("2d")!;
  g.font = '43px "Jacquard 24"';
  const w = Math.ceil(g.measureText(text).width) + pad * 2 + 2, h = 40;
  m.width = w; m.height = h;
  g.font = '43px "Jacquard 24"'; g.textBaseline = "alphabetic"; g.fillStyle = "#fff"; g.fillText(text, pad, 32);
  const d = g.getImageData(0, 0, w, h).data, on = (i: number, j: number) => i >= 0 && j >= 0 && i < w && j < h && d[(j * w + i) * 4 + 3] > 127;
  let top = h, bot = 0;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (on(i, j)) { top = Math.min(top, j); bot = Math.max(bot, j); }
  const out = document.createElement("canvas"); out.width = w; out.height = h; out.className = "px-title";
  const x = out.getContext("2d")!;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let col = "";
    if (on(i, j)) { const t = (j - top) / Math.max(1, bot - top); col = !on(i, j - 1) ? "#fff3c8" : !on(i, j + 1) ? "#8a5420" : t < .45 ? "#f6d27a" : t < .7 ? "#e9ae4c" : "#c07f30"; }
    else if (on(i - 1, j) || on(i + 1, j) || on(i, j - 1) || on(i, j + 1)) col = "#2a140c";
    else if (on(i - 1, j - 2) || on(i, j - 2)) col = "rgba(5,3,12,.85)";
    if (col) { x.fillStyle = col; x.fillRect(i, j, 1, 1); }
  }
  return out;
}

/** The tapestry the panel hangs on, w × h art pixels: deep purple cloth with faint woven rows, a gold trim inset, and scalloped
 *  top and bottom edges, as a data URL (drawn pixelated, stretched to w × h × u). */
export function tapestry(w: number, h: number): string {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const x = c.getContext("2d")!, R = 4, P = R * 2 + 1;
  const inside = (i: number, j: number) => {
    // the scallops: a row of half-discs hanging off each edge, the cloth between them cut away
    if (j < R) { const cx = Math.floor(i / P) * P + R, dy = R - j; return (i - cx) ** 2 + dy * dy <= R * R + 1; }
    if (j >= h - R) { const cx = Math.floor(i / P) * P + R, dy = j - (h - R - 1); return (i - cx) ** 2 + dy * dy <= R * R + 1; }
    return true;
  };
  // (written as pixels, not a fillRect each: the whole panel, every layout; the bedroom's first paint, overnight)
  const img = x.createImageData(w, h), d = img.data, rgb = (hex: string) => [1, 3, 5].map(k => parseInt(hex.slice(k, k + 2), 16));
  const ink = rgb(INK), light = rgb("#2c1c3c"), dark = rgb("#24162f");
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!inside(i, j)) continue;
    const edge = !inside(i - 1, j) || !inside(i + 1, j) || !inside(i, j - 1) || !inside(i, j + 1) || i === 0 || i === w - 1;
    const c = edge ? ink : (j % 3 === 0 ? light : dark), o = (j * w + i) * 4;
    d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  // the gold trim, two lines in from the sides, and along under the scallops
  x.fillStyle = GOLD_D;
  x.fillRect(2, R + 2, 1, h - 2 * R - 4); x.fillRect(w - 3, R + 2, 1, h - 2 * R - 4); x.fillRect(2, R + 2, w - 4, 1); x.fillRect(2, h - R - 3, w - 4, 1);
  x.fillStyle = "rgba(242,196,106,.35)";
  x.fillRect(4, R + 4, 1, h - 2 * R - 8); x.fillRect(w - 5, R + 4, 1, h - 2 * R - 8);
  return c.toDataURL();
}
