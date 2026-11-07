# Tiger: L3 graph target

7 November 2026. Species ID `tiger`; Panthera tigris. Draft design reference for PR1906, source base524b0acaa43bb9975e7b2834ff9a55cbca4b3319. Ed judges the legend recommendation. No activation, implementation or claim that the current game passes.

## Reads-as target

Long heavy striped cat with powerful shoulder and white cheek ruff.

- Elongated deep muscular torso
- Heavy shoulder and thick neck
- Broad head with short strong muzzle
- Small round ears with dark backs/light marks
- Orange-and-black stripes wrapping volumes
- White cheek/muzzle/underside separation
- Long tapering ring-striped tail
- Large broad paws and visible digitigrade hindleg

## Adult and mobile-young references

![Adult and mobile-young target sheet](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/tiger/refs-v1.png)

Top row adult, bottom row mobile young/age0 target; columns standing towards, standing away, walking towards, walking away. Ages scaled independently: NOT a world-size comparison. Age0 means a mobile cub/kitten, not a newborn. Game levels remain0 baby/1 young/2 adult/3 legend. This does not redefine their biology or game sizes.

## Proportions and mass

Use L = nose to tail base (head-body length), excluding tail, mane and decorative fur. These are **artist starting ranges**, not measured zoological statistics, pixel measurements or acceptance thresholds. Perspective, pose, sex, subspecies and coat vary. Refine against multiple orthogonal photos before implementation.

| Quantity | Fraction of L |
|---|---|
| Exposed leg: ground to ventral trunk | .28–.39 |
| Head: occiput to nose | .17–.22 |
| Visible neck bridge | .10–.16 |
| Tail: base to tip along curve | .45–.65 |
| Ground to shoulder | .48–.63 |

Low long ribcage, strong shoulders/thighs, thick neck bridge; cheek ruff adds fur around a clearly feline skull. Avoid lion mane or a short square jaguar trunk.

Young: Large round head/paws, short muzzle and broad soft stripes on a softer body. Still a tiger in silhouette; no mane.

Feline hindlegs are digitigrade: the visible backward hock is an ankle, not a backward knee. Preserve fore/hind distinction and paw support; a still generated frame does not prove a gait cycle.

## Photograph and anatomy cross-check

Adult side photo shows long deep torso, strong neck, wrapped stripes and complete curled tail; plants hide parts of feet. Young drinking photo shows face/ear markings and full striped tail but crouch cannot establish standing leg ratios. Generated sheet covers standing/walking for target inspection.

