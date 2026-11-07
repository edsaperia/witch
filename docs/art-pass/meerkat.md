# Meerkat — graph target

Species scope: **meerkat** (Suricata suricatta); L2, #1904. Target identity is inferred from the existing genome's natural cues, not a new gameplay/species decision. No hand-written-art fix or graph code is authorized here.

## Reference plate and provenance

![Generated adult/young towards/away standing/walking target](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/meerkat/target-v1.png)

Selected plate: [target-v1.png](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/meerkat/target-v1.png), SHA256 `8925b45f0384712d55d5bc4c3667773eaf525bbfb0395df8e85aa0742ea3daf4`. Generated 2026-11-07 with the built-in **image_gen.imagegen** tool (scientific-educational, photoreal target; model/version/seed not exposed). [Exact prompt](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/meerkat/prompt-v1.txt); [provenance](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/meerkat/provenance-v1.json). No Commons photo was input to imagegen or committed.

Eight cells: adult row1, mobile juvenile row2; columns standing-towards, standing-away, walking-towards, walking-away. Young represents game age0's mobile visual role, **not a literal neonate or scientifically verified age**. The game has young variants; many real neonatal mammals cannot stand/walk. Size ratios between generated cells are illustrative, not calibrated.

Camera target: art/model3d.js PITCH=.52rad (29.79° downward) and YAW={towards:.6,away:-.6}rad (±34.38°). Prompts approximate a long-lens affine-looking view. Generated heading, perspective, scale and foot contact are not constrained by the real renderer: some cells are more frontal/rearward, and v2 silhouettes can shift angle. **No pixel-exact game-camera match, game-size recognition verdict or actual motion cycle is claimed.**

## Real-photo comparison — real anatomy wins

[Commons comparison file: Suricata suricatta (Meerkat).jpg](https://commons.wikimedia.org/wiki/File:Suricata_suricatta_(Meerkat).jpg). Viewed locally for comparison only; not on either committed branch. Commons sentinel photo shows narrow muzzle, low ears, dark eye patches, long foreclaws and upright hind-foot support. Back and full tail are not shown well; band count and tail ratios are not measured from it.

Photo occlusion, fur, pose and lens prevent reliable joint/length measurement; do not treat this single photograph as a complete anatomical dataset.

## Identifying checklist

1. Slim elongated body, with an upright sentinel pose as well as quadrupedal travel.
2. Small rounded dark ears low on the head.
3. Dark eye patches around eyes; pointed narrow muzzle.
4. Long neck in sentinel pose, not a spherical rodent head on a ball.
5. Sandy grizzled coat with transverse back bands.
6. Long narrow tapering tail and strong curved foreclaws.
7. Pup: larger rounder head and shorter neck while preserving eye mask and tail.

## Body plan and proportion targets

**L = nose to tail-base length in a neutral quadrupedal pose, excluding tail**, not the torso-only spine length. Head means muzzle tip to occiput; exposed neck is occiput-to-shoulder transition; limb reach means vertical shoulder/hip-to-ground in quiet stance, not summed bone lengths. Ratios below are **artist starting ranges inferred from general anatomy/photos, not specimen measurements, fitted genome values or universal biological bounds**. Adjust for pose and actual photo evidence.

Head 0.17–0.22; exposed neck0.12–0.20; quadrupedal standing limb reach0.22–0.32; tail0.60–0.80.

Narrow shoulders/ribs, tucked abdomen and somewhat stronger hips; upright weight carried over hind feet, tail a support/counterbalance rather than a giant fan.

Age0 target: scale the whole animal down, then increase relative head/eye size and reduce muzzle/tail maturity as listed above; do not merely shrink an adult. These are qualitative age keys, not validated growth measurements. Preserve the natural four-limb body plan at every game age. Magical/legend adornments must not replace the identifiable natural silhouette; no new legendary concept is invented in this lane.

## Graph requirements and missing features

Reusable transition between quadrupedal walking and upright hind-foot support; grasp/dig forepaw/claw assembly and body-relative back-band placement. Neck sockets now exist in1866; no new neck-kind request.

Capability audit is source-only: prototype524b0acaa has generic head/leg/wing/tail/shell sockets. Read-only #1866 headde27db5154a3e8b1aa94255263bd2601b92aec36 additionally has neck, parent attachments and static triangular membrane sockets. Thus **neck and membrane kinds are present**, not missing. Its leg foot is an ellipsoid (hoof can split); no explicit reusable digging-palm/digit, ear/tuft, spine-field or folded-patagium deformation contract was verified. Generic ellipsoids can block out some shapes; absence of a named semantic control does not prove geometry is impossible. Requests here are shared graph/family capabilities to confirm with1866, never a permission to patch old builders.

## Ranked targets and image QA

1. Sentinel-compatible spine/hip pose.
2. eye mask+small ears.
3. long tail and foreclaws.

v1 supplies four-foot standing and walking targets with clear mask and bands; back stripes are stronger than the muted natural target, and the plate omits the sentinel pose shown by the real photo. Use the photo for upright body plan, not a new sprite verdict.

All selected plates were visually inspected for whole framing, adult/young rows and towards/away standing/walking coverage. A lifted paw is not gait validation; hidden far-side feet and exact digit counts are not certified. Generated-photo discrepancies are excluded from the graph specification by the checklist and real-photo priority. Optional shipped-art critique omitted: no shipped renderer run or native/4× acceptance was allocated; the later instruction supersedes that exhaustive review.

Review boundary: target note/reference output complete for coordinator review, with explicit uncertainties above. Species migration and likeness acceptance remain #1866/canonical/Ed decisions; no source, rig, render, registry, gameplay, text or default changed.
