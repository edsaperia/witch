// The docs' tables made from the data (tools/docs/tables.mjs): every one as the data makes it now, and each name in use.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error (a plain .mjs tool, no types)
import { docs, fill, stale, TABLES } from "./tables.mjs";

const ROOT = path.resolve(__dirname, "../..");

describe("the docs' tables", () => {
  it("are as the data makes them (node tools/docs/tables.mjs --write)", async () => {
    expect((await stale()).map((s: { file: string }) => s.file)).toEqual([]);
  });

  it("each stand in a doc", () => {
    const text = (docs() as string[]).map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n");
    expect(Object.keys(TABLES).filter(n => !text.includes(`<!-- data: ${n} `))).toEqual([]);
  });

  it("fills a block from its table and refuses an unknown one", async () => {
    const block = (n: string, body: string) => `a\n<!-- data: ${n} (x) -->\n${body}\n<!-- /data: ${n} -->\nb`;
    const out = await fill(block("broom-sets", "old"));
    expect(out).toMatch(/^a\n<!-- data: broom-sets \(x\) -->\n\| Set \| Parts \| Spell \|/);
    expect(out.endsWith("\n<!-- /data: broom-sets -->\nb")).toBe(true);
    await expect(fill(block("nope", "old"))).rejects.toThrow(/no table called nope/);
  });
});
