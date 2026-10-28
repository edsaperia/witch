// The leash itself (render/leash.ts): the sigil stack over her hat, the bond to each leashed creature (its glow, sparks, travel
// route and the thread under strain), and her broom straining under the sigils' weight (render/load.ts).
import * as THREE from "three";
import { leashPoint, stackOrder } from "../../rules/leash";
import { hash2 } from "../../rules/random";
import { LOAD_DEFAULT } from "../load";
import type { LeashView } from "../leash";
import { easeRoute } from "../routeEase";
import { DISC } from "./glyphs";
import { dotAt, drawEmbers, rankKnobs, rankOf, ranksOn, shownDots, youthDots } from "./ranks";
import { meterHits } from "../../rules/game";

/** A 💧's blue, for its dots in her stack. */
const DROP_RGB: [number, number, number] = [0.42, 0.68, 1];

/** Seconds a travelling animal's drawn route takes to settle onto a re-plan (render/routeEase.ts). */
const ROUTE_EASE = 0.3;

/** A stacked sigil's key in the view's maps: a creature's id, a carried relic's -(id + 1). */
export const stackKey = (kind: "creature" | "relic", id: number): number => (kind === "relic" ? -(id + 1) : id);

/** The stack above her hat: newest at the bottom. A chain of springs: each sigil follows the one below with lag, so the stack
 *  trails behind her flight in proportion to speed, overshoots when she stops or turns, and settles into a gentle idle sway;
 *  higher ones swing more. A carried relic's sigil (the flask, in gold) is one of the chain in its place (Ed's playtest,
 *  2026-10-08: "Flasks should ... sit in the stack, and cycle when it cycles"; rules/leash.ts stackOrder), as big as an adult's,
 *  with a soft halo and a slow twinkle. Returns where each stacked creature's sigil is drawn (the bond's threads start there). */
