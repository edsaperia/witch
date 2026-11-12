# tools/creature-mesh

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `frames.mjs`

A digest of every frame a mesh kind is drawn as, to prove a change left the pictures alone.

```
node tools/creature-mesh/frames.mjs --out before.json [kind...]        every kind with a mesh, or those named
node tools/creature-mesh/frames.mjs --compare before.json [kind...]    fails, naming each picture that differs
```

## `index.mjs`

Writes art/mesh/species/index.js, the list of every kind drawn as a mesh, from the folder: one import a file in art/mesh/species/, sorted by id.

```
node tools/creature-mesh/index.mjs           writes it
node tools/creature-mesh/index.mjs --check   fails if it is stale (src/render/meshCreatures.test.ts checks the same)
```

## `make.mjs`

Writes a creature drawn in code as a rigged, animated.glb, for tools/creature-bake/bake.mjs or any 3D tool.

```
node tools/creature-mesh/make.mjs fox-adult out/fox-adult.glb
```

## `page.js`

The creature mesh's page: builds a plan and hands back its.glb, base64.

## `quadruped.js`

A mesh creature's shape as three.js objects, for writing it out as a.glb: a skinned mesh on its skeleton, lit faces in a material named "body" and glowing ones in one named "glow", and its walk as a clip sampled from the shape's motion.

## `sheet.mjs`

One picture of a batch of mesh creatures, to judge them by.

```
node tools/creature-mesh/sheet.mjs fox stoat hare            -> previews/creature-mesh/sheet-fox-stoat-hare.png
node tools/creature-mesh/sheet.mjs wolf lynx --out previews/creature-mesh/batch-a.png
```

## `sizes.mjs`

Today's drawn height of a kind at each level, with meshes off: what its mesh is to stand.

```
node tools/creature-mesh/sizes.mjs wolf lynx      one line a kind, and the `heights` line for its art/mesh/species/<id>.js
node tools/creature-mesh/sizes.mjs --all          every kind in the roster
node tools/creature-mesh/sizes.mjs --json wolf    as JSON: { wolf: { drawn: [..4], sprite: [[w, h] x 4] } }
```
