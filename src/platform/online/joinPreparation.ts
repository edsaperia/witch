interface JoinPreparation<T> {
  restore(): T | Promise<T>;
  prepare(value: T, signal: AbortSignal): Promise<void>;
  trace(stage: string, detail?: unknown): void;
  fail(error: Error): void;
  progress?(): number;
  stallMs?: number;
  absoluteMs?: number;
  signal?: AbortSignal;
}

/** Every rejection and a never-settling async preparation get an attributed, bounded outcome. */
export async function prepareJoin<T>(options: JoinPreparation<T>): Promise<boolean> {
  const controller = new AbortController();
  let cancel: (() => void) | undefined;
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancel = () => { controller.abort(); reject(new Error("Guest joining was cancelled")); };
    if (options.signal?.aborted) cancel(); else options.signal?.addEventListener("abort", cancel, { once: true });
  });
  let phase = "replay-restore", timer: ReturnType<typeof setInterval> | undefined;
  const started = Date.now();
  let advancedAt = started, progress = options.progress?.() ?? 0;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setInterval(() => {
      const current = options.progress?.() ?? 0, now = Date.now();
      if (Number.isSafeInteger(current) && current > progress) { progress = current; advancedAt = now; }
      if (now - started >= (options.absoluteMs ?? 600000)) reject(new Error(`Guest joining reached its maximum wait during ${phase}`));
      else if (now - advancedAt >= (options.stallMs ?? 90000)) reject(new Error(`Guest joining stalled during ${phase}`));
    }, Math.min(1000, options.stallMs ?? 90000, options.absoluteMs ?? 600000));
  });
  const task = async () => {
    controller.signal.throwIfAborted();
    options.trace("replay-restore:start");
    const value = await options.restore();
    controller.signal.throwIfAborted(); options.trace("replay-restore:done");
    phase = "view-preparation"; options.trace("prepare:invoke");
    await options.prepare(value, controller.signal);
    controller.signal.throwIfAborted(); options.trace("prepare:resolved");
  };
  try { await Promise.race([task(), deadline, cancelled]); return true; }
  catch (value) {
    controller.abort();
    const error = value instanceof Error ? value : new Error(String(value));
    options.trace(`${phase}:failed`, { message: error.message, stack: error.stack });
    options.fail(error); return false;
  } finally { clearInterval(timer); if (cancel) options.signal?.removeEventListener("abort", cancel); }
}
