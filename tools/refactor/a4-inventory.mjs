// Read-only A4 source inventory: exact extraction boundaries and public View API before the fenced split.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const sourceArg = process.argv.slice(2).find(a => a.startsWith('--source='));
const sourceCommit = execFileSync('git', ['rev-parse', '--verify', `${sourceArg ? sourceArg.slice('--source='.length) : 'HEAD'}^{commit}`], { encoding: 'utf8' }).trim();
const main = {
  pagePause: ['openPotionLab', 'openMusicLab', 'pauseControls', 'updatePauseMenus'],
  pageStations: ['findsCtx', 'workshopNow', 'useHouse', 'shutStation'],
  pageNight: ['bedFirst', 'arrived', 'wakeArrival', 'wakeFirst', 'sailFromChart', 'recordSail', 'departFromChart', 'sailInPlace', 'makeSailNight', 'warmAt', 'newNight', 'nightInPlace', 'leaveBot'],
  pageFinds: ['lendFind', 'settleLoan', 'settleLoanNow', 'startDream', 'herHead', 'stepGuide'],
  pageFrame: ['drawFrame', 'frame', 'frameBody', 'overlayHead'],
};
const view = {
  frame: ['render'],
  houseFrame: ['houseTilt', 'behindHouse', 'occluders', 'ensureCrown', 'buildHome', 'swapHomeArt'],
  markers: ['legendRings', 'pin', 'inviteStart'],
  atmosphere: ['updateMoon', 'updateSteam', 'updateSmoke'],
  readiness: ['readyPrograms', 'landingWakeReady', 'beginLandingShaders', 'armLimitedLanding', 'limitedLandingReady', 'waitForLandingWitch', 'startLandingShaderGrace', 'compileAll', 'gpuCaughtUp', 'warmDraws', 'warmSteps', 'setReadiness'],
  lifecycle: ['build', 'prepare', 'treeExtent', 'askIsland', 'setGameSteps', 'retype'],
  viewport: ['scenePixelSize', 'resize', 'screenOf', 'aimAt'],
};

function inventory(file, groups, isView) {
  const source = sourceArg ? execFileSync('git', ['show', `${sourceCommit}:${file}`], { encoding: 'utf8', maxBuffer: 8 << 20 }) : fs.readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error(`Cannot parse ${file}`);
  const cls = ast.statements.find(n => ts.isClassDeclaration(n) && n.name?.text === 'View');
  if (isView && !cls) throw new Error('Missing View class');
  const candidates = isView ? [...cls.members] : ast.statements.flatMap(n =>
    ts.isVariableStatement(n) ? [...n.declarationList.declarations] : [n]);
  const moved = new Set();
  const cuts = Object.fromEntries(Object.entries(groups).map(([group, names]) => [group, names.map(name => {
    if (moved.has(name)) throw new Error(`Duplicate cut ${name}`);
    moved.add(name);
    const nodes = candidates.filter(n => n.name?.getText(ast) === name);
    if (nodes.length !== 1) throw new Error(`Expected one ${file}:${name}, found ${nodes.length}`);
    const n = nodes[0], start = n.getStart(ast), body = n.body;
    return { name, start, end: n.end, line: ast.getLineAndCharacterOfPosition(start).line + 1,
      bytes: Buffer.byteLength(source.slice(start, n.end)), sha256: hash(source.slice(start, n.end)),
      bodySha256: body ? hash(body.getText(ast)) : null };
  })]));
  const publicApi = isView ? cls.members.filter(n => !n.modifiers?.some(m =>
    m.kind === ts.SyntaxKind.PrivateKeyword || m.kind === ts.SyntaxKind.ProtectedKeyword)).map(n => {
      // Include signatures and property initializers: both matter to mechanical identity.
      const start = n.getStart(ast), end = n.body?.getStart(ast) ?? n.end;
      return source.slice(start, end).trim();
    }) : undefined;
  return { file, sha256: hash(source), bytes: Buffer.byteLength(source), lines: source.split('\n').length,
    cuts, ...(publicApi ? { publicApi, publicApiSha256: hash(JSON.stringify(publicApi)) } : {}) };
}

const report = {
  schema: 1,
  sourceCommit,
  status: 'inventory-only; no extraction or behavioural proof',
  sources: [inventory('src/main.ts', main, false), inventory('src/render/view.ts', view, true)],
};
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
