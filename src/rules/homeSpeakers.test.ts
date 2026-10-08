// Home as its ring of speakers (Ed, 2026-10-08: "home as 12 speakers at 500 hp each"; rules/speakers.ts): each speaker its
// own soundsystem in the fight, the besiegers going for the nearest one standing, each showing its own damage, and home
// lost (the soundsystemLost event, the party's over) only when the last of them falls.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { setupArena } from "./arena";
import { isHomeKey, speakerKey } from "./speakers";
import { powerReport } from "./power";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const homeKeys = (g: Game) => [...g.combat.sounds.keys()].filter(isHomeKey);

/** Besiegers on home from the arena (below the dancefloor), hers out of the way, the witch high and far off. */
function siege(spec = "wolf*1@2,boar*4@2!"): Game {
  const g = newGame(7, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  setupArena(g, spec);
  for (const id of g.arena!.ids) { const c = g.creatures[id]; if (!c.siege) c.gone = true; else { c.fight = undefined; g.combat.busy.add(c.id); } } // (marching: a siege under way)
  g.witches[0].health.hp = 1e6;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1, x: g.witch.x - 400 };
  return g;
}

describe("home's speakers (Ed, 2026-10-08)", () => {
  it("are twelve soundsystems at the ring's speakers, each combat.speakerHealth (500), and there's no single home", () => {
    const g = newGame(123, TUNING), C = TUNING.combat;
    expect(C.speakerHealth).toBe(500);
    expect(homeKeys(g)).toEqual(g.map.dancefloor.speakers.map((_, i) => speakerKey(i)));
    expect(homeKeys(g).length).toBe(12);
    g.map.dancefloor.speakers.forEach((p, i) => expect(g.combat.sounds.get(speakerKey(i))).toEqual({ hp: 500, max: 500, x: p.x, z: p.z, radius: C.speakerRadius }));
    expect(g.combat.sounds.has("home")).toBe(false);
  });

  it("each besieger goes for its nearest speaker standing; a speaker shows damaged at half, destroyed at none, and they move on", () => {
    const g = siege(), marchers = g.arena!.ids.map(id => g.creatures[id]).filter(c => !c.gone);
    const nearest = (x: number, z: number) => homeKeys(g).filter(k => g.combat.sounds.get(k)!.hp > 0).sort((p, q) => { const a = g.combat.sounds.get(p)!, b = g.combat.sounds.get(q)!; return Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z); })[0];
    const before = marchers.map(c => nearest(c.x, c.z));
    stepGame(g, idle, STEP);
    marchers.forEach((c, j) => expect(c.siege, `${c.id}`).toBe(before[j]));
    // Until one falls: each speaker's look follows its own health.
    const fell = () => homeKeys(g).find(k => g.combat.sounds.get(k)!.hp <= 0);
    let sawDamaged = false;
    for (let k = 0; k < 120 / STEP && !fell(); k++) {
      stepGame(g, idle, STEP);
      homeKeys(g).forEach((key, i) => { const h = g.combat.sounds.get(key)!; if (h.hp > 0) expect(g.speakers[i], key).toBe(h.hp <= 250 ? "damaged" : "playing"); if (h.hp > 0 && h.hp <= 250) sawDamaged = true; });
    }
    const first = fell()!, i = Number(first.slice(5));
    expect(first).toBeDefined(); expect(sawDamaged).toBe(true);
    stepGame(g, idle, STEP);
    expect(g.speakers[i]).toBe("destroyed");
    expect(g.waveEvents.some(e => e.kind === "soundsystemLost")).toBe(false); // (one speaker isn't home)
    expect(g.partyOver).toBeNull();
    const left = marchers.filter(c => !c.gone);
    expect(left.length).toBeGreaterThan(0);
    for (const c of left) { expect(isHomeKey(c.siege ?? ""), `${c.id}`).toBe(true); expect(g.combat.sounds.get(c.siege!)!.hp, `${c.id} on a standing one`).toBeGreaterThan(0); }
    // The debug overlay counts home's besiegers as one siege, its health the ring's together.
    const p = powerReport(g.creatures, g.witches, g.combat.sounds), home = p.sieges.find(s => s.key === "home")!;
    expect(p.sieges.filter(s => isHomeKey(s.key))).toEqual([home]);
    expect(home.hp).toBeCloseTo(homeKeys(g).reduce((a, k) => a + Math.max(0, g.combat.sounds.get(k)!.hp), 0), 6);
  }, 180_000);

  it("home is lost only when the last speaker falls: then soundsystemLost (home) and, every other one down, the party's over", () => {
    const g = siege(), keys = homeKeys(g);
    for (const k of keys.slice(1)) g.combat.sounds.get(k)!.hp = 0;
    stepGame(g, idle, STEP);
    expect(g.speakers.filter(s => s === "destroyed").length).toBe(11);
    expect(g.partyOver).toBeNull();
    const last = g.combat.sounds.get(keys[0])!;
    last.hp = 1;
    for (const c of g.arena!.ids.map(id => g.creatures[id]).filter(c => !c.gone)) { c.x = last.x + 3; c.z = last.z + 2; }
    for (let k = 0; k < 60 / STEP && !g.partyOver; k++) stepGame(g, idle, STEP);
    expect(g.waveEvents.filter(e => e.kind === "soundsystemLost").map(e => e.key)).toEqual(["home"]);
    expect(g.speakers.every(s => s === "destroyed")).toBe(true);
    expect(g.partyOver).not.toBeNull();
  }, 120_000);
});
