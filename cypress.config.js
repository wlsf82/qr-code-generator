const { defineConfig } = require('cypress')
const tasks = require('./cypress/support/tasks')

module.exports = defineConfig({
  defaultBrowser: 'chrome',
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      tasks(on)
      return config
    },
  },
  retries: {
    openMode: 0,
    runMode: 2,
  },
})
