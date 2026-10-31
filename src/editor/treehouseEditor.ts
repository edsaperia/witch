import { HOUSE_ROOMS } from "../rules/houseRooms";
import { field } from "../../config/house/shape.js";
import { attachedPoint, defaultLayout, exportLayout, floorplanKey, hitItem, LayoutHistory, layoutItems, normalAngle, parseLayout, physicalRoom } from "./houseLayout";
import { HousePreview, type Frame, type Mapping } from "./housePreview";
import "./treehouseEditor.css";

const items = layoutItems(), identity = floorplanKey(HOUSE_ROOMS, items), initial = defaultLayout(items, identity), history = new LayoutHistory(structuredClone(initial));
const preview = new HousePreview(); let selected = items[0].id, ready = false, zoom = 1;
const bounds = { x0: Math.min(...HOUSE_ROOMS.rooms.map(r => r.x0)) - 3, x1: Math.max(...HOUSE_ROOMS.rooms.map(r => r.x1)) + 3, z0: Math.min(...HOUSE_ROOMS.rooms.map(r => r.z0)) - 3, z1: Math.max(...HOUSE_ROOMS.rooms.map(r => r.z1)) + 3 };
const fullFrame = (): Frame => ({ x: (bounds.x0 + bounds.x1) / 2, z: (bounds.z0 + bounds.z1) / 2, width: bounds.x1 - bounds.x0, height: bounds.z1 - bounds.z0 });
let frame = fullFrame(), map: Mapping;
document.body.innerHTML = `<header><div><span class="eyebrow">WITCH · AUTHORING</span><h1>Treehouse layout</h1></div><p>Arrange the furniture. Copy the layout when it feels right.<br><small>The published house stays unchanged. Rooms and walls are fixed.</small></p></header>
<main><aside><label>Room <select id="room"><option value="">All rooms</option></select></label><label>Furniture / station / clutter <select id="object" size="9" aria-label="Objects, stations and room clutter"></select></label>
<section><h2 id="name"></h2><p id="kind"></p><div class="numbers"><label>X · metres<input id="x" type="number" step="0.1"></label><label>Z · metres<input id="z" type="number" step="0.1"></label><label>Rotation · degrees<input id="rotation" type="number" step="1"></label></div>
<div class="buttons"><button id="left">↶ 15°</button><button id="right">↷ 15°</button><button id="restore">Reset object</button></div><p id="anchor"></p><p id="warning" role="status"></p></section>
<div class="buttons"><button id="undo">Undo</button><button id="redo">Redo</button><button id="reset">Reset all</button></div>
<section><h2>Layout settings</h2><div class="buttons"><button id="copy">Copy settings</button><button id="apply">Apply pasted settings</button></div><label class="export-label" for="settings">Copy from here if clipboard access is unavailable, or paste a saved layout.</label><textarea id="settings" spellcheck="false" aria-label="Layout JSON"></textarea><p id="status" role="status" aria-live="polite"></p></section></aside>
<div class="views"><nav><button id="fit">Fit house</button><button id="focus">Focus selected</button><button id="minus" aria-label="Zoom out">−</button><button id="plus" aria-label="Zoom in">+</button><span>Drag to move · Shift snaps to 0.5 m · right-drag to pan · wheel to zoom</span></nav>
<section class="view"><div class="caption"><h2>Top-down plan</h2><span>Blue = approach point · orange = model front · rooms and walls stay fixed</span></div><canvas id="plan" aria-label="Top-down house layout. Select an object from the list for exact keyboard editing."></canvas></section>
<section class="view"><div class="caption"><h2>Camera view · 24°</h2><span>Game floor, walls and furniture art · grey labelled blocks for decks / clothes pile</span></div><canvas id="camera" aria-label="Camera preview of the same layout"></canvas></section></div></main>`;
const get = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const room = get<HTMLSelectElement>("room"), object = get<HTMLSelectElement>("object"), plan = get<HTMLCanvasElement>("plan"), camera = get<HTMLCanvasElement>("camera"), settings = get<HTMLTextAreaElement>("settings");
let pendingBakes = 0;
const pending = (delta: number) => { pendingBakes += delta; camera.dataset.pending = String(pendingBakes); };
const status = (s: string) => { get("status").textContent = s; };
for (const r of HOUSE_ROOMS.rooms) room.add(new Option(r.label, r.id));
function list(): void {
  object.replaceChildren();
  for (const o of items.filter(o => !room.value || room.value === physicalRoom(history.value.objects.find(p => p.id === o.id)!))) object.add(new Option(o.label, o.id));
  if (![...object.options].some(o => o.value === selected)) selected = object.options[0]?.value ?? items[0].id;
  object.value = selected;
}
const pose = () => history.value.objects.find(p => p.id === selected)!;
function inspector(): void {
  const o = items.find(o => o.id === selected)!, p = pose(), a = attachedPoint(o, p);
  const destination = physicalRoom(p);
  get("name").textContent = o.label; get("kind").textContent = `${HOUSE_ROOMS.rooms.find(r => r.id === destination)?.label ?? "Branch / outside rooms"} · ${o.decor ? "Room clutter" : o.use.kind === "creator" ? "Dressing station" : "Furniture"}`;
  for (const k of ["x", "z", "rotation"] as const) get<HTMLInputElement>(k).value = String(+p[k].toFixed(4));
  get("anchor").textContent = o.decor ? "Room clutter has no station interaction. Its identity stays the same when moved to another room." : `Use position: X ${a.x.toFixed(2)}, Z ${a.z.toFixed(2)} m. Rotation is clockwise; 0° faces south. Room names do not change its function.`;
  get("warning").textContent = field(HOUSE_ROOMS.shape, p.x, p.z, true) > 0 ? "Outside the walkable floor. You can keep arranging it or move it back inside." : "";
}
function draw(): void {
  map = preview.draw(plan, items, history.value, selected, frame, false, zoom);
  preview.draw(camera, items, history.value, selected, frame, true, zoom); inspector();
}
function changed(): void { draw(); status("Layout changed. Copy settings to keep it; the game has not been changed."); }
function edit(action: () => void): void { history.save(); action(); changed(); void bakeSelected(); }
async function bakeSelected(): Promise<void> {
  if (!ready) return;
  pending(1);
  try { await new Promise<void>(r => requestAnimationFrame(() => r())); preview.bake(items.find(o => o.id === selected)!, pose()); draw(); }
  finally { pending(-1); }
}
room.onchange = () => { list(); draw(); };
object.onchange = () => { selected = object.value; draw(); void bakeSelected(); };
for (const key of ["x", "z", "rotation"] as const) get<HTMLInputElement>(key).onchange = () => {
  const v = get<HTMLInputElement>(key).valueAsNumber;
  if (!Number.isFinite(v) || Math.abs(v) > (key === "rotation" ? 360000 : 10000)) { status("Enter a finite coordinate or angle within the supported range."); inspector(); return; }
  edit(() => { pose()[key] = key === "rotation" ? normalAngle(v) : v; });
};
get("left").onclick = () => edit(() => { pose().rotation = normalAngle(pose().rotation - 15); });
get("right").onclick = () => edit(() => { pose().rotation = normalAngle(pose().rotation + 15); });
get("restore").onclick = () => edit(() => Object.assign(pose(), initial.objects.find(p => p.id === selected)));
get("reset").onclick = () => { if (confirm("Reset every object to the published layout? You can undo this.")) edit(() => { history.value = structuredClone(initial); }); };
get("undo").onclick = () => { history.undo(); changed(); void bakeAll(); };
get("redo").onclick = () => { history.redo(); changed(); void bakeAll(); };
get("fit").onclick = () => { frame = fullFrame(); zoom = 1; draw(); };
get("focus").onclick = () => { const p = pose(); frame = { x: p.x, z: p.z, width: 28, height: 28 }; zoom = 1; draw(); };
const zoomBy = (factor: number) => { zoom = Math.max(.5, Math.min(12, zoom * factor)); draw(); };
get("plus").onclick = () => zoomBy(1.25); get("minus").onclick = () => zoomBy(.8);
get("copy").onclick = async () => {
  settings.value = JSON.stringify(exportLayout(history.value, items), null, 2);
  try { await navigator.clipboard.writeText(settings.value); status("Settings copied. Paste them into the chat to adopt this layout."); }
  catch { settings.focus(); settings.select(); status("Clipboard unavailable. The complete settings are selected below; copy them normally."); }
};
get("apply").onclick = () => {
  try { const value = parseLayout(JSON.parse(settings.value), items, identity); edit(() => { history.value = value; }); void bakeAll(); status(value.migration ? `Version 1 converted explicitly: camera facings preserved. ${value.migration.held.length} changed legacy object(s) held; current kitchen/new clutter retained. Copy to save version 2.` : "Pasted layout applied to both views. The published house is unchanged."); }
  catch (e) { status(`Could not apply settings: ${e instanceof Error ? e.message : String(e)}`); }
};
let drag: { id: string | null; dx: number; dz: number; pan: boolean; x: number; z: number; px: number; py: number } | null = null;
plan.oncontextmenu = e => e.preventDefault();
plan.onpointerdown = e => {
  if (!ready || !map) return;
  const r = plan.getBoundingClientRect(), at = map.unproject(e.clientX - r.left, e.clientY - r.top), id = hitItem(items, history.value, at.x, at.z), pan = e.button === 1 || e.button === 2;
  if (!id && !pan) return;
  e.preventDefault(); plan.setPointerCapture(e.pointerId);
  if (id && !pan) { selected = id; room.value = ""; list(); history.save(); }
  const p = pose(); drag = { id, dx: at.x - p.x, dz: at.z - p.z, pan, x: frame.x, z: frame.z, px: e.clientX, py: e.clientY }; draw();
};
plan.onpointermove = e => {
  if (!drag) return;
  if (drag.pan) { frame.x = drag.x - (e.clientX - drag.px) / map.scale; frame.z = drag.z - (e.clientY - drag.py) / map.scale; draw(); return; }
  const r = plan.getBoundingClientRect(), at = map.unproject(e.clientX - r.left, e.clientY - r.top), snap = (v: number) => e.shiftKey ? Math.round(v * 2) / 2 : Math.round(v * 100) / 100;
  pose().x = snap(at.x - drag.dx); pose().z = snap(at.z - drag.dz); changed();
};
plan.onpointerup = plan.onpointercancel = () => { drag = null; void bakeSelected(); };
for (const canvas of [plan, camera]) canvas.addEventListener("wheel", e => { e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });
window.addEventListener("keydown", e => { if ((e.target as HTMLElement)?.matches("input,textarea,select")) return; if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") { e.preventDefault(); if (e.shiftKey) history.redo(); else history.undo(); changed(); void bakeAll(); } });
new ResizeObserver(draw).observe(get("plan").parentElement!);
list(); draw();
async function bakeAll(): Promise<void> {
  pending(1);
  try { for (const p of history.value.objects) { preview.bake(items.find(o => o.id === p.id)!, p); draw(); await new Promise<void>(r => requestAnimationFrame(() => r())); } }
  finally { pending(-1); }
}
void preview.prepare(status).then(async () => {
  ready = true; await bakeAll(); status("Ready. Drag in the plan or choose an object and edit its coordinates.");
}).catch(e => status(`Preview preparation failed: ${e instanceof Error ? e.message : String(e)}`));
