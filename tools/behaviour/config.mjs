// Dedicated informational survey discovery, outside the blocking Vite test configuration.
import { defineConfig } from 'vitest/config';
export default defineConfig({test:{include:['tools/behaviour/*.behaviour.ts'],environment:'node',setupFiles:['src/test/radiusMap.ts'],maxWorkers:1,isolate:true,testTimeout:120_000,hookTimeout:60_000}});
