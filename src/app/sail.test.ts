// The sail in place's own parts (app/sail.ts; docs/plans/sail-without-reload.md PR 5): which way it sails, the link it pushes,
// the knobs that link keeps from the sliders' carry, Back opening the pause menu, and the quiet fallback to today's reload.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BackGuard, chartChoice, chartIsland, linkKnobs, nightFromHref, nightHref, sailHref, sailOrReload, sailParams, sailWay, SAIL_DROPS, stayLabel } from "./sail";
import { newForestHref } from "./newForest";
import { carryKnobs } from "./settings";
import { DECISION_LIST, knobAt, setKnob } from "../ui/decisions";
import { TUNING } from "../rules/tuning";
import { startNight, type Page } from "./night";

describe("which way she sails", () => {
  it("is the tuning's sail.inPlace (on: PR 6), ?sail= over it for the page", () => {
    expect(TUNING.sail?.inPlace).toBe(true);
    expect(sailWay(new URLSearchParams(""), TUNING)).toBe("inplace");
    expect(sailWay(new URLSearchParams("sail=reload"), TUNING)).toBe("reload");
    expect(sailWay(new URLSearchParams(""), { sail: { inPlace: false } })).toBe("reload");
    expect(sailWay(new URLSearchParams("sail=inplace"), TUNING)).toBe("inplace");
    expect(sailWay(new URLSearchParams("sail=reload"), { sail: { inPlace: true } })).toBe("reload");
    expect(sailWay(new URLSearchParams("sail=what"), { sail: { inPlace: true } })).toBe("inplace");
  });
});

describe("the link a sail in place pushes", () => {
  const page = "seed=123&island=fox&arrive=1&quick=1&sail=inplace&wave=4&cleared=a,b&at=10,20&mode=ground&zoom=2&set=fight.scale=2&found=wolf&bot=skilled&quest=1&arena=wolf*2&partyover=1&debug=sail&px=4&d_grace=0.8";
  it("is ?island=X&seed=S, the page's other switches kept, the chart's hand-off and the repro and debug places dropped", () => {
    const p = sailParams(new URLSearchParams(page), "wolf", 98765);
    expect(p.toString()).toBe("island=wolf&seed=98765&quick=1&sail=inplace&debug=sail&px=4&d_grace=0.8");
    for (const k of SAIL_DROPS) expect(p.has(k)).toBe(false);
  });
  it("carries the chart's world when it gave one (the page's ?world=), and the new one over the old", () => {
    expect(sailParams(new URLSearchParams("world=5&quick=1"), "home", 7, 9).toString()).toBe("island=home&seed=7&world=9&quick=1");
    expect(sailParams(new URLSearchParams("world=5"), "home", 7).has("world")).toBe(false);
  });
  it("the reload's link is today's (ui/chartOverlay.ts's, as before)", () => {
    expect(sailHref("wolf", 42, undefined, "https://x.test/witch/?seed=1&quick=1")).toBe("https://x.test/witch/?island=wolf&seed=42&arrive=1");
    expect(sailHref("wolf", 42, 3, "https://x.test/witch/pr-9/")).toBe("https://x.test/witch/pr-9/?island=wolf&seed=42&arrive=1&world=3");
  });
});

