// Real sprites are checked in art/check.mjs; small unit fixtures exercise each rejection.
import { M } from '../core.js';
export function sleepingLegendSizeProblems(awake, breaths) {
  const bad = [], forbidden = new Set([M.PUPIL, M.IRIS, M.MAGIC, M.MAGIC2, M.GLOW]);
  if (breaths.length !== 2) return ['two breathing frames required'];
  breaths.forEach((sp, frame) => {
    if (!(sp.h <= awake.h)) bad.push(`frame${frame}: height`);
    if (!sp.m.slice(-sp.w).some(Boolean)) bad.push(`frame${frame}: bottom row`);
    if (!sp.n.every(Number.isFinite)) bad.push(`frame${frame}: finite normals`);
    if (sp.m.some(mat => forbidden.has(mat))) bad.push(`frame${frame}: awake eyes/glow`);
    if (!(sp.groundLine > 0)) bad.push(`frame${frame}: ground line`);
    if (!(sp.origin?.[0] >= 0 && sp.origin[0] <= sp.w)) bad.push(`frame${frame}: origin`);
  });
  if (breaths[0].m.length === breaths[1].m.length && breaths[0].m.every((mat, i) => mat === breaths[1].m[i])) bad.push('no breath');
  return bad;
}
