export interface ReadyProgram { id: number; name?: string; type?: string; isReady(): boolean }
/** Three's production first-use log reads are disabled. Still report broken links, only after KHR completion. */
export function monitorProgramLink(gl: Pick<WebGLRenderingContext, 'getProgramParameter' | 'getProgramInfoLog' | 'LINK_STATUS'>, p: ReadyProgram & { program?: WebGLProgram }, report: (message: string) => void): void {
  const ready = p.isReady.bind(p); let checked = false;
  p.isReady = () => {
    if (!ready()) return false;
    if (!checked && p.program) {
      checked = true;
      if (!gl.getProgramParameter(p.program, gl.LINK_STATUS)) report(`Shader program ${p.id} (${p.name ?? p.type ?? 'unknown'}) failed linking: ${gl.getProgramInfoLog(p.program) ?? '(no log)'}`);
    }
    return true;
  };
}
/** The timeout is a diagnostic milestone, not permission to synchronously finish a shader. */
export async function waitForPrograms(
  programs: () => ReadyProgram[], compiled: Promise<unknown>,
  progress: (ready: number, total: number) => void,
  pending: (programs: ReadyProgram[], elapsed: number) => void,
  pause: () => Promise<void> = () => new Promise(resolve => setTimeout(resolve, 50)),
  now: () => number = () => performance.now(),
  until: () => number = () => Infinity,
): Promise<boolean> {
  let settled = false, warned = false;
  void compiled.then(() => { settled = true; }, () => { settled = true; });
  const start = now();
  for (;;) {
    const all = programs(), waiting = all.filter(p => !p.isReady());
    progress(all.length - waiting.length, all.length);
    if (settled && waiting.length === 0) return true;
    if (now() >= until()) return false;
    if (!warned && now() - start >= 60000) { warned = true; pending(waiting, now() - start); }
    await pause();
  }
}
