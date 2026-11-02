// Render bounded human reviews with explicit case membership and undivided file timings.
// Imported by node tools/tests/inventory.mjs; does not execute game code.
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
      Object.assign(c,{system,kind:group.kind,reason:group.reason,semanticGroup:group.id,currentness:'setup and assertions read; proposed decision awaits Ed',recommendation:group.question});
    }
  }
  for(const review of Object.values(reviews))for(const [owner,ids] of Object.entries(review.ownerCases??{}))for(const id of ids){
    const c=data.files.flatMap(f=>f.cases).find(c=>c.id===id);
    if(!c)throw Error(`Missing owner case ${id}`);
    if(used.has(id))throw Error(`Owner case already grouped ${id}`);
    Object.assign(c,{system:owner==='1622'?'combat':'multiplayer',owner:`#${owner}`,recommendation:`existing owner #${owner}; no parallel audit decision`});
  }
  return data;
}
export function reviewOutputs(data,reviews) {
  const out={};
  let appendix='# Semantic review membership and rulings\n\nCore-file format preview only; the rest of the audit remains in progress. Each group lists source declarations, not expanded executions. Durations use the sum of unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.\n\n';
  for(const [system,review] of Object.entries(reviews)) {
    const changes=review.groups.filter(g=>g.action);
    const keeps=review.groups.filter(g=>!g.action);
    const groups=review.groups.map(g=>{
      const members=reviewMembers(data,g), files=data.files.filter(f=>new Set(members.map(c=>c.file)).has(f.file));
      const seconds=files.reduce((n,f)=>n+(f.fileRuntimeSeconds??0),0).toFixed(3);
      const missing=files.filter(f=>f.fileRuntimeSeconds===null).length;
      const timing=`~${Math.round(Number(seconds))} s of CI${missing?`; ${missing} files unknown`:''}`;
      appendix+=`<a id="${g.id.toLowerCase()}"></a>\n\n## ${g.id}: ${g.title}\n\n${g.kind}; ${members.length} declarations; ${timing}.\n\n${g.reason}\n\n`+members.map(c=>`- [${c.file}:${c.line}](../../${c.file}#L${c.line}): ${c.name}`).join('\n')+'\n\n';
      const examples=g.examples.map((n,i)=>{const c=members.find(c=>c.name===n);const label=g.exampleLabels?.[i]??n;return `[${label}](../../${c.file}#L${c.line})`;}).join('; ');
      return {id:g.id,action:g.action,text:`### ${g.id}. ${g.title}\n\n**${members.length} tests · ${g.kind} · ${timing}.**\n\nExamples: ${examples}.\n\n${g.action?`**Yes/no: ${g.question}** `:''}[Assertions, rationale and exact membership](semantic-groups.md#${g.id.toLowerCase()}).\n`};
    });
    appendix+=`## ${system}: ruling review\n\n`+review.rulings.map(s=>`- ${s}`).join('\n')+'\n\n';
    out[`${system}.md`]=`# ${review.title??(system==='legends'?'Legends':'Saves, replay and robustness')}\n\n${changes.length} changes proposed, ${keeps.length} groups to keep as they are.\n\n${review.status}\n\nTimings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.\n\n## What these protect\n\n${review.protections.map(s=>`- ${s}`).join('\n')}\n\n## Proposed changes\n\n${changes.length?groups.filter(g=>g.action).map(g=>g.text).join('\n'):'None in the reviewed groups.'}\n\n## Keep as they are\n\n${groups.filter(g=>!g.action).map(g=>g.text).join('\n')}\n\n**Yes/no: Keep ${keeps.map(g=>g.id).join(', ')} as they are?** They protect ${review.keepSummary??'the rules and integrity guarantees described above'}.\n\n[Old/current ruling comparisons](semantic-groups.md#${system}-ruling-review). No change happens before Ed rules.\n`;
  }
  out['semantic-groups.md']=appendix;
  for(const [id,owner] of [['combat',1622],['multiplayer',1609]])out[`${id}.md`]=`# ${id==='combat'?'Combat':'Multiplayer'}\n\nExisting owner: #${owner}. Its decisions and test changes remain with that owner. This audit lists declarations in the [inventory](inventory.json) and [catalogue](cases.md#${id}); it proposes no parallel system decision or test rewrite.\n`;
  return out;
}
