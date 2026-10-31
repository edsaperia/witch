// Finds on loan till she sleeps (app/loan.ts; Ed, 2026-10-24): a find taken is hers for the night, usable at once, but kept only if
// the night is won. Its saves are this browser's (a localStorage of our own for each test), as app/finds.test.ts's.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { newGame as fullGame, stepGame, type Controls, type Game } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Find loans and saved ownership use one placed trunk and witch, independent of island size.");
import { FINDABLE, fillTrunk, loanFind, type FindKindId } from "../rules/finds";
import { itemById, wear, wears } from "../rules/wardrobe";
import { bareBroom, type Fitted } from "../rules/broomParts";
import { loadBroom, fitBroom } from "./broomSave";
import { loadHats } from "./hatSave";
import { loadOwned, saveOwned } from "./owned";
import { keepFound, type FindsCtx } from "./finds";
import { dreamsAfter, hatWithoutLoan, homeOf, lend, loanName, lookWithoutLoan, partsWithoutLoan, settle, withLoan, type Loan, type LoanSaves } from "./loan";

let store: Map<string, string>;
const real = (globalThis as { localStorage?: Storage }).localStorage;
beforeEach(() => {
  store = new Map();
  (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, String(v)), removeItem: (k: string) => void store.delete(k), clear: () => store.clear() };
});
afterEach(() => { (globalThis as { localStorage?: unknown }).localStorage = real; });

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
type Genome = Record<string, unknown>;
/** A night whose find is `kind`'s `item`, her on foot by it. */
function night(kind: FindKindId, item: string): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
  fillTrunk(g, {}); g.trunk!.kind = kind; g.trunk!.item = item;
  g.witch = { ...g.witch, x: g.trunk!.x, z: g.trunk!.z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 };
  return g;
}

/** The page's half of the night, as main.ts has it: what she owns tonight (her save plus the loan), her look, and the loan. */
class Page {
  loan: Loan | null = null;
  owned: Set<string> | null = null;
  constructor(public g: Game, public look: Genome = { top: "tee", accessories: {} }) {}
  ctx(): FindsCtx { return { spells: this.g.witches[0].spells, owned: () => (this.owned ??= loadOwned(null)) }; }
  /** E at the find, and the "found" event lent, as main.ts's lendFind. */
  take(): void {
    stepGame(this.g, { ...C, place: true }, 1 / 60);
    for (const e of this.g.leashEvents) if (e.kind === "found" && e.obj && e.find) {
      this.loan = lend(e.find, e.obj, { look: this.look, hat: this.g.spells.hat, parts: this.g.witches[0].spells.parts });
      if (e.find === "wearable" || e.find === "bag") this.ctx().owned().add(e.obj);
    }
  }
  /** She sleeps (the bed, a sail): the loan settled, as main.ts's settleLoan. */
  sleep(won: boolean): Genome | null {
    const l = this.loan!;
    this.loan = null;
    const saves: LoanSaves = { keep: (k, id) => keepFound(this.ctx(), k, id), look: g => void store.set("witch.genome", JSON.stringify(g)), hat: h => void store.set("witch.loadout", JSON.stringify({ hat: h })), parts: f => void fitBroom(f) };
    const woke = settle(l, won, { look: this.look, hat: this.g.spells.hat, parts: this.g.witches[0].spells.parts }, saves);
    if (!won) this.owned = null;
    return woke;
  }
}
const top = FINDABLE.find(i => i.id.startsWith("top-"))!;

