// The party start's pieces (render/partyStart.ts; Ed, 2026-11-03: "Isolate each of the effects so I can tweak ... press square at
// the decks after the party is started that replays the visual effects"): each knob under partyStart reaching its own piece and no
// other, the pieces drawn over the house's layers (still depth-tested), and the decks' replay playing them again with her line,
// rate-limited, and touching nothing of the game's. Headless: the batches' instances read back, no WebGL.
import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { MagicFx } from "./fx/system";
import { comfort } from "./comfort";
import { forms } from "./fx/model";
import { MAX_SPARKLES, PARTY_START_ORDER, PARTY_START_SPARKLES_ORDER, PartyStartFx, hueSat } from "./partyStart";
import { ROOMS_ORDER, furnitureOrder } from "./houseRooms";
import { Refraction } from "./refraction";
import { updateRefraction, captureRefractionCast } from "./view/refraction";
import { View } from "./view";
import { TUNING, type Tuning } from "../rules/tuning";
import { MAKE_SOME_NOISE, PARTY_START_DEFAULTS, PARTY_START_PIECES, REPLAY_GAP, partyStartLength, type PartyStartTuning } from "../rules/partyStart";
import { newGame as fullGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { hsv2rgb } from "../../art/generator.js";

afterEach(() => { comfort.reduceFlashing = false; vi.restoreAllMocks(); });

type Knobs = { [K in keyof PartyStartTuning]?: PartyStartTuning[K] extends object ? Partial<PartyStartTuning[K]> : PartyStartTuning[K] };
/** The tuning with these party-start knobs over the defaults. */
function tuned(over: Knobs = {}): Tuning {
  const k = structuredClone(PARTY_START_DEFAULTS) as Record<string, unknown>;
  for (const [key, v] of Object.entries(over)) k[key] = typeof v === "object" ? { ...(k[key] as object), ...v } : v;
  return { ...TUNING, partyStart: k as PartyStartTuning };
}
/** One show from her clock 10, seen at `age`: what the pieces drew, the magic it drew with. */
function at(age: number, t = tuned(), set?: (p: PartyStartFx, m: MagicFx) => void) {
  const scene = new THREE.Scene(), magic = new MagicFx(scene), P = new PartyStartFx(scene), owner = {};
  set?.(P, magic);
  P.start(t, 0, 0, 0, 10);
  magic.begin(10, 0, 0, owner); P.update(t, magic, 10, 10); // (its first frame: the shake given)
  magic.begin(10 + age, 0, 0, owner); P.update(t, magic, 10 + age, 10 + age);
  return { P, magic, layers: P.batches.layers };
}
/** A layer's instances: size, position, the form's data and alpha. */
function instances(layer: { mesh: THREE.Mesh }) {
  const geo = layer.mesh.geometry as THREE.InstancedBufferGeometry, n = geo.instanceCount;
  const pos = geo.getAttribute("iPos").array, size = geo.getAttribute("iSize").array, uv = geo.getAttribute("iUv").array, col = geo.getAttribute("iCol").array, shine = geo.getAttribute("iShine").array;
  return Array.from({ length: n }, (_, i) => ({ y: pos[i * 3 + 1], size: size[i], form: uv[i * 4], phase: uv[i * 4 + 3], alpha: col[i * 4 + 3], tall: shine[i] }));
}
/** The upright layer 1's instance of `form` (layer 1: the form itself, every quality). */
const upright = (r: ReturnType<typeof at>, form: "pillar" | "dome") => instances(r.layers[1]).find(i => i.form === forms[form].id);
const ground = (r: ReturnType<typeof at>) => instances(r.layers[5]).find(i => i.form === forms.zone.id);
const sparkleMat = (P: PartyStartFx) => (P.sparkles.material as THREE.ShaderMaterial).uniforms;

describe("every piece on its own knobs (partyStart)", () => {
  it("all on by default: the sparkles, the pillar, the dome, the light, the shake, the floor glow and the ripple", () => {
    for (const piece of PARTY_START_PIECES) expect(PARTY_START_DEFAULTS[piece].on, piece).toBe(true);
    expect(PARTY_START_DEFAULTS.overHouse).toBe(true);
    const r = at(0.5);
    expect(r.P.drawn.sparkles).toBe(PARTY_START_DEFAULTS.sparkles.count);
    expect(r.P.drawn.pillar).toBeGreaterThan(0); expect(r.P.drawn.dome).toBeGreaterThan(0);
    expect(r.P.drawn.light).toBeGreaterThan(0); expect(r.P.drawn.ground).toBeGreaterThan(0);
    expect(at(0.2).magic.screenKick).toBeGreaterThan(0); // (over by its 0.5 s)
  });

  it("each piece's `on` takes that piece away and leaves the rest", () => {
    const drawnOf = (r: ReturnType<typeof at>) => ({ sparkles: r.P.drawn.sparkles > 0, pillar: !!upright(r, "pillar"), dome: !!upright(r, "dome"), light: r.P.drawn.light > 0, ground: !!ground(r), shake: r.magic.screenKick > 0 });
    for (const piece of ["sparkles", "pillar", "dome", "light", "ground", "shake"] as const) {
      const got = drawnOf(at(0.3, tuned({ [piece]: { on: false } })));
      for (const [other, on] of Object.entries(got)) expect(on, `${piece} off: ${other}`).toBe(other !== piece);
    }
  });

  it("sparkles: count, size, opacity, white centres, life, speed and both colours", () => {
    expect(at(0.55, tuned({ sparkles: { count: 40 } })).P.drawn.sparkles).toBe(40);
    expect(at(0.55, tuned({ sparkles: { count: 999 } })).P.drawn.sparkles).toBe(MAX_SPARKLES);
    expect(sparkleMat(at(0.3, tuned({ sparkles: { size: 12 } })).P).uSize.value).toBe(12);
    expect(sparkleMat(at(0.3, tuned({ sparkles: { size: 2 } })).P).uCells.value).toBe(1); // (under 3 px: a plain square)
    expect(sparkleMat(at(0.3, tuned({ sparkles: { core: 0.25 } })).P).uCore.value).toBe(0.25);
    const alphas = (o: number) => { const P = at(0.55, tuned({ sparkles: { opacity: o } })).P, c = P.sparkles.geometry.getAttribute("color").array; return Math.max(...Array.from({ length: P.drawn.sparkles }, (_, i) => c[i * 4 + 3])); };
    expect(alphas(1.6)).toBeCloseTo(alphas(0.8) * 2, 5);
    expect(at(1.2, tuned({ sparkles: { life: 0.5 } })).P.drawn.sparkles).toBe(0); // (all over by 0.5 + 0.5 s)
    expect(at(1.2, tuned({ sparkles: { life: 4 } })).P.drawn.sparkles).toBe(PARTY_START_DEFAULTS.sparkles.count);
    const spread = (speed: number) => { const P = at(0.55, tuned({ sparkles: { speed } })).P, p = P.sparkles.geometry.getAttribute("position").array; let m = 0; for (let i = 0; i < P.drawn.sparkles; i++) m = Math.max(m, Math.hypot(p[i * 3], p[i * 3 + 2])); return m; };
    expect(spread(2)).toBeGreaterThan(spread(1) * 1.5);
    const first = (hueA: number, satA: number) => Array.from(at(0.55, tuned({ sparkles: { hueA, satA } })).P.sparkles.geometry.getAttribute("color").array.slice(4, 7)); // (the second: an A)
    expect(first(0.6, 0.8)).toEqual(hueSat(0.6, 0.8).map(v => expect.closeTo(v, 5)));
    const rose = Array.from(at(0.55, tuned({ sparkles: { hueB: 0.33, satB: 1 } })).P.sparkles.geometry.getAttribute("color").array.slice(0, 3)); // (the first: a B)
    expect(rose).toEqual(hueSat(0.33, 1).map(v => expect.closeTo(v, 5)));
  });

  it("the sparkles' colours are the pause page's swatches (ui/decide.ts swatchCss)", () => {
    for (const [h, sv] of [[0.1, 0.55], [0.93, 0.45], [0.6, 1], [0.33, 0]]) hueSat(h, sv).forEach((v, i) => expect(Math.abs(v * 255 - hsv2rgb(h, sv, 1)[i])).toBeLessThanOrEqual(1));
  });

  it("the default sparkles: bigger and brighter than before, amber and rose, their centres toward white", () => {
    const S = PARTY_START_DEFAULTS.sparkles;
    expect(S.count).toBeGreaterThan(64); expect(S.size).toBeGreaterThan(5); expect(S.opacity).toBeGreaterThan(0.55); expect(S.core).toBeGreaterThan(0);
    const [r, g, b] = hueSat(S.hueA, S.satA), [r2, , b2] = hueSat(S.hueB, S.satB);
    expect(r).toBeGreaterThan(g); expect(g).toBeGreaterThan(b); // (amber)
    expect(r2).toBeGreaterThan(b2); // (rose)
  });

  it("pillar: height (above the crown by default), width, duration and strength", () => {
    const top = (t: Tuning) => { const p = upright(at(1, t), "pillar")!; return p.y + (p.size * p.tall) / 2 * 0.86; };
    expect(top(tuned({ pillar: { height: 40 } }))).toBeCloseTo(40, 0);
    expect(top(tuned({ pillar: { height: 12 } }))).toBeCloseTo(12, 0);
    expect(top(tuned())).toBeGreaterThan(22); // (the oak's crown is about 14 to 22 m over the decks)
    expect(upright(at(1, tuned({ pillar: { width: 10 } })), "pillar")!.size).toBeCloseTo(10 / 0.55, 3);
    expect(upright(at(2, tuned({ pillar: { duration: 1.5 } })), "pillar")).toBeUndefined();
    expect(upright(at(2, tuned({ pillar: { duration: 4 } })), "pillar")).toBeDefined();
    expect(at(1, tuned({ pillar: { strength: 0.5 } })).P.drawn.pillar).toBeCloseTo(at(1, tuned({ pillar: { strength: 1 } })).P.drawn.pillar / 2, 5);
  });

  it("dome: size, duration and its fill (filled by default)", () => {
    expect(upright(at(0.5, tuned({ dome: { size: 2 } })), "dome")!.size).toBeGreaterThan(upright(at(0.5, tuned({ dome: { size: 1 } })), "dome")!.size * 1.9);
    expect(upright(at(1.5, tuned({ dome: { duration: 1 } })), "dome")).toBeUndefined();
    expect(upright(at(1.5, tuned({ dome: { duration: 3 } })), "dome")).toBeDefined();
    expect(upright(at(0.5, tuned({ dome: { fill: 0.4 } })), "dome")!.phase).toBeCloseTo(-0.4, 5); // (a negative phase: filled, render/fx/batch.ts)
    expect(upright(at(0.5, tuned({ dome: { fill: 0 } })), "dome")!.phase).toBeGreaterThanOrEqual(0); // (a ring alone, as before)
    expect(PARTY_START_DEFAULTS.dome.fill).toBeGreaterThan(0);
  });

  it("light: reach, strength and duration reach the magic's light", () => {
    const calls: number[][] = [];
    at(0.5, tuned({ light: { reach: 33, strength: 2.5, duration: 3 } }), (_P, m) => { vi.spyOn(m, "lamp").mockImplementation((_id, _x, _y, _z, _rgb, reach, strength) => { calls.push([reach, strength]); }); });
    expect(calls.at(-1)).toEqual([33, 2.5]); // (at its brightest till 40% of the way)
    expect(at(3.5, tuned({ light: { duration: 3 } })).P.drawn.light).toBe(0);
    expect(at(2, tuned({ light: { duration: 3 } })).P.drawn.light).toBeGreaterThan(0);
  });

  it("shake: amount and duration, never with Reduce flashing", () => {
    expect(at(0, tuned({ shake: { amount: 0.4 } })).magic.screenKick).toBeCloseTo(0.4, 5);
    expect(at(0, tuned({ shake: { amount: 0.1 } })).magic.screenKick).toBeCloseTo(0.1, 5);
    expect(at(0.6, tuned({ shake: { duration: 0.5 } })).magic.screenKick).toBe(0);
    expect(at(0.6, tuned({ shake: { duration: 1.5 } })).magic.screenKick).toBeGreaterThan(0);
    comfort.reduceFlashing = true;
    expect(at(0, tuned({ shake: { amount: 0.4 } })).magic.screenKick).toBe(0);
  });

  it("floor glow: its brightness and size", () => {
    expect(ground(at(0.5, tuned({ ground: { size: 14 } })))!.size).toBe(14);
    expect(at(0.5, tuned({ ground: { alpha: 0.6 } })).P.drawn.ground).toBeCloseTo(0.6, 5);
    expect(ground(at(0.5, tuned({ ground: { size: 0 } })))).toBeUndefined();
  });

  it("refraction: its own ripple without ?refraction=1, and only its own (no fire's)", () => {
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100); camera.updateMatrixWorld();
    const view = (on: boolean) => { const refraction = new Refraction(); return { v: { game: { tuning: tuned({ refraction: { on } }), witch: { x: 0, z: -10 }, party: { spellAt: 1 } }, post: { refraction, refractionEnabled: false, refractionParty: false }, worldFires: [{ x: 0, z: -10, scale: 1 }], camera } as unknown as View, refraction }; };
    const on = view(true); captureRefractionCast(on.v, 1, 0, 0, -10); updateRefraction(on.v, 1.1);
    expect(on.v.post.refractionParty).toBe(true); expect(on.refraction.count).toBe(1); // (the cast's ring; the fire not)
    const off = view(false); captureRefractionCast(off.v, 1, 0, 0, -10); updateRefraction(off.v, 1.1);
    expect(off.v.post.refractionParty).toBe(false); expect(off.refraction.count).toBe(0);
  });
});

