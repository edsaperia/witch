// The hydra, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built from
// what batches A to G made; this one on batch E's serpent, kit/serpent.js, with more necks: kit/necks.js). The swamp's
// (art/creatures/hydra/genome.js: "a many-headed swamp serpent, its heads by level (1, 3, 5, 7), draconic (Ed, 2026-10-13, from
// the mock: "crested"): a crest of spines down each head and frills at its sides; the legend's necks ringed in old bronze, two
// cut short in front and each grown back as two; dark eyes with a glint, nothing glowing"). One thick body that slithers, its
// own neck and head in the middle and the others standing from its shoulders either side, each on its own bones, swaying as it
// goes. Its legend's armour (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour
// and glowing runes") is old bronze on its trunk; nothing else on it glows. It coils to sleep, its necks laid down over the coil.
//
// Its heads take turns to spit (Ed, 2026-11-13: "it would be cool if the hydra did attacks with alternating heads";
// config/species-attacks.json `hydra`): `gait.strike` gives the three that do, left, middle, right, and each one's pose drawn
// back in the wind-up and struck forward as it spits, the others leaning in to watch (art/mesh/index.js `meshWalk` draws them
// after its walk; the view picks by the rules' shot: src/render/view/creatures.ts). Metres; y up; its head along +z.
import { crest, neck } from "../kit/necks.js";
import { coil, serpent } from "../kit/serpent.js";

const BELLY = "#cfc78a", CREST = "#c8553a", FRILL = "#e08a4c", BRONZE = "#9a6a34";
const skin = (a, b, belly = BELLY) => (t, i) => (cy => (cy < -0.3 ? belly : i % 2 ? a : b));
const ease = v => { const k = Math.min(1, Math.max(0, v)); return k * k * (3 - 2 * k); };

/** A hydra: o: len, r, n (its body's, as kit/serpent.js has them), share (of its length that is its reared middle neck),
 *  colours [a, b], belly, seconds, crest (crest's options: kit/necks.js), eye, spines (down each neck's back),
 *  sides: [{ yaw, len (of the middle neck's), back (how far behind its shoulders it stands, rings), rise, r, fork: true (cut
 *  short and grown back as two) }] a pair of necks each, ring: a colour, a band round every neck, armour. */
