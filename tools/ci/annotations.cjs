// Bounded GitHub failure annotations shared across commands in one job; logs/artifacts remain complete.
//   node tools/ci/annotations.cjs --summary
const fs = require('node:fs');
const path = require('node:path');
const escapeData = s => String(s).replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
const escapeProperty = s => escapeData(s).replaceAll(':', '%3A').replaceAll(',', '%2C');
function createSink({ enabled = process.env.GITHUB_ACTIONS === 'true', file = process.env.WITCH_ANNOTATION_FILE ?? (process.env.RUNNER_TEMP && path.join(process.env.RUNNER_TEMP, `witch-annotations-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}-${process.env.GITHUB_JOB}.json`)), write = s => console.log(s), root = process.env.GITHUB_WORKSPACE ?? process.cwd() } = {}) {
  let memory = { total: 0, emitted: 0, kinds: {} };
  const read = () => file && fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : memory;
  const save = s => { memory = s; if (file) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(s)); } };
  return {
    error(kind, message, location = {}) {
      if (!enabled) return;
      const state = read(); state.total++; state.kinds[kind] = (state.kinds[kind] ?? 0) + 1;
      if (state.emitted < 20) {
        const properties = [`title=${escapeProperty(kind)}`];
        if (location.file) {
          const name = path.isAbsolute(location.file) ? path.relative(root, location.file) : location.file;
          properties.push(`file=${escapeProperty(name.replaceAll('\\', '/'))}`);
          if (Number.isInteger(location.line) && location.line > 0) properties.push(`line=${location.line}`);
        }
        write(`::error ${properties.join(',')}::${escapeData(String(message).slice(0, 1800))}`); state.emitted++;
      }
      save(state);
    },
    summary() {
      if (!enabled) return;
      const s = read(), counts = Object.entries(s.kinds).map(([k, n]) => `${k}: ${n}`).join(', ');
      write(`::${s.total ? 'error' : 'notice'} title=Failure totals::${escapeData(`${s.total} failure(s); ${s.emitted} detail annotation(s), ${s.total - s.emitted} omitted by the 20/job cap${counts ? ` (${counts})` : ''}. Full details remain in logs/artifacts.`)}`);
    },
  };
}
module.exports = { createSink, escapeData, escapeProperty };
if (require.main === module && process.argv.includes('--summary')) createSink().summary();
