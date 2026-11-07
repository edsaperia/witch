# Grey wolf: skeleton target

**Provisional checkpoint, 7 November 2026 — not READY.** Target: Canis lupus. [Lane summary](l1-summary.md). No game or graph changes. Real photographs override generated anatomy.

## Reference evidence

![Generated grey wolf adult and mobile-young targets](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/wolf/target-v1.png)

[Full generated sheet](https://github.com/edsaperia/witch/blob/claude/ed-shots/previews/art-pass/wolf/target-v1.png). Top row adult, bottom row mobile young (game level0); columns standing towards, walking towards, standing away, walking away. All animals whole in frame. 'Age0' is a game level, not a zoological age in days. All eight lane species use the shared quadruped levels0–3; null genome overrides inherit the template, they do not remove babies.

Camera source: [model3d.js](../../art/model3d.js), `PITCH=.52` radians (29.8° downward), `YAW.towards=.6`, `away=-.6` (±34.4°); [creatures3d.js](../../art/creatures3d.js) uses the renderer defaults unless a tool view is supplied. Prompt requests these angles with a telephoto/near-orthographic view. **Generated camera/framing is approximate, not numerically calibrated to the game's orthographic projection.** No real-game-size acceptance or new game capture is claimed.

**Output review:** Eight cells present. Generated pup looks older than an early mobile pup and its ears are more erect than the game's documented floppy-ear baby idea. Use real pup anatomy before choosing the final age0 silhouette; this sheet does not decide that artistic exaggeration.

**Real-photo cross-check:** [Commons comparison photo](https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg). Whole-body real-photo page located (Tracy Brooks, USFWS); download returned HTTP429, so visual body/pose comparison is pending. No wolf-pup photo has been verified. Do not treat the page's title as a completed anatomy check. Comparison photos are not committed or republished. The whole-lane age0/photo validation remains incomplete.

## Identifying checklist

1. Long robust digitigrade legs with substantial paws.
2. Deep chest, narrow waist and powerful shoulder/neck ruff.
3. Broad wedge head with a long substantial muzzle.
4. Moderate triangular ears, smaller relative to the head than a fox's.
5. Back close to level, with shoulders carrying the visual weight.
6. Bushy tail hangs low and roughly straight; no curled husky tail.
7. Pup has a shorter muzzle, rounder skull and large paws; not an adult shrunk uniformly.

## Body plan for the graph

These are **provisional artist blockout ranges**, not biological measurements, not values measured from the generated image, and not replacements for Ed's game size model. L = nose tip to tail root in a neutral standing animal, excluding fur and tail. Head = occiput to nose; neck = occiput-to-withers visible span; leg entry = ground-to-withers height, not summed bone lengths. Perspective/coat/posture alter the visible ratios. Check against matched side photographs before locking them into the graph.

| Adult quantity | Ratio to L |
|---|---|
| Ground-to-withers | 0.50–0.65 |
| Head length | 0.24–0.30 |
| Visible neck span | 0.12–0.20 |
| Tail root to tip | 0.35–0.50 |

Mass profile: Deep chest under the shoulders, long limbs, lean abdomen and lighter rump. Ruff adds breadth at neck/withers but must not turn the chest into a bear hump.

Young target: use the checklist's age difference as a starting point; increase relative head/paw size, shorten muzzle/trunk and retain species-specific ear/tail character. **No numeric juvenile ratio is asserted without a real juvenile photo.** Do not obtain the baby only by uniform adult scaling. Levels1–3's design-specific ornaments are outside this anatomy sheet; retain the existing genome's intent for a later graph review.

## Shared graph handoff

Audit pinned to prototype `524b0acaa`, not the unmerged live1866 candidate. Sources: [graph contract](../../art/body-graph/graph.js), [quadruped adapter](../../art/body-graph/quadruped.js), [gait](../../art/body-graph/gait.js), [family adapter](../../art/body-graph/families.js), [tail markings](../../art/body-graph/tail-markings.js). Generic graph sockets already support head, leg, wing, shell and tail; torso stations support varying bulk. Ordinary four legs/ears/tails must not all be listed as wholly absent just because a species adapter has not been made.

**Missing graph features / implementation distinction:** Digitigrade family, torso profile and pointed ears exist. Missing from diagnostic graph gait: separate hock/ankle articulation and head/neck local transforms. Shared graph must retain a proper shoulder-ribcage-waist profile under ruff. This is a target handoff to1866; no parallel wolf candidate or tuning here.

Ranked target priorities (for1866 owner; no hand-written-art fixes here):

1. Deep chest and long articulated limbs.
2. Broad muzzle with restrained ears.
3. Low straight bushy tail.

## Generation provenance

Built-in `image_gen.imagegen`, new generation, 7 November 2026; no API/CLI fallback and no Commons photo supplied to the generator. One eight-cell PNG, unedited. Exact authored prompt below. Output model/version/seed were not exposed by the tool; do not infer them. File SHA256 and source filename are in [L1 evidence manifest](l1-evidence.json).

<details><summary>Exact generation prompt</summary>

Use case: photorealistic-natural. Asset: grey wolf (Canis lupus) skeleton anatomy target sheet for a game, NOT existing game art. Make one crisp 4-column by 2-row contact sheet on plain light grey background, no scenery. Eight separate whole animals, generous margins, no clipping. Top row adult grey wolf; bottom row an independently walking, eyes-open wolf pup (age0 target, not newborn). Columns: standing towards; walking towards; standing away; walking away. Camera for every panel is elevated looking DOWN 30 degrees, telephoto/near-orthographic, body broadside diagonal with 35-degree yaw toward or away from viewer; do not use eye-level or straight head-on portraits. Towards means muzzle visible; away means rump and back of head visible. No looking back in away panels. Natural grey wolf anatomy: powerful deep narrow chest, long robust digitigrade legs and large paws, substantial wedge skull and long broad muzzle, moderate triangular ears much SMALLER in proportion than fox ears, thick neck ruff, almost level back with tucked flank, straight bushy tail hangs LOW never curled, grey-brown guard coat pale cheeks and throat. Not a husky, no blue eyes, no black white dog mask, no white fox tail tip. Kit relatively larger head, shorter muzzle, softer rounded body and shorter less full tail; do not miniaturize adult. Walking is one quiet terrestrial step, four anatomically correct limbs, no galloping. Natural fur and neutral soft light, documentary photographic realism. Small labels only: adult / pup; standing towards / walking towards / standing away / walking away. No costume, extra tails, jewelry, fantasy, illustration, cartoon, scale ruler or claims of measurement. Consistent adult anatomy across top row, consistent pup across bottom.

</details>

## Legend concepts v2 — colossal fantasy and scale

**Current second-pass proposal C — The howl that holds the night. Signature element: Starfield pack carried by the howl.** This follows the FULL [fantasy feedback6708227119](https://github.com/edsaperia/witch/issues/1476#issuecomment-6708227119) and later [scale addition6708229124](https://github.com/edsaperia/witch/issues/1476#issuecomment-6708229124). These explicitly allow world-grown trees/rock/moss, scale props and ground-level hero views; they supersede the v1 plain-background constraint. [Current lane review sheet](l1-legends-v2.md). Earlier plates/picks remain below as history, not current approval.

![wolf revised A B C maximum fantasy and D game-camera study with witch and trees](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/wolf/legend-scale-v2.png)

- A: Voice of winters — massive weathered wolf with monumental sound waves and a worn throat torc.
- B: Ancestors of the pack — spectral pack memories flow along a mountainlike coat.
- C: Howl that holds the night — MAXIMUM FANTASY: the ancient wolf's voice releases a starfield pack above a ruff bearing old pack totems; D views C from above.

**Why propose C for Ed:** C binds ancient power to the wolf's voice and pack, rather than generic wings or a random constellation crown. Pack totems and weathered shoulder layers suggest generations of reverence, while the howl carries their memory into the night. Head, legs, chest, ears and low tail remain wolf; the celestial wolves are an emitted image, not physical extra heads. Ed judges the choice; no implementation or activation.

Current chosen checklist:

1. Deep chest, long digitigrade legs, heavy muzzle and moderate pointed ears remain wolf.
2. Four planted paws and one low brush tail, distinct from spectral pack imagery.
3. Starfield originates in the open muzzle, not an unattached halo.
4. Shoulder strata/totems show age/reverence without hiding the back profile.
5. Witch and fir/pine groups below shoulder height appear in each panel.
6. D preserves the C whole wolf and emitted pack at elevated game-camera study.

**Body-plan/scale target:** Colossal torso/ruff carries cliff-like layered mass, but retain narrow flank and a real neck rather than a bear barrel. Voice volume extends beyond body and must remain an independent effect envelope. Intended20baby-height/above-canopy direction is not a measured output or gameplay change. [DESIGN, Art and scale](../../DESIGN.md) says: “Legendary creatures are about 20 times a baby's height, taller than the treetops.” ART-GUIDE sections 0b/0c supply the evolution and elder brief. A witch is a comparative standing figure, not a calibrated replacement for the baby ruler. No change to current tuning or actual source sizing is proposed.

**Graph needs:** Posed jaw/muzzle-local effect attachment, bounded sound/starfield geometry and pack-afterimage instances; shoulder-local carving/totem sockets and scale-aware LOD. Do not turn ghost wolves into limbs/heads of the main anatomy. Existing head/leg/torso functions need hierarchy/effect semantics, not a new species hand-builder.

**Actual output review:** Framing edit restores rear body/tail and keeps all main silhouettes in frame. Spectral wolves and fine totems are dense and untested at native size. Game-camera panel is generated rather than a render from one shared3D asset. Whole silhouettes, witch figures and smaller forest groups were visually checked in the published final image. D is an actual generated elevated study, not a current game capture or a render from identical3D geometry; angle/scale equality across panels is not proven. Current-source legend comparison remains pending root/cloud pixels, independently of these completed new options.

### v2 provenance

Built-in imagegen,7 November2026. One new4panel image plus one targeted imagegen edit for framing/scale cues, with exact prompts and source filenames in [v2 manifest](l1-legend-v2-evidence.json). No real photograph, prior game sprite or other lane image was supplied. No CLI fallback, model/seed not exposed. The v1 and anatomy manifests are preserved unchanged.

<details><summary>Exact v2 generation and edit prompts</summary>

Four-panel 2x2 epic fantasy design sheet for legendary GREY WOLF. Labels A, B, C MAXIMUM FANTASY, D C GAME CAMERA. ONE WHOLE colossal primary wolf per panel, animal fills only65% of panel so ENTIRE ears, paws, tail and all magic fit with broad margins. EVERY panel has ONE small pointy-hat WITCH with broom standing next to a forepaw, clearly visible about1/12 wolf height, AND a cluster of nearby full forest FIR/PINE trees with crowns BELOW its shoulders. Wolf towers above forest canopy, intended about20baby heights. No huge foreground trees. A/B/C low heroic viewpoint; D repeats same selected C from elevated30degree-down nearorthographic game view, yaw35degrees towards, with same witch and smaller trees. Keep recognisable long-legged digitigrade WOLF, deep chest, heavy muzzle, moderate pointed ears, low long brush tail, NOT bear/dog/humanoid. Snowy taiga: light snow pine needles, juniper and ancient firs/larches. Epoch weathering: grey scarred muzzle, chipped ear, shoulder fur looks like eroded mountain strata, cracks lit with old blue light, sparse tiny firs rooted in ancient accumulated earth along far shoulders only. A Voice of winters: giant wolf with engraved old iron throat torc, slow monumental howl with three broad sound waves rippling across fog, worn paw shrines. B Ancestors of the pack: living wolf body with fur edges dissolving into many smaller spectral wolf memories moving beside flanks; low brush turns into pale path of remembered tracks, ancient healed battle scars. C MAXIMUM FANTASY The howl that holds the night: an immense weathered wolf whose huge shoulder ruff forms a cliff-like observatory of old pack totems and small pilgrim carvings; its raised open muzzle releases an IMPOSSIBLE RIVER OF STARFIELD SOUND, curling into a clearly wolf-shaped constellation pack above its back, strong celestial glow confined to howl path. Main beast remains whole living grey wolf, black paws planted, immense chest and narrow flank; no wings, no random eye halo. D same C whole wolf + star-howl and tiny witch/trees at game camera, not merely another low portrait. No cropping, no UI, labels only. Bold fantastical concept, not game pixels.

Edit prompt (applied to the new generated image above):

Edit this four-panel WOLF sheet ONLY to correct framing. Keep A/B/C/D concepts, tiny witch and fir-tree scale cues, old-wolf body, scars, voice effects/ghost pack/totems, labels and D elevated game-camera view. Pull ALL four views back so the ENTIRE living primary wolf from tail tip and rear paws to muzzle and ears is inside each own panel with clear8%margin. In C especially uncrop the left rear body, left tail and rear foot; in B keep ear tips below top border. Keep all sound/constellation effects within panel too. Do not remove witch or trees: witch still beside front foot in EVERY panel, trees below shoulders, beast still towers above canopy. D preserves same C beast from30degree-down game camera, no redesign. No new motifs, no extra physical limbs. Whole creature framing is mandatory.

</details>

## Legend concepts — 7 November addition

**Preserved v1 iteration; current second-pass proposal is above.**

**Three actual generated options; provisional owner pick A, not Ed's approval.** [Legend lane table and review contact sheet](l1-legends.md). [Original instruction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707981581) and [later fit-and-variety correction](https://github.com/edsaperia/witch/issues/1476#issuecomment-6707992824): crystals, flames and spirit wings are allowed when fitting; none is a uniform. This later ruling supersedes the blanket wording in ART-GUIDE0c. The historical legend audit is a source of questions/ideas, not today's resolved sprite.

![wolf three generated legend options A B C](https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/art-pass/wolf/legend-concepts-v1.png)

**Today's legend comparison:** source-matched current image pending root/cloud response to [QUESTION6708031078](https://github.com/edsaperia/witch/pull/1898#issuecomment-6708031078). No current sprite was fabricated by imagegen; no historical sheet is relabelled today. The triptych is the completed three-concept portion of the requested comparison sheet. Current fourth panel and final beside-today layout remain incomplete.

**Source-only current design note (not a visual review):** Base level3 already has stronger shoulders, spiky mane/ruff, grizzle/frost/scars and a howl feature; the old legacy legend list mentions wings but levels[3] overrides that list. Compare resolved default source, not the stale list. Read [species genome](../../art/creatures/wolf/genome.js) together with [roster defaults](../../art/roster/presets.js). No game or graph changes.

### Area and three alternatives

[Snowy taiga area text](../../art/areas.js): Pine needles under light snow, juniper scrub, firs/pines/larches/rowans/aspens at the boreal edge. These ingredients inform the design but do not add scenery to the reference backdrop; a historical set-piece mention is story inspiration, not a claim it still spawns by default.

- A Voice of winters: an ancient planted wolf with pale sound rings emerging from its howl and a frosted muzzle.
- B Memory of the pack: ghost-wolf afterimages flank the elder; strong pack story but more scene/effect complexity.
- C Iron trail keeper: a battered shoulder guard and worn notches; readable, but equipment becomes the main signature.

### Provisional pick: A — Voice of winters

**Signature element: A howl made visible.** A comes from the wolf's voice and its connection to a pack across the cold taiga. The battered muzzle and grey ruff suggest epochs; the visible howl gives power without turning the wolf into a winged generic beast. It follows the old audit's useful animal-specific howl idea while treating Ed's later motif correction as the authority.

The owner recommendation is for Ed to judge. It is not an activation decision, a production candidate or proof that this beats the shipped legend at native size.

Chosen legend checklist:

1. Long-legged digitigrade wolf, deep chest, heavy muzzle and moderate ears remain the foundation.
2. Four paws planted; the howl lifts the muzzle rather than standing the wolf upright.
3. Low brush tail and lean abdomen prevent husky/bear drift.
4. Sound originates at the jaws and recedes in thin waves; no ring of eyes or generic head halo.
5. Grey muzzle, ear wear and healed scars show age without excess accessories.
6. Ruff supports the shoulder mass without hiding the wolf neck entirely.

Body-plan target: Use the adult deep-chested, long-legged wolf blockout. Enlarge shoulder/neck fur, not the underlying head to a bear shape; a controlled neck/head lift supplies the howl pose. Rings are separate effect geometry, not body mass.

Missing graph features / existing capabilities to reuse: Head/neck pose hierarchy with jaw/muzzle effect attachment and independently fading sound-wave instances; worn-ear/scar material masks. Existing gait/torso and grizzle features should be reused. Particle/sound rings are a concept request, not an implemented gameplay or audio mechanic.

**Output review:** A's waves approach the frame boundary and their count is not a hard target. Camera and fur scale remain approximate. B's ghost anatomy is an effect concept, not extra physical limbs on the main wolf. All three are concept illustrations at requested approximate camera, not the game's material/pixel render; no exact camera-angle or native-size acceptance is claimed. Anatomy/Commons429 limits above remain unchanged.

### Legend generation provenance

Built-in `image_gen.imagegen`, 7 November2026; three options in one new triptych. No CLI/API fallback, no current game sprite or Commons photo supplied to generation. Published triptych is the original unedited output. Exact prompts below; file SHA256/source name/size in [legend manifest](l1-legend-evidence.json). Model identifier/seed not exposed.

<details><summary>Exact legend prompt</summary>

Use case: stylized-concept. One landscape three-column concept triptych A B C, THREE DISTINCT legendary GREY WOLVES, one whole primary wolf per column. Plain uniform warm grey studio background, no environment, no forest or sky. Elevated camera clearly LOOKING DOWN30degrees so broad back surfaces and four paws are visible, near orthographic, body broadside turned35degrees towards viewer. Whole ears feet and tails and magic fit each column with margins. Area-story inspiration: snowy taiga, pine needles under light snow, juniper, fir/pine/larch/rowan/aspen. Natural wolf silhouette: long robust digitigrade legs, deep chest, lean waist, heavy neck and muzzle, moderate ears, low bushy tail. Ancient powerful wise, not snarling monster dog, no husky curled tail. Grey muzzle, worn ear, healed scars, dense weathered coat. A Voice of winters: wolf planted firmly, muzzle raised slightly in a howl, THREE thin pale concentric sound rings emerging from its open jaws and climbing above it; frosted muzzle, immense but natural shoulder ruff, no jewelry or flames. B Memory of the pack: old broad-chested wolf with two small translucent wolf afterimages immediately along its flanks, suggesting many generations remembered, four real paws distinct from ghosts; no sound rings, no wings. C The iron trail keeper: quiet wolf head carried low, scarred shoulder, one worn hammered-iron shoulder guard strapped behind foreleg with a few simple carved trail notches, one missing ear tip, long grizzled chest fur; no glow rings, no ghosts, no full armor suit. Each distinctive, animal nature first; age/wisdom/power not a common crystal/flame crown. No additional captions beyond A B C, no game UI, not game screenshot.

</details>

## Remaining / wake condition

Complete adult and mobile-young Commons visual checks, resolve the output cautions, then have the coordinator/1866 owner assess the target. Wake when the comparison photos are accessible without HTTP429, or root supplies cloud photo-review evidence. No graph implementation or switch-on until that review; old sprite critique omitted under the later skeleton-first ruling.

