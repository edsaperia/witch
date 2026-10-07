// The live rig's frame strips (#79 stage 5): a creature put together by the rig (src/render/rig/rig.ts)
// from its baked parts (art/genome/parts.js) through a scripted run (walking right, turning down
// the screen, winding up, charging, leaping, landing), composed and lit like the game's sprites,
// one frame every STEP seconds, in rows: previews/rig-strip-<species>.png.
//   node tools/rig/strip.mjs wolf,snake [level] [scale]
// QUIRK=1: its character instead (config/character.json): standing in its posture, its idle quirk, standing again: previews/rig-quirk-<species>.png.
// SHOES=sneakers (or any party shoe style): as a party animal in those shoes, its collar on: previews/rig-strip-<species>-<style>.png.
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { openBrowser } from "../../art/headless.mjs";

const [list = "wolf,snake", level = "2", scale = "2"] = process.argv.slice(2);
mkdirSync("tools/rig/.out", { recursive: true });
await build({ entryPoints: ["src/render/rig/rig.ts"], bundle: true, format: "esm", outfile: "tools/rig/.out/rig.js", logLevel: "error" });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
for (const id of list.split(",")) {
  const { url, tw, th, n } = await b.page.evaluate(async ({ id, level, scale, step, shoes, style, quirk }) => {
    const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js"), P = await import("/art/genome/parts.js"), R = await import("/tools/rig/.out/rig.js");
    const st = { ...G.defaultStyle(), ...style }, gear = shoes ? { collar: G.sigilColour(id), shoes, face: "happy" } : null, studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 }, colours = G.speciesColours(id, st, gear);
    // its parts baked, as rigBuild.ts does for the game
    const parts = P.rigParts(id, level, st, gear), baked = [];
    const add = (p, o = st.cOutline) => p ? { frame: baked.push(G.bake(p.sp, colours, st, o)) - 1, px: p.px, py: p.py } : null;
    const all = k => (parts.pieces[k] ?? [null, null, null, null, null]).map(p => add(p)), discs = {};
    for (const [mat, byR] of Object.entries(parts.discs)) { discs[mat] = {}; for (const [r, p] of Object.entries(byR)) { const d = add(p, "bare"); if (d) discs[mat][r] = d; } }
    const J = parts.joints, head = J.head && !Array.isArray(J.head) ? J.head : null;
    const meta = { template: parts.template, s: parts.s, shoe: parts.pieces.shoe ? all("shoe") : undefined, torso: all("torso"), head: all("head"), tail: all("tail"), discs, legs: J.legs ?? [], neck: head ? head.nb : J.head, headAt: head ? head.H : J.head, tailAt: J.tail ?? [0, 0, 0], top: J.top ?? 0, len: J.len ?? 0, spine: J.spine ?? [] };
    // the script: [seconds, label, vx, vz (body lengths a second), drive]
    const mpp = 1 / 16, u2m = mpp * meta.s, bl = Math.max(.6, (meta.len || .6) * 2) * u2m, dt = 1 / 60;
    // QUIRK=1: its character instead (config/character.json): standing in its posture, its idle quirk, standing again
    const CH = quirk ? await (await fetch("/config/character.json")).json() : null, ch = CH ? { ...CH.default, ...(CH.species[id] ?? {}), posture: { ...CH.default.posture, ...(CH.species[id]?.posture ?? {}) } } : null;
    const posture = ch ? { hx: ch.posture.head[0], hy: ch.posture.head[1], by: ch.posture.body } : undefined;
    const script = ch ? [[0.4, "stand", 0, 0], [ch.for, ch.quirk, 0, 0, "quirk"], [0.4, "stand", 0, 0]] : [[1.2, "walk", 1, 0], [1.0, "turn", 0, 1], [0.5, "wind-up", 0, 0, "crouch"], [0.6, "charge", 4, 0, "charge"], [0.5, "leap", 1.5, 0, "leap"], [0.4, "land", 0.3, 0]];
    const body = new R.RigBody(), frames = [];
    let x = 0, z = 0, t = 0, vx = 1, vz = 0;
    body.update(x, z, 0, bl, 0);
    for (const [secs, label, ux, uz, mode] of script) {
      for (let s = 0; s < secs; s += dt, t += dt) {
        const k = s / secs;
        vx += (ux * bl - vx) * Math.min(1, dt * (mode === "charge" ? 12 : 4)); vz += (uz * bl - vz) * Math.min(1, dt * 4);
        if (label === "turn") { const h = Math.PI / 2 * k; vx = Math.cos(h) * bl; vz = Math.sin(h) * bl; }
        x += vx * dt; z += vz * dt;
        body.update(x, z, dt, vx, vz);
        const drive = { crouch: mode === "crouch" ? Math.min(1, k * 2) : 0, charging: mode === "charge", air: mode === "leap" ? Math.sin(k * Math.PI) : 0, posture, quirk: ch?.quirk, quirkK: mode === "quirk" ? k : -1 };
        const out = new R.RigOut();
        if (meta.template === "quadruped") body.quadruped(meta, u2m, dt, drive, out); else body.serpent(meta, u2m, dt, drive, out);
        const items = out.items.slice(0, out.n);
        if (Math.round(t / dt) % Math.round(step / dt) === 0) frames.push({ label, items: items.map(it => ({ ...it, y: it.y + (mode === "leap" ? Math.sin(k * Math.PI) * bl * .5 : 0) })) });
      }
    }
    // compose each frame: every piece's pivot on its point, as the camera sees it (pitched .52), far ones first
    const W = Math.round(Math.max(90, meta.s * 3.4)), H = Math.round(Math.max(70, meta.s * 2.2)), pitch = .52, cp = Math.cos(pitch), sp = Math.sin(pitch);
    const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    const cols = 8, rowsN = Math.ceil(frames.length / cols), A = mk(W * cols, H * rowsN), N = mk(W * cols, H * rowsN), a = A.getContext("2d"), n = N.getContext("2d");
    n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, A.width, A.height);
    a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, A.width, A.height);
    const labels = [];
    frames.forEach((f, i) => {
      const ox = (i % cols) * W + W / 2, oy = Math.floor(i / cols) * H + H * .78;
      a.fillStyle = "rgba(0,0,0,.25)"; a.beginPath(); a.ellipse(ox, oy, W * .22, W * .06, 0, 0, Math.PI * 2); a.fill(); // its shadow
      for (const it of [...f.items].sort((p, q) => (p.z * cp + p.y * sp + p.bias * u2m) - (q.z * cp + q.y * sp + q.bias * u2m))) {
        const bk = baked[it.piece.frame], px = it.flip ? bk.w - it.piece.px : it.piece.px;
        const sx = Math.round(ox + it.x / mpp - px), sy = Math.round(oy - (it.y * cp - it.z * sp) / mpp - it.piece.py);
        const draw = (ctx, img) => { if (!it.flip) return ctx.drawImage(img, sx, sy); ctx.save(); ctx.translate(sx + bk.w, sy); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0); ctx.restore(); };
        draw(a, bk.A); draw(n, it.flip ? bk.NF : bk.N);
      }
      labels.push([f.label, (i % cols) * W + 3, Math.floor(i / cols) * H + 10]);
    });
    const under = mk(A.width, A.height);
    shade({ a, n, w: A.width, h: A.height }, under, studio, [], [0, 0, A.width, A.height]);
    const big = mk(A.width * scale, A.height * scale), g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(under, 0, 0, big.width, big.height);
    g.fillStyle = "#fff"; g.font = `${9 * scale}px monospace`; for (const [t, x, y] of labels) g.fillText(t, x * scale, y * scale); // the labels after the lighting
    return { url: big.toDataURL("image/png"), tw: W * scale, th: H * scale, n: frames.length };
  }, { id, level: +level, scale: +scale, step: +(process.env.STEP || 0.2), shoes: process.env.SHOES || null, style: JSON.parse(process.env.STYLE || "{}"), quirk: !!process.env.QUIRK });
  const out = `previews/rig-${process.env.QUIRK ? "quirk" : "strip"}-${id}${process.env.SHOES ? "-" + process.env.SHOES : ""}.png`;
  writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", out, `(${n} frames, tiles ${tw}x${th})`, b.errors.length ? b.errors : "");
}
await b.close();
