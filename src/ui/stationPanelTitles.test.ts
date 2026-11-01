import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

// Exercise the title lookup used by paint without starting canvas/art workers.
const source = readFileSync(new URL("./stationPanel.ts", import.meta.url), "utf8");
const names = source.match(/const STATION_NAMES: Record<string, string> = (\{[^\n]+\});/)![1];
const lookup = source.match(/esc\((STATION_NAMES\[this\.id\] \?\? this\.id)\)/)![1];
const title = new Function("id", `const STATION_NAMES = ${names}; return (function () { return ${lookup}; }).call({id});`) as (id: string) => string;

it.each([
  ["bedroom2Wardrobe", "wardrobe"], ["bedroom3Wardrobe", "wardrobe"],
  ["bedroom2DressingTable", "dressingTable"], ["bedroom3DressingTable", "dressingTable"],
])("%s heading matches %s", (guest, home) => {
  expect(title(guest)).toBe(title(home));
});
