// Pages publication policy: debounce previews outside the publisher lock; live requests preempt older publication.
// Every publication uses latest gh-pages, never an event's stale snapshot.
function publicationPolicy(event, action = '') {
  if (event === 'workflow_dispatch' || event === 'repository_dispatch' && action === 'pages-live') return { kind: 'live', debounceSeconds: 0, cancelPublisher: true };
  if (event === 'repository_dispatch' && action === 'pages-preview') return { kind: 'preview', debounceSeconds: 60, cancelPublisher: false };
  throw Error('Unsupported Pages publication request');
}
function publicationSnapshot(request, latest) {
  if (!latest?.sha || !latest?.rootVersion) throw Error('The latest site snapshot needs a root version and SHA');
  // An old preview request may replace a pending live request in GitHub's single
  // pending slot. Its snapshot MUST still include the newest live root.
  return { requested: request, ref: 'gh-pages', sha: latest.sha, rootVersion: latest.rootVersion };
}
module.exports = { publicationPolicy, publicationSnapshot };
