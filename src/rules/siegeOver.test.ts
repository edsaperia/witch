// A lost soundsystem's besiegers march on to the next-nearest standing one, and with every one down the party's over (Ed,
// 2026-10-05, 2026-10-06; rules/combat.ts marchOn, rules/partyOver.ts). The full smoke's siege (tools/smoke/smoke.cjs) had
// a second wave stand a soundsystem nearer than home mid-siege once waves came a minute apart (#577): its besiegers rightly
// went for that one, and with only home brought down the party never ended. These hold both cases.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Game } from "./game";
import { TUNING } from "./tuning";
import { isHomeKey } from "./speakers";
import { cellKey } from "./party";

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
  for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; }
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

  it("its besiegers leave for the next one at once (Ed's playtest, 2026-10-09: they seemed not to leave their area): marching on at combat.marchOnRun", () => {
    const { g, besiegers } = siege(), left = besiegers.filter(c => !c.gone);
    expect(left.length).toBeGreaterThan(0);
    const dist = (c: (typeof left)[number]) => { const h = g.combat.sounds.get(c.siege!)!; return Math.hypot(h.x - c.x, h.z - c.z); };
    const d0 = left.map(dist);
    for (let i = 0; i < 20 / STEP; i++) stepGame(g, idle, STEP);
    // 20 s on, each is well on its way: at its old amble (its speed times marchMult, under 1 m/s) it had gone some 15 m; at marchOnRun's 5 m/s, 100.
    left.forEach((c, i) => expect(d0[i] - dist(c), c.species).toBeGreaterThan(60));
  }, 120000);

  it("with another soundsystem standing nearer than home (a second wave's), they march on to that one instead, and the party goes on", () => {
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
    const s2 = g.combat.sounds.get(second)!; s2.x = sound.x + 30; s2.z = sound.z; s2.hp = s2.max = 1e9; // (the second wave's 30 m off, nearer than home: the smoke's case, made sure of)
    const besiegers = g.creatures.filter(c => c.siege === key && !c.boss);
    for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 8; c.z = sound.z + 5 + c.rand() * 3; }
    for (let i = 0; i < 120 / STEP && sound.hp > 0; i++) stepGame(g, idle, STEP);
    expect(sound.hp).toBe(0);
    // Each to the standing soundsystem nearest it (rules/combat.ts marchOn), some to the second wave's: the smoke's case.
    const standing = [...g.combat.sounds].filter(([, h]) => h.hp > 0), left = besiegers.filter(c => !c.gone);
    for (const c of left) { const best = standing.reduce((m, [k, h]) => (Math.hypot(h.x - c.x, h.z - c.z) < m.d ? { k, d: Math.hypot(h.x - c.x, h.z - c.z) } : m), { k: "", d: Infinity }); expect(c.siege).toBe(best.k); }
    expect(left.length).toBeGreaterThan(0); expect(left.every(c => c.siege === second)).toBe(true);
    for (const [k, h] of g.combat.sounds) if (isHomeKey(k)) h.hp = 0;
    expect(g.partyOver).toBeNull(); // (one still stands)
  }, 120000);
});
