#!/usr/bin/env python3
# Cuts the recorded frames (30 fps: every other 1/60 s step) into captioned parts and joins them.
#   assemble.py taut  -> out/taut-chain-1982.mp4      assemble.py decks -> out/decks-ring-1986.mp4 (with the recorded mix)
import json, os, subprocess, sys
S = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(S, "out"); os.makedirs(OUT, exist_ok=True)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def esc(t): return t.replace("\\", "\\\\").replace(":", "\\:").replace("'", "’").replace(",", "\\,").replace("%", "\\%")
def parts_of(states):
    """[(tag, first frame, last frame + 1)]: frame f was drawn on step 2f+1 (0-based)."""
    out = []
    for f in range(len(states) // 2):
        tag = states[2 * f + 1]["tag"]
        if out and out[-1][0] == tag: out[-1][2] = f + 1
        else: out.append([tag, f, f + 1])
    return out
def clip(name, frames, f0, f1, caption, banner, audio=None):
    """One part: frames f0..f1 of a frames dir, a caption along the bottom and a banner (NEW / OLD) top left."""
    o = os.path.join(OUT, f"part-{name}.mp4")
    vf = (f"drawtext=fontfile={FONT}:text='{esc(caption)}':fontsize=26:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=10:x=(w-text_w)/2:y=h-64,"
          f"drawtext=fontfile={FONT}:text='{esc(banner)}':fontsize=24:fontcolor=white:box=1:boxcolor={'0x9a2c2c' if banner.startswith('OLD') else '0x2c6e3a'}@0.85:boxborderw=8:x=20:y=20")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", "30", "-start_number", str(f0), "-i", os.path.join(frames, "f%05d.jpg")]
    if audio: cmd += ["-ss", f"{audio[1]:.4f}", "-t", f"{(f1 - f0) / 30:.4f}", "-f", "f32le", "-ar", "44100", "-ac", "2", "-i", audio[0]]
    else: cmd += ["-f", "lavfi", "-t", f"{(f1 - f0) / 30:.4f}", "-i", "anullsrc=r=44100:cl=stereo"]
    cmd += ["-frames:v", str(f1 - f0), "-vf", vf, "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", "30", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-shortest", o]
    subprocess.run(cmd, check=True); return o
def join(parts, name):
    lst = os.path.join(OUT, f"{name}.txt"); open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    o = os.path.join(OUT, f"{name}.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c:v", "libx264", "-crf", "28", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", o], check=True)
    print(o, os.path.getsize(o) // 1024, "KB", subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", o], capture_output=True, text=True).stdout.strip(), "s")

if sys.argv[1] == "taut":
    T = os.path.join(S, "t"); L = lambda n: json.load(open(os.path.join(T, f"{n}.states.json")))
    NEW, OLD = "NEW (#1982)", "OLD (?tautchain=0)"
    cap = {  # scene -> tag -> caption
        "tug": {"hover": "Treetops, a youth on its chain (80 m back, off screen)", "pull: dips": "Pulling past the chain's end: she is pulled down a little", "let off: rises": "She stops pulling: she rises again", "up again": "She stops pulling: she rises again",
                "pull on: comes down": "She keeps pulling: pulled down, then the full switch to the ground", "on foot, pulling: the sigil eases out": "On the ground, still pulling: the sigil eases out of her stack", "plopped": "...and plops onto the ground where she stands"},
        "yank": {"stand": "A legend on its chain (80 m back, off screen)", "walk on past the legend's chain": "Walking on past a legend's chain: it yanks her back, about every 1.2 s", "stop": "A legend's sigil never pops"},
        "look": {"three chains, game zoom": "Youth, adult and legend chains side by side (game zoom)", "zoomed out four steps": "The same, zoomed out four steps"},
        "tugold": {"hover": "Before: treetops, a youth on its chain", "old: pulling on": "Before: pulling past the chain's end never brings her down", "old: let off": "Before: pulling past the chain's end never brings her down"},
        "lookold": {"three chains, game zoom": "Before: each chain in its sigil's colour", "zoomed out four steps": "Before, zoomed out four steps"},
    }
    parts = []
    for scene in ["tug", "tugold", "yank", "look", "lookold"]:
        st = L(scene)
        # (same captions joined: one part a caption)
        merged = []
        for tag, a, b in parts_of(st):
            c = cap[scene][tag]
            if merged and merged[-1][0] == c: merged[-1][2] = b
            else: merged.append([c, a, b])
        for k, (c, a, b) in enumerate(merged): parts.append(clip(f"{scene}-{k}", os.path.join(T, scene), a, b, c, OLD if scene.endswith("old") else NEW))
    join(parts, "taut-chain-1982")
else:
    D = os.path.join(S, "d"); parts = []
    for run, banner in [("new", "NEW (#1986): the analyser ring"), ("old", "OLD (?decksfx=old): the party start's pieces")]:
        st = json.load(open(os.path.join(D, f"{run}.states.json")))
        cap = {"waiting at the decks": "At the decks, before the party spell", "the party spell cast": "The party spell cast: the party starts", "the decks' replay": "The replay at the decks (E at the decks once the party's on)"}
        for k, (tag, a, b) in enumerate(parts_of(st)):
            parts.append(clip(f"decks-{run}-{k}", os.path.join(D, run), a, b, cap[tag], banner, audio=(os.path.join(D, f"{run}.f32"), st[2 * a]["audio"])))
    join(parts, "decks-ring-1986")
