// Extra CI-only Vitest reporter: test names, first assertion and source location, alongside the default reporter.
import annotations from './annotations.cjs';
import path from 'node:path';
const firstLine = e => String(e?.message ?? e).split('\n').find(s => s.trim()) ?? 'Test failed';
export function assertionLocation(error, file, fallback) {
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
  }
}
