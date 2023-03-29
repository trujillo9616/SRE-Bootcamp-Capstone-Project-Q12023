export default {
  transform: {
    "^.+\\.ts?$": "esbuild-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/tests/unit/*.test.ts"],
};
