// The party spell as a scroll (Ed, 2026-10-06: "the party spell, it looks like an open scroll with "🎶" on it, in the bottom
// right of the character creation screen. When you go near it the 🎶 glows and it ripples and shakes and the rest of the screen
// gets dark, and when you click on it, it grows to fill the screen and crackles and bursts and disappears, and when these effects
// clear the game starts. There are appropriate sound cues."). An open parchment scroll drawn as pixel art (its sheet between two
// rolls), the 🎶 on it. Nearing it (the cursor's distance, eased; focused by the keyboard, all the way) its 🎶 glows, the paper
// ripples in a wave running down it and trembles, and a veil darkens the rest of the screen, as if the spell drew the light in;
// all easing back as the cursor goes. Cast (a click, a tap, Enter or Space on it): it grows to fill the screen crackling with
// sparks and arcs (held there, still crackling, while the forest finishes growing), then bursts in a flash and a spray of
// parchment, and as that clears the game is running: `onBurst` starts play and casts the spell (the witch's cast, the pulse
// round the dancefloor's ring). About 1.8 s from the click when the world's ready. prefers-reduced-motion keeps the glow and
// the veil, the ripple and the tremble faint, and the grow a short swell and fade.
// While the forest grows it lies rolled shut, dim and asleep (Ed, 2026-10-06: "The 🎶 spell scroll can transition in or open or
// become active only once the loading is done"): no glow, no click; the bedroom's fairy lights are the loading bar. Once the
// world's ready it unrolls (its rolls parting, a flare of its glow, a rustle) and comes alive.
// Sounds by `sound(cue, value)`: "hum" (its level, 0..1, every frame), "rustle" (the ripple's strength, when it stirs), "crackle"
// (the grow), "burst" (the burst): platform/audio/spell.ts.

/** The cues the scroll sounds (platform/audio/spell.ts makes them). */
export type SpellCue = "hum" | "rustle" | "crackle" | "burst";

const ART_W = 64, ART_H = 56; // the scroll's own pixels (the room's art pixels: ui/creator.ts sizes it on the bedroom's grid)
const PAD = 12; // art pixels of clear canvas round it, for its glow and its tremble
const TOP = 8, BOT = 9; // the rows of its top roll and its bottom roll
const GROW = .62, BURST = .95, CLEAR = 1.8; // seconds from the click: grown, burst, cleared
const UNROLL = .9; // seconds to unroll once the world's ready
const ease = (x: number) => x < .5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x);
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

/** The scroll's picture: parchment between two wooden rolls, at ART_W × ART_H. */
function paintScroll(): HTMLCanvasElement {
  const c = document.createElement("canvas"); c.width = ART_W; c.height = ART_H;
  const g = c.getContext("2d")!, px = (x: number, y: number, col: string) => { g.fillStyle = col; g.fillRect(x, y, 1, 1); };
  const rnd = (i: number) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  // the sheet: its sides a little wavy, darker toward its edges, flecked
  const top = TOP, bot = ART_H - BOT - 1;
  for (let y = top; y <= bot; y++) {
    const l = 7 + Math.round(Math.sin(y * .45) * .8), r = ART_W - 8 + Math.round(Math.sin(y * .37 + 2) * .8);
    for (let x = l; x <= r; x++) {
      const e = Math.min(x - l, r - x, (y - top) * 1.6, (bot - y) * 1.6), n = rnd(x * 57 + y * 13);
      const col = e < 1 ? "#8a6334" : e < 2.5 ? "#c9a061" : n > .93 ? "#d8bb7f" : n < .05 ? "#f6e7bd" : "#ead6a0";
      px(x, y, col);
    }
  }
  // a faint ruled border inside it, like a spell's
  g.fillStyle = "#d9bf86"; g.fillRect(13, top + 5, ART_W - 26, 1); g.fillRect(13, bot - 5, ART_W - 26, 1);
  // the rolls, top and bottom: a wooden cylinder, lit from above, with knobs at its ends
  const wood = ["#f0cc8a", "#d9ab64", "#b88446", "#8e5f2c", "#5c3a19"];
  for (const ry of [2, ART_H - 8]) {
    for (let x = 3; x < ART_W - 3; x++) for (let k = 0; k < wood.length; k++) px(x, ry + k, wood[k]);
    for (const kx of [0, ART_W - 4]) for (let k = 0; k < 7; k++) for (let j = 0; j < 4; j++) px(kx + j, ry - 1 + k, k === 0 || k === 6 || j === 0 || j === 3 ? "#3d2510" : k < 3 ? "#c48a48" : "#7a4c22");
  }
  return c;
}

