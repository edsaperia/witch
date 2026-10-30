# diagnostic-1 manifest (PR #1477, comment 6514873615)

- Source SHA: 676e8924ae290ecfa30b283f3435e16a0e0191f8 (no game or bot code changed); `npm ci` and `npm run typecheck` ok.
- Command (repo root, one run at a time, one worker): `node tools/balance/expert-diagnostic-trace.mjs --bot expert|skilled --out docs/notes/expert-results/diagnostic-1/<bot>.jsonl`
- Setup (report-runtime.mjs `make`, fixed STEP 1/60): world 0, night seed 1000, island home, matched, 100 bpm, bag satchel, hat none, wearsHat=false, parts [], empty-owned finds profile (`fillTrunk(g, {})`).
- Expert: defaults, expertSeed = 1000 ^ 0x1477. Skilled: unchanged. Stop at win/loss or 600 player seconds; wall cap 900 s each.
- Results: expert exit 0, wall 16 s (trace 10.3 s), limit at 600 s player time, wave 2, no win/loss. Skilled exit 0, wall 16 s (10.8 s), won at 310.73 s player time, wave 1.
- Diagnostic privileged logs only (read full game state); never expert inputs.
