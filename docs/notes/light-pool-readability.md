# Light-pool readability experiment

Assigned by coordinator6523304196, from release base2ecbbe19. Ed's ruling (2026-10-30): dark creatures may keep their camouflage in the dark forest, but should read when illuminated near the witch.

Review only, default OFF. Add a hue-preserving creature lift or edge using her actual light radius, falloff, power and dim factors. The added contribution must be zero outside the radius and when her light is off. Preserve the existing find-light rim, ground, sprite paint and sizes.

Implementation: `?poolreadability=1` enables a separate sprite uniform for wild creature batches. It adds the pixel's own paint times0.6 and the actual pool falloff/power/dim, selected per painted pixel (full below0.35, easing to none at0.75). This keeps the paint's relative values and hue; pure black stays black. Existing final cast shadows still apply. No gameplay UI text or normal default appearance changes; no changelog fragment while this remains an OFF-by-default review experiment.

The first minimum-floor experiment changed only beetle L1/L2 centre pixels. Its floor was applied after the existing find floor/rim, so that existing illumination could cancel it even on dark animals; edge floor was especially low. The additive revision addressed this cancellation. Coordinator6525764043 accepted the audited centre readability for jaguar/mole/beetle, minimal stoat/fox change and small edge change. It accepted captured-pixel outside/light-off identity as sufficient for this default-off review flag and ruled no wider capture necessary. Full-subject visibility was not proven in all cases: L0 edge absent, others clipped. Earlier colour-only mask claims were retracted; audited bounds use silhouette-minus-normal pixels.

The final cheap refinement removes luminance normalisation, adding light proportionally to paint to retain internal shading (the coordinator found the jaguar greyish/flat). It has nearby checks; this final refinement has no new browser capture. Ed will judge it in motion after the coordinator's next combined release; switching it on by default remains his decision.

Source investigation: the ground receives glowPool's minimum luminance lift; ordinary creature sprites skip it and primarily multiply their existing colour by light. Their existing directional find rim is a separate established effect and must remain unchanged.

Comparison record: beetle L0/L1/L2, black jaguar, mole, stoat and arctic fox at pool centre, edge and outside. Audited frames and exact native/nearest3x pairs are in `claude/ed-shots/previews/ed/light-pool/7af517747-audited`; use its manifest's visibility caveats. Captured outside/light-off pairs are identical, not a claim for missing portions of clipped animals. All allocated browsers/listeners closed and slots released. No further capture is requested under the final ruling.
