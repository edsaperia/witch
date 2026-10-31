# tools/leash

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `arc-shots.cjs`

The leash threads' bow: the built game at 1280×720 on a seed; on home's open ground she stands with one adult on her stack and another at a placed sigil, each held just past the thread's strain point, and the same frame is shot with the old numbers and the…

```
npm run build && node tools/leash/arc-shots.cjs <out dir> [seed]   (ZOOM=0..8 the camera's zoom step, 0 closest; STRAIN= the leashes' length as a share of leash.length, 1.3)
```

## `bold-sheet.mjs`

The bold sigils' sheet, for drawing and checking them: every species in a row, left to right its monoline sigil as her stack showed it, its bold sigil on its 24 px grid, and the bold one in her stack at the game's size, each at 4x; a species without a bold…

```
node tools/leash/bold-sheet.mjs <out.png> [id,id,...]
```

## `grounded-shots.cjs`

A take-off pulled back down: the built game at 1280×720 on a seed; on home's open ground she stands with animals following her, presses rise once, and frames are shot across the next 0.6 s.

```
npm run build && node tools/leash/grounded-shots.cjs <out dir> [seed]
```

## `route-strip.mjs`

The travelling animals' leash routes from above, as the rules re-plan them while she flies the treetops: N travellers follow her as she flies at treetop speed, turning hard, on a real map.

```
node tools/leash/route-strip.mjs [seed] [out.png]   (FRAMES=8 panels, EVERY=6 frames apart, N=4 travellers)
```

## `runs-gif.cjs`

Sigils in runs: the built game at 960x540 on home's open ground, six creatures on her stack; she presses the sigil button and walks east holding it, lets go, presses on the last and walks back holding.

```
npm run build && node tools/leash/runs-gif.cjs <out dir> [seed]   (ZOOM=2: zoomed out two steps first)
```

## `sigil-pass-candidates.mjs`

Ed, 2026-10-29: review candidates only; never imported by the game.

## `sigil-pass.mjs`

Review-only sheets: no browser and no changes to the live glyph set.

```
node tools/leash/sigil-pass.mjs [out-dir]
```

## `stack-shots.cjs`

The stack above her hat: the built game at 1280×720 on a seed; on home's ground she stands with three sigils on her stack just behind a tree, and the same frame is shot as before and as now, at each distance behind the tree.

```
npm run build && node tools/leash/stack-shots.cjs <out dir> [seed]
```

## Also here

- `sigil-pass-review.csv`
- `sigil-pass.ps1`
- `sigil-pass.test.mjs`
