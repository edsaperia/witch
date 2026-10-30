// A loaded module is cached; screen construction/showing belongs to the current request only.
export interface LazyScreenHost<Module, Context> {
  valid(context: Context): boolean;
  /** Synchronously reserve this screen's input and wake audio in the original gesture, if needed.
   * Release must undo only this lease, preserving a newer screen/pause owner's claim. */
  claim(context: Context): () => void;
  loading(context: Context, on: boolean): void;
  show(module: Module, context: Context): void;
  hide(module: Module, context: Context): void;
  failed(error: unknown, context: Context): void;
}
interface Request<Module, Context> {
  context: Context; release: () => void; loading: boolean; shown?: { module: Module }; task?: Promise<boolean>;
}
/** No DOM, listeners, simulation writes or imports until open. The host adapts the current input stack. */
export class LazyScreen<Module, Context> {
  private loaded?: { module: Module };
  private flight?: Promise<Module>;
  private request?: Request<Module, Context>;
  constructor(private load: () => Promise<Module>, private host: LazyScreenHost<Module, Context>) {}
  get pending(): boolean { return !!this.request && !this.request.shown; }
  get openNow(): boolean { return !!this.request?.shown; }
  private module(): Promise<Module> {
    if (this.loaded) return Promise.resolve(this.loaded.module);
    return this.flight ??= Promise.resolve().then(this.load).then(module => {
      this.loaded = { module }; return module;
    }, error => { this.flight = undefined; throw error; });
  }
  open(context: Context): Promise<boolean> {
    if (this.request && this.host.valid(this.request.context)) return this.request.task!;
    this.close();
    if (!this.host.valid(context)) return Promise.resolve(false);
    const request: Request<Module, Context> = { context, release: this.host.claim(context), loading: true };
    this.request = request;
    request.task = Promise.resolve().then(() => {
      if (this.request !== request) return undefined;
      this.host.loading(context, true); return this.module();
    }).then(module => {
      if (this.request !== request) return false;
      if (!this.host.valid(context)) { this.close(); return false; }
      request.loading = false; this.host.loading(context, false);
      request.shown = { module: module as Module };
      this.host.show(module as Module, context);
      return this.request === request;
    }).catch(error => {
      if (this.request !== request) return false;
      const current = this.host.valid(context);
      try { this.close(); } finally { if (current) this.host.failed(error, context); }
      return false;
    });
    return request.task;
  }
  /** Call when dismissed or the owner/night changes. A stale import cannot reopen this request. */
  close(): void {
    const request = this.request; if (!request) return;
    this.request = undefined;
    try {
      if (request.loading) this.host.loading(request.context, false);
    } finally {
      try { if (request.shown) this.host.hide(request.shown.module, request.context); }
      finally { request.release(); }
    }
  }
}
