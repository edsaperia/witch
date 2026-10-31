import { expect, it } from "vitest";
import { telephoneBook, telephoneNumber } from "./telephoneBook";

it("keeps one browser number across visits without reading or writing solo-save keys", () => {
  const values = new Map<string, string>(), keys: string[] = [];
  const storage = { getItem: (k: string) => { keys.push(k); return values.get(k) ?? null; }, setItem: (k: string, v: string) => { keys.push(k); values.set(k, v); } };
  const a = telephoneBook(storage, () => 42); a.remember("7654321");
  const b = telephoneBook(storage, () => { throw new Error("must reuse"); });
  expect(b.number).toBe("1000042"); expect(b.recent).toEqual(["7654321"]);
  expect(new Set(keys)).toEqual(new Set(["witch.telephone.v1"]));
});

it("bounds and validates the address book, deduplicates redial and excludes her own number", () => {
  const b = telephoneBook(null, () => 0);
  for (let i = 1; i <= 30; i++) b.remember(String(1000000 + i));
  b.remember(b.number); b.remember("<script>"); b.remember("1000009");
  expect(b.recent.length).toBe(24); expect(b.recent[0]).toBe("1000009");
  expect(b.recent.every(telephoneNumber)).toBe(true); expect(b.saved).toBe(false);
});

it("survives malformed or refused browser storage without deleting other data", () => {
  const b = telephoneBook({ getItem: () => "broken", setItem: () => { throw new Error("full"); } }, () => 9000001);
  expect(b.number).toBe("1000001"); expect(b.saved).toBe(false);
  expect(() => telephoneBook(null, () => NaN)).toThrow();
});
