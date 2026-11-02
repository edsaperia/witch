// Render bounded human reviews with explicit case membership and undivided file timings.
// Imported by node tools/tests/inventory.mjs; does not execute game code.
export function reviewMembers(data, group) {
  return data.files.filter(f=>group.files.includes(f.file)).flatMap(f=>f.cases.filter(c=>(!group.includeLines || group.includeLines.includes(c.line)) && !group.excludeLines?.includes(c.line) && !group.excludeIds?.includes(c.id)).map(c=>({...c,file:f.file})));
}
export function applyReviews(data,reviews) {
  const used=new Set();
  for(const [system,review] of Object.entries(reviews)) for(const group of review.groups) {
    const members=reviewMembers(data,group);
    if(!members.length) throw Error(`Empty semantic group ${group.id}`);
    for(const example of group.examples) if(!members.some(c=>c.name===example)) throw Error(`Example missing in ${group.id}: ${example}`);
    for(const member of members) {
      if(used.has(member.id)) throw Error(`Duplicate semantic group member: ${member.id}`);
      used.add(member.id);
      const c=data.files.find(f=>f.file===member.file).cases.find(c=>c.id===member.id);
      Object.assign(c,{system,kind:group.kind,reason:group.reason,semanticGroup:group.id,currentness:'setup and assertions read; proposed decision awaits Ed',recommendation:group.question});
    }
  }
  return data;
}
export function reviewOutputs(data,reviews) {
  const out={};
  let appendix='# Semantic review membership and rulings\n\nCore-file format preview only; the rest of the audit remains in progress. Each group lists source declarations, not expanded executions. Durations use the sum of unique containing-file timings from the existing CI run. Partial-file groups include unrelated cases, overlapping groups reuse file timings, and none of these sums is CI wall time or savings.\n\n';
  for(const [system,review] of Object.entries(reviews)) {
    const groups=review.groups.map(g=>{
      const members=reviewMembers(data,g), files=data.files.filter(f=>new Set(members.map(c=>c.file)).has(f.file));
      const seconds=files.reduce((n,f)=>n+(f.fileRuntimeSeconds??0),0).toFixed(3);
      const missing=files.filter(f=>f.fileRuntimeSeconds===null).length;
      const timing=`~${seconds} historical file-seconds${missing?`; ${missing} files unknown`:''}`;
      appendix+=`<a id="${g.id.toLowerCase()}"></a>\n\n## ${g.id}: ${g.title}\n\n${g.kind}; ${members.length} declarations; ${timing}.\n\n${g.reason}\n\n`+members.map(c=>`- [${c.file}:${c.line}](../../${c.file}#L${c.line}): ${c.name}`).join('\n')+'\n\n';
      const examples=g.examples.map(n=>{const c=members.find(c=>c.name===n);const label=n.length>58?n.slice(0,55).replace(/\s+\S*$/,'')+'…':n;return `[${label}](../../${c.file}#L${c.line})`;}).join('; ');
      return `### ${g.id}. ${g.title}\n\n**${members.length} declarations · ${g.kind} · ${timing}.**\n\nExamples: ${examples}.\n\n**Yes/no: ${g.question}** [Assertions, rationale and exact membership](semantic-groups.md#${g.id.toLowerCase()}).\n`;
    });
    appendix+=`## ${system}: ruling review\n\n`+review.rulings.map(s=>`- ${s}`).join('\n')+'\n\n';
    out[`${system}.md`]=`# ${system==='legends'?'Legends':'Saves, replay and robustness'}\n\n${review.status}\n\n## What these protect\n\n${review.protections.map(s=>`- ${s}`).join('\n')}\n\n## Proposed decisions\n\n${groups.join('\n')}\n\nHistorical containing-file durations are approximate context, **not case time or savings**. Partial-file groups include other cases; overlapping file totals must not be added. [Old/current ruling comparisons](semantic-groups.md#${system}-ruling-review). No change happens before Ed rules.\n`;
  }
  out['semantic-groups.md']=appendix;
  for(const [id,owner] of [['combat',1622],['multiplayer',1609]])out[`${id}.md`]=`# ${id==='combat'?'Combat':'Multiplayer'}\n\nExisting owner: #${owner}. Its decisions and test changes remain with that owner. This audit lists declarations in the [inventory](inventory.json) and [catalogue](cases.md#${id}); it proposes no parallel system decision or test rewrite.\n`;
  return out;
}
