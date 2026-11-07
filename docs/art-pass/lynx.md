# Eurasian lynx: L3 graph target

7 November 2026. Species ID `lynx`; Lynx lynx. Draft design reference for PR1906, source base524b0acaa43bb9975e7b2834ff9a55cbca4b3319. Ed judges the legend recommendation. No activation, implementation or claim that the current game passes.

## Reads-as target

High-rumped, long-legged spotted cat with bobtail and ear tufts.

- Short bobtail ending in a complete black tip
- Long legs with hindquarters slightly high
- Huge broad furred paws
- Pointed ears with separate thin black tufts
- Broad cheek ruff around a short feline face
- Spotted tawny-grey coat, not stripes
- Compact trunk; no dog snout or long domestic-cat tail

## Adult and mobile-young references

![Adult and mobile-young target sheet](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/lynx/refs-v1.png)

Top row adult, bottom row mobile young/age0 target; columns standing towards, standing away, walking towards, walking away. Ages scaled independently: NOT a world-size comparison. Age0 means a mobile cub/kitten, not a newborn. Game levels remain0 baby/1 young/2 adult/3 legend. This does not redefine their biology or game sizes.

## Proportions and mass

Use L = nose to tail base (head-body length), excluding tail, mane and decorative fur. These are **artist starting ranges**, not measured zoological statistics, pixel measurements or acceptance thresholds. Perspective, pose, sex, subspecies and coat vary. Refine against multiple orthogonal photos before implementation.

| Quantity | Fraction of L |
|---|---|
| Exposed leg: ground to ventral trunk | .35–.46 |
| Head: occiput to nose | .18–.23 |
| Visible neck bridge | .07–.12 |
| Tail: base to tip along curve | .10–.20 |
| Ground to shoulder | .58–.72 |

Ribcage carried high between long limbs, strong thigh/hip mass, large feet. Cheek fur widens the face without enlarging the skull into a bear.

Young: Relatively larger head/paws, short muzzle and immature legs; already a bobtail. Tufts remain slender and distinguishable from ear cups.

Feline hindlegs are digitigrade: the visible backward hock is an ankle, not a backward knee. Preserve fore/hind distinction and paw support; a still generated frame does not prove a gait cycle.

## Photograph and anatomy cross-check

Adult photograph visibly confirms pointed tufted ears, short black-ended tail, cheek ruff and long limbs. Slope biases apparent leg height. Young thumbnail returned HTTP429 twice with a spaced retry: NOT visually inspected, no young-photo claim.

