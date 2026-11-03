// The anchor chains' hint (render/anchorHint.ts): once, for her own refusal by an adult, kept on this browser.
import { beforeEach, describe, expect, it } from "vitest";
import { ANCHOR_HINT_KEY, anchorHintDue, resetAnchorHint } from "./anchorHint";
import type { LeashEvent } from "../rules/leash";

const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m }; };
const grounded = (obj?: string, id = 0): LeashEvent => ({ kind: "grounded", id, x: 0, z: 0, at: 5, ...(obj ? { obj } : {}) });

describe("the anchor hint", () => {
  beforeEach(() => resetAnchorHint());
  it("shows the first time an adult holds her down, and never again", () => {
    const s = store();
    expect(anchorHintDue([grounded("anchor")], 0, s)).toBe(5);
    expect(s.m.get(ANCHOR_HINT_KEY)).toBe("1");
    expect(anchorHintDue([grounded("anchor")], 0, s)).toBeNull();
    resetAnchorHint();
    expect(anchorHintDue([grounded("anchor")], 0, s)).toBeNull(); // (kept on this browser)
  });
  it("not for the weight rule's refusal, nor another witch's", () => {
    const s = store();
    expect(anchorHintDue([grounded()], 0, s)).toBeNull();
    expect(anchorHintDue([grounded("anchor", 1)], 0, s)).toBeNull();
    expect(anchorHintDue([grounded("anchor", 0)], 0, s)).toBe(5);
  });
});
