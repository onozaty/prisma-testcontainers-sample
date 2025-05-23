import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ["./test/global-setup.ts"],
    setupFiles: ["./test/setup.ts"],
    watch: false,
    hookTimeout: 600000, // Testcontainerの起動に初回は時間がかかる可能性があるため
    minWorkers: 4,
    maxWorkers: 4,
  },
});
