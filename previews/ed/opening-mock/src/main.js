// The new opening, as a storyboard (mock only; Ed, 2026-10-19): one frame per beat, drawn with the game's own witch sprites
// (art/generator.js) and Foxtrot's real frames of the chart, its flight and the decks (previews/ed/transition-timing/).
// index.html#<frame id> draws that frame; opening.mjs screenshots each.
const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
const st = G.defaultStyle(), studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
const img = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.src = src; });
const [CHART, FLIGHT, DECKS, TABLE, ROOMS] = await Promise.all(["cold-3-chart-full.png", "cold-4-flight.png", "cold-6-decks.png", "cold-1-table.png", "game-bedroom.png"].map(f => img("./" + f)));

/** Her sprite in a pose, lit as the art previews light it (clear around her). */
function witch(pose, frame = 0, facing = "towards") {
  const sp = G.witchSprite(st, { pose, frame, facing }), b = G.bake(sp, G.witchColours(st), st, st.cOutline);
  const out = document.createElement("canvas"); out.width = b.w; out.height = b.h;
  shade({ a: b.A.getContext("2d"), n: b.N.getContext("2d"), w: b.w, h: b.h }, out, studio, [], [0, 0, b.w, b.h]);
  const o = out.getContext("2d"); o.globalCompositeOperation = "destination-in"; o.drawImage(b.A, 0, 0); // (her own shape: the lighting fills the box)
  return out;
}

// ---- the timeline (seconds; "you" beats are paced by the player, drawn at a typical length) ----
const BEATS = [
  ["chart", "1 Chart (you)", 0, 10, "#6fb4f0", true], ["zoom", "2a Zoom", 10, 12.5, "#6fb4f0"], ["window-in", "2b In", 12.5, 15, "#6fb4f0"],
  ["alarm", "3a Alarm", 15, 17, "#f2c25c"], ["snooze", "3b Snooze", 17, 19.5, "#f2c25c"], ["stretch", "3c Stretch", 19.5, 22.5, "#f2c25c"], ["up", "3d Up", 22.5, 24.5, "#f2c25c"],
  ["mirror", "4 Mirror (you)", 24.5, 39.5, "#5fd99a", true], ["window", "5a Window", 39.5, 42.5, "#b99be8"], ["walk", "5b To the decks (you)", 42.5, 50, "#5fd99a", true], ["party", "5c Party spell, speakers boot", 50, 60, "#ef7fb0"],
];
const LOADS = [
  ["Page, chart", 0, 4, "#8d86a6"], ["Home's map + art warming", 4, 10, "#a99fc4"],
  ["startNight steps 1–3: home built in slices behind the room (cloud 15–25 s; a real GPU far less)", 10, 37, "#f2c25c"], ["Swap", 37, 39.5, "#e8a43c"], ["Ready: the window shows the island", 39.5, 60, "#5fd99a"],
];
function footer(now) {
  const X0 = 130, W = 1422, S = W / 60, seg = (t0, t1, c, txt, on) => `<div class="seg${on ? " now" : ""}" style="left:${X0 + t0 * S}px;width:${(t1 - t0) * S - 3}px;background:${c}">${txt}</div>`;
  let h = `<div class="lane"><div class="lab">Her / the player</div>${BEATS.map(([id, n, a, b, c]) => seg(a, b, c, n, id === now)).join("")}</div>`;
  h += `<div class="lane"><div class="lab">Loading</div>${LOADS.map(([n, a, b, c]) => seg(a, b, c, n, false)).join("")}</div>`;
  h += `<div class="axis">${[0, 10, 20, 30, 40, 50, 60].map(t => `<span style="left:${X0 + t * S}px">${t} s</span>`).join("")}</div>`;
  h += `<div class="note" style="margin-top:6px;color:#5fd99a">"(you)": as long as the player likes, drawn at a typical length. If the island isn't ready when she reaches the window, it waits there (09).</div>`;
  h += `<div class="note" style="margin-top:4px">First game, typical pacing. Loading times are this cloud's software renderer (Foxtrot's REPORT, Hotel's plan E5); on a real GPU each is far shorter (not measured here).</div>`;
  return h;
}

// ---- drawing helpers on the art-pixel grid (4 screen pixels to one) ----
const P = 4, GW = 280, GH = 158;
function grid() { const c = document.createElement("canvas"); c.width = GW; c.height = GH; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; return [c, g]; }
const R = (g, c, x, y, w, h) => { g.fillStyle = c; g.fillRect(x, y, w, h); };

/** The bedroom at the game camera's angle, its front wall cut away. o: light ("night" | "lamp" | "dawn"), win ("night" | "mist" |
 *  "island"), her: [sprite, x, y] on the grid (feet at y), ring (the alarm ringing), lampOn. Returns { canvas, win } (the window's rect, screen px). */
