// Behaviour metrics keep historical references informational and reject invalid measurements separately.
export function metric(id, value, unit, reference) {
  if(!Number.isFinite(value))throw Error(`Invalid measurement ${id}: ${value}`);
  const withinReference=reference.operator==='>='?value>=reference.value:reference.operator==='>'?value>reference.value:reference.operator==='<'?value<reference.value:undefined;
  if(withinReference===undefined||!Number.isFinite(reference.value))throw Error(`Invalid reference for ${id}`);
  return {id,value,unit,reference,withinReference};
}
export function summary(report) {
  const lines=[`# Behaviour report: ${report.status}`,'',`Source: ${report.sha}. Duration: ${report.seconds.toFixed(3)} s.`,'','Historical numeric references are informational, not release gates. Execution errors are separate.','','| Measurement | Actual | Historical reference | Observation |','|---|---:|---:|---|'];
  for(const system of report.systems)for(const m of system.metrics)lines.push(`| ${m.id} | ${m.value} ${m.unit} | ${m.reference.operator} ${m.reference.value} | ${m.withinReference?'within reference':'outside reference'} |`);
  if(report.error)lines.push('',`Execution error: ${report.error}`);
  return lines.join('\n')+'\n';
}
