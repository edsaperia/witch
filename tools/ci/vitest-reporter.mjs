// Extra CI-only Vitest reporter: test names, first assertion and source location, alongside the default reporter.
import annotations from './annotations.cjs';
import fs from 'node:fs';
import path from 'node:path';
// Outcome statistics (src/test/outcome.ts; Ed, 2026-11-04: "Report only"): every test's reported numbers, as a table in the step
// summary, a warning for each that moved, and ci-unit-outcomes.json for the shard's artifact. Never a failure.
function outcomeReport(modules) {
  const summary = process.env.GITHUB_STEP_SUMMARY, file = process.env.WITCH_OUTCOME_FILE ?? 'ci-unit-outcomes.json', root = process.env.GITHUB_WORKSPACE ?? process.cwd(), rows = [];
  for (const module of modules) for (const test of module.children.allTests()) for (const o of test.meta().outcomes ?? []) rows.push({ ...o, test: test.fullName, file: path.relative(root, module.moduleId).replaceAll('\\', '/') });
  if (!rows.length) return;
  const cell = s => String(s).replaceAll('|', '\\|');
  if (summary) fs.appendFileSync(summary, ['', '#### Outcome statistics (report only: never fail the build)', '', '| Test | Measurement | Value | Was | Old line | |', '|---|---|---:|---:|---|---|',
    ...rows.map(r => `| ${cell(r.test)} | ${cell(r.id)} | ${r.value} ${r.unit} | ${r.was} ±${r.near} | ${cell(r.line ?? '')} | ${r.moved ? '**moved**' : ''} |`), ''].join('\n'));
  for (const r of rows.filter(r => r.moved)) console.log(`::warning title=${annotations.escapeProperty('outcome moved (report only)')},file=${annotations.escapeProperty(r.file)}::${annotations.escapeData(`${r.test}: ${r.id} = ${r.value} ${r.unit}, was ${r.was} ±${r.near}`)}`);
  fs.writeFileSync(file, JSON.stringify(rows, null, 2) + '\n');
}
const firstLine = e => String(e?.message ?? e).split('\n').find(s => s.trim()) ?? 'Test failed';
function assertionLocation(error, file, fallback) {
  const frame = error?.stacks?.find(s => path.resolve(s.file) === path.resolve(file));
  const escaped = file.replaceAll('\\', '/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const line = String(error?.stack ?? error?.stackStr ?? '').replaceAll('\\', '/').match(new RegExp(`${escaped}:(\\d+)(?::\\d+)?`))?.[1];
  return { file, line: frame?.line ?? (line ? Number(line) : fallback) };
}
export default class AnnotationReporter {
  onTestRunEnd(modules, unhandled) {
    const sink = annotations.createSink();
    for (const module of modules) {
      for (const test of module.children.allTests('failed')) {
        const error = test.result().errors[0];
        sink.error('vitest', `${test.fullName}: ${firstLine(error)}`, assertionLocation(error, module.moduleId, test.location?.line));
      }
      for (const error of module.errors()) sink.error('vitest', `${module.moduleId}: ${firstLine(error)}`, { file: module.moduleId, line: error.stacks?.[0]?.line });
      for (const suite of module.children.allSuites()) for (const error of suite.errors()) sink.error('vitest hook', `${suite.fullName}: ${firstLine(error)}`, assertionLocation(error, module.moduleId, suite.location?.line));
    }
    for (const error of unhandled) sink.error('vitest unhandled', firstLine(error), { file: error.stacks?.[0]?.file, line: error.stacks?.[0]?.line });
    outcomeReport(modules);
  }
}
