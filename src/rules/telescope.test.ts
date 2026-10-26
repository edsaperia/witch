import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { compassPoint, moonInSky, moonInView, skyDirection, skyOnScreen, newTelescope, stepTelescope, telescopeFloor, telescopeFov, telescopeMagnification, telescopePitch, turnTelescope, wrapBearing } from "./telescope";

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
  it("puts the moon in the sky: its altitude and bearing the same however the view pans, tilts and zooms (Ed's playtest, v4522)", () => {
    // (from the band's foot, on the horizon, to its top at the chart's height)
    expect(moonInSky({ x: 0.5, y: 0.82 }, 60, 0.82, 0.93, 22)).toEqual({ bearing: 0, elevation: 0 });
    const sky = moonInSky({ x: 0.75, y: 0.93 }, 60, 0.82, 0.93, 22);
    expect(sky.bearing).toBeCloseTo(15);
    expect(sky.elevation).toBeCloseTo(22);
    const d = skyDirection(sky.bearing, sky.elevation), aspect = 16 / 9;
    // Back from the picture to the sky: the direction through a point of it, by the same view.
    const unproject = (x: number, y: number, heading: number, pitch: number, fov: number) => {
      const a = (heading * Math.PI) / 180, p = (pitch * Math.PI) / 180, s = Math.sin(a), c = Math.cos(a), ty = Math.tan((fov * Math.PI) / 360);
      const nx = (x * 2 - 1) * ty * aspect, ny = (y * 2 - 1) * ty;
      const v = [s * Math.cos(p) + nx * c + ny * s * Math.sin(p), -Math.sin(p) + ny * Math.cos(p), -c * Math.cos(p) + nx * s - ny * c * Math.sin(p)];
      const l = Math.hypot(v[0], v[1], v[2]);
      return { elevation: (Math.asin(v[1] / l) * 180) / Math.PI, bearing: (((Math.atan2(v[0], -v[2]) * 180) / Math.PI) + 360) % 360 };
    };
    let seen = 0;
    for (const heading of [-10, 0, 5, 15, 25, 40]) for (const pitch of [10, 0, -10, -22, -40]) for (const fov of [6, 20, 45]) {
      const at = skyOnScreen(d, heading, pitch, fov, aspect);
      if (!at || at.x < 0 || at.x > 1 || at.y < 0 || at.y > 1) continue;
      seen++;
      const back = unproject(at.x, at.y, heading, pitch, fov);
      expect(back.elevation).toBeCloseTo(22, 6);
      expect(back.bearing).toBeCloseTo(15, 6);
    }
    expect(seen).toBeGreaterThan(20);
    // Tilting up moves it down the picture (the bug: it stayed at the same height on the screen), panning right moves it left.
    const low = skyOnScreen(d, 15, 0, 20, aspect)!, high = skyOnScreen(d, 15, -18, 20, aspect)!, right = skyOnScreen(d, 20, 0, 20, aspect)!;
    expect(high.y).toBeLessThan(low.y - 0.3);
    expect(right.x).toBeLessThan(low.x);
    // Looking the other way, it's behind the view.
    expect(skyOnScreen(d, 195, 0, 20, aspect)).toBeNull();
  });
});
