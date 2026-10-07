// A STAND-IN for the fireworks' timetable (art builder 2 is putting the real one in src/rules, shared with the shells it
// draws, so the bursts are heard on the frame they're seen): about 7 shells over 4 s from the soundsystem, each
// climbing 25 to 40 m and bursting 1.2 s after it launches. Seeded by the area's key and the wave's time.

export interface FireworkShell { launch: number; burst: number; x: number; z: number; height: number; whistle: boolean; size: number }

export function fireworkShells(e: { key: string; x: number; z: number; at: number }): FireworkShell[] {
  let h = 2166136261;
  for (const ch of `${e.key}@${e.at}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
  const n = 6 + Math.floor(rnd() * 3), out: FireworkShell[] = [];
  for (let i = 0; i < n; i++) {
    const launch = e.at + i * 0.5 + (rnd() - 0.5) * 0.2;
    out.push({ launch, burst: launch + 1.2, x: e.x + (rnd() - 0.5) * 12, z: e.z + (rnd() - 0.5) * 12, height: 25 + rnd() * 15, whistle: rnd() < 0.3, size: 0.6 + rnd() * 0.8 });
  }
  return out;
}
