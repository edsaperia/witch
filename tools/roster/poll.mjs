// Own-PR heartbeat state. Failed reads never advance acknowledgements.
// Read: node tools/roster/poll.mjs
// Ack explicit read IDs: --ack id,id. Initial known-history bootstrap: --ack-through id.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
const path = "previews/roster-pr1479-watch.json";
const previous = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : { comments: {} };
const api = endpoint => JSON.parse(execFileSync("gh", ["api", endpoint, "--paginate", "--slurp"], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
const pr = api("repos/edsaperia/witch/pulls/1479")[0];
const comments = api("repos/edsaperia/witch/issues/1479/comments").flat().filter(c => c.user?.login === "edsaperia" && /^COORDINATOR:/m.test(c.body));
const records = comments.map(c => ({ id: c.id, updatedAt: c.updated_at, bodyHash: createHash("sha256").update(c.body).digest("hex"), body: c.body }));
const exact = process.argv.indexOf("--ack"), through = process.argv.indexOf("--ack-through");
const ids = exact >= 0 ? new Set((process.argv[exact + 1] || "").split(",").map(Number)) : new Set();
const limit = through >= 0 ? Number(process.argv[through + 1]) : -1;
for (const record of records) if (ids.has(record.id) || record.id <= limit) previous.comments[record.id] = { updatedAt: record.updatedAt, bodyHash: record.bodyHash };
if (exact >= 0 || through >= 0) { mkdirSync("previews", { recursive: true }); writeFileSync(path, JSON.stringify(previous, null, 2) + "\n"); }
console.log(JSON.stringify({ state: pr.state, merged: pr.merged, head: pr.head.sha, newOrEditedCoordinator: records.filter(r => previous.comments[r.id]?.bodyHash !== r.bodyHash || previous.comments[r.id]?.updatedAt !== r.updatedAt) }, null, 2));
