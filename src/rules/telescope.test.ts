import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { compassPoint, moonInView, newTelescope, stepTelescope, telescopeFloor, telescopeFov, telescopeMagnification, telescopePitch, turnTelescope, wrapBearing } from "./telescope";

const T = TUNING.telescope!;

describe("the telescope (rules/telescope.ts)", () => {
  it("starts north and wide, the game's own way", () => {
    expect(newTelescope(T)).toEqual({ heading: 0, elevation: telescopeFloor(T), zoom: 0 });
    expect(telescopeFloor(T)).toBeLessThan(0); // (down at the forest)
    expect(telescopeFov(T, 0)).toBeCloseTo(T.fovWide);
    expect(telescopeFov(T, 1)).toBeCloseTo(T.fovClose);
    expect(telescopeMagnification(T, 1)).toBeCloseTo(T.fovWide / T.fovClose);
  });
  it("pans all the way round, either way, and wraps", () => {
    let s = newTelescope(T);
    for (let i = 0; i < 600; i++) s = stepTelescope(s, { moveX: 1, moveZ: 0 }, 1 / 60, T);
    expect(s.heading).toBeCloseTo(wrapBearing(T.pan * 10));
    s = stepTelescope(newTelescope(T), { moveX: -1, moveZ: 0 }, 1, T);
    expect(s.heading).toBeCloseTo(wrapBearing(-T.pan));
    expect(s.heading).toBeGreaterThanOrEqual(0);
  });
  it("turns straight by the mouse's degrees, wrapping round and tilting no further than its floor and tiltMax", () => {
    const s = newTelescope(T);
    expect(turnTelescope(s, -10, 0, T).heading).toBeCloseTo(350);
    expect(turnTelescope(s, 5, 3, T)).toEqual({ heading: 5, elevation: telescopeFloor(T) + 3, zoom: 0 });
    expect(turnTelescope(s, 0, 999, T).elevation).toBe(T.tiltMax);
    expect(turnTelescope(s, 0, -999, T).elevation).toBe(telescopeFloor(T));
  });
  it("pans slower zoomed in, so the view moves alike on screen", () => {
    const wide = stepTelescope({ heading: 0, elevation: 0, zoom: 0 }, { moveX: 1, moveZ: 0 }, 0.1, T).heading;
    const close = stepTelescope({ heading: 0, elevation: 0, zoom: 1 }, { moveX: 1, moveZ: 0 }, 0.1, T).heading;
    expect(close / wide).toBeCloseTo(T.fovClose / T.fovWide);
  });
  it("tilts up the stick from the forest to tiltMax, and no further either way (Ed, 2026-10-22: to look at the stars)", () => {
    const up = stepTelescope(newTelescope(T), { moveX: 0, moveZ: -1 }, 0.5, T);
    expect(up.elevation).toBeCloseTo(telescopeFloor(T) + T.tilt * 0.5);
    expect(up.zoom).toBe(0); // (the stick tilts; it no longer zooms)
    expect(stepTelescope(newTelescope(T), { moveX: 0, moveZ: 1 }, 1, T).elevation).toBeCloseTo(telescopeFloor(T));
    let s = newTelescope(T);
    for (let i = 0; i < 60 * 10; i++) s = stepTelescope(s, { moveX: 0, moveZ: -1 }, 1 / 60, T);
    expect(s.elevation).toBe(T.tiltMax);
  });
  it("zooms with the wheel, the zoom keys and the shoulder buttons, within wide and close", () => {
    expect(stepTelescope(newTelescope(T), { moveX: 0, moveZ: 0, zoom: -1 }, 0, T).zoom).toBeCloseTo(T.zoomStep); // (the controls' zoom: negative in)
    expect(stepTelescope(newTelescope(T), { moveX: 0, moveZ: 0, zoom: 1 }, 0, T).zoom).toBe(0);
    expect(stepTelescope({ heading: 0, elevation: 0, zoom: 1 }, { moveX: 0, moveZ: 0, zoom: -1 }, 0, T).zoom).toBe(1);
  });
  it("looks down to the forest over the bend at its lowest", () => {
    expect(telescopeFloor(T)).toBeCloseTo(-telescopePitch(T.eye, T.aimWide, T.bend));
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
