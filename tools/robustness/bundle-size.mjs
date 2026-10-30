// Static production download estimate, not a browser startup measurement.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import { decode } from "@jridgewell/sourcemap-codec";

export function initialFiles(manifest, roots) {
  const byFile = new Map(Object.values(manifest).map(entry => [entry.file, entry]));
  const js = new Set(), css = new Set(), assets = new Set(), queue = [...roots];
  while (queue.length) {
    const file = queue.pop(); if (js.has(file)) continue; js.add(file);
    const entry = byFile.get(file); if (!entry) continue;
    for (const key of entry.imports ?? []) { const child = manifest[key]; if (child) queue.push(child.file); }
    for (const file of entry.css ?? []) css.add(file);
    for (const file of entry.assets ?? []) assets.add(file);
  }
  return { js: [...js].sort(), css: [...css].sort(), assets: [...assets].sort() };
}
export function mapContributions(code, map) {
  const lines = code.split("\n"), mappings = decode(map.mappings), bySource = new Map();
  let mappedBytes = 0;
  for (let line = 0; line < mappings.length; line++) {
    const segments = mappings[line], text = lines[line] ?? "";
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]; if (segment.length < 4) continue;
      const bytes = Buffer.byteLength(text.slice(segment[0], segments[i + 1]?.[0] ?? text.length));
      const source = map.sources[segment[1]].replace(/^(\.\.\/)+/, "");
      const row = bySource.get(source) ?? { source, generatedBytes: 0, sourceTextBytes: Buffer.byteLength(map.sourcesContent?.[segment[1]] ?? "") };
      row.generatedBytes += bytes; bySource.set(source, row); mappedBytes += bytes;
    }
  }
  return { mappedBytes, unmappedBytes: Buffer.byteLength(code) - mappedBytes, sources: [...bySource.values()] };
}
export function analyzeBuild(directory) {
  const root = resolve(directory), manifest = JSON.parse(readFileSync(resolve(root, ".vite/manifest.json"), "utf8"));
  const safe = file => { const path = resolve(root, file); if (!path.startsWith(root + sep)) throw Error("Asset leaves build directory"); return path; };
  const html = readFileSync(safe("index.html"), "utf8");
  const local = url => !/^(?:https?:|data:)/.test(url) ? url.replace(/^\.\//, "").replace(/^\//, "").split(/[?#]/)[0] : null;
  const roots = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)].map(match => local(match[1])).filter(Boolean);
  const styles = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/g)) {
    const href = /\bhref=["']([^"']+)["']/.exec(tag)?.[1], rel = /\brel=["']([^"']+)["']/.exec(tag)?.[1];
    if (!href) continue; const file = local(href); if (!file) continue;
    if (rel === "modulepreload") roots.push(file); else if (rel === "stylesheet") styles.push(file);
  }
  const initial = initialFiles(manifest, roots); initial.css = [...new Set([...initial.css, ...styles])].sort();
  const size = file => {
    const data = readFileSync(safe(file));
    return { file, bytes: data.length, gzip9: gzipSync(data, { level: 9 }).length, brotli5: brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }).length };
  };
  const files = [...initial.js, ...initial.css].map(size), sources = new Map(); let unmappedBytes = 0;
  for (const file of initial.js) {
    if (!existsSync(safe(`${file}.map`))) throw Error(`Missing sourcemap for ${file}`);
    const attributed = mapContributions(readFileSync(safe(file), "utf8"), JSON.parse(readFileSync(safe(`${file}.map`), "utf8")));
    unmappedBytes += attributed.unmappedBytes;
    for (const row of attributed.sources) {
      const previous = sources.get(row.source);
      if (previous) { previous.generatedBytes += row.generatedBytes; previous.sourceTextBytes = Math.max(previous.sourceTextBytes, row.sourceTextBytes); }
      else sources.set(row.source, { ...row });
    }
  }
  const version = JSON.parse(readFileSync(safe("version.json"), "utf8"));
  const shortSha = /([a-f0-9]{7})$/.exec(version.version)?.[1];
  const sourceSha = shortSha ? execFileSync("git", ["rev-parse", shortSha], { encoding: "utf8" }).trim() : null;
  const dynamic = Object.values(manifest).filter(entry => entry.isDynamicEntry && !initial.js.includes(entry.file)).map(entry => size(entry.file));
  const referencedAssets = initial.assets.map(file => ({ file, bytes: readFileSync(safe(file)).length }));
  const newsAssets = existsSync(safe("news")) ? readdirSync(safe("news")).map(file => ({ file: `news/${file}`, bytes: readFileSync(safe(`news/${file}`)).length })) : [];
  return { sourceSha, build: version, buildOptions: "npx vite build --sourcemap --manifest; WITCH_SHA=sourceSha; WITCH_VERSION unset", scope: "HTML scripts/modulepreloads plus transitive static JS/CSS imports; worker/font/URL assets listed separately, not assumed downloaded", compression: "gzip level9 / Brotli quality5, each file separately; estimates, not observed network traffic", files, totals: { bytes: files.reduce((n, file) => n + file.bytes, 0), gzip9: files.reduce((n, file) => n + file.gzip9, 0), brotli5: files.reduce((n, file) => n + file.brotli5, 0) }, unmappedInitialJsBytes: unmappedBytes, sources: [...sources.values()].sort((a, b) => b.generatedBytes - a.generatedBytes), dynamic, referencedAssets, newsAssets, actualBrowserBootMeasured: false };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = analyzeBuild(process.argv[2] ?? "dist"), output = process.argv[3] ?? "previews/robustness-startup-before.json";
  mkdirSync(dirname(output), { recursive: true }); writeFileSync(output, JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify({ sourceSha: result.sourceSha, totals: result.totals, topSources: result.sources.slice(0, 12), output, actualBrowserBootMeasured: false }, null, 2));
}
