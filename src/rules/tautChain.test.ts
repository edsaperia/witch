// The taut chain's tug (Ed, 2026-11-12: "as you pull outside of the length you are progressively pulled down; if you stop pulling,
// you rise up again, only if you keep pulling do you actually fully switch back to ground mode"; rules/tautChain.ts,
// leash.chain.tug): up in the treetops, pulling past a chain's end dips her in proportion to the metres pulled; letting off she rises;
// a sustained pull carries her all the way to the ground in one eased curve and she's in ground mode as she arrives (Ed's playtest,
// 2026-11-13: "the transition from treetop to ground isn't smooth; she is pulled down some of the way, and then falls to the
// ground"); the tautest chain decides; never over a lake or a treehouse floor, never from a blow's throw; off with ?tautchain=0.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { PULL_FROM, PULL_MOST, stepPop, stepTug, tautKnobs, tugKnobs, yankFrom, type Pull } from "./tautChain";
import { beginChains, chainDrag, dragWitch, hurryOf } from "./chains";
import { leashSpeed } from "./leash";
import { stepGame, STEP, type Controls, type Game } from "./game";
import { newWitch, witchHeight, type WitchState } from "./witch";
import { smallWorld } from "../test/worlds";
import type { Creature } from "./creatures";
import { preppedGame } from "../test/preppedGame";
import { tuningFromLink } from "../app/linkParams";
const newGame = smallWorld(preppedGame, "The taut chain's tug: a witch up in the treetops over home's open ground with a youth on her chain.");

const TK = TUNING.leash.chain!.taut!, K = TK.tug, L = TUNING.leash.chain!.length, DT = 1 / 60;
const up = (): WitchState => ({ ...newWitch(0, 0), mode: "treetop", lift: 1 });
const off = (t: Tuning = TUNING) => withTuning({ ...t, leash: { ...t.leash, chain: { ...t.leash.chain!, taut: { ...t.leash.chain!.taut!, on: false } } } });
/** The tug with its pull's pace not eased (tug.ease 0), for the rule's own arithmetic. */
const RAW = withTuning({ ...TUNING, leash: { ...TUNING.leash, chain: { ...TUNING.leash.chain!, taut: { ...TK, tug: { ...K, ease: 0 } } } } });
const share = (w: WitchState) => (TUNING.treetopHeight - witchHeight(w, TUNING)) / (TUNING.treetopHeight - TUNING.groundHeight);

