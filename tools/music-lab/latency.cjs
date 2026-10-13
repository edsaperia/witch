// The audio output's buffer by latencyHint (Ed's v3167 playtest: "music is still cutting out"; platform/audio/buffer.ts):
//   node tools/music-lab/latency.cjs            (HINTS=interactive,balanced,playback,0.06,0.12  LOAD=60  SECS=8)
// For each hint, makes an AudioContext in headless Chromium, plays a graph about as heavy as the music's (LOAD detuned saws
// through moving filters into a 4 s convolver) while the page's thread works as a 30 fps game's does (25 ms frames, a 120 ms
// stall each second), and prints the context's buffer (baseLatency, ms), the device's latency (outputLatency, ms), the audio
// clock's rate against the page's (1: it kept up), and Chrome's under-run count where it has one (playbackStats; headless
// usually doesn't). What it showed (2026-10-13): "balanced" gives the same 10 ms buffer as "interactive", so asking for it
// bought nothing; a buffer in seconds is what the context needs to be asked for.
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
(async () => {
  const b = await pw.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const p = await b.newPage();
  await p.setContent("<html><body>latency</body></html>");
  for (const hint of (process.env.HINTS || "interactive,balanced,playback,0.06,0.12").split(",")) {
    const r = await p.evaluate(async ([hint, load, secs]) => {
      const ctx = new AudioContext({ latencyHint: isNaN(+hint) ? hint : +hint }); await ctx.resume();
      const out = ctx.createGain(); out.gain.value = 0.02; out.connect(ctx.destination);
      const ir = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate); for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / ctx.sampleRate); }
      const cv = ctx.createConvolver(); cv.buffer = ir; cv.connect(out);
      for (let i = 0; i < load; i++) { const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = 80 + i * 3; const f = ctx.createBiquadFilter(); f.frequency.value = 900; const lf = ctx.createOscillator(); lf.frequency.value = .3 + i * .01; const lg = ctx.createGain(); lg.gain.value = 400; lf.connect(lg).connect(f.frequency); o.connect(f).connect(cv); f.connect(out); o.start(); lf.start(); }
      const t0 = performance.now(), a0 = ctx.currentTime;
      let f = 0; while (performance.now() - t0 < secs * 1000) { const s = performance.now(), busy = f % 30 === 0 ? 120 : 25; while (performance.now() - s < busy) { /* a frame's work */ } await new Promise(r => setTimeout(r, 8)); f++; }
      const st = ctx.playbackStats, res = { hint, bufferMs: +(ctx.baseLatency * 1000).toFixed(1), outputMs: +((ctx.outputLatency || 0) * 1000).toFixed(1), clock: +((ctx.currentTime - a0) / ((performance.now() - t0) / 1000)).toFixed(3), underruns: st ? st.underrunEvents : "n/a" };
      await ctx.close(); return res;
    }, [hint, +(process.env.LOAD || 60), +(process.env.SECS || 8)]);
    console.log(JSON.stringify(r));
  }
  await b.close();
})();
