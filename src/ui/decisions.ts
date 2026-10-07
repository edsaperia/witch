// The decisions as data (config/decisions.json) and their knobs (the tuning paths, the URL's d_<id>): what the game needs as it
// starts, apart from the panel itself (ui/decide.ts), so the panel can load only when it's opened (?decide, F2).
import DECISIONS from "../../config/decisions.json";

export type Control = { type: "toggle" } | { type: "choice"; options: { value: string; label: string }[] } | { type: "slider"; min: number; max: number; step: number };
export interface Decision { id: string; label: string; note: string; control: Control; default: string | number | boolean; apply: { knob?: string; param?: string; reload?: boolean } }
export const DECISION_LIST = (DECISIONS as unknown as { decisions: Decision[] }).decisions;
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
