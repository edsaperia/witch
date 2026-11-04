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

/** The newest deploy for a fresh game (Ed, 2026-11-03: "a link that always starts a fresh game with the latest version"): as it boots,
 *  ?fresh reads version.json (never from a cache) and, if a newer build is up than the one running (index.html cached by the browser,
 *  up to Pages' ten minutes), gives the link to load instead: this one with ?latest=<its number>, a URL no cache holds, and ?fresh=1
 *  again if this page began the fresh game (`restart`). Once at most: a link with ?latest gets none (null), whatever version.json says,
 *  so a CDN still serving the old page can't loop. Null too for a local build, the latest, or no answer within `wait` ms. */
export async function latestBuildLink(mine: string, href: string, opts: { restart?: boolean; url?: string; wait?: number; fetcher?: (url: string, init: RequestInit) => Promise<Pick<Response, "ok" | "json">> } = {}): Promise<string | null> {
  const link = new URL(href);
  if (buildNumber(mine) === null || link.searchParams.has("latest")) return null;
  const { url = "version.json", wait = 3000, fetcher = fetch } = opts;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const late = new Promise<null>(resolve => { timer = setTimeout(() => resolve(null), wait); });
  const read = fetcher(`${url}?t=${Date.now()}`, { cache: "no-store" }).then(r => (r.ok ? r.json() : null)).then((v: { version?: unknown } | null) => (typeof v?.version === "string" ? v.version : null)).catch(() => null);
  const latest = await Promise.race([read, late]);
  clearTimeout(timer);
  if (!latest || !isNewer(mine, latest)) return null;
  link.searchParams.set("latest", String(buildNumber(latest)));
  if (opts.restart) link.searchParams.set("fresh", "1");
  return link.toString();
}
