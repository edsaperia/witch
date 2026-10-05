// The start screen, full screen (Ed, 2026-10-05: "the text area can be full screen so it's easy to
// read the text, and show what's new in this build and what's upcoming"): the title and how to
// start, the progress and wave selector, then "New in vNNN" (this build's changes, each with its
// bullets, and the versions before it, dimmer) beside "Coming up" (the work in flight), and the
// controls at the bottom. It lays out the start card already in index.html (#start), so the page
// keeps its ids; the game's art glows dimly behind. Any key starts (main.ts's input.onAny); a click
// starts, and so does a tap, though a touch that drags scrolls the text instead.
import "./startScreen.css";
import type { ChangelogVersion } from "../changelog";
import type { UpcomingItem } from "./upcoming";

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** "2026-10-05" as "5 Oct 2026". */
function niceDate(d: string | null): string {
  if (!d) return "";
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${y}`;
}

function changesHtml(v: ChangelogVersion): string {
  return v.changes.map(c => `${c.title ? `<h3>${esc(c.title)}</h3>` : ""}<ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`).join("");
}

export interface StartScreenOptions {
  /** The start screen (#start, with its .card). */
  el: HTMLElement;
  /** This build's name ("v457", or "dev") and the day it was built. */
  build: string;
  builtOn: string;
  versions: ChangelogVersion[];
  upcoming: UpcomingItem[];
  /** How many earlier versions to show under this one. */
  earlier?: number;
}

/** Lay the start card out full screen and fill in What's new and Coming up. */
export function setupStartScreen(o: StartScreenOptions): void {
  const { el } = o, card = el.querySelector<HTMLElement>(".card");
  if (!card) return;
  el.classList.add("full");
  const pick = (sel: string) => card.querySelector<HTMLElement>(sel);
  const title = pick("h1"), tagline = title?.nextElementSibling as HTMLElement | null, go = pick(".go"), progress = pick("#progress"), waves = pick("#waves"), news = pick("#news"), keys = pick(".keys");

  const head = document.createElement("header");
  head.className = "ss-head";
  if (title) head.append(title);
  if (tagline && tagline !== go) { tagline.classList.add("ss-tagline"); head.append(tagline); }
  const stamp = document.createElement("div");
  stamp.className = "ss-stamp";
  stamp.textContent = `${o.build} · built ${niceDate(o.builtOn)}`;
  head.append(stamp);

  const start = document.createElement("div");
  start.className = "ss-go";
  for (const n of [go, progress, waves]) if (n) start.append(n);

  // New in this build: the current build's changes (version null), or else the latest version's.
  const [now, ...rest] = o.versions.filter(v => v.changes.some(c => c.items.length));
  const nowName = now ? (now.version === null ? o.build : `v${now.version}`) : o.build;
  const nowDate = now?.version === null ? o.builtOn : now?.date ?? null;
  const fresh = document.createElement("section");
  fresh.className = "ss-new";
  fresh.innerHTML = `<h2>New in ${esc(nowName)}<span class="ss-date">${esc(niceDate(nowDate))}</span></h2>` +
    (now ? changesHtml(now) : `<p class="ss-none">Nothing new written up for this build.</p>`) +
    rest.slice(0, o.earlier ?? 2).map(v => `<div class="ss-earlier"><h2>v${v.version}<span class="ss-date">${esc(niceDate(v.date))}</span></h2>${changesHtml(v)}</div>`).join("");
  if (news) { news.replaceChildren(); news.append(fresh); }

  const up = document.createElement("section");
  up.className = "ss-up";
  up.id = "upcoming";
  up.innerHTML = `<h2>Coming up</h2>` + (o.upcoming.length
    ? `<ul>${o.upcoming.map(i => `<li><b>${esc(i.title)}</b>${i.summary ? `<span>${esc(i.summary)}</span>` : ""}</li>`).join("")}</ul>`
    : `<p class="ss-none">Listed in the published builds: the work in flight, from the open pull requests.</p>`);

  const body = document.createElement("div");
  body.className = "ss-body";
  body.append(news ?? fresh, up);
  if (keys) keys.classList.add("ss-keys");
  card.replaceChildren(head, start, body, ...(keys ? [keys] : []));
}

/** Start on a click (not on the scrollbar, a button or a link) or a tap; a touch that moves scrolls instead. */
export function startOnGesture(el: HTMLElement, start: () => boolean): void {
  let touch: { x: number; y: number; t: number; id: number } | null = null;
  const onControl = (e: Event) => !!(e.target as Element | null)?.closest?.("button, a, input, select, label");
  el.addEventListener("pointerdown", e => {
    if (onControl(e)) return;
    if (e.pointerType === "touch") { touch = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId }; return; }
    if (e.target === el && e.offsetX >= el.clientWidth) return; // the scrollbar
    e.preventDefault();
    start();
  });
  el.addEventListener("pointerup", e => {
    const t = touch;
    touch = null;
    if (!t || e.pointerId !== t.id || onControl(e)) return;
    if (Math.hypot(e.clientX - t.x, e.clientY - t.y) < 12 && performance.now() - t.t < 700) start();
  });
  el.addEventListener("pointercancel", () => { touch = null; }); // the browser took the touch for a scroll
}
