# Arctic fox: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Vulpes lagopus. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated arctic fox adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/arcticfox/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/arcticfox/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Requested eight cells are present. The adult winter coat is plausible as a target but the available photo is a different coat. Generated ears are very rounded and could read bear-like if copied too literally. Keep the fox's muzzle and brush.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Arctic_Fox_at_Svalbard.jpg). Visually compared locally, 7 November: rounded ears, short muzzle and dense coat read clearly in this seated grey-brown animal. The page does not establish this individual's age; it cannot validate the kit claim, winter-white coat or standing leg ratios. Those checks remain open. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Compact rounded body with a short visible neck.
2. Short broad muzzle, not a long white red-fox face.
3. Small rounded-triangular ears close to the head.
4. Short digitigrade limbs and dense fur around the paws.
5. Dense rounded winter coat with little sharp waist visible.
6. Full brush carried low; do not curl it like a spitz tail.
7. Grey-brown mobile kit is a useful age0 target; white adult is a winter-coat target, not the only natural colour.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.32–0.42 |
| Head length | 0.23–0.28 |
| Visible neck span | 0.08–0.12 |
| Tail root to tip | 0.50–0.65 |

Mass profile: Soft volume concentrated around shoulder/neck and hips, with the actual ribcage-to-waist transition under the coat. Avoid making a spherical bear with a fox tail.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Torso station profiles, short legs and an ordinary tail already exist. Missing in the generic contract: rounded cupped ear attachments parented to the head, age/coat volume independent of bone length, and an explicit hock chain. The base adapter's ear controls reduce the gap; ears themselves are not wholly absent.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Short muzzle and small rounded ears.
2. Compact short-limbed body.
3. Dense coat and low brush.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: arctic fox (Vulpes lagopus) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult winter-white arctic fox; bottom row an independently walking, eyes-open arctic fox kit (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural arctic fox anatomy: compact rounded winter body, short broad muzzle, SMALL rounded-triangular ears nestled in fur, short digitigrade legs with furred paws, dense white winter coat and large full brush carried low. NOT a white red fox: smaller ears and shorter extremities. Young kit grey-brown coat, not white. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / kit; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent kit across bottom.

</details>

## Legend concepts — 7 November addition

**Three actual generated options; provisional owner pick A, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![arcticfox three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/arcticfox/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base level3 uses a vast low plume, deep white ruff, frost/grizzle and stone beads. The default roster patch shortens/rounds ears. The old audit's generic crystals label must not be substituted for current resolved source. Read [species genome](../../art/creatures/arcticfox/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Snowfield area text](../../art/areas/snowfield/recipe.js): Deep snow with grass and needles, drifts and frozen stones, snowy tussocks, snow-laden junipers/firs and dwarf birch; old stones half buried in a drift. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Shelter of winters: a vast single crescent brush layered like wind-carved snow, blue light sheltered inside.
- B Ice-listener: worn short ears carrying small frost crystals and a cloudy old eye; allowed by the correction but less distinctive than the shelter silhouette.
- C Keeper of buried stones: shaggy elder with a stone throat bead and glowing footprints; clear but relies more on an offering.

### Provisional pick: A — Shelter of winters

**Signature element: One drift-layered shelter brush.** A exaggerates the Arctic fox's insulating brush into shelter rather than borrowing the red fox's extra tails. Wind-layered fur carries the snowfield story, scars and grey muzzle carry age, and the protected inner light suggests ancient winter power. It is visibly a compact white fox rather than a polar-bear-shaped animal with a crown.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Compact fox body, short broad muzzle and very small rounded ears remain visible.
2. One dense tail sweeps into a protective crescent; no extra tail roots.
3. Layered fur suggests wind-shaped drift strata without adding trees or stone scenery.
4. Old grey muzzle, worn ear and healed facial scar read as a survivor of winters.
5. Cold light stays inside the shelter brush, not a common outer halo.
6. Paws and the body-tail connection remain legible beneath the fur.

Body-plan target: Retain compact adult body and short limbs; concept brush length about0.9–1.2L with a very large controllable coat envelope. Do not thicken the underlying torso to make the tail work. This is magical exaggeration, not winter-fox zoology.

Missing graph features / existing capabilities to reuse: Independent tail curl/volume envelope and layered coat flow, with a local inner emissive zone; head-local worn-ear/scar masks. Tapered tail chains and torso station profiles exist; do not replace them with a one-off species builder.

**Output review:** Initial generation added scenery and clipped the tail; a built-in edit removed scenery and reframed whole animals. Selected final version is plain-background and whole, but not calibrated to exact game camera or pixel scale. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. One subsequent built-in edit removed scenery and reframed the generated triptych; only that corrected version is published. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompts</summary>

Use case: stylized-concept. Three DISTINCT ancient legendary ARCTIC FOX concepts A/B/C, one whole creature per column in one landscape triptych on plain pale warm grey background. Labels A B C only. Camera elevated looking DOWN30degrees, near orthographic, body broadside muzzle turned35degrees toward viewer, entire feet ears tails visible with margins. Real compact arctic fox anatomy, tiny rounded ears, short broad muzzle, short furred legs, dense white fur, not polar bear or white red fox. Area: a vast quiet snowfield, deep snow and frozen old stones, lone snow-laden firs, dwarf birch. Age from weathered coat, scarred muzzle, worn ear, slow powerful stillness; each concept remains fox. A Shelter of winters: one ENORMOUS broad dense white brush bends into a low protective crescent around the standing fox, wind-carved layered fur like drift strata, old grey muzzle, soft internal blue light at tail roots, no jewelry, no crown, no extra limbs/tails. B Ice-listener: low sturdy old fox with short ears rimmed by a few translucent frost crystals shaped by wind, narrow scars and one cloudy eye, ordinary full brush, weathering and cold patience, crystals confined to ears not a crown or back forest. C Keeper of buried stones: compact fox with long shaggy neck ruff and a single worn stone throat bead, silver-grey pawprints glow softly under FOUR planted feet, tail long straight and low, no crystals. Rich tangible fur and restraint, clear mass silhouettes. No full landscape, no trees on back, no generic wings, no armor suit, no neon fog. Concept art NOT screenshot and NOT zoological evidence.

Edit prompt used on the initial generated sheet (not a real photograph):

Edit this arctic-fox three-concept sheet. Preserve the three distinct A B C creatures and their identifying concepts, realistic fur, grey muzzle/scars, giant single crescent brush in A, ear frost in B, stone throat bead and small glowing footprints in C. CHANGE ONLY presentation: remove ALL scenery, snow ground texture, trees, plants, rocks, landscape, horizon and surrounding props. Put each whole animal on a flat uniform light warm-grey studio background with only a subtle contact shadow. Three clean separated columns labeled A B C. Pull framing BACK so EVERY whole creature including A's ENTIRE giant tail and ALL paws is inside its own column with at least8% margin. Keep elevated game-camera-looking-down view. No tail clipping, no foliage/rocks, no newly added body features. No environment is allowed.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