function bedroom(o) {
  const [c, g] = grid();
  // back wall: planks
  R(g, "#4a3020", 0, 0, GW, 66); for (let x = 0; x < GW; x += 9) R(g, "#3d271a", x, 0, 1, 66);
  R(g, "#2b1b11", 0, 0, GW, 4); R(g, "#5c3d28", 0, 62, GW, 4);
  // side walls
  R(g, "#352217", 0, 0, 10, GH); R(g, "#352217", GW - 10, 0, 10, GH);
  // floor
  R(g, "#6b4a2e", 10, 66, GW - 20, GH - 66); for (let y = 70; y < GH; y += 7) R(g, "#5d3f27", 10, y, GW - 20, 1);
  for (let y = 66, k = 0; y < GH; y += 7, k++) for (let x = 10 + (k % 2) * 22; x < GW - 10; x += 44) R(g, "#5d3f27", x, y, 1, 7);
  // rug
  g.fillStyle = "#6a3c66"; g.beginPath(); g.ellipse(150, 118, 46, 16, 0, 0, 7); g.fill(); g.fillStyle = "#83507d"; g.beginPath(); g.ellipse(150, 118, 38, 12, 0, 0, 7); g.fill();
  // window (arched)
  R(g, "#2b1b11", 116, 10, 52, 48); g.fillStyle = "#2b1b11"; g.beginPath(); g.arc(142, 14, 26, Math.PI, 0); g.fill();
  R(g, "#1a2440", 121, 14, 42, 40); g.fillStyle = "#1a2440"; g.beginPath(); g.arc(142, 15, 21, Math.PI, 0); g.fill();
  R(g, "#5c3d28", 114, 56, 56, 4); // sill
  // door through to the dressing room
  R(g, "#1b120c", 240, 16, 24, 50); R(g, "#5c3d28", 238, 14, 28, 3); R(g, "#5c3d28", 238, 14, 3, 52); R(g, "#5c3d28", 263, 14, 3, 52);
  // dressing table and mirror
  R(g, "#5a3a24", 196, 50, 32, 20); R(g, "#3d271a", 198, 70, 3, 10); R(g, "#3d271a", 223, 70, 3, 10);
  g.fillStyle = "#8a6a4a"; g.beginPath(); g.ellipse(212, 32, 12, 16, 0, 0, 7); g.fill(); g.fillStyle = "#9fc6d9"; g.beginPath(); g.ellipse(212, 32, 9, 13, 0, 0, 7); g.fill();
  g.fillStyle = "#c9e3ee"; g.fillRect(207, 24, 2, 8);
  // lamp on the dressing table
  R(g, "#3d271a", 224, 40, 2, 10); R(g, o.lampOn ? "#ffd27a" : "#7a6a4a", 220, 34, 10, 7);
  // bed: headboard, body, quilt, pillow
  R(g, "#3d271a", 18, 34, 80, 32); R(g, "#5c3d28", 20, 36, 76, 28);
  R(g, "#5c3d28", 18, 66, 80, 48); R(g, "#e9dcc4", 24, 62, 68, 14); // pillow edge / sheet
  R(g, "#5b4a9a", 22, 76, 72, 36); for (let x = 26; x < 92; x += 8) R(g, "#6c5bb0", x, 78, 4, 32); R(g, "#3d271a", 18, 112, 80, 4);
  // bedside table and the alarm clock
  R(g, "#5a3a24", 100, 58, 18, 18); R(g, "#3d271a", 101, 76, 3, 8); R(g, "#3d271a", 114, 76, 3, 8);
  const sh = o.ring ? 1 : 0;
  R(g, "#c0392b", 104 + sh, 48, 10, 10); R(g, "#f3e8d0", 106 + sh, 50, 6, 6); R(g, "#1a1426", 108 + sh, 51, 1, 3); R(g, "#1a1426", 109 + sh, 53, 2, 1);
  R(g, "#d4a017", 103 + sh, 45, 4, 3); R(g, "#d4a017", 111 + sh, 45, 4, 3);
  // her
  if (o.her) { const [s, x, y] = o.her; g.drawImage(s, Math.round(x - s.width / 2), Math.round(y - s.height)); }
  if (o.herOver) o.herOver(g); // (a quilt over her legs, in bed)
  // light: the night's blue dark, the lamp's warm pool, or the dawn through the window
  const lit = document.createElement("canvas"); lit.width = GW; lit.height = GH; const l = lit.getContext("2d");
  l.fillStyle = o.light === "night" ? "rgba(8,10,30,.55)" : o.light === "dawn" ? "rgba(20,18,40,.38)" : "rgba(14,10,24,.42)"; l.fillRect(0, 0, GW, GH);
  l.globalCompositeOperation = "destination-out";
  const glow = (x, y, r, a) => { const gr = l.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(1, "rgba(0,0,0,0)"); l.fillStyle = gr; l.fillRect(0, 0, GW, GH); };
  if (o.lampOn) glow(225, 40, 110, .95);
  if (o.ring) glow(109, 52, 34, .7);
  if (o.light === "dawn") glow(142, 40, 120, .9);
  g.drawImage(lit, 0, 0);
  if (o.lampOn) { g.globalCompositeOperation = "lighter"; const gr = g.createRadialGradient(225, 40, 0, 225, 40, 90); gr.addColorStop(0, "rgba(255,190,90,.22)"); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, GW, GH); g.globalCompositeOperation = "source-over"; }
  // up to the screen
  const out = document.createElement("canvas"); out.width = GW * P; out.height = 630; const q = out.getContext("2d"); q.imageSmoothingEnabled = false; q.drawImage(c, 0, 0, GW * P, GH * P);
  return { canvas: out, win: [121 * P, 0 * P, 42 * P, 54 * P] };
}

