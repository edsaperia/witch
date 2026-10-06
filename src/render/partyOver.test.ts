// The party's over (render/partyOver.ts): nothing switched off while it plays; then the lights go out in a ripple from home,
// near ones first, every one out by the end, and the shaders told the same front.
import { describe, expect, it } from "vitest";
import type { Game } from "../rules/game";
import { LIGHT_UNIFORMS } from "./lighting";
import { newPartyOverLook, partyOff, partyOverEase, updatePartyOver } from "./partyOver";

const game = (over?: { ease?: number; at?: number }, time = 0) => ({
  map: { dancefloor: { x: 100, z: 200 }, areaSize: 160 },
  party: { areas: new Map([["a", { soundsystem: { x: 100 + 400, z: 200 } }], ["home", { soundsystem: null }]]) },
  clock: { time },
  ...(over ? { partyOver: over } : {}),
}) as unknown as Game;

describe("the party's over: the lights going out", () => {
  it("switches nothing off while the party plays", () => {
    const g = game(), o = updatePartyOver(g, partyOverEase(g), newPartyOverLook());
    expect(o.ease).toBe(0);
    expect(partyOff(o, 100, 200)).toBe(0);
    expect(LIGHT_UNIFORMS.uPartyOver.value.z).toBe(0);
  });
  it("ripples out from home: near lights first, the farthest party last, all out at the end", () => {
    const g = game({ ease: 0.3 }), o = updatePartyOver(g, partyOverEase(g), newPartyOverLook());
    expect(partyOff(o, 100, 200)).toBe(1); // home's gone dark
    expect(partyOff(o, 500, 200)).toBe(0); // the far soundsystem's still lit
    expect(partyOff(o, 160, 200)).toBeGreaterThan(partyOff(o, 250, 200)); // (the front passing: half out 150 m off)
    expect(partyOff(o, 250, 200)).toBeGreaterThan(0);
    expect(LIGHT_UNIFORMS.uPartyOver.value.z).toBeCloseTo(o.front);
    updatePartyOver(g, 1, o);
    expect(partyOff(o, 500, 200)).toBe(1);
    expect(partyOff(o, 100 + 520, 200)).toBe(1); // (past the farthest one too)
  });
  it("eases in from the rules' start time when they give one, or ?partyover=", () => {
    expect(partyOverEase(game({ at: 10 }, 16), null, 12)).toBeCloseTo(0.5);
    expect(partyOverEase(game(undefined, 16), 4, 12)).toBe(1);
    expect(partyOverEase(game(undefined, 16), null)).toBe(0);
  });
});
