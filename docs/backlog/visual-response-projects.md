# Visual response projects

**Audit status (2026-11-01): Partly built: default dodge echoes and opt-in refraction exist; other response projects are absent or scoped prototypes.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| 1. Foliage interaction, ground memory and individual footprints | **Partly built** | Magic push/imprint field exists (#1468 (polish follow-up #1484)), but no movement-stamped ground-memory/footfall system found. `render/fx/imprint*` and sprites push are foundations, not this full request. First version unverified. |
| 2. Landing settling/skid, terrain ripples and take-off push | — | No visual height-impulse/ripple system or ordinary touchdown wiring found; attackFeel alone is not terrain response. |
| 3. Heat/spell refraction masks | **Partly built** | Opt-in campfire plume and party-spell pressure wave #1543 (`?refraction=1`, default off); fragment v6587 is a preview label. Foreground/quality guards exist, broad spell/wake/lens integration remains outside this first slice; first live version unverified. |
| 4. Patterned light and soundsystem projections | **Partly built** | Dedicated #1542 source branch has world/spell patterns and measured investigation, but is parked and not merged into this prototype. Existing disco/canopy patterns do not implement all new projectors. No shipped version claimed. |
| 5. Expressive flat-art lighting audit and material pass | — | Existing normal maps are confirmed in sprites.ts; the proposed controlled three-subject audit and selective material-response improvements are not demonstrated by their mere existence. Parked #1542 exploration is not a completed new normal pipeline. |
| 6. Flowing water/spell surface direction field | — | Existing lake coordinate motion and beam direction are foundations; no requested shared flowing-surface slice found. |
| 7. Dodge echoes and fast-spell trails | **Partly built** | #1545, default-on commit25a3b60bf; fragment v6727 (preview build label), release1101a history carries it. Bounded departure/arrival echoes are built; fast-spell pose-echo reuse remains missing. No new performance acceptance. |


Captured with Ed, 2026-10-30. Project proposals, not shipped features or permission to start implementation. Ed supports foliage interaction, heat and spell distortion, grass footprints, patterned lighting, and investigating more effective lighting of flat artwork. Flowing surfaces and dodge echoes are candidates. The implementation details and build order below are suggestions.

These extend [the magic-effects language](magic-effects.md), especially its existing imprint and distortion proposals. Build shared drawing systems that movement, spells, scenery and trips can all use. Do not create a separate effects engine for mushrooms. The implementation gate is Ed choosing a project to build; the existing magic pass still waits for his go after the content passes.

## 1. Foliage interaction and ground memory

**Outcome:** animals push grass and bushes aside; the witch parts the canopy as she flies through it. Vegetation springs back. Movement leaves temporarily flattened grass; individual footfalls can leave footprints.

**Existing foundations:** `src/render/sprites.ts` has wind, sway masks and watching-tree lean; `src/render/view/frameUniforms.ts` supplies their controls. Magic-effects section 3.4 already proposes a world-space imprint field with push and elemental marks.

**Proposed implementation:** extend that field, with shared lifetime/window management and separate channels or textures where needed. Movement stamps direction and strength; recovery decays them. Ground and foliage sample the same disturbance. Weight, speed, footprint width and height band distinguish a small animal in grass from the witch in the canopy. Ground movement should not automatically move crowns overhead. The field is drawing-only.

**First slice:** one grassy clearing, the witch, and one heavy animal. Demonstrate parting, a continuous flattened trail and recovery. Add discrete footprints only when footfall timing and positions are available; a continuous trail is not a footprint system.

**Review:** compare slow movement, charging, overlapping paths and standing still. Check that the moving field does not swim, wrap old marks into view or leave seams. Measure dense foliage with the effect off/on. Reuse the magic pass's budget and quality fallback.

**Trip controls:** strength, reach, recovery time, direction source. Pack steering can drive the field; recovery can nearly stop, recording the night's traffic.

## 2. Landing response and ground ripples

**Outcome:** the witch touches down, squashes, skids a little, rebounds and settles. A ripple carries the impact into the landscape. Ground-pound and heavy animal landings produce stronger responses. Take-off gives a brief downward push before she leaves.

**Existing foundations:** `src/render/height.ts` shares ground height between drawing paths; `src/render/ground.ts` samples it for geometry and shading. `src/render/attackFeel.ts` supplies creature squash/stretch. Combat emits positioned `quake` and `slammed` events; ordinary witch take-off/touchdown needs a movement-transition connection. Do not mistake the combat `landed` projectile event for every creature's touchdown.

**Proposed implementation:** a bounded pool of impact centres, times and strengths adds expanding, damped radial ridges/troughs to visual height. Keep the base height texture; do not rebuild terrain every frame. Mirror displacement in CPU placement where necessary, including feet, effects and shadows. Keep the camera response restrained. The four-metre ground mesh supports broad waves; narrow ripples may need denser nearby geometry. Sprite feet sample several heights and currently use the lowest: test that this does not swallow the ripple beneath wide sprites.

**First slice:** ordinary landing, ground-pound and one heavy animal's landing. Use a visual settling skid first; changing her actual gameplay momentum is a separate decision. Tune take-off separately from touchdown.

**Review:** verify plants and feet remain attached, multiple impacts overlap cleanly, take-off is not triggered twice, and house/deck landings do not incorrectly ripple the distant ground. Test ground and treetop views, slowed time, and dense combat; compare cost and camera stability.

**Trip controls:** amplitude, wavelength, propagation speed and damping. Long-lived overlapping impacts turn the forest into a rolling sea.

## 3. Heat and magical refraction

**Outcome:** heat rises above fires; spells bend the air; impacts send pressure rings; charged magic forms a local lens.

**Existing foundations:** distortion is already layer 9 of the magic-effects proposal. `src/render/post.ts` renders through scene textures. Extend that planned layer rather than adding an independent full-screen filter for each spell.

**Proposed implementation:** shared plume, ring, wake and lens masks produce bounded sampling offsets. Position them from world events; use depth/masks where necessary to keep a foreground character from being distorted by a fire behind it. Clamp screen-edge sampling. Distortion reveals only what is available in the rendered image, not hidden scenery.

**First slice:** one campfire and one spell, comparing continuous heat with a brief pressure wave.

**Review:** check foreground overlap, screen edges, camera movement, pixel-art character and crowded effects. Measure the added pass/texture bandwidth; expose an off setting through the existing quality ladder.

**Trip controls:** displacement, spatial scale and persistence. Creatures drag the image behind them; mushrooms become lenses.

## 4. Patterned light and soundsystem projections

**Outcome:** simple lights gain texture and irregular motion. Spells project moving rings or patterns. Soundsystems cast spectacular rotating spokes, sweeping bands and overlapping colours across the forest.

**Existing foundations:** `src/render/lighting.ts`, `src/render/view/lights.ts`, `src/render/ground.ts` canopy patterns, `src/render/lasers.ts`, and the musical clock in `src/rules/beat.ts`. Share pattern functions and timing with magic-effects layer 4; soundsystem staging remains a distinct presentation project.

**Proposed implementation:** modulate selected lights with world-space or light-local patterns. Match the pattern across ground, trunks and creatures. Keep texture modulation separate from shadowing: a pattern is not an occlusion solution. Use a small number of rich projectors rather than many new lights. Start with beat/tempo and existing music signals; inspect available spectrum feeds before adding analysis. Per-instrument envelopes require a deliberate source connection.

**First slice:** one soundsystem with three looks (rotating spokes, sweeping stripes, layered colour bands), plus one gently flickering light and one patterned spell.

**Review:** compare ground/treetop views and moving receivers, check light-budget transitions, overlapping systems, and existing comfort settings. Measure shader cost as well as light count. No claim that a numerical flicker threshold alone makes effects safe.

**Trip controls:** pattern scale, speed, contrast and signal routing. A forest of underwater light, or an attack wind-up tightening stripes across the clearing.

## 5. More expressive lighting of flat artwork

**Outcome:** light brings out the roundness of mushrooms, bark grooves, wet leaves and creature faces without changing their silhouettes.

**Correction to the conversation:** normal mapping already exists. `src/render/sprites.ts` reads `normalAt`, transforms the normal to world space, then calls the lighting functions in `src/render/lighting.ts`. Do not build a second normal-map pipeline. Audit current art maps, wrapped lighting, ambient contribution and material response first.

**First slice:** a mushroom, trunk and animal under the same moving light, with current rendering beside proposed tuning. Try selective normal strength and, if justified, a restrained material shine response. Audit how maps are generated and stored before proposing new assets or channels.

**Review:** show that the improvement survives the normal night scene, not only a dramatic isolated light. Check palette and pixel style, face readability, atlas memory, shader time and dense overlapping sprites. Cheap geometry does not guarantee cheap fragment shading. Stop if the current system already gives the desired result when lit well.

**Trip controls:** exaggerated surface relief, wax/metal/wet appearance, or inverted perceived relief. These are candidates, not promises that all materials already support them.

## 6. Flowing water and spell surfaces

**Outcome:** water patterns follow currents; energy travels along beams or spirals inside shields while their outer shape stays anchored.

**Existing foundations:** coordinate warping in `src/render/ground.ts`, lake looks in `src/render/lakeLooks.ts`, and attack forms in `src/render/leash/attackLook.ts`. Inspect existing lake motion before adding a flow system.

**Proposed implementation:** animate texture coordinates using a direction field or a form's existing path. Keep silhouettes and atlas boundaries protected. A beam already knows its direction; start there rather than building a world flow map for one effect.

**First slice:** one charging or travelling spell. Build water-specific flow only when a water-art task needs it. Ed suggested water/spells as possible applications, not a requirement to animate all surfaces.

**Review:** verify direction reads from different headings, loops do not visibly reset, and sampling stays inside the intended atlas region.

**Trip controls:** bark flows up trees, markings move independently of bodies, habitat colours migrate while inhabitants stay put.

## 7. Dodge echoes and spell trails

**Outcome:** a dodge leaves a short sequence of fading poses at the places she passed. Fast spells leave brief echoes with similar timing and colour treatment.

**Existing foundations:** `src/render/spellfx.ts` already supplies blink/speed effects and pooled motes; `src/render/trail.ts` and `src/render/swoopTrails.ts` supply ribbons. Extend the existing presentation rather than stacking indistinguishable trails.

**Proposed implementation:** a bounded history of rendered poses and world positions. Do not use full-screen feedback for the default dodge: it remembers camera movement and smears scenery too. Combat's short position history does not contain full animation poses; pose capture is additional work.

**First slice:** one dodge with sparse, fading silhouettes. Ed suggested dodge as a candidate, not an approved movement redesign.

**Review:** test turns, rapid repeated dodges, camera movement, costume changes and reset between islands. Decide whether the echo should replace or accompany existing motes after seeing both. Keep simulation and hitboxes unchanged.

**Trip controls:** echo count, delay and lifetime. Full-screen recursive image feedback is a separate trip candidate and separate cost.

## Suggested build order and shared acceptance

Start with project 2 for immediate feel, then 1 for broad environmental response, 4 for party spectacle, and 3 for heat and spells. Project 5 is a small investigation that can be scheduled independently. Project 7 fits a dodge-polish task; project 6 starts when a particular spell or water treatment needs it. This order is a recommendation, not a schedule or a replacement for Ed's magic-pass gate.

Every slice needs an on/off comparison in the actual game, a repeatable crowded scene, frame-time and memory measurements, and the relevant repository checks when implementation starts. Record which clocks drive effects and what happens on pause, slowed time, island change and quality changes. Share event identity and consume each event once; avoid duplicating one impact through both spell and combat notifications.

Trip exaggeration may deliberately destroy ordinary readability. Existing player comfort controls still apply. Expose strength, reach, persistence and recovery independently: a small long-lived effect and a large brief one are different tools.

## Technique references

- [NVIDIA GPU Gems: procedural vegetation animation](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-16-vegetation-procedural-animation-and-shading-crysis): local/global wind and GPU bending.
- [Godot: screen-reading shaders](https://docs.godotengine.org/en/stable/tutorials/shaders/screen-reading_shaders.html): refraction through sampling the rendered image.
- [Godot: normal and specular maps for 2D lighting](https://docs.godotengine.org/en/4.5/tutorials/2d/2d_lights_and_shadows.html): technique reference, not a claim that Witch lacks normal maps.
- [Three.js afterimage example](https://threejs.org/examples/webgl_postprocessing_afterimage.html): retained-image feedback, distinct from world-position pose echoes.
