interface JoinPreparation<T> {
  restore(): T | Promise<T>;
  prepare(value: T, signal: AbortSignal): Promise<void>;
  trace(stage: string, detail?: unknown): void;
  fail(error: Error): void;
  timeoutMs?: number;
}

/** Every rejection and a never-settling async preparation get an attributed, bounded outcome. */
export async function prepareJoin<T>(options: JoinPreparation<T>): Promise<boolean> {
  const controller = new AbortController();
  let phase = "replay-restore", timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`Guest joining timed out during ${phase}`)), options.timeoutMs ?? 175000);
  });
  const task = async () => {
    options.trace("replay-restore:start");
    const value = await options.restore();
    controller.signal.throwIfAborted(); options.trace("replay-restore:done");
    phase = "view-preparation"; options.trace("prepare:invoke");
    await options.prepare(value, controller.signal);
    controller.signal.throwIfAborted(); options.trace("prepare:resolved");
  };
  try { await Promise.race([task(), deadline]); return true; }
  catch (value) {
    controller.abort();
    const error = value instanceof Error ? value : new Error(String(value));
    options.trace(`${phase}:failed`, { message: error.message, stack: error.stack });
    options.fail(error); return false;
  } finally { clearTimeout(timer); }
}
