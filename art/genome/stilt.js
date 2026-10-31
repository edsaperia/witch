// Optional Stiltwalkers extraction. Reuse authored limb cones and foot volumes; none of this
// changes the ordinary creature bake. Wings, pincers and antennae are never walking legs.
import { M } from "../core.js";

const LEG_PLANS = new Set(["owl", "penguin", "raven", "heron", "hedgehog", "toad", "troll", "mole", "armadillo", "beetle", "scarab", "woodlouse", "scorpion", "crab", "spider", "dragonfly", "bat", "moth", "sentinel"]);
const MANY = new Set(["beetle", "scarab", "woodlouse", "scorpion", "crab", "spider", "dragonfly"]);
const BIRDS = new Set(["owl", "penguin", "raven", "heron"]);
const dist = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const mid = (a, b) => a.map((v, i) => (v + b[i]) / 2);
const centre = q => q.c ?? mid(q.a, q.b);
const radius = q => Math.max(...(q.r ?? q.h ?? [q.r1, q.r2]));

/** Captured geometry only: exported so all species/levels can be checked without rasterising atlases. */
export function stiltSkeleton(m, plan) {
  if (!LEG_PLANS.has(plan)) return null;
  const legs = [], used = new Set();
  const add = (points, rs, mat, primitives = [], footRadius = rs.at(-1)) => {
    const hip = points[0].slice(), foot = points.at(-1).slice(), knee = (points.length > 2 ? points[1] : mid(hip, foot)).slice();
    const i = legs.length, side = Math.sign(plan === "crab" ? hip[0] : hip[2]) || (i % 2 ? 1 : -1);
    const name = `stiltLeg${i}`;
    legs.push({ name, fore: hip[0] >= 0, side, hip, knee, ...(points.length > 3 ? { hock: points[points.length - 2].slice() } : {}), foot, r: [rs[0], rs.length > 2 ? rs[1] : (rs[0] + rs.at(-1)) / 2, rs.at(-1)], fl: footRadius, mat, hoof: false });
    for (const q of primitives) { q.part = name; used.add(q); }
  };
  // A connected cone chain has exact shared endpoints (Model.chain); taking only the builders'
  // walking-limb groups excludes wings (10+), antennae (9+) and crab/scorpion pincers (5/6).
  const groups = MANY.has(plan) ? [2, 7] : [2, 6, 7];
  const cones = m.parts.filter(q => q.type === "cone" && !q.extra && groups.includes(q.group));
  const chains = [];
  const pending = new Set(cones);
  while (pending.size) {
    let first = [...pending].find(q => ![...pending].some(p => p !== q && dist(p.b, q.a) < 1e-6)) ?? [...pending][0];
    const chain = [first]; pending.delete(first);
    while (true) { const next = [...pending].find(q => dist(chain.at(-1).b, q.a) < 1e-6); if (!next) break; pending.delete(next); chain.push(next); }
    chains.push(chain);
  }
  if (MANY.has(plan)) {
    for (const chain of chains) add([chain[0].a, ...chain.map(q => q.b)], [chain[0].r1, ...chain.map(q => q.r2)], chain[0].mat, chain);
  } else {
    const anchors = [...(m.anchors.feet ?? [])];
    // The mole's spade hands are real front feet, but the ordinary shoe anchors name only its rear pair.
    if (plan === "mole") for (const side of [-1, 1]) {
      const hand = m.parts.filter(q => q.type === "ell" && q.group === (side > 0 ? 7 : 2) && q.c[0] > 0 && Math.sign(q.c[2]) === side).sort((a, b) => radius(b) - radius(a))[0];
      if (hand) anchors.push({ c: hand.c, r: radius(hand), group: hand.group });
    }
    for (const anchor of anchors) {
      const candidates = chains.filter(c => !used.has(c[0])).sort((a, b) => dist(a.at(-1).b, anchor.c) - dist(b.at(-1).b, anchor.c));
      const chain = candidates[0], nearby = chain && dist(chain.at(-1).b, anchor.c) < Math.max(.13, anchor.r * 1.6);
      if (nearby) {
        add([chain[0].a, ...chain.map(q => q.b)], [chain[0].r1, ...chain.map(q => q.r2)], chain[0].mat, chain, anchor.r);
      } else {
        // Short tucked limbs are ellipsoids, not chains: derive their root from the authored
        // volume's upper surface. This includes penguin feet and a toad's folded hind thigh.
        const foot = m.parts.filter(q => q.type === "ell" && !used.has(q) && groups.includes(q.group) && Math.sign(q.c[2]) === Math.sign(anchor.c[2])).sort((a, b) => dist(a.c, anchor.c) - dist(b.c, anchor.c))[0];
        if (!foot || dist(foot.c, anchor.c) > Math.max(.18, anchor.r * 2)) continue;
        const limb = [foot];
        if (plan === "toad") {
          const thigh = m.parts.find(q => q.type === "ell" && q !== foot && groups.includes(q.group) && Math.sign(q.c[2]) === Math.sign(anchor.c[2]) && q.c[0] < 0 && q.c[1] > foot.c[1]);
          if (thigh) limb.push(thigh);
        }
        const root = limb.at(-1), vertical = root.r.reduce((sum, r, i) => sum + (r * root.axes[i][1]) ** 2, 0) ** .5;
        const hip = [root.c[0], root.c[1] + vertical * .7, root.c[2]], knee = limb.length > 1 ? root.c : mid(hip, anchor.c);
        add([hip, knee, anchor.c], [Math.max(.02, Math.min(radius(root), anchor.r)), anchor.r * .75, anchor.r * .5], root.mat, limb, anchor.r);
      }
      // Remove the existing toes/foot pads from the raised body, including the heron's separately
      // grouped toes; they are represented by the rig's tapered foot, not left floating below it.
      const leg = legs.at(-1);
      for (const q of m.parts) if (!used.has(q) && q.group !== 0 && (groups.includes(q.group) || plan === "heron" && q.group >= 20 && q.group <= 27)) {
        const c = centre(q);
        if (c[1] <= anchor.c[1] + Math.max(.06, anchor.r) && dist(c, anchor.c) < Math.max(.16, anchor.r * 2.2)) { q.part = leg.name; used.add(q); }
      }
    }
  }
  // These two flying models omit tucked limbs entirely. The optional trip supplies anatomically
  // placed attachment joints only; ordinary art remains unchanged (bat two hind legs, moth six).
  if (!legs.length && (plan === "bat" || plan === "moth")) {
    for (const side of [-1, 1]) for (let i = 0; i < (plan === "bat" ? 1 : 3); i++) {
      const x = plan === "bat" ? -.06 : .1 - i * .08, z = side * (plan === "bat" ? .08 : .045);
      add([[x, .48, z], [x - .02, .42, z * 1.3], [x + .02, .36, z * 1.6]], plan === "bat" ? [.025, .018, .01] : [.012, .009, .005], M.BODY3);
    }
  }
  if (!legs.length) return null;
  const head = m.anchors.head, H = head?.c ?? [0, .3, 0], nb = m.anchors.neck?.c ?? H;
  const body = m.parts.filter(q => q.type === "ell" && !used.has(q) && !q.extra && q.group !== 0).sort((a, b) => radius(b) - radius(a))[0];
  for (const q of [...m.parts, ...m.flats]) if (!used.has(q)) {
    if (q.group === 0) { q.part = "ground-shadow"; continue; }
    // Keep the body's largest mass and wing planes intact. Head-local volumes and existing
    // head-labelled expression/party gear move with the skull rather than being rebaked as new art.
    const wing = BIRDS.has(plan) && [2, 4].includes(q.group) || plan === "bat" && q.group === 11;
    const c = centre(q), local = head && q !== body && q.type && !wing && Math.hypot(...c.map((v, i) => (v - H[i]) / Math.max(.04, head.r[i] * 1.8))) < 1.4;
    q.part = q.part === "head" || local ? "head" : "body";
  }
  const top = Math.max(...m.parts.filter(q => !used.has(q) && q.group !== 0).map(q => centre(q)[1] + radius(q)));
  const xs = m.parts.filter(q => !used.has(q) && !q.extra).map(q => centre(q)[0]);
  m.rig = { legs, head: { nb: nb.slice(), H: H.slice() }, tail: [0, 0, 0], top, len: Math.max(.3, Math.max(...xs) - Math.min(...xs)), bw: .3 };
  return m.rig;
}
