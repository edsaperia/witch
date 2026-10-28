// Each species' own attack in the grammar (docs/plans/attack-grammar.md step 5; Ed, 2026-10-27: within each biome every species a
// distinct style, more complex the further out its island's phase; the default from then on, ?attacks=old for the old ones):
// config/species-attacks.json gives its young's, and its adult's is the same grown (adultOf). Each held to the reaction floor as it's
// read (liftToFloor; species.test.ts keeps them there as written). A legend's stays its own move (legends.json) for now.
import raw from "../../../config/species-attacks.json";
import { liftToFloor } from "./timeline";
import type { AttackSpec, Child } from "./types";

const FILE = raw as unknown as Record<string, AttackSpec | string>;
/** The young's attacks as written, by species. */
export const SPECIES_ATTACKS: Record<string, AttackSpec> = Object.fromEntries(Object.entries(FILE).filter(([k, v]) => !k.startsWith("_") && typeof v === "object")) as Record<string, AttackSpec>;

const MORE = new Set(["fan", "ring", "burst", "wall", "spray", "volley"]);
const grow = (x: number | undefined, k: number) => (x === undefined ? undefined : Math.round(x * k * 100) / 100);

/** An adult's attack from its young's: one more in its pattern (a wall's holes kept), its bodies, areas and zones a fifth bigger, a
 *  tenth further, its lunge longer, its children grown alike (each thing carries the adult's own budget, so its damage grows anyway). */
export function adultOf(a: AttackSpec): AttackSpec {
  const out: AttackSpec = { ...a };
  if (a.emit && MORE.has(a.emit.pattern ?? "single")) out.emit = { ...a.emit, n: Math.min(12, (a.emit.n ?? 1) + 1) };
  if (a.body) out.body = { ...a.body, radius: grow(a.body.radius, 1.2), lunge: grow(a.body.lunge, 1.15), trigger: grow(a.body.trigger, 1.2) };
  if (a.cast?.range !== undefined) out.cast = { ...a.cast, range: grow(a.cast.range, 1.1) };
  if (a.life?.range !== undefined) out.life = { ...a.life, range: grow(a.life.range, 1.1) };
  if (a.area) out.area = { ...a.area, r: grow(a.area.r, 1.2), ...(a.area.rain ? { rain: { ...a.area.rain, n: a.area.rain.n + 2 } } : {}) };
  if (a.zone) out.zone = { ...a.zone, r: grow(a.zone.r, 1.2) };
  if (a.beam) out.beam = { ...a.beam, length: grow(a.beam.length, 1.1), width: grow(a.beam.width, 1.2) };
  if (a.on) out.on = Object.fromEntries(Object.entries(a.on).map(([ev, list]) => [ev, (list as Child[]).map(c => (typeof c.attack === "object" ? { ...c, attack: adultOf(c.attack) } : c))]));
  return strip(out);
}
/** (undefined fields dropped, so the written form stays tidy) */
const strip = <T>(x: T): T => JSON.parse(JSON.stringify(x));

const MADE = new Map<string, AttackSpec | null>();
/** A species' attack at a level (1 young, 2 adult), held to the floor; null for a species with none, a baby or a legend. */
export function speciesAttack(species: string, level: number, floor?: number): AttackSpec | null {
  const key = `${species}/${level}/${floor ?? ""}`;
  let a = MADE.get(key);
  if (a === undefined) {
    const young = SPECIES_ATTACKS[species];
    a = !young || (level !== 1 && level !== 2) ? null : liftToFloor(level === 2 ? adultOf(young) : young, {}, floor);
    MADE.set(key, a);
  }
  return a;
}

/** What a legend's attack reaches and how it's thrown (config/legends.json attack: its range, windup, interval, lob flight and
 *  radius). */
export interface LegendThrow { range: number; windup: number; interval: number; flight: number; radius: number }

/** A legend's attack from its kind's (Ed, 2026-10-27: "an exaggerated version of their species' attack: bigger, slower, longer range,
 *  more children"; low threat, long readable telegraphs, reaching two or three areas away): a beam kind's is one giant beam across its
 *  whole reach, charging long; every other's a huge slow lob thrown across the areas (its landing shown from the windup's start), and
 *  where it lands its kind's own attack bursts out, grown twice over, more in it (a single becomes a fan of three), a melee one a
 *  great slam, a pack's a big ring: Ed's huge bomb bursting into a ring of bombs. Each thing in it carries half its share. */
export function legendOf(a: AttackSpec, L: LegendThrow): AttackSpec {
  const big = adultOf(adultOf(a)), kind = a.body?.kind ?? "bolt", el = a.body?.element;
  const cast = { range: L.range, windup: L.windup, cooldown: L.interval, tell: { pose: "rear" as const, glow: 1 } };
  const half = (h: AttackSpec["hit"]) => ({ ...h, damage: Math.round((h?.damage ?? 1) * 0.5 * 100) / 100 });
  if (kind === "beam") return strip({ ...big, cast, body: { ...big.body, look: "legend" }, beam: { ...big.beam, length: L.range, width: Math.max(3, (big.beam?.width ?? 1) * 2), charge: Math.max(1.2, big.beam?.charge ?? 0), sweep: big.beam?.sweep ? big.beam.sweep * 0.5 : undefined, track: big.beam?.track ? big.beam.track * 0.5 : undefined }, pack: undefined, hit: half(big.hit) });
  let burst: AttackSpec = { ...big, cast: { windup: 0.6 }, pack: undefined, hit: half(big.hit) };
  if (kind === "melee" || a.pack?.triangulate || a.pack?.tether) burst = { cast: { windup: 0.6 }, body: { kind: "area", element: el }, area: { shape: "ring", r: 12, width: 3, grow: 10 }, hit: { ...half(big.hit) } };
  else if (burst.area) burst = { ...burst, area: { ...burst.area, at: "spot" } };
  if ((burst.emit?.pattern ?? "single") === "single" && (kind === "bolt" || kind === "runner" || kind === "lure")) burst = { ...burst, emit: { ...burst.emit, pattern: "fan", n: 3, angle: 40 } };
  return strip({ note: a.note && `legend: ${a.note}, thrown across the areas`, cast, body: { kind: "lob", radius: L.radius, flight: L.flight, element: el, look: "legend" }, hit: { damage: 0.4 }, on: { land: [{ attack: burst, aim: "target" }] } });
}

const LEGENDS_MADE = new Map<string, AttackSpec | null>();
/** A legend's attack by its kind (legendOf), held to the floor; null for a kind with none. */
export function legendAttack(species: string, L: LegendThrow, floor?: number): AttackSpec | null {
  const key = `${species}/${L.range}/${L.windup}/${L.interval}/${L.flight}/${L.radius}/${floor ?? ""}`;
  let a = LEGENDS_MADE.get(key);
  if (a === undefined) { const young = SPECIES_ATTACKS[species]; a = young ? liftToFloor(legendOf(young, L), {}, floor) : null; LEGENDS_MADE.set(key, a); }
  return a;
}
