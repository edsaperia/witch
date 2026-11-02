// Each species' own attack in the grammar (docs/plans/attack-grammar.md step 5; Ed, 2026-10-27: within each biome every species a
// distinct style, more complex the further out its island's phase; the default from then on, ?attacks=old for the old ones):
// config/species-attacks.json gives its young's, and its adult's is the same grown (adultOf). Each held to the reaction floor as it's
// read (liftToFloor; species.test.ts keeps them there as written). Numeric age profiles grow the same grammar into tanks and artillery.
import raw from "../../../config/species-attacks.json";
import { liftToFloor } from "./timeline";
import type { AttackSpec, Child } from "./types";
import { ageProfile, type AgeProfile } from "../combat/age";

const FILE = raw as unknown as Record<string, AttackSpec | string>;
/** The young's attacks as written, by species. */
export const SPECIES_ATTACKS: Record<string, AttackSpec> = Object.fromEntries(Object.entries(FILE).filter(([k, v]) => !k.startsWith("_") && typeof v === "object")) as Record<string, AttackSpec>;

const MORE = new Set(["fan", "ring", "burst", "wall", "spray", "volley"]);
const grow = (x: number | undefined, k: number) => (x === undefined ? undefined : Math.round(x * k * 100) / 100);

type Growth = Pick<AgeProfile, "range" | "footprint" | "body" | "pattern" | "lunge" | "windup" | "projectileSpeed">;
/** The same grammar tree, numerically grown; children, effects, elements and paths stay composed. */
function growAttack(a: AttackSpec, g: Growth): AttackSpec {
  const out: AttackSpec = { ...a };
  const count = (n: number) => Math.min(12, Math.ceil(n * g.pattern));
  if (a.emit) out.emit = {...a.emit, ...(MORE.has(a.emit.pattern ?? "single") ? {n: count(a.emit.n ?? 1)} : {}), spacing: grow(a.emit.spacing, g.footprint)};
  if (a.body) out.body = {...a.body, radius: grow(a.body.radius, g.body), lunge: grow(a.body.lunge, g.lunge), trigger: grow(a.body.trigger, g.footprint), reach: grow(a.body.reach, g.range)};
  if (a.cast) out.cast = {...a.cast, range: grow(a.cast.range, a.body?.kind === "melee" ? g.lunge : g.range), windup: grow(a.cast.windup, g.windup)};
  if (a.life) out.life = {...a.life, range: grow(a.life.range, g.range), time: grow(a.life.time, g.range / g.projectileSpeed)};
  if (a.speed) out.speed = {...a.speed, v: grow(a.speed.v, g.projectileSpeed), to: grow(a.speed.to, g.projectileSpeed)};
  if (a.area) out.area = {...a.area, r: grow(a.area.r, g.footprint), inner: grow(a.area.inner, g.footprint), width: grow(a.area.width, g.footprint), spacing: grow(a.area.spacing, g.footprint), grow: grow(a.area.grow, g.footprint), ...(a.area.rain ? {rain: {...a.area.rain, n: count(a.area.rain.n), r: grow(a.area.rain.r, g.footprint)!}} : {})};
  if (a.zone) out.zone = {...a.zone, r: grow(a.zone.r, g.footprint)};
  if (a.force) out.force = {...a.force, r: grow(a.force.r, g.footprint)};
  if (a.beam) out.beam = {...a.beam, length: grow(a.beam.length, g.range), width: grow(a.beam.width, g.footprint)};
  if (a.on) out.on = Object.fromEntries(Object.entries(a.on).map(([ev, list]) => [ev, (list as Child[]).map(c => typeof c.attack === "object" ? {...c, attack: growAttack(c.attack, g)} : c)]));
  return strip(out);
}
/** Simple adult projectiles gain a readable impact footprint; existing child compositions remain intact. */
export function adultImpact(a: AttackSpec): AttackSpec {
  const g = ageProfile(2);
  if (a.body?.kind !== "bolt" || !["single", "burst"].includes(a.emit?.pattern ?? "single") || Object.values(a.on ?? {}).some(list => list?.length) || g.impactRadius <= 0) return a;
  return strip({...a, on: {...a.on, hit: [{from: "hit", attack: {cast: {windup: 0.45}, body: {kind: "area", element: a.body.element}, area: {r: g.impactRadius, at: "spot"}, hit: {damage: g.impactDamage, effect: a.hit?.effect}}}]}});
}
export const adultOf = (a: AttackSpec): AttackSpec => adultImpact(growAttack(a, ageProfile(2)));
/** (undefined fields dropped, so the written form stays tidy) */
const strip = <T>(x: T): T => JSON.parse(JSON.stringify(x));

