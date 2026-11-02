# Treehouse approach trials

All four switches remain OFF. This is a review candidate, not visual acceptance or a default change.

## Implementation

- Treehouse look: fade the whole crown indoors, fill the close crown notch, reveal floors on flight approach, open platforms without upright walls. Fade duration, bark opacity, reveal distance/softness/raggedness are adjustable in the same group.
- Leaves and strings share a spreading soft noise edge; bark retains its adjustable opacity. State/uniform vectors are reused. The new outline-distance routine allocates no objects; its call is skipped with approach off.
- Approach proximity is measured from the authored room/branch outlines, not only the hub. Floors and bark edges are drawn in world space before landing, in the normal opaque depth pass so uncleared leaves can still cover them. Furniture and interaction prompts remain indoors-only.
- With platforms open, all room edges reuse the existing movement exit. The host supplies the existing per-witch broom/fall choice. Only a fall-start records an optional safe edge origin; existing fall timing/thud/fell and the old circle fallback remain. No multiplayer files changed. The multiplayer owner must confirm optional fall-origin transport and consistent trial settings for guests before online use.
- The whole-crown setting did not remove the dancefloor open-sky reservation. View.ensureCrown supplies that reservation; rules/crown.sightClearance projects it along sight rays, including with gap=false. The notch switch removes it from close geometry. This explains a possible channel by source, not proof it is the visual symptom Ed reported.
- The horizon retains a separately built original source only when the notch switch is enabled, with matching warm light. Landmark baking suppresses/restores all trial uniforms. All-off geometry inputs are identical; pixel parity remains a cloud check.

## Validation and limits

Two new direct-contract files; no existing test expectations changed. Tests cover default-off settings, fade endpoints, exact original input off, the sight-cut contract, disabled/ground/out-of-range flight clearing, translated outlines, upright-layer selection and each of the 14 room shapes. Guest-room test setup uses the existing authorized floor accessor, not a network simulation. Existing crown-fade and standing-geometry contracts are checked separately.

CI smoke on eb3a7e546 reported an uncompiled fragment. Source inspection found the crown-wire call still passing two arguments to the updated three-argument shared clearing helper; that call is corrected and both string-light consumers have a static interface contract. This is not a local GPU compile or a claimed cloud smoke pass. Crown materials now carry diagnostic names.

No local browser, game build, art render, full suite, smoke or performance run. Exact-head CI and canonical cloud checks remain required. No default flip or release requested.

## Canonical cloud request (run only after allocation)

Build/test the reported commit, prove served version.json sourceSHA, and use the same capture harness on the parent baseline for all-off parity. Compare fixed seed 160271 and identical labels/clocks; no arbitrary masks or thresholds.

- LOOK=1 SEED=160271 DIST=<exact dist> node tools/shot/crown-whole.cjs <output>: off, indoor, notch, approach, walls and all; optional ONLY selects one. Includes Terrace and Parlour landing sequences, Parlour/Bedroom, takeoff, dancefloor/overflight, east/west approaches and far south shots. Rendering and actual interaction acceptance still require allocated play checks.
- LOOK=1 SEED=160271 FRAMES=30 LINK='<d_look settings>' DIST=<exact dist> node tools/bench/crown-cost.cjs <output.json>. LOOK selects Terrace, Parlour, a house-relative approach and far south; coordinates are resolved from the actual island hub. Run off, each switch separately and all together serially; report wall/draw/calls/triangles and errors.
- Confirm wall-off broom exit and no-broom thud/return in Terrace and another room. Rules contracts cover all 14 room shapes; real rendering and sounds still need play verification.

## New visible words

Group: Treehouse look. Toggles: Fade the whole crown indoors; Fill the crown notch; Reveal floors while flying close; Open platforms without walls. Sliders: Crown fade time (s); Bark left indoors; Approach reveal distance (m); Reveal edge softness; Reveal edge irregularity. Notes are in config/decisions/1635-treehouse-look.json. Changelog: Four optional Treehouse look switches let you try a fading crown, clearer approaches and open room platforms.
