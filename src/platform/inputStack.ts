/** One owner of keyboard/gamepad input at a time (Ed, 2026-10-30).
 * Panels migrate separately: unregistered panels keep their existing routing until their PR. */
export interface InputLayer {
  readonly id: string;
  /** DOM descendants allowed to receive native keys. Unfocused keys are swallowed. */
  acceptsKey: (event: KeyboardEvent) => boolean;
  /** Handle shortcuts before native controls. True consumes the event, even if this closes the layer. */
  key?: (event: KeyboardEvent) => boolean;
}

export class InputStack {
  private layers: InputLayer[] = [];
  private held = new Set<string>();
  private blocked = new Set<string>();

  get top(): InputLayer | null { return this.layers.at(-1) ?? null; }
  /** null means the game/legacy readers; an overlay must pass its exact registration. */
  owns(layer: InputLayer | null): boolean { return this.top === layer; }

  push(layer: InputLayer): void {
    if (this.layers.includes(layer)) return;
    this.layers.push(layer);
    this.quarantine();
  }

  remove(layer: InputLayer): void {
    const at = this.layers.indexOf(layer);
    if (at < 0) return;
    const wasTop = this.top === layer;
    this.layers.splice(at, 1);
    if (wasTop) this.quarantine();
  }

  /** Keys held across a change of owner must be released before they act in the new owner. */
  private quarantine(): void { for (const code of this.held) this.blocked.add(code); }

  /** Called once in window capture, for both keydown and keyup. True means stop propagation.
   * Only the top handler runs; closing it cannot dispatch the same key to the newly exposed layer. */
  key(event: KeyboardEvent): boolean {
    const up = event.type === "keyup";
    if (up) this.held.delete(event.code); else this.held.add(event.code);
    if (this.blocked.has(event.code)) {
      if (up) this.blocked.delete(event.code);
      return true;
    }
    const layer = this.top;
    if (!layer) return false;
    if (layer.key?.(event)) return true;
    // A handler may change the stack; it still owns the entire event.
    return this.top !== layer || !layer.acceptsKey(event);
  }

  /** Browser focus loss releases physical keys; no subsequent keyup is guaranteed. */
  release(): void { this.held.clear(); this.blocked.clear(); }
}

/** The page's single stack; Freeze installs the capture adapter before overlay listeners. */
export const inputStack = new InputStack();
