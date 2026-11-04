// Dedicated informational survey discovery, outside the blocking Vite test configuration.
import { defineConfig } from 'vitest/config';
import gameConfig from '../../vite.config.ts';
// Reuse the real virtual-module resolver/defines for numeric render helpers; replace test discovery completely.
// This loads no renderer and invokes no draw/bake. Avoid mergeConfig: concatenating includes would run release tests.
export default defineConfig({...gameConfig,test:{include:['tools/behaviour/*.behaviour.ts'],environment:'node',setupFiles:['src/test/radiusMap.ts'],maxWorkers:1,isolate:true,testTimeout:120_000,hookTimeout:60_000}});
