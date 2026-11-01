// Lightweight Pages priority/coalescing contracts; no deployment, browser or settings mutation.
//   node --test tools/ci/pages-policy.test.cjs
const {test}=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs');
const {publicationPolicy,publicationSnapshot}=require('./pages-policy.cjs');
const workflow=fs.readFileSync('.github/workflows/pages-publish.yml','utf8');
test('live publication bypasses preview debounce and only live may preempt a running publisher',()=>{
  assert.deepEqual(publicationPolicy('repository_dispatch','pages-live'),{kind:'live',debounceSeconds:0,cancelPublisher:true});
  assert.deepEqual(publicationPolicy('workflow_dispatch'),{kind:'live',debounceSeconds:0,cancelPublisher:true});
  assert.deepEqual(publicationPolicy('repository_dispatch','pages-preview'),{kind:'preview',debounceSeconds:60,cancelPublisher:false});
  assert.throws(()=>publicationPolicy('push','arbitrary'));
  const [debounce,publish]=workflow.split('  publish:');
  assert.match(debounce,/group: pages-preview-debounce/); assert.match(debounce,/sleep 60/);
  assert.doesNotMatch(publish,/sleep 60/); assert.match(publish,/needs.debounce.result == 'skipped'/);
  assert.match(publish,/cancel-in-progress:.*workflow_dispatch.*pages-live/);
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
