# tools/leash

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `route-strip.mjs`

The travelling animals' leash routes from above, as the rules re-plan them while she flies the treetops: N travellers follow her as she flies at treetop speed, turning hard, on a real map.

```
node tools/leash/route-strip.mjs [seed] [out.png]   (FRAMES=8 panels, EVERY=6 frames apart, N=4 travellers)
```

## `runs-gif.cjs`

Sigils in runs: the built game at 960x540 on home's open ground, six creatures on her stack; she presses the sigil button and walks east holding it, lets go, presses on the last and walks back holding.

```
npm run build && node tools/leash/runs-gif.cjs <out dir> [seed]
```