describe("the other ways to a new night (PR 6)", () => {
  const href = "https://x.test/witch/pr-9/?seed=123&island=fox&world=7&creator=0&wave=4&arrive=1&bot=skilled&sail=inplace#h";
  const r = () => 0.4567891;
  it("fall back to today's links: the bed newForestHref's (a new seed, the same island), the bot's exit without ?bot", () => {
    expect(nightHref("bed", href, r)).toBe(newForestHref(href, r));
    const u = new URL(href); u.searchParams.delete("bot");
    expect(nightHref("bot", href)).toBe(u.toString());
    expect(nightHref("bot", href)).toBe("https://x.test/witch/pr-9/?seed=123&island=fox&world=7&creator=0&wave=4&arrive=1&sail=inplace#h");
  });
  it("each starts the night its link would on a fresh load: its island, seed, world and how, the link's switches whole", () => {
    const bed = nightFromHref("bed", nightHref("bed", href, r));
    expect(bed).toMatchObject({ how: "bed", island: "fox", seed: 456789, world: 7 });
    expect(bed.params.get("wave")).toBe("4"); // (as newForestHref's page kept it)
    const bot = nightFromHref("bot", nightHref("bot", href));
    expect(bot).toMatchObject({ how: "bot", island: "fox", seed: 123, world: 7 });
    expect(bot.params.has("bot")).toBe(false);
    const bare = nightFromHref("bot", "http://localhost/?seed=5");
    expect(bare).toMatchObject({ island: "", seed: 5 });
    expect(bare.world).toBeUndefined();
  });
  it("a link with no seed isn't a night in place (it throws: the page loads it anew instead)", () => {
    expect(() => nightFromHref("bed", "http://localhost/?creator=0")).toThrow(/no seed/);
  });
  it("one going wrong loads its link as before", async () => {
    for (const how of ["bed", "bot"] as const) {
      const to = nightHref(how, href, r), went: string[] = [];
      expect(await sailOrReload(async () => { nightFromHref(how, to); throw new Error("no"); }, to, h => went.push(h))).toBe(false);
      expect(went).toEqual([to]);
    }
  });
});

