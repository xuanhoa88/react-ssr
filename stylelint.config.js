module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-sass-guidelines'],
  rules: {
    'max-nesting-depth': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'selector-max-compound-selectors': null
  }
};
