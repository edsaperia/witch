// Fight movement styles by species (Ed's playtest, 2026-10-29: "enemies (and friends, even more) bunch up, and I think their lulls are
// too close; I think the feeling should be enemies thundering around the area, running past me, circling, flanking, more dynamic.
// Enemies that move in big hops were fun to fight"; config/packs.json _styles): the styles' shapes in a real fight at her, the lull's
// spread, her animals' places round what they fight, and 💌s still finding the quick movers.
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING } from "../tuning";
import { FIGHT } from "../movement";
import { type Creature } from "../creatures";
import { PACKS, spreadLull, strikingNow, styleOf, wheelSlot, type PackState } from "./packs";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** A debug arena run for `secs`, `each` called every step with the game and the arena's creatures; `ctl` her controls by the time. */
function arena(spec: string, secs: number, each: (g: Game, them: Creature[]) => void, ctl: (t: number, g: Game) => Controls = () => idle, seed = 5): Game {
  const g = newGame(seed, TUNING);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  const ids = g.arena!.ids;
  for (let i = 0; i < secs / STEP; i++) {
    g.witches[0].health.hp = 1e6;
    stepGame(g, ctl(i * STEP, g), STEP);
    each(g, ids.map(id => g.creatures[id]).filter(c => c && !c.gone));
  }
  return g;
}
const packOf = (g: Game): PackState | undefined => [...(g.combat.packs?.values() ?? [])].find(p => !p.hers);
const angle = (a: number) => ((a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

describe("fight styles by species (Ed's playtest, 2026-10-29)", () => {
  it("gives every listed kind a known style, the mix Ed chose (chargers, circlers, flankers, hoppers; the rest steady)", () => {
    const styles = new Set(["charger", "circler", "flanker", "hopper"]);
    for (const [k, s] of Object.entries(PACKS.style)) { expect(styles.has(s), `${k}: ${s}`).toBe(true); expect(PACKS.kinds[k], `${k} is a pack kind`).toBeTruthy(); }
    expect([styleOf("boar"), styleOf("wolf"), styleOf("fox"), styleOf("hare"), styleOf("snail")]).toEqual(["charger", "circler", "flanker", "hopper", "steady"]);
    const count = (s: string) => Object.values(PACKS.style).filter(v => v === s).length;
    for (const s of styles) expect(count(s), s).toBeGreaterThanOrEqual(5);
  });

  it("spreads a lull: each member its own place, further out, never two within lullGap", () => {
    const p = { x: 0, z: 0 }, Y = PACKS.styles;
    const es = [0, 1, 2, 3, 4, 5].map(i => ({ m: { id: i } as Creature, d: { slot: { x: 16 + (i % 2) * 0.5, z: i * 1.5 } } })); // (a huddle, 1.5 m apart)
    const was = es.map(e => Math.hypot(e.d.slot.x, e.d.slot.z));
    spreadLull(es, p);
    for (let a = 0; a < es.length; a++) for (let b = a + 1; b < es.length; b++) expect(Math.hypot(es[a].d.slot!.x - es[b].d.slot!.x, es[a].d.slot!.z - es[b].d.slot!.z)).toBeGreaterThan(Y.lullGap * FIGHT.scale * 0.85);
    const now = es.map(e => Math.hypot(e.d.slot!.x, e.d.slot!.z));
    expect(now.reduce((a, b) => a + b) / now.length).toBeGreaterThan((was.reduce((a, b) => a + b) / was.length) * Y.lullOut * 0.8);
  });

  it("wheels a charger round her in its lull, the pack all one way, wider than its pattern's distance", () => {
    const p = { x: 0, z: 0 }, R = { out: 16 }, m = { id: 1, x: 20, z: 0 } as Creature;
    const a = wheelSlot({ seed: 0.2 }, R, m, p), b = wheelSlot({ seed: 0.8 }, R, m, p);
    expect(Math.hypot(a.x, a.z)).toBeCloseTo(R.out * PACKS.styles.charger.wheel * FIGHT.scale, 5);
    expect(Math.sign(Math.atan2(a.z, a.x))).toBe(-Math.sign(Math.atan2(b.z, b.x))); // (the seed picks the way round)
  });

  it("a boar pack in its lulls stays out past her and goes round her, not backing off in a line", () => {
    let lull = 0, far = 0, turn = 0;
    const last = new Map<number, number>();
    arena("pack-boar", 30, (g, them) => {
      const st = packOf(g), W = g.witches[0].body;
      for (const c of them) {
        const a = Math.atan2(c.z - W.z, c.x - W.x), was = last.get(c.id);
        last.set(c.id, a);
        if (st?.phase !== "lull" || c.charge || was === undefined) continue;
        lull++; if (Math.hypot(c.x - W.x, c.z - W.z) > PACKS.retreats[PACKS.kinds.boar.retreat].out * FIGHT.scale) far++;
        turn += Math.abs(angle(a - was));
      }
    });
    expect(lull).toBeGreaterThan(60);
    expect(far / lull).toBeGreaterThan(0.5);
    expect((turn / (lull * STEP)) * (180 / Math.PI)).toBeGreaterThan(8); // (degrees a second round her; a backLine's straight back is under 3)
  });

  it("a fox pack flanks her: waiting their turns as she walks, they keep beside or behind her, not in front", () => {
    let n = 0, off = 0;
    arena("pack-fox", 30, (g, them) => {
      const st = packOf(g), W = g.witches[0].body, v = Math.hypot(W.vx ?? 0, W.vz ?? 0);
      if (!st || (st.phase !== "combo" && st.phase !== "tell") || v < 2) return;
      const front = Math.atan2(W.vz!, W.vx!);
      for (const c of them) {
        if (strikingNow(c) || c.fight?.target?.kind !== "witch") continue;
        n++; off += Math.abs(angle(Math.atan2(c.z - W.z, c.x - W.x) - front));
      }
    }, t => ({ ...idle, moveX: Math.cos(t * 0.3), moveZ: Math.sin(t * 0.3) }));
    expect(n).toBeGreaterThan(60);
    expect((off / n) * (180 / Math.PI)).toBeGreaterThan(75); // (in front of her would be 0; evenly round, 90)
  });

  it("a hare pack moves in hops: bounds of several metres, through the air, never jumping (Ed: nothing teleports)", () => {
    let hops = 0, longest = 0, worst = 0;
    const seen = new Set<string>(), prev = new Map<number, { x: number; z: number }>();
    arena("pack-hare", 20, (_g, them) => {
      for (const c of them) {
        const h = c.hop, p = prev.get(c.id);
        if (h) { const k = `${c.id}@${h.at}`; if (!seen.has(k)) { seen.add(k); hops++; longest = Math.max(longest, Math.hypot(h.tx - h.fx, h.tz - h.fz)); } }
        if (p && h) worst = Math.max(worst, Math.hypot(c.x - p.x, c.z - p.z) / (Math.hypot(h.tx - h.fx, h.tz - h.fz) / Math.max(0.01, h.lands - h.at) * STEP + 1e-3));
        prev.set(c.id, { x: c.x, z: c.z });
      }
    });
    expect(hops).toBeGreaterThan(20);
    expect(longest).toBeGreaterThan(PACKS.styles.hopper.length * FIGHT.scale * 0.9);
    expect(worst).toBeLessThan(1.6); // (a step in the air no further than its bound's pace takes it)
  });

  it("spreads her animals round what they fight, not piling on one spot", () => {
    let n = 0, gap = 0;
    arena("hers-wolf", 25, g => {
      const mine = g.creatures.filter(c => c.leashed && !c.gone && c.fight?.target?.kind === "creature" && !strikingNow(c));
      const by = new Map<number, Creature[]>();
      for (const c of mine) { const id = (c.fight!.target as { id: number }).id, l = by.get(id); if (l) l.push(c); else by.set(id, [c]); }
      for (const l of by.values()) if (l.length > 1) for (let a = 0; a < l.length; a++) for (let b = a + 1; b < l.length; b++) { n++; gap += Math.hypot(l[a].x - l[b].x, l[a].z - l[b].z); }
    });
    expect(n).toBeGreaterThan(50);
    expect(gap / n).toBeGreaterThan(4 * FIGHT.scale); // (two on one foe, a few metres apart round it: on one spot they'd be about 1 to 2)
  });

  it("💌s still find the quick movers: thrown at a circling stoat pack and a hopping hare pack, nearly half or more land", () => {
    for (const kind of ["stoat", "hare"]) {
      const shots = new Set<number>(), hit = new Set<number>();
      arena(`pack-${kind}`, 20, g => {
        for (const e of g.witches[0].invites.events) { if (e.kind === "shot") shots.add(e.n); if (e.kind === "hit") hit.add(e.n); }
      }, (t, g) => {
        // (she throws at the nearest of them, as a player aims, a 💌 every half a second)
        const W = g.witches[0].body, them = g.arena!.ids.map(id => g.creatures[id]).filter(c => c && !c.gone && c.state !== "happy");
        const o = them.sort((a, b) => Math.hypot(a.x - W.x, a.z - W.z) - Math.hypot(b.x - W.x, b.z - W.z))[0];
        return { ...idle, fire: !!o && t > 1 && Math.floor(t * 4) % 2 === 0, aimX: o ? o.x - W.x : 1, aimZ: o ? o.z - W.z : 0 };
      });
      expect(shots.size, kind).toBeGreaterThan(10);
      expect(hit.size / shots.size, kind).toBeGreaterThanOrEqual(0.45); // (aimed where they are: before the styles, 57% on the stoats and 58% on the hares; since, with the homing leading them, about 48% and 87%)
    }
  });
});
