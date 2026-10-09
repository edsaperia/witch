// Her posse defends her (Ed, 2026-10-09, via the coordinator: "Animals that are leashed should attack animals that are attacking
// you"): anything winding up on her, striking her or with her as its target is the posse's first target; each of hers following
// her takes the nearest attacker not already taken (spread out, not all on one), within its pursuit of her; with none on her,
// they go back to what they did (her animals' attackers, or nothing).
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, invites: { ...TUNING.invites, on: false } });

/** She stands in a wild area two out from home, `wild` of its creatures (young) set on her from 18 m, and `mine` of hers (young,
 *  leashed and following) 8 m behind her, so the attackers reach her first. */
export function scene(wild: string[], mine: string[], seed = 123): { g: Game; attackers: Creature[]; posse: Creature[] } {
  const g = newGame(seed, T), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  // (everyone else far off: just this fight)
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - site.x, c.z - site.z) < 200) c.gone = true;
  for (const c of g.creatures) if (c.boss && Math.hypot(c.x - site.x, c.z - site.z) < 400) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const put = (c: Creature, sp: string, x: number, z: number, level: Level = 1): Creature => Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: T.creatureSpeed * speedFactor(sp, level, T), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, circle: undefined, state: undefined, retreat: undefined, fleeUntil: undefined, dazed: false });
  const attackers = wild.map((sp, i) => { const a = (i / wild.length) * Math.PI - Math.PI / 2; return put(spare[i], sp, site.x + 18 + Math.cos(a) * 4, site.z + Math.sin(a) * 6); });
  const posse = mine.map((sp, i) => {
    const c = put(spare[wild.length + i], sp, site.x - 8, site.z - 3 + i * 3);
    c.leashed = true; c.state = "leashed"; c.homeX = c.x; c.homeZ = c.z;
    g.leash.stack.push(c.id);
    return c;
  });
  g.byArea = null;
  return { g, attackers, posse };
}
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };
const on = (c: Creature) => c.fight?.target?.kind === "creature" ? c.fight.target.id : c.fight?.target?.kind === "witch" ? -1 : null;

describe("her posse defends her", () => {
  it("two wild creatures come at her with three of hers by: within two seconds every attacker has one of hers on it", () => {
    const { g, attackers, posse } = scene(["boar", "boar"], ["wolf", "wolf", "fox"]);
    let at = -1;
    run(g, 2.5, () => {
      if (at >= 0) return;
      if (attackers.every(a => posse.some(p => on(p) === a.id))) at = g.clock.time;
    });
    expect(at).toBeGreaterThanOrEqual(0);
  }, 60000);

  it("one of hers goes for the creature on her before one on her animals, even a little further off", () => {
    const { g, attackers, posse } = scene(["boar", "deer"], ["wolf"]);
    const [onHer, onMine] = attackers, me = posse[0], w = g.witches[0].body;
    onHer.hunting = 0; // (it's after her and nothing else: rules/hunt.ts)
    Object.assign(onMine, { x: me.x + 6, z: me.z, tx: me.x + 6, tz: me.z, anchorX: me.x + 6, anchorZ: me.z }); // (right by her wolf)
    Object.assign(onHer, { x: w.x + 14, z: w.z, tx: w.x + 14, tz: w.z, anchorX: w.x + 14, anchorZ: w.z });
    let picked: number | null = null;
    run(g, 1, () => { if (picked === null && on(me) !== null && on(me) !== -1) picked = on(me); });
    expect(on(onHer)).toBe(-1);
    expect(picked).toBe(onHer.id);
  }, 60000);

  it("stays within her pursuit reach of her, and with none left on her or hers goes back to following", () => {
    const { g, attackers, posse } = scene(["boar", "boar"], ["wolf", "wolf", "fox"]);
    const w = g.witches[0].body, reach = g.tuning.combat.pursuit * g.tuning.fight.scale;
    let far = 0;
    run(g, 3, () => { for (const p of posse) far = Math.max(far, Math.hypot(p.x - w.x, p.z - w.z)); });
    expect(far).toBeLessThan(reach + 6); // (a lunge's carry past its target at most)
    for (const a of attackers) a.gone = true;
    run(g, 1);
    for (const p of posse) expect(p.fight?.target ?? null).toBeNull();
  }, 60000);

  // Ed (2026-10-09): "This shouldn't affect leashed animals that are far far away - just ones that are in the same combat as you."
  it("hers far off don't react: one parked at its sigil 120 m away, and one following but beyond combat.defendRadius of her, are never pulled into her fight", () => {
    const { g, attackers, posse } = scene(["boar", "boar"], ["wolf", "wolf", "fox"]);
    const w = g.witches[0].body, R = (g.tuning.combat.defendRadius ?? 30) * g.tuning.fight.scale;
    const [, parked, lagging] = posse;
    // one parked at its sigil far off
    g.leash.stack = g.leash.stack.filter(id => id !== parked.id);
    Object.assign(parked, { x: w.x - 120, z: w.z, tx: w.x - 120, tz: w.z });
    g.leash.placed.push({ id: parked.id, x: parked.x, z: parked.z, at: g.clock.time });
    // one following, lagging beyond defendRadius
    Object.assign(lagging, { x: w.x - R - 12, z: w.z, tx: w.x - R - 12, tz: w.z });
    let wrong = "";
    run(g, 2, () => {
      if (attackers.some(a => on(parked) === a.id)) wrong ||= `the parked one went for her attacker at ${g.clock.time.toFixed(2)}`;
      if (Math.hypot(lagging.x - w.x, lagging.z - w.z) > R && attackers.some(a => on(lagging) === a.id && on(a) !== lagging.id)) wrong ||= `the lagging one went into her fight from ${Math.hypot(lagging.x - w.x, lagging.z - w.z).toFixed(0)} m`;
    });
    expect(wrong).toBe("");
    expect(Math.hypot(parked.x - w.x, parked.z - w.z)).toBeGreaterThan(80); // (never pulled across to her fight)
  }, 60000);
});
