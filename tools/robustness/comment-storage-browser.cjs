// Bounded native IndexedDB report-storage diagnostic in a disposable browser context; injected aborts are not quota exhaustion.
// node tools/robustness/comment-storage-browser.cjs --self-test
// node tools/robustness/comment-storage-browser.cjs --run-authorized
// PLAN: codex/comment-storage-browser-proof, work/comment-storage-browser-proof from prototype e67842754.
// Source preparation only: no browser/server launch until canonical allocation. Retention API must be present before execution.
"use strict";
const fs = require("node:fs"), path = require("node:path"), { execFileSync } = require("node:child_process");
const ROOT = path.resolve(__dirname, "../.."), ENTRY = path.join(__dirname, "comment-storage-browser.html");
const STEPS = ["save-count", "reload-count", "seed-migrate", "reload-migrate", "abort-first", "reload-first", "abort-attachment", "reload-attachment", "export-fallback"];
const UNRUN = ["genuine browser quota exhaustion", "kill between text and moment commits", "in-game save status and actual downloaded files"];
function validateResult(step, result) {
  if (!result || result.step !== step || result.ok !== true || !Number.isInteger(result.reports) || result.reports < 1)
    throw Error(`Invalid or failed result for ${step}`);
  if (result.quotaProven !== false || result.storage !== "native IndexedDB") throw Error("Storage evidence label missing");
  if (step.startsWith("abort-") && (result.failure !== "injected native transaction.abort" || !/AbortError/.test(result.error ?? "")))
    throw Error("Injected abort needs its observed native AbortError; it is not quota proof");
  return result;
}
function preflight(source) {
  if (!source.includes('"witch-comments/v2"') || !/all\(moments\s*=\s*true\)/.test(source))
    throw Error("Retention API is absent. Integrate accepted #1572 through canonical routing before running; no server/browser started.");
}
function selfTest() {
  const assert = require("node:assert/strict");
  const script = fs.readFileSync(ENTRY, "utf8").match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "one browser module entry");
  execFileSync(process.execPath, ["--input-type=module", "--check"], { input: script, stdio: ["pipe", "pipe", "pipe"] });
  assert.throws(() => preflight("legacy"), /Retention API is absent/);
  preflight('"witch-comments/v2" all(moments = true)');
  const valid = { step: "abort-first", ok: true, reports: 2, quotaProven: false, storage: "native IndexedDB", failure: "injected native transaction.abort", error: "AbortError: transaction aborted" };
  assert.equal(validateResult("abort-first", valid), valid);
  for (const change of [{ quotaProven: true }, { ok: false }, { storage: "fake" }, { error: "QuotaExceededError" }, { reports: 0 }])
    assert.throws(() => validateResult("abort-first", { ...valid, ...change }));
  assert.throws(() => validateResult("reload-first", valid));
  assert.equal(STEPS.length, new Set(STEPS).size);
  console.log(JSON.stringify({ status: "SOURCE_CHECKS_PASS", browserStarted: false, serverStarted: false,
    checks: ["browser module syntax", "retention preflight positive/negative", "result and evidence-label validation positive/negative"], unrun: [...STEPS, ...UNRUN] }));
}
async function run() {
  preflight(fs.readFileSync(path.join(ROOT, "src/app/playtestComments.ts"), "utf8"));
  const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
  const dirty = !!execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" }).trim();
  if (dirty) throw Error("Commit the diagnostic source first; browser evidence requires a clean source SHA.");
  let server, browser, page;
  const results = [], pageErrors = [], started = Date.now();
  // Work has 45s; cleanup gets 5s. Absolute cap is 60s, including a stalled cleanup.
  const hardStop = setTimeout(() => { console.error(JSON.stringify({ status: "TIMEOUT", sha, results, unrun: UNRUN })); process.exit(1); }, 60_000);
  hardStop.unref(); // Does not keep a completed run alive; still caps a hung browser/server cleanup.
  let deadline;
  const cleanup = async () => {
    await Promise.race([Promise.allSettled([browser?.close(), server?.close()]), new Promise(resolve => setTimeout(resolve, 5000).unref())]);
  };
  try {
    await Promise.race([(async () => {
      const { createServer } = await import("vite");
      let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
      server = await createServer({ root: ROOT, configFile: false, server: { host: "127.0.0.1", port: 0, strictPort: true },
        plugins: [{ name: "comment-diagnostic-source", configureServer(vite) { vite.middlewares.use("/__comment_diagnostic_source", (_req, res) => {
          res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ sha, dirty }));
        }); } }] });
      await server.listen();
      const address = server.httpServer.address();
      if (!address || typeof address === "string") throw Error("Missing isolated server address");
      browser = await playwright.chromium.launch({ headless: true, timeout: 10_000 });
      const context = await browser.newContext({ viewport: { width: 320, height: 200 } }); // Never a persistent/user profile.
      page = await context.newPage(); page.setDefaultTimeout(8000);
      page.on("pageerror", error => pageErrors.push(String(error)));
      await page.goto(`http://127.0.0.1:${address.port}/tools/robustness/comment-storage-browser.html`, { waitUntil: "domcontentloaded" });
      for (const step of STEPS) {
        if (step.startsWith("reload-")) await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForFunction(() => !!window.storageDiagnostic);
        const result = await page.evaluate(async ({ step, sha }) => {
          const source = await fetch("/__comment_diagnostic_source").then(r => r.json());
          if (source.sha !== sha) throw Error("Served source differs from declared SHA");
          return window.storageDiagnostic(step, sha);
        }, { step, sha });
        results.push(validateResult(step, result));
        if (pageErrors.length) throw Error(pageErrors.join("\n"));
      }
      const finalSha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
      const finalDirty = !!execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" }).trim();
      if (finalSha !== sha || finalDirty !== dirty) throw Error("Source identity changed during diagnostic");
      console.log(JSON.stringify({ status: "PASS", sha, dirty, browser: browser.version(), elapsedMs: Date.now() - started,
        scope: "native IDB / real same-tab reload / injected native abort; no renderer or representative-night claim", results, unrun: UNRUN }, null, 2));
    })(), new Promise((_, reject) => { deadline = setTimeout(() => reject(Error("Diagnostic work exceeded 45s")), 45_000); })]);
  } catch (error) {
    console.error(JSON.stringify({ status: "FAIL", sha, dirty, elapsedMs: Date.now() - started, error: String(error), results, pageErrors, unrun: UNRUN }, null, 2));
    process.exitCode = 1;
  } finally { clearTimeout(deadline); await cleanup(); }
}
module.exports = { validateResult, preflight };
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !["--self-test", "--run-authorized"].includes(args[0])) {
    console.error("Use --self-test for source checks only. --run-authorized starts a browser/server and requires separate canonical allocation."); process.exitCode = 1;
  } else if (args[0] === "--self-test") selfTest();
  else run().catch(error => { console.error(String(error)); process.exitCode = 1; });
}