function hydra(name, o) {
  const { len, r, n, share = 0.42, colours: [a, b], belly = BELLY, sides = [], ring, spines } = o, t0 = 1 - share, many = sides.length > 0, sk = skin(a, b, belly), hc = () => (cy => (cy < -0.3 ? belly : a));
  // (its trunk swells where the necks leave it, and its own neck is slimmer above there)
  const girth = t => { const k = many ? Math.exp(-(((t - t0 + 0.04) / 0.13) ** 2)) * (0.3 + 0.12 * sides.length) : 0, slim = many ? 1 - 0.22 * ease((t - t0) / 0.12) : 1; return [(1 + k) * slim, (1 + k * 0.45) * slim]; };
  const H = { len: 3.3, wide: 1.4, deep: 0.92, eye: o.eye ?? 1, ...o.head }, hl = H.len * r, hw = H.wide * r, hd = H.deep * r;
  const cones = S => [...crest(S.P, "head", { wide: hw / hl, deep: hd / hl, size: hl }, o.crest), ...(spines ? S.spine.filter((p, i) => p.t > t0 + 0.08 && p.t < 0.97 && i % 2).map(p => { const up = [0, Math.cos(p.pitch), -Math.sin(p.pitch)], al = [0, Math.sin(p.pitch), Math.cos(p.pitch)], h = spines.high * p.ry;
    return { at: p.at.map((v, k) => v + up[k] * p.ry * 0.8), rx: p.rx * 0.22, ry: p.ry * 0.4, tip: p.at.map((v, k) => v + up[k] * (p.ry + h) - al[k] * h * 0.5), bone: p.bone, colour: spines.colour, tipColour: spines.tip ?? spines.colour, split: 0.5, up: al, sides: 3 }; }) : [])];
  const p = serpent(name, { len, r, n, rear: { share, up: o.up ?? 1.35 }, wave: { amp: 0.05, long: 0.5, ...o.wave }, seconds: o.seconds ?? 1.5, skin: sk, girth, head: { ...H, colour: hc }, armour: o.armour ?? [], cones });
  const spine = p.gait.serpent.spine, i0 = spine.findIndex(q => q.t >= t0 + 0.01), own = len * share, necks = [];
  sides.forEach((sd, j) => { const at = spine[Math.max(1, i0 - (sd.back ?? 0))];
    for (const s of [1, -1]) { const tag = `${s > 0 ? "L" : "R"}${j ? j + 1 : ""}`, from = [at.at[0] + s * at.rx * 0.5, at.at[1] + at.ry * 0.15, at.at[2] + at.rx * 0.2], nr = (sd.r ?? 0.78) * r, base = { yaw: s * sd.yaw, len: own * (sd.len ?? 0.95), r: nr, rise: sd.rise ?? [1.3, 0.3], skin: sk, head: { ...H, colour: hc() }, crest: o.crest, spines, ...(ring ? { ring: { colour: ring, at: 0.4 } } : {}) };
      if (sd.fork) { // (cut short, and grown back as two: a thick scarred stump, a slimmer neck out of each side of it)
        necks.push({ ...neck(`${tag}s`, at.bone, from, { ...base, len: base.len * 0.3, bones: 2, n: 4, taper: 0.9, stump: true, ring: { colour: ring ?? BRONZE, at: 0.8 }, spines: null }), s, stump: true });
        for (const [k, d] of [["a", 0.28], ["b", -0.3]]) necks.push({ ...neck(`${tag}${k}`, at.bone, from, { ...base, yaw: s * (sd.yaw + d), len: base.len * (k === "a" ? 1 : 0.86), r: nr * 0.74, ring: null }), s });
      } else necks.push({ ...neck(tag, at.bone, from, base), s }); } });
  for (const k of necks) { p.bones.push(...k.bones); p.lofts.push(...k.lofts); p.cones.push(...k.cones); }
  necks.forEach((k, i) => p.gait.extra.push(...k.sways(1.1 + i * 1.7, k.stump ? 0.015 : 0.05)));
  // asleep: coiled (kit/serpent.js), its other necks let down forward over the coil
  if (many) p.gait.nap = pose => { coil(pose); for (const k of necks) k.chain.forEach((bone, i) => { pose.rots[bone] = [i ? 0.32 : 0.75, 0, i ? 0 : k.s * 0.25]; }); };
  // ---- its strike (see the top of this file): the heads that spit, and a still pose for each one's turn
  const reared = spine.filter(q => q.t > t0), heads = many ? [necks.find(k => k.s > 0 && !k.stump), null, necks.find(k => k.s < 0 && !k.stump)] : [null, null, null];
  /** Its own middle neck drawn back ("rear"), struck forward ("snap") or leaning `lean` to its left ("watch"): its bones each
   *  hang from its root (kit/serpent.js), so each is shifted, more the higher up it is. */
  const mine = (kind, lean, rots, poss) => { const sh = s => (kind === "rear" ? [0, -0.05 * own * s * s, -0.4 * own * s * s] : kind === "snap" ? [0, -0.2 * own * s * s, 0.48 * own * s * s] : [lean * 0.5 * own * s * s, 0, 0]);
    for (const q of reared) poss[q.bone] = sh((q.t - t0) / share);
    poss.head = sh(1); rots.head = kind === "rear" ? [-0.3, 0, 0] : kind === "snap" ? [0.3, 0, 0] : [0, lean * 1.2, 0]; };
  p.gait.strike = { heads: heads.map(k => k?.head ?? "head"),
    /** The still pose (art/mesh/shape.js `still`) for head `k`'s turn (0 left, 1 middle, 2 right): phase "a" and "b" drawn back
     *  in the wind-up (the same but for the watchers, which sway between the two), "snap" struck forward. */
    pose(k, phase) { const rots = {}, poss = {}, kind = phase === "snap" ? "snap" : "rear", striker = heads[k], wob = phase === "a" ? 0.05 : phase === "b" ? -0.05 : 0;
      if (!striker) mine(kind, 0, rots, poss); else mine("watch", (k === 0 ? 0.14 : -0.14) + wob, rots, poss);
      necks.forEach((nk, i) => Object.assign(rots, nk === striker ? nk.pose(kind) : nk.pose("watch", (striker ? (striker.s > 0 ? 0.14 : -0.14) : -nk.s * 0.12) + wob * (i % 2 ? -1 : 1))));
      return { rots, poss }; } };
  return p;
}
const hydra3d = {
  // a hatchling: one head, too big for it, a first crest
  baby: () => hydra("hydra-baby", { len: 0.85, r: 0.062, n: 16, share: 0.48, colours: ["#5f9a7a", "#56906f"], seconds: 1.1, wave: { amp: 0.07, long: 0.55 }, head: { len: 3.5, wide: 1.5, deep: 1.0 }, eye: 1.5, crest: { spines: 3, high: 0.2, colour: CREST, tip: FRILL, frill: { colour: FRILL, tip: "#f0b070", long: 0.3 } } }),
  // three heads, slim-necked, its frills coming in
  young: () => hydra("hydra-young", { len: 1.2, r: 0.078, n: 20, share: 0.46, colours: ["#4a8568", "#427a5f"], seconds: 1.3, eye: 1.2, crest: { spines: 4, high: 0.26, colour: CREST, tip: FRILL, frill: { colour: FRILL, tip: "#f0b070", long: 0.36 } }, sides: [{ yaw: 0.85, len: 0.92, rise: [1.45, 0.4] }] }),
  // five heads on a heavy trunk, each crested and frilled, spines down every neck
  adult: () => hydra("hydra-adult", { len: 1.5, r: 0.1, n: 24, share: 0.44, colours: ["#3f6f5a", "#376552"], seconds: 1.5, crest: { spines: 5, high: 0.32, colour: CREST, tip: FRILL, frill: { colour: FRILL, tip: "#f0b070" } }, spines: { high: 0.55, colour: CREST, tip: FRILL },
    sides: [{ yaw: 0.7, len: 0.98, rise: [1.45, 0.4] }, { yaw: 1.25, len: 0.76, back: 1, rise: [1.2, 0.3], r: 0.7 }] }),
  // the old one of the swamp: seven heads, its necks ringed in old bronze, the two in front cut short long ago and each grown
  // back as two; dark eyes, nothing lit but the marks on the bronze plate over its trunk
  legend() {
    const LIT = "#9af0c0", armour = [{ from: 0.2, to: 0.54, round: [0.15, 1.35], lames: 6, thick: 0.022, step: 0.012, colour: BRONZE, rim: "#5a3d1e", runes: { colour: LIT, max: 1 } }];
    return hydra("hydra-legend", { len: 1.95, r: 0.125, n: 28, share: 0.4, colours: ["#2f5a4a", "#285042"], belly: "#b9b27a", seconds: 2.0, crest: { spines: 6, high: 0.4, colour: "#a8402c", tip: FRILL, frill: { colour: "#c8703c", tip: "#f0b070", long: 0.5 } }, spines: { high: 0.7, colour: "#a8402c", tip: FRILL }, ring: BRONZE, armour,
      sides: [{ yaw: 1.0, len: 1.0, back: 1, rise: [1.4, 0.4] }, { yaw: 0.5, len: 0.82, fork: true, rise: [1.3, 0.3], r: 0.85 }] });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs hydra`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "hydra", heights: [89, 137, 193, 286], plans: hydra3d };
