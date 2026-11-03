// The leash itself (render/leash.ts): the sigil stack over her hat, the bond to each leashed creature (its glow, sparks, travel
// route and the thread under strain), and her broom straining under the sigils' weight (render/load.ts).
import * as THREE from "three";
import { leashPoint, stackOrder } from "../../rules/leash";
import { AT_END, chainLength, chainShown, weighingChains } from "../../rules/chains";
import { buffsOf, pipCount, pipFading, pipFuel } from "../../rules/buffs";
import { buffIconUv, ICON_BLUE, ICON_PINK, iconTwinkle } from "./buffIcons";
import { AMBER } from "./glyphs";
import type { LeashView } from "../leash";
import renderKnobs from "../../../config/playtest-render.json";
import { sigilPath, travelPose } from "./travelPose";
import { easeRoute } from "../routeEase";
import { drawChain, rattleChain, stepChain, type Chain } from "./chain";
import { DISC } from "./glyphs";
import { chainKnobs, dotAt, drawEmbers, legendShine, rankKnobs, rankOf, rankSize, ranksOn, standScale, shownDots, youthDots } from "./ranks";
import { meterHits } from "../../rules/game";

/** A 💧's blue, for its dots in her stack. */
const DROP_RGB: [number, number, number] = [0.42, 0.68, 1];

/** Seconds a travelling animal's drawn route takes to settle onto a re-plan (render/routeEase.ts). */
const ROUTE_EASE = 0.3;

/** A stacked sigil's key in the view's maps: a creature's id, a carried relic's -(id + 1). */
export const stackKey = (kind: "creature" | "relic" | "tether", id: number): number => (kind === "relic" ? -(id + 1) : kind === "tether" ? -(id + 1e6) : id);

/** The stack above her hat: newest at the bottom. A chain of springs: each sigil follows the one below with lag, so the stack
 *  trails behind her flight in proportion to speed, overshoots when she stops or turns, and settles into a gentle idle sway;
 *  higher ones swing more. A carried relic's sigil (the flask, in gold) is one of the chain in its place (Ed's playtest,
 *  2026-10-08: "Flasks should ... sit in the stack, and cycle when it cycles"; rules/leash.ts stackOrder), as big as an adult's,
 *  with a soft halo and a slow twinkle. Returns where each stacked creature's sigil is drawn (the bond's threads start there). */
