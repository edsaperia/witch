import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { coordinatorComment } from "./coordinator.mjs";
const file = "previews/robustness-pr1493-watch.json";
const state = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { comments: {} };
const api = path => JSON.parse(execFileSync("gh", ["api", "--paginate", "--slurp", path], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
// Both fetches finish before any receipt can advance.
const pr = api("repos/edsaperia/witch/pulls/1493")[0];
const records = api("repos/edsaperia/witch/issues/1493/comments?per_page=100").flat()
  .filter(coordinatorComment)
  .map(c => ({ id: c.id, updatedAt: c.updated_at, bodyHash: createHash("sha256").update(c.body).digest("hex"), body: c.body }));
const ack = process.argv.indexOf("--ack"), ids = new Set(ack < 0 ? [] : (process.argv[ack + 1] ?? "").split(",").map(Number));
for (const r of records) if (ids.has(r.id)) state.comments[r.id] = { updatedAt: r.updatedAt, bodyHash: r.bodyHash };
if (ack >= 0) { mkdirSync("previews", { recursive: true }); writeFileSync(file, JSON.stringify(state, null, 2) + "\n"); }
console.log(JSON.stringify({ state: pr.state, merged: pr.merged, sha: pr.head.sha, instructions: records.filter(r => state.comments[r.id]?.bodyHash !== r.bodyHash || state.comments[r.id]?.updatedAt !== r.updatedAt) }, null, 2));