/** What shows through the window: the night sky, the island not yet ready (mist), or the island (the decks from above). */
function windowView(q, [x, y, w, h], kind) {
  q.save(); q.beginPath(); q.rect(x, y + 15 * P, w, h - 15 * P); q.arc(x + w / 2, y + 15 * P, w / 2, Math.PI, 0); q.clip();
  if (kind === "island") { q.drawImage(DECKS, 380, 120, 560, 470, x - 10, y - 4, w + 20, h + 10); q.fillStyle = "rgba(255,200,140,.08)"; q.fillRect(x, y, w, h); }
  else if (kind === "mist") { const gr = q.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, "#56607e"); gr.addColorStop(1, "#8d93a8"); q.fillStyle = gr; q.fillRect(x, y, w, h); q.fillStyle = "rgba(230,232,245,.25)"; for (let i = 0; i < 6; i++) { q.beginPath(); q.ellipse(x + (i * 37) % w, y + 60 + (i * 23) % (h - 60), 50, 14, 0, 0, 7); q.fill(); } }
  else { q.fillStyle = "#0d1430"; q.fillRect(x, y, w, h); q.fillStyle = "#fff"; for (let i = 0; i < 26; i++) { const r = Math.sin(i * 12.9898) * 43758.5453, u = r - Math.floor(r), v = (Math.sin(i * 78.233) * 43758.5453) % 1; q.fillRect(x + u * w, y + 20 + Math.abs(v) * (h - 30), 3, 3); } q.fillStyle = "#e9e3c4"; q.beginPath(); q.arc(x + w * .7, y + 50, 14, 0, 7); q.fill(); }
  q.restore();
}

