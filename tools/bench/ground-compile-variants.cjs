// Diagnostic-only candidate: never imported by the game.
function waterOnlyDiagnosticSource(fragment, library) {
  if (!library || fragment.split(library).length !== 2) throw new Error('lake library source shape changed');
  const guards = fragment.split('#ifndef GROUND_WATER_ONLY').length - 1;
  if (guards === 2) return fragment; // the production shader now carries these exact guards
  if (guards) throw new Error('water-only guard source shape changed');
  const start = fragment.indexOf('      float LK =');
  const end = fragment.indexOf('} else if (ld > -2.6)', start);
  if (start < 0 || end < 0) throw new Error('lake special branch source shape changed');
  const branch = fragment.slice(start, end + '} else '.length);
  return fragment.replace(library, `\n#ifndef GROUND_WATER_ONLY\n${library}\n#endif\n`)
    .replace(branch, `\n#ifndef GROUND_WATER_ONLY\n${branch}\n#endif\n`);
}
function groundCompileCases() {
  const rows = [];
  for (const version of ['baseline', 'candidate']) for (const family of ['no-lakes', 'full-lakes', ...(version === 'candidate' ? ['water-only-lakes'] : [])]) for (const beach of [false, true]) {
    rows.push({ version, family, beach, defines: { ...(family !== 'no-lakes' ? { GROUND_LAKES: '' } : {}), ...(beach ? { GROUND_BEACH: '' } : {}), ...(family === 'water-only-lakes' ? { GROUND_WATER_ONLY: '' } : {}) } });
  }
  return rows;
}
module.exports = { waterOnlyDiagnosticSource, groundCompileCases };
