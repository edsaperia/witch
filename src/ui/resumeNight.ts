import { h } from "./dom";

/** Chosen before input and the night are created, so the choice cannot also move the witch. */
export function chooseSavedNight(savedAt: number): Promise<boolean> {
  return new Promise(resolve => {
    const resume = h("button", { type: "button", text: "Resume night" });
    const fresh = h("button", { type: "button", text: "Start a new night" });
    const title = h("h2", { id: "resume-title", text: "Continue your night?" });
    const dialog = h("dialog", { id: "resume-night", attrs: { "aria-labelledby": "resume-title" }, style: {
      color: "#eee6d6", background: "#191422", border: "1px solid #8b7753", borderRadius: "8px", padding: "28px", maxWidth: "360px", font: "18px ui-monospace, monospace",
    } }, title, h("p", { text: `Your night was saved ${new Date(savedAt).toLocaleString()}.` }), h("p", { text: "Starting a new night replaces this save." }), resume, fresh);
    const css = h("style", { text: "#resume-night::backdrop{background:rgba(0,0,0,.85)}#resume-night button{font:inherit;display:block;width:100%;margin-top:14px;padding:12px;color:inherit;background:#32283f;border:1px solid #8b7753;cursor:pointer}#resume-night button:focus-visible{outline:3px solid #e0c780}" });
    let done = false, frame = 0, held = true;
    const finish = (yes: boolean) => { if (done) return; done = true; cancelAnimationFrame(frame); dialog.close(); dialog.remove(); css.remove(); resolve(yes); };
    resume.onclick = () => finish(true); fresh.onclick = () => finish(false);
    dialog.oncancel = e => { e.preventDefault(); fresh.focus(); };
    document.head.append(css); document.body.append(dialog); dialog.showModal(); resume.focus();
    const poll = () => {
      if (done) return;
      const pad = [...(navigator.getGamepads?.() ?? [])].find(p => p?.connected);
      const buttons = pad?.buttons ?? [], choose = !!buttons[0]?.pressed, back = !!buttons[1]?.pressed;
      const direction = !!buttons[12]?.pressed || !!buttons[13]?.pressed || Math.abs(pad?.axes[1] ?? 0) > 0.5;
      const any = choose || back || direction;
      if (any && !held) {
        if (back) fresh.focus();
        else if (choose) finish(document.activeElement !== fresh);
        else (document.activeElement === resume ? fresh : resume).focus();
      }
      held = any; frame = requestAnimationFrame(poll);
    };
    frame = requestAnimationFrame(poll);
  });
}

/** Saving must never silently fail; keep one quiet, visible status instead of repeated alerts. A notice that's only telling her
 *  something (not a failure) can go by itself: `hideAfter` seconds, and every notice has a × to close it (Ed, 2026-11-03: "is
 *  this going to stay on my screen for the whole session?"). */
export function nightSaveNotice(text: string, resumeHref?: string, o: { hideAfter?: number } = {}): void {
  let el = document.getElementById("night-save-notice");
  if (!el) { el = h("p", { id: "night-save-notice", attrs: { role: "status" }, style: { position: "fixed", bottom: "8px", left: "12px", zIndex: "2001", background: "#191422", color: "#eee6d6", padding: "8px 28px 8px 8px", font: "13px ui-monospace, monospace", maxWidth: "420px", transition: "opacity 0.6s" } }); document.body.append(el); }
  const notice = el;
  clearTimeout(Number(notice.dataset.hide ?? 0));
  notice.style.opacity = "1";
  notice.textContent = text;
  if (resumeHref) notice.append(h("a", { text: "Resume saved night", attrs: { href: resumeHref }, style: { color: "#e0c780", display: "block", marginTop: "6px" } }));
  const close = h("button", { type: "button", text: "×", attrs: { "aria-label": "Close" }, style: { position: "absolute", top: "2px", right: "4px", background: "none", border: "none", color: "#eee6d6", font: "16px ui-monospace, monospace", cursor: "pointer", padding: "2px 6px" } });
  close.onclick = () => notice.remove();
  notice.append(close);
  if (o.hideAfter !== undefined) notice.dataset.hide = String(setTimeout(() => { notice.style.opacity = "0"; setTimeout(() => notice.remove(), 700); }, Math.max(0, o.hideAfter) * 1000));
}
