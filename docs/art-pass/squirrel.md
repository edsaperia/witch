# Eurasian red squirrel target — graph target

Species scope: **squirrel** (Sciurus vulgaris); L2, #1904. Target identity is inferred from the existing genome's natural cues, not a new gameplay/species decision. No hand-written-art fix or graph code is authorized here.

## Reference plate and provenance

![Generated adult/young towards/away standing/walking target](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/squirrel/target-v1.png)

Selected plate: [target-v1.png](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/squirrel/target-v1.png), SHA256 `b8fe1e044d78a9ff265387cf1e1e253ad54fc4d3e6f28f29f27ae3739418ed20`. Generated 2026-11-07 with the built-in **image_gen.imagegen** tool (scientific-educational, photoreal target; model/version/seed not exposed). [Exact prompt](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/squirrel/prompt-v1.txt); [provenance](https://raw.githubusercontent.com/edsaperia/witch/20d25e05fdc3b44a73ba23e7e270c8105498f1d0/previews/art-pass/squirrel/provenance-v1.json). No Commons photo was input to imagegen or committed.

Eight cells: adult row1, mobile juvenile row2; columns standing-towards, standing-away, walking-towards, walking-away. Young represents game age0's mobile visual role, **not a literal neonate or scientifically verified age**. The game has young variants; many real neonatal mammals cannot stand/walk. Size ratios between generated cells are illustrative, not calibrated.

Camera target: art/model3d.js PITCH=.52rad (29.79° downward) and YAW={towards:.6,away:-.6}rad (±34.38°). Prompts approximate a long-lens affine-looking view. Generated heading, perspective, scale and foot contact are not constrained by the real renderer: some cells are more frontal/rearward, and v2 silhouettes can shift angle. **No pixel-exact game-camera match, game-size recognition verdict or actual motion cycle is claimed.**

## Real-photo comparison — real anatomy wins

[Commons comparison file: Sciurus vulgaris.JPG](https://commons.wikimedia.org/wiki/File:Sciurus_vulgaris.JPG). Viewed locally for comparison only; not on either committed branch. The inspected Julita Goszkowska Commons photo shows red coat/pale underside, fine forepaws, strong seated haunches and a bushy tail. It is low resolution and does not establish walking joints or tuft length. The higher-resolution Sciurus_vulgaris.jpg file was unavailable (HTTP429), not visually reviewed.

Photo occlusion, fur, pose and lens prevent reliable joint/length measurement; do not treat this single photograph as a complete anatomical dataset.

## Identifying checklist

1. Large bushy tail carried as an arc/fan behind the body.
2. Pointed ear tufts for the chosen tufted red-squirrel target, seasonal not universal.
3. Small head with whiskered short muzzle and dark eyes.
4. Narrow shoulders and distinctly strong haunches.
5. Long folded hind limbs/feet compared with delicate forepaws.
6. Reddish upper coat with pale underside, allowing natural colour variation.
7. Mobile kit: shorter less full tail and subtler tufts; not a miniature identical adult.

## Body plan and proportion targets

**L = nose to tail-base length in a neutral quadrupedal pose, excluding tail**, not the torso-only spine length. Head means muzzle tip to occiput; exposed neck is occiput-to-shoulder transition; limb reach means vertical shoulder/hip-to-ground in quiet stance, not summed bone lengths. Ratios below are **artist starting ranges inferred from general anatomy/photos, not specimen measurements, fitted genome values or universal biological bounds**. Adjust for pose and actual photo evidence.

Head 0.18–0.24; exposed neck0.05–0.10; forelimb reach0.20–0.28, hindlimb reach0.28–0.40; tail0.75–1.00.

Hindquarter-dominant with a light chest and tucked middle; tail adds silhouette area without moving the torso centre of mass into the tail.

Age0 target: scale the whole animal down, then increase relative head/eye size and reduce muzzle/tail maturity as listed above; do not merely shrink an adult. These are qualitative age keys, not validated growth measurements. Preserve the natural four-limb body plan at every game age. Magical/legend adornments must not replace the identifiable natural silhouette; no new legendary concept is invented in this lane.

## Graph requirements and missing features

Tufted pinna assembly and anisotropic fur plume tail; grasping foredigits/elongated hind-foot controls. Plain tail chain exists but does not by itself specify the red-squirrel fan.

Capability audit is source-only: prototype524b0acaa has generic head/leg/wing/tail/shell sockets. Read-only #1866 headde27db5154a3e8b1aa94255263bd2601b92aec36 additionally has neck, parent attachments and static triangular membrane sockets. Thus **neck and membrane kinds are present**, not missing. Its leg foot is an ellipsoid (hoof can split); no explicit reusable digging-palm/digit, ear/tuft, spine-field or folded-patagium deformation contract was verified. Generic ellipsoids can block out some shapes; absence of a named semantic control does not prove geometry is impossible. Requests here are shared graph/family capabilities to confirm with1866, never a permission to patch old builders.

## Ranked targets and image QA

1. Hindquarter/forelimb contrast.
2. curved bushy tail.
3. ear tufts.

v1 shows fan tail, tufts and stronger haunches, but adult tufts are exaggerated and the camera is more frontal than a calibrated game heading. Keep a squirrel silhouette without copying the oversized ear-tuft length.

All selected plates were visually inspected for whole framing, adult/young rows and towards/away standing/walking coverage. A lifted paw is not gait validation; hidden far-side feet and exact digit counts are not certified. Generated-photo discrepancies are excluded from the graph specification by the checklist and real-photo priority. Optional shipped-art critique omitted: no shipped renderer run or native/4× acceptance was allocated; the later instruction supersedes that exhaustive review.

Review boundary: target note/reference output complete for coordinator review, with explicit uncertainties above. Species migration and likeness acceptance remain #1866/canonical/Ed decisions; no source, rig, render, registry, gameplay, text or default changed.