describe("the tug's rule", () => {
  it("its knobs: on, a sustained pull at a dragged youth's pace (about 8 m/s past its chain's end) brings her down in 2 to 4 s", () => {
    expect(tugKnobs(TUNING)).toEqual(K);
    expect(TK.on).toBe(true);
    const s = 1 / (K.perMetre * 8);
    expect(s).toBeGreaterThan(2); expect(s).toBeLessThan(4);
    expect(1 / (K.perMetre * PULL_MOST)).toBeGreaterThan(1); // (never sudden, however hard she strains)
    expect(K.hold).toBeGreaterThan(0); expect(K.hold).toBeLessThan(1);
  });

  it("pulling dips her in proportion to the metres pulled: her lift 1 - tug, so her height on the descent's own eased curve", () => {
    const r = stepTug(up(), 0.1, 0.2, DT, RAW);
    expect(r.tug).toBeCloseTo(0.1 + K.perMetre * 0.2, 9);
    expect(r.body.mode).toBe("treetop");
    expect(r.body.lift).toBeCloseTo(1 - r.tug, 9);
    expect(share(r.body)).toBeGreaterThan(0); expect(share(r.body)).toBeLessThan(r.tug); // (eased: gentle at the top)
    expect(share(stepTug(up(), 0.5, 0, DT, RAW).body)).toBeCloseTo(0.5, 1); // (half way at half)
    expect(r.body.braking).toBe(true); // (the strain: her brake pose)
  });

  it("not pulling (no strain, or only coasting round the end) she rises at rise a second, never above where she is", () => {
    const r = stepTug({ ...up(), lift: 0.5 }, 0.2, PULL_FROM * DT * 0.5, DT, RAW);
    expect(r.tug).toBeCloseTo(0.2 - K.rise * DT, 9);
    expect(r.body.lift).toBe(0.5); // (stepWitch's own climb sets how fast lift comes back; the tug only holds it down)
    expect(stepTug(up(), 0.001, 0, DT, RAW).tug).toBe(0); // (all the way back: none)
  });

  it("her pull's pace is eased over tug.ease seconds: it comes on gently, a one-step hitch barely shows, and letting off drops it at once", () => {
    const first = stepTug(up(), 0, 0.2, DT, TUNING);
    expect(first.rate).toBeCloseTo((0.2 / DT) * (1 - Math.exp(-DT / K.ease)), 9);
    expect(first.tug).toBeCloseTo(K.perMetre * first.rate * DT, 9);
    expect(first.tug).toBeLessThan(stepTug(up(), 0, 0.2, DT, RAW).tug / 5);
    let rate = 0, tug = 0;
    for (let i = 0; i < 120; i++) ({ rate, tug } = stepTug(up(), Math.min(tug, 0.5), 0.2, DT, TUNING, 1, {}, rate));
    expect(rate).toBeCloseTo(0.2 / DT, 3); // (settled at her pull's pace)
    const hitch = stepTug(up(), 0.5, 0.28, DT, TUNING, 1, {}, rate); // (one step 40% harder)
    expect(hitch.rate / rate).toBeLessThan(1.05);
    expect(stepTug(up(), 0.5, 0, DT, TUNING, 1, {}, rate).rate).toBe(0);
  });

  it("it never hands over part way: still in treetop mode at 0.4 (the old commit) and at 0.99, her lift 1 - tug; letting off there she rises", () => {
    for (const k of [0.4, 0.7, 0.99]) {
      const r = stepTug({ ...up(), lift: 1 - k }, k, 0.1, DT, RAW);
      expect(r.body.mode).toBe("treetop");
      expect(r.body.lift).toBeCloseTo(1 - r.tug, 9);
      expect(stepTug({ ...up(), lift: 1 - k }, k, 0, DT, RAW).tug).toBeCloseTo(k - K.rise * DT, 9);
    }
  });

  it("pulled all the way she has arrived: at the ground (lift 0), handed to the landing with nothing left to drop, the tug done", () => {
    const b = { ...up(), lift: 0.001 }, r = stepTug(b, 0.9995, 1, DT, RAW);
    expect(r.body.mode).toBe("descending");
    expect(r.body.lift).toBe(0);
    expect(witchHeight(r.body, TUNING)).toBe(TUNING.groundHeight);
    expect(r.tug).toBe(0);
  });

  it("over a lake or a treehouse floor (hold) she's pulled no lower than hold, and eases back up to it from lower; a blow's throw (free) isn't pulling", () => {
    const h = stepTug(up(), K.hold - 0.001, 1, DT, RAW, 1, { hold: true });
    expect(h.body.mode).toBe("treetop"); expect(h.tug).toBe(K.hold);
    const low = stepTug({ ...up(), lift: 0.1 }, 0.9, 1, DT, RAW, 1, { hold: true }); // (came over it low, still pulling)
    expect(low.body.mode).toBe("treetop"); expect(low.tug).toBeCloseTo(0.9 - K.rise * DT, 9); expect(low.body.lift).toBe(0.1); // (no snap up)
    expect(stepTug(up(), 0.9995, 1, DT, RAW, 1, { hold: true }).body.mode).toBe("treetop");
    expect(stepTug(up(), 0.2, 1, DT, RAW, 1, { free: true }).tug).toBeCloseTo(0.2 - K.rise * DT, 9);
  });

  it("only in treetop mode, and not perched; off (or ?tautchain=0) none", () => {
    for (const mode of ["ground", "rising", "descending"] as const) expect(stepTug({ ...up(), mode }, 0.2, 1, DT, RAW)).toEqual({ body: { ...up(), mode }, tug: 0, rate: 0 });
    expect(stepTug({ ...up(), perch: true }, 0.2, 1, DT, RAW).tug).toBe(0);
    expect(stepTug(up(), 0.2, 1, DT, off()).tug).toBe(0);
    expect(tugKnobs(tuningFromLink(new URLSearchParams("tautchain=0")).tuning)).toBeNull();
    expect(tugKnobs(tuningFromLink(new URLSearchParams("tautchain=1")).tuning)).toEqual(K);
    expect(tautKnobs(tuningFromLink(new URLSearchParams("tautchain=0")).tuning)).toBeNull();
  });

  it("her broom's pull (the Canoe hull) scales it; the strain counts at most PULL_MOST m/s", () => {
    expect(stepTug(up(), 0, 0.2, DT, RAW, 0.5).tug).toBeCloseTo(K.perMetre * 0.1, 9);
    expect(stepTug(up(), 0, 5, DT, RAW).tug).toBeCloseTo(K.perMetre * PULL_MOST * DT, 9);
  });

  it("several chains: the tautest decides (dragWitch's strain is the most metres past any one, not their sum)", () => {
    const crit = (id: number, x: number) => ({ id, x, z: 0, level: 1, species: "wolf", gone: false, speed: 0 }) as unknown as Creature;
    beginChains();
    const body = { ...up(), x: L + 0.3, vx: 20 }, a = crit(0, 0), b = crit(1, 0.1);
    const one = dragWitch(body, { x: L, z: 0 }, [0], [a, b], TUNING, DT).strain;
    beginChains();
    const both = dragWitch(body, { x: L, z: 0 }, [0, 1], [crit(0, 0), crit(1, 0.1)], TUNING, DT).strain;
    expect(one).toBeCloseTo(0.3, 6);
    expect(both).toBeCloseTo(0.3, 6); // (0.2 past the second's end: the most, 0.3, not the sum)
  });
});

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
function aloft(t: Tuning = TUNING): { g: Game; c: Creature } {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, perch: undefined, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP);
  const c = g.creatures.find(k => !k.boss && !k.gone && !k.leashed)!;
  c.level = 1 as Creature["level"]; c.leashed = true; c.state = "leashed"; c.x = c.tx = W.body.x - L + 1; c.z = c.tz = W.body.z; c.rest = 0;
  W.leash.stack.push(c.id);
  W.body = { ...W.body, mode: "treetop", lift: 1 };
  return { g, c };
}
const fly = (g: Game, s: number, moveX: number, each?: () => void) => { for (let i = 0; i < s / STEP; i++) { stepGame(g, { ...idle, moveX }, STEP); each?.(); } };

