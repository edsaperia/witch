# Fennec fox: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Vulpes zerda. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated fennec fox adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/fennec/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/fennec/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Ear scale is intentionally dominant but symmetry and the sharp dark tail tip are generated simplifications. Do not accept these proportions until compared with the real animal.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Fennec_Fox_Vulpes_zerda.jpg). Photo page and photographer provenance located (Drew Avery, Norfolk Zoo). Direct photo retrieval returned HTTP429; no visual comparison claimed. A second named Commons photo also returned429. Real-photo cross-check, including a kit, is pending. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Very large broad-based upright ear cups dominate the outline.
2. Small delicate head with a fine pointed muzzle.
3. Light compact torso with a visible but moderate tuck.
4. Slim digitigrade legs, with fur covering the feet.
5. Pale sandy back and cream underside without red-fox black socks.
6. Long furry tail with a dark terminal tip.
7. Kit has a shorter muzzle and proportionally larger head; oversized ears must still attach anatomically.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.42–0.52 |
| Head length | 0.23–0.28 |
| Visible neck span | 0.10–0.15 |
| Tail root to tip | 0.55–0.70 |

Mass profile: Light chest and hips; most conspicuous upper volume is ear area, not a giant skull. Avoid a heavy red-fox body with rabbit ears pasted on.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Triangular ears with width/height/depth and root angle exist in quadruped.js, so do not request 'add ears'. The generic graph still lacks a reusable head-parented pinna socket and articulated hock. A broad concave sail-like pinna and controlled inner/outer material boundary need validation beyond the existing four-face cup.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Broad cupped ear geometry and roots.
2. Light body and fine muzzle.
3. Dark-tipped pale brush.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: fennec fox (Vulpes zerda) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult fennec fox; bottom row an independently walking, eyes-open fennec kit (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural fennec anatomy: very small lightly built sand-coloured desert fox, enormous broad-based upright triangular cupped ears, slim pointed muzzle and tiny dark nose, pale cream body white underparts, fine digitigrade limbs with furry soles, long bushy tail with BLACK tip. Do not give it black red-fox socks. Ears remain anatomically attached, not rabbit ears. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / kit; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent kit across bottom.

</details>

## Legend concepts — 7 November addition

**Three actual generated options; provisional owner pick B, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![fennec three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/fennec/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base level3 has enlarged sail ears, pale mask/eye glow, beads, small ruff and wisps along a mane; current roster overrides ear dimensions and dark tail-tip material. Exact current image is pending. Read [species genome](../../art/creatures/fennec/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Erg area text](../../art/areas/erg/recipe.js): Rippled dune sand at an oasis edge, dry grass and saltbush, date palms/olives/thorn trees/junipers; wind-worn stones around an old hearth. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Far listener: luminous acoustic veins and a sound ripple between huge ear cups; compelling hearing theme, but overlaps the wolf's sound signature.
- B Last hearth: warm ember light within worn ear sails, darkened tips and a scarred pale muzzle.
- C Dune memory: sand-strata ear markings, turquoise offering and a long sand-trailing tail; restrained but the offering does more storytelling than the animal.

### Provisional pick: B — The last hearth

**Signature element: Ember light held inside ear sails.** B puts the magic in the fennec's defining ears and ties it to the erg's old hearth. Its soot-worn rims and silver muzzle imply a keeper that outlasted many travellers. This uses flame because it fits this story; it is not the generic back crest criticised in the old audit. Ear-held warmth is deliberate fantasy, not a claim about real thermoregulation.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Tiny sand-fox body and fine muzzle remain beneath the enormous ears.
2. Broad cupped ears attach convincingly to the skull; no detached wing shape.
3. Ember light is contained by the inner pinna/rim, with restrained thin wisps.
4. Dark weathered ear edges and muzzle scars show age without a uniform crown.
5. Black-tipped brush and furred small paws preserve fennec family cues.
6. Keep the face clear of the effect and avoid a wall of glow at native size.

Body-plan target: Keep the light adult torso; exaggerate ear height to roughly one head-and-muzzle length or more as an artistic target, while controlling broad base and cup depth separately. No numeric zoological ear ratio is asserted. Low ordinary tail is the secondary mass.

Missing graph features / existing capabilities to reuse: Head-parented broad cupped pinna with independent rim/inner material/emissive mask and bounded local wisp attachment; worn-edge masks. Existing quadruped ear width/height/depth and socket angles are useful, not absent. Flame is local ear content, not a new crest applied to all species.

**Output review:** Generator added unrequested typography and very large ear surfaces, and the camera is shallower than requested. B is a usable concept direction, not a calibrated pose or accepted ear proportions. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. Make one three-column legend concept sheet, A B C, three DISTINCT ancient FENNEC FOXES, one whole creature per column, ALL huge ears and tail tips within frame, pale flat neutral studio background ONLY, subtle contact shadows, no desert scenery or plants. Elevated camera looking DOWN30degrees, near orthographic, body broadside muzzle turned35degrees toward viewer. Natural tiny sand fox body, enormous broad cupped triangular ears, very fine muzzle, small furred paws, cream sandy coat and black-tipped brush; do not turn it into a rabbit or red fox. Area inspiration ONLY: rippled dunes, oasis, date palms, wind-worn stones around an ancient hearth. Show age with greying fur, fine muzzle scars, worn ear edges, wise calm heavy presence. A The far listener: ear cups enormous and ribbed with fine pale star-like acoustic veins, a translucent sound ripple held between the ears; old plain sand-coloured body, no jewellery and no flames. B The last hearth: ears as vast warm amber-lit cupped sails, ember light glowing INSIDE their thin worn rims and one slender flame-like wisp in each ear cup as if guarding the oasis's last warmth; soot-darkened ear tips, scarred white muzzle, ordinary black-tipped tail, no crown and no flame crest on back. C The dune memory: wide weathered ears marked with natural sand-strata fur lines, only one turquoise shard pendant on a worn cord at throat, an extraordinarily long low tail trailing a few grains of luminous sand, no flames or sound rings. Distinct silhouettes and magical signatures, old and powerful rather than cute; jewel only C. No generic crystal forest, wings, armored humanoid, floating eyeballs, scenery, moon backdrop or oversized props. Render tangible detailed concept art, NOT game screenshot.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

