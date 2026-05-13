module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: [
      'src/objects/world.js',
      'src/hooks/hooks.js',
      'src/steps/**/*.js',
    ],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'allure-cucumberjs/reporter',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: 'reports/allure-results',
    },
    publishQuiet: true,
  },
};
