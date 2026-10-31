/** Owns only the timed-out night's loading hold. Another night and every normal arrival bypass it. */
export class LandingSleep<T extends object> {
  private night: T | null = null;
  begin(night: T): void { this.night = night; }
  holds(night: T): boolean { return this.night === night; }
  release(night: T, houseReady: boolean): boolean {
    if (!this.holds(night) || !houseReady) return false;
    this.night = null; return true;
  }
}
