// The attack grammar's spells as the leash view draws them (src/rules/attacks/engine.ts: s.spells, Hotel's composable attacks): its
// bodies, zones, beams, telegraphs, its casters' tells and its events, every one dressed by the attack look (leash/attackLook.ts)
// in its element (the attack's body.element tag, else its caster's) and, if it hunts her, warned of in the danger frame. The rules
// never draw; this only reads them.
import { elementOf } from "../../rules/attackLook";
import { huntsWitch, type State } from "../../rules/creatureStates";
import type { SpellState, Telegraph } from "../../rules/attacks/engine";
import type { Game } from "../../rules/game";
import type { Dress, LiveTelegraph, TelegraphShape } from "./attackLook";
import type { LeashView } from "../leash";

type RGB = { r: number; g: number; b: number };
const dresses = new Map<string, Dress>();
/** An attack's dress: its element tag (else its caster's species'), its caster's level, a party animal's neon. */
function dressOf(species: string, tag: string, level: number, tint: RGB | null, look = ""): Dress {
  const key = `${species}|${tag}|${level}|${look}|${tint ? `${tint.r},${tint.g},${tint.b}` : ""}`;
  let d = dresses.get(key);
  if (!d) dresses.set(key, (d = { el: elementOf(species, undefined, undefined, tag || undefined), level, tint: tint ? [tint.r, tint.g, tint.b] : null, ...(look ? { look } : {}) }));
  return d;
}

// (one shape and one telegraph, reused: a followed telegraph is moved to where what it follows is now, no object made a frame)
const SHAPE: TelegraphShape = { x: 0, z: 0 };
const LIVE: LiveTelegraph = { kind: "", shape: SHAPE, start: 0, fire: 0 };

/** Draws the grammar's spells this frame: close(x, z, r) culls, up is her in the treetops (the danger frame over the crowns),
 *  neon a party species' colour. */
export function drawSpells(lv: LeashView, g: Game, time: number, up: boolean, close: (x: number, z: number, r?: number) => boolean, neon: (species: string) => RGB): void {
  const S: SpellState | undefined = g.combat.spells;
  if (!S) return;
  const L = lv.look, creature = (id: number | undefined) => (id !== undefined ? g.creatures[id] : undefined);
  const dress = (species: string, tag: string, side: string, source: number, look = "") => { const c = creature(source); return dressOf(species, tag, c?.level ?? 2, huntsWitch(side as State) ? null : neon(species), look); };
  // the casters' tells: the danger frame's ring and "!" at a wild one's feet, from its tell's start
  for (const [id, T] of S.tells) {
    const c = creature(id);
    if (!c || c.leashed || c.legendState === "happy" || time < T.from || time > T.until || !close(c.x, c.z)) continue;
    L.tell(c.x, c.z, lv.tops.get(c.id) ?? 1.4, 1.2 + T.glow, (time - T.from) / Math.max(0.05, T.until - T.from), time, c.level === 3 && up);
  }
  // telegraphs: the wild's only (a party animal's warnings are its own business)
  for (const t of S.telegraphs) {
    if (!t.alive || t.kind === "none" || time > t.until || !huntsWitch(t.side as State)) continue;
    if (!place(t, g, S) || !close(SHAPE.x, SHAPE.z, 150)) continue;
    LIVE.kind = t.kind; LIVE.start = t.start; LIVE.fire = t.fire;
    if (time > t.fire && t.kind !== "arming" && t.kind !== "tetherLine") continue; // (fired: what it warned of is drawn now)
    L.telegraph(LIVE, time, up && (creature(t.source)?.level ?? 0) === 3);
  }
  // bodies in flight (bolts, runners, lures, lobs), and mines and seeds lying in wait
  for (const b of S.bodies) {
    if (!b.alive || !close(b.x, b.z, 150)) continue;
    const d = dress(b.species, b.element, b.side, b.source, b.look);
    if (b.kind === "mine" || b.kind === "seed") { L.core(d, b.x, 0.25, b.z, 0, 0, 0, time, b.id); continue; }
    if (b.kind === "lob" && b.lob) { const T = Math.max(0.01, b.lob.lands - b.lob.at); L.core(d, b.x, Math.max(0.3, b.y), b.z, (b.lob.tx - b.lob.fx) / T, 0, (b.lob.tz - b.lob.fz) / T, time, b.id); continue; }
    L.core(d, b.x, b.kind === "runner" ? 0.35 : Math.max(0.6, b.y || 1), b.z, b.hx * b.v, 0, b.hz * b.v, time, b.id);
  }
  // zones lingering on the ground (a puddle, fire, frost, a web; a safe circle's outside): its element's tiles over its shape
  for (const z of S.zones) {
    if (!z.alive || z.once || time < z.from || time > z.until || !close(z.x, z.z, 150)) continue;
    const d = dress(z.species, z.element, z.side, z.source), k = (time - z.from) / Math.max(0.05, z.until - z.from);
    if (z.shape === "safe") { L.hatch(z.x, z.z, z.inner, z.r); continue; }
    L.zone(d, z.x, z.z, z.r, k, z.id * 7 + 3, (x, q) => insideZone(z, x, q), time);
  }
  // beams: live ones burning in their element (a tether's from its caster to its packmate); charging ones are their beamLine
  for (const b of S.beams) {
    if (!b.alive || b.phase !== "live" || !close(b.x, b.z, 150)) continue;
    const d = dress(b.species, b.element, b.side, b.source), to = creature(b.to), src = creature(b.source);
    const x0 = src && !b.to ? src.x : b.x, z0 = src && !b.to ? src.z : b.z;
    const x1 = to ? to.x : x0 + Math.cos(b.angle) * b.length, z1 = to ? to.z : z0 + Math.sin(b.angle) * b.length;
    L.beam(d, x0, z0, x1, z1, 0.7, b.width, time, b.id);
  }
  // events: where something hit, burst, landed, split, was sprung or fizzled, its element's hit; an area struck, its ground
  for (const e of S.events) {
    if (!close(e.x, e.z, 150)) continue;
    const c = creature(e.source), species = c?.species ?? "", side = c ? (c.leashed || c.legendState === "happy" ? "party" : "wild") : "wild";
    const body = e.body !== undefined ? S.bodies.find(b => b.id === e.body) : undefined, el = e.element ?? body?.element ?? "", d = dress(body?.species ?? species, el, side, e.source);
    const seed = Math.round(e.at * 101) + (e.body ?? e.zone ?? e.beam ?? 0) * 13 + e.kind.length;
    if (e.kind === "hit" || e.kind === "expire" || e.kind === "land" || e.kind === "split" || e.kind === "sprung" || e.kind === "bounce") L.hit(d, e.x, e.kind === "land" || e.kind === "sprung" ? 0.4 : 0.9, e.z, time, seed, e.kind === "bounce" ? 0.6 : 1);
    else if (e.kind === "fizzle") L.hit(d, e.x, 0.8, e.z, time, seed, 0.5);
    else if (e.kind === "chain" || e.kind === "relay" || e.kind === "amplify") L.hit(d, e.x, 1, e.z, time, seed, e.kind === "amplify" ? 1.3 : 0.7);
    else if (e.kind === "zone") { const z = S.zones.find(q => q.id === e.zone); if (z && z.once) L.burst(dressOf(z.species, z.element, c?.level ?? 2, huntsWitch(z.side as State) ? null : neon(z.species)), z.x, z.z, z.r, time, seed); }
  }
}

