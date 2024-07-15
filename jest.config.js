const path = require('path');

module.exports = {
  setupFiles: ['isomorphic-fetch'],
  coverageDirectory: '<rootDir>/coverage',
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, 'babel.config.js') }
    ]
  },
  testMatch: ['<rootDir>/src/**/*.(spec|test).js?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**', '!**/*.json']
};
