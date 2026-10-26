// The victory music (wave 2's finale, Ed approved, 2026-10-11): when an island is won, its lap, its party (a conga line
// round the dancefloor) play the style's victory section: the drop a whole step up, choir,
// strings and arp over it, the claps in a conga line, looping clean.
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { checkStyle, notesAt, resolveSection, type BlockPlan, type MusicStyle } from "./musicScore";

const style = styleJson as unknown as MusicStyle;
const notes = (section: string, bars = 8) => {
  const plan: BlockPlan = { section, start: 0, bars, wave: 2, arc: 2 };
  return Array.from({ length: bars * 16 }, (_, s) => notesAt(style, plan, null, s, { seed: 7, siege: 0 })).flat();
};

describe("the victory section", () => {
  it("is named by the style and sound", () => {
    expect(style.victory).toBe("victory");
    expect(style.sections[style.victory!]).toBeTruthy();
    expect(checkStyle(style)).toEqual([]);
  });

  it("lifts the drop a whole step, with more over it", () => {
    const v = resolveSection(style, "victory"), drop = resolveSection(style, "drop");
    expect(v.transpose).toBe(2);
    expect(v.impact).toBe(true); // (it lands with the drop's crash)
    for (const p of Object.keys(drop.parts)) expect(v.parts[p], p).toBeTruthy(); // everything the drop has
    for (const p of ["choir", "arp", "strings", "shaker"]) expect(v.parts[p], p).toBeTruthy();
    const lowest = (ns: ReturnType<typeof notes>, part: string) => Math.min(...ns.filter(n => n.part === part && n.midi !== null).map(n => n.midi!));
    expect(lowest(notes("victory"), "bass") - lowest(notes("drop"), "bass")).toBe(2); // the same bass line, a whole step up
    expect(notes("victory").length).toBeGreaterThan(notes("drop").length);
  });

  it("claps a conga line (one, two, three, kick!) and loops with no fills", () => {
    const claps = notes("victory", 2).filter(n => n.part === "clap");
    expect(claps.map(n => n.step % 16)).toEqual([0, 4, 8, 14, 0, 4, 8, 14]);
    expect(claps.filter(n => n.step % 16 === 14).every(n => n.vel > claps.find(c => c.step % 16 === 0)!.vel)).toBe(true); // the kick accented
    const plan: BlockPlan = { section: "victory", start: 0, bars: 8, wave: 2, arc: 2 };
    expect(notesAt(style, plan, { ...plan, start: 8 }, 7 * 16 + 12, { seed: 7, siege: 0 }).some(n => n.part === style.fill.part && n.vel > 0)).toBe(
      notesAt(style, plan, null, 7 * 16 + 12, { seed: 7, siege: 0 }).some(n => n.part === style.fill.part && n.vel > 0)); // (no fill into the next round)
    expect(resolveSection(style, "victory").ending).toBe("none");
  });
});