- [adult: File:Lateral tiger.jpg](https://commons.wikimedia.org/wiki/File:Lateral_tiger.jpg) — viewed privately.
- [young: File:Baby tiger cub.jpg](https://commons.wikimedia.org/wiki/File:Baby_tiger_cub.jpg) — viewed privately.

[Expert species description](https://www.catsg.org/living-species-tiger) supports the identifying traits; ratios above are our design estimates. Commons photos are comparison-only, kept private and never published in this PR or shots.

## Three legend concepts and existing comparison

Area/story: Bamboo jungle: leaf litter, bamboo walls, ferns/long grass, bamboo under kapok, mossed temple rubble (art/areas/bamboo-jungle/recipe.js).

| Three new proposals, A/B/C left to right | Existing renderer comparison, ALL ages |
|---|---|
| ![Three legend concepts](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/tiger/legends-v1.png) | ![Archived current-vs-graph diagnostic](https://raw.githubusercontent.com/edsaperia/witch/d00884c0b23532ce8ef35138fa90ee69da76cf72/previews/ed/creature-graph/cats-1/tiger.png) |

The right-hand sheet is **archival**, source/served SHA aad8b13327282d13d7d6a4e2e1b28aa2acfd6b6c, fixture cats-1. Read its Current column, level3 row for the old legend; its graph column is NOT the target. It is not a capture of today's524b0ac source. Fresh exact-head legend evidence must be supplied by the canonical renderer before a current-vs-target verdict; no laptop browser was allocated or run.

- A Temple Witness — grizzled white ruff, scarred brow and faded red-flower/bronze offering garland.
- B Bamboo Shadow — narrow translucent dark shoulder fins recalling leaves.
- C Ruin Guardian — eroded bronze cuff and illuminated stripe edges.

**Recommended A; signature element: Weathered temple offerings.** The temple’s old witness is revered, not merely decorated: faded flowers and worn bronze sit against an enormous scarred tiger. Age and calm physical power lead. B risks a generic crest, C risks uniform armour.

Chosen legend checklist/body plan: Keep long striped torso, white cheeks, full tail and low heavy shoulders. Attach sparse faded flowers and beads to a throat curve with collision clearance, not a chest-covering bib. Weather stripes/ruff while retaining tiger identity.

These are three concepts generated together in one sheet, not three independent calibrated render trials. Inspect all whole bodies and recognisability; labels identify proposals, not approved in-game names. Only Ed/coordinator can adopt a pick.

## Top three priorities and MISSING GRAPH FEATURES

Top three: long heavy torso; wrapped stripes; cheek ruff/paws.

Head-local cheek ruff and attached throat garland contract, scar/age overlays preserving stripe identity. Torso profiles and surface markings exist and should be reused.

At the pinned source, `art/body-graph/graph.js` has head/leg/wing/tail/shell sockets, torso spine stations, head ellipsoid, two-bone digitigrade legs and a foot ellipsoid. `quadruped.js` already has torso profile/flex, pointed-ear cup helpers and region patterns; `families.js` has feline adapter; `tail-markings.js` already supports rings/spots/rosettes/tip paint. `gait.js` has a two-bone straight-line diagnostic solve. Do NOT request basic tails, all ears, all patterns or all gait as wholly absent. Missing contract: rotating station frames/socket-to-socket attachments (explicit future work), nested head/foot-local feature inheritance, age-linked fur/tuft/accessory attachment data and scar/weathering regions. Legacy features may draw these today; this is a request for shared graph representation, not a demand for handwritten species fixes. Refer implementation to graph owner#1866.

## Provenance and limits

Built-in `image_gen.imagegen`, 7 November2026; no model identifier/seed reported. Text-only generation, no source photograph supplied as input. Anatomy prompts ask photorealism; legends use sculptural concept art. Actual camera source `art/model3d.js`: pitch0.52rad (29.8° down), yaw±0.6rad (34.4°). Tool output only approximates this; no camera calibration, native-size rendering, pixel-diff, locomotion/contact or graph-fit proof. All selected generated sheets were visually inspected for panel/age/pose coverage and complete animals; natural occlusion remains.

Generated proposals A/C resemble current authored intentions; originality is not a claim of implementation improvement.

### Exact anatomy generation prompt

```text
Scientific-educational PHOTOREAL whole-animal anatomy reference contact sheet; eight equal panels, two rows of four. Clean off-white studio ground/background, soft even daylight, no objects, no text or labels. Approximate game camera: elevation29.8 degrees looking down, long-lens orthographic-like perspective, long body axis34.4 degrees toward/away from side-on. TOP ROW SAME ADULT: standing towards, standing away, slow walking towards, slow walking away. BOTTOM ROW SAME MOBILE YOUNG: identical four poses/order. Exactly one animal in each panel, four anatomically correct digitigrade legs and clear natural slow-walk paw placement. Whole body, every ear/paw and ENTIRE TAIL including tip in frame with generous padding; no cropping or tail hidden behind body: gently sweep tail outward where needed. Adult/young scaled independently for inspection, not direct size comparison. Neutral natural expression, no stylization, no collars, no extra limbs. TIGER (Panthera tigris): adult natural orange Bengal-type tiger, powerful elongated deep torso, massive forequarters and shoulders smoothly joined to back, muscular limbs, broad round paws, large broad head with white cheek ruffs, rounded small ears with black backs and white spots, long tapering ringed tail. Black vertical/branching body stripes and white belly/inner limbs; no rosettes or lion mane. Young approximately3-month mobile cub: larger head and ears relative to torso, shorter immature limbs, broad paws, short muzzle, soft fluffy cheek ruff, already clear tiger stripes. Do not overinflate cub belly or shorten the tiger into a bulldog.
```

### Exact legend generation prompt

```text
Concept art comparison sheet, THREE distinctly DIFFERENT legendary creature proposals in THREE equal columns labelled A, B, C only. One WHOLE creature per column, ears paws tail entirely visible with generous margin, plain warm ivory studio background and ground shadow, no scenery or extra animals. Approximate Witch GAME camera elevation29.8deg looking down, long-lens orthographic-like, body34.4deg toward camera from side-on. All are ancient powerful wise elders, animal's defining nature exaggerated into magic, still recognisably that exact species. Painterly sculptural concept art with bold coherent silhouettes, restrained palette/large readable shapes, not a UI/game sprite or calibrated render. Strong anatomy and natural quadruped standing or slow deliberate walking, no gore; healed scars only. Each concept its OWN idea, not uniform accessory swaps. TIGER, long deep heavy orange body with black stripes, white cheeks, small round ears, long striped tail. Bamboo jungle with leaf litter, kapok canopy, mossed temple rubble. A: Temple Witness, huge grizzled tiger whose old stripes soften into weathered calligraphic strokes, white cheek ruff, scarred brow, asymmetrical garland of a FEW faded red flowers and tarnished bronze beads at throat, revered and powerful, no crown. B: Bamboo Shadow, ancient tiger with stripes raised into narrow translucent dark glass fins along shoulders ONLY, echo bamboo leaves, chipped tips, still no wings, tail fully visible. C: Ruin Guardian, muscular old tiger with one eroded temple-bronze foreleg cuff, deep pale healed scars, glowing gold stripe edges like cracks in old lacquer; no human clothing.
```

See [L3 summary](l3-summary.md) for evidence hashes, shared gaps and remaining checks.