// ---- overlay helpers (screen pixels) ----
function bubble(q, x, y, text, { bg = "rgba(250,244,255,.95)", fg = "#2a1d38", size = 22 } = {}) {
  q.font = `700 ${size}px "DejaVu Sans", sans-serif`; const w = q.measureText(text).width + 24, h = size + 18;
  q.fillStyle = bg; q.beginPath(); q.roundRect(x - w / 2, y - h, w, h, 12); q.fill(); q.fillStyle = fg; q.textAlign = "center"; q.textBaseline = "middle"; q.fillText(text, x, y - h / 2 + 1);
}
function prompt(q, x, y, key, text) {
  q.font = `700 20px "DejaVu Sans", sans-serif`; const kw = Math.max(30, q.measureText(key).width + 16), tw = q.measureText(text).width, w = kw + tw + 32, h = 46;
  q.fillStyle = "rgba(20,14,32,.85)"; q.beginPath(); q.roundRect(x - w / 2, y - h / 2, w, h, 10); q.fill(); q.strokeStyle = "rgba(255,214,140,.6)"; q.lineWidth = 2; q.stroke();
  q.fillStyle = "#f3e8ff"; q.beginPath(); q.roundRect(x - w / 2 + 10, y - 15, kw, 30, 6); q.fill(); q.fillStyle = "#1a1426"; q.textAlign = "center"; q.textBaseline = "middle"; q.fillText(key, x - w / 2 + 10 + kw / 2, y + 1);
  q.fillStyle = "#f3e8ff"; q.textAlign = "left"; q.fillText(text, x - w / 2 + kw + 20, y + 1);
}
function label(q, x, y, text, col = "#fff3d6", size = 18, align = "center") { q.font = `700 ${size}px "DejaVu Sans", sans-serif`; q.textAlign = align; q.textBaseline = "middle"; q.lineWidth = 5; q.strokeStyle = "#14121b"; q.strokeText(text, x, y); q.fillStyle = col; q.fillText(text, x, y); }
function lock(q, x, y) { q.fillStyle = "rgba(20,14,32,.85)"; q.beginPath(); q.arc(x, y, 22, 0, 7); q.fill(); q.strokeStyle = "#cfc6e6"; q.lineWidth = 4; q.beginPath(); q.arc(x, y - 4, 7, Math.PI, 0); q.stroke(); q.fillStyle = "#cfc6e6"; q.fillRect(x - 9, y - 4, 18, 13); }
function arrow(q, x0, y0, x1, y1, col = "#fff3d6") { q.strokeStyle = col; q.lineWidth = 5; q.beginPath(); q.moveTo(x0, y0); q.lineTo(x1, y1); q.stroke(); const a = Math.atan2(y1 - y0, x1 - x0); q.fillStyle = col; q.beginPath(); q.moveTo(x1, y1); q.lineTo(x1 - 18 * Math.cos(a - .45), y1 - 18 * Math.sin(a - .45)); q.lineTo(x1 - 18 * Math.cos(a + .45), y1 - 18 * Math.sin(a + .45)); q.fill(); }
function card(q, x, y, w, h, lines, { title, buttons = [] } = {}) {
  q.fillStyle = "rgba(14,12,24,.92)"; q.beginPath(); q.roundRect(x, y, w, h, 12); q.fill(); q.strokeStyle = "rgba(111,180,240,.7)"; q.lineWidth = 2; q.stroke();
  let yy = y + 30; if (title) { label(q, x + w / 2, yy, title, "#fff3d6", 22); yy += 32; }
  q.font = `16px "DejaVu Sans", sans-serif`; q.fillStyle = "#cfc6e6"; q.textAlign = "center"; for (const t of lines) { q.fillText(t, x + w / 2, yy); yy += 22; }
  let bx = x + w / 2 - buttons.length * 95; for (const [b, hot] of buttons) { q.fillStyle = hot ? "#f2c25c" : "rgba(255,255,255,.12)"; q.beginPath(); q.roundRect(bx + 10, y + h - 54, 170, 40, 8); q.fill(); q.fillStyle = hot ? "#1a1426" : "#e9e2f6"; q.font = `700 17px "DejaVu Sans", sans-serif`; q.fillText(b, bx + 95, y + h - 33); bx += 190; }
}

