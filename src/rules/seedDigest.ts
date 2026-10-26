// Same seed, same island, everywhere (Ed, 2026-10-26, from web research: the ECMAScript spec lets engines approximate Math.sin,
// cos, tan, atan2, exp, log, pow, hypot and the like, and V8 has changed some between versions; one project found different
// islands from one seed in Node and Chrome. Our tests run in Node; Ed plays in Chrome on Windows): a handful of islands built from
// fixed seeds through the real generator, each stage hashed bit for bit, so two engines can be compared stage by stage and the
// first divergence named. Run by src/rules/seedDigest.test.ts (Node, twice over: stable) and tools/seed/compare.mjs (Node against
// headless Chromium, the same source bundled). No drawing, no DOM: rules code only.
import { worldOf, islandOf, homeIsland, coastSpec, KIND_NAMES } from "./rosters";
import { islandCoast, islandOutline, type IslandSpec } from "./islandShape";
import { generateMap, islandLand } from "./map";
import { terrainAt, drawnHills } from "./terrain";
import { zooLayout } from "./zooMap";
import { TUNING, type Tuning } from "./tuning";

/** A running hash of numbers, bit for bit (each a float64's two words), and of strings. FNV-1a over 32-bit words. */
class Hasher {
  private h = 0x811c9dc5 | 0;
  private readonly f = new Float64Array(1);
  private readonly u = new Uint32Array(this.f.buffer);
  num(x: number): this { this.f[0] = Object.is(x, -0) ? 0 : x; this.word(this.u[0]); return this.word(this.u[1]); }
  nums(a: ArrayLike<number>): this { for (let i = 0; i < a.length; i++) this.num(a[i]); return this; }
  str(s: string): this { for (let i = 0; i < s.length; i++) this.word(s.charCodeAt(i)); return this.word(0xffff); }
  private word(w: number): this { this.h = Math.imul(this.h ^ (w | 0), 16777619); return this; }
  get hex(): string { return (this.h >>> 0).toString(16).padStart(8, "0"); }
}

/** The islands the digest builds (by kind; "home" home's): home, the first phase-1 island, the first phase-5 one, and the first
 *  (by kind's order) whose land has lakes. Chosen from world 0's own table, so the same on every engine that agrees on it. */
export function digestIslands(world = 0): { home: string; phase1: string; phase5: string; lakes: string } {
  const by = (p: number) => KIND_NAMES.find(k => islandOf(k, world)?.phase === p) ?? KIND_NAMES[0], phase1 = by(1), phase5 = by(5);
  const lakes = KIND_NAMES.find(k => { const I = islandOf(k, world); return !!I && k !== phase1 && k !== phase5 && I.phase <= 3 && !!islandLand(I, TUNING, 32).lakes?.loops.length; }) ?? by(2);
  return { home: "home", phase1, phase5, lakes };
}

/** Every stage's hash: the archipelago (where every island lies), each chosen island's coast radii and its outline's loops, then
 *  two whole maps (home's and the phase-1 island's): their cells and area types, the partition at sample points, the terrain's
 *  height at sample points; and the zoo's layout. Keys in the order they're made, so the first that differs is the first
 *  divergence. */
