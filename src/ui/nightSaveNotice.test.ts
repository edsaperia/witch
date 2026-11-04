// The saved-night notice (src/ui/resumeNight.ts nightSaveNotice; Ed, 2026-11-03: "is this going to stay on my screen for the whole
// session?"): an informational one goes by itself after `hideAfter` seconds, every one has a × that closes it, and a failure's
// (no hideAfter) stays until closed.
import { afterEach, describe, expect, it, vi } from "vitest";

type El = { id?: string; tag: string; style: Record<string, string>; dataset: Record<string, string>; attrs: Record<string, string>; children: El[]; textContent: string; onclick?: () => void; removed: boolean; append(...a: El[]): void; remove(): void };
const made: El[] = [];
const el = (tag: string, o: { id?: string; text?: string; attrs?: Record<string, string>; style?: Record<string, string> } = {}): El => {
  const e: El = { tag, id: o.id, style: { ...(o.style ?? {}) }, dataset: {}, attrs: { ...(o.attrs ?? {}) }, children: [], removed: false,
    get textContent() { return (this as El & { _t?: string })._t ?? ""; }, set textContent(v: string) { (this as El & { _t?: string })._t = v; this.children = []; },
    append(...a: El[]) { this.children.push(...a); }, remove() { this.removed = true; } };
  if (o.text) e.textContent = o.text;
  made.push(e);
  return e;
};
vi.mock("./dom", () => ({ h: (tag: string, o: { id?: string; text?: string; attrs?: Record<string, string>; style?: Record<string, string> }) => el(tag, o) }));

function stubDocument() {
  const body: El[] = [];
  vi.stubGlobal("document", {
    getElementById: (id: string) => body.find(e => e.id === id && !e.removed) ?? null,
    body: { append: (e: El) => body.push(e) },
  });
}

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); made.length = 0; });

describe("the saved-night notice", () => {
  it("goes by itself after hideAfter seconds when it's only telling her something", async () => {
    vi.useFakeTimers(); stubDocument();
    const { nightSaveNotice } = await import("./resumeNight");
    nightSaveNotice("This link opens a different night.", "/witch/?seed=1", { hideAfter: 12 });
    const notice = made.find(e => e.id === "night-save-notice")!;
    expect(notice.removed).toBe(false);
    vi.advanceTimersByTime(11_900);
    expect(notice.removed).toBe(false);
    vi.advanceTimersByTime(100);
    expect(notice.style.opacity).toBe("0");
    vi.advanceTimersByTime(700);
    expect(notice.removed).toBe(true);
  });

  it("stays when there's no hideAfter (a save failure), until its × is pressed", async () => {
    vi.useFakeTimers(); stubDocument();
    const { nightSaveNotice } = await import("./resumeNight");
    nightSaveNotice("Saving failed.");
    const notice = made.find(e => e.id === "night-save-notice")!;
    vi.advanceTimersByTime(600_000);
    expect(notice.removed).toBe(false);
    const close = notice.children.find(c => c.tag === "button")!;
    expect(close.attrs["aria-label"]).toBe("Close");
    close.onclick!();
    expect(notice.removed).toBe(true);
  });
});
