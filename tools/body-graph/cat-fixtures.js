// Engine diagnostics over current records, not #1479's final roster presets.
import { felineGraphGenome } from "../../art/body-graph/families.js";
export const CAT_CAPTURE_IDS = ["cat", "lynx", "lion", "tiger", "cheetah", "jaguar", "snowleopard"];
export const CAT_TARGET_NOTES = {
  cat: "Broad head and low-set, outward ears. Preserve the sand coat and faint bars.",
  lynx: "Preserve current tufts, bobtail and cheeks. Review feline spine, stance and feet.",
  lion: "Preserve mane and elder story features. Review flexible feline body and feet.",
  tiger: "Preserve natural stripe layout. Review spine, stance and feet.",
  cheetah: "Preserve current lean proportions and spots. Review spine and feet.",
  jaguar: "Rosettes must read on the flank and back, using the animal's own coat contrast.",
  snowleopard: "Pale-centred, sparse torso rosettes; solid spots on head and legs. Review the baby torso repair.",
};
export function catCaptureGenome(base) {
  if (!CAT_CAPTURE_IDS.includes(base.id)) throw new Error(`Not a cat fixture: ${base.id}`);
  const options = base.id === "cat" ? { head: { earRoot: [0, -.2, .12], earAngle: [0, .24] } } : {};
  const out = felineGraphGenome(base, options);
  if (base.id === "snowleopard") {
    out.coat.regions = {
      torso: { kind: "rosettes", outerPx: 7, density: .55, inner: .19, outer: .4, gap: .4, xRange: [-.6, .8], flankMin: .25, centreMat: "BODYL", mat: "BODY3" },
      head: { kind: "spots", k: 12, density: .6, radius: .3 },
      legs: { kind: "spots", k: 10, density: .6, radius: .32 },
    };
    // Preserve its elder's existing beads and magical story markings.
    if (out.levels?.[3]) out.levels[3].coat = { ...out.levels[3].coat, regions: null };
  }
  return out;
}