describe("the tug in play", () => {
  it("a short pull dips her, and letting off she rises back to the treetops", () => {
    const { g } = aloft(), W = g.witches[0];
    let low = 1;
    fly(g, 0.5, 1, () => { low = Math.min(low, W.body.lift); });
    expect(W.tug ?? 0).toBeGreaterThan(0.05);
    expect(low).toBeLessThan(0.9);
    expect(W.body.mode).toBe("treetop");
    fly(g, 1.5, 0);
    expect(W.body.mode).toBe("treetop");
    expect(W.body.lift).toBe(1);
    expect(W.tug).toBeUndefined();
  });

  // Ed's playtest, 2026-11-13: "the transition from treetop to ground isn't smooth; she is pulled down some of the way, and then falls
  // to the ground" (measured on v7948: a steady 5 m/s down to 15.8 m, then the last 14.4 m in 0.33 s, up to 1.03 m a step).
  it("a sustained pull carries her all the way down in one curve, 2 to 4 s: never a drop, in treetop mode till she's at the ground, landed there (the rise cooldown after)", () => {
    const { g } = aloft(), W = g.witches[0], H = () => witchHeight(W.body, g.tuning);
    fly(g, 2, 0); // (hovering till the camera has caught her up)
    let at = -1, tm = 0, y = H(), most = 0, switchedAt = -1, camY = g.camera.ty, camMost = 0;
    fly(g, 6, 1, () => {
      tm += STEP;
      const h = H(); most = Math.max(most, Math.abs(h - y)); y = h;
      camMost = Math.max(camMost, Math.abs(g.camera.ty - camY)); camY = g.camera.ty;
      if (switchedAt < 0 && W.body.mode !== "treetop") switchedAt = h;
      if (at < 0 && W.body.mode === "ground") at = tm;
    });
    expect(at).toBeGreaterThan(2); expect(at).toBeLessThan(4);
    expect(most).toBeLessThan(0.35); // (metres a step: 21 m/s; the old drop's 1.03)
    expect(camMost).toBeLessThan(0.3); // (the camera's aim with her)
    expect(switchedAt).toBeCloseTo(g.tuning.groundHeight, 6); // (her mode changes only at the ground)
    expect(W.body.mode).toBe("ground");
    expect(W.landedAt).toBeDefined();
  });

  it("pulled most of the way down and let off, she rises all the way back, smoothly", () => {
    const { g } = aloft(), W = g.witches[0];
    fly(g, 2.2, 1);
    expect(W.body.mode).toBe("treetop"); expect(W.body.lift).toBeLessThan(0.4); // (lower than the old commit ever let her hover)
    let y = W.body.lift, most = 0;
    fly(g, 4, 0, () => { most = Math.max(most, W.body.lift - y); y = W.body.lift; });
    expect(most).toBeLessThanOrEqual(g.tuning.leash.chain!.taut!.tug.rise * STEP + 1e-9);
    expect(W.body.mode).toBe("treetop"); expect(W.body.lift).toBe(1); expect(W.tug).toBeUndefined();
  });

  it("switched off, the same pull leaves her in the treetops, as before", () => {
    const { g } = aloft(off()), W = g.witches[0];
    fly(g, 4, 1);
    expect(W.body.mode).toBe("treetop");
    expect(W.body.lift).toBe(1);
  });

  it("hovering at the chain's end, not pulling, never traps her: she stays up", () => {
    const { g } = aloft(), W = g.witches[0];
    fly(g, 1, 1); fly(g, 3, 0);
    expect(W.body.mode).toBe("treetop"); expect(W.body.lift).toBe(1);
  });
});

