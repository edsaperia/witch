// Small, single-worker calibration only; not training or evidence of strong play.
import { setPriority, constants } from "node:os";
import { performance } from "node:perf_hooks";
import { runtime } from "./report-runtime.mjs";

setPriority(0, constants.priority.PRIORITY_BELOW_NORMAL);
const r = await runtime();
try {
  const at = performance.now(), rows = [];
  for (const bot of ["skilled", "crude"]) for (const bpm of [100, 200]) {
    const start = performance.now();
    const row = r.run({ seed: 1000, island: "home", bpm, bag: "satchel", bot }, 30);
    rows.push({ bot, bpm, outcome: row.outcome, playerEnd: row.playerEnd, wallSeconds: (performance.now() - start) / 1000 });
  }
  const seconds = (performance.now() - at) / 1000;
  console.log(JSON.stringify({ calibration: "home-30-player-seconds-not-full-night", workerCount: 1, priority: "below-normal", cases: rows.length, wallSeconds: seconds, runsPerMinute: rows.length * 60 / seconds, rows }, null, 2));
} finally { await r.close(); }
