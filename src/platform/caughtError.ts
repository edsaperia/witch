// A lightweight reporting hook: callers must not pull the playtest log's rules imports into drawing or workers.
let sink: ((error: unknown, where: string) => void) | undefined;
export function setCaughtErrorSink(next: typeof sink): void { sink = next; }
export function logCaughtError(error: unknown, where: string): void {
  if (sink) sink(error, where);
  else console.warn(where, error); // No page log in workers or isolated tools: keep their normal diagnostic channel.
}