describe("on foot: the lighter drag, the hurry, the pop", () => {
  const crit = (id: number, level: number, x: number, extra: Partial<Creature> = {}) => ({ id, x, z: 0, level, species: "wolf", gone: false, speed: 0, ...extra }) as unknown as Creature;
  const foot = (x: number, vx = 19) => ({ ...newWitch(x, 0), vx });
  it("pulling on the ground slows her less than in the air: youth 0.15 and adult 0.4 against 0.3 and 0.7; a legend's whole either way", () => {
    for (const lv of [1, 2]) expect(chainDrag(crit(0, lv, 0), TUNING, true)).toBeLessThan(chainDrag(crit(0, lv, 0), TUNING));
    expect([1, 2, 3].map(lv => chainDrag(crit(0, lv, 0), TUNING, true))).toEqual([TK.groundDrag.youth, TK.groundDrag.adult, 1]);
    expect(chainDrag(crit(0, 1, 0), off(), true)).toBe(chainDrag(crit(0, 1, 0), TUNING)); // (off: the one drag everywhere)
  });
  it("on foot a taut creature is pulled at her pace less its drag, not held to its top speed; flying it still is", () => {
    beginChains();
    const c = crit(0, 1, 0), r = dragWitch(foot(L + 0.3), { x: L, z: 0 }, [0], [c], TUNING, DT);
    expect(r.body.x - L).toBeCloseTo(0.3 * (1 - TK.groundDrag.youth), 6); // (way past its 4 m/s pace: 0.255 m in 1/60 s is 15 m/s)
    expect(r.pulls.map(p => p.cut)).toEqual([expect.closeTo(0.3 * TK.groundDrag.youth, 6)]);
    beginChains();
    const a = crit(0, 1, 0), q = dragWitch({ ...foot(L + 0.3), mode: "treetop", lift: 1 }, { x: L, z: 0 }, [0], [a], TUNING, DT);
    expect(q.body.x - L).toBeCloseTo(leashSpeed(a, TUNING) * TK.hurry * DT, 6); // (in the air: its top speed, hurried)
  });
  it("a taut creature hurries after her (hurry times its leash pace); a slack one doesn't", () => {
    beginChains();
    const near = crit(0, 1, L - 10), taut = crit(1, 1, 0.2);
    dragWitch(foot(L), { x: L, z: 0 }, [0, 1], [near, taut], TUNING, DT);
    expect(hurryOf(taut)).toBe(TK.hurry); expect(hurryOf(near)).toBe(1);
    beginChains(); expect(hurryOf(taut)).toBe(1);
  });

  const P = (id: number, level: number, cut: number, over = cut * 10): Pull => ({ id, level, over, cut });
  const hard = 0.05; // (metres of her motion a step its drag took off)
  const run = (s: number, pulls: Pull[], meter: { id: number; k: number } | null = null) => {
    let m = meter, popped: number[] = [];
    for (let i = 0; i < Math.round(s / DT); i++) { const r = stepPop(m, pulls, DT, TUNING, true); m = r.meter; if (r.pop !== null) { popped.push(r.pop); m = null; } }
    return { m, popped };
  };
  it("a short pull never pops; a sustained one pops one sigil after pop.fill seconds; easing off drains it", () => {
    const short = run(1, [P(4, 1, hard)]);
    expect(short.popped).toEqual([]); expect(short.m!.k).toBeCloseTo(1 / TK.pop.fill, 2);
    const eased = run(0.5, [], short.m);
    expect(eased.m!.k).toBeCloseTo(1 / TK.pop.fill - 0.5 / TK.pop.drain, 2);
    expect(run(TK.pop.drain, [], short.m).m).toBeNull();
    let at = -1, m: { id: number; k: number } | null = null;
    for (let i = 0; i < 600 && at < 0; i++) { const r = stepPop(m, [P(4, 1, hard), P(5, 2, hard * 0.5)], DT, TUNING, true); m = r.meter; if (r.pop !== null) at = (i + 1) * DT; expect(r.pop === null || r.pop === 4).toBe(true); }
    expect(at).toBeCloseTo(TK.pop.fill, 1);
  });
  it("one at a time, the chain pulled hardest; it keeps the one it has while that's still pulled", () => {
    const one = run(0.5, [P(4, 1, hard * 0.5), P(5, 2, hard)]);
    expect(one.m!.id).toBe(5);
    expect(run(0.5, [P(4, 1, hard * 2), P(5, 2, hard)], one.m).m!.id).toBe(5);
  });
  it("never a legend's, a baby's, in the air, or while she's thrown", () => {
    expect(run(5, [P(4, 3, hard)]).popped).toEqual([]);
    expect(stepPop(null, [P(4, 1, hard)], DT, TUNING, false).meter).toBeNull();
    expect(stepPop(null, [P(4, 1, hard)], DT, TUNING, true, 1, true).meter).toBeNull();
    expect(stepPop(null, [P(4, 1, hard)], DT, off(), true).meter).toBeNull();
  });
  it("a legend's chain yanks her instead, at most once every yank.every seconds; a youth's never", () => {
    expect(yankFrom([P(9, 3, 1, 1)], DT, TUNING, 10, undefined)).toBe(9);
    expect(yankFrom([P(9, 3, 1, 1)], DT, TUNING, 10, 10 - TK.yank.every / 2)).toBeNull();
    expect(yankFrom([P(9, 3, 1, 1)], DT, TUNING, 10, 10 - TK.yank.every)).toBe(9);
    expect(yankFrom([P(4, 1, 1, 1)], DT, TUNING, 10, undefined)).toBeNull();
    expect(yankFrom([P(9, 3, 1, 1)], DT, off(), 10, undefined)).toBeNull();
  });
});

