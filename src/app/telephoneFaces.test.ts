import { expect, it } from "vitest";
import { telephoneFace, telephoneFaces } from "./telephoneFaces";
it("stores only bounded validated cosmetics and clears them without touching identity or save bytes", () => {
  const data = new Map([["witch.telephone.v1", "identity"], ["witch.night", "solo"]]), storage = { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); } };
  const book = telephoneFaces(storage); book.remember("1234567", { hair: "buns", palette: { skin: [.1, .5, .7] } });
  expect(book.get("1234567")?.hair).toBe("buns"); expect(telephoneFaces(storage).get("1234567")).toEqual(book.get("1234567"));
  expect(telephoneFace({ ...book.get("1234567"), name: "untrusted" })).toBeNull();
  expect(telephoneFace({ ...book.get("1234567"), skin: [NaN, 0, 0] })).toBeNull();
  book.remember("1234567", { inventory: "not cosmetic" }); expect(book.get("1234567")?.hair).toBe("buns");
  book.clear(); expect(telephoneFaces(storage).get("1234567")).toBeNull();
  expect(data.get("witch.telephone.v1")).toBe("identity"); expect(data.get("witch.night")).toBe("solo");
});
