// Whole helpers moved from artBuild; drawing bodies are unchanged.
import * as Art from "./areaArt.primitives";
import { LOOKS, lookSeed } from "../rules/map";
import { AREA_BY_ID, areaAssets } from "../../art/areas.js";
import { biomeColours, biomeLook, biomeScale, biomeSnow, biomeStyle } from "../../art/flora/biomes.js";
import { rng } from "../rules/random";
import type { Style } from "./style";
import type { ArtDef, Baked, MakeCanvas, Piece, TreeOpts, TypeLayout } from "./artBuild";

// One of an area's trees, drawn as art/areas.js draws its "tree" props, but keeping the crown
// line so it splits into a top half (shown from the treetops) and a bottom half (the trunk).
export function areaTree(def: ArtDef, o: TreeOpts, st: Style, r: () => number, K: number) {
  const f = (Art.treeSpecies as (type: string) => { fn: unknown })(o.type).fn as (r: () => number, st: Style, s: number) => { sp: unknown; crownY: number }; // any species art/trees.js knows
  const ts = { ...st, leafHue: def.leaf + (o.dark ? 0.05 : 0), gnarl: o.gnarl ?? st.gnarl, treeBare: o.bare, treeTrunks: o.trunks, treeLean: o.lean, treeThick: o.thick, treeThin: o.thin, treeHollow: o.hollow, treeWebs: o.webs, treeHang: (def as { layout?: { hang?: number } }).layout?.hang ?? 0 } as unknown as Style;
  const look = st.biome ? biomeLook(st.biome) : null; // (the island's biome: art/flora/biomes.js)
  const t = f(r, biomeStyle(ts, look) as Style, st.treeSize * K * (o.scale || 1) * biomeScale(look) * Art.uni(r, 0.9, 1.1));
  Art.snowCrown(t.sp, biomeSnow(look, 0), 1);
  const c = Art.treeColours(r, ts, f) as Record<number, number[]>;
  if (o.dark) { c[Art.M.LEAF] = c[Art.M.LEAF3]; c[Art.M.LEAF3] = Art.hsv2rgb(def.leaf + 0.05, 0.7, 0.22); }
  c[Art.M.NOSE] = [20, 16, 24]; c[Art.M.GLINT] = [235, 235, 240]; biomeColours(c, look, Art.M);
  return { parts: Art.splitTree(t), colours: c };
}

/** Everything an area type needs, from art/areas.js: its big objects (trees in several
 *  variants, split into halves), small objects, wall objects, set piece, and floor tile. */
