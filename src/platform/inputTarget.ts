/** Native text editing owns punctuation and movement keys, including while the game is paused. */
export function textEntry(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT" && !["range", "checkbox", "button", "submit", "file"].includes((el as HTMLInputElement).type) || el.isContentEditable);
}
