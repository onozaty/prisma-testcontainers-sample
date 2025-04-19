import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    hookTimeout: 600000, // Testcontainerの起動に初回は時間がかかる可能性があるため
  },
});
