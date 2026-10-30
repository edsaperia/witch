import { COMMENT_TEXT } from "../app/playtestComments";

/** Keep normal text editing, including periods and Enter, entirely inside the pause page. */
export function commentControls(save: (text: string) => Promise<string>, restore: (file: File) => Promise<void>): HTMLElement {
  const box = document.createElement("section"), label = document.createElement("label"), input = document.createElement("textarea"), button = document.createElement("button"), status = document.createElement("p"), file = document.createElement("input"), load = document.createElement("button");
  label.textContent = "Comment on this moment"; input.id = "playtest-comment"; label.htmlFor = input.id;
  input.maxLength = COMMENT_TEXT; input.rows = 3; input.style.cssText = "display:block;width:100%;box-sizing:border-box;font:inherit";
  status.setAttribute("role", "status"); status.style.whiteSpace = "normal";
  button.textContent = "Save comment"; button.className = load.className = "copyall";
  button.onclick = () => { button.disabled = true; status.textContent = "Saving this moment…"; void save(input.value).then(message => { status.textContent = message; input.value = ""; }, e => { status.textContent = String(e instanceof Error ? e.message : e); }).finally(() => { button.disabled = false; }); };
  file.type = "file"; file.accept = ".json,application/json"; file.hidden = true;
  load.textContent = "Builder: restore latest comment from log…";
  load.onclick = () => file.click();
  file.onchange = () => { const selected = file.files?.[0]; if (!selected) return; load.disabled = true; status.textContent = "Restoring the saved moment…"; void restore(selected).catch(e => { status.textContent = String(e instanceof Error ? e.message : e); }).finally(() => { load.disabled = false; file.value = ""; }); };
  box.append(label, input, button, load, file, status);
  for (const type of ["keydown", "keyup", "pointerdown", "mousedown", "wheel"]) box.addEventListener(type, e => e.stopPropagation());
  return box;
}