export function typeSprites(st: Style, seed: number, t: number, K: number, mk: MakeCanvas): { sprites: Baked[]; layout: TypeLayout; floor: Baked } {
  const id = LOOKS[t].id, def = (AREA_BY_ID as unknown as Record<string, ArtDef>)[id]; // (LOOKS: the area types and home's meadow)
  const assets = areaAssets(id, st, { K, makeCanvas: mk }) as { floor: { sp: Baked }; walls: { sp: Baked }[]; small: { sp: Baked }[]; big: { sp: Baked }[]; setPiece: { sp: Baked; origin?: { x: number; y: number } } | null; rim: { sp: Baked; kind: string; metres: { height: number } }[] };
  const sprites: Baked[] = [], add = (b: Baked) => sprites.push(b) - 1;
  const layout: TypeLayout = { big: [], bigWeight: [], grove: { giant: [], tall: [] }, small: [], walls: [], set: null, rim: [] };
  const bk = (sp: unknown, col: unknown) => Art.bake(sp, col, st, "none", mk) as Baked;
  // Anything drawn as a tree (big objects, small trees, a tree set piece) is split into crown and
  // trunk, so its crown hides in ground mode; everything else is drawn whole.
  const tree = (o: TreeOpts, k: number): Piece => {
    const { parts, colours } = areaTree(def, o, st, rng(seed * 13 + lookSeed(t) * 101 + k * 7 + 1), K);
    return { bot: add(bk(parts.bot, colours)), top: add(bk(parts.top, colours)) };
  };
  // Trees: the area's own UK species (a main and a minor one) across four height classes, from
  // saplings to a rare giant over the canopy (art/areas.js areaTreeVariants), each with its share
  // of the area's trees. Anything else big (mounds, boulders, logs) is drawn whole, as before.
  // Each height class gets the area's own share of its trees (its layout's heightMix), split among
  // that class's variants; without one, the art's default weights.
  const variants = (Art.areaTreeVariants as (id: string, st: Style, o: object) => unknown)(id, st, { K, makeCanvas: mk, flora: (Art.floraPick as (q: unknown) => string[])(st.flora) }) as { top: Baked; bot: Baked; weight: number; heightClass: "sapling" | "mature" | "tall" | "giant"; face?: boolean; sway?: { top: unknown; bot: unknown } }[]; // flora: ?flora= (main.ts), these species instead of the area's own
  const faced = variants.filter(v => v.face), plain = variants.filter(v => !v.face); // (the bark face's tree: never dealt by weight, see below)
  const mix = LOOKS[t].layout.heightMix, perClass = (c: string) => plain.filter(v => v.heightClass === c).length || 1;
  // Each carries its sway mask (#34), so only its leaves move in the wind.
  const withSway = (b: Baked, S?: unknown) => (S ? { ...b, S: S as Baked["A"] } : b);
  for (const v of plain) { layout.big.push({ bot: add(withSway(v.bot, v.sway?.bot)), top: add(withSway(v.top, v.sway?.top)) }); layout.bigWeight.push(mix ? mix[v.heightClass] / perClass(v.heightClass) : v.weight); }
  // The grove's trees (a legend's ring of old giants, Ed 2026-10-06): the two tallest classes it has.
  const ranks = ["sapling", "mature", "tall", "giant"], have = ranks.filter(c => plain.some(v => v.heightClass === c)), of = (c?: string) => plain.flatMap((v, i) => (v.heightClass === c ? [i] : []));
  layout.grove.giant = of(have[have.length - 1]); layout.grove.tall = have.length > 1 ? of(have[have.length - 2]) : layout.grove.giant;
  // The bark face's tree (art/areas.js barkFace): a big object of its own, weight 0, so it's never dealt; the view puts it on
  // at most two trees an area (view/scenery.ts).
  for (const v of faced.slice(0, 1)) { layout.face = layout.big.length; layout.big.push({ bot: add(withSway(v.bot, v.sway?.bot)), top: add(withSway(v.top, v.sway?.top)) }); layout.bigWeight.push(0); }
  // The baked pieces stand for the area's list entries (a.from): one each, or under the prop generator (?props=gen) n variants of
  // one, each a share of that entry's weight (a.share). Walked by piece, not by entry, so each entry is its own art.
  type Asset = { sp: Baked; sway?: unknown; sparse?: number; from: number; share?: number };
  const bigs = assets.big as Asset[], smalls = assets.small as Asset[];
  const firstBig = layout.big.length, share = Math.min(0.95, LOOKS[t].layout.treeShare ?? 0);
  bigs.forEach(a => {
    if (def.big[a.from][0] === "tree" && variants.length) return;
    layout.big.push({ bot: add(withSway(a.sp, a.sway)), top: null });
    // Tall pieces in the open areas (snags, cairns, standing stones, pillars, spires: #33) stand
    // sparsely: their art's own sparse share as their weight among the area's big objects (about
    // a fifth of them all), the mounds, boulders and logs at 1.
    layout.bigWeight.push(variants.length && !share ? 0.1 * (a.share ?? 1) : a.sparse ?? a.share ?? 1);
  });
  // An open area with a few trees among its props (its layout's treeShare; Ed, 2026-10-13: "trees into areas with no trees"): the
  // trees' weights scaled so they're that share of all its big objects, the props keeping their own.
  if (share && variants.length && layout.big.length > firstBig) {
    const w = layout.bigWeight, trees = w.slice(0, firstBig).reduce((t, v) => t + v, 0), props = w.slice(firstBig).reduce((t, v) => t + v, 0), k = trees > 0 ? (share / (1 - share)) * props / trees : 0;
    for (let i = 0; i < firstBig; i++) w[i] *= k;
  }
  // An area with no trees (Ed, 2026-10-06: "Legend with no tall trees around it"): its legends' groves grow its two tallest big
  // objects (the stone shrine's great stones, the ravine's spires, the moor's standing stones and cairns), so every circle has a tall ring;
  // every variant of each.
  if (!variants.length && bigs.length) {
    const tallest = new Map<number, number>(); // (an entry's tallest piece, in art pixels)
    bigs.forEach(a => tallest.set(a.from, Math.max(tallest.get(a.from) ?? 0, a.sp.h)));
    const byH = [...tallest].filter(([, h]) => h >= 48).sort((a, b) => b[1] - a[1]).map(([from]) => from); // (as tall as she is or more: no boulders or mounds)
    const of = (from: number) => bigs.flatMap((a, j) => (a.from === from ? [firstBig + j] : []));
    if (byH.length) { layout.grove.giant = of(byH[0]); layout.grove.tall = of(byH[1] ?? byH[0]); }
  }
  // The small objects are picked evenly, so each entry gets as many slots as the most variants any has (a plain one repeated).
  const slots = Math.max(1, ...def.small.map((_, i) => smalls.filter(a => a.from === i).length));
  def.small.forEach(([kind, o], i) => {
    const mine = smalls.filter(a => a.from === i);
    const pieces = kind === "tree" ? [tree(o as TreeOpts, 500 + i)] : mine.map(a => ({ bot: add(withSway(a.sp, a.sway)), top: null }));
    for (let k = 0; k < slots && pieces.length; k++) layout.small.push(pieces[k % pieces.length]);
  });
  for (const a of assets.walls) layout.walls.push(add(a.sp));
  for (const a of assets.rim) layout.rim.push({ frame: add(a.sp), form: a.kind, height: a.metres.height });
  if (assets.setPiece) layout.set = def.set?.[0] === "tree" ? tree(def.set[1] as TreeOpts, 900) : { bot: add(assets.setPiece.sp), top: null, origin: assets.setPiece.origin };
  return { sprites, layout, floor: assets.floor.sp };
}