// ---- the scenes ----
const SCENES = {
  chart(q) {
    q.drawImage(CHART, 0, 0, 1280, 720, 0, 0, 1120, 630);
    // everything but home under a veil, locked
    q.save(); q.fillStyle = "rgba(6,8,20,.62)"; q.beginPath(); q.rect(0, 0, 1120, 630); q.moveTo(680, 285); q.arc(560, 285, 120, 0, Math.PI * 2, true); q.closePath(); q.fill("evenodd"); q.restore();
    for (const [x, y] of [[300, 165], [820, 130], [290, 315], [985, 345], [1090, 110], [1075, 520], [140, 480], [460, 560], [905, 560]]) lock(q, x, y);
    q.fillStyle = "rgba(6,8,20,.95)"; q.fillRect(0, 0, 1120, 64); label(q, 560, 26, "THE SEA CHART", "#fff3d6", 22); label(q, 560, 50, "your first night: only home is open", "#b9b0cf", 15);
    q.fillStyle = "rgba(6,8,20,.95)"; q.fillRect(0, 420, 1120, 210);
    card(q, 360, 432, 400, 186, ["The Ent's island, the middle of the world.", "Your treehouse is here."], { title: "Home", buttons: [["Wake up at home", true]] });
    label(q, 160, 470, "music: the intro, low", "#8fc3f5", 15); label(q, 960, 470, "locked islands: their legends", "#8d86a6", 15); label(q, 960, 492, "wake as you play", "#8d86a6", 15);
  },
  zoom(q) {
    q.imageSmoothingEnabled = false; q.drawImage(FLIGHT, 640 - 230, 356 - 130, 460, 260, 0, 0, 1120, 630);
    q.fillStyle = "rgba(6,8,20,.25)"; q.fillRect(0, 0, 1120, 630);
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; q.strokeStyle = "rgba(255,243,214,.35)"; q.lineWidth = 3; q.beginPath(); q.moveTo(560 + Math.cos(a) * 330, 315 + Math.sin(a) * 250); q.lineTo(560 + Math.cos(a) * 470, 315 + Math.sin(a) * 340); q.stroke(); }
    label(q, 560, 40, "the chart's camera dives onto home", "#fff3d6", 22); label(q, 560, 600, "home's sigil fades as the island's own shape comes up under it", "#cfc6e6", 17);
  },
  "window-in"(q) {
    // the treehouse from outside at night, a lit window, the camera pushing in
    const [c, g] = grid();
    R(g, "#0b1024", 0, 0, GW, GH); g.fillStyle = "#fff"; for (let i = 0; i < 40; i++) g.fillRect((i * 67) % GW, (i * 29) % 70, 1, 1);
    g.fillStyle = "#e9e3c4"; g.beginPath(); g.arc(230, 24, 9, 0, 7); g.fill();
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? "#121a2c" : "#0f1626"; g.beginPath(); g.ellipse(i * 34, 140, 30, 50, 0, 0, 7); g.fill(); }
    R(g, "#3a2a1c", 122, 40, 36, 118); R(g, "#2c1f15", 128, 40, 4, 118); // the Ent's trunk
    g.fillStyle = "#24301e"; g.beginPath(); g.ellipse(140, 34, 90, 36, 0, 0, 7); g.fill(); g.fillStyle = "#2d3b24"; g.beginPath(); g.ellipse(120, 28, 50, 20, 0, 0, 7); g.fill();
    R(g, "#4a3020", 96, 46, 88, 44); R(g, "#2b1b11", 94, 44, 92, 4); g.fillStyle = "#3a2516"; g.beginPath(); g.moveTo(90, 46); g.lineTo(140, 22); g.lineTo(190, 46); g.fill(); // the house
    R(g, "#2b1b11", 128, 56, 22, 24); R(g, "#ffcf7a", 131, 59, 16, 18); R(g, "#2b1b11", 138, 59, 2, 18); R(g, "#2b1b11", 131, 67, 16, 2); // the bedroom window
    R(g, "#ffcf7a", 104, 62, 8, 8); R(g, "#ffcf7a", 166, 62, 8, 8);
    q.imageSmoothingEnabled = false; q.drawImage(c, 0, 0, GW * P, GH * P);
    q.globalCompositeOperation = "lighter"; const gr = q.createRadialGradient(556, 272, 0, 556, 272, 160); gr.addColorStop(0, "rgba(255,190,90,.35)"); gr.addColorStop(1, "rgba(0,0,0,0)"); q.fillStyle = gr; q.fillRect(0, 0, 1120, 630); q.globalCompositeOperation = "source-over";
    q.strokeStyle = "#fff3d6"; q.lineWidth = 3; q.setLineDash([10, 8]); q.strokeRect(500, 220, 112, 104); q.setLineDash([]);
    arrow(q, 300, 470, 480, 330); label(q, 300, 500, "the camera pushes into her window", "#fff3d6", 20);
    label(q, 840, 470, "fades to the dark bedroom", "#cfc6e6", 18);
  },
  alarm(q) {
    const B = bedroom({ light: "night", ring: true, her: [witch("stargaze", 0), 58, 92], herOver: g => { R(g, "#5b4a9a", 48, 84, 42, 26); for (let x = 50; x < 90; x += 8) R(g, "#6c5bb0", x, 86, 4, 24); } });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "night");
    label(q, 460, 120, "BRRRRING!", "#ffd27a", 36); for (let i = 0; i < 3; i++) { q.strokeStyle = "#ffd27a"; q.lineWidth = 4; q.beginPath(); q.arc(436, 212, 34 + i * 14, -2.6, -0.5); q.stroke(); }
    label(q, 230, 270, "z", "#cfc6e6", 26);
    prompt(q, 560, 590, "E", "snooze");
  },
  snooze(q) {
    const B = bedroom({ light: "night", her: [witch("placeSigil", 1), 96, 104] });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "night");
    label(q, 440, 150, "*click*", "#cfc6e6", 30); bubble(q, 380, 330, "five more minutes…");
    label(q, 560, 590, "or leave it: it rings again after 2 s, louder, and she gets up anyway", "#cfc6e6", 18);
  },
  stretch(q) {
    const B = bedroom({ light: "dawn", lampOn: true, her: [witch("liftSigil", 2), 132, 120] });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "night");
    label(q, 520, 250, "~ yawn ~", "#fff3d6", 24);
    label(q, 560, 590, "the lamp comes on; she gets up, yawns and stretches (shown, ~3 s)", "#cfc6e6", 18);
  },
  up(q) {
    const B = bedroom({ light: "dawn", lampOn: true, her: [witch("stand", 0), 160, 128] });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "mist");
    prompt(q, 560, 590, "WASD", "walk (her first steps: the controls, taught in the room)");
    arrow(q, 700, 470, 820, 330, "#5fd99a"); label(q, 840, 300, "the mirror", "#5fd99a", 20);
  },
  mirror(q) {
    const B = bedroom({ light: "dawn", lampOn: true, her: [witch("stand", 0, "away"), 212, 96] });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "mist");
    // the station's panel: only the mirror's choices
    q.fillStyle = "rgba(14,12,24,.93)"; q.beginPath(); q.roundRect(30, 60, 400, 500, 12); q.fill(); q.strokeStyle = "rgba(255,214,140,.6)"; q.lineWidth = 2; q.stroke();
    label(q, 230, 94, "The mirror", "#fff3d6", 24);
    const rows = [["Skin", ["#f1d3b8", "#d9a87e", "#b07850", "#7a4a2c", "#4a2c1a", "#9cc7a0"]], ["Hair", ["#2a1d38", "#7a3b1e", "#d9b25c", "#e9e3dc", "#c0392b", "#6fb4f0"]], ["Hair style", ["▮", "◖", "◗", "≋", "◍", "⌇"]], ["Face", ["◡", "◠", "‿", "ᵕ", "◕", "•"]], ["Earrings", ["–", "○", "◇", "✦", "☾", "♪"]]];
    rows.forEach(([n, opts], i) => { const y = 140 + i * 74; label(q, 52, y, n, "#cfc6e6", 17, "left"); opts.forEach((o, k) => { const x = 60 + k * 58, yy = y + 14; q.fillStyle = o.startsWith("#") ? o : "rgba(255,255,255,.1)"; q.beginPath(); q.roundRect(x, yy, 46, 36, 6); q.fill(); if (k === 1) { q.strokeStyle = "#f2c25c"; q.lineWidth = 3; q.stroke(); } if (!o.startsWith("#")) label(q, x + 23, yy + 19, o, "#e9e2f6", 18); }); });
    q.fillStyle = "#f2c25c"; q.beginPath(); q.roundRect(150, 506, 160, 40, 8); q.fill(); q.fillStyle = "#1a1426"; q.font = `700 18px "DejaVu Sans", sans-serif`; q.textAlign = "center"; q.fillText("Done", 230, 527);
    label(q, 790, 590, "first game: here; later: walk past it, or E to change", "#cfc6e6", 17);
  },
  window(q) {
    const B = bedroom({ light: "dawn", lampOn: true, her: [witch("stand", 0, "away"), 142, 100] });
    q.drawImage(B.canvas, 0, 0); windowView(q, B.win, "island");
    // what she sees: the view out, big (the camera goes through the window on E)
    q.fillStyle = "rgba(14,12,24,.9)"; q.beginPath(); q.roundRect(616, 70, 480, 330, 12); q.fill(); q.drawImage(DECKS, 300, 60, 680, 440, 626, 80, 460, 297); q.strokeStyle = "#5fd99a"; q.lineWidth = 3; q.strokeRect(626, 80, 460, 297);
    arrow(q, 610, 160, 700, 160, "#5fd99a"); label(q, 856, 420, "the view out (E): the dancefloor below", "#5fd99a", 17);
    label(q, 560, 590, "if it isn't ready yet: mist outside, she waits at the sill, the music rising", "#cfc6e6", 18);
  },
  walk(q) {
    q.drawImage(ROOMS, 0, 0, 1600, 900, 0, 0, 1120, 630);
    arrow(q, 640, 120, 600, 360, "#5fd99a"); arrow(q, 560, 380, 300, 520, "#5fd99a");
    label(q, 760, 110, "out of the bedroom, through the dressing room", "#5fd99a", 18); label(q, 330, 560, "the hub, then the decks on the balcony", "#5fd99a", 18);
    label(q, 900, 590, "(today's rooms, in game: #966)", "#cfc6e6", 15);
  },
  party(q) {
    q.drawImage(DECKS, 0, 0, 1280, 720, 0, 0, 1120, 630);
    q.fillStyle = "rgba(14,12,24,.9)"; q.beginPath(); q.roundRect(360, 520, 400, 64, 12); q.fill(); q.strokeStyle = "#ef7fb0"; q.lineWidth = 2; q.stroke(); label(q, 560, 552, "🎶 CAST THE PARTY SPELL", "#ffd2e6", 22);
    label(q, 560, 40, "at her decks: the spell, the 6.5 s scratch routine (or not: see NOTES), then the speakers boot", "#fff3d6", 18);
  },
  later(q) {
    q.fillStyle = "#0d0c14"; q.fillRect(0, 0, 1120, 630);
    const col = (x, title, rows, c) => { label(q, x + 250, 34, title, c, 22); rows.forEach(([n, t], i) => { const y = 70 + i * 54; q.fillStyle = "rgba(255,255,255,.05)"; q.beginPath(); q.roundRect(x, y, 500, 46, 8); q.fill(); label(q, x + 14, y + 16, n, "#e9e2f6", 16, "left"); label(q, x + 14, y + 35, t, "#a99fc4", 13, "left"); }); };
    col(20, "First game", [["Chart, only home open", "chosen by the player"], ["Zoom to home, into the window", "~5 s, unskippable (a first load: the page is still warming)"], ["Alarm, snooze, stretch", "~7 s, shown; E to snooze"], ["Out of bed", "WASD taught here"], ["The mirror", "skin, hair, face, earrings"], ["The window", "waits for the island if it isn't ready"], ["Out to the decks", "the rooms on the way"], ["The party spell", "and the DJ intro"], ["~55 s on a fast machine", "most of it the player's own pace"]], "#f2c25c");
    col(580, "A later load (recommended)", [["Chart, every island they've opened", "last island played highlighted"], ["Zoom to that island's treehouse", "~3 s, any key skips to the room"], ["Alarm, snooze, stretch", "any key skips: she's already up"], ["Out of bed", "skipped with the rest"], ["The mirror", "optional: walk past, or E to change"], ["The window", "the same wait if the island isn't ready"], ["Out to the decks", "as in the first game"], ["The party spell", "the DJ intro skippable"], ["~10 s to the decks if skipped", "never shorter than the island's build"]], "#5fd99a");
  },
};

