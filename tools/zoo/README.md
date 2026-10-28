# tools/zoo

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `coasts.cjs`

The zoo's islands in their real shapes, end to end in one browser: a fresh browser's zoo first, then the sea chart's page making its islands, then the zoo again, which must read every coast back and lay its islands out in them.

```
npm run build && node tools/zoo/coasts.cjs [dist] [out]   (about 3 to 8 minutes: the chart's 65 islands made)
```

## `map.mjs`

The zoo's layout from above: every island's outline, the Ent's plaza, the streets out to the edge water; with how big the islands are and how wide the streets between them run.

```
node tools/zoo/map.mjs [out.png] [--seed 7] [--size 900] [--real]
```

## `order.mjs`

The zoo's order: each row left to right by the swarm class and within a class by the adult's drawn size.

```
node tools/zoo/order.mjs [--write]
```

## `perf.cjs`

The zoo's cost: the built game's zoo opened four ways, every island found or a typical player's few, straight from a link or from the bestiary book over a night, and for each: when its first frame came, when the art round her was in, when the whole zoo's…

```
npm run build && node tools/zoo/perf.cjs [out.json] [dist]   ONLY=direct-all,direct-typical,book-all,book-typical
```

## `shots.cjs`

The zoo laid out like the sea chart, shot from the built game: on foot by an island's gold fence, at a legend asleep in its circle at an island's middle, by an undiscovered island's lake, at the edge where the water pours off into space, on the Ent's…

```
npm run build && node tools/zoo/shots.cjs [out] [dist]   WAIT (s, 120), SIZE (1280x720), ONLY (names: fence,legend,exit,leave-tree,leave-edge,...)
```

## `trees.cjs`

The zoo's trees: the built game at ?zoo&all, then her put on the ground in a few of its islands in turn, each waited on till its trees are drawn or WAIT seconds pass, with the art queue's state logged.

```
npm run build && node tools/zoo/trees.cjs [out] [dist]   BLOCKS (indices into the zoo's islands, 10,20,30), WAIT (s, 300), SIZE (960x540)
```

## `versailles-tall-mock.cjs`

Mock: the zoo's fence as Versailles' gilded railings, five times taller: about 5.5 m, 42 art pixels at the game's scale.

```
node tools/zoo/versailles-tall-mock.cjs close <out.png>
node tools/zoo/versailles-tall-mock.cjs frame <frame.png> <out.png> <P> <x,y;x,y;...> [lamp share,...] [label]
```