describe("drawn over the house", () => {
  /** Everything of the house's and the oak's drawn with no depth when she's in it: its floors, walls and rails, its furniture (and
   *  the pictures baked on it, 19.9425), her in a room (19.95), the crown indoors (render/crown.ts 19.96, 19.97), its string lights
   *  (render/strings.ts 19.98). */
  const house = [...Object.values(ROOMS_ORDER), ...[-60, -3.5, 0, 90].flatMap(dz => [furnitureOrder(dz), furnitureOrder(dz, true)]), 19.9425, 19.95, 19.96, 19.97, 19.98];
  it("every piece after the house's layers and the crown, before the wave numbers (20), depth-tested", () => {
    const r = at(0.5), top = Math.max(...house);
    for (const [slot, layer] of r.layers.entries()) {
      if (slot === 8) continue; // (the canopy halo: never the party start's)
      expect(layer.mesh.renderOrder, layer.mesh.name).toBeGreaterThan(top);
      expect(layer.mesh.renderOrder, layer.mesh.name).toBeLessThan(20);
      expect((layer.mesh.material as THREE.ShaderMaterial).depthTest, layer.mesh.name).toBe(true); // (still behind what's solid in front of her)
    }
    expect(r.P.sparkles.renderOrder).toBeGreaterThan(top); expect(r.P.sparkles.renderOrder).toBeLessThan(20);
    expect((r.P.sparkles.material as THREE.ShaderMaterial).depthTest).toBe(true);
    expect(PARTY_START_ORDER).toBeGreaterThan(top); expect(PARTY_START_SPARKLES_ORDER).toBeLessThan(20);
    // (the floor glow first, then the uprights over it, then the sparkles)
    expect(r.layers[4].mesh.renderOrder).toBeLessThan(r.layers[0].mesh.renderOrder);
    expect(Math.max(...r.layers.slice(0, 8).map(l => l.mesh.renderOrder))).toBeLessThan(r.P.sparkles.renderOrder);
  });
  it("overHouse off: under them, in the magic's own orders, as before", () => {
    const r = at(0.5, tuned({ overHouse: false }));
    for (const layer of r.layers.slice(0, 8)) expect(layer.mesh.renderOrder).toBeLessThan(3);
    expect(r.P.sparkles.renderOrder).toBe(0);
  });
  it("its own meshes: the magic's everywhere else keep their orders and their look", () => {
    const scene = new THREE.Scene(), magic = new MagicFx(scene), P = new PartyStartFx(scene);
    expect(magic.batches.layers.slice(0, 8).map(l => l.mesh.renderOrder)).toEqual([2.8, 2.81, 2.82, 2.83, 2.9, 2.91, 2.92, 2.93].map(v => expect.closeTo(v, 6)));
    const mat = (l: { mesh: THREE.Mesh }) => l.mesh.material as THREE.ShaderMaterial;
    // (the party start's light alone, added on, so she and the decks show through it; the magic's dark backing and rim as ever)
    for (const l of P.batches.layers) { expect(mat(l).uniforms.uGlow.value).toBe(1); expect(mat(l).blending).toBe(THREE.AdditiveBlending); }
    for (const l of magic.batches.layers) expect(mat(l).uniforms.uGlow.value).toBe(0);
    expect([0, 1, 4, 5].map(i => mat(magic.batches.layers[i]).blending)).toEqual(Array(4).fill(THREE.NormalBlending));
  });
});

