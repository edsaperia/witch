// The finds' master list (docs/art-guide/FINDS.md, the art director's style guide for the permanent-upgrade finds, Ed 2026-10-23)
// is written from FIND_KINDS, so it can't drift from the rules: this fails if the list there differs from what they'd write now.
// After adding a kind or an item: UPDATE_FINDS=1 npx vitest run src/rules/findsList.test.ts
import { describe, expect, it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { FIND_KINDS } from "./finds";
import { ITEMS, SHELVES } from "./wardrobe";
import { partById } from "./broomParts";

const DOC = new URL("../../docs/art-guide/FINDS.md", import.meta.url), START = "<!-- finds:start -->", END = "<!-- finds:end -->";

/** The list as the rules have it: every kind, what its find is drawn as, and its items (wearables by shelf). */
export function findsList(): string {
  const out: string[] = [];
  for (const k of FIND_KINDS) {
    out.push(`### ${k.id}: found as a ${k.name} (${k.items.length})`, "");
    if (k.id === "wearable") {
      for (const s of Object.values(SHELVES)) {
        const here = s.items.filter(i => k.items.includes(i.id));
        if (here.length) out.push(`- **${s.label}** (drawn as \`${k.piece(here[0].id)}\`): ${here.map(i => `${i.name} (\`${i.id}\`)`).join(", ")}`);
      }
      const named = new Set(ITEMS.map(i => i.id)), stray = k.items.filter(id => !named.has(id));
      if (stray.length) out.push(`- other: ${stray.join(", ")}`);
    } else for (const id of k.items) out.push(`- ${partById(id)?.name ?? id} (\`${id}\`), drawn as \`${k.piece(id)}\``);
    out.push("");
  }
  return out.join("\n").trim();
}

describe("the finds' master list", () => {
  it("in docs/art-guide/FINDS.md is FIND_KINDS's own", () => {
    const doc = readFileSync(DOC, "utf8"), a = doc.indexOf(START), b = doc.indexOf(END);
    expect(a >= 0 && b > a, `FINDS.md needs ${START} and ${END} round the list`).toBe(true);
    const want = findsList();
    if (process.env.UPDATE_FINDS) writeFileSync(DOC, doc.slice(0, a + START.length) + "\n" + want + "\n" + doc.slice(b));
    else expect(doc.slice(a + START.length, b).trim(), "the finds have changed: UPDATE_FINDS=1 npx vitest run src/rules/findsList.test.ts").toBe(want);
  });
});
