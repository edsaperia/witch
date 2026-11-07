# L7 reference method and graph handoff

Scope: #1900, `codex/art-pass-l7`; canonical #1476 6707737381, overridden by
6707758462 (7 November 2026): finish the skeleton first. This is a reference
target, not an evaluation or replacement of shipped art. No production imports.

## Camera, ages and evidence

Source base `524b0acaa`: `art/model3d.js` exports PITCH=.52 radians (29.79°)
and YAW={towards:.6, away:-.6} (±34.38°); the rasterizer uses orthographic
projection. `art/creatures.js` exposes baby/young/adult/legend at levels0/1/2/3,
both headings and a two-frame walk for every L7 species. Generated plates use
adult level2 anatomy and juvenile level0 targets, each stationary and locomoting
in both headings. Snakes slither; a toad crawls. These are not new movement rules.
The game's level0 amphibians already use the terrestrial limbed body plan: use
postmetamorphic juveniles, not tadpoles or externally gilled aquatic larvae.

Every plate has adult top row, juvenile bottom; columns standing-towards,
locomoting-towards, standing-away, locomoting-away. Whole bodies fit in frame.
Each plate is independently generated with the built-in imagegen tool on
7 November 2026. Exact base prompts are in `provenance.json`; legend prompts,
proposed picks and rejected-layout corrections are in `legend-provenance.json`.
No input photo was uploaded to generation. Commons photographs were separately
downloaded to ignored workspace scratch and visually inspected; none is
committed or published. Species docs link the actual comparison files.

Generation approximates the requested pitch/yaw; it cannot certify the game's
projection, exact angles, frame geometry, anatomy, gait timing or native-size
readability. Walking cells are illustrative poses, not measured animation or
contact proof. Occluded far-side digits must not be counted as missing limbs.
Real photos and fossil evidence override generation; each species records
observed divergences to avoid treating synthetic detail as ground truth.
No exhaustive old-art render or game-size acceptance is claimed.

## Ratio convention

B = straightened snout-to-vent centreline length, excluding tail. A head ratio
is skull+snout length; neck is head-base to shoulder; leg is hip/shoulder-to-toe
articulated chain length, NOT standing height. Width and torso depth are maximum
soft-body diameters. Serpent B follows the uncoiled centreline, never the coil's
bounding box. Ratios below are authored modelling ranges guided by comparisons,
not published biometric measurements or values extracted from generated pixels.
They are starting constraints for reference review, not silently approved knobs.

## Graph capability audit

Prototype has `art/body-graph/graph.js`, `gait.js`, `fixtures.js` and
`quadruped.js`: station chains, ellipsoid head/wing/shell, tapered round tails,
three leg families, generic two-bone contact gait. Do not mistake these
diagnostics for finished species.

Also inspected active #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`
read-only through GitHub: `part-tree.js`, `expressiveness.js`, `graph.js` and
`acceptance.js`. It already adds parent-tree mounts, neck/tail chains, membranes,
a serpent body prior, reptile head vocabulary, no-ear selection, tissue layers,
webbed/clawed foot vocabulary, markings and antlers. Those are NOT missing.
Its tail helper exposes stub/bushy/whip/fluffy round profiles; it does not yet
expose the specific L7 semantic anatomy listed in the species handoffs. A generic
primitive capable of approximating a plate is not a tested alternating plate
family. All gap claims are relative to these pinned sources, not later work.
The new spine crest/groove work is already assigned to #1866: newt crest requests
extend that lane, not a second implementation. No graph changes in #1900.

Evidence lives only on `claude/ed-shots`, species-owned paths
`previews/art-pass/<species>/refs-l7-v1.png` and `provenance.json`. Publish with
`node tools/shots/push.mjs`, never a shared-branch checkout or force push.

Legend additions6707981581/6707992824 and colossal scale corrections
6708227119/6708229124 are covered in each species document and
[summary](l7-summary.md). `legends-l7-v1.png` is the preserved first pass.
`legends-colossal-l7-v2.png` has three revised concepts per species (A/B/C),
with one maximum-fantasy option, in a two-row layout: low hero view above and
elevated game-camera study below. Each cell includes a witch and forest scale
cues. The intended scale follows DESIGN's approx.20× level0 height and above-
treetop fantasy; generated pixels do not prove that numerical ratio or reproduce
the game's exact projection. The v2 prompts and their constraints are recorded
in `colossal-provenance.json`; first-pass files remain as history.

Exact-current legend renders for the comparison column are an explicit
outstanding cloud request, not substituted by source descriptions or historical
pictures. No full READY claim while that is pending.
