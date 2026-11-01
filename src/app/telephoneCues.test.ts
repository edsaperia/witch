import { expect, it, vi } from "vitest";
import { telephoneCues } from "./telephoneCues";
import type { TelephoneState } from "../ui/telephone";
const state = (status: TelephoneState["status"]): TelephoneState => ({ own: "1234567", recent: [], saved: true, status });
it("stays silent in default/solo and hidden phone states, and budgets cadence without a timer", () => {
  const telephone = vi.fn(), letter = vi.fn(), cues = telephoneCues(() => ({ telephone, letter }));
  cues.update(state("preparing"), true, 0); cues.update(state("available"), false, 1);
  expect(telephone).not.toHaveBeenCalled(); expect(letter).not.toHaveBeenCalled();
  cues.update(state("ringing"), true, 2); cues.update(state("ringing"), true, 3); expect(telephone).toHaveBeenCalledTimes(1);
  cues.update(state("ringing"), true, 3002); expect(telephone).toHaveBeenCalledTimes(2);
  cues.digit("0"); expect(telephone).toHaveBeenLastCalledWith("digit", "0");
  cues.update(state("connected"), true, 4000); expect(letter.mock.calls).toEqual([[-.3]]);
  cues.update(state("connected"), true, 4350); expect(letter.mock.calls).toEqual([[-.3], [.3]]);
  cues.update(state("ended"), true, 5000); cues.update(state("ended"), true, 6000); expect(telephone.mock.calls.filter(c => c[0] === "dead")).toHaveLength(1);
});
