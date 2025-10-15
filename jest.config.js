/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // ✅ enable ESM mode
  testEnvironment: 'node',
  rootDir: './tests',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', 'loggers.*'],
  extensionsToTreatAsEsm: ['.ts'],
  testRegex: '.(t|j)s$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true }], // ✅ use ts-jest in ESM mode
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // ✅ fix imports without .js in TS
  },
};
