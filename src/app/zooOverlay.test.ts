// The bestiary's book opens the zoo over the night, and closing it goes back to the night (app/zooOverlay.ts; Ed, 2026-10-19).
import { describe, expect, it } from "vitest";
import { ZooOverlay, zooUrl, type ZooHost } from "./zooOverlay";

function fakeHost() {
  const log: string[] = [];
  let close: (() => void) | null = null;
  const host: ZooHost = {
    pause: on => log.push(on ? "paused" : "resumed"),
    mount: (url, c) => { log.push(`mounted ${url}`); close = c; return { remove: () => log.push("removed") }; },
  };
  return { host, log, closeButton: () => close?.() };
}

describe("the zoo over the night", () => {
  it("opens over the night, pausing it, and closing it goes back to the night where it was", () => {
    const f = fakeHost(), z = new ZooOverlay(f.host, "https://x/witch/?zoo=1");
    z.open();
    expect(z.isOpen).toBe(true);
    expect(f.log).toEqual(["paused", "mounted https://x/witch/?zoo=1"]);
    z.open(); // (a second press while it's up: nothing)
    expect(f.log.length).toBe(2);
    f.closeButton(); // (its × or Esc)
    expect(z.isOpen).toBe(false);
    expect(f.log).toEqual(["paused", "mounted https://x/witch/?zoo=1", "removed", "resumed"]);
    z.close();
    expect(f.log.length).toBe(4);
    z.open(); // (and again, later in the night)
    expect(z.isOpen).toBe(true);
  });

  it("is this build's own page with ?zoo", () => {
    expect(zooUrl("https://edsaperia.github.io/witch/pr-9/?seed=123&set=a=1#x")).toBe("https://edsaperia.github.io/witch/pr-9/?zoo=1");
  });
});