/** Puts a telegraph's shape where what it follows is now (SHAPE, LIVE); false if what it follows is gone. */
function place(t: Telegraph, g: Game, S: SpellState): boolean {
  const s = t.shape, F = t.follows;
  SHAPE.type = s.type; SHAPE.x = s.x; SHAPE.z = s.z; SHAPE.x2 = s.x2; SHAPE.z2 = s.z2; SHAPE.r = s.r; SHAPE.inner = s.inner; SHAPE.width = s.width; SHAPE.angle = s.angle; SHAPE.heading = s.heading; SHAPE.points = s.points; SHAPE.y = undefined;
  if (F?.body !== undefined) { const b = S.bodies.find(q => q.id === F.body); if (!b || !b.alive) return false; const dx = b.x - s.x, dz = b.z - s.z; SHAPE.x = b.x; SHAPE.z = b.z; if (s.x2 !== undefined) { SHAPE.x2 = s.x2 + dx; SHAPE.z2 = (s.z2 ?? s.z) + dz; } }
  else if (F?.creature !== undefined) { const c = g.creatures[F.creature]; if (c && !c.gone) { const dx = c.x - s.x, dz = c.z - s.z; SHAPE.x = c.x; SHAPE.z = c.z; if (s.x2 !== undefined && F.end === undefined) { SHAPE.x2 = s.x2 + dx; SHAPE.z2 = (s.z2 ?? s.z) + dz; } } }
  if (F?.end !== undefined) { const c = g.creatures[F.end]; if (c && !c.gone) { SHAPE.x2 = c.x; SHAPE.z2 = c.z; SHAPE.y = 1.4; } }
  if (t.kind === "lockOn") { const w = g.witch; SHAPE.x = w.x; SHAPE.z = w.z; SHAPE.y = 1.8; }
  return true;
}

/** Whether (x, z) is in a zone's shape (for its tiles). */
function insideZone(z: SpellState["zones"][number], x: number, q: number): boolean {
  const dx = x - z.x, dz = q - z.z, d = Math.hypot(dx, dz);
  if (z.shape === "ring" || z.shape === "donut") return d >= z.inner && d <= z.r;
  if (z.shape === "cone") { let da = Math.atan2(dz, dx) - z.heading; da = ((da + Math.PI * 3) % (Math.PI * 2)) - Math.PI; return d <= z.r && Math.abs(da) <= (z.angle * Math.PI) / 360; }
  if (z.shape === "polygon" && z.points) { const P = z.points, n = P.length >> 1; let inside = false; for (let i = 0, j = n - 1; i < n; j = i++) { const xi = P[i * 2], zi = P[i * 2 + 1], xj = P[j * 2], zj = P[j * 2 + 1]; if (zi > q !== zj > q && x < ((xj - xi) * (q - zi)) / (zj - zi) + xi) inside = !inside; } return inside; }
  return d <= z.r;
}
