// One approved full-night throughput case, never a training batch. A separate
// parent imposes the hard 10-minute wall deadline including runtime startup.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setPriority, constants } from "node:os";
import { arg } from "./lib.mjs";
import { runtime } from "./report-runtime.mjs";

if (process.argv.includes("--worker")) {
  setPriority(0, constants.priority.PRIORITY_BELOW_NORMAL);
  const startUTC = new Date().toISOString(), R = await runtime();
  try {
    const at = performance.now();
    const row = R.run({ seed: 1000, worldSeed: 0, island: "home", condition: "matched", bpm: 100, bag: "satchel", hat: "none", wearsHat: false, parts: [], bot: "expert" }, 4200);
    process.stdout.write(JSON.stringify({ status: "completed", startUTC, endUTC: new Date().toISOString(), simulationWallSeconds: (performance.now() - at) / 1000, row }));
  } finally { await R.close(); }
} else {
  const startUTC = new Date().toISOString(), started = performance.now();
  console.error(`Calibration started ${startUTC}; single worker, below-normal priority, hard 600 s cap`);
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), "--worker"], { stdio: ["ignore", "pipe", "inherit"] });
  let output = "", timedOut = false;
  child.stdout.on("data", chunk => { output += chunk; });
  const timer = setTimeout(() => { timedOut = true; child.kill(); }, 600000);
  const code = await new Promise((done, reject) => { child.on("error", reject); child.on("close", done); });
  clearTimeout(timer);
  const result = timedOut ? { status: "hard-wall-cutoff", completedCase: false } : code === 0 ? JSON.parse(output) : { status: "error", exitCode: code, output };
  const record = { ...result, processStartUTC: startUTC, processEndUTC: new Date().toISOString(), totalWallSeconds: (performance.now() - started) / 1000, hardCapSeconds: 600 };
  const out = resolve(arg("out", "docs/notes/expert-results/full-night-calibration.json"));
  mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, JSON.stringify(record, null, 2) + "\n");
  console.log(JSON.stringify(record));
  process.exitCode = timedOut ? 2 : code ?? 1;
}
