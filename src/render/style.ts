// The art style from config/style.json: a style saved in the Witch Art Lab (the whole saved
// object, or just its `style`), laid over the Lab's defaults.
import raw from "../../config/style.json";
import { defaultStyle } from "../../art/generator.js";

export type Style = Record<string, number> & Record<string, any>;

export function loadStyle(json: unknown = raw): Style {
  const j = (json ?? {}) as { style?: Record<string, unknown> };
  const given = j.style && typeof j.style === "object" ? j.style : (j as Record<string, unknown>);
  const st = defaultStyle() as Style;
  for (const [k, v] of Object.entries(given)) if (k in st) st[k] = v as never;
  return st;
}
