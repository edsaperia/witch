// Node24 on Windows can emit unescaped native paths in CPU-profile URL fields.
function normalizeProfile(raw) {
  if (typeof raw !== 'string') return { profile: raw, repaired: false };
  try { return { profile: JSON.parse(raw), repaired: false }; }
  catch {
    const escaped = raw.replace(/"url":"([A-Za-z]:\\[^"\r\n]*)"/g, (_, url) => `"url":${JSON.stringify(url)}`);
    return { profile: JSON.parse(escaped), repaired: true }; // fail rather than alter any sample/timing fields
  }
}
module.exports = { normalizeProfile };
