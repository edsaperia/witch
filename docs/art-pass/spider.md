# Tarantula (saved id spider): body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Brachypelma hamorii/redknee comparison; current genome specifies hairy orange-banded tarantula. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Eight walking legs attached to cephalothorax
- Two shorter front pedipalps, not a fifth walking pair
- Two clear body masses joined by narrow pedicel
- Large hairy abdomen behind flatter cephalothorax
- Thick multi-joint legs radiate from front body
- Orange knee bands and dark bristles
- Small clustered eyes; no antennae or long tail

## Body plan and mass

L = cephalothorax front to abdomen rear, excluding appendages. Cephalothorax 0.40–0.48L, abdomen 0.50–0.60L; short pedicel between. Abdomen width 0.45–0.65L and depth 0.35–0.50L; each leg chain 1.0–1.5L, resting total leg span 2.0–2.7L; pedipalps 0.35–0.55L. No mammal neck; tiny spinnerets do not become a tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Large rear abdomen and lower broad front body, carried within a wide low eight-foot support area. Hair broadens contours but should not conceal joints or merge front limbs.

**Age0:** Juvenile remains an eight-legged spider with small pedipalps, rounder relative abdomen and simpler banding. Game age0 is not a six-legged insect stage. Exact hatchling coloration was not validated.

**Top three priorities:** Separate eight walking legs and palps → expose two body masses → keep orange joint bands.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/spider/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons redknee photo shows thick orange-banded legs, separate hairy abdomen and broad cephalothorax. Several limbs occlude each other in both photo and generated sheet, so the eight-leg requirement is anatomical, not a claim that every image visibly proves count. The generated base views lean too frontal compared with requested side-oblique camera.

[Photo gallery](https://commons.wikimedia.org/wiki/Category:Brachypelma_hamorii) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/spider/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No tarantula family in #1866; generic three mammal-leg families lack radial multi-joint spider articulation, front pedipalps/chelicerae and a narrow pedicel connecting a separate abdomen. Need eight-leg phase/support rules, small spinneret sockets and bristle fields that follow each part.

## Three legend concepts and recommended pick

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/spider/legend-comparison-l8.png). A: burrow weaver with luminous ground silk. B: canyon listener with enlarged sensory foreleg hairs. C: silk reliquary with old silk shawl and bronze thorn.

**Recommend B — B best respects a tarantula's sensory nature and low patient stance. Long weathered sensory hairs become the power; orange bands keep family identity. It avoids transferring an orb-weaver's suspended wheel web to a tarantula.** Ed judges the recommendation. Signature element: **Luminous sensory foreleg hairs**.

**Chosen legend checklist/body plan:** Front leg sensory hair envelope extends 0.20–0.35L beyond the ordinary limb contour; abdomen width 0.60–0.75L, leg span 2.3–3.0L. Keep eight walking legs, shorter palps and clustered ordinary eyes. Grey worn tips, scars and sparse terminal light communicate age without hiding anatomy.

**Additional graph needs:** Part-local directional sensory bristle fans with sparse tip emission and asymmetric wear; do not add a ring of new eyes or make sensory hairs into extra legs.

**Area/story source:** art/areas.js thorn-scrub text: dry brown earth, rocky banks, thorny scrub/cobwebs, thorn trees/hawthorns/junipers and a web-hung dead tree. Current genome places tarantula in badlands.

**Comparison limits:** The generated legend invents a Latin name; ignore it. Its frontal presentation and obscured limb count are not camera/anatomy proof. A's rose-window fragment and C's silk cloak are alternatives only. Current albedo preserves radial legs and dark/orange palette. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.

