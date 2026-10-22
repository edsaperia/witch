import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { compassPoint, moonInView, newTelescope, stepTelescope, telescopeAim, telescopeFov, telescopeMagnification, telescopePitch, wrapBearing } from "./telescope";

const T = TUNING.telescope!;

describe("the telescope (rules/telescope.ts)", () => {
  it("starts north and wide, the game's own way", () => {
    expect(newTelescope()).toEqual({ heading: 0, zoom: 0 });
    expect(telescopeFov(T, 0)).toBeCloseTo(T.fovWide);
    expect(telescopeFov(T, 1)).toBeCloseTo(T.fovClose);
    expect(telescopeMagnification(T, 1)).toBeCloseTo(T.fovWide / T.fovClose);
  });
  it("pans all the way round, either way, and wraps", () => {
    let s = newTelescope();
    for (let i = 0; i < 600; i++) s = stepTelescope(s, { moveX: 1, moveZ: 0 }, 1 / 60, T);
    expect(s.heading).toBeCloseTo(wrapBearing(T.pan * 10));
    s = stepTelescope(newTelescope(), { moveX: -1, moveZ: 0 }, 1, T);
    expect(s.heading).toBeCloseTo(wrapBearing(-T.pan));
    expect(s.heading).toBeGreaterThanOrEqual(0);
  });
  it("pans slower zoomed in, so the view moves alike on screen", () => {
    const wide = stepTelescope({ heading: 0, zoom: 0 }, { moveX: 1, moveZ: 0 }, 0.1, T).heading;
    const close = stepTelescope({ heading: 0, zoom: 1 }, { moveX: 1, moveZ: 0 }, 0.1, T).heading;
    expect(close / wide).toBeCloseTo(T.fovClose / T.fovWide);
  });
  it("zooms in up the stick and with the wheel, and stays within wide and close", () => {
    expect(stepTelescope(newTelescope(), { moveX: 0, moveZ: -1 }, 0.1, T).zoom).toBeGreaterThan(0);
    expect(stepTelescope(newTelescope(), { moveX: 0, moveZ: 1 }, 0.1, T).zoom).toBe(0);
    expect(stepTelescope({ heading: 0, zoom: 1 }, { moveX: 0, moveZ: -1 }, 1, T).zoom).toBe(1);
    expect(stepTelescope(newTelescope(), { moveX: 0, moveZ: 0, zoom: -1 }, 0, T).zoom).toBeCloseTo(T.zoomStep); // (the controls' zoom: negative in)
  });
  it("aims further out zoomed in, and tilts down to it over the bend", () => {
    expect(telescopeAim(T, 1)).toBeGreaterThan(telescopeAim(T, 0));
    const flat = telescopePitch(50, 300, 0), bent = telescopePitch(50, 300, T.bend);
    expect(flat).toBeCloseTo((Math.atan(50 / 300) * 180) / Math.PI);
    expect(bent).toBeGreaterThan(flat);
  });
  it("names the compass points", () => {
    expect([0, 44, 90, 180, 270, 359].map(compassPoint)).toEqual(["N", "NE", "E", "S", "W", "N"]);
  });
  it("shows the moon only looking its way", () => {
    expect(moonInView(0.5, 0, 40, 60)).toBeCloseTo(0.5); // (the game's moon in the middle: due north)
    expect(moonInView(0.75, 0, 40, 60)).toBeCloseTo(0.5 + 15 / 40); // (a quarter right: 15° east of north)
    const south = moonInView(0.5, 180, 40, 60);
    expect(south < 0 || south > 1).toBe(true); // (behind her)
    expect(moonInView(0.5, 350, 40, 60)).toBeCloseTo(0.5 + 10 / 40); // (round through north)
  });
});
