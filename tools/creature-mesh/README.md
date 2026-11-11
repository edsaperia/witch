# tools/creature-mesh

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `fox.js`

The fox's four levels as plans for tools/creature-mesh/quadruped.js, each its own build and not the last one enlarged.

## `kit.js`

Parts a four-legged plan is put together from: a torso, legs, a head, tails and bands, each from a few proportions, so a species' levels can differ in build and not only in size.

## `make.mjs`

Writes a creature drawn in code as a rigged, animated.glb, for tools/creature-bake/bake.mjs or any 3D tool: the trial of low-poly creatures on real skeletons.

```
node tools/creature-mesh/make.mjs fox-adult out/fox-adult.glb     (fox-baby, fox-young, fox-adult, fox-legend)
```

## `page.js`

The creature mesh's page: builds a plan and hands back its.glb, base64.

## `quadruped.js`

A four-legged animal as a low-poly mesh on a real skeleton, built from a species' plan: a trial of creatures drawn in code as hard-edged polygons on bones, rather than as the generator's melted ellipsoids.
