import { beforeAll, describe, expect, it } from "vitest";
import { Forest } from "./forest";
import { generateMap } from "./map";
import { TUNING } from "./tuning";

describe("cooperative forest queries", () => {
  let map: ReturnType<typeof generateMap>;
  beforeAll(() => { map = generateMap(763086, TUNING); });

  it.each(["trees", "bushes"] as const)("returns the same %s, in the same order, cold and cached", kind => {
    const eager = new Forest(map), sliced = new Forest(map);
    const query = (f: Forest) => kind === "trees" ? f.treesNear(2562, 2484, 120) : f.bushesNear(2562, 2484, 120);
    const chunks = (f: Forest) => kind === "trees" ? f.treesNearChunks(2562, 2484, 120) : f.bushesNearChunks(2562, 2484, 120);
    const expected = query(eager), cold = [...chunks(sliced)];
    expect(cold.length).toBeGreaterThan(4); // The caller gets control between chunks, including empty ones.
    expect(cold.flat()).toEqual(expected);
    const cached = query(sliced), warm = [...chunks(sliced)].flat();
    expect(warm).toEqual(cached);
    for (let i = 0; i < warm.length; i++) expect(warm[i]).toBe(cached[i]);
  });

  it("can pause a query while another caller uses the same caches", () => {
    const f = new Forest(map), run = f.bushesNearChunks(2562, 2484, 120), first = run.next();
    expect(first.done).toBe(false);
    f.bushesNear(2500, 2500, 80);
    const result = [...(first.value ?? []), ...[...run].flat()];
    expect(result).toEqual(f.bushesNear(2562, 2484, 120));
  });
});
