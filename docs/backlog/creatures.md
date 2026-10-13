# Creatures

Notes (Ed, 2026-10-13). **Nothing here is started; don't start without Ed's go.**

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
