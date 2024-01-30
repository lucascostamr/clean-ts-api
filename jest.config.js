module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/main/config/env.ts'
  ],
  coverageDirectory: "coverage",
  // testEnvironment: "jest-environment-node",
  transform: {
    '.+\\.ts$' : 'ts-jest'
  },
  preset: 'ts-jest',
};