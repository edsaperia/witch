import { newGame, newWitchPlayer, type Controls, type Game } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { startWake } from "../../rules/wakeUp";
import { wakeInBedroom } from "../../rules/opening";
import { bareBroom } from "../../rules/broomParts";
import { setParts } from "../../rules/spells";
import { Input } from "../input";
import { View } from "../../render/view";
import { prewarmArtWorkers } from "../../render/assets";
import { gameStyle, styleFromLink, viewFromLink } from "../../app/viewParams";
import { connectRelay, invitationLink, soloHome } from "./relayClient";
import { guestInput, wireControls } from "./guestInput";
import { attachGuest, detachGuest } from "./membership";
import { localView } from "./localView";
import { otherWitches } from "./otherWitches";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame, type ReplayStart } from "./replay";
import { snapshotGame } from "../../rules/nightSnapshot";

declare const __BUILD__: string;
const build = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
const params = new URLSearchParams(location.search), guest = params.get("online") === "guest";
const endpoint = params.get("relay") ?? "ws://localhost:8787";
const room = params.get("room") ?? String(crypto.getRandomValues(new Uint32Array(1))[0] % 9000000 + 1000000);
const token = new URLSearchParams(location.hash.slice(1)).get("invite") ?? undefined;
const status = document.getElementById("status")!, invite = document.getElementById("invite") as HTMLAnchorElement;
const heldMs = Number(params.get("heldInputMs") ?? 250);
let game: Game, presentation: ReturnType<typeof localView>, view: View;
let replica: ReturnType<typeof replayGuest> | undefined, tick = 0, sequence = 0, ready = false, paused = false, castWanted = false, stopped = false;
let guestPresent = false, failure: string | null = null;
const inputBuffer = guestInput(heldMs);
const setStatus = (text: string) => { status.textContent = text; };
const fail = (error: Error) => { failure = error.message; setStatus(error.message); };
prewarmArtWorkers();

async function prepare(source: Game, player: number) {
  game = source; presentation = localView(game, player);
  const style = styleFromLink(params, game.tuning);
  view = await View.create(document.getElementById("game") as HTMLCanvasElement, presentation.game, gameStyle(style, game.tuning));
  viewFromLink(view, params);
  otherWitches(view, game, player);
  const resize = () => view.resize(innerWidth, innerHeight);
  resize(); addEventListener("resize", resize);
  await view.prepare(); ready = true;
  setStatus(`${guest ? "Guest" : "Host"} · ${build}`);
}

if (!guest) {
  const tuning = structuredClone(TUNING), seed = Number(params.get("seed") ?? 123);
  if (!Number.isInteger(seed)) throw new Error("Invalid island seed");
  if (params.has("island")) tuning.map!.island = params.get("island")!;
  game = newGame(seed, tuning);
  wakeInBedroom(game); startWake(game, game.herTime, { yesterday: true, mirrored: true });
  game.clock.paused = false;
  void prepare(game, 0).catch(fail);
} else if (!token) throw new Error("The invitation is missing");

const connection = connectRelay({ endpoint, room, token: guest ? token : undefined,
  onError: fail,
  onClose() { if (guest) { location.href = soloHome(location.href); return; } detachGuest(game); guestPresent = false; inputBuffer.clear(); setStatus("The relay connection ended. Leave to return home."); },
  onMessage(m) {
    if (m.type === "hosted" && typeof m.token === "string") {
      invite.href = invitationLink(location.href, endpoint, room, m.token); invite.hidden = false;
    } else if (m.type === "guest-joined" && !guest) {
      if (guestPresent) return;
      // No host equipment is duplicated: the prototype guest starts with a bare broom and plain hat.
      const W = newWitchPlayer(1, 0, 0, game.tuning); setParts(W.spells, bareBroom()); W.spells.hat = "none";
      attachGuest(game, W); guestPresent = true; inputBuffer.clear();
      connection.sendState({ kind: "start", start: replayStart(game, build, tick) });
    } else if (m.type === "input" && !guest && m.player === 1) {
      inputBuffer.accept(m.payload, performance.now());
    } else if (m.type === "guest-left" && !guest) {
      detachGuest(game); guestPresent = false; inputBuffer.clear(); setStatus(`Guest left · Host · ${build}`);
    } else if (m.type === "state" && guest && m.player === 0) {
      const payload = m.payload as { kind?: string; start?: ReplayStart; frame?: ReplayFrame };
      if (payload?.kind === "start" && payload.start && !replica) {
        replica = replayGuest(payload.start, build);
        void prepare(replica.game, 1).catch(fail);
      } else if (payload?.kind === "frame" && payload.frame && replica) {
        if (!replica.apply(payload.frame)) { stopped = true; fail(new Error("Online state lost its sequence. Leave and open a new invitation.")); }
      }
    }
  },
});
const input = new Input();
input.aimFrom = (x, y) => ready ? view.aimAt(x, y) : null;
const pause = () => { paused = !paused; input.release(); document.getElementById("pause")!.textContent = paused ? "Resume" : "Pause"; };
document.getElementById("pause")!.onclick = pause;
document.getElementById("party")!.onclick = () => { castWanted = true; };
document.getElementById("leave")!.onclick = () => { connection.close(); location.href = soloHome(location.href); };
addEventListener("keydown", e => { if (e.code === "Escape" && !e.repeat) pause(); });
addEventListener("beforeunload", () => connection.close());
let last = 0;
function frame(now: number) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.1, last ? (now - last) / 1000 : 0); last = now;
  if (!ready || stopped || failure) return;
  const raw = input.read(), controls = wireControls(raw)!;
  controls.pausePage = paused;
  if (paused) { controls.moveX = controls.moveZ = 0; controls.fire = false; }
  if (castWanted) { controls.castParty = true; castWanted = false; }
  if (guest) connection.sendInput({ sequence: sequence++, controls });
  else {
    const inputs: Controls[] = guestPresent ? [controls, inputBuffer.sample(now)] : [controls];
    const update = replayHostStep(game, inputs, dt, ++tick);
    if (guestPresent) connection.sendState({ kind: "frame", frame: update });
  }
  presentation.update(dt, raw.zoom);
  view.render(game.clock.time);
}
requestAnimationFrame(frame);
// Read-only bounded-check seam; does not replace either player's controls.
Object.assign(window, { witchOnline: {
  build, role: guest ? "guest" : "host",
  get ready() { return ready; }, get tick() { return replica?.tick ?? tick; },
  get state() { return ready ? snapshotGame(game) : null; },
  get players() { return ready ? game.witches.map(w => ({ id: w.id, x: w.body.x, z: w.body.z, paused: w.paused })) : []; },
  get failure() { return failure; },
} });