export function drawStack(lv: LeashView, time: number, hatTop: number, dot: number[]): Map<number, THREE.Vector3> {
  const g = lv.game, s = g.leash, t = g.tuning, w = g.witch;
  const S = t.stack, dt = Math.min(0.1, Math.max(0, time - lv.lastTime)), slotPos = new Map<number, THREE.Vector3>();
  const LV = lv.load, LT = t.load ?? LOAD_DEFAULT;
  lv.lastTime = time;
  const order = stackOrder(s), keys = new Set(order.map(it => stackKey(it.kind, it.id)));
  // Its sigils more visible (Ed, 2026-10-15: "more opacity, and never obscured by scenery"): drawn over the scenery (stack.over: no
  // depth test, after the see-through pass), brighter (stack.bright, in the batch's gain), each over a near-black disc (stack.backing).
  const batch = S.over ?? true ? lv.stackGlyphs : lv.standing, back = S.backing ?? 0, backUv = back > 0 ? lv.uv(DISC) : null;
  const ranks = ranksOn(t), RK = rankKnobs(t);
  while (lv.chain.length < order.length) lv.chain.push({ x: 0, z: 0, vx: 0, vz: 0 });
  let below = { x: 0, z: 0 }, y = hatTop;
  for (const id of [...lv.stackY.keys()]) if (!keys.has(id)) lv.stackY.delete(id);
  for (let k = order.length - 1; k >= 0; k--) {
    const it = order[k], relic = it.kind === "relic", key = stackKey(it.kind, it.id), j = order.length - 1 - k, link = lv.chain[j]; // j: 0 at the bottom
    const c = relic ? null : g.creatures[it.id], sg = c ? lv.sigilOf(c) : null;
    const size = c ? (2 + c.level * 0.4) * S.scale * sg!.scale : 4.2 * S.scale; // (a relic's: half again an adult's size, Ed 2026-10-09: "+50% in the stack"; an adult's before, his playtest 2026-10-07)
    const idle = Math.sin(time * 1.7 + j * 0.9) * S.idleSway * (1 + j * 0.5) * (1 - 0.6 * LV.load);
    // (under a load it leans toward the pull, each sigil a little further: render/load.ts)
    const lean = LT.stackLean * LV.load;
    const tx = below.x - w.vx * S.trail + idle + LV.dx * lean, tz = below.z - w.vz * S.trail + LV.dz * lean;
    link.vx += ((tx - link.x) * S.stiffness - link.vx * S.damping) * dt; link.vz += ((tz - link.z) * S.stiffness - link.vz * S.damping) * dt;
    link.x += link.vx * dt; link.z += link.vz * dt;
    below = link;
    y += ((j === 0 ? S.offset * size : S.gap * size) + size / 2) * (1 - LT.stackSag * LV.load); // (and sags, its gaps closing)
    // Each sigil eases to its height in the stack, so when the cycle button sends the bottom one
    // to the top (Ed, 2026-10-04) it rises past the others and they settle down a place.
    const rel = y - hatTop, had = lv.stackY.get(key), sy = had === undefined ? rel : had + (rel - had) * (1 - Math.exp(-dt * 9));
    lv.stackY.set(key, sy);
    const pos = new THREE.Vector3(w.x + link.x, hatTop + sy, w.z + link.z);
    y += size / 2;
    let col: { r: number; g: number; b: number };
    const shade = ranks && c ? lv.shadeOf(sg!.uv) : null;
    if (shade) lv.stackBack.add(pos.x, pos.y, pos.z, size, shade, 0.02, 0.02, 0.035, back); // (a rank sigil's: the dark in its own shape, no disc)
    else if (backUv) lv.stackBack.add(pos.x, pos.y, pos.z, size * (S.backSize ?? 1.3), backUv, 0.02, 0.02, 0.035, back); // (the dark disc behind it)
    if (c) {
      slotPos.set(it.id, pos);
      col = lv.colOf(c);
      // (No flicker when she's hurt: Ed, 2026-10-08, "When you're hurt, your leashes sigils flash - please turn this off"; her
      // claw slashes say how hurt she is.)
      batch.add(pos.x, pos.y, pos.z, size, sg!.uv, col.r, col.g, col.b, 1);
      if (ranks) {
        // Rank sigils (render/leash/ranks.ts): embers off its glyph, fewer and lower than on the ground; and a youth's dots off to
        // the right of it, two rows, one a berry it eats on the move: bright eaten, dim not, all of them pulsing when it's ready.
        drawEmbers(batch, dot, lv.glyphPts.get(`${sg!.uv[0]},${sg!.uv[1]}`) ?? [], pos.x, pos.y, pos.z, size, false, rankOf(c), [col.r, col.g, col.b], time, it.id * 3 + 1, RK.embers, RK.embers.stack);
        // (the berries' dots in the berries' own colour, and on the left its 💧s in blue: Ed, 2026-10-28, rules/orbit.ts)
        const drops = c.drops ? meterHits(t)[Math.min(3, c.level)] ?? 4 : 0;
        const dotSets: [{ n: number; lit: number }, number, [number, number, number]][] = [
          [shownDots(youthDots(c, g.berries.fed.get(c.id) ?? 0, t), RK.dotsPerRow), 1, lv.berryRgb],
          [shownDots({ n: drops, lit: Math.ceil((c.drops ?? 0) * drops - 1e-6) }, RK.dotsPerRow), -1, DROP_RGB],
        ];
        for (const [D, side, rgb] of dotSets) if (D.n > 0) {
          const ready = side > 0 && D.lit >= D.n, beat = ready ? 0.65 + 0.35 * Math.sin(time * 6) : 1, ds = size * 0.24;
          for (let i = 0; i < D.n; i++) {
            const q = dotAt(i, D.n, RK.dotsPerRow), qx = q.x * side, on = i < D.lit, k = on ? (ready ? 1.25 * beat : 1) : 0.42;
            if (back > 0) lv.stackBack.add(pos.x + qx * size, pos.y + q.y * size, pos.z, ds * 1.5, dot, 0.02, 0.02, 0.035, back);
            const lit = on ? 0.3 : 0; // (lit ones toward white a little, so they read over the dim)
            batch.add(pos.x + qx * size, pos.y + q.y * size, pos.z + 0.02, ds, dot, (rgb[0] + (1 - rgb[0]) * lit) * k, (rgb[1] + (1 - rgb[1]) * lit) * k, (rgb[2] + (1 - rgb[2]) * lit) * k, on ? 1 : 0.85);
          }
        }
      }
    } else {
      const slot = lv.slotOf("relic", 0), tw = 0.88 + 0.12 * Math.sin(time * 3 + it.id);
      col = lv.colours.get("relic")!;
      if (lv.haloGain > 0) batch.add(pos.x, pos.y, pos.z, size * 1.6, dot, col.r, col.g, col.b, 0.22 * tw * lv.haloGain); // (its halo)
      batch.add(pos.x, pos.y, pos.z, size, lv.uv(slot), col.r * tw, col.g * tw, col.b * tw, 1);
    }
    const cyc = lv.cycledAt.get(key);
    if (cyc !== undefined) {
      const q = (time - cyc) / 0.45;
      if (q >= 1 || q < 0) lv.cycledAt.delete(key);
      else batch.add(pos.x, pos.y, pos.z, size * (2 + q * 1.6), dot, col.r, col.g, col.b, 0.75 * (1 - q)); // (its flare: a halo of its neon, opening and fading)
    }
  }
  lv.lastSlots = slotPos;
  return slotPos;
}

