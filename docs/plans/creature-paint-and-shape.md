# Creature paint audit and body-shape plan

Status: plan only; no production art changes. Coordinator #1470 comment
6549733645 confirmed that paint activation already shipped in v6703. The
follow-up is an audit and a default-off shape plan, not another activation.

## Paint audit

At prototype 5b6fcf427, `art/genome/selection.js` selects exactly twenty defaults:
fennec, dragonfly, wolf, dormouse, fruit bat (`bat`), woodlouse, frost troll,
hydra, crocodile, crab, meerkat, flying squirrel, marten, raccoon, badger,
stoat, otter, black jaguar (`jaguar`), bear and arctic fox.

`art/roster/presets.js` has no diff against the accepted roster b8348324.
`speciesOf` resolves this selection; the asset and cache paths use that same
selection. A browser-free Node data audit found exactly these twenty selected
records. For every canonical species and all four ages, an explicit
`<id>:current` returns the original record. Non-selected species retain their
original default record. Snow leopard and beetle stay parked; polar bear,
unicorn, mole, frost wyrm, raven and lion remain Current. Existing
`src/defaultRoster.test.ts` covers the default set, Current identity, parked
species and cache separation.

This is data and source evidence, not a new visual approval. Canonical capture
under the live body-size model remains queued after the current laptop tail.
Use matching native size, facing, age and pose for Current/selected comparisons;
retain the grey woodlouse baby. No capture or raster audit was run for this note.

## Shape proposal

Ed's requested outcomes are from #1470 comment 6547681768. Implement only after
the coordinator accepts this plan, as explicit candidate genomes using the
existing `creatureModels`/`creatureVariants` selection. An absent candidate
selection must reproduce current production output. Keep the live size curve,
collision, gameplay, materials outside the named candidate and other art fixed.

| Species | Existing controls and proposed work | Builder change boundary |
| --- | --- | --- |
| Mole | Use `look.mole` independent body length, vertical depth, width, snout and forepaw length/width/thickness/spread/forward controls in `mole3d`. Make the barrel and outward-facing spade hands read from the game camera, across ages. | Start with genome data only. No numeric limit increase is yet justified: positive finite controls already exist. Add a candidate-only paw rotation control only if paired frames demonstrate that existing dimensions and spread cannot expose the spade surface. Default rotation must preserve the existing axes exactly. |
| Hydra | Fan necks apart while retaining their count, roots, heads, expressions and legend branches. `hydra3d` currently hardcodes primary tip spread (`u * len * 2.1`) and tip stagger. | Add optional hydra look controls for lateral spread and fore/aft stagger with exact existing constants as defaults. Apply consistently to primary neck tips; plan separate legend-branch spacing only if frames show overlap there. Do not change the shared serpent spine or other species. |
| Lion | Fuller, lighter ruff around face and chest, rounder ears, larger tail tuft and heavier front end. Start with lion level `ruff` size/count/material, existing round ears, body front/chest/profile and tail controls. | Prefer candidate genome values. Current shared ruff uses one neck ring and hardcoded lock proportions; only if needed, add optional per-feature ring offset/coverage controls with exact old defaults. A tuft-only size control may be needed because `tailK` scales the entire tail; keep its default 1 and leave other tail kinds untouched. Preserve the cub's age-specific anatomy and the legend's identity. |
| Woodlouse | Improve antennae and leg readability while retaining seven pairs of legs, grey stages and segmented plates. `woodlouse3d` has `feelers` length and jointed antennae, but hardcoded antenna radii and leg endpoints/radii. | Add optional woodlouse-only antenna thickness and leg reach/thickness controls, defaulting to existing constants. Include both the early unplated path and plated path; do not substitute a different animal's gait or add legs. |
| Crocodile | Thicker tail base and naturally splayed legs. Reuse `tailK`, `stance:sprawl`, `sprawl`, leg width and existing level overrides first. | No wider shared limits initially. If whole-tail thickening spoils the taper, add an optional croc-tail-root multiplier with default 1 rather than change every tail. Preserve rig attachment locations and check the existing carrier bounds. |

No universal shape range or shared default changes are proposed. A missing
control is a conditional extension to demonstrate with frames, not permission
to rewrite the builder. Rhino and unicorn are charging legends (#1552); their
genomes, poses and attack rigs are outside these five candidates. Preserve their
charging behavior in any shared rig work and include them as unchanged controls.

## Proof and review

Before any implementation push, merge current `claude/prototype`. Add nearby
one-worker tests for default/off equivalence and candidate isolation, then run
exact `npm run typecheck`. Compare original and candidate captures at matching
native pixels for all four ages, both game facings, gait frames, expressions,
nap/wake and rig paths affected by a control. Compare non-target sprites and
rig geometry exactly, especially rhino/unicorn charging legends and other
consumers of ruff, tail and quadruped controls. Retain the existing size, carrier,
anchor and finite-normal gates; do not tune collision or rules to fit the art.

Canonical owns full art, suite, smoke, benchmark and review captures. Declare
only measured, code-explained candidate frame differences in the branch's bench
expectation; accept no rules-state differences or blanket art waiver. Record
actual art-check durations without estimating unmeasured savings. Candidate
shapes remain default off until Ed has seen the frames and ruled.

No player-facing text changes in this planning work.
