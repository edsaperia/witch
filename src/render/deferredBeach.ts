import type { ReadyProgram } from './programReadiness';

/** One optional shader: coastal use waits without asking the driver to finish synchronously. */
export class DeferredBeach {
  ready = true;
  cancelled = false;
  private visiting = false;
  private using = false;
  constructor(private record: (phase: string) => void) {}
  begin(): void { this.ready = false; this.record('compile-start'); }
  use(): boolean {
    if (!this.ready && !this.visiting) this.record('coast-wait');
    if (this.ready && !this.using) { this.record('coast-use'); this.using = true; }
    this.visiting = true;
    return this.ready;
  }
  leave(): void { this.visiting = false; this.using = false; }
  finish(): void { if (!this.cancelled) { this.ready = true; this.record('compile-ready'); } }
  cancel(): void { this.cancelled = true; }
}
export async function prepareDeferredBeach(
  program: ReadyProgram & { getUniforms(): unknown }, compiled: Promise<unknown>, gate: DeferredBeach,
  pause: () => Promise<void> = () => new Promise(resolve => setTimeout(resolve, 50)),
): Promise<void> {
  let settled = false, error: unknown;
  void compiled.then(() => { settled = true; }, e => { settled = true; error = e; });
  while (!gate.cancelled && (!settled || !program.isReady())) await pause();
  if (gate.cancelled) return;
  if (error) throw error;
  // A last readiness test protects the only uniform read; a pending pass never becomes drawable.
  if (!program.isReady()) throw new Error('beach shader is not ready');
  program.getUniforms();
  gate.finish();
}
