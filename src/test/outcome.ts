// Outcome statistics are reported, never asserted (Ed, 2026-11-02, DESIGN.md "Outcome statistics never block a release"; Ed,
// 2026-11-04, on the tests still failing the build on them: "Report only"). A test that measures how a fight or a night turns out
// (a pack's strikes a minute, how close it gathers, how long the afterparty takes) records the number here instead of expecting
// it: printed in the test's output, kept on the test (`task.meta.outcomes`) for the CI's step summary and a warning when it has
// moved (tools/ci/vitest-reporter.mjs), and never failing. The rules the same test checks (deterministic, no strike while she's
// up, every one home) stay hard `expect`s beside it.

/** One reported number: `was` its value when last looked at (the commit that set it), `near` how far it may drift before the
 *  summary flags it as moved, `line` the line the old assertion failed at (for the reader; nothing checks it). */
type Outcome = { id: string; value: number; unit: string; was: number; near: number; moved: boolean; line?: string };

type WithMeta = { task: { meta: object } };

/** Records `value` as an outcome statistic of the running test (`ctx`, the test's context: `it("…", ctx => …)`). A value that is
 *  not a finite number is a broken measurement, not an outcome, and throws. */
export function outcome(ctx: WithMeta, id: string, value: number, o: { unit: string; was: number; near: number; line?: string }): Outcome {
  if (!Number.isFinite(value)) throw new Error(`outcome ${id}: not a measurement (${value})`);
  const moved = Math.abs(value - o.was) > o.near;
  const row: Outcome = { id, value: +value.toFixed(3), unit: o.unit, was: o.was, near: o.near, moved, ...(o.line ? { line: o.line } : {}) };
  const meta = ctx.task.meta as { outcomes?: Outcome[] };
  (meta.outcomes ??= []).push(row);
  console.log(`outcome (report only): ${id} = ${row.value} ${o.unit} (was ${o.was}, ±${o.near}${o.line ? `; old line ${o.line}` : ""})${moved ? " MOVED" : ""}`);
  return row;
}
