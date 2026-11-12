// What a mesh creature wears and how it lies down (art/mesh/shape.js builds the plan that comes back):
// - dress(plan, gear): a party animal's gear, as art/creatures.js `partyGear` deals it: the leash's collar in its colour, lit; a
//   party hat in one of the three colourways; sunglasses (bar, star, heart: here told apart by their lenses' colour); shoes, its
//   feet in the shoe's colour.
// - napping(plan): the same animal asleep: its legs folded under it, its body on the ground, its head down, its tails laid round,
//   its eyes shut, breathing (a still pose: shape.js `plan.still`).
// A plan says where these go by `anchors` (kit.js `plan` sets them for the four-legged: the skin's neck ring and where its head's
// rings begin); a plan without them is left bare.
import { HAT_COLOURWAYS, SHOE_STYLES } from "../creatures.js";

const LENS = { bar: [24, 18, 34], star: [255, 214, 64], heart: [255, 92, 150] };
const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };

/** `plan` in its party gear: { collar: [r, g, b] or null, hat: 0..2 or null, glasses: "bar" | "star" | "heart" or null, shoes: a
 *  SHOE_STYLES name or null }. */
export function dress(plan, gear) {
  if (!gear) return plan;
  const lofts = [...plan.lofts], cones = [...plan.cones], A = plan.anchors, skin = plan.lofts[0]?.rings ?? [], up = plan.lofts[0]?.up ?? [0, 1, 0];
  if (gear.collar && Array.isArray(gear.collar) && A?.neck != null && skin[A.neck]) {
    const r = skin[A.neck], a = skin[Math.max(0, A.neck - 1)].at, b = skin[Math.min(skin.length - 1, A.neck + 1)].at, d = unit(b.map((v, i) => v - a[i])), w = Math.max(0.01, 0.16 * r.ry);
    lofts.push({ sides: plan.lofts[0].sides ?? 8, up, rings: [[-w, 1.08], [-w / 2, 1.22], [w / 2, 1.22], [w, 1.08]].map(([t, f]) => ({ at: r.at.map((v, i) => v + d[i] * t), rx: r.rx * f * 0.93 + 0.003, ry: r.ry * f * 0.93 + 0.003, bone: r.bone, colour: gear.collar, glow: true, up: r.up })) });
  }
  if (gear.hat != null && A?.skull != null) {
    // a party hat: a cone on the crown of its head, a band round its foot and a tuft at its point
    const head = skin.slice(A.skull), top = head.reduce((best, r) => (r.at[1] + r.ry > best.at[1] + best.ry ? r : best), head[0]), [body, brim, pom] = HAT_COLOURWAYS[gear.hat % HAT_COLOURWAYS.length];
    if (top) { const c = [top.at[0], top.at[1] + top.ry * 0.8, top.at[2]], r = Math.max(0.012, top.rx * 0.6);
      cones.push({ at: c, rx: r, ry: r, tip: [c[0], c[1] + r * 3.2, c[2] - r * 0.5], bone: top.bone, colour: body, tipColour: pom, split: 0.8, up: [0, 0, 1], sides: 6 });
      lofts.push({ sides: 6, up: [0, 0, 1], rings: [[-0.3, 1.1], [0.1, 1.3], [0.5, 1.1]].map(([t, f]) => ({ at: [c[0], c[1] + r * t, c[2]], rx: r * f, ry: r * f, bone: top.bone, colour: brim })) }); }
  }
  if (gear.glasses) for (const e of plan.cones.filter(c => c.tag === "eye")) {
    // a lens over each eye, standing just off it
    const d = unit(e.tip.map((v, i) => v - e.at[i])), R = Math.max(e.rx, e.ry) * 1.5, p = e.at.map((v, i) => v + d[i] * e.rx * 0.9);
    lofts.push({ sides: 6, up: e.up ?? [0, 1, 0], rings: [0, 0.35].map(t => ({ at: p.map((v, i) => v + d[i] * R * t), rx: R, ry: R, bone: e.bone, colour: LENS[gear.glasses] ?? LENS.bar })) });
  }
  if (gear.shoes && SHOE_STYLES[gear.shoes] && plan.gait?.legs?.length) {
    const feet = new Set(plan.gait.legs.map(l => l.bones[2])), [shoe] = SHOE_STYLES[gear.shoes];
    for (let i = 0; i < lofts.length; i++) if (lofts[i].rings.some(r => feet.has(r.bone))) lofts[i] = { ...lofts[i], rings: lofts[i].rings.map(r => (feet.has(r.bone) ? { ...r, colour: shoe } : r)) };
  }
  return { ...plan, lofts, cones };
}

/** `plan` asleep: a still pose (shape.js reads `still`: each bone's turn and shift, and what breathes), its eyes shut. how:
 *  "sphinx" (on its belly, forelegs out, hind legs folded under: the young and the grown), "curl" (on its side, nose to tail, its
 *  legs drawn up and its tails round it: Ed, 2026-11-12, "Most sleeping legends should curl up on their sides") or "shell" (drawn
 *  into its shell, nothing showing: "Snail and turtle sleep in their shells"; a plan says so with gait.sleep). */
