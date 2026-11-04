# Creatures

**Audit status (2026-11-01): Partly built: graph, families and gait prototypes exist; one production generator has not replaced all builders.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Spine chain and sockets | **Partly built** | `art/body-graph/graph.js`, graph fixtures and src/bodyGraph.test.ts; git 3faca0613. Experimental graph exists, but its header explicitly excludes production imports. #1470 carries graph foundations; first version unverified. |
| Part families | **Partly built** | `art/body-graph/families.js`, `quadruped.js`; #1470. Shared quadruped anatomy is present, not every one-off body plan. Version unverified. |
| Presets per body plan | **Partly built** | `art/roster/presets.js` and creature selection support staged records; #1470. Production still has quad3d and one-off builders; complete migration absent. Version unverified. |
| Smooth skin and tapered limbs | **Partly built** | Graph compile/blend and quadruped profile helpers exist; #1470. Whole-roster smooth-skin replacement and visual migration remain. Version unverified. |
| Gait clock plus IK | **Partly built** | `art/body-graph/gait.js`, git 81ff363c6: isolated clock and 3D solver. Not the universal production animation path. #1470 foundation; version unverified. |


Notes (Ed, 2026-10-13). **Mixed implementation status; see the audit below. No unbuilt work is authorised by this page.**

## One body-graph generator

Today: one generic quadruped builder (`quad3d`, 37 species) and 19 one-off builders (owl, raven, heron, penguin, bat, moth, dragonfly, beetle, woodlouse, spider, scorpion, crab, snake, rattlesnake, toad, snail, hedgehog, mole, armadillo).

Idea: replace them with one generator in our own code:

- a **spine chain with sockets** for heads, legs, wings, tails and shells;
- **part families** (e.g. plantigrade, digitigrade and hoofed legs);
- **presets per body plan**;
- a **smooth skin** blending the parts, baked to sprites;
- legs driven by a **gait clock plus IK**.

Hydras, griffins and many-limbed elders would then be edits to the graph, not new builders.

Research (2026-10-13): nothing off the shelf fits. The research animal models (SMAL and successors) are non-commercial only, and Creature Creator is GPL and written for Unity. Spore's published design is the best blueprint. Usable sources:

- CC0: Quaternius animals, Smithsonian scans, PanTHERIA traits;
- Blender Rigify limb ratios;
- Hildebrand gait timings;
- Inigo Quilez's SDF blends;
- MIT/Apache JS IK libraries.

Suggested first step: smooth blending and tapered limb segments in `quad3d`.