- [adult: File:Lynx lynx carpathicus Germany (standing).jpg](https://commons.wikimedia.org/wiki/File:Lynx_lynx_carpathicus_Germany_(standing).jpg) — viewed privately.
- [young: File:Lynx lynx cub 20050709.jpg](https://commons.wikimedia.org/wiki/File:Lynx_lynx_cub_20050709.jpg) — NOT viewed: HTTP429.

[Expert species description](https://www.catsg.org/living-species-eurasianlynx) supports the identifying traits; ratios above are our design estimates. Commons photos are comparison-only, kept private and never published in this PR or shots.

## Iteration2: colossal fantasy concepts — current recommendation

Later Ed feedback on7November2026, COORDINATOR6708227119/6708229124, supersedes iteration1’s modest fantasy/plain-background direction. [DESIGN.md](../../DESIGN.md#look) says legends are about20times a baby’s height and taller than treetops; ART-GUIDE0b/0c asks for a recognisable animal’s nature made fantastic, epoch age, wisdom, power and reverence. These are proposed designs, not changes to game sizes.

![Iteration2 A/B/C and C at game camera](https://raw.githubusercontent.com/edsaperia/witch/4cf4e44eaff9061e3c99fdc753b8c1fc1ef1efe1/previews/art-pass/lynx/legends-scale-v2.png)

2×2 board: A upper-left, B upper-right, C MAXIMUM FANTASY lower-left; D lower-right repeats C at an approximate game-camera elevation29.8° down/yaw34.4° from side-on. **Exactly three designs; D is another view, not a fourth concept.** Witch and trees are included in every panel. A/B/C use low hero views to convey mass, far-side haze and landscape weathering. The witch is a scale stand-in, not an exact render of the game’s witch.

- A: ridge listener with aurora caught on long black ear quills and worn cheek offerings.
- B: frostbeard oracle with layered slate-like cheek-fur ledges and old snow.
- C MAXIMUM FANTASY: Ridge Walker; broad paws carry terraced scree/pine-root ledges and lift stones in a mountain spiral.

**Recommend C for Ed’s second-pass review; signature element: Scree lifted by terraced mountain paws.** C turns the lynx’s huge paws and rocky-slope movement into earth-shaping power. High rump, long legs, spotted fur, pointed tufted ears and short black bobtail survive the landform treatment. An ancient mountain walker is more distinct from the sand cat’s listening magic than another ear-only pick. A remains an elegant lower-fantasy alternative; B risks reading as a generic shaggy cat.

Chosen legend body-plan/checklist: Keep tall digitigrade legs and short black bobtail; enlarge paws broadly, not into hooves. Place rock ledges/rooted vegetation around ankle fur, with raised paw still separate from suspended scree. Thin ear quills catch aurora without replacing ear cups. Worn climbing votives remain sparse.

MISSING GRAPH FEATURES / shared integration needs: Foot/ankle-local layered fur/rock/vegetation sockets and clearance envelopes; a separately bounded airborne scree field linked to planted/raised state; asymmetric wear/offerings. Existing two-bone diagnostic legs lack the complete accessory/clearance contract.

Actual inspected output/projection limits: Witch and pines appear in all four panels. C/D retain short tail and high rump. Pine foreground overlaps feet; the levitating-scree spiral is readable in D, but exact contact and the difference between ankle foliage and ground trees need a graph render. A’s fine auroral tips reach the upper margin; do not treat glow extent as calibrated geometry.

Scale assessment: all four panels visibly contain a witch and trees; selected C/D read as colossal against the nearby witch and tree groups. Perspective/depth/variable tree size prevent an exact height comparison; no baby is depicted, so **20× baby height is a design prompt, not a verified measurement**. Native game projection, coverage/contact, accessory motion, occlusion and20× size must be tested on graph renders by the canonical owner. No local browser was allocated/run.

### Iteration2 exact generation prompt

```text
Witch videogame legendary creature second-pass design board. FOUR equal panels in a 2x2 grid, labelled A (upper left), B (upper right), C MAXIMUM FANTASY (lower left), D GAME CAMERA (lower right); no other text. A B C are THREE DIFFERENT concepts of SAME species; D repeats C's exact design from higher game camera. Every panel shows the ENTIRE huge creature including ALL ears/paws/tail, within ample margins. CRITICAL SCALE IN EVERY PANEL: a tiny human WITCH with pointed dark purple hat/dress holding broom STANDS on SAME ground plane next to front paw, clearly distinct and NOT riding animal; multiple complete FOREST TREES near paws and flank, with normal trunks/crowns and readable silhouettes. Creature head/shoulders TOWER ABOVE tree crowns; landscape-scale body mass, approximately20times a baby animal height, NOT a normal pet by a human. Trees about quarter to half creature shoulderheight, witch about one tenth to one fifteenth. Compose enough ground area to show scale without cropping creature. A B C cinematic slightly low/near-ground threequarter HERO viewpoint with atmospheric depth/haze on distant body, large weight-bearing landformlike masses. D SAME C at approximate actual game projection, elevation29.8deg DOWN, near-orthographic long lens, heading34.4deg from side-on facing viewer; whole giant+witch+trees still visible. Concept art: bold controlled painterly/small readable shape clusters, rich twilight with local magic light. Very ancient wise powerful mythical elder, animal's defining nature impossible, species instantly identifiable. No generic uniform, no gore, no modern buildings. Trees/environment support scale not hide anatomy. EURASIAN LYNX: very short black-tipped BOBTAIL, high rump, long feline legs, broad cheek ruff, pointed ears with thin black tufts, spotted tawny grey coat, HUGE furred paws. Rocky slope with scree/moss, boulders/pines. A: ancient ridge listener with ear tufts towering as black curved quills that catch pale aurora, weathered muzzle, tiny worn stone offerings on cheek ruff. B: frostbeard oracle, cheek ruff grown into cascading slate-and-fur ledges streaked with old snow, glowing amber eyes above dwarfed pines, no long tail. C MAXIMUM FANTASY RECOMMENDED: Ridge Walker, massive lynx crossing high scree; each huge furred paw carries terraced rock ridges and little pine roots in its ankle fur, loose scree stones levitate upward beneath lifted paw in a mountain-shaped spiral, dark ear tufts tuned like two slim aurora needles. The legs and head are recognisably long-legged LYNX, not bear or lion; full short black bobtail visible. Geological weathering and grey ruff show epochs, few hand-carved climbing offerings embedded at ankles. D same C in game camera.
```

Selected first iteration2 generation; no framing edit.

Generation: built-in imagegen,7November2026, model/seed unreported; text-only initial prompt; framing edits referenced only the species’ generated board, no real photos or game captures. No generated concept is activated.

## Iteration1: three historical concepts and existing comparison

Area/story: Rocky slope: scree and moss, boulders, rocks, pines and rocky outcrop (art/areas.js).

| Three new proposals, A/B/C left to right | Existing renderer comparison, ALL ages |
|---|---|
| ![Three legend concepts](https://raw.githubusercontent.com/edsaperia/witch/cf21dc94c118b95377e395f7e1fdec3d14c4db2e/previews/art-pass/lynx/legends-v1.png) | ![Archived current-vs-graph diagnostic](https://raw.githubusercontent.com/edsaperia/witch/d00884c0b23532ce8ef35138fa90ee69da76cf72/previews/ed/creature-graph/cats-1/lynx.png) |

The right-hand sheet is **archival**, source/served SHA aad8b13327282d13d7d6a4e2e1b28aa2acfd6b6c, fixture cats-1. Read its Current column, level3 row for the old legend; its graph column is NOT the target. It is not a capture of today's524b0ac source. Fresh exact-head legend evidence must be supplied by the canonical renderer before a current-vs-target verdict; no laptop browser was allocated or run.

- A Ridge Listener — long swept black ear quills with pale lit tips.
- B Scree Oracle — angular grey cheek ruff recalling layered shale.
- C Silent Tracker — enormous paws displacing suspended grit, pine-seed whisker beads.

**Historical iteration1 recommendation A; signature element: Luminous ear-tuft quills.** The lynx’s ear tufts become a tall, austere silhouette above its silent body; greying beard and worn face give an old ridge guardian. Unlike the sand cat, magic is at narrow hair tips, not inside broad listening cups.

Chosen legend checklist/body plan: Keep bobtail, high rump and large paws. Grow two curved ear-tuft chains from the actual ear tips, keep ears below them visible, weather the cheeks and muzzle. Reduce the generated extra beard if it overwhelms the lynx face.

These are three concepts generated together in one sheet, not three independent calibrated render trials. Inspect all whole bodies and recognisability; labels identify proposals, not approved in-game names. Only Ed/coordinator can adopt a pick.

## Top three priorities and MISSING GRAPH FEATURES

Top three: bobtail; high rump and paws; ear tufts.

Separate cheek/ear fur attachment data, paw width and tuft curves; age-linked inherited head sockets.

At the pinned source, `art/body-graph/graph.js` has head/leg/wing/tail/shell sockets, torso spine stations, head ellipsoid, two-bone digitigrade legs and a foot ellipsoid. `quadruped.js` already has torso profile/flex, pointed-ear cup helpers and region patterns; `families.js` has feline adapter; `tail-markings.js` already supports rings/spots/rosettes/tip paint. `gait.js` has a two-bone straight-line diagnostic solve. Do NOT request basic tails, all ears, all patterns or all gait as wholly absent. Missing contract: rotating station frames/socket-to-socket attachments (explicit future work), nested head/foot-local feature inheritance, age-linked fur/tuft/accessory attachment data and scar/weathering regions. Legacy features may draw these today; this is a request for shared graph representation, not a demand for handwritten species fixes. Refer implementation to graph owner#1866.

## Provenance and limits

Built-in `image_gen.imagegen`, 7 November2026; no model identifier/seed reported. Text-only generation, no source photograph supplied as input. Anatomy prompts ask photorealism; legends use sculptural concept art. Actual camera source `art/model3d.js`: pitch0.52rad (29.8° down), yaw±0.6rad (34.4°). Tool output only approximates this; no camera calibration, native-size rendering, pixel-diff, locomotion/contact or graph-fit proof. All selected generated sheets were visually inspected for panel/age/pose coverage and complete animals; natural occlusion remains.

Young real-photo cross-check pending HTTP429.

### Exact anatomy generation prompt

```text
Scientific-educational PHOTOREAL whole-animal anatomy contact sheet, eight equal panels, two rows of four. Plain warm off-white studio floor/background, soft neutral daylight, no objects/text/labels/collars. Camera approximately29.8 degrees looking down, long-lens orthographic-like, animal long axis34.4 degrees toward or away from side-on. Top row same ADULT: stand towards, stand away, slow natural walk towards, slow natural walk away. Bottom row same MOBILE YOUNG in identical order. Every animal entirely inside its own panel with ample padding including every paw/ear/tail; no crop. Four anatomically correct legs, digitigrade feline paws/hocks, clear weight-bearing slow-walk stance. No stylization, human expression, or distorted/extra limbs. Scale each age independently for anatomical inspection; not a size comparison. EURASIAN LYNX (Lynx lynx), not caracal or bobcat. Adult robust long-legged high-rumped cat, large broad furred paws, short bobtail with complete black tip, triangular ears with long black tufts, wide cheek ruff, tawny-grey spotted coat. Young approximately3-month-old lynx cub with relatively larger head and paws, shorter muzzle/legs, visible ear tufts and already short black-tipped tail. Keep species proportions, do not turn it into a domestic kitten with ears added.
```

### Exact legend generation prompt

```text
Concept art comparison sheet, THREE distinctly DIFFERENT legendary creature proposals in THREE equal columns labelled A, B, C only. One WHOLE creature per column, ears paws tail entirely visible with generous margin, plain warm ivory studio background and ground shadow, no scenery or extra animals. Approximate Witch GAME camera elevation29.8deg looking down, long-lens orthographic-like, body34.4deg toward camera from side-on. All are ancient powerful wise elders, animal's defining nature exaggerated into magic, still recognisably that exact species. Painterly sculptural concept art with bold coherent silhouettes, restrained palette/large readable shapes, not a UI/game sprite or calibrated render. Strong anatomy and natural quadruped standing or slow deliberate walking, no gore; healed scars only. Each concept its OWN idea, not uniform accessory swaps. EURASIAN LYNX, high-rumped long legs, HUGE paws, SHORT BLACK-TIPPED BOBTAIL, pointed ears and cheek ruff. Rocky slope with scree moss boulders pines. A: Ridge Listener, ear tufts grown into sweeping tall black quills with pale glowing tips, deeply weathered muzzle and nicked ear, grey cheek beard, strong large snowshoe paws. B: Scree Oracle, enormous angular cheek ruff like layered shale, old silver fur and amber slit eyes reflecting a distant ridge, no rock on its back. C: Silent Tracker, gigantic broad furred paws outlined by suspended grit under soles, whiskers threaded with a few worn pine-seed beads, scarred nose. No long tail and no lion mane.
```

See [L3 summary](l3-summary.md) for evidence hashes, shared gaps and remaining checks.
