// "A newer version is out" (Ed, 2026-10-14: rather than finding out from menus that won't open, the game says so when the page
// he has open is no longer the latest build). Each build writes version.json beside the game (vite.config.ts: the site's root for
// main, pr-<number>/ for a pull request's preview); the page reads it on load, when paused and every few minutes, never from a
// cache, and shows a small notice in the bedroom and on the pause page while a newer build is up. Hotel's #906 (a menu whose
// code has been replaced under it) shows the same notice.

/** The build's number from its label ("v3712 · 0c668fd" → 3712), or null for a local build ("dev"). */
export const buildNumber = (label: string): number | null => { const m = /^v(\d+)/.exec(label.trim()); return m ? Number(m[1]) : null; };

/** Whether the build at `latest` (version.json's label) is newer than this page's `mine`. */
export const isNewer = (mine: string, latest: string): boolean => {
  const a = buildNumber(mine), b = buildNumber(latest);
  return a !== null && b !== null && b > a;
};

const EVERY_MS = 5 * 60 * 1000;

export class NewBuildNotice {
  /** The newer build's label, once one is seen; null while this page is the latest (or it can't tell). */
  latest: string | null = null;
  private shown = false;
  private checking: Promise<void> | null = null;
  constructor(private readonly mine: string, private readonly el: HTMLElement | null, private readonly url = "version.json") {
    if (buildNumber(mine) === null) return; // (a local build: nothing to compare)
    el?.querySelector("button")?.addEventListener("click", () => location.reload());
    setTimeout(() => void this.check(), 4000); // (on load, once the start's art is under way)
    setInterval(() => void this.check(), EVERY_MS);
  }
  /** Read version.json now (at most one read at a time; a failure says nothing). */
  check(): Promise<void> {
    if (buildNumber(this.mine) === null) return Promise.resolve();
    return (this.checking ??= fetch(`${this.url}?t=${Date.now()}`, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then((v: { version?: string } | null) => { if (v?.version && isNewer(this.mine, v.version)) this.latest = v.version; })
      .catch(() => { /* offline, or no version.json yet: nothing to say */ })
      .finally(() => { this.checking = null; }));
  }
  /** Show it (if there's a newer build) or hide it: the bedroom and the pause page say `on`. Cheap to call every frame. */
  update(on: boolean): void {
    const want = on && this.latest !== null;
    if (want === this.shown || !this.el) return;
    this.shown = want;
    if (want) { const b = this.el.querySelector("b"); if (b) b.textContent = this.latest!.split(" ")[0]; }
    this.el.classList.toggle("on", want);
  }
}
