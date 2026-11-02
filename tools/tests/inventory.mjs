// Static test inventory and provisional, review-only system decisions. Never imports tests.
// node tools/tests/inventory.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { applyReviews, reviewOutputs } from './semantic.mjs';

export const systems = {
  combat: ['Combat', 'Damage and fighting values follow the current rules.', 'Emergent victory rates remain separate from safety guarantees.', 'Combat decisions and test changes belong to #1622.'],
  'creatures-movement': ['Creatures and movement', 'Creatures move within the permitted world.', 'State transitions preserve valid creature data.', 'Movement and population rules need their current design checked.'],
  'invites-party': ['Invites and party', 'Invitations and party membership follow current rules.', 'Costs and rewards remain consistent.', 'Joining and leaving preserve valid state.'],
  legends: ['Legends', 'Legend quests and rewards follow current decisions.', 'Sleeping and waking preserve valid state.', 'Fixtures distinguish area rules from old raw-cell assumptions.'],
  'world-islands-lakes': ['World, islands and lakes', 'Generated land and water remain valid.', 'Island transitions preserve the run.', 'Shape and size expectations need current design evidence.'],
  'house-treehouse': ['House and treehouse', 'Rooms and stations remain reachable.', 'House interactions preserve progress.', 'Layout expectations need current design evidence.'],
  'music-audio': ['Music and audio', 'Audio remains finite and within safety limits.', 'Music and sound respond to game state.', 'Style and tuning expectations need current decisions.'],
  'ui-menus-controls': ['UI, menus and controls', 'Controls reach their intended action.', 'Menus preserve focus and pause behavior.', 'Displayed values agree with game state.'],
  'saves-replay-robustness': ['Saves, replay and robustness', 'Saved progress round-trips safely.', 'Replay and seeded behavior remain deterministic.', 'Invalid data fails safely without corrupting state.'],
  multiplayer: ['Multiplayer', 'Authority and ownership remain enforced.', 'Messages preserve valid synchronized state.', 'Changes and decisions belong to #1609.'],
  'art-rendering': ['Art and rendering checks', 'Geometry and visual data remain valid.', 'Rendering budgets remain hard limits.', 'Appearance expectations need current design evidence.'],
  'tools-ci': ['Tools and CI', 'Build and review tools report failures honestly.', 'Selection and reporting preserve coverage.', 'Tool fixtures remain independent of game outcome targets.'],
};
const skip = new Set(['.git', 'node_modules', 'work', 'previews', 'dist', '.agents', '.codex', 'coverage']);
const slash = p => p.replaceAll('\\', '/');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function files(root, dir = '') {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(e => {
    const p = slash(path.join(dir, e.name));
    return e.isDirectory() ? (skip.has(e.name) ? [] : files(root, p)) : /\.test\.(ts|mjs|cjs)$/.test(p) ? [p] : [];
  }).sort();
}
function chain(node, sf) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return `${chain(node.expression, sf)}.${node.name.text}`;
  if (ts.isCallExpression(node) || ts.isTaggedTemplateExpression(node)) return chain(node.expression ?? node.tag, sf);
  return '';
}
export function parseCases(source, file) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const aliases = new Map([['it', 'it'], ['test', 'test'], ['describe', 'describe'], ['suite', 'describe']]);
  for (const n of sf.statements) if (ts.isImportDeclaration(n) && /^(vitest|node:test)$/.test(n.moduleSpecifier.text)) {
    const bindings = n.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) for (const el of bindings.elements) aliases.set(el.name.text, el.propertyName?.text ?? el.name.text);
    if (n.importClause?.name && n.moduleSpecifier.text === 'node:test') aliases.set(n.importClause.name.text, 'test');
  }
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, source);
  const comments = [];
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) if ([ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.MultiLineCommentTrivia].includes(token)) comments.push({start: scanner.getTokenPos(), end: scanner.getTextPos(), text: scanner.getTokenText()});
  const results = [];
  function visit(n, suites = [], inherited = []) {
    if (ts.isCallExpression(n)) {
      const parts = chain(n.expression, sf).split('.');
      const kind = aliases.get(parts[0]);
      const name = n.arguments[0];
      const literal = name && (ts.isStringLiteralLike(name) || ts.isTemplateExpression(name));
      const computed = name && n.arguments.slice(1).some(a=>ts.isArrowFunction(a) || ts.isFunctionExpression(a));
      if ((literal || computed) && ['it', 'test', 'describe'].includes(kind)) {
        const leading = comments.filter(c => c.end <= n.getStart(sf) && c.start >= n.getFullStart());
        const header = comments.filter(c => c.start < (sf.statements[0]?.getStart(sf) ?? 0));
        const scoped = [...header.map(c=>({...c,scope:'file'})), ...inherited, ...leading.map(c=>({...c,scope:'declaration'})), ...comments.filter(c=>c.start >= n.getStart(sf) && c.end <= n.end).map(c=>({...c,scope:'body'}))];
        const citations = [...new Map(scoped.filter(c=>/\bEd\b|playtest|ruling|decision/i.test(c.text) && /20\d\d-\d\d-\d\d|\bv\d{3,}\b/.test(c.text)).map(c=>[c.start,{line:sf.getLineAndCharacterOfPosition(c.start).line+1,scope:c.scope,quote:c.text.trim().slice(0,700),excerptTruncated:c.text.trim().length>700,dates:[...c.text.matchAll(/20\d\d-\d\d-\d\d/g)].map(m=>m[0])}])).values()];
        const title = ts.isStringLiteralLike(name) ? name.text : name.getText(sf);
        if (/20\d\d-\d\d-\d\d|\bv\d{3,}\b/.test(title)) citations.push({line:sf.getLineAndCharacterOfPosition(name.getStart(sf)).line+1,scope:'name',quote:title,dates:[...title.matchAll(/20\d\d-\d\d-\d\d/g)].map(m=>m[0])});
        if (kind === 'describe') {
          for (const a of n.arguments.slice(1)) visit(a, [...suites, title], [...inherited,...leading.map(c=>({...c,scope:'suite'}))]);
          return;
        }
        const line = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
        results.push({id:`${file}:${line}`, line, name:title, suites, fullName:[...suites,title].join(' > '), parameterized:parts.includes('each') || parts.includes('for'), dynamicName:!ts.isStringLiteralLike(name), modifiers:parts.slice(1), citations, simulationContext:/\b(stepGame|stepCreature|stepCombat|simulate|runNight|tickGame)\s*\(/.test(source), body:n.getText(sf)});
        return;
      }
    }
    ts.forEachChild(n, child=>visit(child,suites,inherited));
  }
  visit(sf);
  return {cases:results, parseErrors:sf.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' '))};
}
export function systemFor(file, name = '') {
  // File ownership is the first pass. Case prose ("what", "start", "soundsystem")
  // must not accidentally match hat/art/audio and scatter one file across systems.
  const s = file.toLowerCase();
  if (/multiplayer|online|network|relay|authority|telephone/.test(s)) return 'multiplayer';
  if (/^tools\//.test(file)) return 'tools-ci';
  if (/save|replay|serializ|robust|migration/.test(s)) return 'saves-replay-robustness';
  if (/src\/render\//.test(s)) return 'art-rendering';
  if (/music|audio|(?:\/sound\.)|singer|samples/.test(s)) return 'music-audio';
  if (/legend|quest/.test(s)) return 'legends';
  if (/combat|fight|damage|siege|attack|balance/.test(s)) return 'combat';
  if (/invite|party|sigil|leash|soundsystem|wave|ley|pulse/.test(s)) return 'invites-party';
  if (/house|room|workshop|station|bedroom|broom|hat/.test(s)) return 'house-treehouse';
  if (/render|geometry|sprite|(?:^|\/)art|mesh|shader|palette|texture|indicator/.test(s)) return 'art-rendering';
  if (/island|lake|world|terrain|biome|archipelago|beach/.test(s)) return 'world-islands-lakes';
  if (/menu|control|input|screen|ui\/|app\/|platform\//.test(s)) return 'ui-menus-controls';
  return 'creatures-movement';
}
export function classify(c) {
  const title = c.fullName.toLowerCase();
  if (/round.?trip|determin|replay|authority|ownership|no nan|finite|teleport|crash|corrupt|budget|performance|invalid|reject|serialize|deserializ/.test(title)) return {kind:'hard limits', reason:'Safety, integrity, determinism or budget signal in the case name.', recommendation:'keep'};
  if (/(legacy|obsolete|superseded|removed rule|old design)/.test(title)) return {kind:'leftovers',reason:'Historical-rule wording; compatibility coverage may still be required.',recommendation:'review before any rewrite or deletion'};
  const steps=/\b(run|runFor|runNight|stepGame|stepCreature|stepCombat|step|tick|simulate|advance|duel|battle|fight)\s*\(/i.test(c.body);
  const aggregate=/\.toBe(?:GreaterThan|LessThan|CloseTo)|\.toHaveLength\s*\(|expect\s*\([^;\n]*(?:\.length|\b(?:mean|average|share|ratio|count|hits|shots|distance|maxAway|elapsed|survived|landed|won|wins|dead|alive|damage|hp)\b)/i.test(c.body);
  const outcomeName=/(surviv|win rate|wins? within|defeat|victor|average|percentile|outcome|within \d+|seconds|hits|charge|momentum|hunt|dodge)/.test(title);
  if (steps && (c.simulationContext || /\b(simulate|runNight|duel|battle)\s*\(/.test(c.body)) && (aggregate || outcomeName)) return {kind:'outcome stats',reason:'Candidate: stepped simulation plus aggregate/threshold or bounded-outcome assertion. Mixed direct-rule and safety assertions require semantic review before any move.',recommendation:'review simulation assertions; consider report after Ed rules'};
  if (/(surviv|win rate|wins? within|defeat|victor|average|percentile|outcome)/.test(title) && /(step|tick|simulate|generate|world|runNight|advance)/i.test(c.body)) return {kind:'outcome stats',reason:'Candidate: outcome wording plus simulation signal; inspect assertions before acting.',recommendation:'consider report after Ed rules'};
  return {kind:'current rules',reason:'Provisional default; direct-rule intent and current design require review.',recommendation:'keep pending design review'};
}
function evidence(root) {
  const paths = ['DESIGN.md', ...fs.readdirSync(path.join(root,'docs/notes')).filter(p=>p.endsWith('.md')).map(p=>`docs/notes/${p}`)];
  return paths.flatMap(file=>fs.readFileSync(path.join(root,file),'utf8').split(/\r?\n/).flatMap((quote,i)=>/supersed|no longer|replac|retir|removed|\bsince\b|\bbefore\b/i.test(quote) ? [{file,line:i+1,quote:quote.trim(),dates:[...quote.matchAll(/20\d\d-\d\d-\d\d/g)].map(m=>m[0])}] : []));
}
const words = s => new Set((s.toLowerCase().match(/[a-z][a-z0-9]{4,}/g) ?? []).filter(w=>!['should','their','there','which','after','before','these','tests','test','current','state','value','values','would','could','never','always','first','still'].includes(w)));
export function candidates(c, sources) {
  const tokens = words(`${c.fullName} ${c.citations.map(x=>x.quote).join(' ')}`);
  const dates = c.citations.flatMap(x=>x.dates).sort();
  const latest = dates.at(-1);
  if (!latest) return [];
  return sources.filter(e=>e.dates.some(d=>d>latest)).map(e=>({...e, overlap:[...words(e.quote)].filter(w=>tokens.has(w))})).filter(e=>e.overlap.length>=3).sort((a,b)=>b.overlap.length-a.overlap.length).slice(0,2).map(e=>({...e,quote:e.quote.slice(0,700), status:'candidate only: same-topic wording and later inline date; not a verified superseding ruling'}));
}
export function build(root) {
  const timing = JSON.parse(fs.readFileSync(path.join(root,'tools/ci/unit-timings.json'),'utf8'));
  const sources = evidence(root);
  const entries = files(root).map(file=>{
    const source = fs.readFileSync(path.join(root,file),'utf8');
    const parsed = parseCases(source,file);
    return {file,sha256:hash(source),scope:file.endsWith('.cjs')?'supplementary CJS':'requested TS/MJS',fileRuntimeSeconds:timing.seconds[file] ?? null,runtimeSource:timing.seconds[file] == null ? null : timing._source,coverageNote:'Source declarations only: loops, factories, computed registrations and imported helper-generated cases may register additional runtime cases. File and suite citations are context, not necessarily the assertion ruling. Truncated excerpts retain a source line.',parseErrors:parsed.parseErrors,cases:parsed.cases.map(c=>{
      const {body,...rest}=c;
      return {...rest,system:systemFor(file,c.fullName),...classify(c),currentness:'unverified: human design review required',supersessionCandidates:candidates(c,sources),caseRuntimeSeconds:null};
    })};
  });
  return {schemaVersion:1,method:'Static declarations, not executed or expanded cases. Heuristic classifications are review prompts, not Ed rulings. Existing CI file durations are historical; case durations are unknown and never apportioned.',timingSource:timing._source,files:entries};
}
const cell = s => String(s).replaceAll('|','\\|').replaceAll('\n',' ').replaceAll('\r','');
export function outputs(data, reviews = {}) {
  const all=data.files.flatMap(f=>f.cases.map(c=>({...c,file:f.file})));
  const summary = `# Test audit inventory\n\nAudit only, #1631 / draft #1632. No test is changed or approved for deletion.\n\n${data.files.length} files; ${all.length} source case declarations. Parameterized and loop-generated cases are not expanded. CJS files are supplementary to the requested TS/MJS scope.\n\n${data.files.filter(f=>f.fileRuntimeSeconds!==null).length} files have historical CI durations from [the existing run](${data.timingSource}); all case durations are unknown. File duration includes runner effects and cannot be added to infer parallel CI wall time saved.\n\nKinds are first guesses. “Current rules” is a provisional default, not proof of a current Ed ruling. Historical citations may describe setup or compatibility. Supersession candidates require human confirmation. Nothing adopts the proposed standing rule.\n\nRun \`node tools/tests/inventory.mjs\` to refresh; \`--check\` verifies generated outputs. Reads source only; never imports or executes game tests.\n\n## System decisions\n\n${Object.entries(systems).map(([id,[title]])=>`- [${title}](${id}.md): ${all.filter(c=>c.system===id).length} declarations`).join('\n')}\n\nThe short system pages link to the exhaustive [case catalogue](cases.md) and [machine inventory](inventory.json). File timings live in the JSON. Review every cited assertion before granting a grouped deletion. No measured CI savings are claimed.\n`;
  const result = {'inventory.json':JSON.stringify(data,null,2)+'\n','README.md':summary};
  for (const [id,[title,...protections]] of Object.entries(systems)) {
    const cases=all.filter(c=>c.system===id);
    const counts=Object.fromEntries(['hard limits','current rules','outcome stats','leftovers'].map(k=>[k,cases.filter(c=>c.kind===k).length]));
    const owner=id==='combat'?'#1622 owns combat changes. Its existing decision is not reopened here.':id==='multiplayer'?'#1609 owns multiplayer changes. Authority protections remain hard limits.':'Any implementation follows a separate, small system PR after Ed rules.';
    result[`${id}.md`]=`# ${title}\n\nAudit only. ${owner}\n\n## What these tests aim to protect\n\n${protections.map(p=>`- ${p}`).join('\n')}\n\n## First guesses\n\n| Kind | Declarations |\n|---|---:|\n${Object.entries(counts).map(([k,n])=>`| ${k} | ${n} |`).join('\n')}\n\nThese are machine guesses, not confirmed design decisions. See [all ${title.toLowerCase()} cases](cases.md#${id}) for names, citations, recommendations and runtime limits.\n\n## Group decisions for Ed\n\n1. Keep the safety and integrity protections. Review the provisional rule group against today's design before any changes.\n2. ${id==='combat'?'Apply #1622’s outcome-test decision through its owner; this audit proposes no duplicate edits.':id==='multiplayer'?'Have #1609 review these classifications after its integration; this audit proposes no authority-test edits.':`Review the ${counts['outcome stats']} outcome-stat declarations as a group for possible nonblocking reports. No move happens before your ruling.`}\n3. Review the ${counts.leftovers} historical-wording declarations for compatibility purpose. Choose keep, rewrite or delete only after checking the case and a specific superseding ruling. An older date alone is insufficient.\n\nCase runtimes are unknown. Historical file timings are in the inventory; no savings estimate or new benchmark run is claimed.\n`;
  }
  result['cases.md']='# Exhaustive case catalogue\n\nStatic declarations only. All classifications and currentness are provisional. Case runtime is unknown throughout; file timings and provenance are in inventory.json. Parameterized templates are not expanded.\n\n'+Object.entries(systems).map(([id,[title]])=>`<a id="${id}"></a>\n\n## ${title}\n\n`+all.filter(c=>c.system===id).map(c=>`- **${cell(c.fullName)}** — [${c.file}:${c.line}](../../${c.file}#L${c.line})${c.parameterized?' (parameterized template)':''}\n  - ${c.kind}; ${c.recommendation}. Currentness: unverified. Case runtime: unknown.\n  - Cited ruling: ${c.citations.length?c.citations.map(q=>`${q.scope}, line ${q.line}: ${cell(q.quote)}`).join(' / '):'none found in scoped comments; not proof that none exists.'}\n${c.supersessionCandidates.map(e=>`  - Possible later evidence: [${e.file}:${e.line}](../../${e.file}#L${e.line}): ${cell(e.quote)}. ${e.status}.\n`).join('')}`).join('\n')).join('\n');
  result['README.md']=result['README.md'].replace('Audit only, #1631 / draft #1632.','Audit only, #1631 / draft #1632.\n\n**Semantic review in progress.** Saves/replay and legends are bounded format-check previews, with concrete groups in [semantic-groups.md](semantic-groups.md). Other system pages remain unreviewed placeholders and are not ready for Ed. Combat and multiplayer retain their existing owners. The initial catalogue remains a machine-first reading aid; reviewed classifications and membership are in inventory.json and semantic-groups.md.');
  for(const id of Object.keys(systems))if(!reviews[id] && !['combat','multiplayer'].includes(id))result[`${id}.md`]=result[`${id}.md`].replace('\n\n','\n\n**Not ready for Ed: semantic review pending.** The generic prompts below are placeholders, not proposed group decisions.\n\n');
  return {...result,...reviewOutputs(data,reviews)};
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
  const out=path.join(root,'docs/test-audit');
  const reviews=JSON.parse(fs.readFileSync(path.join(root,'tools/tests/semantic-reviews.json'),'utf8'));
  const generated=outputs(applyReviews(build(root),reviews),reviews);
  let stale=false;
  fs.mkdirSync(out,{recursive:true});
  for(const [name,content] of Object.entries(generated)) {
    const target=path.join(out,name);
    if(process.argv.includes('--check')) {if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==content){console.error(`Stale: docs/test-audit/${name}`);stale=true;}}
    else fs.writeFileSync(target,content);
  }
  if(stale)process.exitCode=1;
  else console.log(`${process.argv.includes('--check')?'Verified':'Wrote'} ${Object.keys(generated).length} audit files; no tests executed.`);
}
