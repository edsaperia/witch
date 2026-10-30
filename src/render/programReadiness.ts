export interface ReadyProgram { id: number; name?: string; type?: string; isReady(): boolean }
/** The timeout is a diagnostic milestone, not permission to synchronously finish a shader. */
export async function waitForPrograms(
  programs: () => ReadyProgram[], compiled: Promise<unknown>,
  progress: (ready: number, total: number) => void,
  pending: (programs: ReadyProgram[], elapsed: number) => void,
  pause: () => Promise<void> = () => new Promise(resolve => setTimeout(resolve, 50)),
  now: () => number = () => performance.now(),
): Promise<void> {
  let settled = false, warned = false;
  void compiled.then(() => { settled = true; }, () => { settled = true; });
  const start = now();
  for (;;) {
    const all = programs(), waiting = all.filter(p => !p.isReady());
    progress(all.length - waiting.length, all.length);
    if (settled && waiting.length === 0) return;
    if (!warned && now() - start >= 60000) { warned = true; pending(waiting, now() - start); }
    await pause();
  }
}