/** The bond: each leashed creature's glow at its feet, its sparks flowing back to its leash point, its travel route as a
 *  dotted line, and the thread under strain (and under a load, sooner, taut and brighter: render/load.ts). */
/** A pulled-down take-off's flash (Ed's playtest, v3893: "Indication that your leashed animals are stopping you from taking
 *  off should be the leashes of the (non-baby) animals flashing to complete lines (not dotted lines)"): the spans, in seconds
 *  after the "grounded" leash event, while the leashes of the followers that weigh her down are drawn whole, two flashes
 *  and back to dotted. */
export const GROUNDED_FLASH: readonly (readonly [number, number])[] = [[0, 0.22], [0.32, 0.62]];
export const groundedSolid = (s: number): boolean => GROUNDED_FLASH.some(([a, b]) => s >= a && s < b);

export function drawBond(lv: LeashView, time: number, slotPos: Map<number, THREE.Vector3>, dot: number[]): void {
  const g = lv.game, s = g.leash, t = g.tuning, w = g.witch, B = t.bond, L = t.leash;
  const leashed = [...s.stack, ...s.placed.map(p => p.id)];
  // Her weight shown by the leashes themselves: when she tries to take off with followers too heavy (the "grounded" leash
  // event, rules/leashWeight.ts groundedBy), the leashes of those that count (following her, not babies) flash from dotted
  // to solid, taut lines as they pull her back down (GROUNDED_FLASH), then back.
  for (const e of g.leashEvents) if (e.kind === "grounded") lv.tugAt = e.at;
  const solid = groundedSolid(time - lv.tugAt);
  for (const id of leashed) {

    const c = g.creatures[id], col = ranksOn(t) ? lv.colOf(c) : lv.colours.get(c.species); // (rank sigils: the rank's colour, ranks.ts)
    if (!col || c.level === 0) continue; // (no leash drawn for a baby: Ed, 2026-10-11)
    const lp = leashPoint(s, id, w.x, w.z)!;
    if (B.rim) lv.flat.add(c.x, 0, c.z, 1.8, dot, col.r, col.g, col.b, 0.35);
    const from = slotPos.get(id) ?? new THREE.Vector3(lp.x, 0.2, lp.z);
    if (B.sparks) {
      const period = Math.max(0.5, B.sparkEvery), ph = (time + ((id * 0.618) % 1) * period) % period;
      if (ph < 0.7) {
        // From the creature back to the leash point (Ed: the dots flow towards you).
        const k = 1 - ph / 0.7;
        lv.standing.add(from.x + (c.x - from.x) * k, from.y + (0.6 - from.y) * k + Math.sin(k * Math.PI) * 1.2, from.z + (c.z - from.z) * k, 0.35, dot, col.r, col.g, col.b, 1);
      }
    }
    // Travelling (rules/travel.ts; Ed, 2026-10-05: "the 'leash' graphic could become their travel
    // path"): the leash runs along its route to her or its sigil, a dotted line on the ground
    // flowing that way, shortening as it walks; joining her posse again, a pop and back to the thread.
    const was = lv.travelling.get(id) ?? false;
    if (was && !c.travelling) { lv.fx.push({ kind: "ring", x: c.x, y: 0, z: c.z, at: time, life: 0.5, r: col.r, g: col.g, b: col.b, seed: 0, size: 2.4, n: 18, dot: 0.6 }); lv.fx.push({ kind: "spark", x: c.x, y: 1, z: c.z, at: time, life: 0.5, r: col.r, g: col.g, b: col.b, seed: id * 7 + time, size: 2 }); }
    lv.travelling.set(id, !!c.travelling);
    if (!c.travelling || !c.route) lv.routes.delete(id);
    if (c.travelling && c.route) {
      // (bigger from the treetops, where the camera is far off and the routes run far)
      const up = w.mode === "treetop", rd = up ? 1.8 : 0.45, gap = up ? 5 : 2.2, hi = up ? 0.35 : 0; // (and lighter, to show over dark crowns)
      const R = c.route, plan = [{ x: c.x, z: c.z }, ...R.points.slice(Math.min(R.next, R.points.length - 1), -1), { x: lp.x, z: lp.z }], flow = (time * 3) % gap;
      // (eased: a re-plan's new bend glides in over ROUTE_EASE seconds rather than jumping; Ed, 2026-10-06)
      const eased = easeRoute(lv.routes.get(id), plan, time, ROUTE_EASE, lv.routeScratch), way = eased.line;
      lv.routes.set(id, eased.shape);
      let carry = gap - flow;
      for (let i = 1; i < way.length; i++) {
        const a = way[i - 1], b = way[i], seg = Math.hypot(b.x - a.x, b.z - a.z);
        let u = carry;
        for (; u < seg; u += gap) { const k = u / seg; const px = a.x + (b.x - a.x) * k, pz = a.z + (b.z - a.z) * k; lv.flat.add(px, 0, pz, rd, dot, col.r, col.g, col.b, 0.85); if (up) lv.over.add(px, 0.3, pz, rd * 0.8, dot, col.r + (1 - col.r) * hi, col.g + (1 - col.g) * hi, col.b + (1 - col.b) * hi, 0.9); } // (from the treetops it shows through the crowns, as the ley lines do)
        carry = u - seg; // (the spacing carries on round the corner)
      }
      continue;
    }
    const d = Math.hypot(c.x - lp.x, c.z - lp.z);
    // (under a load, carried leashes show sooner, taut and brighter: render/load.ts)
    const carried = s.stack.includes(id), whole = carried && solid;
    const ld = carried ? lv.load.load : 0, LT2 = t.load ?? LOAD_DEFAULT, from0 = 0.85 - (0.85 - LT2.threadFrom) * ld;
    if (B.thread && (d > L.length * from0 || whole)) {
      // (flashing whole: taut, its dots close enough to touch, standing still; Ed's playtest, v3893)
      const len = Math.hypot(d, from.y), strain = whole ? 1 : Math.min(1, (d - L.length * from0) / L.length + ld * 0.5);
      const n = whole ? Math.min(240, Math.max(8, Math.ceil(len / 0.12))) : Math.min(60, Math.max(8, Math.floor(len / 1.2))), lit = 1 + LT2.threadBright * ld + (whole ? 0.6 : 0);
      // An upward bow (Ed: "arc upwards a little"), high while it's slack and flattening to a near-straight line as it
      // goes taut (Ed, 2026-10-06: "The curve on slack leashes should be higher than it is now"), and the dots march from
      // the creature to the leash point.
      const arc = Math.min(B.threadArcMax, d * (B.threadArcTaut + (B.threadArcSlack - B.threadArcTaut) * (1 - strain)));
      for (let i = 1; i < n; i++) {
        const k = whole ? i / n : (i + 1 - (time * 2) % 1) / n;
        if (k >= 1) continue;
        lv.standing.add(from.x + (c.x - from.x) * k, from.y + (0.5 - from.y) * k + Math.sin(k * Math.PI) * arc, from.z + (c.z - from.z) * k, whole ? 0.3 : 0.22 * (1 + 0.6 * ld), dot, Math.min(1, col.r * lit), Math.min(1, col.g * lit), Math.min(1, col.b * lit), Math.min(1, 0.25 + 0.75 * strain));
      }
    }
  }
}