const FRAMES = {
  "01-chart": { beat: "chart", n: "1", title: "First load: the sea chart, only home open", time: "player-paced", scene: "chart",
    play: ["Click home (or Enter / A): <b>Wake up at home</b>", "Pan and zoom the chart; locked islands show their legend and say what opens them", "The corner buttons that live on today's creator screen move here: Controls, What's new, Options, Zoo (see NOTES)"],
    shown: ["The chart, 65 islands; only home unlocked, the rest veiled and locked", "The music's intro, quiet: the same intro the speakers' boot builds on"],
    load: ["The page with no night yet (Hotel's E5: a Page with <i>night = null</i>)", "The chart: mounted ~4 s, first islands ~18 s, all 65 ~90 s on this cloud (cold); 5 s from cache on a revisit", "Behind it, already: home's map in a worker (Alpha) and the art workers warming home's art"],
    note: "Today's first load instead opens on the creator screen, which is the loading cover; the scroll then puts her at her decks." },
  "02-zoom": { beat: "zoom", n: "2a", title: "The zoom from the chart to home", time: "2–3 s", scene: "zoom",
    play: ["Nothing: a short, fixed flight (on a first load it can't be skipped: there's nothing to skip to yet)"],
    shown: ["The chart's own camera diving onto home (as today's chart flight, from Foxtrot's frames)", "Home's glowing sigil fading as its island comes up under it"],
    load: ["<b>startNight</b> begins as she clicks: the night's seed, the rules' game, then the island's layers in slices (steps 1–3)", "Chart drawing stops (Foxtrot's #968 holds it)"],
    note: "Ed: \"We need to zoom from the first map view to the home island anyway.\"" },
  "03-window-in": { beat: "window-in", n: "2b", title: "…and into her bedroom window", time: "2–3 s", scene: "window-in",
    play: ["Nothing"],
    shown: ["The treehouse from outside at night, one window lit", "The camera pushes into the window and fades to the dark room"],
    load: ["Island build continues (steps 1–3)", "The bedroom itself is drawn from house.json and her sprites: island-independent, ready in well under a second"],
    note: "Drawn for the mock; in the game this is the Ent's own art, lit." },
  "04-alarm": { beat: "alarm", n: "3a", title: "Dark, and the alarm goes off", time: "2 s", scene: "alarm",
    play: ["<span class=key>E</span> snooze (the sigil button: E, the pad's X, touch)", "Nothing else yet: she's asleep"],
    shown: ["The bedroom in the dark, the moon through the window", "Her asleep under the quilt (the stargaze pose, the lying-down pose the party witches use)", "The clock rattling on the bedside table"],
    load: ["Island build (steps 1–3)"],
    note: "Foxtrot's beat: dark plus alarm, 2 s." },
  "05-snooze": { beat: "snooze", n: "3b", title: "Snooze", time: "2–3 s", scene: "snooze",
    play: ["E slaps the clock quiet: \"five more minutes…\" (the one choice here; it costs nothing)", "No press: it rings again, louder, and she gets up"],
    shown: ["Her arm out to the clock (placeSigil's reach), the clock still"],
    load: ["Island build (steps 1–3)"],
    note: "Snoozing buys ~2 s more of the build; that's its real job, and it's honest about it: there's no penalty." },
  "06-stretch": { beat: "stretch", n: "3c", title: "Wake up and stretch", time: "~3 s", scene: "stretch",
    play: ["Nothing (shown)"],
    shown: ["The lamp comes on", "She throws off the quilt, gets up, yawns and stretches (liftSigil's arms up)"],
    load: ["Island build (steps 1–3)"],
    note: "Foxtrot's beat: wake and stretch, 3 s." },
  "07-up": { beat: "up", n: "3d", title: "Out of bed: her first steps", time: "~2 s, then the player", scene: "up",
    play: ["<b>WASD</b> (stick, touch) to walk: the first control, taught in a safe room", "E at things lights them, as in the house's rooms"],
    shown: ["Her standing by the bed", "The window's view: mist while the island isn't ready"],
    load: ["Island build (steps 1–3)"],
    note: "This is where today's \"WASD\" keycap hint on the creator screen lives now." },
  "08-mirror": { beat: "mirror", n: "4", title: "The mirror: skin, hair and the rest", time: "player-paced", scene: "mirror",
    play: ["First game: the mirror's station opens by itself when she reaches it: skin, hair, hair style, face, earrings", "Done (or walk away) keeps what's chosen; nothing here is final, the dressing room has it all", "Later games: walk past it, or E to change"],
    shown: ["The station's panel (today's creator at only its choices, as #966's mirror)", "Her at the dressing table, her back to us"],
    load: ["The build finishes and <b>the swap (step 4)</b> happens while she's at the mirror: the window shows the island when she turns back (Hotel's E5)"],
    note: "Hat, cloak, broom and the rest wait for the dressing room and the garage, in play; the first game gives her the classic look till then (NOTES Q5)." },
  "09-window": { beat: "window", n: "5a", title: "The window: the island", time: "~3 s", scene: "window",
    play: ["Walk up to the window (E looks out: the camera goes through it)"],
    shown: ["Through the window: the island, the dancefloor and the speakers below", "If it isn't ready yet: mist, and she waits at the sill"],
    load: ["Ready. From here on it's the night as today"],
    note: "Ed: \"…before seeing out of the window.\" The only thing that waits for the island." },
  "10-walk": { beat: "walk", n: "5b", title: "Out through the rooms to the decks", time: "player-paced", scene: "walk",
    play: ["Walk: bedroom → dressing room → hub → balcony (the rooms of #966, every station working)", "E at the decks: the party spell"],
    shown: ["The treehouse rooms at the game camera's angle (today's game)"],
    load: ["Nothing: the night is up; the boot waits for the spell"],
    note: "A first game might light only the path out (the rest of the rooms dim) so the way is clear: NOTES Q6." },
  "11-party": { beat: "party", n: "5c", title: "At her decks: the party starts", time: "6.5 s + the boot", scene: "party",
    play: ["Cast the party spell (as today's 🎶 scroll, now at the decks)", "Then: the night as today"],
    shown: ["Her at the decks; the scratch routine (6.5 s) if it stays; the speakers boot"],
    load: ["Nothing"],
    note: "Real frame: her at the decks (Foxtrot's cold-6-decks)." },
  "12-later": { beat: "", n: "★", title: "A returning player's later load", time: "~10 s to the decks if skipped", scene: "later",
    play: ["The same beats, each skippable with any key (the zoom, the wake-up); the mirror optional"],
    shown: ["The chart opens on the island they last played, every opened island lit"],
    load: ["The same: the skips go no faster than the island's build; skipping to the window waits there"],
    note: "Recommended: skippable and shorter, not the same every time. See NOTES Q4." },
};

const id = decodeURIComponent(location.hash.slice(1)) || "01-chart", F = FRAMES[id];
document.getElementById("num").textContent = `OPENING MOCK · BEAT ${F.n}`;
document.getElementById("title").textContent = F.title;
document.getElementById("time").innerHTML = `<b>${F.time}</b>${id === "12-later" ? "on a later load" : "on a first game"}`;
document.getElementById("play").innerHTML = F.play.map(t => `<li>${t}</li>`).join("");
document.getElementById("shown").innerHTML = F.shown.map(t => `<li>${t}</li>`).join("");
document.getElementById("load").innerHTML = F.load.map(t => `<li>${t}</li>`).join("");
document.getElementById("note").innerHTML = F.note;
document.getElementById("foot").innerHTML = footer(F.beat);
const q = document.getElementById("scene").getContext("2d"); q.imageSmoothingEnabled = false;
SCENES[F.scene](q);
window.FRAMES = Object.keys(FRAMES);
window.done = true;
