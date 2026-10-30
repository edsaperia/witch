# Light-pool readability experiment

Assigned by coordinator6523304196, from release base2ecbbe19. Ed's ruling (2026-10-30): dark creatures may keep their camouflage in the dark forest, but should read when illuminated near the witch.

Review only, default OFF. Add a hue-preserving creature lift or edge using her actual light radius, falloff, power and dim factors. The added contribution must be zero outside the radius and when her light is off. Preserve the existing find-light rim, ground, sprite paint and sizes.

Source investigation: the ground receives glowPool's minimum luminance lift; ordinary creature sprites skip it and primarily multiply their existing colour by light. Their existing directional find rim is a separate established effect and must remain unchanged.

Required comparison: beetle L0/L1/L2, black jaguar, mole, stoat and arctic fox at pool centre, edge and outside; outside pixel-identical to baseline. Prepare build and capture script before requesting a separate headless laptop slot. Typecheck and nearby tests only. No visual approval or measurements claimed yet.
