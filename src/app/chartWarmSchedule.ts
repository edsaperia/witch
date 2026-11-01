export interface ChartWarmRequest { world: number; found: string[]; ids: string[] }

/** MAP's own all-island demand worker takes over; never run a duplicate speculative worker there. */
export function chartWarmEligible(state: { enabled: boolean; ready: boolean; treehouse: boolean; map: boolean; blocked: boolean }): boolean {
  return state.enabled && state.ready && state.treehouse && !state.map && !state.blocked;
}

/** Owns only speculative work. Cancelled/old replies cannot complete a newer request. */
export class ChartWarmSchedule {
  private generation = 0;
  private active = '';
  private completed = '';
  constructor(private start: (request: ChartWarmRequest, done: () => void) => void, private stop: () => void) {}
  pause(): void {
    if (!this.active) return;
    this.generation++; this.active = ''; this.stop();
  }
  tick(request: ChartWarmRequest): void {
    const key = JSON.stringify([request.world, [...request.found].sort(), request.ids]);
    if (this.active === key) return;
    if (this.completed === key) { this.pause(); return; }
    this.pause();
    const generation = ++this.generation;
    this.active = key;
    this.start(request, () => {
      if (generation !== this.generation || this.active !== key) return;
      this.active = ''; this.completed = key;
    });
  }
}
