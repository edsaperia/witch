/** Decide whether the retained world canvas needs replacing. Menu updates run independently. */
export class WorldDrawGate {
  private lastArt = -1;
  private lastView = -1;
  private lastStep = -1;

  shouldDraw(covered: boolean, paused: boolean, title: boolean, art: number, view: number, step: number): boolean {
    if (covered) return false;
    return !paused || view !== this.lastView || step !== this.lastStep || (title && art !== this.lastArt);
  }

  drawn(art: number, view: number, step: number): void {
    this.lastArt = art;
    this.lastView = view;
    this.lastStep = step;
  }
}