/** Her broom straining under a load (render/load.ts): sparks splaying back from its bristles, more the heavier; and over
 *  the treetops, sinking, a few sparks falling away below her. Each a fixed loop by its index, so nothing is made per frame. */
export function drawStrain(lv: LeashView, time: number, dot: number[]): void {
  const LV = lv.load, LT = lv.game.tuning.load ?? LOAD_DEFAULT, b = lv.bristle, w = lv.game.witch;
  if (!b.on || LV.load <= 0.02) return;
  const sp = Math.hypot(w.vx, w.vz), bx = sp > 0.3 ? -w.vx / sp : -LV.dx, bz = sp > 0.3 ? -w.vz / sp : -LV.dz;
  const n = Math.min(24, Math.round(LT.sparks * LV.load));
  for (let i = 0; i < n; i++) {
    const life = 0.35 + 0.25 * hash2(i, 1, 41), k = ((time / life) + hash2(i, 2, 41)) % 1, side = (hash2(i, 3, 41) - 0.5) * 2;
    const r = 0.25 + k * (0.9 + 0.6 * LV.load), fan = side * (0.5 + 0.7 * LV.load);
    lv.standing.add(b.x + (bx - bz * fan) * r, b.y - 0.1 + side * 0.15 * k - 0.4 * k * k, b.z + (bz + bx * fan) * r, 0.16, dot, 1, 0.78, 0.42, (1 - k) * 0.9);
  }
  if (LV.sinking > 0.02) {
    const m = Math.round(10 * LV.sinking);
    for (let i = 0; i < m; i++) {
      const k = ((time / 1.3) + hash2(i, 5, 43)) % 1, a = hash2(i, 6, 43) * Math.PI * 2, r = 0.4 + 0.8 * hash2(i, 7, 43);
      lv.over.add(w.x + Math.cos(a) * r, b.y - 0.3 - k * 3.5, w.z + Math.sin(a) * r, 0.22, dot, 1, 0.85, 0.55, (1 - k) * LV.sinking);
    }
  }
}