function onFoot(t: Tuning = TUNING): Game {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, perch: undefined, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
function follow(g: Game, levels: number[], behind = L - 1): Creature[] {
  const W = g.witches[0], pool = g.creatures.filter(k => !k.boss && !k.gone && !k.leashed);
  return levels.map((lv, i) => { const c = pool[i]; Object.assign(c, { level: lv, leashed: true, state: "leashed", rest: 0, x: W.body.x - behind, z: W.body.z + i * 0.5, tx: W.body.x - behind, tz: W.body.z + i * 0.5 }); W.leash.stack.push(c.id); return c; });
}

describe("the taut chain in play, on foot", () => {
  it("walking away with a youth: a short pull slides its sigil out and back in; kept up, it's put down, exactly one, as the button would", () => {
    const g = onFoot(), W = g.witches[0], [y] = follow(g, [1]);
    fly(g, 1, 1);
    expect(W.pop?.id).toBe(y.id); expect(W.leash.stack).toContain(y.id);
    fly(g, 2, 0);
    expect(W.pop).toBeUndefined(); // (eased off: drained)
    const placed: number[] = [];
    fly(g, 8, 1, () => { for (const e of W.leash.events) if (e.kind === "placed") placed.push(e.id); });
    expect(placed).toEqual([y.id]);
    expect(W.leash.stack).not.toContain(y.id);
    expect(W.leash.placed.map(p => p.id)).toContain(y.id);
  });
  it("pulling on a legend's chain yanks her back toward it, its chain rattling, at most once every yank.every s; it never pops", () => {
    const g = onFoot(), W = g.witches[0], [lg] = follow(g, [3]);
    const yanks: number[] = [];
    fly(g, 5, 1, () => { for (const e of g.leashEvents) if (e.kind === "yanked" && !yanks.includes(e.at)) yanks.push(e.at); });
    expect(yanks.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < yanks.length; i++) expect(yanks[i] - yanks[i - 1]).toBeGreaterThanOrEqual(TK.yank.every - 1e-6);
    expect(W.leash.stack).toContain(lg.id);
    expect(W.pop).toBeUndefined();
    expect(W.knock && W.knock.stunUntil > g.herTime).toBeFalsy(); // (no stagger)
  });
  it("off, the same walk never puts it down", () => {
    const g = onFoot(off()), W = g.witches[0], [y] = follow(g, [1]);
    fly(g, 8, 1);
    expect(W.leash.stack).toContain(y.id);
  });
  it("from the treetops: the tug brings her down, and only then, pulled on, the pop", () => {
    const { g, c } = aloft(), W = g.witches[0];
    let landed = -1, popped = -1, tm = 0;
    fly(g, 10, 1, () => { tm += STEP; if (landed < 0 && W.body.mode === "ground") landed = tm; if (popped < 0 && !W.leash.stack.includes(c.id)) popped = tm; });
    expect(landed).toBeGreaterThan(2);
    expect(popped).toBeGreaterThan(landed + 1.5);
  });
});