/** The 🎶 as pixel art on the sheet (a beamed pair of notes and a single one), in `col`, at the scroll's own pixels. */
function paintNotes(col: string): HTMLCanvasElement {
  const c = document.createElement("canvas"); c.width = ART_W; c.height = ART_H;
  const g = c.getContext("2d")!; g.fillStyle = col;
  const head = (cx: number, cy: number) => { for (const [dx, w] of [[-1, 4], [-2, 6], [-3, 6], [-3, 5]] as [number, number][]) { g.fillRect(cx + dx, cy, w, 1); cy++; } };
  // the pair, beamed
  g.fillRect(30, 18, 2, 16); g.fillRect(44, 15, 2, 16); // stems
  for (let i = 0; i < 16; i++) g.fillRect(30 + i, 18 - Math.round(i * 3 / 15), 1, 3); // the beam, rising
  for (let i = 0; i < 16; i++) g.fillRect(30 + i, 23 - Math.round(i * 3 / 15), 1, 2); // and a second
  head(29, 33); head(43, 30);
  // the single, smaller, to the left
  g.fillRect(20, 22, 2, 12); g.fillRect(22, 22, 2, 1); g.fillRect(23, 23, 2, 1); g.fillRect(24, 24, 1, 3); g.fillRect(23, 27, 1, 1);
  head(19, 33);
  return c;
}

export class SpellScroll {
  /** The scroll on screen (focusable: Enter or Space casts it). */
  readonly el = document.createElement("canvas");
  /** The veil darkening the rest of the screen as she nears it. */
  readonly veil = document.createElement("div");
  /** The flash, the sparks and the burst, over everything (the game too, as it clears). */
  private fx = document.createElement("canvas");
  private art = paintScroll();
  private ink = paintNotes("#4a3358");
  private gold = paintNotes("#ffd27a");
  /** The scroll's canvas in art pixels, its glow's margin and all: the creator sets it at a whole number of screen pixels to
   *  each (place). */
  static readonly SIZE: [number, number] = [ART_W + PAD * 2, ART_H + PAD * 2];
  /** The scroll itself, in art pixels. */
  static readonly ART: [number, number] = [ART_W, ART_H];
  private near = 0; private target = 0; private focused = false;
  /** When it began to unroll (its own clock), -1 while the forest still grows. */
  private openAt = -1;
  private castAt = -1; private burstAt = -1; private raf = 0; private last = 0;
  /** Its own clock (seconds): real time, or slowed for filming (window.__spellSlow, e.g. 0.1). */
  private vt = 0;
  private shake: [number, number] = [0, 0]; private shakeAt = 0; private stirred = 0;
  private sparks: { x: number; y: number; vx: number; vy: number; life: number; age: number; col: string; size: number; shard?: boolean }[] = [];
  private reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  /** Whether play can begin (the forest grown): the scroll holds, grown and crackling, until it can. */
  ready: () => boolean = () => true;
  /** How much of the forest has grown, 0..1 (shown on the burst's dark should it ever wait). */
  progress: () => number = () => 1;
  /** The click itself (a gesture: sound may start; her look saved). */
  onCast: () => void = () => {};
  /** The burst: start play and cast the spell. */
  onBurst: () => void = () => {};
  /** A sound cue. */
  sound: (cue: SpellCue, v: number) => void = () => {};

