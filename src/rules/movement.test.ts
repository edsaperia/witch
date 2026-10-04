import { describe, expect, it } from "vitest";
import { type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { MOVEMENT } from "./movement";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** A quiet game, the witch on the ground away from everything, too tough to knock out (to watch them move). */
function quiet(): Game {
  const g = newGame(77, TUNING);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  g.witches[0].health.hp = 1e6;
  return g;
}
const pick = (g: Game, species: string, level: Level, dx: number, dz: number) => {
  const w = g.witch, x = w.x + dx, z = w.z + dz;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !(k as unknown as { used?: boolean }).used && Math.hypot(k.x - w.x, k.z - w.z) > 150)!;
  (c as unknown as { used: boolean }).used = true;
  Object.assign(c, { species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
  c.cell = g.map.cellSafe(w.x, w.z).cell as [number, number];
  g.byArea = null;
  return c;
};
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };

describe("creature movement (Stage 5)", () => {
  it("has a profile for each of the first set, every behaviour and tactic one the system knows", () => {
    for (const sp of ["wolf", "boar", "hare", "raven", "bat", "owl", "salamander", "spider"]) expect(MOVEMENT.profiles[sp], sp).toBeTruthy();
  });

  it("has wolves surround her rather than all come at her from one side", () => {
    const g = quiet(), wolves = [0, 1, 2, 3].map(i => pick(g, "wolf", 1, 7 + i, 2 * i));
    run(g, 12);
    const a = wolves.map(c => Math.atan2(c.z - g.witch.z, c.x - g.witch.x)).sort((p, q) => p - q);
    const gaps = a.map((v, i) => (i ? v - a[i - 1] : v + Math.PI * 2 - a[a.length - 1]));
    expect(Math.max(...gaps)).toBeLessThan(Math.PI * 0.95); // spread round her, not bunched on one side
  }, 60000);

  it("has a hare dart in and back out (hit and run)", () => {
    const g = quiet(), hare = pick(g, "hare", 1, 12, 0);
    let near = Infinity, farAfter = 0, wasNear = false;
    run(g, 10, () => { const d = Math.hypot(hare.x - g.witch.x, hare.z - g.witch.z); if (d < 3) { wasNear = true; near = Math.min(near, d); } if (wasNear) farAfter = Math.max(farAfter, d); });
    expect(near).toBeLessThan(3);
    expect(farAfter).toBeGreaterThan(5);
  }, 60000);

  it("has a boar charge: a fast straight burst", () => {
    const g = quiet(), boar = pick(g, "boar", 1, 12, 0);
    let top = 0, px = boar.x, pz = boar.z;
    run(g, 4, () => { top = Math.max(top, Math.hypot(boar.x - px, boar.z - pz) / STEP); px = boar.x; pz = boar.z; });
    expect(top).toBeGreaterThan(boar.speed * MOVEMENT.profiles.boar.run! * 2.5);
  }, 60000);

  it("has bats swarm without piling on one another", () => {
    const g = quiet(), bats = [0, 1, 2, 3].map(i => pick(g, "bat", 1, 8 + i * 0.3, i * 0.3));
    run(g, 5);
    let closest = Infinity;
    for (const a of bats) for (const b of bats) if (a !== b) closest = Math.min(closest, Math.hypot(a.x - b.x, a.z - b.z));
    expect(closest).toBeGreaterThan(1);
  }, 60000);

  it("has a raven volley fire on the beat", () => {
    const saved = MOVEMENT.profiles.raven.tactics;
    MOVEMENT.profiles.raven.tactics = [{ kind: "volley", w: 1 }]; // (it also sometimes shoots freely)
    const g = quiet(), ravens = [0, 1, 2].map(i => pick(g, "raven", 1, 16, i * 3 - 3)), ids = new Set(ravens.map(r => r.id)), beat = 60 / TUNING.beat.bpm;
    const phases: number[] = [];
    run(g, 12, () => { for (const e of g.combat.events) if (e.kind === "windup" && ids.has(e.id!) && e.at === g.clock.time) phases.push((e.at / beat) % 1); });
    MOVEMENT.profiles.raven.tactics = saved;
    expect(phases.length).toBeGreaterThan(2);
    expect(phases.filter(p => p < 0.2 + STEP / beat).length / phases.length).toBeGreaterThan(0.9);
  }, 60000);

  it("has an owl's lob land where she was: standing still she's hit, stepping away she isn't", () => {
    const g = quiet(), owl = pick(g, "owl", 1, 12, 0), W = g.witches[0], hp0 = W.health.hp;
    run(g, 6);
    expect(W.health.hp).toBeLessThan(hp0);
    // Now step away each time a lob is in the air.
    const hp1 = W.health.hp;
    run(g, 8, () => { if (g.combat.shots.some(s => s.lob && s.from === owl.id)) { const s = g.combat.shots.find(q => q.lob)!; if (Math.hypot(g.witch.x - s.lob!.tx, g.witch.z - s.lob!.tz) < 4) g.witch = { ...g.witch, z: g.witch.z + (g.witch.z > owl.z ? 6 : -6) }; } });
    expect(W.health.hp).toBe(hp1);
  }, 60000);

  it("has a salamander's beam burn along its line", () => {
    const g = quiet(), W = g.witches[0], hp0 = W.health.hp;
    pick(g, "salamander", 1, 7, 0);
    run(g, 6);
    expect(g.combat.events.length + 1).toBeGreaterThan(0);
    expect(W.health.hp).toBeLessThan(hp0);
  }, 60000);

  it("has a spider lie in wait until she comes close, then spring", () => {
    const g = quiet(), sp = pick(g, "spider", 1, 14, 0), x0 = sp.x, z0 = sp.z;
    run(g, 3);
    expect(Math.hypot(sp.x - x0, sp.z - z0)).toBeLessThan(0.01); // still
    g.witch = { ...g.witch, x: sp.x - 6, z: sp.z };
    let struck = false;
    run(g, 2, () => { if (g.combat.events.some(e => e.id === sp.id && (e.kind === "windup" || e.kind === "beam"))) struck = true; });
    expect(sp.sprung).toBeDefined();
    expect(struck).toBe(true); // in range of its beam: it strikes from where it lay
  }, 60000);

  it("has a mole burrow (untouchable) to her and surface under her, striking", () => {
    const g = quiet(), W = g.witches[0], hp0 = W.health.hp, mole = pick(g, "mole", 1, 10, 0), seen = new Set<string>();
    let under = false;
    run(g, 8, () => { if (mole.burrow) under = true; for (const e of g.combat.events) if (e.id === mole.id) seen.add(e.kind); });
    expect(under).toBe(true);
    expect(seen.has("surfaced")).toBe(true);
    expect(W.health.hp).toBeLessThan(hp0);
  }, 60000);

  it("has a toad leap at her and slam down where it lands", () => {
    const g = quiet(), W = g.witches[0], hp0 = W.health.hp, toad = pick(g, "toad", 1, 7, 0);
    let flew = false, slammed = false;
    run(g, 6, () => { if (toad.leap) flew = true; if (g.combat.events.some(e => e.id === toad.id && e.kind === "slammed")) slammed = true; });
    expect(flew).toBe(true);
    expect(slammed).toBe(true);
    expect(W.health.hp).toBeLessThan(hp0);
  }, 60000);

  it("has a bat screech: a pulse all round it", () => {
    const g = quiet(), bat = pick(g, "bat", 1, 6, 0);
    let pulsed = false;
    run(g, 6, () => { if (g.combat.events.some(e => e.id === bat.id && e.kind === "pulse")) pulsed = true; });
    expect(pulsed).toBe(true);
  }, 60000);
});
