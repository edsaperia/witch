// Shared by the art scripts: serves the repository over http (ES modules do not load
// from file://) and opens it in headless Chromium through Playwright.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".png": "image/png" };

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); }
}

export async function openBrowser() {
  const server = createServer(async (req, res) => {
    const path = resolve(ROOT, "." + decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!path.startsWith(ROOT + sep)) { res.writeHead(403); res.end(); return; }
    try { const body = await readFile(path); res.writeHead(200, { "content-type": TYPES[extname(path)] || "application/octet-stream" }); res.end(body); }
    catch { res.writeHead(404); res.end(); }
  });
  await new Promise(ok => server.listen(0, "127.0.0.1", ok));
  const base = `http://127.0.0.1:${server.address().port}`;
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  return { page, base, errors, async close() { await browser.close(); server.close(); } };
}
