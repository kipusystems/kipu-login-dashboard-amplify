const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'guzo83',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  "defaultCommandTimeout": 10000,
  "chromeWebSecurity": false
});