describe("a find on loan", () => {
  it("is usable the night she takes it: a wearable is hers to wear, a hat on the hats' floor and hers, a part hers at the bay", () => {
    const w = new Page(night("wearable", top.id));
    w.take();
    expect(w.ctx().owned().has(top.id)).toBe(true);
    expect(loanFind(w.g, 0, 0)?.item).toBe(top.id); // (its constellation lit, the on-loan icon up)
    const h = new Page(night("hat", "sentry"));
    h.take();
    expect(h.g.witches[0].spells.hats ?? ["sentry"]).toContain("sentry");
    const p = new Page(night("part", "nozzles"));
    p.take();
    expect(withLoan("part", new Set(loadBroom().found), p.loan).has("nozzles")).toBe(true);
  });

  it("writes nothing while it's on loan: no save holds it, so a reload mid-night keeps nothing", () => {
    for (const [kind, item] of [["wearable", top.id], ["hat", "sentry"], ["part", "nozzles"], ["bag", "backpack"]] as [FindKindId, string][]) {
      store.clear();
      const p = new Page(night(kind, item));
      p.take();
      expect(p.loan?.id).toBe(item);
      expect(loadOwned(null).has(item)).toBe(false);
      expect(loadHats()).not.toContain(item);
      expect(loadBroom().found).not.toContain(item);
    }
  });

  it("is kept on a won night, when she sleeps: in her own save for good", () => {
    const w = new Page(night("wearable", top.id)); w.take(); w.sleep(true);
    expect(loadOwned(null).has(top.id)).toBe(true);
    const h = new Page(night("hat", "sentry")); h.take(); h.sleep(true);
    expect(loadHats()).toContain("sentry");
    const p = new Page(night("part", "nozzles")); p.take(); p.sleep(true);
    expect(loadBroom().found).toContain("nozzles");
  });

  it("goes back to the sky on a lost night: nothing kept, and she owns tonight only what her save says", () => {
    for (const [kind, item] of [["wearable", top.id], ["hat", "sentry"], ["part", "nozzles"], ["bag", "backpack"]] as [FindKindId, string][]) {
      store.clear();
      const p = new Page(night(kind, item));
      p.take();
      p.sleep(false);
      expect(loadOwned(null).has(item)).toBe(false);
      expect(loadHats()).not.toContain(item);
      expect(loadBroom().found).not.toContain(item);
      expect(p.ctx().owned().has(item)).toBe(false);
    }
  });

  it("worn on a lost night, it's gone when she wakes: that slot holds what she had before the loan (the pile's, next morning)", () => {
    const before = { top: "tee", accessories: {} }, p = new Page(night("wearable", top.id), before);
    p.take();
    p.look = wear(p.look, itemById(top.id)!) as Genome; // (she puts it on at the wardrobe)
    expect(wears(p.look, itemById(top.id)!)).toBe(true);
    const woke = p.sleep(false)!;
    expect(wears(woke, itemById(top.id)!)).toBe(false);
    expect(woke.top).toBe("tee");
    expect(JSON.parse(store.get("witch.genome")!).top).toBe("tee");
  });

  it("worn on a won night, it's still hers to wear next morning (in last night's pile, as ever)", () => {
    const p = new Page(night("wearable", top.id));
    p.take();
    p.look = wear(p.look, itemById(top.id)!) as Genome;
    const woke = p.sleep(true)!;
    expect(wears(woke, itemById(top.id)!)).toBe(true);
    expect(loadOwned(woke).has(top.id)).toBe(true);
  });

  it("closes the leak: her look saved mid-night with the loan on doesn't make it hers at the next load", () => {
    const p = new Page(night("wearable", top.id));
    p.take();
    p.look = wear(p.look, itemById(top.id)!) as Genome;
    const saved = lookWithoutLoan(p.look, p.loan); // (what main.ts's stations.onLook saves)
    expect(wears(saved, itemById(top.id)!)).toBe(false);
    expect(loadOwned(saved).has(top.id)).toBe(false); // (a reload reads this look, and what she wears counts as hers)
  });

  it("a part fitted at the bay on a lost night: her broom keeps the part she had in that slot before", () => {
    saveOwned(new Set());
    fitBroom(bareBroom());
    const p = new Page(night("part", "nozzles"));
    p.take();
    const slot = "exhaust" as keyof Fitted, f = { ...p.g.witches[0].spells.parts, [slot]: "nozzles" };
    p.g.witches[0].spells.parts = f;
    expect(partsWithoutLoan(f, p.loan)[slot]).toBe(p.loan!.before.parts[slot]);
    p.sleep(false);
    expect(loadBroom().fitted[slot]).toBe(null);
    expect(loadBroom().found).not.toContain("nozzles");
  });

  it("a loaned hat is never saved as her hat: the one before stands in", () => {
    const l = lend("hat", "sentry", { look: null, hat: "helmet", parts: bareBroom() });
    expect(hatWithoutLoan("sentry", l)).toBe("helmet");
    expect(hatWithoutLoan("healing", l)).toBe("healing");
  });

  it("is dreamed of after the bed and after a sail (its flight lands her asleep in bed: Ed, 2026-10-24), never another way", () => {
    expect(dreamsAfter("bed")).toBe(true);
    expect(dreamsAfter("sail")).toBe(true);
    for (const w of ["bot", "debug", "boot"]) expect(dreamsAfter(w)).toBe(false);
  });

  it("names itself and its home in the treehouse for the dream", () => {
    expect(loanName({ kind: "hat", id: "sentry" })).toBe("the Sentry hat");
    expect(loanName({ kind: "wearable", id: "top-jacket" })).toBe("the Velvet jacket");
    const st = (id: string) => (id.startsWith("top") ? ["wardrobe"] : id.startsWith("shoes") ? ["shoeRack"] : ["cloakPegs"]);
    expect(homeOf({ kind: "hat", id: "sentry" }, st)).toBe("hats");
    expect(homeOf({ kind: "part", id: "nozzles" }, st)).toBe("pegboard");
    expect(homeOf({ kind: "bag", id: "backpack" }, st)).toBe("bags");
    expect(homeOf({ kind: "wearable", id: "top-cape" }, st)).toBe("wardrobe");
  });
});