export function seedDigest(world = 0, tuning: Tuning = TUNING): Record<string, string> {
  const out: Record<string, string> = {};
  const W = worldOf(world), a = new Hasher();
  for (const [kind, p] of [...W.islands].sort((x, y) => (x[0] < y[0] ? -1 : 1))) a.str(kind).num(p.x).num(p.y);
  out.archipelago = a.hex;
  const pick = digestIslands(world);
  for (const [name, kind] of Object.entries(pick)) {
    const I = kind === "home" ? homeIsland(world) : islandOf(kind, world)!;
    if (kind !== "home") out[`coast:${name}`] = new Hasher().nums(islandCoast(coastSpec(I) as IslandSpec, tuning.islands?.coast ?? tuning.map?.coast).radii).hex;
    const o = islandOutline(I, tuning, 32), h = new Hasher().nums([o.box.minX, o.box.maxX, o.box.minZ, o.box.maxZ, o.far]);
    for (const l of o.loops) h.num(l.sea ? 1 : 0).nums(l.pts);
    out[`outline:${name}`] = h.hex;
  }
  // (two whole maps, as a night makes them: its cells and their types, the partition across it, the terrain's heights)
  const H = drawnHills(tuning);
  for (const [name, island] of [["home", ""], ["phase1", pick.phase1]] as const) {
    const t = { ...tuning, map: { ...tuning.map!, island: island || "home", world, found: [] as string[] } } as Tuning;
    const m = generateMap(7, t);
    const cells = new Hasher();
    for (const c of m.cells) cells.num(c[0]).num(c[1]).num(m.typeOf(c[0], c[1]));
    out[`cells:${name}`] = cells.hex;
    const A = m.areaSize, part = new Hasher(), hts = new Hasher();
    const L = m.bounds.land, x0 = L ? L.box.minX : 0, x1 = L ? L.box.maxX : A * 8, z0 = L ? L.box.minZ : 0, z1 = L ? L.box.maxZ : A * 8;
    for (let i = 0; i <= 24; i++) for (let j = 0; j <= 24; j++) {
      const x = x0 + ((x1 - x0) * i) / 24, z = z0 + ((z1 - z0) * j) / 24, c = m.partition.partition(x / A, z / A);
      part.num(c[0]).num(c[1]);
      hts.num(terrainAt(m, x, z, H));
    }
    out[`partition:${name}`] = part.hex;
    out[`terrain:${name}`] = hts.hex;
  }
  // (the zoo, every island found, round coasts: its layout)
  const Z = zooLayout(world, "all", { across: 168 * 1.6, gap: 16, street: 28, plaza: 60, margin: 120, areaSize: 168 }, tuning.islands?.coast ?? tuning.map?.coast);
  const z = new Hasher().num(Z.reach).num(Z.home.x).num(Z.home.z);
  for (const I of Z.islands) z.str(I.kind).num(I.x).num(I.z).num(I.most).nums(I.coast);
  out.zoo = z.hex;
  return out;
}

/** The pure functions themselves on fixed inputs: what an engine's Math gives, bit for bit (the spec lets these differ). */
export function mathDigest(): Record<string, string> {
  const xs: number[] = [];
  for (let i = 0; i < 400; i++) xs.push(-40 + i * 0.2003);
  const fn: Record<string, (x: number) => number> = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, atan2: x => Math.atan2(x, 1.37), exp: x => Math.exp(x / 8), log: x => Math.log(Math.abs(x) + 0.5),
    pow: x => Math.pow(Math.abs(x) + 0.1, 1.73), hypot: x => Math.hypot(x, 3.1), sqrt: x => Math.sqrt(Math.abs(x)), tanh: Math.tanh,
  };
  const out: Record<string, string> = {};
  for (const [k, f] of Object.entries(fn)) out[k] = new Hasher().nums(xs.map(f)).hex;
  return out;
}

/** The raw numbers behind the archipelago's and the Math hashes, for finding a divergence: every island's place, and each function
 *  on the fixed inputs. */
export function seedRaw(world = 0): { archipelago: [string, number, number][]; math: Record<string, number[]>; zoo: [string, number, number][] } {
  const W = worldOf(world), xs: number[] = [];
  for (let i = 0; i < 400; i++) xs.push(-40 + i * 0.2003);
  const fn: Record<string, (x: number) => number> = { sin: Math.sin, cos: Math.cos, pow: x => Math.pow(Math.abs(x) + 0.1, 1.73) };
  return {
    archipelago: [...W.islands].sort((x, y) => (x[0] < y[0] ? -1 : 1)).map(([k, p]) => [k, p.x, p.y]),
    math: Object.fromEntries(Object.entries(fn).map(([k, f]) => [k, xs.map(f)])),
    zoo: zooLayout(world, "all", { across: 168 * 1.6, gap: 16, street: 28, plaza: 60, margin: 120, areaSize: 168 }, TUNING.islands?.coast ?? TUNING.map?.coast).islands.map(I => [I.kind, I.x, I.z]),
  };
}
