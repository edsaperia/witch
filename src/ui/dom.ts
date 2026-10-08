// The UI's one way to make an element (overnight programme, phase 1: "one UI component pattern"): h(tag, props, ...children)
// makes it, sets its class, id, text, title, type, data-* and other attributes, its inline style (in the order given: a
// shorthand before its longhands), its listeners, and appends its children. The creator, the scroll, the bot game's tag and
// the decisions panel build their DOM with it, so a look lives in one style object and a control's wiring beside it.

type Style = Partial<Record<keyof CSSStyleDeclaration, string>>;
type Listeners = { [E in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[E]) => void };

export interface Props {
  class?: string;
  id?: string;
  /** Its text (textContent). */
  text?: string;
  /** Its markup (innerHTML): only for the creator's own fixed strings. */
  html?: string;
  title?: string;
  /** A button's or an input's type. */
  type?: string;
  /** data-* attributes (dataset). */
  data?: Record<string, string>;
  /** Other attributes (aria-label, role...). */
  attrs?: Record<string, string>;
  /** Inline style, applied in the order given. */
  style?: Style;
  on?: Listeners;
}

/** Makes a `tag` element with `p` set and `kids` appended (strings as text). */
export function h<K extends keyof HTMLElementTagNameMap>(tag: K, p: Props = {}, ...kids: (Node | string)[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (p.class !== undefined) el.className = p.class;
  if (p.id !== undefined) el.id = p.id;
  if (p.type !== undefined) (el as HTMLInputElement).type = p.type;
  if (p.html !== undefined) el.innerHTML = p.html;
  if (p.text !== undefined) el.textContent = p.text;
  if (p.title !== undefined) el.title = p.title;
  if (p.data) for (const [k, v] of Object.entries(p.data)) el.dataset[k] = v;
  if (p.attrs) for (const [k, v] of Object.entries(p.attrs)) el.setAttribute(k, v);
  if (p.style) Object.assign(el.style, p.style);
  if (p.on) for (const [ev, f] of Object.entries(p.on)) el.addEventListener(ev, f as EventListener);
  if (kids.length) el.append(...kids);
  return el;
}

/** A plain button (type "button") with its text, its look and its click. */
export const button = (text: string, onClick: (e: MouseEvent) => void, p: Props = {}): HTMLButtonElement =>
  h("button", { type: "button", text, ...p, on: { ...p.on, click: onClick } });