export function drawStack(lv: LeashView, time: number, hatTop: number, dot: number[]): Map<number, THREE.Vector3> {
  const g = lv.game, s = g.leash, t = g.tuning, w = g.witch;
  const S = t.stack, dt = Math.min(0.1, Math.max(0, time - lv.lastTime)), slotPos = new Map<number, THREE.Vector3>();
  lv.lastTime = time; lv.frameDt = dt;
  // (a sleeping legend's sigil she carries, its tether's: at the bottom of her stack, never cycled; rules/stoneStacks.ts)
  const order: { kind: "creature" | "relic" | "tether"; id: number }[] = [...stackOrder(s), ...(s.tether && g.creatures[s.tether.id] ? [{ kind: "tether" as const, id: s.tether.id }] : [])];
  const keys = new Set(order.map(it => stackKey(it.kind, it.id)));
  // Its sigils more visible (Ed, 2026-10-15: "more opacity, and never obscured by scenery"): drawn over the scenery (stack.over: no
  // depth test, after the see-through pass), brighter (stack.bright, in the batch's gain), each over a near-black disc (stack.backing).
  const batch = S.over ?? true ? lv.stackGlyphs : lv.standing, back = S.backing ?? 0, backUv = back > 0 ? lv.uv(DISC) : null;
  const ranks = ranksOn(t), RK = rankKnobs(t);
  const buffs = buffsOf(s.stack, g.creatures, g.berries, t); // (her follower buffs: rules/buffs.ts; an adult's pips and each kind's icon, below)
  while (lv.chain.length < order.length) lv.chain.push({ x: 0, z: 0, vx: 0, vz: 0 });
  let below = { x: 0, z: 0 }, y = hatTop;
  for (const id of [...lv.stackY.keys()]) if (!keys.has(id)) lv.stackY.delete(id);
  for (let k = order.length - 1; k >= 0; k--) {
    const it = order[k], relic = it.kind === "relic", key = stackKey(it.kind, it.id), j = order.length - 1 - k, link = lv.chain[j]; // j: 0 at the bottom
    const c = relic ? null : g.creatures[it.id], sg = c ? lv.sigilOf(c) : null;
    const size = c ? (ranks ? (2 + 2 * 0.4) * rankSize(t, rankOf(c)) * standScale(t) : 2 + c.level * 0.4) * S.scale * sg!.scale : 4.2 * S.scale; // (rank sigils: an adult's size, a rank's share of it, Ed 2026-10-28) // (a relic's: half again an adult's size, Ed 2026-10-09: "+50% in the stack"; an adult's before, his playtest 2026-10-07)
    const idle = Math.sin(time * 1.7 + j * 0.9) * S.idleSway * (1 + j * 0.5);
    const tx = below.x - w.vx * S.trail + idle, tz = below.z - w.vz * S.trail;
    link.vx += ((tx - link.x) * S.stiffness - link.vx * S.damping) * dt; link.vz += ((tz - link.z) * S.stiffness - link.vz * S.damping) * dt;
    link.x += link.vx * dt; link.z += link.vz * dt;
    below = link;
    y += (j === 0 ? S.offset * size : S.gap * size) + size / 2;
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
      batch.add(pos.x, pos.y, pos.z, size, sg!.uv, col.r, col.g, col.b, 1, 1, false, ranks ? legendShine(rankOf(c), time, it.id) : 0); // (a legend's shiny: ranks.ts)
      if (ranks) {
        // Rank sigils (render/leash/ranks.ts): embers off its glyph, fewer and lower than on the ground; and a youth's dots off to
        // the right of it, two rows, one a berry it eats on the move: bright eaten, dim not, all of them pulsing when it's ready.
        drawEmbers(batch, dot, lv.glyphPts.get(`${sg!.uv[0]},${sg!.uv[1]}`) ?? [], pos.x, pos.y, pos.z, size, false, rankOf(c), [col.r, col.g, col.b], time, it.id * 3 + 1, RK.embers, RK.embers.stack);
        // (the berries' dots in the berries' own colour, and on the left its 💧s in blue: Ed, 2026-10-28, rules/orbit.ts)
        const drops = c.drops ? meterHits(t)[Math.min(3, c.level)] ?? 4 : 0;
        // (an adult's berry pips the same way, Ed 2026-11-03: "shown in the sigil bar the same way as a youth growing up"; the draining
        // one twinkling in its last buffs.pips.warn seconds: rules/buffs.ts)
        const fuel = c.level === 2 && t.buffs ? pipFuel(g.berries, c.id, t) : 0, pips = c.level === 2 && t.buffs ? { n: t.buffs.pips.max, lit: pipCount(fuel, t) } : null;
        const fading = !!pips && pipFading(fuel, t), twinkle = 0.35 + 0.65 * Math.abs(Math.sin(time * 9));
        const dotSets: [{ n: number; lit: number }, number, [number, number, number]][] = [
          [shownDots(pips ?? youthDots(c, g.berries.fed.get(c.id) ?? 0, t), RK.dotsPerRow), 1, lv.berryRgb],
          [shownDots({ n: drops, lit: Math.ceil((c.drops ?? 0) * drops - 1e-6) }, RK.dotsPerRow), -1, DROP_RGB],
        ];
        for (const [D, side, rgb] of dotSets) if (D.n > 0) {
          const ready = side > 0 && !pips && D.lit >= D.n, beat = ready ? 0.65 + 0.35 * Math.sin(time * 6) : 1, ds = size * 0.24;
          for (let i = 0; i < D.n; i++) {
            const q = dotAt(i, D.n, RK.dotsPerRow), qx = q.x * side, on = i < D.lit, k = (on ? (ready ? 1.25 * beat : 1) : 0.42) * (side > 0 && fading && i === D.lit - 1 ? twinkle : 1);
            if (back > 0) lv.stackBack.add(pos.x + qx * size, pos.y + q.y * size, pos.z, ds * 1.5, dot, 0.02, 0.02, 0.035, back);
            const lit = on ? 0.3 : 0; // (lit ones toward white a little, so they read over the dim)
            batch.add(pos.x + qx * size, pos.y + q.y * size, pos.z + 0.02, ds, dot, (rgb[0] + (1 - rgb[0]) * lit) * k, (rgb[1] + (1 - rgb[1]) * lit) * k, (rgb[2] + (1 - rgb[2]) * lit) * k, on ? 1 : 0.85);
          }
        }
        // Its buff's icon, to the right of its sigil and its dots (Ed, 2026-11-03: "an icon to the right of the creature's sigil in her
        // stack"; render/leash/buffIcons.ts), on every leashed adult and legend (rules/buffs.ts icons), by its state (iconState; Ed,
        // 2026-11-03: "When you have multiple ones of the same species, the inactive buff icons are blue. When a buff is inactive, it
        // twinkles in pink."): the active one in her magic's amber, a redundant one blue and steady, an unfed one berry pink, twinkling.
        // A legend's three in a row ("A legend should have three buff icons, to show that it's three times as powerful"; iconCount),
        // each a little smaller and closer, so the row stays beside its bigger sigil, level with it, clear of the sigils above and below.
        const group = buffs.iconGroup.get(it.id);
        if (group) {
          const D = dotSets[0][0], m = buffs.iconCount.get(it.id) ?? 1, ix = (D.n > 0 ? dotAt(D.n - 1, D.n, RK.dotsPerRow).x + 0.42 : 0.72) * size;
          const is = size * (m > 1 ? 0.42 : 0.5), gap = is * 0.92, state = buffs.iconState.get(it.id), I = t.buffs?.icons;
          const rgb = state === "redundant" ? I?.blue ?? ICON_BLUE : state === "unfed" ? I?.pink ?? ICON_PINK : [AMBER[0] * 1.2, AMBER[1] * 1.2, AMBER[2] * 1.2];
          const k = state === "unfed" ? iconTwinkle(time, I?.twinkle ?? 0.8, it.id) : 1;
          for (let h = 0; h < m; h++) {
            const x = pos.x + ix + h * gap;
            if (back > 0) lv.stackBack.add(x, pos.y, pos.z, is * 1.25, dot, 0.02, 0.02, 0.035, back);
            batch.add(x, pos.y, pos.z + 0.02, is, buffIconUv(lv, group), rgb[0] * k, rgb[1] * k, rgb[2] * k, 1);
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

/** The bond: each leashed creature's glow at its feet, its sparks flowing back to its leash point, its travel route as
 *  grounded chain links, and the thread under strain (and under a load, sooner, taut and brighter: render/load.ts). */
/** A pulled-down take-off's flash (Ed's playtest, v3893: "Indication that your leashed animals are stopping you from taking
 *  off should be the leashes of the (non-baby) animals flashing to complete lines (not dotted lines)"): the spans, in seconds
 *  after the "grounded" leash event, while the leashes of the followers that weigh her down are drawn whole, two flashes
 *  and back to dotted. */
export const GROUNDED_FLASH: readonly (readonly [number, number])[] = [[0, 0.22], [0.32, 0.62]];
export const groundedSolid = (s: number): boolean => GROUNDED_FLASH.some(([a, b]) => s >= a && s < b);

/** A chain's fade by how far along its length (0 to 1) its far end is: a smoothstep from `from` to 1 (rules/chains.ts chainShown). */
const smoothFade = (r: number, from: number): number => { const f = Math.min(0.999, Math.max(0, from)), x = Math.min(1, Math.max(0, (r - f) / (1 - f))); return x * x * (3 - 2 * x); };

export function drawBond(lv: LeashView, time: number, slotPos: Map<number, THREE.Vector3>, dot: number[]): void {
  const g = lv.game, s = g.leash, t = g.tuning, w = g.witch, B = t.bond, L = t.leash;
  const leashed = [...s.stack, ...s.placed.map(p => p.id)];
  // Her weight shown by the leashes themselves: when she tries to take off with followers too heavy (the "grounded" leash
  // event, rules/leashWeight.ts groundedBy), the chains of those that weigh her down (following her, not babies: rules/chains.ts
  // weighingChains) rattle (Ed, 2026-11-03: "the chains rattle"; rattleChain, leash.chain.rattle), showing while they do; the old
  // threads (?sigils=old) flash from dotted to solid (GROUNDED_FLASH) as before.
  const chains = ranksOn(t), CK = chainKnobs(t), live = new Set<number>(), CL = chainLength(t), CC = t.leash.chain, RT = CC?.rattle;
  for (const e of g.leashEvents) if (e.kind === "grounded") {
    lv.tugAt = e.at;
    if (chains && RT && RT.strength > 0) for (const id of weighingChains(s.stack, g.creatures)) { const ch = lv.chains.get(id); if (ch) ch.rattle = e.at; }
  }
  const solid = groundedSolid(time - lv.tugAt);
  // Follower buffs (Ed, 2026-11-03: "While an animal is buffing her, the chain to its sigil glows"; rules/buffs.ts givers): brighter, breathing.
  const buffing = buffsOf(s.stack, g.creatures, g.berries, t).givers, glow = 0.45 + 0.15 * Math.sin(time * 3);
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
    // path"): the leash hangs from its sigil (in her stack, or placed) down to the ground and lies along its route to it, shortening
    // as it walks (Ed, 2026-11-02: "it should still attach to their sigils, but fall to the ground quickly and become their walking
    // path"; travelPose.ts sigilPath); joining her posse again, it lifts back to the hanging chain.
    const ground = !!c.travelling;
    if (!ground) lv.routes.delete(id);
    const d = Math.hypot(c.x - lp.x, c.z - lp.z);
    const carried = s.stack.includes(id), whole = carried && solid;
    const from0 = 0.85;
    if (chains || ground || lv.chains.get(id)?.pose?.start || lv.chains.get(id)?.pose?.ground) {
      // The leash as a chain (Ed, 2026-10-28; render/leash/chain.ts): links its rank's size, from its sigil in her stack (or its placed
      // sigil) to it, its full length (leash.chain.length: Ed, 2026-11-03, "Chains lie on the floor at full length so you can see how
      // taut they are") lying on the ground. It shows by how far its creature is along its length (rules/chains.ts chainShown: none
      // close, whole and glowing taut, Ed 2026-11-03), so a crowd near her draws nothing; rattling, it shows while it rattles.
      const len = CL > 0 ? CL : Math.hypot(c.x - from.x, 0.5 - from.y, c.z - from.z) * 1.1, n = Math.max(1, Math.ceil(len / Math.max(0.2, CK.segment)));
      const shown0 = CL > 0 ? chainShown(d, t) : 1, taut = carried && CL > 0 && d >= CL - AT_END;
      const link = CK.link[rankOf(c) - 1], ch: Chain = lv.chains.get(id) ?? { links: [] };
      lv.chains.set(id, ch); live.add(id);
      let target, shown = shown0;
      if (ground) {
        const R = c.route;
        const plan = [c, ...(R ? R.points.slice(Math.min(R.next, R.points.length - 1), -1) : []), lp];
        const eased = easeRoute(lv.routes.get(id), plan, time, ROUTE_EASE, lv.routeScratch);
        lv.routes.set(id, eased.shape);
        target = sigilPath(from, eased.line, link, CK.fall);
      } else {
        if (ch.pose?.ground) ch.links = []; // Lift toward a fresh physical chain at the current pins.
        stepChain(ch, n, len / n, from.x, from.y, from.z, c.x, 0.5, c.z, lv.frameDt, CK);
        const age = ch.rattle === undefined ? Infinity : time - ch.rattle;
        if (RT && age >= 0 && age < RT.time) { rattleChain(ch, RT.strength * (age < lv.frameDt * 1.5 ? 1 : 0.2) * (1 - age / RT.time), id + Math.floor(time * 30)); shown = Math.max(shown, 1 - age / RT.time); }
        else ch.rattle = undefined;
        target = ch.links;
      }
      const lit = 1 + (CC?.glow ?? 0.6) * (taut ? 1 : shown0) + (carried && buffing.has(id) ? glow : 0);
      const points = travelPose(ch.pose ??= {}, ground, target, time, renderKnobs.chainTransitionSeconds);
      // The old route showed through crowns from the treetops. Show the link glyphs there too.
      const batch = ground && w.mode === "treetop" ? lv.over : lv.solid;
      drawChain(lv, { links: points }, link, Math.min(1, col.r * lit), Math.min(1, col.g * lit), Math.min(1, col.b * lit), shown, dot, 0.12 * shown, batch);
      continue;
    }
    if (B.thread && (d > L.length * from0 || whole)) {
      // (flashing whole: taut, its dots close enough to touch, standing still; Ed's playtest, v3893)
      const len = Math.hypot(d, from.y), strain = whole ? 1 : Math.min(1, (d - L.length * from0) / L.length);
      const n = whole ? Math.min(240, Math.max(8, Math.ceil(len / 0.12))) : Math.min(60, Math.max(8, Math.floor(len / 1.2))), lit = 1 + (whole ? 0.6 : 0);
      // An upward bow (Ed: "arc upwards a little"), high while it's slack and flattening to a near-straight line as it
      // goes taut (Ed, 2026-10-06: "The curve on slack leashes should be higher than it is now"), and the dots march from
      // the creature to the leash point.
      const arc = Math.min(B.threadArcMax, d * (B.threadArcTaut + (B.threadArcSlack - B.threadArcTaut) * (1 - strain)));
      for (let i = 1; i < n; i++) {
        const k = whole ? i / n : (i + 1 - (time * 2) % 1) / n;
        if (k >= 1) continue;
        lv.standing.add(from.x + (c.x - from.x) * k, from.y + (0.5 - from.y) * k + Math.sin(k * Math.PI) * arc, from.z + (c.z - from.z) * k, whole ? 0.3 : 0.22, dot, Math.min(1, col.r * lit), Math.min(1, col.g * lit), Math.min(1, col.b * lit), Math.min(1, 0.25 + 0.75 * strain));
      }
    }
  }
  // A sleeping legend's sigil she carries (rules/stoneStacks.ts): its tether, a chain of a legend's links times `tether` from its sigil
  // at the bottom of her stack to the legend, as long as she could go from it (its length when she picked it up), so it hangs slack
  // as she comes closer and pulls straight at its end.
  const T = s.tether, TL = T ? g.creatures[T.id] : undefined, tf = T ? slotPos.get(T.id) : undefined;
  if (chains && T && TL && !TL.gone && tf) {
    const link = CK.link[2] * CK.tether, ch = lv.chains.get(T.id) ?? { links: [] }, len = Math.hypot(T.length, tf.y - 0.5), n = Math.max(1, Math.ceil(len / Math.max(link, CK.segment)));
    lv.chains.set(T.id, ch); live.add(T.id);
    const d = Math.hypot(TL.x - tf.x, TL.z - tf.z), col = lv.colOf(TL), held = g.witches[0]?.pinned?.id === T.id;
    // (as every chain: its full length on the ground, showing by how far along it she is, glowing held at its end)
    const shown = smoothFade(d / Math.max(1e-6, T.length), CC?.fadeFrom ?? 0), taut = 1 + (CC?.glow ?? 0.4) * (held ? 1 : shown);
    stepChain(ch, n, len / n, tf.x, tf.y, tf.z, TL.x, 0.5, TL.z, lv.frameDt, CK);
    drawChain(lv, ch, link, Math.min(1, col.r * taut), Math.min(1, col.g * taut), Math.min(1, col.b * taut), held ? 1 : shown, dot, 0.12 * (held ? 1 : shown));
  }
  for (const id of lv.chains.keys()) if (!live.has(id)) { lv.chains.delete(id); lv.routes.delete(id); }
}

