import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import { groupChangelog, type ChangelogFile } from "../src/changelogData";
export function changelogAssets(root = "."): Record<string, string> {
  const directory = resolve(root, "config/changelog");
  const files = Object.fromEntries(readdirSync(directory).filter(name => name.endsWith(".json")).map(name => [name, JSON.parse(readFileSync(resolve(directory, name), "utf8")) as ChangelogFile]));
  const entries = groupChangelog(files), assets: Record<string, string> = {}, batches: string[] = [];
  for (let i = 0; i < entries.length; i += 3) {
    const source = JSON.stringify({ version: 1, entries: entries.slice(i, i + 3) });
    if (Buffer.byteLength(source) > 512 * 1024) throw Error("Changelog batch exceeds the runtime fetch limit");
    const hash = createHash("sha256").update(source).digest("hex").slice(0, 12), file = `batch-${i / 3}-${hash}.json`;
    assets[`news/${file}`] = source; batches.push(file);
  }
  assets["news/index.json"] = JSON.stringify({ version: 1, total: entries.length, batches });
  return assets;
}
export function changelogBatches(): Plugin {
  let root = ".";
  return {
    name: "changelog-batches",
    configResolved(config) { root = config.root; },
    generateBundle() { for (const [fileName, source] of Object.entries(changelogAssets(root))) this.emitFile({ type: "asset", fileName, source }); },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = (request.url ?? "").split("?")[0];
        if (!path.startsWith("/news/")) { next(); return; }
        const source = changelogAssets(root)[path.slice(1)];
        response.statusCode = source === undefined ? 404 : 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8"); response.setHeader("Cache-Control", "no-store");
        response.end(source ?? "{}");
      });
    },
  };
}