  constructor(host: HTMLElement) {
    const el = this.el;
    el.id = "creator-start"; // (the smoke scripts wait for it, as they did for the Start button)
    el.tabIndex = 0; el.setAttribute("role", "button"); el.setAttribute("aria-label", "Cast the party spell");
    el.title = "Cast the party spell";
    Object.assign(el.style, { position: "absolute", right: "3%", bottom: "4%", width: `${SpellScroll.SIZE[0] * 3}px`, height: `${SpellScroll.SIZE[1] * 3}px`, cursor: "pointer", zIndex: "3", outline: "none", touchAction: "manipulation" });
    Object.assign(this.veil.style, { position: "absolute", inset: "0", background: "#05030c", opacity: "0", pointerEvents: "none", zIndex: "2" });
    Object.assign(this.fx.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "30", display: "none" });
    host.append(this.veil, el);
    document.body.append(this.fx);
    el.addEventListener("click", e => { e.stopPropagation(); this.cast(); });
    el.addEventListener("keydown", e => { if (e.code === "Enter" || e.code === "Space") { e.preventDefault(); e.stopPropagation(); this.cast(); } });
    el.addEventListener("focus", () => { this.focused = true; });
    el.addEventListener("blur", () => { this.focused = false; });
    host.addEventListener("pointermove", e => this.aim(e.clientX, e.clientY));
    host.addEventListener("pointerleave", () => { this.target = 0; });
  }

  /** Puts it at (left, top), w × h (CSS lengths: the creator's, on its pixel grid). */
  place(left: string, top: string, w: string, h: string): void { Object.assign(this.el.style, { left, top, width: w, height: h, right: "auto", bottom: "auto" }); }

  /** Whether it's unrolled and can be cast. */
  get awake(): boolean { return this.openAt >= 0; }
  /** True from the click until the effects have cleared. */
  get casting(): boolean { return this.castAt >= 0; }

  /** The cursor at (x, y): how near the scroll it is, 0 far off to 1 on it, eased in over a few scroll-widths. */
  aim(x: number, y: number): void {
    const r = this.el.getBoundingClientRect(); if (!r.width) return;
    const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)), r0 = r.width * .5, r1 = r.width * 3;
    const k = clamp(1 - (d - r0) / (r1 - r0)); this.target = k * k * (3 - 2 * k);
  }

  start(): void { cancelAnimationFrame(this.raf); this.last = performance.now(); const tick = () => { this.raf = requestAnimationFrame(tick); this.frame(); }; tick(); }
  stop(): void { if (!this.casting) { cancelAnimationFrame(this.raf); this.raf = 0; } }

  /** Cast it: grow, crackle, burst (the burst waits for the world to be ready). */
  cast(): void {
    if (this.casting || !this.awake) return;
    this.castAt = this.vt; this.burstAt = -1;
    this.onCast();
    this.sound("crackle", 1);
    this.fx.style.display = "block";
    this.el.style.visibility = "hidden";
    if (!this.raf) this.start();
  }

  private frame(): void {
    const now = performance.now(), slow = (window as unknown as { __spellSlow?: number }).__spellSlow ?? 1, dt = Math.min(.1, (now - this.last) / 1000 * slow); this.last = now;
    const t = this.vt += dt, ready = this.ready();
    if (ready && this.openAt < 0) { this.openAt = t; this.sound("rustle", 1); }
    const open = this.openAt < 0 ? 0 : ease(clamp((t - this.openAt) / UNROLL)), alive = open >= 1;
    this.el.style.cursor = alive ? "pointer" : "default"; this.el.tabIndex = alive ? 0 : -1;
    this.el.setAttribute("aria-disabled", alive ? "false" : "true"); if (alive) this.el.dataset.awake = ""; else delete this.el.dataset.awake;
    const want = this.casting ? 1 : alive ? Math.max(this.target, this.focused ? 1 : 0) : 0;
    this.near += (want - this.near) * (1 - Math.exp(-dt / .14));
    const p = this.near;
    this.sound("hum", this.casting ? 0 : p);
    // the rustle: whenever the ripple stirs up a step
    if (!this.casting && p > this.stirred + .2) { this.stirred = p; this.sound("rustle", p); } else if (p < this.stirred - .25) this.stirred = p;
    const pr = this.progress();
    if (!this.casting) {
      this.veil.style.opacity = (.62 * p).toFixed(3);
      this.drawScroll(this.el, t, p, null, open);
      return;
    }
    // casting
    const since = t - this.castAt;
    if (this.burstAt < 0 && since >= BURST && ready) { this.burstAt = t; this.burst(); }
    const k = this.burstAt < 0 ? Math.min(since, BURST) : BURST + (t - this.burstAt); // (held at the brink until ready)
    this.drawCast(t, k, dt, ready ? 1 : pr);
    if (this.burstAt >= 0 && k >= CLEAR) this.finish();
  }

  /** The scroll: its paper rippling (a wave running down the sheet, rows shifted sideways) and trembling, by p. */
  private drawScroll(target: HTMLCanvasElement, t: number, p: number, box: { x: number; y: number; w: number; h: number } | null, open = 1): void {
    const dpr = window.devicePixelRatio || 1, mo = this.reduced ? .2 : 1;
    let g: CanvasRenderingContext2D, W: number, H: number, ox = 0, oy = 0;
    if (box) { g = this.fx.getContext("2d")!; W = box.w; H = box.h; ox = box.x; oy = box.y; }
    else {
      const r = target.getBoundingClientRect(), cw = Math.round(r.width * dpr), ch = Math.round(r.height * dpr);
      if (target.width !== cw || target.height !== ch) { target.width = cw; target.height = ch; }
      g = target.getContext("2d")!; W = cw; H = ch; g.clearRect(0, 0, W, H);
    }
    // (its art pixel k: a whole number of device pixels on the bedroom's grid, the tremble and the ripple moving whole pixels)
    const k = box ? W / SpellScroll.SIZE[0] : Math.max(1, Math.round(W / SpellScroll.SIZE[0])), sw = ART_W * k, sh = ART_H * k, snap = (v: number) => box ? v : Math.round(v / k) * k;
    if (t - this.shakeAt > .045) { this.shakeAt = t; const a = (box ? 1 : p * p) * mo * k * (box ? 1.2 : .9); this.shake = [snap((Math.random() - .5) * 2 * a), snap((Math.random() - .5) * 2 * a)]; }
    const x0 = ox + PAD * k + this.shake[0], y0 = oy + PAD * k + this.shake[1];
    g.save(); g.imageSmoothingEnabled = false;
    // its glow behind it, golden, by p (and flaring as it unrolls; none while it sleeps)
    const cx = x0 + sw / 2, cy = y0 + sh / 2, flare = open > 0 && open < 1 ? Math.sin(Math.PI * open) : 0;
    const hr = box ? Math.max(sw, sh) * .75 : Math.min(W, H) * .5, halo = g.createRadialGradient(cx, cy, 0, cx, cy, hr); // (on its own canvas: inside it, so no edge shows)
    halo.addColorStop(0, `rgba(255,214,140,${((.12 + .4 * Math.max(p, flare)) * Math.min(1, open * 2)).toFixed(3)})`); halo.addColorStop(1, "rgba(255,214,140,0)");
    g.fillStyle = halo; g.fillRect(cx - hr, cy - hr, hr * 2, hr * 2);
    // the paper, a row of its pixels at a time, each shifted by the wave
    // rolled up (open 0) its two rolls meet in the middle and the sheet between them is hidden; unrolling, they part
    const amp = (.25 + 1.6 * p) * mo * k * .6 * open, sp = 7 + 5 * p, half = ART_H / 2, shut = 1 - open;
    if (open < 1) g.globalAlpha = .55 + .45 * open; // (asleep: dim)
    for (let y = 0; y < ART_H; y++) {
      const top = y < TOP, bottom = y >= ART_H - BOT, roll = top || bottom, off = snap(roll ? Math.sin(t * sp) * amp * .25 : Math.sin(y * .55 - t * sp) * amp);
      if (!roll && Math.abs(y + .5 - half) > open * (half - TOP)) continue;
      const dy = top ? Math.round(shut * (half - TOP)) : bottom ? -Math.round(shut * (ART_H - BOT - half)) : 0;
      g.drawImage(this.art, 0, y, ART_W, 1, x0 + off, y0 + (y + dy) * k, sw, Math.ceil(k));
    }
    g.globalAlpha = 1;
    if (open < .5) { g.restore(); return; } // (the 🎶 shows as it opens)
    // the 🎶 (pixel notes on the sheet): riding the wave at its middle, glowing gold as she nears (the glow smooth, the notes
    // whole pixels), turning gold themselves at the nearest
    const mid = snap(Math.sin(ART_H * .5 * .55 - t * sp) * amp), glow = (.35 + .65 * p) * (.9 + .1 * Math.sin(t * 6)), show = clamp((open - .5) * 2);
    g.shadowColor = `rgba(255,200,90,${glow.toFixed(3)})`; g.shadowBlur = (4 + 30 * p) * (sh / 160);
    g.globalAlpha = show * (.3 + .7 * p); g.drawImage(this.gold, x0 + mid, y0, sw, sh);
    g.shadowBlur = 0;
    g.globalAlpha = show * (1 - .75 * p); g.drawImage(this.ink, x0 + mid, y0, sw, sh);
    if (p > .05 && open >= 1) { g.globalCompositeOperation = "lighter"; g.globalAlpha = p * .45; g.drawImage(this.gold, x0 + mid, y0, sw, sh); }
    g.restore();
  }

  /** The cast: grown to fill the screen, crackling (k: seconds since the click, held at BURST until ready), then the burst
   *  clearing. */
  private drawCast(t: number, k: number, dt: number, pr: number): void {
    const fx = this.fx, dpr = window.devicePixelRatio || 1, W = Math.round(innerWidth * dpr), H = Math.round(innerHeight * dpr);
    if (fx.width !== W || fx.height !== H) { fx.width = W; fx.height = H; }
    const g = fx.getContext("2d")!; g.clearRect(0, 0, W, H);
    const from = this.el.getBoundingClientRect(), mo = this.reduced ? 0 : 1;
    // the dark: deepening to the burst, then lifting as it clears
    const dark = k < BURST ? .62 + .3 * (k / BURST) : .92 * clamp(1 - (k - BURST) / (CLEAR - BURST - .2));
    g.fillStyle = `rgba(5,3,12,${dark.toFixed(3)})`; g.fillRect(0, 0, W, H);
    if (k < BURST) {
      // growing from where it sat to fill the screen (reduced motion: a swell where it is)
      const e = ease(clamp(k / GROW)), [SW0, SH0] = SpellScroll.SIZE, full = Math.max(W, H * ART_W / ART_H) * 1.06 * SW0 / ART_W;
      const fw = from.width * dpr, w = mo ? fw + (full - fw) * e : fw * (1 + .25 * e), h = w * SH0 / SW0;
      const fcx = (from.left + from.width / 2) * dpr, fcy = (from.top + from.height / 2) * dpr;
      const cx = mo ? fcx + (W / 2 - fcx) * e : fcx, cy = mo ? fcy + (H / 2 - fcy) * e : fcy;
      this.drawScroll(fx, t, 1, { x: cx - w / 2, y: cy - h / 2, w, h });
      // crackling: arcs from the 🎶 out across the paper, and sparks thrown off, more as it nears the burst
      const heat = clamp(k / BURST), arcs = Math.round(1 + heat * 5);
      g.save(); g.globalCompositeOperation = "lighter"; g.lineCap = "round";
      for (let i = 0; i < arcs; i++) {
        let x = cx, y = cy; const a = Math.random() * Math.PI * 2, len = (w * .25 + w * .3 * Math.random()), n = 7;
        g.strokeStyle = Math.random() < .5 ? "rgba(255,230,160,.85)" : "rgba(255,120,230,.75)"; g.lineWidth = (1 + Math.random() * 2) * dpr;
        g.beginPath(); g.moveTo(x, y);
        for (let j = 1; j <= n; j++) { const s = len / n, b = a + (Math.random() - .5) * 1.4; x += Math.cos(b) * s; y += Math.sin(b) * s; g.lineTo(x, y); }
        g.stroke();
      }
      g.restore();
      for (let i = 0; i < 2 + heat * 10; i++) this.spark(cx + (Math.random() - .5) * w * .6, cy + (Math.random() - .5) * h * .6, 120 + 500 * heat, false);
      if (pr < 1) { g.save(); g.font = `${Math.round(16 * dpr)}px ui-monospace, monospace`; g.fillStyle = "rgba(242,223,176,.9)"; g.textAlign = "center"; g.fillText(`the forest is growing… ${Math.round(pr * 100)}%`, W / 2, H * .92); g.restore(); }
    } else {
      // the burst: a flash fading, the parchment's shards and the sparks flying out
      const f = clamp(1 - (k - BURST) / .5);
      g.fillStyle = `rgba(255,236,190,${(f * f * (this.reduced ? .5 : .95)).toFixed(3)})`; g.fillRect(0, 0, W, H);
    }
    this.drawSparks(g, dt);
  }

  private spark(x: number, y: number, speed: number, shard: boolean): void {
    const a = Math.random() * Math.PI * 2, v = speed * (.4 + Math.random() * .8) * (window.devicePixelRatio || 1);
    const cols = shard ? ["#ead6a0", "#c9a061", "#f6e7bd"] : ["#fff2c4", "#ffd27a", "#ff8ae8", "#9ef3ff"];
    this.sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: shard ? .9 + Math.random() * .5 : .3 + Math.random() * .5, age: 0, col: cols[Math.floor(Math.random() * cols.length)], size: (shard ? 6 + Math.random() * 10 : 2 + Math.random() * 3) * (window.devicePixelRatio || 1), shard });
  }
  private drawSparks(g: CanvasRenderingContext2D, dt: number): void {
    g.save(); g.globalCompositeOperation = "lighter";
    this.sparks = this.sparks.filter(s => (s.age += dt) < s.life);
    for (const s of this.sparks) {
      s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .97; s.vy = s.vy * .97 + (s.shard ? 260 : 60) * dt;
      g.globalAlpha = clamp(1 - s.age / s.life); g.fillStyle = s.col;
      if (s.shard) { g.globalCompositeOperation = "source-over"; g.fillRect(s.x, s.y, s.size, s.size * .6); g.globalCompositeOperation = "lighter"; }
      else g.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    }
    g.restore();
  }

  private burst(): void {
    this.sound("burst", 1);
    const dpr = window.devicePixelRatio || 1, cx = innerWidth * dpr / 2, cy = innerHeight * dpr / 2, n = this.reduced ? 20 : 90;
    for (let i = 0; i < n; i++) this.spark(cx + (Math.random() - .5) * innerWidth * dpr * .6, cy + (Math.random() - .5) * innerHeight * dpr * .6, 700, i % 3 === 0);
    this.veil.style.opacity = "0";
    this.onBurst();
  }

  private finish(): void {
    cancelAnimationFrame(this.raf); this.raf = 0;
    this.castAt = -1; this.burstAt = -1; this.sparks = []; this.near = 0; this.target = 0; this.stirred = 0;
    this.fx.style.display = "none";
    this.el.style.visibility = "";
  }
}
