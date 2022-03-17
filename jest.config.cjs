const config = {
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.lib.json",
      diagnostics: true,
    },
  },
  preset: "ts-jest/presets/js-with-ts-esm",
};

module.exports = config;
