# tools/workshop

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `parts-sheet.mjs`

The Workshop's broom parts as a contact sheet, no browser: each part at the bay's card size and as it hangs on the pegboard in the room, the old cut-down kinds beside them, and her broom assembled from each set's parts; lit by a plain light from the upper…

```
node tools/workshop/parts-sheet.mjs [out.png] [up]
```

## `shots.cjs`

The Workshop's room in play: the built game at 1600×900, her broom's save set first and tonight's find made a part she hasn't found, then she's stood at the broom's one station, the lathe, its menu in, and in the room's middle, the menu away, her broom and…

```
npm run build && node tools/workshop/shots.cjs <out dir> [seed]
```