describe("the replay at the decks (View.replayPartyStart)", () => {
  const newGame = smallWorld(fullGame, "The party start's replay reads the game and never writes it; any small night does.");
  /** A stand-in view round the real replay: the pieces, her place at the decks, the house's bubble. */
  function stand(t = tuned()) {
    const g = newGame(123, t), scene = new THREE.Scene(), magic = new MagicFx(scene), P = new PartyStartFx(scene), said: [string, number][] = [];
    g.party.spellAt = 5;
    const v = { partyStart: P, game: g, houseRooms: { sayAtDecks: (line: string, at: number) => said.push([line, at]) } } as unknown as View;
    const frame = (ht: number) => { magic.begin(ht, 0, 0, {}); P.update(g.tuning, magic, ht, ht); };
    const replay = () => View.prototype.replayPartyStart.call(v);
    return { g, P, v, said, frame, replay };
  }
  it("plays every piece again where she stands at the decks, and she says \"make some noise!!!\"", () => {
    const S = stand();
    S.P.anchor = { x: 3, y: 1, z: 4 };
    S.frame(20);
    expect(S.P.drawn.pillar).toBe(0);
    expect(S.replay()).toBe(true);
    expect(S.said).toEqual([[MAKE_SOME_NOISE, 20]]);
    S.frame(20.4);
    expect(S.P.drawn.sparkles).toBeGreaterThan(0); expect(S.P.drawn.pillar).toBeGreaterThan(0); expect(S.P.drawn.dome).toBeGreaterThan(0);
    expect(S.P.drawn.light).toBeGreaterThan(0); expect(S.P.drawn.ground).toBeGreaterThan(0);
  });
  it("rate-limited: not while a show's playing, nor within REPLAY_GAP of the last with every piece off", () => {
    const S = stand();
    S.P.anchor = { x: 0, y: 0, z: 0 };
    S.frame(20); expect(S.replay()).toBe(true);
    const length = partyStartLength(PARTY_START_DEFAULTS);
    S.frame(20 + length - 0.1); expect(S.replay()).toBe(false);
    S.frame(20 + length + 0.01); expect(S.replay()).toBe(true);
    expect(S.said).toHaveLength(2);
    const off = stand(tuned(Object.fromEntries(PARTY_START_PIECES.map(p => [p, { on: false }])) as Knobs));
    off.P.anchor = { x: 0, y: 0, z: 0 };
    off.frame(20); expect(off.replay()).toBe(true);
    off.frame(20 + REPLAY_GAP / 2); expect(off.replay()).toBe(false);
    off.frame(20 + REPLAY_GAP + 0.01); expect(off.replay()).toBe(true);
  });
  it("with nowhere drawn to play it (no frame of her yet), nothing", () => {
    const S = stand(); S.frame(20);
    expect(S.replay()).toBe(false); expect(S.said).toEqual([]);
    S.P.here = { x: 1, y: 0, z: 1 }; // (a night resumed after its cast: where she's drawn)
    expect(S.replay()).toBe(true);
  });
  it("changes nothing of the game's: no re-cast, the clock, the party and her as they were", () => {
    const S = stand(); S.P.anchor = { x: 0, y: 0, z: 0 }; S.frame(20);
    const snap = () => { const seen = new WeakSet<object>(); return JSON.stringify(S.g, (_k, val) => { if (typeof val === "function") return undefined; if (val && typeof val === "object") { if (seen.has(val)) return "(seen)"; seen.add(val); } return val instanceof Map ? [...val.entries()] : val instanceof Set ? [...val] : val; }); };
    const before = snap();
    expect(S.replay()).toBe(true);
    expect(snap()).toBe(before);
    expect(S.g.party.spellAt).toBe(5);
  });
});