export function napping(plan, how = "sphinx") {
  const at = Object.fromEntries(plan.bones.map(([name, p]) => [name, p])), G = plan.gait ?? {}, rots = {}, poss = {}, legs = G.legs ?? [], skin = plan.lofts[0]?.rings ?? [];
  const tails = G.tails ?? (G.tail ? [G.tail] : []), pitch = chain => { const a = at[chain[0]], b = at[chain[chain.length - 1]]; return chain.length > 1 ? Math.atan2(b[1] - a[1], Math.max(1e-6, a[2] - b[2])) : 0; };
  if (how === "shell") {
    // everything soft drawn back under the shell: its head and neck pulled in, its legs folded flat and drawn to its middle, its
    // tail tucked, the shell let down onto the ground; a snail's foot shortened under it and its stalks drawn in
    const mid = at[G.root] ?? [0, 0, 0];
    for (const l of legs) { const [upper, lower, foot] = l.bones, fore = at[upper][2] > mid[2]; rots[upper] = [fore ? 1.2 : -1.2, 0, 0]; rots[lower] = [fore ? -2.3 : 2.3, 0, 0]; rots[foot] = [0, 0, 0]; poss[upper] = [-at[upper][0] * 0.5, 0.02, (mid[2] - at[upper][2]) * 0.45]; }
    if (legs.length) poss[G.root] = [0, -0.92 * Math.min(...legs.map(l => at[l.bones[0]][1])), 0];
    for (const name of [G.neck, G.head, "front", "head"]) if (name && at[name] && !poss[name]) { const parent = plan.bones.find(b => b[0] === name)[2]; if (parent) poss[name] = [0, (at[parent][1] - at[name][1]) * 0.8, (at[parent][2] - at[name][2]) * 0.92]; }
    if (at.tailb) poss.tailb = [0, 0, (mid[2] - at.tailb[2]) * 0.7];
    for (const chain of tails) chain.forEach((bone, i) => { rots[bone] = [i ? 0 : -pitch(chain) - 0.9, 0.5, 0]; });
  } else if (how === "curl" && legs.length) {
    // rolled onto its side, its back bent round so its nose comes to its tail, its legs drawn up to its belly, its tails wrapped
    // forward round it; let down so its flank lies on the ground
    const wide = Math.max(...skin.slice(0, plan.anchors?.skull ?? skin.length).map(r => r.rx));
    rots[G.root] = [0, 0, -1.42]; poss[G.root] = [0, wide * 0.95 - at[G.root][1], 0];
    // (every bone from its hips to its head takes a share of the bend)
    const parent = Object.fromEntries(plan.bones.map(([name, , p]) => [name, p])), spine = []; for (let b = G.head; b && b !== G.root; b = parent[b]) spine.push(b);
    for (const name of spine) rots[name] = [1.9 / Math.max(1, spine.length), 0, 0];
    for (const l of legs) { const [upper, lower, foot] = l.bones, fore = at[upper][2] > at[G.root][2]; rots[upper] = [fore ? 0.75 : -1.0, 0, 0]; rots[lower] = [fore ? -1.5 : 1.7, 0, 0]; rots[foot] = [fore ? 0.6 : -0.6, 0, 0]; }
    for (const chain of tails) chain.forEach((bone, i) => { rots[bone] = [i ? -0.42 : -pitch(chain) - 0.55, 0, 0]; });
  } else {
    if (legs.length) {
      // sphinx-wise: forelegs out in front along the ground, hind legs folded under, the body let down onto them
      for (const l of legs) { const [upper, lower, foot] = l.bones, fore = at[upper][2] > 0;
        const [u, lo, f] = (fore ? G.lie?.fore : G.lie?.hind) ?? (fore ? [-1.3, 0.15, 0.25] : [-0.95, 2.2, -1.25]); // (a plan may say how its own legs fold: gait.lie)
        rots[upper] = [u, 0, 0]; rots[lower] = [lo, 0, 0]; rots[foot] = [f, 0, 0]; }
      poss[G.root] = [0, -0.8 * Math.min(...legs.map(l => at[l.bones[0]][1])), 0];
    }
    if (G.neck) rots[G.neck] = [0.5, 0, 0];
    if (G.head) rots[G.head] = [0.3, 0.15, 0];
    // each tail brought down from where it's carried and laid round its flank
    for (const chain of tails) chain.forEach((bone, i) => { rots[bone] = [i ? -0.05 : -pitch(chain) * 0.85, i ? 0.4 : 0.5, 0]; });
  }
  for (const e of G.ears ?? []) rots[e] = [0.35, 0, 0];
  // (a snail's eye stalks drawn in)
  for (const [name] of plan.bones) if (/^stalk.*1$/.test(name)) rots[name] = [how === "shell" ? -2.2 : -1.1, 0, 0];
  // (in its shell, what stands off its head and its eye stalks is drawn in with them: not there to see)
  const hidden = b => how === "shell" && (/^stalk/.test(b) || b === G.head || b === "head"), lofts = how === "shell" ? plan.lofts.filter((l, i) => !i || !l.rings.every(r => hidden(r.bone))) : plan.lofts;
  const cones = plan.cones.filter(c => !hidden(c.bone)).map(c => (c.tag === "eye" ? { ...c, ry: c.ry * 0.22, colour: "#16110f", tipColour: "#16110f", glow: false, tip: c.at.map((v, i) => v + (c.tip[i] - v) * 0.5) } : c));
  return { ...plan, lofts, cones, still: { rots, poss, root: G.root, chest: G.chest } };
}
