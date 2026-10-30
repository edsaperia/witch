import { slotStorage } from "../app/saveSlots";
// The decisions as data (config/decisions.json) and their knobs (the tuning paths, the URL's d_<id>): what the game needs as it
// starts, apart from the panel itself (ui/decide.ts), so the panel can load only when it's opened (?decide, F2).
import DECISIONS from "../../config/decisions.json";
// (one fragment a pull request's group, config/decisions/<pr>-<group>.json, collected newest PR first, the file's own array after
// them: Ed, 2026-10-13, so builders adding sliders don't collide; node tools/data.mjs decisions adopt moves a pasted entry out)
const FRAGMENTS = import.meta.glob<{ pr?: number; group?: string; pinned?: boolean; decisions: Decision[] }>("../../config/decisions/*.json", { eager: true, import: "default" });

export type Control = { type: "toggle" } | { type: "choice"; options: { value: string; label: string }[] } | { type: "slider"; min: number; max: number; step: number; /** a colour swatch beside it, from these two knobs (hue and saturation, 0 to 1); the hue slider's own track drawn as the hues */ swatch?: { hue: string; sat: string } };
export interface Decision { id: string; /** the pull request that added it */ pr?: number; /** that PR's short name (the pause page's heading: "#pr group") */ group?: string; label: string; note: string; control: Control; default: string | number | boolean; /** kept on this browser (localStorage witch.settings) and taken again as the game loads: app/settings.ts (Ed, 2026-10-14: the volumes) */ persist?: boolean; /** its group pinned at the top of the pause page (the fragment's flag), headed by its name alone */ pinned?: boolean; apply: { knob?: string; param?: string; reload?: boolean } }
/** Every decision: the fragments' (newest pull request first, each in its file's order) and then the file's own. */
export const DECISION_LIST: Decision[] = [
  ...Object.keys(FRAGMENTS).sort((a, b) => Number(b.split("/").pop()!.split("-")[0]) - Number(a.split("/").pop()!.split("-")[0]) || a.localeCompare(b)).flatMap(f => FRAGMENTS[f].decisions.map(d => ({ pr: FRAGMENTS[f].pr, group: FRAGMENTS[f].group, ...(FRAGMENTS[f].pinned ? { pinned: true } : {}), ...d }))),
  ...(DECISIONS as unknown as { decisions: Decision[] }).decisions,
];
/** Where an issue is opened. */
export const ISSUES = "https://github.com/edsaperia/witch/issues/new";
/** The URL param a knob's choice is kept in. */
export const knobParam = (id: string) => `d_${id}`;

/** A knob's value by its dotted path in the tuning (undefined if there's none). */
export function knobAt(tuning: object, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), tuning);
}
/** Set a knob by its dotted path (its parents must exist). */
export function setKnob(tuning: object, path: string, v: unknown): void {
  const keys = path.split("."), last = keys.pop()!;
  const parent = keys.reduce<Record<string, unknown>>((o, k) => o[k] as Record<string, unknown>, tuning as Record<string, unknown>);
  parent[last] = v;
}
/** A raw string (a URL param's) as the decision's own kind of value. */
export function parseValue(d: Decision, raw: string): string | number | boolean {
  if (d.control.type === "slider") { const n = Number(raw), c = d.control; return Number.isFinite(n) ? Math.min(c.max, Math.max(c.min, n)) : (d.default as number); }
  if (d.control.type === "toggle") return raw === "1" || raw === "true" || raw === "on";
  return d.control.options.some(o => o.value === raw) ? raw : (d.default as string);
}
/** Its value now: a knob's from the tuning, a switch's from the URL (else its default). */
export function currentValue(d: Decision, tuning: object, params: URLSearchParams): string | number | boolean {
  if (d.apply.knob) { const v = knobAt(tuning, d.apply.knob); return (v as string | number | boolean) ?? d.default; }
  const raw = params.get(d.apply.param!);
  return raw === null ? d.default : parseValue(d, raw);
}
/** The line a confirmed choice is sent as (the issue's title, the clipboard's first line). */
export const decisionLine = (id: string, value: unknown) => `Decision: ${id} = ${value}`;
/** The new-issue link for a confirmed choice: title, the decision label, and a body with the version, seed, link and the whole panel. */
export function issueUrl(id: string, value: unknown, panel: Record<string, unknown>, version: string, seed: number, link: string): string {
  const body = [`**${id}** = \`${value}\``, "", `- game: ${version}`, `- seed: ${seed}`, `- link: ${link}`, "", "The whole panel:", "```json", JSON.stringify(panel, null, 1), "```", "", "(sent from the game's decisions panel, ?decide)"].join("\n");
  return `${ISSUES}?labels=decision&title=${encodeURIComponent(decisionLine(id, value))}&body=${encodeURIComponent(body)}`;
}

