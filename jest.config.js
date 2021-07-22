module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setupTests.js'],
  moduleNameMapper: {
    '@/components(.*)$': '<rootDir>/src/components/$1',
    '/^.+.{css|less|scss|sass}$/': '<rootDir>/.jest/style-mock.js',
  },
};
