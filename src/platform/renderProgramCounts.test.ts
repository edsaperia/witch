import { expect, it } from "vitest";
import { renderProgramCounts } from "./renderProgramCounts";

it("distinguishes program replacement at equal length from reuse and between-frame additions", () => {
  const a = {}, b = {}, c = {}; let programs = [a];
  const probe = renderProgramCounts(() => programs, true), before = probe.begin();
  programs = [b];
  expect(probe.end(before)).toEqual({ before: 1, newBeforeFrame: 0, after: 1, newObservedDuringFrame: 1, parallelShaderCompileAvailable: true });
  programs = [a, b, c]; const next = probe.begin();
  expect(probe.end(next)).toMatchObject({ before: 3, newBeforeFrame: 1, after: 3, newObservedDuringFrame: 0 });
});

it("accepts an unavailable inventory without inventing programs", () => {
  const probe = renderProgramCounts(() => null, false);
  expect(probe.end(probe.begin())).toEqual({ before: 0, newBeforeFrame: 0, after: 0, newObservedDuringFrame: 0, parallelShaderCompileAvailable: false });
});
