// Ed's decisions panel (src/ui/decide.ts): config/decisions.json is sound (each entry's control, default and target real), and
// a confirmed choice makes the issue link and line the coordinator reads.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { applyKnobParams, byPr, changedIn, currentValue, decisionLine, DECISION_LIST, groupOf, issueUrl, keyOf, knobAt, knobParam, openGroups, parseValue, saveOpenGroups, setKnob, swatchCss, valuesText } from "./decide";
import { hsv2rgb } from "../../art/core.js";

/** The URL switches the game reads (src/main.ts, app/linkParams.ts), and their values (a slider's: any number). */
const PARAMS: Record<string, string[]> = { style: ["bold", "ref"], fightScale: [], fightSpeed: [], fightMomentum: [], treetopSpeed: [], areaSize: [] };

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

  it("the pause page's test sliders (Ed, 2026-10-12): every entry has its PR and a short name, newest PR first; Copy values gives a line each, label, key, value and built default", () => {
    for (const d of DECISION_LIST) { expect(d.pr, d.id).toBeGreaterThan(0); expect(d.group, d.id).toBeTruthy(); }
    const prs = byPr(DECISION_LIST).filter(d => !d.pinned).map(d => d.pr!); // (the pinned Volume group sits at the top whatever its PR)
    for (let i = 1; i < prs.length; i++) expect(prs[i]).toBeLessThanOrEqual(prs[i - 1]);
    expect(groupOf(DECISION_LIST.find(d => d.id === "bombard")!)).toBe("#290 Legend layers");
    const values = new Map<string, string | number | boolean>(DECISION_LIST.map(d => [d.id, d.default]));
    const sky = DECISION_LIST.find(d => d.id === "skyBlur")!;
    values.set("skyBlur", 0.45);
    const text = valuesText(values, "v123", 42), lines = text.split("\n");
    expect(lines[0]).toBe("Test sliders · v123 · seed 42");
    expect(lines[2]).toBe(`${groupOf(byPr(DECISION_LIST)[0])}:`); // (the newest PR's first)
    for (const g of new Set(DECISION_LIST.map(groupOf))) expect(lines).toContain(`${g}:`);
    expect(lines).toContain(`● ${sky.label} · tiltShift.skyBlur = 0.45 (built ${sky.default})`);
    const style = DECISION_LIST.find(d => d.id === "style")!;
    expect(lines).toContain(`  ${style.label} · ?style = ${style.default} (built ${style.default})`);
    expect(keyOf(style)).toBe("?style");
    expect(lines.filter(l => / = .* \(built /.test(l)).length).toBe(DECISION_LIST.length);
  });
  it("folds the pause page's groups (Ed, 2026-10-26): all folded at first, the opened ones remembered, each header counting its changed sliders", () => {
    const store = new Map<string, string>(), was = (globalThis as { localStorage?: unknown }).localStorage;
    (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); } };
    try {
      expect(openGroups().size).toBe(0);
      saveOpenGroups(new Set([groupOf(DECISION_LIST[0])]));
      expect([...openGroups()]).toEqual([groupOf(DECISION_LIST[0])]);
      store.set("witch.pauseOpen", "not json");
      expect(openGroups().size).toBe(0);
    } finally { (globalThis as { localStorage?: unknown }).localStorage = was; }
    expect(openGroups().size).toBe(0); // (no storage at all: folded, no throw)
    const [a, b] = DECISION_LIST, values = new Map<string, unknown>([[a.id, a.default], [b.id, b.default]]);
    expect(changedIn([a, b], values)).toBe(0);
    values.set(b.id, b.control.type === "toggle" ? !b.default : "changed");
    expect(changedIn([a, b], values)).toBe(1);
  });
  it("draws a colour's swatch as the light takes it (the Hidden witch group's glow; Ed, 2026-10-26)", () => {
    for (const [h, sv] of [[0.08, 0.55], [0.6, 1], [0.33, 0], [0.95, 0.3]]) expect(swatchCss(h, sv)).toBe(`rgb(${hsv2rgb(h, sv, 1).join(", ")})`);
    const glow = DECISION_LIST.filter(d => d.control.type === "slider" && d.control.swatch);
    expect(glow.map(d => d.apply.knob).sort()).toEqual(["light.spooky.glowHue", "light.spooky.glowSat"]);
  });
});
