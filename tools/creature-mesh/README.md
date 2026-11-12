# tools/creature-mesh

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `make.mjs`

Writes a creature drawn in code as a rigged, animated.glb, for tools/creature-bake/bake.mjs or any 3D tool.

```
node tools/creature-mesh/make.mjs fox-adult out/fox-adult.glb
```

## `page.js`

The creature mesh's page: builds a plan and hands back its.glb, base64.

## `quadruped.js`

A mesh creature's shape as three.js objects, for writing it out as a.glb: a skinned mesh on its skeleton, lit faces in a material named "body" and glowing ones in one named "glow", and its walk as a clip sampled from the shape's motion.
