import { expect, it, vi } from "vitest";
import type { SfxKit } from "./sfxKit";
import { telephoneCue } from "./telephone";
it("uses the budgeted existing kit and finite positive tones, with ten pulses for zero", () => {
  const osc = vi.fn(), voice = vi.fn(() => ({})), env = vi.fn(), gain = () => ({ connect: vi.fn() });
  const kit = { ready: vi.fn(() => true), ctx: { currentTime: 2, createGain: gain }, voice, env, osc } as unknown as SfxKit;
  telephoneCue(kit, "digit", "0"); expect(voice).toHaveBeenCalledTimes(11);
  for (const call of osc.mock.calls) { expect(call[1]).toBeGreaterThan(0); expect(call[2]).toBeGreaterThan(2); expect(call[3]).toBeGreaterThan(0); }
  for (const cue of ["dial", "ring", "busy", "unavailable", "dead"] as const) telephoneCue(kit, cue);
  const calls = osc.mock.calls.length; vi.mocked(kit.ready).mockReturnValue(false); telephoneCue(kit, "ring"); expect(osc.mock.calls).toHaveLength(calls);
});
