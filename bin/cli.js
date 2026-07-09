#!/usr/bin/env node
require('tsx')
const { initProject } = require('../src/cli/init')
const targetDir = process.argv[2] || '.'
initProject({ targetDir }).catch(err => {
  console.error(err.message)
  process.exit(1)
})
