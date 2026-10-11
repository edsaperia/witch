import { describe, expect, it } from "vitest";
import { GENOMES } from "../../art/genome/species.js";
import { congaBody, congaPose, newCongaPose, RIPPLE, type CongaBody } from "./conga";

const BODIES: CongaBody[] = ["quadruped", "avian", "flyer", "squat", "toad", "snail", "insectoid", "serpent"];
const sample = (body: CongaBody, place = 0, n = 64) => Array.from({ length: n }, (_, i) => ({ ...congaPose(body, (i / n) * 4, place, newCongaPose()) }));

describe("the conga, drawn", () => {
  it("every species has a body to dance it with", () => {
    for (const g of GENOMES as { id: string }[]) expect(BODIES).toContain(congaBody(g.id));
    expect(congaBody("snail")).toBe("snail");
    expect(congaBody("toad")).toBe("toad");
    expect(congaBody("owl")).toBe("avian");
    expect(congaBody("moth")).toBe("flyer");
  });

  it("each body moves its own way: no two bodies' bars alike", () => {
    const sig = (b: CongaBody) => sample(b).map(p => [p.y, p.sway, p.tap, p.sx, p.sy].map(v => v.toFixed(3)).join()).join("|");
    const seen = new Set(BODIES.map(sig));
    expect(seen.size).toBe(BODIES.length);
  });

  it("stays in bounds: on or over the ground, squash and stretch gentle, always leaning in", () => {
    for (const b of BODIES) for (const p of sample(b, 3)) {
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThan(0.8);
      expect(p.sx).toBeGreaterThan(0.8); expect(p.sx).toBeLessThan(1.2);
      expect(p.sy).toBeGreaterThan(0.8); expect(p.sy).toBeLessThan(1.2);
      expect(p.lean).toBeGreaterThanOrEqual(0); expect(p.lean).toBeLessThanOrEqual(0.15);
      expect(Math.abs(p.tap)).toBeLessThanOrEqual(1);
    }
  });

  it("on the beat, a bar of three steps and a kick, the kick biggest; flyers stay up, snails and snakes on the ground", () => {
    for (const b of ["quadruped", "avian", "toad", "insectoid"] as CongaBody[]) {
      const at = (beat: number) => congaPose(b, beat + 0.5, 0, newCongaPose()).y;
      expect(at(3)).toBeGreaterThan(at(0));
      expect(at(4 + 3)).toBeCloseTo(at(3), 9); // (a bar later, the same)
    }
    for (const p of sample("flyer")) expect(p.y).toBeGreaterThan(0.2);
    for (const b of ["snail", "serpent"] as CongaBody[]) for (const p of sample(b)) expect(p.y).toBe(0);
  });

  it("the step ripples back down the line: the one behind does it RIPPLE beats later", () => {
    const a = congaPose("quadruped", 3.3, 0, newCongaPose()), b = congaPose("quadruped", 3.3 + RIPPLE * 5, 5, newCongaPose());
    expect(b).toEqual(a);
  });
});
