// Pad focus for the existing pause controls and its borrowed corner panels. Settings and in-world menus keep their own navigation.
import { PadNav, type NavInput } from "./settingsNav";

export function menuFocusStep(at: number, count: number, input: NavInput): number {
  if (!count) return -1;
  if (at < 0 || at >= count) return 0;
  const dir = input === "up" || input === "left" || input === "tabPrev" ? -1 : 1;
  return (at + dir + count) % count;
}

/** Change a native value just as mouse input does, including the listeners that apply it to the game. */
export function adjustMenuValue(el: HTMLElement, dir: -1 | 1): boolean {
  if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "range") {
    const range = el as HTMLInputElement;
    if (dir > 0) range.stepUp(); else range.stepDown();
  } else if (el.tagName === "SELECT") {
    const select = el as HTMLSelectElement, count = select.options.length;
    if (!count) return true;
    let next = select.selectedIndex;
    for (let i = 0; i < count; i++) { next = (next + dir + count) % count; if (!select.options[next].disabled) { select.selectedIndex = next; break; } }
  } else return false;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

export class MenuFocus {
  private nav = new PadNav();
  private roots: HTMLElement[] = [];
  private focused: HTMLElement | null = null;

  constructor() {
    const style = document.createElement("style");
    style.textContent = ".pad-menu-focus { outline:3px solid #ffd68c !important; outline-offset:3px; box-shadow:0 0 0 5px rgba(10,9,22,.8) !important; }";
    document.head.append(style);
  }

  /** A changed panel is primed with the held buttons, so opening it never also activates its first control. */
  update(roots: HTMLElement[], pad: Gamepad | null, now: number, back: () => void): boolean {
    const changed = roots.length !== this.roots.length || roots.some((r, i) => r !== this.roots[i]);
    if (changed) { this.clearFocus(); this.roots = roots; this.nav = new PadNav(); }
    const moves = this.nav.readBound(pad?.buttons.map(b => b.pressed) ?? [], pad?.axes ?? [], now);
    if (changed || !roots.length || !pad) return false;
    const controls = roots.flatMap(root => [...root.querySelectorAll<HTMLElement>("button, a[href], input[type=range], input[type=checkbox], select")]).filter(el => !el.matches(":disabled") && !!el.getClientRects().length);
    if (this.focused && !controls.includes(this.focused)) this.clearFocus();
    for (const move of moves) {
      if (move === "back") { back(); this.clearFocus(); break; }
      if (move === "reset") continue;
      // Text-only Controls/What's new panels still need to scroll, even though their only control is Close.
      if (controls.length === 1 && roots.length === 1 && roots[0].scrollHeight > roots[0].clientHeight && (move === "up" || move === "down")) {
        roots[0].scrollTop += move === "down" ? 100 : -100;
        continue;
      }
      const at = this.focused ? controls.indexOf(this.focused) : -1;
      if (at >= 0 && (move === "left" || move === "right" || move === "choose") && adjustMenuValue(this.focused!, move === "left" ? -1 : 1)) continue;
      if (move === "choose" && this.focused) { this.focused.click(); break; }
      const next = controls[menuFocusStep(at, controls.length, move)];
      this.clearFocus();
      if (next) { this.focused = next; next.classList.add("pad-menu-focus"); next.focus({ preventScroll: true }); next.scrollIntoView({ block: "nearest", inline: "nearest" }); }
    }
    return moves.length > 0;
  }

  private clearFocus(): void { this.focused?.classList.remove("pad-menu-focus"); this.focused = null; }
}
