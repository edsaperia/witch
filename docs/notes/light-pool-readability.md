# Light-pool readability experiment

Assigned by coordinator6523304196, from release base2ecbbe19. Ed's ruling (2026-10-30): dark creatures may keep their camouflage in the dark forest, but should read when illuminated near the witch.

Review only, default OFF. Add a hue-preserving creature lift or edge using her actual light radius, falloff, power and dim factors. The added contribution must be zero outside the radius and when her light is off. Preserve the existing find-light rim, ground, sprite paint and sizes.

Implementation: `?poolreadability=1` enables a separate sprite uniform for wild creature batches. It adds luminance0.18 times the actual pool falloff/power/dim, selected per painted pixel (full below0.35, easing to none at0.75), in that pixel's own hue. Pure black stays black. Existing final cast shadows still apply. No player text or normal default appearance changes; no changelog fragment while this remains an OFF-by-default review experiment.

The first minimum-floor experiment changed only beetle L1/L2 centre pixels. Outside/light-off equality passed, but target visibility and efficacy were not established. Its floor was applied after the existing find floor/rim, so that existing illumination could cancel it even on dark animals; edge floor was especially low. The additive revision addresses this cancellation; visual approval is still pending and no later capture is implied.

Source investigation: the ground receives glowPool's minimum luminance lift; ordinary creature sprites skip it and primarily multiply their existing colour by light. Their existing directional find rim is a separate established effect and must remain unchanged.

Required comparison: beetle L0/L1/L2, black jaguar, mole, stoat and arctic fox at pool centre, edge and outside; outside pixel-identical to baseline. Prepare build and capture script before requesting a separate headless laptop slot. Typecheck and nearby tests only. No visual approval or measurements claimed yet.
