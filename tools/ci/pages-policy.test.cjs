// Lightweight Pages priority/coalescing contracts; no deployment, browser or settings mutation.
//   node --test tools/ci/pages-policy.test.cjs
const {test}=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs');
const {publicationPolicy,publicationSnapshot}=require('./pages-policy.cjs');
const workflow=fs.readFileSync('.github/workflows/pages-publish.yml','utf8');
const parsed=require('yaml').parse(workflow);
test('live publication bypasses preview debounce and no request preempts a running publisher',()=>{
  assert.deepEqual(publicationPolicy('repository_dispatch','pages-live'),{kind:'live',debounceSeconds:0,cancelPublisher:false});
  assert.deepEqual(publicationPolicy('workflow_dispatch'),{kind:'live',debounceSeconds:0,cancelPublisher:false});
  assert.deepEqual(publicationPolicy('repository_dispatch','pages-preview'),{kind:'preview',debounceSeconds:60,cancelPublisher:false});
  assert.throws(()=>publicationPolicy('push','arbitrary'));
  const [debounce,publish]=workflow.split('  publish:');
  assert.match(debounce,/group: pages-preview-debounce/); assert.match(debounce,/sleep 60/);
  assert.doesNotMatch(publish,/sleep 60/); assert.match(publish,/needs.debounce.result == 'skipped'/);
  assert.match(publish,/group: pages-snapshot-publisher/);
  assert.match(publish,/cancel-in-progress: false/);
  assert.doesNotMatch(publish,/cancel-in-progress:.*(?:true|\$\{\{)/);
  assert.ok(publish.indexOf('concurrency:') < publish.indexOf('ref: gh-pages'));
  assert.deepEqual(parsed.jobs.publish.concurrency,{group:'pages-snapshot-publisher','cancel-in-progress':false});
  assert.equal(parsed.concurrency,undefined); // No outer cancellation can kill a started publisher.
});
test('an old preview replacing a queued live job still publishes the newest live root, never its stale event snapshot',()=>{
  const oldPreview={source_sha:'old-preview',rootVersion:'v1'}, live={source_sha:'live-v2',rootVersion:'v2'};
  const latest={sha:'latest-site',rootVersion:'v3'};
  for(const pending of [oldPreview,live,{source_sha:'new-preview'}]) {
    const selected=publicationSnapshot(pending,latest);
    assert.equal(selected.rootVersion,'v3'); assert.equal(selected.sha,'latest-site'); assert.equal(selected.ref,'gh-pages');
  }
  assert.match(workflow,/ref: gh-pages/);
  assert.doesNotMatch(workflow,/ref:.*(?:client_payload|github.sha)/);
  assert.throws(()=>publicationSnapshot(oldPreview,{sha:'missing-root-version'}));
});
test('Ed owns source activation, cleanup remains independent, and dispatch reaches the default-branch workflow',()=>{
  assert.match(workflow,/data.build_type === 'workflow'/);
  assert.doesNotMatch(workflow,/updatePages|createPagesSite|enablement: true/);
  assert.match(workflow,/repository_dispatch:/); assert.match(workflow,/types: \[pages-live, pages-preview\]/);
  assert.match(workflow,/pages: write/); assert.match(workflow,/id-token: write/);
  const cleanup=fs.readFileSync('.github/workflows/pages.yml','utf8');
  assert.match(cleanup,/github.event.action == 'closed'/); assert.match(cleanup,/git rm -rq/);
  assert.match(cleanup,/event_type:'pages-preview'/);
  const ci=fs.readFileSync('.github/workflows/ci.yml','utf8');
  assert.equal((ci.match(/name: Request managed Pages publication/g)||[]).length,2);
  assert.match(ci,/context.ref==='refs\/heads\/main'\?'pages-live':'pages-preview'/);
});
test('a failed or cancelled deployment is retried, a re-run can deploy, and the public root is checked (2026-11-09)',()=>{
  const steps=parsed.jobs.publish.steps, by=name=>steps.find(s=>s.name===name);
  const pack=by('Package complete site snapshot'), first=by('Deploy complete snapshot'), retry=by('Deploy again after a failed or cancelled deployment');
  // one artifact per attempt: a re-run uploads again, and two of one name stop deploy-pages
  assert.equal(pack.with.name,'github-pages-${{ github.run_attempt }}');
  for(const d of [first,retry]){ assert.equal(d.with.artifact_name,pack.with.name); assert.ok(d.with.timeout>=1800000); }
  assert.equal(first['continue-on-error'],true); assert.equal(retry.if,"steps.deployment.outcome == 'failure'");
  assert.match(parsed.jobs.publish.environment.url,/steps.retry.outputs.page_url/);
  const check=by('Check the public site serves the published live root');
  assert.ok(steps.indexOf(check)>steps.indexOf(retry)); assert.match(check.with.script,/version.json/); assert.match(check.with.script,/setFailed/);
});
test('previews: documents-only pull requests get none, and main drops those idle a week',()=>{
  const ci=fs.readFileSync('.github/workflows/ci.yml','utf8'), y=require('yaml').parse(ci);
  const steps=y.jobs.preview.steps; assert.equal(steps[0].id,'scope');
  for(const s of steps.slice(1)) assert.match(s.if,/steps.scope.outputs.docs != 'true'/);
  const deploy=y.jobs.deploy.steps.find(s=>s.name==='Publish to gh-pages').run;
  assert.match(deploy,/select\(.updated_at > \(now - 7\*86400 \| todate\)\)/);
});
test('each deployment gets its own build version, not the shared main SHA (2026-11-10)',()=>{
  const steps=parsed.jobs.publish.steps, first=steps.find(s=>s.id==='deployment'), retry=steps.find(s=>s.id==='retry');
  assert.match(first.env.GITHUB_SHA,/github.run_id.*github.run_attempt/); assert.match(retry.env.GITHUB_SHA,/-retry$/);
  assert.notEqual(first.env.GITHUB_SHA,retry.env.GITHUB_SHA);
});
