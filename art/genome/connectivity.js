// Eight-connected material mask: diagonal pixel contacts count as attached.
// Keep all materials, including small/bright pieces; no size exemption can
// hide a detached ear tip. Largest component is treated as the body.
export function spriteConnectivity(sp) {
  const { w, h, m } = sp, seen = new Uint8Array(w * h), components = [];
  for (let start = 0; start < m.length; start++) {
    if (!m[start] || seen[start]) continue;
    const queue = [start]; seen[start] = 1;
    for (let at = 0; at < queue.length; at++) {
      const index = queue[at], x = index % w, y = Math.floor(index / w);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if ((!dx && !dy) || xx < 0 || xx >= w || yy < 0 || yy >= h) continue;
        const next = yy * w + xx;
        if (m[next] && !seen[next]) { seen[next] = 1; queue.push(next); }
      }
    }
    components.push(queue.length);
  }
  components.sort((a, b) => b - a);
  return { connected: components.length === 1, components, detachedPixels: components.slice(1).reduce((sum, n) => sum + n, 0) };
}

// Compare the same species/level/frame/view against Current. Absolute counts
// remain evidence, not a verdict about deliberate effects in the shipped art.
export function connectivityRegression(current, candidate, pixelTolerance = 3) {
  if (!Number.isInteger(pixelTolerance) || pixelTolerance < 0) throw new Error("Connectivity pixel tolerance must be a nonnegative integer");
  const baseline = spriteConnectivity(current), selected = spriteConnectivity(candidate);
  return { good: selected.components.length <= baseline.components.length && selected.detachedPixels <= baseline.detachedPixels + pixelTolerance,
    current: baseline, candidate: selected, pixelTolerance };
}
