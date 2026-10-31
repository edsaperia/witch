PASS

Commit: 06dd40c35539074d24e00e88885619c663d44fcc (built with `WITCH_SHA=… npx vite build`)
Command: `timeout --kill-after=5s 2700s env ONLY=effects-off,effects-on node tools/smoke/smoke.cjs`
Exit code: 0
Wall time: 1492 s (~24.9 min), SwiftShader, 2026-10-31 UTC

## Lines (verbatim)

```
ok   effects-off ground: complete forest and nonblank canvas ({"mode":"ground","colours":902,"trees":48,"batches":14,"drawCalls":89})
ok   effects-off treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":409,"trees":1677,"batches":19,"drawCalls":115})
ok   effects-on ground: complete forest and nonblank canvas ({"mode":"ground","colours":826,"trees":57,"batches":16,"drawCalls":91})
ok   effects-on treetop: complete forest and nonblank canvas ({"mode":"treetop","colours":410,"trees":1645,"batches":19,"drawCalls":116})
smoke test passed
```

4 ok, 0 FAIL. No errors.

## Screenshots

- `30-ground-effects-off.png`: drawn. Grass ground, two curving paths, the witch lit in the middle, a campfire, trees and the dancefloor stage at the top.
- `31-treetop-effects-off.png`: drawn. Forest canopy on the left and edges, the dancefloor ring with its lights, paths, mist and fireflies.
- `30-ground-effects-on.png`: drawn. Ground, paths, campfire and trees are visible. The debug overlay (stats panel and rulers) covers the top-left half of the frame.
- `31-treetop-effects-on.png`: drawn. Canopy, glow pools and the dancefloor lights are visible under the debug overlay and rulers. Darker and busier than effects-off, but not black.