const MADE = new Map<string, AttackSpec | null>();
/** A species' attack at a level (1 young, 2 adult), held to the floor; null for a species with none, a baby or a legend. */
export function speciesAttack(species: string, level: number, floor?: number): AttackSpec | null {
  const key = `${species}/${level}/${floor ?? ""}`;
  let a = MADE.get(key);
  if (a === undefined) {
    const young = SPECIES_ATTACKS[species];
    a = !young || (level !== 1 && level !== 2) ? null : liftToFloor(level === 2 ? adultOf(young) : growAttack(young, ageProfile(1)), {}, floor);
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
 *  where it lands its kind's own attack bursts out, grown by the artillery profile (a single becomes a fan of three), a melee one a
 *  great slam, a pack's a big ring: Ed's huge bomb bursting into a ring of bombs. Each thing in it carries half its share. */
export function legendOf(a: AttackSpec, L: LegendThrow): AttackSpec {
  const growth = ageProfile(3), big = growAttack(a, growth), kind = a.body?.kind ?? "bolt", el = a.body?.element;
  const cast = { range: L.range, windup: L.windup * growth.windup, cooldown: L.interval / growth.tempo, tell: { pose: "rear" as const, glow: 1 } };
  const half = (h: AttackSpec["hit"]) => ({ ...h, damage: Math.round((h?.damage ?? 1) * 0.5 * 100) / 100 });
  if (kind === "beam") return strip({ ...big, cast, body: { ...big.body, look: "legend" }, beam: { ...big.beam, length: L.range, width: Math.max(3, (big.beam?.width ?? 1) * 2), charge: Math.max(1.2, big.beam?.charge ?? 0), sweep: big.beam?.sweep ? big.beam.sweep * 0.5 : undefined, track: big.beam?.track ? big.beam.track * 0.5 : undefined }, pack: undefined, hit: half(big.hit) });
  let burst: AttackSpec = { ...big, cast: { windup: 0.6 }, pack: undefined, hit: half(big.hit) };
  if (kind === "melee" || a.pack?.triangulate || a.pack?.tether) burst = { cast: { windup: 0.6 * growth.windup }, body: { kind: "area", element: el }, area: { shape: "ring", r: 12 * growth.footprint, width: 3 * growth.footprint, grow: 10 }, hit: { ...half(big.hit) } };
  else if (burst.area) burst = { ...burst, area: { ...burst.area, at: "spot" } };
  if ((burst.emit?.pattern ?? "single") === "single" && (kind === "bolt" || kind === "runner" || kind === "lure")) burst = { ...burst, emit: { ...burst.emit, pattern: "fan", n: 3, angle: 40 } };
  return strip({ note: a.note && `legend: ${a.note}, thrown across the areas`, cast, body: { kind: "lob", radius: L.radius * growth.body, flight: L.flight / growth.projectileSpeed, element: el, look: "legend" }, hit: { damage: 0.4 }, on: { land: [{ attack: burst, aim: "target" }] } });
}

const LEGENDS_MADE = new Map<string, AttackSpec | null>();
/** A legend's attack by its kind (legendOf), held to the floor; null for a kind with none. */
export function legendAttack(species: string, L: LegendThrow, floor?: number): AttackSpec | null {
  const key = `${species}/${L.range}/${L.windup}/${L.interval}/${L.flight}/${L.radius}/${floor ?? ""}`;
  let a = LEGENDS_MADE.get(key);
  if (a === undefined) { const young = SPECIES_ATTACKS[species]; a = young ? liftToFloor(legendOf(young, L), {}, floor) : null; LEGENDS_MADE.set(key, a); }
  return a;
}
