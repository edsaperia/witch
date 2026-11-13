// The party start at the decks (#1986). node decksclip.cjs <frames dir> [old]
// Frames stepped by hand at 1/60 s, every other saved (30 fps). The audio context is let run 1/60 s for each step and held between
// (suspend/resume), so the music keeps the game's time, the ring reads the real spectrum (as app/pageFrame.ts does each frame) and
// the mix (the three nodes that reach the destination, as the output meter taps them) is recorded sample for sample to <dir>.f32.
const fs = require("fs"), path = require("path"), { open, film, log } = require("./rec.cjs");
const [dir, old] = process.argv.slice(2);
const AUDIO = !!process.env.AUDIO_ONLY, filmed = AUDIO ? JSON.parse(fs.readFileSync(`${dir}.states.json`, "utf8")) : null, counts = t => filmed.filter(r => r.tag === t).length;
const WIN = process.env.DRAW ? process.env.DRAW.split(",").map(w => w.split("-").map(Number)) : null;
const outBase = AUDIO ? `${dir}.audio` : dir;
const CAST_S = Number(process.env.CAST_S || (process.argv[3] ? 14 : 22)), REPLAY_S = Number(process.env.REPLAY_S || (process.argv[3] ? 8 : 20));
(async () => {
  const R = await open({ dist: path.join(__dirname, "decks/dist"), link: `?seed=123&creator=0&spell=wait&quick=1${old ? "&decksfx=old" : ""}`, launchArgs: ["--autoplay-policy=no-user-gesture-required"], init: () => { const s = document.createElement("style"); s.textContent = "#sound-note{display:none!important}"; document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s)); } });
  const states = [];
  try {
    const { page, artIn, waitArt } = R, F = AUDIO ? { shoot: async () => {}, n: 0 } : film(page, dir);
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.party.spellAt === null && !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    await artIn();
    await page.waitForFunction(() => window.witch.audio.ctx && window.witch.audio.music, null, { timeout: 120000, polling: 500 });
    await page.evaluate(a => { window.__live = a; }, AUDIO); // (the audio-only pass: the context runs on, each step waiting for its time)
    log("audio", await page.evaluate(async () => {
      const w = window.witch, A = w.audio, ctx = A.ctx;
      await ctx.resume();
      // (the game's watchdog and its sound frame resume a held context at once: on this context only, resume waits for the step's gate)
      const resume = ctx.resume.bind(ctx); ctx.resume = () => (window.__gate || window.__live ? resume() : Promise.resolve());
      // (an audio-worklet tap: every block copied on the audio thread and posted, so none is dropped while the page is busy)
      const src = "class Tap extends AudioWorkletProcessor { process(inputs) { const i = inputs[0], l = i && i[0], r = (i && i[1]) || l, o = new Float32Array(256); if (l) for (let k = 0; k < 128; k++) { o[2 * k] = l[k]; o[2 * k + 1] = r[k]; } this.port.postMessage(o, [o.buffer]); return true; } } registerProcessor('tap', Tap);";
      await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
      const rec = new AudioWorkletNode(ctx, "tap", { numberOfInputs: 1, numberOfOutputs: 1, channelCount: 2, channelCountMode: "explicit", outputChannelCount: [2] }), mute = ctx.createGain(); mute.gain.value = 0;
      const chunks = []; window.__pcm = chunks; let pend = null;
      rec.port.onmessage = e => { chunks.push(e.data); };
      rec.connect(mute); mute.connect(ctx.destination);
      window.__tap = () => { for (const n of [A.music && A.music.output, A.music && A.music.circleOutput, A.sfx && A.sfx.output]) if (n && !n.__tapped) { n.connect(rec); n.__tapped = true; } };
      window.__tap();
      if (!window.__live) await ctx.suspend();
      window.__t0 = ctx.currentTime; window.__n = 0;
      window.__geo = () => { const lv = w.view.leashView, R = lv.decksRing, F = lv.floorAt, cam = w.view.camera; if (!R || !F || !R.rim) return null; const V = cam.position.constructor, W = innerWidth, H = innerHeight, d = w.game.map.treehouse;
        const D = { x: d.x + 6, z: d.z + 8 }; const gh = w.groundHeight || (() => 0);
        const scr = (x, z) => { const p = F(x, z); const v = new V(p.x, p.y + (window.__gh ? window.__gh(p.x, p.z) : 0), p.z).project(cam); return [+((v.x + 1) / 2 * W).toFixed(1), +((1 - v.y) / 2 * H).toFixed(1)]; };
        return R.rim.map((rim, i) => { const a = Math.PI / 2 + i / R.rim.length * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); return { rim, in: scr(D.x + c * 1.8, D.z + s * 1.8), out: scr(D.x + c * rim, D.z + s * rim) }; }); };
      // one step: the audio let run to the step's time, then held; the ring's spectrum as the page's loop reads it; the rules and the picture; the sound's own frame
      window.__step = async (o, draw) => {
        const target = window.__t0 + (++window.__n) / 60;
        if (window.__live) { while (ctx.currentTime < target) await new Promise(r => setTimeout(r, 1)); } else if (ctx.currentTime < target) { window.__gate = true; await ctx.resume(); while (ctx.currentTime < target) await new Promise(r => setTimeout(r, 1)); window.__gate = false; await ctx.suspend(); }
        window.__tap();
        const SV = w.view.leashView.stoneView; SV.spectrum = SV.wantsSpectrum ? (A.music && A.music.spectrum ? A.music.spectrum() : null) : null; SV.spectrumDb = SV.spectrum && SV.wantsDb && A.music.spectrumDb ? A.music.spectrumDb() : null;
        w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, draw);
        w.soundFrame();
        if (!window.__live) await ctx.suspend(); // (the sound's frame resumes the context: held again at once)
        const g = w.game, DR = w.view.leashView.decksRing;
        { const sec = g.party.spellAt == null ? 0 : Math.max(0, Math.floor(g.clock.time - g.party.spellAt)), el = document.querySelector("#clock"); if (el) el.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; } // (the HUD's clock, as the page's loop keeps it: tools/smoke/partyspell.cjs)
        return { ring: DR ? +(DR.until + 2 - g.clock.time).toFixed(2) : null, t: +g.clock.time.toFixed(3), spellAt: g.party.spellAt, audio: +(ctx.currentTime - window.__t0).toFixed(3), n: window.__n, wants: !!SV.wantsSpectrum, peak: SV.spectrum ? Math.max(...SV.spectrum) : -1, x: +g.witch.x.toFixed(2), seated: !!g.witch.seated, db: (() => { const an = A.music && A.music.analyser; if (!an) return null; const f = new Float32Array(an.frequencyBinCount); an.getFloatFrequencyData(f); return Array.from(f.slice(0, 44)).map(v => Math.round(v)); })(), spec: SV.spectrum ? Array.from(SV.spectrum) : null, bars: Array.from(SV.bars.slice(0, 32)).map(v => +v.toFixed(3)), live: DR ? DR.live : null, beat: g.beat ? +(window.__beatAt ? window.__beatAt() : 0) : 0, geo: window.__geo ? window.__geo() : null };
      };
      return { rate: ctx.sampleRate, state: ctx.state, hasSpectrum: !!(A.music && A.music.spectrum), sfx: !!A.sfx };
    }));
    // (the recorded mix and the states out to disk as it goes, so a killed run keeps what it had)
    fs.writeFileSync(`${outBase}.f32`, "");
    const flush = async () => { for (;;) { const b64 = await page.evaluate(() => { const parts = window.__pcm.splice(0, 2000); if (!parts.length) return ""; const len = parts.reduce((s, p) => s + p.length, 0), all = new Float32Array(len); let o = 0; for (const p of parts) { all.set(p, o); o += p.length; } const u = new Uint8Array(all.buffer); let s = ""; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); }); if (!b64) break; fs.appendFileSync(`${outBase}.f32`, Buffer.from(b64, "base64")); } fs.writeFileSync(`${outBase}.states.json`, JSON.stringify(states)); };
    let i = 0, last;
    const tick = async (o, tag) => { const sc = last && last.spellAt != null ? last.t - last.spellAt : -1; const draw = !AUDIO && i % 2 === 1 && (!WIN || WIN.some(([a, b]) => sc >= a && sc <= b)); last = await page.evaluate(([o, draw]) => window.__step(o, draw), [o, draw]); if (draw && !AUDIO) { await waitArt(); await F.shoot(); } i++; states.push({ i, tag, drawn: draw, ...last }); if (i % 120 === 0) await flush(); };
    const run = async (o, frames, tag, until) => { for (let k = 0; k < frames; k++) { await tick(typeof o === "function" ? o(k) : o, tag); if (until && until(last, k)) break; } log(tag, JSON.stringify({ ...last, spec: undefined, db: undefined, bars: undefined, geo: undefined })); };
    await run({}, AUDIO ? counts("waiting at the decks") : 60, "waiting at the decks");
    await run(k => (k === 0 ? { castParty: true } : {}), AUDIO ? counts("the party spell cast") : Math.round(CAST_S * 60), "the party spell cast", (s, k) => !AUDIO && !old && k > 120 && (s.ring === null || s.ring < -1));
    if (last.spellAt == null) throw new Error("the spell wasn't cast");
    if (!AUDIO) { const ok = await page.evaluate(() => window.witch.view.replayPartyStart()); log("replay:", ok); if (!ok) throw new Error("the replay was refused"); } // (the replay is the view's alone: no sound of its own)
    await run({}, AUDIO ? counts("the decks' replay") : Math.round(REPLAY_S * 60), "the decks' replay", (s, k) => !AUDIO && !old && k > 120 && (s.ring === null || s.ring < -1));
    log("frames", F.n);
    await flush();
    log("rate", await page.evaluate(() => window.witch.audio.ctx.sampleRate), "audio s", last.audio, "game steps", last.n);
  } finally { fs.writeFileSync(`${outBase}.states.json`, JSON.stringify(states)); await R.close(); }
  if (R.errors.length) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
