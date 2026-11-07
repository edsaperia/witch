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

## First-pass legend concepts (preserved history)

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/spider/legend-comparison-l8.png). A: burrow weaver with luminous ground silk. B: canyon listener with enlarged sensory foreleg hairs. C: silk reliquary with old silk shawl and bronze thorn.

**First-pass recommendation B — B best respects a tarantula's sensory nature and low patient stance. Long weathered sensory hairs become the power; orange bands keep family identity. It avoids transferring an orb-weaver's suspended wheel web to a tarantula.** Ed judges the recommendation. Signature element: **Luminous sensory foreleg hairs**.

**Chosen legend checklist/body plan:** Front leg sensory hair envelope extends 0.20–0.35L beyond the ordinary limb contour; abdomen width 0.60–0.75L, leg span 2.3–3.0L. Keep eight walking legs, shorter palps and clustered ordinary eyes. Grey worn tips, scars and sparse terminal light communicate age without hiding anatomy.

**Additional graph needs:** Part-local directional sensory bristle fans with sparse tip emission and asymmetric wear; do not add a ring of new eyes or make sensory hairs into extra legs.

**Area/story source:** art/areas.js thorn-scrub text: dry brown earth, rocky banks, thorny scrub/cobwebs, thorn trees/hawthorns/junipers and a web-hung dead tree. Current genome places tarantula in badlands.

**Comparison limits:** The generated legend invents a Latin name; ignore it. Its frontal presentation and obscured limb count are not camera/anatomy proof. A's rose-window fragment and C's silk cloak are alternatives only. Current albedo preserves radial legs and dark/orange palette. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.


## Legend concepts v2: colossal fantasy revision

Read1476#6708227119 and6708229124. This section supersedes the earlier legend recommendation; anatomy targets remain. [Revised three concepts and current comparison](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/spider/legend-comparison-l8-v2.png), [full plate](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/spider/legend-concepts-l8-v2.png), [exact prompt/provenance](https://github.com/edsaperia/witch/blob/0551b51eaed88be82398fad335db46827238dc1e/previews/art-pass/spider/provenance-l8-v2.json). Three columns A/B/C, hero view above and approximate game-camera view below. Every C is the maximum-fantasy alternative.

A ground-silk burrow shrine; B sensing hairs reading vibrations through earth; C canyon fault-line earth harp (maximum fantasy).

**Current proposed pick B. Signature element: Sensory foreleg hairs reading the earth's vibrations.** The ancient tarantula knows the land through touch. Impossible ground ripples magnify its sensory hairs while grey fur, old bands and votive knee offerings show reverence. C is the maximum leap, but B better preserves the low patient tarantula rather than borrowing a suspended orb-weaver identity. Ed judges this proposal; no selection is implemented or activated.

**Chosen legend checklist/body plan:** Keep two body masses, eight walking legs and shorter pedipalps. Extend directional sensory hair envelope0.20–0.35L beyond the front legs, with sparse worn offerings above joints. Hair tips approach ground but do not become a second set of limbs. Ground ripples are decorative sensing imagery tied to contact points.

**Additional graph needs:** Part-local directional hair fans and sparse tip emission, contact-aligned bounded ground-ripple visual, independent palps/chelicerae, eight-leg support and massive-body bounds/LOD. No actual sensing mechanic or audio feature is implemented.

**Inspection and scale limits:** Witch and thorn forest trees are present in every cell. Front-facing hero and game rows underperform requested side-oblique heading; some far legs occlude, and ornaments can hide joints. These are fantasy targets, with natural plate anatomy taking precedence. Giant scale follows the newly relayed intent, roughly20times game baby height and above the treetops, with witch/trees as qualitative cues. No baby calibration measurement, exact projection, runtime size/lighting or performance is proven; lower-view labels are requests, not verified camera parameters. Absolute sizing needs separate acceptance against DESIGN and current size rules.

## Third-pass readable pixel references

Read the relayed third-pass direction (issue #1476, comments 6710686653/6710694651/6710701175). Two concepts are retained for review: **A long-legged chelicerae elder; B heavy-abdomen elder**. Both keep the animal readable by exaggerating existing features only; armor, decoration, weathering and magic stay restrained. Body-scenes and invented anatomy are excluded.

[True 1× pixel reference](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/spider/legend-pixel-l8-v3-1x.png) · [nearest-neighbour 4×](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/spider/legend-pixel-l8-v3-4x.png). The sheet uses the existing v2 concept plate as a source anchor, reduced to a readable game-style pixel grid and enlarged 4× with nearest-neighbour. Each concept includes hero and approximate game-camera towards/away silhouettes, witch scale and forest trees.

**Review limits:** These are reference derivatives, not runtime sprites. 1× is a readability target, not a measured final tile size; 4× is a nearest-neighbour inspection aid. Exact giant scale, camera projection, lighting, gait, distant LOD and graph implementation remain unverified.
