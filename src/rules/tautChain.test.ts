// The taut chain's tug (Ed, 2026-11-12: "as you pull outside of the length you are progressively pulled down; if you stop pulling,
// you rise up again, only if you keep pulling do you actually fully switch back to ground mode"; rules/tautChain.ts,
// leash.chain.tug): up in the treetops, pulling past a chain's end dips her in proportion to the metres pulled; letting off she rises;
// a sustained pull brings her down through the ordinary descent; the tautest chain decides; never over a lake or a treehouse floor,
// never from a blow's throw; off with ?tautchain=0.
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
const share = (w: WitchState) => (TUNING.treetopHeight - witchHeight(w, TUNING)) / (TUNING.treetopHeight - TUNING.groundHeight);

describe("the tug's rule", () => {
  it("its knobs: on, a sustained pull at a dragged youth's pace (12 m/s) brings her down in 1.5 to 3 s", () => {
    expect(tugKnobs(TUNING)).toEqual(K);
    expect(TK.on).toBe(true);
    const s = K.commit / (K.perMetre * 12);
    expect(s).toBeGreaterThan(1.5); expect(s).toBeLessThan(3);
    expect(K.commit / (K.perMetre * PULL_MOST)).toBeGreaterThan(1); // (never sudden, however hard she strains)
  });

  it("pulling dips her in proportion to the metres pulled: her height, through her lift, 1 - tug of the way up", () => {
    const r = stepTug(up(), 0.1, 0.2, DT, TUNING);
    expect(r.tug).toBeCloseTo(0.1 + K.perMetre * 0.2, 9);
    expect(r.body.mode).toBe("treetop");
    expect(share(r.body)).toBeCloseTo(r.tug, 6);
    expect(r.body.braking).toBe(true); // (the strain: her brake pose)
  });

  it("not pulling (no strain, or only coasting round the end) she rises at rise a second, never above where she is", () => {
    const r = stepTug({ ...up(), lift: 0.5 }, 0.2, PULL_FROM * DT * 0.5, DT, TUNING);
    expect(r.tug).toBeCloseTo(0.2 - K.rise * DT, 9);
    expect(r.body.lift).toBe(0.5); // (stepWitch's own climb sets how fast lift comes back; the tug only holds it down)
    expect(stepTug(up(), 0.001, 0, DT, TUNING).tug).toBe(0); // (all the way back: none)
  });

  it("pulled down commit of the way, she comes down: mode descending from where she is, the tug done", () => {
    const b = { ...up(), lift: 0.6 }, r = stepTug(b, K.commit - 0.001, 1, DT, TUNING);
    expect(r.body.mode).toBe("descending");
    expect(r.body.lift).toBe(0.6);
    expect(r.tug).toBe(0);
  });

  it("over a lake or a treehouse floor (hold) it never commits; a blow's throw (free) isn't pulling", () => {
    const h = stepTug(up(), K.commit - 0.001, 1, DT, TUNING, 1, { hold: true });
    expect(h.body.mode).toBe("treetop"); expect(h.tug).toBeLessThan(K.commit);
    expect(stepTug(up(), 0.2, 1, DT, TUNING, 1, { free: true }).tug).toBeCloseTo(0.2 - K.rise * DT, 9);
  });

  it("only in treetop mode, and not perched; off (or ?tautchain=0) none", () => {
    for (const mode of ["ground", "rising", "descending"] as const) expect(stepTug({ ...up(), mode }, 0.2, 1, DT, TUNING)).toEqual({ body: { ...up(), mode }, tug: 0 });
    expect(stepTug({ ...up(), perch: true }, 0.2, 1, DT, TUNING).tug).toBe(0);
    expect(stepTug(up(), 0.2, 1, DT, off()).tug).toBe(0);
    expect(tugKnobs(tuningFromLink(new URLSearchParams("tautchain=0")).tuning)).toBeNull();
    expect(tugKnobs(tuningFromLink(new URLSearchParams("tautchain=1")).tuning)).toEqual(K);
    expect(tautKnobs(tuningFromLink(new URLSearchParams("tautchain=0")).tuning)).toBeNull();
  });

  it("her broom's pull (the Canoe hull) scales it; the strain counts at most PULL_MOST m/s", () => {
    expect(stepTug(up(), 0, 0.2, DT, TUNING, 0.5).tug).toBeCloseTo(K.perMetre * 0.1, 9);
    expect(stepTug(up(), 0, 5, DT, TUNING).tug).toBeCloseTo(K.perMetre * PULL_MOST * DT, 9);
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

  it("a sustained pull brings her down to ground mode in 1.5 to 3 s, landing as any descent does (the rise cooldown after)", () => {
    const { g } = aloft(), W = g.witches[0];
    let at = -1, tm = 0;
    fly(g, 4, 1, () => { tm += STEP; if (at < 0 && W.body.mode === "descending") at = tm; });
    expect(at).toBeGreaterThan(1.5); expect(at).toBeLessThan(3);
    expect(W.body.mode).toBe("ground");
    expect(W.landedAt).toBeDefined();
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
    expect(landed).toBeGreaterThan(1.5);
    expect(popped).toBeGreaterThan(landed + 1.5);
  });
});