describe("no end cards (Ed, 2026-10-26: \"Remove the end cards\"): the guidance pins lead her home instead (rules/guidance.ts)", () => {
  it("the page has neither the night won card nor the party's over card, nor their buttons", () => {
    const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
    expect(html).not.toMatch(/id="(won|over|won-found|won-sail|won-close|over-stats|over-bed|over-close|chart-open)"|NIGHT WON|THE PARTY'S OVER/);
    expect(html).not.toMatch(/#won\b|#over\b/);
  });
});

describe("the sliders carried to the next island (Ed's decision 5)", () => {
  const grace = DECISION_LIST.find(d => d.id === "grace")!, flash = DECISION_LIST.find(d => d.id === "legendFlash")!;
  it("knows the knobs its link sets itself: ?set= paths and the decisions' d_<id>", () => {
    const own = linkKnobs(new URLSearchParams("d_grace=0.8&set=fight.scale=2;witch.speed=3"), DECISION_LIST);
    expect([...own].sort()).toEqual(["fight.scale", grace.apply.knob!, "witch.speed"].sort());
  });
  it("carries every slider moved last night but those the next night's link sets itself", () => {
    const old = structuredClone(TUNING), next = structuredClone(TUNING);
    setKnob(old, grace.apply.knob!, 0.95); setKnob(old, flash.apply.knob!, 0.1);
    setKnob(next, grace.apply.knob!, 0.2); // (the next link's d_grace=0.2, put on as its tuning was made)
    const carried = carryKnobs(old, next, DECISION_LIST, linkKnobs(new URLSearchParams("d_grace=0.2"), DECISION_LIST));
    expect(carried).toContain("legendFlash");
    expect(carried).not.toContain("grace");
    expect(knobAt(next, flash.apply.knob!)).toBe(0.1);
    expect(knobAt(next, grace.apply.knob!)).toBe(0.2);
  });
});

describe("Back after a sail in place (Ed's decision 1)", () => {
  const fake = () => { const pushed: [unknown, string][] = []; return { pushed, h: { pushState: (s: unknown, _t: string, u?: string | URL | null) => void pushed.push([s, String(u)]) } }; };
  it("is left alone on a first load", () => {
    const { pushed, h } = fake();
    let paused = 0;
    const g = new BackGuard(h, () => paused++);
    expect(g.popped()).toBe(false);
    expect(pushed).toEqual([]);
    expect(paused).toBe(0);
  });
  it("after a sail: the night's link and a guard on it; Back puts the guard back on the night's link and opens the pause menu", () => {
    const { pushed, h } = fake();
    let paused = 0;
    const g = new BackGuard(h, () => paused++);
    g.sailed("?island=wolf&seed=5");
    expect(pushed).toEqual([[{ witch: "night" }, "?island=wolf&seed=5"], [{ witch: "guard" }, "?island=wolf&seed=5"]]);
    expect(g.popped()).toBe(true);
    expect(g.popped()).toBe(true);
    expect(pushed.slice(2)).toEqual([[{ witch: "guard" }, "?island=wolf&seed=5"], [{ witch: "guard" }, "?island=wolf&seed=5"]]);
    expect(paused).toBe(2);
    g.sailed("?island=fox&seed=6");
    g.popped();
    expect(pushed.at(-1)).toEqual([{ witch: "guard" }, "?island=fox&seed=6"]);
  });
});

describe("a sail in place that goes wrong reloads quietly (Ed's decision 2)", () => {
  it("startNight throwing: the page goes to the island's link exactly as the old way would, the error logged", async () => {
    // (a night on with a view, and startNight asked for a second one it won't make: it throws before anything else)
    const page = { night: { tuning: TUNING, cleanups: [] } as never, build: "test", look: () => null, view: {} as never } as Page;
    const href = sailHref("wolf", 42, undefined, "https://x.test/witch/?seed=1&sail=inplace");
    const went: string[] = [], logged: unknown[] = [];
    const ok = await sailOrReload(() => startNight(page, { how: "boot", island: "wolf", seed: 42, params: new URLSearchParams("island=wolf&seed=42") }).then(() => {}), href, h => went.push(h), e => logged.push(e));
    expect(ok).toBe(false);
    expect(went).toEqual(["https://x.test/witch/?island=wolf&seed=42&arrive=1"]);
    expect(String(logged[0])).toMatch(/startNight/);
  });
  it("sailed in place: no reload", async () => {
    const went: string[] = [];
    expect(await sailOrReload(async () => {}, "x", h => went.push(h))).toBe(true);
    expect(went).toEqual([]);
  });
  it("a log that throws still reloads", async () => {
    const went: string[] = [];
    await sailOrReload(async () => { throw new Error("no"); }, "x", h => went.push(h), () => { throw new Error("log"); });
    expect(went).toEqual(["x"]);
  });
});

describe("choosing the island she's on (Ed, 2026-10-21: \"going to bed does that\")", () => {
  const home = { island: "home", world: 7 }, fox = { island: "fox", world: 7 };
  it("never starts a new night, from any chart: home or any island, mid-night or after", () => {
    expect(chartChoice(home, "home", 7)).toBe("stay");
    expect(chartChoice(fox, "fox", 7)).toBe("stay");
  });
  it("sails to any other island, as now", () => {
    expect(chartChoice(home, "fox", 7)).toBe("sail");
    expect(chartChoice(fox, "home", 7)).toBe("sail");
    expect(chartChoice(fox, "wolf", 7)).toBe("sail");
  });
  it("sails when the chart shows another world (a shared link's, or after starting over), or there's no night to go back to", () => {
    expect(chartChoice(home, "home", 8)).toBe("sail");
    expect(chartChoice(undefined, "home", 7)).toBe("sail"); // (chart.html, the first load's chart)
    expect(chartChoice(null, "fox", 7)).toBe("sail");
  });
  it("knows the night's island by its map: home or a kind's; none for a sized, phased or zoo island, or a placeholder", () => {
    expect(chartIsland("home")).toBe("home");
    expect(chartIsland("fox")).toBe("fox");
    expect(chartIsland("")).toBe(null);
    expect(chartIsland(undefined)).toBe(null);
    expect(chartIsland("nonsense")).toBe(null);
  });
  it("labels its button as going back: to the party, or to the afterparty once the party's over", () => {
    expect(stayLabel("on")).toBe("Back to the party");
    expect(stayLabel("won")).toBe("Back to the party");
    expect(stayLabel("over")).toBe("Back to the afterparty");
  });
});