/** Knob choices kept in the URL (d_<id>) put on the tuning, as the game starts. */
export function applyKnobParams(tuning: object, params: URLSearchParams): void {
  for (const d of DECISION_LIST) {
    const raw = d.apply.knob ? params.get(knobParam(d.id)) : null;
    if (raw !== null && knobAt(tuning, d.apply.knob!) !== undefined) setKnob(tuning, d.apply.knob!, parseValue(d, raw));
  }
}

/** Its group's heading: the PR that added it and that PR's short name ("#495 Ground fog"; Ed, 2026-10-12: "The panel shows all
 *  the sliders in PR order"). */
export const groupOf = (d: Decision): string => (d.pinned ? d.group ?? "Settings" : d.pr ? `#${d.pr} ${d.group ?? ""}`.trim() : d.group ?? "Other");
/** The registry in the pause page's order: by PR, newest first (those without one last), each PR's in the registry's order. */
export const byPr = (list: readonly Decision[]): Decision[] => list.map((d, i) => ({ d, i })).sort((a, b) => (b.d.pinned ? 1 : 0) - (a.d.pinned ? 1 : 0) || (b.d.pr ?? -1) - (a.d.pr ?? -1) || a.i - b.i).map(x => x.d); // (the pinned groups first: the Volume)
/** How many of a group's entries differ from built (its header's count on the pause page). */
export const changedIn = (list: readonly Decision[], values: ReadonlyMap<string, unknown>): number => list.filter(d => values.has(d.id) && values.get(d.id) !== d.default).length;
/** The pause page's groups the player left open (Ed, 2026-10-26: "grouped by their title with the ability to fold, and start
 *  folded"): every group starts folded, those opened remembered on this browser (localStorage witch.pauseOpen) so a reload keeps them. */
const OPEN_KEY = "witch.pauseOpen";
export const openGroups = (): Set<string> => { try { const t = slotStorage.getItem(OPEN_KEY), a = t ? JSON.parse(t) : []; return new Set(Array.isArray(a) ? a.filter(x => typeof x === "string") : []); } catch { return new Set(); } };
export const saveOpenGroups = (open: ReadonlySet<string>): void => { try { slotStorage.setItem(OPEN_KEY, JSON.stringify([...open])); } catch { /* storage blocked: this load only */ } };
/** What it changes, as Ed would name it to a builder: the tuning key, or the URL switch. */
export const keyOf = (d: Decision): string => d.apply.knob ?? `?${d.apply.param}`;

/** The pause page's Copy values (Ed, 2026-10-12: "a button that copies all the slider names and positions so I can paste them
 *  to you here"): a heading line (the game's version and seed), then a line for every test slider and switch under its PR's
 *  heading ("#290 Legend layers:", newest PR first):
 *  label, its tuning key, its value now and its built default (● when they differ). Plain text, paste-ready. */
export function valuesText(values: ReadonlyMap<string, string | number | boolean>, version: string, seed: number, all: readonly Decision[] = DECISION_LIST): string {
  const out = [`Test sliders · ${version} · seed ${seed}`], list = byPr(all);
  for (const g of [...new Set(list.map(groupOf))]) {
    out.push("", `${g}:`);
    for (const d of list.filter(x => groupOf(x) === g)) {
      const v = values.get(d.id) ?? d.default;
      out.push(`${v !== d.default ? "● " : "  "}${d.label} · ${keyOf(d)} = ${v} (built ${d.default})`);
    }
  }
  return out.join("\n");
}
