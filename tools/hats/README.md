# tools/hats

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `art-shots.cjs`

The hats' art in play: the built game at 1280×720 on a seed; at home's open ground she wears the Harvest hat and puts it down, then a Cyclone blows by her; frames stepped by hand a fixed 1/20 s.

```
npm run build && node tools/hats/art-shots.cjs <out dir> [seed]
```

## `edge-seer-shots.cjs`

The seer hats: the built game at 1280×720 on a seed, in the treetops over home's edge, wearing the hat, then the same spot with a plain hat.

```
npm run build && [HAT=routeseer] node tools/hats/edge-seer-shots.cjs <out dir> [seed]
```

## `hats-out-shots.cjs`

Her hats out in the world at once: the built game at 1600x900, three hats left out: one in her own look by her feet and two in other looks, one on screen and one off it.

```
npm run build && node tools/hats/hats-out-shots.cjs <out dir> [seed]
```

## `wardrobe-shots.cjs`

Her hats and her broom from the treehouse's rooms: the built game at 1600×900.

```
npm run build && node tools/hats/wardrobe-shots.cjs <out dir> [seed]
```
