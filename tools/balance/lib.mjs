// What the balance tools share (housekeeping, issue #122): the rules loaded through Vite's SSR (so
// the TypeScript in src/rules/ runs in Node as it is), command-line flags, and a few statistics.
import { createServer } from "vite";

/** The rules, loaded as the game has them: load("/src/rules/map.ts") and so on; close() when done. */
export async function openRules() {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
  return { load: p => server.ssrLoadModule(p), close: () => server.close() };
}

/** --name value from the command line, or def. */
export const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
/** "a,b,c" as strings, or as numbers. */
export const list = s => String(s).split(",");
export const nums = s => String(s).split(",").map(Number);
/** The mean (NaN of none), the median (the upper middle), a share as a whole percent ("–" for NaN). */
export const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
export const median = a => { if (!a.length) return NaN; const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };
export const pct = x => (Number.isNaN(x) ? "–" : `${Math.round(x * 100)}%`);
