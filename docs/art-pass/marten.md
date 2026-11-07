# European pine marten — graph target

Species scope: **marten** (Martes martes); L2, #1904. Target identity is inferred from the existing genome's natural cues, not a new gameplay/species decision. No hand-written-art fix or graph code is authorized here.

## Reference plate and provenance

![Generated adult/young towards/away standing/walking target](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/marten/target-v2.png)

Selected plate: [target-v2.png](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/marten/target-v2.png), SHA256 `1ffe92a6f22e3b9b2ad6f1e3e7d9f5f320cc5401c5c06615758827824308f579`. Generated 2026-11-07 with the built-in **image_gen.imagegen** tool (scientific-educational, photoreal target; model/version/seed not exposed). [Exact prompt](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/marten/prompt-v2.txt); [provenance](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/marten/provenance-v2.json). No Commons photo was input to imagegen or committed.

Eight cells: adult row1, mobile juvenile row2; columns standing-towards, standing-away, walking-towards, walking-away. Young represents game age0's mobile visual role, **not a literal neonate or scientifically verified age**. The game has young variants; many real neonatal mammals cannot stand/walk. Size ratios between generated cells are illustrative, not calibrated.

Camera target: art/model3d.js PITCH=.52rad (29.79° downward) and YAW={towards:.6,away:-.6}rad (±34.38°). Prompts approximate a long-lens affine-looking view. Generated heading, perspective, scale and foot contact are not constrained by the real renderer: some cells are more frontal/rearward, and v2 silhouettes can shift angle. **No pixel-exact game-camera match, game-size recognition verdict or actual motion cycle is claimed.**

## Real-photo comparison — real anatomy wins

[Commons comparison file: Pine Marten.jpg](https://commons.wikimedia.org/wiki/File:Pine_Marten.jpg). Viewed locally for comparison only; not on either committed branch. Photo shows a much longer lower neck/back and tapered muzzle than the first generated sheet. Bib and pale-rimmed ears agree. Tail tip and some feet are cropped/occluded; this photo does not measure tail length or stance.

Photo occlusion, fur, pose and lens prevent reliable joint/length measurement; do not treat this single photograph as a complete anatomical dataset.

## Identifying checklist

1. Long supple trunk with a low, continuous back rather than a cat's short barrel.
2. Rounded prominent ears with pale rims, not pointed fox ears.
3. Tapered wedge muzzle, dark nose and small forward-set eyes.
4. Cream/yellow throat bib distinct from the brown flank.
5. Moderately short supporting limbs and broad furry paws.
6. Long bushy cylindrical tail, without the squirrel's upright fan.
7. Kit: larger head relative to trunk, shorter muzzle and less full tail.

## Body plan and proportion targets

**L = nose to tail-base length in a neutral quadrupedal pose, excluding tail**, not the torso-only spine length. Head means muzzle tip to occiput; exposed neck is occiput-to-shoulder transition; limb reach means vertical shoulder/hip-to-ground in quiet stance, not summed bone lengths. Ratios below are **artist starting ranges inferred from general anatomy/photos, not specimen measurements, fitted genome values or universal biological bounds**. Adjust for pose and actual photo evidence.

Head 0.20–0.25; exposed neck0.10–0.16; standing fore/hind girdle-to-ground0.22–0.30; tail0.45–0.60.

Length is distributed through ribcage and loin; modest shoulder and hip masses, narrow mobile waist. Do not replace the long axis with one round blob.

Age0 target: scale the whole animal down, then increase relative head/eye size and reduce muzzle/tail maturity as listed above; do not merely shrink an adult. These are qualitative age keys, not validated growth measurements. Preserve the natural four-limb body plan at every game age. Magical/legend adornments must not replace the identifiable natural silhouette; no new legendary concept is invented in this lane.

## Graph requirements and missing features

Reusable rounded ear/pale-rim assembly and furry tail cross-section/coat boundary; spine-frame flex remains an owner follow-up, not a new species branch.

Capability audit is source-only: prototype524b0acaa has generic head/leg/wing/tail/shell sockets. Read-only #1866 headde27db5154a3e8b1aa94255263bd2601b92aec36 additionally has neck, parent attachments and static triangular membrane sockets. Thus **neck and membrane kinds are present**, not missing. Its leg foot is an ellipsoid (hoof can split); no explicit reusable digging-palm/digit, ear/tuft, spine-field or folded-patagium deformation contract was verified. Generic ellipsoids can block out some shapes; absence of a named semantic control does not prove geometry is impossible. Requests here are shared graph/family capabilities to confirm with1866, never a permission to patch old builders.

## Ranked targets and image QA

1. Low flexible trunk.
2. round ears+tapered face.
3. bushy tail and throat bib.

v1 legs/chest too tall and compact; targeted v2 requested. Whole-animal sheet is a target, not proof of final dimensions.

v2 is substantially lower and longer, closer to the real trunk/neck silhouette. Ears remain large and tail fullness exaggerated; use written ratios/photo rather than copying pixel dimensions.

All selected plates were visually inspected for whole framing, adult/young rows and towards/away standing/walking coverage. A lifted paw is not gait validation; hidden far-side feet and exact digit counts are not certified. Generated-photo discrepancies are excluded from the graph specification by the checklist and real-photo priority. Optional shipped-art critique omitted: no shipped renderer run or native/4× acceptance was allocated; the later instruction supersedes that exhaustive review.

Review boundary: target note/reference output complete for coordinator review, with explicit uncertainties above. Species migration and likeness acceptance remain #1866/canonical/Ed decisions; no source, rig, render, registry, gameplay, text or default changed.
