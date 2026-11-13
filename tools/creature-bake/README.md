# tools/creature-bake

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bake.mjs`

Bakes a rigged, animated glTF model into pixel sprites at the game's view: the trial pipeline for creatures made as real meshes with real skeletons rather than by the generator.

```
node tools/creature-bake/bake.mjs <model.glb> <out dir> [clip] [height px] [frames]
```

## `page.js`

The creature bake's page: a rigged, animated glTF model drawn as pixel sprites at the game's view, one frame a step through a clip.
