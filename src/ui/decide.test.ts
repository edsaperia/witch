// Ed's decisions panel (src/ui/decide.ts): config/decisions.json is sound (each entry's control, default and target real), and
// a confirmed choice makes the issue link and line the coordinator reads.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { applyKnobParams, currentValue, decisionLine, DECISION_LIST, issueUrl, knobAt, knobParam, parseValue, setKnob } from "./decide";

/** The URL switches the game reads (src/main.ts), and their values. */
const PARAMS: Record<string, string[]> = { style: ["now", "bold", "ref"], glide: ["witch", "camera"], props: ["gen", "hand"] };

describe("the decisions panel", () => {
  it("has sound entries: unique ids, 2 to 4 options, a default inside its control, a real knob or switch", () => {
    const ids = DECISION_LIST.map(d => d.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const d of DECISION_LIST) {
      expect(d.label.length, d.id).toBeGreaterThan(0);
      expect(d.note.length, d.id).toBeGreaterThan(0);
      expect(!!d.apply.knob !== !!d.apply.param, `${d.id}: a knob or a param, not both`).toBe(true);
      const c = d.control;
      if (c.type === "choice") {
        expect(c.options.length, d.id).toBeGreaterThanOrEqual(2);
        expect(c.options.length, d.id).toBeLessThanOrEqual(4);
        expect(c.options.map(o => o.value), d.id).toContain(d.default);
      } else if (c.type === "slider") {
        expect(c.min, d.id).toBeLessThan(c.max);
        expect(c.step, d.id).toBeGreaterThan(0);
        expect(d.default as number, d.id).toBeGreaterThanOrEqual(c.min);
        expect(d.default as number, d.id).toBeLessThanOrEqual(c.max);
      } else expect(typeof d.default, d.id).toBe("boolean");
      if (d.apply.knob) expect(knobAt(TUNING, d.apply.knob), `${d.id}: its shipped default is the tuning's`).toBe(d.default);
      else {
        expect(PARAMS[d.apply.param!], `${d.id}: a switch the game reads`).toBeDefined();
        if (c.type === "choice") for (const o of c.options) expect(PARAMS[d.apply.param!], d.id).toContain(o.value);
      }
    }
  });
  it("reads and sets knobs by path, and keeps a value inside its control", () => {
    const t = JSON.parse(JSON.stringify(TUNING));
    setKnob(t, "population.growth.perWave", 0.75);
    expect(knobAt(t, "population.growth.perWave")).toBe(0.75);
    const growth = DECISION_LIST.find(d => d.id === "growth")!;
    expect(parseValue(growth, "9")).toBe(1);
    expect(parseValue(growth, "x")).toBe(growth.default);
    const style = DECISION_LIST.find(d => d.id === "style")!;
    expect(parseValue(style, "bold")).toBe("bold");
    expect(parseValue(style, "nonsense")).toBe("bold");
    expect(currentValue(style, t, new URLSearchParams("style=ref"))).toBe("ref");
    expect(currentValue(growth, t, new URLSearchParams(""))).toBe(0.75);
  });
  it("puts the URL's knob choices on the tuning as the game starts", () => {
    const t = JSON.parse(JSON.stringify(TUNING));
    applyKnobParams(t, new URLSearchParams(`${knobParam("grace")}=0.2&${knobParam("legendFlash")}=1`));
    expect(t.witchHealth.grace).toBe(0.2);
    expect(t.attackFx.legendFlash).toBe(1);
  });
  it("makes a new-issue link labelled decision, with the choice, version, seed and panel", () => {
    const url = new URL(issueUrl("growth", 0.75, { growth: 0.75, style: "bold" }, "v1100 · abc123", 123, "https://edsaperia.github.io/witch/?decide"));
    expect(url.origin + url.pathname).toBe("https://github.com/edsaperia/witch/issues/new");
    expect(url.searchParams.get("labels")).toBe("decision");
    expect(url.searchParams.get("title")).toBe(decisionLine("growth", 0.75));
    const body = url.searchParams.get("body")!;
    for (const s of ["v1100 · abc123", "seed: 123", "\"style\": \"bold\"", "?decide"]) expect(body).toContain(s);
  });
});
