// Render bounded human reviews with explicit case membership and undivided file timings.
// Imported by node tools/tests/inventory.mjs; does not execute game code.
const keepIds={'saves-replay-robustness':'S-KEEP',legends:'L-KEEP','art-rendering':'AR-KEEP','creatures-movement':'C-KEEP','house-treehouse':'H-KEEP','invites-party':'IP-KEEP','music-audio':'M-KEEP','tools-ci':'T-KEEP','ui-menus-controls':'U-KEEP','world-islands-lakes':'W-KEEP'};
const count=(n,noun='test')=>`${n} ${noun}${n===1?'':'s'}`;
const prose=text=>String(text).replace(/\b(at|report|reports|original|source|head|prototype|released|rule|file|test|tests|case|cases|since|before|after|over|within|under|above|below|about|all|the|these|those|for|from|by|plus|than|and|or|only|with|without|default|current|old|new|Ed)(?=\d)/gi,'$1 ').replace(/(\d)(?=(?:ms|s|m|bpm|Hz)\b)/g,'$1 ').replace(/(\d)(?=(?:tests|cases|files|seeds|IDs|frames|pixels|seconds|minutes|entries)\b)/g,'$1 ');
export function reviewMembers(data, group) {
  return data.files.filter(f=>group.caseIds || group.files.includes(f.file)).flatMap(f=>f.cases.filter(c=>(!group.caseIds || group.caseIds.includes(c.id)) && (!group.includeLines || group.includeLines.includes(c.line)) && !group.excludeLines?.includes(c.line) && !group.excludeIds?.includes(c.id)).map(c=>({...c,file:f.file})));
}
export function applyReviews(data,reviews) {
  const used=new Set();
  for(const [system,review] of Object.entries(reviews)) for(const group of review.groups) {
    const members=reviewMembers(data,group);
    if(group.caseIds && members.length!==group.caseIds.length)throw Error(`Missing semantic case in ${group.id}`);
    if(!members.length) throw Error(`Empty semantic group ${group.id}`);
    for(const example of group.examples) if(!members.some(c=>c.name===example)) throw Error(`Example missing in ${group.id}: ${example}`);
    for(const member of members) {
      if(used.has(member.id)) throw Error(`Duplicate semantic group member: ${member.id}`);
      used.add(member.id);
      const c=data.files.find(f=>f.file===member.file).cases.find(c=>c.id===member.id);
      const kind=group.caseKinds?.[c.id]??(group.kind==='current rules' && c.kind==='hard limits'?'hard limits':group.kind);
      Object.assign(c,{system,kind,reason:group.reason,semanticGroup:group.id,currentness:'setup and assertions read; proposed decision awaits Ed',recommendation:group.question});
    }
  }
  for(const review of Object.values(reviews))for(const [owner,ids] of Object.entries(review.ownerCases??{}))for(const id of ids){
    const c=data.files.flatMap(f=>f.cases).find(c=>c.id===id);
    if(!c)throw Error(`Missing owner case ${id}`);
    if(used.has(id))throw Error(`Owner case already grouped ${id}`);
    Object.assign(c,{system:owner==='1622'?'combat':'multiplayer',owner:`#${owner}`,recommendation:`existing owner #${owner}; no parallel audit decision`});
  }
  for(const review of Object.values(reviews))for(const [system,ids] of Object.entries(review.routing??{}))for(const id of ids){
    const c=data.files.flatMap(f=>f.cases).find(c=>c.id===id);
    if(!c)throw Error(`Missing routing case ${id}`);
    if(!used.has(id))c.system=system;
  }
  return data;
}
export function reviewOutputs(data,reviews) {
  const out={};
  let appendix='# Semantic review membership and rulings\n\nReviewed source groups; the separate unreviewed manifest proposes no changes. No test change is authorized. Each group lists source templates, not expanded executions. Durations sum unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.\n\n';
  for(const [system,review] of Object.entries(reviews)) {
    appendix+=`## ${system}: review provenance\n\n${prose(review.status)}\n\n`;
    const changes=review.groups.filter(g=>g.action);
    const keeps=review.groups.filter(g=>!g.action);
    const groups=review.groups.map(g=>{
      const members=reviewMembers(data,g), files=data.files.filter(f=>new Set(members.map(c=>c.file)).has(f.file));
      const seconds=files.reduce((n,f)=>n+(f.fileRuntimeSeconds??0),0).toFixed(3);
      const missing=files.filter(f=>f.fileRuntimeSeconds===null).length;
      const known=files.length-missing;
      const timing=!known?'file time unknown':`${missing?'known ':''}files take ${Number(seconds)<0.5?'<1':`~${Math.round(Number(seconds))}`} s${missing?`; ${count(missing,'file')} ${missing===1?'has':'have'} unknown timing`:''}`;
      appendix+=`<a id="${g.id.toLowerCase()}"></a>\n\n## ${g.id}: ${prose(g.title)}\n\n${g.kind}; ${count(members.length)}; ${timing}.\n\n${prose(g.reason)}\n\n`+members.map(c=>`- [${c.file}:${c.line}](../../${c.file}#L${c.line}): ${c.name}`).join('\n')+'\n\n';
      const examples=g.examples.map((n,i)=>{const c=members.find(c=>c.name===n);const label=prose(g.exampleLabels?.[i]??n);return `[${label}](../../${c.file}#L${c.line})`;}).join('; ');
      return {id:g.id,title:prose(g.title),count:members.length,timing,action:g.action,text:`<a id="${g.id.toLowerCase()}"></a>\n\n### ${g.id}. ${prose(g.title)}\n\n**${count(members.length)} · ${g.kind} · ${timing}.**\n\nExamples: ${examples}.\n\n${g.action?`**Yes/no: ${prose(g.question)}** `:''}[Assertions, rationale and exact membership](semantic-groups.md#${g.id.toLowerCase()}).\n`};
    });
    appendix+=`## ${system}: ruling review\n\n`+review.rulings.map(s=>`- ${prose(s)}`).join('\n')+'\n\n';
    const kept=groups.filter(g=>!g.action);
    const keepDetails=kept.map(g=>`- [${g.id}: ${g.title}](semantic-groups.md#${g.id.toLowerCase()}): ${count(g.count)}; ${g.timing}.`).join('\n')+'\n\n<details>\n<summary>Examples and evidence for the kept groups</summary>\n\n'+kept.map(g=>g.text).join('\n')+'\n</details>';
    out[`${system}.md`]=`# ${review.title??(system==='legends'?'Legends':'Saves, replay and robustness')}\n\n${count(changes.length,'change')} proposed, ${count(keeps.length,'group')} to keep.\n\n## What these protect\n\n${review.protections.map(s=>`- ${prose(s)}`).join('\n')}\n\nFile times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.\n\n## Proposed changes\n\n${changes.length?groups.filter(g=>g.action).map(g=>g.text).join('\n'):'None in the reviewed groups.'}\n\n## Keep as they are\n\n${keepDetails}\n\n**${keepIds[system]} — Yes/no: Keep ${keeps.map(g=>g.id).join(', ')} as they are?** They protect ${prose(review.keepSummary??'the rules and integrity guarantees described above')}.\n\n[Review scope and provenance](semantic-groups.md#${system}-review-provenance). [Old/current rulings](semantic-groups.md#${system}-ruling-review). No change happens before Ed rules.\n`;
  }
  out['semantic-groups.md']=appendix;
  out['combat.md']='# Combat\n\n**Already decided by the combat builder and live in v6972. No question for Ed.**\n\n- Removed old three-role packs, categorical fighting styles, lull/travel percentages and timed special-occurrence/winner prerequisites. They prescribed the replaced model or judged whole encounters by deadlines.\n- Replaced them with controlled checks of numerical profiles, chosen actions, pressure/cooldowns, trajectory and movement ownership. Effects remain in gameplay; the obsolete outcome prerequisites were removed.\n- Actual landed/missed hits now test damage, counters, stun and attribution directly. The population test uses explicit beach runaways and the real victory transition rather than requiring a bot win first.\n- Retained no-teleport, finite values, geometry, damage attribution, grammar/engine and readability protections. Youth-scale numerical failures were repaired without relaxing those limits.\n\n[Complete combat test dispositions](../plans/combat-spacing-test-changes.md). Remaining combat coverage is listed with #1622 in the [inventory](inventory.json); this audit proposes no duplicate decision.\n';
  out['multiplayer.md']='# Multiplayer\n\nExisting owner: #1609. Its decisions and test changes remain with that owner. This audit lists tests in the [inventory](inventory.json) and [catalogue](cases.md#multiplayer); it proposes no parallel system decision or test rewrite.\n';
  return out;
}
export function questionList(data,reviews) {
  let changes='',keeps='';
  for(const [system,review] of Object.entries(reviews)) {
    for(const group of review.groups.filter(g=>g.action)) {
      const question=prose(group.indexQuestion??group.question.split('?')[0]+'?');
      changes+=`- **${group.id} — ${question}** ${count(reviewMembers(data,group).length)}. [${review.title??system}](${system}.md#${group.id.toLowerCase()}).\n`;
    }
    const groups=review.groups.filter(g=>!g.action),n=groups.reduce((n,g)=>n+reviewMembers(data,g).length,0);
    keeps+=`- **${keepIds[system]} — Keep ${groups.map(g=>g.id).join(', ')} unchanged?** ${count(n)}; protect ${prose(review.keepSummary??'the named rules and integrity guarantees')}. [${review.title??system}](${system}.md#keep-as-they-are).\n`;
  }
  return '\n## One yes/no list for Ed\n\nAnswer by ID. Changes come first; each linked page explains what yes preserves and changes. Combat is already decided; multiplayer remains with its owner.\n\n### Proposed changes\n\n'+changes+'\n### Keep unchanged\n\n'+keeps;
}
