# The benchmark and pixel-match harness

For changes that should change nothing in the game (the housekeeping round, #122): run it on the base and on the change, and compare.

```
npm run build && npm run bench /tmp/before     # on the base
npm run build && npm run bench /tmp/after      # on the change
npm run bench:compare /tmp/before /tmp/after   # exits 1 on any mismatch
```

- **`rules.ts`** (bundled by `run.mjs` with esbuild, run in Node): a headless game on fixed seeds (`--seeds=123,165272`), brought to wave 30 (`--wave`) with the playtest key, then flown along a fixed path for `--steps` (1800) steps, timing every `stepGame`; a fingerprint of the moving state (witches, creatures, party, combat, growth, berries, beat, camera, floor, buffs…) every `--every` (300) steps. Writes `rules.json`. `--rules-only` stops there.
- **`frames.cjs`** (the built game in headless Chromium, the loop standing still, `window.witch.frame` at a fixed 1/60 s): seven scenes, each from the start screen on seed 123 at 1280×720: the booth, on the ground, a 10 s ground flight (timed), the treetops, a 10 s treetop boost (timed), zoomed out, and four waves. Each ends with a settled screenshot (the page's clock held and its own animations cancelled while it settles, so both runs take the same moment) and, for the flights, each frame's own work (rules and view, `view.ms` by part). Writes `frames.json` and `<scene>.png`. `ONLY=ground,waves` runs just those; `BENCH_DEBUG=1` keeps every settle try.
- **`compare.cjs`**: the fingerprints part by part, the shots pixel by pixel (`diff-<scene>.png` in the second out, the differing pixels red), the timings side by side, as markdown.

Timings in the cloud's software renderer are noisy and slow (frames are mostly the renderer); compare them only between runs on the same machine with nothing else running.
