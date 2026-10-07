# The benchmark and pixel-match harness

For changes that should change nothing in the game (the housekeeping round, #122): run it on the base and on the change, and compare.

```
npm run build && npm run bench /tmp/before     # on the base
npm run build && npm run bench /tmp/after      # on the change
npm run bench:compare /tmp/before /tmp/after   # exits 1 on any mismatch
```

- **`rules.ts`** (bundled by `run.mjs` with esbuild, run in Node): a headless game on fixed seeds (`--seeds=123,165272`), brought to wave 30 (`--wave`) with the playtest key, then flown along a fixed path for `--steps` (1800) steps, timing every `stepGame`; a fingerprint of the moving state (witches, creatures, party, combat, growth, berries, beat, camera, floor, buffs…) every `--every` (300) steps. The fingerprint is canonical: objects' keys sorted and the tuning file's `_` notes dropped (the tuning rides in `buffs`), so a note edited or the tuning's groups reordered leave it as it was; a value changed doesn't. Writes `rules.json`. `--rules-only` stops there.
- **`frames.cjs`** (the built game in headless Chromium, the loop standing still, `window.witch.frame` at a fixed 1/60 s): seven scenes, each from the start screen on seed 123 at 1280×720: the booth, on the ground, a 10 s ground flight (timed), the treetops, a 10 s treetop boost (timed), zoomed out, and four waves. Each ends with a settled screenshot (the page's clock held and its own animations cancelled while it settles, so both runs take the same moment) and, for the flights, each frame's own work (rules and view, `view.ms` by part). Writes `frames.json` and `<scene>.png`. `ONLY=ground,waves` runs just those; `BENCH_DEBUG=1` keeps every settle try.
- **Quick** (`npm run bench:quick [out]`, about 5 minutes in the cloud): the rules to wave 10 for 900 steps, and three cheap scenes at 960×540 loaded with `?quick=1`, stepped without drawing (only the settled shots draw): the boot (off the decks, the home ring booting), a wave fight (a debug arena below the dancefloor, a wave called in) and the bedroom (the character creator as it opens, the page's clock held still from the start). For every refactor PR; the full bench every few merges. The **Bench** workflow (`.github/workflows/bench.yml`, optional) runs it on each PR into claude/prototype, on the PR's base and its head with the head's bench, and compares: green means the same game. `BENCH_LAPS=1` prints each scene's load and step times.
- **`compare.cjs`**: the fingerprints part by part (a quick run compares only with a quick run), the shots pixel by pixel (`diff-<scene>.png` in the second out, the differing pixels red), the timings side by side, as markdown.

Timings in the cloud's software renderer are noisy and slow (frames are mostly the renderer); compare them only between runs on the same machine with nothing else running.

## Performance probes (report only; overnight phase 2, docs/perf/)

- **`node tools/bench/ts.mjs perf`** (`perf.ts`): the rules at late waves, headless. `--seeds=123,871136 --waves=10,20,28 --steps=1200`, brought on by the playtest key every `--gap` steps (180), or `--bot=skilled|champion` playing at the game's own waves. Per wave: step p50/p95/p99/worst, steps over 4 and 16.7 ms, creatures by state, the sim's level of detail and the heap.
- **`node tools/bench/late.cjs [out]`** (after `npm run build`): the late game in headless Chromium. `SEED=871136 WAVE=28 AT=1059,1499 FRAMES=600 SIZE=1280x720`: the rules brought to the wave without drawing, her put over the treetops there, then frames timed at 1/60 s (the view's work by part, draw calls, the JS heap). In the cloud the `draw` part is the software renderer's; the other parts are the CPU's own.
- **`node tools/bench/ts.mjs spikes`** (`spikes.ts`): a bot game (`--seed`, `--bot`, `--wave`), every step over `--over` ms noted; `--profile=<step>,...` replays and profiles exactly those steps.
- **`hitch.cjs`** (the hitch hunt, overnight phase 2): the built game in headless Chromium brought to a late wave (`SEED=871136 WAVE=28`, a wave every 3 s of play), then the ground and treetop paths flown and a wave called in, each frame judged by its CPU work without `draw` (the software rasteriser here): p50/p95/p99/worst, frames over 16.7/33/100 ms, each part's frames over 16.7 ms, the long frames' parts, draw calls and the JS heap. Writes `hitch.json`. `node tools/bench/hitch.cjs [out]`, about 45 minutes.
