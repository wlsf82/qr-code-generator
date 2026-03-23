const { defineConfig } = require('cypress')
const tasks = require('./cypress/support/tasks')

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    fixturesFolder: false,
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
