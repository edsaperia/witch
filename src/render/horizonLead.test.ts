// The horizon cull's lead (view/culling.ts): what the bent ground's horizon will show next frame
// is drawn already, so nothing pops in over the horizon. #222's map: on the smoke's zoom path a
// baby wolf (1405, 401) and a young fox (1273, 392) popped in 258 m ahead over the treetops, culled
// behind the horizon one frame and in clear view the next, the camera having moved metres in a long
// frame while the cull judged it where it stood.
import { describe, expect, it } from "vitest";
import { HEIGHT_UNIFORMS, seenOverBend } from "./height";
import { horizonLead } from "./view/culling";
import { TUNING } from "../rules/tuning";

describe("the horizon cull keeps ahead of the camera", () => {
  const C = TUNING.camera, T = C.treetop, a = (T.angleOut * Math.PI) / 180;
  // The treetop camera over her, the bend's focus under her (both move with her).
  for (const [k, distance] of [[C.curve.treetop, T.distanceIn], [C.curve.treetop, T.distanceOut], [C.curve.treetop * 2, T.distanceOut]] as const) {
    it(`bend ${k}, camera ${distance} m back: anything the next frame shows over the horizon is drawn this frame`, () => {
      const fz = 0, cam = { y: TUNING.treetopHeight + Math.sin(a) * distance, z: fz + Math.cos(a) * distance };
      HEIGHT_UNIFORMS.uBend.value.set(k, 0, fz, 0);
      let checked = 0;
      for (const step of [0.8, 5, 20]) // a frame at 60 fps at treetop speed; slow frames
        for (let ahead = 40; ahead <= 420; ahead += 1)
          for (let top = 0; top <= 40; top += 0.5) {
            // Next frame she (and the focus) has flown `step` metres toward it.
            if (!seenOverBend(ahead - step, top, k, cam, C.curve.beyond)) continue;
            checked++;
            // This frame the cull judges it from horizonLead(step) nearer, with 2 m on its top (inView).
            expect(seenOverBend(Math.max(0, ahead - horizonLead(step)), top + 2, k, cam, C.curve.beyond), `${ahead} m ahead, top ${top} m, step ${step} m`).toBe(true);
          }
      expect(checked).toBeGreaterThan(1000);
    });
  }
  it("a metre's lead when the camera stands still", () => expect(horizonLead(0)).toBe(1));
});
