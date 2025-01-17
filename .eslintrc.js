const prettierConfig = require('./prettier.config');

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'jest', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['build', 'dist', 'coverage'],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'global-require': 0,
    'linebreak-style': 0,
    'no-global-assign': 0,
    'no-console': 0,
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-target-blank': 1,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0
  }
};
