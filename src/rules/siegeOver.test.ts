// A lost soundsystem's besiegers march on to the next-nearest standing one, and with every one down the party's over (Ed,
// 2026-10-05, 2026-10-06; rules/combat.ts marchOn, rules/partyOver.ts). The full smoke's siege (tools/smoke/smoke.cjs) had
// a second wave stand a soundsystem nearer than home mid-siege once waves came a minute apart (#577): its besiegers rightly
// went for that one, and with only home brought down the party never ended. These hold both cases.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Game } from "./game";
import { TUNING } from "./tuning";
import { isHomeKey } from "./speakers";
import { cellKey } from "./party";
import { nearestSound } from "./combat/targeting";

// Keep the smoke's seed-123 radius route: tests compare inward/outward second-wave targets and require >60 m of real march toward home.
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** Seed 123 (the smoke's), the waves held, wave 1 brought on with its area's creatures grown to young, its soundsystem cut
 *  short and its besiegers beside it; stepped till it falls. */
function siege(): { g: Game; key: string; besiegers: Game["creatures"] } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  stepGame(g, idle, STEP);
  const next = g.party.next[0];
  g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1]).forEach(c => { c.level = 1; });
  stepGame(g, { ...idle, nextWave: true }, STEP);
  const key = cellKey(next), sound = g.combat.sounds.get(key)!;
  sound.hp = sound.max = 150;
  const besiegers = g.creatures.filter(c => c.siege === key && !c.boss);
  for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; c.fight = undefined; } // (put beside it, nothing else in mind: at half their top speed a stale target's reached in seconds)
  for (let i = 0; i < 120 / STEP && sound.hp > 0; i++) stepGame(g, idle, STEP);
  expect(sound.hp).toBe(0);
  return { g, key, besiegers };
}

