import { describe, expect, it } from "vitest";
import { hitWitch, newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { musicCue, silentAt, barAt } from "../../rules/musicPlan";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

// Ed, 2026-10-09: "the music stops when she gets knocked down, and she comes back to restart it by putting on a new record";
// "If the needle is not dropped, she can't be scratching - it drops, she scratches, then the music starts".
describe("knocked down: the record scratched, silence, the needle on a new record, her scratching, the music from the top", () => {
  it("plays it in that order, once", () => {
    const g = newGame(123, TUNING), heard: [string, number][] = [];
    const sfx = new Proxy({}, { get: (_, k) => (...a: unknown[]) => { if (k === "recordScratch" || k === "trumpetOff" || k === "rewind") heard.push([k, g.clock.time]); if (k === "deck") heard.push([`deck:${a[0]}`, g.clock.time]); } }) as unknown as Sfx;
    const cues = new SfxCues(sfx), me = g.witches[0];
    g.party.spellAt = -100; // (cast long ago, her intro routine over)
    cues.update(g, 0);
    me.health.hp = 1; g.clock.time = g.herTime = 20.3;
    hitWitch(g, 0, 20.3);
    const ko = me.ko!, back = ko.backAt;
    for (let t = 20.3; t < back + 1; t += 1 / 60) {
      g.clock.time = g.herTime = t;
      if (t >= (ko.teleportAt + ko.inAt) / 2) g.witch.seated = true; // (back behind her decks, as stepKnockout puts her)
      if (t >= back) me.ko = null;
      cues.update(g, t);
    }
    const names = heard.map(([k]) => k);
    expect(names[0]).toBe("recordScratch"); expect(heard[0][1]).toBeCloseTo(20.3, 6);
    expect(names.filter(k => k === "recordScratch").length).toBe(1);
    expect(names).not.toContain("rewind"); // (one scratch, not two)
    const drop = names.indexOf("deck:drop");
    expect(drop).toBeGreaterThan(0); expect(heard[drop][1]).toBeGreaterThanOrEqual(ko.inAt! - 1e-9);
    expect(names.filter(k => k === "deck:drop").length).toBe(1);
    const strokes = heard.slice(drop + 1).filter(([k]) => k.startsWith("deck:") && k !== "deck:hype");
    expect(strokes.length).toBeGreaterThan(2); // she scratches on the new record
    expect(strokes.every(([, t]) => t < back)).toBe(true);
    // the music: silent from the knockdown to the new record's first downbeat, re-seeded there
    const cue = musicCue(g);
    expect(silentAt(cue, barAt(g.beat, 20.31))).toBe(true);
    expect(silentAt(cue, barAt(g.beat, back - 0.01))).toBe(true);
    expect(silentAt(cue, barAt(g.beat, back + 1e-6))).toBe(false);
  });
});
