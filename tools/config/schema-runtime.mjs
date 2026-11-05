// Load the schema gate's real TypeScript/data modules without a Vite server or SSR RPC timeout.
// Trusted repository sources are bundled in memory; no generated config or temporary module is written.
import { buildSync } from 'esbuild';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export function schemaRuntime() {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const { outputFiles } = buildSync({
    absWorkingDir: root,
    stdin: { contents: [
      'export { validate, inferSchema } from "./src/rules/schema.ts";',
      'export { knobsReference, describeSchema } from "./src/rules/knobDocs.ts";',
      'export { TUNING_OVER } from "./src/rules/tuningSchema.ts";',
      'export { CONFIGS } from "./src/rules/configSchemas.ts";',
      'export { configData } from "./src/rules/configData.ts";',
    ].join('\n'), resolveDir: root, sourcefile: 'schema-runtime-entry.ts', loader: 'ts' },
    bundle: true, platform: 'node', format: 'cjs', write: false, logLevel: 'silent',
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
  return module.exports;
}