describe("a siege lost, and the party's over (the full smoke's siege, #577's minute waves)", () => {
  it("its besiegers march on to home's speakers; with them down, from anywhere round the floor (inside the ring too), the party's over", () => {
    const { g, key, besiegers } = siege();
    expect(g.party.areas.has(key)).toBe(false);
    const left = besiegers.filter(c => !c.gone);
    expect(left.length).toBeGreaterThan(0);
    for (const c of left) expect(isHomeKey(c.siege ?? ""), c.siege).toBe(true);
    for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = 0.001;
    for (const c of left) { c.x = g.map.dancefloor.x + 6; c.z = g.map.dancefloor.z + 6; } // (inside the speakers' ring, as the smoke drops them)
    for (let i = 0; i < 90 / STEP && !g.partyOver; i++) stepGame(g, idle, STEP);
    expect(g.partyOver).not.toBeNull();
  }, 120000);

  it("its besiegers leave for the next one at once (Ed's playtest, 2026-10-09: they seemed not to leave their area): marching on at combat.marchShare of its top speed (Ed, 2026-10-11)", () => {
    const { g, besiegers } = siege(), left = besiegers.filter(c => !c.gone);
    expect(left.length).toBeGreaterThan(0);
    const dist = (c: (typeof left)[number]) => { const h = g.combat.sounds.get(c.siege!)!; return Math.hypot(h.x - c.x, h.z - c.z); };
    const d0 = left.map(dist);
    for (let i = 0; i < 20 / STEP; i++) stepGame(g, idle, STEP);
    // 20 s on, each is well on its way: at its old amble (its walk times marchMult, under 1 m/s) it had gone some 15 m; at half its top speed, far more.
    left.forEach((c, i) => expect(d0[i] - dist(c), c.species).toBeGreaterThan(60));
  }, 120000);

  it("with another soundsystem standing nearer than home (a second wave's), they march on to that one instead; home's speakers down, the party's over all the same", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    stepGame(g, idle, STEP);
    const first = g.party.next[0];
    g.creatures.filter(c => c.cell[0] === first[0] && c.cell[1] === first[1]).forEach(c => { c.level = 1; });
    stepGame(g, { ...idle, nextWave: true }, STEP);
    stepGame(g, { ...idle, nextWave: true }, STEP); // (the second wave: another soundsystem)
    const key = cellKey(first), sound = g.combat.sounds.get(key)!, second = [...g.combat.sounds.keys()].find(k => !isHomeKey(k) && k !== key)!;
    expect(second).toBeTruthy();
    sound.hp = sound.max = 150;
    const s2 = g.combat.sounds.get(second)!, F = g.map.dancefloor, k = Math.hypot(F.x - sound.x, F.z - sound.z); s2.x = sound.x + ((F.x - sound.x) / k) * 30; s2.z = sound.z + ((F.z - sound.z) / k) * 30; s2.hp = s2.max = 1e9; // (the second wave's 30 m off toward home, nearer than home: the smoke's case, made sure of; inward, so they may go for it)
    const besiegers = g.creatures.filter(c => c.siege === key && !c.boss);
    for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; c.fight = undefined; } // (put beside it, nothing else in mind: at half their top speed a stale target's reached in seconds)
    for (let i = 0; i < 120 / STEP && sound.hp > 0; i++) stepGame(g, idle, STEP);
    expect(sound.hp).toBe(0);
    // Each to the standing soundsystem nearest it that's no further out (rules/combat.ts marchOn, inward: Ed, 2026-10-11), so those
    // still at the fallen one to the second wave's: the smoke's case. (One that had already run further in goes on inward, to home.)
    const left = besiegers.filter(c => !c.gone), F0 = g.map.dancefloor;
    for (const c of left) expect(c.siege).toBe(nearestSound(g.combat, c.x, c.z, F0));
    const there = left.filter(c => Math.hypot(c.x - sound.x, c.z - sound.z) < 20);
    expect(there.length).toBeGreaterThan(0); expect(there.every(c => c.siege === second)).toBe(true);
    // Home's last speaker down: the party's over, the second wave's still standing, switched off (Ed, 2026-10-10: "The party
    // should end when all your home speakers are destroyed, not all speakers+soundsystems").
    for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = 0;
    stepGame(g, idle, STEP);
    expect(g.partyOver).not.toBeNull();
    expect(s2.hp).toBeGreaterThan(0);
    expect(g.party.areas.has(second)).toBe(true);
    expect(g.creatures.some(c => c.siege === second)).toBe(false); // (nothing besieges it: everyone's off to bed)
  }, 120000);

  it("marching on, they never go for a soundsystem further from the centre than they are (Ed, 2026-10-11: enraged animals march inward), even the nearest", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    stepGame(g, idle, STEP);
    const first = g.party.next[0];
    g.creatures.filter(c => c.cell[0] === first[0] && c.cell[1] === first[1]).forEach(c => { c.level = 1; });
    stepGame(g, { ...idle, nextWave: true }, STEP);
    stepGame(g, { ...idle, nextWave: true }, STEP);
    const key = cellKey(first), sound = g.combat.sounds.get(key)!, second = [...g.combat.sounds.keys()].find(k => !isHomeKey(k) && k !== key)!;
    sound.hp = sound.max = 150;
    // The second wave's 30 m off, further out from home: the nearest to them by far, but outward.
    const s2 = g.combat.sounds.get(second)!, F = g.map.dancefloor, k = Math.hypot(F.x - sound.x, F.z - sound.z); s2.x = sound.x - ((F.x - sound.x) / k) * 30; s2.z = sound.z - ((F.z - sound.z) / k) * 30; s2.hp = s2.max = 1e9;
    const besiegers = g.creatures.filter(c => c.siege === key && !c.boss);
    for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; c.fight = undefined; } // (put beside it, nothing else in mind: at half their top speed a stale target's reached in seconds)
    for (let i = 0; i < 120 / STEP && sound.hp > 0; i++) stepGame(g, idle, STEP);
    expect(sound.hp).toBe(0);
    const left = besiegers.filter(c => !c.gone), out = (x: number, z: number) => Math.hypot(x - F.x, z - F.z);
    expect(left.length).toBeGreaterThan(0);
    for (const c of left) { const h = g.combat.sounds.get(c.siege!)!; expect(isHomeKey(c.siege!) || out(h.x, h.z) <= out(c.x, c.z) + 10, c.siege).toBe(true); }
    expect(left.some(c => c.siege === second)).toBe(false);
    for (let i = 0; i < 10 / STEP; i++) stepGame(g, idle, STEP); // (and stay so on the march)
    expect(left.filter(c => !c.gone).some(c => c.siege === second)).toBe(false);
  }, 120000);
});
